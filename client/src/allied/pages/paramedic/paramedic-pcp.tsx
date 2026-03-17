import { AlliedSEO } from "@/allied/allied-seo";
import {
  HeroCTA, FreePreviewBlock, TrustBlock, FinalCTASection,
  FAQSection, TopicCategoryCard, FeatureCard, RegionNotesCallout
} from "./components";
import {
  BookOpen, FileText, Brain, Zap, Target, Shield, Ambulance, Heart
} from "lucide-react";
import { paramedicQuestions } from "@/data/career-questions/paramedic-questions";

const CATEGORY_COUNTS: Record<string, number> = {};
paramedicQuestions.forEach(q => {
  CATEGORY_COUNTS[q.category] = (CATEGORY_COUNTS[q.category] || 0) + 1;
});

const PCP_RELEVANT = ["Trauma Management", "Medical Emergencies", "Airway Management", "Pharmacology", "Pediatric Emergencies", "OB Emergencies", "Operations/EMS Systems", "Environmental Emergencies"];
const PCP_TOPICS = PCP_RELEVANT.filter(c => CATEGORY_COUNTS[c]).map(c => ({
  title: c,
  questionCount: CATEGORY_COUNTS[c],
}));

const PCP_FAQS = [
  { q: "What exam does PCP prep cover?", a: "Our PCP track is aligned with the Canadian COPR (Committee on Paramedic Registration) standards and provincial licensing exams across Canadian provinces. Content covers all PCP-level competencies including patient assessment, BLS, airway management, trauma, medical emergencies, and pharmacology within PCP scope of practice." },
  { q: "How many PCP practice questions are available?", a: "We currently have 500+ paramedic practice questions, with PCP-specific filtering available. Questions are tagged by difficulty and scope level so you can focus exclusively on PCP-level content. New questions are added weekly." },
  { q: "Are the rationales different from other paramedic question banks?", a: "Yes. Every question includes a 600+ word clinical rationale that explains the pathophysiology, assessment findings, and management reasoning — not just 'the answer is A.' This depth helps you build the clinical judgment tested on certification exams." },
  { q: "Can I use this for provincial licensing exams?", a: "Absolutely. While our content is aligned with national COPR competencies, the clinical knowledge and protocols covered are consistent with provincial licensing requirements across Canada. Use the region toggle to ensure Canadian protocols and drug names are prioritized." },
  { q: "Is there a free trial for PCP students?", a: "Yes. Start with a free 15-question diagnostic assessment to identify your strengths and gaps. You also get 5 free practice questions and one mock exam to experience the platform before subscribing." },
  { q: "How is PCP content different from ACP content?", a: "PCP content focuses on primary care paramedic scope: BLS, basic airway management, limited pharmacology, and fundamental patient assessment. ACP content adds advanced cardiac, 12-lead interpretation, expanded pharmacology, and advanced airway procedures. Our filtering ensures you only see content appropriate to your certification level." },
];

export default function ParamedicPCPPage() {
  return (
    <div data-testid="paramedic-pcp-page">
      <AlliedSEO
        title="PCP Exam Prep — Primary Care Paramedic Practice Questions | NurseNest"
        description="Prepare for your PCP exam with 500+ practice questions aligned to COPR standards. Covers patient assessment, airway management, trauma, and BLS protocols with 600+ word clinical rationales."
        keywords="pcp exam canada, primary care paramedic exam prep, COPR exam, PCP practice questions, paramedic exam canada, PCP certification, paramedic study guide canada"
        canonicalPath="/allied-health/paramedic/pcp"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Primary Care Paramedic (PCP) Exam Prep",
          "description": "Comprehensive PCP exam preparation aligned with Canadian COPR standards. Adaptive question bank, mock exams, and clinical scenarios for primary care paramedic certification.",
          "provider": { "@type": "Organization", "name": "NurseNest Allied", "url": "https://www.nursenest.ca/allied-health" }
        }}
      />

      <HeroCTA
        badge="PCP Exam Prep — Canada"
        title="Pass Your PCP Exam"
        titleHighlight="on the First Attempt"
        subtitle="COPR-aligned practice questions, provincial protocol coverage, and BLS-focused clinical scenarios — everything a Primary Care Paramedic student needs to study effectively."
        primaryCTA={{ label: "Start Free PCP Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "Browse PCP Questions", href: "/qbank?career=paramedic" }}
      />

      <section className="py-16 sm:py-20 bg-white" data-testid="section-pcp-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Makes Our PCP Prep Different</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Built specifically for Canadian PCP students — not a watered-down version of a US paramedic bank. Our content reflects COPR competencies, Canadian drug names, and provincial protocols.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Shield} title="COPR-Aligned Content" description="Every question maps to the national COPR competency profile for Primary Care Paramedics, covering all tested domains and skill levels." />
            <FeatureCard icon={BookOpen} title="600+ Word Rationales" description="Clinical rationales that explain the pathophysiology, assessment approach, and management reasoning — building the judgment your exam tests." />
            <FeatureCard icon={Ambulance} title="PCP Scope-Specific" description="Content filtered to PCP scope of practice. No ACP-level interventions cluttering your study — only what you need to know for your exam." />
            <FeatureCard icon={FileText} title="Blueprint-Weighted Mocks" description="Timed mock exams weighted to the PCP exam blueprint so your practice mirrors the real test format and domain distribution." />
            <FeatureCard icon={Brain} title="Spaced Repetition Flashcards" description="Master BLS protocols, drug dosages, assessment mnemonics, and clinical decision rules with adaptive flashcard decks." />
            <FeatureCard icon={Zap} title="Clinical Scenarios" description="Dispatch-to-disposition scenarios within PCP scope that test your assessment, management, and transport decisions." />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-purple-50/30 to-white" data-testid="section-pcp-topics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">High-Yield PCP Topic Categories</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Focus your study time on the domains that carry the most weight on the PCP exam.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PCP_TOPICS.map(t => (
              <TopicCategoryCard key={t.title} title={t.title} questionCount={t.questionCount} href={`/qbank?career=paramedic&category=${encodeURIComponent(t.title)}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white" data-testid="section-pcp-region-notes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegionNotesCallout
            caNote="In Canada, paramedics follow COPR scope of practice standards. PCP certification is governed by provincial regulatory bodies, and drug formularies use Canadian generic names and SI units (mmol/L for glucose, µmol/L for creatinine)."
            usNote="In the US, EMT scope of practice varies by state EMS protocols. The NREMT certification provides national standardization, but individual state requirements may differ. Lab values use conventional units (mg/dL for glucose)."
          />
        </div>
      </section>

      <FreePreviewBlock
        title="Try PCP Prep Free"
        subtitle="See where you stand with a free diagnostic, then dive into 5 practice questions with full clinical rationales."
        previewItems={[
          { label: "15-Question Diagnostic", description: "Identify your PCP strengths and gaps" },
          { label: "5 Practice Questions", description: "Full 600+ word rationales included" },
          { label: "1 Mock Exam", description: "Experience the timed exam format" },
        ]}
        ctaHref="/diagnostic?career=paramedic"
        ctaLabel="Start Free PCP Diagnostic"
      />

      <FAQSection title="PCP Exam Prep FAQ" faqs={PCP_FAQS} />

      <TrustBlock />

      <FinalCTASection
        title="Ready to Start Studying for Your PCP Exam?"
        subtitle="Take the free diagnostic today and get a personalized study plan targeting your weakest PCP domains."
        primaryCTA={{ label: "Start Free Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "View Pricing", href: "/allied-health/pricing" }}
      />
    </div>
  );
}
