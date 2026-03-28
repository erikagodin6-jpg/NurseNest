import type { ParsedLearningProfile } from "@/lib/learning/profile-shape";

export type ReadinessBand = "not_ready" | "borderline" | "ready";

export type ReadinessResult = {
  score0to100: number;
  band: ReadinessBand;
  label: string;
  /** High when enough attempts exist to trust the band. */
  confidence: "low" | "medium" | "high";
  factors: {
    overallAccuracy: number | null;
    weakAreaCount: number;
    lastExamRatio: number | null;
    /** Std dev of score/total on last few mocks; lower = more consistent. */
    recentExamScoreStd: number | null;
    practiceVolume: number;
  };
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function recentExamScoreStd(profile: ParsedLearningProfile | null, n = 5): number | null {
  const slice = profile?.examScoreHistory.slice(-n) ?? [];
  if (slice.length < 2) return null;
  const ratios = slice.map((e) => e.score / e.total);
  const mean = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  const variance = ratios.reduce((s, x) => s + (x - mean) ** 2, 0) / ratios.length;
  return Math.sqrt(variance);
}

/**
 * Deterministic readiness from aggregates + recent exam ratios. Tuned conservatively for licensure prep.
 */
export function computeReadiness(profile: ParsedLearningProfile | null): ReadinessResult {
  let c = 0;
  let t = 0;
  const weakList: { key: string; acc: number; n: number }[] = [];

  if (profile) {
    for (const [key, b] of Object.entries(profile.aggregatesBySystem)) {
      c += b.c;
      t += b.t;
      if (b.t >= 3 && b.c / b.t < 0.55) {
        weakList.push({ key, acc: b.c / b.t, n: b.t });
      }
    }
  }

  const overallAccuracy = t >= 1 ? c / t : null;
  const weakAreaCount = weakList.length;
  const practiceVolume = profile?.totalPracticeAttempts ?? 0;

  const exams = profile?.examScoreHistory ?? [];
  const lastThree = exams.slice(-3);
  const lastExamRatio =
    lastThree.length > 0
      ? lastThree.reduce((s, e) => s + e.score / e.total, 0) / lastThree.length
      : null;

  const examStd = recentExamScoreStd(profile, 5);

  let score = 52;
  if (overallAccuracy != null) {
    score += (overallAccuracy - 0.72) * 140;
  }
  if (lastExamRatio != null) {
    score += (lastExamRatio - 0.75) * 55;
  }
  score -= weakAreaCount * 6;
  if (practiceVolume < 12) {
    score -= 8;
  }
  if (practiceVolume > 80 && overallAccuracy != null && overallAccuracy > 0.78) {
    score += 6;
  }
  if (examStd != null && lastExamRatio != null) {
    if (examStd < 0.08 && lastExamRatio > 0.74) {
      score += 5;
    } else if (examStd > 0.18) {
      score -= 5;
    }
  }

  score = clamp(Math.round(score), 0, 100);

  let band: ReadinessBand;
  let label: string;
  if (score < 42) {
    band = "not_ready";
    label = "Not ready";
  } else if (score < 68) {
    band = "borderline";
    label = "Borderline";
  } else {
    band = "ready";
    label = "Ready to pass";
  }

  const confidence: ReadinessResult["confidence"] =
    practiceVolume < 15 || t < 25 ? "low" : practiceVolume < 45 || t < 60 ? "medium" : "high";

  return {
    score0to100: score,
    band,
    label,
    confidence,
    factors: {
      overallAccuracy,
      weakAreaCount,
      lastExamRatio,
      recentExamScoreStd: examStd,
      practiceVolume,
    },
  };
}
