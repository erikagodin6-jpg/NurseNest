import { writeFileSync, mkdirSync } from "fs";
import path from "path";

const LANGUAGES = [
  "en", "fr", "tl", "hi", "es", "zh", "zh-tw", "ar", "ko",
  "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id",
];

export async function compileI18n() {
  const outDir = path.resolve(process.cwd(), "client/public/i18n");
  mkdirSync(outDir, { recursive: true });
  for (const lang of LANGUAGES) {
    const mod = await import(`../client/src/lib/i18n-${lang}`);
    const key = Object.keys(mod).find((k: string) => typeof mod[k] === "object" && !Array.isArray(mod[k]));
    if (!key) continue;
    writeFileSync(path.join(outDir, `${lang}.json`), JSON.stringify(mod[key]));
  }
  console.log(`compiled ${LANGUAGES.length} i18n files to JSON`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("compile-i18n.ts")) {
  compileI18n().catch(console.error);
}
