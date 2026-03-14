import pg from "pg";
import { getProdPool, hasSeparateProdDb } from "./db";
import { runPreflightChecks, getPreflightCheckedPool } from "./environment-write-service";
import {
  MLT_DISCIPLINES,
  MLT_SUBDISCIPLINES,
  MLT_CANADA_BLUEPRINT_CATEGORIES,
  MLT_USA_CONTENT_AREAS,
} from "@shared/mlt-taxonomy";

const DISCIPLINE_WEIGHTS: Record<string, number> = {
  "Clinical Chemistry": 0.18,
  "Hematology": 0.16,
  "Microbiology": 0.14,
  "Immunohematology / Blood Banking": 0.10,
  "Hemostasis / Coagulation": 0.08,
  "Urinalysis & Body Fluids": 0.06,
  "Immunology / Serology": 0.06,
  "Molecular Diagnostics": 0.05,
  "Laboratory Operations & Quality Management": 0.05,
  "Phlebotomy & Specimen Collection": 0.04,
  "Point-of-Care Testing": 0.03,
  "Histotechnology": 0.02,
  "Cytotechnology": 0.01,
  "Mycology": 0.01,
  "Parasitology": 0.005,
  "Virology": 0.005,
};

const DIFFICULTY_DISTRIBUTION = { easy: 0.35, medium: 0.45, hard: 0.20 };
const COGNITIVE_DISTRIBUTION = { recall: 0.35, application: 0.45, analysis: 0.20 };
const SIMILARITY_THRESHOLD = 0.70;
const TOTAL_TARGET = 1400;
const BATCH_AI_SIZE = 10;

async function getOpenAI() {
  const OpenAI = (await import("openai")).default;
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function jaccardSimilarity(a: string, b: string): number {
  const wordsA = new Set(normalizeText(a).split(" "));
  const wordsB = new Set(normalizeText(b).split(" "));
  const intersection = new Set([...wordsA].filter((w) => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function difficultyLabel(n: number): string {
  if (n <= 2) return "easy";
  if (n === 3) return "medium";
  if (n === 4) return "hard";
  return "very_hard";
}

function resolveCountryTag(discipline: string, countryTrack: "canada" | "usa" | "both"): string {
  if (countryTrack === "canada") {
    const cat = MLT_CANADA_BLUEPRINT_CATEGORIES.find((c) => c.disciplines.includes(discipline as any));
    return `${cat?.name || discipline} [canada/csmls]`;
  } else if (countryTrack === "usa") {
    const area = MLT_USA_CONTENT_AREAS.find((c) => c.disciplines.includes(discipline as any));
    return `${area?.name || discipline} [usa/ascp]`;
  }
  return `${discipline} [both]`;
}

interface LessonInfo { title: string; slug: string; discipline: string; topicTitle: string; }

async function fetchLessons(pool: pg.Pool): Promise<LessonInfo[]> {
  try {
    const result = await pool.query(`SELECT title, slug, discipline, topic_title as "topicTitle" FROM mlt_lessons WHERE status = 'published' OR status = 'draft'`);
    return result.rows;
  } catch { return []; }
}

function findBestLessonMatch(discipline: string, subdiscipline: string, lessons: LessonInfo[]): LessonInfo | null {
  const disciplineLower = discipline.toLowerCase();
  const subdisciplineLower = (subdiscipline || "").toLowerCase();
  let bestMatch: LessonInfo | null = null;
  let bestScore = 0;
  for (const lesson of lessons) {
    let score = 0;
    const ld = (lesson.discipline || "").toLowerCase();
    const lt = (lesson.title || "").toLowerCase();
    const ltt = (lesson.topicTitle || "").toLowerCase();
    if (ld === disciplineLower || ld.includes(disciplineLower) || disciplineLower.includes(ld)) score += 3;
    if (subdisciplineLower) {
      for (const w of subdisciplineLower.split(/\s+/).filter(w => w.length > 3)) {
        if (lt.includes(w)) score += 2;
        if (ltt.includes(w)) score += 1;
      }
    }
    if (score > bestScore) { bestScore = score; bestMatch = lesson; }
  }
  return bestScore >= 2 ? bestMatch : null;
}

function generateFlashcards(q: any, lessonLink: string): Array<{ cardType: string; front: string; back: string; rationale: string; clinicalPearl: string | null }> {
  const cards: any[] = [];
  const correctOption = q.options?.[q.correctAnswer] || "";
  const ls = lessonLink ? `\n\n${lessonLink}` : "";
  let front = q.learningObjective || q.stem;
  if (front && front.length > 300) front = front.substring(0, 297) + "...";
  let back = correctOption;
  if (q.rationaleLong) {
    const sr = q.rationaleLong.length > 500 ? q.rationaleLong.substring(0, 497) + "..." : q.rationaleLong;
    back = `${correctOption}\n\nExplanation: ${sr}`;
  }
  if (q.clinicalPearls?.[0]) back += `\n\nKey Lab Pearl: ${q.clinicalPearls[0]}`;
  if (q.safetyNote) back += `\n\n⚠️ Safety/QC Note: ${q.safetyNote}`;
  back += ls;
  cards.push({ cardType: "definition", front, back, rationale: (q.rationaleLong || "").substring(0, 500), clinicalPearl: q.clinicalPearls?.[0] || null });
  if (q.clinicalPearls?.length > 0) {
    cards.push({ cardType: "clinical_decision", front: `Clinical decision: ${q.subdiscipline || q.discipline} - What is the key clinical pearl?`, back: q.clinicalPearls[0] + ls, rationale: q.clinicalPearls.slice(1).join(" | "), clinicalPearl: q.clinicalPearls[0] });
  }
  if (q.safetyNote) {
    cards.push({ cardType: "red_flag", front: `Red Flag: ${q.subdiscipline || q.discipline} - What safety concern must you remember?`, back: q.safetyNote + ls, rationale: `From: ${q.blueprintCategory || q.discipline}`, clinicalPearl: null });
  }
  return cards;
}

function buildPrompt(discipline: string, count: number, subdiscipline?: string) {
  const subdisciplines = MLT_SUBDISCIPLINES[discipline] || [];
  const easyCount = Math.round(count * 0.35);
  const mediumCount = Math.round(count * 0.45);
  const hardCount = Math.max(1, count - easyCount - mediumCount);

  const systemPrompt = `You are an expert Medical Laboratory Technologist (MLT/MLS) exam item writer with deep expertise in ${discipline}. You create CSMLS and ASCP Board of Certification-level exam questions that test real clinical laboratory knowledge through realistic patient vignettes.

Questions should be applicable to both Canadian CSMLS and American ASCP certification exams.

CRITICAL VIGNETTE REQUIREMENTS — EVERY question stem MUST include:
1. Patient demographics: age and sex (e.g., "A 42-year-old female...")
2. Specimen type: what was collected (e.g., "EDTA whole blood", "clean-catch midstream urine")
3. Clinical context: presenting symptoms, reason for testing, or clinical history
4. Laboratory data: specific lab values, test results, analyzer readings, or QC data with units
5. Where applicable: analyzer/instrument context, microscopic findings, culture results, QC observations

CRITICAL RULES:
- Every question MUST present a realistic clinical laboratory vignette
- Include specific numeric lab values with proper units
- NEVER use "all of the above" or "none of the above"
- All 4 options must be plausible
- Rationales must be at least 150 words with distractor explanations
- Include instrument-specific details where relevant`;

  const userPrompt = `Generate exactly ${count} unique, high-quality MLT exam vignette questions for: ${discipline}${subdiscipline ? ` (subtopic: ${subdiscipline})` : ""}.

SUBTOPICS: ${subdiscipline ? subdiscipline : subdisciplines.join(", ")}

DIFFICULTY: Easy(2): ${easyCount}, Medium(3): ${mediumCount}, Hard(4): ${hardCount}

Return a JSON array where each question has:
{
  "stem": "A [age]-year-old [sex] patient [clinical scenario]...",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "rationaleLong": "150+ word rationale with distractor explanations",
  "discipline": "${discipline}",
  "subdiscipline": "subtopic",
  "difficulty": 2-4,
  "cognitiveLevel": "recall|application|analysis",
  "tags": ["tag1", "tag2"],
  "seoKeywords": ["kw1", "kw2"],
  "learningObjective": "...",
  "examTrap": "...",
  "safetyNote": "... or null",
  "distractorRationales": ["Why A...", "Why B...", "Why C...", "Why D..."],
  "clinicalPearls": ["Pearl 1", "Pearl 2"]
}

Return ONLY the JSON array.`;

  return { systemPrompt, userPrompt };
}

function validateQuestion(q: any): boolean {
  if (!q.stem || q.stem.length < 30) return false;
  if (!q.options || !Array.isArray(q.options) || q.options.length < 4) return false;
  if (q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) return false;
  if (!q.rationaleLong || q.rationaleLong.split(/\s+/).length < 30) return false;
  if (!q.discipline) return false;
  const opts = q.options.map((o: string) => (o || "").toLowerCase());
  if (opts.some((o: string) => o.includes("all of the above") || o.includes("none of the above"))) return false;
  return true;
}

function planDistribution(total: number): Array<{ discipline: string; count: number }> {
  const plan: Array<{ discipline: string; count: number }> = [];
  let remaining = total;
  const totalWeight = Object.values(DISCIPLINE_WEIGHTS).reduce((a, b) => a + b, 0);
  for (const [discipline, weight] of Object.entries(DISCIPLINE_WEIGHTS)) {
    const target = Math.max(1, Math.round(total * (weight / totalWeight)));
    if (remaining > 0) {
      const count = Math.min(target, remaining);
      plan.push({ discipline, count });
      remaining -= count;
    }
    if (remaining <= 0) break;
  }
  if (remaining > 0 && plan.length > 0) plan[0].count += remaining;
  return plan;
}

async function main() {
  console.log(`[MLT 1400] Starting generation of ${TOTAL_TARGET} MLT exam questions`);
  console.log(`[MLT 1400] Timestamp: ${new Date().toISOString()}`);

  const envTarget = hasSeparateProdDb() ? "production" : "development";
  const prodPool = await getPreflightCheckedPool(envTarget as any, "MLT-1400");
  const openai = await getOpenAI();

  await prodPool.query(`
    CREATE TABLE IF NOT EXISTS mlt_generation_batches (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      country_track TEXT NOT NULL DEFAULT 'both',
      requested_count INTEGER NOT NULL,
      generated_count INTEGER DEFAULT 0,
      accepted_count INTEGER DEFAULT 0,
      rejected_count INTEGER DEFAULT 0,
      tokens_used INTEGER DEFAULT 0,
      discipline TEXT,
      discipline_breakdown JSONB,
      difficulty_breakdown JSONB,
      cognitive_breakdown JSONB,
      rejection_reasons JSONB,
      status TEXT DEFAULT 'running',
      error_message TEXT,
      triggered_by TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMP
    )
  `);

  await prodPool.query(`UPDATE mlt_generation_batches SET status = 'cancelled' WHERE status = 'running'`);

  const existingStemsResult = await prodPool.query(`SELECT stem FROM allied_questions WHERE career_type = 'mlt' AND status != 'archived'`);
  const existingStems: string[] = existingStemsResult.rows.map((r: any) => r.stem);
  console.log(`[MLT 1400] Existing MLT stems in production: ${existingStems.length}`);

  const lessons = await fetchLessons(prodPool);
  console.log(`[MLT 1400] MLT lessons found: ${lessons.length}`);

  const plan = planDistribution(TOTAL_TARGET);
  console.log(`[MLT 1400] Discipline distribution plan:`);
  for (const p of plan) console.log(`  - ${p.discipline}: ${p.count}`);

  const batchJobs: Array<{ discipline: string; count: number; subdiscipline?: string }> = [];
  for (const item of plan) {
    let rem = item.count;
    const subs = MLT_SUBDISCIPLINES[item.discipline] || [item.discipline];
    let subIdx = 0;
    while (rem > 0) {
      const thisSize = Math.min(rem, BATCH_AI_SIZE);
      batchJobs.push({ discipline: item.discipline, count: thisSize, subdiscipline: subs[subIdx % subs.length] });
      subIdx++;
      rem -= thisSize;
    }
  }

  console.log(`[MLT 1400] Total AI batches to run: ${batchJobs.length}`);

  let totalAccepted = 0;
  let totalRejected = 0;
  let totalFlashcards = 0;
  let totalLessonLinks = 0;
  let totalTokens = 0;
  let failedBatches = 0;
  const batchStems: string[] = [];

  for (let i = 0; i < batchJobs.length; i++) {
    const job = batchJobs[i];
    const batchNum = i + 1;

    if (batchNum % 10 === 0 || batchNum === 1) {
      console.log(`[MLT 1400] Progress: Batch ${batchNum}/${batchJobs.length} | Accepted: ${totalAccepted}/${TOTAL_TARGET} | Flashcards: ${totalFlashcards}`);
    }

    try {
      const batchRes = await prodPool.query(
        `INSERT INTO mlt_generation_batches (country_track, requested_count, discipline, status, triggered_by, created_at)
         VALUES ('both', $1, $2, 'running', 'script-1400', NOW()) RETURNING id`,
        [job.count, job.discipline]
      );
      const batchId = batchRes.rows[0].id;

      const { systemPrompt, userPrompt } = buildPrompt(job.discipline, job.count, job.subdiscipline);

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: Math.min(Math.max(4000, job.count * 1200), 16000),
        temperature: 0.75,
      });

      const tokens = response.usage?.total_tokens || 0;
      totalTokens += tokens;
      const content = response.choices[0]?.message?.content || "";

      let parsed: any[] | null = null;
      try {
        const arrMatch = content.match(/\[[\s\S]*\]/);
        if (arrMatch) parsed = JSON.parse(arrMatch[0]);
      } catch {}

      if (!parsed || !Array.isArray(parsed)) {
        failedBatches++;
        await prodPool.query(`UPDATE mlt_generation_batches SET status = 'failed', error_message = 'parse_error', completed_at = NOW() WHERE id = $1`, [batchId]);
        continue;
      }

      const canadaCategory = MLT_CANADA_BLUEPRINT_CATEGORIES.find((c) => c.disciplines.includes(job.discipline as any));
      const usaArea = MLT_USA_CONTENT_AREAS.find((c) => c.disciplines.includes(job.discipline as any));

      let batchAccepted = 0;
      let batchRejected = 0;
      let batchFlashcards = 0;
      let batchLessonLinks = 0;

      for (const q of parsed) {
        if (!validateQuestion(q)) {
          batchRejected++;
          totalRejected++;
          continue;
        }

        let isDuplicate = false;
        for (const es of existingStems) {
          if (jaccardSimilarity(q.stem, es) > SIMILARITY_THRESHOLD) { isDuplicate = true; break; }
        }
        if (!isDuplicate) {
          for (const bs of batchStems) {
            if (jaccardSimilarity(q.stem, bs) > SIMILARITY_THRESHOLD) { isDuplicate = true; break; }
          }
        }
        if (isDuplicate) {
          batchRejected++;
          totalRejected++;
          continue;
        }

        existingStems.push(q.stem);
        batchStems.push(q.stem);

        const lessonMatch = findBestLessonMatch(q.discipline || job.discipline, q.subdiscipline || job.subdiscipline || "", lessons);
        let rationale = q.rationaleLong || "";
        let lessonLinkText = "";
        if (lessonMatch) {
          rationale += `\n\nTo review this concept, see the NurseNest lesson: ${lessonMatch.title} → /mlt/lessons/${lessonMatch.slug}`;
          lessonLinkText = `To review this concept, see: ${lessonMatch.title} → /mlt/lessons/${lessonMatch.slug}`;
          batchLessonLinks++;
          totalLessonLinks++;
        }

        const subtopic = `${q.subdiscipline || q.subtopic || job.discipline} ${resolveCountryTag(q.discipline || job.discipline, "both")}`;
        const blueprintCategory = q.discipline || job.discipline;
        const options = (q.options || []).slice(0, 4);
        const correctAnswer = typeof q.correctAnswer === "number" && q.correctAnswer < options.length ? q.correctAnswer : 0;
        const difficulty = q.difficulty >= 1 && q.difficulty <= 5 ? q.difficulty : 3;
        const cognitiveLevel = ["recall", "application", "analysis"].includes(q.cognitiveLevel) ? q.cognitiveLevel : "application";

        try {
          const insertRes = await prodPool.query(
            `INSERT INTO allied_questions (
              id, career_type, stem, options, correct_answer, rationale_long,
              learning_objective, blueprint_category, subtopic, difficulty,
              cognitive_level, question_type, exam_trap, clinical_pearls,
              safety_note, distractor_rationales, is_free, status,
              batch_id, created_at
            ) VALUES (
              gen_random_uuid(), 'mlt', $1, $2, $3, $4,
              $5, $6, $7, $8,
              $9, 'mcq', $10, $11,
              $12, $13, false, 'published',
              $14, NOW()
            ) RETURNING id`,
            [
              q.stem, JSON.stringify(options), correctAnswer, rationale,
              q.learningObjective || "", blueprintCategory, subtopic, difficulty,
              cognitiveLevel, q.examTrap || null, JSON.stringify(q.clinicalPearls || []),
              q.safetyNote || null, JSON.stringify((q.distractorRationales || []).slice(0, 4)),
              batchId,
            ]
          );
          const questionId = insertRes.rows[0].id;
          batchAccepted++;
          totalAccepted++;

          const flashcardQ = {
            stem: q.stem, options, correctAnswer, rationaleLong: rationale,
            learningObjective: q.learningObjective || "", discipline: q.discipline || job.discipline,
            subdiscipline: q.subdiscipline || job.subdiscipline || "", blueprintCategory,
            clinicalPearls: q.clinicalPearls || [], safetyNote: q.safetyNote || null,
          };
          const cards = generateFlashcards(flashcardQ, lessonLinkText);
          for (const card of cards) {
            try {
              await prodPool.query(
                `INSERT INTO allied_flashcards (career_type, question_id, card_type, front, back, rationale, clinical_pearl, blueprint_category, subtopic)
                 VALUES ('mlt', $1, $2, $3, $4, $5, $6, $7, $8)`,
                [questionId, card.cardType, card.front, card.back, card.rationale, card.clinicalPearl, blueprintCategory, subtopic]
              );
              batchFlashcards++;
              totalFlashcards++;
            } catch {}
          }
        } catch (insertErr: any) {
          console.error(`[MLT 1400] Insert error: ${insertErr.message}`);
          batchRejected++;
          totalRejected++;
        }
      }

      await prodPool.query(
        `UPDATE mlt_generation_batches SET status = 'completed', accepted_count = $1, rejected_count = $2, tokens_used = $3, completed_at = NOW() WHERE id = $4`,
        [batchAccepted, batchRejected, tokens, batchId]
      );

    } catch (err: any) {
      failedBatches++;
      console.error(`[MLT 1400] Batch ${batchNum} failed (${job.discipline}): ${err.message}`);
    }

    if (i < batchJobs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\n[MLT 1400] === FINAL SUMMARY ===`);
  console.log(`[MLT 1400] Total Accepted: ${totalAccepted}/${TOTAL_TARGET}`);
  console.log(`[MLT 1400] Total Rejected: ${totalRejected}`);
  console.log(`[MLT 1400] Total Flashcards: ${totalFlashcards}`);
  console.log(`[MLT 1400] Total Lesson Links: ${totalLessonLinks}`);
  console.log(`[MLT 1400] Failed Batches: ${failedBatches}/${batchJobs.length}`);
  console.log(`[MLT 1400] Total Tokens: ${totalTokens}`);
  console.log(`[MLT 1400] Completed at: ${new Date().toISOString()}`);

  try {
    await prodPool.query(
      `INSERT INTO mlt_generation_batches (country_track, requested_count, discipline, status, triggered_by, generated_count, accepted_count, rejected_count, tokens_used, discipline_breakdown, created_at, completed_at)
       VALUES ('both', $1, 'FULL_1400_RUN', 'completed', 'script-1400', $2, $3, $4, $5, $6, NOW(), NOW())`,
      [TOTAL_TARGET, totalAccepted + totalRejected, totalAccepted, totalRejected, totalTokens,
       JSON.stringify({ totalAccepted, totalRejected, totalFlashcards, totalLessonLinks, failedBatches })]
    );
  } catch {}

  await prodPool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("[MLT 1400] Fatal error:", err);
  process.exit(1);
});
