/**
 * Shared extraction/normalization for ai_cache.output_json → nursing exam rows.
 * Schema source of truth: shared/schema.ts `examQuestions` (table `exam_questions`).
 *
 * Individual MCQ line items from legacy exports map to **exam_questions**.
 * **qbank_drafts** is for bundled draft banks (title/slug/questions_json metadata), not per-line
 * ai_cache items — do not route single parsed MCQs there from this pipeline.
 */
import {
  iterateAiCacheOutputItems,
  mapLegacyItemToExamQuestion,
  normalizeOptionsForExamQuestion,
  stemHashHex,
  type MappedExamQuestion,
} from "./field-maps/exam-question-from-legacy";

export const NURSING_EXAM_TARGET_TABLE = "exam_questions" as const;

export type ParsedAiCacheItem =
  | { kind: "flashcard" }
  | { kind: "inconclusive"; mapErrors: string[] }
  | { kind: "exam_mcq"; value: MappedExamQuestion };

/** Parse stringified JSON from some exports into a value suitable for iterateAiCacheOutputItems. */
export function normalizeAiCacheOutputJson(raw: unknown): unknown {
  if (raw === undefined || raw === null) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  }
  return raw;
}

/**
 * Classify and map one object from inside output_json (after array iteration).
 * Flashcard-shaped rows are detected first; otherwise we require a successful
 * mapLegacyItemToExamQuestion (same rules as the validator).
 */
export function parseAiCacheNursingExamItem(item: Record<string, unknown>): ParsedAiCacheItem {
  const front = item.front;
  const back = item.back;
  const hasFront = typeof front === "string" && typeof back === "string";
  if (hasFront && front.length > 2 && back.length > 2) {
    return { kind: "flashcard" };
  }
  const m = mapLegacyItemToExamQuestion(item);
  if (m.ok && m.value) {
    return { kind: "exam_mcq", value: m.value };
  }
  return { kind: "inconclusive", mapErrors: m.errors?.length ? m.errors : ["map_failed"] };
}

export {
  iterateAiCacheOutputItems,
  mapLegacyItemToExamQuestion,
  normalizeOptionsForExamQuestion,
  stemHashHex,
};
