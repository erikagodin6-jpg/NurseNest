const TIER_HIERARCHY: Record<string, number> = {
  free: 0,
  rpn: 1,
  rn: 2,
  np: 3,
  admin: 4,
};

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  rpn: "RPN/LVN",
  rn: "RN/NCLEX",
  np: "NP Advanced",
  admin: "Admin",
};

export function canAccessTier(userTier: string | null | undefined, targetTier: string): boolean {
  if (!targetTier || targetTier === "free") return true;
  if (!userTier || userTier === "free") return false;
  const userLevel = TIER_HIERARCHY[userTier] ?? 0;
  const targetLevel = TIER_HIERARCHY[targetTier] ?? 0;
  return userLevel >= targetLevel;
}

export function getTierLabel(tier: string): string {
  return TIER_LABELS[tier] || tier;
}

export function getAccessibleTiers(userTier: string | null | undefined): string[] {
  if (!userTier || userTier === "free") return ["free"];
  const userLevel = TIER_HIERARCHY[userTier] ?? 0;
  return Object.entries(TIER_HIERARCHY)
    .filter(([, level]) => level <= userLevel)
    .map(([key]) => key);
}
