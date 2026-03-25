/**
 * Fail-fast checks before accepting traffic. Database URLs are resolved in db.ts (no startup abort for missing DB).
 */
export function validateCriticalStartupConfig(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.ADMIN_JWT_SECRET?.trim()) {
    errors.push("ADMIN_JWT_SECRET is required (admin-auth)");
  }

  return { ok: errors.length === 0, errors };
}
