import { respiratoryMissingRpnLessons } from "./respiratory-missing-rpn";
import { respiratoryMissingPnUsLessons } from "./respiratory-missing-pn-us";
import { respiratoryLessons } from "./respiratory";
import { getPracticalNursingRespiratoryCram } from "./respiratory-practical-nursing-cram";
import { getRnAsthmaCram } from "./respiratory-rn-asthma-cram";
import { getRnCopdCram } from "./respiratory-rn-copd-cram";
import { getRnPneumoniaCram } from "./respiratory-rn-pneumonia-cram";
import {
  rpnCaAsthmaRexpnPublishedBank,
  pnUsAsthmaNclexPublishedBank,
  rpnCaCopdRexpnPublishedBank,
  pnUsCopdNclexPublishedBank,
  rpnCaPneumoniaRexpnPublishedBank,
  pnUsPneumoniaNclexPublishedBank
} from "../exam-questions/practical-nursing-respiratory-published-banks";
import { rnCaAsthmaNclexBankBatch1 } from "../exam-questions/rn-ca-asthma-nclex-bank-batch1";
import { rnUsAsthmaNclexBankBatch1 } from "../exam-questions/rn-us-asthma-nclex-bank-batch1";
import { rnCaCopdNclexBankBatch1 } from "../exam-questions/rn-ca-copd-nclex-bank-batch1";
import { rnUsCopdNclexBankBatch1 } from "../exam-questions/rn-us-copd-nclex-bank-batch1";
import { rnCaPneumoniaNclexBankBatch1 } from "../exam-questions/rn-ca-pneumonia-nclex-bank-batch1";
import { rnUsPneumoniaNclexBankBatch1 } from "../exam-questions/rn-us-pneumonia-nclex-bank-batch1";

type Country = "CA" | "US";
type Region = "CAN" | "US";
type Tier = "rpn" | "rn";
type Exam = "REX-PN" | "NCLEX-PN" | "NCLEX-RN";
type Topic = "Asthma" | "COPD" | "Community-Acquired Pneumonia";

type Question = {
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

type Cell = {
  tier: Tier;
  countryCode: Country;
  regionScope: Region;
  exam: Exam;
  topic: Topic;
  fullLessonKey: string;
  questions: readonly Question[];
};

const cells: Cell[] = [
  { tier: "rpn", countryCode: "CA", regionScope: "CAN", exam: "REX-PN", topic: "Asthma", fullLessonKey: "acute-asthma-rpn-ca", questions: rpnCaAsthmaRexpnPublishedBank },
  { tier: "rpn", countryCode: "US", regionScope: "US", exam: "NCLEX-PN", topic: "Asthma", fullLessonKey: "acute-asthma-pn-us", questions: pnUsAsthmaNclexPublishedBank },
  { tier: "rpn", countryCode: "CA", regionScope: "CAN", exam: "REX-PN", topic: "COPD", fullLessonKey: "copd-exacerbation-rpn-ca", questions: rpnCaCopdRexpnPublishedBank },
  { tier: "rpn", countryCode: "US", regionScope: "US", exam: "NCLEX-PN", topic: "COPD", fullLessonKey: "copd-exacerbation-pn-us", questions: pnUsCopdNclexPublishedBank },
  { tier: "rpn", countryCode: "CA", regionScope: "CAN", exam: "REX-PN", topic: "Community-Acquired Pneumonia", fullLessonKey: "community-acquired-pneumonia-rpn-ca", questions: rpnCaPneumoniaRexpnPublishedBank },
  { tier: "rpn", countryCode: "US", regionScope: "US", exam: "NCLEX-PN", topic: "Community-Acquired Pneumonia", fullLessonKey: "community-acquired-pneumonia-pn-us", questions: pnUsPneumoniaNclexPublishedBank },
  { tier: "rn", countryCode: "CA", regionScope: "CAN", exam: "NCLEX-RN", topic: "Asthma", fullLessonKey: "asthma-emergency", questions: rnCaAsthmaNclexBankBatch1 },
  { tier: "rn", countryCode: "US", regionScope: "US", exam: "NCLEX-RN", topic: "Asthma", fullLessonKey: "asthma-emergency", questions: rnUsAsthmaNclexBankBatch1 },
  { tier: "rn", countryCode: "CA", regionScope: "CAN", exam: "NCLEX-RN", topic: "COPD", fullLessonKey: "copd-exacerbation", questions: rnCaCopdNclexBankBatch1 },
  { tier: "rn", countryCode: "US", regionScope: "US", exam: "NCLEX-RN", topic: "COPD", fullLessonKey: "copd-exacerbation", questions: rnUsCopdNclexBankBatch1 },
  { tier: "rn", countryCode: "CA", regionScope: "CAN", exam: "NCLEX-RN", topic: "Community-Acquired Pneumonia", fullLessonKey: "pneumonia", questions: rnCaPneumoniaNclexBankBatch1 },
  { tier: "rn", countryCode: "US", regionScope: "US", exam: "NCLEX-RN", topic: "Community-Acquired Pneumonia", fullLessonKey: "pneumonia", questions: rnUsPneumoniaNclexBankBatch1 }
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function contentFingerprint(question: Question): string {
  return `${normalize(question.stem)}::${question.options.map(normalize).join("||")}`;
}

function resolveFull(cell: Cell): boolean {
  if (cell.tier === "rpn") {
    return Boolean(
      (cell.countryCode === "CA" ? respiratoryMissingRpnLessons : respiratoryMissingPnUsLessons)[
        cell.fullLessonKey
      ]
    );
  }
  return Boolean(respiratoryLessons[cell.fullLessonKey]);
}

function resolveCram(cell: Cell): boolean {
  if (cell.tier === "rpn") {
    const cram = getPracticalNursingRespiratoryCram(cell.countryCode, cell.fullLessonKey);
    return Boolean(cram && cram.exam === cell.exam && cram.topic === cell.topic);
  }
  const cram =
    cell.topic === "Asthma"
      ? getRnAsthmaCram(cell.countryCode)
      : cell.topic === "COPD"
        ? getRnCopdCram(cell.countryCode)
        : getRnPneumoniaCram(cell.countryCode);
  return Boolean(
    cram &&
      cram.exam === "NCLEX-RN" &&
      cram.topic === cell.topic &&
      cram.fullLessonKey === cell.fullLessonKey
  );
}

const globalIds = new Set<string>();
const globalFingerprints = new Map<string, string>();

export const respiratoryCoreCaUsCoverageMatrix = cells.map((cell) => {
  const label = `${cell.tier}:${cell.countryCode}:${cell.exam}:${cell.topic}`;
  if (!resolveFull(cell)) throw new Error(`RESP_CORE_FULL_MISSING: ${label}/${cell.fullLessonKey}`);
  if (!resolveCram(cell)) throw new Error(`RESP_CORE_CRAM_MISSING: ${label}/${cell.fullLessonKey}`);
  if (cell.questions.length !== 20) throw new Error(`RESP_CORE_QUESTION_COUNT_INVALID: ${label}/${cell.questions.length}`);

  const cellStems = new Set<string>();
  const distribution = [0, 0, 0, 0];

  for (const question of cell.questions) {
    if (globalIds.has(question.id)) throw new Error(`RESP_CORE_DUPLICATE_ID: ${question.id}`);
    globalIds.add(question.id);

    const normalizedStem = normalize(question.stem);
    if (cellStems.has(normalizedStem)) {
      throw new Error(`RESP_CORE_DUPLICATE_STEM_WITHIN_CELL: ${label}/${question.id}`);
    }
    cellStems.add(normalizedStem);

    const fingerprint = contentFingerprint(question);
    const priorFingerprint = globalFingerprints.get(fingerprint);
    if (priorFingerprint) {
      throw new Error(
        `RESP_CORE_UNCHANGED_CROSS_CELL_COPY: ${question.id}/${priorFingerprint}`
      );
    }
    globalFingerprints.set(fingerprint, question.id);

    if (
      question.exam !== cell.exam ||
      question.countryCode !== cell.countryCode ||
      question.regionScope !== cell.regionScope ||
      question.bodySystem !== "Respiratory" ||
      question.topic !== cell.topic ||
      question.questionType !== "multiple_choice"
    ) {
      throw new Error(`RESP_CORE_SCOPE_OR_TYPE_INVALID: ${label}/${question.id}`);
    }
    if (question.options.length !== 4 || question.optionRationales.length !== 4) {
      throw new Error(`RESP_CORE_RATIONALE_CARDINALITY_INVALID: ${label}/${question.id}`);
    }
    if (question.correctAnswer < 0 || question.correctAnswer > 3) {
      throw new Error(`RESP_CORE_ANSWER_INVALID: ${label}/${question.id}`);
    }
    if (
      !question.correctAnswerExplanation.trim() ||
      question.optionRationales.some((rationale) => !rationale.trim())
    ) {
      throw new Error(`RESP_CORE_RATIONALE_MISSING: ${label}/${question.id}`);
    }
    if (question.difficulty < 1 || question.difficulty > 4) {
      throw new Error(`RESP_CORE_DIFFICULTY_INVALID: ${label}/${question.id}`);
    }
    if (
      !question.cognitiveLevel.trim() ||
      !question.clinicalReasoning.trim() ||
      !question.clinicalPearl.trim() ||
      !question.keyTakeaway.trim() ||
      question.references.length < 2
    ) {
      throw new Error(`RESP_CORE_METADATA_INVALID: ${label}/${question.id}`);
    }
    if (new Set(question.options.map(normalize)).size !== 4) {
      throw new Error(`RESP_CORE_DUPLICATE_OPTIONS: ${label}/${question.id}`);
    }
    distribution[question.correctAnswer] += 1;
  }

  if (distribution.join(",") !== "5,5,5,5") {
    throw new Error(`RESP_CORE_ANSWER_BALANCE_INVALID: ${label}/${distribution.join(",")}`);
  }

  return {
    tier: cell.tier,
    countryCode: cell.countryCode,
    exam: cell.exam,
    bodySystem: "Respiratory" as const,
    topic: cell.topic,
    fullLessonKey: cell.fullLessonKey,
    fullLessonPresent: true as const,
    cramLessonPresent: true as const,
    qualifyingQuestionCount: 20 as const,
    minimumRequiredQuestions: 20 as const,
    questionDeficit: 0 as const,
    cramDeficit: 0 as const,
    answerPositionCounts: distribution
  };
});

export const respiratoryCoreCaUsCoverageSummary = {
  cells: respiratoryCoreCaUsCoverageMatrix.length,
  topics: 3,
  tiers: 2,
  countries: 2,
  totalQualifyingQuestions: respiratoryCoreCaUsCoverageMatrix.reduce(
    (total, cell) => total + cell.qualifyingQuestionCount,
    0
  ),
  totalQuestionDeficit: respiratoryCoreCaUsCoverageMatrix.reduce(
    (total, cell) => total + cell.questionDeficit,
    0
  ),
  totalCramDeficit: respiratoryCoreCaUsCoverageMatrix.reduce(
    (total, cell) => total + cell.cramDeficit,
    0
  )
};

if (
  respiratoryCoreCaUsCoverageSummary.cells !== 12 ||
  respiratoryCoreCaUsCoverageSummary.totalQualifyingQuestions !== 240 ||
  respiratoryCoreCaUsCoverageSummary.totalQuestionDeficit !== 0 ||
  respiratoryCoreCaUsCoverageSummary.totalCramDeficit !== 0
) {
  throw new Error(
    `RESP_CORE_COVERAGE_SUMMARY_INVALID: ${JSON.stringify(respiratoryCoreCaUsCoverageSummary)}`
  );
}
