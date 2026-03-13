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
