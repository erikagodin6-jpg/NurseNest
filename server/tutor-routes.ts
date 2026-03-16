import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import { resolveAuthUser } from "./admin-auth";
import { pool, storage } from "./storage";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const FREE_TIER_DAILY_LIMIT = 5;
const TUTOR_FEATURE_KEY = "ai_tutor";

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function buildSafetyPreamble(): string {
  return `You are an AI Tutoring Assistant for NurseNest, a nursing exam preparation platform. Your role is strictly educational and exam-focused.

CRITICAL SAFETY RULES:
- NEVER provide clinical treatment advice, medical diagnoses, or patient care recommendations for real patients.
- NEVER advise on medication dosages for actual patient situations.
- Always frame your answers in the context of exam preparation and studying.
- If asked about real patient scenarios, redirect to "For exam purposes..." framing.
- You are helping students PREPARE FOR EXAMS, not practice medicine.

YOUR CAPABILITIES:
- Walk through practice questions step-by-step
- Explain nursing concepts in simple terms
- Provide mnemonics and memory aids
- Suggest what topics to study next based on weak areas
- Break down complex clinical scenarios for exam understanding
- Explain why incorrect answer choices are wrong
- Provide test-taking strategies`;
}

function buildContextPrompt(contextType: string, contextData: any): string {
  switch (contextType) {
    case "practice_question":
      return `\n\nCONTEXT: The student is working on a practice question.
Question: ${contextData.question || "N/A"}
Options: ${(contextData.options || []).map((o: string, i: number) => `${String.fromCharCode(65 + i)}. ${o}`).join("\n")}
${contextData.correct !== undefined ? `Correct Answer: ${String.fromCharCode(65 + contextData.correct)}` : ""}
${contextData.rationale ? `Rationale: ${contextData.rationale}` : ""}
${contextData.bodySystem ? `Body System: ${contextData.bodySystem}` : ""}
${contextData.tier ? `Exam Tier: ${contextData.tier}` : ""}

Help the student understand this question. If they haven't answered yet, guide them without giving away the answer directly.`;

    case "flashcard":
      return `\n\nCONTEXT: The student is studying a flashcard.
Front: ${contextData.question || contextData.front || "N/A"}
Back: ${contextData.answer || contextData.back || "N/A"}
Category: ${contextData.category || "N/A"}
${contextData.clinicalPearl ? `Clinical Pearl: ${contextData.clinicalPearl}` : ""}

Help the student deeply understand this concept. Offer mnemonics, related topics, and exam tips.`;

    case "study_guide":
      return `\n\nCONTEXT: The student is reading a study guide.
Guide Title: ${contextData.title || "N/A"}
Section: ${contextData.section || "N/A"}
${contextData.content ? `Content excerpt: ${contextData.content.substring(0, 500)}` : ""}

Help the student understand this study material. Offer explanations, key takeaways, and exam-relevant highlights.`;

    case "mock_exam":
      return `\n\nCONTEXT: The student is reviewing a mock exam.
${contextData.score !== undefined ? `Score: ${contextData.score}/${contextData.total}` : ""}
${contextData.tier ? `Exam Tier: ${contextData.tier}` : ""}
${contextData.weakAreas ? `Weak Areas: ${contextData.weakAreas.join(", ")}` : ""}

Help the student understand their performance and suggest areas for improvement.`;

    default:
      return "\n\nThe student is asking a general nursing exam preparation question. Help them study effectively.";
  }
}

function getLanguageInstruction(language: string): string {
  const langMap: Record<string, string> = {
    en: "",
    fr: "\n\nIMPORTANT: Respond in French (Français). Use French for all explanations and terminology where possible.",
    es: "\n\nIMPORTANT: Respond in Spanish (Español). Use Spanish for all explanations and terminology where possible.",
  };
  return langMap[language] || "";
}

export function registerTutorRoutes(app: Express): void {
  app.post("/api/tutor/conversations", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { contextType, contextId, language, title } = req.body;
      const result = await pool.query(
        `INSERT INTO tutor_conversations (user_id, context_type, context_id, language, title, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
        [user.id, contextType || "general", contextId || null, language || "en", title || "AI Tutor Chat"]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating tutor conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  app.get("/api/tutor/conversations/:id/messages", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const conversationId = parseInt(req.params.id);
      const convResult = await pool.query(
        "SELECT * FROM tutor_conversations WHERE id = $1 AND user_id = $2",
        [conversationId, user.id]
      );
      if (convResult.rows.length === 0) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const msgResult = await pool.query(
        "SELECT * FROM tutor_messages WHERE conversation_id = $1 ORDER BY created_at ASC",
        [conversationId]
      );

      res.json(msgResult.rows);
    } catch (error) {
      console.error("Error fetching tutor messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/tutor/usage", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      const isPremium = userTier !== "free";
      const today = getTodayDateString();

      const usage = await storage.getFeatureUsage(user.id, TUTOR_FEATURE_KEY, today);
      const usedToday = usage?.count || 0;

      res.json({
        usedToday,
        dailyLimit: isPremium ? null : FREE_TIER_DAILY_LIMIT,
        isPremium,
        remaining: isPremium ? null : Math.max(0, FREE_TIER_DAILY_LIMIT - usedToday),
      });
    } catch (error) {
      console.error("Error fetching tutor usage:", error);
      res.status(500).json({ error: "Failed to fetch usage" });
    }
  });

  app.post("/api/tutor/conversations/:id/messages", async (req: Request, res: Response) => {
    try {
      const user = await resolveAuthUser(req as any);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      const isPremium = userTier !== "free";
      const today = getTodayDateString();

      if (!isPremium) {
        const usageResult = await pool.query(
          `INSERT INTO feature_usage (id, user_id, feature, usage_date, count)
           VALUES (gen_random_uuid(), $1, $2, $3, 1)
           ON CONFLICT (user_id, feature, usage_date) DO UPDATE SET count = feature_usage.count + 1
           RETURNING count`,
          [user.id, TUTOR_FEATURE_KEY, today]
        );
        const newCount = usageResult.rows[0]?.count || 1;
        if (newCount > FREE_TIER_DAILY_LIMIT) {
          await pool.query(
            `UPDATE feature_usage SET count = count - 1 WHERE user_id = $1 AND feature = $2 AND usage_date = $3`,
            [user.id, TUTOR_FEATURE_KEY, today]
          );
          return res.status(429).json({
            error: "Daily tutor limit reached",
            upgradeRequired: true,
            usedToday: newCount - 1,
            dailyLimit: FREE_TIER_DAILY_LIMIT,
          });
        }
      }

      const conversationId = parseInt(req.params.id);
      const { content, contextType, contextData, language } = req.body;

      if (!content || typeof content !== "string" || content.trim().length === 0) {
        return res.status(400).json({ error: "Message content is required" });
      }

      const convResult = await pool.query(
        "SELECT * FROM tutor_conversations WHERE id = $1 AND user_id = $2",
        [conversationId, user.id]
      );
      if (convResult.rows.length === 0) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const conversation = convResult.rows[0];

      await pool.query(
        "INSERT INTO tutor_messages (conversation_id, role, content, created_at) VALUES ($1, $2, $3, NOW())",
        [conversationId, "user", content.trim()]
      );

      const historyResult = await pool.query(
        "SELECT role, content FROM tutor_messages WHERE conversation_id = $1 ORDER BY created_at ASC LIMIT 20",
        [conversationId]
      );

      const systemPrompt = buildSafetyPreamble()
        + buildContextPrompt(contextType || conversation.context_type, contextData || {})
        + getLanguageInstruction(language || conversation.language || "en");

      const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemPrompt },
        ...historyResult.rows.map((m: any) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: chatMessages,
        stream: true,
        max_completion_tokens: 2048,
        temperature: 0.7,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          fullResponse += delta;
          res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
        }
      }

      await pool.query(
        "INSERT INTO tutor_messages (conversation_id, role, content, created_at) VALUES ($1, $2, $3, NOW())",
        [conversationId, "assistant", fullResponse]
      );

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error in tutor chat:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "An error occurred while generating the response" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });
}
