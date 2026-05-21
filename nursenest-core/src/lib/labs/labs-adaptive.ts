import { buildLabsHref, type ExamTargetParam } from "./exam-target";

export type AdaptiveLabRec = { label: string; href: string; rationale: string };

/** Pathway-aware nudges that close the loop between weak domains and the Labs hub. */
export function getAdaptiveLabRail(target: ExamTargetParam): AdaptiveLabRec[] {
  const base = buildLabsHref(target);
  const recs: AdaptiveLabRec[] = [];

  if (target === "REX_PN" || target === "NCLEX_PN") {
    recs.push({
      label: "Fluid & electrolyte remediation",
      href: `${base}&focus=bmp`,
      rationale: "PN pathways over-index BMP interpretation and safe correction pacing.",
    });
  }

  if (target === "NP" || target === "NCLEX_RN") {
    recs.push({
      label: "ABG compensation review",
      href: `${base}&focus=abg`,
      rationale: "Acid–base pairs show up heavily in acute-care and progressive stems.",
    });
  }

  recs.push(
    {
      label: "BMP clustering drill",
      href: `${base}&focus=bmp`,
      rationale: "Tie Na/K/Cr trends to perfusion, diuretics, and AKI categories.",
    },
    {
      label: "LFT pattern recognition",
      href: `${base}&focus=lft`,
      rationale: "Separate hepatocellular injury from cholestasis using ratio thinking.",
    },
    {
      label: "Coagulation surveillance",
      href: `${base}&focus=coag`,
      rationale: "Translate INR shifts into bleeding precautions and education priorities.",
    },
  );

  // Dedupe href while preserving order
  const seen = new Set<string>();
  return recs.filter((r) => {
    if (seen.has(r.href)) return false;
    seen.add(r.href);
    return true;
  }).slice(0, 5);
}
