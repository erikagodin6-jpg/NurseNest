import { pool } from "./storage";
import { fisherYatesShuffle, weightedInterleaveShuffle, shuffleOptions } from "../shared/shuffle";

export interface CardResponse {
  userId: string;
  cardId: string;
  isCorrect: boolean;
  confidence: "confident" | "unsure" | "guess";
  selectedOption?: number;
  timeSpent?: number;
  studyMode?: string;
  sessionId?: string;
}

export interface MasteryProfile {
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

export interface CardStats {
  cardId: string;
  timesSeen: number;
  timesCorrect: number;
  timesIncorrect: number;
  lastSeenAt: string | null;
  averageResponseTime: number;
  confidenceRating: string;
  flagged: boolean;
  mastered: boolean;
  streakCorrect: number;
  streakIncorrect: number;
  masteryState: string;
  nextReviewAt: string | null;
}

export interface DashboardData {
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
  bestTopic: string | null;
  weakestTopic: string | null;
  recommendedSessionType: string;
  lessonRemediation: { topic: string; missCount: number; lessonLinks: any[] }[];
  masteryDistribution: { state: string; count: number }[];
}

export interface AdaptiveWeights {
  weakTopicWeight: number;
  incorrectHistoryWeight: number;
  lowConfidenceWeight: number;
  flaggedWeight: number;
  notSeenWeight: number;
  masteredPenalty: number;
  correctStreakPenalty: number;
}

export interface SpacedIntervals {
  incorrect: number;
  unsure: number;
  confident: number;
  mastered: number;
}

export type MasteryState = "new" | "learning" | "improving" | "nearlyMastered" | "mastered";
export type SessionType = "recommended" | "weakAreas" | "dueForReview" | "flagged" | "rapidReview" | "mixedAdaptive" | "preExamBoost";

const CONFIDENCE_MULTIPLIER: Record<string, number> = {
  confident: 1.0,
  unsure: 0.6,
  guess: 0.3,
};

const DEFAULT_WEIGHTS: AdaptiveWeights = {
  weakTopicWeight: 4,
  incorrectHistoryWeight: 5,
  lowConfidenceWeight: 4,
  flaggedWeight: 3,
  notSeenWeight: 2,
  masteredPenalty: -5,
  correctStreakPenalty: -4,
};

const DEFAULT_INTERVALS: SpacedIntervals = {
  incorrect: 1,
  unsure: 3,
  confident: 10,
  mastered: 30,
};

const SESSION_BAND_CONFIG: Record<SessionType, { weak: number; due: number; recentIncorrect: number; mixed: number; reinforcement: number }> = {
  recommended: { weak: 6, due: 4, recentIncorrect: 4, mixed: 4, reinforcement: 2 },
  weakAreas: { weak: 14, due: 2, recentIncorrect: 2, mixed: 1, reinforcement: 1 },
  dueForReview: { weak: 2, due: 12, recentIncorrect: 2, mixed: 2, reinforcement: 2 },
  flagged: { weak: 0, due: 0, recentIncorrect: 0, mixed: 0, reinforcement: 0 },
  rapidReview: { weak: 4, due: 4, recentIncorrect: 4, mixed: 6, reinforcement: 2 },
  mixedAdaptive: { weak: 5, due: 4, recentIncorrect: 3, mixed: 5, reinforcement: 3 },
  preExamBoost: { weak: 7, due: 3, recentIncorrect: 5, mixed: 3, reinforcement: 2 },
};

async function getAdaptiveConfig(): Promise<{ weights: AdaptiveWeights; intervals: SpacedIntervals; thresholds: any }> {
  try {
    const result = await pool.query(`SELECT * FROM adaptive_config WHERE config_key = 'default' LIMIT 1`);
    if (result.rows.length === 0) return { weights: DEFAULT_WEIGHTS, intervals: DEFAULT_INTERVALS, thresholds: { weakTopic: 0.7, weakSubtopic: 0.65, improving: 0.5, nearlyMastered: 0.7, mastered: 0.85 } };
    const r = result.rows[0];
    return {
      weights: {
        weakTopicWeight: r.weak_topic_weight ?? 4,
        incorrectHistoryWeight: r.incorrect_history_weight ?? 5,
        lowConfidenceWeight: r.low_confidence_weight ?? 4,
        flaggedWeight: r.flagged_weight ?? 3,
        notSeenWeight: r.not_seen_weight ?? 2,
        masteredPenalty: r.mastered_penalty ?? -5,
        correctStreakPenalty: r.correct_streak_penalty ?? -4,
      },
      intervals: {
        incorrect: r.interval_incorrect ?? 1,
        unsure: r.interval_unsure ?? 3,
        confident: r.interval_confident ?? 10,
        mastered: r.interval_mastered ?? 30,
      },
      thresholds: {
        weakTopic: r.weak_topic_threshold ?? 0.7,
        weakSubtopic: r.weak_subtopic_threshold ?? 0.65,
        improving: r.mastery_threshold_improving ?? 0.5,
        nearlyMastered: r.mastery_threshold_nearly_mastered ?? 0.7,
        mastered: r.mastery_threshold_mastered ?? 0.85,
      },
    };
  } catch {
    return { weights: DEFAULT_WEIGHTS, intervals: DEFAULT_INTERVALS, thresholds: { weakTopic: 0.7, weakSubtopic: 0.65, improving: 0.5, nearlyMastered: 0.7, mastered: 0.85 } };
  }
}

function computeMasteryState(timesSeen: number, accuracy: number, avgConfidence: number, streakCorrect: number, thresholds: any): MasteryState {
  if (timesSeen === 0) return "new";
  const score = accuracy * 0.5 + avgConfidence * 0.3 + Math.min(streakCorrect / 5, 1) * 0.2;
  if (score >= thresholds.mastered && timesSeen >= 5 && streakCorrect >= 3) return "mastered";
  if (score >= thresholds.nearlyMastered && timesSeen >= 3) return "nearlyMastered";
  if (score >= thresholds.improving && timesSeen >= 2) return "improving";
  return "learning";
}

function calculateNextReviewDate(masteryState: MasteryState, confidence: string, isCorrect: boolean, intervals: SpacedIntervals): Date {
  const now = new Date();
  let days: number;
  if (!isCorrect) {
    days = intervals.incorrect;
  } else if (confidence === "guess") {
    days = intervals.unsure;
  } else if (confidence === "unsure") {
    days = (intervals.unsure + intervals.confident) / 2;
  } else {
    if (masteryState === "mastered") {
      days = intervals.mastered + Math.random() * 15;
    } else {
      days = intervals.confident + Math.random() * 4;
    }
  }
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

function calculatePriorityScore(card: any, weights: AdaptiveWeights, weakTopics: Set<string>): number {
  let score = 0;
  const topic = card.topic || card.category || "";
  if (weakTopics.has(topic)) score += weights.weakTopicWeight;
  if ((card._incorrect_count || 0) > 0) score += weights.incorrectHistoryWeight;
  if (card._avg_confidence && card._avg_confidence < 0.5) score += weights.lowConfidenceWeight;
  if (card._flagged) score += weights.flaggedWeight;
  if (!card._last_seen_at) score += weights.notSeenWeight;
  else {
    const daysSince = (Date.now() - new Date(card._last_seen_at).getTime()) / (24 * 60 * 60 * 1000);
    if (daysSince > 14) score += weights.notSeenWeight;
    else if (daysSince > 7) score += Math.floor(weights.notSeenWeight / 2);
  }
  if (card._mastered) score += weights.masteredPenalty;
  if ((card._streak_correct || 0) >= 3 && card._avg_confidence > 0.8) score += weights.correctStreakPenalty;
  return score;
}

export async function recordCardResponse(response: CardResponse): Promise<{ masteryState: MasteryState; nextReviewAt: Date }> {
  const config = await getAdaptiveConfig();

  await pool.query(
    `INSERT INTO user_card_responses (id, user_id, card_id, is_correct, confidence, selected_option, time_spent, study_mode, session_id, reviewed_at)
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
    [response.userId, response.cardId, response.isCorrect, response.confidence, response.selectedOption ?? null, response.timeSpent ?? null, response.studyMode ?? "learn", response.sessionId ?? null]
  );

  const existingStats = await pool.query(
    `SELECT * FROM user_card_stats WHERE user_id = $1 AND card_id = $2`,
    [response.userId, response.cardId]
  );

  const confVal = CONFIDENCE_MULTIPLIER[response.confidence] || 0.5;
  let newTimesSeen: number, newTimesCorrect: number, newTimesIncorrect: number;
  let newStreakCorrect: number, newStreakIncorrect: number, newAvgResponse: number;

  if (existingStats.rows.length > 0) {
    const s = existingStats.rows[0];
    newTimesSeen = s.times_seen + 1;
    newTimesCorrect = s.times_correct + (response.isCorrect ? 1 : 0);
    newTimesIncorrect = s.times_incorrect + (response.isCorrect ? 0 : 1);
    newStreakCorrect = response.isCorrect ? s.streak_correct + 1 : 0;
    newStreakIncorrect = response.isCorrect ? 0 : s.streak_incorrect + 1;
    newAvgResponse = response.timeSpent ? (s.average_response_time * s.times_seen + response.timeSpent) / newTimesSeen : s.average_response_time;
  } else {
    newTimesSeen = 1;
    newTimesCorrect = response.isCorrect ? 1 : 0;
    newTimesIncorrect = response.isCorrect ? 0 : 1;
    newStreakCorrect = response.isCorrect ? 1 : 0;
    newStreakIncorrect = response.isCorrect ? 0 : 1;
    newAvgResponse = response.timeSpent || 0;
  }

  const accuracy = newTimesSeen > 0 ? newTimesCorrect / newTimesSeen : 0;
  const isTrulyMastered = response.isCorrect && response.confidence === "confident" && newStreakCorrect >= 3 && accuracy >= config.thresholds.mastered;
  const masteryState = computeMasteryState(newTimesSeen, accuracy, confVal, newStreakCorrect, config.thresholds);
  const nextReview = calculateNextReviewDate(masteryState, response.confidence, response.isCorrect, config.intervals);

  await pool.query(
    `INSERT INTO user_card_stats (id, user_id, card_id, times_seen, times_correct, times_incorrect, last_seen_at, last_answered_at, average_response_time, confidence_rating, flagged, mastered, streak_correct, streak_incorrect, mastery_state, next_review_at)
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW(), $6, $7, false, $8, $9, $10, $11, $12)
     ON CONFLICT (user_id, card_id) DO UPDATE SET
       times_seen = $3,
       times_correct = $4,
       times_incorrect = $5,
       last_seen_at = NOW(),
       last_answered_at = NOW(),
       average_response_time = $6,
       confidence_rating = $7,
       mastered = $8,
       streak_correct = $9,
       streak_incorrect = $10,
       mastery_state = $11,
       next_review_at = $12,
       updated_at = NOW()`,
    [response.userId, response.cardId, newTimesSeen, newTimesCorrect, newTimesIncorrect, newAvgResponse, response.confidence, isTrulyMastered, newStreakCorrect, newStreakIncorrect, masteryState, nextReview]
  );

  const cardResult = await pool.query(
    `SELECT topic, subtopic, blueprint_category, question_type, tier FROM flashcard_bank WHERE id = $1`,
    [response.cardId]
  );
  const card = cardResult.rows[0];
  if (card) {
    const topic = card.topic || card.blueprint_category || "General";
    const initMastery = accuracy * 0.7 + confVal * 0.3;
    await pool.query(
      `INSERT INTO user_mastery_profiles (id, user_id, tier, topic, subtopic, blueprint_category, question_type, total_attempts, correct_count, avg_confidence, mastery_level, last_reviewed_at, next_due_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, 1, $7, $8, $9, NOW(), $10)
       ON CONFLICT (user_id, topic, tier) DO UPDATE SET
         total_attempts = user_mastery_profiles.total_attempts + 1,
         correct_count = user_mastery_profiles.correct_count + $7,
         avg_confidence = (user_mastery_profiles.avg_confidence * user_mastery_profiles.total_attempts + $8) / (user_mastery_profiles.total_attempts + 1),
         mastery_level = LEAST(1.0, GREATEST(0.0,
           (user_mastery_profiles.correct_count + $7)::float / (user_mastery_profiles.total_attempts + 1) * 0.7 +
           ((user_mastery_profiles.avg_confidence * user_mastery_profiles.total_attempts + $8) / (user_mastery_profiles.total_attempts + 1)) * 0.3
         )),
         last_reviewed_at = NOW(),
         next_due_at = $10,
         subtopic = COALESCE($4, user_mastery_profiles.subtopic),
         blueprint_category = COALESCE($5, user_mastery_profiles.blueprint_category),
         question_type = COALESCE($6, user_mastery_profiles.question_type),
         updated_at = NOW()`,
      [response.userId, card.tier, topic, card.subtopic, card.blueprint_category, card.question_type, response.isCorrect ? 1 : 0, confVal, initMastery, nextReview]
    );
  }

  return { masteryState, nextReviewAt: nextReview };
}

export async function flagCard(userId: string, cardId: string, flagged: boolean): Promise<void> {
  await pool.query(
    `INSERT INTO user_card_stats (id, user_id, card_id, flagged)
     VALUES (gen_random_uuid(), $1, $2, $3)
     ON CONFLICT (user_id, card_id) DO UPDATE SET flagged = $3, updated_at = NOW()`,
    [userId, cardId, flagged]
  );
}

export async function markCardMastered(userId: string, cardId: string, mastered: boolean): Promise<void> {
  const state = mastered ? "mastered" : "learning";
  await pool.query(
    `INSERT INTO user_card_stats (id, user_id, card_id, mastered, mastery_state)
     VALUES (gen_random_uuid(), $1, $2, $3, $4)
     ON CONFLICT (user_id, card_id) DO UPDATE SET mastered = $3, mastery_state = $4, updated_at = NOW()`,
    [userId, cardId, mastered, state]
  );
}

export async function requestStudyAgainSoon(userId: string, cardId: string): Promise<void> {
  const soon = new Date(Date.now() + 6 * 60 * 60 * 1000);
  await pool.query(
    `INSERT INTO user_card_stats (id, user_id, card_id, next_review_at)
     VALUES (gen_random_uuid(), $1, $2, $3)
     ON CONFLICT (user_id, card_id) DO UPDATE SET next_review_at = $3, updated_at = NOW()`,
    [userId, cardId, soon]
  );
}

export async function getCardStats(userId: string, cardId: string): Promise<CardStats | null> {
  const result = await pool.query(
    `SELECT * FROM user_card_stats WHERE user_id = $1 AND card_id = $2`,
    [userId, cardId]
  );
  if (result.rows.length === 0) return null;
  const r = result.rows[0];
  return {
    cardId: r.card_id,
    timesSeen: r.times_seen,
    timesCorrect: r.times_correct,
    timesIncorrect: r.times_incorrect,
    lastSeenAt: r.last_seen_at,
    averageResponseTime: r.average_response_time,
    confidenceRating: r.confidence_rating,
    flagged: r.flagged,
    mastered: r.mastered,
    streakCorrect: r.streak_correct,
    streakIncorrect: r.streak_incorrect,
    masteryState: r.mastery_state,
    nextReviewAt: r.next_review_at,
  };
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
  const config = await getAdaptiveConfig();
  const result = await pool.query(
    `SELECT topic, subtopic, blueprint_category, total_attempts, correct_count, avg_confidence, mastery_level, last_reviewed_at, next_due_at
     FROM user_mastery_profiles WHERE user_id = $1 AND total_attempts >= 2
     AND (correct_count::float / GREATEST(total_attempts, 1)) < $2
     ORDER BY mastery_level ASC, avg_confidence ASC
     LIMIT $3`,
    [userId, config.thresholds.weakTopic, limit]
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

async function getRecentCardIds(userId: string, count: number): Promise<string[]> {
  const result = await pool.query(
    `SELECT card_id FROM user_card_responses WHERE user_id = $1 ORDER BY reviewed_at DESC LIMIT $2`,
    [userId, count]
  );
  return result.rows.map((r: any) => r.card_id);
}

async function getWeakTopicNames(userId: string): Promise<string[]> {
  const weakAreas = await getWeakAreas(userId, 20);
  return weakAreas.map(w => w.topic).filter(Boolean) as string[];
}

async function getDueCardIds(userId: string, limit: number): Promise<string[]> {
  const result = await pool.query(
    `SELECT card_id FROM user_card_stats WHERE user_id = $1 AND next_review_at <= NOW() ORDER BY next_review_at ASC LIMIT $2`,
    [userId, limit]
  );
  return result.rows.map((r: any) => r.card_id);
}

async function getFlaggedCardIds(userId: string, limit: number): Promise<string[]> {
  const result = await pool.query(
    `SELECT card_id FROM user_card_stats WHERE user_id = $1 AND flagged = true LIMIT $2`,
    [userId, limit]
  );
  return result.rows.map((r: any) => r.card_id);
}

async function getRecentIncorrectCardIds(userId: string, limit: number): Promise<string[]> {
  const result = await pool.query(
    `SELECT DISTINCT card_id FROM user_card_responses WHERE user_id = $1 AND is_correct = false AND reviewed_at > NOW() - INTERVAL '7 days' ORDER BY card_id LIMIT $2`,
    [userId, limit]
  );
  return result.rows.map((r: any) => r.card_id);
}

type StudyMode = "learn" | "test" | "rapid" | "weak" | "cram" | "spaced";

export async function getNextCards(
  userId: string,
  tier: string,
  mode: StudyMode | SessionType,
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
  const config = await getAdaptiveConfig();
  const sessionType = mapModeToSessionType(mode);

  if (sessionType === "flagged") {
    return await getFlaggedCards(userId, tier, limit, filters);
  }
  if (sessionType === "dueForReview") {
    return await getDueCards(userId, tier, limit, filters);
  }

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

  const recentCardIds = await getRecentCardIds(userId, 20);
  const weakTopicNames = await getWeakTopicNames(userId);
  const weakTopicSet = new Set(weakTopicNames);

  const statsJoin = `LEFT JOIN user_card_stats ucs ON ucs.card_id = fb.id AND ucs.user_id = $${paramIdx++}`;
  params.push(userId);

  if (filters?.flaggedOnly) {
    conditions.push(`ucs.flagged = true`);
  }

  if (filters?.missedOnly) {
    conditions.push(`EXISTS (SELECT 1 FROM user_card_responses ucr WHERE ucr.card_id = fb.id AND ucr.user_id = $${paramIdx++} AND ucr.is_correct = false)`);
    params.push(userId);
  }

  let recentExclusionClause = "";
  if (recentCardIds.length > 0 && sessionType !== "weakAreas") {
    recentExclusionClause = `AND fb.id != ALL($${paramIdx++})`;
    params.push(recentCardIds);
  }

  const finalWhere = conditions.join(" AND ");
  const fetchLimit = limit * 3;

  const query = `
    SELECT fb.id, fb.front, fb.back, fb.category, fb.tier, fb.difficulty,
           fb.question_type, fb.options, fb.correct_answer, fb.rationale_correct,
           fb.distractor_rationales, fb.clinical_takeaway, fb.exam_pearl,
           fb.rationale_media, fb.lesson_links, fb.body_system, fb.topic, fb.subtopic,
           fb.region_scope, fb.blueprint_category,
           COALESCE(ucs.times_incorrect, 0) as _incorrect_count,
           COALESCE(ucs.flagged, false) as _flagged,
           COALESCE(ucs.mastered, false) as _mastered,
           COALESCE(ucs.streak_correct, 0) as _streak_correct,
           ucs.last_seen_at as _last_seen_at,
           ucs.average_response_time as _avg_response,
           COALESCE(ucs.mastery_state, 'new') as _mastery_state,
           CASE WHEN ucs.confidence_rating = 'confident' THEN 1.0
                WHEN ucs.confidence_rating = 'unsure' THEN 0.6
                ELSE 0.3 END as _avg_confidence
    FROM flashcard_bank fb
    ${statsJoin}
    WHERE ${finalWhere} ${recentExclusionClause}
    ORDER BY RANDOM()
    LIMIT $${paramIdx++}
  `;
  params.push(fetchLimit);

  const result = await pool.query(query, params);
  let cards = result.rows;

  cards.forEach((card: any) => {
    card._priority = calculatePriorityScore(card, config.weights, weakTopicSet);
  });

  cards.sort((a: any, b: any) => b._priority - a._priority);

  if (sessionType !== "recommended") {
    cards = applySessionBands(cards, sessionType, weakTopicSet, limit);
  }

  const shuffledInTiers = shuffleWithinPriorityTiers(cards);
  const finalCards = shuffledInTiers.slice(0, limit).map((card: any) => {
    const { _incorrect_count, _flagged, _mastered, _streak_correct, _last_seen_at, _avg_response, _mastery_state, _avg_confidence, _priority, ...cleanCard } = card;
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

    camelCard.masteryState = _mastery_state;
    camelCard.flagged = _flagged;

    return camelCard;
  });

  return finalCards;
}

function mapModeToSessionType(mode: string): SessionType {
  const mapping: Record<string, SessionType> = {
    learn: "recommended",
    test: "mixedAdaptive",
    rapid: "rapidReview",
    weak: "weakAreas",
    cram: "preExamBoost",
    spaced: "dueForReview",
    recommended: "recommended",
    weakAreas: "weakAreas",
    dueForReview: "dueForReview",
    flagged: "flagged",
    rapidReview: "rapidReview",
    mixedAdaptive: "mixedAdaptive",
    preExamBoost: "preExamBoost",
    "rapid-review": "rapidReview",
    "weak-areas": "weakAreas",
    "before-exam-cram": "preExamBoost",
    "spaced-repetition": "dueForReview",
  };
  return mapping[mode] || "recommended";
}

function applySessionBands(cards: any[], sessionType: SessionType, weakTopics: Set<string>, limit: number): any[] {
  const bands = SESSION_BAND_CONFIG[sessionType] || SESSION_BAND_CONFIG.recommended;
  const total = bands.weak + bands.due + bands.recentIncorrect + bands.mixed + bands.reinforcement;
  const scale = limit / (total || 20);

  const weakCards = cards.filter(c => weakTopics.has(c.topic || c.category || "")).slice(0, Math.ceil(bands.weak * scale));
  const dueCards = cards.filter(c => c._last_seen_at && new Date(c._last_seen_at) < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)).slice(0, Math.ceil(bands.due * scale));
  const incorrectCards = cards.filter(c => c._incorrect_count > 0).slice(0, Math.ceil(bands.recentIncorrect * scale));
  const reinforcement = cards.filter(c => c._mastered || c._streak_correct >= 3).slice(0, Math.ceil(bands.reinforcement * scale));

  const usedIds = new Set([...weakCards, ...dueCards, ...incorrectCards, ...reinforcement].map(c => c.id));
  const mixedCards = cards.filter(c => !usedIds.has(c.id)).slice(0, Math.ceil(bands.mixed * scale));

  return [...weakCards, ...dueCards, ...incorrectCards, ...mixedCards, ...reinforcement];
}

function shuffleWithinPriorityTiers(cards: any[]): any[] {
  if (cards.length === 0) return cards;
  const tiers: any[][] = [];
  let currentTier: any[] = [cards[0]];

  for (let i = 1; i < cards.length; i++) {
    if (Math.abs((cards[i]._priority || 0) - (cards[i-1]._priority || 0)) <= 2) {
      currentTier.push(cards[i]);
    } else {
      tiers.push(currentTier);
      currentTier = [cards[i]];
    }
  }
  tiers.push(currentTier);

  const result: any[] = [];
  for (const tier of tiers) {
    result.push(...fisherYatesShuffle(tier));
  }
  return result;
}

async function getFlaggedCards(userId: string, tier: string, limit: number, filters?: any): Promise<any[]> {
  const flaggedIds = await getFlaggedCardIds(userId, limit * 2);
  if (flaggedIds.length === 0) return [];

  const allowedTiers = ["free"];
  if (tier === "rpn" || tier === "rn" || tier === "np" || tier === "admin") allowedTiers.push(tier);
  if (tier === "admin") allowedTiers.push("rpn", "rn", "np");

  const result = await pool.query(
    `SELECT fb.id, fb.front, fb.back, fb.category, fb.tier, fb.difficulty,
            fb.question_type, fb.options, fb.correct_answer, fb.rationale_correct,
            fb.distractor_rationales, fb.clinical_takeaway, fb.exam_pearl,
            fb.rationale_media, fb.lesson_links, fb.body_system, fb.topic, fb.subtopic,
            fb.region_scope, fb.blueprint_category
     FROM flashcard_bank fb
     WHERE fb.id = ANY($1) AND fb.tier = ANY($2) AND fb.status = 'published'
     ORDER BY RANDOM() LIMIT $3`,
    [flaggedIds, allowedTiers, limit]
  );

  return result.rows.map((card: any) => {
    const camelCard = snakeToCamel(card);
    camelCard.flagged = true;
    return camelCard;
  });
}

async function getDueCards(userId: string, tier: string, limit: number, filters?: any): Promise<any[]> {
  const dueIds = await getDueCardIds(userId, limit * 2);
  if (dueIds.length === 0) return [];

  const allowedTiers = ["free"];
  if (tier === "rpn" || tier === "rn" || tier === "np" || tier === "admin") allowedTiers.push(tier);
  if (tier === "admin") allowedTiers.push("rpn", "rn", "np");

  const result = await pool.query(
    `SELECT fb.id, fb.front, fb.back, fb.category, fb.tier, fb.difficulty,
            fb.question_type, fb.options, fb.correct_answer, fb.rationale_correct,
            fb.distractor_rationales, fb.clinical_takeaway, fb.exam_pearl,
            fb.rationale_media, fb.lesson_links, fb.body_system, fb.topic, fb.subtopic,
            fb.region_scope, fb.blueprint_category
     FROM flashcard_bank fb
     WHERE fb.id = ANY($1) AND fb.tier = ANY($2) AND fb.status = 'published'
     ORDER BY RANDOM() LIMIT $3`,
    [dueIds, allowedTiers, limit]
  );

  return result.rows.map((card: any) => snakeToCamel(card));
}

export async function getSessionTypes(): Promise<{ id: SessionType; name: string; description: string; icon: string }[]> {
  return [
    { id: "recommended", name: "Recommended", description: "Mix of weak topics, due cards, and high-yield content", icon: "sparkles" },
    { id: "weakAreas", name: "Weak Areas Only", description: "Focus exclusively on your weakest topics", icon: "target" },
    { id: "dueForReview", name: "Due for Review", description: "Cards scheduled for spaced repetition review", icon: "clock" },
    { id: "flagged", name: "Flagged Cards", description: "Review cards you've flagged for later", icon: "flag" },
    { id: "rapidReview", name: "Rapid Review", description: "Quick-fire review across all topics", icon: "zap" },
    { id: "mixedAdaptive", name: "Mixed Adaptive", description: "Balanced mix adjusted to your performance", icon: "brain" },
    { id: "preExamBoost", name: "Pre-Exam Boost", description: "High-yield focus for exam preparation", icon: "trophy" },
  ];
}

export async function createStudySession(userId: string, sessionType: string, tier?: string): Promise<string> {
  const result = await pool.query(
    `INSERT INTO study_session_stats (id, user_id, session_type, tier) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING id`,
    [userId, sessionType, tier || null]
  );
  return result.rows[0].id;
}

export async function completeStudySession(sessionId: string, data: { accuracy: number; topics: string[]; duration: number; cardsReviewed: number; weakCards: number; masteryChanges: any[] }): Promise<void> {
  await pool.query(
    `UPDATE study_session_stats SET
       session_accuracy = $1, session_topics = $2, session_duration = $3,
       cards_reviewed = $4, weak_cards_encountered = $5, mastery_changes = $6,
       completed_at = NOW()
     WHERE id = $7`,
    [data.accuracy, JSON.stringify(data.topics), data.duration, data.cardsReviewed, data.weakCards, JSON.stringify(data.masteryChanges), sessionId]
  );
}

export async function getDashboard(userId: string): Promise<DashboardData> {
  const [totalStats, recentStats, confidenceTrend, dueCount, topicMastery, flaggedCount, masteredCount, masteryDist, remediationData] = await Promise.all([
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
      `SELECT COUNT(*) as due FROM user_card_stats WHERE user_id = $1 AND next_review_at <= NOW()`, [userId]
    ),
    pool.query(
      `SELECT topic, subtopic, blueprint_category, total_attempts, correct_count, avg_confidence, mastery_level, last_reviewed_at, next_due_at
       FROM user_mastery_profiles WHERE user_id = $1 ORDER BY mastery_level ASC`, [userId]
    ),
    pool.query(`SELECT COUNT(*) as cnt FROM user_card_stats WHERE user_id = $1 AND flagged = true`, [userId]),
    pool.query(`SELECT COUNT(*) as cnt FROM user_card_stats WHERE user_id = $1 AND mastered = true`, [userId]),
    pool.query(
      `SELECT mastery_state, COUNT(*) as cnt FROM user_card_stats WHERE user_id = $1 GROUP BY mastery_state`, [userId]
    ),
    pool.query(
      `SELECT fb.topic, COUNT(*) as miss_count, 
              COALESCE(jsonb_agg(DISTINCT fb.lesson_links) FILTER (WHERE fb.lesson_links IS NOT NULL AND fb.lesson_links != '[]'::jsonb), '[]'::jsonb) as lesson_links
       FROM user_card_responses ucr
       JOIN flashcard_bank fb ON fb.id = ucr.card_id
       WHERE ucr.user_id = $1 AND ucr.is_correct = false AND ucr.reviewed_at > NOW() - INTERVAL '30 days'
       GROUP BY fb.topic
       HAVING COUNT(*) >= 3
       ORDER BY COUNT(*) DESC LIMIT 10`, [userId]
    ),
  ]);

  const total = parseInt(totalStats.rows[0]?.total || "0");
  const correct = parseInt(totalStats.rows[0]?.correct || "0");
  const recentTotal = parseInt(recentStats.rows[0]?.total || "0");
  const recentCorrect = parseInt(recentStats.rows[0]?.correct || "0");

  const streakResult = await pool.query(
    `SELECT DISTINCT DATE(reviewed_at) as d FROM user_card_responses WHERE user_id = $1 ORDER BY d DESC LIMIT 30`, [userId]
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

  const bestTopic = mastery.length > 0 ? mastery[mastery.length - 1].topic : null;
  const weakestTopic = mastery.length > 0 ? mastery[0].topic : null;

  const dueCountVal = parseInt(dueCount.rows[0]?.due || "0");
  const weakCount = mastery.filter(m => m.masteryLevel < 0.5).length;
  let recommendedSessionType = "recommended";
  if (dueCountVal > 10) recommendedSessionType = "dueForReview";
  else if (weakCount > 5) recommendedSessionType = "weakAreas";

  return {
    totalCardsStudied: total,
    totalCorrect: correct,
    overallAccuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
    masteryByTopic: mastery,
    weakAreas: mastery.filter(m => m.masteryLevel < 0.5).slice(0, 10),
    cardsDueForReview: dueCountVal,
    recentAccuracy: recentTotal > 0 ? Math.round((recentCorrect / recentTotal) * 100) : 0,
    confidenceTrend: confidenceTrend.rows.map((r: any) => ({
      date: r.date,
      avgConfidence: parseFloat(r.avg_confidence),
    })),
    studyTimeTotal: parseInt(totalStats.rows[0]?.total_time || "0"),
    flaggedCount: parseInt(flaggedCount.rows[0]?.cnt || "0"),
    masteredCount: parseInt(masteredCount.rows[0]?.cnt || "0"),
    streakDays,
    bestTopic,
    weakestTopic,
    recommendedSessionType,
    lessonRemediation: remediationData.rows.map((r: any) => ({
      topic: r.topic,
      missCount: parseInt(r.miss_count),
      lessonLinks: r.lesson_links || [],
    })),
    masteryDistribution: masteryDist.rows.map((r: any) => ({
      state: r.mastery_state,
      count: parseInt(r.cnt),
    })),
  };
}

export async function getAdminAnalytics(): Promise<any> {
  const [mostMissed, mostFlagged, difficultByTier, weakPatterns] = await Promise.all([
    pool.query(
      `SELECT fb.id, fb.front, fb.topic, fb.tier, COUNT(*) as miss_count
       FROM user_card_responses ucr
       JOIN flashcard_bank fb ON fb.id = ucr.card_id
       WHERE ucr.is_correct = false
       GROUP BY fb.id, fb.front, fb.topic, fb.tier
       ORDER BY miss_count DESC LIMIT 20`
    ),
    pool.query(
      `SELECT fb.id, fb.front, fb.topic, fb.tier, COUNT(*) as flag_count
       FROM user_card_stats ucs
       JOIN flashcard_bank fb ON fb.id = ucs.card_id
       WHERE ucs.flagged = true
       GROUP BY fb.id, fb.front, fb.topic, fb.tier
       ORDER BY flag_count DESC LIMIT 20`
    ),
    pool.query(
      `SELECT fb.tier, fb.subtopic, 
              COUNT(*) as attempt_count,
              ROUND(100.0 * SUM(CASE WHEN ucr.is_correct THEN 1 ELSE 0 END) / COUNT(*), 1) as accuracy
       FROM user_card_responses ucr
       JOIN flashcard_bank fb ON fb.id = ucr.card_id
       WHERE fb.subtopic IS NOT NULL
       GROUP BY fb.tier, fb.subtopic
       HAVING COUNT(*) >= 5
       ORDER BY accuracy ASC LIMIT 20`
    ),
    pool.query(
      `SELECT ump.topic, ump.tier, COUNT(DISTINCT ump.user_id) as user_count,
              ROUND(AVG(ump.mastery_level)::numeric, 3) as avg_mastery
       FROM user_mastery_profiles ump
       WHERE ump.mastery_level < 0.5 AND ump.total_attempts >= 3
       GROUP BY ump.topic, ump.tier
       ORDER BY user_count DESC, avg_mastery ASC LIMIT 20`
    ),
  ]);

  return {
    mostMissedCards: mostMissed.rows.map(snakeToCamel),
    mostFlaggedCards: mostFlagged.rows.map(snakeToCamel),
    difficultSubtopicsByTier: difficultByTier.rows.map(snakeToCamel),
    weakAreaPatterns: weakPatterns.rows.map(snakeToCamel),
  };
}

export async function getAdaptiveConfigData(): Promise<any> {
  const result = await pool.query(`SELECT * FROM adaptive_config WHERE config_key = 'default' LIMIT 1`);
  if (result.rows.length === 0) return null;
  return snakeToCamel(result.rows[0]);
}

export async function updateAdaptiveConfig(updates: Record<string, any>): Promise<any> {
  const allowedKeys = [
    'weak_topic_weight', 'incorrect_history_weight', 'low_confidence_weight',
    'flagged_weight', 'not_seen_weight', 'mastered_penalty', 'correct_streak_penalty',
    'interval_incorrect', 'interval_unsure', 'interval_confident', 'interval_mastered',
    'weak_topic_threshold', 'weak_subtopic_threshold',
    'mastery_threshold_improving', 'mastery_threshold_nearly_mastered', 'mastery_threshold_mastered',
    'high_yield_tags', 'blueprint_weighting',
  ];

  const setClauses: string[] = [];
  const params: any[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(updates)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    if (allowedKeys.includes(snakeKey)) {
      setClauses.push(`${snakeKey} = $${idx++}`);
      params.push(typeof value === 'object' ? JSON.stringify(value) : value);
    }
  }

  if (setClauses.length === 0) return await getAdaptiveConfigData();

  setClauses.push(`updated_at = NOW()`);
  params.push('default');

  await pool.query(
    `UPDATE adaptive_config SET ${setClauses.join(', ')} WHERE config_key = $${idx}`,
    params
  );

  return await getAdaptiveConfigData();
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
