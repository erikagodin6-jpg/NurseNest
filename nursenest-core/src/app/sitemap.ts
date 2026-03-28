import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { CORE_HOSTED_MARKETING_LOCALES } from "@/lib/i18n/marketing-locale-policy";
import { getAllProgrammaticSlugs } from "@/lib/seo/programmatic-registry";
import { MARKETING_SITE_ORIGIN } from "@/lib/seo/site-origin";
import { getAllToolSlugs } from "@/lib/tools/tool-registry";

const base = MARKETING_SITE_ORIGIN;

/**
 * Split sitemaps for scale: (0) core marketing + blog + tools, (1) programmatic SEO + localized mirrors.
 * Excludes: /app/*, /admin/*, auth pages (use noindex), /api/*, draft content.
 */
export async function generateSitemaps(): Promise<{ id: number }[]> {
  return [{ id: 0 }, { id: 1 }];
}

export default async function sitemap(props: { id: Promise<number> }): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const now = new Date();

  if (id === 0) {
    /** Canonical public marketing (default locale = no /en prefix). Login/signup omitted — use noindex, not sitemap. */
    const corePaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
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
    return entries;
  }

  if (id === 1) {
    const slugs = getAllProgrammaticSlugs();
    const entries: MetadataRoute.Sitemap = [];
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

  return [];
}
