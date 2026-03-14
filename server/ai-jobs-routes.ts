import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import {
  createJob,
  startJob,
  pauseJob,
  cancelJob,
  getJobStatus,
  listJobs,
  isKillSwitchActive,
  setKillSwitch,
  getSpendCaps,
  setSpendCaps,
  getSpendSummary,
} from "./ai-job-queue";

export function registerAiJobsRoutes(app: Express): void {
  app.get("/api/admin/ai-jobs", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const limit = parseInt(String(req.query.limit || "50"));
      const offset = parseInt(String(req.query.offset || "0"));
      const jobs = await listJobs(limit, offset);
      const totalR = await pool.query("SELECT COUNT(*) as c FROM ai_jobs");
      res.json({ jobs, total: parseInt(totalR.rows[0]?.c || "0") });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ai-jobs/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const job = await getJobStatus(req.params.id);
      if (!job) return res.status(404).json({ error: "Job not found" });
      res.json({ job });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai-jobs", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { type, itemCount, costCap, config } = req.body;
      if (!type || !itemCount) {
        return res.status(400).json({ error: "type and itemCount are required" });
      }
      const validTypes = ["blog", "qbank", "allied"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ error: `Invalid type. Must be one of: ${validTypes.join(", ")}` });
      }
      const id = await createJob({
        type,
        itemCount: Math.min(Math.max(1, parseInt(itemCount)), 100),
        costCap: costCap ? parseFloat(costCap) : undefined,
        config: config || {},
        createdBy: admin.username || admin.id,
      });
      res.json({ id, message: "Job created. Use POST /api/admin/ai-jobs/:id/start to begin." });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai-jobs/:id/start", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await startJob(req.params.id);
      res.json({ message: "Job started" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai-jobs/:id/pause", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await pauseJob(req.params.id);
      res.json({ message: "Job paused" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai-jobs/:id/cancel", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await cancelJob(req.params.id);
      res.json({ message: "Job cancelled" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get("/api/admin/ai-kill-switch", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const active = await isKillSwitchActive();
      res.json({ active });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai-kill-switch", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { enabled } = req.body;
      if (typeof enabled !== "boolean") {
        return res.status(400).json({ error: "enabled must be a boolean" });
      }
      await setKillSwitch(enabled, admin.username || admin.id);
      res.json({ active: enabled, message: enabled ? "Kill switch activated. All AI jobs will stop." : "Kill switch deactivated. AI jobs can now run." });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ai-spend", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const summary = await getSpendSummary();
      res.json(summary);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ai-spend-caps", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const caps = await getSpendCaps();
      res.json(caps);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai-spend-caps", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { dailyCap, weeklyCap, perJobCap } = req.body;
      await setSpendCaps(
        { dailyCap: dailyCap ? parseFloat(dailyCap) : undefined, weeklyCap: weeklyCap ? parseFloat(weeklyCap) : undefined, perJobCap: perJobCap ? parseFloat(perJobCap) : undefined },
        admin.username || admin.id
      );
      const updated = await getSpendCaps();
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/business-health", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const spendSummary = await getSpendSummary();

      const contentStats = await pool.query(`
        SELECT 
          COUNT(*) FILTER (WHERE status = 'published') as published_count,
          COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
          COUNT(*) as total_count
        FROM content_items
      `);

      const aiJobStats = await pool.query(`
        SELECT 
          COUNT(*) as total_jobs,
          COUNT(*) FILTER (WHERE status = 'completed') as completed_jobs,
          COALESCE(SUM(items_completed), 0) as total_items_generated,
          COALESCE(SUM(actual_cost), 0) as total_ai_spend
        FROM ai_jobs
      `);

      let stripeMetrics = { activeSubscribers: 0, mrr: 0, totalRevenue: 0 };
      try {
        const { getUncachableStripeClient } = await import("./stripeClient");
        const stripe = await getUncachableStripeClient();
        
        const subscriptions = await stripe.subscriptions.list({ status: "active", limit: 100 });
        stripeMetrics.activeSubscribers = subscriptions.data.length;
        stripeMetrics.mrr = subscriptions.data.reduce((sum: number, sub: any) => {
          const amount = sub.items?.data?.[0]?.price?.unit_amount || 0;
          return sum + (amount / 100);
        }, 0);

        const charges = await stripe.charges.list({ limit: 100 });
        stripeMetrics.totalRevenue = charges.data
          .filter((c: any) => c.status === "succeeded")
          .reduce((sum: number, c: any) => sum + (c.amount / 100), 0);
      } catch (stripeErr: any) {
        console.error("[Business Health] Stripe error:", stripeErr.message);
      }

      const cs = contentStats.rows[0] || {};
      const js = aiJobStats.rows[0] || {};
      const totalAiSpend = parseFloat(String(js.total_ai_spend || "0"));
      const totalItemsGenerated = parseInt(String(js.total_items_generated || "0"));
      const costPerItem = totalItemsGenerated > 0 ? totalAiSpend / totalItemsGenerated : 0;
      const roi = totalAiSpend > 0 ? stripeMetrics.totalRevenue / totalAiSpend : 0;

      res.json({
        spend: spendSummary,
        content: {
          published: parseInt(String(cs.published_count || "0")),
          drafts: parseInt(String(cs.draft_count || "0")),
          total: parseInt(String(cs.total_count || "0")),
        },
        aiJobs: {
          totalJobs: parseInt(String(js.total_jobs || "0")),
          completedJobs: parseInt(String(js.completed_jobs || "0")),
          totalItemsGenerated,
          totalAiSpend,
          costPerItem,
        },
        revenue: stripeMetrics,
        roi,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
