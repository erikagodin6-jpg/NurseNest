/**
 * Structured server logs without secrets, tokens, or raw user identifiers.
 * Use for production diagnosis (platform log drains pick up stderr).
 */
const PREFIX = "[nursenest-core]";

export type SafeLogMeta = Record<string, string | number | boolean | undefined>;

export function safeServerLog(scope: string, event: string, meta?: SafeLogMeta): void {
  const payload = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
  console.error(`${PREFIX} ${scope} ${event}${payload}`);
}
