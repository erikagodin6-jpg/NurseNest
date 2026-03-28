import type { DifficultyBand } from "@prisma/client";

/** One aggregate bucket: correct count, attempts, optional response-time sum (ms). */
export type StatBucket = {
  c: number;
  t: number;
  sumMs: number;
};

export type ExamHistoryEntry = {
  at: string;
  score: number;
  total: number;
};

export type ParsedLearningProfile = {
  aggregatesBySystem: Record<string, StatBucket>;
  aggregatesByDifficulty: Record<string, StatBucket>;
  aggregatesByCategory: Record<string, StatBucket>;
  recentQuestionIds: string[];
  examScoreHistory: ExamHistoryEntry[];
  totalPracticeAttempts: number;
};

const emptyBucket = (): StatBucket => ({ c: 0, t: 0, sumMs: 0 });

function asBucket(v: unknown): StatBucket {
  if (!v || typeof v !== "object") return emptyBucket();
  const o = v as Record<string, unknown>;
  const c = typeof o.c === "number" && o.c >= 0 ? o.c : 0;
  const t = typeof o.t === "number" && o.t >= 0 ? o.t : 0;
  const sumMs = typeof o.sumMs === "number" && o.sumMs >= 0 ? o.sumMs : 0;
  return { c, t, sumMs };
}

function asBucketMap(v: unknown): Record<string, StatBucket> {
  if (!v || typeof v !== "object") return {};
  const out: Record<string, StatBucket> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    out[k] = asBucket(val);
  }
  return out;
}

function asStringArray(v: unknown, maxLen: number): string[] {
  if (!Array.isArray(v)) return [];
  const s = v.map((x) => String(x)).filter((x) => x.length > 4);
  return s.slice(0, maxLen);
}

function asExamHistory(v: unknown): ExamHistoryEntry[] {
  if (!Array.isArray(v)) return [];
  const out: ExamHistoryEntry[] = [];
  for (const row of v) {
    if (!row || typeof row !== "object") continue;
    const o = row as Record<string, unknown>;
    if (typeof o.score !== "number" || typeof o.total !== "number" || o.total < 1) continue;
    out.push({
      at: typeof o.at === "string" ? o.at : new Date().toISOString(),
      score: Math.max(0, Math.floor(o.score)),
      total: Math.max(1, Math.floor(o.total)),
    });
  }
  return out.slice(-25);
}

export function parseLearningProfileRow(row: {
  aggregatesBySystem: unknown;
  aggregatesByDifficulty: unknown;
  aggregatesByCategory: unknown;
  recentQuestionIds: unknown;
  examScoreHistory: unknown;
  totalPracticeAttempts: number;
}): ParsedLearningProfile {
  return {
    aggregatesBySystem: asBucketMap(row.aggregatesBySystem),
    aggregatesByDifficulty: asBucketMap(row.aggregatesByDifficulty),
    aggregatesByCategory: asBucketMap(row.aggregatesByCategory),
    recentQuestionIds: asStringArray(row.recentQuestionIds, 100),
    examScoreHistory: asExamHistory(row.examScoreHistory),
    totalPracticeAttempts: Math.max(0, row.totalPracticeAttempts),
  };
}

export function mergeBucket(prev: StatBucket | undefined, correct: boolean, ms: number): StatBucket {
  const p = prev ?? emptyBucket();
  return {
    c: p.c + (correct ? 1 : 0),
    t: p.t + 1,
    sumMs: p.sumMs + (ms > 0 && ms < 600_000 ? ms : 0),
  };
}

export function difficultyKey(d: DifficultyBand | null | undefined): string {
  return d ?? "UNKNOWN";
}
