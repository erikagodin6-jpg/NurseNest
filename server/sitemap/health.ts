import type { Request, Response } from "express";
import {
  getSiteBase, getAlliedBase, getNewGradBase, todayDate,
  wrapUrlset, splitIntoChunks, SITEMAP_SPLIT_LIMIT
} from "./helpers";
import {
  generateMainPages, generateMainLessons, generateMainQuestions,
  generateMainFlashcards, generateMainSpecialties, generateMainGlossary,
  generateMainClinicalClarity, generateMainBlog, generateMainMedicalImaging,
  generateMainSeoContent, generateMainTopics, generateMainProgrammatic,
  generateSeoContentPages
} from "./main-site";
import {
  generateAlliedPages, generateAlliedDatabaseContent,
  generateAlliedCareers, generateAlliedExams, generateAlliedTools,
  generateAlliedTopics, generateAlliedSeoLanding
} from "./allied-site";
import { generateNewGradPages } from "./newgrad-site";

interface ValidationResult {
  totalUrls: number;
  checked: number;
  passed: number;
  failed: number;
  duplicates: number;
  errors: { url: string; status: number; error?: string }[];
  duplicateUrls: string[];
  duration: number;
}

export async function sitemapValidate(req: Request, res: Response) {
  const startTime = Date.now();
  const requestedLimit = parseInt(String(req.query.limit || "0"));
  const maxCheck = requestedLimit > 0 ? requestedLimit : Infinity;
  const domain = String(req.query.domain || "main");

  try {
    let allXmlUrls: string[] = [];

    if (domain === "main" || domain === "all") {
      const generators = [
        generateMainPages, generateMainLessons, generateMainQuestions,
        generateMainFlashcards, generateMainSpecialties, generateMainGlossary,
        generateMainClinicalClarity, generateMainBlog, generateMainMedicalImaging,
        generateMainSeoContent, generateMainTopics, generateMainProgrammatic,
        generateSeoContentPages,
      ];
      for (const gen of generators) {
        try {
          const urls = await gen();
          allXmlUrls.push(...urls);
        } catch (e) {
          console.error(`Sitemap validate: generator ${gen.name} error:`, e);
        }
      }
    }

    if (domain === "allied" || domain === "all") {
      const alliedGenerators = [
        generateAlliedCareers, generateAlliedExams, generateAlliedTools,
        generateAlliedTopics, generateAlliedSeoLanding,
      ];
      for (const gen of alliedGenerators) {
        try {
          const urls = await gen();
          allXmlUrls.push(...urls);
        } catch (e) {
          console.error(`Sitemap validate: allied generator ${gen.name} error:`, e);
        }
      }
    }

    if (domain === "newgrad" || domain === "all") {
      try {
        const urls = await generateNewGradPages();
        allXmlUrls.push(...urls);
      } catch (e) {
        console.error("Sitemap validate: newgrad pages error:", e);
      }
    }

    const extractedUrls: string[] = [];
    const urlSet = new Set<string>();
    const duplicateUrls: string[] = [];
    for (const xmlEntry of allXmlUrls) {
      const locMatches = xmlEntry.match(/<loc>([^<]+)<\/loc>/g);
      if (locMatches) {
        for (const m of locMatches) {
          const url = m.replace(/<\/?loc>/g, "");
          if (urlSet.has(url)) {
            if (!duplicateUrls.includes(url)) {
              duplicateUrls.push(url);
            }
          } else {
            urlSet.add(url);
            extractedUrls.push(url);
          }
        }
      }
    }

    const totalUrls = extractedUrls.length;
    const urlsToCheck = maxCheck === Infinity
      ? extractedUrls
      : extractedUrls.slice(0, maxCheck);

    const errors: { url: string; status: number; error?: string }[] = [];
    let passed = 0;

    for (const url of urlsToCheck) {
      try {
        const urlObj = new URL(url);
        const internalPath = urlObj.pathname + urlObj.search;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        try {
          const response = await fetch(`http://localhost:${process.env.PORT || 3000}${internalPath}`, {
            method: "HEAD",
            signal: controller.signal,
            headers: { "Host": urlObj.hostname },
            redirect: "follow",
          });
          clearTimeout(timeout);

          if (response.ok || response.status === 301 || response.status === 302) {
            passed++;
          } else {
            errors.push({ url, status: response.status });
          }
        } catch (fetchErr: any) {
          clearTimeout(timeout);
          if (fetchErr.name === "AbortError") {
            errors.push({ url, status: 0, error: "timeout" });
          } else {
            errors.push({ url, status: 0, error: fetchErr.message });
          }
        }
      } catch (e: any) {
        errors.push({ url, status: 0, error: e.message });
      }
    }

    const result: ValidationResult = {
      totalUrls,
      checked: urlsToCheck.length,
      passed,
      failed: errors.length,
      duplicates: duplicateUrls.length,
      errors: errors.slice(0, 50),
      duplicateUrls: duplicateUrls.slice(0, 50),
      duration: Date.now() - startTime,
    };

    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message, duration: Date.now() - startTime });
  }
}

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

    const alliedGenerators = [
      { name: "allied-careers", fn: generateAlliedCareers },
      { name: "allied-exams", fn: generateAlliedExams },
      { name: "allied-tools", fn: generateAlliedTools },
      { name: "allied-topics", fn: generateAlliedTopics },
      { name: "allied-seo-landing", fn: generateAlliedSeoLanding },
    ];

    const alliedChildSitemaps: { name: string; urlCount: number }[] = [];
    let alliedTotalUrls = 0;
    let alliedSitemapCount = 0;
    const allAlliedUrls = new Set<string>();

    for (const gen of alliedGenerators) {
      try {
        const urls = await gen.fn();
        const chunks = splitIntoChunks(urls, SITEMAP_SPLIT_LIMIT);
        for (let i = 0; i < chunks.length; i++) {
          const suffix = chunks.length > 1 ? `-${i + 1}` : "";
          alliedChildSitemaps.push({ name: `sitemap-${gen.name}${suffix}.xml`, urlCount: chunks[i].length });
          alliedSitemapCount++;
        }
        alliedTotalUrls += urls.length;

        for (const urlXml of urls) {
          const locMatch = urlXml.match(/<loc>([^<]+)<\/loc>/g);
          if (locMatch) {
            for (const m of locMatch) {
              const loc = m.replace(/<\/?loc>/g, "");
              if (allAlliedUrls.has(loc)) {
                issues.push(`Duplicate URL on allied site: ${loc}`);
              }
              allAlliedUrls.add(loc);
            }
          }
        }
      } catch (e: any) {
        issues.push(`Error generating allied/${gen.name}: ${e.message}`);
      }
    }

    const newgradUrls = await generateNewGradPages().catch(() => []);
    const newgradChunks = splitIntoChunks(newgradUrls, SITEMAP_SPLIT_LIMIT);
    const newgradChildSitemaps = newgradChunks.map((chunk, i) => ({
      name: `sitemap-newgrad-content${newgradChunks.length > 1 ? `-${i + 1}` : ""}.xml`,
      urlCount: chunk.length,
    }));

    if (mainTotalUrls === 0) issues.push("Main site has 0 URLs - possible database issue");
    if (alliedTotalUrls === 0) issues.push("Allied site has 0 URLs - possible database issue");
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
          totalUrls: alliedTotalUrls,
          sitemapCount: alliedSitemapCount,
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
