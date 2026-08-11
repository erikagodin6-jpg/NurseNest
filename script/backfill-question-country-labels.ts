import { pool } from "../server/storage";
import { countryLabelsForQuestionScope } from "../shared/question-jurisdictions";

const APPLY = process.argv.includes("--apply");
const tableArg = process.argv.find(arg => arg.startsWith("--table="));
const TABLE_ONLY = tableArg ? tableArg.split("=")[1] : null;

function qi(value: string) { return `"${value.replace(/"/g, '""')}"`; }

async function tables(): Promise<string[]> {
  const result = await pool.query(`
    SELECT DISTINCT table_name
    FROM information_schema.columns
    WHERE table_schema='public' AND column_name='contract_country_labels'
    ORDER BY table_name
  `);
  return result.rows.map((row: any) => row.table_name).filter((name: string) => !TABLE_ONLY || name === TABLE_ONLY);
}

async function columns(table: string): Promise<Set<string>> {
  const result = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`, [table]);
  return new Set(result.rows.map((row: any) => row.column_name));
}

function first(c: Set<string>, names: string[]) { return names.find(name => c.has(name)); }

async function main() {
  const report: any = { mode: APPLY ? "apply" : "audit", tables: {}, totals: { rows: 0, resolved: 0, ambiguous: 0, updated: 0 } };
  for (const table of await tables()) {
    const c = await columns(table);
    const id = first(c, ["id", "question_id", "blueprint_id"]);
    const exam = first(c, ["exam", "exam_tag", "exam_type"]);
    const country = first(c, ["country_code", "country"]);
    const region = first(c, ["region_scope", "region_code", "country_track"]);
    const existingLabels = first(c, ["country_labels"]);
    if (!id) continue;

    const select = [
      `${qi(id)} AS row_id`,
      `contract_country_code`,
      `contract_region_scope`,
      `contract_country_labels`,
      exam ? `${qi(exam)} AS source_exam` : `NULL::text AS source_exam`,
      country ? `${qi(country)} AS source_country` : `NULL::text AS source_country`,
      region ? `${qi(region)} AS source_region` : `NULL::text AS source_region`,
      existingLabels ? `${qi(existingLabels)} AS source_labels` : `NULL::jsonb AS source_labels`,
    ].join(", ");
    const result = await pool.query(`SELECT ${select} FROM ${qi(table)} ORDER BY ${qi(id)}`);
    const stats = { rows: 0, resolved: 0, ambiguous: 0, updated: 0 };

    for (const row of result.rows) {
      stats.rows++; report.totals.rows++;
      const regionScope = String(row.contract_region_scope || row.source_region || "").toUpperCase();
      const countryCode = String(row.contract_country_code || row.source_country || "").toUpperCase();
      const current = Array.isArray(row.contract_country_labels) ? row.contract_country_labels : [];
      const sourceLabels = Array.isArray(row.source_labels) ? row.source_labels : [];
      const labels = countryLabelsForQuestionScope({
        countryCode,
        regionScope,
        exam: row.source_exam,
        existingLabels: current.length ? current : sourceLabels,
      });

      if (labels.length) {
        stats.resolved++; report.totals.resolved++;
        if (APPLY && JSON.stringify(current) !== JSON.stringify(labels)) {
          await pool.query(`UPDATE ${qi(table)} SET contract_country_labels=$1::jsonb WHERE ${qi(id)}=$2`, [JSON.stringify(labels), row.row_id]);
          stats.updated++; report.totals.updated++;
        }
      } else if (regionScope === "BOTH") {
        stats.ambiguous++; report.totals.ambiguous++;
        if (APPLY && c.has("contract_status")) {
          await pool.query(
            `UPDATE ${qi(table)} SET contract_status='blocked', contract_issues=COALESCE(contract_issues,'[]'::jsonb) || $1::jsonb WHERE ${qi(id)}=$2`,
            [JSON.stringify([{ code: "missing_country_labels", field: "contract_country_labels", severity: "blocking", detail: "BOTH scope is ambiguous; supported countries must be named explicitly." }]), row.row_id],
          );
        }
      }
    }
    report.tables[table] = stats;
  }
  console.log(JSON.stringify(report, null, 2));
  if (report.totals.ambiguous > 0) process.exitCode = 2;
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { try { await pool.end(); } catch {} });
