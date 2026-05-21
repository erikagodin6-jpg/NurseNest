export type ExamTargetParam = "NCLEX_RN" | "NCLEX_PN" | "REX_PN" | "NP" | "NEW_GRAD" | "GENERIC";

const ALLOWED = new Set<string>(["NCLEX_RN", "NCLEX_PN", "REX_PN", "NP", "NEW_GRAD", "GENERIC"]);

/**
 * Normalizes query-param or stored user profile values to a stable exam target key.
 */
export function parseExamTarget(raw: string | null | undefined): ExamTargetParam {
  if (!raw) return "NCLEX_RN";
  const trimmed = raw.trim();
  const upper = trimmed.toUpperCase().replace(/-/g, "_");
  if (ALLOWED.has(upper)) return upper as ExamTargetParam;
  const lower = trimmed.toLowerCase();
  if (lower.includes("np") && !lower.includes("pn")) return "NP";
  if (lower.includes("rex") || lower === "rpn" || lower.includes("rpn") || lower.includes("lvn") || lower.includes("lpn")) {
    return "REX_PN";
  }
  if (lower.includes("nclex_pn") || lower.includes("nclex-pn") || lower === "pn") return "NCLEX_PN";
  if (lower.includes("new_grad") || lower.includes("newgrad") || lower.includes("graduate")) return "NEW_GRAD";
  if (lower.includes("nclex_rn") || lower.includes("nclex-rn") || lower.includes("rn")) return "NCLEX_RN";
  return "NCLEX_RN";
}

export function buildLabsHref(examTarget: ExamTargetParam, focus?: string | null): string {
  const q = new URLSearchParams({ examTarget });
  if (focus) q.set("focus", focus);
  return `/app/labs?${q.toString()}`;
}
