const SITE_BASE = "https://www.nursenest.ca";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
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
    description: "Prepare for NCLEX and REX-PN with NurseNest. 10,000+ nursing practice questions, clinical case simulations, pharmacology flashcards, and 150+ pathophysiology lessons for RPN/LVN, RN, and NP students in Canada and the US. Start free - no credit card required.",
  },
  "/lessons": {
    title: "Nursing Lessons - Pathophysiology & Clinical Topics | NurseNest",
    description: "Browse 150+ clinical nursing lessons covering pathophysiology, pharmacology, and patient care for RPN/LVN, RN, and NP students. Interactive content with exam prep focus.",
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
  "/question-of-the-day": {
    title: "Nursing Question of the Day - Free NCLEX Practice | NurseNest",
    description: "Answer a new nursing practice question every day. Free NCLEX and REX-PN exam prep with detailed rationales. Subscribe for daily email delivery.",
  },
  "/question-bank": {
    title: "Question Bank - 10,000+ Nursing Practice Questions | NurseNest",
    description: "Practice with 10,000+ nursing questions organized by body system and tier. Instant rationale display and progress tracking for NCLEX and REX-PN prep.",
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

export function getPageMeta(pathname: string): PageMeta {
  const cleanPath = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const canonical = cleanPath === "/" ? `${SITE_BASE}/` : `${SITE_BASE}${cleanPath}`;

  if (staticPages[cleanPath]) {
    return {
      title: staticPages[cleanPath].title,
      description: staticPages[cleanPath].description,
      canonical,
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
    };
  }

  return {
    title: "NurseNest - NCLEX & REX-PN Exam Prep | Nursing Education Platform",
    description: "Prepare for NCLEX and REX-PN with NurseNest. 10,000+ practice questions, clinical lessons, pharmacology flashcards, and case simulations for nursing students.",
    canonical,
  };
}

export function injectMeta(html: string, pathname: string): string {
  const meta = getPageMeta(pathname);

  html = html.replace(
    /<!--SEO_TITLE-->.*?<!--\/SEO_TITLE-->/s,
    `<!--SEO_TITLE--><title>${meta.title}</title><!--/SEO_TITLE-->`
  );

  html = html.replace(
    /<!--SEO_DESC-->.*?<!--\/SEO_DESC-->/s,
    `<!--SEO_DESC--><meta name="description" content="${meta.description}" /><!--/SEO_DESC-->`
  );

  html = html.replace(
    /<!--SEO_CANONICAL-->.*?<!--\/SEO_CANONICAL-->/s,
    `<!--SEO_CANONICAL--><link rel="canonical" href="${meta.canonical}" /><!--/SEO_CANONICAL-->`
  );

  html = html.replace(
    /<!--SEO_OG_TITLE-->.*?<!--\/SEO_OG_TITLE-->/s,
    `<!--SEO_OG_TITLE--><meta property="og:title" content="${meta.title}" /><!--/SEO_OG_TITLE-->`
  );

  html = html.replace(
    /<!--SEO_OG_DESC-->.*?<!--\/SEO_OG_DESC-->/s,
    `<!--SEO_OG_DESC--><meta property="og:description" content="${meta.description}" /><!--/SEO_OG_DESC-->`
  );

  html = html.replace(
    /<!--SEO_TW_TITLE-->.*?<!--\/SEO_TW_TITLE-->/s,
    `<!--SEO_TW_TITLE--><meta name="twitter:title" content="${meta.title}" /><!--/SEO_TW_TITLE-->`
  );

  html = html.replace(
    /<!--SEO_TW_DESC-->.*?<!--\/SEO_TW_DESC-->/s,
    `<!--SEO_TW_DESC--><meta name="twitter:description" content="${meta.description}" /><!--/SEO_TW_DESC-->`
  );

  return html;
}
