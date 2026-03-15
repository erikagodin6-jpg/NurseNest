import type { Express, Request, Response } from "express";
import { adaptLessonContent } from "./region-adapt-content";
import { resolveAuthUser, logPaywallAudit } from "./admin-auth";

const FREE_LESSON_PREVIEW_LIMIT = 5;

function getPreviewFromToken(token: string): { mode: string } | null {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    if (parsed.mode && typeof parsed.mode === "string") return parsed;
  } catch {}
  return null;
}

async function extractLessonUserTier(req: Request): Promise<string> {
  const authHeader = String(req.headers?.["authorization"] || "");
  const hasToken = authHeader.startsWith("Bearer ") || !!req.headers?.["x-user-token"];
  const user = await resolveAuthUser(req as any);
  if (!user) {
    if (hasToken) {
      console.warn("[LessonAPI] Auth token present but user resolution failed — defaulting to free. Path:", req.path);
    }
    return "free";
  }
  if (user.tier === "admin") {
    const previewToken = ((req as any).cookies?.nursenest_preview || "") as string;
    const preview = getPreviewFromToken(previewToken);
    if (preview) return preview.mode;
    return "admin";
  }
  return user.tier || "free";
}

function getAllowedLessonTiers(userTier: string): string[] {
  if (userTier === "admin") return ["free", "rpn", "rn", "np", "allied", "imaging", "newgrad"];
  if (userTier === "free" || !userTier) return ["free"];
  if (userTier === "rn") return ["free", "rn", "rpn"];
  if (userTier === "np") return ["free", "np", "rn"];
  return ["free", userTier];
}

function canUserAccessLesson(userTier: string, lessonTier: string): boolean {
  const allowed = getAllowedLessonTiers(userTier);
  return allowed.includes(lessonTier);
}

type LessonMeta = {
  id: string;
  title: string;
  tier: string;
  category: string;
  hasQuiz: boolean;
  hasPreTest: boolean;
  hasPostTest: boolean;
  medCount: number;
  image?: string;
  isComplete: boolean;
};

let lessonData: Record<string, any> | null = null;
let metadataCache: LessonMeta[] | null = null;

export async function loadLessonData(): Promise<Record<string, any>> {
  if (lessonData) return lessonData;
  const mod = await import("../client/src/data/lessons/index");
  lessonData = mod.contentMap;
  return lessonData!;
}

export function deriveTier(id: string, metadata?: { tier?: string }): string {
  if (metadata?.tier && ["rpn", "rn", "np", "free", "allied", "imaging", "newgrad"].includes(metadata.tier)) {
    return metadata.tier;
  }
  if (/-np$/.test(id) || /-advanced-np$/.test(id) || /-management-np$/.test(id) || /-np-/.test(id)) return "np";
  if (/-rn$/.test(id) || /-basics-rn$/.test(id) || /-rn-/.test(id)) return "rn";
  if (/-rpn$/.test(id) || /-basics-rpn$/.test(id) || /-rpn-/.test(id)) return "rpn";
  if (id.startsWith("free-") || id.endsWith("-free")) return "free";
  return "rpn";
}

function deriveCategory(lesson: any): string {
  const title = (lesson.title || "").toLowerCase();
  if (/cardiac|heart|ecg|ekg|arrhyth|hypertens|chf|angina|mi\b/.test(title)) return "Cardiovascular";
  if (/respiratory|lung|asthma|copd|pneum|oxygen|airway|breath/.test(title)) return "Respiratory";
  if (/neuro|brain|stroke|seizure|parkinson|alzheim|ms\b|meningit/.test(title)) return "Neurological";
  if (/gi\b|gastro|bowel|liver|hepat|pancrea|colon|abdomin|constip/.test(title)) return "Gastrointestinal";
  if (/renal|kidney|dialysis|uti\b|bladder|urinar/.test(title)) return "Renal/Urinary";
  if (/diabet|thyroid|adrenal|endocrin|insulin|glucose|a1c|cushing|addison/.test(title)) return "Endocrine";
  if (/blood|anemia|hemato|platelet|coagul|leukemia|lymph|transfus|hemophil|thalass/.test(title)) return "Hematology";
  if (/pedia|child|infant|neonat|newborn|apgar/.test(title)) return "Pediatrics";
  if (/matern|pregnan|labor|delivery|obstet|prenatal|postpartum|lochia|antepartum/.test(title)) return "Maternity";
  if (/mental|psych|depress|anxiety|bipolar|schizo|suicid/.test(title)) return "Mental Health";
  if (/infect|sepsis|mrsa|vre|clostrid|hiv|aids|hepatitis|tb\b|tuberculosis/.test(title)) return "Infection Control";
  if (/pharm|medic|drug|dose|dosage/.test(title)) return "Pharmacology";
  if (/skin|wound|burn|dermat|rash|cellulitis|shingles|pressure/.test(title)) return "Integumentary";
  if (/eye|ear|vision|hearing|glauco|cataract|macula/.test(title)) return "HEENT";
  if (/bone|fracture|joint|musculo|ortho|arthr|osteopor/.test(title)) return "Musculoskeletal";
  if (/cancer|oncolog|tumor|chemo|radiation|malignan/.test(title)) return "Oncology";
  if (/electrolyte|sodium|potassium|calcium|magnesium|phosph|fluid|dehydr|acid.base/.test(title)) return "Fluid & Electrolytes";
  if (/assessment|vital|physical exam/.test(title)) return "Assessment";
  if (/safety|fall|restrain|error|ethic|legal|delegation|priorit/.test(title)) return "Fundamentals";
  if (/pain|comfort|palliative|hospice/.test(title)) return "Pain Management";
  if (/nutrition|diet|feed|ngt|peg|enteral|parenteral/.test(title)) return "Nutrition";
  if (/bph|prostat/.test(title)) return "Renal/Urinary";
  return "General";
}

async function buildMetadata(): Promise<LessonMeta[]> {
  if (metadataCache) return metadataCache;
  const data = await loadLessonData();
  metadataCache = Object.entries(data).map(([id, lesson]: [string, any]) => {
    const cellularContent = lesson.cellular?.content || "";
    const isPlaceholder = typeof cellularContent === "string" && cellularContent.includes("[WRITE YOUR");
    return {
      id,
      title: typeof lesson.title === "object" ? (lesson.title.en || lesson.title) : (lesson.title || id),
      tier: deriveTier(id),
      category: deriveCategory(lesson),
      hasQuiz: Array.isArray(lesson.quiz) && lesson.quiz.length > 0,
      hasPreTest: Array.isArray(lesson.preTest) && lesson.preTest.length > 0,
      hasPostTest: Array.isArray(lesson.postTest) && lesson.postTest.length > 0,
      medCount: Array.isArray(lesson.medications) ? lesson.medications.length : 0,
      image: lesson.image,
      isComplete: !isPlaceholder,
    };
  });
  return metadataCache;
}

function buildLessonPreview(lesson: any, slug: string, tier: string): any {
  const preview: any = {
    id: slug,
    tier,
    isPreviewOnly: true,
    requiredTier: tier,
    title: lesson.title || slug,
    image: lesson.image || undefined,
  };

  if (lesson.cellular) {
    preview.cellular = {
      title: lesson.cellular.title || "",
      content: typeof lesson.cellular.content === "string"
        ? lesson.cellular.content.slice(0, 600)
        : "",
    };
  }

  if (lesson.summary) {
    preview.summary = lesson.summary;
  }

  if (lesson.definition) {
    preview.definition = lesson.definition;
  }

  if (lesson.objectives) {
    preview.objectives = Array.isArray(lesson.objectives) ? lesson.objectives.slice(0, 3) : lesson.objectives;
  }

  if (lesson.medications && Array.isArray(lesson.medications)) {
    preview.medications = [];
  }
  if (lesson.quiz && Array.isArray(lesson.quiz)) {
    preview.quiz = [];
  }
  if (lesson.preTest) {
    preview.preTest = [];
  }
  if (lesson.postTest) {
    preview.postTest = [];
  }

  return preview;
}

export function setupLessonContentRoutes(app: Express): void {
  app.get("/api/admin/lesson-diagnostics", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin only" });
      }
      const allMeta = await buildMetadata();
      const tierCounts: Record<string, number> = {};
      const completeCounts: Record<string, number> = {};
      for (const m of allMeta) {
        tierCounts[m.tier] = (tierCounts[m.tier] || 0) + 1;
        if (m.isComplete) completeCounts[m.tier] = (completeCounts[m.tier] || 0) + 1;
      }
      let dbLessonCount = 0;
      try {
        const { pool } = await import("./storage");
        const dbResult = await pool.query(`SELECT tier, COUNT(*) as cnt FROM content_items WHERE type = 'lesson' AND status = 'published' GROUP BY tier`);
        dbLessonCount = dbResult.rows.reduce((sum: number, r: any) => sum + parseInt(r.cnt), 0);
      } catch {}
      res.json({
        totalStaticLessons: allMeta.length,
        staticByTier: tierCounts,
        completeByTier: completeCounts,
        dbLessonCount,
        deploymentTime: new Date().toISOString(),
        nodeEnv: process.env.NODE_ENV || "unknown",
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/lessons/meta", async (req: Request, res: Response) => {
    try {
      const userTier = await extractLessonUserTier(req);
      const allMeta = await buildMetadata();
      console.log(`[LessonAPI] /api/lessons/meta — userTier: ${userTier}, totalMeta: ${allMeta.length}`);
      if (userTier === "free" || !userTier) {
        const previewSet = allMeta
          .filter(m => m.isComplete)
          .slice(0, FREE_LESSON_PREVIEW_LIMIT);
        console.log(`[LessonAPI] Free user — returning ${previewSet.length} preview lessons (limit: ${FREE_LESSON_PREVIEW_LIMIT})`);
        res.setHeader("Cache-Control", "private, max-age=60");
        return res.json(previewSet);
      }
      const allowed = getAllowedLessonTiers(userTier);
      const filtered = allMeta.filter(m => allowed.includes(m.tier));
      console.log(`[LessonAPI] meta: tier=${userTier}, total=${allMeta.length}, filtered=${filtered.length}`);
      res.setHeader("Cache-Control", "private, max-age=60");
      res.json(filtered);
    } catch (err: any) {
      console.error("[LessonAPI] meta error:", err.message);
      res.status(500).json({ error: "Failed to load lesson metadata" });
    }
  });

  app.get("/api/lessons/content/:slug", async (req: Request, res: Response) => {
    try {
      const data = await loadLessonData();
      let slug = req.params.slug;
      let lesson = data[slug];

      if (!lesson) {
        try {
          const { pool } = await import("./storage");
          const { normalizeForAlias } = await import("./title-canonicalizer");
          const normalizedSlug = normalizeForAlias(slug);
          const aliasResult = await pool.query(
            `SELECT canonical_slug FROM lesson_aliases WHERE normalized_alias = $1 LIMIT 1`,
            [normalizedSlug]
          );
          if (aliasResult.rows.length > 0) {
            const canonicalSlug = aliasResult.rows[0].canonical_slug;
            if (data[canonicalSlug]) {
              slug = canonicalSlug;
              lesson = data[slug];
            }
          }
        } catch (aliasErr: any) {
          console.warn("[LessonAlias] Slug resolution error:", aliasErr.message);
        }
      }

      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      const lessonTier = deriveTier(slug);
      const user = await resolveAuthUser(req as any);
      const userTier = await extractLessonUserTier(req);
      const userId = user ? String(user.id) : "anonymous";
      const subscriptionStatus = user?.subscription_status || (userTier === "free" ? "none" : "active");

      if (userTier === "free" || !userTier) {
        const allMeta = await buildMetadata();
        const previewLessons = allMeta
          .filter(m => m.isComplete)
          .slice(0, FREE_LESSON_PREVIEW_LIMIT);
        const previewIds = new Set(previewLessons.map(m => m.id));
        if (!previewIds.has(slug)) {
          logPaywallAudit({
            userId,
            role: "free",
            tier: "free",
            subscriptionStatus,
            resourcePath: `/api/lessons/content/${slug}`,
            contentTier: lessonTier,
            granted: false,
          });
          return res.status(403).json({
            error: "Access denied",
            code: "LESSON_TIER_LOCKED",
            requiredTier: lessonTier,
            userTier: "free",
            upgradeRequired: true,
          });
        }
        logPaywallAudit({
          userId,
          role: "free",
          tier: "free",
          subscriptionStatus,
          resourcePath: `/api/lessons/content/${slug}`,
          contentTier: lessonTier,
          granted: true,
        });
        const region = (req as any).region || "US";
        const adapted = adaptLessonContent(lesson, region);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        return res.json({ id: slug, tier: lessonTier, ...adapted });
      }

      if (!canUserAccessLesson(userTier, lessonTier)) {
        logPaywallAudit({
          userId,
          role: userTier,
          tier: userTier,
          subscriptionStatus,
          resourcePath: `/api/lessons/content/${slug}`,
          contentTier: lessonTier,
          granted: false,
        });
        const region = (req as any).region || "US";
        const adapted = adaptLessonContent(lesson, region);
        const previewData = buildLessonPreview(adapted, slug, lessonTier);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        return res.json(previewData);
      }

      logPaywallAudit({
        userId,
        role: userTier,
        tier: userTier,
        subscriptionStatus,
        resourcePath: `/api/lessons/content/${slug}`,
        contentTier: lessonTier,
        granted: true,
      });

      const region = (req as any).region || "US";
      const adapted = adaptLessonContent(lesson, region);
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.json({ id: slug, tier: lessonTier, isPreviewOnly: false, ...adapted });
    } catch (err: any) {
      console.error("[LessonAPI] content error:", err.message);
      res.status(500).json({ error: "Failed to load lesson content" });
    }
  });

  app.get("/api/lessons/search", async (req: Request, res: Response) => {
    try {
      const q = ((req.query.q as string) || "").toLowerCase().trim();
      if (!q || q.length < 2) {
        return res.json([]);
      }
      const userTier = await extractLessonUserTier(req);
      const allowed = getAllowedLessonTiers(userTier);
      const meta = await buildMetadata();

      const { resolveAbbreviation, normalizeForAlias } = await import("./title-canonicalizer");
      const expanded = resolveAbbreviation(q);
      const searchTerms = [q];
      if (expanded) searchTerms.push(expanded.toLowerCase());

      let aliasMatches: string[] = [];
      try {
        const { pool } = await import("./storage");
        const normalizedQ = normalizeForAlias(q);
        const aliasQueries = [normalizedQ];
        if (expanded) aliasQueries.push(normalizeForAlias(expanded));

        for (const aq of aliasQueries) {
          const aliasResult = await pool.query(
            `SELECT DISTINCT canonical_slug FROM lesson_aliases WHERE normalized_alias ILIKE $1 LIMIT 10`,
            [`%${aq}%`]
          );
          aliasMatches.push(...aliasResult.rows.map((r: any) => r.canonical_slug));
        }
      } catch (aliasErr: any) {
        console.warn("[LessonAlias] Search alias error:", aliasErr.message);
      }

      let allowedMeta: LessonMeta[];
      if (userTier === "free" || !userTier) {
        allowedMeta = meta.filter(m => m.isComplete).slice(0, FREE_LESSON_PREVIEW_LIMIT);
      } else {
        allowedMeta = meta.filter((m) => allowed.includes(m.tier));
      }
      const results = allowedMeta
        .filter((m) => {
          const titleLower = m.title.toLowerCase();
          const idLower = m.id.toLowerCase();
          for (const term of searchTerms) {
            if (titleLower.includes(term) || idLower.includes(term)) return true;
          }
          if (aliasMatches.length > 0) {
            const mIdLower = m.id.toLowerCase();
            for (const alias of aliasMatches) {
              if (alias === mIdLower || mIdLower.includes(alias) || alias.includes(mIdLower)) return true;
            }
          }
          return false;
        })
        .slice(0, 20);
      res.setHeader("Cache-Control", "private, max-age=60");
      res.json(results);
    } catch (err: any) {
      console.error("[LessonAPI] search error:", err.message);
      res.status(500).json({ error: "Search failed" });
    }
  });

  app.get("/api/lessons/count", async (_req: Request, res: Response) => {
    try {
      const meta = await buildMetadata();
      const data = await loadLessonData();
      let questionCount = 0;
      for (const lesson of Object.values(data)) {
        const l = lesson as any;
        if (Array.isArray(l.quiz)) questionCount += l.quiz.length;
        if (Array.isArray(l.preTest)) questionCount += l.preTest.length;
        if (Array.isArray(l.postTest)) questionCount += l.postTest.length;
      }
      res.setHeader("Cache-Control", "public, max-age=300");
      res.json({ lessons: meta.length, questions: questionCount });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to count" });
    }
  });
}

export function isPlaceholder(lesson: any): boolean {
  const content = lesson.cellular?.content || "";
  if (content.includes("[WRITE YOUR") || content.includes("[PLACEHOLDER") || content.length < 20) return true;
  const genericRiskFactors = [
    "Advanced age or extremes of age",
    "Family history of",
    "Sedentary lifestyle and poor nutritional status",
    "Chronic comorbidities (hypertension, diabetes, obesity)",
    "Tobacco, alcohol, or substance use",
    "Immunocompromised state or prolonged medication use",
  ];
  const rf = lesson.riskFactors || [];
  const genericRfCount = rf.filter((r: string) => genericRiskFactors.some((g: string) => r.startsWith(g) || r.includes(g))).length;
  if (genericRfCount >= 3) return true;
  const genericNursingActions = [
    "Monitor vital signs",
    "Administer medications as prescribed",
    "Educate patient and family",
    "Maintain accurate intake and output",
    "Document assessment findings",
  ];
  const na = lesson.nursingActions || [];
  const genericNaCount = na.filter((n: string) => genericNursingActions.some((g: string) => n.startsWith(g))).length;
  if (genericNaCount >= 3 && na.length <= 6) return true;
  return false;
}

export function classifyLessonStatus(lesson: any): "complete" | "placeholder" | "weak" | "broken" {
  if (!lesson || !lesson.title) return "broken";
  if (isPlaceholder(lesson)) return "placeholder";
  const cellularLen = lesson.cellular?.content?.length || 0;
  const rfCount = lesson.riskFactors?.length || 0;
  const diagCount = lesson.diagnostics?.length || 0;
  const mgmtCount = lesson.management?.length || 0;
  const naCount = lesson.nursingActions?.length || 0;
  const assessmentCount = lesson.assessmentFindings?.length || 0;
  const medCount = lesson.medications?.length || 0;
  const pearlCount = lesson.pearls?.length || 0;
  const quizCount = lesson.quiz?.length || 0;
  const signsLeft = lesson.signs?.left?.length || 0;
  const signsRight = lesson.signs?.right?.length || 0;
  const hasSeo = !!(lesson.seo?.title && lesson.seo?.description);
  let score = 0;
  if (cellularLen > 200) score++;
  if (rfCount >= 3) score++;
  if (diagCount >= 3) score++;
  if (mgmtCount >= 3) score++;
  if (naCount >= 3) score++;
  if (assessmentCount >= 1) score++;
  if (medCount >= 1) score++;
  if (pearlCount >= 1) score++;
  if (quizCount >= 1) score++;
  if (signsLeft >= 1 || signsRight >= 1) score++;
  if (hasSeo) score++;
  if (score >= 7) return "complete";
  return "weak";
}
