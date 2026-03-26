#!/usr/bin/env bash
# Canonical production build for Render, Railway, and CI.
# Installs devDependencies (build toolchain), produces dist/, verifies artifacts, prunes for runtime.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "[production-build] repo root: ${ROOT}"

rm -rf dist

# Platforms often set NODE_ENV=production, which would skip devDependencies on install.
NODE_ENV=development npm ci

export NODE_ENV=production
export SKIP_I18N_VALIDATION="${SKIP_I18N_VALIDATION:-1}"
export SKIP_I18N_COMPILE="${SKIP_I18N_COMPILE:-1}"
export SKIP_BUILD_REPORTS="${SKIP_BUILD_REPORTS:-1}"
export VITE_SKIP_CIRCULAR_CHECK="${VITE_SKIP_CIRCULAR_CHECK:-1}"
export RUN_HEAVY_BUILD_TASKS="${RUN_HEAVY_BUILD_TASKS:-0}"

npm run build
npm run check:bundle-size
npm prune --production

echo "[production-build] complete"
