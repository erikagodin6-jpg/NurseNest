import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      isAllied?: boolean;
    }
  }
}

const ALLIED_CAREER_SLUGS = new Set([
  "rrt", "paramedic", "pharmacy-tech", "mlt", "imaging",
]);

const ALLIED_SLUGS = new Set([
  ...ALLIED_CAREER_SLUGS,
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

  if (ALLIED_CAREER_SLUGS.has(firstSeg)) {
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

  const seoLandingPages = [
    "pharmacy-technician-practice-questions",
    "pharmacy-technician-mock-exam",
    "pharmacy-technician-study-guide",
    "rrt-practice-questions",
    "rrt-mock-exam",
    "rrt-study-guide",
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

  for (const page of seoLandingPages) {
    urls.push(`<url><loc>${baseUrl}/${page}</loc><changefreq>monthly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}
