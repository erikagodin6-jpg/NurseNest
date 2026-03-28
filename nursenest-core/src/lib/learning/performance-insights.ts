import type { ParsedLearningProfile } from "@/lib/learning/profile-shape";

export type SystemPerformanceRow = {
  key: string;
  accuracy: number;
  attempts: number;
};

/**
 * Systems with solid accuracy and enough attempts (strengths to maintain).
 */
export function topStrongSystems(
  profile: ParsedLearningProfile | null,
  opts: { minAttempts?: number; minAccuracy?: number; limit?: number } = {},
): SystemPerformanceRow[] {
  const minT = opts.minAttempts ?? 4;
  const minAcc = opts.minAccuracy ?? 0.78;
  const limit = opts.limit ?? 6;
  if (!profile) return [];
  return Object.entries(profile.aggregatesBySystem)
    .filter(([, b]) => b.t >= minT && b.c / b.t >= minAcc)
    .map(([key, b]) => ({ key, accuracy: b.c / b.t, attempts: b.t }))
    .filter((r) => r.key !== "__na__")
    .sort((a, b) => b.accuracy - a.accuracy || b.attempts - a.attempts)
    .slice(0, limit);
}

/**
 * Lowest-accuracy systems with sample size (weak areas).
 */
export function topWeakSystemsDetailed(
  profile: ParsedLearningProfile | null,
  opts: { minAttempts?: number; maxAccuracy?: number; limit?: number } = {},
): SystemPerformanceRow[] {
  const minT = opts.minAttempts ?? 2;
  const maxAcc = opts.maxAccuracy ?? 0.58;
  const limit = opts.limit ?? 6;
  if (!profile) return [];
  return Object.entries(profile.aggregatesBySystem)
    .filter(([, b]) => b.t >= minT && b.c / b.t < maxAcc)
    .map(([key, b]) => ({ key, accuracy: b.c / b.t, attempts: b.t }))
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
    .slice(0, limit);
}

/**
 * Compare mean mock ratio in earlier vs later half of stored exam history.
 */
export function computeExamTrend(
  profile: ParsedLearningProfile | null,
): "improving" | "steady" | "declining" | null {
  const h = profile?.examScoreHistory ?? [];
  if (h.length < 4) return null;
  const ratios = h.map((e) => e.score / e.total);
  const mid = Math.floor(ratios.length / 2);
  if (mid < 1 || ratios.length - mid < 1) return null;
  const firstMean = ratios.slice(0, mid).reduce((s, x) => s + x, 0) / mid;
  const secondMean = ratios.slice(mid).reduce((s, x) => s + x, 0) / (ratios.length - mid);
  const delta = secondMean - firstMean;
  if (delta > 0.06) return "improving";
  if (delta < -0.06) return "declining";
  return "steady";
}
