import { rnEndocrineBankBatch1Questions } from "../../client/src/data/exam-questions/rn-endocrine-bank-batch1";
import { rnEndocrineBankBatch2Questions } from "../../client/src/data/exam-questions/rn-endocrine-bank-batch2";
import { rnEndocrineBankBatch3Questions } from "../../client/src/data/exam-questions/rn-endocrine-bank-batch3";
import { rnEndocrineRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-endocrine-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [
  ...rnEndocrineBankBatch1Questions,
  ...rnEndocrineBankBatch2Questions,
  ...rnEndocrineBankBatch3Questions,
];
const all: ExamQuestion[] = [...shared, ...rnEndocrineRegionalBankBatch1Questions];

function fail(message: string): never { throw new Error(message); }
function correctIndexes(q: ExamQuestion): number[] { return q.t === "sata" && q.ca ? q.ca : [q.a]; }

if (shared.length !== 150) fail(`RN_ENDOCRINE_SHARED_COUNT:${shared.length}`);
if (rnEndocrineRegionalBankBatch1Questions.length !== 20) fail(`RN_ENDOCRINE_REGIONAL_COUNT:${rnEndocrineRegionalBankBatch1Questions.length}`);
if (all.length !== 170) fail(`RN_ENDOCRINE_TOTAL_COUNT:${all.length}`);

const can = rnEndocrineRegionalBankBatch1Questions.filter(q => q.regionScope === "CAN");
const us = rnEndocrineRegionalBankBatch1Questions.filter(q => q.regionScope === "US");
if (can.length !== 10) fail(`RN_ENDOCRINE_CAN_COUNT:${can.length}`);
if (us.length !== 10) fail(`RN_ENDOCRINE_US_COUNT:${us.length}`);

const seen = new Set<string>();
for (const [index, q] of all.entries()) {
  const stem = q.q.trim().toLowerCase();
  if (!stem || q.q.trim().length < 25) fail(`RN_ENDOCRINE_THIN_STEM:${index}`);
  if (seen.has(stem)) fail(`RN_ENDOCRINE_DUPLICATE_STEM:${q.q}`);
  seen.add(stem);
  if (!Array.isArray(q.o) || q.o.length < 4) fail(`RN_ENDOCRINE_OPTIONS_INVALID:${index}`);
  const correct = correctIndexes(q);
  if (!correct.length || correct.some(i => !Number.isInteger(i) || i < 0 || i >= q.o.length)) fail(`RN_ENDOCRINE_ANSWER_INVALID:${index}`);
  if (new Set(correct).size !== correct.length) fail(`RN_ENDOCRINE_ANSWER_DUPLICATE:${index}`);
  if (!q.r || q.r.trim().length < 40) fail(`RN_ENDOCRINE_RATIONALE_THIN:${index}`);
  const incorrectCount = q.o.length - correct.length;
  if (!Array.isArray(q.dr) || q.dr.length !== incorrectCount) fail(`RN_ENDOCRINE_DISTRACTOR_RATIONALES_INVALID:${index}:${q.dr?.length ?? 0}/${incorrectCount}`);
  if (q.dr.some(r => r.trim().length < 20)) fail(`RN_ENDOCRINE_DISTRACTOR_RATIONALE_THIN:${index}`);
  if (q.t === "sata" && (!q.ca || q.ca.length < 2)) fail(`RN_ENDOCRINE_SATA_CONTRACT_INVALID:${index}`);
}

for (const q of rnEndocrineRegionalBankBatch1Questions) {
  if (q.regionScope === "CAN" && q.countryCode !== "CA") fail(`RN_ENDOCRINE_CAN_COUNTRY_MISMATCH:${q.q}`);
  if (q.regionScope === "US" && q.countryCode !== "US") fail(`RN_ENDOCRINE_US_COUNTRY_MISMATCH:${q.q}`);
  if (!q.topic || !q.cognitiveLevel || !q.difficulty) fail(`RN_ENDOCRINE_REGIONAL_METADATA_MISSING:${q.q}`);
}

console.log({
  status: "PASS",
  shared: shared.length,
  regional: rnEndocrineRegionalBankBatch1Questions.length,
  total: all.length,
  canada: can.length,
  unitedStates: us.length,
  distractorRationales: all.filter(q => Array.isArray(q.dr)).length,
});
