/**
 * DigitalOcean Spaces / public CDN URL resolution.
 *
 * Set `NEXT_PUBLIC_MARKETING_CDN_BASE` to your public asset origin (e.g. a CDN in front of Spaces,
 * or the Spaces origin once public read is enabled). All asset URLs from `marketing-assets.generated.ts`
 * are rewritten to this base when present.
 *
 * Private buckets: set `NEXT_PUBLIC_MARKETING_SCREENSHOT_PROXY` to `1` (default) so `/screenshots/...`
 * URLs are served via `GET /api/marketing-screenshot/screenshots/...` using `SPACES_*` at runtime.
 * Set to `0` to use direct public URLs only (when the bucket or CDN allows anonymous GET).
 */
import { MARKETING_CDN_BASE } from "@/lib/marketing-assets.generated";

const KNOWN_ORIGINS = [
  "https://nursenest-images.tor1.digitaloceanspaces.com",
  "https://www.nursenest.ca",
  "https://nursenest.ca",
] as const;

const SCREENSHOT_FILE = /^[\w.-]+\.(webp|png|jpe?g|svg)$/i;

const PROXY_PREFIX = "/api/marketing-screenshot/";

export function getMarketingCdnBase(): string {
  const raw = typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_MARKETING_CDN_BASE || "").trim() : "";
  return raw.replace(/\/$/, "") || MARKETING_CDN_BASE;
}

function shouldUseScreenshotProxy(): boolean {
  const v = typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_MARKETING_SCREENSHOT_PROXY || "").trim().toLowerCase() : "";
  return v !== "0" && v !== "false" && v !== "no";
}

function proxyPathForScreenshotsPath(rest: string): string | null {
  if (!SCREENSHOT_FILE.test(rest)) return null;
  return `${PROXY_PREFIX}screenshots/${rest}`;
}

function rewriteScreenshotUrlToProxy(url: string): string | null {
  if (!shouldUseScreenshotProxy()) return null;

  if (url.startsWith("/screenshots/")) {
    const rest = url.slice("/screenshots/".length);
    return proxyPathForScreenshotsPath(rest);
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (!parsed.pathname.startsWith("/screenshots/")) return null;
  const rest = parsed.pathname.slice("/screenshots/".length);
  if (!proxyPathForScreenshotsPath(rest)) return null;

  const origin = `${parsed.protocol}//${parsed.host}`;
  const cdnBase = getMarketingCdnBase();
  const allowedHosts = new Set<string>([...KNOWN_ORIGINS, cdnBase]);
  if (!allowedHosts.has(origin)) return null;

  return proxyPathForScreenshotsPath(rest);
}

/** Absolute URL for a single marketing image (hero, logo, lesson thumbnails). */
export function marketingAssetUrl(url: string): string {
  const base =
    typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_MARKETING_CDN_BASE || "").trim().replace(/\/$/, "") : "";
  let resolved = url;
  if (base) {
    for (const o of KNOWN_ORIGINS) {
      if (url.startsWith(o)) {
        resolved = base + url.slice(o.length);
        break;
      }
    }
  }
  return rewriteScreenshotUrlToProxy(resolved) ?? resolved;
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
