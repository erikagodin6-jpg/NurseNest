import { resolveEntitlement, type AccessScope } from "@/lib/entitlements/resolve-entitlement";
import { safeServerLog } from "@/lib/observability/safe-server-log";

export type PageEntitlementResult = AccessScope | "error";

/**
 * Server-component safe entitlement read: never throws (shows fallback UI on failure).
 */
export async function resolveEntitlementForPage(userId: string): Promise<PageEntitlementResult> {
  if (!userId) {
    return { hasAccess: false, reason: "no_access", tier: null, country: null };
  }
  try {
    return await resolveEntitlement(userId);
  } catch {
    safeServerLog("entitlement", "resolve_failed_page", {});
    return "error";
  }
}
