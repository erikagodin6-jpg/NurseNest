import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "../..");

const EXCLUDE_PATTERNS = [
  "node_modules",
  "dist",
  ".git",
  ".DS_Store",
  "*.tar.gz",
  "backups",
  "exports",
  ".env",
  ".env.local",
  ".env.production",
];

export interface BackupResult {
  timestamp: string;
  type: string;
  status: "success" | "failed";
  fileCount: number;
  archiveSize: number;
  archivePath: string;
  validationResult: string;
  warnings: string[];
  errors: string[];
  duration: number;
}

export function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

export function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function collectFiles(baseDir: string, patterns: string[], excludePatterns: string[] = EXCLUDE_PATTERNS): string[] {
  const files: string[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(baseDir, fullPath);

      const shouldExclude = excludePatterns.some((pat) => {
        if (pat.startsWith("*.")) {
          return entry.name.endsWith(pat.slice(1));
        }
        return relPath.split(path.sep).some((seg) => seg === pat);
      });

      if (shouldExclude) continue;

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const matchesPattern = patterns.length === 0 || patterns.some((p) => {
          if (p === "**/*") return true;
          if (p.startsWith("*.")) return entry.name.endsWith(p.slice(1));
          if (p.includes("/")) return relPath.startsWith(p);
          return relPath.includes(p);
        });

        if (matchesPattern) {
          files.push(relPath);
        }
      }
    }
  }

  walk(baseDir);
  return files;
}

export function generateFileManifest(baseDir: string, files: string[]): object {
  const manifest: any = {
    generatedAt: new Date().toISOString(),
    totalFiles: files.length,
    totalSizeBytes: 0,
    files: [],
  };

  for (const f of files) {
    const fullPath = path.join(baseDir, f);
    try {
      const stat = fs.statSync(fullPath);
      manifest.files.push({
        path: f,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      });
      manifest.totalSizeBytes += stat.size;
    } catch {
      manifest.files.push({ path: f, size: 0, modified: null, error: "stat failed" });
    }
  }

  return manifest;
}

export function createZipArchive(sourceDir: string, files: string[], outputPath: string): number {
  ensureDir(path.dirname(outputPath));

  const fileListPath = path.join(sourceDir, ".backup-file-list.tmp");
  fs.writeFileSync(fileListPath, files.join("\n"));

  try {
    execSync(`cd "${sourceDir}" && cat .backup-file-list.tmp | zip -@ "${outputPath}" 2>/dev/null || true`, {
      stdio: "pipe",
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch {
    const JSZip = require("jszip");
    const zip = new JSZip();
    for (const f of files) {
      const fullPath = path.join(sourceDir, f);
      if (fs.existsSync(fullPath)) {
        zip.file(f, fs.readFileSync(fullPath));
      }
    }
    const content = zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync(outputPath, content);
  } finally {
    if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath);
  }

  if (fs.existsSync(outputPath)) {
    return fs.statSync(outputPath).size;
  }
  return 0;
}

export function writeBackupLog(result: BackupResult): void {
  const logsDir = path.join(PROJECT_ROOT, "backups", "logs");
  ensureDir(logsDir);

  const logFile = path.join(logsDir, `backup-${result.type}-${result.timestamp}.json`);
  fs.writeFileSync(logFile, JSON.stringify(result, null, 2));

  const historyFile = path.join(PROJECT_ROOT, "backups", "logs", "backup-history.json");
  let history: BackupResult[] = [];
  if (fs.existsSync(historyFile)) {
    try {
      history = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
    } catch {
      history = [];
    }
  }
  history.push(result);
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
}

export function getCodeFiles(): string[] {
  return collectFiles(PROJECT_ROOT, ["**/*"]);
}

export function getConfigFiles(): string[] {
  const configs = [
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "vite.config.ts",
    "drizzle.config.ts",
    "postcss.config.js",
    "tailwind.config.ts",
    "tailwind.config.js",
    ".env.example",
  ];
  return configs.filter((f) => fs.existsSync(path.join(PROJECT_ROOT, f)));
}

export function getTranslationFiles(): string[] {
  const translationDirs = ["client/public/locales", "shared/translations", "translations"];
  const files: string[] = [];
  for (const dir of translationDirs) {
    const fullDir = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(fullDir)) {
      files.push(...collectFiles(fullDir, ["*.json"]).map((f) => path.join(dir, f)));
    }
  }
  return files;
}

export function getMigrationFiles(): string[] {
  const migDir = path.join(PROJECT_ROOT, "migrations");
  if (!fs.existsSync(migDir)) return [];
  return collectFiles(migDir, ["**/*"]).map((f) => path.join("migrations", f));
}

export function getAssetPatterns(): string[] {
  return ["*.png", "*.jpg", "*.jpeg", "*.svg", "*.ico", "*.gif", "*.webp", "*.mp4", "*.mp3", "*.wav", "*.pdf"];
}

export { PROJECT_ROOT, EXCLUDE_PATTERNS };
