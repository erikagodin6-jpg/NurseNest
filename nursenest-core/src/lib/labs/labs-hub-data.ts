export type LabTrend = readonly [number, number, number, number, number];

export type LabAnalyteRow = {
  id: string;
  label: string;
  sampleValue: string;
  unit: string;
  refLow: number;
  refHigh: number;
  /** Position of marker on reference bar (same units as ref range). */
  markerValue: number;
  trend: LabTrend;
  interpretation: string;
  significance: string;
  /** Highlights values that warrant prompt follow-up in practice (educational framing, not alarmist). */
  attentionRange?: boolean;
};

export type LabPanel = {
  id: string;
  title: string;
  subtitle: string;
  analytes: LabAnalyteRow[];
};

export const LAB_PANELS: readonly LabPanel[] = [
  {
    id: "bmp",
    title: "BMP — renal & electrolyte core",
    subtitle: "Sodium, potassium, renal indices, and acid–base surrogates",
    analytes: [
      {
        id: "na",
        label: "Sodium",
        sampleValue: "128",
        unit: "mEq/L",
        refLow: 136,
        refHigh: 145,
        markerValue: 128,
        trend: [140, 138, 135, 132, 128],
        interpretation: "Hyponatremia in this range usually reflects dilution or sodium loss; correlate volume status and urine osmolality on exams.",
        significance: "Prioritize safety: seizure threshold risk rises as Na falls; gradual correction targets are high yield.",
        attentionRange: true,
      },
      {
        id: "k",
        label: "Potassium",
        sampleValue: "5.6",
        unit: "mEq/L",
        refLow: 3.5,
        refHigh: 5.0,
        markerValue: 5.6,
        trend: [4.1, 4.4, 4.8, 5.1, 5.6],
        interpretation: "Mild hyperkalemia prompts ECG vigilance and repeat sampling; hemolysis and acidemia can falsely elevate serum K⁺.",
        significance: "Link to renal perfusion, RAAS blockers, and tissue breakdown vignettes.",
        attentionRange: true,
      },
      {
        id: "cr",
        label: "Creatinine",
        sampleValue: "1.9",
        unit: "mg/dL",
        refLow: 0.7,
        refHigh: 1.2,
        markerValue: 1.9,
        trend: [0.9, 1.0, 1.2, 1.5, 1.9],
        interpretation: "Rising creatinine with BUN context distinguishes prerenal vs intrinsic patterns.",
        significance: "Pair with I&O, urine studies, and medication review in clinical judgment items.",
      },
    ],
  },
  {
    id: "cbc",
    title: "CBC — oxygen delivery & infection screen",
    subtitle: "Hemoglobin, hematocrit, white cells, platelets",
    analytes: [
      {
        id: "hgb",
        label: "Hemoglobin",
        sampleValue: "8.6",
        unit: "g/dL",
        refLow: 12,
        refHigh: 16,
        markerValue: 8.6,
        trend: [11.8, 11.2, 10.1, 9.4, 8.6],
        interpretation: "Symptomatic anemia thresholds depend on comorbidity; chronic vs acute blood loss narratives change priority actions.",
        significance: "Transfusion decisions are policy- and vitals-driven; exams test recognition, not ordering in isolation.",
        attentionRange: true,
      },
      {
        id: "wbc",
        label: "WBC",
        sampleValue: "14.2",
        unit: "×10³/µL",
        refLow: 4.5,
        refHigh: 11,
        markerValue: 14.2,
        trend: [7.2, 8.1, 9.8, 12.4, 14.2],
        interpretation: "Leukocytosis is nonspecific—pair bandemia/left shift with source control and sepsis bundles when fever is present.",
        significance: "Differentiate stress response from infection vs inflammatory mimics.",
      },
    ],
  },
  {
    id: "lft",
    title: "LFTs — hepatocellular & cholestatic patterns",
    subtitle: "Transaminases, ALP, bilirubin",
    analytes: [
      {
        id: "alt",
        label: "ALT",
        sampleValue: "220",
        unit: "U/L",
        refLow: 7,
        refHigh: 56,
        markerValue: 220,
        trend: [48, 62, 110, 168, 220],
        interpretation: "Disproportionate ALT > AST suggests hepatocellular injury; AST-predominant pattern widens differentials.",
        significance: "High yield for medication injury, viral hepatitis, and ischemic liver vignettes.",
        attentionRange: true,
      },
      {
        id: "tbili",
        label: "Total bilirubin",
        sampleValue: "2.4",
        unit: "mg/dL",
        refLow: 0.1,
        refHigh: 1.2,
        markerValue: 2.4,
        trend: [0.7, 0.9, 1.1, 1.8, 2.4],
        interpretation: "Conjugated vs unconjugated context changes teaching points (hemolysis vs biliary obstruction).",
        significance: "Use trend with ALP/GGT and imaging clues in stems.",
      },
    ],
  },
  {
    id: "coag",
    title: "Coagulation",
    subtitle: "Anticoagulation monitoring & bleeding risk",
    analytes: [
      {
        id: "inr",
        label: "INR",
        sampleValue: "3.8",
        unit: "",
        refLow: 0.9,
        refHigh: 1.1,
        markerValue: 3.8,
        trend: [1.0, 1.4, 2.1, 2.9, 3.8],
        interpretation: "Supratherapeutic INR escalates bleeding risk; reversal choices depend on acuity and institutional protocol.",
        significance: "Exam items often test education, fall precautions, and hold parameters—not memorized reversal cocktails alone.",
        attentionRange: true,
      },
    ],
  },
  {
    id: "abg",
    title: "ABG — ventilation & metabolic status",
    subtitle: "pH, PaCO₂, HCO₃⁻, PaO₂",
    analytes: [
      {
        id: "ph",
        label: "pH",
        sampleValue: "7.29",
        unit: "",
        refLow: 7.35,
        refHigh: 7.45,
        markerValue: 7.29,
        trend: [7.42, 7.38, 7.34, 7.31, 7.29],
        interpretation: "Acidemia with PaCO₂ and HCO₃⁻ context defines primary disorder and compensation adequacy.",
        significance: "NP and acute-care stems frequently pair ABG with electrolyte correction plans.",
        attentionRange: true,
      },
      {
        id: "hco3",
        label: "HCO₃⁻",
        sampleValue: "17",
        unit: "mEq/L",
        refLow: 22,
        refHigh: 26,
        markerValue: 17,
        trend: [24, 23, 21, 19, 17],
        interpretation: "Metabolic acidosis gap classification drives differentials (ketoacidosis, lactate, toxins, renal loss).",
        significance: "Connect to anion gap, ketones, lactate, and perfusion status.",
        attentionRange: true,
      },
    ],
  },
] as const;

export function flattenAttentionAnalytes(): LabAnalyteRow[] {
  const out: LabAnalyteRow[] = [];
  for (const p of LAB_PANELS) {
    for (const a of p.analytes) {
      if (a.attentionRange) out.push(a);
    }
  }
  return out;
}
