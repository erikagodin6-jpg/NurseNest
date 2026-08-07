import {
  respiratoryCaUsCoverage20260807V6,
  respiratoryCaUsCoverageSummary20260807V6
} from "./respiratory-ca-us-coverage-20260807-v6";
import {
  rnLungCancerCoverageMatrix,
  rnLungCancerCoverageSummary
} from "./respiratory-rn-lung-cancer-coverage";

export const respiratoryCaUsCoverage20260807V7 = [
  ...respiratoryCaUsCoverage20260807V6,
  ...rnLungCancerCoverageMatrix
];

const keys = new Set<string>();
for (const cell of respiratoryCaUsCoverage20260807V7) {
  const key = `${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if (keys.has(key)) throw new Error(`RESP_CA_US_V7_DUPLICATE_CELL:${key}`);
  keys.add(key);
  if (!cell.fullLessonPresent || !cell.cramLessonPresent) {
    throw new Error(`RESP_CA_US_V7_LESSON_MISSING:${key}`);
  }
  if (
    cell.qualifyingQuestionCount < 20 ||
    cell.questionDeficit !== 0 ||
    cell.cramDeficit !== 0
  ) {
    throw new Error(`RESP_CA_US_V7_DEFICIT_NONZERO:${key}`);
  }
}

export const respiratoryCaUsCoverageSummary20260807V7 = {
  cells: respiratoryCaUsCoverage20260807V7.length,
  qualifyingQuestions:
    respiratoryCaUsCoverageSummary20260807V6.qualifyingQuestions +
    rnLungCancerCoverageSummary.totalQualifyingQuestions,
  questionDeficit:
    respiratoryCaUsCoverageSummary20260807V6.questionDeficit +
    rnLungCancerCoverageSummary.totalQuestionDeficit,
  cramDeficit:
    respiratoryCaUsCoverageSummary20260807V6.cramDeficit +
    rnLungCancerCoverageSummary.totalCramDeficit,
  topicsClosed: [
    "Asthma",
    "COPD",
    "Community-Acquired Pneumonia",
    "Acute Respiratory Distress Syndrome",
    "Pulmonary Embolism",
    "Pneumothorax",
    "Pleural Effusion",
    "Acute Respiratory Failure",
    "Tuberculosis",
    "Lung Cancer"
  ] as const
};

if (
  respiratoryCaUsCoverageSummary20260807V7.cells !== 26 ||
  respiratoryCaUsCoverageSummary20260807V7.qualifyingQuestions !== 520 ||
  respiratoryCaUsCoverageSummary20260807V7.questionDeficit !== 0 ||
  respiratoryCaUsCoverageSummary20260807V7.cramDeficit !== 0
) {
  throw new Error(
    `RESP_CA_US_V7_RATCHET_INVALID:${JSON.stringify(respiratoryCaUsCoverageSummary20260807V7)}`
  );
}
