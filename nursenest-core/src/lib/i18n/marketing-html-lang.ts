/**
 * BCP 47 tags for <html lang="..."> and related SEO hints.
 * Maps marketing route segment codes to standard language tags.
 */
const LOCALE_TO_HTML_LANG: Record<string, string> = {
  en: "en",
  fr: "fr",
  tl: "fil",
  hi: "hi",
  es: "es",
  zh: "zh-Hans",
  "zh-tw": "zh-Hant",
  ar: "ar",
  ko: "ko",
  pt: "pt",
  pa: "pa",
  vi: "vi",
  ht: "ht",
  ur: "ur",
  ja: "ja",
  fa: "fa",
  de: "de",
  th: "th",
  tr: "tr",
  id: "id",
};

export function marketingLocaleToHtmlLang(locale: string): string {
  return LOCALE_TO_HTML_LANG[locale] ?? locale;
}
