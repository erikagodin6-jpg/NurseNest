import { fetchExamSet, fetchBodySystems, fetchQBankStats, type ServerQuestion } from "./qbank-api";

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
  scenario?: string;
  clinicalPearl?: string;
  examStrategy?: string;
  memoryHook?: string;
  frameworkUsed?: string;
  clinicalTrap?: string;
  distractorRationales?: Record<string, string>;
  topic?: string;
  difficulty?: number;
  questionType?: string;
}

function serverToPooled(sq: ServerQuestion): PooledQuestion {
  const correctAnswer = sq.correctAnswer;
  return {
    id: sq.id,
    lessonId: "exam-bank",
    bodySystem: sq.bodySystem || "General",
    tier: sq.tier,
    question: sq.stem,
    options: sq.options,
    correct: Array.isArray(correctAnswer) ? correctAnswer[0] : 0,
    rationale: sq.rationale || "",
    source: "quiz",
    scenario: sq.scenario,
    clinicalPearl: sq.clinicalPearl,
    examStrategy: sq.examStrategy,
    memoryHook: sq.memoryHook,
    frameworkUsed: sq.frameworkUsed,
    clinicalTrap: sq.clinicalTrap,
    distractorRationales: sq.distractorRationales,
    topic: sq.topic,
    difficulty: sq.difficulty ?? undefined,
    questionType: sq.questionType,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getExamQuestions(tier: string, count: number, bodySystems?: string[]): Promise<PooledQuestion[]> {
  try {
    const result = await fetchExamSet({
      count,
      bodySystems,
      tier: tier === "all" ? undefined : tier,
    });
    return result.questions.map(serverToPooled);
  } catch (e) {
    console.error("Failed to fetch exam questions from server:", e);
    return [];
  }
}

export async function getAvailableBodySystems(tier: string): Promise<string[]> {
  try {
    return await fetchBodySystems(tier === "all" ? undefined : tier);
  } catch {
    return [];
  }
}

export async function getPoolStats(tier: string): Promise<{ total: number; systems: Record<string, number> }> {
  try {
    const stats = await fetchQBankStats();
    const systems: Record<string, number> = {};
    for (const bs of stats.bodySystems) {
      systems[bs.body_system] = parseInt(bs.count);
    }
    return { total: stats.total, systems };
  } catch {
    return { total: 0, systems: {} };
  }
}

export interface ExamBlueprint {
  examCode: string;
  examName: string;
  tier: string;
  region: "CA" | "US";
  totalQuestions: number;
  timeLimit: number;
  passingThreshold: number;
  domainPassThreshold: number;
  domains: { name: string; weight: number }[];
  difficultyMix: { high: number; moderate: number; foundational: number };
  examType: "cat" | "linear-scaled" | "readiness";
  minQuestions?: number;
  maxQuestions?: number;
  scaledScoreRange?: { min: number; max: number; passScore: number };
  showQuestionCount: boolean;
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
    examName: "REx-PN Computer Adaptive Test",
    tier: "rpn",
    region: "CA",
    totalQuestions: 90,
    timeLimit: 180,
    passingThreshold: 0,
    domainPassThreshold: 0,
    examType: "cat",
    minQuestions: 60,
    maxQuestions: 90,
    showQuestionCount: false,
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
    examName: "NCLEX-PN Computer Adaptive Test",
    tier: "rpn",
    region: "US",
    totalQuestions: 85,
    timeLimit: 180,
    passingThreshold: 0,
    domainPassThreshold: 0,
    examType: "cat",
    minQuestions: 60,
    maxQuestions: 85,
    showQuestionCount: false,
    domains: [
      { name: "Physiological Integrity", weight: 0.54 },
      { name: "Safe and Effective Care Environment", weight: 0.23 },
      { name: "Health Promotion and Maintenance", weight: 0.12 },
      { name: "Psychosocial Integrity", weight: 0.11 },
    ],
    difficultyMix: { high: 0.20, moderate: 0.60, foundational: 0.20 },
  },
  "NCLEX-RN-CA": {
    examCode: "NCLEX-RN-CA",
    examName: "NCLEX-RN / NGN (Canadian Administration)",
    tier: "rn",
    region: "CA",
    totalQuestions: 85,
    timeLimit: 180,
    passingThreshold: 0,
    domainPassThreshold: 0,
    examType: "cat",
    minQuestions: 60,
    maxQuestions: 85,
    showQuestionCount: false,
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
  "NCLEX-RN": {
    examCode: "NCLEX-RN",
    examName: "NCLEX-RN / NGN Computer Adaptive Test",
    tier: "rn",
    region: "US",
    totalQuestions: 85,
    timeLimit: 180,
    passingThreshold: 0,
    domainPassThreshold: 0,
    examType: "cat",
    minQuestions: 60,
    maxQuestions: 85,
    showQuestionCount: false,
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
  "CNPLE": {
    examCode: "CNPLE",
    examName: "Canadian NP Licensure Exam (CNPLE)",
    tier: "np",
    region: "CA",
    totalQuestions: 180,
    timeLimit: 300,
    passingThreshold: 0,
    domainPassThreshold: 0,
    examType: "linear-scaled",
    showQuestionCount: true,
    scaledScoreRange: { min: 200, max: 800, passScore: 500 },
    domains: [
      { name: "Health Assessment", weight: 0.25 },
      { name: "Diagnosis", weight: 0.20 },
      { name: "Therapeutics", weight: 0.25 },
      { name: "Health Promotion & Disease Prevention", weight: 0.15 },
      { name: "Professional Role & Responsibility", weight: 0.15 },
    ],
    difficultyMix: { high: 0.25, moderate: 0.55, foundational: 0.20 },
  },
  "AANP": {
    examCode: "AANP",
    examName: "AANP Certification Exam",
    tier: "np",
    region: "US",
    totalQuestions: 150,
    timeLimit: 240,
    passingThreshold: 0,
    domainPassThreshold: 0,
    examType: "linear-scaled",
    showQuestionCount: true,
    scaledScoreRange: { min: 200, max: 800, passScore: 500 },
    domains: [
      { name: "Health Assessment", weight: 0.25 },
      { name: "Diagnosis", weight: 0.20 },
      { name: "Therapeutics", weight: 0.25 },
      { name: "Health Promotion & Disease Prevention", weight: 0.15 },
      { name: "Professional Role & Responsibility", weight: 0.15 },
    ],
    difficultyMix: { high: 0.20, moderate: 0.60, foundational: 0.20 },
  },
  "ANCC": {
    examCode: "ANCC",
    examName: "ANCC Certification Exam",
    tier: "np",
    region: "US",
    totalQuestions: 150,
    timeLimit: 240,
    passingThreshold: 0,
    domainPassThreshold: 0,
    examType: "linear-scaled",
    showQuestionCount: true,
    scaledScoreRange: { min: 100, max: 500, passScore: 350 },
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

export const READINESS_EXAMS: Record<string, ExamBlueprint> = {
  "READINESS-RPN": {
    examCode: "READINESS-RPN",
    examName: "RPN Readiness Check",
    tier: "rpn",
    region: "CA",
    totalQuestions: 25,
    timeLimit: 45,
    passingThreshold: 65,
    domainPassThreshold: 0,
    examType: "readiness",
    showQuestionCount: true,
    domains: [
      { name: "Foundations of Practice", weight: 0.36 },
      { name: "Collaborative Practice", weight: 0.30 },
      { name: "Professional Practice", weight: 0.16 },
      { name: "Ethical Practice", weight: 0.10 },
      { name: "Legal Practice", weight: 0.08 },
    ],
    difficultyMix: { high: 0.15, moderate: 0.65, foundational: 0.20 },
  },
  "READINESS-RN-CA": {
    examCode: "READINESS-RN-CA",
    examName: "RN Readiness Check",
    tier: "rn",
    region: "CA",
    totalQuestions: 25,
    timeLimit: 45,
    passingThreshold: 65,
    domainPassThreshold: 0,
    examType: "readiness",
    showQuestionCount: true,
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
    difficultyMix: { high: 0.15, moderate: 0.65, foundational: 0.20 },
  },
  "READINESS-RN": {
    examCode: "READINESS-RN",
    examName: "RN Readiness Check",
    tier: "rn",
    region: "US",
    totalQuestions: 25,
    timeLimit: 45,
    passingThreshold: 65,
    domainPassThreshold: 0,
    examType: "readiness",
    showQuestionCount: true,
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
    difficultyMix: { high: 0.15, moderate: 0.65, foundational: 0.20 },
  },
  "READINESS-NP-CA": {
    examCode: "READINESS-NP-CA",
    examName: "NP Readiness Check",
    tier: "np",
    region: "CA",
    totalQuestions: 25,
    timeLimit: 45,
    passingThreshold: 65,
    domainPassThreshold: 0,
    examType: "readiness",
    showQuestionCount: true,
    domains: [
      { name: "Health Assessment", weight: 0.25 },
      { name: "Diagnosis", weight: 0.20 },
      { name: "Therapeutics", weight: 0.25 },
      { name: "Health Promotion & Disease Prevention", weight: 0.15 },
      { name: "Professional Role & Responsibility", weight: 0.15 },
    ],
    difficultyMix: { high: 0.15, moderate: 0.65, foundational: 0.20 },
  },
  "READINESS-NP": {
    examCode: "READINESS-NP",
    examName: "NP Readiness Check",
    tier: "np",
    region: "US",
    totalQuestions: 25,
    timeLimit: 45,
    passingThreshold: 65,
    domainPassThreshold: 0,
    examType: "readiness",
    showQuestionCount: true,
    domains: [
      { name: "Health Assessment", weight: 0.25 },
      { name: "Diagnosis", weight: 0.20 },
      { name: "Therapeutics", weight: 0.25 },
      { name: "Health Promotion & Disease Prevention", weight: 0.15 },
      { name: "Professional Role & Responsibility", weight: 0.15 },
    ],
    difficultyMix: { high: 0.15, moderate: 0.65, foundational: 0.20 },
  },
};

export function getReadinessExamForTier(tier: string, region?: "US" | "CA"): ExamBlueprint | null {
  if (region === "CA") {
    const caCode = `READINESS-${tier.toUpperCase()}-CA`;
    if (READINESS_EXAMS[caCode]) return READINESS_EXAMS[caCode];
  }
  const code = `READINESS-${tier.toUpperCase()}`;
  return READINESS_EXAMS[code] || null;
}

function getDomainForQuestion(q: PooledQuestion, tier: string): string {
  const map = tier === "np" ? BODY_SYSTEM_TO_DOMAIN_NP
    : tier === "rn" ? BODY_SYSTEM_TO_DOMAIN_RN
    : BODY_SYSTEM_TO_DOMAIN_RPN;
  return map[q.bodySystem] || Object.values(map)[0] || "General";
}

export async function getReadinessExamQuestions(tier: string): Promise<{ questions: PooledQuestion[]; blueprint: ExamBlueprint; domainAssignments: Record<string, string> }> {
  const blueprint = getReadinessExamForTier(tier);
  if (!blueprint) throw new Error(`No readiness exam for tier: ${tier}`);

  const allQuestions = await getExamQuestions(blueprint.tier, blueprint.totalQuestions * 3);

  const domainBuckets: Record<string, PooledQuestion[]> = {};
  for (const domain of blueprint.domains) {
    domainBuckets[domain.name] = [];
  }

  for (const q of allQuestions) {
    const domain = getDomainForQuestion(q, blueprint.tier);
    if (domainBuckets[domain]) {
      domainBuckets[domain].push(q);
    } else {
      const firstDomain = blueprint.domains[0].name;
      domainBuckets[firstDomain].push(q);
    }
  }

  const selected: PooledQuestion[] = [];
  const domainAssignments: Record<string, string> = {};
  const totalQ = blueprint.totalQuestions;

  for (const domain of blueprint.domains) {
    const targetCount = Math.max(1, Math.round(totalQ * domain.weight));
    const available = domainBuckets[domain.name];
    const toTake = Math.min(targetCount, available.length);
    for (let i = 0; i < toTake; i++) {
      selected.push(available[i]);
      domainAssignments[available[i].id] = domain.name;
    }
  }

  return {
    questions: shuffleArray(selected).slice(0, totalQ),
    blueprint,
    domainAssignments,
  };
}

export function getAvailableBlueprintsForTier(tier: string, region?: "US" | "CA"): ExamBlueprint[] {
  return Object.values(EXAM_BLUEPRINTS).filter(bp => {
    if (bp.tier !== tier) return false;
    if (region && bp.region !== region) return false;
    return true;
  });
}

export async function getOfficialExamQuestions(blueprintCode: string): Promise<{ questions: PooledQuestion[]; blueprint: ExamBlueprint; domainAssignments: Record<string, string> }> {
  const blueprint = EXAM_BLUEPRINTS[blueprintCode];
  if (!blueprint) throw new Error(`Unknown blueprint: ${blueprintCode}`);

  const allQuestions = await getExamQuestions(blueprint.tier, blueprint.totalQuestions * 3);

  const domainBuckets: Record<string, PooledQuestion[]> = {};
  for (const domain of blueprint.domains) {
    domainBuckets[domain.name] = [];
  }

  for (const q of allQuestions) {
    const domain = getDomainForQuestion(q, blueprint.tier);
    if (domainBuckets[domain]) {
      domainBuckets[domain].push(q);
    } else {
      const firstDomain = blueprint.domains[0].name;
      domainBuckets[firstDomain].push(q);
    }
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

export { type ServerQuestion } from "./qbank-api";
