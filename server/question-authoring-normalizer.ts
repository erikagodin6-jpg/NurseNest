import { createHash } from "crypto";
import { auditQuestionPublicationContract } from "./question-publication-contract";

type JsonRecord = Record<string, unknown>;

export type AuthoredOptionInput = string | { id?: string; optionId?: string; label?: string; text?: string; content?: string; value?: string; [key: string]: unknown };

export type AuthoredQuestionInput = {
  id: string;
  tier?: string;
  exam?: string;
  questionType?: string;
  question_type?: string;
  stem: string;
  options: AuthoredOptionInput[];
  correctAnswer?: unknown;
  correct_answer?: unknown;
  correctIndex?: number;
  correctIndices?: number[];
  rationale?: string;
  distractorRationales?: Record<string, string>;
  distractor_rationales?: Record<string, string>;
  correctAnswerExplanation?: string;
  correct_answer_explanation?: string;
  hint?: string;
  examStrategy?: string;
  whyThisMatters?: string;
  keyTakeaway?: string;
  clinicalPearl?: string;
  mnemonic?: string;
  memoryHook?: string;
  countryCode?: string;
  regionScope?: string;
  languageCode?: string;
  licensingBody?: string;
  bodySystem?: string;
  topic?: string;
  tags?: string[];
  difficulty?: number;
  unitSystemSupport?: unknown;
  unitVariants?: unknown;
  [key: string]: unknown;
};

export type NormalizedAuthoredQuestion = AuthoredQuestionInput & {
  options: Array<{ id: string; label: string; text: string; [key: string]: unknown }>;
  correctAnswer: string | string[];
  distractorRationales: Record<string, string>;
};

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 96);
}

function optionId(questionId: string, index: number, text: string): string {
  const digest = createHash("sha1").update(text.trim().toLowerCase()).digest("hex").slice(0, 8);
  return `${slug(questionId)}:opt:${String(index + 1).padStart(2, "0")}:${digest}`;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptions(question: AuthoredQuestionInput) {
  return question.options.map((raw, index) => {
    const label = String.fromCharCode(65 + index);
    if (typeof raw === "string") {
      return { id: optionId(question.id, index, raw), label, text: raw.trim() };
    }
    const rawText = text(raw.text) || text(raw.content) || text(raw.value);
    return {
      ...raw,
      id: text(raw.id) || text(raw.optionId) || optionId(question.id, index, rawText),
      label: text(raw.label) || label,
      text: rawText,
    };
  });
}

function resolveCorrectIds(question: AuthoredQuestionInput, options: ReturnType<typeof normalizeOptions>): string[] {
  const direct = question.correctAnswer ?? question.correct_answer;
  if (Array.isArray(question.correctIndices) && question.correctIndices.length > 0) {
    return question.correctIndices.map(index => options[index]?.id).filter(Boolean);
  }
  if (typeof question.correctIndex === "number") {
    const id = options[question.correctIndex]?.id;
    return id ? [id] : [];
  }

  const values = Array.isArray(direct) ? direct : [direct];
  const ids: string[] = [];
  for (const value of values) {
    if (value === undefined || value === null) continue;
    if (typeof value === "number") {
      const option = options[value] || (value > 0 ? options[value - 1] : undefined);
      if (option?.id) ids.push(option.id);
      continue;
    }
    const needle = String(value).trim().toLowerCase();
    const option = options.find(item => item.id.toLowerCase() === needle)
      || options.find(item => item.label.toLowerCase() === needle)
      || options.find(item => item.text.toLowerCase() === needle);
    if (option?.id) ids.push(option.id);
  }
  return [...new Set(ids)];
}

function normalizeDistractors(
  question: AuthoredQuestionInput,
  options: ReturnType<typeof normalizeOptions>,
  correctIds: Set<string>,
): Record<string, string> {
  const source = question.distractorRationales || question.distractor_rationales || {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(source)) {
    const rationale = text(value);
    if (!rationale) continue;
    const numeric = Number(key);
    const needle = key.toLowerCase();
    const option = options.find(item => item.id.toLowerCase() === needle)
      || options.find(item => item.label.toLowerCase() === needle)
      || (Number.isInteger(numeric) ? options[numeric] || (numeric > 0 ? options[numeric - 1] : undefined) : undefined)
      || options.find(item => item.text.toLowerCase() === needle);
    if (option && !correctIds.has(option.id)) out[option.id] = rationale;
  }
  return out;
}

export function normalizeAuthoredQuestion(question: AuthoredQuestionInput): NormalizedAuthoredQuestion {
  if (!question.id || !question.id.trim()) throw new Error("Authored question requires a stable question id before normalization");
  const options = normalizeOptions(question);
  const correctIds = resolveCorrectIds(question, options);
  if (correctIds.length === 0) throw new Error(`Unable to resolve correct answer for ${question.id}`);
  const distractorRationales = normalizeDistractors(question, options, new Set(correctIds));

  return {
    ...question,
    options,
    correctAnswer: correctIds.length === 1 ? correctIds[0] : correctIds,
    correct_answer: correctIds.length === 1 ? correctIds[0] : correctIds,
    distractorRationales,
    distractor_rationales: distractorRationales,
    correctAnswerExplanation: question.correctAnswerExplanation || question.correct_answer_explanation,
    correct_answer_explanation: question.correct_answer_explanation || question.correctAnswerExplanation,
    hint: question.hint || question.examStrategy,
    whyThisMatters: question.whyThisMatters || question.keyTakeaway,
    clinicalPearl: question.clinicalPearl,
    mnemonic: question.mnemonic || question.memoryHook,
    countryCode: question.countryCode,
    languageCode: question.languageCode || "en",
    unitSystemSupport: question.unitSystemSupport,
    unitVariants: question.unitVariants,
  };
}

export function normalizeAndAssertAuthoredQuestion(question: AuthoredQuestionInput): NormalizedAuthoredQuestion {
  const normalized = normalizeAuthoredQuestion(question);
  const issues = auditQuestionPublicationContract({
    ...normalized,
    question_type: normalized.question_type || normalized.questionType,
    correct_answer: normalized.correct_answer,
    distractor_rationales: normalized.distractor_rationales,
    correct_answer_explanation: normalized.correct_answer_explanation,
    country_code: normalized.countryCode,
    region_scope: normalized.regionScope,
    language_code: normalized.languageCode,
    licensing_body: normalized.licensingBody,
    body_system: normalized.bodySystem,
    unit_system_support: normalized.unitSystemSupport,
    unit_variants: normalized.unitVariants,
  });
  const blocking = issues.filter(issue => issue.severity === "blocking");
  if (blocking.length > 0) {
    throw new Error(`Question ${question.id} fails publication contract: ${blocking.map(issue => `${issue.code}:${issue.field}`).join(", ")}`);
  }
  return normalized;
}
