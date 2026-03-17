import type { Express } from "express";
import { pool } from "./storage";
import { resolveAuthUser, requireAdmin } from "./admin-auth";
import rateLimit from "express-rate-limit";
import { getAllowedExamTiers } from "../shared/tier-config";

function getPreviewTier(req: any, userTier: string): string {
  if (userTier !== "admin") return userTier;
  const previewToken = (req.cookies?.nursenest_preview || "") as string;
  if (!previewToken) return userTier;
  return userTier;
}

const qbankLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: "Too many requests. Please try again later." },
  validate: { xForwardedForHeader: false, trustProxy: false },
});

export function setupQBankRoutes(app: Express) {
  app.get("/api/qbank", qbankLimiter, async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required", upgradeRequired: true });
      }

      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
        if (!["rpn", "rn", "np"].includes(queryTier)) queryTier = "rpn";
      } else {
        const requestedTier = (req.query.tier as string) || userTier;
        const allowed = getAllowedExamTiers(userTier);
        queryTier = allowed.includes(requestedTier) ? requestedTier : (allowed[0] || userTier);
      }

      const limit = Math.min(parseInt(req.query.limit as string) || 50, 50);
      const offset = parseInt(req.query.offset as string) || 0;
      const bodySystem = req.query.bodySystem as string;
      const shuffle = req.query.shuffle === "true";
      const difficulty = req.query.difficulty as string;
      const country = req.query.country as string;
      const examType = req.query.exam as string;
      const topic = req.query.topic as string;

      const search = req.query.search as string;
      const statusFilter = req.query.status as string;
      const userRegion = user.region || "US";
      const countryCode = req.query.country_code as string;
      const languageCode = req.query.language_code as string;
      const licensingBody = req.query.licensing_body as string;

      let query = `SELECT id, tier, exam, question_type, stem, options, body_system, topic, difficulty, region_scope, status, country_code, language_code, licensing_body, cognitive_level, question_format
                   FROM exam_questions
                   WHERE tier = $1`;
      const params: any[] = [queryTier];
      let paramIdx = 2;

      if (userTier === "admin" && statusFilter && statusFilter !== "all") {
        query += ` AND status = $${paramIdx}`;
        params.push(statusFilter);
        paramIdx++;
      } else if (userTier !== "admin") {
        query += ` AND status = 'published'`;
      }

      if (userTier !== "admin") {
        const safeRegion = userRegion === "CA" ? "CAN" : "US";
        query += ` AND (region_scope = $${paramIdx} OR region_scope = 'BOTH')`;
        params.push(safeRegion);
        paramIdx++;
        if (userRegion === "CA") {
          query += ` AND exam != 'NCLEX-PN'`;
        } else {
          query += ` AND exam != 'REx-PN'`;
        }
      }

      if (search && userTier === "admin") {
        query += ` AND stem ILIKE $${paramIdx}`;
        params.push(`%${search}%`);
        paramIdx++;
      }

      if (bodySystem) {
        query += ` AND body_system = $${paramIdx}`;
        params.push(bodySystem);
        paramIdx++;
      }

      if (difficulty) {
        const diffMap: Record<string, number> = { easy: 2, moderate: 3, hard: 4 };
        const diffVal = diffMap[difficulty.toLowerCase()];
        if (diffVal) {
          query += ` AND difficulty = $${paramIdx}`;
          params.push(diffVal);
          paramIdx++;
        }
      }

      if (country) {
        const regionMap: Record<string, string> = { us: "US", canada: "CAN", ca: "CAN" };
        const regionVal = regionMap[country.toLowerCase()] || country.toUpperCase();
        query += ` AND (region_scope = $${paramIdx} OR region_scope = 'BOTH' OR region_scope IS NULL)`;
        params.push(regionVal);
        paramIdx++;
      }

      if (countryCode) {
        query += ` AND country_code = $${paramIdx}`;
        params.push(countryCode.toUpperCase());
        paramIdx++;
      }

      if (languageCode) {
        query += ` AND language_code = $${paramIdx}`;
        params.push(languageCode.toLowerCase());
        paramIdx++;
      }

      if (licensingBody) {
        query += ` AND licensing_body = $${paramIdx}`;
        params.push(licensingBody);
        paramIdx++;
      }

      if (examType) {
        query += ` AND exam = $${paramIdx}`;
        params.push(examType);
        paramIdx++;
      }

      if (topic) {
        query += ` AND (topic ILIKE $${paramIdx} OR subtopic ILIKE $${paramIdx})`;
        params.push(`%${topic}%`);
        paramIdx++;
      }

      if (shuffle) {
        query += ` ORDER BY RANDOM()`;
      } else {
        query += ` ORDER BY created_at`;
      }

      query += ` LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      let countQuery = `SELECT COUNT(*) FROM exam_questions WHERE tier = $1`;
      const countParams: any[] = [queryTier];
      let countIdx = 2;
      if (userTier === "admin" && statusFilter && statusFilter !== "all") {
        countQuery += ` AND status = $${countIdx}`;
        countParams.push(statusFilter);
        countIdx++;
      } else if (userTier !== "admin") {
        countQuery += ` AND status = 'published'`;
      }
      if (userTier !== "admin") {
        const safeRegion = userRegion === "CA" ? "CAN" : "US";
        countQuery += ` AND (region_scope = $${countIdx} OR region_scope = 'BOTH')`;
        countParams.push(safeRegion);
        countIdx++;
        if (userRegion === "CA") {
          countQuery += ` AND exam != 'NCLEX-PN'`;
        } else {
          countQuery += ` AND exam != 'REx-PN'`;
        }
      }
      if (search && userTier === "admin") {
        countQuery += ` AND stem ILIKE $${countIdx}`;
        countParams.push(`%${search}%`);
      }
      const countResult = await pool.query(countQuery, countParams);

      res.json({
        questions: result.rows.map((row: any) => ({
          id: row.id,
          tier: row.tier,
          exam: row.exam,
          questionType: row.question_type,
          status: row.status,
          stem: row.stem,
          options: (() => { if (typeof row.options === "string") { try { return JSON.parse(row.options); } catch { return [row.options]; } } return row.options; })(),
          bodySystem: row.body_system,
          topic: row.topic,
          difficulty: row.difficulty,
          regionScope: row.region_scope,
          countryCode: row.country_code,
          languageCode: row.language_code,
          licensingBody: row.licensing_body,
          cognitiveLevel: row.cognitive_level,
          questionFormat: row.question_format,
        })),
        total: parseInt(countResult.rows[0].count),
        limit,
        offset,
        tier: queryTier,
      });
    } catch (e: any) {
      console.error("QBank fetch error:", e.message);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/qbank/attempt", qbankLimiter, async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required" });
      }

      const { questionId, selectedOption } = req.body;
      if (!questionId || selectedOption === undefined) {
        return res.status(400).json({ error: "questionId and selectedOption required" });
      }

      const queryTier = userTier === "admin" ? undefined : userTier;
      let query = `SELECT id, tier, stem, options, correct_answer, rationale, body_system FROM exam_questions WHERE id = $1 AND status = 'published'`;
      const params: any[] = [questionId];
      let paramIdx = 2;

      if (queryTier) {
        query += ` AND tier = $${paramIdx}`;
        params.push(queryTier);
        paramIdx++;
      }

      if (userTier !== "admin") {
        const userRegion = user.region || "US";
        const safeRegion = userRegion === "CA" ? "CAN" : "US";
        query += ` AND (region_scope = $${paramIdx} OR region_scope = 'BOTH')`;
        params.push(safeRegion);
        paramIdx++;
        if (userRegion === "CA") {
          query += ` AND exam != 'NCLEX-PN'`;
        } else {
          query += ` AND exam != 'REx-PN'`;
        }
      }

      const result = await pool.query(query, params);
      if (result.rows.length === 0) {
        return res.status(403).json({ error: "Question not accessible for your tier" });
      }

      const question = result.rows[0];
      const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
      let correctAnswer = question.correct_answer;
      if (typeof correctAnswer === "string") {
        try {
          correctAnswer = JSON.parse(correctAnswer);
          if (typeof correctAnswer === "string") {
            const mapped = letterMap[correctAnswer.toUpperCase()];
            if (mapped !== undefined) {
              correctAnswer = [mapped];
            } else {
              console.warn(`[attempt] Question ${questionId}: unrecognized correct_answer string "${correctAnswer}"`);
              return res.status(500).json({ error: "Question has invalid answer data" });
            }
          }
        } catch {
          const mapped = letterMap[correctAnswer.toUpperCase()];
          if (mapped !== undefined) {
            correctAnswer = [mapped];
          } else {
            console.warn(`[attempt] Question ${questionId}: unparseable correct_answer "${correctAnswer}"`);
            return res.status(500).json({ error: "Question has invalid answer data" });
          }
        }
      }
      if (typeof correctAnswer === "number") correctAnswer = [correctAnswer];
      if (!Array.isArray(correctAnswer)) {
        console.warn(`[attempt] Question ${questionId}: correct_answer is not an array after parsing`);
        return res.status(500).json({ error: "Question has invalid answer data" });
      }
      const isCorrect = correctAnswer.includes(selectedOption);

      res.json({
        correct: isCorrect,
        correctAnswer,
        rationale: question.rationale,
        bodySystem: question.body_system,
      });
    } catch (e: any) {
      console.error("QBank attempt error:", e.message);
      res.status(500).json({ error: "Failed to process answer" });
    }
  });

  app.get("/api/qbank/stats", async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      const userTier = user?.tier || "free";

      const requestedTier = (req.query.tier as string) || null;
      let queryTier: string | null;

      if (userTier === "admin") {
        queryTier = requestedTier && ["rpn", "rn", "np"].includes(requestedTier) ? requestedTier : null;
      } else if (requestedTier && ["rpn", "rn", "np"].includes(requestedTier)) {
        queryTier = requestedTier;
      } else if (userTier !== "free") {
        queryTier = userTier;
      } else {
        queryTier = requestedTier && ["rpn", "rn", "np"].includes(requestedTier) ? requestedTier : "rpn";
      }

      let query: string;
      let params: any[];

      if (queryTier) {
        query = `SELECT body_system, COUNT(*) as count
                 FROM exam_questions
                 WHERE tier = $1 AND status = 'published'
                 GROUP BY body_system
                 ORDER BY count DESC`;
        params = [queryTier];
      } else {
        query = `SELECT tier, body_system, COUNT(*) as count
                 FROM exam_questions
                 WHERE status = 'published'
                 GROUP BY tier, body_system
                 ORDER BY tier, count DESC`;
        params = [];
      }

      const result = await pool.query(query, params);

      const totalQuery = queryTier
        ? `SELECT COUNT(*) FROM exam_questions WHERE tier = $1 AND status = 'published'`
        : `SELECT COUNT(*) FROM exam_questions WHERE status = 'published'`;
      const totalResult = await pool.query(totalQuery, queryTier ? [queryTier] : []);

      res.json({
        bodySystems: result.rows,
        total: parseInt(totalResult.rows[0].count),
        tier: queryTier || "all",
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/qbank/body-systems", async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      const userTier = user?.tier || "free";

      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
      } else if (userTier !== "free") {
        queryTier = userTier;
      } else {
        const requested = (req.query.tier as string) || "rpn";
        queryTier = ["rpn", "rn", "np"].includes(requested) ? requested : "rpn";
      }

      const result = await pool.query(
        `SELECT DISTINCT body_system FROM exam_questions WHERE tier = $1 AND status = 'published' AND body_system IS NOT NULL ORDER BY body_system`,
        [queryTier]
      );

      res.json({
        bodySystems: result.rows.map((r: any) => r.body_system),
        tier: queryTier,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/qbank/exam-set", qbankLimiter, async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required" });
      }

      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
        if (!["rpn", "rn", "np"].includes(queryTier)) queryTier = "rpn";
      } else {
        const requestedTier = (req.query.tier as string) || userTier;
        const allowed = getAllowedExamTiers(userTier);
        queryTier = allowed.includes(requestedTier) ? requestedTier : (allowed[0] || userTier);
      }

      const count = Math.min(parseInt(req.query.count as string) || 25, 200);
      const bodySystems = req.query.bodySystems ? (req.query.bodySystems as string).split(",") : [];
      const examFilter = req.query.exam as string;
      const difficultyFilter = req.query.difficulty as string;
      const topicFilter = req.query.topic as string;
      const regionFilter = req.query.region as string;

      let query = `SELECT id, tier, exam, question_type, stem, options, correct_answer, rationale, body_system, topic, subtopic, difficulty, region_scope, scenario, clinical_pearl, exam_strategy, memory_hook, framework_used, clinical_trap, distractor_rationales
                   FROM exam_questions
                   WHERE tier = $1 AND status = 'published'`;
      const params: any[] = [queryTier];
      let paramIdx = 2;

      if (bodySystems.length > 0) {
        query += ` AND body_system = ANY($${paramIdx})`;
        params.push(bodySystems);
        paramIdx++;
      }

      if (examFilter) {
        query += ` AND exam = $${paramIdx}`;
        params.push(examFilter);
        paramIdx++;
      }

      if (difficultyFilter) {
        const diffMap: Record<string, number> = { easy: 2, moderate: 3, hard: 4 };
        const diffVal = diffMap[difficultyFilter.toLowerCase()];
        if (diffVal) {
          query += ` AND difficulty = $${paramIdx}`;
          params.push(diffVal);
          paramIdx++;
        }
      }

      if (topicFilter) {
        query += ` AND (topic ILIKE $${paramIdx} OR subtopic ILIKE $${paramIdx})`;
        params.push(`%${topicFilter}%`);
        paramIdx++;
      }

      const userRegion = user.region || "US";
      if (userTier !== "admin") {
        const safeRegion = userRegion === "CA" ? "CAN" : "US";
        query += ` AND (region_scope = $${paramIdx} OR region_scope = 'BOTH')`;
        params.push(safeRegion);
        paramIdx++;
      } else if (regionFilter) {
        query += ` AND (region_scope = $${paramIdx} OR region_scope = 'BOTH')`;
        params.push(regionFilter);
        paramIdx++;
      }

      if (userTier !== "admin") {
        if (userRegion === "CA") {
          query += ` AND exam != 'NCLEX-PN'`;
        } else {
          query += ` AND exam != 'REx-PN'`;
        }
      }

      query += ` ORDER BY RANDOM() LIMIT $${paramIdx}`;
      params.push(count);

      const result = await pool.query(query, params);

      const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

      const parsedQuestions = result.rows.map((row: any) => {
          let parsedOptions = row.options;
          if (typeof parsedOptions === "string") {
            try { parsedOptions = JSON.parse(parsedOptions); } catch { parsedOptions = [parsedOptions]; }
          }

          let parsedCorrect = row.correct_answer;
          if (typeof parsedCorrect === "string") {
            try {
              parsedCorrect = JSON.parse(parsedCorrect);
              if (typeof parsedCorrect === "string") {
                const mapped = letterMap[parsedCorrect.toUpperCase()];
                if (mapped !== undefined) {
                  parsedCorrect = [mapped];
                } else {
                  console.warn(`[exam-set] Excluding question ${row.id}: unrecognized correct_answer string "${parsedCorrect}"`);
                  return null;
                }
              }
            } catch {
              const mapped = letterMap[parsedCorrect.toUpperCase()];
              if (mapped !== undefined) {
                parsedCorrect = [mapped];
              } else {
                console.warn(`[exam-set] Excluding question ${row.id}: unparseable correct_answer "${parsedCorrect}"`);
                return null;
              }
            }
          }
          if (typeof parsedCorrect === "number") parsedCorrect = [parsedCorrect];
          if (!Array.isArray(parsedCorrect)) {
            console.warn(`[exam-set] Excluding question ${row.id}: correct_answer is not an array after parsing`);
            return null;
          }

          let parsedDistractorRationales = row.distractor_rationales;
          if (typeof parsedDistractorRationales === "string") {
            try { parsedDistractorRationales = JSON.parse(parsedDistractorRationales); } catch { parsedDistractorRationales = null; }
          }

          return {
            id: row.id,
            tier: row.tier,
            exam: row.exam,
            questionType: row.question_type,
            stem: row.stem,
            options: parsedOptions,
            correctAnswer: parsedCorrect,
            rationale: row.rationale,
            bodySystem: row.body_system,
            topic: row.topic,
            subtopic: row.subtopic,
            difficulty: row.difficulty,
            regionScope: row.region_scope,
            scenario: row.scenario,
            clinicalPearl: row.clinical_pearl,
            examStrategy: row.exam_strategy,
            memoryHook: row.memory_hook,
            frameworkUsed: row.framework_used,
            clinicalTrap: row.clinical_trap,
            distractorRationales: parsedDistractorRationales,
          };
        }).filter((q: any) => q !== null);

      res.json({
        questions: parsedQuestions,
        count: parsedQuestions.length,
        tier: queryTier,
      });
    } catch (e: any) {
      console.error("QBank exam-set error:", e.message);
      res.status(500).json({ error: "Failed to fetch exam set" });
    }
  });

  app.get("/api/admin/qbank/question/:id", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const result = await pool.query(
        `SELECT id, tier, exam, question_type, status, stem, options, correct_answer, rationale, difficulty, body_system, topic, subtopic, region_scope, created_at, published_at,
                country_code, region_code, licensing_body, language_code, cognitive_level, question_format,
                is_scenario, is_mock_exam_eligible, is_adaptive_eligible, is_flashcard_source, is_study_guide_linked, is_tutor_ready,
                correct_answer_explanation, incorrect_answer_rationale, clinical_reasoning, key_takeaway, mnemonic, reference_source,
                lab_unit_variant, medication_naming_variant, case_context, vitals, labs, images, scenario_id, blueprint_weight
         FROM exam_questions WHERE id = $1`,
        [req.params.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Question not found" });
      }

      const row = result.rows[0];
      let parsedOptions = row.options;
      if (typeof parsedOptions === "string") {
        try { parsedOptions = JSON.parse(parsedOptions); } catch { parsedOptions = [parsedOptions]; }
      }
      let parsedCorrect = row.correct_answer;
      if (typeof parsedCorrect === "string") {
        try { parsedCorrect = JSON.parse(parsedCorrect); } catch {
          const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
          parsedCorrect = [letterMap[parsedCorrect.toUpperCase()] ?? 0];
        }
      }
      if (typeof parsedCorrect === "number") parsedCorrect = [parsedCorrect];
      res.json({
        id: row.id,
        tier: row.tier,
        exam: row.exam,
        questionType: row.question_type,
        status: row.status,
        stem: row.stem,
        options: parsedOptions,
        correctAnswer: parsedCorrect,
        rationale: row.rationale,
        difficulty: row.difficulty,
        bodySystem: row.body_system,
        topic: row.topic,
        subtopic: row.subtopic,
        regionScope: row.region_scope,
        createdAt: row.created_at,
        publishedAt: row.published_at,
        countryCode: row.country_code,
        regionCode: row.region_code,
        licensingBody: row.licensing_body,
        languageCode: row.language_code,
        cognitiveLevel: row.cognitive_level,
        questionFormat: row.question_format,
        isScenario: row.is_scenario,
        isMockExamEligible: row.is_mock_exam_eligible,
        isAdaptiveEligible: row.is_adaptive_eligible,
        isFlashcardSource: row.is_flashcard_source,
        isStudyGuideLinked: row.is_study_guide_linked,
        isTutorReady: row.is_tutor_ready,
        correctAnswerExplanation: row.correct_answer_explanation,
        incorrectAnswerRationale: row.incorrect_answer_rationale,
        clinicalReasoning: row.clinical_reasoning,
        keyTakeaway: row.key_takeaway,
        mnemonic: row.mnemonic,
        referenceSource: row.reference_source,
        labUnitVariant: row.lab_unit_variant,
        medicationNamingVariant: row.medication_naming_variant,
        caseContext: row.case_context,
        vitals: row.vitals,
        labs: row.labs,
        images: row.images,
        scenarioId: row.scenario_id,
        blueprintWeight: row.blueprint_weight,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/admin/qbank/question/:id", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const { stem, options, correctAnswer, rationale, difficulty, bodySystem, topic, subtopic, exam, regionScope, status,
              countryCode, regionCode, licensingBody, languageCode, cognitiveLevel, questionFormat,
              isScenario, isMockExamEligible, isAdaptiveEligible, isFlashcardSource, isStudyGuideLinked, isTutorReady,
              correctAnswerExplanation, incorrectAnswerRationale, clinicalReasoning, keyTakeaway, mnemonic, referenceSource,
              labUnitVariant, medicationNamingVariant, caseContext, vitals, labs, images, scenarioId, blueprintWeight } = req.body;
      const updates: string[] = [];
      const params: any[] = [];
      let idx = 1;

      if (stem !== undefined) { updates.push(`stem = $${idx++}`); params.push(stem); }
      if (options !== undefined) { updates.push(`options = $${idx++}`); params.push(JSON.stringify(options)); }
      if (correctAnswer !== undefined) { updates.push(`correct_answer = $${idx++}`); params.push(JSON.stringify(correctAnswer)); }
      if (rationale !== undefined) { updates.push(`rationale = $${idx++}`); params.push(rationale); }
      if (difficulty !== undefined) { updates.push(`difficulty = $${idx++}`); params.push(difficulty); }
      if (bodySystem !== undefined) { updates.push(`body_system = $${idx++}`); params.push(bodySystem); }
      if (topic !== undefined) { updates.push(`topic = $${idx++}`); params.push(topic); }
      if (subtopic !== undefined) { updates.push(`subtopic = $${idx++}`); params.push(subtopic); }
      if (exam !== undefined) { updates.push(`exam = $${idx++}`); params.push(exam); }
      if (regionScope !== undefined) { updates.push(`region_scope = $${idx++}`); params.push(regionScope); }
      if (countryCode !== undefined) { updates.push(`country_code = $${idx++}`); params.push(countryCode); }
      if (regionCode !== undefined) { updates.push(`region_code = $${idx++}`); params.push(regionCode); }
      if (licensingBody !== undefined) { updates.push(`licensing_body = $${idx++}`); params.push(licensingBody); }
      if (languageCode !== undefined) { updates.push(`language_code = $${idx++}`); params.push(languageCode); }
      if (cognitiveLevel !== undefined) { updates.push(`cognitive_level = $${idx++}`); params.push(cognitiveLevel); }
      if (questionFormat !== undefined) { updates.push(`question_format = $${idx++}`); params.push(questionFormat); }
      if (isScenario !== undefined) { updates.push(`is_scenario = $${idx++}`); params.push(isScenario); }
      if (isMockExamEligible !== undefined) { updates.push(`is_mock_exam_eligible = $${idx++}`); params.push(isMockExamEligible); }
      if (isAdaptiveEligible !== undefined) { updates.push(`is_adaptive_eligible = $${idx++}`); params.push(isAdaptiveEligible); }
      if (isFlashcardSource !== undefined) { updates.push(`is_flashcard_source = $${idx++}`); params.push(isFlashcardSource); }
      if (isStudyGuideLinked !== undefined) { updates.push(`is_study_guide_linked = $${idx++}`); params.push(isStudyGuideLinked); }
      if (isTutorReady !== undefined) { updates.push(`is_tutor_ready = $${idx++}`); params.push(isTutorReady); }
      if (correctAnswerExplanation !== undefined) { updates.push(`correct_answer_explanation = $${idx++}`); params.push(correctAnswerExplanation); }
      if (incorrectAnswerRationale !== undefined) { updates.push(`incorrect_answer_rationale = $${idx++}`); params.push(JSON.stringify(incorrectAnswerRationale)); }
      if (clinicalReasoning !== undefined) { updates.push(`clinical_reasoning = $${idx++}`); params.push(clinicalReasoning); }
      if (keyTakeaway !== undefined) { updates.push(`key_takeaway = $${idx++}`); params.push(keyTakeaway); }
      if (mnemonic !== undefined) { updates.push(`mnemonic = $${idx++}`); params.push(mnemonic); }
      if (referenceSource !== undefined) { updates.push(`reference_source = $${idx++}`); params.push(referenceSource); }
      if (labUnitVariant !== undefined) { updates.push(`lab_unit_variant = $${idx++}`); params.push(labUnitVariant); }
      if (medicationNamingVariant !== undefined) { updates.push(`medication_naming_variant = $${idx++}`); params.push(medicationNamingVariant); }
      if (caseContext !== undefined) { updates.push(`case_context = $${idx++}`); params.push(caseContext); }
      if (vitals !== undefined) { updates.push(`vitals = $${idx++}`); params.push(JSON.stringify(vitals)); }
      if (labs !== undefined) { updates.push(`labs = $${idx++}`); params.push(JSON.stringify(labs)); }
      if (images !== undefined) { updates.push(`images = $${idx++}`); params.push(JSON.stringify(images)); }
      if (scenarioId !== undefined) { updates.push(`scenario_id = $${idx++}`); params.push(scenarioId); }
      if (blueprintWeight !== undefined) { updates.push(`blueprint_weight = $${idx++}`); params.push(blueprintWeight); }
      if (status !== undefined) {
        updates.push(`status = $${idx++}`); params.push(status);
        if (status === "published") {
          updates.push(`published_at = NOW()`);
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      params.push(req.params.id);
      const result = await pool.query(
        `UPDATE exam_questions SET ${updates.join(", ")} WHERE id = $${idx} RETURNING id`,
        params
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/qbank/question/:id/toggle-status", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const current = await pool.query(`SELECT status FROM exam_questions WHERE id = $1`, [req.params.id]);
      if (current.rows.length === 0) return res.status(404).json({ error: "Question not found" });

      const newStatus = current.rows[0].status === "published" ? "archived" : "published";
      const publishedAt = newStatus === "published" ? ", published_at = NOW()" : "";
      await pool.query(
        `UPDATE exam_questions SET status = $1${publishedAt} WHERE id = $2`,
        [newStatus, req.params.id]
      );

      res.json({ success: true, newStatus });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/qbank/analytics", async (req: any, res) => {
    try {
      const admin = await requireAdmin(req, res);
      if (!admin) return;

      const tier = (req.query.tier as string) || null;
      const validTiers = ["rpn", "rn", "np"];
      const safeTier = tier && validTiers.includes(tier) ? tier : null;

      const tierClause = safeTier ? "AND tier = $1" : "";
      const tierParams = safeTier ? [safeTier] : [];

      const [byCategory, byDifficulty, byExam, byRegion, byStatus, totalCount] = await Promise.all([
        pool.query(`SELECT body_system as category, COUNT(*) as count, 
                    COUNT(*) FILTER (WHERE status = 'published') as published
                    FROM exam_questions WHERE body_system IS NOT NULL ${tierClause}
                    GROUP BY body_system ORDER BY count DESC`, tierParams),
        pool.query(`SELECT difficulty, COUNT(*) as count,
                    COUNT(*) FILTER (WHERE status = 'published') as published
                    FROM exam_questions WHERE difficulty IS NOT NULL ${tierClause}
                    GROUP BY difficulty ORDER BY difficulty`, tierParams),
        pool.query(`SELECT exam, COUNT(*) as count,
                    COUNT(*) FILTER (WHERE status = 'published') as published
                    FROM exam_questions WHERE exam IS NOT NULL ${tierClause}
                    GROUP BY exam ORDER BY count DESC`, tierParams),
        pool.query(`SELECT region_scope, COUNT(*) as count
                    FROM exam_questions WHERE region_scope IS NOT NULL ${tierClause}
                    GROUP BY region_scope ORDER BY count DESC`, tierParams),
        pool.query(`SELECT status, COUNT(*) as count
                    FROM exam_questions WHERE 1=1 ${tierClause}
                    GROUP BY status ORDER BY count DESC`, tierParams),
        pool.query(`SELECT COUNT(*) FROM exam_questions WHERE 1=1 ${tierClause}`, tierParams),
      ]);

      const difficultyLabels: Record<number, string> = { 1: "Very Easy", 2: "Easy", 3: "Moderate", 4: "Hard", 5: "Very Hard" };

      res.json({
        total: parseInt(totalCount.rows[0].count),
        byCategory: byCategory.rows.map((r: any) => ({
          category: r.category, count: parseInt(r.count), published: parseInt(r.published),
        })),
        byDifficulty: byDifficulty.rows.map((r: any) => ({
          difficulty: r.difficulty, label: difficultyLabels[r.difficulty] || `Level ${r.difficulty}`,
          count: parseInt(r.count), published: parseInt(r.published),
        })),
        byExam: byExam.rows.map((r: any) => ({
          exam: r.exam, count: parseInt(r.count), published: parseInt(r.published),
        })),
        byRegion: byRegion.rows.map((r: any) => ({
          region: r.region_scope, count: parseInt(r.count),
        })),
        byStatus: byStatus.rows.map((r: any) => ({
          status: r.status, count: parseInt(r.count),
        })),
        tier: tier || "all",
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/qbank/filters", async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) return res.status(401).json({ error: "Authentication required" });

      const userTier = user.tier || "free";
      if (userTier === "free") return res.status(403).json({ error: "Upgrade required" });

      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
      } else {
        const requestedTier = (req.query.tier as string) || userTier;
        const allowed = getAllowedExamTiers(userTier);
        queryTier = allowed.includes(requestedTier) ? requestedTier : (allowed[0] || userTier);
      }

      const [bodySystems, difficulties, exams, topics, countryCodes, languageCodes, licensingBodies] = await Promise.all([
        pool.query(
          `SELECT DISTINCT body_system FROM exam_questions WHERE tier = $1 AND status = 'published' AND body_system IS NOT NULL ORDER BY body_system`,
          [queryTier]
        ),
        pool.query(
          `SELECT DISTINCT difficulty FROM exam_questions WHERE tier = $1 AND status = 'published' AND difficulty IS NOT NULL ORDER BY difficulty`,
          [queryTier]
        ),
        pool.query(
          `SELECT DISTINCT exam FROM exam_questions WHERE tier = $1 AND status = 'published' AND exam IS NOT NULL ORDER BY exam`,
          [queryTier]
        ),
        pool.query(
          `SELECT DISTINCT topic FROM exam_questions WHERE tier = $1 AND status = 'published' AND topic IS NOT NULL ORDER BY topic LIMIT 50`,
          [queryTier]
        ),
        pool.query(
          `SELECT DISTINCT country_code FROM exam_questions WHERE tier = $1 AND status = 'published' AND country_code IS NOT NULL ORDER BY country_code`,
          [queryTier]
        ),
        pool.query(
          `SELECT DISTINCT language_code FROM exam_questions WHERE tier = $1 AND status = 'published' AND language_code IS NOT NULL ORDER BY language_code`,
          [queryTier]
        ),
        pool.query(
          `SELECT DISTINCT licensing_body FROM exam_questions WHERE tier = $1 AND status = 'published' AND licensing_body IS NOT NULL ORDER BY licensing_body`,
          [queryTier]
        ),
      ]);

      const diffLabels: Record<number, string> = { 1: "Very Easy", 2: "Easy", 3: "Moderate", 4: "Hard", 5: "Very Hard" };

      res.json({
        bodySystems: bodySystems.rows.map((r: any) => r.body_system),
        difficulties: difficulties.rows.map((r: any) => ({ value: r.difficulty, label: diffLabels[r.difficulty] || `Level ${r.difficulty}` })),
        exams: exams.rows.map((r: any) => r.exam),
        topics: topics.rows.map((r: any) => r.topic),
        countryCodes: countryCodes.rows.map((r: any) => r.country_code),
        languageCodes: languageCodes.rows.map((r: any) => r.language_code),
        licensingBodies: licensingBodies.rows.map((r: any) => r.licensing_body),
        tier: queryTier,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/qbank/filter-options", qbankLimiter, async (req: any, res) => {
    try {
      const user = await resolveAuthUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const userTier = user.tier || "free";
      let queryTier: string;
      if (userTier === "admin") {
        queryTier = (req.query.tier as string) || "rpn";
      } else if (userTier === "free") {
        return res.status(403).json({ error: "Upgrade required" });
      } else {
        queryTier = userTier;
      }

      const userRegion = user.region || "US";
      let safetyFilter = "";
      const filterParams: any[] = [queryTier];
      if (userTier !== "admin") {
        const safeRegion = userRegion === "CA" ? "CAN" : "US";
        safetyFilter = ` AND (region_scope = $2 OR region_scope = 'BOTH')`;
        if (userRegion === "CA") {
          safetyFilter += ` AND exam != 'NCLEX-PN'`;
        } else {
          safetyFilter += ` AND exam != 'REx-PN'`;
        }
        filterParams.push(safeRegion);
      }

      const baseWhere = `tier = $1 AND status = 'published'${safetyFilter}`;

      const [exams, categories, difficulties, topics] = await Promise.all([
        pool.query(`SELECT DISTINCT exam FROM exam_questions WHERE ${baseWhere} ORDER BY exam`, filterParams),
        pool.query(`SELECT DISTINCT body_system FROM exam_questions WHERE ${baseWhere} AND body_system IS NOT NULL ORDER BY body_system`, filterParams),
        pool.query(`SELECT DISTINCT difficulty FROM exam_questions WHERE ${baseWhere} AND difficulty IS NOT NULL ORDER BY difficulty`, filterParams),
        pool.query(`SELECT DISTINCT subtopic FROM exam_questions WHERE ${baseWhere} AND subtopic IS NOT NULL ORDER BY subtopic`, filterParams),
      ]);

      const diffLabels: Record<number, string> = { 1: "easy", 2: "easy", 3: "moderate", 4: "hard", 5: "expert" };

      res.json({
        exams: exams.rows.map((r: any) => r.exam),
        categories: categories.rows.map((r: any) => r.body_system),
        difficulties: difficulties.rows.map((r: any) => ({ value: r.difficulty, label: diffLabels[r.difficulty] || String(r.difficulty) })),
        topics: topics.rows.map((r: any) => r.subtopic),
        tier: queryTier,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/content-stats", async (_req, res) => {
    try {
      const [lessonRes, questionRes, flashcardRes] = await Promise.all([
        pool.query(`SELECT COUNT(*) FROM content WHERE type = 'lesson' AND status = 'published'`).catch(() => ({ rows: [{ count: "240" }] })),
        pool.query(`SELECT COUNT(*) FROM exam_questions WHERE status = 'approved'`).catch(() => ({ rows: [{ count: "1000" }] })),
        pool.query(`SELECT COUNT(*) FROM flashcard_cards`).catch(() => ({ rows: [{ count: "500" }] })),
      ]);
      res.json({
        lessons: parseInt(lessonRes.rows[0]?.count) || 240,
        questions: parseInt(questionRes.rows[0]?.count) || 1000,
        flashcards: parseInt(flashcardRes.rows[0]?.count) || 500,
      });
    } catch {
      res.json({ lessons: 240, questions: 1000, flashcards: 500 });
    }
  });

  const demoLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: "Too many demo requests. Please try again later." },
    validate: { xForwardedForHeader: false, trustProxy: false },
  });

  app.get("/api/demo-exam/questions", demoLimiter, async (_req: any, res) => {
    try {
      const query = `SELECT id, tier, exam, question_type, stem, options, correct_answer, rationale, body_system, topic, subtopic, difficulty, scenario
                     FROM exam_questions
                     WHERE exam = 'NCLEX-RN' AND status = 'published'
                     ORDER BY RANDOM() LIMIT 75`;
      const result = await pool.query(query);

      const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

      const questions = result.rows.map((row: any) => {
        let parsedOptions = row.options;
        if (typeof parsedOptions === "string") {
          try { parsedOptions = JSON.parse(parsedOptions); } catch { parsedOptions = [parsedOptions]; }
        }

        let parsedCorrect = row.correct_answer;
        if (typeof parsedCorrect === "string") {
          try {
            parsedCorrect = JSON.parse(parsedCorrect);
            if (typeof parsedCorrect === "string") {
              const mapped = letterMap[parsedCorrect.toUpperCase()];
              if (mapped !== undefined) parsedCorrect = [mapped];
              else return null;
            }
          } catch {
            const mapped = letterMap[parsedCorrect.toUpperCase()];
            if (mapped !== undefined) parsedCorrect = [mapped];
            else return null;
          }
        }
        if (typeof parsedCorrect === "number") parsedCorrect = [parsedCorrect];
        if (!Array.isArray(parsedCorrect)) return null;

        const normalizedOptions = Array.isArray(parsedOptions)
          ? parsedOptions.map((o: any) => typeof o === "object" && o !== null ? (o.text || o.label || JSON.stringify(o)) : String(o))
          : parsedOptions;

        return {
          id: row.id,
          stem: row.stem,
          options: normalizedOptions,
          bodySystem: row.body_system,
          topic: row.topic,
          subtopic: row.subtopic,
          difficulty: row.difficulty,
          questionType: row.question_type,
          scenario: row.scenario,
        };
      }).filter((q: any) => q !== null);

      res.json({ questions, count: questions.length });
    } catch (e: any) {
      console.error("Demo exam questions error:", e.message);
      res.status(500).json({ error: "Failed to fetch demo questions" });
    }
  });

  app.post("/api/demo-exam/check-answer", demoLimiter, async (req: any, res) => {
    try {
      const { questionId, selectedOption } = req.body;
      if (!questionId || selectedOption === undefined) {
        return res.status(400).json({ error: "Missing questionId or selectedOption" });
      }

      const result = await pool.query(
        `SELECT correct_answer, body_system FROM exam_questions WHERE id = $1 AND exam = 'NCLEX-RN' AND status = 'published'`,
        [questionId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Question not found" });
      }

      const row = result.rows[0];
      const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
      let parsedCorrect = row.correct_answer;
      if (typeof parsedCorrect === "string") {
        try {
          parsedCorrect = JSON.parse(parsedCorrect);
          if (typeof parsedCorrect === "string") {
            const mapped = letterMap[parsedCorrect.toUpperCase()];
            parsedCorrect = mapped !== undefined ? [mapped] : [0];
          }
        } catch {
          const mapped = letterMap[parsedCorrect.toUpperCase()];
          parsedCorrect = mapped !== undefined ? [mapped] : [0];
        }
      }
      if (typeof parsedCorrect === "number") parsedCorrect = [parsedCorrect];
      if (!Array.isArray(parsedCorrect)) parsedCorrect = [0];

      const correctIndex = parsedCorrect[0];
      const isCorrect = selectedOption === correctIndex;

      res.json({
        correct: isCorrect,
        correctAnswer: correctIndex,
        bodySystem: row.body_system,
      });
    } catch (e: any) {
      console.error("Demo check-answer error:", e.message);
      res.status(500).json({ error: "Failed to check answer" });
    }
  });

  app.get("/api/qbank/international-stats", async (_req: any, res) => {
    try {
      const result = await pool.query(`
        SELECT exam, country_code, licensing_body,
               COUNT(*) as total,
               SUM(CASE WHEN is_mock_exam_eligible = true THEN 1 ELSE 0 END) as mock_eligible
        FROM exam_questions
        WHERE exam IN ('NMC-CBT', 'AHPRA-RN', 'GULF-NURSING')
          AND status = 'published'
        GROUP BY exam, country_code, licensing_body
        ORDER BY exam
      `);

      const domainResult = await pool.query(`
        SELECT exam,
               COALESCE(domain, body_system) as domain,
               COUNT(*) as count
        FROM exam_questions
        WHERE exam IN ('NMC-CBT', 'AHPRA-RN', 'GULF-NURSING')
          AND status = 'published'
        GROUP BY exam, COALESCE(domain, body_system)
        ORDER BY exam, count DESC
      `);

      const stats: Record<string, {
        exam: string;
        countryCode: string;
        licensingBody: string;
        total: number;
        mockEligible: number;
        domains: { domain: string; count: number }[];
      }> = {};

      for (const row of result.rows) {
        stats[row.exam] = {
          exam: row.exam,
          countryCode: row.country_code,
          licensingBody: row.licensing_body,
          total: parseInt(row.total),
          mockEligible: parseInt(row.mock_eligible),
          domains: [],
        };
      }

      for (const row of domainResult.rows) {
        if (stats[row.exam]) {
          stats[row.exam].domains.push({
            domain: row.domain,
            count: parseInt(row.count),
          });
        }
      }

      res.json({ stats });
    } catch (e: any) {
      console.error("International stats error:", e.message);
      res.status(500).json({ error: "Failed to fetch international stats" });
    }
  });
}
