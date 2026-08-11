import { pool } from "../server/storage";
import { auditQuestionPublicationContract } from "../server/question-publication-contract";

const APPLY = process.argv.includes("--apply");
const tableArg = process.argv.find(arg => arg.startsWith("--table="));
const TABLE_ONLY = tableArg ? tableArg.split("=")[1] : null;

function qi(v: string) { return `"${v.replace(/"/g, '""')}"`; }
function text(v: unknown) { return typeof v === "string" ? v.trim() : ""; }
function parse(v: any) { if (typeof v !== "string") return v; try { return JSON.parse(v); } catch { return v; } }
function first(columns: Set<string>, names: string[]) { return names.find(name => columns.has(name)); }

async function columns(table: string): Promise<Set<string>> {
  const result = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`, [table]);
  return new Set(result.rows.map((row: any) => row.column_name));
}

async function stores() {
  const result = await pool.query(`
    SELECT DISTINCT table_name
    FROM information_schema.columns
    WHERE table_schema='public' AND column_name='contract_question_id'
    ORDER BY table_name
  `);
  const out: Array<{ table: string; columns: Set<string>; id: string; stem: string }> = [];
  for (const row of result.rows) {
    const table = row.table_name as string;
    if (TABLE_ONLY && table !== TABLE_ONLY) continue;
    const c = await columns(table);
    const id = first(c, ["id", "question_id", "blueprint_id"]);
    const stem = first(c, ["stem", "question", "question_text"]);
    if (id && stem) out.push({ table, columns: c, id, stem });
  }
  return out;
}

function alias(row: any, c: Set<string>, names: string[]) {
  const key = first(c, names); return key ? row[key] : undefined;
}
function tags(row: any, c: Set<string>) {
  const value = parse(alias(row, c, ["tags"]));
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") return value.split(/[,|]/).map(v => v.trim()).filter(Boolean);
  return [];
}

async function main() {
  const report: any = { mode: APPLY ? "apply" : "audit", stores: {}, totals: { rows: 0, verified: 0, qualityOnly: 0, blocked: 0 } };

  for (const store of await stores()) {
    const rows = await pool.query(`SELECT * FROM ${qi(store.table)} ORDER BY ${qi(store.id)}`);
    const stats: any = { rows: 0, verified: 0, qualityOnly: 0, blocked: 0, issues: {} };

    for (const row of rows.rows) {
      stats.rows++; report.totals.rows++;
      const q = {
        id: text(row.contract_question_id),
        tier: text(alias(row, store.columns, ["tier", "serving_tier"])),
        exam: text(alias(row, store.columns, ["exam", "exam_tag", "exam_type"])),
        question_type: text(alias(row, store.columns, ["question_type", "question_format", "type"])),
        stem: row[store.stem],
        options: parse(row.contract_options),
        correct_answer: parse(row.contract_correct_answer_ids),
        interactionPayload: parse(row.contract_interaction_payload),
        rationale: text(row.contract_rationale) || text(alias(row, store.columns, ["rationale", "rationale_long", "rationale_correct"])),
        distractor_rationales: parse(row.contract_distractor_rationales),
        correct_answer_explanation: text(row.contract_correct_answer_explanation) || text(alias(row, store.columns, ["correct_answer_explanation", "learning_objective"])),
        hint: text(row.contract_hint) || text(alias(row, store.columns, ["hint", "exam_strategy"])),
        why_this_matters: text(row.contract_why_this_matters) || text(alias(row, store.columns, ["why_this_matters", "key_takeaway", "clinical_reasoning"])),
        clinical_pearl: text(row.contract_clinical_pearl) || text(alias(row, store.columns, ["clinical_pearl", "exam_pearl", "clinical_takeaway"])),
        mnemonic: text(row.contract_mnemonic) || text(alias(row, store.columns, ["mnemonic", "memory_hook"])),
        country_code: text(row.contract_country_code) || text(alias(row, store.columns, ["country_code", "country"])),
        country_labels: parse(row.contract_country_labels),
        region_scope: text(row.contract_region_scope) || text(alias(row, store.columns, ["region_scope", "region_code", "country_track"])),
        language_code: text(row.contract_language_code) || text(alias(row, store.columns, ["language_code", "locale"])),
        licensing_body: text(row.contract_licensing_body) || text(alias(row, store.columns, ["licensing_body", "regulatory_body"])),
        unit_system_support: parse(row.contract_unit_system_support),
        unit_variants: parse(row.contract_unit_variants),
        body_system: text(alias(row, store.columns, ["body_system", "category", "blueprint_category"])),
        topic: text(alias(row, store.columns, ["topic", "subtopic"])),
        tags: tags(row, store.columns),
        difficulty: Number(alias(row, store.columns, ["difficulty"])),
      };

      const issues = auditQuestionPublicationContract(q);
      const blocking = issues.some(issue => issue.severity === "blocking");
      const status = blocking ? "blocked" : issues.length ? "quality_only" : "verified";
      stats[status === "quality_only" ? "qualityOnly" : status]++;
      report.totals[status === "quality_only" ? "qualityOnly" : status]++;
      for (const issue of issues) stats.issues[issue.code] = (stats.issues[issue.code] || 0) + 1;

      if (APPLY) {
        await pool.query(
          `UPDATE ${qi(store.table)} SET contract_status=$1, contract_issues=$2::jsonb, contract_verified_at=NOW(), publication_contract_version=2 WHERE ${qi(store.id)}=$3`,
          [status, JSON.stringify(issues), row[store.id]],
        );
      }
    }

    report.stores[store.table] = stats;
    if (APPLY) {
      await pool.query(
        `INSERT INTO question_contract_store_registry(table_name,last_audited_at,total_rows,verified_rows,blocked_rows,quality_only_rows,schema_version,last_issue_counts)
         VALUES($1,NOW(),$2,$3,$4,$5,2,$6::jsonb)
         ON CONFLICT(table_name) DO UPDATE SET last_audited_at=NOW(),total_rows=EXCLUDED.total_rows,verified_rows=EXCLUDED.verified_rows,blocked_rows=EXCLUDED.blocked_rows,quality_only_rows=EXCLUDED.quality_only_rows,schema_version=2,last_issue_counts=EXCLUDED.last_issue_counts`,
        [store.table, stats.rows, stats.verified, stats.blocked, stats.qualityOnly, JSON.stringify(stats.issues)],
      );
    }
  }

  console.log(JSON.stringify(report, null, 2));
  if (report.totals.blocked || report.totals.qualityOnly) process.exitCode = 2;
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { try { await pool.end(); } catch {} });
