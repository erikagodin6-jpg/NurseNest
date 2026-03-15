import { pool } from "./storage";

export interface RelatedContentItem {
  type: "lesson" | "blog" | "flashcard" | "exam-question" | "clinical-clarity" | "glossary";
  title: string;
  slug: string;
  href: string;
  description: string;
  bodySystem?: string;
  category?: string;
  updatedAt?: string;
}

interface ContentContext {
  slug: string;
  contentType: "lesson" | "blog" | "flashcard-deck" | "exam-prep" | "allied-article" | "new-grad-guide";
  title?: string;
  bodySystem?: string;
  category?: string;
  tags?: string[];
  profession?: string;
  tier?: string;
}

function normalizeForMatching(text: string): string {
  return (text || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function extractKeyTerms(text: string): string[] {
  const normalized = normalizeForMatching(text);
  const stopWords = new Set(["the", "a", "an", "and", "or", "in", "on", "to", "for", "of", "with", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "must", "shall", "can", "need", "dare", "ought", "used", "nursing", "nurse", "patient", "care", "health", "clinical", "guide", "overview", "introduction"]);
  return normalized.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
}

export async function findRelatedContent(
  context: ContentContext,
  limit: number = 8
): Promise<RelatedContentItem[]> {
  const results: RelatedContentItem[] = [];
  const seenSlugs = new Set<string>();
  seenSlugs.add(context.slug);

  const keyTerms = [
    ...extractKeyTerms(context.title || ""),
    ...extractKeyTerms(context.category || ""),
    ...(context.tags || []).map(t => normalizeForMatching(t)).filter(Boolean),
  ];
  if (context.profession) {
    const profTerm = normalizeForMatching(context.profession);
    if (profTerm && !keyTerms.includes(profTerm)) keyTerms.push(profTerm);
  }
  const bodySystem = normalizeForMatching(context.bodySystem || "");

  if (context.contentType !== "lesson") {
    try {
      const lessonResults = await findRelatedLessons(context, bodySystem, keyTerms, seenSlugs, Math.min(3, limit));
      results.push(...lessonResults);
    } catch (e) {
      console.error("Related content: lessons query error:", e);
    }
  }

  if (context.contentType !== "blog") {
    try {
      const blogResults = await findRelatedBlog(context, bodySystem, keyTerms, seenSlugs, Math.min(2, limit));
      results.push(...blogResults);
    } catch (e) {
      console.error("Related content: blog query error:", e);
    }
  }

  if (context.contentType !== "flashcard-deck") {
    try {
      const flashcardResults = await findRelatedFlashcards(context, bodySystem, keyTerms, seenSlugs, Math.min(2, limit));
      results.push(...flashcardResults);
    } catch (e) {
      console.error("Related content: flashcards query error:", e);
    }
  }

  if (context.contentType !== "exam-prep") {
    try {
      const examResults = await findRelatedExamContent(context, bodySystem, keyTerms, seenSlugs, Math.min(2, limit));
      results.push(...examResults);
    } catch (e) {
      console.error("Related content: exam query error:", e);
    }
  }

  try {
    const clarityResults = await findRelatedClinicalClarity(bodySystem, keyTerms, seenSlugs, Math.min(1, limit));
    results.push(...clarityResults);
  } catch (e) {
    console.error("Related content: clinical clarity error:", e);
  }

  return results.slice(0, limit);
}

async function findRelatedLessons(
  context: ContentContext,
  bodySystem: string,
  keyTerms: string[],
  seenSlugs: Set<string>,
  limit: number
): Promise<RelatedContentItem[]> {
  const items: RelatedContentItem[] = [];

  if (bodySystem) {
    try {
      const result = await pool.query(
        `SELECT slug, title, body_system, category, updated_at
         FROM lessons
         WHERE status = 'published'
         AND LOWER(body_system) = $1
         AND slug != $2
         ORDER BY updated_at DESC
         LIMIT $3`,
        [bodySystem, context.slug, limit]
      );
      for (const row of result.rows) {
        if (!seenSlugs.has(row.slug)) {
          seenSlugs.add(row.slug);
          items.push({
            type: "lesson",
            title: row.title,
            slug: row.slug,
            href: `/lessons/${row.slug}`,
            description: `${row.category || row.body_system || "Clinical"} lesson`,
            bodySystem: row.body_system,
            category: row.category,
            updatedAt: row.updated_at,
          });
        }
      }
    } catch (e) {
      console.error("Related content: lesson body-system query error:", e);
    }
  }

  if (items.length < limit && keyTerms.length > 0) {
    try {
      const patterns = keyTerms.slice(0, 5).map(t => `%${t}%`);
      const result = await pool.query(
        `SELECT slug, title, body_system, category, updated_at
         FROM lessons
         WHERE status = 'published'
         AND slug != $1
         AND (LOWER(title) LIKE ANY($2::text[]) OR LOWER(category) LIKE ANY($2::text[]))
         ORDER BY updated_at DESC
         LIMIT $3`,
        [context.slug, patterns, limit - items.length]
      );
      for (const row of result.rows) {
        if (!seenSlugs.has(row.slug)) {
          seenSlugs.add(row.slug);
          items.push({
            type: "lesson",
            title: row.title,
            slug: row.slug,
            href: `/lessons/${row.slug}`,
            description: `${row.category || row.body_system || "Clinical"} lesson`,
            bodySystem: row.body_system,
            category: row.category,
            updatedAt: row.updated_at,
          });
        }
      }
    } catch (e) {
      console.error("Related content: lesson keyword query error:", e);
    }
  }

  return items.slice(0, limit);
}

async function findRelatedBlog(
  context: ContentContext,
  bodySystem: string,
  keyTerms: string[],
  seenSlugs: Set<string>,
  limit: number
): Promise<RelatedContentItem[]> {
  const items: RelatedContentItem[] = [];

  if (keyTerms.length === 0) return items;

  try {
    const patterns = keyTerms.slice(0, 5).map(t => `%${t}%`);
    const result = await pool.query(
      `SELECT slug, title, category, body_system, summary, updated_at
       FROM content_items
       WHERE status = 'published'
       AND type IN ('blog', 'blog-post', 'article')
       AND slug != $1
       AND (LOWER(title) LIKE ANY($2::text[]) OR LOWER(category) LIKE ANY($2::text[]) OR LOWER(body_system) LIKE ANY($2::text[]))
       ORDER BY updated_at DESC
       LIMIT $3`,
      [context.slug, patterns, limit]
    );
    for (const row of result.rows) {
      if (!seenSlugs.has(row.slug)) {
        seenSlugs.add(row.slug);
        items.push({
          type: "blog",
          title: row.title,
          slug: row.slug,
          href: `/learn/${row.slug}`,
          description: row.summary || `${row.category || "Clinical"} article`,
          bodySystem: row.body_system,
          category: row.category,
          updatedAt: row.updated_at,
        });
      }
    }
  } catch (e) {
    console.error("Related content: blog query error:", e);
  }

  return items.slice(0, limit);
}

async function findRelatedFlashcards(
  context: ContentContext,
  bodySystem: string,
  keyTerms: string[],
  seenSlugs: Set<string>,
  limit: number
): Promise<RelatedContentItem[]> {
  const items: RelatedContentItem[] = [];

  if (keyTerms.length === 0) return items;

  try {
    const patterns = keyTerms.slice(0, 5).map(t => `%${t}%`);
    const result = await pool.query(
      `SELECT slug, title, description, updated_at
       FROM flashcard_decks
       WHERE visibility = 'public'
       AND slug IS NOT NULL
       AND slug != $1
       AND LOWER(title) LIKE ANY($2::text[])
       ORDER BY view_count DESC NULLS LAST, updated_at DESC
       LIMIT $3`,
      [context.slug, patterns, limit]
    );
    for (const row of result.rows) {
      if (row.slug && !seenSlugs.has(row.slug)) {
        seenSlugs.add(row.slug);
        items.push({
          type: "flashcard",
          title: row.title,
          slug: row.slug,
          href: `/flashcards/deck/${row.slug}`,
          description: row.description || "Flashcard deck for active recall practice",
          updatedAt: row.updated_at,
        });
      }
    }
  } catch (e) {
    console.error("Related content: flashcard query error:", e);
  }

  return items.slice(0, limit);
}

async function findRelatedExamContent(
  context: ContentContext,
  bodySystem: string,
  keyTerms: string[],
  seenSlugs: Set<string>,
  limit: number
): Promise<RelatedContentItem[]> {
  const items: RelatedContentItem[] = [];
  const tier = context.tier || context.profession || "rn";

  if (bodySystem) {
    try {
      const result = await pool.query(
        `SELECT DISTINCT topic
         FROM exam_questions
         WHERE status = 'published'
         AND LOWER(topic) LIKE $1
         AND tier = $2
         LIMIT $3`,
        [`%${bodySystem}%`, tier, limit]
      );
      for (const row of result.rows) {
        const slug = row.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        if (slug && !seenSlugs.has(`exam-${slug}`)) {
          seenSlugs.add(`exam-${slug}`);
          items.push({
            type: "exam-question",
            title: `${row.topic} Practice Questions`,
            slug: slug,
            href: `/${tier}/questions/${slug}`,
            description: `Practice exam questions on ${row.topic}`,
            bodySystem,
          });
        }
      }
    } catch (e) {
      console.error("Related content: exam question body-system query error:", e);
    }
  }

  if (items.length < limit && keyTerms.length > 0) {
    try {
      const patterns = keyTerms.slice(0, 5).map(t => `%${t}%`);
      const result = await pool.query(
        `SELECT DISTINCT topic
         FROM exam_questions
         WHERE status = 'published'
         AND tier = $1
         AND LOWER(topic) LIKE ANY($2::text[])
         LIMIT $3`,
        [tier, patterns, limit - items.length]
      );
      for (const row of result.rows) {
        const slug = row.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        if (slug && !seenSlugs.has(`exam-${slug}`)) {
          seenSlugs.add(`exam-${slug}`);
          items.push({
            type: "exam-question",
            title: `${row.topic} Practice Questions`,
            slug: slug,
            href: `/${tier}/questions/${slug}`,
            description: `Practice exam questions on ${row.topic}`,
          });
        }
      }
    } catch (e) {
      console.error("Related content: exam question keyword query error:", e);
    }
  }

  return items.slice(0, limit);
}

async function findRelatedClinicalClarity(
  bodySystem: string,
  keyTerms: string[],
  seenSlugs: Set<string>,
  limit: number
): Promise<RelatedContentItem[]> {
  const CLINICAL_CLARITY_TOPICS: Record<string, { title: string; slug: string }[]> = {
    cardiac: [
      { title: "Why Does Hyperkalemia Cause Cardiac Arrest?", slug: "why-does-hyperkalemia-cause-cardiac-arrest" },
      { title: "Why Does Heart Failure Cause Edema?", slug: "why-does-heart-failure-cause-edema" },
      { title: "Why Does Atrial Fibrillation Cause Stroke?", slug: "why-does-atrial-fibrillation-cause-stroke" },
    ],
    respiratory: [
      { title: "Why Does COPD Cause Barrel Chest?", slug: "why-does-copd-cause-barrel-chest" },
      { title: "Why Does Pneumothorax Cause Tracheal Deviation?", slug: "why-does-pneumothorax-cause-tracheal-deviation" },
      { title: "Why Does Hypoxia Cause Restlessness Before Drowsiness?", slug: "why-does-hypoxia-cause-restlessness-before-drowsiness" },
    ],
    renal: [
      { title: "Why Does Acute Kidney Injury Cause Metabolic Acidosis?", slug: "why-does-acute-kidney-injury-cause-metabolic-acidosis" },
      { title: "Why Does Nephrotic Syndrome Cause Edema?", slug: "why-does-nephrotic-syndrome-cause-edema" },
    ],
    endocrine: [
      { title: "Why Does DKA Cause Fruity Breath?", slug: "why-does-dka-cause-fruity-breath" },
      { title: "Why Does Hypothyroidism Cause Weight Gain?", slug: "why-does-hypothyroidism-cause-weight-gain" },
      { title: "Why Does Diabetes Cause Peripheral Neuropathy?", slug: "why-does-diabetes-cause-peripheral-neuropathy" },
    ],
    neurological: [
      { title: "Why Does a Stroke Cause Dysphagia?", slug: "why-does-a-stroke-cause-dysphagia" },
      { title: "Why Does Meningitis Cause Neck Stiffness?", slug: "why-does-meningitis-cause-neck-stiffness" },
      { title: "Why Does Guillain-Barré Cause Ascending Paralysis?", slug: "why-does-guillain-barre-cause-ascending-paralysis" },
    ],
    gastrointestinal: [
      { title: "Why Does Cirrhosis Cause Ascites?", slug: "why-does-cirrhosis-cause-ascites" },
      { title: "Why Does Pancreatitis Cause Hypocalcemia?", slug: "why-does-pancreatitis-cause-hypocalcemia" },
    ],
    pharmacology: [
      { title: "Why Do Opioids Cause Constipation?", slug: "why-do-opioids-cause-constipation" },
    ],
    hematology: [
      { title: "Why Does Anemia Cause Tachycardia?", slug: "why-does-anemia-cause-tachycardia" },
      { title: "Why Does Sickle Cell Crisis Cause Severe Pain?", slug: "why-does-sickle-cell-crisis-cause-severe-pain" },
    ],
    maternal: [
      { title: "Why Does Preeclampsia Cause Seizures?", slug: "why-does-preeclampsia-cause-seizures" },
    ],
    musculoskeletal: [
      { title: "Why Does Rhabdomyolysis Cause Acute Kidney Injury?", slug: "why-does-rhabdomyolysis-cause-acute-kidney-injury" },
    ],
  };

  const items: RelatedContentItem[] = [];
  const matchedTopics: { title: string; slug: string }[] = [];

  for (const [system, topics] of Object.entries(CLINICAL_CLARITY_TOPICS)) {
    if (bodySystem && (bodySystem.includes(system) || system.includes(bodySystem))) {
      matchedTopics.push(...topics);
    } else if (keyTerms.some(t => system.includes(t) || topics.some(topic => topic.slug.includes(t)))) {
      matchedTopics.push(...topics);
    }
  }

  for (const topic of matchedTopics.slice(0, limit)) {
    if (!seenSlugs.has(topic.slug)) {
      seenSlugs.add(topic.slug);
      items.push({
        type: "clinical-clarity",
        title: topic.title,
        slug: topic.slug,
        href: `/clinical-clarity/${topic.slug}`,
        description: "Understand the clinical reasoning behind this phenomenon",
      });
    }
  }

  return items.slice(0, limit);
}
