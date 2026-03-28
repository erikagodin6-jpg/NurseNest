import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { CORE_HOSTED_MARKETING_LOCALES } from "@/lib/i18n/marketing-locale-policy";
import { getAllProgrammaticSlugs } from "@/lib/seo/programmatic-registry";
import { MARKETING_SITE_ORIGIN } from "@/lib/seo/site-origin";
import { getAllToolSlugs } from "@/lib/tools/tool-registry";

const base = MARKETING_SITE_ORIGIN;

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[0]["changeFrequency"]>;

/**
 * Single sitemap at `/sitemap.xml` (split sitemaps omitted: production was serving 404 on the index
 * while `/sitemap/0.xml` worked; robots must match a working URL for Google Search Console).
 * Excludes: /app/*, /admin/*, auth pages (noindex), /api/*, draft posts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const corePaths: { path: string; priority: number; changeFrequency: ChangeFreq }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/pricing", priority: 0.85, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
    { path: "/tools", priority: 0.85, changeFrequency: "weekly" },
  ];
  const entries: MetadataRoute.Sitemap = corePaths.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  for (const slug of getAllToolSlugs()) {
    entries.push({
      url: `${base}/tools/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.78,
    });
  }

  let blogPosts: { slug: string; updatedAt: Date }[] = [];
  try {
    blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    /* e.g. migrate not applied or no DATABASE_URL at build */
  }
  for (const p of blogPosts) {
    entries.push({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  try {
    const tagRows = await prisma.blogPost.findMany({
      where: { published: true },
      select: { tags: true },
    });
    const tagSet = new Set<string>();
    for (const r of tagRows) {
      for (const t of r.tags) {
        const s = t.trim();
        if (s) tagSet.add(s);
      }
    }
    for (const t of tagSet) {
      entries.push({
        url: `${base}/blog/tag/${encodeURIComponent(t)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.55,
      });
    }
  } catch {
    /* DB unavailable at build */
  }

  for (const loc of CORE_HOSTED_MARKETING_LOCALES) {
    entries.push(
      {
        url: `${base}/${loc}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${base}/${loc}/pricing`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      },
      {
        url: `${base}/${loc}/tools`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
    );
    for (const slug of getAllToolSlugs()) {
      entries.push({
        url: `${base}/${loc}/tools/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.72,
      });
    }
  }

  const slugs = getAllProgrammaticSlugs();
  for (const slug of slugs) {
    entries.push({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }
  for (const loc of CORE_HOSTED_MARKETING_LOCALES) {
    for (const slug of slugs) {
      entries.push({
        url: `${base}/${loc}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }
  }

  return entries;
}
