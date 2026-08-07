/**
 * Attach authored U.S. NP Cram projections to existing Full lessons.
 *
 * This script never creates lessons and never rewrites Full lesson prose. It only
 * replaces the three Cram projection fields on the six canonical Full sections.
 * It is fail-closed by default when an authored title is missing or a stored Full
 * lesson does not satisfy the normalized 10-section contract.
 *
 * Run from nursenest-core:
 *   npx tsx scripts/apply-us-np-cram-lessons.ts --dry-run
 *   npx tsx scripts/apply-us-np-cram-lessons.ts
 *   npx tsx scripts/apply-us-np-cram-lessons.ts --allow-partial
 *
 * Env: DATABASE_URL
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  attachUsNpCramToSections,
  buildUsNpCramProjection,
  usNpCramLessons,
  type UsNpCramLesson,
} from "../src/lib/content/curated-lessons/us-np-cram";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "../.env") });
loadEnv({ path: path.join(__dirname, "../../.env") });

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");
const allowPartial = process.argv.includes("--allow-partial");

function normalizeTitle(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

const authoredByTitle = new Map<string, UsNpCramLesson>(
  usNpCramLessons.map((lesson) => [normalizeTitle(lesson.title), lesson]),
);

const expectedFullTitles = [
  "Bottom Line",
  "What Is Happening",
  "Assessment Pattern",
  "Diagnostics",
  "Management",
  "Medication and Safety",
  "Priority Clinical Decisions",
  "Red Flags: Escalate",
  "NCLEX Traps",
  "Clinical Judgment",
] as const;

const expectedCramTitles = [
  "Recognize It Fast",
  "Must-Know Diagnostics",
  "First Priorities",
  "Medication Safety",
  "Red Flags",
  "Exam Traps",
] as const;

function asSectionArray(title: string, raw: Prisma.JsonValue): Record<string, unknown>[] {
  if (!Array.isArray(raw)) {
    throw new Error(`US_NP_CRAM_CONTENT_NOT_ARRAY: ${title}`);
  }
  if (raw.some((value) => !value || typeof value !== "object" || Array.isArray(value))) {
    throw new Error(`US_NP_CRAM_NON_OBJECT_SECTION: ${title}`);
  }
  return raw as Record<string, unknown>[];
}

function validateFullFlow(title: string, sections: readonly Record<string, unknown>[]): void {
  const actual = sections.map((section) => String(section.sectionTitle ?? ""));
  if (actual.join("|") !== expectedFullTitles.join("|")) {
    throw new Error(`US_NP_CRAM_FULL_FLOW_INVALID: ${title}; ${actual.join(" > ")}`);
  }
}

function validateCramFlow(title: string, sections: readonly Record<string, unknown>[]): void {
  const cram = sections
    .filter(
      (section) =>
        typeof section.cramTitle === "string" &&
        typeof section.cramContent === "string" &&
        typeof section.cramOrder === "number",
    )
    .sort((a, b) => Number(a.cramOrder) - Number(b.cramOrder));

  const actual = cram.map((section) => String(section.cramTitle));
  if (actual.join("|") !== expectedCramTitles.join("|")) {
    throw new Error(`US_NP_CRAM_PROJECTION_INVALID: ${title}; ${actual.join(" > ")}`);
  }
  for (const section of cram) {
    if (String(section.cramContent).trim().length < 60) {
      throw new Error(`US_NP_CRAM_PROJECTION_TOO_THIN: ${title}/${section.cramTitle}`);
    }
  }
}

async function readInventory() {
  const titleFilter: Prisma.ContentItemWhereInput = {
    OR: usNpCramLessons.map((lesson) => ({
      title: { equals: lesson.title, mode: "insensitive" as const },
    })),
  };

  return prisma.contentItem.findMany({
    where: {
      type: "lesson",
      tier: "np",
      AND: [
        titleFilter,
        {
          OR: [
            { regionScope: "US_ONLY" },
            { regionScope: "BOTH" },
            { regionScope: null },
          ],
        },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      regionScope: true,
      status: true,
      content: true,
      versionKey: true,
      sourceVersion: true,
      updatedAt: true,
    },
    orderBy: [{ title: "asc" }, { regionScope: "asc" }, { updatedAt: "desc" }],
  });
}

async function main(): Promise<void> {
  const inventory = await readInventory();
  const matchedTitles = new Set(inventory.map((row) => normalizeTitle(row.title)));
  const missingAuthoredTitles = usNpCramLessons
    .filter((lesson) => !matchedTitles.has(normalizeTitle(lesson.title)))
    .map((lesson) => lesson.title);

  const unknownRows = inventory.filter((row) => !authoredByTitle.has(normalizeTitle(row.title)));
  if (unknownRows.length) {
    throw new Error(`US_NP_CRAM_UNKNOWN_MATCHED_ROWS: ${unknownRows.map((row) => row.title).join(", ")}`);
  }

  const duplicateRowKeys = new Map<string, number>();
  for (const row of inventory) {
    const key = `${normalizeTitle(row.title)}|${row.regionScope ?? "BOTH"}`;
    duplicateRowKeys.set(key, (duplicateRowKeys.get(key) ?? 0) + 1);
  }
  const duplicates = [...duplicateRowKeys.entries()].filter(([, count]) => count > 1);
  if (duplicates.length) {
    throw new Error(
      `US_NP_CRAM_DUPLICATE_DATABASE_ROWS: ${duplicates.map(([key, count]) => `${key}=${count}`).join(", ")}`,
    );
  }

  const prepared = inventory.map((row) => {
    const lesson = authoredByTitle.get(normalizeTitle(row.title));
    if (!lesson) throw new Error(`US_NP_CRAM_SOURCE_LOOKUP_FAILED: ${row.title}`);

    const sections = asSectionArray(row.title, row.content);
    validateFullFlow(row.title, sections);
    const nextSections = attachUsNpCramToSections(sections, lesson);
    validateCramFlow(row.title, nextSections);

    const projection = buildUsNpCramProjection(lesson);
    return {
      row,
      lesson,
      nextSections,
      projectionTitles: projection.map((item) => item.cramTitle),
    };
  });

  const report = {
    dryRun,
    allowPartial,
    authoredLessons: usNpCramLessons.length,
    matchedRows: inventory.length,
    matchedUniqueTitles: matchedTitles.size,
    missingAuthoredTitles,
    prepared: prepared.map(({ row, lesson, projectionTitles }) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      regionScope: row.regionScope ?? "BOTH",
      applicableExams: lesson.applicableExams,
      cramSections: projectionTitles,
    })),
  };
  console.log(JSON.stringify(report, null, 2));

  if (missingAuthoredTitles.length && !allowPartial) {
    throw new Error(
      `US_NP_CRAM_DATABASE_COVERAGE_INCOMPLETE: ${missingAuthoredTitles.length} authored titles have no US-capable NP Full lesson. ` +
        "Author/normalize those Full lessons first, or rerun with --allow-partial after reviewing --dry-run output.",
    );
  }

  if (dryRun) return;

  await prisma.$transaction(
    prepared.map(({ row, nextSections }) =>
      prisma.contentItem.update({
        where: { id: row.id },
        data: {
          content: nextSections as unknown as Prisma.InputJsonValue,
          updatedByAi: true,
        },
      }),
    ),
  );

  const verificationRows = await prisma.contentItem.findMany({
    where: { id: { in: prepared.map(({ row }) => row.id) } },
    select: { id: true, title: true, content: true },
  });
  for (const row of verificationRows) {
    const sections = asSectionArray(row.title, row.content);
    validateFullFlow(row.title, sections);
    validateCramFlow(row.title, sections);
  }

  console.log(
    JSON.stringify(
      {
        appliedRows: prepared.length,
        verifiedRows: verificationRows.length,
        status: "US_NP_CRAM_APPLY_VERIFIED",
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
