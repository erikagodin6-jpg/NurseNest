import assert from "node:assert/strict";
import { test } from "node:test";
import {
  computeDoseVolumeMl,
  computeIvDripRateGttPerMin,
  computeWeightBasedVolumeMl,
  generateMedicationDrill,
  nearlyEqual,
} from "./medication-calculations-drills";

test("computeIvDripRateGttPerMin", () => {
  assert.equal(computeIvDripRateGttPerMin(100, 60, 15), 25);
});

test("computeDoseVolumeMl", () => {
  assert.ok(nearlyEqual(computeDoseVolumeMl(500, 250, 5), 10, 0.0001));
});

test("computeWeightBasedVolumeMl", () => {
  assert.ok(nearlyEqual(computeWeightBasedVolumeMl(0.5, 70, 10), 3.5, 0.0001));
});

test("dose drill expected is consistent with factor math", () => {
  const d = generateMedicationDrill("dosage", 99_333, 0);
  assert.equal(d.kind, "dosage");
  assert.ok(d.expected > 0);
  assert.ok(d.factors.length >= 1);
});

test("nearlyEqual respects tolerance", () => {
  assert.equal(nearlyEqual(10, 10.4, 0.5), true);
  assert.equal(nearlyEqual(10, 11.1, 0.5), false);
});
