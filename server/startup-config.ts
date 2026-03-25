/**
 * Fail-fast checks before accepting traffic. Keeps production boot honest without duplicating db.ts URL rules.
 */
export function validateCriticalStartupConfig(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.ADMIN_JWT_SECRET?.trim()) {
    errors.push("ADMIN_JWT_SECRET is required (admin-auth)");
  }

  const nodeEnv = process.env.NODE_ENV || "development";
  const prodUrl = process.env.PROD_DATABASE_URL?.trim();
  const devUrl = process.env.DATABASE_URL?.trim();

  if (nodeEnv === "production") {
    if (!prodUrl && !devUrl) {
      errors.push("Production requires DATABASE_URL or PROD_DATABASE_URL");
    }
  } else if (!devUrl) {
    errors.push("DATABASE_URL is required for non-production (see server/db.ts)");
  }

  return { ok: errors.length === 0, errors };
}
