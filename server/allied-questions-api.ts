import type { Express, Request, Response } from "express";
import { createRateLimiter, abuseEscalationMiddleware, botDetectionMiddleware } from "./abuse-protection";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ProfessionConfig {
  key: string;
  label: string;
  examNames: string;
  importPath: string;
  exportName: string;
  additionalImports?: { importPath: string; exportName: string }[];
}

const PROFESSIONS: ProfessionConfig[] = [
  {
    key: "rrt",
    label: "Respiratory Therapy",
    examNames: "NBRC TMC/CSE, CSRT",
    importPath: "../client/src/data/career-questions/rrt-questions",
    exportName: "rrtQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/rrt-questions-batch1", exportName: "rrtQuestionsBatch1" },
      { importPath: "../client/src/data/career-questions/rrt-questions-batch2", exportName: "rrtQuestionsBatch2" },
      { importPath: "../client/src/data/career-questions/rrt-questions-batch3", exportName: "rrtQuestionsBatch3" },
    ],
  },
  {
    key: "mlt",
    label: "Medical Laboratory Technology",
    examNames: "ASCP BOC, CSMLS CMLTO",
    importPath: "../client/src/data/career-questions/mlt-questions",
    exportName: "mltQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/mlt-questions-batch2", exportName: "mltQuestionsBatch2" },
      { importPath: "../client/src/data/career-questions/mlt-questions-expansion", exportName: "mltQuestionsExpansion" },
    ],
  },
  {
    key: "imaging",
    label: "Medical Imaging",
    examNames: "ARRT, CAMRT",
    importPath: "../client/src/data/career-questions/imaging-questions",
    exportName: "imagingQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/imaging-questions-expansion", exportName: "imagingQuestionsExpansion" },
      { importPath: "../client/src/data/career-questions/imaging-questions-expansion-2", exportName: "imagingQuestionsExpansion2" },
    ],
  },
  {
    key: "occupationalTherapy",
    label: "Occupational Therapy Assistant",
    examNames: "NBCOT COTA",
    importPath: "../client/src/data/career-questions/ota-questions",
    exportName: "otaQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/ota-questions-expansion", exportName: "otaQuestionsExpansion" },
    ],
  },
  {
    key: "physicalTherapy",
    label: "Physical Therapy Assistant",
    examNames: "NPTE-PTA, FSBPT",
    importPath: "../client/src/data/career-questions/pta-questions",
    exportName: "ptaQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/pta-questions-expansion", exportName: "ptaQuestionsExpansion" },
    ],
  },
  {
    key: "surgicalTechnologist",
    label: "Surgical Technologist",
    examNames: "CST, NBSTSA",
    importPath: "../client/src/data/career-questions/surgical-technologist-questions",
    exportName: "surgicalTechnologistQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/surgical-technologist-questions-2", exportName: "surgicalTechnologistQuestionsPart2" },
      { importPath: "../client/src/data/career-questions/surgical-technologist-questions-3", exportName: "surgicalTechnologistQuestionsPart3" },
      { importPath: "../client/src/data/career-questions/surgical-technologist-questions-4", exportName: "surgicalTechnologistQuestionsPart4" },
      { importPath: "../client/src/data/career-questions/surgical-technologist-questions-5", exportName: "surgicalTechnologistQuestionsPart5" },
      { importPath: "../client/src/data/career-questions/surgical-technologist-questions-6", exportName: "surgicalTechnologistQuestionsPart6" },
      { importPath: "../client/src/data/career-questions/surgical-technologist-questions-7", exportName: "surgicalTechnologistQuestionsPart7" },
    ],
  },
  {
    key: "healthInfoMgmt",
    label: "Health Information Management",
    examNames: "RHIT, RHIA, AHIMA",
    importPath: "../client/src/data/career-questions/him-questions",
    exportName: "himQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/him-questions-batch2", exportName: "himQuestionsBatch2" },
    ],
  },
  {
    key: "diagnosticSonography",
    label: "Diagnostic Sonography",
    examNames: "ARDMS SPI, RDMS",
    importPath: "../client/src/data/career-questions/sonography-questions",
    exportName: "sonographyQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/sonography-questions-batch2", exportName: "sonographyQuestionsBatch2" },
    ],
  },
  {
    key: "cardiacSonographer",
    label: "Cardiac Sonography",
    examNames: "ARDMS RDCS, CCI RCS",
    importPath: "../client/src/data/career-questions/cardiac-sonographer-questions",
    exportName: "cardiacSonographerQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/cardiac-sonographer-questions-batch2", exportName: "cardiacSonographerQuestionsBatch2" },
    ],
  },
  {
    key: "paramedic",
    label: "Paramedic",
    examNames: "NREMT Paramedic",
    importPath: "../client/src/data/career-questions/paramedic-questions",
    exportName: "paramedicQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/paramedic-questions-expansion", exportName: "paramedicQuestionsExpansion" },
    ],
  },
  {
    key: "pharmacyTech",
    label: "Pharmacy Technician",
    examNames: "PTCB CPHT, ExCPT",
    importPath: "../client/src/data/career-questions/pharmacy-tech-questions",
    exportName: "pharmacyTechQuestions",
    additionalImports: [
      { importPath: "../client/src/data/career-questions/pharmacy-tech-questions-batch2", exportName: "pharmacyTechQuestionsBatch2" },
      { importPath: "../client/src/data/career-questions/pharmacy-tech-questions-batch3", exportName: "pharmacyTechQuestionsBatch3" },
      { importPath: "../client/src/data/career-questions/pharmacy-tech-questions-batch4", exportName: "pharmacyTechQuestionsBatch4" },
      { importPath: "../client/src/data/career-questions/pharmacy-tech-questions-extended", exportName: "pharmacyTechQuestionsExtended" },
      { importPath: "../client/src/data/career-questions/pharmacy-tech-questions-pebc", exportName: "pharmacyTechQuestionsPEBC" },
      { importPath: "../client/src/data/career-questions/pharmacy-tech-questions-expansion", exportName: "pharmacyTechQuestionsExpansion" },
    ],
  },
];

interface BatchRef {
  importPath: string;
  exportName: string;
}

interface CacheEntry {
  batches: BatchRef[];
  totalCount: number;
  accessedAt: number;
  createdAt: number;
}

const batchCache: Record<string, CacheEntry> = {};
const MAX_CACHE_ENTRIES = parseInt(process.env.ALLIED_CACHE_MAX || "0") || 6;
const CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_TOTAL_CACHED_QUESTIONS = 5000;

let cacheHits = 0;
let cacheMisses = 0;
let cacheEvictions = 0;

function getTotalCachedQuestionCount(): number {
  let total = 0;
  for (const key of Object.keys(batchCache)) {
    total += batchCache[key].totalCount;
  }
  return total;
}

function evictCacheEntry(key: string, reason: string): void {
  const entry = batchCache[key];
  const count = entry?.totalCount || 0;
  delete batchCache[key];
  cacheEvictions++;
  console.log(`[AlliedCache] Evicted (${reason}): ${key} (${count} questions)`);
}

export function clearAlliedQuestionsCache(): void {
  const count = Object.keys(batchCache).length;
  for (const key of Object.keys(batchCache)) {
    delete batchCache[key];
  }
  if (count > 0) {
    cacheEvictions += count;
    console.log(`[AlliedCache] Cleared all ${count} cache entries`);
  }
}

function evictExpiredCacheEntries(): void {
  const now = Date.now();
  for (const key of Object.keys(batchCache)) {
    if (now - batchCache[key].createdAt > CACHE_TTL_MS) {
      evictCacheEntry(key, "expired");
    }
  }
}

function evictLRUEntry(excludeKey?: string): string | null {
  const keys = Object.keys(batchCache).filter(k => k !== excludeKey);
  if (keys.length === 0) return null;
  const sorted = keys.sort((a, b) => batchCache[a].accessedAt - batchCache[b].accessedAt);
  const lruKey = sorted[0];
  evictCacheEntry(lruKey, "LRU");
  return lruKey;
}

function evictLRUQuestionCache(excludeKey?: string): void {
  evictExpiredCacheEntries();
  const keys = Object.keys(batchCache);
  if (keys.length < MAX_CACHE_ENTRIES) return;
  const sorted = keys.filter(k => k !== excludeKey).sort((a, b) => batchCache[a].accessedAt - batchCache[b].accessedAt);
  const toRemove = sorted.slice(0, keys.length - MAX_CACHE_ENTRIES + 1);
  for (const key of toRemove) {
    evictCacheEntry(key, "capacity");
  }
}

function enforceQuestionCountCap(currentKey?: string): void {
  while (getTotalCachedQuestionCount() > MAX_TOTAL_CACHED_QUESTIONS) {
    const keysExcludingCurrent = Object.keys(batchCache).filter(k => k !== currentKey);
    if (keysExcludingCurrent.length > 0) {
      if (!evictLRUEntry(currentKey)) break;
    } else {
      if (currentKey && batchCache[currentKey]) {
        console.warn(`[AlliedCache] Single profession '${currentKey}' (${batchCache[currentKey].totalCount} questions) exceeds cap of ${MAX_TOTAL_CACHED_QUESTIONS}; evicting to stay within bounds`);
        evictCacheEntry(currentKey, "exceeds-cap-alone");
      }
      break;
    }
  }
}

export function pruneAlliedCachesUnderPressure(): void {
  const keys = Object.keys(batchCache);
  const half = Math.ceil(keys.length / 2);
  const sorted = keys.sort((a, b) => batchCache[a].accessedAt - batchCache[b].accessedAt);
  for (let i = 0; i < half; i++) {
    evictCacheEntry(sorted[i], "pressure");
  }
}

async function assembleBatches(batches: BatchRef[]): Promise<any[]> {
  const result: any[] = [];
  for (const batch of batches) {
    const mod = await import(batch.importPath);
    const arr = mod[batch.exportName] as any[];
    result.push(...arr);
  }
  return result;
}

async function loadQuestions(profession: ProfessionConfig): Promise<any[]> {
  const cached = batchCache[profession.key];
  if (cached) {
    if (Date.now() - cached.createdAt > CACHE_TTL_MS) {
      evictCacheEntry(profession.key, "TTL");
    } else {
      cached.accessedAt = Date.now();
      cacheHits++;
      const questions = await assembleBatches(cached.batches);
      console.log(`[AlliedCache] HIT: ${profession.key} | assembled=${questions.length} | cacheSize=${Object.keys(batchCache).length} | totalCachedCount=${getTotalCachedQuestionCount()} | hits=${cacheHits} misses=${cacheMisses} evictions=${cacheEvictions}`);
      return questions;
    }
  }

  cacheMisses++;
  evictLRUQuestionCache(profession.key);

  const batches: BatchRef[] = [{ importPath: profession.importPath, exportName: profession.exportName }];
  if (profession.additionalImports) {
    for (const extra of profession.additionalImports) {
      batches.push({ importPath: extra.importPath, exportName: extra.exportName });
    }
  }

  const questions = await assembleBatches(batches);

  batchCache[profession.key] = {
    batches,
    totalCount: questions.length,
    accessedAt: Date.now(),
    createdAt: Date.now(),
  };
  enforceQuestionCountCap(profession.key);

  console.log(`[AlliedCache] MISS: ${profession.key} | assembled=${questions.length} | cacheSize=${Object.keys(batchCache).length} | totalCachedCount=${getTotalCachedQuestionCount()} | hits=${cacheHits} misses=${cacheMisses} evictions=${cacheEvictions}`);
  return questions;
}

interface TopicGroup {
  topicSlug: string;
  topic: string;
  category: string;
  questionCount: number;
  difficulties: number[];
}

export function registerAlliedQuestionsRoutes(app: Express) {
  const contentBrowseLimiter = createRateLimiter("content_browse");

  for (const profession of PROFESSIONS) {
    app.get(`/api/${profession.key}/question-topics`, abuseEscalationMiddleware, botDetectionMiddleware, contentBrowseLimiter, async (_req: Request, res: Response) => {
      try {
        const page = Math.max(1, parseInt(_req.query.page as string) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(_req.query.limit as string) || 50));
        const categoryFilter = (_req.query.category as string) || "";

        const questions = await loadQuestions(profession);
        const topicMap = new Map<string, TopicGroup>();

        for (const q of questions) {
          const slug = slugify(q.topic);
          if (!topicMap.has(slug)) {
            topicMap.set(slug, {
              topicSlug: slug,
              topic: q.topic,
              category: q.category,
              questionCount: 0,
              difficulties: [],
            });
          }
          const group = topicMap.get(slug)!;
          group.questionCount++;
          if (!group.difficulties.includes(q.difficulty)) {
            group.difficulties.push(q.difficulty);
          }
        }

        let topics = Array.from(topicMap.values())
          .sort((a, b) => b.questionCount - a.questionCount || a.topic.localeCompare(b.topic));

        if (categoryFilter) {
          topics = topics.filter(t => slugify(t.category) === categoryFilter);
        }

        const totalTopics = topics.length;
        const offset = (page - 1) * limit;
        const paginatedTopics = topics.slice(offset, offset + limit);

        const categories = new Map<string, { category: string; categorySlug: string; topicCount: number; questionCount: number }>();
        for (const t of Array.from(topicMap.values())) {
          const catSlug = slugify(t.category);
          if (!categories.has(catSlug)) {
            categories.set(catSlug, { category: t.category, categorySlug: catSlug, topicCount: 0, questionCount: 0 });
          }
          const cat = categories.get(catSlug)!;
          cat.topicCount++;
          cat.questionCount += t.questionCount;
        }

        res.json({
          topics: paginatedTopics,
          categories: Array.from(categories.values()).sort((a, b) => b.questionCount - a.questionCount),
          totalQuestions: questions.length,
          totalTopics,
          page,
          limit,
          totalPages: Math.ceil(totalTopics / limit),
        });
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });

    app.get(`/api/${profession.key}/question-topics/:topicSlug`, async (req: Request, res: Response) => {
      try {
        const { topicSlug } = req.params;
        const questions = await loadQuestions(profession);

        const topicQuestions = questions.filter(q => slugify(q.topic) === topicSlug);
        if (topicQuestions.length === 0) {
          return res.status(404).json({ error: "Topic not found" });
        }

        const topic = topicQuestions[0].topic;
        const category = topicQuestions[0].category;

        const sampleQuestions = topicQuestions.slice(0, 10).map(q => ({
          id: q.id,
          stem: q.stem,
          options: q.options,
          correctIndex: q.correctIndex,
          rationale: q.rationale,
          difficulty: q.difficulty,
        }));

        const relatedTopics = questions
          .filter(q => q.category === category && slugify(q.topic) !== topicSlug)
          .reduce((acc: Map<string, { topicSlug: string; topic: string; questionCount: number }>, q) => {
            const slug = slugify(q.topic);
            if (!acc.has(slug)) {
              acc.set(slug, { topicSlug: slug, topic: q.topic, questionCount: 0 });
            }
            acc.get(slug)!.questionCount++;
            return acc;
          }, new Map());

        res.json({
          topicSlug,
          topic,
          category,
          categorySlug: slugify(category),
          totalQuestions: topicQuestions.length,
          sampleQuestions,
          relatedTopics: Array.from(relatedTopics.values()).slice(0, 8),
          difficulties: Array.from(new Set(topicQuestions.map(q => q.difficulty))).sort(),
          profession: profession.key,
          professionLabel: profession.label,
          examNames: profession.examNames,
        });
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });
  }
}

export async function getAlliedQuestionTopicSlugs(): Promise<{ profession: string; slugs: string[] }[]> {
  const results: { profession: string; slugs: string[] }[] = [];
  for (const profession of PROFESSIONS) {
    const cached = batchCache[profession.key];
    if (cached) {
      try {
        const questions = await assembleBatches(cached.batches);
        const slugSet = new Set<string>();
        for (const q of questions) {
          slugSet.add(slugify(q.topic));
        }
        results.push({ profession: profession.key, slugs: Array.from(slugSet) });
      } catch (e) {
        console.error(`[AlliedCache] Failed to assemble batches for topic slugs: ${profession.key}`, e);
      }
    }
  }
  return results;
}

export async function getAlliedQuestionTopicSlugsAsync(): Promise<{ profession: string; slugs: string[] }[]> {
  const results: { profession: string; slugs: string[] }[] = [];
  for (const profession of PROFESSIONS) {
    try {
      const questions = await loadQuestions(profession);
      const slugSet = new Set<string>();
      for (const q of questions) {
        slugSet.add(slugify(q.topic));
      }
      results.push({ profession: profession.key, slugs: Array.from(slugSet) });
    } catch {}
  }
  return results;
}
