const SITE_DOMAIN = "https://www.nursenest.ca";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const ACRONYMS = new Set([
  "COPD", "ECG", "EKG", "ICU", "IV", "NG", "ABG", "DKA", "HHNS", "SIADH",
  "DVT", "PE", "MI", "HF", "AKI", "CKD", "UTI", "BPH", "GERD", "IBS",
  "GI", "CNS", "PNS", "MS", "ALS", "ACLS", "BLS", "OSCE", "NP", "RPN",
  "RN", "LVN", "NCLEX", "REX-PN", "NBRC", "NREMT", "PTCB", "CSMLS",
  "CAMRT", "RRT", "MLT", "ADHD", "OCD", "PTSD", "DIC", "TB", "RSV",
  "ARDS", "ERCP", "EGD", "FAQ", "AI", "QBank", "SEO",
]);

function formatSegment(segment: string): string {
  const words = segment.replace(/-/g, " ").split(" ");
  return words
    .map((w) => {
      const upper = w.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      if (upper === "VS") return "vs";
      if (upper === "AND") return "&";
      if (upper === "OF") return "of";
      if (upper === "THE") return "the";
      if (upper === "FOR") return "for";
      if (upper === "IN") return "in";
      if (upper === "TO") return "to";
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

const STATIC_ROUTES: Record<string, string> = {
  "/lessons": "Lessons",
  "/mock-exams": "Mock Exams",
  "/flashcards": "Flashcards",
  "/med-math": "Med Math",
  "/lab-values": "Lab Values",
  "/pricing": "Pricing",
  "/shop": "Shop",
  "/question-bank": "Question Bank",
  "/simulators": "Simulators",
  "/simulators/clinical-skills": "Clinical Skills Simulators",
  "/simulators/osce": "OSCE Simulators",
  "/simulators/clinical-lab": "Clinical Lab Simulators",
  "/study-plan": "Study Plan",
  "/free-practice": "Free Practice",
  "/anatomy": "Anatomy & Physiology",
  "/clinical-clarity": "Clinical Clarity",
  "/pre-nursing": "Pre-Nursing",
  "/dashboard": "Dashboard",
  "/faq": "FAQ",
  "/contact": "Contact",
  "/feedback": "Feedback",
  "/terms": "Terms of Service",
  "/privacy": "Privacy Policy",
  "/disclaimer": "Disclaimer",
  "/refund-policy": "Refund Policy",
  "/question-of-the-day": "Question of the Day",
  "/diagnostic-assessment": "Diagnostic Assessment",
  "/medication-mastery": "Medication Mastery",
  "/compare": "Compare Plans",
  "/lectures": "Lectures",
  "/np-exam-guide": "NP Exam Guide",
  "/rex-pn-guide": "REx-PN Guide",
  "/nclex-rn-guide": "NCLEX-RN Guide",
  "/blog": "Blog",
  "/reports": "Reports",
  "/case-simulations": "Case Simulations",
  "/first-action-simulator": "First Action Simulator",
  "/safety-hazard-simulator": "Safety Hazard Simulator",
  "/iv-complications-simulator": "IV Complications Simulator",
  "/electrolyte-abg-simulator": "Electrolyte & ABG Simulator",
  "/deteriorating-patient-simulator": "Deteriorating Patient Simulator",
  "/blood-transfusion-simulator": "Blood Transfusion Simulator",
  "/probability-simulator": "Probability Simulator",
  "/pathways": "Learning Pathways",
  "/upgrade": "Upgrade",
  "/profile": "Profile",
  "/exam-practice": "Exam Practice",
  "/nclex-rn-practice-questions": "NCLEX-RN Practice Questions",
  "/nclex-pn-practice-questions": "NCLEX-PN Practice Questions",
  "/rex-pn-practice-questions": "REx-PN Practice Questions",
  "/np-exam-practice-questions": "NP Exam Practice Questions",
  "/practice-questions": "Free Practice Questions",
  "/glossary": "Glossary",
};

const PARENT_ROUTES: Record<string, string> = {
  "/shop/": "/shop",
  "/lessons/": "/lessons",
  "/flashcards/deck/": "/flashcards",
  "/clinical-clarity/": "/clinical-clarity",
  "/lectures/": "/lectures",
  "/anatomy/": "/anatomy",
  "/np-exam-guide/": "/np-exam-guide",
  "/rex-pn-guide/": "/rex-pn-guide",
  "/nclex-rn-guide/": "/nclex-rn-guide",
  "/mock-exams/": "/mock-exams",
  "/learn/": "/lessons",
  "/study-guide/": "/lessons",
  "/compare/": "/compare",
  "/practice-questions/": "/practice-questions",
  "/glossary/": "/glossary",
};

const SIMULATOR_PATHS = [
  "/first-action-simulator",
  "/safety-hazard-simulator",
  "/iv-complications-simulator",
  "/electrolyte-abg-simulator",
  "/deteriorating-patient-simulator",
  "/blood-transfusion-simulator",
  "/probability-simulator",
  "/case-simulations",
];

export function buildBreadcrumbs(
  pathname: string,
  metadata?: { title?: string; parentTitle?: string; system?: string }
): BreadcrumbItem[] {
  const localeMatch = pathname.match(/^\/(en|fr|es|de|pt|zh|ja|ko|ar|hi|it|ru|nl|pl|tr)\//);
  const cleanPath = localeMatch ? pathname.slice(localeMatch[0].length - 1) : pathname;

  const items: BreadcrumbItem[] = [{ name: "Home", url: `${SITE_DOMAIN}/` }];

  if (cleanPath === "/" || cleanPath === "") return items;

  if (STATIC_ROUTES[cleanPath]) {
    if (SIMULATOR_PATHS.includes(cleanPath)) {
      items.push({ name: "Simulators", url: `${SITE_DOMAIN}/simulators/clinical-skills` });
    }
    items.push({ name: STATIC_ROUTES[cleanPath], url: `${SITE_DOMAIN}${cleanPath}` });
    return items;
  }

  for (const [prefix, parentPath] of Object.entries(PARENT_ROUTES)) {
    if (cleanPath.startsWith(prefix)) {
      const parentName = STATIC_ROUTES[parentPath];
      if (parentName) {
        items.push({ name: parentName, url: `${SITE_DOMAIN}${parentPath}` });
      }

      const slug = cleanPath.slice(prefix.length);
      const pageName = metadata?.title || formatSegment(slug);
      items.push({ name: pageName, url: `${SITE_DOMAIN}${cleanPath}` });
      return items;
    }
  }

  if (cleanPath.startsWith("/simulators/") && !STATIC_ROUTES[cleanPath]) {
    items.push({ name: "Simulators", url: `${SITE_DOMAIN}/simulators/clinical-skills` });
    const sub = cleanPath.slice("/simulators/".length);
    items.push({ name: formatSegment(sub), url: `${SITE_DOMAIN}${cleanPath}` });
    return items;
  }

  const segments = cleanPath.split("/").filter(Boolean);
  let path = "";
  for (const seg of segments) {
    path += `/${seg}`;
    const name = STATIC_ROUTES[path] || formatSegment(seg);
    items.push({ name, url: `${SITE_DOMAIN}${path}` });
  }

  if (metadata?.title && items.length > 1) {
    items[items.length - 1].name = metadata.title;
  }

  return items;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
