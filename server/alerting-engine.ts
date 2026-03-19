import pg from "pg";
import { sendAdminNotification } from "./admin-notifications";
import { getNotificationSettings } from "./admin-notifications";
import { evaluateAlert, recordEmailSent, type AlertCategory } from "./alert-coordinator";

export type AlertType =
  | "failure_rate_spike"
  | "fallback_usage_spike"
  | "entitlement_anomaly"
  | "backup_generation_failure"
  | "quarantine_event"
  | "protected_recovery_excessive"
  | "synthetic_test_failure"
  | "circuit_breaker_trip"
  | "emergency_mode_activated"
  | "zero_valid_items"
  | "lkg_failover_repeated"
  | "payment_sync_spike"
  | "memory_pressure"
  | "content_validation_failure"
  | "deploy_smoke_failure"
  | "exam_flow_failure"
  | "resource_budget_violation";

export type AlertSeverity = "info" | "warning" | "critical";

interface AlertThresholds {
  failureRatePercent: number;
  fallbackRatePercent: number;
  quarantineCountPerHour: number;
  protectedRecoveryCountPerHour: number;
  backupFailureCountPerHour: number;
  entitlementMismatchCountPerHour: number;
  cooldownMinutes: number;
  zeroValidItemsThreshold: number;
  lkgFailoverCountPerHour: number;
  paymentSyncErrorCountPerHour: number;
}

const DEFAULT_THRESHOLDS: AlertThresholds = {
  failureRatePercent: 5,
  fallbackRatePercent: 10,
  quarantineCountPerHour: 3,
  protectedRecoveryCountPerHour: 10,
  backupFailureCountPerHour: 2,
  entitlementMismatchCountPerHour: 5,
  cooldownMinutes: 15,
  zeroValidItemsThreshold: 1,
  lkgFailoverCountPerHour: 5,
  paymentSyncErrorCountPerHour: 3,
};

const HARD_RATE_LIMIT_MS = 30 * 60 * 1000;

const PER_TYPE_COOLDOWNS: Record<string, number> = {
  failure_rate_spike: 10,
  fallback_usage_spike: 15,
  entitlement_anomaly: 30,
  backup_generation_failure: 20,
  quarantine_event: 5,
  protected_recovery_excessive: 15,
  synthetic_test_failure: 10,
  circuit_breaker_trip: 5,
  emergency_mode_activated: 30,
  zero_valid_items: 60,
  lkg_failover_repeated: 15,
  payment_sync_spike: 20,
  memory_pressure: 10,
  content_validation_failure: 15,
  deploy_smoke_failure: 5,
  exam_flow_failure: 5,
  resource_budget_violation: 10,
};

let thresholds: AlertThresholds = { ...DEFAULT_THRESHOLDS };

interface IncidentGroup {
  groupId: string;
  component: string;
  severity: AlertSeverity;
  alertTypes: AlertType[];
  alertCount: number;
  firstSeen: number;
  lastSeen: number;
  suppressed: number;
  summary: string;
  notified: boolean;
  affectedScope: string[];
}

const incidentGroups = new Map<string, IncidentGroup>();
const INCIDENT_GROUP_WINDOW_MS = 15 * 60 * 1000;
const MAX_INCIDENT_GROUPS = 100;
const DEDUP_WINDOW_MS = 5 * 60 * 1000;
const dedupHistory = new Map<string, { count: number; firstSeen: number; lastSeen: number }>();

function getComponentFromAlertType(alertType: AlertType): string {
  if (alertType.includes("failure_rate") || alertType.includes("fallback")) return "request_pipeline";
  if (alertType.includes("exam") || alertType.includes("cat")) return "exam_system";
  if (alertType.includes("content") || alertType.includes("quarantine") || alertType.includes("zero_valid")) return "content_system";
  if (alertType.includes("payment") || alertType.includes("entitlement") || alertType.includes("stripe")) return "billing_system";
  if (alertType.includes("circuit") || alertType.includes("emergency") || alertType.includes("memory")) return "platform_health";
  if (alertType.includes("deploy") || alertType.includes("smoke")) return "deployment";
  return "general";
}

function getOrCreateIncidentGroup(alertType: AlertType, severity: AlertSeverity): IncidentGroup {
  const component = getComponentFromAlertType(alertType);
  const activeGroup = Array.from(incidentGroups.values()).find(
    g => g.component === component && Date.now() - g.lastSeen < INCIDENT_GROUP_WINDOW_MS
  );

  if (activeGroup) {
    activeGroup.lastSeen = Date.now();
    activeGroup.alertCount++;
    if (!activeGroup.alertTypes.includes(alertType)) activeGroup.alertTypes.push(alertType);
    if (severityRank(severity) > severityRank(activeGroup.severity)) activeGroup.severity = severity;
    return activeGroup;
  }

  const group: IncidentGroup = {
    groupId: `grp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    component,
    severity,
    alertTypes: [alertType],
    alertCount: 1,
    firstSeen: Date.now(),
    lastSeen: Date.now(),
    suppressed: 0,
    summary: "",
    notified: false,
    affectedScope: [alertType],
  };
  incidentGroups.set(group.groupId, group);
  if (incidentGroups.size > MAX_INCIDENT_GROUPS) {
    const oldest = Array.from(incidentGroups.entries()).sort((a, b) => a[1].lastSeen - b[1].lastSeen)[0];
    if (oldest) incidentGroups.delete(oldest[0]);
  }
  return group;
}

function severityRank(s: AlertSeverity): number {
  return s === "critical" ? 3 : s === "warning" ? 2 : 1;
}

function isDuplicate(alertType: AlertType, message: string): boolean {
  const key = `${alertType}::${message.substring(0, 100)}`;
  const existing = dedupHistory.get(key);
  if (existing && Date.now() - existing.lastSeen < DEDUP_WINDOW_MS) {
    existing.count++;
    existing.lastSeen = Date.now();
    return true;
  }
  dedupHistory.set(key, { count: 1, firstSeen: Date.now(), lastSeen: Date.now() });
  if (dedupHistory.size > 500) {
    const cutoff = Date.now() - DEDUP_WINDOW_MS;
    for (const [k, v] of dedupHistory) {
      if (v.lastSeen < cutoff) dedupHistory.delete(k);
    }
  }
  return false;
}

export function buildOperatorSummary(alertType: AlertType, severity: AlertSeverity, message: string, metadata: Record<string, any>): string {
  const component = getComponentFromAlertType(alertType);
  const group = Array.from(incidentGroups.values()).find(
    g => g.component === component && Date.now() - g.lastSeen < INCIDENT_GROUP_WINDOW_MS
  );
  const isNewIncident = !group || group.alertCount <= 1;

  const userImpact = severity === "critical"
    ? "Users may be unable to access core functionality"
    : severity === "warning"
    ? "Some users may experience degraded service"
    : "No immediate user impact expected";

  return [
    `WHAT FAILED: ${message}`,
    `SEVERITY: ${severity.toUpperCase()}`,
    `USER IMPACT: ${userImpact}`,
    `AFFECTED COMPONENT: ${component}`,
    isNewIncident ? "STATUS: New incident" : `STATUS: Part of existing incident (${group?.alertCount || 0} related alerts)`,
    group && group.suppressed > 0 ? `SUPPRESSED: ${group.suppressed} duplicate alerts` : "",
  ].filter(Boolean).join("\n");
}

export function getIncidentGroups(): IncidentGroup[] {
  return Array.from(incidentGroups.values())
    .filter(g => Date.now() - g.lastSeen < INCIDENT_GROUP_WINDOW_MS)
    .sort((a, b) => b.lastSeen - a.lastSeen);
}

export function getAlertCountByType(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [key, ts] of recentAlerts) {
    const alertType = key.split(":")[0];
    counts[alertType] = (counts[alertType] || 0) + 1;
  }
  return counts;
}

const recentAlerts = new Map<string, number>();
const MAX_RECENT_ALERTS = 500;

const hardRateLimitMap = new Map<string, number>();
const incidentTypeCooldowns = new Map<AlertType, number>();
const alertCountsPerHour = new Map<string, { count: number; windowStart: number }>();
const MAX_ALERTS_PER_TYPE_PER_HOUR = 5;

const EMAIL_RATE_LIMIT_MS = 10 * 60 * 1000;
const emailRateLimit = new Map<string, number>();

function getEmailRateLimitKey(alertType: AlertType, severity: AlertSeverity, context?: string): string {
  return context ? `${alertType}:${severity}:${context}` : `${alertType}:${severity}`;
}

function isEmailRateLimited(alertType: AlertType, severity: AlertSeverity, context?: string): boolean {
  const key = getEmailRateLimitKey(alertType, severity, context);
  const lastSent = emailRateLimit.get(key);
  if (!lastSent) return false;
  return Date.now() - lastSent < EMAIL_RATE_LIMIT_MS;
}

function markEmailSent(alertType: AlertType, severity: AlertSeverity, context?: string): void {
  emailRateLimit.set(getEmailRateLimitKey(alertType, severity, context), Date.now());
}

function evictExpiredAlerts(): void {
  const now = Date.now();

  for (const [key, ts] of hardRateLimitMap) {
    if (now - ts > HARD_RATE_LIMIT_MS) hardRateLimitMap.delete(key);
  }
  for (const [key, group] of incidentGroups) {
    if (now - group.lastSeen > HARD_RATE_LIMIT_MS) incidentGroups.delete(key);
  }
}

function isRateLimited(alertType: AlertType): boolean {
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;
  const entry = alertCountsPerHour.get(alertType);
  if (!entry || now - entry.windowStart > hourMs) {
    alertCountsPerHour.set(alertType, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= MAX_ALERTS_PER_TYPE_PER_HOUR) {
    return true;
  }
  entry.count++;
  return false;
}

export function getAlertThresholds(): AlertThresholds {
  return { ...thresholds };
}

export function updateAlertThresholds(updates: Partial<AlertThresholds>): void {
  for (const [key, value] of Object.entries(updates)) {
    if (key in thresholds && typeof value === "number" && value > 0) {
      (thresholds as any)[key] = value;
    }
  }
  console.log(`[AlertEngine] Thresholds updated: ${JSON.stringify(updates)}`);
}

export async function loadThresholdsFromDb(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(
      `SELECT value FROM admin_settings WHERE key = 'alert_thresholds'`
    );
    if (result.rows.length > 0) {
      const saved = JSON.parse(result.rows[0].value);
      thresholds = { ...DEFAULT_THRESHOLDS, ...saved };
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.warn("[AlertEngine] Failed to load thresholds from DB:", e.message);
    }
  }
}

export async function setAlertThresholds(updates: Partial<AlertThresholds>, pool?: pg.Pool): Promise<AlertThresholds> {
  const validated: Partial<AlertThresholds> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (key in thresholds) {
      const num = typeof value === "number" ? value : parseFloat(value as any);
      if (!Number.isFinite(num) || num < 0) {
        throw new Error(`Invalid threshold value for ${key}: must be a finite non-negative number`);
      }
      (validated as any)[key] = num;
    }
  }
  thresholds = { ...thresholds, ...validated };
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO admin_settings (key, value, updated_at) VALUES ('alert_thresholds', $1, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
        [JSON.stringify(thresholds)]
      );
    } catch (e: any) {
      console.warn("[AlertEngine] Failed to persist thresholds:", e.message);
    }
  }
  return { ...thresholds };
}

function getGroupKey(alertType: AlertType, context?: string): string {
  return context ? `${alertType}:${context}` : alertType;
}

function isInCooldown(alertType: AlertType, _context?: string): boolean {
  const lastFired = incidentTypeCooldowns.get(alertType);
  if (!lastFired) return false;
  const perTypeCooldownMin = PER_TYPE_COOLDOWNS[alertType] ?? thresholds.cooldownMinutes;
  const cooldownMs = perTypeCooldownMin * 60 * 1000;
  return Date.now() - lastFired < cooldownMs;
}

function markFired(alertType: AlertType, _context?: string): void {
  incidentTypeCooldowns.set(alertType, Date.now());
  evictExpiredAlerts();
}

export async function fireAlert(
  pool: pg.Pool,
  alertType: AlertType,
  severity: AlertSeverity,
  message: string,
  metadata: Record<string, any> = {},
  context?: string
): Promise<string | null> {
  if (isInCooldown(alertType, context)) {
    const group = getOrCreateIncidentGroup(alertType, severity);
    group.suppressed++;
    const scope = context || alertType;
    if (!group.affectedScope.includes(scope)) group.affectedScope.push(scope);
    persistIncidentGroupUpdate(pool, group).catch(() => {});
    console.log(`[AlertEngine] Suppressed (cooldown): ${alertType} - ${message}`);
    return null;
  }

  if (isDuplicate(alertType, message)) {
    const group = getOrCreateIncidentGroup(alertType, severity);
    group.suppressed++;
    console.log(`[AlertEngine] Suppressed (dedup): ${alertType} - ${message}`);
    return null;
  }

  const rateLimited = isRateLimited(alertType);
  const group = getOrCreateIncidentGroup(alertType, severity);
  group.summary = buildOperatorSummary(alertType, severity, message, metadata);
  const scope = context || alertType;
  if (!group.affectedScope.includes(scope)) group.affectedScope.push(scope);
  const now = Date.now();

  try {
    const enrichedMetadata = {
      ...metadata,
      incidentGroupId: group.groupId,
      component: group.component,
      operatorSummary: group.summary,
      isNewIncident: group.alertCount <= 1,
      relatedAlertCount: group.alertCount,
      firstSeen: new Date(group.firstSeen).toISOString(),
      affectedScope: group.affectedScope,
    };

    const result = await pool.query(
      `INSERT INTO reliability_alerts (alert_type, severity, message, metadata)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [alertType, severity, message, JSON.stringify(enrichedMetadata)]
    );
    const alertId = result.rows[0]?.id;
    markFired(alertType, context);

    const recentKey = `${alertType}:${context || "global"}:${now}`;
    recentAlerts.set(recentKey, now);
    if (recentAlerts.size > MAX_RECENT_ALERTS) {
      const oldest = recentAlerts.keys().next().value;
      if (oldest) recentAlerts.delete(oldest);
    }

    console.log(`[AlertEngine] ALERT ${severity.toUpperCase()}: [${alertType}] ${message} (incident #${group.alertCount})`);

    if (isEmailRateLimited(alertType, severity, context)) {
      console.log(`[AlertEngine] Email suppressed (rate limit): ${alertType}`);
      return alertId;
    }

    const coordinatorCategory = alertType as unknown as AlertCategory;
    const decision = evaluateAlert(coordinatorCategory, severity, message, context);

    if (decision.shouldSendEmail) {
      const settings = await getNotificationSettings(pool);
      const shouldSend =
        (severity === "critical" && settings.notifyOnCriticalIncident) ||
        (severity === "warning" && settings.notifyOnWarningIncident);

      if (shouldSend) {
        const severityEmoji = severity === "critical" ? "🔴" : severity === "warning" ? "🟡" : "🔵";
        type NotificationEventType = "service_down" | "synthetic_test_failure" | "content_integrity_failure" | "reliability_warning" | "reliability_alert";
        const eventTypeMap: Record<AlertType, NotificationEventType> = {
          emergency_mode_activated: "service_down",
          circuit_breaker_trip: "service_down",
          synthetic_test_failure: "synthetic_test_failure",
          zero_valid_items: "content_integrity_failure",
          quarantine_event: "content_integrity_failure",
          backup_generation_failure: "content_integrity_failure",
          failure_rate_spike: "reliability_warning",
          fallback_usage_spike: "reliability_warning",
          entitlement_anomaly: "reliability_warning",
          protected_recovery_excessive: "reliability_warning",
          lkg_failover_repeated: "reliability_warning",
          payment_sync_spike: "reliability_warning",
        };
        const notificationEvent = eventTypeMap[alertType] || (severity === "critical" ? "service_down" : "reliability_warning");
        const incidentInfo = group.alertCount > 1
          ? `\n\nIncident Group: ${group.alertCount} occurrences\nFirst seen: ${new Date(group.firstSeen).toISOString()}\nLast seen: ${new Date(group.lastSeen).toISOString()}`
          : "";
        try {
          await sendAdminNotification(pool, {
            event: notificationEvent,
            alertType,
            alertSeverity: severity,
            details: `${severityEmoji} Reliability Alert: ${message}\n\nType: ${alertType}\nSeverity: ${severity}\nTime: ${new Date().toISOString()}${incidentInfo}\n\n${group.summary}`,
          });
          recordEmailSent(decision.incidentSignature);
        } catch (e: any) {
          console.error("[AlertEngine] Notification send failed:", e.message);
        }
      }
      group.notified = true;
    } else {
      console.log(`[AlertEngine] Email suppressed (${decision.reason}): ${alertType} - ${message}`);
    }

    return alertId;
  } catch (e: any) {
    console.error("[AlertEngine] Failed to fire alert:", e.message);
    return null;
  }
}

export async function checkFailureRateAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) FILTER (WHERE status_code >= 500)::int AS errors,
        COUNT(*)::int AS total
      FROM (
        SELECT CASE 
          WHEN delivered_tier = 'exhausted' THEN 503
          ELSE 200
        END AS status_code
        FROM orchestrator_routing_decisions
        WHERE created_at > NOW() - INTERVAL '15 minutes'
      ) sub
    `);
    const { errors, total } = result.rows[0] || { errors: 0, total: 0 };
    if (total < 10) return;
    const rate = (errors / total) * 100;
    if (rate >= thresholds.failureRatePercent) {
      await fireAlert(pool, "failure_rate_spike", rate >= 15 ? "critical" : "warning",
        `Failure rate spike: ${rate.toFixed(1)}% (${errors}/${total} requests in last 15min, threshold: ${thresholds.failureRatePercent}%)`,
        { rate, errors, total, threshold: thresholds.failureRatePercent }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] checkFailureRateAlert error:", e.message);
    }
  }
}

export async function checkFallbackRateAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) FILTER (WHERE delivered_tier != 'primary')::int AS fallbacks,
        COUNT(*)::int AS total
      FROM orchestrator_routing_decisions
      WHERE created_at > NOW() - INTERVAL '15 minutes'
    `);
    const { fallbacks, total } = result.rows[0] || { fallbacks: 0, total: 0 };
    if (total < 10) return;
    const rate = (fallbacks / total) * 100;
    if (rate >= thresholds.fallbackRatePercent) {
      await fireAlert(pool, "fallback_usage_spike", rate >= 25 ? "critical" : "warning",
        `Fallback usage spike: ${rate.toFixed(1)}% (${fallbacks}/${total} requests in last 15min, threshold: ${thresholds.fallbackRatePercent}%)`,
        { rate, fallbacks, total, threshold: thresholds.fallbackRatePercent }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] checkFallbackRateAlert error:", e.message);
    }
  }
}

export async function checkQuarantineAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM content_quarantine
      WHERE created_at > NOW() - INTERVAL '1 hour'
    `);
    const count = result.rows[0]?.count || 0;
    if (count >= thresholds.quarantineCountPerHour) {
      await fireAlert(pool, "quarantine_event", count >= 10 ? "critical" : "warning",
        `Quarantine spike: ${count} items quarantined in the last hour (threshold: ${thresholds.quarantineCountPerHour})`,
        { count, threshold: thresholds.quarantineCountPerHour }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] checkQuarantineAlert error:", e.message);
    }
  }
}

export async function checkBackupFailureAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM backup_artifacts
      WHERE status = 'failed' AND generated_at > NOW() - INTERVAL '1 hour'
    `);
    const count = result.rows[0]?.count || 0;
    if (count >= thresholds.backupFailureCountPerHour) {
      await fireAlert(pool, "backup_generation_failure", "critical",
        `Backup generation failures: ${count} in the last hour (threshold: ${thresholds.backupFailureCountPerHour})`,
        { count, threshold: thresholds.backupFailureCountPerHour }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] checkBackupFailureAlert error:", e.message);
    }
  }
}

export async function checkEntitlementAnomalyAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM users
      WHERE subscription_status = 'active'
        AND stripe_subscription_id IS NOT NULL
        AND (tier = 'free' OR tier IS NULL)
    `);
    const count = result.rows[0]?.count || 0;
    if (count >= thresholds.entitlementMismatchCountPerHour) {
      await fireAlert(pool, "entitlement_anomaly", "critical",
        `Entitlement mismatch: ${count} users with active Stripe subscription but free tier`,
        { count, threshold: thresholds.entitlementMismatchCountPerHour }
      );
    }
  } catch (e: any) {
    console.error("[AlertEngine] checkEntitlementAnomalyAlert error:", e.message);
  }
}

export async function checkProtectedRecoveryAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM orchestrator_routing_decisions
      WHERE delivered_tier IN ('last_known_good', 'backup_snapshot', 'substitute_equivalent', 'static_fallback')
        AND created_at > NOW() - INTERVAL '1 hour'
    `);
    const count = result.rows[0]?.count || 0;
    if (count >= thresholds.protectedRecoveryCountPerHour) {
      await fireAlert(pool, "protected_recovery_excessive", count >= 30 ? "critical" : "warning",
        `Excessive protected recovery events: ${count} fallback deliveries in the last hour (threshold: ${thresholds.protectedRecoveryCountPerHour})`,
        { count, threshold: thresholds.protectedRecoveryCountPerHour }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] checkProtectedRecoveryAlert error:", e.message);
    }
  }
}

export async function checkCircuitBreakerAlert(pool: pg.Pool): Promise<void> {
  try {
    const { getCircuitBreakerStates } = await import("./platform-resilience");
    const states = getCircuitBreakerStates();
    const openBreakers = states.filter((s: any) => s.state === "open");
    if (openBreakers.length > 0) {
      await fireAlert(pool, "circuit_breaker_trip", openBreakers.length >= 3 ? "critical" : "warning",
        `Circuit breaker(s) open: ${openBreakers.map((s: any) => s.name).join(", ")}`,
        { openBreakers: openBreakers.map((s: any) => ({ name: s.name, failureCount: s.failureCount, tripCount: s.tripCount })) }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist") && !e.message?.includes("is not a function")) {
      console.error("[AlertEngine] checkCircuitBreakerAlert error:", e.message);
    }
  }
}

export async function checkEmergencyModeAlert(pool: pg.Pool): Promise<void> {
  try {
    const { isEmergencyMode } = await import("./platform-resilience");
    if (isEmergencyMode()) {
      await fireAlert(pool, "emergency_mode_activated", "critical",
        "Platform Emergency Mode is active - non-essential features disabled",
        { activatedAt: new Date().toISOString() }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("is not a function")) {
      console.error("[AlertEngine] checkEmergencyModeAlert error:", e.message);
    }
  }
}

export async function fireQuarantineAlert(pool: pg.Pool, contentId: string, contentType: string, reason: string): Promise<void> {
  await fireAlert(pool, "quarantine_event", "warning",
    `Content quarantined: ${contentType} ${contentId} - ${reason}`,
    { contentId, contentType, reason },
    `quarantine:${contentId}`
  );
}

export async function fireBackupFailureAlert(pool: pg.Pool, contentId: string, error: string): Promise<void> {
  await fireAlert(pool, "backup_generation_failure", "critical",
    `Backup generation failed for content ${contentId}: ${error}`,
    { contentId, error },
    `backup:${contentId}`
  );
}

export async function fireEntitlementMismatchAlert(pool: pg.Pool, userId: string, stripeTier: string, dbTier: string): Promise<void> {
  await fireAlert(pool, "entitlement_anomaly", "warning",
    `Entitlement mismatch for user ${userId}: Stripe says ${stripeTier}, DB has ${dbTier}`,
    { userId, stripeTier, dbTier },
    `entitlement:${userId}`
  );
}

export async function fireSyntheticTestFailureAlert(pool: pg.Pool, testName: string, error: string, responseTimeMs?: number): Promise<void> {
  await fireAlert(pool, "synthetic_test_failure", "critical",
    `Synthetic test failed: ${testName} - ${error}`,
    { testName, error, responseTimeMs },
    `synthetic:${testName}`
  );
}

export async function checkZeroValidItemsAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT ci.id, ci.title, ci.type
      FROM content_items ci
      WHERE ci.status = 'published'
        AND (ci.content IS NULL OR ci.content::text = '[]' OR ci.content::text = '{}' OR ci.content::text = 'null')
    `);
    const count = result.rows.length;
    if (count >= thresholds.zeroValidItemsThreshold) {
      await fireAlert(pool, "zero_valid_items", "critical",
        `${count} published content item(s) have zero valid items: ${result.rows.slice(0, 5).map((r: any) => r.title || r.id).join(", ")}`,
        { count, items: result.rows.slice(0, 10).map((r: any) => ({ id: r.id, title: r.title, type: r.type })), threshold: thresholds.zeroValidItemsThreshold }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] checkZeroValidItemsAlert error:", e.message);
    }
  }
}

export async function checkLkgFailoverRepeatedAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM orchestrator_routing_decisions
      WHERE delivered_tier = 'last_known_good'
        AND created_at > NOW() - INTERVAL '1 hour'
    `);
    const count = result.rows[0]?.count || 0;
    if (count >= thresholds.lkgFailoverCountPerHour) {
      await fireAlert(pool, "lkg_failover_repeated", count >= 15 ? "critical" : "warning",
        `Last-known-good failover triggered ${count} times in the last hour (threshold: ${thresholds.lkgFailoverCountPerHour})`,
        { count, threshold: thresholds.lkgFailoverCountPerHour }
      );
    }
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] checkLkgFailoverRepeatedAlert error:", e.message);
    }
  }
}

export async function checkPaymentSyncSpikeAlert(pool: pg.Pool): Promise<void> {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS count
      FROM users
      WHERE subscription_status = 'past_due'
        OR (subscription_status = 'active' AND (tier IS NULL OR tier = 'free'))
    `);
    const count = result.rows[0]?.count || 0;
    if (count >= thresholds.paymentSyncErrorCountPerHour) {
      await fireAlert(pool, "payment_sync_spike", count >= 10 ? "critical" : "warning",
        `Payment sync errors: ${count} users with subscription status mismatches (threshold: ${thresholds.paymentSyncErrorCountPerHour})`,
        { count, threshold: thresholds.paymentSyncErrorCountPerHour }
      );
    }
  } catch (e: any) {
    console.error("[AlertEngine] checkPaymentSyncSpikeAlert error:", e.message);
  }
}

export async function runAlertingChecks(pool: pg.Pool): Promise<void> {
  console.log("[AlertEngine] Running periodic alerting checks...");
  await Promise.allSettled([
    checkFailureRateAlert(pool),
    checkFallbackRateAlert(pool),
    checkQuarantineAlert(pool),
    checkBackupFailureAlert(pool),
    checkEntitlementAnomalyAlert(pool),
    checkProtectedRecoveryAlert(pool),
    checkCircuitBreakerAlert(pool),
    checkEmergencyModeAlert(pool),
    checkZeroValidItemsAlert(pool),
    checkLkgFailoverRepeatedAlert(pool),
    checkPaymentSyncSpikeAlert(pool),
  ]);
}

let alertInterval: ReturnType<typeof setInterval> | null = null;
let alertStartTimeout: ReturnType<typeof setTimeout> | null = null;

export function startAlertingEngine(pool: pg.Pool, intervalMs = 5 * 60 * 1000): void {
  stopAlertingEngine();
  console.log(`[AlertEngine] Started (interval: ${intervalMs / 1000}s)`);
  loadThresholdsFromDb(pool).catch(e => console.warn("[AlertEngine] Threshold load error:", e.message));
  alertStartTimeout = setTimeout(() => {
    alertStartTimeout = null;
    runAlertingChecks(pool).catch(e => console.error("[AlertEngine] Check error:", e.message));
  }, 30_000);
  alertInterval = setInterval(() => {
    runAlertingChecks(pool).catch(e => console.error("[AlertEngine] Check error:", e.message));
  }, intervalMs);
}

export function stopAlertingEngine(): void {
  if (alertStartTimeout) {
    clearTimeout(alertStartTimeout);
    alertStartTimeout = null;
  }
  if (alertInterval) {
    clearInterval(alertInterval);
    alertInterval = null;
    console.log("[AlertEngine] Stopped");
  }
}

async function persistIncidentGroupUpdate(pool: pg.Pool, group: IncidentGroup): Promise<void> {
  try {
    const primaryAlertType = group.alertTypes[0] || "unknown";
    await pool.query(
      `INSERT INTO alert_incident_groups (group_key, alert_type, severity, first_seen, last_seen, occurrence_count, last_message, affected_scope, notified, context)
       VALUES ($1, $2, $3, to_timestamp($4::double precision / 1000), to_timestamp($5::double precision / 1000), $6, $7, $8, $9, $10)
       ON CONFLICT (group_key) DO UPDATE SET
         severity = $3, last_seen = to_timestamp($5::double precision / 1000), occurrence_count = $6,
         last_message = $7, affected_scope = $8, notified = $9`,
      [group.groupId, primaryAlertType, group.severity, group.firstSeen, group.lastSeen, group.alertCount, group.summary, JSON.stringify(group.affectedScope), group.notified, group.component]
    );
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] Failed to persist incident group:", e.message);
    }
  }
}

async function checkEmailRateLimitInDb(pool: pg.Pool, alertType: string): Promise<boolean> {
  try {
    const result = await pool.query(
      `SELECT 1 FROM alert_email_rate_limits
       WHERE alert_type = $1 AND sent_at > NOW() - INTERVAL '30 minutes'
       LIMIT 1`,
      [alertType]
    );
    return result.rows.length === 0;
  } catch (e: any) {
    if (e.message?.includes("does not exist")) {
      return true;
    }
    return true;
  }
}

async function recordEmailSentInDb(pool: pg.Pool, alertType: string): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO alert_email_rate_limits (alert_type, sent_at) VALUES ($1, NOW())`,
      [alertType]
    );
    await pool.query(
      `DELETE FROM alert_email_rate_limits WHERE sent_at < NOW() - INTERVAL '2 hours'`
    );
  } catch (e: any) {
    if (!e.message?.includes("does not exist")) {
      console.error("[AlertEngine] Failed to record email rate limit:", e.message);
    }
  }
}
