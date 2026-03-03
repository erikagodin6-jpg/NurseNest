import { contentMap } from "@/data/lessons";
import type { QuizQuestion } from "@/data/lessons/types";
import { getLessonBodySystem } from "@/lib/seo-utils";
import { rpnCardiovascularQuestions } from "@/data/exam-questions/rpn-cardiovascular";
import { rpnRespiratoryQuestions } from "@/data/exam-questions/rpn-respiratory";
import { rpnNeuroGiEndoQuestions } from "@/data/exam-questions/rpn-neuro-gi-endo";
import { rpnPedsHemePharmQuestions } from "@/data/exam-questions/rpn-peds-heme-pharm";
import { rnMedsurgQuestions } from "@/data/exam-questions/rn-medsurg";
import { rnPharmacologyQuestions } from "@/data/exam-questions/rn-pharmacology";
import { npPharmacologyQuestions } from "@/data/exam-questions/np-pharmacology";
import { rpnExpansionAQuestions } from "@/data/exam-questions/rpn-expansion-a";
import { rpnExpansionBQuestions } from "@/data/exam-questions/rpn-expansion-b";
import { rpnExpansionCQuestions } from "@/data/exam-questions/rpn-expansion-c";
import { rnExpansionAQuestions } from "@/data/exam-questions/rn-expansion-a";
import { rnExpansionBQuestions } from "@/data/exam-questions/rn-expansion-b";
import { npClinicalManagementQuestions } from "@/data/exam-questions/np-clinical-management";
import { npExpansionAQuestions } from "@/data/exam-questions/np-expansion-a";
import type { ExamQuestion, BowtieQuestion } from "@/data/exam-questions/types";
import { rpnBowtieQuestions } from "@/data/exam-questions/rpn-bowtie";
import { rnBowtieQuestions } from "@/data/exam-questions/rn-bowtie";
import { npExamBatch01Questions } from "@/data/exam-questions/np-exam-batch-01";
import { npExamBatch02Questions } from "@/data/exam-questions/np-exam-batch-02";
import { npExamBatch03Questions } from "@/data/exam-questions/np-exam-batch-03";
import { npExamBatch04Questions } from "@/data/exam-questions/np-exam-batch-04";
import { npExamBatch05Questions } from "@/data/exam-questions/np-exam-batch-05";
import { npExamBatch06Questions } from "@/data/exam-questions/np-exam-batch-06";
import { npExamBatch07Questions } from "@/data/exam-questions/np-exam-batch-07";
import { npExamBatch08Questions } from "@/data/exam-questions/np-exam-batch-08";
import { npExamBatch09Questions } from "@/data/exam-questions/np-exam-batch-09";
import { npExamBatch10Questions } from "@/data/exam-questions/np-exam-batch-10";
import { npExamBatch11Questions } from "@/data/exam-questions/np-exam-batch-11";
import { npExamBatch12Questions } from "@/data/exam-questions/np-exam-batch-12";
import { npExamBatch13Questions } from "@/data/exam-questions/np-exam-batch-13";
import { npExamBatch14Questions } from "@/data/exam-questions/np-exam-batch-14";
import { npExamBatch15Questions } from "@/data/exam-questions/np-exam-batch-15";
import { npExamBatch16Questions } from "@/data/exam-questions/np-exam-batch-16";
import { npExamBatch17Questions } from "@/data/exam-questions/np-exam-batch-17";
import { npExamBatch18Questions } from "@/data/exam-questions/np-exam-batch-18";
import { npExamBatch19Questions } from "@/data/exam-questions/np-exam-batch-19";
import { npExamBatch20Questions } from "@/data/exam-questions/np-exam-batch-20";
import { npExamBatch21Questions } from "@/data/exam-questions/np-exam-batch-21";
import { npExamBatch22Questions } from "@/data/exam-questions/np-exam-batch-22";
import { npExamBatch23Questions } from "@/data/exam-questions/np-exam-batch-23";
import { npExamBatch24Questions } from "@/data/exam-questions/np-exam-batch-24";
import { npExamBatch25Questions } from "@/data/exam-questions/np-exam-batch-25";
import { npExamBatch26Questions } from "@/data/exam-questions/np-exam-batch-26";
import { npExamBatch27Questions } from "@/data/exam-questions/np-exam-batch-27";
import { npExamBatch28Questions } from "@/data/exam-questions/np-exam-batch-28";
import { npExamBatch29Questions } from "@/data/exam-questions/np-exam-batch-29";
import { npExamBatch30Questions } from "@/data/exam-questions/np-exam-batch-30";
import { npExamBatch31Questions } from "@/data/exam-questions/np-exam-batch-31";
import { npExamBatch32Questions } from "@/data/exam-questions/np-exam-batch-32";
import { npExamBatch33Questions } from "@/data/exam-questions/np-exam-batch-33";
import { npExamBatch34Questions } from "@/data/exam-questions/np-exam-batch-34";
import { npExamBatch35Questions } from "@/data/exam-questions/np-exam-batch-35";
import { npExamBatch36Questions } from "@/data/exam-questions/np-exam-batch-36";
import { npExamBatch37Questions } from "@/data/exam-questions/np-exam-batch-37";
import { npExamBatch38Questions } from "@/data/exam-questions/np-exam-batch-38";
import { npExamBatch39Questions } from "@/data/exam-questions/np-exam-batch-39";
import { npExamBatch40Questions } from "@/data/exam-questions/np-exam-batch-40";
import { npExamBatch41Questions } from "@/data/exam-questions/np-exam-batch-41";
import { npExamBatch42Questions } from "@/data/exam-questions/np-exam-batch-42";
import { npExamBatch43Questions } from "@/data/exam-questions/np-exam-batch-43";
import { npExamBatch44Questions } from "@/data/exam-questions/np-exam-batch-44";
import { npExamBatch45Questions } from "@/data/exam-questions/np-exam-batch-45";
import { npExamBatch46Questions } from "@/data/exam-questions/np-exam-batch-46";
import { npExamBatch47Questions } from "@/data/exam-questions/np-exam-batch-47";
import { npExamBatch48Questions } from "@/data/exam-questions/np-exam-batch-48";
import { npExamBatch49Questions } from "@/data/exam-questions/np-exam-batch-49";
import { npExamBatch50Questions } from "@/data/exam-questions/np-exam-batch-50";
import { npExamBatch51Questions } from "@/data/exam-questions/np-exam-batch-51";
import { npExamBatch52Questions } from "@/data/exam-questions/np-exam-batch-52";
import { npExamBatch53Questions } from "@/data/exam-questions/np-exam-batch-53";
import { npExamBatch54Questions } from "@/data/exam-questions/np-exam-batch-54";
import { npExamBatch55Questions } from "@/data/exam-questions/np-exam-batch-55";

export interface PooledQuestion {
  id: string;
  lessonId: string;
  bodySystem: string;
  tier: string;
  question: string;
  options: string[];
  correct: number;
  rationale: string;
  source: "quiz" | "preTest" | "postTest";
}

function getLessonTier(lessonId: string): string {
  if (lessonId.startsWith("med-math-")) return "free";
  if (lessonId.includes("-np") || lessonId.startsWith("np-") || lessonId.includes("advanced-")) return "np";
  if (lessonId.includes("-rn") || lessonId.startsWith("rn-") || lessonId.includes("nclex-")) return "rn";
  return "rpn";
}

let cachedPool: PooledQuestion[] | null = null;

export function buildQuestionPool(): PooledQuestion[] {
  if (cachedPool) return cachedPool;

  const pool: PooledQuestion[] = [];
  let counter = 0;

  for (const [lessonId, lesson] of Object.entries(contentMap)) {
    const bodySystem = getLessonBodySystem(lessonId);
    const tier = getLessonTier(lessonId);

    const addQuestions = (questions: QuizQuestion[], source: "quiz" | "preTest" | "postTest") => {
      for (const q of questions) {
        pool.push({
          id: `q_${counter++}`,
          lessonId,
          bodySystem,
          tier,
          question: q.question,
          options: q.options,
          correct: q.correct,
          rationale: q.rationale,
          source,
        });
      }
    };

    if (lesson.quiz) addQuestions(lesson.quiz, "quiz");
    if (lesson.preTest) addQuestions(lesson.preTest, "preTest");
    if (lesson.postTest) addQuestions(lesson.postTest, "postTest");
  }

  const examBanks: { questions: ExamQuestion[]; tier: string }[] = [
    { questions: rpnCardiovascularQuestions, tier: "rpn" },
    { questions: rpnRespiratoryQuestions, tier: "rpn" },
    { questions: rpnNeuroGiEndoQuestions, tier: "rpn" },
    { questions: rpnPedsHemePharmQuestions, tier: "rpn" },
    { questions: rnMedsurgQuestions, tier: "rn" },
    { questions: rnPharmacologyQuestions, tier: "rn" },
    { questions: npPharmacologyQuestions, tier: "np" },
    { questions: rpnExpansionAQuestions, tier: "rpn" },
    { questions: rpnExpansionBQuestions, tier: "rpn" },
    { questions: rpnExpansionCQuestions, tier: "rpn" },
    { questions: rnExpansionAQuestions, tier: "rn" },
    { questions: rnExpansionBQuestions, tier: "rn" },
    { questions: npClinicalManagementQuestions, tier: "np" },
    { questions: npExpansionAQuestions, tier: "np" },
    { questions: npExamBatch01Questions, tier: "np" },
    { questions: npExamBatch02Questions, tier: "np" },
    { questions: npExamBatch03Questions, tier: "np" },
    { questions: npExamBatch04Questions, tier: "np" },
    { questions: npExamBatch05Questions, tier: "np" },
    { questions: npExamBatch06Questions, tier: "np" },
    { questions: npExamBatch07Questions, tier: "np" },
    { questions: npExamBatch08Questions, tier: "np" },
    { questions: npExamBatch09Questions, tier: "np" },
    { questions: npExamBatch10Questions, tier: "np" },
    { questions: npExamBatch11Questions, tier: "np" },
    { questions: npExamBatch12Questions, tier: "np" },
    { questions: npExamBatch13Questions, tier: "np" },
    { questions: npExamBatch14Questions, tier: "np" },
    { questions: npExamBatch15Questions, tier: "np" },
    { questions: npExamBatch16Questions, tier: "np" },
    { questions: npExamBatch17Questions, tier: "np" },
    { questions: npExamBatch18Questions, tier: "np" },
    { questions: npExamBatch19Questions, tier: "np" },
    { questions: npExamBatch20Questions, tier: "np" },
    { questions: npExamBatch21Questions, tier: "np" },
    { questions: npExamBatch22Questions, tier: "np" },
    { questions: npExamBatch23Questions, tier: "np" },
    { questions: npExamBatch24Questions, tier: "np" },
    { questions: npExamBatch25Questions, tier: "np" },
    { questions: npExamBatch26Questions, tier: "np" },
    { questions: npExamBatch27Questions, tier: "np" },
    { questions: npExamBatch28Questions, tier: "np" },
    { questions: npExamBatch29Questions, tier: "np" },
    { questions: npExamBatch30Questions, tier: "np" },
    { questions: npExamBatch31Questions, tier: "np" },
    { questions: npExamBatch32Questions, tier: "np" },
    { questions: npExamBatch33Questions, tier: "np" },
    { questions: npExamBatch34Questions, tier: "np" },
    { questions: npExamBatch35Questions, tier: "np" },
    { questions: npExamBatch36Questions, tier: "np" },
    { questions: npExamBatch37Questions, tier: "np" },
    { questions: npExamBatch38Questions, tier: "np" },
    { questions: npExamBatch39Questions, tier: "np" },
    { questions: npExamBatch40Questions, tier: "np" },
    { questions: npExamBatch41Questions, tier: "np" },
    { questions: npExamBatch42Questions, tier: "np" },
    { questions: npExamBatch43Questions, tier: "np" },
    { questions: npExamBatch44Questions, tier: "np" },
    { questions: npExamBatch45Questions, tier: "np" },
    { questions: npExamBatch46Questions, tier: "np" },
    { questions: npExamBatch47Questions, tier: "np" },
    { questions: npExamBatch48Questions, tier: "np" },
    { questions: npExamBatch49Questions, tier: "np" },
    { questions: npExamBatch50Questions, tier: "np" },
    { questions: npExamBatch51Questions, tier: "np" },
    { questions: npExamBatch52Questions, tier: "np" },
    { questions: npExamBatch53Questions, tier: "np" },
    { questions: npExamBatch54Questions, tier: "np" },
    { questions: npExamBatch55Questions, tier: "np" },
  ];

  for (const bank of examBanks) {
    for (const eq of bank.questions) {
      pool.push({
        id: `eq_${counter++}`,
        lessonId: "exam-bank",
        bodySystem: eq.s,
        tier: bank.tier,
        question: eq.q,
        options: eq.o,
        correct: eq.a,
        rationale: eq.r,
        source: "quiz",
      });
    }
  }

  cachedPool = pool;
  return pool;
}

export function getExamQuestions(tier: string, count: number, bodySystems?: string[]): PooledQuestion[] {
  const pool = buildQuestionPool();

  let filtered = tier === "all"
    ? pool
    : pool.filter((q) => q.tier === tier);

  if (bodySystems && bodySystems.length > 0) {
    filtered = filtered.filter((q) => bodySystems.includes(q.bodySystem));
  }

  const systemGroups: Record<string, PooledQuestion[]> = {};
  for (const q of filtered) {
    if (!systemGroups[q.bodySystem]) systemGroups[q.bodySystem] = [];
    systemGroups[q.bodySystem].push(q);
  }

  for (const sys of Object.keys(systemGroups)) {
    systemGroups[sys] = shuffleArray(systemGroups[sys]);
  }

  const systems = Object.keys(systemGroups);
  const perSystem = Math.ceil(count / systems.length);
  const selected: PooledQuestion[] = [];

  for (const sys of systems) {
    const available = systemGroups[sys];
    selected.push(...available.slice(0, perSystem));
  }

  const shuffled = shuffleArray(selected);
  return shuffled.slice(0, count);
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface ExamBlueprint {
  examCode: string;
  examName: string;
  tier: string;
  totalQuestions: number;
  timeLimit: number;
  passingThreshold: number;
  domainPassThreshold: number;
  domains: { name: string; weight: number }[];
  difficultyMix: { high: number; moderate: number; foundational: number };
}

const BODY_SYSTEM_TO_DOMAIN_RPN: Record<string, string> = {
  "Cardiovascular": "Foundations of Practice",
  "Respiratory": "Foundations of Practice",
  "Neurological": "Foundations of Practice",
  "Gastrointestinal": "Foundations of Practice",
  "Renal & Urinary": "Foundations of Practice",
  "Endocrine": "Foundations of Practice",
  "Hematology": "Foundations of Practice",
  "Musculoskeletal": "Foundations of Practice",
  "Immune System": "Foundations of Practice",
  "HEENT & Skin": "Foundations of Practice",
  "Pediatrics": "Collaborative Practice",
  "Maternity": "Collaborative Practice",
  "Neonatal": "Collaborative Practice",
  "Mental Health": "Collaborative Practice",
  "Pharmacology": "Foundations of Practice",
  "Procedures": "Foundations of Practice",
  "Infections": "Foundations of Practice",
  "Safety & Ethics": "Professional Practice",
  "Infection Control": "Professional Practice",
  "Assessment Skills": "Foundations of Practice",
  "Fluid & Electrolytes": "Foundations of Practice",
  "Nutrition": "Foundations of Practice",
  "Gerontology": "Collaborative Practice",
  "Wound Care & Skin": "Foundations of Practice",
  "Pain Management": "Foundations of Practice",
  "Palliative & End of Life": "Ethical Practice",
  "Community Health": "Collaborative Practice",
  "Oncology": "Foundations of Practice",
  "Toxicology & Environmental": "Foundations of Practice",
  "Critical Care Basics": "Foundations of Practice",
  "Women's Health": "Collaborative Practice",
  "Delegation & Prioritization": "Professional Practice",
  "Clinical Scenarios & Prioritization": "Professional Practice",
  "Med Math & Calculations": "Foundations of Practice",
  "Pre-Nursing Foundations": "Foundations of Practice",
  "Nursing Fundamentals": "Foundations of Practice",
};

const BODY_SYSTEM_TO_DOMAIN_RN: Record<string, string> = {
  "Cardiovascular": "Physiological Adaptation",
  "Respiratory": "Physiological Adaptation",
  "Neurological": "Physiological Adaptation",
  "Gastrointestinal": "Physiological Adaptation",
  "Renal & Metabolic": "Physiological Adaptation",
  "Endocrine": "Physiological Adaptation",
  "Hematology & Oncology": "Pharmacological Therapies",
  "Musculoskeletal & Skin": "Reduction of Risk Potential",
  "Arrhythmias & ECG": "Physiological Adaptation",
  "Maternity & Obstetrics": "Health Promotion and Maintenance",
  "Women's Health & Reproductive": "Health Promotion and Maintenance",
  "Neonatal": "Health Promotion and Maintenance",
  "Pediatrics": "Health Promotion and Maintenance",
  "Psychiatry & Mental Health": "Psychosocial Integrity",
  "Pharmacology": "Pharmacological Therapies",
  "Clinical Procedures": "Reduction of Risk Potential",
  "Infectious Disease": "Safety and Infection Control",
  "Shock & Emergency": "Physiological Adaptation",
  "Safety & Forensic Nursing": "Safety and Infection Control",
  "Infection Control & Safety": "Safety and Infection Control",
  "Assessment Skills": "Reduction of Risk Potential",
  "Rheumatology": "Physiological Adaptation",
  "Toxicology": "Pharmacological Therapies",
  "Dermatology": "Physiological Adaptation",
  "Delegation & Prioritization": "Management of Care",
  "Clinical Scenarios & Prioritization": "Management of Care",
  "Med Math & Calculations": "Pharmacological Therapies",
  "Pre-Nursing Foundations": "Basic Care and Comfort",
  "Nursing Fundamentals": "Basic Care and Comfort",
  "Fluid & Electrolytes": "Physiological Adaptation",
};

const BODY_SYSTEM_TO_DOMAIN_NP: Record<string, string> = {
  "Cardiovascular": "Therapeutics",
  "Respiratory": "Therapeutics",
  "Neurological": "Diagnosis",
  "Endocrine & Metabolic": "Diagnosis",
  "Renal & Nephrology": "Therapeutics",
  "Hematology & Oncology": "Diagnosis",
  "Maternity & Obstetrics": "Health Assessment",
  "Neonatal": "Health Assessment",
  "Immune System": "Diagnosis",
  "Pharmacology": "Therapeutics",
  "Procedures": "Health Assessment",
  "Musculoskeletal": "Health Assessment",
  "GI & Hepatology": "Therapeutics",
  "Dermatology": "Health Assessment",
  "Psychiatry & Mental Health": "Therapeutics",
  "Women's Health & Gynecology": "Health Assessment",
  "Family Medicine Primary Care": "Health Promotion & Disease Prevention",
  "Palliative & Ethics": "Professional Role & Responsibility",
  "Infectious Disease": "Therapeutics",
  "Trauma & Emergency": "Therapeutics",
  "Geriatric Medicine": "Health Assessment",
  "Pain Management": "Therapeutics",
  "Assessment Skills": "Health Assessment",
  "Rheumatology": "Diagnosis",
  "Toxicology": "Therapeutics",
  "Rare & Genetic Disorders": "Diagnosis",
  "Critical Care Advanced": "Therapeutics",
  "Core Advanced Pathophysiology": "Diagnosis",
  "Delegation & Prioritization": "Professional Role & Responsibility",
  "Clinical Scenarios & Prioritization": "Professional Role & Responsibility",
  "Med Math & Calculations": "Therapeutics",
  "Pre-Nursing Foundations": "Health Promotion & Disease Prevention",
  "Nursing Fundamentals": "Health Promotion & Disease Prevention",
};

export const EXAM_BLUEPRINTS: Record<string, ExamBlueprint> = {
  "REX-PN": {
    examCode: "REX-PN",
    examName: "REx-PN Official Blueprint Mock",
    tier: "rpn",
    totalQuestions: 90,
    timeLimit: 180,
    passingThreshold: 65,
    domainPassThreshold: 60,
    domains: [
      { name: "Foundations of Practice", weight: 0.36 },
      { name: "Collaborative Practice", weight: 0.30 },
      { name: "Professional Practice", weight: 0.16 },
      { name: "Ethical Practice", weight: 0.10 },
      { name: "Legal Practice", weight: 0.08 },
    ],
    difficultyMix: { high: 0.20, moderate: 0.60, foundational: 0.20 },
  },
  "NCLEX-PN": {
    examCode: "NCLEX-PN",
    examName: "NCLEX-PN Official Blueprint Mock",
    tier: "rpn",
    totalQuestions: 85,
    timeLimit: 180,
    passingThreshold: 65,
    domainPassThreshold: 60,
    domains: [
      { name: "Physiological Integrity", weight: 0.54 },
      { name: "Safe and Effective Care Environment", weight: 0.23 },
      { name: "Health Promotion and Maintenance", weight: 0.12 },
      { name: "Psychosocial Integrity", weight: 0.11 },
    ],
    difficultyMix: { high: 0.20, moderate: 0.60, foundational: 0.20 },
  },
  "NCLEX-RN": {
    examCode: "NCLEX-RN",
    examName: "NCLEX-RN Official Blueprint Mock",
    tier: "rn",
    totalQuestions: 85,
    timeLimit: 180,
    passingThreshold: 65,
    domainPassThreshold: 60,
    domains: [
      { name: "Management of Care", weight: 0.19 },
      { name: "Safety and Infection Control", weight: 0.12 },
      { name: "Health Promotion and Maintenance", weight: 0.09 },
      { name: "Psychosocial Integrity", weight: 0.09 },
      { name: "Basic Care and Comfort", weight: 0.09 },
      { name: "Pharmacological Therapies", weight: 0.15 },
      { name: "Reduction of Risk Potential", weight: 0.12 },
      { name: "Physiological Adaptation", weight: 0.14 },
    ],
    difficultyMix: { high: 0.20, moderate: 0.60, foundational: 0.20 },
  },
  "NP-BOARDS": {
    examCode: "NP-BOARDS",
    examName: "NP Boards Official Blueprint Mock",
    tier: "np",
    totalQuestions: 150,
    timeLimit: 240,
    passingThreshold: 65,
    domainPassThreshold: 60,
    domains: [
      { name: "Health Assessment", weight: 0.25 },
      { name: "Diagnosis", weight: 0.20 },
      { name: "Therapeutics", weight: 0.25 },
      { name: "Health Promotion & Disease Prevention", weight: 0.15 },
      { name: "Professional Role & Responsibility", weight: 0.15 },
    ],
    difficultyMix: { high: 0.20, moderate: 0.60, foundational: 0.20 },
  },
};

function getDomainForQuestion(q: PooledQuestion, tier: string): string {
  const map = tier === "np" ? BODY_SYSTEM_TO_DOMAIN_NP
    : tier === "rn" ? BODY_SYSTEM_TO_DOMAIN_RN
    : BODY_SYSTEM_TO_DOMAIN_RPN;
  return map[q.bodySystem] || Object.values(map)[0] || "General";
}

export function getAvailableBlueprintsForTier(tier: string): ExamBlueprint[] {
  return Object.values(EXAM_BLUEPRINTS).filter(bp => bp.tier === tier);
}

export function getOfficialExamQuestions(blueprintCode: string): { questions: PooledQuestion[]; blueprint: ExamBlueprint; domainAssignments: Record<string, string> } {
  const blueprint = EXAM_BLUEPRINTS[blueprintCode];
  if (!blueprint) throw new Error(`Unknown blueprint: ${blueprintCode}`);

  const pool = buildQuestionPool();
  const tierPool = pool.filter(q => q.tier === blueprint.tier);

  const domainBuckets: Record<string, PooledQuestion[]> = {};
  for (const domain of blueprint.domains) {
    domainBuckets[domain.name] = [];
  }

  for (const q of tierPool) {
    const domain = getDomainForQuestion(q, blueprint.tier);
    if (domainBuckets[domain]) {
      domainBuckets[domain].push(q);
    } else {
      const firstDomain = blueprint.domains[0].name;
      domainBuckets[firstDomain].push(q);
    }
  }

  for (const key of Object.keys(domainBuckets)) {
    domainBuckets[key] = shuffleArray(domainBuckets[key]);
  }

  const selected: PooledQuestion[] = [];
  const domainAssignments: Record<string, string> = {};
  const totalQ = blueprint.totalQuestions;

  for (const domain of blueprint.domains) {
    const targetCount = Math.round(totalQ * domain.weight);
    const available = domainBuckets[domain.name];
    const toTake = Math.min(targetCount, available.length);
    for (let i = 0; i < toTake; i++) {
      selected.push(available[i]);
      domainAssignments[available[i].id] = domain.name;
    }
  }

  let deficit = totalQ - selected.length;
  if (deficit > 0) {
    const usedIds = new Set(selected.map(q => q.id));
    for (const domain of blueprint.domains) {
      if (deficit <= 0) break;
      const available = domainBuckets[domain.name].filter(q => !usedIds.has(q.id));
      for (const q of available) {
        if (deficit <= 0) break;
        selected.push(q);
        domainAssignments[q.id] = domain.name;
        usedIds.add(q.id);
        deficit--;
      }
    }
  }

  return {
    questions: shuffleArray(selected).slice(0, totalQ),
    blueprint,
    domainAssignments,
  };
}

export function getAvailableBodySystems(tier: string): string[] {
  const pool = buildQuestionPool();
  const filtered = tier === "all" ? pool : pool.filter((q) => q.tier === tier);
  return Array.from(new Set(filtered.map((q) => q.bodySystem))).sort();
}

export function getPoolStats(tier: string): { total: number; systems: Record<string, number> } {
  const pool = buildQuestionPool();
  const filtered = tier === "all" ? pool : pool.filter((q) => q.tier === tier);
  const systems: Record<string, number> = {};
  for (const q of filtered) {
    systems[q.bodySystem] = (systems[q.bodySystem] || 0) + 1;
  }
  return { total: filtered.length, systems };
}

let cachedBowtiePool: BowtieQuestion[] | null = null;

export function buildBowtiePool(): BowtieQuestion[] {
  if (cachedBowtiePool) return cachedBowtiePool;
  cachedBowtiePool = [...rpnBowtieQuestions, ...rnBowtieQuestions];
  return cachedBowtiePool;
}

export function getBowtieQuestions(tier: string, bodySystem?: string): BowtieQuestion[] {
  const pool = buildBowtiePool();
  let filtered = pool;
  if (tier !== "all") filtered = filtered.filter(q => q.tier === tier);
  if (bodySystem && bodySystem !== "all") filtered = filtered.filter(q => q.bodySystem === bodySystem);
  return shuffleArray(filtered);
}

export function getBowtieStats(tier: string): { total: number; systems: Record<string, number> } {
  const pool = buildBowtiePool();
  const filtered = tier === "all" ? pool : pool.filter(q => q.tier === tier);
  const systems: Record<string, number> = {};
  for (const q of filtered) {
    systems[q.bodySystem] = (systems[q.bodySystem] || 0) + 1;
  }
  return { total: filtered.length, systems };
}
