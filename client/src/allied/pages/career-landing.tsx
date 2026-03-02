import { Link, useParams } from "wouter";
import { CAREER_CONFIGS, type CareerConfig } from "@shared/careers";
import {
  ArrowRight, BookOpen, FileText, Brain, Zap, GraduationCap, Wrench,
  BarChart3, Target, Clock, CheckCircle2, ChevronRight, Check, X,
  HelpCircle, DollarSign, Shield, Star, TrendingUp, Award
} from "lucide-react";
import { useState } from "react";
import { AlliedSEO } from "@/allied/allied-seo";

const ALLIED_CAREER_MAP: Record<string, CareerConfig> = {
  rrt: CAREER_CONFIGS.rrt,
  paramedic: CAREER_CONFIGS.paramedic,
  "pharmacy-tech": CAREER_CONFIGS.pharmacyTech,
  mlt: CAREER_CONFIGS.mlt,
  imaging: CAREER_CONFIGS.imaging,
};

const FEATURES = [
  { slug: "qbank", label: "Question Bank", desc: "Exam-authentic questions with 600+ word rationales explaining the why behind every answer", icon: BookOpen },
  { slug: "mock-exams", label: "Mock Exams", desc: "Blueprint-weighted timed practice exams with adaptive CAT-style simulation", icon: FileText },
  { slug: "flashcards", label: "Flashcards", desc: "Spaced repetition for key concepts across all exam domains", icon: Brain },
  { slug: "study-plan", label: "Study Planner", desc: "AI-generated daily study schedule targeting your weak areas first", icon: GraduationCap },
  { slug: "sims", label: "Case Simulators", desc: "Unfolding clinical scenarios mirroring real exam formats", icon: Zap },
  { slug: "tools", label: "AI Tools", desc: "Career-specific interactive tools for deep concept mastery", icon: Wrench },
];

const COMPARISON_DATA = [
  { feature: "Question Rationale Depth", allied: "600+ words per question", generic: "1–2 sentence rationale" },
  { feature: "Exam Simulation", allied: "Adaptive CAT-style engine", generic: "Static linear exams" },
  { feature: "Weak-Area Targeting", allied: "AI identifies & drills weak domains", generic: "Random question order" },
  { feature: "Question Roadmap", allied: "4,000+ questions planned", generic: "Limited static bank" },
  { feature: "Blueprint Alignment", allied: "Mapped to official exam blueprint", generic: "Generic topic coverage" },
  { feature: "Study Plan", allied: "AI-generated personalized schedule", generic: "Self-directed only" },
  { feature: "Case Simulations", allied: "Unfolding clinical scenarios", generic: "Not available" },
  { feature: "Performance Analytics", allied: "Domain-level breakdown & trends", generic: "Basic score only" },
];

const FAQ_DATA = [
  {
    q: "How are NurseNest Allied questions different from other question banks?",
    a: "Every question includes a 600+ word rationale that doesn't just tell you the right answer — it teaches you the clinical reasoning behind it. Our questions are mapped to the official exam blueprint and use adaptive CAT-style logic to match real exam conditions."
  },
  {
    q: "What is the adaptive CAT-style simulation?",
    a: "Computer Adaptive Testing (CAT) adjusts question difficulty based on your performance. Our mock exams simulate this experience so you're prepared for how the real exam works — not just the content, but the format and pacing."
  },
  {
    q: "How does weak-area targeting work?",
    a: "Our AI tracks your performance across every exam domain. It identifies where you're struggling and automatically prioritizes those topics in your study plan and practice sessions, so you spend time where it matters most."
  },
  {
    q: "How many questions are available?",
    a: "We currently have 500+ exam-authentic questions per career path, with a roadmap to 4,000+ questions. New questions are added regularly and mapped to the latest exam blueprints."
  },
  {
    q: "Can I try it before I pay?",
    a: "Yes! Take our free 15-question diagnostic assessment to see your readiness score and domain breakdown. You also get 5 free practice questions to experience the quality of our rationales firsthand."
  },
  {
    q: "What's included in the Pro plan?",
    a: "Pro gives you unlimited access to the full question bank, unlimited mock exams, AI study planner, case simulations, performance analytics, and all AI-powered tools. Everything you need to pass your exam with confidence."
  },
];

export default function CareerLandingPage() {
  const params = useParams<{ careerSlug: string }>();
  const career = ALLIED_CAREER_MAP[params.careerSlug || ""];

  if (!career) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Not Found</h1>
        <p className="text-gray-600 mb-6">The career you're looking for doesn't exist.</p>
        <Link href="/careers" className="text-teal-600 font-medium hover:underline">Browse All Careers</Link>
      </div>
    );
  }

  return (
    <div data-testid={`career-landing-${career.slug}`}>
      <AlliedSEO
        title={`${career.name} Exam Prep - QBank, Mock Exams & Study Tools`}
        description={`Prepare for your ${career.name} certification exam with practice questions, adaptive mock exams, flashcards, AI study tools, and a personalized study plan. Covers all ${career.examNames[0]} exam domains.`}
        keywords={`${career.name} exam prep, ${career.examNames[0]} exam, ${career.name} practice questions, ${career.name} mock exam, ${career.name} study guide, ${career.name} flashcards, ${career.name} certification`}
        canonicalPath={`/career/${params.careerSlug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": `${career.name} Certification Prep`,
          "description": `Prepare for your ${career.name} certification exam with practice questions, adaptive mock exams, flashcards, AI study tools, and a personalized study plan.`,
          "provider": {
            "@type": "Organization",
            "name": "NurseNest Allied",
            "url": "https://allied.nursenest.ca"
          }
        }}
      />
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50/30 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/careers" className="hover:text-teal-600">Careers</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-teal-700 font-medium">{career.shortName}</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: career.colorAccent, color: career.color }}>
              {career.examNames[0]} Prep
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-career-title">
              {career.name} Exam Prep
            </h1>
            <p className="text-lg text-gray-600 mb-6" data-testid="text-career-description">{career.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>600+ word rationales</strong> explaining the why behind every answer</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>Adaptive CAT-style</strong> simulation matching real exam logic</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>Weak-area targeting</strong> so you study what matters most</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>4,000+ question roadmap</strong> with new content added weekly</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href={`/diagnostic?career=${career.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200" data-testid="button-start-diagnostic">
                Start Free Diagnostic <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/qbank?career=${career.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-xl font-semibold hover:bg-teal-50 transition-colors border border-teal-200" data-testid="button-start-qbank">
                Practice Questions
              </Link>
              <Link href={`/careers/${career.slug}/mock-exams`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200" data-testid="button-start-mock">
                Take a Mock Exam
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-questions">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
            <div data-testid="stat-domains">
              <div className="text-2xl font-bold text-gray-900">{career.domains.length}</div>
              <div className="text-sm text-gray-500">Exam Domains</div>
            </div>
            <div data-testid="stat-exams">
              <div className="text-2xl font-bold text-gray-900">{career.examNames.length}</div>
              <div className="text-sm text-gray-500">Exam Types</div>
            </div>
            <div data-testid="stat-tools">
              <div className="text-2xl font-bold text-gray-900">{career.aiTools.length}</div>
              <div className="text-sm text-gray-500">AI Tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Study Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <Link key={f.slug} href={f.slug === "qbank" ? `/qbank?career=${career.slug}` : `/careers/${career.slug}/${f.slug}`} className="group" data-testid={`card-feature-${f.slug}`}>
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-teal-200 transition-all h-full">
                  <f.icon className="w-7 h-7 text-teal-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{f.label}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50" data-testid="section-comparison">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">NurseNest Allied vs. Generic Question Banks</h2>
            <p className="text-gray-600">See why students switch to NurseNest Allied for serious exam prep</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="px-5 py-3 text-sm font-semibold text-gray-500">Feature</div>
              <div className="px-5 py-3 text-sm font-semibold text-teal-700 text-center">NurseNest Allied</div>
              <div className="px-5 py-3 text-sm font-semibold text-gray-400 text-center">Generic Banks</div>
            </div>
            {COMPARISON_DATA.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i < COMPARISON_DATA.length - 1 ? 'border-b border-gray-100' : ''}`} data-testid={`comparison-row-${i}`}>
                <div className="px-5 py-4 text-sm font-medium text-gray-700">{row.feature}</div>
                <div className="px-5 py-4 text-sm text-teal-700 text-center flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>{row.allied}</span>
                </div>
                <div className="px-5 py-4 text-sm text-gray-400 text-center flex items-center justify-center gap-1.5">
                  <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <span>{row.generic}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Blueprint Domains */}
      <section className="py-16 bg-gradient-to-b from-teal-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Exam Blueprint Domains</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {career.domains.map((domain, i) => (
              <div key={domain} className="bg-white rounded-lg border border-gray-100 px-4 py-3 flex items-center gap-3" data-testid={`domain-${i}`}>
                <Target className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{domain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Tools */}
      {career.aiTools.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">AI-Powered Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {career.aiTools.map(tool => (
                <Link key={tool.id} href={`/careers/${career.slug}/tools`} className="group" data-testid={`card-tool-${tool.id}`}>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 p-5 hover:shadow-md transition-all">
                    <Wrench className="w-6 h-6 text-teal-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Mini-Section */}
      <section className="py-16 bg-gradient-to-b from-white to-teal-50/40" data-testid="section-pricing">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Start free. Upgrade when you're ready to go all-in on exam prep.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6" data-testid="pricing-free">
              <div className="text-sm font-medium text-gray-500 mb-2">Free</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
              <div className="text-sm text-gray-500 mb-5">forever</div>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>5 practice questions</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>1 mock exam</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Free diagnostic assessment</span>
                </li>
              </ul>
              <Link href={`/diagnostic?career=${career.slug}`} className="block w-full text-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors" data-testid="button-pricing-free">
                Start Free Diagnostic
              </Link>
            </div>

            {/* Monthly */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6" data-testid="pricing-monthly">
              <div className="text-sm font-medium text-gray-500 mb-2">Monthly</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$29</div>
              <div className="text-sm text-gray-500 mb-5">per month</div>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited questions & rationales</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited mock exams</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>All AI tools & analytics</span>
                </li>
              </ul>
              <Link href="/pricing" className="block w-full text-center px-4 py-2.5 bg-teal-100 text-teal-700 rounded-xl font-medium hover:bg-teal-200 transition-colors" data-testid="button-pricing-monthly">
                Get Monthly Access
              </Link>
            </div>

            {/* Annual - Best Value */}
            <div className="bg-white rounded-2xl border-2 border-teal-500 p-6 relative shadow-lg shadow-teal-100" data-testid="pricing-annual">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-teal-600 text-white text-xs font-bold rounded-full">
                BEST VALUE
              </div>
              <div className="text-sm font-medium text-teal-600 mb-2">Annual</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$239</div>
              <div className="text-sm text-gray-500 mb-1">per year</div>
              <div className="text-xs font-semibold text-teal-600 mb-5">Save 31% vs monthly</div>
              <ul className="space-y-2.5 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Everything in Monthly</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Priority new content access</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Extended performance history</span>
                </li>
              </ul>
              <Link href="/pricing" className="block w-full text-center px-4 py-2.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-md shadow-teal-200" data-testid="button-pricing-annual">
                Get Annual Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about {career.shortName} exam prep</p>
          </div>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to pass your {career.examNames[0]} exam?
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            Take the free 15-question diagnostic to discover your strengths and weak areas — no credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/diagnostic?career=${career.slug}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-teal-700 rounded-xl font-bold hover:bg-teal-50 transition-colors shadow-lg" data-testid="button-cta-diagnostic">
              Start Free Diagnostic <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-colors border border-teal-400" data-testid="button-cta-pricing">
              View Full Pricing
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-teal-200 text-sm">
            <Link href={`/qbank?career=${career.slug}`} className="hover:text-white transition-colors" data-testid="link-footer-qbank">Question Bank →</Link>
            <Link href={`/careers/${career.slug}/mock-exams`} className="hover:text-white transition-colors" data-testid="link-footer-mocks">Mock Exams →</Link>
            <Link href="/pricing" className="hover:text-white transition-colors" data-testid="link-footer-pricing">Pricing →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden" data-testid={`faq-item-${index}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        data-testid={`button-faq-toggle-${index}`}
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? 'text-teal-500' : 'text-gray-400'}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>
          {answer}
        </div>
      )}
    </div>
  );
}
