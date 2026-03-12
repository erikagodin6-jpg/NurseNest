import { pool } from "./storage";
import { fisherYatesShuffle, weightedInterleaveShuffle, shuffleOptions } from "../shared/shuffle";

interface CardResponse {
  userId: string;
  cardId: string;
  isCorrect: boolean;
  confidence: "confident" | "unsure" | "guess";
  selectedOption?: number;
  timeSpent?: number;
  studyMode?: string;
}

interface MasteryProfile {
  topic: string;
  subtopic: string | null;
  blueprintCategory: string | null;
  totalAttempts: number;
  correctCount: number;
  avgConfidence: number;
  masteryLevel: number;
  lastReviewedAt: string | null;
  nextDueAt: string | null;
}

interface DashboardData {
  totalCardsStudied: number;
  totalCorrect: number;
  overallAccuracy: number;
  masteryByTopic: MasteryProfile[];
  weakAreas: MasteryProfile[];
  cardsDueForReview: number;
  recentAccuracy: number;
  confidenceTrend: { date: string; avgConfidence: number }[];
  studyTimeTotal: number;
  flaggedCount: number;
  masteredCount: number;
  streakDays: number;
}

const CONFIDENCE_MULTIPLIER: Record<string, number> = {
  confident: 1.0,
  unsure: 0.6,
  guess: 0.3,
};

function calculateMasteryLevel(correctCount: number, totalAttempts: number, avgConfidence: number): number {
  if (totalAttempts === 0) return 0;
  const accuracy = correctCount / totalAttempts;
  const confidenceWeight = avgConfidence || 0.5;
  return Math.min(1, accuracy * 0.7 + confidenceWeight * 0.3);
}

function calculateNextDueDate(masteryLevel: number, confidence: string, isCorrect: boolean, repetitions: number): Date {
  const now = new Date();
  let intervalDays: number;

  if (!isCorrect) {
    intervalDays = 0.25;
  } else {
    const confMultiplier = CONFIDENCE_MULTIPLIER[confidence] || 0.5;
    const baseDays = Math.min(90, Math.pow(2.5, repetitions));
    intervalDays = baseDays * confMultiplier * (0.5 + masteryLevel * 0.5);
  }

  intervalDays = Math.max(0.25, Math.min(90, intervalDays));
  const nextDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  return nextDate;
}

export async function recordCardResponse(response: CardResponse): Promise<void> {
  await pool.query(
    `INSERT INTO user_card_responses (id, user_id, card_id, is_correct, confidence, selected_option, time_spent, study_mode, reviewed_at)
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW())`,
    [response.userId, response.cardId, response.isCorrect, response.confidence, response.selectedOption ?? null, response.timeSpent ?? null, response.studyMode ?? "learn"]
  );

  const cardResult = await pool.query(
    `SELECT topic, subtopic, blueprint_category, question_type, tier FROM flashcard_bank WHERE id = $1`,
    [response.cardId]
  );
  const card = cardResult.rows[0];
  if (!card) return;

  const topic = card.topic || card.blueprint_category || "General";
  const confVal = CONFIDENCE_MULTIPLIER[response.confidence] || 0.5;

  const initMastery = calculateMasteryLevel(response.isCorrect ? 1 : 0, 1, confVal);
  const initNextDue = calculateNextDueDate(initMastery, response.confidence, response.isCorrect, 1);

  await pool.query(
    `INSERT INTO user_mastery_profiles (id, user_id, tier, topic, subtopic, blueprint_category, question_type, total_attempts, correct_count, avg_confidence, mastery_level, last_reviewed_at, next_due_at)
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 1, $7, $8, $9, NOW(), $10)
     ON CONFLICT (user_id, topic, tier) DO UPDATE SET
       total_attempts = user_mastery_profiles.total_attempts + 1,
       correct_count = user_mastery_profiles.correct_count + $7,
       avg_confidence = (user_mastery_profiles.avg_confidence * user_mastery_profiles.total_attempts + $8) / (user_mastery_profiles.total_attempts + 1),
       mastery_level = CASE
         WHEN user_mastery_profiles.total_attempts + 1 > 0 THEN
           LEAST(1.0, GREATEST(0.0,
             (user_mastery_profiles.correct_count + $7)::float / (user_mastery_profiles.total_attempts + 1) * 0.7 +
             ((user_mastery_profiles.avg_confidence * user_mastery_profiles.total_attempts + $8) / (user_mastery_profiles.total_attempts + 1)) * 0.3
           ))
         ELSE $9
       END,
       last_reviewed_at = NOW(),
       next_due_at = $10,
       subtopic = COALESCE($4, user_mastery_profiles.subtopic),
       blueprint_category = COALESCE($5, user_mastery_profiles.blueprint_category),
       question_type = COALESCE($6, user_mastery_profiles.question_type),
       updated_at = NOW()`,
    [response.userId, card.tier, topic, card.subtopic, card.blueprint_category, card.question_type, response.isCorrect ? 1 : 0, confVal, initMastery, initNextDue]
  );
}

export async function getMasteryProfile(userId: string): Promise<MasteryProfile[]> {
  const result = await pool.query(
    `SELECT topic, subtopic, blueprint_category, total_attempts, correct_count, avg_confidence, mastery_level, last_reviewed_at, next_due_at
     FROM user_mastery_profiles WHERE user_id = $1 ORDER BY mastery_level ASC`,
    [userId]
  );
  return result.rows.map((r: any) => ({
    topic: r.topic,
    subtopic: r.subtopic,
    blueprintCategory: r.blueprint_category,
    totalAttempts: r.total_attempts,
    correctCount: r.correct_count,
    avgConfidence: r.avg_confidence,
    masteryLevel: r.mastery_level,
    lastReviewedAt: r.last_reviewed_at,
    nextDueAt: r.next_due_at,
  }));
}

export async function getWeakAreas(userId: string, limit = 10): Promise<MasteryProfile[]> {
  const result = await pool.query(
    `SELECT topic, subtopic, blueprint_category, total_attempts, correct_count, avg_confidence, mastery_level, last_reviewed_at, next_due_at
     FROM user_mastery_profiles WHERE user_id = $1 AND total_attempts >= 2
     ORDER BY mastery_level ASC, avg_confidence ASC
     LIMIT $2`,
    [userId, limit]
  );
  return result.rows.map((r: any) => ({
    topic: r.topic,
    subtopic: r.subtopic,
    blueprintCategory: r.blueprint_category,
    totalAttempts: r.total_attempts,
    correctCount: r.correct_count,
    avgConfidence: r.avg_confidence,
    masteryLevel: r.mastery_level,
    lastReviewedAt: r.last_reviewed_at,
    nextDueAt: r.next_due_at,
  }));
}

type StudyMode = "learn" | "test" | "rapid" | "weak" | "cram" | "spaced";

export async function getNextCards(
  userId: string,
  tier: string,
  mode: StudyMode,
  limit = 20,
  filters?: {
    topic?: string;
    bodySystem?: string;
    difficulty?: number;
    blueprintCategory?: string;
    questionType?: string;
    flaggedOnly?: boolean;
    missedOnly?: boolean;
  }
): Promise<any[]> {
  const conditions = ["fb.status = 'published'", "fb.flashcard_enabled = true"];
  const params: any[] = [];
  let paramIdx = 1;

  const allowedTiers = ["free"];
  if (tier === "rpn" || tier === "rn" || tier === "np" || tier === "admin") allowedTiers.push(tier);
  if (tier === "admin") allowedTiers.push("rpn", "rn", "np");
  conditions.push(`fb.tier = ANY($${paramIdx++})`);
  params.push(allowedTiers);

  if (filters?.topic) {
    conditions.push(`(fb.topic = $${paramIdx} OR fb.category = $${paramIdx})`);
    params.push(filters.topic);
    paramIdx++;
  }
  if (filters?.bodySystem) {
    conditions.push(`fb.body_system = $${paramIdx++}`);
    params.push(filters.bodySystem);
  }
  if (filters?.difficulty) {
    conditions.push(`fb.difficulty = $${paramIdx++}`);
    params.push(filters.difficulty);
  }
  if (filters?.blueprintCategory) {
    conditions.push(`fb.blueprint_category = $${paramIdx++}`);
    params.push(filters.blueprintCategory);
  }
  if (filters?.questionType) {
    conditions.push(`fb.question_type = $${paramIdx++}`);
    params.push(filters.questionType);
  }

  let extraJoin = "";
  let orderClause = "RANDOM()";

  const recentCardIds = await getRecentCardIds(userId, 20);
  const fetchMultiplier = recentCardIds.length > 0 ? 3 : 1;

  let weakTopicNames: string[] = [];
  switch (mode) {
    case "weak": {
      const weakTopics = await getWeakAreas(userId, 20);
      if (weakTopics.length > 0) {
        weakTopicNames = weakTopics.map(w => w.topic);
        conditions.push(`(fb.topic = ANY($${paramIdx}) OR fb.category = ANY($${paramIdx}))`);
        params.push(weakTopicNames);
        paramIdx++;
      }
      break;
    }
    case "spaced": {
      extraJoin = `LEFT JOIN (
        SELECT card_id, MAX(reviewed_at) as last_review, COUNT(*) as review_count,
               AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END) as accuracy
        FROM user_card_responses WHERE user_id = $${paramIdx++}
        GROUP BY card_id
      ) ucr ON ucr.card_id = fb.id`;
      params.push(userId);
      orderClause = `COALESCE(ucr.last_review, '1970-01-01') ASC, COALESCE(ucr.accuracy, 0) ASC`;
      break;
    }
    case "cram": {
      orderClause = `COALESCE(fb.difficulty, 3) DESC, RANDOM()`;
      break;
    }
  }

  if (filters?.missedOnly) {
    extraJoin += ` INNER JOIN (
      SELECT DISTINCT card_id FROM user_card_responses 
      WHERE user_id = $${paramIdx++} AND is_correct = false
    ) missed ON missed.card_id = fb.id`;
    params.push(userId);
  }

  const historyJoin = `LEFT JOIN (
    SELECT card_id,
           COUNT(*) as response_count,
           SUM(CASE WHEN is_correct = false THEN 1 ELSE 0 END) as incorrect_count,
           bool_or(confidence = 'guess') as was_guessed
    FROM user_card_responses WHERE user_id = $${paramIdx++}
    GROUP BY card_id
  ) hist ON hist.card_id = fb.id`;
  params.push(userId);

  let recentExclusionClause = "";
  if (recentCardIds.length > 0) {
    recentExclusionClause = `AND fb.id != ALL($${paramIdx++})`;
    params.push(recentCardIds);
  }

  const finalWhere = conditions.join(" AND ");
  const fetchLimit = limit * fetchMultiplier;
  const query = `
    SELECT fb.id, fb.front, fb.back, fb.category, fb.tier, fb.difficulty,
           fb.question_type, fb.options, fb.correct_answer, fb.rationale_correct,
           fb.distractor_rationales, fb.clinical_takeaway, fb.exam_pearl,
           fb.rationale_media, fb.lesson_links, fb.body_system, fb.topic, fb.subtopic,
           fb.region_scope, fb.blueprint_category,
           COALESCE(hist.incorrect_count, 0) as _incorrect_count,
           COALESCE(hist.was_guessed, false) as _was_guessed
    FROM flashcard_bank fb
    ${extraJoin}
    ${historyJoin}
    WHERE ${finalWhere} ${recentExclusionClause}
    ORDER BY ${orderClause}
    LIMIT $${paramIdx++}
  `;
  params.push(fetchLimit);

  const result = await pool.query(query, params);
  let cards = result.rows;

  if (recentCardIds.length > 0 && cards.length < limit) {
    const existingIds = new Set(cards.map((c: any) => c.id));
    const fallbackParams = [...params];
    fallbackParams[fallbackParams.length - 1] = limit - cards.length;
    const recentIdx = params.indexOf(recentCardIds);
    if (recentIdx >= 0) {
      const fallbackConditions = conditions.join(" AND ");
      const fallbackQuery = `
        SELECT fb.id, fb.front, fb.back, fb.category, fb.tier, fb.difficulty,
               fb.question_type, fb.options, fb.correct_answer, fb.rationale_correct,
               fb.distractor_rationales, fb.clinical_takeaway, fb.exam_pearl,
               fb.rationale_media, fb.lesson_links, fb.body_system, fb.topic, fb.subtopic,
               fb.region_scope, fb.blueprint_category,
               COALESCE(hist.incorrect_count, 0) as _incorrect_count,
               COALESCE(hist.was_guessed, false) as _was_guessed
        FROM flashcard_bank fb
        ${extraJoin}
        ${historyJoin}
        WHERE ${fallbackConditions} AND fb.id = ANY($${recentIdx + 1})
        ORDER BY RANDOM()
        LIMIT ${limit - cards.length}
      `;
      try {
        const fallbackResult = await pool.query(fallbackQuery, params.slice(0, -1));
        const fallbackCards = fallbackResult.rows.filter((c: any) => !existingIds.has(c.id));
        cards = [...cards, ...fallbackCards];
      } catch {}
    }
  }

  const weakTopicSet = new Set(weakTopicNames);
  const weighted = weightedInterleaveShuffle(cards, (card: any) => {
    let weight = 0;
    if (card._incorrect_count > 0) weight += 3;
    if (card._was_guessed) weight += 2;
    if (weakTopicSet.size > 0 && (weakTopicSet.has(card.topic) || weakTopicSet.has(card.category))) weight += 2;
    return weight;
  });

  const finalCards = weighted.slice(0, limit).map((card: any) => {
    const { _incorrect_count, _was_guessed, ...cleanCard } = card;
    const camelCard = snakeToCamel(cleanCard);

    if (camelCard.options && Array.isArray(camelCard.options) && camelCard.options.length > 1 && camelCard.correctAnswer !== undefined) {
      const correctIdx = typeof camelCard.correctAnswer === 'number' ? camelCard.correctAnswer : parseInt(camelCard.correctAnswer);
      if (!isNaN(correctIdx) && correctIdx >= 0 && correctIdx < camelCard.options.length) {
        const { shuffledOptions, newCorrectIndex, permutation } = shuffleOptions(camelCard.options, correctIdx);
        camelCard.options = shuffledOptions;
        camelCard.correctAnswer = newCorrectIndex;
        if (camelCard.distractorRationales && Array.isArray(camelCard.distractorRationales)) {
          const origRationales = [...camelCard.distractorRationales];
          camelCard.distractorRationales = permutation.map((origIdx: number) => origRationales[origIdx] || null);
        }
      }
    }

    return camelCard;
  });

  return finalCards;
}

async function getRecentCardIds(userId: string, count: number): Promise<string[]> {
  const result = await pool.query(
    `SELECT card_id FROM user_card_responses
     WHERE user_id = $1
     ORDER BY reviewed_at DESC
     LIMIT $2`,
    [userId, count]
  );
  return result.rows.map((r: any) => r.card_id);
}

export async function getDashboard(userId: string): Promise<DashboardData> {
  const [totalStats, recentStats, confidenceTrend, dueCount, topicMastery] = await Promise.all([
    pool.query(
      `SELECT COUNT(*) as total, SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
              COALESCE(SUM(time_spent), 0) as total_time
       FROM user_card_responses WHERE user_id = $1`, [userId]
    ),
    pool.query(
      `SELECT COUNT(*) as total, SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct
       FROM user_card_responses WHERE user_id = $1 AND reviewed_at > NOW() - INTERVAL '7 days'`, [userId]
    ),
    pool.query(
      `SELECT DATE(reviewed_at) as date, AVG(
         CASE confidence WHEN 'confident' THEN 1.0 WHEN 'unsure' THEN 0.6 ELSE 0.3 END
       ) as avg_confidence
       FROM user_card_responses WHERE user_id = $1 AND reviewed_at > NOW() - INTERVAL '30 days'
       GROUP BY DATE(reviewed_at) ORDER BY DATE(reviewed_at)`, [userId]
    ),
    pool.query(
      `SELECT COUNT(*) as due FROM user_mastery_profiles
       WHERE user_id = $1 AND next_due_at <= NOW()`, [userId]
    ),
    pool.query(
      `SELECT topic, subtopic, blueprint_category, total_attempts, correct_count, avg_confidence, mastery_level, last_reviewed_at, next_due_at
       FROM user_mastery_profiles WHERE user_id = $1 ORDER BY mastery_level ASC`, [userId]
    ),
  ]);

  const total = parseInt(totalStats.rows[0]?.total || "0");
  const correct = parseInt(totalStats.rows[0]?.correct || "0");
  const recentTotal = parseInt(recentStats.rows[0]?.total || "0");
  const recentCorrect = parseInt(recentStats.rows[0]?.correct || "0");

  const streakResult = await pool.query(
    `SELECT DISTINCT DATE(reviewed_at) as d FROM user_card_responses
     WHERE user_id = $1 ORDER BY d DESC LIMIT 30`, [userId]
  );
  let streakDays = 0;
  const today = new Date();
  for (const row of streakResult.rows) {
    const d = new Date(row.d);
    const diff = Math.floor((today.getTime() - d.getTime()) / (24 * 60 * 60 * 1000));
    if (diff === streakDays) streakDays++;
    else break;
  }

  const mastery = topicMastery.rows.map((r: any) => ({
    topic: r.topic,
    subtopic: r.subtopic,
    blueprintCategory: r.blueprint_category,
    totalAttempts: r.total_attempts,
    correctCount: r.correct_count,
    avgConfidence: r.avg_confidence,
    masteryLevel: r.mastery_level,
    lastReviewedAt: r.last_reviewed_at,
    nextDueAt: r.next_due_at,
  }));

  return {
    totalCardsStudied: total,
    totalCorrect: correct,
    overallAccuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
    masteryByTopic: mastery,
    weakAreas: mastery.filter(m => m.masteryLevel < 0.5).slice(0, 10),
    cardsDueForReview: parseInt(dueCount.rows[0]?.due || "0"),
    recentAccuracy: recentTotal > 0 ? Math.round((recentCorrect / recentTotal) * 100) : 0,
    confidenceTrend: confidenceTrend.rows.map((r: any) => ({
      date: r.date,
      avgConfidence: parseFloat(r.avg_confidence),
    })),
    studyTimeTotal: parseInt(totalStats.rows[0]?.total_time || "0"),
    flaggedCount: 0,
    masteredCount: mastery.filter(m => m.masteryLevel >= 0.85).length,
    streakDays,
  };
}

function snakeToCamel(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  const result: any = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result;
}
