#!/usr/bin/env node
/**
 * Writes JSON reports from production/staging DB (requires DATABASE_URL).
 *
 * Usage (from nursenest-core):
 *   DATABASE_URL="postgresql://..." node scripts/run-content-audit-reports.mjs
 *
 * Outputs (in nursenest-core/):
 *   integrity-report.json   — full content:integrity-audit payload
 *   inventory-report.json   — content-inventory payload
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tsx = join(root, "node_modules", ".bin", "tsx");

if (!process.env.DATABASE_URL?.trim()) {
  console.error(
    "DATABASE_URL is not set. Example:\n  DATABASE_URL=postgresql://... node scripts/run-content-audit-reports.mjs",
  );
  process.exit(1);
}

function runAudit(scriptName, outFile) {
  const outPath = join(root, outFile);
  const stdout = execFileSync(tsx, [join(root, "scripts", scriptName)], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env },
    maxBuffer: 64 * 1024 * 1024,
  });
  writeFileSync(outPath, stdout, "utf8");
  console.error(`Wrote ${outFile} (${stdout.length} bytes)`);
}

runAudit("content-integrity-audit.ts", "integrity-report.json");
runAudit("content-inventory.ts", "inventory-report.json");
console.error("Done.");
