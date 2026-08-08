import OpenAI from "openai";
import { pool } from "../server/storage";

const APPLY = process.argv.includes("--apply");
const AI = process.argv.includes("--ai");
const localeArg = process.argv.find(arg => arg.startsWith("--locale="));
const LOCALE = localeArg ? localeArg.split("=")[1] : null;
const limitArg = process.argv.find(arg => arg.startsWith("--limit="));
const LIMIT = limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 1) : Number.POSITIVE_INFINITY;

function text(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }
function parse(value: any): any { if (typeof value !== "string") return value; try { return JSON.parse(value); } catch { return value; } }
function ids(value: any, out = new Set<string>()): Set<string> {
  const parsed = parse(value);
  if (!parsed || typeof parsed !== "object") return out;
  if (Array.isArray(parsed)) { for (const item of parsed) ids(item, out); return out; }
  for (const [key, item] of Object.entries(parsed)) {
    if ((key === "id" || key.endsWith("Id") || key.endsWith("_id")) && typeof item === "string" && item.trim()) out.add(item.trim());
    else ids(item, out);
  }
  return out;
}
function sameSet(a: Iterable<string>, b: Iterable<string>): boolean {
  const aa = new Set(a), bb = new Set(b);
  return aa.size === bb.size && [...aa].every(value => bb.has(value));
}
function substantive(value: unknown, min: number): boolean { return text(value).length >= min && !/^(?:todo|tbd|placeholder|none|n\/a)$/i.test(text(value)); }

async function strictLocales(): Promise<string[]> {
  if (LOCALE) return [LOCALE];
  const result = await pool.query(`
    SELECT locale FROM locale_settings
    WHERE enabled=true AND locale <> 'en' AND COALESCE(strict_mode,true)=true AND COALESCE(allow_english_fallback,false)=false
    ORDER BY locale
  `).catch(() => ({ rows: [] as any[] }));
  return result.rows.map((row: any) => row.locale);
}

function translatedOptions(sourceOptions: any, generated: any): any[] {
  const source = parse(sourceOptions);
  if (!Array.isArray(source)) return [];
  const values = Array.isArray(generated) ? generated : [];
  return source.map((option: any, index: number) => {
    const sourceId = text(option?.id);
    const candidate = values.find((item: any) => text(item?.id) === sourceId) || values[index];
    if (!sourceId || !candidate) return option;
    return { ...option, ...candidate, id: sourceId, label: option?.label ?? candidate?.label, text: text(candidate?.text) || text(option?.text) };
  });
}

function validateGenerated(source: any, generated: any): string[] {
  const issues: string[] = [];
  if (!substantive(generated.stem, 10)) issues.push("stem");
  if (!substantive(generated.rationale, 40)) issues.push("rationale");
  if (!substantive(generated.correctAnswerExplanation, 24)) issues.push("correctAnswerExplanation");
  if (!substantive(generated.hint, 12)) issues.push("hint");
  if (!substantive(generated.whyThisMatters, 20)) issues.push("whyThisMatters");
  if (!substantive(generated.clinicalPearl, 12)) issues.push("clinicalPearl");

  const sourceOptions = parse(source.contract_options);
  if (Array.isArray(sourceOptions) && sourceOptions.length) {
    const translated = translatedOptions(sourceOptions, generated.options);
    const sourceIds = new Set(sourceOptions.map((option: any) => text(option?.id)).filter(Boolean));
    const translatedIds = new Set(translated.map((option: any) => text(option?.id)).filter(Boolean));
    if (!sameSet(sourceIds, translatedIds)) issues.push("optionIds");
    const sourceDistractors = parse(source.contract_distractor_rationales) || {};
    const generatedDistractors = generated.distractorRationales || {};
    for (const key of Object.keys(sourceDistractors)) if (!substantive(generatedDistractors[key], 24)) issues.push(`distractor:${key}`);
  } else {
    const sourceIds = ids(source.contract_interaction_payload);
    const generatedIds = ids(generated.interactionPayload);
    if (!sourceIds.size || !sameSet(sourceIds, generatedIds)) issues.push("interactionIds");
  }
  return issues;
}

function promptFor(source: any, locale: string): string {
  return `You are a medical exam localization editor. Translate ONE canonical question into locale ${locale}. Preserve every stable ID and every clinical fact exactly.\n\nSOURCE CANONICAL QUESTION:\n${JSON.stringify({
    id: source.contract_question_id,
    stem: source.stem,
    options: source.contract_options,
    interactionPayload: source.contract_interaction_payload,
    rationale: source.contract_rationale || source.rationale,
    distractorRationales: source.contract_distractor_rationales,
    correctAnswerExplanation: source.contract_correct_answer_explanation || source.correct_answer_explanation,
    hint: source.contract_hint,
    whyThisMatters: source.contract_why_this_matters,
    clinicalPearl: source.contract_clinical_pearl,
    mnemonic: source.contract_mnemonic,
  }, null, 2)}\n\nReturn ONLY JSON with fields:\n{\n  "stem":"translated stem",\n  "options":[{"id":"EXACT SOURCE ID","text":"translated display text","label":"same display label"}],\n  "interactionPayload":{},\n  "rationale":"translated rationale",\n  "distractorRationales":{"EXACT SOURCE OPTION ID":"translated rationale"},\n  "correctAnswerExplanation":"translated explanation",\n  "hint":"translated hint",\n  "whyThisMatters":"translated significance",\n  "clinicalPearl":"translated pearl",\n  "mnemonic":"translate only when a meaningful mnemonic exists; otherwise empty"\n}\n\nRules:\n- NEVER translate, regenerate, reorder, or change IDs.\n- Flat-option questions: preserve every option ID and return the same number of options.\n- Structured questions: preserve the complete interactionPayload structure and every nested ID while translating human-readable text values only.\n- Distractor rationales must keep the exact source stable-ID keys.\n- Do not alter drug names, numerical values, answer meaning, or unit semantics.\n- Do not add citations or markdown.`;
}

function parseModel(raw: string): any {
  const match = raw.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Translation model did not return JSON");
  return JSON.parse(match[0]);
}

async function upsert(source: any, locale: string, value: any) {
  const options = translatedOptions(source.contract_options, value.options);
  const interactionPayload = Object.keys(parse(source.contract_interaction_payload) || {}).length ? value.interactionPayload : {};
  const distractors = value.distractorRationales || {};
  await pool.query(`
    INSERT INTO exam_question_translations (
      exam_question_id, locale, stem, options, rationale, clinical_pearl, exam_strategy,
      memory_hook, correct_answer_explanation, distractor_rationales, key_takeaway, mnemonic,
      contract_options, contract_interaction_payload, contract_distractor_rationales,
      contract_correct_answer_explanation, contract_hint, contract_why_this_matters,
      contract_clinical_pearl, contract_mnemonic, contract_country_labels,
      contract_unit_system_support, contract_unit_variants,
      publication_contract_version, contract_status, contract_issues, contract_verified_at,
      translation_status, source_version, updated_at, created_at
    ) VALUES (
      $1,$2,$3,$4::jsonb,$5,$6,$7,$8,$9,$10::jsonb,$11,$12,
      $13::jsonb,$14::jsonb,$15::jsonb,$16,$17,$18,$19,$20,$21::jsonb,$22::jsonb,$23::jsonb,
      2,'verified','[]'::jsonb,NOW(),'approved',1,NOW(),NOW()
    )
    ON CONFLICT (exam_question_id, locale) DO UPDATE SET
      stem=EXCLUDED.stem, options=EXCLUDED.options, rationale=EXCLUDED.rationale,
      clinical_pearl=EXCLUDED.clinical_pearl, exam_strategy=EXCLUDED.exam_strategy,
      memory_hook=EXCLUDED.memory_hook, correct_answer_explanation=EXCLUDED.correct_answer_explanation,
      distractor_rationales=EXCLUDED.distractor_rationales, key_takeaway=EXCLUDED.key_takeaway,
      mnemonic=EXCLUDED.mnemonic, contract_options=EXCLUDED.contract_options,
      contract_interaction_payload=EXCLUDED.contract_interaction_payload,
      contract_distractor_rationales=EXCLUDED.contract_distractor_rationales,
      contract_correct_answer_explanation=EXCLUDED.contract_correct_answer_explanation,
      contract_hint=EXCLUDED.contract_hint, contract_why_this_matters=EXCLUDED.contract_why_this_matters,
      contract_clinical_pearl=EXCLUDED.contract_clinical_pearl, contract_mnemonic=EXCLUDED.contract_mnemonic,
      contract_country_labels=EXCLUDED.contract_country_labels,
      contract_unit_system_support=EXCLUDED.contract_unit_system_support,
      contract_unit_variants=EXCLUDED.contract_unit_variants,
      publication_contract_version=2, contract_status='verified', contract_issues='[]'::jsonb,
      contract_verified_at=NOW(), translation_status='approved', source_version=exam_question_translations.source_version+1,
      updated_at=NOW()
  `, [
    source.id, locale, value.stem, JSON.stringify(options), value.rationale,
    value.clinicalPearl, value.hint, value.mnemonic || null, value.correctAnswerExplanation,
    JSON.stringify(distractors), value.whyThisMatters, value.mnemonic || null,
    JSON.stringify(options), JSON.stringify(interactionPayload || {}), JSON.stringify(distractors),
    value.correctAnswerExplanation, value.hint, value.whyThisMatters, value.clinicalPearl,
    value.mnemonic || null, JSON.stringify(parse(source.contract_country_labels) || []),
    JSON.stringify(parse(source.contract_unit_system_support) || {}), JSON.stringify(parse(source.contract_unit_variants) || []),
  ]);
}

async function main() {
  const locales = await strictLocales();
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const openai = AI && apiKey ? new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) }) : null;
  const report: any = { mode: APPLY ? (AI ? "apply+ai" : "apply") : "audit", locales: {}, totals: { missingOrIncomplete: 0, translated: 0, failed: 0 } };
  let remaining = LIMIT;

  for (const locale of locales) {
    if (remaining <= 0) break;
    const sourceResult = await pool.query(`
      SELECT * FROM exam_questions
      WHERE status='published' AND publication_contract_version>=2 AND contract_status='verified'
      ORDER BY id
    `);
    const stats: any = { scanned: 0, missingOrIncomplete: 0, translated: 0, failed: 0, failures: [] };
    for (const source of sourceResult.rows) {
      if (remaining-- <= 0) break;
      stats.scanned++;
      const existing = await pool.query(`SELECT * FROM exam_question_translations WHERE exam_question_id=$1 AND locale=$2 LIMIT 1`, [source.id, locale]);
      const row = existing.rows[0];
      const existingComplete = row && row.translation_status === "approved" && row.publication_contract_version >= 2 && row.contract_status === "verified";
      if (existingComplete) continue;
      stats.missingOrIncomplete++; report.totals.missingOrIncomplete++;
      if (!APPLY) continue;
      if (!openai) throw new Error("--apply --ai requires AI_INTEGRATIONS_OPENAI_API_KEY or OPENAI_API_KEY for missing translations");
      try {
        const response = await openai.chat.completions.create({
          model: process.env.QUESTION_REPAIR_MODEL || "gpt-4o-mini",
          temperature: 0.15,
          max_tokens: 6000,
          messages: [{ role: "user", content: promptFor(source, locale) }],
        });
        const value = parseModel(response.choices[0]?.message?.content || "");
        const issues = validateGenerated(source, value);
        if (issues.length) throw new Error(`Translation contract validation failed: ${issues.join(", ")}`);
        await upsert(source, locale, value);
        stats.translated++; report.totals.translated++;
      } catch (error) {
        stats.failed++; report.totals.failed++;
        stats.failures.push({ questionId: source.id, error: error instanceof Error ? error.message : String(error) });
      }
    }
    report.locales[locale] = stats;
  }

  console.log(JSON.stringify(report, null, 2));
  if (report.totals.failed || (!APPLY && report.totals.missingOrIncomplete)) process.exitCode = 2;
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { try { await pool.end(); } catch {} });
