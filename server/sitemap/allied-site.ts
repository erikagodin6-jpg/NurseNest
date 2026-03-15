import { pool } from "../storage";
import {
  getSiteBase, todayDate, toLastmod, localizedUrl, getIndexableLocales
} from "./helpers";

const ALLIED_PREFIX = "/allied-health";

export async function generateAlliedPages(): Promise<string[]> {
  const base = getSiteBase();
  const now = todayDate();
  const locales = getIndexableLocales();
  const urls: string[] = [];

  urls.push(localizedUrl(base, `${ALLIED_PREFIX}`, "0.9", "weekly", locales, now));
  urls.push(localizedUrl(base, `${ALLIED_PREFIX}/pricing`, "0.8", "monthly", locales, now));
  urls.push(localizedUrl(base, `${ALLIED_PREFIX}/careers`, "0.8", "monthly", locales, now));
  urls.push(localizedUrl(base, `${ALLIED_PREFIX}/diagnostic`, "0.8", "weekly", locales, now));
  urls.push(localizedUrl(base, `${ALLIED_PREFIX}/qbank`, "0.8", "weekly", locales, now));

  const canonicalCareerRoutes = [
    "/rrt", "/paramedic", "/pharmacy-technician", "/mlt", "/imaging",
    "/social-work", "/psychotherapy", "/addictions", "/occupational-therapy",
  ];
  const careerSubPages = ["mock-exams", "dashboard", "flashcards", "study-plan", "sims", "tools"];

  for (const route of canonicalCareerRoutes) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}${route}`, "0.8", "weekly", locales, now));
    for (const sub of careerSubPages) {
      urls.push(localizedUrl(base, `${ALLIED_PREFIX}${route}/${sub}`, "0.6", "weekly", locales, now));
    }
  }

  const seoLandingPages = [
    "pharmacy-technician-practice-questions", "pharmacy-technician-mock-exam", "pharmacy-technician-study-guide",
    "rrt-practice-questions", "rrt-mock-exam", "rrt-study-guide",
    "social-worker-exam-prep", "social-worker-career-guide", "social-worker-study-guide", "social-worker-practice-questions",
    "psychotherapist-exam-prep", "psychotherapist-career-guide", "psychotherapist-study-guide", "psychotherapist-practice-questions",
    "addictions-counsellor-exam-prep", "addictions-counsellor-career-guide", "addictions-counsellor-study-guide", "addictions-counsellor-practice-questions",
    "occupational-therapy-exam-prep", "occupational-therapy-career-guide", "occupational-therapy-study-guide", "occupational-therapy-practice-questions",
  ];
  for (const page of seoLandingPages) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${page}`, "0.7", "monthly", locales, now));
  }

  const otNamespacedPages = [
    "occupational-therapist/question-bank",
    "occupational-therapist/mock-exams",
    "occupational-therapist/study-plan",
  ];
  for (const page of otNamespacedPages) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${page}`, "0.7", "monthly", locales, now));
  }

  const careerGuidePages = [
    "how-to-become-a-paramedic", "how-to-become-a-respiratory-therapist",
    "how-to-become-a-medical-lab-technologist", "how-to-become-a-radiologic-technologist",
    "how-to-become-a-social-worker", "how-to-become-a-psychotherapist",
    "how-to-become-an-addictions-counselor", "how-to-become-an-occupational-therapist",
    "how-to-become-a-pharmacy-technician",
  ];
  for (const page of careerGuidePages) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${page}`, "0.7", "monthly", locales, now));
  }

  const examPrepPages = [
    "paramedic-exam-prep", "rrt-exam-prep", "mlt-exam-prep", "radiography-exam-prep",
    "social-work-exam-prep", "psychotherapy-exam-prep", "addictions-counselling-exam-prep", "occupational-therapy-exam-prep",
  ];
  for (const page of examPrepPages) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${page}`, "0.7", "monthly", locales, now));
  }

  const programLandingPages = [
    "respiratory-therapy-exam-prep", "paramedic-exam-prep", "medical-lab-tech-exam-prep",
    "diagnostic-imaging-exam-prep", "occupational-therapy-exam-prep", "physical-therapy-exam-prep",
  ];
  for (const page of programLandingPages) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${page}`, "0.8", "monthly", locales, now));
  }

  const topicHubPages = [
    "respiratory-therapy-topics-hub", "paramedic-topics-hub",
  ];
  for (const page of topicHubPages) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${page}`, "0.7", "weekly", locales, now));
  }

  urls.push(localizedUrl(base, `${ALLIED_PREFIX}/pharmacy-technician/drug-classes`, "0.7", "weekly", locales, now));
  const drugClassSlugs = ["ace-inhibitors", "beta-blockers", "statins", "antibiotics", "antidiabetic-drugs", "antidepressants", "antihistamines"];
  for (const slug of drugClassSlugs) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/pharmacy-technician/drug-classes/${slug}`, "0.6", "monthly", locales, now));
  }
  urls.push(localizedUrl(base, `${ALLIED_PREFIX}/pharmacy-technician/practice-exam-questions`, "0.7", "weekly", locales, now));

  return urls;
}

export async function generateAlliedDatabaseContent(): Promise<string[]> {
  const base = getSiteBase();
  const locales = getIndexableLocales();
  const urls: string[] = [];

  const paramedicTables: Record<string, string> = {
    paramedic_topic_pages: `${ALLIED_PREFIX}/paramedic/topic`,
    paramedic_category_pages: `${ALLIED_PREFIX}/paramedic/category`,
    paramedic_glossary_entries: `${ALLIED_PREFIX}/paramedic/glossary`,
    paramedic_comparison_pages: `${ALLIED_PREFIX}/paramedic/compare`,
    paramedic_study_guides: `${ALLIED_PREFIX}/paramedic/study-guide`,
  };

  for (const [tbl, prefix] of Object.entries(paramedicTables)) {
    try {
      const result = await pool.query(
        `SELECT slug, updated_at FROM ${tbl} WHERE status = 'published' AND content_domain = 'paramedic' AND (is_noindex IS NULL OR is_noindex = false)`
      );
      for (const row of result.rows) {
        urls.push(localizedUrl(base, `${prefix}/${row.slug}`, "0.6", "weekly", locales, toLastmod(row.updated_at)));
      }
    } catch {}
  }

  try {
    const { paramedicQuestions } = await import("../../client/src/data/career-questions/paramedic-questions");
    const topicSlugs = new Set<string>();
    for (const q of paramedicQuestions as any[]) {
      const slug = q.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      topicSlugs.add(slug);
    }
    const now = todayDate();
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/paramedic/questions`, "0.7", "weekly", locales, now));
    for (const slug of topicSlugs) {
      urls.push(localizedUrl(base, `${ALLIED_PREFIX}/paramedic/questions/${slug}`, "0.5", "weekly", locales, now));
    }
  } catch {}

  const encyclopediaProfessions = [
    "paramedic", "respiratory-therapy", "mlt", "imaging",
    "social-work", "psychotherapy", "addictions", "occupational-therapy",
  ];
  const now = todayDate();
  for (const prof of encyclopediaProfessions) {
    urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${prof}-encyclopedia`, "0.6", "weekly", locales, now));
  }

  try {
    const programmaticResult = await pool.query(
      `SELECT slug, updated_at FROM programmatic_pages WHERE status = 'published' ORDER BY updated_at DESC`
    );
    for (const row of programmaticResult.rows) {
      urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${row.slug}`, "0.5", "weekly", locales, toLastmod(row.updated_at)));
    }
  } catch {}

  const alliedQuestionSources: { key: string; importPath: string; exportName: string }[] = [
    { key: "rrt", importPath: "../../client/src/data/career-questions/rrt-questions", exportName: "rrtQuestions" },
    { key: "mlt", importPath: "../../client/src/data/career-questions/mlt-questions", exportName: "mltQuestions" },
    { key: "imaging", importPath: "../../client/src/data/career-questions/imaging-questions", exportName: "imagingQuestions" },
  ];
  for (const source of alliedQuestionSources) {
    try {
      const mod = await import(source.importPath);
      const questions = mod[source.exportName] as any[];
      const slugSet = new Set<string>();
      for (const q of questions) {
        const slug = q.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        slugSet.add(slug);
      }
      urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${source.key}/questions`, "0.7", "weekly", locales, now));
      for (const slug of slugSet) {
        urls.push(localizedUrl(base, `${ALLIED_PREFIX}/${source.key}/questions/${slug}`, "0.5", "weekly", locales, now));
      }
    } catch {}
  }

  return urls;
}
