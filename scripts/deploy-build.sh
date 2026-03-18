#!/usr/bin/env bash
set -e

START_SECONDS=$SECONDS
elapsed() { echo "[$(( SECONDS - START_SECONDS ))s]"; }

echo "$(elapsed) === Deploy Build Start ==="

echo "$(elapsed) Step 0/6: Pre-migration data fixes..."
node scripts/pre-migration-fix.cjs

rm -rf dist
mkdir -p dist

echo "$(elapsed) Step 1/6: Compiling i18n..."
SKIP_I18N_VALIDATION=1 npx tsx -e "
import { compileI18n } from './script/compile-i18n';
await compileI18n();
console.log('i18n compiled');
"

echo "$(elapsed) Step 2/6: Copying seed data..."
if [ -d "server/seed-data" ]; then
  mkdir -p dist/seed-data
  for f in server/seed-data/*; do
    case "$f" in *.ts) continue ;; esac
    cp "$f" "dist/seed-data/" 2>/dev/null || true
  done
fi
echo "seed data done"

LOADER="--loader:.png=empty --loader:.jpg=empty --loader:.jpeg=empty --loader:.svg=empty --loader:.webp=empty --loader:.gif=empty"

echo "$(elapsed) Step 3/6: Building lessons data (esbuild)..."
npx esbuild client/src/data/lessons/index.ts \
  --bundle --platform=node --format=cjs \
  --outfile=dist/lessons-data.cjs \
  --define:process.env.NODE_ENV=\"production\" \
  --minify --log-level=warning \
  $LOADER \
  --alias:@=client/src --alias:@shared=shared \
  --external:./np-generated-batch-*

for f in client/src/data/lessons/np-generated-batch-*.ts; do
  [ -f "$f" ] || continue
  base=$(basename "$f" .ts)
  echo "  building $base..."
  npx esbuild "$f" \
    --bundle --platform=node --format=cjs \
    --outfile="dist/${base}.cjs" \
    --define:process.env.NODE_ENV=\"production\" \
    --minify --log-level=warning \
    $LOADER \
    --alias:@=client/src --alias:@shared=shared
done
echo "lessons data done"

echo "$(elapsed) Step 4/6: Building server (esbuild)..."
EXTERNALS=$(node -e "
const p=JSON.parse(require('fs').readFileSync('package.json','utf-8'));
const allow=['@google/generative-ai','axios','connect-pg-simple','cors','date-fns','drizzle-orm','drizzle-zod','express','express-rate-limit','express-session','jsonwebtoken','memorystore','multer','nanoid','nodemailer','openai','passport','passport-local','pg','stripe','uuid','ws','xlsx','zod','zod-validation-error'];
const allDeps=[...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})];
console.log(allDeps.filter(d=>!allow.includes(d)).map(e=>'--external:'+e).join(' '));
")

npx esbuild server/index.ts \
  --bundle --platform=node --format=cjs \
  --outfile=dist/index.cjs \
  --define:process.env.NODE_ENV=\"production\" \
  --minify --log-level=warning \
  $LOADER \
  --external:../client/src/data/lessons/index \
  $EXTERNALS \
  --alias:@=client/src --alias:@shared=shared
echo "server done"

echo "$(elapsed) Step 5/6: Building client (vite in subprocess)..."
NODE_OPTIONS='--max-old-space-size=3072' npx vite build
echo "client done"

echo "$(elapsed) Step 6/6: Cleanup..."
rm -rf dist/public/videos dist/public/translations 2>/dev/null || true

echo "$(elapsed) === Deploy Build Complete ==="
