import type { Express, Request, Response, NextFunction } from "express";
import { pool } from "./storage";

const alertEvents: Array<{
  id: string;
  severity: "critical" | "warning" | "info";
  category: string;
  title: string;
  message: string;
  source: string;
  acknowledged: boolean;
  createdAt: number;
  data: Record<string, any>;
}> = [];
const MAX_ALERTS = 500;

let failureRateWindow: number[] = [];
const FAILURE_RATE_THRESHOLD = 10;
const FAILURE_RATE_WINDOW_MS = 60000;
let healthCheckTimer: ReturnType<typeof setInterval> | null = null;
const HEALTH_CHECK_INTERVAL_MS = 120000;
const resilienceAuditLog: Array<{ id: string; action: string; entity: string; entityId: string; details: any; actor: string | null; timestamp: number }> = [];
const MAX_AUDIT = 500;

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function addAlert(severity: "critical" | "warning" | "info", category: string, title: string, message: string, source: string, data: Record<string, any> = {}) {
  const existing = alertEvents.find(a => a.category === category && a.title === title && !a.acknowledged && Date.now() - a.createdAt < 300000);
  if (existing) return;
  const alert = { id: genId(), severity, category, title, message, source, acknowledged: false, createdAt: Date.now(), data };
  alertEvents.unshift(alert);
  if (alertEvents.length > MAX_ALERTS) alertEvents.length = MAX_ALERTS;
  persistAlert(alert).catch(() => {});
  if (severity === "critical") {
    sendAlertEmail(title, message, severity).catch(e => console.error("[Resilience] Alert email failed:", e.message));
  }
}

function addResilienceAudit(action: string, entity: string, entityId: string, details: any, actor: string | null) {
  const entry = { id: genId(), action, entity, entityId, details, actor, timestamp: Date.now() };
  resilienceAuditLog.unshift(entry);
  if (resilienceAuditLog.length > MAX_AUDIT) resilienceAuditLog.length = MAX_AUDIT;
  persistResilienceAudit(action, entity, entityId, details, actor).catch(() => {});
}

async function persistResilienceAudit(action: string, entity: string, entityId: string, details: any, actor: string | null) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, after_json, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`,
      [actor, actor, entity, entityId, action, JSON.stringify(details)]
    );
  } catch {}
}

async function persistAlert(alert: any) {
  try {
    await pool.query(
      `INSERT INTO platform_alerts (id, severity, category, title, message, source, acknowledged, data, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, to_timestamp($9::double precision / 1000))`,
      [alert.id, alert.severity, alert.category, alert.title, alert.message, alert.source, alert.acknowledged, JSON.stringify(alert.data), alert.createdAt]
    ).catch(() => {});
  } catch {}
}

async function sendAlertEmail(title: string, message: string, severity: string) {
  try {
    const { getResendClient } = await import("./resend-client");
    const { client, fromEmail } = await getResendClient();
    const { getNotificationSettings } = await import("./admin-notifications");
    const settings = await getNotificationSettings(pool);
    if (!settings.emailEnabled) return;
    await client.emails.send({
      from: fromEmail || "NurseNest <noreply@nursenest.ca>",
      to: settings.adminEmail || "admin@nursenest.ca",
      subject: `[${severity.toUpperCase()}] NurseNest Alert: ${title}`,
      html: `<h2 style="color: ${severity === 'critical' ? '#dc2626' : '#d97706'}">${title}</h2><p>${message}</p><p style="color: #6b7280; font-size: 12px;">Timestamp: ${new Date().toISOString()}</p>`,
    });
    console.log(`[Resilience] Alert email sent: ${title}`);
  } catch (e: any) {
    console.error("[Resilience] Failed to send alert email:", e.message);
  }
}

function trackFailureRate(source: string) {
  const now = Date.now();
  failureRateWindow.push(now);
  failureRateWindow = failureRateWindow.filter(t => now - t < FAILURE_RATE_WINDOW_MS);
  if (failureRateWindow.length >= FAILURE_RATE_THRESHOLD && !emergencyModeActive) {
    activateEmergencyMode(`Auto-triggered: ${failureRateWindow.length} failures in ${FAILURE_RATE_WINDOW_MS / 1000}s from ${source}`);
  }
}

async function ensurePlatformTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS platform_alerts (
        id TEXT PRIMARY KEY,
        severity TEXT NOT NULL,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        source TEXT,
        acknowledged BOOLEAN DEFAULT false,
        data JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS platform_health_checks (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        service TEXT NOT NULL,
        status TEXT NOT NULL,
        latency_ms INTEGER DEFAULT 0,
        details TEXT,
        checked_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS platform_emergency_log (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        action TEXT NOT NULL,
        reason TEXT,
        actor TEXT,
        auto_triggered BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
  } catch {}
}

interface CircuitBreakerState {
  name: string;
  state: "closed" | "open" | "half-open";
  failureCount: number;
  successCount: number;
  lastFailure: number | null;
  lastSuccess: number | null;
  openedAt: number | null;
  tripCount: number;
  cooldownMs: number;
  failureThreshold: number;
  halfOpenMaxAttempts: number;
}

const circuitBreakers = new Map<string, CircuitBreakerState>();

function getOrCreateBreaker(name: string, opts?: { threshold?: number; cooldownMs?: number }): CircuitBreakerState {
  let cb = circuitBreakers.get(name);
  if (!cb) {
    cb = {
      name,
      state: "closed",
      failureCount: 0,
      successCount: 0,
      lastFailure: null,
      lastSuccess: null,
      openedAt: null,
      tripCount: 0,
      cooldownMs: opts?.cooldownMs ?? 30000,
      failureThreshold: opts?.threshold ?? 5,
      halfOpenMaxAttempts: 3,
    };
    circuitBreakers.set(name, cb);
  }
  return cb;
}

export function recordSuccess(serviceName: string): void {
  const cb = getOrCreateBreaker(serviceName);
  cb.successCount++;
  cb.lastSuccess = Date.now();
  if (cb.state === "half-open") {
    cb.state = "closed";
    cb.failureCount = 0;
  }
}

export function recordFailure(serviceName: string): void {
  const cb = getOrCreateBreaker(serviceName);
  cb.failureCount++;
  cb.lastFailure = Date.now();
  recordErrorBudgetEvent(serviceName);
  if (cb.state === "half-open") {
    cb.state = "open";
    cb.openedAt = Date.now();
    cb.tripCount++;
    console.error(`[CircuitBreaker] RE-TRIPPED from half-open: ${serviceName} (trip #${cb.tripCount})`);
    addResilienceEvent("circuit_breaker_trip", serviceName, { failureCount: cb.failureCount, tripCount: cb.tripCount, fromHalfOpen: true });
    addAlert("warning", "circuit_breaker", `Circuit Breaker Tripped: ${serviceName}`, `${serviceName} breaker tripped (trip #${cb.tripCount}) after ${cb.failureCount} failures`, serviceName);
    trackFailureRate(serviceName);
  } else if (cb.state === "closed" && cb.failureCount >= cb.failureThreshold) {
    cb.state = "open";
    cb.openedAt = Date.now();
    cb.tripCount++;
    console.error(`[CircuitBreaker] TRIPPED: ${serviceName} (failures: ${cb.failureCount}, trip #${cb.tripCount})`);
    addResilienceEvent("circuit_breaker_trip", serviceName, { failureCount: cb.failureCount, tripCount: cb.tripCount });
    addAlert("warning", "circuit_breaker", `Circuit Breaker Tripped: ${serviceName}`, `${serviceName} breaker opened after ${cb.failureCount} failures`, serviceName);
    trackFailureRate(serviceName);
  }
}

export function isCircuitOpen(serviceName: string): boolean {
  const cb = circuitBreakers.get(serviceName);
  if (!cb) return false;
  if (cb.state === "closed") return false;
  if (cb.state === "open") {
    if (Date.now() - (cb.openedAt || 0) > cb.cooldownMs) {
      cb.state = "half-open";
      return false;
    }
    return true;
  }
  return false;
}

export function resetCircuitBreaker(serviceName: string): void {
  const cb = circuitBreakers.get(serviceName);
  if (cb) {
    cb.state = "closed";
    cb.failureCount = 0;
    cb.openedAt = null;
    addResilienceEvent("circuit_breaker_reset", serviceName, {});
  }
}

export function getCircuitBreakerStates(): CircuitBreakerState[] {
  return Array.from(circuitBreakers.values());
}

export function initDefaultBreakers(): void {
  getOrCreateBreaker("database", { threshold: 3, cooldownMs: 15000 });
  getOrCreateBreaker("stripe", { threshold: 5, cooldownMs: 60000 });
  getOrCreateBreaker("ai_service", { threshold: 5, cooldownMs: 45000 });
  getOrCreateBreaker("exam_service", { threshold: 3, cooldownMs: 20000 });
  getOrCreateBreaker("auth_service", { threshold: 5, cooldownMs: 30000 });
  getOrCreateBreaker("email_service", { threshold: 5, cooldownMs: 60000 });
  getOrCreateBreaker("sms_service", { threshold: 5, cooldownMs: 60000 });
}

export async function withCircuitBreaker<T>(
  serviceName: string,
  fn: () => Promise<T>,
  fallback?: () => T | Promise<T>
): Promise<T> {
  if (isCircuitOpen(serviceName)) {
    if (fallback) return fallback();
    throw new Error(`Service ${serviceName} is unavailable (circuit open)`);
  }
  try {
    const result = await fn();
    recordSuccess(serviceName);
    return result;
  } catch (err) {
    recordFailure(serviceName);
    if (fallback) return fallback();
    throw err;
  }
}

interface FeatureFlag {
  key: string;
  enabled: boolean;
  description: string;
  autoDisableOnErrors: boolean;
  errorCount: number;
  errorThreshold: number;
  disabledAt: number | null;
  disabledReason: string | null;
  adminOverride: boolean | null;
  updatedAt: number;
}

const featureFlags = new Map<string, FeatureFlag>();

const DEFAULT_FLAGS: Array<{ key: string; description: string; enabled: boolean; autoDisable?: boolean; errorThreshold?: number }> = [
  { key: "mock_exams", description: "Mock exam system", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "cat_engine", description: "Computer Adaptive Testing engine", enabled: true, autoDisable: true, errorThreshold: 5 },
  { key: "flashcards", description: "Flashcard study system", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "ai_tutor", description: "AI tutoring assistant (experimental)", enabled: false, autoDisable: true, errorThreshold: 5 },
  { key: "ai_content_gen", description: "AI content generation (experimental)", enabled: false, autoDisable: true, errorThreshold: 5 },
  { key: "stripe_payments", description: "Stripe payment processing", enabled: true, autoDisable: false },
  { key: "email_notifications", description: "Email notification system", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "sms_notifications", description: "SMS notification system", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "offline_sync", description: "Offline synchronization (experimental)", enabled: false, autoDisable: true, errorThreshold: 15 },
  { key: "seo_generation", description: "SEO content generation", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "question_bank", description: "Question bank service", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "lesson_rendering", description: "Lesson content rendering", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "new_ui_components", description: "Experimental UI components (high-risk)", enabled: false, autoDisable: true, errorThreshold: 3 },
  { key: "advanced_analytics", description: "Advanced analytics dashboard (experimental)", enabled: false, autoDisable: true, errorThreshold: 5 },
];

export function initFeatureFlags(): void {
  for (const def of DEFAULT_FLAGS) {
    featureFlags.set(def.key, {
      key: def.key,
      enabled: def.enabled,
      description: def.description,
      autoDisableOnErrors: def.autoDisable ?? false,
      errorCount: 0,
      errorThreshold: def.errorThreshold ?? 10,
      disabledAt: null,
      disabledReason: null,
      adminOverride: null,
      updatedAt: Date.now(),
    });
  }
}

export function isFeatureEnabled(key: string): boolean {
  if (emergencyModeActive) {
    const safeInEmergency = new Set(["stripe_payments", "email_notifications", "lesson_rendering", "flashcards", "mock_exams", "question_bank"]);
    if (!safeInEmergency.has(key)) return false;
  }
  if (minimalCoreActive) {
    const coreFeatures = new Set(["stripe_payments", "lesson_rendering", "flashcards", "mock_exams", "question_bank", "email_notifications"]);
    if (!coreFeatures.has(key)) return false;
  }
  const flag = featureFlags.get(key);
  if (!flag) return true;
  if (flag.adminOverride !== null) return flag.adminOverride;
  return flag.enabled;
}

export function setFeatureFlag(key: string, enabled: boolean, reason?: string, actor?: string): void {
  const flag = featureFlags.get(key);
  if (!flag) return;
  flag.adminOverride = enabled;
  flag.updatedAt = Date.now();
  if (!enabled) {
    flag.disabledAt = Date.now();
    flag.disabledReason = reason || "admin_disabled";
  } else {
    flag.disabledAt = null;
    flag.disabledReason = null;
  }
  addResilienceEvent("feature_flag_toggle", key, { enabled, reason, actor });
  addResilienceAudit("feature_flag_toggle", "feature_flag", key, { enabled, reason }, actor || null);
}

export function recordFeatureError(key: string): void {
  const flag = featureFlags.get(key);
  if (!flag) return;
  flag.errorCount++;
  if (flag.autoDisableOnErrors && flag.errorCount >= flag.errorThreshold && flag.enabled) {
    flag.enabled = false;
    flag.disabledAt = Date.now();
    flag.disabledReason = `auto_disabled_after_${flag.errorCount}_errors`;
    console.error(`[FeatureFlags] AUTO-DISABLED: ${key} after ${flag.errorCount} errors`);
    addResilienceEvent("feature_auto_disabled", key, { errorCount: flag.errorCount });
    addAlert("warning", "feature_flag", `Feature Auto-Disabled: ${key}`, `Feature "${key}" was automatically disabled after ${flag.errorCount} errors`, key);
    addResilienceAudit("feature_flag_auto_disable", "feature_flag", key, { errorCount: flag.errorCount, threshold: flag.errorThreshold }, null);
    trackFailureRate(`feature_flag:${key}`);
  }
}

export function resetFeatureErrors(key: string): void {
  const flag = featureFlags.get(key);
  if (!flag) return;
  flag.errorCount = 0;
  if (flag.disabledReason?.startsWith("auto_disabled")) {
    flag.enabled = true;
    flag.disabledAt = null;
    flag.disabledReason = null;
  }
}

export function getFeatureFlags(): FeatureFlag[] {
  return Array.from(featureFlags.values());
}

interface KillSwitch {
  key: string;
  active: boolean;
  scope: "global" | "route" | "feature" | "exam" | "language" | "component";
  target: string;
  activatedAt: number | null;
  activatedBy: string | null;
  reason: string | null;
}

const killSwitches = new Map<string, KillSwitch>();

export function activateKillSwitch(key: string, scope: KillSwitch["scope"], target: string, reason: string, activatedBy: string): void {
  killSwitches.set(key, {
    key,
    active: true,
    scope,
    target,
    activatedAt: Date.now(),
    activatedBy,
    reason,
  });
  addResilienceEvent("kill_switch_activated", key, { scope, target, reason });
}

export function deactivateKillSwitch(key: string): void {
  const ks = killSwitches.get(key);
  if (ks) {
    ks.active = false;
    ks.activatedAt = null;
    addResilienceEvent("kill_switch_deactivated", key, {});
  }
}

export function isKillSwitchActive(key: string): boolean {
  return killSwitches.get(key)?.active ?? false;
}

export function getKillSwitches(): KillSwitch[] {
  return Array.from(killSwitches.values());
}

interface HealthCheckResult {
  service: string;
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
  lastChecked: number;
  details?: string;
}

const healthCheckResults = new Map<string, HealthCheckResult>();
let lastFullHealthCheck = 0;
let cachedHealthResponse: { status: string; services: HealthCheckResult[]; timestamp: number } | null = null;
const HEALTH_CACHE_TTL = 15000;

async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    await pool.query("SELECT 1");
    const latency = Date.now() - start;
    return { service: "database", status: latency > 2000 ? "degraded" : "healthy", latencyMs: latency, lastChecked: Date.now() };
  } catch (err: any) {
    return { service: "database", status: "down", latencyMs: Date.now() - start, lastChecked: Date.now(), details: err.message };
  }
}

async function checkAuthHealth(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    await pool.query("SELECT id FROM users LIMIT 1");
    const latency = Date.now() - start;
    return { service: "auth", status: latency > 2000 ? "degraded" : "healthy", latencyMs: latency, lastChecked: Date.now() };
  } catch (err: any) {
    return { service: "auth", status: "down", latencyMs: Date.now() - start, lastChecked: Date.now(), details: err.message };
  }
}

async function checkExamHealth(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const r = await pool.query("SELECT COUNT(*) as ct FROM exam_questions WHERE status = 'published' LIMIT 1");
    const count = parseInt(r.rows[0]?.ct || "0");
    const latency = Date.now() - start;
    return {
      service: "exams",
      status: count === 0 ? "degraded" : latency > 3000 ? "degraded" : "healthy",
      latencyMs: latency,
      lastChecked: Date.now(),
      details: `${count} published questions`,
    };
  } catch (err: any) {
    return { service: "exams", status: "down", latencyMs: Date.now() - start, lastChecked: Date.now(), details: err.message };
  }
}

async function checkFlashcardHealth(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    await pool.query("SELECT COUNT(*) FROM flashcard_decks LIMIT 1");
    const latency = Date.now() - start;
    return { service: "flashcards", status: latency > 3000 ? "degraded" : "healthy", latencyMs: latency, lastChecked: Date.now() };
  } catch (err: any) {
    return { service: "flashcards", status: "down", latencyMs: Date.now() - start, lastChecked: Date.now(), details: err.message };
  }
}

async function checkSubscriptionValidation(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const r = await pool.query("SELECT id, tier FROM users WHERE tier != 'free' LIMIT 1");
    const latency = Date.now() - start;
    return { service: "subscription_validation", status: r.rows.length > 0 ? (latency > 2000 ? "degraded" : "healthy") : "degraded", latencyMs: latency, lastChecked: Date.now(), details: r.rows.length > 0 ? "Active subscribers found" : "No active subscribers" };
  } catch (err: any) {
    return { service: "subscription_validation", status: "down", latencyMs: Date.now() - start, lastChecked: Date.now(), details: err.message };
  }
}

async function checkLessonLoad(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM lessons WHERE status = 'published' LIMIT 1");
    const cnt = r.rows[0]?.cnt || 0;
    const latency = Date.now() - start;
    return { service: "lesson_load", status: cnt > 0 ? (latency > 3000 ? "degraded" : "healthy") : "degraded", latencyMs: latency, lastChecked: Date.now(), details: `${cnt} published lessons` };
  } catch (err: any) {
    return { service: "lesson_load", status: "degraded", latencyMs: Date.now() - start, lastChecked: Date.now(), details: err.message };
  }
}

async function checkSessionRestore(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const tableCheck = await pool.query("SELECT to_regclass('exam_sessions') IS NOT NULL AS exists");
    if (!tableCheck.rows[0]?.exists) {
      return { service: "session_restore", status: "healthy", latencyMs: Date.now() - start, lastChecked: Date.now(), details: "Table not created yet (normal)" };
    }
    await pool.query("SELECT id FROM exam_sessions WHERE status = 'in_progress' LIMIT 1");
    const latency = Date.now() - start;
    return { service: "session_restore", status: latency > 3000 ? "degraded" : "healthy", latencyMs: latency, lastChecked: Date.now() };
  } catch (err: any) {
    return { service: "session_restore", status: "healthy", latencyMs: Date.now() - start, lastChecked: Date.now(), details: "Check skipped: " + err.message };
  }
}

async function checkMemory(): Promise<HealthCheckResult> {
  const start = Date.now();
  const mem = process.memoryUsage();
  const heapUsedMB = Math.round(mem.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(mem.heapTotal / 1024 / 1024);
  const pct = Math.round((mem.heapUsed / mem.heapTotal) * 100);
  const status = pct > 97 ? "down" : pct > 95 ? "degraded" : "healthy";
  return { service: "memory", status, latencyMs: Date.now() - start, lastChecked: Date.now(), details: `${heapUsedMB}MB / ${heapTotalMB}MB (${pct}%)` };
}

export async function runHealthChecks(): Promise<HealthCheckResult[]> {
  const checks = await Promise.allSettled([
    checkDatabaseHealth(),
    checkAuthHealth(),
    checkExamHealth(),
    checkFlashcardHealth(),
    checkSubscriptionValidation(),
    checkLessonLoad(),
    checkSessionRestore(),
    checkMemory(),
  ]);

  const results: HealthCheckResult[] = [];
  for (const check of checks) {
    if (check.status === "fulfilled") {
      results.push(check.value);
      healthCheckResults.set(check.value.service, check.value);
    }
  }

  const cbStates = getCircuitBreakerStates();
  for (const cb of cbStates) {
    if (cb.state === "open") {
      results.push({
        service: cb.name,
        status: "down",
        latencyMs: 0,
        lastChecked: Date.now(),
        details: `Circuit breaker open (${cb.failureCount} failures)`,
      });
    }
  }

  lastFullHealthCheck = Date.now();
  const overallStatus = results.some((r) => r.status === "down")
    ? "down"
    : results.some((r) => r.status === "degraded")
    ? "degraded"
    : "healthy";
  cachedHealthResponse = { status: overallStatus, services: results, timestamp: Date.now() };

  const downServices = results.filter(r => r.status === "down");
  const degradedServices = results.filter(r => r.status === "degraded");
  for (const svc of downServices) {
    addAlert("critical", "health_check", `Service Down: ${svc.service}`, `${svc.service} is reporting as down. Details: ${svc.details || "none"}`, svc.service);
    recordErrorBudgetEvent(svc.service, 3);
  }
  for (const svc of degradedServices) {
    addAlert("warning", "health_check", `Service Degraded: ${svc.service}`, `${svc.service} is reporting as degraded. Details: ${svc.details || "none"}`, svc.service);
    recordErrorBudgetEvent(svc.service, 1);
  }

  const criticalDown = downServices.filter(s => ["database", "exams", "auth"].includes(s.service));
  if (criticalDown.length >= 2 && !emergencyModeActive) {
    activateEmergencyMode(`Auto-triggered: ${criticalDown.length} critical services down (${criticalDown.map(s => s.service).join(", ")})`);
  } else if (downServices.length >= 3 && !emergencyModeActive) {
    activateEmergencyMode(`Auto-triggered: ${downServices.length} services down (${downServices.map(s => s.service).join(", ")})`);
  }

  const openBreakers = cbStates.filter(cb => cb.state === "open");
  const criticalBreakers = openBreakers.filter(cb => ["database", "exam_service", "auth_service"].includes(cb.name));
  if (criticalBreakers.length >= 2 && !emergencyModeActive) {
    activateEmergencyMode(`Auto-triggered: ${criticalBreakers.length} critical circuit breakers open (${criticalBreakers.map(cb => cb.name).join(", ")})`);
  }

  persistHealthChecks(results).catch(() => {});
  return results;
}

async function persistHealthChecks(checks: HealthCheckResult[]) {
  try {
    for (const check of checks) {
      await pool.query(
        `INSERT INTO platform_health_checks (service, status, latency_ms, details) VALUES ($1, $2, $3, $4)`,
        [check.service, check.status, check.latencyMs, check.details || null]
      );
    }
    await pool.query(`DELETE FROM platform_health_checks WHERE checked_at < NOW() - INTERVAL '7 days'`);
  } catch {}
}

export function getLastHealthResults(): HealthCheckResult[] {
  return Array.from(healthCheckResults.values());
}

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_CLEANUP_INTERVAL = 60000;

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now - entry.windowStart > 120000) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_CLEANUP_INTERVAL);

export function rateLimitMiddleware(opts: { windowMs?: number; maxRequests?: number; subscriberMultiplier?: number; keyPrefix?: string } = {}) {
  const windowMs = opts.windowMs ?? 60000;
  const maxRequests = opts.maxRequests ?? 60;
  const subscriberMultiplier = opts.subscriberMultiplier ?? 2;
  const keyPrefix = opts.keyPrefix ?? "global";

  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).authUser;
    const identifier = user?.id || req.ip || "unknown";
    const key = `${keyPrefix}:${identifier}`;
    const now = Date.now();

    let entry = rateLimitStore.get(key);
    if (!entry || now - entry.windowStart > windowMs) {
      entry = { count: 0, windowStart: now };
      rateLimitStore.set(key, entry);
    }

    entry.count++;

    const isPaid = user?.tier && user.tier !== "free";
    const limit = isPaid ? maxRequests * subscriberMultiplier : maxRequests;

    if (entry.count > limit) {
      res.setHeader("Retry-After", String(Math.ceil((entry.windowStart + windowMs - now) / 1000)));
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: Math.ceil((entry.windowStart + windowMs - now) / 1000),
      });
    }

    res.setHeader("X-RateLimit-Limit", String(limit));
    res.setHeader("X-RateLimit-Remaining", String(Math.max(0, limit - entry.count)));
    next();
  };
}

export function loginRateLimitMiddleware() {
  return rateLimitMiddleware({ windowMs: 900000, maxRequests: 10, keyPrefix: "login", subscriberMultiplier: 1 });
}

interface ResilienceEvent {
  id: string;
  type: string;
  source: string;
  data: Record<string, any>;
  timestamp: number;
}

const resilienceEvents: ResilienceEvent[] = [];
const MAX_EVENTS = 500;

function addResilienceEvent(type: string, source: string, data: Record<string, any>): void {
  const event: ResilienceEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    source,
    data,
    timestamp: Date.now(),
  };
  resilienceEvents.unshift(event);
  if (resilienceEvents.length > MAX_EVENTS) {
    resilienceEvents.length = MAX_EVENTS;
  }

  try {
    const { logIncident } = require("./incident-monitor");
    const eventToIncident: Record<string, { category: string; severity: "critical" | "warning" | "info"; title: string }> = {
      circuit_breaker_trip: { category: "circuit_breaker_trip", severity: "warning", title: `Circuit Breaker Tripped: ${source}` },
      feature_auto_disabled: { category: "feature_auto_disabled", severity: "warning", title: `Feature Auto-Disabled: ${source}` },
      emergency_mode_activated: { category: "emergency_mode", severity: "critical", title: "Emergency Mode Activated" },
      provisional_access_granted: { category: "provisional_access", severity: "info", title: `Provisional Access Granted: ${source}` },
    };
    const mapping = eventToIncident[type];
    if (mapping) {
      logIncident({
        category: mapping.category as any,
        severity: mapping.severity,
        title: mapping.title,
        message: `Resilience event: ${type} from ${source}. ${JSON.stringify(data)}`,
        errorKey: `${type}:${source}`,
        userId: source.match(/^[a-f0-9-]+$/i) ? source : undefined,
        metadata: { resilienceEventType: type, ...data },
      });
    }
  } catch {}
}

export function getResilienceEvents(limit = 50): ResilienceEvent[] {
  return resilienceEvents.slice(0, limit);
}

let emergencyModeActive = false;
let emergencyModeReason: string | null = null;
let emergencyModeActivatedAt: number | null = null;

export function isEmergencyMode(): boolean {
  return emergencyModeActive;
}

export function activateEmergencyMode(reason: string, actor?: string): void {
  if (emergencyModeActive) return;
  emergencyModeActive = true;
  emergencyModeReason = reason;
  emergencyModeActivatedAt = Date.now();
  const isAuto = !actor;
  console.error(`[EMERGENCY MODE] ACTIVATED: ${reason}`);
  addResilienceEvent("emergency_mode_activated", "system", { reason, actor, auto: isAuto });
  addAlert("critical", "emergency_mode", "Emergency Mode Activated", `Emergency mode activated. Reason: ${reason}`, "emergency", { reason, actor });
  addResilienceAudit("emergency_mode_activate", "platform", "emergency_mode", { reason, auto: isAuto }, actor || null);
  pool.query(
    `INSERT INTO platform_emergency_log (action, reason, actor, auto_triggered) VALUES ($1, $2, $3, $4)`,
    ["activate", reason, actor || "system", isAuto]
  ).catch(() => {});
}

export function deactivateEmergencyMode(actor?: string): void {
  if (!emergencyModeActive) return;
  const duration = emergencyModeActivatedAt ? Date.now() - emergencyModeActivatedAt : 0;
  emergencyModeActive = false;
  emergencyModeReason = null;
  emergencyModeActivatedAt = null;
  addResilienceEvent("emergency_mode_deactivated", "system", { actor, durationMs: duration });
  addResilienceAudit("emergency_mode_deactivate", "platform", "emergency_mode", { actor, durationMs: duration }, actor || null);
  pool.query(
    `INSERT INTO platform_emergency_log (action, reason, actor, auto_triggered) VALUES ($1, $2, $3, false)`,
    ["deactivate", `Manual deactivation after ${Math.round(duration / 1000)}s`, actor || "system"]
  ).catch(() => {});
}

export function getEmergencyModeStatus(): { active: boolean; reason: string | null; activatedAt: number | null } {
  return { active: emergencyModeActive, reason: emergencyModeReason, activatedAt: emergencyModeActivatedAt };
}

let selfHealingActive = true;
const selfHealingLog: Array<{ action: string; target: string; result: string; timestamp: number }> = [];

export function attemptSelfHeal(target: string, action: string, fn: () => Promise<void>): void {
  if (!selfHealingActive) return;
  fn()
    .then(() => {
      selfHealingLog.unshift({ action, target, result: "success", timestamp: Date.now() });
      if (selfHealingLog.length > 100) selfHealingLog.length = 100;
      addResilienceEvent("self_heal_success", target, { action });
    })
    .catch((err) => {
      selfHealingLog.unshift({ action, target, result: `failed: ${err.message}`, timestamp: Date.now() });
      if (selfHealingLog.length > 100) selfHealingLog.length = 100;
      addResilienceEvent("self_heal_failed", target, { action, error: err.message });
    });
}

export function getSelfHealingLog(): typeof selfHealingLog {
  return selfHealingLog.slice(0, 50);
}

export function autoHealOnCircuitTrip(serviceName: string): void {
  const cb = circuitBreakers.get(serviceName);
  if (!cb || cb.state !== "open") return;

  if (serviceName === "database") {
    attemptSelfHeal("database", "connection_pool_refresh", async () => {
      await pool.query("SELECT 1");
    });
  }

  if (serviceName === "exam_service") {
    attemptSelfHeal("exam_service", "reset_circuit", async () => {
      await new Promise((r) => setTimeout(r, 5000));
      const testResult = await pool.query("SELECT id FROM exam_questions WHERE status = 'published' LIMIT 1");
      if (testResult.rows.length > 0) {
        resetCircuitBreaker(serviceName);
      }
    });
  }
}

const entitlementCache = new Map<string, { result: any; expiresAt: number }>();
const ENTITLEMENT_CACHE_TTL = 30000;

export function getCachedEntitlement(userId: string): any | null {
  const cached = entitlementCache.get(userId);
  if (cached && cached.expiresAt > Date.now()) return cached.result;
  entitlementCache.delete(userId);
  return null;
}

export function setCachedEntitlement(userId: string, result: any): void {
  entitlementCache.set(userId, { result, expiresAt: Date.now() + ENTITLEMENT_CACHE_TTL });
}

export function clearEntitlementCache(userId?: string): void {
  if (userId) {
    entitlementCache.delete(userId);
  } else {
    entitlementCache.clear();
  }
}

const provisionalAccessGrants = new Map<string, { grantedAt: number; reason: string; expiresAt: number }>();
const PROVISIONAL_ACCESS_DURATION = 3600000;

export function grantProvisionalAccess(userId: string, reason: string): void {
  provisionalAccessGrants.set(userId, {
    grantedAt: Date.now(),
    reason,
    expiresAt: Date.now() + PROVISIONAL_ACCESS_DURATION,
  });
  addResilienceEvent("provisional_access_granted", userId, { reason });
}

export function hasProvisionalAccess(userId: string): boolean {
  const grant = provisionalAccessGrants.get(userId);
  if (!grant) return false;
  if (Date.now() > grant.expiresAt) {
    provisionalAccessGrants.delete(userId);
    return false;
  }
  return true;
}

export function getProvisionalAccessGrants(): Array<{ userId: string; grantedAt: number; reason: string; expiresAt: number }> {
  const result: Array<{ userId: string; grantedAt: number; reason: string; expiresAt: number }> = [];
  for (const [userId, grant] of provisionalAccessGrants) {
    if (Date.now() < grant.expiresAt) {
      result.push({ userId, ...grant });
    }
  }
  return result;
}

export interface EntitlementDecision {
  hasAccess: boolean;
  accessSource: string;
  tier: string;
  fallbackEligible: boolean;
  provisionalAccess: boolean;
  decisionReason: string;
  timestamp: number;
}

export function makeEntitlementDecision(user: any, feature: string): EntitlementDecision {
  const userId = user?.id || "unknown";
  const tier = user?.tier || "free";

  if (!user) {
    return {
      hasAccess: false, accessSource: "none", tier: "free",
      fallbackEligible: false, provisionalAccess: false,
      decisionReason: "not_authenticated", timestamp: Date.now(),
    };
  }

  if (tier === "admin") {
    return {
      hasAccess: true, accessSource: "admin", tier,
      fallbackEligible: true, provisionalAccess: false,
      decisionReason: "admin_bypass", timestamp: Date.now(),
    };
  }

  if (hasProvisionalAccess(userId)) {
    return {
      hasAccess: true, accessSource: "provisional", tier,
      fallbackEligible: true, provisionalAccess: true,
      decisionReason: "provisional_access_active", timestamp: Date.now(),
    };
  }

  if (isEmergencyMode()) {
    return {
      hasAccess: true, accessSource: "emergency_mode", tier,
      fallbackEligible: true, provisionalAccess: false,
      decisionReason: "emergency_mode_active", timestamp: Date.now(),
    };
  }

  const isPaid = tier !== "free";
  return {
    hasAccess: isPaid, accessSource: isPaid ? "subscription" : "none", tier,
    fallbackEligible: isPaid, provisionalAccess: false,
    decisionReason: isPaid ? `tier_${tier}` : "free_tier", timestamp: Date.now(),
  };
}

async function resolveAdmin(req: Request, res: Response): Promise<any | null> {
  try {
    const { requireAdmin } = await import("./admin-auth");
    return await requireAdmin(req as any, res as any);
  } catch {
    res.status(403).json({ error: "Admin access required" });
    return null;
  }
}

export const isSafeMode = isEmergencyMode;
export const activateSafeMode = activateEmergencyMode;
export const deactivateSafeMode = deactivateEmergencyMode;
export const getSafeModeStatus = getEmergencyModeStatus;

const SAFE_MODE_CORE_READ_PATHS = new Set([
  "/api/lessons",
  "/api/flashcards",
  "/api/flashcard-decks",
  "/api/mock-exams",
  "/api/exam-questions",
  "/api/question-bank",
  "/api/downloads",
  "/api/verified-snapshots",
]);

const SAFE_MODE_INFRA_PATHS = new Set([
  "/api/health",
  "/api/platform/status",
  "/api/platform/feature-flags",
  "/api/platform/minimal-core",
  "/api/exam-health",
  "/api/admin/resilience",
]);

const SAFE_MODE_ADMIN_WRITE_EXCEPTIONS = new Set([
  "/api/auth",
  "/api/login",
  "/api/admin/resilience",
  "/api/stripe/webhook",
  "/api/boot-beacon",
  "/api/exam-incident-report",
]);

const SAFE_MODE_STATIC_FALLBACKS: Record<string, any> = {
  "/api/lessons": { items: [], message: "Lessons are temporarily unavailable. Please try again shortly.", _static: true },
  "/api/flashcards": { items: [], message: "Flashcards are temporarily unavailable. Please try again shortly.", _static: true },
  "/api/flashcard-decks": { items: [], message: "Flashcard decks are temporarily unavailable. Please try again shortly.", _static: true },
  "/api/mock-exams": { items: [], message: "Mock exams are temporarily unavailable. Please try again shortly.", _static: true },
  "/api/exam-questions": { items: [], count: 0, message: "Exam questions are temporarily unavailable. Please try again shortly.", _static: true },
  "/api/question-bank": { items: [], count: 0, message: "Question bank is temporarily unavailable. Please try again shortly.", _static: true },
  "/api/downloads": { items: [], message: "Downloads are temporarily unavailable. Please try again shortly.", _static: true },
  "/api/verified-snapshots": { items: [], message: "Verified snapshots are temporarily unavailable. Please try again shortly.", _static: true },
};

interface ErrorBudget {
  subsystem: string;
  totalBudget: number;
  consumed: number;
  windowMs: number;
  errors: number[];
  threshold: number;
  escalationLevel: "normal" | "warning" | "critical" | "exhausted";
  autoDisabledFeatures: string[];
  lastEscalation: number | null;
}

const errorBudgets = new Map<string, ErrorBudget>();

const DEFAULT_ERROR_BUDGETS: Array<{
  subsystem: string;
  totalBudget: number;
  windowMs: number;
  threshold: number;
}> = [
  { subsystem: "database", totalBudget: 50, windowMs: 300000, threshold: 0.5 },
  { subsystem: "ai_service", totalBudget: 100, windowMs: 300000, threshold: 0.6 },
  { subsystem: "exam_service", totalBudget: 30, windowMs: 300000, threshold: 0.4 },
  { subsystem: "stripe", totalBudget: 50, windowMs: 300000, threshold: 0.5 },
  { subsystem: "email_service", totalBudget: 80, windowMs: 300000, threshold: 0.6 },
  { subsystem: "sms_service", totalBudget: 80, windowMs: 300000, threshold: 0.6 },
  { subsystem: "content_generation", totalBudget: 100, windowMs: 300000, threshold: 0.6 },
  { subsystem: "seo_generation", totalBudget: 100, windowMs: 300000, threshold: 0.7 },
  { subsystem: "auth_service", totalBudget: 40, windowMs: 300000, threshold: 0.4 },
];

const THROTTLE_PRIORITY: string[][] = [
  ["ai_tutor", "ai_content_gen", "advanced_analytics"],
  ["seo_generation", "new_ui_components"],
  ["email_notifications", "sms_notifications"],
];

export function initErrorBudgets(): void {
  for (const def of DEFAULT_ERROR_BUDGETS) {
    errorBudgets.set(def.subsystem, {
      subsystem: def.subsystem,
      totalBudget: def.totalBudget,
      consumed: 0,
      windowMs: def.windowMs,
      errors: [],
      threshold: def.threshold,
      escalationLevel: "normal",
      autoDisabledFeatures: [],
      lastEscalation: null,
    });
  }
}

const SUBSYSTEM_NAME_MAP: Record<string, string> = {
  "auth": "auth_service",
  "exams": "exam_service",
  "email": "email_service",
  "sms": "sms_service",
  "content": "content_generation",
  "seo": "seo_generation",
};

function normalizeSubsystemName(name: string): string {
  return SUBSYSTEM_NAME_MAP[name] || name;
}

export function recordErrorBudgetEvent(subsystem: string, count: number = 1): void {
  subsystem = normalizeSubsystemName(subsystem);
  let budget = errorBudgets.get(subsystem);
  if (!budget) {
    budget = {
      subsystem,
      totalBudget: 50,
      consumed: 0,
      windowMs: 300000,
      errors: [],
      threshold: 0.5,
      escalationLevel: "normal",
      autoDisabledFeatures: [],
      lastEscalation: null,
    };
    errorBudgets.set(subsystem, budget);
  }

  const now = Date.now();
  for (let i = 0; i < count; i++) {
    budget.errors.push(now);
  }
  budget.errors = budget.errors.filter(t => now - t < budget.windowMs);
  budget.consumed = budget.errors.length;

  const prevLevel = budget.escalationLevel;
  recomputeEscalationLevel(budget);
  const ratio = budget.consumed / budget.totalBudget;

  if (budget.escalationLevel !== prevLevel && budget.escalationLevel !== "normal") {
    budget.lastEscalation = now;
    addResilienceEvent("error_budget_escalation", subsystem, {
      level: budget.escalationLevel,
      consumed: budget.consumed,
      total: budget.totalBudget,
      ratio: Math.round(ratio * 100),
    });

    if (budget.escalationLevel === "warning") {
      addAlert("warning", "error_budget", `Error Budget Warning: ${subsystem}`, `${subsystem} error budget at ${Math.round(ratio * 100)}% (${budget.consumed}/${budget.totalBudget})`, subsystem);
    } else if (budget.escalationLevel === "critical") {
      addAlert("warning", "error_budget", `Error Budget Critical: ${subsystem}`, `${subsystem} error budget at ${Math.round(ratio * 100)}% — auto-throttling non-essential features`, subsystem);
      autoThrottleFeatures(subsystem, 1);
    } else if (budget.escalationLevel === "exhausted") {
      addAlert("critical", "error_budget", `Error Budget Exhausted: ${subsystem}`, `${subsystem} error budget fully consumed — escalating to safe mode`, subsystem);
      autoThrottleFeatures(subsystem, 2);
      const criticalSubsystems = new Set(["database", "exam_service", "auth_service"]);
      if (criticalSubsystems.has(subsystem)) {
        activateEmergencyMode(`Error budget exhausted for critical subsystem: ${subsystem}`);
      }
    }
  }
}

function autoThrottleFeatures(subsystem: string, severity: number): void {
  const budget = errorBudgets.get(subsystem);
  if (!budget) return;

  const maxTier = Math.min(severity, THROTTLE_PRIORITY.length);
  for (let i = 0; i < maxTier; i++) {
    for (const featureKey of THROTTLE_PRIORITY[i]) {
      const flag = featureFlags.get(featureKey);
      if (flag && flag.enabled && flag.adminOverride === null) {
        flag.enabled = false;
        flag.disabledAt = Date.now();
        flag.disabledReason = `auto_throttled_by_error_budget:${subsystem}`;
        budget.autoDisabledFeatures.push(featureKey);
        addResilienceEvent("feature_auto_throttled", featureKey, { subsystem, severity });
        console.warn(`[ErrorBudget] Auto-throttled feature "${featureKey}" due to ${subsystem} budget pressure`);
      }
    }
  }
}

function recomputeEscalationLevel(budget: ErrorBudget): void {
  const ratio = budget.consumed / budget.totalBudget;
  if (ratio >= 1.0) {
    budget.escalationLevel = "exhausted";
  } else if (ratio >= budget.threshold) {
    budget.escalationLevel = "critical";
  } else if (ratio >= budget.threshold * 0.5) {
    budget.escalationLevel = "warning";
  } else {
    budget.escalationLevel = "normal";
  }
}

export function getErrorBudgets(): ErrorBudget[] {
  const now = Date.now();
  for (const budget of errorBudgets.values()) {
    budget.errors = budget.errors.filter(t => now - t < budget.windowMs);
    budget.consumed = budget.errors.length;
    recomputeEscalationLevel(budget);
  }
  return Array.from(errorBudgets.values()).map(b => ({
    ...b,
    errors: [],
  }));
}

export function resetErrorBudget(subsystem: string): void {
  const budget = errorBudgets.get(subsystem);
  if (!budget) return;
  budget.errors = [];
  budget.consumed = 0;
  budget.escalationLevel = "normal";

  for (const featureKey of budget.autoDisabledFeatures) {
    const flag = featureFlags.get(featureKey);
    if (flag && flag.disabledReason?.startsWith("auto_throttled_by_error_budget")) {
      flag.enabled = true;
      flag.disabledAt = null;
      flag.disabledReason = null;
    }
  }
  budget.autoDisabledFeatures = [];
  addResilienceEvent("error_budget_reset", subsystem, {});
}

let minimalCoreActive = false;
let minimalCoreReason: string | null = null;
let minimalCoreActivatedAt: number | null = null;

export function isMinimalCoreMode(): boolean {
  return minimalCoreActive;
}

export function activateMinimalCore(reason: string, actor?: string): void {
  if (minimalCoreActive) return;
  minimalCoreActive = true;
  minimalCoreReason = reason;
  minimalCoreActivatedAt = Date.now();
  console.warn(`[MinimalCore] ACTIVATED: ${reason}`);
  addResilienceEvent("minimal_core_activated", "system", { reason, actor });
  addAlert("warning", "minimal_core", "Minimal Core Mode Activated", `Platform switched to minimal core mode. Reason: ${reason}`, "minimal_core");
  addResilienceAudit("minimal_core_activate", "platform", "minimal_core", { reason }, actor || null);

  const heavyFeatures = ["ai_tutor", "ai_content_gen", "seo_generation", "advanced_analytics", "new_ui_components", "offline_sync"];
  for (const key of heavyFeatures) {
    const flag = featureFlags.get(key);
    if (flag && flag.enabled && flag.adminOverride === null) {
      flag.enabled = false;
      flag.disabledAt = Date.now();
      flag.disabledReason = "minimal_core_mode";
    }
  }
}

export function deactivateMinimalCore(actor?: string): void {
  if (!minimalCoreActive) return;
  const duration = minimalCoreActivatedAt ? Date.now() - minimalCoreActivatedAt : 0;
  minimalCoreActive = false;
  minimalCoreReason = null;
  minimalCoreActivatedAt = null;
  addResilienceEvent("minimal_core_deactivated", "system", { actor, durationMs: duration });
  addResilienceAudit("minimal_core_deactivate", "platform", "minimal_core", { actor, durationMs: duration }, actor || null);

  for (const flag of featureFlags.values()) {
    if (flag.disabledReason === "minimal_core_mode") {
      flag.enabled = true;
      flag.disabledAt = null;
      flag.disabledReason = null;
    }
  }
}

export function getMinimalCoreStatus(): { active: boolean; reason: string | null; activatedAt: number | null } {
  return { active: minimalCoreActive, reason: minimalCoreReason, activatedAt: minimalCoreActivatedAt };
}

interface CacheWarmEntry {
  key: string;
  data: any;
  warmedAt: number;
  ttlMs: number;
  stale: boolean;
}

const warmCache = new Map<string, CacheWarmEntry>();
let cacheWarmStatus: {
  lastWarmAt: number | null;
  routesWarmed: number;
  warming: boolean;
  errors: string[];
} = { lastWarmAt: null, routesWarmed: 0, warming: false, errors: [] };
let keepWarmTimer: ReturnType<typeof setInterval> | null = null;
const KEEP_WARM_INTERVAL_MS = 300000;
const WARM_CACHE_TTL_MS = 600000;

export function getCacheWarmStatus() {
  return {
    ...cacheWarmStatus,
    cachedEntries: warmCache.size,
    entries: Array.from(warmCache.entries()).map(([key, entry]) => ({
      key,
      warmedAt: entry.warmedAt,
      stale: Date.now() - entry.warmedAt > entry.ttlMs,
      hasData: !!entry.data,
    })),
  };
}

export function getWarmCacheEntry(key: string): any | null {
  const entry = warmCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.warmedAt > entry.ttlMs) {
    entry.stale = true;
    return null;
  }
  return entry.data;
}

async function warmCriticalRoute(key: string, queryFn: () => Promise<any>): Promise<void> {
  try {
    const data = await queryFn();
    warmCache.set(key, {
      key,
      data,
      warmedAt: Date.now(),
      ttlMs: WARM_CACHE_TTL_MS,
      stale: false,
    });
  } catch (err: any) {
    cacheWarmStatus.errors.push(`${key}: ${err.message}`);
    console.error(`[ColdStart] Failed to warm "${key}":`, err.message);
  }
}

export async function prewarmCriticalRoutes(): Promise<void> {
  if (cacheWarmStatus.warming) return;
  cacheWarmStatus.warming = true;
  cacheWarmStatus.errors = [];
  const startTime = Date.now();

  try {
    await warmCriticalRoute("published_questions_count", async () => {
      const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM exam_questions WHERE status = 'published'");
      return { count: r.rows[0]?.cnt || 0 };
    });

    await warmCriticalRoute("published_questions_by_tier", async () => {
      const r = await pool.query("SELECT tier, COUNT(*)::int AS cnt FROM exam_questions WHERE status = 'published' GROUP BY tier");
      return r.rows;
    });

    await warmCriticalRoute("flashcard_deck_summary", async () => {
      const r = await pool.query("SELECT id, title, slug, tier, card_count FROM flashcard_decks WHERE visibility = 'public' ORDER BY card_count DESC LIMIT 100");
      return r.rows;
    });

    await warmCriticalRoute("published_lessons_count", async () => {
      const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM lessons WHERE status = 'published'");
      return { count: r.rows[0]?.cnt || 0 };
    });

    await warmCriticalRoute("popular_lessons", async () => {
      const r = await pool.query("SELECT id, title, slug, category, tier FROM lessons WHERE status = 'published' ORDER BY id DESC LIMIT 50");
      return r.rows;
    });

    await warmCriticalRoute("active_users_count", async () => {
      const r = await pool.query("SELECT COUNT(*)::int AS cnt FROM users WHERE tier != 'free' AND tier IS NOT NULL");
      return { count: r.rows[0]?.cnt || 0 };
    });

    cacheWarmStatus.routesWarmed = warmCache.size;
    cacheWarmStatus.lastWarmAt = Date.now();
    console.log(`[ColdStart] Prewarmed ${warmCache.size} critical routes in ${Date.now() - startTime}ms`);
  } catch (err: any) {
    console.error("[ColdStart] Prewarm error:", err.message);
    cacheWarmStatus.errors.push(`prewarm_general: ${err.message}`);
    addAlert("warning", "cold_start", "Prewarm Failed", `Critical route prewarming failed: ${err.message}. Safe mode fallback cache may be empty.`, "prewarm");
  } finally {
    cacheWarmStatus.warming = false;
  }
}

export function startKeepWarmInterval(): void {
  if (keepWarmTimer) return;
  keepWarmTimer = setInterval(() => {
    prewarmCriticalRoutes().catch(err => console.error("[KeepWarm] Error:", err.message));
  }, KEEP_WARM_INTERVAL_MS);
  console.log(`[KeepWarm] Started keep-warm interval (${KEEP_WARM_INTERVAL_MS / 1000}s)`);
}

export function stopKeepWarmInterval(): void {
  if (keepWarmTimer) {
    clearInterval(keepWarmTimer);
    keepWarmTimer = null;
  }
}

const SAFE_MODE_ROUTE_CACHE_MAP: Record<string, string> = {
  "/api/lessons": "popular_lessons",
  "/api/flashcards": "flashcard_deck_summary",
  "/api/flashcard-decks": "flashcard_deck_summary",
  "/api/exam-questions": "published_questions_count",
  "/api/question-bank": "published_questions_count",
  "/api/mock-exams": "published_questions_count",
};

function getSafeModeResponse(path: string): any {
  const cached = (() => {
    for (const [routePrefix, cacheKey] of Object.entries(SAFE_MODE_ROUTE_CACHE_MAP)) {
      if (path.startsWith(routePrefix)) {
        return getWarmCacheEntry(cacheKey);
      }
    }
    return null;
  })();

  if (cached) {
    return { data: cached, _safeMode: true, _cached: true };
  }

  for (const [routePrefix, fallback] of Object.entries(SAFE_MODE_STATIC_FALLBACKS)) {
    if (path.startsWith(routePrefix)) {
      return { data: fallback, _safeMode: true, _static: true };
    }
  }

  return null;
}

export function readOnlyEnforcement() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!emergencyModeActive) return next();

    if (req.method === "OPTIONS") {
      return next();
    }

    if (!req.path.startsWith("/api/")) {
      return next();
    }

    const isInfraPath = Array.from(SAFE_MODE_INFRA_PATHS).some(p => req.path.startsWith(p));
    if (isInfraPath) {
      return next();
    }

    const isAdminException = Array.from(SAFE_MODE_ADMIN_WRITE_EXCEPTIONS).some(p => req.path.startsWith(p));

    if (req.method === "GET" || req.method === "HEAD") {
      const isCoreRead = Array.from(SAFE_MODE_CORE_READ_PATHS).some(p => req.path.startsWith(p));

      if (isCoreRead) {
        const fallback = getSafeModeResponse(req.path);
        if (fallback) {
          return res.json(fallback);
        }
        return res.status(503).json({
          error: "This content is temporarily unavailable during safe mode.",
          safeMode: true,
          _static: true,
        });
      }

      if (isAdminException) {
        return next();
      }

      return res.status(503).json({
        error: "This endpoint is unavailable during safe mode.",
        safeMode: true,
        message: "We're running in safe mode. Only core reading features remain available.",
        allowedReadPaths: Array.from(SAFE_MODE_CORE_READ_PATHS),
      });
    }

    if (isAdminException) {
      return next();
    }

    return res.status(503).json({
      error: "Write operations are disabled during safe mode.",
      safeMode: true,
      emergencyMode: true,
      message: "We're running in safe mode. All write operations are temporarily disabled.",
    });
  };
}

const MINIMAL_CORE_BLOCKED_ROUTES = new Set([
  "/api/ai-tutor",
  "/api/ai/tutor",
  "/api/ai/content",
  "/api/ai/generate",
  "/api/seo/generate",
  "/api/analytics/advanced",
  "/api/admin/seo",
]);

const MINIMAL_CORE_HEAVY_FIELDS = new Set([
  "animations", "richMedia", "interactiveWidgets", "videoEmbeds",
  "advancedCharts", "threeDModels", "lottieData", "svgAnimations",
]);

function stripHeavyContent(data: any): any {
  if (data === null || data === undefined || typeof data !== "object") return data;
  if (Array.isArray(data)) return data.map(stripHeavyContent);
  const result: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (MINIMAL_CORE_HEAVY_FIELDS.has(key)) continue;
    result[key] = (typeof value === "object" && value !== null) ? stripHeavyContent(value) : value;
  }
  return result;
}

export function minimalCoreEnforcement() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!minimalCoreActive) return next();

    const isBlocked = Array.from(MINIMAL_CORE_BLOCKED_ROUTES).some(p => req.path.startsWith(p));
    if (isBlocked) {
      return res.status(503).json({
        error: "This feature is disabled during minimal core mode.",
        minimalCore: true,
        message: "Platform is in minimal core mode. Only essential text-first features are active.",
      });
    }

    if (req.path.startsWith("/api/")) {
      res.setHeader("X-Minimal-Core", "true");
      res.setHeader("X-Render-Mode", "text-first");

      const originalJson = res.json.bind(res);
      res.json = function(body: any) {
        const stripped = stripHeavyContent(body);
        if (stripped && typeof stripped === "object" && !Array.isArray(stripped)) {
          stripped._renderMode = "text-first";
          stripped._minimalCore = true;
        }
        return originalJson(stripped);
      };
    }

    return next();
  };
}

export function registerResilienceRoutes(app: Express): void {
  ensurePlatformTables().catch(() => {});

  if (!healthCheckTimer) {
    setTimeout(() => runHealthChecks(), 5000);
    healthCheckTimer = setInterval(() => runHealthChecks(), HEALTH_CHECK_INTERVAL_MS);
  }

  app.get("/api/platform/status", (_req: Request, res: Response) => {
    res.json({
      emergencyMode: emergencyModeActive,
      safeMode: emergencyModeActive,
      minimalCore: minimalCoreActive,
      renderMode: minimalCoreActive ? "text-first" : emergencyModeActive ? "safe-static" : "full",
      message: emergencyModeActive
        ? "We're running in safe mode. Core reading features remain available."
        : minimalCoreActive
        ? "Platform is in minimal core mode. Only essential features are active."
        : null,
      reason: emergencyModeActive ? emergencyModeReason : minimalCoreActive ? minimalCoreReason : null,
    });
  });

  app.get("/api/platform/feature-flags", (_req: Request, res: Response) => {
    const flags: Record<string, boolean> = {};
    const allFlags = getFeatureFlags();
    for (const flag of allFlags) {
      flags[flag.key] = isFeatureEnabled(flag.key);
    }
    res.json({ flags, emergencyMode: emergencyModeActive });
  });

  app.get("/api/health", async (_req: Request, res: Response) => {
    try {
      if (cachedHealthResponse && Date.now() - cachedHealthResponse.timestamp < HEALTH_CACHE_TTL) {
        const status = cachedHealthResponse.status;
        return res.status(status === "down" ? 503 : 200).json({
          status,
          emergency: isEmergencyMode(),
          services: cachedHealthResponse.services,
          timestamp: cachedHealthResponse.timestamp,
          uptime: process.uptime(),
          cached: true,
        });
      }

      const results = await runHealthChecks();
      const overallStatus = results.some((r) => r.status === "down")
        ? "down"
        : results.some((r) => r.status === "degraded")
        ? "degraded"
        : "healthy";

      res.status(overallStatus === "down" ? 503 : 200).json({
        status: overallStatus,
        emergency: isEmergencyMode(),
        services: results,
        timestamp: Date.now(),
        uptime: process.uptime(),
      });
    } catch {
      res.status(503).json({ status: "down", emergency: isEmergencyMode(), services: [], timestamp: Date.now() });
    }
  });

  app.get("/api/health/ready", async (_req: Request, res: Response) => {
    try {
      await pool.query("SELECT 1");
      res.json({ ready: true, timestamp: Date.now() });
    } catch {
      res.status(503).json({ ready: false, timestamp: Date.now() });
    }
  });

  app.get("/api/platform/minimal-core", (_req: Request, res: Response) => {
    res.json({
      minimalCore: minimalCoreActive,
      safeMode: emergencyModeActive,
    });
  });

  app.get("/api/admin/resilience/status", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const healthResults = await runHealthChecks();
    res.json({
      circuitBreakers: getCircuitBreakerStates(),
      featureFlags: getFeatureFlags(),
      killSwitches: getKillSwitches(),
      healthChecks: healthResults,
      emergencyMode: getEmergencyModeStatus(),
      safeMode: getSafeModeStatus(),
      minimalCore: getMinimalCoreStatus(),
      errorBudgets: getErrorBudgets(),
      cacheWarmStatus: getCacheWarmStatus(),
      provisionalAccess: getProvisionalAccessGrants(),
      selfHealingLog: getSelfHealingLog(),
      events: getResilienceEvents(100),
      timestamp: Date.now(),
    });
  });

  app.post("/api/admin/resilience/feature-flags/:key", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const { key } = req.params;
    const { enabled, reason } = req.body;
    if (typeof enabled !== "boolean") {
      return res.status(400).json({ error: "enabled must be a boolean" });
    }
    setFeatureFlag(key, enabled, reason, admin.username || admin.id);
    res.json({ success: true, flag: featureFlags.get(key) });
  });

  app.post("/api/admin/resilience/feature-flags/:key/reset-errors", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    resetFeatureErrors(req.params.key);
    res.json({ success: true });
  });

  app.post("/api/admin/resilience/kill-switch", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const { key, scope, target, reason, active } = req.body;
    if (!key || !scope || !target) {
      return res.status(400).json({ error: "key, scope, and target are required" });
    }
    if (active === false) {
      deactivateKillSwitch(key);
    } else {
      activateKillSwitch(key, scope, target, reason || "admin_action", admin.username);
    }
    res.json({ success: true, killSwitch: killSwitches.get(key) });
  });

  app.post("/api/admin/resilience/circuit-breaker/:name/reset", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    resetCircuitBreaker(req.params.name);
    res.json({ success: true });
  });

  app.post("/api/admin/resilience/emergency-mode", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const { active, reason } = req.body;
    if (active) {
      activateEmergencyMode(reason || "admin_activated", admin.username || admin.id);
    } else {
      deactivateEmergencyMode(admin.username || admin.id);
    }
    res.json({ success: true, emergencyMode: getEmergencyModeStatus() });
  });

  app.post("/api/admin/resilience/provisional-access", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const { userId, reason } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    grantProvisionalAccess(userId, reason || "admin_grant");
    res.json({ success: true });
  });

  app.post("/api/admin/resilience/clear-entitlement-cache", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    clearEntitlementCache(req.body.userId);
    res.json({ success: true });
  });

  app.get("/api/admin/resilience/alerts", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
    const severity = req.query.severity as string;
    try {
      let query = `SELECT id, severity, category, title, message, source, acknowledged, data, created_at as "createdAt" FROM platform_alerts`;
      const params: any[] = [];
      if (severity) {
        query += ` WHERE severity = $1`;
        params.push(severity);
      }
      query += ` ORDER BY created_at DESC LIMIT ${limit}`;
      const result = await pool.query(query, params);
      const countResult = await pool.query(
        severity ? `SELECT COUNT(*)::int AS total FROM platform_alerts WHERE severity = $1` : `SELECT COUNT(*)::int AS total FROM platform_alerts`,
        severity ? [severity] : []
      );
      res.json({ alerts: result.rows, total: countResult.rows[0]?.total || 0 });
    } catch {
      let filtered = alertEvents;
      if (severity) filtered = filtered.filter(a => a.severity === severity);
      res.json({ alerts: filtered.slice(0, limit), total: filtered.length });
    }
  });

  app.post("/api/admin/resilience/alerts/:id/acknowledge", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const alertId = req.params.id as string;
    const memAlert = alertEvents.find(a => a.id === alertId);
    if (memAlert) memAlert.acknowledged = true;
    try {
      await pool.query(`UPDATE platform_alerts SET acknowledged = true WHERE id = $1`, [alertId]);
    } catch {}
    addResilienceAudit("alert_acknowledged", "alert", alertId, { title: memAlert?.title }, admin.username || admin.id);
    res.json({ success: true });
  });

  app.get("/api/admin/resilience/audit-log", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
    try {
      const result = await pool.query(
        `SELECT id, actor_id as "actor", entity_type as "entity", entity_id as "entityId", action, after_json as "details", created_at as "timestamp" FROM audit_logs WHERE entity_type IN ('platform', 'feature_flag', 'circuit_breaker', 'kill_switch', 'alert', 'emergency_mode') ORDER BY created_at DESC LIMIT $1`,
        [limit]
      );
      const countResult = await pool.query(
        `SELECT COUNT(*)::int AS total FROM audit_logs WHERE entity_type IN ('platform', 'feature_flag', 'circuit_breaker', 'kill_switch', 'alert', 'emergency_mode')`
      );
      res.json({ entries: result.rows, total: countResult.rows[0]?.total || 0 });
    } catch {
      res.json({ entries: resilienceAuditLog.slice(0, limit), total: resilienceAuditLog.length });
    }
  });

  app.post("/api/admin/resilience/health-check/run", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    await runHealthChecks();
    res.json({ success: true, results: getLastHealthResults() });
  });

  app.get("/api/admin/resilience/health-history", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    try {
      const result = await pool.query(
        `SELECT service, status, latency_ms, details, checked_at FROM platform_health_checks ORDER BY checked_at DESC LIMIT 200`
      );
      res.json({ history: result.rows });
    } catch {
      res.json({ history: [] });
    }
  });

  app.get("/api/admin/resilience/error-budgets", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    res.json({ errorBudgets: getErrorBudgets(), timestamp: Date.now() });
  });

  app.post("/api/admin/resilience/error-budgets/:subsystem/reset", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    resetErrorBudget(req.params.subsystem);
    addResilienceAudit("error_budget_reset", "error_budget", req.params.subsystem, {}, admin.username || admin.id);
    res.json({ success: true });
  });

  app.post("/api/admin/resilience/minimal-core", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    const { active, reason } = req.body;
    if (active) {
      activateMinimalCore(reason || "admin_activated", admin.username || admin.id);
    } else {
      deactivateMinimalCore(admin.username || admin.id);
    }
    res.json({ success: true, minimalCore: getMinimalCoreStatus() });
  });

  app.get("/api/admin/resilience/cache-warm", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    res.json({ cacheWarmStatus: getCacheWarmStatus(), timestamp: Date.now() });
  });

  app.post("/api/admin/resilience/cache-warm/run", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    await prewarmCriticalRoutes();
    addResilienceAudit("cache_warm_manual", "platform", "cache_warm", {}, admin.username || admin.id);
    res.json({ success: true, cacheWarmStatus: getCacheWarmStatus() });
  });

  app.get("/api/admin/resilience/dashboard", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;
    res.json({
      safeMode: getSafeModeStatus(),
      minimalCore: getMinimalCoreStatus(),
      errorBudgets: getErrorBudgets(),
      cacheWarmStatus: getCacheWarmStatus(),
      circuitBreakers: getCircuitBreakerStates(),
      featureFlags: getFeatureFlags().map(f => ({
        key: f.key,
        enabled: isFeatureEnabled(f.key),
        description: f.description,
        errorCount: f.errorCount,
        disabledReason: f.disabledReason,
      })),
      healthSummary: {
        lastCheck: cachedHealthResponse?.timestamp || null,
        overallStatus: cachedHealthResponse?.status || "unknown",
        servicesDown: cachedHealthResponse?.services.filter(s => s.status === "down").length || 0,
        servicesDegraded: cachedHealthResponse?.services.filter(s => s.status === "degraded").length || 0,
      },
      timestamp: Date.now(),
    });
  });

}
