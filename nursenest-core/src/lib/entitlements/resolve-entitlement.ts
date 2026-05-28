import { SubscriptionStatus, UserRole } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isDatabaseUrlConfigured } from "@/lib/db/safe-database";
import { withRetry } from "@/lib/resilience/with-retry";

export type AccessScope = {
  hasAccess: boolean;
  reason: "active_subscription" | "admin_override" | "grace_period" | "no_access";
  tier: string | null;
  country: string | null;
};

const CACHE_TTL_MS = 60_000; // 1-minute TTL — short enough to pick up subscription changes quickly
const entitlementCache = new Map<string, { scope: AccessScope; expiresAt: number }>();

function getCached(userId: string): AccessScope | null {
  const entry = entitlementCache.get(userId);
  if (!entry || Date.now() > entry.expiresAt) {
    entitlementCache.delete(userId);
    return null;
  }
  return entry.scope;
}

function setCache(userId: string, scope: AccessScope): void {
  // Evict if cache grows too large (safety valve for high-concurrency deployments)
  if (entitlementCache.size > 5_000) entitlementCache.clear();
  entitlementCache.set(userId, { scope, expiresAt: Date.now() + CACHE_TTL_MS });
}

export function invalidateEntitlementCache(userId: string): void {
  entitlementCache.delete(userId);
}

export async function resolveEntitlement(userId: string): Promise<AccessScope> {
  if (!isDatabaseUrlConfigured()) {
    return { hasAccess: false, reason: "no_access", tier: null, country: null };
  }

  const cached = getCached(userId);
  if (cached) return cached;

  const user = await withRetry(() =>
    prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, tier: true, country: true },
    }),
  );

  if (!user) {
    const scope: AccessScope = { hasAccess: false, reason: "no_access", tier: null, country: null };
    setCache(userId, scope);
    return scope;
  }

  if (user.role === UserRole.ADMIN) {
    const scope: AccessScope = {
      hasAccess: true,
      reason: "admin_override",
      tier: user.tier,
      country: user.country,
    };
    setCache(userId, scope);
    return scope;
  }

  const subscription = await withRetry(() =>
    prisma.subscription.findFirst({
      where: { userId, status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.GRACE] } },
      orderBy: { createdAt: "desc" },
      select: { status: true },
    }),
  );

  let scope: AccessScope;
  if (subscription?.status === SubscriptionStatus.ACTIVE) {
    scope = { hasAccess: true, reason: "active_subscription", tier: user.tier, country: user.country };
  } else if (subscription?.status === SubscriptionStatus.GRACE) {
    scope = { hasAccess: true, reason: "grace_period", tier: user.tier, country: user.country };
  } else {
    scope = { hasAccess: false, reason: "no_access", tier: user.tier, country: user.country };
  }

  setCache(userId, scope);
  return scope;
}
