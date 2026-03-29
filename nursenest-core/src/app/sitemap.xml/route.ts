import { buildFullSitemapXml, minimalSitemapXml } from "@/lib/seo/sitemap-static-xml";

/**
 * Google-safe sitemap: always 200, no Prisma/i18n bundles, explicit XML content-type.
 * `app/sitemap.ts` is intentionally not used (would not allow these headers).
 */
export const runtime = "nodejs";
/** Fresh `lastmod` per request; generation stays fully synchronous (no DB). */
export const dynamic = "force-dynamic";

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export async function GET() {
  try {
    const xml = buildFullSitemapXml();
    if (!xml || typeof xml !== "string" || xml.length < 50) {
      return new Response(minimalSitemapXml(), { status: 200, headers: XML_HEADERS });
    }
    return new Response(xml, { status: 200, headers: XML_HEADERS });
  } catch {
    try {
      return new Response(minimalSitemapXml(), { status: 200, headers: XML_HEADERS });
    } catch {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.nursenest.ca/</loc></url></urlset>`,
        { status: 200, headers: XML_HEADERS },
      );
    }
  }
}
