import type { Express } from "express";
import { requireAdmin } from "./admin-auth";
import { pool } from "./storage";
import { getTranslatedFields, simpleHash } from "./translation-helpers";
import OpenAI from "openai";

const SUPPORTED_LANGUAGES = [
  "fr", "es", "zh", "ar", "hi", "pt", "tl", "ko", "ja",
  "de", "vi", "pa", "ur", "fa"
];

const LANGUAGE_NAMES: Record<string, string> = {
  fr: "French", es: "Spanish", zh: "Chinese (Simplified)", ar: "Arabic",
  hi: "Hindi", pt: "Portuguese", tl: "Filipino/Tagalog", ko: "Korean",
  ja: "Japanese", de: "German", vi: "Vietnamese", pa: "Punjabi",
  ur: "Urdu", fa: "Farsi/Persian"
};

const TRANSLATABLE_FIELDS = [
  "stem", "options", "rationale", "clinicalPearl", "examStrategy", "scenario", "memoryHook"
];

function getOpenAIClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

export function registerExamQuestionTranslationRoutes(app: Express) {

  app.get("/api/exam-questions/:id/translations/:lang", async (req, res) => {
    try {
      const { id, lang } = req.params;

      if (lang === "en") {
        const qResult = await pool.query(
          `SELECT id, stem, options, rationale, scenario, clinical_pearl, exam_strategy, memory_hook
           FROM exam_questions WHERE id = $1`,
          [id]
        );
        if (qResult.rows.length === 0) return res.status(404).json({ error: "Question not found" });
        const q = qResult.rows[0];
        return res.json({
          id: q.id,
          stem: q.stem,
          options: q.options,
          rationale: q.rationale,
          scenario: q.scenario,
          clinicalPearl: q.clinical_pearl,
          examStrategy: q.exam_strategy,
          memoryHook: q.memory_hook,
          language: "en",
          translated: false,
        });
      }

      if (!SUPPORTED_LANGUAGES.includes(lang)) {
        return res.status(400).json({ error: `Unsupported language: ${lang}` });
      }

      const qResult = await pool.query(
        `SELECT id, stem, options, rationale, scenario, clinical_pearl, exam_strategy, memory_hook
         FROM exam_questions WHERE id = $1`,
        [id]
      );
      if (qResult.rows.length === 0) return res.status(404).json({ error: "Question not found" });
      const q = qResult.rows[0];

      const translations = await getTranslatedFields("exam_question", id, lang);

      const translatedStem = translations.stem?.text || q.stem;
      const translatedRationale = translations.rationale?.text || q.rationale;
      const translatedScenario = translations.scenario?.text || q.scenario;
      const translatedClinicalPearl = translations.clinicalPearl?.text || q.clinical_pearl;
      const translatedExamStrategy = translations.examStrategy?.text || q.exam_strategy;
      const translatedMemoryHook = translations.memoryHook?.text || q.memory_hook;

      let translatedOptions = q.options;
      if (translations.options?.text) {
        try {
          translatedOptions = JSON.parse(translations.options.text);
        } catch {
          translatedOptions = q.options;
        }
      }

      const hasTranslations = Object.keys(translations).length > 0;

      res.json({
        id: q.id,
        stem: translatedStem,
        options: translatedOptions,
        rationale: translatedRationale,
        scenario: translatedScenario,
        clinicalPearl: translatedClinicalPearl,
        examStrategy: translatedExamStrategy,
        memoryHook: translatedMemoryHook,
        language: lang,
        translated: hasTranslations,
      });
    } catch (e: any) {
      console.error("[ExamTranslation] Error:", e.message);
      res.status(500).json({ error: "Failed to fetch translated question" });
    }
  });

  app.post("/api/exam-questions/translated-batch", async (req, res) => {
    try {
      const { questionIds, lang } = req.body;
      if (!Array.isArray(questionIds) || !lang) {
        return res.status(400).json({ error: "questionIds (array) and lang (string) are required" });
      }

      if (lang === "en" || questionIds.length === 0) {
        return res.json({ translations: {}, language: lang });
      }

      if (!SUPPORTED_LANGUAGES.includes(lang)) {
        return res.status(400).json({ error: `Unsupported language: ${lang}` });
      }

      const ids = questionIds.slice(0, 200);
      const placeholders = ids.map((_: any, i: number) => `$${i + 2}`).join(",");
      const result = await pool.query(
        `SELECT content_id, field_name, translated_text
         FROM content_translations
         WHERE content_type = 'exam_question' AND language_code = $1
         AND content_id IN (${placeholders})`,
        [lang, ...ids]
      );

      const translationMap: Record<string, Record<string, string>> = {};
      for (const row of result.rows) {
        if (!translationMap[row.content_id]) translationMap[row.content_id] = {};
        translationMap[row.content_id][row.field_name] = row.translated_text;
      }

      res.json({ translations: translationMap, language: lang });
    } catch (e: any) {
      console.error("[ExamTranslation] Batch error:", e.message);
      res.status(500).json({ error: "Failed to fetch batch translations" });
    }
  });

  app.post("/api/admin/exam-questions/translate", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { questionIds, languages } = req.body;
      if (!Array.isArray(questionIds) || questionIds.length === 0) {
        return res.status(400).json({ error: "questionIds array is required" });
      }

      const targetLangs = Array.isArray(languages) && languages.length > 0
        ? languages.filter((l: string) => SUPPORTED_LANGUAGES.includes(l))
        : SUPPORTED_LANGUAGES;

      if (targetLangs.length === 0) {
        return res.status(400).json({ error: "No valid languages specified" });
      }

      const batchIds = questionIds.slice(0, 50);
      const placeholders = batchIds.map((_: any, i: number) => `$${i + 1}`).join(",");
      const qResult = await pool.query(
        `SELECT id, stem, options, rationale, scenario, clinical_pearl, exam_strategy, memory_hook
         FROM exam_questions WHERE id IN (${placeholders})`,
        batchIds
      );

      if (qResult.rows.length === 0) {
        return res.status(404).json({ error: "No questions found" });
      }

      const openai = getOpenAIClient();
      let totalTranslated = 0;
      let totalSkipped = 0;
      const errors: string[] = [];

      for (const question of qResult.rows) {
        for (const lang of targetLangs) {
          try {
            const result = await translateSingleQuestion(openai, question, lang);
            if (result.skipped) totalSkipped++;
            else totalTranslated++;
          } catch (err: any) {
            errors.push(`Error translating question ${question.id} to ${lang}: ${err.message}`);
          }
        }
      }

      res.json({
        success: true,
        totalQuestions: qResult.rows.length,
        totalLanguages: targetLangs.length,
        totalTranslated,
        totalSkipped,
        errors: errors.slice(0, 20),
      });
    } catch (e: any) {
      console.error("[ExamTranslation] Admin translate error:", e.message);
      res.status(500).json({ error: "Translation failed: " + e.message });
    }
  });

  app.post("/api/admin/exam-questions/translate-all", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { languages, batchSize = 10, offset = 0 } = req.body;
      const targetLangs = Array.isArray(languages) && languages.length > 0
        ? languages.filter((l: string) => SUPPORTED_LANGUAGES.includes(l))
        : SUPPORTED_LANGUAGES;

      const limit = Math.min(batchSize, 25);
      const qResult = await pool.query(
        `SELECT id, stem, options, rationale, scenario, clinical_pearl, exam_strategy, memory_hook
         FROM exam_questions WHERE status = 'published' ORDER BY created_at LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      if (qResult.rows.length === 0) {
        return res.json({ success: true, message: "No more questions to translate", done: true, totalProcessed: 0 });
      }

      const totalResult = await pool.query(`SELECT COUNT(*)::int as count FROM exam_questions WHERE status = 'published'`);
      const totalQuestions = totalResult.rows[0]?.count || 0;

      const openai = getOpenAIClient();
      let totalTranslated = 0;
      let totalSkipped = 0;
      const errors: string[] = [];

      for (const question of qResult.rows) {
        for (const lang of targetLangs) {
          try {
            const result = await translateSingleQuestion(openai, question, lang);
            if (result.skipped) totalSkipped++;
            else totalTranslated++;
          } catch (err: any) {
            errors.push(`Error translating question ${question.id} to ${lang}: ${err.message}`);
          }
        }
      }

      res.json({
        success: true,
        totalQuestions: qResult.rows.length,
        totalLanguages: targetLangs.length,
        totalTranslated,
        totalSkipped,
        errors: errors.slice(0, 20),
        done: qResult.rows.length < limit,
        nextOffset: offset + qResult.rows.length,
        totalQuestionsInDb: totalQuestions,
        processedSoFar: offset + qResult.rows.length,
      });
    } catch (e: any) {
      console.error("[ExamTranslation] Translate-all error:", e.message);
      res.status(500).json({ error: "Bulk translation failed: " + e.message });
    }
  });

  app.get("/api/admin/exam-questions/translation-coverage", async (req, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const totalResult = await pool.query(
        `SELECT COUNT(*)::int as count FROM exam_questions WHERE status = 'published'`
      );
      const totalQuestions = totalResult.rows[0]?.count || 0;

      const coverageResult = await pool.query(
        `SELECT language_code, COUNT(DISTINCT content_id)::int as translated_questions
         FROM content_translations
         WHERE content_type = 'exam_question'
         GROUP BY language_code
         ORDER BY language_code`
      );

      const fieldCoverageResult = await pool.query(
        `SELECT language_code, field_name, COUNT(*)::int as count
         FROM content_translations
         WHERE content_type = 'exam_question'
         GROUP BY language_code, field_name
         ORDER BY language_code, field_name`
      );

      const fieldCoverage: Record<string, Record<string, number>> = {};
      for (const row of fieldCoverageResult.rows) {
        if (!fieldCoverage[row.language_code]) fieldCoverage[row.language_code] = {};
        fieldCoverage[row.language_code][row.field_name] = row.count;
      }

      const coverage = SUPPORTED_LANGUAGES.map(lang => {
        const row = coverageResult.rows.find((r: any) => r.language_code === lang);
        const translatedQuestions = row?.translated_questions || 0;
        const percentage = totalQuestions > 0 ? Math.round((translatedQuestions / totalQuestions) * 100) : 0;
        return {
          language: lang,
          languageName: LANGUAGE_NAMES[lang] || lang,
          totalQuestions,
          translatedQuestions,
          percentage,
          fieldBreakdown: fieldCoverage[lang] || {},
        };
      });

      const overallTranslated = coverageResult.rows.reduce((sum: number, r: any) => sum + r.translated_questions, 0);
      const overallPossible = totalQuestions * SUPPORTED_LANGUAGES.length;
      const overallPercentage = overallPossible > 0 ? Math.round((overallTranslated / overallPossible) * 100) : 0;

      res.json({
        totalQuestions,
        totalLanguages: SUPPORTED_LANGUAGES.length,
        overallPercentage,
        languages: coverage,
      });
    } catch (e: any) {
      console.error("[ExamTranslation] Coverage error:", e.message);
      res.status(500).json({ error: "Failed to fetch translation coverage" });
    }
  });
}

async function translateSingleQuestion(
  openai: OpenAI,
  question: any,
  lang: string
): Promise<{ skipped: boolean }> {
  const existingCount = await pool.query(
    `SELECT COUNT(*) as cnt FROM content_translations
     WHERE content_type = 'exam_question' AND content_id = $1 AND language_code = $2`,
    [question.id, lang]
  );
  const existingFieldCount = parseInt(existingCount.rows[0]?.cnt || "0");

  const fieldsToTranslate: Record<string, string> = {};
  if (question.stem) fieldsToTranslate.stem = question.stem;
  if (question.rationale) fieldsToTranslate.rationale = question.rationale;
  if (question.scenario) fieldsToTranslate.scenario = question.scenario;
  if (question.clinical_pearl) fieldsToTranslate.clinicalPearl = question.clinical_pearl;
  if (question.exam_strategy) fieldsToTranslate.examStrategy = question.exam_strategy;
  if (question.memory_hook) fieldsToTranslate.memoryHook = question.memory_hook;

  let optionsText: string[] = [];
  if (Array.isArray(question.options)) {
    optionsText = question.options.map((o: any) =>
      typeof o === "object" ? (o.text || JSON.stringify(o)) : String(o)
    );
  }

  if (existingFieldCount >= Object.keys(fieldsToTranslate).length + (optionsText.length > 0 ? 1 : 0)) {
    return { skipped: true };
  }

  const langName = LANGUAGE_NAMES[lang] || lang;
  const prompt = buildTranslationPrompt(fieldsToTranslate, optionsText, langName);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a medical/nursing exam translator. Translate the given exam question content into ${langName}. 
RULES:
- Keep universal medical abbreviations as-is: IV, BP, HR, SpO2, ECG, EKG, ABG, CBC, BMP, CMP, BMI, GCS, CPR, AED, NPO, PRN, BID, TID, QID, IM, SQ, PO, INR, PT, PTT, WBC, RBC, Hgb, Hct, BUN, Na+, K+, Ca2+, Mg2+, pH, pCO2, pO2, HCO3
- Translate descriptive medical terms appropriately for the target language
- Preserve clinical accuracy - do not change medical facts
- Keep option numbering/ordering exactly the same
- Return valid JSON only`
      },
      { role: "user", content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 4000,
  });

  const responseText = completion.choices[0]?.message?.content?.trim() || "";
  let parsed: any;
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  parsed = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);

  for (const [fieldName, originalText] of Object.entries(fieldsToTranslate)) {
    const translatedText = parsed[fieldName];
    if (translatedText && typeof translatedText === "string") {
      await upsertTranslation(
        question.id, fieldName, lang,
        translatedText, simpleHash(String(originalText))
      );
    }
  }

  if (parsed.options && Array.isArray(parsed.options) && optionsText.length > 0) {
    const translatedOptions = question.options.map((original: any, idx: number) => {
      if (typeof original === "object") {
        return { ...original, text: parsed.options[idx] || original.text };
      }
      return parsed.options[idx] || original;
    });
    await upsertTranslation(
      question.id, "options", lang,
      JSON.stringify(translatedOptions),
      simpleHash(JSON.stringify(question.options))
    );
  }

  return { skipped: false };
}

function buildTranslationPrompt(
  fields: Record<string, string>,
  options: string[],
  langName: string
): string {
  let prompt = `Translate the following nursing exam question fields into ${langName}. Return a JSON object with the same field names.\n\n`;

  for (const [key, value] of Object.entries(fields)) {
    prompt += `"${key}": "${value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"\n\n`;
  }

  if (options.length > 0) {
    prompt += `"options": ${JSON.stringify(options)}\n\n`;
  }

  prompt += `Return ONLY a JSON object with the translated fields. For "options", return an array of translated option strings in the SAME ORDER as the original.`;
  return prompt;
}

async function upsertTranslation(
  contentId: string,
  fieldName: string,
  lang: string,
  translatedText: string,
  sourceHash: string
): Promise<void> {
  await pool.query(
    `INSERT INTO content_translations (id, content_type, content_id, field_name, language_code, translated_text, translation_status, source_hash, last_updated)
     VALUES (gen_random_uuid(), 'exam_question', $1, $2, $3, $4, 'auto', $5, NOW())
     ON CONFLICT (content_type, content_id, field_name, language_code)
     DO UPDATE SET translated_text = $4, source_hash = $5, translation_status = 'auto', last_updated = NOW()`,
    [contentId, fieldName, lang, translatedText, sourceHash]
  );
}
