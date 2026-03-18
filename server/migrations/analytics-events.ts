import pg from "pg";

export async function runAnalyticsEventsMigration(pool?: pg.Pool) {
  if (!pool) {
    const { getDevPool } = await import("../db");
    pool = getDevPool();
  }
  console.log("[Analytics Events Migration] Running analytics_events table migration...");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      event_name TEXT NOT NULL,
      user_id VARCHAR,
      session_id TEXT,
      platform TEXT,
      timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
      metadata JSONB DEFAULT '{}'::jsonb,
      ip_address TEXT,
      user_agent TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  console.log("[Analytics Events Migration] ✓ analytics_events table created");

  await pool.query(`CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events (event_name)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events (user_id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events (created_at)`);
  console.log("[Analytics Events Migration] ✓ indexes created (event_name, user_id, created_at)");

  console.log("[Analytics Events Migration] Migration complete.");
}
