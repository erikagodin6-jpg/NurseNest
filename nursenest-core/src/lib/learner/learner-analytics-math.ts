/**
 * Pure transforms for learner analytics (dashboard + report card).
 * No I/O — safe for unit tests and deterministic SSR.
 */

export type AttemptPoint = { score: number; total: number; at: Date };

export type DimensionBucket = { label: string; correct: number; total: number };

export function attemptPercent(score: number, total: number): number | null {
  if (total <= 0) return null;
  return Math.round((score / total) * 1000) / 10;
}

/** Recency-weighted practice score from mock attempts (newer attempts weigh more). */
export function readinessScoreFromAttempts(attempts: AttemptPoint[]): number | null {
  if (attempts.length === 0) return null;
  const ordered = [...attempts].sort((a, b) => a.at.getTime() - b.at.getTime());
  let wSum = 0;
  let w = 0;
  ordered.forEach((a, i) => {
    const p = attemptPercent(a.score, a.total);
    if (p === null) return;
    const wi = 1 + i * 0.35;
    wSum += p * wi;
    w += wi;
  });
  if (w <= 0) return null;
  return Math.round((wSum / w) * 10) / 10;
}

/**
 * Conservative projected pass band from readiness alone — not a diagnostic.
 * Returns null when there is no readiness signal.
 */
export function projectedPassProbabilityPercent(readiness: number | null): number | null {
  if (readiness === null) return null;
  const r = Math.min(100, Math.max(0, readiness));
  const base = 38 + r * 0.52;
  return Math.round(Math.min(90, Math.max(42, base)));
}

export function trendPercentsFromAttempts(attempts: AttemptPoint[], maxPoints = 14): (number | null)[] {
  const ordered = [...attempts].sort((a, b) => a.at.getTime() - b.at.getTime());
  const slice = ordered.slice(-maxPoints);
  return slice.map((a) => attemptPercent(a.score, a.total));
}

function toUtcDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Counts consecutive calendar days (UTC) with at least one activity, anchored from today or yesterday. */
export function studyStreakFromDates(activityDates: Date[]): number {
  const keys = [...new Set(activityDates.map(toUtcDateKey))].sort((a, b) => b.localeCompare(a));
  if (keys.length === 0) return 0;
  const today = toUtcDateKey(new Date());
  const y = new Date();
  y.setUTCDate(y.getUTCDate() - 1);
  const yesterday = toUtcDateKey(y);
  let start = keys[0] === today ? today : keys[0] === yesterday ? yesterday : null;
  if (!start) return 0;
  let streak = 0;
  let cursor = start;
  const set = new Set(keys);
  while (set.has(cursor)) {
    streak += 1;
    const dt = new Date(`${cursor}T12:00:00.000Z`);
    dt.setUTCDate(dt.getUTCDate() - 1);
    cursor = toUtcDateKey(dt);
  }
  return streak;
}

export function mergeDimensionBuckets(rows: DimensionBucket[]): DimensionBucket[] {
  const map = new Map<string, { correct: number; total: number }>();
  for (const r of rows) {
    const k = r.label.trim() || "Unspecified";
    const cur = map.get(k) ?? { correct: 0, total: 0 };
    cur.correct += r.correct;
    cur.total += r.total;
    map.set(k, cur);
  }
  return [...map.entries()]
    .map(([label, v]) => ({ label, correct: v.correct, total: v.total }))
    .filter((x) => x.total > 0)
    .sort((a, b) => b.total - a.total);
}

export function bucketAccuracyPct(bucket: DimensionBucket): number | null {
  return attemptPercent(bucket.correct, bucket.total);
}

export function pickWeakStrong(buckets: DimensionBucket[], topN = 4) {
  const withPct = buckets
    .map((b) => ({ ...b, pct: bucketAccuracyPct(b) }))
    .filter((b) => b.pct !== null) as (DimensionBucket & { pct: number })[];
  const sorted = [...withPct].sort((a, b) => a.pct - b.pct);
  const weak = sorted.slice(0, topN);
  const strong = [...withPct].sort((a, b) => b.pct - a.pct).slice(0, topN);
  return { weak, strong };
}

export function normalizeClientNeedLabel(topic: string | null | undefined, tags: string[]): string {
  const t = (topic ?? "").trim();
  const tagStr = tags.join(" ").toLowerCase();
  const hay = `${t.toLowerCase()} ${tagStr}`;
  const needles: [RegExp, string][] = [
    [/safe\s*care|safety|infection/i, "Safe & effective care"],
    [/health\s*promo|promotion/i, "Health promotion"],
    [/psycho|mental\s*health|therap/i, "Psychosocial integrity"],
    [/physio|patho|pharm|medical/i, "Physiological integrity"],
  ];
  for (const [re, label] of needles) {
    if (re.test(hay)) return label;
  }
  if (t.length > 0) return t.length > 42 ? `${t.slice(0, 39)}…` : t;
  return "Unspecified";
}
