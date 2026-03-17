import fs from "fs";
import path from "path";
import pg from "pg";
import { logBackup } from "./backup-logger";

const ROOT = path.resolve(import.meta.dirname, "..");

const SENSITIVE_COLUMNS = new Set([
  "password",
  "stripe_customer_id",
  "stripe_subscription_id",
  "stripe_payment_intent_id",
  "tester_invite_code",
  "referral_code",
]);

const SENSITIVE_TABLES = new Set(["sessions"]);

export async function runDbBackup(): Promise<{
  outputDir: string;
  fileCount: number;
  timestamp: string;
}> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDir = path.join(ROOT, "backups", "db", timestamp);
  fs.mkdirSync(outputDir, { recursive: true });

  const pool = new pg.Pool({ connectionString: dbUrl });
  let fileCount = 0;
  const errors: string[] = [];

  try {
    const schemaPath = path.join(ROOT, "shared", "schema.ts");
    if (fs.existsSync(schemaPath)) {
      fs.copyFileSync(schemaPath, path.join(outputDir, "schema.ts"));
      fileCount++;
    }

    const migrationsDir = path.join(ROOT, "migrations");
    if (fs.existsSync(migrationsDir)) {
      const migOut = path.join(outputDir, "migrations");
      fs.mkdirSync(migOut, { recursive: true });
      const migFiles = fs.readdirSync(migrationsDir);
      for (const f of migFiles) {
        const src = path.join(migrationsDir, f);
        if (fs.statSync(src).isFile()) {
          fs.copyFileSync(src, path.join(migOut, f));
          fileCount++;
        }
      }
    }

    const tablesResult = await pool.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const tableStructure: Record<string, any> = {};

    for (const row of tablesResult.rows) {
      const tableName = row.table_name;
      if (SENSITIVE_TABLES.has(tableName)) continue;

      const columnsResult = await pool.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
      `, [tableName]);

      tableStructure[tableName] = {
        columns: columnsResult.rows,
        rowCount: 0,
      };

      const countResult = await pool.query(`SELECT COUNT(*) as cnt FROM "${tableName}"`);
      tableStructure[tableName].rowCount = parseInt(countResult.rows[0].cnt);
    }

    fs.writeFileSync(
      path.join(outputDir, "table-structure.json"),
      JSON.stringify(tableStructure, null, 2)
    );
    fileCount++;

    const safeExportTables = [
      "content_items",
      "blog_config",
      "pricing_plans",
      "flashcard_decks",
      "qotd_history",
      "lesson_aliases",
      "lesson_overrides",
      "exam_blueprints",
      "social_posts",
    ];

    for (const tableName of safeExportTables) {
      if (!tableStructure[tableName]) continue;

      try {
        const columnsResult = await pool.query(`
          SELECT column_name FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
          ORDER BY ordinal_position
        `, [tableName]);

        const safeCols = columnsResult.rows
          .map((r: any) => r.column_name)
          .filter((c: string) => !SENSITIVE_COLUMNS.has(c));

        const colList = safeCols.map((c: string) => `"${c}"`).join(", ");
        const result = await pool.query(`SELECT ${colList} FROM "${tableName}" LIMIT 10000`);

        fs.writeFileSync(
          path.join(outputDir, `${tableName}.json`),
          JSON.stringify(result.rows, null, 2)
        );
        fileCount++;
      } catch (err: any) {
        errors.push(`Failed to export table ${tableName}: ${err.message}`);
      }
    }

    const drizzleConfig = path.join(ROOT, "drizzle.config.ts");
    if (fs.existsSync(drizzleConfig)) {
      fs.copyFileSync(drizzleConfig, path.join(outputDir, "drizzle.config.ts"));
      fileCount++;
    }
  } finally {
    await pool.end();
  }

  const status = errors.length > 0 ? "partial" : "success";

  await logBackup({
    type: "db",
    timestamp: new Date().toISOString(),
    archivePath: outputDir,
    size: 0,
    fileCount,
    status,
  });

  return { outputDir, fileCount, timestamp: new Date().toISOString(), errors };
}

if (process.argv[1] && process.argv[1].includes("backup-db")) {
  runDbBackup()
    .then((result) => {
      console.log("Database backup completed:");
      console.log(`  Output: ${result.outputDir}`);
      console.log(`  Files: ${result.fileCount}`);
      console.log(`  Timestamp: ${result.timestamp}`);
    })
    .catch((err) => {
      console.error("Database backup failed:", err);
      process.exit(1);
    });
}
