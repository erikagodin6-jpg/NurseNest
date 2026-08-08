import { respiratoryCaUsCoverage20260807V15, respiratoryCaUsCoverageSummary20260807V15 } from "./respiratory-ca-us-coverage-20260807-v15";
import { rnPulmonaryHypertensionCoverageMatrix, rnPulmonaryHypertensionCoverageSummary } from "./respiratory-rn-pulmonary-hypertension-coverage";

export const respiratoryCaUsCoverage20260807V16 = [
  ...respiratoryCaUsCoverage20260807V15,
  ...rnPulmonaryHypertensionCoverageMatrix,
];

const keys = new Set<string>();
for (const cell of respiratoryCaUsCoverage20260807V16) {
  const key = `${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if (keys.has(key)) throw new Error(`RESP_CA_US_V16_DUPLICATE_CELL:${key}`);
  keys.add(key);
  if (!cell.fullLessonPresent || !cell.cramLessonPresent) throw new Error(`RESP_CA_US_V16_LESSON_MISSING:${key}`);
  if (cell.qualifyingQuestionCount < 20 || cell.questionDeficit !== 0 || cell.cramDeficit !== 0) {
    throw new Error(`RESP_CA_US_V16_DEFICIT_NONZERO:${key}`);
  }
}

export const respiratoryCaUsCoverageSummary20260807V16 = {
  cells: respiratoryCaUsCoverage20260807V16.length,
  qualifyingQuestions: respiratoryCaUsCoverageSummary20260807V15.qualifyingQuestions + rnPulmonaryHypertensionCoverageSummary.totalQualifyingQuestions,
  questionDeficit: respiratoryCaUsCoverageSummary20260807V15.questionDeficit + rnPulmonaryHypertensionCoverageSummary.totalQuestionDeficit,
  cramDeficit: respiratoryCaUsCoverageSummary20260807V15.cramDeficit + rnPulmonaryHypertensionCoverageSummary.totalCramDeficit,
  topicsClosed: [...respiratoryCaUsCoverageSummary20260807V15.topicsClosed, "Pulmonary Hypertension"] as const,
};

if (
  respiratoryCaUsCoverageSummary20260807V16.cells !== 44 ||
  respiratoryCaUsCoverageSummary20260807V16.qualifyingQuestions !== 880 ||
  respiratoryCaUsCoverageSummary20260807V16.questionDeficit !== 0 ||
  respiratoryCaUsCoverageSummary20260807V16.cramDeficit !== 0
) {
  throw new Error(`RESP_CA_US_V16_RATCHET_INVALID:${JSON.stringify(respiratoryCaUsCoverageSummary20260807V16)}`);
}
