import { storage } from "../storage";

const SECTION_KEYS = [
  "objectives", "pathophysiology", "signs_symptoms", "assessment",
  "labs", "medications", "interventions", "complications", "teaching",
];

const SECTION_LABELS: Record<string, string> = {
  objectives: "Learning Objectives",
  pathophysiology: "Pathophysiology",
  signs_symptoms: "Signs & Symptoms",
  assessment: "Assessment Findings",
  labs: "Labs & Diagnostics",
  medications: "Medications",
  interventions: "Nursing Interventions",
  complications: "Complications",
  teaching: "Patient Teaching",
};

async function callModel(systemPrompt: string, userPrompt: string): Promise<string> {
  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });

  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 8192,
    response_format: { type: "json_object" },
  });

  return resp.choices[0]?.message?.content || "{}";
}

export async function generateContentBlocks(
  generationId: string,
  topic: string,
  examTarget: string,
  region: string,
  sections: string[] = SECTION_KEYS,
): Promise<void> {
  await storage.createGenerationEvent({
    generationId,
    eventType: "content_generation_started",
    payload: { topic, sections },
  });

  const regionNote = region === "CA"
    ? "Canadian context: SI units (mmol/L, umol/L, Celsius, kg), Canadian drug names, RPN scope."
    : "US context: conventional units, LPN/LVN scope.";

  for (const sectionKey of sections) {
    const label = SECTION_LABELS[sectionKey] || sectionKey;
    console.log(`[GenV2 Content] Generating section: ${label} for topic: ${topic}`);

    const systemPrompt = `You are a nursing education content expert creating high-yield exam preparation material for NurseNest.
${regionNote}
Exam target: ${examTarget}

Generate content for the "${label}" section about "${topic}".

Return JSON with this structure:
{
  "sectionTitle": "${label}",
  "blocks": [
    { "type": "heading", "content": "Section heading text" },
    { "type": "paragraph", "content": "Detailed clinical content..." },
    { "type": "bullets", "items": ["Point 1", "Point 2", "Point 3"] },
    { "type": "table", "headers": ["Column1", "Column2"], "rows": [["Cell1", "Cell2"]] },
    { "type": "callout", "variant": "warning", "content": "Red flag or clinical pearl" },
    { "type": "pearl", "content": "High-yield exam tip" }
  ]
}

Rules:
- Content must be clinically accurate and exam-relevant
- Include specific values, lab ranges, drug dosages where appropriate
- Minimum 3 blocks per section, maximum 12
- No filler content. Every block must add exam value.
- Include at least one "callout" or "pearl" block per section
- No cover pages, no TOC, no section dividers in blocks
- CRITICAL: Do NOT use any emoji characters anywhere. No unicode emoji symbols. Plain text only.`;

    const userPrompt = `Generate the "${label}" section for: ${topic}. Return JSON only.`;

    try {
      const raw = await callModel(systemPrompt, userPrompt);
      const parsed = JSON.parse(raw);
      const blocks = parsed.blocks || [];

      if (blocks.length > 0) {
        await storage.createContentBlock({
          generationId,
          sectionKey,
          blocks,
        });

        await storage.createGenerationEvent({
          generationId,
          eventType: "content_section_saved",
          payload: { sectionKey, blockCount: blocks.length },
        });

        console.log(`[GenV2 Content] Saved ${blocks.length} blocks for ${label}`);
      } else {
        console.warn(`[GenV2 Content] No blocks generated for ${label}`);
      }
    } catch (err: any) {
      console.error(`[GenV2 Content] Failed to generate ${label}:`, err.message);
      await storage.createGenerationEvent({
        generationId,
        eventType: "content_section_failed",
        payload: { sectionKey, error: err.message },
      });
    }
  }

  await storage.createGenerationEvent({
    generationId,
    eventType: "content_generation_completed",
    payload: { sectionsGenerated: sections.length },
  });
}

export { SECTION_KEYS, SECTION_LABELS };
