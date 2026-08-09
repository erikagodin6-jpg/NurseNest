/**
 * Curated cardiovascular remediation for RN, practical-nursing, and NP rows.
 *
 * Run from nursenest-core:
 *   npx tsx scripts/rewrite-cardiovascular-lessons-all-tiers.ts --dry-run
 *   npx tsx scripts/rewrite-cardiovascular-lessons-all-tiers.ts --create-missing
 *   npx tsx scripts/rewrite-cardiovascular-lessons-all-tiers.ts
 *
 * `--create-missing` is explicit and conservative: it creates a BOTH-scoped row
 * only for a normalized tier that already exists in the cardiovascular estate.
 * The normal rewrite remains fail-closed if coverage is incomplete.
 *
 * Env: DATABASE_URL
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import { cardiovascularRnExpectedTitles } from "../src/lib/content/curated-lessons/cardiovascular-rn";
import {
  cardiovascularScopedLessons,
  type CardiovascularRegion,
  type CardiovascularTier,
} from "../src/lib/content/curated-lessons/cardiovascular-scoped";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "../.env") });
loadEnv({ path: path.join(__dirname, "../../.env") });

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");
const createMissing = process.argv.includes("--create-missing");

if (dryRun && createMissing) {
  throw new Error("CARDIOVASCULAR_MODE_CONFLICT: choose --dry-run or --create-missing, not both");
}

const productionTierValues = ["rn", "rpn", "lpn", "lvn", "np"] as const;

function normalizeTitle(value: string): string {
  return value.trim().toLowerCase();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeTier(value: string): CardiovascularTier {
  const tier = value.trim().toLowerCase();
  if (tier === "rn") return "rn";
  if (tier === "np") return "np";
  if (tier === "rpn" || tier === "lpn" || tier === "lvn") return "rpn";
  throw new Error(`CARDIOVASCULAR_UNSUPPORTED_TIER: ${value}`);
}

function normalizeRegion(value: string | null): CardiovascularRegion {
  if (!value || value === "BOTH") return "BOTH";
  if (value === "CA_ONLY") return "CA";
  if (value === "US_ONLY") return "US";
  throw new Error(`CARDIOVASCULAR_UNSUPPORTED_REGION_SCOPE: ${value}`);
}

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

function validateStoredFlow(
  title: string,
  tier: CardiovascularTier,
  region: CardiovascularRegion,
  raw: Prisma.JsonValue,
): void {
  if (!Array.isArray(raw)) {
    throw new Error(`CARDIOVASCULAR_POSTWRITE_CONTENT_NOT_ARRAY: ${title}/${tier}/${region}`);
  }

  const sections = raw.filter(
    (value): value is Record<string, unknown> => Boolean(value && typeof value === "object" && !Array.isArray(value)),
  );
  const expectedFull = [
    "Bottom Line",
    "What Is Happening",
    "Assessment Pattern",
    "Diagnostics",
    "Management",
    "Medication and Safety",
    tier === "np" ? "Priority Clinical Decisions" : "Priority Nursing Actions",
    "Red Flags: Escalate",
    "NCLEX Traps",
    "Clinical Judgment",
  ];
  const actualFull = sections.map((value) => String(value.sectionTitle ?? ""));
  if (actualFull.join("|") !== expectedFull.join("|")) {
    throw new Error(
      `CARDIOVASCULAR_POSTWRITE_FULL_FLOW_INVALID: ${title}/${tier}/${region}; ${actualFull.join(" > ")}`,
    );
  }

  const expectedCram = [
    "Recognize It Fast",
    "Must-Know Diagnostics",
    "First Priorities",
    "Medication Safety",
    "Red Flags",
    "Exam Traps",
  ];
  const actualCram = sections
    .filter(
      (value) =>
        typeof value.cramTitle === "string" &&
        typeof value.cramContent === "string" &&
        typeof value.cramOrder === "number",
    )
    .sort((a, b) => Number(a.cramOrder) - Number(b.cramOrder))
    .map((value) => String(value.cramTitle));

  if (actualCram.join("|") !== expectedCram.join("|")) {
    throw new Error(
      `CARDIOVASCULAR_POSTWRITE_CRAM_FLOW_INVALID: ${title}/${tier}/${region}; ${actualCram.join(" > ")}`,
    );
  }
}

async function readInventory() {
  return prisma.contentItem.findMany({
    where: {
      type: "lesson",
      tier: { in: [...productionTierValues] },
      AND: [cardioDiscoveryFilter],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      tier: true,
      category: true,
      bodySystem: true,
      status: true,
      regionScope: true,
      versionKey: true,
      sourceVersion: true,
      updatedAt: true,
    },
    orderBy: [{ tier: "asc" }, { title: "asc" }, { updatedAt: "desc" }],
  });
}

function buildCoverage(inventory: Awaited<ReturnType<typeof readInventory>>) {
  const expectedByKey = new Map(
    cardiovascularRnExpectedTitles.map((title) => [normalizeTitle(title), title]),
  );
  const normalizedTierGroups = ["rn", "rpn", "np"] as const;
  const coverage = Object.fromEntries(
    normalizedTierGroups.map((tier) => {
      const titles = new Set(
        inventory
          .filter((row) => normalizeTier(row.tier ?? "") === tier)
          .map((row) => expectedByKey.get(normalizeTitle(row.title))!)
          .filter(Boolean),
      );
      return [
        tier,
        {
          present: [...titles].sort(),
          missing: cardiovascularRnExpectedTitles.filter((title) => !titles.has(title)),
        },
      ];
    }),
  ) as Record<CardiovascularTier, { present: string[]; missing: string[] }>;
  return { expectedByKey, coverage };
}

async function createMissingRows(
  inventory: Awaited<ReturnType<typeof readInventory>>,
  coverage: Record<CardiovascularTier, { present: string[]; missing: string[] }>,
) {
  const created: Array<{ id: string; slug: string; title: string; tier: CardiovascularTier }> = [];
  const rawTierByNormalized = new Map<CardiovascularTier, string>();

  for (const row of inventory) {
    if (!row.tier) continue;
    const normalized = normalizeTier(row.tier);
    if (!rawTierByNormalized.has(normalized)) rawTierByNormalized.set(normalized, row.tier);
  }

  for (const tier of ["rn", "rpn", "np"] as const) {
    const rawTier = rawTierByNormalized.get(tier);
    if (!rawTier) {
      throw new Error(`CARDIOVASCULAR_CREATE_MISSING_NO_EXISTING_TIER_PROFILE: ${tier}`);
    }

    for (const title of coverage[tier].missing) {
      const lesson = cardiovascularScopedLessons[title]?.[tier]?.BOTH;
      if (!lesson) throw new Error(`CARDIOVASCULAR_CREATE_MISSING_SOURCE_MISSING: ${title}/${tier}`);
      const slug = `${rawTier.toLowerCase()}-cardiovascular-${slugify(title)}`;

      const existingSlug = await prisma.contentItem.findUnique({ where: { slug }, select: { id: true } });
      if (existingSlug) {
        throw new Error(`CARDIOVASCULAR_CREATE_MISSING_SLUG_COLLISION: ${slug}`);
      }

      const row = await prisma.contentItem.create({
        data: {
          title,
          slug,
          type: "lesson",
          category: "Cardiovascular",
          bodySystem: "Cardiovascular",
          tier: rawTier,
          status: "published",
          tags: ["cardiovascular", "curated"],
          summary: lesson.summary,
          content: lesson.sections as unknown as Prisma.InputJsonValue,
          clinicalSafetyReview: true,
          autoPublish: false,
          publishedAt: new Date(),
          authorName: "DELEGATED_AI_CONTENT_OWNER",
          regionScope: "BOTH",
          versionKey: lesson.versionKey,
          updatedByAi: true,
          sourceVersion: 1,
        },
        select: { id: true, slug: true, title: true },
      });
      created.push({ ...row, tier });
    }
  }

  console.log(JSON.stringify({ createdMissingRows: created.length, created }, null, 2));
}

async function main() {
  let inventory = await readInventory();
  let { expectedByKey, coverage } = buildCoverage(inventory);

  const unexpected = inventory.filter((row) => !expectedByKey.has(normalizeTitle(row.title)));
  if (unexpected.length > 0) {
    console.log(JSON.stringify({ unexpected }, null, 2));
    throw new Error(
      `CARDIOVASCULAR_UNEXPECTED_TITLES: ${[...new Set(unexpected.map((row) => row.title))].sort().join(", ")}`,
    );
  }

  const report = {
    dryRun,
    createMissing,
    expectedTitlesPerTier: cardiovascularRnExpectedTitles.length,
    discoveredRows: inventory.length,
    coverage,
    regionCounts: inventory.reduce<Record<string, number>>((acc, row) => {
      const key = `${normalizeTier(row.tier ?? "")}:${normalizeRegion(row.regionScope)}`;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
    inventory,
  };
  console.log(JSON.stringify(report, null, 2));

  const incompleteTiers = (["rn", "rpn", "np"] as const).filter(
    (tier) => coverage[tier].missing.length > 0,
  );

  if (createMissing) {
    if (incompleteTiers.length === 0) {
      console.log(JSON.stringify({ createdMissingRows: 0, note: "coverage already complete" }, null, 2));
      return;
    }
    await createMissingRows(inventory, coverage);
    inventory = await readInventory();
    ({ expectedByKey, coverage } = buildCoverage(inventory));
    const stillIncomplete = (["rn", "rpn", "np"] as const).filter(
      (tier) => coverage[tier].missing.length > 0,
    );
    if (stillIncomplete.length > 0) {
      throw new Error(`CARDIOVASCULAR_CREATE_MISSING_VERIFY_FAILED: ${stillIncomplete.join(",")}`);
    }
    return;
  }

  if (incompleteTiers.length > 0) {
    throw new Error(
      `CARDIOVASCULAR_TIER_COVERAGE_INCOMPLETE: ${incompleteTiers
        .map((tier) => `${tier} missing ${coverage[tier].missing.length}`)
        .join("; ")}. Run --create-missing after reviewing the dry-run inventory.`,
    );
  }

  if (dryRun) return;

  const verification: Array<{
    id: string;
    slug: string;
    title: string;
    tier: CardiovascularTier;
    region: CardiovascularRegion;
    versionKey: string;
  }> = [];

  for (const row of inventory) {
    const canonicalTitle = expectedByKey.get(normalizeTitle(row.title));
    if (!canonicalTitle) throw new Error(`CARDIOVASCULAR_TITLE_LOOKUP_FAILED: ${row.title}`);
    if (!row.tier) throw new Error(`CARDIOVASCULAR_ROW_TIER_MISSING: ${row.id}`);

    const tier = normalizeTier(row.tier);
    const region = normalizeRegion(row.regionScope);
    const lesson = cardiovascularScopedLessons[canonicalTitle]?.[tier]?.[region];
    if (!lesson) {
      throw new Error(`CARDIOVASCULAR_SCOPED_LESSON_MISSING: ${canonicalTitle}/${tier}/${region}`);
    }

    await prisma.contentItem.update({
      where: { id: row.id },
      data: {
        title: canonicalTitle,
        summary: lesson.summary,
        category: "Cardiovascular",
        bodySystem: "Cardiovascular",
        content: lesson.sections as unknown as Prisma.InputJsonValue,
        versionKey: lesson.versionKey,
        updatedByAi: true,
        sourceVersion: { increment: 1 },
      },
    });

    const verified = await prisma.contentItem.findUnique({
      where: { id: row.id },
      select: { id: true, slug: true, title: true, tier: true, regionScope: true, versionKey: true, content: true },
    });
    if (!verified || verified.versionKey !== lesson.versionKey) {
      throw new Error(`CARDIOVASCULAR_POSTWRITE_VERSION_VERIFY_FAILED: ${row.id}`);
    }
    validateStoredFlow(canonicalTitle, tier, region, verified.content);

    verification.push({
      id: verified.id,
      slug: verified.slug,
      title: canonicalTitle,
      tier,
      region,
      versionKey: lesson.versionKey,
    });
  }

  console.log(JSON.stringify({ updatedRows: verification.length, verifiedRows: verification.length, verification }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
