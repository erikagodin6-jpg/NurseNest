/**
 * Deterministic medication-calculation drills for the learner premium module.
 * Pure functions — safe for unit tests and SSR-free client generation.
 */

export type DrillKind = "dosage" | "iv" | "weight" | "combined";

export type DimensionalFactor = {
  /** Human-readable factor line (factor-label method). */
  expression: string;
};

export type MedicationDrill = {
  kind: Exclude<DrillKind, "combined">;
  prompt: string;
  /** Canonical numeric answer (gtt/min, mL, or mg depending on drill). */
  expected: number;
  unit: string;
  tolerance: number;
  factors: DimensionalFactor[];
  /** Short worked explanation after reveal. */
  rationale: string;
};

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

export function nearlyEqual(a: number, b: number, tolerance: number): boolean {
  return Math.abs(a - b) <= tolerance;
}

export function computeIvDripRateGttPerMin(volumeMl: number, minutes: number, dropFactorGttPerMl: number): number {
  return (volumeMl * dropFactorGttPerMl) / minutes;
}

export function computeDoseVolumeMl(orderedMg: number, haveMg: number, haveVolumeMl: number): number {
  return (orderedMg / haveMg) * haveVolumeMl;
}

export function computeWeightBasedVolumeMl(doseMgPerKg: number, weightKg: number, concentrationMgPerMl: number): number {
  return (doseMgPerKg * weightKg) / concentrationMgPerMl;
}

/** `difficulty` 0 = gentle numbers, 1 = standard, 2 = tighter tolerances / larger values */
export function generateMedicationDrill(
  kind: Exclude<DrillKind, "combined">,
  seed: number,
  difficulty: 0 | 1 | 2 = 1,
): MedicationDrill {
  const rng = mulberry32(seed >>> 0);
  const bump = difficulty === 0 ? 0 : difficulty === 1 ? 1 : 2;

  if (kind === "iv") {
    const volumes = [100, 150, 200, 250, 500, 750, 1000].map((v) => v + bump * 25);
    const minutes = [30, 45, 60, 90, 120].map((m) => m + bump * 5);
    const factorsGtt = [10, 15, 20] as const;
    const vol = pick(rng, volumes);
    const mins = pick(rng, minutes);
    const gtt = pick(rng, factorsGtt);
    const expected = computeIvDripRateGttPerMin(vol, mins, gtt);
    return {
      kind: "iv",
      prompt: `An IV is ordered to infuse ${vol} mL over ${mins} minutes using a ${gtt} gtt/mL set. At what drip rate should you set the manual roller clamp?`,
      expected,
      unit: "gtt/min",
      tolerance: difficulty === 2 ? 0.25 : 0.5,
      factors: [
        { expression: `${vol} mL ÷ ${mins} min = ${(vol / mins).toFixed(2)} mL/min` },
        { expression: `${(vol / mins).toFixed(2)} mL/min × ${gtt} gtt/mL = ${expected.toFixed(1)} gtt/min` },
      ],
      rationale: `Multiply volume by drop factor, then divide by total minutes: (${vol} × ${gtt}) ÷ ${mins} = ${expected.toFixed(1)} gtt/min.`,
    };
  }

  if (kind === "dosage") {
    const perMlOptions = [1, 2, 5, 10];
    const haveMgOptions = [50, 100, 250, 500, 750, 1000];
    const perMl = pick(rng, perMlOptions);
    const haveMg = pick(rng, haveMgOptions);
    const ordered = Math.round((haveMg * (0.35 + rng() * 0.85)) / 5) * 5;
    const doseMl = computeDoseVolumeMl(ordered, haveMg, perMl);
    return {
      kind: "dosage",
      prompt: `You have ${haveMg} mg per ${perMl} mL. How many mL do you draw up for an order of ${ordered} mg?`,
      expected: doseMl,
      unit: "mL",
      tolerance: difficulty === 2 ? 0.005 : 0.02,
      factors: [
        { expression: `${ordered} mg × (${perMl} mL ÷ ${haveMg} mg)` },
        { expression: `= ${(ordered / haveMg).toFixed(4)} × ${perMl} mL = ${doseMl.toFixed(2)} mL` },
      ],
      rationale: `Desired over have times volume: (${ordered} ÷ ${haveMg}) × ${perMl} = ${doseMl.toFixed(2)} mL.`,
    };
  }

  /* weight-based: mg/kg → total mg → mL from concentration */
  const dosePerKg = Math.round((0.1 + rng() * 1.4) * 10) / 10;
  const weightKg = Math.round(50 + rng() * 45);
  const mgPerMl = pick(rng, [1, 2, 4, 5, 10]);
  const totalMg = dosePerKg * weightKg;
  const volumeMl = computeWeightBasedVolumeMl(dosePerKg, weightKg, mgPerMl);
  return {
    kind: "weight",
    prompt: `Order: ${dosePerKg} mg/kg for a client weighing ${weightKg} kg. Stock is ${mgPerMl} mg/mL. How many mL do you administer?`,
    expected: volumeMl,
    unit: "mL",
    tolerance: difficulty === 2 ? 0.02 : 0.05,
    factors: [
      { expression: `${dosePerKg} mg/kg × ${weightKg} kg = ${totalMg.toFixed(1)} mg` },
      { expression: `${totalMg.toFixed(1)} mg ÷ ${mgPerMl} mg/mL = ${volumeMl.toFixed(2)} mL` },
    ],
    rationale: `Find total mg (${dosePerKg} × ${weightKg}), then divide by concentration: ${totalMg.toFixed(1)} ÷ ${mgPerMl} = ${volumeMl.toFixed(2)} mL.`,
  };
}

export function nextCombinedKind(seed: number): Exclude<DrillKind, "combined"> {
  const kinds: Exclude<DrillKind, "combined">[] = ["dosage", "iv", "weight"];
  return kinds[seed % 3]!;
}
