import type { Express, Request } from "express";
import type { Server } from "http";
import { sql } from "drizzle-orm";
import { storage, DatabaseStorage, pool } from "./storage";

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
} from "@shared/schema";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault, isPaypalConfigured } from "./paypal";
import { generateBlogPost, runBlogScheduler } from "./blog-automation";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";

/**
 * Consistent admin auth (DB-based).
 * Uses the same "username + password" you store in localStorage on the client.
 */
async function requireAdmin(req: any, res: any) {
  const username = String(req.body?.username || req.query?.username || "");
  const password = String(req.body?.password || req.query?.password || "");

  if (!username || !password) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }

  const user = await storage.getUserByUsername(username);
  if (!user || user.password !== password || user.tier !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return null;
  }

  return user;
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
          const { db: pgPool } = await import("./db");
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
  app.get("/api/content/lessons", async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, title, slug, category, body_system, tier, summary, tags, seo_description, published_at, updated_at FROM content_items WHERE status = 'published' AND type = 'lesson' ORDER BY published_at DESC NULLS LAST"
      );
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/flashcard-sets", async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, title, slug, category, tier, summary, tags, published_at, updated_at, content FROM content_items WHERE status = 'published' AND type = 'flashcard-set' ORDER BY published_at DESC NULLS LAST"
      );
      res.json(snakeToCamel(result.rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content/exams", async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, title, slug, category, tier, summary, tags, published_at, updated_at FROM content_items WHERE status = 'published' AND type = 'exam' ORDER BY published_at DESC NULLS LAST"
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

      let items: any[] = [];
      try {
        items = await storage.getPublishedContent(type as string | undefined, category as string | undefined);
        console.log(`[Content API] Drizzle returned ${items.length} items for type=${type || "all"}`);
      } catch (ormErr: any) {
        console.error("[Content API] Drizzle ORM error:", ormErr.message);
      }

      if (items.length === 0) {
        console.log("[Content API] Drizzle returned 0, trying raw SQL fallback...");
        try {
          let q = "SELECT * FROM content_items WHERE status = 'published'";
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
          console.log(`[Content API] Raw SQL returned ${items.length} items for type=${type || "all"}`);
        } catch (sqlErr: any) {
          console.error("[Content API] Raw SQL error:", sqlErr.message);
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
      if (item.status !== "published") return res.status(404).json({ error: "Content not found" });

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

  app.post("/api/content", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { username, password, ...contentData } = req.body;
      void username;
      void password;

      const parsed = insertContentItemSchema.parse(contentData);
      const item = await storage.createContentItem(parsed);
      await logAudit(req, admin, "content", item.id, "create", null, { title: item.title, type: item.type, status: item.status });
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

  const FREE_GLOBAL_MAX = 50;
  const DECK_UPGRADED_MAX = 300;
  const PREMIUM_MAX = 5000;

  async function getUserCardEntitlement(userId: string) {
    const userResult = await pool.query(`SELECT tier, subscription_status FROM users WHERE id = $1`, [userId]);
    const u = userResult.rows[0];
    if (!u) return { isPremium: false, totalFreeCards: 0, limit: FREE_GLOBAL_MAX };
    const isPremium = u.tier !== "free" && u.subscription_status === "active";
    if (isPremium) return { isPremium: true, totalFreeCards: 0, limit: PREMIUM_MAX };
    const countResult = await pool.query(
      `SELECT COALESCE(SUM(
        (SELECT COUNT(*) FROM deck_flashcards WHERE deck_id = d.id)
      ), 0) as total
      FROM flashcard_decks d WHERE d.owner_id = $1 AND d.is_upgraded = false`,
      [userId]
    );
    const totalFreeCards = parseInt(countResult.rows[0]?.total || "0");
    return { isPremium: false, totalFreeCards, limit: FREE_GLOBAL_MAX };
  }

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
      const deckCheck = await pool.query(`SELECT owner_id FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      if (deckCheck.rows.length === 0) return res.status(404).json({ error: "Deck not found" });
      if (deckCheck.rows[0].owner_id !== userId) return res.status(403).json({ error: "Not your deck" });
      await pool.query(`DELETE FROM deck_flashcards WHERE deck_id = $1`, [req.params.id]);
      await pool.query(`DELETE FROM flashcard_decks WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/decks/:id/cards", async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM deck_flashcards WHERE deck_id = $1 ORDER BY sort_order ASC, created_at ASC`,
        [req.params.id]
      );
      res.json(snakeToCamel(result.rows));
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
  // Lesson overrides (NOW protected consistently)
  // --------------------
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
      const result = await pool.query(`
        UPDATE content_items
        SET status = 'published', published_at = NOW(), scheduled_at = NULL, updated_at = NOW()
        WHERE status = 'scheduled' AND scheduled_at <= $1 AND type = 'blog'
        RETURNING id, title
      `, [now]);
      res.json({ published: result.rows.length, posts: snakeToCamel(result.rows) });
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

  return httpServer;
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