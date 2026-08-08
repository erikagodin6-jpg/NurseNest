import type { CareerType } from "@shared/careers";
import { CAREER_CONFIGS } from "@shared/careers";
import { fisherYatesShuffle } from "@shared/shuffle";
import { normalizeLegacyClientQuestion, type LegacyContractOption } from "./legacy-question-contract";

export interface CareerPooledQuestion {
  id: string;
  stem: string;
  /** Legacy display compatibility. New code should prefer optionObjects + correctAnswerIds. */
  options: string[];
  /** Legacy grading compatibility. New code should grade by stable option id. */
  correctIndex: number;
  optionObjects: LegacyContractOption[];
  correctAnswerIds: string[];
  distractorRationales: Record<string, string>;
  correctAnswerExplanation: string;
  hint: string;
  whyThisMatters: string;
  clinicalPearl: string;
  mnemonic?: string;
  countryCode?: string;
  countryLabels?: string[];
  regionScope: string;
  languageCode: string;
  exam?: string;
  licensingBody?: string;
  optionContractVersion: 2;
  publicationContractVersion: 2;
  metadataOrigin: "authored-v2" | "legacy-derived";
  publicationReady: boolean;
  rationale: string;
  difficulty: number;
  category: string;
  topic: string;
  careerType: CareerType;
  tier: string;
}

let careerQuestionsCache: Record<string, CareerPooledQuestion[]> = {};

function normalizeFingerprintText(value: unknown): string {
  return String(value ?? "").toLowerCase().replace(/\s+/g, " ").replace(/[.!?,;:]+$/g, "").trim();
}

function careerFingerprint(question: CareerPooledQuestion): string {
  return `${normalizeFingerprintText(question.stem)}::${question.optionObjects.map(option => normalizeFingerprintText(option.text)).join("||")}`;
}

function dedupeCareerQuestions(questions: CareerPooledQuestion[]): CareerPooledQuestion[] {
  const seen = new Set<string>();
  const unique: CareerPooledQuestion[] = [];
  for (const question of questions) {
    const fingerprint = careerFingerprint(question);
    if (seen.has(fingerprint)) continue;
    seen.add(fingerprint);
    unique.push(question);
  }
  return unique;
}

function jurisdictionForCareer(careerType: CareerType) {
  const config = CAREER_CONFIGS[careerType];
  const exams = config.examNames || [];
  const joined = exams.join(" | ");
  const ca = /\b(?:CSMLS|CBRC|COPR|PEBC|CAMRT|Canada|Canadian|Provincial|REx-PN|CNPLE)\b/i.test(joined);
  const us = /\b(?:NBRC|NREMT|PTCB|ExCPT|ASCP|ARRT|ARDMS|NCLEX|ANCC|AANP)\b/i.test(joined);
  const countryCode = ca && !us ? "CA" : us && !ca ? "US" : undefined;
  const regionScope = ca && us ? "BOTH" : countryCode === "CA" ? "CAN" : countryCode === "US" ? "US" : "GLOBAL";
  const countryLabels = ca && us ? ["Canada", "United States"] : countryCode === "CA" ? ["Canada"] : countryCode === "US" ? ["United States"] : ["International / exam-specific"];
  return {
    countryCode,
    countryLabels,
    regionScope,
    languageCode: "en",
    exam: exams.join(" / ") || config.name,
    licensingBody: exams.join(" / ") || undefined,
  };
}

function toPooled(raw: any, index: number, careerType: CareerType, tier: string): CareerPooledQuestion | null {
  const canonical = normalizeLegacyClientQuestion(raw, index, jurisdictionForCareer(careerType));
  if (!canonical.options.length || !canonical.correctAnswerIds.length) return null;
  const correctId = canonical.correctAnswerIds[0];
  const correctIndex = canonical.options.findIndex(option => option.id === correctId);
  if (correctIndex < 0) return null;
  const authoredV2 = canonical.metadataOrigin === "authored-v2";
  return {
    ...raw,
    id: canonical.id,
    stem: raw.stem,
    options: canonical.options.map(option => option.text),
    correctIndex,
    optionObjects: canonical.options,
    correctAnswerIds: canonical.correctAnswerIds,
    distractorRationales: canonical.distractorRationales,
    correctAnswerExplanation: canonical.correctAnswerExplanation,
    hint: canonical.hint,
    whyThisMatters: canonical.whyThisMatters,
    clinicalPearl: canonical.clinicalPearl,
    mnemonic: canonical.mnemonic,
    countryCode: canonical.countryCode,
    countryLabels: canonical.countryLabels,
    regionScope: canonical.regionScope,
    languageCode: canonical.languageCode,
    exam: canonical.exam,
    licensingBody: canonical.licensingBody,
    optionContractVersion: 2,
    publicationContractVersion: 2,
    metadataOrigin: canonical.metadataOrigin,
    publicationReady: authoredV2,
    rationale: raw.rationale || canonical.correctAnswerExplanation,
    difficulty: Number(raw.difficulty) || 2,
    category: raw.category || raw.bodySystem || "General",
    topic: raw.topic || raw.subtopic || raw.category || "General",
    careerType,
    tier,
  };
}

async function loadFromApi(careerType: CareerType): Promise<CareerPooledQuestion[] | null> {
  if (careerType !== "socialWorker") return null;
  try {
    const resp = await fetch("/api/social-worker/questions");
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!data.questions || data.questions.length === 0) return null;
    const config = CAREER_CONFIGS[careerType];
    const tiers = config.tiers;
    const normalized = data.questions.map((q: any, index: number) => {
      let tier = "free";
      if (tiers.length >= 3) {
        if (q.difficulty <= 2) tier = tiers[0].id;
        else if (q.difficulty <= 3) tier = tiers[1].id;
        else tier = tiers[2].id;
      }
      return toPooled(q, index, careerType, tier);
    }).filter((q: CareerPooledQuestion | null): q is CareerPooledQuestion => !!q);
    return dedupeCareerQuestions(normalized);
  } catch {
    return null;
  }
}

async function loadCareerQuestions(careerType: CareerType): Promise<CareerPooledQuestion[]> {
  if (careerQuestionsCache[careerType]) return careerQuestionsCache[careerType];

  const apiQuestions = await loadFromApi(careerType);
  if (apiQuestions && apiQuestions.length > 0) {
    careerQuestionsCache[careerType] = apiQuestions;
    return apiQuestions;
  }

  try {
    const mod = await import(`../data/career-questions/${CAREER_CONFIGS[careerType].slug}-questions.ts`);
    const exportKey = Object.keys(mod).find(k => Array.isArray(mod[k]));
    if (!exportKey) return [];
    const raw = mod[exportKey] as any[];

    const config = CAREER_CONFIGS[careerType];
    const tiers = config.tiers;
    const normalized = raw.map((q, index) => {
      let tier = "free";
      if (tiers.length >= 3) {
        if (q.difficulty <= 2) tier = tiers[0].id;
        else if (q.difficulty <= 3) tier = tiers[1].id;
        else tier = tiers[2].id;
      }
      return toPooled(q, index, careerType, tier);
    }).filter((q): q is CareerPooledQuestion => !!q);

    const pooled = dedupeCareerQuestions(normalized);
    careerQuestionsCache[careerType] = pooled;
    return pooled;
  } catch {
    return [];
  }
}

export function getCareerQuestionsSync(careerType: CareerType): CareerPooledQuestion[] {
  return careerQuestionsCache[careerType] || [];
}

export async function buildCareerQuestionPool(careerType: CareerType): Promise<CareerPooledQuestion[]> {
  return loadCareerQuestions(careerType);
}

export function getCareerExamQuestions(
  questions: CareerPooledQuestion[],
  tier: string,
  count: number,
  categories?: string[]
): CareerPooledQuestion[] {
  let filtered = tier === "all" ? questions : questions.filter(q => q.tier === tier || q.tier === "free");
  if (categories && categories.length > 0) filtered = filtered.filter(q => categories.includes(q.category));
  const shuffled = fisherYatesShuffle([...filtered]);
  return shuffled.slice(0, count);
}

export function getCareerCategories(questions: CareerPooledQuestion[]): string[] {
  return Array.from(new Set(questions.map(q => q.category))).sort();
}

export function getCareerPoolStats(questions: CareerPooledQuestion[]): {
  total: number;
  categories: Record<string, number>;
  byDifficulty: Record<number, number>;
  authoredV2: number;
  legacyDerived: number;
  publicationReady: number;
  requiresEditorialEnrichment: number;
} {
  const categories: Record<string, number> = {};
  const byDifficulty: Record<number, number> = {};
  let authoredV2 = 0;
  let legacyDerived = 0;
  let publicationReady = 0;
  for (const q of questions) {
    categories[q.category] = (categories[q.category] || 0) + 1;
    byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
    if (q.metadataOrigin === "authored-v2") authoredV2++; else legacyDerived++;
    if (q.publicationReady) publicationReady++;
  }
  return {
    total: questions.length,
    categories,
    byDifficulty,
    authoredV2,
    legacyDerived,
    publicationReady,
    requiresEditorialEnrichment: questions.length - publicationReady,
  };
}
