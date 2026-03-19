import type { Request, Response, Express, NextFunction } from "express";
import { pool } from "./storage";

interface LiteConfig {
  active: boolean;
  activatedAt: number | null;
  activatedBy: string | null;
  reason: string | null;
  autoActivated: boolean;
  healthCheckFailCount: number;
  lastHealthCheck: number | null;
}

interface LitePayload {
  type: string;
  id: string;
  title: string;
  content: any;
  tier: string;
  updatedAt: number;
}

const liteConfig: LiteConfig = {
  active: false,
  activatedAt: null,
  activatedBy: null,
  reason: null,
  autoActivated: false,
  healthCheckFailCount: 0,
  lastHealthCheck: null,
};

const prebuiltPayloads = new Map<string, LitePayload[]>();
let lastPayloadBuild: number | null = null;

const LITE_LESSONS: LitePayload[] = [
  {
    type: "lesson",
    id: "lite-pharmacology-basics",
    title: "Pharmacology Basics",
    content: {
      sections: [
        { title: "Drug Classifications", body: "Drugs are classified by their mechanism of action, therapeutic use, and chemical structure. Major classes include analgesics, antibiotics, antihypertensives, and antidiabetics." },
        { title: "Pharmacokinetics", body: "Pharmacokinetics describes how the body processes drugs: Absorption, Distribution, Metabolism, and Excretion (ADME). Understanding these processes is essential for safe medication administration." },
        { title: "Nursing Considerations", body: "Always verify the 10 Rights of medication administration: right patient, right drug, right dose, right route, right time, right documentation, right reason, right response, right to refuse, right education." },
      ],
    },
    tier: "free",
    updatedAt: Date.now(),
  },
  {
    type: "lesson",
    id: "lite-vital-signs",
    title: "Vital Signs Assessment",
    content: {
      sections: [
        { title: "Temperature", body: "Normal: 36.1-37.2°C (97-99°F). Measure oral, axillary, tympanic, or rectal. Rectal is most accurate but most invasive." },
        { title: "Blood Pressure", body: "Normal adult: <120/80 mmHg. Hypertension Stage 1: 130-139/80-89. Stage 2: ≥140/≥90. Always compare with baseline." },
        { title: "Heart Rate & Respiratory Rate", body: "Normal HR: 60-100 bpm. Normal RR: 12-20 breaths/min. Note rhythm regularity and quality." },
      ],
    },
    tier: "free",
    updatedAt: Date.now(),
  },
  {
    type: "lesson",
    id: "lite-infection-control",
    title: "Infection Control",
    content: {
      sections: [
        { title: "Chain of Infection", body: "Infectious agent → Reservoir → Portal of exit → Mode of transmission → Portal of entry → Susceptible host. Break any link to prevent spread." },
        { title: "Standard Precautions", body: "Hand hygiene, PPE, respiratory hygiene, safe injection practices, sterile technique for invasive procedures." },
        { title: "Isolation Precautions", body: "Contact (gown + gloves), Droplet (surgical mask), Airborne (N95 + negative pressure room)." },
      ],
    },
    tier: "free",
    updatedAt: Date.now(),
  },
];

const LITE_FLASHCARDS: LitePayload[] = [
  {
    type: "flashcard",
    id: "lite-fc-pharmacology",
    title: "Pharmacology Quick Review",
    content: {
      cards: [
        { front: "What are the 10 Rights of medication administration?", back: "Right patient, drug, dose, route, time, documentation, reason, response, to refuse, education" },
        { front: "What is the therapeutic range?", back: "The concentration range at which a drug is effective without causing toxicity" },
        { front: "What does 'half-life' mean?", back: "The time it takes for the plasma concentration of a drug to decrease by 50%" },
        { front: "What are common signs of drug toxicity?", back: "Nausea, vomiting, confusion, tinnitus, vision changes, bradycardia (varies by drug)" },
        { front: "What is an adverse drug reaction (ADR)?", back: "An unintended, harmful response to a medication taken at normal therapeutic doses" },
      ],
    },
    tier: "free",
    updatedAt: Date.now(),
  },
  {
    type: "flashcard",
    id: "lite-fc-vital-signs",
    title: "Vital Signs Quick Review",
    content: {
      cards: [
        { front: "Normal adult blood pressure?", back: "Less than 120/80 mmHg" },
        { front: "Normal adult heart rate?", back: "60-100 beats per minute" },
        { front: "Normal respiratory rate for adults?", back: "12-20 breaths per minute" },
        { front: "Normal oral temperature range?", back: "36.1-37.2°C (97-99°F)" },
        { front: "What is orthostatic hypotension?", back: "A drop of ≥20 mmHg systolic or ≥10 mmHg diastolic when standing from sitting/lying" },
      ],
    },
    tier: "free",
    updatedAt: Date.now(),
  },
];

const LITE_EXAMS: LitePayload[] = [
  {
    type: "exam",
    id: "lite-exam-fundamentals",
    title: "Fundamentals Practice (Lite)",
    content: {
      questions: [
        {
          stem: "A nurse is preparing to administer medication to a patient. Which action should the nurse take FIRST?",
          options: ["Check the medication order", "Prepare the medication", "Identify the patient", "Document the administration"],
          correctIndex: 0,
          rationale: "The nurse should first check the medication order to verify the prescription before any other step.",
        },
        {
          stem: "Which vital sign change should the nurse report IMMEDIATELY?",
          options: ["Temperature 37.0°C", "Heart rate 82 bpm", "Respiratory rate 28 breaths/min", "Blood pressure 118/76 mmHg"],
          correctIndex: 2,
          rationale: "A respiratory rate of 28 is above normal range (12-20) and may indicate respiratory distress requiring immediate attention.",
        },
        {
          stem: "A patient on contact precautions requires which PPE upon entering the room?",
          options: ["N95 respirator only", "Gown and gloves", "Surgical mask only", "Gown, gloves, and N95"],
          correctIndex: 1,
          rationale: "Contact precautions require gown and gloves. N95 is for airborne precautions.",
        },
        {
          stem: "Which nursing action best prevents hospital-acquired infections?",
          options: ["Wearing gloves at all times", "Hand hygiene before and after patient contact", "Isolating all patients", "Administering prophylactic antibiotics"],
          correctIndex: 1,
          rationale: "Hand hygiene is the single most effective measure to prevent healthcare-associated infections.",
        },
        {
          stem: "A patient's blood pressure is 158/98 mmHg. How should the nurse classify this reading?",
          options: ["Normal", "Elevated", "Hypertension Stage 1", "Hypertension Stage 2"],
          correctIndex: 3,
          rationale: "Blood pressure ≥140/≥90 mmHg is classified as Hypertension Stage 2 per AHA guidelines.",
        },
      ],
    },
    tier: "free",
    updatedAt: Date.now(),
  },
];

function initPrebuiltPayloads(): void {
  prebuiltPayloads.set("lessons", LITE_LESSONS);
  prebuiltPayloads.set("flashcards", LITE_FLASHCARDS);
  prebuiltPayloads.set("exams", LITE_EXAMS);
  lastPayloadBuild = Date.now();
}

function ensurePayloadsLoaded(): void {
  if (lastPayloadBuild === null) {
    initPrebuiltPayloads();
  }
}

async function buildPayloadsFromDb(): Promise<{ lessons: number; flashcards: number; exams: number }> {
  const counts = { lessons: 0, flashcards: 0, exams: 0 };
  try {
    const lessonResult = await pool.query(
      `SELECT id, title, slug, content, tier FROM content_items WHERE status = 'published' AND type = 'lesson' ORDER BY created_at DESC LIMIT 10`
    );
    if (lessonResult.rows.length > 0) {
      const dbLessons: LitePayload[] = lessonResult.rows.map((r: any) => ({
        type: "lesson",
        id: `lite-db-${r.id}`,
        title: r.title,
        content: r.content || { sections: [{ title: r.title, body: "Content available in lite mode." }] },
        tier: r.tier || "free",
        updatedAt: Date.now(),
      }));
      prebuiltPayloads.set("lessons", [...LITE_LESSONS, ...dbLessons]);
      counts.lessons = dbLessons.length;
    }
  } catch (e: any) {
    console.error("[NurseNestLite] Failed to build lesson payloads:", e.message);
  }
  lastPayloadBuild = Date.now();
  return counts;
}

function isEntitled(userTier: string | null, contentTier: string): boolean {
  if (!contentTier || contentTier === "free") return true;
  if (!userTier || userTier === "free") return false;
  if (userTier === "admin" || userTier === "full_access") return true;
  if (contentTier === "new_grad_toolkit") {
    return ["new_grad_toolkit", "certification_prep", "full_access"].includes(userTier);
  }
  if (contentTier === "certification_prep") {
    return ["certification_prep", "full_access"].includes(userTier);
  }
  return userTier === contentTier;
}

async function resolveAdmin(req: Request, res: Response): Promise<any | null> {
  try {
    const { resolveAuthUser } = await import("./admin-auth");
    const user = await resolveAuthUser(req as any);
    if (!user || user.tier !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return null;
    }
    return user;
  } catch {
    res.status(403).json({ error: "Authentication failed" });
    return null;
  }
}

export function isLiteModeActive(): boolean {
  return liteConfig.active;
}

export function getLiteConfig(): LiteConfig {
  return { ...liteConfig };
}

export function activateLiteMode(reason: string, activatedBy: string | null, auto: boolean = false): void {
  liteConfig.active = true;
  liteConfig.activatedAt = Date.now();
  liteConfig.activatedBy = activatedBy;
  liteConfig.reason = reason;
  liteConfig.autoActivated = auto;
  console.log(`[NurseNestLite] ACTIVATED - Reason: ${reason}, By: ${activatedBy || "auto"}`);
}

export function deactivateLiteMode(): void {
  liteConfig.active = false;
  liteConfig.activatedAt = null;
  liteConfig.activatedBy = null;
  liteConfig.reason = null;
  liteConfig.autoActivated = false;
  liteConfig.healthCheckFailCount = 0;
  console.log("[NurseNestLite] DEACTIVATED");
}

export function liteModeFallbackMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!liteConfig.active) return next();

    if (req.path.startsWith("/api/lite/")) return next();
    if (req.path.startsWith("/api/admin/")) return next();
    if (req.path === "/healthz") return next();
    if (req.path === "/api/kill-switches") return next();

    if (req.path.startsWith("/api/")) {
      const liteRoutes: Record<string, string> = {
        "/api/lessons": "/api/lite/lessons",
        "/api/flashcards": "/api/lite/flashcards",
        "/api/exams": "/api/lite/exams",
        "/api/mock-exams": "/api/lite/exams",
      };

      for (const [pattern, liteRoute] of Object.entries(liteRoutes)) {
        if (req.path.startsWith(pattern)) {
          return res.json({
            _lite: true,
            _message: "NurseNest is running in Lite mode. Core study features are available with limited functionality.",
            _redirectTo: liteRoute,
          });
        }
      }
    }

    next();
  };
}

export function registerLiteModeRoutes(app: Express): void {
  app.get("/api/lite/status", (_req: Request, res: Response) => {
    ensurePayloadsLoaded();
    res.json({
      active: liteConfig.active,
      activatedAt: liteConfig.activatedAt,
      reason: liteConfig.reason,
      autoActivated: liteConfig.autoActivated,
      payloadTypes: Array.from(prebuiltPayloads.keys()),
      lastPayloadBuild,
      timestamp: Date.now(),
    });
  });

  app.get("/api/lite/lessons", (_req: Request, res: Response) => {
    ensurePayloadsLoaded();
    const lessons = prebuiltPayloads.get("lessons") || [];
    const userTier = "free";
    const accessible = lessons.filter(l => isEntitled(userTier, l.tier));
    res.json({
      _lite: true,
      lessons: accessible.map(l => ({ id: l.id, title: l.title, tier: l.tier })),
      total: accessible.length,
    });
  });

  app.get("/api/lite/lessons/:id", (_req: Request, res: Response) => {
    ensurePayloadsLoaded();
    const lessons = prebuiltPayloads.get("lessons") || [];
    const lesson = lessons.find(l => l.id === _req.params.id);
    if (!lesson) return res.status(404).json({ _lite: true, error: "Lesson not found" });
    res.json({ _lite: true, lesson });
  });

  app.get("/api/lite/flashcards", (_req: Request, res: Response) => {
    ensurePayloadsLoaded();
    const flashcards = prebuiltPayloads.get("flashcards") || [];
    const userTier = "free";
    const accessible = flashcards.filter(f => isEntitled(userTier, f.tier));
    res.json({
      _lite: true,
      flashcards: accessible.map(f => ({ id: f.id, title: f.title, tier: f.tier, cardCount: f.content?.cards?.length || 0 })),
      total: accessible.length,
    });
  });

  app.get("/api/lite/flashcards/:id", (_req: Request, res: Response) => {
    ensurePayloadsLoaded();
    const flashcards = prebuiltPayloads.get("flashcards") || [];
    const deck = flashcards.find(f => f.id === _req.params.id);
    if (!deck) return res.status(404).json({ _lite: true, error: "Flashcard deck not found" });
    res.json({ _lite: true, flashcard: deck });
  });

  app.get("/api/lite/exams", (_req: Request, res: Response) => {
    ensurePayloadsLoaded();
    const exams = prebuiltPayloads.get("exams") || [];
    const userTier = "free";
    const accessible = exams.filter(e => isEntitled(userTier, e.tier));
    res.json({
      _lite: true,
      exams: accessible.map(e => ({
        id: e.id,
        title: e.title,
        tier: e.tier,
        questionCount: e.content?.questions?.length || 0,
      })),
      total: accessible.length,
    });
  });

  app.get("/api/lite/exams/:id", (_req: Request, res: Response) => {
    ensurePayloadsLoaded();
    const exams = prebuiltPayloads.get("exams") || [];
    const exam = exams.find(e => e.id === _req.params.id);
    if (!exam) return res.status(404).json({ _lite: true, error: "Exam not found" });
    res.json({ _lite: true, exam });
  });

  app.get("/api/admin/lite/status", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    ensurePayloadsLoaded();
    const payloadStats: Record<string, number> = {};
    for (const [type, payloads] of prebuiltPayloads) {
      payloadStats[type] = payloads.length;
    }

    res.json({
      config: liteConfig,
      payloadStats,
      lastPayloadBuild,
      timestamp: Date.now(),
    });
  });

  app.post("/api/admin/lite/activate", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const { reason } = req.body;
    activateLiteMode(reason || "Manual activation", admin.username || admin.id, false);

    res.json({ success: true, config: liteConfig, timestamp: Date.now() });
  });

  app.post("/api/admin/lite/deactivate", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    deactivateLiteMode();

    res.json({ success: true, config: liteConfig, timestamp: Date.now() });
  });

  app.post("/api/admin/lite/rebuild-payloads", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const counts = await buildPayloadsFromDb();
    res.json({ success: true, counts, lastPayloadBuild, timestamp: Date.now() });
  });
}
