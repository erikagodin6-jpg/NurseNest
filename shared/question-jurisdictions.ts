export type QuestionJurisdiction = {
  id: string;
  countryCode: string;
  countryLabel: string;
  regionScope: string;
  defaultLanguage: string;
  spelling: "CA" | "US" | "UK" | "AU" | "NZ" | "IE" | "IN" | "PH" | "GLOBAL";
  defaultUnitPreference: "SI" | "CONV";
};

export type ExamJurisdiction = {
  examId: string;
  labels: string[];
  countryCode: string | null;
  licensingBody: string | null;
  servingTier?: string;
  global?: boolean;
};

export const QUESTION_JURISDICTIONS: Record<string, QuestionJurisdiction> = {
  CA: { id:"CA", countryCode:"CA", countryLabel:"Canada", regionScope:"CAN", defaultLanguage:"en", spelling:"CA", defaultUnitPreference:"SI" },
  US: { id:"US", countryCode:"US", countryLabel:"United States", regionScope:"US", defaultLanguage:"en", spelling:"US", defaultUnitPreference:"CONV" },
  GB: { id:"GB", countryCode:"GB", countryLabel:"United Kingdom", regionScope:"GB", defaultLanguage:"en", spelling:"UK", defaultUnitPreference:"SI" },
  AU: { id:"AU", countryCode:"AU", countryLabel:"Australia", regionScope:"AU", defaultLanguage:"en", spelling:"AU", defaultUnitPreference:"SI" },
  NZ: { id:"NZ", countryCode:"NZ", countryLabel:"New Zealand", regionScope:"NZ", defaultLanguage:"en", spelling:"NZ", defaultUnitPreference:"SI" },
  IE: { id:"IE", countryCode:"IE", countryLabel:"Ireland", regionScope:"IE", defaultLanguage:"en", spelling:"IE", defaultUnitPreference:"SI" },
  IN: { id:"IN", countryCode:"IN", countryLabel:"India", regionScope:"IN", defaultLanguage:"en", spelling:"IN", defaultUnitPreference:"SI" },
  PH: { id:"PH", countryCode:"PH", countryLabel:"Philippines", regionScope:"PH", defaultLanguage:"en", spelling:"PH", defaultUnitPreference:"SI" },
};

export const EXAM_JURISDICTIONS: ExamJurisdiction[] = [
  { examId:"ca-rn-nclex-rn", labels:["NCLEX-RN-CA","CANADA NCLEX-RN","CA-RN-NCLEX-RN"], countryCode:"CA", licensingBody:"NCSBN / Canadian provincial or territorial regulator", servingTier:"rn" },
  { examId:"us-rn-nclex-rn", labels:["NCLEX-RN","US NCLEX-RN","US-RN-NCLEX-RN"], countryCode:"US", licensingBody:"NCSBN / state board of nursing", servingTier:"rn" },
  { examId:"ca-rpn-rex-pn", labels:["REX-PN","REX PN","CA-RPN-REX-PN"], countryCode:"CA", licensingBody:"CNO / participating Canadian regulators", servingTier:"rpn" },
  { examId:"us-pn-nclex-pn", labels:["NCLEX-PN","US NCLEX-PN","US-PN-NCLEX-PN"], countryCode:"US", licensingBody:"NCSBN / state board of nursing", servingTier:"rpn" },
  { examId:"ca-np-cnple", labels:["CNPLE","CANADIAN NURSE PRACTITIONER LICENSURE EXAMINATION"], countryCode:"CA", licensingBody:"Canadian nursing regulators", servingTier:"np" },
  { examId:"gb-nmc-cbt", labels:["NMC-CBT","NMC CBT"], countryCode:"GB", licensingBody:"Nursing and Midwifery Council" },
  { examId:"au-rn-nmba", labels:["AHPRA-RN","NMBA-RN","AU RN"], countryCode:"AU", licensingBody:"NMBA / AHPRA" },
  { examId:"nz-rn-ncnz", labels:["NCNZ","NZ RN"], countryCode:"NZ", licensingBody:"Nursing Council of New Zealand" },
  { examId:"ie-rn-nmbi", labels:["NMBI","IE RN"], countryCode:"IE", licensingBody:"Nursing and Midwifery Board of Ireland" },
  { examId:"global-gre", labels:["GRE"], countryCode:null, licensingBody:"ETS", global:true },
  { examId:"global-gmat", labels:["GMAT"], countryCode:null, licensingBody:"GMAC", global:true },
  { examId:"global-lsat", labels:["LSAT"], countryCode:null, licensingBody:"LSAC", global:true },
  { examId:"global-mcat", labels:["MCAT"], countryCode:null, licensingBody:"AAMC", global:true },
];

function norm(value: string): string {
  return String(value || "").trim().toUpperCase().replace(/[_–—]+/g,"-").replace(/\s+/g," ");
}

export function resolveExamJurisdiction(exam: string): ExamJurisdiction | null {
  const needle = norm(exam);
  if (!needle) return null;
  const exact = EXAM_JURISDICTIONS.find(entry => norm(entry.examId) === needle || entry.labels.some(label => norm(label) === needle));
  if (exact) return exact;

  if (/\bREX[- ]?PN\b/i.test(exam)) return EXAM_JURISDICTIONS.find(e=>e.examId==="ca-rpn-rex-pn")!;
  if (/\bCNPLE\b/i.test(exam)) return EXAM_JURISDICTIONS.find(e=>e.examId==="ca-np-cnple")!;
  if (/\bNMC\b.*\bCBT\b|\bNMC-CBT\b/i.test(exam)) return EXAM_JURISDICTIONS.find(e=>e.examId==="gb-nmc-cbt")!;
  if (/\bAHPRA\b|\bNMBA\b/i.test(exam)) return EXAM_JURISDICTIONS.find(e=>e.examId==="au-rn-nmba")!;
  if (/\bNCNZ\b/i.test(exam)) return EXAM_JURISDICTIONS.find(e=>e.examId==="nz-rn-ncnz")!;
  if (/\bNMBI\b/i.test(exam)) return EXAM_JURISDICTIONS.find(e=>e.examId==="ie-rn-nmbi")!;
  return null;
}

export function jurisdictionForCountry(code: string | null | undefined): QuestionJurisdiction | null {
  const key = String(code || "").trim().toUpperCase();
  return QUESTION_JURISDICTIONS[key] || null;
}

export function countryLabelsForQuestionScope(input: {
  countryCode?: string | null;
  regionScope?: string | null;
  exam?: string | null;
  existingLabels?: unknown;
}): string[] {
  if (Array.isArray(input.existingLabels)) {
    const labels = input.existingLabels.map(String).map(v => v.trim()).filter(Boolean);
    if (labels.length) return [...new Set(labels)];
  }

  const country = jurisdictionForCountry(input.countryCode);
  if (country) return [country.countryLabel];

  const region = String(input.regionScope || "").trim().toUpperCase();
  const exam = String(input.exam || "");
  if (region !== "BOTH") return [];

  // Only infer a multi-country set when the exam/pathway string itself explicitly supports the inference.
  const canada = /\b(?:REX[- ]?PN|CNPLE|CPNRE|CBRC|CSMLS|PEBC|CAMRT|COPR|CANADA|CANADIAN)\b/i.test(exam);
  const unitedStates = /\b(?:NCLEX|NBRC|NREMT|PTCB|EXCPT|ASCP|ARRT|ARDMS|ANCC|AANP|UNITED STATES|\bUS\b)\b/i.test(exam);
  const labels: string[] = [];
  if (canada) labels.push("Canada");
  if (unitedStates) labels.push("United States");
  return labels;
}
