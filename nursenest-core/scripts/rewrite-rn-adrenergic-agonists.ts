/**
 * Replace the generic learner-facing RN Adrenergic Agonists lesson with the
 * curated pharmacology lesson in src/lib/content/curated-lessons.
 *
 * Run from nursenest-core:
 *   npx tsx scripts/rewrite-rn-adrenergic-agonists.ts --dry-run
 *   npx tsx scripts/rewrite-rn-adrenergic-agonists.ts
 *
 * Env: DATABASE_URL
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
import { adrenergicAgonistsRnLesson } from "../src/lib/content/curated-lessons/adrenergic-agonists-rn";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "../.env") });
loadEnv({ path: path.join(__dirname, "../../.env") });

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

const targetWhere: Prisma.ContentItemWhereInput = {
  type: "lesson",
  tier: "rn",
  title: {
    equals: adrenergicAgonistsRnLesson.title,
    mode: "insensitive",
  },
  OR: [
    { regionScope: null },
    { regionScope: "BOTH" },
    { regionScope: "CA_ONLY" },
  ],
};

async function main() {
  const candidates = await prisma.contentItem.findMany({
    where: targetWhere,
    select: {
      id: true,
      slug: true,
      title: true,
      tier: true,
      status: true,
      regionScope: true,
      versionKey: true,
      sourceVersion: true,
      updatedAt: true,
    },
    orderBy: [{ updatedAt: "desc" }, { slug: "asc" }],
  });

  console.log(
    JSON.stringify(
      {
        dryRun,
        target: {
          title: adrenergicAgonistsRnLesson.title,
          tier: "rn",
          learnerRegion: "Canada-accessible (CA_ONLY, BOTH, or legacy null)",
          versionKey: adrenergicAgonistsRnLesson.versionKey,
        },
        candidates,
      },
      null,
      2,
    ),
  );

  if (candidates.length === 0) {
    throw new Error(
      "RN_ADRENERGIC_AGONISTS_NOT_FOUND: no Canada-accessible content_items lesson matched the target title/tier",
    );
  }

  if (dryRun) return;

  const content = adrenergicAgonistsRnLesson.sections as unknown as Prisma.InputJsonValue;

  const updated = await prisma.contentItem.updateMany({
    where: targetWhere,
    data: {
      summary: adrenergicAgonistsRnLesson.summary,
      category: "Pharmacology",
      bodySystem: "Pharmacology",
      content,
      versionKey: adrenergicAgonistsRnLesson.versionKey,
      updatedByAi: true,
      sourceVersion: { increment: 1 },
    },
  });

  if (updated.count !== candidates.length) {
    throw new Error(
      `RN_ADRENERGIC_AGONISTS_UPDATE_COUNT_MISMATCH: expected ${candidates.length}, updated ${updated.count}`,
    );
  }

  const verified = await prisma.contentItem.findMany({
    where: targetWhere,
    select: {
      id: true,
      slug: true,
      title: true,
      tier: true,
      status: true,
      regionScope: true,
      versionKey: true,
      sourceVersion: true,
      content: true,
      updatedAt: true,
    },
    orderBy: [{ updatedAt: "desc" }, { slug: "asc" }],
  });

  const invalid = verified.filter((row) => {
    const sections = Array.isArray(row.content) ? row.content : [];
    const titles = sections
      .filter((section): section is Record<string, unknown> => Boolean(section && typeof section === "object"))
      .map((section) => String(section.sectionTitle ?? ""));

    return (
      row.versionKey !== adrenergicAgonistsRnLesson.versionKey ||
      !titles.includes("Adrenergic Receptor Map") ||
      !titles.includes("Major Adrenergic Agonists: Know the Difference") ||
      !titles.includes("IV Vasopressor and Extravasation Safety") ||
      !titles.includes("Common Exam Traps")
    );
  });

  if (invalid.length > 0) {
    throw new Error(
      `RN_ADRENERGIC_AGONISTS_POSTWRITE_VERIFY_FAILED: ${invalid.map((row) => row.slug).join(", ")}`,
    );
  }

  console.log(
    JSON.stringify(
      {
        updated: updated.count,
        verified: verified.map((row) => ({
          id: row.id,
          slug: row.slug,
          status: row.status,
          regionScope: row.regionScope,
          versionKey: row.versionKey,
          sourceVersion: row.sourceVersion,
          sectionCount: Array.isArray(row.content) ? row.content.length : 0,
          updatedAt: row.updatedAt,
        })),
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
