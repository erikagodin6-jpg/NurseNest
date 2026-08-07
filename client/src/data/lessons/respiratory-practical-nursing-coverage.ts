import { respiratoryMissingRpnLessons } from "./respiratory-missing-rpn";
import { respiratoryMissingPnUsLessons } from "./respiratory-missing-pn-us";
import {
  getPracticalNursingRespiratoryCram,
  type PracticalNursingCramCountry,
  type PracticalNursingCramExam
} from "./respiratory-practical-nursing-cram";
import {
  rpnCaAsthmaRexpnPublishedBank,
  pnUsAsthmaNclexPublishedBank,
  rpnCaCopdRexpnPublishedBank,
  pnUsCopdNclexPublishedBank,
  rpnCaPneumoniaRexpnPublishedBank,
  pnUsPneumoniaNclexPublishedBank
} from "../exam-questions/practical-nursing-respiratory-published-banks";

type CoverageQuestion = {
  id: string;
  exam: string;
  countryCode: string;
  regionScope: string;
  bodySystem: string;
  topic: string;
  questionType: string;
  stem: string;
  options: readonly string[];
  correctAnswer: number;
  correctAnswerExplanation: string;
  optionRationales: readonly string[];
  difficulty: number;
  cognitiveLevel: string;
  clinicalReasoning: string;
  clinicalPearl: string;
  keyTakeaway: string;
  references: readonly string[];
};

type CoverageCell = {
  countryCode: PracticalNursingCramCountry;
  regionScope: "CAN" | "US";
  exam: PracticalNursingCramExam;
  fullLessonKey: string;
  topic: string;
  questions: readonly CoverageQuestion[];
};

const cells: CoverageCell[] = [
  {
    countryCode: "CA",
    regionScope: "CAN",
    exam: "REX-PN",
    fullLessonKey: "acute-asthma-rpn-ca",
    topic: "Asthma",
    questions: rpnCaAsthmaRexpnPublishedBank
  },
  {
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-PN",
    fullLessonKey: "acute-asthma-pn-us",
    topic: "Asthma",
    questions: pnUsAsthmaNclexPublishedBank
  },
  {
    countryCode: "CA",
    regionScope: "CAN",
    exam: "REX-PN",
    fullLessonKey: "copd-exacerbation-rpn-ca",
    topic: "COPD",
    questions: rpnCaCopdRexpnPublishedBank
  },
  {
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-PN",
    fullLessonKey: "copd-exacerbation-pn-us",
    topic: "COPD",
    questions: pnUsCopdNclexPublishedBank
  },
  {
    countryCode: "CA",
    regionScope: "CAN",
    exam: "REX-PN",
    fullLessonKey: "community-acquired-pneumonia-rpn-ca",
    topic: "Community-Acquired Pneumonia",
    questions: rpnCaPneumoniaRexpnPublishedBank
  },
  {
    countryCode: "US",
    regionScope: "US",
    exam: "NCLEX-PN",
    fullLessonKey: "community-acquired-pneumonia-pn-us",
    topic: "Community-Acquired Pneumonia",
    questions: pnUsPneumoniaNclexPublishedBank
  }
];

function normalizeStem(stem: string): string {
  return stem
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function cellKey(cell: CoverageCell): string {
  return `${cell.countryCode}:${cell.exam}:${cell.topic}`;
}

const globalQuestionIds = new Set<string>();
const globalStems = new Map<string, string>();

export const practicalNursingRespiratoryCoverageMatrix = cells.map((cell) => {
  const key = cellKey(cell);
  const fullRegistry = cell.countryCode === "CA" ? respiratoryMissingRpnLessons : respiratoryMissingPnUsLessons;
  const fullLesson = fullRegistry[cell.fullLessonKey];
  if (!fullLesson) throw new Error(`PN_RESPIRATORY_COVERAGE_FULL_MISSING: ${key}/${cell.fullLessonKey}`);

  const cramLesson = getPracticalNursingRespiratoryCram(cell.countryCode, cell.fullLessonKey);
  if (!cramLesson) throw new Error(`PN_RESPIRATORY_COVERAGE_CRAM_MISSING: ${key}/${cell.fullLessonKey}`);
  if (cramLesson.exam !== cell.exam || cramLesson.topic !== cell.topic) {
    throw new Error(`PN_RESPIRATORY_COVERAGE_CRAM_SCOPE_MISMATCH: ${key}`);
  }

  if (cell.questions.length < 20) {
    throw new Error(`PN_RESPIRATORY_COVERAGE_QUESTION_DEFICIT: ${key}/${cell.questions.length}`);
  }

  const answerPositionCounts = [0, 0, 0, 0];
  for (const question of cell.questions) {
    if (globalQuestionIds.has(question.id)) throw new Error(`PN_RESPIRATORY_DUPLICATE_QUESTION_ID: ${question.id}`);
    globalQuestionIds.add(question.id);

    const normalizedStem = normalizeStem(question.stem);
    const priorStem = globalStems.get(normalizedStem);
    if (priorStem) throw new Error(`PN_RESPIRATORY_DUPLICATE_STEM: ${question.id}/${priorStem}`);
    globalStems.set(normalizedStem, question.id);

    if (question.exam !== cell.exam || question.countryCode !== cell.countryCode || question.regionScope !== cell.regionScope) {
      throw new Error(`PN_RESPIRATORY_QUESTION_SCOPE_MISMATCH: ${key}/${question.id}`);
    }
    if (question.bodySystem !== "Respiratory" || question.topic !== cell.topic) {
      throw new Error(`PN_RESPIRATORY_QUESTION_TOPIC_MISMATCH: ${key}/${question.id}`);
    }
    if (question.questionType !== "multiple_choice") {
      throw new Error(`PN_RESPIRATORY_QUESTION_TYPE_INVALID: ${key}/${question.id}`);
    }
    if (question.options.length !== 4 || question.optionRationales.length !== question.options.length) {
      throw new Error(`PN_RESPIRATORY_RATIONALE_CARDINALITY_INVALID: ${key}/${question.id}`);
    }
    if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
      throw new Error(`PN_RESPIRATORY_ANSWER_CONTRACT_INVALID: ${key}/${question.id}`);
    }
    if (!question.correctAnswerExplanation.trim()) {
      throw new Error(`PN_RESPIRATORY_CORRECT_RATIONALE_MISSING: ${key}/${question.id}`);
    }
    if (question.optionRationales.some((rationale) => !rationale.trim())) {
      throw new Error(`PN_RESPIRATORY_OPTION_RATIONALE_MISSING: ${key}/${question.id}`);
    }
    if (question.difficulty < 1 || question.difficulty > 4) {
      throw new Error(`PN_RESPIRATORY_DIFFICULTY_INVALID: ${key}/${question.id}/${question.difficulty}`);
    }
    if (!question.cognitiveLevel.trim() || !question.clinicalReasoning.trim() || !question.clinicalPearl.trim() || !question.keyTakeaway.trim()) {
      throw new Error(`PN_RESPIRATORY_METADATA_MISSING: ${key}/${question.id}`);
    }
    if (question.references.length < 2) {
      throw new Error(`PN_RESPIRATORY_SOURCE_METADATA_MISSING: ${key}/${question.id}`);
    }

    const optionStrings = question.options.map((option) => option.trim().toLowerCase());
    if (new Set(optionStrings).size !== optionStrings.length) {
      throw new Error(`PN_RESPIRATORY_DUPLICATE_OPTIONS: ${key}/${question.id}`);
    }
    answerPositionCounts[question.correctAnswer] += 1;
  }

  if (answerPositionCounts.join(",") !== "5,5,5,5") {
    throw new Error(`PN_RESPIRATORY_ANSWER_POSITION_BALANCE_INVALID: ${key}/${answerPositionCounts.join(",")}`);
  }

  return {
    countryCode: cell.countryCode,
    exam: cell.exam,
    tier: "rpn" as const,
    bodySystem: "Respiratory" as const,
    topic: cell.topic,
    fullLessonKey: cell.fullLessonKey,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: cell.questions.length,
    minimumRequiredQuestions: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts
  };
});

export const practicalNursingRespiratoryCoverageSummary = {
  cells: practicalNursingRespiratoryCoverageMatrix.length,
  totalQualifyingQuestions: practicalNursingRespiratoryCoverageMatrix.reduce(
    (total, cell) => total + cell.qualifyingQuestionCount,
    0
  ),
  totalQuestionDeficit: practicalNursingRespiratoryCoverageMatrix.reduce(
    (total, cell) => total + cell.questionDeficit,
    0
  ),
  totalCramDeficit: practicalNursingRespiratoryCoverageMatrix.reduce(
    (total, cell) => total + cell.cramDeficit,
    0
  )
};

if (practicalNursingRespiratoryCoverageSummary.cells !== 6) {
  throw new Error(`PN_RESPIRATORY_COVERAGE_CELL_COUNT_INVALID: ${practicalNursingRespiratoryCoverageSummary.cells}`);
}
if (practicalNursingRespiratoryCoverageSummary.totalQualifyingQuestions !== 120) {
  throw new Error(`PN_RESPIRATORY_COVERAGE_TOTAL_INVALID: ${practicalNursingRespiratoryCoverageSummary.totalQualifyingQuestions}`);
}
if (practicalNursingRespiratoryCoverageSummary.totalQuestionDeficit !== 0) {
  throw new Error(`PN_RESPIRATORY_COVERAGE_QUESTION_DEFICIT_NONZERO: ${practicalNursingRespiratoryCoverageSummary.totalQuestionDeficit}`);
}
if (practicalNursingRespiratoryCoverageSummary.totalCramDeficit !== 0) {
  throw new Error(`PN_RESPIRATORY_COVERAGE_CRAM_DEFICIT_NONZERO: ${practicalNursingRespiratoryCoverageSummary.totalCramDeficit}`);
}
