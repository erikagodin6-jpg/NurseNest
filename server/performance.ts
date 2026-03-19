import type { Request, Response, NextFunction } from "express";
import { pool } from "./storage";
import { recordFailure, isCircuitOpen, isEmergencyMode } from "./platform-resilience";

interface RequestMetric {
  method: string;
  path: string;
  routePrefix: string;
  statusCode: number;
  durationMs: number;
  timestamp: number;
  userId?: string;
  tier?: number;
}

const RING_BUFFER_SIZE = 2000;
const metricsBuffer: RequestMetric[] = [];
let metricsHead = 0;
let metricsCount = 0;

function addMetric(metric: RequestMetric) {
  if (metricsCount < RING_BUFFER_SIZE) {
    metricsBuffer.push(metric);
    metricsCount++;
  } else {
    metricsBuffer[metricsHead] = metric;
  }
  metricsHead = (metricsHead + 1) % RING_BUFFER_SIZE;
}

function getMetrics(): RequestMetric[] {
  if (metricsCount < RING_BUFFER_SIZE) return metricsBuffer.slice();
  const result: RequestMetric[] = [];
  for (let i = 0; i < RING_BUFFER_SIZE; i++) {
    const idx = (metricsHead + i) % RING_BUFFER_SIZE;
    result.push(metricsBuffer[idx]);
  }
  return result;
}

function getRoutePrefix(path: string): string {
  const match = path.match(/^\/api\/([^/]+(?:\/[^/]+)?)/);
  return match ? match[1] : path.split("/").slice(0, 3).join("/");
}

const ROUTE_TIERS: Record<number, Set<string>> = {
  1: new Set([
    "/api/login", "/api/auth", "/api/register",
    "/api/entitlement", "/api/user/",
    "/api/exam-sessions", "/api/cat-", "/api/mock-exam",
    "/api/flashcard-review", "/api/sm2-review", "/api/spaced-repetition",
    "/api/downloads", "/api/digital-products",
  ]),
  2: new Set([
    "/api/lessons", "/api/dashboard", "/api/progress",
    "/api/user-progress", "/api/flashcard", "/api/notes",
  ]),
};

function getRouteTier(path: string): number {
  for (const prefix of ROUTE_TIERS[1]) {
    if (path.startsWith(prefix)) return 1;
  }
  for (const prefix of ROUTE_TIERS[2]) {
    if (path.startsWith(prefix)) return 2;
  }
  if (path.startsWith("/api/admin/tester")) return 1;
  if (path.startsWith("/api/admin")) return 3;
  if (path.startsWith("/api/seo")) return 3;
  if (path.startsWith("/api/analytics")) return 3;
  if (path.startsWith("/api/content-growth")) return 3;
  return 2;
}

let currentLoadLevel: "normal" | "elevated" | "high" = "normal";
let loadCheckInterval: ReturnType<typeof setInterval> | null = null;

function updateLoadLevel() {
  const recentMs = 10000;
  const now = Date.now();
  const metrics = getMetrics();
  const recent = metrics.filter(m => now - m.timestamp < recentMs);
  const rps = recent.length / (recentMs / 1000);

  if (rps > 100) currentLoadLevel = "high";
  else if (rps > 50) currentLoadLevel = "elevated";
  else currentLoadLevel = "normal";
}

export function startLoadMonitoring() {
  if (!loadCheckInterval) {
    loadCheckInterval = setInterval(updateLoadLevel, 5000);
  }
}

export function performanceMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith("/api/")) return next();

    const start = Date.now();
    const tier = getRouteTier(req.path);

    const emergency = isEmergencyMode();
    if ((currentLoadLevel === "high" || emergency) && tier === 3) {
      return res.status(503).json({
        error: "Service temporarily unavailable due to high load",
        retryAfter: 30,
      });
    }
    if ((currentLoadLevel === "high" || emergency) && tier === 2 && req.method !== "GET") {
      return res.status(503).json({
        error: "Write operations temporarily unavailable for this endpoint",
        retryAfter: 15,
      });
    }
    if (currentLoadLevel === "elevated" && tier === 3 && req.method !== "GET") {
      return res.status(503).json({
        error: "Write operations temporarily unavailable for this endpoint",
        retryAfter: 15,
      });
    }

    const originalEnd = res.end;
    res.end = function (this: Response, ...args: any[]) {
      const duration = Date.now() - start;
      const user = (req as any).authUser;

      addMetric({
        method: req.method,
        path: req.path,
        routePrefix: getRoutePrefix(req.path),
        statusCode: res.statusCode,
        durationMs: duration,
        timestamp: Date.now(),
        userId: user?.id,
        tier,
      });

      if (duration > 3000) {
        console.error(`[PERF] SLOW REQUEST (${duration}ms) ${req.method} ${req.path} -> ${res.statusCode}`);
      } else if (duration > 1000) {
        console.warn(`[PERF] Slow request (${duration}ms) ${req.method} ${req.path} -> ${res.statusCode}`);
      }

      return originalEnd.apply(this, args as any);
    } as any;

    next();
  };
}

interface SlowQueryEntry {
  query: string;
  durationMs: number;
  timestamp: number;
}

const slowQueryLog: SlowQueryEntry[] = [];
const MAX_SLOW_QUERIES = 50;
const SLOW_QUERY_THRESHOLD_MS = 500;

export async function timedQuery(
  queryText: string,
  params?: any[],
  options?: { timeoutMs?: number; label?: string }
): Promise<any> {
  const timeoutMs = options?.timeoutMs ?? 5000;
  const start = Date.now();

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`SET LOCAL statement_timeout = '${timeoutMs}'`);
    const result = await client.query(queryText, params);
    await client.query("COMMIT");
    const duration = Date.now() - start;

    if (duration > SLOW_QUERY_THRESHOLD_MS) {
      const truncatedQuery = queryText.length > 200 ? queryText.substring(0, 200) + "..." : queryText;
      slowQueryLog.unshift({ query: truncatedQuery, durationMs: duration, timestamp: Date.now() });
      if (slowQueryLog.length > MAX_SLOW_QUERIES) slowQueryLog.length = MAX_SLOW_QUERIES;

      console.warn(`[PERF] Slow DB query (${duration}ms)${options?.label ? ` [${options.label}]` : ""}: ${truncatedQuery}`);

      if (duration > 3000) {
        recordFailure("database");
      }
    }

    return result;
  } catch (err: any) {
    await client.query("ROLLBACK").catch(() => {});
    const duration = Date.now() - start;
    if (err.message?.includes("statement timeout")) {
      console.error(`[PERF] Query timeout (${timeoutMs}ms)${options?.label ? ` [${options.label}]` : ""}: ${queryText.substring(0, 150)}`);
      recordFailure("database");
    }
    throw err;
  } finally {
    client.release();
  }
}

export function getSlowQueryLog(): SlowQueryEntry[] {
  return slowQueryLog.slice(0, 100);
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  lastAccessed: number;
  sizeBytes: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();
const MEMORY_CACHE_MAX_ENTRIES = parseInt(process.env.MEMORY_CACHE_MAX || "0") || 200;
const MEMORY_CACHE_MAX_BYTES = parseInt(process.env.MEMORY_CACHE_MAX_BYTES || "0") || 50 * 1024 * 1024;
const MAX_SINGLE_ENTRY_BYTES = 512 * 1024;
let cacheCleanupInterval: ReturnType<typeof setInterval> | null = null;
let totalCacheBytes = 0;

function estimateSize(value: any): number {
  try {
    const str = JSON.stringify(value);
    return str ? str.length * 2 : 0;
  } catch {
    return 1024;
  }
}

function evictLRU(): void {
  if (memoryCache.size <= MEMORY_CACHE_MAX_ENTRIES && totalCacheBytes <= MEMORY_CACHE_MAX_BYTES) return;

  const entries = Array.from(memoryCache.entries())
    .sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);

  while (
    (memoryCache.size > MEMORY_CACHE_MAX_ENTRIES || totalCacheBytes > MEMORY_CACHE_MAX_BYTES) &&
    entries.length > 0
  ) {
    const [key, entry] = entries.shift()!;
    totalCacheBytes -= entry.sizeBytes;
    memoryCache.delete(key);
  }

  if (totalCacheBytes < 0) totalCacheBytes = 0;
}

export function cacheGet<T>(key: string): T | undefined {
  const entry = memoryCache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    totalCacheBytes -= entry.sizeBytes;
    memoryCache.delete(key);
    return undefined;
  }
  entry.lastAccessed = Date.now();
  return entry.value;
}

export function cacheSet<T>(key: string, value: T, ttlSeconds: number): void {
  const sizeBytes = estimateSize(value);

  if (sizeBytes > MAX_SINGLE_ENTRY_BYTES) {
    return;
  }

  const existing = memoryCache.get(key);
  if (existing) {
    totalCacheBytes -= existing.sizeBytes;
  }

  const now = Date.now();
  memoryCache.set(key, { value, expiresAt: now + ttlSeconds * 1000, lastAccessed: now, sizeBytes });
  totalCacheBytes += sizeBytes;
  evictLRU();
}

export function getCacheStats(): { size: number; maxEntries: number; totalBytes: number; maxBytes: number } {
  return { size: memoryCache.size, maxEntries: MEMORY_CACHE_MAX_ENTRIES, totalBytes: totalCacheBytes, maxBytes: MEMORY_CACHE_MAX_BYTES };
}

export function clearCache(): void {
  memoryCache.clear();
  totalCacheBytes = 0;
}

export function cacheInvalidate(pattern: string): void {
  for (const [key, entry] of memoryCache) {
    if (key.startsWith(pattern)) {
      totalCacheBytes -= entry.sizeBytes;
      memoryCache.delete(key);
    }
  }
}

export function cacheInvalidateExact(key: string): void {
  const entry = memoryCache.get(key);
  if (entry) {
    totalCacheBytes -= entry.sizeBytes;
    memoryCache.delete(key);
  }
}

export function startCacheCleanup() {
  if (!cacheCleanupInterval) {
    cacheCleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of memoryCache) {
        if (now > entry.expiresAt) {
          totalCacheBytes -= entry.sizeBytes;
          memoryCache.delete(key);
        }
      }
      if (totalCacheBytes < 0) totalCacheBytes = 0;
    }, 60000);
  }
}

export const CACHE_TTL = {
  CONTENT: 60000,
  PRICING: 300000,
  EXAM_BLUEPRINTS: 60000,
  FLASHCARD_DECKS: 60000,
  LESSONS_LIST: 60000,
};

export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  label: string,
  fallback?: () => T | Promise<T>
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const result = await Promise.race([
      fn(),
      new Promise<never>((_, reject) => {
        controller.signal.addEventListener("abort", () => {
          reject(new Error(`Timeout: ${label} exceeded ${timeoutMs}ms`));
        });
      }),
    ]);
    clearTimeout(timeoutId);
    return result;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.message?.startsWith("Timeout:")) {
      console.error(`[PERF] ${err.message}`);
      if (fallback) return fallback();
    }
    throw err;
  }
}

export const SERVICE_TIMEOUTS = {
  STRIPE: 10000,
  AI: 30000,
  EMAIL: 5000,
  SMS: 5000,
};

export function instrumentCorePath(pathName: string, userId?: string | undefined, fn?: () => Promise<any>): any {
  const start = Date.now();
  if (!fn) {
    return () => {
      const duration = Date.now() - start;
      console.log(JSON.stringify({
        type: "core_path_latency",
        path: pathName,
        userId: typeof userId === "string" ? userId : null,
        durationMs: duration,
        success: true,
        timestamp: new Date().toISOString(),
      }));
    };
  }
  return fn()
    .then((result) => {
      const duration = Date.now() - start;
      console.log(JSON.stringify({
        type: "core_path_latency",
        path: pathName,
        userId: userId || null,
        durationMs: duration,
        success: true,
        timestamp: new Date().toISOString(),
      }));
      return result;
    })
    .catch((err) => {
      const duration = Date.now() - start;
      console.error(JSON.stringify({
        type: "core_path_latency",
        path: pathName,
        userId: userId || null,
        durationMs: duration,
        success: false,
        error: err.message,
        timestamp: new Date().toISOString(),
      }));
      throw err;
    });
}

function percentile(arr: number[], p: number): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

export function getMetricsSummary() {
  const metrics = getMetrics();
  const now = Date.now();

  const byRoutePrefix = new Map<string, number[]>();
  const errorsByPrefix = new Map<string, number>();
  const volumeByMinute = new Map<number, number>();

  for (const m of metrics) {
    if (!byRoutePrefix.has(m.routePrefix)) byRoutePrefix.set(m.routePrefix, []);
    byRoutePrefix.get(m.routePrefix)!.push(m.durationMs);

    if (m.statusCode >= 400) {
      errorsByPrefix.set(m.routePrefix, (errorsByPrefix.get(m.routePrefix) || 0) + 1);
    }

    const minuteBucket = Math.floor(m.timestamp / 60000);
    volumeByMinute.set(minuteBucket, (volumeByMinute.get(minuteBucket) || 0) + 1);
  }

  const routeTimings: Array<{
    routePrefix: string;
    p50: number;
    p95: number;
    p99: number;
    count: number;
    errorRate: number;
  }> = [];

  for (const [prefix, durations] of byRoutePrefix) {
    const totalForPrefix = durations.length;
    const errors = errorsByPrefix.get(prefix) || 0;
    routeTimings.push({
      routePrefix: prefix,
      p50: percentile(durations, 50),
      p95: percentile(durations, 95),
      p99: percentile(durations, 99),
      count: totalForPrefix,
      errorRate: totalForPrefix > 0 ? Math.round((errors / totalForPrefix) * 10000) / 100 : 0,
    });
  }

  routeTimings.sort((a, b) => b.count - a.count);

  const volumeOverTime: Array<{ minute: number; count: number }> = [];
  const sortedMinutes = [...volumeByMinute.entries()].sort((a, b) => a[0] - b[0]);
  for (const [minute, count] of sortedMinutes.slice(-60)) {
    volumeOverTime.push({ minute: minute * 60000, count });
  }

  const totalRequests = metrics.length;
  const totalErrors = metrics.filter(m => m.statusCode >= 400).length;
  const allDurations = metrics.map(m => m.durationMs);

  return {
    totalRequests,
    totalErrors,
    overallErrorRate: totalRequests > 0 ? Math.round((totalErrors / totalRequests) * 10000) / 100 : 0,
    p50: percentile(allDurations, 50),
    p95: percentile(allDurations, 95),
    p99: percentile(allDurations, 99),
    routeTimings: routeTimings.slice(0, 50),
    volumeOverTime,
    loadLevel: currentLoadLevel,
    cacheSize: memoryCache.size,
    slowQueryCount: slowQueryLog.length,
  };
}

export function registerPerformanceRoutes(app: any): void {
  startLoadMonitoring();
  startCacheCleanup();

  app.get("/api/admin/performance/metrics", async (req: Request, res: Response) => {
    try {
      const { resolveAuthUser } = await import("./admin-auth");
      const user = await resolveAuthUser(req as any);
      if (!user || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      res.json(getMetricsSummary());
    } catch {
      res.status(500).json({ error: "Failed to get metrics" });
    }
  });

  app.get("/api/admin/performance/slow-queries", async (req: Request, res: Response) => {
    try {
      const { resolveAuthUser } = await import("./admin-auth");
      const user = await resolveAuthUser(req as any);
      if (!user || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      res.json({ queries: getSlowQueryLog() });
    } catch {
      res.status(500).json({ error: "Failed to get slow queries" });
    }
  });

  app.get("/api/admin/performance/dashboard", async (req: Request, res: Response) => {
    try {
      const { resolveAuthUser } = await import("./admin-auth");
      const user = await resolveAuthUser(req as any);
      if (!user || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const { getCircuitBreakerStates, getFeatureFlags } = await import("./platform-resilience");
      const summary = getMetricsSummary();

      res.json({
        ...summary,
        circuitBreakers: getCircuitBreakerStates(),
        featureFlags: getFeatureFlags(),
        slowQueries: getSlowQueryLog(),
      });
    } catch {
      res.status(500).json({ error: "Failed to get dashboard data" });
    }
  });
}
