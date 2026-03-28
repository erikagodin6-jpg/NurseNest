/**
 * DigitalOcean Spaces / public CDN URL resolution.
 *
 * Set `NEXT_PUBLIC_MARKETING_CDN_BASE` to your public asset origin (e.g. a CDN in front of Spaces,
 * or the Spaces origin once public read is enabled). All asset URLs from `marketing-assets.generated.ts`
 * are rewritten to this base when present.
 */
import { MARKETING_CDN_BASE } from "@/lib/marketing-assets.generated";

const KNOWN_ORIGINS = [
  "https://nursenest-images.tor1.digitaloceanspaces.com",
  "https://www.nursenest.ca",
  "https://nursenest.ca",
] as const;

export function getMarketingCdnBase(): string {
  const raw = typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_MARKETING_CDN_BASE || "").trim() : "";
  return raw.replace(/\/$/, "") || MARKETING_CDN_BASE;
}

/** Absolute URL for a single marketing image (hero, logo, lesson thumbnails). */
export function marketingAssetUrl(url: string): string {
  const base = typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_MARKETING_CDN_BASE || "").trim().replace(/\/$/, "") : "";
  if (!base) return url;
  for (const o of KNOWN_ORIGINS) {
    if (url.startsWith(o)) return base + url.slice(o.length);
  }
  return url;
}

/** Rewrites each URL in srcset descriptors. */
export function marketingAssetSrcSet(srcSet: string | null | undefined): string | undefined {
  if (!srcSet) return undefined;
  return srcSet
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      const spaceIdx = trimmed.lastIndexOf(" ");
      if (spaceIdx <= 0) return marketingAssetUrl(trimmed);
      const url = trimmed.slice(0, spaceIdx).trim();
      const desc = trimmed.slice(spaceIdx + 1).trim();
      return `${marketingAssetUrl(url)} ${desc}`;
    })
    .join(", ");
}
