import type { Express, Request, Response } from "express";
import {
  getSiteBase, getAlliedBase, getNewGradBase, todayDate, toLastmod,
  wrapUrlset, wrapSitemapIndex, sitemapIndexEntry,
  splitIntoChunks, SITEMAP_SPLIT_LIMIT, SITEMAP_CACHE_TTL
} from "./helpers";
import {
  generateMainPages, generateMainLessons, generateMainQuestions,
  generateMainFlashcards, generateMainSpecialties, generateMainGlossary,
  generateMainClinicalClarity, generateMainBlog, generateMainMedicalImaging,
  generateMainSeoContent, generateMainTopics, generateMainProgrammatic
} from "./main-site";
import { generateAlliedPages, generateAlliedDatabaseContent } from "./allied-site";
import { generateNewGradPages } from "./newgrad-site";
import { sitemapHealthCheck } from "./health";

interface CacheEntry {
  xml: string;
  builtAt: number;
}

const cache = new Map<string, CacheEntry>();

function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.builtAt < SITEMAP_CACHE_TTL) {
    return entry.xml;
  }
  return null;
}

function setCache(key: string, xml: string): void {
  cache.set(key, { xml, builtAt: Date.now() });
}

function sendXml(res: Response, xml: string, cacheHit: boolean) {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.setHeader("X-Sitemap-Cache", cacheHit ? "HIT" : "MISS");
  res.status(200).send(xml);
}

interface SitemapDef {
  name: string;
  generator: () => Promise<string[]>;
}

const mainSitemapDefs: SitemapDef[] = [
  { name: "pages", generator: generateMainPages },
  { name: "lessons", generator: generateMainLessons },
  { name: "questions", generator: generateMainQuestions },
  { name: "flashcards", generator: generateMainFlashcards },
  { name: "specialties", generator: generateMainSpecialties },
  { name: "glossary", generator: generateMainGlossary },
  { name: "clinical-clarity", generator: generateMainClinicalClarity },
  { name: "blog", generator: generateMainBlog },
  { name: "medical-imaging", generator: generateMainMedicalImaging },
  { name: "seo-content", generator: generateMainSeoContent },
  { name: "topics", generator: generateMainTopics },
  { name: "programmatic", generator: generateMainProgrammatic },
];

async function generateChildSitemap(def: SitemapDef, chunkIndex: number): Promise<string> {
  const cacheKey = `child-${def.name}-${chunkIndex}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const urls = await def.generator();
  const chunks = splitIntoChunks(urls, SITEMAP_SPLIT_LIMIT);
  const chunk = chunks[chunkIndex] || [];
  const xml = wrapUrlset(chunk);
  setCache(cacheKey, xml);
  return xml;
}

async function buildMainSitemapIndex(): Promise<string> {
  const base = getSiteBase();
  const today = todayDate();
  const entries: string[] = [];

  for (const def of mainSitemapDefs) {
    try {
      const urls = await def.generator();
      const chunkCount = Math.max(1, Math.ceil(urls.length / SITEMAP_SPLIT_LIMIT));
      for (let i = 0; i < chunkCount; i++) {
        const suffix = chunkCount > 1 ? `-${i + 1}` : "";
        entries.push(sitemapIndexEntry(`${base}/sitemaps/sitemap-${def.name}${suffix}.xml`, today));
      }
    } catch (e) {
      console.error(`Sitemap index: error counting ${def.name}:`, e);
      entries.push(sitemapIndexEntry(`${base}/sitemaps/sitemap-${def.name}.xml`, today));
    }
  }

  return wrapSitemapIndex(entries);
}

async function buildAlliedSitemapIndex(): Promise<string> {
  const base = getAlliedBase();
  const today = todayDate();

  const staticUrls = await generateAlliedPages().catch(() => []);
  const dbUrls = await generateAlliedDatabaseContent().catch(() => []);
  const allUrls = [...staticUrls, ...dbUrls];
  const chunkCount = Math.max(1, Math.ceil(allUrls.length / SITEMAP_SPLIT_LIMIT));

  const entries: string[] = [];
  for (let i = 0; i < chunkCount; i++) {
    const suffix = chunkCount > 1 ? `-${i + 1}` : "";
    entries.push(sitemapIndexEntry(`${base}/sitemaps/sitemap-allied-content${suffix}.xml`, today));
  }

  return wrapSitemapIndex(entries);
}

async function buildNewGradSitemapIndex(): Promise<string> {
  const base = getNewGradBase();
  const today = todayDate();

  const urls = await generateNewGradPages().catch(() => []);
  const chunkCount = Math.max(1, Math.ceil(urls.length / SITEMAP_SPLIT_LIMIT));

  const entries: string[] = [];
  for (let i = 0; i < chunkCount; i++) {
    const suffix = chunkCount > 1 ? `-${i + 1}` : "";
    entries.push(sitemapIndexEntry(`${base}/sitemaps/sitemap-newgrad-content${suffix}.xml`, today));
  }

  return wrapSitemapIndex(entries);
}

export function registerSitemapRoutes(app: Express) {
  app.get("/robots.txt", (req: Request, res: Response) => {
    res.setHeader("Cache-Control", "public, max-age=300");
    if ((req as any).isNewGrad) {
      const newGradBase = getNewGradBase();
      res.type("text/plain").send(
        [
          "User-agent: *",
          "Allow: /",
          "",
          "Disallow: /admin",
          "Disallow: /api/",
          "Disallow: /account",
          "Disallow: /checkout",
          "",
          `Sitemap: ${newGradBase}/sitemap-index.xml`,
          "",
        ].join("\n"),
      );
    } else if ((req as any).isAllied) {
      const alliedBase = getAlliedBase();
      res.type("text/plain").send(
        [
          "User-agent: *",
          "Allow: /",
          "",
          "Disallow: /admin",
          "Disallow: /api/",
          "Disallow: /account",
          "Disallow: /checkout",
          "",
          `Sitemap: ${alliedBase}/sitemap-index.xml`,
          "",
        ].join("\n"),
      );
    } else {
      const base = getSiteBase();
      res.type("text/plain").send(
        [
          "User-agent: *",
          "Allow: /",
          "",
          "Disallow: /admin",
          "Disallow: /content-editor",
          "Disallow: /api/",
          "Disallow: /login",
          "Disallow: /register",
          "Disallow: /profile",
          "Disallow: /dashboard",
          "Disallow: /upgrade",
          "Disallow: /subscription/",
          "Disallow: /checkout",
          "Disallow: /account",
          "Disallow: /trial/",
          "Disallow: /diagnostic-assessment",
          "Disallow: /mock-exams/*/report",
          "Disallow: /feedback",
          "Disallow: /settings",
          "Disallow: /notes",
          "Disallow: /invite",
          "Disallow: /reset-password",
          "Disallow: /verify-email",
          "Disallow: /qbank/",
          "Disallow: /reports",
          "Disallow: /*?sort=",
          "Disallow: /*?filter=",
          "Disallow: /*?q=",
          "Disallow: /*?search=",
          "Disallow: /*?page=",
          "Disallow: /*?tab=",
          "Disallow: /*?ref=",
          "",
          "Crawl-delay: 1",
          "",
          `Sitemap: ${base}/sitemap-index.xml`,
          "",
        ].join("\n"),
      );
    }
  });

  app.get("/sitemap-index.xml", async (req: Request, res: Response) => {
    try {
      let xml: string;
      if ((req as any).isNewGrad) {
        const cached = getCached("newgrad-index");
        if (cached) return sendXml(res, cached, true);
        xml = await buildNewGradSitemapIndex();
        setCache("newgrad-index", xml);
      } else if ((req as any).isAllied) {
        const cached = getCached("allied-index");
        if (cached) return sendXml(res, cached, true);
        xml = await buildAlliedSitemapIndex();
        setCache("allied-index", xml);
      } else {
        const cached = getCached("main-index");
        if (cached) return sendXml(res, cached, true);
        xml = await buildMainSitemapIndex();
        setCache("main-index", xml);
      }
      sendXml(res, xml, false);
    } catch (e: any) {
      console.error("Sitemap index error:", e);
      sendXml(res, wrapSitemapIndex([]), false);
    }
  });

  for (const def of mainSitemapDefs) {
    app.get(`/sitemaps/sitemap-${def.name}.xml`, async (_req: Request, res: Response) => {
      try {
        const cacheKey = `child-${def.name}-0`;
        const cached = getCached(cacheKey);
        if (cached) return sendXml(res, cached, true);
        const xml = await generateChildSitemap(def, 0);
        sendXml(res, xml, false);
      } catch (e: any) {
        console.error(`Sitemap ${def.name} error:`, e);
        sendXml(res, wrapUrlset([]), false);
      }
    });

    app.get(`/sitemaps/sitemap-${def.name}-:page.xml`, async (req: Request, res: Response) => {
      const pageNum = parseInt(req.params.page);
      if (isNaN(pageNum) || pageNum < 1) return res.status(404).send("Not found");
      const chunkIndex = pageNum - 1;
      try {
        const urls = await def.generator();
        const chunkCount = Math.ceil(urls.length / SITEMAP_SPLIT_LIMIT);
        if (chunkIndex >= chunkCount) return res.status(404).send("Not found");

        const cacheKey = `child-${def.name}-${chunkIndex}`;
        const cached = getCached(cacheKey);
        if (cached) return sendXml(res, cached, true);

        const chunks = splitIntoChunks(urls, SITEMAP_SPLIT_LIMIT);
        const xml = wrapUrlset(chunks[chunkIndex] || []);
        setCache(cacheKey, xml);
        sendXml(res, xml, false);
      } catch (e: any) {
        console.error(`Sitemap ${def.name}-${pageNum} error:`, e);
        res.status(500).send("Error generating sitemap");
      }
    });
  }

  app.get("/sitemaps/sitemap-allied-content.xml", async (_req: Request, res: Response) => {
    try {
      const cacheKey = "allied-content-0";
      const cached = getCached(cacheKey);
      if (cached) return sendXml(res, cached, true);

      const staticUrls = await generateAlliedPages();
      const dbUrls = await generateAlliedDatabaseContent();
      const allUrls = [...staticUrls, ...dbUrls];
      const chunks = splitIntoChunks(allUrls, SITEMAP_SPLIT_LIMIT);
      const xml = wrapUrlset(chunks[0] || []);
      setCache(cacheKey, xml);
      sendXml(res, xml, false);
    } catch (e: any) {
      console.error("Allied sitemap error:", e);
      sendXml(res, wrapUrlset([]), false);
    }
  });

  app.get("/sitemaps/sitemap-allied-content-:page.xml", async (req: Request, res: Response) => {
    const pageNum = parseInt(req.params.page);
    if (isNaN(pageNum) || pageNum < 1) return res.status(404).send("Not found");
    const chunkIndex = pageNum - 1;
    try {
      const staticUrls = await generateAlliedPages();
      const dbUrls = await generateAlliedDatabaseContent();
      const allUrls = [...staticUrls, ...dbUrls];
      const chunks = splitIntoChunks(allUrls, SITEMAP_SPLIT_LIMIT);
      if (chunkIndex >= chunks.length) return res.status(404).send("Not found");
      const xml = wrapUrlset(chunks[chunkIndex] || []);
      sendXml(res, xml, false);
    } catch (e: any) {
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/sitemaps/sitemap-newgrad-content.xml", async (_req: Request, res: Response) => {
    try {
      const cacheKey = "newgrad-content-0";
      const cached = getCached(cacheKey);
      if (cached) return sendXml(res, cached, true);

      const urls = await generateNewGradPages();
      const xml = wrapUrlset(urls);
      setCache(cacheKey, xml);
      sendXml(res, xml, false);
    } catch (e: any) {
      console.error("NewGrad sitemap error:", e);
      sendXml(res, wrapUrlset([]), false);
    }
  });

  app.get("/sitemaps/sitemap-newgrad-content-:page.xml", async (req: Request, res: Response) => {
    const pageNum = parseInt(req.params.page);
    if (isNaN(pageNum) || pageNum < 1) return res.status(404).send("Not found");
    const chunkIndex = pageNum - 1;
    try {
      const urls = await generateNewGradPages();
      const chunks = splitIntoChunks(urls, SITEMAP_SPLIT_LIMIT);
      if (chunkIndex >= chunks.length) return res.status(404).send("Not found");
      const xml = wrapUrlset(chunks[chunkIndex] || []);
      sendXml(res, xml, false);
    } catch (e: any) {
      res.status(500).send("Error generating sitemap");
    }
  });

  const legacyRedirects: Record<string, string> = {
    "/sitemap.xml": "/sitemap-index.xml",
    "/sitemap_index.xml": "/sitemap-index.xml",
    "/sitemap-content.xml": "/sitemaps/sitemap-seo-content.xml",
  };
  for (const [oldPath, newPath] of Object.entries(legacyRedirects)) {
    app.get(oldPath, (_req: Request, res: Response) => {
      res.redirect(301, newPath);
    });
  }

  app.get("/sitemap-allied.xml", (_req: Request, res: Response) => {
    res.redirect(301, "/sitemap-index.xml");
  });

  app.get("/sitemap-newgrad.xml", (_req: Request, res: Response) => {
    res.redirect(301, "/sitemap-index.xml");
  });

  app.get("/sitemap-content-:page.xml", (_req: Request, res: Response) => {
    res.redirect(301, "/sitemap-index.xml");
  });

  const SUPPORTED_LOCALES = ["en", "fr", "es", "fil", "hi", "zh", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa"];
  app.get("/sitemap-:lang.xml", (req: Request, res: Response) => {
    const lang = req.params.lang;
    if (SUPPORTED_LOCALES.includes(lang)) {
      return res.redirect(301, "/sitemap-index.xml");
    }
    const programmaticTypes = ["study-guides", "exam-tips", "clinical-scenarios", "practice-questions", "question-details", "flashcard-details"];
    if (programmaticTypes.includes(lang)) {
      return res.redirect(301, "/sitemaps/sitemap-programmatic.xml");
    }
    return res.status(404).send("Not found");
  });

  app.get("/sitemal.xml", (_req: Request, res: Response) => {
    res.status(404).send("Not found");
  });

  app.get("/image-sitemap.xml", (_req: Request, res: Response) => {
    res.status(404).send("Not found");
  });

  app.get("/api/admin/sitemap-health", sitemapHealthCheck);
}

export { getSiteBase } from "./helpers";
