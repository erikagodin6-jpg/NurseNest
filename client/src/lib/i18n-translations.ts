import type { LanguageCode } from "./i18n";

const LANG_LOADERS: Record<string, () => Promise<{ default: Record<string, string> }>> = {
  fr: () => import("./i18n-fr"),
  tl: () => import("./i18n-tl"),
  hi: () => import("./i18n-hi"),
  es: () => import("./i18n-es"),
  zh: () => import("./i18n-zh"),
  ar: () => import("./i18n-ar"),
  ko: () => import("./i18n-ko"),
  pt: () => import("./i18n-pt"),
  pa: () => import("./i18n-pa"),
  vi: () => import("./i18n-vi"),
  ht: () => import("./i18n-ht"),
  ur: () => import("./i18n-ur"),
  ja: () => import("./i18n-ja"),
  fa: () => import("./i18n-fa"),
  de: () => import("./i18n-de"),
  th: () => import("./i18n-th"),
};

const loadedTranslations: Partial<Record<LanguageCode, Record<string, string>>> = {};

export async function loadLanguage(lang: LanguageCode): Promise<Record<string, string>> {
  if (loadedTranslations[lang]) return loadedTranslations[lang]!;

  const langKey = lang === "tl" ? "tl" : lang;
  const loader = LANG_LOADERS[langKey];
  if (!loader) return {};

  const mod = await loader();
  loadedTranslations[lang] = mod.default;
  return mod.default;
}

export function getLoadedTranslations(lang: LanguageCode): Record<string, string> | undefined {
  return loadedTranslations[lang];
}

export function hasLoader(lang: LanguageCode): boolean {
  const langKey = lang === "tl" ? "tl" : lang;
  return !!LANG_LOADERS[langKey];
}

