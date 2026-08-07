import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  completeUsNpCramLessons,
  findCompleteUsNpCramLesson,
} from "../src/lib/content/curated-lessons/us-np-cram-complete";
import {
  attachUsNpCramToSections,
  buildUsNpCramProjection,
  US_NP_CRAM_VERSION,
  type UsNpCramLesson,
} from "../src/lib/content/curated-lessons/us-np-cram-types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "../.env") });
loadEnv({ path: path.join(__dirname, "../../.env") });

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");
const allowPartial = process.argv.includes("--allow-partial");

const FULL_FLOW = [
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

const CRAM_FLOW = [
  "Recognize It Fast",
  "Must-Know Diagnostics",
  "First Priorities",
  "Medication Safety",
  "Red Flags",
  "Exam Traps",
] as const;

type JsonObject = Record<string, unknown>;

function asSections(raw: Prisma.JsonValue, rowLabel: string): JsonObject[] {
  if (!Array.isArray(raw)) {
    throw new Error(`US_NP_CRAM_COMPLETE_CONTENT_NOT_ARRAY: ${rowLabel}`);
  }
  const sections = raw.filter(
    (value): value is JsonObject => Boolean(value && typeof value === "object" && !Array.isArray(value)),
  );
  if (sections.length !== raw.length) {
    throw new Error(`US_NP_CRAM_COMPLETE_CONTENT_NONOBJECT_SECTION: ${rowLabel}`);
  }
  return sections;
}

function validateFullFlow(sections: JsonObject[], rowLabel: string): void {
  const actual = sections.map((section) => String(section.sectionTitle ?? ""));
  if (actual.join("|") !== FULL_FLOW.join("|")) {
    throw new Error(`US_NP_CRAM_COMPLETE_FULL_FLOW_INVALID: ${rowLabel}; ${actual.join(" > ")}`);
  }
}

function validateCramFlow(sections: JsonObject[], lesson: UsNpCramLesson, rowLabel: string): void {
  const actual = sections
    .filter(
      (section) =>
        typeof section.cramTitle === "string" &&
        typeof section.cramContent === "string" &&
        typeof section.cramOrder === "number",
    )
    .sort((a, b) => Number(a.cramOrder) - Number(b.cramOrder));

  const expected = buildUsNpCramProjection(lesson);
  if (actual.length !== CRAM_FLOW.length) {
    throw new Error(`US_NP_CRAM_COMPLETE_CRAM_SECTION_COUNT_INVALID: ${rowLabel}; ${actual.length}/6`);
  }
  if (actual.map((section) => String(section.cramTitle)).join("|") !== CRAM_FLOW.join("|")) {
    throw new Error(
      `US_NP_CRAM_COMPLETE_CRAM_FLOW_INVALID: ${rowLabel}; ${actual.map((section) => String(section.cramTitle)).join(" > ")}`,
    );
  }
  for (let i = 0; i < expected.length; i += 1) {
    const stored = actual[i];
    const source = expected[i];
    if (
      stored.cramTitle !== source.cramTitle ||
      stored.cramContent !== source.cramContent ||
      stored.cramOrder !== source.cramOrder
    ) {
      throw new Error(`US_NP_CRAM_COMPLETE_POSTWRITE_MISMATCH: ${rowLabel}/${source.cramTitle}`);
    }
  }
}

async function readUsNpInventory() {
  return prisma.contentItem.findMany({
    where: {
      type: "lesson",
      tier: "np",
      OR: [
        { regionScope: null },
        { regionScope: "BOTH" },
        { regionScope: "US_ONLY" },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      tier: true,
      regionScope: true,
      status: true,
      bodySystem: true,
      category: true,
      content: true,
      versionKey: true,
      updatedAt: true,
    },
    orderBy: [{ title: "asc" }, { updatedAt: "desc" }],
  });
}

async function main(): Promise<void> {
  const inventory = await readUsNpInventory();

  const resolved = inventory.map((row) => ({
    row,
    lesson: findCompleteUsNpCramLesson({ title: row.title, slug: row.slug }),
  }));
  const uncovered = resolved.filter((entry) => !entry.lesson);
  const covered = resolved.filter(
    (entry): entry is (typeof resolved)[number] & { lesson: UsNpCramLesson } => Boolean(entry.lesson),
  );

  const duplicateIdentity = new Map<string, string[]>();
  for (const { row, lesson } of covered) {
    const ids = duplicateIdentity.get(lesson.slug) ?? [];
    ids.push(`${row.id}:${row.slug}`);
    duplicateIdentity.set(lesson.slug, ids);
  }
  const duplicatedDatabaseMatches = [...duplicateIdentity.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([canonicalSlug, ids]) => ({ canonicalSlug, rows: ids }));

  const coverage = inventory.length === 0 ? 0 : Number(((covered.length / inventory.length) * 100).toFixed(2));
  const report = {
    dryRun,
    allowPartial,
    authoredCramLessons: completeUsNpCramLessons.length,
    usCapableNpFullLessons: inventory.length,
    matchedFullLessons: covered.length,
    uncoveredFullLessons: uncovered.length,
    coveragePercent: coverage,
    duplicateDatabaseMatches: duplicatedDatabaseMatches.length,
    uncovered: uncovered.map(({ row }) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      regionScope: row.regionScope,
      status: row.status,
      bodySystem: row.bodySystem,
      category: row.category,
    })),
    duplicateMatches: duplicatedDatabaseMatches,
  };
  console.log(JSON.stringify(report, null, 2));

  if (duplicatedDatabaseMatches.length > 0) {
    throw new Error(
      `US_NP_CRAM_COMPLETE_DUPLICATE_DATABASE_MATCHES: ${duplicatedDatabaseMatches
        .map((item) => `${item.canonicalSlug}=${item.rows.length}`)
        .join(", ")}`,
    );
  }

  if (uncovered.length > 0 && !allowPartial) {
    throw new Error(
      `US_NP_CRAM_COMPLETE_COVERAGE_INCOMPLETE: ${uncovered.length}/${inventory.length} Full lessons uncovered. ` +
        `Author or explicitly alias every row before writing. --allow-partial is an explicit diagnostic escape only.`,
    );
  }

  for (const { row } of covered) {
    const sections = asSections(row.content, `${row.id}/${row.slug}`);
    validateFullFlow(sections, `${row.id}/${row.slug}`);
  }

  if (dryRun) return;

  const written: Array<{ id: string; slug: string; title: string; cramSlug: string }> = [];
  for (const { row, lesson } of covered) {
    const sections = asSections(row.content, `${row.id}/${row.slug}`);
    const attached = attachUsNpCramToSections(
      sections as unknown as Parameters<typeof attachUsNpCramToSections>[0],
      lesson,
    );

    await prisma.contentItem.update({
      where: { id: row.id },
      data: {
        content: attached as unknown as Prisma.InputJsonValue,
        updatedByAi: true,
      },
    });
    written.push({ id: row.id, slug: row.slug, title: row.title, cramSlug: lesson.slug });
  }

  for (const item of written) {
    const row = await prisma.contentItem.findUnique({
      where: { id: item.id },
      select: { id: true, slug: true, title: true, content: true },
    });
    if (!row) throw new Error(`US_NP_CRAM_COMPLETE_POSTWRITE_ROW_MISSING: ${item.id}`);
    const lesson = findCompleteUsNpCramLesson({ title: row.title, slug: row.slug });
    if (!lesson) throw new Error(`US_NP_CRAM_COMPLETE_POSTWRITE_MATCH_MISSING: ${row.id}/${row.slug}`);
    const sections = asSections(row.content, `${row.id}/${row.slug}`);
    validateFullFlow(sections, `${row.id}/${row.slug}`);
    validateCramFlow(sections, lesson, `${row.id}/${row.slug}`);
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        version: US_NP_CRAM_VERSION,
        writtenRows: written.length,
        verifiedRows: written.length,
        uncoveredRowsRemaining: uncovered.length,
        written,
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
