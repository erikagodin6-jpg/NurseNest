/**
 * DigitalOcean / Render / Railway are not auto-detected like VERCEL or CF_PAGES.
 * If AUTH_TRUST_HOST is missing or empty (common in platform env UIs), @auth/core
 * can throw UntrustedHost even when trustHost: true is set in NextAuth config.
 * @see https://authjs.dev/getting-started/deployment
 */
if (typeof process !== "undefined" && process.env) {
  const v = process.env.AUTH_TRUST_HOST;
  if (v === undefined || v === "") {
    process.env.AUTH_TRUST_HOST = "true";
  }
}
