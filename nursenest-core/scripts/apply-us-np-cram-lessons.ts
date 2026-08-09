/**
 * Audit and attach authored U.S. NP Cram projections to existing Full lessons.
 *
 * Completion is deliberately bidirectional:
 *   1. Inventory EVERY US-capable `tier=np` Full lesson.
 *   2. Require each Full lesson to resolve to exactly one authored Cram lesson by
 *      canonical title/slug or an explicit alias. Fuzzy matching is forbidden.
 *   3. Validate the normalized 10-section Full contract before modifying a row.
 *   4. Attach only the three Cram projection fields on the six target sections.
 *   5. Re-read every write and validate Full + Cram flow after the transaction.
 *
 * The script never creates lessons and never rewrites Full lesson prose.
 *
 * Run from nursenest-core:
 *   npx tsx scripts/apply-us-np-cram-lessons.ts --dry-run
 *   npx tsx scripts/apply-us-np-cram-lessons.ts
 *   npx tsx scripts/apply-us-np-cram-lessons.ts --allow-partial
 *
 * `--allow-partial` is an explicit escape hatch for applying already-covered rows
 * after a reviewed audit. Default mode fails closed if ANY US-capable NP Full lesson
 * lacks an authored Cram identity.
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
  findUsNpCramLesson,
  normalizeUsNpCramTitle,
  usNpCramLessons,
} from "../src/lib/content/curated-lessons/us-np-cram";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "../.env") });
loadEnv({ path: path.join(__dirname, "../../.env") });

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");
const allowPartial = process.argv.includes("--allow-partial");

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

async function readAllUsNpInventory() {
  return prisma.contentItem.findMany({
    where: {
      type: "lesson",
      tier: "np",
      OR: [
        { regionScope: "US_ONLY" },
        { regionScope: "BOTH" },
        { regionScope: null },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      bodySystem: true,
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
  const inventory = await readAllUsNpInventory();

  const resolved = inventory.map((row) => ({
    row,
    lesson: findUsNpCramLesson({ title: row.title, slug: row.slug }),
  }));
  const uncoveredFullRows = resolved.filter(({ lesson }) => !lesson).map(({ row }) => row);
  const covered = resolved.filter(
    (item): item is typeof item & { lesson: NonNullable<typeof item.lesson> } => Boolean(item.lesson),
  );

  const matchedAuthoredSlugs = new Set(covered.map(({ lesson }) => lesson.slug));
  const authoredWithoutFullRows = usNpCramLessons
    .filter((lesson) => !matchedAuthoredSlugs.has(lesson.slug))
    .map((lesson) => ({ slug: lesson.slug, title: lesson.title, applicableExams: lesson.applicableExams }));

  const duplicateRowKeys = new Map<string, number>();
  for (const { row, lesson } of covered) {
    const key = `${lesson.slug}|${row.regionScope ?? "BOTH"}`;
    duplicateRowKeys.set(key, (duplicateRowKeys.get(key) ?? 0) + 1);
  }
  const duplicates = [...duplicateRowKeys.entries()].filter(([, count]) => count > 1);
  if (duplicates.length) {
    throw new Error(
      `US_NP_CRAM_DUPLICATE_DATABASE_ROWS: ${duplicates.map(([key, count]) => `${key}=${count}`).join(", ")}`,
    );
  }

  const prepared = covered.map(({ row, lesson }) => {
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

  const coveragePercent = inventory.length === 0 ? 0 : Number(((covered.length / inventory.length) * 100).toFixed(2));
  const matchedUniqueFullTitles = new Set(covered.map(({ row }) => normalizeUsNpCramTitle(row.title))).size;

  const report = {
    dryRun,
    allowPartial,
    authoredLessons: usNpCramLessons.length,
    discoveredUsNpFullRows: inventory.length,
    coveredFullRows: covered.length,
    uncoveredFullRows: uncoveredFullRows.length,
    coveragePercent,
    matchedUniqueFullTitles,
    completionGate: uncoveredFullRows.length === 0 && inventory.length > 0 ? "PASS" : "FAIL",
    uncovered: uncoveredFullRows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      bodySystem: row.bodySystem,
      regionScope: row.regionScope ?? "BOTH",
      status: row.status,
    })),
    authoredWithoutFullRows,
    prepared: prepared.map(({ row, lesson, projectionTitles }) => ({
      id: row.id,
      slug: row.slug,
      storedTitle: row.title,
      authoredSlug: lesson.slug,
      authoredTitle: lesson.title,
      regionScope: row.regionScope ?? "BOTH",
      applicableExams: lesson.applicableExams,
      cramSections: projectionTitles,
    })),
  };
  console.log(JSON.stringify(report, null, 2));

  if (inventory.length === 0) {
    throw new Error("US_NP_CRAM_NO_US_NP_FULL_LESSONS_DISCOVERED: inventory cannot certify completion");
  }

  if (uncoveredFullRows.length && !allowPartial) {
    throw new Error(
      `US_NP_CRAM_FULL_TO_CRAM_COVERAGE_INCOMPLETE: ${uncoveredFullRows.length}/${inventory.length} US-capable NP Full rows lack authored Cram. ` +
        "Author explicit Cram lessons or aliases for every uncovered row before applying.",
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
        discoveredUsNpFullRows: inventory.length,
        appliedRows: prepared.length,
        verifiedRows: verificationRows.length,
        uncoveredFullRows: uncoveredFullRows.length,
        coveragePercent,
        status:
          uncoveredFullRows.length === 0
            ? "US_NP_CRAM_FULL_COVERAGE_APPLY_VERIFIED"
            : "US_NP_CRAM_PARTIAL_APPLY_VERIFIED",
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
