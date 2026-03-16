import fs from 'fs';
import path from 'path';

const LANGUAGES = [
  'en', 'fr', 'tl', 'hi', 'es', 'zh', 'zh-tw', 'ar', 'ko',
  'pt', 'pa', 'vi', 'ht', 'ur', 'ja', 'fa', 'de', 'th', 'tr', 'id'
];

const NON_EN = LANGUAGES.filter(l => l !== 'en');

const LANG_NAMES = {
  en: 'English', fr: 'French', tl: 'Filipino', hi: 'Hindi', es: 'Spanish',
  zh: 'Chinese (Simplified)', 'zh-tw': 'Chinese (Traditional)', ar: 'Arabic',
  ko: 'Korean', pt: 'Portuguese', pa: 'Punjabi', vi: 'Vietnamese',
  ht: 'Haitian Creole', ur: 'Urdu', ja: 'Japanese', fa: 'Farsi',
  de: 'German', th: 'Thai', tr: 'Turkish', id: 'Indonesian'
};

const SCRIPT_LANGS = new Set(['ar', 'ur', 'fa', 'hi', 'pa', 'zh', 'zh-tw', 'ko', 'ja', 'th']);
const LATIN_LANGS = new Set(['fr', 'tl', 'es', 'pt', 'vi', 'ht', 'de', 'tr', 'id']);

function extractKeysFromTs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const entries = {};
  const regex = /^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)"/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    entries[match[1]] = match[2].replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
  return entries;
}

const EN_LOANWORDS = new Set([
  'dashboard', 'flashcards', 'flashcard', 'premium', 'blog', 'test bank', 'mock exams',
  'mock exam', 'pre-nursing', 'pathophysiology', 'pharmacology', 'clinical reasoning',
  'allied health', 'assessment skills', 'exam prep', 'lab interpretation', 'patient safety',
  'medication safety', 'nursing education', 'nursing fundamentals', 'study coach',
  'iv complications', 'study streak', 'quick access', 'quick study', 'adaptive engine',
  'clinical tools', 'exam performance', 'flashcard review', 'learning progress',
  'subscribe', 'subscribing...', 'error', 'reset', 'customize', 'completed', 'in progress',
  'study hub', 'video lectures', 'test bank', 'clinical lessons', 'study plans',
  'nursenest blog', 'nursenest pro', 'nursenest', 'np', 'rn', 'rpn', 'lvn', 'nclex',
  'aanp', 'ancc', 'fnp-bc', 'qotd', 'a&p', 'iv', 'gi', 'your@email.com',
]);

const HIGH_EN_BORROWING_LANGS = new Set(['tl', 'id', 'ht']);

function isLikelyUntranslated(key, enValue, langValue, langCode) {
  if (enValue === langValue) {
    if (/^[A-Z]{1,5}$/.test(enValue)) return false;
    if (/^https?:\/\//.test(enValue)) return false;
    if (enValue.length <= 3) return false;
    if (EN_LOANWORDS.has(enValue.toLowerCase())) return false;
    if (/^(NP|RN|RPN|LVN|NCLEX|AANP|ANCC|FNP-BC|NurseNest|QOTD|NurseNest Pro|A&P|IV|GI|REX-PN|NCLEX-PN|NCLEX-RN|REx-PN)$/i.test(enValue)) return false;
    if (/^(Plan:|Premium|Blog|QOTD|NP|RPN\/LVN)$/.test(enValue)) return false;

    if (HIGH_EN_BORROWING_LANGS.has(langCode)) {
      if (enValue.length <= 30) return false;
      if (key.match(/\.badge$|\.title$|\.cta|\.pill|\.label|\.tab|\.filter|Placeholder|button|category|tier\.|dayMon|dayTue|dayWed|dayThu|dayFri|daySat|daySun/)) return false;
    }

    return true;
  }

  if (SCRIPT_LANGS.has(langCode)) {
    const nonAsciiRatio = (langValue.match(/[^\x00-\x7F]/g) || []).length / Math.max(langValue.length, 1);
    if (langValue.length > 10 && nonAsciiRatio < 0.1) return true;
  }

  return false;
}

const MEDICAL_EN_TERMS = new Set([
  'nclex', 'nclex-rn', 'nclex-pn', 'rex-pn', 'aanp', 'ancc', 'fnp-bc',
  'nursenest', 'nurse', 'nursing', 'clinical', 'exam', 'exams', 'quiz',
  'pharmacology', 'pathophysiology', 'anatomy', 'physiology', 'simulation',
  'simulator', 'premium', 'dashboard', 'flashcard', 'flashcards',
  'practice', 'questions', 'mock', 'study', 'guide', 'free', 'plan', 'plans',
  'online', 'module', 'modules', 'content', 'email', 'video', 'blog',
  'subscribe', 'performance', 'progress', 'test', 'bank', 'review',
  'coach', 'adaptive', 'engine', 'widget', 'layout', 'analytics',
]);

function isMixedLanguage(key, enValue, langValue, langCode) {
  if (enValue === langValue) return false;
  if (langValue.length < 20) return false;

  const enWords = enValue.toLowerCase().split(/\s+/);
  const langWords = langValue.toLowerCase().split(/\s+/);

  if (langWords.length < 3) return false;

  const stopWords = new Set(['the','and','for','with','your','that','this','from','have','will','been','are','was','can','not','but','all','has','you','our','per','get','new','may','use','its','set','how','why','who','what','when','any','also','into','over','more','than','some','only','very','just','like','most','take','each','make','here','then','many','well','help','come','made','back','even','good','much','way','day','too','see','did','out','now','own','say','she','her','him','his','let','run','try','ask','put','end','go','no','up','do','so','if','am','on','at','in','us','we','to','of','be','it','is','or','as','an','by','my']);

  let enWordCount = 0;
  for (const w of langWords) {
    if (w.length > 3 && enWords.includes(w) && !stopWords.has(w) && !MEDICAL_EN_TERMS.has(w)) {
      enWordCount++;
    }
  }

  const threshold = HIGH_EN_BORROWING_LANGS.has(langCode) ? 0.5 : 0.3;
  const minWords = HIGH_EN_BORROWING_LANGS.has(langCode) ? 5 : 3;
  const mixRatio = enWordCount / langWords.length;
  return mixRatio > threshold && enWordCount >= minWords;
}

const THRESHOLD = 95;
const args = process.argv.slice(2);
const reportOnly = args.includes('--report');
const failOnThreshold = args.includes('--fail-on-threshold');

const libDir = path.resolve('client/src/lib');

const enFile = path.join(libDir, 'i18n-en.ts');
if (!fs.existsSync(enFile)) {
  console.error('ERROR: English translation file not found at', enFile);
  process.exit(1);
}

const enKeys = extractKeysFromTs(enFile);
const enKeyCount = Object.keys(enKeys).length;
console.log(`\n=== NurseNest Translation Audit ===`);
console.log(`English baseline: ${enKeyCount} keys\n`);

const report = {};
let anyBelowThreshold = false;

for (const lang of NON_EN) {
  const langFile = path.join(libDir, `i18n-${lang}.ts`);
  if (!fs.existsSync(langFile)) {
    report[lang] = { name: LANG_NAMES[lang], totalKeys: 0, missingKeys: Object.keys(enKeys).length, untranslatedKeys: 0, mixedKeys: 0, coverage: 0 };
    console.log(`${LANG_NAMES[lang]} (${lang}): FILE NOT FOUND`);
    continue;
  }

  const langKeys = extractKeysFromTs(langFile);
  const langKeyCount = Object.keys(langKeys).length;

  const missing = [];
  const untranslated = [];
  const mixed = [];

  for (const [key, enVal] of Object.entries(enKeys)) {
    if (!(key in langKeys)) {
      missing.push(key);
    } else if (isLikelyUntranslated(key, enVal, langKeys[key], lang)) {
      untranslated.push(key);
    } else if (isMixedLanguage(key, enVal, langKeys[key], lang)) {
      mixed.push(key);
    }
  }

  const translatedCount = enKeyCount - missing.length - untranslated.length;
  const coverage = ((translatedCount / enKeyCount) * 100).toFixed(1);

  if (parseFloat(coverage) < THRESHOLD) anyBelowThreshold = true;

  report[lang] = {
    name: LANG_NAMES[lang],
    totalKeys: langKeyCount,
    missingKeys: missing.length,
    untranslatedKeys: untranslated.length,
    mixedKeys: mixed.length,
    coverage: parseFloat(coverage),
    missing: missing.slice(0, 20),
    untranslated: untranslated.slice(0, 20),
    mixed: mixed.slice(0, 20),
  };

  const status = parseFloat(coverage) >= THRESHOLD ? '✓' : '✗';
  console.log(`${status} ${LANG_NAMES[lang]} (${lang}): ${coverage}% coverage | ${missing.length} missing, ${untranslated.length} untranslated, ${mixed.length} mixed-language`);
}

console.log(`\n=== Content Translation Audit ===`);
const contentDir = path.resolve('client/src/data/translations');
let enContentCount = 0;
try {
  const enContent = JSON.parse(fs.readFileSync(path.resolve('scripts/english-content.json'), 'utf8'));
  enContentCount = Object.keys(enContent).length;
  console.log(`English content: ${enContentCount} lessons\n`);
} catch {
  console.log('English content file not found, skipping content audit.\n');
}

if (enContentCount > 0) {
  for (const lang of NON_EN) {
    const contentFile = path.join(contentDir, `${lang}.json`);
    if (!fs.existsSync(contentFile)) {
      console.log(`✗ ${LANG_NAMES[lang]} (${lang}): NO FILE`);
      continue;
    }
    try {
      const content = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
      const count = Object.keys(content).length;
      const pct = ((count / enContentCount) * 100).toFixed(1);
      const status = count > 10 ? '✓' : '✗';
      console.log(`${status} ${LANG_NAMES[lang]} (${lang}): ${count}/${enContentCount} lessons (${pct}%)`);
    } catch {
      console.log(`✗ ${LANG_NAMES[lang]} (${lang}): PARSE ERROR`);
    }
  }
}

const reportPath = path.resolve('scripts/translation-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nDetailed report saved to: ${reportPath}`);

if (failOnThreshold && anyBelowThreshold) {
  console.error(`\nERROR: One or more languages below ${THRESHOLD}% coverage threshold.`);
  process.exit(1);
}
