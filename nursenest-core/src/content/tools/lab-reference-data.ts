/** Common adult reference intervals — educational; institution-specific ranges may differ. */

export type LabRow = { name: string; interval: string; notes?: string };

export type LabPanel = { id: string; titleKey: string; rows: LabRow[] };

export const LAB_PANELS: readonly LabPanel[] = [
  {
    id: "bmp",
    titleKey: "tools.labReference.panelBmp",
    rows: [
      { name: "Sodium (Na+)", interval: "136–145 mEq/L" },
      { name: "Potassium (K+)", interval: "3.5–5.0 mEq/L" },
      { name: "Chloride (Cl-)", interval: "98–107 mEq/L" },
      { name: "CO₂ (bicarbonate)", interval: "22–28 mEq/L" },
      { name: "BUN", interval: "7–20 mg/dL (lab-specific)" },
      { name: "Creatinine", interval: "0.7–1.3 mg/dL (male); 0.6–1.1 mg/dL (female) — eGFR context matters" },
      { name: "Glucose (fasting)", interval: "70–99 mg/dL" },
    ],
  },
  {
    id: "cbc",
    titleKey: "tools.labReference.panelCbc",
    rows: [
      { name: "WBC", interval: "4.5–11.0 × 10³/µL" },
      { name: "Hemoglobin", interval: "13.5–17.5 g/dL (male); 12.0–15.5 g/dL (female)" },
      { name: "Hematocrit", interval: "41–53% (male); 36–46% (female)" },
      { name: "Platelets", interval: "150–400 × 10³/µL" },
    ],
  },
  {
    id: "liver",
    titleKey: "tools.labReference.panelLiver",
    rows: [
      { name: "ALT", interval: "7–56 U/L (male); 7–45 U/L (female) — lab-specific" },
      { name: "AST", interval: "10–40 U/L — lab-specific" },
      { name: "ALP", interval: "44–147 U/L — lab-specific" },
      { name: "Bilirubin (total)", interval: "0.1–1.2 mg/dL" },
      { name: "Albumin", interval: "3.5–5.0 g/dL" },
    ],
  },
  {
    id: "coag",
    titleKey: "tools.labReference.panelCoag",
    rows: [
      { name: "PT", interval: "11–13.5 seconds — institution-specific" },
      { name: "INR", interval: "0.9–1.1 (not on warfarin)" },
      { name: "aPTT", interval: "25–35 seconds — institution-specific" },
    ],
  },
];
