#!/bin/sh
# Render production build: minimal required path by default.
set -e

# Guarantee we never reuse stale build artifacts.
rm -rf dist

t=$(date +%s)
npm ci --omit=dev
echo "[deploy-timing] npm_ci_prod_s=$(( $(date +%s) - t ))"

if [ "${USE_PREBUILT_DIST:-0}" = "1" ] && [ -f "dist/index.cjs" ]; then
  if node -e "const fs=require('fs');const s=fs.readFileSync('dist/index.cjs','utf8');process.exit(s.includes('STARTUP_FINGERPRINT=2026-03-25-final-proof')?0:1)"; then
    echo "[deploy-timing] using_prebuilt_dist=1 (fingerprint match)"
    exit 0
  else
    echo "[deploy-timing] prebuilt_dist fingerprint mismatch; rebuilding"
  fi
fi

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
# Hard fail if dist/index.cjs doesn't match the expected "fresh" runtime logic.
node -e "const fs=require('fs'); const s=fs.readFileSync('dist/index.cjs','utf8');
const hasFingerprint=s.includes('STARTUP_FINGERPRINT=2026-03-25-final-proof');
if(!hasFingerprint){console.error('[fresh-build-check] Missing STARTUP_FINGERPRINT proof'); process.exit(11);}
const hasSelectedProd=s.includes('selected_db_target=production_prod_url')||s.includes('selected_db_target=production_database_url_fallback');
if(!hasSelectedProd){console.error('[fresh-build-check] Missing selected_db_target production marker'); process.exit(12);}
if(s.includes('Refusing to use DATABASE_URL for production unless')){console.error('[fresh-build-check] Found old production DB refusal logic'); process.exit(13);}
if(s.includes('getDevPool:()=>vu')||s.includes('function vu(){')){console.error('[fresh-build-check] Found dev-pool startup logic in production bundle'); process.exit(14);}
console.log('[fresh-build-check] dist/index.cjs matches expected fresh build logic');"
echo "[deploy-timing] fresh_build_check_s=$(( $(date +%s) - t ))"

t=$(date +%s)
npm prune --production
echo "[deploy-timing] npm_prune_s=$(( $(date +%s) - t ))"
