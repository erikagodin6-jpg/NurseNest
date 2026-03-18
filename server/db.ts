import pg from "pg";

export type DatabaseTarget = "production" | "development";

const DEV_URL = process.env.DATABASE_URL;
const PROD_URL = process.env.PROD_DATABASE_URL || process.env.DATABASE_URL;

function maskUrl(url: string | undefined): string {
  if (!url) return "(not set)";
  return url.replace(/\/\/.*@/, "//***@");
}

let devPool: pg.Pool | null = null;
let prodPool: pg.Pool | null = null;

export function getDevPool(): pg.Pool {
  if (!devPool) {
    if (!DEV_URL) throw new Error("DATABASE_URL is not set");
    devPool = new pg.Pool({
      connectionString: DEV_URL,
      statement_timeout: 10000,
    });
    const origQuery = devPool.query.bind(devPool);
    devPool.query = function (...args: any[]) {
      const start = Date.now();
      const result = origQuery(...args);
      if (result && typeof result.then === "function") {
        return result.then((res: any) => {
          const elapsed = Date.now() - start;
          if (elapsed > 500) {
            const queryText = typeof args[0] === "string" ? args[0].slice(0, 200) : "(complex query)";
            console.warn(`[SlowQuery] ${elapsed}ms: ${queryText}`);
          }
          return res;
        });
      }
      return result;
    } as any;
    console.log(`[DB] Dev pool created → ${maskUrl(DEV_URL)} (statement_timeout=10s)`);
  }
  return devPool;
}

export function getProdPool(): pg.Pool {
  if (!prodPool) {
    if (!PROD_URL) throw new Error("Neither PROD_DATABASE_URL nor DATABASE_URL is set");
    prodPool = new pg.Pool({
      connectionString: PROD_URL,
      statement_timeout: 10000,
    });
    const origQuery = prodPool.query.bind(prodPool);
    prodPool.query = function (...args: any[]) {
      const start = Date.now();
      const result = origQuery(...args);
      if (result && typeof result.then === "function") {
        return result.then((res: any) => {
          const elapsed = Date.now() - start;
          if (elapsed > 500) {
            const queryText = typeof args[0] === "string" ? args[0].slice(0, 200) : "(complex query)";
            console.warn(`[SlowQuery] ${elapsed}ms: ${queryText}`);
          }
          return res;
        });
      }
      return result;
    } as any;
    console.log(`[DB] Prod pool created → ${maskUrl(PROD_URL)} (statement_timeout=10s)`);
  }
  return prodPool;
}

export function getPool(target?: DatabaseTarget): pg.Pool {
  if (target === "development") return getDevPool();
  if (target === "production") return getProdPool();
  return getDevPool();
}

export function hasSeparateProdDb(): boolean {
  return !!(process.env.PROD_DATABASE_URL && process.env.PROD_DATABASE_URL !== process.env.DATABASE_URL);
}

export function getDbInfo() {
  return {
    devUrl: maskUrl(DEV_URL),
    prodUrl: maskUrl(PROD_URL),
    hasSeparateProd: hasSeparateProdDb(),
    environment: process.env.NODE_ENV || "development",
  };
}

export function logDatabaseTarget(operation: string, target: DatabaseTarget): void {
  const url = target === "production" ? PROD_URL : DEV_URL;
  console.log(`[DB] ${operation} → targeting ${target.toUpperCase()} database (${maskUrl(url)})`);
}

export function logRowCount(operation: string, count: number): void {
  console.log(`[DB] ${operation} → ${count} rows affected`);
}
