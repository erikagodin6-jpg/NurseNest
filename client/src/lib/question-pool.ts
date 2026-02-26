import { contentMap } from "@/data/lessons";
import type { QuizQuestion } from "@/data/lessons/types";
import { getLessonBodySystem } from "@/lib/seo-utils";

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
