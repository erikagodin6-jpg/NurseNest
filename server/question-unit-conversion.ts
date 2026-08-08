export type UnitDisplay = { value: number | string; unit: string; display?: string };
export type QuestionUnitVariant = {
  token: string;
  quantity: string;
  si: UnitDisplay;
  conv: UnitDisplay;
};

export type UnitValidation = { valid: boolean; reason?: string; expected?: number; actual?: number; tolerance?: number };

function n(v: number | string): number | null {
  const parsed = typeof v === "number" ? v : Number(String(v).replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}
function unit(v: string): string {
  return String(v || "").trim().toLowerCase().replace(/\s+/g, "").replace(/μ/g, "u");
}
function quantity(v: string): string {
  return String(v || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
function close(actual: number, expected: number, relative = 0.025, absolute = 0.15): boolean {
  return Math.abs(actual - expected) <= Math.max(absolute, Math.abs(expected) * relative);
}

// For analytes conventionally reported as mg/dL in North America and mmol/L in SI.
// mmol/L = mg/dL / divisor. Values reflect molecular-weight-based clinical conversions.
const MGDL_TO_MMOLL_DIVISOR: Record<string, number> = {
  glucose: 18,
  blood_glucose: 18,
  serum_glucose: 18,
  cholesterol: 38.67,
  total_cholesterol: 38.67,
  ldl: 38.67,
  ldl_cholesterol: 38.67,
  hdl: 38.67,
  hdl_cholesterol: 38.67,
  triglyceride: 88.57,
  triglycerides: 88.57,
  calcium: 4.008,
  serum_calcium: 4.008,
  magnesium: 2.43,
  serum_magnesium: 2.43,
  phosphorus: 3.097,
  phosphate: 3.097,
  serum_phosphate: 3.097,
  bilirubin: 0.05848, // mg/dL = umol/L * 0.05848; handled separately below.
  total_bilirubin: 0.05848,
  creatinine: 0.011312, // mg/dL = umol/L * 0.011312; handled separately below.
  serum_creatinine: 0.011312,
  urea: 2.801, // BUN mg/dL / 2.801 = urea mmol/L.
  bun: 2.801,
};

function validateTemperature(si: number, conv: number, siUnit: string, convUnit: string): UnitValidation | null {
  const cToF = si * 9 / 5 + 32;
  const fToC = (conv - 32) * 5 / 9;
  if ((siUnit === "°c" || siUnit === "c" || siUnit === "celsius") && (convUnit === "°f" || convUnit === "f" || convUnit === "fahrenheit")) {
    return close(conv, cToF, 0.002, 0.25) ? { valid: true } : { valid: false, reason: "temperature_conversion_mismatch", expected: cToF, actual: conv, tolerance: 0.25 };
  }
  if ((siUnit === "°f" || siUnit === "f") && (convUnit === "°c" || convUnit === "c")) {
    return close(conv, fToC, 0.002, 0.15) ? { valid: true } : { valid: false, reason: "temperature_conversion_mismatch", expected: fToC, actual: conv, tolerance: 0.15 };
  }
  return null;
}

function validateSimple(si: number, conv: number, siUnit: string, convUnit: string): UnitValidation | null {
  const cases: Array<[string, string, number, number]> = [
    ["kg", "lb", 2.2046226218, 0.25],
    ["kilogram", "pound", 2.2046226218, 0.25],
    ["cm", "in", 1 / 2.54, 0.15],
    ["cm", "inch", 1 / 2.54, 0.15],
    ["m", "ft", 3.280839895, 0.08],
    ["meter", "foot", 3.280839895, 0.08],
  ];
  for (const [from, to, factor, abs] of cases) {
    if (siUnit === from && convUnit === to) {
      const expected = si * factor;
      return close(conv, expected, 0.02, abs) ? { valid: true } : { valid: false, reason: "measurement_conversion_mismatch", expected, actual: conv, tolerance: abs };
    }
  }
  return null;
}

function validateLab(q: string, si: number, conv: number, siUnit: string, convUnit: string): UnitValidation | null {
  const key = quantity(q);
  // Conventional mg/dL -> SI mmol/L.
  if ((siUnit === "mmol/l" || siUnit === "mmolperliter") && convUnit === "mg/dl") {
    const divisor = MGDL_TO_MMOLL_DIVISOR[key];
    if (!divisor || key.includes("bilirubin") || key.includes("creatinine")) return null;
    const expected = conv / divisor;
    return close(si, expected, 0.03, 0.12) ? { valid: true } : { valid: false, reason: "lab_conversion_mismatch", expected, actual: si, tolerance: Math.max(0.12, expected * 0.03) };
  }
  // Creatinine and bilirubin use umol/L in SI.
  if (siUnit === "umol/l" && convUnit === "mg/dl") {
    const coefficient = MGDL_TO_MMOLL_DIVISOR[key];
    if (!coefficient || (!key.includes("bilirubin") && !key.includes("creatinine"))) return null;
    const expected = conv / coefficient;
    return close(si, expected, 0.025, 1.5) ? { valid: true } : { valid: false, reason: "lab_conversion_mismatch", expected, actual: si, tolerance: Math.max(1.5, expected * 0.025) };
  }
  return null;
}

export function validateQuestionUnitVariant(variant: QuestionUnitVariant): UnitValidation {
  if (!variant || !variant.token || !variant.quantity || !variant.si || !variant.conv) return { valid: false, reason: "missing_unit_variant_fields" };
  const siValue = n(variant.si.value);
  const convValue = n(variant.conv.value);
  if (siValue === null || convValue === null) return { valid: false, reason: "non_numeric_unit_variant_value" };
  const siUnit = unit(variant.si.unit);
  const convUnit = unit(variant.conv.unit);
  if (!siUnit || !convUnit) return { valid: false, reason: "missing_unit_variant_unit" };

  const temperature = validateTemperature(siValue, convValue, siUnit, convUnit);
  if (temperature) return temperature;
  const simple = validateSimple(siValue, convValue, siUnit, convUnit);
  if (simple) return simple;
  const lab = validateLab(variant.quantity, siValue, convValue, siUnit, convUnit);
  if (lab) return lab;

  // Unknown conversion pairs cannot be certified automatically. They require editorial review rather than a false pass.
  return { valid: false, reason: "unsupported_conversion_pair" };
}

export function validateAllQuestionUnitVariants(variants: QuestionUnitVariant[]): UnitValidation[] {
  return variants.map(validateQuestionUnitVariant);
}
