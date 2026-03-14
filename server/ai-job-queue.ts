import { pool } from "./storage";
import crypto from "crypto";

const GPT4O_MINI_INPUT_COST = 0.00015 / 1000;
const GPT4O_MINI_OUTPUT_COST = 0.0006 / 1000;
const AVG_COST_PER_1K_TOKENS = 0.0004;

const runningJobs = new Map<string, { cancel: boolean; pause: boolean }>();

function getDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getWeekKey(): string {
  const d = new Date();
  const dayOfWeek = d.getUTCDay();
  const diff = d.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setUTCDate(diff);
  return monday.toISOString().slice(0, 10);
}

export async function isKillSwitchActive(): Promise<boolean> {
  try {
    const r = await pool.query("SELECT value FROM system_settings WHERE key = 'ai_kill_switch'");
    if (r.rows.length === 0) return false;
    const val = r.rows[0].value;
    return val?.enabled === true;
  } catch {
    return false;
  }
}

export async function setKillSwitch(enabled: boolean, updatedBy: string): Promise<void> {
  await pool.query(
    `INSERT INTO system_settings (key, value, updated_at, updated_by)
     VALUES ('ai_kill_switch', $1, NOW(), $2)
     ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW(), updated_by = $2`,
    [JSON.stringify({ enabled }), updatedBy]
  );
}

export async function getSpendCaps(): Promise<{ dailyCap: number; weeklyCap: number; perJobCap: number }> {
  try {
    const r = await pool.query("SELECT value FROM system_settings WHERE key = 'ai_spend_caps'");
    if (r.rows.length === 0) return { dailyCap: 10, weeklyCap: 50, perJobCap: 5 };
    const val = r.rows[0].value;
    return {
      dailyCap: val?.dailyCap ?? 10,
      weeklyCap: val?.weeklyCap ?? 50,
      perJobCap: val?.perJobCap ?? 5,
    };
  } catch {
    return { dailyCap: 10, weeklyCap: 50, perJobCap: 5 };
  }
}

export async function setSpendCaps(caps: { dailyCap?: number; weeklyCap?: number; perJobCap?: number }, updatedBy: string): Promise<void> {
  const current = await getSpendCaps();
  const merged = { ...current, ...caps };
  await pool.query(
    `INSERT INTO system_settings (key, value, updated_at, updated_by)
     VALUES ('ai_spend_caps', $1, NOW(), $2)
     ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW(), updated_by = $2`,
    [JSON.stringify(merged), updatedBy]
  );
}

export async function getDailySpend(): Promise<number> {
  const dateKey = getDateKey();
  const r = await pool.query(
    "SELECT COALESCE(SUM(estimated_cost_usd), 0) as total FROM ai_spend_tracking WHERE date_key = $1",
    [dateKey]
  );
  return parseFloat(r.rows[0]?.total || "0");
}

export async function getWeeklySpend(): Promise<number> {
  const weekKey = getWeekKey();
  const r = await pool.query(
    "SELECT COALESCE(SUM(estimated_cost_usd), 0) as total FROM ai_spend_tracking WHERE week_key = $1",
    [weekKey]
  );
  return parseFloat(r.rows[0]?.total || "0");
}

export async function getJobSpend(jobId: string): Promise<number> {
  const r = await pool.query(
    "SELECT COALESCE(SUM(estimated_cost_usd), 0) as total FROM ai_spend_tracking WHERE job_id = $1",
    [jobId]
  );
  return parseFloat(r.rows[0]?.total || "0");
}

async function recordSpend(jobId: string, tokens: number, costUsd: number): Promise<void> {
  await pool.query(
    `INSERT INTO ai_spend_tracking (id, job_id, date_key, week_key, token_count, estimated_cost_usd)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [crypto.randomUUID(), jobId, getDateKey(), getWeekKey(), tokens, costUsd]
  );
}

async function checkSpendCaps(jobId: string, jobConfig?: any): Promise<{ allowed: boolean; reason?: string }> {
  const caps = await getSpendCaps();
  const [dailySpend, weeklySpend, jobSpend] = await Promise.all([
    getDailySpend(),
    getWeeklySpend(),
    getJobSpend(jobId),
  ]);

  if (dailySpend >= caps.dailyCap) {
    return { allowed: false, reason: `Daily spend cap reached ($${dailySpend.toFixed(2)} / $${caps.dailyCap})` };
  }
  if (weeklySpend >= caps.weeklyCap) {
    return { allowed: false, reason: `Weekly spend cap reached ($${weeklySpend.toFixed(2)} / $${caps.weeklyCap})` };
  }
  if (jobSpend >= caps.perJobCap) {
    return { allowed: false, reason: `Per-job spend cap reached ($${jobSpend.toFixed(2)} / $${caps.perJobCap})` };
  }
  const jobCostCap = jobConfig?.costCap;
  if (typeof jobCostCap === "number" && jobCostCap > 0 && jobSpend >= jobCostCap) {
    return { allowed: false, reason: `Job cost cap reached ($${jobSpend.toFixed(2)} / $${jobCostCap})` };
  }
  return { allowed: true };
}

function verifyProductionEnvironment(): { safe: boolean; env: string; dbHost: string; reason?: string } {
  const nodeEnv = process.env.NODE_ENV || "development";
  const dbUrl = process.env.DATABASE_URL || "";
  const dbHost = dbUrl.replace(/\/\/.*@/, "//***@").split("/")[2] || "unknown";
  if (!dbUrl) {
    return { safe: false, env: nodeEnv, dbHost, reason: "DATABASE_URL not set" };
  }
  if (nodeEnv === "production" && dbUrl.includes("localhost")) {
    return { safe: false, env: nodeEnv, dbHost, reason: "Production env pointing to localhost DB" };
  }
  return { safe: true, env: nodeEnv, dbHost };
}

async function checkDuplicate(type: string, title: string): Promise<boolean> {
  try {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    
    if (type === "blog") {
      const r = await pool.query(
        "SELECT id FROM content_items WHERE LOWER(title) = LOWER($1) OR slug = $2 LIMIT 1",
        [title, slug]
      );
      return r.rows.length > 0;
    }
    if (type === "qbank") {
      const r = await pool.query(
        "SELECT id FROM exam_questions WHERE LOWER(stem) = LOWER($1) LIMIT 1",
        [title]
      );
      return r.rows.length > 0;
    }
    if (type === "allied") {
      const r = await pool.query(
        "SELECT id FROM allied_questions WHERE LOWER(stem) = LOWER($1) LIMIT 1",
        [title]
      );
      return r.rows.length > 0;
    }
  } catch {}
  return false;
}

function addJobLog(jobId: string, logs: any[], message: string): any[] {
  const entry = { timestamp: new Date().toISOString(), message };
  const updated = [...logs, entry];
  if (updated.length > 200) updated.splice(0, updated.length - 200);
  return updated;
}

export async function createJob(params: {
  type: string;
  itemCount: number;
  costCap?: number;
  config?: any;
  createdBy: string;
}): Promise<string> {
  const killSwitch = await isKillSwitchActive();
  if (killSwitch) {
    throw new Error("AI Kill Switch is active. No new jobs can be created.");
  }

  const estimatedCost = params.itemCount * 0.02;
  const id = crypto.randomUUID();
  
  await pool.query(
    `INSERT INTO ai_jobs (id, type, status, config, item_count, cost_estimate, created_by, logs, progress)
     VALUES ($1, $2, 'pending', $3, $4, $5, $6, $7, $8)`,
    [
      id,
      params.type,
      JSON.stringify({ ...params.config, costCap: params.costCap }),
      params.itemCount,
      estimatedCost,
      params.createdBy,
      JSON.stringify([{ timestamp: new Date().toISOString(), message: `Job created: ${params.type} x${params.itemCount}` }]),
      JSON.stringify({ completed: 0, total: params.itemCount, duplicatesSkipped: 0 }),
    ]
  );

  return id;
}

export async function startJob(jobId: string): Promise<void> {
  const killSwitch = await isKillSwitchActive();
  if (killSwitch) {
    throw new Error("AI Kill Switch is active. Cannot start jobs.");
  }

  const job = await pool.query("SELECT * FROM ai_jobs WHERE id = $1", [jobId]);
  if (!job.rows[0]) throw new Error("Job not found");
  if (job.rows[0].status !== "pending" && job.rows[0].status !== "paused") {
    throw new Error(`Cannot start job with status: ${job.rows[0].status}`);
  }

  const envCheck = verifyProductionEnvironment();
  let logs = typeof job.rows[0].logs === "string" ? JSON.parse(job.rows[0].logs) : (job.rows[0].logs || []);

  if (!envCheck.safe) {
    logs = addJobLog(jobId, logs, `Environment check FAILED: ${envCheck.reason}`);
    await pool.query(
      "UPDATE ai_jobs SET status = 'failed', error = $2, logs = $3 WHERE id = $1",
      [jobId, `Production safeguard blocked: ${envCheck.reason}`, JSON.stringify(logs)]
    );
    throw new Error(`Production safeguard: ${envCheck.reason}`);
  }

  logs = addJobLog(jobId, logs, `Environment verified: ${envCheck.env}, DB: ${envCheck.dbHost}`);

  await pool.query(
    "UPDATE ai_jobs SET status = 'running', started_at = COALESCE(started_at, NOW()), logs = $2 WHERE id = $1",
    [jobId, JSON.stringify(logs)]
  );

  runningJobs.set(jobId, { cancel: false, pause: false });

  const freshJob = await pool.query("SELECT * FROM ai_jobs WHERE id = $1", [jobId]);
  executeJob(jobId, freshJob.rows[0]).catch(err => {
    console.error(`[AI Job ${jobId}] Execution error:`, err.message);
  });
}

export async function pauseJob(jobId: string): Promise<void> {
  const control = runningJobs.get(jobId);
  if (control) {
    control.pause = true;
  }
  await pool.query(
    "UPDATE ai_jobs SET status = 'paused' WHERE id = $1 AND status = 'running'",
    [jobId]
  );
}

export async function cancelJob(jobId: string): Promise<void> {
  const control = runningJobs.get(jobId);
  if (control) {
    control.cancel = true;
  }
  await pool.query(
    "UPDATE ai_jobs SET status = 'cancelled', cancelled_at = NOW() WHERE id = $1 AND status IN ('running', 'pending', 'paused')",
    [jobId]
  );
}

export async function getJobStatus(jobId: string): Promise<any> {
  const r = await pool.query("SELECT * FROM ai_jobs WHERE id = $1", [jobId]);
  return r.rows[0] || null;
}

export async function listJobs(limit: number = 50, offset: number = 0): Promise<any[]> {
  const r = await pool.query(
    "SELECT * FROM ai_jobs ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return r.rows;
}

async function executeJob(jobId: string, jobRow: any): Promise<void> {
  const type = jobRow.type;
  const itemCount = jobRow.item_count || 1;
  const config = typeof jobRow.config === "string" ? JSON.parse(jobRow.config) : (jobRow.config || {});
  let logs = typeof jobRow.logs === "string" ? JSON.parse(jobRow.logs) : (jobRow.logs || []);
  let completed = jobRow.items_completed || 0;
  let duplicatesSkipped = jobRow.duplicates_skipped || 0;
  let totalCost = jobRow.actual_cost || 0;
  const startIndex = completed + duplicatesSkipped;

  try {
    for (let i = startIndex; i < itemCount; i++) {
      const control = runningJobs.get(jobId);
      if (control?.cancel) {
        logs = addJobLog(jobId, logs, "Job cancelled by admin");
        await pool.query(
          "UPDATE ai_jobs SET status = 'cancelled', cancelled_at = NOW(), items_completed = $2, duplicates_skipped = $3, actual_cost = $4, logs = $5, progress = $6 WHERE id = $1",
          [jobId, completed, duplicatesSkipped, totalCost, JSON.stringify(logs), JSON.stringify({ completed, total: itemCount, duplicatesSkipped })]
        );
        runningJobs.delete(jobId);
        return;
      }

      if (control?.pause) {
        logs = addJobLog(jobId, logs, "Job paused by admin");
        await pool.query(
          "UPDATE ai_jobs SET status = 'paused', items_completed = $2, duplicates_skipped = $3, actual_cost = $4, logs = $5, progress = $6 WHERE id = $1",
          [jobId, completed, duplicatesSkipped, totalCost, JSON.stringify(logs), JSON.stringify({ completed, total: itemCount, duplicatesSkipped })]
        );
        runningJobs.delete(jobId);
        return;
      }

      const killSwitch = await isKillSwitchActive();
      if (killSwitch) {
        logs = addJobLog(jobId, logs, "Job stopped: Kill switch activated");
        await pool.query(
          "UPDATE ai_jobs SET status = 'stopped', items_completed = $2, duplicates_skipped = $3, actual_cost = $4, logs = $5, progress = $6, error = 'Kill switch activated' WHERE id = $1",
          [jobId, completed, duplicatesSkipped, totalCost, JSON.stringify(logs), JSON.stringify({ completed, total: itemCount, duplicatesSkipped })]
        );
        runningJobs.delete(jobId);
        return;
      }

      const spendCheck = await checkSpendCaps(jobId, config);
      if (!spendCheck.allowed) {
        logs = addJobLog(jobId, logs, `Job stopped: ${spendCheck.reason}`);
        await pool.query(
          "UPDATE ai_jobs SET status = 'stopped', items_completed = $2, duplicates_skipped = $3, actual_cost = $4, logs = $5, progress = $6, error = $7 WHERE id = $1",
          [jobId, completed, duplicatesSkipped, totalCost, JSON.stringify(logs), JSON.stringify({ completed, total: itemCount, duplicatesSkipped }), spendCheck.reason]
        );
        runningJobs.delete(jobId);
        return;
      }

      try {
        const result = await executeJobItem(type, i, config, jobId, logs);
        if (result.duplicate) {
          duplicatesSkipped++;
          logs = addJobLog(jobId, result.logs || logs, `Item ${i + 1}: Duplicate skipped`);
        } else {
          completed++;
          const itemCost = (result.tokens || 0) * AVG_COST_PER_1K_TOKENS / 1000;
          totalCost += itemCost;
          await recordSpend(jobId, result.tokens || 0, itemCost);
          logs = addJobLog(jobId, result.logs || logs, `Item ${i + 1}: Generated successfully (${result.tokens || 0} tokens, $${itemCost.toFixed(4)})`);
        }
      } catch (itemErr: any) {
        logs = addJobLog(jobId, logs, `Item ${i + 1}: Error - ${itemErr.message}`);
      }

      await pool.query(
        "UPDATE ai_jobs SET items_completed = $2, duplicates_skipped = $3, actual_cost = $4, logs = $5, progress = $6 WHERE id = $1",
        [jobId, completed, duplicatesSkipped, totalCost, JSON.stringify(logs), JSON.stringify({ completed, total: itemCount, duplicatesSkipped })]
      );
    }

    logs = addJobLog(jobId, logs, `Job completed: ${completed} items generated, ${duplicatesSkipped} duplicates skipped, $${totalCost.toFixed(4)} total cost`);
    await pool.query(
      "UPDATE ai_jobs SET status = 'completed', completed_at = NOW(), items_completed = $2, duplicates_skipped = $3, actual_cost = $4, logs = $5, progress = $6 WHERE id = $1",
      [jobId, completed, duplicatesSkipped, totalCost, JSON.stringify(logs), JSON.stringify({ completed, total: itemCount, duplicatesSkipped })]
    );
  } catch (err: any) {
    logs = addJobLog(jobId, logs, `Job failed: ${err.message}`);
    await pool.query(
      "UPDATE ai_jobs SET status = 'failed', error = $2, completed_at = NOW(), items_completed = $3, duplicates_skipped = $4, actual_cost = $5, logs = $6, progress = $7 WHERE id = $1",
      [jobId, err.message, completed, duplicatesSkipped, totalCost, JSON.stringify(logs), JSON.stringify({ completed, total: itemCount, duplicatesSkipped })]
    );
  } finally {
    runningJobs.delete(jobId);
  }
}

async function executeJobItem(type: string, index: number, config: any, jobId: string, logs: any[]): Promise<{ tokens: number; duplicate: boolean; logs: any[] }> {
  if (type === "blog") {
    return executeBlogItem(index, config, jobId, logs);
  }
  if (type === "qbank") {
    return executeQBankItem(index, config, jobId, logs);
  }
  if (type === "allied") {
    return executeAlliedItem(index, config, jobId, logs);
  }
  throw new Error(`Unknown job type: ${type}`);
}

async function executeBlogItem(index: number, config: any, jobId: string, logs: any[]): Promise<{ tokens: number; duplicate: boolean; logs: any[] }> {
  const { generateBlogPost } = await import("./blog-automation");
  const { LONG_TAIL_SEO_TOPICS } = await import("./blog-automation");
  
  const topic = config.topic || LONG_TAIL_SEO_TOPICS[index % LONG_TAIL_SEO_TOPICS.length]?.topic || `Nursing education topic ${index + 1}`;
  
  const isDuplicate = await checkDuplicate("blog", topic);
  if (isDuplicate) {
    return { tokens: 0, duplicate: true, logs };
  }

  const result = await generateBlogPost(topic);
  
  try {
    await pool.query(
      `INSERT INTO content_items (id, title, slug, content, summary, tags, status, tier, seo_title, seo_description, seo_keywords, primary_keyword, content_type, created_at, updated_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'draft', 'free', $6, $7, $8, $9, 'blog', NOW(), NOW())`,
      [result.title, result.slug, JSON.stringify(result.content), result.summary, result.tags, result.seoTitle, result.seoDescription, result.seoKeywords, result.primaryKeyword]
    );
  } catch (dbErr: any) {
    if (dbErr.message?.includes("duplicate")) {
      return { tokens: 0, duplicate: true, logs };
    }
    throw dbErr;
  }

  return { tokens: 8000, duplicate: false, logs };
}

async function executeQBankItem(index: number, config: any, jobId: string, logs: any[]): Promise<{ tokens: number; duplicate: boolean; logs: any[] }> {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });

  const examKey = config.examKey || "nclex-rn";
  const questionsPerItem = config.questionsPerItem || 10;
  const topic = config.topic || `${examKey} practice questions batch ${index + 1}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Generate NCLEX-style practice questions. Return valid JSON array of objects with: stem, options (array of 4), correctAnswer (0-3 index), rationale, category, difficulty (1-5)." },
      { role: "user", content: `Generate ${questionsPerItem} ${examKey.toUpperCase()} practice questions about: ${topic}. Return ONLY a JSON array.` },
    ],
    max_tokens: 8000,
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const tokens = response.usage?.total_tokens || 0;
  const content = response.choices[0]?.message?.content || "{}";

  let questions: any[] = [];
  try {
    const parsed = JSON.parse(content);
    questions = Array.isArray(parsed) ? parsed : (parsed.questions || []);
  } catch { questions = []; }

  let inserted = 0;
  for (const q of questions) {
    const isDup = await checkDuplicate("qbank", q.stem || "");
    if (isDup) continue;
    
    try {
      await pool.query(
        `INSERT INTO exam_questions (id, stem, options, correct_answer, rationale, category, difficulty, tier, status, exam_type, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 'free', 'draft', $7, NOW())`,
        [q.stem, JSON.stringify(q.options || []), q.correctAnswer || 0, q.rationale || "", q.category || "General", q.difficulty || 3, examKey]
      );
      inserted++;
    } catch {}
  }

  return { tokens, duplicate: inserted === 0 && questions.length > 0, logs };
}

async function executeAlliedItem(index: number, config: any, jobId: string, logs: any[]): Promise<{ tokens: number; duplicate: boolean; logs: any[] }> {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });

  const career = config.career || "respiratory_therapy";
  const topic = config.topic || `${career} certification practice questions batch ${index + 1}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Generate allied health certification practice questions. Return valid JSON array of objects with: stem, options (array with label and text), correctAnswer (letter), rationale, category, difficulty (1-5), questionType." },
      { role: "user", content: `Generate 10 ${career} certification exam questions about: ${topic}. Return ONLY JSON with a 'questions' array.` },
    ],
    max_tokens: 8000,
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const tokens = response.usage?.total_tokens || 0;
  const content = response.choices[0]?.message?.content || "{}";

  let questions: any[] = [];
  try {
    const parsed = JSON.parse(content);
    questions = Array.isArray(parsed) ? parsed : (parsed.questions || []);
  } catch { questions = []; }

  let inserted = 0;
  for (const q of questions) {
    const isDup = await checkDuplicate("allied", q.stem || "");
    if (isDup) continue;

    try {
      await pool.query(
        `INSERT INTO allied_questions (id, stem, options, correct_answer, rationale_long, blueprint_category, difficulty, career_type, status, question_type, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, 'draft', $8, NOW())`,
        [q.stem, JSON.stringify(q.options || []), q.correctAnswer || "A", q.rationale || "", q.category || "General", q.difficulty || 3, career, q.questionType || "MCQ_SINGLE"]
      );
      inserted++;
    } catch {}
  }

  return { tokens, duplicate: inserted === 0 && questions.length > 0, logs };
}

export async function getSpendSummary(): Promise<{
  daily: number;
  weekly: number;
  monthly: number;
  caps: { dailyCap: number; weeklyCap: number; perJobCap: number };
}> {
  const caps = await getSpendCaps();
  const daily = await getDailySpend();
  const weekly = await getWeeklySpend();

  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);
  const monthKey = monthStart.toISOString().slice(0, 10);
  const monthR = await pool.query(
    "SELECT COALESCE(SUM(estimated_cost_usd), 0) as total FROM ai_spend_tracking WHERE date_key >= $1",
    [monthKey]
  );
  const monthly = parseFloat(monthR.rows[0]?.total || "0");

  return { daily, weekly, monthly, caps };
}
