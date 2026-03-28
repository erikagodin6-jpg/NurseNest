/**
 * Import legacy lesson modules from `client/src/data/lessons/*.ts` into Prisma.
 * Skips `index.ts` and `types.ts`. Idempotent: skips when `slug` already exists.
 *
 * Usage (from nursenest-core):
 *   DATABASE_URL=... npx tsx scripts/import-lessons.ts [--dry-run] [--limit=50]
 */
import { config } from "dotenv";
import { existsSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { ContentStatus, PrismaClient } from "@prisma/client";
import { loadLegacyLessonFileDirect } from "./migration/bundle-legacy-lesson-file";
import { ensureCategoryId } from "./migration/ensure-category";
import { legacyPaths } from "./migration/repo-paths";
import { inferLessonTierAndExam } from "./migration/lesson-tier";
import { lessonContentToMarkdown, summaryFromBody } from "./migration/lesson-body";
import { safeLessonSlug } from "./migration/slugify";

config({ path: ".env.local" });
config();

const prisma = new PrismaClient();

type Stats = {
  filesSeen: number;
  lessonsSeen: number;
  inserted: number;
  skippedDuplicate: number;
  skippedInvalid: number;
  fileErrors: { file: string; detail: string }[];
};

function parseArgs() {
  const dryRun = process.argv.includes("--dry-run");
  const lim = process.argv.find((a) => a.startsWith("--limit="));
  const limit = lim ? Number(lim.split("=")[1]) : undefined;
  return { dryRun, limit: Number.isFinite(limit) ? limit : undefined };
}

async function main() {
  const { dryRun, limit } = parseArgs();
  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is required.");
    process.exit(1);
  }

  const { lessonsDir } = legacyPaths();
  if (!existsSync(lessonsDir)) {
    console.error(`Lessons directory missing: ${lessonsDir}`);
    process.exit(1);
  }

  const stats: Stats = {
    filesSeen: 0,
    lessonsSeen: 0,
    inserted: 0,
    skippedDuplicate: 0,
    skippedInvalid: 0,
    fileErrors: [],
  };

  const files = readdirSync(lessonsDir)
    .filter((n) => n.endsWith(".ts") && n !== "index.ts" && n !== "types.ts")
    .map((n) => join(lessonsDir, n))
    .sort((a, b) => a.localeCompare(b));

  const toProcess = typeof limit === "number" ? files.slice(0, limit) : files;

  for (const filePath of toProcess) {
    stats.filesSeen++;
    const fileName = basename(filePath);
    const fileBase = basename(filePath, ".ts");
    const { tier, examFamily } = inferLessonTierAndExam(fileBase);
    let categoryId: string;
    try {
      categoryId = await ensureCategoryId(prisma, `Legacy lessons — ${fileBase}`);
    } catch (e) {
      stats.fileErrors.push({ file: filePath, detail: String(e) });
      continue;
    }

    let maps: Record<string, Record<string, unknown>>;
    try {
      maps = await loadLegacyLessonFileDirect(filePath);
    } catch (e) {
      stats.fileErrors.push({ file: filePath, detail: String(e) });
      continue;
    }

    for (const [lessonId, content] of Object.entries(maps)) {
      stats.lessonsSeen++;
      const title = String(content.title ?? lessonId);
      const body = lessonContentToMarkdown(lessonId, content);
      if (body.trim().length < 40) {
        stats.skippedInvalid++;
        continue;
      }
      const summary = summaryFromBody(body, title);
      const slug = safeLessonSlug(lessonId);

      const exists = await prisma.lesson.findUnique({ where: { slug }, select: { id: true } });
      if (exists) {
        stats.skippedDuplicate++;
        continue;
      }

      if (dryRun) {
        stats.inserted++;
        continue;
      }

      try {
        await prisma.lesson.create({
          data: {
            title: title.slice(0, 500),
            slug,
            summary: summary.slice(0, 2000),
            body,
            country: "CA",
            tier,
            status: ContentStatus.PUBLISHED,
            examFamily,
            categoryId,
            tags: [lessonId, fileBase].filter(Boolean),
            sourceNotes: `legacy-lesson:${fileName}#${lessonId}`.slice(0, 2000),
          },
        });
        stats.inserted++;
      } catch (e) {
        stats.fileErrors.push({ file: `${filePath}::${lessonId}`, detail: String(e) });
      }
    }
  }

  console.log(JSON.stringify({ dryRun, limit, ...stats }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
