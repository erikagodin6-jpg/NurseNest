import { respiratoryLessons } from "./respiratory";
import { getRnAsthmaCram } from "./respiratory-rn-asthma-cram";
import { rnCaAsthmaNclexBankBatch1 } from "../exam-questions/rn-ca-asthma-nclex-bank-batch1";
import { rnUsAsthmaNclexBankBatch1 } from "../exam-questions/rn-us-asthma-nclex-bank-batch1";

type RnAsthmaQuestion = (typeof rnCaAsthmaNclexBankBatch1)[number] | (typeof rnUsAsthmaNclexBankBatch1)[number];

const cells: Array<{
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  questions: readonly RnAsthmaQuestion[];
}> = [
  { countryCode: "CA", regionScope: "CAN", questions: rnCaAsthmaNclexBankBatch1 },
  { countryCode: "US", regionScope: "US", questions: rnUsAsthmaNclexBankBatch1 }
];

function normalizeStem(stem: string): string {
  return stem.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

if (!respiratoryLessons["asthma-emergency"]) throw new Error("RN_ASTHMA_COVERAGE_FULL_MISSING: asthma-emergency");

const ids = new Set<string>();
const stems = new Map<string, string>();

export const rnAsthmaCoverageMatrix = cells.map((cell) => {
  const label = `${cell.countryCode}:NCLEX-RN:Asthma`;
  const cram = getRnAsthmaCram(cell.countryCode);
  if (!cram) throw new Error(`RN_ASTHMA_COVERAGE_CRAM_MISSING: ${label}`);
  if (cram.exam !== "NCLEX-RN" || cram.topic !== "Asthma" || cram.regionScope !== cell.regionScope) {
    throw new Error(`RN_ASTHMA_COVERAGE_CRAM_SCOPE_INVALID: ${label}`);
  }
  if (cell.questions.length !== 20) throw new Error(`RN_ASTHMA_COVERAGE_COUNT_INVALID: ${label}/${cell.questions.length}`);

  const distribution = [0, 0, 0, 0];
  for (const question of cell.questions) {
    if (ids.has(question.id)) throw new Error(`RN_ASTHMA_DUPLICATE_ID: ${question.id}`);
    ids.add(question.id);

    const stem = normalizeStem(question.stem);
    const prior = stems.get(stem);
    if (prior) throw new Error(`RN_ASTHMA_DUPLICATE_STEM: ${question.id}/${prior}`);
    stems.set(stem, question.id);

    if (question.tier !== "rn" || question.exam !== "NCLEX-RN" || question.countryCode !== cell.countryCode || question.regionScope !== cell.regionScope) {
      throw new Error(`RN_ASTHMA_SCOPE_INVALID: ${label}/${question.id}`);
    }
    if (question.bodySystem !== "Respiratory" || question.topic !== "Asthma" || question.questionType !== "multiple_choice") {
      throw new Error(`RN_ASTHMA_TOPIC_TYPE_INVALID: ${label}/${question.id}`);
    }
    if (question.options.length !== 4 || question.optionRationales.length !== 4) {
      throw new Error(`RN_ASTHMA_RATIONALE_CARDINALITY_INVALID: ${label}/${question.id}`);
    }
    if (question.correctAnswer < 0 || question.correctAnswer > 3) throw new Error(`RN_ASTHMA_ANSWER_INVALID: ${label}/${question.id}`);
    if (!question.correctAnswerExplanation.trim() || question.optionRationales.some((rationale) => !rationale.trim())) {
      throw new Error(`RN_ASTHMA_RATIONALE_MISSING: ${label}/${question.id}`);
    }
    if (question.difficulty > 4) throw new Error(`RN_ASTHMA_DIFFICULTY_INVALID: ${label}/${question.id}`);
    if (!question.clinicalReasoning.trim() || !question.clinicalPearl.trim() || !question.keyTakeaway.trim() || question.references.length < 2) {
      throw new Error(`RN_ASTHMA_METADATA_INVALID: ${label}/${question.id}`);
    }
    if (new Set(question.options.map((option) => option.trim().toLowerCase())).size !== 4) {
      throw new Error(`RN_ASTHMA_DUPLICATE_OPTIONS: ${label}/${question.id}`);
    }
    distribution[question.correctAnswer] += 1;
  }

  if (distribution.join(",") !== "5,5,5,5") throw new Error(`RN_ASTHMA_ANSWER_BALANCE_INVALID: ${label}/${distribution.join(",")}`);

  return {
    tier: "rn" as const,
    countryCode: cell.countryCode,
    exam: "NCLEX-RN" as const,
    bodySystem: "Respiratory" as const,
    topic: "Asthma" as const,
    fullLessonKey: "asthma-emergency" as const,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts: distribution
  };
});

export const rnAsthmaCoverageSummary = {
  cells: rnAsthmaCoverageMatrix.length,
  totalQualifyingQuestions: rnAsthmaCoverageMatrix.reduce((total, cell) => total + cell.qualifyingQuestionCount, 0),
  totalQuestionDeficit: rnAsthmaCoverageMatrix.reduce((total, cell) => total + cell.questionDeficit, 0),
  totalCramDeficit: rnAsthmaCoverageMatrix.reduce((total, cell) => total + cell.cramDeficit, 0)
};

if (rnAsthmaCoverageSummary.cells !== 2 || rnAsthmaCoverageSummary.totalQualifyingQuestions !== 40 || rnAsthmaCoverageSummary.totalQuestionDeficit !== 0 || rnAsthmaCoverageSummary.totalCramDeficit !== 0) {
  throw new Error(`RN_ASTHMA_COVERAGE_SUMMARY_INVALID: ${JSON.stringify(rnAsthmaCoverageSummary)}`);
}
