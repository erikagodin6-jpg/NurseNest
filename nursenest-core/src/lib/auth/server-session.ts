import type { Session } from "next-auth";
import { auth } from "@/lib/auth";

/**
 * Canonical server-side session read for the whole app.
 *
 * All Route Handlers, Server Components, and admin helpers must use this (or wrap it)
 * instead of calling `auth()` directly with ad-hoc null checks. That avoids:
 * - Mismatched “logged in” detection between APIs and pages
 * - Drift between RSC `auth()` and `/api/auth/session` (both ultimately use the same
 *   NextAuth config once `handlers` come from a single `NextAuth()` call)
 *
 * A session counts as present only when `user.id` is non-empty (JWT `sub` propagated).
 */
export async function getAppSession(): Promise<Session | null> {
  const session = await auth();
  if (!session?.user) return null;
  const id = (session.user as { id?: string }).id;
  if (!id || id === "") return null;
  return session;
}

export async function getSessionUserId(): Promise<string | null> {
  const s = await getAppSession();
  return (s?.user as { id?: string }).id ?? null;
}
