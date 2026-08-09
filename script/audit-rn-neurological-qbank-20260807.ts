import { rnNeurologicalBankBatch1Questions } from "../client/src/data/exam-questions/rn-neurological-bank-batch1";
import { rnNeurologicalBankBatch2Questions } from "../client/src/data/exam-questions/rn-neurological-bank-batch2";
import { rnNeurologicalBankBatch3Questions } from "../client/src/data/exam-questions/rn-neurological-bank-batch3";
import { rnNeurologicalRegionalBankBatch1Questions } from "../client/src/data/exam-questions/rn-neurological-regional-bank-batch1";
import type { ExamQuestion } from "../client/src/data/exam-questions/types";

const all: ExamQuestion[] = [
  ...rnNeurologicalBankBatch1Questions,
  ...rnNeurologicalBankBatch2Questions,
  ...rnNeurologicalBankBatch3Questions,
  ...rnNeurologicalRegionalBankBatch1Questions,
];

const failures: string[] = [];
const stems = new Map<string, number>();

for (let i = 0; i < all.length; i++) {
  const q = all[i];
  const label = `Q${i + 1}`;
  const stem = q.q?.trim() ?? "";
  if (stem.length < 20) failures.push(`${label}: missing/weak stem`);
  if (!Array.isArray(q.o) || q.o.length < 4) failures.push(`${label}: fewer than 4 options`);
  if (!q.r || q.r.trim().length < 35) failures.push(`${label}: weak correct-answer rationale`);
  if (!Array.isArray(q.dr) || q.dr.length === 0) failures.push(`${label}: missing distractor rationales`);

  if (q.t === "sata") {
    if (!Array.isArray(q.ca) || q.ca.length < 2) failures.push(`${label}: SATA missing multi-answer contract`);
    const wrongCount = q.o.length - (q.ca?.length ?? 0);
    if ((q.dr?.length ?? 0) < wrongCount) failures.push(`${label}: SATA distractor-rationale count ${q.dr?.length ?? 0}/${wrongCount}`);
  } else {
    if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) failures.push(`${label}: invalid correct-answer index`);
    if ((q.dr?.length ?? 0) !== q.o.length - 1) failures.push(`${label}: MCQ distractor-rationale count ${q.dr?.length ?? 0}/${q.o.length - 1}`);
  }

  const key = stem.toLowerCase().replace(/\s+/g, " ");
  const first = stems.get(key);
  if (first !== undefined) failures.push(`${label}: duplicate stem of Q${first + 1}`);
  else stems.set(key, i);

  if (/all of the above|none of the above/i.test(q.o.join(" "))) failures.push(`${label}: weak all/none-of-the-above option`);
}

const regional = rnNeurologicalRegionalBankBatch1Questions;
const canada = regional.filter((q) => q.regionScope === "CAN");
const us = regional.filter((q) => q.regionScope === "US");
if (all.length !== 170) failures.push(`total: expected 170, found ${all.length}`);
if (canada.length !== 10) failures.push(`regional: expected 10 CAN, found ${canada.length}`);
if (us.length !== 10) failures.push(`regional: expected 10 US, found ${us.length}`);

for (const q of regional) {
  if (q.regionScope === "CAN" && q.countryCode !== "CA") failures.push(`regional: CAN row has countryCode=${q.countryCode}`);
  if (q.regionScope === "US" && q.countryCode !== "US") failures.push(`regional: US row has countryCode=${q.countryCode}`);
  if (!q.sourceFamily) failures.push(`regional: missing sourceFamily for ${q.q.slice(0, 60)}`);
}

if (failures.length > 0) {
  console.error("RN neurological qbank audit FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("RN neurological qbank audit PASSED");
console.log({
  total: all.length,
  shared: all.length - regional.length,
  regional: regional.length,
  canada: canada.length,
  us: us.length,
  sata: all.filter((q) => q.t === "sata").length,
  mcq: all.filter((q) => q.t !== "sata").length,
  withDistractorRationales: all.filter((q) => Array.isArray(q.dr) && q.dr.length > 0).length,
});
