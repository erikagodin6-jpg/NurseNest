import type { InsertQuestionBankItem } from "@shared/schema";

const VALID_CORRECT_ANSWERS = ["A", "B", "C", "D"];
const VALID_DIFFICULTIES = ["easy", "moderate", "hard", "very_hard"];
const VALID_EXAM_TYPES = ["NCLEX-PN", "REx-PN"];
const VALID_COUNTRIES = ["US", "CA"];
const VALID_QUESTION_TYPES = ["MCQ"];
const VALID_STATUSES = ["active", "disabled"];

const VALID_CATEGORIES = [
  "Foundations of Practice",
  "Collaborative Practice",
  "Professional Practice",
  "Ethical Practice",
  "Legal Practice",
  "Physiological Integrity",
  "Safe and Effective Care Environment",
  "Health Promotion and Maintenance",
  "Psychosocial Integrity",
  "Pharmacology",
  "Safety & Infection Control",
  "Basic Care & Comfort",
  "Management of Care",
  "Maternal-Child",
  "Mental Health",
  "Gerontology",
  "General",
];

export interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: InsertQuestionBankItem[];
  errors: ValidationError[];
  totalRows: number;
  acceptedCount: number;
  rejectedCount: number;
}

function isNonEmptyString(val: unknown): val is string {
  return typeof val === "string" && val.trim().length > 0;
}

export function validateQuestionBankImport(rows: any[]): ValidationResult {
  const errors: ValidationError[] = [];
  const valid: InsertQuestionBankItem[] = [];
  const seenQuestions = new Set<string>();
  const seenRationales = new Set<string>();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 1;
    const rowErrors: ValidationError[] = [];

    if (!isNonEmptyString(row.question)) {
      rowErrors.push({ row: rowNum, field: "question", message: "Question text is required" });
    }
    if (!isNonEmptyString(row.option_a) && !isNonEmptyString(row.optionA)) {
      rowErrors.push({ row: rowNum, field: "option_a", message: "Option A is required" });
    }
    if (!isNonEmptyString(row.option_b) && !isNonEmptyString(row.optionB)) {
      rowErrors.push({ row: rowNum, field: "option_b", message: "Option B is required" });
    }
    if (!isNonEmptyString(row.option_c) && !isNonEmptyString(row.optionC)) {
      rowErrors.push({ row: rowNum, field: "option_c", message: "Option C is required" });
    }
    if (!isNonEmptyString(row.option_d) && !isNonEmptyString(row.optionD)) {
      rowErrors.push({ row: rowNum, field: "option_d", message: "Option D is required" });
    }

    const correctAnswer = (row.correct_answer || row.correctAnswer || "").toString().toUpperCase().trim();
    if (!VALID_CORRECT_ANSWERS.includes(correctAnswer)) {
      rowErrors.push({ row: rowNum, field: "correct_answer", message: `correct_answer must be one of: ${VALID_CORRECT_ANSWERS.join(", ")}` });
    }

    if (!isNonEmptyString(row.rationale)) {
      rowErrors.push({ row: rowNum, field: "rationale", message: "Rationale is required" });
    }

    if (!isNonEmptyString(row.category)) {
      rowErrors.push({ row: rowNum, field: "category", message: "Category is required" });
    }

    const difficulty = (row.difficulty || "").toString().toLowerCase().trim();
    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      rowErrors.push({ row: rowNum, field: "difficulty", message: `difficulty must be one of: ${VALID_DIFFICULTIES.join(", ")}` });
    }

    const examType = (row.exam_type || row.examType || "").toString().trim();
    if (!VALID_EXAM_TYPES.includes(examType)) {
      rowErrors.push({ row: rowNum, field: "exam_type", message: `exam_type must be one of: ${VALID_EXAM_TYPES.join(", ")}` });
    }

    const country = (row.country || "").toString().toUpperCase().trim();
    if (!VALID_COUNTRIES.includes(country)) {
      rowErrors.push({ row: rowNum, field: "country", message: `country must be one of: ${VALID_COUNTRIES.join(", ")}` });
    }

    if (examType === "NCLEX-PN" && country === "CA") {
      rowErrors.push({ row: rowNum, field: "country", message: "NCLEX-PN questions must have country=US" });
    }
    if (examType === "REx-PN" && country === "US") {
      rowErrors.push({ row: rowNum, field: "country", message: "REx-PN questions must have country=CA" });
    }

    const questionType = (row.question_type || row.questionType || "MCQ").toString().toUpperCase().trim();
    if (!VALID_QUESTION_TYPES.includes(questionType)) {
      rowErrors.push({ row: rowNum, field: "question_type", message: `question_type must be one of: ${VALID_QUESTION_TYPES.join(", ")}` });
    }

    if (!isNonEmptyString(row.client_needs) && !isNonEmptyString(row.clientNeeds)) {
      rowErrors.push({ row: rowNum, field: "client_needs", message: "client_needs is required" });
    }

    if (!isNonEmptyString(row.topic)) {
      rowErrors.push({ row: rowNum, field: "topic", message: "topic is required" });
    }

    const questionText = (row.question || "").toString().trim().toLowerCase();
    if (questionText && seenQuestions.has(questionText)) {
      rowErrors.push({ row: rowNum, field: "question", message: "Duplicate question text in import batch" });
    }

    const rationaleText = (row.rationale || "").toString().trim().toLowerCase();
    if (rationaleText && seenRationales.has(rationaleText)) {
      rowErrors.push({ row: rowNum, field: "rationale", message: "Duplicate rationale text in import batch" });
    }

    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    } else {
      seenQuestions.add(questionText);
      seenRationales.add(rationaleText);
      valid.push({
        question: row.question.trim(),
        optionA: (row.option_a || row.optionA).trim(),
        optionB: (row.option_b || row.optionB).trim(),
        optionC: (row.option_c || row.optionC).trim(),
        optionD: (row.option_d || row.optionD).trim(),
        correctAnswer: correctAnswer as "A" | "B" | "C" | "D",
        rationale: row.rationale.trim(),
        category: row.category.trim(),
        difficulty: difficulty,
        examType: examType,
        country: country,
        questionType: questionType,
        clientNeeds: (row.client_needs || row.clientNeeds).trim(),
        topic: row.topic.trim(),
        status: "active",
      });
    }
  }

  return {
    valid,
    errors,
    totalRows: rows.length,
    acceptedCount: valid.length,
    rejectedCount: rows.length - valid.length,
  };
}

export function getCountryForUserRegion(userRegion: string | null | undefined): string | null {
  if (!userRegion) return null;
  if (userRegion === "US") return "US";
  if (userRegion === "CA") return "CA";
  return null;
}

export function getExamTypeForCountry(country: string): string {
  return country === "US" ? "NCLEX-PN" : "REx-PN";
}
