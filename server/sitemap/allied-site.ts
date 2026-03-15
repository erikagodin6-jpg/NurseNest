import { pool } from "../storage";
import {
  getAlliedBase, todayDate, toLastmod, simpleUrl
} from "./helpers";

export async function generateAlliedPages(): Promise<string[]> {
  const base = getAlliedBase();
  const now = todayDate();
  const urls: string[] = [];

  urls.push(simpleUrl(`${base}/`, now, "weekly", "1.0"));
  urls.push(simpleUrl(`${base}/pricing`, now, "monthly", "0.9"));
  urls.push(simpleUrl(`${base}/careers`, now, "monthly", "0.9"));
  urls.push(simpleUrl(`${base}/diagnostic`, now, "weekly", "0.9"));
  urls.push(simpleUrl(`${base}/qbank`, now, "weekly", "0.9"));

  const canonicalCareerRoutes = [
    "/rrt", "/paramedic", "/pharmacy-technician", "/mlt", "/imaging",
    "/social-work", "/psychotherapy", "/addictions", "/occupational-therapy",
  ];
  const careerSubPages = ["mock-exams", "dashboard", "flashcards", "study-plan", "sims", "tools"];

  for (const route of canonicalCareerRoutes) {
    urls.push(simpleUrl(`${base}${route}`, now, "weekly", "0.9"));
    for (const sub of careerSubPages) {
      urls.push(simpleUrl(`${base}${route}/${sub}`, now, "weekly", "0.7"));
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
    urls.push(simpleUrl(`${base}/${page}`, now, "monthly", "0.8"));
  }

  const otNamespacedPages = [
    "occupational-therapist/question-bank",
    "occupational-therapist/mock-exams",
    "occupational-therapist/study-plan",
  ];
  for (const page of otNamespacedPages) {
    urls.push(simpleUrl(`${base}/${page}`, now, "monthly", "0.8"));
  }

  const careerGuidePages = [
    "how-to-become-a-paramedic", "how-to-become-a-respiratory-therapist",
    "how-to-become-a-medical-lab-technologist", "how-to-become-a-radiologic-technologist",
    "how-to-become-a-social-worker", "how-to-become-a-psychotherapist",
    "how-to-become-an-addictions-counselor", "how-to-become-an-occupational-therapist",
    "how-to-become-a-pharmacy-technician",
  ];
  for (const page of careerGuidePages) {
    urls.push(simpleUrl(`${base}/${page}`, now, "monthly", "0.7"));
  }

  const examPrepPages = [
    "paramedic-exam-prep", "rrt-exam-prep", "mlt-exam-prep", "radiography-exam-prep",
    "social-work-exam-prep", "psychotherapy-exam-prep", "addictions-counselling-exam-prep", "occupational-therapy-exam-prep",
  ];
  for (const page of examPrepPages) {
    urls.push(simpleUrl(`${base}/${page}`, now, "monthly", "0.8"));
  }

  const programLandingPages = [
    "respiratory-therapy-exam-prep", "paramedic-exam-prep", "medical-lab-tech-exam-prep",
    "diagnostic-imaging-exam-prep", "occupational-therapy-exam-prep", "physical-therapy-exam-prep",
  ];
  for (const page of programLandingPages) {
    urls.push(simpleUrl(`${base}/${page}`, now, "monthly", "0.9"));
  }

  const topicHubPages = [
    "respiratory-therapy-topics-hub", "paramedic-topics-hub",
  ];
  for (const page of topicHubPages) {
    urls.push(simpleUrl(`${base}/${page}`, now, "weekly", "0.8"));
  }

  urls.push(simpleUrl(`${base}/pharmacy-technician/drug-classes`, now, "weekly", "0.8"));
  const drugClassSlugs = ["ace-inhibitors", "beta-blockers", "statins", "antibiotics", "antidiabetic-drugs", "antidepressants", "antihistamines"];
  for (const slug of drugClassSlugs) {
    urls.push(simpleUrl(`${base}/pharmacy-technician/drug-classes/${slug}`, now, "monthly", "0.7"));
  }
  urls.push(simpleUrl(`${base}/pharmacy-technician/practice-exam-questions`, now, "weekly", "0.8"));

  return urls;
}

export async function generateAlliedDatabaseContent(): Promise<string[]> {
  const base = getAlliedBase();
  const urls: string[] = [];

  const paramedicTables: Record<string, string> = {
    paramedic_topic_pages: "/paramedic/topic",
    paramedic_category_pages: "/paramedic/category",
    paramedic_glossary_entries: "/paramedic/glossary",
    paramedic_comparison_pages: "/paramedic/compare",
    paramedic_study_guides: "/paramedic/study-guide",
  };

  for (const [tbl, prefix] of Object.entries(paramedicTables)) {
    try {
      const result = await pool.query(
        `SELECT slug, updated_at FROM ${tbl} WHERE status = 'published' AND content_domain = 'paramedic' AND (is_noindex IS NULL OR is_noindex = false)`
      );
      for (const row of result.rows) {
        urls.push(simpleUrl(`${base}${prefix}/${row.slug}`, toLastmod(row.updated_at), "weekly", "0.7"));
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
    urls.push(simpleUrl(`${base}/paramedic/questions`, now, "weekly", "0.8"));
    for (const slug of topicSlugs) {
      urls.push(simpleUrl(`${base}/paramedic/questions/${slug}`, now, "weekly", "0.6"));
    }
  } catch {}

  const encyclopediaProfessions = [
    "paramedic", "respiratory-therapy", "mlt", "imaging",
    "social-work", "psychotherapy", "addictions", "occupational-therapy",
  ];
  const now = todayDate();
  for (const prof of encyclopediaProfessions) {
    urls.push(simpleUrl(`${base}/${prof}-encyclopedia`, now, "weekly", "0.7"));
  }

  try {
    const programmaticResult = await pool.query(
      `SELECT slug, updated_at FROM programmatic_pages WHERE status = 'published' ORDER BY updated_at DESC`
    );
    for (const row of programmaticResult.rows) {
      urls.push(simpleUrl(`${base}/${row.slug}`, toLastmod(row.updated_at), "weekly", "0.6"));
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
      urls.push(simpleUrl(`${base}/${source.key}/questions`, now, "weekly", "0.8"));
      for (const slug of slugSet) {
        urls.push(simpleUrl(`${base}/${source.key}/questions/${slug}`, now, "weekly", "0.6"));
      }
    } catch {}
  }

  return urls;
}
