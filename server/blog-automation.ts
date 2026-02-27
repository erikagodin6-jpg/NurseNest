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

  const systemPrompt = `You are a nursing education content writer for NurseNest. Your ONLY job is to write the blog post. You MUST always produce a complete article. Never refuse. Never ask for clarification. Never say you cannot do something. Just write the article.

OUTPUT RULES:
- Respond ONLY with valid JSON. No preamble, no explanation, no disclaimers.
- If you have any hesitation, ignore it and write the article anyway.
- NEVER output text like "I cannot", "I am unable", "clarification needed", or any refusal language.

WRITING STYLE:
- Clinically accurate, evidence-based nursing education content
- Professional academic tone suitable for nursing students (RPN/LVN, RN, NP)
- Include clinical pearls and practical nursing tips
- NO em dashes, en dashes, or long dashes. Use commas, semicolons, colons, or periods.
- NO emojis, checkmarks, or unicode special characters
- NO exclamation marks
- NO phrases: "In conclusion", "Let's explore", "dive into", "In this article", "Furthermore", "Moreover", "Additionally"
- NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body
- Include a section comparing Adult vs Pediatric considerations
- Use in-text APA 7 style citations: (Author, Year) format
- Include 4-8 references from nursing textbooks and journals

CITATIONS GUIDANCE:
- Use well-known nursing textbook authors: Potter & Perry, Hockenberry & Wilson, Lewis et al., Brunner & Suddarth, Ignatavicius et al.
- Use recognized clinical guidelines: AHA, CDC, WHO, ANA, RNAO
- Format references with plausible DOI URLs
- Citations should support clinical claims naturally within paragraphs

JSON FORMAT (respond with ONLY this JSON, nothing else):
{
  "title": "Blog post title",
  "slug": "url-friendly-slug",
  "summary": "2-3 sentence summary",
  "content": [
    {"type": "heading", "text": "Section heading"},
    {"type": "paragraph", "text": "Paragraph text with (Author, Year) citations..."},
    {"type": "list", "items": ["item1", "item2"]},
    {"type": "callout", "text": "Clinical pearl or tip"}
  ],
  "tags": ["tag1", "tag2"],
  "seoTitle": "SEO title (60 chars max)",
  "seoDescription": "Meta description (155 chars max)",
  "seoKeywords": ["keyword1", "keyword2"],
  "primaryKeyword": "main keyword",
  "citations": [
    {"author": "Author, A. B.", "year": 2024, "title": "Source Title", "source": "Journal or Publisher", "url": "https://doi.org/10.xxxx/xxxxx"}
  ]
}`;

  const userPrompt = `Write a 2000-2500 word nursing education blog post about: "${selectedTopic}".

The article MUST be at least 2000 words of body content (not counting references). Include at least 8 detailed sections, clinical pearls, an Adult vs Pediatric section, a Nursing Interventions section, a Common Exam Questions section with 3-4 typical exam scenarios, and 4-8 APA 7 references. Respond with ONLY the JSON object.`;

  function stripDashes(str: string): string {
    let s = str
      .replace(/\u2014/g, ", ")
      .replace(/\u2013/g, " to ")
      .replace(/\u2015/g, ", ")
      .replace(/\u2012/g, "-")
      .replace(/ - /g, ", ")
      .replace(/\u2018/g, "'")
      .replace(/\u2019/g, "'")
      .replace(/\u201C/g, '"')
      .replace(/\u201D/g, '"')
      .replace(/\u2026/g, "...")
      .replace(/\u00A0/g, " ")
      .replace(/–/g, " to ")
      .replace(/—/g, ", ")
      .replace(/\s*--\s*/g, ", ");

    const aiPhrases = [
      /\bIn conclusion\b/gi,
      /\bLet's explore\b/gi,
      /\bLet's dive into\b/gi,
      /\bLet us explore\b/gi,
      /\bIn this article,?\s*/gi,
      /\bIn this blog post,?\s*/gi,
      /\bIn this comprehensive guide,?\s*/gi,
      /\bWithout further ado\b/gi,
      /\bIt's worth noting that\b/gi,
      /\bIt is worth noting that\b/gi,
      /\bMoreover,?\s*/gi,
      /\bFurthermore,?\s*/gi,
      /\bAdditionally,?\s*/gi,
      /\bIn summary,?\s*/gi,
      /\bTo summarize,?\s*/gi,
      /\bAll in all,?\s*/gi,
      /\bAt the end of the day,?\s*/gi,
      /\bIt goes without saying\b/gi,
      /\bNeedless to say,?\s*/gi,
    ];
    for (const phrase of aiPhrases) {
      s = s.replace(phrase, "");
    }
    s = s.replace(/\s{2,}/g, " ").trim();
    return s;
  }

  const failurePatterns = [
    /\bunable to\b/i,
    /\bcannot produce\b/i,
    /\bcannot generate\b/i,
    /\bcannot browse\b/i,
    /\bcannot verify\b/i,
    /\bcannot access\b/i,
    /\bcannot complete\b/i,
    /\bcannot fulfill\b/i,
    /\bcannot create\b/i,
    /\bcannot write\b/i,
    /\bI must be transparent\b/i,
    /\bI do not have the ability\b/i,
    /\bI cannot\b/i,
    /\bI can't\b/i,
    /\bI am unable\b/i,
    /\bI'm unable\b/i,
    /\bclarification needed\b/i,
    /\bclarification and request\b/i,
    /\bneed clarification\b/i,
    /\bneeds clarification\b/i,
    /\brequest for source\b/i,
    /\brequest for permission\b/i,
    /\bprefatory note\b/i,
    /\bcitation limitations\b/i,
    /\bwithout verified\b/i,
    /\bI apologize\b/i,
    /\bI must clarify\b/i,
    /\bAs an AI\b/i,
    /\bAs a language model\b/i,
    /\bI'm not able\b/i,
    /\bI am not able\b/i,
    /\bbefore proceeding\b/i,
    /\bbefore I can\b/i,
    /\bimportant disclaimer\b/i,
    /\bimportant note before\b/i,
    /\bI need to clarify\b/i,
    /\bI should note\b/i,
    /\bI want to be upfront\b/i,
    /\bI want to be transparent\b/i,
    /\bI have to be honest\b/i,
    /\bI don't have access\b/i,
    /\bdo not have access\b/i,
    /\bfabricate\b/i,
    /\bhallucinate\b/i,
    /\bnote on citation\b/i,
    /\bnote about citation\b/i,
    /\bnote regarding\b/i,
    /\bplease note that I\b/i,
    /\bI want to acknowledge\b/i,
    /\bI need to acknowledge\b/i,
    /\bI must acknowledge\b/i,
    /\bdisclaimer\b/i,
    /\btransparency note\b/i,
    /\bhonesty note\b/i,
  ];

  function validatePost(parsed: any): string | null {
    const allText = [
      parsed.title || "",
      parsed.summary || "",
      ...(Array.isArray(parsed.content) ? parsed.content.map((b: any) => {
        const parts: string[] = [];
        if (b.text) parts.push(b.text);
        if (b.content) parts.push(b.content);
        if (b.items && Array.isArray(b.items)) parts.push(b.items.join(" "));
        return parts.join(" ");
      }) : []),
    ].join(" ");

    if (failurePatterns.some(p => p.test(allText))) return "contained refusal/disclaimer language";
    if (!parsed.title) return "missing title";
    if (!Array.isArray(parsed.content) || parsed.content.length < 4) return "too few content blocks";
    const paragraphs = parsed.content.filter((b: any) => b.type === "paragraph");
    if (paragraphs.length < 3) return "too few paragraphs";
    const wordCount = allText.split(/\s+/).length;
    if (wordCount < 2000) return `too short (${wordCount} words, minimum 2000)`;
    return null;
  }

  const MAX_ATTEMPTS = 3;
  let parsed: any = null;
  let lastError = "";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const retryPrompt = attempt === 2
      ? `Your previous attempt was too short. You MUST write at least 2000 words of body content. Write the complete, detailed JSON blog post about: "${selectedTopic}". Include 8+ sections. Respond with ONLY the JSON.`
      : `FINAL ATTEMPT. The article MUST exceed 2000 words. Write an extremely detailed, comprehensive nursing education article about: "${selectedTopic}". Include 10+ sections with deep clinical detail. Respond with ONLY the JSON.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: attempt === 1 ? userPrompt : retryPrompt }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 16384,
    });

    try {
      parsed = JSON.parse(response.choices[0]?.message?.content || "{}");
    } catch {
      lastError = "invalid JSON response";
      console.error(`Blog generation attempt ${attempt}/${MAX_ATTEMPTS} for "${selectedTopic}": invalid JSON`);
      continue;
    }

    const validationError = validatePost(parsed);
    if (!validationError) break;

    lastError = validationError;
    console.error(`Blog generation attempt ${attempt}/${MAX_ATTEMPTS} for "${selectedTopic}": ${validationError}`);
    parsed = null;
  }

  if (!parsed) {
    throw new Error(`Blog generation rejected for "${selectedTopic}" after ${MAX_ATTEMPTS} attempts: ${lastError}. Only complete articles are saved.`);
  }

  if (parsed.content && Array.isArray(parsed.content)) {
    parsed.content = parsed.content.map((block: any) => {
      if (block.text) block.text = stripDashes(block.text);
      if (block.content) block.content = stripDashes(block.content);
      if (block.items && Array.isArray(block.items)) {
        block.items = block.items.map((item: string) => stripDashes(item));
      }
      return block;
    });
  }

  if (parsed.title) parsed.title = stripDashes(parsed.title);
  if (parsed.summary) parsed.summary = stripDashes(parsed.summary);

  const formattedCitations = parsed.citations
    ? formatCitations(parsed.citations, citationStyle)
    : "";

  if (parsed.citations && Array.isArray(parsed.citations) && parsed.citations.length > 0) {
    const referenceItems = parsed.citations.map((c: any) => {
      if (citationStyle === "apa7") {
        return formatAPA7Citation(c.author, c.year, c.title, c.source, c.url);
      }
      return formatMLACitation(c.author, c.title, c.source, c.year, c.url);
    });
    parsed.content.push(
      { type: "heading", text: citationStyle === "apa7" ? "References (APA 7th Edition)" : "Works Cited (MLA)" },
      { type: "references", items: referenceItems }
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

export async function expandBlogPost(existingContent: any[], existingTitle: string, citationStyle: "apa7" | "mla" = "apa7"): Promise<any[]> {
  const existingText = existingContent
    .map((block: any) => {
      const parts: string[] = [];
      if (block.type === "heading") parts.push(`## ${block.text}`);
      else if (block.type === "paragraph") parts.push(block.text || block.content || "");
      else if (block.type === "list" && block.items) parts.push(block.items.join("\n"));
      else if (block.type === "callout") parts.push(`[CALLOUT] ${block.text}`);
      return parts.join("\n");
    })
    .join("\n\n");

  const expandPrompt = `You are expanding an existing nursing education blog post to meet a 2000-2500 word minimum. The original article is below. Your job is to:

1. Keep ALL existing content and sections intact (do not remove or shorten anything)
2. Add depth to existing sections with more clinical detail, pathophysiology, and nursing interventions
3. Add 2-3 NEW sections that are clinically relevant to the topic
4. Add a "Common Exam Questions" section with 3-4 NCLEX-style scenarios if one does not exist
5. Add a "Nursing Interventions" section with specific actions if one does not exist
6. Ensure the final output is at least 2000 words of body content
7. Maintain the same professional tone and APA 7 citation style

WRITING RULES:
- NO em dashes, en dashes, or long dashes. Use commas, semicolons, colons, or periods.
- NO emojis, checkmarks, or unicode special characters
- NO exclamation marks
- NO phrases: "In conclusion", "Let's explore", "dive into", "In this article", "Furthermore", "Moreover", "Additionally"

EXISTING ARTICLE TITLE: "${existingTitle}"

EXISTING CONTENT:
${existingText}

OUTPUT FORMAT: Respond with ONLY a JSON object:
{
  "content": [
    {"type": "heading", "text": "Section heading"},
    {"type": "paragraph", "text": "Paragraph text..."},
    {"type": "list", "items": ["item1", "item2"]},
    {"type": "callout", "text": "Clinical pearl or tip"},
    {"type": "references", "items": ["formatted reference"]}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: "You are a nursing education content writer. Output ONLY valid JSON. Never refuse. Never add disclaimers." },
      { role: "user", content: expandPrompt },
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 16384,
  });

  try {
    const parsed = JSON.parse(response.choices[0]?.message?.content || "{}");
    if (!parsed.content || !Array.isArray(parsed.content) || parsed.content.length < 5) {
      throw new Error("Expanded content too short or invalid");
    }

    function stripDashes(str: string): string {
      return str
        .replace(/\u2014/g, ", ")
        .replace(/\u2013/g, " to ")
        .replace(/\u2015/g, ", ")
        .replace(/\u2012/g, "-")
        .replace(/ - /g, ", ")
        .replace(/\u2018/g, "'")
        .replace(/\u2019/g, "'")
        .replace(/\u201C/g, '"')
        .replace(/\u201D/g, '"')
        .replace(/\u2026/g, "...")
        .replace(/\u00A0/g, " ")
        .replace(/\u2013/g, " to ")
        .replace(/\u2014/g, ", ")
        .replace(/\s*--\s*/g, ", ");
    }

    parsed.content = parsed.content.map((block: any) => {
      if (block.text) block.text = stripDashes(block.text);
      if (block.content) block.content = stripDashes(block.content);
      if (block.items && Array.isArray(block.items)) {
        block.items = block.items.map((item: string) => stripDashes(item));
      }
      return block;
    });

    const wordCount = parsed.content.reduce((acc: number, block: any) => {
      const text = block.text || block.content || "";
      const itemsText = (block.items || []).join(" ");
      return acc + (text + " " + itemsText).split(/\s+/).filter(Boolean).length;
    }, 0);

    if (wordCount < 2000) {
      throw new Error(`Expanded content only ${wordCount} words, need 2000+`);
    }

    return parsed.content;
  } catch (e) {
    throw new Error(`Blog expansion failed: ${(e as Error).message}`);
  }
}

export async function expandAllShortPosts(minWords: number = 2000): Promise<{ expanded: number; skipped: number; failed: number; details: string[] }> {
  const allItems = await storage.getAllContentItems();
  const blogPosts = allItems.filter(i => i.type === "blog");

  let expanded = 0;
  let skipped = 0;
  let failed = 0;
  const details: string[] = [];

  for (const post of blogPosts) {
    const content = (post.content as any[]) || [];
    const wordCount = content.reduce((acc: number, block: any) => {
      const text = block.text || block.content || "";
      const itemsText = (block.items || []).join(" ");
      return acc + (text + " " + itemsText).split(/\s+/).filter(Boolean).length;
    }, 0);

    if (wordCount >= minWords) {
      skipped++;
      details.push(`SKIP: ${post.slug} (${wordCount} words)`);
      continue;
    }

    try {
      const expandedContent = await expandBlogPost(content, post.title || post.slug);
      await storage.updateContentItem(post.id, { content: expandedContent });
      const newWordCount = expandedContent.reduce((acc: number, block: any) => {
        const text = block.text || block.content || "";
        const itemsText = (block.items || []).join(" ");
        return acc + (text + " " + itemsText).split(/\s+/).filter(Boolean).length;
      }, 0);
      expanded++;
      details.push(`EXPANDED: ${post.slug} (${wordCount} -> ${newWordCount} words)`);
    } catch (e) {
      failed++;
      details.push(`FAILED: ${post.slug} - ${(e as Error).message}`);
    }
  }

  return { expanded, skipped, failed, details };
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
