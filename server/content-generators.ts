import OpenAI from "openai";
import { pool } from "./storage";

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

const NURSING_PAGE_SYSTEM_PROMPT = `You are a senior nursing educator and exam strategist creating high-quality educational content for NurseNest.

Your task is to generate comprehensive nursing study pages that help students prepare for:
- REx-PN
- NCLEX-PN
- NCLEX-RN

PAGE REQUIREMENTS:
- Length: 1500-2500 words
- Audience: nursing students studying for licensing exams
- Tone: educational, clear, exam-focused

STRUCTURE (you MUST include ALL of these sections):
1. Title
2. Introduction
3. Concept Explanation
4. Clinical Assessment
5. Nursing Interventions
6. Tables or charts (use markdown tables)
7. Common Exam Traps
8. Clinical Pearls
9. Practice Questions (minimum 10 multiple-choice questions)
10. Detailed rationales for each answer (explain why correct AND why each wrong answer is wrong)
11. Summary

SEO OUTPUT (include at the very top before the article):
- SEO title (60 chars max)
- Meta description (155 chars max)
- URL slug (lowercase, hyphenated)

VISUAL CONTENT RECOMMENDATION:
At the end, recommend one infographic that illustrates the topic. Examples:
- ECG rhythm chart
- ABG interpretation flowchart
- Electrolyte imbalance chart
Provide a short description for the recommended infographic.

FORMAT your output as valid JSON with these fields:
{
  "seoTitle": "...",
  "metaDescription": "...",
  "slug": "...",
  "title": "...",
  "article": "... (full markdown article with all sections)",
  "practiceQuestions": [
    {
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "A",
      "rationale": "..."
    }
  ],
  "infographicRecommendation": {
    "title": "...",
    "description": "..."
  },
  "wordCount": 0
}`;

const ALLIED_HEALTH_PAGE_SYSTEM_PROMPT = `You are an allied health educator creating educational study resources for NurseNest.

The goal is to create high-quality pages that help students studying for allied health certification exams.

Supported careers:
- Pharmacy Technician (PTCB/ExCPT)
- Respiratory Therapy (RRT/TMC)
- Paramedic / EMS (NREMT)
- Medical Laboratory Technologist (MLT/ASCP)
- Medical Imaging / Radiology (ARRT)

ARTICLE REQUIREMENTS:
- Length: 1500-2200 words
- Audience: allied health students
- Tone: clear, educational, exam-focused

STRUCTURE (you MUST include ALL of these sections):
1. Title
2. Introduction
3. Role Scope and Clinical Settings
4. Core Concepts Explanation
5. Clinical Workflow or Procedure Steps
6. Safety Considerations
7. Common Exam Traps
8. Clinical Pearls
9. Practice Questions (minimum 10 multiple-choice questions)
10. Detailed rationales for each answer (explain why correct AND why each wrong answer is wrong)
11. Summary

SEO OUTPUT (include at the very top before the article):
- SEO title (60 chars max)
- Meta description (155 chars max)
- URL slug (lowercase, hyphenated)

VISUAL CONTENT RECOMMENDATION:
At the end, recommend one infographic that illustrates the topic. Examples:
- Ventilator settings chart
- Dosage calculation formula chart
- Order of draw chart
Provide a short description for the recommended infographic.

FORMAT your output as valid JSON with these fields:
{
  "seoTitle": "...",
  "metaDescription": "...",
  "slug": "...",
  "title": "...",
  "career": "pharmacy_tech | respiratory_therapy | paramedic_ems | mlt | radiology",
  "article": "... (full markdown article with all sections)",
  "practiceQuestions": [
    {
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "A",
      "rationale": "..."
    }
  ],
  "infographicRecommendation": {
    "title": "...",
    "description": "..."
  },
  "wordCount": 0
}`;

const PRACTICE_QUESTION_SYSTEM_PROMPT = `You are a senior nursing exam item writer creating exam-style practice questions aligned with:
- REx-PN
- NCLEX-PN
- NCLEX-RN

QUESTION SET REQUIREMENTS:
- Generate exactly 25 questions for the given topic
- Use multiple formats:
  * Multiple choice (single correct answer)
  * Select all that apply (SATA)
  * Case-based questions (clinical scenario leading to a question)

QUESTION STRUCTURE (for each question):
1. Clinical scenario (brief patient situation)
2. Question stem (clear, unambiguous)
3. Answer choices (4-5 options for MC, 5-6 for SATA)
4. Correct answer(s)

RATIONALE REQUIREMENTS:
- Minimum 300 words per rationale
- Explain why the correct answer is correct
- Explain why each incorrect answer is wrong
- Include relevant nursing concepts, clinical reasoning, and exam strategy tips

FORMAT your output as valid JSON:
{
  "topic": "...",
  "seoTitle": "...",
  "metaDescription": "...",
  "slug": "...",
  "introduction": "... (2-3 paragraph intro to the topic and why it matters for exams)",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice | sata | case_based",
      "scenario": "...",
      "stem": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswers": ["A"],
      "rationale": "... (minimum 300 words)",
      "category": "...",
      "difficulty": 1-5,
      "examRelevance": "REx-PN | NCLEX-PN | NCLEX-RN | All"
    }
  ],
  "summary": "..."
}`;

export async function generateNursingPage(
  topic: string,
  targetKeyword: string,
  examType: string,
  wordCount: number,
  jobId: string
): Promise<any> {
  const openai = getOpenAI();

  await pool.query(
    "UPDATE autopilot_jobs SET status = 'running', started_at = NOW() WHERE id = $1",
    [jobId]
  );

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: NURSING_PAGE_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a comprehensive nursing study page on the following topic:

Topic: ${topic}
Target SEO Keyword: ${targetKeyword}
Primary Exam: ${examType.toUpperCase()}
Target Word Count: ${wordCount}

Requirements:
- Focus on ${examType.toUpperCase()} exam preparation
- Include clinical scenarios relevant to ${examType}
- Include at least 10 practice questions with detailed rationales
- Tables should compare key concepts (e.g., normal vs abnormal values, drug comparisons)
- Clinical pearls should be memorable exam tips
- Common exam traps should warn about frequent mistakes students make

Make the content comprehensive, clinically accurate, and exam-focused.`
        }
      ],
      temperature: 0.7,
      max_tokens: 8000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned from generation");

    const parsed = JSON.parse(content);

    await pool.query(
      `INSERT INTO publishing_queue (engine_key, content_type, title, content, status, metadata, created_by)
       VALUES ('blog_engine', 'blog', $1, $2, 'pending_review', $3, 'autopilot')`,
      [
        parsed.title || topic,
        JSON.stringify(parsed),
        JSON.stringify({
          topic,
          targetKeyword,
          examType,
          wordCount: parsed.wordCount || wordCount,
          slug: parsed.slug,
          seoTitle: parsed.seoTitle,
          metaDescription: parsed.metaDescription,
          questionCount: parsed.practiceQuestions?.length || 0,
          generatedAt: new Date().toISOString(),
        }),
      ]
    );

    await pool.query(
      `UPDATE autopilot_jobs SET status = 'completed', result = $1, completed_at = NOW() WHERE id = $2`,
      [JSON.stringify({
        title: parsed.title,
        slug: parsed.slug,
        wordCount: parsed.wordCount,
        questionCount: parsed.practiceQuestions?.length || 0,
        queuedForReview: true,
      }), jobId]
    );

    await pool.query(
      "UPDATE autopilot_engines SET last_run_at = NOW() WHERE engine_key = 'blog_engine'"
    );

    return parsed;
  } catch (err: any) {
    await pool.query(
      "UPDATE autopilot_jobs SET status = 'failed', error = $1, completed_at = NOW() WHERE id = $2",
      [err.message, jobId]
    );
    throw err;
  }
}

const ALLIED_CAREER_LABELS: Record<string, string> = {
  pharmacy_tech: "Pharmacy Technician (PTCB/ExCPT)",
  respiratory_therapy: "Respiratory Therapy (RRT/TMC)",
  paramedic_ems: "Paramedic / EMS (NREMT)",
  mlt: "Medical Laboratory Technologist (MLT/ASCP)",
  radiology: "Medical Imaging / Radiology (ARRT)",
};

export async function generateAlliedHealthPage(
  topic: string,
  targetKeyword: string,
  career: string,
  wordCount: number,
  jobId: string
): Promise<any> {
  const openai = getOpenAI();

  await pool.query(
    "UPDATE autopilot_jobs SET status = 'running', started_at = NOW() WHERE id = $1",
    [jobId]
  );

  const careerLabel = ALLIED_CAREER_LABELS[career] || career;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: ALLIED_HEALTH_PAGE_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a comprehensive allied health study page on the following topic:

Topic: ${topic}
Target SEO Keyword: ${targetKeyword}
Career / Certification: ${careerLabel}
Target Word Count: ${wordCount}

Requirements:
- Focus specifically on ${careerLabel} certification exam preparation
- Include role scope and clinical settings relevant to this career
- Include clinical workflow or procedure steps specific to this discipline
- Include safety considerations and regulatory requirements
- Include at least 10 practice questions with detailed rationales
- Common exam traps should warn about frequent mistakes students make on the ${careerLabel} exam
- Clinical pearls should be memorable exam tips specific to this career
- Visual content recommendation should be relevant to ${careerLabel} practice

Make the content comprehensive, clinically accurate, and exam-focused.`
        }
      ],
      temperature: 0.7,
      max_tokens: 8000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned from generation");

    const parsed = JSON.parse(content);

    await pool.query(
      `INSERT INTO publishing_queue (engine_key, content_type, title, content, status, metadata, created_by)
       VALUES ('blog_engine', 'blog', $1, $2, 'pending_review', $3, 'autopilot')`,
      [
        parsed.title || topic,
        JSON.stringify(parsed),
        JSON.stringify({
          topic,
          targetKeyword,
          career,
          careerLabel,
          contentType: "allied_health",
          wordCount: parsed.wordCount || wordCount,
          slug: parsed.slug,
          seoTitle: parsed.seoTitle,
          metaDescription: parsed.metaDescription,
          questionCount: parsed.practiceQuestions?.length || 0,
          generatedAt: new Date().toISOString(),
        }),
      ]
    );

    await pool.query(
      `UPDATE autopilot_jobs SET status = 'completed', result = $1, completed_at = NOW() WHERE id = $2`,
      [JSON.stringify({
        title: parsed.title,
        slug: parsed.slug,
        career,
        wordCount: parsed.wordCount,
        questionCount: parsed.practiceQuestions?.length || 0,
        queuedForReview: true,
      }), jobId]
    );

    await pool.query(
      "UPDATE autopilot_engines SET last_run_at = NOW() WHERE engine_key = 'blog_engine'"
    );

    return parsed;
  } catch (err: any) {
    await pool.query(
      "UPDATE autopilot_jobs SET status = 'failed', error = $1, completed_at = NOW() WHERE id = $2",
      [err.message, jobId]
    );
    throw err;
  }
}

export async function generatePracticeQuestionPage(
  topic: string,
  category: string,
  batchSize: number,
  difficultyRange: string,
  autoValidate: boolean,
  jobId: string
): Promise<any> {
  const openai = getOpenAI();

  await pool.query(
    "UPDATE autopilot_jobs SET status = 'running', started_at = NOW() WHERE id = $1",
    [jobId]
  );

  try {
    const [minDiff, maxDiff] = difficultyRange.split("-").map(Number);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: PRACTICE_QUESTION_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a practice question bank for the following:

Topic: ${topic}
Category: ${category}
Number of Questions: 25
Difficulty Range: ${minDiff || 1} to ${maxDiff || 5}

Requirements:
- Mix of question types: approximately 15 multiple choice, 5 select-all-that-apply, and 5 case-based
- Difficulty should be distributed across the range ${difficultyRange}
- Each rationale must be at least 300 words
- Include clinical scenarios that are realistic and exam-relevant
- Cover different aspects of the topic (assessment, interventions, medications, complications, patient education)
- Questions should progressively increase in complexity
- Include relevant lab values, vital signs, and medication dosages where appropriate

Category context:
${category === "nursing_ngn" ? "Focus on Next Generation NCLEX item types with clinical judgment emphasis" : ""}
${category === "allied" ? "Focus on allied health exam preparation across multiple disciplines" : ""}
${category === "np_canada" ? "Focus on Canadian Nurse Practitioner exam content with Canadian guidelines" : ""}
${category === "np_us" ? "Focus on AANP/ANCC NP certification exam content" : ""}

Make questions clinically accurate and exam-representative.`
        }
      ],
      temperature: 0.7,
      max_tokens: 12000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned from generation");

    const parsed = JSON.parse(content);

    let validationResult: any = null;
    if (autoValidate && parsed.questions) {
      validationResult = validateQuestions(parsed.questions);
    }

    await pool.query(
      `INSERT INTO publishing_queue (engine_key, content_type, title, content, status, metadata, created_by)
       VALUES ('question_factory', 'question', $1, $2, 'pending_review', $3, 'autopilot')`,
      [
        `Practice Questions: ${parsed.topic || topic}`,
        JSON.stringify(parsed),
        JSON.stringify({
          topic,
          category,
          batchSize,
          difficultyRange,
          questionCount: parsed.questions?.length || 0,
          validation: validationResult,
          slug: parsed.slug,
          seoTitle: parsed.seoTitle,
          metaDescription: parsed.metaDescription,
          generatedAt: new Date().toISOString(),
        }),
      ]
    );

    await pool.query(
      `UPDATE autopilot_jobs SET status = 'completed', result = $1, completed_at = NOW() WHERE id = $2`,
      [JSON.stringify({
        topic: parsed.topic,
        questionCount: parsed.questions?.length || 0,
        validation: validationResult,
        queuedForReview: true,
      }), jobId]
    );

    await pool.query(
      "UPDATE autopilot_engines SET last_run_at = NOW() WHERE engine_key = 'question_factory'"
    );

    return parsed;
  } catch (err: any) {
    await pool.query(
      "UPDATE autopilot_jobs SET status = 'failed', error = $1, completed_at = NOW() WHERE id = $2",
      [err.message, jobId]
    );
    throw err;
  }
}

function validateQuestions(questions: any[]): {
  total: number;
  valid: number;
  issues: string[];
} {
  const issues: string[] = [];
  let valid = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = i + 1;
    let isValid = true;

    if (!q.stem && !q.question) {
      issues.push(`Q${qNum}: Missing question stem`);
      isValid = false;
    }

    if (!q.options || q.options.length < 4) {
      issues.push(`Q${qNum}: Fewer than 4 answer options`);
      isValid = false;
    }

    if (!q.correctAnswers || q.correctAnswers.length === 0) {
      if (!q.correctAnswer) {
        issues.push(`Q${qNum}: No correct answer specified`);
        isValid = false;
      }
    }

    if (!q.rationale || q.rationale.length < 100) {
      issues.push(`Q${qNum}: Rationale too short (${q.rationale?.length || 0} chars, need 100+)`);
      isValid = false;
    }

    if (!q.type) {
      issues.push(`Q${qNum}: Missing question type`);
      isValid = false;
    }

    if (q.type === "sata" && q.correctAnswers?.length < 2) {
      issues.push(`Q${qNum}: SATA question should have 2+ correct answers`);
      isValid = false;
    }

    if (isValid) valid++;
  }

  return {
    total: questions.length,
    valid,
    issues,
  };
}

export async function generateVisualDiagram(
  type: string,
  topic: string,
  style: string,
  jobId: string
): Promise<any> {
  const openai = getOpenAI();

  await pool.query(
    "UPDATE autopilot_jobs SET status = 'running', started_at = NOW() WHERE id = $1",
    [jobId]
  );

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a medical education visual content planner. Generate a detailed specification for a nursing education diagram/infographic. Output valid JSON.`
        },
        {
          role: "user",
          content: `Create a detailed visual content specification for:
Type: ${type} (anatomy / pathophysiology / drug_mechanism / lab_values)
Topic: ${topic}
Style: ${style} (clinical / educational / infographic)

Output JSON:
{
  "title": "...",
  "description": "...",
  "slug": "...",
  "visualType": "${type}",
  "elements": [
    { "label": "...", "description": "...", "position": "top|middle|bottom|left|right", "color": "..." }
  ],
  "annotations": ["..."],
  "colorScheme": { "primary": "...", "secondary": "...", "accent": "..." },
  "altText": "...",
  "seoTitle": "...",
  "metaDescription": "...",
  "pinterestDescription": "...",
  "relatedTopics": ["..."]
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned");

    const parsed = JSON.parse(content);

    await pool.query(
      `INSERT INTO publishing_queue (engine_key, content_type, title, content, status, metadata, created_by)
       VALUES ('visual_factory', 'diagram', $1, $2, 'pending_review', $3, 'autopilot')`,
      [
        parsed.title || topic,
        JSON.stringify(parsed),
        JSON.stringify({
          type, topic, style,
          slug: parsed.slug,
          generatedAt: new Date().toISOString(),
        }),
      ]
    );

    await pool.query(
      "UPDATE autopilot_jobs SET status = 'completed', result = $1, completed_at = NOW() WHERE id = $2",
      [JSON.stringify({ title: parsed.title, slug: parsed.slug, queuedForReview: true }), jobId]
    );

    await pool.query(
      "UPDATE autopilot_engines SET last_run_at = NOW() WHERE engine_key = 'visual_factory'"
    );

    return parsed;
  } catch (err: any) {
    await pool.query(
      "UPDATE autopilot_jobs SET status = 'failed', error = $1, completed_at = NOW() WHERE id = $2",
      [err.message, jobId]
    );
    throw err;
  }
}

export async function generatePracticeSEOPage(
  title: string,
  bodySystem: string,
  questionCount: number,
  tier: string,
  jobId: string
): Promise<any> {
  const openai = getOpenAI();

  await pool.query(
    "UPDATE autopilot_jobs SET status = 'running', started_at = NOW() WHERE id = $1",
    [jobId]
  );

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a nursing SEO content specialist. Generate a practice question page optimized for search engines and nursing exam preparation. Output valid JSON.`
        },
        {
          role: "user",
          content: `Generate a practice question SEO page:
Title: ${title}
Body System: ${bodySystem}
Question Count: ${questionCount}
Tier: ${tier.toUpperCase()}

Output JSON:
{
  "title": "...",
  "seoTitle": "...",
  "metaDescription": "...",
  "slug": "...",
  "h1": "...",
  "introduction": "... (SEO-optimized intro, 200-300 words)",
  "questions": [
    {
      "id": 1,
      "scenario": "...",
      "stem": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "A",
      "rationale": "...",
      "difficulty": 1-5,
      "bodySystem": "${bodySystem}",
      "tier": "${tier}"
    }
  ],
  "faqSchema": [
    { "question": "...", "answer": "..." }
  ],
  "relatedPages": ["..."],
  "keywords": ["..."]
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 8000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned");

    const parsed = JSON.parse(content);

    await pool.query(
      `INSERT INTO publishing_queue (engine_key, content_type, title, content, status, metadata, created_by)
       VALUES ('practice_seo', 'practice', $1, $2, 'pending_review', $3, 'autopilot')`,
      [
        parsed.title || title,
        JSON.stringify(parsed),
        JSON.stringify({
          bodySystem, tier, questionCount,
          slug: parsed.slug,
          generatedAt: new Date().toISOString(),
        }),
      ]
    );

    await pool.query(
      "UPDATE autopilot_jobs SET status = 'completed', result = $1, completed_at = NOW() WHERE id = $2",
      [JSON.stringify({ title: parsed.title, slug: parsed.slug, questionCount: parsed.questions?.length, queuedForReview: true }), jobId]
    );

    await pool.query(
      "UPDATE autopilot_engines SET last_run_at = NOW() WHERE engine_key = 'practice_seo'"
    );

    return parsed;
  } catch (err: any) {
    await pool.query(
      "UPDATE autopilot_jobs SET status = 'failed', error = $1, completed_at = NOW() WHERE id = $2",
      [err.message, jobId]
    );
    throw err;
  }
}

export async function generateCourseContent(
  topic: string,
  exam: string,
  difficulty: string,
  jobId: string
): Promise<any> {
  const openai = getOpenAI();

  await pool.query(
    "UPDATE autopilot_jobs SET status = 'running', started_at = NOW() WHERE id = $1",
    [jobId]
  );

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a nursing curriculum designer. Generate a comprehensive course outline with lesson content for nursing education. Output valid JSON.`
        },
        {
          role: "user",
          content: `Build a complete course on:
Topic: ${topic}
Target Exam: ${exam.toUpperCase()}
Difficulty: ${difficulty}

Output JSON:
{
  "title": "...",
  "slug": "...",
  "description": "...",
  "exam": "${exam}",
  "difficulty": "${difficulty}",
  "estimatedHours": 0,
  "modules": [
    {
      "title": "...",
      "description": "...",
      "lessons": [
        {
          "title": "...",
          "objectives": ["..."],
          "content": "... (500-800 word lesson content in markdown)",
          "keyTerms": ["..."],
          "clinicalTips": ["..."],
          "estimatedMinutes": 0
        }
      ],
      "quiz": {
        "questions": [
          {
            "stem": "...",
            "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
            "correctAnswer": "A",
            "rationale": "..."
          }
        ]
      }
    }
  ],
  "prerequisites": ["..."],
  "learningOutcomes": ["..."]
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 10000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content returned");

    const parsed = JSON.parse(content);

    await pool.query(
      `INSERT INTO publishing_queue (engine_key, content_type, title, content, status, metadata, created_by)
       VALUES ('course_builder', 'course', $1, $2, 'pending_review', $3, 'autopilot')`,
      [
        parsed.title || topic,
        JSON.stringify(parsed),
        JSON.stringify({
          topic, exam, difficulty,
          slug: parsed.slug,
          moduleCount: parsed.modules?.length || 0,
          generatedAt: new Date().toISOString(),
        }),
      ]
    );

    await pool.query(
      "UPDATE autopilot_jobs SET status = 'completed', result = $1, completed_at = NOW() WHERE id = $2",
      [JSON.stringify({
        title: parsed.title,
        slug: parsed.slug,
        moduleCount: parsed.modules?.length || 0,
        queuedForReview: true,
      }), jobId]
    );

    await pool.query(
      "UPDATE autopilot_engines SET last_run_at = NOW() WHERE engine_key = 'course_builder'"
    );

    return parsed;
  } catch (err: any) {
    await pool.query(
      "UPDATE autopilot_jobs SET status = 'failed', error = $1, completed_at = NOW() WHERE id = $2",
      [err.message, jobId]
    );
    throw err;
  }
}
