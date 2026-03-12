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

    await client.query("COMMIT");
    console.log("[SchemaSync] Ensured all tables and columns exist");
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error("[SchemaSync] Error:", err.message);
  } finally {
    client.release();
  }
}
