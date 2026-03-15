import { writeFileSync, mkdirSync } from "fs";
import path from "path";

const LANGUAGES = [
  "en", "fr", "tl", "hi", "es", "zh", "zh-tw", "ar", "ko",
  "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id",
];

const EXPECTED_EXPORT_NAMES: Record<string, string> = {
  en: "enTranslations",
  fr: "frTranslations",
  tl: "tlTranslations",
  hi: "hiTranslations",
  es: "esTranslations",
  zh: "zhTranslations",
  "zh-tw": "zhTwTranslations",
  ar: "arTranslations",
  ko: "koTranslations",
  pt: "ptTranslations",
  pa: "paTranslations",
  vi: "viTranslations",
  ht: "htTranslations",
  ur: "urTranslations",
  ja: "jaTranslations",
  fa: "faTranslations",
  de: "deTranslations",
  th: "thTranslations",
  tr: "trTranslations",
  id: "idTranslations",
};

export async function compileI18n() {
  const outDir = path.resolve(process.cwd(), "client/public/i18n");
  mkdirSync(outDir, { recursive: true });
  const errors: string[] = [];
  for (const lang of LANGUAGES) {
    const mod = await import(`../client/src/lib/i18n-${lang}`);
    const exportName = EXPECTED_EXPORT_NAMES[lang];
    const data = mod[exportName] ?? mod.default;
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      errors.push(`i18n-${lang}.ts: missing or invalid export "${exportName}"`);
      continue;
    }
    const keys = Object.keys(data);
    if (keys.length < 10) {
      errors.push(`i18n-${lang}.ts: suspiciously few keys (${keys.length})`);
      continue;
    }
    const json = JSON.stringify(data);
    writeFileSync(path.join(outDir, `${lang}.json`), json);
  }
  if (errors.length > 0) {
    console.error("[i18n] Compilation errors:\n  " + errors.join("\n  "));
    throw new Error(`i18n compilation failed: ${errors.length} error(s)`);
  }
  console.log(`compiled ${LANGUAGES.length} i18n files to JSON`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("compile-i18n.ts")) {
  compileI18n().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
