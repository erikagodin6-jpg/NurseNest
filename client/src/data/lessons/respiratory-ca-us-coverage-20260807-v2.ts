import {
  respiratoryCaUsCoverage20260807,
  respiratoryCaUsCoverageSummary20260807
} from "./respiratory-ca-us-coverage-20260807";
import {
  rnPulmonaryEmbolismCoverageMatrix,
  rnPulmonaryEmbolismCoverageSummary
} from "./respiratory-rn-pulmonary-embolism-coverage";

export const respiratoryCaUsCoverage20260807V2 = [
  ...respiratoryCaUsCoverage20260807,
  ...rnPulmonaryEmbolismCoverageMatrix
];

const cellKeys = new Set<string>();
for (const cell of respiratoryCaUsCoverage20260807V2) {
  const key = `${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if (cellKeys.has(key)) throw new Error(`RESP_CA_US_V2_DUPLICATE_COVERAGE_CELL: ${key}`);
  cellKeys.add(key);
  if (!cell.fullLessonPresent || !cell.cramLessonPresent) {
    throw new Error(`RESP_CA_US_V2_LESSON_COVERAGE_INVALID: ${key}`);
  }
  if (
    cell.qualifyingQuestionCount < 20 ||
    cell.questionDeficit !== 0 ||
    cell.cramDeficit !== 0
  ) {
    throw new Error(`RESP_CA_US_V2_DEFICIT_NONZERO: ${key}`);
  }
}

export const respiratoryCaUsCoverageSummary20260807V2 = {
  cells: respiratoryCaUsCoverage20260807V2.length,
  qualifyingQuestions:
    respiratoryCaUsCoverageSummary20260807.qualifyingQuestions +
    rnPulmonaryEmbolismCoverageSummary.totalQualifyingQuestions,
  questionDeficit:
    respiratoryCaUsCoverageSummary20260807.questionDeficit +
    rnPulmonaryEmbolismCoverageSummary.totalQuestionDeficit,
  cramDeficit:
    respiratoryCaUsCoverageSummary20260807.cramDeficit +
    rnPulmonaryEmbolismCoverageSummary.totalCramDeficit,
  topicsClosed: [
    "Asthma",
    "COPD",
    "Community-Acquired Pneumonia",
    "Acute Respiratory Distress Syndrome",
    "Pulmonary Embolism"
  ] as const
};

if (
  respiratoryCaUsCoverageSummary20260807V2.cells !== 16 ||
  respiratoryCaUsCoverageSummary20260807V2.qualifyingQuestions !== 320 ||
  respiratoryCaUsCoverageSummary20260807V2.questionDeficit !== 0 ||
  respiratoryCaUsCoverageSummary20260807V2.cramDeficit !== 0
) {
  throw new Error(
    `RESP_CA_US_V2_COVERAGE_RATCHET_INVALID: ${JSON.stringify(respiratoryCaUsCoverageSummary20260807V2)}`
  );
}
