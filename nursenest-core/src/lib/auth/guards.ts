import { redirect } from "next/navigation";
import { sessionHasAdminAccess } from "@/lib/admin/admin-role";
import { getAppSession } from "@/lib/auth/server-session";

export async function requireUser() {
  const session = await getAppSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

/** Admin RSC/layout gate — same `sessionHasAdminAccess` + session source as `getAdminSession` for APIs. */
export async function requireAdmin() {
  const session = await requireUser();
  if (!sessionHasAdminAccess(session)) {
    redirect("/app");
  }
  return session;
}
