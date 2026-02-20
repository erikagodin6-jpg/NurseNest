import { useState, useCallback, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFeatureUsage } from "@/hooks/use-feature-usage";
import { UsageLimitBanner, UsageLimitPaywall } from "@/components/usage-limit-gate";
import {
  Calculator,
  Droplets,
  Weight,
  Activity,
  Baby,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertTriangle,
  Trophy,
  RotateCcw,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function randInt(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, rng: () => number, decimals = 1): number {
  return parseFloat((rng() * (max - min) + min).toFixed(decimals));
}

interface Problem {
  statement: string;
  answer: number;
  unit: string;
  formula: string;
  steps: string[];
  safetyNote?: string;
}

const medications = [
  "Morphine", "Furosemide", "Digoxin", "Metoprolol", "Amoxicillin",
  "Vancomycin", "Heparin", "Dopamine", "Gentamicin", "Ceftriaxone",
  "Lisinopril", "Phenytoin", "Acetaminophen", "Ibuprofen", "Ketorolac",
];

const pedsMeds = [
  "Amoxicillin", "Acetaminophen", "Ibuprofen", "Cephalexin", "Azithromycin",
  "Clindamycin", "Ondansetron", "Dexamethasone", "Prednisolone", "Trimethoprim",
];

const ivFluids = [
  "Normal Saline (0.9% NaCl)", "D5W", "Lactated Ringer's", "D5 0.45% NaCl",
  "0.45% NaCl", "D10W", "D5LR", "3% Saline",
];

const dropFactors = [10, 15, 20, 60];

const patientNames = [
  "J. Smith", "M. Johnson", "R. Williams", "A. Brown", "S. Davis",
  "K. Miller", "L. Wilson", "T. Moore", "P. Taylor", "C. Anderson",
];

function generateDosageProblem(seed: number): Problem {
  const rng = seededRandom(seed);
  const template = randInt(0, 9, rng);
  const med = pick(medications, rng);
  const patient = pick(patientNames, rng);

  switch (template) {
    case 0: {
      const ordered = randInt(5, 50, rng) * 5;
      const available = randInt(5, 50, rng) * 5;
      const tabletMg = available;
      const answer = parseFloat((ordered / tabletMg).toFixed(2));
      return {
        statement: `The provider orders ${med} ${ordered} mg PO. Available: ${med} ${tabletMg} mg tablets. Patient: ${patient}. How many tablets should you administer?`,
        answer,
        unit: "tablet(s)",
        formula: "Desired ÷ Have × Quantity",
        steps: [
          `Desired dose: ${ordered} mg`,
          `Available: ${tabletMg} mg per tablet`,
          `Quantity: 1 tablet`,
          `Calculation: ${ordered} ÷ ${tabletMg} × 1 = ${answer} tablet(s)`,
        ],
        safetyNote: answer > 3 ? "⚠️ Administering more than 3 tablets at once is unusual. Double-check the order and available strength." : undefined,
      };
    }
    case 1: {
      const ordered = randInt(2, 20, rng) * 25;
      const concMg = randInt(5, 50, rng) * 10;
      const concMl = randInt(1, 5, rng);
      const answer = parseFloat(((ordered / concMg) * concMl).toFixed(2));
      return {
        statement: `Order: ${med} ${ordered} mg IM. Available: ${med} ${concMg} mg/${concMl} mL. Patient: ${patient}. How many mL should you draw up?`,
        answer,
        unit: "mL",
        formula: "Desired ÷ Have × Quantity",
        steps: [
          `Desired dose: ${ordered} mg`,
          `Available concentration: ${concMg} mg per ${concMl} mL`,
          `Calculation: (${ordered} ÷ ${concMg}) × ${concMl} = ${answer} mL`,
        ],
        safetyNote: answer > 5 ? "⚠️ IM injections greater than 5 mL in a single site may require splitting into two injection sites." : undefined,
      };
    }
    case 2: {
      const ordered = randFloat(0.1, 2.0, rng, 1);
      const concMg = randFloat(0.5, 4.0, rng, 1);
      const answer = parseFloat((ordered / concMg).toFixed(2));
      return {
        statement: `Order: ${med} ${ordered} mg subQ. Available: ${med} ${concMg} mg/mL. Patient: ${patient}. How many mL will you administer?`,
        answer,
        unit: "mL",
        formula: "Desired ÷ Have × Quantity",
        steps: [
          `Desired dose: ${ordered} mg`,
          `Available: ${concMg} mg/mL`,
          `Calculation: ${ordered} ÷ ${concMg} = ${answer} mL`,
        ],
        safetyNote: answer > 1 ? "⚠️ SubQ injections are typically ≤ 1 mL. Verify the order." : undefined,
      };
    }
    case 3: {
      const orderedMcg = randInt(50, 500, rng);
      const availableMg = randFloat(0.1, 1.0, rng, 1);
      const orderedMg = orderedMcg / 1000;
      const answer = parseFloat((orderedMg / availableMg).toFixed(2));
      return {
        statement: `Order: ${med} ${orderedMcg} mcg PO. Available: ${med} ${availableMg} mg tablets. Patient: ${patient}. How many tablets should be given? (Remember: 1 mg = 1000 mcg)`,
        answer,
        unit: "tablet(s)",
        formula: "Convert mcg → mg, then Desired ÷ Have",
        steps: [
          `Convert: ${orderedMcg} mcg = ${orderedMg} mg`,
          `Available: ${availableMg} mg per tablet`,
          `Calculation: ${orderedMg} ÷ ${availableMg} = ${answer} tablet(s)`,
        ],
      };
    }
    case 4: {
      const orderedG = randFloat(0.5, 3.0, rng, 1);
      const availableMg = randInt(250, 1000, rng);
      const orderedMg = orderedG * 1000;
      const answer = parseFloat((orderedMg / availableMg).toFixed(2));
      return {
        statement: `Order: ${med} ${orderedG} g PO. Available: ${med} ${availableMg} mg capsules. Patient: ${patient}. How many capsules should you give? (1 g = 1000 mg)`,
        answer,
        unit: "capsule(s)",
        formula: "Convert g → mg, then Desired ÷ Have",
        steps: [
          `Convert: ${orderedG} g = ${orderedMg} mg`,
          `Available: ${availableMg} mg per capsule`,
          `Calculation: ${orderedMg} ÷ ${availableMg} = ${answer} capsule(s)`,
        ],
        safetyNote: answer > 4 ? "⚠️ More than 4 capsules is unusual. Verify the order and available strength." : undefined,
      };
    }
    case 5: {
      const orderedMg = randInt(100, 800, rng);
      const suspMg = randInt(100, 250, rng);
      const suspMl = 5;
      const answer = parseFloat(((orderedMg / suspMg) * suspMl).toFixed(2));
      return {
        statement: `Order: ${med} ${orderedMg} mg PO. Available: ${med} oral suspension ${suspMg} mg/${suspMl} mL. Patient: ${patient}. How many mL should you administer?`,
        answer,
        unit: "mL",
        formula: "Desired ÷ Have × Quantity",
        steps: [
          `Desired: ${orderedMg} mg`,
          `Available: ${suspMg} mg per ${suspMl} mL`,
          `Calculation: (${orderedMg} ÷ ${suspMg}) × ${suspMl} = ${answer} mL`,
        ],
      };
    }
    case 6: {
      const orderedUnits = randInt(1000, 10000, rng);
      const availUnits = randInt(5000, 20000, rng);
      const availMl = randInt(1, 5, rng);
      const answer = parseFloat(((orderedUnits / availUnits) * availMl).toFixed(2));
      return {
        statement: `Order: Heparin ${orderedUnits} units subQ. Available: Heparin ${availUnits} units/${availMl} mL. Patient: ${patient}. How many mL will you administer?`,
        answer,
        unit: "mL",
        formula: "Desired ÷ Have × Quantity",
        steps: [
          `Desired: ${orderedUnits} units`,
          `Available: ${availUnits} units per ${availMl} mL`,
          `Calculation: (${orderedUnits} ÷ ${availUnits}) × ${availMl} = ${answer} mL`,
        ],
      };
    }
    case 7: {
      const orderedMg = randInt(10, 100, rng);
      const concMg = randInt(20, 200, rng);
      const concMl = 2;
      const answer = parseFloat(((orderedMg / concMg) * concMl).toFixed(2));
      return {
        statement: `Order: ${med} ${orderedMg} mg IV push. Available: ${med} ${concMg} mg/${concMl} mL vial. Patient: ${patient}. How many mL should you administer?`,
        answer,
        unit: "mL",
        formula: "Desired ÷ Have × Quantity",
        steps: [
          `Desired: ${orderedMg} mg`,
          `Available: ${concMg} mg per ${concMl} mL`,
          `Calculation: (${orderedMg} ÷ ${concMg}) × ${concMl} = ${answer} mL`,
        ],
      };
    }
    case 8: {
      const totalDailyMg = randInt(500, 2000, rng);
      const doses = pick([2, 3, 4], rng);
      const perDose = parseFloat((totalDailyMg / doses).toFixed(2));
      const tabletMg = pick([250, 500], rng);
      const tablets = parseFloat((perDose / tabletMg).toFixed(2));
      return {
        statement: `Order: ${med} ${totalDailyMg} mg/day divided into ${doses} equal doses. Available: ${tabletMg} mg tablets. Patient: ${patient}. How many tablets per dose?`,
        answer: tablets,
        unit: "tablet(s) per dose",
        formula: "Total daily ÷ # doses = per dose, then Desired ÷ Have",
        steps: [
          `Per dose: ${totalDailyMg} ÷ ${doses} = ${perDose} mg`,
          `Available: ${tabletMg} mg per tablet`,
          `Tablets per dose: ${perDose} ÷ ${tabletMg} = ${tablets}`,
        ],
      };
    }
    default: {
      const orderedMg = randInt(50, 500, rng);
      const concMg = randInt(50, 250, rng);
      const concMl = randInt(1, 10, rng);
      const answer = parseFloat(((orderedMg / concMg) * concMl).toFixed(2));
      return {
        statement: `A patient requires ${med} ${orderedMg} mg. The pharmacy sends ${med} ${concMg} mg in ${concMl} mL. Patient: ${patient}. Calculate the volume to administer.`,
        answer,
        unit: "mL",
        formula: "Desired ÷ Have × Quantity",
        steps: [
          `Desired: ${orderedMg} mg`,
          `Available: ${concMg} mg in ${concMl} mL`,
          `Calculation: (${orderedMg} ÷ ${concMg}) × ${concMl} = ${answer} mL`,
        ],
      };
    }
  }
}

function generateIVFlowProblem(seed: number): Problem {
  const rng = seededRandom(seed);
  const template = randInt(0, 9, rng);
  const fluid = pick(ivFluids, rng);
  const patient = pick(patientNames, rng);

  switch (template) {
    case 0: {
      const volume = randInt(5, 20, rng) * 100;
      const hours = randInt(2, 12, rng);
      const df = pick(dropFactors, rng);
      const mlPerHr = parseFloat((volume / hours).toFixed(2));
      const answer = parseFloat(((volume * df) / (hours * 60)).toFixed(2));
      return {
        statement: `Order: Infuse ${volume} mL of ${fluid} over ${hours} hours. Drop factor: ${df} gtt/mL. Patient: ${patient}. Calculate the drip rate in gtt/min.`,
        answer,
        unit: "gtt/min",
        formula: "(Volume × Drop Factor) ÷ (Time in minutes)",
        steps: [
          `Volume: ${volume} mL`,
          `Time: ${hours} hours = ${hours * 60} minutes`,
          `Drop factor: ${df} gtt/mL`,
          `Calculation: (${volume} × ${df}) ÷ ${hours * 60} = ${answer} gtt/min`,
          `(mL/hr equivalent: ${mlPerHr} mL/hr)`,
        ],
      };
    }
    case 1: {
      const volume = randInt(5, 20, rng) * 100;
      const hours = randInt(2, 12, rng);
      const answer = parseFloat((volume / hours).toFixed(2));
      return {
        statement: `Order: Infuse ${volume} mL of ${fluid} over ${hours} hours using an IV pump. Patient: ${patient}. Calculate the pump rate in mL/hr.`,
        answer,
        unit: "mL/hr",
        formula: "Volume ÷ Time (hours)",
        steps: [
          `Volume: ${volume} mL`,
          `Time: ${hours} hours`,
          `Calculation: ${volume} ÷ ${hours} = ${answer} mL/hr`,
        ],
      };
    }
    case 2: {
      const mlPerHr = randInt(50, 250, rng);
      const df = pick(dropFactors, rng);
      const answer = parseFloat(((mlPerHr * df) / 60).toFixed(2));
      return {
        statement: `The IV pump is set at ${mlPerHr} mL/hr for ${fluid}. Drop factor: ${df} gtt/mL. Patient: ${patient}. What is the drip rate in gtt/min?`,
        answer,
        unit: "gtt/min",
        formula: "(mL/hr × Drop Factor) ÷ 60",
        steps: [
          `Rate: ${mlPerHr} mL/hr`,
          `Drop factor: ${df} gtt/mL`,
          `Calculation: (${mlPerHr} × ${df}) ÷ 60 = ${answer} gtt/min`,
        ],
      };
    }
    case 3: {
      const gttPerMin = randInt(10, 80, rng);
      const df = pick(dropFactors, rng);
      const answer = parseFloat(((gttPerMin * 60) / df).toFixed(2));
      return {
        statement: `An IV of ${fluid} is running at ${gttPerMin} gtt/min with a drop factor of ${df} gtt/mL. Patient: ${patient}. What is the rate in mL/hr?`,
        answer,
        unit: "mL/hr",
        formula: "(gtt/min × 60) ÷ Drop Factor",
        steps: [
          `Current rate: ${gttPerMin} gtt/min`,
          `Drop factor: ${df} gtt/mL`,
          `Calculation: (${gttPerMin} × 60) ÷ ${df} = ${answer} mL/hr`,
        ],
      };
    }
    case 4: {
      const volume = randInt(5, 20, rng) * 50;
      const mlPerHr = randInt(50, 200, rng);
      const answer = parseFloat((volume / mlPerHr).toFixed(2));
      const hrs = Math.floor(answer);
      const mins = Math.round((answer - hrs) * 60);
      return {
        statement: `${volume} mL of ${fluid} is infusing at ${mlPerHr} mL/hr. Patient: ${patient}. How many hours will the infusion take? (Round to nearest tenth)`,
        answer,
        unit: "hours",
        formula: "Volume ÷ Rate (mL/hr)",
        steps: [
          `Volume: ${volume} mL`,
          `Rate: ${mlPerHr} mL/hr`,
          `Calculation: ${volume} ÷ ${mlPerHr} = ${answer} hours`,
          `(Approximately ${hrs} hours and ${mins} minutes)`,
        ],
      };
    }
    case 5: {
      const volume = randInt(5, 10, rng) * 100;
      const mins = randInt(30, 120, rng);
      const df = pick(dropFactors, rng);
      const answer = parseFloat(((volume * df) / mins).toFixed(2));
      return {
        statement: `Order: Infuse ${volume} mL of ${fluid} over ${mins} minutes. Drop factor: ${df} gtt/mL. Patient: ${patient}. Calculate the drip rate.`,
        answer,
        unit: "gtt/min",
        formula: "(Volume × Drop Factor) ÷ Time in minutes",
        steps: [
          `Volume: ${volume} mL`,
          `Time: ${mins} minutes`,
          `Drop factor: ${df} gtt/mL`,
          `Calculation: (${volume} × ${df}) ÷ ${mins} = ${answer} gtt/min`,
        ],
      };
    }
    case 6: {
      const totalVol = randInt(5, 20, rng) * 100;
      const rate = randInt(75, 200, rng);
      const elapsed = randInt(2, 6, rng);
      const infused = rate * elapsed;
      const remaining = totalVol - infused;
      const answer = parseFloat((remaining > 0 ? remaining / rate : 0).toFixed(2));
      return {
        statement: `${totalVol} mL of ${fluid} was started ${elapsed} hours ago at ${rate} mL/hr. Patient: ${patient}. How many hours remain until the infusion is complete?`,
        answer: answer > 0 ? answer : 0,
        unit: "hours",
        formula: "Remaining Volume ÷ Rate",
        steps: [
          `Total volume: ${totalVol} mL`,
          `Infused so far: ${rate} × ${elapsed} = ${infused} mL`,
          `Remaining: ${totalVol} - ${infused} = ${remaining > 0 ? remaining : 0} mL`,
          `Time remaining: ${remaining > 0 ? remaining : 0} ÷ ${rate} = ${answer > 0 ? answer : 0} hours`,
        ],
      };
    }
    case 7: {
      const volume = randInt(5, 15, rng) * 100;
      const hours = randInt(4, 10, rng);
      const df = 60;
      const answer = parseFloat((volume / hours / 60 * df).toFixed(2));
      return {
        statement: `Order: ${volume} mL ${fluid} over ${hours} hours using microdrip tubing (60 gtt/mL). Patient: ${patient}. Calculate the drip rate.`,
        answer,
        unit: "gtt/min",
        formula: "(Volume × 60) ÷ (Hours × 60) — with microdrip, gtt/min = mL/hr",
        steps: [
          `Volume: ${volume} mL over ${hours} hours`,
          `mL/hr: ${volume} ÷ ${hours} = ${parseFloat((volume / hours).toFixed(2))} mL/hr`,
          `With microdrip (60 gtt/mL): gtt/min = mL/hr`,
          `Answer: ${answer} gtt/min`,
        ],
      };
    }
    case 8: {
      const volume = randInt(2, 10, rng) * 100;
      const startHour = randInt(8, 16, rng);
      const rate = randInt(75, 200, rng);
      const hoursNeeded = parseFloat((volume / rate).toFixed(2));
      const endDecimal = startHour + hoursNeeded;
      const endHr = Math.floor(endDecimal);
      const endMin = Math.round((endDecimal - endHr) * 60);
      return {
        statement: `${volume} mL of ${fluid} is started at ${startHour}:00 at ${rate} mL/hr. Patient: ${patient}. How many hours will the infusion take?`,
        answer: hoursNeeded,
        unit: "hours",
        formula: "Volume ÷ Rate",
        steps: [
          `Volume: ${volume} mL at ${rate} mL/hr`,
          `Duration: ${volume} ÷ ${rate} = ${hoursNeeded} hours`,
          `Start: ${startHour}:00 → Completion: approximately ${endHr}:${endMin.toString().padStart(2, "0")}`,
        ],
      };
    }
    default: {
      const volume = randInt(5, 20, rng) * 100;
      const hours = randInt(4, 24, rng);
      const df = pick(dropFactors, rng);
      const answer = parseFloat(((volume * df) / (hours * 60)).toFixed(2));
      return {
        statement: `Infuse ${volume} mL ${fluid} over ${hours} hours. Tubing: ${df} gtt/mL. Patient: ${patient}. What drip rate (gtt/min) should you set?`,
        answer,
        unit: "gtt/min",
        formula: "(Volume × Drop Factor) ÷ (Time in minutes)",
        steps: [
          `Volume: ${volume} mL, Time: ${hours} × 60 = ${hours * 60} min`,
          `Drop factor: ${df} gtt/mL`,
          `(${volume} × ${df}) ÷ ${hours * 60} = ${answer} gtt/min`,
        ],
      };
    }
  }
}

function generateWeightBasedProblem(seed: number): Problem {
  const rng = seededRandom(seed);
  const template = randInt(0, 9, rng);
  const med = pick(medications, rng);
  const patient = pick(patientNames, rng);

  switch (template) {
    case 0: {
      const weightKg = randInt(50, 120, rng);
      const dosePerKg = randFloat(0.5, 5.0, rng, 1);
      const answer = parseFloat((weightKg * dosePerKg).toFixed(2));
      return {
        statement: `Order: ${med} ${dosePerKg} mg/kg IV. Patient ${patient} weighs ${weightKg} kg. What is the dose in mg?`,
        answer,
        unit: "mg",
        formula: "Weight (kg) × Dose per kg",
        steps: [
          `Patient weight: ${weightKg} kg`,
          `Ordered dose: ${dosePerKg} mg/kg`,
          `Calculation: ${weightKg} × ${dosePerKg} = ${answer} mg`,
        ],
      };
    }
    case 1: {
      const weightLbs = randInt(110, 264, rng);
      const weightKg = parseFloat((weightLbs / 2.2).toFixed(1));
      const dosePerKg = randFloat(1.0, 10.0, rng, 1);
      const answer = parseFloat((weightKg * dosePerKg).toFixed(2));
      return {
        statement: `Order: ${med} ${dosePerKg} mg/kg. Patient ${patient} weighs ${weightLbs} lbs. Convert to kg and calculate the dose. (1 kg = 2.2 lbs)`,
        answer,
        unit: "mg",
        formula: "Convert lbs → kg, then Weight × Dose/kg",
        steps: [
          `Convert: ${weightLbs} lbs ÷ 2.2 = ${weightKg} kg`,
          `Dose: ${weightKg} × ${dosePerKg} = ${answer} mg`,
        ],
      };
    }
    case 2: {
      const weightKg = randInt(50, 100, rng);
      const dosePerKg = randFloat(5.0, 20.0, rng, 1);
      const totalDaily = parseFloat((weightKg * dosePerKg).toFixed(2));
      const doses = pick([2, 3, 4], rng);
      const answer = parseFloat((totalDaily / doses).toFixed(2));
      return {
        statement: `Order: ${med} ${dosePerKg} mg/kg/day divided q${24 / doses}h. Patient ${patient} weighs ${weightKg} kg. What is each individual dose?`,
        answer,
        unit: "mg per dose",
        formula: "(Weight × mg/kg/day) ÷ number of doses",
        steps: [
          `Total daily dose: ${weightKg} × ${dosePerKg} = ${totalDaily} mg/day`,
          `Divided into ${doses} doses`,
          `Per dose: ${totalDaily} ÷ ${doses} = ${answer} mg`,
        ],
      };
    }
    case 3: {
      const weightKg = randInt(55, 110, rng);
      const mcgPerKg = randInt(5, 50, rng);
      const answer = parseFloat(((weightKg * mcgPerKg) / 1000).toFixed(2));
      return {
        statement: `Order: ${med} ${mcgPerKg} mcg/kg IV. Patient ${patient} weighs ${weightKg} kg. Available: ${med} in mg/mL. What dose in mg? (1 mg = 1000 mcg)`,
        answer,
        unit: "mg",
        formula: "(Weight × mcg/kg) ÷ 1000",
        steps: [
          `Dose in mcg: ${weightKg} × ${mcgPerKg} = ${weightKg * mcgPerKg} mcg`,
          `Convert to mg: ${weightKg * mcgPerKg} ÷ 1000 = ${answer} mg`,
        ],
      };
    }
    case 4: {
      const weightKg = randInt(60, 100, rng);
      const dosePerKg = randFloat(1.0, 5.0, rng, 1);
      const totalMg = parseFloat((weightKg * dosePerKg).toFixed(2));
      const concMg = randInt(50, 200, rng);
      const concMl = randInt(1, 5, rng);
      const answer = parseFloat(((totalMg / concMg) * concMl).toFixed(2));
      return {
        statement: `Order: ${med} ${dosePerKg} mg/kg IM. Patient ${patient} weighs ${weightKg} kg. Available: ${concMg} mg/${concMl} mL. How many mL will you give?`,
        answer,
        unit: "mL",
        formula: "Dose = weight × mg/kg, then Volume = Dose ÷ Concentration × Quantity",
        steps: [
          `Dose: ${weightKg} × ${dosePerKg} = ${totalMg} mg`,
          `Available: ${concMg} mg per ${concMl} mL`,
          `Volume: (${totalMg} ÷ ${concMg}) × ${concMl} = ${answer} mL`,
        ],
        safetyNote: answer > 5 ? "⚠️ Volume exceeds 5 mL for a single IM site. Consider splitting the injection." : undefined,
      };
    }
    case 5: {
      const weightKg = randInt(60, 100, rng);
      const maxDosePerKg = randFloat(2.0, 8.0, rng, 1);
      const orderedMg = randInt(200, 1000, rng);
      const maxSafe = parseFloat((weightKg * maxDosePerKg).toFixed(2));
      const isSafe = orderedMg <= maxSafe;
      return {
        statement: `The maximum safe dose of ${med} is ${maxDosePerKg} mg/kg. Patient ${patient} weighs ${weightKg} kg. The order is for ${orderedMg} mg. What is the maximum safe dose? Is the ordered dose safe?`,
        answer: maxSafe,
        unit: "mg (max safe dose)",
        formula: "Max dose = Weight × max mg/kg",
        steps: [
          `Maximum safe dose: ${weightKg} × ${maxDosePerKg} = ${maxSafe} mg`,
          `Ordered dose: ${orderedMg} mg`,
          isSafe ? `✓ ${orderedMg} mg ≤ ${maxSafe} mg — dose is safe` : `✗ ${orderedMg} mg > ${maxSafe} mg — EXCEEDS safe dose`,
        ],
        safetyNote: !isSafe ? `⚠️ DANGER: The ordered dose of ${orderedMg} mg exceeds the maximum safe dose of ${maxSafe} mg. Do NOT administer. Notify the prescriber immediately.` : undefined,
      };
    }
    case 6: {
      const weightKg = randInt(50, 90, rng);
      const loadingPerKg = randFloat(10.0, 25.0, rng, 1);
      const maintenancePerKg = randFloat(2.0, 8.0, rng, 1);
      const loadingDose = parseFloat((weightKg * loadingPerKg).toFixed(2));
      const maintenanceDose = parseFloat((weightKg * maintenancePerKg).toFixed(2));
      return {
        statement: `${med}: Loading dose ${loadingPerKg} mg/kg, then maintenance ${maintenancePerKg} mg/kg q8h. Patient ${patient} weighs ${weightKg} kg. Calculate the loading dose.`,
        answer: loadingDose,
        unit: "mg",
        formula: "Loading Dose = Weight × loading mg/kg",
        steps: [
          `Loading: ${weightKg} × ${loadingPerKg} = ${loadingDose} mg`,
          `Maintenance (for reference): ${weightKg} × ${maintenancePerKg} = ${maintenanceDose} mg q8h`,
        ],
      };
    }
    case 7: {
      const weightKg = randInt(50, 100, rng);
      const unitsPerKg = randInt(50, 100, rng);
      const answer = weightKg * unitsPerKg;
      return {
        statement: `Order: Heparin ${unitsPerKg} units/kg IV bolus. Patient ${patient} weighs ${weightKg} kg. What dose in units?`,
        answer,
        unit: "units",
        formula: "Weight × units/kg",
        steps: [
          `Weight: ${weightKg} kg`,
          `Dose: ${weightKg} × ${unitsPerKg} = ${answer} units`,
        ],
      };
    }
    case 8: {
      const weightKg = randInt(55, 95, rng);
      const dosePerKg = randFloat(0.5, 3.0, rng, 1);
      const totalMg = parseFloat((weightKg * dosePerKg).toFixed(2));
      const tabletMg = pick([100, 200, 250, 500], rng);
      const tablets = parseFloat((totalMg / tabletMg).toFixed(2));
      return {
        statement: `Order: ${med} ${dosePerKg} mg/kg PO. Patient ${patient} weighs ${weightKg} kg. Available: ${tabletMg} mg scored tablets. How many tablets?`,
        answer: tablets,
        unit: "tablet(s)",
        formula: "Dose = Weight × mg/kg, then Tablets = Dose ÷ tablet strength",
        steps: [
          `Dose: ${weightKg} × ${dosePerKg} = ${totalMg} mg`,
          `Tablets: ${totalMg} ÷ ${tabletMg} = ${tablets}`,
        ],
      };
    }
    default: {
      const weightKg = randInt(60, 110, rng);
      const dosePerKg = randFloat(1.0, 10.0, rng, 1);
      const answer = parseFloat((weightKg * dosePerKg).toFixed(2));
      return {
        statement: `Calculate the weight-based dose: ${med} ${dosePerKg} mg/kg for patient ${patient} weighing ${weightKg} kg.`,
        answer,
        unit: "mg",
        formula: "Weight × mg/kg",
        steps: [`${weightKg} × ${dosePerKg} = ${answer} mg`],
      };
    }
  }
}

function generateInfusionProblem(seed: number): Problem {
  const rng = seededRandom(seed);
  const template = randInt(0, 9, rng);
  const patient = pick(patientNames, rng);

  switch (template) {
    case 0: {
      const weightKg = randInt(50, 100, rng);
      const mcgPerKgPerMin = randInt(2, 20, rng);
      const concMg = randInt(200, 800, rng);
      const concMl = randInt(200, 500, rng);
      const mgPerMin = (weightKg * mcgPerKgPerMin) / 1000;
      const mlPerMin = mgPerMin / (concMg / concMl);
      const answer = parseFloat((mlPerMin * 60).toFixed(2));
      return {
        statement: `Order: Dopamine ${mcgPerKgPerMin} mcg/kg/min. Patient ${patient} weighs ${weightKg} kg. Available: ${concMg} mg in ${concMl} mL D5W. Calculate the IV pump rate in mL/hr.`,
        answer,
        unit: "mL/hr",
        formula: "(Weight × mcg/kg/min × 60) ÷ (Concentration in mcg/mL)",
        steps: [
          `Weight: ${weightKg} kg, Rate: ${mcgPerKgPerMin} mcg/kg/min`,
          `mcg/min: ${weightKg} × ${mcgPerKgPerMin} = ${weightKg * mcgPerKgPerMin} mcg/min`,
          `mg/min: ${weightKg * mcgPerKgPerMin} ÷ 1000 = ${mgPerMin.toFixed(4)} mg/min`,
          `Concentration: ${concMg} mg / ${concMl} mL = ${(concMg / concMl).toFixed(4)} mg/mL`,
          `mL/min: ${mgPerMin.toFixed(4)} ÷ ${(concMg / concMl).toFixed(4)} = ${mlPerMin.toFixed(4)} mL/min`,
          `mL/hr: ${mlPerMin.toFixed(4)} × 60 = ${answer} mL/hr`,
        ],
      };
    }
    case 1: {
      const unitsPerHr = randInt(500, 2000, rng);
      const totalUnits = randInt(10000, 25000, rng);
      const totalMl = randInt(250, 500, rng);
      const concUnitsPerMl = totalUnits / totalMl;
      const answer = parseFloat((unitsPerHr / concUnitsPerMl).toFixed(2));
      return {
        statement: `Order: Heparin drip at ${unitsPerHr} units/hr. Available: ${totalUnits} units in ${totalMl} mL NS. Patient: ${patient}. Set pump to how many mL/hr?`,
        answer,
        unit: "mL/hr",
        formula: "Desired units/hr ÷ (Total units ÷ Total mL)",
        steps: [
          `Concentration: ${totalUnits} units / ${totalMl} mL = ${concUnitsPerMl.toFixed(2)} units/mL`,
          `Pump rate: ${unitsPerHr} ÷ ${concUnitsPerMl.toFixed(2)} = ${answer} mL/hr`,
        ],
      };
    }
    case 2: {
      const mgPerMin = randFloat(1.0, 4.0, rng, 1);
      const concMg = randInt(1000, 2000, rng);
      const concMl = randInt(250, 500, rng);
      const mlPerMin = mgPerMin / (concMg / concMl);
      const answer = parseFloat((mlPerMin * 60).toFixed(2));
      return {
        statement: `Order: Lidocaine drip at ${mgPerMin} mg/min. Available: ${concMg} mg in ${concMl} mL D5W. Patient: ${patient}. Calculate the mL/hr rate.`,
        answer,
        unit: "mL/hr",
        formula: "(mg/min ÷ concentration mg/mL) × 60",
        steps: [
          `Rate: ${mgPerMin} mg/min`,
          `Concentration: ${concMg} mg / ${concMl} mL = ${(concMg / concMl).toFixed(4)} mg/mL`,
          `mL/min: ${mgPerMin} ÷ ${(concMg / concMl).toFixed(4)} = ${mlPerMin.toFixed(4)}`,
          `mL/hr: ${mlPerMin.toFixed(4)} × 60 = ${answer} mL/hr`,
        ],
      };
    }
    case 3: {
      const unitsPerHr = randInt(1, 10, rng);
      const totalUnits = randInt(50, 100, rng);
      const totalMl = randInt(50, 250, rng);
      const answer = parseFloat((unitsPerHr / (totalUnits / totalMl)).toFixed(2));
      return {
        statement: `Order: Regular Insulin drip at ${unitsPerHr} units/hr. Available: ${totalUnits} units in ${totalMl} mL NS. Patient: ${patient}. Set the pump rate in mL/hr.`,
        answer,
        unit: "mL/hr",
        formula: "Desired units/hr ÷ Concentration (units/mL)",
        steps: [
          `Concentration: ${totalUnits} units / ${totalMl} mL = ${(totalUnits / totalMl).toFixed(4)} units/mL`,
          `Pump rate: ${unitsPerHr} ÷ ${(totalUnits / totalMl).toFixed(4)} = ${answer} mL/hr`,
        ],
        safetyNote: "⚠️ Insulin drips require frequent blood glucose monitoring. Always use an infusion pump.",
      };
    }
    case 4: {
      const weightKg = randInt(50, 100, rng);
      const mcgPerKgPerMin = randFloat(0.5, 5.0, rng, 1);
      const concMg = randInt(200, 400, rng);
      const concMl = 250;
      const totalMcgPerMin = weightKg * mcgPerKgPerMin;
      const mgPerMin = totalMcgPerMin / 1000;
      const concMgPerMl = concMg / concMl;
      const answer = parseFloat(((mgPerMin / concMgPerMl) * 60).toFixed(2));
      return {
        statement: `Order: Nitroglycerin ${mcgPerKgPerMin} mcg/kg/min. Patient ${patient}: ${weightKg} kg. Available: ${concMg} mg/${concMl} mL. Calculate mL/hr.`,
        answer,
        unit: "mL/hr",
        formula: "(Weight × mcg/kg/min ÷ 1000) ÷ (mg/mL) × 60",
        steps: [
          `mcg/min: ${weightKg} × ${mcgPerKgPerMin} = ${totalMcgPerMin} mcg/min`,
          `mg/min: ${totalMcgPerMin} ÷ 1000 = ${mgPerMin.toFixed(4)}`,
          `Concentration: ${concMg}/${concMl} = ${concMgPerMl.toFixed(4)} mg/mL`,
          `mL/hr: (${mgPerMin.toFixed(4)} ÷ ${concMgPerMl.toFixed(4)}) × 60 = ${answer}`,
        ],
      };
    }
    case 5: {
      const dose = randInt(1, 4, rng);
      const concMg = randInt(1, 4, rng);
      const concMl = 250;
      const answer = parseFloat(((dose / concMg) * concMl / 1).toFixed(2));
      const mlPerHr = parseFloat((answer).toFixed(2));
      return {
        statement: `Order: Magnesium sulfate ${dose} g/hr. Available: ${concMg} g in ${concMl} mL D5W. Patient: ${patient}. Set the pump at what rate?`,
        answer: mlPerHr,
        unit: "mL/hr",
        formula: "(Desired g/hr ÷ Available g) × Volume mL",
        steps: [
          `Desired: ${dose} g/hr`,
          `Available: ${concMg} g in ${concMl} mL`,
          `Rate: (${dose} ÷ ${concMg}) × ${concMl} = ${mlPerHr} mL/hr`,
        ],
      };
    }
    case 6: {
      const mcgPerMin = randInt(50, 400, rng);
      const concMg = randInt(200, 800, rng);
      const concMl = 250;
      const mgPerMin = mcgPerMin / 1000;
      const concMgPerMl = concMg / concMl;
      const answer = parseFloat(((mgPerMin / concMgPerMl) * 60).toFixed(2));
      return {
        statement: `Order: Phenylephrine at ${mcgPerMin} mcg/min IV. Available: ${concMg} mg in ${concMl} mL NS. Patient: ${patient}. Calculate the pump rate in mL/hr.`,
        answer,
        unit: "mL/hr",
        formula: "(mcg/min ÷ 1000 ÷ mg/mL) × 60",
        steps: [
          `${mcgPerMin} mcg/min = ${mgPerMin} mg/min`,
          `Concentration: ${concMg}/${concMl} = ${concMgPerMl.toFixed(4)} mg/mL`,
          `mL/hr: (${mgPerMin} ÷ ${concMgPerMl.toFixed(4)}) × 60 = ${answer}`,
        ],
      };
    }
    case 7: {
      const currentRate = randInt(10, 50, rng);
      const concMg = randInt(200, 800, rng);
      const concMl = 250;
      const concMgPerMl = concMg / concMl;
      const mgPerHr = parseFloat((currentRate * concMgPerMl).toFixed(2));
      const mcgPerMin = parseFloat(((mgPerHr * 1000) / 60).toFixed(2));
      return {
        statement: `A Dopamine drip is running at ${currentRate} mL/hr. Concentration: ${concMg} mg/${concMl} mL. Patient: ${patient}. How many mcg/min is the patient receiving?`,
        answer: mcgPerMin,
        unit: "mcg/min",
        formula: "(mL/hr × mg/mL × 1000) ÷ 60",
        steps: [
          `Rate: ${currentRate} mL/hr`,
          `Concentration: ${concMgPerMl.toFixed(4)} mg/mL`,
          `mg/hr: ${currentRate} × ${concMgPerMl.toFixed(4)} = ${mgPerHr} mg/hr`,
          `mcg/min: (${mgPerHr} × 1000) ÷ 60 = ${mcgPerMin} mcg/min`,
        ],
      };
    }
    case 8: {
      const weightKg = randInt(60, 100, rng);
      const mcgPerKgPerMin = randInt(2, 10, rng);
      const concMcgPerMl = randInt(1000, 4000, rng);
      const totalMcgPerMin = weightKg * mcgPerKgPerMin;
      const mlPerMin = totalMcgPerMin / concMcgPerMl;
      const answer = parseFloat((mlPerMin * 60).toFixed(2));
      return {
        statement: `Order: Dobutamine ${mcgPerKgPerMin} mcg/kg/min for patient ${patient} (${weightKg} kg). Concentration: ${concMcgPerMl} mcg/mL. Calculate mL/hr.`,
        answer,
        unit: "mL/hr",
        formula: "(Weight × mcg/kg/min) ÷ mcg/mL × 60",
        steps: [
          `mcg/min: ${weightKg} × ${mcgPerKgPerMin} = ${totalMcgPerMin}`,
          `mL/min: ${totalMcgPerMin} ÷ ${concMcgPerMl} = ${mlPerMin.toFixed(4)}`,
          `mL/hr: ${mlPerMin.toFixed(4)} × 60 = ${answer}`,
        ],
      };
    }
    default: {
      const weightKg = randInt(50, 100, rng);
      const mcgPerKgPerMin = randInt(1, 15, rng);
      const concMg = 400;
      const concMl = 250;
      const mgPerMin = (weightKg * mcgPerKgPerMin) / 1000;
      const answer = parseFloat(((mgPerMin / (concMg / concMl)) * 60).toFixed(2));
      return {
        statement: `Vasopressor infusion: ${mcgPerKgPerMin} mcg/kg/min. Patient ${patient}: ${weightKg} kg. Mix: ${concMg} mg/${concMl} mL. Rate in mL/hr?`,
        answer,
        unit: "mL/hr",
        formula: "Standard drip calculation",
        steps: [
          `mcg/min: ${weightKg} × ${mcgPerKgPerMin} = ${weightKg * mcgPerKgPerMin}`,
          `mg/min: ${weightKg * mcgPerKgPerMin} / 1000 = ${mgPerMin.toFixed(4)}`,
          `mL/hr: (${mgPerMin.toFixed(4)} / ${(concMg / concMl).toFixed(4)}) × 60 = ${answer}`,
        ],
      };
    }
  }
}

function generatePediatricProblem(seed: number): Problem {
  const rng = seededRandom(seed);
  const template = randInt(0, 9, rng);
  const med = pick(pedsMeds, rng);
  const patient = pick(patientNames, rng);

  switch (template) {
    case 0: {
      const weightKg = randFloat(3.0, 30.0, rng, 1);
      const dosePerKg = randFloat(5.0, 25.0, rng, 1);
      const answer = parseFloat((weightKg * dosePerKg).toFixed(2));
      const maxSafe = parseFloat((weightKg * 30).toFixed(2));
      return {
        statement: `Pediatric patient ${patient}, ${weightKg} kg. Order: ${med} ${dosePerKg} mg/kg/dose PO. Calculate the single dose in mg.`,
        answer,
        unit: "mg",
        formula: "Weight (kg) × mg/kg",
        steps: [
          `Weight: ${weightKg} kg`,
          `Dose: ${weightKg} × ${dosePerKg} = ${answer} mg`,
        ],
        safetyNote: answer > maxSafe ? `⚠️ This dose (${answer} mg) may exceed typical pediatric limits. Always verify with a pediatric drug reference.` : undefined,
      };
    }
    case 1: {
      const weightKg = randFloat(5.0, 25.0, rng, 1);
      const dosePerKg = randFloat(10.0, 40.0, rng, 1);
      const totalDaily = parseFloat((weightKg * dosePerKg).toFixed(2));
      const doses = pick([2, 3], rng);
      const perDose = parseFloat((totalDaily / doses).toFixed(2));
      const suspMg = pick([125, 200, 250], rng);
      const suspMl = 5;
      const answer = parseFloat(((perDose / suspMg) * suspMl).toFixed(2));
      return {
        statement: `Child ${patient}, ${weightKg} kg. Order: ${med} ${dosePerKg} mg/kg/day divided q${24 / doses}h. Available: ${suspMg} mg/${suspMl} mL suspension. How many mL per dose?`,
        answer,
        unit: "mL per dose",
        formula: "Daily dose ÷ doses = per dose, then (dose ÷ concentration) × volume",
        steps: [
          `Daily: ${weightKg} × ${dosePerKg} = ${totalDaily} mg/day`,
          `Per dose: ${totalDaily} ÷ ${doses} = ${perDose} mg`,
          `Volume: (${perDose} ÷ ${suspMg}) × ${suspMl} = ${answer} mL`,
        ],
      };
    }
    case 2: {
      const weightKg = randFloat(3.0, 10.0, rng, 1);
      const heightCm = randInt(45, 80, rng);
      const bsa = parseFloat(Math.sqrt((heightCm * weightKg) / 3600).toFixed(2));
      const dosePerBsa = randInt(50, 200, rng);
      const answer = parseFloat((bsa * dosePerBsa).toFixed(2));
      return {
        statement: `Pediatric patient ${patient}: weight ${weightKg} kg, height ${heightCm} cm. Order: ${med} ${dosePerBsa} mg/m². BSA formula: √(height cm × weight kg ÷ 3600). Calculate the dose.`,
        answer,
        unit: "mg",
        formula: "BSA = √(H × W ÷ 3600), then Dose = BSA × mg/m²",
        steps: [
          `BSA: √(${heightCm} × ${weightKg} ÷ 3600) = √${((heightCm * weightKg) / 3600).toFixed(4)} = ${bsa} m²`,
          `Dose: ${bsa} × ${dosePerBsa} = ${answer} mg`,
        ],
      };
    }
    case 3: {
      const weightKg = randFloat(8.0, 35.0, rng, 1);
      const mgPerKg = 15;
      const answer = parseFloat((weightKg * mgPerKg).toFixed(2));
      const maxSingle = 1000;
      return {
        statement: `Child ${patient} weighs ${weightKg} kg and has a fever. Order: Acetaminophen 15 mg/kg PO. Max single dose: 1000 mg. Calculate the dose. Is it within the safe limit?`,
        answer: Math.min(answer, maxSingle),
        unit: "mg",
        formula: "Weight × 15 mg/kg (cap at 1000 mg)",
        steps: [
          `Dose: ${weightKg} × 15 = ${answer} mg`,
          answer > maxSingle
            ? `${answer} mg exceeds max of ${maxSingle} mg → give ${maxSingle} mg`
            : `${answer} mg is within the max of ${maxSingle} mg ✓`,
        ],
        safetyNote: answer > maxSingle ? `⚠️ Calculated dose (${answer} mg) exceeds the maximum single dose of ${maxSingle} mg. Cap at ${maxSingle} mg.` : undefined,
      };
    }
    case 4: {
      const ageYrs = randInt(1, 10, rng);
      const weightKg = randFloat(8.0, 35.0, rng, 1);
      const dosePerKg = randFloat(5.0, 15.0, rng, 1);
      const totalMg = parseFloat((weightKg * dosePerKg).toFixed(2));
      const suspMg = pick([100, 125, 200, 250], rng);
      const suspMl = 5;
      const answer = parseFloat(((totalMg / suspMg) * suspMl).toFixed(2));
      return {
        statement: `${ageYrs}-year-old child ${patient}, ${weightKg} kg. Order: ${med} ${dosePerKg} mg/kg. Available: ${suspMg} mg/${suspMl} mL. How many mL to administer?`,
        answer,
        unit: "mL",
        formula: "(Weight × mg/kg) ÷ concentration × volume",
        steps: [
          `Dose: ${weightKg} × ${dosePerKg} = ${totalMg} mg`,
          `Volume: (${totalMg} ÷ ${suspMg}) × ${suspMl} = ${answer} mL`,
        ],
      };
    }
    case 5: {
      const weightKg = randFloat(2.5, 5.0, rng, 1);
      const mlPerKgPerHr = randInt(2, 4, rng);
      const answer = parseFloat((weightKg * mlPerKgPerHr).toFixed(2));
      return {
        statement: `Neonate ${patient} weighs ${weightKg} kg. Maintenance IV fluid rate: ${mlPerKgPerHr} mL/kg/hr. Calculate the IV rate in mL/hr.`,
        answer,
        unit: "mL/hr",
        formula: "Weight × mL/kg/hr",
        steps: [
          `Weight: ${weightKg} kg`,
          `Rate: ${weightKg} × ${mlPerKgPerHr} = ${answer} mL/hr`,
        ],
        safetyNote: "⚠️ Neonatal fluid rates require precise calculation. Always use a volumetric infusion pump.",
      };
    }
    case 6: {
      const weightKg = randFloat(10.0, 25.0, rng, 1);
      const first10 = 10 * 100;
      const next10 = Math.min(weightKg - 10, 10) * 50;
      const over20 = Math.max(weightKg - 20, 0) * 20;
      const dailyMl = parseFloat((first10 + (weightKg > 10 ? next10 : 0) + (weightKg > 20 ? over20 : 0)).toFixed(2));
      const answer = parseFloat((dailyMl / 24).toFixed(2));
      return {
        statement: `Calculate 24-hour maintenance IV fluids for child ${patient} weighing ${weightKg} kg using the Holliday-Segar method (100 mL/kg for first 10 kg, 50 mL/kg for next 10 kg, 20 mL/kg over 20 kg). What is the hourly rate?`,
        answer,
        unit: "mL/hr",
        formula: "Holliday-Segar: 100/50/20 rule, then ÷ 24",
        steps: [
          `First 10 kg: 10 × 100 = ${first10} mL`,
          weightKg > 10 ? `Next ${Math.min(weightKg - 10, 10).toFixed(1)} kg: ${Math.min(weightKg - 10, 10).toFixed(1)} × 50 = ${next10.toFixed(0)} mL` : "No additional weight above 10 kg",
          weightKg > 20 ? `Over 20 kg: ${(weightKg - 20).toFixed(1)} × 20 = ${over20.toFixed(0)} mL` : "",
          `Total daily: ${dailyMl} mL/day`,
          `Hourly: ${dailyMl} ÷ 24 = ${answer} mL/hr`,
        ].filter(Boolean),
      };
    }
    case 7: {
      const weightKg = randFloat(4.0, 20.0, rng, 1);
      const dosePerKg = randFloat(0.5, 2.0, rng, 1);
      const totalMg = parseFloat((weightKg * dosePerKg).toFixed(2));
      const concMg = randInt(2, 10, rng);
      const concMl = 1;
      const answer = parseFloat(((totalMg / concMg) * concMl).toFixed(2));
      return {
        statement: `Infant ${patient}, ${weightKg} kg. Order: ${med} ${dosePerKg} mg/kg IV. Available: ${concMg} mg/mL. How many mL to administer?`,
        answer,
        unit: "mL",
        formula: "(Weight × mg/kg) ÷ concentration",
        steps: [
          `Dose: ${weightKg} × ${dosePerKg} = ${totalMg} mg`,
          `Volume: ${totalMg} ÷ ${concMg} = ${answer} mL`,
        ],
      };
    }
    case 8: {
      const weightKg = randFloat(3.0, 8.0, rng, 1);
      const mgPerKg = randFloat(1.0, 5.0, rng, 1);
      const totalMg = parseFloat((weightKg * mgPerKg).toFixed(2));
      const doses = pick([2, 3, 4], rng);
      const perDose = parseFloat((totalMg / doses).toFixed(2));
      return {
        statement: `Neonate ${patient}, ${weightKg} kg. Order: ${med} ${mgPerKg} mg/kg/day divided into ${doses} doses. Calculate each individual dose.`,
        answer: perDose,
        unit: "mg per dose",
        formula: "(Weight × mg/kg/day) ÷ number of doses",
        steps: [
          `Daily dose: ${weightKg} × ${mgPerKg} = ${totalMg} mg`,
          `Per dose: ${totalMg} ÷ ${doses} = ${perDose} mg`,
        ],
        safetyNote: "⚠️ Neonatal doses are very small. Use a syringe pump and verify calculations with a second nurse.",
      };
    }
    default: {
      const weightKg = randFloat(5.0, 30.0, rng, 1);
      const mgPerKg = randFloat(5.0, 15.0, rng, 1);
      const answer = parseFloat((weightKg * mgPerKg).toFixed(2));
      return {
        statement: `Pediatric dose calculation: ${med} ${mgPerKg} mg/kg for patient ${patient} weighing ${weightKg} kg.`,
        answer,
        unit: "mg",
        formula: "Weight × mg/kg",
        steps: [`${weightKg} × ${mgPerKg} = ${answer} mg`],
      };
    }
  }
}

type Category = "dosage" | "iv-flow" | "weight-based" | "infusion" | "pediatric";

function generateProblem(category: Category, seed: number): Problem {
  switch (category) {
    case "dosage": return generateDosageProblem(seed);
    case "iv-flow": return generateIVFlowProblem(seed);
    case "weight-based": return generateWeightBasedProblem(seed);
    case "infusion": return generateInfusionProblem(seed);
    case "pediatric": return generatePediatricProblem(seed);
  }
}

const categoryConfig: Record<Category, { label: string; icon: typeof Calculator; color: string; bgColor: string }> = {
  dosage: { label: "Dosage", icon: Calculator, color: "text-blue-600", bgColor: "bg-blue-50" },
  "iv-flow": { label: "IV Flow Rate", icon: Droplets, color: "text-cyan-600", bgColor: "bg-cyan-50" },
  "weight-based": { label: "Weight-Based", icon: Weight, color: "text-purple-600", bgColor: "bg-purple-50" },
  infusion: { label: "Infusion", icon: Activity, color: "text-rose-600", bgColor: "bg-rose-50" },
  pediatric: { label: "Pediatric", icon: Baby, color: "text-pink-600", bgColor: "bg-pink-50" },
};

function ProblemCard({ category, onQuestionAnswered }: { category: Category; onQuestionAnswered?: () => Promise<void> }) {
  const [seed, setSeed] = useState(() => Date.now());
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const problem = useMemo(() => generateProblem(category, seed), [category, seed]);
  const config = categoryConfig[category];

  const handleCheck = useCallback(async () => {
    if (!userAnswer.trim()) return;
    const parsed = parseFloat(userAnswer);
    if (isNaN(parsed)) return;
    if (onQuestionAnswered) await onQuestionAnswered();
    const correct = Math.abs(parsed - problem.answer) <= 0.1;
    setIsCorrect(correct);
    setChecked(true);
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
  }, [userAnswer, problem.answer, onQuestionAnswered]);

  const handleNext = useCallback(() => {
    setSeed(Date.now() + Math.floor(Math.random() * 100000));
    setUserAnswer("");
    setChecked(false);
    setIsCorrect(false);
  }, []);

  const handleReset = useCallback(() => {
    setScore({ correct: 0, total: 0 });
    handleNext();
  }, [handleNext]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (checked) handleNext();
      else handleCheck();
    }
  }, [checked, handleCheck, handleNext]);

  const IconComp = config.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center`}>
            <IconComp className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900" data-testid={`text-category-${category}`}>{config.label} Calculations</h2>
            <p className="text-sm text-gray-500">Practice with randomized clinical scenarios</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full" data-testid={`text-score-${category}`}>
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{score.correct}/{score.total}</span>
            {score.total > 0 && (
              <span className="text-xs text-gray-400">({Math.round((score.correct / score.total) * 100)}%)</span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1" data-testid={`button-reset-${category}`}>
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-lg bg-white">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-gray-800 leading-relaxed text-base" data-testid={`text-problem-${category}`}>
                {problem.statement}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                type="number"
                step="any"
                value={userAnswer}
                onChange={(e) => { if (!checked) setUserAnswer(e.target.value); }}
                onKeyDown={handleKeyDown}
                placeholder={`Enter answer in ${problem.unit}`}
                className="h-12 text-lg pr-16"
                disabled={checked}
                data-testid={`input-answer-${category}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                {problem.unit}
              </span>
            </div>
            {!checked ? (
              <Button
                onClick={handleCheck}
                disabled={!userAnswer.trim()}
                className="h-12 px-8 rounded-xl bg-primary hover:brightness-110 text-white"
                data-testid={`button-check-${category}`}
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="h-12 px-8 rounded-xl bg-primary hover:brightness-110 text-white gap-2"
                data-testid={`button-next-${category}`}
              >
                Next Problem <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {checked && (
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
              <div className={`p-4 rounded-xl border ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-bold ${isCorrect ? "text-emerald-800" : "text-red-800"}`} data-testid={`text-result-${category}`}>
                    {isCorrect ? "Correct!" : `Incorrect — Answer: ${problem.answer} ${problem.unit}`}
                  </span>
                </div>
              </div>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-5 space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Step-by-Step Solution</h4>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Calculator className="w-4 h-4" />
                    Formula: {problem.formula}
                  </div>
                  <ol className="space-y-2" data-testid={`list-steps-${category}`}>
                    {problem.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {problem.safetyNote && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3" data-testid={`text-safety-${category}`}>
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-800 text-sm">Safety Alert</p>
                    <p className="text-sm text-amber-700">{problem.safetyNote}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function MedMathPage() {
  const [activeTab, setActiveTab] = useState<Category>("dosage");
  const usage = useFeatureUsage("med-math");

  const handleQuestionAnswered = useCallback(async () => {
    await usage.recordUsage();
  }, [usage.recordUsage]);

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900 select-none" onContextMenu={(e) => e.preventDefault()}>
      <SEO
        title="Med Math & Clinical Calculations Lab"
        description="Master medication math with interactive practice problems. Dosage calculations, IV flow rates, weight-based dosing, infusion rates, and pediatric dosing scenarios with step-by-step solutions."
        keywords="med math, nursing calculations, dosage calculations, IV flow rate, weight-based dosing, infusion rate, pediatric dosing, nursing math practice, NCLEX math, clinical calculations"
        canonicalPath="/med-math"
      />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900" data-testid="text-page-title">Med Math & Clinical Calculations Lab</h1>
              <p className="text-gray-500 mt-1">Interactive practice with unlimited randomized problems and step-by-step solutions</p>
            </div>
          </div>
        </div>

        {!usage.hasUnlimited && !usage.isLoading && (
          <UsageLimitBanner feature="med-math" count={usage.count} limit={usage.limit} remaining={usage.remaining} />
        )}

        {usage.isLocked ? (
          <UsageLimitPaywall feature="med-math" />
        ) : (
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Category)} className="w-full" data-testid="tabs-med-math">
          <TabsList className="grid w-full grid-cols-5 h-12 mb-8">
            <TabsTrigger value="dosage" className="gap-1 text-xs sm:text-sm" data-testid="tab-dosage">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Dosage</span>
              <span className="sm:hidden">Dose</span>
            </TabsTrigger>
            <TabsTrigger value="iv-flow" className="gap-1 text-xs sm:text-sm" data-testid="tab-iv-flow">
              <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">IV Flow Rate</span>
              <span className="sm:hidden">IV</span>
            </TabsTrigger>
            <TabsTrigger value="weight-based" className="gap-1 text-xs sm:text-sm" data-testid="tab-weight-based">
              <Weight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Weight-Based</span>
              <span className="sm:hidden">Wt</span>
            </TabsTrigger>
            <TabsTrigger value="infusion" className="gap-1 text-xs sm:text-sm" data-testid="tab-infusion">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Infusion</span>
              <span className="sm:hidden">Drip</span>
            </TabsTrigger>
            <TabsTrigger value="pediatric" className="gap-1 text-xs sm:text-sm" data-testid="tab-pediatric">
              <Baby className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Pediatric</span>
              <span className="sm:hidden">Peds</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dosage">
            <ProblemCard category="dosage" onQuestionAnswered={handleQuestionAnswered} />
          </TabsContent>
          <TabsContent value="iv-flow">
            <ProblemCard category="iv-flow" onQuestionAnswered={handleQuestionAnswered} />
          </TabsContent>
          <TabsContent value="weight-based">
            <ProblemCard category="weight-based" onQuestionAnswered={handleQuestionAnswered} />
          </TabsContent>
          <TabsContent value="infusion">
            <ProblemCard category="infusion" onQuestionAnswered={handleQuestionAnswered} />
          </TabsContent>
          <TabsContent value="pediatric">
            <ProblemCard category="pediatric" onQuestionAnswered={handleQuestionAnswered} />
          </TabsContent>
        </Tabs>
        )}

        <div className="mt-16 border-t border-gray-200 pt-6">
          <div className="flex items-start gap-2 text-xs text-gray-400 max-w-3xl mx-auto">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-gray-300" />
            <p>
              NurseNest provides independently developed educational content grounded in established physiological principles and widely accepted clinical reasoning frameworks. Not affiliated with or endorsed by any licensing or regulatory authority.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
