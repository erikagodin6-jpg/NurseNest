import { pool } from "../storage";
import { storage } from "../storage";
import {
  getSiteBase, todayDate, toLastmod, singleLocaleUrl, getIndexableLocales
} from "./helpers";

const LEARN_REDIRECTS: Record<string, string> = {
  "oxygenation-vs-ventilation-critical-differences": "oxygenation-vs-ventilation-clinical-distinction",
  "create-more-posts-about-hyperkalemia": "hyperkalemia-nursing-guide",
  "test-publish-flow-1772145129698": "",
};

interface StaticRoute {
  path: string;
  priority: string;
  changefreq: string;
  multilingual: boolean;
  lastmod?: string;
}

function getStaticRoutes(today: string): StaticRoute[] {
  const multilingualRoutes: Omit<StaticRoute, "multilingual">[] = [
    { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
    { path: "/lessons", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/flashcards", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/pricing", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/start-free", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/anatomy", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/med-math", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/lab-values", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/mock-exams", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/clinical-clarity", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/blog", priority: "0.7", changefreq: "daily", lastmod: today },
    { path: "/pre-nursing", priority: "0.6", changefreq: "monthly", lastmod: today },
    { path: "/question-of-the-day", priority: "0.9", changefreq: "daily", lastmod: today },
    { path: "/question-bank", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/lectures", priority: "0.7", changefreq: "weekly", lastmod: today },
    { path: "/nursing", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/nursing-specialties", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/nursing-certifications", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/study-pathways", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/faq", priority: "0.5", changefreq: "monthly" },
    { path: "/about", priority: "0.6", changefreq: "monthly" },
    { path: "/contact", priority: "0.4", changefreq: "monthly" },
    { path: "/terms", priority: "0.3", changefreq: "yearly" },
    { path: "/privacy", priority: "0.3", changefreq: "yearly" },
    { path: "/nclex-rn-practice-questions", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/nclex-pn-practice-questions", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/rex-pn-practice-questions", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/np-exam-practice-questions", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/free-practice", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/practice-questions", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/glossary", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/medication-mastery", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/exam-prep", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/new-graduate-support", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/healthcare-careers", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/guides", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/guides/complete-guide-to-becoming-a-registered-nurse", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/guides/complete-guide-to-becoming-an-rpn-lvn", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/guides/complete-guide-to-becoming-a-respiratory-therapist", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/guides/complete-guide-to-becoming-a-paramedic", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/guides/complete-guide-to-becoming-a-medical-lab-technologist", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/topics", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/allied-health", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/pass-nclex-first-time", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/pharmacology", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/rex-pn", priority: "0.9", changefreq: "monthly", lastmod: today },
    { path: "/rex-pn/exam-format", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/rex-pn/test-taking-strategies", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/rex-pn/wellness", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/rpn/test-bank", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/rn/test-bank", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/np/test-bank", priority: "0.8", changefreq: "weekly", lastmod: today },
    { path: "/perioperative-nursing", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/preoperative-care", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/preoperative-nursing-guide", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/perioperative-nurse-career", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/nclex-rn/mock-exam", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/nclex-pn/mock-exam", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/rex-pn/mock-exam", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/canada-np/mock-exam", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/us-np/mock-exam", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/nclex-rn", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/nclex-pn", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/canada-np", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/us-np", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/how-to-become-a-nurse/rpn", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/how-to-become-a-nurse/rn", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/how-to-become-a-nurse/np", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/medical-imaging", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/medical-imaging/canada", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/medical-imaging/usa", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/medical-imaging/blog", priority: "0.8", changefreq: "daily", lastmod: today },
    { path: "/radiography-practice-questions", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/radiography-positioning-guide", priority: "0.9", changefreq: "weekly", lastmod: today },
    { path: "/radiography-artifact-recognition", priority: "0.9", changefreq: "weekly", lastmod: today },
  ];

  const enOnlyRoutes: Omit<StaticRoute, "multilingual">[] = [
    { path: "/case-simulations", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/first-action-simulator", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/safety-hazard-simulator", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/iv-complications-simulator", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/electrolyte-abg-simulator", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/deteriorating-patient-simulator", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/blood-transfusion-simulator", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/simulators/clinical-skills", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/simulators/osce", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/simulators/clinical-lab", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/shop", priority: "0.7", changefreq: "weekly", lastmod: today },
    { path: "/disclaimer", priority: "0.3", changefreq: "yearly" },
    { path: "/refund-policy", priority: "0.3", changefreq: "yearly" },
    { path: "/clinical-skills", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/clinical-case-studies", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/for-institutions", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/order-of-the-draw", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/applynest", priority: "0.8", changefreq: "monthly", lastmod: today },
    { path: "/applynest/resume-templates", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/applynest/interview-prep", priority: "0.7", changefreq: "monthly", lastmod: today },
    { path: "/applynest/job-search-guide", priority: "0.7", changefreq: "monthly", lastmod: today },
  ];

  return [
    ...multilingualRoutes.map(r => ({ ...r, multilingual: true })),
    ...enOnlyRoutes.map(r => ({ ...r, multilingual: false })),
  ];
}

export async function generateLanguageSitemap(targetLocale: string): Promise<string[]> {
  const base = getSiteBase();
  const today = todayDate();
  const allLocales = getIndexableLocales() || ["en"];
  const urls: string[] = [];

  if (!allLocales.includes(targetLocale)) {
    return urls;
  }

  const staticRoutes = getStaticRoutes(today);
  for (const route of staticRoutes) {
    if (!route.multilingual && targetLocale !== "en") continue;
    const localesForRoute = route.multilingual ? allLocales : ["en"];
    urls.push(singleLocaleUrl(base, route.path, targetLocale, localesForRoute, route.priority, route.changefreq, route.lastmod));
  }

  const comparePages = [
    "uworld-vs-archer-vs-nursenest", "best-uworld-alternatives-nclex",
    "best-rex-pn-question-bank-canada", "nursenest-vs-uworld",
    "nursenest-vs-archer", "nursenest-vs-quizlet",
    "best-nclex-prep-canada", "cheapest-nclex-prep", "rex-pn-practice-questions-free",
  ];
  for (const slug of comparePages) {
    urls.push(singleLocaleUrl(base, `/compare/${slug}`, targetLocale, allLocales, "0.7", "monthly", today));
  }

  const nursingQuestionTiers = ["rpn", "rn", "np"];
  for (const tier of nursingQuestionTiers) {
    urls.push(singleLocaleUrl(base, `/${tier}/questions`, targetLocale, allLocales, "0.8", "weekly", today));
  }

  try {
    const result = await pool.query(
      `SELECT slug, updated_at FROM lessons WHERE status = 'published' ORDER BY updated_at DESC`
    );
    for (const lesson of result.rows) {
      urls.push(singleLocaleUrl(base, `/lessons/${lesson.slug}`, targetLocale, allLocales, "0.8", "weekly", toLastmod(lesson.updated_at)));
    }
  } catch {}

  try {
    const nursingTopicResult = await pool.query(
      `SELECT DISTINCT tier, topic FROM exam_questions WHERE status = 'published' AND topic IS NOT NULL AND topic != '' AND tier IN ('rpn', 'rn', 'np') ORDER BY topic`
    );
    const seenSlugs = new Set<string>();
    for (const row of nursingTopicResult.rows) {
      const slug = row.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const key = `${row.tier}/${slug}`;
      if (slug && !seenSlugs.has(key)) {
        seenSlugs.add(key);
        urls.push(singleLocaleUrl(base, `/${row.tier}/questions/${slug}`, targetLocale, allLocales, "0.7", "weekly", today));
      }
    }
  } catch {}

  try {
    const previewTopicResult = await pool.query(
      `SELECT DISTINCT topic FROM exam_questions WHERE status = 'published' AND career_type = 'nursing' AND topic IS NOT NULL AND topic != '' ORDER BY topic`
    );
    const previewSeen = new Set<string>();
    for (const row of previewTopicResult.rows) {
      const slug = row.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (slug && !previewSeen.has(slug)) {
        previewSeen.add(slug);
        urls.push(singleLocaleUrl(base, `/questions/${slug}`, targetLocale, allLocales, "0.7", "weekly", today));
      }
    }
  } catch {}

  const practiceQuestionCombos = [
    { tier: "rpn", systems: ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "endocrine", "renal", "pharmacology", "hematology", "maternal", "pediatric", "mental-health", "musculoskeletal", "assessment"] },
    { tier: "rn", systems: ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "endocrine", "renal", "pharmacology", "hematology", "maternal", "pediatric", "mental-health", "musculoskeletal", "assessment"] },
    { tier: "np", systems: ["cardiovascular", "respiratory", "neurological", "gastrointestinal", "endocrine", "renal", "pharmacology", "hematology", "assessment"] },
  ];
  for (const combo of practiceQuestionCombos) {
    for (const system of combo.systems) {
      urls.push(singleLocaleUrl(base, `/practice-questions/${combo.tier}/${system}`, targetLocale, allLocales, "0.8", "weekly", today));
    }
  }

  try {
    const result = await pool.query(
      `SELECT slug, updated_at FROM flashcard_decks WHERE visibility = 'public' AND slug IS NOT NULL ORDER BY updated_at DESC LIMIT 5000`
    );
    for (const deck of result.rows) {
      if (deck.slug) {
        urls.push(singleLocaleUrl(base, `/flashcards/deck/${deck.slug}`, targetLocale, allLocales, "0.6", "weekly", toLastmod(deck.updated_at)));
      }
    }
  } catch {}

  const glossaryTermSlugs = [
    "auscultation","blood-pressure","bradycardia","tachycardia","cardiac-output","stroke-volume","preload","afterload",
    "myocardial-infarction","heart-failure","pulmonary-embolism","deep-vein-thrombosis","atrial-fibrillation","sinus-rhythm",
    "st-elevation","qrs-complex","p-wave","t-wave","ventricular-tachycardia","ventricular-fibrillation",
    "hemoglobin","hematocrit","potassium","sodium","calcium","magnesium","bun","creatinine","inr","troponin","abg",
    "metabolic-acidosis","metabolic-alkalosis","respiratory-acidosis","respiratory-alkalosis",
    "anaphylaxis","sepsis","septic-shock","diabetic-ketoacidosis","siadh","diabetes-insipidus",
    "pneumothorax","copd","asthma","stroke","increased-intracranial-pressure",
    "glasgow-coma-scale","apgar-score","braden-scale","pain-assessment","sbar","head-to-toe-assessment","vital-signs","pulse-oximetry",
    "epinephrine","warfarin","heparin","digoxin","ace-inhibitors","beta-blockers","nitroglycerin","insulin","morphine","naloxone",
    "dopamine","furosemide","amiodarone",
    "foley-catheter","nasogastric-tube","central-line","lumbar-puncture","tracheostomy","chest-tube","blood-transfusion",
    "wound-vac","mechanical-ventilation","endotracheal-intubation","iv-insertion","sterile-technique",
    "atelectasis","pleural-effusion","acute-kidney-injury","cirrhosis","pancreatitis",
    "hypothyroidism","hyperthyroidism","addison-disease","cushing-syndrome","compartment-syndrome",
    "malignant-hyperthermia","dic","tumor-lysis-syndrome","eclampsia","hellp-syndrome",
    "placenta-previa","abruptio-placentae","neonatal-respiratory-distress-syndrome",
    "delegation","nursing-process","informed-consent","alveoli","diaphragm",
    "sinoatrial-node","atrioventricular-node","nephron","glomerular-filtration-rate",
    "cerebral-perfusion-pressure","myelin-sheath","peritoneum","hemostasis",
    "wbc-count","platelet-count","albumin","lactate","prothrombin-time","aptt",
    "cardiogenic-shock","hypovolemic-shock","distributive-shock","infective-endocarditis",
    "aortic-dissection","peripheral-artery-disease","autonomic-dysreflexia","rhabdomyolysis",
    "guillain-barre-syndrome","meningitis","burns-classification","pacemaker","defibrillation",
    "cardioversion","arterial-blood-gas-sampling","incentive-spirometry","suctioning",
  ];
  for (const slug of glossaryTermSlugs) {
    urls.push(singleLocaleUrl(base, `/glossary/${slug}`, targetLocale, allLocales, "0.5", "monthly", today));
  }

  const clarityTopics = [
    "why-does-hyperkalemia-cause-cardiac-arrest","why-does-dka-cause-fruity-breath",
    "why-do-opioids-cause-constipation","why-does-preeclampsia-cause-seizures",
    "why-does-heart-failure-cause-edema","why-does-anemia-cause-tachycardia",
    "why-does-pneumothorax-cause-tracheal-deviation","why-does-hypothyroidism-cause-weight-gain",
    "why-does-diabetes-cause-peripheral-neuropathy","why-does-immobility-cause-deep-vein-thrombosis",
    "why-does-hyperglycemia-cause-polyuria","why-does-copd-cause-barrel-chest",
    "why-does-pancreatitis-cause-hypocalcemia","why-does-cirrhosis-cause-ascites",
    "why-do-burns-cause-hyperkalemia","why-does-a-stroke-cause-dysphagia",
    "why-does-acute-kidney-injury-cause-metabolic-acidosis","why-does-myocardial-infarction-cause-cardiogenic-shock",
    "why-does-hypoxia-cause-restlessness-before-drowsiness","why-does-atrial-fibrillation-cause-stroke",
    "why-does-addisons-disease-cause-hyperpigmentation","why-does-spinal-cord-injury-cause-autonomic-dysreflexia",
    "why-does-blood-transfusion-cause-hyperkalemia","why-does-nephrotic-syndrome-cause-edema",
    "why-does-pyloric-stenosis-cause-metabolic-alkalosis","why-does-cushing-syndrome-cause-moon-face",
    "why-does-iron-deficiency-cause-pica","why-does-sickle-cell-crisis-cause-severe-pain",
    "why-does-magnesium-deficiency-worsen-hypokalemia","why-does-meningitis-cause-neck-stiffness",
    "why-does-thyroid-storm-cause-hyperthermia","why-does-calcium-affect-muscle-contraction",
    "why-does-massive-pe-cause-right-heart-failure","why-does-rhabdomyolysis-cause-acute-kidney-injury",
    "why-does-guillain-barre-cause-ascending-paralysis",
  ];
  for (const slug of clarityTopics) {
    urls.push(singleLocaleUrl(base, `/clinical-clarity/${slug}`, targetLocale, allLocales, "0.6", "monthly", today));
  }

  try {
    const publishedContent = await storage.getPublishedContent();
    const blogTypes = ["blog", "blog-post", "article"];
    const blogPosts = publishedContent.filter((item) => {
      if (!blogTypes.includes(item.type || "") || !item.slug) return false;
      const contentLen = JSON.stringify(item.content || "").length;
      if (contentLen < 5000) return false;
      if (item.slug in LEARN_REDIRECTS) return false;
      return true;
    });
    for (const post of blogPosts) {
      const lastmod = post.updatedAt ? toLastmod(post.updatedAt) : (post.publishedAt ? toLastmod(post.publishedAt) : today);
      urls.push(singleLocaleUrl(base, `/learn/${post.slug}`, targetLocale, allLocales, "0.6", "weekly", lastmod));
    }
  } catch {}

  try {
    const { internalLinkMap } = await import("../../client/src/data/internal-links");
    const topicSlugs = Object.keys(internalLinkMap);
    for (const slug of topicSlugs) {
      urls.push(singleLocaleUrl(base, `/topics/${slug}`, targetLocale, allLocales, "0.7", "monthly", today));
    }
  } catch {}

  const seoConditions = ["hypertension", "diabetes", "asthma", "copd", "heart-failure", "sepsis", "pneumonia"];
  for (const c of seoConditions) {
    urls.push(singleLocaleUrl(base, `/conditions/${c}`, targetLocale, allLocales, "0.8", "monthly", today));
  }

  const seoMedications = ["metformin", "lisinopril", "warfarin", "insulin", "amiodarone"];
  for (const m of seoMedications) {
    urls.push(singleLocaleUrl(base, `/medications/${m}`, targetLocale, allLocales, "0.8", "monthly", today));
  }

  const seoLabValues = ["sodium", "potassium", "troponin", "creatinine", "inr"];
  for (const l of seoLabValues) {
    urls.push(singleLocaleUrl(base, `/lab-values/${l}`, targetLocale, allLocales, "0.8", "monthly", today));
  }

  try {
    const seoPages = await pool.query(
      `SELECT slug, country, updated_at FROM imaging_seo_pages WHERE status = 'published' ORDER BY updated_at DESC LIMIT 5000`
    );
    for (const page of seoPages.rows) {
      urls.push(singleLocaleUrl(base, `/medical-imaging/${page.country}/seo/${page.slug}`, targetLocale, allLocales, "0.7", "weekly", toLastmod(page.updated_at)));
    }
  } catch {}

  try {
    const blogArticles = await pool.query(
      `SELECT slug, updated_at FROM imaging_blog_articles WHERE status = 'published' ORDER BY updated_at DESC LIMIT 5000`
    );
    for (const article of blogArticles.rows) {
      urls.push(singleLocaleUrl(base, `/medical-imaging/blog/${article.slug}`, targetLocale, allLocales, "0.7", "weekly", toLastmod(article.updated_at)));
    }
  } catch {}

  try {
    const posEntries = await pool.query(
      `SELECT slug, country, updated_at FROM imaging_positioning_entries WHERE status = 'published' ORDER BY updated_at DESC LIMIT 5000`
    );
    for (const entry of posEntries.rows) {
      urls.push(singleLocaleUrl(base, `/medical-imaging/${entry.country}/positioning/${entry.slug}`, targetLocale, allLocales, "0.7", "monthly", toLastmod(entry.updated_at)));
    }
  } catch {}

  const medImagingSubPages = [
    "/medical-imaging/canada/lessons", "/medical-imaging/canada/positioning",
    "/medical-imaging/canada/physics", "/medical-imaging/canada/flashcards",
    "/medical-imaging/canada/practice-exams", "/medical-imaging/canada/exam-simulator",
    "/medical-imaging/usa/lessons", "/medical-imaging/usa/positioning",
    "/medical-imaging/usa/physics", "/medical-imaging/usa/flashcards",
    "/medical-imaging/usa/practice-exams", "/medical-imaging/usa/exam-simulator",
  ];
  for (const subPath of medImagingSubPages) {
    urls.push(singleLocaleUrl(base, subPath, targetLocale, allLocales, "0.8", "weekly", today));
  }

  return urls;
}
