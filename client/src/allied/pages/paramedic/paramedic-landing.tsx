import { Link } from "wouter";
import {
  Ambulance, BookOpen, Brain, FileText, Zap, Target, Clock,
  ArrowRight, CheckCircle2, AlertTriangle, Search, Shuffle,
  Calendar, GraduationCap, TrendingUp, Shield, Layers, Heart
} from "lucide-react";
import { AlliedSEO } from "@/allied/allied-seo";
import {
  HeroCTA, StudyPathSteps, TrackCard, PainPointCard, FeatureCard,
  TopicCategoryCard, FreePreviewBlock, ExamPathCard, TrustBlock,
  FinalCTASection, RegionSelector
} from "./components";
import { paramedicQuestions } from "@/data/career-questions/paramedic-questions";
import { useParamedicRegion } from "@/allied/contexts/paramedic-region-context";

const CATEGORY_COUNTS: Record<string, number> = {};
paramedicQuestions.forEach(q => {
  CATEGORY_COUNTS[q.category] = (CATEGORY_COUNTS[q.category] || 0) + 1;
});

const ACTUAL_CATEGORIES = Object.keys(CATEGORY_COUNTS).sort((a, b) => (CATEGORY_COUNTS[b] || 0) - (CATEGORY_COUNTS[a] || 0));

const TOPIC_CATEGORIES = ACTUAL_CATEGORIES.slice(0, 8).map(name => ({
  title: name,
  questionCount: CATEGORY_COUNTS[name],
}));

const STUDY_STEPS = [
  { step: 1, title: "Take the Diagnostic", description: "A free 15-question assessment identifies your strengths and gaps across all paramedic domains.", icon: Target },
  { step: 2, title: "Follow Your Study Plan", description: "Get a personalized daily schedule targeting your weakest areas first, calibrated to your exam date.", icon: Calendar },
  { step: 3, title: "Practice & Review", description: "Work through adaptive questions, flashcards, and clinical scenarios with 600+ word rationales.", icon: BookOpen },
  { step: 4, title: "Simulate Exam Day", description: "Take timed, blueprint-weighted mock exams and track your readiness score over time.", icon: GraduationCap },
];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function ParamedicLandingPage() {
  const { region, isCanada, isUS } = useParamedicRegion();

  const caExamTracks = [
    { title: "PCP Students", description: "Primary Care Paramedic learners preparing for COPR or provincial exams in Canada.", examNames: ["COPR", "Provincial PCP"], href: "/paramedic/pcp", color: "#7C3AED", icon: Ambulance },
    { title: "ACP Candidates", description: "Advanced Care Paramedics studying ACLS, PALS, pharmacology, and 12-lead interpretation.", examNames: ["ACP Provincial", "COPR ACP"], href: "/paramedic/acp", color: "#0D9488", icon: Heart },
  ];

  const usExamTracks = [
    { title: "EMT-Basic", description: "Entry-level emergency medical technicians preparing for the NREMT EMT cognitive exam.", examNames: ["NREMT EMT"], href: "/paramedic/nremt", color: "#2563EB", icon: Shield },
    { title: "EMT-Advanced", description: "Advanced EMTs bridging to paramedic level with expanded scope of practice.", examNames: ["NREMT AEMT"], href: "/paramedic/nremt", color: "#D97706", icon: TrendingUp },
    { title: "NREMT Paramedic", description: "US-based paramedic students preparing for the National Registry cognitive and psychomotor exams.", examNames: ["NREMT Paramedic"], href: "/paramedic/nremt", color: "#2563EB", icon: Shield },
  ];

  const examTracks = isCanada ? caExamTracks : usExamTracks;

  return (
    <div data-testid="paramedic-landing-page">
      <AlliedSEO
        title="Paramedic Exam Prep — PCP, ACP & NREMT Practice Questions | NurseNest"
        description="Prepare for your paramedic certification exam with 500+ adaptive practice questions, clinical scenarios, ACLS/PALS drills, and blueprint-weighted mock exams. Covers NREMT, COPR, PCP, and ACP exam tracks."
        keywords="paramedic exam prep, NREMT practice questions, PCP exam canada, ACP exam, paramedic practice test, paramedic flashcards, paramedic study guide, EMS certification"
        canonicalPath="/paramedic"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Paramedic Certification Exam Prep",
          "description": "Comprehensive paramedic exam preparation with adaptive question banks, clinical scenarios, and blueprint-weighted mock exams for NREMT, COPR, PCP, and ACP certifications.",
          "provider": { "@type": "Organization", "name": "NurseNest Allied", "url": "https://www.nursenest.ca/allied-health" }
        }}
      />

      <HeroCTA
        badge="Paramedic Exam Academy"
        title="Pass Your Paramedic Exam"
        titleHighlight="with Confidence"
        subtitle={isCanada
          ? "Adaptive question banks, clinical scenarios, ACLS/PALS drills, and blueprint-weighted mock exams — built for PCP and ACP learners preparing for COPR and provincial certification exams."
          : "Adaptive question banks, clinical scenarios, ACLS/PALS drills, and blueprint-weighted mock exams — built for EMT, AEMT, and NREMT Paramedic learners who need more than just a question bank."
        }
        primaryCTA={{ label: "Start Free Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "Explore Study Tools", href: "/paramedic/lessons" }}
      />

      <section className="py-6 bg-white border-b border-gray-100" data-testid="section-region-selector">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Select your region:</span>
          <RegionSelector />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-who-this-is-for">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {isCanada ? "Canadian Paramedic Exam Tracks" : "US EMS Certification Tracks"}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {isCanada
                ? "Whether you are starting your PCP program or preparing for an advanced care paramedic exam, NurseNest meets you where you are."
                : "From EMT-Basic through NREMT Paramedic, NurseNest has the study tools matched to your certification level."
              }
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${examTracks.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2 max-w-3xl mx-auto"} gap-6`}>
            {examTracks.map(track => (
              <TrackCard key={track.title} {...track} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-purple-50/30 to-white" data-testid="section-pain-points">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">We Know What's Holding You Back</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Paramedic exam prep is fragmented, outdated, and rarely clinical enough. NurseNest changes that.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PainPointCard icon={AlertTriangle} title="Shallow Rationales" description="Most question banks give you 'A is correct' with one sentence. You need to understand the clinical reasoning to apply knowledge under pressure." />
            <PainPointCard icon={Search} title="No Weak-Area Targeting" description="Studying random questions wastes time. You need a system that identifies your gaps and drills them until they're strengths." />
            <PainPointCard icon={Shuffle} title="Content That Doesn't Match Your Exam" description={isCanada ? "Generic EMS prep doesn't distinguish PCP from ACP scope. Your study material should match your specific certification track and Canadian protocols." : "Generic EMS prep doesn't match your specific NREMT certification level. Your study material should align with US protocols and exam blueprints."} />
            <PainPointCard icon={Clock} title="No Structured Study Plan" description="You know you need to study, but you don't know where to start or how to allocate your limited time before exam day." />
            <PainPointCard icon={Layers} title="Scattered Resources" description="Textbooks, YouTube, random apps — juggling multiple resources means gaps in your coverage and no unified progress tracking." />
            <PainPointCard icon={FileText} title="No Realistic Exam Simulation" description="You've never experienced a timed, blueprint-weighted mock exam that mirrors the actual test format and difficulty." />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-how-nursenest-helps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How NurseNest Helps You Pass</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Six integrated study tools, one platform, zero guesswork.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={BookOpen} title="Adaptive Test Bank" description="500+ paramedic-specific questions with 600+ word clinical rationales. Covers trauma, medical, cardiac, pediatric, OB, and pharmacology." />
            <FeatureCard icon={FileText} title="Blueprint-Weighted Mocks" description={isCanada ? "Timed mock exams weighted to COPR or provincial blueprints. Get a readiness score and domain-level breakdown." : "Timed mock exams weighted to the NREMT blueprint. Get a readiness score and domain-level breakdown."} />
            <FeatureCard icon={Brain} title="Spaced Repetition Flashcards" description="Master drug dosages, protocols, and assessment mnemonics with flashcards that adapt to your recall accuracy." />
            <FeatureCard icon={Zap} title="Clinical Scenarios" description="Unfolding dispatch-to-disposition scenarios with branching decisions and detailed clinical debriefs." />
            <FeatureCard icon={Target} title="Weak-Area Targeting" description="Our analytics engine identifies your lowest-performing domains and auto-generates targeted drills until you improve." />
            <FeatureCard icon={GraduationCap} title="Personalized Study Plan" description="Enter your exam date, available study hours, and diagnostic results. Get a day-by-day plan that adapts weekly." />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-teal-50/30 to-white" data-testid="section-topic-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Topic Categories</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Questions and lessons organized by the clinical domains tested on your paramedic certification exam.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPIC_CATEGORIES.map(tc => (
              <TopicCategoryCard
                key={tc.title}
                title={tc.title}
                questionCount={tc.questionCount}
                href={`/paramedic/questions?category=${encodeURIComponent(tc.title)}`}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/paramedic/questions" className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 text-sm" data-testid="link-browse-all-topics">
              Browse all question topics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <StudyPathSteps steps={STUDY_STEPS} />

      <FreePreviewBlock
        title="Try It Free — No Account Required"
        subtitle="Experience the depth of NurseNest paramedic prep before you commit. Start with a free diagnostic and 5 practice questions."
        previewItems={[
          { label: "15-Question Diagnostic", description: "See your readiness score across all paramedic domains" },
          { label: "5 Practice Questions", description: "Experience our 600+ word clinical rationales" },
          { label: "1 Mock Exam", description: "Take a full-length timed mock to feel the exam format" },
        ]}
        ctaHref="/diagnostic?career=paramedic"
        ctaLabel="Start Free Diagnostic"
      />

      <section className="py-16 sm:py-20 bg-white" data-testid="section-exam-pathways">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Exam Pathway</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Each pathway is tailored with exam-specific content, blueprint weighting, and targeted study materials.</p>
          </div>
          <div className={`grid grid-cols-1 ${isCanada ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"} gap-6`}>
            {isCanada ? (
              <>
                <ExamPathCard
                  title="PCP Exam Prep (Canada)"
                  description="Primary Care Paramedic certification prep aligned with COPR and provincial licensing standards."
                  features={["COPR blueprint alignment", "Canadian pharmacology & protocols", "Provincial scope-of-practice focus", "BLS and primary care scenarios"]}
                  href="/paramedic/pcp"
                  badge="Canada"
                />
                <ExamPathCard
                  title="ACP Exam Prep (Canada)"
                  description="Advanced Care Paramedic study materials covering ACLS, PALS, advanced pharmacology, and 12-lead ECG."
                  features={["Advanced cardiac & pharmacology", "12-lead ECG interpretation drills", "ACLS/PALS algorithm mastery", "Critical care transport scenarios"]}
                  href="/paramedic/acp"
                  badge="Advanced"
                />
              </>
            ) : (
              <>
                <ExamPathCard
                  title="EMT-Basic Exam"
                  description="Entry-level EMT certification prep with US protocols and foundational patient assessment."
                  features={["NREMT EMT blueprint alignment", "BLS protocols & patient assessment", "Foundational pharmacology", "Trauma & medical scenarios"]}
                  href="/paramedic/nremt"
                  badge="Entry Level"
                />
                <ExamPathCard
                  title="EMT-Advanced / AEMT"
                  description="Advanced EMT certification prep bridging to paramedic-level interventions."
                  features={["Expanded scope of practice", "IV access & fluid therapy", "Advanced airway management", "Medication administration"]}
                  href="/paramedic/nremt"
                  badge="Intermediate"
                />
                <ExamPathCard
                  title="NREMT Paramedic"
                  description="National Registry paramedic cognitive exam preparation with US-focused protocols."
                  features={["NREMT cognitive exam blueprint", "CAT-style adaptive simulation", "US pharmacology & protocols", "Psychomotor skills reference"]}
                  href="/paramedic/nremt"
                  badge="Advanced"
                />
              </>
            )}
          </div>
        </div>
      </section>

      <TrustBlock />

      <FinalCTASection
        title="Your Paramedic Exam Is Coming. Are You Ready?"
        subtitle="Start with a free diagnostic to see exactly where you stand. Then follow your personalized study plan to exam-day confidence."
        primaryCTA={{ label: "Start Free Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
