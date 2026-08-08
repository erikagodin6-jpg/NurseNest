import OpenAI from "openai";
import { createHash } from "crypto";
import { pool } from "../server/storage";
import { auditQuestionPublicationContract, type CanonicalOption } from "../server/question-publication-contract";

type JsonRecord = Record<string, unknown>;
type Row = Record<string, any>;

type TableConfig = {
  table: string;
  id: string;
  stem: string;
  options: string;
  correct: string;
  rationale?: string;
  distractors?: string;
  correctExplanation?: string;
  hint?: string;
  why?: string;
  pearl?: string;
  mnemonic?: string;
  country?: string;
  region?: string;
  language?: string;
  licensingBody?: string;
  exam?: string;
  questionType?: string;
  tier?: string;
  bodySystem?: string;
  topic?: string;
  tags?: string;
  difficulty?: string;
  unitSupport?: string;
  unitVariants?: string;
  status?: string;
};

const EXAM_COUNTRY: Array<[RegExp, string]> = [
  [/\bREx[- ]?PN\b/i, "CA"],
  [/\bCNPLE\b/i, "CA"],
  [/\bCPNRE\b/i, "CA"],
  [/\bNCLEX(?:-RN|-PN)?\b/i, "US"],
  [/\bANCC\b/i, "US"],
  [/\bAANP\b/i, "US"],
  [/\bNMC\b|\bCBT\b/i, "GB"],
  [/\bNCNZ\b/i, "NZ"],
  [/\bNMBA\b|\bAHPRA\b/i, "AU"],
  [/\bNMBI\b/i, "IE"],
];

const PLACEHOLDER = /^(?:tbd|todo|placeholder|n\/?a|none|coming soon|rationale here|add rationale|see rationale|explanation|to be added|to be determined|not available|-+|\.+)$/i;

function parseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  try { return JSON.parse(trimmed); } catch { return value; }
}
function text(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }
function substantive(value: unknown, min = 12): boolean { const v = text(value); return v.length >= min && !PLACEHOLDER.test(v); }
function stableSlug(value: string): string { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80); }
function stableOptionId(questionId: string, index: number, optionText: string): string {
  const suffix = createHash("sha1").update(optionText.trim().toLowerCase()).digest("hex").slice(0, 8);
  return `${stableSlug(questionId) || "q"}:opt:${String(index + 1).padStart(2, "0")}:${suffix}`;
}
function qident(name: string): string { return `"${name.replace(/"/g, '""')}"`; }

async function columnsFor(table: string): Promise<Set<string>> {
  const result = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`,
    [table],
  );
  return new Set(result.rows.map((row: any) => row.column_name));
}

function first(columns: Set<string>, names: string[]): string | undefined {
  return names.find(name => columns.has(name));
}

async function discoverTables(): Promise<TableConfig[]> {
  const tables = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE'
      AND (table_name='exam_questions' OR table_name LIKE '%question%')
    ORDER BY table_name
  `);
  const configs: TableConfig[] = [];
  for (const { table_name: table } of tables.rows) {
    const c = await columnsFor(table);
    const id = first(c, ["id", "question_id", "blueprint_id"]);
    const stem = first(c, ["stem", "question", "question_text"]);
    const options = first(c, ["options", "answer_options", "choices"]);
    const correct = first(c, ["correct_answer", "correct_index", "answer_key", "correct"]);
    if (!id || !stem || !options || !correct) continue;
    configs.push({
      table, id, stem, options, correct,
      rationale: first(c, ["rationale", "rationale_long", "rationale_correct"]),
      distractors: first(c, ["distractor_rationales", "incorrect_answer_rationale"]),
      correctExplanation: first(c, ["correct_answer_explanation", "learning_objective"]),
      hint: first(c, ["hint", "exam_strategy"]),
      why: first(c, ["why_this_matters", "key_takeaway", "clinical_reasoning"]),
      pearl: first(c, ["clinical_pearl", "exam_pearl", "clinical_takeaway"]),
      mnemonic: first(c, ["mnemonic", "memory_hook"]),
      country: first(c, ["country_code", "country"]),
      region: first(c, ["region_scope", "region_code", "country_track"]),
      language: first(c, ["language_code", "locale"]),
      licensingBody: first(c, ["licensing_body", "regulatory_body"]),
      exam: first(c, ["exam", "exam_tag", "exam_type"]),
      questionType: first(c, ["question_type", "question_format"]),
      tier: first(c, ["tier", "serving_tier"]),
      bodySystem: first(c, ["body_system", "category", "blueprint_category"]),
      topic: first(c, ["topic", "subtopic"]),
      tags: first(c, ["tags"]),
      difficulty: first(c, ["difficulty"]),
      unitSupport: first(c, ["unit_system_support", "lab_unit_variant"]),
      unitVariants: first(c, ["unit_variants"]),
      status: first(c, ["status", "publication_status"]),
    });
  }
  return configs;
}

function normalizeOptions(questionId: string, raw: unknown): { options: CanonicalOption[]; changed: boolean; legacy: any[] } {
  const parsed = parseJson(raw);
  if (!Array.isArray(parsed)) return { options: [], changed: false, legacy: [] };
  let changed = false;
  const options = parsed.map((option, index) => {
    const label = String.fromCharCode(65 + index);
    if (typeof option === "string" || typeof option === "number") {
      changed = true;
      const optionText = String(option).trim();
      return { id: stableOptionId(questionId, index, optionText), text: optionText, label };
    }
    const obj = option && typeof option === "object" ? option as JsonRecord : {};
    const optionText = text(obj.text) || text(obj.content) || text(obj.value);
    const existingId = text(obj.id) || text(obj.optionId) || text(obj.option_id);
    const id = existingId || stableOptionId(questionId, index, optionText);
    if (!existingId || obj.text !== optionText || obj.id !== id) changed = true;
    return { ...obj, id, text: optionText, label: text(obj.label) || label } as CanonicalOption;
  });
  return { options, changed, legacy: parsed };
}

function flattenAnswer(raw: unknown): unknown[] {
  const parsed = parseJson(raw);
  if (Array.isArray(parsed)) return parsed.flatMap(flattenAnswer);
  if (parsed && typeof parsed === "object") {
    const obj = parsed as JsonRecord;
    for (const key of ["ids", "answers", "selected", "correct", "answer", "id", "value", "index"]) if (key in obj) return flattenAnswer(obj[key]);
  }
  return [parsed];
}

function resolveLegacyCorrect(raw: unknown, options: CanonicalOption[]): string[] {
  const resolved: string[] = [];
  for (const value of flattenAnswer(raw)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "number" && Number.isInteger(value)) {
      const option = options[value] || (value > 0 ? options[value - 1] : undefined);
      if (option?.id) resolved.push(option.id);
      continue;
    }
    const needle = String(value).trim();
    if (!needle) continue;
    const byId = options.find(option => option.id.toLowerCase() === needle.toLowerCase());
    const byLabel = options.find(option => option.label?.toLowerCase() === needle.toLowerCase());
    const byText = options.find(option => option.text.toLowerCase() === needle.toLowerCase());
    const option = byId || byLabel || byText;
    if (option?.id) resolved.push(option.id);
  }
  return [...new Set(resolved)];
}

function normalizeRationaleKeys(raw: unknown, options: CanonicalOption[], correctIds: Set<string>): Record<string, string> {
  const parsed = parseJson(raw);
  const source = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as JsonRecord : {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(source)) {
    const rationale = text(value);
    if (!rationale) continue;
    const normalizedKey = key.toLowerCase();
    const numeric = Number(key);
    const option = options.find(o => o.id.toLowerCase() === normalizedKey)
      || options.find(o => o.label?.toLowerCase() === normalizedKey)
      || (Number.isInteger(numeric) ? options[numeric] || (numeric > 0 ? options[numeric - 1] : undefined) : undefined)
      || options.find(o => o.text.toLowerCase() === normalizedKey);
    if (option && !correctIds.has(option.id)) out[option.id] = rationale;
  }
  return out;
}

function inferCountry(row: Row, cfg: TableConfig): string {
  const existing = cfg.country ? text(row[cfg.country]).toUpperCase() : "";
  if (/^[A-Z]{2,3}$/.test(existing)) return existing;
  const region = cfg.region ? text(row[cfg.region]).toUpperCase() : "";
  if (["CA", "CAN"].includes(region)) return "CA";
  if (["US", "USA"].includes(region)) return "US";
  const exam = cfg.exam ? text(row[cfg.exam]) : "";
  for (const [pattern, country] of EXAM_COUNTRY) if (pattern.test(exam)) return country;
  return "";
}

function objectForAudit(row: Row, cfg: TableConfig, options: CanonicalOption[], correctIds: string[], distractors: Record<string, string>) {
  return {
    id: row[cfg.id],
    tier: cfg.tier ? row[cfg.tier] : undefined,
    exam: cfg.exam ? row[cfg.exam] : undefined,
    question_type: cfg.questionType ? row[cfg.questionType] : undefined,
    stem: row[cfg.stem],
    options,
    correct_answer: correctIds,
    rationale: cfg.rationale ? row[cfg.rationale] : undefined,
    distractor_rationales: distractors,
    correct_answer_explanation: cfg.correctExplanation ? row[cfg.correctExplanation] : undefined,
    hint: cfg.hint ? row[cfg.hint] : undefined,
    why_this_matters: cfg.why ? row[cfg.why] : undefined,
    clinical_pearl: cfg.pearl ? row[cfg.pearl] : undefined,
    mnemonic: cfg.mnemonic ? row[cfg.mnemonic] : undefined,
    country_code: inferCountry(row, cfg),
    region_scope: cfg.region ? row[cfg.region] : undefined,
    language_code: cfg.language ? row[cfg.language] : undefined,
    licensing_body: cfg.licensingBody ? row[cfg.licensingBody] : undefined,
    unit_system_support: cfg.unitSupport ? row[cfg.unitSupport] : undefined,
    unit_variants: cfg.unitVariants ? row[cfg.unitVariants] : undefined,
    tags: cfg.tags ? row[cfg.tags] : undefined,
    body_system: cfg.bodySystem ? row[cfg.bodySystem] : undefined,
    topic: cfg.topic ? row[cfg.topic] : undefined,
    difficulty: cfg.difficulty ? row[cfg.difficulty] : undefined,
  };
}

function buildContentRepairPrompt(row: Row, cfg: TableConfig, auditObject: any, issues: ReturnType<typeof auditQuestionPublicationContract>): string {
  const requested = issues.map(issue => issue.code);
  return `You are a senior nursing/allied-health exam editor. Repair ONLY the requested educational metadata for one existing question. Never change the stem, option texts, stable option ids, correct answer ids, exam, tier, country, or difficulty.\n\nQUESTION:\n${JSON.stringify(auditObject, null, 2)}\n\nREPAIR CODES:\n${requested.join(", ")}\n\nReturn ONLY strict JSON using any of these fields that are requested or currently missing:\n{\n  "rationale": "clinically specific rationale",\n  "correct_answer_explanation": "why the keyed answer is correct",\n  "distractor_rationales": {"<stable option id>": "why that incorrect option is wrong"},\n  "hint": "brief tutor-mode hint that does not give away the answer",\n  "why_this_matters": "clinical/professional significance",\n  "clinical_pearl": "high-yield takeaway",\n  "mnemonic": "only when a real useful mnemonic or memory hook exists; otherwise empty string",\n  "unit_system_support": {"supported":["SI","CONV"],"default":"SI"},\n  "unit_variants": [{"token":"value_1","quantity":"glucose","si":{"value":5.6,"unit":"mmol/L","display":"5.6 mmol/L"},"conv":{"value":101,"unit":"mg/dL","display":"101 mg/dL"}}]\n}\n\nRules:\n- Every incorrect option that lacks a rationale must receive one keyed by its stable option id.\n- Unit variants must be mathematically/clinically equivalent and must not alter which option is correct.\n- Do not invent a mnemonic if none is genuinely useful.\n- Do not include citations or markdown.\n- Do not change the clinical claim or answer key.`;
}

function parseModelJson(raw: string): JsonRecord {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("model did not return JSON");
  return JSON.parse(match[0]);
}

async function repairRow(openai: OpenAI | null, row: Row, cfg: TableConfig, apply: boolean): Promise<{ changed: boolean; unresolved: string[] }> {
  const questionId = String(row[cfg.id]);
  const normalized = normalizeOptions(questionId, row[cfg.options]);
  const correctIds = resolveLegacyCorrect(row[cfg.correct], normalized.options);
  if (normalized.options.length < 2 || correctIds.length === 0) return { changed: false, unresolved: ["unresolved_answer_contract"] };
  const distractors = normalizeRationaleKeys(cfg.distractors ? row[cfg.distractors] : undefined, normalized.options, new Set(correctIds));
  const auditObject = objectForAudit(row, cfg, normalized.options, correctIds, distractors);
  let issues = auditQuestionPublicationContract(auditObject);
  const updates: Record<string, unknown> = {};

  if (normalized.changed) updates[cfg.options] = normalized.options;
  // Canonical answer storage is always stable option ids. Keep scalar for single-answer only when legacy column is text-like is handled by DB cast below.
  updates[cfg.correct] = correctIds.length === 1 ? correctIds[0] : correctIds;
  if (cfg.distractors) updates[cfg.distractors] = distractors;

  const country = inferCountry(row, cfg);
  if (country && cfg.country && text(row[cfg.country]).toUpperCase() !== country) updates[cfg.country] = country;
  if (cfg.language && !substantive(row[cfg.language], 2)) updates[cfg.language] = "en";

  const contentIssueCodes = new Set([
    "missing_rationale", "missing_correct_answer_explanation", "missing_distractor_rationale",
    "missing_hint", "missing_why_this_matters", "missing_clinical_pearl", "weak_mnemonic",
    "missing_si_conv_support", "missing_unit_variants",
  ]);
  const needsAI = issues.some(issue => contentIssueCodes.has(issue.code));

  if (needsAI && openai) {
    const response = await openai.chat.completions.create({
      model: process.env.QUESTION_REPAIR_MODEL || "gpt-4o-mini",
      temperature: 0.1,
      max_tokens: 1800,
      messages: [{ role: "user", content: buildContentRepairPrompt(row, cfg, auditObject, issues) }],
    });
    const payload = parseModelJson(response.choices[0]?.message?.content || "");
    if (cfg.rationale && !substantive(row[cfg.rationale], 40) && substantive(payload.rationale, 40)) updates[cfg.rationale] = text(payload.rationale);
    if (cfg.correctExplanation && !substantive(row[cfg.correctExplanation], 24) && substantive(payload.correct_answer_explanation, 24)) updates[cfg.correctExplanation] = text(payload.correct_answer_explanation);
    if (cfg.hint && !substantive(row[cfg.hint], 12) && substantive(payload.hint, 12)) updates[cfg.hint] = text(payload.hint);
    if (cfg.why && !substantive(row[cfg.why], 20) && substantive(payload.why_this_matters, 20)) updates[cfg.why] = text(payload.why_this_matters);
    if (cfg.pearl && !substantive(row[cfg.pearl], 12) && substantive(payload.clinical_pearl, 12)) updates[cfg.pearl] = text(payload.clinical_pearl);
    if (cfg.mnemonic && !substantive(row[cfg.mnemonic], 6) && substantive(payload.mnemonic, 6)) updates[cfg.mnemonic] = text(payload.mnemonic);
    if (cfg.unitSupport && payload.unit_system_support && typeof payload.unit_system_support === "object") updates[cfg.unitSupport] = payload.unit_system_support;
    if (cfg.unitVariants && Array.isArray(payload.unit_variants)) updates[cfg.unitVariants] = payload.unit_variants;

    if (cfg.distractors) {
      const generated = parseJson(payload.distractor_rationales);
      const source = generated && typeof generated === "object" && !Array.isArray(generated) ? generated as JsonRecord : {};
      const merged = { ...distractors };
      for (const option of normalized.options) {
        if (correctIds.includes(option.id)) continue;
        const candidate = text(source[option.id]);
        if (!substantive(merged[option.id], 24) && substantive(candidate, 24)) merged[option.id] = candidate;
      }
      updates[cfg.distractors] = merged;
    }
  }

  const projected = { ...row, ...updates };
  const projectedOptions = normalizeOptions(questionId, projected[cfg.options]).options;
  const projectedCorrect = resolveLegacyCorrect(projected[cfg.correct], projectedOptions);
  const projectedDistractors = normalizeRationaleKeys(cfg.distractors ? projected[cfg.distractors] : undefined, projectedOptions, new Set(projectedCorrect));
  issues = auditQuestionPublicationContract(objectForAudit(projected, cfg, projectedOptions, projectedCorrect, projectedDistractors));

  if (apply && Object.keys(updates).length > 0) {
    const columns = await columnsFor(cfg.table);
    const info = await pool.query(`SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`, [cfg.table]);
    const types = new Map(info.rows.map((r: any) => [r.column_name, r]));
    const sets: string[] = [];
    const params: unknown[] = [];
    let p = 1;
    for (const [column, value] of Object.entries(updates)) {
      if (!columns.has(column)) continue;
      const type = types.get(column);
      let stored = value;
      if (type?.data_type === "jsonb" || type?.data_type === "json") stored = JSON.stringify(value);
      if (type?.data_type === "text" && Array.isArray(value)) stored = value.length === 1 ? String(value[0]) : JSON.stringify(value);
      sets.push(`${qident(column)} = $${p++}${type?.data_type === "jsonb" ? "::jsonb" : ""}`);
      params.push(stored);
    }
    if (sets.length) {
      params.push(row[cfg.id]);
      await pool.query(`UPDATE ${qident(cfg.table)} SET ${sets.join(", ")} WHERE ${qident(cfg.id)} = $${p}`, params);
    }
  }

  return { changed: Object.keys(updates).length > 0, unresolved: issues.map(issue => issue.code) };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const limitArg = process.argv.find(arg => arg.startsWith("--limit="));
  const limit = limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 1) : 500;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const openai = apply && apiKey ? new OpenAI({ apiKey, ...(process.env.AI_INTEGRATIONS_OPENAI_BASE_URL ? { baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL } : {}) }) : null;

  const configs = await discoverTables();
  const report: any = { mode: apply ? "apply" : "audit", tables: [], totals: { scanned: 0, changed: 0, unresolved: 0, byIssue: {} as Record<string, number> } };

  for (const cfg of configs) {
    const select = await pool.query(`SELECT * FROM ${qident(cfg.table)} ORDER BY ${qident(cfg.id)} LIMIT $1`, [limit]);
    const tableReport: any = { table: cfg.table, scanned: select.rows.length, changed: 0, unresolved: 0, byIssue: {} as Record<string, number>, missingContractColumns: [] as string[] };
    for (const required of [["rationale", cfg.rationale], ["distractor_rationales", cfg.distractors], ["correct_answer_explanation", cfg.correctExplanation], ["hint", cfg.hint], ["why_this_matters", cfg.why], ["clinical_pearl", cfg.pearl], ["mnemonic_or_memory_hook", cfg.mnemonic], ["country_code", cfg.country], ["unit_system_support", cfg.unitSupport], ["unit_variants", cfg.unitVariants]]) {
      if (!required[1]) tableReport.missingContractColumns.push(required[0]);
    }
    for (const row of select.rows) {
      try {
        const result = await repairRow(openai, row, cfg, apply);
        if (result.changed) tableReport.changed++;
        if (result.unresolved.length) tableReport.unresolved++;
        for (const issue of result.unresolved) {
          tableReport.byIssue[issue] = (tableReport.byIssue[issue] || 0) + 1;
          report.totals.byIssue[issue] = (report.totals.byIssue[issue] || 0) + 1;
        }
      } catch (error) {
        tableReport.unresolved++;
        tableReport.byIssue.repair_exception = (tableReport.byIssue.repair_exception || 0) + 1;
        report.totals.byIssue.repair_exception = (report.totals.byIssue.repair_exception || 0) + 1;
        console.error(`[${cfg.table}] ${row[cfg.id]}:`, error instanceof Error ? error.message : error);
      }
    }
    report.tables.push(tableReport);
    report.totals.scanned += tableReport.scanned;
    report.totals.changed += tableReport.changed;
    report.totals.unresolved += tableReport.unresolved;
  }

  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { try { await pool.end(); } catch {} });
