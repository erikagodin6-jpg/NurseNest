/**
 * STARTUP_POLICY
 *
 * This module centralizes startup readiness state and deferred work utilities.
 *
 * Rules:
 * 1. No heavy seed/import work may execute before `appReady` is set to true.
 * 2. All seed data imports must use dynamic `import()` gated by `shouldRunSeeding`.
 * 3. Memory guards must be checked between startup phases.
 * 4. Background monitors/jobs must be gated behind PROCESS_ROLE or ENABLE_MONITORS.
 */

let appReady = false;
const APP_START_TIME = Date.now();

export function isAppReady(): boolean {
  return appReady;
}

export function markAppReady(): void {
  appReady = true;
}

export function getAppStartTime(): number {
  return APP_START_TIME;
}

export async function startupMemoryGuard(label: string): Promise<void> {
  const mem = process.memoryUsage();
  const heapUsedMB = Math.round(mem.heapUsed / 1024 / 1024);
  const rssMB = Math.round(mem.rss / 1024 / 1024);
  let limitMB = 512;
  try {
    const { getDetectedMemoryLimitMB } = await import("./memory-monitor");
    limitMB = getDetectedMemoryLimitMB();
  } catch {}
  const guardThreshold = Math.round(limitMB * 0.60);
  if (heapUsedMB > guardThreshold || rssMB > Math.round(limitMB * 0.70)) {
    console.warn(`[MemoryGuard] ${label}: heapUsed=${heapUsedMB}MB rss=${rssMB}MB (limit: ${limitMB}MB) — forcing GC`);
    if (global.gc) global.gc();
    await new Promise(r => setTimeout(r, 200));
  }
}

export async function runSeedStep(name: string, fn: () => Promise<void>): Promise<void> {
  try {
    const t0 = Date.now();
    await fn();
    console.log(`[Startup Timing] ${name}: ${Date.now() - t0}ms`);
  } catch (e: any) {
    console.error(`[${name}] Failed:`, e.message);
  }
}

export function shouldRunSeeding(): boolean {
  const role = process.env.PROCESS_ROLE || "web";
  return role === "worker" || process.env.RUN_SEEDING === "true";
}

export function shouldStartMonitors(): boolean {
  const role = process.env.PROCESS_ROLE || "web";
  return role === "worker" || process.env.ENABLE_MONITORS === "true";
}

export function isWorkerRole(): boolean {
  return (process.env.PROCESS_ROLE || "web") === "worker";
}

export async function shouldSkipSeed(tableName: string): Promise<boolean> {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) return false;
  try {
    const { pool: checkPool } = await import("./storage");
    const result = await checkPool.query(`SELECT EXISTS (SELECT 1 FROM ${tableName} LIMIT 1) as has_data`);
    if (result.rows[0]?.has_data) {
      console.log(`[DeferredStartup] Skipping seed for ${tableName} — data already exists`);
      return true;
    }
  } catch {}
  return false;
}

export function guardStartupReady(): void {
  if (!appReady) {
    throw new Error("Application is not ready yet — startup still in progress");
  }
}
