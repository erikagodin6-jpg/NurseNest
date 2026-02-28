import type { LessonContent } from "@/data/lessons/types";
import { contentMap } from "@/data/lessons";
import type { LanguageCode } from "./i18n";

export type I18nValue<T = string> = Partial<Record<LanguageCode, T>> & { en: T };

export function getI18n<T = string>(obj: I18nValue<T> | T | undefined | null, lang: LanguageCode, fallback: LanguageCode = "en"): T {
  if (obj === undefined || obj === null) return "" as unknown as T;
  if (typeof obj === "string" || typeof obj !== "object") return obj as T;
  const map = obj as Partial<Record<LanguageCode, T>>;
  return map[lang] ?? map[fallback] ?? map["en"] ?? ("" as unknown as T);
}

type LessonTranslationOverrides = {
  title?: string;
  overview?: string;
  pathophysiology?: string;
  lifespan?: string;
  riskFactors?: string[];
  diagnostics?: string[];
  management?: string[];
  nursingActions?: string[];
  assessmentFindings?: string[];
  clinicalPearls?: string[];
  medications?: { name: string; type: string; action: string; sideEffects: string; contra: string; pearl: string }[];
  signs?: { left: string[]; right: string[] };
  quiz?: { question: string; options: string[]; correct: number; rationale: string }[];
  preTest?: { question: string; options: string[]; correct: number; rationale: string }[];
  postTest?: { question: string; options: string[]; correct: number; rationale: string }[];
};

type TranslationStore = Record<string, Record<string, LessonTranslationOverrides>>;

let translationStore: TranslationStore = {};
let storeLoaded = false;

const translationModules: Record<string, () => Promise<{ default: Record<string, LessonTranslationOverrides> }>> = {
  fr: () => import("@/data/translations/fr.json"),
  es: () => import("@/data/translations/es.json"),
  zh: () => import("@/data/translations/zh.json"),
  ar: () => import("@/data/translations/ar.json"),
  hi: () => import("@/data/translations/hi.json"),
  pt: () => import("@/data/translations/pt.json"),
  tl: () => import("@/data/translations/tl.json"),
  ko: () => import("@/data/translations/ko.json"),
  ja: () => import("@/data/translations/ja.json"),
  de: () => import("@/data/translations/de.json"),
  vi: () => import("@/data/translations/vi.json"),
  pa: () => import("@/data/translations/pa.json"),
  ur: () => import("@/data/translations/ur.json"),
  fa: () => import("@/data/translations/fa.json"),
  ht: () => import("@/data/translations/ht.json"),
};

const loadedLanguages = new Set<string>();
const loadingPromises = new Map<string, Promise<void>>();

export async function loadTranslationLanguage(lang: string): Promise<void> {
  if (lang === "en" || loadedLanguages.has(lang)) return;
  if (loadingPromises.has(lang)) return loadingPromises.get(lang);

  const loader = translationModules[lang];
  if (!loader) return;

  const promise = loader()
    .then((mod) => {
      translationStore[lang] = mod.default;
      loadedLanguages.add(lang);
      storeLoaded = true;
    })
    .catch(() => {
      translationStore[lang] = {};
      loadedLanguages.add(lang);
    });
  loadingPromises.set(lang, promise);
  return promise;
}

export function getLessonTitle(lessonId: string, lang: LanguageCode): string {
  if (lang !== "en") {
    const translated = translationStore[lang]?.[lessonId]?.title;
    if (translated) return translated;
  }
  const base = contentMap[lessonId];
  return base?.title || "";
}

export function getLessonI18n(lessonId: string, lang: LanguageCode): LessonContent | null {
  const base = contentMap[lessonId];
  if (!base) return null;
  if (lang === "en") return base;

  const overrides = translationStore[lang]?.[lessonId];
  if (!overrides) return base;

  const merged = { ...base };

  if (overrides.title) merged.title = overrides.title;
  if (overrides.overview && (merged as any).cellular) {
    (merged as any).cellular = { ...(merged as any).cellular, content: overrides.overview };
  }
  if (overrides.riskFactors) merged.riskFactors = overrides.riskFactors;
  if (overrides.diagnostics) merged.diagnostics = overrides.diagnostics;
  if (overrides.management) merged.management = overrides.management;
  if (overrides.nursingActions) merged.nursingActions = overrides.nursingActions;
  if (overrides.assessmentFindings) merged.assessmentFindings = overrides.assessmentFindings;
  if (overrides.clinicalPearls) (merged as any).pearls = overrides.clinicalPearls;
  if (overrides.medications) merged.medications = overrides.medications;
  if (overrides.signs) merged.signs = overrides.signs;
  if (overrides.quiz) merged.quiz = overrides.quiz;
  if (overrides.preTest) merged.preTest = overrides.preTest;
  if (overrides.postTest) merged.postTest = overrides.postTest;
  if (overrides.lifespan && (merged as any).lifespan) {
    (merged as any).lifespan = { ...(merged as any).lifespan, content: overrides.lifespan };
  }

  return merged;
}

export function getTranslationStore(): TranslationStore {
  return translationStore;
}

export function isTranslationLoaded(lang: string): boolean {
  return lang === "en" || loadedLanguages.has(lang);
}
