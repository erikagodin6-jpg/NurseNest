import { respiratoryCaUsCoverage20260807V8, respiratoryCaUsCoverageSummary20260807V8 } from "./respiratory-ca-us-coverage-20260807-v8";
import { rnCysticFibrosisCoverageMatrix, rnCysticFibrosisCoverageSummary } from "./respiratory-rn-cystic-fibrosis-coverage";

export const respiratoryCaUsCoverage20260807V9 = [
  ...respiratoryCaUsCoverage20260807V8,
  ...rnCysticFibrosisCoverageMatrix,
];

const keys = new Set<string>();
for (const cell of respiratoryCaUsCoverage20260807V9) {
  const key = `${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if (keys.has(key)) throw new Error(`RESP_CA_US_V9_DUPLICATE_CELL:${key}`);
  keys.add(key);
  if (!cell.fullLessonPresent || !cell.cramLessonPresent) throw new Error(`RESP_CA_US_V9_LESSON_MISSING:${key}`);
  if (cell.qualifyingQuestionCount < 20 || cell.questionDeficit !== 0 || cell.cramDeficit !== 0) {
    throw new Error(`RESP_CA_US_V9_DEFICIT_NONZERO:${key}`);
  }
}

export const respiratoryCaUsCoverageSummary20260807V9 = {
  cells: respiratoryCaUsCoverage20260807V9.length,
  qualifyingQuestions: respiratoryCaUsCoverageSummary20260807V8.qualifyingQuestions + rnCysticFibrosisCoverageSummary.totalQualifyingQuestions,
  questionDeficit: respiratoryCaUsCoverageSummary20260807V8.questionDeficit + rnCysticFibrosisCoverageSummary.totalQuestionDeficit,
  cramDeficit: respiratoryCaUsCoverageSummary20260807V8.cramDeficit + rnCysticFibrosisCoverageSummary.totalCramDeficit,
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
    "Lung Cancer",
    "Pulmonary Fibrosis",
    "Cystic Fibrosis",
  ] as const,
};

if (
  respiratoryCaUsCoverageSummary20260807V9.cells !== 30 ||
  respiratoryCaUsCoverageSummary20260807V9.qualifyingQuestions !== 600 ||
  respiratoryCaUsCoverageSummary20260807V9.questionDeficit !== 0 ||
  respiratoryCaUsCoverageSummary20260807V9.cramDeficit !== 0
) {
  throw new Error(`RESP_CA_US_V9_RATCHET_INVALID:${JSON.stringify(respiratoryCaUsCoverageSummary20260807V9)}`);
}
