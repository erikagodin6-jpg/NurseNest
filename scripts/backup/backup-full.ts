import fs from "fs";
import path from "path";
import {
  PROJECT_ROOT,
  getTimestamp,
  ensureDir,
  collectFiles,
  generateFileManifest,
  writeBackupLog,
  getConfigFiles,
  getMigrationFiles,
  type BackupResult,
} from "./backup-engine";

async function runFullBackup() {
  const startTime = Date.now();
  const timestamp = getTimestamp();
  const backupDir = path.join(PROJECT_ROOT, "backups");
  const archiveName = `nursenest-backup-${timestamp}`;
  const stagingDir = path.join(backupDir, "staging", archiveName);

  console.log(`[BACKUP:FULL] Starting full backup at ${timestamp}`);

  const warnings: string[] = [];
  const errors: string[] = [];

  try {
    ensureDir(stagingDir);

    const sections = [
      { name: "source", patterns: ["client/", "server/", "shared/", "script/"], label: "Source Code" },
      { name: "config", patterns: ["package.json", "tsconfig.json", "vite.config.ts", "drizzle.config.ts", "postcss.config.js", ".replit", "replit.nix"], label: "Configuration" },
      { name: "migrations", patterns: ["migrations/"], label: "Database Migrations" },
      { name: "scripts", patterns: ["scripts/"], label: "Scripts" },
    ];

    let totalFiles = 0;

    for (const section of sections) {
      console.log(`  Collecting ${section.label}...`);
      const files = collectFiles(PROJECT_ROOT, section.patterns);
      const sectionDir = path.join(stagingDir, section.name);
      ensureDir(sectionDir);

      for (const f of files) {
        const src = path.join(PROJECT_ROOT, f);
        const dest = path.join(sectionDir, f);
        ensureDir(path.dirname(dest));
        try {
          fs.copyFileSync(src, dest);
          totalFiles++;
        } catch (e: any) {
          warnings.push(`Could not copy ${f}: ${e.message}`);
        }
      }
    }

    const configFiles = getConfigFiles();
    const configDir = path.join(stagingDir, "config");
    ensureDir(configDir);
    for (const f of configFiles) {
      const src = path.join(PROJECT_ROOT, f);
      const dest = path.join(configDir, f);
      ensureDir(path.dirname(dest));
      try {
        fs.copyFileSync(src, dest);
        totalFiles++;
      } catch (e: any) {
        warnings.push(`Config file ${f}: ${e.message}`);
      }
    }

    const migrationFiles = getMigrationFiles();
    const migDir = path.join(stagingDir, "migrations-copy");
    ensureDir(migDir);
    for (const f of migrationFiles) {
      const src = path.join(PROJECT_ROOT, f);
      const dest = path.join(migDir, path.basename(f));
      try {
        fs.copyFileSync(src, dest);
        totalFiles++;
      } catch (e: any) {
        warnings.push(`Migration file ${f}: ${e.message}`);
      }
    }

    if (fs.existsSync(path.join(PROJECT_ROOT, ".env.example"))) {
      fs.copyFileSync(
        path.join(PROJECT_ROOT, ".env.example"),
        path.join(stagingDir, ".env.example")
      );
      totalFiles++;
    }

    const manifest = generateFileManifest(stagingDir, collectFiles(stagingDir, ["**/*"], []));
    const manifestPath = path.join(stagingDir, "backup-manifest.json");
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    totalFiles++;

    const metadataPath = path.join(stagingDir, "backup-metadata.json");
    fs.writeFileSync(metadataPath, JSON.stringify({
      type: "full",
      timestamp,
      createdAt: new Date().toISOString(),
      version: "1.0.0",
      platform: "nursenest",
      totalFiles,
      warnings: warnings.length,
    }, null, 2));
    totalFiles++;

    const archivePath = path.join(backupDir, `${archiveName}.zip`);
    let archiveSize = 0;

    try {
      const { execSync } = await import("child_process");
      execSync(`cd "${stagingDir}" && zip -r "${archivePath}" . 2>/dev/null`, {
        stdio: "pipe",
        maxBuffer: 100 * 1024 * 1024,
      });
      archiveSize = fs.statSync(archivePath).size;
    } catch (zipErr: any) {
      errors.push(`zip command failed, archive not created: ${zipErr.message}`);
    }

    fs.rmSync(stagingDir, { recursive: true, force: true });
    const parentStaging = path.join(backupDir, "staging");
    try {
      const entries = fs.readdirSync(parentStaging);
      if (entries.length === 0) fs.rmdirSync(parentStaging);
    } catch {}

    const hasErrors = errors.length > 0;
    const result: BackupResult = {
      timestamp,
      type: "full",
      status: hasErrors ? "failed" : "success",
      fileCount: totalFiles,
      archiveSize,
      archivePath: archiveSize > 0 ? archivePath : "(not created)",
      validationResult: hasErrors ? "fail" : "pass",
      warnings,
      errors,
      duration: Date.now() - startTime,
    };

    writeBackupLog(result);

    console.log(`[BACKUP:FULL] Complete!`);
    console.log(`  Files: ${totalFiles}`);
    console.log(`  Archive: ${archiveSize > 0 ? `${(archiveSize / 1024 / 1024).toFixed(2)} MB` : "not created"}`);
    console.log(`  Duration: ${result.duration}ms`);
    if (warnings.length) console.log(`  Warnings: ${warnings.length}`);

    return result;
  } catch (e: any) {
    errors.push(e.message);
    const result: BackupResult = {
      timestamp,
      type: "full",
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
    console.error(`[BACKUP:FULL] Failed: ${e.message}`);
    return result;
  }
}

runFullBackup().then(result => {
  if (result.status === "failed") process.exit(1);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
