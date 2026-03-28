/**
 * Shared guards for Prisma when `DATABASE_URL` may be unset (e.g. `next build`, local CI).
 * Skipping queries avoids Prisma client validation error logs; `withDatabaseFallback` also
 * swallows connection/query failures for read paths that should degrade gracefully.
 */
export function isDatabaseUrlConfigured(): boolean {
  return typeof process.env.DATABASE_URL === "string" && process.env.DATABASE_URL.trim().length > 0;
}

export async function withDatabaseFallback<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDatabaseUrlConfigured()) return fallback;
  try {
    return await run();
  } catch {
    return fallback;
  }
}
