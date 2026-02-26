const fs = require('fs');
const OpenAI = require('openai');

const LANGUAGES = {
  fr: "French", tl: "Tagalog/Filipino", hi: "Hindi", es: "Spanish",
  zh: "Simplified Chinese", ar: "Arabic", ko: "Korean", pt: "Brazilian Portuguese",
  pa: "Punjabi (Gurmukhi)", vi: "Vietnamese", ht: "Haitian Creole",
  ur: "Urdu", ja: "Japanese", fa: "Persian/Farsi"
};

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

async function translateBatch(keys, langCode, langName) {
  const keyPairs = keys.map(([k, v]) => `${k}=${v}`).join('\n');
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Translate key=value pairs from English to ${langName} for a nursing education platform. RULES: Keep keys as-is, translate values only. For medical terms, use standard ${langName} medical terminology or keep in English if commonly used. Keep acronyms (NCLEX, SBAR, ECG, etc.) in English. Output ONLY raw JSON object {key: translation}.`
      },
      { role: "user", content: keyPairs }
    ],
    temperature: 0.2,
    max_tokens: 16384,
  });
  const text = response.choices[0]?.message?.content || "{}";
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
  } catch {
    return {};
  }
}

async function main() {
  const missing = JSON.parse(fs.readFileSync('/tmp/missing_keys.json', 'utf8'));
  const langCode = process.argv[2];
  const langName = LANGUAGES[langCode];
  if (!langCode || !langName) { console.error('Usage: node scripts/translate-batch.js <langCode>'); process.exit(1); }
  
  console.log(`Translating ${missing.length} keys to ${langName} (${langCode})...`);
  const chunkSize = 80;
  const allTranslations = {};
  
  for (let i = 0; i < missing.length; i += chunkSize) {
    const chunk = missing.slice(i, i + chunkSize);
    const n = Math.floor(i / chunkSize) + 1;
    const total = Math.ceil(missing.length / chunkSize);
    process.stdout.write(`  ${n}/${total}...`);
    try {
      const result = await translateBatch(chunk, langCode, langName);
      Object.assign(allTranslations, result);
      console.log(` ${Object.keys(result).length} keys`);
    } catch (e) {
      console.error(` ERR: ${e.message}`);
    }
  }
  
  console.log(`Done: ${Object.keys(allTranslations).length}/${missing.length} keys`);
  fs.writeFileSync(`/tmp/trans_${langCode}.json`, JSON.stringify(allTranslations, null, 2));
}
main().catch(console.error);
