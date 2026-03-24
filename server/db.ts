import "./load-env";
import pg from "pg";

export type DatabaseTarget = "production" | "development";

const DEV_URL = process.env.DATABASE_URL;
const PROD_URL = process.env.PROD_DATABASE_URL;

const DEFAULT_STATEMENT_TIMEOUT_MS = getEnvInt("DB_STATEMENT_TIMEOUT_MS", 10000);
const DEFAULT_CONNECTION_TIMEOUT_MS = getEnvInt("DB_CONNECTION_TIMEOUT_MS", 5000);
const DEFAULT_IDLE_TIMEOUT_MS = getEnvInt("DB_IDLE_TIMEOUT_MS", 30000);
const DEFAULT_MAX_POOL_SIZE = getEnvInt("DB_MAX_POOL_SIZE", 22);
const SLOW_QUERY_THRESHOLD_MS = getEnvInt("DB_SLOW_QUERY_THRESHOLD_MS", 500);

const ALLOW_PROD_FALLBACK_TO_DATABASE_URL =
  String(process.env.ALLOW_PROD_FALLBACK_TO_DATABASE_URL || "").toLowerCase() === "true";

const NODE_ENV = process.env.NODE_ENV || "development";

function getEnvInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;

  return Math.floor(parsed);
}

function maskUrl(url: string | undefined): string {
  if (!url) return "(not set)";
  return url.replace(/\/\/.*@/, "//***@");
}

function shouldUseSsl(connectionString: string): boolean {
  const forceSsl = String(process.env.DB_SSL || "").toLowerCase();

  if (forceSsl === "true") return true;
  if (forceSsl === "false") return false;

  return /render\.com|supabase\.co|neon\.tech|railway\.app|amazonaws\.com|azure\.com/i.test(
    connectionString,
  );
}

function getRequiredUrl(target: DatabaseTarget): string {
  if (target === "production") {
    if (PROD_URL) return PROD_URL;

    if (ALLOW_PROD_FALLBACK_TO_DATABASE_URL && DEV_URL) {
      console.warn(
        "[DB] PROD_DATABASE_URL is not set. Falling back to DATABASE_URL because ALLOW_PROD_FALLBACK_TO_DATABASE_URL=true",
      );
      return DEV_URL;
    }

    throw new Error(
      "PROD_DATABASE_URL is not set. Refusing to use DATABASE_URL for production unless ALLOW_PROD_FALLBACK_TO_DATABASE_URL=true",
    );
  }

  if (!DEV_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  return DEV_URL;
}

function getPoolLabel(target: DatabaseTarget): string {
  return target === "production" ? "Prod" : "Dev";
}

function getApplicationName(target: DatabaseTarget): string {
  return `nursenest-${NODE_ENV}-${target}`;
}

function normalizeQueryText(queryText: string): string {
  return queryText.replace(/\s+/g, " ").trim().slice(0, 300);
}

function logSlowOrFailedQuery(
  target: DatabaseTarget,
  queryText: string,
  start: number,
  error?: unknown,
): void {
  const elapsed = Date.now() - start;
  const shortQuery = normalizeQueryText(queryText);

  if (error) {
    console.error(`[DB:${target}] Query failed after ${elapsed}ms: ${shortQuery}`, error);
    return;
  }

  if (elapsed > SLOW_QUERY_THRESHOLD_MS) {
    console.warn(`[DB:${target}] Slow query ${elapsed}ms: ${shortQuery}`);
  }
}

function wrapPoolQuery(pool: pg.Pool, target: DatabaseTarget): void {
  const originalQuery = pool.query.bind(pool);

  pool.query = (async (...args: any[]) => {
    const start = Date.now();
    const queryText =
      typeof args[0] === "string"
        ? args[0]
        : typeof args[0]?.text === "string"
          ? args[0].text
          : "(complex query)";

    try {
      const result = await (originalQuery as (...fnArgs: unknown[]) => Promise<unknown>).apply(pool, args);
      logSlowOrFailedQuery(target, queryText, start);
      return result;
    } catch (error) {
      logSlowOrFailedQuery(target, queryText, start, error);
      throw error;
    }
  }) as any;
}

function createPool(target: DatabaseTarget): pg.Pool {
  const connectionString = getRequiredUrl(target);
  const sslEnabled = shouldUseSsl(connectionString);

  const pool = new pg.Pool({
    connectionString,
    statement_timeout: DEFAULT_STATEMENT_TIMEOUT_MS,
    connectionTimeoutMillis: DEFAULT_CONNECTION_TIMEOUT_MS,
    idleTimeoutMillis: DEFAULT_IDLE_TIMEOUT_MS,
    max: DEFAULT_MAX_POOL_SIZE,
    application_name: getApplicationName(target),
    ssl: sslEnabled ? { rejectUnauthorized: false } : false,
  });

  wrapPoolQuery(pool, target);

  pool.on("connect", (client) => {
    client.on("error", (err) => {
      console.error(`[DB:${target}] Client error`, err);
    });
  });

  pool.on("error", (err) => {
    console.error(`[DB:${target}] Unexpected pool error`, err);
  });

  console.log(
    `[DB] ${getPoolLabel(target)} pool created → ${maskUrl(connectionString)} ` +
      `(statement_timeout=${DEFAULT_STATEMENT_TIMEOUT_MS}ms, ` +
      `connection_timeout=${DEFAULT_CONNECTION_TIMEOUT_MS}ms, ` +
      `idle_timeout=${DEFAULT_IDLE_TIMEOUT_MS}ms, ` +
      `max=${DEFAULT_MAX_POOL_SIZE}, ssl=${sslEnabled}, app=${getApplicationName(target)})`,
  );

  return pool;
}

let devPool: pg.Pool | null = null;
let prodPool: pg.Pool | null = null;
let isClosingPools = false;

export function getDevPool(): pg.Pool {
  if (!devPool) {
    devPool = createPool("development");
  }
  return devPool;
}

export function getProdPool(): pg.Pool {
  if (!prodPool) {
    prodPool = createPool("production");
  }
  return prodPool;
}

export function getPool(target: DatabaseTarget = "development"): pg.Pool {
  return target === "production" ? getProdPool() : getDevPool();
}

export function hasSeparateProdDb(): boolean {
  return !!(PROD_URL && PROD_URL !== DEV_URL);
}

export function getDbInfo() {
  return {
    devUrl: maskUrl(DEV_URL),
    prodUrl: maskUrl(PROD_URL),
    hasSeparateProd: hasSeparateProdDb(),
    environment: NODE_ENV,
    allowProdFallbackToDatabaseUrl: ALLOW_PROD_FALLBACK_TO_DATABASE_URL,
    poolDefaults: {
      statementTimeoutMs: DEFAULT_STATEMENT_TIMEOUT_MS,
      connectionTimeoutMs: DEFAULT_CONNECTION_TIMEOUT_MS,
      idleTimeoutMs: DEFAULT_IDLE_TIMEOUT_MS,
      maxPoolSize: DEFAULT_MAX_POOL_SIZE,
      slowQueryThresholdMs: SLOW_QUERY_THRESHOLD_MS,
    },
    appNames: {
      development: getApplicationName("development"),
      production: getApplicationName("production"),
    },
  };
}

export function logDatabaseTarget(operation: string, target: DatabaseTarget): void {
  const url =
    target === "production"
      ? PROD_URL || (ALLOW_PROD_FALLBACK_TO_DATABASE_URL ? DEV_URL : undefined)
      : DEV_URL;

  console.log(
    `[DB] ${operation} → targeting ${target.toUpperCase()} database (${maskUrl(url)})`,
  );
}

export function logRowCount(operation: string, count: number): void {
  console.log(`[DB] ${operation} → ${count} rows affected`);
}

export async function testDatabaseConnection(
  target: DatabaseTarget = "development",
): Promise<{ ok: boolean; target: DatabaseTarget; timeMs: number; now?: string; error?: string }> {
  const pool = getPool(target);
  const started = Date.now();

  try {
    const result = await pool.query("SELECT NOW() AS now");
    return {
      ok: true,
      target,
      timeMs: Date.now() - started,
      now: result.rows[0]?.now?.toISOString?.() || String(result.rows[0]?.now || ""),
    };
  } catch (error: any) {
    return {
      ok: false,
      target,
      timeMs: Date.now() - started,
      error: error?.message || "Unknown database connection error",
    };
  }
}

export async function closeAllPools(): Promise<void> {
  if (isClosingPools) return;
  isClosingPools = true;

  try {
    const shutdowns: Promise<void>[] = [];

    if (devPool) {
      const currentDevPool = devPool;
      devPool = null;
      shutdowns.push(
        currentDevPool.end().then(() => {
          console.log("[DB] Dev pool closed");
        }),
      );
    }

    if (prodPool) {
      const currentProdPool = prodPool;
      prodPool = null;
      shutdowns.push(
        currentProdPool.end().then(() => {
          console.log("[DB] Prod pool closed");
        }),
      );
    }

    await Promise.all(shutdowns);
  } finally {
    isClosingPools = false;
  }
}