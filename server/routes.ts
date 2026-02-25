import type { Express, Request } from "express";
import type { Server } from "http";
import { sql } from "drizzle-orm";
import { storage, DatabaseStorage, pool } from "./storage";
import {
  insertNoteSchema,
  insertTestResultSchema,
  insertUserProgressSchema,
  insertUserSchema,
  insertContentItemSchema,
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

  app.post("/api/user-flashcards", async (req, res) => {
    try {
      const { userId, question, answer, category } = req.body;
      if (!userId || !question || !answer) return res.status(400).json({ error: "Missing required fields" });
      const card = await storage.createUserFlashcard({
        userId,
        question,
        answer,
        category: category || "My Cards",
      });
      res.json(card);
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
  // Content
  // --------------------
  app.get("/api/content", async (req, res) => {
    try {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      const { status, username, password, type, category } = req.query;

      if (status === "all" && username && password) {
        const adminUser = await storage.getUserByUsername(username as string);
        if (adminUser && adminUser.password === password && adminUser.tier === "admin") {
          const items = await storage.getAllContentItems();
          return res.json(items);
        }
      }

      let items = await storage.getPublishedContent(type as string | undefined, category as string | undefined);

      if (items.length === 0) {
        const { pool } = await import("./storage");
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
        items = result.rows;
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
      let item = await storage.getContentItemBySlug(req.params.slug);

      if (!item) {
        const { pool } = await import("./storage");
        const result = await pool.query("SELECT * FROM content_items WHERE slug = $1 LIMIT 1", [req.params.slug]);
        item = result.rows[0] || null;
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

      const item = await storage.updateContentItem(req.params.id, contentData);
      res.json(item);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/content/:id", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      await storage.deleteContentItem(req.params.id);
      res.json({ success: true });
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

      res.json({
        traffic: {
          totalViews: analytics.totalViews,
          uniqueSessions: analytics.uniqueSessions,
          avgDuration: analytics.avgDuration,
          bounceRate: analytics.bounceRate,
        },
        topPages: analytics.topPages,
        topReferrers: analytics.topReferrers,
        devices: analytics.devices,
        browsers: analytics.browsers,
        operatingSystems: analytics.operatingSystems,
        subscriptionBreakdown,
        subscriptionStatus: statusBreakdown,
        userRegions: regionBreakdown,
        totalUsers: allUsers.length,
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
  // Stripe Promotions (Admin)
  // --------------------
  app.post("/api/admin/promotions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { code, discountType, amount, duration, maxRedemptions, expiresAt } = req.body;
      if (!code || !discountType || !amount || !duration) {
        return res.status(400).json({ error: "code, discountType, amount, and duration are required" });
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
        couponParams.amount_off = Number(amount);
        couponParams.currency = "usd";
      }
      if (duration === "repeating") {
        couponParams.duration_in_months = 3;
      }

      const coupon = await stripe.coupons.create(couponParams);

      const promoParams: any = {
        coupon: coupon.id,
        code: code.toUpperCase(),
      };
      if (maxRedemptions) {
        promoParams.max_redemptions = Number(maxRedemptions);
      }
      if (expiresAt) {
        promoParams.expires_at = Math.floor(new Date(expiresAt).getTime() / 1000);
      }

      const promotionCode = await stripe.promotionCodes.create(promoParams);

      res.json({
        id: promotionCode.id,
        code: promotionCode.code,
        couponId: coupon.id,
        discountType,
        amount: Number(amount),
        duration,
        maxRedemptions: promotionCode.max_redemptions,
        expiresAt: promotionCode.expires_at,
        active: promotionCode.active,
      });
    } catch (e: any) {
      console.error("Create promotion error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/promotions", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const stripe = await getUncachableStripeClient();
      const promotionCodes = await stripe.promotionCodes.list({ limit: 100 });

      const results = promotionCodes.data.map((pc: any) => ({
        id: pc.id,
        code: pc.code,
        couponId: pc.coupon?.id,
        discountType: pc.coupon?.percent_off ? "percent_off" : "amount_off",
        amount: pc.coupon?.percent_off || pc.coupon?.amount_off || 0,
        duration: pc.coupon?.duration,
        maxRedemptions: pc.max_redemptions,
        timesRedeemed: pc.times_redeemed,
        expiresAt: pc.expires_at,
        active: pc.active,
        created: pc.created,
      }));

      res.json(results);
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
      const updated = await stripe.promotionCodes.update(req.params.id, { active: false });

      res.json({ success: true, id: updated.id, active: updated.active });
    } catch (e: any) {
      console.error("Deactivate promotion error:", e);
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
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, tier, source } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email required" });
      }
      const existing = await storage.getEmailSubscriberByEmail(email.toLowerCase().trim());
      if (existing) {
        return res.json({ message: "Already subscribed", subscriber: existing });
      }
      const subscriber = await storage.createEmailSubscriber({
        email: email.toLowerCase().trim(),
        tier: tier || "general",
        source: source || "qotd",
        verified: false,
      });
      res.json({ message: "Subscribed successfully", subscriber });
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

  return httpServer;
}