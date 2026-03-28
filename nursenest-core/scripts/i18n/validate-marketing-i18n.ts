/**
 * Validates marketing JSON overlays against marketing-en.json:
 * - full key parity (every base key present in each overlay)
 * - no empty strings
 * - placeholder tokens {{name}} match English template
 * - optional: critical-surface English leakage (overlay === base) when I18N_FAIL_ON_EN_LEAKAGE=1
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isMarketingCriticalKey } from "../../src/lib/i18n/marketing-i18n-critical";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreRoot = path.resolve(__dirname, "../..");
const contentDir = path.join(coreRoot, "src/content");
const reportDir = path.join(coreRoot, "reports");
const basePath = path.join(contentDir, "marketing-en.json");
const localeDir = path.join(contentDir, "locale");

const FAIL_LEAKAGE = process.env.I18N_FAIL_ON_EN_LEAKAGE === "1";

function extractPlaceholders(s: string): Set<string> {
  const set = new Set<string>();
  const re = /\{\{(\w+)\}\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    set.add(m[1]);
  }
  return set;
}

function setsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function loadJson(p: string): Record<string, string> {
  const raw = fs.readFileSync(p, "utf8");
  const j = JSON.parse(raw) as unknown;
  if (typeof j !== "object" || j === null || Array.isArray(j)) {
    throw new Error(`invalid JSON object: ${p}`);
  }
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(j)) {
    if (typeof v !== "string") {
      throw new Error(`${p}: key "${k}" must be a string`);
    }
    out[k] = v;
  }
  return out;
}

function main() {
  const base = loadJson(basePath);
  const baseKeys = Object.keys(base).sort();
  const totalCriticalInBase = baseKeys.filter((k) => isMarketingCriticalKey(k)).length;
  const errors: string[] = [];
  const warnings: string[] = [];
  const perLocale: Record<
    string,
    {
      missingKeys: number;
      emptyValues: number;
      placeholderMismatches: number;
      extraKeys: number;
      criticalStillEnglish: number;
      criticalKeysInBase: number;
      totalStillEnglish: number;
    }
  > = {};

  const localeFiles = fs.readdirSync(localeDir).filter((f) => /^marketing-[a-z-]+\.json$/i.test(f));

  for (const file of localeFiles.sort()) {
    const localeCode = file.replace(/^marketing-/, "").replace(/\.json$/i, "");
    if (localeCode === "en") continue;

    const full = path.join(localeDir, file);
    let overlay: Record<string, string>;
    try {
      overlay = loadJson(full);
    } catch (e) {
      errors.push(`${file}: ${e instanceof Error ? e.message : String(e)}`);
      continue;
    }

    let missingKeys = 0;
    let emptyValues = 0;
    let placeholderMismatches = 0;
    let criticalStillEnglish = 0;
    let totalStillEnglish = 0;

    for (const k of baseKeys) {
      if (!(k in overlay)) {
        missingKeys++;
        errors.push(`${file}: missing key "${k}"`);
        continue;
      }
      if (overlay[k] === "") {
        emptyValues++;
        errors.push(`${file}: empty value for "${k}"`);
      }
      const phBase = extractPlaceholders(base[k]);
      const phLoc = extractPlaceholders(overlay[k]);
      if (!setsEqual(phBase, phLoc)) {
        placeholderMismatches++;
        errors.push(
          `${file}: placeholder mismatch for "${k}" (en: ${[...phBase].join(",")} vs locale: ${[...phLoc].join(",")})`,
        );
      }
      if (overlay[k] === base[k]) {
        totalStillEnglish++;
        if (isMarketingCriticalKey(k)) {
          criticalStillEnglish++;
          if (FAIL_LEAKAGE) {
            errors.push(`${file}: critical key still English: "${k}"`);
          }
        }
      }
    }

    const extra = Object.keys(overlay).filter((k) => !Object.prototype.hasOwnProperty.call(base, k));
    if (extra.length > 0) {
      warnings.push(
        `${file}: ${extra.length} extra keys not in base (allowed): ${extra.slice(0, 5).join(", ")}${extra.length > 5 ? "…" : ""}`,
      );
    }

    if (criticalStillEnglish > 0 && process.env.I18N_QUIET !== "1") {
      warnings.push(
        `${file}: ${criticalStillEnglish}/${totalCriticalInBase} critical-surface keys still match English (translate overlays to clear)`,
      );
    }

    perLocale[localeCode] = {
      missingKeys,
      emptyValues,
      placeholderMismatches,
      extraKeys: extra.length,
      criticalStillEnglish,
      criticalKeysInBase: totalCriticalInBase,
      totalStillEnglish,
    };
  }

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  const reportPath = path.join(reportDir, "marketing-i18n-validation.json");
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseKeyCount: baseKeys.length,
        locales: perLocale,
        errorCount: errors.length,
        warningCount: warnings.length,
        failOnEnglishLeakage: FAIL_LEAKAGE,
        criticalKeysInBase: totalCriticalInBase,
      },
      null,
      2,
    ) + "\n",
  );

  if (warnings.length && process.env.I18N_QUIET !== "1") {
    console.warn("\n[i18n warnings]\n" + warnings.slice(0, 80).join("\n"));
    if (warnings.length > 80) console.warn(`… and ${warnings.length - 80} more warnings`);
  }

  if (errors.length) {
    console.error("\n[i18n validation FAILED]\n" + errors.join("\n"));
    process.exit(1);
  }

  console.log(`marketing i18n OK — ${baseKeys.length} base keys, ${localeFiles.length} locale files, report: ${reportPath}`);
}

main();
