import { getRnCysticFibrosisCram, rnCysticFibrosisResolvedFullLessonKey } from "./respiratory-rn-cystic-fibrosis-cram";
import { rnCaCysticFibrosisAuthoritativeBank } from "../exam-questions/rn-ca-cystic-fibrosis-authoritative";
import { rnUsCysticFibrosisAuthoritativeBank } from "../exam-questions/rn-us-cystic-fibrosis-authoritative";

type Q = (typeof rnCaCysticFibrosisAuthoritativeBank)[number] | (typeof rnUsCysticFibrosisAuthoritativeBank)[number];
const cells: Array<{ countryCode: "CA" | "US"; regionScope: "CAN" | "US"; questions: readonly Q[] }> = [
  { countryCode: "CA", regionScope: "CAN", questions: rnCaCysticFibrosisAuthoritativeBank },
  { countryCode: "US", regionScope: "US", questions: rnUsCysticFibrosisAuthoritativeBank },
];
function n(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
const ids = new Set<string>();
const fingerprints = new Map<string, string>();

export const rnCysticFibrosisCoverageMatrix = cells.map((cell) => {
  const label = `${cell.countryCode}:NCLEX-RN:Cystic Fibrosis`;
  const cram = getRnCysticFibrosisCram(cell.countryCode);
  if (!cram || cram.fullLessonKey !== rnCysticFibrosisResolvedFullLessonKey || cram.regionScope !== cell.regionScope || cram.topic !== "Cystic Fibrosis") {
    throw new Error(`RN_CF_CRAM_SCOPE_INVALID:${label}`);
  }
  if (cell.questions.length !== 20) throw new Error(`RN_CF_COUNT_INVALID:${label}/${cell.questions.length}`);
  const stems = new Set<string>();
  const distribution = [0, 0, 0, 0];
  for (const question of cell.questions) {
    if (ids.has(question.id)) throw new Error(`RN_CF_DUPLICATE_ID:${question.id}`);
    ids.add(question.id);
    const stem = n(question.stem);
    if (stems.has(stem)) throw new Error(`RN_CF_DUPLICATE_STEM:${label}/${question.id}`);
    stems.add(stem);
    const fingerprint = `${stem}::${question.options.map(n).join("||")}`;
    const prior = fingerprints.get(fingerprint);
    if (prior) throw new Error(`RN_CF_UNCHANGED_CROSS_COUNTRY_COPY:${question.id}/${prior}`);
    fingerprints.set(fingerprint, question.id);
    if (
      question.tier !== "rn" || question.exam !== "NCLEX-RN" || question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope || question.bodySystem !== "Respiratory" || question.topic !== "Cystic Fibrosis" ||
      question.questionType !== "multiple_choice"
    ) throw new Error(`RN_CF_SCOPE_INVALID:${label}/${question.id}`);
    if (
      question.options.length !== 4 || question.optionRationales.length !== 4 || question.correctAnswer < 0 || question.correctAnswer > 3 ||
      !question.correctAnswerExplanation.trim() || question.optionRationales.some((rationale) => !rationale.trim())
    ) throw new Error(`RN_CF_ANSWER_CONTRACT_INVALID:${label}/${question.id}`);
    if (
      question.difficulty < 1 || question.difficulty > 4 || !question.cognitiveLevel.trim() || !question.clinicalReasoning.trim() ||
      !question.clinicalPearl.trim() || !question.keyTakeaway.trim() || question.references.length < 2
    ) throw new Error(`RN_CF_METADATA_INVALID:${label}/${question.id}`);
    if (new Set(question.options.map(n)).size !== 4) throw new Error(`RN_CF_DUPLICATE_OPTIONS:${label}/${question.id}`);
    distribution[question.correctAnswer] += 1;
  }
  if (distribution.join(",") !== "5,5,5,5") throw new Error(`RN_CF_BALANCE_INVALID:${label}/${distribution.join(",")}`);
  return {
    tier: "rn" as const,
    countryCode: cell.countryCode,
    exam: "NCLEX-RN" as const,
    bodySystem: "Respiratory" as const,
    topic: "Cystic Fibrosis" as const,
    fullLessonKey: rnCysticFibrosisResolvedFullLessonKey,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts: distribution,
  };
});

export const rnCysticFibrosisCoverageSummary = {
  cells: rnCysticFibrosisCoverageMatrix.length,
  totalQualifyingQuestions: rnCysticFibrosisCoverageMatrix.reduce((total, cell) => total + cell.qualifyingQuestionCount, 0),
  totalQuestionDeficit: rnCysticFibrosisCoverageMatrix.reduce((total, cell) => total + cell.questionDeficit, 0),
  totalCramDeficit: rnCysticFibrosisCoverageMatrix.reduce((total, cell) => total + cell.cramDeficit, 0),
};
if (
  rnCysticFibrosisCoverageSummary.cells !== 2 || rnCysticFibrosisCoverageSummary.totalQualifyingQuestions !== 40 ||
  rnCysticFibrosisCoverageSummary.totalQuestionDeficit !== 0 || rnCysticFibrosisCoverageSummary.totalCramDeficit !== 0
) throw new Error(`RN_CF_COVERAGE_SUMMARY_INVALID:${JSON.stringify(rnCysticFibrosisCoverageSummary)}`);
