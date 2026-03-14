import type { Express } from "express";
import { requireAdmin } from "./admin-auth";
import { runExpansionForTier, runFullExpansion, getExpansionStatus, runCriticalCareSubspecialty, runFullCriticalCareExpansion, getCriticalCareExpansionStatus, runMedicalSpecialtySubspecialty, runFullMedicalSpecialtiesExpansion, getMedicalSpecialtiesExpansionStatus } from "./qbank-expansion-engine";

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

  app.post("/api/admin/expansion-engine/critical-care/start", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { subspecialty, targetCount } = req.body;
      const validSubspecialties = ["ICU Nursing", "Cardiac ICU", "Neuro ICU", "Trauma ICU", "PICU", "NICU"];

      if (!subspecialty || !validSubspecialties.includes(subspecialty)) {
        return res.status(400).json({ error: `Invalid subspecialty. Must be one of: ${validSubspecialties.join(", ")}` });
      }

      const count = targetCount ? parseInt(targetCount) : 500;
      if (isNaN(count) || count < 1 || count > 5000) {
        return res.status(400).json({ error: "targetCount must be between 1 and 5000" });
      }

      const key = `critical-care-${subspecialty.toLowerCase().replace(/\s+/g, "-")}`;
      if (activeExpansions.has(key) && activeExpansions.get(key)?.status === "running") {
        return res.status(409).json({ error: `Critical Care expansion for ${subspecialty} is already running` });
      }

      activeExpansions.set(key, { status: "running" });
      res.json({ ok: true, message: `Started Critical Care ${subspecialty} expansion for ${count} questions`, key });

      runCriticalCareSubspecialty(subspecialty, count, (progress) => {
        console.log(`[CriticalCare Route] Progress: batch ${progress.batchNumber}, ${progress.questionsGenerated} questions`);
      }).then((summary) => {
        activeExpansions.set(key, { status: "complete", summary });
      }).catch((err) => {
        console.error(`[CriticalCare Route] Error:`, err);
        activeExpansions.set(key, { status: "failed", error: err.message });
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/expansion-engine/critical-care/start-full", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      if (activeExpansions.has("critical-care-full") && activeExpansions.get("critical-care-full")?.status === "running") {
        return res.status(409).json({ error: "Full Critical Care expansion is already running" });
      }

      activeExpansions.set("critical-care-full", { status: "running" });
      res.json({ ok: true, message: "Started full 3,000-question Critical Care expansion across 6 subspecialties (500 each: ICU Nursing, Cardiac ICU, Neuro ICU, Trauma ICU, PICU, NICU)" });

      runFullCriticalCareExpansion((progress) => {
        console.log(`[CriticalCare Full] Progress: batch ${progress.batchNumber} (${progress.tier}), ${progress.questionsGenerated} questions`);
      }).then((result) => {
        activeExpansions.set("critical-care-full", { status: "complete", summary: result });
      }).catch((err) => {
        console.error(`[CriticalCare Full] Error:`, err);
        activeExpansions.set("critical-care-full", { status: "failed", error: err.message });
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/expansion-engine/critical-care/status", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const dbStatus = await getCriticalCareExpansionStatus();
      const runningJobs: Record<string, any> = {};

      activeExpansions.forEach((val, key) => {
        if (key.startsWith("critical-care")) {
          runningJobs[key] = val;
        }
      });

      res.json({
        ...dbStatus,
        activeJobs: runningJobs,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/expansion-engine/medical-specialties/start", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { subspecialty, targetCount } = req.body;
      const validSubspecialties = ["Cardiac Nursing", "Oncology Nursing", "Nephrology/Dialysis Nursing", "Gastroenterology Nursing", "Neurology/Stroke Nursing", "Pulmonary/Respiratory Nursing", "Endocrine Nursing"];

      if (!subspecialty || !validSubspecialties.includes(subspecialty)) {
        return res.status(400).json({ error: `Invalid subspecialty. Must be one of: ${validSubspecialties.join(", ")}` });
      }

      const count = targetCount ? parseInt(targetCount) : 500;
      if (isNaN(count) || count < 1 || count > 5000) {
        return res.status(400).json({ error: "targetCount must be between 1 and 5000" });
      }

      const key = `medical-specialties-${subspecialty.toLowerCase().replace(/[\s\/]+/g, "-")}`;
      if (activeExpansions.has(key) && activeExpansions.get(key)?.status === "running") {
        return res.status(409).json({ error: `Medical Specialties expansion for ${subspecialty} is already running` });
      }

      activeExpansions.set(key, { status: "running" });
      res.json({ ok: true, message: `Started Medical Specialties ${subspecialty} expansion for ${count} questions`, key });

      runMedicalSpecialtySubspecialty(subspecialty, count, (progress) => {
        console.log(`[MedicalSpecialties Route] Progress: batch ${progress.batchNumber}, ${progress.questionsGenerated} questions`);
      }).then((summary) => {
        activeExpansions.set(key, { status: "complete", summary });
      }).catch((err) => {
        console.error(`[MedicalSpecialties Route] Error:`, err);
        activeExpansions.set(key, { status: "failed", error: err.message });
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/expansion-engine/medical-specialties/start-full", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      if (activeExpansions.has("medical-specialties-full") && activeExpansions.get("medical-specialties-full")?.status === "running") {
        return res.status(409).json({ error: "Full Medical Specialties expansion is already running" });
      }

      activeExpansions.set("medical-specialties-full", { status: "running" });
      res.json({ ok: true, message: "Started full 3,500-question Medical Specialties expansion across 7 subspecialties (500 each: Cardiac Nursing, Oncology Nursing, Nephrology/Dialysis Nursing, Gastroenterology Nursing, Neurology/Stroke Nursing, Pulmonary/Respiratory Nursing, Endocrine Nursing)" });

      runFullMedicalSpecialtiesExpansion((progress) => {
        console.log(`[MedicalSpecialties Full] Progress: batch ${progress.batchNumber} (${progress.tier}), ${progress.questionsGenerated} questions`);
      }).then((result) => {
        activeExpansions.set("medical-specialties-full", { status: "complete", summary: result });
      }).catch((err) => {
        console.error(`[MedicalSpecialties Full] Error:`, err);
        activeExpansions.set("medical-specialties-full", { status: "failed", error: err.message });
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/expansion-engine/medical-specialties/status", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const dbStatus = await getMedicalSpecialtiesExpansionStatus();
      const runningJobs: Record<string, any> = {};

      activeExpansions.forEach((val, key) => {
        if (key.startsWith("medical-specialties")) {
          runningJobs[key] = val;
        }
      });

      res.json({
        ...dbStatus,
        activeJobs: runningJobs,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
