import type { Express } from "express";
import { storage, pool } from "./storage";

export function registerJobBoardRoutes(app: Express) {
  app.get("/api/jobs", async (req, res) => {
    try {
      const { location, profession, experienceLevel, search, page, limit: limitParam } = req.query;
      const limit = Math.min(parseInt(String(limitParam || "20")), 50);
      const pageNum = Math.max(parseInt(String(page || "1")), 1);
      const offset = (pageNum - 1) * limit;

      const result = await storage.getJobListings({
        location: location ? String(location) : undefined,
        profession: profession ? String(profession) : undefined,
        experienceLevel: experienceLevel ? String(experienceLevel) : undefined,
        search: search ? String(search) : undefined,
        status: "published",
        limit,
        offset,
      });

      res.json({
        jobs: result.rows,
        total: result.total,
        page: pageNum,
        totalPages: Math.ceil(result.total / limit),
      });
    } catch (error: any) {
      console.error("[JobBoard] Error fetching jobs:", error.message);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/featured", async (_req, res) => {
    try {
      const featured = await storage.getFeaturedJobListings(6);
      res.json(featured);
    } catch (error: any) {
      console.error("[JobBoard] Error fetching featured jobs:", error.message);
      res.status(500).json({ error: "Failed to fetch featured jobs" });
    }
  });

  app.get("/api/jobs/filters", async (_req, res) => {
    try {
      const locationsResult = await pool.query(
        `SELECT DISTINCT location FROM job_listings WHERE status = 'published' ORDER BY location`
      );
      const professionsResult = await pool.query(
        `SELECT DISTINCT profession FROM job_listings WHERE status = 'published' ORDER BY profession`
      );
      const specialtiesResult = await pool.query(
        `SELECT DISTINCT specialty FROM job_listings WHERE status = 'published' AND specialty IS NOT NULL ORDER BY specialty`
      );

      res.json({
        locations: locationsResult.rows.map((r: any) => r.location),
        professions: professionsResult.rows.map((r: any) => r.profession),
        specialties: specialtiesResult.rows.map((r: any) => r.specialty),
        experienceLevels: ["new_grad", "entry_level", "1_2_years"],
      });
    } catch (error: any) {
      console.error("[JobBoard] Error fetching filters:", error.message);
      res.status(500).json({ error: "Failed to fetch filters" });
    }
  });

  app.get("/api/jobs/by-slug/:slug", async (req, res) => {
    try {
      const job = await storage.getJobListingBySlug(req.params.slug);
      if (!job || job.status !== "published") {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error: any) {
      console.error("[JobBoard] Error fetching job:", error.message);
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  app.get("/api/jobs/all-slugs", async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT slug FROM job_listings WHERE status = 'published' ORDER BY posted_at DESC`
      );
      res.json(result.rows.map((r: any) => r.slug));
    } catch (error: any) {
      console.error("[JobBoard] Error fetching slugs:", error.message);
      res.status(500).json({ error: "Failed to fetch slugs" });
    }
  });

  app.post("/api/jobs/seed", async (req, res) => {
    try {
      if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({ error: "Seed endpoint is only available in development" });
      }
      const { seedJobListings } = await import("./job-board-seed");
      const count = await seedJobListings();
      res.json({ success: true, count });
    } catch (error: any) {
      console.error("[JobBoard] Error seeding jobs:", error.message);
      res.status(500).json({ error: "Failed to seed jobs" });
    }
  });
}
