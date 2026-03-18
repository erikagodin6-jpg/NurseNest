import pg from "pg";

export async function runCrossPlatformAuthMigration(pool?: pg.Pool) {
  if (!pool) {
    const { getDevPool } = await import("../db");
    pool = getDevPool();
  }
  console.log("[Auth Migration] Running cross-platform auth unification migration...");

  await runStep(pool, "add user profile columns", async () => {
    await pool!.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT`);
    await pool!.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS exam_track TEXT`);
    await pool!.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN DEFAULT false`);

    const countryCheck = await pool!.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name='users' AND column_name='country'
    `);
    if (countryCheck.rows.length === 0) {
      await pool!.query(`ALTER TABLE users ADD COLUMN country TEXT`);
    }
  });

  await runStep(pool, "normalize and deduplicate emails", async () => {
    await pool!.query(`UPDATE users SET email = LOWER(TRIM(email)) WHERE email IS NOT NULL AND email != '' AND email != LOWER(TRIM(email))`);

    const dupes = await pool!.query(`
      SELECT LOWER(email) AS norm_email, array_agg(id ORDER BY id ASC) AS ids
      FROM users
      WHERE email IS NOT NULL AND email != ''
      GROUP BY LOWER(email)
      HAVING COUNT(*) > 1
    `);

    for (const row of dupes.rows) {
      const ids: string[] = row.ids;
      for (let i = 1; i < ids.length; i++) {
        const deduped = `duplicate_${ids[i]}_${row.norm_email}`;
        await pool!.query(`UPDATE users SET email = $1 WHERE id = $2`, [deduped, ids[i]]);
        console.log(`[Auth Migration] Deduplicated email for user ${ids[i]}: ${row.norm_email} -> ${deduped}`);
      }
    }

    await pool!.query(`UPDATE users SET email = 'placeholder_' || id || '@nursenest.local' WHERE email IS NULL OR email = ''`);
  });

  await runStep(pool, "enforce email NOT NULL", async () => {
    const isNullable = await pool!.query(`
      SELECT is_nullable FROM information_schema.columns 
      WHERE table_name='users' AND column_name='email'
    `);
    if (isNullable.rows[0]?.is_nullable === 'YES') {
      await pool!.query(`ALTER TABLE users ALTER COLUMN email SET NOT NULL`);
    }
  });

  await runStep(pool, "create email unique index", async () => {
    const indexExists = await pool!.query(`
      SELECT 1 FROM pg_indexes WHERE tablename='users' AND indexname='idx_users_email_unique'
    `);
    if (indexExists.rows.length === 0) {
      await pool!.query(`CREATE UNIQUE INDEX idx_users_email_unique ON users (LOWER(email))`);
    }
  });

  await runStep(pool, "create password_reset_tokens table", async () => {
    await pool!.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR NOT NULL,
        token TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        used_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    const tokenIndexExists = await pool!.query(`
      SELECT 1 FROM pg_indexes WHERE tablename='password_reset_tokens' AND indexname='idx_password_reset_tokens_user'
    `);
    if (tokenIndexExists.rows.length === 0) {
      await pool!.query(`CREATE INDEX idx_password_reset_tokens_user ON password_reset_tokens (user_id)`);
    }

    const expiryIndexExists = await pool!.query(`
      SELECT 1 FROM pg_indexes WHERE tablename='password_reset_tokens' AND indexname='idx_password_reset_tokens_expiry'
    `);
    if (expiryIndexExists.rows.length === 0) {
      await pool!.query(`CREATE INDEX idx_password_reset_tokens_expiry ON password_reset_tokens (expires_at) WHERE used_at IS NULL`);
    }
  });

  console.log("[Auth Migration] Cross-platform auth unification migration complete.");
}

async function runStep(pool: pg.Pool, name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`[Auth Migration] ✓ ${name}`);
  } catch (err: any) {
    console.error(`[Auth Migration] ✗ ${name}: ${err.message}`);
    throw err;
  }
}
