import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";

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

async function ensureEncyclopediaTables(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS encyclopedia_topics (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      profession TEXT NOT NULL,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      related_lesson_ids TEXT[] DEFAULT '{}',
      related_question_ids TEXT[] DEFAULT '{}',
      related_flashcard_ids TEXT[] DEFAULT '{}',
      status TEXT DEFAULT 'draft',
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (profession, slug)
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS encyclopedia_entries (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      topic_id VARCHAR NOT NULL,
      profession TEXT NOT NULL,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      seo_title TEXT,
      seo_description TEXT,
      seo_keywords TEXT[] DEFAULT '{}',
      overview TEXT,
      mechanism_physiology TEXT,
      clinical_relevance TEXT,
      signs_symptoms TEXT,
      assessment TEXT,
      management TEXT,
      complications TEXT,
      clinical_pearls JSONB DEFAULT '[]',
      exam_pitfalls JSONB DEFAULT '[]',
      faq_json JSONB DEFAULT '[]',
      related_lesson_ids TEXT[] DEFAULT '{}',
      related_question_ids TEXT[] DEFAULT '{}',
      related_flashcard_ids TEXT[] DEFAULT '{}',
      cross_profession_links JSONB DEFAULT '[]',
      image_placeholders JSONB DEFAULT '[]',
      status TEXT DEFAULT 'draft',
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (profession, slug)
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_encyclopedia_profession_status ON encyclopedia_entries(profession, status)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_encyclopedia_category ON encyclopedia_entries(profession, category)`);
}

async function migrateEncyclopediaConstraints(): Promise<void> {
  try {
    await pool.query(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'encyclopedia_topics_slug_key'
        ) THEN
          ALTER TABLE encyclopedia_topics DROP CONSTRAINT encyclopedia_topics_slug_key;
        END IF;
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'encyclopedia_topics_profession_slug_key'
        ) THEN
          ALTER TABLE encyclopedia_topics ADD CONSTRAINT encyclopedia_topics_profession_slug_key UNIQUE (profession, slug);
        END IF;
        IF EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'encyclopedia_entries_slug_key'
        ) THEN
          ALTER TABLE encyclopedia_entries DROP CONSTRAINT encyclopedia_entries_slug_key;
        END IF;
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'encyclopedia_entries_profession_slug_key'
        ) THEN
          ALTER TABLE encyclopedia_entries ADD CONSTRAINT encyclopedia_entries_profession_slug_key UNIQUE (profession, slug);
        END IF;
      END $$;
    `);
  } catch (err) {
  }
}

let tablesEnsured = false;
async function ensureTables() {
  if (!tablesEnsured) {
    await ensureEncyclopediaTables();
    await migrateEncyclopediaConstraints();
    tablesEnsured = true;
  }
}

export function registerEncyclopediaRoutes(app: Express): void {
  app.get("/api/encyclopedia/professions", async (_req: Request, res: Response) => {
    try {
      await ensureTables();
      const result = await pool.query(`
        SELECT profession, COUNT(*)::int AS entry_count,
          COUNT(*) FILTER (WHERE status = 'published')::int AS published_count,
          array_agg(DISTINCT category) AS categories
        FROM encyclopedia_entries
        WHERE status = 'published'
        GROUP BY profession
        ORDER BY profession
      `);
      res.json(result.rows.map(snakeToCamel));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/encyclopedia/:profession", async (req: Request, res: Response) => {
    try {
      await ensureTables();
      const { profession } = req.params;
      const { category, search, letter } = req.query;

      let query = `SELECT id, slug, title, category, seo_description, status, published_at
        FROM encyclopedia_entries WHERE profession = $1 AND status = 'published'`;
      const params: any[] = [profession];
      let idx = 2;

      if (category) {
        query += ` AND category = $${idx++}`;
        params.push(category);
      }
      if (search) {
        query += ` AND (title ILIKE $${idx} OR seo_description ILIKE $${idx})`;
        params.push(`%${search}%`);
        idx++;
      }
      if (letter) {
        query += ` AND UPPER(LEFT(title, 1)) = $${idx++}`;
        params.push(String(letter).toUpperCase());
      }
      query += ` ORDER BY title ASC`;

      const result = await pool.query(query, params);

      const catResult = await pool.query(
        `SELECT DISTINCT category FROM encyclopedia_entries WHERE profession = $1 AND status = 'published' ORDER BY category`,
        [profession]
      );

      res.json({
        entries: result.rows.map(snakeToCamel),
        categories: catResult.rows.map((r: any) => r.category),
        total: result.rows.length,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/encyclopedia/:profession/:slug", async (req: Request, res: Response) => {
    try {
      await ensureTables();
      const { profession, slug } = req.params;
      const result = await pool.query(
        `SELECT * FROM encyclopedia_entries WHERE profession = $1 AND slug = $2 AND status = 'published'`,
        [profession, slug]
      );
      if (!result.rows[0]) {
        return res.status(404).json({ error: "Entry not found" });
      }
      const entry = snakeToCamel(result.rows[0]);

      const relatedResult = await pool.query(
        `SELECT id, slug, title, category FROM encyclopedia_entries
         WHERE profession = $1 AND category = $2 AND slug != $3 AND status = 'published'
         ORDER BY title LIMIT 6`,
        [profession, result.rows[0].category, slug]
      );
      entry.relatedEntries = relatedResult.rows.map(snakeToCamel);

      const crossLinks = entry.crossProfessionLinks || [];
      if (Array.isArray(crossLinks) && crossLinks.length > 0) {
        const crossSlugs = crossLinks.map((cl: any) => cl.slug).filter(Boolean);
        if (crossSlugs.length > 0) {
          const crossResult = await pool.query(
            `SELECT id, profession, slug, title, seo_description FROM encyclopedia_entries
             WHERE status = 'published' AND slug = ANY($1) AND profession != $2
             LIMIT 10`,
            [crossSlugs, profession]
          );
          entry.crossProfessionTopics = crossResult.rows.map(snakeToCamel);
        }
      }

      res.json(entry);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/encyclopedia/:profession/:slug/related-content", async (req: Request, res: Response) => {
    try {
      await ensureTables();
      const { profession, slug } = req.params;

      const entryResult = await pool.query(
        `SELECT related_lesson_ids, related_question_ids, seo_keywords FROM encyclopedia_entries WHERE profession = $1 AND slug = $2 AND status = 'published'`,
        [profession, slug]
      );
      if (entryResult.rows.length === 0) return res.status(404).json({ error: "Not found" });

      const entry = entryResult.rows[0];
      const relatedContent: any = { lessons: [], questions: [], flashcards: [] };

      const lessonIds = entry.related_lesson_ids || [];
      if (lessonIds.length > 0) {
        try {
          const lessons = await pool.query(
            `SELECT id, title, slug FROM content_items WHERE slug = ANY($1) AND status = 'published' LIMIT 10`,
            [lessonIds]
          );
          relatedContent.lessons = lessons.rows.map(snakeToCamel);
        } catch {}
      }

      const questionIds = entry.related_question_ids || [];
      if (questionIds.length > 0) {
        relatedContent.questions = questionIds.map((topic: string) => ({
          topic,
          url: `/${profession === "respiratory-therapy" ? "rrt" : profession}/questions/${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        }));
      }

      res.json(relatedContent);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/encyclopedia/entries", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await ensureTables();
      const { topicId, profession, slug, title, category, seoTitle, seoDescription, seoKeywords,
        overview, mechanismPhysiology, clinicalRelevance, signsSymptoms, assessment,
        management, complications, clinicalPearls, examPitfalls, faqJson,
        relatedLessonIds, relatedQuestionIds, relatedFlashcardIds,
        crossProfessionLinks, imagePlaceholders, status } = req.body;

      if (!profession || !slug || !title || !category) {
        return res.status(400).json({ error: "profession, slug, title, and category are required" });
      }

      const topicResult = await pool.query(
        `INSERT INTO encyclopedia_topics (profession, slug, title, category, related_lesson_ids, related_question_ids, related_flashcard_ids, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (profession, slug) DO UPDATE SET title = $3, category = $4, updated_at = NOW()
         RETURNING id`,
        [profession, slug, title, category,
          relatedLessonIds || [], relatedQuestionIds || [], relatedFlashcardIds || [],
          status || 'draft']
      );
      const resolvedTopicId = topicId || topicResult.rows[0].id;

      const result = await pool.query(
        `INSERT INTO encyclopedia_entries (topic_id, profession, slug, title, category,
          seo_title, seo_description, seo_keywords, overview, mechanism_physiology,
          clinical_relevance, signs_symptoms, assessment, management, complications,
          clinical_pearls, exam_pitfalls, faq_json, related_lesson_ids, related_question_ids,
          related_flashcard_ids, cross_profession_links, image_placeholders, status,
          published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24,
          ${(status === 'published') ? 'NOW()' : 'NULL'})
         ON CONFLICT (profession, slug) DO UPDATE SET
          title = EXCLUDED.title, category = EXCLUDED.category,
          seo_title = EXCLUDED.seo_title, seo_description = EXCLUDED.seo_description,
          seo_keywords = EXCLUDED.seo_keywords, overview = EXCLUDED.overview,
          mechanism_physiology = EXCLUDED.mechanism_physiology,
          clinical_relevance = EXCLUDED.clinical_relevance,
          signs_symptoms = EXCLUDED.signs_symptoms, assessment = EXCLUDED.assessment,
          management = EXCLUDED.management, complications = EXCLUDED.complications,
          clinical_pearls = EXCLUDED.clinical_pearls, exam_pitfalls = EXCLUDED.exam_pitfalls,
          faq_json = EXCLUDED.faq_json, related_lesson_ids = EXCLUDED.related_lesson_ids,
          related_question_ids = EXCLUDED.related_question_ids,
          related_flashcard_ids = EXCLUDED.related_flashcard_ids,
          cross_profession_links = EXCLUDED.cross_profession_links,
          image_placeholders = EXCLUDED.image_placeholders,
          status = EXCLUDED.status,
          published_at = CASE WHEN EXCLUDED.status = 'published' AND encyclopedia_entries.published_at IS NULL THEN NOW() ELSE encyclopedia_entries.published_at END,
          updated_at = NOW()
         RETURNING *`,
        [resolvedTopicId, profession, slug, title, category,
          seoTitle || null, seoDescription || null, seoKeywords || [],
          overview || null, mechanismPhysiology || null,
          clinicalRelevance || null, signsSymptoms || null,
          assessment || null, management || null, complications || null,
          JSON.stringify(clinicalPearls || []), JSON.stringify(examPitfalls || []),
          JSON.stringify(faqJson || []),
          relatedLessonIds || [], relatedQuestionIds || [], relatedFlashcardIds || [],
          JSON.stringify(crossProfessionLinks || []), JSON.stringify(imagePlaceholders || []),
          status || 'draft']
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (err: any) {
      if (err.code === "23505") {
        return res.status(409).json({ error: "An entry with this profession+slug combination already exists" });
      }
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/admin/encyclopedia/entries/:id", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await ensureTables();
      const { id } = req.params;
      const fields = req.body;
      const setClauses: string[] = [];
      const values: any[] = [];
      let idx = 1;

      const allowedFields: Record<string, string> = {
        title: 'title', category: 'category', seoTitle: 'seo_title',
        seoDescription: 'seo_description', seoKeywords: 'seo_keywords',
        overview: 'overview', mechanismPhysiology: 'mechanism_physiology',
        clinicalRelevance: 'clinical_relevance', signsSymptoms: 'signs_symptoms',
        assessment: 'assessment', management: 'management', complications: 'complications',
        clinicalPearls: 'clinical_pearls', examPitfalls: 'exam_pitfalls',
        faqJson: 'faq_json', relatedLessonIds: 'related_lesson_ids',
        relatedQuestionIds: 'related_question_ids', relatedFlashcardIds: 'related_flashcard_ids',
        crossProfessionLinks: 'cross_profession_links', imagePlaceholders: 'image_placeholders',
        status: 'status',
      };

      for (const [camel, snake] of Object.entries(allowedFields)) {
        if (fields[camel] !== undefined) {
          const val = ['clinicalPearls', 'examPitfalls', 'faqJson', 'crossProfessionLinks', 'imagePlaceholders'].includes(camel)
            ? JSON.stringify(fields[camel]) : fields[camel];
          setClauses.push(`${snake} = $${idx++}`);
          values.push(val);
        }
      }

      if (fields.status === 'published') {
        setClauses.push(`published_at = COALESCE(published_at, NOW())`);
      }

      setClauses.push(`updated_at = NOW()`);
      values.push(id);

      const result = await pool.query(
        `UPDATE encyclopedia_entries SET ${setClauses.join(', ')} WHERE id = $${idx} RETURNING *`,
        values
      );
      if (!result.rows[0]) return res.status(404).json({ error: "Entry not found" });
      res.json(snakeToCamel(result.rows[0]));
    } catch (err: any) {
      if (err.code === "23505") {
        return res.status(409).json({ error: "An entry with this profession+slug combination already exists" });
      }
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/admin/encyclopedia/entries/:id", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await ensureTables();
      const { id } = req.params;
      await pool.query(`DELETE FROM encyclopedia_entries WHERE id = $1`, [id]);
      res.json({ ok: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/encyclopedia/entries", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await ensureTables();
      const { profession, category, status, limit = "100" } = req.query;
      let query = `SELECT * FROM encyclopedia_entries WHERE 1=1`;
      const params: any[] = [];
      let idx = 1;
      if (profession) { query += ` AND profession = $${idx++}`; params.push(profession); }
      if (category) { query += ` AND category = $${idx++}`; params.push(category); }
      if (status) { query += ` AND status = $${idx++}`; params.push(status); }
      query += ` ORDER BY profession, category, title LIMIT $${idx++}`;
      params.push(Math.min(parseInt(String(limit)) || 100, 500));
      const result = await pool.query(query, params);
      res.json(result.rows.map(snakeToCamel));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/encyclopedia/bulk-import", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await ensureTables();
      const { entries } = req.body;
      if (!Array.isArray(entries) || entries.length === 0) {
        return res.status(400).json({ error: "entries array is required" });
      }
      if (entries.length > 200) {
        return res.status(400).json({ error: "Maximum 200 entries per import" });
      }

      let imported = 0;
      let errors: string[] = [];

      for (const entry of entries) {
        try {
          if (!entry.profession || !entry.slug || !entry.title || !entry.category) {
            errors.push(`Skipped: missing required fields for "${entry.title || entry.slug || 'unknown'}"`);
            continue;
          }

          const topicResult = await pool.query(
            `INSERT INTO encyclopedia_topics (profession, slug, title, category, status)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (profession, slug) DO UPDATE SET title = $3, category = $4, updated_at = NOW()
             RETURNING id`,
            [entry.profession, entry.slug, entry.title, entry.category, entry.status || 'draft']
          );
          const topicId = entry.topicId || topicResult.rows[0].id;

          await pool.query(
            `INSERT INTO encyclopedia_entries (topic_id, profession, slug, title, category,
              seo_title, seo_description, seo_keywords, overview, mechanism_physiology,
              clinical_relevance, signs_symptoms, assessment, management, complications,
              clinical_pearls, exam_pitfalls, faq_json, related_lesson_ids, related_question_ids,
              related_flashcard_ids, cross_profession_links, image_placeholders, status,
              published_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24,
              ${entry.status === 'published' ? 'NOW()' : 'NULL'})
             ON CONFLICT (profession, slug) DO UPDATE SET
              title = EXCLUDED.title, category = EXCLUDED.category,
              seo_title = EXCLUDED.seo_title, seo_description = EXCLUDED.seo_description,
              overview = EXCLUDED.overview, mechanism_physiology = EXCLUDED.mechanism_physiology,
              clinical_relevance = EXCLUDED.clinical_relevance, signs_symptoms = EXCLUDED.signs_symptoms,
              assessment = EXCLUDED.assessment, management = EXCLUDED.management,
              complications = EXCLUDED.complications, clinical_pearls = EXCLUDED.clinical_pearls,
              exam_pitfalls = EXCLUDED.exam_pitfalls, faq_json = EXCLUDED.faq_json,
              status = EXCLUDED.status,
              published_at = CASE WHEN EXCLUDED.status = 'published' AND encyclopedia_entries.published_at IS NULL THEN NOW() ELSE encyclopedia_entries.published_at END,
              updated_at = NOW()`,
            [topicId, entry.profession, entry.slug, entry.title, entry.category,
              entry.seoTitle || null, entry.seoDescription || null, entry.seoKeywords || [],
              entry.overview || null, entry.mechanismPhysiology || null,
              entry.clinicalRelevance || null, entry.signsSymptoms || null,
              entry.assessment || null, entry.management || null, entry.complications || null,
              JSON.stringify(entry.clinicalPearls || []), JSON.stringify(entry.examPitfalls || []),
              JSON.stringify(entry.faqJson || []),
              entry.relatedLessonIds || [], entry.relatedQuestionIds || [],
              entry.relatedFlashcardIds || [],
              JSON.stringify(entry.crossProfessionLinks || []),
              JSON.stringify(entry.imagePlaceholders || []),
              entry.status || 'draft']
          );
          imported++;
        } catch (entryErr: any) {
          errors.push(`Error for "${entry.slug}": ${entryErr.message}`);
        }
      }

      res.json({ imported, errors, total: entries.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/encyclopedia/stats", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await ensureTables();
      const result = await pool.query(`
        SELECT profession,
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE status = 'published')::int AS published,
          COUNT(*) FILTER (WHERE status = 'draft')::int AS draft,
          COUNT(DISTINCT category)::int AS categories
        FROM encyclopedia_entries
        GROUP BY profession
        ORDER BY profession
      `);
      const totals = await pool.query(`
        SELECT COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE status = 'published')::int AS published,
          COUNT(DISTINCT profession)::int AS professions,
          COUNT(DISTINCT category)::int AS categories
        FROM encyclopedia_entries
      `);
      res.json({
        byProfession: result.rows.map(snakeToCamel),
        totals: snakeToCamel(totals.rows[0]),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}
