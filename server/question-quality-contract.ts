export type QuestionQualitySource = "exam_questions" | "allied_questions";

export type NormalizedOption = {
  label: string;
  text: string;
};

export type QuestionQualityRecord = {
  id: string;
  source: QuestionQualitySource;
  tier: string | null;
  exam: string | null;
  questionType: string | null;
  status: string | null;
  stem: string | null;
  options: unknown;
  correctAnswer: unknown;
  rationale: string | null;
  correctAnswerExplanation: string | null;
  distractorRationales: unknown;
  clinicalPearl: string | null;
  bodySystem: string | null;
  topic: string | null;
  subtopic: string | null;
  difficulty: number | null;
  cognitiveLevel: string | null;
  tags: unknown;
  regionScope: string | null;
  examStrategy?: string | null;
};

export type QuestionQualityIssue = {
  field: string;
  code: string;
  severity: "blocker" | "high" | "medium" | "low";
  message: string;
  repairable: boolean;
};

export type QuestionQualityAudit = {
  valid: boolean;
  structuralValid: boolean;
  needsContentRepair: boolean;
  issues: QuestionQualityIssue[];
  options: NormalizedOption[];
  correctLabels: string[];
  distractorRationales: Record<string, string>;
  requiredDistractorLabels: string[];
};

const OPTION_BASED_TYPES = new Set([
  "MCQ",
  "MULTIPLE_CHOICE",
  "MULTIPLE-CHOICE",
  "SATA",
  "SELECT_ALL",
  "SELECT-ALL",
  "SELECT_ALL_THAT_APPLY",
  "SELECT-ALL-THAT-APPLY",
  "PRIORITY",
]);

const GENERIC_RATIONALE_PATTERNS = [
  /^incorrect\.?$/i,
  /^correct\.?$/i,
  /^not correct\.?$/i,
  /^not the best answer\.?$/i,
  /^this is wrong\.?$/i,
  /^this is incorrect\.?$/i,
  /^not appropriate\.?$/i,
  /^wrong answer\.?$/i,
  /^see rationale\.?$/i,
  /^see explanation\.?$/i,
  /^n\/?a\.?$/i,
  /^tbd\.?$/i,
];

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeLabel(value: unknown, fallbackIndex: number): string {
  const raw = cleanText(value).toUpperCase();
  if (/^[A-Z]$/.test(raw)) return raw;
  return String.fromCharCode(65 + fallbackIndex);
}

export function normalizeQuestionOptions(value: unknown): NormalizedOption[] {
  let parsed = value;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((option: any, index: number) => {
      if (typeof option === "string") {
        return { label: String.fromCharCode(65 + index), text: option.trim() };
      }
      if (option && typeof option === "object") {
        const text = cleanText(option.text ?? option.content ?? option.labelText ?? option.value);
        return {
          label: normalizeLabel(option.label, index),
          text,
        };
      }
      return { label: String.fromCharCode(65 + index), text: "" };
    })
    .filter((option) => option.text.length > 0);
}

export function normalizeCorrectAnswerLabels(value: unknown, options: NormalizedOption[]): string[] {
  let parsed = value;
  if (typeof parsed === "string") {
    const trimmed = parsed.trim();
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      parsed = trimmed;
    }
  }

  const rawValues = Array.isArray(parsed) ? parsed : [parsed];
  const labels = new Set<string>();

  for (const item of rawValues) {
    if (typeof item === "number" && Number.isInteger(item) && item >= 0 && item < options.length) {
      labels.add(options[item].label);
      continue;
    }

    if (typeof item === "string") {
      const token = item.trim();
      if (/^\d+$/.test(token)) {
        const idx = Number(token);
        if (idx >= 0 && idx < options.length) labels.add(options[idx].label);
        continue;
      }
      const upper = token.toUpperCase();
      const direct = options.find((option) => option.label === upper);
      if (direct) {
        labels.add(direct.label);
        continue;
      }
      const byText = options.find((option) => option.text.toLowerCase() === token.toLowerCase());
      if (byText) labels.add(byText.label);
    }
  }

  return [...labels];
}

export function normalizeDistractorRationales(value: unknown): Record<string, string> {
  let parsed = value;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return {};
    }
  }

  if (!parsed) return {};

  if (Array.isArray(parsed)) {
    const result: Record<string, string> = {};
    parsed.forEach((entry, index) => {
      const text = cleanText(entry);
      if (text) result[String.fromCharCode(65 + index)] = text;
    });
    return result;
  }

  if (typeof parsed !== "object") return {};

  const result: Record<string, string> = {};
  for (const [key, rawValue] of Object.entries(parsed as Record<string, unknown>)) {
    const text = cleanText(rawValue);
    if (!text) continue;
    const normalizedKey = key.trim().toUpperCase();
    if (/^[A-Z]$/.test(normalizedKey)) {
      result[normalizedKey] = text;
      continue;
    }
    const indexMatch = normalizedKey.match(/^(?:OPTION[_ -]?)?(\d+)$/);
    if (indexMatch) {
      const index = Number(indexMatch[1]);
      if (index >= 0 && index <= 25) result[String.fromCharCode(65 + index)] = text;
    }
  }
  return result;
}

export function isSpecificRationale(value: unknown, minChars: number = 40): boolean {
  const text = cleanText(value);
  if (text.length < minChars) return false;
  if (GENERIC_RATIONALE_PATTERNS.some((pattern) => pattern.test(text))) return false;
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 8) return false;
  return true;
}

export function isOptionBasedQuestion(questionType: string | null | undefined, options: NormalizedOption[]): boolean {
  const normalizedType = cleanText(questionType).toUpperCase().replace(/\s+/g, "_");
  if (OPTION_BASED_TYPES.has(normalizedType)) return true;
  return options.length >= 2;
}

function pushIssue(
  issues: QuestionQualityIssue[],
  field: string,
  code: string,
  severity: QuestionQualityIssue["severity"],
  message: string,
  repairable: boolean,
) {
  issues.push({ field, code, severity, message, repairable });
}

export function auditQuestionQuality(question: QuestionQualityRecord): QuestionQualityAudit {
  const issues: QuestionQualityIssue[] = [];
  const options = normalizeQuestionOptions(question.options);
  const correctLabels = normalizeCorrectAnswerLabels(question.correctAnswer, options);
  const distractorRationales = normalizeDistractorRationales(question.distractorRationales);
  const optionBased = isOptionBasedQuestion(question.questionType, options);

  if (cleanText(question.stem).length < 30) {
    pushIssue(issues, "stem", "stem_too_short", "blocker", "Stem is missing or too short to support a high-quality clinical question.", false);
  }

  if (optionBased) {
    if (options.length < 3) {
      pushIssue(issues, "options", "insufficient_options", "blocker", `Option-based question has ${options.length} usable options.`, false);
    }
    if (correctLabels.length === 0) {
      pushIssue(issues, "correct_answer", "missing_correct_answer", "blocker", "Correct answer cannot be resolved against the option bank.", false);
    }
    if (correctLabels.some((label) => !options.some((option) => option.label === label))) {
      pushIssue(issues, "correct_answer", "invalid_correct_answer", "blocker", "Correct answer references a label not present in the option bank.", false);
    }
  }

  const rationale = cleanText(question.rationale);
  if (rationale.length < 120 || rationale.split(/\s+/).filter(Boolean).length < 25) {
    pushIssue(issues, "rationale", "weak_rationale", "high", "Overall rationale must contain substantive clinical reasoning, not a short answer statement.", true);
  }

  if (!isSpecificRationale(question.correctAnswerExplanation, 60)) {
    pushIssue(issues, "correct_answer_explanation", "weak_correct_answer_explanation", "high", "Correct answer requires a focused, specific explanation.", true);
  }

  const requiredDistractorLabels = optionBased
    ? options.map((option) => option.label).filter((label) => !correctLabels.includes(label))
    : [];

  for (const label of requiredDistractorLabels) {
    if (!isSpecificRationale(distractorRationales[label], 40)) {
      pushIssue(
        issues,
        "distractor_rationales",
        "missing_or_weak_distractor_rationale",
        "high",
        `Option ${label} requires a specific clinical explanation of why it is incorrect or unsafe.`,
        true,
      );
    }
  }

  if (!isSpecificRationale(question.clinicalPearl, 40)) {
    pushIssue(issues, "clinical_pearl", "weak_clinical_pearl", "medium", "Clinical pearl must be a specific high-yield teaching point.", true);
  }

  if (cleanText(question.bodySystem).length < 2) {
    pushIssue(issues, "body_system", "missing_body_system", "medium", "Body system is required.", true);
  }
  if (cleanText(question.topic).length < 2) {
    pushIssue(issues, "topic", "missing_topic", "medium", "Topic is required.", true);
  }
  if (cleanText(question.subtopic).length < 2) {
    pushIssue(issues, "subtopic", "missing_subtopic", "low", "Subtopic is required for precise remediation and lesson mapping.", true);
  }

  let tags: unknown = question.tags;
  if (typeof tags === "string") {
    try { tags = JSON.parse(tags); } catch { tags = tags.split(",").map((tag) => tag.trim()).filter(Boolean); }
  }
  if (!Array.isArray(tags) || tags.filter((tag) => cleanText(tag).length > 1).length < 3) {
    pushIssue(issues, "tags", "insufficient_tags", "low", "At least three meaningful tags are required.", true);
  }

  if (!Number.isInteger(question.difficulty) || Number(question.difficulty) < 1 || Number(question.difficulty) > 4) {
    pushIssue(issues, "difficulty", "invalid_difficulty", "medium", "Difficulty must be an integer from 1 through 4.", true);
  }

  const cognitive = cleanText(question.cognitiveLevel).toLowerCase();
  if (!new Set(["recall", "understanding", "application", "analysis"]).has(cognitive)) {
    pushIssue(issues, "cognitive_level", "missing_cognitive_level", "low", "Cognitive level must be recall, understanding, application, or analysis.", true);
  }

  if (cleanText(question.regionScope).length < 2) {
    pushIssue(issues, "region_scope", "missing_region_scope", "medium", "Region scope is required to prevent cross-locale serving mistakes.", true);
  }

  const structuralValid = !issues.some((issue) => issue.severity === "blocker");
  const needsContentRepair = issues.some((issue) => issue.repairable);

  return {
    valid: issues.length === 0,
    structuralValid,
    needsContentRepair,
    issues,
    options,
    correctLabels,
    distractorRationales,
    requiredDistractorLabels,
  };
}

export function validateGeneratedQualityBundle(
  question: QuestionQualityRecord,
  generated: Partial<QuestionQualityRecord>,
): { valid: boolean; audit: QuestionQualityAudit; merged: QuestionQualityRecord } {
  const merged: QuestionQualityRecord = {
    ...question,
    rationale: generated.rationale ?? question.rationale,
    correctAnswerExplanation: generated.correctAnswerExplanation ?? question.correctAnswerExplanation,
    distractorRationales: generated.distractorRationales ?? question.distractorRationales,
    clinicalPearl: generated.clinicalPearl ?? question.clinicalPearl,
    bodySystem: generated.bodySystem ?? question.bodySystem,
    topic: generated.topic ?? question.topic,
    subtopic: generated.subtopic ?? question.subtopic,
    difficulty: generated.difficulty ?? question.difficulty,
    cognitiveLevel: generated.cognitiveLevel ?? question.cognitiveLevel,
    tags: generated.tags ?? question.tags,
    regionScope: generated.regionScope ?? question.regionScope,
    examStrategy: generated.examStrategy ?? question.examStrategy,
  };
  const audit = auditQuestionQuality(merged);
  return { valid: audit.valid, audit, merged };
}
