import { UserRole } from "@prisma/client";
import type { Session } from "next-auth";

/**
 * Canonical admin role check — use everywhere (pages, API routes, middleware helpers).
 * Matches Prisma `UserRole.ADMIN` and JWT/session `role` string.
 */
export function isAdminRole(role: unknown): boolean {
  return role === UserRole.ADMIN;
}

export function sessionHasAdminAccess(session: Session | null): boolean {
  const u = session?.user as { id?: string; role?: unknown } | undefined;
  return Boolean(u?.id && isAdminRole(u.role));
}
