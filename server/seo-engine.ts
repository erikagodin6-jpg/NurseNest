import type { Express, Request, Response } from "express";
import { pool } from "./storage";

const CAREER_TRACKS = [
  { slug: "pharmacy-tech", label: "Pharmacy Technician" },
  { slug: "respiratory-therapy", label: "Respiratory Therapy (RRT)" },
  { slug: "paramedic", label: "Paramedic" },
  { slug: "medical-lab-technologist", label: "Medical Lab Technologist (MLT)" },
  { slug: "medical-imaging", label: "Medical Imaging (Radiology)" },
  { slug: "ultrasound", label: "Ultrasound Technologist" },
  { slug: "physical-therapy-assistant", label: "Physical Therapy Assistant (PTA)" },
  { slug: "occupational-therapy-assistant", label: "Occupational Therapy Assistant (OTA)" },
];

const STARTER_CLUSTERS = [
  {
    keyword: "Pharmacy Tech Fundamentals",
    careerTrack: "pharmacy-tech",
    pillarSlug: "pharmacy-tech/pharmacy-tech-fundamentals",
    supports: [
      "Dosage Calculations for Pharmacy Techs",
      "Sterile Compounding Basics",
      "Medication Safety and Error Prevention",
      "Controlled Substances Regulations",
      "Medication Refrigeration and Storage",
      "Prescription Labeling Requirements",
      "High-Alert Medications in Pharmacy",
    ],
  },
  {
    keyword: "Respiratory Therapy Fundamentals",
    careerTrack: "respiratory-therapy",
    pillarSlug: "respiratory-therapy/respiratory-therapy-fundamentals",
    supports: [
      "ABG Interpretation for RRTs",
      "Oxygen Delivery Devices Comparison",
      "Ventilator Basics and Modes",
      "COPD vs Asthma Management",
      "Suctioning Techniques and Safety",
      "Tracheostomy Care Essentials",
      "Aerosol Therapy and Nebulizers",
    ],
  },
  {
    keyword: "Prehospital Assessment and Emergencies",
    careerTrack: "paramedic",
    pillarSlug: "paramedic/prehospital-assessment-emergencies",
    supports: [
      "Trauma Primary Survey ABCDE",
      "STEMI Recognition in the Field",
      "Stroke FAST Assessment",
      "Types of Shock for Paramedics",
      "Airway Management Techniques",
      "Prehospital Medications",
    ],
  },
  {
    keyword: "Lab Specimen Collection and Interpretation",
    careerTrack: "medical-lab-technologist",
    pillarSlug: "medical-lab-technologist/lab-specimen-collection-interpretation",
    supports: [
      "Order of Draw Complete Guide",
      "Hemolysis Causes and Prevention",
      "CBC Basics and Interpretation",
      "Coagulation Labs Explained",
      "Blood Culture Collection",
      "Critical Lab Values",
    ],
  },
  {
    keyword: "Imaging Safety and Fundamentals",
    careerTrack: "medical-imaging",
    pillarSlug: "medical-imaging/imaging-safety-fundamentals",
    supports: [
      "Contrast Reaction Management",
      "Radiation Safety Principles",
      "Patient Preparation for Imaging",
      "Common Radiographic Positioning",
      "Imaging Documentation Standards",
      "Contraindications for Imaging Studies",
    ],
  },
];

async function requireAdmin(req: Request, res: Response): Promise<any> {
  const username = String((req.body as any)?.username || req.query?.username || "");
  const password = String((req.body as any)?.password || req.query?.password || "");
  if (username && password) {
    const r = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2 AND tier = 'admin'",
      [username, password]
    );
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

function mapCluster(row: any) {
  return {
    id: row.id,
    keyword: row.keyword,
    countryMode: row.country_mode,
    examTier: row.exam_tier,
    pillarSlug: row.pillar_slug,
    status: row.status,
    notes: row.notes,
    siteContext: row.site_context,
    careerTrack: row.career_track,
    careerCountryMode: row.career_country_mode,
    examName: row.exam_name,
    blueprintTags: row.blueprint_tags,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapArticle(row: any) {
  return {
    id: row.id,
    clusterId: row.cluster_id,
    type: row.type,
    status: row.status,
    title: row.title,
    slug: row.slug,
    targetKeyword: row.target_keyword,
    searchIntent: row.search_intent,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    outlineJson: row.outline_json,
    contentMd: row.content_md,
    wordCount: row.word_count,
    readingLevel: row.reading_level,
    canonicalUrl: row.canonical_url,
    requiresInfographic: row.requires_infographic,
    requiresPins: row.requires_pins,
    requiresPracticeQuestions: row.requires_practice_questions,
    publishedAt: row.published_at,
    siteContext: row.site_context,
    careerTrack: row.career_track,
    examName: row.exam_name,
    primaryCategory: row.primary_category,
    secondaryCategory: row.secondary_category,
    gatingLevel: row.gating_level,
    requiresDisclaimer: row.requires_disclaimer,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

let starterSeeded = false;

async function seedStarterClusters(): Promise<void> {
  if (starterSeeded) return;
  try {
    const existing = await pool.query("SELECT COUNT(*)::int AS c FROM seo_clusters WHERE site_context = 'allied'");
    if (parseInt(existing.rows[0]?.c || "0") > 0) {
      starterSeeded = true;
      return;
    }
    for (const cluster of STARTER_CLUSTERS) {
      const cr = await pool.query(
        `INSERT INTO seo_clusters (keyword, country_mode, exam_tier, pillar_slug, status, site_context, career_track, career_country_mode)
         VALUES ($1, 'BOTH', 'ALL', $2, 'draft', 'allied', $3, 'BOTH')
         ON CONFLICT (pillar_slug) DO NOTHING RETURNING id`,
        [cluster.keyword, cluster.pillarSlug, cluster.careerTrack]
      );
      const clusterId = cr.rows[0]?.id;
      if (!clusterId) continue;

      const pillarSlug = cluster.pillarSlug;
      await pool.query(
        `INSERT INTO seo_articles (cluster_id, type, status, title, slug, target_keyword, search_intent, site_context, career_track, gating_level)
         VALUES ($1, 'pillar', 'draft', $2, $3, $2, 'informational', 'allied', $4, 'public')
         ON CONFLICT (slug) DO NOTHING`,
        [clusterId, cluster.keyword, pillarSlug, cluster.careerTrack]
      );

      for (const supportTitle of cluster.supports) {
        const supportSlug = `${cluster.careerTrack}/${supportTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
        await pool.query(
          `INSERT INTO seo_articles (cluster_id, type, status, title, slug, target_keyword, search_intent, site_context, career_track, gating_level)
           VALUES ($1, 'support', 'draft', $2, $3, $2, 'informational', 'allied', $4, 'public')
           ON CONFLICT (slug) DO NOTHING`,
          [clusterId, supportTitle, supportSlug, cluster.careerTrack]
        );
      }
    }
    starterSeeded = true;
    console.log("[SEO Engine] Starter allied clusters seeded");
  } catch (err: any) {
    console.error("[SEO Engine] Seed error:", err.message);
  }
}

export function setupSeoEngineRoutes(app: Express): void {
  app.get("/api/admin/seo-engine/career-tracks", async (_req: Request, res: Response) => {
    res.json(CAREER_TRACKS);
  });

  app.get("/api/admin/seo-engine/stats", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const siteContext = String(req.query.siteContext || "nursing");
      const careerTrack = req.query.careerTrack ? String(req.query.careerTrack) : null;

      let clusterWhere = "WHERE site_context = $1";
      let articleWhere = "WHERE site_context = $1";
      const params: any[] = [siteContext];
      if (careerTrack) {
        clusterWhere += " AND career_track = $2";
        articleWhere += " AND career_track = $2";
        params.push(careerTrack);
      }

      const clusters = await pool.query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'published')::int AS published, COUNT(*) FILTER (WHERE status = 'draft')::int AS draft, COUNT(*) FILTER (WHERE status = 'generating')::int AS generating FROM seo_clusters ${clusterWhere}`, params);
      const articles = await pool.query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE type = 'pillar')::int AS pillars, COUNT(*) FILTER (WHERE type = 'support')::int AS supports, COUNT(*) FILTER (WHERE status = 'published')::int AS published, COUNT(*) FILTER (WHERE status = 'draft')::int AS draft, COUNT(*) FILTER (WHERE status = 'needs_review')::int AS needs_review, COALESCE(SUM(word_count), 0)::int AS total_words FROM seo_articles ${articleWhere}`, params);
      const infographics = await pool.query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'ready')::int AS ready FROM seo_infographics ${articleWhere.replace('site_context', 'site_context')}`, params);
      const pins = await pool.query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'ready')::int AS ready FROM seo_pins ${articleWhere.replace('site_context', 'site_context')}`, params);
      const qc = await pool.query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE passed = true)::int AS passed, COUNT(*) FILTER (WHERE passed = false)::int AS failed FROM qc_runs`);

      res.json({
        clusters: clusters.rows[0],
        articles: articles.rows[0],
        infographics: infographics.rows[0],
        pins: pins.rows[0],
        qc: qc.rows[0],
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/clusters", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await seedStarterClusters();
      const siteContext = String(req.query.siteContext || "nursing");
      const careerTrack = req.query.careerTrack ? String(req.query.careerTrack) : null;
      const status = req.query.status ? String(req.query.status) : null;

      let query = "SELECT * FROM seo_clusters WHERE site_context = $1";
      const params: any[] = [siteContext];
      let idx = 2;
      if (careerTrack) { query += ` AND career_track = $${idx++}`; params.push(careerTrack); }
      if (status) { query += ` AND status = $${idx++}`; params.push(status); }
      query += " ORDER BY created_at DESC";

      const r = await pool.query(query, params);
      res.json(r.rows.map(mapCluster));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/seo-engine/clusters", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { keyword, countryMode, examTier, pillarSlug, siteContext, careerTrack, examName, notes } = req.body as any;
      if (!keyword || !pillarSlug) return res.status(400).json({ error: "keyword and pillarSlug required" });

      const slug = siteContext === "allied" && careerTrack ? `${careerTrack}/${pillarSlug}` : pillarSlug;

      const r = await pool.query(
        `INSERT INTO seo_clusters (keyword, country_mode, exam_tier, pillar_slug, site_context, career_track, exam_name, notes, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'draft') RETURNING *`,
        [keyword, countryMode || "BOTH", examTier || "ALL", slug, siteContext || "nursing", careerTrack || null, examName || null, notes || null]
      );
      res.json(mapCluster(r.rows[0]));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/seo-engine/clusters/:id/generate", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { id } = req.params;
      const cluster = await pool.query("SELECT * FROM seo_clusters WHERE id = $1", [id]);
      if (!cluster.rows[0]) return res.status(404).json({ error: "Cluster not found" });

      await pool.query("UPDATE seo_clusters SET status = 'generating', updated_at = NOW() WHERE id = $1", [id]);

      const existing = await pool.query("SELECT COUNT(*)::int AS c FROM seo_articles WHERE cluster_id = $1", [id]);
      if (parseInt(existing.rows[0]?.c || "0") === 0) {
        const row = cluster.rows[0];
        const pillarSlug = row.pillar_slug;
        await pool.query(
          `INSERT INTO seo_articles (cluster_id, type, status, title, slug, target_keyword, search_intent, site_context, career_track, gating_level)
           VALUES ($1, 'pillar', 'draft', $2, $3, $2, 'informational', $4, $5, 'public')
           ON CONFLICT (slug) DO NOTHING`,
          [id, row.keyword, pillarSlug, row.site_context, row.career_track]
        );
      }

      await pool.query("UPDATE seo_clusters SET status = 'draft', updated_at = NOW() WHERE id = $1", [id]);

      const articles = await pool.query("SELECT * FROM seo_articles WHERE cluster_id = $1 ORDER BY type DESC, created_at ASC", [id]);
      res.json({ cluster: mapCluster(cluster.rows[0]), articles: articles.rows.map(mapArticle) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/articles", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { siteContext, careerTrack, clusterId, status, type, limit = "50" } = req.query;
      let query = "SELECT * FROM seo_articles WHERE 1=1";
      const params: any[] = [];
      let idx = 1;

      if (siteContext) { query += ` AND site_context = $${idx++}`; params.push(siteContext); }
      if (careerTrack) { query += ` AND career_track = $${idx++}`; params.push(careerTrack); }
      if (clusterId) { query += ` AND cluster_id = $${idx++}`; params.push(clusterId); }
      if (status) { query += ` AND status = $${idx++}`; params.push(status); }
      if (type) { query += ` AND type = $${idx++}`; params.push(type); }
      query += ` ORDER BY created_at DESC LIMIT $${idx++}`;
      params.push(Math.min(parseInt(String(limit)) || 50, 200));

      const r = await pool.query(query, params);
      res.json(r.rows.map(mapArticle));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/seo-engine/articles", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { clusterId, type, title, slug, targetKeyword, searchIntent, siteContext, careerTrack, gatingLevel } = req.body as any;
      if (!clusterId || !title || !slug || !targetKeyword) return res.status(400).json({ error: "Missing required fields" });

      const fullSlug = siteContext === "allied" && careerTrack ? `${careerTrack}/${slug}` : slug;

      const r = await pool.query(
        `INSERT INTO seo_articles (cluster_id, type, title, slug, target_keyword, search_intent, site_context, career_track, gating_level, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'draft') RETURNING *`,
        [clusterId, type || "support", title, fullSlug, targetKeyword, searchIntent || "informational", siteContext || "nursing", careerTrack || null, gatingLevel || "public"]
      );
      res.json(mapArticle(r.rows[0]));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/seo-engine/articles/:id/status", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { id } = req.params;
      const { status } = req.body as any;
      if (!status) return res.status(400).json({ error: "status required" });

      const publishedAt = status === "published" ? "NOW()" : "null";
      const r = await pool.query(
        `UPDATE seo_articles SET status = $1, published_at = ${status === 'published' ? 'NOW()' : 'published_at'}, updated_at = NOW() WHERE id = $2 RETURNING *`,
        [status, id]
      );
      if (!r.rows[0]) return res.status(404).json({ error: "Article not found" });
      res.json(mapArticle(r.rows[0]));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/infographics", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { siteContext, careerTrack, articleId, status } = req.query;
      let query = "SELECT * FROM seo_infographics WHERE 1=1";
      const params: any[] = [];
      let idx = 1;
      if (siteContext) { query += ` AND site_context = $${idx++}`; params.push(siteContext); }
      if (careerTrack) { query += ` AND career_track = $${idx++}`; params.push(careerTrack); }
      if (articleId) { query += ` AND article_id = $${idx++}`; params.push(articleId); }
      if (status) { query += ` AND status = $${idx++}`; params.push(status); }
      query += " ORDER BY created_at DESC LIMIT 100";

      const r = await pool.query(query, params);
      res.json(r.rows.map((row: any) => ({
        id: row.id, articleId: row.article_id, templateId: row.template_id, type: row.type,
        variant: row.variant, status: row.status, title: row.title, altText: row.alt_text,
        width: row.width, height: row.height, filePath: row.file_path, publicUrl: row.public_url,
        siteContext: row.site_context, careerTrack: row.career_track, createdAt: row.created_at,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/templates", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { siteContext, careerTrack, category } = req.query;
      let query = "SELECT * FROM infographic_templates WHERE is_active = true";
      const params: any[] = [];
      let idx = 1;
      if (siteContext) { query += ` AND site_context = $${idx++}`; params.push(siteContext); }
      if (careerTrack) { query += ` AND career_track = $${idx++}`; params.push(careerTrack); }
      if (category) { query += ` AND category = $${idx++}`; params.push(category); }
      query += " ORDER BY name ASC";

      const r = await pool.query(query, params);
      res.json(r.rows.map((row: any) => ({
        id: row.id, templateKey: row.template_key, name: row.name, category: row.category,
        isActive: row.is_active, promptText: row.prompt_text, countryMode: row.country_mode,
        examTier: row.exam_tier, siteContext: row.site_context, careerTrack: row.career_track,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/seo-engine/templates", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { templateKey, name, category, promptText, countryMode, examTier, siteContext, careerTrack } = req.body as any;
      if (!templateKey || !name || !category || !promptText) return res.status(400).json({ error: "Missing required fields" });

      const r = await pool.query(
        `INSERT INTO infographic_templates (template_key, name, category, prompt_text, country_mode, exam_tier, site_context, career_track)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (template_key) DO UPDATE SET name = $2, category = $3, prompt_text = $4, updated_at = NOW()
         RETURNING *`,
        [templateKey, name, category, promptText, countryMode || "BOTH", examTier || "ALL", siteContext || "nursing", careerTrack || null]
      );
      res.json(r.rows[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/pins", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { siteContext, careerTrack, articleId } = req.query;
      let query = "SELECT * FROM seo_pins WHERE 1=1";
      const params: any[] = [];
      let idx = 1;
      if (siteContext) { query += ` AND site_context = $${idx++}`; params.push(siteContext); }
      if (careerTrack) { query += ` AND career_track = $${idx++}`; params.push(careerTrack); }
      if (articleId) { query += ` AND article_id = $${idx++}`; params.push(articleId); }
      query += " ORDER BY created_at DESC LIMIT 100";

      const r = await pool.query(query, params);
      res.json(r.rows.map((row: any) => ({
        id: row.id, articleId: row.article_id, pinVariant: row.pin_variant, headline: row.headline,
        bulletsJson: row.bullets_json, status: row.status, width: row.width, height: row.height,
        filePath: row.file_path, siteContext: row.site_context, careerTrack: row.career_track,
        createdAt: row.created_at,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/internal-links", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { clusterId } = req.query;
      let query = `SELECT l.*, fa.title AS from_title, fa.slug AS from_slug, ta.title AS to_title, ta.slug AS to_slug
        FROM seo_internal_links l
        JOIN seo_articles fa ON l.from_article_id = fa.id
        JOIN seo_articles ta ON l.to_article_id = ta.id`;
      const params: any[] = [];
      if (clusterId) {
        query += " WHERE fa.cluster_id = $1 OR ta.cluster_id = $1";
        params.push(clusterId);
      }
      query += " ORDER BY l.created_at DESC LIMIT 200";

      const r = await pool.query(query, params);
      res.json(r.rows.map((row: any) => ({
        id: row.id, fromArticleId: row.from_article_id, toArticleId: row.to_article_id,
        anchorText: row.anchor_text, reason: row.reason, placement: row.placement,
        fromTitle: row.from_title, fromSlug: row.from_slug, toTitle: row.to_title, toSlug: row.to_slug,
        createdAt: row.created_at,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/publish-queue", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { siteContext, careerTrack, status } = req.query;
      let query = `SELECT q.*, a.title, a.slug, a.type AS article_type FROM seo_publish_queue q JOIN seo_articles a ON q.article_id = a.id WHERE 1=1`;
      const params: any[] = [];
      let idx = 1;
      if (siteContext) { query += ` AND q.site_context = $${idx++}`; params.push(siteContext); }
      if (careerTrack) { query += ` AND q.career_track = $${idx++}`; params.push(careerTrack); }
      if (status) { query += ` AND q.status = $${idx++}`; params.push(status); }
      query += " ORDER BY q.priority ASC, q.scheduled_for ASC LIMIT 100";

      const r = await pool.query(query, params);
      res.json(r.rows.map((row: any) => ({
        id: row.id, articleId: row.article_id, scheduledFor: row.scheduled_for, priority: row.priority,
        status: row.status, blockedReason: row.blocked_reason, siteContext: row.site_context,
        careerTrack: row.career_track, title: row.title, slug: row.slug, articleType: row.article_type,
        createdAt: row.created_at,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/seo-engine/publish-queue/:id/status", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { id } = req.params;
      const { status } = req.body as any;
      const r = await pool.query("UPDATE seo_publish_queue SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *", [status, id]);
      if (!r.rows[0]) return res.status(404).json({ error: "Queue item not found" });

      if (status === "published") {
        await pool.query("UPDATE seo_articles SET status = 'published', published_at = NOW(), updated_at = NOW() WHERE id = $1", [r.rows[0].article_id]);
      }
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/seo-engine/qc-runs", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { clusterId, articleId, scope } = req.query;
      let query = "SELECT * FROM qc_runs WHERE 1=1";
      const params: any[] = [];
      let idx = 1;
      if (clusterId) { query += ` AND cluster_id = $${idx++}`; params.push(clusterId); }
      if (articleId) { query += ` AND article_id = $${idx++}`; params.push(articleId); }
      if (scope) { query += ` AND scope = $${idx++}`; params.push(scope); }
      query += " ORDER BY created_at DESC LIMIT 100";

      const r = await pool.query(query, params);
      res.json(r.rows.map((row: any) => ({
        id: row.id, scope: row.scope, clusterId: row.cluster_id, articleId: row.article_id,
        assetId: row.asset_id, passed: row.passed, errors: row.errors, createdAt: row.created_at,
      })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/seo-engine/qc-runs", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { scope, clusterId, articleId, assetId } = req.body as any;
      if (!scope) return res.status(400).json({ error: "scope required" });

      const errors: string[] = [];

      if (scope === "cluster" && clusterId) {
        const cluster = await pool.query("SELECT * FROM seo_clusters WHERE id = $1", [clusterId]);
        if (!cluster.rows[0]) { errors.push("Cluster not found"); }
        else {
          const arts = await pool.query("SELECT type, status FROM seo_articles WHERE cluster_id = $1", [clusterId]);
          const pillar = arts.rows.find((a: any) => a.type === "pillar");
          const supports = arts.rows.filter((a: any) => a.type === "support");
          if (!pillar) errors.push("Pillar article missing");
          if (supports.length < 6) errors.push(`Only ${supports.length} support articles (minimum 6)`);
          const needsReview = arts.rows.filter((a: any) => a.status === "needs_review");
          if (needsReview.length > 0) errors.push(`${needsReview.length} articles still in needs_review`);
        }
      }

      if (scope === "article" && articleId) {
        const art = await pool.query("SELECT * FROM seo_articles WHERE id = $1", [articleId]);
        if (!art.rows[0]) { errors.push("Article not found"); }
        else {
          const a = art.rows[0];
          if (a.word_count < 1200 && a.type === "support") errors.push(`Word count ${a.word_count} below 1200 minimum`);
          if (a.word_count < 2500 && a.type === "pillar") errors.push(`Pillar word count ${a.word_count} below 2500 minimum`);
          if (a.site_context === "allied" && a.requires_disclaimer) {
            if (!a.content_md?.includes("Educational content only")) errors.push("Missing disclaimer block");
          }
          if (a.requires_infographic) {
            const infos = await pool.query("SELECT COUNT(*)::int AS c FROM seo_infographics WHERE article_id = $1 AND status = 'ready'", [articleId]);
            if (parseInt(infos.rows[0]?.c || "0") === 0) errors.push("No ready infographic");
          }
          if (a.requires_pins) {
            const pns = await pool.query("SELECT COUNT(*)::int AS c FROM seo_pins WHERE article_id = $1 AND status = 'ready'", [articleId]);
            if (parseInt(pns.rows[0]?.c || "0") === 0) errors.push("No ready pins");
          }
        }
      }

      const passed = errors.length === 0;
      const r = await pool.query(
        `INSERT INTO qc_runs (scope, cluster_id, article_id, asset_id, passed, errors)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [scope, clusterId || null, articleId || null, assetId || null, passed, JSON.stringify(errors)]
      );

      res.json({ passed, errors, runId: r.rows[0].id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/image-sitemap.xml", (_req: Request, res: Response) => {
    const CATALOG = [
      { slug: "cbc-quick-reference", fileName: "cbc-quick-reference.png", title: "CBC Complete Blood Count Quick Reference", caption: "Complete blood count interpretation guide for NCLEX and REx-PN exam preparation." },
      { slug: "coagulation-labs-reference", fileName: "coagulation-labs-reference.png", title: "Coagulation Labs Quick Reference", caption: "Coagulation laboratory values reference for anticoagulant monitoring." },
      { slug: "liver-function-tests", fileName: "liver-function-tests.png", title: "Liver Function Tests (LFTs) Quick Reference", caption: "Liver function test interpretation guide for nursing students." },
      { slug: "renal-function-labs", fileName: "renal-function-labs.png", title: "Renal Function Labs Quick Reference", caption: "Renal function laboratory interpretation guide for nursing." },
      { slug: "cardiac-biomarkers", fileName: "cardiac-biomarkers.png", title: "Cardiac Biomarkers Quick Reference", caption: "Cardiac biomarker interpretation guide for MI and heart failure." },
      { slug: "basic-metabolic-panel", fileName: "basic-metabolic-panel.png", title: "Basic Metabolic Panel (BMP) Quick Reference", caption: "Basic metabolic panel interpretation guide for nursing." },
      { slug: "urinalysis-interpretation", fileName: "urinalysis-interpretation.png", title: "Urinalysis Interpretation Quick Reference", caption: "Urinalysis interpretation guide for nursing students." },
      { slug: "order-of-the-draw", fileName: "order-of-the-draw.png", title: "Order of the Draw Quick Reference", caption: "Order of the draw reference for phlebotomy practice." },
      { slug: "ecg-rhythm-recognition", fileName: "ecg-rhythm-recognition.png", title: "ECG Rhythm Recognition Chart", caption: "ECG rhythm recognition guide for nursing exam preparation." },
      { slug: "heart-failure-comparison", fileName: "heart-failure-comparison.png", title: "Heart Failure: Left-Sided vs Right-Sided", caption: "Heart failure comparison for nursing education." },
      { slug: "blood-pressure-classification", fileName: "blood-pressure-classification.png", title: "Blood Pressure Classification Chart", caption: "Blood pressure classification and hypertension guide." },
      { slug: "electrolyte-imbalances", fileName: "electrolyte-imbalances.png", title: "Electrolyte Imbalances Quick Reference", caption: "Electrolyte imbalance recognition and management guide." },
      { slug: "acid-base-imbalances", fileName: "acid-base-imbalances.png", title: "Acid-Base Imbalances Quick Reference", caption: "Acid-base balance interpretation guide for nursing." },
      { slug: "abg-interpretation-flowchart", fileName: "abg-interpretation-flowchart.png", title: "ABG Interpretation Flowchart", caption: "ABG interpretation algorithm for nursing exam preparation." },
      { slug: "oxygen-delivery-devices", fileName: "oxygen-delivery-devices.png", title: "Oxygen Delivery Devices Quick Reference", caption: "Oxygen delivery device comparison guide for respiratory nursing." },
      { slug: "copd-vs-asthma", fileName: "copd-vs-asthma.png", title: "COPD vs Asthma Comparison Chart", caption: "COPD versus asthma clinical comparison for nursing." },
      { slug: "lung-sounds-chart", fileName: "lung-sounds-chart.png", title: "Lung Sounds Assessment Chart", caption: "Lung sounds auscultation guide for respiratory assessment." },
      { slug: "blood-transfusion-reactions", fileName: "blood-transfusion-reactions.png", title: "Blood Transfusion Reactions Quick Reference", caption: "Blood transfusion reaction recognition and management guide." },
      { slug: "high-alert-medications", fileName: "high-alert-medications.png", title: "High-Alert Medications Quick Reference", caption: "High-alert medication safety guide for nursing." },
      { slug: "insulin-onset-peak-times", fileName: "insulin-onset-peak-times-v2.png", title: "Insulin Onset, Peak, and Duration Chart", caption: "Insulin onset peak duration reference for diabetes management." },
      { slug: "antibiotic-classes", fileName: "antibiotic-classes.png", title: "Antibiotic Classes Quick Reference", caption: "Antibiotic medication classes reference for nursing." },
      { slug: "diabetes-medications", fileName: "diabetes-medications.png", title: "Diabetes Medication Classes Chart", caption: "Diabetes medication classes reference for nursing pharmacology." },
      { slug: "shock-types-comparison", fileName: "shock-types-comparison.png", title: "Shock Types Comparison Chart", caption: "Shock types comparison for emergency and critical care nursing." },
      { slug: "sepsis-recognition", fileName: "sepsis-recognition.png", title: "Sepsis Recognition and Management", caption: "Sepsis recognition and management guide for nursing." },
      { slug: "stroke-fast-recognition", fileName: "stroke-fast-recognition.png", title: "Stroke FAST Recognition Chart", caption: "Stroke FAST assessment and comparison for nursing education." },
      { slug: "stages-of-labor", fileName: "stages-of-labor.png", title: "Stages of Labor Quick Reference", caption: "Stages of labor reference for maternity nursing education." },
      { slug: "apgar-scoring", fileName: "apgar-scoring.png", title: "APGAR Scoring for Newborns", caption: "APGAR newborn assessment scoring guide for maternity nursing." },
      { slug: "pediatric-vital-signs", fileName: "pediatric-vital-signs.png", title: "Pediatric Vital Signs by Age Chart", caption: "Pediatric vital signs normal ranges by age group." },
      { slug: "medication-rights", fileName: "medication-rights.png", title: "Medication Administration Rights", caption: "Ten rights of medication administration reference for nursing." },
      { slug: "injection-sites-techniques", fileName: "injection-sites-techniques.png", title: "Injection Sites and Techniques Chart", caption: "Injection sites and techniques reference for nursing skills." },
      { slug: "iv-catheter-gauges", fileName: "iv-catheter-gauges.png", title: "IV Catheter Gauge Size Quick Reference", caption: "IV catheter gauge selection guide for nursing skills." },
      { slug: "isolation-precautions", fileName: "isolation-precautions.png", title: "Isolation Precautions Quick Reference", caption: "Infection control isolation precautions guide for nursing." },
    ];

    const baseUrl = "https://nursenest.ca";
    const entries = CATALOG.map(item => `  <url>
    <loc>${baseUrl}/infographics/${item.slug}</loc>
    <image:image>
      <image:loc>${baseUrl}/attached_assets/generated_images/${item.fileName}</image:loc>
      <image:title>${item.title}</image:title>
      <image:caption>${item.caption}</image:caption>
    </image:image>
  </url>`).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>`;

    res.set("Content-Type", "application/xml");
    res.send(xml);
  });
}
