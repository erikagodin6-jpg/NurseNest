import { db } from "./storage";
import { examQuestions, flashcardBank, generationJobs, verificationReports, aiCache } from "@shared/schema";
import { eq, and, sql, inArray, desc } from "drizzle-orm";
import OpenAI from "openai";
import crypto from "crypto";

const THRESHOLD_COUNT = 4000;
const HIGH_RATE = 100;
const LOW_RATE = 25;
const BATCH_SIZE = 20;
const TIERS = ["rpn", "rn", "np"] as const;
const CONTENT_TYPES = ["exam_questions", "flashcards"] as const;

const BODY_SYSTEMS = [
  "Cardiovascular", "Respiratory", "Neurological", "Gastrointestinal",
  "Renal/Urinary", "Endocrine", "Musculoskeletal", "Integumentary",
  "Hematological", "Immunological", "Reproductive", "Mental Health",
  "Pediatrics", "Maternal/Newborn"
];

const MAX_TOPIC_WEIGHT = 0.15;

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

function hashContent(text: string): string {
  return crypto.createHash("sha256").update(text.toLowerCase().trim()).digest("hex");
}

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

export async function computeTargets() {
  const targets: Array<{
    tier: string;
    contentType: string;
    currentCount: number;
    rate: number;
    mode: string;
  }> = [];

  for (const tier of TIERS) {
    const [qCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(examQuestions)
      .where(and(eq(examQuestions.tier, tier), inArray(examQuestions.status, ["approved", "published"])));

    const [fCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(flashcardBank)
      .where(and(eq(flashcardBank.tier, tier), inArray(flashcardBank.status, ["approved", "published"])));

    const qCurrent = qCount?.count ?? 0;
    const fCurrent = fCount?.count ?? 0;

    targets.push({
      tier,
      contentType: "exam_questions",
      currentCount: qCurrent,
      rate: qCurrent < THRESHOLD_COUNT ? HIGH_RATE : LOW_RATE,
      mode: qCurrent < THRESHOLD_COUNT ? "high_rate" : "low_rate",
    });

    targets.push({
      tier,
      contentType: "flashcards",
      currentCount: fCurrent,
      rate: fCurrent < THRESHOLD_COUNT ? HIGH_RATE : LOW_RATE,
      mode: fCurrent < THRESHOLD_COUNT ? "high_rate" : "low_rate",
    });
  }

  return targets;
}

function distributeTopics(count: number): Array<{ system: string; count: number }> {
  const maxPerTopic = Math.ceil(count * MAX_TOPIC_WEIGHT);
  const base = Math.floor(count / BODY_SYSTEMS.length);
  let remainder = count - base * BODY_SYSTEMS.length;

  const shuffled = [...BODY_SYSTEMS].sort(() => Math.random() - 0.5);
  return shuffled.map((system) => {
    let allocated = base;
    if (remainder > 0) {
      allocated++;
      remainder--;
    }
    return { system, count: Math.min(allocated, maxPerTopic) };
  });
}

export async function createDailyJobs(date?: string) {
  const runDate = date || todayString();
  const created: string[] = [];

  for (const tier of TIERS) {
    for (const contentType of CONTENT_TYPES) {
      const existing = await db
        .select()
        .from(generationJobs)
        .where(
          and(
            eq(generationJobs.runDate, runDate),
            eq(generationJobs.tier, tier),
            eq(generationJobs.contentType, contentType)
          )
        );

      if (existing.length > 0) continue;

      const targets = await computeTargets();
      const target = targets.find((t) => t.tier === tier && t.contentType === contentType)!;
      const topicPlan = distributeTopics(target.rate);

      const [job] = await db
        .insert(generationJobs)
        .values({
          runDate,
          contentType,
          tier,
          targetCount: target.rate,
          generatedCount: 0,
          mode: target.mode,
          topicPlanJson: topicPlan,
          status: "queued",
        })
        .returning();

      created.push(job.id);
    }
  }

  return created;
}

async function generateExamQuestionsBatch(
  tier: string,
  system: string,
  count: number
): Promise<Array<{ stem: string; options: any; correctAnswer: any; rationale: string; difficulty: number; topic: string; bodySystem: string }>> {
  const openai = getOpenAI();
  const tierLabel = tier.toUpperCase();
  const scopeNote = tier === "rpn" ? "Practical nursing scope (LPN/RPN)" : tier === "rn" ? "Registered Nurse scope" : "Nurse Practitioner scope with advanced pharmacology and diagnostics";

  const prompt = `Generate ${count} unique NCLEX-style multiple-choice exam questions for ${tierLabel} nursing students about the ${system} body system.

Scope: ${scopeNote}

For each question provide:
- stem: The question text (clinical scenario with patient details)
- options: Array of exactly 4 answer choices labeled A-D
- correctAnswer: The correct option letter
- rationale: Detailed clinical rationale explaining why the correct answer is right and why others are wrong
- difficulty: 1-5 scale (1=easy recall, 3=application, 5=complex analysis)
- topic: Specific topic within ${system}

Return JSON array. Each question must be clinically accurate, unique, and test critical thinking.`;

  try {
    const cacheKey = hashContent(`eq_${tier}_${system}_${count}_${todayString()}`);
    const cached = await db.select().from(aiCache).where(eq(aiCache.cacheKey, cacheKey));
    if (cached.length > 0) {
      return cached[0].outputJson as any;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content || "{}";
    let parsed;
    try {
      const raw = JSON.parse(content);
      parsed = Array.isArray(raw) ? raw : raw.questions || raw.items || [raw];
    } catch {
      console.error("[Pipeline] Failed to parse AI response for exam questions");
      return [];
    }

    const results = parsed.map((q: any) => ({
      stem: q.stem || q.question || "",
      options: q.options || [],
      correctAnswer: q.correctAnswer || q.correct_answer || "A",
      rationale: q.rationale || "",
      difficulty: q.difficulty || 3,
      topic: q.topic || system,
      bodySystem: system,
    }));

    await db.insert(aiCache).values({ cacheKey, outputJson: results }).onConflictDoNothing();

    return results;
  } catch (error) {
    console.error(`[Pipeline] Error generating exam questions for ${tier}/${system}:`, error);
    return [];
  }
}

async function generateFlashcardsBatch(
  tier: string,
  system: string,
  count: number
): Promise<Array<{ front: string; back: string; topicTag: string }>> {
  const openai = getOpenAI();
  const tierLabel = tier.toUpperCase();

  const prompt = `Generate ${count} nursing study flashcards for ${tierLabel} students about the ${system} body system.

For each flashcard provide:
- front: A focused study question or term
- back: A concise, accurate answer with key clinical details
- topicTag: Specific topic within ${system}

Return JSON array. Each card must be clinically accurate and appropriate for ${tierLabel} scope.`;

  try {
    const cacheKey = hashContent(`fc_${tier}_${system}_${count}_${todayString()}`);
    const cached = await db.select().from(aiCache).where(eq(aiCache.cacheKey, cacheKey));
    if (cached.length > 0) {
      return cached[0].outputJson as any;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content || "{}";
    let parsed;
    try {
      const raw = JSON.parse(content);
      parsed = Array.isArray(raw) ? raw : raw.flashcards || raw.cards || raw.items || [raw];
    } catch {
      console.error("[Pipeline] Failed to parse AI response for flashcards");
      return [];
    }

    const results = parsed.map((f: any) => ({
      front: f.front || f.question || "",
      back: f.back || f.answer || "",
      topicTag: f.topicTag || f.topic_tag || f.topic || system,
    }));

    await db.insert(aiCache).values({ cacheKey, outputJson: results }).onConflictDoNothing();

    return results;
  } catch (error) {
    console.error(`[Pipeline] Error generating flashcards for ${tier}/${system}:`, error);
    return [];
  }
}

export async function verifyItem(
  entityType: "exam_question" | "flashcard",
  entityId: string,
  content: string
): Promise<{ verdict: string; confidence: number; issues: string[] }> {
  const openai = getOpenAI();

  const prompt = `You are a clinical nursing content reviewer. Evaluate this ${entityType} for accuracy and safety.

Content:
${content}

Check for:
1. Unsafe medication dosing errors
2. Incorrect lab value ranges
3. Scope of practice violations
4. Clinical hallucinations or inaccurate pathophysiology
5. Ambiguous or misleading answer options

Return JSON with:
- verdict: "pass" | "pass_with_edits" | "fail" | "needs_human_review"
- confidence: 0.0 to 1.0
- issues: array of specific issues found (empty if none)`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 1000,
    });

    const raw = JSON.parse(response.choices[0]?.message?.content || "{}");

    const result = {
      verdict: raw.verdict || "needs_human_review",
      confidence: raw.confidence || 0.5,
      issues: raw.issues || [],
    };

    await db.insert(verificationReports).values({
      entityType,
      entityId,
      verdict: result.verdict,
      confidenceScore: result.confidence,
      issuesJson: result.issues,
      modelVersion: "gpt-4o-mini",
    });

    return result;
  } catch (error) {
    console.error(`[Pipeline] Verification error for ${entityType}/${entityId}:`, error);
    return { verdict: "needs_human_review", confidence: 0, issues: ["Verification API error"] };
  }
}

export async function runGenerationJob(jobId: string) {
  const [job] = await db.select().from(generationJobs).where(eq(generationJobs.id, jobId));
  if (!job) throw new Error(`Job ${jobId} not found`);
  if (job.status !== "queued") return { skipped: true, reason: `Job status is ${job.status}` };

  console.log(`[Pipeline] Job ${jobId}: starting generation → targeting DEVELOPMENT database`);
  await db.update(generationJobs).set({ status: "running" }).where(eq(generationJobs.id, jobId));

  const topicPlan = (job.topicPlanJson as Array<{ system: string; count: number }>) || [];
  let totalGenerated = 0;
  let totalFailed = 0;

  try {
    for (const { system, count } of topicPlan) {
      if (count <= 0) continue;

      const batches = Math.ceil(count / BATCH_SIZE);
      for (let b = 0; b < batches; b++) {
        const batchCount = Math.min(BATCH_SIZE, count - b * BATCH_SIZE);

        if (job.contentType === "exam_questions") {
          const questions = await generateExamQuestionsBatch(job.tier, system, batchCount);

          for (const q of questions) {
            const contentHash = hashContent(q.stem);
            try {
              const [inserted] = await db
                .insert(examQuestions)
                .values({
                  tier: job.tier,
                  exam: `${job.tier.toUpperCase()}-CAT`,
                  questionType: "multiple_choice",
                  status: "needs_review",
                  stem: q.stem,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  rationale: q.rationale,
                  difficulty: q.difficulty,
                  bodySystem: q.bodySystem,
                  topic: q.topic,
                  stemHash: contentHash,
                  regionScope: "BOTH",
                })
                .onConflictDoNothing()
                .returning();

              if (inserted) {
                totalGenerated++;
                await verifyItem("exam_question", inserted.id, `${q.stem}\n${JSON.stringify(q.options)}\nAnswer: ${q.correctAnswer}\n${q.rationale}`);
              }
            } catch (err: any) {
              if (err.code === "23505") continue;
              totalFailed++;
              console.error(`[Pipeline] Insert error:`, err.message);
            }
          }
        } else {
          const flashcards = await generateFlashcardsBatch(job.tier, system, batchCount);

          for (const f of flashcards) {
            const contentHash = hashContent(f.front);
            try {
              const [inserted] = await db
                .insert(flashcardBank)
                .values({
                  tier: job.tier,
                  topicTag: f.topicTag,
                  front: f.front,
                  back: f.back,
                  status: "needs_review",
                  contentHash,
                })
                .onConflictDoNothing()
                .returning();

              if (inserted) {
                totalGenerated++;
                await verifyItem("flashcard", inserted.id, `Front: ${f.front}\nBack: ${f.back}`);
              }
            } catch (err: any) {
              if (err.code === "23505") continue;
              totalFailed++;
              console.error(`[Pipeline] Insert error:`, err.message);
            }
          }
        }
      }
    }

    await db.update(generationJobs).set({
      status: totalFailed > totalGenerated ? "partial" : "done",
      generatedCount: totalGenerated,
      completedAt: new Date(),
    }).where(eq(generationJobs.id, jobId));

    console.log(`[Pipeline] Job ${jobId} complete: ${totalGenerated} generated, ${totalFailed} failed`);
    return { generated: totalGenerated, failed: totalFailed };
  } catch (error) {
    await db.update(generationJobs).set({ status: "failed", completedAt: new Date() }).where(eq(generationJobs.id, jobId));
    console.error(`[Pipeline] Job ${jobId} failed:`, error);
    throw error;
  }
}

export async function runManualGeneration(tier: string, contentType: string, count: number) {
  const topicPlan = distributeTopics(count);
  const targets = await computeTargets();
  const target = targets.find((t) => t.tier === tier && t.contentType === contentType);

  const [job] = await db
    .insert(generationJobs)
    .values({
      runDate: todayString(),
      contentType,
      tier,
      targetCount: count,
      generatedCount: 0,
      mode: target?.mode || "low_rate",
      topicPlanJson: topicPlan,
      status: "queued",
    })
    .returning();

  return runGenerationJob(job.id);
}

export async function getPipelineStatus() {
  const targets = await computeTargets();

  const [recentJobs] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(generationJobs)
    .where(eq(generationJobs.runDate, todayString()));

  return {
    threshold: THRESHOLD_COUNT,
    highRate: HIGH_RATE,
    lowRate: LOW_RATE,
    banks: targets,
    todayJobCount: recentJobs?.count ?? 0,
    nextScheduledRun: "02:00 America/Toronto",
  };
}
