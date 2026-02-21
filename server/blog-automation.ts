import OpenAI from "openai";
import { storage } from "./storage";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const NURSING_TOPICS = [
  "Clinical judgment in nursing practice",
  "NCLEX-RN preparation strategies",
  "Patient safety and medication administration",
  "Evidence-based nursing interventions",
  "Nursing assessment techniques",
  "Critical care nursing fundamentals",
  "Pediatric nursing considerations",
  "Maternal-newborn nursing care",
  "Mental health nursing approaches",
  "Geriatric nursing best practices",
  "Wound care management",
  "Pain management in nursing",
  "Infection control protocols",
  "Nursing documentation standards",
  "Pharmacology for nurses",
  "Cardiovascular nursing assessment",
  "Respiratory nursing interventions",
  "Neurological nursing assessment",
  "Endocrine disorders in nursing",
  "Gastrointestinal nursing care",
  "Renal and urinary nursing",
  "Musculoskeletal nursing assessment",
  "Integumentary system nursing care",
  "Fluid and electrolyte balance",
  "Acid-base imbalances in nursing",
  "Nursing leadership and management",
  "Cultural competence in nursing",
  "Nursing ethics and legal considerations",
  "Telehealth nursing practices",
  "New graduate nurse transition tips",
  "ICU nursing orientation essentials",
  "Emergency department nursing skills",
  "Surgical nursing pre-op and post-op care",
  "Oncology nursing fundamentals",
  "Diabetes management for nurses",
  "Hypertension nursing care plans",
  "Heart failure nursing interventions",
  "COPD nursing management",
  "Stroke nursing assessment and care",
  "Sepsis identification and management",
  "Blood transfusion nursing protocols",
  "IV therapy and venipuncture skills",
  "Nursing care plan development",
  "SBAR communication in nursing",
  "Delegation in nursing practice",
  "Time management for nurses",
  "Burnout prevention in nursing",
  "Nursing research and EBP",
  "Quality improvement in nursing",
  "Patient education strategies",
];

function formatAPA7Citation(author: string, year: number, title: string, source: string, url?: string): string {
  const urlPart = url ? ` ${url}` : "";
  return `${author} (${year}). ${title}. *${source}*.${urlPart}`;
}

function formatMLACitation(author: string, title: string, source: string, year: number, url?: string): string {
  const urlPart = url ? ` ${url}` : "";
  return `${author}. "${title}." *${source}*, ${year}.${urlPart}`;
}

export function formatCitations(citations: Array<{author: string; year: number; title: string; source: string; url?: string}>, style: "apa7" | "mla"): string {
  if (style === "apa7") {
    return citations.map(c => formatAPA7Citation(c.author, c.year, c.title, c.source, c.url)).join("\n\n");
  }
  return citations.map(c => formatMLACitation(c.author, c.title, c.source, c.year, c.url)).join("\n\n");
}

export async function generateBlogPost(topic?: string, citationStyle: "apa7" | "mla" = "apa7"): Promise<{
  title: string;
  slug: string;
  summary: string;
  content: any[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  primaryKeyword: string;
  citations: string;
}> {
  const selectedTopic = topic || NURSING_TOPICS[Math.floor(Math.random() * NURSING_TOPICS.length)];

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content: `You are a nursing education content writer creating medically accurate, evidence-based blog posts for NurseNest, a nursing education platform. Write content suitable for nursing students (RPN/LVN, RN, and NP levels).

CRITICAL RULES:
- All medical information must be clinically accurate
- Include proper nursing scope of practice considerations
- NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body
- Reference only real, verifiable medical sources
- Use professional but accessible language
- Include clinical pearls and practical tips

You must respond with valid JSON in this exact format:
{
  "title": "Blog post title",
  "slug": "url-friendly-slug",
  "summary": "2-3 sentence summary",
  "content": [
    {"type": "heading", "text": "Section heading"},
    {"type": "paragraph", "text": "Paragraph content..."},
    {"type": "list", "items": ["item1", "item2"]},
    {"type": "callout", "text": "Clinical pearl or important note"}
  ],
  "tags": ["tag1", "tag2"],
  "seoTitle": "SEO optimized title (60 chars max)",
  "seoDescription": "Meta description (155 chars max)",
  "seoKeywords": ["keyword1", "keyword2"],
  "primaryKeyword": "main keyword",
  "citations": [
    {"author": "Author Name", "year": 2024, "title": "Source Title", "source": "Journal/Publisher", "url": "https://example.com"}
  ]
}`
      },
      {
        role: "user",
        content: `Write a comprehensive, medically accurate nursing education blog post about: "${selectedTopic}". Include at least 3 credible citations from nursing journals, textbooks, or authoritative healthcare organizations. The post should be 800-1200 words with multiple sections, clinical pearls, and practical application tips.`
      }
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 4096,
  });

  const parsed = JSON.parse(response.choices[0]?.message?.content || "{}");

  const formattedCitations = parsed.citations
    ? formatCitations(parsed.citations, citationStyle)
    : "";

  if (formattedCitations) {
    parsed.content.push(
      { type: "heading", text: citationStyle === "apa7" ? "References (APA 7th Edition)" : "Works Cited (MLA)" },
      { type: "paragraph", text: formattedCitations }
    );
  }

  return {
    title: parsed.title || selectedTopic,
    slug: parsed.slug || selectedTopic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    summary: parsed.summary || "",
    content: parsed.content || [],
    tags: parsed.tags || [],
    seoTitle: parsed.seoTitle || parsed.title || selectedTopic,
    seoDescription: parsed.seoDescription || parsed.summary || "",
    seoKeywords: parsed.seoKeywords || [],
    primaryKeyword: parsed.primaryKeyword || "",
    citations: formattedCitations,
  };
}

export async function runBlogScheduler(): Promise<{ generated: number; message: string }> {
  const config = await storage.getBlogConfig();
  if (!config || !config.isActive) {
    return { generated: 0, message: "Blog automation is not active" };
  }

  const now = new Date();
  const dayCount = config.dayCount || 0;
  const totalPosts = config.totalPostsGenerated || 0;

  let postsToGenerate = 0;
  if (dayCount < 120) {
    postsToGenerate = config.postsPerDay || 2;
  } else if (dayCount < 220) {
    postsToGenerate = 1;
  } else {
    return { generated: 0, message: "Blog schedule complete (220 days)" };
  }

  if (config.lastPostAt) {
    const lastPost = new Date(config.lastPostAt);
    const hoursSince = (now.getTime() - lastPost.getTime()) / (1000 * 60 * 60);
    if (hoursSince < 12) {
      return { generated: 0, message: "Too soon since last post" };
    }
  }

  const citationStyle = (config.citationStyle as "apa7" | "mla") || "apa7";
  let generated = 0;

  for (let i = 0; i < postsToGenerate; i++) {
    try {
      const post = await generateBlogPost(undefined, citationStyle);

      const isDup = await storage.checkDuplicateSlug(post.slug);
      const finalSlug = isDup ? `${post.slug}-${Date.now()}` : post.slug;

      await storage.createContentItem({
        title: post.title,
        slug: finalSlug,
        type: "blog",
        category: "nursing-education",
        tier: "free",
        status: "published",
        tags: post.tags,
        summary: post.summary,
        content: post.content,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
        primaryKeyword: post.primaryKeyword,
        publishedAt: now,
        autoPublish: true,
        authorName: "Erika Godin, RN",
      });

      generated++;
    } catch (error) {
      console.error("Blog generation error:", error);
    }
  }

  await storage.upsertBlogConfig({
    dayCount: dayCount + 1,
    totalPostsGenerated: totalPosts + generated,
    lastPostAt: now,
  });

  return { generated, message: `Generated ${generated} posts (day ${dayCount + 1})` };
}
