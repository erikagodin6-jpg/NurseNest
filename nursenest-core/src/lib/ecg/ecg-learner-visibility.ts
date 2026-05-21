/**
 * ECG premium learner surfaces (hub, nav, dashboard cards, adaptive rail).
 *
 * **Product / pathway rule (mirrors marketing hubs):** ECG is a first-class premium
 * module for **RN** and **NP** tiers. **RPN**, **LVN/LPN**, and **Allied** learners do
 * not get primary ECG launch surfaces — PN/RPN scope de-emphasizes dedicated rhythm
 * interpretation tracks here. Marketing uses `pathwayAllowsEcgLinkedLearning` in
 * `exam-pathway-hub-premium-modules.ts`; keep these rules aligned when either changes.
 *
 * **Entitlement:** Full drill / bank deep-links still require `resolveEntitlement` /
 * subscriber checks on destination pages — this module only controls *visibility*
 * of ECG entry points, not subscription enforcement.
 */
export function learnerTierAllowsEcgPrimarySurface(tier: string | null | undefined): boolean {
  return tier === "RN" || tier === "NP";
}

/** `examTarget` query values used across `/app/*` deep links. */
export function defaultExamTargetForTier(tier: string | null | undefined): string {
  if (tier === "NP") return "NP";
  if (tier === "RN") return "NCLEX_RN";
  if (tier === "RPN" || tier === "LVN_LPN") return "REX_PN";
  return "NCLEX_RN";
}

/**
 * Heuristic for adaptive / readiness rail: surface ECG nudges when cardiac-adjacent
 * focus is likely (exam focus string from onboarding).
 */
export function examFocusSuggestsCardiacEcg(examFocus: string | null | undefined): boolean {
  if (!examFocus) return false;
  const f = examFocus.toLowerCase();
  return (
    f.includes("cardiac") ||
    f.includes("heart") ||
    f.includes("ekg") ||
    f.includes("ecg") ||
    f.includes("nclex_rn") ||
    f.includes("np")
  );
}
