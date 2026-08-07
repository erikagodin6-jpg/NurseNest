export type UsNpCramLegacyAlias = {
  canonicalSlug: string;
  titleAliases?: readonly string[];
  slugAliases?: readonly string[];
};

/**
 * Explicit, human-reviewed historical Full-lesson identities that are clinically
 * equivalent to a canonical U.S. NP Cram lesson. This is intentionally not a
 * fuzzy-matching table: every alias here must preserve the same learning objective.
 */
export const US_NP_CRAM_LEGACY_ALIASES = [
  {
    canonicalSlug: "peripheral-artery-disease",
    titleAliases: ["Peripheral Vascular Disease: ABI & Diagnostic Algorithm"],
  },
  {
    canonicalSlug: "venous-thromboembolism",
    titleAliases: ["DVT/PE Diagnostic Criteria: Wells Score, D-Dimer Algorithm & CTPA"],
  },
  {
    canonicalSlug: "valvular-heart-disease",
    titleAliases: ["Valvular Heart Disease: Auscultatory & Echocardiographic Criteria"],
  },
  {
    canonicalSlug: "pleural-effusion",
    titleAliases: ["Pleural Effusion: Light's Criteria & Thoracentesis Decision-Making"],
  },
  {
    canonicalSlug: "multiple-sclerosis",
    titleAliases: ["Multiple Sclerosis: McDonald Criteria & MRI Interpretation"],
  },
  {
    canonicalSlug: "cushing-syndrome-diagnostic-algorithm",
    titleAliases: ["Cushing Syndrome: Diagnostic Algorithm & Dexamethasone Suppression"],
    slugAliases: ["cushing-syndrome-diagnostic-np"],
  },
  {
    canonicalSlug: "sepsis-septic-shock",
    titleAliases: [
      "Sepsis: Cytokine Storm, Endothelial Dysfunction & Multi-Organ Failure",
      "Sepsis & Septic Shock: Cytokine Cascade and Organ Dysfunction",
    ],
  },
] as const satisfies readonly UsNpCramLegacyAlias[];
