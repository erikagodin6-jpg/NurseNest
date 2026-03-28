/**
 * Prisma `schema.prisma` uses `url = env("DATABASE_URL")` only — no DIRECT_URL / SHADOW_DATABASE_URL in this project.
 * Runtime must supply a PostgreSQL connection string; Prisma rejects anything that does not start with
 * `postgresql://` or `postgres://`.
 */

const PG_PREFIX = /^postgres(ql)?:\/\//i;

/** Visible in logs only — never log raw secrets. */
export function redactDatabaseUrlForLog(url: string): string {
  try {
    const u = new URL(url);
    if (u.password) u.password = "***";
    return u.toString();
  } catch {
    return "(invalid URL — cannot parse for redaction)";
  }
}

function stripOuterQuotes(raw: string): string {
  const t = raw.trim();
  if (t.length >= 2 && ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

/**
 * Some hosts paste `DATABASE_URL` with wrapping quotes; Prisma then sees a value that does not
 * start with `postgresql://`. Normalize env in-process before Prisma reads it.
 */
export function normalizeDatabaseUrlEnv(): void {
  const raw = process.env.DATABASE_URL;
  if (raw === undefined) return;
  const next = stripOuterQuotes(raw);
  if (next !== raw) {
    process.env.DATABASE_URL = next;
  }
}

export function isValidPostgresqlDatabaseUrl(url: string): boolean {
  const t = url.trim();
  return t.length > 0 && PG_PREFIX.test(t);
}

/**
 * Edge-safe (no `process.argv`). Next sets `NEXT_PHASE=phase-production-build` during `next build`
 * (including `npx next build`); npm sets `npm_lifecycle_event=build` for `npm run build`.
 */
function isLikelyNextBuild(): boolean {
  return (
    process.env.npm_lifecycle_event === "build" ||
    process.env.NEXT_PHASE === "phase-production-build"
  );
}

/**
 * Fail fast before `PrismaClient` is constructed or before runtime serves traffic.
 *
 * - If `DATABASE_URL` is non-empty but not a postgres URL → always throw (any NODE_ENV).
 * - If missing/empty in production **runtime** (not `next build`) → throw.
 * - During `next build`, missing URL is allowed (CI may not attach a DB); malformed URL still throws.
 */
export function assertValidDatabaseUrl(): void {
  normalizeDatabaseUrlEnv();

  const raw = process.env.DATABASE_URL;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  const isEdge = process.env.NEXT_RUNTIME === "edge";

  if (trimmed && !isValidPostgresqlDatabaseUrl(trimmed)) {
    throw new Error(
      `[database] DATABASE_URL must be a PostgreSQL connection string starting with postgresql:// or postgres://. ` +
        `Got a value of length ${trimmed.length} that does not match (check for wrong variable, missing protocol, or extra characters). ` +
        `Example shape: postgresql://USER:PASSWORD@HOST:5432/DATABASE`,
    );
  }

  if (!trimmed) {
    const prod = process.env.NODE_ENV === "production";
    // Edge middleware may bundle this file; DB is not used there. Node production runtime must have a URL.
    if (prod && !isLikelyNextBuild() && !isEdge) {
      throw new Error(
        "[database] DATABASE_URL is unset or empty in production. Set it to a PostgreSQL URL, e.g. postgresql://USER:PASSWORD@HOST:5432/DATABASE",
      );
    }
  }
}
