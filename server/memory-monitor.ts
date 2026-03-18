import { pool } from "./storage";

export interface MemoryStatus {
  heapUsedMB: number;
  heapTotalMB: number;
  rssMB: number;
  externalMB: number;
  heapUsagePercent: number;
  level: "normal" | "warning" | "protection" | "critical";
  timestamp: number;
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
  heapUsagePercent: number;
  route: string | null;
  payloadSizeBytes: number | null;
  activeConnections: number;
}

const WARNING_THRESHOLD_MB = parseInt(process.env.MEMORY_WARNING_MB || "0") || 1200;
const PROTECTION_THRESHOLD_MB = parseInt(process.env.MEMORY_PROTECTION_MB || "0") || 1500;
const CRITICAL_THRESHOLD_MB = parseInt(process.env.MEMORY_CRITICAL_MB || "0") || 1800;
const MONITOR_INTERVAL_MS = 10_000;
const MAX_SPIKE_LOG = 100;
const CLEANUP_INTERVAL_MS = 60_000;

let monitorTimer: ReturnType<typeof setInterval> | null = null;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

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
  const heapUsagePercent = CRITICAL_THRESHOLD_MB > 0
    ? Math.round((usageMB / CRITICAL_THRESHOLD_MB) * 100)
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
  };
}

function runMemoryCheck(): void {
  const status = checkMemoryNow();
  const prevLevel = pressureState.level;

  pressureState.lastCheck = status;
  pressureState.level = status.level;
  pressureState.isWarning = status.level === "warning" || status.level === "protection" || status.level === "critical";
  pressureState.isProtection = status.level === "protection" || status.level === "critical";
  pressureState.isCritical = status.level === "critical";

  if (status.level !== "normal" && !pressureState.activeSince) {
    pressureState.activeSince = Date.now();
  } else if (status.level === "normal") {
    pressureState.activeSince = null;
  }

  if (prevLevel !== status.level) {
    handleLevelTransition(prevLevel, status);
  }

  if (status.level !== "normal") {
    logSpike(status, null, null);
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
    if (typeof global.gc === "function") {
      global.gc();
      console.log("[MemoryMonitor] Forced garbage collection");
    }
  } catch {}
}

async function deactivateProtectionMode(): Promise<void> {
  try {
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

export function startMemoryMonitor(): void {
  if (monitorTimer) return;
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
  thresholds: { warningMB: number; protectionMB: number; criticalMB: number };
} {
  return {
    pressure: getMemoryPressure(),
    current: checkMemoryNow(),
    thresholds: {
      warningMB: WARNING_THRESHOLD_MB,
      protectionMB: PROTECTION_THRESHOLD_MB,
      criticalMB: CRITICAL_THRESHOLD_MB,
    },
  };
}
