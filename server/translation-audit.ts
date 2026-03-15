import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __audit_dirname = (() => {
  try {
    if (typeof __dirname !== "undefined") return __dirname;
  } catch {}
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {}
  return process.cwd();
})();

const SUPPORTED_LOCALES = ["en", "fr", "es", "fil", "hi", "zh", "zh-tw", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const TRANSLATION_THRESHOLD = 95;

export type TranslationReadiness = "Ready for Indexing" | "Partial Translation" | "Draft Translation" | "Hidden from Sitemap";

export interface TranslationAuditResult {
  locale: string;
  route: string;
  totalKeys: number;
  translatedKeys: number;
  percentage: number;
  untranslatedKeys: string[];
  readiness: TranslationReadiness;
  isIndexable: boolean;
}

let enKeysCache: string[] | null = null;
let translationKeysCache: Record<string, Set<string>> = {};
let cacheLoaded = false;

function loadTranslationKeys(): void {
  if (cacheLoaded) return;
  cacheLoaded = true;

  try {
    const enPath = path.resolve(__audit_dirname, "../client/src/lib/i18n-en.ts");
    const altEnPath = path.resolve(process.cwd(), "client/src/lib/i18n-en.ts");
    const filePath = fs.existsSync(enPath) ? enPath : altEnPath;

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const keyRegex = /"([^"]+)":\s*"/g;
      const keys: string[] = [];
      let match;
      while ((match = keyRegex.exec(content)) !== null) {
        keys.push(match[1]);
      }
      enKeysCache = keys;
    }
  } catch (e) {
    console.error("Failed to load English translation keys:", e);
    enKeysCache = [];
  }

const LANG_FILES = ["fr", "tl", "hi", "es", "zh", "zh-tw", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id"];
  for (const lang of LANG_FILES) {
    try {
      const langPath = path.resolve(__audit_dirname, `../client/src/lib/i18n-${lang}.ts`);
      const altLangPath = path.resolve(process.cwd(), `client/src/lib/i18n-${lang}.ts`);
      const langFile = fs.existsSync(langPath) ? langPath : altLangPath;

      if (fs.existsSync(langFile)) {
        const content = fs.readFileSync(langFile, "utf-8");
        const keyRegex = /"([^"]+)":\s*"/g;
        const keys = new Set<string>();
        let km;
        while ((km = keyRegex.exec(content)) !== null) {
          keys.add(km[1]);
        }
        translationKeysCache[lang] = keys;
      }
    } catch (e) {
      console.error(`Failed to load translation keys for ${lang}:`, e);
    }
  }

  const translationsDir = path.resolve(process.cwd(), "client/src/data/translations");
  if (fs.existsSync(translationsDir)) {
    const files = fs.readdirSync(translationsDir).filter(f => f.endsWith(".json"));
    for (const file of files) {
      const lang = file.replace(".json", "");
      if (lang === "en") continue;
      const mappedLang = lang === "tl" ? "fil" : lang;
      if (!translationKeysCache[mappedLang]) {
        translationKeysCache[mappedLang] = new Set();
      }
    }
  }
}

function getEnglishKeyCount(): number {
  loadTranslationKeys();
  return enKeysCache?.length || 0;
}

function getTranslatedKeyCount(locale: string): number {
  loadTranslationKeys();
  const langCode = locale === "fil" ? "tl" : locale;
  return translationKeysCache[langCode]?.size || translationKeysCache[locale]?.size || 0;
}

function getUntranslatedKeys(locale: string, limit = 50): string[] {
  loadTranslationKeys();
  if (!enKeysCache) return [];
  const langCode = locale === "fil" ? "tl" : locale;
  const translatedSet = translationKeysCache[langCode] || translationKeysCache[locale] || new Set();
  const untranslated: string[] = [];
  for (const key of enKeysCache) {
    if (!translatedSet.has(key)) {
      untranslated.push(key);
      if (untranslated.length >= limit) break;
    }
  }
  return untranslated;
}

function determineReadiness(percentage: number): TranslationReadiness {
  if (percentage >= TRANSLATION_THRESHOLD) return "Ready for Indexing";
  if (percentage >= 70) return "Partial Translation";
  if (percentage >= 30) return "Draft Translation";
  return "Hidden from Sitemap";
}

export function auditTranslation(locale: string, route: string = "/"): TranslationAuditResult {
  if (locale === "en") {
    const totalKeys = getEnglishKeyCount();
    return {
      locale: "en",
      route,
      totalKeys,
      translatedKeys: totalKeys,
      percentage: 100,
      untranslatedKeys: [],
      readiness: "Ready for Indexing",
      isIndexable: true,
    };
  }

  const totalKeys = getEnglishKeyCount();
  const translatedKeys = getTranslatedKeyCount(locale);
  const percentage = totalKeys > 0 ? Math.round((translatedKeys / totalKeys) * 10000) / 100 : 0;
  const untranslatedKeys = getUntranslatedKeys(locale);
  const readiness = determineReadiness(percentage);

  return {
    locale,
    route,
    totalKeys,
    translatedKeys,
    percentage,
    untranslatedKeys,
    readiness,
    isIndexable: percentage >= TRANSLATION_THRESHOLD,
  };
}

export function auditAllLocales(route: string = "/"): TranslationAuditResult[] {
  return SUPPORTED_LOCALES.map(locale => auditTranslation(locale, route));
}

export function getIndexableLocales(): string[] {
  return SUPPORTED_LOCALES.filter(locale => {
    if (locale === "en") return true;
    return auditTranslation(locale).isIndexable;
  });
}

export function isLocaleIndexable(locale: string): boolean {
  if (locale === "en") return true;
  return auditTranslation(locale).isIndexable;
}

export function getTranslationThreshold(): number {
  return TRANSLATION_THRESHOLD;
}

export function getSupportedLocales(): readonly string[] {
  return SUPPORTED_LOCALES;
}

export function getLocaleDirection(locale: string): "ltr" | "rtl" {
  const RTL_LOCALES = new Set(["ar", "ur", "fa"]);
  return RTL_LOCALES.has(locale) ? "rtl" : "ltr";
}

export function getHreflangCode(locale: string): string {
  const HREFLANG_MAP: Record<string, string> = {
    en: "en-ca", fr: "fr-ca", es: "es", fil: "fil", hi: "hi",
    zh: "zh", "zh-tw": "zh-TW", ar: "ar", ko: "ko", pt: "pt", pa: "pa",
    vi: "vi", ht: "ht", ur: "ur", ja: "ja", fa: "fa",
de: "de", th: "th", tr: "tr",
  };
  return HREFLANG_MAP[locale] || locale;
}

export function invalidateCache(): void {
  enKeysCache = null;
  translationKeysCache = {};
  cacheLoaded = false;
}

export type DbContentCheckResult = {
  locale: string;
  contentType: string;
  contentId: string;
  hasTranslation: boolean;
  translatedFields: string[];
  requiredFields: string[];
  missingFields: string[];
  shouldNoindex: boolean;
};

const REQUIRED_FIELDS_BY_TYPE: Record<string, string[]> = {
  lesson: ["title", "content"],
  module: ["title", "description"],
  question: ["stem", "rationale"],
  flashcard: ["front", "back"],
  glossary: ["term", "definition"],
  seo_page: ["title", "content_html"],
  faq: ["question", "answer"],
};

export async function checkDbContentTranslation(
  contentType: string,
  contentId: string,
  locale: string
): Promise<DbContentCheckResult> {
  if (locale === "en") {
    const requiredFields = REQUIRED_FIELDS_BY_TYPE[contentType] || [];
    return {
      locale,
      contentType,
      contentId,
      hasTranslation: true,
      translatedFields: requiredFields,
      requiredFields,
      missingFields: [],
      shouldNoindex: false,
    };
  }

  const requiredFields = REQUIRED_FIELDS_BY_TYPE[contentType] || [];
  if (requiredFields.length === 0) {
    return {
      locale,
      contentType,
      contentId,
      hasTranslation: true,
      translatedFields: [],
      requiredFields: [],
      missingFields: [],
      shouldNoindex: false,
    };
  }

  try {
    const { pool } = await import("./storage");
    const result = await pool.query(
      `SELECT field_name FROM content_translations
       WHERE content_type = $1 AND content_id = $2 AND language_code = $3
       AND translated_text IS NOT NULL AND translated_text != ''`,
      [contentType, contentId, locale]
    );

    const translatedFields = result.rows.map((r: any) => r.field_name);
    const missingFields = requiredFields.filter(f => !translatedFields.includes(f));
    const hasTranslation = missingFields.length === 0;

    return {
      locale,
      contentType,
      contentId,
      hasTranslation,
      translatedFields,
      requiredFields,
      missingFields,
      shouldNoindex: !hasTranslation,
    };
  } catch (e) {
    return {
      locale,
      contentType,
      contentId,
      hasTranslation: false,
      translatedFields: [],
      requiredFields,
      missingFields: requiredFields,
      shouldNoindex: true,
    };
  }
}
