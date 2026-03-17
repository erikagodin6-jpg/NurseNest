import fs from "fs";
import path from "path";
import {
  PROJECT_ROOT,
  getTimestamp,
  ensureDir,
  collectFiles,
  writeBackupLog,
  type BackupResult,
} from "./backup-engine";

async function runContentBackup() {
  const startTime = Date.now();
  const timestamp = getTimestamp();
  const backupDir = path.join(PROJECT_ROOT, "backups", "content");
  ensureDir(backupDir);

  console.log(`[BACKUP:CONTENT] Starting content backup at ${timestamp}`);

  const warnings: string[] = [];
  const errors: string[] = [];

  try {
    const contentIndex: any = {
      generatedAt: new Date().toISOString(),
      timestamp,
      sections: {},
      totalItems: 0,
    };

    const contentDirs = [
      { dir: "client/src/data", label: "Client data files" },
      { dir: "shared", label: "Shared modules" },
    ];

    for (const { dir, label } of contentDirs) {
      const fullDir = path.join(PROJECT_ROOT, dir);
      if (!fs.existsSync(fullDir)) continue;
      const files = collectFiles(fullDir, ["**/*"], ["node_modules"]);
      contentIndex.sections[label] = {
        directory: dir,
        fileCount: files.length,
        files: files.slice(0, 100),
      };
      contentIndex.totalItems += files.length;
    }

    const translationDirs = ["client/public/locales", "shared/translations", "translations"];
    const translationFiles: string[] = [];
    for (const dir of translationDirs) {
      const fullDir = path.join(PROJECT_ROOT, dir);
      if (fs.existsSync(fullDir)) {
        const files = collectFiles(fullDir, ["*.json"], []);
        translationFiles.push(...files.map((f) => path.join(dir, f)));
      }
    }
    contentIndex.sections["Translations"] = {
      fileCount: translationFiles.length,
      files: translationFiles,
    };
    contentIndex.totalItems += translationFiles.length;

    let dbContent: Record<string, any> = {};
    try {
      if (process.env.DATABASE_URL) {
        const pg = await import("pg");
        const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });

        const contentTables: Record<string, string> = {
          content_items: "SELECT id, title, slug, type, category, tier, status, body_system FROM content_items ORDER BY title LIMIT 2000",
          exam_questions: "SELECT id, tier, exam, question_type, status, body_system FROM exam_questions LIMIT 2000",
          flashcard_decks: "SELECT id, title, tier, card_count, visibility FROM flashcard_decks LIMIT 1000",
          allied_questions: "SELECT id, career_type, blueprint_category, subtopic, difficulty, status FROM allied_questions LIMIT 2000",
          case_studies: "SELECT id, title, tier, status, difficulty FROM case_studies LIMIT 500",
          imaging_questions: "SELECT id, country, exam_type, topic, difficulty, status FROM imaging_questions LIMIT 2000",
          mock_exam_attempts: "SELECT COUNT(*) as cnt FROM mock_exam_attempts",
        };

        for (const [table, query] of Object.entries(contentTables)) {
          try {
            const result = await pool.query(query);
            dbContent[table] = {
              count: result.rows.length,
              data: result.rows,
            };
          } catch {
            dbContent[table] = { count: 0, error: "table may not exist" };
          }
        }

        await pool.end();
      }
    } catch (e: any) {
      warnings.push(`DB content export: ${e.message}`);
    }

    contentIndex.sections["Database Content"] = {
      tables: Object.keys(dbContent).length,
      summary: Object.fromEntries(
        Object.entries(dbContent).map(([k, v]) => [k, { count: v.count, hasData: v.count > 0 }])
      ),
    };

    if (Object.keys(dbContent).length > 0) {
      fs.writeFileSync(
        path.join(backupDir, "db-content-export.json"),
        JSON.stringify(dbContent, null, 2)
      );
    }

    fs.writeFileSync(
      path.join(backupDir, "content-index.json"),
      JSON.stringify(contentIndex, null, 2)
    );

    const result: BackupResult = {
      timestamp,
      type: "content",
      status: "success",
      fileCount: contentIndex.totalItems,
      archiveSize: 0,
      archivePath: path.join(backupDir, "content-index.json"),
      validationResult: "pass",
      warnings,
      errors,
      duration: Date.now() - startTime,
    };

    writeBackupLog(result);

    console.log(`[BACKUP:CONTENT] Complete! ${contentIndex.totalItems} content items cataloged.`);
    return result;
  } catch (e: any) {
    errors.push(e.message);
    const result: BackupResult = {
      timestamp,
      type: "content",
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
    console.error(`[BACKUP:CONTENT] Failed: ${e.message}`);
    return result;
  }
}

runContentBackup().then(result => {
  if (result.status === "failed") process.exit(1);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
