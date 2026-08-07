import { rnInfectiousDiseaseBankBatch1Questions } from "../../client/src/data/exam-questions/rn-infectious-disease-bank-batch1";
import { rnInfectiousDiseaseBankBatch2Questions } from "../../client/src/data/exam-questions/rn-infectious-disease-bank-batch2";
import { rnInfectiousDiseaseBankBatch3Questions } from "../../client/src/data/exam-questions/rn-infectious-disease-bank-batch3";
import { rnInfectiousDiseaseRegionalBankBatch1Questions } from "../../client/src/data/exam-questions/rn-infectious-disease-regional-bank-batch1";
import type { ExamQuestion } from "../../client/src/data/exam-questions/types";

const shared: ExamQuestion[] = [
  ...rnInfectiousDiseaseBankBatch1Questions,
  ...rnInfectiousDiseaseBankBatch2Questions,
  ...rnInfectiousDiseaseBankBatch3Questions,
];
const all: ExamQuestion[] = [...shared, ...rnInfectiousDiseaseRegionalBankBatch1Questions];
function fail(message: string): never { throw new Error(message); }
function correct(q: ExamQuestion): number[] { return q.t === "sata" && q.ca ? q.ca : [q.a]; }

if (rnInfectiousDiseaseBankBatch1Questions.length !== 50) fail(`RN_ID_BATCH1:${rnInfectiousDiseaseBankBatch1Questions.length}`);
if (rnInfectiousDiseaseBankBatch2Questions.length !== 50) fail(`RN_ID_BATCH2:${rnInfectiousDiseaseBankBatch2Questions.length}`);
if (rnInfectiousDiseaseBankBatch3Questions.length !== 50) fail(`RN_ID_BATCH3:${rnInfectiousDiseaseBankBatch3Questions.length}`);
if (shared.length !== 150) fail(`RN_ID_SHARED:${shared.length}`);
if (all.length !== 170) fail(`RN_ID_TOTAL:${all.length}`);

const can = rnInfectiousDiseaseRegionalBankBatch1Questions.filter(q => q.regionScope === "CAN");
const us = rnInfectiousDiseaseRegionalBankBatch1Questions.filter(q => q.regionScope === "US");
if (can.length !== 10) fail(`RN_ID_CAN:${can.length}`);
if (us.length !== 10) fail(`RN_ID_US:${us.length}`);

const seen = new Set<string>();
for (const [index, q] of all.entries()) {
  const stem = q.q.trim().toLowerCase();
  if (q.q.trim().length < 25) fail(`RN_ID_THIN_STEM:${index}`);
  if (seen.has(stem)) fail(`RN_ID_DUPLICATE:${q.q}`);
  seen.add(stem);
  if (!Array.isArray(q.o) || q.o.length < 4) fail(`RN_ID_OPTIONS:${index}`);
  const c = correct(q);
  if (!c.length || c.some(x => !Number.isInteger(x) || x < 0 || x >= q.o.length)) fail(`RN_ID_ANSWER:${index}`);
  if (new Set(c).size !== c.length) fail(`RN_ID_ANSWER_DUP:${index}`);
  if (!q.r || q.r.trim().length < 40) fail(`RN_ID_RATIONALE:${index}`);
  const wrong = q.o.length - c.length;
  if (!Array.isArray(q.dr) || q.dr.length !== wrong) fail(`RN_ID_DISTRACTOR:${index}:${q.dr?.length ?? 0}/${wrong}`);
  if (q.dr.some(x => x.trim().length < 20)) fail(`RN_ID_DISTRACTOR_THIN:${index}`);
  if (q.t === "sata" && (!q.ca || q.ca.length < 2)) fail(`RN_ID_SATA:${index}`);
}

for (const q of rnInfectiousDiseaseRegionalBankBatch1Questions) {
  if (q.regionScope === "CAN" && q.countryCode !== "CA") fail(`RN_ID_CAN_COUNTRY:${q.q}`);
  if (q.regionScope === "US" && q.countryCode !== "US") fail(`RN_ID_US_COUNTRY:${q.q}`);
  if (!q.topic || !q.cognitiveLevel || !q.difficulty) fail(`RN_ID_REGIONAL_METADATA:${q.q}`);
}

console.log({
  status: "PASS",
  shared: shared.length,
  regional: 20,
  total: all.length,
  canada: can.length,
  unitedStates: us.length,
  distractorRationales: all.filter(q => Array.isArray(q.dr)).length,
});
