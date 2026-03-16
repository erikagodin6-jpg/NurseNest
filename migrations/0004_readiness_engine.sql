CREATE TABLE IF NOT EXISTS readiness_history (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  readiness_score INTEGER DEFAULT 0 NOT NULL,
  pass_probability INTEGER DEFAULT 0 NOT NULL,
  readiness_tier TEXT DEFAULT 'early_preparation' NOT NULL,
  exam_type TEXT DEFAULT 'RN' NOT NULL,
  factors JSONB DEFAULT '{}'::jsonb,
  snapshot_week TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, snapshot_week)
);

CREATE TABLE IF NOT EXISTS benchmark_profiles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type TEXT NOT NULL UNIQUE,
  total_users INTEGER DEFAULT 0 NOT NULL,
  avg_readiness_score DOUBLE PRECISION DEFAULT 0 NOT NULL,
  avg_pass_probability DOUBLE PRECISION DEFAULT 0 NOT NULL,
  avg_accuracy DOUBLE PRECISION DEFAULT 0 NOT NULL,
  avg_questions_answered DOUBLE PRECISION DEFAULT 0 NOT NULL,
  avg_topic_coverage DOUBLE PRECISION DEFAULT 0 NOT NULL,
  passing_threshold INTEGER DEFAULT 65 NOT NULL,
  score_distribution JSONB DEFAULT '{}'::jsonb,
  percentile_breakpoints JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS practice_recommendations (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL UNIQUE,
  recommendations JSONB DEFAULT '[]'::jsonb NOT NULL,
  generated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_readiness_history_user ON readiness_history(user_id);
CREATE INDEX IF NOT EXISTS idx_readiness_history_week ON readiness_history(snapshot_week);
CREATE INDEX IF NOT EXISTS idx_practice_recommendations_user ON practice_recommendations(user_id);
