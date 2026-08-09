import { rnGastrointestinalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-bank-batch1";
import { rnGastrointestinalBankBatch2Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-bank-batch2";
import { rnGastrointestinalBankBatch3Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-bank-batch3";
import { rnGastrointestinalRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-gastrointestinal-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [
  ...rnGastrointestinalBankBatch1Questions,
  ...rnGastrointestinalBankBatch2Questions,
  ...rnGastrointestinalBankBatch3Questions,
];
const all: ExamQuestion[] = [...shared, ...rnGastrointestinalRegionalBankBatch1Questions];

function fail(message: string): never { throw new Error(message); }
function correctIndexes(q: ExamQuestion): number[] { return q.t === "sata" && q.ca ? q.ca : [q.a]; }

if (rnGastrointestinalBankBatch1Questions.length !== 47) fail(`RN_GI_BATCH1_COUNT:${rnGastrointestinalBankBatch1Questions.length}`);
if (rnGastrointestinalBankBatch2Questions.length !== 50) fail(`RN_GI_BATCH2_COUNT:${rnGastrointestinalBankBatch2Questions.length}`);
if (rnGastrointestinalBankBatch3Questions.length !== 53) fail(`RN_GI_BATCH3_COUNT:${rnGastrointestinalBankBatch3Questions.length}`);
if (shared.length !== 150) fail(`RN_GI_SHARED_COUNT:${shared.length}`);
if (rnGastrointestinalRegionalBankBatch1Questions.length !== 20) fail(`RN_GI_REGIONAL_COUNT:${rnGastrointestinalRegionalBankBatch1Questions.length}`);
if (all.length !== 170) fail(`RN_GI_TOTAL_COUNT:${all.length}`);

const can = rnGastrointestinalRegionalBankBatch1Questions.filter(q => q.regionScope === "CAN");
const us = rnGastrointestinalRegionalBankBatch1Questions.filter(q => q.regionScope === "US");
if (can.length !== 10) fail(`RN_GI_CAN_COUNT:${can.length}`);
if (us.length !== 10) fail(`RN_GI_US_COUNT:${us.length}`);

const seen = new Set<string>();
for (const [index, q] of all.entries()) {
  const stem = q.q.trim().toLowerCase();
  if (!stem || q.q.trim().length < 25) fail(`RN_GI_THIN_STEM:${index}`);
  if (seen.has(stem)) fail(`RN_GI_DUPLICATE_STEM:${q.q}`);
  seen.add(stem);
  if (!Array.isArray(q.o) || q.o.length < 4) fail(`RN_GI_OPTIONS_INVALID:${index}`);
  const correct = correctIndexes(q);
  if (!correct.length || correct.some(i => !Number.isInteger(i) || i < 0 || i >= q.o.length)) fail(`RN_GI_ANSWER_INVALID:${index}`);
  if (new Set(correct).size !== correct.length) fail(`RN_GI_ANSWER_DUPLICATE:${index}`);
  if (!q.r || q.r.trim().length < 40) fail(`RN_GI_RATIONALE_THIN:${index}`);
  const incorrectCount = q.o.length - correct.length;
  if (!Array.isArray(q.dr) || q.dr.length !== incorrectCount) fail(`RN_GI_DISTRACTOR_RATIONALES_INVALID:${index}:${q.dr?.length ?? 0}/${incorrectCount}`);
  if (q.dr.some(r => r.trim().length < 20)) fail(`RN_GI_DISTRACTOR_RATIONALE_THIN:${index}`);
  if (q.t === "sata" && (!q.ca || q.ca.length < 2)) fail(`RN_GI_SATA_CONTRACT_INVALID:${index}`);
}

for (const q of rnGastrointestinalRegionalBankBatch1Questions) {
  if (q.regionScope === "CAN" && q.countryCode !== "CA") fail(`RN_GI_CAN_COUNTRY_MISMATCH:${q.q}`);
  if (q.regionScope === "US" && q.countryCode !== "US") fail(`RN_GI_US_COUNTRY_MISMATCH:${q.q}`);
  if (!q.topic || !q.cognitiveLevel || !q.difficulty) fail(`RN_GI_REGIONAL_METADATA_MISSING:${q.q}`);
}

console.log({
  status: "PASS",
  batch1: rnGastrointestinalBankBatch1Questions.length,
  batch2: rnGastrointestinalBankBatch2Questions.length,
  batch3: rnGastrointestinalBankBatch3Questions.length,
  shared: shared.length,
  regional: rnGastrointestinalRegionalBankBatch1Questions.length,
  total: all.length,
  canada: can.length,
  unitedStates: us.length,
  distractorRationales: all.filter(q => Array.isArray(q.dr)).length,
});
