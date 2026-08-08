import { respiratoryCaUsCoverage20260807V19, respiratoryCaUsCoverageSummary20260807V19 } from "./respiratory-ca-us-coverage-20260807-v19";
import { practicalNursingPneumothoraxCoverageMatrix, practicalNursingPneumothoraxCoverageSummary } from "./respiratory-practical-nursing-pneumothorax-coverage";

export const respiratoryCaUsCoverage20260807V20 = [
  ...respiratoryCaUsCoverage20260807V19,
  ...practicalNursingPneumothoraxCoverageMatrix,
];
const keys = new Set<string>();
for (const cell of respiratoryCaUsCoverage20260807V20) {
  const key = `${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if (keys.has(key)) throw new Error(`RESP_CA_US_V20_DUPLICATE_CELL:${key}`);
  keys.add(key);
  if (!cell.fullLessonPresent || !cell.cramLessonPresent) throw new Error(`RESP_CA_US_V20_LESSON_MISSING:${key}`);
  if (cell.qualifyingQuestionCount < 20 || cell.questionDeficit !== 0 || cell.cramDeficit !== 0) throw new Error(`RESP_CA_US_V20_DEFICIT_NONZERO:${key}`);
}
export const respiratoryCaUsCoverageSummary20260807V20 = {
  cells: respiratoryCaUsCoverage20260807V20.length,
  qualifyingQuestions: respiratoryCaUsCoverageSummary20260807V19.qualifyingQuestions + practicalNursingPneumothoraxCoverageSummary.totalQualifyingQuestions,
  questionDeficit: respiratoryCaUsCoverageSummary20260807V19.questionDeficit,
  cramDeficit: respiratoryCaUsCoverageSummary20260807V19.cramDeficit,
  topicsClosed: [...respiratoryCaUsCoverageSummary20260807V19.topicsClosed, "Practical Nursing Pneumothorax"] as const,
};
if (
  respiratoryCaUsCoverageSummary20260807V20.cells !== 52 ||
  respiratoryCaUsCoverageSummary20260807V20.qualifyingQuestions !== 1040 ||
  respiratoryCaUsCoverageSummary20260807V20.questionDeficit !== 0 ||
  respiratoryCaUsCoverageSummary20260807V20.cramDeficit !== 0
) throw new Error(`RESP_CA_US_V20_RATCHET_INVALID:${JSON.stringify(respiratoryCaUsCoverageSummary20260807V20)}`);
