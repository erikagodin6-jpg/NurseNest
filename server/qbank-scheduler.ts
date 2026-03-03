import type { Express, Request, Response } from "express";
import { pool } from "./storage";

let schedulerInterval: NodeJS.Timeout | null = null;

async function requireAdmin(req: Request, res: Response): Promise<any> {
  const username = String((req.body as any)?.username || req.query?.username || "");
  const password = String((req.body as any)?.password || req.query?.password || "");
  if (username && password) {
    const r = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2 AND tier = 'admin'", [username, password]);
    if (r.rows[0]) return r.rows[0];
  }
  const adminId = String(req.headers?.["x-admin-id"] || (req.body as any)?.adminId || req.query?.adminId || "");
  if (adminId) {
    const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
    if (r.rows[0]) return r.rows[0];
  }
  res.status(401).json({ error: "Admin required" });
  return null;
}

function calculateNextRunAt(frequency: string, runTimeHour: number, customCronDays?: number[]): Date {
  const now = new Date();
  const next = new Date(now);
  next.setUTCMinutes(0, 0, 0);
  next.setUTCHours(runTimeHour);

  if (next <= now) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  if (frequency === "daily") {
    return next;
  }

  if (frequency === "weekly") {
    const dayOfWeek = next.getUTCDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
    if (daysUntilMonday > 0) {
      next.setUTCDate(next.getUTCDate() + daysUntilMonday);
    }
    return next;
  }

  if (frequency === "custom" && customCronDays && customCronDays.length > 0) {
    const sorted = [...customCronDays].sort((a, b) => a - b);
    for (let i = 0; i < 8; i++) {
      const candidate = new Date(now);
      candidate.setUTCDate(candidate.getUTCDate() + i);
      candidate.setUTCHours(runTimeHour, 0, 0, 0);
      if (candidate > now && sorted.includes(candidate.getUTCDay())) {
        return candidate;
      }
    }
    return next;
  }

  return next;
}

async function getRunCountToday(scheduleId: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0];
  const r = await pool.query(
    "SELECT COUNT(*) as c FROM qbank_generation_runs WHERE schedule_id = $1 AND created_at::date = $2::date",
    [scheduleId, today]
  );
  return parseInt(r.rows[0]?.c || "0");
}

async function triggerScheduledRun(schedule: any): Promise<void> {
  console.log(`[QBank Scheduler] Triggering scheduled run: ${schedule.name} (${schedule.exam_key})`);

  try {
    const runResult = await pool.query(
      `INSERT INTO qbank_generation_runs (template_key, variant_key, exam_key, region, target_count, status, is_dry_run, triggered_by, schedule_id, template_id, model)
       VALUES ($1, $2, $3, $4, $5, 'queued', $6, 'schedule', $7, $8, 'gpt-4o-mini') RETURNING id`,
      [
        schedule.template_key,
        schedule.variant_key,
        schedule.exam_key,
        schedule.region,
        schedule.questions_per_run || 25,
        !schedule.auto_ingest,
        schedule.id,
        "",
      ]
    );
    const runId = runResult.rows[0].id;

    await pool.query(
      `UPDATE qbank_generation_schedules SET last_run_at = NOW(), total_runs_completed = COALESCE(total_runs_completed, 0) + 1, next_run_at = $1, updated_at = NOW() WHERE id = $2`,
      [
        calculateNextRunAt(
          schedule.frequency || "daily",
          schedule.run_time_hour ?? 3,
          schedule.custom_cron_days
        ),
        schedule.id,
      ]
    );

    console.log(`[QBank Scheduler] Created run ${runId} for schedule ${schedule.name}`);

    try {
      const { renderPromptForVariant } = await import("./prompts/qbank-templates");
      const rendered = await renderPromptForVariant(schedule.template_key, schedule.variant_key, {
        count: schedule.questions_per_run || 25,
        rationaleMinWords: schedule.rationale_min_words || 250,
      });

      if (!rendered) {
        await pool.query(
          "UPDATE qbank_generation_runs SET status = 'failed', error_message = $1, completed_at = NOW() WHERE id = $2",
          ["Template or variant not found", runId]
        );
        return;
      }

      await pool.query("UPDATE qbank_generation_runs SET status = 'running', started_at = NOW() WHERE id = $1", [runId]);

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const response = await openai.chat.completions.create({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: rendered.systemPrompt },
          { role: "user", content: rendered.userPrompt },
        ],
        max_tokens: 16000,
        temperature: 0.7,
      });

      const tokenCost = response.usage?.total_tokens || 0;
      const content = response.choices[0]?.message?.content || "";

      let questions: any[] = [];
      try {
        const arrMatch = content.match(/\[[\s\S]*\]/);
        if (arrMatch) questions = JSON.parse(arrMatch[0]);
        else {
          const objMatch = content.match(/\{[\s\S]*\}/);
          if (objMatch) questions = [JSON.parse(objMatch[0])];
        }
      } catch {
        questions = [];
      }

      const generatedCount = questions.length;
      const acceptedCount = questions.filter((q: any) => q.stem || q.questionType).length;
      const rejectedCount = generatedCount - acceptedCount;
      const previewItems = questions.slice(0, 5);

      await pool.query(
        `UPDATE qbank_generation_runs SET
          status = 'completed', generated_count = $1, accepted_count = $2, rejected_count = $3,
          preview_items = $4, generated_items = $5, token_cost = $6, completed_at = NOW(),
          validation_report = $7
        WHERE id = $8`,
        [
          generatedCount,
          acceptedCount,
          rejectedCount,
          JSON.stringify(previewItems),
          JSON.stringify(questions),
          tokenCost,
          JSON.stringify({ totalGenerated: generatedCount, totalAccepted: acceptedCount, totalRejected: rejectedCount }),
          runId,
        ]
      );

      await pool.query(
        "UPDATE qbank_generation_schedules SET total_questions_generated = COALESCE(total_questions_generated, 0) + $1, updated_at = NOW() WHERE id = $2",
        [acceptedCount, schedule.id]
      );

      if (schedule.auto_ingest && acceptedCount > 0) {
        await pool.query("UPDATE qbank_generation_runs SET ingested = true WHERE id = $1", [runId]);
        console.log(`[QBank Scheduler] Auto-ingested ${acceptedCount} questions for ${schedule.name}`);
      }

      console.log(`[QBank Scheduler] Run ${runId} completed: ${generatedCount} generated, ${acceptedCount} accepted`);
    } catch (genErr: any) {
      await pool.query(
        "UPDATE qbank_generation_runs SET status = 'failed', error_message = $1, completed_at = NOW() WHERE id = $2",
        [genErr.message || "Generation failed", runId]
      );
      console.error(`[QBank Scheduler] Generation failed for run ${runId}:`, genErr.message);
    }
  } catch (err: any) {
    console.error(`[QBank Scheduler] Failed to create run for schedule ${schedule.name}:`, err.message);
  }
}

async function checkAndRunSchedules(): Promise<void> {
  try {
    const now = new Date();
    const r = await pool.query(
      "SELECT * FROM qbank_generation_schedules WHERE enabled = true AND next_run_at IS NOT NULL AND next_run_at <= $1",
      [now]
    );

    for (const schedule of r.rows) {
      const todayRuns = await getRunCountToday(schedule.id);
      const maxDailyRuns = schedule.max_daily_runs || 1;

      if (todayRuns >= maxDailyRuns) {
        console.log(`[QBank Scheduler] Skipping ${schedule.name}: max daily runs (${maxDailyRuns}) reached`);
        await pool.query(
          "UPDATE qbank_generation_schedules SET next_run_at = $1, updated_at = NOW() WHERE id = $2",
          [
            calculateNextRunAt(
              schedule.frequency || "daily",
              schedule.run_time_hour ?? 3,
              schedule.custom_cron_days
            ),
            schedule.id,
          ]
        );
        continue;
      }

      await triggerScheduledRun(schedule);
    }
  } catch (err: any) {
    console.error("[QBank Scheduler] Error checking schedules:", err.message);
  }
}

export function startQBankScheduler(): void {
  console.log("[QBank Scheduler] Initialized, polling every 5 minutes");
  schedulerInterval = setInterval(() => {
    checkAndRunSchedules();
  }, 5 * 60 * 1000);

  setTimeout(() => checkAndRunSchedules(), 30_000);
}

export function stopQBankScheduler(): void {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    console.log("[QBank Scheduler] Stopped");
  }
}

export function registerScheduleRoutes(app: Express): void {
  app.get("/api/admin/qbank/schedules", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const r = await pool.query(
        "SELECT * FROM qbank_generation_schedules ORDER BY created_at DESC"
      );
      res.json({ schedules: r.rows });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/qbank/schedules", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const {
        name,
        templateKey,
        variantKey,
        examKey,
        region,
        questionsPerRun = 25,
        rationaleMinWords = 250,
        frequency = "daily",
        customCronDays,
        runTimeHour = 3,
        enabled = false,
        autoIngest = false,
        maxDailyRuns = 1,
      } = req.body as any;

      if (!name || !templateKey || !variantKey || !examKey || !region) {
        return res.status(400).json({ error: "Missing required fields: name, templateKey, variantKey, examKey, region" });
      }

      const nextRunAt = enabled
        ? calculateNextRunAt(frequency, runTimeHour, customCronDays)
        : null;

      const r = await pool.query(
        `INSERT INTO qbank_generation_schedules
          (name, template_key, variant_key, exam_key, region, questions_per_run, rationale_min_words, frequency, custom_cron_days, run_time_hour, enabled, auto_ingest, max_daily_runs, next_run_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
        [
          name, templateKey, variantKey, examKey, region,
          questionsPerRun, rationaleMinWords, frequency,
          customCronDays ? JSON.stringify(customCronDays) : null,
          runTimeHour, enabled, autoIngest, maxDailyRuns, nextRunAt,
        ]
      );

      res.json({ schedule: r.rows[0] });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/admin/qbank/schedules/:id", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const {
        name,
        templateKey,
        variantKey,
        examKey,
        region,
        questionsPerRun,
        rationaleMinWords,
        frequency,
        customCronDays,
        runTimeHour,
        enabled,
        autoIngest,
        maxDailyRuns,
      } = req.body as any;

      const existing = await pool.query("SELECT * FROM qbank_generation_schedules WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Schedule not found" });

      const current = existing.rows[0];
      const newFrequency = frequency ?? current.frequency;
      const newRunTimeHour = runTimeHour ?? current.run_time_hour;
      const newEnabled = enabled ?? current.enabled;
      const newCustomDays = customCronDays ?? current.custom_cron_days;

      const nextRunAt = newEnabled
        ? calculateNextRunAt(newFrequency, newRunTimeHour, newCustomDays)
        : null;

      const r = await pool.query(
        `UPDATE qbank_generation_schedules SET
          name = COALESCE($1, name),
          template_key = COALESCE($2, template_key),
          variant_key = COALESCE($3, variant_key),
          exam_key = COALESCE($4, exam_key),
          region = COALESCE($5, region),
          questions_per_run = COALESCE($6, questions_per_run),
          rationale_min_words = COALESCE($7, rationale_min_words),
          frequency = COALESCE($8, frequency),
          custom_cron_days = $9,
          run_time_hour = COALESCE($10, run_time_hour),
          enabled = COALESCE($11, enabled),
          auto_ingest = COALESCE($12, auto_ingest),
          max_daily_runs = COALESCE($13, max_daily_runs),
          next_run_at = $14,
          updated_at = NOW()
        WHERE id = $15 RETURNING *`,
        [
          name, templateKey, variantKey, examKey, region,
          questionsPerRun, rationaleMinWords, frequency,
          newCustomDays ? JSON.stringify(newCustomDays) : null,
          runTimeHour, enabled, autoIngest, maxDailyRuns, nextRunAt, id,
        ]
      );

      res.json({ schedule: r.rows[0] });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/admin/qbank/schedules/:id/toggle", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const existing = await pool.query("SELECT * FROM qbank_generation_schedules WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Schedule not found" });

      const current = existing.rows[0];
      const newEnabled = !current.enabled;

      const nextRunAt = newEnabled
        ? calculateNextRunAt(
            current.frequency || "daily",
            current.run_time_hour ?? 3,
            current.custom_cron_days
          )
        : null;

      const r = await pool.query(
        "UPDATE qbank_generation_schedules SET enabled = $1, next_run_at = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
        [newEnabled, nextRunAt, id]
      );

      res.json({ schedule: r.rows[0] });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/admin/qbank/schedules/:id", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const r = await pool.query("DELETE FROM qbank_generation_schedules WHERE id = $1 RETURNING id", [id]);
      if (!r.rows[0]) return res.status(404).json({ error: "Schedule not found" });
      res.json({ deleted: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/qbank/schedules/calendar", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const schedules = await pool.query(
        "SELECT * FROM qbank_generation_schedules WHERE enabled = true"
      );

      const calendarEntries: any[] = [];
      const now = new Date();

      for (const schedule of schedules.rows) {
        let nextRun: Date | null = schedule.next_run_at ? new Date(schedule.next_run_at) : null;
        if (!nextRun) continue;

        const frequency = schedule.frequency || "daily";
        const customDays = schedule.custom_cron_days;

        for (let day = 0; day < 30; day++) {
          if (!nextRun || nextRun > new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)) break;

          calendarEntries.push({
            date: nextRun.toISOString().split("T")[0],
            time: `${String(nextRun.getUTCHours()).padStart(2, "0")}:00 UTC`,
            scheduleName: schedule.name,
            scheduleId: schedule.id,
            examKey: schedule.exam_key,
            variantKey: schedule.variant_key,
            expectedCount: schedule.questions_per_run || 25,
            autoIngest: schedule.auto_ingest,
            status: "scheduled",
          });

          if (frequency === "daily") {
            nextRun = new Date(nextRun.getTime() + 24 * 60 * 60 * 1000);
          } else if (frequency === "weekly") {
            nextRun = new Date(nextRun.getTime() + 7 * 24 * 60 * 60 * 1000);
          } else if (frequency === "custom" && customDays && Array.isArray(customDays)) {
            const sorted = [...customDays].sort((a: number, b: number) => a - b);
            let found = false;
            for (let i = 1; i <= 7; i++) {
              const candidate: Date = new Date(nextRun!.getTime() + i * 24 * 60 * 60 * 1000);
              if (sorted.includes(candidate.getUTCDay())) {
                nextRun = candidate;
                found = true;
                break;
              }
            }
            if (!found) break;
          } else {
            break;
          }
        }
      }

      calendarEntries.sort((a, b) => a.date.localeCompare(b.date));
      res.json({ calendar: calendarEntries });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}
