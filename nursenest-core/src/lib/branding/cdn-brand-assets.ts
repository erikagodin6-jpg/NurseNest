/** Public CDN assets on DigitalOcean Spaces (cache-bust when replacing files). */
export const NURSENEST_IMAGES_CDN_BASE =
  "https://nursenest-images.tor1.cdn.digitaloceanspaces.com" as const;

/** Bump when favicon or theme logo objects change so browsers/CDN fetch fresh bytes. */
export const BRAND_ASSET_CACHE_VERSION = "2026-05-21-prod-fix" as const;

function cdnAsset(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${NURSENEST_IMAGES_CDN_BASE}/${normalized}?v=${BRAND_ASSET_CACHE_VERSION}`;
}

export const FAVICON_PINK_URL = cdnAsset("pinkfavicon.png");
export const LOGO_BLOSSOM_URL = cdnAsset("hotpinkblossomleaflogo.png");
export const LOGO_AURORA_URL = cdnAsset("00e0dc0f-b614-4e28-9fa9-33cdcf89cf0c.png");
