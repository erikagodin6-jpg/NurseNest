import { writeFileSync, mkdirSync } from "fs";
import path from "path";

const LANGUAGES = [
  "en", "fr", "tl", "hi", "es", "zh", "zh-tw", "ar", "ko",
  "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id",
];

async function compileI18n() {
  const outDir = path.resolve(process.cwd(), "client/public/i18n");
  mkdirSync(outDir, { recursive: true });

  for (const lang of LANGUAGES) {
    const modulePath = `../client/src/lib/i18n-${lang}`;
    try {
      const mod = await import(modulePath);
      const key = Object.keys(mod).find(k => typeof mod[k] === "object" && !Array.isArray(mod[k]));
      if (!key) {
        console.warn(`[i18n] No translation object found in i18n-${lang}.ts`);
        continue;
      }
      const data = mod[key];
      const outPath = path.join(outDir, `${lang}.json`);
      writeFileSync(outPath, JSON.stringify(data));
      const size = JSON.stringify(data).length;
      console.log(`[i18n] ${lang}: ${Object.keys(data).length} keys, ${(size / 1024).toFixed(1)}KB → ${outPath}`);
    } catch (err: any) {
      console.error(`[i18n] Failed to compile ${lang}:`, err.message);
    }
  }
  console.log("[i18n] Done compiling all UI translations to JSON");
}

compileI18n().catch(console.error);
