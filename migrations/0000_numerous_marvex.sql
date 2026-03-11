CREATE TABLE "ab_tests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"variants_json" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"allocation" double precision DEFAULT 0.5,
	"enabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_cache" (
	"cache_key" text PRIMARY KEY NOT NULL,
	"output_json" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_usage_budget" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"month_year" text NOT NULL,
	"tokens_used" integer DEFAULT 0,
	"token_budget" integer DEFAULT 500000,
	"request_count" integer DEFAULT 0,
	"last_request_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_automation_runs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"automation_id" varchar NOT NULL,
	"automation_slug" text NOT NULL,
	"status" text DEFAULT 'running',
	"items_generated" integer DEFAULT 0,
	"items_accepted" integer DEFAULT 0,
	"items_rejected" integer DEFAULT 0,
	"details" jsonb,
	"error_message" text,
	"token_cost" integer DEFAULT 0,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "allied_automations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"enabled" boolean DEFAULT false,
	"frequency" text DEFAULT 'daily',
	"max_items_per_run" integer DEFAULT 25,
	"max_runs_per_day" integer DEFAULT 1,
	"career_scope" jsonb DEFAULT '["rrt","paramedic","pharmacyTech","mlt","imaging"]'::jsonb,
	"auto_publish" boolean DEFAULT false,
	"rationale_min_words" integer DEFAULT 600,
	"strictness_level" text DEFAULT 'standard',
	"prompt_template" text,
	"config" jsonb,
	"last_run_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "allied_automations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "allied_batch_runs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"career_type" text NOT NULL,
	"blueprint_id" varchar,
	"requested_count" integer NOT NULL,
	"generated_count" integer DEFAULT 0,
	"accepted_count" integer DEFAULT 0,
	"rejected_count" integer DEFAULT 0,
	"rejection_reasons" jsonb,
	"difficulty_breakdown" jsonb,
	"cognitive_breakdown" jsonb,
	"domain_breakdown" jsonb,
	"avg_rationale_words" double precision,
	"status" text DEFAULT 'running',
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "allied_blueprints" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"career_type" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"domains" jsonb NOT NULL,
	"difficulty_distribution" jsonb NOT NULL,
	"cognitive_distribution" jsonb NOT NULL,
	"allowed_question_types" jsonb NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_draft_assets" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'draft',
	"career_type" text,
	"domain" text,
	"subtopic" text,
	"title" text,
	"payload" jsonb NOT NULL,
	"validation_report" jsonb,
	"automation_run_id" varchar,
	"created_by" text DEFAULT 'automation',
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_flashcards" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"career_type" text NOT NULL,
	"question_id" varchar,
	"card_type" text NOT NULL,
	"front" text NOT NULL,
	"back" text NOT NULL,
	"rationale" text,
	"blueprint_category" text,
	"subtopic" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_leads" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"career_type" text,
	"source" text DEFAULT 'homepage',
	"consent" boolean DEFAULT false,
	"diagnostic_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_lessons" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" varchar NOT NULL,
	"career_type" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"order_index" integer DEFAULT 0,
	"clinical_reasoning" text,
	"decision_tree" text,
	"common_mistakes" jsonb,
	"exam_trap_warning" text,
	"checkpoint_questions" jsonb,
	"status" text DEFAULT 'draft',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_modules" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"career_type" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"domain" text NOT NULL,
	"domain_weight" double precision DEFAULT 0,
	"order_index" integer DEFAULT 0,
	"learning_objectives" jsonb,
	"most_tested_concepts" jsonb,
	"red_flags" jsonb,
	"exam_traps" jsonb,
	"status" text DEFAULT 'draft',
	"is_free" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_questions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"career_type" text NOT NULL,
	"blueprint_id" varchar,
	"batch_id" varchar,
	"stem" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_answer" integer NOT NULL,
	"rationale_long" text NOT NULL,
	"learning_objective" text NOT NULL,
	"blueprint_category" text NOT NULL,
	"subtopic" text NOT NULL,
	"difficulty" integer NOT NULL,
	"cognitive_level" text NOT NULL,
	"question_type" text NOT NULL,
	"exam_trap" text,
	"clinical_pearls" jsonb,
	"safety_note" text,
	"distractor_rationales" jsonb,
	"is_free" boolean DEFAULT false,
	"status" text DEFAULT 'pending',
	"discrimination_index" double precision,
	"total_attempts" integer DEFAULT 0,
	"correct_attempts" integer DEFAULT 0,
	"top_group_correct" double precision,
	"bottom_group_correct" double precision,
	"flagged" boolean DEFAULT false,
	"flag_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "allied_revision_queue" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" varchar NOT NULL,
	"career_type" text NOT NULL,
	"reason" text NOT NULL,
	"severity" text DEFAULT 'medium',
	"status" text DEFAULT 'pending',
	"review_notes" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audio_clips" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"subcategory" text,
	"condition_tag" text,
	"description_short" text,
	"body_site" text,
	"audio_url_original" text,
	"audio_url_stream" text,
	"duration_seconds" integer,
	"license_type" text NOT NULL,
	"attribution_text" text,
	"source_url" text,
	"creator_name" text,
	"proof_of_license_url" text,
	"is_derivative" boolean DEFAULT false,
	"is_published" boolean DEFAULT false,
	"created_by_admin_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" varchar,
	"actor_username" text,
	"entity_type" text NOT NULL,
	"entity_id" varchar,
	"action" text NOT NULL,
	"before_json" jsonb,
	"after_json" jsonb,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "autopilot_engines" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"engine_key" varchar NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"enabled" boolean DEFAULT false NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb,
	"last_run_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "autopilot_engines_engine_key_unique" UNIQUE("engine_key")
);
--> statement-breakpoint
CREATE TABLE "autopilot_jobs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"engine_key" varchar NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb,
	"result" jsonb DEFAULT '{}'::jsonb,
	"error" text,
	"started_at" timestamp,
	"completed_at" timestamp,
	"scheduled_for" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "autopilot_schedules" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"engine_key" varchar NOT NULL,
	"frequency" text DEFAULT 'daily' NOT NULL,
	"cron_expression" text,
	"enabled" boolean DEFAULT false NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb,
	"next_run_at" timestamp,
	"last_run_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_clusters" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"keyword" text NOT NULL,
	"exam_key" text,
	"pillar_title" text,
	"pillar_content" jsonb DEFAULT '{}'::jsonb,
	"pillar_slug" text,
	"pillar_status" text DEFAULT 'draft',
	"supporting_articles" jsonb DEFAULT '[]'::jsonb,
	"schema_markup" jsonb DEFAULT '{}'::jsonb,
	"internal_links" jsonb DEFAULT '[]'::jsonb,
	"publish_schedule" jsonb DEFAULT '{}'::jsonb,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_config" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"citation_style" text DEFAULT 'apa7',
	"posts_per_day" integer DEFAULT 2,
	"day_count" integer DEFAULT 0,
	"total_posts_generated" integer DEFAULT 0,
	"is_active" boolean DEFAULT false,
	"last_post_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "confidence_ratings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"question_id" varchar NOT NULL,
	"confidence" text NOT NULL,
	"was_correct" boolean DEFAULT false,
	"topic" text,
	"body_system" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_intelligence_reports" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_type" text NOT NULL,
	"report_data" jsonb NOT NULL,
	"summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_items" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"type" text DEFAULT 'lesson' NOT NULL,
	"category" text,
	"body_system" text,
	"tier" text DEFAULT 'free',
	"status" text DEFAULT 'draft',
	"tags" text[] DEFAULT '{}'::text[],
	"summary" text,
	"content" jsonb DEFAULT '[]'::jsonb,
	"seo_title" text,
	"seo_description" text,
	"seo_keywords" text[] DEFAULT '{}'::text[],
	"primary_keyword" text,
	"secondary_keywords" text[] DEFAULT '{}'::text[],
	"scheduled_at" timestamp,
	"clinical_safety_review" boolean DEFAULT false,
	"auto_publish" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"author_id" varchar,
	"author_name" text,
	"region_scope" text DEFAULT 'BOTH',
	"version_key" text,
	"updated_by_ai" boolean DEFAULT false,
	"protected_fields" text[] DEFAULT '{}'::text[],
	CONSTRAINT "content_items_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "content_revisions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_id" varchar NOT NULL,
	"revision_number" integer DEFAULT 1 NOT NULL,
	"title" text,
	"content" jsonb,
	"status" text,
	"edited_by" varchar,
	"edited_by_username" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_roi_scores" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proposed_title" text NOT NULL,
	"language_code" text DEFAULT 'en' NOT NULL,
	"exam_code" text,
	"content_type" text NOT NULL,
	"primary_keyword" text,
	"secondary_keywords" jsonb DEFAULT '[]'::jsonb,
	"blueprint_category" text,
	"seo_demand_score" integer DEFAULT 0,
	"blueprint_strategic_score" integer DEFAULT 0,
	"conversion_potential_score" integer DEFAULT 0,
	"authority_multiplier_score" integer DEFAULT 0,
	"monetization_fit_score" integer DEFAULT 0,
	"roi_score" double precision DEFAULT 0,
	"priority_tier" text DEFAULT 'deprioritize',
	"similarity_flag" boolean DEFAULT false,
	"similar_page_slug" text,
	"pipeline_status" text DEFAULT 'idea',
	"projected_monthly_traffic" integer,
	"projected_diagnostic_starts" integer,
	"projected_revenue" double precision,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_translations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" text NOT NULL,
	"content_id" text NOT NULL,
	"language_code" text NOT NULL,
	"field_name" text NOT NULL,
	"translated_text" text NOT NULL,
	"translation_status" text DEFAULT 'auto',
	"source_hash" text,
	"source_last_updated_reference" timestamp,
	"last_updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coupon_codes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"discount_type" text NOT NULL,
	"discount_value" integer NOT NULL,
	"expires_at" timestamp,
	"usage_limit" integer,
	"usage_count" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "coupon_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "custom_page_modules" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"icon" text DEFAULT 'BookOpen',
	"color" text DEFAULT 'text-primary',
	"bg_color" text DEFAULT 'bg-primary/10',
	"image_url" text,
	"sort_order" integer DEFAULT 0,
	"lessons" jsonb DEFAULT '[]'::jsonb,
	"tier" text,
	"status" text DEFAULT 'active',
	"content" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_study_goals" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"date" text NOT NULL,
	"lessons_target" integer DEFAULT 3,
	"lessons_completed" integer DEFAULT 0,
	"questions_target" integer DEFAULT 10,
	"questions_completed" integer DEFAULT 0,
	"minutes_target" integer DEFAULT 30,
	"minutes_completed" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dashboard_widgets" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"widget_type" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "deck_flashcards" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deck_id" varchar NOT NULL,
	"front" text NOT NULL,
	"back" text NOT NULL,
	"rationale" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"difficulty" text DEFAULT 'medium',
	"ai_check_status" text DEFAULT 'unknown',
	"ai_check_summary" text,
	"ai_check_confidence" integer,
	"user_override" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deck_reports" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_id" varchar NOT NULL,
	"target_type" text NOT NULL,
	"target_id" varchar NOT NULL,
	"reason" text NOT NULL,
	"notes" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "design_assets" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" varchar NOT NULL,
	"asset_type" text NOT NULL,
	"url" text NOT NULL,
	"width" integer,
	"height" integer,
	"tags" text[],
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "design_pages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" varchar NOT NULL,
	"page_number" integer NOT NULL,
	"canvas_json" jsonb,
	"background_color" text DEFAULT '#ffffff',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "design_projects" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"type" text NOT NULL,
	"page_size" text DEFAULT 'Letter',
	"orientation" text DEFAULT 'portrait',
	"created_by_admin_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "design_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "diagnostic_assessments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"exam_target" text DEFAULT 'rex-pn' NOT NULL,
	"total_questions" integer DEFAULT 30 NOT NULL,
	"score" integer NOT NULL,
	"domain_scores" jsonb DEFAULT '{}'::jsonb,
	"topic_scores" jsonb DEFAULT '{}'::jsonb,
	"answers" jsonb DEFAULT '[]'::jsonb,
	"weakness_summary" text,
	"strength_summary" text,
	"study_plan" jsonb,
	"recommended_qbanks" jsonb,
	"remediation_bank_id" varchar,
	"completed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diagnostic_attempts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"session_id" text,
	"score" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"answers" jsonb DEFAULT '[]'::jsonb,
	"topic_breakdown" jsonb DEFAULT '{}'::jsonb,
	"completed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "difficulty_adjustment_log" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"difficulty_level" integer NOT NULL,
	"old_scaling" double precision NOT NULL,
	"new_scaling" double precision NOT NULL,
	"actual_percent" double precision,
	"expected_range" text,
	"reason" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "digital_products" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"short_description" text,
	"price" integer NOT NULL,
	"compare_at_price" integer,
	"file_url" text,
	"cover_image_url" text,
	"preview_url" text,
	"preview_page_count" integer DEFAULT 3,
	"category" text NOT NULL,
	"tier_target" text DEFAULT 'all',
	"exam_target" text,
	"featured" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"question_count" integer DEFAULT 0,
	"seo_title" text,
	"seo_description" text,
	"seo_keywords" text,
	"theme_id" text,
	"career_type" text DEFAULT 'nursing',
	"sale_price" integer,
	"sale_starts_at" timestamp,
	"sale_ends_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "digital_products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "email_subscribers" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"tier" text DEFAULT 'general',
	"source" text DEFAULT 'qotd',
	"verified" boolean DEFAULT false,
	"frequency" text DEFAULT 'weekly',
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "email_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "exam_blueprints" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_code" text NOT NULL,
	"exam_name" text NOT NULL,
	"tier" text NOT NULL,
	"region" text DEFAULT 'ALL',
	"total_questions" integer NOT NULL,
	"passing_standard" text NOT NULL,
	"time_limit" integer NOT NULL,
	"domains" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"question_type_weights" jsonb DEFAULT '{}'::jsonb,
	"cat_enabled" boolean DEFAULT false,
	"cat_min_questions" integer,
	"cat_max_questions" integer,
	"active" boolean DEFAULT true,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "exam_blueprints_exam_code_unique" UNIQUE("exam_code")
);
--> statement-breakpoint
CREATE TABLE "exam_questions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" text NOT NULL,
	"exam" text NOT NULL,
	"question_type" text NOT NULL,
	"status" text DEFAULT 'draft',
	"publish_at" timestamp,
	"stem" text NOT NULL,
	"options" jsonb DEFAULT '[]'::jsonb,
	"correct_answer" jsonb DEFAULT '[]'::jsonb,
	"rationale" text,
	"difficulty" integer DEFAULT 3,
	"tags" text[] DEFAULT '{}'::text[],
	"body_system" text,
	"topic" text,
	"subtopic" text,
	"case_id" varchar,
	"exhibit_data" jsonb,
	"region_scope" text DEFAULT 'BOTH',
	"stem_hash" text,
	"career_type" text DEFAULT 'nursing',
	"scenario" text,
	"clinical_pearl" text,
	"exam_strategy" text,
	"memory_hook" text,
	"framework_used" text,
	"clinical_trap" text,
	"distractor_rationales" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "exported_files" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" varchar NOT NULL,
	"export_type" text NOT NULL,
	"url" text NOT NULL,
	"settings_json" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feature_usage" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"feature" text NOT NULL,
	"usage_date" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flashcard_bank" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" text NOT NULL,
	"topic_tag" text,
	"career_type" text DEFAULT 'nursing',
	"front" text NOT NULL,
	"back" text NOT NULL,
	"tags_json" jsonb DEFAULT '[]'::jsonb,
	"references_json" jsonb DEFAULT '[]'::jsonb,
	"status" text DEFAULT 'draft' NOT NULL,
	"content_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "flashcard_bank_content_hash_unique" UNIQUE("content_hash")
);
--> statement-breakpoint
CREATE TABLE "flashcard_decks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" varchar NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '',
	"tags" jsonb DEFAULT '[]'::jsonb,
	"tier" text DEFAULT 'free',
	"visibility" text DEFAULT 'private',
	"slug" text,
	"career_type" text DEFAULT 'nursing',
	"is_upgraded" boolean DEFAULT false,
	"upgraded_at" timestamp,
	"upgraded_limit" integer DEFAULT 300,
	"stripe_payment_intent_id" text,
	"card_count" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"save_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flashcard_reviews" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"card_id" varchar NOT NULL,
	"deck_id" varchar NOT NULL,
	"response" text NOT NULL,
	"interval" integer DEFAULT 1,
	"ease_factor" integer DEFAULT 250,
	"repetitions" integer DEFAULT 0,
	"next_review_date" text NOT NULL,
	"reviewed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "friend_connections" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_a_id" varchar NOT NULL,
	"user_b_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "friend_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"requester_id" varchar NOT NULL,
	"receiver_id" varchar NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generated_micro_lectures" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"topic" text NOT NULL,
	"tier" text NOT NULL,
	"focus" text,
	"duration_estimate" text,
	"script_json" jsonb,
	"slides_json" jsonb,
	"flashcards_json" jsonb,
	"keywords" text[],
	"is_published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "generated_micro_lectures_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "generated_questions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generation_id" varchar NOT NULL,
	"idx" integer NOT NULL,
	"type" text NOT NULL,
	"difficulty" text,
	"system" text,
	"category" text,
	"stem" text NOT NULL,
	"scenario" text,
	"choices" jsonb NOT NULL,
	"correct_answers" jsonb NOT NULL,
	"rationale" jsonb,
	"exam_pearl" text,
	"hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generation_events" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generation_id" varchar NOT NULL,
	"event_type" text NOT NULL,
	"payload" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generation_jobs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"run_date" text NOT NULL,
	"content_type" text NOT NULL,
	"tier" text NOT NULL,
	"target_count" integer NOT NULL,
	"generated_count" integer DEFAULT 0,
	"mode" text NOT NULL,
	"topic_plan_json" jsonb DEFAULT '[]'::jsonb,
	"status" text DEFAULT 'queued' NOT NULL,
	"cost_estimate_json" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "generator_v2_presentation_settings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generation_id" varchar NOT NULL,
	"theme_id" text,
	"cover_layout" text DEFAULT 'minimal',
	"cover_title" text DEFAULT '',
	"cover_subtitle" text DEFAULT '',
	"author_line" text,
	"edition_text" text,
	"show_logo" boolean DEFAULT true,
	"extras_json" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "generator_v2_presentation_settings_generation_id_unique" UNIQUE("generation_id")
);
--> statement-breakpoint
CREATE TABLE "infographic_templates" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_key" text NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"prompt_text" text NOT NULL,
	"country_mode" text DEFAULT 'BOTH' NOT NULL,
	"exam_tier" text DEFAULT 'ALL' NOT NULL,
	"site_context" text DEFAULT 'nursing' NOT NULL,
	"career_track" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "infographic_templates_template_key_unique" UNIQUE("template_key")
);
--> statement-breakpoint
CREATE TABLE "institution_audit_log" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_id" varchar NOT NULL,
	"actor_user_id" varchar NOT NULL,
	"action_type" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institution_invite_codes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_id" varchar NOT NULL,
	"code" text NOT NULL,
	"seat_limit" integer DEFAULT 50 NOT NULL,
	"expires_at" timestamp,
	"usage_count" integer DEFAULT 0,
	CONSTRAINT "institution_invite_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "institution_leads" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_name" text NOT NULL,
	"program_type" text NOT NULL,
	"estimated_student_count" integer,
	"country" text,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"message" text,
	"region" text DEFAULT 'US',
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institution_roster_allowlist" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_id" varchar NOT NULL,
	"email" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	"added_by_user_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institution_seat_requests" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"requested_at" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"reason" text,
	"decided_at" timestamp,
	"decided_by_user_id" varchar
);
--> statement-breakpoint
CREATE TABLE "institution_seats" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"institution_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"access_start" timestamp DEFAULT now() NOT NULL,
	"access_end" timestamp,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"region" text DEFAULT 'US' NOT NULL,
	"career_scope" text DEFAULT 'MULTI' NOT NULL,
	"license_model" text DEFAULT 'COHORT' NOT NULL,
	"seat_limit" integer DEFAULT 50 NOT NULL,
	"semester_end_date" timestamp,
	"default_duration_days" integer,
	"tier_level" text DEFAULT 'COHORT' NOT NULL,
	"add_ons" jsonb DEFAULT '[]'::jsonb,
	"enrollment_mode" text DEFAULT 'DOMAIN_LOCK' NOT NULL,
	"allowed_email_domains" text[],
	"require_email_verified" boolean DEFAULT true,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "language_priority" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language_code" text NOT NULL,
	"language_name" text NOT NULL,
	"nursing_population" integer DEFAULT 3,
	"immigration_patterns" integer DEFAULT 3,
	"search_demand" integer DEFAULT 3,
	"competition_strength" integer DEFAULT 3,
	"monetization_potential" integer DEFAULT 3,
	"production_difficulty" integer DEFAULT 3,
	"roi_score" double precision DEFAULT 0,
	"tier" text DEFAULT 'tier_3',
	"rollout_month" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "language_priority_language_code_unique" UNIQUE("language_code")
);
--> statement-breakpoint
CREATE TABLE "lesson_audio_links" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" text NOT NULL,
	"audio_clip_id" varchar NOT NULL,
	"display_order" integer DEFAULT 0,
	"quiz_prompt" text,
	"answer_key" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_images" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" text NOT NULL,
	"object_path" text NOT NULL,
	"file_name" text NOT NULL,
	"section" text DEFAULT 'general',
	"caption" text,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_overrides" (
	"lesson_id" text PRIMARY KEY NOT NULL,
	"overrides" jsonb DEFAULT '{}'::jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lifecycle_emails" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"email_type" text NOT NULL,
	"trigger_event" text NOT NULL,
	"sequence_name" text,
	"sequence_step" integer DEFAULT 1,
	"status" text DEFAULT 'pending' NOT NULL,
	"scheduled_for" timestamp,
	"sent_at" timestamp,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_attempts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"tier" text DEFAULT 'rpn' NOT NULL,
	"total_questions" integer NOT NULL,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"score" integer,
	"time_spent" integer,
	"questions" jsonb DEFAULT '[]'::jsonb,
	"answers" jsonb DEFAULT '{}'::jsonb,
	"flagged" jsonb DEFAULT '[]'::jsonb,
	"report" jsonb DEFAULT '{}'::jsonb,
	"career_type" text DEFAULT 'nursing',
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "mock_exam_credit_ledger" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"credit_type" text DEFAULT 'MOCK_OFFICIAL' NOT NULL,
	"scope" text NOT NULL,
	"quantity" integer NOT NULL,
	"source_purchase_id" varchar,
	"session_id" varchar,
	"note" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_products" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sku" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"credit_type" text DEFAULT 'MOCK_OFFICIAL' NOT NULL,
	"scope" text NOT NULL,
	"credits_granted" integer NOT NULL,
	"price_in_cents" integer NOT NULL,
	"stripe_price_id" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mock_exam_products_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "mock_exam_purchases" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"product_id" varchar,
	"stripe_session_id" text,
	"stripe_payment_intent_id" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"amount_in_cents" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"lesson_id" text NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" text NOT NULL,
	"user_id" varchar,
	"page" text NOT NULL,
	"referrer" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"device_type" text,
	"browser" text,
	"os" text,
	"country" text,
	"duration" integer DEFAULT 0,
	"is_checkout_intent" boolean DEFAULT false,
	"is_pricing_view" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_views_daily" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" text NOT NULL,
	"path" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pharmtech_exam_attempts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"exam_id" varchar NOT NULL,
	"mode" text DEFAULT 'timed' NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb,
	"flagged" jsonb DEFAULT '[]'::jsonb,
	"score" integer,
	"total_questions" integer NOT NULL,
	"time_spent_seconds" integer,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pharmtech_exams" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"external_id" text,
	"title" text NOT NULL,
	"description" text DEFAULT '',
	"question_ids" text[] DEFAULT '{}'::text[],
	"time_limit_minutes" integer DEFAULT 60,
	"passing_score" integer DEFAULT 70,
	"published" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pharmtech_exams_slug_unique" UNIQUE("slug"),
	CONSTRAINT "pharmtech_exams_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "pharmtech_flashcard_decks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"external_id" text,
	"title" text NOT NULL,
	"description" text DEFAULT '',
	"category" text NOT NULL,
	"lesson_slug" text,
	"card_count" integer DEFAULT 0,
	"published" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pharmtech_flashcard_decks_slug_unique" UNIQUE("slug"),
	CONSTRAINT "pharmtech_flashcard_decks_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "pharmtech_flashcards" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deck_id" varchar NOT NULL,
	"front" text NOT NULL,
	"back" text NOT NULL,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pharmtech_lessons" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"external_id" text,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"summary" text,
	"body" text DEFAULT '' NOT NULL,
	"objectives" text[] DEFAULT '{}'::text[],
	"key_points" text[] DEFAULT '{}'::text[],
	"common_mistakes" text[] DEFAULT '{}'::text[],
	"related_deck_slugs" text[] DEFAULT '{}'::text[],
	"seo_title" text,
	"seo_description" text,
	"published" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pharmtech_lessons_slug_unique" UNIQUE("slug"),
	CONSTRAINT "pharmtech_lessons_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "pharmtech_questions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_id" text,
	"stem" text NOT NULL,
	"options" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"correct_index" integer NOT NULL,
	"rationale" text NOT NULL,
	"category" text NOT NULL,
	"difficulty" integer DEFAULT 2 NOT NULL,
	"lesson_slug" text,
	"published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pharmtech_questions_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE "pinterest_pins" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"hashtags" jsonb DEFAULT '[]'::jsonb,
	"image_url" text,
	"link_url" text,
	"pin_type" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"scheduled_for" timestamp,
	"published_at" timestamp,
	"pinterest_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "practice_pages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"exam_key" text NOT NULL,
	"domain" text NOT NULL,
	"keyword" text NOT NULL,
	"title" text NOT NULL,
	"intro_content" text,
	"questions" jsonb DEFAULT '[]'::jsonb,
	"faq_schema" jsonb DEFAULT '{}'::jsonb,
	"breadcrumb_schema" jsonb DEFAULT '{}'::jsonb,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "practice_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "pricing_offers" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"offer_type" text NOT NULL,
	"tier" text NOT NULL,
	"price" double precision NOT NULL,
	"currency" text DEFAULT 'USD',
	"duration_days" integer,
	"discount_percent" integer DEFAULT 0,
	"eligibility_rules" jsonb DEFAULT '{}'::jsonb,
	"localized_copy" jsonb DEFAULT '{}'::jsonb,
	"enabled" boolean DEFAULT true,
	"career_type" text DEFAULT 'nursing',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_generations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"template" text NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"target_count" integer NOT NULL,
	"created_count" integer DEFAULT 0 NOT NULL,
	"chunk_size" integer DEFAULT 15 NOT NULL,
	"model" text DEFAULT 'gpt-4o-mini',
	"prompt_base" text,
	"prompt_state" jsonb,
	"topic" text,
	"exam_target" text,
	"difficulty" text DEFAULT 'mixed',
	"question_types" jsonb,
	"region" text DEFAULT 'BOTH',
	"settings" jsonb,
	"last_error" text,
	"started_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_purchases" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	"stripe_session_id" text,
	"purchase_date" timestamp DEFAULT now() NOT NULL,
	"download_count" integer DEFAULT 0,
	"max_downloads" integer DEFAULT 5
);
--> statement-breakpoint
CREATE TABLE "publishing_queue" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"engine_key" varchar NOT NULL,
	"content_type" text NOT NULL,
	"title" text NOT NULL,
	"content" jsonb DEFAULT '{}'::jsonb,
	"status" text DEFAULT 'draft' NOT NULL,
	"preview_url" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_by" varchar,
	"approved_by" varchar,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qbank_drafts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"exam" text DEFAULT 'rex-pn' NOT NULL,
	"topic" text NOT NULL,
	"mixed_blueprint" boolean DEFAULT false,
	"requested_count" integer DEFAULT 300 NOT NULL,
	"difficulty" text DEFAULT 'medium' NOT NULL,
	"distribution_json" jsonb,
	"topic_mix" jsonb,
	"canadian_context" boolean DEFAULT true,
	"output_language" text DEFAULT 'en',
	"editions_json" jsonb,
	"questions_json" jsonb,
	"audit_json" jsonb,
	"base_prompt" text,
	"patch_prompts" jsonb,
	"version" integer DEFAULT 1,
	"status" text DEFAULT 'draft' NOT NULL,
	"price" integer DEFAULT 1499,
	"study_edition_price" integer DEFAULT 2499,
	"published_product_id" varchar,
	"published_study_product_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "qbank_drafts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "qbank_generation_runs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" varchar NOT NULL,
	"template_key" text NOT NULL,
	"variant_key" text NOT NULL,
	"exam_key" text NOT NULL,
	"region" text NOT NULL,
	"target_count" integer NOT NULL,
	"generated_count" integer DEFAULT 0,
	"accepted_count" integer DEFAULT 0,
	"rejected_count" integer DEFAULT 0,
	"status" text DEFAULT 'queued',
	"is_dry_run" boolean DEFAULT true,
	"ingested" boolean DEFAULT false,
	"validation_report" jsonb,
	"preview_items" jsonb,
	"generated_items" jsonb,
	"token_cost" integer DEFAULT 0,
	"model" text DEFAULT 'gpt-4o-mini',
	"error_message" text,
	"triggered_by" text DEFAULT 'manual',
	"schedule_id" varchar,
	"started_at" timestamp,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qbank_generation_schedules" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"template_key" text NOT NULL,
	"variant_key" text NOT NULL,
	"exam_key" text NOT NULL,
	"region" text NOT NULL,
	"questions_per_run" integer DEFAULT 25,
	"rationale_min_words" integer DEFAULT 250,
	"frequency" text DEFAULT 'daily',
	"custom_cron_days" jsonb,
	"run_time_hour" integer DEFAULT 3,
	"enabled" boolean DEFAULT false,
	"auto_ingest" boolean DEFAULT false,
	"max_daily_runs" integer DEFAULT 1,
	"last_run_at" timestamp,
	"next_run_at" timestamp,
	"total_runs_completed" integer DEFAULT 0,
	"total_questions_generated" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "qbank_prompt_templates" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"version" integer DEFAULT 1,
	"is_active" boolean DEFAULT true,
	"system_prompt" text NOT NULL,
	"user_prompt_template" text NOT NULL,
	"variants" jsonb,
	"validation_rules" jsonb,
	"output_schema_version" text DEFAULT 'v1',
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "qbank_prompt_templates_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "qbank_recipes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"exam" text DEFAULT 'rex-pn' NOT NULL,
	"topic" text NOT NULL,
	"mixed_blueprint" boolean DEFAULT false,
	"requested_count" integer DEFAULT 300 NOT NULL,
	"difficulty" text DEFAULT 'medium' NOT NULL,
	"distribution_json" jsonb,
	"canadian_context" boolean DEFAULT true,
	"editions_json" jsonb,
	"price" integer DEFAULT 1499,
	"study_edition_price" integer DEFAULT 2499,
	"auto_publish" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"last_run_at" timestamp,
	"last_run_status" text,
	"run_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qc_runs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scope" text NOT NULL,
	"cluster_id" varchar,
	"article_id" varchar,
	"asset_id" varchar,
	"passed" boolean NOT NULL,
	"errors" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "qotd_history" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_date" text NOT NULL,
	"tier" text DEFAULT 'rpn' NOT NULL,
	"question_text" text NOT NULL,
	"options" jsonb DEFAULT '[]'::jsonb,
	"correct_index" integer NOT NULL,
	"rationale" text NOT NULL,
	"body_system" text,
	"lesson_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "qotd_history_question_date_unique" UNIQUE("question_date")
);
--> statement-breakpoint
CREATE TABLE "question_analytics" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" varchar NOT NULL,
	"total_attempts" integer DEFAULT 0,
	"total_correct" integer DEFAULT 0,
	"percent_correct" double precision DEFAULT 0,
	"unique_user_count" integer DEFAULT 0,
	"difficulty" text,
	"last_updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_schedule_log" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" varchar NOT NULL,
	"action" text NOT NULL,
	"previous_status" text,
	"new_status" text,
	"actor_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_type_registry" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam" text NOT NULL,
	"question_type" text NOT NULL,
	"display_name" text NOT NULL,
	"is_enabled" boolean DEFAULT true,
	"default_target_count" integer DEFAULT 100,
	"validation_rules" jsonb DEFAULT '{}'::jsonb,
	"weight_percent" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendation_log" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"session_type" text,
	"session_id" varchar,
	"recommended_courses" jsonb DEFAULT '[]'::jsonb,
	"weakness_snapshot" jsonb DEFAULT '{}'::jsonb,
	"clicked" boolean DEFAULT false,
	"added_to_plan" boolean DEFAULT false,
	"completed" boolean DEFAULT false,
	"performance_change_after" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_queue" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"item_type" text NOT NULL,
	"item_id" varchar NOT NULL,
	"reason" text NOT NULL,
	"priority" integer DEFAULT 1,
	"scheduled_date" text NOT NULL,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_decks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"deck_id" varchar NOT NULL,
	"saved_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_articles" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cluster_id" varchar NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"target_keyword" text NOT NULL,
	"search_intent" text DEFAULT 'informational' NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"outline_json" jsonb DEFAULT '{}'::jsonb,
	"content_md" text DEFAULT '' NOT NULL,
	"word_count" integer DEFAULT 0 NOT NULL,
	"reading_level" text,
	"canonical_url" text,
	"requires_infographic" boolean DEFAULT true NOT NULL,
	"requires_pins" boolean DEFAULT true NOT NULL,
	"requires_practice_questions" boolean DEFAULT true NOT NULL,
	"published_at" timestamp,
	"site_context" text DEFAULT 'nursing' NOT NULL,
	"career_track" text,
	"exam_name" text,
	"primary_category" text,
	"secondary_category" text,
	"gating_level" text DEFAULT 'public' NOT NULL,
	"requires_disclaimer" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "seo_articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "seo_clusters" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"keyword" text NOT NULL,
	"country_mode" text DEFAULT 'BOTH' NOT NULL,
	"exam_tier" text DEFAULT 'ALL' NOT NULL,
	"pillar_slug" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"notes" text,
	"site_context" text DEFAULT 'nursing' NOT NULL,
	"career_track" text,
	"career_country_mode" text DEFAULT 'BOTH' NOT NULL,
	"exam_name" text,
	"blueprint_tags" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "seo_clusters_pillar_slug_unique" UNIQUE("pillar_slug")
);
--> statement-breakpoint
CREATE TABLE "seo_health_checks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"check_type" text NOT NULL,
	"severity" text DEFAULT 'warning',
	"page_slug" text,
	"language_code" text,
	"details" text NOT NULL,
	"resolved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_infographics" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_id" varchar NOT NULL,
	"template_id" varchar,
	"type" text NOT NULL,
	"variant" text DEFAULT 'default' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"title" text NOT NULL,
	"alt_text" text DEFAULT '' NOT NULL,
	"prompt_used" text DEFAULT '' NOT NULL,
	"width" integer DEFAULT 3000 NOT NULL,
	"height" integer DEFAULT 2000 NOT NULL,
	"file_path" text DEFAULT '' NOT NULL,
	"public_url" text DEFAULT '' NOT NULL,
	"checksum" text,
	"qc_errors" jsonb DEFAULT '[]'::jsonb,
	"site_context" text DEFAULT 'nursing' NOT NULL,
	"career_track" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_internal_links" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_article_id" varchar NOT NULL,
	"to_article_id" varchar NOT NULL,
	"anchor_text" text NOT NULL,
	"reason" text NOT NULL,
	"placement" text DEFAULT 'body' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_keyword_targets" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language_code" text NOT NULL,
	"keyword" text NOT NULL,
	"intent" text DEFAULT 'informational',
	"page_target_slug" text,
	"search_volume" integer,
	"difficulty" integer,
	"coverage_status" text DEFAULT 'unmapped',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_pages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_type" text NOT NULL,
	"exam" text,
	"language_code" text DEFAULT 'en' NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"content_html" text,
	"toc_json" jsonb,
	"faq_json" jsonb,
	"internal_links_json" jsonb,
	"is_public" boolean DEFAULT true,
	"is_indexable" boolean DEFAULT true,
	"canonical_url" text,
	"translation_status" text DEFAULT 'en_source',
	"page_group_id" varchar,
	"last_updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_pins" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_id" varchar NOT NULL,
	"infographic_id" varchar,
	"pin_variant" integer NOT NULL,
	"headline" text NOT NULL,
	"bullets_json" jsonb DEFAULT '[]'::jsonb,
	"status" text DEFAULT 'draft' NOT NULL,
	"width" integer DEFAULT 1000 NOT NULL,
	"height" integer DEFAULT 1500 NOT NULL,
	"file_path" text DEFAULT '' NOT NULL,
	"public_url" text DEFAULT '' NOT NULL,
	"qc_errors" jsonb DEFAULT '[]'::jsonb,
	"site_context" text DEFAULT 'nursing' NOT NULL,
	"career_track" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_publish_queue" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_id" varchar NOT NULL,
	"scheduled_for" timestamp NOT NULL,
	"priority" integer DEFAULT 50 NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"blocked_reason" text,
	"site_context" text DEFAULT 'nursing' NOT NULL,
	"career_track" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_images" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_key" text NOT NULL,
	"url" text NOT NULL,
	"alt" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "site_images_image_key_unique" UNIQUE("image_key")
);
--> statement-breakpoint
CREATE TABLE "social_connections" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"facebook_page_id" text,
	"facebook_page_name" text,
	"facebook_page_token" text,
	"instagram_business_id" text,
	"instagram_username" text,
	"token_expires_at" timestamp,
	"connected_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "social_connections_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "social_posts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"platform" text NOT NULL,
	"post_type" text DEFAULT 'qotd',
	"content" text NOT NULL,
	"image_url" text,
	"hashtags" text[] DEFAULT '{}'::text[],
	"status" text DEFAULT 'scheduled',
	"scheduled_at" timestamp,
	"published_at" timestamp,
	"platform_post_id" text,
	"engagement_data" jsonb DEFAULT '{}'::jsonb,
	"tier" text DEFAULT 'rpn',
	"question_data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_group_members" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_groups" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"invite_code" text NOT NULL,
	"created_by" varchar NOT NULL,
	"show_ranking" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "study_groups_invite_code_unique" UNIQUE("invite_code")
);
--> statement-breakpoint
CREATE TABLE "study_onboarding" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"tier" text NOT NULL,
	"domain_ratings" jsonb,
	"preferences" jsonb,
	"quiz_results" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_pack_purchases" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"pack_id" varchar NOT NULL,
	"stripe_payment_id" text,
	"amount" double precision NOT NULL,
	"currency" text DEFAULT 'USD',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_packs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"pack_type" text NOT NULL,
	"exam_code" text,
	"tier" text DEFAULT 'rn',
	"description" text,
	"content_html" text,
	"price" double precision NOT NULL,
	"currency" text DEFAULT 'USD',
	"question_count" integer DEFAULT 0,
	"question_tags" jsonb DEFAULT '[]'::jsonb,
	"difficulty_range" text,
	"language_code" text DEFAULT 'en',
	"faq_json" jsonb DEFAULT '[]'::jsonb,
	"meta_title" text,
	"meta_description" text,
	"is_published" boolean DEFAULT false,
	"stripe_price_id" text,
	"purchase_count" integer DEFAULT 0,
	"career_type" text DEFAULT 'nursing',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "study_packs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "study_plan_days" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"study_plan_id" varchar NOT NULL,
	"week_num" integer NOT NULL,
	"day_num" integer NOT NULL,
	"title" text NOT NULL,
	"focus_domains" jsonb,
	"date" timestamp
);
--> statement-breakpoint
CREATE TABLE "study_plan_schedule" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"date" text NOT NULL,
	"phase" text,
	"tasks" jsonb DEFAULT '[]'::jsonb,
	"completed" boolean DEFAULT false,
	"completion_rate" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_plan_tasks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day_id" varchar NOT NULL,
	"type" text NOT NULL,
	"domain" text NOT NULL,
	"title" text NOT NULL,
	"minutes" integer NOT NULL,
	"link_url" text,
	"resource_id" text,
	"status" text DEFAULT 'todo',
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "study_plans" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"tier" text NOT NULL,
	"timeframe_weeks" integer DEFAULT 4,
	"minutes_per_day" integer DEFAULT 30,
	"exam_date" timestamp,
	"exam_type" text,
	"style_preference" text DEFAULT 'read_then_practice',
	"domain_ratings" jsonb,
	"quiz_results" jsonb,
	"preferences" jsonb,
	"is_active" boolean DEFAULT true,
	"progress_percent" integer DEFAULT 0,
	"career_type" text DEFAULT 'nursing',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "study_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"deck_id" varchar NOT NULL,
	"mode" text DEFAULT 'learn' NOT NULL,
	"total_cards" integer DEFAULT 0,
	"correct_count" integer DEFAULT 0,
	"incorrect_count" integer DEFAULT 0,
	"time_seconds" integer,
	"missed_card_ids" jsonb DEFAULT '[]'::jsonb,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "test_results" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"lesson_id" text NOT NULL,
	"test_type" text NOT NULL,
	"score" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"answers" jsonb,
	"completed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tester_feedback" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"username" text,
	"category" text DEFAULT 'general' NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"page_url" text,
	"severity" text DEFAULT 'medium',
	"status" text DEFAULT 'new',
	"admin_response" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tester_invite_codes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"max_uses" integer DEFAULT 10 NOT NULL,
	"used_count" integer DEFAULT 0 NOT NULL,
	"expires_at" timestamp,
	"notes" text,
	"tier" text DEFAULT 'rn',
	"is_active" boolean DEFAULT true,
	"used_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tester_invite_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "translation_jobs" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" text NOT NULL,
	"content_id" text NOT NULL,
	"target_language" text NOT NULL,
	"fields_to_translate" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" text DEFAULT 'pending',
	"progress" integer DEFAULT 0,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "trial_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"exam_key" text NOT NULL,
	"tier" text DEFAULT 'rpn' NOT NULL,
	"status" text DEFAULT 'started' NOT NULL,
	"total_questions" integer DEFAULT 50 NOT NULL,
	"questions_served" integer DEFAULT 0,
	"questions_answered" integer DEFAULT 0,
	"current_index" integer DEFAULT 0,
	"questions" jsonb DEFAULT '[]'::jsonb,
	"answers" jsonb DEFAULT '{}'::jsonb,
	"domain_scores" jsonb DEFAULT '{}'::jsonb,
	"difficulty_estimate" double precision,
	"readiness_level" text,
	"completion_time_seconds" integer,
	"report" jsonb DEFAULT '{}'::jsonb,
	"ip_address" text,
	"device_fingerprint" text,
	"timer_enabled" boolean DEFAULT false,
	"expires_at" timestamp,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "upgrade_funnel_events" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"event_type" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_ability_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"session_id" varchar NOT NULL,
	"final_ability" double precision DEFAULT 0,
	"confidence_interval" double precision,
	"stability_index" double precision,
	"early_stop" boolean DEFAULT false,
	"question_count" integer DEFAULT 0,
	"ability_trajectory" jsonb DEFAULT '[]'::jsonb,
	"anti_gaming_flags" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_exam_profile" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"exam_type" text NOT NULL,
	"exam_date" timestamp,
	"hours_per_day" integer DEFAULT 2,
	"days_per_week" integer DEFAULT 5,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_feedback" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"username" text,
	"email" text,
	"type" text DEFAULT 'feedback' NOT NULL,
	"category" text DEFAULT 'general',
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'new',
	"priority" text DEFAULT 'medium',
	"admin_notes" text,
	"upvotes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_flashcards" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"category" text DEFAULT 'My Cards',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_funnel_events" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"language_code" text DEFAULT 'en',
	"event_name" text NOT NULL,
	"event_value" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_performance_summary" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"readiness_score" integer DEFAULT 0,
	"projected_pass_probability" integer DEFAULT 0,
	"weakness_vector" jsonb DEFAULT '{}'::jsonb,
	"strengths_vector" jsonb DEFAULT '{}'::jsonb,
	"top_weak_domains" jsonb DEFAULT '[]'::jsonb,
	"top_weak_question_types" jsonb DEFAULT '[]'::jsonb,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"lesson_id" text NOT NULL,
	"completed" text DEFAULT 'false',
	"pre_test_score" integer,
	"post_test_score" integer,
	"last_accessed" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_revenue_profile" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"language_code" text DEFAULT 'en',
	"segment" text DEFAULT 'content_explorer',
	"propensity_score" double precision DEFAULT 0,
	"price_sensitivity_score" double precision DEFAULT 0,
	"time_to_exam_days" integer,
	"last_offer_shown" text,
	"last_offer_result" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_revenue_profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"total_questions_answered" integer DEFAULT 0,
	"total_correct" integer DEFAULT 0,
	"domain_breakdown" jsonb DEFAULT '{}'::jsonb,
	"exam_scores" jsonb DEFAULT '[]'::jsonb,
	"study_streak" integer DEFAULT 0,
	"last_study_date" text,
	"weekly_history" jsonb DEFAULT '[]'::jsonb,
	"public_profile" boolean DEFAULT false,
	"leaderboard_visible" boolean DEFAULT false,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_stats_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text,
	"tier" text DEFAULT 'free',
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"subscription_status" text DEFAULT 'inactive',
	"region" text DEFAULT 'US',
	"flashcard_limit" integer DEFAULT 300,
	"plan_expires_at" timestamp,
	"career_type" text DEFAULT 'nursing',
	"tester_access" boolean DEFAULT false,
	"tester_expiry" timestamp,
	"tester_invite_code" text,
	"referral_code" text,
	"referral_uses" integer DEFAULT 0,
	"referred_by" text,
	"referral_discount_used" boolean DEFAULT false,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_referral_code_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
CREATE TABLE "v2_content_blocks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generation_id" varchar NOT NULL,
	"section_key" text NOT NULL,
	"blocks" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_reports" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" varchar NOT NULL,
	"verdict" text NOT NULL,
	"confidence_score" double precision,
	"issues_json" jsonb DEFAULT '[]'::jsonb,
	"citations_json" jsonb DEFAULT '[]'::jsonb,
	"checked_at" timestamp DEFAULT now() NOT NULL,
	"model_version" text
);
--> statement-breakpoint
CREATE TABLE "visual_assets" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"asset_type" text NOT NULL,
	"prompt" text NOT NULL,
	"alt_text" text,
	"caption" text,
	"image_url" text,
	"width" integer DEFAULT 1600,
	"height" integer DEFAULT 1200,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "content_translations_unique_idx" ON "content_translations" USING btree ("content_type","content_id","field_name","language_code");