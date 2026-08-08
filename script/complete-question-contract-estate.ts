import { spawnSync } from "node:child_process";
import { pool } from "../server/storage";

type Step = { name: string; args: string[]; optional?: boolean };

const APPLY = process.argv.includes("--apply");
const AI = process.argv.includes("--ai");
const DRY = process.argv.includes("--dry-run") || !APPLY;

function run(step: Step) {
  const proc = spawnSync(process.execPath, ["./node_modules/tsx/dist/cli.mjs", ...step.args], {
    stdio: "inherit",
    env: process.env,
  });
  if ((proc.status ?? 1) !== 0 && !step.optional) throw new Error(`${step.name} failed with exit code ${proc.status}`);
}

async function sidecarReady(): Promise<boolean> {
  const result = await pool.query(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='exam_questions' AND column_name='contract_question_id'
    ) AS ready,
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='exam_question_translations' AND column_name='contract_status'
    ) AS translation_ready
  `);
  return Boolean(result.rows[0]?.ready) && Boolean(result.rows[0]?.translation_ready);
}

async function registrySummary() {
  try {
    const result = await pool.query(`
      SELECT table_name, total_rows, verified_rows, blocked_rows, quality_only_rows, last_issue_counts
      FROM question_contract_store_registry
      ORDER BY blocked_rows DESC, table_name
    `);
    return result.rows;
  } catch {
    return [];
  }
}

async function duplicateSummary() {
  try {
    const result = await pool.query(`
      SELECT COUNT(*)::int AS duplicate_groups,
             COALESCE(SUM(jsonb_array_length(duplicate_ids)),0)::int AS duplicate_rows
      FROM question_duplicate_groups
    `);
    return result.rows[0] || { duplicate_groups: 0, duplicate_rows: 0 };
  } catch {
    return { duplicate_groups: 0, duplicate_rows: 0 };
  }
}

async function main() {
  if (!(await sidecarReady())) {
    throw new Error("Question/translation contract migrations are not fully applied. Apply the universal question-store, exam publication-gate, and exam_question_translation contract migrations first.");
  }

  const backfillArgs = ["script/backfill-all-question-stores-contract-v3.ts"];
  if (APPLY) backfillArgs.push("--apply");
  if (AI) backfillArgs.push("--ai");

  const canonicalRecheckArgs = ["script/recheck-question-contract-registry.ts"];
  if (APPLY) canonicalRecheckArgs.push("--apply");

  const translationRepairArgs = ["script/backfill-exam-question-translations-contract-v2.ts"];
  if (APPLY) translationRepairArgs.push("--apply");
  if (AI) translationRepairArgs.push("--ai");

  const translationRecheckArgs = ["script/recheck-exam-question-translation-contract.ts"];
  if (APPLY) translationRecheckArgs.push("--apply");

  const steps: Step[] = [
    { name: "contract-backfill", args: backfillArgs },
    { name: "country-label-backfill", args: ["script/backfill-question-country-labels.ts", ...(APPLY ? ["--apply"] : [])] },
    { name: "canonical-contract-recheck", args: canonicalRecheckArgs },
    { name: "duplicate-audit", args: ["script/audit-retire-question-duplicates.ts", ...(APPLY ? ["--apply"] : [])] },
    { name: "canonical-contract-recheck-after-duplicates", args: canonicalRecheckArgs },
    { name: "translation-contract-repair", args: translationRepairArgs },
    { name: "translation-contract-recheck", args: translationRecheckArgs },
    { name: "source-estate-audit", args: ["script/audit-active-question-source-estate.ts"] },
    { name: "authored-v2-source-coverage", args: ["script/audit-active-question-enrichment-coverage.ts"] },
  ];

  for (const step of steps) run(step);

  const registry = await registrySummary();
  const duplicates = await duplicateSummary();
  const blocked = registry.reduce((sum, row) => sum + Number(row.blocked_rows || 0), 0);
  const qualityOnly = registry.reduce((sum, row) => sum + Number(row.quality_only_rows || 0), 0);
  const total = registry.reduce((sum, row) => sum + Number(row.total_rows || 0), 0);
  const verified = registry.reduce((sum, row) => sum + Number(row.verified_rows || 0), 0);

  const completion = {
    mode: DRY ? "audit" : "apply",
    totalRows: total,
    verifiedRows: verified,
    blockedRows: blocked,
    qualityOnlyRows: qualityOnly,
    duplicateGroupsRemaining: Number(duplicates.duplicate_groups || 0),
    duplicateRowsRemaining: Number(duplicates.duplicate_rows || 0),
    stores: registry,
    complete: blocked === 0 && qualityOnly === 0 && Number(duplicates.duplicate_groups || 0) === 0 && total > 0 && verified === total,
  };

  console.log(JSON.stringify(completion, null, 2));
  if (!completion.complete) process.exitCode = 2;
}

main()
  .catch(error => {
    console.error("[question-contract-completion]", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try { await pool.end(); } catch {}
  });
