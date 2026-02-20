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
  if (userTier === "admin") return true;
  return userTier === targetTier;
}

export function getTierLabel(tier: string): string {
  return TIER_LABELS[tier] || tier;
}

export function getAccessibleTiers(userTier: string | null | undefined): string[] {
  if (!userTier || userTier === "free") return ["free"];
  if (userTier === "admin") return ["free", "rpn", "rn", "np", "admin"];
  return ["free", userTier];
}

export function getUserTierOnly(userTier: string | null | undefined): string | null {
  if (!userTier || userTier === "free") return null;
  if (userTier === "admin") return null;
  return userTier;
}
