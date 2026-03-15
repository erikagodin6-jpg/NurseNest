ALTER TABLE mock_exam_attempts
  ADD COLUMN IF NOT EXISTS exam_type text DEFAULT 'practice',
  ADD COLUMN IF NOT EXISTS cat_state jsonb,
  ADD COLUMN IF NOT EXISTS blueprint_coverage_state jsonb,
  ADD COLUMN IF NOT EXISTS review_unlocked boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS timer_state jsonb,
  ADD COLUMN IF NOT EXISTS stopping_rule_status text,
  ADD COLUMN IF NOT EXISTS blueprint_code text,
  ADD COLUMN IF NOT EXISTS blueprint_meta jsonb;

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS preferred_theme text;

ALTER TABLE watermark_sessions
  ADD COLUMN IF NOT EXISTS masked_email text,
  ADD COLUMN IF NOT EXISTS user_id_suffix text,
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS user_agent text,
  ADD COLUMN IF NOT EXISTS expires_at timestamp;
