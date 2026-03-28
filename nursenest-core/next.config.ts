import type { NextConfig } from "next";
import { getAllProgrammaticSlugs } from "./src/lib/seo/programmatic-registry";

const programmaticSeoRewrites = getAllProgrammaticSlugs().map((slug) => ({
  source: `/${slug}`,
  destination: `/seo/${slug}`,
}));

const nextConfig: NextConfig = {
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
  async rewrites() {
    // When NEXT_PUBLIC_MARKETING_CDN_BASE is the public site origin, image URLs become
    // /screenshots/... — proxy to Spaces so those paths resolve (bucket must allow public GET).
    const screenshotProxy = {
      source: "/screenshots/:path*",
      destination: "https://nursenest-images.tor1.digitaloceanspaces.com/screenshots/:path*",
    };
    return { beforeFiles: [screenshotProxy, ...programmaticSeoRewrites] };
  },
};

export default nextConfig;
