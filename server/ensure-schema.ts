import pg from "pg";

export async function ensureSchemaSync(pool: pg.Pool): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS paramedic_waveform_assets (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        waveform_type text NOT NULL,
        name text NOT NULL,
        slug text NOT NULL UNIQUE,
        category text NOT NULL,
        svg_path_data jsonb NOT NULL,
        clinical_annotations jsonb DEFAULT '{}'::jsonb,
        identifying_features text[] DEFAULT '{}'::text[],
        associated_conditions text[] DEFAULT '{}'::text[],
        treatment_notes text,
        rate text,
        regularity text,
        clinical_significance text,
        difficulty text DEFAULT 'beginner',
        visibility_tier text DEFAULT 'free',
        content_domain text NOT NULL DEFAULT 'paramedic',
        sort_order integer DEFAULT 0,
        status text DEFAULT 'published',
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS pharmtech_lessons (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text UNIQUE NOT NULL,
        title text NOT NULL,
        category text NOT NULL,
        summary text,
        body text,
        objectives text[] DEFAULT '{}',
        key_points text[] DEFAULT '{}',
        common_mistakes text[] DEFAULT '{}',
        related_deck_slugs text[] DEFAULT '{}',
        published boolean DEFAULT false,
        sort_order integer DEFAULT 0,
        cert_context text DEFAULT 'BOTH'
      );

      CREATE TABLE IF NOT EXISTS pharmtech_flashcard_decks (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text UNIQUE NOT NULL,
        title text NOT NULL,
        description text,
        category text,
        lesson_slug text,
        card_count integer DEFAULT 0,
        published boolean DEFAULT false,
        sort_order integer DEFAULT 0,
        cert_context text DEFAULT 'BOTH'
      );

      CREATE TABLE IF NOT EXISTS pharmtech_flashcards (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        deck_id varchar NOT NULL,
        front text NOT NULL,
        back text NOT NULL,
        sort_order integer DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS pharmtech_questions (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        external_id text UNIQUE,
        stem text NOT NULL,
        options jsonb NOT NULL DEFAULT '[]',
        correct_index integer NOT NULL DEFAULT 0,
        rationale text,
        category text,
        difficulty integer DEFAULT 3,
        lesson_slug text,
        published boolean DEFAULT false,
        cert_context text DEFAULT 'PTCB'
      );

      CREATE TABLE IF NOT EXISTS pharmtech_exams (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text UNIQUE NOT NULL,
        title text NOT NULL,
        description text,
        question_ids text[] DEFAULT '{}',
        time_limit_minutes integer DEFAULT 60,
        passing_score integer DEFAULT 70,
        published boolean DEFAULT false,
        sort_order integer DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS pharmtech_adaptive_sessions (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar,
        status text NOT NULL DEFAULT 'active',
        total_answered integer DEFAULT 0,
        correct_count integer DEFAULT 0,
        current_difficulty integer DEFAULT 3,
        responses jsonb DEFAULT '[]'::jsonb,
        category_stats jsonb DEFAULT '{}'::jsonb,
        mastery_levels jsonb DEFAULT '{}'::jsonb,
        weak_areas jsonb DEFAULT '[]'::jsonb,
        difficulty_progression jsonb DEFAULT '[]'::jsonb,
        settings jsonb DEFAULT '{}'::jsonb,
        started_at timestamp NOT NULL DEFAULT now(),
        completed_at timestamp
      );

      CREATE TABLE IF NOT EXISTS pharmtech_mastery_history (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar,
        category text NOT NULL,
        total_attempted integer DEFAULT 0,
        total_correct integer DEFAULT 0,
        accuracy double precision DEFAULT 0,
        mastery_level text DEFAULT 'Beginner',
        last_session_id varchar,
        updated_at timestamp NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS pharmtech_study_plans (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar,
        exam_date timestamp,
        days_per_week integer DEFAULT 5,
        minutes_per_session integer DEFAULT 30,
        pace text DEFAULT 'balanced',
        learning_style text DEFAULT 'mixed',
        weak_areas jsonb DEFAULT '[]'::jsonb,
        use_adaptive_results boolean DEFAULT false,
        preset_type text,
        schedule jsonb DEFAULT '[]'::jsonb,
        progress_percent integer DEFAULT 0,
        is_active boolean DEFAULT true,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS pharmtech_study_plan_tasks (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        plan_id varchar NOT NULL,
        week_num integer NOT NULL,
        day_num integer NOT NULL,
        phase text NOT NULL,
        task_type text NOT NULL,
        title text NOT NULL,
        description text,
        category text,
        link_url text,
        estimated_minutes integer DEFAULT 15,
        completed boolean DEFAULT false,
        completed_at timestamp,
        skipped boolean DEFAULT false,
        rescheduled_to text,
        sort_order integer DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS paramedic_exam_sessions (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar NOT NULL,
        content_domain text NOT NULL DEFAULT 'paramedic',
        mode text NOT NULL,
        exam_type text NOT NULL,
        total_questions integer NOT NULL,
        time_limit integer,
        status text NOT NULL DEFAULT 'in_progress',
        current_index integer DEFAULT 0,
        score integer,
        correct_count integer,
        question_ids jsonb DEFAULT '[]'::jsonb,
        answers jsonb DEFAULT '{}'::jsonb,
        flagged_ids jsonb DEFAULT '[]'::jsonb,
        question_meta jsonb DEFAULT '[]'::jsonb,
        ability_estimate double precision DEFAULT 0,
        drill_topic text,
        drill_streak integer DEFAULT 0,
        drill_best_streak integer DEFAULT 0,
        report jsonb,
        started_at timestamp NOT NULL DEFAULT now(),
        completed_at timestamp
      );
    `);

    const fbCols = [
      ["source_type", "text DEFAULT 'manual'"],
      ["source_question_id", "varchar"],
      ["question_type", "text"],
      ["options", "jsonb DEFAULT '[]'::jsonb"],
      ["correct_answer", "jsonb"],
      ["rationale_correct", "text"],
      ["exam_pearl", "text"],
      ["rationale_media", "jsonb DEFAULT '[]'::jsonb"],
      ["difficulty", "integer"],
      ["body_system", "text"],
      ["topic", "text"],
      ["exam_type", "text"],
      ["image_url", "text"],
      ["flashcard_enabled", "boolean DEFAULT true"],
      ["distractor_rationales", "jsonb DEFAULT '[]'::jsonb"],
      ["clinical_takeaway", "text"],
      ["lesson_links", "jsonb DEFAULT '[]'::jsonb"],
      ["subtopic", "text"],
      ["region_scope", "text DEFAULT 'BOTH'"],
      ["category", "text"],
      ["updated_at", "timestamp DEFAULT now()"],
    ];

    for (const [col, def] of fbCols) {
      await client.query(`ALTER TABLE flashcard_bank ADD COLUMN IF NOT EXISTS ${col} ${def}`);
    }

    const imagingFlashcardCols: [string, string][] = [
      ["country", "text DEFAULT 'both'"],
      ["exam_type", "text"],
      ["topic", "text"],
    ];
    for (const [col, def] of imagingFlashcardCols) {
      await client.query(`ALTER TABLE imaging_flashcards ADD COLUMN IF NOT EXISTS ${col} ${def}`);
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS classrooms (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        institution_id varchar NOT NULL,
        name text NOT NULL,
        description text,
        instructor_id varchar NOT NULL,
        status text NOT NULL DEFAULT 'active',
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS classroom_students (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        classroom_id varchar NOT NULL,
        user_id varchar NOT NULL,
        enrolled_at timestamp NOT NULL DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS assignments (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        classroom_id varchar NOT NULL,
        instructor_id varchar NOT NULL,
        title text NOT NULL,
        description text,
        type text NOT NULL DEFAULT 'lesson',
        resource_id text,
        due_date timestamp,
        status text NOT NULL DEFAULT 'active',
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS assignment_submissions (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        assignment_id varchar NOT NULL,
        student_id varchar NOT NULL,
        status text NOT NULL DEFAULT 'not_started',
        score integer,
        time_spent integer,
        submitted_at timestamp,
        completed_at timestamp
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id varchar NOT NULL,
        institution_id varchar NOT NULL,
        classroom_id varchar,
        student_name text NOT NULL,
        course_name text NOT NULL,
        institution_name text NOT NULL,
        completion_date timestamp NOT NULL,
        certificate_code text NOT NULL UNIQUE,
        issued_at timestamp NOT NULL DEFAULT now()
      );
    `);

    const physicsCols: [string, string][] = [
      ["slug", "text NOT NULL DEFAULT ''"],
      ["explanation", "text"],
      ["country", "text DEFAULT 'both'"],
      ["exam_type", "text"],
      ["exam_traps", "jsonb DEFAULT '[]'::jsonb"],
      ["memory_aid", "text"],
      ["clinical_relevance", "text"],
      ["factor_relationships", "jsonb DEFAULT '[]'::jsonb"],
      ["diagram_config", "jsonb DEFAULT '{}'::jsonb"],
      ["quiz_items", "jsonb DEFAULT '[]'::jsonb"],
      ["sort_order", "integer DEFAULT 0"],
      ["seo_title", "text"],
      ["seo_description", "text"],
    ];
    for (const [col, def] of physicsCols) {
      await client.query(`ALTER TABLE imaging_physics_topics ADD COLUMN IF NOT EXISTS ${col} ${def}`);
    }

    await client.query(`ALTER TABLE deck_flashcards ADD COLUMN IF NOT EXISTS clinical_pearl text`);
    await client.query(`ALTER TABLE allied_flashcards ADD COLUMN IF NOT EXISTS clinical_pearl text`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS practice_quiz_pages (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL UNIQUE,
        title text NOT NULL,
        meta_description text NOT NULL,
        h1 text NOT NULL,
        intro_text text,
        topic text NOT NULL,
        subtopic text,
        body_system text,
        career_type text DEFAULT 'nursing',
        exam_type text,
        difficulty text DEFAULT 'mixed',
        question_count integer DEFAULT 10,
        question_ids text[] DEFAULT '{}'::text[],
        related_page_slugs text[] DEFAULT '{}'::text[],
        keywords text[] DEFAULT '{}'::text[],
        structured_data jsonb DEFAULT '{}'::jsonb,
        is_auto_generated boolean DEFAULT true,
        status text DEFAULT 'published',
        view_count integer DEFAULT 0,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar,
        endpoint text NOT NULL UNIQUE,
        p256dh text NOT NULL,
        auth text NOT NULL,
        reminder_time text DEFAULT '09:00',
        enable_daily_reminder boolean DEFAULT true,
        enable_exam_reminder boolean DEFAULT true,
        enable_flashcard_reminder boolean DEFAULT true,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS translation_audits (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        content_id text NOT NULL,
        content_type text NOT NULL,
        url text,
        locale text NOT NULL,
        translation_pct double precision DEFAULT 0,
        status text DEFAULT 'draft',
        issue_count integer DEFAULT 0,
        issue_breakdown jsonb DEFAULT '{}'::jsonb,
        sitemap_eligible boolean DEFAULT false,
        noindex boolean DEFAULT false,
        admin_override boolean DEFAULT false,
        last_scanned_at timestamp DEFAULT now(),
        last_content_updated_at timestamp,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS translation_audit_issues (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        audit_id varchar NOT NULL,
        field_name text NOT NULL,
        source_value text,
        localized_value text,
        issue_type text NOT NULL,
        category text DEFAULT 'primary_body',
        status text DEFAULT 'open',
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL UNIQUE,
        title text NOT NULL,
        category text,
        sub_category text,
        tier text DEFAULT 'free',
        status text DEFAULT 'draft',
        summary text,
        definition text,
        pathophysiology text,
        signs_symptoms jsonb DEFAULT '[]'::jsonb,
        diagnostics jsonb DEFAULT '[]'::jsonb,
        treatment jsonb DEFAULT '[]'::jsonb,
        nursing_interventions jsonb DEFAULT '[]'::jsonb,
        complications jsonb DEFAULT '[]'::jsonb,
        clinical_pearls jsonb DEFAULT '[]'::jsonb,
        "references" jsonb DEFAULT '[]'::jsonb,
        seo_title text,
        seo_description text,
        seo_keywords text[] DEFAULT '{}'::text[],
        image_url text,
        image_alt text,
        related_lesson_slugs text[] DEFAULT '{}'::text[],
        linked_flashcard_set_id varchar,
        linked_question_bank_id varchar,
        is_public_preview boolean DEFAULT false,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS lesson_aliases (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        lesson_id TEXT NOT NULL,
        alias_text TEXT NOT NULL,
        normalized_alias TEXT NOT NULL,
        canonical_slug TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        UNIQUE(normalized_alias, lesson_id)
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_lesson_aliases_normalized ON lesson_aliases (normalized_alias)
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_lesson_aliases_canonical_slug ON lesson_aliases (canonical_slug)
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_lesson_aliases_lesson_id ON lesson_aliases (lesson_id)
    `);

    await client.query(`
      ALTER TABLE content_items ADD COLUMN IF NOT EXISTS merged_into TEXT
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS new_grad_guides (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        slug text NOT NULL UNIQUE,
        profession text NOT NULL,
        guide_type text NOT NULL,
        category text,
        summary text,
        content jsonb DEFAULT '[]',
        sections jsonb DEFAULT '[]',
        seo_title text,
        seo_description text,
        seo_keywords text[] DEFAULT '{}',
        faq_items jsonb DEFAULT '[]',
        related_guide_ids text[] DEFAULT '{}',
        status text DEFAULT 'draft',
        tags text[] DEFAULT '{}',
        author_name text,
        published_at timestamptz,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_new_grad_guides_profession ON new_grad_guides (profession)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_new_grad_guides_type ON new_grad_guides (guide_type)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_new_grad_guides_status ON new_grad_guides (status)
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS new_grad_testimonials (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        profession text,
        role text,
        organization text,
        content text NOT NULL,
        rating integer DEFAULT 5,
        avatar_url text,
        featured boolean DEFAULT false,
        status text DEFAULT 'pending',
        created_at timestamptz DEFAULT now()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS lead_capture_downloads (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        subscriber_id varchar,
        email text NOT NULL,
        resource_type text NOT NULL,
        resource_name text NOT NULL,
        profession text,
        downloaded_at timestamptz DEFAULT now()
      )
    `);

    await client.query(`ALTER TABLE email_subscribers ADD COLUMN IF NOT EXISTS lead_magnet_type TEXT`);
    await client.query(`ALTER TABLE email_subscribers ADD COLUMN IF NOT EXISTS profession_context TEXT`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_jobs (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        type text NOT NULL,
        status text NOT NULL DEFAULT 'pending',
        config jsonb DEFAULT '{}'::jsonb,
        progress jsonb DEFAULT '{}'::jsonb,
        logs jsonb DEFAULT '[]'::jsonb,
        cost_estimate double precision DEFAULT 0,
        actual_cost double precision DEFAULT 0,
        item_count integer DEFAULT 1,
        items_completed integer DEFAULT 0,
        duplicates_skipped integer DEFAULT 0,
        created_by text,
        created_at timestamptz NOT NULL DEFAULT NOW(),
        started_at timestamptz,
        completed_at timestamptz,
        cancelled_at timestamptz,
        error text
      )
    `);

    await client.query(`ALTER TABLE ai_jobs
      ADD COLUMN IF NOT EXISTS tier text,
      ADD COLUMN IF NOT EXISTS content_type text,
      ADD COLUMN IF NOT EXISTS model text DEFAULT 'gpt-4o-mini',
      ADD COLUMN IF NOT EXISTS model_tier text DEFAULT 'cheapest',
      ADD COLUMN IF NOT EXISTS batch_size integer DEFAULT 25,
      ADD COLUMN IF NOT EXISTS spend_cap double precision,
      ADD COLUMN IF NOT EXISTS duplicate_protection boolean DEFAULT true,
      ADD COLUMN IF NOT EXISTS dry_run boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS topic text,
      ADD COLUMN IF NOT EXISTS specialty text,
      ADD COLUMN IF NOT EXISTS framework text,
      ADD COLUMN IF NOT EXISTS current_stage text,
      ADD COLUMN IF NOT EXISTS items_failed integer DEFAULT 0,
      ADD COLUMN IF NOT EXISTS retry_count integer DEFAULT 0,
      ADD COLUMN IF NOT EXISTS max_retries integer DEFAULT 3,
      ADD COLUMN IF NOT EXISTS paused_at timestamptz,
      ADD COLUMN IF NOT EXISTS resumed_at timestamptz
    `);

    await client.query(`
      ALTER TABLE ai_jobs
        ADD COLUMN IF NOT EXISTS tier text,
        ADD COLUMN IF NOT EXISTS content_type text,
        ADD COLUMN IF NOT EXISTS model text DEFAULT 'gpt-4o-mini',
        ADD COLUMN IF NOT EXISTS model_tier text DEFAULT 'cheapest',
        ADD COLUMN IF NOT EXISTS batch_size integer DEFAULT 25,
        ADD COLUMN IF NOT EXISTS spend_cap double precision,
        ADD COLUMN IF NOT EXISTS duplicate_protection boolean DEFAULT true,
        ADD COLUMN IF NOT EXISTS dry_run boolean DEFAULT false,
        ADD COLUMN IF NOT EXISTS topic text,
        ADD COLUMN IF NOT EXISTS specialty text,
        ADD COLUMN IF NOT EXISTS framework text,
        ADD COLUMN IF NOT EXISTS current_stage text,
        ADD COLUMN IF NOT EXISTS items_failed integer DEFAULT 0,
        ADD COLUMN IF NOT EXISTS retry_count integer DEFAULT 0,
        ADD COLUMN IF NOT EXISTS max_retries integer DEFAULT 3,
        ADD COLUMN IF NOT EXISTS paused_at timestamptz,
        ADD COLUMN IF NOT EXISTS resumed_at timestamptz
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS ai_spend_tracking (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        job_id varchar,
        date_key text NOT NULL,
        week_key text NOT NULL,
        token_count integer DEFAULT 0,
        estimated_cost_usd double precision DEFAULT 0,
        created_at timestamptz NOT NULL DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS system_settings (
        key text PRIMARY KEY,
        value jsonb DEFAULT '{}'::jsonb,
        updated_at timestamptz NOT NULL DEFAULT NOW(),
        updated_by text
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS bg_jobs (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        type text NOT NULL,
        engine_key varchar,
        status text NOT NULL DEFAULT 'queued',
        priority integer DEFAULT 0,
        payload jsonb DEFAULT '{}'::jsonb,
        result jsonb DEFAULT '{}'::jsonb,
        error text,
        total_items integer DEFAULT 0,
        completed_items integer DEFAULT 0,
        failed_items integer DEFAULT 0,
        total_batches integer DEFAULT 0,
        completed_batches integer DEFAULT 0,
        failed_batches integer DEFAULT 0,
        batch_size integer DEFAULT 50,
        concurrency_limit integer DEFAULT 3,
        created_by varchar,
        claimed_by varchar,
        heartbeat_at timestamp,
        started_at timestamp,
        completed_at timestamp,
        cancelled_at timestamp,
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bg_jobs_status ON bg_jobs (status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bg_jobs_type ON bg_jobs (type)`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS bg_job_batches (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        job_id varchar NOT NULL,
        batch_index integer NOT NULL DEFAULT 0,
        status text NOT NULL DEFAULT 'queued',
        total_items integer DEFAULT 0,
        completed_items integer DEFAULT 0,
        failed_items integer DEFAULT 0,
        payload jsonb DEFAULT '{}'::jsonb,
        result jsonb DEFAULT '{}'::jsonb,
        error text,
        retry_count integer DEFAULT 0,
        max_retries integer DEFAULT 3,
        claimed_by varchar,
        heartbeat_at timestamp,
        started_at timestamp,
        completed_at timestamp,
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bg_job_batches_job_id ON bg_job_batches (job_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bg_job_batches_status ON bg_job_batches (status)`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS bg_job_items (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        job_id varchar NOT NULL,
        batch_id varchar NOT NULL,
        item_index integer DEFAULT 0,
        status text NOT NULL DEFAULT 'pending',
        content_type text,
        content_payload jsonb DEFAULT '{}'::jsonb,
        error text,
        saved_at timestamp,
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bg_job_items_batch_id ON bg_job_items (batch_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bg_job_items_job_id ON bg_job_items (job_id)`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS bg_job_settings (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        key text NOT NULL UNIQUE,
        value jsonb DEFAULT '{}'::jsonb,
        updated_at timestamp NOT NULL DEFAULT now(),
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS security_audit_logs (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar,
        ip_address text,
        endpoint text NOT NULL,
        event_type text NOT NULL,
        request_count integer DEFAULT 1,
        metadata jsonb DEFAULT '{}'::jsonb,
        created_at timestamp NOT NULL DEFAULT now()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS content_access_counters (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar NOT NULL,
        content_type text NOT NULL,
        access_date text NOT NULL,
        count integer NOT NULL DEFAULT 0,
        UNIQUE (user_id, content_type, access_date)
      )
    `);

    await client.query(`SAVEPOINT before_constraint`);
    try {
      await client.query(`ALTER TABLE content_access_counters ADD CONSTRAINT content_access_counters_user_type_date_unique UNIQUE (user_id, content_type, access_date)`);
      await client.query(`RELEASE SAVEPOINT before_constraint`);
    } catch (e: any) {
      await client.query(`ROLLBACK TO SAVEPOINT before_constraint`);
    }
    await client.query(`CREATE INDEX IF NOT EXISTS idx_security_audit_logs_user ON security_audit_logs (user_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_security_audit_logs_event ON security_audit_logs (event_type)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_security_audit_logs_created ON security_audit_logs (created_at)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_content_access_user_date ON content_access_counters (user_id, access_date)`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS watermark_sessions (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id varchar NOT NULL,
        masked_email text,
        user_id_suffix text,
        ip_address text,
        user_agent text,
        created_at timestamp NOT NULL DEFAULT now(),
        expires_at timestamp
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_watermark_sessions_user ON watermark_sessions (user_id)`);

    await client.query(`ALTER TABLE watermark_sessions ADD COLUMN IF NOT EXISTS masked_email text`);
    await client.query(`ALTER TABLE watermark_sessions ADD COLUMN IF NOT EXISTS user_id_suffix text`);
    await client.query(`ALTER TABLE watermark_sessions ADD COLUMN IF NOT EXISTS ip_address text`);
    await client.query(`ALTER TABLE watermark_sessions ADD COLUMN IF NOT EXISTS user_agent text`);
    await client.query(`ALTER TABLE watermark_sessions ADD COLUMN IF NOT EXISTS expires_at timestamp`);

    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS exam_type text DEFAULT 'practice'`);
    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS cat_state jsonb`);
    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS blueprint_coverage_state jsonb`);
    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS review_unlocked boolean DEFAULT false`);
    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS timer_state jsonb`);
    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS stopping_rule_status text`);
    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS blueprint_code text`);
    await client.query(`ALTER TABLE mock_exam_attempts ADD COLUMN IF NOT EXISTS blueprint_meta jsonb`);

    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS preferred_theme text`);

    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS correct_answer_explanation TEXT DEFAULT ''`);
    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS incorrect_answer_rationale TEXT DEFAULT ''`);
    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS clinical_reasoning TEXT DEFAULT ''`);
    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS key_takeaway TEXT DEFAULT ''`);
    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS mnemonic TEXT DEFAULT ''`);
    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS reference_source TEXT DEFAULT ''`);

    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS quarantined_at TIMESTAMPTZ`);
    await client.query(`ALTER TABLE exam_questions ADD COLUMN IF NOT EXISTS quarantine_reason TEXT`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_questions_quarantine ON exam_questions(quarantined_at) WHERE quarantined_at IS NOT NULL`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS exam_incidents (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR,
        exam_type TEXT NOT NULL DEFAULT 'unknown',
        tier TEXT NOT NULL DEFAULT 'unknown',
        reason_code TEXT NOT NULL,
        reason_detail TEXT,
        endpoint TEXT,
        request_params JSONB,
        severity TEXT NOT NULL DEFAULT 'warning',
        resolved_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_incidents_created ON exam_incidents(created_at)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_incidents_severity ON exam_incidents(severity)`);

    await client.query(`ALTER TABLE exam_incidents ADD COLUMN IF NOT EXISTS profession TEXT`);
    await client.query(`ALTER TABLE exam_incidents ADD COLUMN IF NOT EXISTS language TEXT`);
    await client.query(`ALTER TABLE exam_incidents ADD COLUMN IF NOT EXISTS route TEXT`);
    await client.query(`ALTER TABLE exam_incidents ADD COLUMN IF NOT EXISTS fallback_mode BOOLEAN DEFAULT false`);
    await client.query(`ALTER TABLE exam_incidents ADD COLUMN IF NOT EXISTS question_id TEXT`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS exam_snapshots (
        id SERIAL PRIMARY KEY,
        template_id TEXT NOT NULL,
        version INTEGER NOT NULL,
        questions_payload JSONB NOT NULL,
        metadata_payload JSONB,
        validation_result JSONB,
        is_valid BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(template_id, version)
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_snapshots_template ON exam_snapshots(template_id, version DESC)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_snapshots_valid ON exam_snapshots(template_id, is_valid) WHERE is_valid = true`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS exam_session_state (
        id SERIAL PRIMARY KEY,
        attempt_id VARCHAR NOT NULL UNIQUE,
        user_id VARCHAR NOT NULL,
        answers JSONB DEFAULT '{}'::jsonb,
        flagged JSONB DEFAULT '[]'::jsonb,
        time_spent INTEGER DEFAULT 0,
        current_question INTEGER DEFAULT 0,
        cat_state JSONB,
        timer_state JSONB,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_session_state_user ON exam_session_state(user_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_session_state_attempt ON exam_session_state(attempt_id)`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS exam_backup_payloads (
        id SERIAL PRIMARY KEY,
        template_id TEXT NOT NULL UNIQUE,
        payload JSONB NOT NULL,
        question_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_exam_backup_payloads_template ON exam_backup_payloads(template_id)`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS problem_reports (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        page_url TEXT NOT NULL,
        page_title TEXT,
        site_section TEXT,
        content_id TEXT,
        user_id VARCHAR,
        problem_type TEXT NOT NULL,
        description TEXT NOT NULL,
        email TEXT,
        severity TEXT DEFAULT 'medium',
        contact_permission BOOLEAN DEFAULT false,
        device_type TEXT,
        browser_info TEXT,
        locale TEXT,
        tier TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        admin_notes TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await client.query(`ALTER TABLE pharmtech_questions ADD COLUMN IF NOT EXISTS cert_context text DEFAULT 'PTCB'`);
    await client.query(`ALTER TABLE pharmtech_lessons ADD COLUMN IF NOT EXISTS cert_context text DEFAULT 'BOTH'`);
    await client.query(`ALTER TABLE pharmtech_flashcard_decks ADD COLUMN IF NOT EXISTS cert_context text DEFAULT 'BOTH'`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS question_explanations (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        question_id VARCHAR NOT NULL,
        question_source TEXT NOT NULL,
        correct_answer_explanation TEXT NOT NULL,
        incorrect_answer_rationale JSONB DEFAULT '{}'::jsonb,
        clinical_reasoning TEXT,
        key_takeaway TEXT,
        mnemonic TEXT,
        clinical_pearl TEXT,
        reference_source TEXT,
        quality_score JSONB DEFAULT '{}'::jsonb,
        review_status TEXT NOT NULL DEFAULT 'pending',
        generated_by TEXT NOT NULL DEFAULT 'manual',
        related_content JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE(question_id, question_source)
      )
    `);
    await client.query(`ALTER TABLE question_explanations ADD COLUMN IF NOT EXISTS related_content JSONB DEFAULT '{}'::jsonb`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS tutor_conversations (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        context_type TEXT NOT NULL DEFAULT 'general',
        context_id TEXT,
        language TEXT NOT NULL DEFAULT 'en',
        title TEXT NOT NULL DEFAULT 'AI Tutor Chat',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS tutor_messages (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER NOT NULL REFERENCES tutor_conversations(id) ON DELETE CASCADE,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`CREATE INDEX IF NOT EXISTS idx_tutor_conversations_user_id ON tutor_conversations (user_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tutor_messages_conversation_id ON tutor_messages (conversation_id)`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_finance (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        category text NOT NULL,
        label text NOT NULL,
        amount double precision NOT NULL,
        currency text DEFAULT 'USD',
        notes text,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      )
    `);

    await client.query("COMMIT");
    console.log("[SchemaSync] Ensured all tables and columns exist");

    runCanonicalMigrationIfNeeded(pool).catch((e: any) =>
      console.warn("[SchemaSync] Canonical migration check failed:", e.message)
    );
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error("[SchemaSync] Error:", err.message);
  } finally {
    client.release();
  }

  await ensureProgrammaticPages(pool);
  await ensureNotificationTables(pool);
  await ensureClinicalSeoPages(pool);
}

async function runCanonicalMigrationIfNeeded(pool: pg.Pool): Promise<void> {
  const aliasCount = await pool.query("SELECT COUNT(*)::int AS cnt FROM lesson_aliases").catch(() => ({ rows: [{ cnt: 0 }] }));
  if (aliasCount.rows[0].cnt > 0) {
    console.log("[SchemaSync] lesson_aliases already populated, skipping auto-canonicalization");
    return;
  }

  const contentCount = await pool.query(
    "SELECT COUNT(*)::int AS cnt FROM content_items WHERE type = 'lesson' AND status = 'published'"
  ).catch(() => ({ rows: [{ cnt: 0 }] }));
  if (contentCount.rows[0].cnt === 0) {
    console.log("[SchemaSync] No published lessons to canonicalize");
    return;
  }

  console.log("[SchemaSync] Running one-time canonical title migration...");
  const { canonicalizeTitle, normalizeForAlias } = await import("./title-canonicalizer");

  const lessons = await pool.query(
    "SELECT id, title, slug, tier, region_scope FROM content_items WHERE type = 'lesson' AND merged_into IS NULL ORDER BY status DESC, id"
  );

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const lesson of lessons.rows) {
      if (!lesson.title) continue;
      const result = canonicalizeTitle(lesson.title);

      if (result.wasChanged) {
        await client.query(
          "UPDATE content_items SET title = $1, slug = $2 WHERE id = $3",
          [result.canonicalTitle, result.canonicalSlug, lesson.id]
        );
      }

      const normalized = normalizeForAlias(lesson.title);
      await client.query(
        `INSERT INTO lesson_aliases (lesson_id, alias_text, normalized_alias, canonical_slug)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (normalized_alias, lesson_id) DO NOTHING`,
        [lesson.id, lesson.title, normalized, result.canonicalSlug]
      );

      if (result.wasChanged && lesson.slug !== result.canonicalSlug) {
        const oldNorm = normalizeForAlias(lesson.slug);
        await client.query(
          `INSERT INTO lesson_aliases (lesson_id, alias_text, normalized_alias, canonical_slug)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (normalized_alias, lesson_id) DO NOTHING`,
          [lesson.id, lesson.slug, oldNorm, result.canonicalSlug]
        );
      }
    }

    await client.query("COMMIT");
    console.log(`[SchemaSync] Canonical migration complete: ${lessons.rows.length} lessons processed`);
  } catch (e: any) {
    await client.query("ROLLBACK");
    console.error("[SchemaSync] Canonical migration error:", e.message);
    return;
  } finally {
    client.release();
  }

  await canonicalizeFlashcardReferences(pool);
  await canonicalizeImageCaptions(pool);
}

async function canonicalizeFlashcardReferences(pool: pg.Pool): Promise<void> {
  try {
    const { canonicalizeTitle, normalizeForAlias } = await import("./title-canonicalizer");

    const aliasRows = await pool.query(
      `SELECT la.alias_text, la.normalized_alias, la.canonical_slug, ci.title AS canonical_title
       FROM lesson_aliases la
       LEFT JOIN content_items ci ON ci.slug = la.canonical_slug AND ci.merged_into IS NULL`
    ).catch(() => ({ rows: [] }));

    if (aliasRows.rows.length === 0) return;

    const slugToTitle = new Map<string, string>();
    const aliasToSlug = new Map<string, string>();
    for (const a of aliasRows.rows) {
      aliasToSlug.set(a.normalized_alias, a.canonical_slug);
      aliasToSlug.set(a.alias_text.toLowerCase(), a.canonical_slug);
      if (a.canonical_title) slugToTitle.set(a.canonical_slug, a.canonical_title);
    }

    function resolveTitle(text: string): string | null {
      const norm = normalizeForAlias(text);
      const slug = aliasToSlug.get(norm) || aliasToSlug.get(text.toLowerCase());
      return slug ? (slugToTitle.get(slug) || null) : null;
    }

    const flashcards = await pool.query(
      `SELECT id, topic, topic_tag, lesson_links FROM flashcard_bank`
    );

    let updated = 0;
    for (const fc of flashcards.rows) {
      const updates: Record<string, any> = {};

      if (fc.topic) {
        const resolved = resolveTitle(fc.topic);
        if (resolved && resolved !== fc.topic) {
          updates.topic = resolved;
        } else {
          const canon = canonicalizeTitle(fc.topic);
          if (canon.wasChanged) updates.topic = canon.canonicalTitle;
        }
      }

      if (fc.topic_tag) {
        const resolved = resolveTitle(fc.topic_tag);
        if (resolved && resolved !== fc.topic_tag) {
          updates.topic_tag = resolved;
        } else {
          const canon = canonicalizeTitle(fc.topic_tag);
          if (canon.wasChanged) updates.topic_tag = canon.canonicalTitle;
        }
      }

      if (fc.lesson_links) {
        try {
          const links = typeof fc.lesson_links === "string" ? JSON.parse(fc.lesson_links) : fc.lesson_links;
          if (Array.isArray(links)) {
            let changed = false;
            const cleaned = links.map((link: any) => {
              if (typeof link === "string") {
                const resolved = resolveTitle(link);
                if (resolved && resolved !== link) { changed = true; return resolved; }
                return link;
              }
              const titleKey = link?.lessonTitle != null ? "lessonTitle" : (link?.title != null ? "title" : null);
              const urlKey = link?.lessonUrl != null ? "lessonUrl" : (link?.slug != null ? "slug" : null);
              if (link && titleKey && typeof link[titleKey] === "string") {
                const resolved = resolveTitle(link[titleKey]);
                const newTitle = resolved || canonicalizeTitle(link[titleKey]).canonicalTitle;
                if (newTitle !== link[titleKey]) {
                  changed = true;
                  const u = { ...link, [titleKey]: newTitle };
                  if (urlKey) {
                    const slugPart = (link[urlKey] || "").replace(/^\/lessons\//, "");
                    const canonSlug = aliasToSlug.get(normalizeForAlias(slugPart));
                    if (canonSlug) u[urlKey] = urlKey === "lessonUrl" ? `/lessons/${canonSlug}` : canonSlug;
                  }
                  return u;
                }
              }
              return link;
            });
            if (changed) updates.lesson_links = JSON.stringify(cleaned);
          }
        } catch {}
      }

      if (Object.keys(updates).length > 0) {
        const setClauses = Object.keys(updates).map((k, i) => `${k} = $${i + 2}`);
        await pool.query(
          `UPDATE flashcard_bank SET ${setClauses.join(", ")} WHERE id = $1`,
          [fc.id, ...Object.values(updates)]
        );
        updated++;
      }
    }
    if (updated > 0) console.log(`[SchemaSync] Canonicalized ${updated} flashcard references`);
  } catch (e: any) {
    console.warn("[SchemaSync] Flashcard canonicalization error:", e.message);
  }
}

async function ensureProgrammaticPages(pool: pg.Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS programmatic_pages (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      page_type text NOT NULL,
      source_content_id varchar NOT NULL,
      source_content_type text NOT NULL,
      career_track text NOT NULL,
      slug text NOT NULL UNIQUE,
      title text NOT NULL,
      meta_title text,
      meta_description text,
      content_sections jsonb DEFAULT '[]'::jsonb,
      faq_json jsonb DEFAULT '[]'::jsonb,
      related_content_links jsonb DEFAULT '[]'::jsonb,
      sibling_links jsonb DEFAULT '[]'::jsonb,
      status text NOT NULL DEFAULT 'published',
      gating_level text NOT NULL DEFAULT 'public',
      created_at timestamptz DEFAULT NOW() NOT NULL,
      updated_at timestamptz DEFAULT NOW() NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      key text PRIMARY KEY,
      value text NOT NULL,
      updated_at timestamptz DEFAULT NOW() NOT NULL
    )
  `);
}

async function canonicalizeImageCaptions(pool: pg.Pool): Promise<void> {
  try {
    const tierPattern = /\b(RN|NP|RPN|LVN|NCLEX)\s+/gi;
    const images = await pool.query(
      `SELECT id, caption FROM lesson_images WHERE caption IS NOT NULL AND caption != ''`
    ).catch(() => ({ rows: [] }));

    let updated = 0;
    for (const img of images.rows) {
      const cleaned = img.caption.replace(tierPattern, "").trim();
      if (cleaned !== img.caption) {
        await pool.query(`UPDATE lesson_images SET caption = $1 WHERE id = $2`, [cleaned, img.id]);
        updated++;
      }
    }
    if (updated > 0) console.log(`[SchemaSync] Cleaned ${updated} image captions`);
  } catch (e: any) {
    console.warn("[SchemaSync] Image caption cleanup error:", e.message);
  }
}

async function ensureNotificationTables(pool: pg.Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notification_log (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type text NOT NULL,
      channel text NOT NULL,
      recipient text NOT NULL,
      subject text,
      body text,
      status text NOT NULL DEFAULT 'pending',
      error_message text,
      stripe_event_id text,
      metadata jsonb DEFAULT '{}'::jsonb,
      created_at timestamptz DEFAULT NOW() NOT NULL
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_notification_log_event_type ON notification_log(event_type)
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_notification_log_created_at ON notification_log(created_at)
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_notification_log_stripe_event ON notification_log(stripe_event_id)
  `);
}

async function ensureClinicalSeoPages(pool: pg.Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clinical_seo_pages (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      page_type text NOT NULL,
      slug text NOT NULL UNIQUE,
      title text NOT NULL,
      meta_title text,
      meta_description text,
      canonical_url text,
      body_system text,
      category text,
      summary text,
      data jsonb DEFAULT '{}'::jsonb,
      practice_questions jsonb DEFAULT '[]'::jsonb,
      "references" jsonb DEFAULT '[]'::jsonb,
      related_slugs text[] DEFAULT '{}'::text[],
      seo_keywords text[] DEFAULT '{}'::text[],
      status text DEFAULT 'draft',
      published_at timestamptz,
      last_reviewed_at timestamptz,
      created_at timestamptz DEFAULT NOW() NOT NULL,
      updated_at timestamptz DEFAULT NOW() NOT NULL
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_clinical_seo_pages_type ON clinical_seo_pages(page_type)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_clinical_seo_pages_status ON clinical_seo_pages(status)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_clinical_seo_pages_body_system ON clinical_seo_pages(body_system)`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS entitlement_cache (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id varchar NOT NULL,
      product_type text NOT NULL,
      product_id text,
      has_access boolean NOT NULL,
      access_source text NOT NULL,
      plan_id text,
      tier text,
      expires_at timestamp,
      decision_reason text,
      verified_at timestamp NOT NULL DEFAULT NOW(),
      created_at timestamp NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_entitlement_cache_user_product ON entitlement_cache(user_id, product_type, product_id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_entitlement_cache_verified ON entitlement_cache(verified_at)`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS entitlement_decisions (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id varchar NOT NULL,
      product_type text NOT NULL,
      product_id text,
      has_access boolean NOT NULL,
      access_source text NOT NULL,
      provisional boolean DEFAULT false,
      decision_reason text,
      request_path text,
      created_at timestamp NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_entitlement_decisions_user ON entitlement_decisions(user_id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_entitlement_decisions_provisional ON entitlement_decisions(provisional) WHERE provisional = true`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS production_incidents (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      incident_id text NOT NULL UNIQUE,
      category text NOT NULL,
      severity text NOT NULL,
      error_signature text NOT NULL,
      title text NOT NULL,
      message text NOT NULL,
      first_occurrence timestamp NOT NULL DEFAULT NOW(),
      last_occurrence timestamp NOT NULL DEFAULT NOW(),
      affected_user_ids jsonb DEFAULT '[]',
      affected_user_count integer DEFAULT 0,
      occurrence_count integer DEFAULT 1,
      status text NOT NULL DEFAULT 'active',
      resolution_notes text,
      resolved_at timestamp,
      resolved_by text,
      acknowledged_at timestamp,
      acknowledged_by text,
      metadata jsonb DEFAULT '{}',
      created_at timestamp NOT NULL DEFAULT NOW()
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_production_incidents_status ON production_incidents(status)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_production_incidents_severity ON production_incidents(severity)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_production_incidents_category ON production_incidents(category)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_production_incidents_last_occurrence ON production_incidents(last_occurrence DESC)`);

  const snapshotsExists = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'content_snapshots')`);
  if (snapshotsExists.rows[0].exists) {
    await pool.query(`ALTER TABLE content_snapshots ADD COLUMN IF NOT EXISTS content_type text DEFAULT 'content_item'`);
    await pool.query(`ALTER TABLE content_snapshots ADD COLUMN IF NOT EXISTS verified_payload jsonb`);
    await pool.query(`ALTER TABLE content_snapshots ADD COLUMN IF NOT EXISTS backup_payload jsonb`);
    await pool.query(`ALTER TABLE content_snapshots ADD COLUMN IF NOT EXISTS static_fallback text`);
    await pool.query(`ALTER TABLE content_snapshots ADD COLUMN IF NOT EXISTS is_last_known_good boolean DEFAULT false`);
    await pool.query(`ALTER TABLE content_snapshots ADD COLUMN IF NOT EXISTS validated_at timestamptz`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_content_snapshots_lkg ON content_snapshots(content_id, is_last_known_good) WHERE is_last_known_good = true`);
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS content_validation_results (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      content_id varchar NOT NULL,
      content_type text NOT NULL,
      version integer DEFAULT 1,
      valid boolean NOT NULL,
      errors jsonb DEFAULT '[]'::jsonb,
      warnings jsonb DEFAULT '[]'::jsonb,
      validator_results jsonb,
      triggered_by text DEFAULT 'publish',
      actor_id varchar,
      created_at timestamptz DEFAULT NOW() NOT NULL
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_content_validation_results_content ON content_validation_results(content_id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_content_validation_results_valid ON content_validation_results(valid)`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS content_quarantine (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      content_id varchar NOT NULL,
      content_type text NOT NULL,
      reason text NOT NULL,
      detected_by text DEFAULT 'validation',
      previous_status text,
      previous_version integer,
      affected_users_estimate integer DEFAULT 0,
      fallback_content_id varchar,
      resolved_at timestamptz,
      resolved_by varchar,
      resolution_action text,
      created_at timestamptz DEFAULT NOW() NOT NULL
    )
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_content_quarantine_content ON content_quarantine(content_id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_content_quarantine_active ON content_quarantine(resolved_at) WHERE resolved_at IS NULL`);
}
