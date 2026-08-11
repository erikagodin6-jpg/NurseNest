import { pool } from "../server/storage";

const APPLY = process.argv.includes("--apply");
const localeArg = process.argv.find(arg => arg.startsWith("--locale="));
const LOCALE = localeArg ? localeArg.split("=")[1] : null;

type Issue = { code: string; field: string; severity: "blocking" | "quality"; detail: string };

function text(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }
function parse(value: any): any { if (typeof value !== "string") return value; try { return JSON.parse(value); } catch { return value; } }
function substantive(value: unknown, min: number): boolean { return text(value).length >= min && !/^(?:todo|tbd|placeholder|none|n\/a)$/i.test(text(value)); }
function optionIds(raw: any): string[] {
  const options = parse(raw);
  if (!Array.isArray(options)) return [];
  return options.map((option: any) => text(option?.id || option?.optionId || option?.option_id)).filter(Boolean);
}
function recursiveIds(value: any, out = new Set<string>()): Set<string> {
  const parsed = parse(value);
  if (!parsed || typeof parsed !== "object") return out;
  if (Array.isArray(parsed)) {
    for (const item of parsed) recursiveIds(item, out);
    return out;
  }
  for (const [key, item] of Object.entries(parsed)) {
    if ((key === "id" || key.endsWith("Id") || key.endsWith("_id")) && typeof item === "string" && item.trim()) out.add(item.trim());
    else recursiveIds(item, out);
  }
  return out;
}
function sameSet(a: Iterable<string>, b: Iterable<string>): boolean {
  const aa = new Set(a), bb = new Set(b);
  return aa.size === bb.size && [...aa].every(value => bb.has(value));
}
function issue(code: string, field: string, detail: string, severity: "blocking" | "quality" = "blocking"): Issue { return { code, field, detail, severity }; }

async function enabledLocales(): Promise<string[]> {
  if (LOCALE) return [LOCALE];
  try {
    const result = await pool.query(`SELECT locale FROM locale_settings WHERE enabled = true AND locale <> 'en' ORDER BY locale`);
    if (result.rows.length) return result.rows.map((row: any) => row.locale);
  } catch {}
  const result = await pool.query(`SELECT DISTINCT locale FROM exam_question_translations WHERE locale <> 'en' ORDER BY locale`);
  return result.rows.map((row: any) => row.locale);
}

async function localeConfig(locale: string) {
  try {
    const result = await pool.query(`SELECT strict_mode, allow_reviewed, allow_english_fallback, enabled FROM locale_settings WHERE locale=$1 LIMIT 1`, [locale]);
    if (result.rows[0]) return result.rows[0];
  } catch {}
  return { strict_mode: true, allow_reviewed: false, allow_english_fallback: false, enabled: true };
}

async function main() {
  const locales = await enabledLocales();
  const report: any = { mode: APPLY ? "apply" : "audit", locales: {}, totals: { requiredPairs: 0, verified: 0, blocked: 0, missingTranslation: 0 } };

  for (const locale of locales) {
    const config = await localeConfig(locale);
    if (!config.enabled) continue;
    // Locales with explicit English fallback are reported but do not define strict translation completion.
    const strictRequired = Boolean(config.strict_mode) && !Boolean(config.allow_english_fallback);
    const statuses = config.allow_reviewed ? ["approved", "reviewed"] : ["approved"];
    const source = await pool.query(`
      SELECT id, contract_question_id, contract_options, contract_interaction_payload,
             contract_correct_answer_ids, contract_distractor_rationales,
             contract_unit_system_support, contract_unit_variants,
             contract_country_labels, question_type
      FROM exam_questions
      WHERE status='published' AND publication_contract_version >= 2 AND contract_status='verified'
      ORDER BY id
    `);
    const stats: any = { strictRequired, questions: source.rows.length, verified: 0, blocked: 0, missingTranslation: 0, issues: {}, samples: [] };

    for (const question of source.rows) {
      if (strictRequired) report.totals.requiredPairs++;
      const transResult = await pool.query(`SELECT * FROM exam_question_translations WHERE exam_question_id=$1 AND locale=$2 LIMIT 1`, [question.id, locale]);
      if (!transResult.rows.length) {
        stats.missingTranslation++;
        if (strictRequired) report.totals.missingTranslation++;
        if (stats.samples.length < 100) stats.samples.push({ questionId: question.id, issue: "missing_translation" });
        continue;
      }
      const t = transResult.rows[0];
      const issues: Issue[] = [];
      if (!statuses.includes(t.translation_status)) issues.push(issue("translation_not_approved", "translation_status", `Expected ${statuses.join(" or ")}; found ${t.translation_status}`));
      if (!substantive(t.stem, 10)) issues.push(issue("missing_translated_stem", "stem", "Translated stem is missing."));
      if (!substantive(t.rationale, 40)) issues.push(issue("missing_translated_rationale", "rationale", "Translated rationale is missing or too short."));

      const translatedOptions = parse(t.contract_options?.length ? t.contract_options : t.options);
      const sourceOptionIds = optionIds(question.contract_options);
      if (sourceOptionIds.length) {
        const translatedIds = optionIds(translatedOptions);
        if (!sameSet(sourceOptionIds, translatedIds)) issues.push(issue("translated_option_identity_mismatch", "contract_options", "Translated options must preserve the exact source stable option IDs."));
      } else {
        const sourceIds = recursiveIds(question.contract_interaction_payload);
        const translatedPayload = parse(t.contract_interaction_payload);
        const translatedIds = recursiveIds(translatedPayload);
        if (!sourceIds.size || !sameSet(sourceIds, translatedIds)) issues.push(issue("translated_interaction_identity_mismatch", "contract_interaction_payload", "Structured translation must preserve every source interaction ID."));
      }

      const sourceDistractors = parse(question.contract_distractor_rationales) || {};
      const translatedDistractors = parse(t.contract_distractor_rationales?.length ? t.contract_distractor_rationales : t.distractor_rationales) || {};
      for (const key of Object.keys(sourceDistractors)) {
        if (!substantive(translatedDistractors[key], 24)) issues.push(issue("missing_translated_distractor_rationale", `contract_distractor_rationales.${key}`, `Translated rationale for incorrect option ${key} is missing.`));
      }

      const correctExplanation = text(t.contract_correct_answer_explanation) || text(t.correct_answer_explanation);
      const hint = text(t.contract_hint) || text(t.exam_strategy);
      const why = text(t.contract_why_this_matters) || text(t.key_takeaway) || text(t.clinical_reasoning);
      const pearl = text(t.contract_clinical_pearl) || text(t.clinical_pearl);
      if (!substantive(correctExplanation, 24)) issues.push(issue("missing_translated_correct_answer_explanation", "contract_correct_answer_explanation", "Correct-answer explanation is missing in the target locale."));
      if (!substantive(hint, 12)) issues.push(issue("missing_translated_hint", "contract_hint", "Tutor hint is missing in the target locale."));
      if (!substantive(why, 20)) issues.push(issue("missing_translated_why_this_matters", "contract_why_this_matters", "Why This Matters is missing in the target locale."));
      if (!substantive(pearl, 12)) issues.push(issue("missing_translated_clinical_pearl", "contract_clinical_pearl", "Clinical/exam pearl is missing in the target locale."));

      // Unit semantics are not translated; values/tokens must remain identical to the source contract.
      const sourceUnits = JSON.stringify(parse(question.contract_unit_variants) || []);
      const translatedUnits = JSON.stringify(parse(t.contract_unit_variants) || []);
      if (sourceUnits !== translatedUnits) issues.push(issue("translated_unit_contract_changed", "contract_unit_variants", "Translation must preserve canonical unit tokens and numerical values exactly."));

      const status = issues.some(item => item.severity === "blocking") ? "blocked" : issues.length ? "quality_only" : "verified";
      if (strictRequired) {
        if (status === "verified") report.totals.verified++;
        else report.totals.blocked++;
      }
      if (status === "verified") stats.verified++; else stats.blocked++;
      for (const item of issues) stats.issues[item.code] = (stats.issues[item.code] || 0) + 1;
      if (issues.length && stats.samples.length < 100) stats.samples.push({ questionId: question.id, issues });

      if (APPLY) {
        await pool.query(`
          UPDATE exam_question_translations SET
            contract_options=$1::jsonb,
            contract_interaction_payload=$2::jsonb,
            contract_distractor_rationales=$3::jsonb,
            contract_correct_answer_explanation=$4,
            contract_hint=$5,
            contract_why_this_matters=$6,
            contract_clinical_pearl=$7,
            contract_mnemonic=$8,
            contract_country_labels=$9::jsonb,
            contract_unit_system_support=$10::jsonb,
            contract_unit_variants=$11::jsonb,
            publication_contract_version=2,
            contract_status=$12,
            contract_issues=$13::jsonb,
            contract_verified_at=NOW()
          WHERE id=$14
        `, [
          JSON.stringify(translatedOptions || []),
          JSON.stringify(parse(t.contract_interaction_payload) || parse(question.contract_interaction_payload) || {}),
          JSON.stringify(translatedDistractors),
          correctExplanation || null,
          hint || null,
          why || null,
          pearl || null,
          text(t.contract_mnemonic) || text(t.mnemonic) || text(t.memory_hook) || null,
          JSON.stringify(parse(t.contract_country_labels) || parse(question.contract_country_labels) || []),
          JSON.stringify(parse(t.contract_unit_system_support) || parse(question.contract_unit_system_support) || {}),
          sourceUnits,
          status,
          JSON.stringify(issues),
          t.id,
        ]);
      }
    }
    report.locales[locale] = stats;
  }

  console.log(JSON.stringify(report, null, 2));
  if (report.totals.blocked || report.totals.missingTranslation) process.exitCode = 2;
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { try { await pool.end(); } catch {} });
