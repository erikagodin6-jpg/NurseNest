/**
 * Synchronous sitemap URL list for `/sitemap.xml`. No Prisma, no filesystem i18n, no network.
 * Used only by `src/app/sitemap.xml/route.ts` so Google always gets a fast 200.
 */

import { CORE_HOSTED_MARKETING_LOCALES } from "@/lib/i18n/marketing-locale-policy";
import { getAllProgrammaticSlugs } from "@/lib/seo/programmatic-registry";
import { getAllToolSlugs } from "@/lib/tools/tool-registry";

const FALLBACK_ORIGIN = "https://www.nursenest.ca";

export function resolveSitemapOrigin(): string {
  try {
    const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();
    if (!raw) return FALLBACK_ORIGIN;
    const u = raw.replace(/\/$/, "");
    return u.length > 0 ? u : FALLBACK_ORIGIN;
  } catch {
    return FALLBACK_ORIGIN;
  }
}

/** Minimal valid sitemap (single home URL). */
export function minimalSitemapXml(): string {
  const base = resolveSitemapOrigin();
  const home = base.endsWith("/") ? base.slice(0, -1) : base;
  const loc = escapeXml(`${home}/`);
  const lastmod = safeLastmodDate();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;
}

function safeLastmodDate(): string {
  try {
    return new Date().toISOString().slice(0, 10);
  } catch {
    return "1970-01-01";
  }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Build full sitemap XML. Any failure → caller should use `minimalSitemapXml`.
 * Fully synchronous: no await, no DB.
 */
export function buildFullSitemapXml(): string {
  const base = resolveSitemapOrigin();
  const origin = base.endsWith("/") ? base.slice(0, -1) : base;
  const lastmod = safeLastmodDate();
  const urls: string[] = [];

  const add = (path: string) => {
    const p = path.startsWith("/") ? path : `/${path}`;
    urls.push(`${origin}${p}`);
  };

  try {
    add("/");
    add("/pricing");
    add("/for-institutions");
    add("/blog");
    add("/tools");
    add("/pre-nursing");

    for (const slug of getAllToolSlugs()) {
      add(`/tools/${slug}`);
    }

    for (const loc of CORE_HOSTED_MARKETING_LOCALES) {
      add(`/${loc}`);
      add(`/${loc}/pricing`);
      add(`/${loc}/for-institutions`);
      add(`/${loc}/tools`);
      for (const slug of getAllToolSlugs()) {
        add(`/${loc}/tools/${slug}`);
      }
    }

    const slugs = getAllProgrammaticSlugs();
    for (const slug of slugs) {
      add(`/${slug}`);
    }
    for (const loc of CORE_HOSTED_MARKETING_LOCALES) {
      for (const slug of slugs) {
        add(`/${loc}/${slug}`);
      }
    }
  } catch {
    return minimalSitemapXml();
  }

  const body = urls
    .map((u) => {
      const loc = escapeXml(u);
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}
