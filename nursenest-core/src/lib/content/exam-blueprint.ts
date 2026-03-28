import type { DifficultyBand, ExamFamily, QuestionType } from "@prisma/client";
import { QuestionType as QT } from "@prisma/client";

export type ExamCandidateMeta = {
  id: string;
  questionType: QuestionType;
  difficulty: DifficultyBand | null;
  systemTag: string | null;
};

/** Target mix by exam family (approximate); missing types in the pool are skipped and backfilled. */
export const EXAM_BLUEPRINT_TYPE_WEIGHTS: Record<ExamFamily, Partial<Record<QuestionType, number>>> = {
  NCLEX_RN: { [QT.MCQ]: 0.52, [QT.SATA]: 0.28, [QT.NGN_CASE]: 0.12, [QT.ORDERING]: 0.05, [QT.FIB_NUMERIC]: 0.03 },
  NCLEX_PN: { [QT.MCQ]: 0.55, [QT.SATA]: 0.3, [QT.NGN_CASE]: 0.08, [QT.ORDERING]: 0.04, [QT.FIB_NUMERIC]: 0.03 },
  REX_PN: { [QT.MCQ]: 0.55, [QT.SATA]: 0.3, [QT.NGN_CASE]: 0.08, [QT.ORDERING]: 0.04, [QT.FIB_NUMERIC]: 0.03 },
  NP: { [QT.MCQ]: 0.45, [QT.SATA]: 0.25, [QT.NGN_CASE]: 0.22, [QT.ORDERING]: 0.05, [QT.FIB_NUMERIC]: 0.03 },
  ALLIED: { [QT.MCQ]: 0.6, [QT.SATA]: 0.25, [QT.NGN_CASE]: 0.08, [QT.ORDERING]: 0.04, [QT.FIB_NUMERIC]: 0.03 },
  GENERIC: { [QT.MCQ]: 0.55, [QT.SATA]: 0.28, [QT.NGN_CASE]: 0.1, [QT.ORDERING]: 0.04, [QT.FIB_NUMERIC]: 0.03 },
};

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick up to `limit` question ids: stratify by blueprint question-type mix, then shuffle for session variety.
 */
export function pickExamQuestionIds(candidates: ExamCandidateMeta[], family: ExamFamily, limit: number): string[] {
  if (candidates.length === 0 || limit <= 0) return [];
  const cap = Math.min(limit, candidates.length);
  const weights = EXAM_BLUEPRINT_TYPE_WEIGHTS[family] ?? EXAM_BLUEPRINT_TYPE_WEIGHTS.GENERIC;

  const byType = new Map<QuestionType, ExamCandidateMeta[]>();
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
    return shuffle(candidates)
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

  const picked: ExamCandidateMeta[] = [];
  const used = new Set<string>();

  for (const { t } of sortedActive) {
    const want = quota.get(t) ?? 0;
    const pool = byType.get(t) ?? [];
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
    for (const c of shuffle(candidates)) {
      if (picked.length >= cap) break;
      if (!used.has(c.id)) {
        used.add(c.id);
        picked.push(c);
      }
    }
  }

  return shuffle(picked.slice(0, cap)).map((c) => c.id);
}
