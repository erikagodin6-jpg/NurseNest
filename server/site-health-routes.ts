import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import { STATIC_ROUTES, FOOTER_LINKS, isValidRoute } from "@shared/route-manifest";

interface HealthIssue {
  id: string;
  type: "broken-link" | "route-mismatch" | "sitemap-error" | "seo-gap" | "missing-page" | "content-guard" | "missing-content";
  severity: "critical" | "warning" | "info";
  title: string;
  detail: string;
  source: string;
  path?: string;
}

export function registerSiteHealthRoutes(app: Express): void {
  app.get("/api/admin/site-health/scan", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const issues: HealthIssue[] = [];
      const scanErrors: string[] = [];
      let issueCounter = 0;
      const makeId = () => `issue-${++issueCounter}`;

      let contentItems: any[] = [];
      let lessonsRows: any[] = [];
      let examByTier: Record<string, number> = {};
      let examByCategory: Record<string, number> = {};
      let flashcardTopics = new Set<string>();
      let flashcardByTopic: Record<string, number> = {};
      let accessedLessonIds = new Set<string>();

      try {
        const [
          contentResult,
          lessonsResult,
          examQuestionsResult,
          examCategoryResult,
          flashcardResult,
          flashcardCountResult,
          lessonAccessResult,
        ] = await Promise.all([
          pool.query(`SELECT id, title, slug, tier, status, summary, seo_title, seo_description, content, type FROM content_items ORDER BY tier, title`),
          pool.query(`SELECT id, slug, title, tier, status, seo_title, seo_description FROM lessons ORDER BY tier, title`),
          pool.query(`SELECT tier, COUNT(*) as count FROM exam_questions WHERE status = 'published' GROUP BY tier`),
          pool.query(`SELECT category, COUNT(*) as count FROM exam_questions WHERE status = 'published' AND category IS NOT NULL GROUP BY category`),
          pool.query(`SELECT DISTINCT topic FROM flashcard_bank WHERE status = 'published'`),
          pool.query(`SELECT topic, COUNT(*) as count FROM flashcard_bank WHERE status = 'published' GROUP BY topic`),
          pool.query(`SELECT lesson_id, COUNT(*) as access_count FROM user_progress GROUP BY lesson_id ORDER BY access_count DESC LIMIT 500`),
        ]);
        contentItems = contentResult.rows;
        lessonsRows = lessonsResult.rows;
        for (const row of examQuestionsResult.rows) {
          examByTier[row.tier] = Number(row.count);
        }
        for (const row of examCategoryResult.rows) {
          examByCategory[row.category] = Number(row.count);
        }
        flashcardTopics = new Set(flashcardResult.rows.map((r: any) => r.topic));
        for (const row of flashcardCountResult.rows) {
          flashcardByTopic[row.topic] = Number(row.count);
        }
        accessedLessonIds = new Set(lessonAccessResult.rows.map((r: any) => String(r.lesson_id)));
      } catch (e: any) {
        scanErrors.push(`Database query failed: ${e.message}`);
      }

      const allContentSlugs = new Set<string>();
      const allLessonSlugs = new Set<string>();

      for (const item of contentItems) {
        allContentSlugs.add(item.slug);
      }
      for (const lesson of lessonsRows) {
        allLessonSlugs.add(lesson.slug);
      }
      const combinedSlugs = new Set([...allContentSlugs, ...allLessonSlugs]);

      const tierCounts: Record<string, { total: number; published: number; draft: number; empty: number }> = {};
      const contentTitles = new Map<string, string>();

      for (const item of contentItems) {
        const tier = item.tier || "free";
        if (!tierCounts[tier]) tierCounts[tier] = { total: 0, published: 0, draft: 0, empty: 0 };
        tierCounts[tier].total++;

        if (item.status === "published") tierCounts[tier].published++;
        else if (item.status === "draft") tierCounts[tier].draft++;

        const contentArr = Array.isArray(item.content) ? item.content : [];
        const hasContent = contentArr.length > 0 || (item.summary && item.summary.length > 20);

        if (!hasContent) {
          tierCounts[tier].empty++;
          issues.push({
            id: makeId(),
            type: "missing-content",
            severity: item.status === "published" ? "critical" : "warning",
            title: `Empty content: ${item.title || item.slug}`,
            detail: `Content item "${item.title}" (${tier} tier) has no content blocks and no meaningful summary`,
            source: "Content Scanner",
            path: `/lessons/${item.slug}`,
          });
        }

        if (item.status === "published") {
          if (!item.seo_title && !item.title) {
            issues.push({
              id: makeId(),
              type: "seo-gap",
              severity: "warning",
              title: `Missing SEO title: ${item.slug}`,
              detail: `Published content "${item.slug}" has no SEO title or page title`,
              source: "SEO Validator",
              path: `/lessons/${item.slug}`,
            });
          }

          if (!item.seo_description && !item.summary) {
            issues.push({
              id: makeId(),
              type: "seo-gap",
              severity: "warning",
              title: `Missing meta description: ${item.slug}`,
              detail: `Published content "${item.slug}" has no SEO description or summary`,
              source: "SEO Validator",
              path: `/lessons/${item.slug}`,
            });
          }
        }

        if (item.title && contentTitles.has(item.title)) {
          issues.push({
            id: makeId(),
            type: "seo-gap",
            severity: "info",
            title: `Duplicate title: ${item.title}`,
            detail: `Content items "${item.slug}" and "${contentTitles.get(item.title)}" share the title "${item.title}"`,
            source: "SEO Validator",
            path: `/lessons/${item.slug}`,
          });
        }
        if (item.title) contentTitles.set(item.title, item.slug);
      }

      for (const lesson of lessonsRows) {
        if (lesson.status === "published") {
          if (!lesson.seo_title && !lesson.title) {
            issues.push({
              id: makeId(),
              type: "seo-gap",
              severity: "warning",
              title: `Lesson missing SEO title: ${lesson.slug}`,
              detail: `Published lesson "${lesson.slug}" has no SEO title or page title`,
              source: "SEO Validator (lessons table)",
              path: `/lessons/${lesson.slug}`,
            });
          }
          if (!lesson.seo_description) {
            issues.push({
              id: makeId(),
              type: "seo-gap",
              severity: "info",
              title: `Lesson missing meta description: ${lesson.slug}`,
              detail: `Published lesson "${lesson.slug}" has no SEO description`,
              source: "SEO Validator (lessons table)",
              path: `/lessons/${lesson.slug}`,
            });
          }
        }
      }

      for (const lessonId of accessedLessonIds) {
        if (!combinedSlugs.has(lessonId)) {
          const normalizedId = lessonId.replace(/\s+/g, "-").toLowerCase();
          if (!combinedSlugs.has(normalizedId)) {
            issues.push({
              id: makeId(),
              type: "broken-link",
              severity: "warning",
              title: `Accessed lesson not found: ${lessonId}`,
              detail: `Users have accessed lesson "${lessonId}" but it does not exist in content_items or lessons tables. This may be a broken reference or legacy slug.`,
              source: "Broken Link Scanner",
              path: `/lessons/${lessonId}`,
            });
          }
        }
      }

      for (const footerLink of FOOTER_LINKS) {
        if (!isValidRoute(footerLink)) {
          issues.push({
            id: makeId(),
            type: "broken-link",
            severity: "critical",
            title: `Footer link has no matching route: ${footerLink}`,
            detail: `Footer navigation contains link "${footerLink}" which does not match any known route in the application`,
            source: "Internal Link Scanner",
            path: footerLink,
          });
        }
      }

      let sitemapUrls: string[] = [];
      try {
        const sitemapModule = await import("./sitemap/main-site");
        const generators = [
          sitemapModule.generateMainPages(),
          sitemapModule.generateMainLessons(),
          sitemapModule.generateMainQuestions?.()?.catch(() => []),
          sitemapModule.generateMainFlashcards?.()?.catch(() => []),
          sitemapModule.generateMainBlog?.()?.catch(() => []),
          sitemapModule.generateMainSeoContent?.()?.catch(() => []),
        ].filter(Boolean);

        const allResults = await Promise.all(generators.map((g: any) => g?.catch?.(() => []) || g));
        for (const urlList of allResults) {
          if (!Array.isArray(urlList)) continue;
          for (const urlXml of urlList) {
            const locMatch = String(urlXml).match(/<loc>([^<]+)<\/loc>/);
            if (locMatch) {
              try {
                const url = new URL(locMatch[1]);
                sitemapUrls.push(url.pathname);
              } catch {}
            }
          }
        }
      } catch (e: any) {
        scanErrors.push(`Sitemap generation error: ${e.message}`);
        issues.push({
          id: makeId(),
          type: "sitemap-error",
          severity: "critical",
          title: "Sitemap generation failed",
          detail: "Could not generate sitemap URLs for validation",
          source: "Sitemap Validator",
        });
      }

      const duplicateSitemapUrls = new Set<string>();
      const seenSitemapUrls = new Set<string>();
      for (const path of sitemapUrls) {
        if (seenSitemapUrls.has(path)) {
          duplicateSitemapUrls.add(path);
        }
        seenSitemapUrls.add(path);
      }

      for (const dup of duplicateSitemapUrls) {
        issues.push({
          id: makeId(),
          type: "sitemap-error",
          severity: "warning",
          title: `Duplicate sitemap URL: ${dup}`,
          detail: `The URL "${dup}" appears multiple times in the sitemap`,
          source: "Sitemap Validator",
          path: dup,
        });
      }

      for (const path of seenSitemapUrls) {
        if (!isValidRoute(path)) {
          issues.push({
            id: makeId(),
            type: "route-mismatch",
            severity: "warning",
            title: `Sitemap URL has no matching route: ${path}`,
            detail: `URL "${path}" is in the sitemap but does not match any known frontend route pattern`,
            source: "Route Validator",
            path,
          });
        }
      }

      for (const item of contentItems) {
        if (item.status === "published" && item.slug) {
          const lessonPath = `/lessons/${item.slug}`;
          if (!seenSitemapUrls.has(lessonPath)) {
            issues.push({
              id: makeId(),
              type: "missing-page",
              severity: "info",
              title: `Published content missing from sitemap: ${item.slug}`,
              detail: `Content item "${item.title}" is published but "/lessons/${item.slug}" was not found in the sitemap`,
              source: "Sitemap Validator",
              path: lessonPath,
            });
          }
        }
      }

      for (const lesson of lessonsRows) {
        if (lesson.status === "published" && lesson.slug) {
          const lessonPath = `/lessons/${lesson.slug}`;
          if (!seenSitemapUrls.has(lessonPath) && !allContentSlugs.has(lesson.slug)) {
            issues.push({
              id: makeId(),
              type: "missing-page",
              severity: "info",
              title: `Published lesson missing from sitemap: ${lesson.slug}`,
              detail: `Lesson "${lesson.title}" is published but "/lessons/${lesson.slug}" was not found in the sitemap`,
              source: "Sitemap Validator (lessons table)",
              path: lessonPath,
            });
          }
        }
      }

      const TIERS = ["rpn", "rn", "np"];
      for (const tier of TIERS) {
        if (!examByTier[tier] || examByTier[tier] === 0) {
          issues.push({
            id: makeId(),
            type: "missing-content",
            severity: "warning",
            title: `No exam questions for tier: ${tier}`,
            detail: `The ${tier.toUpperCase()} tier has no published exam questions in the test bank`,
            source: "Content Coverage",
          });
        }
      }

      const publishedByTier: Record<string, number> = {};
      for (const item of contentItems) {
        if (item.status === "published") {
          const tier = item.tier || "free";
          publishedByTier[tier] = (publishedByTier[tier] || 0) + 1;
        }
      }

      for (const tier of TIERS) {
        if (!publishedByTier[tier] || publishedByTier[tier] < 3) {
          issues.push({
            id: makeId(),
            type: "missing-content",
            severity: "critical",
            title: `Very few published lessons for tier: ${tier}`,
            detail: `The ${tier.toUpperCase()} tier has only ${publishedByTier[tier] || 0} published lessons. Consider adding more content.`,
            source: "Content Coverage",
          });
        }
      }

      const lowCoverageTopics: string[] = [];
      for (const [topic, count] of Object.entries(flashcardByTopic)) {
        if (count < 3) {
          lowCoverageTopics.push(topic);
        }
      }
      if (lowCoverageTopics.length > 0) {
        issues.push({
          id: makeId(),
          type: "missing-content",
          severity: "info",
          title: `${lowCoverageTopics.length} flashcard topics have fewer than 3 cards`,
          detail: `Topics with sparse flashcard coverage: ${lowCoverageTopics.slice(0, 10).join(", ")}${lowCoverageTopics.length > 10 ? ` and ${lowCoverageTopics.length - 10} more` : ""}`,
          source: "Content Coverage",
        });
      }

      const contentGuardFlags: { path: string; reason: string }[] = [];
      for (const item of contentItems) {
        if (item.status !== "published") {
          const contentArr = Array.isArray(item.content) ? item.content : [];
          const hasContent = contentArr.length > 0 || (item.summary && item.summary.length > 50);
          if (!hasContent) {
            contentGuardFlags.push({
              path: `/lessons/${item.slug}`,
              reason: `"${item.title || item.slug}" is ${item.status} with no content — links should be hidden`,
            });
            issues.push({
              id: makeId(),
              type: "content-guard",
              severity: "warning",
              title: `Content guard: ${item.title || item.slug}`,
              detail: `Navigation links to "/lessons/${item.slug}" should be hidden — page has no content (status: ${item.status})`,
              source: "Content Guard",
              path: `/lessons/${item.slug}`,
            });
          }
        }
      }

      const summary = {
        totalIssues: issues.length,
        critical: issues.filter(i => i.severity === "critical").length,
        warnings: issues.filter(i => i.severity === "warning").length,
        info: issues.filter(i => i.severity === "info").length,
        byType: {
          brokenLinks: issues.filter(i => i.type === "broken-link").length,
          routeMismatches: issues.filter(i => i.type === "route-mismatch").length,
          sitemapErrors: issues.filter(i => i.type === "sitemap-error").length,
          seoGaps: issues.filter(i => i.type === "seo-gap").length,
          missingPages: issues.filter(i => i.type === "missing-page").length,
          missingContent: issues.filter(i => i.type === "missing-content").length,
          contentGuard: issues.filter(i => i.type === "content-guard").length,
        },
      };

      const contentCoverage = {
        lessonsByTier: Object.entries(tierCounts).map(([tier, counts]) => ({
          tier,
          ...counts,
        })),
        examQuestionsByTier: Object.entries(examByTier).map(([tier, count]) => ({
          tier,
          count,
        })),
        examCategoryBreakdown: Object.entries(examByCategory).map(([category, count]) => ({
          category,
          count,
        })),
        flashcardTopicCount: flashcardTopics.size,
        flashcardByTopic: Object.entries(flashcardByTopic).map(([topic, count]) => ({
          topic,
          count,
        })),
        totalContentItems: contentItems.length,
        totalLessons: lessonsRows.length,
        totalPublished: contentItems.filter((c: any) => c.status === "published").length,
        totalDraft: contentItems.filter((c: any) => c.status === "draft").length,
        sitemapUrlCount: sitemapUrls.length,
      };

      let financialSummary: any = null;
      try {
        const expenseResult = await pool.query("SELECT * FROM business_expenses ORDER BY date DESC").catch(() => ({ rows: [] }));
        const expenses = expenseResult.rows;
        let totalExpensesCAD = 0;
        for (const exp of expenses) {
          const amt = parseFloat(exp.amount) || 0;
          totalExpensesCAD += exp.currency === "USD" ? amt / 0.74 : amt;
        }

        let aiSpendUSD = 0;
        try {
          const aiResult = await pool.query("SELECT COALESCE(SUM(actual_cost), 0) as total FROM ai_jobs");
          aiSpendUSD = parseFloat(aiResult.rows[0]?.total || "0");
        } catch (e: any) {
          scanErrors.push(`AI spend query failed: ${e.message}`);
        }

        let totalRevenueUSD = 0;
        try {
          const { getUncachableStripeClient } = await import("./stripeClient");
          const stripe = await getUncachableStripeClient();
          let allCharges: any[] = [];
          let hasMore = true;
          let startingAfter: string | undefined;
          while (hasMore) {
            const params: any = { limit: 100 };
            if (startingAfter) params.starting_after = startingAfter;
            const batch = await stripe.charges.list(params);
            const successful = batch.data.filter((c: any) => c.status === "succeeded");
            allCharges.push(...successful);
            hasMore = batch.has_more;
            if (batch.data.length > 0) startingAfter = batch.data[batch.data.length - 1].id;
            if (allCharges.length >= 500) break;
          }
          totalRevenueUSD = allCharges.reduce((sum: number, c: any) => sum + (c.amount / 100), 0);
        } catch (e: any) {
          scanErrors.push(`Stripe revenue query failed: ${e.message}`);
        }

        const totalRevenueCAD = totalRevenueUSD / 0.74;
        const totalInvestedCAD = totalExpensesCAD + (aiSpendUSD / 0.74);

        financialSummary = {
          totalRevenueCAD: Math.round(totalRevenueCAD * 100) / 100,
          totalExpensesCAD: Math.round(totalInvestedCAD * 100) / 100,
          profitLossCAD: Math.round((totalRevenueCAD - totalInvestedCAD) * 100) / 100,
          breakEvenRemainingCAD: Math.round(Math.max(0, totalInvestedCAD - totalRevenueCAD) * 100) / 100,
          aiSpendUSD: Math.round(aiSpendUSD * 100) / 100,
        };
      } catch (e: any) {
        scanErrors.push(`Financial summary failed: ${e.message}`);
      }

      res.json({
        scannedAt: new Date().toISOString(),
        summary,
        issues,
        contentCoverage,
        contentGuardFlags,
        financialSummary,
        scanErrors: scanErrors.length > 0 ? scanErrors : undefined,
      });
    } catch (e: any) {
      console.error("[SiteHealth] Scan error:", e.message);
      res.status(500).json({ error: "Site health scan failed" });
    }
  });
}
