import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin, resolveAuthUser } from "./admin-auth";
import { seedNewGradContent } from "./new-grad-content-seed";
import { generateNewGradGuide } from "./content-generators";

export function registerNewGradRoutes(app: Express) {
  app.post("/api/admin/new-grad/seed", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await seedNewGradContent();
      res.json({
        ok: true,
        message: `Seeded ${result.seeded} guides, skipped ${result.skipped} existing`,
        ...result,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/new-grad/generate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { guideType, topic, profession, targetKeyword } = req.body;
      if (!guideType || !topic || !profession) {
        return res.status(400).json({ error: "guideType, topic, and profession are required" });
      }

      const generated = await generateNewGradGuide(
        guideType,
        topic,
        profession,
        targetKeyword || topic
      );

      const existing = await pool.query(
        `SELECT id FROM new_grad_guides WHERE slug = $1`,
        [generated.slug]
      );
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: "Guide with this slug already exists", slug: generated.slug });
      }

      const result = await pool.query(
        `INSERT INTO new_grad_guides (id, title, slug, profession, guide_type, category, summary, content, sections, seo_title, seo_description, seo_keywords, faq_items, related_guide_ids, status, tags, author_name, published_at, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'published', $14, $15, NOW(), NOW(), NOW())
         RETURNING *`,
        [
          generated.title,
          generated.slug,
          generated.profession,
          generated.guideType,
          generated.category,
          generated.summary,
          JSON.stringify(generated.content),
          JSON.stringify(generated.sections),
          generated.seoTitle,
          generated.seoDescription,
          generated.seoKeywords,
          JSON.stringify(generated.faqItems),
          [],
          generated.tags,
          generated.authorName,
        ]
      );

      res.json({ ok: true, guide: result.rows[0] });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  async function getGuideBySlug(slug: string, res: any) {
    const result = await pool.query(
      `SELECT g.*, 
        COALESCE(
          (SELECT json_agg(json_build_object('id', r.id, 'title', r.title, 'slug', r.slug, 'profession', r.profession, 'guide_type', r.guide_type, 'summary', r.summary))
           FROM new_grad_guides r WHERE r.id = ANY(g.related_guide_ids) AND r.status = 'published'),
          '[]'::json
        ) as related_guides
       FROM new_grad_guides g WHERE g.slug = $1 AND g.status = 'published'`,
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Guide not found" });
    }
    res.json(result.rows[0]);
  }

  app.get("/api/new-grad/guides/by-slug/:part1/:part2/:part3", async (req, res) => {
    try {
      const slug = `${req.params.part1}/${req.params.part2}/${req.params.part3}`;
      await getGuideBySlug(slug, res);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/guides/by-slug/:part1/:part2", async (req, res) => {
    try {
      const slug = `${req.params.part1}/${req.params.part2}`;
      await getGuideBySlug(slug, res);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/guides", async (req, res) => {
    try {
      const { profession, guideType, status } = req.query;
      let query = `SELECT * FROM new_grad_guides WHERE 1=1`;
      const params: any[] = [];

      if (profession) {
        params.push(profession);
        query += ` AND profession = $${params.length}`;
      }
      if (guideType) {
        params.push(guideType);
        query += ` AND guide_type = $${params.length}`;
      }
      if (status) {
        params.push(status);
        query += ` AND status = $${params.length}`;
      } else {
        query += ` AND status = 'published'`;
      }

      query += ` ORDER BY created_at DESC`;
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/guides/lookup", async (req, res) => {
    try {
      const slug = String(req.query.slug || "");
      if (!slug) return res.status(400).json({ error: "slug query parameter required" });
      await getGuideBySlug(slug, res);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/new-grad/guides", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { title, slug, profession, guideType, category, summary, content, sections, seoTitle, seoDescription, seoKeywords, faqItems, relatedGuideIds, status, tags, authorName } = req.body;
      const result = await pool.query(
        `INSERT INTO new_grad_guides (id, title, slug, profession, guide_type, category, summary, content, sections, seo_title, seo_description, seo_keywords, faq_items, related_guide_ids, status, tags, author_name, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
         RETURNING *`,
        [title, slug, profession, guideType, category, summary, JSON.stringify(content || []), JSON.stringify(sections || []), seoTitle, seoDescription, seoKeywords || [], JSON.stringify(faqItems || []), relatedGuideIds || [], status || "draft", tags || [], authorName]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/new-grad/guides/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { title, slug, profession, guideType, category, summary, content, sections, seoTitle, seoDescription, seoKeywords, faqItems, relatedGuideIds, status, tags, authorName } = req.body;
      const result = await pool.query(
        `UPDATE new_grad_guides SET title=$1, slug=$2, profession=$3, guide_type=$4, category=$5, summary=$6, content=$7, sections=$8, seo_title=$9, seo_description=$10, seo_keywords=$11, faq_items=$12, related_guide_ids=$13, status=$14, tags=$15, author_name=$16, updated_at=NOW(),
         published_at = CASE WHEN $14 = 'published' AND published_at IS NULL THEN NOW() ELSE published_at END
         WHERE id=$17 RETURNING *`,
        [title, slug, profession, guideType, category, summary, JSON.stringify(content || []), JSON.stringify(sections || []), seoTitle, seoDescription, seoKeywords || [], JSON.stringify(faqItems || []), relatedGuideIds || [], status || "draft", tags || [], authorName, req.params.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/new-grad/guides/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM new_grad_guides WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/testimonials", async (req, res) => {
    try {
      const { profession, featured, status } = req.query;
      let query = `SELECT * FROM new_grad_testimonials WHERE 1=1`;
      const params: any[] = [];

      if (profession) {
        params.push(profession);
        query += ` AND profession = $${params.length}`;
      }
      if (featured === "true") {
        query += ` AND featured = true`;
      }
      if (status) {
        params.push(status);
        query += ` AND status = $${params.length}`;
      } else {
        query += ` AND status = 'approved'`;
      }

      query += ` ORDER BY created_at DESC`;
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/new-grad/testimonials", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { name, profession, role, organization, content, rating, avatarUrl, featured, status } = req.body;
      const result = await pool.query(
        `INSERT INTO new_grad_testimonials (id, name, profession, role, organization, content, rating, avatar_url, featured, status, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *`,
        [name, profession, role, organization, content, rating || 5, avatarUrl, featured || false, status || "pending"]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/new-grad/testimonials/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { name, profession, role, organization, content, rating, avatarUrl, featured, status } = req.body;
      const result = await pool.query(
        `UPDATE new_grad_testimonials SET name=$1, profession=$2, role=$3, organization=$4, content=$5, rating=$6, avatar_url=$7, featured=$8, status=$9
         WHERE id=$10 RETURNING *`,
        [name, profession, role, organization, content, rating, avatarUrl, featured, status, req.params.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/new-grad/testimonials/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM new_grad_testimonials WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/new-grad/lead-capture", async (req, res) => {
    try {
      const { email, resourceType, resourceName, profession } = req.body;
      if (!email || !resourceType || !resourceName) {
        return res.status(400).json({ error: "Email, resourceType, and resourceName are required" });
      }

      const trimmed = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return res.status(400).json({ error: "Valid email required" });
      }

      const subResult = await pool.query(
        `INSERT INTO email_subscribers (id, email, tier, source, frequency, created_at)
         VALUES (gen_random_uuid(), $1, 'general', $2, 'weekly', NOW())
         ON CONFLICT (email) DO UPDATE SET source = EXCLUDED.source
         RETURNING id`,
        [trimmed, `new-grad-${resourceType}`]
      );
      const subscriberId = subResult.rows[0]?.id;

      await pool.query(
        `INSERT INTO lead_capture_downloads (id, subscriber_id, email, resource_type, resource_name, profession, downloaded_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())`,
        [subscriberId, trimmed, resourceType, resourceName, profession]
      );

      res.json({ ok: true, message: "Resource will be sent to your email!" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/stats", async (req, res) => {
    try {
      const guides = await pool.query(`SELECT profession, guide_type, COUNT(*)::int as count FROM new_grad_guides WHERE status = 'published' GROUP BY profession, guide_type`);
      const testimonials = await pool.query(`SELECT profession, COUNT(*)::int as count FROM new_grad_testimonials WHERE status = 'approved' GROUP BY profession`);
      const downloads = await pool.query(`SELECT resource_type, COUNT(*)::int as count FROM lead_capture_downloads GROUP BY resource_type`);

      res.json({
        guides: guides.rows,
        testimonials: testimonials.rows,
        downloads: downloads.rows,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/newgrad/interview-questions", async (req, res) => {
    try {
      const user = await resolveAuthUser(req);
      const userTier = user?.tier || "free";
      const hasPremiumAccess = userTier === "newgrad" || userTier === "admin";

      const { category } = req.query;
      let query = `SELECT * FROM new_grad_interview_questions WHERE status = 'published'`;
      const params: any[] = [];
      if (!hasPremiumAccess) {
        query += ` AND is_premium = false`;
      }
      if (category) {
        params.push(category);
        query += ` AND category = $${params.length}`;
      }
      query += ` ORDER BY sort_order ASC, created_at DESC`;
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/newgrad/interview-questions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { category, question, sampleAnswer, tips, difficulty, isPremium, sortOrder } = req.body;
      const result = await pool.query(
        `INSERT INTO new_grad_interview_questions (id, category, question, sample_answer, tips, difficulty, is_premium, sort_order, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *`,
        [category, question, sampleAnswer, tips, difficulty || "moderate", isPremium || false, sortOrder || 0]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/newgrad/interview-questions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { category, question, sampleAnswer, tips, difficulty, isPremium, status, sortOrder } = req.body;
      const result = await pool.query(
        `UPDATE new_grad_interview_questions SET category=$1, question=$2, sample_answer=$3, tips=$4, difficulty=$5, is_premium=$6, status=$7, sort_order=$8
         WHERE id=$9 RETURNING *`,
        [category, question, sampleAnswer, tips, difficulty, isPremium, status, sortOrder, req.params.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/newgrad/interview-questions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM new_grad_interview_questions WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/newgrad/templates", async (req, res) => {
    try {
      const user = await resolveAuthUser(req);
      const userTier = user?.tier || "free";
      const hasPremiumAccess = userTier === "newgrad" || userTier === "admin";

      const { type } = req.query;
      let query = `SELECT * FROM new_grad_templates WHERE status = 'published'`;
      const params: any[] = [];
      if (!hasPremiumAccess) {
        query += ` AND is_premium = false`;
      }
      if (type) {
        params.push(type);
        query += ` AND template_type = $${params.length}`;
      }
      query += ` ORDER BY created_at DESC`;
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/newgrad/templates", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { title, slug, templateType, category, description, content, previewContent, isPremium, tags } = req.body;
      const result = await pool.query(
        `INSERT INTO new_grad_templates (id, title, slug, template_type, category, description, content, preview_content, is_premium, tags, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
        [title, slug, templateType, category, description, JSON.stringify(content || {}), previewContent, isPremium !== false, tags || []]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/newgrad/templates/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { title, slug, templateType, category, description, content, previewContent, isPremium, status, tags } = req.body;
      const result = await pool.query(
        `UPDATE new_grad_templates SET title=$1, slug=$2, template_type=$3, category=$4, description=$5, content=$6, preview_content=$7, is_premium=$8, status=$9, tags=$10, updated_at=NOW()
         WHERE id=$11 RETURNING *`,
        [title, slug, templateType, category, description, JSON.stringify(content || {}), previewContent, isPremium, status, tags, req.params.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/newgrad/templates/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM new_grad_templates WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
