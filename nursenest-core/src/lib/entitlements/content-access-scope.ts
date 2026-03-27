import { CountryCode, TierCode } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { AccessScope } from "@/lib/entitlements/resolve-entitlement";

/**
 * Tier scope for published content: learners see their tier plus lower tiers in the same country
 * (e.g. RN can study RPN/LVN fundamentals); RPN/LVN do not see RN/NP-only pools.
 */
export function accessibleTiersForUserTier(userTier: TierCode): TierCode[] {
  switch (userTier) {
    case TierCode.RPN:
      return [TierCode.RPN];
    case TierCode.LVN_LPN:
      return [TierCode.LVN_LPN];
    case TierCode.RN:
      return [TierCode.RPN, TierCode.LVN_LPN, TierCode.RN];
    case TierCode.NP:
      return [TierCode.RPN, TierCode.LVN_LPN, TierCode.RN, TierCode.NP];
    default:
      return [];
  }
}

function impossibleWhere(): Prisma.QuestionWhereInput {
  return { id: { in: [] } };
}

/** Prisma filter for questions the entitlement may load (admin: all published). */
export function questionAccessWhere(entitlement: AccessScope): Prisma.QuestionWhereInput {
  if (!entitlement.hasAccess) return impossibleWhere();
  if (entitlement.reason === "admin_override") {
    return { published: true };
  }
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return impossibleWhere();
  return {
    published: true,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

/** Prisma filter for lessons the entitlement may load (admin: all published). */
export function lessonAccessWhere(entitlement: AccessScope): Prisma.LessonWhereInput {
  if (!entitlement.hasAccess) return { id: { in: [] } };
  if (entitlement.reason === "admin_override") {
    return { published: true };
  }
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return { id: { in: [] } };
  return {
    published: true,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}
