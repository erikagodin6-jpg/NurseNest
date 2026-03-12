import type { Express } from "express";
import { pool } from "./storage";
import { resolveAuthUser } from "./admin-auth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generatePageTitle(topic: string, examType?: string, difficulty?: string): string {
  const parts = [topic];
  if (examType) parts.push(examType.toUpperCase());
  parts.push("Practice Questions");
  if (difficulty && difficulty !== "mixed") parts.push(`(${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)})`);
  return parts.join(" ");
}

function generateMetaDescription(topic: string, examType?: string, count: number = 10): string {
  const exam = examType ? ` ${examType.toUpperCase()}` : "";
  return `Practice ${count}+ free ${topic}${exam} questions with instant feedback, detailed explanations, and score tracking. Test your knowledge and prepare for your certification exam.`;
}

function generateIntro(topic: string, examType?: string): string {
  const exam = examType ? ` ${examType.toUpperCase()}` : " certification";
  return `Master ${topic} with these curated practice questions designed for${exam} exam preparation. Each question includes detailed rationales, clinical pearls, and references to help you build confidence and retain key concepts.`;
}

export function registerSeoQuizRoutes(app: Express) {
  app.get("/api/seo-quiz/pages", async (req, res) => {
    try {
      const { topic, careerType, difficulty, limit = "50", offset = "0" } = req.query;
      let query = `SELECT * FROM practice_quiz_pages WHERE status = 'published'`;
      const params: any[] = [];
      let paramIndex = 1;

      if (topic) {
        query += ` AND topic = $${paramIndex++}`;
        params.push(topic);
      }
      if (careerType) {
        query += ` AND career_type = $${paramIndex++}`;
        params.push(careerType);
      }
      if (difficulty && difficulty !== "mixed") {
        query += ` AND difficulty = $${paramIndex++}`;
        params.push(difficulty);
      }

      query += ` ORDER BY view_count DESC, created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
      params.push(Number(limit), Number(offset));

      const result = await pool.query(query, params);

      const countQuery = `SELECT COUNT(*) as total FROM practice_quiz_pages WHERE status = 'published'`;
      const countResult = await pool.query(countQuery);

      res.json({
        pages: result.rows,
        total: parseInt(countResult.rows[0]?.total || "0"),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/seo-quiz/page/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const pageResult = await pool.query(
        `UPDATE practice_quiz_pages SET view_count = view_count + 1 WHERE slug = $1 RETURNING *`,
        [slug]
      );

      if (pageResult.rows.length === 0) {
        return res.status(404).json({ error: "Page not found" });
      }

      const page = pageResult.rows[0];
      const questionIds = page.question_ids || [];

      let questions: any[] = [];
      if (questionIds.length > 0) {
        const qResult = await pool.query(
          `SELECT id, stem, options, correct_answer, rationale, topic, body_system, difficulty, 
                  question_type, clinical_pearl, exam_strategy, memory_hook
           FROM exam_questions 
           WHERE id = ANY($1) AND status = 'published'`,
          [questionIds]
        );
        questions = qResult.rows;
      }

      if (questions.length < 5) {
        const topicFilter = page.topic;
        const fallbackResult = await pool.query(
          `SELECT id, stem, options, correct_answer, rationale, topic, body_system, difficulty,
                  question_type, clinical_pearl, exam_strategy, memory_hook
           FROM exam_questions 
           WHERE status = 'published' 
             AND (topic = $1 OR body_system = $1)
             AND id != ALL($2)
           ORDER BY RANDOM() 
           LIMIT $3`,
          [topicFilter, questionIds, Math.max(0, 10 - questions.length)]
        );
        questions = [...questions, ...fallbackResult.rows];
      }

      const user = await resolveAuthUser(req as any).catch(() => null);
      const isFreeUser = !user || user.tier === "free";
      const freeLimit = 5;

      const relatedSlugs = page.related_page_slugs || [];
      let relatedPages: any[] = [];
      if (relatedSlugs.length > 0) {
        const rpResult = await pool.query(
          `SELECT slug, title, topic, question_count, difficulty FROM practice_quiz_pages WHERE slug = ANY($1) AND status = 'published'`,
          [relatedSlugs]
        );
        relatedPages = rpResult.rows;
      }

      if (relatedPages.length < 4) {
        const moreRelated = await pool.query(
          `SELECT slug, title, topic, question_count, difficulty FROM practice_quiz_pages 
           WHERE status = 'published' AND slug != $1 AND topic = $2
           ORDER BY view_count DESC LIMIT $3`,
          [slug, page.topic, 6 - relatedPages.length]
        );
        relatedPages = [...relatedPages, ...moreRelated.rows];
      }

      const flashcardResult = await pool.query(
        `SELECT df.id, df.front, df.back, df.rationale
         FROM deck_flashcards df 
         JOIN flashcard_decks fd ON df.deck_id = fd.id
         WHERE fd.visibility = 'public' 
           AND (fd.title ILIKE $1 OR df.front ILIKE $1)
         LIMIT 5`,
        [`%${page.topic}%`]
      );

      res.json({
        page: {
          slug: page.slug,
          title: page.title,
          metaDescription: page.meta_description,
          h1: page.h1,
          introText: page.intro_text,
          topic: page.topic,
          subtopic: page.subtopic,
          bodySystem: page.body_system,
          careerType: page.career_type,
          examType: page.exam_type,
          difficulty: page.difficulty,
          keywords: page.keywords || [],
          structuredData: page.structured_data,
        },
        questions: questions.map((q, i) => ({
          id: q.id,
          stem: q.stem,
          options: q.options,
          correctAnswer: isFreeUser && i >= freeLimit ? undefined : q.correct_answer,
          rationale: isFreeUser && i >= freeLimit ? undefined : q.rationale,
          topic: q.topic,
          bodySystem: q.body_system,
          difficulty: q.difficulty,
          questionType: q.question_type,
          clinicalPearl: isFreeUser && i >= freeLimit ? undefined : q.clinical_pearl,
          locked: isFreeUser && i >= freeLimit,
        })),
        relatedPages,
        flashcards: flashcardResult.rows.map((f: any) => ({
          id: f.id,
          front: f.front,
          back: f.back,
          rationale: f.rationale,
        })),
        freeLimit: isFreeUser ? freeLimit : null,
        totalQuestions: questions.length,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/seo-quiz/generate-pages", async (req, res) => {
    try {
      const user = await resolveAuthUser(req as any).catch(() => null);
      if (!user || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const topicsResult = await pool.query(
        `SELECT DISTINCT topic, body_system, tier, career_type, COUNT(*) as q_count
         FROM exam_questions 
         WHERE status = 'published' AND topic IS NOT NULL AND topic != ''
         GROUP BY topic, body_system, tier, career_type
         HAVING COUNT(*) >= 5
         ORDER BY q_count DESC`
      );

      let created = 0;
      let updated = 0;

      for (const row of topicsResult.rows) {
        const topic = row.topic;
        const bodySystem = row.body_system;
        const tier = row.tier;
        const careerType = row.career_type || "nursing";
        const slug = slugify(`${topic}-practice-questions`);

        const questionResult = await pool.query(
          `SELECT id FROM exam_questions 
           WHERE status = 'published' AND topic = $1 
           ORDER BY difficulty, RANDOM() 
           LIMIT 10`,
          [topic]
        );
        const questionIds = questionResult.rows.map((r: any) => r.id);
        const title = generatePageTitle(topic, tier);
        const metaDesc = generateMetaDescription(topic, tier, questionIds.length);
        const h1 = `${topic} Practice Questions`;
        const introText = generateIntro(topic, tier);

        const keywords = [
          `${topic} practice questions`,
          `${topic} quiz`,
          `${topic} exam prep`,
          tier ? `${tier} ${topic}` : topic,
          bodySystem ? `${bodySystem} questions` : "",
        ].filter(Boolean);

        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: title,
          description: metaDesc,
          educationalLevel: tier === "np" ? "Graduate" : "Undergraduate",
          about: { "@type": "Thing", name: topic },
          numberOfQuestions: questionIds.length,
        };

        const existing = await pool.query(
          `SELECT id FROM practice_quiz_pages WHERE slug = $1`,
          [slug]
        );

        if (existing.rows.length > 0) {
          await pool.query(
            `UPDATE practice_quiz_pages 
             SET question_ids = $1, question_count = $2, updated_at = NOW()
             WHERE slug = $3`,
            [questionIds, questionIds.length, slug]
          );
          updated++;
        } else {
          await pool.query(
            `INSERT INTO practice_quiz_pages 
             (id, slug, title, meta_description, h1, intro_text, topic, subtopic, body_system, career_type, exam_type, difficulty, question_count, question_ids, keywords, structured_data, is_auto_generated, status)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'mixed', $11, $12, $13, $14, true, 'published')`,
            [slug, title, metaDesc, h1, introText, topic, null, bodySystem, careerType, tier, questionIds.length, questionIds, keywords, JSON.stringify(structuredData)]
          );
          created++;
        }
      }

      res.json({ created, updated, total: topicsResult.rows.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/seo-quiz/sitemap", async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT slug, updated_at FROM practice_quiz_pages WHERE status = 'published' ORDER BY updated_at DESC`
      );

      const baseUrl = "https://www.nursenest.ca";
      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (const row of result.rows) {
        xml += `
  <url>
    <loc>${baseUrl}/en/quiz/${row.slug}</loc>
    <lastmod>${new Date(row.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }

      xml += `\n</urlset>`;
      res.set("Content-Type", "application/xml");
      res.send(xml);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/seo-quiz/topics", async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT topic, COUNT(*) as page_count, SUM(view_count) as total_views
         FROM practice_quiz_pages 
         WHERE status = 'published'
         GROUP BY topic 
         ORDER BY total_views DESC`
      );
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/offline/sync-progress", async (req, res) => {
    try {
      const { progress } = req.body;
      if (!Array.isArray(progress)) {
        return res.status(400).json({ error: "progress must be an array" });
      }

      let synced = 0;
      for (const p of progress) {
        try {
          await pool.query(
            `INSERT INTO test_results (id, user_id, lesson_id, test_type, score, total_questions, completed_at)
             VALUES (gen_random_uuid(), 'offline', $1, 'offline_practice', $2, 1, to_timestamp($3 / 1000.0))`,
            [p.questionId, p.isCorrect ? 1 : 0, p.answeredAt]
          );
          synced++;
        } catch {
          // skip duplicates
        }
      }

      res.json({ synced, total: progress.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/push/subscribe", async (req, res) => {
    try {
      const user = await resolveAuthUser(req as any).catch(() => null);
      const { endpoint, p256dh, auth, userId, reminderTime, enableDailyReminder, enableExamReminder, enableFlashcardReminder } = req.body;

      if (!endpoint || !p256dh || !auth) {
        return res.status(400).json({ error: "Missing subscription data" });
      }

      await pool.query(
        `INSERT INTO push_subscriptions (id, user_id, endpoint, p256dh, auth, reminder_time, enable_daily_reminder, enable_exam_reminder, enable_flashcard_reminder)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (endpoint) DO UPDATE SET 
           user_id = EXCLUDED.user_id,
           p256dh = EXCLUDED.p256dh,
           auth = EXCLUDED.auth,
           reminder_time = EXCLUDED.reminder_time,
           enable_daily_reminder = EXCLUDED.enable_daily_reminder,
           enable_exam_reminder = EXCLUDED.enable_exam_reminder,
           enable_flashcard_reminder = EXCLUDED.enable_flashcard_reminder`,
        [userId || null, endpoint, p256dh, auth, reminderTime || "09:00", enableDailyReminder !== false, enableExamReminder !== false, enableFlashcardReminder !== false]
      );

      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/push/subscribe", async (req, res) => {
    try {
      const { endpoint } = req.body;
      if (!endpoint) return res.status(400).json({ error: "Missing endpoint" });
      await pool.query(`DELETE FROM push_subscriptions WHERE endpoint = $1`, [endpoint]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/push/status", async (req, res) => {
    try {
      const { endpoint } = req.query;
      if (!endpoint) return res.json({ subscribed: false });
      const result = await pool.query(
        `SELECT reminder_time, enable_daily_reminder, enable_exam_reminder, enable_flashcard_reminder FROM push_subscriptions WHERE endpoint = $1`,
        [endpoint]
      );
      if (result.rows.length === 0) return res.json({ subscribed: false });
      const sub = result.rows[0];
      res.json({
        subscribed: true,
        reminderTime: sub.reminder_time,
        enableDailyReminder: sub.enable_daily_reminder,
        enableExamReminder: sub.enable_exam_reminder,
        enableFlashcardReminder: sub.enable_flashcard_reminder,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/offline/packs", async (req, res) => {
    try {
      const topicsResult = await pool.query(
        `SELECT topic, body_system, tier, career_type, COUNT(*) as question_count
         FROM exam_questions 
         WHERE status = 'published' AND topic IS NOT NULL AND topic != ''
         GROUP BY topic, body_system, tier, career_type
         HAVING COUNT(*) >= 5
         ORDER BY COUNT(*) DESC
         LIMIT 50`
      );

      const packs = topicsResult.rows.map((r: any) => ({
        id: slugify(`${r.topic}-${r.tier}`),
        title: `${r.topic} (${(r.tier || "").toUpperCase()})`,
        topic: r.topic,
        bodySystem: r.body_system,
        tier: r.tier,
        careerType: r.career_type,
        questionCount: parseInt(r.question_count),
        type: "questions" as const,
      }));

      const decksResult = await pool.query(
        `SELECT id, title, card_count, tier FROM flashcard_decks WHERE visibility = 'public' AND card_count > 0 ORDER BY card_count DESC LIMIT 20`
      );

      const flashcardPacks = decksResult.rows.map((r: any) => ({
        id: `deck-${r.id}`,
        title: r.title,
        topic: r.title,
        tier: r.tier,
        cardCount: parseInt(r.card_count),
        type: "flashcards" as const,
      }));

      res.json({ questionPacks: packs, flashcardPacks });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/offline/download-pack/:packId", async (req, res) => {
    try {
      const user = await resolveAuthUser(req as any).catch(() => null);
      if (!user) {
        return res.status(401).json({ error: "Authentication required to download packs" });
      }

      const { packId } = req.params;

      if (packId.startsWith("deck-")) {
        const deckId = packId.replace("deck-", "");
        const cards = await pool.query(
          `SELECT id, front, back, rationale, tags, deck_id FROM deck_flashcards WHERE deck_id = $1`,
          [deckId]
        );
        return res.json({
          type: "flashcards",
          cards: cards.rows.map((c: any) => ({
            id: c.id,
            front: c.front,
            back: c.back,
            rationale: c.rationale,
            tags: c.tags || [],
            deckId: c.deck_id,
          })),
        });
      }

      const parts = packId.split("-");
      const tier = parts.pop();
      const topic = parts.join("-").replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

      const questions = await pool.query(
        `SELECT id, stem, options, correct_answer, rationale, topic, body_system, difficulty, tier
         FROM exam_questions 
         WHERE status = 'published' AND (LOWER(topic) = LOWER($1) OR LOWER(body_system) = LOWER($1))
         ORDER BY difficulty
         LIMIT 100`,
        [topic]
      );

      res.json({
        type: "questions",
        questions: questions.rows.map((q: any) => ({
          id: q.id,
          stem: q.stem,
          options: q.options,
          correctAnswer: q.correct_answer,
          rationale: q.rationale,
          topic: q.topic,
          bodySystem: q.body_system,
          difficulty: q.difficulty,
          tier: q.tier,
        })),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
