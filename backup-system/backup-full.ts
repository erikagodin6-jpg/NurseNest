import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { logBackup } from "./backup-logger";

const ROOT = path.resolve(import.meta.dirname, "..");

const INCLUDE_DIRS = [
  "client",
  "server",
  "shared",
  "script",
  "scripts",
  "public",
  "data",
  "migrations",
  "backup-system",
];

const INCLUDE_FILES = [
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "drizzle.config.ts",
  "vite.config.ts",
  "postcss.config.js",
  "components.json",
  ".env.example",
  "replit.md",
  "vite-plugin-meta-images.ts",
  "gen_sw.js",
  "translate.cjs",
];

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".cache",
  "dist",
  ".git",
  ".local",
  "backups",
  "exports",
]);

const EXCLUDE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico"]);

function shouldExclude(relPath: string): boolean {
  const parts = relPath.split(path.sep);
  return parts.some((p) => EXCLUDE_DIRS.has(p));
}

function addDirToZip(zip: JSZip, dirPath: string, zipPath: string, fileCount: { count: number }, errors: string[]) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const entryZipPath = path.join(zipPath, entry.name);
    if (shouldExclude(entryZipPath)) continue;
    if (entry.isDirectory()) {
      addDirToZip(zip, fullPath, entryZipPath, fileCount, errors);
    } else {
      try {
        const content = fs.readFileSync(fullPath);
        zip.file(entryZipPath, content);
        fileCount.count++;
      } catch (err: any) {
        errors.push(`Failed to read ${fullPath}: ${err.message}`);
      }
    }
  }
}

export async function runFullBackup(): Promise<{
  archivePath: string;
  size: number;
  fileCount: number;
  timestamp: string;
}> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupsDir = path.join(ROOT, "backups");
  fs.mkdirSync(backupsDir, { recursive: true });

  const zip = new JSZip();
  const fileCount = { count: 0 };
  const errors: string[] = [];

  for (const dir of INCLUDE_DIRS) {
    const dirPath = path.join(ROOT, dir);
    if (fs.existsSync(dirPath)) {
      addDirToZip(zip, dirPath, dir, fileCount, errors);
    }
  }

  for (const file of INCLUDE_FILES) {
    const filePath = path.join(ROOT, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath);
        zip.file(file, content);
        fileCount.count++;
      } catch (err: any) {
        errors.push(`Failed to read ${filePath}: ${err.message}`);
      }
    }
  }

  const zipBuffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  const archiveName = `nursenest-full-backup-${timestamp}.zip`;
  const archivePath = path.join(backupsDir, archiveName);
  fs.writeFileSync(archivePath, zipBuffer);

  const size = zipBuffer.length;
  const status = errors.length > 0 ? "partial" : "success";

  await logBackup({
    type: "full",
    timestamp: new Date().toISOString(),
    archivePath,
    size,
    fileCount: fileCount.count,
    status,
  });

  return { archivePath, size, fileCount: fileCount.count, timestamp: new Date().toISOString(), errors };
}

if (process.argv[1] && process.argv[1].includes("backup-full")) {
  runFullBackup()
    .then((result) => {
      console.log("Full backup completed:");
      console.log(`  Archive: ${result.archivePath}`);
      console.log(`  Size: ${(result.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  Files: ${result.fileCount}`);
      console.log(`  Timestamp: ${result.timestamp}`);
    })
    .catch((err) => {
      console.error("Full backup failed:", err);
      process.exit(1);
    });
}
