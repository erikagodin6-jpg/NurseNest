import { useState } from "react";
import { useRoute } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { LocaleLink } from "@/lib/LocaleLink";
import { useI18n } from "@/lib/i18n";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  BookOpen, Zap, Heart, Droplets, FlaskConical, Activity,
  ArrowRight, ChevronDown, ChevronRight, CheckCircle2,
  Lightbulb, Target, FileText, GraduationCap
} from "lucide-react";

interface StudyGuideDef {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof BookOpen;
  color: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

const STUDY_GUIDES: StudyGuideDef[] = [
  {
    slug: "electrolytes-nursing-guide",
    title: "Electrolytes for Nursing Exams — Complete Study Guide",
    shortTitle: "Electrolytes",
    description: "Master sodium, potassium, calcium, magnesium, and phosphorus imbalances. Includes normal ranges, clinical signs, nursing interventions, and exam-style practice scenarios.",
    icon: Zap,
    color: "#F59E0B",
    metaTitle: "Electrolytes for Nursing Exams — Complete Study Guide | NurseNest",
    metaDescription: "Comprehensive electrolyte study guide for nursing students. Normal ranges, clinical signs of imbalances, nursing interventions, and NCLEX-style practice for Na, K, Ca, Mg, and phosphorus.",
    keywords: "electrolytes nursing, sodium potassium calcium magnesium, nursing exam prep, NCLEX electrolytes, fluid and electrolyte imbalances",
  },
  {
    slug: "acid-base-disorders-study-guide",
    title: "Acid-Base Disorders — Nursing Study Guide",
    shortTitle: "Acid-Base Disorders",
    description: "Understand respiratory and metabolic acidosis/alkalosis, ABG interpretation, compensation mechanisms, and clinical management for nursing practice.",
    icon: FlaskConical,
    color: "#8B5CF6",
    metaTitle: "Acid-Base Disorders — Nursing Study Guide | NurseNest",
    metaDescription: "Master acid-base disorders for nursing exams. Step-by-step ABG interpretation, respiratory vs metabolic acidosis and alkalosis, compensation, and NCLEX practice scenarios.",
    keywords: "acid-base disorders nursing, ABG interpretation, metabolic acidosis, respiratory alkalosis, NCLEX acid-base",
  },
  {
    slug: "ecg-interpretation-study-guide",
    title: "Cardiac ECG Interpretation — Nursing Study Guide",
    shortTitle: "ECG Interpretation",
    description: "Learn systematic ECG analysis from basic rhythm strips to 12-lead interpretation. Covers normal sinus rhythm, arrhythmias, heart blocks, and STEMI recognition.",
    icon: Heart,
    color: "#EF4444",
    metaTitle: "ECG Interpretation for Nurses — Complete Study Guide | NurseNest",
    metaDescription: "Learn ECG interpretation for nursing exams. Systematic approach to rhythm analysis, arrhythmia recognition, heart blocks, STEMI identification, and clinical nursing interventions.",
    keywords: "ECG interpretation nursing, EKG reading, cardiac arrhythmias, heart blocks, STEMI recognition, NCLEX cardiac",
  },
  {
    slug: "fluid-electrolyte-balance-guide",
    title: "Fluid and Electrolyte Balance — Nursing Study Guide",
    shortTitle: "Fluid Balance",
    description: "Understand fluid compartments, osmolality, IV fluid types, fluid volume excess and deficit, and nursing assessment of hydration status.",
    icon: Droplets,
    color: "#3B82F6",
    metaTitle: "Fluid and Electrolyte Balance — Nursing Study Guide | NurseNest",
    metaDescription: "Comprehensive fluid balance study guide for nursing students. IV fluid types, fluid volume deficit and excess, osmolality, dehydration assessment, and NCLEX preparation.",
    keywords: "fluid balance nursing, IV fluids, dehydration, fluid volume excess, osmolality, NCLEX fluid electrolyte",
  },
  {
    slug: "critical-lab-values-guide",
    title: "Critical Lab Values — Nursing Study Guide",
    shortTitle: "Critical Lab Values",
    description: "Know the lab values that require immediate nursing action. Covers critical ranges, nursing responsibilities, and when to notify the provider.",
    icon: Activity,
    color: "#DC2626",
    metaTitle: "Critical Lab Values Every Nurse Must Know | NurseNest",
    metaDescription: "Essential critical lab values study guide for nursing students. Learn which lab results require immediate action, normal ranges, panic values, and nursing interventions for NCLEX.",
    keywords: "critical lab values nursing, panic values, normal lab values, nursing lab interpretation, NCLEX lab values",
  },
];

function StudyGuideCard({ guide }: { guide: StudyGuideDef }) {
  const Icon = guide.icon;
  return (
    <LocaleLink href={`/nursing-study-guides/${guide.slug}`} className="block" data-testid={`card-guide-${guide.slug}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-emerald-300 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${guide.color}15` }}>
            <Icon className="w-6 h-6" style={{ color: guide.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors" data-testid={`text-guide-title-${guide.slug}`}>
              {guide.shortTitle}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{guide.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 mt-3 group-hover:gap-2 transition-all">
              Read Guide <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}

function FaqAccordion({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg" data-testid={`faq-item-${index}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left" data-testid={`button-faq-toggle-${index}`}>
        <span className="font-medium text-gray-900 dark:text-white">{question}</span>
        {open ? <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />}
      </button>
      {open && <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">{answer}</div>}
    </div>
  );
}

function NursingStudyGuidesHub() {
  const { t } = useI18n();

  const hubFaqs = [
    { question: "How should I use these nursing study guides?", answer: "These study guides are designed as comprehensive reference material. Start with the guide that covers your weakest topic, read through the content, then reinforce your learning with our practice questions and flashcards linked within each guide." },
    { question: "Are these study guides aligned with NCLEX content?", answer: "Yes. All study guides cover topics that appear on the NCLEX-RN and NCLEX-PN exam blueprints. The content is organized by the clinical concepts most frequently tested, with exam tips and practice scenarios included." },
    { question: "Can I use these guides for other nursing exams?", answer: "Absolutely. These guides cover fundamental nursing science that applies to NCLEX, REX-PN, HESI, ATI, and nursing school course exams. The underlying clinical concepts are universal across nursing education." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nursing Study Guides — Comprehensive Exam Prep Resources",
    "description": "Free nursing study guides covering electrolytes, acid-base disorders, ECG interpretation, fluid balance, and critical lab values for nursing exam preparation.",
    "provider": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
    "hasPart": STUDY_GUIDES.map(g => ({
      "@type": "LearningResource",
      "name": g.title,
      "url": `https://www.nursenest.ca/nursing-study-guides/${g.slug}`,
      "educationalLevel": "College",
      "learningResourceType": "Study Guide",
    })),
  };

  return (
    <>
      <SEO
        title="Nursing Study Guides — Free Exam Prep Resources"
        description="Comprehensive nursing study guides covering electrolytes, acid-base disorders, ECG interpretation, fluid balance, and critical lab values. Aligned with NCLEX and REX-PN exam blueprints."
        keywords="nursing study guides, NCLEX prep, electrolytes nursing, acid-base, ECG interpretation, lab values, nursing exam study material"
        canonicalPath="/nursing-study-guides"
        structuredData={structuredData}
        additionalStructuredData={[buildFaqStructuredData(hubFaqs)]}
      />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4" data-testid="badge-study-guides">
              <BookOpen className="w-4 h-4" /> Cornerstone Study Resources
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-guides-heading">
              {t("nursingStudyGuides.heading", { "default": "Nursing Study Guides" })}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-testid="text-guides-subtitle">
              In-depth study guides covering the most tested nursing topics. Each guide includes clinical explanations, normal values, nursing interventions, and links to practice questions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-study-guides">
            {STUDY_GUIDES.map(guide => (
              <StudyGuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {hubFaqs.map((faq, i) => (
                <FaqAccordion key={i} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </div>

          <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Deepen Your Understanding</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Pair these study guides with our pathophysiology lessons, clinical simulations, and adaptive question banks for comprehensive exam preparation.
            </p>
            <div className="flex flex-wrap gap-3">
              <LocaleLink href="/lessons" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors" data-testid="link-lessons-cta">
                <BookOpen className="w-4 h-4" /> Explore Lessons
              </LocaleLink>
              <LocaleLink href="/clinical-calculators" className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors" data-testid="link-calculators-cta">
                Clinical Calculators <ArrowRight className="w-4 h-4" />
              </LocaleLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function KeyPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg my-3">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-emerald-800 dark:text-emerald-200">{children}</div>
    </div>
  );
}

function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg my-3">
      <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-amber-800 dark:text-amber-200">{children}</div>
    </div>
  );
}

function ValueTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead><tr className="bg-gray-50 dark:bg-gray-800">{headers.map((h, i) => <th key={i} className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i} className="border-b border-gray-100 dark:border-gray-800">{row.map((cell, j) => <td key={j} className="px-4 py-2 text-gray-700 dark:text-gray-300">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function StudyGuidePageWrapper({ guide, children }: { guide: StudyGuideDef; children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.metaDescription,
    "url": `https://www.nursenest.ca/nursing-study-guides/${guide.slug}`,
    "author": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
    "publisher": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
    "educationalLevel": "College",
    "learningResourceType": "Study Guide",
    "datePublished": "2025-01-15",
    "dateModified": "2026-03-01",
  };

  return (
    <>
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        keywords={guide.keywords}
        canonicalPath={`/nursing-study-guides/${guide.slug}`}
        structuredData={structuredData}
      />
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          <div className="mb-6">
            <LocaleLink href="/nursing-study-guides" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1" data-testid="link-back-guides">
              <ChevronRight className="w-4 h-4 rotate-180" /> All Study Guides
            </LocaleLink>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${guide.color}15` }}>
              <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-guide-page-title">
              {guide.shortTitle}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{guide.description}</p>
          {children}
          <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Continue Your Study</h3>
            <div className="flex flex-wrap gap-3">
              <LocaleLink href="/question-bank" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700" data-testid="link-practice-questions">
                <Target className="w-4 h-4" /> Practice Questions
              </LocaleLink>
              <LocaleLink href="/flashcards" className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50" data-testid="link-flashcards">
                <FileText className="w-4 h-4" /> Flashcards
              </LocaleLink>
              <LocaleLink href="/lessons" className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50" data-testid="link-lessons">
                <BookOpen className="w-4 h-4" /> Pathophysiology Lessons
              </LocaleLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ElectrolytesGuide() {
  const guide = STUDY_GUIDES.find(g => g.slug === "electrolytes-nursing-guide")!;
  return (
    <StudyGuidePageWrapper guide={guide}>
      <Section title="Overview of Electrolytes in Nursing">
        <p>Electrolyte imbalances are among the most commonly tested topics on nursing licensing exams. Understanding normal ranges, clinical manifestations, and appropriate nursing interventions is essential for both exam success and safe clinical practice. Electrolytes are minerals that carry an electrical charge and are essential for nerve conduction, muscle contraction, fluid balance, and acid-base regulation.</p>
        <KeyPoint><strong>Key principle:</strong> Electrolyte imbalances rarely occur in isolation. Hypokalemia often accompanies hypomagnesemia, and correcting the underlying cause is as important as treating the lab value.</KeyPoint>
      </Section>
      <Section title="Sodium (Na⁺)">
        <ValueTable headers={["Parameter", "Value"]} rows={[["Normal Range", "135–145 mEq/L"], ["Critical Low", "< 120 mEq/L"], ["Critical High", "> 160 mEq/L"]]} />
        <p><strong>Hyponatremia (Na⁺ &lt; 135):</strong> Causes include SIADH, heart failure, excessive hypotonic IV fluids, and diuretic use. Signs: confusion, headache, nausea, seizures (severe). Nursing: fluid restriction, monitor I&O, assess neuro status, administer hypertonic saline cautiously if severe (risk of osmotic demyelination if corrected too rapidly).</p>
        <p><strong>Hypernatremia (Na⁺ &gt; 145):</strong> Causes include dehydration, diabetes insipidus, excessive sodium intake. Signs: thirst, dry mucous membranes, restlessness, seizures. Nursing: gradual rehydration with hypotonic fluids, monitor for cerebral edema, strict I&O monitoring.</p>
        <ExamTip><strong>NCLEX Tip:</strong> "Water follows sodium" — remember that sodium problems are often water problems. SIADH = dilutional hyponatremia (too much water). Diabetes insipidus = hypernatremia (too little water).</ExamTip>
      </Section>
      <Section title="Potassium (K⁺)">
        <ValueTable headers={["Parameter", "Value"]} rows={[["Normal Range", "3.5–5.0 mEq/L"], ["Critical Low", "< 2.5 mEq/L"], ["Critical High", "> 6.5 mEq/L"]]} />
        <p><strong>Hypokalemia (K⁺ &lt; 3.5):</strong> Causes include diuretics (furosemide), vomiting, diarrhea, alkalosis. Signs: muscle weakness, leg cramps, diminished reflexes, cardiac arrhythmias (flattened T waves, U waves, ST depression). Nursing: oral or IV potassium replacement (never push IV potassium), monitor ECG, assess digoxin toxicity risk.</p>
        <p><strong>Hyperkalemia (K⁺ &gt; 5.0):</strong> Causes include renal failure, ACE inhibitors, potassium-sparing diuretics, burns, crush injuries. Signs: muscle weakness, paresthesias, cardiac arrhythmias (peaked T waves, widened QRS, sine wave pattern). Nursing: cardiac monitoring, administer calcium gluconate (cardioprotective), insulin + dextrose, kayexalate, prepare for dialysis if severe.</p>
        <ExamTip><strong>NCLEX Tip:</strong> Potassium is the most commonly tested electrolyte. Remember: IV potassium must be diluted and infused slowly (max 10 mEq/hr peripherally, max 20 mEq/hr centrally). Never push IV potassium — it causes cardiac arrest.</ExamTip>
      </Section>
      <Section title="Calcium (Ca²⁺)">
        <ValueTable headers={["Parameter", "Value"]} rows={[["Normal Range", "8.5–10.5 mg/dL (total)"], ["Ionized Calcium", "4.5–5.5 mg/dL"], ["Critical Low", "< 7.0 mg/dL"], ["Critical High", "> 12.0 mg/dL"]]} />
        <p><strong>Hypocalcemia (Ca²⁺ &lt; 8.5):</strong> Causes include hypoparathyroidism, vitamin D deficiency, pancreatitis, renal failure. Signs: Trousseau's sign (carpal spasm with BP cuff), Chvostek's sign (facial twitch), tetany, seizures, prolonged QT. Nursing: IV calcium gluconate, seizure precautions, monitor ECG.</p>
        <p><strong>Hypercalcemia (Ca²⁺ &gt; 10.5):</strong> Causes include hyperparathyroidism, malignancy, immobility, excessive vitamin D. Signs: "bones, stones, moans, groans" (bone pain, kidney stones, confusion, GI symptoms). Nursing: hydration with NS, loop diuretics, calcitonin, bisphosphonates.</p>
        <KeyPoint><strong>Remember:</strong> Calcium and phosphorus have an inverse relationship — when one goes up, the other goes down. Always check both values together.</KeyPoint>
      </Section>
      <Section title="Magnesium (Mg²⁺)">
        <ValueTable headers={["Parameter", "Value"]} rows={[["Normal Range", "1.5–2.5 mEq/L"], ["Critical Low", "< 1.0 mEq/L"], ["Critical High", "> 4.0 mEq/L"]]} />
        <p><strong>Hypomagnesemia (Mg²⁺ &lt; 1.5):</strong> Causes include alcoholism, malnutrition, diuretics, diarrhea. Signs: tremors, hyperreflexia, tetany, seizures, cardiac arrhythmias (torsades de pointes). Nursing: IV magnesium sulfate (with calcium gluconate at bedside as antidote), monitor deep tendon reflexes, respiratory rate, and urine output.</p>
        <p><strong>Hypermagnesemia (Mg²⁺ &gt; 2.5):</strong> Causes include renal failure, excessive magnesium intake (antacids, laxatives). Signs: decreased DTRs, hypotension, respiratory depression, cardiac arrest. Nursing: stop magnesium, administer calcium gluconate, prepare for dialysis.</p>
        <ExamTip><strong>Exam Tip:</strong> When monitoring IV magnesium sulfate (e.g., for preeclampsia), assess three things: deep tendon reflexes (should be present), respiratory rate (should be ≥12), and urine output (should be ≥30 mL/hr). Absent DTRs = magnesium toxicity.</ExamTip>
      </Section>
      <Section title="Phosphorus (PO₄³⁻)">
        <ValueTable headers={["Parameter", "Value"]} rows={[["Normal Range", "2.5–4.5 mg/dL"], ["Critical Low", "< 1.0 mg/dL"], ["Critical High", "> 8.0 mg/dL"]]} />
        <p><strong>Hypophosphatemia (PO₄ &lt; 2.5):</strong> Causes include refeeding syndrome, antacid use, alcoholism, DKA treatment. Signs: muscle weakness, respiratory failure, confusion, rhabdomyolysis. Nursing: oral or IV phosphorus replacement, monitor respiratory status.</p>
        <p><strong>Hyperphosphatemia (PO₄ &gt; 4.5):</strong> Causes include renal failure, tumor lysis syndrome, hypoparathyroidism. Signs: often asymptomatic; may cause symptoms of hypocalcemia (calcium-phosphorus inverse relationship). Nursing: phosphate binders with meals, dietary phosphorus restriction.</p>
      </Section>
    </StudyGuidePageWrapper>
  );
}

function AcidBaseGuide() {
  const guide = STUDY_GUIDES.find(g => g.slug === "acid-base-disorders-study-guide")!;
  return (
    <StudyGuidePageWrapper guide={guide}>
      <Section title="Understanding Acid-Base Balance">
        <p>The body maintains blood pH between 7.35 and 7.45 through three buffering systems: the bicarbonate buffer system, the respiratory system (lungs), and the renal system (kidneys). Disruptions to this balance result in four primary acid-base disorders that nurses must recognize and manage.</p>
        <ValueTable headers={["ABG Component", "Normal Range", "Interpretation"]} rows={[
          ["pH", "7.35–7.45", "< 7.35 = Acidosis, > 7.45 = Alkalosis"],
          ["PaCO₂", "35–45 mmHg", "Respiratory component (inverse relationship with pH)"],
          ["HCO₃⁻", "22–26 mEq/L", "Metabolic component (direct relationship with pH)"],
          ["PaO₂", "80–100 mmHg", "Oxygenation status (not acid-base)"],
        ]} />
        <KeyPoint><strong>Key principle:</strong> The lungs compensate quickly (minutes to hours) by adjusting CO₂ elimination. The kidneys compensate slowly (hours to days) by retaining or excreting bicarbonate.</KeyPoint>
      </Section>
      <Section title="Step-by-Step ABG Interpretation">
        <p><strong>Step 1: Evaluate pH.</strong> Below 7.35 = acidosis. Above 7.45 = alkalosis. Normal pH with abnormal CO₂ and HCO₃ = fully compensated.</p>
        <p><strong>Step 2: Evaluate PaCO₂.</strong> If PaCO₂ is abnormal and explains the pH change, the primary disorder is respiratory. CO₂ is an acid — elevated CO₂ causes acidosis.</p>
        <p><strong>Step 3: Evaluate HCO₃⁻.</strong> If HCO₃ is abnormal and explains the pH change, the primary disorder is metabolic. HCO₃ is a base — decreased HCO₃ causes acidosis.</p>
        <p><strong>Step 4: Assess compensation.</strong> If the other system (respiratory or metabolic) is also abnormal and moving in the direction to normalize pH, compensation is occurring.</p>
        <ExamTip><strong>NCLEX Tip:</strong> The "ROME" mnemonic: Respiratory = Opposite (pH and CO₂ move in opposite directions). Metabolic = Equal (pH and HCO₃ move in the same direction).</ExamTip>
      </Section>
      <Section title="Respiratory Acidosis">
        <p><strong>Definition:</strong> pH &lt; 7.35 with PaCO₂ &gt; 45 mmHg. The lungs are not eliminating enough CO₂.</p>
        <p><strong>Common causes:</strong> COPD, respiratory depression (opioids, sedation), pneumonia, airway obstruction, neuromuscular diseases (Guillain-Barré, myasthenia gravis).</p>
        <p><strong>Signs:</strong> Dyspnea, confusion, headache, drowsiness progressing to lethargy, tachycardia.</p>
        <p><strong>Nursing interventions:</strong> Improve ventilation (positioning, bronchodilators, incentive spirometry), administer supplemental oxygen cautiously in COPD patients, prepare for mechanical ventilation if severe, monitor respiratory rate and depth.</p>
      </Section>
      <Section title="Respiratory Alkalosis">
        <p><strong>Definition:</strong> pH &gt; 7.45 with PaCO₂ &lt; 35 mmHg. The lungs are eliminating too much CO₂ (hyperventilation).</p>
        <p><strong>Common causes:</strong> Anxiety/panic attacks, pain, fever, early salicylate poisoning, mechanical overventilation, hypoxia-driven tachypnea.</p>
        <p><strong>Signs:</strong> Lightheadedness, numbness/tingling (circumoral and extremities), muscle spasms, palpitations.</p>
        <p><strong>Nursing interventions:</strong> Address underlying cause, coach slow breathing, provide reassurance for anxiety-related hyperventilation, adjust ventilator settings if mechanically ventilated.</p>
      </Section>
      <Section title="Metabolic Acidosis">
        <p><strong>Definition:</strong> pH &lt; 7.35 with HCO₃⁻ &lt; 22 mEq/L. The body has excess acid or lost bicarbonate.</p>
        <p><strong>Common causes:</strong> DKA, lactic acidosis, renal failure, diarrhea (loss of bicarbonate), toxic ingestions (methanol, ethylene glycol).</p>
        <p><strong>Signs:</strong> Kussmaul respirations (deep, rapid breathing — compensatory), confusion, fatigue, nausea, abdominal pain.</p>
        <p><strong>Nursing interventions:</strong> Treat underlying cause (insulin for DKA, fluids for lactic acidosis), administer sodium bicarbonate if pH &lt; 7.1, monitor potassium (shifts with acidosis correction), assess respiratory effort.</p>
        <KeyPoint><strong>Calculate the anion gap</strong> to differentiate between anion gap acidosis (DKA, lactic acidosis — MUDPILES) and non-anion gap acidosis (diarrhea, RTA — HARDUPS). Use our <LocaleLink href="/clinical-calculators/anion-gap" className="text-emerald-600 underline">Anion Gap Calculator</LocaleLink>.</KeyPoint>
      </Section>
      <Section title="Metabolic Alkalosis">
        <p><strong>Definition:</strong> pH &gt; 7.45 with HCO₃⁻ &gt; 26 mEq/L. The body has excess bicarbonate or lost acid.</p>
        <p><strong>Common causes:</strong> Prolonged vomiting/NG suction (loss of HCl), excessive antacid use, hypokalemia, diuretic use.</p>
        <p><strong>Signs:</strong> Confusion, muscle twitching, hand tremors, hypoventilation (compensatory — shallow breathing).</p>
        <p><strong>Nursing interventions:</strong> Replace chloride and potassium, administer anti-emetics, discontinue offending medications, monitor respiratory status for compensatory hypoventilation.</p>
        <ExamTip><strong>Exam Tip:</strong> Vomiting causes metabolic alkalosis (loss of stomach acid). Diarrhea causes metabolic acidosis (loss of bicarbonate from intestines). This distinction is commonly tested.</ExamTip>
      </Section>
    </StudyGuidePageWrapper>
  );
}

function ECGGuide() {
  const guide = STUDY_GUIDES.find(g => g.slug === "ecg-interpretation-study-guide")!;
  return (
    <StudyGuidePageWrapper guide={guide}>
      <Section title="Systematic ECG Interpretation Approach">
        <p>Consistent ECG analysis requires a systematic approach. Use the same sequence every time to avoid missing critical findings. The recommended approach: Rate → Rhythm → P waves → PR interval → QRS complex → ST segment → T waves.</p>
        <ValueTable headers={["Component", "Normal Value", "What It Represents"]} rows={[
          ["Heart Rate", "60–100 bpm", "Ventricular rate (count R-R intervals)"],
          ["P Wave", "Upright, uniform", "Atrial depolarization"],
          ["PR Interval", "0.12–0.20 sec", "AV conduction time"],
          ["QRS Complex", "< 0.12 sec", "Ventricular depolarization"],
          ["QT Interval", "< 0.44 sec", "Total ventricular activity"],
          ["ST Segment", "Isoelectric (flat)", "Early ventricular repolarization"],
          ["T Wave", "Upright, rounded", "Ventricular repolarization"],
        ]} />
        <ExamTip><strong>NCLEX Tip:</strong> You don't need to be a cardiologist, but you must recognize lethal rhythms: V-fib (immediate defibrillation), V-tach (pulseless = defibrillation; with pulse = amiodarone + cardioversion), asystole (CPR + epinephrine), and PEA (CPR + treat cause).</ExamTip>
      </Section>
      <Section title="Normal Sinus Rhythm (NSR)">
        <p>Normal sinus rhythm is the baseline against which all other rhythms are compared. Criteria: rate 60–100 bpm, regular rhythm, one P wave before each QRS, PR interval 0.12–0.20 sec, narrow QRS (&lt; 0.12 sec). NSR originates from the SA node and represents normal cardiac conduction.</p>
      </Section>
      <Section title="Common Arrhythmias">
        <p><strong>Sinus Bradycardia:</strong> Rate &lt; 60 bpm with normal P-QRS-T morphology. Common in athletes, during sleep, and with beta-blocker use. Treat with atropine if symptomatic (hypotension, altered mental status). Pacing may be needed for unresponsive symptomatic bradycardia.</p>
        <p><strong>Sinus Tachycardia:</strong> Rate &gt; 100 bpm with normal morphology. Causes: fever, pain, anxiety, dehydration, hemorrhage, heart failure. Treatment: address the underlying cause — sinus tachycardia is a symptom, not a primary rhythm disorder.</p>
        <p><strong>Atrial Fibrillation (A-Fib):</strong> Irregularly irregular rhythm with no discernible P waves (fibrillatory baseline). Risk of atrial thrombus formation → stroke. Management: rate control (diltiazem, metoprolol), rhythm control (amiodarone, cardioversion), anticoagulation (warfarin, DOACs).</p>
        <p><strong>Atrial Flutter:</strong> "Sawtooth" pattern of flutter waves, typically at 300 bpm with 2:1, 3:1, or 4:1 conduction. Ventricular rate is regular. Treatment similar to A-fib; cardioversion is often effective.</p>
        <KeyPoint><strong>Key nursing action for A-fib:</strong> Assess for signs of stroke (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911). A-fib is the most common cause of cardioembolic stroke.</KeyPoint>
      </Section>
      <Section title="Heart Blocks">
        <p><strong>First-Degree AV Block:</strong> PR interval &gt; 0.20 sec, every P wave conducts. Usually benign — monitor only.</p>
        <p><strong>Second-Degree Type I (Wenckebach):</strong> Progressive PR prolongation until a QRS is dropped. Often transient and asymptomatic. Monitor; usually no treatment needed.</p>
        <p><strong>Second-Degree Type II (Mobitz II):</strong> Consistent PR intervals with sudden dropped QRS complexes. More serious — can progress to complete heart block. May require pacing.</p>
        <p><strong>Third-Degree (Complete) Heart Block:</strong> Complete AV dissociation — P waves and QRS complexes are independent. Wide QRS with slow ventricular rate. Emergency: transcutaneous pacing, atropine, prepare for permanent pacemaker.</p>
        <ExamTip><strong>Exam Tip:</strong> "Wenck-E-bach" — think "longer, longer, longer, DROP, now you have a Wenckebach." For Type II: "some P's don't get through" — fixed PR intervals with randomly dropped QRS complexes.</ExamTip>
      </Section>
      <Section title="Ventricular Rhythms">
        <p><strong>Premature Ventricular Contractions (PVCs):</strong> Wide, bizarre QRS complexes followed by compensatory pause. Occasional PVCs are common and benign. Frequent PVCs (&gt; 6/min), multifocal, R-on-T phenomenon, or runs of PVCs require intervention (amiodarone, lidocaine, address electrolytes).</p>
        <p><strong>Ventricular Tachycardia (V-Tach):</strong> Three or more consecutive PVCs at rate &gt; 100 bpm. Wide QRS complexes. Pulseless V-tach: defibrillate immediately. V-tach with pulse: amiodarone, synchronized cardioversion if unstable.</p>
        <p><strong>Ventricular Fibrillation (V-Fib):</strong> Chaotic, disorganized electrical activity — no effective cardiac output. Immediately defibrillate. CPR until defibrillator ready. Epinephrine + amiodarone per ACLS protocol.</p>
        <KeyPoint><strong>Life-threatening rhythms:</strong> V-fib and pulseless V-tach are shockable rhythms. Asystole and PEA are non-shockable. Know the ACLS algorithms for each.</KeyPoint>
      </Section>
      <Section title="STEMI Recognition">
        <p>ST-elevation myocardial infarction (STEMI) requires immediate recognition and intervention. Look for ST-segment elevation ≥ 1mm in two or more contiguous leads. Territory localization: Inferior (II, III, aVF), Anterior (V1–V4), Lateral (I, aVL, V5–V6). Reciprocal ST depression in opposite leads supports the diagnosis.</p>
        <p><strong>Nursing priorities for STEMI:</strong> MONA (Morphine if needed, Oxygen if SpO₂ &lt; 94%, Nitroglycerin, Aspirin 325 mg chewed). Activate cath lab for PCI within 90 minutes of arrival. Obtain serial 12-lead ECGs. Monitor for dysrhythmias.</p>
      </Section>
    </StudyGuidePageWrapper>
  );
}

function FluidBalanceGuide() {
  const guide = STUDY_GUIDES.find(g => g.slug === "fluid-electrolyte-balance-guide")!;
  return (
    <StudyGuidePageWrapper guide={guide}>
      <Section title="Fluid Compartments and Distribution">
        <p>Total body water comprises approximately 60% of body weight in adults (less in elderly and obese patients). This water is distributed between two main compartments: intracellular fluid (ICF, about 2/3) and extracellular fluid (ECF, about 1/3). The ECF is further divided into intravascular (plasma) and interstitial (between cells) compartments.</p>
        <ValueTable headers={["Compartment", "Percentage of Body Water", "Clinical Significance"]} rows={[
          ["Intracellular (ICF)", "~67%", "Potassium is the primary cation; where cellular metabolism occurs"],
          ["Interstitial", "~25%", "Space between cells; edema occurs here"],
          ["Intravascular (Plasma)", "~8%", "Blood volume; affects blood pressure and perfusion"],
        ]} />
        <KeyPoint><strong>Key principle:</strong> Water moves between compartments by osmosis — from areas of lower solute concentration to higher solute concentration. Understanding this principle is essential for predicting fluid shifts with IV fluid administration.</KeyPoint>
      </Section>
      <Section title="Types of IV Fluids">
        <p><strong>Isotonic Fluids (osmolality ≈ 275–295 mOsm/L):</strong> Expand the ECF without causing fluid shifts between compartments. Examples: 0.9% Normal Saline (NS), Lactated Ringer's (LR), D5W (initially isotonic but becomes hypotonic). Use for: volume resuscitation, dehydration, hemorrhage.</p>
        <p><strong>Hypotonic Fluids (osmolality &lt; 275 mOsm/L):</strong> Cause water to shift from ECF into cells (ICF). Examples: 0.45% Half-Normal Saline (½NS), 0.225% Quarter-Normal Saline. Use for: cellular dehydration, hypernatremia. Caution: never give to patients with increased ICP (can worsen cerebral edema).</p>
        <p><strong>Hypertonic Fluids (osmolality &gt; 295 mOsm/L):</strong> Pull water from cells into the ECF. Examples: 3% Saline, D10W, D5NS, D5LR. Use for: severe hyponatremia, cerebral edema (3% saline). Caution: give slowly; risk of fluid volume overload and phlebitis.</p>
        <ExamTip><strong>NCLEX Tip:</strong> Remember "hypo = swells cells, hyper = shrinks cells." Never give hypotonic fluids to head injury patients (brain cells swell → increased ICP). Use hypertonic saline cautiously — too-rapid correction of hyponatremia causes osmotic demyelination syndrome.</ExamTip>
      </Section>
      <Section title="Fluid Volume Deficit (Dehydration/Hypovolemia)">
        <p><strong>Causes:</strong> Hemorrhage, vomiting, diarrhea, excessive diuresis, burns, third-spacing, inadequate fluid intake.</p>
        <p><strong>Assessment findings:</strong> Tachycardia, hypotension, orthostatic hypotension, decreased urine output (&lt; 30 mL/hr), concentrated urine (specific gravity &gt; 1.030), poor skin turgor, dry mucous membranes, elevated BUN-to-creatinine ratio (&gt; 20:1), weight loss (1 L = 1 kg = 2.2 lbs).</p>
        <p><strong>Nursing interventions:</strong> IV fluid replacement (isotonic fluids for volume expansion), strict I&O monitoring, daily weights (same time, same scale, same clothing), oral rehydration when tolerated, monitor vital signs for signs of improvement.</p>
      </Section>
      <Section title="Fluid Volume Excess (Hypervolemia/Overload)">
        <p><strong>Causes:</strong> Heart failure, renal failure, liver cirrhosis, excessive IV fluid administration, SIADH, excessive sodium intake.</p>
        <p><strong>Assessment findings:</strong> Weight gain, edema (peripheral, periorbital, sacral in bedridden patients), distended neck veins (JVD), crackles/rales on auscultation, dyspnea, S3 heart sound, elevated CVP, dilutional hyponatremia, decreased hematocrit.</p>
        <p><strong>Nursing interventions:</strong> Fluid and sodium restriction, administer diuretics (furosemide — monitor potassium), elevate HOB, daily weights, I&O monitoring, oxygen therapy if dyspneic, assess lung sounds frequently.</p>
        <KeyPoint><strong>Daily weights</strong> are the most accurate indicator of fluid status changes. A gain of 1 kg (2.2 lbs) = approximately 1 liter of fluid retention.</KeyPoint>
      </Section>
      <Section title="Osmolality and Tonicity">
        <p><strong>Serum osmolality</strong> (normal: 275–295 mOsm/kg) reflects the concentration of solutes in the blood. It is primarily determined by sodium, glucose, and BUN. An elevated osmolality indicates concentrated blood (dehydration), while low osmolality indicates dilute blood (fluid overload or SIADH).</p>
        <p><strong>Urine osmolality and specific gravity</strong> help assess the kidneys' ability to concentrate urine. In dehydration: urine is concentrated (high specific gravity &gt; 1.030, high osmolality). In fluid overload or diabetes insipidus: urine is dilute (low specific gravity &lt; 1.005).</p>
      </Section>
    </StudyGuidePageWrapper>
  );
}

function CriticalLabValuesGuide() {
  const guide = STUDY_GUIDES.find(g => g.slug === "critical-lab-values-guide")!;
  return (
    <StudyGuidePageWrapper guide={guide}>
      <Section title="Understanding Critical Lab Values">
        <p>Critical (or "panic") lab values are results that fall outside the normal range to a degree that poses an immediate threat to patient safety. When a critical value is identified, the laboratory must notify the nurse or provider immediately, and the nurse must take appropriate action. Failure to act on critical lab values is a common cause of adverse patient outcomes.</p>
        <KeyPoint><strong>Nursing responsibility:</strong> When you receive a critical lab value, you must: (1) verify the result, (2) assess the patient, (3) notify the provider, (4) implement interventions, and (5) document the communication and actions taken.</KeyPoint>
      </Section>
      <Section title="Critical Electrolyte Values">
        <ValueTable headers={["Lab Test", "Normal Range", "Critical Low", "Critical High", "Nursing Action"]} rows={[
          ["Potassium", "3.5–5.0 mEq/L", "< 2.5 mEq/L", "> 6.5 mEq/L", "Cardiac monitor, notify MD, treat per protocol"],
          ["Sodium", "135–145 mEq/L", "< 120 mEq/L", "> 160 mEq/L", "Neuro checks, fluid management, notify MD"],
          ["Calcium (total)", "8.5–10.5 mg/dL", "< 7.0 mg/dL", "> 12.0 mg/dL", "Seizure precautions, cardiac monitoring"],
          ["Magnesium", "1.5–2.5 mEq/L", "< 1.0 mEq/L", "> 4.0 mEq/L", "DTR assessment, respiratory monitoring"],
          ["Phosphorus", "2.5–4.5 mg/dL", "< 1.0 mg/dL", "> 8.0 mg/dL", "Assess muscle strength, respiratory status"],
          ["Glucose", "70–100 mg/dL", "< 50 mg/dL", "> 400 mg/dL", "Treat hypoglycemia immediately; DKA protocol for severe hyperglycemia"],
        ]} />
      </Section>
      <Section title="Critical Hematology Values">
        <ValueTable headers={["Lab Test", "Normal Range", "Critical Low", "Critical High", "Nursing Action"]} rows={[
          ["Hemoglobin", "M: 13.5–17.5 g/dL, F: 12.0–16.0 g/dL", "< 7.0 g/dL", "> 20 g/dL", "Type & screen, prepare for transfusion"],
          ["Hematocrit", "M: 40–54%, F: 36–48%", "< 20%", "> 60%", "Assess for bleeding, dehydration"],
          ["Platelets", "150,000–400,000/μL", "< 50,000/μL", "> 1,000,000/μL", "Bleeding precautions, fall risk"],
          ["WBC", "4,500–11,000/μL", "< 2,000/μL", "> 30,000/μL", "Neutropenic precautions if low; assess for sepsis if elevated"],
          ["INR", "0.8–1.2 (therapeutic 2.0–3.0 on warfarin)", "—", "> 4.5", "Hold warfarin, assess for bleeding, vitamin K availability"],
        ]} />
        <ExamTip><strong>NCLEX Tip:</strong> Know the "7/7 rule" for transfusion triggers — hemoglobin &lt; 7 g/dL generally triggers RBC transfusion consideration. For platelets, &lt; 10,000 = risk of spontaneous bleeding; &lt; 50,000 = bleeding precautions needed.</ExamTip>
      </Section>
      <Section title="Critical Cardiac and Renal Values">
        <ValueTable headers={["Lab Test", "Normal Range", "Critical Value", "Nursing Action"]} rows={[
          ["Troponin I", "< 0.04 ng/mL", "> 0.4 ng/mL", "12-lead ECG, activate chest pain protocol"],
          ["BNP", "< 100 pg/mL", "> 500 pg/mL", "Assess for heart failure, fluid status"],
          ["Lactate", "0.5–2.0 mmol/L", "> 4.0 mmol/L", "Sepsis screening, fluid resuscitation"],
          ["Creatinine", "0.6–1.2 mg/dL", "> 4.0 mg/dL", "Assess renal function, adjust medications"],
          ["BUN", "7–20 mg/dL", "> 100 mg/dL", "Assess for uremic symptoms, prepare for dialysis"],
        ]} />
      </Section>
      <Section title="Critical ABG Values">
        <ValueTable headers={["Parameter", "Normal", "Critical", "Clinical Significance"]} rows={[
          ["pH", "7.35–7.45", "< 7.20 or > 7.60", "Severe acidosis or alkalosis — life-threatening"],
          ["PaCO₂", "35–45 mmHg", "< 20 or > 70 mmHg", "Severe respiratory failure"],
          ["PaO₂", "80–100 mmHg", "< 60 mmHg", "Respiratory failure (type 1)"],
          ["HCO₃⁻", "22–26 mEq/L", "< 10 or > 40 mEq/L", "Severe metabolic derangement"],
        ]} />
        <p>Use our <LocaleLink href="/clinical-calculators/abg-interpretation" className="text-emerald-600 underline">ABG Interpretation Helper</LocaleLink> to practice step-by-step acid-base analysis with clinical interpretation.</p>
      </Section>
      <Section title="Nursing Response to Critical Values">
        <p><strong>SBAR Communication Framework:</strong> When notifying the provider about a critical lab value:</p>
        <p><strong>S (Situation):</strong> "I'm calling about a critical lab result for [patient name] in room [X]."</p>
        <p><strong>B (Background):</strong> "The patient was admitted for [diagnosis]. Relevant history includes [medications, conditions]."</p>
        <p><strong>A (Assessment):</strong> "The potassium came back at 6.8 mEq/L. The patient's current heart rate is [X], and they are [symptomatic/asymptomatic]. The ECG shows [findings]."</p>
        <p><strong>R (Recommendation):</strong> "I would like to request [specific orders: calcium gluconate, insulin/D50, kayexalate, repeat lab in X hours]."</p>
        <KeyPoint><strong>Documentation:</strong> Always document the time the critical value was received, the time the provider was notified, the provider's response/orders, interventions implemented, and the patient's response to treatment.</KeyPoint>
      </Section>
    </StudyGuidePageWrapper>
  );
}

function StudyGuideRouter() {
  const [, params] = useRoute("/nursing-study-guides/:slug");
  const slug = params?.slug;

  if (!slug) return <NursingStudyGuidesHub />;

  switch (slug) {
    case "electrolytes-nursing-guide": return <ElectrolytesGuide />;
    case "acid-base-disorders-study-guide": return <AcidBaseGuide />;
    case "ecg-interpretation-study-guide": return <ECGGuide />;
    case "fluid-electrolyte-balance-guide": return <FluidBalanceGuide />;
    case "critical-lab-values-guide": return <CriticalLabValuesGuide />;
    default: return <NursingStudyGuidesHub />;
  }
}

export default function NursingStudyGuidesPage() {
  return <StudyGuideRouter />;
}

export { NursingStudyGuidesHub };
