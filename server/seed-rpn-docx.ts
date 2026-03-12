import fs from "fs";
import path from "path";
import crypto from "crypto";
import mammoth from "mammoth";
import { pool } from "./storage";

const DIFFICULTY_MAP: Record<string, number> = { easy: 2, moderate: 3, hard: 4 };
const ANSWER_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };
const EXAM_TO_TIER: Record<string, string> = {
  "NCLEX-PN": "rpn",
  "REx-PN": "rpn",
};
const COUNTRY_TO_REGION: Record<string, string> = {
  US: "US",
  Canada: "CAN",
};

function stemHash(text: string): string {
  const normalized = text.trim().toLowerCase().replace(/\s+/g, " ");
  return crypto.createHash("md5").update(normalized).digest("hex");
}

function normalizeQuestionType(raw: string): string {
  if (!raw) return "standard";
  let qt = raw.trim().toLowerCase().replace(/_/g, " ");
  if (qt.includes("|")) qt = qt.split("|")[0].trim();
  return qt;
}

interface ParsedQuestion {
  stem: string;
  options: string[];
  correctAnswer: number[];
  rationale: string;
  difficulty: number;
  bodySystem: string | null;
  topic: string | null;
  subtopic: string | null;
  questionType: string;
  exam: string;
  tier: string;
  regionScope: string;
  stemHashVal: string;
}

function parseStandardQuestion(q: any): ParsedQuestion | null {
  if (!q.question || typeof q.question !== "string" || q.question.trim().length < 10) return null;
  if (!q.option_a || !q.option_b || !q.option_c || !q.option_d) return null;
  if (!q.rationale || typeof q.rationale !== "string") return null;

  const options = [q.option_a.trim(), q.option_b.trim(), q.option_c.trim(), q.option_d.trim()];
  if (q.option_e) options.push(q.option_e.trim());

  let correctAnswer: number[];
  if (typeof q.correct_answer === "string") {
    const upper = q.correct_answer.toUpperCase();
    if (ANSWER_INDEX[upper] !== undefined) {
      correctAnswer = [ANSWER_INDEX[upper]];
    } else {
      return null;
    }
  } else {
    return null;
  }

  const exam = q.exam || "NCLEX-PN";
  const country = q.country || "US";
  const tier = EXAM_TO_TIER[exam] || "rpn";
  const regionScope = COUNTRY_TO_REGION[country] || "BOTH";
  const diff = typeof q.difficulty === "string" ? DIFFICULTY_MAP[q.difficulty.toLowerCase()] || 3 : 3;

  return {
    stem: q.question.trim(),
    options,
    correctAnswer,
    rationale: q.rationale.trim(),
    difficulty: diff,
    bodySystem: q.category || null,
    topic: q.client_needs || null,
    subtopic: q.topic || null,
    questionType: normalizeQuestionType(q.question_type),
    exam,
    tier,
    regionScope,
    stemHashVal: stemHash(q.question),
  };
}

async function seedRpnDocx() {
  const filePath = path.resolve("attached_assets/rpn_questions_1773276093822.docx");

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }

  const result = await mammoth.extractRawText({ path: filePath });
  const content = result.value;

  let data: any;
  try {
    data = JSON.parse(content);
  } catch (e) {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to find JSON in extracted text");
      process.exit(1);
    }
    try {
      data = JSON.parse(jsonMatch[0]);
    } catch (e2) {
      console.error("Failed to parse extracted JSON:", e2);
      process.exit(1);
    }
  }

  const allRaw: any[] = [];
  for (const key of Object.keys(data)) {
    if (Array.isArray(data[key])) {
      console.log(`Batch "${key}": ${data[key].length} questions`);
      allRaw.push(...data[key]);
    }
  }
  console.log(`Total raw questions: ${allRaw.length}`);

  const allParsed: ParsedQuestion[] = [];
  let parseErrors = 0;

  for (const q of allRaw) {
    const parsed = parseStandardQuestion(q);
    if (parsed) {
      allParsed.push(parsed);
    } else {
      parseErrors++;
      console.warn("Parse error for question:", q.question?.substring(0, 60));
    }
  }
  console.log(`Parsed successfully: ${allParsed.length}, parse errors: ${parseErrors}`);

  const seenHashes = new Set<string>();
  const deduplicated: ParsedQuestion[] = [];
  for (const q of allParsed) {
    const key = `${q.stemHashVal}_${q.exam}`;
    if (!seenHashes.has(key)) {
      seenHashes.add(key);
      deduplicated.push(q);
    }
  }
  console.log(`After in-batch dedup: ${deduplicated.length}`);

  let inserted = 0;
  let skipped = 0;
  let dbErrors = 0;

  for (const q of deduplicated) {
    try {
      const existing = await pool.query(
        `SELECT id FROM exam_questions WHERE stem_hash = $1 AND exam = $2`,
        [q.stemHashVal, q.exam]
      );
      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }

      await pool.query(
        `INSERT INTO exam_questions (
          tier, exam, question_type, status, published_at, stem, options, correct_answer,
          rationale, difficulty, body_system, topic, subtopic, region_scope, career_type,
          stem_hash
        ) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10, $11, $12, $13, 'nursing', $14)`,
        [
          q.tier,
          q.exam,
          q.questionType,
          "published",
          q.stem,
          JSON.stringify(q.options),
          JSON.stringify(q.correctAnswer),
          q.rationale,
          q.difficulty,
          q.bodySystem,
          q.topic,
          q.subtopic,
          q.regionScope,
          q.stemHashVal,
        ]
      );
      inserted++;
    } catch (dbErr: any) {
      dbErrors++;
      console.error(`DB error: ${dbErr.message.substring(0, 120)}`);
    }
  }

  console.log(`\n=== Results ===`);
  console.log(`Total raw: ${allRaw.length}`);
  console.log(`Parsed: ${allParsed.length}`);
  console.log(`After dedup: ${deduplicated.length}`);
  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped (existing): ${skipped}`);
  console.log(`DB errors: ${dbErrors}`);

}

seedRpnDocx().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
