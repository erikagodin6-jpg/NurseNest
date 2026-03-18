import type { Request, Response, NextFunction } from "express";
import { detectLanguage } from "../i18n/languageValidation";

const SUPPORTED_LOCALES = new Set([
  "en", "fr", "es", "tl", "hi", "zh", "zh-tw", "ar", "ko",
  "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id",
]);

const LOCALE_ALIASES: Record<string, string> = {
  "fr-ca": "fr",
  "es-mx": "es",
  "pt-br": "pt",
  "zh-hans": "zh",
  "zh-hant": "zh-tw",
  "zh-cn": "zh",
};

function resolveLocale(raw: string | undefined): string {
  if (!raw) return "en";
  const lower = raw.toLowerCase().trim();
  if (SUPPORTED_LOCALES.has(lower)) return lower;
  if (LOCALE_ALIASES[lower]) return LOCALE_ALIASES[lower];
  const base = lower.split("-")[0];
  if (SUPPORTED_LOCALES.has(base)) return base;
  return "en";
}

export function blockMixedLanguageRender(req: Request, res: Response, next: NextFunction): void {
  const rawLocale =
    req.query.locale as string ||
    req.query.lang as string ||
    req.params.locale ||
    req.headers["x-locale"] as string ||
    req.headers["accept-language"]?.split(",")[0]?.split(";")[0];

  const locale = resolveLocale(rawLocale);
  (res as any).locals.locale = locale;

  (res as any).locals.assertLocaleMatch = function assertLocaleMatch(content: string, contentLocale?: string): boolean {
    if (locale === "en") return true;

    if (contentLocale) {
      const normalizedContent = resolveLocale(contentLocale);
      if (normalizedContent !== locale) {
        return false;
      }
      return true;
    }

    if (content && content.length > 20) {
      const detection = detectLanguage(content);
      if (detection.confidence > 0.5) {
        const detectedLocale = resolveLocale(detection.language);
        if (detectedLocale !== locale && detectedLocale !== "en") {
          return false;
        }
      }
    }

    return true;
  };

  next();
}
