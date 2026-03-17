import type { Express } from "express";
import fs from "fs";
import path from "path";
import { requireAdmin } from "./admin-auth";

const ROOT = path.resolve(import.meta.dirname, "..");

export function registerBackupRoutes(app: Express) {
  app.post("/api/admin/backup/full", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runFullBackup } = await import("../backup-system/backup-full");
      const result = await runFullBackup();
      res.json({
        success: true,
        archivePath: result.archivePath,
        size: result.size,
        fileCount: result.fileCount,
        timestamp: result.timestamp,
      });
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
      res.json({
        success: true,
        outputDir: result.outputDir,
        fileCount: result.fileCount,
        timestamp: result.timestamp,
      });
    } catch (err: any) {
      console.error("DB backup error:", err);
      res.status(500).json({ error: err.message || "DB backup failed" });
    }
  });

  app.post("/api/admin/backup/assets", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runAssetsBackup } = await import("../backup-system/backup-assets");
      const result = await runAssetsBackup();
      res.json({
        success: true,
        outputDir: result.outputDir,
        fileCount: result.fileCount,
        timestamp: result.timestamp,
      });
    } catch (err: any) {
      console.error("Assets backup error:", err);
      res.status(500).json({ error: err.message || "Assets backup failed" });
    }
  });

  app.post("/api/admin/backup/deployment", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { runDeploymentExport } = await import("../backup-system/export-deployment");
      const result = await runDeploymentExport();
      res.json({
        success: true,
        outputDir: result.outputDir,
        fileCount: result.fileCount,
        timestamp: result.timestamp,
      });
    } catch (err: any) {
      console.error("Deployment export error:", err);
      res.status(500).json({ error: err.message || "Deployment export failed" });
    }
  });

  app.post("/api/admin/backup/validate", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { validateBackupArchive } = await import("../backup-system/validate-backup");
      const archivePath = typeof req.body?.archivePath === "string" ? req.body.archivePath : undefined;
      const result = await validateBackupArchive(archivePath);
      res.json({ success: true, ...result });
    } catch (err: any) {
      console.error("Backup validation error:", err);
      res.status(500).json({ error: err.message || "Validation failed" });
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
      const files = fs.readdirSync(backupsDir)
        .filter((f) => f.endsWith(".zip"))
        .sort()
        .reverse();
      if (files.length === 0) {
        return res.status(404).json({ error: "No backup archives found" });
      }
      const filePath = path.join(backupsDir, files[0]);
      const stat = fs.statSync(filePath);
      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${files[0]}"`,
        "Content-Length": String(stat.size),
      });
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Download failed" });
    }
  });
}
