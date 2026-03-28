/**
 * Production: transactional email (password reset, etc.) requires Resend credentials.
 * Called from instrumentation on Node startup.
 * Set `SKIP_EMAIL_ENV_VALIDATION=true` only for CI image builds without secrets (not recommended for real prod runtime).
 */
export function assertTransactionalEmailEnvForProduction(): void {
  if (process.env.NODE_ENV !== "production") return;
  if (process.env.SKIP_EMAIL_ENV_VALIDATION === "true") return;
  const missing: string[] = [];
  if (!process.env.RESEND_API_KEY?.trim()) missing.push("RESEND_API_KEY");
  if (!process.env.EMAIL_FROM?.trim()) missing.push("EMAIL_FROM");
  if (missing.length > 0) {
    throw new Error(
      `[nursenest-core] Missing required transactional email env in production: ${missing.join(", ")}. ` +
        `Password reset and similar flows will not work without them.`,
    );
  }
}
