import type { NextConfig } from "next";
import { getAllProgrammaticSlugs } from "./src/lib/seo/programmatic-registry";
const programmaticSeoRewrites = getAllProgrammaticSlugs().map((slug) => ({
  source: `/${slug}`,
  destination: `/seo/${slug}`,
}));

const legacyMedMathRedirect = {
  source: "/med-math",
  destination: "/tools/med-math",
  permanent: true,
} as const;

/** Consolidate on public programmatic URLs (`/{slug}`); `/seo/{slug}` is internal rewrite target only. */
const seoCanonicalRedirects = getAllProgrammaticSlugs().map((slug) => ({
  source: `/seo/${slug}`,
  destination: `/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nursenest-images.tor1.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nursenest-images.tor1.digitaloceanspaces.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nursenest.ca",
        pathname: "/**",
      },
    ],
  },
  // Auth.js reads AUTH_TRUST_HOST in proxied environments (e.g. DigitalOcean).
  // Ensures UntrustedHost does not occur if platform env is missing at deploy time.
  env: {
    // Use || so empty string (often set by hosts with no value) defaults to trusted.
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST || "true",
  },
  // Allow importing shared monolith modules (`../shared/*`) without publishing a package.
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return [
      legacyMedMathRedirect,
      /** Older Next split-sitemap routes → unified `/sitemap.xml` for GSC + bookmarks. */
      { source: "/sitemap/0.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap/1.xml", destination: "/sitemap.xml", permanent: true },
      ...seoCanonicalRedirects,
      /** Institutional pricing: canonical path `/for-institutions` (footer + marketing). */
      { source: "/institutional-pricing", destination: "/for-institutions", permanent: true },
      { source: "/pricing/institutional", destination: "/for-institutions", permanent: true },
      { source: "/for-schools", destination: "/for-institutions", permanent: true },
    ];
  },
  async rewrites() {
    return { beforeFiles: programmaticSeoRewrites };
  },
};

export default nextConfig;
