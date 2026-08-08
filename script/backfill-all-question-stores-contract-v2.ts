import OpenAI from "openai";
import { createHash } from "node:crypto";
import { pool } from "../server/storage";
import { auditQuestionPublicationContract } from "../server/question-publication-contract";

type Row = Record<string, any>;
type Columns = Set<string>;
type Store = { table: string; columns: Columns; id: string; stem: string; answer: string };

type CanonicalOption = { id: string; text: string; label: string };

const APPLY = process.argv.includes("--apply");
const AI = process.argv.includes("--ai");
const limitArg = process.argv.find(v => v.startsWith("--limit="));
const LIMIT = limitArg ? Math.max(1, Number(limitArg.split("=")[1]) || 1) : Number.POSITIVE_INFINITY;
const tableArg = process.argv.find(v => v.startsWith("--table="));
const TABLE_ONLY = tableArg ? tableArg.split("=")[1] : null;

const COUNTRY_BY_EXAM: Array<[RegExp, string]> = [
  [/\bREx[- ]?PN\b/i, "CA"], [/\bCPNRE\b/i, "CA"], [/\bCNPLE\b/i, "CA"],
  [/\bNCLEX(?:-RN|-PN)?\b/i, "US"], [/\bANCC\b/i, "US"], [/\bAANP\b/i, "US"],
  [/\bNMC\b|\bCBT\b/i, "GB"], [/\bNMBA\b|\bAHPRA\b/i, "AU"], [/\bNCNZ\b/i, "NZ"], [/\bNMBI\b/i, "IE"],
];

function qid(name: string) { return `"${name.replace(/"/g, '""')}"`; }
function text(v: unknown) { return typeof v === "string" ? v.trim() : ""; }
function parse(v: unknown): any {
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); } catch { return v; }
}
function first(c: Columns, names: string[]) { return names.find(n => c.has(n)); }
function slug(v: string) { return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90); }
function optionId(questionId: string, index: number, optionText: string) {
  const digest = createHash("sha1").update(optionText.trim().toLowerCase()).digest("hex").slice(0, 10);
  return `${slug(questionId) || "q"}:opt:${String(index + 1).padStart(2, "0")}:${digest}`;
}

async function discover(): Promise<Store[]> {
  const tables = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' AND (table_name='exam_questions' OR table_name LIKE '%question%') ORDER BY table_name`);
  const stores: Store[] = [];
  for (const t of tables.rows) {
    if (TABLE_ONLY && t.table_name !== TABLE_ONLY) continue;
    const cr = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`, [t.table_name]);
    const c = new Set<string>(cr.rows.map((r:any) => r.column_name));
    if (!c.has("contract_question_id") || !c.has("contract_options") || !c.has("contract_correct_answer_ids")) continue;
    const id = first(c, ["id","question_id","blueprint_id"]);
    const stem = first(c, ["stem","question","question_text"]);
    const answer = first(c, ["correct_answer","correct_index","answer_key","correct"]);
    const hasOptions = !!first(c, ["options","answer_options","choices"]) || c.has("option_a");
    if (id && stem && answer && hasOptions) stores.push({ table: t.table_name, columns: c, id, stem, answer });
  }
  return stores;
}

function legacyOptions(row: Row, s: Store, questionId: string): CanonicalOption[] {
  const c = s.columns;
  const contract = parse(row.contract_options);
  if (Array.isArray(contract) && contract.length > 0 && contract.every((o:any) => o && typeof o === "object" && text(o.id) && text(o.text))) {
    return contract.map((o:any, i:number) => ({ id: text(o.id), text: text(o.text), label: text(o.label) || String.fromCharCode(65+i) }));
  }
  const optionsCol = first(c, ["options","answer_options","choices"]);
  let raw: any[] = [];
  if (optionsCol) {
    const p = parse(row[optionsCol]);
    if (Array.isArray(p)) raw = p;
  } else {
    raw = ["option_a","option_b","option_c","option_d","option_e","option_f"].filter(k => c.has(k) && text(row[k])).map(k => row[k]);
  }
  return raw.map((o:any, i:number) => {
    const label = String.fromCharCode(65+i);
    if (o && typeof o === "object") {
      const ot = text(o.text) || text(o.content) || text(o.value);
      const id = text(o.id) || text(o.optionId) || text(o.option_id) || optionId(questionId, i, ot);
      return { id, text: ot, label: text(o.label) || label };
    }
    const ot = String(o ?? "").trim();
    return { id: optionId(questionId, i, ot), text: ot, label };
  }).filter(o => o.text);
}

function flattenAnswer(v: unknown): unknown[] {
  const p = parse(v);
  if (Array.isArray(p)) return p.flatMap(flattenAnswer);
  if (p && typeof p === "object") {
    for (const k of ["ids","answers","selected","correct","answer","id","value","index"]) if (k in p) return flattenAnswer(p[k]);
  }
  return [p];
}

function answerIds(raw: unknown, options: CanonicalOption[]): string[] {
  const ids: string[] = [];
  for (const v of flattenAnswer(raw)) {
    if (v === null || v === undefined) continue;
    if (typeof v === "number" && Number.isInteger(v)) {
      const o = options[v] || (v > 0 ? options[v-1] : undefined); if (o) ids.push(o.id); continue;
    }
    const n = String(v).trim(); if (!n) continue;
    const upper = n.toUpperCase();
    const o = options.find(x => x.id.toLowerCase() === n.toLowerCase())
      || options.find(x => x.label.toUpperCase() === upper)
      || options.find(x => x.text.toLowerCase() === n.toLowerCase());
    if (o) ids.push(o.id);
  }
  return [...new Set(ids)];
}

function rationaleMap(raw: unknown, options: CanonicalOption[], correct: Set<string>): Record<string,string> {
  const p = parse(raw);
  const src = p && typeof p === "object" && !Array.isArray(p) ? p as Record<string,unknown> : {};
  const out: Record<string,string> = {};
  for (const [k,v] of Object.entries(src)) {
    const rat = text(v); if (!rat) continue;
    const num = Number(k);
    const o = options.find(x => x.id.toLowerCase() === k.toLowerCase())
      || options.find(x => x.label.toLowerCase() === k.toLowerCase())
      || (Number.isInteger(num) ? options[num] || (num > 0 ? options[num-1] : undefined) : undefined)
      || options.find(x => x.text.toLowerCase() === k.toLowerCase());
    if (o && !correct.has(o.id)) out[o.id] = rat;
  }
  return out;
}

function inferCountry(row: Row, s: Store): string {
  for (const k of ["contract_country_code","country_code","country"]) if (s.columns.has(k) && /^[A-Za-z]{2,3}$/.test(text(row[k]))) return text(row[k]).toUpperCase();
  for (const k of ["region_scope","region_code","country_track"]) {
    if (!s.columns.has(k)) continue;
    const r = text(row[k]).toUpperCase(); if (["CA","CAN"].includes(r)) return "CA"; if (["US","USA"].includes(r)) return "US";
  }
  const examCol = first(s.columns, ["exam","exam_tag","exam_type"]); const exam = examCol ? text(row[examCol]) : "";
  for (const [re,country] of COUNTRY_BY_EXAM) if (re.test(exam)) return country;
  return "";
}

function alias(row: Row, s: Store, names: string[]): any { const k = first(s.columns, names); return k ? row[k] : undefined; }
function tagsValue(row: Row, s: Store): any {
  const k = first(s.columns,["tags"]); if (!k) return [];
  const v = parse(row[k]); if (Array.isArray(v)) return v;
  if (typeof v === "string") return v.split(/[,|]/).map(x=>x.trim()).filter(Boolean);
  return [];
}

function auditObject(row: Row, s: Store, options: CanonicalOption[], correctIds: string[], distractors: Record<string,string>) {
  return {
    id: text(row.contract_question_id) || `${s.table}:${String(row[s.id])}`,
    tier: alias(row,s,["tier","serving_tier"]) || "allied",
    exam: alias(row,s,["exam","exam_tag","exam_type"]) || s.table,
    question_type: alias(row,s,["question_type","question_format"]) || "MCQ",
    stem: row[s.stem], options, correct_answer: correctIds,
    rationale: text(row.contract_rationale) || alias(row,s,["rationale","rationale_long","rationale_correct"]),
    distractor_rationales: distractors,
    correct_answer_explanation: text(row.contract_correct_answer_explanation) || alias(row,s,["correct_answer_explanation","learning_objective"]),
    hint: text(row.contract_hint) || alias(row,s,["hint","exam_strategy"]),
    why_this_matters: text(row.contract_why_this_matters) || alias(row,s,["why_this_matters","key_takeaway","clinical_reasoning"]),
    clinical_pearl: text(row.contract_clinical_pearl) || alias(row,s,["clinical_pearl","exam_pearl","clinical_takeaway"]),
    mnemonic: text(row.contract_mnemonic) || alias(row,s,["mnemonic","memory_hook"]),
    country_code: text(row.contract_country_code) || inferCountry(row,s),
    region_scope: text(row.contract_region_scope) || alias(row,s,["region_scope","region_code","country_track"]),
    language_code: text(row.contract_language_code) || alias(row,s,["language_code","locale"]) || "en",
    licensing_body: text(row.contract_licensing_body) || alias(row,s,["licensing_body","regulatory_body"]),
    unit_system_support: parse(row.contract_unit_system_support) || alias(row,s,["unit_system_support","lab_unit_variant"]),
    unit_variants: parse(row.contract_unit_variants),
    body_system: alias(row,s,["body_system","category","blueprint_category"]) || s.table,
    topic: alias(row,s,["topic","subtopic"]) || s.table,
    tags: tagsValue(row,s).length ? tagsValue(row,s) : [s.table],
    difficulty: Number(alias(row,s,["difficulty"]) || 2),
  };
}

function parseModel(raw: string): any {
  const cleaned = raw.trim().replace(/^```json\s*/i,"").replace(/```$/i,"").trim();
  const m = cleaned.match(/\{[\s\S]*\}/); if (!m) throw new Error("AI did not return JSON"); return JSON.parse(m[0]);
}

async function aiRepair(openai: OpenAI, q: any, issues: any[]) {
  const prompt = `Repair only missing educational metadata for this existing exam question. Never change stem, option text, stable option IDs, correct answer IDs, exam, tier, country, or difficulty. Return strict JSON only.\n\nQuestion: ${JSON.stringify(q)}\n\nIssues: ${issues.map(x=>x.code).join(", ")}\n\nAllowed output fields: rationale, correct_answer_explanation, distractor_rationales (keyed ONLY by stable option ID), hint, why_this_matters, clinical_pearl, mnemonic, unit_system_support, unit_variants. Mnemonic may be empty when none is genuinely useful. For unit variants, both SI and CONV displays must represent the same semantic quantity and must not change the answer key.`;
  const response = await openai.chat.completions.create({ model: process.env.QUESTION_REPAIR_MODEL || "gpt-4o-mini", temperature: 0.2, max_tokens: 1500, messages:[{role:"user",content:prompt}] });
  return parseModel(response.choices[0]?.message?.content || "");
}

async function updateRow(s: Store, row: Row, q: any, issues: any[]) {
  await pool.query(
    `UPDATE ${qid(s.table)} SET contract_question_id=$1, contract_options=$2::jsonb, contract_correct_answer_ids=$3::jsonb, contract_distractor_rationales=$4::jsonb, contract_rationale=$5, contract_correct_answer_explanation=$6, contract_hint=$7, contract_why_this_matters=$8, contract_clinical_pearl=$9, contract_mnemonic=$10, contract_country_code=$11, contract_region_scope=$12, contract_language_code=$13, contract_licensing_body=$14, contract_unit_system_support=$15::jsonb, contract_unit_variants=$16::jsonb, option_contract_version=2, publication_contract_version=2, contract_status=$17, contract_issues=$18::jsonb, contract_verified_at=NOW() WHERE ${qid(s.id)}=$19`,
    [q.id, JSON.stringify(q.options), JSON.stringify(q.correct_answer), JSON.stringify(q.distractor_rationales || {}), q.rationale || null, q.correct_answer_explanation || null, q.hint || null, q.why_this_matters || null, q.clinical_pearl || null, q.mnemonic || null, q.country_code || null, q.region_scope || null, q.language_code || "en", q.licensing_body || null, JSON.stringify(q.unit_system_support || {}), JSON.stringify(q.unit_variants || []), issues.some((x:any)=>x.severity==="blocking") ? "blocked" : issues.length ? "quality_only" : "verified", JSON.stringify(issues), row[s.id]],
  );
}

async function main() {
  const stores = await discover();
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const openai = AI && apiKey ? new OpenAI({ apiKey, ...(baseURL ? {baseURL}:{}) }) : null;
  const summary: any = { mode: APPLY ? (AI ? "apply+ai" : "apply") : "audit", stores: {}, totals: { rows:0, verified:0, blocked:0, qualityOnly:0, unresolvedAnswer:0, updated:0 } };
  let remaining = LIMIT;

  for (const s of stores) {
    if (remaining <= 0) break;
    const rowsResult = await pool.query(`SELECT * FROM ${qid(s.table)} ORDER BY ${qid(s.id)} LIMIT $1`, [Number.isFinite(remaining) ? remaining : 1000000]);
    const store = { rows:0, verified:0, blocked:0, qualityOnly:0, unresolvedAnswer:0, updated:0, issues:{} as Record<string,number> };
    for (const row of rowsResult.rows) {
      if (remaining-- <= 0) break;
      store.rows++; summary.totals.rows++;
      const canonicalId = text(row.contract_question_id) || `${s.table}:${String(row[s.id])}`;
      const options = legacyOptions(row,s,canonicalId);
      const correct = answerIds(parse(row.contract_correct_answer_ids)?.length ? row.contract_correct_answer_ids : row[s.answer], options);
      if (!correct.length) { store.unresolvedAnswer++; summary.totals.unresolvedAnswer++; continue; }
      const legacyDistractorCol = first(s.columns,["distractor_rationales","incorrect_answer_rationale"]);
      const distractors = rationaleMap(parse(row.contract_distractor_rationales) && Object.keys(parse(row.contract_distractor_rationales)).length ? row.contract_distractor_rationales : (legacyDistractorCol ? row[legacyDistractorCol] : {}), options, new Set(correct));
      let q = auditObject(row,s,options,correct,distractors);
      let issues = auditQuestionPublicationContract(q);

      if (openai && issues.some(i => ["missing_rationale","missing_distractor_rationale","missing_correct_answer_explanation","missing_hint","missing_why_this_matters","missing_clinical_pearl","missing_si_conv_support","missing_unit_variants"].includes(i.code))) {
        try {
          const p = await aiRepair(openai,q,issues);
          q = { ...q,
            rationale: q.rationale || p.rationale,
            correct_answer_explanation: q.correct_answer_explanation || p.correct_answer_explanation,
            distractor_rationales: { ...(q.distractor_rationales || {}), ...(p.distractor_rationales || {}) },
            hint: q.hint || p.hint,
            why_this_matters: q.why_this_matters || p.why_this_matters,
            clinical_pearl: q.clinical_pearl || p.clinical_pearl,
            mnemonic: q.mnemonic || p.mnemonic,
            unit_system_support: Object.keys(q.unit_system_support || {}).length ? q.unit_system_support : p.unit_system_support,
            unit_variants: (q.unit_variants || []).length ? q.unit_variants : p.unit_variants,
          };
          issues = auditQuestionPublicationContract(q);
        } catch (e:any) { issues.push({code:"ai_repair_failed",field:"contract",severity:"quality",detail:e.message}); }
      }

      for (const i of issues) store.issues[i.code] = (store.issues[i.code] || 0) + 1;
      if (issues.some(i => i.severity === "blocking")) { store.blocked++; summary.totals.blocked++; }
      else if (issues.length) { store.qualityOnly++; summary.totals.qualityOnly++; }
      else { store.verified++; summary.totals.verified++; }
      if (APPLY) { await updateRow(s,row,q,issues); store.updated++; summary.totals.updated++; }
    }
    summary.stores[s.table] = store;
    if (APPLY) {
      await pool.query(`INSERT INTO question_contract_store_registry(table_name,last_audited_at,total_rows,verified_rows,blocked_rows,quality_only_rows,last_issue_counts) VALUES($1,NOW(),$2,$3,$4,$5,$6::jsonb) ON CONFLICT(table_name) DO UPDATE SET last_audited_at=EXCLUDED.last_audited_at,total_rows=EXCLUDED.total_rows,verified_rows=EXCLUDED.verified_rows,blocked_rows=EXCLUDED.blocked_rows,quality_only_rows=EXCLUDED.quality_only_rows,last_issue_counts=EXCLUDED.last_issue_counts`, [s.table,store.rows,store.verified,store.blocked,store.qualityOnly,JSON.stringify(store.issues)]);
    }
  }
  console.log(JSON.stringify(summary,null,2));
  if (summary.totals.blocked > 0) process.exitCode = 2;
}

main().catch(e => { console.error(e); process.exitCode=1; }).finally(async()=>{ try{await pool.end();}catch{} });
