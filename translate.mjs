import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const LANGUAGES = {
  fr: "French (Canadian French preferred)",
  es: "Spanish",
  zh: "Simplified Chinese",
  hi: "Hindi",
  ar: "Arabic",
  pt: "Portuguese (Brazilian)",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
  it: "Italian",
  ru: "Russian",
  ur: "Urdu",
  fa: "Persian (Farsi)",
  tl: "Filipino (Tagalog)"
};

const CHUNKS = parseInt(fs.readFileSync("/tmp/chunks_count.txt", "utf-8").trim());

async function translateChunk(chunkIdx, langCode, langName) {
  const chunk = JSON.parse(fs.readFileSync(`/tmp/chunk_${chunkIdx}.json`, "utf-8"));
  
  const prompt = `Translate the following JSON key-value pairs from English to ${langName}. 
This is for a nursing education platform (NurseNest). Keep medical/nursing terminology accurate.
Rules:
- Return ONLY valid JSON with the same keys but translated values
- Keep any placeholders like {name}, {count}, etc. unchanged
- Keep technical terms (RPN, RN, NP, NCLEX, REX-PN) untranslated
- Keep brand names (NurseNest, Stripe, PayPal) untranslated
- Do NOT use em dashes or en dashes, use regular hyphens
- Translate naturally, not word-for-word
- For short UI labels (buttons, tabs), keep them concise

JSON to translate:
${JSON.stringify(chunk, null, 2)}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 4096,
  });

  const text = response.choices[0].message.content.trim();
  // Extract JSON from potential markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
  return JSON.parse(jsonMatch[1].trim());
}

async function main() {
  const results = {};
  
  for (const [langCode, langName] of Object.entries(LANGUAGES)) {
    console.log(`Translating to ${langName} (${langCode})...`);
    results[langCode] = {};
    
    for (let i = 0; i < CHUNKS; i++) {
      try {
        const translated = await translateChunk(i, langCode, langName);
        Object.assign(results[langCode], translated);
        process.stdout.write(`  chunk ${i+1}/${CHUNKS} done\n`);
      } catch (e) {
        console.error(`  ERROR chunk ${i} for ${langCode}:`, e.message);
        // Retry once
        try {
          await new Promise(r => setTimeout(r, 2000));
          const translated = await translateChunk(i, langCode, langName);
          Object.assign(results[langCode], translated);
          process.stdout.write(`  chunk ${i+1}/${CHUNKS} done (retry)\n`);
        } catch (e2) {
          console.error(`  FAILED chunk ${i} for ${langCode}:`, e2.message);
        }
      }
    }
    
    console.log(`  ${langCode}: ${Object.keys(results[langCode]).length} keys translated`);
    // Save intermediate results
    fs.writeFileSync(`/tmp/translated_${langCode}.json`, JSON.stringify(results[langCode], null, 2));
  }
  
  fs.writeFileSync("/tmp/all_translations.json", JSON.stringify(results, null, 2));
  console.log("All translations complete!");
}

main().catch(console.error);
