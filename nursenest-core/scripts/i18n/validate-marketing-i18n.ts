/**
 * Validates marketing JSON overlays against marketing-en.json:
 * - Structural: full key parity, no empty strings, placeholder {{tokens}} match base
 * - Severity: P0 / P1 / P2 (see marketing-i18n-severity.ts)
 * - Certified locales: P0 English leakage (overlay === base) fails when I18N_ENFORCE_CERTIFIED=1
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  classifyMarketingKey,
  isP0Key,
  type MarketingI18nSeverity,
} from "../../src/lib/i18n/marketing-i18n-severity";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreRoot = path.resolve(__dirname, "../..");
const contentDir = path.join(coreRoot, "src/content");
const reportDir = path.join(coreRoot, "reports");
const basePath = path.join(contentDir, "marketing-en.json");
const localeDir = path.join(contentDir, "locale");
const certifiedPath = path.join(contentDir, "i18n", "certified-locales.json");

const QUIET = process.env.I18N_QUIET === "1";
/** When "1", certified locales must not have P0 strings identical to English. Default: on unless "0". */
const ENFORCE_CERTIFIED =
  process.env.I18N_ENFORCE_CERTIFIED !== "0" && process.env.I18N_ENFORCE_CERTIFIED !== "false";

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

function loadCertifiedLocales(): Set<string> {
  try {
    const raw = fs.readFileSync(certifiedPath, "utf8");
    const j = JSON.parse(raw) as { certifiedLocales?: string[] };
    if (Array.isArray(j.certifiedLocales)) return new Set(j.certifiedLocales);
  } catch {
    /* no certified list */
  }
  return new Set();
}

function main() {
  const certified = loadCertifiedLocales();
  const base = loadJson(basePath);
  const baseKeys = Object.keys(base).sort();
  const p0KeyCount = baseKeys.filter((k) => isP0Key(k)).length;
  const errors: string[] = [];
  const warnings: string[] = [];

  const perLocale: Record<
    string,
    {
      missingKeys: number;
      emptyValues: number;
      placeholderMismatches: number;
      extraKeys: number;
      p0StillEnglish: number;
      p1StillEnglish: number;
      p2StillEnglish: number;
      p0KeyCount: number;
      certified: boolean;
      p0LeakageFailures: string[];
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
    let p0StillEnglish = 0;
    let p1StillEnglish = 0;
    let p2StillEnglish = 0;
    const p0LeakageFailures: string[] = [];

    const isCertified = certified.has(localeCode);

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
        const { severity } = classifyMarketingKey(k);
        if (severity === "P0") {
          p0StillEnglish++;
          if (isCertified && ENFORCE_CERTIFIED) {
            p0LeakageFailures.push(k);
            errors.push(`${file}: [P0/certified] untranslated (matches English): "${k}"`);
          }
        } else if (severity === "P1") {
          p1StillEnglish++;
        } else {
          p2StillEnglish++;
        }
      }
    }

    const extra = Object.keys(overlay).filter((k) => !Object.prototype.hasOwnProperty.call(base, k));
    if (extra.length > 0) {
      warnings.push(
        `${file}: ${extra.length} extra keys not in base: ${extra.slice(0, 5).join(", ")}${extra.length > 5 ? "…" : ""}`,
      );
    }

    if (!QUIET) {
      if (p0StillEnglish > 0 && (!isCertified || !ENFORCE_CERTIFIED)) {
        const reason = !isCertified
          ? "locale not listed in src/content/i18n/certified-locales.json"
          : "I18N_ENFORCE_CERTIFIED is off";
        warnings.push(`${file}: P0 English leakage ${p0StillEnglish}/${p0KeyCount} keys (not failing: ${reason})`);
      }
      if (p1StillEnglish > 0) {
        warnings.push(`${file}: P1 English leakage ${p1StillEnglish} keys (non-blocking)`);
      }
    }

    perLocale[localeCode] = {
      missingKeys,
      emptyValues,
      placeholderMismatches,
      extraKeys: extra.length,
      p0StillEnglish,
      p1StillEnglish,
      p2StillEnglish,
      p0KeyCount,
      certified: isCertified,
      p0LeakageFailures,
    };
  }

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const severitySummary: Record<MarketingI18nSeverity, number> = { P0: 0, P1: 0, P2: 0 };
  for (const k of baseKeys) {
    severitySummary[classifyMarketingKey(k).severity]++;
  }

  const reportPath = path.join(reportDir, "marketing-i18n-validation.json");
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseKeyCount: baseKeys.length,
        severityKeyCounts: severitySummary,
        p0KeyCount,
        certifiedLocales: [...certified],
        enforceCertifiedP0Leakage: ENFORCE_CERTIFIED,
        locales: perLocale,
        errorCount: errors.length,
        warningCount: warnings.length,
      },
      null,
      2,
    ) + "\n",
  );

  if (warnings.length && !QUIET) {
    console.warn("\n[i18n warnings]\n" + warnings.slice(0, 100).join("\n"));
    if (warnings.length > 100) console.warn(`… and ${warnings.length - 100} more warnings`);
  }

  if (errors.length) {
    console.error("\n[i18n validation FAILED]\n" + errors.slice(0, 200).join("\n"));
    if (errors.length > 200) console.error(`… and ${errors.length - 200} more errors`);
    process.exit(1);
  }

  console.log(`marketing i18n OK — ${baseKeys.length} base keys, report: ${reportPath}`);
}

main();
