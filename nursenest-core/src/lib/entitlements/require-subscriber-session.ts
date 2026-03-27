import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { resolveEntitlement, type AccessScope } from "@/lib/entitlements/resolve-entitlement";
import { safeServerLog } from "@/lib/observability/safe-server-log";

export type SubscriberSessionOk = { ok: true; userId: string; entitlement: AccessScope };
export type SubscriberSessionFail = { ok: false; response: NextResponse };
export type SubscriberSessionResult = SubscriberSessionOk | SubscriberSessionFail;

/**
 * Single gate for subscriber-only APIs: session + entitlement resolution.
 * Avoid duplicating auth/403 logic across route handlers.
 */
export async function requireSubscriberSession(): Promise<SubscriberSessionResult> {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  let entitlement: AccessScope;
  try {
    entitlement = await resolveEntitlement(userId);
  } catch {
    safeServerLog("entitlement", "resolve_failed", {});
    return {
      ok: false,
      response: NextResponse.json({ error: "Unable to verify access. Try again shortly." }, { status: 503 }),
    };
  }

  if (!entitlement.hasAccess) {
    return { ok: false, response: NextResponse.json({ error: "Subscription required" }, { status: 403 }) };
  }

  return { ok: true, userId, entitlement };
}
