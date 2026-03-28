import type { MetadataRoute } from "next";
import { CORE_HOSTED_MARKETING_LOCALES } from "@/lib/i18n/marketing-locale-policy";
import { isClinicalToolsSurfaceEnabled } from "@/lib/feature-flags/restored-modules";
import { toolsForSitemap } from "@/lib/platform-tools/tool-registry";
import { isToolSlugEnabled } from "@/lib/platform-tools/tool-flags";
import { getAllProgrammaticSlugs } from "@/lib/seo/programmatic-registry";
import { MARKETING_SITE_ORIGIN } from "@/lib/seo/site-origin";

const base = MARKETING_SITE_ORIGIN;

/**
 * Split sitemaps for scale: (0) core marketing surfaces, (1) programmatic SEO + localized mirrors.
 * Add more IDs when lesson/blog URLs are generated from the database (keep under 50k URLs per file).
 */
export async function generateSitemaps(): Promise<{ id: number }[]> {
  return [{ id: 0 }, { id: 1 }];
}

export default async function sitemap(props: { id: Promise<number> }): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const now = new Date();

  if (id === 0) {
    const toolPaths = isClinicalToolsSurfaceEnabled()
      ? [
          "/tools",
          ...toolsForSitemap()
            .filter((t) => isToolSlugEnabled(t.slug))
            .map((t) => `/tools/${t.slug}`),
        ]
      : [];
    const paths = ["/", "/pricing", "/login", "/signup", ...toolPaths];
    const entries: MetadataRoute.Sitemap = paths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1 : path.startsWith("/tools") ? 0.72 : 0.8,
    }));
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
          url: `${base}/${loc}/login`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.5,
        },
        {
          url: `${base}/${loc}/signup`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
        },
      );
      for (const p of toolPaths) {
        entries.push({
          url: `${base}/${loc}${p}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.68,
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
