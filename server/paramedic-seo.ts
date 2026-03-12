import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";

const CONTENT_TYPES = ["topic", "category", "glossary", "comparison", "study-guide"] as const;
type ContentType = typeof CONTENT_TYPES[number];

const TABLE_MAP: Record<ContentType, string> = {
  topic: "paramedic_topic_pages",
  category: "paramedic_category_pages",
  glossary: "paramedic_glossary_entries",
  comparison: "paramedic_comparison_pages",
  "study-guide": "paramedic_study_guides",
};

const TITLE_FIELD: Record<ContentType, string> = {
  topic: "title",
  category: "title",
  glossary: "term",
  comparison: "title",
  "study-guide": "title",
};

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

const ALLOWED_COLUMNS: Record<ContentType, string[]> = {
  topic: [
    "content_domain", "profession_track", "region", "visibility_tier", "difficulty",
    "exam_relevance", "status", "title", "slug", "seo_title", "meta_description",
    "canonical_url", "target_keyword", "secondary_keywords", "category_id", "sections",
    "faq", "exam_tips", "clinical_pearls", "related_lesson_ids", "is_cornerstone",
    "is_noindex", "word_count", "manual_links", "published_at",
  ],
  category: [
    "content_domain", "profession_track", "region", "visibility_tier", "difficulty",
    "exam_relevance", "status", "title", "slug", "seo_title", "meta_description",
    "canonical_url", "description", "hero_image", "featured_topic_ids", "sort_order",
    "is_cornerstone", "is_noindex", "manual_links", "published_at",
  ],
  glossary: [
    "content_domain", "profession_track", "region", "visibility_tier", "difficulty",
    "exam_relevance", "status", "term", "slug", "seo_title", "meta_description",
    "canonical_url", "definition", "extended_description", "abbreviation",
    "related_term_slugs", "category_id", "usage_examples", "is_cornerstone",
    "is_noindex", "manual_links", "published_at",
  ],
  comparison: [
    "content_domain", "profession_track", "region", "visibility_tier", "difficulty",
    "exam_relevance", "status", "title", "slug", "seo_title", "meta_description",
    "canonical_url", "item_a", "item_b", "comparison_points", "summary", "faq",
    "category_id", "is_cornerstone", "is_noindex", "manual_links", "published_at",
  ],
  "study-guide": [
    "content_domain", "profession_track", "region", "visibility_tier", "difficulty",
    "exam_relevance", "status", "title", "slug", "seo_title", "meta_description",
    "canonical_url", "estimated_minutes", "objectives", "sections", "checklist",
    "faq", "mini_quiz", "related_lesson_ids", "category_id", "is_cornerstone",
    "is_noindex", "manual_links", "published_at",
  ],
};

function buildInsertQuery(type: ContentType, body: Record<string, any>): { query: string; values: any[] } {
  const table = TABLE_MAP[type];
  const allowed = ALLOWED_COLUMNS[type];
  const cols: string[] = [];
  const vals: any[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(body)) {
    const snakeKey = camelToSnake(key);
    if (!allowed.includes(snakeKey)) continue;
    cols.push(snakeKey);
    if (Array.isArray(value) && typeof value[0] !== "object") {
      vals.push(value);
    } else if (typeof value === "object" && value !== null) {
      vals.push(JSON.stringify(value));
    } else {
      vals.push(value);
    }
    idx++;
  }

  cols.push("content_domain");
  vals.push("paramedic");

  const placeholders = vals.map((_, i) => `$${i + 1}`).join(", ");
  const query = `INSERT INTO ${table} (id, ${cols.join(", ")}, created_at, updated_at) VALUES (gen_random_uuid(), ${placeholders}, NOW(), NOW()) RETURNING *`;
  return { query, values: vals };
}

function buildUpdateQuery(type: ContentType, id: string, body: Record<string, any>): { query: string; values: any[] } {
  const table = TABLE_MAP[type];
  const allowed = ALLOWED_COLUMNS[type];
  const sets: string[] = [];
  const vals: any[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(body)) {
    const snakeKey = camelToSnake(key);
    if (!allowed.includes(snakeKey) || snakeKey === "content_domain") continue;
    if (Array.isArray(value) && (value.length === 0 || typeof value[0] !== "object")) {
      sets.push(`${snakeKey} = $${idx}`);
      vals.push(value);
    } else if (typeof value === "object" && value !== null) {
      sets.push(`${snakeKey} = $${idx}::jsonb`);
      vals.push(JSON.stringify(value));
    } else {
      sets.push(`${snakeKey} = $${idx}`);
      vals.push(value);
    }
    idx++;
  }

  sets.push(`updated_at = NOW()`);
  vals.push(id);
  const query = `UPDATE ${table} SET ${sets.join(", ")} WHERE id = $${idx} AND content_domain = 'paramedic' RETURNING *`;
  return { query, values: vals };
}

export function registerParamedicSeoRoutes(app: Express) {
  for (const type of CONTENT_TYPES) {
    const table = TABLE_MAP[type];
    const titleField = TITLE_FIELD[type];

    app.get(`/api/paramedic-seo/${type}`, async (req: Request, res: Response) => {
      try {
        const admin = await requireAdmin(req, res);
        if (!admin) return;
        const status = req.query.status as string || "";
        const search = req.query.search as string || "";
        const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
        const offset = parseInt(req.query.offset as string) || 0;

        let where = "WHERE content_domain = 'paramedic'";
        const params: any[] = [];
        let paramIdx = 1;

        if (status) {
          where += ` AND status = $${paramIdx}`;
          params.push(status);
          paramIdx++;
        }
        if (search) {
          where += ` AND (${titleField} ILIKE $${paramIdx} OR slug ILIKE $${paramIdx})`;
          params.push(`%${search}%`);
          paramIdx++;
        }

        const countResult = await pool.query(`SELECT COUNT(*) as total FROM ${table} ${where}`, params);
        const total = parseInt(countResult.rows[0]?.total || "0");

        params.push(limit);
        params.push(offset);
        const result = await pool.query(
          `SELECT * FROM ${table} ${where} ORDER BY updated_at DESC LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
          params
        );

        res.json({ items: result.rows.map(snakeToCamel), total, limit, offset });
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });

    app.get(`/api/paramedic-seo/${type}/:id`, async (req: Request, res: Response) => {
      try {
        const admin = await requireAdmin(req, res);
        if (!admin) return;
        const result = await pool.query(
          `SELECT * FROM ${table} WHERE id = $1 AND content_domain = 'paramedic'`,
          [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(snakeToCamel(result.rows[0]));
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });

    app.post(`/api/paramedic-seo/${type}`, async (req: Request, res: Response) => {
      try {
        const admin = await requireAdmin(req, res);
        if (!admin) return;
        const body = req.body;
        if (!body.slug) return res.status(400).json({ error: "slug is required" });

        const existing = await pool.query(`SELECT id FROM ${table} WHERE slug = $1`, [body.slug]);
        if (existing.rows.length > 0) return res.status(409).json({ error: "Slug already exists" });

        const { query, values } = buildInsertQuery(type, body);
        const result = await pool.query(query, values);
        res.status(201).json(snakeToCamel(result.rows[0]));
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });

    app.put(`/api/paramedic-seo/${type}/:id`, async (req: Request, res: Response) => {
      try {
        const admin = await requireAdmin(req, res);
        if (!admin) return;
        const { query, values } = buildUpdateQuery(type, req.params.id, req.body);
        const result = await pool.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });

        if (req.body.status === "published" && !result.rows[0].published_at) {
          await pool.query(`UPDATE ${table} SET published_at = NOW() WHERE id = $1`, [req.params.id]);
        }
        res.json(snakeToCamel(result.rows[0]));
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });

    app.delete(`/api/paramedic-seo/${type}/:id`, async (req: Request, res: Response) => {
      try {
        const admin = await requireAdmin(req, res);
        if (!admin) return;
        await pool.query(`DELETE FROM ${table} WHERE id = $1 AND content_domain = 'paramedic'`, [req.params.id]);
        res.json({ ok: true });
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });

    app.get(`/api/paramedic-seo/public/${type}/:slug`, async (req: Request, res: Response) => {
      try {
        const result = await pool.query(
          `SELECT * FROM ${table} WHERE slug = $1 AND status = 'published' AND content_domain = 'paramedic'`,
          [req.params.slug]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(snakeToCamel(result.rows[0]));
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });
  }

  app.get("/api/paramedic-seo/public/category/:slug/topics", async (req: Request, res: Response) => {
    try {
      const catResult = await pool.query(
        `SELECT id FROM paramedic_category_pages WHERE slug = $1 AND status = 'published' AND content_domain = 'paramedic'`,
        [req.params.slug]
      );
      if (catResult.rows.length === 0) return res.status(404).json({ error: "Category not found" });
      const catId = catResult.rows[0].id;
      const topics = await pool.query(
        `SELECT id, title, slug, meta_description, difficulty, exam_relevance FROM paramedic_topic_pages WHERE category_id = $1 AND status = 'published' AND content_domain = 'paramedic' ORDER BY title`,
        [catId]
      );
      res.json(topics.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/paramedic-seo/internal-links/:type/:id", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const type = req.params.type as ContentType;
      const table = TABLE_MAP[type];
      if (!table) return res.status(400).json({ error: "Invalid content type" });

      const current = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id]);
      if (current.rows.length === 0) return res.status(404).json({ error: "Not found" });
      const item = current.rows[0];

      const links = await computeInternalLinks(type, item);
      res.json(links);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/paramedic-seo/public/links/:type/:slug", async (req: Request, res: Response) => {
    try {
      const type = req.params.type as ContentType;
      const table = TABLE_MAP[type];
      if (!table) return res.status(400).json({ error: "Invalid content type" });

      const current = await pool.query(
        `SELECT * FROM ${table} WHERE slug = $1 AND status = 'published' AND content_domain = 'paramedic'`,
        [req.params.slug]
      );
      if (current.rows.length === 0) return res.json([]);
      const links = await computeInternalLinks(type, current.rows[0]);
      res.json(links);
    } catch (e: any) {
      res.json([]);
    }
  });

  app.get("/api/paramedic-seo/sitemap-urls", async (_req: Request, res: Response) => {
    try {
      const urls: { loc: string; lastmod: string; priority: string }[] = [];
      const typeRoutes: Record<ContentType, string> = {
        topic: "/paramedic/topic",
        category: "/paramedic/category",
        glossary: "/paramedic/glossary",
        comparison: "/paramedic/compare",
        "study-guide": "/paramedic/study-guide",
      };

      for (const type of CONTENT_TYPES) {
        const table = TABLE_MAP[type];
        const result = await pool.query(
          `SELECT slug, updated_at FROM ${table} WHERE status = 'published' AND content_domain = 'paramedic' AND (is_noindex IS NULL OR is_noindex = false)`
        );
        for (const row of result.rows) {
          urls.push({
            loc: `${typeRoutes[type]}/${row.slug}`,
            lastmod: new Date(row.updated_at).toISOString().split("T")[0],
            priority: type === "category" ? "0.8" : "0.7",
          });
        }
      }

      try {
        const { paramedicQuestions } = await import("../client/src/data/career-questions/paramedic-questions");
        const topicSlugs = new Set<string>();
        for (const q of paramedicQuestions as any[]) {
          const slug = q.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
          topicSlugs.add(slug);
        }
        urls.push({
          loc: "/paramedic/questions",
          lastmod: new Date().toISOString().split("T")[0],
          priority: "0.8",
        });
        for (const slug of topicSlugs) {
          urls.push({
            loc: `/paramedic/questions/${slug}`,
            lastmod: new Date().toISOString().split("T")[0],
            priority: "0.6",
          });
        }
      } catch {}

      res.json(urls);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/paramedic-seo/stats", async (req: Request, res: Response) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const stats: Record<string, any> = {};
      for (const type of CONTENT_TYPES) {
        const table = TABLE_MAP[type];
        const result = await pool.query(
          `SELECT status, COUNT(*) as count FROM ${table} WHERE content_domain = 'paramedic' GROUP BY status`
        );
        const breakdown: Record<string, number> = {};
        for (const row of result.rows) {
          breakdown[row.status] = parseInt(row.count);
        }
        stats[type] = breakdown;
      }
      res.json(stats);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}

async function computeInternalLinks(type: ContentType, item: any): Promise<any[]> {
  const links: any[] = [];

  const manualLinks = item.manual_links || [];
  if (Array.isArray(manualLinks)) {
    for (const ml of manualLinks) {
      links.push({ ...ml, source: "manual" });
    }
  }

  if (type === "topic" && item.category_id) {
    const cat = await pool.query(
      `SELECT title, slug FROM paramedic_category_pages WHERE id = $1 AND status = 'published' AND content_domain = 'paramedic'`,
      [item.category_id]
    );
    if (cat.rows.length > 0) {
      links.push({
        type: "category",
        title: cat.rows[0].title,
        slug: cat.rows[0].slug,
        url: `/paramedic/category/${cat.rows[0].slug}`,
        source: "auto-category",
      });
    }

    const relatedTopics = await pool.query(
      `SELECT title, slug FROM paramedic_topic_pages WHERE category_id = $1 AND id != $2 AND status = 'published' AND content_domain = 'paramedic' LIMIT 5`,
      [item.category_id, item.id]
    );
    for (const rt of relatedTopics.rows) {
      links.push({
        type: "topic",
        title: rt.title,
        slug: rt.slug,
        url: `/paramedic/topic/${rt.slug}`,
        source: "auto-sibling",
      });
    }
  }

  if (type === "topic" || type === "comparison") {
    const title = item.title || "";
    const glossaryMatches = await pool.query(
      `SELECT term, slug FROM paramedic_glossary_entries WHERE status = 'published' AND content_domain = 'paramedic' AND (term ILIKE $1 OR $2 ILIKE '%' || term || '%') LIMIT 5`,
      [`%${title.split(" ").slice(0, 3).join(" ")}%`, title]
    );
    for (const g of glossaryMatches.rows) {
      links.push({
        type: "glossary",
        title: g.term,
        slug: g.slug,
        url: `/paramedic/glossary/${g.slug}`,
        source: "auto-glossary",
      });
    }
  }

  if (type === "study-guide" || type === "topic") {
    const cornerstone = await pool.query(
      `SELECT title, slug FROM paramedic_topic_pages WHERE is_cornerstone = true AND status = 'published' AND content_domain = 'paramedic' AND id != $1 LIMIT 3`,
      [item.id]
    );
    for (const cs of cornerstone.rows) {
      links.push({
        type: "cornerstone",
        title: cs.title,
        slug: cs.slug,
        url: `/paramedic/topic/${cs.slug}`,
        source: "auto-cornerstone",
      });
    }
  }

  if (type === "category") {
    const topics = await pool.query(
      `SELECT title, slug FROM paramedic_topic_pages WHERE category_id = $1 AND status = 'published' AND content_domain = 'paramedic' LIMIT 10`,
      [item.id]
    );
    for (const t of topics.rows) {
      links.push({
        type: "topic",
        title: t.title,
        slug: t.slug,
        url: `/paramedic/topic/${t.slug}`,
        source: "auto-child-topic",
      });
    }
  }

  if (type === "glossary") {
    const relatedSlugs = item.related_term_slugs || [];
    if (relatedSlugs.length > 0) {
      const related = await pool.query(
        `SELECT term, slug FROM paramedic_glossary_entries WHERE slug = ANY($1) AND status = 'published'`,
        [relatedSlugs]
      );
      for (const r of related.rows) {
        links.push({
          type: "glossary",
          title: r.term,
          slug: r.slug,
          url: `/paramedic/glossary/${r.slug}`,
          source: "auto-related-term",
        });
      }
    }
  }

  return links;
}
