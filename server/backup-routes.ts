import type { Express } from "express";
import fs from "fs";
import path from "path";
import { requireAdmin } from "./admin-auth";

const ROOT = path.resolve(process.cwd());

export function registerBackupRoutes(app: Express) {
  app.post("/api/admin/backup/full", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runFullBackup } = await import("../backup-system/backup-full");
      const includeStripe = req.body?.includeStripe === true;
      const includeObjectStorage = req.body?.includeObjectStorage === true;
      const downloadFiles = req.body?.downloadObjectStorageFiles === true;
      const result = await runFullBackup({ includeStripe, includeObjectStorage, downloadObjectStorageFiles: downloadFiles });
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Full backup error:", err);
      res.status(500).json({ error: err.message || "Backup failed" });
    }
  });

  app.post("/api/admin/backup/db", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runDbBackup } = await import("../backup-system/backup-db");
      const result = await runDbBackup();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("DB backup error:", err);
      res.status(500).json({ error: err.message || "DB backup failed" });
    }
  });

  app.post("/api/admin/backup/content", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runContentBackup } = await import("../backup-system/backup-content");
      const result = await runContentBackup();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Content backup error:", err);
      res.status(500).json({ error: err.message || "Content backup failed" });
    }
  });

  app.post("/api/admin/backup/assets", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runAssetsBackup } = await import("../backup-system/backup-assets");
      const result = await runAssetsBackup();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Assets backup error:", err);
      res.status(500).json({ error: err.message || "Assets backup failed" });
    }
  });

  app.post("/api/admin/backup/stripe", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runStripeBackup } = await import("../backup-system/backup-stripe");
      const result = await runStripeBackup();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Stripe backup error:", err);
      res.status(500).json({ error: err.message || "Stripe backup failed" });
    }
  });

  app.post("/api/admin/backup/object-storage", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runObjectStorageBackup } = await import("../backup-system/backup-object-storage");
      const downloadFiles = req.body?.downloadFiles === true;
      const result = await runObjectStorageBackup({ downloadFiles });
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Object storage backup error:", err);
      res.status(500).json({ error: err.message || "Object storage backup failed" });
    }
  });

  app.post("/api/admin/backup/env-inventory", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runEnvInventory } = await import("../backup-system/backup-env-inventory");
      const result = await runEnvInventory();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Env inventory error:", err);
      res.status(500).json({ error: err.message || "Env inventory failed" });
    }
  });

  app.post("/api/admin/backup/render", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runRenderBackup } = await import("../backup-system/backup-render");
      const result = await runRenderBackup();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Render backup error:", err);
      res.status(500).json({ error: err.message || "Render backup failed" });
    }
  });

  app.post("/api/admin/backup/code-archive", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runCodeArchive } = await import("../backup-system/backup-code-archive");
      const result = await runCodeArchive();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Code archive error:", err);
      res.status(500).json({ error: err.message || "Code archive failed" });
    }
  });

  app.post("/api/admin/backup/verify", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { verifyBackup } = await import("../backup-system/backup-verify");
      const backupPath = typeof req.body?.backupPath === "string" ? req.body.backupPath : undefined;
      const result = await verifyBackup(backupPath);
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Backup verification error:", err);
      res.status(500).json({ error: err.message || "Verification failed" });
    }
  });

  app.post("/api/admin/backup/validate", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { verifyBackup } = await import("../backup-system/backup-verify");
      const backupPath = typeof req.body?.backupPath === "string" ? req.body.backupPath : undefined;
      const result = await verifyBackup(backupPath);
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Backup validation error:", err);
      res.status(500).json({ error: err.message || "Validation failed" });
    }
  });

  app.post("/api/admin/backup/retention", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { enforceRetention } = await import("../backup-system/retention");
      const keepCount = typeof req.body?.keepCount === "number" ? req.body.keepCount : 7;
      const result = enforceRetention(keepCount);
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Retention error:", err);
      res.status(500).json({ error: err.message || "Retention cleanup failed" });
    }
  });

  app.post("/api/admin/backup/restore-test", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runRestoreTest } = await import("../backup-system/restore-test");
      const result = await runRestoreTest();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Restore test error:", err);
      res.status(500).json({ error: err.message || "Restore test failed" });
    }
  });

  app.post("/api/admin/backup/deployment", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runDeploymentExport } = await import("../backup-system/export-deployment");
      const result = await runDeploymentExport();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Deployment export error:", err);
      res.status(500).json({ error: err.message || "Deployment export failed" });
    }
  });

  app.get("/api/admin/backup/history", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { getBackupHistory } = await import("../backup-system/backup-logger");
      const history = getBackupHistory();
      res.json(history);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to get history" });
    }
  });

  app.get("/api/admin/backup/latest", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { getLatestBackupInfo } = await import("../backup-system/backup-logger");
      const latest = getLatestBackupInfo();
      res.json(latest || { message: "No backups found" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to get latest backup" });
    }
  });

  app.get("/api/admin/backup/download", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const backupsDir = path.join(ROOT, "backups");
      if (!fs.existsSync(backupsDir)) {
        return res.status(404).json({ error: "No backups directory found" });
      }

      const codeDir = path.join(backupsDir, "code");
      if (fs.existsSync(codeDir)) {
        const archives = fs.readdirSync(codeDir)
          .filter((f) => f.endsWith(".tar.gz"))
          .sort()
          .reverse();
        if (archives.length > 0) {
          const filePath = path.join(codeDir, archives[0]);
          const stat = fs.statSync(filePath);
          res.set({
            "Content-Type": "application/gzip",
            "Content-Disposition": `attachment; filename="${archives[0]}"`,
            "Content-Length": String(stat.size),
          });
          const stream = fs.createReadStream(filePath);
          stream.pipe(res);
          return;
        }
      }

      const zipFiles = fs.readdirSync(backupsDir)
        .filter((f) => f.endsWith(".zip"))
        .sort()
        .reverse();
      if (zipFiles.length > 0) {
        const filePath = path.join(backupsDir, zipFiles[0]);
        const stat = fs.statSync(filePath);
        res.set({
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename="${zipFiles[0]}"`,
          "Content-Length": String(stat.size),
        });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        return;
      }

      res.status(404).json({ error: "No backup archives found" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Download failed" });
    }
  });

  app.post("/api/admin/backup/restore-dry-run", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runRestoreDryRun } = await import("../scripts/backup/restore-dry-run");
      const result = await runRestoreDryRun();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Restore dry-run error:", err);
      res.status(500).json({ error: err.message || "Restore dry-run failed" });
    }
  });

  app.post("/api/admin/backup/generate-manifests", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { generateManifests } = await import("../scripts/backup/generate-manifests");
      const result = await generateManifests();
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Manifest generation error:", err);
      res.status(500).json({ error: err.message || "Manifest generation failed" });
    }
  });

  app.get("/api/admin/backup/status", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const backupsDir = path.join(ROOT, "backups");
      const status: Record<string, any> = {};

      const dirs = ["db", "content", "stripe", "object-storage", "env-inventory", "render", "assets", "code"];
      for (const dir of dirs) {
        const dirPath = path.join(backupsDir, dir);
        if (!fs.existsSync(dirPath)) {
          status[dir] = { exists: false, count: 0 };
          continue;
        }
        const entries = fs.readdirSync(dirPath);
        status[dir] = {
          exists: true,
          count: entries.length,
          latest: entries.sort().reverse()[0] || null,
        };
      }

      const { getBackupHistory } = await import("../backup-system/backup-logger");
      const history = getBackupHistory();
      const lastFull = history.find((h: any) => h.type === "full");

      res.json({
        backupDir: backupsDir,
        exists: fs.existsSync(backupsDir),
        components: status,
        lastFullBackup: lastFull || null,
        totalHistoryEntries: history.length,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Status check failed" });
    }
  });
}
