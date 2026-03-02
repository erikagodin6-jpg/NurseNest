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
