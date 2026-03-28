#!/usr/bin/env node
/**
 * Writes reports/localization-inventory.json — supported locales, file inventory,
 * key counts, and notes on UI vs content vs SEO layers (content DB requires separate audit).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreRoot = path.resolve(__dirname, "../..");
const contentDir = path.join(coreRoot, "src/content");
const localeDir = path.join(contentDir, "locale");
const reportDir = path.join(coreRoot, "reports");

const MARKETING_LOCALES = [
  "en",
  "fr",
  "tl",
  "hi",
  "es",
  "zh",
  "zh-tw",
  "ar",
  "ko",
  "pt",
  "pa",
  "vi",
  "ht",
  "ur",
  "ja",
  "fa",
  "de",
  "th",
  "tr",
  "id",
];

const base = JSON.parse(fs.readFileSync(path.join(contentDir, "marketing-en.json"), "utf8"));
const baseKeys = Object.keys(base).length;

const overlays = {};
for (const file of fs.readdirSync(localeDir).filter((f) => f.startsWith("marketing-") && f.endsWith(".json"))) {
  const code = file.replace(/^marketing-/, "").replace(/\.json$/, "");
  const j = JSON.parse(fs.readFileSync(path.join(localeDir, file), "utf8"));
  overlays[code] = { path: `src/content/locale/${file}`, keyCount: Object.keys(j).length };
}

if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

const report = {
  generatedAt: new Date().toISOString(),
  supportedMarketingLocales: MARKETING_LOCALES,
  defaultLocale: "en",
  prefixedRouteLocales: MARKETING_LOCALES.filter((c) => c !== "en"),
  marketingUi: {
    baseFile: "src/content/marketing-en.json",
    baseKeyCount: baseKeys,
    overlayFiles: overlays,
    layers: {
      uiStrings: "Flat key/value JSON merged in loadMarketingMessages (en base + locale overlay).",
      seoMetadata:
        "Per-route generateMetadata in (marketing) routes; programmatic SEO uses programmatic-metadata.ts hreflang.",
      contentBacked:
        "Lessons, questions, flashcards: single-language string fields in Postgres (no locale column in schema). Localization would require schema + import pipeline changes. Use npm run content:inventory / content:quality when DB is available.",
    },
  },
  studentApp: {
    status: "not_marketing_i18n",
    note: "Authenticated student surfaces (app routes) primarily use English copy in components; audit separately if multi-language app UI is required.",
  },
  validation: {
    script: "scripts/i18n/validate-marketing-i18n.ts",
    output: "reports/marketing-i18n-validation.json",
    buildGate: "Runs before next build via package.json build script.",
  },
};

fs.writeFileSync(path.join(reportDir, "localization-inventory.json"), JSON.stringify(report, null, 2) + "\n");
console.log(`wrote ${path.join(reportDir, "localization-inventory.json")}`);
