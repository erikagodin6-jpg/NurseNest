CREATE TABLE IF NOT EXISTS user_card_responses (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  card_id VARCHAR NOT NULL,
  is_correct BOOLEAN NOT NULL,
  confidence TEXT NOT NULL DEFAULT 'unsure',
  selected_option INTEGER,
  time_spent INTEGER,
  study_mode TEXT DEFAULT 'learn',
  session_id VARCHAR,
  reviewed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_mastery_profiles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  tier TEXT NOT NULL,
  topic TEXT,
  subtopic TEXT,
  blueprint_category TEXT,
  question_type TEXT,
  total_attempts INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  avg_confidence DOUBLE PRECISION DEFAULT 0,
  mastery_level DOUBLE PRECISION DEFAULT 0,
  last_reviewed_at TIMESTAMP,
  next_due_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, topic, tier)
);

CREATE TABLE IF NOT EXISTS user_card_stats (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  card_id VARCHAR NOT NULL,
  times_seen INTEGER NOT NULL DEFAULT 0,
  times_correct INTEGER NOT NULL DEFAULT 0,
  times_incorrect INTEGER NOT NULL DEFAULT 0,
  last_seen_at TIMESTAMP,
  last_answered_at TIMESTAMP,
  average_response_time DOUBLE PRECISION DEFAULT 0,
  confidence_rating TEXT DEFAULT 'unsure',
  flagged BOOLEAN NOT NULL DEFAULT false,
  mastered BOOLEAN NOT NULL DEFAULT false,
  streak_correct INTEGER NOT NULL DEFAULT 0,
  streak_incorrect INTEGER NOT NULL DEFAULT 0,
  mastery_state TEXT NOT NULL DEFAULT 'new',
  next_review_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, card_id)
);

CREATE TABLE IF NOT EXISTS study_session_stats (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  session_type TEXT NOT NULL DEFAULT 'recommended',
  session_accuracy DOUBLE PRECISION DEFAULT 0,
  session_topics JSONB DEFAULT '[]'::jsonb,
  session_duration INTEGER DEFAULT 0,
  cards_reviewed INTEGER DEFAULT 0,
  weak_cards_encountered INTEGER DEFAULT 0,
  mastery_changes JSONB DEFAULT '[]'::jsonb,
  tier TEXT,
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS adaptive_config (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key TEXT NOT NULL UNIQUE,
  weak_topic_weight INTEGER DEFAULT 4,
  incorrect_history_weight INTEGER DEFAULT 5,
  low_confidence_weight INTEGER DEFAULT 4,
  flagged_weight INTEGER DEFAULT 3,
  not_seen_weight INTEGER DEFAULT 2,
  mastered_penalty INTEGER DEFAULT -5,
  correct_streak_penalty INTEGER DEFAULT -4,
  interval_incorrect DOUBLE PRECISION DEFAULT 1,
  interval_unsure DOUBLE PRECISION DEFAULT 3,
  interval_confident DOUBLE PRECISION DEFAULT 10,
  interval_mastered DOUBLE PRECISION DEFAULT 30,
  weak_topic_threshold DOUBLE PRECISION DEFAULT 0.7,
  weak_subtopic_threshold DOUBLE PRECISION DEFAULT 0.65,
  mastery_threshold_improving DOUBLE PRECISION DEFAULT 0.5,
  mastery_threshold_nearly_mastered DOUBLE PRECISION DEFAULT 0.7,
  mastery_threshold_mastered DOUBLE PRECISION DEFAULT 0.85,
  high_yield_tags JSONB DEFAULT '[]'::jsonb,
  blueprint_weighting JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_card_responses_user ON user_card_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_card_responses_card ON user_card_responses(card_id);
CREATE INDEX IF NOT EXISTS idx_user_card_stats_user ON user_card_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_card_stats_card ON user_card_stats(card_id);
CREATE INDEX IF NOT EXISTS idx_user_card_stats_user_card ON user_card_stats(user_id, card_id);
CREATE INDEX IF NOT EXISTS idx_user_card_stats_flagged ON user_card_stats(user_id, flagged) WHERE flagged = true;
CREATE INDEX IF NOT EXISTS idx_user_card_stats_mastery ON user_card_stats(user_id, mastery_state);
CREATE INDEX IF NOT EXISTS idx_user_card_stats_review ON user_card_stats(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_study_session_stats_user ON study_session_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_mastery_profiles_user ON user_mastery_profiles(user_id);

INSERT INTO adaptive_config (config_key) VALUES ('default') ON CONFLICT (config_key) DO NOTHING;
