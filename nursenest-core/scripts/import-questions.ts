/**
 * Import legacy question JSON into Prisma (idempotent via stemHash duplicate skip).
 *
 * Usage (from nursenest-core):
 *   DATABASE_URL=... npx tsx scripts/import-questions.ts [--dry-run] [--batch=100]
 *
 * Sources:
 *   - ../data/career-questions/*.json
 *   - ../server/seed-data/*.json (exam-style rows)
 */
import { config } from "dotenv";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { ContentStatus, PrismaClient, QuestionType } from "@prisma/client";
import { stemHash } from "../src/lib/content/stem-hash";
import { validateQuestionPayload } from "../src/lib/content/question-schema";
import { ensureCategoryId } from "./migration/ensure-category";
import { legacyPaths } from "./migration/repo-paths";
import { buildManifestFileMap, resolveTierExam } from "./migration/manifest-tier-map";
import { numToDifficulty } from "./migration/difficulty-map";
import { normalizeLegacyQuestionRow, type NormalizedLegacyQuestion } from "./migration/normalize-legacy-question";

config({ path: ".env.local" });
config();

const prisma = new PrismaClient();

type Stats = {
  filesSeen: number;
  rowsSeen: number;
  inserted: number;
  skippedDuplicate: number;
  skippedInvalid: number;
  errors: { file: string; detail: string }[];
};

function parseArgs() {
  const dryRun = process.argv.includes("--dry-run");
  const batchArg = process.argv.find((a) => a.startsWith("--batch="));
  const batch = batchArg ? Math.max(1, Number(batchArg.split("=")[1]) || 100) : 100;
  return { dryRun, batch };
}

function listJsonDirs(): string[] {
  const p = legacyPaths();
  const dirs: string[] = [];
  if (existsSync(p.careerQuestionsJsonDir)) dirs.push(p.careerQuestionsJsonDir);
  if (existsSync(p.serverSeedData)) dirs.push(p.serverSeedData);
  return dirs;
}

function isQuestionArray(data: unknown): data is unknown[] {
  return Array.isArray(data) && data.length > 0;
}

function pickQuestionType(n: NormalizedLegacyQuestion): QuestionType {
  return n.answerKey.length > 1 ? QuestionType.SATA : QuestionType.MCQ;
}

async function insertOne(
  n: NormalizedLegacyQuestion,
  tierExam: { tier: import("@prisma/client").TierCode; examFamily: import("@prisma/client").ExamFamily },
  sourceTag: string,
  dryRun: boolean,
): Promise<"inserted" | "dup" | "invalid"> {
  const stem = n.stem.trim();
  if (stem.length < 5) return "invalid";
  const hash = stemHash(stem);
  const existing = await prisma.question.findFirst({ where: { stemHash: hash }, select: { id: true } });
  if (existing) return "dup";

  const qType = pickQuestionType(n);
  const optionsJson = n.options;
  const answerKeyJson = qType === QuestionType.MCQ ? n.answerKey.slice(0, 1) : n.answerKey;
  const err = validateQuestionPayload(qType, optionsJson, answerKeyJson);
  if (err) return "invalid";

  const categoryId = await ensureCategoryId(prisma, n.categoryLabel);
  const tier = n.tier ?? tierExam.tier;
  const examFamily = n.examFamily ?? tierExam.examFamily;

  if (dryRun) return "inserted";

  await prisma.question.create({
    data: {
      stem,
      rationale: n.rationale.trim(),
      options: optionsJson as object,
      answerKey: answerKeyJson as object,
      questionType: qType,
      country: n.country,
      tier,
      status: ContentStatus.PUBLISHED,
      examFamily,
      difficulty: numToDifficulty(n.difficultyNum),
      topicTag: n.topic?.slice(0, 120),
      systemTag: n.categoryLabel.slice(0, 120),
      tags: [],
      sourceNotes: sourceTag.slice(0, 2000),
      generationBatchId: "legacy-json-import",
      needsReview: false,
      stemHash: hash,
      categoryId,
    },
  });
  return "inserted";
}

async function main() {
  const { dryRun, batch } = parseArgs();
  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is required.");
    process.exit(1);
  }

  const paths = legacyPaths();
  const manifestPath = paths.questionManifest;
  const manifest = existsSync(manifestPath) ? buildManifestFileMap(manifestPath) : new Map();

  const stats: Stats = {
    filesSeen: 0,
    rowsSeen: 0,
    inserted: 0,
    skippedDuplicate: 0,
    skippedInvalid: 0,
    errors: [],
  };

  const jsonFiles: string[] = [];
  for (const dir of listJsonDirs()) {
    for (const name of readdirSync(dir)) {
      if (!name.endsWith(".json")) continue;
      if (name === "digital-products.json") continue;
      jsonFiles.push(join(dir, name));
    }
  }

  for (const filePath of jsonFiles) {
    stats.filesSeen++;
    const fileBase = basename(filePath, ".json");
    const tierExam = resolveTierExam(manifest, fileBase);
    let data: unknown;
    try {
      data = JSON.parse(readFileSync(filePath, "utf8"));
    } catch (e) {
      stats.errors.push({ file: filePath, detail: `JSON parse: ${e}` });
      continue;
    }

    const rows = isQuestionArray(data) ? data : null;
    if (!rows) {
      stats.errors.push({ file: filePath, detail: "Not a JSON array — skipped" });
      continue;
    }

    let buf: NormalizedLegacyQuestion[] = [];
    const flush = async () => {
      for (const n of buf) {
        stats.rowsSeen++;
        try {
          const r = await insertOne(n, tierExam, `legacy:${filePath}#${n.legacyId}`, dryRun);
          if (r === "inserted") stats.inserted++;
          else if (r === "dup") stats.skippedDuplicate++;
          else stats.skippedInvalid++;
        } catch (e) {
          stats.errors.push({ file: filePath, detail: String(e) });
        }
      }
      buf = [];
    };

    for (let i = 0; i < rows.length; i++) {
      const n = normalizeLegacyQuestionRow(rows[i], `${fileBase}-${i}`);
      if (!n) {
        stats.skippedInvalid++;
        continue;
      }
      buf.push(n);
      if (buf.length >= batch) await flush();
    }
    await flush();
  }

  console.log(JSON.stringify({ dryRun, ...stats }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
