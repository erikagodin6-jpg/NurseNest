import { ContentStatus, QuestionType as QT, type DifficultyBand, type ExamFamily, type QuestionType } from "@prisma/client";
import { validateQuestionForPublish } from "@/lib/content/publish-validation";
import { validateQuestionPayload } from "@/lib/content/question-schema";

export type QuestionQualityInput = {
  id: string;
  stem: string;
  rationale: string;
  questionType: QuestionType;
  options: unknown;
  answerKey: unknown;
  status: ContentStatus;
  examFamily: ExamFamily;
  difficulty: DifficultyBand | null;
  topicTag: string | null;
  systemTag: string | null;
  tags: string[];
  lessonId: string | null;
  duplicateOfId: string | null;
  stemHash: string | null;
};

export type QuestionQualityResult = {
  id: string;
  critical: string[];
  quality: string[];
  /** When true, item should not appear in learner pools until cleared. */
  shouldFlagNeedsReview: boolean;
};

const RATIONALE_STRONG_MIN = 120;
const RATIONALE_WEAK_MIN = 60;

function optionStrings(options: unknown): string[] {
  if (!Array.isArray(options)) return [];
  return options.map((x) => String(x).trim()).filter(Boolean);
}

function uniqueOptions(options: unknown): boolean {
  const s = optionStrings(options);
  return new Set(s).size === s.length;
}

function answerKeyInOptions(options: unknown, answerKey: unknown): boolean {
  const opts = new Set(optionStrings(options).map((x) => x.toLowerCase()));
  if (opts.size === 0) return false;
  const keys = Array.isArray(answerKey) ? answerKey.map((x) => String(x).trim().toLowerCase()) : [String(answerKey ?? "").toLowerCase()];
  return keys.every((k) => k && opts.has(k));
}

/**
 * Deterministic quality analysis for questions. Critical issues block learner visibility when applied to DB.
 */
export function analyzeQuestionQuality(
  q: QuestionQualityInput,
  opts: { strictTags?: boolean; markWeakRationale?: boolean; stemHashDuplicateCount?: number } = {},
): QuestionQualityResult {
  const critical: string[] = [];
  const quality: string[] = [];

  if (q.duplicateOfId) {
    critical.push("marked_duplicate_of_other_question");
  }

  const dupN = opts.stemHashDuplicateCount;
  if (typeof dupN === "number" && dupN > 1 && q.stemHash) {
    critical.push("duplicate_stem_hash_in_catalog");
  }

  if (q.status === ContentStatus.PUBLISHED) {
    const pub = validateQuestionForPublish({
      stem: q.stem,
      rationale: q.rationale,
      questionType: q.questionType,
      options: q.options,
      answerKey: q.answerKey,
    });
    if (!pub.ok) {
      critical.push(...pub.reasons.map((r) => `publish_gate:${r}`));
    }
  }

  const shapeErr = validateQuestionPayload(q.questionType, q.options, q.answerKey);
  if (shapeErr) critical.push(`schema:${shapeErr}`);

  if (!uniqueOptions(q.options)) {
    critical.push("duplicate_option_text");
  }

  if (q.questionType !== QT.FIB_NUMERIC && !answerKeyInOptions(q.options, q.answerKey)) {
    critical.push("answer_key_not_subset_of_options");
  }

  const r = q.rationale.trim();
  if (r.length === 0) {
    critical.push("missing_rationale");
  } else if (r.length < RATIONALE_WEAK_MIN) {
    quality.push("rationale_too_short_for_clinical_standard");
    if (opts.markWeakRationale) {
      critical.push("rationale_below_minimum");
    }
  } else if (r.length < RATIONALE_STRONG_MIN) {
    quality.push("rationale_may_need_expansion_for_exam_standard");
    if (opts.markWeakRationale) {
      critical.push("rationale_below_exam_standard_length");
    }
  }

  const hasTopic = !!(q.topicTag?.trim() || q.tags.length);
  const hasSystem = !!q.systemTag?.trim();
  if (opts.strictTags && (!hasTopic || !hasSystem)) {
    critical.push("missing_topic_or_system_tagging");
  } else if (!hasTopic || !hasSystem) {
    quality.push("incomplete_metadata_tags");
  }

  if (!q.lessonId) {
    quality.push("no_linked_lesson_optional");
  }

  const lower = r.toLowerCase();
  if (r.length >= RATIONALE_WEAK_MIN && !/(incorrect|wrong|not|avoid|instead|because|therefore)/i.test(lower)) {
    quality.push("rationale_may_lack_distractor_explanation");
  }

  const shouldFlagNeedsReview = critical.length > 0;

  return { id: q.id, critical, quality, shouldFlagNeedsReview };
}
