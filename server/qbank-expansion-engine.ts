import crypto from "crypto";
import { pool } from "./storage";
import { getProdPool, hasSeparateProdDb } from "./db";
import OpenAI from "openai";

const EXPANSION_DOMAINS = [
  "Foundations", "Health Assessment", "Pharmacology", "Cardiovascular",
  "Respiratory", "Neurology", "GI", "Endocrine", "Renal",
  "Hematology/Oncology", "Immunology", "Maternal/OB", "Pediatrics",
  "Mental Health", "Emergency/Critical Care", "Ethics",
] as const;

const BATCH_SIZE = 50;

const DIFFICULTY_DISTRIBUTION = { easy: 0.35, moderate: 0.45, hard: 0.20 };

const DIFFICULTY_MAP: Record<string, number> = { easy: 1, moderate: 3, hard: 5 };

const MASTERY_MAP: Record<string, string> = {
  easy: "low_mastery",
  moderate: "moderate_mastery",
  hard: "high_mastery",
};

const TIER_TARGETS: Record<string, number> = { rpn: 1000, rn: 1500, np: 1200 };

const TIER_EXAM_MAP: Record<string, string> = {
  rpn: "RPN-CAT",
  rn: "RN-CAT",
  np: "NP-CAT",
};

const TIER_SCOPE: Record<string, string> = {
  rpn: `You are a senior REx-PN / Canadian Practical Nurse Registration Exam item writer.
Use Canadian terminology, SI units (mmol/L, umol/L, Celsius, kg). RPN scope: monitor, report, administer as ordered, basic assessments.
RPNs do NOT independently prescribe, diagnose, or initiate treatment plans.
Questions test clinical judgment at the application/analysis level. Focus on patient safety, priority setting, delegation within RPN scope.`,

  rn: `You are a senior NCLEX-RN / Canadian RN Registration Exam item writer.
RN scope: protocol-based interventions, complex assessments, delegation, care coordination, patient education, critical thinking.
Questions test clinical judgment at the application/analysis level with emphasis on prioritization, delegation, and complex patient scenarios.`,

  np: `You are a senior Nurse Practitioner certification exam item writer.
NP scope: order, prescribe, diagnose, advanced practice. NPs independently manage patient care, interpret diagnostics, prescribe pharmacotherapy.
Questions test advanced clinical reasoning at the synthesis/evaluation level with emphasis on differential diagnosis, prescribing decisions, and evidence-based management.`,
};

interface ExpansionProgress {
  tier: string;
  batchNumber: number;
  questionsGenerated: number;
  flashcardsCreated: number;
  imagesAttached: number;
  lessonLinksAdded: number;
  duplicatesRejected: number;
}

interface ExpansionSummary {
  tier: string;
  targetCount: number;
  totalQuestionsInserted: number;
  totalFlashcardsCreated: number;
  totalImagesAttached: number;
  totalLessonLinksAdded: number;
  totalDuplicatesRejected: number;
  domainDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  startedAt: string;
  completedAt: string;
  batches: ExpansionProgress[];
}

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

function computeStemHash(stem: string): string {
  return crypto.createHash("md5").update(stem.toLowerCase().trim()).digest("hex");
}

function computeContentHash(stem: string, tier: string): string {
  return crypto.createHash("sha256").update(`expansion:${tier}:${stem}`).digest("hex").slice(0, 32);
}

function distributeDomains(totalCount: number): Record<string, number> {
  const perDomain = Math.floor(totalCount / EXPANSION_DOMAINS.length);
  const remainder = totalCount % EXPANSION_DOMAINS.length;
  const dist: Record<string, number> = {};
  EXPANSION_DOMAINS.forEach((d, i) => {
    dist[d] = perDomain + (i < remainder ? 1 : 0);
  });
  return dist;
}

function assignDifficulty(batchIndex: number, totalInBatch: number): string {
  const easyCount = Math.round(totalInBatch * DIFFICULTY_DISTRIBUTION.easy);
  const modCount = Math.round(totalInBatch * DIFFICULTY_DISTRIBUTION.moderate);
  if (batchIndex < easyCount) return "easy";
  if (batchIndex < easyCount + modCount) return "moderate";
  return "hard";
}

function buildExpansionPrompt(
  tier: string,
  domain: string,
  count: number,
  difficulties: string[],
  existingStems: string[],
): { system: string; user: string } {
  const scope = TIER_SCOPE[tier] || TIER_SCOPE.rpn;

  const diffCounts: Record<string, number> = {};
  for (const d of difficulties) diffCounts[d] = (diffCounts[d] || 0) + 1;

  const diffBlock = Object.entries(diffCounts)
    .map(([d, c]) => `- ${d}: ${c} questions`)
    .join("\n");

  const antiDupe = existingStems.length > 0
    ? `\nAvoid duplicating these recent stems:\n${existingStems.slice(-15).map((s, i) => `${i + 1}. ${s.substring(0, 80)}...`).join("\n")}`
    : "";

  const system = `${scope}

CRITICAL RULES:
1. Output ONLY valid JSON. No markdown, no code fences, no prose.
2. NEVER copy or reference instructions in any output field.
3. Every question must have a unique, distinct clinical scenario.
4. Do NOT use any emoji characters. Plain text only.
5. Each question's rationale must include:
   - Why the correct answer is right
   - Why each distractor is wrong
   - A clinical application note
   - A nursing intervention note
6. Include a clinical pearl for each question.

You will generate exactly ${count} questions for the ${domain} domain.

Difficulty distribution:
${diffBlock}

Return JSON: {"items": [...]} with exactly ${count} question objects.

Each question object schema:
{
  "stem": "A detailed clinical scenario question (min 50 chars)",
  "scenario": "Extended clinical context",
  "options": [{"label": "A", "text": "..."}, {"label": "B", "text": "..."}, {"label": "C", "text": "..."}, {"label": "D", "text": "..."}],
  "correct_answer": "B",
  "difficulty": "easy" | "moderate" | "hard",
  "domain": "${domain}",
  "rationale": "Detailed rationale: why correct + why each wrong + clinical application + nursing intervention",
  "clinical_pearl": "A concise clinical pearl for exam prep",
  "topic": "Specific topic within ${domain}",
  "body_system": "Related body system"
}

MCQ rules: exactly 4 choices (A-D), exactly 1 correct answer letter.
${antiDupe}

Return EXACTLY ${count} items. JSON only. No extra text.`;

  const user = `Generate ${count} unique ${tier.toUpperCase()} nursing exam questions for the ${domain} domain. Each must have a distinct clinical scenario with specific patient data.`;

  return { system, user };
}

const IMAGE_KEYWORD_MAP: Record<string, { file: string; alt: string; caption: string; description: string }[]> = {
  "cardiac tamponade": [{ file: "cardiactamponade", alt: "Cardiac tamponade illustration", caption: "Cardiac Tamponade", description: "Beck's triad: hypotension, muffled heart sounds, JVD" }],
  "diabetes": [{ file: "diabetes", alt: "Diabetes management infographic", caption: "Diabetes Overview", description: "Key concepts in diabetes management and monitoring" }],
  "abg": [{ file: "ABGreference", alt: "ABG reference chart", caption: "ABG Interpretation", description: "Arterial blood gas interpretation guide" }],
  "arterial blood gas": [{ file: "ABGreference", alt: "ABG reference chart", caption: "ABG Interpretation", description: "Arterial blood gas interpretation guide" }],
  "acid-base": [{ file: "ABGreference", alt: "ABG reference chart", caption: "ABG Interpretation", description: "Arterial blood gas interpretation guide" }],
  "heart failure": [{ file: "heartfailure", alt: "Heart failure illustration", caption: "Heart Failure", description: "HF pathophysiology, left vs right-sided, treatment" }],
  "pyloric stenosis": [{ file: "pyloricstenosis_1773375303320.png", alt: "Pyloric stenosis illustration", caption: "Pyloric Stenosis", description: "Non-bilious projectile vomiting, olive-shaped mass" }],
  "renal calculi": [{ file: "renalcalculus_1773375303320.png", alt: "Renal calculus illustration", caption: "Renal Calculi", description: "Kidney stones: types, symptoms, and management" }],
  "kidney stone": [{ file: "renalcalculus_1773375303320.png", alt: "Renal calculus illustration", caption: "Renal Calculi", description: "Kidney stones: types, symptoms, and management" }],
  "preeclampsia": [{ file: "preeclampsia", alt: "Preeclampsia illustration", caption: "Preeclampsia", description: "Hypertensive disorder of pregnancy" }],
  "placental abruption": [{ file: "placentalabruption_1773375118294", alt: "Placental abruption illustration", caption: "Placental Abruption", description: "Premature placental separation" }],
  "postpartum hemorrhage": [{ file: "postpartumhemorrhage", alt: "Postpartum hemorrhage illustration", caption: "Postpartum Hemorrhage", description: "PPH: uterine atony, 4 T's, fundal massage" }],
  "cushing": [{ file: "cushing.png", alt: "Cushing syndrome illustration", caption: "Cushing Syndrome", description: "Cortisol excess: moon face, buffalo hump" }],
  "addison": [{ file: "addisons", alt: "Addison's disease illustration", caption: "Addison's Disease", description: "Adrenal insufficiency: hypotension, hyperpigmentation" }],
  "multiple sclerosis": [{ file: "MS", alt: "Multiple sclerosis illustration", caption: "Multiple Sclerosis", description: "Autoimmune demyelinating disease" }],
  "myasthenia gravis": [{ file: "myastheniagravis", alt: "Myasthenia gravis illustration", caption: "Myasthenia Gravis", description: "Autoimmune neuromuscular junction disorder" }],
  "seizure": [{ file: "seizure", alt: "Seizure illustration", caption: "Seizure Management", description: "Seizure types, medications, nursing care" }],
  "stroke": [{ file: "stroke", alt: "Stroke illustration", caption: "Stroke", description: "Ischemic vs hemorrhagic stroke" }],
  "pneumonia": [{ file: "pneumonia", alt: "Pneumonia illustration", caption: "Pneumonia", description: "Lung infection: types, assessment, treatment" }],
  "copd": [{ file: "copd", alt: "COPD illustration", caption: "COPD", description: "Chronic obstructive pulmonary disease management" }],
  "asthma": [{ file: "asthma", alt: "Asthma illustration", caption: "Asthma", description: "Airway inflammation and bronchospasm" }],
  "pancreatitis": [{ file: "pancreatitis", alt: "Pancreatitis illustration", caption: "Pancreatitis", description: "Pancreatic inflammation: Cullen's, Grey Turner's" }],
  "hepatitis": [{ file: "hepatitisb", alt: "Hepatitis illustration", caption: "Hepatitis", description: "Viral hepatitis: transmission and management" }],
  "sickle cell": [{ file: "sicklecell", alt: "Sickle cell illustration", caption: "Sickle Cell Disease", description: "Sickle cell crisis prevention and management" }],
  "anemia": [{ file: "anemia", alt: "Anemia illustration", caption: "Anemia", description: "Types of anemia and nursing management" }],
  "compartment syndrome": [{ file: "compartmentsyndrome.png", alt: "Compartment syndrome illustration", caption: "Compartment Syndrome", description: "5 P's, fasciotomy, neurovascular assessment" }],
  "fracture": [{ file: "fracture", alt: "Fracture illustration", caption: "Fracture", description: "Types, assessment, and management" }],
  "burns": [{ file: "burns", alt: "Burns illustration", caption: "Burns", description: "Burn classification and nursing management" }],
  "opioid overdose": [{ file: "opioid", alt: "Opioid overdose illustration", caption: "Opioid Overdose", description: "Respiratory depression, naloxone reversal" }],
  "schizophrenia": [{ file: "schizophrenia", alt: "Schizophrenia illustration", caption: "Schizophrenia", description: "Positive and negative symptoms, antipsychotics" }],
  "depression": [{ file: "depression", alt: "Depression illustration", caption: "Depression", description: "Major depressive disorder assessment and treatment" }],
  "bipolar": [{ file: "bipolar", alt: "Bipolar disorder illustration", caption: "Bipolar Disorder", description: "Mania, depression, lithium monitoring" }],
  "gestational diabetes": [{ file: "gestationaldiabetes", alt: "Gestational diabetes illustration", caption: "Gestational Diabetes", description: "Glucose intolerance in pregnancy" }],
  "fetal monitoring": [{ file: "fetalmonitoring", alt: "Fetal monitoring illustration", caption: "Fetal Monitoring", description: "EFM categories, decelerations, interventions" }],
  "osteoporosis": [{ file: "osteoporosis", alt: "Osteoporosis illustration", caption: "Osteoporosis", description: "Bone density loss, bisphosphonates" }],
  "hypothyroidism": [{ file: "hypothyroidism_1773374939606", alt: "Hypothyroidism illustration", caption: "Hypothyroidism", description: "Decreased thyroid hormone, weight gain, fatigue" }],
  "hyperthyroidism": [{ file: "hyperthyroidism", alt: "Hyperthyroidism illustration", caption: "Hyperthyroidism", description: "Thyroid storm, weight loss, tachycardia" }],
  "dvt": [{ file: "dvt", alt: "DVT illustration", caption: "Deep Vein Thrombosis", description: "Venous thromboembolism prevention and treatment" }],
  "pulmonary embolism": [{ file: "pe", alt: "Pulmonary embolism illustration", caption: "Pulmonary Embolism", description: "PE signs, treatment, prevention" }],
};

const LESSON_TOPIC_MAP: Record<string, { title: string; slug: string }> = {
  "heart failure": { title: "Heart Failure Management", slug: "heart-failure" },
  "diabetes": { title: "Diabetes Management", slug: "diabetes-management" },
  "shock": { title: "Types of Shock", slug: "shock-management" },
  "electrolyte": { title: "Electrolyte Imbalances", slug: "electrolyte-imbalances" },
  "preeclampsia": { title: "Preeclampsia & Eclampsia", slug: "preeclampsia" },
  "seizure": { title: "Seizure Management", slug: "seizure-disorders" },
  "stroke": { title: "Stroke Assessment", slug: "stroke" },
  "pneumonia": { title: "Pneumonia", slug: "pneumonia" },
  "copd": { title: "COPD Management", slug: "copd" },
  "asthma": { title: "Asthma Management", slug: "asthma" },
  "cardiac tamponade": { title: "Cardiac Tamponade", slug: "cardiac-tamponade" },
  "hypertension": { title: "Hypertension", slug: "hypertension" },
  "anemia": { title: "Anemia", slug: "anemia" },
  "sickle cell": { title: "Sickle Cell Disease", slug: "sickle-cell-crisis" },
  "pancreatitis": { title: "Pancreatitis", slug: "pancreatitis" },
  "hepatitis": { title: "Hepatitis", slug: "hepatitis" },
  "burns": { title: "Burns", slug: "burns" },
  "wound": { title: "Wound Care", slug: "wound-care" },
  "fracture": { title: "Fracture Management", slug: "fractures" },
  "infection control": { title: "Infection Control", slug: "infection-control" },
  "medication": { title: "Pharmacology Review", slug: "pharmacology" },
  "depression": { title: "Depression", slug: "depression" },
  "anxiety": { title: "Anxiety Disorders", slug: "anxiety" },
  "schizophrenia": { title: "Schizophrenia", slug: "schizophrenia" },
  "bipolar": { title: "Bipolar Disorder", slug: "bipolar" },
  "labor": { title: "Stages of Labor", slug: "stages-of-labor" },
  "postpartum": { title: "Postpartum Care", slug: "postpartum" },
  "pediatric": { title: "Pediatric Nursing", slug: "pediatrics" },
  "neonatal": { title: "Neonatal Care", slug: "neonatal" },
  "renal": { title: "Renal Disorders", slug: "renal" },
  "dialysis": { title: "Dialysis", slug: "dialysis" },
  "thyroid": { title: "Thyroid Disorders", slug: "thyroid" },
  "addison": { title: "Addison's Disease", slug: "addisons" },
  "cushing": { title: "Cushing Syndrome", slug: "cushings" },
  "dvt": { title: "Deep Vein Thrombosis", slug: "dvt" },
  "pulmonary embolism": { title: "Pulmonary Embolism", slug: "pulmonary-embolism" },
  "compartment syndrome": { title: "Compartment Syndrome", slug: "compartment-syndrome" },
  "delegation": { title: "Delegation", slug: "delegation" },
  "prioritization": { title: "Prioritization", slug: "prioritization" },
  "informed consent": { title: "Informed Consent", slug: "informed-consent" },
  "restraint": { title: "Restraint Use", slug: "restraints" },
  "ethics": { title: "Nursing Ethics", slug: "ethics" },
};

function matchImagesForQuestion(stem: string, rationale: string, topic: string, domain: string): { imageUrl: string; imageAlt: string; imageCaption: string; imageDescription: string }[] {
  const searchText = `${stem} ${rationale} ${topic} ${domain}`.toLowerCase();
  const matches: { imageUrl: string; imageAlt: string; imageCaption: string; imageDescription: string }[] = [];

  for (const [keyword, images] of Object.entries(IMAGE_KEYWORD_MAP)) {
    if (searchText.includes(keyword)) {
      for (const img of images) {
        if (!matches.find(m => m.imageUrl.includes(img.file))) {
          matches.push({
            imageUrl: `/attached_assets/${img.file}`,
            imageAlt: img.alt,
            imageCaption: img.caption,
            imageDescription: img.description,
          });
        }
      }
    }
  }

  return matches.slice(0, 3);
}

function findLessonLink(stem: string, rationale: string, topic: string, tier: string): { title: string; url: string } | null {
  const searchText = `${stem} ${rationale} ${topic}`.toLowerCase();

  for (const [keyword, lesson] of Object.entries(LESSON_TOPIC_MAP)) {
    if (searchText.includes(keyword)) {
      return {
        title: lesson.title,
        url: `/lessons/${lesson.slug}-${tier}`,
      };
    }
  }

  return null;
}

function appendLessonLinkToRationale(rationale: string, lessonLink: { title: string; url: string } | null): string {
  if (!lessonLink) return rationale;
  return `${rationale}\n\nTo review this concept, see the NurseNest lesson: ${lessonLink.title} → ${lessonLink.url}`;
}

function buildFlashcardBack(
  correctAnswer: string,
  options: { label: string; text: string }[],
  rationale: string,
  clinicalPearl: string,
  lessonLink: { title: string; url: string } | null,
): string {
  const parts: string[] = [];
  const correctOpt = options.find(o => o.label === correctAnswer);
  if (correctOpt) {
    parts.push(`Correct Answer: ${correctOpt.label}. ${correctOpt.text}`);
  }
  parts.push(`\nRationale: ${rationale}`);
  if (clinicalPearl) {
    parts.push(`\nClinical Pearl: ${clinicalPearl}`);
  }
  if (lessonLink) {
    parts.push(`\nTo review this concept, see the NurseNest lesson: ${lessonLink.title} → ${lessonLink.url}`);
  }
  return parts.join("\n");
}

async function getExistingStemHashes(dbPool: any): Promise<Set<string>> {
  const { rows } = await dbPool.query(
    `SELECT stem_hash FROM exam_questions WHERE stem_hash IS NOT NULL`
  );
  return new Set(rows.map((r: any) => r.stem_hash));
}

async function generateBatch(
  openai: OpenAI,
  tier: string,
  domain: string,
  count: number,
  existingStems: string[],
  maxRetries: number = 2,
): Promise<any[]> {
  const difficulties: string[] = [];
  for (let i = 0; i < count; i++) {
    difficulties.push(assignDifficulty(i, count));
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const { system, user } = buildExpansionPrompt(tier, domain, count, difficulties, existingStems);

      const resp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.4,
        max_tokens: Math.min(count * 700 + 500, 16384),
        response_format: { type: "json_object" },
      });

      const content = resp.choices[0]?.message?.content || "{}";
      let cleaned = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(cleaned);
      const items = Array.isArray(parsed.items) ? parsed.items
        : Array.isArray(parsed.questions) ? parsed.questions
        : Array.isArray(parsed) ? parsed : [];

      if (items.length > 0) return items;

      console.log(`[Expansion] Attempt ${attempt + 1}: 0 items parsed for ${domain}, retrying...`);
    } catch (err: any) {
      console.error(`[Expansion] Attempt ${attempt + 1} failed for ${domain}:`, err.message);
    }

    if (attempt < maxRetries) await new Promise(r => setTimeout(r, 1500));
  }

  return [];
}

function validateQuestion(q: any): boolean {
  if (!q.stem || typeof q.stem !== "string" || q.stem.length < 40) return false;
  if (!Array.isArray(q.options) || q.options.length < 4) return false;
  if (!q.correct_answer) return false;
  if (!q.rationale || typeof q.rationale !== "string" || q.rationale.length < 20) return false;
  return true;
}

export async function runExpansionForTier(
  tier: string,
  targetCount?: number,
  onProgress?: (p: ExpansionProgress) => void,
): Promise<ExpansionSummary> {
  const count = targetCount || TIER_TARGETS[tier] || 1000;
  const dbPool = hasSeparateProdDb() ? getProdPool() : pool;

  console.log(`[Expansion] Starting ${tier.toUpperCase()} expansion: ${count} questions, targeting ${hasSeparateProdDb() ? "PRODUCTION" : "DEVELOPMENT"} database`);

  const openai = getOpenAI();
  const existingHashes = await getExistingStemHashes(dbPool);
  const domainPlan = distributeDomains(count);
  const startedAt = new Date().toISOString();
  const batches: ExpansionProgress[] = [];

  let totalInserted = 0;
  let totalFlashcards = 0;
  let totalImages = 0;
  let totalLessonLinks = 0;
  let totalDuplicates = 0;
  let batchNumber = 0;
  const recentStems: string[] = [];

  const domainCounts: Record<string, number> = {};
  const difficultyCounts: Record<string, number> = {};

  for (const [domain, domainTarget] of Object.entries(domainPlan)) {
    let domainRemaining = domainTarget;

    while (domainRemaining > 0) {
      const thisBatchSize = Math.min(BATCH_SIZE, domainRemaining);
      batchNumber++;

      console.log(`[Expansion] Batch ${batchNumber}: ${thisBatchSize} questions for ${domain} (${tier})`);

      try {
        await dbPool.query(
          `INSERT INTO generation_events (id, generation_id, event_type, payload, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
          [
            `expansion-${tier}`,
            "expansion_batch_start",
            JSON.stringify({ tier, batchNumber, domain, batchSize: thisBatchSize, totalInserted }),
          ]
        );
      } catch (logErr: any) {
        console.error(`[Expansion] Event log error:`, logErr.message);
      }

      const items = await generateBatch(openai, tier, domain, thisBatchSize, recentStems);

      let batchInserted = 0;
      let batchFlashcards = 0;
      let batchImages = 0;
      let batchLessonLinks = 0;
      let batchDuplicates = 0;

      for (const item of items) {
        if (!validateQuestion(item)) continue;

        const stemHash = computeStemHash(item.stem);
        if (existingHashes.has(stemHash)) {
          batchDuplicates++;
          continue;
        }

        const difficulty = item.difficulty || "moderate";
        const difficultyNum = DIFFICULTY_MAP[difficulty] || 3;
        const masteryCategory = MASTERY_MAP[difficulty] || "moderate_mastery";
        const lessonLink = findLessonLink(item.stem, item.rationale, item.topic || "", tier);
        const rationaleWithLink = appendLessonLinkToRationale(item.rationale, lessonLink);
        const images = matchImagesForQuestion(item.stem, item.rationale, item.topic || "", domain);

        const options = Array.isArray(item.options) ? item.options.map((o: any, i: number) => {
          if (typeof o === "string") {
            const match = o.match(/^([A-H])\)\s*(.+)/);
            if (match) return { label: match[1], text: match[2] };
            return { label: String.fromCharCode(65 + i), text: o };
          }
          return { label: o.label || String.fromCharCode(65 + i), text: o.text || String(o) };
        }) : [];

        const correctAnswer = typeof item.correct_answer === "string" ? item.correct_answer : "A";

        const client = await dbPool.connect();
        try {
          await client.query("BEGIN");

          const tagsArray = [domain, masteryCategory, `difficulty_${difficulty}`];

          const { rows: inserted } = await client.query(
            `INSERT INTO exam_questions (
              id, tier, exam, question_type, status, stem, options, correct_answer,
              rationale, difficulty, tags, body_system, topic, region_scope,
              stem_hash, career_type, scenario, clinical_pearl, created_at, updated_at
            ) VALUES (
              gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7,
              $8, $9, $10::text[], $11, $12, $13,
              $14, $15, $16, $17, NOW(), NOW()
            ) ON CONFLICT DO NOTHING RETURNING id`,
            [
              tier,
              TIER_EXAM_MAP[tier] || "CAT",
              "multiple_choice",
              "approved",
              item.stem,
              JSON.stringify(options),
              JSON.stringify([correctAnswer]),
              rationaleWithLink,
              difficultyNum,
              tagsArray,
              item.body_system || domain,
              item.topic || domain,
              "BOTH",
              stemHash,
              "nursing",
              item.scenario || item.stem,
              item.clinical_pearl || "",
            ]
          );

          if (!inserted || inserted.length === 0) {
            await client.query("ROLLBACK");
            batchDuplicates++;
            client.release();
            continue;
          }

          const questionId = inserted[0].id;
          existingHashes.add(stemHash);
          batchInserted++;
          domainCounts[domain] = (domainCounts[domain] || 0) + 1;
          difficultyCounts[difficulty] = (difficultyCounts[difficulty] || 0) + 1;
          recentStems.push(item.stem.substring(0, 100));
          if (recentStems.length > 30) recentStems.splice(0, recentStems.length - 20);

          if (lessonLink) batchLessonLinks++;
          if (images.length > 0) batchImages++;

          const flashcardFront = item.stem;
          const flashcardBack = buildFlashcardBack(
            correctAnswer, options, item.rationale, item.clinical_pearl || "", lessonLink,
          );
          const flashcardHash = computeContentHash(item.stem, tier);

          const lessonLinks = lessonLink ? [{ lessonTitle: lessonLink.title, lessonUrl: lessonLink.url, relevanceNote: `Related to ${domain}` }] : [];

          const { rowCount: fcInserted } = await client.query(
            `INSERT INTO flashcard_bank (
              id, tier, front, back, content_hash, status, source_type, source_question_id,
              question_type, options, correct_answer, rationale_correct,
              clinical_takeaway, exam_pearl, rationale_media, lesson_links,
              difficulty, body_system, topic, region_scope, flashcard_enabled,
              category, career_type, created_at
            ) VALUES (
              gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7,
              $8, $9, $10, $11, $12, $13, $14, $15,
              $16, $17, $18, $19, $20, $21, $22, NOW()
            ) ON CONFLICT (content_hash) DO NOTHING`,
            [
              tier,
              flashcardFront,
              flashcardBack,
              flashcardHash,
              "approved",
              "expansion_engine",
              questionId,
              "multiple_choice",
              JSON.stringify(options),
              JSON.stringify([correctAnswer]),
              item.rationale,
              item.clinical_pearl || null,
              item.clinical_pearl || null,
              JSON.stringify(images),
              JSON.stringify(lessonLinks),
              difficultyNum,
              item.body_system || domain,
              item.topic || domain,
              "BOTH",
              true,
              domain,
              "nursing",
            ]
          );

          await client.query("COMMIT");
          if (fcInserted && fcInserted > 0) batchFlashcards++;
        } catch (err: any) {
          await client.query("ROLLBACK").catch(() => {});
          if (err.code === "23505") {
            batchDuplicates++;
          } else {
            console.error(`[Expansion] Insert error:`, err.message);
          }
        } finally {
          client.release();
        }
      }

      totalInserted += batchInserted;
      totalFlashcards += batchFlashcards;
      totalImages += batchImages;
      totalLessonLinks += batchLessonLinks;
      totalDuplicates += batchDuplicates;
      domainRemaining -= batchInserted > 0 ? batchInserted : thisBatchSize;

      const progress: ExpansionProgress = {
        tier,
        batchNumber,
        questionsGenerated: batchInserted,
        flashcardsCreated: batchFlashcards,
        imagesAttached: batchImages,
        lessonLinksAdded: batchLessonLinks,
        duplicatesRejected: batchDuplicates,
      };
      batches.push(progress);

      if (onProgress) onProgress(progress);

      try {
        await dbPool.query(
          `INSERT INTO generation_events (id, generation_id, event_type, payload, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
          [
            `expansion-${tier}`,
            "expansion_batch_complete",
            JSON.stringify({
              ...progress,
              totalInserted,
              totalFlashcards,
              totalImages,
              totalLessonLinks,
              totalDuplicates,
            }),
          ]
        );
      } catch (logErr: any) {
        console.error(`[Expansion] Event log error:`, logErr.message);
      }

      console.log(`[Expansion] Batch ${batchNumber} complete: ${batchInserted} inserted, ${batchFlashcards} flashcards, ${batchImages} images, ${batchLessonLinks} lessons, ${batchDuplicates} duplicates. Total: ${totalInserted}/${count}`);

      await new Promise(r => setTimeout(r, 500));
    }
  }

  const completedAt = new Date().toISOString();

  const summary: ExpansionSummary = {
    tier,
    targetCount: count,
    totalQuestionsInserted: totalInserted,
    totalFlashcardsCreated: totalFlashcards,
    totalImagesAttached: totalImages,
    totalLessonLinksAdded: totalLessonLinks,
    totalDuplicatesRejected: totalDuplicates,
    domainDistribution: domainCounts,
    difficultyDistribution: difficultyCounts,
    startedAt,
    completedAt,
    batches,
  };

  try {
    await dbPool.query(
      `INSERT INTO generation_events (id, generation_id, event_type, payload, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
      [
        `expansion-${tier}`,
        "expansion_complete",
        JSON.stringify(summary),
      ]
    );
  } catch (logErr: any) {
    console.error(`[Expansion] Event log error:`, logErr.message);
  }

  console.log(`[Expansion] ${tier.toUpperCase()} complete: ${totalInserted}/${count} questions, ${totalFlashcards} flashcards`);
  return summary;
}

export async function runFullExpansion(
  onProgress?: (p: ExpansionProgress) => void,
): Promise<{ rpn: ExpansionSummary; rn: ExpansionSummary; np: ExpansionSummary; grandTotal: any }> {
  console.log(`[Expansion] Starting full 3,700-question expansion across all tiers`);

  const rpnSummary = await runExpansionForTier("rpn", 1000, onProgress);
  const rnSummary = await runExpansionForTier("rn", 1500, onProgress);
  const npSummary = await runExpansionForTier("np", 1200, onProgress);

  const grandTotal = {
    totalQuestions: rpnSummary.totalQuestionsInserted + rnSummary.totalQuestionsInserted + npSummary.totalQuestionsInserted,
    totalFlashcards: rpnSummary.totalFlashcardsCreated + rnSummary.totalFlashcardsCreated + npSummary.totalFlashcardsCreated,
    totalImages: rpnSummary.totalImagesAttached + rnSummary.totalImagesAttached + npSummary.totalImagesAttached,
    totalLessonLinks: rpnSummary.totalLessonLinksAdded + rnSummary.totalLessonLinksAdded + npSummary.totalLessonLinksAdded,
    totalDuplicates: rpnSummary.totalDuplicatesRejected + rnSummary.totalDuplicatesRejected + npSummary.totalDuplicatesRejected,
    target: 3700,
  };

  const dbPool = hasSeparateProdDb() ? getProdPool() : pool;
  try {
    await dbPool.query(
      `INSERT INTO generation_events (id, generation_id, event_type, payload, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
      [
        "expansion-full",
        "full_expansion_complete",
        JSON.stringify({ rpn: rpnSummary, rn: rnSummary, np: npSummary, grandTotal }),
      ]
    );
  } catch (logErr: any) {
    console.error(`[Expansion] Event log error:`, logErr.message);
  }

  return { rpn: rpnSummary, rn: rnSummary, np: npSummary, grandTotal };
}

export async function getExpansionStatus(): Promise<any> {
  const dbPool = hasSeparateProdDb() ? getProdPool() : pool;

  const { rows: events } = await dbPool.query(
    `SELECT event_type, payload, created_at
     FROM generation_events
     WHERE generation_id LIKE 'expansion-%'
     ORDER BY created_at DESC
     LIMIT 50`
  );

  const { rows: questionCounts } = await dbPool.query(
    `SELECT tier, COUNT(*)::int as count
     FROM exam_questions
     WHERE status = 'approved' AND career_type = 'nursing'
     GROUP BY tier`
  );

  const { rows: flashcardCounts } = await dbPool.query(
    `SELECT tier, COUNT(*)::int as count
     FROM flashcard_bank
     WHERE source_type = 'expansion_engine'
     GROUP BY tier`
  );

  return {
    questionsByTier: Object.fromEntries(questionCounts.map((r: any) => [r.tier, r.count])),
    expansionFlashcardsByTier: Object.fromEntries(flashcardCounts.map((r: any) => [r.tier, r.count])),
    recentEvents: events,
  };
}
