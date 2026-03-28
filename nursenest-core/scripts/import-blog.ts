/**
 * Import blog posts into BlogPost (Prisma).
 *
 * Sources:
 * 1. Static paramedic articles from monolith `client/src/allied/data/paramedic-blog-data.ts`
 * 2. Optional JSON export: `content/blog-legacy-export.json` (from legacy `content_items` query)
 *
 * Usage: `npx tsx scripts/import-blog.ts`
 * Env: DATABASE_URL
 *
 * Does not modify Lesson or Question models.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import { PARAMEDIC_BLOG_ARTICLES } from "../../client/src/allied/data/paramedic-blog-data";
import { excerptFromParamedic, paramedicArticleToHtml } from "../src/lib/blog/serialize-paramedic";
import { legacyContentBlocksToHtml, normalizeBlogAssetUrls } from "../src/lib/blog/serialize-content";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

type LegacyExportRow = {
  slug: string;
  title: string;
  summary?: string | null;
  seo_description?: string | null;
  category?: string | null;
  tags?: string[] | null;
  content?: unknown;
  status?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  cover_image?: string | null;
};

function readLegacyJson(): LegacyExportRow[] {
  const p = path.join(__dirname, "../content/blog-legacy-export.json");
  if (!fs.existsSync(p)) return [];
  const raw = JSON.parse(fs.readFileSync(p, "utf8"));
  return Array.isArray(raw) ? raw : [];
}

/** Count <img> and non-absolute src (before or after migration fixes). */
function scanImageRefs(html: string): { imgTags: number; nonAbsoluteSrc: number } {
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  let nonAbsoluteSrc = 0;
  for (const tag of imgs) {
    const m = tag.match(/\bsrc=["']([^"']+)["']/i);
    const src = m?.[1]?.trim() ?? "";
    if (src && !src.startsWith("http") && !src.startsWith("data:")) nonAbsoluteSrc += 1;
  }
  return { imgTags: imgs.length, nonAbsoluteSrc };
}

async function main() {
  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  const legacyRows = readLegacyJson();
  let legacyPublishedInFile = 0;
  let legacyDraftInFile = 0;
  for (const row of legacyRows) {
    const st = (row.status || "").toLowerCase();
    if (st === "published") legacyPublishedInFile += 1;
    else if (st === "draft") legacyDraftInFile += 1;
  }

  for (const article of PARAMEDIC_BLOG_ARTICLES) {
    const bodyRaw = paramedicArticleToHtml(article);
    const body = normalizeBlogAssetUrls(bodyRaw);
    const excerpt = excerptFromParamedic(article).slice(0, 2000);
    const tags = [...(article.keywords ?? "").split(",").map((s) => s.trim()).filter(Boolean), "allied-health", "paramedic"];
    const created = new Date(article.publishedDate);
    if (!body.trim()) {
      errors.push(`paramedic:${article.slug} empty body`);
      continue;
    }
    const existing = await prisma.blogPost.findUnique({ where: { slug: article.slug } });
    if (existing) {
      skipped += 1;
      continue;
    }
    await prisma.blogPost.create({
      data: {
        slug: article.slug,
        title: article.title,
        excerpt,
        body,
        coverImage: null,
        tags,
        category: article.category || "allied-health",
        published: true,
        legacySource: "paramedic-static",
        createdAt: created,
      },
    });
    imported += 1;
  }

  for (const row of legacyRows) {
    if (!row.slug || !row.title) {
      errors.push("legacy: missing slug or title");
      continue;
    }
    const htmlRaw = legacyContentBlocksToHtml(row.content);
    const body = normalizeBlogAssetUrls(htmlRaw);
    const excerpt = (row.seo_description || row.summary || "").trim().slice(0, 2000) || "(No excerpt)";
    const published = row.status === "published" && body.trim().length > 0;
    if (!published && body.trim().length === 0) {
      errors.push(`legacy:${row.slug} skipped (empty body)`);
      continue;
    }
    const existing = await prisma.blogPost.findUnique({ where: { slug: row.slug } });
    if (existing) {
      skipped += 1;
      continue;
    }
    await prisma.blogPost.create({
      data: {
        slug: row.slug,
        title: row.title,
        excerpt,
        body: body || "<p></p>",
        coverImage: row.cover_image || null,
        tags: row.tags ?? [],
        category: row.category ?? null,
        published,
        legacySource: "legacy-json",
        createdAt: row.created_at ? new Date(row.created_at) : row.published_at ? new Date(row.published_at) : new Date(),
      },
    });
    imported += 1;
  }

  const paramedicSlugs = PARAMEDIC_BLOG_ARTICLES.map((a) => a.slug);
  const totalLegacySourcesFound =
    PARAMEDIC_BLOG_ARTICLES.length + legacyRows.length;

  let imageReport = { totalImgTagsInBodies: 0, nonAbsoluteAfterImport: 0, coverImagesHttp: 0, coverImagesRelative: 0 };
  try {
    const all = await prisma.blogPost.findMany({ select: { body: true, coverImage: true } });
    for (const p of all) {
      const s = scanImageRefs(p.body);
      imageReport.totalImgTagsInBodies += s.imgTags;
      imageReport.nonAbsoluteAfterImport += s.nonAbsoluteSrc;
      if (p.coverImage) {
        if (p.coverImage.startsWith("http")) imageReport.coverImagesHttp += 1;
        else imageReport.coverImagesRelative += 1;
      }
    }
  } catch {
    /* optional post-import scan */
  }

  console.log(
    JSON.stringify(
      {
        imported,
        skipped,
        errors,
        totalLegacySourcesFound,
        paramedicSourceCount: paramedicSlugs.length,
        legacyJsonRows: legacyRows.length,
        legacyPublishedInExportFile: legacyPublishedInFile,
        legacyDraftInExportFile: legacyDraftInFile,
        remainingNotInCore:
          "Export content_items (type blog/article/blog-post) and allied tables into blog-legacy-export.json or separate pipelines; not auto-scanned here.",
        imageReport,
        note:
          "Monolith DB posts require SQL export into content/blog-legacy-export.json. See script header for shape.",
      },
      null,
      2,
    ),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
