import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultExamTargetForTier,
  examFocusSuggestsCardiacEcg,
  learnerTierAllowsEcgPrimarySurface,
} from "./ecg-learner-visibility";

test("learnerTierAllowsEcgPrimarySurface — RN and NP only", () => {
  assert.equal(learnerTierAllowsEcgPrimarySurface("RN"), true);
  assert.equal(learnerTierAllowsEcgPrimarySurface("NP"), true);
  assert.equal(learnerTierAllowsEcgPrimarySurface("RPN"), false);
  assert.equal(learnerTierAllowsEcgPrimarySurface("LVN_LPN"), false);
  assert.equal(learnerTierAllowsEcgPrimarySurface("ALLIED"), false);
  assert.equal(learnerTierAllowsEcgPrimarySurface(null), false);
});

test("defaultExamTargetForTier", () => {
  assert.equal(defaultExamTargetForTier("NP"), "NP");
  assert.equal(defaultExamTargetForTier("RN"), "NCLEX_RN");
  assert.equal(defaultExamTargetForTier("RPN"), "REX_PN");
});

test("examFocusSuggestsCardiacEcg", () => {
  assert.equal(examFocusSuggestsCardiacEcg("nclex_rn"), true);
  assert.equal(examFocusSuggestsCardiacEcg("cardiac care"), true);
  assert.equal(examFocusSuggestsCardiacEcg("community health"), false);
});
