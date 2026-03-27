import type { NextConfig } from "next";

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
};

export default nextConfig;
