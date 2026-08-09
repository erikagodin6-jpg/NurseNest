import {
  getRnPulmonaryEmbolismCram,
  rnPulmonaryEmbolismResolvedFullLessonKey
} from "./respiratory-rn-pulmonary-embolism-cram";
import { rnCaPulmonaryEmbolismNclexBankBatch1 } from "../exam-questions/rn-ca-pulmonary-embolism-nclex-bank-batch1";
import { rnUsPulmonaryEmbolismNclexBankBatch1 } from "../exam-questions/rn-us-pulmonary-embolism-nclex-bank-batch1";

type PeQuestion =
  | (typeof rnCaPulmonaryEmbolismNclexBankBatch1)[number]
  | (typeof rnUsPulmonaryEmbolismNclexBankBatch1)[number];

const cells: Array<{
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  questions: readonly PeQuestion[];
}> = [
  { countryCode: "CA", regionScope: "CAN", questions: rnCaPulmonaryEmbolismNclexBankBatch1 },
  { countryCode: "US", regionScope: "US", questions: rnUsPulmonaryEmbolismNclexBankBatch1 }
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

const globalIds = new Set<string>();
const globalFingerprints = new Map<string, string>();

export const rnPulmonaryEmbolismCoverageMatrix = cells.map((cell) => {
  const label = `${cell.countryCode}:NCLEX-RN:Pulmonary Embolism`;
  const cram = getRnPulmonaryEmbolismCram(cell.countryCode);
  if (
    !cram ||
    cram.fullLessonKey !== rnPulmonaryEmbolismResolvedFullLessonKey ||
    cram.regionScope !== cell.regionScope ||
    cram.exam !== "NCLEX-RN" ||
    cram.topic !== "Pulmonary Embolism"
  ) {
    throw new Error(`RN_PE_CRAM_SCOPE_INVALID: ${label}`);
  }
  if (cell.questions.length !== 20) {
    throw new Error(`RN_PE_COUNT_INVALID: ${label}/${cell.questions.length}`);
  }

  const stems = new Set<string>();
  const distribution = [0, 0, 0, 0];
  for (const question of cell.questions) {
    if (globalIds.has(question.id)) throw new Error(`RN_PE_DUPLICATE_ID: ${question.id}`);
    globalIds.add(question.id);

    const stem = normalize(question.stem);
    if (stems.has(stem)) throw new Error(`RN_PE_DUPLICATE_STEM_WITHIN_CELL: ${label}/${question.id}`);
    stems.add(stem);

    const fingerprint = `${stem}::${question.options.map(normalize).join("||")}`;
    const prior = globalFingerprints.get(fingerprint);
    if (prior) throw new Error(`RN_PE_UNCHANGED_CROSS_COUNTRY_COPY: ${question.id}/${prior}`);
    globalFingerprints.set(fingerprint, question.id);

    if (
      question.tier !== "rn" ||
      question.exam !== "NCLEX-RN" ||
      question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope ||
      question.bodySystem !== "Respiratory" ||
      question.topic !== "Pulmonary Embolism" ||
      question.questionType !== "multiple_choice"
    ) {
      throw new Error(`RN_PE_SCOPE_INVALID: ${label}/${question.id}`);
    }
    if (question.options.length !== 4 || question.optionRationales.length !== 4) {
      throw new Error(`RN_PE_RATIONALE_CARDINALITY_INVALID: ${label}/${question.id}`);
    }
    if (question.correctAnswer < 0 || question.correctAnswer > 3) {
      throw new Error(`RN_PE_ANSWER_INVALID: ${label}/${question.id}`);
    }
    if (
      !question.correctAnswerExplanation.trim() ||
      question.optionRationales.some((rationale) => !rationale.trim())
    ) {
      throw new Error(`RN_PE_RATIONALE_MISSING: ${label}/${question.id}`);
    }
    if (
      question.difficulty < 1 ||
      question.difficulty > 4 ||
      !question.cognitiveLevel.trim() ||
      !question.clinicalReasoning.trim() ||
      !question.clinicalPearl.trim() ||
      !question.keyTakeaway.trim() ||
      question.references.length < 2
    ) {
      throw new Error(`RN_PE_METADATA_INVALID: ${label}/${question.id}`);
    }
    if (new Set(question.options.map(normalize)).size !== 4) {
      throw new Error(`RN_PE_DUPLICATE_OPTIONS: ${label}/${question.id}`);
    }
    distribution[question.correctAnswer] += 1;
  }

  if (distribution.join(",") !== "5,5,5,5") {
    throw new Error(`RN_PE_ANSWER_BALANCE_INVALID: ${label}/${distribution.join(",")}`);
  }

  return {
    tier: "rn" as const,
    countryCode: cell.countryCode,
    exam: "NCLEX-RN" as const,
    bodySystem: "Respiratory" as const,
    topic: "Pulmonary Embolism" as const,
    fullLessonKey: rnPulmonaryEmbolismResolvedFullLessonKey,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts: distribution
  };
});

export const rnPulmonaryEmbolismCoverageSummary = {
  cells: rnPulmonaryEmbolismCoverageMatrix.length,
  totalQualifyingQuestions: rnPulmonaryEmbolismCoverageMatrix.reduce(
    (total, cell) => total + cell.qualifyingQuestionCount,
    0
  ),
  totalQuestionDeficit: rnPulmonaryEmbolismCoverageMatrix.reduce(
    (total, cell) => total + cell.questionDeficit,
    0
  ),
  totalCramDeficit: rnPulmonaryEmbolismCoverageMatrix.reduce(
    (total, cell) => total + cell.cramDeficit,
    0
  )
};

if (
  rnPulmonaryEmbolismCoverageSummary.cells !== 2 ||
  rnPulmonaryEmbolismCoverageSummary.totalQualifyingQuestions !== 40 ||
  rnPulmonaryEmbolismCoverageSummary.totalQuestionDeficit !== 0 ||
  rnPulmonaryEmbolismCoverageSummary.totalCramDeficit !== 0
) {
  throw new Error(
    `RN_PE_COVERAGE_SUMMARY_INVALID: ${JSON.stringify(rnPulmonaryEmbolismCoverageSummary)}`
  );
}
