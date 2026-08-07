/**
 * Replace generic learner-facing RN cardiovascular lessons with curated,
 * NCLEX-focused structured lessons.
 *
 * Run from nursenest-core:
 *   npx tsx scripts/rewrite-rn-cardiovascular-lessons.ts --dry-run
 *   npx tsx scripts/rewrite-rn-cardiovascular-lessons.ts
 *
 * Env: DATABASE_URL
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  cardiovascularRnExpectedTitles,
  cardiovascularRnLessons,
} from "../src/lib/content/curated-lessons/cardiovascular-rn";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "../.env") });
loadEnv({ path: path.join(__dirname, "../../.env") });

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

const learnerRegionFilter: Prisma.ContentItemWhereInput = {
  OR: [
    { regionScope: null },
    { regionScope: "BOTH" },
    { regionScope: "CA_ONLY" },
  ],
};

const exactTitleFilter: Prisma.ContentItemWhereInput = {
  OR: cardiovascularRnExpectedTitles.map((title) => ({
    title: { equals: title, mode: "insensitive" as const },
  })),
};

const cardioDiscoveryFilter: Prisma.ContentItemWhereInput = {
  OR: [
    { category: { contains: "cardio", mode: "insensitive" } },
    { bodySystem: { contains: "cardio", mode: "insensitive" } },
    exactTitleFilter,
  ],
};

function normalizedTitle(value: string): string {
  return value.trim().toLowerCase();
}

async function main() {
  const inventory = await prisma.contentItem.findMany({
    where: {
      type: "lesson",
      tier: "rn",
      AND: [learnerRegionFilter, cardioDiscoveryFilter],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      bodySystem: true,
      status: true,
      regionScope: true,
      versionKey: true,
      sourceVersion: true,
      updatedAt: true,
    },
    orderBy: [{ title: "asc" }, { updatedAt: "desc" }],
  });

  const expectedNormalized = new Map(
    cardiovascularRnExpectedTitles.map((title) => [normalizedTitle(title), title]),
  );
  const presentExpected = new Set<string>();
  const unexpectedTitles = new Set<string>();

  for (const row of inventory) {
    const key = normalizedTitle(row.title);
    if (expectedNormalized.has(key)) presentExpected.add(expectedNormalized.get(key)!);
    else unexpectedTitles.add(row.title);
  }

  const missingExpected = cardiovascularRnExpectedTitles.filter(
    (title) => !presentExpected.has(title),
  );

  const report = {
    dryRun,
    expectedTitleCount: cardiovascularRnExpectedTitles.length,
    discoveredRowCount: inventory.length,
    matchedExpectedTitleCount: presentExpected.size,
    missingExpected,
    unexpectedTitles: [...unexpectedTitles].sort(),
    inventory,
  };

  console.log(JSON.stringify(report, null, 2));

  if (unexpectedTitles.size > 0) {
    throw new Error(
      `RN_CARDIOVASCULAR_UNEXPECTED_TITLES: ${[...unexpectedTitles].sort().join(", ")}`,
    );
  }
  if (missingExpected.length > 0) {
    throw new Error(
      `RN_CARDIOVASCULAR_MISSING_EXPECTED_TITLES: ${missingExpected.join(", ")}`,
    );
  }

  if (dryRun) return;

  let updatedRows = 0;
  const verification: Array<{
    title: string;
    rows: number;
    slugs: string[];
    versionKey: string;
  }> = [];

  for (const title of cardiovascularRnExpectedTitles) {
    const lesson = cardiovascularRnLessons[title as keyof typeof cardiovascularRnLessons];
    if (!lesson) throw new Error(`RN_CARDIOVASCULAR_CURATED_LESSON_MISSING: ${title}`);

    const where: Prisma.ContentItemWhereInput = {
      type: "lesson",
      tier: "rn",
      AND: [
        learnerRegionFilter,
        { title: { equals: title, mode: "insensitive" } },
      ],
    };

    const candidates = await prisma.contentItem.findMany({
      where,
      select: { id: true, slug: true },
    });
    if (candidates.length === 0) {
      throw new Error(`RN_CARDIOVASCULAR_WRITE_TARGET_DISAPPEARED: ${title}`);
    }

    const updateResult = await prisma.contentItem.updateMany({
      where,
      data: {
        summary: lesson.summary,
        category: "Cardiovascular",
        bodySystem: "Cardiovascular",
        content: lesson.sections as unknown as Prisma.InputJsonValue,
        versionKey: lesson.versionKey,
        updatedByAi: true,
        sourceVersion: { increment: 1 },
      },
    });

    if (updateResult.count !== candidates.length) {
      throw new Error(
        `RN_CARDIOVASCULAR_UPDATE_COUNT_MISMATCH: ${title}; expected ${candidates.length}, updated ${updateResult.count}`,
      );
    }

    const verified = await prisma.contentItem.findMany({
      where,
      select: { slug: true, versionKey: true, content: true },
    });

    for (const row of verified) {
      const sections = Array.isArray(row.content) ? row.content : [];
      const sectionTitles = sections
        .filter((section): section is Record<string, unknown> => Boolean(section && typeof section === "object"))
        .map((section) => String(section.sectionTitle ?? ""));
      const required = [
        "Bottom Line",
        "What Is Happening",
        "Assessment Pattern",
        "Diagnostics",
        "Management",
        "Medication and Safety",
        "Priority Nursing Actions",
        "Red Flags: Escalate",
        "NCLEX Traps",
        "Clinical Judgment",
      ];
      const missingSections = required.filter((section) => !sectionTitles.includes(section));
      if (row.versionKey !== lesson.versionKey || missingSections.length > 0) {
        throw new Error(
          `RN_CARDIOVASCULAR_POSTWRITE_VERIFY_FAILED: ${row.slug}; missing=${missingSections.join("|")}`,
        );
      }
    }

    updatedRows += updateResult.count;
    verification.push({
      title,
      rows: verified.length,
      slugs: verified.map((row) => row.slug),
      versionKey: lesson.versionKey,
    });
  }

  console.log(
    JSON.stringify(
      {
        updatedRows,
        expectedTitles: cardiovascularRnExpectedTitles.length,
        verification,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
