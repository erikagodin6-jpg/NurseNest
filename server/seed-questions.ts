import fs from "fs";
import path from "path";
import crypto from "crypto";
import { pool } from "./storage";

const DIFFICULTY_MAP: Record<string, number> = { easy: 2, moderate: 3, hard: 4 };
const ANSWER_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };
const EXAM_TO_TIER: Record<string, string> = {
  "NCLEX-PN": "rpn",
  "REx-PN": "rpn",
  "NCLEX-RN": "rn",
  "AANP": "np",
  "ANCC": "np",
  PN: "rpn",
};
const COUNTRY_TO_REGION: Record<string, string> = {
  US: "US",
  Canada: "CAN",
  Both: "BOTH",
};

function normalizeExam(raw: string): string[] {
  if (!raw) return ["NCLEX-PN"];
  const trimmed = raw.trim();
  if (trimmed === "PN") return ["NCLEX-PN", "REx-PN"];
  if (trimmed.includes("|")) {
    return trimmed.split("|").map((e) => e.trim()).filter(Boolean);
  }
  return [trimmed];
}

function normalizeCountry(raw: string): string[] {
  if (!raw) return ["US"];
  const trimmed = raw.trim();
  if (trimmed === "Both") return ["US", "Canada"];
  if (trimmed.includes("|")) {
    return trimmed.split("|").map((c) => c.trim()).filter(Boolean);
  }
  return [trimmed];
}

function normalizeQuestionType(raw: string): string {
  if (!raw) return "standard";
  let qt = raw.trim().toLowerCase().replace(/_/g, " ");
  if (qt.includes("|")) qt = qt.split("|")[0].trim();
  return qt;
}

function stemHash(text: string): string {
  const normalized = text.trim().toLowerCase().replace(/\s+/g, " ");
  return crypto.createHash("md5").update(normalized).digest("hex");
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
  scenario: string | null;
  exhibitData: any;
}

function parseStandardQuestion(q: any, exam: string, country: string): ParsedQuestion | null {
  if (!q.question || typeof q.question !== "string" || q.question.trim().length < 10) return null;
  if (!q.option_a || !q.option_b || !q.option_c || !q.option_d) return null;
  if (!q.rationale || typeof q.rationale !== "string") return null;

  const options = [q.option_a.trim(), q.option_b.trim(), q.option_c.trim(), q.option_d.trim()];
  if (q.option_e) options.push(q.option_e.trim());
  if (q.option_f) options.push(q.option_f.trim());

  let correctAnswer: number[];
  if (Array.isArray(q.correct_answer)) {
    correctAnswer = q.correct_answer.map((a: string) => ANSWER_INDEX[a.toUpperCase()]).filter((i: number) => i !== undefined);
  } else if (typeof q.correct_answer === "string") {
    const upper = q.correct_answer.toUpperCase();
    if (ANSWER_INDEX[upper] !== undefined) {
      correctAnswer = [ANSWER_INDEX[upper]];
    } else {
      return null;
    }
  } else {
    return null;
  }

  if (correctAnswer.length === 0) return null;

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
    scenario: null,
    exhibitData: null,
  };
}

function parseBowtieQuestion(q: any, exam: string, country: string): ParsedQuestion | null {
  if (!q.scenario || typeof q.scenario !== "string" || q.scenario.trim().length < 10) return null;
  if (!q.condition_options || !q.action_options || !q.monitor_options) return null;
  if (!q.correct_condition || !q.correct_action || !q.correct_monitor) return null;

  const stemText = `Bowtie: ${q.scenario.trim()}`;
  const allOptions = [
    ...q.condition_options,
    ...q.action_options,
    ...q.monitor_options,
  ];

  const correctIndices: number[] = [];
  const condIdx = q.condition_options.indexOf(q.correct_condition);
  const actIdx = q.action_options.indexOf(q.correct_action);
  const monIdx = q.monitor_options.indexOf(q.correct_monitor);
  if (condIdx >= 0) correctIndices.push(condIdx);
  if (actIdx >= 0) correctIndices.push(q.condition_options.length + actIdx);
  if (monIdx >= 0) correctIndices.push(q.condition_options.length + q.action_options.length + monIdx);

  const tier = EXAM_TO_TIER[exam] || "rpn";
  const regionScope = COUNTRY_TO_REGION[country] || "BOTH";
  const diff = typeof q.difficulty === "string" ? DIFFICULTY_MAP[q.difficulty.toLowerCase()] || 3 : 3;

  return {
    stem: stemText,
    options: allOptions,
    correctAnswer: correctIndices,
    rationale: q.rationale?.trim() || "",
    difficulty: diff,
    bodySystem: q.category || null,
    topic: q.client_needs || null,
    subtopic: q.topic || null,
    questionType: "bowtie",
    exam,
    tier,
    regionScope,
    stemHashVal: stemHash(stemText),
    scenario: q.scenario.trim(),
    exhibitData: {
      type: "bowtie",
      conditionOptions: q.condition_options,
      actionOptions: q.action_options,
      monitorOptions: q.monitor_options,
      correctCondition: q.correct_condition,
      correctAction: q.correct_action,
      correctMonitor: q.correct_monitor,
    },
  };
}

function extractQuestionsFromFile1(content: string): any[] {
  const cleaned = "[" + content.replace(/,\s*$/, "") + "]";
  try {
    return JSON.parse(cleaned);
  } catch {
    const objects: any[] = [];
    let i = 0;
    while (i < content.length) {
      if (content[i] === "{") {
        let depth = 0;
        const start = i;
        for (let j = i; j < content.length; j++) {
          if (content[j] === "{") depth++;
          else if (content[j] === "}") {
            depth--;
            if (depth === 0) {
              try {
                objects.push(JSON.parse(content.slice(start, j + 1)));
              } catch {
                /* skip malformed */
              }
              i = j + 1;
              break;
            }
          }
        }
        if (depth !== 0) break;
      } else {
        i++;
      }
    }
    return objects;
  }
}

function extractQuestionsFromFile2(content: string): any[] {
  try {
    const parsed = JSON.parse(content);
    const all: any[] = [];
    for (const key of Object.keys(parsed)) {
      if (Array.isArray(parsed[key])) {
        all.push(...parsed[key]);
      }
    }
    return all;
  } catch {
    return [];
  }
}

function isTemplate(q: any): boolean {
  if (q.scenario === "string") return true;
  if (q.question_type && typeof q.question_type === "string" && q.question_type.includes("|") && q.question_type.split("|").length > 3) return true;
  const vals = Object.values(q);
  const templateStrings = vals.filter(
    (v) => v === "string" || v === "moderate | hard" || v === "easy | moderate | hard"
  );
  return templateStrings.length > 3;
}

export async function seedQuestions(): Promise<{
  total: number;
  inserted: number;
  skipped: number;
  errors: number;
  details: string[];
}> {
  const file1Path = path.resolve(
    "attached_assets/Pasted--question-Which-finding-indicates-fluid-volume-overload_1773240845323.txt"
  );
  const file2Path = path.resolve(
    "attached_assets/Pasted--american-lvn-batch-1-question-A-nurse-is-caring-for-a-_1773241093301.txt"
  );

  const rawQuestions: any[] = [];
  const details: string[] = [];

  if (fs.existsSync(file1Path)) {
    const content = fs.readFileSync(file1Path, "utf-8");
    const parsed = extractQuestionsFromFile1(content);
    rawQuestions.push(...parsed);
    details.push(`File 1: parsed ${parsed.length} objects`);
  } else {
    details.push("File 1: not found");
  }

  if (fs.existsSync(file2Path)) {
    const content = fs.readFileSync(file2Path, "utf-8");
    const parsed = extractQuestionsFromFile2(content);
    rawQuestions.push(...parsed);
    details.push(`File 2: parsed ${parsed.length} objects`);
  } else {
    details.push("File 2: not found");
  }

  const allParsed: ParsedQuestion[] = [];
  let templateSkips = 0;
  let parseErrors = 0;

  for (const q of rawQuestions) {
    if (!q || typeof q !== "object") {
      parseErrors++;
      continue;
    }

    if (isTemplate(q)) {
      templateSkips++;
      continue;
    }

    const exams = normalizeExam(q.exam);
    const countries = normalizeCountry(q.country);

    const isBowtie =
      q.question_type === "bowtie" ||
      (q.condition_options && q.action_options && q.monitor_options);

    const hasStandardFields = q.question && q.option_a;

    for (let eIdx = 0; eIdx < exams.length; eIdx++) {
      const exam = exams[eIdx];
      const country = countries[Math.min(eIdx, countries.length - 1)];

      let parsed: ParsedQuestion | null = null;

      if (isBowtie) {
        parsed = parseBowtieQuestion(q, exam, country);
      } else if (hasStandardFields) {
        parsed = parseStandardQuestion(q, exam, country);
      }

      if (parsed) {
        allParsed.push(parsed);
      } else {
        parseErrors++;
      }
    }
  }

  details.push(`Templates skipped: ${templateSkips}`);
  details.push(`Parse errors: ${parseErrors}`);
  details.push(`Questions to process: ${allParsed.length}`);

  const seenHashes = new Set<string>();
  const deduplicated: ParsedQuestion[] = [];
  for (const q of allParsed) {
    const key = `${q.stemHashVal}_${q.exam}`;
    if (!seenHashes.has(key)) {
      seenHashes.add(key);
      deduplicated.push(q);
    }
  }
  details.push(`After in-batch dedup: ${deduplicated.length}`);

  let inserted = 0;
  let skipped = 0;

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
          stem_hash, scenario, exhibit_data
        ) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10, $11, $12, $13, 'nursing', $14, $15, $16)`,
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
          q.scenario,
          q.exhibitData ? JSON.stringify(q.exhibitData) : null,
        ]
      );
      inserted++;
    } catch (dbErr: any) {
      parseErrors++;
      details.push(`DB error: ${dbErr.message.substring(0, 100)}`);
    }
  }

  details.push(`Inserted: ${inserted}`);
  details.push(`Skipped (existing): ${skipped}`);

  return {
    total: rawQuestions.length,
    inserted,
    skipped,
    errors: parseErrors,
    details,
  };
}
