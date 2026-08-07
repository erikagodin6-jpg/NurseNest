import { respiratoryLessons } from "./respiratory";
import { getRnCopdCram } from "./respiratory-rn-copd-cram";
import { rnCaCopdNclexBankBatch1 } from "../exam-questions/rn-ca-copd-nclex-bank-batch1";
import { rnUsCopdNclexBankBatch1 } from "../exam-questions/rn-us-copd-nclex-bank-batch1";

type RnCopdQuestion =
  | (typeof rnCaCopdNclexBankBatch1)[number]
  | (typeof rnUsCopdNclexBankBatch1)[number];

const cells: Array<{
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  questions: readonly RnCopdQuestion[];
}> = [
  { countryCode: "CA", regionScope: "CAN", questions: rnCaCopdNclexBankBatch1 },
  { countryCode: "US", regionScope: "US", questions: rnUsCopdNclexBankBatch1 }
];

function normalizeStem(stem: string): string {
  return stem.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

if (!respiratoryLessons["copd-exacerbation"]) {
  throw new Error("RN_COPD_COVERAGE_FULL_MISSING: copd-exacerbation");
}

const ids = new Set<string>();
const stems = new Map<string, string>();

export const rnCopdCoverageMatrix = cells.map((cell) => {
  const label = `${cell.countryCode}:NCLEX-RN:COPD`;
  const cram = getRnCopdCram(cell.countryCode);
  if (!cram) throw new Error(`RN_COPD_COVERAGE_CRAM_MISSING: ${label}`);
  if (
    cram.exam !== "NCLEX-RN" ||
    cram.topic !== "COPD" ||
    cram.regionScope !== cell.regionScope ||
    cram.fullLessonKey !== "copd-exacerbation"
  ) {
    throw new Error(`RN_COPD_COVERAGE_CRAM_SCOPE_INVALID: ${label}`);
  }
  if (cell.questions.length !== 20) {
    throw new Error(`RN_COPD_COVERAGE_COUNT_INVALID: ${label}/${cell.questions.length}`);
  }

  const distribution = [0, 0, 0, 0];
  for (const question of cell.questions) {
    if (ids.has(question.id)) throw new Error(`RN_COPD_DUPLICATE_ID: ${question.id}`);
    ids.add(question.id);

    const stem = normalizeStem(question.stem);
    const prior = stems.get(stem);
    if (prior) throw new Error(`RN_COPD_DUPLICATE_STEM: ${question.id}/${prior}`);
    stems.set(stem, question.id);

    if (
      question.tier !== "rn" ||
      question.exam !== "NCLEX-RN" ||
      question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope
    ) {
      throw new Error(`RN_COPD_SCOPE_INVALID: ${label}/${question.id}`);
    }
    if (
      question.bodySystem !== "Respiratory" ||
      question.topic !== "COPD" ||
      question.questionType !== "multiple_choice"
    ) {
      throw new Error(`RN_COPD_TOPIC_TYPE_INVALID: ${label}/${question.id}`);
    }
    if (question.options.length !== 4 || question.optionRationales.length !== 4) {
      throw new Error(`RN_COPD_RATIONALE_CARDINALITY_INVALID: ${label}/${question.id}`);
    }
    if (question.correctAnswer < 0 || question.correctAnswer > 3) {
      throw new Error(`RN_COPD_ANSWER_INVALID: ${label}/${question.id}`);
    }
    if (
      !question.correctAnswerExplanation.trim() ||
      question.optionRationales.some((rationale) => !rationale.trim())
    ) {
      throw new Error(`RN_COPD_RATIONALE_MISSING: ${label}/${question.id}`);
    }
    if (question.difficulty < 1 || question.difficulty > 4) {
      throw new Error(`RN_COPD_DIFFICULTY_INVALID: ${label}/${question.id}`);
    }
    if (
      !question.cognitiveLevel.trim() ||
      !question.clinicalReasoning.trim() ||
      !question.clinicalPearl.trim() ||
      !question.keyTakeaway.trim() ||
      question.references.length < 2
    ) {
      throw new Error(`RN_COPD_METADATA_INVALID: ${label}/${question.id}`);
    }
    if (new Set(question.options.map((option) => option.trim().toLowerCase())).size !== 4) {
      throw new Error(`RN_COPD_DUPLICATE_OPTIONS: ${label}/${question.id}`);
    }
    distribution[question.correctAnswer] += 1;
  }

  if (distribution.join(",") !== "5,5,5,5") {
    throw new Error(`RN_COPD_ANSWER_BALANCE_INVALID: ${label}/${distribution.join(",")}`);
  }

  return {
    tier: "rn" as const,
    countryCode: cell.countryCode,
    exam: "NCLEX-RN" as const,
    bodySystem: "Respiratory" as const,
    topic: "COPD" as const,
    fullLessonKey: "copd-exacerbation" as const,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts: distribution
  };
});

export const rnCopdCoverageSummary = {
  cells: rnCopdCoverageMatrix.length,
  totalQualifyingQuestions: rnCopdCoverageMatrix.reduce(
    (total, cell) => total + cell.qualifyingQuestionCount,
    0
  ),
  totalQuestionDeficit: rnCopdCoverageMatrix.reduce(
    (total, cell) => total + cell.questionDeficit,
    0
  ),
  totalCramDeficit: rnCopdCoverageMatrix.reduce(
    (total, cell) => total + cell.cramDeficit,
    0
  )
};

if (
  rnCopdCoverageSummary.cells !== 2 ||
  rnCopdCoverageSummary.totalQualifyingQuestions !== 40 ||
  rnCopdCoverageSummary.totalQuestionDeficit !== 0 ||
  rnCopdCoverageSummary.totalCramDeficit !== 0
) {
  throw new Error(`RN_COPD_COVERAGE_SUMMARY_INVALID: ${JSON.stringify(rnCopdCoverageSummary)}`);
}
