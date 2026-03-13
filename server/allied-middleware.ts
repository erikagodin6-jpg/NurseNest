import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      isAllied?: boolean;
      isNewGrad?: boolean;
    }
  }
}

const ALLIED_CAREER_SLUGS = new Set([
  "rrt", "paramedic", "pharmacy-tech", "mlt", "imaging",
]);

const PROFESSION_HUB_SLUGS = new Set([
  "rrt", "social-work", "psychotherapy", "addictions", "occupational-therapy",
]);

const ALLIED_SLUGS = new Set([
  ...ALLIED_CAREER_SLUGS,
  ...PROFESSION_HUB_SLUGS,
  "critical-care", "emergency-nursing", "perioperative",
  "oncology-nursing", "pediatric-cert", "psychotherapist",
  "social-worker", "addictions-counsellor",
]);

const NURSING_ONLY_PATHS = [
  "/lessons", "/lesson/", "/anatomy", "/pre-nursing",
  "/med-math", "/lab-values", "/clinical-clarity",
  "/medication-mastery", "/case-simulation",
  "/nclex-rn-practice", "/nclex-pn-practice", "/rex-pn",
  "/np-exam-hub", "/pathways", "/lectures",
  "/onboarding-plan", "/diagnostic-assessment",
];

const ALLIED_ONLY_PATHS = ["/careers", "/admin/allied"];

const LEGACY_FEATURE_TO_CANONICAL: Record<string, string> = {
  diagnostic: "diagnostic",
  qbank: "qbank",
};

const LEGACY_CAREER_FEATURES = new Set([
  "diagnostic", "qbank", "mock-exams", "dashboard",
  "study-plan", "flashcards", "sims", "tools",
]);

export function isAlliedHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/:\d+$/, "");
  return h.startsWith("allied.") || h === "allied.localhost" || h === "allied.nursenest.ca";
}

export function isNewGradHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/:\d+$/, "");
  return h.startsWith("newgrad.") || h === "newgrad.localhost" || h === "newgrad.nursenest.ca";
}

export function getNursingHost(req: Request): string {
  const proto = req.get("x-forwarded-proto") || req.protocol || "https";
  if (process.env.NODE_ENV !== "production") return `${proto}://localhost:5000`;
  return "https://www.nursenest.ca";
}

export function getAlliedHost(req: Request): string {
  const proto = req.get("x-forwarded-proto") || req.protocol || "https";
  if (process.env.NODE_ENV !== "production") return `${proto}://localhost:5000`;
  return "https://allied.nursenest.ca";
}

export function alliedDetectionMiddleware(req: Request, _res: Response, next: NextFunction) {
  const host = req.get("x-forwarded-host") || req.get("host") || "";
  req.isAllied = isAlliedHost(host);
  req.isNewGrad = isNewGradHost(host);
  next();
}

export function alliedLegacyRedirectMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.isAllied) return next();

  if (req.path.startsWith("/api") || req.path.startsWith("/assets") ||
      req.path.startsWith("/vite-hmr") || req.path.startsWith("/healthz") ||
      req.path.startsWith("/sitemap") || req.path.startsWith("/robots") ||
      /\.\w{2,5}($|\?)/.test(req.path)) {
    return next();
  }

  const segments = req.path.split("/").filter(Boolean);
  if (segments.length === 0) return next();

  const firstSeg = segments[0];
  const secondSeg = segments[1] || "";

  const CLUSTER_SUBTYPES = new Set(["lessons", "practice-questions", "flashcards", "mock-exam", "study-guide"]);
  if (PROFESSION_HUB_SLUGS.has(firstSeg) && (segments.length === 1 || CLUSTER_SUBTYPES.has(secondSeg))) {
    return next();
  }

  if (ALLIED_CAREER_SLUGS.has(firstSeg)) {
    if (secondSeg === "questions") {
      return next();
    }

    if (segments.length === 1) {
      return res.redirect(301, `/careers/${firstSeg}`);
    }

    if (secondSeg && LEGACY_CAREER_FEATURES.has(secondSeg)) {
      if (LEGACY_FEATURE_TO_CANONICAL[secondSeg]) {
        return res.redirect(301, `/${secondSeg}?career=${firstSeg}`);
      }
      return res.redirect(301, `/careers/${firstSeg}/${secondSeg}`);
    }

    return res.redirect(301, `/careers/${firstSeg}`);
  }

  return next();
}

export function hostRedirectMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith("/api") || req.path.startsWith("/assets") ||
      req.path.startsWith("/vite-hmr") || req.path.startsWith("/healthz") ||
      req.path.startsWith("/sitemap") || req.path.startsWith("/robots") ||
      /\.\w{2,5}($|\?)/.test(req.path)) {
    return next();
  }

  const pathWithoutLocale = req.path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  if (req.isAllied) {
    for (const nursingPath of NURSING_ONLY_PATHS) {
      if (pathWithoutLocale.startsWith(nursingPath)) {
        return res.redirect(302, getNursingHost(req) + req.originalUrl);
      }
    }
  } else {
    for (const alliedPath of ALLIED_ONLY_PATHS) {
      if (pathWithoutLocale.startsWith(alliedPath)) {
        return res.redirect(302, getAlliedHost(req) + req.originalUrl);
      }
    }
    const firstSeg = pathWithoutLocale.split("/").filter(Boolean)[0];
    if (firstSeg && ALLIED_SLUGS.has(firstSeg) && !pathWithoutLocale.startsWith("/admin")) {
      return res.redirect(302, getAlliedHost(req) + req.originalUrl);
    }
  }

  next();
}

export function generateAlliedSitemap(baseUrl: string): string {
  const careers = ["rrt", "paramedic", "pharmacy-tech", "mlt", "imaging"];

  const professionHubs = [
    "rrt", "social-work", "psychotherapy", "addictions", "occupational-therapy",
  ];

  const seoLandingPages = [
    "pharmacy-technician-practice-questions",
    "pharmacy-technician-mock-exam",
    "pharmacy-technician-study-guide",
    "rrt-practice-questions",
    "rrt-mock-exam",
    "rrt-study-guide",
  ];

  const drugClassSlugs = [
    "ace-inhibitors", "beta-blockers", "statins", "antibiotics",
    "antidiabetic-drugs", "antidepressants", "antihistamines",
  ];

  const urls: string[] = [];
  const now = new Date().toISOString().split("T")[0];

  urls.push(`<url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${now}</lastmod></url>`);
  urls.push(`<url><loc>${baseUrl}/pricing</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${now}</lastmod></url>`);
  urls.push(`<url><loc>${baseUrl}/careers</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${now}</lastmod></url>`);
  urls.push(`<url><loc>${baseUrl}/diagnostic</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${now}</lastmod></url>`);
  urls.push(`<url><loc>${baseUrl}/qbank</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${now}</lastmod></url>`);

  for (const career of careers) {
    urls.push(`<url><loc>${baseUrl}/careers/${career}</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
  }

  for (const hub of professionHubs) {
    urls.push(`<url><loc>${baseUrl}/${hub}</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${now}</lastmod></url>`);
  }

  for (const page of seoLandingPages) {
    urls.push(`<url><loc>${baseUrl}/${page}</loc><changefreq>monthly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
  }

  urls.push(`<url><loc>${baseUrl}/pharmacy-technician/drug-classes</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
  for (const slug of drugClassSlugs) {
    urls.push(`<url><loc>${baseUrl}/pharmacy-technician/drug-classes/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority><lastmod>${now}</lastmod></url>`);
  }
  urls.push(`<url><loc>${baseUrl}/pharmacy-technician/practice-exam-questions</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

export async function generateAlliedSitemapAsync(baseUrl: string): Promise<string> {
  const staticXml = generateAlliedSitemap(baseUrl);
  const urls: string[] = [];

  try {
    const { pool: dbPool } = require("./storage");
    const paramedicTables: Record<string, string> = {
      paramedic_topic_pages: "/paramedic/topic",
      paramedic_category_pages: "/paramedic/category",
      paramedic_glossary_entries: "/paramedic/glossary",
      paramedic_comparison_pages: "/paramedic/compare",
      paramedic_study_guides: "/paramedic/study-guide",
    };
    for (const [tbl, prefix] of Object.entries(paramedicTables)) {
      try {
        const result = await dbPool.query(
          `SELECT slug, updated_at FROM ${tbl} WHERE status = 'published' AND content_domain = 'paramedic' AND (is_noindex IS NULL OR is_noindex = false)`
        );
        for (const row of result.rows) {
          const lm = new Date(row.updated_at).toISOString().split("T")[0];
          urls.push(`<url><loc>${baseUrl}${prefix}/${row.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority><lastmod>${lm}</lastmod></url>`);
        }
      } catch {}
    }
  } catch {}

  try {
    const { paramedicQuestions } = await import("../client/src/data/career-questions/paramedic-questions");
    const topicSlugs = new Set<string>();
    for (const q of paramedicQuestions as any[]) {
      const slug = q.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      topicSlugs.add(slug);
    }
    const now = new Date().toISOString().split("T")[0];
    urls.push(`<url><loc>${baseUrl}/paramedic/questions</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
    for (const slug of topicSlugs) {
      urls.push(`<url><loc>${baseUrl}/paramedic/questions/${slug}</loc><changefreq>weekly</changefreq><priority>0.6</priority><lastmod>${now}</lastmod></url>`);
    }
  } catch {}

  const alliedQuestionSources: { key: string; importPath: string; exportName: string }[] = [
    { key: "rrt", importPath: "../client/src/data/career-questions/rrt-questions", exportName: "rrtQuestions" },
    { key: "mlt", importPath: "../client/src/data/career-questions/mlt-questions", exportName: "mltQuestions" },
    { key: "imaging", importPath: "../client/src/data/career-questions/imaging-questions", exportName: "imagingQuestions" },
  ];
  for (const source of alliedQuestionSources) {
    try {
      const mod = await import(source.importPath);
      const questions = mod[source.exportName] as any[];
      const slugSet = new Set<string>();
      for (const q of questions) {
        const slug = q.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        slugSet.add(slug);
      }
      const now = new Date().toISOString().split("T")[0];
      urls.push(`<url><loc>${baseUrl}/${source.key}/questions</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
      for (const slug of slugSet) {
        urls.push(`<url><loc>${baseUrl}/${source.key}/questions/${slug}</loc><changefreq>weekly</changefreq><priority>0.6</priority><lastmod>${now}</lastmod></url>`);
      }
    } catch {}
  }

  if (urls.length === 0) return staticXml;

  return staticXml.replace("</urlset>", urls.join("\n") + "\n</urlset>");
}

export function generateNewGradSitemap(baseUrl: string): string {
  const now = new Date().toISOString().split("T")[0];
  const urls: string[] = [];

  urls.push(`<url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${now}</lastmod></url>`);

  const hubPages = [
    { path: "/interview-lab", priority: "0.9", freq: "weekly" },
    { path: "/resume-builder", priority: "0.9", freq: "weekly" },
    { path: "/cover-letter", priority: "0.9", freq: "weekly" },
    { path: "/first-90-days", priority: "0.9", freq: "monthly" },
    { path: "/clinical-confidence", priority: "0.9", freq: "weekly" },
    { path: "/pricing", priority: "0.8", freq: "monthly" },
  ];

  for (const page of hubPages) {
    urls.push(`<url><loc>${baseUrl}${page.path}</loc><changefreq>${page.freq}</changefreq><priority>${page.priority}</priority><lastmod>${now}</lastmod></url>`);
  }

  const seoPages = [
    "new-grad-rn-interview-questions",
    "new-grad-rn-resume-guide",
    "new-grad-rn-cover-letter-examples",
    "first-90-days-as-a-new-nurse",
    "new-grad-rn-clinical-confidence",
    "new-grad-rn-job-search-guide",
    "new-nurse-orientation-survival-guide",
    "nursing-interview-behavioral-questions",
    "nursing-interview-clinical-scenarios",
    "new-grad-nurse-salary-guide",
    "nursing-specialties-for-new-grads",
    "night-shift-survival-guide-new-nurse",
    "preceptor-relationship-guide-new-nurse",
    "new-grad-rn-time-management",
    "imposter-syndrome-new-nurse",
    "new-grad-rn-skills-checklist",
  ];

  for (const slug of seoPages) {
    urls.push(`<url><loc>${baseUrl}/${slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}
