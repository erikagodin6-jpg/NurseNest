import type { Express } from "express";
import { requireAdmin } from "./admin-auth";
import { runExpansionForTier, runFullExpansion, getExpansionStatus } from "./qbank-expansion-engine";

const activeExpansions = new Map<string, { status: string; summary?: any; error?: string }>();

export function registerExpansionEngineRoutes(app: Express) {
  app.post("/api/admin/expansion-engine/start", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { tier, targetCount } = req.body;
      const validTiers = ["rpn", "rn", "np"];

      if (!tier || !validTiers.includes(tier)) {
        return res.status(400).json({ error: `Invalid tier. Must be one of: ${validTiers.join(", ")}` });
      }

      const count = targetCount ? parseInt(targetCount) : undefined;
      if (count !== undefined && (isNaN(count) || count < 1 || count > 5000)) {
        return res.status(400).json({ error: "targetCount must be between 1 and 5000" });
      }

      const key = `expansion-${tier}`;
      if (activeExpansions.has(key) && activeExpansions.get(key)?.status === "running") {
        return res.status(409).json({ error: `Expansion for ${tier} is already running` });
      }

      activeExpansions.set(key, { status: "running" });
      res.json({ ok: true, message: `Started ${tier.toUpperCase()} expansion for ${count || "default"} questions`, key });

      runExpansionForTier(tier, count, (progress) => {
        console.log(`[Expansion Route] Progress: batch ${progress.batchNumber}, ${progress.questionsGenerated} questions`);
      }).then((summary) => {
        activeExpansions.set(key, { status: "complete", summary });
      }).catch((err) => {
        console.error(`[Expansion Route] Error:`, err);
        activeExpansions.set(key, { status: "failed", error: err.message });
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/expansion-engine/start-full", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      if (activeExpansions.has("expansion-full") && activeExpansions.get("expansion-full")?.status === "running") {
        return res.status(409).json({ error: "Full expansion is already running" });
      }

      activeExpansions.set("expansion-full", { status: "running" });
      res.json({ ok: true, message: "Started full 3,700-question expansion across all tiers (rpn=1000, rn=1500, np=1200)" });

      runFullExpansion((progress) => {
        console.log(`[Expansion Full] Progress: batch ${progress.batchNumber} (${progress.tier}), ${progress.questionsGenerated} questions`);
      }).then((result) => {
        activeExpansions.set("expansion-full", { status: "complete", summary: result });
      }).catch((err) => {
        console.error(`[Expansion Full] Error:`, err);
        activeExpansions.set("expansion-full", { status: "failed", error: err.message });
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/expansion-engine/status", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const dbStatus = await getExpansionStatus();
      const runningJobs: Record<string, any> = {};

      activeExpansions.forEach((val, key) => {
        runningJobs[key] = val;
      });

      res.json({
        ...dbStatus,
        activeJobs: runningJobs,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/expansion-engine/summary/:tier", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { tier } = req.params;
      const key = `expansion-${tier}`;
      const job = activeExpansions.get(key);

      if (!job) {
        return res.status(404).json({ error: `No expansion found for tier ${tier}` });
      }

      res.json(job);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
