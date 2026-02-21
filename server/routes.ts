import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { sql } from "drizzle-orm";
import { storage, DatabaseStorage } from "./storage";
import { insertNoteSchema, insertTestResultSchema, insertUserProgressSchema, insertUserSchema, insertContentItemSchema } from "@shared/schema";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault, isPaypalConfigured } from "./paypal";
import { generateBlogPost, runBlogScheduler } from "./blog-automation";

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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByUsername(data.username);
      if (existing) return res.status(400).json({ error: "Username already taken" });
      const user = await storage.createUser(data);
      res.json({ id: user.id, username: user.username, tier: user.tier, subscriptionStatus: user.subscriptionStatus });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });
      res.json({ id: user.id, username: user.username, tier: user.tier, subscriptionStatus: user.subscriptionStatus, email: user.email, region: user.region });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get("/api/user/:userId", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ id: user.id, username: user.username, tier: user.tier, subscriptionStatus: user.subscriptionStatus, email: user.email, region: user.region });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

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
      const { userId, tier } = req.body;
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

      const priceMap: Record<string, number> = {
        rpn: 2999,
        rn: 3999,
        np: 4999,
        "lab-values": 999,
        "med-math": 999,
        "practice-tools": 1499,
      };

      const tierNames: Record<string, string> = {
        rpn: "NurseNest RPN/LVN",
        rn: "NurseNest RN/NCLEX",
        np: "NurseNest NP Advanced",
        "lab-values": "NurseNest Lab Interpretation Unlimited",
        "med-math": "NurseNest Med Math Unlimited",
        "practice-tools": "NurseNest All Practice Tools",
      };

      const amount = priceMap[tier];
      if (!amount) return res.status(400).json({ error: "Invalid tier" });

      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: tierNames[tier],
              description: `Monthly subscription to ${tierNames[tier]} content`,
            },
            unit_amount: amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: `${baseUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
        cancel_url: `${baseUrl}/lessons`,
        metadata: { userId: user.id, tier },
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
        return_url: `${req.protocol}://${req.get('host')}/lessons`,
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
            sql`SELECT current_period_end, status FROM stripe.subscriptions WHERE id = ${user.stripeSubscriptionId} LIMIT 1`
          );
          if (result.rows && result.rows.length > 0) {
            const sub = result.rows[0] as any;
            if (sub.current_period_end) {
              const endDate = new Date(sub.current_period_end * 1000);
              currentPeriodEnd = endDate.toISOString();
              const now = new Date();
              daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
            }
          }
        } catch (stripeErr) {
          // Stripe data not available, continue without it
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
      const card = await storage.createUserFlashcard({ userId, question, answer, category: category || "My Cards" });
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
        statusCounts[u.subscriptionStatus || "inactive"] = (statusCounts[u.subscriptionStatus || "inactive"] || 0) + 1;
      });

      const now = new Date();
      const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const recentTests7 = allResults.filter((r: any) => new Date(r.completedAt) > last7Days);
      const recentTests30 = allResults.filter((r: any) => new Date(r.completedAt) > last30Days);
      const recentProgress7 = allProgress.filter((p: any) => new Date(p.lastAccessed) > last7Days);
      const recentProgress30 = allProgress.filter((p: any) => new Date(p.lastAccessed) > last30Days);

      const activeUsers7 = new Set([
        ...recentTests7.map((r: any) => r.userId),
        ...recentProgress7.map((p: any) => p.userId),
      ]).size;

      const activeUsers30 = new Set([
        ...recentTests30.map((r: any) => r.userId),
        ...recentProgress30.map((p: any) => p.userId),
      ]).size;

      const lessonPopularity: Record<string, number> = {};
      allProgress.forEach((p: any) => {
        lessonPopularity[p.lessonId] = (lessonPopularity[p.lessonId] || 0) + 1;
      });
      const topLessons = Object.entries(lessonPopularity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([lessonId, count]) => ({ lessonId, accessCount: count }));

      const avgScore = allResults.length > 0
        ? Math.round(allResults.reduce((sum: number, r: any) => sum + (r.score / r.totalQuestions) * 100, 0) / allResults.length)
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
          const dates = [
            ...userTests.map((r: any) => new Date(r.completedAt)),
            ...userProg.map((p: any) => new Date(p.lastAccessed)),
          ];
          return dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : null;
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

  app.get("/api/report-card/:userId", async (req, res) => {
    try {
      const [progress, results] = await Promise.all([
        storage.getUserProgress(req.params.userId),
        storage.getTestResults(req.params.userId),
      ]);
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
      const avgScore = results.length > 0
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

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(
      `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: https://nursenest.replit.app/sitemap.xml`
    );
  });

  app.get("/sitemap.xml", async (_req, res) => {
    const staticPages = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/lessons", priority: "0.9", changefreq: "weekly" },
      { loc: "/flashcards", priority: "0.8", changefreq: "weekly" },
      { loc: "/pricing", priority: "0.8", changefreq: "monthly" },
      { loc: "/start-free", priority: "0.8", changefreq: "monthly" },
      { loc: "/anatomy", priority: "0.7", changefreq: "monthly" },
      { loc: "/faq", priority: "0.6", changefreq: "monthly" },
      { loc: "/terms", priority: "0.3", changefreq: "yearly" },
      { loc: "/privacy", priority: "0.3", changefreq: "yearly" },
      { loc: "/disclaimer", priority: "0.3", changefreq: "yearly" },
      { loc: "/med-math", priority: "0.8", changefreq: "weekly" },
      { loc: "/lab-values", priority: "0.8", changefreq: "weekly" },
      { loc: "/blog", priority: "0.8", changefreq: "daily" },
      { loc: "/clinical-clarity", priority: "0.7", changefreq: "weekly" },
      { loc: "/case-simulations", priority: "0.7", changefreq: "weekly" },
      { loc: "/medication-mastery", priority: "0.7", changefreq: "weekly" },
    ];

    const lessonIds = [
      "heart-failure","hypertension","aaa-rupture","mi-management","hf-advanced","shock-syndromes","dysrhythmias",
      "copd-exacerbation","asthma-emergency","pe-recognition","ards-management",
      "neuro-basics","stroke","stroke-advanced","increased-icp","seizure-safety",
      "gi-bleed","acute-abdomen","liver-cirrhosis",
      "aki-management","electrolyte-safety","ckd-management",
      "siadh-di","dka-hhns","adrenal-insufficiency",
      "iron-deficiency-anemia","dic-basics","sickle-cell","all-leukemia",
      "epiglottitis","dehydration-peds","congenital-heart",
      "preeclampsia","postpartum-hemorrhage","gestational-diabetes",
      "neonatal-respiratory-distress","neonatal-sepsis","hyperbilirubinemia",
      "lithium-toxicity","nms-serotonin","major-depression",
      "compartment-syndrome","burn-management",
      "sepsis-mastery","anemia-types",
      "delirium-dementia","parkinsons",
      "respiratory-assessment","abdominal-assessment",
      "cardiac-assessment-ecg","cranial-nerve-assessment",
    ];

    const base = "https://nursenest.replit.app";
    const urls = staticPages.map(
      (p) => `  <url><loc>${base}${p.loc}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
    );
    lessonIds.forEach((id) => {
      urls.push(`  <url><loc>${base}/lessons/${id}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    });

    try {
      const publishedContent = await storage.getPublishedContent();
      publishedContent.forEach((item) => {
        urls.push(`  <url><loc>${base}/learn/${item.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
      });
    } catch {}

    res.type("application/xml").send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`
    );
  });

  app.get("/api/content", async (req, res) => {
    try {
      const { status, username, password, type, category } = req.query;
      if (status === "all" && username && password) {
        const adminUser = await storage.getUserByUsername(username as string);
        if (adminUser && adminUser.password === password && adminUser.tier === "admin") {
          const items = await storage.getAllContentItems();
          return res.json(items);
        }
      }
      const items = await storage.getPublishedContent(
        type as string | undefined,
        category as string | undefined
      );
      res.json(items);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/content/check-duplicate", async (req, res) => {
    try {
      const { slug, primaryKeyword, excludeId } = req.body;
      const slugExists = slug ? await storage.checkDuplicateSlug(slug, excludeId) : false;
      const keywordOverlap = primaryKeyword ? await storage.checkKeywordOverlap(primaryKeyword, excludeId) : [];
      res.json({ slugExists, keywordOverlap: keywordOverlap.map(i => ({ id: i.id, title: i.title, primaryKeyword: i.primaryKeyword })) });
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
      const item = await storage.getContentItemBySlug(req.params.slug);
      if (!item) return res.status(404).json({ error: "Content not found" });
      if (item.status !== "published") {
        return res.status(404).json({ error: "Content not found" });
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

  app.post("/api/content", async (req, res) => {
    try {
      const { username, password, ...contentData } = req.body;
      if (!username || !password) return res.status(401).json({ error: "Authentication required" });
      const adminUser = await storage.getUserByUsername(username);
      if (!adminUser || adminUser.password !== password || adminUser.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const parsed = insertContentItemSchema.parse(contentData);
      const item = await storage.createContentItem(parsed);
      res.json(item);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/content/:id", async (req, res) => {
    try {
      const { username, password, ...contentData } = req.body;
      if (!username || !password) return res.status(401).json({ error: "Authentication required" });
      const adminUser = await storage.getUserByUsername(username);
      if (!adminUser || adminUser.password !== password || adminUser.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const item = await storage.updateContentItem(req.params.id, contentData);
      res.json(item);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/content/:id", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(401).json({ error: "Authentication required" });
      const adminUser = await storage.getUserByUsername(username);
      if (!adminUser || adminUser.password !== password || adminUser.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      await storage.deleteContentItem(req.params.id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  const validFeatures = ["lab-values", "med-math"];

  app.get("/api/feature-usage/:userId/:feature", async (req, res) => {
    try {
      const { userId, feature } = req.params;
      if (!validFeatures.includes(feature)) return res.status(400).json({ error: "Invalid feature" });
      const today = new Date().toISOString().slice(0, 10);
      const usage = await storage.getFeatureUsage(userId, feature, today);
      const user = await storage.getUser(userId);
      const hasUnlimited = user?.tier === "admin" ||
        (user?.subscriptionStatus === "active" && (
          user?.tier === "lab-values" && feature === "lab-values" ||
          user?.tier === "med-math" && feature === "med-math" ||
          user?.tier === "practice-tools" ||
          ["rpn", "rn", "np"].includes(user?.tier || "")
        ));
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
      const hasUnlimited = user?.tier === "admin" ||
        (user?.subscriptionStatus === "active" && (
          user?.tier === "lab-values" && feature === "lab-values" ||
          user?.tier === "med-math" && feature === "med-math" ||
          user?.tier === "practice-tools" ||
          ["rpn", "rn", "np"].includes(user?.tier || "")
        ));
      if (hasUnlimited) {
        return res.json({ count: 0, limit: 10, hasUnlimited: true });
      }
      const usage = await storage.incrementFeatureUsage(userId, feature, today);
      res.json({ count: usage.count, limit: 10, hasUnlimited: false });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/blog/config", async (req, res) => {
    try {
      const config = await storage.getBlogConfig();
      res.json(config || { isActive: false, citationStyle: "apa7", postsPerDay: 2, dayCount: 0, totalPostsGenerated: 0 });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/blog/config", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
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
      const { username, password, topic, citationStyle } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
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
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password || user.tier !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }
      const result = await runBlogScheduler();
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/paypal/status", (req, res) => {
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

  return httpServer;
}
