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
import {
  enrichNursingExamItemMetadata,
  loadManualMappingCached,
  type EnrichmentAudit,
  type NursingEnrichmentContext,
} from "./nursing-exam-metadata-enrich";

export type { EnrichmentAudit, NursingEnrichmentContext } from "./nursing-exam-metadata-enrich";

export const NURSING_EXAM_TARGET_TABLE = "exam_questions" as const;

/** When provided, tier/exam are enriched identically for validate / audit / dry-run / import. */
export type NursingParseContext = NursingEnrichmentContext & {
  /** Repo root for config/nursing-export-metadata-mapping.json (default: cwd). */
  repoRoot?: string;
};

export type ParsedAiCacheItem =
  | { kind: "flashcard" }
  | { kind: "inconclusive"; mapErrors: string[]; enrichment?: EnrichmentAudit }
  | { kind: "exam_mcq"; value: MappedExamQuestion; enrichment?: EnrichmentAudit };

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
export function parseAiCacheNursingExamItem(item: Record<string, unknown>, ctx?: NursingParseContext): ParsedAiCacheItem {
  const front = item.front;
  const back = item.back;
  const hasFront = typeof front === "string" && typeof back === "string";
  if (hasFront && front.length > 2 && back.length > 2) {
    return { kind: "flashcard" };
  }

  const repoRoot = ctx?.repoRoot ?? process.cwd();
  let itemToMap: Record<string, unknown> = item;
  let enrichment: EnrichmentAudit | undefined;
  if (ctx) {
    const manual = loadManualMappingCached(repoRoot);
    const { merged, audit } = enrichNursingExamItemMetadata(item, ctx, manual);
    itemToMap = merged;
    enrichment = audit;
  }

  const m = mapLegacyItemToExamQuestion(itemToMap);
  if (m.ok && m.value) {
    return { kind: "exam_mcq", value: m.value, enrichment };
  }
  return {
    kind: "inconclusive",
    mapErrors: m.errors?.length ? m.errors : ["map_failed"],
    enrichment,
  };
}

export function buildNursingParseContext(
  row: Record<string, unknown>,
  opts: {
    exportDirAbs: string;
    sourceFileName: string;
    rowIndex: number;
    outputItemIndex: number;
    repoRoot?: string;
  },
): NursingParseContext {
  const cacheKey =
    typeof row.cache_key === "string"
      ? row.cache_key
      : typeof row.cacheKey === "string"
        ? row.cacheKey
        : null;
  return {
    sourceFileName: opts.sourceFileName,
    exportDirAbs: opts.exportDirAbs,
    cacheKey,
    rowIndex: opts.rowIndex,
    outputItemIndex: opts.outputItemIndex,
    parentRow: row,
    repoRoot: opts.repoRoot,
  };
}

export {
  iterateAiCacheOutputItems,
  mapLegacyItemToExamQuestion,
  normalizeOptionsForExamQuestion,
  stemHashHex,
};
