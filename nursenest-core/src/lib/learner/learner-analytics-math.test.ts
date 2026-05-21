import test from "node:test";
import assert from "node:assert/strict";
import {
  attemptPercent,
  mergeDimensionBuckets,
  normalizeClientNeedLabel,
  projectedPassProbabilityPercent,
  readinessScoreFromAttempts,
  studyStreakFromDates,
  trendPercentsFromAttempts,
} from "./learner-analytics-math";

test("attemptPercent handles zero total", () => {
  assert.equal(attemptPercent(3, 0), null);
});

test("readinessScoreFromAttempts weights recent attempts", () => {
  const t0 = new Date("2025-01-01T12:00:00Z");
  const t1 = new Date("2025-01-08T12:00:00Z");
  const r = readinessScoreFromAttempts([
    { score: 5, total: 10, at: t0 },
    { score: 9, total: 10, at: t1 },
  ]);
  assert.ok(r !== null && r > 50 && r < 95);
});

test("projectedPassProbabilityPercent is null without readiness", () => {
  assert.equal(projectedPassProbabilityPercent(null), null);
});

test("trendPercentsFromAttempts preserves chronological order", () => {
  const pts = [
    { score: 1, total: 2, at: new Date("2025-02-01T00:00:00Z") },
    { score: 1, total: 1, at: new Date("2025-02-02T00:00:00Z") },
  ];
  assert.deepEqual(trendPercentsFromAttempts(pts), [50, 100]);
});

test("studyStreakFromDates counts consecutive UTC days", () => {
  const now = new Date();
  const d0 = new Date(now);
  d0.setUTCDate(d0.getUTCDate() - 0);
  const d1 = new Date(now);
  d1.setUTCDate(d1.getUTCDate() - 1);
  const d2 = new Date(now);
  d2.setUTCDate(d2.getUTCDate() - 2);
  const streak = studyStreakFromDates([d0, d0, d1, d2]);
  assert.equal(streak, 3);
});

test("mergeDimensionBuckets aggregates labels", () => {
  const m = mergeDimensionBuckets([
    { label: "A", correct: 1, total: 2 },
    { label: "A", correct: 0, total: 1 },
  ]);
  assert.equal(m.length, 1);
  assert.equal(m[0].correct, 1);
  assert.equal(m[0].total, 3);
});

test("normalizeClientNeedLabel maps common cues", () => {
  assert.equal(normalizeClientNeedLabel("Infection control basics", []), "Safe & effective care");
  assert.equal(normalizeClientNeedLabel(null, ["Health promotion"]), "Health promotion");
});
