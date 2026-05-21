import assert from "node:assert/strict";
import test from "node:test";
import { remediationFromWeakAreaText } from "./remediation-map";

test("remediationFromWeakAreaText maps airway language to trach care", () => {
  const r = remediationFromWeakAreaText("Learner struggled with airway adjuncts");
  assert.equal(r?.skillSlug, "trach-care");
  assert.match(r?.missedLabel ?? "", /airway/i);
});

test("remediationFromWeakAreaText maps medication language", () => {
  const r = remediationFromWeakAreaText("Missed dose calculation checks");
  assert.equal(r?.skillSlug, "im-injection");
});

test("remediationFromWeakAreaText returns null for empty", () => {
  assert.equal(remediationFromWeakAreaText(""), null);
  assert.equal(remediationFromWeakAreaText(null), null);
});
