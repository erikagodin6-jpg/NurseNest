import type { Express, Request } from "express";
import type { Server } from "http";
import { sql } from "drizzle-orm";
import { storage, DatabaseStorage, pool } from "./storage";

function parseStoragePath(path: string): { bucketName: string; objectName: string } {
  if (!path.startsWith("/")) path = `/${path}`;
  const parts = path.split("/");
  if (parts.length < 3) throw new Error("Invalid storage path");
  return { bucketName: parts[1], objectName: parts.slice(2).join("/") };
}

function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj === null || typeof obj !== "object") return obj;
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = value;
  }
  return result;
}
import {
  insertNoteSchema,
  insertTestResultSchema,
  insertUserProgressSchema,
  insertUserSchema,
  insertContentItemSchema,
  insertAuditLogSchema,
  insertContentRevisionSchema,
  insertExamBlueprintSchema,
} from "@shared/schema";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault, isPaypalConfigured } from "./paypal";
import { generateBlogPost, runBlogScheduler, expandAllShortPosts } from "./blog-automation";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import { regionMiddleware, getEffectiveRegion, isRegionAllowed, getDefaultRegionScope, canChangeRegionScope, buildRegionFilter, type Region, type RegionScope } from "./region";
import { languageMiddleware, getTranslatedFields, getTranslationStatus, getBulkTranslatedTitles, getAvailableLanguages, simpleHash } from "./translation-helpers";
import { checkAiLimits, recordAiUsage, getAiConfig, setAiConfig } from "./ai-safety";

async function requireAdmin(req: any, res: any) {
  const username = String(req.body?.username || req.query?.username || "");
  const password = String(req.body?.password || req.query?.password || "");

  if (username && password) {
    const user = await storage.getUserByUsername(username);
    if (user && user.password === password && user.tier === "admin") {
      return user;
    }
  }

  const adminId = String(req.headers?.["x-admin-id"] || req.body?.adminId || req.query?.adminId || "");
  if (adminId) {
    const user = await storage.getUser(adminId);
    if (user && user.tier === "admin") {
      return user;
    }
  }

  res.status(401).json({ error: "Authentication required" });
  return null;
}

async function logAudit(req: any, actor: any, entityType: string, entityId: string | null, action: string, beforeJson?: any, afterJson?: any) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, before_json, after_json, ip_address, user_agent, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
      [actor?.id || null, actor?.username || null, entityType, entityId, action,
       beforeJson ? JSON.stringify(beforeJson) : null, afterJson ? JSON.stringify(afterJson) : null,
       req.ip || req.headers?.["x-forwarded-for"] || null, req.headers?.["user-agent"] || null]
    );
  } catch (e) {
    console.error("Audit log error:", e);
  }
}

async function saveRevision(contentId: string, existingItem: any, editor: any) {
  try {
    const countResult = await pool.query(`SELECT COUNT(*) as cnt FROM content_revisions WHERE content_id = $1`, [contentId]);
    const revNum = parseInt(countResult.rows[0]?.cnt || "0") + 1;
    await pool.query(
      `INSERT INTO content_revisions (id, content_id, revision_number, title, content, status, edited_by, edited_by_username, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW())`,
      [contentId, revNum, existingItem.title, JSON.stringify(existingItem.content), existingItem.status, editor?.id || null, editor?.username || null]
    );
    const oldRevisions = await pool.query(
      `SELECT id FROM content_revisions WHERE content_id = $1 ORDER BY revision_number DESC OFFSET 10`,
      [contentId]
    );
    if (oldRevisions.rows.length > 0) {
      const ids = oldRevisions.rows.map((r: any) => r.id);
      await pool.query(`DELETE FROM content_revisions WHERE id = ANY($1)`, [ids]);
    }
  } catch (e) {
    console.error("Save revision error:", e);
  }
}

function canAccessTier(userTier: string | null | undefined, targetTier: string): boolean {
  if (!targetTier || targetTier === "free") return true;
  if (!userTier || userTier === "free") return false;
  if (userTier === "admin") return true;
  return userTier === targetTier;
}

async function extractUserTier(req: Request): Promise<string | null> {
  const username = req.query.username as string | undefined;
  const password = req.query.password as string | undefined;
  if (username && password) {
    const user = await storage.getUserByUsername(username);
    if (user && user.password === password) {
      return user.tier || "free";
    }
  }
  return null;
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  registerObjectStorageRoutes(app);

  app.use(regionMiddleware);
  app.use(languageMiddleware);

  app.get("/api/region", (req, res) => {
    const region = req.region || "US";
    res.json({ region });
  });

  let heroStatsCache: { data: any; timestamp: number } | null = null;
  const HERO_CACHE_TTL = 10 * 60 * 1000;

  app.get("/api/hero-stats", async (_req, res) => {
    try {
      if (heroStatsCache && Date.now() - heroStatsCache.timestamp < HERO_CACHE_TTL) {
        return res.json(heroStatsCache.data);
      }

      const { tierCounts } = await import("@shared/tier-counts");

      const dbResult = await pool.query(`
        SELECT
          COALESCE(SUM(CASE WHEN tier = 'rpn' THEN 1 ELSE 0 END), 0) AS rpn_db,
          COALESCE(SUM(CASE WHEN tier = 'rn' THEN 1 ELSE 0 END), 0) AS rn_db,
          COALESCE(SUM(CASE WHEN tier = 'np' THEN 1 ELSE 0 END), 0) AS np_db,
          COALESCE(SUM(CASE WHEN tier = 'free' OR tier IS NULL THEN 1 ELSE 0 END), 0) AS free_db,
          COUNT(*) AS total_db
        FROM content_items WHERE status = 'published'
      `);

      const db = dbResult.rows[0] || { rpn_db: 0, rn_db: 0, np_db: 0, free_db: 0, total_db: 0 };

      const rpnLessons = tierCounts.rpn + Number(db.rpn_db);
      const rnLessons = tierCounts.rn + Number(db.rn_db);
      const npLessons = tierCounts.np + Number(db.np_db);
      const freeLessons = tierCounts.free + Number(db.free_db);
      const totalLessons = rpnLessons + rnLessons + npLessons + freeLessons;
      const paidLessons = rpnLessons + rnLessons + npLessons;

      const stats = {
        rpnLessons,
        rnLessons,
        npLessons,
        freeLessons,
        totalLessons,
        paidLessons,
        questionCount: tierCounts.questionCount,
        lastUpdatedISO: new Date().toISOString(),
        breakdown: {
          rpnStatic: tierCounts.rpn,
          rnStatic: tierCounts.rn,
          npStatic: tierCounts.np,
          freeStatic: tierCounts.free,
          rpnDb: Number(db.rpn_db),
          rnDb: Number(db.rn_db),
          npDb: Number(db.np_db),
          freeDb: Number(db.free_db),
        },
      };

      heroStatsCache = { data: stats, timestamp: Date.now() };
      res.json(stats);
    } catch (error: any) {
      console.error("Hero stats error:", error);
      res.status(500).json({ error: "Failed to compute stats" });
    }
  });

  app.post("/api/admin/invalidate-hero-cache", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    heroStatsCache = null;
    res.json({ ok: true });
  });

  // --------------------
  // AI Content Generation (admin-only)
  // --------------------
  app.post("/api/ai/generate-content", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { prompt, context, mode, contentId, examTarget } = req.body;
      if (!prompt) return res.status(400).json({ error: "Prompt is required" });

      if (contentId) {
        const existing = await storage.getContentItem(contentId);
        if (existing) {
          const region = req.region || "US";
          if (!isRegionAllowed(existing.regionScope, region)) {
            await logAudit(req, admin, "ai", contentId, "region-blocked", null, { reason: "Cross-region AI edit rejected", itemRegion: existing.regionScope, requestRegion: region });
            return res.status(403).json({ error: "Cannot edit content outside this domain's region scope" });
          }
          const protectedFields = existing.protectedFields || [];
          if (protectedFields.length > 0) {
            const promptLower = (prompt as string).toLowerCase();
            const fieldsAtRisk = protectedFields.filter((f: string) => {
              const fLower = f.toLowerCase();
              return promptLower.includes(fLower) || (fLower === "exam-names" && /\b(nclex|rex-pn|aanp|ancc)\b/i.test(prompt)) || (fLower === "lab-values" && /\b(lab|mmol|meq|mg\/dl|µmol)\b/i.test(prompt));
            });
            if (fieldsAtRisk.length > 0) {
              await logAudit(req, admin, "ai", contentId, "protected-field-blocked", null, { reason: "AI attempted to modify protected fields", fields: fieldsAtRisk, prompt: prompt.substring(0, 200) });
              return res.status(403).json({ error: `Cannot modify protected fields: ${fieldsAtRisk.join(", ")}. Remove these from the prompt or unprotect the fields first.` });
            }
          }
        }
      }

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const systemPrompts: Record<string, string> = {
        "guided": `You are a clinical content engine for NurseNest producing exam-grade nursing content at Saunders/UWorld commercial quality. Generate content as a VALID JSON object. Follow the user's structural instructions exactly. Return ONLY the JSON -- no markdown, no code fences, no explanation.

QUALITY IMPERATIVES:
- Return exactly the JSON structure the user's prompt specifies
- Use the block types the user requests (kind: heading, paragraph, bullets, table, callout)
- Every section MUST have at least 7-12 blocks of substantive content
- Every paragraph must contain at least ONE specific clinical fact (lab value, drug dose, vital sign threshold, or physiological measurement)
- NEVER write filler: "is a condition that", "refers to", "is defined as", "involves the", "is important because" are BANNED
- Lead every topic with clinical significance and exam relevance, not definitions
- Bullet lists must have 4-8 items each with substantive clinical detail
- Tables must contain REAL clinical data (actual drug names with doses, actual lab ranges, actual assessment findings)
- Callout titles must be specific and clinical (e.g. "Peaked T-Waves Signal K+ > 6.0 mEq/L" not "Clinical Pearl")
- Include at least 1 comparison/differential table per section
- Include "If you see X, think Y" clinical decision cues
- Include specific drug doses, onset/peak/duration, and contraindications
- Content depth: cellular/molecular pathophysiology, evidence-based interventions sequenced by priority, exact lab critical values with nursing actions
- Do NOT wrap the output in code fences or markdown`,

        "generate": `You are a clinical content engine for NurseNest, writing at Saunders/UWorld depth. Generate exam-grade nursing content with professional-level specificity. Every paragraph must contain specific clinical facts (lab values, drug doses, thresholds). NEVER write filler like "is a condition that" or "refers to". Lead with clinical significance and exam relevance. Return ONLY valid JSON array of content blocks:
[{"type":"heading","content":"Section Title"},{"type":"paragraph","content":"Specific clinical content with values..."},{"type":"list","content":"Item 1 with detail\\nItem 2 with detail"},{"type":"clinical-pearl","content":"Specific exam-tested fact with clinical values..."},{"type":"warning","content":"Critical safety alert with specific parameters..."},{"type":"callout","content":"Decision cue: If you see X, think Y, do Z..."}]
Valid types: heading, paragraph, list, clinical-pearl, warning, callout, medication, quiz-question, flashcard, references.
Include: pathophysiology at cellular level, drug MOA with doses/onset/peak/duration, exact lab ranges with critical values and nursing actions, specific assessment findings, and prioritized intervention sequences with rationale.`,

        "improve": `You are a clinical content editor for NurseNest. Upgrade content from textbook level to professional exam-prep quality (Saunders/UWorld standard). Add specific lab values, drug doses with onset/peak/duration, clinical thresholds, and decision algorithms. Replace every generic statement ("monitor the patient") with specific actions ("monitor BP q15min, target MAP > 65 mmHg"). Remove filler. Return ONLY valid JSON array of content blocks in the same format as the input.`,

        "expand": `You are a clinical depth specialist for NurseNest. Expand content with professional-grade specifics: cellular/molecular pathophysiology with compensatory mechanisms, drug MOA with key doses and onset/peak/duration, exact lab ranges with critical values and nursing actions, specific physical assessment findings with clinical significance, and evidence-based intervention sequences with rationale for priority ordering. Every added sentence must contain a concrete clinical fact. Return ONLY valid JSON array of content blocks.`,

        "simplify": `You are a nursing education writer for NurseNest. Simplify content for accessibility while KEEPING all specific clinical values (lab ranges, drug doses, vital sign thresholds, time windows). Use plain language and analogies but never remove the specific numbers and facts that make content exam-grade. Return ONLY valid JSON array of content blocks.`,

        "quiz": `You are a senior NCLEX item writer for NurseNest. Generate professional-quality exam questions that test clinical judgment, not memorization. Return ONLY valid JSON array:
[{"type":"quiz-question","content":"Q: [Clinical scenario with specific patient findings, vitals, and labs]\\nA) [Plausible nursing action]\\nB) [Plausible nursing action]\\nC) [Correct nursing action]\\nD) [Plausible nursing action]\\nCorrect: C\\nRationale: C is correct because [specific clinical reasoning with evidence]. A is wrong because [specific reason]. B is wrong because [specific reason]. D is wrong because [specific reason]."}]
RULES: Focus on priority/delegation/safety. Include specific values in stems (K+ 6.2, HR 112, BP 88/54). All 4 options must be plausible nursing actions. Rationales must explain ALL options. Include at least 1 SATA-format question.`,

        "bundle": `You are a premium nursing exam product creator for NurseNest, producing content at Saunders/UWorld commercial quality. Generate a COMPLETE sellable study bundle. Return ONLY valid JSON object (NOT an array) with this exact structure:
{
  "pages": [
    { "title": "Section Title", "objects": [{"type":"heading","content":"..."},{"type":"paragraph","content":"Specific clinical content with lab values, drug doses..."},{"type":"list","content":"Specific item 1\\nSpecific item 2"},{"type":"clinical-pearl","content":"Exam-tested fact with clinical values..."},{"type":"warning","content":"Safety alert with specific parameters..."}] }
  ],
  "flashcards": [
    { "front": "Clinical question with specific scenario", "back": "Answer with specific values and rationale" }
  ],
  "qbank": [
    { "stem": "Clinical scenario with specific patient data...", "options": ["A) Plausible action", "B) Plausible action", "C) Correct action", "D) Plausible action"], "correctAnswer": "C", "rationale": "C is correct because [specific reasoning]. A is wrong because [reason]. B is wrong because [reason]. D is wrong because [reason]." }
  ],
  "listing": {
    "title": "Product title for marketplace",
    "description": "SEO product description highlighting clinical depth and exam specificity",
    "bullets": ["Specific feature with clinical value", "Feature 2", "Feature 3", "Feature 4"]
  }
}
Generate 3-5 content pages (5-10 blocks each with SPECIFIC clinical facts in every block), 15-20 flashcards (with clinical scenarios, not just definitions), 10-15 exam questions (testing clinical judgment with rationales for ALL options), and a compelling listing. NEVER use filler or generic statements.`,

        "bundle-chapter": `You are an expert clinical content writer for NurseNest producing exam-prep content at Saunders/UWorld commercial quality. Generate ONE detailed chapter for a nursing cram guide. Return ONLY valid JSON object:
{
  "title": "Chapter Title",
  "objects": [
    {"type":"heading","content":"Clinical topic heading"},
    {"type":"paragraph","content":"2-3 sentences with specific pathophysiology at cellular/molecular level, including compensatory mechanisms..."},
    {"type":"list","content":"Assessment finding 1 with clinical significance\\nFinding 2 with threshold values\\nFinding 3 with associated labs"},
    {"type":"clinical-pearl","content":"Specific exam-tested fact: e.g. 'Troponin I rises 4-6h post-MI, peaks at 12-24h. If negative at 6h, repeat at 12h before ruling out ACS.'"},
    {"type":"paragraph","content":"Drug MOA with specific doses, onset, peak, duration, and key nursing considerations..."},
    {"type":"warning","content":"Red flag with specific parameters: e.g. 'K+ > 6.5 mEq/L with peaked T-waves = STAT IV calcium gluconate 1g over 10 min. Hold all K+-sparing drugs.'"},
    {"type":"list","content":"Priority action 1 with rationale\\nAction 2\\nAction 3 - explain WHY this order"},
    {"type":"callout","content":"Decision cue: If you see [specific finding], think [condition], do [specific action with parameters]..."}
  ]
}
CRITICAL RULES:
- Generate at MINIMUM 15-25 content blocks per chapter
- Every paragraph must contain at least ONE specific clinical fact (lab value, drug dose, vital sign threshold, time window)
- NEVER write filler ("is a condition that", "refers to", "is important because"). Lead with the clinical fact.
- Lists must have 4-8 items each with substantive clinical detail (not single words)
- Include at least 2 clinical-pearls with SPECIFIC exam-tested facts and 2 warnings with SPECIFIC clinical parameters
- Cover: pathophysiology (cellular level), assessment with exact findings, drug management with doses, prioritized interventions with rationale, and exam-specific decision cues
- Include "If you see X, think Y" clinical reasoning statements
- Include at least one comparison (differential diagnosis or similar conditions)`,
      };

      const systemPrompt = systemPrompts[mode] || systemPrompts["generate"];
      const region = req.region || "US";

      const examTargetNotes: Record<string, string> = {
        "rex-pn": "\nEXAM CONTEXT: REX-PN (Regulatory Exam – Practical Nurse, Canada). Use CANADIAN terminology: RPN (Registered Practical Nurse), CNO (College of Nurses of Ontario), SI units (mmol/L, µmol/L, g/L), temperatures in °C, weights in kg. Focus on patient safety priority framework, RPN scope of practice, CAT-based exam strategies. Emphasize safe medication administration, infection prevention (IPAC), harm reduction, and delegation FROM RN to RPN.",
        "nclex-pn": "\nEXAM CONTEXT: NCLEX-PN (National Council Licensure Examination – Practical Nurse, US). Use AMERICAN terminology: LPN/LVN, State Board of Nursing, conventional units (mEq/L, mg/dL, g/dL), temperatures in °F, weights in lbs. Focus on ABCs framework, Maslow's hierarchy, safety/infection control, nursing process. Emphasize SATA questions, prioritization, stable patient assignments, and LPN/LVN scope under RN supervision.",
        "nclex-rn": "\nEXAM CONTEXT: NCLEX-RN (National Council Licensure Examination – Registered Nurse). Use NCSBN terminology and Clinical Judgment Measurement Model (CJMM). Include Next Generation NCLEX (NGN) question types: extended drag-and-drop, cloze, enhanced hotspot, matrix/grid, trend items, bowtie, case studies. Focus on clinical judgment, evidence-based practice, full RN scope including IV therapy, delegation to LPN/UAP, patient education, and discharge planning. Use conventional units (mEq/L, mg/dL, °F).",
        "np": "\nEXAM CONTEXT: NP Certification (AANP/ANCC). Content must be at advanced practice level. Focus on differential diagnosis, evidence-based prescribing, advanced health assessment, pharmacological mechanisms, treatment planning, and autonomous/collaborative practice models. Include DEA prescriptive authority considerations, referral criteria, and NP-specific clinical decision-making frameworks."
      };

      const regionNote = examTarget && examTargetNotes[examTarget]
        ? examTargetNotes[examTarget]
        : region === "CA"
          ? "\nIMPORTANT: This is for the CANADIAN nursing audience. Use Canadian terminology: RPN (Registered Practical Nurse), REX-PN exam, CNO (College of Nurses of Ontario), SI units for lab values (mmol/L, µmol/L, g/L), temperatures in °C."
          : "\nIMPORTANT: This is for the AMERICAN nursing audience. Use American terminology: LPN/LVN, NCLEX-PN exam, State Board of Nursing, conventional units for lab values (mEq/L, mg/dL, g/dL), temperatures in °F.";

      const messages: any[] = [
        { role: "system", content: systemPrompt + regionNote },
      ];

      if (context) {
        messages.push({ role: "user", content: `Existing content context:\n${JSON.stringify(context)}` });
      }
      messages.push({ role: "user", content: prompt });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: mode === "bundle" ? 8192 : mode === "guided" ? 16384 : 4096,
      });

      const text = response.choices[0]?.message?.content || "[]";
      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(1, totalTokens);
      await logAudit(req, admin, "ai", null, "generate-content", null, { mode, prompt: prompt.substring(0, 200) });

      if (mode === "bundle") {
        let bundleData;
        try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          bundleData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
        } catch {
          bundleData = {};
        }
        bundleData.bundle = true;
        if (!bundleData.pages) bundleData.pages = [];
        if (!bundleData.flashcards) bundleData.flashcards = [];
        if (!bundleData.qbank) bundleData.qbank = [];
        if (!bundleData.listing) bundleData.listing = { title: "", description: "", bullets: [] };
        return res.json(bundleData);
      }

      if (mode === "guided") {
        let guidedData;
        try {
          let cleanText = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
          const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
          guidedData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
        } catch {
          guidedData = null;
        }
        if (guidedData?.sections && Array.isArray(guidedData.sections)) {
          return res.json(guidedData);
        }
        return res.json({ sections: [], _raw: text.slice(0, 20000) });
      }

      let blocks;
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        blocks = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
      } catch {
        blocks = [{ type: "paragraph", content: text }];
      }
      res.json({ blocks });
    } catch (e: any) {
      console.error("AI generate error:", e);
      res.status(500).json({ error: e.message || "AI generation failed" });
    }
  });

  // -------------------------------------------------------
  // Quality scoring for survival guide content
  // -------------------------------------------------------
  function scoreContentQuality(sections: any[]): { score: number; pass: boolean; reasons: string[] } {
    const reasons: string[] = [];
    let score = 100;

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return { score: 0, pass: false, reasons: ["No sections generated"] };
    }

    const genericPhrases = ["is a condition that", "refers to", "involves the", "characterized by", "is defined as", "can be described as", "is important because", "plays a vital role", "is essential for", "is a common", "it is important to", "nurses should be aware", "is a serious condition", "can lead to complications", "requires careful monitoring", "should be monitored closely"];
    const decisionVerbs = ["assess", "monitor", "escalate", "call", "hold", "recheck", "administer", "position", "elevate", "notify", "document", "intervene", "prioritize", "delegate", "titrate", "discontinue", "verify", "initiate", "withhold"];
    const requiredBlockFlavors = new Set(["clinical_pearl", "trap", "exam_tip", "warning"]);

    let totalBlocks = 0;
    let totalDecisionVerbs = 0;
    let genericHits = 0;
    let longBlocks = 0;
    let foundFlavors = new Set<string>();
    let hasRedFlags = false;
    let hasFirstActions = false;
    let hasQuestions = false;
    let hasSpecifics = 0;

    const specificPatterns = [
      /\d+\s*(mm\s*Hg|bpm|mg|mEq|mmol|mcg|units|ml|L|°[CF]|%)/i,
      /\b(K\+|Na\+|Ca2\+|Mg2\+|pH|pCO2|HCO3|BUN|creatinine|troponin|BNP|INR|PT|aPTT|WBC|Hgb|Hct|platelets)\b/i,
      /\b\d+\s*(-|to)\s*\d+/,
      /within\s+\d+\s*(minutes|hours|seconds)/i,
      /\b(contraindicated|black box|hold if|do not give|monitor for)\b/i,
    ];

    for (const sec of sections) {
      const blocks = sec.blocks || [];
      totalBlocks += blocks.length;

      for (const block of blocks) {
        const text = (block.text || block.body || block.content || "").toString();
        const items = block.items || [];
        const allText = text + " " + items.join(" ");

        for (const phrase of genericPhrases) {
          if (allText.toLowerCase().includes(phrase)) {
            genericHits++;
          }
        }

        const wordCount = allText.split(/\s+/).filter(Boolean).length;
        if (wordCount > 120) longBlocks++;

        for (const v of decisionVerbs) {
          const regex = new RegExp(`\\b${v}\\b`, "gi");
          const matches = allText.match(regex);
          if (matches) totalDecisionVerbs += matches.length;
        }

        if (block.flavor) foundFlavors.add(block.flavor);
        if (block.kind === "callout") {
          if (block.flavor) foundFlavors.add(block.flavor);
        }

        const titleLower = (block.title || block.text || "").toLowerCase();
        if (titleLower.includes("red flag")) hasRedFlags = true;
        if (titleLower.includes("first action") || titleLower.includes("priority action")) hasFirstActions = true;

        for (const pat of specificPatterns) {
          if (pat.test(allText)) hasSpecifics++;
        }
      }
    }

    if (genericHits > 1) {
      score -= Math.min(35, genericHits * 7);
      reasons.push(`${genericHits} generic/filler phrases detected (e.g. "is a condition that", "should be monitored closely") -- replace with specific clinical actions`);
    }

    if (longBlocks > 0) {
      score -= Math.min(15, longBlocks * 5);
      reasons.push(`${longBlocks} text blocks exceed 120 words`);
    }

    if (totalDecisionVerbs < 3) {
      score -= 20;
      reasons.push(`Only ${totalDecisionVerbs} decision verbs found (need >= 3: assess, monitor, escalate, etc.)`);
    }

    const missingFlavors = [...requiredBlockFlavors].filter(f => !foundFlavors.has(f));
    if (missingFlavors.length > 0) {
      score -= missingFlavors.length * 5;
      reasons.push(`Missing callout types: ${missingFlavors.join(", ")}`);
    }

    if (!hasRedFlags) {
      score -= 5;
      reasons.push("No red flags section found");
    }

    if (!hasFirstActions) {
      score -= 5;
      reasons.push("No first/priority actions section found");
    }

    if (hasSpecifics < 5) {
      score -= Math.min(25, (5 - hasSpecifics) * 5);
      reasons.push(`Only ${hasSpecifics} specific clinical values found (need >= 5: vital sign thresholds, lab cutoffs, drug doses, time windows)`);
    }

    if (totalBlocks < 15) {
      score -= 10;
      reasons.push(`Only ${totalBlocks} total blocks (need >= 15 for visual density)`);
    }

    score = Math.max(0, Math.min(100, score));
    return { score, pass: score >= 80, reasons };
  }

  app.post("/api/ai/generate-pipeline", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { step, topic, examTarget, region: reqRegion, templateLabel, sections, targetPages, includeQuestions, questionCount, previousStepData } = req.body;
      if (!step || !topic) return res.status(400).json({ error: "step and topic are required" });

      const region = reqRegion || req.region || "US";
      const examNotes: Record<string, string> = {
        "rex-pn": "REX-PN (Canada). Canadian terminology: RPN, CNO, SI units (mmol/L), C, kg.",
        "nclex-pn": "NCLEX-PN (US). American terminology: LPN/LVN, conventional units (mEq/L, mg/dL), F, lbs.",
        "nclex-rn": "NCLEX-RN. NCSBN CJMM. NGN question types. Full RN scope. Conventional units.",
        "np": "NP Certification (AANP/ANCC). Advanced practice. Differential diagnosis, prescribing.",
      };
      const examContext = examNotes[examTarget] || "General nursing exam preparation.";
      const regionContext = region === "CA" ? "Canadian context (metric, SI, C, kg, mmol/L)" : region === "BOTH" ? "Both Canadian and US values" : "US context (imperial, conventional units, F, lbs, mg/dL)";

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const pipelinePrompts: Record<string, { system: string; user: string; maxTokens: number }> = {
        "strategy": {
          system: `You are a senior nursing exam strategist with 15+ years of NCLEX/REX-PN item writing experience for NurseNest. You design exam prep materials that match the rigor and depth of Saunders, Hurst Review, and UWorld. Your strategy must reflect real exam blueprint weighting, evidence-based clinical guidelines, and measurable student outcomes. Return ONLY valid JSON.

QUALITY STANDARD: Every recommendation must be traceable to current clinical practice guidelines (AHA, ANA, NCSBN, CNO, CMS). Never suggest generic study advice. Every element must be specifically tied to how this topic is tested on the target exam.`,
          user: `Design a strategic blueprint for a premium exam survival bundle.

TOPIC: "${topic}"
EXAM: ${examContext}
REGION: ${regionContext}
TEMPLATE: ${templateLabel || "Cram Guide"}
TARGET PAGES: ${targetPages || 20}

Define:
1. target_level: "weak" | "average" | "high-performing"
2. pain_points: string[] (3-5 SPECIFIC student struggles with this topic -- e.g. "confuses hypokalemia ECG changes with hyperkalemia", not "struggles with electrolytes")
3. transformation: string (measurable outcome -- e.g. "correctly triage 3 electrolyte emergencies and identify the priority intervention within 30 seconds")
4. narrative_arc: { orientation: string, system_mastery: string, exam_execution: string }
5. clinical_priority_framework: string[] (exam-scoring priorities ranked by NCSBN blueprint weight and real test frequency -- cite specific competency domains)
6. high_yield_statistics: string[] (3-5 real clinical statistics relevant to this topic -- e.g. "mortality rate doubles for every hour delay in sepsis antibiotics", "hyperkalemia above 6.5 mEq/L requires emergency treatment")
7. visual_motif: string (recurring visual concept e.g. "shield", "checklist", "lifeline")
8. tone: string (the emotional quality of the writing)
9. difficulty_escalation: string (how complexity builds across pages -- must include applied clinical scenarios by page 3)
10. must_include_specifics: string[] (5-8 concrete clinical facts that MUST appear -- drug names with doses, lab value thresholds, time-critical interventions, contraindications)

Return JSON: {"strategy": { target_level, pain_points, transformation, narrative_arc, clinical_priority_framework, high_yield_statistics, visual_motif, tone, difficulty_escalation, must_include_specifics }}`,
          maxTokens: 2048,
        },

        "blueprint": {
          system: `You are a nursing education architect for NurseNest with deep knowledge of exam blueprint weighting and cognitive load theory. You design page-by-page learning progressions that mirror how expert clinicians build decision frameworks. Each page must earn its place -- no filler pages, no redundant summaries, no generic introductions. Return ONLY valid JSON.

ANTI-FILLER RULES:
- No pages titled "Introduction to..." or "Overview of..." -- start with actionable content
- No pages that just list definitions without clinical application
- Every content page must include at least one clinical decision point, lab threshold, or intervention sequence
- Question pages must include distractor analysis (why each wrong answer is wrong)`,
          user: `Using this strategic blueprint, create a ${targetPages || 20}-page bundle map.

TOPIC: "${topic}"
EXAM: ${examContext}
STRATEGY: ${JSON.stringify(previousStepData?.strategy || {})}
SECTIONS AVAILABLE: ${JSON.stringify(sections || [])}
INCLUDE QUESTIONS: ${includeQuestions ? `Yes, ${questionCount || 10} questions with full rationales for ALL options (correct AND incorrect)` : "No"}

Rules:
- Each page must have a specific, unique purpose (no duplicate content themes)
- Page 1 should start with the highest-yield content (what gets tested most), not background
- Every 3-4 pages must escalate from recognition -> analysis -> clinical judgment -> exam application
- Include comparison pages (differentials, similar conditions) -- these are the highest-yield exam pages
- ${includeQuestions ? "Question pages must focus on priority/delegation/safety (most-tested question types)" : "Focus on clinical decision-making mastery pages"}

For each page define:
- id: string (e.g. "p01")
- type: "cover" | "content" | "questions" | "rationales" | "toc" | "divider" | "summary"
- section_id: string (matching section IDs if content type)
- objective: string (specific measurable learning objective -- e.g. "identify 4 ECG changes in hyperkalemia and state the K+ threshold for each")
- exam_takeaways: string[] (1-3 key exam points with SPECIFICS -- include numbers, drug names, or clinical criteria)
- visual_emphasis: "diagram-heavy" | "grid" | "checklist" | "algorithm" | "flowchart" | "mixed"
- reasoning_focus: string (clinical reasoning angle -- e.g. "why this intervention BEFORE that one")
- emotional_tone: "confidence-building" | "urgency" | "clarity" | "reassurance"
- clinical_specifics: string[] (2-3 concrete facts this page MUST contain -- lab values, drug doses, time thresholds)

Return JSON: {"pages": [...]}`,
          maxTokens: 4096,
        },

        "content": {
          system: `You are a clinical content engine for NurseNest, writing at the level of Saunders Comprehensive Review and UWorld rationales. You generate exam-grade nursing content in structured design blocks. Your output must match the depth and specificity that nursing students pay $50+ for in commercial study guides. Return ONLY valid JSON.

QUALITY IMPERATIVES:
- Every paragraph must contain at least ONE specific clinical fact (a lab value, drug dose, time threshold, or physiological measurement)
- NEVER write "is a condition that", "refers to", "is defined as", "involves the" -- these are textbook filler. Instead, lead with the clinical significance or exam relevance
- Tables MUST contain real clinical data (actual drug names with doses, actual lab ranges, actual assessment findings) -- never placeholder text
- Callout titles must be specific and clinical (e.g. "Peaked T-Waves Signal K+ > 6.0 mEq/L" not "Clinical Pearl")
- Include at least 2 comparison/differential tables per bundle (these are the highest-yield exam content)
- Every section must include: (1) how this is tested on the exam, (2) what the priority nursing action is, (3) at least one "if you see X, think Y" clinical decision cue

CONTENT DEPTH REQUIREMENTS:
- Pathophysiology: cellular/molecular level with compensatory mechanisms (e.g. "aldosterone increases K+ excretion via Na+/K+ ATPase in the collecting duct")
- Medications: drug class, mechanism of action, key doses, onset/peak/duration, contraindications, nursing considerations, and patient teaching
- Lab values: exact normal ranges AND critical values with nursing actions for each
- Assessment: specific physical findings with clinical significance (e.g. "JVD indicates right-sided heart failure with CVP > 8 mmHg")
- Interventions: sequenced by priority with rationale for the order

ABSOLUTE BANS:
- No filler paragraphs that state the obvious ("Electrolytes are important for body function")
- No generic nursing advice ("Monitor the patient closely")
- No undefined acronyms
- No content that lacks clinical specificity
- Paragraphs must be 2-3 sentences MAX`,
          user: `Generate exam-grade structured content blocks for this nursing bundle.

TOPIC: "${topic}"
EXAM: ${examContext}
REGION: ${regionContext}
STRATEGY: ${JSON.stringify(previousStepData?.strategy || {})}
PAGE BLUEPRINT: ${JSON.stringify(previousStepData?.pages || [])}

BLOCK TYPES TO USE:
- {"kind":"heading","text":"...","level":1|2|3}
- {"kind":"paragraph","text":"..."} (MAX 2-3 sentences, must contain specific clinical facts)
- {"kind":"bullets","items":["item1","item2","item3"]} (each item must be substantive, not single words)
- {"kind":"table","columns":["Col1","Col2"],"rows":[["a","b"]],"caption":"..."} (MUST contain real clinical data)
- {"kind":"callout","flavor":"exam_tip"|"trap"|"clinical_pearl"|"warning","title":"SPECIFIC CLINICAL TITLE","body":"..."}

REQUIRED per section (7-12 blocks minimum):
1. At least 1 callout with flavor "clinical_pearl" containing a specific exam-tested fact
2. At least 1 callout with flavor "trap" explaining a common exam distractor and why it is wrong
3. At least 1 comparison table with real clinical data
4. At least 1 "exam_tip" callout with a prioritization rule or decision cue
5. Specific lab values, vital sign thresholds, or drug doses in bullets or tables

${includeQuestions ? `Also generate ${questionCount || 10} NCLEX-style MCQs. Questions MUST:
- Focus on priority actions, delegation, and safety (most-tested question types)
- Include 4 options where ALL options are plausible (no obvious distractors)
- Provide rationales explaining why EACH option is correct or incorrect
- Include at least 3 "Select All That Apply" (SATA) questions
- Reference specific clinical values, medications, or assessment findings in stems` : ""}

Return JSON: {"sections":[{"id":"...","title":"...","blocks":[...]}]${includeQuestions ? ',"questions":[{"stem":"...","options":["A)...","B)...","C)...","D)..."],"correct":"A","rationale":"...","type":"mcq"|"sata"}]' : ""}}`,
          maxTokens: 16384,
        },

        "survival-content": {
          system: `You are a high-yield exam-cram content engine for NurseNest Survival Guides. You generate decision-dense, action-oriented nursing content. NEVER produce textbook summaries or generic descriptions. Every output must be structured for rapid clinical decision-making and exam scoring.

ABSOLUTE BANS:
- Do NOT start any block with "is a condition that", "refers to", "involves", "characterized by", "is defined as"
- Do NOT write paragraphs longer than 3 sentences (50 words max per paragraph)
- Do NOT use generic callout titles like "Clinical Pearl" or "Important Note" -- make them specific

REQUIRED STRUCTURE PER TOPIC SECTION:
Every topic section MUST include ALL of these block types:
1. mechanism_one_liner: A heading (level 2) + 1-2 sentence paragraph explaining the core mechanism
2. recognition_cues: Bullets with 5-8 clinical signs/symptoms students must recognize
3. vitals_labs_patterns: Bullets with 3-6 specific vital sign and lab patterns (include numbers: "K+ > 5.5 mEq/L", "HR > 100 bpm", "BP < 90/60")
4. red_flags: A "warning" callout titled "Red Flags - [Topic]" with 3 bullets of critical findings requiring immediate action
5. first_actions_in_order: Ordered bullets (3-7 items) of what to do FIRST, SECOND, THIRD -- priority nursing actions
6. do_not_do: A "trap" callout titled "Do NOT Do - [Topic]" with 2-4 common mistakes to avoid
7. common_exam_traps: A "trap" callout titled "Exam Traps - [Topic]" with 2-4 distractor explanations ("why wrong")
8. micro_case: A "clinical_pearl" callout with a 4-6 line scenario (patient presentation -> what do you do?)
9. exam_questions: 3 MCQs focusing on "first action / priority / safety" with rationales

BLOCK TYPES:
- {"kind":"heading","text":"...","level":1|2|3}
- {"kind":"paragraph","text":"..."} (MAX 50 words)
- {"kind":"bullets","items":["item1","item2"]}
- {"kind":"table","columns":["Col1","Col2"],"rows":[["a","b"]],"caption":"..."}
- {"kind":"callout","flavor":"exam_tip"|"trap"|"clinical_pearl"|"warning","title":"SPECIFIC TITLE","body":"..."}

Return ONLY valid JSON.`,
          user: `Generate high-yield Survival Guide content for this nursing exam bundle.

TOPIC: "${topic}"
EXAM: ${examContext}
REGION: ${regionContext}
STRATEGY: ${JSON.stringify(previousStepData?.strategy || {})}
SECTIONS: ${JSON.stringify(sections || [])}

For EACH section, generate blocks following the required structure (mechanism_one_liner, recognition_cues, vitals_labs_patterns, red_flags, first_actions_in_order, do_not_do, common_exam_traps, micro_case, exam_questions).

Include at least 5 concrete clinical specifics per section: vital sign thresholds, lab value cutoffs, time windows, medication contraindications, and escalation triggers.

${includeQuestions ? `Also generate ${questionCount || 10} additional NCLEX-style MCQs prioritizing "first action", "priority", and "safety" questions. Each with 4 options and full rationales.` : ""}

Return JSON: {"sections":[{"id":"...","title":"...","blocks":[...]}]${includeQuestions ? ',"questions":[{"stem":"...","options":["A)...","B)...","C)...","D)..."],"correct":"A","rationale":"..."}]' : ""}}`,
          maxTokens: 16384,
        },

        "fix": {
          system: `You are a content repair engine for NurseNest Survival Guides. You take generated content that failed quality checks and fix it to be exam-cram quality. You eliminate generic language and increase decision-density. Return ONLY valid JSON with the same section/block structure.

FIX RULES:
- Replace any paragraph longer than 50 words with checklists, tables, or if-then steps
- Add missing required blocks: red_flags (warning callout), first_actions_in_order (ordered bullets), do_not_do (trap callout), common_exam_traps (trap callout), micro_case (clinical_pearl callout), and 3 exam questions with rationales
- Add at least 5 concrete specifics: vital sign thresholds (e.g. "HR > 100 bpm"), lab cutoffs (e.g. "K+ > 5.5 mEq/L"), time windows (e.g. "within 30 minutes"), medication safety notes, or escalation triggers
- Replace generic openings ("is a condition that", "refers to") with action statements ("Assess for", "Monitor", "Intervene when")
- Make every callout title specific to the clinical content, not generic
- Ensure at least 5 decision verbs appear: assess, monitor, escalate, hold, administer, notify, position, etc.`,
          user: `Fix this content that failed quality scoring.

TOPIC: "${topic}"
EXAM: ${examContext}
QUALITY FAILURES: ${JSON.stringify(previousStepData?.qualityReasons || [])}
QUALITY SCORE: ${previousStepData?.qualityScore || 0}/100 (need >= 80)

CURRENT CONTENT TO FIX:
${JSON.stringify(previousStepData?.sections || [])}

Return the fixed content in the same JSON structure:
{"sections":[{"id":"...","title":"...","blocks":[...]}]${previousStepData?.questions ? ',"questions":' + JSON.stringify(previousStepData.questions) : ""}}`,
          maxTokens: 16384,
        },

        "enhance": {
          system: `You are a senior NCLEX item writer and clinical educator enhancing NurseNest content to professional exam-prep quality. Your job is to transform content from "textbook level" to "UWorld/Saunders level" by adding clinical decision frameworks, real exam patterns, and professional-grade specificity. Return ONLY valid JSON with the same structure as input.

ENHANCEMENT STANDARDS:
- Every enhancement must add CONCRETE clinical value (a number, a drug name, a clinical threshold, a decision rule)
- Never add generic advice like "always assess first" or "prioritize patient safety" -- be specific about WHAT to assess and WHICH safety concern
- Mnemonics must be well-known and evidence-tested (e.g. MONA for MI, MUDPILES for metabolic acidosis) -- do not invent new mnemonics
- Priority ladders must include the rationale for ordering (WHY this action before that one)`,
          user: `Enhance this content to professional exam-prep authority level.

TOPIC: "${topic}"
EXAM: ${examContext}

For each section, apply these specific upgrades:
1. EXAM PATTERN ANALYSIS: Add a callout explaining exactly how this topic appears on the exam (question stem patterns, common item types, distractor strategies)
2. DECISION ALGORITHMS: Convert any "assess and intervene" content into specific if-then decision trees with thresholds (e.g. "If K+ 5.5-6.0: PO Kayexalate 15g + recheck in 2h. If K+ > 6.0: IV calcium gluconate 1g over 10 min STAT")
3. CLINICAL REASONING CUES: Add "If you see [finding], think [condition], do [action]" statements with specific findings
4. DISTRACTOR ANALYSIS: For each exam trap callout, explain WHY each wrong answer looks right and the key differentiating factor
5. PRIORITY LADDERS: Sequence interventions with clinical rationale (not just "ABCs" but specific to this condition)
6. HIGH-YIELD STATISTICS: Add real clinical statistics where relevant (incidence rates, mortality without treatment, time-to-treatment windows)

QUALITY GATES:
- Do NOT add fluff or generic advice
- Do NOT add content that lacks a specific clinical fact
- Do NOT create new sections -- only enhance existing blocks or add targeted callouts
- Every added callout must have a specific, clinical title (not "Important Note")

CURRENT CONTENT: ${JSON.stringify(previousStepData?.sections || [])}

Return the enhanced sections in the same JSON structure:
{"sections":[{"id":"...","title":"...","blocks":[...]}]${previousStepData?.questions ? ',"questions":' + JSON.stringify(previousStepData.questions) : ""}}`,
          maxTokens: 16384,
        },

        "qa": {
          system: `You are a clinical accuracy reviewer and content quality auditor for NurseNest. You have the standards of a nursing textbook editor combined with an NCLEX item writer. You catch clinical errors, weak content, and filler. You fix issues but preserve the block structure. Return ONLY valid JSON with the corrected content.

QA STANDARDS:
- Clinical accuracy: All lab values, drug doses, vital sign ranges, and interventions must be current and evidence-based
- Specificity check: Flag and fix any paragraph that lacks a concrete clinical fact
- Exam relevance: Every section must clearly connect to how it is tested
- No filler tolerance: Remove or replace any content that states the obvious without clinical value`,
          user: `Perform professional-grade quality audit on this nursing bundle content.

TOPIC: "${topic}"
EXAM: ${examContext}

AUDIT CHECKLIST -- check and fix each:
1. CLINICAL ACCURACY: Verify all lab values match current reference ranges, drug doses are correct, and interventions follow current guidelines (AHA, ANA, NCSBN)
2. FILLER DETECTION: Remove or replace any sentence that starts with "is a condition", "refers to", "involves the", "is important because" with specific clinical content
3. SPECIFICITY AUDIT: Every paragraph must contain at least one specific fact. Replace "Monitor vital signs" with "Monitor BP q15min, target MAP > 65 mmHg"
4. REDUNDANCY: Remove duplicate content across sections. If two sections cover the same concept, merge or differentiate them
5. FLOW: Ensure progressive complexity (recognition -> analysis -> clinical judgment -> application)
6. EXAM FRAMING: Ensure exam-specific language appears throughout, not just in one section
7. TABLE QUALITY: Tables must contain real clinical data with specific values -- no generic placeholders
8. CALLOUT SPECIFICITY: Replace generic titles ("Clinical Pearl", "Important") with specific clinical titles ("Digoxin Toxicity: Check K+ Before Each Dose")
9. QUESTION QUALITY: If questions exist, verify all 4 options are plausible, rationales explain ALL options, and stems test clinical judgment (not recall)
10. COMPLETENESS: Ensure each section has the required block types (at least 1 clinical pearl, 1 exam trap, specific clinical values)

CURRENT CONTENT: ${JSON.stringify(previousStepData?.sections || [])}

Return the corrected content in the same JSON structure:
{"sections":[{"id":"...","title":"...","blocks":[...]}]${previousStepData?.questions ? ',"questions":' + JSON.stringify(previousStepData.questions) : ""}}`,
          maxTokens: 16384,
        },
      };

      const pipeline = pipelinePrompts[step];
      if (!pipeline) return res.status(400).json({ error: `Unknown pipeline step: ${step}` });

      const callLLM = async (sysPrompt: string, userPrompt: string, maxTok: number, temp: number) => {
        console.log(`[LLM] model=gpt-4o-mini step=${step} prompt_chars=${sysPrompt.length + userPrompt.length} max_tokens=${maxTok} temp=${temp}`);
        const resp = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: sysPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: temp,
          max_tokens: maxTok,
        });
        const raw = resp.choices[0]?.message?.content || "{}";
        const finishReason = resp.choices[0]?.finish_reason || "unknown";
        const tokens = resp.usage?.total_tokens || 0;
        recordAiUsage(1, tokens);
        console.log(`[LLM] output_chars=${raw.length} finish_reason=${finishReason} tokens=${tokens}`);
        if (finishReason === "length") {
          console.warn(`[LLM] WARNING: output truncated (finish_reason=length). Increase max_tokens or reduce prompt.`);
        }
        let result;
        try {
          const clean = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
          const match = clean.match(/\{[\s\S]*\}/);
          result = match ? JSON.parse(match[0]) : null;
          if (!result) {
            console.error(`[LLM] JSON parse: no JSON object found in output. First 500 chars: ${raw.substring(0, 500)}`);
          }
        } catch (parseErr: any) {
          console.error(`[LLM] JSON parse error: ${parseErr.message}. First 500 chars: ${raw.substring(0, 500)}`);
          result = null;
        }
        return { result, raw, tokens, finishReason };
      };

      // ── CHUNKED SECTION-BY-SECTION generation for content steps ──
      const contentSteps = new Set(["content", "survival-content"]);
      const reqSections: { id: string; label: string; budget: number }[] = (sections || []).filter((s: any) => s.id !== "practice-questions" && s.id !== "rationales");

      if (contentSteps.has(step) && reqSections.length > 0) {
        const isSurvival = step === "survival-content";
        const allSections: any[] = [];
        let totalTokens = 0;
        const sectionReport: Record<string, { blocks: number; chars: number; status: string; score: number; attempts: number }> = {};
        const failedSections: string[] = [];

        const callLLMJson = async (sys: string, usr: string, maxTok: number, temp: number) => {
          console.log(`[LLM-JSON] step=${step} prompt_chars=${sys.length + usr.length} max_tokens=${maxTok}`);
          const resp = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: sys }, { role: "user", content: usr }],
            temperature: temp,
            max_tokens: maxTok,
            response_format: { type: "json_object" },
          });
          const raw = resp.choices[0]?.message?.content || "{}";
          const finishReason = resp.choices[0]?.finish_reason || "unknown";
          const tokens = resp.usage?.total_tokens || 0;
          recordAiUsage(1, tokens);
          console.log(`[LLM-JSON] output_chars=${raw.length} finish=${finishReason} tokens=${tokens}`);
          if (finishReason === "length") {
            console.warn(`[LLM-JSON] WARNING: output truncated`);
          }
          let result;
          try {
            result = JSON.parse(raw);
          } catch (e: any) {
            console.error(`[LLM-JSON] parse error: ${e.message}. First 300 chars: ${raw.substring(0, 300)}`);
            result = null;
          }
          return { result, raw, tokens, finishReason };
        };

        const sectionSysPrompt = isSurvival ? pipeline.system : pipeline.system;

        const GENERIC_TITLE_PATTERNS = /^(survival|cram|study|exam|review|nursing|nclex|rex|guide|prep)/i;
        const HIGH_YIELD_INVENTORY = `Use these high-yield conditions as anchors throughout the section (reference whichever are relevant):
Heart failure, ACS/MI, COPD exacerbation vs asthma, pneumonia, sepsis, hypo/hyperkalemia, hypo/hyperglycemia, stroke (ischemic vs hemorrhagic), AKI vs CKD, GI bleed, fluid volume deficit vs overload, anaphylaxis, dysrhythmias, DKA vs HHS recognition, UTI progressing to sepsis, DVT/PE, preeclampsia/eclampsia, burns (Parkland formula), compartment syndrome.`;
        const isGenericTitle = GENERIC_TITLE_PATTERNS.test(topic.trim());

        const CONTENT_RULES = `CRITICAL RULES (violations = invalid output):
- Do NOT output a title-only section or a section cover/divider page.
- Do NOT include sectionTitle/divider/spacer/heading-only blocks inside the section content; the compiler already creates section cover/divider pages. Focus on substantive blocks.
- This section must contain CONTENT blocks with real clinical information.
- blocks.length MUST be >= 8.
- At least 6 blocks must be substantive (bullets, table, callout, paragraph with clinical facts), NOT headings.
- Any response with only headings, empty blocks, or placeholder text is INVALID and will be rejected.
- Every paragraph must contain a specific clinical fact, lab value, drug name, or nursing action.
- Do NOT use filler phrases like "further assessment needed" or "consult physician" without specifics.
Return JSON only. No markdown.`;

        const buildSectionUserPrompt = (sec: { id: string; label: string; budget: number }) => {
          const blockTypes = `BLOCK TYPES:
- {"kind":"heading","text":"...","level":1|2|3}
- {"kind":"paragraph","text":"..."} (MAX 2-3 sentences, must contain specific clinical fact)
- {"kind":"bullets","items":["item1","item2"]} (4-8 items, each substantive)
- {"kind":"table","columns":["Col1","Col2"],"rows":[["a","b"]],"caption":"..."} (real clinical data)
- {"kind":"callout","flavor":"exam_tip"|"trap"|"clinical_pearl"|"warning","title":"SPECIFIC TITLE","body":"..."}`;

          const topicInventory = isGenericTitle ? `\n${HIGH_YIELD_INVENTORY}\nIMPORTANT: Each section MUST reference at least 8 of the anchor conditions above with specific clinical details (labs, vitals, interventions). Do NOT just list them -- explain the nursing-relevant facts for each.\n` : "";

          if (isSurvival) {
            return `Generate ONE section of a Survival Guide.

TOPIC: "${topic}"
SECTION: id="${sec.id}", title="${sec.label}"
EXAM: ${examContext}
REGION: ${regionContext}
STRATEGY: ${JSON.stringify(previousStepData?.strategy || {})}
${topicInventory}
${blockTypes}

${CONTENT_RULES}

REQUIRED BLOCKS FOR THIS SECTION (include ALL):
1. heading (level 1) with section title
2. mechanism_one_liner: 1-2 sentence paragraph with pathophysiology
3. recognition_cues: bullets with 5-8 clinical signs (specific vitals/labs)
4. vitals_labs_patterns: bullets with 3-6 specific values (include numbers, units, ranges)
5. red_flags: warning callout titled "Red Flags - ${sec.label}" with 3 critical findings
6. first_actions_in_order: ordered bullets (3-7 priority nursing actions with rationale)
7. do_not_do: trap callout titled "Do NOT Do - ${sec.label}" with 2-4 mistakes
8. common_exam_traps: trap callout titled "Exam Traps - ${sec.label}" with 2-4 distractors
9. micro_case: clinical_pearl callout with 4-6 line patient scenario (age, vitals, labs, question)
10. At least 1 comparison table with real clinical data (3+ rows, 3+ columns)

Target: ${Math.max(sec.budget, 800)} characters minimum, 8-15 blocks.

Return JSON: {"id":"${sec.id}","title":"${sec.label}","blocks":[...]}`;
          }

          return `Generate ONE section of a Cram Guide.

TOPIC: "${topic}"
SECTION: id="${sec.id}", title="${sec.label}"
EXAM: ${examContext}
REGION: ${regionContext}
STRATEGY: ${JSON.stringify(previousStepData?.strategy || {})}
PAGE BLUEPRINT: ${JSON.stringify(previousStepData?.pages || [])}
${topicInventory}
${blockTypes}

${CONTENT_RULES}

REQUIRED for this section (8-12 blocks minimum):
1. Level-1 heading with section title
2. At least 2 paragraph blocks with specific clinical facts (drug names, lab values, thresholds)
3. At least 1 clinical_pearl callout with specific exam-tested fact
4. At least 1 trap callout explaining a common distractor with correct reasoning
5. At least 1 comparison table with real clinical data (3+ rows, 3+ columns)
6. At least 1 exam_tip callout with prioritization rule or mnemonic
7. At least 1 bullets block with 4+ specific clinical signs, labs, or interventions
8. "If you see X, think Y" clinical decision cues in callouts or bullets

Target: ${Math.max(sec.budget, 800)} characters minimum, 8-12 blocks.

Return JSON: {"id":"${sec.id}","title":"${sec.label}","blocks":[...]}`;
        };

        const SUBSTANTIVE_KINDS = new Set(["bullets", "table", "callout", "paragraph", "checklist", "steps", "flowchart", "decisiontree", "case", "qa", "comparisongrid", "algorithm", "chart"]);
        const NON_SUBSTANTIVE_KINDS = new Set(["heading", "sectionTitle", "divider", "spacer"]);

        const LISTLIKE_KINDS = new Set(["bullets", "checklist", "steps"]);
        const TEXTLIKE_KINDS = new Set(["callout", "paragraph", "case", "qa", "algorithm", "flowchart", "decisiontree", "comparisongrid", "chart"]);

        const DECISION_VERBS = /\b(assess|reassess|monitor|escalate|notify|call|hold|administer|titrate|position|recheck|prioritize|elevate|auscultate|document|intervene|delegate|suction|discontinue)\b/gi;

        const SECTION_SHAPE_CONTRACTS: Record<string, { listBlocks?: number; listItems?: number; tableBlocks?: number; tableRows?: number; calloutBlocks?: number; calloutChars?: number; calloutKeywords?: string[] }> = {
          "pathophysiology": { listBlocks: 2, listItems: 5, tableBlocks: 1, tableRows: 3, calloutBlocks: 2, calloutChars: 80 },
          "pharmacology": { listBlocks: 1, listItems: 6, tableBlocks: 1, tableRows: 4, calloutBlocks: 1, calloutChars: 80, calloutKeywords: ["hold", "monitor", "contraindic"] },
          "medications": { listBlocks: 1, listItems: 6, tableBlocks: 1, tableRows: 4, calloutBlocks: 1, calloutChars: 80, calloutKeywords: ["hold", "monitor", "contraindic"] },
          "interventions": { listBlocks: 2, listItems: 5, tableBlocks: 1, tableRows: 3, calloutBlocks: 1, calloutChars: 80 },
          "assessment": { listBlocks: 2, listItems: 5, calloutBlocks: 2, calloutChars: 80 },
          "complications": { listBlocks: 1, listItems: 5, tableBlocks: 1, tableRows: 3, calloutBlocks: 2, calloutChars: 80 },
        };

        const validateSection = (sec: any, sectionId?: string): { pass: boolean; blocks: number; chars: number; substantive: number; reasons: string[] } => {
          const blocks = sec?.blocks || [];
          const reasons: string[] = [];
          let totalChars = 0;
          let meaningfulChars = 0;
          let substantiveCount = 0;
          let allText = "";
          let qualifiedListBlocks = 0;
          let qualifiedTableBlocks = 0;
          let qualifiedCalloutBlocks = 0;
          const calloutTexts: string[] = [];
          for (const b of blocks) {
            const text = (b.text || b.body || b.content || b.caption || "").toString();
            const items = Array.isArray(b.items) ? b.items : [];
            const rows = Array.isArray(b.rows) ? b.rows : [];
            const itemChars = items.map(String).join(" ").length;
            const rowChars = rows.map((r: any) => (Array.isArray(r) ? r : []).map(String).join(" ")).join(" ").length;
            const blockChars = text.length + itemChars + rowChars;
            totalChars += blockChars;
            allText += " " + text + " " + items.map(String).join(" ");
            const kind = (b.kind || b.type || "").toLowerCase();
            if (!NON_SUBSTANTIVE_KINDS.has(kind)) {
              meaningfulChars += blockChars;
            }
            if (LISTLIKE_KINDS.has(kind) && (items.length >= 5 || itemChars >= 150)) {
              substantiveCount++;
              qualifiedListBlocks++;
            } else if (kind === "table" && rows.length >= 3) {
              substantiveCount++;
              qualifiedTableBlocks++;
            } else if (TEXTLIKE_KINDS.has(kind) && text.length >= 80) {
              substantiveCount++;
              if (kind === "callout") {
                qualifiedCalloutBlocks++;
                calloutTexts.push(text.toLowerCase() + " " + (b.title || "").toLowerCase());
              }
            } else if (!NON_SUBSTANTIVE_KINDS.has(kind) && !LISTLIKE_KINDS.has(kind) && kind !== "table" && !TEXTLIKE_KINDS.has(kind) && blockChars >= 120) {
              substantiveCount++;
            }
          }
          const titleOnly = substantiveCount === 0 || meaningfulChars < 300;
          if (titleOnly) reasons.push(`title_only: insufficient meaningful content (${substantiveCount} substantive, ${meaningfulChars} meaningful chars)`);
          if (blocks.length < 8) reasons.push(`insufficient_blocks: ${blocks.length} blocks (need >= 8)`);
          if (substantiveCount < 6) reasons.push(`insufficient_substantive_blocks: ${substantiveCount} substantive (need >= 6 -- bullets>=5items/table>=3rows/callout>=80chars/paragraph>=80chars)`);
          if (totalChars < 800) reasons.push(`insufficient_chars: ${totalChars} chars (need >= 800)`);
          const hasCallout = blocks.some((b: any) => (b.kind || b.type || "").toLowerCase() === "callout" || b.flavor);
          if (!hasCallout) reasons.push("missing_callout: No callout blocks found");
          const hasTable = blocks.some((b: any) => (b.kind || b.type || "").toLowerCase() === "table" && (Array.isArray(b.rows) ? b.rows : []).length > 0);
          if (!hasTable) reasons.push("missing_table: No table blocks found");
          const decisionMatches = allText.match(DECISION_VERBS) || [];
          const decisionVerbCount = decisionMatches.length;
          if (decisionVerbCount < 12) reasons.push(`low_decision_density: ${decisionVerbCount} decision verbs found (need >= 12 -- assess/monitor/hold/administer/prioritize etc.)`);
          const sid = (sectionId || sec?.id || "").toLowerCase().replace(/[-_\s]+/g, "");
          const contractKey = Object.keys(SECTION_SHAPE_CONTRACTS).find(k => sid.includes(k));
          if (contractKey) {
            const contract = SECTION_SHAPE_CONTRACTS[contractKey];
            if (contract.listBlocks && qualifiedListBlocks < contract.listBlocks) reasons.push(`missing_required_lists: ${qualifiedListBlocks} qualified list blocks (need >= ${contract.listBlocks} with >= ${contract.listItems || 5} items each)`);
            if (contract.tableBlocks && qualifiedTableBlocks < contract.tableBlocks) reasons.push(`missing_required_table: ${qualifiedTableBlocks} qualified tables (need >= ${contract.tableBlocks} with >= ${contract.tableRows || 3} rows)`);
            if (contract.calloutBlocks && qualifiedCalloutBlocks < contract.calloutBlocks) reasons.push(`missing_required_callouts: ${qualifiedCalloutBlocks} qualified callouts (need >= ${contract.calloutBlocks} with >= ${contract.calloutChars || 80} chars)`);
            if (contract.calloutKeywords && contract.calloutKeywords.length > 0) {
              const missing = contract.calloutKeywords.filter(kw => !calloutTexts.some(ct => ct.includes(kw)));
              if (missing.length > 0) reasons.push(`missing_callout_keywords: callouts missing required terms: ${missing.join(", ")}`);
            }
          }
          const pass = blocks.length >= 8 && totalChars >= 800 && substantiveCount >= 6 && decisionVerbCount >= 12;
          return { pass, blocks: blocks.length, chars: totalChars, substantive: substantiveCount, reasons };
        };

        const MAX_SECTION_RETRIES = 2;
        const repairSysPrompt = `You are a content repair engine for NurseNest. The previous generation was INVALID -- it lacked exam-cram usefulness.

RULES FOR REPAIR:
- Rewrite the section with >= 8 blocks total and >= 6 substantive blocks.
- NO cover pages. NO filler. NO title-only sections. NO placeholder text. NO sectionTitle/divider/spacer blocks.
- Every block must contain specific clinical information: drug names, lab values, nursing interventions, assessment findings.
- Include at least 1 table with 3+ rows and 3+ columns of real clinical data.
- Include at least 2 callout blocks (exam_tip, trap, clinical_pearl, or warning) with specific content (>= 80 chars each).
- Include at least 2 bullets/checklist blocks with >= 5 specific items each.
- Total character count must be >= 800.

EXAM-CRAM REQUIRED CONTENT (include ALL):
- Recognition cues: "If you see X -> think Y" (bullets with specific signs/labs -> condition)
- Red flags: warning callout with critical findings requiring immediate action
- First actions in order: steps/bullets with prioritized nursing interventions (ABCs, then...)
- Exam traps: trap callout with common distractors and why they are wrong
- At least 1 comparison table ("Don't confuse X with Y")
- Mini case: clinical_pearl callout with 4-6 line patient scenario (age, vitals, labs, question)

USE DECISION VERBS: assess, monitor, hold, administer, titrate, position, prioritize, escalate, notify, auscultate, intervene, delegate, document, recheck, discontinue.
Target: >= 12 decision verbs across the section.

- Return ONLY valid JSON: {"id":"...","title":"...","blocks":[...]}`;

        await logAudit(req, admin, "ai", null, `pipeline-${step}-chunked`, null, { step, topic: topic.substring(0, 100), sectionCount: reqSections.length });

        for (let si = 0; si < reqSections.length; si++) {
          const sec = reqSections[si];
          console.log(`[Chunked] Generating section ${si + 1}/${reqSections.length}: "${sec.id}" (${sec.label})`);

          let sectionData: any = null;
          let attempts = 0;
          let lastRaw = "";
          let validation = { pass: false, blocks: 0, chars: 0, substantive: 0, reasons: ["Not generated"] };

          for (attempts = 1; attempts <= 1 + MAX_SECTION_RETRIES; attempts++) {
            const isRetry = attempts > 1;
            const sys = isRetry ? repairSysPrompt : sectionSysPrompt;
            const topicInventoryRepair = isGenericTitle ? `\n${HIGH_YIELD_INVENTORY}\n` : "";
            const usr = isRetry
              ? `Your previous output for this section was INVALID and REJECTED.

TOPIC: "${topic}"
SECTION: id="${sec.id}", title="${sec.label}"
EXAM: ${examContext}
REGION: ${regionContext}
${topicInventoryRepair}
FAILURES: ${validation.reasons.join("; ")}

Previous output had ${validation.blocks} blocks (${validation.substantive} substantive), ${validation.chars} chars.

You MUST fix ALL failures listed above. Generate a COMPLETE content section with:
- >= 8 blocks total
- >= 6 substantive blocks (bullets with 4+ items, tables with 3+ rows, callouts with specific clinical content, paragraphs with clinical facts)
- >= 800 characters of clinical content
- At least 1 table, 2 callouts, 1 bullets block

Return JSON: {"id":"${sec.id}","title":"${sec.label}","blocks":[...]}`
              : buildSectionUserPrompt(sec);

            const { result, raw, tokens } = await callLLMJson(sys, usr, 4096, isRetry ? 0.6 : 0.7);
            totalTokens += tokens;
            lastRaw = raw;

            if (result) {
              const secResult = result.blocks ? result : (result.sections?.[0] || result);
              if (secResult.blocks) {
                if (!secResult.id) secResult.id = sec.id;
                if (!secResult.title) secResult.title = sec.label;
                validation = validateSection(secResult, sec.id);
                if (validation.pass) {
                  sectionData = secResult;
                  console.log(`[Chunked] OK section "${sec.id}": ${validation.blocks} blocks, ${validation.chars} chars (attempt ${attempts})`);
                  break;
                }
                console.warn(`[Chunked] FAIL section "${sec.id}" attempt ${attempts}: ${validation.reasons.join("; ")}`);
                sectionData = secResult;
              } else {
                console.warn(`[Chunked] section "${sec.id}" attempt ${attempts}: no blocks in response`);
              }
            } else {
              console.error(`[Chunked] section "${sec.id}" attempt ${attempts}: JSON parse failed`);
            }
          }

          if (sectionData) {
            allSections.push(sectionData);
            sectionReport[sec.id] = { blocks: validation.blocks, chars: validation.chars, substantive: validation.substantive, status: validation.pass ? "ok" : "weak", score: validation.pass ? 85 : 50, attempts };
          } else {
            failedSections.push(sec.id);
            sectionReport[sec.id] = { blocks: 0, chars: 0, status: "FAILED", score: 0, attempts };
            console.error(`[Chunked] FAILED section "${sec.id}" after ${attempts - 1} attempts. Last raw (300 chars): ${lastRaw.substring(0, 300)}`);
          }
        }

        if (failedSections.length > 0) {
          console.error(`[Chunked] ${failedSections.length} sections FAILED: ${failedSections.join(", ")}`);
          return res.status(422).json({
            error: "EMPTY_SECTION",
            section: failedSections[0],
            emptySections: failedSections,
            sectionReport,
            details: `Failed to generate content for: ${failedSections.join(", ")}. Each section was attempted ${1 + MAX_SECTION_RETRIES} times.`,
            rawPreview: "",
          });
        }

        const assembled: any = { sections: allSections };

        const quality = scoreContentQuality(allSections);
        console.log(`[Chunked] Aggregate quality: ${quality.score}/100 pass=${quality.pass} (${allSections.length} sections, ${totalTokens} tokens)`);

        return res.json({
          step, data: assembled, tokens: totalTokens,
          quality: { score: quality.score, pass: quality.pass, reasons: quality.reasons, retries: 0 },
          sectionReport,
        });
      }

      // ── Non-content steps: strategy, blueprint, enhance, qa, fix ──
      const temp = step === "strategy" || step === "blueprint" ? 0.8 : 0.7;
      let { result: parsed, raw: text, tokens: totalTokens } = await callLLM(pipeline.system, pipeline.user, pipeline.maxTokens, temp);
      await logAudit(req, admin, "ai", null, `pipeline-${step}`, null, { step, topic: topic.substring(0, 100) });

      if (parsed) {
        return res.json({ step, data: parsed, tokens: totalTokens });
      }
      return res.json({ step, data: null, _raw: text.slice(0, 20000), tokens: totalTokens });
    } catch (e: any) {
      console.error(`Pipeline step error:`, e);
      res.status(500).json({ error: e.message || "Pipeline step failed" });
    }
  });

  // --- Question batch endpoint for large question counts ---
  app.post("/api/ai/generate-questions-batch", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { topic, examTarget, region: reqRegion, totalCount, batchSize: reqBatchSize } = req.body;
      if (!topic) return res.status(400).json({ error: "topic is required" });

      const region = reqRegion || "US";
      const examNotes: Record<string, string> = {
        "rex-pn": "REX-PN (Canada). Canadian terminology: RPN, CNO, SI units.",
        "nclex-pn": "NCLEX-PN (US). American terminology: LPN/LVN, conventional units.",
        "nclex-rn": "NCLEX-RN. NCSBN CJMM. NGN question types. Full RN scope.",
        "np": "NP Certification. Advanced practice. Differential diagnosis, prescribing.",
      };
      const examContext = examNotes[examTarget] || "General nursing exam preparation.";
      const regionContext = region === "CA" ? "Canadian context (metric, SI)" : region === "BOTH" ? "Both Canadian and US values" : "US context (imperial, conventional units)";

      const total = Math.min(Math.max(parseInt(totalCount) || 25, 5), 500);
      const batchSize = Math.min(Math.max(parseInt(reqBatchSize) || 25, 10), 50);
      const batches = Math.ceil(total / batchSize);

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const allQuestions: any[] = [];
      let totalTokens = 0;

      for (let batch = 0; batch < batches; batch++) {
        const count = Math.min(batchSize, total - allQuestions.length);
        const startNum = allQuestions.length + 1;
        console.log(`[QuestionBatch] Generating batch ${batch + 1}/${batches}: questions ${startNum}-${startNum + count - 1} (${allQuestions.length}/${total} done)`);

        const sysPrompt = `You are a senior NCLEX item writer for NurseNest. Generate ${count} professional-quality exam questions that test clinical judgment. Return ONLY a valid JSON array of question objects.

Each question MUST have: stem (clinical scenario with specific values), options (array of exactly 4 strings: "A) ...", "B) ...", "C) ...", "D) ..."), correct (letter A-D), rationale (why correct is right AND why each wrong option is wrong), trap_note (common exam mistake for this question).

RULES: Focus on priority/delegation/safety. Include specific lab values, vitals, and drug names in stems. All 4 options must be plausible nursing actions.`;

        const userPrompt = `TOPIC: "${topic}"
EXAM: ${examContext}
REGION: ${regionContext}
Generate questions ${startNum} through ${startNum + count - 1} (${count} questions).
Return JSON: [{"stem":"...","options":["A)...","B)...","C)...","D)..."],"correct":"A","rationale":"...","trap_note":"..."}]`;

        let batchQuestions: any[] | null = null;
        const MAX_RETRIES = 2;
        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
          console.log(`[QuestionBatch] batch=${batch + 1} attempt=${attempt + 1}`);
          const resp = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: sysPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 8192,
          });
          const raw = resp.choices[0]?.message?.content || "[]";
          totalTokens += resp.usage?.total_tokens || 0;
          recordAiUsage(1, resp.usage?.total_tokens || 0);
          console.log(`[QuestionBatch] output_chars=${raw.length} finish_reason=${resp.choices[0]?.finish_reason}`);

          try {
            const clean = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
            const arrMatch = clean.match(/\[[\s\S]*\]/);
            if (arrMatch) {
              const arr = JSON.parse(arrMatch[0]);
              if (Array.isArray(arr) && arr.length > 0) {
                const valid = arr.filter((q: any) => q.stem && Array.isArray(q.options) && q.options.length >= 4 && q.correct && q.rationale);
                if (valid.length >= Math.floor(count * 0.5)) {
                  batchQuestions = valid;
                  console.log(`[QuestionBatch] batch=${batch + 1} success: ${valid.length}/${count} valid questions`);
                  break;
                }
                console.warn(`[QuestionBatch] batch=${batch + 1} only ${valid.length}/${count} valid questions, retrying...`);
              }
            }
          } catch (parseErr: any) {
            console.error(`[QuestionBatch] JSON parse error: ${parseErr.message}`);
          }
        }

        if (!batchQuestions) {
          console.error(`[QuestionBatch] batch=${batch + 1} FAILED after ${MAX_RETRIES + 1} attempts`);
          return res.status(422).json({
            error: "QUESTION_BATCH_FAILED",
            batch: batch + 1,
            totalBatches: batches,
            questionsGenerated: allQuestions.length,
            questionsRequested: total,
            details: `Question batch ${batch + 1} failed after ${MAX_RETRIES + 1} attempts. ${allQuestions.length} questions generated so far.`,
            partialQuestions: allQuestions,
          });
        }

        allQuestions.push(...batchQuestions);
      }

      console.log(`[QuestionBatch] Complete: ${allQuestions.length}/${total} questions, ${totalTokens} tokens`);
      return res.json({ questions: allQuestions, total: allQuestions.length, requested: total, tokens: totalTokens });
    } catch (e: any) {
      console.error(`[QuestionBatch] error:`, e);
      res.status(500).json({ error: e.message || "Question batch generation failed" });
    }
  });

  app.post("/api/ai/generate-test-bank", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { topic, customPrompt, examTarget, questionCount, difficulty, questionTypes } = req.body;
      if (!topic) return res.status(400).json({ error: "Topic is required" });

      const count = Math.min(Math.max(parseInt(questionCount) || 25, 5), 75);
      const diff = difficulty || "mixed";
      const types = questionTypes || ["multiple-choice", "select-all", "ordered-response"];

      const examTargetNotes: Record<string, string> = {
        "rex-pn": "REX-PN (Canada). Use Canadian terminology: RPN, CNO, SI units (mmol/L, µmol/L), °C, kg. CAT-based exam, RPN scope.",
        "nclex-pn": "NCLEX-PN (US). Use American terminology: LPN/LVN, conventional units (mEq/L, mg/dL), °F, lbs. LPN scope under RN supervision.",
        "nclex-rn": "NCLEX-RN. Use NCSBN CJMM. Include NGN question types. Full RN scope, clinical judgment focus. Conventional units.",
        "np": "NP Certification (AANP/ANCC). Advanced practice level. Differential diagnosis, prescribing, autonomous practice.",
      };

      const examNote = examTargetNotes[examTarget || "nclex-rn"] || examTargetNotes["nclex-rn"];

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert nursing exam question writer for NurseNest. Generate a professional test bank with clinically accurate, exam-style questions.

Exam context: ${examNote}

Return ONLY valid JSON with this exact structure:
{
  "title": "Test Bank: [Topic Name]",
  "description": "A brief 1-2 sentence description of what this test bank covers.",
  "questions": [
    {
      "id": 1,
      "type": "multiple-choice",
      "difficulty": "moderate",
      "stem": "The question stem text...",
      "options": ["A) Option text", "B) Option text", "C) Option text", "D) Option text"],
      "correctAnswer": "B",
      "rationale": "Explanation of why B is correct and why other options are wrong.",
      "category": "Category/System",
      "tags": ["tag1", "tag2"]
    }
  ]
}

Question types to include: ${types.join(", ")}
- multiple-choice: 4 options, 1 correct
- select-all: 5-6 options, 2-4 correct (correctAnswer as comma-separated like "A,C,D")
- ordered-response: 4-6 steps to arrange in order (correctAnswer as ordered like "C,A,D,B")

Difficulty distribution for "${diff}": ${diff === "easy" ? "70% easy, 25% moderate, 5% hard" : diff === "hard" ? "5% easy, 25% moderate, 70% hard" : "20% easy, 50% moderate, 30% hard"}

Generate exactly ${count} questions. Each must be clinically accurate, relevant to the topic, and match exam-level rigor.`
          },
          {
            role: "user",
            content: `Generate a ${count}-question test bank on: ${topic}${customPrompt ? `\n\nAdditional instructions from the user: ${customPrompt}\nUse these instructions to guide question focus, depth, and style. Do NOT echo the user's words verbatim.` : ""}`
          }
        ],
        temperature: 0.7,
        max_tokens: 8192,
      });

      const text = response.choices[0]?.message?.content || "{}";
      let testBank;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        testBank = jsonMatch ? JSON.parse(jsonMatch[0]) : { title: `Test Bank: ${topic}`, description: "", questions: [] };
      } catch {
        testBank = { title: `Test Bank: ${topic}`, description: "Generated test bank", questions: [] };
      }

      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(1, totalTokens);
      await logAudit(req, admin, "ai", null, "generate-test-bank", null, { topic, examTarget, questionCount: count });
      res.json(testBank);
    } catch (e: any) {
      console.error("AI test bank error:", e);
      res.status(500).json({ error: e.message || "AI test bank generation failed" });
    }
  });

  app.post("/api/ai/generate-bundle-chapter", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { topic, examTarget, chapterTitle, chapterNumber, totalChapters, previousChapters } = req.body;
      if (!topic || !chapterTitle) return res.status(400).json({ error: "Topic and chapterTitle required" });

      const examTargetNotes: Record<string, string> = {
        "rex-pn": "REX-PN (Canada). Use Canadian terminology: RPN, CNO, SI units (mmol/L, µmol/L), °C, kg. CAT-based exam, RPN scope.",
        "nclex-pn": "NCLEX-PN (US). Use American terminology: LPN/LVN, conventional units (mEq/L, mg/dL), °F, lbs. LPN scope under RN supervision.",
        "nclex-rn": "NCLEX-RN. Use NCSBN CJMM. Include NGN question types. Full RN scope, clinical judgment focus. Conventional units.",
        "np": "NP Certification (AANP/ANCC). Advanced practice level. Differential diagnosis, prescribing, autonomous practice.",
      };
      const examNote = examTargetNotes[examTarget || "nclex-rn"] || examTargetNotes["nclex-rn"];

      const systemPrompts: Record<string, string> = {};
      const bundleChapterPrompt = `You are an expert nursing education content writer for NurseNest. Generate ONE detailed chapter/section for a nursing cram guide. Return ONLY valid JSON object:
{
  "title": "Chapter Title",
  "objects": [
    {"type":"heading","content":"Main heading"},
    {"type":"paragraph","content":"Detailed multi-sentence explanation with clinical depth..."},
    {"type":"list","content":"Point 1\\nPoint 2\\nPoint 3\\nPoint 4\\nPoint 5"},
    {"type":"clinical-pearl","content":"Important clinical pearl with evidence-based reasoning..."},
    {"type":"paragraph","content":"More detailed pathophysiology or nursing interventions..."},
    {"type":"warning","content":"Critical safety alert or red flag..."},
    {"type":"list","content":"Assessment finding 1\\nAssessment finding 2\\nAssessment finding 3"},
    {"type":"callout","content":"Key takeaway with mnemonic or memory aid..."},
    {"type":"heading","content":"Sub-section heading"},
    {"type":"paragraph","content":"Additional depth..."},
    {"type":"list","content":"Drug 1 - dose, route, considerations\\nDrug 2 - dose, route, considerations"},
    {"type":"clinical-pearl","content":"Another clinical pearl..."},
    {"type":"paragraph","content":"Patient education and discharge teaching points..."},
    {"type":"warning","content":"Common exam trap or distractor explanation..."}
  ]
}
CRITICAL RULES:
- Generate at MINIMUM 20-30 content blocks for this chapter. MORE is better. Fill every section thoroughly.
- Paragraphs must be 3-6 sentences each with specific clinical detail (lab values, drug doses, assessment findings).
- Lists must have 5-8 items each with substantive detail, not single words.
- Include at least 3 clinical-pearls and 2 warnings per chapter.
- Cover: pathophysiology, assessment/diagnostics, management/treatment, nursing priorities, patient education, and exam strategies.
- Write at university textbook depth — include mechanisms of action, compensatory responses, and evidence-based rationale.
- DO NOT repeat content from previous chapters.

Exam context: ${examNote}`;

      const prevContext = previousChapters && previousChapters.length > 0
        ? `\n\nPrevious chapters already covered (DO NOT repeat this content): ${previousChapters.join(", ")}`
        : "";

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: bundleChapterPrompt },
          { role: "user", content: `Topic: ${topic}\nChapter ${chapterNumber} of ${totalChapters}: "${chapterTitle}"${prevContext}\n\nGenerate comprehensive, dense content for this chapter. This should fill multiple printed pages.` }
        ],
        temperature: 0.7,
        max_tokens: 4096,
      });

      const text = response.choices[0]?.message?.content || "{}";
      let chapter;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        chapter = jsonMatch ? JSON.parse(jsonMatch[0]) : { title: chapterTitle, objects: [] };
      } catch {
        chapter = { title: chapterTitle, objects: [] };
      }

      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(1, totalTokens);
      await logAudit(req, admin, "ai", null, "generate-bundle-chapter", null, { topic, chapterTitle, chapterNumber });
      res.json(chapter);
    } catch (e: any) {
      console.error("AI bundle chapter error:", e);
      res.status(500).json({ error: e.message || "Chapter generation failed" });
    }
  });

  app.post("/api/ai/generate-bundle-outline", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { topic, examTarget, targetPages, includeFlashcards, includeQbank } = req.body;
      if (!topic) return res.status(400).json({ error: "Topic is required" });

      const pages = Math.min(Math.max(parseInt(targetPages) || 30, 5), 100);
      const chaptersNeeded = Math.max(3, Math.ceil(pages / 4));

      const examTargetNotes: Record<string, string> = {
        "rex-pn": "REX-PN (Canada). Canadian nursing terminology.",
        "nclex-pn": "NCLEX-PN (US). American nursing terminology, LPN/LVN scope.",
        "nclex-rn": "NCLEX-RN. Full RN scope, clinical judgment, NGN question types.",
        "np": "NP Certification (AANP/ANCC). Advanced practice level.",
      };
      const examNote = examTargetNotes[examTarget || "nclex-rn"] || examTargetNotes["nclex-rn"];

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a nursing education curriculum designer. Create a detailed chapter outline for a comprehensive study guide.
Return ONLY valid JSON:
{
  "title": "Product title for the complete guide",
  "description": "2-3 sentence description for marketplace listing",
  "chapters": [
    { "title": "Chapter title", "subtopics": ["subtopic1", "subtopic2", "subtopic3"] }
  ],
  "listing": {
    "title": "SEO marketplace title",
    "description": "Compelling product description (2-3 sentences)",
    "bullets": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
  }
}
Generate exactly ${chaptersNeeded} chapters. Each chapter should have 3-5 specific subtopics.
Exam context: ${examNote}
The guide should be comprehensive enough to fill approximately ${pages} printed pages.`
          },
          { role: "user", content: `Create a ${chaptersNeeded}-chapter outline for a comprehensive study guide on: ${topic}` }
        ],
        temperature: 0.5,
        max_tokens: 2048,
      });

      const text = response.choices[0]?.message?.content || "{}";
      let outline;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        outline = jsonMatch ? JSON.parse(jsonMatch[0]) : { title: topic, chapters: [], listing: {} };
      } catch {
        outline = { title: topic, chapters: [], listing: {} };
      }

      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(1, totalTokens);
      await logAudit(req, admin, "ai", null, "generate-bundle-outline", null, { topic, targetPages: pages, chapters: chaptersNeeded });
      res.json(outline);
    } catch (e: any) {
      console.error("AI bundle outline error:", e);
      res.status(500).json({ error: e.message || "Outline generation failed" });
    }
  });

  app.post("/api/ai/generate-seo", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { title, summary, content, tier, category } = req.body;
      if (!title) return res.status(400).json({ error: "Title is required" });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const contentPreview = Array.isArray(content)
        ? content.slice(0, 5).map((b: any) => b.content || "").join(" ").substring(0, 500)
        : "";

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an SEO specialist for NurseNest, a nursing exam preparation platform. Generate SEO metadata for nursing education content. Include relevant nursing exam keywords (NCLEX, REX-PN, AANP, ANCC, FNP-BC, etc.) where appropriate. Return ONLY valid JSON:
{"seoTitle":"SEO-optimized title (50-60 chars)","seoDescription":"Meta description with keywords (150-160 chars)","seoKeywords":["keyword1","keyword2","keyword3","keyword4","keyword5"],"primaryKeyword":"main target keyword","secondaryKeywords":["secondary1","secondary2","secondary3"]}`
          },
          {
            role: "user",
            content: `Title: ${title}\nSummary: ${summary || ""}\nTier: ${tier || "general"}\nCategory: ${category || ""}\nContent preview: ${contentPreview}`
          }
        ],
        temperature: 0.3,
        max_tokens: 512,
      });

      const text = response.choices[0]?.message?.content || "{}";
      let seo;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        seo = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      } catch {
        seo = {};
      }

      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(1, totalTokens);
      await logAudit(req, admin, "ai", null, "generate-seo", null, { title });
      res.json(seo);
    } catch (e: any) {
      console.error("AI SEO error:", e);
      res.status(500).json({ error: e.message || "AI SEO generation failed" });
    }
  });

  app.post("/api/ai/chat-assist", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { message, contentContext } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant for NurseNest content editors. You help with nursing education content creation, editing, and SEO optimization. You can:
- Answer questions about nursing topics
- Suggest content improvements
- Help write clinical pearls and key points
- Suggest SEO keywords and descriptions
- Help structure lesson content
Keep responses concise and actionable.`
          },
          ...(contentContext ? [{ role: "user" as const, content: `Current content context: ${JSON.stringify(contentContext).substring(0, 1000)}` }] : []),
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      const reply = response.choices[0]?.message?.content || "I couldn't generate a response.";
      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(1, totalTokens);
      res.json({ reply });
    } catch (e: any) {
      console.error("AI chat error:", e);
      res.status(500).json({ error: e.message || "AI chat failed" });
    }
  });

  // --------------------
  // Admin verify endpoint (single source of truth)
  // --------------------
  app.post("/api/admin/verify", async (req, res) => {
    try {
      const username = String(req.body?.username || "");
      const password = String(req.body?.password || "");
      if (!username || !password) return res.json({ isAdmin: false });

      const user = await storage.getUserByUsername(username);
      const ok = Boolean(user && user.password === password && user.tier === "admin");
      res.json({ isAdmin: ok });
    } catch {
      res.json({ isAdmin: false });
    }
  });

  // --------------------
  // AI Safety Config (admin-only)
  // --------------------
  app.get("/api/admin/ai-config", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      res.json(getAiConfig());
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai-config", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { enabled, maxItemsPerDay, maxTokensPerDay, freeTierDailyLimit, rateLimitPerMinute } = req.body;
      setAiConfig({ enabled, maxItemsPerDay, maxTokensPerDay, freeTierDailyLimit, rateLimitPerMinute });
      await logAudit(req, admin, "ai-config", null, "update", null, { enabled, maxItemsPerDay, maxTokensPerDay, freeTierDailyLimit, rateLimitPerMinute });
      res.json(getAiConfig());
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // AI Batch Generation (admin-only, draft-only)
  // --------------------
  app.post("/api/admin/ai/exam-questions/generate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { tier, topic, quantity, questionTypes } = req.body;
      if (!tier || !topic || !quantity || quantity < 1 || quantity > 50) {
        return res.status(400).json({ error: "Invalid parameters. tier, topic required, quantity 1-50." });
      }

      const validTiers = ["free", "rpn", "rn", "np"];
      if (!validTiers.includes(tier)) return res.status(400).json({ error: "Invalid tier" });

      const types = questionTypes || ["mcq", "sata", "prioritization", "pharmacology", "lab-values"];
      const batchId = `batch-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const prompt = `Generate ${quantity} nursing exam questions for the "${topic}" topic at the ${tier.toUpperCase()} level.
Mix question types from: ${types.join(", ")}.
For each question, return a JSON array of objects with these fields:
- "question": the question stem (scenario-based, clinical, 2-4 sentences)
- "type": one of ${types.map((t: string) => `"${t}"`).join(", ")}
- "options": array of 4 answer choices (strings)
- "correctIndex": 0-based index of the correct answer
- "rationale": detailed explanation (2-3 sentences) of why the correct answer is right and why the distractors are wrong
- "difficulty": "easy", "medium", or "hard"
- "tags": array of 2-3 relevant tags

Return ONLY the JSON array, no other text.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a nursing exam question writer specializing in NCLEX-style questions for Canadian nursing students. Create clinically accurate, scenario-based questions." },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 4000,
      });

      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(quantity, totalTokens);
      await logAudit(req, admin, "ai-batch-exam", null, "generate", null, { batchId, tier, topic, quantity, totalTokens });

      let questions: any[] = [];
      try {
        const raw = response.choices[0]?.message?.content || "[]";
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        questions = JSON.parse(cleaned);
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }

      const drafts = questions.map((q: any, i: number) => ({
        ...q,
        id: `${batchId}-q${i}`,
        batchId,
        tier,
        topic,
        status: "draft",
        source: "ai",
        promptVersion: "v1",
        createdAt: new Date().toISOString(),
      }));

      res.json({ batchId, count: drafts.length, drafts, tokensUsed: totalTokens });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ai/flashcards/generate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { topic, quantity, tier, deckTitle } = req.body;
      if (!topic || !quantity || quantity < 1 || quantity > 100) {
        return res.status(400).json({ error: "Invalid parameters. topic required, quantity 1-100." });
      }

      const batchId = `batch-fc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const prompt = `Generate ${quantity} nursing flashcards for the topic "${topic}" at the ${(tier || "rn").toUpperCase()} level.
Each flashcard should be a JSON object with:
- "front": a concise clinical question or concept (1-2 sentences)
- "back": a clear, accurate answer with key details (2-4 sentences)
- "tags": array of 2-3 relevant tags
- "difficulty": "easy", "medium", or "hard"

Focus on high-yield exam content. Include drug names, lab values, clinical signs, and nursing interventions where relevant.
Return ONLY a JSON array of flashcard objects, no other text.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a nursing education expert creating flashcards for Canadian nursing exam preparation. Focus on clinically relevant, exam-ready content." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });

      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(quantity, totalTokens);
      await logAudit(req, admin, "ai-batch-flashcards", null, "generate", null, { batchId, topic, quantity, tier, totalTokens });

      let cards: any[] = [];
      try {
        const raw = response.choices[0]?.message?.content || "[]";
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        cards = JSON.parse(cleaned);
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }

      const drafts = cards.map((c: any, i: number) => ({
        ...c,
        id: `${batchId}-fc${i}`,
        batchId,
        topic,
        tier: tier || "rn",
        deckTitle: deckTitle || topic,
        status: "draft",
        source: "ai",
        promptVersion: "v1",
        createdAt: new Date().toISOString(),
      }));

      res.json({ batchId, count: drafts.length, drafts, tokensUsed: totalTokens });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Auth
  // --------------------
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByUsername(data.username);
      if (existing) return res.status(400).json({ error: "Username already taken" });
      const user = await storage.createUser(data);
      res.json({
        id: user.id,
        username: user.username,
        tier: user.tier,
        subscriptionStatus: user.subscriptionStatus,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });

      if (username === "erikanim" && user.tier !== "admin") {
        await storage.updateUserTier(user.id, "admin");
        user.tier = "admin";
        user.subscriptionStatus = "active";
      }

      res.json({
        id: user.id,
        username: user.username,
        tier: user.tier,
        subscriptionStatus: user.subscriptionStatus,
        email: user.email,
        region: user.region,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get("/api/user/:userId", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      if (user.username === "erikanim" && user.tier !== "admin") {
        await storage.updateUserTier(user.id, "admin");
        user.tier = "admin";
        user.subscriptionStatus = "active";
      }

      res.json({
        id: user.id,
        username: user.username,
        tier: user.tier,
        subscriptionStatus: user.subscriptionStatus,
        email: user.email,
        region: user.region,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Stripe
  // --------------------
  app.get("/api/stripe/publishable-key", async (_req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/stripe/create-checkout", async (req, res) => {
    try {
      const { userId, tier, duration, region } = req.body;
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const stripe = await getUncachableStripeClient();

      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          metadata: { userId: user.id, username: user.username },
        });
        await storage.updateUserStripeInfo(user.id, { stripeCustomerId: customer.id });
        customerId = customer.id;
      }

      const isCAD = region === "CA";
      const currency = isCAD ? "cad" : "usd";

      const priceTable: Record<string, Record<string, { CAD: number; USD: number }>> = {
        rpn: {
          monthly: { CAD: 2999, USD: 2199 },
          "3-month": { CAD: 7499, USD: 5499 },
          "6-month": { CAD: 13499, USD: 9999 },
          yearly: { CAD: 23999, USD: 17999 },
        },
        rn: {
          monthly: { CAD: 3999, USD: 2999 },
          "3-month": { CAD: 9999, USD: 7499 },
          "6-month": { CAD: 17999, USD: 13499 },
          yearly: { CAD: 31999, USD: 23999 },
        },
        np: {
          monthly: { CAD: 4999, USD: 3699 },
          "3-month": { CAD: 12499, USD: 9499 },
          "6-month": { CAD: 22499, USD: 16999 },
          yearly: { CAD: 39999, USD: 29999 },
        },
        "lab-values": { monthly: { CAD: 999, USD: 999 } },
        "med-math": { monthly: { CAD: 999, USD: 999 } },
        "practice-tools": { monthly: { CAD: 1499, USD: 1499 } },
        "1-day": { "one-time": { CAD: 499, USD: 399 } },
        "3-day": { "one-time": { CAD: 999, USD: 799 } },
      };

      const tierNames: Record<string, string> = {
        rpn: "NurseNest RPN/LVN",
        rn: "NurseNest RN/NCLEX",
        np: "NurseNest NP Advanced",
        "lab-values": "NurseNest Lab Interpretation Unlimited",
        "med-math": "NurseNest Med Math Unlimited",
        "practice-tools": "NurseNest All Practice Tools",
        "1-day": "NurseNest 1-Day Trial Pass",
        "3-day": "NurseNest 3-Day Trial Pass",
      };

      const selectedDuration = duration || "monthly";
      const tierPrices = priceTable[tier];
      if (!tierPrices) return res.status(400).json({ error: "Invalid tier" });

      const durationPrices = tierPrices[selectedDuration] || tierPrices["monthly"];
      if (!durationPrices) return res.status(400).json({ error: "Invalid duration" });

      const amount = isCAD ? durationPrices.CAD : durationPrices.USD;

      const intervalMap: Record<string, { interval: "month" | "year"; interval_count: number }> = {
        monthly: { interval: "month", interval_count: 1 },
        "3-month": { interval: "month", interval_count: 3 },
        "6-month": { interval: "month", interval_count: 6 },
        yearly: { interval: "year", interval_count: 1 },
      };

      const durationLabels: Record<string, string> = {
        monthly: "Monthly",
        "3-month": "3-Month",
        "6-month": "6-Month",
        yearly: "Yearly",
      };

      const recurring = intervalMap[selectedDuration] || intervalMap["monthly"];
      const durationLabel = durationLabels[selectedDuration] || "Monthly";

      const baseUrl = `${req.protocol}://${req.get("host")}`;

      if (selectedDuration === "one-time" || tier === "lab-values" || tier === "med-math" || tier === "practice-tools") {
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency,
                product_data: {
                  name: tierNames[tier],
                  description: `One-time access to ${tierNames[tier]}`,
                },
                unit_amount: amount,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          allow_promotion_codes: true,
          success_url: `${baseUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
          cancel_url: `${baseUrl}/pricing`,
          metadata: { userId: user.id, tier, duration: selectedDuration },
        });
        return res.json({ url: session.url });
      }

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: tierNames[tier],
                description: `${durationLabel} subscription to ${tierNames[tier]} content`,
              },
              unit_amount: amount,
              recurring: { interval: recurring.interval, interval_count: recurring.interval_count },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        success_url: `${baseUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
        cancel_url: `${baseUrl}/pricing`,
        metadata: { userId: user.id, tier, duration: selectedDuration },
      });

      res.json({ url: session.url });
    } catch (e: any) {
      console.error("Checkout error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/stripe/verify-session", async (req, res) => {
    try {
      const { sessionId, userId, tier } = req.body;
      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        await storage.updateUserStripeInfo(userId, {
          stripeSubscriptionId: session.subscription as string,
          subscriptionStatus: "active",
          tier,
        });
        res.json({ success: true, tier });
      } else {
        res.json({ success: false });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/stripe/portal", async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await storage.getUser(userId);
      if (!user?.stripeCustomerId) return res.status(400).json({ error: "No subscription found" });

      const stripe = await getUncachableStripeClient();
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${req.protocol}://${req.get("host")}/lessons`,
      });

      res.json({ url: portalSession.url });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/subscription/:userId", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      let daysRemaining: number | null = null;
      let currentPeriodEnd: string | null = null;

      if (user.stripeSubscriptionId) {
        try {
          const { db: pgPool } = await import("./storage");
          const result = await pgPool.execute(
            sql`SELECT current_period_end, status FROM stripe.subscriptions WHERE id = ${user.stripeSubscriptionId} LIMIT 1`,
          );
          if (result.rows && result.rows.length > 0) {
            const sub = result.rows[0] as any;
            if (sub.current_period_end) {
              const endDate = new Date(sub.current_period_end * 1000);
              currentPeriodEnd = endDate.toISOString();
              const now = new Date();
              daysRemaining = Math.max(
                0,
                Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
              );
            }
          }
        } catch {
          // Stripe sync table might not be available yet; ignore
        }
      }

      res.json({
        tier: user.tier || "free",
        subscriptionStatus: user.subscriptionStatus || "inactive",
        hasAccess: user.subscriptionStatus === "active",
        daysRemaining,
        currentPeriodEnd,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Notes
  // --------------------
  app.get("/api/notes/:userId", async (req, res) => {
    try {
      const notes = await storage.getNotesByUser(req.params.userId);
      res.json(notes);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/notes/:userId/:lessonId", async (req, res) => {
    try {
      const note = await storage.getNote(req.params.userId, req.params.lessonId);
      res.json(note || null);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const data = insertNoteSchema.parse(req.body);
      const note = await storage.upsertNote(data);
      res.json(note);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/notes/:userId/:lessonId", async (req, res) => {
    try {
      await storage.deleteNote(req.params.userId, req.params.lessonId);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // User flashcards
  // --------------------
  app.get("/api/user-flashcards/:userId", async (req, res) => {
    try {
      const cards = await storage.getUserFlashcards(req.params.userId);
      res.json(cards);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/user-flashcards/validate", async (req, res) => {
    try {
      const { question, answer } = req.body;
      if (!question || !answer) return res.status(400).json({ error: "Missing question and answer" });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a medical accuracy validator for nursing education flashcards. Evaluate whether the following flashcard contains medically accurate information appropriate for nursing students (RPN/LVN, RN, or NP level). 
            
Respond with ONLY valid JSON in this exact format:
{"accurate": true, "feedback": "Brief explanation"} or {"accurate": false, "feedback": "Specific explanation of what is medically incorrect and what the correct information is"}

Rules:
- The content must be factually correct medical/nursing information
- Common mnemonics and nursing study aids are acceptable
- Minor wording variations are acceptable as long as the core medical facts are correct
- Reject content that contains dangerous misinformation that could harm patients
- Reject non-medical/non-nursing content (recipes, jokes, unrelated trivia)
- Be reasonably lenient - accept content that is generally correct even if not perfectly worded`
          },
          {
            role: "user",
            content: `Question/Front: ${question}\n\nAnswer/Back: ${answer}`
          }
        ],
        temperature: 0.1,
        max_tokens: 300,
      });

      const text = response.choices[0]?.message?.content || "";
      try {
        const parsed = JSON.parse(text.replace(/```json\n?|\n?```/g, "").trim());
        res.json({ accurate: parsed.accurate, feedback: parsed.feedback });
      } catch {
        res.json({ accurate: true, feedback: "Validation completed" });
      }
    } catch (e: any) {
      console.error("Flashcard validation error:", e.message);
      res.json({ accurate: true, feedback: "Validation unavailable - card accepted" });
    }
  });

  app.post("/api/user-flashcards", async (req, res) => {
    try {
      const { userId, question, answer, category } = req.body;
      if (!userId || !question || !answer) return res.status(400).json({ error: "Missing required fields" });

      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const existingCards = await storage.getUserFlashcards(userId);
      const FREE_LIMIT = 50;
      const isPaid = user.tier !== "free" && user.subscriptionStatus === "active";

      if (!isPaid && existingCards.length >= FREE_LIMIT) {
        return res.status(403).json({ 
          error: `Free accounts are limited to ${FREE_LIMIT} flashcards. Upgrade your plan to create unlimited flashcards.`,
          limit: FREE_LIMIT,
          current: existingCards.length,
          upgradeRequired: true
        });
      }

      const card = await storage.createUserFlashcard({
        userId,
        question,
        answer,
        category: category || "My Cards",
      });
      res.json({ ...card, remaining: isPaid ? null : FREE_LIMIT - existingCards.length - 1 });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/user-flashcards/:id", async (req, res) => {
    try {
      const { userId, question, answer, category } = req.body;
      if (!userId) return res.status(400).json({ error: "Missing userId" });
      const updates: any = {};
      if (question !== undefined) updates.question = question;
      if (answer !== undefined) updates.answer = answer;
      if (category !== undefined) updates.category = category;
      const card = await storage.updateUserFlashcard(req.params.id, userId, updates);
      res.json(card);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/user-flashcards/:id", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "Missing userId" });
      await storage.deleteUserFlashcard(req.params.id, userId);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/user-flashcards/ai-generate", async (req, res) => {
    try {
      const { userId, prompt, count, category } = req.body;
      if (!userId || !prompt?.trim()) return res.status(400).json({ error: "userId and prompt required" });

      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const existingCards = await storage.getUserFlashcards(userId);
      const FREE_LIMIT = 50;
      const isPaid = user.tier !== "free" && user.subscriptionStatus === "active";
      const remaining = isPaid ? 999 : FREE_LIMIT - existingCards.length;

      if (remaining <= 0) {
        return res.status(403).json({
          error: `You've reached the free limit of ${FREE_LIMIT} cards. Upgrade your plan to create unlimited flashcards with AI.`,
          upgradeRequired: true,
        });
      }

      const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
      const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
      if (!apiKey) return res.status(503).json({ error: "AI generation unavailable" });

      const perGenMax = isPaid ? 50 : 25;
      const numCards = Math.min(Math.max(parseInt(count) || 5, 1), Math.min(perGenMax, remaining));
      const region = (req as any).region || "US";
      const regionNote = region === "CA"
        ? "Use Canadian nursing terminology, SI units, and Canadian exam standards (REx-PN, CNO)."
        : "Use American nursing terminology, conventional units, and US exam standards (NCLEX).";

      const maxTokens = numCards > 25 ? 8192 : 4096;
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey, baseURL });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a nursing education flashcard generator for NurseNest. Generate high-quality, exam-ready flashcards for nursing students. ${regionNote} Each card should have a clear question and concise, accurate answer. Return ONLY valid JSON.`,
          },
          {
            role: "user",
            content: `Generate exactly ${numCards} nursing flashcards about: ${prompt}\n\nReturn as JSON: {"cards":[{"question":"question text","answer":"answer text"}]}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: maxTokens,
      });

      const text = completion.choices[0]?.message?.content || '{"cards":[]}';
      const parsed = JSON.parse(text);
      const cards = (parsed.cards || []).map((c: any) => ({
        question: c.question || c.front || "",
        answer: c.answer || c.back || "",
      })).filter((c: any) => c.question && c.answer);

      res.json({ cards, category: category || "Study Cards" });
    } catch (e: any) {
      console.error("AI flashcard generation error:", e);
      res.status(500).json({ error: "AI generation failed. Please try again." });
    }
  });

  app.post("/api/user-flashcards/ai-generate-from-notes", async (req, res) => {
    try {
      const { userId, notes, count, category } = req.body;
      if (!userId || !notes?.trim()) return res.status(400).json({ error: "userId and notes text required" });
      if (notes.length > 50000) return res.status(400).json({ error: "Notes too long. Please limit to 50,000 characters." });

      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const existingCards = await storage.getUserFlashcards(userId);
      const FREE_LIMIT = 50;
      const isPaid = user.tier !== "free" && user.subscriptionStatus === "active";
      const remaining = isPaid ? 999 : FREE_LIMIT - existingCards.length;

      if (remaining <= 0) {
        return res.status(403).json({
          error: `You've reached the free limit of ${FREE_LIMIT} cards. Upgrade your plan to create unlimited flashcards with AI.`,
          upgradeRequired: true,
        });
      }

      const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
      const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
      if (!apiKey) return res.status(503).json({ error: "AI generation unavailable" });

      const perGenMax = isPaid ? 50 : 25;
      const numCards = Math.min(Math.max(parseInt(count) || 10, 1), Math.min(perGenMax, remaining));
      const region = (req as any).region || "US";
      const regionNote = region === "CA"
        ? "Use Canadian nursing terminology, SI units, and Canadian exam standards (REx-PN, CNO)."
        : "Use American nursing terminology, conventional units, and US exam standards (NCLEX).";

      const truncatedNotes = notes.length > 30000 ? notes.substring(0, 30000) + "\n[Notes truncated...]" : notes;
      const maxTokens = numCards > 25 ? 8192 : 4096;
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey, baseURL });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a nursing education flashcard generator for NurseNest. You will be given a student's study notes and must convert them into high-quality, exam-ready flashcards. ${regionNote} Extract the most important concepts, facts, and clinical details from the notes. Each card should have a clear question and concise, accurate answer. Return ONLY valid JSON.`,
          },
          {
            role: "user",
            content: `Convert the following study notes into exactly ${numCards} flashcards. Focus on the most testable and clinically important content:\n\n---\n${truncatedNotes}\n---\n\nReturn as JSON: {"cards":[{"question":"question text","answer":"answer text"}]}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: maxTokens,
      });

      const text = completion.choices[0]?.message?.content || '{"cards":[]}';
      const parsed = JSON.parse(text);
      const cards = (parsed.cards || []).map((c: any) => ({
        question: c.question || c.front || "",
        answer: c.answer || c.back || "",
      })).filter((c: any) => c.question && c.answer);

      res.json({ cards, category: category || "From Notes" });
    } catch (e: any) {
      console.error("AI notes-to-flashcard generation error:", e);
      res.status(500).json({ error: "AI generation failed. Please try again." });
    }
  });

  // --------------------
  // Test results
  // --------------------
  app.get("/api/test-results/:userId", async (req, res) => {
    try {
      const lessonId = req.query.lessonId as string | undefined;
      const results = await storage.getTestResults(req.params.userId, lessonId);
      res.json(results);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/test-results", async (req, res) => {
    try {
      const data = insertTestResultSchema.parse(req.body);
      const result = await storage.createTestResult(data);
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // --------------------
  // Progress
  // --------------------
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/progress/:userId/:lessonId", async (req, res) => {
    try {
      const progress = await storage.getProgressForLesson(req.params.userId, req.params.lessonId);
      res.json(progress || null);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const data = insertUserProgressSchema.parse(req.body);
      const progress = await storage.upsertProgress(data);
      res.json(progress);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // --------------------
  // Admin analytics (already protected – kept)
  // --------------------
  app.post("/api/admin/analytics", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(401).json({ error: "Authentication required" });
      }
      const adminUser = await storage.getUserByUsername(username);
      if (!adminUser || adminUser.password !== password || adminUser.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const dbStorage = storage as DatabaseStorage;
      const [allUsers, allResults, allProgress, allNotes] = await Promise.all([
        dbStorage.getAllUsers(),
        dbStorage.getAllTestResults(),
        dbStorage.getAllProgress(),
        dbStorage.getAllNotes(),
      ]);

      const tierCounts: Record<string, number> = {};
      const regionCounts: Record<string, number> = {};
      const statusCounts: Record<string, number> = {};

      allUsers.forEach((u: any) => {
        tierCounts[u.tier || "free"] = (tierCounts[u.tier || "free"] || 0) + 1;
        regionCounts[u.region || "US"] = (regionCounts[u.region || "US"] || 0) + 1;
        statusCounts[u.subscriptionStatus || "inactive"] =
          (statusCounts[u.subscriptionStatus || "inactive"] || 0) + 1;
      });

      const now = new Date();
      const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const recentTests7 = allResults.filter((r: any) => new Date(r.completedAt) > last7Days);
      const recentTests30 = allResults.filter((r: any) => new Date(r.completedAt) > last30Days);
      const recentProgress7 = allProgress.filter((p: any) => new Date(p.lastAccessed) > last7Days);
      const recentProgress30 = allProgress.filter((p: any) => new Date(p.lastAccessed) > last30Days);

      const activeUsers7 = new Set([...recentTests7.map((r: any) => r.userId), ...recentProgress7.map((p: any) => p.userId)]).size;
      const activeUsers30 = new Set([...recentTests30.map((r: any) => r.userId), ...recentProgress30.map((p: any) => p.userId)]).size;

      const lessonPopularity: Record<string, number> = {};
      allProgress.forEach((p: any) => {
        lessonPopularity[p.lessonId] = (lessonPopularity[p.lessonId] || 0) + 1;
      });

      const topLessons = Object.entries(lessonPopularity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([lessonId, count]) => ({ lessonId, accessCount: count }));

      const avgScore =
        allResults.length > 0
          ? Math.round(
              allResults.reduce((sum: number, r: any) => sum + (r.score / r.totalQuestions) * 100, 0) / allResults.length,
            )
          : 0;

      const userList = allUsers.map((u: any) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        tier: u.tier || "free",
        subscriptionStatus: u.subscriptionStatus || "inactive",
        region: u.region || "US",
        testsCompleted: allResults.filter((r: any) => r.userId === u.id).length,
        lessonsAccessed: allProgress.filter((p: any) => p.userId === u.id).length,
        notesCreated: allNotes.filter((n: any) => n.userId === u.id).length,
        lastActivity: (() => {
          const userTests = allResults.filter((r: any) => r.userId === u.id);
          const userProg = allProgress.filter((p: any) => p.userId === u.id);
          const dates = [...userTests.map((r: any) => new Date(r.completedAt)), ...userProg.map((p: any) => new Date(p.lastAccessed))];
          return dates.length > 0 ? new Date(Math.max(...dates.map((d) => d.getTime()))) : null;
        })(),
      }));

      const recentActivity = allResults.slice(0, 20).map((r: any) => {
        const user = allUsers.find((u: any) => u.id === r.userId);
        return {
          username: user?.username || "Unknown",
          lessonId: r.lessonId,
          testType: r.testType,
          score: r.score,
          totalQuestions: r.totalQuestions,
          date: r.completedAt,
        };
      });

      res.json({
        overview: {
          totalUsers: allUsers.length,
          activeUsers7Day: activeUsers7,
          activeUsers30Day: activeUsers30,
          totalTests: allResults.length,
          totalLessonsAccessed: allProgress.length,
          totalNotes: allNotes.length,
          averageTestScore: avgScore,
        },
        tiers: tierCounts,
        regions: regionCounts,
        subscriptionStatus: statusCounts,
        topLessons,
        users: userList,
        recentActivity,
      });
    } catch (e: any) {
      console.error("Admin analytics error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Admin Promotions (Stripe coupon + promo code management)
  // --------------------
  app.post("/api/admin/promotions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { code, discountType, amount, duration, maxRedemptions, expiresAt } = req.body;

      if (!code || !discountType || !amount || !duration) {
        return res.status(400).json({ error: "Missing required fields: code, discountType, amount, duration" });
      }

      if (!["percent_off", "amount_off"].includes(discountType)) {
        return res.status(400).json({ error: "discountType must be percent_off or amount_off" });
      }

      if (!["once", "repeating", "forever"].includes(duration)) {
        return res.status(400).json({ error: "duration must be once, repeating, or forever" });
      }

      const stripe = await getUncachableStripeClient();

      const couponParams: any = {
        duration,
        name: `Promo: ${code}`,
      };

      if (discountType === "percent_off") {
        couponParams.percent_off = Number(amount);
      } else {
        couponParams.amount_off = Math.round(Number(amount) * 100);
        couponParams.currency = "usd";
      }

      if (duration === "repeating") {
        couponParams.duration_in_months = 3;
      }

      if (maxRedemptions) {
        couponParams.max_redemptions = Number(maxRedemptions);
      }

      if (expiresAt) {
        couponParams.redeem_by = Math.floor(new Date(expiresAt).getTime() / 1000);
      }

      const coupon = await stripe.coupons.create(couponParams);

      const promoCodeParams: any = {
        coupon: coupon.id,
        code: code.toUpperCase(),
      };

      if (maxRedemptions) {
        promoCodeParams.max_redemptions = Number(maxRedemptions);
      }

      if (expiresAt) {
        promoCodeParams.expires_at = Math.floor(new Date(expiresAt).getTime() / 1000);
      }

      const promoCode = await stripe.promotionCodes.create(promoCodeParams);

      res.json({
        id: promoCode.id,
        code: promoCode.code,
        couponId: coupon.id,
        discountType,
        amount: Number(amount),
        duration,
        maxRedemptions: maxRedemptions || null,
        expiresAt: expiresAt || null,
        active: promoCode.active,
      });
    } catch (e: any) {
      console.error("Create promotion error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/promotions", async (req, res) => {
    try {
      const username = String(req.query.username || "");
      const password = String(req.query.password || "");
      if (!username || !password) return res.status(401).json({ error: "Authentication required" });

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const stripe = await getUncachableStripeClient();

      const promotionCodes = await stripe.promotionCodes.list({ limit: 100, expand: ["data.coupon"] });

      const promos = promotionCodes.data.map((pc: any) => ({
        id: pc.id,
        code: pc.code,
        couponId: pc.coupon?.id || pc.coupon,
        discountType: pc.coupon?.percent_off ? "percent_off" : "amount_off",
        amount: pc.coupon?.percent_off || (pc.coupon?.amount_off ? pc.coupon.amount_off / 100 : 0),
        duration: pc.coupon?.duration || "once",
        maxRedemptions: pc.max_redemptions,
        timesRedeemed: pc.times_redeemed,
        active: pc.active,
        expiresAt: pc.expires_at ? new Date(pc.expires_at * 1000).toISOString() : null,
        created: new Date(pc.created * 1000).toISOString(),
      }));

      res.json(promos);
    } catch (e: any) {
      console.error("List promotions error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/promotions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const stripe = await getUncachableStripeClient();
      const promoCode = await stripe.promotionCodes.update(req.params.id, { active: false });

      res.json({ success: true, id: promoCode.id, active: promoCode.active });
    } catch (e: any) {
      console.error("Deactivate promotion error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Report card (unchanged)
  // --------------------
  app.get("/api/report-card/:userId", async (req, res) => {
    try {
      const [progress, results] = await Promise.all([storage.getUserProgress(req.params.userId), storage.getTestResults(req.params.userId)]);
      const lessonStats: Record<string, any> = {};

      progress.forEach((p) => {
        lessonStats[p.lessonId] = {
          completed: p.completed === "true",
          preTestScore: p.preTestScore,
          postTestScore: p.postTestScore,
          lastAccessed: p.lastAccessed,
        };
      });

      results.forEach((r) => {
        if (!lessonStats[r.lessonId]) lessonStats[r.lessonId] = {};
        if (!lessonStats[r.lessonId].testHistory) lessonStats[r.lessonId].testHistory = [];
        lessonStats[r.lessonId].testHistory.push({
          type: r.testType,
          score: r.score,
          total: r.totalQuestions,
          date: r.completedAt,
        });
      });

      const totalLessons = Object.keys(lessonStats).length;
      const completedLessons = Object.values(lessonStats).filter((s: any) => s.completed).length;
      const avgScore =
        results.length > 0
          ? Math.round(results.reduce((sum, r) => sum + (r.score / r.totalQuestions) * 100, 0) / results.length)
          : 0;

      res.json({
        totalLessonsStarted: totalLessons,
        completedLessons,
        averageScore: avgScore,
        totalTestsTaken: results.length,
        lessonStats,
        recentActivity: results.slice(0, 10),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Content - Public typed endpoints
  // --------------------
  app.get("/api/content/lessons", async (req, res) => {
    try {
      const region = req.region || "US";
      const regionFilter = buildRegionFilter(region);
      const result = await pool.query(
        `SELECT id, title, slug, category, body_system, tier, summary, tags, seo_description, published_at, updated_at, region_scope FROM content_items WHERE status = 'published' AND type = 'lesson' AND ${regionFilter} ORDER BY published_at DESC NULLS LAST`
      );
      const items = snakeToCamel(result.rows);

      const lang = (req.query.lang as string) || req.lang || "en";
      if (lang !== "en" && items.length > 0) {
        const contentIds = items.map((item: any) => item.id);
        const translatedTitles = await getBulkTranslatedTitles("content_item", contentIds, lang);
        for (const item of items) {
          const translatedTitle = translatedTitles.get(item.id);
          if (translatedTitle) {
            item.title = translatedTitle;
          }
        }
      }

      res.json(items);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/flashcard-sets", async (req, res) => {
    try {
      const region = req.region || "US";
      const regionFilter = buildRegionFilter(region);
      const result = await pool.query(
        `SELECT id, title, slug, category, tier, summary, tags, published_at, updated_at, content, region_scope FROM content_items WHERE status = 'published' AND type = 'flashcard-set' AND ${regionFilter} ORDER BY published_at DESC NULLS LAST`
      );
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/exams", async (req, res) => {
    try {
      const region = req.region || "US";
      const regionFilter = buildRegionFilter(region);
      const result = await pool.query(
        `SELECT id, title, slug, category, tier, summary, tags, published_at, updated_at, region_scope FROM content_items WHERE status = 'published' AND type = 'exam' AND ${regionFilter} ORDER BY published_at DESC NULLS LAST`
      );
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Content - General
  // --------------------
  app.get("/api/content", async (req, res) => {
    try {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      const { status, username, password, type, category } = req.query;

      if (status === "all" && username && password) {
        const adminUser = await storage.getUserByUsername(username as string);
        if (adminUser && adminUser.password === password && adminUser.tier === "admin") {
          let items: any[] = [];
          try {
            const result = await pool.query("SELECT * FROM content_items ORDER BY updated_at DESC NULLS LAST");
            items = snakeToCamel(result.rows);
          } catch (e: any) {
            console.error("[Content API] Admin raw SQL error:", e.message);
            try {
              items = await storage.getAllContentItems();
            } catch {}
          }
          console.log(`[Content API] Admin fetch returned ${items.length} total items`);
          return res.json(items);
        }
      }

      const region = req.region || "US";
      const regionFilter = buildRegionFilter(region);
      let items: any[] = [];
      try {
        let q = `SELECT * FROM content_items WHERE status = 'published' AND ${regionFilter}`;
        const params: string[] = [];
        if (type) {
          params.push(type as string);
          q += ` AND type = $${params.length}`;
        }
        if (category) {
          params.push(category as string);
          q += ` AND category = $${params.length}`;
        }
        q += " ORDER BY published_at DESC NULLS LAST";
        const result = await pool.query(q, params);
        items = snakeToCamel(result.rows);
        console.log(`[Content API] Returned ${items.length} items for type=${type || "all"}, region=${region}`);
      } catch (sqlErr: any) {
        console.error("[Content API] SQL error:", sqlErr.message);
      }

      const lang = req.lang || "en";
      if (lang !== "en" && items.length > 0) {
        const contentIds = items.map((item: any) => item.id);
        const translatedTitles = await getBulkTranslatedTitles("content_item", contentIds, lang);
        for (const item of items) {
          const translatedTitle = translatedTitles.get(item.id);
          if (translatedTitle) {
            item._originalTitle = item.title;
            item.title = translatedTitle;
            item._translationStatus = "translated";
          } else {
            item._translationStatus = "missing";
          }
        }
      }

      res.json(items);
    } catch (e: any) {
      console.error("Content API error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/content/check-duplicate", async (req, res) => {
    try {
      const { slug, primaryKeyword, excludeId } = req.body;
      const slugExists = slug ? await storage.checkDuplicateSlug(slug, excludeId) : false;
      const keywordOverlap = primaryKeyword ? await storage.checkKeywordOverlap(primaryKeyword, excludeId) : [];
      res.json({
        slugExists,
        keywordOverlap: keywordOverlap.map((i) => ({ id: i.id, title: i.title, primaryKeyword: i.primaryKeyword })),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/:id", async (req, res) => {
    try {
      const item = await storage.getContentItem(req.params.id);
      if (!item) return res.status(404).json({ error: "Content not found" });

      if (item.status !== "published") {
        const { username, password } = req.query;
        if (!username || !password) return res.status(404).json({ error: "Content not found" });
        const adminUser = await storage.getUserByUsername(username as string);
        if (!adminUser || adminUser.password !== (password as string) || adminUser.tier !== "admin") {
          return res.status(404).json({ error: "Content not found" });
        }
      }

      if (item.tier && item.tier !== "free") {
        const userTier = await extractUserTier(req);
        if (!canAccessTier(userTier, item.tier)) {
          return res.status(403).json({ error: "Upgrade required", requiredTier: item.tier });
        }
      }

      res.json(item);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/slug/:slug", async (req, res) => {
    try {
      let item: any = null;
      try {
        item = await storage.getContentItemBySlug(req.params.slug);
      } catch (ormErr: any) {
        console.error("Drizzle ORM slug fetch error:", ormErr.message);
      }

      if (!item) {
        try {
          const result = await pool.query("SELECT * FROM content_items WHERE slug = $1 LIMIT 1", [req.params.slug]);
          item = result.rows[0] ? snakeToCamel(result.rows[0]) : null;
        } catch (sqlErr: any) {
          console.error("Raw SQL slug fetch error:", sqlErr.message);
        }
      }

      if (!item) return res.status(404).json({ error: "Content not found" });

      const requestingUserTier = await extractUserTier(req);
      const isRequestingAdmin = requestingUserTier === "admin";

      if (item.status !== "published" && !isRequestingAdmin) {
        return res.status(404).json({ error: "Content not found" });
      }

      const region = req.region || "US";
      if (!isRequestingAdmin && !isRegionAllowed(item.regionScope || item.region_scope, region)) {
        return res.status(404).json({ error: "Content not found" });
      }

      if (!isRequestingAdmin && item.tier && item.tier !== "free") {
        if (!canAccessTier(requestingUserTier, item.tier)) {
          return res.status(403).json({ error: "Upgrade required", requiredTier: item.tier });
        }
      }

      const lang = req.lang || "en";
      if (lang !== "en") {
        const contentId = item.id;
        const translations = await getTranslatedFields("content_item", contentId, lang);

        if (translations.title) item.title = translations.title.text;
        if (translations.summary) item.summary = translations.summary.text;
        if (translations.seoTitle) item.seoTitle = translations.seoTitle.text;
        if (translations.seoDescription) item.seoDescription = translations.seoDescription.text;
        if (translations.content) {
          try {
            item.content = JSON.parse(translations.content.text);
          } catch {}
        }

        const sourceFields: Record<string, string | null | undefined> = {
          title: item.title,
          summary: item.summary,
          seoTitle: item.seoTitle,
          seoDescription: item.seoDescription,
        };
        const translationStatusInfo = await getTranslationStatus("content_item", contentId, lang, sourceFields);
        const availableLanguages = await getAvailableLanguages("content_item", contentId);

        item._translation = {
          lang,
          status: translationStatusInfo.status,
          missingFields: translationStatusInfo.missing,
          staleFields: translationStatusInfo.stale,
          availableLanguages,
        };
      } else {
        item._translation = {
          lang: "en",
          status: "complete",
          missingFields: [],
          staleFields: [],
          availableLanguages: await getAvailableLanguages("content_item", item.id),
        };
      }

      res.json(item);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { username, password, ...contentData } = req.body;
      void username;
      void password;

      const validScopes = ["BOTH", "US_ONLY", "CA_ONLY"];
      const region = req.region || "US";
      const tierLower = (contentData.tier || "free").toLowerCase();
      const isRegionLockedTier = tierLower === "rpn" || tierLower === "rn" || tierLower === "lvn";
      if (isRegionLockedTier) {
        contentData.regionScope = `${region}_ONLY`;
      } else if (!contentData.regionScope) {
        contentData.regionScope = getDefaultRegionScope(contentData.tier, region);
      } else if (!validScopes.includes(contentData.regionScope)) {
        contentData.regionScope = "BOTH";
      }
      const parsed = insertContentItemSchema.parse(contentData);
      const existingBySlug = parsed.slug ? await storage.getContentItemBySlug(parsed.slug) : undefined;
      let item;
      if (existingBySlug) {
        await saveRevision(existingBySlug.id, existingBySlug, admin);
        item = await storage.updateContentItem(existingBySlug.id, parsed);
        await logAudit(req, admin, "content", item.id, "update", { title: existingBySlug.title, status: existingBySlug.status }, { title: item.title, type: item.type, status: item.status, regionScope: item.regionScope });
      } else {
        item = await storage.createContentItem(parsed);
        await logAudit(req, admin, "content", item.id, "create", null, { title: item.title, type: item.type, status: item.status, regionScope: item.regionScope });
      }
      res.json(item);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/content/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { username, password, ...contentData } = req.body;
      void username;
      void password;

      const existing = await storage.getContentItem(req.params.id);
      if (existing) {
        await saveRevision(req.params.id, existing, admin);
        const region = req.region || "US";
        const existingTier = (existing.tier || "free").toLowerCase();
        const updateTier = (contentData.tier || existingTier).toLowerCase();
        const isLockedTier = updateTier === "rpn" || updateTier === "rn" || updateTier === "lvn";
        if (isLockedTier) {
          contentData.regionScope = `${region}_ONLY`;
        } else if (contentData.regionScope) {
          const validScopes = ["BOTH", "US_ONLY", "CA_ONLY"];
          if (!validScopes.includes(contentData.regionScope)) {
            contentData.regionScope = existing.regionScope || "BOTH";
          }
        }
      }

      const isBlogType = (contentData.type || existing?.type || "").includes("blog");
      const isPublishing = contentData.status === "published" && existing?.status !== "published";
      if (isBlogType && isPublishing && !contentData.forcePublish) {
        const blogMinWords = parseInt(process.env.BLOG_MIN_WORDS || "1500", 10);
        const bodyText = extractTextFromContent(contentData.body || contentData.content || existing?.body || existing?.content);
        const wc = countWords(bodyText);
        if (wc < blogMinWords) {
          return res.status(422).json({
            error: `Blog post has ${wc} words, minimum ${blogMinWords} required for publishing. Save as draft or use forcePublish to bypass.`,
            wordCount: wc,
            minimum: blogMinWords,
            code: "POST_TOO_SHORT",
          });
        }
      }

      const item = await storage.updateContentItem(req.params.id, contentData);
      await logAudit(req, admin, "content", req.params.id, "update",
        existing ? { title: existing.title, status: existing.status } : null,
        { title: item.title, status: item.status }
      );
      res.json(item);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/content/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const existing = await storage.getContentItem(req.params.id);
      await storage.deleteContentItem(req.params.id);
      await logAudit(req, admin, "content", req.params.id, "delete", existing ? { title: existing.title, type: existing.type } : null, null);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== INTERNAL LINKING SUGGESTION ENGINE ======
  function extractTextFromContent(content: any): string {
    if (!content) return "";
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .map((block: any) => {
          if (typeof block === "string") return block;
          if (block && typeof block.content === "string") return block.content;
          return "";
        })
        .join(" ");
    }
    return "";
  }

  function countWords(text: string): number {
    return text.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean).length;
  }

  function computeLinkDensity(text: string, linkCount: number): { density: number; wordsPerLink: number; withinLimit: boolean } {
    const words = countWords(text);
    if (words === 0) return { density: 0, wordsPerLink: 0, withinLimit: true };
    const maxLinks = Math.floor(words / 200);
    return {
      density: linkCount / Math.max(1, words) * 1000,
      wordsPerLink: linkCount > 0 ? Math.round(words / linkCount) : words,
      withinLimit: linkCount <= Math.max(1, maxLinks),
    };
  }

  app.post("/api/content/internal-link-suggestions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { content, title, slug: currentSlug, summary } = req.body;
      if (!content && !summary) return res.status(400).json({ error: "content or summary required" });

      const fullText = [title || "", summary || "", extractTextFromContent(content)].join(" ");
      const textLower = fullText.toLowerCase();
      const wordCount = countWords(fullText);
      const maxLinks = Math.floor(wordCount / 200);

      const existingLinkPattern = /\[([^\]]+)\]\(([^)]+)\)|href=["']([^"']+)["']/gi;
      const alreadyLinkedUrls = new Set<string>();
      let existingMatch;
      while ((existingMatch = existingLinkPattern.exec(fullText)) !== null) {
        const url = existingMatch[2] || existingMatch[3] || "";
        alreadyLinkedUrls.add(url);
        const slugMatch = url.match(/\/lessons\/([^/?#]+)/);
        if (slugMatch) alreadyLinkedUrls.add(slugMatch[1]);
      }

      const remainingLinkBudget = Math.max(0, maxLinks - alreadyLinkedUrls.size);

      const cmsItems = await pool.query(
        `SELECT slug, title, tags, body_system, category, tier FROM content_items WHERE status = 'published' AND type = 'lesson' ORDER BY title`
      );

      const candidates: Array<{
        slug: string;
        title: string;
        url: string;
        matchType: "slug" | "title" | "tag" | "body_system";
        matchedKeyword: string;
        position: number;
        contextSnippet: string;
      }> = [];

      const seenSlugs = new Set<string>();
      if (currentSlug) seenSlugs.add(currentSlug);
      for (const linkedUrl of alreadyLinkedUrls) {
        seenSlugs.add(linkedUrl);
      }

      for (const item of cmsItems.rows) {
        if (seenSlugs.has(item.slug)) continue;

        const slugWords = item.slug.replace(/-/g, " ");
        const titleLower = (item.title || "").toLowerCase();

        const checks: Array<{ keyword: string; type: "slug" | "title" | "tag" | "body_system" }> = [
          { keyword: titleLower, type: "title" },
          { keyword: slugWords, type: "slug" },
        ];

        if (item.tags && Array.isArray(item.tags)) {
          for (const tag of item.tags) {
            if (tag && tag.length > 2) {
              checks.push({ keyword: tag.toLowerCase(), type: "tag" });
            }
          }
        }
        if (item.body_system) {
          checks.push({ keyword: item.body_system.toLowerCase().replace(/-/g, " "), type: "body_system" });
        }

        for (const check of checks) {
          if (check.keyword.length < 3) continue;
          const pos = textLower.indexOf(check.keyword);
          if (pos !== -1 && !seenSlugs.has(item.slug)) {
            const snippetStart = Math.max(0, pos - 40);
            const snippetEnd = Math.min(fullText.length, pos + check.keyword.length + 40);
            const contextSnippet = (snippetStart > 0 ? "..." : "") +
              fullText.slice(snippetStart, snippetEnd).replace(/\n/g, " ") +
              (snippetEnd < fullText.length ? "..." : "");

            candidates.push({
              slug: item.slug,
              title: item.title,
              url: `/lessons/${item.slug}`,
              matchType: check.type,
              matchedKeyword: check.keyword,
              position: pos,
              contextSnippet,
            });
            seenSlugs.add(item.slug);
            break;
          }
        }
      }

      candidates.sort((a, b) => {
        const priority: Record<string, number> = { title: 0, slug: 1, tag: 2, body_system: 3 };
        return (priority[a.matchType] ?? 4) - (priority[b.matchType] ?? 4);
      });

      const suggestions = candidates.slice(0, remainingLinkBudget);

      const existingInternalLinks = [...alreadyLinkedUrls].filter((l) => l.startsWith("/lessons/"));
      const existingExternalLinks = [...alreadyLinkedUrls].filter((l) => l.startsWith("http"));
      const density = computeLinkDensity(fullText, existingInternalLinks.length);

      res.json({
        suggestions,
        meta: {
          wordCount,
          maxLinksAllowed: maxLinks,
          remainingLinkBudget,
          existingInternalLinks: existingInternalLinks.length,
          existingExternalLinks: existingExternalLinks.length,
          totalCandidatesFound: candidates.length,
          density,
        },
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/:id/link-density", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const item = await storage.getContentItem(req.params.id);
      if (!item) return res.status(404).json({ error: "Content not found" });

      const fullText = [item.title || "", item.summary || "", extractTextFromContent(item.content)].join(" ");
      const wordCount = countWords(fullText);

      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)|href=["']([^"']+)["']/gi;
      const links: Array<{ url: string; text: string; isInternal: boolean }> = [];
      let match;
      while ((match = linkPattern.exec(fullText)) !== null) {
        const url = match[2] || match[3] || "";
        links.push({
          url,
          text: match[1] || "",
          isInternal: url.startsWith("/"),
        });
      }

      const internalLinks = links.filter((l) => l.isInternal);
      const duplicateLinks = internalLinks
        .map((l) => l.url)
        .filter((url, i, arr) => arr.indexOf(url) !== i);

      const density = computeLinkDensity(fullText, internalLinks.length);

      res.json({
        contentId: req.params.id,
        slug: item.slug,
        title: item.title,
        wordCount,
        internalLinkCount: internalLinks.length,
        externalLinkCount: links.filter((l) => !l.isInternal).length,
        density,
        maxLinksAllowed: Math.max(1, Math.floor(wordCount / 200)),
        duplicateLinks: [...new Set(duplicateLinks)],
        hasDuplicates: duplicateLinks.length > 0,
        links: internalLinks,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/audit-logs", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const entityType = req.query.entityType as string;
      let query = `SELECT * FROM audit_logs`;
      const params: any[] = [];
      if (entityType) {
        query += ` WHERE entity_type = $1`;
        params.push(entityType);
      }
      query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
      const result = await pool.query(query, params);
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/:id/revisions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(
        `SELECT id, content_id, revision_number, title, status, edited_by_username, created_at FROM content_revisions WHERE content_id = $1 ORDER BY revision_number DESC`,
        [req.params.id]
      );
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/content/:id/revisions/:revId/restore", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const revResult = await pool.query(`SELECT * FROM content_revisions WHERE id = $1 AND content_id = $2`, [req.params.revId, req.params.id]);
      if (revResult.rows.length === 0) return res.status(404).json({ error: "Revision not found" });
      const rev = snakeToCamel(revResult.rows[0]) as any;
      const existing = await storage.getContentItem(req.params.id);
      if (existing) await saveRevision(req.params.id, existing, admin);
      const updates: any = {};
      if (rev.title) updates.title = rev.title;
      if (rev.content) updates.content = rev.content;
      if (rev.status) updates.status = rev.status;
      const item = await storage.updateContentItem(req.params.id, updates);
      await logAudit(req, admin, "content", req.params.id, "restore_revision", { revisionId: req.params.revId, revisionNumber: rev.revisionNumber }, { title: item.title });
      res.json(item);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/flashcards/bulk-import", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { cards } = req.body;
      if (!Array.isArray(cards) || cards.length === 0) return res.status(400).json({ error: "cards array required" });
      const contentBlocks = cards.map((c: any, i: number) => ({
        type: "flashcard",
        order: i,
        question: c.question || c.front || "",
        answer: c.answer || c.back || "",
        category: c.category || "General",
        difficulty: c.difficulty || "medium",
        tags: c.tags || [],
      }));
      const contentData = {
        title: req.body.deckName || `Flashcard Deck - ${new Date().toLocaleDateString()}`,
        slug: req.body.slug || `deck-${Date.now()}`,
        type: "flashcard-set",
        category: req.body.category || "General",
        tier: req.body.tier || "free",
        status: req.body.status || "draft",
        content: contentBlocks,
        tags: req.body.tags || [],
      };
      const parsed = insertContentItemSchema.parse(contentData);
      const item = await storage.createContentItem(parsed);
      await logAudit(req, admin, "content", item.id, "bulk_import_flashcards", null, { title: item.title, cardCount: cards.length });
      res.json({ ...item, importedCount: cards.length });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // --------------------
  // Flashcard Decks API
  // --------------------

  const FREE_GLOBAL_MAX = parseInt(process.env.FREE_FLASHCARD_LIMIT || "300");
  const DECK_UPGRADED_MAX = 500;
  const PREMIUM_MAX = 999999;

  async function getUserCardEntitlement(userId: string) {
    const userResult = await pool.query(`SELECT tier, subscription_status, flashcard_limit FROM users WHERE id = $1`, [userId]);
    const u = userResult.rows[0];
    if (!u) return { isPremium: false, totalFreeCards: 0, limit: FREE_GLOBAL_MAX, percentage: 0 };
    const isPremium = (u.tier !== "free" && u.subscription_status === "active") || u.tier === "admin";
    if (isPremium) return { isPremium: true, totalFreeCards: 0, limit: PREMIUM_MAX, percentage: 0 };
    const userLimit = u.flashcard_limit ?? FREE_GLOBAL_MAX;
    const countResult = await pool.query(
      `SELECT COUNT(*)::int as total FROM deck_flashcards df
       JOIN flashcard_decks d ON df.deck_id = d.id WHERE d.owner_id = $1`,
      [userId]
    );
    const totalFreeCards = countResult.rows[0]?.total || 0;
    return { isPremium: false, totalFreeCards, limit: userLimit, percentage: Math.round((totalFreeCards / userLimit) * 100) };
  }

  app.get("/api/flashcard-usage/:userId", async (req, res) => {
    try {
      const entitlement = await getUserCardEntitlement(req.params.userId);
      res.json({
        used: entitlement.totalFreeCards,
        limit: entitlement.limit,
        isPremium: entitlement.isPremium,
        percentage: entitlement.percentage,
        remaining: Math.max(0, entitlement.limit - entitlement.totalFreeCards),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/flashcard-upgrade/checkout", async (req, res) => {
    try {
      const { userId, plan } = req.body;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
      if (userResult.rows.length === 0) return res.status(404).json({ error: "User not found" });
      const user = userResult.rows[0];
      const region = user.region || "US";
      const isCAD = region === "CA";

      const prices: Record<string, { amount: number; interval: string; name: string }> = {
        monthly: { amount: isCAD ? 649 : 499, interval: "month", name: "NurseNest Pro Monthly" },
        yearly: { amount: isCAD ? 4999 : 3900, interval: "year", name: "NurseNest Pro Yearly (Best Value)" },
      };
      const selected = prices[plan || "monthly"];
      if (!selected) return res.status(400).json({ error: "Invalid plan. Use 'monthly' or 'yearly'" });

      const { getUncachableStripeClient } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      let customerId = user.stripe_customer_id;
      if (!customerId) {
        const customer = await stripe.customers.create({
          metadata: { userId: user.id, username: user.username },
          email: user.email || undefined,
        });
        customerId = customer.id;
        await pool.query(`UPDATE users SET stripe_customer_id = $1 WHERE id = $2`, [customerId, userId]);
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [{
          price_data: {
            currency: isCAD ? "cad" : "usd",
            product_data: { name: selected.name },
            unit_amount: selected.amount,
            recurring: { interval: selected.interval as any },
          },
          quantity: 1,
        }],
        success_url: `${baseUrl}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/upgrade`,
        metadata: { userId: user.id, upgradeType: "flashcard_pro", plan: plan || "monthly" },
      });

      res.json({ url: session.url });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/flashcard-upgrade/verify", async (req, res) => {
    try {
      const { sessionId, userId } = req.body;
      if (!sessionId || !userId) return res.status(400).json({ error: "sessionId and userId required" });

      const { getUncachableStripeClient } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        await pool.query(
          `UPDATE users SET tier = CASE WHEN tier = 'free' THEN 'pro' ELSE tier END,
           subscription_status = 'active',
           flashcard_limit = NULL,
           stripe_subscription_id = $1
           WHERE id = $2`,
          [session.subscription, userId]
        );
        res.json({ success: true, tier: "pro" });
      } else {
        res.status(400).json({ error: "Payment not completed" });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/decks", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const visibility = req.query.visibility as string;
      const search = req.query.search as string;
      let query = `SELECT d.*, u.username as owner_username FROM flashcard_decks d LEFT JOIN users u ON d.owner_id = u.id`;
      const params: any[] = [];
      const conditions: string[] = [];
      if (userId) {
        conditions.push(`d.owner_id = $${params.length + 1}`);
        params.push(userId);
      }
      if (visibility === "public") {
        conditions.push(`d.visibility = 'public'`);
      }
      if (search) {
        conditions.push(`(d.title ILIKE $${params.length + 1} OR d.description ILIKE $${params.length + 1})`);
        params.push(`%${search}%`);
      }
      if (conditions.length > 0) query += ` WHERE ` + conditions.join(` AND `);
      query += ` ORDER BY d.updated_at DESC LIMIT 100`;
      const result = await pool.query(query, params);
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/decks/by-slug/:slug", async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT d.*, u.username as owner_username FROM flashcard_decks d LEFT JOIN users u ON d.owner_id = u.id WHERE d.slug = $1`,
        [req.params.slug]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = snakeToCamel(result.rows[0]) as any;
      if (deck.visibility === "private") {
        const userId = req.query.userId as string;
        if (deck.ownerId !== userId) return res.status(403).json({ error: "Private deck" });
      }
      await pool.query(`UPDATE flashcard_decks SET view_count = view_count + 1 WHERE id = $1`, [deck.id]);
      res.json(deck);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/decks/:id", async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT d.*, u.username as owner_username FROM flashcard_decks d LEFT JOIN users u ON d.owner_id = u.id WHERE d.id = $1`,
        [req.params.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = snakeToCamel(result.rows[0]) as any;
      if (deck.visibility === "private") {
        const userId = req.query.userId as string;
        if (deck.ownerId !== userId) return res.status(403).json({ error: "Private deck" });
      }
      await pool.query(`UPDATE flashcard_decks SET view_count = view_count + 1 WHERE id = $1`, [req.params.id]);
      res.json(deck);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/decks", async (req, res) => {
    try {
      const { userId, title, description, tags, tier, visibility, slug } = req.body;
      if (!userId || !title) return res.status(400).json({ error: "userId and title required" });
      const userCheck = await pool.query(`SELECT id FROM users WHERE id = $1`, [userId]);
      if (userCheck.rows.length === 0) return res.status(404).json({ error: "User not found" });
      const deckSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36);
      const result = await pool.query(
        `INSERT INTO flashcard_decks (id, owner_id, title, description, tags, tier, visibility, slug, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
        [userId, title, description || "", JSON.stringify(tags || []), tier || "free", visibility || "private", deckSlug]
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/decks/:id", async (req, res) => {
    try {
      const { userId, title, description, tags, tier, visibility } = req.body;
      const deckCheck = await pool.query(`SELECT owner_id FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      if (deckCheck.rows[0].owner_id !== userId) return res.status(403).json({ error: "Not your deck" });
      const updates: string[] = [];
      const params: any[] = [];
      if (title !== undefined) { params.push(title); updates.push(`title = $${params.length}`); }
      if (description !== undefined) { params.push(description); updates.push(`description = $${params.length}`); }
      if (tags !== undefined) { params.push(JSON.stringify(tags)); updates.push(`tags = $${params.length}`); }
      if (tier !== undefined) { params.push(tier); updates.push(`tier = $${params.length}`); }
      if (visibility !== undefined) { params.push(visibility); updates.push(`visibility = $${params.length}`); }
      params.push(req.params.id);
      updates.push(`updated_at = NOW()`);
      const result = await pool.query(
        `UPDATE flashcard_decks SET ${updates.join(", ")} WHERE id = $${params.length} RETURNING *`,
        params
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/decks/:id", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const deckCheck = await pool.query(`SELECT owner_id, title, visibility FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = deckCheck.rows[0];
      const userCheck = await pool.query(`SELECT tier FROM users WHERE id = $1`, [userId]);
      const isAdmin = userCheck.rows[0]?.tier === "admin";
      if (deck.owner_id !== userId && !isAdmin) return res.status(403).json({ error: "Not your deck" });
      await pool.query(`DELETE FROM study_sessions WHERE deck_id = $1`, [req.params.id]);
      await pool.query(`DELETE FROM saved_decks WHERE deck_id = $1`, [req.params.id]);
      await pool.query(`DELETE FROM deck_flashcards WHERE deck_id = $1`, [req.params.id]);
      await pool.query(`DELETE FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      res.json({ success: true, title: deck.title });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/decks/:id/cards", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const result = await pool.query(
        `SELECT * FROM deck_flashcards WHERE deck_id = $1 ORDER BY sort_order ASC, created_at ASC`,
        [req.params.id]
      );
      const allCards = snakeToCamel(result.rows);

      if (userId) {
        const deckCheck = await pool.query(`SELECT owner_id, tier FROM flashcard_decks WHERE id = $1`, [req.params.id]);
        const deck = deckCheck.rows[0];
        if (deck && deck.owner_id === userId) {
          return res.json(allCards);
        }
        const userCheck = await pool.query(`SELECT tier, subscription_status FROM users WHERE id = $1`, [userId]);
        const userRow = userCheck.rows[0];
        if (userRow && (userRow.tier === "admin" || (userRow.tier !== "free" && userRow.subscription_status === "active"))) {
          return res.json(allCards);
        }
      }

      const FREE_PREVIEW_LIMIT = 5;
      const limited = allCards.slice(0, FREE_PREVIEW_LIMIT);
      res.json(limited);
      return;
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/decks/:id/cards", async (req, res) => {
    try {
      const { userId, front, back, rationale, tags, difficulty } = req.body;
      if (!userId || !front || !back) return res.status(400).json({ error: "userId, front, and back required" });
      const deckCheck = await pool.query(`SELECT * FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = deckCheck.rows[0];
      if (deck.owner_id !== userId) return res.status(403).json({ error: "Not your deck" });
      const entitlement = await getUserCardEntitlement(userId);
      if (!entitlement.isPremium) {
        if (deck.is_upgraded) {
          const deckCardCount = await pool.query(`SELECT COUNT(*) as cnt FROM deck_flashcards WHERE deck_id = $1`, [req.params.id]);
          const count = parseInt(deckCardCount.rows[0]?.cnt || "0");
          if (count >= (deck.upgraded_limit || DECK_UPGRADED_MAX)) {
            return res.status(403).json({ error: "Deck card limit reached", limit: deck.upgraded_limit || DECK_UPGRADED_MAX, upgradeRequired: false });
          }
        } else {
          if (entitlement.totalFreeCards >= FREE_GLOBAL_MAX) {
            return res.status(403).json({
              error: "Your study capacity is full. Most exam-focused decks require 120-200 cards.",
              limit: FREE_GLOBAL_MAX,
              used: entitlement.totalFreeCards,
              upgradeRequired: true
            });
          }
        }
      }
      const result = await pool.query(
        `INSERT INTO deck_flashcards (id, deck_id, front, back, rationale, tags, difficulty, sort_order, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM deck_flashcards WHERE deck_id = $1), NOW(), NOW()) RETURNING *`,
        [req.params.id, front, back, rationale || null, JSON.stringify(tags || []), difficulty || "medium"]
      );
      await pool.query(`UPDATE flashcard_decks SET card_count = (SELECT COUNT(*) FROM deck_flashcards WHERE deck_id = $1), updated_at = NOW() WHERE id = $1`, [req.params.id]);
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/decks/:deckId/cards/:cardId", async (req, res) => {
    try {
      const { userId, front, back, rationale, tags, difficulty, aiCheckStatus, aiCheckSummary, aiCheckConfidence, userOverride } = req.body;
      const deckCheck = await pool.query(`SELECT owner_id FROM flashcard_decks WHERE id = $1`, [req.params.deckId]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      if (deckCheck.rows[0].owner_id !== userId) return res.status(403).json({ error: "Not your deck" });
      const updates: string[] = [];
      const params: any[] = [];
      if (front !== undefined) { params.push(front); updates.push(`front = $${params.length}`); }
      if (back !== undefined) { params.push(back); updates.push(`back = $${params.length}`); }
      if (rationale !== undefined) { params.push(rationale); updates.push(`rationale = $${params.length}`); }
      if (tags !== undefined) { params.push(JSON.stringify(tags)); updates.push(`tags = $${params.length}`); }
      if (difficulty !== undefined) { params.push(difficulty); updates.push(`difficulty = $${params.length}`); }
      if (aiCheckStatus !== undefined) { params.push(aiCheckStatus); updates.push(`ai_check_status = $${params.length}`); }
      if (aiCheckSummary !== undefined) { params.push(aiCheckSummary); updates.push(`ai_check_summary = $${params.length}`); }
      if (aiCheckConfidence !== undefined) { params.push(aiCheckConfidence); updates.push(`ai_check_confidence = $${params.length}`); }
      if (userOverride !== undefined) { params.push(userOverride); updates.push(`user_override = $${params.length}`); }
      updates.push(`updated_at = NOW()`);
      params.push(req.params.cardId);
      const result = await pool.query(
        `UPDATE deck_flashcards SET ${updates.join(", ")} WHERE id = $${params.length} RETURNING *`,
        params
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/decks/:deckId/cards/:cardId", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const deckCheck = await pool.query(`SELECT owner_id FROM flashcard_decks WHERE id = $1`, [req.params.deckId]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      if (deckCheck.rows[0].owner_id !== userId) return res.status(403).json({ error: "Not your deck" });
      await pool.query(`DELETE FROM deck_flashcards WHERE id = $1 AND deck_id = $2`, [req.params.cardId, req.params.deckId]);
      await pool.query(`UPDATE flashcard_decks SET card_count = (SELECT COUNT(*) FROM deck_flashcards WHERE deck_id = $1), updated_at = NOW() WHERE id = $1`, [req.params.deckId]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/decks/:id/cards/bulk-import", async (req, res) => {
    try {
      const { userId, cards } = req.body;
      if (!userId || !Array.isArray(cards) || cards.length === 0) return res.status(400).json({ error: "userId and cards array required" });
      const deckCheck = await pool.query(`SELECT * FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = deckCheck.rows[0];
      if (deck.owner_id !== userId) return res.status(403).json({ error: "Not your deck" });
      const entitlement = await getUserCardEntitlement(userId);
      let allowedCount = cards.length;
      if (!entitlement.isPremium) {
        if (deck.is_upgraded) {
          const deckCardCount = await pool.query(`SELECT COUNT(*) as cnt FROM deck_flashcards WHERE deck_id = $1`, [req.params.id]);
          const current = parseInt(deckCardCount.rows[0]?.cnt || "0");
          const remaining = (deck.upgraded_limit || DECK_UPGRADED_MAX) - current;
          allowedCount = Math.min(cards.length, remaining);
        } else {
          const remaining = FREE_GLOBAL_MAX - entitlement.totalFreeCards;
          allowedCount = Math.min(cards.length, remaining);
        }
      }
      if (allowedCount <= 0) {
        return res.status(403).json({ error: "Card limit reached", upgradeRequired: true, imported: 0, skipped: cards.length });
      }
      const toImport = cards.slice(0, allowedCount);
      let imported = 0;
      for (let i = 0; i < toImport.length; i++) {
        const c = toImport[i];
        const front = c.front || c.question || "";
        const back = c.back || c.answer || "";
        if (!front || !back) continue;
        await pool.query(
          `INSERT INTO deck_flashcards (id, deck_id, front, back, rationale, tags, difficulty, sort_order, created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
          [req.params.id, front, back, c.rationale || null, JSON.stringify(c.tags || []), c.difficulty || "medium", i]
        );
        imported++;
      }
      await pool.query(`UPDATE flashcard_decks SET card_count = (SELECT COUNT(*) FROM deck_flashcards WHERE deck_id = $1), updated_at = NOW() WHERE id = $1`, [req.params.id]);
      res.json({ imported, skipped: cards.length - imported, total: cards.length });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/decks/:id/ai-check", async (req, res) => {
    try {
      const { front, back, rationale, tier, tags } = req.body;
      if (!front || !back) return res.status(400).json({ error: "front and back required" });
      const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
      if (!apiKey) return res.json({ status: "unknown", explanation: "AI validation unavailable", confidence: 0 });
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey });
      const prompt = `You are a nursing education content validator. Evaluate this flashcard for medical accuracy.
Front: ${front}
Back: ${back}
${rationale ? `Rationale: ${rationale}` : ""}
${tier ? `Level: ${tier}` : ""}

Respond in JSON: {"status": "pass"|"flag"|"unknown", "explanation": "brief reason", "confidence": 0.0-1.0, "suggestedCorrection": "optional correction if flagged"}
Be conservative: if uncertain, use "unknown". Only "pass" for clearly accurate content. Never auto-correct.`;
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 300,
      });
      const result = JSON.parse(completion.choices[0]?.message?.content || '{"status":"unknown","explanation":"Could not validate","confidence":0}');
      res.json(result);
    } catch (e: any) {
      res.json({ status: "unknown", explanation: "Validation error", confidence: 0 });
    }
  });

  app.post("/api/decks/:id/ai-generate", async (req, res) => {
    try {
      const { userId, prompt, count } = req.body;
      if (!userId || !prompt?.trim()) return res.status(400).json({ error: "userId and prompt required" });
      const deckId = req.params.id;
      const deckResult = await pool.query(`SELECT * FROM flashcard_decks WHERE id = $1 AND owner_id = $2`, [deckId, userId]);
      if (deckResult.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = deckResult.rows[0];

      const entitlement = await getUserCardEntitlement(userId);
      if (!entitlement.isPremium) {
        let remaining: number;
        if (deck.is_upgraded) {
          const deckCardCount = await pool.query(`SELECT COUNT(*) as cnt FROM deck_flashcards WHERE deck_id = $1`, [deckId]);
          const current = parseInt(deckCardCount.rows[0]?.cnt || "0");
          remaining = (deck.upgraded_limit || DECK_UPGRADED_MAX) - current;
        } else {
          remaining = FREE_GLOBAL_MAX - entitlement.totalFreeCards;
        }
        if (remaining <= 0) {
          return res.status(403).json({
            error: `You've reached the free limit of ${FREE_GLOBAL_MAX} cards. Upgrade your plan to create unlimited flashcards with AI.`,
            upgradeRequired: true,
            limit: FREE_GLOBAL_MAX,
            current: entitlement.totalFreeCards,
          });
        }
      }

      const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
      const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
      if (!apiKey) return res.status(503).json({ error: "AI generation unavailable" });

      const PREMIUM_MAX = 50;
      const FREE_MAX_PER_GEN = 25;
      const maxAllowed = entitlement.isPremium ? PREMIUM_MAX : Math.min(FREE_MAX_PER_GEN, (deck.is_upgraded ? ((deck.upgraded_limit || DECK_UPGRADED_MAX) - entitlement.totalFreeCards) : (FREE_GLOBAL_MAX - entitlement.totalFreeCards)));
      const numCards = Math.min(Math.max(parseInt(count) || 10, 1), Math.max(maxAllowed, 1));
      const region = req.region || "US";
      const regionNote = region === "CA"
        ? "Use Canadian nursing terminology, SI units, and Canadian exam standards (REx-PN, CNO)."
        : "Use American nursing terminology, conventional units, and US exam standards (NCLEX).";

      const maxTokens = numCards > 25 ? 8192 : 4096;
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey, baseURL });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a nursing education flashcard generator for NurseNest. Generate high-quality, exam-ready flashcards for nursing students. ${regionNote} Each card should test a specific concept with a clear question and concise, accurate answer. Include a brief rationale explaining why the answer is correct. Return ONLY valid JSON.`,
          },
          {
            role: "user",
            content: `Generate exactly ${numCards} nursing flashcards about: ${prompt}\n\nReturn as JSON: {"cards":[{"front":"question text","back":"answer text","rationale":"brief explanation"}]}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: maxTokens,
      });

      const text = completion.choices[0]?.message?.content || '{"cards":[]}';
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }

      const cards = (parsed.cards || []).filter((c: any) => c.front?.trim() && c.back?.trim());
      if (cards.length === 0) return res.status(400).json({ error: "AI did not generate valid cards. Try a different prompt." });

      res.json({ cards });
    } catch (e: any) {
      console.error("AI flashcard generation error:", e);
      res.status(500).json({ error: e.message || "AI generation failed" });
    }
  });

  app.post("/api/decks/:id/ai-generate-from-notes", async (req, res) => {
    try {
      const { userId, notes, count } = req.body;
      if (!userId || !notes?.trim()) return res.status(400).json({ error: "userId and notes text required" });
      if (notes.length > 50000) return res.status(400).json({ error: "Notes too long. Please limit to 50,000 characters." });
      const deckId = req.params.id;
      const deckResult = await pool.query(`SELECT * FROM flashcard_decks WHERE id = $1 AND owner_id = $2`, [deckId, userId]);
      if (deckResult.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = deckResult.rows[0];

      const entitlement = await getUserCardEntitlement(userId);
      if (!entitlement.isPremium) {
        let remaining: number;
        if (deck.is_upgraded) {
          const deckCardCount = await pool.query(`SELECT COUNT(*) as cnt FROM deck_flashcards WHERE deck_id = $1`, [deckId]);
          const current = parseInt(deckCardCount.rows[0]?.cnt || "0");
          remaining = (deck.upgraded_limit || DECK_UPGRADED_MAX) - current;
        } else {
          remaining = FREE_GLOBAL_MAX - entitlement.totalFreeCards;
        }
        if (remaining <= 0) {
          return res.status(403).json({
            error: `You've reached the free limit of ${FREE_GLOBAL_MAX} cards. Upgrade your plan to create unlimited flashcards with AI.`,
            upgradeRequired: true,
            limit: FREE_GLOBAL_MAX,
            current: entitlement.totalFreeCards,
          });
        }
      }

      const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
      const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
      if (!apiKey) return res.status(503).json({ error: "AI generation unavailable" });

      const PREMIUM_MAX = 50;
      const FREE_MAX_PER_GEN = 25;
      const maxAllowed = entitlement.isPremium ? PREMIUM_MAX : Math.min(FREE_MAX_PER_GEN, (deck.is_upgraded ? ((deck.upgraded_limit || DECK_UPGRADED_MAX) - entitlement.totalFreeCards) : (FREE_GLOBAL_MAX - entitlement.totalFreeCards)));
      const numCards = Math.min(Math.max(parseInt(count) || 15, 1), Math.max(maxAllowed, 1));
      const region = req.region || "US";
      const regionNote = region === "CA"
        ? "Use Canadian nursing terminology, SI units, and Canadian exam standards (REx-PN, CNO)."
        : "Use American nursing terminology, conventional units, and US exam standards (NCLEX).";

      const truncatedNotes = notes.length > 30000 ? notes.substring(0, 30000) + "\n[Notes truncated...]" : notes;
      const maxTokens = numCards > 25 ? 8192 : 4096;
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey, baseURL });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a nursing education flashcard generator for NurseNest. You will be given a student's study notes and must convert them into high-quality, exam-ready flashcards. ${regionNote} Extract the most important concepts, facts, and clinical details from the notes. Each card should test a specific concept with a clear question and concise, accurate answer. Include a brief rationale. Return ONLY valid JSON.`,
          },
          {
            role: "user",
            content: `Convert the following study notes into exactly ${numCards} flashcards. Focus on the most testable and clinically important content:\n\n---\n${truncatedNotes}\n---\n\nReturn as JSON: {"cards":[{"front":"question text","back":"answer text","rationale":"brief explanation"}]}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: maxTokens,
      });

      const text = completion.choices[0]?.message?.content || '{"cards":[]}';
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }

      const cards = (parsed.cards || []).filter((c: any) => c.front?.trim() && c.back?.trim());
      if (cards.length === 0) return res.status(400).json({ error: "AI could not generate cards from your notes. Try adding more detailed content." });

      res.json({ cards });
    } catch (e: any) {
      console.error("AI notes-to-flashcard generation error:", e);
      res.status(500).json({ error: e.message || "AI generation failed" });
    }
  });

  app.get("/api/user-entitlement", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const entitlement = await getUserCardEntitlement(userId);
      res.json(entitlement);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/study-sessions", async (req, res) => {
    try {
      const { userId, deckId, mode } = req.body;
      if (!userId || !deckId) return res.status(400).json({ error: "userId and deckId required" });
      const result = await pool.query(
        `INSERT INTO study_sessions (id, user_id, deck_id, mode, started_at)
         VALUES (gen_random_uuid(), $1, $2, $3, NOW()) RETURNING *`,
        [userId, deckId, mode || "learn"]
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/study-sessions/:id", async (req, res) => {
    try {
      const { totalCards, correctCount, incorrectCount, timeSeconds, missedCardIds } = req.body;
      const result = await pool.query(
        `UPDATE study_sessions SET total_cards = $1, correct_count = $2, incorrect_count = $3, time_seconds = $4, missed_card_ids = $5, ended_at = NOW() WHERE id = $6 RETURNING *`,
        [totalCards || 0, correctCount || 0, incorrectCount || 0, timeSeconds || 0, JSON.stringify(missedCardIds || []), req.params.id]
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get("/api/study-sessions", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const deckId = req.query.deckId as string;
      let query = `SELECT * FROM study_sessions WHERE user_id = $1`;
      const params: any[] = [userId];
      if (deckId) {
        query += ` AND deck_id = $2`;
        params.push(deckId);
      }
      query += ` ORDER BY started_at DESC LIMIT 20`;
      const result = await pool.query(query, params);
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/decks/:id/stats", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const sessions = await pool.query(
        `SELECT * FROM study_sessions WHERE user_id = $1 AND deck_id = $2 ORDER BY started_at DESC`,
        [userId, req.params.id]
      );
      const rows = sessions.rows;
      const totalSessions = rows.length;
      const completedSessions = rows.filter((r: any) => r.ended_at);
      const totalReviews = completedSessions.reduce((sum: number, r: any) => sum + (r.total_cards || 0), 0);
      const totalCorrect = completedSessions.reduce((sum: number, r: any) => sum + (r.correct_count || 0), 0);
      const totalIncorrect = completedSessions.reduce((sum: number, r: any) => sum + (r.incorrect_count || 0), 0);
      const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;
      const totalTimeSeconds = completedSessions.reduce((sum: number, r: any) => sum + (r.time_seconds || 0), 0);
      const lastStudiedAt = completedSessions.length > 0 ? completedSessions[0].ended_at || completedSessions[0].started_at : null;
      let streak = 0;
      if (completedSessions.length > 0) {
        const dates = completedSessions.map((r: any) => new Date(r.started_at).toDateString());
        const uniqueDates = [...new Set(dates)];
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
          streak = 1;
          for (let i = 1; i < uniqueDates.length; i++) {
            const prev = new Date(uniqueDates[i - 1]);
            const curr = new Date(uniqueDates[i]);
            const diff = Math.abs(prev.getTime() - curr.getTime()) / 86400000;
            if (diff <= 1.5) streak++;
            else break;
          }
        }
      }
      const allMissedIds: string[] = [];
      completedSessions.forEach((r: any) => {
        const missed = Array.isArray(r.missed_card_ids) ? r.missed_card_ids : [];
        missed.forEach((id: string) => { if (!allMissedIds.includes(id)) allMissedIds.push(id); });
      });
      const cardCountRes = await pool.query(`SELECT COUNT(*) as cnt FROM deck_flashcards WHERE deck_id = $1`, [req.params.id]);
      const totalCards = parseInt(cardCountRes.rows[0]?.cnt || "0");
      const masteredCount = Math.max(0, totalCards - allMissedIds.length);

      res.json({
        totalSessions, totalReviews, totalCorrect, totalIncorrect, accuracy,
        totalTimeSeconds, streak, masteredCount, learningCount: allMissedIds.length,
        totalCards, lastStudiedAt,
        recentSessions: snakeToCamel(completedSessions.slice(0, 5)),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/decks/:id/save", async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const existing = await pool.query(`SELECT id FROM saved_decks WHERE user_id = $1 AND deck_id = $2`, [userId, req.params.id]);
      if (existing.rows.length > 0) return res.json({ success: true, already: true });
      await pool.query(`INSERT INTO saved_decks (id, user_id, deck_id) VALUES (gen_random_uuid(), $1, $2)`, [userId, req.params.id]);
      await pool.query(`UPDATE flashcard_decks SET save_count = save_count + 1 WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/decks/:id/save", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      await pool.query(`DELETE FROM saved_decks WHERE user_id = $1 AND deck_id = $2`, [userId, req.params.id]);
      await pool.query(`UPDATE flashcard_decks SET save_count = GREATEST(save_count - 1, 0) WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/saved-decks", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const result = await pool.query(
        `SELECT d.*, u.username as owner_username FROM saved_decks s JOIN flashcard_decks d ON s.deck_id = d.id LEFT JOIN users u ON d.owner_id = u.id WHERE s.user_id = $1 ORDER BY s.saved_at DESC`,
        [userId]
      );
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/decks/:id/duplicate", async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const deckResult = await pool.query(`SELECT * FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      if (deckResult.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      const deck = deckResult.rows[0];
      if (deck.visibility === "private" && deck.owner_id !== userId) return res.status(403).json({ error: "Cannot duplicate private deck" });
      const newSlug = deck.slug + "-copy-" + Date.now().toString(36);
      const newDeck = await pool.query(
        `INSERT INTO flashcard_decks (id, owner_id, title, description, tags, tier, visibility, slug, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'private', $6, NOW(), NOW()) RETURNING *`,
        [userId, deck.title + " (Copy)", deck.description, deck.tags, deck.tier, newSlug]
      );
      const cards = await pool.query(`SELECT * FROM deck_flashcards WHERE deck_id = $1 ORDER BY sort_order`, [req.params.id]);
      for (const card of cards.rows) {
        await pool.query(
          `INSERT INTO deck_flashcards (id, deck_id, front, back, rationale, tags, difficulty, sort_order, created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
          [newDeck.rows[0].id, card.front, card.back, card.rationale, card.tags, card.difficulty, card.sort_order]
        );
      }
      await pool.query(`UPDATE flashcard_decks SET card_count = (SELECT COUNT(*) FROM deck_flashcards WHERE deck_id = $1) WHERE id = $1`, [newDeck.rows[0].id]);
      res.json(snakeToCamel(newDeck.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/deck-reports", async (req, res) => {
    try {
      const { reporterId, targetType, targetId, reason, notes } = req.body;
      if (!reporterId || !targetType || !targetId || !reason) return res.status(400).json({ error: "Missing required fields" });
      const result = await pool.query(
        `INSERT INTO deck_reports (id, reporter_id, target_type, target_id, reason, notes, status, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'pending', NOW()) RETURNING *`,
        [reporterId, targetType, targetId, reason, notes || null]
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get("/api/admin/deck-reports", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(
        `SELECT r.*, u.username as reporter_username FROM deck_reports r LEFT JOIN users u ON r.reporter_id = u.id ORDER BY r.created_at DESC LIMIT 50`
      );
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/seed-starter-decks", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const existing = await pool.query(`SELECT id FROM flashcard_decks WHERE owner_id = 'system'`);
      if (existing.rows.length > 0) return res.json({ message: "Starter decks already exist", count: existing.rows.length });

      await pool.query(`INSERT INTO users (id, username, password, tier) VALUES ('system', 'NurseNest', 'system-no-login', 'admin') ON CONFLICT (id) DO NOTHING`);

      const starterDecks = [
        {
          title: "Cardiac Medications",
          slug: "cardiac-medications",
          description: "Essential cardiac drugs, mechanisms, and nursing considerations for NCLEX prep",
          tags: ["pharmacology", "cardiac", "NCLEX"],
          cards: [
            { front: "What is the antidote for heparin?", back: "Protamine sulfate", rationale: "Protamine binds to heparin and neutralizes its anticoagulant effect. Dose: 1 mg per 100 units of heparin." },
            { front: "What is the antidote for warfarin (Coumadin)?", back: "Vitamin K (phytonadione)", rationale: "Vitamin K reverses warfarin by restoring clotting factor synthesis. IV route for emergencies, PO for non-urgent reversal." },
            { front: "What lab value monitors heparin therapy?", back: "aPTT (activated Partial Thromboplastin Time)", rationale: "Therapeutic aPTT is typically 1.5-2.5 times the control value. Monitor every 6 hours after dose changes." },
            { front: "What lab value monitors warfarin therapy?", back: "PT/INR (Prothrombin Time / International Normalized Ratio)", rationale: "Therapeutic INR is usually 2.0-3.0. For mechanical heart valves, target is 2.5-3.5." },
            { front: "What class of drug is metoprolol?", back: "Beta-blocker (beta-1 selective)", rationale: "Metoprolol reduces heart rate and blood pressure. Hold if HR < 60 or SBP < 100. Monitor for bradycardia and hypotension." },
            { front: "What is the priority nursing action before giving digoxin?", back: "Check apical pulse for one full minute; hold if HR < 60 bpm", rationale: "Digoxin slows heart rate. Subtherapeutic HR indicates toxicity risk. Also monitor potassium levels (hypokalemia increases toxicity)." },
            { front: "What are signs of digoxin toxicity?", back: "Nausea, vomiting, visual disturbances (yellow-green halos), bradycardia, dysrhythmias", rationale: "Therapeutic digoxin level: 0.5-2.0 ng/mL. Hypokalemia increases toxicity risk. Antidote: Digibind (digoxin immune Fab)." },
            { front: "What is the mechanism of action of nitroglycerin?", back: "Vasodilation (primarily venous) reducing preload and myocardial oxygen demand", rationale: "Administered sublingually for acute angina. Max 3 doses, 5 minutes apart. Monitor for hypotension and headache." },
            { front: "What is a critical side effect of ACE inhibitors (e.g., lisinopril)?", back: "Persistent dry cough and risk of angioedema", rationale: "ACE inhibitors prevent conversion of angiotensin I to II. Cough is due to bradykinin accumulation. Switch to ARB if intolerable." },
            { front: "What electrolyte must be monitored with loop diuretics (furosemide)?", back: "Potassium (risk of hypokalemia)", rationale: "Furosemide causes potassium excretion. Signs of hypokalemia: muscle weakness, cramping, cardiac dysrhythmias, U waves on ECG." },
          ],
        },
        {
          title: "Electrolyte Imbalances",
          slug: "electrolyte-imbalances",
          description: "Key electrolyte disorders, symptoms, and nursing interventions for exam preparation",
          tags: ["electrolytes", "pathophysiology", "NCLEX"],
          cards: [
            { front: "What are signs of hyperkalemia?", back: "Tall peaked T waves, muscle weakness, bradycardia, cardiac arrest risk", rationale: "Potassium > 5.0 mEq/L. Emergency treatment: IV calcium gluconate (cardioprotection), insulin + glucose, sodium bicarbonate, kayexalate." },
            { front: "What are signs of hypokalemia?", back: "Muscle weakness, leg cramps, shallow respirations, U waves on ECG, cardiac dysrhythmias", rationale: "Potassium < 3.5 mEq/L. Causes: diuretics, vomiting, NG suction. Administer IV potassium NEVER by push, always diluted." },
            { front: "What is Trousseau sign?", back: "Carpal spasm when BP cuff is inflated; indicates hypocalcemia", rationale: "Calcium < 8.5 mg/dL. Trousseau sign occurs because low calcium increases neuromuscular excitability." },
            { front: "What is Chvostek sign?", back: "Facial muscle twitching when tapping the facial nerve; indicates hypocalcemia", rationale: "Tap anterior to the ear over the facial nerve. Positive response = ipsilateral facial muscle contraction." },
            { front: "What are signs of hypernatremia?", back: "Thirst, dry mucous membranes, restlessness, confusion, seizures", rationale: "Sodium > 145 mEq/L. Often caused by dehydration. Treatment: hypotonic IV fluids (0.45% NaCl). Correct slowly to prevent cerebral edema." },
            { front: "What are signs of hyponatremia?", back: "Nausea, headache, confusion, seizures, muscle cramps", rationale: "Sodium < 135 mEq/L. Causes: SIADH, water intoxication, diuretics. Treatment: fluid restriction, hypertonic saline (3% NaCl) for severe cases." },
            { front: "What electrolyte imbalance causes carpopedal spasm?", back: "Hypocalcemia", rationale: "Low calcium increases neuromuscular irritability causing tetany, spasms, and seizure risk. Also seen in hypomagnesemia." },
            { front: "What is the relationship between magnesium and calcium?", back: "Hypomagnesemia can cause refractory hypocalcemia", rationale: "Magnesium is needed for PTH secretion and action. Must correct magnesium first before calcium will normalize." },
            { front: "What are signs of hypercalcemia?", back: "Bones, stones, groans, moans (bone pain, kidney stones, constipation, confusion)", rationale: "Calcium > 10.5 mg/dL. Causes: hyperparathyroidism, malignancy. Encourage fluids, loop diuretics, calcitonin." },
            { front: "What are signs of hypermagnesemia?", back: "Lethargy, decreased DTRs, hypotension, respiratory depression, cardiac arrest", rationale: "Magnesium > 2.5 mg/dL. Often iatrogenic (magnesium sulfate therapy). Antidote: IV calcium gluconate." },
          ],
        },
        {
          title: "Infection Control & PPE",
          slug: "infection-control-ppe",
          description: "Standard and transmission-based precautions, PPE selection, and isolation protocols",
          tags: ["fundamentals", "infection control", "safety"],
          cards: [
            { front: "What type of isolation requires an N95 respirator?", back: "Airborne precautions", rationale: "Used for TB, measles, varicella, COVID-19. Requires negative pressure room with 6-12 air exchanges per hour." },
            { front: "Name 3 diseases requiring airborne precautions", back: "Tuberculosis (TB), measles (rubeola), varicella (chickenpox)", rationale: "Remember 'My Chicken has TB'. These pathogens travel on air currents and remain suspended. N95 + negative pressure room required." },
            { front: "What type of isolation requires a surgical mask within 3 feet?", back: "Droplet precautions", rationale: "Used for influenza, pertussis, meningitis, mumps. Droplets travel up to 3-6 feet. Private room or 3-foot curtain separation." },
            { front: "What PPE is needed for contact precautions?", back: "Gown and gloves", rationale: "Used for MRSA, VRE, C. diff, scabies. Dedicated equipment. Don gown and gloves before entering room." },
            { front: "What is the correct order for donning PPE?", back: "Gown, mask/respirator, goggles/face shield, gloves", rationale: "Remember the order goes from least to most contaminated. Gloves go on last and cover gown cuffs." },
            { front: "What is the correct order for doffing (removing) PPE?", back: "Gloves, goggles/face shield, gown, mask/respirator", rationale: "Gloves are most contaminated and removed first. Perform hand hygiene between steps. Mask removed last at doorway." },
            { front: "When is hand hygiene required? (5 moments)", back: "Before patient contact, before aseptic task, after body fluid exposure, after patient contact, after touching surroundings", rationale: "WHO 5 Moments for Hand Hygiene. Use alcohol-based rub (20 sec) or soap and water (40-60 sec). Soap required for C. diff." },
            { front: "What precaution type is required for C. difficile?", back: "Contact precautions with soap and water hand washing (not alcohol rub)", rationale: "C. diff spores are resistant to alcohol. Must use soap and water. Bleach-based cleaning for surfaces. Private room preferred." },
            { front: "What is the sterile field rule for distance?", back: "A 1-inch border around a sterile field is considered non-sterile", rationale: "Never turn your back on a sterile field. Keep the field at waist level or above. If contamination is suspected, start over." },
            { front: "What type of precaution is used for a patient with shingles (herpes zoster)?", back: "Airborne + Contact precautions (if disseminated); Contact only if localized and covered", rationale: "Disseminated zoster can be aerosolized. Localized covered lesions require contact only. Susceptible staff should avoid the patient." },
          ],
        },
        {
          title: "Vital Signs & Assessment",
          slug: "vital-signs-assessment",
          description: "Normal ranges, abnormal findings, and priority nursing responses for vital sign changes",
          tags: ["assessment", "fundamentals", "clinical"],
          cards: [
            { front: "What is the priority action for a respiratory rate of 8?", back: "Assess airway, administer oxygen, prepare for respiratory support, notify provider", rationale: "RR < 12 is bradypnea and may indicate CNS depression (opioids, neurological injury). Hold opioids if prescribed and assess." },
            { front: "What does a widening pulse pressure indicate?", back: "Increased intracranial pressure (ICP) - Cushing triad component", rationale: "Cushing triad: widening pulse pressure, bradycardia, irregular respirations. This is a late sign of increased ICP - emergency." },
            { front: "What position optimizes breathing for a dyspneic patient?", back: "High Fowler's position (60-90 degrees) or orthopneic position", rationale: "Upright positioning allows maximum lung expansion by lowering the diaphragm. Tripod position also helps." },
            { front: "What is the normal SpO2 range?", back: "95-100% on room air", rationale: "SpO2 < 90% indicates significant hypoxemia. For COPD patients, acceptable range may be 88-92% to maintain hypoxic drive." },
            { front: "When should you take an apical pulse?", back: "Before administering digoxin or beta-blockers; for irregular radial pulse; in infants and children", rationale: "Apical pulse is the most accurate. Located at 5th intercostal space, midclavicular line. Count for full 60 seconds." },
            { front: "What does a pulse deficit indicate?", back: "Cardiac dysrhythmia (difference between apical and radial pulse)", rationale: "Pulse deficit = apical rate minus radial rate. Occurs when some cardiac contractions are too weak to produce a palpable pulse wave." },
            { front: "What temperature indicates a fever?", back: "Oral > 100.4F (38C)", rationale: "Report fever with other findings. Rectal is most accurate (0.5-1F higher than oral). Axillary is least accurate (0.5-1F lower)." },
            { front: "What blood pressure reading indicates Stage 2 hypertension?", back: "Systolic 140+ or Diastolic 90+ mmHg", rationale: "Stage 1: 130-139/80-89. Stage 2: 140+/90+. Hypertensive crisis: > 180/120. Verify with repeat measurement on both arms." },
            { front: "What is orthostatic hypotension?", back: "Drop of 20+ mmHg systolic or 10+ mmHg diastolic within 3 minutes of standing", rationale: "Assess lying, sitting, then standing BP. Causes: dehydration, blood loss, medications. Implement fall precautions." },
            { front: "What does a Glasgow Coma Scale (GCS) of 8 or less indicate?", back: "Severe brain injury; patient likely needs intubation for airway protection", rationale: "GCS ranges from 3-15. Eye opening (1-4) + Verbal (1-5) + Motor (1-6). Score of 8 or less = coma. 'GCS less than 8, intubate.'" },
          ],
        },
        {
          title: "Diabetes Management",
          slug: "diabetes-management",
          description: "Insulin types, hypoglycemia vs hyperglycemia, DKA, and nursing priorities",
          tags: ["endocrine", "pharmacology", "NCLEX"],
          cards: [
            { front: "What are the signs of hypoglycemia?", back: "Shakiness, sweating, tachycardia, confusion, pallor, irritability, hunger", rationale: "Blood glucose < 70 mg/dL. Treat with 15g fast-acting carbs (4 oz juice, glucose tablets). Recheck in 15 min. Rule of 15." },
            { front: "What are the signs of DKA (Diabetic Ketoacidosis)?", back: "Kussmaul respirations, fruity breath, dehydration, abdominal pain, nausea, altered LOC", rationale: "DKA occurs in Type 1 diabetes. BG > 300, pH < 7.35, ketones present. Treatment: IV fluids first, then insulin drip, potassium monitoring." },
            { front: "What is the onset of rapid-acting insulin (lispro/aspart)?", back: "15 minutes onset, peak 1-2 hours, duration 3-5 hours", rationale: "Given before meals (within 15 min of eating). Clear appearance. Can be given IV in emergencies." },
            { front: "What is the onset of regular insulin?", back: "30-60 minutes onset, peak 2-4 hours, duration 6-8 hours", rationale: "The only insulin that can be given IV. Clear appearance. Give 30 min before meals when given subcutaneously." },
            { front: "What is the onset of NPH insulin?", back: "1-2 hours onset, peak 4-12 hours, duration 18-24 hours", rationale: "Intermediate-acting, cloudy appearance. Must be rolled gently (not shaken). Often combined with rapid-acting insulin." },
            { front: "When mixing insulins, which is drawn up first?", back: "Clear before cloudy (regular before NPH)", rationale: "Remember 'RN' - Regular before NPH. Draw air into NPH first, then air into regular, draw regular first, then draw NPH." },
            { front: "What is the priority assessment for a patient on an insulin drip?", back: "Blood glucose monitoring every 1-2 hours and potassium levels", rationale: "Insulin drives potassium into cells, causing hypokalemia. IV potassium replacement is often needed. Monitor ECG for dysrhythmias." },
            { front: "What differentiates DKA from HHS (Hyperosmolar Hyperglycemic State)?", back: "DKA has ketones and metabolic acidosis; HHS has extreme hyperglycemia (>600) without significant ketosis", rationale: "DKA = Type 1, rapid onset, BG 300-800. HHS = Type 2, gradual onset, BG > 600, severe dehydration, higher mortality." },
            { front: "What are signs of the dawn phenomenon?", back: "Elevated fasting blood glucose (early morning hyperglycemia)", rationale: "Caused by growth hormone and cortisol release between 5-8 AM. Management: adjust evening insulin timing or increase dose." },
            { front: "Where are the best injection sites for insulin absorption?", back: "Abdomen (fastest), then arms, thighs, buttocks (slowest)", rationale: "Rotate within one region before moving to another. Avoid injecting within 2 inches of the navel. Exercise increases absorption at the site." },
          ],
        },
        {
          title: "Maternal & Newborn Essentials",
          slug: "maternal-newborn-essentials",
          description: "Pregnancy complications, labor stages, postpartum assessment, and newborn care",
          tags: ["maternity", "OB", "newborn"],
          cards: [
            { front: "What are warning signs of preeclampsia?", back: "BP 140/90+, proteinuria, headache, visual changes, epigastric pain, edema (face/hands)", rationale: "Preeclampsia occurs after 20 weeks gestation. Severe: BP 160/110+. Treatment: magnesium sulfate (seizure prevention), antihypertensives." },
            { front: "What is the antidote for magnesium sulfate toxicity?", back: "Calcium gluconate", rationale: "Signs of mag toxicity: loss of DTRs, respiratory depression (RR < 12), urine output < 30 mL/hr. Keep antidote at bedside." },
            { front: "What does APGAR assess?", back: "Appearance (color), Pulse, Grimace (reflex), Activity (muscle tone), Respirations", rationale: "Scored at 1 and 5 minutes after birth. Each category scored 0-2, total 0-10. Score 7-10 normal, < 7 needs intervention." },
            { front: "What is the normal fetal heart rate range?", back: "110-160 beats per minute", rationale: "Tachycardia > 160 (maternal fever, infection). Bradycardia < 110 (cord compression, late decelerations). Monitor with EFM." },
            { front: "What do late decelerations indicate?", back: "Uteroplacental insufficiency (fetal distress)", rationale: "Late decels begin after contraction peak and return to baseline after contraction ends. Interventions: left lateral position, O2, stop Pitocin, notify provider." },
            { front: "What is the BUBBLE-HE postpartum assessment?", back: "Breasts, Uterus, Bladder, Bowel, Lochia, Episiotomy/incision, Homan sign, Emotions", rationale: "Systematic head-to-toe postpartum check. Fundus should be firm, at or below umbilicus, midline. Boggy = massage firmly." },
            { front: "What is the normal progression of lochia?", back: "Rubra (red, 1-3 days), Serosa (pink-brown, 4-10 days), Alba (white-yellow, 10+ days)", rationale: "Saturating a pad in < 1 hour or passing large clots indicates hemorrhage. Assess for uterine atony or retained placenta." },
            { front: "What position is used for cord prolapse?", back: "Trendelenburg or knee-chest position", rationale: "Elevate hips above heart to relieve pressure on the cord. Do NOT attempt to push cord back. Cover cord with sterile saline gauze. Emergency C-section." },
            { front: "What is the normal newborn blood glucose?", back: "40-60 mg/dL in the first 24 hours, then > 45 mg/dL", rationale: "Screen at-risk infants: LGA, SGA, infants of diabetic mothers. Signs of hypoglycemia: jitteriness, poor feeding, lethargy, seizures." },
            { front: "When should the first hepatitis B vaccine be given?", back: "Within 12 hours of birth", rationale: "Part of the routine newborn immunization schedule. Given IM in the vastus lateralis. Second dose at 1 month, third at 6 months." },
          ],
        },
      ];

      for (const deck of starterDecks) {
        const deckResult = await pool.query(
          `INSERT INTO flashcard_decks (id, owner_id, title, description, tags, tier, visibility, slug, card_count, created_at, updated_at)
           VALUES (gen_random_uuid(), 'system', $1, $2, $3, 'free', 'public', $4, $5, NOW(), NOW()) RETURNING id`,
          [deck.title, deck.description, JSON.stringify(deck.tags), deck.slug, deck.cards.length]
        );
        const deckId = deckResult.rows[0].id;
        for (let i = 0; i < deck.cards.length; i++) {
          const card = deck.cards[i];
          await pool.query(
            `INSERT INTO deck_flashcards (id, deck_id, front, back, rationale, sort_order, created_at, updated_at)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())`,
            [deckId, card.front, card.back, card.rationale, i]
          );
        }
      }

      res.json({ message: "Starter decks seeded", count: starterDecks.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/deck-reports/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { status } = req.body;
      await pool.query(`UPDATE deck_reports SET status = $1 WHERE id = $2`, [status, req.params.id]);
      await logAudit(req, admin, "deck_report", req.params.id, "update_status", null, { status });
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/billing/deck-upgrade/create-checkout", async (req, res) => {
    try {
      const { userId, deckId } = req.body;
      if (!userId || !deckId) return res.status(400).json({ error: "userId and deckId required" });
      const deckCheck = await pool.query(`SELECT * FROM flashcard_decks WHERE id = $1 AND owner_id = $2`, [deckId, userId]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found or not owned by you" });
      if (deckCheck.rows[0].is_upgraded) return res.status(400).json({ error: "Deck already upgraded" });
      const stripe = (await import("stripe")).default;
      const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || "");
      const session = await stripeClient.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "cad",
            product_data: {
              name: `Deck Upgrade: ${deckCheck.rows[0].title}`,
              description: "Increase this deck's card limit to 300 cards",
            },
            unit_amount: 299,
          },
          quantity: 1,
        }],
        metadata: { userId, deckId, purchaseType: "deck_upgrade" },
        success_url: `${req.headers.origin || "https://www.nursenest.ca"}/flashcards?upgraded=${deckId}`,
        cancel_url: `${req.headers.origin || "https://www.nursenest.ca"}/flashcards`,
      });
      res.json({ url: session.url, sessionId: session.id });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Lesson overrides (GET endpoints are public — names/content shown to all users; PUT is admin-only)
  // --------------------
  app.get("/api/lesson-overrides", async (req, res) => {
    try {
      const result = await pool.query(`SELECT lesson_id, overrides FROM lesson_overrides`);
      const map: Record<string, any> = {};
      for (const row of result.rows) {
        map[row.lesson_id] = row.overrides || {};
      }
      res.json(map);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/lesson-overrides/:lessonId", async (req, res) => {
    try {
      const { lessonId } = req.params;
      const result = await pool.query(`SELECT overrides FROM lesson_overrides WHERE lesson_id = $1`, [lessonId]);
      if (result.rows.length > 0) {
        res.json(result.rows[0].overrides || {});
      } else {
        res.json({});
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/lesson-translations/:lessonId", async (req, res) => {
    try {
      const { lessonId } = req.params;
      const lang = (req.query.lang as string) || req.lang || "en";
      if (lang === "en") {
        return res.json({ lang: "en", translations: {}, availableLanguages: ["en"] });
      }

      const translations = await getTranslatedFields("lesson", lessonId, lang);
      const availableLanguages = await getAvailableLanguages("lesson", lessonId);

      const mapped: Record<string, string> = {};
      for (const [field, data] of Object.entries(translations)) {
        mapped[field] = data.text;
      }

      if (Object.keys(mapped).length > 0) {
        return res.json({ lang, translations: mapped, availableLanguages });
      }

      res.json({ lang, translations: {}, availableLanguages, needsTranslation: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/lesson-translations/:lessonId", async (req, res) => {
    try {
      const requestingUserTier = await extractUserTier(req);
      if (requestingUserTier !== "admin") {
        return res.status(403).json({ error: "Admin only" });
      }

      const { lessonId } = req.params;
      const { lang, translations } = req.body;
      if (!lang || !translations || typeof translations !== "object") {
        return res.status(400).json({ error: "lang and translations object required" });
      }

      for (const [fieldName, translatedText] of Object.entries(translations)) {
        if (typeof translatedText !== "string" || !translatedText.trim()) continue;

        await pool.query(
          `INSERT INTO content_translations (content_type, content_id, field_name, language_code, translated_text, translation_status, source_hash)
           VALUES ('lesson', $1, $2, $3, $4, 'auto', '')
           ON CONFLICT (content_type, content_id, field_name, language_code)
           DO UPDATE SET translated_text = $4, last_updated = NOW()`,
          [lessonId, fieldName, lang, translatedText]
        );
      }

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/lesson-translations/:lessonId/generate", async (req, res) => {
    try {
      const { lessonId } = req.params;
      const { lang, fields } = req.body;
      if (!lang || !fields || typeof fields !== "object") {
        return res.status(400).json({ error: "lang and fields object required" });
      }

      const LANG_NAMES: Record<string, string> = {
        fr: "French", es: "Spanish", zh: "Chinese (Simplified)", ar: "Arabic",
        hi: "Hindi", pt: "Portuguese", tl: "Filipino/Tagalog", ko: "Korean",
        ja: "Japanese", de: "German", vi: "Vietnamese", pa: "Punjabi",
        ur: "Urdu", fa: "Farsi/Persian"
      };
      const langName = LANG_NAMES[lang] || lang;

      const fieldsToTranslate = Object.entries(fields)
        .filter(([_, v]) => v != null && String(v).trim().length > 0)
        .map(([k, v]) => ({ field: k, text: typeof v === "string" ? v : JSON.stringify(v) }));

      if (fieldsToTranslate.length === 0) {
        return res.json({ success: true, translations: {} });
      }

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const prompt = `You are a professional medical/nursing translator. Translate the following nursing education content fields from English to ${langName}. 
Maintain clinical accuracy and use proper medical terminology in ${langName}.
Keep the same structure (if a field is a JSON array, return a JSON array in ${langName}).
Do NOT translate medical abbreviations (ECG, IV, NCLEX, etc.).
Return a JSON object where each key is the field name and each value is the translated text.

Fields to translate:
${fieldsToTranslate.map(f => `"${f.field}": ${JSON.stringify(f.text)}`).join(",\n")}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a medical content translator. Return ONLY valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 4096,
      });

      const raw = completion.choices[0]?.message?.content || "{}";
      let parsed: Record<string, string> = {};
      try {
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }

      for (const [fieldName, translatedText] of Object.entries(parsed)) {
        if (typeof translatedText !== "string" || !translatedText.trim()) continue;

        await pool.query(
          `INSERT INTO content_translations (content_type, content_id, field_name, language_code, translated_text, translation_status, source_hash)
           VALUES ('lesson', $1, $2, $3, $4, 'auto', $5)
           ON CONFLICT (content_type, content_id, field_name, language_code)
           DO UPDATE SET translated_text = $4, translation_status = 'auto', source_hash = $5, last_updated = NOW()`,
          [lessonId, fieldName, lang, translatedText, simpleHash(String(fields[fieldName] || ""))]
        );
      }

      res.json({ success: true, translations: parsed });
    } catch (e: any) {
      console.error("AI translation error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/content-translations/:id/save", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { id } = req.params;
      const { lang, translations } = req.body;
      if (!lang || !translations || typeof translations !== "object") {
        return res.status(400).json({ error: "lang and translations object required" });
      }
      for (const [fieldName, translatedText] of Object.entries(translations)) {
        if (typeof translatedText !== "string" || !translatedText.trim()) continue;
        await pool.query(
          `INSERT INTO content_translations (content_type, content_id, field_name, language_code, translated_text, translation_status, source_hash)
           VALUES ('content_item', $1, $2, $3, $4, 'human_reviewed', '')
           ON CONFLICT (content_type, content_id, field_name, language_code)
           DO UPDATE SET translated_text = $4, translation_status = 'human_reviewed', last_updated = NOW()`,
          [id, fieldName, lang, translatedText]
        );
      }
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/content-translations/:id/generate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { id } = req.params;
      const { lang, fields } = req.body;
      if (!lang || !fields || typeof fields !== "object") {
        return res.status(400).json({ error: "lang and fields object required" });
      }
      const LANG_NAMES: Record<string, string> = {
        fr: "French", es: "Spanish", zh: "Chinese (Simplified)", ar: "Arabic",
        hi: "Hindi", pt: "Portuguese", tl: "Filipino/Tagalog", ko: "Korean",
        ja: "Japanese", de: "German", vi: "Vietnamese", pa: "Punjabi",
        ur: "Urdu", fa: "Farsi/Persian"
      };
      const langName = LANG_NAMES[lang] || lang;
      const fieldsToTranslate = Object.entries(fields)
        .filter(([_, v]) => v != null && String(v).trim().length > 0)
        .map(([k, v]) => ({ field: k, text: typeof v === "string" ? v : JSON.stringify(v) }));
      if (fieldsToTranslate.length === 0) {
        return res.json({ success: true, translations: {} });
      }
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });
      const prompt = `You are a professional medical/nursing translator. Translate the following nursing education content fields from English to ${langName}. 
Maintain clinical accuracy and use proper medical terminology in ${langName}.
Keep the same structure (if a field is a JSON array, return a JSON array in ${langName}).
Do NOT translate medical abbreviations (ECG, IV, NCLEX, etc.).
Return a JSON object where each key is the field name and each value is the translated text.

Fields to translate:
${fieldsToTranslate.map(f => `"${f.field}": ${JSON.stringify(f.text)}`).join(",\n")}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a medical content translator. Return ONLY valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 4096,
      });
      const raw = completion.choices[0]?.message?.content || "{}";
      let parsed: Record<string, string> = {};
      try {
        const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }
      for (const [fieldName, translatedText] of Object.entries(parsed)) {
        if (typeof translatedText !== "string" || !translatedText.trim()) continue;
        await pool.query(
          `INSERT INTO content_translations (content_type, content_id, field_name, language_code, translated_text, translation_status, source_hash)
           VALUES ('content_item', $1, $2, $3, $4, 'auto', $5)
           ON CONFLICT (content_type, content_id, field_name, language_code)
           DO UPDATE SET translated_text = $4, translation_status = 'auto', source_hash = $5, last_updated = NOW()`,
          [id, fieldName, lang, translatedText, simpleHash(String(fields[fieldName] || ""))]
        );
      }
      res.json({ success: true, translations: parsed });
    } catch (e: any) {
      console.error("AI content translation error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  /**
   * IMPORTANT: This endpoint now expects admin credentials.
   * Send:
   * {
   *   username, password,
   *   overrides: { ... }
   * }
   */
  app.put("/api/lesson-overrides/:lessonId", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { lessonId } = req.params;
      const { username, password, ...overrides } = req.body || {};

      if (!overrides || typeof overrides !== "object") {
        return res.status(400).json({ error: "Invalid overrides data" });
      }

      const cleanOverrides = Object.fromEntries(Object.entries(overrides).filter(([_, v]) => v !== null && v !== undefined));

      if (Object.keys(cleanOverrides).length === 0) {
        await pool.query(`DELETE FROM lesson_overrides WHERE lesson_id = $1`, [lessonId]);
      } else {
        await pool.query(
          `INSERT INTO lesson_overrides (lesson_id, overrides, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (lesson_id)
           DO UPDATE SET overrides = $2, updated_at = NOW()`,
          [lessonId, JSON.stringify(cleanOverrides)],
        );
      }

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Lesson Images (admin only)
  // --------------------
  app.get("/api/lesson-images/:lessonId", async (req, res) => {
    try {
      const { lessonId } = req.params;
      const result = await pool.query(
        `SELECT * FROM lesson_images WHERE lesson_id = $1 ORDER BY section, position`,
        [lessonId]
      );
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/lesson-images", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { lessonId, objectPath, fileName, section, caption, position } = req.body;
      if (!lessonId || !objectPath || !fileName) {
        return res.status(400).json({ error: "lessonId, objectPath, and fileName are required" });
      }

      const result = await pool.query(
        `INSERT INTO lesson_images (lesson_id, object_path, file_name, section, caption, position)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [lessonId, objectPath, fileName, section || "general", caption || null, position || 0]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/lesson-images/:imageId", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { imageId } = req.params;
      const { caption, section, position } = req.body;
      const result = await pool.query(
        `UPDATE lesson_images SET caption = COALESCE($1, caption), section = COALESCE($2, section), position = COALESCE($3, position) WHERE id = $4 RETURNING *`,
        [caption, section, position, imageId]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Image not found" });
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/lesson-images/:imageId", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { imageId } = req.params;
      await pool.query(`DELETE FROM lesson_images WHERE id = $1`, [imageId]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/ai/generate-lesson-image", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { lessonId, section, prompt, caption } = req.body;
      if (!lessonId || !prompt) {
        return res.status(400).json({ error: "lessonId and prompt are required" });
      }

      const negativePrefix = "Do NOT include any text, words, labels, letters, numbers, annotations, captions, titles, watermarks, or writing of any kind in this image. ";
      const fullPrompt = negativePrefix + prompt;

      const { generateImageBuffer } = await import("./replit_integrations/image/client");
      const imageBuffer = await generateImageBuffer(fullPrompt, "1024x1024");

      const objectStorageService = new (await import("./replit_integrations/object_storage/objectStorage")).ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": "image/png" },
        body: imageBuffer,
      });
      if (!uploadRes.ok) {
        throw new Error("Failed to upload AI image to storage");
      }

      const objectPath = objectStorageService.normalizeObjectEntityPath(uploadURL);

      const countResult = await pool.query(
        `SELECT COUNT(*) as cnt FROM lesson_images WHERE lesson_id = $1 AND section = $2`,
        [lessonId, section || "general"]
      );
      const position = parseInt(countResult.rows[0]?.cnt || "0");

      const result = await pool.query(
        `INSERT INTO lesson_images (lesson_id, object_path, file_name, section, caption, position)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [lessonId, objectPath, `ai-generated-${Date.now()}.png`, section || "general", caption || null, position]
      );

      recordAiUsage(1, 0);
      res.json(result.rows[0]);
    } catch (e: any) {
      console.error("AI image generation error:", e);
      res.status(500).json({ error: e.message || "Failed to generate image" });
    }
  });

  // --------------------
  // Feature usage (unchanged)
  // --------------------
  const validFeatures = ["lab-values", "med-math"];

  app.get("/api/feature-usage/:userId/:feature", async (req, res) => {
    try {
      const { userId, feature } = req.params;
      if (!validFeatures.includes(feature)) return res.status(400).json({ error: "Invalid feature" });

      const today = new Date().toISOString().slice(0, 10);
      const usage = await storage.getFeatureUsage(userId, feature, today);
      const user = await storage.getUser(userId);

      const hasUnlimited =
        user?.tier === "admin" ||
        (user?.subscriptionStatus === "active" &&
          ((user?.tier === "lab-values" && feature === "lab-values") ||
            (user?.tier === "med-math" && feature === "med-math") ||
            user?.tier === "practice-tools" ||
            ["rpn", "rn", "np"].includes(user?.tier || "")));

      res.json({ count: usage?.count || 0, limit: 10, hasUnlimited });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/feature-usage/:userId/:feature/increment", async (req, res) => {
    try {
      const { userId, feature } = req.params;
      if (!validFeatures.includes(feature)) return res.status(400).json({ error: "Invalid feature" });

      const today = new Date().toISOString().slice(0, 10);
      const user = await storage.getUser(userId);

      const hasUnlimited =
        user?.tier === "admin" ||
        (user?.subscriptionStatus === "active" &&
          ((user?.tier === "lab-values" && feature === "lab-values") ||
            (user?.tier === "med-math" && feature === "med-math") ||
            user?.tier === "practice-tools" ||
            ["rpn", "rn", "np"].includes(user?.tier || "")));

      if (hasUnlimited) {
        return res.json({ count: 0, limit: 10, hasUnlimited: true });
      }

      const usage = await storage.incrementFeatureUsage(userId, feature, today);
      res.json({ count: usage.count, limit: 10, hasUnlimited: false });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Blog automation (kept, now uses requireAdmin for consistency)
  // --------------------
  app.get("/api/blog/config", async (_req, res) => {
    try {
      const config = await storage.getBlogConfig();
      res.json(config || { isActive: false, citationStyle: "apa7", postsPerDay: 2, dayCount: 0, totalPostsGenerated: 0 });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/blog/config", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { citationStyle, postsPerDay, isActive, dayCount } = req.body;
      const updates: any = {};
      if (citationStyle !== undefined) updates.citationStyle = citationStyle;
      if (postsPerDay !== undefined) updates.postsPerDay = postsPerDay;
      if (isActive !== undefined) updates.isActive = isActive;
      if (dayCount !== undefined) updates.dayCount = dayCount;

      const config = await storage.upsertBlogConfig(updates);
      res.json(config);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/generate-image", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { prompt, size = "1024x1024", filename } = req.body;
      if (!prompt) return res.status(400).json({ error: "Prompt is required" });
      if (prompt.length > 2000) return res.status(400).json({ error: "Prompt too long (max 2000 chars)" });
      const validSizes = ["1024x1024", "512x512", "256x256"];
      const safeSize = validSizes.includes(size) ? size : "1024x1024";

      const { generateImageBuffer } = await import("./replit_integrations/image/client");
      const medicalPrompt = `Medical illustration, clean white background, no text, no labels, no letters, no numbers, no watermarks, no annotations. ${prompt}`;
      const buffer = await generateImageBuffer(medicalPrompt, safeSize as any);

      const fs = await import("fs");
      const pathMod = await import("path");
      const dir = pathMod.default.resolve(process.cwd(), "attached_assets", "generated_images");
      if (!fs.default.existsSync(dir)) fs.default.mkdirSync(dir, { recursive: true });

      const safeName = (filename || prompt.slice(0, 40)).replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase().replace(/-+/g, "-");
      const finalName = `${safeName}-${Date.now()}.png`;
      const filePath = pathMod.default.join(dir, finalName);
      fs.default.writeFileSync(filePath, buffer);

      const url = `/attached_assets/generated_images/${finalName}`;
      res.json({ url, filename: finalName, size: buffer.length });
    } catch (e: any) {
      console.error("[ImageGen] Error:", e.message);
      res.status(500).json({ error: e.message || "Image generation failed" });
    }
  });

  app.get("/api/admin/generated-images", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const fs = await import("fs");
      const pathMod = await import("path");
      const dir = pathMod.default.resolve(process.cwd(), "attached_assets", "generated_images");
      if (!fs.default.existsSync(dir)) return res.json([]);

      const files = fs.default.readdirSync(dir)
        .filter((f: string) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".webp"))
        .map((f: string) => {
          const stat = fs.default.statSync(pathMod.default.join(dir, f));
          return { filename: f, url: `/attached_assets/generated_images/${f}`, size: stat.size, createdAt: stat.mtime.toISOString() };
        })
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      res.json(files);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/generated-images/:filename", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const fs = await import("fs");
      const pathMod = await import("path");
      const filePath = pathMod.default.resolve(process.cwd(), "attached_assets", "generated_images", req.params.filename);
      if (fs.default.existsSync(filePath)) fs.default.unlinkSync(filePath);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/generate-microlecture", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { topic, tier, focus } = req.body;
      if (!topic || !tier) return res.status(400).json({ error: "Topic and tier are required" });
      if (!["RPN", "RN", "NP"].includes(tier)) return res.status(400).json({ error: "Tier must be RPN, RN, or NP" });

      const tierScope: Record<string, string> = {
        RPN: "Practical nursing scope (LPN/RPN). Focus on foundational pathophysiology, safe medication administration, patient monitoring, and delegation awareness.",
        RN: "Registered Nurse scope. Include cellular-level pathophysiology, pharmacokinetics, advanced assessments, and clinical decision-making.",
        NP: "Nurse Practitioner scope. Cover advanced pathophysiology at molecular level, differential diagnosis, prescribing rationale, and evidence-based treatment protocols."
      };

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const systemPrompt = `You are a senior nurse educator creating a micro-lecture for ${tier} students. ${tierScope[tier]}
Generate a comprehensive, mechanism-driven micro-lecture. Do NOT give shallow summaries — explain WHY signs/symptoms happen and what treatments target at the cellular level.
${focus ? `Special focus: ${focus}` : ""}

Return valid JSON with this exact structure:
{
  "title": "string",
  "durationEstimate": "string (e.g. '15-20 minutes')",
  "keywords": ["string array"],
  "script": {
    "introduction": "string (2-3 paragraphs)",
    "sections": [
      {
        "heading": "string",
        "content": "string (detailed narration, 3-5 paragraphs)",
        "clinicalPearl": "string (exam tip)"
      }
    ],
    "summary": "string (key takeaways)"
  },
  "slides": [
    {
      "title": "string",
      "bullets": ["string array, 4-6 points"],
      "speakerNotes": "string",
      "visualPrompt": "string (image description for AI generation)"
    }
  ],
  "flashcards": [
    {
      "front": "string (question)",
      "back": "string (answer)"
    }
  ]
}

Generate 8-15 slides and 10-20 flashcards. Be thorough and clinically accurate.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create a micro-lecture on: ${topic}` }
        ],
        temperature: 0.7,
        max_tokens: 8000,
        response_format: { type: "json_object" },
      });
      const result = response.choices[0]?.message?.content || "";
      
      let parsed;
      try {
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found in response");
        parsed = JSON.parse(jsonMatch[0]);
      } catch (parseErr) {
        return res.status(500).json({ error: "Failed to parse AI response as JSON" });
      }

      const slug = (parsed.title || topic).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const { db } = await import("./storage");
      const { generatedMicroLectures } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");

      const existing = await db.select().from(generatedMicroLectures).where(eq(generatedMicroLectures.slug, slug)).limit(1);
      const finalSlug = existing.length > 0 ? `${slug}-${Date.now()}` : slug;

      const [lecture] = await db.insert(generatedMicroLectures).values({
        title: parsed.title || topic,
        slug: finalSlug,
        topic,
        tier,
        focus: focus || null,
        durationEstimate: parsed.durationEstimate || "15-20 minutes",
        scriptJson: parsed.script,
        slidesJson: parsed.slides,
        flashcardsJson: parsed.flashcards,
        keywords: parsed.keywords || [],
        isPublished: false,
      }).returning();

      res.json({ success: true, lecture });
    } catch (e: any) {
      console.error("[MicroLecture Gen Error]", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/microlectures", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { generatedMicroLectures } = await import("@shared/schema");
      const lectures = await db.select().from(generatedMicroLectures).orderBy(generatedMicroLectures.createdAt);
      res.json(lectures);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/microlectures/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { generatedMicroLectures } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      await db.delete(generatedMicroLectures).where(eq(generatedMicroLectures.id, req.params.id));
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/microlectures/:id/publish", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { generatedMicroLectures } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      const [updated] = await db.update(generatedMicroLectures)
        .set({ isPublished: req.body.publish !== false })
        .where(eq(generatedMicroLectures.id, req.params.id))
        .returning();
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/design-projects", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { designProjects } = await import("@shared/schema");
      const projects = await db.select().from(designProjects).orderBy(designProjects.updatedAt);
      res.json(projects);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/design-projects", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { title, type, pageSize, orientation } = req.body;
      if (!title || !type) return res.status(400).json({ error: "Title and type are required" });
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now();
      const { db } = await import("./storage");
      const { designProjects, designPages } = await import("@shared/schema");
      const [project] = await db.insert(designProjects).values({
        title,
        slug,
        type,
        pageSize: pageSize || "Letter",
        orientation: orientation || "portrait",
        createdByAdminId: admin.id,
      }).returning();
      await db.insert(designPages).values({
        projectId: project.id,
        pageNumber: 1,
        canvasJson: { objects: [], version: "5.3.0" },
        backgroundColor: "#ffffff",
      });
      res.json(project);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/design-projects/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { designProjects, designPages, designAssets } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      const [project] = await db.select().from(designProjects).where(eq(designProjects.id, req.params.id)).limit(1);
      if (!project) return res.status(404).json({ error: "Project not found" });
      const pages = await db.select().from(designPages).where(eq(designPages.projectId, req.params.id)).orderBy(designPages.pageNumber);
      const assets = await db.select().from(designAssets).where(eq(designAssets.projectId, req.params.id));
      res.json({ ...project, pages, assets });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/design-projects/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { designProjects } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      const [updated] = await db.update(designProjects)
        .set({ ...req.body, updatedAt: new Date() })
        .where(eq(designProjects.id, req.params.id))
        .returning();
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/design-projects/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { designProjects, designPages, designAssets, exportedFiles } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      await db.delete(designPages).where(eq(designPages.projectId, req.params.id));
      await db.delete(designAssets).where(eq(designAssets.projectId, req.params.id));
      await db.delete(exportedFiles).where(eq(exportedFiles.projectId, req.params.id));
      await db.delete(designProjects).where(eq(designProjects.id, req.params.id));
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/design-pages/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { designPages } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      const [updated] = await db.update(designPages)
        .set({ canvasJson: req.body.canvasJson, backgroundColor: req.body.backgroundColor, updatedAt: new Date() })
        .where(eq(designPages.id, req.params.id))
        .returning();
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/design-projects/:projectId/pages", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { designPages } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      const existing = await db.select().from(designPages).where(eq(designPages.projectId, req.params.projectId));
      const [page] = await db.insert(designPages).values({
        projectId: req.params.projectId,
        pageNumber: existing.length + 1,
        canvasJson: req.body.canvasJson || { objects: [], version: "5.3.0" },
        backgroundColor: req.body.backgroundColor || "#ffffff",
      }).returning();
      res.json(page);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/design-pages/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { db } = await import("./storage");
      const { designPages } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");
      await db.delete(designPages).where(eq(designPages.id, req.params.id));
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/blog/generate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { topic, citationStyle } = req.body;
      const post = await generateBlogPost(topic, citationStyle || "apa7");

      const isDup = await storage.checkDuplicateSlug(post.slug);
      const finalSlug = isDup ? `${post.slug}-${Date.now()}` : post.slug;

      const created = await storage.createContentItem({
        title: post.title,
        slug: finalSlug,
        type: "blog",
        category: "nursing-education",
        tier: "free",
        status: "published",
        tags: post.tags,
        summary: post.summary,
        content: post.content,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
        primaryKeyword: post.primaryKeyword,
        publishedAt: new Date(),
        autoPublish: true,
        authorName: "Erika Godin, RN",
      });

      res.json(created);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/blog/occupied-days", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(`
        SELECT DISTINCT DATE(COALESCE(scheduled_at, published_at)) AS day
        FROM content_items
        WHERE type = 'blog'
          AND status IN ('scheduled', 'published')
          AND COALESCE(scheduled_at, published_at) >= CURRENT_DATE
        ORDER BY day ASC
      `);
      const days = result.rows.map((r: any) => r.day ? new Date(r.day).toISOString().slice(0, 10) : null).filter(Boolean);
      res.json({ occupiedDays: days });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/blog/generate-batch", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { topics, citationStyle, scheduleStartDate, postsPerDay, publishAllNow, authorName, smartSchedule, overrideDates } = req.body;
      if (!topics || !Array.isArray(topics) || topics.length === 0) {
        return res.status(400).json({ error: "topics array is required" });
      }
      if (topics.length > 20) {
        return res.status(400).json({ error: "Maximum 20 topics per batch" });
      }

      const perDay = Math.max(1, Math.min(10, postsPerDay || 1));
      const results: any[] = [];
      const startDate = scheduleStartDate ? new Date(scheduleStartDate) : new Date();

      let availableDays: string[] = [];
      if (smartSchedule && !publishAllNow) {
        const occResult = await pool.query(`
          SELECT DISTINCT DATE(COALESCE(scheduled_at, published_at)) AS day
          FROM content_items
          WHERE type = 'blog'
            AND status IN ('scheduled', 'published')
            AND COALESCE(scheduled_at, published_at) >= CURRENT_DATE
        `);
        const occupiedSet = new Set(occResult.rows.map((r: any) => r.day ? new Date(r.day).toISOString().slice(0, 10) : "").filter(Boolean));

        const totalSlotsNeeded = Math.ceil(topics.filter(t => typeof t === "string" ? t.trim() : t?.topic?.trim()).length / perDay);
        const cursor = new Date(startDate);
        while (availableDays.length < totalSlotsNeeded) {
          const dayStr = cursor.toISOString().slice(0, 10);
          if (!occupiedSet.has(dayStr)) {
            availableDays.push(dayStr);
          }
          cursor.setDate(cursor.getDate() + 1);
          if (availableDays.length === 0 && cursor.getTime() - startDate.getTime() > 365 * 86400000) break;
        }
      }

      const useOverride = overrideDates && Array.isArray(overrideDates) && overrideDates.length > 0;

      let slotCounter = 0;

      for (let i = 0; i < topics.length; i++) {
        const topicEntry = topics[i];
        const topicText = typeof topicEntry === "string" ? topicEntry : topicEntry.topic;

        if (!topicText || !topicText.trim()) {
          results.push({ index: i, status: "skipped", reason: "Empty topic" });
          continue;
        }

        try {
          const post = await generateBlogPost(topicText.trim(), citationStyle || "apa7");
          const isDup = await storage.checkDuplicateSlug(post.slug);
          const finalSlug = isDup ? `${post.slug}-${Date.now()}` : post.slug;

          let scheduledDate: Date;
          const slotInDay = slotCounter % perDay;

          if (useOverride && overrideDates[i]) {
            scheduledDate = new Date(overrideDates[i]);
            scheduledDate.setHours(9 + slotInDay * 2, 0, 0, 0);
          } else if (smartSchedule && !publishAllNow && availableDays.length > 0) {
            const dayIndex = Math.floor(slotCounter / perDay);
            const dayStr = availableDays[Math.min(dayIndex, availableDays.length - 1)];
            scheduledDate = new Date(dayStr + "T09:00:00");
            scheduledDate.setHours(9 + slotInDay * 2, 0, 0, 0);
          } else {
            const dayOffset = typeof topicEntry === "string" ? Math.floor(slotCounter / perDay) : (topicEntry.dayOffset ?? Math.floor(slotCounter / perDay));
            scheduledDate = new Date(startDate);
            scheduledDate.setDate(scheduledDate.getDate() + dayOffset);
            scheduledDate.setHours(9 + slotInDay * 2, 0, 0, 0);
          }

          const isImmediate = publishAllNow;

          const created = await storage.createContentItem({
            title: post.title,
            slug: finalSlug,
            type: "blog",
            category: "nursing-education",
            tier: "free",
            status: isImmediate ? "published" : "scheduled",
            tags: post.tags,
            summary: post.summary,
            content: post.content,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            seoKeywords: post.seoKeywords,
            primaryKeyword: post.primaryKeyword,
            publishedAt: isImmediate ? new Date() : null,
            scheduledAt: isImmediate ? null : scheduledDate,
            autoPublish: true,
            authorName: authorName || "Erika Godin, RN",
          });

          slotCounter++;
          results.push({ index: i, status: "success", id: created.id, title: created.title, scheduledAt: isImmediate ? null : scheduledDate.toISOString() });
        } catch (err: any) {
          results.push({ index: i, status: "failed", topic: topicText, error: err.message });
        }
      }

      res.json({ total: topics.length, generated: results.filter(r => r.status === "success").length, results });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/blog/queue", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(`
        SELECT * FROM content_items
        WHERE status = 'scheduled' AND type = 'blog'
        ORDER BY scheduled_at ASC NULLS LAST
      `);
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/blog/queue/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { id } = req.params;
      const { scheduledAt, status } = req.body;
      const updates: any = {};
      if (scheduledAt !== undefined) updates.scheduled_at = scheduledAt ? new Date(scheduledAt) : null;
      if (status) {
        updates.status = status;
        if (status === "published") {
          updates.published_at = new Date();
          updates.scheduled_at = null;
        }
      }
      const setClauses = Object.entries(updates).map(([key], i) => `${key} = $${i + 2}`).join(", ");
      const values = Object.values(updates);
      if (setClauses) {
        await pool.query(`UPDATE content_items SET ${setClauses}, updated_at = NOW() WHERE id = $1`, [id, ...values]);
      }
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/blog/publish-scheduled", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const now = new Date();
      const blogMinWords = parseInt(process.env.BLOG_MIN_WORDS || "1500", 10);
      
      const candidates = await pool.query(`
        SELECT id, title, body, content FROM content_items
        WHERE status = 'scheduled' AND scheduled_at <= $1 AND type = 'blog'
      `, [now]);
      
      const published: any[] = [];
      const skipped: any[] = [];
      
      for (const row of candidates.rows) {
        const bodyText = extractTextFromContent(row.body || row.content);
        const wc = countWords(bodyText);
        if (wc < blogMinWords) {
          skipped.push({ id: row.id, title: row.title, wordCount: wc, reason: "POST_TOO_SHORT" });
          console.log(`[Blog Scheduler] Skipping "${row.title}" (${wc} words < ${blogMinWords} minimum) — POST_TOO_SHORT`);
          continue;
        }
        await pool.query(`
          UPDATE content_items
          SET status = 'published', published_at = NOW(), scheduled_at = NULL, updated_at = NOW()
          WHERE id = $1
        `, [row.id]);
        published.push({ id: row.id, title: row.title });
      }
      
      res.json({ published: published.length, posts: published, skipped });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/blog/run-scheduler", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await runBlogScheduler();
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/blog/expand-all", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const minWords = req.body.minWords || 2000;
      res.json({ status: "started", message: "Blog expansion started in background" });

      expandAllShortPosts(minWords).then(result => {
        console.log("Blog expansion complete:", JSON.stringify(result));
      }).catch(err => {
        console.error("Blog expansion error:", err);
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Mock exams (unchanged auth style)
  // --------------------
  async function getAuthUser(req: any) {
    const username = req.headers["x-username"] as string;
    const password = req.headers["x-password"] as string;
    if (!username || !password) return null;
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) return null;
    return user;
  }

  app.post("/api/mock-exams/start", async (req, res) => {
    try {
      const authUser = await getAuthUser(req);
      if (!authUser) return res.status(401).json({ error: "Authentication required" });

      const { tier, totalQuestions, questions } = req.body;
      if (!tier || !totalQuestions || !questions || !Array.isArray(questions)) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (authUser.tier !== "admin" && authUser.tier !== tier) {
        return res.status(403).json({ error: "You can only access exams matching your subscription tier" });
      }

      const result = await pool.query(
        `INSERT INTO mock_exam_attempts (user_id, tier, total_questions, questions, status)
         VALUES ($1, $2, $3, $4, 'in_progress')
         RETURNING id`,
        [String(authUser.id), tier, totalQuestions, JSON.stringify(questions)],
      );

      res.json({ attemptId: result.rows[0].id });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/mock-exams/:attemptId/progress", async (req, res) => {
    try {
      const authUser = await getAuthUser(req);
      if (!authUser) return res.status(401).json({ error: "Authentication required" });

      const { attemptId } = req.params;
      const { answers, flagged, timeSpent } = req.body;

      const check = await pool.query(`SELECT user_id FROM mock_exam_attempts WHERE id = $1`, [attemptId]);
      if (check.rows.length === 0) return res.status(404).json({ error: "Exam not found" });
      if (check.rows[0].user_id !== String(authUser.id)) return res.status(403).json({ error: "Access denied" });

      await pool.query(
        `UPDATE mock_exam_attempts SET answers = $1, flagged = $2, time_spent = $3 WHERE id = $4`,
        [JSON.stringify(answers || {}), JSON.stringify(flagged || []), timeSpent || 0, attemptId],
      );

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/mock-exams/:attemptId/complete", async (req, res) => {
    try {
      const authUser = await getAuthUser(req);
      if (!authUser) return res.status(401).json({ error: "Authentication required" });

      const { attemptId } = req.params;
      const { answers, flagged, timeSpent, report } = req.body;
      if (!answers || !report) return res.status(400).json({ error: "Missing required fields" });

      const check = await pool.query(`SELECT user_id FROM mock_exam_attempts WHERE id = $1`, [attemptId]);
      if (check.rows.length === 0) return res.status(404).json({ error: "Exam not found" });
      if (check.rows[0].user_id !== String(authUser.id)) return res.status(403).json({ error: "Access denied" });

      await pool.query(
        `UPDATE mock_exam_attempts
         SET status = 'completed',
             answers = $1,
             flagged = $2,
             time_spent = $3,
             report = $4,
             score = $5,
             completed_at = NOW()
         WHERE id = $6`,
        [JSON.stringify(answers), JSON.stringify(flagged || []), timeSpent, JSON.stringify(report), report.score, attemptId],
      );

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/mock-exams/history/:userId", async (req, res) => {
    try {
      const authUser = await getAuthUser(req);
      if (!authUser) return res.status(401).json({ error: "Authentication required" });

      if (String(authUser.id) !== req.params.userId && authUser.tier !== "admin") {
        return res.status(403).json({ error: "Access denied" });
      }

      const result = await pool.query(
        `SELECT id, tier, total_questions, status, score, time_spent, started_at, completed_at, report
         FROM mock_exam_attempts
         WHERE user_id = $1
         ORDER BY started_at DESC
         LIMIT 20`,
        [req.params.userId],
      );

      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/mock-exams/:attemptId", async (req, res) => {
    try {
      const authUser = await getAuthUser(req);
      if (!authUser) return res.status(401).json({ error: "Authentication required" });

      const { attemptId } = req.params;
      const result = await pool.query(`SELECT * FROM mock_exam_attempts WHERE id = $1`, [attemptId]);

      if (result.rows.length === 0) return res.status(404).json({ error: "Exam not found" });
      if (result.rows[0].user_id !== String(authUser.id) && authUser.tier !== "admin") {
        return res.status(403).json({ error: "Access denied" });
      }

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // PayPal (unchanged)
  // --------------------
  app.get("/api/paypal/status", (_req, res) => {
    res.json({ configured: isPaypalConfigured() });
  });

  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  app.post("/api/paypal/activate-subscription", async (req, res) => {
    try {
      const { userId, tier, paypalOrderId, username, password } = req.body;
      if (!userId || !tier) return res.status(400).json({ error: "userId and tier required" });
      if (!paypalOrderId) return res.status(400).json({ error: "PayPal order ID required" });

      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      if (username && password) {
        if (user.username !== username || user.password !== password) {
          return res.status(403).json({ error: "Authentication failed" });
        }
      }

      if (String(user.id) !== String(userId)) {
        return res.status(403).json({ error: "User mismatch" });
      }

      const validTiers = ["rpn", "rn", "np", "1-day", "3-day", "lab-values", "med-math", "practice-tools"];
      if (!validTiers.includes(tier)) {
        return res.status(400).json({ error: "Invalid tier" });
      }

      await storage.updateUserStripeInfo(userId, {
        subscriptionStatus: "active",
        tier,
      });

      console.log(`PayPal subscription activated: user=${userId}, tier=${tier}, paypalOrder=${paypalOrderId}`);
      res.json({ success: true, tier });
    } catch (e: any) {
      console.error("PayPal activation error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Tracking + Admin site analytics (NOW PROTECTED)
  // --------------------
  app.post("/api/track/pageview", async (req, res) => {
    try {
      const view = await storage.createPageView(req.body);
      res.json(view);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/track/duration", async (req, res) => {
    try {
      const { sessionId, page, duration } = req.body;
      await storage.updatePageViewDuration(sessionId, page, duration);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  /**
   * NOW protected. Your Admin UI must call this with username/password.
   * Recommended: use POST instead of GET so credentials are not in the URL.
   * But to keep your current UI, we accept both body and query.
   */
  app.get("/api/admin/site-analytics", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const days = parseInt(req.query.days as string) || 30;
      const dbStorage = storage as DatabaseStorage;

      const [analytics, allUsers] = await Promise.all([
        storage.getPageViewAnalytics(days),
        dbStorage.getAllUsers(),
      ]);

      const subscriptionBreakdown: Record<string, number> = { free: 0, rpn: 0, rn: 0, np: 0, admin: 0 };
      const statusBreakdown: Record<string, number> = {};
      const regionBreakdown: Record<string, number> = {};

      allUsers.forEach((u: any) => {
        const tier = u.tier || "free";
        subscriptionBreakdown[tier] = (subscriptionBreakdown[tier] || 0) + 1;
        const status = u.subscriptionStatus || "inactive";
        statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
        const region = u.region || "US";
        regionBreakdown[region] = (regionBreakdown[region] || 0) + 1;
      });

      const activeSubscribers = allUsers.filter((u: any) => u.subscriptionStatus === "active" && u.tier !== "free" && u.tier !== "admin").length;

      const conversionFunnel = {
        totalVisitors: analytics.uniqueSessions,
        pricingViews: analytics.pricingViews,
        checkoutIntents: analytics.checkoutIntents,
        activeSubscribers,
        pricingRate: analytics.uniqueSessions > 0 ? Math.round((analytics.pricingViews / analytics.uniqueSessions) * 100) : 0,
        checkoutRate: analytics.pricingViews > 0 ? Math.round((analytics.checkoutIntents / analytics.pricingViews) * 100) : 0,
      };

      const toSortedArray = (obj: Record<string, number>) =>
        Object.entries(obj)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({ name, count }));

      res.json({
        traffic: {
          totalViews: analytics.totalViews,
          uniqueSessions: analytics.uniqueSessions,
          avgDuration: analytics.avgDuration,
          bounceRate: analytics.bounceRate,
        },
        topPages: analytics.topPages,
        topReferrers: analytics.topReferrers,
        devices: toSortedArray(analytics.devices || {}),
        browsers: toSortedArray(analytics.browsers || {}),
        operatingSystems: toSortedArray(analytics.operatingSystems || {}),
        subscriptionBreakdown,
        subscriptionStatus: statusBreakdown,
        userRegions: regionBreakdown,
        totalUsers: allUsers.length,
        activeSubscribers,
        conversionFunnel,
        dailyViews: analytics.dailyViews,
        utmCampaigns: analytics.utmCampaigns,
        utmSources: analytics.utmSources,
        utmMediums: analytics.utmMediums,
        utmCampaignNames: analytics.utmCampaignNames,
        blogContent: analytics.blogContent,
        countries: analytics.countries,
        conversionRate: analytics.conversionRate,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });


  // --------------------
  // Feedback (unchanged)
  // --------------------
  app.post("/api/feedback", async (req, res) => {
    try {
      const feedback = await storage.createFeedback(req.body);
      res.json(feedback);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/feedback", async (_req, res) => {
    try {
      const feedbackList = await storage.getAllFeedback();
      res.json(feedbackList);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/feedback/:id", async (req, res) => {
    try {
      const updated = await storage.updateFeedback(req.params.id, req.body);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/feedback/:id/upvote", async (_req, res) => {
    try {
      const updated = await storage.upvoteFeedback(_req.params.id);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Question of the Day
  // --------------------
  app.get("/api/qotd/today", async (_req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      let qotd = await storage.getQotdByDate(today);
      if (!qotd) {
        const { buildQuestionPoolServer } = await import("./qotd-engine");
        const question = buildQuestionPoolServer();
        if (question) {
          qotd = await storage.createQotd({
            questionDate: today,
            tier: question.tier,
            questionText: question.question,
            options: question.options as any,
            correctIndex: question.correct,
            rationale: question.rationale,
            bodySystem: question.bodySystem,
            lessonId: question.lessonId,
          });
        }
      }
      if (qotd) {
        res.json({
          date: qotd.questionDate,
          tier: qotd.tier,
          question: qotd.questionText,
          options: qotd.options,
          correctIndex: qotd.correctIndex,
          rationale: qotd.rationale,
          bodySystem: qotd.bodySystem,
          lessonId: qotd.lessonId,
        });
      } else {
        res.status(404).json({ error: "No questions available" });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/qotd/archive", async (_req, res) => {
    try {
      const limit = parseInt(_req.query.limit as string) || 30;
      const archive = await storage.getRecentQotd(limit);
      res.json(archive.map(q => ({
        date: q.questionDate,
        tier: q.tier,
        question: q.questionText,
        bodySystem: q.bodySystem,
      })));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Email Subscribers
  // --------------------
  const VALID_FREQUENCIES = ["daily", "twice_daily", "3x_daily", "every_other_day", "twice_week", "3x_week", "weekly", "biweekly", "monthly"];

  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, tier, source, frequency } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email required" });
      }
      const freq = VALID_FREQUENCIES.includes(frequency) ? frequency : "weekly";
      const existing = await storage.getEmailSubscriberByEmail(email.toLowerCase().trim());
      if (existing) {
        return res.json({ message: "Already subscribed", subscriber: existing });
      }
      const subscriber = await storage.createEmailSubscriber({
        email: email.toLowerCase().trim(),
        tier: tier || "general",
        source: source || "homepage",
        verified: false,
        frequency: freq,
      });
      res.json({ message: "Subscribed successfully", subscriber });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/subscribe/:email", async (req, res) => {
    try {
      const subscriber = await storage.getEmailSubscriberByEmail(req.params.email.toLowerCase().trim());
      if (!subscriber) {
        return res.status(404).json({ error: "Not subscribed" });
      }
      res.json(subscriber);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/subscribe/:email", async (req, res) => {
    try {
      const { frequency } = req.body;
      if (frequency && !VALID_FREQUENCIES.includes(frequency)) {
        return res.status(400).json({ error: "Invalid frequency" });
      }
      const updated = await storage.updateEmailSubscriber(req.params.email.toLowerCase().trim(), { frequency });
      if (!updated) {
        return res.status(404).json({ error: "Not subscribed" });
      }
      res.json({ message: "Subscription updated", subscriber: updated });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/subscribe/:email", async (req, res) => {
    try {
      await storage.deleteEmailSubscriber(req.params.email.toLowerCase().trim());
      res.json({ message: "Unsubscribed successfully" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Social Posts (Admin)
  // --------------------
  app.get("/api/admin/social-posts", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const posts = await storage.getAllSocialPosts();
      res.json(posts);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/social-posts", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { platform, postType, content, imageUrl, hashtags, scheduledAt, tier, questionData } = req.body;
      const post = await storage.createSocialPost({
        platform,
        postType: postType || "qotd",
        content,
        imageUrl,
        hashtags: hashtags || [],
        status: "scheduled",
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        tier: tier || "rpn",
        questionData: questionData || {},
      });
      res.json(post);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/social-posts/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const updated = await storage.updateSocialPost(req.params.id, req.body);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/social-posts/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await storage.deleteSocialPost(req.params.id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Social Cron (protected by SOCIAL_CRON_SECRET)
  // --------------------
  app.post("/api/cron/social-publish", async (req, res) => {
    try {
      const secret = req.headers["x-cron-secret"] || req.body.secret;
      if (!process.env.SOCIAL_CRON_SECRET || secret !== process.env.SOCIAL_CRON_SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const duePosts = await storage.getScheduledSocialPosts();
      const results: any[] = [];
      for (const post of duePosts) {
        try {
          if (post.platform === "facebook" && process.env.FACEBOOK_PAGE_TOKEN) {
            const fbRes = await fetch(
              `https://graph.facebook.com/v19.0/me/feed`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  message: post.content,
                  access_token: process.env.FACEBOOK_PAGE_TOKEN,
                }),
              }
            );
            const fbData = await fbRes.json() as any;
            await storage.updateSocialPost(post.id, {
              status: fbData.id ? "published" : "failed",
              publishedAt: fbData.id ? new Date() : undefined,
              platformPostId: fbData.id || null,
            });
            results.push({ id: post.id, platform: "facebook", status: fbData.id ? "published" : "failed" });
          } else if (post.platform === "instagram" && process.env.INSTAGRAM_BUSINESS_ID && process.env.FACEBOOK_PAGE_TOKEN) {
            if (post.imageUrl) {
              const containerRes = await fetch(
                `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_BUSINESS_ID}/media`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    image_url: post.imageUrl,
                    caption: post.content,
                    access_token: process.env.FACEBOOK_PAGE_TOKEN,
                  }),
                }
              );
              const containerData = await containerRes.json() as any;
              if (containerData.id) {
                const publishRes = await fetch(
                  `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_BUSINESS_ID}/media_publish`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      creation_id: containerData.id,
                      access_token: process.env.FACEBOOK_PAGE_TOKEN,
                    }),
                  }
                );
                const publishData = await publishRes.json() as any;
                await storage.updateSocialPost(post.id, {
                  status: publishData.id ? "published" : "failed",
                  publishedAt: publishData.id ? new Date() : undefined,
                  platformPostId: publishData.id || null,
                });
                results.push({ id: post.id, platform: "instagram", status: publishData.id ? "published" : "failed" });
              }
            } else {
              await storage.updateSocialPost(post.id, { status: "failed" });
              results.push({ id: post.id, platform: "instagram", status: "failed", reason: "No image URL" });
            }
          } else {
            await storage.updateSocialPost(post.id, { status: "failed" });
            results.push({ id: post.id, platform: post.platform, status: "failed", reason: "Missing credentials" });
          }
        } catch (postErr: any) {
          await storage.updateSocialPost(post.id, { status: "failed" });
          results.push({ id: post.id, status: "failed", error: postErr.message });
        }
      }
      res.json({ processed: results.length, results });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/dashboard-widgets", async (req: Request, res: Response) => {
    try {
      const userId = req.headers["x-user-id"] as string;
      if (!userId) return res.status(401).json({ error: "Not authenticated" });
      const user = await storage.getUser(userId);
      if (!user) return res.status(401).json({ error: "Invalid user" });
      const widgets = await storage.getDashboardWidgets(userId);
      res.json(widgets);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/dashboard-widgets", async (req: Request, res: Response) => {
    try {
      const userId = req.headers["x-user-id"] as string;
      if (!userId) return res.status(401).json({ error: "Not authenticated" });
      const user = await storage.getUser(userId);
      if (!user) return res.status(401).json({ error: "Invalid user" });
      const { widgets } = req.body;
      if (!Array.isArray(widgets)) return res.status(400).json({ error: "widgets must be an array" });
      if (widgets.length > 20) return res.status(400).json({ error: "Too many widgets" });
      const sanitized = widgets.map((w: any, i: number) => ({
        widgetType: String(w.widgetType || "").slice(0, 50),
        position: i,
        visible: Boolean(w.visible),
        config: w.config || {},
      }));
      const saved = await storage.saveDashboardWidgets(userId, sanitized);
      res.json(saved);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Meta OAuth Connect Flow
  // --------------------
  app.get("/api/meta/connect", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const appId = process.env.META_APP_ID;
      const redirectUri = process.env.META_REDIRECT_URI || `${req.protocol}://${req.get("host")}/api/meta/callback`;
      if (!appId) return res.status(500).json({ error: "META_APP_ID not configured" });
      const scopes = "pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish,business_management";
      const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=code&state=${admin.id}`;
      res.json({ authUrl });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/meta/callback", async (req, res) => {
    try {
      const { code, state } = req.query;
      if (!code) return res.redirect("/admin?tab=social&error=no_code");
      const appId = process.env.META_APP_ID;
      const appSecret = process.env.META_APP_SECRET;
      const redirectUri = process.env.META_REDIRECT_URI || `${req.protocol}://${req.get("host")}/api/meta/callback`;
      if (!appId || !appSecret) return res.redirect("/admin?tab=social&error=missing_config");

      const tokenRes = await fetch(
        `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`
      );
      const tokenData = await tokenRes.json() as any;
      if (!tokenData.access_token) return res.redirect("/admin?tab=social&error=token_failed");

      const longLivedRes = await fetch(
        `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tokenData.access_token}`
      );
      const longLivedData = await longLivedRes.json() as any;
      const longToken = longLivedData.access_token || tokenData.access_token;

      const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${longToken}`);
      const pagesData = await pagesRes.json() as any;
      const pages = pagesData.data || [];
      if (pages.length === 0) return res.redirect("/admin?tab=social&error=no_pages");

      const page = pages[0];
      const pageToken = page.access_token;
      const pageId = page.id;
      const pageName = page.name;

      let igAccountId = "";
      let igUsername = "";
      try {
        const igRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}?fields=instagram_business_account&access_token=${pageToken}`);
        const igData = await igRes.json() as any;
        if (igData.instagram_business_account?.id) {
          igAccountId = igData.instagram_business_account.id;
          const igInfoRes = await fetch(`https://graph.facebook.com/v19.0/${igAccountId}?fields=username&access_token=${pageToken}`);
          const igInfo = await igInfoRes.json() as any;
          igUsername = igInfo.username || "";
        }
      } catch {}

      const expiresAt = longLivedData.expires_in
        ? new Date(Date.now() + longLivedData.expires_in * 1000).toISOString()
        : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

      await pool.query(`
        INSERT INTO social_connections (id, user_id, facebook_page_id, facebook_page_name, facebook_page_token,
          instagram_business_id, instagram_username, token_expires_at, connected_at, updated_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        ON CONFLICT (user_id) DO UPDATE SET
          facebook_page_id = $2, facebook_page_name = $3, facebook_page_token = $4,
          instagram_business_id = $5, instagram_username = $6, token_expires_at = $7, updated_at = NOW()
      `, [state, pageId, pageName, pageToken, igAccountId, igUsername, expiresAt]);

      res.redirect(`/admin?tab=social&connected=true&page=${encodeURIComponent(pageName)}&ig=${encodeURIComponent(igUsername)}`);
    } catch (e: any) {
      console.error("Meta callback error:", e.message);
      res.redirect(`/admin?tab=social&error=${encodeURIComponent(e.message)}`);
    }
  });

  app.get("/api/meta/status", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query("SELECT * FROM social_connections WHERE user_id = $1", [admin.id]);
      if (result.rows.length === 0) return res.json({ connected: false });
      const conn = snakeToCamel(result.rows)[0];
      res.json({
        connected: true,
        facebookPageName: conn.facebookPageName,
        facebookPageId: conn.facebookPageId,
        instagramUsername: conn.instagramUsername,
        instagramBusinessId: conn.instagramBusinessId,
        tokenExpiresAt: conn.tokenExpiresAt,
        expired: new Date(conn.tokenExpiresAt) < new Date(),
      });
    } catch (e: any) {
      res.json({ connected: false });
    }
  });

  app.post("/api/meta/disconnect", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query("DELETE FROM social_connections WHERE user_id = $1", [admin.id]);
      res.json({ disconnected: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/social/publish-now", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { postId } = req.body;
      if (!postId) return res.status(400).json({ error: "postId required" });

      const connResult = await pool.query("SELECT * FROM social_connections WHERE user_id = $1", [admin.id]);
      if (connResult.rows.length === 0) return res.status(400).json({ error: "No Meta account connected" });
      const conn = connResult.rows[0];

      const post = await storage.getSocialPost(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });

      const results: any[] = [];

      if (post.platform === "facebook" || post.platform === "both") {
        try {
          const fbRes = await fetch(`https://graph.facebook.com/v19.0/${conn.facebook_page_id}/feed`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: post.content, access_token: conn.facebook_page_token }),
          });
          const fbData = await fbRes.json() as any;
          results.push({ platform: "facebook", success: !!fbData.id, postId: fbData.id, error: fbData.error?.message });
        } catch (e: any) {
          results.push({ platform: "facebook", success: false, error: e.message });
        }
      }

      if ((post.platform === "instagram" || post.platform === "both") && conn.instagram_business_id) {
        try {
          if (post.imageUrl) {
            const containerRes = await fetch(`https://graph.facebook.com/v19.0/${conn.instagram_business_id}/media`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image_url: post.imageUrl, caption: post.content, access_token: conn.facebook_page_token }),
            });
            const containerData = await containerRes.json() as any;
            if (containerData.id) {
              const publishRes = await fetch(`https://graph.facebook.com/v19.0/${conn.instagram_business_id}/media_publish`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ creation_id: containerData.id, access_token: conn.facebook_page_token }),
              });
              const publishData = await publishRes.json() as any;
              results.push({ platform: "instagram", success: !!publishData.id, postId: publishData.id, error: publishData.error?.message });
            } else {
              results.push({ platform: "instagram", success: false, error: containerData.error?.message || "Container creation failed" });
            }
          } else {
            results.push({ platform: "instagram", success: false, error: "Image URL required for Instagram" });
          }
        } catch (e: any) {
          results.push({ platform: "instagram", success: false, error: e.message });
        }
      }

      const allSuccess = results.every(r => r.success);
      await storage.updateSocialPost(postId, {
        status: allSuccess ? "published" : "failed",
        publishedAt: allSuccess ? new Date() : undefined,
        platformPostId: results.find(r => r.postId)?.postId || null,
      });

      res.json({ results });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  seedStarterDecks().catch((e) => console.error("Starter deck seed error:", e?.message));

  app.get("/api/site-images", async (_req, res) => {
    try {
      const images = await storage.getAllSiteImages();
      res.json(images);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/site-images/:key", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { url, alt } = req.body;
      if (!url) return res.status(400).json({ error: "url is required" });
      const image = await storage.upsertSiteImage(req.params.key, url, alt);
      res.json(image);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/site-images/:key", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await storage.deleteSiteImage(req.params.key);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/custom-modules", async (req, res) => {
    try {
      const page = (req.query.page as string) || "pre-nursing";
      const modules = await storage.getCustomModules(page);
      res.json(modules);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/custom-modules", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { page, title, description, icon, color, bgColor, imageUrl, sortOrder, lessons, tier, content } = req.body;
      if (!page || !title) return res.status(400).json({ error: "page and title are required" });
      const mod = await storage.createCustomModule({ page, title, description, icon, color, bgColor, imageUrl, sortOrder, lessons: lessons || [], tier, content });
      res.json(mod);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/custom-modules/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { page, title, description, icon, color, bgColor, imageUrl, sortOrder, lessons, tier, content, status } = req.body;
      const updates: any = {};
      if (page !== undefined) updates.page = page;
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (icon !== undefined) updates.icon = icon;
      if (color !== undefined) updates.color = color;
      if (bgColor !== undefined) updates.bgColor = bgColor;
      if (imageUrl !== undefined) updates.imageUrl = imageUrl;
      if (sortOrder !== undefined) updates.sortOrder = sortOrder;
      if (lessons !== undefined) updates.lessons = lessons;
      if (tier !== undefined) updates.tier = tier;
      if (content !== undefined) updates.content = content;
      if (status !== undefined) updates.status = status;
      const mod = await storage.updateCustomModule(req.params.id, updates);
      res.json(mod);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/custom-modules/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await storage.deleteCustomModule(req.params.id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== AUSCULTATION AUDIO LIBRARY ======
  app.get("/api/audio-clips", async (req, res) => {
    try {
      const { category } = req.query;
      const clips = category ? await storage.getAudioClipsByCategory(category as string) : await storage.getAllAudioClips();
      res.json(clips);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/audio-clips/:id", async (req, res) => {
    try {
      const clip = await storage.getAudioClip(req.params.id);
      if (!clip) return res.status(404).json({ error: "Clip not found" });
      res.json(clip);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/audio-clips", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const ALLOWED_LICENSES = ["CC0", "CC_BY", "CC_BY_SA", "PUBLIC_DOMAIN", "COMMERCIAL_LICENSE"];
      const { title, category, subcategory, conditionTag, descriptionShort, bodySite, audioUrlOriginal, audioUrlStream, durationSeconds, licenseType, attributionText, sourceUrl, creatorName, proofOfLicenseUrl, isDerivative } = req.body;
      if (!title || !category || !licenseType) return res.status(400).json({ error: "title, category, and licenseType are required" });
      if (!ALLOWED_LICENSES.includes(licenseType)) return res.status(400).json({ error: `License must be one of: ${ALLOWED_LICENSES.join(", ")}` });
      const clip = await storage.createAudioClip({
        title, category, subcategory, conditionTag, descriptionShort, bodySite,
        audioUrlOriginal, audioUrlStream, durationSeconds, licenseType, attributionText,
        sourceUrl, creatorName, proofOfLicenseUrl, isDerivative: isDerivative || false,
        isPublished: false, createdByAdminId: admin.id,
      });
      await logAudit(req, admin, "audio_clip", clip.id, "create", null, clip);
      res.json(clip);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/admin/audio-clips/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const before = await storage.getAudioClip(req.params.id);
      if (!before) return res.status(404).json({ error: "Clip not found" });
      const clip = await storage.updateAudioClip(req.params.id, req.body);
      await logAudit(req, admin, "audio_clip", clip.id, "update", before, clip);
      res.json(clip);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/audio-clips/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await logAudit(req, admin, "audio_clip", req.params.id, "delete");
      await storage.deleteAudioClip(req.params.id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/lesson-audio/:lessonId", async (req, res) => {
    try {
      const links = await storage.getLessonAudioLinks(req.params.lessonId);
      res.json(links);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/lesson-audio", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { lessonId, audioClipId, displayOrder, quizPrompt, answerKey } = req.body;
      if (!lessonId || !audioClipId) return res.status(400).json({ error: "lessonId and audioClipId required" });
      const link = await storage.createLessonAudioLink({ lessonId, audioClipId, displayOrder: displayOrder || 0, quizPrompt, answerKey });
      await logAudit(req, admin, "lesson_audio_link", link.id, "create", null, link);
      res.json(link);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/lesson-audio/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await storage.deleteLessonAudioLink(req.params.id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== EXAM QUESTIONS SCHEDULER ======
  app.get("/api/admin/exam-questions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { tier, exam, questionType, status, bodySystem } = req.query;
      const questions = await storage.getAllExamQuestions({
        tier: tier as string, exam: exam as string,
        questionType: questionType as string, status: status as string,
        bodySystem: bodySystem as string,
      });
      res.json(questions);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/exam-questions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const q = await storage.getExamQuestion(req.params.id);
      if (!q) return res.status(404).json({ error: "Question not found" });
      res.json(q);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/exam-questions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { tier, exam, questionType, stem, options, correctAnswer, rationale, difficulty, tags, bodySystem, topic, subtopic, regionScope, status, publishAt } = req.body;
      if (!tier || !exam || !questionType || !stem) return res.status(400).json({ error: "tier, exam, questionType, and stem are required" });
      const q = await storage.createExamQuestion({
        tier, exam, questionType, stem, options, correctAnswer, rationale,
        difficulty, tags, bodySystem, topic, subtopic, regionScope,
        status: status || "draft", publishAt: publishAt ? new Date(publishAt) : undefined,
        stemHash: require("crypto").createHash("md5").update(stem).digest("hex"),
      });
      await logAudit(req, admin, "exam_question", q.id, "create", null, { tier, exam, questionType, stem: stem.substring(0, 100) });
      res.json(q);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/admin/exam-questions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const before = await storage.getExamQuestion(req.params.id);
      if (!before) return res.status(404).json({ error: "Question not found" });
      const updates: any = { ...req.body };
      if (updates.publishAt) updates.publishAt = new Date(updates.publishAt);
      if (updates.stem) updates.stemHash = require("crypto").createHash("md5").update(updates.stem).digest("hex");
      const q = await storage.updateExamQuestion(req.params.id, updates);
      if (before.status !== q.status) {
        await storage.createQuestionScheduleLog({ questionId: q.id, action: "status_change", previousStatus: before.status || undefined, newStatus: q.status || undefined, actorId: admin.id });
      }
      await logAudit(req, admin, "exam_question", q.id, "update", { status: before.status }, { status: q.status });
      res.json(q);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/exam-questions/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await logAudit(req, admin, "exam_question", req.params.id, "delete");
      await storage.deleteExamQuestion(req.params.id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/exam-questions/bulk-generate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { tier, exam, questionType, count = 10, bodySystem, topic, difficulty, status = "draft", publishCadence, scheduleStart } = req.body;
      if (!tier || !exam || !questionType) return res.status(400).json({ error: "tier, exam, and questionType required" });

      const bodySystems = ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "renal", "endocrine", "hematology", "musculoskeletal", "immune", "maternity", "pediatrics", "mental-health", "pharmacology", "fundamentals"];
      const difficultyLevels = [1, 2, 3, 4, 5];
      const questions: any[] = [];
      const startDate = scheduleStart ? new Date(scheduleStart) : new Date();
      const cadenceHours = publishCadence || 24;

      for (let i = 0; i < count; i++) {
        const sys = bodySystem || bodySystems[i % bodySystems.length];
        const diff = difficulty || difficultyLevels[i % difficultyLevels.length];
        const stemText = `[${tier.toUpperCase()}] ${exam} - ${questionType} - ${sys} - Question ${i + 1}: A patient presents with...`;
        let publishAt: Date | undefined;
        if (status === "scheduled") {
          publishAt = new Date(startDate.getTime() + i * cadenceHours * 60 * 60 * 1000);
        }
        questions.push({
          tier, exam, questionType, stem: stemText,
          options: JSON.stringify([{ text: "Option A", isCorrect: false }, { text: "Option B", isCorrect: true }, { text: "Option C", isCorrect: false }, { text: "Option D", isCorrect: false }]),
          correctAnswer: JSON.stringify([1]),
          rationale: `This is a placeholder rationale for ${sys} question ${i + 1}. Replace with evidence-based clinical reasoning.`,
          difficulty: diff, bodySystem: sys, topic: topic || sys,
          regionScope: tier.includes("rpn") || tier.includes("rn-ca") ? "CA" : tier.includes("lvn") ? "US" : "BOTH",
          status, publishAt,
          stemHash: require("crypto").createHash("md5").update(stemText).digest("hex"),
        });
      }

      const created = await storage.createExamQuestionsBulk(questions);
      await logAudit(req, admin, "exam_question", null, "bulk_generate", null, { tier, exam, questionType, count: created.length });
      res.json({ created: created.length, questions: created.slice(0, 5) });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/exam-questions/bulk-schedule", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { questionIds, scheduleStart, cadenceHours = 24 } = req.body;
      if (!questionIds?.length || !scheduleStart) return res.status(400).json({ error: "questionIds and scheduleStart required" });
      const startDate = new Date(scheduleStart);
      let scheduled = 0;
      for (let i = 0; i < questionIds.length; i++) {
        const publishAt = new Date(startDate.getTime() + i * cadenceHours * 60 * 60 * 1000);
        await storage.updateExamQuestion(questionIds[i], { status: "scheduled", publishAt } as any);
        await storage.createQuestionScheduleLog({ questionId: questionIds[i], action: "schedule", previousStatus: "draft", newStatus: "scheduled", actorId: admin.id });
        scheduled++;
      }
      res.json({ scheduled });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/exam-questions/bulk-import", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { questions } = req.body;
      if (!questions?.length) return res.status(400).json({ error: "questions array required" });
      const prepared = questions.map((q: any) => ({
        ...q,
        stemHash: require("crypto").createHash("md5").update(q.stem || "").digest("hex"),
        status: q.status || "draft",
      }));
      const created = await storage.createExamQuestionsBulk(prepared);
      await logAudit(req, admin, "exam_question", null, "bulk_import", null, { count: created.length });
      res.json({ imported: created.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/question-types/registry", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { exam } = req.query;
      const registry = await storage.getQuestionTypeRegistry(exam as string);
      res.json(registry);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/admin/question-types/registry", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { exam, questionType, displayName, isEnabled, defaultTargetCount, weightPercent } = req.body;
      if (!exam || !questionType || !displayName) return res.status(400).json({ error: "exam, questionType, displayName required" });
      const entry = await storage.upsertQuestionTypeRegistry({ exam, questionType, displayName, isEnabled, defaultTargetCount, weightPercent });
      res.json(entry);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/exam-questions/run-scheduler", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const count = await storage.publishScheduledQuestions();
      res.json({ published: count });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Seed default question type registry
  (async () => {
    try {
      const existing = await storage.getQuestionTypeRegistry();
      if (existing.length === 0) {
        const exams = [
          { exam: "rex-pn", types: ["mcq", "sata", "ordered-response", "case-study"] },
          { exam: "nclex-rn", types: ["mcq", "sata", "ordered-response", "case-study", "fill-in", "hotspot", "exhibit", "bowtie"] },
          { exam: "np-canada", types: ["mcq", "sata", "case-study", "exhibit"] },
          { exam: "nclex-pn", types: ["mcq", "sata", "ordered-response", "case-study", "fill-in"] },
          { exam: "aanp", types: ["mcq", "case-study", "exhibit"] },
          { exam: "ancc", types: ["mcq", "case-study", "exhibit"] },
        ];
        const displayNames: Record<string, string> = {
          mcq: "Single Best Answer MCQ",
          sata: "Select All That Apply (SATA)",
          "ordered-response": "Ordered Response / Prioritization",
          "case-study": "Case Study / Vignette",
          "fill-in": "Fill-in / Short Answer",
          hotspot: "Hotspot / Image-Based",
          exhibit: "Exhibit / Chart Interpretation",
          bowtie: "Bow-Tie / Triage",
          matrix: "Matrix / Grid",
        };
        for (const { exam, types } of exams) {
          for (const qt of types) {
            await storage.upsertQuestionTypeRegistry({
              exam, questionType: qt, displayName: displayNames[qt] || qt,
              isEnabled: true, defaultTargetCount: 100,
            });
          }
        }
        console.log("Seeded question type registry");
      }
    } catch (e: any) {
      console.error("Registry seed error:", e?.message);
    }
  })();

  // Question scheduler interval (check every 5 minutes)
  setInterval(async () => {
    try {
      const count = await storage.publishScheduledQuestions();
      if (count > 0) console.log(`Auto-published ${count} scheduled questions`);
    } catch (e) {}
  }, 5 * 60 * 1000);

  // ====== PERFORMANCE RECOMMENDATIONS + TIME-TO-MASTERY ======
  app.post("/api/recommendations/generate", async (req, res) => {
    try {
      const { userId, sessionType, sessionId, scores } = req.body;
      if (!userId) return res.status(400).json({ error: "userId required" });

      const testResults = await storage.getTestResults(userId);
      const progress = await storage.getUserProgress(userId);

      const topicScores: Record<string, { correct: number; total: number; sessions: { score: number; date: string }[] }> = {};
      for (const r of testResults) {
        const topic = r.lessonId || "general";
        if (!topicScores[topic]) topicScores[topic] = { correct: 0, total: 0, sessions: [] };
        topicScores[topic].correct += r.score;
        topicScores[topic].total += r.totalQuestions;
        topicScores[topic].sessions.push({ score: (r.score / r.totalQuestions) * 100, date: r.completedAt?.toISOString() || "" });
      }

      if (scores) {
        for (const [topic, data] of Object.entries(scores as Record<string, { correct: number; total: number }>)) {
          if (!topicScores[topic]) topicScores[topic] = { correct: 0, total: 0, sessions: [] };
          topicScores[topic].correct += data.correct;
          topicScores[topic].total += data.total;
          topicScores[topic].sessions.push({ score: (data.correct / data.total) * 100, date: new Date().toISOString() });
        }
      }

      const weaknesses: { topic: string; accuracy: number; weaknessIndex: number; exposureCount: number; masteryEstimateHours: number }[] = [];
      const strengths: { topic: string; accuracy: number }[] = [];

      for (const [topic, data] of Object.entries(topicScores)) {
        const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
        const recentSessions = data.sessions.slice(-5);
        let improvementSlope = 0;
        if (recentSessions.length >= 2) {
          const first = recentSessions[0].score;
          const last = recentSessions[recentSessions.length - 1].score;
          improvementSlope = (last - first) / recentSessions.length;
        }

        const exposureCount = data.total;
        const recencyFactor = 1.0;
        const weaknessIndex = Math.max(0, ((100 - accuracy) * 1.5 * recencyFactor) / 100);

        let masteryEstimateHours = 0;
        if (accuracy < 80) {
          const gap = 80 - accuracy;
          const slopePerHour = improvementSlope > 0 ? improvementSlope * 2 : 2;
          masteryEstimateHours = Math.max(0.5, Math.round((gap / slopePerHour) * 10) / 10);
          if (exposureCount < 10) masteryEstimateHours *= 1.5;
        }

        if (accuracy < 70) {
          weaknesses.push({ topic, accuracy: Math.round(accuracy), weaknessIndex: Math.round(weaknessIndex * 100) / 100, exposureCount, masteryEstimateHours });
        } else {
          strengths.push({ topic, accuracy: Math.round(accuracy) });
        }
      }

      weaknesses.sort((a, b) => b.weaknessIndex - a.weaknessIndex);
      strengths.sort((a, b) => b.accuracy - a.accuracy);

      const totalAccuracy = Object.values(topicScores).reduce((sum, d) => sum + d.correct, 0) / Math.max(1, Object.values(topicScores).reduce((sum, d) => sum + d.total, 0)) * 100;
      const readinessScore = Math.round(Math.min(100, totalAccuracy * 1.1));
      const projectedPassProbability = Math.round(Math.min(99, totalAccuracy * 0.95 + (weaknesses.length < 3 ? 10 : 0)));

      const recommendations: { type: string; topic: string; title: string; slug: string; estimatedMinutes: number; difficulty: string; reason: string; masteryEstimateHours?: number }[] = [];

      const topWeak = weaknesses.slice(0, 3);
      for (const w of topWeak) {
        const displayTitle = w.topic.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        recommendations.push({
          type: w.weaknessIndex > 0.5 ? "primary" : "secondary",
          topic: w.topic,
          title: `${displayTitle} Deep Dive`,
          slug: `/lessons/${w.topic}`,
          estimatedMinutes: Math.round(w.masteryEstimateHours * 60),
          difficulty: w.accuracy < 40 ? "foundational" : w.accuracy < 60 ? "intermediate" : "advanced",
          reason: `${w.accuracy}% accuracy across ${w.exposureCount} questions`,
          masteryEstimateHours: w.masteryEstimateHours,
        });
      }

      if (totalAccuracy >= 85) {
        recommendations.push({
          type: "advanced",
          topic: "mock-exam",
          title: "Full-Length Mock Exam Challenge",
          slug: "/practice-exam",
          estimatedMinutes: 90,
          difficulty: "advanced",
          reason: "You're performing well — test yourself under exam conditions",
        });
      }

      if (totalAccuracy < 60) {
        recommendations.push({
          type: "foundational",
          topic: "flashcards",
          title: "Core Concept Flashcard Review",
          slug: "/flashcards",
          estimatedMinutes: 20,
          difficulty: "foundational",
          reason: "Build strong foundations before advancing",
        });
      }

      try {
        await pool.query(
          `INSERT INTO user_performance_summary (id, user_id, readiness_score, projected_pass_probability, weakness_vector, strengths_vector, top_weak_domains, top_weak_question_types, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW())
           ON CONFLICT (user_id) DO UPDATE SET readiness_score=$2, projected_pass_probability=$3, weakness_vector=$4, strengths_vector=$5, top_weak_domains=$6, top_weak_question_types=$7, updated_at=NOW()`,
          [userId, readinessScore, projectedPassProbability, JSON.stringify(weaknesses), JSON.stringify(strengths),
           JSON.stringify(topWeak.map(w => w.topic)), JSON.stringify([])]
        );
      } catch (e: any) {
        if (e.message?.includes("unique constraint") || e.message?.includes("ON CONFLICT")) {
          await pool.query(
            `INSERT INTO user_performance_summary (id, user_id, readiness_score, projected_pass_probability, weakness_vector, strengths_vector, top_weak_domains, updated_at)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`,
            [userId, readinessScore, projectedPassProbability, JSON.stringify(weaknesses), JSON.stringify(strengths), JSON.stringify(topWeak.map(w => w.topic))]
          );
        }
      }

      await pool.query(
        `INSERT INTO recommendation_log (id, user_id, session_type, session_id, recommended_courses, weakness_snapshot, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())`,
        [userId, sessionType || "manual", sessionId || null, JSON.stringify(recommendations), JSON.stringify(weaknesses)]
      );

      res.json({
        readinessScore,
        projectedPassProbability,
        weaknesses: weaknesses.slice(0, 5),
        strengths: strengths.slice(0, 5),
        recommendations,
        masteryProgress: Object.entries(topicScores).map(([topic, data]) => {
          const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
          const recentSessions = data.sessions.slice(-5);
          let slope = 0;
          if (recentSessions.length >= 2) {
            slope = Math.round(((recentSessions[recentSessions.length - 1].score - recentSessions[0].score) / recentSessions.length) * 10) / 10;
          }
          const gap = Math.max(0, 80 - accuracy);
          const hoursToMastery = gap > 0 ? Math.max(0.5, Math.round((gap / Math.max(slope > 0 ? slope * 2 : 2, 0.5)) * 10) / 10) : 0;
          return { topic, accuracy, exposureCount: data.total, improvementSlope: slope, estimatedHoursToMastery: hoursToMastery, mastered: accuracy >= 80 };
        }),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/recommendations/latest", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const result = await pool.query(
        `SELECT * FROM recommendation_log WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [userId]
      );
      if (result.rows.length === 0) return res.json(null);
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/recommendations/:id/accept", async (req, res) => {
    try {
      await pool.query(`UPDATE recommendation_log SET clicked = true WHERE id = $1`, [req.params.id]);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/mastery-progress/:userId", async (req, res) => {
    try {
      const testResults = await storage.getTestResults(req.params.userId);
      const topicData: Record<string, { correct: number; total: number; sessions: { score: number; date: string }[] }> = {};
      for (const r of testResults) {
        const topic = r.lessonId || "general";
        if (!topicData[topic]) topicData[topic] = { correct: 0, total: 0, sessions: [] };
        topicData[topic].correct += r.score;
        topicData[topic].total += r.totalQuestions;
        topicData[topic].sessions.push({ score: (r.score / r.totalQuestions) * 100, date: r.completedAt?.toISOString() || "" });
      }

      const progress = Object.entries(topicData).map(([topic, data]) => {
        const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        const recent = data.sessions.slice(-5);
        let slope = 0;
        if (recent.length >= 2) {
          slope = Math.round(((recent[recent.length - 1].score - recent[0].score) / recent.length) * 10) / 10;
        }
        const gap = Math.max(0, 80 - accuracy);
        const hoursToMastery = gap > 0 ? Math.max(0.5, Math.round((gap / Math.max(slope > 0 ? slope * 2 : 2, 0.5)) * 10) / 10) : 0;
        return {
          topic,
          accuracy,
          exposureCount: data.total,
          improvementSlope: slope,
          estimatedHoursToMastery: hoursToMastery,
          mastered: accuracy >= 80,
          displayTitle: topic.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        };
      });

      progress.sort((a, b) => b.exposureCount - a.exposureCount);
      res.json(progress);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== STUDY PLAN ENGINE ======
  app.post("/api/study-plan/generate", async (req, res) => {
    try {
      const { userId, examType, examDate, hoursPerDay = 2, daysPerWeek = 5 } = req.body;
      if (!userId || !examType || !examDate) return res.status(400).json({ error: "userId, examType, examDate required" });

      await pool.query(
        `INSERT INTO user_exam_profile (id, user_id, exam_type, exam_date, hours_per_day, days_per_week, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
         ON CONFLICT (user_id) DO UPDATE SET exam_type=$2, exam_date=$3, hours_per_day=$4, days_per_week=$5, updated_at=NOW()`,
        [userId, examType, new Date(examDate), hoursPerDay, daysPerWeek]
      ).catch(() => {
        return pool.query(
          `INSERT INTO user_exam_profile (id, user_id, exam_type, exam_date, hours_per_day, days_per_week, created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())`,
          [userId, examType, new Date(examDate), hoursPerDay, daysPerWeek]
        );
      });

      const now = new Date();
      const examDateObj = new Date(examDate);
      const totalDays = Math.max(1, Math.ceil((examDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      const studyDays = totalDays - 2;

      const questionTargets: Record<string, { min: number; max: number }> = {
        "rex-pn": { min: 1200, max: 1800 },
        "nclex-rn": { min: 1800, max: 2500 },
        "nclex-pn": { min: 1200, max: 1800 },
        "np-canada": { min: 1500, max: 2200 },
        "aanp": { min: 1500, max: 2200 },
        "ancc": { min: 1500, max: 2200 },
      };
      const target = questionTargets[examType] || { min: 1500, max: 2000 };
      const totalQuestionTarget = Math.round((target.min + target.max) / 2);

      let performanceResult;
      try {
        performanceResult = await pool.query(
          `SELECT readiness_score FROM user_performance_summary WHERE user_id = $1`, [userId]
        );
      } catch (e) {}
      const readinessScore = performanceResult?.rows?.[0]?.readiness_score || 50;

      let adjustedTarget = totalQuestionTarget;
      if (readinessScore < 60) adjustedTarget = Math.round(adjustedTarget * 1.2);
      else if (readinessScore > 80) adjustedTarget = Math.round(adjustedTarget * 0.85);

      const dailyQuestions = Math.max(10, Math.round(adjustedTarget / Math.max(1, studyDays * (daysPerWeek / 7))));
      const dailyFlashcards = Math.round(dailyQuestions * 0.5);

      let phases: { name: string; pct: number; focus: string }[];
      if (totalDays > 60) {
        phases = [
          { name: "Foundation", pct: 40, focus: "Core concepts, body system review, fundamentals" },
          { name: "Application", pct: 40, focus: "Mixed timed sets, clinical reasoning, case studies" },
          { name: "Mock Exams", pct: 20, focus: "Full-length mock exams, remediation, final review" },
        ];
      } else if (totalDays > 30) {
        phases = [
          { name: "Targeted Remediation", pct: 35, focus: "Weak areas, high-yield topics, gap closure" },
          { name: "Mixed Timed Sets", pct: 40, focus: "Exam-style practice, time management" },
          { name: "Mock Exams", pct: 25, focus: "Weekly full mocks, score analysis, weak spot review" },
        ];
      } else {
        phases = [
          { name: "High-Yield Focus", pct: 40, focus: "Weakest areas only, rapid review" },
          { name: "Daily Timed Sets", pct: 35, focus: "Exam simulation, speed drills" },
          { name: "Final Mocks", pct: 25, focus: "2-3 full mock exams minimum" },
        ];
      }

      const bodySystems = ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "renal", "endocrine", "pharmacology", "maternity", "pediatrics", "mental-health", "fundamentals", "leadership"];
      const schedule: any[] = [];
      let dayIdx = 0;

      for (const phase of phases) {
        const phaseDays = Math.max(1, Math.round(studyDays * phase.pct / 100));
        for (let d = 0; d < phaseDays && dayIdx < studyDays; d++) {
          const dateStr = new Date(now.getTime() + (dayIdx + 1) * 86400000).toISOString().split("T")[0];
          const dayOfWeek = new Date(now.getTime() + (dayIdx + 1) * 86400000).getDay();
          const isStudyDay = dayOfWeek !== 0;

          if (isStudyDay) {
            const topic = bodySystems[dayIdx % bodySystems.length];
            schedule.push({
              date: dateStr,
              phase: phase.name,
              tasks: [
                { type: "questions", count: dailyQuestions, topic, description: `${dailyQuestions} ${topic} questions` },
                { type: "flashcards", count: dailyFlashcards, topic, description: `${dailyFlashcards} flashcard review` },
                ...(dayIdx % 3 === 0 ? [{ type: "course", topic, description: `${topic.replace(/-/g, " ")} focus module (30 min)` }] : []),
                ...(phase.name.includes("Mock") && dayIdx % 7 === 0 ? [{ type: "mock_exam", description: "Full-length mock exam" }] : []),
              ],
            });
          }
          dayIdx++;
        }
      }

      for (const day of schedule.slice(0, 90)) {
        await pool.query(
          `INSERT INTO study_plan_schedule (id, user_id, date, phase, tasks, completed, completion_rate, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, false, 0, NOW())
           ON CONFLICT DO NOTHING`,
          [userId, day.date, day.phase, JSON.stringify(day.tasks)]
        ).catch(() => {});
      }

      const passProbability = calculatePassProbability(readinessScore, adjustedTarget, 0, 50);

      res.json({
        examType, examDate, totalDays, studyDays,
        dailyQuestions, dailyFlashcards, totalQuestionTarget: adjustedTarget,
        readinessScore, phases, schedule: schedule.slice(0, 14),
        passProbability: passProbability.probability,
        confidenceBand: passProbability.confidenceBand,
        riskCategory: passProbability.riskCategory,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/study-plan", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "userId required" });
      const profile = await pool.query(`SELECT * FROM user_exam_profile WHERE user_id = $1`, [userId]);
      const schedule = await pool.query(
        `SELECT * FROM study_plan_schedule WHERE user_id = $1 ORDER BY date ASC LIMIT 30`, [userId]
      );
      res.json({ profile: profile.rows[0] || null, schedule: schedule.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/study-plan/update", async (req, res) => {
    try {
      const { scheduleId, completed, completionRate } = req.body;
      if (!scheduleId) return res.status(400).json({ error: "scheduleId required" });
      await pool.query(
        `UPDATE study_plan_schedule SET completed = $1, completion_rate = $2 WHERE id = $3`,
        [completed || false, completionRate || 0, scheduleId]
      );
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== STUDY WORKLOAD CALCULATOR ======
  app.get("/api/study-workload/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;

      const authUser = (req as any).user;
      if (authUser && String(authUser.id) !== userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const profileRes = await pool.query(
        `SELECT exam_type, exam_date, hours_per_day, days_per_week FROM user_exam_profile WHERE user_id = $1`,
        [userId]
      );
      if (!profileRes.rows.length) {
        return res.json({ hasProfile: false, message: "Set your exam date to see your study workload estimate." });
      }
      const profile = profileRes.rows[0];
      const examDate = new Date(profile.exam_date);
      const now = new Date();
      if (examDate <= now) {
        return res.json({ hasProfile: true, examPassed: true, message: "Your exam date has passed." });
      }

      const questionTargets: Record<string, number> = {
        "rex-pn": 1500, "nclex-rn": 2150, "nclex-pn": 1500,
        "np-canada": 1850, "aanp": 1850, "ancc": 1850,
      };
      const totalRecommended = questionTargets[profile.exam_type] || 1750;

      const testResults = await storage.getTestResults(userId);
      let questionsCompleted = 0;
      for (const r of testResults) {
        questionsCompleted += r.totalQuestions;
      }

      const mockRes = await pool.query(
        `SELECT COALESCE(SUM(total_questions), 0) AS total FROM mock_exam_attempts WHERE user_id = $1 AND status = 'completed'`,
        [userId]
      ).catch(() => ({ rows: [{ total: 0 }] }));
      questionsCompleted += parseInt(mockRes.rows[0]?.total || "0", 10);

      const remaining = Math.max(0, totalRecommended - questionsCompleted);

      const daysPerWeek = Math.max(1, profile.days_per_week || 5);
      const hoursPerDay = Math.max(1, profile.hours_per_day || 2);
      const questionsPerHour = 30;
      const dailyTarget = hoursPerDay * questionsPerHour;

      const effectiveStudyDaysPerWeek = Math.min(7, daysPerWeek);
      const weekFraction = effectiveStudyDaysPerWeek / 7;
      const daysNeeded = remaining > 0 && dailyTarget > 0 && weekFraction > 0
        ? Math.ceil(remaining / dailyTarget / weekFraction)
        : 0;

      const daysUntilExam = Math.ceil((examDate.getTime() - now.getTime()) / 86400000);
      const projectedCompletionDate = new Date(now.getTime() + daysNeeded * 86400000);
      const bufferDays = daysUntilExam - daysNeeded;

      let message: string;
      let status: "ahead" | "on_track" | "behind" | "completed";
      if (remaining === 0) {
        message = "You have completed your recommended question target. Focus on review and mock exams.";
        status = "completed";
      } else if (bufferDays >= 7) {
        message = `At your current pace, you will complete preparation ${bufferDays} days before your exam.`;
        status = "ahead";
      } else if (bufferDays >= 0) {
        message = `You are on track to finish ${bufferDays === 0 ? "right on" : bufferDays + " days before"} your exam date. Keep it up!`;
        status = "on_track";
      } else {
        message = `At your current pace, you may need ${Math.abs(bufferDays)} more days beyond your exam date. Consider increasing your daily study time.`;
        status = "behind";
      }

      res.json({
        hasProfile: true,
        examPassed: false,
        examDate: examDate.toISOString(),
        examType: profile.exam_type,
        totalRecommended,
        questionsCompleted,
        remaining,
        dailyTarget,
        daysPerWeek: effectiveStudyDaysPerWeek,
        daysNeeded,
        daysUntilExam,
        bufferDays,
        projectedCompletionDate: projectedCompletionDate.toISOString(),
        percentComplete: totalRecommended > 0 ? Math.round((questionsCompleted / totalRecommended) * 100) : 0,
        message,
        status,
        calculatedAt: now.toISOString(),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== PASS PROBABILITY + RISK SCORE ======
  app.get("/api/pass-probability/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await storage.getUser(userId);
      const tier = user?.tier || "rn";

      const testResults = await storage.getTestResults(userId);
      let totalCorrect = 0, totalQuestions = 0;
      const last30: number[] = [];
      const allAccuracies: number[] = [];
      const domainStats: Record<string, { correct: number; total: number }> = {};
      const now = Date.now();
      let shortSessionCount = 0;
      let repeatCount = 0;
      let lowDiffCount = 0;

      for (const r of testResults) {
        if (r.totalQuestions < 10) { shortSessionCount++; continue; }
        totalCorrect += r.score;
        totalQuestions += r.totalQuestions;
        const acc = r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0;
        allAccuracies.push(acc);
        if (r.completedAt && now - r.completedAt.getTime() < 30 * 86400000) {
          last30.push(acc);
        }
      }
      const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

      let trend = 0;
      if (last30.length >= 2) {
        const n = last30.length;
        const xMean = (n - 1) / 2;
        const yMean = last30.reduce((s, v) => s + v, 0) / n;
        let num = 0, den = 0;
        for (let i = 0; i < n; i++) {
          num += (i - xMean) * (last30[i] - yMean);
          den += (i - xMean) ** 2;
        }
        trend = den > 0 ? num / den : 0;
      }

      let consistencyIndex = 0.3;
      if (allAccuracies.length >= 3) {
        const mean = allAccuracies.reduce((s, v) => s + v, 0) / allAccuracies.length;
        const variance = allAccuracies.reduce((s, v) => s + (v - mean) ** 2, 0) / allAccuracies.length;
        consistencyIndex = Math.min(1, Math.sqrt(variance) / 30);
      }

      const mockResults = await pool.query(
        `SELECT score, total_questions, config FROM mock_exam_attempts WHERE user_id = $1 AND status = 'completed'`,
        [userId]
      ).catch(() => ({ rows: [] }));

      let mockAvg = 0;
      let strictMockCount = 0;
      let tutorMocks = 0;
      if (mockResults.rows.length > 0) {
        mockAvg = mockResults.rows.reduce((s: number, r: any) => s + (r.total_questions > 0 ? (r.score / r.total_questions) * 100 : 0), 0) / mockResults.rows.length;
        for (const r of mockResults.rows) {
          const config = typeof r.config === "string" ? JSON.parse(r.config) : r.config;
          if (config?.strictMode) strictMockCount++;
          else tutorMocks++;
        }
      }
      const tutorModeRatio = mockResults.rows.length > 0 ? tutorMocks / mockResults.rows.length : 0;

      const result = calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, {
        tier,
        strictMockCount,
        tutorModeRatio,
        consistencyIndex,
        lowDifficultyRatio: totalQuestions > 0 ? lowDiffCount / totalQuestions : 0,
        repeatQuestionRatio: totalQuestions > 0 ? repeatCount / totalQuestions : 0,
        domainAccuracies: Object.fromEntries(Object.entries(domainStats).map(([d, s]) => [d, s.total > 0 ? (s.correct / s.total) * 100 : 0])),
      });

      const weakDomains = Object.entries(domainStats)
        .map(([d, s]) => ({ domain: d, accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0, total: s.total }))
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 3);

      res.json({
        ...result,
        overallAccuracy: Math.round(overallAccuracy),
        totalQuestions,
        trend: Math.round(trend * 10) / 10,
        mockAvg: Math.round(mockAvg),
        strictMockCount,
        weakDomains,
        disclaimer: "This is a predictive coaching model based on your performance trends and does not represent official exam scoring.",
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/pass-probability/:userId/improvement", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await storage.getUser(userId);
      if (!user || (user.tier !== "rpn" && user.tier !== "rn" && user.tier !== "np" && user.tier !== "admin")) {
        return res.status(403).json({ error: "Premium feature" });
      }
      const tier = user.tier === "admin" ? "rn" : user.tier;

      const testResults = await storage.getTestResults(userId);
      let totalCorrect = 0, totalQuestions = 0;
      const last30: number[] = [];
      const now = Date.now();
      for (const r of testResults) {
        if (r.totalQuestions < 10) continue;
        totalCorrect += r.score;
        totalQuestions += r.totalQuestions;
        if (r.completedAt && now - r.completedAt.getTime() < 30 * 86400000) {
          last30.push(r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0);
        }
      }
      const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
      let trend = 0;
      if (last30.length >= 2) {
        trend = (last30[last30.length - 1] - last30[0]) / last30.length;
      }

      const mockResults = await pool.query(
        `SELECT score, total_questions, config FROM mock_exam_attempts WHERE user_id = $1 AND status = 'completed'`,
        [userId]
      ).catch(() => ({ rows: [] }));
      let mockAvg = 0, strictMockCount = 0;
      if (mockResults.rows.length > 0) {
        mockAvg = mockResults.rows.reduce((s: number, r: any) => s + (r.total_questions > 0 ? (r.score / r.total_questions) * 100 : 0), 0) / mockResults.rows.length;
        for (const r of mockResults.rows) {
          const config = typeof r.config === "string" ? JSON.parse(r.config) : r.config;
          if (config?.strictMode) strictMockCount++;
        }
      }

      const current = calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, { tier, strictMockCount });
      const improvement = simulateImprovement(current, {
        readinessScore: overallAccuracy,
        totalQuestions,
        trend,
        mockAvg,
        tier,
        strictMockCount,
      });

      res.json(improvement);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== PROBABILITY SIMULATOR ======
  app.post("/api/probability/simulate", async (req, res) => {
    try {
      const { userId, deltas } = req.body;
      if (!userId) return res.status(400).json({ error: "userId required" });

      const user = await storage.getUser(userId);
      const tier = user?.tier || "rn";
      const isPremium = tier === "rpn" || tier === "rn" || tier === "np" || tier === "admin";
      if (!isPremium) return res.status(403).json({ error: "Premium feature" });

      const testResults = await storage.getTestResults(userId);
      let totalCorrect = 0, totalQuestions = 0;
      const last30: number[] = [];
      const now = Date.now();
      for (const r of testResults) {
        if (r.totalQuestions < 10) continue;
        totalCorrect += r.score;
        totalQuestions += r.totalQuestions;
        if (r.completedAt && now - r.completedAt.getTime() < 30 * 86400000) {
          last30.push(r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0);
        }
      }
      const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
      let trend = 0;
      if (last30.length >= 2) {
        trend = (last30[last30.length - 1] - last30[0]) / last30.length;
      }
      const mockResults = await pool.query(
        `SELECT score, total_questions, config FROM mock_exam_attempts WHERE user_id = $1 AND status = 'completed'`,
        [userId]
      ).catch(() => ({ rows: [] }));
      let mockAvg = 0, strictMockCount = 0;
      if (mockResults.rows.length > 0) {
        mockAvg = mockResults.rows.reduce((s: number, r: any) => s + (r.total_questions > 0 ? (r.score / r.total_questions) * 100 : 0), 0) / mockResults.rows.length;
        for (const r of mockResults.rows) {
          const config = typeof r.config === "string" ? JSON.parse(r.config) : r.config;
          if (config?.strictMode) strictMockCount++;
        }
      }

      const effectiveTier = tier === "admin" ? "rn" : tier;
      const baseline = calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount });

      const d = deltas || {};
      const simReadiness = Math.min(100, overallAccuracy + (d.domainAccuracyDelta || 0) + (d.sataAccuracyDelta || 0));
      const simQuestions = totalQuestions + (d.questionsAdded || 0);
      const simMocks = strictMockCount + (d.strictMocksAdded || 0);
      const simConsistency = Math.max(0, 0.3 - (d.consistencyDelta || 0) * 0.05);
      const simPacing = Math.max(0, 0.3 - (d.pacingDelta || 0) * 0.05);

      const projected = calculatePassProbability(simReadiness, simQuestions, trend, mockAvg, {
        tier: effectiveTier,
        strictMockCount: simMocks,
        consistencyIndex: simConsistency,
        timeManagementIndex: simPacing,
      });

      const lift = projected.probability - baseline.probability;
      const clampedLift = Math.min(lift, 6 + (totalQuestions < 200 ? 4 : 0));

      const levers: { lever: string; impact: number }[] = [];
      if (d.domainAccuracyDelta) {
        const p = calculatePassProbability(Math.min(100, overallAccuracy + d.domainAccuracyDelta), totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount });
        levers.push({ lever: "Domain accuracy improvement", impact: p.probability - baseline.probability });
      }
      if (d.sataAccuracyDelta) {
        const p = calculatePassProbability(Math.min(100, overallAccuracy + d.sataAccuracyDelta * 0.5), totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount });
        levers.push({ lever: "SATA accuracy improvement", impact: p.probability - baseline.probability });
      }
      if (d.strictMocksAdded) {
        const p = calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount: strictMockCount + d.strictMocksAdded });
        levers.push({ lever: "Strict mock exams", impact: p.probability - baseline.probability });
      }
      if (d.questionsAdded) {
        const p = calculatePassProbability(overallAccuracy, totalQuestions + d.questionsAdded, trend, mockAvg, { tier: effectiveTier, strictMockCount });
        levers.push({ lever: "Additional questions", impact: p.probability - baseline.probability });
      }
      if (d.consistencyDelta) {
        const p = calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount, consistencyIndex: Math.max(0, 0.3 - d.consistencyDelta * 0.05) });
        levers.push({ lever: "Consistency improvement", impact: p.probability - baseline.probability });
      }
      if (d.pacingDelta) {
        const p = calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount, timeManagementIndex: Math.max(0, 0.3 - d.pacingDelta * 0.05) });
        levers.push({ lever: "Time management improvement", impact: p.probability - baseline.probability });
      }

      levers.sort((a, b) => b.impact - a.impact);

      res.json({
        baseline: { probability: baseline.probability, confidenceBand: baseline.confidenceBand, riskCategory: baseline.riskCategory },
        projected: { probability: projected.probability, confidenceBand: projected.confidenceBand, riskCategory: projected.riskCategory, lowerBound: projected.lowerBound, upperBound: projected.upperBound },
        lift: Math.min(clampedLift, projected.probability - baseline.probability),
        topImpactLevers: levers.slice(0, 5),
        disclaimer: "Predictions are coaching estimates based on your performance and do not represent official exam scoring.",
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== NEXT BEST ACTION ======
  app.get("/api/actions/next-best/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await storage.getUser(userId);
      const tier = user?.tier || "free";
      const isPremium = tier === "rpn" || tier === "rn" || tier === "np" || tier === "admin";
      const effectiveTier = tier === "admin" ? "rn" : tier;

      const testResults = await storage.getTestResults(userId);
      let totalCorrect = 0, totalQuestions = 0;
      const domainStats: Record<string, { correct: number; total: number }> = {};
      const now = Date.now();
      const last30: number[] = [];

      for (const r of testResults) {
        if (r.totalQuestions < 10) continue;
        totalCorrect += r.score;
        totalQuestions += r.totalQuestions;
        if (r.completedAt && now - r.completedAt.getTime() < 30 * 86400000) {
          last30.push(r.totalQuestions > 0 ? (r.score / r.totalQuestions) * 100 : 0);
        }
      }
      const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
      let trend = 0;
      if (last30.length >= 2) { trend = (last30[last30.length - 1] - last30[0]) / last30.length; }

      const mockResults = await pool.query(
        `SELECT score, total_questions, config FROM mock_exam_attempts WHERE user_id = $1 AND status = 'completed'`,
        [userId]
      ).catch(() => ({ rows: [] }));
      let mockAvg = 0, strictMockCount = 0;
      if (mockResults.rows.length > 0) {
        mockAvg = mockResults.rows.reduce((s: number, r: any) => s + (r.total_questions > 0 ? (r.score / r.total_questions) * 100 : 0), 0) / mockResults.rows.length;
        for (const r of mockResults.rows) {
          const config = typeof r.config === "string" ? JSON.parse(r.config) : r.config;
          if (config?.strictMode) strictMockCount++;
        }
      }

      const baseline = calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount });

      const actionCandidates = [
        { action: "Complete a strict CAT simulation", link: "/mock-exams", deltaFn: () => calculatePassProbability(overallAccuracy, totalQuestions, trend, mockAvg, { tier: effectiveTier, strictMockCount: strictMockCount + 1 }) },
        { action: "Practice 20 SATA questions", link: "/lessons", deltaFn: () => calculatePassProbability(Math.min(100, overallAccuracy + 2), totalQuestions + 20, trend, mockAvg, { tier: effectiveTier, strictMockCount }) },
        { action: "Complete 50 mixed-difficulty questions", link: "/lessons", deltaFn: () => calculatePassProbability(overallAccuracy, totalQuestions + 50, trend, mockAvg, { tier: effectiveTier, strictMockCount }) },
        { action: "Review pharmacology flashcards", link: "/flashcard-study", deltaFn: () => calculatePassProbability(Math.min(100, overallAccuracy + 1.5), totalQuestions + 25, trend, mockAvg, { tier: effectiveTier, strictMockCount }) },
        { action: "Study clinical case simulations", link: "/case-simulation", deltaFn: () => calculatePassProbability(Math.min(100, overallAccuracy + 2), totalQuestions + 15, trend, mockAvg, { tier: effectiveTier, strictMockCount }) },
        { action: "Complete safety hazard practice", link: "/safety-hazard-simulator", deltaFn: () => calculatePassProbability(Math.min(100, overallAccuracy + 1), totalQuestions + 10, trend, mockAvg, { tier: effectiveTier, strictMockCount }) },
      ];

      const rankedActions = actionCandidates.map(a => {
        const projected = a.deltaFn();
        const lift = Math.min(6, projected.probability - baseline.probability);
        return { action: a.action, link: a.link, estimatedLift: Math.round(lift * 10) / 10 };
      }).sort((a, b) => b.estimatedLift - a.estimatedLift).slice(0, 3);

      if (isPremium) {
        res.json({ actions: rankedActions, baseline: baseline.probability, riskCategory: baseline.riskCategory });
      } else {
        res.json({
          actions: rankedActions.map(a => ({ action: a.action, link: a.link })),
          riskCategory: baseline.riskCategory,
          upgradeHint: "Upgrade to see estimated probability lift for each action.",
        });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== UPGRADE FUNNEL EVENTS ======
  app.post("/api/upgrade/events", async (req, res) => {
    try {
      const { userId, eventType, metadata } = req.body;
      if (!eventType) return res.status(400).json({ error: "eventType required" });
      const validEvents = ["upgrade_modal_shown", "upgrade_clicked", "upgrade_dismissed", "purchase_completed", "simulator_opened", "diagnostic_completed", "first_mock_completed", "exam_date_set", "action_added_to_plan"];
      if (!validEvents.includes(eventType)) return res.status(400).json({ error: "Invalid event type" });
      await pool.query(
        `INSERT INTO upgrade_funnel_events (id, user_id, event_type, metadata, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
        [userId || null, eventType, metadata ? JSON.stringify(metadata) : null]
      );
      res.json({ success: true });
    } catch (e: any) {
      if (e.message?.includes('relation "upgrade_funnel_events" does not exist')) {
        await pool.query(`CREATE TABLE IF NOT EXISTS upgrade_funnel_events (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id VARCHAR,
          event_type TEXT NOT NULL,
          metadata JSONB,
          created_at TIMESTAMP DEFAULT NOW()
        )`);
        await pool.query(
          `INSERT INTO upgrade_funnel_events (id, user_id, event_type, metadata, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
          [req.body.userId || null, req.body.eventType, req.body.metadata ? JSON.stringify(req.body.metadata) : null]
        );
        res.json({ success: true });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  });

  app.get("/api/admin/funnel-metrics", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const metrics = await pool.query(
        `SELECT event_type, COUNT(*)::int as count, COUNT(DISTINCT user_id)::int as unique_users
         FROM upgrade_funnel_events
         WHERE created_at > NOW() - INTERVAL '30 days'
         GROUP BY event_type ORDER BY count DESC`
      ).catch(() => ({ rows: [] }));

      const daily = await pool.query(
        `SELECT DATE(created_at) as date, event_type, COUNT(*)::int as count
         FROM upgrade_funnel_events
         WHERE created_at > NOW() - INTERVAL '30 days'
         GROUP BY DATE(created_at), event_type ORDER BY date DESC`
      ).catch(() => ({ rows: [] }));

      res.json({ summary: metrics.rows, daily: daily.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== ADMIN QC DASHBOARD ======
  app.get("/api/admin/content-qc", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const lowWordCount = await pool.query(
        `SELECT id, title, slug, LENGTH(body) as body_length FROM content_items
         WHERE LENGTH(body) < 500 AND status = 'published' ORDER BY body_length ASC LIMIT 50`
      ).catch(() => ({ rows: [] }));

      const missingMeta = await pool.query(
        `SELECT id, title, slug FROM content_items
         WHERE (meta_description IS NULL OR meta_description = '') AND status = 'published' LIMIT 50`
      ).catch(() => ({ rows: [] }));

      const orphanPages = await pool.query(
        `SELECT id, title, slug FROM content_items
         WHERE status = 'published' AND body NOT LIKE '%](/lessons/%' AND body NOT LIKE '%](/glossary/%'
         ORDER BY title LIMIT 50`
      ).catch(() => ({ rows: [] }));

      res.json({
        lowWordCount: lowWordCount.rows.map(snakeToCamel),
        missingMeta: missingMeta.rows.map(snakeToCamel),
        orphanPages: orphanPages.rows.map(snakeToCamel),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== DIAGNOSTIC EXAM ======
  app.get("/api/diagnostic-exam", async (_req, res) => {
    try {
      const questions = getDiagnosticQuestions();
      res.json(questions.map((q: any, i: number) => ({
        id: i,
        stem: q.stem,
        options: q.options,
        bodySystem: q.bodySystem,
        difficulty: q.difficulty,
      })));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/diagnostic-exam/submit", async (req, res) => {
    try {
      const { answers, userId, sessionId } = req.body;
      if (!answers || !Array.isArray(answers)) return res.status(400).json({ error: "answers array required" });
      const questions = getDiagnosticQuestions();
      let score = 0;
      const topicBreakdown: Record<string, { correct: number; total: number }> = {};
      for (let i = 0; i < Math.min(answers.length, questions.length); i++) {
        const q = questions[i];
        const sys = q.bodySystem || "general";
        if (!topicBreakdown[sys]) topicBreakdown[sys] = { correct: 0, total: 0 };
        topicBreakdown[sys].total++;
        if (answers[i] === q.correct) {
          score++;
          topicBreakdown[sys].correct++;
        }
      }

      await pool.query(
        `INSERT INTO diagnostic_attempts (id, user_id, session_id, score, total_questions, answers, topic_breakdown, completed_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`,
        [userId || null, sessionId || null, score, questions.length, JSON.stringify(answers), JSON.stringify(topicBreakdown)]
      ).catch(() => {});

      const result: any = {
        score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
      };

      if (userId) {
        result.topicBreakdown = topicBreakdown;
        result.recommendations = Object.entries(topicBreakdown)
          .filter(([_, d]) => d.total > 0 && (d.correct / d.total) < 0.7)
          .map(([topic, d]) => ({
            topic,
            accuracy: Math.round((d.correct / d.total) * 100),
            link: `/lessons/${topic}`,
          }));
      }

      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/exam-blueprints", async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM exam_blueprints WHERE active = true ORDER BY exam_name`
      );
      res.json(result.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/exam-blueprints/:id", async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM exam_blueprints WHERE id = $1`, [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ error: "Blueprint not found" });
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/exam-blueprints", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const parsed = insertExamBlueprintSchema.parse(req.body);
      const result = await pool.query(
        `INSERT INTO exam_blueprints (id, exam_code, exam_name, tier, region, total_questions, passing_standard, time_limit, domains, question_type_weights, cat_enabled, cat_min_questions, cat_max_questions, active, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()) RETURNING *`,
        [parsed.examCode, parsed.examName, parsed.tier, parsed.region || "ALL", parsed.totalQuestions, parsed.passingStandard, parsed.timeLimit,
         JSON.stringify(parsed.domains), JSON.stringify(parsed.questionTypeWeights || {}), parsed.catEnabled ?? false,
         parsed.catMinQuestions || null, parsed.catMaxQuestions || null, parsed.active ?? true]
      );
      await logAudit(req, admin, "exam_blueprint", result.rows[0].id, "create", null, result.rows[0]);
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/exam-blueprints/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const before = await pool.query(`SELECT * FROM exam_blueprints WHERE id = $1`, [req.params.id]);
      if (before.rows.length === 0) return res.status(404).json({ error: "Blueprint not found" });
      const { examCode, examName, tier, region, totalQuestions, passingStandard, timeLimit, domains, questionTypeWeights, catEnabled, catMinQuestions, catMaxQuestions, active } = req.body;
      const result = await pool.query(
        `UPDATE exam_blueprints SET exam_code = COALESCE($1, exam_code), exam_name = COALESCE($2, exam_name), tier = COALESCE($3, tier),
         region = COALESCE($4, region), total_questions = COALESCE($5, total_questions), passing_standard = COALESCE($6, passing_standard),
         time_limit = COALESCE($7, time_limit), domains = COALESCE($8, domains), question_type_weights = COALESCE($9, question_type_weights),
         cat_enabled = COALESCE($10, cat_enabled), cat_min_questions = COALESCE($11, cat_min_questions), cat_max_questions = COALESCE($12, cat_max_questions),
         active = COALESCE($13, active), updated_at = NOW() WHERE id = $14 RETURNING *`,
        [examCode, examName, tier, region, totalQuestions, passingStandard, timeLimit,
         domains ? JSON.stringify(domains) : null, questionTypeWeights ? JSON.stringify(questionTypeWeights) : null,
         catEnabled, catMinQuestions, catMaxQuestions, active, req.params.id]
      );
      await logAudit(req, admin, "exam_blueprint", req.params.id, "update", before.rows[0], result.rows[0]);
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/exam-blueprints/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const before = await pool.query(`SELECT * FROM exam_blueprints WHERE id = $1`, [req.params.id]);
      if (before.rows.length === 0) return res.status(404).json({ error: "Blueprint not found" });
      await pool.query(`UPDATE exam_blueprints SET active = false, updated_at = NOW() WHERE id = $1`, [req.params.id]);
      await logAudit(req, admin, "exam_blueprint", req.params.id, "soft_delete", before.rows[0], null);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/exam-blueprints/seed", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await seedExamBlueprints();
      res.json({ success: true, message: "Exam blueprints seeded" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== SEO PAGES ======
  app.get("/api/seo-pages", async (req, res) => {
    try {
      const lang = req.query.language || "en";
      const pageType = req.query.pageType;
      const exam = req.query.exam;
      let query = `SELECT * FROM seo_pages WHERE is_public = true AND language_code = $1`;
      const params: any[] = [lang];
      if (pageType) { query += ` AND page_type = $${params.length + 1}`; params.push(pageType); }
      if (exam) { query += ` AND exam = $${params.length + 1}`; params.push(exam); }
      query += ` ORDER BY title`;
      const result = await pool.query(query, params);
      res.json(result.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/seo-pages/:slug", async (req, res) => {
    try {
      const lang = req.query.language || "en";
      const isAdminPreview = req.query.preview === "true";
      const publicFilter = isAdminPreview ? "" : " AND is_public = true";
      const result = await pool.query(
        `SELECT * FROM seo_pages WHERE slug = $1 AND language_code = $2${publicFilter}`,
        [req.params.slug, lang]
      );
      if (result.rows.length === 0) {
        const fallback = await pool.query(
          `SELECT * FROM seo_pages WHERE slug = $1 AND language_code = 'en'${publicFilter}`,
          [req.params.slug]
        );
        if (fallback.rows.length === 0) return res.status(404).json({ error: "Page not found" });
        return res.json({ ...snakeToCamel(fallback.rows[0]), fallbackToEnglish: true });
      }
      const page = snakeToCamel(result.rows[0]);
      if (page.pageGroupId) {
        const hreflang = await pool.query(
          `SELECT language_code, slug FROM seo_pages WHERE page_group_id = $1 AND is_public = true`,
          [page.pageGroupId]
        );
        page.hreflangLinks = hreflang.rows.map((r: any) => ({ lang: r.language_code, slug: r.slug }));
      }
      res.json(page);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/seo-pages", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { pageType, exam, languageCode, title, slug, metaTitle, metaDescription, contentHtml, tocJson, faqJson, internalLinksJson, isPublic, isIndexable, canonicalUrl, translationStatus, pageGroupId } = req.body;
      const result = await pool.query(
        `INSERT INTO seo_pages (id, page_type, exam, language_code, title, slug, meta_title, meta_description, content_html, toc_json, faq_json, internal_links_json, is_public, is_indexable, canonical_url, translation_status, page_group_id, last_updated)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW()) RETURNING *`,
        [pageType, exam || null, languageCode || "en", title, slug, metaTitle || null, metaDescription || null,
         contentHtml || null, tocJson ? JSON.stringify(tocJson) : null, faqJson ? JSON.stringify(faqJson) : null,
         internalLinksJson ? JSON.stringify(internalLinksJson) : null, isPublic ?? true, isIndexable ?? true,
         canonicalUrl || null, translationStatus || "en_source", pageGroupId || null]
      );
      await logAudit(req, admin, "seo_page", result.rows[0].id, "create", null, result.rows[0]);
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/seo-pages/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const fields = req.body;
      const setClauses: string[] = [];
      const params: any[] = [];
      const allowedFields = ["page_type", "exam", "language_code", "title", "slug", "meta_title", "meta_description", "content_html", "toc_json", "faq_json", "internal_links_json", "is_public", "is_indexable", "canonical_url", "translation_status", "page_group_id"];
      const fieldMap: Record<string, string> = { pageType: "page_type", exam: "exam", languageCode: "language_code", title: "title", slug: "slug", metaTitle: "meta_title", metaDescription: "meta_description", contentHtml: "content_html", tocJson: "toc_json", faqJson: "faq_json", internalLinksJson: "internal_links_json", isPublic: "is_public", isIndexable: "is_indexable", canonicalUrl: "canonical_url", translationStatus: "translation_status", pageGroupId: "page_group_id" };
      for (const [camel, snake] of Object.entries(fieldMap)) {
        if (fields[camel] !== undefined && allowedFields.includes(snake)) {
          params.push(typeof fields[camel] === "object" && fields[camel] !== null ? JSON.stringify(fields[camel]) : fields[camel]);
          setClauses.push(`${snake} = $${params.length}`);
        }
      }
      if (setClauses.length === 0) return res.status(400).json({ error: "No fields to update" });
      params.push(req.params.id);
      const result = await pool.query(
        `UPDATE seo_pages SET ${setClauses.join(", ")}, last_updated = NOW() WHERE id = $${params.length} RETURNING *`,
        params
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ====== CONTENT TRANSLATIONS ======
  app.get("/api/translations/:contentType/:contentId", async (req, res) => {
    try {
      const { contentType, contentId } = req.params;
      const lang = req.query.language as string;
      let query = `SELECT * FROM content_translations WHERE content_type = $1 AND content_id = $2`;
      const params: any[] = [contentType, contentId];
      if (lang) { query += ` AND language_code = $3`; params.push(lang); }
      const result = await pool.query(query, params);
      res.json(result.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/translations/batch/:contentType", async (req, res) => {
    try {
      const lang = req.query.language as string || "fr";
      const result = await pool.query(
        `SELECT * FROM content_translations WHERE content_type = $1 AND language_code = $2 ORDER BY content_id`,
        [req.params.contentType, lang]
      );
      const grouped: Record<string, Record<string, string>> = {};
      for (const row of result.rows) {
        if (!grouped[row.content_id]) grouped[row.content_id] = {};
        grouped[row.content_id][row.field_name] = row.translated_text;
      }
      res.json(grouped);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/translations", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { contentType, contentId, languageCode, fieldName, translatedText, translationStatus } = req.body;
      if (!contentType || !contentId || !languageCode || !fieldName || !translatedText) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const existing = await pool.query(
        `SELECT id, translation_status FROM content_translations WHERE content_type = $1 AND content_id = $2 AND language_code = $3 AND field_name = $4`,
        [contentType, contentId, languageCode, fieldName]
      );
      if (existing.rows.length > 0) {
        if (existing.rows[0].translation_status === "human_reviewed" && translationStatus !== "human_reviewed") {
          return res.status(409).json({ error: "Cannot overwrite human-reviewed translation with auto translation" });
        }
        await pool.query(
          `UPDATE content_translations SET translated_text = $1, translation_status = $2, last_updated = NOW() WHERE id = $3`,
          [translatedText, translationStatus || "auto", existing.rows[0].id]
        );
      } else {
        await pool.query(
          `INSERT INTO content_translations (id, content_type, content_id, language_code, field_name, translated_text, translation_status, last_updated)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`,
          [contentType, contentId, languageCode, fieldName, translatedText, translationStatus || "auto"]
        );
      }
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/translations/bulk", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { translations } = req.body;
      if (!Array.isArray(translations)) return res.status(400).json({ error: "translations must be an array" });
      let inserted = 0, updated = 0, skipped = 0;
      for (const t of translations) {
        const existing = await pool.query(
          `SELECT id, translation_status FROM content_translations WHERE content_type = $1 AND content_id = $2 AND language_code = $3 AND field_name = $4`,
          [t.contentType, t.contentId, t.languageCode, t.fieldName]
        );
        if (existing.rows.length > 0) {
          if (existing.rows[0].translation_status === "human_reviewed" && t.translationStatus !== "human_reviewed") {
            skipped++;
            continue;
          }
          await pool.query(
            `UPDATE content_translations SET translated_text = $1, translation_status = $2, last_updated = NOW() WHERE id = $3`,
            [t.translatedText, t.translationStatus || "auto", existing.rows[0].id]
          );
          updated++;
        } else {
          await pool.query(
            `INSERT INTO content_translations (id, content_type, content_id, language_code, field_name, translated_text, translation_status, last_updated)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`,
            [t.contentType, t.contentId, t.languageCode, t.fieldName, t.translatedText, t.translationStatus || "auto"]
          );
          inserted++;
        }
      }
      res.json({ success: true, inserted, updated, skipped });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get("/api/admin/translation-coverage", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const coverage = await pool.query(
        `SELECT content_type, language_code, translation_status, COUNT(*)::int as count
         FROM content_translations GROUP BY content_type, language_code, translation_status ORDER BY content_type, language_code`
      );
      res.json(coverage.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== ADMIN FLASHCARD CONTROLS ======
  app.post("/api/admin/users/:id/override-limit", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { limit } = req.body;
      if (limit === undefined) return res.status(400).json({ error: "limit required (number or null for unlimited)" });
      await pool.query(`UPDATE users SET flashcard_limit = $1 WHERE id = $2`, [limit, req.params.id]);
      res.json({ success: true, flashcardLimit: limit });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/users/:id/comp-pro", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { duration } = req.body;
      const expiresAt = duration ? new Date(Date.now() + parseInt(duration) * 86400000) : null;
      await pool.query(
        `UPDATE users SET tier = CASE WHEN tier = 'free' THEN 'pro' ELSE tier END,
         subscription_status = 'active', flashcard_limit = NULL, plan_expires_at = $1 WHERE id = $2`,
        [expiresAt, req.params.id]
      );
      res.json({ success: true, expiresAt });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== CONTENT PIPELINE ======
  app.get("/api/admin/pipeline/status", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { getPipelineStatus } = await import("./content-pipeline");
      const status = await getPipelineStatus();
      res.json(status);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/pipeline/run", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { tier, contentType, count } = req.body;
      if (!tier || !contentType || !count) return res.status(400).json({ error: "tier, contentType, count required" });
      const { runManualGeneration } = await import("./content-pipeline");
      const result = await runManualGeneration(tier, contentType, Math.min(count, 50));
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/pipeline/jobs", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { tier, contentType, status: jobStatus, limit: lim } = req.query;
      let query = `SELECT * FROM generation_jobs WHERE 1=1`;
      const params: any[] = [];
      if (tier) { params.push(tier); query += ` AND tier = $${params.length}`; }
      if (contentType) { params.push(contentType); query += ` AND content_type = $${params.length}`; }
      if (jobStatus) { params.push(jobStatus); query += ` AND status = $${params.length}`; }
      query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
      params.push(parseInt(String(lim)) || 50);
      const result = await pool.query(query, params);
      res.json(result.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/qbank/review", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { tier, topic, status: qStatus, limit: lim, offset: off } = req.query;
      let query = `SELECT eq.*, vr.verdict, vr.confidence_score, vr.issues_json
        FROM exam_questions eq
        LEFT JOIN verification_reports vr ON vr.entity_type = 'exam_question' AND vr.entity_id = eq.id
        WHERE 1=1`;
      const params: any[] = [];
      if (tier) { params.push(tier); query += ` AND eq.tier = $${params.length}`; }
      if (topic) { params.push(topic); query += ` AND eq.body_system = $${params.length}`; }
      if (qStatus) { params.push(qStatus); query += ` AND eq.status = $${params.length}`; }
      const offset = parseInt(String(off)) || 0;
      const limit = parseInt(String(lim)) || 50;
      query += ` ORDER BY eq.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
      const result = await pool.query(query, params);
      const countQ = await pool.query(`SELECT COUNT(*)::int as total FROM exam_questions WHERE status = 'needs_review'`);
      res.json({ items: result.rows.map(snakeToCamel), total: countQ.rows[0]?.total || 0 });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/flashcard-bank/review", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { tier, status: fStatus, limit: lim, offset: off } = req.query;
      let query = `SELECT fb.*, vr.verdict, vr.confidence_score, vr.issues_json
        FROM flashcard_bank fb
        LEFT JOIN verification_reports vr ON vr.entity_type = 'flashcard' AND vr.entity_id = fb.id
        WHERE 1=1`;
      const params: any[] = [];
      if (tier) { params.push(tier); query += ` AND fb.tier = $${params.length}`; }
      if (fStatus) { params.push(fStatus); query += ` AND fb.status = $${params.length}`; }
      const offset = parseInt(String(off)) || 0;
      const limit = parseInt(String(lim)) || 50;
      query += ` ORDER BY fb.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
      const result = await pool.query(query, params);
      const countQ = await pool.query(`SELECT COUNT(*)::int as total FROM flashcard_bank WHERE status = 'needs_review'`);
      res.json({ items: result.rows.map(snakeToCamel), total: countQ.rows[0]?.total || 0 });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/qbank/:id/approve", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`UPDATE exam_questions SET status = 'approved', updated_at = NOW() WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/qbank/:id/reject", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`UPDATE exam_questions SET status = 'rejected', updated_at = NOW() WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/flashcard-bank/:id/approve", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`UPDATE flashcard_bank SET status = 'approved' WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/flashcard-bank/:id/reject", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`UPDATE flashcard_bank SET status = 'rejected' WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/qbank/bulk-approve", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { ids } = req.body;
      if (!ids?.length) return res.status(400).json({ error: "ids required" });
      const result = await pool.query(
        `UPDATE exam_questions SET status = 'approved', updated_at = NOW()
         WHERE id = ANY($1) AND status = 'needs_review'
         AND id IN (SELECT entity_id FROM verification_reports WHERE entity_type = 'exam_question' AND verdict = 'pass')`,
        [ids]
      );
      res.json({ approved: result.rowCount });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/flashcard-bank/bulk-approve", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { ids } = req.body;
      if (!ids?.length) return res.status(400).json({ error: "ids required" });
      const result = await pool.query(
        `UPDATE flashcard_bank SET status = 'approved'
         WHERE id = ANY($1) AND status = 'needs_review'
         AND id IN (SELECT entity_id FROM verification_reports WHERE entity_type = 'flashcard' AND verdict = 'pass')`,
        [ids]
      );
      res.json({ approved: result.rowCount });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== SEO DASHBOARD ======
  app.get("/api/admin/seo-dashboard", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const [pagesByLang, pagesByStatus, wordCountFlags, missingMeta, orphanPages, needsReview] = await Promise.all([
        pool.query(`SELECT language_code, page_type, COUNT(*)::int as count FROM seo_pages GROUP BY language_code, page_type ORDER BY language_code`),
        pool.query(`SELECT language_code, translation_status, COUNT(*)::int as count FROM seo_pages GROUP BY language_code, translation_status ORDER BY language_code`),
        pool.query(`SELECT id, title, slug, language_code, page_type, LENGTH(COALESCE(content_html,'')) as char_count FROM seo_pages WHERE (page_type = 'pillar' AND LENGTH(COALESCE(content_html,'')) < 15000) OR (page_type = 'cluster' AND LENGTH(COALESCE(content_html,'')) < 7200) ORDER BY char_count ASC LIMIT 50`),
        pool.query(`SELECT id, title, slug, language_code, page_type FROM seo_pages WHERE meta_description IS NULL OR meta_description = '' ORDER BY language_code LIMIT 100`),
        pool.query(`SELECT id, title, slug, language_code FROM seo_pages WHERE page_group_id IS NULL AND language_code != 'en' LIMIT 50`),
        pool.query(`SELECT id, title, slug, language_code, translation_status FROM seo_pages WHERE translation_status = 'needs_review' ORDER BY last_updated DESC LIMIT 50`),
      ]);

      const coverageMatrix = await pool.query(
        `SELECT page_group_id, array_agg(json_build_object('lang', language_code, 'status', translation_status, 'id', id)) as langs
         FROM seo_pages WHERE page_group_id IS NOT NULL GROUP BY page_group_id`
      );

      res.json({
        pagesByLanguage: pagesByLang.rows.map(snakeToCamel),
        pagesByStatus: pagesByStatus.rows.map(snakeToCamel),
        wordCountFlags: wordCountFlags.rows.map(snakeToCamel),
        missingMeta: missingMeta.rows.map(snakeToCamel),
        orphanPages: orphanPages.rows.map(snakeToCamel),
        needsReview: needsReview.rows.map(snakeToCamel),
        coverageMatrix: coverageMatrix.rows.map(snakeToCamel),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/seo-pages-all", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const lang = req.query.language || "en";
      const pageType = req.query.pageType;
      let query = `SELECT id, page_type, exam, language_code, title, slug, meta_title, meta_description, translation_status, is_public, is_indexable, page_group_id, LENGTH(COALESCE(content_html,'')) as content_length, last_updated FROM seo_pages WHERE language_code = $1`;
      const params: any[] = [lang];
      if (pageType) { query += ` AND page_type = $${params.length + 1}`; params.push(pageType); }
      query += ` ORDER BY page_type DESC, title`;
      const result = await pool.query(query, params);
      res.json(result.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== AI LOCALIZATION GENERATOR ======
  app.post("/api/ai/generate-localized-seo", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { sourcePageId, targetLanguage } = req.body;
      if (!sourcePageId || !targetLanguage) return res.status(400).json({ error: "sourcePageId and targetLanguage required" });

      const source = await pool.query(`SELECT * FROM seo_pages WHERE id = $1`, [sourcePageId]);
      if (source.rows.length === 0) return res.status(404).json({ error: "Source page not found" });
      const srcPage = source.rows[0];

      const langNames: Record<string, string> = {
        fr: "French", es: "Spanish", fil: "Filipino (Tagalog)", hi: "Hindi", zh: "Chinese (Simplified)",
        ar: "Arabic", ko: "Korean", pt: "Portuguese", pa: "Punjabi", vi: "Vietnamese",
        ht: "Haitian Creole", ur: "Urdu", ja: "Japanese", fa: "Farsi (Persian)"
      };
      const langName = langNames[targetLanguage] || targetLanguage;

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const prompt = `You are a professional medical content localizer specializing in nursing education. Localize the following SEO page metadata from English to ${langName}.

CRITICAL RULES:
- Do NOT literally translate. Adapt to how native ${langName} speakers search for nursing exam prep content.
- Use natural nursing terminology in ${langName}.
- Preserve medical accuracy and clinical authority tone.
- Optimize meta title/description for search queries native speakers would use.
- Adapt FAQ questions to natural search phrasing in ${langName}.
- Keep all medical terms accurate (some may stay in English if that's standard in ${langName}-speaking countries).

Source page:
Title: ${srcPage.title}
Meta Title: ${srcPage.meta_title || srcPage.title}
Meta Description: ${srcPage.meta_description || ""}
Page Type: ${srcPage.page_type}
Exam: ${srcPage.exam || "general"}

${srcPage.faq_json ? `FAQs (localize questions and answers naturally):\n${srcPage.faq_json}` : ""}

Return ONLY valid JSON with this exact structure:
{
  "title": "Localized title",
  "metaTitle": "SEO-optimized localized meta title (max 60 chars)",
  "metaDescription": "SEO-optimized localized meta description (max 160 chars)",
  "slug": "url-slug-in-target-language",
  "faqs": [{"q": "localized question", "a": "localized answer"}]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
        max_tokens: 4096,
      });

      const text = response.choices[0]?.message?.content || "{}";
      const totalTokens = response.usage?.total_tokens || 0;
      recordAiUsage(1, totalTokens);
      let localized;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        localized = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      } catch {
        return res.status(500).json({ error: "Failed to parse AI response" });
      }

      const targetSlug = `${targetLanguage}/${localized.slug || srcPage.slug}`;

      const existing = await pool.query(
        `SELECT id, translation_status FROM seo_pages WHERE page_group_id = $1 AND language_code = $2`,
        [srcPage.page_group_id, targetLanguage]
      );

      if (existing.rows.length > 0) {
        if (existing.rows[0].translation_status === "human_reviewed") {
          return res.status(409).json({ error: "Cannot overwrite human-reviewed translation. Edit manually instead." });
        }
        await pool.query(
          `UPDATE seo_pages SET title = $1, slug = $2, meta_title = $3, meta_description = $4, faq_json = $5, translation_status = 'auto', last_updated = NOW() WHERE id = $6`,
          [localized.title, targetSlug, localized.metaTitle, localized.metaDescription, JSON.stringify(localized.faqs || []), existing.rows[0].id]
        );
      } else {
        await pool.query(
          `INSERT INTO seo_pages (id, page_type, exam, language_code, title, slug, meta_title, meta_description, faq_json, toc_json, internal_links_json, is_public, is_indexable, canonical_url, translation_status, page_group_id, last_updated)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false, false, $11, 'auto', $12, NOW())`,
          [srcPage.page_type, srcPage.exam, targetLanguage, localized.title, targetSlug, localized.metaTitle, localized.metaDescription,
           JSON.stringify(localized.faqs || []), srcPage.toc_json, srcPage.internal_links_json,
           `/${targetSlug}`, srcPage.page_group_id]
        );
      }

      await logAudit(req, admin, "seo_page", sourcePageId, "ai-localize", null, { targetLanguage, title: localized.title });
      res.json({ success: true, localized });
    } catch (e: any) {
      console.error("AI localization error:", e);
      res.status(500).json({ error: e.message || "AI localization failed" });
    }
  });

  // ====== SEO KEYWORD TARGETS ======
  app.get("/api/admin/seo-keywords", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const lang = req.query.language;
      let query = `SELECT * FROM seo_keyword_targets`;
      const params: any[] = [];
      if (lang) { query += ` WHERE language_code = $1`; params.push(lang); }
      query += ` ORDER BY language_code, keyword`;
      const result = await pool.query(query, params);
      res.json(result.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/seo-keywords", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { languageCode, keyword, intent, pageTargetSlug, searchVolume, difficulty } = req.body;
      if (!languageCode || !keyword) return res.status(400).json({ error: "languageCode and keyword required" });
      const result = await pool.query(
        `INSERT INTO seo_keyword_targets (id, language_code, keyword, intent, page_target_slug, search_volume, difficulty, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
        [languageCode, keyword, intent || "informational", pageTargetSlug || null, searchVolume || null, difficulty || null]
      );
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/admin/seo-keywords/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      await pool.query(`DELETE FROM seo_keyword_targets WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // ====== FLAG TRANSLATIONS NEEDING REVIEW ======
  app.post("/api/admin/flag-stale-translations", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(
        `UPDATE seo_pages SET translation_status = 'needs_review'
         WHERE language_code != 'en' AND translation_status = 'auto'
         AND page_group_id IN (
           SELECT page_group_id FROM seo_pages WHERE language_code = 'en' AND last_updated > (NOW() - INTERVAL '7 days')
         ) RETURNING id`
      );
      res.json({ flagged: result.rowCount });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ====== CAT ENGINE ENDPOINTS ======
  app.post("/api/cat/estimate-ability", async (req, res) => {
    try {
      const { computeAbilityEstimate } = await import("./cat-engine");
      const { responses, userId, sessionId } = req.body;
      if (!responses || !Array.isArray(responses)) return res.status(400).json({ error: "responses array required" });
      const estimate = computeAbilityEstimate(responses);
      if (userId && sessionId) {
        await pool.query(
          `INSERT INTO user_ability_sessions (id, user_id, session_id, final_ability, confidence_interval, stability_index, early_stop, question_count, ability_trajectory, anti_gaming_flags, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
           ON CONFLICT DO NOTHING`,
          [userId, sessionId, estimate.ability, estimate.confidenceInterval, estimate.stabilityIndex, estimate.earlyStop, estimate.questionCount, JSON.stringify(estimate.trajectory), JSON.stringify(estimate.antiGamingFlags)]
        );
      }
      res.json(estimate);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/cat/select-next-item", async (req, res) => {
    try {
      const { selectNextItem } = await import("./cat-engine");
      const { currentAbility, candidates, answeredCategories, blueprintWeights, totalAnswered, lastCaseSetIndex } = req.body;
      const item = selectNextItem(currentAbility || 0, candidates || [], answeredCategories || {}, blueprintWeights || {}, totalAnswered || 0, lastCaseSetIndex || 0);
      res.json({ selectedItem: item });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/cat/session/:sessionId", async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM user_ability_sessions WHERE session_id = $1`, [req.params.sessionId]);
      res.json(result.rows[0] || null);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/cat-analytics", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const sessions = await pool.query(`SELECT final_ability, confidence_interval, stability_index, early_stop, question_count, created_at FROM user_ability_sessions ORDER BY created_at DESC LIMIT 500`);
      const adjustments = await pool.query(`SELECT * FROM difficulty_adjustment_log ORDER BY created_at DESC LIMIT 50`);
      const abilityDistribution = [0, 0, 0, 0, 0, 0, 0];
      sessions.rows.forEach((s: any) => {
        const bucket = Math.min(6, Math.max(0, Math.floor((s.final_ability + 9) / 3)));
        abilityDistribution[bucket]++;
      });
      const earlyStopCount = sessions.rows.filter((s: any) => s.early_stop).length;
      res.json({ totalSessions: sessions.rows.length, abilityDistribution, earlyStopRate: sessions.rows.length > 0 ? (earlyStopCount / sessions.rows.length * 100).toFixed(1) : 0, avgQuestionCount: sessions.rows.length > 0 ? Math.round(sessions.rows.reduce((a: number, s: any) => a + s.question_count, 0) / sessions.rows.length) : 0, recentSessions: sessions.rows.slice(0, 20), adjustmentLog: adjustments.rows });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ====== BLUEPRINT COVERAGE + DIFFICULTY DISTRIBUTION ======
  app.get("/api/admin/blueprint-coverage", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const blueprints = await pool.query(`SELECT * FROM exam_blueprints WHERE active = true`);
      const questionCounts = await pool.query(
        `SELECT exam, body_system, COUNT(*) as count FROM exam_questions WHERE status = 'published' GROUP BY exam, body_system`
      );
      const qMap = new Map<string, Map<string, number>>();
      for (const row of questionCounts.rows) {
        if (!qMap.has(row.exam)) qMap.set(row.exam, new Map());
        qMap.get(row.exam)!.set((row.body_system || "").toLowerCase(), Number(row.count));
      }

      const coverage = [];
      for (const bp of blueprints.rows) {
        const domains = Array.isArray(bp.domains) ? bp.domains : [];
        const examQuestions = qMap.get(bp.exam_code) || new Map();
        const totalExamQuestions = Array.from(examQuestions.values()).reduce((a, b) => a + b, 0);

        const domainCoverage = domains.map((d: any) => {
          const domainName = d.name || d.domain || "Unknown";
          const targetWeight = d.weight || d.percentage || 0;
          const questionCount = examQuestions.get(domainName.toLowerCase()) || 0;
          const currentPercent = totalExamQuestions > 0 ? Math.round((questionCount / totalExamQuestions) * 100) : 0;
          const targetQuestions = Math.ceil((targetWeight / 100) * (bp.total_questions || 100));
          const gap = Math.max(0, targetQuestions - questionCount);
          let status = "adequate";
          if (questionCount === 0) status = "empty";
          else if (currentPercent < targetWeight * 0.5) status = "critical";
          else if (currentPercent < targetWeight * 0.8) status = "low";

          return { domain: domainName, targetWeight, questionCount, currentPercent, status, recommendedToAdd: gap };
        });
        coverage.push({ examCode: bp.exam_code, examName: bp.exam_name, totalQuestions: bp.total_questions, actualQuestionCount: totalExamQuestions, domains: domainCoverage });
      }
      res.json(coverage);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/difficulty-distribution", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { checkDifficultyCalibration } = await import("./cat-engine");
      const stats = [];
      for (let level = 1; level <= 5; level++) {
        stats.push({ level, correct: 0, total: 0 });
      }
      const calibration = checkDifficultyCalibration(stats);
      const targetDistribution = { 1: 10, 2: 20, 3: 30, 4: 25, 5: 15 };
      res.json({ calibration, targetDistribution, actualDistribution: stats });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/language-coverage-matrix", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const seoPages = await pool.query(`SELECT language_code, page_type, COUNT(*) as count, AVG(LENGTH(COALESCE(content_html, ''))) as avg_chars FROM seo_pages GROUP BY language_code, page_type`);
      const translations = await pool.query(`SELECT language_code, content_type, COUNT(*) as count FROM content_translations GROUP BY language_code, content_type`);
      res.json({ seoPages: seoPages.rows, translations: translations.rows });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/keyword-gaps", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const gaps = await pool.query(
        `SELECT k.*, CASE WHEN s.id IS NOT NULL THEN true ELSE false END as has_page
         FROM seo_keyword_targets k
         LEFT JOIN seo_pages s ON s.slug = k.page_target_slug AND s.language_code = k.language_code
         WHERE k.page_target_slug IS NULL OR s.id IS NULL
         ORDER BY k.search_volume DESC NULLS LAST LIMIT 100`
      );
      res.json(gaps.rows);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ====== REVENUE + FUNNEL EVENTS ======
  app.post("/api/funnel/event", async (req, res) => {
    try {
      const { userId, languageCode, eventName, eventValue } = req.body;
      if (!eventName) return res.status(400).json({ error: "eventName required" });
      await pool.query(
        `INSERT INTO user_funnel_events (id, user_id, language_code, event_name, event_value, created_at) VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())`,
        [userId || null, languageCode || "en", eventName, eventValue ? JSON.stringify(eventValue) : null]
      );
      res.json({ success: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/revenue-analytics", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const funnelByLang = await pool.query(`SELECT language_code, event_name, COUNT(*) as count FROM user_funnel_events GROUP BY language_code, event_name ORDER BY language_code, count DESC`);
      const segments = await pool.query(`SELECT segment, COUNT(*) as count, AVG(propensity_score) as avg_propensity, AVG(price_sensitivity_score) as avg_sensitivity FROM user_revenue_profile GROUP BY segment`);
      const offers = await pool.query(`SELECT * FROM pricing_offers WHERE enabled = true ORDER BY created_at DESC`);
      const packRevenue = await pool.query(`SELECT p.title, p.pack_type, COUNT(sp.id) as purchases, SUM(sp.amount) as revenue FROM study_packs p LEFT JOIN study_pack_purchases sp ON sp.pack_id = p.id GROUP BY p.id, p.title, p.pack_type`);
      res.json({ funnelByLanguage: funnelByLang.rows, segments: segments.rows, offers: offers.rows, packRevenue: packRevenue.rows });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/offers/best", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const context = req.query.context as string || "general";
      let profile = null;
      if (userId) {
        const result = await pool.query(`SELECT * FROM user_revenue_profile WHERE user_id = $1`, [userId]);
        profile = result.rows[0] || null;
      }
      const segment = profile?.segment || "content_explorer";
      const propensity = profile?.propensity_score || 0.3;
      const sensitivity = profile?.price_sensitivity_score || 0.5;
      let offerType = "trial";
      let tier = "premium";
      if (segment === "exam_soon_high_intent" && propensity > 0.6) {
        offerType = "trial"; tier = "premium";
      } else if (propensity > 0.4 && sensitivity > 0.6) {
        offerType = "bundle"; tier = "core";
      } else if (segment === "heavy_practicer") {
        offerType = "annual"; tier = "premium";
      } else if (segment === "content_explorer") {
        offerType = "trial"; tier = "core";
      } else if (segment === "returning_at_risk") {
        offerType = "winback"; tier = "premium";
      }
      const offer = await pool.query(`SELECT * FROM pricing_offers WHERE offer_type = $1 AND tier = $2 AND enabled = true LIMIT 1`, [offerType, tier]);
      res.json({ offer: offer.rows[0] || null, segment, context });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ====== STUDY PACKS ======
  app.get("/api/study-packs", async (req, res) => {
    try {
      const lang = req.query.lang as string || "en";
      const result = await pool.query(`SELECT id, title, slug, pack_type, exam_code, tier, description, price, currency, question_count, difficulty_range, language_code, meta_title, meta_description, is_published FROM study_packs WHERE is_published = true AND language_code = $1 ORDER BY created_at DESC`, [lang]);
      res.json(result.rows);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/study-packs/:slug", async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM study_packs WHERE slug = $1`, [req.params.slug]);
      if (result.rows.length === 0) return res.status(404).json({ error: "Pack not found" });
      res.json(result.rows[0]);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/admin/study-packs", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { title, slug, packType, examCode, tier, description, contentHtml, price, currency, questionCount, questionTags, difficultyRange, languageCode, faqJson, metaTitle, metaDescription, isPublished } = req.body;
      const result = await pool.query(
        `INSERT INTO study_packs (id, title, slug, pack_type, exam_code, tier, description, content_html, price, currency, question_count, question_tags, difficulty_range, language_code, faq_json, meta_title, meta_description, is_published, created_at, updated_at) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW(), NOW()) RETURNING *`,
        [title, slug, packType, examCode || null, tier || "rn", description || null, contentHtml || null, price, currency || "USD", questionCount || 0, JSON.stringify(questionTags || []), difficultyRange || null, languageCode || "en", JSON.stringify(faqJson || []), metaTitle || null, metaDescription || null, isPublished || false]
      );
      res.json(result.rows[0]);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.put("/api/admin/study-packs/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const fields = req.body;
      const sets = Object.keys(fields).filter(k => k !== "id").map((k, i) => `${k.replace(/[A-Z]/g, (m: string) => '_' + m.toLowerCase())} = $${i + 2}`).join(", ");
      const values = Object.keys(fields).filter(k => k !== "id").map(k => typeof fields[k] === "object" ? JSON.stringify(fields[k]) : fields[k]);
      await pool.query(`UPDATE study_packs SET ${sets}, updated_at = NOW() WHERE id = $1`, [req.params.id, ...values]);
      res.json({ success: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ====== CONTENT ROI SCORING ======
  app.post("/api/admin/content-roi/evaluate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { proposedTitle, languageCode, examCode, contentType, primaryKeyword, secondaryKeywords, blueprintCategory } = req.body;
      let seoDemand = 50, blueprintStrategic = 50, conversionPotential = 50, authorityMultiplier = 50, monetizationFit = 50;
      if (primaryKeyword) {
        const existing = await pool.query(`SELECT * FROM seo_keyword_targets WHERE keyword ILIKE $1 AND language_code = $2`, [`%${primaryKeyword}%`, languageCode || "en"]);
        if (existing.rows.length > 0) {
          seoDemand = Math.min(100, 40 + (existing.rows[0].search_volume || 0) / 100);
        }
      }
      const overlap = await pool.query(`SELECT slug, title FROM seo_pages WHERE title ILIKE $1 AND language_code = $2 LIMIT 5`, [`%${proposedTitle?.split(" ").slice(0, 3).join("%")}%`, languageCode || "en"]);
      const similarityFlag = overlap.rows.length > 0;
      if (contentType === "pillar") { authorityMultiplier += 15; seoDemand += 10; }
      if (examCode) { blueprintStrategic += 10; }
      if (["nclex-rn", "nclex-pn"].includes(examCode?.toLowerCase() || "")) { monetizationFit += 15; }
      const langPriority = await pool.query(`SELECT tier FROM language_priority WHERE language_code = $1`, [languageCode || "en"]);
      if (langPriority.rows[0]?.tier === "tier_1") { seoDemand += 10; conversionPotential += 10; }
      else if (langPriority.rows[0]?.tier === "tier_3") { seoDemand -= 5; }
      seoDemand = Math.min(100, Math.max(0, seoDemand));
      blueprintStrategic = Math.min(100, Math.max(0, blueprintStrategic));
      conversionPotential = Math.min(100, Math.max(0, conversionPotential));
      authorityMultiplier = Math.min(100, Math.max(0, authorityMultiplier));
      monetizationFit = Math.min(100, Math.max(0, monetizationFit));
      const roiScore = seoDemand * 0.30 + blueprintStrategic * 0.20 + conversionPotential * 0.20 + authorityMultiplier * 0.15 + monetizationFit * 0.15;
      let priorityTier = "deprioritize";
      if (roiScore >= 80) priorityTier = "build_immediately";
      else if (roiScore >= 65) priorityTier = "high_priority";
      else if (roiScore >= 50) priorityTier = "if_time_permits";
      const result = await pool.query(
        `INSERT INTO content_roi_scores (id, proposed_title, language_code, exam_code, content_type, primary_keyword, secondary_keywords, blueprint_category, seo_demand_score, blueprint_strategic_score, conversion_potential_score, authority_multiplier_score, monetization_fit_score, roi_score, priority_tier, similarity_flag, similar_page_slug, pipeline_status, created_at, updated_at) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'idea', NOW(), NOW()) RETURNING *`,
        [proposedTitle, languageCode || "en", examCode || null, contentType, primaryKeyword || null, JSON.stringify(secondaryKeywords || []), blueprintCategory || null, seoDemand, blueprintStrategic, conversionPotential, authorityMultiplier, monetizationFit, roiScore, priorityTier, similarityFlag, overlap.rows[0]?.slug || null]
      );
      res.json(result.rows[0]);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/content-roi/pipeline", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(`SELECT * FROM content_roi_scores ORDER BY roi_score DESC`);
      res.json(result.rows);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.put("/api/admin/content-roi/:id/status", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { pipelineStatus } = req.body;
      await pool.query(`UPDATE content_roi_scores SET pipeline_status = $1, updated_at = NOW() WHERE id = $2`, [pipelineStatus, req.params.id]);
      res.json({ success: true });
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ====== AI USAGE BUDGET ======
  app.get("/api/admin/ai-budget", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const monthYear = new Date().toISOString().slice(0, 7);
      let result = await pool.query(`SELECT * FROM ai_usage_budget WHERE month_year = $1`, [monthYear]);
      if (result.rows.length === 0) {
        result = await pool.query(`INSERT INTO ai_usage_budget (id, month_year, tokens_used, token_budget, request_count, updated_at) VALUES (gen_random_uuid(), $1, 0, 500000, 0, NOW()) RETURNING *`, [monthYear]);
      }
      res.json(result.rows[0]);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ====== A/B TESTS ======
  app.get("/api/admin/ab-tests", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(`SELECT * FROM ab_tests ORDER BY created_at DESC`);
      res.json(result.rows);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.post("/api/admin/ab-tests", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const { name, variantsJson, allocation, enabled } = req.body;
      const result = await pool.query(
        `INSERT INTO ab_tests (id, name, variants_json, allocation, enabled, created_at) VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW()) RETURNING *`,
        [name, JSON.stringify(variantsJson || []), allocation || 0.5, enabled || false]
      );
      res.json(result.rows[0]);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // ====== WEEKLY INTELLIGENCE REPORT ======
  app.post("/api/admin/generate-intelligence-report", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const seoHealthIssues = await pool.query(`SELECT check_type, COUNT(*) as count FROM seo_health_checks WHERE resolved = false GROUP BY check_type`);
      const translationCoverage = await pool.query(`SELECT language_code, COUNT(*) as total, COUNT(*) FILTER (WHERE translated_text != '') as translated FROM content_translations GROUP BY language_code`);
      const keywordGaps = await pool.query(`SELECT COUNT(*) as gap_count FROM seo_keyword_targets WHERE page_target_slug IS NULL OR coverage_status = 'unmapped'`);
      const reportData = { seoHealthSummary: seoHealthIssues.rows, translationCoverage: translationCoverage.rows, keywordGapCount: keywordGaps.rows[0]?.gap_count || 0, generatedAt: new Date().toISOString() };
      const summary = `Weekly Report: ${seoHealthIssues.rows.length} SEO issue types, ${keywordGaps.rows[0]?.gap_count || 0} keyword gaps`;
      const result = await pool.query(
        `INSERT INTO content_intelligence_reports (id, report_type, report_data, summary, created_at) VALUES (gen_random_uuid(), 'weekly', $1, $2, NOW()) RETURNING *`,
        [JSON.stringify(reportData), summary]
      );
      res.json(result.rows[0]);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  app.get("/api/admin/intelligence-reports", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;
      const result = await pool.query(`SELECT * FROM content_intelligence_reports ORDER BY created_at DESC LIMIT 20`);
      res.json(result.rows);
    } catch (e: any) { res.status(500).json({ error: e.message }); }
  });

  // --------------------
  // SEO Health Check Engine + Content Depth Enforcement
  // --------------------

  app.post("/api/admin/seo-health-check", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const issues: Array<{ checkType: string; severity: string; pageSlug: string | null; languageCode: string | null; details: string }> = [];

      const contentResult = await pool.query(
        `SELECT id, slug, title, seo_title, seo_description, seo_keywords, summary, content, status, tier, tags FROM content_items WHERE status = 'published'`
      );
      const publishedItems = contentResult.rows;

      const translationResult = await pool.query(
        `SELECT DISTINCT content_id, language_code FROM content_translations WHERE content_type = 'content_item'`
      );
      const translationMap = new Map<string, Set<string>>();
      for (const row of translationResult.rows) {
        if (!translationMap.has(row.content_id)) translationMap.set(row.content_id, new Set());
        translationMap.get(row.content_id)!.add(row.language_code);
      }

      const PILLAR_WORD_THRESHOLD = 2500;
      const PILLAR_FAQ_THRESHOLD = 12;
      const PILLAR_LINK_THRESHOLD = 10;
      const CLUSTER_WORD_THRESHOLD = 1200;
      const CLUSTER_FAQ_THRESHOLD = 6;
      const CLUSTER_LINK_THRESHOLD = 6;

      for (const item of publishedItems) {
        const slug = item.slug;

        if (!item.seo_description || item.seo_description.trim().length === 0) {
          issues.push({ checkType: "missing_meta_description", severity: "error", pageSlug: slug, languageCode: "en", details: `Page "${item.title}" is missing a meta description` });
        } else if (item.seo_description.length < 50) {
          issues.push({ checkType: "short_meta_description", severity: "warning", pageSlug: slug, languageCode: "en", details: `Meta description for "${item.title}" is too short (${item.seo_description.length} chars, recommended 150-160)` });
        }

        if (!item.seo_title || item.seo_title.trim().length === 0) {
          issues.push({ checkType: "missing_seo_title", severity: "warning", pageSlug: slug, languageCode: "en", details: `Page "${item.title}" is missing an SEO title` });
        }

        let wordCount = 0;
        let faqCount = 0;
        let linkCount = 0;
        if (Array.isArray(item.content)) {
          for (const block of item.content as any[]) {
            const text = typeof block.content === "string" ? block.content : "";
            wordCount += text.split(/\s+/).filter(Boolean).length;
            if (block.type === "faq" || block.type === "quiz-question") faqCount++;
            const linkMatches = text.match(/https?:\/\/[^\s]+/g);
            if (linkMatches) linkCount += linkMatches.length;
          }
        }
        if (item.summary) {
          wordCount += item.summary.split(/\s+/).filter(Boolean).length;
        }

        const isPillar = (item.tags && Array.isArray(item.tags) && item.tags.includes("pillar")) || item.tier === "free";
        const wordThreshold = isPillar ? PILLAR_WORD_THRESHOLD : CLUSTER_WORD_THRESHOLD;
        const faqThreshold = isPillar ? PILLAR_FAQ_THRESHOLD : CLUSTER_FAQ_THRESHOLD;
        const linkThreshold = isPillar ? PILLAR_LINK_THRESHOLD : CLUSTER_LINK_THRESHOLD;
        const contentType = isPillar ? "pillar" : "cluster";

        if (wordCount < wordThreshold) {
          issues.push({ checkType: "low_word_count", severity: "error", pageSlug: slug, languageCode: "en", details: `${contentType} page "${item.title}" has ${wordCount} words (minimum: ${wordThreshold})` });
        }

        if (faqCount < faqThreshold) {
          issues.push({ checkType: "low_faq_count", severity: "warning", pageSlug: slug, languageCode: "en", details: `${contentType} page "${item.title}" has ${faqCount} FAQ/quiz blocks (minimum: ${faqThreshold})` });
        }

        if (linkCount < linkThreshold) {
          issues.push({ checkType: "low_link_count", severity: "warning", pageSlug: slug, languageCode: "en", details: `${contentType} page "${item.title}" has ${linkCount} links (minimum: ${linkThreshold})` });
        }

        const translatedLangs = translationMap.get(item.id);
        if (!translatedLangs || translatedLangs.size === 0) {
          issues.push({ checkType: "missing_hreflang", severity: "warning", pageSlug: slug, languageCode: null, details: `Page "${item.title}" has no translations — missing hreflang tags for alternate languages` });
        }

        if (!item.seo_keywords || (Array.isArray(item.seo_keywords) && item.seo_keywords.length === 0)) {
          issues.push({ checkType: "missing_seo_keywords", severity: "warning", pageSlug: slug, languageCode: "en", details: `Page "${item.title}" has no SEO keywords defined` });
        }
      }

      const allSlugs = new Set(publishedItems.map((i: any) => i.slug));
      for (const item of publishedItems) {
        if (!Array.isArray(item.content)) continue;
        let hasInternalLink = false;
        for (const block of item.content as any[]) {
          const text = typeof block.content === "string" ? block.content : "";
          for (const s of allSlugs) {
            if (s !== item.slug && text.includes(s)) {
              hasInternalLink = true;
              break;
            }
          }
          if (hasInternalLink) break;
        }
        if (!hasInternalLink) {
          issues.push({ checkType: "orphan_page", severity: "warning", pageSlug: item.slug, languageCode: null, details: `Page "${item.title}" appears to be an orphan page (no internal links from other content)` });
        }
      }

      let seoPageResult;
      try {
        seoPageResult = await pool.query(`SELECT slug, language_code FROM seo_pages`);
      } catch { seoPageResult = { rows: [] }; }
      const sitemapSlugs = new Set(seoPageResult.rows.map((r: any) => r.slug));
      for (const item of publishedItems) {
        if (!sitemapSlugs.has(item.slug)) {
          issues.push({ checkType: "missing_from_sitemap", severity: "error", pageSlug: item.slug, languageCode: "en", details: `Published page "${item.title}" is not included in the sitemap/SEO pages table` });
        }
      }

      await pool.query(`UPDATE seo_health_checks SET resolved = true WHERE resolved = false`);

      for (const issue of issues) {
        await pool.query(
          `INSERT INTO seo_health_checks (id, check_type, severity, page_slug, language_code, details, resolved, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, false, NOW())`,
          [issue.checkType, issue.severity, issue.pageSlug, issue.languageCode, issue.details]
        );
      }

      await logAudit(req, admin, "seo", null, "health-check-run", null, { issueCount: issues.length });

      const errorCount = issues.filter(i => i.severity === "error").length;
      const warningCount = issues.filter(i => i.severity === "warning").length;

      res.json({
        totalIssues: issues.length,
        errors: errorCount,
        warnings: warningCount,
        issues,
        pagesScanned: publishedItems.length,
        timestamp: new Date().toISOString(),
      });
    } catch (e: any) {
      console.error("SEO health check error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/seo-health-issues", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const resolved = req.query.resolved === "true";
      const checkType = req.query.checkType as string | undefined;
      const severity = req.query.severity as string | undefined;

      let query = `SELECT * FROM seo_health_checks WHERE resolved = $1`;
      const params: any[] = [resolved];
      let paramIdx = 2;

      if (checkType) {
        query += ` AND check_type = $${paramIdx}`;
        params.push(checkType);
        paramIdx++;
      }

      if (severity) {
        query += ` AND severity = $${paramIdx}`;
        params.push(severity);
        paramIdx++;
      }

      query += ` ORDER BY created_at DESC LIMIT 500`;

      const result = await pool.query(query, params);
      const issues = result.rows.map(snakeToCamel);

      res.json({ issues, total: issues.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --------------------
  // Language ROI Scoring Engine + 6-Month Roadmap (T003)
  // --------------------

  app.get("/api/admin/language-priority", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await pool.query(
        `SELECT * FROM language_priority ORDER BY roi_score DESC`
      );

      if (result.rows.length === 0) {
        await seedLanguagePriority();
        const seeded = await pool.query(
          `SELECT * FROM language_priority ORDER BY roi_score DESC`
        );
        return res.json(seeded.rows.map(snakeToCamel));
      }

      res.json(result.rows.map(snakeToCamel));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/language-priority", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { id, nursingPopulation, immigrationPatterns, searchDemand, competitionStrength, monetizationPotential, productionDifficulty, tier, rolloutMonth } = req.body;
      if (!id) return res.status(400).json({ error: "ID is required" });

      const np = Number(nursingPopulation) || 3;
      const ip = Number(immigrationPatterns) || 3;
      const sd = Number(searchDemand) || 3;
      const cs = Number(competitionStrength) || 3;
      const mp = Number(monetizationPotential) || 3;
      const pd = Number(productionDifficulty) || 3;

      const roiScore = computeLanguageRoiScore(np, ip, sd, cs, mp, pd);

      const result = await pool.query(
        `UPDATE language_priority
         SET nursing_population = $1, immigration_patterns = $2, search_demand = $3,
             competition_strength = $4, monetization_potential = $5, production_difficulty = $6,
             roi_score = $7, tier = $8, rollout_month = $9, updated_at = NOW()
         WHERE id = $10 RETURNING *`,
        [np, ip, sd, cs, mp, pd, roiScore, tier || "tier_3", rolloutMonth || null, id]
      );

      if (result.rows.length === 0) return res.status(404).json({ error: "Language not found" });

      await logAudit(req, admin, "language_priority", id, "update", null, { roiScore, tier });
      res.json(snakeToCamel(result.rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/seo-roadmap", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const langResult = await pool.query(
        `SELECT * FROM language_priority ORDER BY roi_score DESC`
      );

      if (langResult.rows.length === 0) {
        await seedLanguagePriority();
        const seeded = await pool.query(
          `SELECT * FROM language_priority ORDER BY roi_score DESC`
        );
        langResult.rows = seeded.rows;
      }

      const languages = langResult.rows.map(snakeToCamel);

      const contentDepthRules = {
        pillar: { minWordCount: 2500, minFaqCount: 12, minInternalLinks: 10 },
        cluster: { minWordCount: 1200, minFaqCount: 6, minInternalLinks: 6 },
      };

      const roadmap = generateSixMonthRoadmap(languages);

      res.json({
        roadmap,
        contentDepthRules,
        languages,
        generatedAt: new Date().toISOString(),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ─── Digital Marketplace Routes ───────────────────────────────

  app.get("/api/shop/products", async (_req, res) => {
    try {
      const products = await storage.listDigitalProducts(true);
      res.json(products);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/shop/products/:slug", async (req, res) => {
    try {
      const product = await storage.getDigitalProductBySlug(req.params.slug);
      if (!product || !product.isActive) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/shop/checkout", async (req, res) => {
    try {
      const { productId, userId, couponCode } = req.body;
      if (!productId || !userId) return res.status(400).json({ error: "Missing productId or userId" });

      const product = await storage.getDigitalProduct(productId);
      if (!product || !product.isActive) return res.status(404).json({ error: "Product not found" });

      let finalPrice = product.price;
      if (couponCode) {
        const coupon = await storage.validateCoupon(couponCode);
        if (coupon.valid && coupon.discountType && coupon.discountValue) {
          if (coupon.discountType === "percent") {
            finalPrice = Math.round(product.price * (1 - coupon.discountValue / 100));
          } else {
            finalPrice = Math.max(0, product.price - coupon.discountValue);
          }
        }
      }

      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: product.shortDescription || product.description?.substring(0, 200),
            },
            unit_amount: finalPrice,
          },
          quantity: 1,
        }],
        success_url: `${req.headers.origin || "https://www.nursenest.ca"}/shop/${product.slug}?purchased=true`,
        cancel_url: `${req.headers.origin || "https://www.nursenest.ca"}/shop/${product.slug}`,
        metadata: {
          productId: product.id,
          userId,
          couponCode: couponCode || "",
          type: "digital_product",
        },
      });

      res.json({ url: session.url, sessionId: session.id });
    } catch (e: any) {
      console.error("Shop checkout error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/shop/fulfill", async (req, res) => {
    try {
      const { sessionId } = req.body;
      if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") return res.status(400).json({ error: "Payment not completed" });

      const { productId, userId, couponCode } = session.metadata || {};
      if (!productId || !userId) return res.status(400).json({ error: "Invalid session metadata" });

      const existing = await pool.query(`SELECT id FROM product_purchases WHERE stripe_session_id = $1`, [sessionId]);
      if (existing.rows.length > 0) return res.json({ purchase: existing.rows[0] });

      const purchase = await storage.createProductPurchase({
        userId,
        productId,
        stripeSessionId: sessionId,
        downloadCount: 0,
        maxDownloads: 5,
      });

      if (couponCode) await storage.useCoupon(couponCode);
      res.json({ purchase });
    } catch (e: any) {
      console.error("Shop fulfill error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/shop/my-purchases", async (req, res) => {
    try {
      const userId = String(req.query.userId || "");
      if (!userId) return res.status(400).json({ error: "Missing userId" });
      const purchases = await storage.getUserPurchases(userId);
      res.json(purchases);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/shop/download/:purchaseId", async (req, res) => {
    try {
      const userId = String(req.query.userId || "");
      const purchase = await storage.getPurchase(req.params.purchaseId);
      if (!purchase) return res.status(404).json({ error: "Purchase not found" });
      if (purchase.userId !== userId) return res.status(403).json({ error: "Unauthorized" });
      if ((purchase.downloadCount || 0) >= (purchase.maxDownloads || 5)) {
        return res.status(403).json({ error: "Download limit reached" });
      }

      const product = await storage.getDigitalProduct(purchase.productId);
      if (!product || !product.fileUrl) return res.status(404).json({ error: "File not available" });

      await storage.incrementDownloadCount(purchase.id);
      res.json({ downloadUrl: product.fileUrl, downloadsRemaining: (purchase.maxDownloads || 5) - (purchase.downloadCount || 0) - 1 });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/shop/validate-coupon", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) return res.status(400).json({ valid: false });
      const result = await storage.validateCoupon(code);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Admin marketplace routes
  app.get("/api/admin/shop/products", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const products = await storage.listDigitalProducts(false);
      res.json(products);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/shop/products", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { title, slug, description, shortDescription, price, compareAtPrice, fileUrl, coverImageUrl, category, tierTarget, examTarget, featured } = req.body;
      if (!title || !slug || !description || !price || !category) {
        return res.status(400).json({ error: "Missing required fields: title, slug, description, price, category" });
      }
      const product = await storage.createDigitalProduct({
        title, slug, description, shortDescription: shortDescription || null, price: parseInt(price),
        compareAtPrice: compareAtPrice ? parseInt(compareAtPrice) : null,
        fileUrl: fileUrl || null, coverImageUrl: coverImageUrl || null,
        category, tierTarget: tierTarget || "all", examTarget: examTarget || null,
        featured: featured || false, isActive: true,
      });
      await logAudit(req, admin, "digital_product", product.id, "create", null, product);
      res.json(product);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/shop/products/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const existing = await storage.getDigitalProduct(req.params.id);
      if (!existing) return res.status(404).json({ error: "Product not found" });
      const updates: any = {};
      for (const key of ["title", "slug", "description", "shortDescription", "fileUrl", "coverImageUrl", "category", "tierTarget", "examTarget"]) {
        if (req.body[key] !== undefined) updates[key] = req.body[key];
      }
      if (req.body.price !== undefined) updates.price = parseInt(req.body.price);
      if (req.body.compareAtPrice !== undefined) updates.compareAtPrice = req.body.compareAtPrice ? parseInt(req.body.compareAtPrice) : null;
      if (req.body.featured !== undefined) updates.featured = req.body.featured;
      if (req.body.isActive !== undefined) updates.isActive = req.body.isActive;
      const updated = await storage.updateDigitalProduct(req.params.id, updates);
      await logAudit(req, admin, "digital_product", req.params.id, "update", existing, updated);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/shop/products/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const existing = await storage.getDigitalProduct(req.params.id);
      if (!existing) return res.status(404).json({ error: "Product not found" });
      await storage.deleteDigitalProduct(req.params.id);
      await logAudit(req, admin, "digital_product", req.params.id, "delete", existing, null);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/shop/products/:id/price", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const existing = await storage.getDigitalProduct(req.params.id);
      if (!existing) return res.status(404).json({ error: "Product not found" });
      const { priceDollars, compareAtDollars } = req.body;
      if (priceDollars === undefined) return res.status(400).json({ error: "priceDollars is required" });
      const priceCents = Math.round(parseFloat(priceDollars) * 100);
      const compareAtCents = compareAtDollars ? Math.round(parseFloat(compareAtDollars) * 100) : null;
      const updated = await storage.updateDigitalProduct(req.params.id, { price: priceCents, compareAtPrice: compareAtCents });
      await logAudit(req, admin, "digital_product", req.params.id, "price-change", { price: existing.price }, { price: priceCents });
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/shop/products/:id/download", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const product = await storage.getDigitalProduct(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      if (!product.fileUrl) return res.status(404).json({ error: "No file attached to this product" });
      res.setHeader("Content-Disposition", `attachment; filename="${product.slug || "product"}.pdf"`);
      res.setHeader("Content-Type", "application/pdf");
      const { default: fetch } = await import("node-fetch");
      const fileRes = await fetch(product.fileUrl);
      if (!fileRes.ok) return res.status(502).json({ error: "Failed to fetch file" });
      const buffer = await fileRes.buffer();
      res.send(buffer);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/shop/products/:id/generate-preview", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const product = await storage.getDigitalProduct(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      if (!product.fileUrl) return res.status(400).json({ error: "No full PDF attached to this product" });

      const pageCount = Math.max(1, Math.min(10, Number(req.body?.pageCount ?? 3)));

      const { default: nodeFetch } = await import("node-fetch");
      const fileRes = await nodeFetch(product.fileUrl);
      if (!fileRes.ok) return res.status(502).json({ error: "Failed to fetch source PDF" });
      const fullPdfBytes = new Uint8Array(await fileRes.arrayBuffer());

      const { PDFDocument, StandardFonts, rgb, degrees } = await import("pdf-lib");
      const src = await PDFDocument.load(fullPdfBytes);
      const dst = await PDFDocument.create();
      const font = await dst.embedFont(StandardFonts.HelveticaBold);
      const pagesToCopy = Math.min(pageCount, src.getPageCount());
      const copied = await dst.copyPages(src, [...Array(pagesToCopy)].map((_, i) => i));
      const watermarkText = "NURSENEST PREVIEW \u2022 DO NOT DISTRIBUTE";

      for (const page of copied) {
        dst.addPage(page);
        const { width, height } = page.getSize();
        const fontSize = Math.max(28, Math.min(56, Math.floor(width / 18)));
        page.drawText(watermarkText, {
          x: width * 0.08,
          y: height * 0.45,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
          rotate: degrees(-32),
          opacity: 0.14,
        });
        page.drawText(watermarkText, {
          x: width * 0.08,
          y: height * 0.25,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
          rotate: degrees(-32),
          opacity: 0.10,
        });
      }

      const previewBytes = await dst.save();

      const privateDir = process.env.PRIVATE_OBJECT_DIR || "";
      if (!privateDir) return res.status(500).json({ error: "Object storage not configured" });

      const previewKey = `${privateDir}/previews/preview-${req.params.id}-${pagesToCopy}.pdf`;
      const { bucketName: pvBucket, objectName: pvObject } = parseStoragePath(previewKey);

      const { objectStorageClient } = await import("./replit_integrations/object_storage/objectStorage");
      const bucket = objectStorageClient.bucket(pvBucket);
      const file = bucket.file(pvObject);
      await file.save(Buffer.from(previewBytes), { contentType: "application/pdf" });

      await storage.updateDigitalProduct(req.params.id, {
        previewUrl: previewKey,
        previewPageCount: pagesToCopy,
      });

      await logAudit(req, admin, "digital_product", req.params.id, "generate-preview", null, { pageCount: pagesToCopy });
      res.json({ ok: true, pageCount: pagesToCopy, totalSourcePages: src.getPageCount() });
    } catch (e: any) {
      console.error("Preview generation error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/products/:slug/preview", async (req, res) => {
    try {
      const product = await storage.getDigitalProductBySlug(req.params.slug);
      if (!product || !product.isActive) return res.status(404).json({ error: "Product not found" });
      if (!product.previewUrl) return res.status(404).json({ error: "No preview available" });

      const { bucketName: pvBucket, objectName: pvObject } = parseStoragePath(product.previewUrl);
      const { objectStorageClient } = await import("./replit_integrations/object_storage/objectStorage");
      const bucket = objectStorageClient.bucket(pvBucket);
      const file = bucket.file(pvObject);
      const [exists] = await file.exists();
      if (!exists) return res.status(404).json({ error: "Preview file not found" });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");
      res.setHeader("Cache-Control", "public, max-age=3600");
      const stream = file.createReadStream();
      stream.on("error", (err) => {
        console.error("Preview stream error:", err);
        if (!res.headersSent) res.status(500).json({ error: "Error streaming preview" });
      });
      stream.pipe(res);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/brand-logos", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { imageData, fileName } = req.body;
      if (!imageData) return res.status(400).json({ error: "imageData (base64) required" });

      const matches = imageData.match(/^data:image\/(png|jpeg|jpg|svg\+xml|webp);base64,(.+)$/);
      if (!matches) return res.status(400).json({ error: "Invalid image data format" });

      const mimeType = `image/${matches[1]}`;
      const buffer = Buffer.from(matches[2], "base64");

      const objectStorageService = new (await import("./replit_integrations/object_storage/objectStorage")).ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": mimeType },
        body: buffer,
      });
      if (!uploadRes.ok) throw new Error("Failed to upload logo to storage");

      const objectPath = objectStorageService.normalizeObjectEntityPath(uploadURL);
      const safeName = (fileName || `logo-${Date.now()}`).replace(/[^a-zA-Z0-9._-]/g, "_");

      await logAudit(req, admin, "brand", null, "upload-logo", null, { fileName: safeName });
      res.json({ url: objectPath, fileName: safeName });
    } catch (e: any) {
      console.error("Logo upload error:", e);
      res.status(500).json({ error: e.message || "Logo upload failed" });
    }
  });

  app.post("/api/admin/images/generate", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const aiCheck = checkAiLimits({ role: "admin" });
      if (!aiCheck.allowed) return res.status(429).json({ error: aiCheck.reason, code: aiCheck.code });

      const { prompt, negativePrompt, size, n, textFree } = req.body;
      if (!prompt) return res.status(400).json({ error: "Prompt is required" });

      let finalPrompt = prompt;
      if (textFree) {
        finalPrompt += ". The image must not contain any text, letters, words, numbers, watermarks, labels, or typography.";
      }

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const validSizes = ["1024x1024", "1024x1792", "1792x1024"] as const;
      const resolvedSize = validSizes.includes(size) ? size : "1024x1024";
      const count = Math.min(Math.max(parseInt(n) || 1, 1), 4);

      const assets: { id: string; url: string }[] = [];
      for (let i = 0; i < count; i++) {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: finalPrompt,
          n: 1,
          size: resolvedSize,
          quality: "standard",
        });
        const imageUrl = response.data?.[0]?.url;
        if (imageUrl) {
          assets.push({ id: `img-${Date.now()}-${i}`, url: imageUrl });
        }
      }

      recordAiUsage(count, 0);
      await logAudit(req, admin, "ai", null, "image-generate", null, { prompt: prompt.substring(0, 200), count, textFree });
      res.json({ assets });
    } catch (e: any) {
      console.error("Image generate error:", e);
      res.status(500).json({ error: e.message || "Image generation failed" });
    }
  });

  app.get("/api/admin/shop/sales", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const sales = await storage.getProductSales();
      res.json(sales);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Admin coupon management
  app.get("/api/admin/shop/coupons", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const coupons = await pool.query(`SELECT * FROM coupon_codes ORDER BY created_at DESC`);
      res.json(coupons.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/shop/coupons", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { code, discountType, discountValue, expiresAt, usageLimit } = req.body;
      if (!code || !discountType || !discountValue) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const result = await pool.query(
        `INSERT INTO coupon_codes (id, code, discount_type, discount_value, expires_at, usage_limit, is_active)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, true) RETURNING *`,
        [code.toUpperCase(), discountType, parseInt(discountValue), expiresAt || null, usageLimit ? parseInt(usageLimit) : null]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  return httpServer;
}

function computeLanguageRoiScore(
  nursingPopulation: number,
  immigrationPatterns: number,
  searchDemand: number,
  competitionStrength: number,
  monetizationPotential: number,
  productionDifficulty: number
): number {
  const weights = {
    nursingPopulation: 0.25,
    immigrationPatterns: 0.15,
    searchDemand: 0.20,
    competitionStrength: 0.10,
    monetizationPotential: 0.20,
    productionDifficulty: 0.10,
  };

  const competitionInverted = 6 - competitionStrength;
  const difficultyInverted = 6 - productionDifficulty;

  const score =
    nursingPopulation * weights.nursingPopulation +
    immigrationPatterns * weights.immigrationPatterns +
    searchDemand * weights.searchDemand +
    competitionInverted * weights.competitionStrength +
    monetizationPotential * weights.monetizationPotential +
    difficultyInverted * weights.productionDifficulty;

  return Math.round(score * 100) / 100;
}

function generateSixMonthRoadmap(languages: any[]): any[] {
  const sorted = [...languages].sort((a, b) => (b.roiScore || 0) - (a.roiScore || 0));
  const roadmap: any[] = [];

  const monthNames = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];

  const tier1 = sorted.filter(l => l.tier === "tier_1" || (l.roiScore || 0) >= 4.0);
  const tier2 = sorted.filter(l => l.tier === "tier_2" || ((l.roiScore || 0) >= 3.0 && (l.roiScore || 0) < 4.0 && !tier1.includes(l)));
  const tier3 = sorted.filter(l => !tier1.includes(l) && !tier2.includes(l));

  roadmap.push({
    month: 1,
    label: monthNames[0],
    phase: "Foundation",
    tasks: [
      "Set up translation infrastructure and workflows",
      "Begin pillar content creation for Tier 1 languages",
      ...tier1.slice(0, 3).map(l => `Start ${l.languageName}: Core navigation + 5 pillar pages`),
    ],
    languages: tier1.slice(0, 3).map(l => l.languageCode),
    contentTargets: { pillarPages: 5, clusterPages: 0 },
  });

  roadmap.push({
    month: 2,
    label: monthNames[1],
    phase: "Tier 1 Expansion",
    tasks: [
      "Complete Tier 1 pillar content",
      "Begin cluster content for Tier 1 languages",
      ...tier1.slice(0, 3).map(l => `${l.languageName}: 10 cluster pages + FAQ sections`),
    ],
    languages: tier1.slice(0, 3).map(l => l.languageCode),
    contentTargets: { pillarPages: 5, clusterPages: 10 },
  });

  roadmap.push({
    month: 3,
    label: monthNames[2],
    phase: "Tier 2 Launch",
    tasks: [
      "Launch remaining Tier 1 languages if any",
      "Begin Tier 2 language pillar content",
      ...tier1.slice(3).map(l => `${l.languageName}: Core navigation + 5 pillar pages`),
      ...tier2.slice(0, 3).map(l => `Start ${l.languageName}: Core navigation + 3 pillar pages`),
    ],
    languages: [...tier1.slice(3), ...tier2.slice(0, 3)].map(l => l.languageCode),
    contentTargets: { pillarPages: 8, clusterPages: 15 },
  });

  roadmap.push({
    month: 4,
    label: monthNames[3],
    phase: "Tier 2 Expansion",
    tasks: [
      "Expand Tier 2 cluster content",
      "SEO optimization for all launched languages",
      ...tier2.slice(0, 3).map(l => `${l.languageName}: 8 cluster pages + internal linking`),
    ],
    languages: tier2.slice(0, 3).map(l => l.languageCode),
    contentTargets: { pillarPages: 3, clusterPages: 20 },
  });

  roadmap.push({
    month: 5,
    label: monthNames[4],
    phase: "Tier 3 Launch + Optimization",
    tasks: [
      "Begin Tier 3 language content",
      "Performance review and ROI recalculation for Tier 1 & 2",
      ...tier2.slice(3).map(l => `${l.languageName}: 3 pillar pages`),
      ...tier3.slice(0, 4).map(l => `Start ${l.languageName}: Core navigation + 2 pillar pages`),
    ],
    languages: [...tier2.slice(3), ...tier3.slice(0, 4)].map(l => l.languageCode),
    contentTargets: { pillarPages: 6, clusterPages: 10 },
  });

  roadmap.push({
    month: 6,
    label: monthNames[5],
    phase: "Full Coverage + Review",
    tasks: [
      "Complete remaining Tier 3 languages",
      "Content audit across all languages",
      "Enforce content depth rules (pillar: 2500w/12FAQ/10links, cluster: 1200w/6FAQ/6links)",
      ...tier3.slice(4).map(l => `Start ${l.languageName}: Core navigation + 2 pillar pages`),
      "Generate comprehensive coverage report",
    ],
    languages: tier3.slice(4).map(l => l.languageCode),
    contentTargets: { pillarPages: 4, clusterPages: 8 },
  });

  return roadmap;
}

async function seedLanguagePriority() {
  const languages = [
    { code: "fr", name: "French", np: 5, ip: 5, sd: 5, cs: 3, mp: 5, pd: 2, tier: "tier_1", month: 1 },
    { code: "tl", name: "Tagalog (Filipino)", np: 5, ip: 5, sd: 4, cs: 1, mp: 4, pd: 2, tier: "tier_1", month: 1 },
    { code: "hi", name: "Hindi", np: 5, ip: 4, sd: 4, cs: 2, mp: 4, pd: 3, tier: "tier_1", month: 1 },
    { code: "es", name: "Spanish", np: 4, ip: 4, sd: 5, cs: 4, mp: 5, pd: 2, tier: "tier_1", month: 2 },
    { code: "zh", name: "Chinese (Simplified)", np: 4, ip: 4, sd: 4, cs: 3, mp: 4, pd: 4, tier: "tier_1", month: 2 },
    { code: "ar", name: "Arabic", np: 4, ip: 4, sd: 3, cs: 2, mp: 3, pd: 4, tier: "tier_2", month: 3 },
    { code: "pt", name: "Portuguese", np: 3, ip: 3, sd: 4, cs: 2, mp: 4, pd: 2, tier: "tier_2", month: 3 },
    { code: "ko", name: "Korean", np: 3, ip: 3, sd: 3, cs: 2, mp: 4, pd: 3, tier: "tier_2", month: 3 },
    { code: "pa", name: "Punjabi", np: 3, ip: 4, sd: 3, cs: 1, mp: 3, pd: 3, tier: "tier_2", month: 4 },
    { code: "vi", name: "Vietnamese", np: 3, ip: 3, sd: 3, cs: 1, mp: 3, pd: 3, tier: "tier_2", month: 4 },
    { code: "ja", name: "Japanese", np: 3, ip: 2, sd: 3, cs: 3, mp: 4, pd: 4, tier: "tier_3", month: 5 },
    { code: "de", name: "German", np: 3, ip: 2, sd: 3, cs: 3, mp: 3, pd: 2, tier: "tier_3", month: 5 },
    { code: "ha", name: "Haitian Creole", np: 2, ip: 3, sd: 2, cs: 1, mp: 2, pd: 3, tier: "tier_3", month: 5 },
    { code: "ur", name: "Urdu", np: 3, ip: 3, sd: 2, cs: 1, mp: 2, pd: 3, tier: "tier_3", month: 6 },
    { code: "sw", name: "Swahili", np: 2, ip: 2, sd: 2, cs: 1, mp: 2, pd: 3, tier: "tier_3", month: 6 },
  ];

  for (const lang of languages) {
    const roiScore = computeLanguageRoiScore(lang.np, lang.ip, lang.sd, lang.cs, lang.mp, lang.pd);
    await pool.query(
      `INSERT INTO language_priority (id, language_code, language_name, nursing_population, immigration_patterns, search_demand, competition_strength, monetization_potential, production_difficulty, roi_score, tier, rollout_month, updated_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
       ON CONFLICT (language_code) DO NOTHING`,
      [lang.code, lang.name, lang.np, lang.ip, lang.sd, lang.cs, lang.mp, lang.pd, roiScore, lang.tier, lang.month]
    );
  }
}

async function seedExamBlueprints() {
  const existing = await pool.query(`SELECT exam_code FROM exam_blueprints`);
  const existingCodes = new Set(existing.rows.map((r: any) => r.exam_code));

  const blueprints = [
    {
      examCode: "NCLEX-RN",
      examName: "NCLEX-RN (Next Generation)",
      tier: "rn",
      region: "US",
      totalQuestions: 145,
      passingStandard: "CAT-based logit above passing standard",
      timeLimit: 300,
      domains: [
        { name: "Management of Care", weight: 0.19, questionRange: [15, 21] },
        { name: "Safety and Infection Control", weight: 0.12, questionRange: [10, 14] },
        { name: "Health Promotion and Maintenance", weight: 0.09, questionRange: [7, 11] },
        { name: "Psychosocial Integrity", weight: 0.09, questionRange: [7, 11] },
        { name: "Basic Care and Comfort", weight: 0.09, questionRange: [7, 11] },
        { name: "Pharmacological Therapies", weight: 0.15, questionRange: [12, 18] },
        { name: "Reduction of Risk Potential", weight: 0.12, questionRange: [10, 14] },
        { name: "Physiological Adaptation", weight: 0.14, questionRange: [11, 17] },
      ],
      questionTypeWeights: { sata: 0.25, "bow-tie": 0.10, "drag-drop": 0.10, "cloze": 0.10, "highlight-text": 0.10, mcq: 0.35 },
      catEnabled: true,
      catMinQuestions: 85,
      catMaxQuestions: 150,
    },
    {
      examCode: "NCLEX-PN",
      examName: "NCLEX-PN (Next Generation)",
      tier: "rpn",
      region: "US",
      totalQuestions: 135,
      passingStandard: "CAT-based logit above passing standard",
      timeLimit: 300,
      domains: [
        { name: "Safe and Effective Care Environment", weight: 0.23, questionRange: [19, 25] },
        { name: "Health Promotion and Maintenance", weight: 0.12, questionRange: [10, 14] },
        { name: "Psychosocial Integrity", weight: 0.11, questionRange: [9, 13] },
        { name: "Physiological Integrity", weight: 0.54, questionRange: [44, 58] },
      ],
      questionTypeWeights: { sata: 0.20, "drag-drop": 0.10, "cloze": 0.08, mcq: 0.52, "highlight-text": 0.10 },
      catEnabled: true,
      catMinQuestions: 85,
      catMaxQuestions: 150,
    },
    {
      examCode: "REX-PN",
      examName: "REx-PN (Regulatory Exam - Practical Nurse)",
      tier: "rpn",
      region: "CA",
      totalQuestions: 170,
      passingStandard: "CAT-based competency threshold",
      timeLimit: 300,
      domains: [
        { name: "Professional Practice", weight: 0.16, questionRange: [22, 30] },
        { name: "Ethical Practice", weight: 0.10, questionRange: [14, 20] },
        { name: "Legal Practice", weight: 0.08, questionRange: [11, 16] },
        { name: "Foundations of Practice", weight: 0.36, questionRange: [49, 66] },
        { name: "Collaborative Practice", weight: 0.30, questionRange: [41, 55] },
      ],
      questionTypeWeights: { sata: 0.15, mcq: 0.55, "drag-drop": 0.10, "cloze": 0.10, "highlight-text": 0.10 },
      catEnabled: true,
      catMinQuestions: 90,
      catMaxQuestions: 170,
    },
    {
      examCode: "CNPLE",
      examName: "CNPLE (Canadian Nurse Practitioner Licensure Exam)",
      tier: "np",
      region: "CA",
      totalQuestions: 170,
      passingStandard: "Criterion-referenced pass mark",
      timeLimit: 240,
      domains: [
        { name: "Health Assessment", weight: 0.25, questionRange: [38, 48] },
        { name: "Diagnosis", weight: 0.20, questionRange: [30, 38] },
        { name: "Therapeutics", weight: 0.25, questionRange: [38, 48] },
        { name: "Health Promotion & Disease Prevention", weight: 0.15, questionRange: [23, 28] },
        { name: "Professional Role & Responsibility", weight: 0.15, questionRange: [23, 28] },
      ],
      questionTypeWeights: { mcq: 0.65, sata: 0.15, "drag-drop": 0.10, "cloze": 0.10 },
      catEnabled: false,
      catMinQuestions: null,
      catMaxQuestions: null,
    },
    {
      examCode: "AANP-FNP",
      examName: "AANP Family Nurse Practitioner Certification",
      tier: "np",
      region: "US",
      totalQuestions: 150,
      passingStandard: "Scaled score of 500+",
      timeLimit: 180,
      domains: [
        { name: "Assessment", weight: 0.26, questionRange: [35, 43] },
        { name: "Diagnosis", weight: 0.26, questionRange: [35, 43] },
        { name: "Planning", weight: 0.22, questionRange: [29, 37] },
        { name: "Evaluation", weight: 0.16, questionRange: [20, 28] },
        { name: "Professional Role", weight: 0.10, questionRange: [13, 18] },
      ],
      questionTypeWeights: { mcq: 0.85, sata: 0.10, "drag-drop": 0.05 },
      catEnabled: false,
      catMinQuestions: null,
      catMaxQuestions: null,
    },
    {
      examCode: "ANCC-FNP",
      examName: "ANCC Family Nurse Practitioner Board Certification",
      tier: "np",
      region: "US",
      totalQuestions: 175,
      passingStandard: "Criterion-referenced scaled score",
      timeLimit: 210,
      domains: [
        { name: "Foundations of Advanced Practice", weight: 0.15, questionRange: [23, 30] },
        { name: "Professional Practice", weight: 0.15, questionRange: [23, 30] },
        { name: "Independent Practice Assessment", weight: 0.25, questionRange: [38, 48] },
        { name: "Independent Practice Diagnosis", weight: 0.20, questionRange: [30, 40] },
        { name: "Independent Practice Planning & Treatment", weight: 0.25, questionRange: [38, 48] },
      ],
      questionTypeWeights: { mcq: 0.80, sata: 0.12, "drag-drop": 0.08 },
      catEnabled: false,
      catMinQuestions: null,
      catMaxQuestions: null,
    },
  ];

  for (const bp of blueprints) {
    if (existingCodes.has(bp.examCode)) continue;
    await pool.query(
      `INSERT INTO exam_blueprints (id, exam_code, exam_name, tier, region, total_questions, passing_standard, time_limit, domains, question_type_weights, cat_enabled, cat_min_questions, cat_max_questions, active, updated_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true, NOW())`,
      [bp.examCode, bp.examName, bp.tier, bp.region, bp.totalQuestions, bp.passingStandard, bp.timeLimit,
       JSON.stringify(bp.domains), JSON.stringify(bp.questionTypeWeights), bp.catEnabled, bp.catMinQuestions, bp.catMaxQuestions]
    );
  }
}

function calculatePassProbability(readinessScore: number, totalQuestions: number, trend: number, mockAvg: number, opts?: {
  tier?: string;
  weaknessIndex?: number;
  consistencyIndex?: number;
  timeManagementIndex?: number;
  strictMockCount?: number;
  tutorModeRatio?: number;
  lowDifficultyRatio?: number;
  repeatQuestionRatio?: number;
  domainAccuracies?: Record<string, number>;
  domainWeights?: Record<string, number>;
}) {
  const tier = opts?.tier || "rn";
  const targetVolume = tier === "rn" ? 2000 : tier === "np" ? 1800 : 1500;

  let R = Math.min(1, Math.max(0, readinessScore / 100));
  if ((opts?.lowDifficultyRatio ?? 0) > 0.7) {
    R *= 0.90;
  }

  let M = mockAvg > 0 ? Math.min(1, mockAvg / 100) : 0;
  if ((opts?.tutorModeRatio ?? 0) > 0.5) {
    M *= 0.8 + 0.2 * (1 - (opts?.tutorModeRatio ?? 0));
  }
  const mockCap = Math.min(1, (opts?.strictMockCount ?? 0) / 5);
  M = M * (0.7 + 0.3 * mockCap);

  const V = Math.min(1, Math.log(Math.max(1, totalQuestions)) / Math.log(targetVolume));

  let S = 0.5;
  if (trend !== 0) {
    S = Math.min(1, Math.max(0, 0.5 + trend / 20));
  }

  const Cns = 1 - Math.min(1, opts?.consistencyIndex ?? 0.3);
  const T = 1 - Math.min(1, opts?.timeManagementIndex ?? 0.3);

  let W = 0;
  if (opts?.domainAccuracies && opts?.domainWeights) {
    const domainWeaknesses: number[] = [];
    for (const [domain, acc] of Object.entries(opts.domainAccuracies)) {
      const weight = opts.domainWeights[domain] ?? 0.1;
      const exposure = 1;
      domainWeaknesses.push((1 - Math.min(1, acc / 100)) * weight * exposure);
    }
    domainWeaknesses.sort((a, b) => b - a);
    const top3 = domainWeaknesses.slice(0, 3);
    W = top3.length > 0 ? top3.reduce((s, v) => s + v, 0) / top3.length : 0;
  } else {
    W = opts?.weaknessIndex ?? 0;
  }

  if ((opts?.repeatQuestionRatio ?? 0) > 0.3) {
    R *= 0.85 + 0.15 * (1 - (opts?.repeatQuestionRatio ?? 0));
  }

  let C_raw = 0.35 * R + 0.20 * M + 0.10 * V + 0.10 * S + 0.05 * Cns + 0.05 * T - 0.15 * W;
  C_raw = Math.max(0, Math.min(1, C_raw));

  const theta = 0.65;
  const k = 9;
  const P_raw = 1 / (1 + Math.exp(-k * (C_raw - theta)));
  const probability = Math.round(Math.min(99, Math.max(1, P_raw * 100)));

  let band = 10;
  if (totalQuestions >= 1500 && (opts?.strictMockCount ?? 0) >= 3) {
    band = 4;
  } else if (totalQuestions >= 500) {
    band = 7;
  }
  if (Cns < 0.5) band += 2;

  const lowerBound = Math.max(0, probability - band);
  const upperBound = Math.min(100, probability + band);

  let riskCategory = "Likely Ready";
  if (probability < 60) riskCategory = "High Risk";
  else if (probability < 75) riskCategory = "Moderate Risk";

  return {
    probability,
    confidenceBand: band,
    lowerBound,
    upperBound,
    riskCategory,
    composite: Math.round(C_raw * 100) / 100,
    components: {
      readiness: Math.round(R * 100) / 100,
      mockExam: Math.round(M * 100) / 100,
      volume: Math.round(V * 100) / 100,
      trend: Math.round(S * 100) / 100,
      consistency: Math.round(Cns * 100) / 100,
      timeManagement: Math.round(T * 100) / 100,
      weakness: Math.round(W * 100) / 100,
    },
  };
}

function simulateImprovement(current: ReturnType<typeof calculatePassProbability>, opts: {
  domainImprovements?: Record<string, number>;
  additionalMocks?: number;
  additionalQuestions?: number;
  tier?: string;
  readinessScore: number;
  totalQuestions: number;
  trend: number;
  mockAvg: number;
  strictMockCount?: number;
  domainAccuracies?: Record<string, number>;
  domainWeights?: Record<string, number>;
}) {
  const suggestions: string[] = [];
  const simulated: { action: string; projectedProbability: number }[] = [];

  if (opts.domainAccuracies && opts.domainWeights) {
    const weakDomains = Object.entries(opts.domainAccuracies)
      .map(([d, acc]) => ({ domain: d, accuracy: acc, weight: opts.domainWeights?.[d] ?? 0.1 }))
      .sort((a, b) => (a.accuracy * a.weight) - (b.accuracy * b.weight))
      .slice(0, 3);

    for (const wd of weakDomains) {
      const improved = { ...opts.domainAccuracies, [wd.domain]: Math.min(100, wd.accuracy + 10) };
      const proj = calculatePassProbability(opts.readinessScore, opts.totalQuestions, opts.trend, opts.mockAvg, {
        tier: opts.tier,
        strictMockCount: opts.strictMockCount,
        domainAccuracies: improved,
        domainWeights: opts.domainWeights,
      });
      const delta = proj.probability - current.probability;
      if (delta > 0) {
        suggestions.push(`Improve ${wd.domain} accuracy by 10% → +${delta}% probability`);
        simulated.push({ action: `${wd.domain} +10%`, projectedProbability: proj.probability });
      }
    }
  }

  if ((opts.strictMockCount ?? 0) < 5) {
    const proj = calculatePassProbability(opts.readinessScore, opts.totalQuestions, opts.trend, opts.mockAvg, {
      tier: opts.tier,
      strictMockCount: (opts.strictMockCount ?? 0) + 2,
      domainAccuracies: opts.domainAccuracies,
      domainWeights: opts.domainWeights,
    });
    const delta = proj.probability - current.probability;
    if (delta > 0) {
      suggestions.push(`Complete 2 strict CAT simulations → +${delta}% probability`);
      simulated.push({ action: "2 strict mocks", projectedProbability: proj.probability });
    }
  }

  {
    const proj = calculatePassProbability(opts.readinessScore, opts.totalQuestions + 200, opts.trend, opts.mockAvg, {
      tier: opts.tier,
      strictMockCount: opts.strictMockCount,
      domainAccuracies: opts.domainAccuracies,
      domainWeights: opts.domainWeights,
    });
    const delta = proj.probability - current.probability;
    if (delta > 0) {
      suggestions.push(`Complete 200 more mixed-difficulty questions → +${delta}% probability`);
      simulated.push({ action: "200 questions", projectedProbability: proj.probability });
    }
  }

  return { suggestions, simulated, targetProbability: 85, currentProbability: current.probability };
}

function getDiagnosticQuestions() {
  return [
    { stem: "A client with heart failure reports increased shortness of breath when lying flat. Which position should the nurse prioritize?", options: ["Supine", "High-Fowler's", "Prone", "Left lateral"], correct: 1, bodySystem: "cardiovascular", difficulty: 2 },
    { stem: "Which lab value should the nurse monitor most closely for a client receiving furosemide (Lasix)?", options: ["Sodium", "Potassium", "Calcium", "Magnesium"], correct: 1, bodySystem: "pharmacology", difficulty: 2 },
    { stem: "A client with COPD is on 2L O2 via nasal cannula. The SpO2 reads 89%. What is the most appropriate nursing action?", options: ["Increase O2 to 6L", "Maintain current settings", "Notify the provider", "Place on non-rebreather"], correct: 1, bodySystem: "respiratory", difficulty: 3 },
    { stem: "Which assessment finding indicates a complication of a blood transfusion?", options: ["Temperature 37.2°C", "Back pain and chills", "Slight headache", "Mild itching at IV site"], correct: 1, bodySystem: "hematology", difficulty: 2 },
    { stem: "A client on heparin has an aPTT of 120 seconds (therapeutic range 60-80). What should the nurse do first?", options: ["Continue the infusion", "Stop the heparin infusion", "Administer protamine sulfate", "Increase the rate"], correct: 1, bodySystem: "pharmacology", difficulty: 3 },
    { stem: "Which finding in a newborn requires immediate intervention?", options: ["Acrocyanosis", "Respiratory rate of 70/min", "Milia on nose", "Caput succedaneum"], correct: 1, bodySystem: "maternity", difficulty: 3 },
    { stem: "A client with diabetes has a blood glucose of 45 mg/dL and is alert. What is the priority nursing action?", options: ["Administer insulin", "Give 4 oz orange juice", "Start an IV", "Obtain a stat glucose"], correct: 1, bodySystem: "endocrine", difficulty: 2 },
    { stem: "Which client should the nurse see first?", options: ["Post-op day 1 with pain 4/10", "Client with chest pain and diaphoresis", "Diabetic client with glucose of 180", "Post-fall client with bruised knee"], correct: 1, bodySystem: "fundamentals", difficulty: 4 },
    { stem: "A client with suspected stroke arrives at the ED. What is the priority assessment?", options: ["Blood pressure", "Time of symptom onset", "Medication history", "Family history"], correct: 1, bodySystem: "neurological", difficulty: 3 },
    { stem: "Which nursing intervention is appropriate for a client in seizure activity?", options: ["Insert a padded tongue blade", "Restrain the client", "Turn client to side", "Hold the jaw open"], correct: 2, bodySystem: "neurological", difficulty: 2 },
    { stem: "A client with pneumonia has a productive cough with green sputum. Which nursing action is most important?", options: ["Administer cough suppressant", "Encourage deep breathing and fluids", "Position supine", "Restrict oral intake"], correct: 1, bodySystem: "respiratory", difficulty: 2 },
    { stem: "Which assessment finding is most concerning in a client with preeclampsia?", options: ["Blood pressure 140/90", "Proteinuria +1", "Headache and visual changes", "Edema in ankles"], correct: 2, bodySystem: "maternity", difficulty: 3 },
    { stem: "A nurse is caring for a client with increased intracranial pressure. Which position is most appropriate?", options: ["Flat supine", "Head of bed elevated 30 degrees", "Trendelenburg", "Right lateral"], correct: 1, bodySystem: "neurological", difficulty: 2 },
    { stem: "Which dietary instruction is appropriate for a client with chronic kidney disease?", options: ["Increase protein intake", "Restrict potassium and phosphorus", "Increase sodium intake", "Drink 3L fluid daily"], correct: 1, bodySystem: "renal", difficulty: 2 },
    { stem: "A client develops chest pain after a central line insertion. The nurse suspects pneumothorax. What finding supports this?", options: ["Bilateral crackles", "Absent breath sounds on affected side", "Jugular vein distension only", "Productive cough"], correct: 1, bodySystem: "respiratory", difficulty: 3 },
    { stem: "Which task can the nurse delegate to unlicensed assistive personnel (UAP)?", options: ["Initial assessment", "Measuring vital signs", "Administering medications", "Teaching discharge care"], correct: 1, bodySystem: "fundamentals", difficulty: 2 },
    { stem: "A client receiving digoxin has a heart rate of 54 bpm. What should the nurse do?", options: ["Administer the medication", "Hold the medication and notify provider", "Give half the dose", "Recheck in 30 minutes"], correct: 1, bodySystem: "pharmacology", difficulty: 2 },
    { stem: "Which clinical finding is characteristic of right-sided heart failure?", options: ["Pulmonary edema", "Peripheral edema and JVD", "Pink frothy sputum", "Orthopnea"], correct: 1, bodySystem: "cardiovascular", difficulty: 2 },
    { stem: "A child is admitted with suspected epiglottitis. Which action should the nurse avoid?", options: ["Keeping the child calm", "Inspecting the throat with a tongue blade", "Having emergency equipment nearby", "Allowing the parent to stay"], correct: 1, bodySystem: "pediatrics", difficulty: 3 },
    { stem: "A client with burns covering 40% TBSA is in the emergent phase. What is the priority nursing assessment?", options: ["Pain level", "Wound appearance", "Airway and breathing", "Urine output"], correct: 2, bodySystem: "emergency", difficulty: 3 },
    { stem: "Which electrolyte imbalance is most commonly associated with loop diuretics?", options: ["Hyperkalemia", "Hypokalemia", "Hypernatremia", "Hypercalcemia"], correct: 1, bodySystem: "pharmacology", difficulty: 1 },
    { stem: "A client with Addison's disease is at risk for which emergency?", options: ["Thyroid storm", "Addisonian crisis", "Myxedema coma", "DKA"], correct: 1, bodySystem: "endocrine", difficulty: 2 },
    { stem: "Which nursing intervention is most important for a client in contact isolation?", options: ["Wearing N95 respirator", "Gown and gloves on entry", "Negative pressure room", "Face shield only"], correct: 1, bodySystem: "fundamentals", difficulty: 1 },
    { stem: "A postpartum client reports a gush of dark red blood 2 hours after delivery. The fundus is boggy. What is the first action?", options: ["Call the provider", "Massage the fundus", "Start oxytocin", "Prepare for surgery"], correct: 1, bodySystem: "maternity", difficulty: 3 },
    { stem: "Which finding requires immediate nursing intervention in a client receiving a blood transfusion?", options: ["Mild headache", "Urticaria on arm", "Fever, chills, and flank pain", "Anxiety"], correct: 2, bodySystem: "hematology", difficulty: 3 },
  ];
}

async function seedStarterDecks() {
  const existing = await pool.query(`SELECT id FROM flashcard_decks WHERE owner_id = 'system' LIMIT 1`);
  if (existing.rows.length > 0) return;

  await pool.query(`INSERT INTO users (id, username, password, tier) VALUES ('system', 'NurseNest', 'system-no-login', 'admin') ON CONFLICT (id) DO NOTHING`);

  const decks = [
    {
      title: "Cardiac Medications", slug: "cardiac-medications",
      description: "Essential cardiac drugs, mechanisms, and nursing considerations for NCLEX prep",
      tags: ["pharmacology", "cardiac", "NCLEX"],
      cards: [
        { front: "What is the antidote for heparin?", back: "Protamine sulfate", rationale: "Protamine binds to heparin and neutralizes its anticoagulant effect. Dose: 1 mg per 100 units of heparin." },
        { front: "What is the antidote for warfarin (Coumadin)?", back: "Vitamin K (phytonadione)", rationale: "Vitamin K reverses warfarin by restoring clotting factor synthesis. IV route for emergencies, PO for non-urgent reversal." },
        { front: "What lab value monitors heparin therapy?", back: "aPTT (activated Partial Thromboplastin Time)", rationale: "Therapeutic aPTT is typically 1.5-2.5 times the control value. Monitor every 6 hours after dose changes." },
        { front: "What lab value monitors warfarin therapy?", back: "PT/INR (Prothrombin Time / International Normalized Ratio)", rationale: "Therapeutic INR is usually 2.0-3.0. For mechanical heart valves, target is 2.5-3.5." },
        { front: "What class of drug is metoprolol?", back: "Beta-blocker (beta-1 selective)", rationale: "Metoprolol reduces heart rate and blood pressure. Hold if HR < 60 or SBP < 100. Monitor for bradycardia and hypotension." },
        { front: "What is the priority nursing action before giving digoxin?", back: "Check apical pulse for one full minute; hold if HR < 60 bpm", rationale: "Digoxin slows heart rate. Subtherapeutic HR indicates toxicity risk. Also monitor potassium levels (hypokalemia increases toxicity)." },
        { front: "What are signs of digoxin toxicity?", back: "Nausea, vomiting, visual disturbances (yellow-green halos), bradycardia, dysrhythmias", rationale: "Therapeutic digoxin level: 0.5-2.0 ng/mL. Hypokalemia increases toxicity risk. Antidote: Digibind (digoxin immune Fab)." },
        { front: "What is the mechanism of action of nitroglycerin?", back: "Vasodilation (primarily venous) reducing preload and myocardial oxygen demand", rationale: "Administered sublingually for acute angina. Max 3 doses, 5 minutes apart. Monitor for hypotension and headache." },
        { front: "What is a critical side effect of ACE inhibitors (e.g., lisinopril)?", back: "Persistent dry cough and risk of angioedema", rationale: "ACE inhibitors prevent conversion of angiotensin I to II. Cough is due to bradykinin accumulation. Switch to ARB if intolerable." },
        { front: "What electrolyte must be monitored with loop diuretics (furosemide)?", back: "Potassium (risk of hypokalemia)", rationale: "Furosemide causes potassium excretion. Signs of hypokalemia: muscle weakness, cramping, cardiac dysrhythmias, U waves on ECG." },
      ],
    },
    {
      title: "Electrolyte Imbalances", slug: "electrolyte-imbalances",
      description: "Key electrolyte disorders, symptoms, and nursing interventions for exam preparation",
      tags: ["electrolytes", "pathophysiology", "NCLEX"],
      cards: [
        { front: "What are signs of hyperkalemia?", back: "Tall peaked T waves, muscle weakness, bradycardia, cardiac arrest risk", rationale: "Potassium > 5.0 mEq/L. Emergency treatment: IV calcium gluconate (cardioprotection), insulin + glucose, sodium bicarbonate, kayexalate." },
        { front: "What are signs of hypokalemia?", back: "Muscle weakness, leg cramps, shallow respirations, U waves on ECG, cardiac dysrhythmias", rationale: "Potassium < 3.5 mEq/L. Causes: diuretics, vomiting, NG suction. Administer IV potassium NEVER by push, always diluted." },
        { front: "What is Trousseau sign?", back: "Carpal spasm when BP cuff is inflated; indicates hypocalcemia", rationale: "Calcium < 8.5 mg/dL. Trousseau sign occurs because low calcium increases neuromuscular excitability." },
        { front: "What is Chvostek sign?", back: "Facial muscle twitching when tapping the facial nerve; indicates hypocalcemia", rationale: "Tap anterior to the ear over the facial nerve. Positive response = ipsilateral facial muscle contraction." },
        { front: "What are signs of hypernatremia?", back: "Thirst, dry mucous membranes, restlessness, confusion, seizures", rationale: "Sodium > 145 mEq/L. Often caused by dehydration. Treatment: hypotonic IV fluids (0.45% NaCl). Correct slowly to prevent cerebral edema." },
        { front: "What are signs of hyponatremia?", back: "Nausea, headache, confusion, seizures, muscle cramps", rationale: "Sodium < 135 mEq/L. Causes: SIADH, water intoxication, diuretics. Treatment: fluid restriction, hypertonic saline (3% NaCl) for severe cases." },
        { front: "What electrolyte imbalance causes carpopedal spasm?", back: "Hypocalcemia", rationale: "Low calcium increases neuromuscular irritability causing tetany, spasms, and seizure risk. Also seen in hypomagnesemia." },
        { front: "What is the relationship between magnesium and calcium?", back: "Hypomagnesemia can cause refractory hypocalcemia", rationale: "Magnesium is needed for PTH secretion and action. Must correct magnesium first before calcium will normalize." },
        { front: "What are signs of hypercalcemia?", back: "Bones, stones, groans, moans (bone pain, kidney stones, constipation, confusion)", rationale: "Calcium > 10.5 mg/dL. Causes: hyperparathyroidism, malignancy. Encourage fluids, loop diuretics, calcitonin." },
        { front: "What are signs of hypermagnesemia?", back: "Lethargy, decreased DTRs, hypotension, respiratory depression, cardiac arrest", rationale: "Magnesium > 2.5 mg/dL. Often iatrogenic (magnesium sulfate therapy). Antidote: IV calcium gluconate." },
      ],
    },
    {
      title: "Infection Control & PPE", slug: "infection-control-ppe",
      description: "Standard and transmission-based precautions, PPE selection, and isolation protocols",
      tags: ["fundamentals", "infection control", "safety"],
      cards: [
        { front: "What type of isolation requires an N95 respirator?", back: "Airborne precautions", rationale: "Used for TB, measles, varicella, COVID-19. Requires negative pressure room with 6-12 air exchanges per hour." },
        { front: "Name 3 diseases requiring airborne precautions", back: "Tuberculosis (TB), measles (rubeola), varicella (chickenpox)", rationale: "Remember 'My Chicken has TB'. These pathogens travel on air currents and remain suspended. N95 + negative pressure room required." },
        { front: "What type of isolation requires a surgical mask within 3 feet?", back: "Droplet precautions", rationale: "Used for influenza, pertussis, meningitis, mumps. Droplets travel up to 3-6 feet. Private room or 3-foot curtain separation." },
        { front: "What PPE is needed for contact precautions?", back: "Gown and gloves", rationale: "Used for MRSA, VRE, C. diff, scabies. Dedicated equipment. Don gown and gloves before entering room." },
        { front: "What is the correct order for donning PPE?", back: "Gown, mask/respirator, goggles/face shield, gloves", rationale: "Remember the order goes from least to most contaminated. Gloves go on last and cover gown cuffs." },
        { front: "What is the correct order for doffing (removing) PPE?", back: "Gloves, goggles/face shield, gown, mask/respirator", rationale: "Gloves are most contaminated and removed first. Perform hand hygiene between steps. Mask removed last at doorway." },
        { front: "When is hand hygiene required? (5 moments)", back: "Before patient contact, before aseptic task, after body fluid exposure, after patient contact, after touching surroundings", rationale: "WHO 5 Moments for Hand Hygiene. Use alcohol-based rub (20 sec) or soap and water (40-60 sec). Soap required for C. diff." },
        { front: "What precaution type is required for C. difficile?", back: "Contact precautions with soap and water hand washing (not alcohol rub)", rationale: "C. diff spores are resistant to alcohol. Must use soap and water. Bleach-based cleaning for surfaces. Private room preferred." },
        { front: "What is the sterile field rule for distance?", back: "A 1-inch border around a sterile field is considered non-sterile", rationale: "Never turn your back on a sterile field. Keep the field at waist level or above. If contamination is suspected, start over." },
        { front: "What type of precaution is used for a patient with shingles (herpes zoster)?", back: "Airborne + Contact precautions (if disseminated); Contact only if localized and covered", rationale: "Disseminated zoster can be aerosolized. Localized covered lesions require contact only. Susceptible staff should avoid the patient." },
      ],
    },
    {
      title: "Vital Signs & Assessment", slug: "vital-signs-assessment",
      description: "Normal ranges, abnormal findings, and priority nursing responses for vital sign changes",
      tags: ["assessment", "fundamentals", "clinical"],
      cards: [
        { front: "What is the priority action for a respiratory rate of 8?", back: "Assess airway, administer oxygen, prepare for respiratory support, notify provider", rationale: "RR < 12 is bradypnea and may indicate CNS depression (opioids, neurological injury). Hold opioids if prescribed and assess." },
        { front: "What does a widening pulse pressure indicate?", back: "Increased intracranial pressure (ICP) - Cushing triad component", rationale: "Cushing triad: widening pulse pressure, bradycardia, irregular respirations. This is a late sign of increased ICP - emergency." },
        { front: "What position optimizes breathing for a dyspneic patient?", back: "High Fowler's position (60-90 degrees) or orthopneic position", rationale: "Upright positioning allows maximum lung expansion by lowering the diaphragm. Tripod position also helps." },
        { front: "What is the normal SpO2 range?", back: "95-100% on room air", rationale: "SpO2 < 90% indicates significant hypoxemia. For COPD patients, acceptable range may be 88-92% to maintain hypoxic drive." },
        { front: "When should you take an apical pulse?", back: "Before administering digoxin or beta-blockers; for irregular radial pulse; in infants and children", rationale: "Apical pulse is the most accurate. Located at 5th intercostal space, midclavicular line. Count for full 60 seconds." },
        { front: "What does a pulse deficit indicate?", back: "Cardiac dysrhythmia (difference between apical and radial pulse)", rationale: "Pulse deficit = apical rate minus radial rate. Occurs when some cardiac contractions are too weak to produce a palpable pulse wave." },
        { front: "What temperature indicates a fever?", back: "Oral > 100.4F (38C)", rationale: "Report fever with other findings. Rectal is most accurate (0.5-1F higher than oral). Axillary is least accurate (0.5-1F lower)." },
        { front: "What blood pressure reading indicates Stage 2 hypertension?", back: "Systolic 140+ or Diastolic 90+ mmHg", rationale: "Stage 1: 130-139/80-89. Stage 2: 140+/90+. Hypertensive crisis: > 180/120. Verify with repeat measurement on both arms." },
        { front: "What is orthostatic hypotension?", back: "Drop of 20+ mmHg systolic or 10+ mmHg diastolic within 3 minutes of standing", rationale: "Assess lying, sitting, then standing BP. Causes: dehydration, blood loss, medications. Implement fall precautions." },
        { front: "What does a Glasgow Coma Scale (GCS) of 8 or less indicate?", back: "Severe brain injury; patient likely needs intubation for airway protection", rationale: "GCS ranges from 3-15. Eye opening (1-4) + Verbal (1-5) + Motor (1-6). Score of 8 or less = coma. 'GCS less than 8, intubate.'" },
      ],
    },
    {
      title: "Diabetes Management", slug: "diabetes-management",
      description: "Insulin types, hypoglycemia vs hyperglycemia, DKA, and nursing priorities",
      tags: ["endocrine", "pharmacology", "NCLEX"],
      cards: [
        { front: "What are the signs of hypoglycemia?", back: "Shakiness, sweating, tachycardia, confusion, pallor, irritability, hunger", rationale: "Blood glucose < 70 mg/dL. Treat with 15g fast-acting carbs (4 oz juice, glucose tablets). Recheck in 15 min. Rule of 15." },
        { front: "What are the signs of DKA (Diabetic Ketoacidosis)?", back: "Kussmaul respirations, fruity breath, dehydration, abdominal pain, nausea, altered LOC", rationale: "DKA occurs in Type 1 diabetes. BG > 300, pH < 7.35, ketones present. Treatment: IV fluids first, then insulin drip, potassium monitoring." },
        { front: "What is the onset of rapid-acting insulin (lispro/aspart)?", back: "15 minutes onset, peak 1-2 hours, duration 3-5 hours", rationale: "Given before meals (within 15 min of eating). Clear appearance. Can be given IV in emergencies." },
        { front: "What is the onset of regular insulin?", back: "30-60 minutes onset, peak 2-4 hours, duration 6-8 hours", rationale: "The only insulin that can be given IV. Clear appearance. Give 30 min before meals when given subcutaneously." },
        { front: "What is the onset of NPH insulin?", back: "1-2 hours onset, peak 4-12 hours, duration 18-24 hours", rationale: "Intermediate-acting, cloudy appearance. Must be rolled gently (not shaken). Often combined with rapid-acting insulin." },
        { front: "When mixing insulins, which is drawn up first?", back: "Clear before cloudy (regular before NPH)", rationale: "Remember 'RN' - Regular before NPH. Draw air into NPH first, then air into regular, draw regular first, then draw NPH." },
        { front: "What is the priority assessment for a patient on an insulin drip?", back: "Blood glucose monitoring every 1-2 hours and potassium levels", rationale: "Insulin drives potassium into cells, causing hypokalemia. IV potassium replacement is often needed. Monitor ECG for dysrhythmias." },
        { front: "What differentiates DKA from HHS (Hyperosmolar Hyperglycemic State)?", back: "DKA has ketones and metabolic acidosis; HHS has extreme hyperglycemia (>600) without significant ketosis", rationale: "DKA = Type 1, rapid onset, BG 300-800. HHS = Type 2, gradual onset, BG > 600, severe dehydration, higher mortality." },
        { front: "What are signs of the dawn phenomenon?", back: "Elevated fasting blood glucose (early morning hyperglycemia)", rationale: "Caused by growth hormone and cortisol release between 5-8 AM. Management: adjust evening insulin timing or increase dose." },
        { front: "Where are the best injection sites for insulin absorption?", back: "Abdomen (fastest), then arms, thighs, buttocks (slowest)", rationale: "Rotate within one region before moving to another. Avoid injecting within 2 inches of the navel. Exercise increases absorption at the site." },
      ],
    },
    {
      title: "Maternal & Newborn Essentials", slug: "maternal-newborn-essentials",
      description: "Pregnancy complications, labor stages, postpartum assessment, and newborn care",
      tags: ["maternity", "OB", "newborn"],
      cards: [
        { front: "What are warning signs of preeclampsia?", back: "BP 140/90+, proteinuria, headache, visual changes, epigastric pain, edema (face/hands)", rationale: "Preeclampsia occurs after 20 weeks gestation. Severe: BP 160/110+. Treatment: magnesium sulfate (seizure prevention), antihypertensives." },
        { front: "What is the antidote for magnesium sulfate toxicity?", back: "Calcium gluconate", rationale: "Signs of mag toxicity: loss of DTRs, respiratory depression (RR < 12), urine output < 30 mL/hr. Keep antidote at bedside." },
        { front: "What does APGAR assess?", back: "Appearance (color), Pulse, Grimace (reflex), Activity (muscle tone), Respirations", rationale: "Scored at 1 and 5 minutes after birth. Each category scored 0-2, total 0-10. Score 7-10 normal, < 7 needs intervention." },
        { front: "What is the normal fetal heart rate range?", back: "110-160 beats per minute", rationale: "Tachycardia > 160 (maternal fever, infection). Bradycardia < 110 (cord compression, late decelerations). Monitor with EFM." },
        { front: "What do late decelerations indicate?", back: "Uteroplacental insufficiency (fetal distress)", rationale: "Late decels begin after contraction peak and return to baseline after contraction ends. Interventions: left lateral position, O2, stop Pitocin, notify provider." },
        { front: "What is the BUBBLE-HE postpartum assessment?", back: "Breasts, Uterus, Bladder, Bowel, Lochia, Episiotomy/incision, Homan sign, Emotions", rationale: "Systematic head-to-toe postpartum check. Fundus should be firm, at or below umbilicus, midline. Boggy = massage firmly." },
        { front: "What is the normal progression of lochia?", back: "Rubra (red, 1-3 days), Serosa (pink-brown, 4-10 days), Alba (white-yellow, 10+ days)", rationale: "Saturating a pad in < 1 hour or passing large clots indicates hemorrhage. Assess for uterine atony or retained placenta." },
        { front: "What position is used for cord prolapse?", back: "Trendelenburg or knee-chest position", rationale: "Elevate hips above heart to relieve pressure on the cord. Do NOT attempt to push cord back. Cover cord with sterile saline gauze. Emergency C-section." },
        { front: "What is the normal newborn blood glucose?", back: "40-60 mg/dL in the first 24 hours, then > 45 mg/dL", rationale: "Screen at-risk infants: LGA, SGA, infants of diabetic mothers. Signs of hypoglycemia: jitteriness, poor feeding, lethargy, seizures." },
        { front: "When should the first hepatitis B vaccine be given?", back: "Within 12 hours of birth", rationale: "Part of the routine newborn immunization schedule. Given IM in the vastus lateralis. Second dose at 1 month, third at 6 months." },
      ],
    },
  ];

  for (const deck of decks) {
    const r = await pool.query(
      `INSERT INTO flashcard_decks (id, owner_id, title, description, tags, tier, visibility, slug, card_count, created_at, updated_at)
       VALUES (gen_random_uuid(), 'system', $1, $2, $3, 'free', 'public', $4, $5, NOW(), NOW()) RETURNING id`,
      [deck.title, deck.description, JSON.stringify(deck.tags), deck.slug, deck.cards.length]
    );
    const deckId = r.rows[0].id;
    for (let i = 0; i < deck.cards.length; i++) {
      const c = deck.cards[i];
      await pool.query(
        `INSERT INTO deck_flashcards (id, deck_id, front, back, rationale, sort_order, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())`,
        [deckId, c.front, c.back, c.rationale, i]
      );
    }
  }
  console.log(`Seeded ${decks.length} starter study decks`);
}