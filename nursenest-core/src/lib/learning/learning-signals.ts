import type { DifficultyBand, ExamFamily, TierCode } from "@prisma/client";
import type { ParsedLearningProfile } from "@/lib/learning/profile-shape";

export type LearningSignals = {
  recentIds: Set<string>;
  weakSystems: Set<string>;
  weakCategories: Set<string>;
  targetDifficulty: DifficultyBand;
  /** True when overall accuracy suggests reinforcing higher-complexity stems. */
  preferComplexTypes: boolean;
};

const WEAK_ACC = 0.58;
const WEAK_MIN_T = 2;

export function inferTargetDifficulty(profile: ParsedLearningProfile | null): DifficultyBand {
  if (!profile) return "INTERMEDIATE";
  const d = profile.aggregatesByDifficulty;
  const int = d.INTERMEDIATE ?? d.UNKNOWN;
  const adv = d.ADVANCED;
  const fnd = d.FOUNDATION;

  if (int && int.t >= 4) {
    const acc = int.c / int.t;
    if (acc < 0.52) return "FOUNDATION";
    if (acc > 0.82 && adv && adv.t >= 3 && adv.c / adv.t > 0.65) return "ADVANCED";
  }
  if (fnd && fnd.t >= 5 && fnd.c / fnd.t < 0.55) return "FOUNDATION";
  if (adv && adv.t >= 6 && adv.c / adv.t > 0.78) return "ADVANCED";
  return "INTERMEDIATE";
}

function overallAccuracy(profile: ParsedLearningProfile | null): number | null {
  if (!profile) return null;
  let c = 0;
  let t = 0;
  for (const b of Object.values(profile.aggregatesByDifficulty)) {
    c += b.c;
    t += b.t;
  }
  if (t < 1) return null;
  return c / t;
}

export function buildLearningSignals(profile: ParsedLearningProfile | null): LearningSignals {
  const recentIds = new Set((profile?.recentQuestionIds ?? []).slice(0, 70));
  const weakSystems = new Set<string>();
  const weakCategories = new Set<string>();

  if (profile) {
    for (const [k, v] of Object.entries(profile.aggregatesBySystem)) {
      if (v.t >= WEAK_MIN_T && v.c / v.t < WEAK_ACC) {
        weakSystems.add(k.toLowerCase());
      }
    }
    for (const [k, v] of Object.entries(profile.aggregatesByCategory)) {
      if (v.t >= WEAK_MIN_T && v.c / v.t < WEAK_ACC) {
        weakCategories.add(k);
      }
    }
  }

  const oa = overallAccuracy(profile);
  const preferComplexTypes = oa != null && oa < 0.62;

  return {
    recentIds,
    weakSystems,
    weakCategories,
    targetDifficulty: inferTargetDifficulty(profile),
    preferComplexTypes,
  };
}

/** Default exam family hint from learner tier (coarse). */
export function examFamilyHintForTier(tier: TierCode): ExamFamily {
  switch (tier) {
    case "NP":
      return "NP";
    case "ALLIED":
      return "ALLIED";
    case "RPN":
    case "LVN_LPN":
      return "NCLEX_PN";
    case "RN":
    default:
      return "NCLEX_RN";
  }
}
