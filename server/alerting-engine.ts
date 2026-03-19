import pg from "pg";
import { sendAdminNotification } from "./admin-notifications";
import { getNotificationSettings } from "./admin-notifications";

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
  | "payment_sync_spike";

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

let thresholds: AlertThresholds = { ...DEFAULT_THRESHOLDS };

interface IncidentGroup {
  alertType: AlertType;
  context?: string;
  firstSeen: number;
  lastSeen: number;
  count: number;
  lastMessage: string;
  notified: boolean;
}

const incidentGroups = new Map<string, IncidentGroup>();
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
  const cooldownMs = thresholds.cooldownMinutes * 60 * 1000;
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
    const groupKey = getGroupKey(alertType, context);
    const group = incidentGroups.get(groupKey);
    if (group) {
      group.lastSeen = Date.now();
      group.count++;
      group.lastMessage = message;
    }
    console.log(`[AlertEngine] Suppressed (cooldown): ${alertType} - ${message}${group ? ` (occurrence #${group.count})` : ""}`);
    return null;
  }

  const rateLimited = isRateLimited(alertType);

  try {
    const groupKey = getGroupKey(alertType, context);
    let group = incidentGroups.get(groupKey);
    const now = Date.now();

    if (group) {
      group.lastSeen = now;
      group.count++;
      group.lastMessage = message;
    } else {
      group = {
        alertType,
        context,
        firstSeen: now,
        lastSeen: now,
        count: 1,
        lastMessage: message,
        notified: false,
      };
      incidentGroups.set(groupKey, group);
    }

    const result = await pool.query(
      `INSERT INTO reliability_alerts (alert_type, severity, message, metadata)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [alertType, severity, message, JSON.stringify({ ...metadata, incidentCount: group.count, firstSeen: new Date(group.firstSeen).toISOString() })]
    );
    const alertId = result.rows[0]?.id;
    markFired(alertType, context);

    console.log(`[AlertEngine] ALERT ${severity.toUpperCase()}: [${alertType}] ${message} (incident #${group.count})`);

    if (isEmailRateLimited(alertType, severity, context)) {
      console.log(`[AlertEngine] Email suppressed (rate limit): ${alertType}`);
      return alertId;
    }

    const settings = await getNotificationSettings(pool);
    const shouldNotifyAdmin =
      (severity === "critical" && settings.notifyOnCriticalIncident) ||
      (severity === "warning" && settings.notifyOnWarningIncident);

    if (rateLimited) {
      console.log(`[AlertEngine] Persisted but notification suppressed (rate limit ${MAX_ALERTS_PER_TYPE_PER_HOUR}/hr): ${alertType}`);
      return alertId;
    }

    const hardRateKey = alertType;
    const lastHardRate = hardRateLimitMap.get(hardRateKey);
    const withinHardRateLimit = !lastHardRate || (now - lastHardRate >= HARD_RATE_LIMIT_MS);

    if (shouldNotifyAdmin && withinHardRateLimit) {
      hardRateLimitMap.set(hardRateKey, now);
      markEmailSent(alertType, severity, context);

      const severityEmoji = severity === "critical" ? "🔴" : severity === "warning" ? "🟡" : "🔵";
      type NotificationEventType = "service_down" | "synthetic_test_failure" | "content_integrity_failure" | "reliability_warning";
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
      const incidentInfo = group.count > 1
        ? `\n\nIncident Group: ${group.count} occurrences\nFirst seen: ${new Date(group.firstSeen).toISOString()}\nLast seen: ${new Date(group.lastSeen).toISOString()}`
        : "";
      sendAdminNotification(pool, {
        event: notificationEvent,
        alertType,
        alertSeverity: severity,
        details: `${severityEmoji} Reliability Alert: ${message}\n\nType: ${alertType}\nSeverity: ${severity}\nTime: ${new Date().toISOString()}${incidentInfo}`,
      }).catch((e: any) => {
        emailRateLimit.delete(getEmailRateLimitKey(alertType, severity, context));
        console.error("[AlertEngine] Notification send failed:", e.message);
      });
      group.notified = true;
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
