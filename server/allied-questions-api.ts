import type { Express, Request, Response } from "express";

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
}

const PROFESSIONS: ProfessionConfig[] = [
  {
    key: "rrt",
    label: "Respiratory Therapy",
    examNames: "NBRC TMC/CSE, CSRT",
    importPath: "../client/src/data/career-questions/rrt-questions",
    exportName: "rrtQuestions",
  },
  {
    key: "mlt",
    label: "Medical Laboratory Technology",
    examNames: "ASCP BOC, CSMLS CMLTO",
    importPath: "../client/src/data/career-questions/mlt-questions",
    exportName: "mltQuestions",
  },
  {
    key: "imaging",
    label: "Medical Imaging",
    examNames: "ARRT, CAMRT",
    importPath: "../client/src/data/career-questions/imaging-questions",
    exportName: "imagingQuestions",
  },
];

const questionsCache: Record<string, any[]> = {};

async function loadQuestions(profession: ProfessionConfig): Promise<any[]> {
  if (questionsCache[profession.key]) return questionsCache[profession.key];
  const mod = await import(profession.importPath);
  questionsCache[profession.key] = mod[profession.exportName] as any[];
  return questionsCache[profession.key];
}

interface TopicGroup {
  topicSlug: string;
  topic: string;
  category: string;
  questionCount: number;
  difficulties: number[];
}

export function registerAlliedQuestionsRoutes(app: Express) {
  for (const profession of PROFESSIONS) {
    app.get(`/api/${profession.key}/question-topics`, async (_req: Request, res: Response) => {
      try {
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

        const topics = Array.from(topicMap.values())
          .sort((a, b) => b.questionCount - a.questionCount || a.topic.localeCompare(b.topic));

        const categories = new Map<string, { category: string; categorySlug: string; topicCount: number; questionCount: number }>();
        for (const t of topics) {
          const catSlug = slugify(t.category);
          if (!categories.has(catSlug)) {
            categories.set(catSlug, { category: t.category, categorySlug: catSlug, topicCount: 0, questionCount: 0 });
          }
          const cat = categories.get(catSlug)!;
          cat.topicCount++;
          cat.questionCount += t.questionCount;
        }

        res.json({
          topics,
          categories: Array.from(categories.values()).sort((a, b) => b.questionCount - a.questionCount),
          totalQuestions: questions.length,
          totalTopics: topics.length,
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

export function getAlliedQuestionTopicSlugs(): { profession: string; slugs: string[] }[] {
  const results: { profession: string; slugs: string[] }[] = [];
  for (const profession of PROFESSIONS) {
    const cached = questionsCache[profession.key];
    if (cached) {
      const slugSet = new Set<string>();
      for (const q of cached) {
        slugSet.add(slugify(q.topic));
      }
      results.push({ profession: profession.key, slugs: Array.from(slugSet) });
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
