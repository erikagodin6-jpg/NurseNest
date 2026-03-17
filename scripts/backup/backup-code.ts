import fs from "fs";
import path from "path";
import {
  PROJECT_ROOT,
  getTimestamp,
  ensureDir,
  collectFiles,
  generateFileManifest,
  writeBackupLog,
  type BackupResult,
} from "./backup-engine";

async function runCodeBackup() {
  const startTime = Date.now();
  const timestamp = getTimestamp();
  const backupDir = path.join(PROJECT_ROOT, "backups", "code");
  ensureDir(backupDir);

  console.log(`[BACKUP:CODE] Starting code backup at ${timestamp}`);

  const warnings: string[] = [];
  const errors: string[] = [];

  try {
    const codePatterns = ["client/", "server/", "shared/", "script/", "scripts/"];
    const files = collectFiles(PROJECT_ROOT, codePatterns);

    const configFiles = [
      "package.json", "tsconfig.json", "vite.config.ts",
      "drizzle.config.ts", "postcss.config.js",
    ].filter((f) => fs.existsSync(path.join(PROJECT_ROOT, f)));

    const allFiles = [...files, ...configFiles];

    const manifest = generateFileManifest(PROJECT_ROOT, allFiles);
    const manifestPath = path.join(backupDir, `code-manifest-${timestamp}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    const result: BackupResult = {
      timestamp,
      type: "code",
      status: "success",
      fileCount: allFiles.length,
      archiveSize: 0,
      archivePath: manifestPath,
      validationResult: "pass",
      warnings,
      errors,
      duration: Date.now() - startTime,
    };

    writeBackupLog(result);

    console.log(`[BACKUP:CODE] Complete! ${allFiles.length} files cataloged.`);
    console.log(`  Manifest: ${manifestPath}`);
    return result;
  } catch (e: any) {
    errors.push(e.message);
    const result: BackupResult = {
      timestamp,
      type: "code",
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
    console.error(`[BACKUP:CODE] Failed: ${e.message}`);
    return result;
  }
}

runCodeBackup().then(result => {
  if (result.status === "failed") process.exit(1);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
