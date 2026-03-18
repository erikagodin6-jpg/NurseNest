import type { Express, Request, Response, NextFunction } from "express";
import { pool } from "./storage";
import { resolveAuthUser, requireAdmin } from "./admin-auth";

export interface ExamIncident {
  id?: string;
  userId: string | null;
  examType: string;
  tier: string;
  reasonCode: string;
  reasonDetail: string;
  endpoint: string;
  requestParams: Record<string, any>;
  severity: "critical" | "warning" | "info";
  resolvedAt?: string | null;
  createdAt?: string;
}

export interface QuestionValidationResult {
  valid: boolean;
  questionId: string | number;
  issues: string[];
}

const MINIMUM_POOL_SIZE: Record<string, number> = {
  rpn: 20,
  rn: 20,
  np: 20,
  imaging: 5,
  default: 10,
};

const recentIncidents: ExamIncident[] = [];
const MAX_MEMORY_INCIDENTS = 500;

function addIncident(incident: ExamIncident) {
  recentIncidents.unshift(incident);
  if (recentIncidents.length > MAX_MEMORY_INCIDENTS) {
    recentIncidents.length = MAX_MEMORY_INCIDENTS;
  }
  persistIncident(incident).catch((e) =>
    console.error("[ExamReliability] Failed to persist incident:", e.message)
  );
}

async function persistIncident(incident: ExamIncident) {
  try {
    await pool.query(
      `INSERT INTO exam_incidents (user_id, exam_type, tier, reason_code, reason_detail, endpoint, request_params, severity)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        incident.userId,
        incident.examType,
        incident.tier,
        incident.reasonCode,
        incident.reasonDetail,
        incident.endpoint,
        JSON.stringify(incident.requestParams),
        incident.severity,
      ]
    );
  } catch {
  }
}

export function validateQuestion(row: any): QuestionValidationResult {
  const issues: string[] = [];
  const qId = row.id || "unknown";

  if (!row.stem || typeof row.stem !== "string" || row.stem.trim().length < 10) {
    issues.push("missing_or_short_stem");
  }

  let opts = row.options;
  if (typeof opts === "string") {
    try {
      opts = JSON.parse(opts);
    } catch {
      issues.push("unparseable_options");
    }
  }
  if (!Array.isArray(opts) || opts.length < 2) {
    issues.push("insufficient_options");
  }

  let correct = row.correct_answer;
  if (correct === null || correct === undefined) {
    issues.push("missing_correct_answer");
  } else {
    if (typeof correct === "string") {
      try {
        correct = JSON.parse(correct);
      } catch {
        const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
        if (letterMap[correct.toUpperCase()] === undefined) {
          issues.push("unparseable_correct_answer");
        }
      }
    }
  }

  if (row.status !== "published") {
    issues.push("not_published");
  }

  if (row.quarantined_at) {
    issues.push("quarantined");
  }

  return { valid: issues.length === 0, questionId: qId, issues };
}

export async function checkPoolHealth(
  tier: string,
  filters?: { bodySystems?: string[]; exam?: string }
): Promise<{
  healthy: boolean;
  totalAvailable: number;
  minimumRequired: number;
  issues: string[];
}> {
  const issues: string[] = [];
  const minRequired = MINIMUM_POOL_SIZE[tier] || MINIMUM_POOL_SIZE.default;

  try {
    let query = `SELECT COUNT(*)::int AS cnt FROM exam_questions WHERE tier = $1 AND status = 'published' AND (quarantined_at IS NULL)`;
    const params: any[] = [tier];
    let idx = 2;

    if (filters?.bodySystems && filters.bodySystems.length > 0) {
      query += ` AND body_system = ANY($${idx})`;
      params.push(filters.bodySystems);
      idx++;
    }
    if (filters?.exam) {
      query += ` AND exam = $${idx}`;
      params.push(filters.exam);
      idx++;
    }

    const result = await pool.query(query, params);
    const totalAvailable = result.rows[0]?.cnt || 0;

    if (totalAvailable < minRequired) {
      issues.push(
        `low_inventory: ${totalAvailable} questions available, minimum ${minRequired} required`
      );
    }
    if (totalAvailable === 0) {
      issues.push("empty_pool");
    }

    return {
      healthy: issues.length === 0,
      totalAvailable,
      minimumRequired: minRequired,
      issues,
    };
  } catch (e: any) {
    return {
      healthy: false,
      totalAvailable: 0,
      minimumRequired: minRequired,
      issues: [`pool_check_error: ${e.message}`],
    };
  }
}

export async function getQuarantinedCount(): Promise<number> {
  try {
    const r = await pool.query(
      `SELECT COUNT(*)::int AS cnt FROM exam_questions WHERE quarantined_at IS NOT NULL`
    );
    return r.rows[0]?.cnt || 0;
  } catch {
    return 0;
  }
}

export async function quarantineQuestion(
  questionId: number,
  reason: string
): Promise<boolean> {
  try {
    await pool.query(
      `UPDATE exam_questions SET quarantined_at = NOW(), quarantine_reason = $2 WHERE id = $1`,
      [questionId, reason]
    );
    return true;
  } catch {
    return false;
  }
}

export async function unquarantineQuestion(questionId: number): Promise<boolean> {
  try {
    await pool.query(
      `UPDATE exam_questions SET quarantined_at = NULL, quarantine_reason = NULL WHERE id = $1`,
      [questionId]
    );
    return true;
  } catch {
    return false;
  }
}

export function structuredExamError(
  res: Response,
  statusCode: number,
  reasonCode: string,
  message: string,
  details?: Record<string, any>
) {
  const payload: any = {
    error: message,
    reasonCode,
    timestamp: new Date().toISOString(),
    recoverable: statusCode < 500,
  };
  if (details) payload.details = details;
  return res.status(statusCode).json(payload);
}

export function logExamRequest(
  context: string,
  data: Record<string, any>
) {
  const entry = {
    context,
    timestamp: new Date().toISOString(),
    ...data,
  };
  console.log(`[ExamReliability] ${context}:`, JSON.stringify(entry));
}

export function registerExamReliabilityRoutes(app: Express) {
  app.get("/api/exam-health", async (_req, res) => {
    try {
      const tiers = ["rpn", "rn", "np"];
      const healthChecks: Record<string, any> = {};

      for (const tier of tiers) {
        healthChecks[tier] = await checkPoolHealth(tier);
      }

      const quarantinedCount = await getQuarantinedCount();
      const allHealthy = Object.values(healthChecks).every(
        (h: any) => h.healthy
      );

      res.json({
        status: allHealthy ? "healthy" : "degraded",
        tiers: healthChecks,
        quarantinedQuestions: quarantinedCount,
        recentIncidentCount: recentIncidents.filter(
          (i) =>
            new Date(i.createdAt || "").getTime() > Date.now() - 24 * 60 * 60 * 1000
        ).length,
        timestamp: new Date().toISOString(),
      });
    } catch (e: any) {
      res.status(500).json({ error: "Health check failed", detail: e.message });
    }
  });

  app.get("/api/admin/exam-health/overview", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const tiers = ["rpn", "rn", "np", "imaging"];
      const healthChecks: Record<string, any> = {};
      for (const tier of tiers) {
        healthChecks[tier] = await checkPoolHealth(tier);
      }

      const quarantinedResult = await pool.query(
        `SELECT id, tier, stem, quarantine_reason, quarantined_at
         FROM exam_questions WHERE quarantined_at IS NOT NULL
         ORDER BY quarantined_at DESC LIMIT 100`
      ).catch(() => ({ rows: [] }));

      const lowInventory: { tier: string; count: number; minimum: number }[] = [];
      for (const [tier, health] of Object.entries(healthChecks)) {
        const h = health as any;
        if (!h.healthy) {
          lowInventory.push({
            tier,
            count: h.totalAvailable,
            minimum: h.minimumRequired,
          });
        }
      }

      const last24h = recentIncidents.filter(
        (i) =>
          new Date(i.createdAt || "").getTime() > Date.now() - 24 * 60 * 60 * 1000
      );

      const criticalIncidents = last24h.filter((i) => i.severity === "critical");

      res.json({
        tiers: healthChecks,
        quarantined: quarantinedResult.rows.map((r: any) => ({
          id: r.id,
          tier: r.tier,
          stem: r.stem?.substring(0, 100),
          reason: r.quarantine_reason,
          quarantinedAt: r.quarantined_at,
        })),
        lowInventory,
        recentIncidents: last24h.slice(0, 50).map((i) => ({
          ...i,
          requestParams: undefined,
        })),
        criticalCount: criticalIncidents.length,
        totalIncidents24h: last24h.length,
        timestamp: new Date().toISOString(),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/exam-health/incidents", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);

      try {
        const dbResult = await pool.query(
          `SELECT * FROM exam_incidents ORDER BY created_at DESC LIMIT $1`,
          [limit]
        );
        return res.json({ incidents: dbResult.rows });
      } catch {
        return res.json({
          incidents: recentIncidents.slice(0, limit),
          source: "memory",
        });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/exam-health/quarantined", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await pool.query(
        `SELECT id, tier, exam, stem, body_system, topic, quarantine_reason, quarantined_at, created_at
         FROM exam_questions WHERE quarantined_at IS NOT NULL
         ORDER BY quarantined_at DESC LIMIT 200`
      );

      res.json({ quarantined: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/exam-health/unquarantine/:id", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid question ID" });
      }

      const success = await unquarantineQuestion(id);
      if (success) {
        res.json({ success: true, message: "Question unquarantined" });
      } else {
        res.status(500).json({ error: "Failed to unquarantine" });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/exam-health/quarantine/:id", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid question ID" });
      }

      const reason = req.body?.reason || "Manual quarantine by admin";
      const success = await quarantineQuestion(id, reason);
      if (success) {
        res.json({ success: true, message: "Question quarantined" });
      } else {
        res.status(500).json({ error: "Failed to quarantine" });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/exam-incident-report", async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req).catch(() => null);
      const {
        examType,
        tier,
        route,
        errorMessage,
        browserInfo,
        additionalContext,
      } = req.body || {};

      const incident: ExamIncident = {
        userId: user?.id || null,
        examType: examType || "unknown",
        tier: tier || "unknown",
        reasonCode: "client_report",
        reasonDetail: errorMessage || "User reported exam problem",
        endpoint: route || req.originalUrl,
        requestParams: {
          browserInfo,
          additionalContext,
          reportedAt: new Date().toISOString(),
        },
        severity: "warning",
        createdAt: new Date().toISOString(),
      };

      addIncident(incident);
      res.json({ success: true, message: "Report received. Thank you." });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to submit report" });
    }
  });

  app.post("/api/resilience/incident-report", async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req).catch(() => null);
      const {
        incidentId,
        contentType,
        productId,
        tier,
        route,
        errorMessage,
        errorName,
        browserInfo,
        source,
        retryCount,
        additionalContext,
      } = req.body || {};

      const severity: "critical" | "warning" | "info" =
        source === "auto" ? "warning" : "info";

      const incident: ExamIncident = {
        userId: user?.id || null,
        examType: contentType || "platform",
        tier: tier || "unknown",
        reasonCode: source === "auto" ? "protected_route_crash" : "user_report",
        reasonDetail: errorMessage || "Protected route content delivery failure",
        endpoint: route || req.originalUrl,
        requestParams: {
          incidentId,
          contentType,
          productId,
          errorName,
          browserInfo,
          source,
          retryCount,
          additionalContext,
          userEntitlementSnapshot: user ? {
            userId: user.id,
            tier: user.tier,
            subscriptionStatus: user.subscription_status || user.subscriptionStatus,
          } : null,
          reportedAt: new Date().toISOString(),
        },
        severity,
        createdAt: new Date().toISOString(),
      };

      addIncident(incident);

      console.log(`[ResilienceIncident] ${severity.toUpperCase()} | ${contentType || "unknown"} | ${source || "unknown"} | ${route || "unknown"} | ${errorMessage?.substring(0, 100) || "no message"} | incident=${incidentId || "none"}`);

      res.json({
        success: true,
        incidentId: incidentId || null,
        message: "Incident report received.",
      });
    } catch (e: any) {
      console.error("[ResilienceIncident] Error processing report:", e.message);
      res.status(500).json({ error: "Failed to submit incident report" });
    }
  });
}

export function logExamLoadError(context: {
  attemptId: string;
  userId?: string | null;
  examType?: string;
  failureReason: string;
  questionCount?: number;
  invalidQuestionIds?: string[];
  route?: string;
}) {
  const entry = {
    context: "exam_load_error",
    timestamp: new Date().toISOString(),
    ...context,
  };
  console.error(`[ExamReliability] exam_load_error:`, JSON.stringify(entry));

  try {
    const { logIncident } = require("./incident-monitor");
    logIncident({
      category: "exam_load_failure" as any,
      severity: context.questionCount === 0 ? "critical" as const : "warning" as const,
      title: "Exam Load Failure",
      message: context.failureReason,
      errorKey: `exam_load:${context.failureReason?.slice(0, 50)}`,
      userId: context.userId,
      metadata: { attemptId: context.attemptId, questionCount: context.questionCount, invalidQuestionIds: context.invalidQuestionIds },
    });
  } catch {}

  addIncident({
    userId: context.userId || null,
    examType: context.examType || "unknown",
    tier: "unknown",
    reasonCode: "exam_load_failure",
    reasonDetail: context.failureReason,
    endpoint: context.route || `/api/mock-exams/${context.attemptId}`,
    requestParams: {
      attemptId: context.attemptId,
      questionCount: context.questionCount,
      invalidQuestionIds: context.invalidQuestionIds,
    },
    severity: context.questionCount === 0 ? "critical" : "warning",
    createdAt: new Date().toISOString(),
  });
}

export { addIncident, recentIncidents };
