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

async function runAssetsBackup() {
  const startTime = Date.now();
  const timestamp = getTimestamp();
  const backupDir = path.join(PROJECT_ROOT, "backups", "assets");
  ensureDir(backupDir);

  console.log(`[BACKUP:ASSETS] Starting assets backup at ${timestamp}`);

  const warnings: string[] = [];
  const errors: string[] = [];

  try {
    const assetDirs = [
      { dir: "client/public", label: "Public assets" },
      { dir: "attached_assets", label: "Attached assets" },
    ];

    const assetIndex: any = {
      generatedAt: new Date().toISOString(),
      timestamp,
      categories: {},
      totalAssets: 0,
    };

    for (const { dir, label } of assetDirs) {
      const fullDir = path.join(PROJECT_ROOT, dir);
      if (!fs.existsSync(fullDir)) {
        warnings.push(`${label} directory not found: ${dir}`);
        continue;
      }

      const files = collectFiles(fullDir, ["**/*"], []);
      const categorized: Record<string, string[]> = {};

      for (const f of files) {
        const ext = path.extname(f).toLowerCase();
        let category = "other";
        if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext)) category = "images";
        else if ([".mp4", ".webm", ".mov"].includes(ext)) category = "video";
        else if ([".mp3", ".wav", ".ogg"].includes(ext)) category = "audio";
        else if ([".pdf"].includes(ext)) category = "documents";
        else if ([".ico"].includes(ext)) category = "icons";
        else if ([".json"].includes(ext)) category = "data";
        else if ([".css", ".js"].includes(ext)) category = "code";
        else if ([".docx", ".xlsx", ".txt"].includes(ext)) category = "documents";

        if (!categorized[category]) categorized[category] = [];
        categorized[category].push(path.join(dir, f));
      }

      assetIndex.categories[label] = {
        directory: dir,
        totalFiles: files.length,
        byType: Object.fromEntries(
          Object.entries(categorized).map(([k, v]) => [k, { count: v.length, files: v.slice(0, 50) }])
        ),
      };
      assetIndex.totalAssets += files.length;
    }

    const robotsPath = path.join(PROJECT_ROOT, "client", "public", "robots.txt");
    const sitemapPath = path.join(PROJECT_ROOT, "client", "public", "sitemap.xml");
    assetIndex.seoFiles = {
      robots: fs.existsSync(robotsPath),
      sitemap: fs.existsSync(sitemapPath),
    };

    fs.writeFileSync(
      path.join(backupDir, "asset-index.json"),
      JSON.stringify(assetIndex, null, 2)
    );

    const result: BackupResult = {
      timestamp,
      type: "assets",
      status: "success",
      fileCount: assetIndex.totalAssets,
      archiveSize: 0,
      archivePath: path.join(backupDir, "asset-index.json"),
      validationResult: "pass",
      warnings,
      errors,
      duration: Date.now() - startTime,
    };

    writeBackupLog(result);

    console.log(`[BACKUP:ASSETS] Complete! ${assetIndex.totalAssets} assets cataloged.`);
    return result;
  } catch (e: any) {
    errors.push(e.message);
    const result: BackupResult = {
      timestamp,
      type: "assets",
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
    console.error(`[BACKUP:ASSETS] Failed: ${e.message}`);
    return result;
  }
}

runAssetsBackup().then(result => {
  if (result.status === "failed") process.exit(1);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
