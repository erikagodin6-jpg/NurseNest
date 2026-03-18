#!/usr/bin/env bash
set -e

START_SECONDS=$SECONDS
elapsed() { echo "[$(( SECONDS - START_SECONDS ))s]"; }

echo "$(elapsed) === Deploy Build Start ==="

echo "$(elapsed) Step 0: Pre-migration data fix (backfill NULL emails)..."
node -e "
const { Pool } = require('pg');
if (!process.env.DATABASE_URL) { console.log('[pre-migration] No DATABASE_URL, skipping'); process.exit(0); }
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  try {
    const before = await pool.query('SELECT COUNT(*)::int AS cnt FROM users WHERE email IS NULL');
    const nullCount = before.rows[0].cnt;
    console.log('[pre-migration] NULL emails found: ' + nullCount);
    if (nullCount > 0) {
      await pool.query(\`
        UPDATE users
        SET email = CASE
          WHEN username IS NOT NULL
           AND btrim(username) <> ''
           AND username ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\\\\.[A-Z]{2,}$'
            THEN lower(btrim(username))
          ELSE 'user-' || id || '@placeholder.local'
        END
        WHERE email IS NULL
      \`);
      const after = await pool.query('SELECT COUNT(*)::int AS cnt FROM users WHERE email IS NULL');
      console.log('[pre-migration] Backfilled. Remaining NULL emails: ' + after.rows[0].cnt);
    }
    const dupes = await pool.query(\"SELECT lower(email) AS e, COUNT(*)::int AS c FROM users WHERE email IS NOT NULL GROUP BY lower(email) HAVING COUNT(*) > 1\");
    if (dupes.rows.length > 0) {
      console.log('[pre-migration] Found ' + dupes.rows.length + ' duplicate email groups, deduplicating...');
      for (const row of dupes.rows) {
        const ids = await pool.query('SELECT id FROM users WHERE lower(email) = \$1 ORDER BY id', [row.e]);
        for (let i = 1; i < ids.rows.length; i++) {
          await pool.query('UPDATE users SET email = \$1 WHERE id = \$2', ['user-' + ids.rows[i].id + '@placeholder.local', ids.rows[i].id]);
        }
      }
      console.log('[pre-migration] Duplicates resolved');
    }
  } catch (err) {
    console.error('[pre-migration] Warning: ' + err.message);
  } finally {
    await pool.end();
  }
})();
" || echo "[pre-migration] Script finished with warnings (non-fatal)"

rm -rf dist
mkdir -p dist

echo "$(elapsed) Step 1/5: Compiling i18n..."
SKIP_I18N_VALIDATION=1 npx tsx -e "
import { compileI18n } from './script/compile-i18n';
await compileI18n();
console.log('i18n compiled');
"

echo "$(elapsed) Step 2/5: Copying seed data..."
if [ -d "server/seed-data" ]; then
  mkdir -p dist/seed-data
  for f in server/seed-data/*; do
    case "$f" in *.ts) continue ;; esac
    cp "$f" "dist/seed-data/" 2>/dev/null || true
  done
fi
echo "seed data done"

LOADER="--loader:.png=empty --loader:.jpg=empty --loader:.jpeg=empty --loader:.svg=empty --loader:.webp=empty --loader:.gif=empty"

echo "$(elapsed) Step 3/5: Building lessons data (esbuild)..."
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

echo "$(elapsed) Step 4/5: Building server (esbuild)..."
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

echo "$(elapsed) Step 5/5: Building client (vite in subprocess)..."
NODE_OPTIONS='--max-old-space-size=3072' npx vite build
echo "client done"

rm -rf dist/public/videos dist/public/translations 2>/dev/null || true

echo "$(elapsed) === Deploy Build Complete ==="
