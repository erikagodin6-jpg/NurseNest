import { pool } from "./storage";
import * as fs from "fs";
import * as path from "path";

const SITE_BASE = "https://www.nursenest.ca";

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
}

const NOINDEX_PATHS = new Set([
  "/admin",
  "/content-editor",
  "/login",
  "/profile",
  "/reports",
  "/dashboard",
  "/subscription/success",
  "/subscription/cancel",
]);

function isNoindexPath(path: string): boolean {
  if (NOINDEX_PATHS.has(path)) return true;
  if (path.startsWith("/admin")) return true;
  if (path.startsWith("/content-editor")) return true;
  if (/^\/mock-exams\/[^/]+/.test(path)) return true;
  if (path.startsWith("/dashboard")) return true;
  if (path.startsWith("/flashcards/deck/")) return true;
  return false;
}

function buildBreadcrumbs(pathname: string): { name: string; url: string }[] {
  const crumbs: { name: string; url: string }[] = [
    { name: "Home", url: `${SITE_BASE}/` },
  ];

  const lessonMatch = pathname.match(/^\/lessons\/(.+)$/);
  if (lessonMatch) {
    crumbs.push({ name: "Lessons", url: `${SITE_BASE}/lessons` });
    crumbs.push({ name: slugToTitle(lessonMatch[1]), url: `${SITE_BASE}${pathname}` });
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

  if (pathname !== "/") {
    const pageName = staticPages[pathname]?.title?.split(" | ")[0]?.split(" - ")[0] || slugToTitle(pathname.replace(/^\//, ""));
    crumbs.push({ name: pageName, url: `${SITE_BASE}${pathname}` });
  }

  return crumbs;
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
    title: "NurseNest - NCLEX & REX-PN Exam Prep | Nursing Question Bank, Simulations & Flashcards",
    description: "Prepare for NCLEX and REX-PN with NurseNest. 1,200+ nursing practice questions, clinical case simulations, pharmacology flashcards, and 200+ pathophysiology lessons for RPN/LVN, RN, and NP students in Canada and the US. New content added weekly. Start free - no credit card required.",
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
    description: "Start your free NurseNest account today. Access nursing lessons, flashcards, and practice questions to begin preparing for NCLEX and REX-PN exams.",
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
    title: "Mock Exams - NCLEX & REX-PN Practice Tests | NurseNest",
    description: "Take timed mock exams simulating NCLEX and REX-PN format. Track your scores, identify weak areas, and review detailed rationales.",
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
  "/blog": {
    title: "Nursing Blog - Evidence-Based Articles | NurseNest",
    description: "Read evidence-based nursing articles with APA7 citations. Clinical topics, exam tips, and professional development for nursing students.",
  },
  "/pre-nursing": {
    title: "Pre-Nursing Resources - Get Started | NurseNest",
    description: "Resources for pre-nursing students considering a career in nursing. Program information, prerequisites, and study tips.",
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
  "/lectures": {
    title: "Video Lectures - Nursing Education | NurseNest",
    description: "Watch free nursing video lectures covering pathophysiology, pharmacology, and clinical skills. Visual learning for NCLEX and REX-PN exam preparation.",
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
    description: "Answer a new nursing practice question every day. Free NCLEX and REX-PN exam prep with detailed rationales. Subscribe for daily email delivery.",
  },
  "/question-bank": {
    title: "Question Bank - 1,200+ Nursing Practice Questions | NurseNest",
    description: "Practice with 1,200+ nursing questions organized by body system and tier. Instant rationale display and progress tracking for NCLEX and REX-PN prep. New questions added weekly.",
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
  const strippedPath = localeMatch ? (localeMatch[2] || "/") : cleanPath;
  const canonical = strippedPath === "/" ? `${SITE_BASE}/` : `${SITE_BASE}${strippedPath}`;
  const noindex = isNoindexPath(strippedPath);
  const breadcrumbs = buildBreadcrumbs(strippedPath);
  cleanPath = strippedPath;

  if (staticPages[cleanPath]) {
    return {
      title: staticPages[cleanPath].title,
      description: staticPages[cleanPath].description,
      canonical,
      noindex,
      breadcrumbs,
    };
  }

  const lessonMatch = cleanPath.match(/^\/lessons\/(.+)$/);
  if (lessonMatch) {
    const slug = lessonMatch[1];
    const readable = slugToTitle(slug);
    let tier = "";
    if (slug.endsWith("-np")) tier = " (NP)";
    else if (slug.endsWith("-rn")) tier = " (RN)";
    else if (slug.endsWith("-rpn")) tier = " (RPN)";
    return {
      title: `${readable}${tier} - Nursing Lesson | NurseNest`,
      description: `Learn about ${readable} with detailed pathophysiology, clinical findings, nursing interventions, and exam pearls. Evidence-based nursing education for NCLEX and REX-PN preparation.`,
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
      description: `Understand ${readable.toLowerCase()}. Evidence-based pathophysiology explanation for nursing students preparing for NCLEX and REX-PN exams.`,
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

  return {
    title: "NurseNest - NCLEX & REX-PN Exam Prep | Nursing Education Platform",
    description: "Prepare for NCLEX and REX-PN with NurseNest. 1,200+ practice questions, 200+ clinical lessons, pharmacology flashcards, and case simulations for nursing students. New content added weekly.",
    canonical,
    noindex,
    breadcrumbs,
  };
}

export async function injectMeta(html: string, pathname: string): Promise<string> {
  const localeMatch = pathname.match(/^\/(en|fr|es|fil|hi|zh|ar|ko|pt|pa|vi|ht|ur|ja|fa)(\/.*|$)/);
  const strippedPath = localeMatch ? (localeMatch[2] || "/") : pathname;
  const meta = getPageMeta(pathname);

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
      "inLanguage": "en",
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
        "@type": "Thing",
        "name": contentData.title,
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

  if (allJsonLd.length > 0) {
    const jsonLdTags = allJsonLd.map(ld => `<script type="application/ld+json">${ld}</script>`).join("\n");
    html = html.replace(
      "</head>",
      `${jsonLdTags}\n</head>`
    );
  }

  if (meta.noscriptContent) {
    html = html.replace(
      "</body>",
      `<noscript><article role="main">${meta.noscriptContent}</article></noscript>\n</body>`
    );
  }

  return html;
}
