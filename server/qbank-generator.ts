import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import { renderPromptForVariant, getActiveTemplates } from "./prompts/qbank-templates";

let globalKillSwitch = false;
let dailyTokenCost = 0;
let dailyCostResetDate = "";
const MAX_DAILY_TOKEN_COST = 500000;

function resetDailyCostIfNeeded() {
  const today = new Date().toISOString().split("T")[0];
  if (dailyCostResetDate !== today) {
    dailyTokenCost = 0;
    dailyCostResetDate = today;
  }
}

async function getOpenAI() {
  const OpenAI = (await import("openai")).default;
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

async function aiGenerate(systemPrompt: string, userPrompt: string, model: string, maxTokens = 16000): Promise<{ content: string; tokensUsed: number }> {
  const openai = await getOpenAI();
  const response = await openai.chat.completions.create({
    model: model.startsWith("openai/") ? model : `openai/${model}`,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
  });
  const tokensUsed = response.usage?.total_tokens || 0;
  dailyTokenCost += tokensUsed;
  return { content: response.choices[0]?.message?.content || "", tokensUsed };
}

function parseJsonFromResponse(text: string): any {
  try {
    const arrMatch = text.match(/\[[\s\S]*\]/);
    if (arrMatch) return JSON.parse(arrMatch[0]);
    const objMatch = text.match(/\{[\s\S]*\}/);
    if (objMatch) return JSON.parse(objMatch[0]);
    return null;
  } catch {
    return null;
  }
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  domainReport: Record<string, { actual: number; expected: [number, number]; withinTolerance: boolean }>;
  formatReport: Record<string, { actual: number; expected: number }>;
  rationaleStats: { min: number; max: number; avg: number; belowThreshold: number };
}

function validateGeneratedBatch(
  questions: any[],
  variant: any,
  validationRules: any
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const domainReport: Record<string, { actual: number; expected: [number, number]; withinTolerance: boolean }> = {};
  const formatReport: Record<string, { actual: number; expected: number }> = {};
  const tolerance = validationRules?.domainTolerance || 0.03;
  const rationaleMin = validationRules?.rationaleMinWords || 250;

  const totalQ = questions.length;

  if (variant.domainWeights && Object.keys(variant.domainWeights).length > 0) {
    const domainCounts: Record<string, number> = {};
    for (const q of questions) {
      const domain = q.clientNeedDomain || q.domain || "Unknown";
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    }
    for (const [domain, [min, max]] of Object.entries(variant.domainWeights) as [string, [number, number]][]) {
      const actual = (domainCounts[domain] || 0) / totalQ;
      const withinTolerance = actual >= min - tolerance && actual <= max + tolerance;
      domainReport[domain] = { actual: Math.round(actual * 100), expected: [min * 100, max * 100], withinTolerance };
      if (!withinTolerance) {
        errors.push(`Domain "${domain}": ${(actual * 100).toFixed(1)}% outside range ${(min * 100).toFixed(0)}%-${(max * 100).toFixed(0)}% (+-${(tolerance * 100).toFixed(0)}%)`);
      }
    }
  }

  if (variant.requiredTypeMix && Object.keys(variant.requiredTypeMix).length > 0) {
    const totalExpected = Object.values(variant.requiredTypeMix as Record<string, number>).reduce((a: number, b: number) => a + b, 0);
    const scale = totalQ / totalExpected;
    const formatCounts: Record<string, number> = {};
    for (const q of questions) {
      const fmt = q.questionType || "UNKNOWN";
      formatCounts[fmt] = (formatCounts[fmt] || 0) + 1;
    }
    for (const [fmt, baseCount] of Object.entries(variant.requiredTypeMix as Record<string, number>)) {
      const expected = Math.max(1, Math.round(baseCount * scale));
      const actual = formatCounts[fmt] || 0;
      formatReport[fmt] = { actual, expected };
      if (actual < expected * 0.5) {
        warnings.push(`Format "${fmt}": got ${actual}, expected ~${expected}`);
      }
    }
  }

  let minWords = Infinity, maxWords = 0, totalWords = 0, belowThreshold = 0;
  for (const q of questions) {
    const rationale = q.rationale || q.rationaleLong || "";
    const wc = rationale.split(/\s+/).filter(Boolean).length;
    if (wc < minWords) minWords = wc;
    if (wc > maxWords) maxWords = wc;
    totalWords += wc;
    if (wc < rationaleMin) belowThreshold++;
  }
  const avgWords = totalQ > 0 ? Math.round(totalWords / totalQ) : 0;
  if (minWords === Infinity) minWords = 0;

  if (belowThreshold > 0) {
    warnings.push(`${belowThreshold}/${totalQ} rationales below ${rationaleMin} word minimum`);
  }

  if (variant.formatRules?.prohibited) {
    for (const q of questions) {
      if (variant.formatRules.prohibited.includes(q.questionType)) {
        errors.push(`Prohibited format "${q.questionType}" found in generated questions`);
        break;
      }
    }
  }

  const scopeChecks = validationRules?.scopeChecks || [];
  if (scopeChecks.includes("pn_scope") && variant.examKey?.includes("PN")) {
    for (const q of questions) {
      const stem = (q.stem || "").toLowerCase();
      if (stem.includes("independent nursing judgment") || stem.includes("delegate to rn")) {
        warnings.push("Possible RN-scope content found in PN question set");
        break;
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    domainReport,
    formatReport,
    rationaleStats: { min: minWords, max: maxWords, avg: avgWords, belowThreshold },
  };
}

async function runBatchGeneration(params: {
  templateKey: string;
  variantKey: string;
  count: number;
  rationaleMinWords: number;
  dryRun: boolean;
  ingest: boolean;
  model: string;
  triggeredBy: string;
  scheduleId?: string;
}): Promise<{ runId: string; status: string; validationReport: any; previewItems: any[]; totalGenerated: number; totalAccepted: number; totalRejected: number; tokenCost: number }> {
  resetDailyCostIfNeeded();

  if (globalKillSwitch) {
    throw new Error("Generation kill switch is active");
  }
  if (dailyTokenCost >= MAX_DAILY_TOKEN_COST) {
    throw new Error("Daily token cost limit exceeded");
  }

  const rendered = await renderPromptForVariant(params.templateKey, params.variantKey, {
    count: params.count,
    rationaleMinWords: params.rationaleMinWords,
  });
  if (!rendered) {
    throw new Error(`Template "${params.templateKey}" or variant "${params.variantKey}" not found`);
  }

  const templateRes = await pool.query("SELECT id FROM qbank_prompt_templates WHERE key = $1", [params.templateKey]);
  const templateId = templateRes.rows[0]?.id || "";

  const runRes = await pool.query(
    `INSERT INTO qbank_generation_runs (template_id, template_key, variant_key, exam_key, region, target_count, status, is_dry_run, model, triggered_by, schedule_id)
     VALUES ($1, $2, $3, $4, $5, $6, 'queued', $7, $8, $9, $10) RETURNING id`,
    [templateId, params.templateKey, params.variantKey, rendered.variant.examKey, rendered.variant.region, params.count, params.dryRun, params.model, params.triggeredBy, params.scheduleId || null]
  );
  const runId = runRes.rows[0].id;

  try {
    await pool.query("UPDATE qbank_generation_runs SET status = 'running', started_at = NOW() WHERE id = $1", [runId]);

    let allQuestions: any[] = [];
    let totalTokens = 0;
    const chunkSize = params.count <= 25 ? params.count : 15;
    const chunks = Math.ceil(params.count / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const remaining = params.count - allQuestions.length;
      const thisChunkCount = Math.min(chunkSize, remaining);
      if (thisChunkCount <= 0) break;

      const chunkRendered = await renderPromptForVariant(params.templateKey, params.variantKey, {
        count: thisChunkCount,
        rationaleMinWords: params.rationaleMinWords,
      });
      if (!chunkRendered) break;

      const maxTokensForCall = Math.max(4000, thisChunkCount * 1500);
      const { content, tokensUsed } = await aiGenerate(
        chunkRendered.systemPrompt,
        chunkRendered.userPrompt,
        params.model,
        Math.min(maxTokensForCall, 32000)
      );
      totalTokens += tokensUsed;

      const parsed = parseJsonFromResponse(content);
      if (Array.isArray(parsed)) {
        allQuestions = allQuestions.concat(parsed);
      } else if (parsed) {
        allQuestions.push(parsed);
      }

      if (dailyTokenCost >= MAX_DAILY_TOKEN_COST) {
        break;
      }
    }

    await pool.query("UPDATE qbank_generation_runs SET status = 'validating' WHERE id = $1", [runId]);

    const validationReport = validateGeneratedBatch(allQuestions, rendered.variant, rendered.validationRules);

    const accepted = allQuestions.filter((q: any) => {
      const rationale = q.rationale || q.rationaleLong || "";
      const wc = rationale.split(/\s+/).filter(Boolean).length;
      return q.stem && (q.options?.length >= 2 || q.questionType === "HIGHLIGHT_TEXT") && wc >= Math.floor(params.rationaleMinWords * 0.7);
    });
    const rejected = allQuestions.length - accepted.length;

    const previewItems = accepted.slice(0, 5).map((q: any) => ({
      questionType: q.questionType || "MCQ",
      domain: q.clientNeedDomain || q.domain || "N/A",
      difficulty: q.difficulty || 3,
      tags: q.tags || [],
      rationaleWordCount: (q.rationale || q.rationaleLong || "").split(/\s+/).filter(Boolean).length,
      stem: (q.stem || "").substring(0, 150),
    }));

    await pool.query(
      `UPDATE qbank_generation_runs SET
        status = 'completed', generated_count = $1, accepted_count = $2, rejected_count = $3,
        validation_report = $4, preview_items = $5, generated_items = $6, token_cost = $7, completed_at = NOW()
       WHERE id = $8`,
      [
        allQuestions.length, accepted.length, rejected,
        JSON.stringify(validationReport), JSON.stringify(previewItems),
        params.dryRun ? JSON.stringify(accepted) : null,
        totalTokens, runId,
      ]
    );

    if (params.ingest && !params.dryRun && validationReport.valid) {
      await ingestQuestions(runId, accepted, rendered.variant, params.templateKey);
    }

    return {
      runId,
      status: "completed",
      validationReport,
      previewItems,
      totalGenerated: allQuestions.length,
      totalAccepted: accepted.length,
      totalRejected: rejected,
      tokenCost: totalTokens,
    };
  } catch (err: any) {
    await pool.query(
      "UPDATE qbank_generation_runs SET status = 'failed', error_message = $1, completed_at = NOW() WHERE id = $2",
      [err.message || "Unknown error", runId]
    );
    throw err;
  }
}

async function ingestQuestions(runId: string, questions: any[], variant: any, templateKey: string): Promise<void> {
  const isNursing = templateKey === "ngn_batch_v1";
  const isAllied = templateKey === "allied_batch_v1";

  for (const q of questions) {
    if (isNursing || templateKey === "cnpe_v1" || templateKey === "np_us_v1") {
      const tier = variant.examKey.includes("PN") ? "rpn" : "rn";
      const region = variant.region === "Canada" ? "CAN" : "US";
      await pool.query(
        `INSERT INTO exam_questions (tier, exam, question_type, status, stem, options, correct_answer, rationale, difficulty, tags, body_system, topic, subtopic, region_scope, career_type)
         VALUES ($1, $2, $3, 'draft', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'nursing')`,
        [
          tier, variant.examKey, q.questionType || "MCQ", q.stem,
          JSON.stringify(q.options || []), JSON.stringify(q.correctAnswer || []),
          q.rationale || q.rationaleLong || "", q.difficulty || 3,
          q.tags || [], q.bodySystem || q.domain || q.clientNeedDomain || null,
          q.topic || q.clientNeedDomain || q.domain || null,
          q.subtopic || q.subCategory || q.subDomain || null,
          region === "CAN" ? "CAN" : region === "US" ? "US" : "BOTH",
        ]
      );
    } else if (isAllied) {
      const careerMap: Record<string, string> = {
        mlt: "mlt", pharm_tech: "pharmacyTech", paramedic: "paramedic",
        rrt: "rrt", imaging: "imaging", ot: "ot", pt: "pt",
        psychotherapist: "psychotherapist", social_worker: "socialWorker",
        addictions_worker: "addictionsWorker",
      };
      const careerType = careerMap[variant.variantKey] || variant.variantKey;
      await pool.query(
        `INSERT INTO allied_questions (career_type, stem, options, correct_answer, rationale_long, learning_objective, blueprint_category, subtopic, difficulty, cognitive_level, question_type, exam_trap, clinical_pearls, safety_note, distractor_rationales, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'pending')`,
        [
          careerType, q.stem, JSON.stringify(q.options || []),
          typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
          q.rationale || q.rationaleLong || "", q.learningObjective || "",
          q.domain || q.blueprintCategory || "", q.subtopic || q.subDomain || "",
          q.difficulty || 3, q.cognitiveLevel || "application",
          q.questionType || "MCQ_SINGLE", q.examTrap || null,
          JSON.stringify(q.clinicalPearls || []), q.safetyNote || null,
          JSON.stringify(q.distractorRationales || []),
        ]
      );
    }
  }

  await pool.query("UPDATE qbank_generation_runs SET ingested = true WHERE id = $1", [runId]);
}

export function setupQBankGenerator(app: Express): void {
  app.post("/api/admin/qbank/generate-ngn-batch", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const {
        templateKey = "ngn_batch_v1",
        variantKey = "rexpn_can",
        count = 25,
        rationaleMinWords = 250,
        dryRun = true,
        ingest = false,
        model = "gpt-4o-mini",
      } = req.body;

      if (count < 1 || count > 200) {
        return res.status(400).json({ error: "Count must be between 1 and 200" });
      }

      const result = await runBatchGeneration({
        templateKey,
        variantKey,
        count: Math.min(count, 200),
        rationaleMinWords: Math.max(100, Math.min(rationaleMinWords, 1000)),
        dryRun,
        ingest: ingest && !dryRun,
        model,
        triggeredBy: "manual",
      });

      res.json(result);
    } catch (err: any) {
      console.error("[QBank Generator] Error:", err.message);
      res.status(500).json({ error: err.message || "Generation failed" });
    }
  });

  app.get("/api/admin/qbank/generate-ngn-batch/:runId", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const r = await pool.query("SELECT * FROM qbank_generation_runs WHERE id = $1", [req.params.runId]);
      if (!r.rows[0]) return res.status(404).json({ error: "Run not found" });

      const run = r.rows[0];
      res.json({
        id: run.id,
        templateKey: run.template_key,
        variantKey: run.variant_key,
        examKey: run.exam_key,
        region: run.region,
        targetCount: run.target_count,
        generatedCount: run.generated_count,
        acceptedCount: run.accepted_count,
        rejectedCount: run.rejected_count,
        status: run.status,
        isDryRun: run.is_dry_run,
        ingested: run.ingested,
        validationReport: run.validation_report,
        previewItems: run.preview_items,
        tokenCost: run.token_cost,
        model: run.model,
        errorMessage: run.error_message,
        triggeredBy: run.triggered_by,
        startedAt: run.started_at,
        completedAt: run.completed_at,
        createdAt: run.created_at,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/qbank/generation-runs", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { templateKey, status, limit = "25" } = req.query;
      let query = "SELECT * FROM qbank_generation_runs WHERE 1=1";
      const params: any[] = [];
      let idx = 1;

      if (templateKey) {
        query += ` AND template_key = $${idx++}`;
        params.push(templateKey);
      }
      if (status) {
        query += ` AND status = $${idx++}`;
        params.push(status);
      }
      query += ` ORDER BY created_at DESC LIMIT $${idx++}`;
      params.push(Math.min(parseInt(String(limit)) || 25, 100));

      const r = await pool.query(query, params);
      res.json(r.rows.map((run: any) => ({
        id: run.id,
        templateKey: run.template_key,
        variantKey: run.variant_key,
        examKey: run.exam_key,
        region: run.region,
        targetCount: run.target_count,
        generatedCount: run.generated_count,
        acceptedCount: run.accepted_count,
        rejectedCount: run.rejected_count,
        status: run.status,
        isDryRun: run.is_dry_run,
        ingested: run.ingested,
        validationReport: run.validation_report,
        tokenCost: run.token_cost,
        model: run.model,
        errorMessage: run.error_message,
        triggeredBy: run.triggered_by,
        createdAt: run.created_at,
        completedAt: run.completed_at,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/qbank/generation-runs/:runId/ingest", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const r = await pool.query("SELECT * FROM qbank_generation_runs WHERE id = $1", [req.params.runId]);
      if (!r.rows[0]) return res.status(404).json({ error: "Run not found" });

      const run = r.rows[0];
      if (run.status !== "completed") {
        return res.status(400).json({ error: "Only completed runs can be ingested" });
      }
      if (run.ingested) {
        return res.status(400).json({ error: "Run already ingested" });
      }
      if (!run.generated_items) {
        return res.status(400).json({ error: "No generated items available for ingestion" });
      }

      const items = typeof run.generated_items === "string" ? JSON.parse(run.generated_items) : run.generated_items;

      const templateRes = await pool.query("SELECT * FROM qbank_prompt_templates WHERE key = $1", [run.template_key]);
      const template = templateRes.rows[0];
      const variants = typeof template?.variants === "string" ? JSON.parse(template.variants) : template?.variants;
      const variant = variants?.find((v: any) => v.variantKey === run.variant_key) || { examKey: run.exam_key, region: run.region, variantKey: run.variant_key };

      await ingestQuestions(run.id, items, variant, run.template_key);
      res.json({ success: true, ingested: items.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/qbank/generation-runs/:runId/cancel", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const r = await pool.query("SELECT status FROM qbank_generation_runs WHERE id = $1", [req.params.runId]);
      if (!r.rows[0]) return res.status(404).json({ error: "Run not found" });

      const { status } = r.rows[0];
      if (status !== "queued" && status !== "running") {
        return res.status(400).json({ error: "Can only cancel queued or running generations" });
      }

      await pool.query(
        "UPDATE qbank_generation_runs SET status = 'cancelled', completed_at = NOW() WHERE id = $1",
        [req.params.runId]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/qbank/prompt-templates", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const templates = await getActiveTemplates();
      res.json(templates);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/qbank/kill-switch", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    globalKillSwitch = !!req.body.enabled;
    res.json({ killSwitch: globalKillSwitch });
  });

  app.get("/api/admin/qbank/token-usage", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    resetDailyCostIfNeeded();
    res.json({
      dailyTokenCost,
      maxDailyTokenCost: MAX_DAILY_TOKEN_COST,
      killSwitch: globalKillSwitch,
      remainingBudget: MAX_DAILY_TOKEN_COST - dailyTokenCost,
    });
  });
}

export { runBatchGeneration };
