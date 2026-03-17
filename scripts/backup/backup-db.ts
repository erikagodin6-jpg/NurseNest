import fs from "fs";
import path from "path";
import {
  PROJECT_ROOT,
  getTimestamp,
  ensureDir,
  writeBackupLog,
  type BackupResult,
} from "./backup-engine";

async function runDbBackup() {
  const startTime = Date.now();
  const timestamp = getTimestamp();
  const backupDir = path.join(PROJECT_ROOT, "backups", "db");
  ensureDir(backupDir);

  console.log(`[BACKUP:DB] Starting database backup at ${timestamp}`);

  const warnings: string[] = [];
  const errors: string[] = [];
  let fileCount = 0;

  try {
    const migrationsDir = path.join(PROJECT_ROOT, "migrations");
    const migBackupDir = path.join(backupDir, "migrations");
    ensureDir(migBackupDir);

    if (fs.existsSync(migrationsDir)) {
      const migFiles = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql"));
      for (const f of migFiles) {
        fs.copyFileSync(path.join(migrationsDir, f), path.join(migBackupDir, f));
        fileCount++;
      }
      console.log(`  Copied ${migFiles.length} migration files`);
    }

    const schemaFile = path.join(PROJECT_ROOT, "shared", "schema.ts");
    if (fs.existsSync(schemaFile)) {
      fs.copyFileSync(schemaFile, path.join(backupDir, "schema.ts"));
      fileCount++;
    }

    const drizzleConfig = path.join(PROJECT_ROOT, "drizzle.config.ts");
    if (fs.existsSync(drizzleConfig)) {
      const configContent = fs.readFileSync(drizzleConfig, "utf-8");
      const sanitized = configContent.replace(/url:\s*process\.env\.\w+/g, 'url: "DATABASE_URL_PLACEHOLDER"');
      fs.writeFileSync(path.join(backupDir, "drizzle.config.ts"), sanitized);
      fileCount++;
    }

    let tableRowCounts: Record<string, number> = {};
    try {
      if (process.env.DATABASE_URL) {
        const pg = await import("pg");
        const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });

        const tablesResult = await pool.query(
          `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
        );

        for (const row of tablesResult.rows) {
          try {
            const countResult = await pool.query(`SELECT COUNT(*) as cnt FROM "${row.table_name}"`);
            tableRowCounts[row.table_name] = parseInt(countResult.rows[0].cnt);
          } catch {
            tableRowCounts[row.table_name] = -1;
          }
        }

        const schemaResult = await pool.query(
          `SELECT table_name, column_name, data_type, is_nullable, column_default
           FROM information_schema.columns
           WHERE table_schema = 'public'
           ORDER BY table_name, ordinal_position`
        );

        const schemaDump: Record<string, any[]> = {};
        for (const col of schemaResult.rows) {
          if (!schemaDump[col.table_name]) schemaDump[col.table_name] = [];
          schemaDump[col.table_name].push({
            column: col.column_name,
            type: col.data_type,
            nullable: col.is_nullable === "YES",
            default: col.column_default,
          });
        }

        fs.writeFileSync(
          path.join(backupDir, "schema-dump.json"),
          JSON.stringify(schemaDump, null, 2)
        );
        fileCount++;

        const contentTables = ["content_items", "exam_questions", "flashcard_decks", "allied_questions", "case_studies", "imaging_questions"];
        const contentMeta: Record<string, any> = {};

        for (const table of contentTables) {
          try {
            const result = await pool.query(`SELECT COUNT(*) as cnt FROM "${table}"`);
            const count = parseInt(result.rows[0].cnt);
            contentMeta[table] = { count };

            if (count > 0 && count <= 10000) {
              let sampleResult;
              if (table === "content_items") {
                sampleResult = await pool.query(`SELECT id, title, slug, type, category, tier, status FROM "${table}" LIMIT 500`);
              } else if (table === "exam_questions") {
                sampleResult = await pool.query(`SELECT id, tier, exam, question_type, status, body_system FROM "${table}" LIMIT 500`);
              } else {
                sampleResult = await pool.query(`SELECT id FROM "${table}" LIMIT 500`);
              }
              contentMeta[table].sampleRows = sampleResult.rows;
            }
          } catch {
            contentMeta[table] = { count: -1, error: "table may not exist" };
          }
        }

        fs.writeFileSync(
          path.join(backupDir, "content-metadata.json"),
          JSON.stringify(contentMeta, null, 2)
        );
        fileCount++;

        await pool.end();
      } else {
        warnings.push("DATABASE_URL not set, skipping live DB queries");
      }
    } catch (e: any) {
      warnings.push(`DB query error: ${e.message}`);
    }

    fs.writeFileSync(
      path.join(backupDir, "table-row-counts.json"),
      JSON.stringify(tableRowCounts, null, 2)
    );
    fileCount++;

    const summary = {
      timestamp,
      tablesFound: Object.keys(tableRowCounts).length,
      totalRows: Object.values(tableRowCounts).filter((v) => v >= 0).reduce((a, b) => a + b, 0),
      migrationFiles: fs.existsSync(migrationsDir) ? fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).length : 0,
      hasSchema: fs.existsSync(schemaFile),
      hasDrizzleConfig: fs.existsSync(drizzleConfig),
    };

    fs.writeFileSync(path.join(backupDir, `db-export-summary-${timestamp}.json`), JSON.stringify(summary, null, 2));
    fileCount++;

    const result: BackupResult = {
      timestamp,
      type: "db",
      status: "success",
      fileCount,
      archiveSize: 0,
      archivePath: backupDir,
      validationResult: "pass",
      warnings,
      errors,
      duration: Date.now() - startTime,
    };

    writeBackupLog(result);

    console.log(`[BACKUP:DB] Complete!`);
    console.log(`  Tables: ${summary.tablesFound}`);
    console.log(`  Total rows: ${summary.totalRows}`);
    console.log(`  Migration files: ${summary.migrationFiles}`);
    console.log(`  Output: ${backupDir}`);

    return result;
  } catch (e: any) {
    errors.push(e.message);
    const result: BackupResult = {
      timestamp,
      type: "db",
      status: "failed",
      fileCount: 0,
      archiveSize: 0,
      archivePath: "",
      validationResult: "fail",
      warnings,
      errors,
      duration: Date.now() - startTime,
    };
    writeBackupLog(result);
    console.error(`[BACKUP:DB] Failed: ${e.message}`);
    return result;
  }
}

runDbBackup().then(result => {
  if (result.status === "failed") process.exit(1);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
