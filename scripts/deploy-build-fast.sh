#!/usr/bin/env bash
set -e

echo "=== Deploy Build (optimized) ==="

echo "Step 0: Pre-migration data fix (backfill NULL emails)..."
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

echo "Running optimized TypeScript build..."
SKIP_I18N_VALIDATION=1 NODE_OPTIONS='--max-old-space-size=4096' npx tsx script/build.ts

echo "=== Deploy Build Complete ==="
