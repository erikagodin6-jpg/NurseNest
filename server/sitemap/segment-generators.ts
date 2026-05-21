/**
 * Thematic sitemap segments for NurseNest (marketing, learning, pathways, etc.).
 * Partitions indexable URL blocks so each public URL appears in at most one segment
 * (deduped by first <loc> in each block).
 */
import { SUPPORTED_LOCALES_SET } from "@shared/locales";
import {
  getSiteBase,
  todayDate,
  localizedUrl,
  getIndexableLocales,
  getSharedStaticRoutes,
  COMPARE_PAGES,
  NURSING_QUESTION_TIERS,
} from "./helpers";
import { isNoindexPath } from "./helpers";
import {
  generateMainLessons,
  generateMainQuestions,
  generateMainFlashcards,
  generateMainSpecialties,
  generateMainGlossary,
  generateMainMedicalAbbreviations,
  generateMainNursingSkillChecklists,
  generateMainClinicalClarity,
  generateMainBlog,
  generateMainMedicalImaging,
  generateMainSeoContent,
  generateMainTopics,
  generateMainProgrammatic,
  generateSeoContentPages,
  generateExamBlueprintSeoPages,
  generateClinicalSeoPages,
} from "./main-site";
import {
  generateAlliedPages,
  generateAlliedDatabaseContent,
  generateAlliedCareers,
  generateAlliedExams,
  generateAlliedTools,
  generateAlliedTopics,
  generateAlliedSeoLanding,
} from "./allied-site";

export const ROOT_SEGMENT_NAMES = [
  "marketing",
  "blog",
  "lessons",
  "questions",
  "flashcards",
  "ecg",
  "labs",
  "pathways",
  "allied",
  "localized",
  "scenarios",
  "medications",
  "ngn",
] as const;

export type RootSegmentName = (typeof ROOT_SEGMENT_NAMES)[number];

function firstLocFromBlock(block: string): string | null {
  const m = block.match(/<loc>([^<]+)<\/loc>/);
  return m ? m[1].trim() : null;
}

/** Site path without leading locale (e.g. /en/pricing -> /pricing). */
export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (SUPPORTED_LOCALES_SET.has(parts[0]!)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function blockTouchesNoindex(block: string): boolean {
  const re = /<loc>([^<]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    try {
      const u = new URL(m[1]!);
      const p = stripLocaleFromPathname(u.pathname);
      if (isNoindexPath(p, "en")) return true;
    } catch {
      continue;
    }
  }
  return false;
}

export function dedupeUrlBlocks(blocks: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const b of blocks) {
    if (!b.trim()) continue;
    if (blockTouchesNoindex(b)) continue;
    const loc = firstLocFromBlock(b);
    if (!loc) continue;
    if (seen.has(loc)) continue;
    seen.add(loc);
    out.push(b);
  }
  return out;
}

function classifyTopicBlockByFirstLoc(block: string): "ecg" | "labs" | "pathways" | "marketing" {
  const loc = firstLocFromBlock(block);
  if (!loc) return "marketing";
  let path = "/";
  try {
    path = stripLocaleFromPathname(new URL(loc).pathname);
  } catch {
    return "marketing";
  }
  const p = path.toLowerCase();
  if (
    p.includes("ecg") ||
    p.includes("ekg") ||
    p.includes("cardiac-rhythm") ||
    p.includes("electrocardi") ||
    p.includes("qrs-complex")
  ) {
    return "ecg";
  }
  if (
    p.includes("/lab-values/") ||
    p.includes("/labs/") ||
    p.includes("/lab-values") ||
    /\/rex-pn\/labs\//.test(p) ||
    /\/nclex-rn\/lab-values\//.test(p) ||
    /\/nclex-pn\/lab-values\//.test(p) ||
    /\/np-exam\/lab-values\//.test(p)
  ) {
    return "labs";
  }
  if (
    /^\/(nclex-rn|nclex-pn|rex-pn|np-exam)(\/|$)/.test(p) ||
    /^\/topics\//.test(p) ||
    /^\/conditions\//.test(p) ||
    /^\/medications\//.test(p) ||
    /^\/symptoms\//.test(p) ||
    /^\/clinical-comparisons\//.test(p) ||
    /^\/herbal-supplements/.test(p) ||
    /^\/rex-pn\//.test(p)
  ) {
    return "pathways";
  }
  return "marketing";
}

type StaticBucket = "marketing" | "learning" | "lessonsHub" | "flashcards" | "labs" | "pathways" | "ecg" | "questions";

let cachedTopicBlocks: string[] | null = null;

export function resetSegmentTopicCache(): void {
  cachedTopicBlocks = null;
}

async function getTopicBlocksCached(): Promise<string[]> {
  if (!cachedTopicBlocks) {
    cachedTopicBlocks = await generateMainTopics();
  }
  return cachedTopicBlocks;
}

function classifyStaticRoute(path: string): StaticBucket {
  if (path === "/lessons") return "lessonsHub";
  if (path === "/flashcards") return "flashcards";
  const pl = path.toLowerCase();
  if (
    pl.startsWith("/lab-values") ||
    pl.includes("mmol-l-to") ||
    pl.includes("umol-l-to") ||
    pl.includes("g-l-to-g-dl") ||
    pl.includes("urea-to-bun") ||
    pl.includes("cholesterol-triglyceride-unit") ||
    pl.includes("kg-to-lb-nursing") ||
    pl.includes("celsius-to-fahrenheit-nursing") ||
    pl.includes("si-to-conventional-units") ||
    pl.includes("canadian-vs-american-lab-values")
  ) {
    return "labs";
  }
  if (
    pl.includes("ecg-interpretation") ||
    pl.includes("cardiac-rhythm-interpretation") ||
    pl.includes("/ecg") ||
    pl.includes("/ekg") ||
    pl.includes("qrs-complex-explained")
  ) {
    return "ecg";
  }
  if (
    /^\/(nclex-rn|nclex-pn|rex-pn|np-exam)(\/|$)/.test(pl) ||
    pl === "/study-pathways" ||
    pl.startsWith("/nursing-schools") ||
    pl.startsWith("/how-to-become-a-nurse") ||
    pl === "/nursing" ||
    pl === "/pre-nursing" ||
    pl === "/exam-prep" ||
    pl === "/free-practice" ||
    pl === "/practice-questions" ||
    pl.startsWith("/nclex-rn/") ||
    pl.startsWith("/nclex-pn/") ||
    pl.startsWith("/rex-pn/") ||
    pl.startsWith("/np-exam/") ||
    pl.startsWith("/np/") ||
    pl === "/pass-nclex-first-time" ||
    pl.startsWith("/rpn/test-bank") ||
    pl.startsWith("/rn/test-bank") ||
    pl.startsWith("/np/test-bank")
  ) {
    return "pathways";
  }
  if (NURSING_QUESTION_TIERS.some((tier) => pl === `/${tier}/questions` || pl.startsWith(`/${tier}/questions/`))) {
    return "questions";
  }
  if (
    pl === "/lessons" ||
    pl === "/lectures" ||
    pl.startsWith("/clinical-clarity") ||
    pl === "/glossary" ||
    pl.startsWith("/glossary/") ||
    pl === "/anatomy" ||
    pl === "/question-bank" ||
    pl === "/med-math" ||
    pl.startsWith("/medical-abbreviations-for-nurses") ||
    pl.startsWith("/nursing-skill-checklists") ||
    pl.startsWith("/case-simulations") ||
    pl.startsWith("/simulators/") ||
    pl.startsWith("/clinical-skills") ||
    pl.startsWith("/clinical-case-studies") ||
    pl.startsWith("/order-of-the-draw")
  ) {
    return "learning";
  }
  return "marketing";
}

async function staticUrlsForBucket(bucket: StaticBucket): Promise<string[]> {
  const base = getSiteBase();
  const today = todayDate();
  const locales = getIndexableLocales();
  const urls: string[] = [];
  for (const route of getSharedStaticRoutes(today)) {
    const b = classifyStaticRoute(route.path);
    if (b !== bucket) continue;
    if (isNoindexPath(route.path, "en")) continue;
    const localeSet = route.multilingual ? locales : ["en"];
    urls.push(localizedUrl(base, route.path, route.priority, route.changefreq, localeSet, route.lastmod));
  }
  return urls;
}

async function marketingCoreGenerators(): Promise<string[]> {
  const chunks: string[][] = await Promise.all([
    generateSeoContentPages(),
    generateMainProgrammatic(),
    generateExamBlueprintSeoPages(),
    generateMainSeoContent(),
    generateMainMedicalImaging(),
    generateMainClinicalClarity(),
    generateClinicalSeoPages(),
    generateMainGlossary(),
    generateMainMedicalAbbreviations(),
    generateMainNursingSkillChecklists(),
    staticUrlsForBucket("marketing"),
  ]);
  const base = getSiteBase();
  const today = todayDate();
  const locales = getIndexableLocales();
  const compare: string[] = [];
  for (const slug of COMPARE_PAGES) {
    compare.push(localizedUrl(base, `/compare/${slug}`, "0.7", "monthly", locales, today));
  }
  const topicBlocks = await getTopicBlocksCached();
  const marketingTopics = topicBlocks.filter((b) => classifyTopicBlockByFirstLoc(b) === "marketing");
  return dedupeUrlBlocks([...chunks.flat(), ...compare, ...marketingTopics]);
}

async function learningStaticUrls(): Promise<string[]> {
  return dedupeUrlBlocks(await staticUrlsForBucket("learning"));
}

export async function generateSegmentMarketing(): Promise<string[]> {
  return dedupeUrlBlocks([...(await marketingCoreGenerators()), ...(await learningStaticUrls())]);
}

export async function generateSegmentBlog(): Promise<string[]> {
  return dedupeUrlBlocks(await generateMainBlog());
}

export async function generateSegmentLessons(): Promise<string[]> {
  return dedupeUrlBlocks([...(await generateMainLessons()), ...(await staticUrlsForBucket("lessonsHub"))]);
}

export async function generateSegmentQuestions(): Promise<string[]> {
  const base = getSiteBase();
  const today = todayDate();
  const locales = getIndexableLocales();
  const tierHubs: string[] = [];
  for (const tier of NURSING_QUESTION_TIERS) {
    tierHubs.push(localizedUrl(base, `/${tier}/questions`, "0.8", "weekly", locales, today));
  }
  const staticQ = await staticUrlsForBucket("questions");
  return dedupeUrlBlocks([...(await generateMainQuestions()), ...tierHubs, ...staticQ]);
}

export async function generateSegmentFlashcards(): Promise<string[]> {
  const flashStatic = await staticUrlsForBucket("flashcards");
  return dedupeUrlBlocks([...(await generateMainFlashcards()), ...flashStatic]);
}

export async function generateSegmentEcg(): Promise<string[]> {
  const topicBlocks = await getTopicBlocksCached();
  const ecgTopics = topicBlocks.filter((b) => classifyTopicBlockByFirstLoc(b) === "ecg");
  const ecgStatic = await staticUrlsForBucket("ecg");
  return dedupeUrlBlocks([...ecgTopics, ...ecgStatic]);
}

export async function generateSegmentLabs(): Promise<string[]> {
  const topicBlocks = await getTopicBlocksCached();
  const labTopics = topicBlocks.filter((b) => classifyTopicBlockByFirstLoc(b) === "labs");
  const labStatic = await staticUrlsForBucket("labs");
  return dedupeUrlBlocks([...labTopics, ...labStatic]);
}

export async function generateSegmentPathways(): Promise<string[]> {
  const topicBlocks = await getTopicBlocksCached();
  const pathTopics = topicBlocks.filter((b) => classifyTopicBlockByFirstLoc(b) === "pathways");
  const pathStatic = await staticUrlsForBucket("pathways");
  const specs = await generateMainSpecialties();
  return dedupeUrlBlocks([...pathTopics, ...pathStatic, ...specs]);
}

export async function generateSegmentAllied(): Promise<string[]> {
  const [staticUrls, dbUrls, careers, exams, tools, topics, landing] = await Promise.all([
    generateAlliedPages().catch(() => [] as string[]),
    generateAlliedDatabaseContent().catch(() => [] as string[]),
    generateAlliedCareers().catch(() => [] as string[]),
    generateAlliedExams().catch(() => [] as string[]),
    generateAlliedTools().catch(() => [] as string[]),
    generateAlliedTopics().catch(() => [] as string[]),
    generateAlliedSeoLanding().catch(() => [] as string[]),
  ]);
  return dedupeUrlBlocks([...staticUrls, ...dbUrls, ...careers, ...exams, ...tools, ...topics, ...landing]);
}

/** Hub for locale discovery; detailed alternates live on each URL block in other segments. */
export async function generateSegmentLocalized(): Promise<string[]> {
  const base = getSiteBase();
  const today = todayDate();
  const locales = getIndexableLocales();
  return dedupeUrlBlocks([localizedUrl(base, "/languages", "0.5", "monthly", locales, today)]);
}

export async function generateSegmentScenarios(): Promise<string[]> {
  return [];
}

export async function generateSegmentMedications(): Promise<string[]> {
  return [];
}

export async function generateSegmentNgn(): Promise<string[]> {
  return [];
}

export const ROOT_SEGMENT_DEFS: { name: RootSegmentName; generator: () => Promise<string[]> }[] = [
  { name: "marketing", generator: generateSegmentMarketing },
  { name: "blog", generator: generateSegmentBlog },
  { name: "lessons", generator: generateSegmentLessons },
  { name: "questions", generator: generateSegmentQuestions },
  { name: "flashcards", generator: generateSegmentFlashcards },
  { name: "ecg", generator: generateSegmentEcg },
  { name: "labs", generator: generateSegmentLabs },
  { name: "pathways", generator: generateSegmentPathways },
  { name: "allied", generator: generateSegmentAllied },
  { name: "localized", generator: generateSegmentLocalized },
  { name: "scenarios", generator: generateSegmentScenarios },
  { name: "medications", generator: generateSegmentMedications },
  { name: "ngn", generator: generateSegmentNgn },
];
