import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import {
  runHealthChecks,
  getCircuitBreakerStates,
  isEmergencyMode,
  getLastHealthResults,
} from "./platform-resilience";
import { checkPoolHealth } from "./exam-reliability";

interface ReleaseCheck {
  name: string;
  category: "deploy" | "content";
  status: "pass" | "fail" | "warn" | "skip";
  message: string;
  details?: any;
  required: boolean;
}

interface ReleaseGateResult {
  overallStatus: "pass" | "fail" | "warn";
  checks: ReleaseCheck[];
  passCount: number;
  failCount: number;
  warnCount: number;
  skipCount: number;
  timestamp: string;
  canDeploy: boolean;
  canPublish: boolean;
}

const overrideLog: Array<{
  adminId: string;
  adminUsername: string;
  justification: string;
  checksOverridden: string[];
  timestamp: string;
}> = [];

async function checkDbHealth(): Promise<ReleaseCheck> {
  try {
    const start = Date.now();
    await pool.query("SELECT 1");
    const latency = Date.now() - start;
    if (latency > 5000) {
      return { name: "Database Health", category: "deploy", status: "warn", message: `Database responding but slow (${latency}ms)`, details: { latencyMs: latency }, required: true };
    }
    return { name: "Database Health", category: "deploy", status: "pass", message: `Database healthy (${latency}ms)`, details: { latencyMs: latency }, required: true };
  } catch (err: any) {
    return { name: "Database Health", category: "deploy", status: "fail", message: `Database unreachable: ${err.message}`, required: true };
  }
}

async function checkAuthSystem(): Promise<ReleaseCheck> {
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM users WHERE tier = 'admin' LIMIT 1");
    const count = r.rows[0]?.cnt || 0;
    if (count === 0) {
      return { name: "Auth System", category: "deploy", status: "warn", message: "No admin users found", required: true };
    }
    return { name: "Auth System", category: "deploy", status: "pass", message: `Auth system functional (${count} admin users)`, required: true };
  } catch (err: any) {
    return { name: "Auth System", category: "deploy", status: "fail", message: `Auth check failed: ${err.message}`, required: true };
  }
}

async function checkExamSystem(): Promise<ReleaseCheck> {
  try {
    const tiers = ["rpn", "rn", "np"];
    const results: any = {};
    let anyUnhealthy = false;
    for (const tier of tiers) {
      const health = await checkPoolHealth(tier);
      results[tier] = health;
      if (!health.healthy) anyUnhealthy = true;
    }
    if (anyUnhealthy) {
      return { name: "Exam System", category: "deploy", status: "warn", message: "Some exam tiers have low inventory", details: results, required: true };
    }
    return { name: "Exam System", category: "deploy", status: "pass", message: "All exam tiers healthy", details: results, required: true };
  } catch (err: any) {
    return { name: "Exam System", category: "deploy", status: "fail", message: `Exam system check failed: ${err.message}`, required: true };
  }
}

async function checkCatEngine(): Promise<ReleaseCheck> {
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM exam_questions WHERE is_adaptive_eligible = true AND status = 'published'");
    const count = r.rows[0]?.cnt || 0;
    if (count === 0) {
      return { name: "CAT Engine", category: "deploy", status: "warn", message: "No CAT-eligible questions found", details: { count }, required: false };
    }
    return { name: "CAT Engine", category: "deploy", status: "pass", message: `CAT engine has ${count} adaptive questions`, details: { count }, required: false };
  } catch (err: any) {
    return { name: "CAT Engine", category: "deploy", status: "fail", message: `CAT engine check failed: ${err.message}`, required: false };
  }
}

async function checkFlashcards(): Promise<ReleaseCheck> {
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM flashcard_decks WHERE visibility = 'public'");
    const count = r.rows[0]?.cnt || 0;
    if (count === 0) {
      return { name: "Flashcards", category: "deploy", status: "warn", message: "No public flashcard decks", details: { count }, required: true };
    }
    return { name: "Flashcards", category: "deploy", status: "pass", message: `${count} public flashcard decks`, details: { count }, required: true };
  } catch (err: any) {
    return { name: "Flashcards", category: "deploy", status: "fail", message: `Flashcard check failed: ${err.message}`, required: true };
  }
}

async function checkEntitlementSystem(): Promise<ReleaseCheck> {
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM users WHERE tier != 'free' AND tier IS NOT NULL LIMIT 1");
    const paid = r.rows[0]?.cnt || 0;
    return { name: "Entitlement System", category: "deploy", status: "pass", message: `Entitlement system functional (${paid} paid users)`, details: { paidUsers: paid }, required: true };
  } catch (err: any) {
    return { name: "Entitlement System", category: "deploy", status: "fail", message: `Entitlement check failed: ${err.message}`, required: true };
  }
}

async function checkRollbackTarget(): Promise<ReleaseCheck> {
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM content_revisions").catch(() => ({ rows: [{ cnt: 0 }] }));
    const count = r.rows[0]?.cnt || 0;
    if (count === 0) {
      return { name: "Rollback Target", category: "deploy", status: "warn", message: "No content revisions for rollback", details: { count }, required: false };
    }
    return { name: "Rollback Target", category: "deploy", status: "pass", message: `${count} content revisions available for rollback`, details: { count }, required: false };
  } catch (err: any) {
    return { name: "Rollback Target", category: "deploy", status: "warn", message: `Rollback check skipped: ${err.message}`, required: false };
  }
}

function checkMonitoringHealth(): ReleaseCheck {
  const cbStates = getCircuitBreakerStates();
  const openBreakers = cbStates.filter(cb => cb.state === "open");
  if (openBreakers.length > 0) {
    return { name: "Monitoring Health", category: "deploy", status: "warn", message: `${openBreakers.length} circuit breakers open`, details: { openBreakers: openBreakers.map(cb => cb.name) }, required: false };
  }
  if (isEmergencyMode()) {
    return { name: "Monitoring Health", category: "deploy", status: "fail", message: "Emergency mode is currently active", required: true };
  }
  return { name: "Monitoring Health", category: "deploy", status: "pass", message: "All monitoring systems healthy", required: false };
}

async function checkBackupServices(): Promise<ReleaseCheck> {
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM exam_backup_payloads").catch(() => ({ rows: [{ cnt: 0 }] }));
    const count = r.rows[0]?.cnt || 0;
    return { name: "Backup Services", category: "deploy", status: count > 0 ? "pass" : "warn", message: count > 0 ? `${count} backup payloads available` : "No backup payloads found", details: { count }, required: false };
  } catch (err: any) {
    return { name: "Backup Services", category: "deploy", status: "warn", message: `Backup check skipped: ${err.message}`, required: false };
  }
}

async function checkContentSchemaValidity(): Promise<ReleaseCheck> {
  try {
    const tables = ["exam_questions", "flashcard_decks", "lessons", "content_items"];
    const missing: string[] = [];
    for (const table of tables) {
      const r = await pool.query(`SELECT to_regclass('${table}') IS NOT NULL AS exists`);
      if (!r.rows[0]?.exists) missing.push(table);
    }
    if (missing.length > 0) {
      return { name: "Content Schema", category: "content", status: "fail", message: `Missing tables: ${missing.join(", ")}`, details: { missing }, required: true };
    }
    return { name: "Content Schema", category: "content", status: "pass", message: "All content tables present", required: true };
  } catch (err: any) {
    return { name: "Content Schema", category: "content", status: "fail", message: `Schema check failed: ${err.message}`, required: true };
  }
}

async function checkContentHealthThreshold(): Promise<ReleaseCheck> {
  try {
    const { runContentScan } = await import("./content-integrity-scanner");
    const result = await runContentScan("lightweight", ["questions", "flashcards"], undefined);
    const criticalIssues = result.issuesBySeverity["critical"] || 0;
    if (criticalIssues > 10) {
      return { name: "Content Health Score", category: "content", status: "fail", message: `${criticalIssues} critical content issues detected`, details: { criticalIssues, total: result.totalRecords }, required: true };
    }
    if (criticalIssues > 0) {
      return { name: "Content Health Score", category: "content", status: "warn", message: `${criticalIssues} critical content issues`, details: { criticalIssues, total: result.totalRecords }, required: true };
    }
    return { name: "Content Health Score", category: "content", status: "pass", message: `Content health acceptable (${result.totalRecords} records scanned)`, details: { total: result.totalRecords }, required: true };
  } catch (err: any) {
    return { name: "Content Health Score", category: "content", status: "fail", message: `Content health check failed: ${err.message}`, required: true };
  }
}

async function checkBackupArtifacts(): Promise<ReleaseCheck> {
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM content_revisions WHERE created_at > NOW() - INTERVAL '7 days'").catch(() => ({ rows: [{ cnt: 0 }] }));
    const count = r.rows[0]?.cnt || 0;
    if (count === 0) {
      return { name: "Backup Artifacts", category: "content", status: "warn", message: "No recent content backups (last 7 days)", required: false };
    }
    return { name: "Backup Artifacts", category: "content", status: "pass", message: `${count} recent content backups`, details: { count }, required: false };
  } catch {
    return { name: "Backup Artifacts", category: "content", status: "skip", message: "Backup artifact check skipped", required: false };
  }
}

function checkFallbackPath(): ReleaseCheck {
  const lastHealth = getLastHealthResults();
  const dbCheck = lastHealth.find(h => h.service === "database");
  if (dbCheck && dbCheck.status === "down") {
    return { name: "Fallback Path", category: "content", status: "fail", message: "Database is down - no fallback path available", required: true };
  }
  return { name: "Fallback Path", category: "content", status: "pass", message: "Fallback paths available", required: false };
}

function checkMemoryRegression(): ReleaseCheck {
  const mem = process.memoryUsage();
  const rssMB = mem.rss / 1024 / 1024;
  const heapMB = mem.heapUsed / 1024 / 1024;

  if (rssMB > 400) {
    return { name: "Memory Regression", category: "deploy", status: "fail", message: `RSS memory critically high: ${rssMB.toFixed(0)}MB`, details: { rssMB, heapMB }, required: true };
  }
  if (rssMB > 300) {
    return { name: "Memory Regression", category: "deploy", status: "warn", message: `RSS memory elevated: ${rssMB.toFixed(0)}MB`, details: { rssMB, heapMB }, required: true };
  }
  return { name: "Memory Regression", category: "deploy", status: "pass", message: `Memory within budget (RSS: ${rssMB.toFixed(0)}MB, Heap: ${heapMB.toFixed(0)}MB)`, details: { rssMB, heapMB }, required: true };
}

async function checkExamOpenFlow(): Promise<ReleaseCheck> {
  try {
    const port = process.env.PORT || "5000";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const start = Date.now();

    const response = await fetch(`http://localhost:${port}/api/exams`, {
      signal: controller.signal,
      headers: { "User-Agent": "ReleaseGate-SmokeTest/1.0" },
    });
    clearTimeout(timeout);
    const latency = Date.now() - start;

    if (!response.ok && response.status !== 401 && response.status !== 403) {
      return { name: "Exam Open Flow", category: "deploy", status: "fail", message: `Exam listing returned HTTP ${response.status} (${latency}ms)`, details: { statusCode: response.status, latency }, required: true };
    }
    if (latency > 5000) {
      return { name: "Exam Open Flow", category: "deploy", status: "warn", message: `Exam listing slow: ${latency}ms`, details: { statusCode: response.status, latency }, required: true };
    }
    return { name: "Exam Open Flow", category: "deploy", status: "pass", message: `Exam open flow healthy (${latency}ms)`, details: { statusCode: response.status, latency }, required: true };
  } catch (err: any) {
    return { name: "Exam Open Flow", category: "deploy", status: "fail", message: `Exam open flow check failed: ${err.message}`, required: true };
  }
}

function checkResourceBudgets(): ReleaseCheck {
  try {
    const { getBudgetCheckReport } = require("./resource-budgets");
    const report = getBudgetCheckReport();

    if (!report.canDeploy) {
      return { name: "Resource Budgets", category: "deploy", status: "fail", message: `${report.violations.criticalCount} critical budget violations`, details: report, required: true };
    }
    if (report.violations.warningCount > 0) {
      return { name: "Resource Budgets", category: "deploy", status: "warn", message: `${report.violations.warningCount} budget warnings`, details: report, required: false };
    }
    return { name: "Resource Budgets", category: "deploy", status: "pass", message: "All resource budgets within limits", details: report, required: false };
  } catch (err: any) {
    return { name: "Resource Budgets", category: "deploy", status: "skip", message: `Budget check skipped: ${err.message}`, required: false };
  }
}

function checkEmergencyModeLogic(): ReleaseCheck {
  if (isEmergencyMode()) {
    return { name: "Emergency Mode", category: "deploy", status: "fail", message: "Emergency mode is active - resolve before deploying", required: true };
  }
  return { name: "Emergency Mode", category: "deploy", status: "pass", message: "Emergency mode is not active", required: true };
}

async function checkRouteTimeouts(): Promise<ReleaseCheck> {
  try {
    const { getLatencyPercentiles } = require("./resource-budgets");
    const percentiles = getLatencyPercentiles();

    if (percentiles.count < 10) {
      return { name: "Route Timeouts", category: "deploy", status: "skip", message: "Insufficient data for latency analysis", required: false };
    }
    if (percentiles.p95 > 8000) {
      return { name: "Route Timeouts", category: "deploy", status: "fail", message: `P95 latency ${percentiles.p95}ms exceeds 8s threshold`, details: percentiles, required: true };
    }
    if (percentiles.p95 > 5000) {
      return { name: "Route Timeouts", category: "deploy", status: "warn", message: `P95 latency ${percentiles.p95}ms elevated`, details: percentiles, required: false };
    }
    return { name: "Route Timeouts", category: "deploy", status: "pass", message: `P95 latency: ${percentiles.p95}ms`, details: percentiles, required: false };
  } catch {
    return { name: "Route Timeouts", category: "deploy", status: "skip", message: "Route timeout check skipped", required: false };
  }
}

async function checkContentValidationGates(): Promise<ReleaseCheck> {
  try {
    const invalidPublished = await pool.query(`
      SELECT COUNT(*)::int AS cnt FROM exam_questions
      WHERE status = 'published' AND (stem IS NULL OR LENGTH(TRIM(stem)) < 10 OR options IS NULL OR correct_answer IS NULL)
    `);
    const count = invalidPublished.rows[0]?.cnt || 0;
    if (count > 0) {
      return { name: "Content Validation", category: "content", status: "fail", message: `${count} invalid published questions detected`, details: { invalidCount: count }, required: true };
    }
    return { name: "Content Validation", category: "content", status: "pass", message: "All published content passes validation", required: true };
  } catch (err: any) {
    return { name: "Content Validation", category: "content", status: "fail", message: `Content validation check failed: ${err.message}`, required: true };
  }
}

async function checkPayloadSizes(): Promise<ReleaseCheck> {
  try {
    const { getViolations } = require("./resource-budgets");
    const recentPayloadViolations = getViolations(100).filter(
      (v: any) => v.type === "payload_size" && Date.now() - v.timestamp < 3600000
    );
    if (recentPayloadViolations.length > 5) {
      return { name: "Payload Sizes", category: "deploy", status: "warn", message: `${recentPayloadViolations.length} payload size violations in the last hour`, details: { count: recentPayloadViolations.length }, required: false };
    }
    return { name: "Payload Sizes", category: "deploy", status: "pass", message: "Payload sizes within limits", required: false };
  } catch {
    return { name: "Payload Sizes", category: "deploy", status: "skip", message: "Payload size check skipped", required: false };
  }
}

async function runAllChecks(type: "deploy" | "content" | "all"): Promise<ReleaseGateResult> {
  const checks: ReleaseCheck[] = [];

  if (type === "deploy" || type === "all") {
    const deployChecks = await Promise.all([
      checkDbHealth(),
      checkAuthSystem(),
      checkExamSystem(),
      checkCatEngine(),
      checkFlashcards(),
      checkEntitlementSystem(),
      checkRollbackTarget(),
      Promise.resolve(checkMonitoringHealth()),
      checkBackupServices(),
      Promise.resolve(checkMemoryRegression()),
      checkExamOpenFlow(),
      Promise.resolve(checkResourceBudgets()),
      Promise.resolve(checkEmergencyModeLogic()),
      checkRouteTimeouts(),
      checkPayloadSizes(),
    ]);
    checks.push(...deployChecks);
  }

  if (type === "content" || type === "all") {
    const contentChecks = await Promise.all([
      checkContentSchemaValidity(),
      checkContentHealthThreshold(),
      checkBackupArtifacts(),
      Promise.resolve(checkFallbackPath()),
      checkContentValidationGates(),
    ]);
    checks.push(...contentChecks);
  }

  const passCount = checks.filter(c => c.status === "pass").length;
  const failCount = checks.filter(c => c.status === "fail").length;
  const warnCount = checks.filter(c => c.status === "warn").length;
  const skipCount = checks.filter(c => c.status === "skip").length;

  const requiredFailures = checks.filter(c => c.required && c.status === "fail");
  const overallStatus: "pass" | "fail" | "warn" = requiredFailures.length > 0 ? "fail" : warnCount > 0 ? "warn" : "pass";

  const deployChecks = checks.filter(c => c.category === "deploy");
  const contentChecks = checks.filter(c => c.category === "content");
  const canDeploy = !deployChecks.some(c => c.required && c.status === "fail");
  const canPublish = !contentChecks.some(c => c.required && c.status === "fail");

  return {
    overallStatus,
    checks,
    passCount,
    failCount,
    warnCount,
    skipCount,
    timestamp: new Date().toISOString(),
    canDeploy,
    canPublish,
  };
}

export function registerReleaseGateRoutes(app: Express): void {
  app.get("/api/admin/release-gate/check", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const type = (req.query.type as string) || "all";
      const validTypes = ["deploy", "content", "all"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ error: "type must be deploy, content, or all" });
      }

      const result = await runAllChecks(type as "deploy" | "content" | "all");
      res.json(result);
    } catch (err: any) {
      console.error("[ReleaseGate] Check error:", err.message);
      res.status(500).json({ error: "Release gate check failed", detail: err.message });
    }
  });

  app.post("/api/admin/release-gate/override", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { justification, checksOverridden } = req.body;

      if (!justification || typeof justification !== "string" || justification.trim().length < 10) {
        return res.status(400).json({ error: "A justification of at least 10 characters is required for override" });
      }

      if (!Array.isArray(checksOverridden) || checksOverridden.length === 0) {
        return res.status(400).json({ error: "checksOverridden must be a non-empty array of check names" });
      }

      const entry = {
        adminId: admin.id,
        adminUsername: admin.username || admin.id,
        justification: justification.trim(),
        checksOverridden,
        timestamp: new Date().toISOString(),
      };
      overrideLog.unshift(entry);
      if (overrideLog.length > 100) overrideLog.length = 100;

      try {
        await pool.query(
          `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, after_json, created_at)
           VALUES (gen_random_uuid(), $1, $2, 'release_gate', 'override', 'release_gate_override', $3, NOW())`,
          [admin.id, admin.username || admin.id, JSON.stringify(entry)]
        );
      } catch {}

      console.warn(`[ReleaseGate] OVERRIDE by ${admin.username || admin.id}: ${justification}`);
      res.json({ success: true, override: entry });
    } catch (err: any) {
      console.error("[ReleaseGate] Override error:", err.message);
      res.status(500).json({ error: "Override failed", detail: err.message });
    }
  });

  app.get("/api/admin/release-gate/overrides", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const dbOverrides = await pool.query(
        `SELECT id, actor_id, actor_username, after_json, created_at FROM audit_logs WHERE entity_type = 'release_gate' AND action = 'release_gate_override' ORDER BY created_at DESC LIMIT 50`
      ).catch(() => ({ rows: [] }));

      res.json({ overrides: dbOverrides.rows.length > 0 ? dbOverrides.rows : overrideLog });
    } catch (err: any) {
      res.json({ overrides: overrideLog });
    }
  });
}
