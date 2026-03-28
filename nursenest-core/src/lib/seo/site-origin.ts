/** Canonical marketing origin for SEO (sitemaps, JSON-LD, metadata). */
export const MARKETING_SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "https://www.nursenest.ca"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${MARKETING_SITE_ORIGIN}${p}`;
}
