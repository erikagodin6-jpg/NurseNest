import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin, resolveAuthUser } from "./admin-auth";
import { seedNewGradContent } from "./new-grad-content-seed";
import { generateNewGradGuide } from "./content-generators";
import { checkEntitlement, requireEntitlement, type Feature } from "./entitlements";
import { logPaywallAudit, type PaywallAuditEntry } from "./admin-auth";

function auditNewGradAccess(req: any, user: any, feature: string, granted: boolean) {
  logPaywallAudit({
    userId: user?.id ? String(user.id) : "anonymous",
    role: user?.tier || "anonymous",
    tier: user?.tier || "free",
    subscriptionStatus: user?.subscription_status || "none",
    resourcePath: req.originalUrl || req.url,
    contentTier: feature,
    granted,
  });
}

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

  async function getGuideBySlug(slug: string, req: any, res: any) {
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

    const guide = result.rows[0];
    if (guide.is_premium) {
      const user = await resolveAuthUser(req);
      const hasAccess = user ? checkEntitlement(user, "newgrad_toolkit") : false;
      auditNewGradAccess(req, user, "newgrad_toolkit", hasAccess);

      if (!hasAccess) {
        return res.status(403).json({
          error: "Premium feature - upgrade required",
          upgradeRequired: true,
          feature: "newgrad_toolkit",
          requiredTier: "new_grad_toolkit",
          guide: {
            id: guide.id,
            title: guide.title,
            slug: guide.slug,
            summary: guide.summary,
            profession: guide.profession,
            guide_type: guide.guide_type,
          },
        });
      }
    }

    res.json(guide);
  }

  app.get("/api/new-grad/guides/by-slug/:part1/:part2/:part3", async (req, res) => {
    try {
      const slug = `${req.params.part1}/${req.params.part2}/${req.params.part3}`;
      await getGuideBySlug(slug, req, res);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/guides/by-slug/:part1/:part2", async (req, res) => {
    try {
      const slug = `${req.params.part1}/${req.params.part2}`;
      await getGuideBySlug(slug, req, res);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/guides", async (req, res) => {
    try {
      const { profession, guideType, status } = req.query;
      const user = await resolveAuthUser(req);
      const hasToolkitAccess = user ? checkEntitlement(user, "newgrad_toolkit") : false;

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

      const guides = result.rows.map((guide: any) => {
        if (guide.is_premium && !hasToolkitAccess) {
          return {
            id: guide.id,
            title: guide.title,
            slug: guide.slug,
            summary: guide.summary,
            profession: guide.profession,
            guide_type: guide.guide_type,
            category: guide.category,
            seo_title: guide.seo_title,
            seo_description: guide.seo_description,
            is_premium: true,
            locked: true,
          };
        }
        return guide;
      });

      res.json(guides);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/new-grad/guides/lookup", async (req, res) => {
    try {
      const slug = String(req.query.slug || "");
      if (!slug) return res.status(400).json({ error: "slug query parameter required" });
      await getGuideBySlug(slug, req, res);
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
      const hasPremiumAccess = user ? checkEntitlement(user, "newgrad_full_interview_bank") : false;

      auditNewGradAccess(req, user, "newgrad_full_interview_bank", hasPremiumAccess);

      const { category, premium } = req.query;

      if (premium === "true" && !hasPremiumAccess) {
        return res.status(403).json({
          error: "Premium feature - upgrade required",
          upgradeRequired: true,
          feature: "newgrad_full_interview_bank",
          requiredTier: "new_grad_toolkit",
        });
      }

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
      const hasPremiumAccess = user ? checkEntitlement(user, "newgrad_premium_templates") : false;

      auditNewGradAccess(req, user, "newgrad_premium_templates", hasPremiumAccess);

      const { type, premium } = req.query;

      if (premium === "true" && !hasPremiumAccess) {
        return res.status(403).json({
          error: "Premium feature - upgrade required",
          upgradeRequired: true,
          feature: "newgrad_premium_templates",
          requiredTier: "new_grad_toolkit",
        });
      }

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

  app.get("/api/newgrad/certification-preview/:certSlug", async (req, res) => {
    try {
      const { certSlug } = req.params;
      const user = await resolveAuthUser(req);
      const hasFullAccess = user ? checkEntitlement(user, "newgrad_full_qbank") : false;

      auditNewGradAccess(req, user, "newgrad_cert_prep", hasFullAccess);

      const PREVIEW_LIMIT = 5;

      res.json({
        certification: certSlug,
        hasFullAccess,
        previewQuestionCount: PREVIEW_LIMIT,
        message: hasFullAccess
          ? "Full access granted to certification content"
          : `Showing ${PREVIEW_LIMIT} preview questions. Upgrade to Certification Prep for full access.`,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/newgrad/certification-full/:certSlug", requireEntitlement("newgrad_full_qbank"), async (req, res) => {
    try {
      const { certSlug } = req.params;

      const questionsResult = await pool.query(
        `SELECT * FROM new_grad_interview_questions WHERE status = 'published' AND category = $1 ORDER BY sort_order ASC, created_at DESC`,
        [certSlug]
      );

      const templatesResult = await pool.query(
        `SELECT * FROM new_grad_templates WHERE status = 'published' AND category = $1 ORDER BY created_at DESC`,
        [certSlug]
      );

      res.json({
        certification: certSlug,
        hasFullAccess: true,
        questions: questionsResult.rows,
        templates: templatesResult.rows,
        message: "Full access granted to certification content",
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/newgrad/premium/interview-questions", requireEntitlement("newgrad_full_interview_bank"), async (req, res) => {
    try {
      const { category } = req.query;
      let query = `SELECT * FROM new_grad_interview_questions WHERE status = 'published'`;
      const params: any[] = [];
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

  app.get("/api/newgrad/premium/templates", requireEntitlement("newgrad_premium_templates"), async (req, res) => {
    try {
      const { type } = req.query;
      let query = `SELECT * FROM new_grad_templates WHERE status = 'published'`;
      const params: any[] = [];
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

  app.get("/api/newgrad/practice-counts", async (_req, res) => {
    try {
      const interviewResult = await pool.query(
        `SELECT COUNT(*)::int as count FROM new_grad_interview_questions WHERE status = 'published'`
      );
      const dbInterviewCount = interviewResult.rows[0]?.count || 0;

      res.json({
        interviewQuestions: Math.max(dbInterviewCount, 25),
        scenarioQuestions: 28,
        simulationSets: 4,
        mockInterviewTests: 3,
        questionCategories: 18,
      });
    } catch (e: any) {
      res.json({
        interviewQuestions: 25,
        scenarioQuestions: 28,
        simulationSets: 4,
        mockInterviewTests: 3,
        questionCategories: 18,
      });
    }
  });

  app.get("/api/newgrad/entitlements", async (req, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.json({
          tier: "free",
          hasToolkitAccess: false,
          hasCertPrepAccess: false,
          hasFullAccess: false,
        });
      }

      const tier = user.tier || "free";
      res.json({
        tier,
        hasToolkitAccess: checkEntitlement(user, "newgrad_toolkit"),
        hasCertPrepAccess: checkEntitlement(user, "newgrad_cert_prep"),
        hasFullAccess: tier === "full_access" || tier === "admin",
        features: {
          brainSheets: checkEntitlement(user, "newgrad_brain_sheets"),
          shiftTemplates: checkEntitlement(user, "newgrad_shift_templates"),
          documentationCheats: checkEntitlement(user, "newgrad_documentation_cheats"),
          medSafety: checkEntitlement(user, "newgrad_med_safety"),
          unitOnboarding: checkEntitlement(user, "newgrad_unit_onboarding"),
          fullInterviewBank: checkEntitlement(user, "newgrad_full_interview_bank"),
          premiumTemplates: checkEntitlement(user, "newgrad_premium_templates"),
          fullQbank: checkEntitlement(user, "newgrad_full_qbank"),
          mockExams: checkEntitlement(user, "newgrad_mock_exams"),
          flashcards: checkEntitlement(user, "newgrad_flashcards"),
        },
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  const CONTENT_EXPANSION_ROADMAP = [
    {
      rank: 1,
      area: "Addiction Counsellor Certification Prep",
      slug: "addiction-counsellor",
      seoScore: 9.2,
      questionVolume: 8.5,
      conversionPotential: 8.8,
      professionalDemand: 9.0,
      composite: 8.88,
      status: "planned",
      notes: "High-demand niche with very few quality prep resources. Monthly search volume ~12K for CASAC/CADC/IC&RC exam prep. Low competition, high conversion intent.",
    },
    {
      rank: 2,
      area: "Psychotherapist Licensing Exam Prep",
      slug: "psychotherapist",
      seoScore: 8.8,
      questionVolume: 8.0,
      conversionPotential: 8.5,
      professionalDemand: 8.7,
      composite: 8.50,
      status: "planned",
      notes: "NCE/NCMHCE exam prep market growing rapidly. Strong organic search for 'counseling exam practice questions'. Underserved by current competitors.",
    },
    {
      rank: 3,
      area: "AI Adaptive Testing Engine",
      slug: "ai-adaptive-testing",
      seoScore: 7.5,
      questionVolume: 9.5,
      conversionPotential: 9.0,
      professionalDemand: 8.0,
      composite: 8.50,
      status: "planned",
      notes: "Platform-wide upgrade. NCLEX CAT simulation is a top-3 search term. Improves retention and conversion across all verticals. High engineering lift but massive SEO and product differentiation.",
    },
    {
      rank: 4,
      area: "Certification Exam Question Banks (CCRN, CEN, PCCN)",
      slug: "specialty-cert-qbanks",
      seoScore: 8.5,
      questionVolume: 9.0,
      conversionPotential: 7.5,
      professionalDemand: 8.0,
      composite: 8.25,
      status: "planned",
      notes: "Natural extension of existing nursing content. 'CCRN practice questions' has ~8K monthly searches. Builds on current question infrastructure.",
    },
    {
      rank: 5,
      area: "Social Work Licensing Exam Prep (ASWB)",
      slug: "social-work-aswb",
      seoScore: 8.0,
      questionVolume: 7.5,
      conversionPotential: 8.0,
      professionalDemand: 8.5,
      composite: 8.00,
      status: "planned",
      notes: "ASWB exam prep has ~15K monthly searches. Adjacent to nursing/allied health audience. High pass-rate anxiety drives purchase intent.",
    },
    {
      rank: 6,
      area: "Medical Laboratory Technologist Prep",
      slug: "mlt-prep",
      seoScore: 7.8,
      questionVolume: 7.0,
      conversionPotential: 7.5,
      professionalDemand: 8.0,
      composite: 7.58,
      status: "planned",
      notes: "MLT/MLS certification (ASCP BOC) underserved. Complements existing allied health hub. Moderate search volume but high conversion due to limited competition.",
    },
    {
      rank: 7,
      area: "Pharmacy Technician Certification (PTCB/ExCPT)",
      slug: "pharmacy-tech",
      seoScore: 7.5,
      questionVolume: 7.5,
      conversionPotential: 7.0,
      professionalDemand: 7.5,
      composite: 7.38,
      status: "planned",
      notes: "Pharmacy tech certification prep has steady demand (~6K monthly). Fits allied health vertical. Good upsell path to pharmacology content.",
    },
    {
      rank: 8,
      area: "Multilingual Clinical Scenario Expansion (FR/ES)",
      slug: "multilingual-scenarios",
      seoScore: 7.0,
      questionVolume: 6.5,
      conversionPotential: 7.5,
      professionalDemand: 8.0,
      composite: 7.25,
      status: "in-progress",
      notes: "French and Spanish clinical scenarios for Canadian/international markets. Lower search volume per language but near-zero competition. Supports existing i18n infrastructure.",
    },
  ];

  app.get("/api/admin/content-expansion-roadmap", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      let stored: any = null;
      try {
        const result = await pool.query(
          `SELECT value FROM admin_settings WHERE key = 'content_expansion_roadmap'`
        );
        if (result.rows.length > 0) {
          stored = JSON.parse(result.rows[0].value);
        }
      } catch {}

      res.json({
        roadmap: stored || CONTENT_EXPANSION_ROADMAP,
        isDefault: !stored,
        lastUpdated: stored ? undefined : new Date().toISOString(),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/content-expansion-roadmap", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { roadmap } = req.body;
      if (!Array.isArray(roadmap)) {
        return res.status(400).json({ error: "roadmap must be an array" });
      }

      await pool.query(
        `INSERT INTO admin_settings (key, value) VALUES ('content_expansion_roadmap', $1)
         ON CONFLICT (key) DO UPDATE SET value = $1`,
        [JSON.stringify(roadmap)]
      );

      res.json({ ok: true, message: "Roadmap saved" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
