import type { Express, Request, Response, NextFunction } from "express";
import { pool } from "./storage";

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
  if (cb.state === "half-open") {
    cb.state = "open";
    cb.openedAt = Date.now();
    cb.tripCount++;
    console.error(`[CircuitBreaker] RE-TRIPPED from half-open: ${serviceName} (trip #${cb.tripCount})`);
    addResilienceEvent("circuit_breaker_trip", serviceName, { failureCount: cb.failureCount, tripCount: cb.tripCount, fromHalfOpen: true });
  } else if (cb.state === "closed" && cb.failureCount >= cb.failureThreshold) {
    cb.state = "open";
    cb.openedAt = Date.now();
    cb.tripCount++;
    console.error(`[CircuitBreaker] TRIPPED: ${serviceName} (failures: ${cb.failureCount}, trip #${cb.tripCount})`);
    addResilienceEvent("circuit_breaker_trip", serviceName, { failureCount: cb.failureCount, tripCount: cb.tripCount });
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
  { key: "ai_tutor", description: "AI tutoring assistant", enabled: true, autoDisable: true, errorThreshold: 5 },
  { key: "ai_content_gen", description: "AI content generation", enabled: true, autoDisable: true, errorThreshold: 5 },
  { key: "stripe_payments", description: "Stripe payment processing", enabled: true, autoDisable: false },
  { key: "email_notifications", description: "Email notification system", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "sms_notifications", description: "SMS notification system", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "offline_sync", description: "Offline synchronization", enabled: true, autoDisable: true, errorThreshold: 15 },
  { key: "seo_generation", description: "SEO content generation", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "question_bank", description: "Question bank service", enabled: true, autoDisable: true, errorThreshold: 10 },
  { key: "lesson_rendering", description: "Lesson content rendering", enabled: true, autoDisable: true, errorThreshold: 10 },
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
  const flag = featureFlags.get(key);
  if (!flag) return true;
  if (flag.adminOverride !== null) return flag.adminOverride;
  return flag.enabled;
}

export function setFeatureFlag(key: string, enabled: boolean, reason?: string): void {
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
  addResilienceEvent("feature_flag_toggle", key, { enabled, reason });
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

export async function runHealthChecks(): Promise<HealthCheckResult[]> {
  const checks = await Promise.allSettled([
    checkDatabaseHealth(),
    checkAuthHealth(),
    checkExamHealth(),
    checkFlashcardHealth(),
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
  return results;
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

export function activateEmergencyMode(reason: string): void {
  emergencyModeActive = true;
  emergencyModeReason = reason;
  emergencyModeActivatedAt = Date.now();
  console.error(`[EMERGENCY MODE] ACTIVATED: ${reason}`);
  addResilienceEvent("emergency_mode_activated", "system", { reason });
}

export function deactivateEmergencyMode(): void {
  emergencyModeActive = false;
  emergencyModeReason = null;
  emergencyModeActivatedAt = null;
  addResilienceEvent("emergency_mode_deactivated", "system", {});
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
    const { resolveAuthUser } = await import("./admin-auth");
    const user = await resolveAuthUser(req as any);
    if (!user || user.tier !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return null;
    }
    return user;
  } catch {
    res.status(403).json({ error: "Admin access required" });
    return null;
  }
}

export function registerResilienceRoutes(app: Express): void {
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
    setFeatureFlag(key, enabled, reason);
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
      activateEmergencyMode(reason || "admin_activated");
    } else {
      deactivateEmergencyMode();
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
}
