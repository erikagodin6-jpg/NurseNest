#!/bin/sh
# Render production build: minimal required path by default.
set -e

t=$(date +%s)
npm ci --omit=dev
echo "[deploy-timing] npm_ci_prod_s=$(( $(date +%s) - t ))"

if [ "${USE_PREBUILT_DIST:-0}" = "1" ] && [ -f "dist/index.cjs" ]; then
  echo "[deploy-timing] using_prebuilt_dist=1"
  exit 0
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
npm prune --production
echo "[deploy-timing] npm_prune_s=$(( $(date +%s) - t ))"
