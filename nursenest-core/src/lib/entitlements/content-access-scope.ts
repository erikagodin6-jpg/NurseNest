import { ContentStatus, CountryCode, TierCode } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { AccessScope } from "@/lib/entitlements/resolve-entitlement";

/**
 * Tier scope for live content: learners see their tier plus lower tiers in the same country
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
    case TierCode.ALLIED:
      return [TierCode.RPN, TierCode.LVN_LPN, TierCode.RN];
    default:
      return [];
  }
}

function impossibleWhere(): Prisma.QuestionWhereInput {
  return { id: { in: [] } };
}

/** Prisma filter for questions the entitlement may load (admin: all statuses for authoring views). */
export function questionAccessWhere(entitlement: AccessScope): Prisma.QuestionWhereInput {
  if (!entitlement.hasAccess) return impossibleWhere();
  if (entitlement.reason === "admin_override") {
    return { status: ContentStatus.PUBLISHED };
  }
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return impossibleWhere();
  return {
    status: ContentStatus.PUBLISHED,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

/**
 * Learner-facing pool: published scope plus quality gate. Items with `needsReview` stay in the catalog for admins
 * but never appear in banks, exams, or freemium previews until cleared.
 */
export function questionLearnerPoolWhere(entitlement: AccessScope): Prisma.QuestionWhereInput {
  const base = questionAccessWhere(entitlement);
  if (!entitlement.hasAccess) return base;
  if (entitlement.reason === "admin_override") {
    return base;
  }
  return { AND: [base, { needsReview: false }] };
}

/** Prisma filter for lessons the entitlement may load (admin override mirrors question behavior). */
export function lessonAccessWhere(entitlement: AccessScope): Prisma.LessonWhereInput {
  if (!entitlement.hasAccess) return { id: { in: [] } };
  if (entitlement.reason === "admin_override") {
    return { status: ContentStatus.PUBLISHED };
  }
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return { id: { in: [] } };
  return {
    status: ContentStatus.PUBLISHED,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

/** Filter for published questions visible to a learner profile (used for freemium previews). */
export function questionBankWhereForProfile(country: CountryCode, tier: TierCode): Prisma.QuestionWhereInput {
  return {
    status: ContentStatus.PUBLISHED,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

/** Freemium / profile-scoped bank rows that passed quality review. */
export function questionBankLearnerWhereForProfile(country: CountryCode, tier: TierCode): Prisma.QuestionWhereInput {
  return {
    AND: [questionBankWhereForProfile(country, tier), { needsReview: false }],
  };
}

/** Same for lesson list previews. */
export function lessonBankWhereForProfile(country: CountryCode, tier: TierCode): Prisma.LessonWhereInput {
  return {
    status: ContentStatus.PUBLISHED,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

/** Flashcards: same tier ladder as questions/lessons. */
export function flashcardAccessWhere(entitlement: AccessScope): Prisma.FlashcardWhereInput {
  if (!entitlement.hasAccess) return { id: { in: [] } };
  if (entitlement.reason === "admin_override") {
    return { status: ContentStatus.PUBLISHED };
  }
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return { id: { in: [] } };
  return {
    status: ContentStatus.PUBLISHED,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

export function flashcardLearnerPoolWhere(entitlement: AccessScope): Prisma.FlashcardWhereInput {
  const base = flashcardAccessWhere(entitlement);
  if (!entitlement.hasAccess) return base;
  if (entitlement.reason === "admin_override") {
    return base;
  }
  return { AND: [base, { needsReview: false }] };
}

export function flashcardBankWhereForProfile(country: CountryCode, tier: TierCode): Prisma.FlashcardWhereInput {
  return {
    status: ContentStatus.PUBLISHED,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

export function flashcardBankLearnerWhereForProfile(country: CountryCode, tier: TierCode): Prisma.FlashcardWhereInput {
  return {
    AND: [flashcardBankWhereForProfile(country, tier), { needsReview: false }],
  };
}

/** Whether the learner may record an attempt for this exam row (backend paywall). */
export function userCanAccessExam(
  entitlement: AccessScope,
  exam: { status: ContentStatus; country: CountryCode; tier: TierCode },
): boolean {
  if (exam.status !== ContentStatus.PUBLISHED || !entitlement.hasAccess) return false;
  if (entitlement.reason === "admin_override") return true;
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return false;
  if (exam.country !== country) return false;
  return accessibleTiersForUserTier(tier).includes(exam.tier);
}
