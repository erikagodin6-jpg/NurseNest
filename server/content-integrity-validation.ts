import {
  validateContentLanguage,
  checkTerminologyConsistency,
  checkPublishingGate,
  type LanguageValidationReport,
} from "./language-enforcement";

export interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
  autoFixSuggestion?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  languageValidation?: LanguageValidationReport;
}

export function validateQuestion(data: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data.stem || typeof data.stem !== "string" || data.stem.trim().length < 10) {
    errors.push({ field: "stem", message: "Question stem is required and must be at least 10 characters", severity: "error" });
  }

  const options = Array.isArray(data.options) ? data.options : [];
  if (options.length < 4) {
    errors.push({ field: "options", message: `At least 4 answer options are required (found ${options.length})`, severity: "error" });
  }

  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const text = typeof opt === "string" ? opt : opt?.text;
    if (!text || text.trim().length === 0) {
      errors.push({ field: `options[${i}]`, message: `Option ${String.fromCharCode(65 + i)} is empty`, severity: "error" });
    }
  }

  if (data.correctAnswer === undefined || data.correctAnswer === null ||
      (Array.isArray(data.correctAnswer) && data.correctAnswer.length === 0)) {
    errors.push({ field: "correctAnswer", message: "Correct answer must be specified", severity: "error" });
  }

  if (!data.tier) {
    errors.push({ field: "tier", message: "Tier is required", severity: "error" });
  }

  if (!data.rationale || (typeof data.rationale === "string" && data.rationale.trim().length < 20)) {
    errors.push({ field: "rationale", message: "Rationale is required for publishing (min 20 characters)", severity: "error", autoFixSuggestion: "ai_generate_rationale" });
  }

  if (!data.isAdaptiveEligible) {
    if (!data.correctAnswerExplanation || (typeof data.correctAnswerExplanation === "string" && data.correctAnswerExplanation.trim().length === 0)) {
      warnings.push({ field: "correctAnswerExplanation", message: "Correct answer explanation is missing", severity: "warning", autoFixSuggestion: "ai_generate_rationale" });
    }

    if (!data.distractorRationales || (typeof data.distractorRationales === "object" && Object.keys(data.distractorRationales).length === 0)) {
      warnings.push({ field: "distractorRationales", message: "Distractor rationales are missing", severity: "warning", autoFixSuggestion: "ai_generate_rationale" });
    }

    if (!data.clinicalPearl || (typeof data.clinicalPearl === "string" && data.clinicalPearl.trim().length === 0)) {
      warnings.push({ field: "clinicalPearl", message: "Clinical pearl is missing", severity: "warning", autoFixSuggestion: "ai_generate_rationale" });
    }
  }

  if (!data.bodySystem) {
    warnings.push({ field: "bodySystem", message: "Body system is not set", severity: "warning", autoFixSuggestion: "ai_infer_metadata" });
  }

  if (!data.topic) {
    warnings.push({ field: "topic", message: "Topic is not set", severity: "warning", autoFixSuggestion: "ai_infer_metadata" });
  }

  if (!data.tags || (Array.isArray(data.tags) && data.tags.length === 0)) {
    warnings.push({ field: "tags", message: "No tags assigned", severity: "warning", autoFixSuggestion: "ai_infer_metadata" });
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateFlashcard(data: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data.front || typeof data.front !== "string" || data.front.trim().length < 3) {
    errors.push({ field: "front", message: "Front of flashcard is required (min 3 characters)", severity: "error" });
  }

  if (!data.back || typeof data.back !== "string" || data.back.trim().length < 3) {
    errors.push({ field: "back", message: "Back of flashcard is required (min 3 characters)", severity: "error" });
  }

  if (!data.deckId) {
    warnings.push({ field: "deckId", message: "Flashcard is not assigned to a deck", severity: "warning" });
  }

  if (!data.tags || (Array.isArray(data.tags) && data.tags.length === 0)) {
    warnings.push({ field: "tags", message: "No tags assigned", severity: "warning", autoFixSuggestion: "ai_infer_metadata" });
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateLesson(data: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data.title || typeof data.title !== "string" || data.title.trim().length < 3) {
    errors.push({ field: "title", message: "Lesson title is required (min 3 characters)", severity: "error" });
  }

  if (!data.slug || typeof data.slug !== "string" || data.slug.trim().length < 2) {
    errors.push({ field: "slug", message: "Lesson slug is required", severity: "error" });
  }

  if (!data.seoTitle) {
    warnings.push({ field: "seoTitle", message: "SEO title is missing", severity: "warning", autoFixSuggestion: "ai_generate_seo" });
  }

  if (!data.seoDescription) {
    warnings.push({ field: "seoDescription", message: "SEO description is missing", severity: "warning", autoFixSuggestion: "ai_generate_seo" });
  }

  if (!data.tier) {
    warnings.push({ field: "tier", message: "Tier is not set", severity: "warning" });
  }

  const hasSubstantiveContent = data.definition || data.pathophysiology ||
    (Array.isArray(data.signsSymptoms) && data.signsSymptoms.length > 0) ||
    (Array.isArray(data.treatment) && data.treatment.length > 0) ||
    (Array.isArray(data.nursingInterventions) && data.nursingInterventions.length > 0);
  if (!hasSubstantiveContent) {
    warnings.push({ field: "content", message: "Lesson has no substantive content sections filled", severity: "warning" });
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateBlogPost(data: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!data.title || typeof data.title !== "string" || data.title.trim().length < 5) {
    errors.push({ field: "title", message: "Title is required (min 5 characters)", severity: "error" });
  }

  if (!data.slug || typeof data.slug !== "string") {
    errors.push({ field: "slug", message: "Slug is required", severity: "error" });
  }

  if (!data.content) {
    errors.push({ field: "content", message: "Content is required", severity: "error" });
  }

  if (!data.metaTitle) {
    warnings.push({ field: "metaTitle", message: "Meta title is missing", severity: "warning", autoFixSuggestion: "ai_generate_seo" });
  }

  if (!data.metaDescription) {
    warnings.push({ field: "metaDescription", message: "Meta description is missing", severity: "warning", autoFixSuggestion: "ai_generate_seo" });
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateForPublish(contentType: string, data: any, targetLanguage?: string): ValidationResult {
  let result: ValidationResult;
  switch (contentType) {
    case "question":
    case "questions":
    case "exam_question":
      result = validateQuestion(data);
      break;
    case "flashcard":
    case "flashcards":
      result = validateFlashcard(data);
      break;
    case "lesson":
    case "lessons":
      result = validateLesson(data);
      break;
    case "blog":
    case "blog-post":
    case "article":
    case "blogs":
      result = validateBlogPost(data);
      break;
    default:
      result = { valid: true, errors: [], warnings: [] };
  }

  if (targetLanguage) {
    const langResult = validateLanguageForPublish(data, targetLanguage, contentType);
    result.errors.push(...langResult.errors);
    result.warnings.push(...langResult.warnings);
    result.languageValidation = langResult.languageValidation;
    if (langResult.errors.length > 0) {
      result.valid = false;
    }
  }

  return result;
}

export function validateLanguageForPublish(
  data: any,
  targetLanguage: string,
  contentType: string
): { errors: ValidationError[]; warnings: ValidationError[]; languageValidation?: LanguageValidationReport } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!targetLanguage || targetLanguage === "en") {
    return { errors, warnings };
  }

  const { passed: langPassed, fieldResults } = validateContentLanguage(data, targetLanguage);
  const { passed: termPassed, violations } = checkTerminologyConsistency(data, targetLanguage);

  if (!langPassed) {
    const failedFields = Object.entries(fieldResults)
      .filter(([, v]) => !v.passed)
      .map(([k]) => k);
    errors.push({
      field: "language",
      message: `Language validation failed for fields: ${failedFields.join(", ")}. Expected: ${targetLanguage}`,
      severity: "error",
    });
  }

  if (!termPassed) {
    for (const violation of violations) {
      warnings.push({
        field: violation.field,
        message: `Clinical terminology mismatch: found "${violation.found}", expected "${violation.expected}" in ${targetLanguage}`,
        severity: "warning",
      });
    }
  }

  const languageValidation: LanguageValidationReport = {
    requested_language: targetLanguage,
    detected_language: Object.values(fieldResults)[0]?.detected || targetLanguage,
    field_validation: fieldResults,
    validation_passed: langPassed,
    terminology_check_passed: termPassed,
    retry_count: 0,
    status: langPassed && termPassed ? "validated" : "validation_failed",
  };

  const gate = checkPublishingGate(languageValidation);
  if (!gate.allowed) {
    errors.push({
      field: "publishing_gate",
      message: `Publishing blocked: ${gate.reasons.join("; ")}`,
      severity: "error",
    });
  }

  return { errors, warnings, languageValidation };
}
