import type { CountryCode, ExamFamily, TierCode } from "@prisma/client";

export type NormalizedLegacyQuestion = {
  legacyId: string;
  stem: string;
  options: string[];
  answerKey: string[];
  rationale: string;
  categoryLabel: string;
  topic?: string;
  country: CountryCode;
  /** 1–5 scale from legacy, if any */
  difficultyNum?: number;
  /** Present for server seed / exam JSON rows */
  tier?: TierCode;
  examFamily?: ExamFamily;
};

function countryFromRegion(v: unknown): CountryCode {
  if (v === "US") return "US";
  if (v === "CA") return "CA";
  return "CA";
}

/** Normalize various legacy JSON row shapes to a single structure. */
export function normalizeLegacyQuestionRow(row: unknown, fallbackId: string): NormalizedLegacyQuestion | null {
  if (!row || typeof row !== "object") return null;
  const o = row as Record<string, unknown>;

  // Shape A: client career-questions (array items)
  if (typeof o.stem === "string" && Array.isArray(o.options) && typeof o.correctIndex === "number") {
    const options = o.options.map((x) => String(x));
    const idx = o.correctIndex;
    if (idx < 0 || idx >= options.length) return null;
    const rationale = typeof o.rationale === "string" ? o.rationale.trim() : "";
    if (!rationale) return null;
    const id = typeof o.id === "string" ? o.id : fallbackId;
    const categoryLabel = typeof o.category === "string" && o.category.trim() ? o.category.trim() : "General";
    return {
      legacyId: id,
      stem: o.stem.trim(),
      options,
      answerKey: [options[idx]],
      rationale,
      categoryLabel,
      topic: typeof o.topic === "string" ? o.topic : undefined,
      country: countryFromRegion(o.regionScope),
      difficultyNum: typeof o.difficulty === "number" ? o.difficulty : undefined,
    };
  }

  // Shape B: server seed exam-questions (correct_answer indices)
  if (typeof o.stem === "string" && Array.isArray(o.options) && Array.isArray(o.correct_answer)) {
    const options = o.options.map((x) => String(x));
    const indices = o.correct_answer as number[];
    if (indices.length === 0) return null;
    const answerKey = indices
      .filter((i) => typeof i === "number" && i >= 0 && i < options.length)
      .map((i) => options[i]);
    if (answerKey.length === 0) return null;
    const rationale = typeof o.rationale === "string" ? o.rationale.trim() : "";
    if (!rationale) return null;
    const id =
      typeof o.stem_hash === "string"
        ? `legacy-${o.stem_hash}`
        : typeof o.id === "string"
          ? o.id
          : fallbackId;
    const cat =
      typeof o.body_system === "string" && o.body_system.trim()
        ? o.body_system.trim()
        : typeof o.category === "string" && o.category.trim()
          ? String(o.category).trim()
          : "General";
    const tier = mapSeedTier(o.tier);
    const examFamily = mapSeedExamFamily(o.exam, tier);
    return {
      legacyId: id,
      stem: o.stem.trim(),
      options,
      answerKey: [...new Set(answerKey)],
      rationale,
      categoryLabel: cat,
      topic: typeof o.topic === "string" ? o.topic : undefined,
      country: countryFromRegion(o.region_scope),
      difficultyNum: typeof o.difficulty === "number" ? o.difficulty : undefined,
      tier,
      examFamily,
    };
  }

  return null;
}

function mapSeedTier(v: unknown): TierCode | undefined {
  const t = String(v ?? "").toLowerCase();
  if (t === "np") return "NP";
  if (t === "rpn") return "RPN";
  if (t === "rn") return "RN";
  if (t === "allied") return "ALLIED";
  if (t === "lvn" || t === "lpn" || t === "pn") return "LVN_LPN";
  return undefined;
}

function mapSeedExamFamily(exam: unknown, tier?: TierCode): ExamFamily | undefined {
  const e = String(exam ?? "").toUpperCase();
  if (e.includes("NCLEX") && e.includes("RN")) return "NCLEX_RN";
  if (e.includes("NCLEX") && (e.includes("PN") || e.includes("P.N"))) return "NCLEX_PN";
  if (e.includes("REX") || e.includes("REX-PN")) return "REX_PN";
  if (e.includes("AANP") || e.includes("ANCC") || e.includes("NP") || tier === "NP") return "NP";
  if (tier === "ALLIED") return "ALLIED";
  return undefined;
}
