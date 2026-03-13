import type { Express } from "express";
import { requireAdmin } from "./admin-auth";
import {
  runFullTranslationAudit,
  getAuditDashboardData,
  getAuditDetail,
  updateAuditOverride,
  bulkUpdateAudits,
  exportAuditData,
} from "./translation-audit-engine";

export function registerTranslationAuditRoutes(app: Express) {
  app.post("/api/admin/translation-audit/run", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const threshold = Math.max(0, Math.min(100, parseInt(String(req.body.indexingThreshold)) || 95));
      const result = await runFullTranslationAudit(threshold);
      res.json(result);
    } catch (e: any) {
      console.error("[TranslationAudit] Run error:", e);
      res.status(500).json({ error: "Failed to run translation audit" });
    }
  });

  app.get("/api/admin/translation-audit/dashboard", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const filters = {
        locale: req.query.locale as string | undefined,
        contentType: req.query.contentType as string | undefined,
        status: req.query.status as string | undefined,
        sitemapEligible: req.query.sitemapEligible === "true" ? true : req.query.sitemapEligible === "false" ? false : undefined,
        noindex: req.query.noindex === "true" ? true : req.query.noindex === "false" ? false : undefined,
        search: req.query.search as string | undefined,
        limit: parseInt(String(req.query.limit)) || 50,
        offset: parseInt(String(req.query.offset)) || 0,
      };

      const data = await getAuditDashboardData(filters);
      res.json(data);
    } catch (e: any) {
      console.error("[TranslationAudit] Dashboard error:", e);
      res.status(500).json({ error: "Failed to load dashboard data" });
    }
  });

  app.get("/api/admin/translation-audit/export/:format", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const format = req.params.format === "json" ? "json" : "csv";
      const filters = {
        locale: req.query.locale as string | undefined,
        contentType: req.query.contentType as string | undefined,
        status: req.query.status as string | undefined,
      };

      const data = await exportAuditData(format, filters);

      if (format === "csv") {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=translation-audit-${Date.now()}.csv`);
      } else {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename=translation-audit-${Date.now()}.json`);
      }

      res.send(data);
    } catch (e: any) {
      console.error("[TranslationAudit] Export error:", e);
      res.status(500).json({ error: "Failed to export audit data" });
    }
  });

  app.post("/api/admin/translation-audit/bulk", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { ids, action } = req.body;
      const validActions = ["mark_draft", "mark_ready", "remove_sitemap", "apply_noindex"];
      if (!Array.isArray(ids) || ids.length === 0 || ids.length > 500) {
        return res.status(400).json({ error: "ids must be a non-empty array (max 500)" });
      }
      if (!action || !validActions.includes(action)) {
        return res.status(400).json({ error: `action must be one of: ${validActions.join(", ")}` });
      }

      const updated = await bulkUpdateAudits(ids, action);
      res.json({ ok: true, updated });
    } catch (e: any) {
      console.error("[TranslationAudit] Bulk error:", e);
      res.status(500).json({ error: "Failed to perform bulk action" });
    }
  });

  app.get("/api/admin/translation-audit/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const detail = await getAuditDetail(req.params.id);
      if (!detail) {
        return res.status(404).json({ error: "Audit not found" });
      }
      res.json(detail);
    } catch (e: any) {
      console.error("[TranslationAudit] Detail error:", e);
      res.status(500).json({ error: "Failed to load audit detail" });
    }
  });

  app.patch("/api/admin/translation-audit/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { sitemapEligible, noindex, adminOverride, status } = req.body;
      const result = await updateAuditOverride(req.params.id, { sitemapEligible, noindex, adminOverride, status });
      res.json(result);
    } catch (e: any) {
      console.error("[TranslationAudit] Override error:", e);
      res.status(500).json({ error: "Failed to update audit override" });
    }
  });
}
