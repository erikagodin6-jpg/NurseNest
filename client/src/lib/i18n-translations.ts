import type { LanguageCode } from "./i18n";

const AVAILABLE_LANGS = new Set([
  "fr", "tl", "hi", "es", "zh", "zh-tw", "ar", "ko",
  "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id",
]);

const loadedTranslations: Partial<Record<LanguageCode, Record<string, string>>> = {};

export async function loadLanguage(lang: LanguageCode): Promise<Record<string, string>> {
  if (loadedTranslations[lang]) return loadedTranslations[lang]!;

  const langKey = lang === "tl" ? "tl" : lang;
  if (!AVAILABLE_LANGS.has(langKey)) return {};

  try {
    const res = await fetch(`/i18n/${langKey}.json`);
    if (!res.ok) return {};
    const data = await res.json();
    loadedTranslations[lang] = data;
    return data;
  } catch {
    return {};
  }
}

export function getLoadedTranslations(lang: LanguageCode): Record<string, string> | undefined {
  return loadedTranslations[lang];
}

export function hasLoader(lang: LanguageCode): boolean {
  const langKey = lang === "tl" ? "tl" : lang;
  return AVAILABLE_LANGS.has(langKey);
}
