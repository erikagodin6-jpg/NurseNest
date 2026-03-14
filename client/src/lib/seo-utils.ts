import type { LessonContent } from "@/data/lessons/types";

function stripTierFromTitle(title: string): string {
  return title
    .replace(/^(RN|NP|RPN|LVN|NCLEX|NCLEX-RN|NCLEX-PN|REx-PN)\s+/i, "")
    .replace(/\s+\((RN|NP|RPN|LVN|NCLEX|RPN\/LVN|RPN\/RN)\)$/i, "")
    .trim();
}

export function generateLessonSeoDescription(lessonId: string, lesson: LessonContent): string {
  const title = stripTierFromTitle(lesson.title);
  const mechanism = lesson.cellular.content.slice(0, 120).replace(/\.$/, "");
  const medNames = lesson.medications.slice(0, 3).map((m) => m.name).join(", ");
  const signCount = lesson.signs.left.length + lesson.signs.right.length;

  let desc = `${title}: ${mechanism}. `;
  if (medNames) desc += `Key medications include ${medNames}. `;
  desc += `${signCount} clinical signs, danger signs, and nursing interventions for exam preparation.`;

  if (desc.length > 160) desc = desc.slice(0, 157) + "...";
  return desc;
}

export function generateLessonKeywords(lessonId: string, lesson: LessonContent): string {
  const parts: string[] = [stripTierFromTitle(lesson.title), "nursing pathophysiology"];

  if (lessonId.includes("-np") || lessonId.includes("advanced-")) {
    parts.push("nurse practitioner", "NP exam", "advanced practice");
  } else if (lessonId.includes("-rn") || lessonId.includes("nclex-")) {
    parts.push("NCLEX prep", "RN exam", "registered nurse");
  } else {
    parts.push("REX-PN prep", "RPN exam", "practical nurse", "LVN");
  }

  lesson.medications.slice(0, 4).forEach((m) => parts.push(m.name));
  parts.push("clinical signs", "nursing interventions", "pharmacology");

  return parts.join(", ");
}

export function getLessonBodySystem(lessonId: string): string {
  const systemKeywords: Record<string, string[]> = {
    "Cardiovascular": ["cardiovascular", "heart", "cardiac", "mi-", "hf-", "aaa", "dvt", "pad-", "cardioversion", "pacemaker", "shock", "dysrhythmia", "endocarditis", "aortic", "carotid", "cardiomyopathy", "raynauds", "buergers", "venous-insufficiency", "varicose", "rheumatic", "kawasaki", "polycythemia", "cardiogenic"],
    "Respiratory": ["respiratory", "lung", "copd", "asthma", "pneumonia", "tb-", "trach", "chest-physio", "suction", "spirometry", "peak-flow", "cystic-fibrosis", "pleurisy", "fibrosis", "bronchi", "rsv", "pertussis", "hemoptysis", "pe-recognition", "ards", "osa"],
    "Neurological": ["neuro", "stroke", "delirium", "parkinson", "concussion", "cranial", "icp", "cerebral", "brain", "ms-", "als-", "myasthenia", "trigeminal", "bells-palsy", "carpal", "restless", "narcolepsy", "hydrocephalus", "spinal", "neuropathy", "guillain", "seizure", "subdural", "duchenne", "spina-bifida"],
    "Gastrointestinal": ["gi-", "abdominal", "ibs", "ngtube", "enteral", "feeding-tube", "gerd", "peptic", "constipation", "diarrhea", "hepatitis", "stoma", "rectal", "crohns", "colitis", "diverticulitis", "hiatal", "dysphagia", "hemorrhoid", "anal-fissure", "cdiff", "malabsorption", "liver", "appendicitis", "cholecyst", "pyloric", "intussusception", "celiac", "dumping", "ercp"],
    "Renal": ["renal", "catheter", "cauti", "urine", "uti-", "kidney", "fluid-balance", "dialysis", "hemodialysis", "bph", "incontinence", "glomerulonephritis", "polycystic", "calculi", "urethral", "neurogenic-bladder", "aki", "ckd", "rhabdomyolysis", "av-fistula"],
    "Endocrine": ["hormonal", "thyroid", "diabetes", "pancreatic", "adrenal", "pituitary", "negative-feedback", "addisons", "cushings", "siadh", "diabetes-insipidus", "parathyroid", "acromegaly", "graves", "dka", "hhns", "dm-type"],
    "Hematology": ["iron-deficiency", "dic-", "coagulation", "blood-product", "hemophilia", "thrombocytopenia", "von-willebrand", "thalassemia", "aplastic-anemia", "blood-typing", "polycythemia", "lymphoma", "sickle-cell", "anemia"],
    "Pediatrics": ["peds", "epiglottitis", "dehydration-peds", "foreign-body", "varicella", "impetigo", "head-lice", "pinworm", "diaper", "lead-poisoning", "adhd", "separation-anxiety", "pyloric-stenosis", "hirschsprung", "phenylketonuria", "galactosemia", "biliary-atresia", "wilms", "neuroblastoma", "osteogenesis", "marfan", "turner", "klinefelter", "hemolytic-uremic", "reye", "retinoblastoma", "cleft", "botulism", "trisomy", "fetal-alcohol", "tonsillectomy", "cp-management", "congenital-heart", "bronchiolitis", "croup"],
    "Maternity": ["maternity", "maternal", "prenatal", "labor", "postpartum", "breastfeeding", "antepartum", "fetal-monitoring", "gestational", "pregnancy", "cesarean", "episiotomy", "ectopic", "placenta", "hellp", "hyperemesis", "rh-incompatibility", "umbilical-cord-prolapse", "amniotic", "mastitis", "preeclampsia", "cervical-cerclage", "preterm", "shoulder-dystocia", "vacuum-assisted", "endometritis", "uterine-inversion", "ob-"],
    "Neonatal": ["newborn", "neonatal", "thermoreg", "jaundice", "circumcision", "cord-care", "neonatal-screening", "neonatal-reflex", "car-seat", "meconium", "necrotizing", "retinopathy-of-prematurity", "bronchopulmonary", "neonatal-abstinence", "congenital-hypothyroidism", "apgar", "hyperbilirubinemia", "phototherapy"],
    "Mental Health": ["mental-health", "depression", "anxiety", "stress", "adaptation", "therapeutic-communication", "crisis", "substance-abuse", "lithium", "nms-serotonin", "bipolar", "schizophrenia", "eating-disorder", "ptsd", "ocd", "panic", "borderline", "antisocial", "suicidal"],
    "Pharmacology": ["prescribing", "safety", "labs", "pharmacology", "medication-admin", "drug-interaction"],
    "Emergency": ["emergency", "critical-care", "triage", "acls", "bls", "anaphylaxis", "poisoning", "overdose", "status-epilepticus", "malignant-hyperthermia", "autonomic-dysreflexia"],
  };

  for (const [system, keywords] of Object.entries(systemKeywords)) {
    if (keywords.some((kw) => lessonId.includes(kw))) return system;
  }
  return "Clinical Nursing";
}

export function getLessonTierLabel(lessonId: string): string {
  if (lessonId.includes("-np") || lessonId.startsWith("np-") || lessonId.includes("advanced-")) return "Nurse Practitioner";
  if (lessonId.includes("-rn") || lessonId.startsWith("rn-") || lessonId.includes("nclex-")) return "Registered Nurse (NCLEX)";
  return "Practical Nurse (RPN/LVN)";
}

export function buildLessonStructuredData(lessonId: string, lesson: LessonContent, isFree: boolean = false) {
  const bodySystem = getLessonBodySystem(lessonId);
  const tierLabel = getLessonTierLabel(lessonId);
  const description = generateLessonSeoDescription(lessonId, lesson);
  const canonicalTitle = stripTierFromTitle(lesson.title);

  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": canonicalTitle,
    "description": description,
    "learningResourceType": "Lesson",
    "educationalLevel": tierLabel,
    "about": {
      "@type": "MedicalCondition",
      "name": canonicalTitle,
      "bodySystem": bodySystem,
    },
    "teaches": [
      `Pathophysiology of ${canonicalTitle}`,
      `Clinical signs and danger signs`,
      `Pharmacological management`,
      `Evidence-based nursing interventions`,
    ],
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "isAccessibleForFree": isFree,
    "inLanguage": "en",
    "interactivityType": "mixed",
    "hasPart": [
      { "@type": "Quiz", "name": `${canonicalTitle} Pre-Test`, "description": "Baseline knowledge assessment" },
      { "@type": "Quiz", "name": `${canonicalTitle} Post-Test`, "description": "Mastery verification assessment" },
    ],
  };

  if (!isFree) {
    data["hasPart"].push({
      "@type": "WebPageElement",
      "isAccessibleForFree": false,
      "cssSelector": ".premium-content",
    });
  }

  return data;
}

export function buildBreadcrumbStructuredData(items: { name: string; url: string }[]) {
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

export function buildFaqStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function buildArticleStructuredData(lessonId: string, lesson: LessonContent) {
  const description = generateLessonSeoDescription(lessonId, lesson);
  const bodySystem = getLessonBodySystem(lessonId);
  const canonicalTitle = stripTierFromTitle(lesson.title);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": canonicalTitle,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "publisher": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.nursenest.ca/brand-logo.gif",
      },
    },
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split("T")[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.nursenest.ca/lessons/${lessonId}`,
    },
    "articleSection": bodySystem,
    "inLanguage": "en",
  };
}

export function buildCourseStructuredData(lessonId: string, lesson: LessonContent) {
  const description = generateLessonSeoDescription(lessonId, lesson);
  const tierLabel = getLessonTierLabel(lessonId);
  const bodySystem = getLessonBodySystem(lessonId);
  const canonicalTitle = stripTierFromTitle(lesson.title);

  const examMap: Record<string, string> = {
    "Nurse Practitioner": "NP Certification",
    "Registered Nurse (NCLEX)": "NCLEX-RN",
    "Practical Nurse (RPN/LVN)": "REX-PN / CPNRE",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": canonicalTitle,
    "description": description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "educationalLevel": tierLabel,
    "educationalCredentialAwarded": examMap[tierLabel] || "Nursing Certification",
    "numberOfCredits": 1,
    "coursePrerequisites": `Enrollment in a ${tierLabel} program or equivalent clinical background`,
    "about": bodySystem,
    "inLanguage": "en",
    "url": `https://www.nursenest.ca/lessons/${lessonId}`,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT30M",
    },
    "teaches": [
      `Pathophysiology of ${canonicalTitle}`,
      `Clinical assessment and signs`,
      `Pharmacological management`,
      `Evidence-based interventions`,
    ],
  };
}

export function buildEducationalOrganizationStructuredData(options?: {
  name?: string;
  url?: string;
  description?: string;
  courses?: { name: string; description: string; url?: string }[];
}) {
  const orgName = options?.name || "NurseNest";
  const orgUrl = options?.url || "https://www.nursenest.ca";
  const orgDesc = options?.description || "Online nursing and allied health exam preparation platform";

  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": orgName,
    "url": orgUrl,
    "description": orgDesc,
    "sameAs": [
      "https://www.instagram.com/nursenest.ca",
      "https://www.tiktok.com/@nursenest.ca",
    ],
  };

  if (options?.courses && options.courses.length > 0) {
    data["hasOfferCatalog"] = {
      "@type": "OfferCatalog",
      "name": `${orgName} Course Catalog`,
      "itemListElement": options.courses.map(c => ({
        "@type": "Course",
        "name": c.name,
        "description": c.description,
        "provider": { "@type": "EducationalOrganization", "name": orgName },
        "courseMode": "online",
        ...(c.url ? { "url": c.url } : {}),
      })),
    };
  }

  return data;
}

export function buildFaqFromQuizQuestions(questions: { question: string; options: string[]; correct: number; rationale: string }[]) {
  const faqs = questions.slice(0, 10).map((q) => ({
    question: q.question,
    answer: `${q.options[q.correct]}. ${q.rationale}`,
  }));
  return buildFaqStructuredData(faqs);
}

export function buildCatalogStructuredData(lessons: { id: string; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nursing Pathophysiology Lessons",
    "description": "Comprehensive catalog of nursing pathophysiology lessons covering cardiovascular, respiratory, neurological, GI, renal, endocrine, hematology, pediatrics, maternity, neonatal, and more.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
    },
    "hasPart": lessons.slice(0, 50).map((l) => ({
      "@type": "LearningResource",
      "name": l.name,
      "url": `https://www.nursenest.ca/lessons/${l.id}`,
    })),
  };
}
