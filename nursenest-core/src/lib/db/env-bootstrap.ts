/**
 * Import this module before constructing `PrismaClient` (directly or via `@/lib/db`).
 *
 * In production, when `PROD_DATABASE_URL` is set, it becomes the effective `DATABASE_URL`
 * so runtime matches operators who store the prod DSN under that name.
 * `schema.prisma` references `env("DATABASE_URL")` only.
 */
export type DatabaseUrlSource = "prod_override" | "database_url" | "missing";

export let databaseUrlSource: DatabaseUrlSource = "missing";

export function applyDatabaseUrlFromEnv(): void {
  const hasDb = Boolean(process.env.DATABASE_URL?.trim());
  const prod = process.env.PROD_DATABASE_URL?.trim();

  if (process.env.NODE_ENV === "production" && prod) {
    process.env.DATABASE_URL = prod;
    databaseUrlSource = "prod_override";
    return;
  }
  databaseUrlSource = hasDb ? "database_url" : "missing";
}

applyDatabaseUrlFromEnv();
