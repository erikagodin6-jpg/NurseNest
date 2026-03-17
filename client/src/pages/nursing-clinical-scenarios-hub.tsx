import { useState } from "react";
import { useRoute } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { LocaleLink } from "@/lib/LocaleLink";
import { useI18n } from "@/lib/i18n";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  Stethoscope, HeartPulse, Thermometer, Wind, Brain, Baby,
  ArrowRight, ChevronDown, ChevronRight, CheckCircle2,
  AlertTriangle, Lightbulb, Target, BookOpen, ClipboardList
} from "lucide-react";

interface ScenarioDef {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof Stethoscope;
  color: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

const SCENARIOS: ScenarioDef[] = [
  {
    slug: "chest-pain-emergency",
    title: "Chest Pain Emergency — Clinical Scenario",
    shortTitle: "Chest Pain Emergency",
    description: "A 62-year-old male presents with substernal chest pain radiating to the left arm. Work through the assessment, differential diagnosis, and nursing priorities for acute coronary syndrome.",
    icon: HeartPulse,
    color: "#DC2626",
    metaTitle: "Chest Pain Emergency — Nursing Clinical Scenario | NurseNest",
    metaDescription: "Interactive chest pain clinical scenario for nursing students. Assess a patient with acute chest pain, identify ACS, prioritize nursing interventions, and practice clinical reasoning for NCLEX.",
    keywords: "chest pain nursing scenario, acute coronary syndrome, STEMI nursing, cardiac emergency, NCLEX clinical scenario",
  },
  {
    slug: "sepsis-recognition",
    title: "Sepsis Recognition — Clinical Scenario",
    shortTitle: "Sepsis Recognition",
    description: "A 71-year-old female post-operative patient develops fever, tachycardia, and hypotension. Recognize the signs of sepsis and implement the sepsis bundle.",
    icon: Thermometer,
    color: "#F59E0B",
    metaTitle: "Sepsis Recognition — Nursing Clinical Scenario | NurseNest",
    metaDescription: "Interactive sepsis clinical scenario for nursing students. Recognize early sepsis signs, apply qSOFA and SIRS criteria, implement the sepsis bundle, and practice critical thinking for NCLEX.",
    keywords: "sepsis nursing scenario, sepsis recognition, qSOFA, sepsis bundle, NCLEX clinical scenario",
  },
  {
    slug: "respiratory-distress",
    title: "Respiratory Distress — Clinical Scenario",
    shortTitle: "Respiratory Distress",
    description: "A 55-year-old COPD patient presents with acute dyspnea, accessory muscle use, and declining oxygen saturation. Navigate the assessment and intervention priorities.",
    icon: Wind,
    color: "#3B82F6",
    metaTitle: "Respiratory Distress — Nursing Clinical Scenario | NurseNest",
    metaDescription: "Interactive respiratory distress clinical scenario for nursing students. Assess acute dyspnea in COPD, manage oxygen therapy, recognize respiratory failure, and practice NCLEX clinical reasoning.",
    keywords: "respiratory distress nursing, COPD exacerbation, dyspnea assessment, oxygen therapy nursing, NCLEX respiratory scenario",
  },
  {
    slug: "stroke-assessment",
    title: "Stroke Assessment — Clinical Scenario",
    shortTitle: "Stroke Assessment",
    description: "A 68-year-old male develops sudden right-sided weakness and slurred speech. Perform rapid stroke assessment and initiate time-critical interventions.",
    icon: Brain,
    color: "#8B5CF6",
    metaTitle: "Stroke Assessment — Nursing Clinical Scenario | NurseNest",
    metaDescription: "Interactive stroke assessment clinical scenario for nursing students. Practice FAST assessment, differentiate ischemic vs hemorrhagic stroke, and manage time-critical tPA administration for NCLEX.",
    keywords: "stroke nursing scenario, FAST assessment, tPA administration, ischemic stroke, NCLEX stroke scenario",
  },
  {
    slug: "pediatric-deterioration",
    title: "Pediatric Deterioration — Clinical Scenario",
    shortTitle: "Pediatric Deterioration",
    description: "A 3-year-old child with pneumonia shows signs of clinical deterioration. Recognize the pediatric early warning signs and escalate care appropriately.",
    icon: Baby,
    color: "#EC4899",
    metaTitle: "Pediatric Deterioration — Nursing Clinical Scenario | NurseNest",
    metaDescription: "Interactive pediatric deterioration clinical scenario for nursing students. Recognize early warning signs in children, apply PEWS scoring, and practice pediatric emergency nursing for NCLEX.",
    keywords: "pediatric deterioration nursing, PEWS scoring, pediatric emergency, child assessment nursing, NCLEX pediatric scenario",
  },
];

function ScenarioCard({ scenario }: { scenario: ScenarioDef }) {
  const Icon = scenario.icon;
  return (
    <LocaleLink href={`/nursing-clinical-scenarios/${scenario.slug}`} className="block" data-testid={`card-scenario-${scenario.slug}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-red-300 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${scenario.color}15` }}>
            <Icon className="w-6 h-6" style={{ color: scenario.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors" data-testid={`text-scenario-title-${scenario.slug}`}>
              {scenario.shortTitle}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{scenario.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600 mt-3 group-hover:gap-2 transition-all">
              Start Scenario <ArrowRight className="w-4 h-4" />
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

function NursingClinicalScenariosHub() {
  const { t } = useI18n();

  const hubFaqs = [
    { question: "How do clinical scenarios help with nursing exam preparation?", answer: "Clinical scenarios build critical thinking and clinical judgment skills — exactly what NCLEX and other nursing exams test. By working through realistic patient situations, you practice the same reasoning process required on exam day: gathering data, recognizing patterns, prioritizing interventions, and evaluating outcomes." },
    { question: "Are these scenarios based on real clinical situations?", answer: "Yes. Each scenario is based on common clinical presentations that nurses encounter in practice and that appear frequently on licensing exams. The patient data, assessment findings, and clinical trajectories are realistic and educationally validated." },
    { question: "How should I work through each scenario?", answer: "Read the patient presentation carefully, then try to identify the priority assessment findings before scrolling to the analysis. Consider what additional information you'd need, what your priority interventions would be, and why. Then review the clinical reasoning walkthrough to compare your approach." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nursing Clinical Scenarios — Interactive Case Studies",
    "description": "Interactive nursing clinical scenarios for exam preparation. Practice clinical reasoning with realistic patient cases covering chest pain, sepsis, respiratory distress, stroke, and pediatric emergencies.",
    "provider": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
    "hasPart": SCENARIOS.map(s => ({
      "@type": "LearningResource",
      "name": s.title,
      "url": `https://www.nursenest.ca/nursing-clinical-scenarios/${s.slug}`,
      "educationalLevel": "College",
      "learningResourceType": "Clinical Scenario",
    })),
  };

  return (
    <>
      <SEO
        title="Nursing Clinical Scenarios — Interactive Case Studies"
        description="Practice clinical reasoning with interactive nursing scenarios. Chest pain, sepsis, respiratory distress, stroke, and pediatric deterioration cases with assessment findings, nursing priorities, and quiz questions."
        keywords="nursing clinical scenarios, case studies nursing, clinical reasoning, NCLEX scenarios, nursing critical thinking, patient assessment"
        canonicalPath="/nursing-clinical-scenarios"
        structuredData={structuredData}
        additionalStructuredData={[buildFaqStructuredData(hubFaqs)]}
      />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4" data-testid="badge-scenarios">
              <Stethoscope className="w-4 h-4" /> Clinical Case Studies
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-scenarios-heading">
              {t("nursingClinicalScenarios.heading", { "default": "Nursing Clinical Scenarios" })}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-testid="text-scenarios-subtitle">
              Interactive clinical case studies that build the critical thinking and clinical judgment skills tested on NCLEX and nursing licensing exams. Each scenario includes patient data, assessment findings, clinical reasoning, and follow-up quiz questions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-scenarios">
            {SCENARIOS.map(scenario => (
              <ScenarioCard key={scenario.slug} scenario={scenario} />
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

          <div className="mt-12 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Strengthen Your Clinical Reasoning</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Pair these scenarios with our study guides, clinical calculators, and question banks for comprehensive exam preparation.
            </p>
            <div className="flex flex-wrap gap-3">
              <LocaleLink href="/question-bank" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors" data-testid="link-qbank-cta">
                <Target className="w-4 h-4" /> Question Bank
              </LocaleLink>
              <LocaleLink href="/nursing-study-guides" className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors" data-testid="link-guides-cta">
                <BookOpen className="w-4 h-4" /> Study Guides
              </LocaleLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ScenarioSection({ title, children, color = "gray" }: { title: string; children: React.ReactNode; color?: string }) {
  const bgColors: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800",
    red: "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800",
    green: "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800",
    amber: "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800",
    purple: "bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800",
    gray: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
  };
  return (
    <div className={`rounded-xl border p-5 mb-6 ${bgColors[color] || bgColors.gray}`}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function QuizQuestion({ question, options, correctIndex, rationale, index }: { question: string; options: string[]; correctIndex: number; rationale: string; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === correctIndex;
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4" data-testid={`quiz-question-${index}`}>
      <p className="font-medium text-gray-900 dark:text-white mb-3">{index + 1}. {question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let cls = "w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ";
          if (!answered) cls += "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800";
          else if (i === correctIndex) cls += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200";
          else if (i === selected) cls += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200";
          else cls += "border-gray-200 dark:border-gray-700 opacity-60";
          return (
            <button key={i} onClick={() => !answered && setSelected(i)} className={cls} disabled={answered} data-testid={`button-answer-${index}-${i}`}>
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`mt-3 p-3 rounded-lg text-sm ${correct ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200" : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"}`}>
          <p className="font-medium mb-1">{correct ? "✓ Correct!" : `✗ Incorrect. The correct answer is ${String.fromCharCode(65 + correctIndex)}.`}</p>
          <p>{rationale}</p>
        </div>
      )}
    </div>
  );
}

function ScenarioPageWrapper({ scenario, children }: { scenario: ScenarioDef; children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": scenario.title,
    "description": scenario.metaDescription,
    "url": `https://www.nursenest.ca/nursing-clinical-scenarios/${scenario.slug}`,
    "educationalLevel": "College",
    "learningResourceType": "Clinical Scenario",
    "provider": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
    "datePublished": "2025-02-01",
    "dateModified": "2026-03-01",
  };
  return (
    <>
      <SEO
        title={scenario.metaTitle}
        description={scenario.metaDescription}
        keywords={scenario.keywords}
        canonicalPath={`/nursing-clinical-scenarios/${scenario.slug}`}
        structuredData={structuredData}
      />
      <Navigation />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          <div className="mb-6">
            <LocaleLink href="/nursing-clinical-scenarios" className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1" data-testid="link-back-scenarios">
              <ChevronRight className="w-4 h-4 rotate-180" /> All Scenarios
            </LocaleLink>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${scenario.color}15` }}>
              <scenario.icon className="w-5 h-5" style={{ color: scenario.color }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-scenario-page-title">
              {scenario.shortTitle}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{scenario.description}</p>
          {children}
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Continue Learning</h3>
            <div className="flex flex-wrap gap-3">
              <LocaleLink href="/question-bank" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700" data-testid="link-more-questions">
                <Target className="w-4 h-4" /> Practice More Questions
              </LocaleLink>
              <LocaleLink href="/nursing-study-guides" className="inline-flex items-center gap-2 bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-gray-600" data-testid="link-study-guides">
                <BookOpen className="w-4 h-4" /> Study Guides
              </LocaleLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ChestPainScenario() {
  const scenario = SCENARIOS.find(s => s.slug === "chest-pain-emergency")!;
  return (
    <ScenarioPageWrapper scenario={scenario}>
      <ScenarioSection title="Patient Presentation" color="blue">
        <p><strong>Patient:</strong> Mr. James Rodriguez, 62-year-old male</p>
        <p><strong>Chief complaint:</strong> "I have a crushing pain in my chest that won't go away."</p>
        <p><strong>History of present illness:</strong> Pain started 45 minutes ago while watching television. Substernal, radiating to the left arm and jaw. Rates pain 8/10. Describes it as "heavy" and "squeezing." Associated with diaphoresis and nausea. Took one aspirin at home before calling 911.</p>
        <p><strong>Past medical history:</strong> Hypertension (10 years), hyperlipidemia, type 2 diabetes, former smoker (quit 5 years ago), family history of MI (father at age 58).</p>
        <p><strong>Current medications:</strong> Lisinopril 20 mg daily, atorvastatin 40 mg daily, metformin 1000 mg BID.</p>
      </ScenarioSection>

      <ScenarioSection title="Assessment Findings" color="red">
        <p><strong>Vital signs:</strong> BP 158/94 mmHg, HR 102 bpm (regular), RR 22/min, SpO₂ 96% on room air, Temp 37.1°C</p>
        <p><strong>General:</strong> Anxious, diaphoretic, clutching chest. Skin pale and clammy.</p>
        <p><strong>Cardiac:</strong> S1/S2 heard, no murmurs. Regular tachycardia. No JVD.</p>
        <p><strong>Respiratory:</strong> Bilateral breath sounds clear, no crackles. Mild tachypnea.</p>
        <p><strong>12-Lead ECG:</strong> ST elevation in leads II, III, aVF (2–3 mm). Reciprocal ST depression in leads I and aVL.</p>
        <p><strong>Initial labs:</strong> Troponin I: 0.8 ng/mL (elevated), BNP: 180 pg/mL, glucose: 185 mg/dL.</p>
      </ScenarioSection>

      <ScenarioSection title="Clinical Reasoning" color="amber">
        <p><strong>Priority nursing diagnosis:</strong> Decreased cardiac output related to myocardial ischemia/infarction as evidenced by ST elevation, elevated troponin, chest pain, tachycardia, and diaphoresis.</p>
        <p><strong>Analysis:</strong> The ST elevation in inferior leads (II, III, aVF) with reciprocal changes in lateral leads indicates an inferior STEMI. The elevated troponin confirms myocardial injury. Risk factors (age, male, HTN, DM, hyperlipidemia, smoking history, family history) create a high pretest probability for ACS. The 45-minute symptom duration places this patient within the PCI window.</p>
        <p><strong>Differential considerations:</strong> Acute pericarditis (diffuse ST elevation, no reciprocal changes), aortic dissection (tearing pain, unequal pulses), pulmonary embolism (pleuritic pain, tachycardia, hypoxia).</p>
      </ScenarioSection>

      <ScenarioSection title="Nursing Priorities" color="green">
        <p><strong>1. Activate cardiac catheterization team</strong> — door-to-balloon time goal &lt; 90 minutes for primary PCI.</p>
        <p><strong>2. MONA protocol:</strong> Morphine 2–4 mg IV PRN (if pain not relieved by NTG), Oxygen only if SpO₂ &lt; 94%, Nitroglycerin 0.4 mg SL q5min × 3 (hold if SBP &lt; 90), Aspirin 325 mg chewed (already taken by patient).</p>
        <p><strong>3. IV access:</strong> Two large-bore IVs (18G or larger). Draw labs: troponin, CK-MB, CBC, BMP, coagulation studies, type & screen.</p>
        <p><strong>4. Administer medications:</strong> Heparin bolus + drip per protocol, clopidogrel/ticagrelor loading dose, beta-blocker (metoprolol) if HR &gt; 100 and no contraindications.</p>
        <p><strong>5. Continuous monitoring:</strong> Cardiac telemetry, serial ECGs, repeat troponin at 3 and 6 hours, strict I&O.</p>
        <p><strong>6. Patient education:</strong> Explain procedures, provide emotional support, keep family informed.</p>
      </ScenarioSection>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow-Up Quiz Questions</h2>
        <QuizQuestion index={0} question="Which ECG finding in this scenario indicates an inferior STEMI?" options={["ST depression in V1–V4", "ST elevation in leads II, III, aVF", "Peaked T waves in V1–V3", "Prolonged QT interval"]} correctIndex={1} rationale="ST elevation in leads II, III, and aVF indicates inferior wall myocardial infarction. These leads view the inferior surface of the heart supplied by the right coronary artery (RCA)." />
        <QuizQuestion index={1} question="What is the priority nursing intervention for this patient?" options={["Administer morphine for pain control", "Activate the cardiac catheterization team", "Start a nitroglycerin drip", "Obtain a chest X-ray"]} correctIndex={1} rationale="Activating the cath lab for primary PCI is the highest priority for a confirmed STEMI. Door-to-balloon time should be less than 90 minutes. Pain management and other interventions are important but secondary to reperfusion." />
        <QuizQuestion index={2} question="Which finding would contraindicate nitroglycerin administration in this patient?" options={["Heart rate of 102 bpm", "Systolic blood pressure below 90 mmHg", "Blood glucose of 185 mg/dL", "Oxygen saturation of 96%"]} correctIndex={1} rationale="Nitroglycerin causes vasodilation and can cause severe hypotension. It is contraindicated when SBP is below 90 mmHg. It is also contraindicated with right ventricular infarction and recent phosphodiesterase inhibitor use (sildenafil/tadalafil)." />
      </div>
    </ScenarioPageWrapper>
  );
}

function SepsisScenario() {
  const scenario = SCENARIOS.find(s => s.slug === "sepsis-recognition")!;
  return (
    <ScenarioPageWrapper scenario={scenario}>
      <ScenarioSection title="Patient Presentation" color="blue">
        <p><strong>Patient:</strong> Mrs. Eleanor Chen, 71-year-old female</p>
        <p><strong>Chief complaint:</strong> Post-operative day 3 following right total hip arthroplasty. Nurse noted increasing confusion and elevated temperature during routine assessment.</p>
        <p><strong>History of present illness:</strong> Patient was progressing normally on POD 1 and 2. On POD 3 morning, she became increasingly confused and oriented only to person. Temperature spiked to 39.2°C. She reports feeling "cold" despite the fever. Surgical wound has increased redness and warmth around incision edges.</p>
        <p><strong>Past medical history:</strong> Osteoarthritis, hypertension, type 2 diabetes (A1C 7.8%), urinary tract infections (recurrent).</p>
        <p><strong>Current medications:</strong> Cefazolin 2g IV q8h (surgical prophylaxis), enoxaparin 40 mg SC daily, oxycodone 5 mg PO q4h PRN, metformin (held post-op), lisinopril 10 mg daily.</p>
      </ScenarioSection>

      <ScenarioSection title="Assessment Findings" color="red">
        <p><strong>Vital signs:</strong> BP 88/52 mmHg (baseline 130/78), HR 118 bpm, RR 24/min, SpO₂ 93% on room air, Temp 39.2°C (102.6°F)</p>
        <p><strong>qSOFA Score: 2/3</strong> (altered mental status + SBP ≤ 100 mmHg)</p>
        <p><strong>General:</strong> Confused, restless, appears ill. Skin warm and flushed with poor turgor.</p>
        <p><strong>Wound:</strong> Right hip incision with erythema extending 3 cm beyond staple line, warmth, and small amount of purulent drainage.</p>
        <p><strong>Respiratory:</strong> Tachypneic, bilateral breath sounds clear.</p>
        <p><strong>Urine:</strong> Foley catheter in place — urine cloudy and concentrated, output 15 mL in last 2 hours.</p>
        <p><strong>Labs:</strong> WBC 18,200/μL, lactate 3.8 mmol/L, creatinine 1.6 mg/dL (baseline 0.9), glucose 245 mg/dL, procalcitonin 4.2 ng/mL.</p>
      </ScenarioSection>

      <ScenarioSection title="Clinical Reasoning" color="amber">
        <p><strong>Sepsis identification:</strong> This patient meets SIRS criteria (temp &gt; 38.3°C, HR &gt; 90, RR &gt; 20, WBC &gt; 12,000) with a suspected infection source (surgical site and/or UTI). The qSOFA score of 2 (altered mentation + hypotension) indicates high risk for poor outcome. Elevated lactate (3.8 mmol/L) indicates tissue hypoperfusion — this patient has sepsis with organ dysfunction progressing toward septic shock.</p>
        <p><strong>Likely infection sources:</strong> Surgical site infection (SSI) with purulent drainage and expanding erythema. Concurrent UTI possible given cloudy urine, indwelling catheter, and history of recurrent UTIs. Both sources require cultures before broadening antibiotic coverage.</p>
        <p><strong>Organ dysfunction markers:</strong> Acute kidney injury (creatinine 1.6 from baseline 0.9), altered mental status, hypotension, elevated lactate — multiple organ systems are showing dysfunction consistent with sepsis.</p>
      </ScenarioSection>

      <ScenarioSection title="Nursing Priorities — Hour-1 Sepsis Bundle" color="green">
        <p><strong>1. Obtain cultures BEFORE antibiotics:</strong> Blood cultures × 2 (from different sites), urine culture, wound culture from surgical site. Do not delay antibiotics more than 45 minutes for cultures.</p>
        <p><strong>2. Administer broad-spectrum IV antibiotics</strong> within 1 hour of sepsis recognition. Notify surgeon and infectious disease. Broaden from cefazolin to cover both SSI and UTI sources (e.g., piperacillin-tazobactam + vancomycin).</p>
        <p><strong>3. Aggressive IV fluid resuscitation:</strong> 30 mL/kg crystalloid (typically NS or LR) within 3 hours. For this 65 kg patient: ~2000 mL bolus. Reassess fluid responsiveness after each bolus.</p>
        <p><strong>4. Measure lactate level</strong> (already obtained: 3.8 mmol/L). Repeat lactate in 2–4 hours. Target: lactate clearance or decrease by ≥ 10%.</p>
        <p><strong>5. If MAP remains &lt; 65 mmHg after fluids:</strong> Initiate vasopressor therapy (norepinephrine first-line). May require ICU transfer.</p>
        <p><strong>6. Continuous monitoring:</strong> Strict I&O (urine output goal ≥ 0.5 mL/kg/hr), continuous cardiac monitoring, frequent vital signs (q15 min during resuscitation), neuro checks q1h.</p>
      </ScenarioSection>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow-Up Quiz Questions</h2>
        <QuizQuestion index={0} question="This patient's qSOFA score is 2. What does this indicate?" options={["The patient has a urinary tract infection", "The patient is at high risk for poor outcome from sepsis", "The patient needs surgical wound revision", "The patient's pain is inadequately managed"]} correctIndex={1} rationale="qSOFA (quick Sequential Organ Failure Assessment) uses three criteria: altered mental status, SBP ≤ 100, and RR ≥ 22. A score of ≥ 2 indicates high risk for poor outcomes and should prompt full sepsis workup and aggressive management." />
        <QuizQuestion index={1} question="What is the FIRST nursing action when sepsis is suspected?" options={["Administer IV antibiotics immediately", "Obtain blood cultures from two separate sites", "Start a norepinephrine drip", "Transfer the patient to the ICU"]} correctIndex={1} rationale="Obtaining cultures BEFORE starting antibiotics is critical for identifying the causative organism and guiding targeted therapy. However, do not delay antibiotics more than 45 minutes for cultures. Cultures first, then antibiotics within 1 hour." />
        <QuizQuestion index={2} question="The patient's lactate level is 3.8 mmol/L. What does this indicate?" options={["Normal metabolic function", "Tissue hypoperfusion and anaerobic metabolism", "Adequate fluid resuscitation", "Hyperglycemia from diabetes"]} correctIndex={1} rationale="Lactate > 2.0 mmol/L indicates tissue hypoperfusion — cells are not receiving adequate oxygen and are producing lactate through anaerobic metabolism. Lactate > 4.0 mmol/L is associated with significantly increased mortality. Serial lactate monitoring guides resuscitation adequacy." />
      </div>
    </ScenarioPageWrapper>
  );
}

function RespiratoryDistressScenario() {
  const scenario = SCENARIOS.find(s => s.slug === "respiratory-distress")!;
  return (
    <ScenarioPageWrapper scenario={scenario}>
      <ScenarioSection title="Patient Presentation" color="blue">
        <p><strong>Patient:</strong> Mr. Robert Williams, 55-year-old male</p>
        <p><strong>Chief complaint:</strong> "I can't catch my breath. It's getting worse."</p>
        <p><strong>History of present illness:</strong> Patient with known COPD (GOLD Stage III) presents to the ED with worsening dyspnea over the past 3 days. Reports increased sputum production (yellow-green) and a productive cough. Used his rescue inhaler 8 times today with minimal relief. Cannot speak in full sentences. Was sitting in tripod position upon arrival.</p>
        <p><strong>Past medical history:</strong> COPD (diagnosed 8 years ago), 40 pack-year smoking history (current smoker), hypertension, anxiety. Two prior COPD exacerbations requiring hospitalization in the past year.</p>
        <p><strong>Current medications:</strong> Tiotropium (Spiriva) 18 mcg daily, fluticasone/salmeterol (Advair) 250/50 BID, albuterol (Ventolin) PRN, lisinopril 10 mg daily.</p>
      </ScenarioSection>

      <ScenarioSection title="Assessment Findings" color="red">
        <p><strong>Vital signs:</strong> BP 148/88 mmHg, HR 110 bpm, RR 32/min, SpO₂ 86% on room air, Temp 37.8°C</p>
        <p><strong>General:</strong> Sitting upright, tripod position, using accessory muscles (sternocleidomastoid, intercostals), pursed-lip breathing, speaks 2–3 word sentences only. Appears fatigued.</p>
        <p><strong>Respiratory:</strong> Diminished breath sounds bilaterally with scattered expiratory wheezes and rhonchi. Prolonged expiratory phase. Barrel chest configuration. No stridor.</p>
        <p><strong>Cardiovascular:</strong> Tachycardic, regular. No JVD.</p>
        <p><strong>ABG (on room air):</strong> pH 7.31, PaCO₂ 58 mmHg, HCO₃ 32 mEq/L, PaO₂ 54 mmHg</p>
        <p><strong>Labs:</strong> WBC 13,500/μL, CRP elevated, BNP 45 pg/mL (normal).</p>
      </ScenarioSection>

      <ScenarioSection title="Clinical Reasoning" color="amber">
        <p><strong>ABG interpretation:</strong> pH 7.31 = acidosis. PaCO₂ 58 = elevated (respiratory acidosis). HCO₃ 32 = elevated (chronic compensation). PaO₂ 54 = severe hypoxemia. This is a partially compensated respiratory acidosis with acute-on-chronic respiratory failure. The elevated HCO₃ indicates pre-existing chronic CO₂ retention (baseline COPD) with acute worsening.</p>
        <p><strong>Diagnosis:</strong> Acute exacerbation of COPD (AECOPD) with acute-on-chronic type II respiratory failure. Yellow-green sputum and mild leukocytosis suggest an infectious trigger (likely bacterial bronchitis or pneumonia).</p>
        <p><strong>Key distinction:</strong> Normal BNP rules out heart failure as a contributing factor. The clinical picture is consistent with infectious COPD exacerbation.</p>
      </ScenarioSection>

      <ScenarioSection title="Nursing Priorities" color="green">
        <p><strong>1. Controlled oxygen therapy:</strong> Start O₂ via Venturi mask at 28% — titrate to target SpO₂ 88–92%. COPD patients rely on hypoxic drive; excessive O₂ can suppress respiratory drive and worsen CO₂ retention.</p>
        <p><strong>2. Bronchodilator therapy:</strong> Continuous nebulized albuterol 2.5 mg + ipratropium 0.5 mg q20min × 3, then q4h. Consider adding IV magnesium sulfate if severe bronchospasm.</p>
        <p><strong>3. Systemic corticosteroids:</strong> Methylprednisolone 125 mg IV or prednisone 40 mg PO. Reduces airway inflammation and shortens recovery time.</p>
        <p><strong>4. Antibiotics:</strong> Initiate empiric antibiotics (e.g., azithromycin or levofloxacin) given purulent sputum and suspected bacterial trigger.</p>
        <p><strong>5. Position and breathing:</strong> High Fowler's position, coach pursed-lip breathing, clear secretions with suction if needed.</p>
        <p><strong>6. Monitor for deterioration:</strong> Repeat ABG in 1–2 hours. If PaCO₂ continues to rise, pH drops below 7.25, or mental status worsens → prepare for non-invasive ventilation (BiPAP) or intubation. BiPAP is first-line for COPD exacerbation with respiratory acidosis.</p>
        <p><strong>7. Sputum culture:</strong> Obtain before starting antibiotics if possible.</p>
      </ScenarioSection>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow-Up Quiz Questions</h2>
        <QuizQuestion index={0} question="What is the target oxygen saturation for this COPD patient?" options={["95–100%", "92–96%", "88–92%", "85–88%"]} correctIndex={2} rationale="COPD patients with chronic CO₂ retention rely on hypoxic drive for respiratory stimulation. Target SpO₂ of 88–92% provides adequate oxygenation without suppressing the drive to breathe. Aiming for higher saturations can worsen hypercapnia and respiratory failure." />
        <QuizQuestion index={1} question="The ABG shows pH 7.31, PaCO₂ 58, HCO₃ 32, PaO₂ 54. What is the interpretation?" options={["Uncompensated metabolic acidosis", "Fully compensated respiratory acidosis", "Partially compensated respiratory acidosis with hypoxemia", "Respiratory alkalosis with metabolic compensation"]} correctIndex={2} rationale="pH < 7.35 = acidosis. PaCO₂ > 45 = respiratory cause. HCO₃ > 26 = metabolic compensation (kidneys retaining bicarbonate). Since pH is still abnormal, it's partially compensated. PaO₂ 54 < 60 = severe hypoxemia (respiratory failure)." />
        <QuizQuestion index={2} question="The patient's condition worsens despite nebulizers. RR increases to 38, PaCO₂ rises to 68, and the patient becomes drowsy. What is the priority intervention?" options={["Increase oxygen to 100% via non-rebreather mask", "Initiate non-invasive ventilation (BiPAP)", "Administer another albuterol nebulizer treatment", "Position the patient flat to improve ventilation"]} correctIndex={1} rationale="BiPAP (non-invasive positive pressure ventilation) is first-line for acute COPD exacerbation with worsening respiratory acidosis. It supports ventilation, reduces work of breathing, and can prevent intubation. Increasing O₂ to 100% could worsen CO₂ retention. Lying flat worsens dyspnea." />
      </div>
    </ScenarioPageWrapper>
  );
}

function StrokeScenario() {
  const scenario = SCENARIOS.find(s => s.slug === "stroke-assessment")!;
  return (
    <ScenarioPageWrapper scenario={scenario}>
      <ScenarioSection title="Patient Presentation" color="blue">
        <p><strong>Patient:</strong> Mr. David Park, 68-year-old male</p>
        <p><strong>Chief complaint:</strong> Wife called 911 reporting that her husband suddenly developed right-sided weakness and "his speech doesn't make sense" while eating lunch.</p>
        <p><strong>History of present illness:</strong> Patient was at baseline 30 minutes ago. Wife reports he suddenly dropped his fork, his right arm went limp, and he began speaking incoherently. He is able to follow simple commands inconsistently. Last known well time: 12:15 PM. Current time: 12:45 PM.</p>
        <p><strong>Past medical history:</strong> Atrial fibrillation (on warfarin, inconsistent compliance), hypertension, hyperlipidemia, type 2 diabetes.</p>
        <p><strong>Current medications:</strong> Warfarin 5 mg daily, metoprolol 50 mg BID, atorvastatin 80 mg daily, metformin 500 mg BID.</p>
      </ScenarioSection>

      <ScenarioSection title="Assessment Findings" color="red">
        <p><strong>Vital signs:</strong> BP 186/102 mmHg, HR 88 bpm (irregularly irregular), RR 18/min, SpO₂ 97%, Temp 36.8°C, Blood glucose 142 mg/dL</p>
        <p><strong>FAST Assessment:</strong> Face — left-sided facial droop when smiling. Arms — right arm drifts downward and cannot maintain against gravity. Speech — dysarthric, word-finding difficulty, unable to repeat sentences accurately. Time — symptom onset 30 minutes ago.</p>
        <p><strong>NIHSS Score: 14</strong> (moderate-severe stroke)</p>
        <p><strong>Neurological:</strong> Alert but confused, follows simple commands inconsistently. Right hemiparesis (arm greater than leg). Right-sided facial droop (lower face). Receptive language partially intact but expressive aphasia present. Right visual field neglect suspected.</p>
        <p><strong>Labs:</strong> INR 1.6 (subtherapeutic — target 2.0–3.0 on warfarin), glucose 142 mg/dL, CBC within normal limits.</p>
        <p><strong>CT head (non-contrast, obtained within 10 minutes):</strong> No hemorrhage identified. No early ischemic changes.</p>
      </ScenarioSection>

      <ScenarioSection title="Clinical Reasoning" color="amber">
        <p><strong>Diagnosis:</strong> Acute ischemic stroke — likely cardioembolic origin (atrial fibrillation with subtherapeutic anticoagulation). Left middle cerebral artery (MCA) territory based on right hemiparesis, facial droop, and aphasia pattern.</p>
        <p><strong>tPA eligibility assessment:</strong> Last known well time 30 minutes ago — well within the 4.5-hour window for IV alteplase. CT shows no hemorrhage. INR 1.6 (alteplase can be given if INR &lt; 1.7). No recent surgery, bleeding, or other absolute contraindications identified.</p>
        <p><strong>Critical time factor:</strong> "Time is brain" — approximately 1.9 million neurons are lost per minute during an acute ischemic stroke. Every minute of delay in reperfusion worsens outcomes. Door-to-needle time goal: &lt; 60 minutes.</p>
      </ScenarioSection>

      <ScenarioSection title="Nursing Priorities" color="green">
        <p><strong>1. Rapid assessment and CT scan:</strong> CT completed within 10 minutes of arrival (achieved). Rule out hemorrhagic stroke before considering thrombolytics.</p>
        <p><strong>2. Activate stroke team:</strong> Notify neurologist/stroke team immediately. Prepare for IV alteplase (tPA) administration.</p>
        <p><strong>3. Blood pressure management:</strong> For tPA candidates, BP must be &lt; 185/110 before and &lt; 180/105 during/after tPA. Current BP 186/102 — administer IV labetalol 10–20 mg to lower BP below threshold.</p>
        <p><strong>4. IV alteplase administration:</strong> Dose: 0.9 mg/kg (max 90 mg). Give 10% as IV bolus over 1 minute, then infuse remaining 90% over 60 minutes. Start within 60 minutes of arrival.</p>
        <p><strong>5. Post-tPA monitoring (critical 24 hours):</strong> Neuro checks q15min × 2h, then q30min × 6h, then q1h × 16h. Strict BP monitoring — keep &lt; 180/105. Monitor for signs of hemorrhagic conversion (new headache, vomiting, acute neuro decline).</p>
        <p><strong>6. NPO status and swallow assessment:</strong> Keep NPO until bedside swallow evaluation completed. Dysphagia screening is mandatory before any oral intake (aspiration risk).</p>
        <p><strong>7. Position HOB at 30 degrees</strong> to optimize cerebral perfusion and reduce ICP risk.</p>
      </ScenarioSection>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow-Up Quiz Questions</h2>
        <QuizQuestion index={0} question="The patient's BP is 186/102 mmHg. Before tPA can be administered, the systolic BP must be below:" options={["160 mmHg", "180 mmHg", "185 mmHg", "200 mmHg"]} correctIndex={2} rationale="For IV alteplase (tPA) candidates, blood pressure must be < 185/110 mmHg before administration and maintained < 180/105 mmHg during and for 24 hours after infusion. This reduces the risk of hemorrhagic transformation." />
        <QuizQuestion index={1} question="The patient has atrial fibrillation and an INR of 1.6. Why is this clinically significant?" options={["The INR is too high — hemorrhagic stroke is likely", "The INR is subtherapeutic — inadequate stroke prophylaxis from A-fib", "The INR level is normal for this patient", "Atrial fibrillation does not increase stroke risk"]} correctIndex={1} rationale="A-fib is the most common cause of cardioembolic stroke. Therapeutic INR on warfarin (2.0–3.0) provides prophylaxis. This patient's INR of 1.6 is subtherapeutic, meaning he was not adequately anticoagulated — likely contributing to the stroke event. Inconsistent warfarin compliance is a known risk factor." />
        <QuizQuestion index={2} question="What is the FIRST assessment the nurse should perform before allowing the patient to eat or drink?" options={["Check blood glucose level", "Bedside swallow evaluation/dysphagia screening", "Auscultate bowel sounds", "Review dietary preferences"]} correctIndex={1} rationale="Stroke patients are at high risk for dysphagia and aspiration. A bedside swallow evaluation must be completed BEFORE any oral intake (food, fluids, or oral medications). Aspiration pneumonia is a leading cause of morbidity and mortality following stroke." />
      </div>
    </ScenarioPageWrapper>
  );
}

function PediatricDeteriorationScenario() {
  const scenario = SCENARIOS.find(s => s.slug === "pediatric-deterioration")!;
  return (
    <ScenarioPageWrapper scenario={scenario}>
      <ScenarioSection title="Patient Presentation" color="blue">
        <p><strong>Patient:</strong> Mia Thompson, 3-year-old female</p>
        <p><strong>Chief complaint:</strong> Admitted 18 hours ago with community-acquired pneumonia. Night nurse reports the child's condition is "not looking right" compared to the previous shift.</p>
        <p><strong>History of present illness:</strong> Mia was admitted with 3-day history of cough, fever, and decreased oral intake. Initial chest X-ray showed right lower lobe consolidation. Started on IV ampicillin. Was playful and interactive on admission but has become progressively less active over the past 6 hours. Parents report she has not eaten and has had minimal fluid intake.</p>
        <p><strong>Past medical history:</strong> Born at 35 weeks gestation, no significant neonatal complications. Up to date on immunizations. No chronic conditions. No allergies.</p>
        <p><strong>Weight:</strong> 14 kg</p>
      </ScenarioSection>

      <ScenarioSection title="Assessment Findings" color="red">
        <p><strong>Vital signs:</strong> HR 168 bpm (normal for age: 80–120), RR 42/min (normal: 20–30), SpO₂ 90% on 2L nasal cannula (was 96% on admission), Temp 39.8°C (103.6°F), BP 78/45 mmHg (normal minimum SBP: 70 + [2 × age] = 76 mmHg — borderline low)</p>
        <p><strong>General:</strong> Listless, not making eye contact, not interested in toys. Responds to voice but irritable when touched. Not crying with tears — mucous membranes tacky. Skin mottled on extremities, capillary refill 4 seconds.</p>
        <p><strong>Respiratory:</strong> Subcostal and intercostal retractions, nasal flaring, grunting on expiration. Diminished breath sounds right lower lobe with crackles. Increased work of breathing compared to admission.</p>
        <p><strong>Cardiovascular:</strong> Tachycardic, weak peripheral pulses. Cool extremities despite fever.</p>
        <p><strong>Urine output:</strong> 0.5 mL/kg/hr over last 4 hours (borderline — normal minimum for children: 1 mL/kg/hr).</p>
      </ScenarioSection>

      <ScenarioSection title="Clinical Reasoning" color="amber">
        <p><strong>Pediatric Early Warning Signs (PEWS):</strong> This child is showing multiple red flags for clinical deterioration: rising heart rate, worsening respiratory distress (retractions, grunting, nasal flaring), declining oxygen saturation despite supplemental O₂, altered behavior (listless, not interactive), poor perfusion (mottled skin, prolonged cap refill, cool extremities, weak pulses), decreased urine output, and persistent high fever.</p>
        <p><strong>Analysis:</strong> The clinical picture suggests progression from localized pneumonia to possible sepsis with impending septic shock. The hemodynamic changes (tachycardia, borderline BP, poor perfusion) suggest compensated shock — the body is maintaining blood pressure through tachycardia, but decompensation is imminent if not treated aggressively.</p>
        <p><strong>Critical pediatric concept:</strong> Children compensate for shock much longer than adults, maintaining blood pressure until very late. By the time hypotension occurs in a child, they are in decompensated shock — a pre-arrest state. The key is recognizing early signs: tachycardia, altered mental status, poor perfusion, and decreased urine output.</p>
      </ScenarioSection>

      <ScenarioSection title="Nursing Priorities" color="green">
        <p><strong>1. Escalate immediately:</strong> Activate rapid response or pediatric emergency team. This child shows signs of compensated septic shock — do not wait for further deterioration.</p>
        <p><strong>2. Optimize oxygenation:</strong> Increase to high-flow nasal cannula or non-rebreather mask to target SpO₂ &gt; 94%. Position upright. Be prepared for respiratory support (CPAP, intubation) if grunting worsens or mental status declines further.</p>
        <p><strong>3. IV fluid resuscitation:</strong> 20 mL/kg NS bolus (14 kg × 20 = 280 mL) over 5–10 minutes. Reassess after each bolus — may repeat up to 60 mL/kg in the first hour. Assess for fluid responsiveness: improved heart rate, perfusion, mental status, urine output.</p>
        <p><strong>4. Obtain cultures and labs:</strong> Blood cultures × 2, CBC with differential, CRP, lactate, BMP (electrolytes, glucose, renal function), blood gas. Obtain before changing antibiotics if possible.</p>
        <p><strong>5. Broaden antibiotic coverage:</strong> The current regimen (ampicillin alone) may be insufficient. Notify the provider to consider broadening to ceftriaxone or adding vancomycin if MRSA is suspected.</p>
        <p><strong>6. Continuous monitoring:</strong> Cardiac monitoring, continuous pulse oximetry, strict I&O (weigh diapers), frequent vital signs q15min during acute resuscitation, blood glucose monitoring (children are prone to hypoglycemia during sepsis).</p>
        <p><strong>7. Family-centered care:</strong> Keep parents informed and at bedside when possible. Explain interventions and what to expect. Parents know their child best — their concern that the child "doesn't look right" should always be taken seriously.</p>
      </ScenarioSection>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow-Up Quiz Questions</h2>
        <QuizQuestion index={0} question="Which assessment finding is the MOST concerning indicator of clinical deterioration in this child?" options={["Temperature of 39.8°C", "Heart rate of 168 bpm", "Mottled skin with prolonged capillary refill (4 seconds)", "Respiratory rate of 42"]} correctIndex={2} rationale="Mottled skin with prolonged capillary refill (> 3 seconds in children) indicates poor peripheral perfusion — a hallmark of shock. While tachycardia and tachypnea are concerning, poor perfusion (mottled skin, cool extremities, weak pulses) indicates the cardiovascular system is failing to deliver adequate oxygen to tissues." />
        <QuizQuestion index={1} question="How much IV fluid should be administered as a bolus for this 14 kg child showing signs of septic shock?" options={["140 mL (10 mL/kg)", "280 mL (20 mL/kg)", "420 mL (30 mL/kg)", "700 mL (50 mL/kg)"]} correctIndex={1} rationale="Initial fluid resuscitation for pediatric septic shock is 20 mL/kg of isotonic crystalloid (NS or LR) given rapidly over 5–10 minutes. For a 14 kg child: 14 × 20 = 280 mL. This can be repeated up to 60 mL/kg in the first hour while reassessing after each bolus." />
        <QuizQuestion index={2} question="A parent tells the nurse, 'Something is wrong — she's not acting like herself.' What is the appropriate nursing response?" options={["Reassure the parent that fever causes children to be less active", "Document the parent's concern and continue current care plan", "Take the concern seriously — perform a comprehensive reassessment immediately", "Ask the parent to leave the room so the child can rest"]} correctIndex={2} rationale="Parents know their child's baseline behavior better than anyone. Parental concern that a child 'doesn't look right' or 'isn't acting like themselves' is a validated early warning sign of clinical deterioration. The nurse should perform an immediate, thorough reassessment and escalate findings to the medical team." />
      </div>
    </ScenarioPageWrapper>
  );
}

function ScenarioRouter() {
  const [, params] = useRoute("/nursing-clinical-scenarios/:slug");
  const slug = params?.slug;

  if (!slug) return <NursingClinicalScenariosHub />;

  switch (slug) {
    case "chest-pain-emergency": return <ChestPainScenario />;
    case "sepsis-recognition": return <SepsisScenario />;
    case "respiratory-distress": return <RespiratoryDistressScenario />;
    case "stroke-assessment": return <StrokeScenario />;
    case "pediatric-deterioration": return <PediatricDeteriorationScenario />;
    default: return <NursingClinicalScenariosHub />;
  }
}

export default function NursingClinicalScenariosPage() {
  return <ScenarioRouter />;
}

export { NursingClinicalScenariosHub };
