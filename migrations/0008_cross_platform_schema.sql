-- Cross-platform schema & storage layer migration
-- Adds tables for test bank collections, test bank progress, question history,
-- CAT sessions, user activity log, dashboard resume state, lesson bookmarks,
-- and mock exam session progress.

-- Extend user_progress table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_progress' AND column_name='completion_percent') THEN
    ALTER TABLE user_progress ADD COLUMN completion_percent integer DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='user_progress' AND column_name='bookmarked') THEN
    ALTER TABLE user_progress ADD COLUMN bookmarked boolean DEFAULT false;
  END IF;
END $$;
--> statement-breakpoint

-- Create enum types
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_history_source_type') THEN
    CREATE TYPE question_history_source_type AS ENUM ('test_bank', 'cat', 'mock');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cat_session_status') THEN
    CREATE TYPE cat_session_status AS ENUM ('in_progress', 'paused', 'completed', 'abandoned');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_event_type') THEN
    CREATE TYPE activity_event_type AS ENUM (
      'lesson_started', 'lesson_completed', 'quiz_started', 'quiz_completed',
      'cat_started', 'cat_completed', 'cat_paused', 'cat_resumed',
      'mock_started', 'mock_completed', 'test_bank_started', 'test_bank_completed',
      'flashcard_reviewed', 'bookmark_added', 'bookmark_removed', 'question_answered',
      'note_created', 'study_streak_updated', 'login', 'session_started'
    );
  END IF;
END $$;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS test_bank_collections (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  role text,
  country text,
  exam text,
  question_count integer DEFAULT 0,
  tier text DEFAULT 'free',
  access_level text DEFAULT 'free',
  category_mappings jsonb DEFAULT '[]'::jsonb,
  tags text[] DEFAULT '{}'::text[],
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS test_bank_progress (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  collection_id varchar NOT NULL REFERENCES test_bank_collections(id),
  questions_attempted integer DEFAULT 0,
  correct_count integer DEFAULT 0,
  incorrect_count integer DEFAULT 0,
  last_question_id varchar,
  last_studied_at timestamp,
  completed_percent integer DEFAULT 0,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS test_bank_progress_user_collection_idx ON test_bank_progress (user_id, collection_id);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS question_history (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  question_id varchar NOT NULL,
  selected_answer text,
  was_correct boolean,
  rationale_viewed boolean DEFAULT false,
  answered_at timestamp DEFAULT now() NOT NULL,
  session_id varchar,
  source_type question_history_source_type NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS question_history_user_idx ON question_history (user_id);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS question_history_session_idx ON question_history (session_id);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS cat_sessions (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  status cat_session_status DEFAULT 'in_progress' NOT NULL,
  start_time timestamp DEFAULT now() NOT NULL,
  last_active_at timestamp DEFAULT now() NOT NULL,
  completed_at timestamp,
  adaptive_state jsonb DEFAULT '{}'::jsonb,
  question_sequence jsonb DEFAULT '[]'::jsonb,
  result_summary jsonb DEFAULT '{}'::jsonb,
  total_questions integer DEFAULT 0,
  correct_count integer DEFAULT 0,
  time_spent_seconds integer DEFAULT 0,
  exam_type text,
  tier text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS cat_sessions_user_idx ON cat_sessions (user_id);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS cat_sessions_status_idx ON cat_sessions (status);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS user_activity_log (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  event_type activity_event_type NOT NULL,
  entity_id varchar,
  entity_type text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS user_activity_log_user_idx ON user_activity_log (user_id);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS user_activity_log_event_type_idx ON user_activity_log (event_type);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS user_activity_log_created_idx ON user_activity_log (created_at);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS dashboard_resume_state (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL UNIQUE REFERENCES users(id),
  last_cat_session_id varchar,
  last_mock_session_id varchar,
  last_test_bank_id varchar,
  last_lesson_id text,
  recommended_next_action text,
  last_updated_at timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS lesson_bookmarks (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  lesson_id text NOT NULL,
  note text,
  created_at timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS lesson_bookmarks_user_lesson_idx ON lesson_bookmarks (user_id, lesson_id);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS lesson_bookmarks_user_idx ON lesson_bookmarks (user_id);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS mock_exam_session_progress (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  attempt_id varchar NOT NULL REFERENCES mock_exam_attempts(id),
  current_question_index integer DEFAULT 0,
  answered_count integer DEFAULT 0,
  correct_count integer DEFAULT 0,
  incorrect_count integer DEFAULT 0,
  flagged_questions jsonb DEFAULT '[]'::jsonb,
  time_remaining integer,
  status text DEFAULT 'in_progress',
  last_active_at timestamp DEFAULT now() NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS mock_exam_session_progress_user_attempt_idx ON mock_exam_session_progress (user_id, attempt_id);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS mock_exam_session_progress_user_idx ON mock_exam_session_progress (user_id);
