#!/bin/sh
# Render production build: minimal required path by default.
set -e

# Guarantee we never reuse stale build artifacts.
rm -rf dist
rm -rf node_modules/.cache node_modules/.vite node_modules/.esbuild || true

t=$(date +%s)
npm ci --omit=dev
echo "[deploy-timing] npm_ci_prod_s=$(( $(date +%s) - t ))"

# Install only the build toolchain needed for this deploy.
t=$(date +%s)
npm install --no-save \
  --include=dev \
  tsx typescript esbuild vite \
  @vitejs/plugin-react @tailwindcss/vite \
  tailwindcss vite-plugin-circular-dependency \
  @replit/vite-plugin-runtime-error-modal
echo "[deploy-timing] install_build_toolchain_s=$(( $(date +%s) - t ))"

t=$(date +%s)
npm run build
echo "[deploy-timing] npm_run_build_s=$(( $(date +%s) - t ))"

t=$(date +%s)
echo "[deploy-timing] check_bundle_size_s=$(date +%s)"
npm run check:bundle-size
echo "[deploy-timing] check_bundle_size_done_s=$(( $(date +%s) - t ))"

t=$(date +%s)
# Hard fail if dist/index.cjs doesn't match the expected "fresh" runtime logic.
node -e "const fs=require('fs');
if(!fs.existsSync('dist/index.cjs')){console.error('[fresh-build-check] dist/index.cjs missing'); process.exit(10);}
const s=fs.readFileSync('dist/index.cjs','utf8');
const hasBuildVersion=s.includes('BUILD_VERSION=2026-03-25-FORCE-REBUILD');
if(!hasBuildVersion){console.error('[fresh-build-check] Missing BUILD_VERSION proof in dist/index.cjs'); process.exit(11);}
const hasFingerprint=s.includes('STARTUP_FINGERPRINT=2026-03-25-final-proof');
if(!hasFingerprint){console.error('[fresh-build-check] Missing STARTUP_FINGERPRINT proof'); process.exit(12);}
const hasSelectedProd=s.includes('selected_db_target=production_prod_url')||s.includes('selected_db_target=production_database_url_fallback');
if(!hasSelectedProd){console.error('[fresh-build-check] Missing selected_db_target production marker'); process.exit(13);}
const hasStorageSafetyLog=s.includes('[Storage] getAllUsers hit safety limit of');
if(!hasStorageSafetyLog){console.error('[fresh-build-check] Missing storage module log string'); process.exit(14);}
console.log('[fresh-build-check] dist/index.cjs contains BUILD_VERSION + DB/storage signature strings');"
echo "[deploy-timing] fresh_build_check_s=$(( $(date +%s) - t ))"

t=$(date +%s)
npm prune --production
echo "[deploy-timing] npm_prune_s=$(( $(date +%s) - t ))"
