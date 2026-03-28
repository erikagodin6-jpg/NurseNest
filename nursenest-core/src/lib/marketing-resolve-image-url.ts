import { MARKETING_CDN_BASE } from "./marketing-assets.generated";

const PROXY_PREFIX = "/api/marketing-assets";

function isGoogleCloudStoragePublicUrl(urlString: string): boolean {
  try {
    const u = new URL(urlString);
    return u.hostname === "storage.googleapis.com";
  } catch {
    return false;
  }
}

/** `gs://` and similar are never valid in the browser — never pass them to `<img src>`. */
export function isForbiddenBrowserImageScheme(url: string): boolean {
  const s = url.trim().toLowerCase();
  return (
    s.startsWith("gs://") ||
    s.startsWith("gs:") ||
    s.startsWith("blob:") ||
    s.startsWith("chrome-extension:") ||
    s.startsWith("file:")
  );
}

/**
 * When true (default), hero and marketing images use same-origin `/api/marketing-assets/...`
 * so the server can stream objects from DigitalOcean Spaces with SPACES_KEY/SPACES_SECRET.
 * The public `*.digitaloceanspaces.com` host often returns 403 for anonymous GET until the bucket is public.
 * Set to `"false"` only if the Space is fully public and you want browsers to load CDN URLs directly.
 *
 * Google Cloud Storage public URLs (`storage.googleapis.com/...`) are never rewritten to the proxy — that API only serves Spaces keys.
 */
export function marketingImageUsesProxy(): boolean {
  return process.env.NEXT_PUBLIC_MARKETING_USE_SPACES_PROXY !== "false";
}

/** Same-origin path for S3 key `screenshots/foo.webp` → `/api/marketing-assets/screenshots/foo.webp` */
export function marketingProxyPathForKey(objectKey: string): string {
  const k = objectKey.replace(/^\/+/, "");
  const enc = k
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${PROXY_PREFIX}/${enc}`;
}

/** Rewrite an absolute Spaces/CDN URL to the local proxy path when proxy mode is on. */
export function resolveMarketingAbsoluteUrl(absoluteUrl: string): string {
  if (isForbiddenBrowserImageScheme(absoluteUrl)) {
    return "/marketing/hero-fallback.svg";
  }
  if (!marketingImageUsesProxy()) return absoluteUrl;
  if (isGoogleCloudStoragePublicUrl(absoluteUrl)) return absoluteUrl;
  try {
    const u = new URL(absoluteUrl);
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      return "/marketing/hero-fallback.svg";
    }
    return `${PROXY_PREFIX}${u.pathname}`;
  } catch {
    return "/marketing/hero-fallback.svg";
  }
}

/** Rewrite responsive srcSet (space-separated url + descriptor per entry). */
export function resolveMarketingSrcSet(srcSet: string | undefined | null): string | undefined {
  if (!srcSet || !marketingImageUsesProxy()) return srcSet ?? undefined;
  return srcSet
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      const spaceIdx = trimmed.lastIndexOf(" ");
      if (spaceIdx === -1) {
        if (isGoogleCloudStoragePublicUrl(trimmed)) return trimmed;
        return resolveMarketingAbsoluteUrl(trimmed);
      }
      const urlPart = trimmed.slice(0, spaceIdx);
      const descriptor = trimmed.slice(spaceIdx + 1);
      if (isGoogleCloudStoragePublicUrl(urlPart)) return `${urlPart} ${descriptor}`;
      return `${resolveMarketingAbsoluteUrl(urlPart)} ${descriptor}`;
    })
    .join(", ");
}

export function getMarketingCdnBaseForDirectFallback(): string {
  return (
    process.env.NEXT_PUBLIC_MARKETING_CDN_BASE?.replace(/\/$/, "") ?? MARKETING_CDN_BASE.replace(/\/$/, "")
  );
}
