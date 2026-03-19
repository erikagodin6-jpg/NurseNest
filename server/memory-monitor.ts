import { pool } from "./storage";
import fs from "fs";

export interface MemoryStatus {
  heapUsedMB: number;
  heapTotalMB: number;
  rssMB: number;
  externalMB: number;
  heapUsagePercent: number;
  level: "normal" | "warning" | "protection" | "critical";
  timestamp: number;
  memoryLimitMB: number;
}

export interface MemoryPressureState {
  isWarning: boolean;
  isProtection: boolean;
  isCritical: boolean;
  level: MemoryStatus["level"];
  lastCheck: MemoryStatus | null;
  activeSince: number | null;
  spikeLog: MemorySpikeEntry[];
}

interface MemorySpikeEntry {
  timestamp: number;
  heapUsedMB: number;
  rssMB: number;
  heapUsagePercent: number;
  route: string | null;
  payloadSizeBytes: number | null;
  activeConnections: number;
}

function detectMemoryLimitMB(): number {
  if (process.env.MEMORY_TOTAL_MB) {
    const envLimit = parseInt(process.env.MEMORY_TOTAL_MB);
    if (envLimit > 0) return envLimit;
  }
  try {
    const cgroupV2 = "/sys/fs/cgroup/memory.max";
    if (fs.existsSync(cgroupV2)) {
      const val = fs.readFileSync(cgroupV2, "utf8").trim();
      if (val !== "max") {
        const bytes = parseInt(val);
        if (bytes > 0) return Math.round(bytes / 1024 / 1024);
      }
    }
  } catch {}
  try {
    const cgroupV1 = "/sys/fs/cgroup/memory/memory.limit_in_bytes";
    if (fs.existsSync(cgroupV1)) {
      const bytes = parseInt(fs.readFileSync(cgroupV1, "utf8").trim());
      if (bytes > 0 && bytes < 1e15) return Math.round(bytes / 1024 / 1024);
    }
  } catch {}
  const totalSystemMB = Math.round(require("os").totalmem() / 1024 / 1024);
  return Math.min(totalSystemMB, 512);
}

const DETECTED_MEMORY_LIMIT_MB = detectMemoryLimitMB();
const WARNING_THRESHOLD_MB = parseInt(process.env.MEMORY_WARNING_MB || "0") || Math.round(DETECTED_MEMORY_LIMIT_MB * 0.70);
const PROTECTION_THRESHOLD_MB = parseInt(process.env.MEMORY_PROTECTION_MB || "0") || Math.round(DETECTED_MEMORY_LIMIT_MB * 0.80);
const CRITICAL_THRESHOLD_MB = parseInt(process.env.MEMORY_CRITICAL_MB || "0") || Math.round(DETECTED_MEMORY_LIMIT_MB * 0.90);
const SAFE_THRESHOLD_MB = Math.round(CRITICAL_THRESHOLD_MB * 0.8);
const HYSTERESIS_DURATION_MS = 60_000;
const MONITOR_INTERVAL_MS = 10_000;
const MAX_SPIKE_LOG = 30;
const CLEANUP_INTERVAL_MS = 60_000;
const MAX_PROTECTION_ACTIONS = 50;

export function getDetectedMemoryLimitMB(): number {
  return DETECTED_MEMORY_LIMIT_MB;
}

let monitorTimer: ReturnType<typeof setInterval> | null = null;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

const HYSTERESIS_CHECKS_REQUIRED = 12;
let consecutiveNormalChecks = 0;

const pressureState: MemoryPressureState = {
  isWarning: false,
  isProtection: false,
  isCritical: false,
  level: "normal",
  lastCheck: null,
  activeSince: null,
  spikeLog: [],
};

let activeConnectionCount = 0;

export function incrementConnections(): void {
  activeConnectionCount++;
}

export function decrementConnections(): void {
  activeConnectionCount = Math.max(0, activeConnectionCount - 1);
}

export function getActiveConnectionCount(): number {
  return activeConnectionCount;
}

export function getMemoryPressure(): MemoryPressureState {
  return { ...pressureState };
}

export function isMemoryProtectionActive(): boolean {
  return pressureState.isProtection || pressureState.isCritical;
}

export function isMemoryCritical(): boolean {
  return pressureState.isCritical;
}

export function checkMemoryNow(): MemoryStatus {
  const mem = process.memoryUsage();
  const heapUsedMB = Math.round(mem.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(mem.heapTotal / 1024 / 1024);
  const rssMB = Math.round(mem.rss / 1024 / 1024);
  const externalMB = Math.round(mem.external / 1024 / 1024);

  const usageMB = rssMB;
  const heapUsagePercent = DETECTED_MEMORY_LIMIT_MB > 0
    ? Math.round((usageMB / DETECTED_MEMORY_LIMIT_MB) * 100)
    : (heapTotalMB > 0 ? Math.round((mem.heapUsed / mem.heapTotal) * 100) : 0);

  let level: MemoryStatus["level"] = "normal";
  if (usageMB >= CRITICAL_THRESHOLD_MB) {
    level = "critical";
  } else if (usageMB >= PROTECTION_THRESHOLD_MB) {
    level = "protection";
  } else if (usageMB >= WARNING_THRESHOLD_MB) {
    level = "warning";
  }

  return {
    heapUsedMB,
    heapTotalMB,
    rssMB,
    externalMB,
    heapUsagePercent,
    level,
    timestamp: Date.now(),
    memoryLimitMB: DETECTED_MEMORY_LIMIT_MB,
  };
}

let trendLogCounter = 0;
const TREND_LOG_INTERVAL = 6;

function runMemoryCheck(): void {
  const status = checkMemoryNow();
  const prevLevel = pressureState.level;

  pressureState.lastCheck = status;

  if (status.level !== "normal") {
    consecutiveNormalChecks = 0;
    pressureState.level = status.level;
    pressureState.isWarning = status.level === "warning" || status.level === "protection" || status.level === "critical";
    pressureState.isProtection = status.level === "protection" || status.level === "critical";
    pressureState.isCritical = status.level === "critical";

    if (!pressureState.activeSince) {
      pressureState.activeSince = Date.now();
    }

    if (prevLevel !== status.level) {
      handleLevelTransition(prevLevel, status);
    }
  } else {
    consecutiveNormalChecks++;

    if (prevLevel === "normal" || consecutiveNormalChecks >= HYSTERESIS_CHECKS_REQUIRED) {
      if (prevLevel !== "normal" && consecutiveNormalChecks >= HYSTERESIS_CHECKS_REQUIRED) {
        console.log(`[MemoryMonitor] Memory stable at normal for ${consecutiveNormalChecks} consecutive checks (${consecutiveNormalChecks * 10}s) — deactivating protection`);
        pressureState.level = "normal";
        pressureState.isWarning = false;
        pressureState.isProtection = false;
        pressureState.isCritical = false;
        pressureState.activeSince = null;
        consecutiveNormalChecks = 0;
        handleLevelTransition(prevLevel, status);
      } else {
        pressureState.level = "normal";
        pressureState.isWarning = false;
        pressureState.isProtection = false;
        pressureState.isCritical = false;
      }
    } else {
      console.log(`[MemoryMonitor] Memory at normal but holding protection (${consecutiveNormalChecks}/${HYSTERESIS_CHECKS_REQUIRED} checks, ~${consecutiveNormalChecks * 10}s/${HYSTERESIS_CHECKS_REQUIRED * 10}s before deactivation)`);
    }
  }

  if (status.level === "normal" && prevLevel === "normal") {
    deactivateProtectionMode();
  }

  if (status.level !== "normal") {
    belowSafeThresholdSince = null;
    logSpike(status, null, null);
  }

  trendLogCounter++;
  if (trendLogCounter >= TREND_LOG_INTERVAL) {
    trendLogCounter = 0;
    const topRoutes = pressureState.spikeLog
      .filter(s => s.route)
      .reduce((acc, s) => { acc[s.route!] = (acc[s.route!] || 0) + 1; return acc; }, {} as Record<string, number>);
    const routeSummary = Object.entries(topRoutes).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([r, c]) => `${r}:${c}`).join(", ");
    console.log(`[MemoryTrend] RSS=${status.rssMB}MB heap=${status.heapUsedMB}MB (${status.heapUsagePercent}% of ${DETECTED_MEMORY_LIMIT_MB}MB) level=${status.level} connections=${activeConnectionCount}${routeSummary ? ` top_routes=[${routeSummary}]` : ""}`);
  }
}

function handleLevelTransition(prevLevel: string, status: MemoryStatus): void {
  if (status.level === "warning" && prevLevel === "normal") {
    console.warn(`[MemoryMonitor] WARNING: RSS at ${status.rssMB}MB (threshold: ${WARNING_THRESHOLD_MB}MB)`);
  } else if (status.level === "protection") {
    console.error(`[MemoryMonitor] PROTECTION MODE: RSS at ${status.rssMB}MB (threshold: ${PROTECTION_THRESHOLD_MB}MB) — load shedding active`);
    triggerProtectionMode();
  } else if (status.level === "critical") {
    console.error(`[MemoryMonitor] CRITICAL: RSS at ${status.rssMB}MB (threshold: ${CRITICAL_THRESHOLD_MB}MB) — shedding all non-essential load`);
    triggerCriticalMode();
  } else if (status.level === "normal" && prevLevel !== "normal") {
    console.log(`[MemoryMonitor] Memory returned to normal: RSS at ${status.rssMB}MB`);
    deactivateProtectionMode();
  }
}

async function triggerProtectionMode(): Promise<void> {
  try {
    const { activateMinimalCore, isMinimalCoreMode } = await import("./platform-resilience");
    if (!isMinimalCoreMode()) {
      activateMinimalCore("Memory pressure: RSS exceeded protection threshold", "memory_monitor");
    }
  } catch (e: any) {
    console.error("[MemoryMonitor] Failed to activate minimal core:", e.message);
  }
}

async function triggerCriticalMode(): Promise<void> {
  try {
    const { activateEmergencyMode, isEmergencyMode } = await import("./platform-resilience");
    if (!isEmergencyMode()) {
      activateEmergencyMode("Memory critical: RSS exceeded critical threshold", "memory_monitor");
    }
  } catch (e: any) {
    console.error("[MemoryMonitor] Failed to activate emergency mode:", e.message);
  }

  try {
    const { clearCache } = await import("./performance");
    clearCache();
    console.log("[MemoryMonitor] Cleared memory cache during critical mode");
  } catch {}

  try {
    const { stopSyntheticMonitoring } = await import("./synthetic-monitoring");
    stopSyntheticMonitoring();
    console.log("[MemoryMonitor] Stopped synthetic monitoring during critical mode");
  } catch {}

  try {
    if (typeof global.gc === "function") {
      global.gc();
      console.log("[MemoryMonitor] Forced garbage collection");
    }
  } catch {}
}

let belowSafeThresholdSince: number | null = null;

async function deactivateProtectionMode(): Promise<void> {
  try {
    const status = checkMemoryNow();
    if (status.rssMB > SAFE_THRESHOLD_MB) {
      belowSafeThresholdSince = null;
      return;
    }

    if (!belowSafeThresholdSince) {
      belowSafeThresholdSince = Date.now();
      console.log(`[MemoryMonitor] Memory below safe threshold (${SAFE_THRESHOLD_MB}MB), starting hysteresis timer`);
      return;
    }

    if (Date.now() - belowSafeThresholdSince < HYSTERESIS_DURATION_MS) {
      return;
    }

    console.log(`[MemoryMonitor] Hysteresis period elapsed, deactivating protection modes`);
    belowSafeThresholdSince = null;

    const { deactivateMinimalCore, isMinimalCoreMode, deactivateEmergencyMode, isEmergencyMode } = await import("./platform-resilience");
    if (isMinimalCoreMode()) {
      deactivateMinimalCore("memory_monitor");
    }
    if (isEmergencyMode()) {
      deactivateEmergencyMode("memory_monitor");
    }
  } catch {}
}

export function logSpike(status: MemoryStatus, route: string | null, payloadSizeBytes: number | null): void {
  pressureState.spikeLog.push({
    timestamp: Date.now(),
    heapUsedMB: status.heapUsedMB,
    rssMB: status.rssMB,
    heapUsagePercent: status.heapUsagePercent,
    route,
    payloadSizeBytes,
    activeConnections: activeConnectionCount,
  });
  if (pressureState.spikeLog.length > MAX_SPIKE_LOG) {
    pressureState.spikeLog = pressureState.spikeLog.slice(-MAX_SPIKE_LOG);
  }
}

async function runCleanupSweep(): Promise<void> {
  try {
    await pruneInMemoryCaches();
    await pruneStaleExamSessions();
    hintGC();
  } catch (e: any) {
    console.error("[MemoryMonitor] Cleanup sweep error:", e.message);
  }
}

async function pruneInMemoryCaches(): Promise<void> {
  try {
    const { pruneResilienceCaches } = await import("./platform-resilience");
    if (typeof pruneResilienceCaches === "function") {
      pruneResilienceCaches();
    }
  } catch {}

  try {
    const { pruneUserDailyCounts } = await import("./ai-safety");
    if (typeof pruneUserDailyCounts === "function") {
      pruneUserDailyCounts();
    }
  } catch {}

  try {
    const { pruneSitemapCache } = await import("./sitemap/index");
    if (typeof pruneSitemapCache === "function") {
      pruneSitemapCache(pressureState.isWarning);
    }
  } catch {}

  if (pressureState.isWarning || pressureState.isProtection) {
    try {
      const { pruneAlliedCachesUnderPressure } = await import("./allied-questions-api");
      pruneAlliedCachesUnderPressure();
    } catch {}
    try {
      const { pruneParamedicCacheUnderPressure } = await import("./paramedic-questions-api");
      pruneParamedicCacheUnderPressure();
    } catch {}
  }

  if (pressureState.isCritical) {
    try {
      const { clearAlliedQuestionsCache } = await import("./allied-questions-api");
      clearAlliedQuestionsCache();
    } catch {}
    try {
      const { clearParamedicQuestionsCache } = await import("./paramedic-questions-api");
      clearParamedicQuestionsCache();
    } catch {}
  }
}

async function pruneStaleExamSessions(): Promise<void> {
  try {
    const cutoffHours = pressureState.isCritical ? 1 : 6;
    await pool.query(
      `UPDATE mlt_exam_sessions SET status = 'abandoned' WHERE status = 'in_progress' AND started_at < NOW() - INTERVAL '${cutoffHours} hours'`
    );
  } catch {}
}

function hintGC(): void {
  try {
    if (typeof global.gc === "function" && pressureState.isProtection) {
      global.gc();
    }
  } catch {}
}

interface ProtectionAction {
  timestamp: number;
  level: string;
  action: string;
  detail: string;
}

const protectionActions: ProtectionAction[] = [];

export function logProtectionAction(action: string, detail: string): void {
  protectionActions.unshift({
    timestamp: Date.now(),
    level: pressureState.level,
    action,
    detail,
  });
  if (protectionActions.length > MAX_PROTECTION_ACTIONS) {
    protectionActions.length = MAX_PROTECTION_ACTIONS;
  }
}

export function getProtectionActions(limit = 50): ProtectionAction[] {
  return protectionActions.slice(0, limit);
}

export function shouldReducePayloads(): boolean {
  return pressureState.isWarning || pressureState.isProtection || pressureState.isCritical;
}

export function shouldPauseBackgroundJobs(): boolean {
  return pressureState.isProtection || pressureState.isCritical;
}

export function shouldRejectHeavyWork(): boolean {
  return pressureState.isCritical;
}

export function getMemoryLevel(): MemoryStatus["level"] {
  return pressureState.level;
}

export function getMaxPayloadSize(): number {
  if (pressureState.isCritical) return 25;
  if (pressureState.isProtection) return 50;
  if (pressureState.isWarning) return 100;
  return 200;
}

export function startMemoryMonitor(): void {
  if (monitorTimer) return;
  console.log(`[MemoryMonitor] Detected memory limit: ${DETECTED_MEMORY_LIMIT_MB}MB`);
  console.log(`[MemoryMonitor] Thresholds — warning: ${WARNING_THRESHOLD_MB}MB (70%), protection: ${PROTECTION_THRESHOLD_MB}MB (80%), critical: ${CRITICAL_THRESHOLD_MB}MB (90%)`);
  console.log("[MemoryMonitor] Starting memory monitor (10s interval)");
  runMemoryCheck();
  monitorTimer = setInterval(runMemoryCheck, MONITOR_INTERVAL_MS);

  console.log("[MemoryMonitor] Starting cleanup sweep (60s interval)");
  cleanupTimer = setInterval(runCleanupSweep, CLEANUP_INTERVAL_MS);
}

export function stopMemoryMonitor(): void {
  if (monitorTimer) {
    clearInterval(monitorTimer);
    monitorTimer = null;
  }
  if (cleanupTimer) {
    clearInterval(cleanupTimer);
    cleanupTimer = null;
  }
}

export function getMemoryMonitorStatus(): {
  pressure: MemoryPressureState;
  current: MemoryStatus;
  thresholds: { warningMB: number; protectionMB: number; criticalMB: number; detectedLimitMB: number };
} {
  return {
    pressure: getMemoryPressure(),
    current: checkMemoryNow(),
    thresholds: {
      warningMB: WARNING_THRESHOLD_MB,
      protectionMB: PROTECTION_THRESHOLD_MB,
      criticalMB: CRITICAL_THRESHOLD_MB,
      detectedLimitMB: DETECTED_MEMORY_LIMIT_MB,
    },
  };
}

const memoryTrend: Array<{ timestamp: number; rssMB: number; heapUsedMB: number; heapTotalMB: number }> = [];
const MAX_TREND_POINTS = 30;

function recordMemoryTrend(): void {
  const mem = process.memoryUsage();
  memoryTrend.push({
    timestamp: Date.now(),
    rssMB: Math.round(mem.rss / 1024 / 1024),
    heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
    heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
  });
  if (memoryTrend.length > MAX_TREND_POINTS) {
    memoryTrend.splice(0, memoryTrend.length - MAX_TREND_POINTS);
  }
}

export function getMemoryTrend(): typeof memoryTrend {
  return memoryTrend.slice();
}

interface RouteLatencyEntry {
  route: string;
  method: string;
  count: number;
  totalMs: number;
  maxMs: number;
  avgMs: number;
  totalPayloadBytes: number;
  lastSeen: number;
}

const routeLatencyMap = new Map<string, RouteLatencyEntry>();
const MAX_ROUTE_LATENCY_ENTRIES = 200;

export function recordRouteLatency(method: string, route: string, durationMs: number, payloadBytes: number = 0): void {
  const key = `${method}:${route}`;
  let entry = routeLatencyMap.get(key);
  if (!entry) {
    if (routeLatencyMap.size >= MAX_ROUTE_LATENCY_ENTRIES) {
      let oldestKey: string | null = null;
      let oldestTime = Infinity;
      for (const [k, v] of routeLatencyMap) {
        if (v.lastSeen < oldestTime) {
          oldestTime = v.lastSeen;
          oldestKey = k;
        }
      }
      if (oldestKey) routeLatencyMap.delete(oldestKey);
    }
    entry = { route, method, count: 0, totalMs: 0, maxMs: 0, avgMs: 0, totalPayloadBytes: 0, lastSeen: 0 };
    routeLatencyMap.set(key, entry);
  }
  entry.count++;
  entry.totalMs += durationMs;
  entry.maxMs = Math.max(entry.maxMs, durationMs);
  entry.avgMs = Math.round(entry.totalMs / entry.count);
  entry.totalPayloadBytes += payloadBytes;
  entry.lastSeen = Date.now();
}

export function getRouteLatencyStats(limit: number = 50): RouteLatencyEntry[] {
  return Array.from(routeLatencyMap.values())
    .sort((a, b) => b.totalMs - a.totalMs)
    .slice(0, limit);
}

const HEAVY_ROUTES = new Set([
  "/api/exams",
  "/api/exam-questions",
  "/api/blog/generate",
  "/api/blog/generate-batch",
  "/api/blog/run-scheduler",
  "/api/admin/blog/expand-all",
  "/api/admin/exam-flashcards/bulk-align",
  "/api/admin/convert-to-flashcard",
  "/api/admin/sm2/bulk-generate",
  "/api/admin/content",
  "/api/content",
  "/api/imaging/physics-topics/generate",
  "/api/imaging/flashcards/generate",
]);

export function isHeavyRoute(path: string): boolean {
  if (HEAVY_ROUTES.has(path)) return true;
  for (const r of HEAVY_ROUTES) {
    if (path.startsWith(r)) return true;
  }
  return false;
}

export function logHeavyRouteMemory(method: string, path: string, phase: "start" | "end", extra: Record<string, any> = {}): void {
  const mem = process.memoryUsage();
  console.log(JSON.stringify({
    type: "heavy_route_memory",
    method,
    path,
    phase,
    rssMB: Math.round(mem.rss / 1024 / 1024),
    heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
    activeConnections: activeConnectionCount,
    timestamp: new Date().toISOString(),
    ...extra,
  }));
}

let trendTimer: ReturnType<typeof setInterval> | null = null;

export function startMemoryMonitorWithTrend(): void {
  startMemoryMonitor();
  if (!trendTimer) {
    trendTimer = setInterval(recordMemoryTrend, 30_000);
    recordMemoryTrend();
  }
}

export function stopMemoryMonitorWithTrend(): void {
  stopMemoryMonitor();
  if (trendTimer) {
    clearInterval(trendTimer);
    trendTimer = null;
  }
}
