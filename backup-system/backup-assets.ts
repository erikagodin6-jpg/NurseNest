import fs from "fs";
import path from "path";
import { logBackup } from "./backup-logger";

const ROOT = path.resolve(import.meta.dirname, "..");

const ASSET_SOURCES = [
  { src: "public", patterns: [".svg", ".png", ".jpg", ".jpeg", ".ico", ".webp", ".gif", ".pdf"] },
  { src: "attached_assets", patterns: [".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"] },
  { src: "client/src/assets", patterns: [".svg", ".png", ".jpg", ".jpeg", ".webp", ".css"] },
  { src: "data", patterns: [".json"] },
];

const TRANSLATION_DIRS = [
  "client/src/i18n",
  "client/src/translations",
  "client/src/locales",
  "shared/i18n",
  "shared/translations",
  "data/translations",
];

function copyDir(srcDir: string, destDir: string, extensions: string[] | null, fileCount: { count: number }, errors: string[]) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, extensions, fileCount, errors);
    } else {
      if (extensions) {
        const ext = path.extname(entry.name).toLowerCase();
        if (!extensions.includes(ext)) continue;
      }
      try {
        fs.copyFileSync(srcPath, destPath);
        fileCount.count++;
      } catch (err: any) {
        errors.push(`Failed to copy ${srcPath}: ${err.message}`);
      }
    }
  }
}

export async function runAssetsBackup(): Promise<{
  outputDir: string;
  fileCount: number;
  timestamp: string;
}> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDir = path.join(ROOT, "backups", "assets", timestamp);
  fs.mkdirSync(outputDir, { recursive: true });

  const fileCount = { count: 0 };
  const errors: string[] = [];

  for (const source of ASSET_SOURCES) {
    const srcDir = path.join(ROOT, source.src);
    if (fs.existsSync(srcDir)) {
      const destDir = path.join(outputDir, source.src);
      copyDir(srcDir, destDir, source.patterns, fileCount, errors);
    }
  }

  for (const tDir of TRANSLATION_DIRS) {
    const srcDir = path.join(ROOT, tDir);
    if (fs.existsSync(srcDir)) {
      const destDir = path.join(outputDir, "translations", path.basename(tDir));
      copyDir(srcDir, destDir, null, fileCount, errors);
    }
  }

  const seoFiles = ["robots.txt", "sitemap.xml", "sitemap-index.xml"];
  for (const sf of seoFiles) {
    const srcPath = path.join(ROOT, "public", sf);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(outputDir, "seo", sf);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      fileCount.count++;
    }
  }

  const status = errors.length > 0 ? "partial" : "success";

  await logBackup({
    type: "assets",
    timestamp: new Date().toISOString(),
    archivePath: outputDir,
    size: 0,
    fileCount: fileCount.count,
    status,
  });

  return { outputDir, fileCount: fileCount.count, timestamp: new Date().toISOString(), errors };
}

if (process.argv[1] && process.argv[1].includes("backup-assets")) {
  runAssetsBackup()
    .then((result) => {
      console.log("Assets backup completed:");
      console.log(`  Output: ${result.outputDir}`);
      console.log(`  Files: ${result.fileCount}`);
      console.log(`  Timestamp: ${result.timestamp}`);
    })
    .catch((err) => {
      console.error("Assets backup failed:", err);
      process.exit(1);
    });
}
