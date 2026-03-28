import type { DifficultyBand, QuestionType } from "@prisma/client";
import type { LearningSignals } from "@/lib/learning/learning-signals";
import { catCandidateScore, type AdaptiveExamCandidate } from "@/lib/learning/adaptive-cat";

export type StudySortRow = AdaptiveExamCandidate & { updatedAt?: Date };

function systemKey(r: StudySortRow): string {
  return (r.systemTag ?? "").toLowerCase() || "__na__";
}

/** Two weak-priority picks, then one from the rest, to reduce burnout while keeping weak areas first. */
function interleaveWeakAndMix(weakPref: StudySortRow[], filler: StudySortRow[]): StudySortRow[] {
  const out: StudySortRow[] = [];
  let wi = 0;
  let fi = 0;
  while (wi < weakPref.length || fi < filler.length) {
    if (wi < weakPref.length) out.push(weakPref[wi++]);
    if (wi < weakPref.length) out.push(weakPref[wi++]);
    if (fi < filler.length) out.push(filler[fi++]);
  }
  return out;
}

/**
 * Order practice bank rows: prioritize weak systems, match target difficulty, deprioritize very recent repeats.
 * When weak systems are known, mixes in non-weak items (~1:2) to avoid all-hard sessions.
 */
export function rankStudyQuestions(rows: StudySortRow[], sig: LearningSignals): StudySortRow[] {
  const scored = rows.map((r) => ({
    r,
    score: catCandidateScore(r, sig) + (r.questionType === "MCQ" ? 0.1 : 0),
  }));
  scored.sort((a, b) => b.score - a.score);
  const ranked = scored.map((x) => x.r);

  if (sig.weakSystems.size === 0) {
    return ranked;
  }

  const weakPref: StudySortRow[] = [];
  const filler: StudySortRow[] = [];
  for (const r of ranked) {
    if (sig.weakSystems.has(systemKey(r))) {
      weakPref.push(r);
    } else {
      filler.push(r);
    }
  }
  if (filler.length === 0 || weakPref.length === 0) {
    return ranked;
  }
  return interleaveWeakAndMix(weakPref, filler);
}

export const DIFFICULTY_TIER_LABELS: Record<
  DifficultyBand | "UNKNOWN",
  { code: string; label: string; studyHint: string }
> = {
  FOUNDATION: { code: "easy", label: "Easy", studyHint: "Foundational recall and safety basics" },
  INTERMEDIATE: { code: "moderate", label: "Moderate", studyHint: "Typical exam-style application" },
  ADVANCED: { code: "hard", label: "Hard", studyHint: "Multi-step prioritization and edge cases" },
  UNKNOWN: { code: "mixed", label: "Mixed", studyHint: "Difficulty not tagged—defaults to moderate pacing" },
};

export function questionTypeComplexity(qt: QuestionType): "standard" | "ngn_style" {
  return qt === "NGN_CASE" ? "ngn_style" : "standard";
}
