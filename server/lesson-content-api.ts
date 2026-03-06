import type { Express, Request, Response } from "express";

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
};

let lessonData: Record<string, any> | null = null;
let metadataCache: LessonMeta[] | null = null;

async function loadLessonData(): Promise<Record<string, any>> {
  if (lessonData) return lessonData;
  const mod = await import("../client/src/data/lessons/index");
  lessonData = mod.contentMap;
  return lessonData!;
}

function deriveTier(id: string): string {
  if (id.endsWith("-np") || id.endsWith("-advanced-np") || id.endsWith("-management-np")) return "np";
  if (id.endsWith("-rn") || id.endsWith("-basics-rn")) return "rn";
  if (id.endsWith("-rpn") || id.endsWith("-basics-rpn")) return "rpn";
  return "general";
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
  metadataCache = Object.entries(data).map(([id, lesson]: [string, any]) => ({
    id,
    title: typeof lesson.title === "object" ? (lesson.title.en || lesson.title) : (lesson.title || id),
    tier: deriveTier(id),
    category: deriveCategory(lesson),
    hasQuiz: Array.isArray(lesson.quiz) && lesson.quiz.length > 0,
    hasPreTest: Array.isArray(lesson.preTest) && lesson.preTest.length > 0,
    hasPostTest: Array.isArray(lesson.postTest) && lesson.postTest.length > 0,
    medCount: Array.isArray(lesson.medications) ? lesson.medications.length : 0,
    image: lesson.image,
  }));
  return metadataCache;
}

export function setupLessonContentRoutes(app: Express): void {
  app.get("/api/lessons/meta", async (_req: Request, res: Response) => {
    try {
      const meta = await buildMetadata();
      res.setHeader("Cache-Control", "public, max-age=300");
      res.json(meta);
    } catch (err: any) {
      console.error("[LessonAPI] meta error:", err.message);
      res.status(500).json({ error: "Failed to load lesson metadata" });
    }
  });

  app.get("/api/lessons/content/:slug", async (req: Request, res: Response) => {
    try {
      const data = await loadLessonData();
      const slug = req.params.slug;
      const lesson = data[slug];
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.setHeader("Cache-Control", "public, max-age=300");
      res.json({ id: slug, ...lesson });
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
      const meta = await buildMetadata();
      const results = meta
        .filter((m) => m.title.toLowerCase().includes(q) || m.id.toLowerCase().includes(q))
        .slice(0, 20);
      res.setHeader("Cache-Control", "public, max-age=60");
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
