import type { DifficultyBand, ExamFamily, QuestionType } from "@prisma/client";
import { EXAM_BLUEPRINT_TYPE_WEIGHTS, type ExamCandidateMeta } from "@/lib/content/exam-blueprint";
import type { LearningSignals } from "@/lib/learning/learning-signals";

export type AdaptiveExamCandidate = ExamCandidateMeta & { categoryId: string };

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function effectiveDifficulty(d: DifficultyBand | null): DifficultyBand {
  return d ?? "INTERMEDIATE";
}

/**
 * Higher = better fit for this learner (weak areas, difficulty match, freshness).
 */
export function catCandidateScore(c: AdaptiveExamCandidate, sig: LearningSignals): number {
  let s = 0;
  const sys = (c.systemTag ?? "").toLowerCase() || "__na__";
  if (sig.weakSystems.has(sys)) s += 5;
  if (sig.weakCategories.has(c.categoryId)) s += 3.5;
  if (sig.recentIds.has(c.id)) s -= 8;

  const order: Record<DifficultyBand, number> = { FOUNDATION: 0, INTERMEDIATE: 1, ADVANCED: 2 };
  const tgt = order[sig.targetDifficulty];
  const cur = order[effectiveDifficulty(c.difficulty)];
  s -= Math.abs(cur - tgt) * 2.2;

  if (sig.preferComplexTypes && (c.questionType === "NGN_CASE" || c.questionType === "SATA")) {
    s += 1.2;
  }
  return s;
}

function sortBucket(pool: AdaptiveExamCandidate[], sig: LearningSignals): AdaptiveExamCandidate[] {
  const scored = pool.map((c) => ({ c, score: catCandidateScore(c, sig) + Math.random() * 0.15 }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map((x) => x.c);
}

/**
 * Blueprint-constrained CAT selection: per-type quotas match exam family, ordering favors weak areas + target difficulty.
 */
export function pickAdaptiveCatQuestionIds(
  candidates: AdaptiveExamCandidate[],
  family: ExamFamily,
  limit: number,
  sig: LearningSignals,
): string[] {
  if (candidates.length === 0 || limit <= 0) return [];
  const cap = Math.min(limit, candidates.length);
  const weights = EXAM_BLUEPRINT_TYPE_WEIGHTS[family] ?? EXAM_BLUEPRINT_TYPE_WEIGHTS.GENERIC;

  const byType = new Map<QuestionType, AdaptiveExamCandidate[]>();
  for (const c of candidates) {
    const arr = byType.get(c.questionType) ?? [];
    arr.push(c);
    byType.set(c.questionType, arr);
  }
  for (const [, arr] of byType) {
    shuffle(arr);
  }

  const active: { t: QuestionType; w: number }[] = [];
  let totalW = 0;
  for (const [tStr, w] of Object.entries(weights)) {
    const t = tStr as QuestionType;
    if (w > 0 && (byType.get(t)?.length ?? 0) > 0) {
      active.push({ t, w });
      totalW += w;
    }
  }

  if (totalW === 0 || active.length === 0) {
    return sortBucket(candidates as AdaptiveExamCandidate[], sig)
      .slice(0, cap)
      .map((c) => c.id);
  }

  const quota = new Map<QuestionType, number>();
  let allocated = 0;
  for (const { t, w } of active) {
    const n = Math.floor((w / totalW) * cap);
    quota.set(t, n);
    allocated += n;
  }
  let remainder = cap - allocated;
  const sortedActive = [...active].sort((a, b) => b.w - a.w);
  let i = 0;
  while (remainder > 0 && sortedActive.length) {
    const t = sortedActive[i % sortedActive.length].t;
    quota.set(t, (quota.get(t) ?? 0) + 1);
    remainder--;
    i++;
  }

  const picked: AdaptiveExamCandidate[] = [];
  const used = new Set<string>();

  for (const { t } of sortedActive) {
    const want = quota.get(t) ?? 0;
    const pool = sortBucket(byType.get(t) ?? [], sig);
    let got = 0;
    for (const c of pool) {
      if (got >= want) break;
      if (!used.has(c.id)) {
        used.add(c.id);
        picked.push(c);
        got++;
      }
    }
  }

  if (picked.length < cap) {
    const rest = sortBucket(
      candidates.filter((c) => !used.has(c.id)),
      sig,
    );
    for (const c of rest) {
      if (picked.length >= cap) break;
      used.add(c.id);
      picked.push(c);
    }
  }

  const sliced = picked.slice(0, cap);
  const metaById = new Map(sliced.map((c) => [c.id, c]));
  return reduceDifficultyStreaks(
    sliced.map((c) => c.id),
    metaById,
  );
}

/**
 * Avoid long runs of the same difficulty band (simple deterministic pass).
 */
export function reduceDifficultyStreaks(
  ids: string[],
  metaById: Map<string, AdaptiveExamCandidate>,
): string[] {
  if (ids.length < 4) return ids;
  const out: string[] = [];
  const pool = [...ids];
  let last: DifficultyBand | null = null;
  let streak = 0;

  while (pool.length) {
    let idx = 0;
    if (streak >= 2 && last) {
      const alt = pool.findIndex((id) => effectiveDifficulty(metaById.get(id)?.difficulty ?? null) !== last);
      if (alt >= 0) idx = alt;
    }
    const id = pool.splice(idx, 1)[0];
    out.push(id);
    const d = effectiveDifficulty(metaById.get(id)?.difficulty ?? null);
    streak = d === last ? streak + 1 : 1;
    last = d;
  }
  return out;
}
