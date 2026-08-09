import { normalizeLegacyClientQuestion } from "../../lib/legacy-question-contract";
import { rpnAdvancedVisualReplacements, rnAdvancedVisualReplacements, npAdvancedVisualReplacements } from "./advanced-visual-replacements";
import { rpnAdvancedStructuredReplacements, rnAdvancedStructuredReplacements, npAdvancedStructuredReplacements } from "./advanced-structured-replacements";
import { rpnAdvancedSataTrendReplacements, rnAdvancedSataTrendReplacements, npAdvancedSataTrendReplacements } from "./advanced-sata-trend-replacements";
import { rpnAdvancedOrderCaseReplacements, rnAdvancedOrderCaseReplacements, npAdvancedOrderCaseReplacements } from "./advanced-order-case-replacements";
import { np_advanced_mcq_01 } from "./np-advanced-mcq-01";
import { np_advanced_mcq_02 } from "./np-advanced-mcq-02";
import { np_advanced_mcq_03 } from "./np-advanced-mcq-03";
import { np_advanced_mcq_04 } from "./np-advanced-mcq-04";
import { np_advanced_mcq_05 } from "./np-advanced-mcq-05";
import { np_advanced_mcq_06 } from "./np-advanced-mcq-06";
import { np_advanced_mcq_07 } from "./np-advanced-mcq-07";
import { np_advanced_mcq_08 } from "./np-advanced-mcq-08";
import { np_advanced_mcq_09 } from "./np-advanced-mcq-09";
import { np_advanced_mcq_10 } from "./np-advanced-mcq-10";
import { np_advanced_mcq_11 } from "./np-advanced-mcq-11";
import { np_advanced_mcq_12 } from "./np-advanced-mcq-12";
import { rn_advanced_mcq_01 } from "./rn-advanced-mcq-01";
import { rn_advanced_mcq_02 } from "./rn-advanced-mcq-02";
import { rn_advanced_mcq_03 } from "./rn-advanced-mcq-03";
import { rn_advanced_mcq_04 } from "./rn-advanced-mcq-04";
import { rn_advanced_mcq_05 } from "./rn-advanced-mcq-05";
import { rn_advanced_mcq_06 } from "./rn-advanced-mcq-06";
import { rn_advanced_mcq_07 } from "./rn-advanced-mcq-07";
import { rn_advanced_mcq_08 } from "./rn-advanced-mcq-08";
import { rn_advanced_mcq_09 } from "./rn-advanced-mcq-09";
import { rn_advanced_mcq_10 } from "./rn-advanced-mcq-10";
import { rpn_advanced_mcq_01 } from "./rpn-advanced-mcq-01";
import { rpn_advanced_mcq_02 } from "./rpn-advanced-mcq-02";
import { rpn_advanced_mcq_03 } from "./rpn-advanced-mcq-03";
import { rpn_advanced_mcq_04 } from "./rpn-advanced-mcq-04";
import { rpn_advanced_mcq_05 } from "./rpn-advanced-mcq-05";
import { rpn_advanced_mcq_06 } from "./rpn-advanced-mcq-06";

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

// All historical advanced non-MCQ generator families are quarantined and replaced
// with authored canonical interactions. The remaining legacy MCQ source is deduped
// to its five unique items per tier and receives curated v2 teaching metadata.
const rpnAdvancedRaw: any[] = [
  ...rpnAdvancedVisualReplacements,
  ...rpnAdvancedStructuredReplacements,
  ...rpnAdvancedSataTrendReplacements,
  ...rpnAdvancedOrderCaseReplacements,
  ...rpn_advanced_mcq_01, ...rpn_advanced_mcq_02, ...rpn_advanced_mcq_03,
  ...rpn_advanced_mcq_04, ...rpn_advanced_mcq_05, ...rpn_advanced_mcq_06,
];

const rnAdvancedRaw: any[] = [
  ...rnAdvancedVisualReplacements,
  ...rnAdvancedStructuredReplacements,
  ...rnAdvancedSataTrendReplacements,
  ...rnAdvancedOrderCaseReplacements,
  ...rn_advanced_mcq_01, ...rn_advanced_mcq_02, ...rn_advanced_mcq_03,
  ...rn_advanced_mcq_04, ...rn_advanced_mcq_05, ...rn_advanced_mcq_06,
  ...rn_advanced_mcq_07, ...rn_advanced_mcq_08, ...rn_advanced_mcq_09,
  ...rn_advanced_mcq_10,
];

const npAdvancedRaw: any[] = [
  ...npAdvancedVisualReplacements,
  ...npAdvancedStructuredReplacements,
  ...npAdvancedSataTrendReplacements,
  ...npAdvancedOrderCaseReplacements,
  ...np_advanced_mcq_01, ...np_advanced_mcq_02, ...np_advanced_mcq_03,
  ...np_advanced_mcq_04, ...np_advanced_mcq_05, ...np_advanced_mcq_06,
  ...np_advanced_mcq_07, ...np_advanced_mcq_08, ...np_advanced_mcq_09,
  ...np_advanced_mcq_10, ...np_advanced_mcq_11, ...np_advanced_mcq_12,
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
