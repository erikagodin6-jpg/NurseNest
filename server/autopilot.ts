import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import {
  generateNursingPage,
  generatePracticeQuestionPage,
  generateVisualDiagram,
  generatePracticeSEOPage,
  generateCourseContent,
} from "./content-generators";

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

const DEFAULT_ENGINES = [
  { engineKey: "blog_engine", name: "Blog Engine", description: "Generate SEO blog clusters and articles" },
  { engineKey: "question_factory", name: "Question Factory", description: "Batch generate exam questions with validation" },
  { engineKey: "visual_factory", name: "Visual Factory", description: "Generate anatomy, pathophysiology, drug, and lab diagrams" },
  { engineKey: "practice_seo", name: "Practice SEO Engine", description: "Generate practice question pages for SEO" },
  { engineKey: "pinterest_scheduler", name: "Pinterest Scheduler", description: "Schedule and publish Pinterest pins" },
  { engineKey: "social_media", name: "Social Media Engine", description: "Generate and schedule social media posts" },
  { engineKey: "course_builder", name: "Course Builder", description: "Build courses from topics with 1-click generation" },
  { engineKey: "lifecycle_email", name: "Lifecycle Email Engine", description: "Automated email sequences and triggers" },
  { engineKey: "keyword_discovery", name: "Keyword Discovery", description: "Discover and cluster keywords for content strategy" },
  { engineKey: "auto_expansion", name: "Auto Expansion", description: "Automatically expand top-performing pages" },
];

let seeded = false;

async function seedDefaultEngines(): Promise<void> {
  if (seeded) return;
  try {
    const existing = await pool.query("SELECT COUNT(*)::int AS c FROM autopilot_engines");
    if (parseInt(existing.rows[0]?.c || "0") > 0) {
      seeded = true;
      return;
    }
    for (const engine of DEFAULT_ENGINES) {
      await pool.query(
        `INSERT INTO autopilot_engines (engine_key, name, description, enabled, config)
         VALUES ($1, $2, $3, false, '{}')
         ON CONFLICT (engine_key) DO NOTHING`,
        [engine.engineKey, engine.name, engine.description]
      );
    }
    seeded = true;
  } catch (err: any) {
    console.error("[Autopilot] Seed error:", err.message);
  }
}

async function processAutopilotJob(jobId: string, engineKey: string, payload: any): Promise<void> {
  try {
    switch (engineKey) {
      case "blog_engine":
        await generateNursingPage(
          payload.topic || "General Nursing",
          payload.targetKeyword || payload.topic || "",
          payload.examType || "nclex-rn",
          payload.wordCount || 2000,
          jobId
        );
        break;

      case "question_factory":
        await generatePracticeQuestionPage(
          payload.topic || payload.category || "General Nursing",
          payload.category || "nursing_ngn",
          payload.batchSize || 25,
          payload.difficultyRange || "2-4",
          payload.autoValidate !== false,
          jobId
        );
        break;

      case "visual_factory":
        await generateVisualDiagram(
          payload.type || "anatomy",
          payload.topic || "Heart Anatomy",
          payload.style || "clinical",
          jobId
        );
        break;

      case "practice_seo":
        await generatePracticeSEOPage(
          payload.title || "Practice Questions",
          payload.bodySystem || "cardiovascular",
          payload.questionCount || 10,
          payload.tier || "rn",
          jobId
        );
        break;

      case "course_builder":
        await generateCourseContent(
          payload.topic || "Nursing Fundamentals",
          payload.exam || "nclex-rn",
          payload.difficulty || "intermediate",
          jobId
        );
        break;

      default:
        await pool.query(
          "UPDATE autopilot_jobs SET status = 'completed', result = $1, completed_at = NOW() WHERE id = $2",
          [JSON.stringify({ message: `Job queued for ${engineKey} (manual processing required)` }), jobId]
        );
        break;
    }
  } catch (err: any) {
    console.error(`[Autopilot] processJob error for ${engineKey}:`, err.message);
  }
}

export function setupAutopilotRoutes(app: Express): void {

  app.get("/api/admin/autopilot/engines", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      await seedDefaultEngines();
      const r = await pool.query("SELECT * FROM autopilot_engines ORDER BY created_at ASC");
      res.json({
        engines: r.rows.map((row: any) => ({
          id: row.id,
          engineKey: row.engine_key,
          name: row.name,
          description: row.description,
          enabled: row.enabled,
          config: row.config,
          lastRunAt: row.last_run_at,
          createdAt: row.created_at,
        })),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/autopilot/engines/:key/toggle", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { key } = req.params;
      const existing = await pool.query("SELECT * FROM autopilot_engines WHERE engine_key = $1", [key]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Engine not found" });

      const newEnabled = !existing.rows[0].enabled;
      const r = await pool.query(
        "UPDATE autopilot_engines SET enabled = $1 WHERE engine_key = $2 RETURNING *",
        [newEnabled, key]
      );
      const row = r.rows[0];
      res.json({
        engine: {
          id: row.id,
          engineKey: row.engine_key,
          name: row.name,
          description: row.description,
          enabled: row.enabled,
          config: row.config,
          lastRunAt: row.last_run_at,
          createdAt: row.created_at,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/autopilot/jobs", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { engineKey, status, limit = "50" } = req.query;
      let query = "SELECT * FROM autopilot_jobs WHERE 1=1";
      const params: any[] = [];
      let idx = 1;

      if (engineKey) {
        query += ` AND engine_key = $${idx++}`;
        params.push(engineKey);
      }
      if (status) {
        query += ` AND status = $${idx++}`;
        params.push(status);
      }
      query += ` ORDER BY created_at DESC LIMIT $${idx++}`;
      params.push(Math.min(parseInt(String(limit)) || 50, 200));

      const r = await pool.query(query, params);
      res.json({
        jobs: r.rows.map((row: any) => ({
          id: row.id,
          engineKey: row.engine_key,
          status: row.status,
          payload: row.payload,
          result: row.result,
          error: row.error,
          startedAt: row.started_at,
          completedAt: row.completed_at,
          scheduledFor: row.scheduled_for,
          createdAt: row.created_at,
        })),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/autopilot/jobs", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { engineKey, payload, scheduledFor } = req.body as any;
      if (!engineKey) {
        return res.status(400).json({ error: "engineKey is required" });
      }

      const engineCheck = await pool.query("SELECT id FROM autopilot_engines WHERE engine_key = $1", [engineKey]);
      if (!engineCheck.rows[0]) {
        return res.status(404).json({ error: "Engine not found" });
      }

      const r = await pool.query(
        `INSERT INTO autopilot_jobs (engine_key, status, payload, scheduled_for)
         VALUES ($1, 'queued', $2, $3) RETURNING *`,
        [engineKey, JSON.stringify(payload || {}), scheduledFor || null]
      );

      const row = r.rows[0];
      const jobId = row.id;

      if (!scheduledFor) {
        processAutopilotJob(jobId, engineKey, payload || {}).catch((err) => {
          console.error(`[Autopilot] Job ${jobId} (${engineKey}) failed:`, err.message);
        });
      }

      res.json({
        job: {
          id: row.id,
          engineKey: row.engine_key,
          status: row.status,
          payload: row.payload,
          result: row.result,
          error: row.error,
          startedAt: row.started_at,
          completedAt: row.completed_at,
          scheduledFor: row.scheduled_for,
          createdAt: row.created_at,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/autopilot/queue", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { status, contentType, limit = "50" } = req.query;
      let query = "SELECT * FROM publishing_queue WHERE 1=1";
      const params: any[] = [];
      let idx = 1;

      if (status) {
        query += ` AND status = $${idx++}`;
        params.push(status);
      }
      if (contentType) {
        query += ` AND content_type = $${idx++}`;
        params.push(contentType);
      }
      query += ` ORDER BY created_at DESC LIMIT $${idx++}`;
      params.push(Math.min(parseInt(String(limit)) || 50, 200));

      const r = await pool.query(query, params);
      res.json({
        items: r.rows.map((row: any) => ({
          id: row.id,
          engineKey: row.engine_key,
          contentType: row.content_type,
          title: row.title,
          content: row.content,
          status: row.status,
          previewUrl: row.preview_url,
          metadata: row.metadata,
          createdBy: row.created_by,
          approvedBy: row.approved_by,
          publishedAt: row.published_at,
          createdAt: row.created_at,
        })),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/autopilot/queue/:id/approve", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const existing = await pool.query("SELECT id, status FROM publishing_queue WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Queue item not found" });

      if (existing.rows[0].status !== "pending_review" && existing.rows[0].status !== "draft") {
        return res.status(400).json({ error: "Item is not in a reviewable state" });
      }

      const r = await pool.query(
        "UPDATE publishing_queue SET status = 'approved', approved_by = $1 WHERE id = $2 RETURNING *",
        [admin.id, id]
      );
      const row = r.rows[0];
      res.json({
        item: {
          id: row.id,
          engineKey: row.engine_key,
          contentType: row.content_type,
          title: row.title,
          status: row.status,
          approvedBy: row.approved_by,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/autopilot/queue/:id/reject", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const existing = await pool.query("SELECT id, status FROM publishing_queue WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Queue item not found" });

      const r = await pool.query(
        "UPDATE publishing_queue SET status = 'rejected' WHERE id = $1 RETURNING *",
        [id]
      );
      const row = r.rows[0];
      res.json({
        item: {
          id: row.id,
          engineKey: row.engine_key,
          contentType: row.content_type,
          title: row.title,
          status: row.status,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/autopilot/queue/:id/publish", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const existing = await pool.query("SELECT id, status FROM publishing_queue WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Queue item not found" });

      if (existing.rows[0].status !== "approved") {
        return res.status(400).json({ error: "Item must be approved before publishing" });
      }

      const r = await pool.query(
        "UPDATE publishing_queue SET status = 'published', published_at = NOW() WHERE id = $1 RETURNING *",
        [id]
      );
      const row = r.rows[0];
      res.json({
        item: {
          id: row.id,
          engineKey: row.engine_key,
          contentType: row.content_type,
          title: row.title,
          status: row.status,
          publishedAt: row.published_at,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/autopilot/schedules", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const r = await pool.query("SELECT * FROM autopilot_schedules ORDER BY created_at DESC");
      res.json({
        schedules: r.rows.map((row: any) => ({
          id: row.id,
          engineKey: row.engine_key,
          frequency: row.frequency,
          cronExpression: row.cron_expression,
          enabled: row.enabled,
          config: row.config,
          nextRunAt: row.next_run_at,
          lastRunAt: row.last_run_at,
          createdAt: row.created_at,
        })),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/autopilot/schedules", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id, engineKey, frequency, cronExpression, enabled, config, nextRunAt } = req.body as any;
      if (!engineKey || !frequency) {
        return res.status(400).json({ error: "engineKey and frequency are required" });
      }

      if (id) {
        const existing = await pool.query("SELECT id FROM autopilot_schedules WHERE id = $1", [id]);
        if (existing.rows[0]) {
          const r = await pool.query(
            `UPDATE autopilot_schedules SET
              engine_key = $1, frequency = $2, cron_expression = $3,
              enabled = $4, config = $5, next_run_at = $6
            WHERE id = $7 RETURNING *`,
            [engineKey, frequency, cronExpression || null, !!enabled, JSON.stringify(config || {}), nextRunAt || null, id]
          );
          const row = r.rows[0];
          return res.json({
            schedule: {
              id: row.id,
              engineKey: row.engine_key,
              frequency: row.frequency,
              cronExpression: row.cron_expression,
              enabled: row.enabled,
              config: row.config,
              nextRunAt: row.next_run_at,
              lastRunAt: row.last_run_at,
              createdAt: row.created_at,
            },
          });
        }
      }

      const r = await pool.query(
        `INSERT INTO autopilot_schedules (engine_key, frequency, cron_expression, enabled, config, next_run_at)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [engineKey, frequency, cronExpression || null, !!enabled, JSON.stringify(config || {}), nextRunAt || null]
      );
      const row = r.rows[0];
      res.json({
        schedule: {
          id: row.id,
          engineKey: row.engine_key,
          frequency: row.frequency,
          cronExpression: row.cron_expression,
          enabled: row.enabled,
          config: row.config,
          nextRunAt: row.next_run_at,
          lastRunAt: row.last_run_at,
          createdAt: row.created_at,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/autopilot/schedules/:id/toggle", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const existing = await pool.query("SELECT * FROM autopilot_schedules WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Schedule not found" });

      const newEnabled = !existing.rows[0].enabled;
      const r = await pool.query(
        "UPDATE autopilot_schedules SET enabled = $1 WHERE id = $2 RETURNING *",
        [newEnabled, id]
      );
      const row = r.rows[0];
      res.json({
        schedule: {
          id: row.id,
          engineKey: row.engine_key,
          frequency: row.frequency,
          cronExpression: row.cron_expression,
          enabled: row.enabled,
          config: row.config,
          nextRunAt: row.next_run_at,
          lastRunAt: row.last_run_at,
          createdAt: row.created_at,
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/autopilot/stats", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      await seedDefaultEngines();

      const enginesResult = await pool.query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE enabled = true)::int AS active FROM autopilot_engines");
      const jobsResult = await pool.query(`
        SELECT
          COUNT(*)::int AS total_jobs,
          COUNT(*) FILTER (WHERE status = 'queued')::int AS queued,
          COUNT(*) FILTER (WHERE status = 'running')::int AS running,
          COUNT(*) FILTER (WHERE status = 'completed')::int AS completed,
          COUNT(*) FILTER (WHERE status = 'failed')::int AS failed,
          COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled
        FROM autopilot_jobs
      `);
      const queueResult = await pool.query(`
        SELECT
          COUNT(*)::int AS total_items,
          COUNT(*) FILTER (WHERE status = 'draft')::int AS draft,
          COUNT(*) FILTER (WHERE status = 'pending_review')::int AS pending_review,
          COUNT(*) FILTER (WHERE status = 'approved')::int AS approved,
          COUNT(*) FILTER (WHERE status = 'published')::int AS published,
          COUNT(*) FILTER (WHERE status = 'rejected')::int AS rejected
        FROM publishing_queue
      `);
      const schedulesResult = await pool.query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE enabled = true)::int AS active FROM autopilot_schedules");

      const recentJobsResult = await pool.query(
        "SELECT * FROM autopilot_jobs ORDER BY created_at DESC LIMIT 10"
      );

      const engines = enginesResult.rows[0] || {};
      const jobs = jobsResult.rows[0] || {};
      const queue = queueResult.rows[0] || {};
      const schedules = schedulesResult.rows[0] || {};

      res.json({
        engines: {
          total: engines.total || 0,
          active: engines.active || 0,
        },
        jobs: {
          total: jobs.total_jobs || 0,
          queued: jobs.queued || 0,
          running: jobs.running || 0,
          completed: jobs.completed || 0,
          failed: jobs.failed || 0,
          cancelled: jobs.cancelled || 0,
        },
        queue: {
          total: queue.total_items || 0,
          draft: queue.draft || 0,
          pendingReview: queue.pending_review || 0,
          approved: queue.approved || 0,
          published: queue.published || 0,
          rejected: queue.rejected || 0,
        },
        schedules: {
          total: schedules.total || 0,
          active: schedules.active || 0,
        },
        recentJobs: recentJobsResult.rows.map((row: any) => ({
          id: row.id,
          engineKey: row.engine_key,
          status: row.status,
          createdAt: row.created_at,
          completedAt: row.completed_at,
        })),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}
