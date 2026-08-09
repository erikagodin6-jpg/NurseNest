import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  EXPECTED_FINAL_US_NP_CRAM_LESSONS,
  finalUsNpCramLessons,
  findFinalUsNpCramLesson,
} from "../src/lib/content/curated-lessons/us-np-cram-final";
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
const write = process.argv.includes("--write");
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
  if (!Array.isArray(raw)) throw new Error(`US_NP_CRAM_FINAL_CONTENT_NOT_ARRAY: ${rowLabel}`);
  const sections = raw.filter((value): value is JsonObject => Boolean(value && typeof value === "object" && !Array.isArray(value)));
  if (sections.length !== raw.length) throw new Error(`US_NP_CRAM_FINAL_CONTENT_NONOBJECT_SECTION: ${rowLabel}`);
  return sections;
}

function validateFullFlow(sections: JsonObject[], rowLabel: string): void {
  const actual = sections.map((section) => String(section.sectionTitle ?? ""));
  if (actual.join("|") !== FULL_FLOW.join("|")) {
    throw new Error(`US_NP_CRAM_FINAL_FULL_FLOW_INVALID: ${rowLabel}; ${actual.join(" > ")}`);
  }
}

function validateCramFlow(sections: JsonObject[], lesson: UsNpCramLesson, rowLabel: string): void {
  const actual = sections
    .filter((section) => typeof section.cramTitle === "string" && typeof section.cramContent === "string" && typeof section.cramOrder === "number")
    .sort((a, b) => Number(a.cramOrder) - Number(b.cramOrder));
  const expected = buildUsNpCramProjection(lesson);
  if (actual.length !== 6) throw new Error(`US_NP_CRAM_FINAL_CRAM_SECTION_COUNT_INVALID: ${rowLabel}; ${actual.length}/6`);
  if (actual.map((section) => String(section.cramTitle)).join("|") !== CRAM_FLOW.join("|")) {
    throw new Error(`US_NP_CRAM_FINAL_CRAM_FLOW_INVALID: ${rowLabel}`);
  }
  for (let i = 0; i < expected.length; i += 1) {
    if (
      actual[i].cramTitle !== expected[i].cramTitle ||
      actual[i].cramContent !== expected[i].cramContent ||
      actual[i].cramOrder !== expected[i].cramOrder
    ) {
      throw new Error(`US_NP_CRAM_FINAL_POSTWRITE_MISMATCH: ${rowLabel}/${expected[i].cramTitle}`);
    }
  }
}

async function readUsNpInventory() {
  return prisma.contentItem.findMany({
    where: {
      type: "lesson",
      tier: "np",
      OR: [{ regionScope: null }, { regionScope: "BOTH" }, { regionScope: "US_ONLY" }],
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
      updatedAt: true,
    },
    orderBy: [{ title: "asc" }, { updatedAt: "desc" }],
  });
}

async function main(): Promise<void> {
  if (finalUsNpCramLessons.length !== EXPECTED_FINAL_US_NP_CRAM_LESSONS) {
    throw new Error(`US_NP_CRAM_FINAL_AUTHORING_COUNT_INVALID: ${finalUsNpCramLessons.length}/${EXPECTED_FINAL_US_NP_CRAM_LESSONS}`);
  }

  const inventory = await readUsNpInventory();
  const resolved = inventory.map((row) => ({ row, lesson: findFinalUsNpCramLesson({ title: row.title, slug: row.slug }) }));
  const uncovered = resolved.filter((entry) => !entry.lesson);
  const covered = resolved.filter((entry): entry is (typeof resolved)[number] & { lesson: UsNpCramLesson } => Boolean(entry.lesson));

  const byCanonical = new Map<string, string[]>();
  for (const { row, lesson } of covered) {
    const rows = byCanonical.get(lesson.slug) ?? [];
    rows.push(`${row.id}:${row.slug}`);
    byCanonical.set(lesson.slug, rows);
  }
  const duplicateMatches = [...byCanonical.entries()]
    .filter(([, rows]) => rows.length > 1)
    .map(([canonicalSlug, rows]) => ({ canonicalSlug, rows }));

  const report = {
    write,
    allowPartial,
    authoredCramLessons: finalUsNpCramLessons.length,
    usCapableNpFullLessons: inventory.length,
    matchedFullLessons: covered.length,
    uncoveredFullLessons: uncovered.length,
    coveragePercent: inventory.length ? Number(((covered.length / inventory.length) * 100).toFixed(2)) : 0,
    duplicateDatabaseMatches: duplicateMatches.length,
    uncovered: uncovered.map(({ row }) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      regionScope: row.regionScope,
      status: row.status,
      bodySystem: row.bodySystem,
      category: row.category,
    })),
    duplicateMatches,
  };
  console.log(JSON.stringify(report, null, 2));

  if (duplicateMatches.length) {
    throw new Error(`US_NP_CRAM_FINAL_DUPLICATE_DATABASE_MATCHES: ${duplicateMatches.map((x) => `${x.canonicalSlug}=${x.rows.length}`).join(", ")}`);
  }
  if (uncovered.length && !allowPartial) {
    throw new Error(`US_NP_CRAM_FINAL_COVERAGE_INCOMPLETE: ${uncovered.length}/${inventory.length} Full lessons uncovered; no write permitted`);
  }

  for (const { row } of covered) validateFullFlow(asSections(row.content, `${row.id}/${row.slug}`), `${row.id}/${row.slug}`);
  if (!write) return;

  const written: Array<{ id: string; slug: string; cramSlug: string }> = [];
  for (const { row, lesson } of covered) {
    const attached = attachUsNpCramToSections(
      asSections(row.content, `${row.id}/${row.slug}`) as unknown as Parameters<typeof attachUsNpCramToSections>[0],
      lesson,
    );
    await prisma.contentItem.update({
      where: { id: row.id },
      data: { content: attached as unknown as Prisma.InputJsonValue, updatedByAi: true },
    });
    written.push({ id: row.id, slug: row.slug, cramSlug: lesson.slug });
  }

  for (const item of written) {
    const row = await prisma.contentItem.findUnique({ where: { id: item.id }, select: { id: true, slug: true, title: true, content: true } });
    if (!row) throw new Error(`US_NP_CRAM_FINAL_POSTWRITE_ROW_MISSING: ${item.id}`);
    const lesson = findFinalUsNpCramLesson({ title: row.title, slug: row.slug });
    if (!lesson) throw new Error(`US_NP_CRAM_FINAL_POSTWRITE_MATCH_MISSING: ${row.id}/${row.slug}`);
    const sections = asSections(row.content, `${row.id}/${row.slug}`);
    validateFullFlow(sections, `${row.id}/${row.slug}`);
    validateCramFlow(sections, lesson, `${row.id}/${row.slug}`);
  }

  console.log(JSON.stringify({
    ok: true,
    version: US_NP_CRAM_VERSION,
    authoredCramLessons: finalUsNpCramLessons.length,
    writtenRows: written.length,
    verifiedRows: written.length,
    uncoveredRowsRemaining: uncovered.length,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
