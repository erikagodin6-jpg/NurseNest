import { AlliedSEO } from "@/allied/allied-seo";
import {
  HeroCTA, FreePreviewBlock, TrustBlock, FinalCTASection,
  FAQSection, TopicCategoryCard, FeatureCard, RegionNotesCallout
} from "./components";
import {
  BookOpen, FileText, Brain, Zap, Target, Heart, Activity, Shield
} from "lucide-react";
import { paramedicQuestions } from "@/data/career-questions/paramedic-questions";

const CATEGORY_COUNTS: Record<string, number> = {};
paramedicQuestions.forEach(q => {
  CATEGORY_COUNTS[q.category] = (CATEGORY_COUNTS[q.category] || 0) + 1;
});

const ACP_RELEVANT = ["Cardiology/ECG", "ACLS/PALS Protocols", "Pharmacology", "Airway Management", "Trauma Management", "Medical Emergencies", "Pediatric Emergencies", "OB Emergencies"];
const ACP_TOPICS = ACP_RELEVANT.filter(c => CATEGORY_COUNTS[c]).map(c => ({
  title: c,
  questionCount: CATEGORY_COUNTS[c],
}));

const ACP_FAQS = [
  { q: "What does ACP exam prep cover?", a: "Our ACP track covers all Advanced Care Paramedic competencies including ACLS and PALS algorithms, advanced pharmacology, 12-lead ECG interpretation, advanced airway management (RSI, surgical airways), critical care transport principles, and expanded medical and trauma management beyond PCP scope." },
  { q: "Is this aligned with Canadian ACP standards?", a: "Yes. Content is aligned with COPR ACP competency profiles and provincial ACP licensing requirements. All pharmacology uses Canadian drug names and formularies, and protocols reflect Canadian ACP scope of practice." },
  { q: "How does ACP content differ from PCP content?", a: "ACP content builds on PCP foundations and adds advanced interventions: cardiac dysrhythmia management, synchronized cardioversion, transcutaneous pacing, RSI, needle thoracostomy, expanded pharmacology (paralytic agents, antiarrhythmics, vasopressors), 12-lead ECG interpretation, and critical care transport considerations." },
  { q: "Are there 12-lead ECG practice questions?", a: "Yes. We have dedicated 12-lead ECG interpretation questions covering STEMI recognition, bundle branch blocks, axis deviation, and dysrhythmia identification. Our ECG Recognition Drill tool provides additional focused practice with progressive difficulty." },
  { q: "Can I practice ACLS algorithms?", a: "Absolutely. Our question bank includes ACLS algorithm questions covering cardiac arrest, tachycardia, bradycardia, and post-ROSC care. Clinical scenarios walk you through full ACLS cases from recognition through management." },
  { q: "Is there a free trial?", a: "Yes. Start with a free 15-question diagnostic to identify your strengths and gaps across ACP domains. You get 5 free practice questions and one mock exam to experience the platform." },
];

export default function ParamedicACPPage() {
  return (
    <div data-testid="paramedic-acp-page">
      <AlliedSEO
        title="ACP Exam Prep — Advanced Care Paramedic Practice Questions | NurseNest"
        description="Prepare for your Advanced Care Paramedic exam with ACLS/PALS mastery, 12-lead ECG drills, advanced pharmacology, and blueprint-weighted mock exams. 600+ word clinical rationales on every question."
        keywords="advanced care paramedic exam, ACP exam prep, ACP practice questions, paramedic ACLS, ACP certification canada, advanced paramedic study guide, 12-lead ECG paramedic"
        canonicalPath="/paramedic/acp"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Advanced Care Paramedic (ACP) Exam Prep",
          "description": "Advanced Care Paramedic exam preparation with ACLS/PALS mastery, 12-lead ECG drills, expanded pharmacology, and clinical scenarios for ACP certification.",
          "provider": { "@type": "Organization", "name": "NurseNest Allied", "url": "https://www.nursenest.ca/allied-health" }
        }}
      />

      <HeroCTA
        badge="Advanced Care Paramedic"
        title="Master ACP-Level"
        titleHighlight="Clinical Decision-Making"
        subtitle="ACLS algorithms, 12-lead ECG interpretation, advanced pharmacology, and critical care scenarios — study tools built for the complexity of advanced paramedic practice."
        primaryCTA={{ label: "Start Free ACP Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "Browse ACP Questions", href: "/qbank?career=paramedic" }}
      />

      <section className="py-16 sm:py-20 bg-white" data-testid="section-acp-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Built for Advanced Practice</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">ACP certification demands deeper clinical reasoning. Our platform goes beyond recall-level questions to test the analytical thinking your exam requires.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Heart} title="ACLS & PALS Algorithm Mastery" description="Work through every ACLS and PALS algorithm with decision-point questions and full clinical rationales explaining the reasoning behind each intervention." />
            <FeatureCard icon={Activity} title="12-Lead ECG Drills" description="Progressive-difficulty ECG recognition practice: identify STEMI patterns, bundle branch blocks, axis deviation, and complex dysrhythmias." />
            <FeatureCard icon={BookOpen} title="Advanced Pharmacology" description="ACP-scope medications including paralytic agents, antiarrhythmics, vasopressors, and sedatives with dose calculations and clinical scenarios." />
            <FeatureCard icon={Zap} title="Critical Care Scenarios" description="Unfolding cases covering interfacility transport, mechanical ventilation management, vasopressor titration, and multi-system critical patients." />
            <FeatureCard icon={FileText} title="ACP-Weighted Mock Exams" description="Timed exams weighted to ACP exam blueprints with difficulty levels matching advanced certification standards." />
            <FeatureCard icon={Brain} title="Clinical Reasoning Rationales" description="Every rationale explains the pathophysiology, differentials, and management rationale at the depth expected of an ACP practitioner." />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-purple-50/30 to-white" data-testid="section-acp-topics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">High-Yield ACP Topic Categories</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Focus on the advanced clinical domains that define ACP certification exams.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACP_TOPICS.map(t => (
              <TopicCategoryCard key={t.title} title={t.title} questionCount={t.questionCount} href={`/qbank?career=paramedic&category=${encodeURIComponent(t.title)}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white" data-testid="section-acp-region-notes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegionNotesCallout
            caNote="Canadian ACP scope includes RSI, surgical airways, chest decompression, and an expanded pharmacological formulary under COPR ACP competencies. All lab values use SI units. Provincial ACP licensing requirements may vary."
            usNote="In the US, paramedic-level scope includes many ACP interventions. NREMT Paramedic certification covers advanced airway, cardiac, and pharmacology. Scope specifics vary by state protocol. Lab values use conventional US units (mg/dL)."
          />
        </div>
      </section>

      <FreePreviewBlock
        title="Try ACP Prep Free"
        subtitle="See where your ACP knowledge stands with a free diagnostic, then experience our depth with 5 practice questions."
        previewItems={[
          { label: "15-Question Diagnostic", description: "Assess your ACP readiness across all domains" },
          { label: "5 Practice Questions", description: "Full 600+ word advanced rationales" },
          { label: "1 Mock Exam", description: "ACP-level timed exam simulation" },
        ]}
        ctaHref="/diagnostic?career=paramedic"
        ctaLabel="Start Free ACP Diagnostic"
      />

      <FAQSection title="ACP Exam Prep FAQ" faqs={ACP_FAQS} />

      <TrustBlock />

      <FinalCTASection
        title="Ready to Master ACP-Level Practice?"
        subtitle="Advanced Care Paramedic exams demand advanced preparation. Start with a free diagnostic and build your study plan today."
        primaryCTA={{ label: "Start Free Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
