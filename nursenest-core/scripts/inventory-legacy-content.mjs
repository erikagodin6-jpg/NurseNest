#!/usr/bin/env node
/**
 * Read-only inventory of legacy NurseNest content files (no DB, no secrets).
 * Run from nursenest-core: node scripts/inventory-legacy-content.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function countGlob(dir, pred) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) continue;
    if (pred(name)) n++;
  }
  return n;
}

function walkFiles(dir, maxDepth, ext, depth = 0) {
  if (!existsSync(dir) || depth > maxDepth) return [];
  const out = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) out.push(...walkFiles(p, maxDepth, ext, depth + 1));
    else if (name.isFile() && name.name.endsWith(ext)) out.push(p);
  }
  return out;
}

const lessonsTs = countGlob(join(root, "client", "src", "data", "lessons"), (n) => n.endsWith(".ts"));
const careerTs = walkFiles(join(root, "client", "src", "data", "career-questions"), 3, ".ts").length;
const careerJson = walkFiles(join(root, "data", "career-questions"), 2, ".json").length;
const seedDataFiles = existsSync(join(root, "server", "seed-data"))
  ? readdirSync(join(root, "server", "seed-data")).length
  : 0;

let manifestTotals = null;
const manifestPath = join(root, "client", "src", "data", "career-questions", "question-manifest.json");
if (existsSync(manifestPath)) {
  try {
    const m = JSON.parse(readFileSync(manifestPath, "utf8"));
    manifestTotals = m.totals ?? null;
  } catch {
    manifestTotals = { error: "parse_failed" };
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  repoRoot: root,
  counts: {
    lessonTsFilesUnderClientDataLessons: lessonsTs,
    careerQuestionTsFilesUnderClient: careerTs,
    careerQuestionJsonFilesUnderData: careerJson,
    serverSeedDataFileCount: seedDataFiles,
    rootScriptsSeedTs: countGlob(join(root, "scripts"), (n) => n.startsWith("seed") && n.endsWith(".ts")),
    serverScriptsSeedTs: existsSync(join(root, "server", "scripts"))
      ? walkFiles(join(root, "server", "scripts"), 1, ".ts").filter((p) => p.includes("seed")).length
      : 0,
  },
  questionManifestTotals: manifestTotals,
  notes: [
    "Import pipeline (nursenest-core): npm run import:questions — JSON under data/career-questions + server/seed-data JSON arrays.",
    "npm run import:lessons — client/src/data/lessons/*.ts (esbuild), skips index.ts and types.ts.",
    "Career question .ts banks are not auto-imported; extend scripts or export to JSON.",
    "Legacy server/scripts/seed*.ts target the old stack; normalize before Prisma import.",
  ],
};

console.log(JSON.stringify(report, null, 2));
