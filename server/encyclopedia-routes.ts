import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import { requireAdmin, resolveAuthUser } from "./admin-auth";
import { ENCYCLOPEDIA_PROFESSIONS, insertEncyclopediaEntrySchema } from "@shared/schema";
import { z } from "zod";

const VALID_PROFESSIONS = new Set(ENCYCLOPEDIA_PROFESSIONS);
const VALID_STATUSES = new Set(["draft", "published", "archived"]);

function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj === null || typeof obj !== "object") return obj;
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
    result[camelKey] = snakeToCamel(value);
  }
  return result;
}

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

const ALLOWED_COLUMNS = [
  "profession", "slug", "title", "overview", "mechanism", "clinical_relevance",
  "signs_symptoms", "assessment_methods", "management", "complications",
  "clinical_pearls", "exam_pitfalls", "faq", "seo_title", "meta_description",
  "keywords", "related_topic_slugs", "cross_profession_links",
  "related_lesson_slugs", "related_question_topics", "status", "category",
  "sort_order", "published_at",
];

const JSONB_COLUMNS = new Set(["clinical_pearls", "exam_pitfalls", "faq", "cross_profession_links"]);
const ARRAY_COLUMNS = new Set(["keywords", "related_topic_slugs", "related_lesson_slugs", "related_question_topics"]);

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS encyclopedia_entries (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      profession TEXT NOT NULL,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      overview TEXT,
      mechanism TEXT,
      clinical_relevance TEXT,
      signs_symptoms TEXT,
      assessment_methods TEXT,
      management TEXT,
      complications TEXT,
      clinical_pearls JSONB DEFAULT '[]'::jsonb,
      exam_pitfalls JSONB DEFAULT '[]'::jsonb,
      faq JSONB DEFAULT '[]'::jsonb,
      seo_title TEXT,
      meta_description TEXT,
      keywords TEXT[] DEFAULT '{}'::text[],
      related_topic_slugs TEXT[] DEFAULT '{}'::text[],
      cross_profession_links JSONB DEFAULT '[]'::jsonb,
      related_lesson_slugs TEXT[] DEFAULT '{}'::text[],
      related_question_topics TEXT[] DEFAULT '{}'::text[],
      status TEXT DEFAULT 'draft',
      category TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      published_at TIMESTAMPTZ
    )
  `);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_encyclopedia_profession_slug ON encyclopedia_entries(profession, slug)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_encyclopedia_profession_status ON encyclopedia_entries(profession, status)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_encyclopedia_category ON encyclopedia_entries(profession, category)`);
}

let tableReady = false;
async function ready() {
  if (!tableReady) {
    await ensureTable();
    tableReady = true;
  }
}

export function registerEncyclopediaRoutes(app: Express) {
  app.get("/api/encyclopedia/:profession", async (req: Request, res: Response) => {
    try {
      await ready();
      const { profession } = req.params;
      if (!VALID_PROFESSIONS.has(profession as any)) {
        return res.status(400).json({ error: "Invalid profession" });
      }

      const status = "published";
      const category = req.query.category as string;
      const search = req.query.search as string;
      const letter = req.query.letter as string;
      const limit = Math.min(parseInt(req.query.limit as string) || 100, 500);
      const offset = parseInt(req.query.offset as string) || 0;

      let where = "WHERE profession = $1 AND status = $2";
      const params: any[] = [profession, status];
      let idx = 3;

      if (category) {
        where += ` AND category = $${idx}`;
        params.push(category);
        idx++;
      }
      if (search) {
        where += ` AND (title ILIKE $${idx} OR overview ILIKE $${idx} OR slug ILIKE $${idx})`;
        params.push(`%${search}%`);
        idx++;
      }
      if (letter) {
        where += ` AND UPPER(LEFT(title, 1)) = $${idx}`;
        params.push(letter.toUpperCase());
        idx++;
      }

      const countResult = await pool.query(`SELECT COUNT(*) as total FROM encyclopedia_entries ${where}`, params);
      const total = parseInt(countResult.rows[0]?.total || "0");

      const catResult = await pool.query(
        `SELECT DISTINCT category FROM encyclopedia_entries WHERE profession = $1 AND status = $2 AND category IS NOT NULL ORDER BY category`,
        [profession, status]
      );
      const categories = catResult.rows.map((r: any) => r.category);

      params.push(limit);
      params.push(offset);
      const result = await pool.query(
        `SELECT id, profession, slug, title, overview, category, meta_description, status, sort_order, keywords, created_at, updated_at, published_at
         FROM encyclopedia_entries ${where}
         ORDER BY sort_order ASC, title ASC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        params
      );

      res.json({
        items: result.rows.map(snakeToCamel),
        total,
        categories,
        limit,
        offset,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/encyclopedia/:profession/:slug", async (req: Request, res: Response) => {
    try {
      await ready();
      const { profession, slug } = req.params;
      if (!VALID_PROFESSIONS.has(profession as any)) {
        return res.status(400).json({ error: "Invalid profession" });
      }

      const result = await pool.query(
        `SELECT * FROM encyclopedia_entries WHERE profession = $1 AND slug = $2 AND status = 'published'`,
        [profession, slug]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });

      const entry = snakeToCamel(result.rows[0]);

      const relatedResult = await pool.query(
        `SELECT id, slug, title, category, meta_description FROM encyclopedia_entries
         WHERE profession = $1 AND status = 'published' AND slug != $2
         AND (slug = ANY($3) OR category = $4)
         ORDER BY sort_order ASC LIMIT 10`,
        [profession, slug, entry.relatedTopicSlugs || [], entry.category || ""]
      );
      entry.relatedTopics = relatedResult.rows.map(snakeToCamel);

      const crossLinks = entry.crossProfessionLinks || [];
      if (crossLinks.length > 0) {
        const crossSlugs = crossLinks.map((cl: any) => cl.slug).filter(Boolean);
        if (crossSlugs.length > 0) {
          const crossResult = await pool.query(
            `SELECT id, profession, slug, title, meta_description FROM encyclopedia_entries
             WHERE status = 'published' AND slug = ANY($1) AND profession != $2
             LIMIT 10`,
            [crossSlugs, profession]
          );
          entry.crossProfessionTopics = crossResult.rows.map(snakeToCamel);
        }
      }

      res.json(entry);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/encyclopedia/:profession/:slug/related-content", async (req: Request, res: Response) => {
    try {
      await ready();
      const { profession, slug } = req.params;

      if (!VALID_PROFESSIONS.has(profession as any)) {
        return res.status(400).json({ error: "Invalid profession" });
      }

      const entryResult = await pool.query(
        `SELECT related_lesson_slugs, related_question_topics, keywords FROM encyclopedia_entries WHERE profession = $1 AND slug = $2 AND status = 'published'`,
        [profession, slug]
      );
      if (entryResult.rows.length === 0) return res.status(404).json({ error: "Not found" });

      const entry = entryResult.rows[0];
      const relatedContent: any = { lessons: [], questions: [], flashcards: [] };

      const lessonSlugs = entry.related_lesson_slugs || [];
      if (lessonSlugs.length > 0) {
        try {
          const lessons = await pool.query(
            `SELECT id, title, slug FROM content_items WHERE slug = ANY($1) AND status = 'published' LIMIT 10`,
            [lessonSlugs]
          );
          relatedContent.lessons = lessons.rows.map(snakeToCamel);
        } catch {}
      }

      const questionTopics = entry.related_question_topics || [];
      if (questionTopics.length > 0) {
        relatedContent.questions = questionTopics.map((topic: string) => ({
          topic,
          url: `/${profession === "respiratory-therapy" ? "rrt" : profession}/questions/${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        }));
      }

      res.json(relatedContent);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/encyclopedia", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await ready();

      const body = req.body;
      if (!body.profession || !body.slug || !body.title) {
        return res.status(400).json({ error: "profession, slug, and title are required" });
      }
      if (!VALID_PROFESSIONS.has(body.profession)) {
        return res.status(400).json({ error: `Invalid profession. Must be one of: ${Array.from(VALID_PROFESSIONS).join(", ")}` });
      }
      if (body.status && !VALID_STATUSES.has(body.status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${Array.from(VALID_STATUSES).join(", ")}` });
      }
      if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(body.slug) && body.slug.length > 1) {
        return res.status(400).json({ error: "Slug must be lowercase alphanumeric with hyphens" });
      }

      const existing = await pool.query(
        `SELECT id FROM encyclopedia_entries WHERE profession = $1 AND slug = $2`,
        [body.profession, body.slug]
      );
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: "Entry with this profession+slug already exists" });
      }

      const { cols, vals, placeholders } = buildInsertParams(body);
      const query = `INSERT INTO encyclopedia_entries (id, ${cols.join(", ")}, created_at, updated_at)
                     VALUES (gen_random_uuid(), ${placeholders}, NOW(), NOW()) RETURNING *`;
      const result = await pool.query(query, vals);

      res.status(201).json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      if (e.code === "23505") {
        return res.status(409).json({ error: "An entry with this profession+slug combination already exists" });
      }
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/encyclopedia/:id", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await ready();

      const { id } = req.params;
      const body = req.body;

      if (body.status && !VALID_STATUSES.has(body.status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${Array.from(VALID_STATUSES).join(", ")}` });
      }
      if (body.profession && !VALID_PROFESSIONS.has(body.profession)) {
        return res.status(400).json({ error: `Invalid profession. Must be one of: ${Array.from(VALID_PROFESSIONS).join(", ")}` });
      }

      const { sets, vals } = buildUpdateParams(body);
      if (sets.length === 0) return res.status(400).json({ error: "No valid fields to update" });

      sets.push("updated_at = NOW()");
      vals.push(id);
      const query = `UPDATE encyclopedia_entries SET ${sets.join(", ")} WHERE id = $${vals.length} RETURNING *`;
      const result = await pool.query(query, vals);

      if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });

      if (body.status === "published" && !result.rows[0].published_at) {
        await pool.query(`UPDATE encyclopedia_entries SET published_at = NOW() WHERE id = $1`, [id]);
      }

      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      if (e.code === "23505") {
        return res.status(409).json({ error: "An entry with this profession+slug combination already exists" });
      }
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/encyclopedia/bulk", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await ready();

      const { entries } = req.body;
      if (!Array.isArray(entries) || entries.length === 0) {
        return res.status(400).json({ error: "entries array is required" });
      }
      if (entries.length > 200) {
        return res.status(400).json({ error: "Maximum 200 entries per bulk import" });
      }

      const results: any[] = [];
      const errors: any[] = [];

      for (const entry of entries) {
        try {
          if (!entry.profession || !entry.slug || !entry.title) {
            errors.push({ slug: entry.slug || "unknown", error: "Missing required fields" });
            continue;
          }
          if (!VALID_PROFESSIONS.has(entry.profession)) {
            errors.push({ slug: entry.slug, error: "Invalid profession" });
            continue;
          }

          const { cols, vals, placeholders } = buildInsertParams(entry);
          const query = `INSERT INTO encyclopedia_entries (id, ${cols.join(", ")}, created_at, updated_at)
                         VALUES (gen_random_uuid(), ${placeholders}, NOW(), NOW())
                         ON CONFLICT (profession, slug) DO UPDATE SET
                         ${cols.map((c, i) => `${c} = $${i + 1}`).join(", ")}, updated_at = NOW()
                         RETURNING *`;
          const result = await pool.query(query, vals);
          results.push(snakeToCamel(result.rows[0]));
        } catch (e: any) {
          errors.push({ slug: entry.slug || "unknown", error: e.message });
        }
      }

      res.json({ imported: results.length, errors: errors.length, results, errorDetails: errors });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/encyclopedia/:id", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await ready();

      await pool.query(`DELETE FROM encyclopedia_entries WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/encyclopedia-admin/list", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await ready();

      const profession = req.query.profession as string;
      const status = req.query.status as string;
      const search = req.query.search as string;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
      const offset = parseInt(req.query.offset as string) || 0;

      let where = "WHERE 1=1";
      const params: any[] = [];
      let idx = 1;

      if (profession) {
        where += ` AND profession = $${idx}`;
        params.push(profession);
        idx++;
      }
      if (status) {
        where += ` AND status = $${idx}`;
        params.push(status);
        idx++;
      }
      if (search) {
        where += ` AND (title ILIKE $${idx} OR slug ILIKE $${idx})`;
        params.push(`%${search}%`);
        idx++;
      }

      const countResult = await pool.query(`SELECT COUNT(*) as total FROM encyclopedia_entries ${where}`, params);
      const total = parseInt(countResult.rows[0]?.total || "0");

      params.push(limit);
      params.push(offset);
      const result = await pool.query(
        `SELECT * FROM encyclopedia_entries ${where} ORDER BY updated_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
        params
      );

      const statsResult = await pool.query(
        `SELECT profession, status, COUNT(*)::int as count FROM encyclopedia_entries GROUP BY profession, status ORDER BY profession, status`
      );

      res.json({
        items: result.rows.map(snakeToCamel),
        total,
        limit,
        offset,
        stats: statsResult.rows,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}

function buildInsertParams(body: Record<string, any>): { cols: string[]; vals: any[]; placeholders: string } {
  const cols: string[] = [];
  const vals: any[] = [];

  for (const [key, value] of Object.entries(body)) {
    const snakeKey = camelToSnake(key);
    if (!ALLOWED_COLUMNS.includes(snakeKey)) continue;
    cols.push(snakeKey);
    if (JSONB_COLUMNS.has(snakeKey)) {
      vals.push(JSON.stringify(value));
    } else if (ARRAY_COLUMNS.has(snakeKey)) {
      vals.push(Array.isArray(value) ? value : []);
    } else {
      vals.push(value);
    }
  }

  const placeholders = vals.map((_, i) => {
    const col = cols[i];
    if (JSONB_COLUMNS.has(col)) return `$${i + 1}::jsonb`;
    return `$${i + 1}`;
  }).join(", ");

  return { cols, vals, placeholders };
}

function buildUpdateParams(body: Record<string, any>): { sets: string[]; vals: any[] } {
  const sets: string[] = [];
  const vals: any[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(body)) {
    const snakeKey = camelToSnake(key);
    if (!ALLOWED_COLUMNS.includes(snakeKey)) continue;
    if (JSONB_COLUMNS.has(snakeKey)) {
      sets.push(`${snakeKey} = $${idx}::jsonb`);
      vals.push(JSON.stringify(value));
    } else if (ARRAY_COLUMNS.has(snakeKey)) {
      sets.push(`${snakeKey} = $${idx}`);
      vals.push(Array.isArray(value) ? value : []);
    } else {
      sets.push(`${snakeKey} = $${idx}`);
      vals.push(value);
    }
    idx++;
  }

  return { sets, vals };
}
