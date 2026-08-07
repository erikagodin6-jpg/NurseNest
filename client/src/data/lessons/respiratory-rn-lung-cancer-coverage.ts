import { getRnLungCancerCram, rnLungCancerResolvedFullLessonKey } from "./respiratory-rn-lung-cancer-cram";
import { rnCaLungCancerAuthoritativeBank } from "../exam-questions/rn-ca-lung-cancer-authoritative";
import { rnUsLungCancerAuthoritativeBank } from "../exam-questions/rn-us-lung-cancer-authoritative";

type LungCancerQuestion =
  | (typeof rnCaLungCancerAuthoritativeBank)[number]
  | (typeof rnUsLungCancerAuthoritativeBank)[number];

const cells: Array<{
  countryCode: "CA" | "US";
  regionScope: "CAN" | "US";
  questions: readonly LungCancerQuestion[];
}> = [
  { countryCode: "CA", regionScope: "CAN", questions: rnCaLungCancerAuthoritativeBank },
  { countryCode: "US", regionScope: "US", questions: rnUsLungCancerAuthoritativeBank }
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

const globalIds = new Set<string>();
const crossCountryFingerprints = new Map<string, string>();

export const rnLungCancerCoverageMatrix = cells.map((cell) => {
  const label = `${cell.countryCode}:NCLEX-RN:Lung Cancer`;
  const cram = getRnLungCancerCram(cell.countryCode);

  if (
    !cram ||
    cram.fullLessonKey !== rnLungCancerResolvedFullLessonKey ||
    cram.regionScope !== cell.regionScope ||
    cram.exam !== "NCLEX-RN" ||
    cram.topic !== "Lung Cancer"
  ) {
    throw new Error(`RN_LUNG_CANCER_CRAM_SCOPE_INVALID:${label}`);
  }

  if (cell.questions.length !== 20) {
    throw new Error(`RN_LUNG_CANCER_COUNT_INVALID:${label}/${cell.questions.length}`);
  }

  const stems = new Set<string>();
  const answerPositionCounts = [0, 0, 0, 0];

  for (const question of cell.questions) {
    if (globalIds.has(question.id)) {
      throw new Error(`RN_LUNG_CANCER_DUPLICATE_ID:${question.id}`);
    }
    globalIds.add(question.id);

    const normalizedStem = normalize(question.stem);
    if (stems.has(normalizedStem)) {
      throw new Error(`RN_LUNG_CANCER_DUPLICATE_STEM_WITHIN_CELL:${label}/${question.id}`);
    }
    stems.add(normalizedStem);

    const fingerprint = `${normalizedStem}::${question.options.map(normalize).join("||")}`;
    const prior = crossCountryFingerprints.get(fingerprint);
    if (prior) {
      throw new Error(`RN_LUNG_CANCER_UNCHANGED_CROSS_COUNTRY_COPY:${question.id}/${prior}`);
    }
    crossCountryFingerprints.set(fingerprint, question.id);

    if (
      question.tier !== "rn" ||
      question.exam !== "NCLEX-RN" ||
      question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope ||
      question.bodySystem !== "Respiratory" ||
      question.topic !== "Lung Cancer" ||
      question.questionType !== "multiple_choice"
    ) {
      throw new Error(`RN_LUNG_CANCER_SCOPE_INVALID:${label}/${question.id}`);
    }

    if (question.options.length !== 4 || question.optionRationales.length !== 4) {
      throw new Error(`RN_LUNG_CANCER_RATIONALE_CARDINALITY_INVALID:${label}/${question.id}`);
    }

    if (
      question.correctAnswer < 0 ||
      question.correctAnswer > 3 ||
      !question.correctAnswerExplanation.trim() ||
      question.optionRationales.some((rationale) => !rationale.trim())
    ) {
      throw new Error(`RN_LUNG_CANCER_ANSWER_CONTRACT_INVALID:${label}/${question.id}`);
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
      throw new Error(`RN_LUNG_CANCER_METADATA_INVALID:${label}/${question.id}`);
    }

    if (new Set(question.options.map(normalize)).size !== 4) {
      throw new Error(`RN_LUNG_CANCER_DUPLICATE_OPTIONS:${label}/${question.id}`);
    }

    answerPositionCounts[question.correctAnswer] += 1;
  }

  if (answerPositionCounts.join(",") !== "5,5,5,5") {
    throw new Error(
      `RN_LUNG_CANCER_ANSWER_BALANCE_INVALID:${label}/${answerPositionCounts.join(",")}`
    );
  }

  return {
    tier: "rn" as const,
    countryCode: cell.countryCode,
    exam: "NCLEX-RN" as const,
    bodySystem: "Respiratory" as const,
    topic: "Lung Cancer" as const,
    fullLessonKey: rnLungCancerResolvedFullLessonKey,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts
  };
});

export const rnLungCancerCoverageSummary = {
  cells: rnLungCancerCoverageMatrix.length,
  totalQualifyingQuestions: rnLungCancerCoverageMatrix.reduce(
    (total, cell) => total + cell.qualifyingQuestionCount,
    0
  ),
  totalQuestionDeficit: rnLungCancerCoverageMatrix.reduce(
    (total, cell) => total + cell.questionDeficit,
    0
  ),
  totalCramDeficit: rnLungCancerCoverageMatrix.reduce(
    (total, cell) => total + cell.cramDeficit,
    0
  )
};

if (
  rnLungCancerCoverageSummary.cells !== 2 ||
  rnLungCancerCoverageSummary.totalQualifyingQuestions !== 40 ||
  rnLungCancerCoverageSummary.totalQuestionDeficit !== 0 ||
  rnLungCancerCoverageSummary.totalCramDeficit !== 0
) {
  throw new Error(
    `RN_LUNG_CANCER_COVERAGE_SUMMARY_INVALID:${JSON.stringify(rnLungCancerCoverageSummary)}`
  );
}
