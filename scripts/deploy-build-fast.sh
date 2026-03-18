#!/usr/bin/env bash
set -e

START_SECONDS=$SECONDS
elapsed() { echo "[$(( SECONDS - START_SECONDS ))s]"; }

echo "$(elapsed) === Deploy Build Start ==="

echo "$(elapsed) Step 0: Pre-migration data fix..."
node -e "
const { Pool } = require('pg');
if (!process.env.DATABASE_URL) { console.log('No DATABASE_URL, skipping'); process.exit(0); }
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  try {
    const r = await pool.query('SELECT COUNT(*)::int AS cnt FROM users WHERE email IS NULL');
    if (r.rows[0].cnt > 0) {
      await pool.query(\`UPDATE users SET email = 'user-' || id || '@placeholder.local' WHERE email IS NULL\`);
      console.log('Backfilled ' + r.rows[0].cnt + ' NULL emails');
    } else { console.log('No NULL emails'); }
  } catch (e) { console.error('Warning: ' + e.message); }
  finally { await pool.end(); }
})();
" || true

rm -rf dist
mkdir -p dist

echo "$(elapsed) Step 1: i18n + seed data + lessons (parallel)..."

SKIP_I18N_VALIDATION=1 npx tsx -e "
(async () => {
  const { compileI18n } = await import('./script/compile-i18n');
  await compileI18n();
  console.log('i18n compiled');
})();
" &
I18N_PID=$!

if [ -d "server/seed-data" ]; then
  mkdir -p dist/seed-data
  for f in server/seed-data/*; do
    case "$f" in *.ts) continue ;; esac
    cp "$f" "dist/seed-data/" 2>/dev/null || true
  done
fi

LOADER="--loader:.png=empty --loader:.jpg=empty --loader:.jpeg=empty --loader:.svg=empty --loader:.webp=empty --loader:.gif=empty"

npx esbuild client/src/data/lessons/index.ts \
  --bundle --platform=node --format=cjs \
  --outfile=dist/lessons-data.cjs \
  --define:process.env.NODE_ENV=\"production\" \
  --minify --log-level=warning \
  $LOADER \
  --alias:@=client/src --alias:@shared=shared \
  --external:./np-generated-batch-* &
LESSONS_PID=$!

wait $I18N_PID $LESSONS_PID 2>/dev/null
echo "$(elapsed) i18n + lessons done"

echo "$(elapsed) Step 2: NP batches (parallel)..."
PIDS=""
for f in client/src/data/lessons/np-generated-batch-*.ts; do
  [ -f "$f" ] || continue
  base=$(basename "$f" .ts)
  npx esbuild "$f" \
    --bundle --platform=node --format=cjs \
    --outfile="dist/${base}.cjs" \
    --define:process.env.NODE_ENV=\"production\" \
    --minify --log-level=warning \
    $LOADER \
    --alias:@=client/src --alias:@shared=shared &
  PIDS="$PIDS $!"
done
for pid in $PIDS; do wait $pid; done
echo "$(elapsed) NP batches done"

echo "$(elapsed) Step 3: Server bundle..."
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
echo "$(elapsed) server done"

echo "$(elapsed) Step 4: Client bundle (vite)..."
NODE_OPTIONS='--max-old-space-size=4096' npx vite build --logLevel error 2>&1
echo "$(elapsed) client done"

rm -rf dist/public/videos dist/public/translations 2>/dev/null || true

echo "$(elapsed) === Deploy Build Complete ==="
