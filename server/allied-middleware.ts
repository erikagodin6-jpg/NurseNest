import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      isAllied?: boolean;
    }
  }
}

const ALLIED_SLUGS = new Set([
  "rrt", "paramedic", "pharmacy-tech", "mlt", "imaging",
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
  const features = ["qbank", "mock-exams", "study-plan", "flashcards", "sims", "tools"];
  const seoPages: Record<string, string[]> = {
    rrt: ["rt-practice-questions"],
    paramedic: ["paramedic-practice-test"],
    "pharmacy-tech": ["pharmacy-tech-calculations"],
    mlt: ["mlt-practice-questions"],
    imaging: ["radiography-practice-test"],
  };

  const urls: string[] = [];
  const now = new Date().toISOString().split("T")[0];

  urls.push(`<url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${now}</lastmod></url>`);
  urls.push(`<url><loc>${baseUrl}/pricing</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${now}</lastmod></url>`);
  urls.push(`<url><loc>${baseUrl}/careers</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${now}</lastmod></url>`);

  for (const career of careers) {
    urls.push(`<url><loc>${baseUrl}/${career}</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
    for (const feature of features) {
      urls.push(`<url><loc>${baseUrl}/${career}/${feature}</loc><changefreq>weekly</changefreq><priority>0.7</priority><lastmod>${now}</lastmod></url>`);
    }
    const pages = seoPages[career] || [];
    for (const page of pages) {
      urls.push(`<url><loc>${baseUrl}/${career}/${page}</loc><changefreq>monthly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}
