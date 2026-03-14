import type { Express } from "express";
import { requireAdmin } from "./admin-auth";
import { z } from "zod";
import {
  loadProviders, getProviders, addProvider, updateProvider, deleteProvider,
  getKillSwitch, setKillSwitch, getRouterStatus, getRequestLogs, getCostSummary,
  setBudgetLimits,
} from "./ai-provider-router";

const providerCreateSchema = z.object({
  name: z.string().min(1).max(100),
  providerType: z.enum(["openai", "ollama", "vllm", "lmstudio", "anthropic"]),
  endpointUrl: z.string().url(),
  apiKey: z.string().optional(),
  models: z.array(z.string()).default([]),
  costPerInputToken: z.number().min(0).default(0),
  costPerOutputToken: z.number().min(0).default(0),
  maxConcurrency: z.number().int().min(1).max(100).default(5),
  rateLimit: z.number().int().min(1).max(10000).default(60),
  healthEndpoint: z.string().url().nullable().optional(),
  priority: z.number().int().min(1).max(1000).default(100),
  enabled: z.boolean().default(true),
  taskTypes: z.array(z.string()).default([]),
});

const providerUpdateSchema = providerCreateSchema.partial();

export function setupAiOpsRoutes(app: Express): void {
  app.get("/api/admin/ai-ops/status", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const status = getRouterStatus();
      const providers = getProviders();
      res.json({
        ...status,
        providers: providers.map(p => ({
          id: p.id, name: p.name, providerType: p.providerType,
          endpointUrl: p.endpointUrl, models: p.models,
          costPerInputToken: p.costPerInputToken, costPerOutputToken: p.costPerOutputToken,
          maxConcurrency: p.maxConcurrency, rateLimit: p.rateLimit,
          priority: p.priority, enabled: p.enabled, isHealthy: p.isHealthy,
          lastHealthCheck: p.lastHealthCheck, consecutiveFailures: p.consecutiveFailures,
          taskTypes: p.taskTypes,
        })),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/ai-ops/providers", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const providers = getProviders();
      res.json(providers.map(p => ({
        id: p.id, name: p.name, providerType: p.providerType,
        endpointUrl: p.endpointUrl, models: p.models,
        costPerInputToken: p.costPerInputToken, costPerOutputToken: p.costPerOutputToken,
        maxConcurrency: p.maxConcurrency, rateLimit: p.rateLimit,
        healthEndpoint: p.healthEndpoint,
        priority: p.priority, enabled: p.enabled, isHealthy: p.isHealthy,
        lastHealthCheck: p.lastHealthCheck, consecutiveFailures: p.consecutiveFailures,
        taskTypes: p.taskTypes,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/ai-ops/providers", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const parsed = providerCreateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten().fieldErrors });
      }
      const provider = await addProvider(parsed.data);
      res.status(201).json(provider);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/admin/ai-ops/providers/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const parsed = providerUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten().fieldErrors });
      }
      const updated = await updateProvider(req.params.id, parsed.data);
      if (!updated) return res.status(404).json({ error: "Provider not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/admin/ai-ops/providers/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const deleted = await deleteProvider(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Provider not found" });
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/ai-ops/kill-switch", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { enabled } = req.body;
      if (typeof enabled !== "boolean") {
        return res.status(400).json({ error: "enabled must be a boolean" });
      }
      setKillSwitch(enabled);
      res.json({ killSwitch: getKillSwitch() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/ai-ops/cost-summary", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const summary = await getCostSummary();
      res.json(summary);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/ai-ops/request-logs", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { limit, providerId, taskType, since } = req.query;
      const logs = await getRequestLogs({
        limit: limit ? parseInt(String(limit)) : 100,
        providerId: providerId as string,
        taskType: taskType as string,
        since: since as string,
      });
      res.json(logs);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/ai-ops/providers/:id/toggle", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const providers = getProviders();
      const provider = providers.find(p => p.id === req.params.id);
      if (!provider) return res.status(404).json({ error: "Provider not found" });
      const updated = await updateProvider(req.params.id, { enabled: !provider.enabled });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/ai-ops/reload-providers", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await loadProviders();
      res.json({ success: true, providerCount: getProviders().length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/ai-ops/budget-limits", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const schema = z.object({
        dailyLimit: z.number().min(0).optional(),
        monthlyLimit: z.number().min(0).optional(),
      });
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten().fieldErrors });
      }
      setBudgetLimits(parsed.data.dailyLimit, parsed.data.monthlyLimit);
      const status = getRouterStatus();
      res.json({ dailyBudgetLimit: status.dailyBudgetLimit, monthlyBudgetLimit: status.monthlyBudgetLimit });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}
