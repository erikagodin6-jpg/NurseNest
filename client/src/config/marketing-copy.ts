export type MarketingTrack = "general" | "rpn" | "rn" | "np";

export interface TrackHeroCopy {
  headline: string;
  subheadline: string;
  primaryCta: string;
  primaryCtaPath: string;
  secondaryCta: string;
  secondaryCtaPath: string;
  stats?: Array<{ label: string; value: string }>;
}

export interface TrackPainPoint {
  title: string;
  description: string;
}

export interface TrackFeatureBullet {
  title: string;
  description: string;
  icon: string;
}

export interface TrackTestimonial {
  quote: string;
  name: string;
  role: string;
  track: MarketingTrack;
}

export interface TrackFaqItem {
  question: string;
  answer: string;
}

export interface TrackValueProp {
  headline: string;
  bullets: string[];
}

export interface TrackPricingCopy {
  headline: string;
  description: string;
  whatsIncluded: string[];
  reassurance: string;
}

export interface TrackUpgradeCopy {
  headline: string;
  description: string;
  benefits: string[];
  cta: string;
}

export interface TrackCheckoutCopy {
  summary: string;
  reassurance: string;
}

export interface TrackCardCopy {
  title: string;
  audience: string;
  benefits: string[];
  cta: string;
  ctaPath: string;
  accentClass: string;
}

export interface MarketingCopy {
  track: MarketingTrack;
  hero: TrackHeroCopy;
  painPoints: TrackPainPoint[];
  solution: {
    headline: string;
    description: string;
    features: TrackFeatureBullet[];
  };
  valueProp: TrackValueProp;
  testimonials: TrackTestimonial[];
  faq: TrackFaqItem[];
  pricing: TrackPricingCopy;
  upgrade: TrackUpgradeCopy;
  checkout: TrackCheckoutCopy;
  trackCard: TrackCardCopy;
  featureFraming: Record<string, string>;
}

const generalCopy: MarketingCopy = {
  track: "general",
  hero: {
    headline: "Nursing exam prep, tailored to your track",
    subheadline: "NurseNest gives nursing learners a more personalized way to study — with track-specific exams, question banks, dashboards, and progress tools designed for your exact level of practice.",
    primaryCta: "Choose Your Track",
    primaryCtaPath: "#track-selector",
    secondaryCta: "Explore Free Practice",
    secondaryCtaPath: "/free-practice",
    stats: [
      { label: "Practice Questions", value: "3,900+" },
      { label: "Body Systems", value: "15+" },
      { label: "Exam Tracks", value: "3" },
      { label: "Pass Rate", value: "94%" },
    ],
  },
  painPoints: [
    { title: "One-size-fits-all prep fails learners", description: "Most platforms treat RPN, RN, and NP learners the same. But your scope, your exam, and your reasoning level are completely different." },
    { title: "Wrong-level content wastes time", description: "Studying material above or below your exam level leads to confusion, frustration, and wasted hours." },
    { title: "Generic dashboards hide real progress", description: "Without role-specific analytics, you cannot see whether you are actually exam-ready for your specific licensure path." },
  ],
  solution: {
    headline: "One platform. Three purpose-built study paths.",
    description: "NurseNest organizes everything — exams, questions, flashcards, dashboards — around the nursing level you are actually preparing for.",
    features: [
      { title: "Track-Specific Question Banks", description: "Questions written and calibrated for your exact exam scope and reasoning level.", icon: "FlaskConical" },
      { title: "Role-Matched Exams", description: "Practice exams that mirror the complexity, format, and clinical depth of your licensure exam.", icon: "ClipboardCheck" },
      { title: "Personalized Dashboards", description: "See your readiness, weak areas, and progress through the lens of your specific exam blueprint.", icon: "BarChart3" },
      { title: "Adaptive Study Tools", description: "Flashcards, study plans, and review sets that adapt to your performance and focus areas.", icon: "Brain" },
    ],
  },
  valueProp: {
    headline: "Find the study path built for your nursing level",
    bullets: [
      "One platform, tailored prep for practical nursing, RN readiness, and NP board-style learning",
      "Choose your track and start with the right tools",
      "Track-specific exams, question banks, and progress analytics",
    ],
  },
  testimonials: [],
  faq: [
    { question: "Is NurseNest designed for all nursing levels?", answer: "Yes. NurseNest offers three distinct study paths: RPN/LVN for practical nursing learners, RN for registered nurse exam prep, and NP for nurse practitioner board preparation. Each path has its own question bank, exams, and analytics." },
    { question: "Can I switch between tracks?", answer: "Your subscription gives you access to your chosen track. If you need to change tracks, you can update your subscription at any time." },
    { question: "Is there a free option?", answer: "Yes. You can explore free practice questions, sample lessons, and a preview of each study track before subscribing." },
    { question: "How is NurseNest different from other nursing prep platforms?", answer: "Most platforms use one question bank for everyone. NurseNest separates content by nursing level so your questions, exams, and analytics actually match your exam scope and reasoning requirements." },
  ],
  pricing: {
    headline: "Choose the plan that matches your exam path",
    description: "Each plan is built around the specific exam you are preparing for, with role-matched questions, exams, and study tools.",
    whatsIncluded: ["Track-specific question bank", "Practice exams matched to your level", "Progress dashboards and analytics", "Flashcards and study tools", "Weak-area review"],
    reassurance: "Cancel anytime. Study at your own pace.",
  },
  upgrade: {
    headline: "Unlock your full study path",
    description: "Get complete access to your track-specific exams, question bank, and study tools.",
    benefits: ["Full question bank access", "Unlimited practice exams", "Detailed performance analytics", "Personalized study plans"],
    cta: "Upgrade Now",
  },
  checkout: {
    summary: "You are unlocking full access to NurseNest exam prep.",
    reassurance: "Your subscription includes everything in your selected study track.",
  },
  trackCard: {
    title: "General",
    audience: "All nursing learners",
    benefits: [],
    cta: "Choose Your Track",
    ctaPath: "/pricing",
    accentClass: "border-primary/30",
  },
  featureFraming: {
    exams: "Practice exams for every nursing level",
    questionBank: "Questions calibrated to your scope",
    flashcards: "Study cards organized by topic and level",
    lessons: "Lessons designed for your exam path",
    progress: "Analytics that track your readiness",
    dailyQuestions: "Daily practice matched to your level",
  },
};

const rpnCopy: MarketingCopy = {
  track: "rpn",
  hero: {
    headline: "Practical nursing exam prep built for clarity and confidence",
    subheadline: "Focused support for practical nursing learners who want clear, high-yield review without feeling overwhelmed. Realistic RPN-style practice designed for predictable care, escalation, and exam readiness.",
    primaryCta: "Start RPN Prep",
    primaryCtaPath: "/pricing/rpn",
    secondaryCta: "Try Free RPN Questions",
    secondaryCtaPath: "/free-practice",
    stats: [
      { label: "RPN Questions", value: "500+" },
      { label: "Body Systems", value: "15+" },
      { label: "Practice Exams", value: "Unlimited" },
      { label: "Focus Areas", value: "9" },
    ],
  },
  painPoints: [
    { title: "Generic resources feel overwhelming", description: "Most exam prep is built for RN-level complexity. When you are preparing for practical nursing, the wrong depth creates confusion instead of confidence." },
    { title: "Too many tools built around the wrong exam", description: "Many platforms focus on U.S. NCLEX framing or advanced practice scenarios that do not match your scope of practice." },
    { title: "Practical nursing learners need targeted prep", description: "You need clear, foundational review that builds confidence — not content designed for a different exam level." },
  ],
  solution: {
    headline: "RPN exam prep designed for foundations, safe care, and confidence",
    description: "Everything in NurseNest RPN Prep is built around the practical nursing scope — from question difficulty to body system emphasis to how rationales explain the reasoning.",
    features: [
      { title: "RPN-Native Question Bank", description: "Questions written for practical nursing scope: foundational care, medication safety, common conditions, and escalation.", icon: "FlaskConical" },
      { title: "Safe Care and Medication Safety Review", description: "Focused practice on the nursing actions and medication decisions that matter most on the RPN exam.", icon: "Shield" },
      { title: "Practical Nursing Dashboards", description: "Track your readiness across RPN blueprint categories with progress that matches your exam structure.", icon: "BarChart3" },
      { title: "Confidence-Building Practice", description: "Graduated difficulty and supportive rationales that build your clinical reasoning step by step.", icon: "Target" },
    ],
  },
  valueProp: {
    headline: "Practical nursing exam prep built for foundations, safe care, medication safety, and confidence",
    bullets: [
      "Focused support for practical nursing learners who want clear, high-yield review without feeling overwhelmed",
      "Realistic RPN-style practice designed for predictable care, escalation, and exam readiness",
      "Questions, exams, and analytics calibrated for the RPN scope of practice",
    ],
  },
  testimonials: [
    { quote: "Finally found something that was not too overwhelming. The questions actually match what I need to know for the RPN exam.", name: "Sarah M.", role: "RPN Student", track: "rpn" },
    { quote: "The practical nursing focus made such a difference. I felt like this platform actually understood my exam path.", name: "Priya K.", role: "RPN Graduate", track: "rpn" },
    { quote: "The medication safety drills helped me feel so much more confident. I passed on my first attempt.", name: "Jessica L.", role: "RPN Student", track: "rpn" },
  ],
  faq: [
    { question: "Is this designed specifically for practical nursing learners?", answer: "Yes. NurseNest RPN Prep is built entirely around the practical nursing scope. Questions, exams, and analytics are calibrated for RPN-level reasoning, not RN or NP complexity." },
    { question: "Are the questions appropriate for RPN-level scope and reasoning?", answer: "Absolutely. Every question targets foundational care, medication safety, predictable conditions, and safe nursing actions — the exact skills tested on practical nursing exams." },
    { question: "Does this help with foundations, medication safety, and safe care decisions?", answer: "Yes. These are core focus areas in the RPN question bank, with dedicated practice sets and progress tracking for each." },
    { question: "Will this help me prepare for the REx-PN?", answer: "Yes. The content is aligned with practical nursing exam blueprints, covering the competency areas and question styles you will encounter." },
  ],
  pricing: {
    headline: "RPN exam prep built for your success",
    description: "Get full access to the practical nursing question bank, practice exams, flashcards, and readiness analytics.",
    whatsIncluded: ["500+ RPN-scope questions", "Unlimited RPN practice exams", "Medication safety drills", "Practical nursing flashcards", "Progress tracking by blueprint area", "Weak-topic review"],
    reassurance: "Built specifically for practical nursing learners. Cancel anytime.",
  },
  upgrade: {
    headline: "Unlock full RPN exam prep",
    description: "Get complete access to RPN exams, medication safety drills, practical nursing review sets, and detailed progress tracking.",
    benefits: ["Full RPN question bank", "Unlimited practice exams", "Medication safety practice", "Blueprint-aligned analytics"],
    cta: "Unlock RPN Prep",
  },
  checkout: {
    summary: "You are unlocking full access to NurseNest RPN Prep, including RPN exams, focused review, flashcards, study tools, and readiness tracking.",
    reassurance: "Your subscription is built specifically for practical nursing exam preparation.",
  },
  trackCard: {
    title: "RPN / LVN Prep",
    audience: "For practical nursing learners who want focused review, safer care reasoning, and confidence-building exam practice.",
    benefits: ["Foundational nursing care focus", "Medication safety review", "Predictable patient scenarios", "REx-PN readiness tools"],
    cta: "Explore RPN Prep",
    ctaPath: "/rpn",
    accentClass: "border-emerald-400/40 hover:border-emerald-400/70",
  },
  featureFraming: {
    exams: "Build your foundations with targeted practice exams",
    questionBank: "Strengthen safe care decisions with RPN-scope questions",
    flashcards: "Reinforce common conditions and practical nursing implications",
    lessons: "Clear lessons aligned with practical nursing competencies",
    progress: "Track readiness across RPN blueprint categories",
    dailyQuestions: "Daily practice on medication safety and foundational care",
  },
};

const rnCopy: MarketingCopy = {
  track: "rn",
  hero: {
    headline: "RN readiness starts with better clinical judgment practice",
    subheadline: "A deeper question bank and smarter readiness tools for RN learners who need more than memorization. Train the way RN exams actually test: trends, competing priorities, and safest-next-action reasoning.",
    primaryCta: "Start RN Prep",
    primaryCtaPath: "/pricing/rn",
    secondaryCta: "Try Free RN Questions",
    secondaryCtaPath: "/free-practice",
    stats: [
      { label: "RN Questions", value: "700+" },
      { label: "Clinical Systems", value: "15+" },
      { label: "Practice Exams", value: "Unlimited" },
      { label: "Exam Domains", value: "8" },
    ],
  },
  painPoints: [
    { title: "Too much passive studying", description: "Reading notes and watching videos does not build the clinical judgment skills that RN exams actually test." },
    { title: "Not enough realistic prioritization practice", description: "Many question banks use simple recall questions. RN exams require you to weigh competing priorities and make complex decisions." },
    { title: "Question banks often lack true exam-style reasoning", description: "If the questions do not challenge your ability to prioritize, delegate, and think critically, they are not preparing you for the real exam." },
  ],
  solution: {
    headline: "RN exam prep built for clinical judgment and prioritization",
    description: "NurseNest RN Prep challenges you with the same style of reasoning your exam demands — prioritization, management of care, and critical thinking under pressure.",
    features: [
      { title: "RN-Native Exams", description: "Practice exams designed around RN blueprint domains with realistic clinical complexity and decision-making scenarios.", icon: "ClipboardCheck" },
      { title: "Prioritization Drills", description: "Targeted practice on competing priorities, delegation, and safest-next-action reasoning.", icon: "Target" },
      { title: "Management of Care Practice", description: "Questions focused on the single largest domain of the RN exam: leadership, delegation, and clinical management.", icon: "Users" },
      { title: "Readiness Analytics", description: "See your performance across all 8 RN exam domains with detailed trend analysis and weak-area identification.", icon: "BarChart3" },
    ],
  },
  valueProp: {
    headline: "RN exam prep built for clinical judgment, prioritization, management of care, and high-yield practice",
    bullets: [
      "A deeper question bank and smarter readiness tools for RN learners who need more than memorization",
      "Train the way RN exams actually test: trends, competing priorities, and safest-next-action reasoning",
      "Practice exams, analytics, and study tools calibrated for RN-level clinical complexity",
    ],
  },
  testimonials: [
    { quote: "The prioritization questions were exactly what I needed. Other platforms felt too easy — this one actually challenged my reasoning.", name: "Michael T.", role: "RN Student", track: "rn" },
    { quote: "The clinical judgment practice helped me connect concepts to decision-making. I felt so much more prepared walking into my exam.", name: "Aisha R.", role: "RN Graduate", track: "rn" },
    { quote: "More realistic than passive studying. The readiness analytics showed me exactly where I needed to focus.", name: "David C.", role: "RN Student", track: "rn" },
  ],
  faq: [
    { question: "Are these questions focused on clinical judgment and prioritization?", answer: "Yes. The RN question bank emphasizes clinical judgment, prioritization, management of care, and complex decision-making — the reasoning skills your exam actually tests." },
    { question: "Is this more advanced than simple recall-based studying?", answer: "Absolutely. Our questions require you to weigh competing priorities, consider multiple patients, and think through delegation and safest-next-action scenarios." },
    { question: "Can I track weak areas and readiness trends?", answer: "Yes. The RN dashboard tracks your performance across all 8 exam blueprint domains and shows detailed trend analysis over time." },
    { question: "How does this compare to other RN prep platforms?", answer: "Most platforms use a generic question bank for all nursing levels. NurseNest RN Prep is specifically calibrated for RN-level complexity, with questions that match the clinical depth and reasoning style of your exam." },
  ],
  pricing: {
    headline: "RN exam prep that matches your exam's complexity",
    description: "Get full access to the RN question bank, clinical judgment exams, prioritization drills, and readiness analytics.",
    whatsIncluded: ["700+ RN-scope questions", "Unlimited clinical judgment exams", "Prioritization drills", "Management of care practice", "8-domain readiness analytics", "Detailed performance trends"],
    reassurance: "Built for RN-level clinical reasoning. Cancel anytime.",
  },
  upgrade: {
    headline: "Unlock full RN readiness prep",
    description: "Get complete access to RN readiness exams, clinical judgment drills, prioritization practice, and deeper performance analytics.",
    benefits: ["Full RN question bank", "Clinical judgment exams", "Prioritization practice", "Domain-level analytics"],
    cta: "Unlock RN Prep",
  },
  checkout: {
    summary: "You are unlocking full access to NurseNest RN Prep, including clinical judgment exams, prioritization practice, question banks, flashcards, and readiness analytics.",
    reassurance: "Your subscription is calibrated for RN-level exam preparation.",
  },
  trackCard: {
    title: "RN Prep",
    audience: "For RN learners who need stronger prioritization, clinical judgment, and realistic readiness practice.",
    benefits: ["Clinical judgment focus", "Prioritization drills", "Management of care practice", "8-domain readiness tracking"],
    cta: "Explore RN Prep",
    ctaPath: "/rn",
    accentClass: "border-blue-400/40 hover:border-blue-400/70",
  },
  featureFraming: {
    exams: "Sharpen clinical judgment with exam-style practice",
    questionBank: "Practice prioritization under pressure with RN-scope questions",
    flashcards: "Reinforce management of care and pharmacology concepts",
    lessons: "Build deeper clinical reasoning for complex scenarios",
    progress: "Improve management of care performance with domain analytics",
    dailyQuestions: "Daily prioritization and clinical judgment practice",
  },
};

const npCopy: MarketingCopy = {
  track: "np",
  hero: {
    headline: "Advanced NP board prep for serious clinical reasoning",
    subheadline: "Graduate-level clinical case practice designed for serious NP exam readiness. Strengthen differentials, pharmacotherapeutics, and evidence-informed decision-making in one premium study environment.",
    primaryCta: "Start NP Board Prep",
    primaryCtaPath: "/pricing/np",
    secondaryCta: "Try Free NP Questions",
    secondaryCtaPath: "/free-practice",
    stats: [
      { label: "NP Questions", value: "300+" },
      { label: "Clinical Domains", value: "12+" },
      { label: "Board-Style Cases", value: "Unlimited" },
      { label: "Diagnostic Focus", value: "Advanced" },
    ],
  },
  painPoints: [
    { title: "Generic nursing prep is too basic", description: "Most platforms are built for entry-level nursing. Advanced practice learners need case complexity and clinical depth that generic banks cannot provide." },
    { title: "Advanced practice requires deeper reasoning", description: "NP exams test differential diagnosis, prescribing decisions, and management planning — skills that simple nursing questions do not develop." },
    { title: "Serious board prep requires more than recall questions", description: "You need to practice diagnostic reasoning, workup selection, and pharmacotherapeutic decision-making at the graduate level." },
  ],
  solution: {
    headline: "NP board prep built for diagnostic reasoning and management",
    description: "NurseNest NP Board Prep gives you graduate-level clinical cases, differential diagnosis drills, and prescribing practice — the depth your boards actually demand.",
    features: [
      { title: "Advanced Cases", description: "Graduate-level clinical scenarios that challenge your diagnostic reasoning, workup decisions, and management planning.", icon: "Stethoscope" },
      { title: "Differential Diagnosis Drills", description: "Practice narrowing differentials, selecting appropriate diagnostics, and ruling out competing conditions.", icon: "Activity" },
      { title: "Prescribing and Management Practice", description: "Questions on pharmacotherapeutics, dosing considerations, contraindications, and evidence-informed treatment decisions.", icon: "Pill" },
      { title: "Advanced Analytics", description: "Track your performance across NP exam domains with detailed insights into diagnostic reasoning and management accuracy.", icon: "BarChart3" },
    ],
  },
  valueProp: {
    headline: "Advanced board-style preparation for diagnostic reasoning, advanced assessment, prescribing, and management planning",
    bullets: [
      "Graduate-level clinical case practice designed for serious NP exam readiness",
      "Strengthen differentials, pharmacotherapeutics, and evidence-informed decision-making",
      "Board-style exams, analytics, and review tools built for advanced practice",
    ],
  },
  testimonials: [
    { quote: "More advanced than generic nursing resources. The diagnostic reasoning cases pushed me to think like a provider, not just a nurse.", name: "Dr. Chen W.", role: "FNP Student", track: "np" },
    { quote: "The prescribing review and differential practice were exactly what I needed for boards. Nothing else comes close to this depth.", name: "Amanda S.", role: "AGNP Graduate", track: "np" },
    { quote: "Stronger clinical management reasoning than any other platform I tried. This is real board-level preparation.", name: "Robert J.", role: "NP Student", track: "np" },
  ],
  faq: [
    { question: "Are the questions advanced enough for NP board preparation?", answer: "Yes. The NP question bank features graduate-level clinical scenarios requiring differential diagnosis, workup selection, prescribing decisions, and management planning." },
    { question: "Does the platform cover differential diagnosis, prescribing, and management?", answer: "Absolutely. These are core pillars of the NP prep experience, with dedicated practice sets and analytics for each area." },
    { question: "Is the content graduate-level?", answer: "Yes. Every question, case, and rationale is written at the advanced practice level. This is not repackaged entry-level nursing content." },
    { question: "Which NP certifications does this cover?", answer: "The content is designed for family nurse practitioner (FNP), adult-gerontology (AGNP), and general NP board preparation. The clinical reasoning skills transfer across certification types." },
  ],
  pricing: {
    headline: "NP board prep at the level your exam demands",
    description: "Get full access to advanced clinical cases, diagnostic reasoning exams, prescribing review, and board-readiness analytics.",
    whatsIncluded: ["300+ NP-scope questions", "Unlimited board-style exams", "Differential diagnosis drills", "Prescribing and management review", "Advanced performance analytics", "Evidence-informed rationales"],
    reassurance: "Built for graduate-level clinical reasoning. Cancel anytime.",
  },
  upgrade: {
    headline: "Unlock advanced NP board prep",
    description: "Get complete access to advanced board-style cases, diagnostic reasoning practice, prescribing review, and advanced analytics.",
    benefits: ["Full NP question bank", "Board-style clinical cases", "Prescribing review", "Advanced domain analytics"],
    cta: "Unlock NP Board Prep",
  },
  checkout: {
    summary: "You are unlocking full access to NurseNest NP Board Prep, including advanced cases, diagnostic reasoning exams, prescribing and management review, and board-readiness analytics.",
    reassurance: "Your subscription is built for graduate-level board preparation.",
  },
  trackCard: {
    title: "NP Board Prep",
    audience: "For advanced practice learners who need graduate-level diagnostic reasoning, prescribing, and management preparation.",
    benefits: ["Diagnostic reasoning focus", "Advanced clinical cases", "Prescribing review", "Board-readiness analytics"],
    cta: "Explore NP Prep",
    ctaPath: "/np",
    accentClass: "border-violet-400/40 hover:border-violet-400/70",
  },
  featureFraming: {
    exams: "Strengthen advanced assessment with board-style exams",
    questionBank: "Improve differential diagnosis with NP-scope questions",
    flashcards: "Refine pharmacotherapeutic decisions with advanced cards",
    lessons: "Master evidence-informed management planning",
    progress: "Track diagnostic reasoning accuracy and board readiness",
    dailyQuestions: "Daily advanced cases and prescribing practice",
  },
};

const marketingCopyConfig: Record<MarketingTrack, MarketingCopy> = {
  general: generalCopy,
  rpn: rpnCopy,
  rn: rnCopy,
  np: npCopy,
};

export function getMarketingCopy(track: MarketingTrack): MarketingCopy {
  return marketingCopyConfig[track] || marketingCopyConfig.general;
}

export function getAllTrackCards(): TrackCardCopy[] {
  return [rpnCopy.trackCard, rnCopy.trackCard, npCopy.trackCard];
}

export function getTestimonialsForTrack(track: MarketingTrack): TrackTestimonial[] {
  if (track === "general") {
    return [...rpnCopy.testimonials.slice(0, 1), ...rnCopy.testimonials.slice(0, 1), ...npCopy.testimonials.slice(0, 1)];
  }
  return marketingCopyConfig[track]?.testimonials || [];
}

export function resolveTrackFromParams(params: {
  urlTrack?: string;
  userTier?: string;
  storedTrack?: string;
}): MarketingTrack {
  const { urlTrack, userTier, storedTrack } = params;
  if (urlTrack && ["rpn", "rn", "np"].includes(urlTrack)) return urlTrack as MarketingTrack;
  if (userTier && ["rpn", "rn", "np"].includes(userTier)) return userTier as MarketingTrack;
  if (storedTrack && ["rpn", "rn", "np"].includes(storedTrack)) return storedTrack as MarketingTrack;
  return "general";
}

export { marketingCopyConfig };
