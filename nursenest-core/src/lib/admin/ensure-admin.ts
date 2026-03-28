import { NextResponse } from "next/server";
import { sessionHasAdminAccess } from "@/lib/admin/admin-role";
import { getAppSession } from "@/lib/auth/server-session";

export type AdminSession = {
  userId: string;
  role: string;
};

/** Admin API gate — uses the same session + role rules as `requireAdmin` in `lib/auth/guards`. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await getAppSession();
  if (!session || !sessionHasAdminAccess(session)) return null;
  const user = session.user as { id: string; role: string };
  return { userId: user.id, role: user.role };
}

export function forbidden(): NextResponse {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function requireAdmin() {
  const a = await getAdminSession();
  if (!a) return { ok: false as const, response: forbidden() };
  return { ok: true as const, admin: a };
}
