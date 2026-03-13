import { pool } from "./storage";
import * as fs from "fs";
import * as path from "path";
import { seoTitleMap } from "./seo-title-map";
import { isLocaleIndexable, getIndexableLocales, getHreflangCode, getLocaleDirection } from "./translation-audit";

const SITE_BASE = "https://www.nursenest.ca";

const SUPPORTED_LOCALES_LIST = ["en", "fr", "es", "fil", "hi", "zh", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa"];

let lessonSeoData: Record<string, any> | null = null;
function getLessonSeoData(): Record<string, any> {
  if (!lessonSeoData) {
    try {
      const dataPath = path.join(__dirname, "lesson-seo-data.json");
      lessonSeoData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    } catch {
      lessonSeoData = {};
    }
  }
  return lessonSeoData!;
}

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: string;
  noscriptContent?: string;
  noindex?: boolean;
  breadcrumbs?: { name: string; url: string }[];
  ogImage?: string;
}

const NOINDEX_PATHS = new Set([
  "/admin",
  "/content-editor",
  "/login",
  "/register",
  "/profile",
  "/reports",
  "/dashboard",
  "/subscription/success",
  "/subscription/cancel",
  "/upgrade",
  "/feedback",
  "/diagnostic-assessment",
  "/probability-simulator",
  "/settings",
  "/notes",
  "/invite",
  "/reset-password",
  "/verify-email",
]);

function isNoindexPath(path: string): boolean {
  if (NOINDEX_PATHS.has(path)) return true;
  if (path.startsWith("/admin")) return true;
  if (path.startsWith("/content-editor")) return true;
  if (/^\/mock-exams\/[^/]+/.test(path)) return true;
  if (path.startsWith("/dashboard")) return true;
  if (path.startsWith("/flashcards/deck/")) return true;
  if (path.startsWith("/trial/")) return true;
  if (path.startsWith("/trial")) return true;
  if (path.startsWith("/account")) return true;
  if (path.startsWith("/checkout")) return true;
  if (path.startsWith("/subscription")) return true;
  return false;
}

function buildBreadcrumbs(pathname: string): { name: string; url: string }[] {
  const crumbs: { name: string; url: string }[] = [
    { name: "Home", url: `${SITE_BASE}/` },
  ];

  const lessonMatch = pathname.match(/^\/lessons\/(.+)$/);
  if (lessonMatch) {
    crumbs.push({ name: "Lessons", url: `${SITE_BASE}/lessons` });
    crumbs.push({ name: stripTierFromSeoTitle(slugToTitle(lessonMatch[1])), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const clarityMatch = pathname.match(/^\/clinical-clarity\/(.+)$/);
  if (clarityMatch) {
    crumbs.push({ name: "Clinical Clarity", url: `${SITE_BASE}/clinical-clarity` });
    crumbs.push({ name: slugToTitle(clarityMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const learnMatch = pathname.match(/^\/learn\/(.+)$/);
  if (learnMatch) {
    crumbs.push({ name: "Blog", url: `${SITE_BASE}/blog` });
    crumbs.push({ name: slugToTitle(learnMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const shopMatch = pathname.match(/^\/shop\/(.+)$/);
  if (shopMatch) {
    crumbs.push({ name: "Store", url: `${SITE_BASE}/shop` });
    crumbs.push({ name: slugToTitle(shopMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const careerMatch = pathname.match(/^\/career-development\/(.+)$/);
  if (careerMatch) {
    crumbs.push({ name: "Career Development", url: `${SITE_BASE}/new-grad` });
    crumbs.push({ name: slugToTitle(careerMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const newGradCareerMatch = pathname.match(/^\/new-grad\/career\/(.+)$/);
  if (newGradCareerMatch) {
    crumbs.push({ name: "New Grad Hub", url: `${SITE_BASE}/new-grad` });
    crumbs.push({ name: slugToTitle(newGradCareerMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const newGradMatch = pathname.match(/^\/new-grad(\/.*)?$/);
  if (newGradMatch && newGradMatch[1] && newGradMatch[1] !== "/") {
    crumbs.push({ name: "New Grad Hub", url: `${SITE_BASE}/new-grad` });
    const sub = newGradMatch[1].replace(/^\//, "").split("/").pop() || "";
    if (sub) crumbs.push({ name: slugToTitle(sub), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const tierLabels: Record<string, string> = { rpn: "RPN / LVN", rn: "RN", np: "Nurse Practitioner" };
  const nursingQuestionTopicMatch = pathname.match(/^\/(rpn|rn|np)\/questions\/(.+)$/);
  if (nursingQuestionTopicMatch) {
    const [, t, topicSlug] = nursingQuestionTopicMatch;
    crumbs.push({ name: tierLabels[t] || t.toUpperCase(), url: `${SITE_BASE}/${t}` });
    crumbs.push({ name: "Practice Questions", url: `${SITE_BASE}/${t}/questions` });
    crumbs.push({ name: slugToTitle(topicSlug), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const nursingQuestionsIndexMatch = pathname.match(/^\/(rpn|rn|np)\/questions$/);
  if (nursingQuestionsIndexMatch) {
    const t = nursingQuestionsIndexMatch[1];
    crumbs.push({ name: tierLabels[t] || t.toUpperCase(), url: `${SITE_BASE}/${t}` });
    crumbs.push({ name: "Practice Questions", url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const careerPageMatch = pathname.match(/^\/how-to-become-a-nurse\/(.+)$/);
  if (careerPageMatch) {
    crumbs.push({ name: "How to Become a Nurse", url: `${SITE_BASE}/how-to-become-a-nurse/rpn` });
    crumbs.push({ name: tierLabels[careerPageMatch[1]] || slugToTitle(careerPageMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const conditionMatch = pathname.match(/^\/conditions\/(.+)$/);
  if (conditionMatch) {
    crumbs.push({ name: "Conditions", url: `${SITE_BASE}/conditions` });
    crumbs.push({ name: slugToTitle(conditionMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  const medicationMatch = pathname.match(/^\/medications\/(.+)$/);
  if (medicationMatch) {
    crumbs.push({ name: "Medications", url: `${SITE_BASE}/medications` });
    crumbs.push({ name: slugToTitle(medicationMatch[1]), url: `${SITE_BASE}${pathname}` });
    return crumbs;
  }

  if (pathname !== "/") {
    const pageName = staticPages[pathname]?.title?.split(" | ")[0]?.split(" - ")[0] || slugToTitle(pathname.replace(/^\//, ""));
    crumbs.push({ name: pageName, url: `${SITE_BASE}${pathname}` });
  }

  return crumbs;
}

function stripTierFromSeoTitle(title: string): string {
  return title
    .replace(/^(RN|NP|RPN|LVN|NCLEX|NCLEX-RN|NCLEX-PN|REx-PN)\s+/i, "")
    .replace(/\s+\((RN|NP|RPN|LVN|NCLEX|RPN\/LVN|RPN\/RN)\)$/i, "")
    .replace(/\s*-\s*Nursing Lesson$/i, "")
    .trim();
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bRpn\b/g, "RPN")
    .replace(/\bRn\b/g, "RN")
    .replace(/\bNp\b/g, "NP")
    .replace(/\bIcp\b/g, "ICP")
    .replace(/\bDka\b/g, "DKA")
    .replace(/\bHhns\b/g, "HHNS")
    .replace(/\bCopd\b/g, "COPD")
    .replace(/\bAki\b/g, "AKI")
    .replace(/\bCkd\b/g, "CKD")
    .replace(/\bAbg\b/g, "ABG")
    .replace(/\bPe\b/g, "PE")
    .replace(/\bDvt\b/g, "DVT")
    .replace(/\bMi\b/g, "MI")
    .replace(/\bHf\b/g, "HF")
    .replace(/\bSiadh\b/g, "SIADH")
    .replace(/\bDi\b/g, "DI")
    .replace(/\bArds\b/g, "ARDS")
    .replace(/\bTb\b/g, "TB")
    .replace(/\bOsa\b/g, "OSA")
    .replace(/\bSbar\b/g, "SBAR")
    .replace(/\bGcs\b/g, "GCS")
    .replace(/\bNih\b/g, "NIH")
    .replace(/\bEcg\b/g, "ECG")
    .replace(/\bSofa\b/g, "SOFA")
    .replace(/\bApache\b/g, "APACHE")
    .replace(/\bPph\b/g, "PPH")
    .replace(/\bNec\b/g, "NEC")
    .replace(/\bIv\b/g, "IV")
    .replace(/\bPpe\b/g, "PPE")
    .replace(/\bAdhd\b/g, "ADHD")
    .replace(/\bGi\b/g, "GI")
    .replace(/\bIbs\b/g, "IBS")
    .replace(/\bAml\b/g, "AML")
    .replace(/\bHep\b/g, "Hep")
    .replace(/\bChf\b/g, "CHF")
    .replace(/\bAdpie\b/g, "ADPIE")
    .replace(/\bAaa\b/g, "AAA")
    .replace(/\bHellp\b/g, "HELLP")
    .replace(/\bHie\b/g, "HIE")
    .replace(/\bRds\b/g, "RDS")
    .replace(/\bCdiff\b/g, "C. diff")
    .replace(/\bDar\b/g, "DAR")
    .replace(/\bNgtube\b/g, "NG Tube")
    .replace(/\bAv\b/g, "AV")
    .replace(/\bVac\b/g, "VAC")
    .replace(/\bErcp\b/g, "ERCP")
    .replace(/\bEgd\b/g, "EGD")
    .replace(/\bMgmt\b/g, "Management")
    .replace(/\bMeds\b/g, "Medications")
    .replace(/\bOb\b/g, "OB")
    .replace(/\bUs\b/g, "US")
    .replace(/\bTestbank\b/g, "Test Bank");
}

const staticPages: Record<string, { title: string; description: string }> = {
  "/": {
    title: "NurseNest - NCLEX & NCLEX-PN / REx-PN Exam Prep | Nursing Question Bank, Simulations & Flashcards",
    description: "Prepare for NCLEX, NCLEX-PN, and REx-PN with NurseNest. 1,200+ nursing practice questions, clinical case simulations, pharmacology flashcards, and 200+ pathophysiology lessons for RPN/LVN, RN, and NP students in Canada and the US. New content added weekly. Start free - no credit card required.",
  },
  "/lessons": {
    title: "Nursing Lessons - Pathophysiology & Clinical Topics | NurseNest",
    description: "Browse 200+ clinical nursing lessons covering pathophysiology, pharmacology, and patient care for RPN/LVN, RN, and NP students. Interactive content with exam prep focus.",
  },
  "/flashcards": {
    title: "Nursing Flashcards - Pharmacology & Clinical Review | NurseNest",
    description: "Study with interactive nursing flashcards covering pharmacology, pathophysiology, and clinical concepts. Track mastery and bookmark cards for focused review.",
  },
  "/pricing": {
    title: "Pricing Plans - RPN, RN & NP Subscriptions | NurseNest",
    description: "Choose your NurseNest subscription plan. RPN/LVN $29.99/mo, RN/NCLEX $39.99/mo, NP Advanced $49.99/mo. Start with a free trial - no credit card required.",
  },
  "/start-free": {
    title: "Start Free - Begin Your Nursing Exam Prep | NurseNest",
    description: "Start your free NurseNest account today. Access nursing lessons, flashcards, and practice questions to begin preparing for NCLEX, NCLEX-PN, and REx-PN exams.",
  },
  "/anatomy": {
    title: "Anatomy & Physiology Review | NurseNest",
    description: "Review anatomy and physiology fundamentals for nursing students. Body systems, structures, and clinical correlations for exam preparation.",
  },
  "/med-math": {
    title: "Med Math Practice - Dosage Calculations | NurseNest",
    description: "Practice medication math and dosage calculations with randomized problems and step-by-step solutions. Essential for nursing exam preparation.",
  },
  "/lab-values": {
    title: "Lab Values Interpretation - Abnormal Clinical Findings | NurseNest",
    description: "Master abnormal lab value interpretation with cluster-based scenarios. Practice identifying critical values and clinical correlations for nursing exams.",
  },
  "/mock-exams": {
    title: "Mock Exams - NCLEX & NCLEX-PN / REx-PN Practice Tests | NurseNest",
    description: "Take timed mock exams simulating NCLEX, NCLEX-PN, and REx-PN format. Track your scores, identify weak areas, and review detailed rationales.",
  },
  "/clinical-clarity": {
    title: "Clinical Clarity - Why Does This Happen? | NurseNest",
    description: "Understand the 'why' behind clinical phenomena. Evidence-based explanations for pathophysiology concepts nursing students need to know.",
  },
  "/case-simulations": {
    title: "Clinical Case Simulations - Nursing Scenarios | NurseNest",
    description: "Practice clinical decision-making with branching case simulations. Manage patient scenarios with vitals, labs, and real-time feedback.",
  },
  "/first-action-simulator": {
    title: "First Action Prioritization Simulator - Nursing Priority | NurseNest",
    description: "Practice choosing the FIRST nursing action in clinical scenarios. Tier-scoped RPN, RN, and NP scenarios with immediate feedback and NCLEX-style rationales.",
  },
  "/safety-hazard-simulator": {
    title: "Safety & Hazard Detection Engine - Free Nursing Practice | NurseNest",
    description: "Free interactive patient safety training. Identify fall risks, medication errors, infection breaches, and equipment hazards in clinical environments.",
  },
  "/iv-complications-simulator": {
    title: "IV Complications Simulator - Free Nursing Practice | NurseNest",
    description: "Free interactive IV complication recognition. Identify infiltration, extravasation, phlebitis, air embolism, and more with nursing interventions.",
  },
  "/electrolyte-abg-simulator": {
    title: "Electrolyte & ABG Interpretation Engine | NurseNest",
    description: "Master electrolyte imbalances and arterial blood gas interpretation. Interactive cases with ECG clues, stepwise ABG analysis, and exam trap warnings.",
  },
  "/deteriorating-patient-simulator": {
    title: "Deteriorating Patient Simulator - Clinical Escalation | NurseNest",
    description: "Manage deteriorating patients with staged vital sign changes. Practice ABCs priority, escalation decisions, and time-critical interventions.",
  },
  "/blood-transfusion-simulator": {
    title: "Blood Transfusion Compatibility & Reactions | NurseNest",
    description: "Practice ABO/Rh compatibility, recognize transfusion reactions (hemolytic, TACO, TRALI), and choose correct nursing interventions.",
  },
  "/medication-mastery": {
    title: "Medication Mastery - Drug Mechanisms & Safety | NurseNest",
    description: "Explore medication mechanisms of action at the receptor level. Pharmacology mastery for nursing students with safety considerations.",
  },
  "/shop": {
    title: "Nursing Study Guides & Cram Booklets | NurseNest Store",
    description: "Download professional nursing cram guides, quick reference sheets, and study bundles. NCLEX-PN, REx-PN, NCLEX-RN, and NP exam prep materials from $19. Instant PDF download.",
  },
  "/blog": {
    title: "Nursing Blog - Evidence-Based Articles | NurseNest",
    description: "Read evidence-based nursing articles with APA7 citations. Clinical topics, exam tips, and professional development for nursing students.",
  },
  "/pre-nursing": {
    title: "Pre-Nursing Resources - Get Started | NurseNest",
    description: "Resources for pre-nursing students considering a career in nursing. Program information, prerequisites, and study tips. Compare NurseNest vs UWorld and Archer for your prep journey.",
  },
  "/compare/uworld-vs-archer-vs-nursenest": {
    title: "UWorld vs Archer vs NurseNest: 3-Way NCLEX Prep Comparison (2025)",
    description: "Compare UWorld ($69/mo), Archer ($59/quarter), and NurseNest ($4.99/mo) side by side. Features, pricing, NCLEX-PN / REx-PN support, and which NCLEX prep platform is best for you.",
  },
  "/compare/best-uworld-alternatives-nclex": {
    title: "Best UWorld Alternatives for NCLEX Prep 2025 | NurseNest",
    description: "Looking for cheaper UWorld alternatives? Compare NurseNest, Archer, and other NCLEX prep options. 4,000+ questions, adaptive testing, and flashcards from $4.99/month.",
  },
  "/compare/best-rex-pn-question-bank-canada": {
    title: "Best REx-PN Question Bank in Canada 2025 | NurseNest",
    description: "Find the best REx-PN question bank for Canadian practical nursing students. NurseNest offers dedicated REx-PN content, CAD pricing, and French language support.",
  },
  "/compare/nursenest-vs-uworld": {
    title: "NurseNest vs UWorld NCLEX: Compare Features & Pricing (2025)",
    description: "Compare NurseNest ($4.99/mo) vs UWorld ($69/mo) for NCLEX prep. Feature-by-feature comparison of question banks, adaptive testing, flashcards, and NCLEX-PN / REx-PN support.",
  },
  "/compare/nursenest-vs-archer": {
    title: "NurseNest vs Archer NCLEX Review: Features & Pricing (2025)",
    description: "Compare NurseNest ($4.99/mo) vs Archer ($59/quarter) for NCLEX prep. Feature comparison of question banks, flashcards, adaptive testing, and Canadian exam support.",
  },
  "/compare/nursenest-vs-quizlet": {
    title: "NurseNest vs Quizlet for Nursing: Compare Features (2025)",
    description: "Compare NurseNest ($4.99/mo) vs Quizlet+ ($7.99/mo) for nursing exam prep. Purpose-built nursing tools vs generic flashcard apps.",
  },
  "/compare/best-nclex-prep-canada": {
    title: "Best NCLEX & REx-PN Prep in Canada (2025) | NurseNest",
    description: "Find the best NCLEX and REx-PN prep for Canadian nursing students. Compare features, CAD pricing, and Canadian exam-specific content.",
  },
  "/compare/cheapest-nclex-prep": {
    title: "Cheapest NCLEX Prep 2025: Affordable Study Tools Compared",
    description: "Find the most affordable NCLEX prep in 2025. Compare NurseNest ($4.99/mo) vs UWorld ($69/mo) vs Archer ($59/quarter) vs Quizlet+ ($7.99/mo).",
  },
  "/compare/rex-pn-practice-questions-free": {
    title: "Free REx-PN Practice Questions 2025 | NurseNest Canada",
    description: "Access free REx-PN practice questions for Canadian practical nursing exam prep. Daily questions, detailed rationales, and full mock exams.",
  },
  "/about": {
    title: "About NurseNest | Our Mission, Story & Editorial Standards",
    description: "NurseNest is a nursing education platform founded by Erika Godin, RN. Clinically accurate, evidence-based exam preparation for RPN, RN, and NP students in Canada and the U.S.",
  },
  "/contact": {
    title: "Contact Us | NurseNest",
    description: "Get in touch with the NurseNest team. Questions about subscriptions, content, or features? We're here to help.",
  },
  "/faq": {
    title: "Frequently Asked Questions | NurseNest",
    description: "Find answers to common questions about NurseNest subscriptions, content access, NCLEX prep, and platform features.",
  },
  "/terms": {
    title: "Terms of Use | NurseNest",
    description: "NurseNest Terms of Use. Read our terms and conditions for using the nursing education platform.",
  },
  "/privacy": {
    title: "Privacy Policy | NurseNest",
    description: "NurseNest Privacy Policy. Learn how we collect, use, and protect your personal information.",
  },
  "/disclaimer": {
    title: "Disclaimer | NurseNest",
    description: "NurseNest educational disclaimer. NurseNest is not affiliated with NCLEX, NCSBN, CNO, or any regulatory body.",
  },
  "/refund-policy": {
    title: "Refund Policy | NurseNest",
    description: "NurseNest refund policy. Information about subscription cancellations and refund eligibility.",
  },
  "/feedback": {
    title: "Feedback & Suggestions | NurseNest",
    description: "Share your feedback, feature requests, or report issues. Help us improve NurseNest for nursing students.",
  },
  "/rpn/questions": {
    title: "RPN / LVN Practice Questions by Topic | NurseNest",
    description: "Browse RPN/LVN practice question topics covering all body systems. Free sample questions with detailed clinical rationales for NCLEX-PN and REx-PN exam prep.",
  },
  "/rn/questions": {
    title: "RN Practice Questions by Topic | NurseNest",
    description: "Browse RN practice question topics covering all body systems. Free sample questions with detailed clinical rationales for NCLEX-RN exam preparation.",
  },
  "/np/questions": {
    title: "Nurse Practitioner Practice Questions by Topic | NurseNest",
    description: "Browse NP practice question topics covering advanced clinical scenarios. Free sample questions with detailed rationales for AANP and ANCC certification exam prep.",
  },
  "/how-to-become-a-nurse/rpn": {
    title: "How to Become a Registered Practical Nurse (RPN / LVN) | NurseNest",
    description: "Complete career guide for becoming an RPN/LVN. Education requirements, NCLEX-PN/REx-PN exam info, salary range ($42K-$62K), and step-by-step career path.",
  },
  "/how-to-become-a-nurse/rn": {
    title: "How to Become a Registered Nurse (RN) | NurseNest",
    description: "Complete career guide for becoming an RN. Education requirements, NCLEX-RN exam info, salary range ($60K-$95K), specializations, and step-by-step career path.",
  },
  "/how-to-become-a-nurse/np": {
    title: "How to Become a Nurse Practitioner (NP) | NurseNest",
    description: "Complete career guide for becoming an NP. Education requirements, AANP/ANCC certification exam info, salary range ($95K-$140K), and step-by-step career path.",
  },
  "/lectures": {
    title: "Video Lectures - Nursing Education | NurseNest",
    description: "Watch free nursing video lectures covering pathophysiology, pharmacology, and clinical skills. Visual learning for NCLEX, NCLEX-PN, and REx-PN exam preparation.",
  },
  "/simulators/clinical-skills": {
    title: "Clinical Skills Simulators - Nursing Practice | NurseNest",
    description: "Practice clinical nursing skills with interactive simulators. IV therapy, patient safety, medication administration, and clinical decision-making for nursing students.",
  },
  "/simulators/osce": {
    title: "OSCE Preparation Simulators | NurseNest",
    description: "Prepare for Objective Structured Clinical Examinations (OSCE) with interactive nursing simulators. Practice clinical competencies and assessment skills.",
  },
  "/simulators/clinical-lab": {
    title: "Clinical Lab Simulators - Lab Interpretation | NurseNest",
    description: "Practice clinical lab value interpretation with interactive simulators. ABG analysis, electrolyte interpretation, and diagnostic reasoning for nursing students.",
  },
  "/dashboard": {
    title: "Dashboard | NurseNest",
    description: "Your NurseNest learning dashboard. Track progress, view study analytics, and access your personalized learning path.",
  },
  "/question-of-the-day": {
    title: "Nursing Question of the Day - Free NCLEX Practice | NurseNest",
    description: "Answer a new nursing practice question every day. Free NCLEX, NCLEX-PN, and REx-PN exam prep with detailed rationales. Subscribe for daily email delivery.",
  },
  "/question-bank": {
    title: "Question Bank - 1,200+ Nursing Practice Questions | NurseNest",
    description: "Practice with 1,200+ nursing questions organized by body system and tier. Instant rationale display and progress tracking for NCLEX, NCLEX-PN, and REx-PN prep. New questions added weekly.",
  },
  "/nclex-rn/mock-exam": {
    title: "NCLEX-RN Mock Exam Simulator | Free Practice Test | NurseNest",
    description: "Take a realistic NCLEX-RN mock exam with computer adaptive testing simulation. 145 practice questions, detailed rationales, and performance analytics aligned to the 2024-2026 NCLEX-RN test plan.",
  },
  "/nclex-pn/mock-exam": {
    title: "NCLEX-PN Mock Exam Simulator | Free Practice Test | NurseNest",
    description: "Prepare for the NCLEX-PN with a realistic mock exam simulator. 150 practice questions with computer adaptive testing, rationales, and analytics for LPN/LVN students.",
  },
  "/rex-pn/mock-exam": {
    title: "REx-PN Mock Exam Simulator | Free Practice Test | NurseNest Canada",
    description: "Practice the Canadian REx-PN exam with a realistic mock simulator. 170 questions covering competencies tested on the Regulatory Exam for Practical Nurses in Canada.",
  },
  "/canada-np/mock-exam": {
    title: "Canadian NP Exam (CNPLE) Mock Simulator | NurseNest Canada",
    description: "Prepare for the Canadian Nurse Practitioner Licensing Exam (CNPLE) with a realistic mock exam. 200 advanced practice questions with rationales for NP students in Canada.",
  },
  "/us-np/mock-exam": {
    title: "US NP Certification Exam Mock Simulator (AANP/ANCC) | NurseNest",
    description: "Practice for AANP or ANCC nurse practitioner certification with a realistic mock exam. 175 advanced practice questions covering FNP, AGNP, and specialty content.",
  },
  "/nclex-rn": {
    title: "NCLEX-RN Exam Prep Hub | Study Guides, Mock Exams & Practice Questions | NurseNest",
    description: "Your complete NCLEX-RN exam prep hub. Access mock exams, practice questions, pharmacology flashcards, study guides, and lab value review all in one place.",
  },
  "/nclex-pn": {
    title: "NCLEX-PN Exam Prep Hub | Study Guides, Mock Exams & Practice Questions | NurseNest",
    description: "Your complete NCLEX-PN exam prep hub. Access mock exams, practice questions, pharmacology flashcards, study guides, and lab value review for LPN/LVN students.",
  },
  "/canada-np": {
    title: "Canadian NP (CNPLE) Exam Prep Hub | NurseNest Canada",
    description: "Your complete Canadian Nurse Practitioner exam prep hub. Access CNPLE mock exams, advanced practice questions, pharmacology review, and study guides.",
  },
  "/us-np": {
    title: "US NP Certification (AANP/ANCC) Exam Prep Hub | NurseNest",
    description: "Your complete US Nurse Practitioner certification exam prep hub. Access AANP/ANCC mock exams, advanced practice questions, and study guides.",
  },
  "/nclex-rn-practice-questions": {
    title: "NCLEX-RN Practice Questions | Free RN Exam Prep | NurseNest",
    description: "Practice NCLEX-RN questions with detailed rationales. System-based question banks, timed mock exams, and clinical judgment cases aligned to the 2024-2026 NCLEX-RN test plan.",
  },
  "/nclex-pn-practice-questions": {
    title: "NCLEX-PN Practice Questions | Free PN/LPN Exam Prep | NurseNest",
    description: "Practice NCLEX-PN questions with detailed rationales. RPN-level question banks, timed mock exams, and flashcards aligned to the NCLEX-PN test plan for LPN/LVN students.",
  },
  "/rex-pn-practice-questions": {
    title: "REx-PN Practice Questions | Canadian RPN Exam Prep | NurseNest",
    description: "Practice REx-PN questions with Canadian lab values, SI units, and scope-of-practice language. System-based question banks, timed mock exams, and study packs for Canadian RPN students.",
  },
  "/np-exam-practice-questions": {
    title: "NP Exam Practice Questions | AANP & ANCC Certification Prep | NurseNest",
    description: "Practice NP certification exam questions for AANP, ANCC, FNP-BC, and AGPCNP-BC. Advanced assessment, pharmacology, and clinical management questions with detailed rationales.",
  },
  "/free-practice": {
    title: "Free Nursing Practice Questions | Start Studying Now | NurseNest",
    description: "Try 10 free nursing practice questions with instant rationales. No sign-up required. Test your clinical knowledge before committing to a study plan.",
  },
  "/medical-imaging": {
    title: "Medical Imaging Academy - CAMRT & ARRT Exam Prep | NurseNest",
    description: "Prepare for CAMRT and ARRT radiography certification exams. Practice questions, positioning guides, physics review, flashcards, and adaptive exam simulators for Canada and USA.",
  },
  "/medical-imaging/canada": {
    title: "CAMRT Radiography Exam Prep - Canada | NurseNest",
    description: "Prepare for the CAMRT certification exam with Canada-specific radiographic positioning, radiation safety, patient care, and image evaluation aligned with Canadian practice standards.",
  },
  "/medical-imaging/usa": {
    title: "ARRT Radiography Exam Prep - USA | NurseNest",
    description: "Prepare for the ARRT certification exam with USA-specific radiographic positioning, NRC radiation safety, patient care, and image evaluation aligned with ASRT practice standards.",
  },
  "/medical-imaging/blog": {
    title: "Medical Imaging Blog - Study Guides & Articles | NurseNest",
    description: "Educational articles, how-to guides, and study strategies for radiography students preparing for CAMRT and ARRT certification exams.",
  },
  "/radiography-practice-questions": {
    title: "Radiography Practice Questions - Free CAMRT & ARRT Exam Prep | NurseNest",
    description: "Practice radiography exam questions for CAMRT and ARRT certification. Timed practice exams, detailed rationales, and performance analytics for radiologic technologists.",
  },
  "/radiography-positioning-guide": {
    title: "Radiographic Positioning Guide - Complete Reference | NurseNest",
    description: "Complete radiographic positioning reference with patient positions, central ray directions, anatomy demonstrated, and evaluation criteria for every projection.",
  },
  "/radiography-artifact-recognition": {
    title: "Radiographic Artifact Recognition - Identify & Prevent | NurseNest",
    description: "Learn to identify, prevent, and correct radiographic image artifacts. Covers motion artifacts, equipment artifacts, processing errors, and patient-related artifacts.",
  },
  "/login": {
    title: "Log In | NurseNest",
    description: "Log in to your NurseNest account to access nursing lessons, flashcards, and exam prep tools.",
  },
  "/profile": {
    title: "Your Profile | NurseNest",
    description: "Manage your NurseNest profile, view progress, and customize your learning experience.",
  },
  "/reports": {
    title: "Performance Reports | NurseNest",
    description: "Track your learning progress with detailed performance reports. Identify strengths and weak areas for focused study.",
  },
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function extractTextFromContent(content: any): string {
  if (!content || !Array.isArray(content)) return "";
  const parts: string[] = [];
  for (const block of content) {
    if (typeof block === "string") {
      parts.push(block);
    } else if (block && typeof block === "object") {
      if (block.text) parts.push(block.text);
      if (block.heading) parts.push(block.heading);
      if (block.title) parts.push(block.title);
      if (block.content) {
        if (typeof block.content === "string") parts.push(block.content);
        else if (Array.isArray(block.content)) {
          for (const item of block.content) {
            if (typeof item === "string") parts.push(item);
            else if (item && item.text) parts.push(item.text);
          }
        }
      }
      if (block.items && Array.isArray(block.items)) {
        for (const item of block.items) {
          if (typeof item === "string") parts.push(item);
          else if (item && item.text) parts.push(item.text);
        }
      }
      if (block.sections && Array.isArray(block.sections)) {
        parts.push(extractTextFromContent(block.sections));
      }
    }
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function buildNoscriptHtml(content: any, title: string): string {
  if (!content || !Array.isArray(content)) return "";
  const parts: string[] = [`<h1>${escapeHtml(title)}</h1>`];
  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    if (block.heading) {
      parts.push(`<h2>${escapeHtml(block.heading)}</h2>`);
    }
    if (block.text) {
      parts.push(`<p>${escapeHtml(block.text)}</p>`);
    }
    if (block.content) {
      if (typeof block.content === "string") {
        parts.push(`<p>${escapeHtml(block.content)}</p>`);
      }
    }
    if (block.items && Array.isArray(block.items)) {
      parts.push("<ul>");
      for (const item of block.items) {
        const text = typeof item === "string" ? item : (item?.text || "");
        if (text) parts.push(`<li>${escapeHtml(text)}</li>`);
      }
      parts.push("</ul>");
    }
  }
  return parts.join("\n");
}

function buildLessonContentArray(lesson: any): any[] {
  const blocks: any[] = [];
  if (lesson.cellular) {
    blocks.push({ heading: lesson.cellular.title || "Pathophysiology", text: lesson.cellular.content });
  }
  if (lesson.riskFactors?.length) {
    blocks.push({ heading: "Risk Factors", items: lesson.riskFactors });
  }
  if (lesson.diagnostics?.length) {
    blocks.push({ heading: "Diagnostics", items: lesson.diagnostics });
  }
  if (lesson.signs) {
    const signItems = [...(lesson.signs.left || []), ...(lesson.signs.right || [])];
    if (signItems.length) blocks.push({ heading: "Signs and Symptoms", items: signItems });
  }
  if (lesson.management?.length) {
    blocks.push({ heading: "Management", items: lesson.management });
  }
  if (lesson.nursingActions?.length) {
    blocks.push({ heading: "Nursing Actions", items: lesson.nursingActions });
  }
  if (lesson.medications?.length) {
    for (const med of lesson.medications) {
      blocks.push({ heading: med.name, text: `${med.type} - ${med.action}` });
    }
  }
  if (lesson.pearls?.length) {
    blocks.push({ heading: "Clinical Pearls", items: lesson.pearls });
  }
  if (lesson.lifespan) {
    blocks.push({ heading: lesson.lifespan.title || "Lifespan Considerations", text: lesson.lifespan.content });
  }
  return blocks;
}

async function fetchContentForPath(pathname: string): Promise<{ title: string; content: any; summary?: string; tags?: string[]; category?: string; type?: string; createdAt?: string } | null> {
  const lessonMatch = pathname.match(/^\/lessons\/(.+)$/);
  const blogMatch = pathname.match(/^\/blog\/(.+)$/);
  const clarityMatch = pathname.match(/^\/clinical-clarity\/(.+)$/);

  if (lessonMatch) {
    const slug = lessonMatch[1];
    const data = getLessonSeoData();
    const lesson = data[slug];
    if (lesson) {
      const content = buildLessonContentArray(lesson);
      const desc = lesson.cellular?.content || "";
      return {
        title: lesson.title,
        content,
        summary: desc.substring(0, 300),
        type: "lesson",
      };
    }
    return null;
  }

  const slug = blogMatch?.[1] || clarityMatch?.[1];
  if (!slug) return null;

  try {
    const result = await pool.query(
      "SELECT title, content, summary, tags, category, type, created_at FROM content_items WHERE slug = $1 AND status = 'published' LIMIT 1",
      [slug]
    );
    if (result.rows[0]) {
      return {
        title: result.rows[0].title,
        content: result.rows[0].content,
        summary: result.rows[0].summary,
        tags: result.rows[0].tags,
        category: result.rows[0].category,
        type: result.rows[0].type,
        createdAt: result.rows[0].created_at,
      };
    }
  } catch (e) {}
  return null;
}

export function getPageMeta(pathname: string): PageMeta {
  let cleanPath = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const localeMatch = cleanPath.match(/^\/(en|fr|es|fil|hi|zh|ar|ko|pt|pa|vi|ht|ur|ja|fa)(\/.*|$)/);
  const detectedLocale = localeMatch ? localeMatch[1] : "en";
  const strippedPath = localeMatch ? (localeMatch[2] || "/") : cleanPath;

  const localePrefix = `/${detectedLocale}`;
  const localeIsIndexable = isLocaleIndexable(detectedLocale);
  const isNoindexRoute = isNoindexPath(strippedPath);
  const noindex = isNoindexRoute || !localeIsIndexable;

  const selfCanonicalPath = strippedPath === "/" ? localePrefix : `${localePrefix}${strippedPath}`;
  const canonical = localeIsIndexable && !isNoindexRoute
    ? `${SITE_BASE}${selfCanonicalPath}`
    : `${SITE_BASE}/en${strippedPath === "/" ? "" : strippedPath}`;

  const breadcrumbs = buildBreadcrumbs(strippedPath);
  cleanPath = strippedPath;

  if (staticPages[cleanPath]) {
    const result: PageMeta = {
      title: staticPages[cleanPath].title,
      description: staticPages[cleanPath].description,
      canonical,
      noindex,
      breadcrumbs,
    };
    if (cleanPath === "/lessons") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Nursing Lessons",
        "description": "Browse 200+ clinical nursing lessons covering pathophysiology, pharmacology, and patient care.",
        "url": canonical,
        "numberOfItems": 200,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Pathophysiology Lessons", "url": `${SITE_BASE}/en/lessons` },
          { "@type": "ListItem", "position": 2, "name": "Pharmacology Lessons", "url": `${SITE_BASE}/en/lessons` },
          { "@type": "ListItem", "position": 3, "name": "Clinical Nursing Skills", "url": `${SITE_BASE}/en/lessons` },
        ],
      });
    } else if (cleanPath === "/flashcards") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Nursing Flashcards",
        "description": "Interactive nursing flashcards covering pharmacology, pathophysiology, and clinical concepts.",
        "url": canonical,
        "numberOfItems": 50,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Pharmacology Flashcards", "url": `${SITE_BASE}/en/flashcards` },
          { "@type": "ListItem", "position": 2, "name": "Pathophysiology Flashcards", "url": `${SITE_BASE}/en/flashcards` },
          { "@type": "ListItem", "position": 3, "name": "Clinical Review Flashcards", "url": `${SITE_BASE}/en/flashcards` },
        ],
      });
    } else if (cleanPath === "/question-bank") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": "Nursing Practice Question Bank",
        "description": "1,200+ nursing practice questions organized by body system and tier with instant rationale display.",
        "url": canonical,
        "learningResourceType": "Quiz",
        "educationalLevel": "Professional",
        "provider": { "@type": "Organization", "name": "NurseNest", "url": SITE_BASE },
      });
    } else if (cleanPath === "/practice-questions") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": "Free Nursing Practice Questions",
        "description": "Free nursing practice questions covering NCLEX, NCLEX-PN, and REx-PN content areas with instant rationale display.",
        "url": canonical,
        "learningResourceType": "Quiz",
        "educationalLevel": "Professional",
        "isAccessibleForFree": true,
        "provider": { "@type": "Organization", "name": "NurseNest", "url": SITE_BASE },
      });
    } else if (cleanPath === "/mock-exams") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": "Nursing Mock Exams - NCLEX & NCLEX-PN / REx-PN Practice Tests",
        "description": "Take timed mock exams simulating NCLEX, NCLEX-PN, and REx-PN format with performance analytics.",
        "url": canonical,
        "learningResourceType": "Practice Exam",
        "educationalLevel": "Professional",
        "provider": { "@type": "Organization", "name": "NurseNest", "url": SITE_BASE },
      });
    } else if (cleanPath === "/free-practice") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": "Free Nursing Practice Questions",
        "description": "Start practicing with free nursing exam questions covering all major clinical content areas.",
        "url": canonical,
        "learningResourceType": "Quiz",
        "educationalLevel": "Professional",
        "isAccessibleForFree": true,
        "provider": { "@type": "Organization", "name": "NurseNest", "url": SITE_BASE },
      });
    } else if (cleanPath === "/glossary") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "name": "Nursing Glossary",
        "description": "Comprehensive nursing terminology glossary covering clinical, pharmacological, and pathophysiology terms.",
        "url": canonical,
      });
    } else if (cleanPath === "/case-simulations") {
      result.jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": "Clinical Case Simulations for Nursing Students",
        "description": "Interactive clinical case simulations with branching decision points, critical thinking challenges, and detailed debriefing.",
        "url": canonical,
        "learningResourceType": "Simulation",
        "educationalLevel": "Professional",
        "interactivityType": "active",
        "provider": { "@type": "Organization", "name": "NurseNest", "url": SITE_BASE },
      });
    }
    return result;
  }

  const nursingTopicMeta: Record<string, string> = { rpn: "RPN / LVN", rn: "RN", np: "Nurse Practitioner" };
  const nursingExamMeta: Record<string, string> = { rpn: "NCLEX-PN / REx-PN", rn: "NCLEX-RN", np: "AANP/ANCC" };
  const nursingTopicMatch = cleanPath.match(/^\/(rpn|rn|np)\/questions\/(.+)$/);
  if (nursingTopicMatch) {
    const tier = nursingTopicMatch[1];
    const topicSlug = nursingTopicMatch[2];
    const readable = slugToTitle(topicSlug);
    const tierLabel = nursingTopicMeta[tier] || tier.toUpperCase();
    const examLabel = nursingExamMeta[tier] || tier.toUpperCase();
    return {
      title: `${readable} — ${tierLabel} Practice Questions | NurseNest`,
      description: `Practice ${tierLabel} exam questions on ${readable}. Clinical vignettes with detailed rationales for ${examLabel} exam preparation. Free sample questions included.`,
      canonical,
      noindex,
      breadcrumbs,
      jsonLd: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: `${readable} — ${tierLabel} Practice Questions`,
        description: `Practice questions on ${readable} for ${tierLabel} nursing students preparing for ${examLabel} exams.`,
        url: canonical,
        learningResourceType: "Quiz",
        educationalLevel: "Professional",
        provider: { "@type": "Organization", name: "NurseNest", url: SITE_BASE },
      }),
    };
  }

  const lessonMatch = cleanPath.match(/^\/lessons\/(.+)$/);
  if (lessonMatch) {
    const slug = lessonMatch[1];
    const seoEntry = seoTitleMap[slug];
    if (seoEntry) {
      const cleanSeoTitle = stripTierFromSeoTitle(seoEntry.title);
      return {
        title: `${cleanSeoTitle} | NurseNest`,
        description: seoEntry.description,
        canonical,
        noindex,
        breadcrumbs,
      };
    }
    const readable = stripTierFromSeoTitle(slugToTitle(slug));
    return {
      title: `${readable} | NurseNest`,
      description: `Learn about ${readable} with detailed pathophysiology, clinical findings, nursing interventions, and exam pearls. Evidence-based nursing education for NCLEX, NCLEX-PN, and REx-PN preparation.`,
      canonical,
      noindex,
      breadcrumbs,
    };
  }

  const clarityMatch = cleanPath.match(/^\/clinical-clarity\/(.+)$/);
  if (clarityMatch) {
    const slug = clarityMatch[1];
    const readable = slugToTitle(slug);
    return {
      title: `${readable} - Clinical Clarity | NurseNest`,
      description: `Understand ${readable.toLowerCase()}. Evidence-based pathophysiology explanation for nursing students preparing for NCLEX, NCLEX-PN, and REx-PN exams.`,
      canonical,
      noindex,
      breadcrumbs,
    };
  }

  const learnMatch = cleanPath.match(/^\/learn\/(.+)$/);
  if (learnMatch) {
    const slug = learnMatch[1];
    const readable = slugToTitle(slug);
    return {
      title: `${readable} | NurseNest`,
      description: `${readable} - nursing education content on NurseNest. Evidence-based learning for RPN/LVN, RN, and NP students.`,
      canonical,
      noindex,
      breadcrumbs,
    };
  }

  const conditionMatch = cleanPath.match(/^\/conditions\/(.+)$/);
  if (conditionMatch) {
    const slug = conditionMatch[1];
    const readable = slugToTitle(slug);
    const conditionJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      "name": readable,
      "description": `${readable} - pathophysiology, clinical presentation, diagnostics, medications, and nursing interventions for nursing exam preparation.`,
      "url": canonical,
      "medicalSpecialty": { "@type": "MedicalSpecialty", "name": "Nursing" },
      "relevantSpecialty": { "@type": "MedicalSpecialty", "name": "Nursing" },
      "possibleTreatment": { "@type": "MedicalTherapy", "name": `${readable} Management` },
    });
    return {
      title: `${readable} - Nursing Study Guide | Pathophysiology & Interventions | NurseNest`,
      description: `Learn about ${readable.toLowerCase()} for nursing exams. Pathophysiology, clinical presentation, diagnostics, medications, and nursing interventions. NCLEX, NCLEX-PN, and REx-PN exam prep.`,
      canonical,
      noindex,
      breadcrumbs,
      jsonLd: conditionJsonLd,
    };
  }

  const medicationMatch = cleanPath.match(/^\/medications\/(.+)$/);
  if (medicationMatch) {
    const slug = medicationMatch[1];
    const readable = slugToTitle(slug);
    const medJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      "name": readable,
      "description": `${readable} - drug class, mechanism of action, indications, side effects, contraindications, and nursing considerations.`,
      "url": canonical,
      "medicalSpecialty": "Pharmacology",
      "relevantSpecialty": { "@type": "MedicalSpecialty", "name": "Nursing Pharmacology" },
    });
    return {
      title: `${readable} - Nursing Pharmacology Guide | Drug Class, MOA & Side Effects | NurseNest`,
      description: `Study ${readable.toLowerCase()} for nursing exams. Drug class, mechanism of action, indications, side effects, contraindications, and nursing considerations for NCLEX, NCLEX-PN, and REx-PN prep.`,
      canonical,
      noindex,
      breadcrumbs,
      jsonLd: medJsonLd,
    };
  }

  const labValueMatch = cleanPath.match(/^\/lab-values\/(.+)$/);
  if (labValueMatch) {
    const slug = labValueMatch[1];
    const readable = slugToTitle(slug);
    return {
      title: `${readable} - Lab Value Interpretation | Normal Range & Clinical Significance | NurseNest`,
      description: `Master ${readable.toLowerCase()} lab value interpretation for nursing exams. Normal ranges, high/low causes, clinical significance, and nursing interventions for NCLEX, NCLEX-PN, and REx-PN prep.`,
      canonical,
      noindex,
      breadcrumbs,
    };
  }

  const careerMatch = cleanPath.match(/^\/career-development\/(.+)$/);
  const newGradCareerMatch = cleanPath.match(/^\/new-grad\/career\/(.+)$/);
  if (careerMatch || newGradCareerMatch) {
    const slug = (careerMatch || newGradCareerMatch)![1];
    const readable = slugToTitle(slug);
    const today = new Date().toISOString().split("T")[0];
    const jobPostingJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": `${readable} - Nursing Career Guide`,
      "description": `Career guide for ${readable.toLowerCase()}. Job outlook, required skills, salary expectations, and career advancement pathways for nursing professionals.`,
      "url": canonical,
      "datePosted": today,
      "validThrough": `${new Date(Date.now() + 365 * 86400000).toISOString().split("T")[0]}`,
      "hiringOrganization": {
        "@type": "Organization",
        "name": "NurseNest",
        "sameAs": SITE_BASE,
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": ["CA", "US"],
        },
      },
      "industry": "Healthcare / Nursing",
      "occupationalCategory": "29-1141.00",
      "employmentType": "FULL_TIME",
    });
    return {
      title: `${readable} - Nursing Career Guide | NurseNest`,
      description: `Explore ${readable.toLowerCase()} career paths in nursing. Job outlook, qualifications, salary expectations, and professional development resources for new and experienced nurses.`,
      canonical,
      noindex,
      breadcrumbs,
      jsonLd: jobPostingJsonLd,
    };
  }

  const newGradMatch = cleanPath.match(/^\/new-grad(\/.*)?$/);
  if (newGradMatch) {
    const subPath = newGradMatch[1] || "";
    if (!subPath || subPath === "/") {
      return {
        title: "New Grad Nursing Hub - Career Resources & Transition Guides | NurseNest",
        description: "Essential resources for new graduate nurses. Career development guides, clinical skills refreshers, unit-specific orientation guides, and transition-to-practice support.",
        canonical,
        noindex,
        breadcrumbs,
      };
    }
    const readable = slugToTitle(subPath.replace(/^\//, "").split("/").pop() || "");
    return {
      title: `${readable} - New Grad Nursing Resource | NurseNest`,
      description: `${readable} guide for new graduate nurses. Professional development, clinical skills, and career transition support from NurseNest.`,
      canonical,
      noindex,
      breadcrumbs,
    };
  }

  return {
    title: "NurseNest - NCLEX & NCLEX-PN / REx-PN Exam Prep | Nursing Education Platform",
    description: "Prepare for NCLEX, NCLEX-PN, and REx-PN with NurseNest. 1,200+ practice questions, 200+ clinical lessons, pharmacology flashcards, and case simulations for nursing students. New content added weekly.",
    canonical,
    noindex,
    breadcrumbs,
  };
}

export async function injectMeta(html: string, pathname: string): Promise<string> {
  const localeMatch = pathname.match(/^\/(en|fr|es|fil|hi|zh|ar|ko|pt|pa|vi|ht|ur|ja|fa)(\/.*|$)/);
  const detectedLocale = localeMatch ? localeMatch[1] : "en";
  const strippedPath = localeMatch ? (localeMatch[2] || "/") : pathname;
  const meta = getPageMeta(pathname);

  html = html.replace(
    /<html\s+lang="[^"]*"/,
    `<html lang="${detectedLocale}"`
  );

  const dir = getLocaleDirection(detectedLocale);
  if (dir === "rtl") {
    html = html.replace(
      /<html\s+lang="[^"]*"/,
      `<html lang="${detectedLocale}" dir="rtl"`
    );
  }

  const contentData = await fetchContentForPath(strippedPath);
  if (contentData) {
    if (contentData.summary) {
      meta.description = contentData.summary.substring(0, 300);
    }

    const isLesson = strippedPath.startsWith("/lessons/");
    const isBlog = (strippedPath.startsWith("/blog/") && strippedPath !== "/blog") || (strippedPath.startsWith("/learn/") && strippedPath !== "/learn");
    const isClarity = strippedPath.startsWith("/clinical-clarity/") && strippedPath !== "/clinical-clarity";
    const textContent = extractTextFromContent(contentData.content);
    const wordCount = textContent.split(/\s+/).length;

    const jsonLd: any = {
      "@context": "https://schema.org",
      "@type": isLesson ? "Course" : "Article",
      "name": contentData.title,
      "headline": contentData.title,
      "description": meta.description,
      "url": meta.canonical,
      "publisher": {
        "@type": "Organization",
        "name": "NurseNest",
        "url": SITE_BASE,
      },
      "provider": {
        "@type": "Organization",
        "name": "NurseNest",
        "url": SITE_BASE,
      },
      "inLanguage": detectedLocale,
    };

    if (isLesson) {
      jsonLd["@type"] = "Course";
      jsonLd["hasCourseInstance"] = {
        "@type": "CourseInstance",
        "courseMode": "online",
      };
      if (contentData.category) jsonLd["courseCode"] = contentData.category;
      jsonLd["educationalLevel"] = "Professional";
      jsonLd["about"] = {
        "@type": "MedicalCondition",
        "name": contentData.title,
        "medicalSpecialty": "Nursing",
      };
    }

    if (isBlog || isClarity) {
      jsonLd["@type"] = "Article";
      jsonLd["author"] = { "@type": "Organization", "name": "NurseNest" };
      jsonLd["wordCount"] = wordCount;
    }

    if (contentData.createdAt) {
      jsonLd["datePublished"] = new Date(contentData.createdAt).toISOString().split("T")[0];
    }
    if (contentData.tags && contentData.tags.length > 0) {
      jsonLd["keywords"] = contentData.tags.join(", ");
    }

    if (textContent.length > 100) {
      jsonLd["articleBody"] = textContent.substring(0, 5000);
    }

    meta.jsonLd = JSON.stringify(jsonLd);
    meta.noscriptContent = buildNoscriptHtml(contentData.content, contentData.title);
  }

  const EDUCATIONAL_ORG_LANDING_PAGES = new Set([
    "/", "/lessons", "/flashcards", "/question-bank", "/mock-exams",
    "/pricing", "/about", "/pre-nursing", "/free-practice",
    "/nclex-rn", "/nclex-pn", "/canada-np", "/us-np",
    "/medical-imaging", "/new-grad",
  ]);

  if (EDUCATIONAL_ORG_LANDING_PAGES.has(strippedPath)) {
    const eduOrgLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "NurseNest",
      "url": SITE_BASE,
      "description": "Premier nursing and allied health education platform offering interactive lessons, practice questions, flashcards, and clinical simulations for RPN/LVN, RN, NP, and allied health students.",
      "educationalCredentialAwarded": "Nursing & Allied Health Exam Preparation",
      "areaServed": [
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "United States" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Healthcare Education Programs",
        "itemListElement": [
          { "@type": "Course", "name": "RPN/LVN Foundation Track", "description": "Core pathophysiology and foundational nursing skills" },
          { "@type": "Course", "name": "RN/NCLEX Preparation Track", "description": "Advanced clinical reasoning and NCLEX exam preparation" },
          { "@type": "Course", "name": "NP Advanced Practice Track", "description": "Molecular-level pathophysiology and diagnostic reasoning for NP certification" },
          { "@type": "Course", "name": "Allied Health Programs", "description": "Exam preparation for pharmacy tech, respiratory therapy, paramedic, MLT, and imaging professionals" },
        ],
      },
    });
    if (!meta.jsonLd) {
      meta.jsonLd = eduOrgLd;
    }
  }

  const allJsonLd: string[] = [];
  if (meta.jsonLd) {
    allJsonLd.push(meta.jsonLd);
  }

  if (meta.breadcrumbs && meta.breadcrumbs.length > 1) {
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": meta.breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": crumb.name,
        "item": crumb.url,
      })),
    };
    allJsonLd.push(JSON.stringify(breadcrumbLd));
  }

  html = html.replace(
    /<!--SEO_TITLE-->.*?<!--\/SEO_TITLE-->/s,
    `<!--SEO_TITLE--><title>${meta.title}</title><!--/SEO_TITLE-->`
  );

  html = html.replace(
    /<!--SEO_DESC-->.*?<!--\/SEO_DESC-->/s,
    `<!--SEO_DESC--><meta name="description" content="${escapeHtml(meta.description)}" /><!--/SEO_DESC-->`
  );

  html = html.replace(
    /<!--SEO_CANONICAL-->.*?<!--\/SEO_CANONICAL-->/s,
    `<!--SEO_CANONICAL--><link rel="canonical" href="${meta.canonical}" /><!--/SEO_CANONICAL-->`
  );

  if (meta.noindex) {
    html = html.replace(
      '<meta name="robots" content="index, follow" />',
      '<meta name="robots" content="noindex, follow" />'
    );
  }

  html = html.replace(
    /<!--SEO_OG_TITLE-->.*?<!--\/SEO_OG_TITLE-->/s,
    `<!--SEO_OG_TITLE--><meta property="og:title" content="${escapeHtml(meta.title)}" /><!--/SEO_OG_TITLE-->`
  );

  html = html.replace(
    /<!--SEO_OG_DESC-->.*?<!--\/SEO_OG_DESC-->/s,
    `<!--SEO_OG_DESC--><meta property="og:description" content="${escapeHtml(meta.description)}" /><!--/SEO_OG_DESC-->`
  );

  html = html.replace(
    /<!--SEO_TW_TITLE-->.*?<!--\/SEO_TW_TITLE-->/s,
    `<!--SEO_TW_TITLE--><meta name="twitter:title" content="${escapeHtml(meta.title)}" /><!--/SEO_TW_TITLE-->`
  );

  html = html.replace(
    /<!--SEO_TW_DESC-->.*?<!--\/SEO_TW_DESC-->/s,
    `<!--SEO_TW_DESC--><meta name="twitter:description" content="${escapeHtml(meta.description)}" /><!--/SEO_TW_DESC-->`
  );

  const ogImageUrl = meta.ogImage || `${SITE_BASE}/opengraph.jpg`;
  html = html.replace(
    /<!--SEO_OG_IMAGE-->.*?<!--\/SEO_OG_IMAGE-->/s,
    `<!--SEO_OG_IMAGE--><meta property="og:image" content="${escapeHtml(ogImageUrl)}" /><!--/SEO_OG_IMAGE-->`
  );
  html = html.replace(
    /<!--SEO_OG_URL-->.*?<!--\/SEO_OG_URL-->/s,
    `<!--SEO_OG_URL--><meta property="og:url" content="${escapeHtml(meta.canonical)}" /><!--/SEO_OG_URL-->`
  );
  html = html.replace(
    /<!--SEO_TW_IMAGE-->.*?<!--\/SEO_TW_IMAGE-->/s,
    `<!--SEO_TW_IMAGE--><meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" /><!--/SEO_TW_IMAGE-->`
  );

  if (allJsonLd.length > 0) {
    const jsonLdTags = allJsonLd.map(ld => `<script type="application/ld+json">${ld}</script>`).join("\n");
    html = html.replace(
      "</head>",
      `${jsonLdTags}\n</head>`
    );
  }

  const indexableLocales = getIndexableLocales();
  const isNoindexRoute = isNoindexPath(strippedPath);
  const hreflangTags: string[] = [];

  if (!isNoindexRoute) {
    for (const locale of indexableLocales) {
      const hreflang = getHreflangCode(locale);
      const localeUrl = `${SITE_BASE}/${locale}${strippedPath === "/" ? "" : strippedPath}`;
      hreflangTags.push(`<link rel="alternate" hreflang="${hreflang}" href="${localeUrl}" />`);
    }
    hreflangTags.push(`<link rel="alternate" hreflang="x-default" href="${SITE_BASE}/en${strippedPath === "/" ? "" : strippedPath}" />`);
  }

  if (hreflangTags.length > 0) {
    html = html.replace(
      "</head>",
      `${hreflangTags.join("\n")}\n</head>`
    );
  }

  html = html.replace(
    "</head>",
    `<script>window.__INDEXABLE_LOCALES__=${JSON.stringify(indexableLocales)};</script>\n</head>`
  );

  if (meta.noscriptContent) {
    html = html.replace(
      "</body>",
      `<noscript><article role="main">${meta.noscriptContent}</article></noscript>\n</body>`
    );
  }

  return html;
}
