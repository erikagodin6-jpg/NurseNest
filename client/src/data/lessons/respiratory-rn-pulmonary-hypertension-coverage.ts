import { getRnPulmonaryHypertensionCram } from "./respiratory-rn-pulmonary-hypertension-cram";
import { respiratoryRnPulmonaryHypertensionFullLessons } from "./respiratory-rn-pulmonary-hypertension-full";
import { rnCaPulmonaryHypertensionPublishedBank } from "../exam-questions/rn-ca-pulmonary-hypertension-published";
import { rnUsPulmonaryHypertensionPublishedBank } from "../exam-questions/rn-us-pulmonary-hypertension-published";

type Q = (typeof rnCaPulmonaryHypertensionPublishedBank)[number] | (typeof rnUsPulmonaryHypertensionPublishedBank)[number];
const cells: Array<{ countryCode: "CA" | "US"; regionScope: "CAN" | "US"; fullLessonKey: string; questions: readonly Q[] }> = [
  { countryCode: "CA", regionScope: "CAN", fullLessonKey: "pulmonary-hypertension-rn-ca-2026", questions: rnCaPulmonaryHypertensionPublishedBank },
  { countryCode: "US", regionScope: "US", fullLessonKey: "pulmonary-hypertension-rn-us-2026", questions: rnUsPulmonaryHypertensionPublishedBank },
];
function normalize(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " "); }
const globalIds = new Set<string>();
const crossCountryFingerprints = new Map<string, string>();

export const rnPulmonaryHypertensionCoverageMatrix = cells.map((cell) => {
  const label = `${cell.countryCode}:NCLEX-RN:Pulmonary Hypertension`;
  if (!respiratoryRnPulmonaryHypertensionFullLessons[cell.fullLessonKey]) throw new Error(`RN_PH_FULL_MISSING:${label}`);
  const cram = getRnPulmonaryHypertensionCram(cell.countryCode);
  if (!cram || cram.fullLessonKey !== cell.fullLessonKey || cram.regionScope !== cell.regionScope || cram.topic !== "Pulmonary Hypertension") {
    throw new Error(`RN_PH_CRAM_SCOPE_INVALID:${label}`);
  }
  if (cell.questions.length !== 20) throw new Error(`RN_PH_COUNT_INVALID:${label}/${cell.questions.length}`);
  const stems = new Set<string>();
  const distribution = [0, 0, 0, 0];
  for (const question of cell.questions) {
    if (globalIds.has(question.id)) throw new Error(`RN_PH_DUPLICATE_ID:${question.id}`);
    globalIds.add(question.id);
    const stem = normalize(question.stem);
    if (stems.has(stem)) throw new Error(`RN_PH_DUPLICATE_STEM:${label}/${question.id}`);
    stems.add(stem);
    const fingerprint = `${stem}::${question.options.map(normalize).join("||")}`;
    const prior = crossCountryFingerprints.get(fingerprint);
    if (prior) throw new Error(`RN_PH_UNCHANGED_CROSS_COUNTRY_COPY:${question.id}/${prior}`);
    crossCountryFingerprints.set(fingerprint, question.id);
    if (
      question.tier !== "rn" || question.exam !== "NCLEX-RN" || question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope || question.bodySystem !== "Respiratory" || question.topic !== "Pulmonary Hypertension" ||
      question.questionType !== "multiple_choice"
    ) throw new Error(`RN_PH_SCOPE_INVALID:${label}/${question.id}`);
    if (
      question.options.length !== 4 || question.optionRationales.length !== 4 || question.correctAnswer < 0 || question.correctAnswer > 3 ||
      !question.correctAnswerExplanation.trim() || question.optionRationales.some((rationale) => !rationale.trim())
    ) throw new Error(`RN_PH_ANSWER_CONTRACT_INVALID:${label}/${question.id}`);
    if (
      question.difficulty < 1 || question.difficulty > 4 || !question.cognitiveLevel.trim() || !question.clinicalReasoning.trim() ||
      !question.clinicalPearl.trim() || !question.keyTakeaway.trim() || question.references.length < 2
    ) throw new Error(`RN_PH_METADATA_INVALID:${label}/${question.id}`);
    if (new Set(question.options.map(normalize)).size !== 4) throw new Error(`RN_PH_DUPLICATE_OPTIONS:${label}/${question.id}`);
    distribution[question.correctAnswer] += 1;
  }
  if (distribution.join(",") !== "5,5,5,5") throw new Error(`RN_PH_BALANCE_INVALID:${label}/${distribution.join(",")}`);
  return {
    tier: "rn" as const,
    countryCode: cell.countryCode,
    exam: "NCLEX-RN" as const,
    bodySystem: "Respiratory" as const,
    topic: "Pulmonary Hypertension" as const,
    fullLessonKey: cell.fullLessonKey,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts: distribution,
  };
});

export const rnPulmonaryHypertensionCoverageSummary = {
  cells: rnPulmonaryHypertensionCoverageMatrix.length,
  totalQualifyingQuestions: rnPulmonaryHypertensionCoverageMatrix.reduce((total, cell) => total + cell.qualifyingQuestionCount, 0),
  totalQuestionDeficit: rnPulmonaryHypertensionCoverageMatrix.reduce((total, cell) => total + cell.questionDeficit, 0),
  totalCramDeficit: rnPulmonaryHypertensionCoverageMatrix.reduce((total, cell) => total + cell.cramDeficit, 0),
};
if (
  rnPulmonaryHypertensionCoverageSummary.cells !== 2 || rnPulmonaryHypertensionCoverageSummary.totalQualifyingQuestions !== 40 ||
  rnPulmonaryHypertensionCoverageSummary.totalQuestionDeficit !== 0 || rnPulmonaryHypertensionCoverageSummary.totalCramDeficit !== 0
) throw new Error(`RN_PH_COVERAGE_SUMMARY_INVALID:${JSON.stringify(rnPulmonaryHypertensionCoverageSummary)}`);
