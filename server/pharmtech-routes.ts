import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin, resolveAuthUser } from "./admin-auth";

function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj === null || typeof obj !== "object") return obj;
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = value;
  }
  return result;
}

export function registerPharmtechRoutes(app: Express) {
  app.get("/api/pharmtech/lessons", async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM pharmtech_lessons WHERE published = true ORDER BY sort_order, title`
      );
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/lessons/:slug", async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM pharmtech_lessons WHERE slug = $1 AND published = true`,
        [req.params.slug]
      );
      if (!rows[0]) return res.status(404).json({ error: "Lesson not found" });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/flashcard-decks", async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM pharmtech_flashcard_decks WHERE published = true ORDER BY sort_order, title`
      );
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/flashcard-decks/:slug", async (req, res) => {
    try {
      const { rows: deckRows } = await pool.query(
        `SELECT * FROM pharmtech_flashcard_decks WHERE slug = $1 AND published = true`,
        [req.params.slug]
      );
      if (!deckRows[0]) return res.status(404).json({ error: "Deck not found" });
      const deck = snakeToCamel(deckRows[0]);
      const { rows: cardRows } = await pool.query(
        `SELECT * FROM pharmtech_flashcards WHERE deck_id = $1 ORDER BY sort_order`,
        [deck.id]
      );
      res.json({ ...deck, cards: cardRows.map(snakeToCamel) });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/questions", async (req, res) => {
    try {
      const user = await resolveAuthUser(req);
      const isPro = user && (user.tier === "admin" || user.subscription_status === "active" || user.subscriptionStatus === "active");
      const FREE_LIMIT = 10;

      const category = req.query.category as string | undefined;
      const difficulty = req.query.difficulty ? Number(req.query.difficulty) : undefined;
      let query = `SELECT * FROM pharmtech_questions WHERE published = true`;
      const params: any[] = [];
      if (category) { params.push(category); query += ` AND category = $${params.length}`; }
      if (difficulty) { params.push(difficulty); query += ` AND difficulty = $${params.length}`; }
      query += ` ORDER BY category, difficulty`;
      if (!isPro) { query += ` LIMIT ${FREE_LIMIT}`; }
      const { rows } = await pool.query(query, params);
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/exams", async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM pharmtech_exams WHERE published = true ORDER BY sort_order, title`
      );
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/exams/:slug", async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM pharmtech_exams WHERE slug = $1 AND published = true`,
        [req.params.slug]
      );
      if (!rows[0]) return res.status(404).json({ error: "Exam not found" });
      const exam = snakeToCamel(rows[0]);
      const qIds = exam.questionIds || [];
      let questions: any[] = [];
      if (qIds.length > 0) {
        const { rows: qRows } = await pool.query(
          `SELECT * FROM pharmtech_questions WHERE id = ANY($1) AND published = true`,
          [qIds]
        );
        const qMap = new Map(qRows.map((r: any) => [r.id, snakeToCamel(r)]));
        questions = qIds.map((id: string) => qMap.get(id)).filter(Boolean);
      }
      res.json({ ...exam, questions });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/pharmtech/exam-attempts", async (req, res) => {
    try {
      const { examId, mode, totalQuestions, userId } = req.body;
      if (!examId || !totalQuestions) return res.status(400).json({ error: "examId and totalQuestions required" });
      const { rows } = await pool.query(
        `INSERT INTO pharmtech_exam_attempts (exam_id, mode, total_questions, user_id, status) VALUES ($1, $2, $3, $4, 'in_progress') RETURNING *`,
        [examId, mode || "timed", totalQuestions, userId || null]
      );
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/pharmtech/exam-attempts/:id", async (req, res) => {
    try {
      const { answers, flagged, score, timeSpentSeconds, status } = req.body;
      const sets: string[] = [];
      const params: any[] = [];
      if (answers !== undefined) { params.push(JSON.stringify(answers)); sets.push(`answers = $${params.length}::jsonb`); }
      if (flagged !== undefined) { params.push(JSON.stringify(flagged)); sets.push(`flagged = $${params.length}::jsonb`); }
      if (score !== undefined) { params.push(score); sets.push(`score = $${params.length}`); }
      if (timeSpentSeconds !== undefined) { params.push(timeSpentSeconds); sets.push(`time_spent_seconds = $${params.length}`); }
      if (status !== undefined) {
        params.push(status); sets.push(`status = $${params.length}`);
        if (status === "completed") sets.push(`completed_at = NOW()`);
      }
      if (sets.length === 0) return res.status(400).json({ error: "No fields to update" });
      params.push(req.params.id);
      const { rows } = await pool.query(
        `UPDATE pharmtech_exam_attempts SET ${sets.join(", ")} WHERE id = $${params.length} RETURNING *`,
        params
      );
      if (!rows[0]) return res.status(404).json({ error: "Attempt not found" });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/exam-attempts/:id", async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM pharmtech_exam_attempts WHERE id = $1`,
        [req.params.id]
      );
      if (!rows[0]) return res.status(404).json({ error: "Attempt not found" });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/exam-attempts/:id/review", async (req, res) => {
    try {
      const { rows: attemptRows } = await pool.query(
        `SELECT * FROM pharmtech_exam_attempts WHERE id = $1`,
        [req.params.id]
      );
      if (!attemptRows[0]) return res.status(404).json({ error: "Attempt not found" });
      const attempt = snakeToCamel(attemptRows[0]);
      if (attempt.status !== "completed") return res.status(400).json({ error: "Exam not yet completed" });

      const { rows: examRows } = await pool.query(
        `SELECT * FROM pharmtech_exams WHERE id = $1`,
        [attempt.examId]
      );
      if (!examRows[0]) return res.status(404).json({ error: "Exam not found" });
      const exam = snakeToCamel(examRows[0]);

      const qIds = exam.questionIds || [];
      let questions: any[] = [];
      if (qIds.length > 0) {
        const { rows: qRows } = await pool.query(
          `SELECT * FROM pharmtech_questions WHERE id = ANY($1)`,
          [qIds]
        );
        const qMap = new Map(qRows.map((r: any) => [r.id, snakeToCamel(r)]));
        questions = qIds.map((id: string) => qMap.get(id)).filter(Boolean);
      }

      const { rows: lessonRows } = await pool.query(
        `SELECT slug, title, category FROM pharmtech_lessons WHERE published = true`
      );
      const lessonMap = Object.fromEntries(lessonRows.map((r: any) => [r.slug, { title: r.title, category: r.category }]));

      res.json({ attempt, exam, questions, lessonMap });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/pharmtech/stats", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { rows } = await pool.query(`
        SELECT
          (SELECT COUNT(*) FROM pharmtech_lessons) as lesson_count,
          (SELECT COUNT(*) FROM pharmtech_flashcard_decks) as deck_count,
          (SELECT COALESCE(SUM(card_count), 0) FROM pharmtech_flashcard_decks) as flashcard_count,
          (SELECT COUNT(*) FROM pharmtech_questions) as question_count,
          (SELECT COUNT(*) FROM pharmtech_exams) as exam_count
      `);
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/pharmtech/lessons", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { rows } = await pool.query(`SELECT * FROM pharmtech_lessons ORDER BY sort_order, title`);
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/lessons", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { slug, externalId, title, category, summary, body, objectives, keyPoints, commonMistakes, relatedDeckSlugs, seoTitle, seoDescription, published, sortOrder } = req.body;
      if (!slug || !title || !category) return res.status(400).json({ error: "slug, title, category required" });
      const { rows } = await pool.query(
        `INSERT INTO pharmtech_lessons (slug, external_id, title, category, summary, body, objectives, key_points, common_mistakes, related_deck_slugs, seo_title, seo_description, published, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, category=EXCLUDED.category, summary=EXCLUDED.summary, body=EXCLUDED.body, objectives=EXCLUDED.objectives, key_points=EXCLUDED.key_points, common_mistakes=EXCLUDED.common_mistakes, related_deck_slugs=EXCLUDED.related_deck_slugs, seo_title=EXCLUDED.seo_title, seo_description=EXCLUDED.seo_description, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order, updated_at=NOW()
         RETURNING *`,
        [slug, externalId || null, title, category, summary || null, body || "", objectives || [], keyPoints || [], commonMistakes || [], relatedDeckSlugs || [], seoTitle || null, seoDescription || null, published !== false, sortOrder || 0]
      );
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/pharmtech/lessons/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { title, category, summary, body, objectives, keyPoints, commonMistakes, relatedDeckSlugs, seoTitle, seoDescription, published, sortOrder } = req.body;
      const { rows } = await pool.query(
        `UPDATE pharmtech_lessons SET title=COALESCE($1,title), category=COALESCE($2,category), summary=COALESCE($3,summary), body=COALESCE($4,body), objectives=COALESCE($5,objectives), key_points=COALESCE($6,key_points), common_mistakes=COALESCE($7,common_mistakes), related_deck_slugs=COALESCE($8,related_deck_slugs), seo_title=$9, seo_description=$10, published=COALESCE($11,published), sort_order=COALESCE($12,sort_order), updated_at=NOW() WHERE id=$13 RETURNING *`,
        [title, category, summary, body, objectives, keyPoints, commonMistakes, relatedDeckSlugs, seoTitle || null, seoDescription || null, published, sortOrder, req.params.id]
      );
      if (!rows[0]) return res.status(404).json({ error: "Not found" });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/pharmtech/lessons/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM pharmtech_lessons WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/import/lessons", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const items = req.body.items || req.body;
      if (!Array.isArray(items)) return res.status(400).json({ error: "Expected array of lessons" });
      let created = 0, updated = 0;
      for (const item of items) {
        const result = await pool.query(
          `INSERT INTO pharmtech_lessons (slug, external_id, title, category, summary, body, objectives, key_points, common_mistakes, related_deck_slugs, seo_title, seo_description, published, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
           ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, category=EXCLUDED.category, summary=EXCLUDED.summary, body=EXCLUDED.body, objectives=EXCLUDED.objectives, key_points=EXCLUDED.key_points, common_mistakes=EXCLUDED.common_mistakes, related_deck_slugs=EXCLUDED.related_deck_slugs, seo_title=EXCLUDED.seo_title, seo_description=EXCLUDED.seo_description, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order, updated_at=NOW()
           RETURNING (xmax = 0) as is_insert`,
          [item.slug, item.externalId || null, item.title, item.category, item.summary || null, item.body || "", item.objectives || [], item.keyPoints || [], item.commonMistakes || [], item.relatedDeckSlugs || [], item.seoTitle || null, item.seoDescription || null, item.published !== false, item.sortOrder || 0]
        );
        if (result.rows[0]?.is_insert) created++; else updated++;
      }
      res.json({ ok: true, created, updated, total: items.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/pharmtech/questions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { rows } = await pool.query(`SELECT * FROM pharmtech_questions ORDER BY category, difficulty`);
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/questions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { externalId, stem, options, correctIndex, rationale, category, difficulty, lessonSlug, published } = req.body;
      if (!stem || !rationale || !category) return res.status(400).json({ error: "stem, rationale, category required" });
      const { rows } = await pool.query(
        `INSERT INTO pharmtech_questions (external_id, stem, options, correct_index, rationale, category, difficulty, lesson_slug, published)
         VALUES ($1,$2,$3::jsonb,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [externalId || null, stem, JSON.stringify(options || []), correctIndex || 0, rationale, category, difficulty || 2, lessonSlug || null, published !== false]
      );
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/import/questions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const items = req.body.items || req.body;
      if (!Array.isArray(items)) return res.status(400).json({ error: "Expected array" });
      let created = 0, updated = 0;
      for (const q of items) {
        const eid = q.externalId || q.external_id || null;
        if (eid) {
          const result = await pool.query(
            `INSERT INTO pharmtech_questions (external_id, stem, options, correct_index, rationale, category, difficulty, lesson_slug, published)
             VALUES ($1,$2,$3::jsonb,$4,$5,$6,$7,$8,$9)
             ON CONFLICT (external_id) DO UPDATE SET stem=EXCLUDED.stem, options=EXCLUDED.options, correct_index=EXCLUDED.correct_index, rationale=EXCLUDED.rationale, category=EXCLUDED.category, difficulty=EXCLUDED.difficulty, lesson_slug=EXCLUDED.lesson_slug, published=EXCLUDED.published
             RETURNING (xmax = 0) as is_insert`,
            [eid, q.stem, JSON.stringify(q.options || []), q.correctIndex ?? q.correct_index ?? 0, q.rationale, q.category, q.difficulty || 2, q.lessonSlug || q.lesson_slug || null, q.published !== false]
          );
          if (result.rows[0]?.is_insert) created++; else updated++;
        } else {
          await pool.query(
            `INSERT INTO pharmtech_questions (stem, options, correct_index, rationale, category, difficulty, lesson_slug, published)
             VALUES ($1,$2::jsonb,$3,$4,$5,$6,$7,$8)`,
            [q.stem, JSON.stringify(q.options || []), q.correctIndex ?? q.correct_index ?? 0, q.rationale, q.category, q.difficulty || 2, q.lessonSlug || q.lesson_slug || null, q.published !== false]
          );
          created++;
        }
      }
      res.json({ ok: true, created, updated, total: items.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/pharmtech/questions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { stem, options, correctIndex, rationale, category, difficulty, lessonSlug, published } = req.body;
      const { rows } = await pool.query(
        `UPDATE pharmtech_questions SET stem=COALESCE($1,stem), options=COALESCE($2::jsonb,options), correct_index=COALESCE($3,correct_index), rationale=COALESCE($4,rationale), category=COALESCE($5,category), difficulty=COALESCE($6,difficulty), lesson_slug=$7, published=COALESCE($8,published) WHERE id=$9 RETURNING *`,
        [stem, options ? JSON.stringify(options) : null, correctIndex, rationale, category, difficulty, lessonSlug || null, published, req.params.id]
      );
      if (!rows[0]) return res.status(404).json({ error: "Not found" });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/pharmtech/questions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM pharmtech_questions WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/pharmtech/flashcard-decks", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { rows } = await pool.query(`SELECT * FROM pharmtech_flashcard_decks ORDER BY sort_order, title`);
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/flashcard-decks", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { slug, externalId, title, description, category, lessonSlug, published, sortOrder } = req.body;
      if (!slug || !title || !category) return res.status(400).json({ error: "slug, title, category required" });
      const { rows } = await pool.query(
        `INSERT INTO pharmtech_flashcard_decks (slug, external_id, title, description, category, lesson_slug, published, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, category=EXCLUDED.category, lesson_slug=EXCLUDED.lesson_slug, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order, updated_at=NOW()
         RETURNING *`,
        [slug, externalId || null, title, description || "", category, lessonSlug || null, published !== false, sortOrder || 0]
      );
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/import/flashcard-decks", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const items = req.body.items || req.body;
      if (!Array.isArray(items)) return res.status(400).json({ error: "Expected array" });
      let created = 0, updated = 0;
      for (const deck of items) {
        const result = await pool.query(
          `INSERT INTO pharmtech_flashcard_decks (slug, external_id, title, description, category, lesson_slug, published, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, category=EXCLUDED.category, lesson_slug=EXCLUDED.lesson_slug, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order, updated_at=NOW()
           RETURNING id, (xmax = 0) as is_insert`,
          [deck.slug, deck.externalId || null, deck.title, deck.description || "", deck.category, deck.lessonSlug || null, deck.published !== false, deck.sortOrder || 0]
        );
        const deckId = result.rows[0].id;
        if (result.rows[0]?.is_insert) created++; else updated++;

        if (deck.cards && Array.isArray(deck.cards)) {
          await pool.query(`DELETE FROM pharmtech_flashcards WHERE deck_id = $1`, [deckId]);
          for (let i = 0; i < deck.cards.length; i++) {
            const card = deck.cards[i];
            await pool.query(
              `INSERT INTO pharmtech_flashcards (deck_id, front, back, sort_order) VALUES ($1,$2,$3,$4)`,
              [deckId, card.front, card.back, i]
            );
          }
          await pool.query(
            `UPDATE pharmtech_flashcard_decks SET card_count = $1 WHERE id = $2`,
            [deck.cards.length, deckId]
          );
        }
      }
      res.json({ ok: true, created, updated, total: items.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/pharmtech/flashcard-decks/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { title, description, category, lessonSlug, published, sortOrder } = req.body;
      const { rows } = await pool.query(
        `UPDATE pharmtech_flashcard_decks SET title=COALESCE($1,title), description=COALESCE($2,description), category=COALESCE($3,category), lesson_slug=$4, published=COALESCE($5,published), sort_order=COALESCE($6,sort_order), updated_at=NOW() WHERE id=$7 RETURNING *`,
        [title, description, category, lessonSlug || null, published, sortOrder, req.params.id]
      );
      if (!rows[0]) return res.status(404).json({ error: "Not found" });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/pharmtech/flashcard-decks/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM pharmtech_flashcards WHERE deck_id = $1`, [req.params.id]);
      await pool.query(`DELETE FROM pharmtech_flashcard_decks WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/pharmtech/exams", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { rows } = await pool.query(`SELECT * FROM pharmtech_exams ORDER BY sort_order, title`);
      res.json(rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/exams", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { slug, externalId, title, description, questionIds, timeLimitMinutes, passingScore, published, sortOrder } = req.body;
      if (!slug || !title) return res.status(400).json({ error: "slug, title required" });
      const { rows } = await pool.query(
        `INSERT INTO pharmtech_exams (slug, external_id, title, description, question_ids, time_limit_minutes, passing_score, published, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, question_ids=EXCLUDED.question_ids, time_limit_minutes=EXCLUDED.time_limit_minutes, passing_score=EXCLUDED.passing_score, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order
         RETURNING *`,
        [slug, externalId || null, title, description || "", questionIds || [], timeLimitMinutes || 60, passingScore || 70, published !== false, sortOrder || 0]
      );
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pharmtech/import/exams", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const items = req.body.items || req.body;
      if (!Array.isArray(items)) return res.status(400).json({ error: "Expected array" });
      let created = 0, updated = 0;
      for (const exam of items) {
        const result = await pool.query(
          `INSERT INTO pharmtech_exams (slug, external_id, title, description, question_ids, time_limit_minutes, passing_score, published, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
           ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, question_ids=EXCLUDED.question_ids, time_limit_minutes=EXCLUDED.time_limit_minutes, passing_score=EXCLUDED.passing_score, published=EXCLUDED.published, sort_order=EXCLUDED.sort_order
           RETURNING (xmax = 0) as is_insert`,
          [exam.slug, exam.externalId || null, exam.title, exam.description || "", exam.questionIds || [], exam.timeLimitMinutes || 60, exam.passingScore || 70, exam.published !== false, exam.sortOrder || 0]
        );
        if (result.rows[0]?.is_insert) created++; else updated++;
      }
      res.json({ ok: true, created, updated, total: items.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/pharmtech/exams/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { title, description, questionIds, timeLimitMinutes, passingScore, published, sortOrder } = req.body;
      const { rows } = await pool.query(
        `UPDATE pharmtech_exams SET title=COALESCE($1,title), description=COALESCE($2,description), question_ids=COALESCE($3,question_ids), time_limit_minutes=COALESCE($4,time_limit_minutes), passing_score=COALESCE($5,passing_score), published=COALESCE($6,published), sort_order=COALESCE($7,sort_order) WHERE id=$8 RETURNING *`,
        [title, description, questionIds, timeLimitMinutes, passingScore, published, sortOrder, req.params.id]
      );
      if (!rows[0]) return res.status(404).json({ error: "Not found" });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/pharmtech/exams/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM pharmtech_exams WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pharmtech/stats", async (_req, res) => {
    try {
      const { rows } = await pool.query(`
        SELECT
          (SELECT COUNT(*) FROM pharmtech_lessons WHERE published = true) as lesson_count,
          (SELECT COUNT(*) FROM pharmtech_flashcard_decks WHERE published = true) as deck_count,
          (SELECT COALESCE(SUM(card_count), 0) FROM pharmtech_flashcard_decks WHERE published = true) as flashcard_count,
          (SELECT COUNT(*) FROM pharmtech_questions WHERE published = true) as question_count,
          (SELECT COUNT(*) FROM pharmtech_exams WHERE published = true) as exam_count
      `);
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
