import type { CountryCode, Prisma, TierCode } from "@prisma/client";
import { ContentStatus } from "@prisma/client";
import type { AccessScope } from "@/lib/entitlements/resolve-entitlement";

/** Production DB uses lowercase status strings on `exam_questions` / `content_items`. */
export const DB_PUBLISHED = "published" as const;

/**
 * Tier ladder for `exam_questions.tier` (lowercase), aligned with main app pools.
 */
export function examQuestionTiersForUserTier(userTier: TierCode): string[] {
  switch (userTier) {
    case "RPN":
      return ["rpn"];
    case "LVN_LPN":
      return ["rpn", "lvn"];
    case "RN":
      return ["rpn", "lvn", "rn"];
    case "NP":
      return ["rpn", "lvn", "rn", "np"];
    case "ALLIED":
      return ["allied"];
    default:
      return [];
  }
}

/** `content_items.tier` allowlist (matches Express `allowedTiers` for lessons). */
export function contentItemTiersForUserTier(userTier: TierCode): string[] {
  const t = tierCodeToContentTier(userTier);
  if (t === "admin") return ["free", "general", "rpn", "rn", "np"];
  if (t === "free") return ["free", "general"];
  return ["free", "general", t];
}

function tierCodeToContentTier(tier: TierCode): string {
  switch (tier) {
    case "RPN":
      return "rpn";
    case "LVN_LPN":
      return "lvn";
    case "RN":
      return "rn";
    case "NP":
      return "np";
    case "ALLIED":
      return "allied";
    default:
      return "free";
  }
}

function lessonPublishedWhere(): Prisma.ContentItemWhereInput {
  return {
    type: "lesson",
    status: DB_PUBLISHED,
  };
}

/** Prisma filter for `content_items` lessons the entitlement may load. */
export function lessonAccessWhere(entitlement: AccessScope): Prisma.ContentItemWhereInput {
  if (!entitlement.hasAccess) return { id: { in: [] } };
  if (entitlement.reason === "admin_override") {
    return lessonPublishedWhere();
  }
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return { id: { in: [] } };
  const tiers = contentItemTiersForUserTier(tier);
  return {
    AND: [
      lessonPublishedWhere(),
      {
        OR: [{ regionScope: "BOTH" }, { regionScope: country === "CA" ? "CA_ONLY" : "US_ONLY" }],
      },
      {
        OR: [{ tier: null }, { tier: { in: tiers } }],
      },
    ],
  };
}

export function lessonBankWhereForProfile(country: CountryCode, tier: TierCode): Prisma.ContentItemWhereInput {
  const tiers = contentItemTiersForUserTier(tier);
  return {
    AND: [
      lessonPublishedWhere(),
      {
        OR: [{ regionScope: "BOTH" }, { regionScope: country === "CA" ? "CA_ONLY" : "US_ONLY" }],
      },
      {
        OR: [{ tier: null }, { tier: { in: tiers } }],
      },
    ],
  };
}

/** Prisma filter for `exam_questions` rows the entitlement may load. */
export function questionAccessWhere(entitlement: AccessScope): Prisma.ExamQuestionWhereInput {
  if (!entitlement.hasAccess) return { id: { in: [] } };
  if (entitlement.reason === "admin_override") {
    return { status: DB_PUBLISHED };
  }
  const country = entitlement.country as CountryCode | null;
  const tier = entitlement.tier as TierCode | null;
  if (!country || !tier) return { id: { in: [] } };
  return {
    status: DB_PUBLISHED,
    tier: { in: examQuestionTiersForUserTier(tier) },
    OR: [{ regionScope: "BOTH" }, { regionScope: country === "CA" ? "CA_ONLY" : "US_ONLY" }],
  };
}

export function questionBankWhereForProfile(country: CountryCode, tier: TierCode): Prisma.ExamQuestionWhereInput {
  return {
    status: DB_PUBLISHED,
    tier: { in: examQuestionTiersForUserTier(tier) },
    OR: [{ regionScope: "BOTH" }, { regionScope: country === "CA" ? "CA_ONLY" : "US_ONLY" }],
  };
}

/** Flashcards: schema still uses ContentStatus + country/tier (may not match `flashcard_bank` until remapped). */
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

export function flashcardBankWhereForProfile(country: CountryCode, tier: TierCode): Prisma.FlashcardWhereInput {
  return {
    status: ContentStatus.PUBLISHED,
    country,
    tier: { in: accessibleTiersForUserTier(tier) },
  };
}

/**
 * Tier scope for live content: learners see their tier plus lower tiers in the same country
 * (e.g. RN can study RPN/LVN fundamentals); RPN/LVN do not see RN/NP-only pools.
 */
export function accessibleTiersForUserTier(userTier: TierCode): TierCode[] {
  switch (userTier) {
    case "RPN":
      return ["RPN"];
    case "LVN_LPN":
      return ["LVN_LPN"];
    case "RN":
      return ["RPN", "LVN_LPN", "RN"];
    case "NP":
      return ["RPN", "LVN_LPN", "RN", "NP"];
    case "ALLIED":
      return ["ALLIED"];
    default:
      return [];
  }
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
