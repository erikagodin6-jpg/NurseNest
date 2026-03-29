/**
 * Prisma reads only `DATABASE_URL` (see `prisma/schema.prisma`). `PROD_DATABASE_URL` is never used
 * unless you duplicate its value into `DATABASE_URL` in the deployment UI.
 */

export function maskDatabaseUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname;
    const port = u.port ? `:${u.port}` : "";
    const db = u.pathname.replace(/^\//, "") || "(no database name)";
    const search = u.search || "";
    return `${u.protocol}//***:***@${host}${port}/${db}${search}`;
  } catch {
    return "(unparseable connection string)";
  }
}

/** Log once per Node process in production so platform log drains show which env wins. */
let logged = false;
export function logDatabaseEnvOnce(): void {
  if (logged) return;
  logged = true;
  if (process.env.NODE_ENV !== "production") return;

  const db = process.env.DATABASE_URL?.trim();
  const prod = process.env.PROD_DATABASE_URL?.trim();

  console.error(
    `[nursenest-core] prisma: datasource env("DATABASE_URL") only — masked=${db ? maskDatabaseUrl(db) : "(MISSING)"} PROD_DATABASE_URL=${prod ? `set_ignored_by_prisma masked=${maskDatabaseUrl(prod)}` : "unset"}`,
  );

  if (prod && db && prod !== db) {
    console.error(
      "[nursenest-core] prisma: WARNING DATABASE_URL and PROD_DATABASE_URL differ. Runtime uses DATABASE_URL only; align them or remove PROD_DATABASE_URL to avoid confusion.",
    );
  }
}
