import assert from "node:assert/strict";
import test from "node:test";
import { examTargetToPathwayTag, skillsForPathwayTag } from "./catalog";

test("examTargetToPathwayTag maps known targets", () => {
  assert.equal(examTargetToPathwayTag("NCLEX_RN"), "RN_US");
  assert.equal(examTargetToPathwayTag("REX_PN"), "RPN_CA");
  assert.equal(examTargetToPathwayTag("NP"), "NP");
});

test("skillsForPathwayTag excludes skills outside pathway", () => {
  const rpn = skillsForPathwayTag("RPN_CA", false);
  assert.ok(!rpn.some((s) => s.slug === "trach-care"));
  assert.ok(rpn.some((s) => s.slug === "im-injection"));
});

test("skillsForPathwayTag sorts npAdvanced first for NP audience", () => {
  const np = skillsForPathwayTag("NP", true);
  assert.ok(np.length >= 2);
  const firstAdvancedIndex = np.findIndex((s) => s.npAdvanced);
  const firstNonAdvancedIndex = np.findIndex((s) => !s.npAdvanced);
  if (firstAdvancedIndex !== -1 && firstNonAdvancedIndex !== -1) {
    assert.ok(firstAdvancedIndex < firstNonAdvancedIndex);
  }
});
