import type { Request, Response } from "express";
import {
  getSiteBase, getAlliedBase, getNewGradBase, todayDate,
  wrapUrlset, splitIntoChunks, SITEMAP_SPLIT_LIMIT
} from "./helpers";
import {
  generateMainPages, generateMainLessons, generateMainQuestions,
  generateMainFlashcards, generateMainSpecialties, generateMainGlossary,
  generateMainClinicalClarity, generateMainBlog, generateMainMedicalImaging,
  generateMainSeoContent, generateMainTopics, generateMainProgrammatic
} from "./main-site";
import { generateAlliedPages, generateAlliedDatabaseContent } from "./allied-site";
import { generateNewGradPages } from "./newgrad-site";

interface HealthReport {
  status: "ok" | "warning" | "error";
  generatedAt: string;
  domains: {
    main: DomainReport;
    allied: DomainReport;
    newgrad: DomainReport;
  };
  issues: string[];
}

interface DomainReport {
  totalUrls: number;
  sitemapCount: number;
  childSitemaps: { name: string; urlCount: number }[];
}

export async function sitemapHealthCheck(_req: Request, res: Response) {
  const issues: string[] = [];

  try {
    const mainGenerators = [
      { name: "pages", fn: generateMainPages },
      { name: "lessons", fn: generateMainLessons },
      { name: "questions", fn: generateMainQuestions },
      { name: "flashcards", fn: generateMainFlashcards },
      { name: "specialties", fn: generateMainSpecialties },
      { name: "glossary", fn: generateMainGlossary },
      { name: "clinical-clarity", fn: generateMainClinicalClarity },
      { name: "blog", fn: generateMainBlog },
      { name: "medical-imaging", fn: generateMainMedicalImaging },
      { name: "seo-content", fn: generateMainSeoContent },
      { name: "topics", fn: generateMainTopics },
      { name: "programmatic", fn: generateMainProgrammatic },
    ];

    const mainChildSitemaps: { name: string; urlCount: number }[] = [];
    let mainTotalUrls = 0;
    let mainSitemapCount = 0;
    const allMainUrls = new Set<string>();

    for (const gen of mainGenerators) {
      try {
        const urls = await gen.fn();
        const chunks = splitIntoChunks(urls, SITEMAP_SPLIT_LIMIT);
        for (let i = 0; i < chunks.length; i++) {
          const suffix = chunks.length > 1 ? `-${i + 1}` : "";
          mainChildSitemaps.push({ name: `sitemap-${gen.name}${suffix}.xml`, urlCount: chunks[i].length });
          mainSitemapCount++;
        }
        mainTotalUrls += urls.length;

        for (const urlXml of urls) {
          const locMatch = urlXml.match(/<loc>([^<]+)<\/loc>/g);
          if (locMatch) {
            for (const m of locMatch) {
              const loc = m.replace(/<\/?loc>/g, "");
              if (allMainUrls.has(loc)) {
                issues.push(`Duplicate URL on main site: ${loc}`);
              }
              allMainUrls.add(loc);
            }
          }
        }
      } catch (e: any) {
        issues.push(`Error generating main/${gen.name}: ${e.message}`);
      }
    }

    const alliedStaticUrls = await generateAlliedPages().catch(() => []);
    const alliedDbUrls = await generateAlliedDatabaseContent().catch(() => []);
    const alliedAllUrls = [...alliedStaticUrls, ...alliedDbUrls];
    const alliedChunks = splitIntoChunks(alliedAllUrls, SITEMAP_SPLIT_LIMIT);
    const alliedChildSitemaps = alliedChunks.map((chunk, i) => ({
      name: `sitemap-allied-content${alliedChunks.length > 1 ? `-${i + 1}` : ""}.xml`,
      urlCount: chunk.length,
    }));

    const newgradUrls = await generateNewGradPages().catch(() => []);
    const newgradChunks = splitIntoChunks(newgradUrls, SITEMAP_SPLIT_LIMIT);
    const newgradChildSitemaps = newgradChunks.map((chunk, i) => ({
      name: `sitemap-newgrad-content${newgradChunks.length > 1 ? `-${i + 1}` : ""}.xml`,
      urlCount: chunk.length,
    }));

    if (mainTotalUrls === 0) issues.push("Main site has 0 URLs - possible database issue");
    if (alliedAllUrls.length === 0) issues.push("Allied site has 0 URLs - possible database issue");
    if (newgradUrls.length === 0) issues.push("NewGrad site has 0 URLs");

    const report: HealthReport = {
      status: issues.length === 0 ? "ok" : "warning",
      generatedAt: new Date().toISOString(),
      domains: {
        main: {
          totalUrls: mainTotalUrls,
          sitemapCount: mainSitemapCount,
          childSitemaps: mainChildSitemaps,
        },
        allied: {
          totalUrls: alliedAllUrls.length,
          sitemapCount: alliedChildSitemaps.length,
          childSitemaps: alliedChildSitemaps,
        },
        newgrad: {
          totalUrls: newgradUrls.length,
          sitemapCount: newgradChildSitemaps.length,
          childSitemaps: newgradChildSitemaps,
        },
      },
      issues,
    };

    res.json(report);
  } catch (e: any) {
    res.status(500).json({ status: "error", message: e.message, issues: [e.message] });
  }
}
