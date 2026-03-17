import type { Express } from "express";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { requireAdmin } from "./admin-auth";

const PROJECT_ROOT = process.cwd();

function getBackupHistory(): any[] {
  const historyFile = path.join(PROJECT_ROOT, "backups", "logs", "backup-history.json");
  if (!fs.existsSync(historyFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(historyFile, "utf-8"));
  } catch {
    return [];
  }
}

function getLatestByType(history: any[]): Record<string, any> {
  const latest: Record<string, any> = {};
  for (const entry of history) {
    if (!latest[entry.type] || entry.timestamp > latest[entry.type].timestamp) {
      latest[entry.type] = entry;
    }
  }
  return latest;
}

function getBackupFiles(): { name: string; size: number; modified: string }[] {
  const backupDir = path.join(PROJECT_ROOT, "backups");
  if (!fs.existsSync(backupDir)) return [];

  const files: { name: string; size: number; modified: string }[] = [];
  const entries = fs.readdirSync(backupDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && (entry.name.endsWith(".zip") || entry.name.endsWith(".json"))) {
      const stat = fs.statSync(path.join(backupDir, entry.name));
      files.push({
        name: entry.name,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      });
    }
  }
  return files.sort((a, b) => b.modified.localeCompare(a.modified));
}

function getManifestList(): string[] {
  const manifestDir = path.join(PROJECT_ROOT, "backups", "manifests");
  if (!fs.existsSync(manifestDir)) return [];
  return fs.readdirSync(manifestDir).filter((f) => f.endsWith(".json"));
}

export function registerBackupRoutes(app: Express) {
  app.get("/api/admin/backups/status", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const history = getBackupHistory();
      const latestByType = getLatestByType(history);
      const files = getBackupFiles();
      const manifests = getManifestList();

      const missingWarnings: string[] = [];
      const expectedTypes = ["full", "code", "db", "assets", "content"];
      for (const type of expectedTypes) {
        if (!latestByType[type]) {
          missingWarnings.push(`No ${type} backup found`);
        }
      }

      res.json({
        latestByType,
        totalBackups: history.length,
        backupFiles: files,
        manifests,
        missingWarnings,
        activeBuildPriority: "BACKUP_EXPORT_RECOVERY_SYSTEM",
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/backups/history", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const history = getBackupHistory();
      res.json(history.slice(-50).reverse());
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/backups/manifests", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const manifestDir = path.join(PROJECT_ROOT, "backups", "manifests");
      if (!fs.existsSync(manifestDir)) {
        return res.json([]);
      }

      const manifestFiles = fs.readdirSync(manifestDir).filter((f) => f.endsWith(".json"));
      const manifests = manifestFiles.map((f) => {
        try {
          const content = JSON.parse(fs.readFileSync(path.join(manifestDir, f), "utf-8"));
          return { name: f, summary: content.generatedAt || null, keys: Object.keys(content).length };
        } catch {
          return { name: f, summary: null, keys: 0 };
        }
      });

      res.json(manifests);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/backups/run", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    const { type } = req.body;
    const validTypes: Record<string, string> = {
      full: "scripts/backup/backup-full.ts",
      code: "scripts/backup/backup-code.ts",
      db: "scripts/backup/backup-db.ts",
      assets: "scripts/backup/backup-assets.ts",
      content: "scripts/backup/backup-content.ts",
      "deployment-export": "scripts/backup/export-deployment.ts",
      "restore-validate": "scripts/backup/restore-validate.ts",
      "restore-dry-run": "scripts/backup/restore-dry-run.ts",
      manifests: "scripts/backup/generate-manifests.ts",
      inventory: "scripts/backup/generate-critical-file-inventory.ts",
    };

    if (!type || !validTypes[type]) {
      return res.status(400).json({ error: `Invalid backup type. Valid: ${Object.keys(validTypes).join(", ")}` });
    }

    try {
      const scriptPath = path.join(PROJECT_ROOT, validTypes[type]);
      if (!fs.existsSync(scriptPath)) {
        return res.status(404).json({ error: `Script not found: ${validTypes[type]}` });
      }

      const output = execSync(`npx tsx "${scriptPath}"`, {
        cwd: PROJECT_ROOT,
        timeout: 120000,
        maxBuffer: 10 * 1024 * 1024,
        env: { ...process.env },
      }).toString();

      res.json({ status: "success", type, output: output.slice(-2000) });
    } catch (e: any) {
      res.status(500).json({
        status: "failed",
        type,
        error: e.message,
        output: e.stdout?.toString().slice(-1000) || "",
      });
    }
  });

  app.get("/api/admin/backups/logs", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const logsDir = path.join(PROJECT_ROOT, "backups", "logs");
      if (!fs.existsSync(logsDir)) {
        return res.json([]);
      }

      const logFiles = fs.readdirSync(logsDir)
        .filter((f) => f.endsWith(".json") && f !== "backup-history.json")
        .sort()
        .reverse()
        .slice(0, 30);

      const logs = logFiles.map((f) => {
        try {
          return JSON.parse(fs.readFileSync(path.join(logsDir, f), "utf-8"));
        } catch {
          return { file: f, error: "parse failed" };
        }
      });

      res.json(logs);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
