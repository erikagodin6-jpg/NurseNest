import { AlliedSEO } from "@/allied/allied-seo";
import {
  HeroCTA, FreePreviewBlock, TrustBlock, FinalCTASection,
  FAQSection, TopicCategoryCard, FeatureCard
} from "./components";
import {
  BookOpen, FileText, Brain, Zap, Target, Shield, Ambulance, TrendingUp
} from "lucide-react";
import { paramedicQuestions } from "@/data/career-questions/paramedic-questions";

const CATEGORY_COUNTS: Record<string, number> = {};
paramedicQuestions.forEach(q => {
  CATEGORY_COUNTS[q.category] = (CATEGORY_COUNTS[q.category] || 0) + 1;
});

const NREMT_RELEVANT = ["Airway Management", "Cardiology/ECG", "ACLS/PALS Protocols", "Trauma Management", "Medical Emergencies", "OB Emergencies", "Operations/EMS Systems", "Pharmacology"];
const NREMT_TOPICS = NREMT_RELEVANT.filter(c => CATEGORY_COUNTS[c]).map(c => ({
  title: c,
  questionCount: CATEGORY_COUNTS[c],
}));

const NREMT_FAQS = [
  { q: "Is this aligned with the NREMT paramedic cognitive exam?", a: "Yes. All content is mapped to the current NREMT Paramedic cognitive exam blueprint. Question distribution follows the official content area weighting: Airway/Respiration/Ventilation, Cardiology/Resuscitation, Trauma, Medical/OB/GYN, and EMS Operations." },
  { q: "Does the platform simulate the CAT format?", a: "Yes. The NREMT uses Computer Adaptive Testing, and our mock exams replicate this format. Question difficulty adjusts based on your performance, and the exam ends when the algorithm has sufficient confidence in your competency level — just like the real test." },
  { q: "How many NREMT practice questions are available?", a: "We have 500+ paramedic practice questions with NREMT-specific tagging. Questions cover all five NREMT content areas with appropriate difficulty distribution. New questions are added weekly." },
  { q: "Are US protocols and pharmacology used?", a: "Yes. Our NREMT track uses US drug names, US-standard dosing protocols, and references US regulatory frameworks. Use the region toggle to ensure you are studying US-specific content." },
  { q: "Can this help me prepare for the psychomotor exam too?", a: "Our platform focuses on cognitive exam preparation. However, our clinical scenario simulations walk through patient assessment sequences, treatment protocols, and clinical decision-making that build the knowledge foundation tested on psychomotor stations." },
  { q: "Is there a free trial?", a: "Yes. Take a free 15-question diagnostic to see your readiness score and domain breakdown. You also get 5 free practice questions with full rationales and one mock exam." },
];

export default function ParamedicNREMTPage() {
  return (
    <div data-testid="paramedic-nremt-page">
      <AlliedSEO
        title="NREMT Paramedic Practice Questions — Cognitive Exam Prep | NurseNest"
        description="Prepare for the NREMT paramedic cognitive exam with 500+ CAT-style practice questions, blueprint-weighted mock exams, and 600+ word clinical rationales. Covers all five NREMT content areas."
        keywords="nremt paramedic practice questions, NREMT paramedic exam prep, national registry paramedic, NREMT practice test, paramedic cognitive exam, NREMT study guide, CAT paramedic exam"
        canonicalPath="/paramedic/nremt"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "NREMT Paramedic Cognitive Exam Prep",
          "description": "National Registry Paramedic cognitive exam preparation with CAT-style adaptive questions, blueprint-weighted mock exams, and comprehensive clinical rationales.",
          "provider": { "@type": "Organization", "name": "NurseNest Allied", "url": "https://allied.nursenest.ca" }
        }}
      />

      <HeroCTA
        badge="NREMT Paramedic Exam Prep"
        title="Crush the NREMT"
        titleHighlight="Paramedic Cognitive Exam"
        subtitle="CAT-adaptive practice questions, blueprint-weighted mock exams, and 600+ word clinical rationales covering all five NREMT content areas — built to get you registry-certified."
        primaryCTA={{ label: "Start Free NREMT Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "Browse NREMT Questions", href: "/qbank?career=paramedic" }}
      />

      <section className="py-16 sm:py-20 bg-white" data-testid="section-nremt-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Designed for the NREMT Format</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The NREMT cognitive exam uses Computer Adaptive Testing. Our platform mirrors this format so you practice the way you will be tested.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={TrendingUp} title="CAT-Adaptive Simulation" description="Our engine adjusts question difficulty in real-time based on your answers — replicating the NREMT's Computer Adaptive Testing algorithm." />
            <FeatureCard icon={Shield} title="NREMT Blueprint Alignment" description="Questions weighted to the official NREMT paramedic content area distribution: Airway, Cardiology, Trauma, Medical, and EMS Operations." />
            <FeatureCard icon={BookOpen} title="600+ Word Clinical Rationales" description="Deep rationales covering the pathophysiology, assessment logic, and management reasoning behind every answer choice." />
            <FeatureCard icon={FileText} title="Full-Length Mock Exams" description="Timed exams that end adaptively based on your performance, simulating the variable-length NREMT format." />
            <FeatureCard icon={Target} title="Weak-Area Drills" description="Our analytics identify your lowest-performing NREMT content areas and auto-generate focused practice sets." />
            <FeatureCard icon={Brain} title="US Protocol Focus" description="All content uses US drug names, dosing standards, and regulatory references consistent with NREMT expectations." />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-purple-50/30 to-white" data-testid="section-nremt-topics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">NREMT Content Area Coverage</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Every NREMT content area covered with exam-authentic questions and clinical depth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NREMT_TOPICS.map(t => (
              <TopicCategoryCard key={t.title} title={t.title} questionCount={t.questionCount} href={`/qbank?career=paramedic&category=${encodeURIComponent(t.title)}`} />
            ))}
          </div>
        </div>
      </section>

      <FreePreviewBlock
        title="Try NREMT Prep Free"
        subtitle="Take a free diagnostic to see where you stand on all five NREMT content areas, then experience our rationale depth."
        previewItems={[
          { label: "15-Question Diagnostic", description: "NREMT content area readiness assessment" },
          { label: "5 Practice Questions", description: "Full 600+ word clinical rationales" },
          { label: "1 CAT Mock Exam", description: "Adaptive exam simulation" },
        ]}
        ctaHref="/diagnostic?career=paramedic"
        ctaLabel="Start Free NREMT Diagnostic"
      />

      <FAQSection title="NREMT Paramedic Exam FAQ" faqs={NREMT_FAQS} />

      <TrustBlock />

      <FinalCTASection
        title="Your NREMT Exam Is Coming. Let's Get You Registry-Certified."
        subtitle="Start with a free diagnostic, follow your personalized study plan, and walk into your cognitive exam knowing you are ready."
        primaryCTA={{ label: "Start Free Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
