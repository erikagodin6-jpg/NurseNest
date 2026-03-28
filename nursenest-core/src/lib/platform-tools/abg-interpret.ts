/**
 * Lightweight acid–base pattern labels for teaching only.
 * Not a diagnostic device; does not replace blood gas interpretation by a qualified clinician.
 */

export type AbgPattern =
  | "respiratory_acidosis"
  | "respiratory_alkalosis"
  | "metabolic_acidosis"
  | "metabolic_alkalosis"
  | "mixed_or_compensated"
  | "within_typical";

export function interpretAbgSimple(pH: number, pco2MmHg: number, hco3MeqL: number): AbgPattern {
  const acidemia = pH < 7.35;
  const alkalemia = pH > 7.45;
  const respAcid = pco2MmHg > 45;
  const respAlk = pco2MmHg < 35;
  const metaAcid = hco3MeqL < 22;
  const metaAlk = hco3MeqL > 26;

  if (!acidemia && !alkalemia) {
    if (respAcid || metaAcid || respAlk || metaAlk) {
      return "within_typical";
    }
    return "within_typical";
  }

  if (acidemia) {
    if (respAcid && metaAcid) {
      return "mixed_or_compensated";
    }
    if (respAcid && !metaAcid) {
      return "respiratory_acidosis";
    }
    if (metaAcid && !respAcid) {
      return "metabolic_acidosis";
    }
    return "mixed_or_compensated";
  }

  if (alkalemia) {
    if (respAlk && metaAlk) {
      return "mixed_or_compensated";
    }
    if (respAlk && !metaAlk) {
      return "respiratory_alkalosis";
    }
    if (metaAlk && !respAlk) {
      return "metabolic_alkalosis";
    }
    return "mixed_or_compensated";
  }

  return "within_typical";
}
