import fs from "node:fs";
import { execSync } from "node:child_process";

const DIST_INDEX = "dist/index.cjs";
const EXPECTED_STARTUP_FINGERPRINT = "STARTUP_FINGERPRINT=2026-03-25-final-proof";
const EXPECTED_BUILD_VERSION_LOG = "BUILD_VERSION=2026-03-25-FORCE-REBUILD";

function distLooksFresh() {
  try {
    if (!fs.existsSync(DIST_INDEX)) return false;
    const s = fs.readFileSync(DIST_INDEX, "utf8");
    // The required proof: server/index.ts must have been bundled into dist/index.cjs.
    return s.includes(EXPECTED_BUILD_VERSION_LOG);
  } catch {
    return false;
  }
}

function installBuildToolchain() {
  // Only needed if we have to rebuild in the start phase.
  execSync(
    [
      "npm install --no-save",
      "--include=dev",
      "tsx typescript esbuild vite",
      "@vitejs/plugin-react @tailwindcss/vite",
      "tailwindcss vite-plugin-circular-dependency",
      "@replit/vite-plugin-runtime-error-modal",
    ].join(" "),
    { stdio: "inherit" },
  );
}

if (!distLooksFresh()) {
  console.log("[fresh-start-guard] dist/index.cjs missing freshness markers; rebuilding...");
  execSync("rm -rf dist node_modules/.cache node_modules/.vite node_modules/.esbuild || true", {
    stdio: "inherit",
  });
  installBuildToolchain();

  // Match the Render build environment defaults.
  process.env.NODE_ENV = process.env.NODE_ENV || "production";
  process.env.SKIP_I18N_VALIDATION = process.env.SKIP_I18N_VALIDATION || "1";
  process.env.SKIP_I18N_COMPILE = process.env.SKIP_I18N_COMPILE || "1";
  process.env.SKIP_BUILD_REPORTS = process.env.SKIP_BUILD_REPORTS || "1";
  process.env.RUN_HEAVY_BUILD_TASKS = process.env.RUN_HEAVY_BUILD_TASKS || "0";

  execSync("npm run build", { stdio: "inherit" });

  if (!distLooksFresh()) {
    throw new Error("[fresh-start-guard] Rebuild ran but dist still missing freshness markers.");
  }
}

execSync("node dist/index.cjs", { stdio: "inherit", env: process.env });

