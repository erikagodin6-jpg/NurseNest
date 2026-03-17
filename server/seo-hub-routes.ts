import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import { validateSeoHubPage } from "../shared/seo-hub-validation";

function mapPage(row: any) {
  return {
    id: row.id,
    tier: row.tier,
    pageType: row.page_type,
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords || [],
    h1: row.h1,
    contentSections: typeof row.content_sections === "string" ? JSON.parse(row.content_sections) : (row.content_sections || []),
    faqItems: typeof row.faq_items === "string" ? JSON.parse(row.faq_items) : (row.faq_items || []),
    internalLinks: typeof row.internal_links === "string" ? JSON.parse(row.internal_links) : (row.internal_links || []),
    parentHub: row.parent_hub,
    relatedSlugs: row.related_slugs || [],
    language: row.language,
    status: row.status,
    medicallyReviewedBy: row.medically_reviewed_by,
    medicallyReviewedAt: row.medically_reviewed_at,
    lastUpdatedDate: row.last_updated_date,
    references: typeof row.references === "string" ? JSON.parse(row.references) : (row.references || []),
    practiceQuestionIds: row.practice_question_ids || [],
    structuredDataType: row.structured_data_type,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getRelatedPages(page: any) {
  const relatedPages: any[] = [];
  const relatedSlugs = page.related_slugs || [];

  if (relatedSlugs.length > 0) {
    try {
      const result = await pool.query(
        `SELECT slug, title, page_type FROM seo_hub_pages WHERE slug = ANY($1) AND status = 'published'`,
        [relatedSlugs]
      );
      for (const r of result.rows) {
        relatedPages.push({
          title: r.title,
          href: `/${r.slug}`,
          type: r.page_type,
        });
      }
    } catch {}
  }

  if (relatedPages.length < 6) {
    try {
      const existing = relatedPages.map(r => r.href.replace("/", ""));
      const result = await pool.query(
        `SELECT slug, title, page_type FROM seo_hub_pages 
         WHERE tier = $1 AND slug != $2 AND status = 'published' AND slug != ALL($3)
         ORDER BY RANDOM() LIMIT $4`,
        [page.tier, page.slug, existing.length > 0 ? existing : [""], 6 - relatedPages.length]
      );
      for (const r of result.rows) {
        relatedPages.push({
          title: r.title,
          href: `/${r.slug}`,
          type: r.page_type,
        });
      }
    } catch {}
  }

  return relatedPages;
}

async function getSiblingPages(page: any) {
  try {
    const result = await pool.query(
      `SELECT slug, title, page_type FROM seo_hub_pages 
       WHERE tier = $1 AND page_type = $2 AND slug != $3 AND status = 'published'
       ORDER BY title ASC LIMIT 8`,
      [page.tier, page.page_type, page.slug]
    );
    return result.rows.map((r: any) => ({
      title: r.title,
      href: `/${r.slug}`,
      type: r.page_type,
    }));
  } catch {
    return [];
  }
}

export function registerSeoHubRoutes(app: Express): void {
  app.get("/api/seo-hub/page/{*slug}", async (req: Request, res: Response) => {
    try {
      const rawSlug = (req.params as any).slug;
      const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : String(rawSlug || "");
      const result = await pool.query(
        "SELECT * FROM seo_hub_pages WHERE slug = $1 AND status = 'published'",
        [slug]
      );

      if (!result.rows[0]) {
        return res.status(404).json({ error: "Page not found" });
      }

      const page = result.rows[0];
      const mapped = mapPage(page);
      const relatedPages = await getRelatedPages(page);
      const siblingPages = await getSiblingPages(page);

      res.json({ ...mapped, relatedPages, siblingPages });
    } catch (e: any) {
      console.error("[SeoHub] Page fetch error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/seo-hub/pages", async (req: Request, res: Response) => {
    try {
      const tier = req.query.tier ? String(req.query.tier) : null;
      const pageType = req.query.pageType ? String(req.query.pageType) : null;
      const status = req.query.status ? String(req.query.status) : null;
      const limit = Math.min(parseInt(String(req.query.limit)) || 50, 200);

      let where = "WHERE 1=1";
      const params: any[] = [];
      let idx = 1;

      if (tier) { where += ` AND tier = $${idx++}`; params.push(tier); }
      if (pageType) { where += ` AND page_type = $${idx++}`; params.push(pageType); }
      if (status) { where += ` AND status = $${idx++}`; params.push(status); }

      const result = await pool.query(
        `SELECT * FROM seo_hub_pages ${where} ORDER BY title ASC LIMIT $${idx}`,
        [...params, limit]
      );

      res.json(result.rows.map(mapPage));
    } catch (e: any) {
      console.error("[SeoHub] Pages list error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/seo-hub/slugs", async (_req: Request, res: Response) => {
    try {
      const result = await pool.query(
        "SELECT slug, tier, page_type FROM seo_hub_pages WHERE status = 'published' ORDER BY slug"
      );
      res.json(result.rows.map((r: any) => ({
        slug: r.slug,
        tier: r.tier,
        pageType: r.page_type,
      })));
    } catch (e: any) {
      console.error("[SeoHub] Slugs error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/seo-hub/pages", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const body = req.body;

      if (body.status === "published") {
        const validation = validateSeoHubPage(body);
        if (!validation.valid) {
          return res.status(400).json({ error: "Validation failed", errors: validation.errors });
        }
      }

      const existingSlug = await pool.query("SELECT id FROM seo_hub_pages WHERE slug = $1", [body.slug]);
      if (existingSlug.rows.length > 0) {
        return res.status(400).json({ error: "Duplicate slug", errors: [{ field: "slug", message: "A page with this slug already exists" }] });
      }

      if (body.metaDescription && body.status === "published") {
        const dupMeta = await pool.query(
          "SELECT id FROM seo_hub_pages WHERE meta_description = $1 AND status = 'published'",
          [body.metaDescription]
        );
        if (dupMeta.rows.length > 0) {
          return res.status(400).json({ error: "Duplicate meta description", errors: [{ field: "metaDescription", message: "Another published page has the same meta description" }] });
        }
      }

      const result = await pool.query(
        `INSERT INTO seo_hub_pages (tier, page_type, slug, title, meta_title, meta_description, meta_keywords, h1, content_sections, faq_items, internal_links, parent_hub, related_slugs, language, status, medically_reviewed_by, medically_reviewed_at, last_updated_date, "references", practice_question_ids, structured_data_type, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
         RETURNING *`,
        [
          body.tier, body.pageType, body.slug, body.title, body.metaTitle, body.metaDescription,
          body.metaKeywords || [], body.h1, JSON.stringify(body.contentSections || []),
          JSON.stringify(body.faqItems || []), JSON.stringify(body.internalLinks || []),
          body.parentHub, body.relatedSlugs || [], body.language || "en", body.status || "draft",
          body.medicallyReviewedBy, body.medicallyReviewedAt || null, body.lastUpdatedDate,
          JSON.stringify(body.references || []), body.practiceQuestionIds || [],
          body.structuredDataType || "Article",
          body.status === "published" ? new Date() : null,
        ]
      );

      res.json(mapPage(result.rows[0]));
    } catch (e: any) {
      console.error("[SeoHub] Create error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/seo-hub/pages/:id", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      const body = req.body;

      if (body.status === "published") {
        const validation = validateSeoHubPage(body);
        if (!validation.valid) {
          return res.status(400).json({ error: "Validation failed", errors: validation.errors });
        }
      }

      if (body.slug) {
        const existingSlug = await pool.query("SELECT id FROM seo_hub_pages WHERE slug = $1 AND id != $2", [body.slug, id]);
        if (existingSlug.rows.length > 0) {
          return res.status(400).json({ error: "Duplicate slug" });
        }
      }

      if (body.metaDescription && body.status === "published") {
        const dupMeta = await pool.query(
          "SELECT id FROM seo_hub_pages WHERE meta_description = $1 AND status = 'published' AND id != $2",
          [body.metaDescription, id]
        );
        if (dupMeta.rows.length > 0) {
          return res.status(400).json({ error: "Duplicate meta description" });
        }
      }

      const existing = await pool.query("SELECT * FROM seo_hub_pages WHERE id = $1", [id]);
      if (!existing.rows[0]) {
        return res.status(404).json({ error: "Page not found" });
      }

      const wasPublished = existing.rows[0].status === "published";
      const publishedAt = body.status === "published" && !wasPublished ? new Date() : existing.rows[0].published_at;

      const result = await pool.query(
        `UPDATE seo_hub_pages SET
          tier = $1, page_type = $2, slug = $3, title = $4, meta_title = $5,
          meta_description = $6, meta_keywords = $7, h1 = $8, content_sections = $9,
          faq_items = $10, internal_links = $11, parent_hub = $12, related_slugs = $13,
          language = $14, status = $15, medically_reviewed_by = $16,
          medically_reviewed_at = $17, last_updated_date = $18, "references" = $19,
          practice_question_ids = $20, structured_data_type = $21, published_at = $22,
          updated_at = NOW()
        WHERE id = $23 RETURNING *`,
        [
          body.tier, body.pageType, body.slug, body.title, body.metaTitle,
          body.metaDescription, body.metaKeywords || [], body.h1,
          JSON.stringify(body.contentSections || []), JSON.stringify(body.faqItems || []),
          JSON.stringify(body.internalLinks || []), body.parentHub, body.relatedSlugs || [],
          body.language || "en", body.status || "draft", body.medicallyReviewedBy,
          body.medicallyReviewedAt || null, body.lastUpdatedDate,
          JSON.stringify(body.references || []), body.practiceQuestionIds || [],
          body.structuredDataType || "Article", publishedAt, id,
        ]
      );

      res.json(mapPage(result.rows[0]));
    } catch (e: any) {
      console.error("[SeoHub] Update error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/seo-hub/pages/:id", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { id } = req.params;
      await pool.query("DELETE FROM seo_hub_pages WHERE id = $1", [id]);
      res.json({ success: true });
    } catch (e: any) {
      console.error("[SeoHub] Delete error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/seo-hub/stats", async (req: Request, res: Response) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const totals = await pool.query(`
        SELECT
          COUNT(*)::int AS total_pages,
          COUNT(*) FILTER (WHERE status = 'published')::int AS published_pages,
          COUNT(*) FILTER (WHERE status = 'draft')::int AS draft_pages,
          COUNT(DISTINCT tier)::int AS tiers,
          COUNT(DISTINCT page_type)::int AS page_types
        FROM seo_hub_pages
      `);

      const byTier = await pool.query(`
        SELECT tier, COUNT(*)::int AS count
        FROM seo_hub_pages GROUP BY tier ORDER BY count DESC
      `);

      const byType = await pool.query(`
        SELECT page_type, COUNT(*)::int AS count
        FROM seo_hub_pages GROUP BY page_type ORDER BY count DESC
      `);

      res.json({
        totals: totals.rows[0],
        byTier: byTier.rows,
        byType: byType.rows,
      });
    } catch (e: any) {
      console.error("[SeoHub] Stats error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
