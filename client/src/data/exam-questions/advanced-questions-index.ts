import { normalizeLegacyClientQuestion } from "../../lib/legacy-question-contract";
import { rpnAdvancedVisualReplacements, rnAdvancedVisualReplacements, npAdvancedVisualReplacements } from "./advanced-visual-replacements";
import { rpnAdvancedStructuredReplacements, rnAdvancedStructuredReplacements, npAdvancedStructuredReplacements } from "./advanced-structured-replacements";
import { rpnAdvancedSataTrendReplacements, rnAdvancedSataTrendReplacements, npAdvancedSataTrendReplacements } from "./advanced-sata-trend-replacements";
import { rpnAdvancedOrderCaseReplacements, rnAdvancedOrderCaseReplacements, npAdvancedOrderCaseReplacements } from "./advanced-order-case-replacements";
import { rpnAdvancedMcqReplacements, rnAdvancedMcqReplacements, npAdvancedMcqReplacements } from "./advanced-mcq-replacements";

function normalizeText(value: unknown): string {
  return String(value ?? "").toLowerCase().replace(/\s+/g, " ").replace(/[.!?,;:]+$/g, "").trim();
}

function stableStructuredValue(row: any): string {
  const payload = row?.interactionPayload ?? row?.items ?? row?.rows ?? row?.columns ?? row?.timepoints ?? row?.timePoints ?? row?.timeline ?? row?.questions ?? row?.subQuestions ?? row?.conditionOptions ?? row?.actionOptions ?? row?.monitorOptions ?? null;
  if (!payload) return "";
  try { return JSON.stringify(payload); } catch { return String(payload); }
}

function advancedFingerprint(row: any): string {
  const stem = normalizeText(row?.stem || row?.question || row?.questionText);
  const flatOptions = Array.isArray(row?.options)
    ? row.options.map((option: any) => normalizeText(typeof option === "object" && option ? (option.text ?? option.content ?? option.value ?? option.label) : option)).join("||")
    : "";
  const structured = normalizeText(stableStructuredValue(row));
  const type = normalizeText(row?.questionType || row?.question_type || row?.type || row?.mode || "unknown");
  return `${type}::${stem}::${flatOptions}::${structured}`;
}

function dedupeAdvancedRows(rows: any[]): any[] {
  const seen = new Set<string>();
  const out: any[] = [];
  for (const row of rows) {
    const fingerprint = advancedFingerprint(row);
    if (fingerprint !== "unknown::::::" && seen.has(fingerprint)) continue;
    if (fingerprint !== "unknown::::::") seen.add(fingerprint);
    out.push(row);
  }
  return out;
}

function normalizeAdvancedRows(rows: any[], tier: "rpn" | "rn" | "np"): any[] {
  return dedupeAdvancedRows(rows).map((candidate, index) => {
    if (!Array.isArray(candidate?.options) || candidate.options.length === 0) return candidate;
    return normalizeLegacyClientQuestion(candidate, index, {
      countryLabels: ["Canada", "United States"],
      regionScope: "BOTH",
      languageCode: "en",
      exam: candidate.exam || (tier === "rpn" ? "REx-PN/NCLEX-PN" : tier === "rn" ? "NCLEX-RN" : "NP Certification"),
    });
  });
}

// The advanced learner estate is replacement-authored. Historical generator files are
// retained only in quarantine for audit history and are no longer imported here.
const rpnAdvancedRaw: any[] = [
  ...rpnAdvancedVisualReplacements,
  ...rpnAdvancedStructuredReplacements,
  ...rpnAdvancedSataTrendReplacements,
  ...rpnAdvancedOrderCaseReplacements,
  ...rpnAdvancedMcqReplacements,
];

const rnAdvancedRaw: any[] = [
  ...rnAdvancedVisualReplacements,
  ...rnAdvancedStructuredReplacements,
  ...rnAdvancedSataTrendReplacements,
  ...rnAdvancedOrderCaseReplacements,
  ...rnAdvancedMcqReplacements,
];

const npAdvancedRaw: any[] = [
  ...npAdvancedVisualReplacements,
  ...npAdvancedStructuredReplacements,
  ...npAdvancedSataTrendReplacements,
  ...npAdvancedOrderCaseReplacements,
  ...npAdvancedMcqReplacements,
];

export const rpnAdvancedQuestions: any[] = normalizeAdvancedRows(rpnAdvancedRaw, "rpn");
export const rnAdvancedQuestions: any[] = normalizeAdvancedRows(rnAdvancedRaw, "rn");
export const npAdvancedQuestions: any[] = normalizeAdvancedRows(npAdvancedRaw, "np");

export const allAdvancedQuestions: any[] = [
  ...rpnAdvancedQuestions,
  ...rnAdvancedQuestions,
  ...npAdvancedQuestions,
];

export function getAdvancedQuestionsByTier(tier: string): any[] {
  switch (tier.toLowerCase()) {
    case "rpn": return rpnAdvancedQuestions;
    case "rn": return rnAdvancedQuestions;
    case "np": return npAdvancedQuestions;
    default: return [];
  }
}

export function getAdvancedQuestionsByType(tier: string, questionType: string): any[] {
  const expected = String(questionType || "").toUpperCase().replace(/[\s-]+/g, "_");
  return getAdvancedQuestionsByTier(tier).filter((q: any) => {
    const actual = String(q.questionType || q.type || "").toUpperCase().replace(/[\s-]+/g, "_");
    return actual === expected || q.tags?.includes(questionType) || q.tags?.includes(String(questionType).toLowerCase());
  });
}

export function getAdvancedQuestionsBySystem(tier: string, bodySystem: string): any[] {
  return getAdvancedQuestionsByTier(tier).filter((q: any) => q.bodySystem === bodySystem);
}

export function getAdvancedQuestionCounts(): Record<string, { total: number; byType: Record<string, number> }> {
  const tiers = { rpn: rpnAdvancedQuestions, rn: rnAdvancedQuestions, np: npAdvancedQuestions };
  const result: Record<string, { total: number; byType: Record<string, number> }> = {};
  for (const [tier, questions] of Object.entries(tiers)) {
    const byType: Record<string, number> = {};
    for (const q of questions) {
      const type = String(q.questionType || q.type || "unknown").toUpperCase();
      byType[type] = (byType[type] || 0) + 1;
    }
    result[tier] = { total: questions.length, byType };
  }
  return result;
}
