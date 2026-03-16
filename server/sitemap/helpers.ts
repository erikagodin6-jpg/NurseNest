import { getIndexableLocales, getHreflangCode } from "../translation-audit";
import { getIndexableLocalesForPage, buildCanonicalUrl, SITE_BASE } from "@shared/seo-utils";

export const SITEMAP_SPLIT_LIMIT = 5000;
export const SITEMAP_CACHE_TTL = 3600_000;

const SITEMAP_SLUG_MAP: Record<string, Record<string, string>> = {
  "zh-tw": {
    "/pricing": "/jiage",
    "/flashcards": "/shankakapian",
    "/lessons": "/kecheng",
    "/mock-exams": "/moni-kaoshi",
    "/glossary": "/shuyu",
    "/about": "/guanyu",
    "/contact": "/lianxi",
    "/faq": "/changjianwenti",
    "/blog": "/boke",
  },
  fr: {
    "/pricing": "/tarifs",
    "/flashcards": "/cartes-memoire",
    "/lessons": "/lecons",
    "/mock-exams": "/examens-pratiques",
    "/glossary": "/glossaire",
    "/about": "/a-propos",
    "/contact": "/nous-joindre",
    "/faq": "/foire-aux-questions",
    "/blog": "/blogue",
  },
  es: {
    "/pricing": "/precios",
    "/flashcards": "/tarjetas-de-memoria",
    "/lessons": "/lecciones",
    "/mock-exams": "/examenes-de-practica",
    "/glossary": "/glosario",
    "/about": "/acerca-de",
    "/contact": "/contacto",
    "/faq": "/preguntas-frecuentes",
    "/blog": "/blog",
  },
  pt: {
    "/pricing": "/precos",
    "/flashcards": "/cartoes-de-estudo",
    "/lessons": "/licoes",
    "/mock-exams": "/simulados",
    "/glossary": "/glossario",
    "/about": "/sobre",
    "/contact": "/contato",
    "/faq": "/perguntas-frequentes",
    "/blog": "/blog",
  },
  th: {
    "/pricing": "/rakha",
    "/flashcards": "/bat-kham-sap",
    "/lessons": "/bot-rian",
    "/mock-exams": "/khaw-sop-chamlong",
    "/glossary": "/sap-banyat",
    "/about": "/kiao-kap-rao",
    "/contact": "/tidtaw",
    "/faq": "/kham-tham-thi-phop-boi",
    "/blog": "/blog",
  },
  tr: {
    "/pricing": "/fiyatlandirma",
    "/flashcards": "/bilgi-kartlari",
    "/lessons": "/dersler",
    "/mock-exams": "/deneme-sinavlari",
    "/glossary": "/sozluk",
    "/about": "/hakkimizda",
    "/contact": "/iletisim",
    "/faq": "/sikca-sorulan-sorular",
    "/blog": "/blog",
  },
  id: {
    "/pricing": "/harga",
    "/flashcards": "/kartu-flash",
    "/lessons": "/pelajaran",
    "/mock-exams": "/ujian-simulasi",
    "/glossary": "/glosarium",
    "/about": "/tentang",
    "/contact": "/kontak",
    "/faq": "/pertanyaan-umum",
    "/blog": "/blog",
  },
};

function applySlugMapping(path: string, locale: string): string {
  const mapping = SITEMAP_SLUG_MAP[locale];
  if (!mapping) return path;
  for (const [enSlug, localizedSlug] of Object.entries(mapping)) {
    if (path === enSlug || path.startsWith(enSlug + "/") || path.startsWith(enSlug + "?") || path.startsWith(enSlug + "#")) {
      return localizedSlug + path.slice(enSlug.length);
    }
  }
  return path;
}

export function getSiteBase(): string {
  return "https://www.nursenest.ca";
}

export function getAlliedBase(): string {
  return "https://www.nursenest.ca/allied-health";
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
  const hreflangLocales = getIndexableLocalesForPage(path, locales);
  for (const locale of locales) {
    const mappedPath = applySlugMapping(path, locale);
    const loc = `${base}/${locale}${mappedPath === "/" ? "" : mappedPath}`;
    lines.push(`<url>`);
    lines.push(`<loc>${loc}</loc>`);
    lines.push(`<priority>${priority}</priority>`);
    lines.push(`<changefreq>${changefreq}</changefreq>`);
    if (lastmod) lines.push(`<lastmod>${lastmod}</lastmod>`);
    for (const alt of hreflangLocales) {
      const altMapped = applySlugMapping(path, alt);
      const hreflang = getHreflangCode(alt);
      const altHref = `${base}/${alt}${altMapped === "/" ? "" : altMapped}`;
      lines.push(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${altHref}"/>`);
    }
    const enMapped = applySlugMapping(path, "en");
    lines.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${base}/en${enMapped === "/" ? "" : enMapped}"/>`);
    lines.push(`</url>`);
  }
  return lines.join("\n");
}

export function singleLocaleUrl(base: string, path: string, locale: string, allLocales: string[], priority: string, changefreq: string, lastmod?: string): string {
  const mappedPath = applySlugMapping(path, locale);
  const loc = `${base}/${locale}${mappedPath === "/" ? "" : mappedPath}`;
  const hreflangLocales = getIndexableLocalesForPage(path, allLocales);
  const lines: string[] = [];
  lines.push(`<url>`);
  lines.push(`<loc>${loc}</loc>`);
  lines.push(`<priority>${priority}</priority>`);
  lines.push(`<changefreq>${changefreq}</changefreq>`);
  if (lastmod) lines.push(`<lastmod>${lastmod}</lastmod>`);
  for (const alt of hreflangLocales) {
    const altMapped = applySlugMapping(path, alt);
    const hreflang = getHreflangCode(alt);
    const altHref = `${base}/${alt}${altMapped === "/" ? "" : altMapped}`;
    lines.push(`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${altHref}"/>`);
  }
  const enMapped = applySlugMapping(path, "en");
  lines.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${base}/en${enMapped === "/" ? "" : enMapped}"/>`);
  lines.push(`</url>`);
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
