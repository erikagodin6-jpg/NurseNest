import {
  respiratoryCoreCaUsCoverageMatrix,
  respiratoryCoreCaUsCoverageSummary
} from "./respiratory-core-ca-us-coverage";
import {
  rnArdsCoverageMatrix,
  rnArdsCoverageSummary
} from "./respiratory-rn-ards-coverage";

export const respiratoryCaUsCoverage20260807 = [
  ...respiratoryCoreCaUsCoverageMatrix,
  ...rnArdsCoverageMatrix
];

const cellKeys = new Set<string>();
for (const cell of respiratoryCaUsCoverage20260807) {
  const key = `${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if (cellKeys.has(key)) throw new Error(`RESP_CA_US_DUPLICATE_COVERAGE_CELL: ${key}`);
  cellKeys.add(key);
  if (!cell.fullLessonPresent || !cell.cramLessonPresent) {
    throw new Error(`RESP_CA_US_LESSON_COVERAGE_INVALID: ${key}`);
  }
  if (cell.qualifyingQuestionCount < 20 || cell.questionDeficit !== 0 || cell.cramDeficit !== 0) {
    throw new Error(`RESP_CA_US_DEFICIT_NONZERO: ${key}`);
  }
}

export const respiratoryCaUsCoverageSummary20260807 = {
  cells: respiratoryCaUsCoverage20260807.length,
  qualifyingQuestions:
    respiratoryCoreCaUsCoverageSummary.totalQualifyingQuestions +
    rnArdsCoverageSummary.totalQualifyingQuestions,
  questionDeficit:
    respiratoryCoreCaUsCoverageSummary.totalQuestionDeficit +
    rnArdsCoverageSummary.totalQuestionDeficit,
  cramDeficit:
    respiratoryCoreCaUsCoverageSummary.totalCramDeficit +
    rnArdsCoverageSummary.totalCramDeficit,
  topicsClosed: ["Asthma", "COPD", "Community-Acquired Pneumonia", "Acute Respiratory Distress Syndrome"] as const
};

if (
  respiratoryCaUsCoverageSummary20260807.cells !== 14 ||
  respiratoryCaUsCoverageSummary20260807.qualifyingQuestions !== 280 ||
  respiratoryCaUsCoverageSummary20260807.questionDeficit !== 0 ||
  respiratoryCaUsCoverageSummary20260807.cramDeficit !== 0
) {
  throw new Error(
    `RESP_CA_US_COVERAGE_RATCHET_INVALID: ${JSON.stringify(respiratoryCaUsCoverageSummary20260807)}`
  );
}
