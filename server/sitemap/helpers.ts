import { getIndexableLocales, getHreflangCode } from "../translation-audit";

export const SITEMAP_SPLIT_LIMIT = 5000;
export const SITEMAP_CACHE_TTL = 3600_000;

export function getSiteBase(): string {
  return "https://www.nursenest.ca";
}

export function getAlliedBase(): string {
  return "https://allied.nursenest.ca";
}

export function getNewGradBase(): string {
  return "https://newgrad.nursenest.ca";
}

export function todayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function toLastmod(date: any): string {
  if (!date) return todayDate();
  return new Date(date).toISOString().split("T")[0];
}

export function xmlHeader(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>`;
}

export function wrapUrlset(urls: string[]): string {
  return `${xmlHeader()}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>`;
}

export function wrapSitemapIndex(entries: string[]): string {
  return `${xmlHeader()}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</sitemapindex>`;
}

export function sitemapIndexEntry(loc: string, lastmod: string): string {
  return `<sitemap><loc>${loc}</loc><lastmod>${lastmod}</lastmod></sitemap>`;
}

export function simpleUrl(loc: string, lastmod: string, changefreq = "weekly", priority = "0.7"): string {
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export function localizedUrl(base: string, path: string, priority: string, changefreq: string, locales: string[], lastmod?: string): string {
  const lines: string[] = [];
  for (const locale of locales) {
    const loc = `${base}/${locale}${path === "/" ? "" : path}`;
    lines.push(`<url>`);
    lines.push(`<loc>${loc}</loc>`);
    lines.push(`<priority>${priority}</priority>`);
    lines.push(`<changefreq>${changefreq}</changefreq>`);
    if (lastmod) lines.push(`<lastmod>${lastmod}</lastmod>`);
    for (const alt of locales) {
      const hreflang = getHreflangCode(alt);
      const altHref = `${base}/${alt}${path === "/" ? "" : path}`;
      lines.push(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${altHref}"/>`);
    }
    lines.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${base}/en${path === "/" ? "" : path}"/>`);
    lines.push(`</url>`);
  }
  return lines.join("\n");
}

export function splitIntoChunks<T>(items: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  if (chunks.length === 0) chunks.push([]);
  return chunks;
}

export { getIndexableLocales, getHreflangCode };
