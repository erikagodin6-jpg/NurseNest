import { Link, useParams } from "wouter";
import { getCareerByRouteSlug, getCanonicalRoute } from "@shared/careers";
import {
  ArrowRight, BookOpen, FileText, Brain, Zap, GraduationCap, Wrench,
  BarChart3, Target, Clock, CheckCircle2, ChevronRight, Check, X,
  HelpCircle, DollarSign, Shield, Star, TrendingUp, Award, Globe, Stethoscope,
  Lightbulb, Heart, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";
import { AlliedSEO } from "@/allied/allied-seo";
import { useRegion } from "@/allied/use-region";
import { getCrossPlatformLinksForCareer } from "@/data/internal-links";
import { getHubMarketingData } from "@/allied/data/hub-marketing-data";

const FEATURES = [
  { slug: "qbank", label: "Question Bank", desc: "Exam-authentic questions with 600+ word rationales explaining the why behind every answer", icon: BookOpen },
  { slug: "mock-exams", label: "Mock Exams", desc: "Blueprint-weighted timed practice exams with adaptive CAT-style simulation", icon: FileText },
  { slug: "flashcards", label: "Flashcards", desc: "Spaced repetition for key concepts across all exam domains", icon: Brain },
  { slug: "study-plan", label: "Study Planner", desc: "Personalized daily study schedule targeting your weak areas first", icon: GraduationCap },
  { slug: "sims", label: "Case Simulators", desc: "Unfolding clinical scenarios mirroring real exam formats", icon: Zap },
  { slug: "tools", label: "Smart Tools", desc: "Career-specific interactive tools for deep concept mastery", icon: Wrench },
];

const COMPARISON_DATA = [
  { feature: "Question Rationale Depth", allied: "600+ words per question", generic: "1–2 sentence rationale" },
  { feature: "Exam Simulation", allied: "Adaptive CAT-style engine", generic: "Static linear exams" },
  { feature: "Weak-Area Targeting", allied: "Identifies & drills weak domains automatically", generic: "Random question order" },
  { feature: "Question Roadmap", allied: "4,000+ questions planned", generic: "Limited static bank" },
  { feature: "Blueprint Alignment", allied: "Mapped to official exam blueprint", generic: "Generic topic coverage" },
  { feature: "Study Plan", allied: "Personalized adaptive schedule", generic: "Self-directed only" },
  { feature: "Case Simulations", allied: "Unfolding clinical scenarios", generic: "Not available" },
  { feature: "Performance Analytics", allied: "Domain-level breakdown & trends", generic: "Basic score only" },
];

const GENERIC_FAQ_DATA = [
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
    a: "Our platform tracks your performance across every exam domain. It identifies where you're struggling and automatically prioritizes those topics in your study plan and practice sessions, so you spend time where it matters most."
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
    a: "Pro gives you unlimited access to the full question bank, unlimited mock exams, personalized study planner, case simulations, performance analytics, and all smart tools. Everything you need to pass your exam with confidence."
  },
];

export default function CareerLandingPage() {
  const params = useParams<{ careerSlug: string }>();
  const career = getCareerByRouteSlug(params.careerSlug || "");
  const { region, setRegion, getRegionConfig, regionLabel } = useRegion();
  const regionConfig = career ? getRegionConfig(career.slug) : null;
  const careerRoute = career ? getCanonicalRoute(career.slug) : "";
  const hubData = career ? getHubMarketingData(career.slug) : undefined;

  if (!career) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Not Found</h1>
        <p className="text-gray-600 mb-6">The career you're looking for doesn't exist.</p>
        <Link href="/careers" className="text-teal-600 font-medium hover:underline">Browse All Careers</Link>
      </div>
    );
  }

  const faqItems = hubData?.faq.map(f => ({ q: f.question, a: f.answer })) || GENERIC_FAQ_DATA;

  return (
    <div data-testid={`career-landing-${career.slug}`}>
      <AlliedSEO
        title={`${career.name} Exam Prep - QBank, Mock Exams & Study Tools`}
        description={`Prepare for your ${career.name} certification exam with practice questions, adaptive mock exams, flashcards, smart study tools, and a personalized study plan. Covers all ${career.examNames[0]} exam domains.`}
        keywords={`${career.name} exam prep, ${career.examNames[0]} exam, ${career.name} practice questions, ${career.name} mock exam, ${career.name} study guide, ${career.name} flashcards, ${career.name} certification`}
        canonicalPath={careerRoute}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": `${career.name} Certification Prep`,
          "description": `Prepare for your ${career.name} certification exam with practice questions, adaptive mock exams, flashcards, smart study tools, and a personalized study plan.`,
          "provider": {
            "@type": "Organization",
            "name": "NurseNest Allied",
            "url": "https://allied.nursenest.ca"
          }
        }}
        additionalStructuredData={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          },
        ]}
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
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: career.colorAccent, color: career.color }}>
                {regionConfig ? regionConfig.examBoard : career.examNames[0]} Prep
              </div>
              <div className="inline-flex items-center gap-1 bg-white/80 border border-gray-200 rounded-full px-1 py-0.5" data-testid="region-selector">
                <button
                  onClick={() => setRegion("US")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${region === "US" ? "bg-teal-100 text-teal-700" : "text-gray-500 hover:text-gray-700"}`}
                  data-testid="button-region-us"
                >
                  United States
                </button>
                <button
                  onClick={() => setRegion("CA")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${region === "CA" ? "bg-teal-100 text-teal-700" : "text-gray-500 hover:text-gray-700"}`}
                  data-testid="button-region-ca"
                >
                  Canada
                </button>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-career-title">
              {career.name} Exam Prep
            </h1>
            <p className="text-lg text-gray-600 mb-6" data-testid="text-career-description">
              {hubData?.careerOverview ? hubData.careerOverview.slice(0, 200) + "..." : career.description}
            </p>

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
              <Link href={`${careerRoute}/mock-exams`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200" data-testid="button-start-mock">
                Take a Mock Exam
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats Bar */}
      <section className="py-12 bg-white border-y border-gray-100" data-testid="section-platform-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-questions">
              <div className="text-2xl font-bold text-gray-900">{hubData?.platformStats.totalQuestions || "500+"}</div>
              <div className="text-sm text-gray-500">Practice Questions</div>
            </div>
            <div data-testid="stat-lessons">
              <div className="text-2xl font-bold text-gray-900">{hubData?.platformStats.totalLessons || "100+"}</div>
              <div className="text-sm text-gray-500">Lessons</div>
            </div>
            <div data-testid="stat-flashcards">
              <div className="text-2xl font-bold text-gray-900">{hubData?.platformStats.flashcardDecks || "40+"}</div>
              <div className="text-sm text-gray-500">Flashcard Decks</div>
            </div>
            <div data-testid="stat-mock-exams">
              <div className="text-2xl font-bold text-gray-900">{hubData?.platformStats.mockExams || "Unlimited"}</div>
              <div className="text-sm text-gray-500">Mock Exams</div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Overview */}
      {hubData && (
        <section className="py-16 bg-white" data-testid="section-career-overview">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">About the {career.shortName} Profession</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">{hubData.careerOverview}</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50/50 to-cyan-50/30 rounded-2xl border border-teal-100 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-500" />
                Why Choose a Career in {career.shortName}?
              </h3>
              <p className="text-gray-600 leading-relaxed">{hubData.whyChoose}</p>
            </div>
          </div>
        </section>
      )}

      {/* Free Content Preview — Lead Gen */}
      <section className="py-16 bg-gradient-to-b from-teal-50/40 to-white" data-testid="section-free-preview">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Try It Free — No Account Required</h2>
            <p className="text-gray-600">Experience the depth of NurseNest Allied {career.shortName} prep before you commit.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center" data-testid="preview-diagnostic">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">15-Question Diagnostic</h3>
              <p className="text-sm text-gray-500">See your readiness score across all {career.shortName} domains</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center" data-testid="preview-questions">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">5 Practice Questions</h3>
              <p className="text-sm text-gray-500">Experience our 600+ word clinical rationales</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center" data-testid="preview-mock">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">1 Free Mock Exam</h3>
              <p className="text-sm text-gray-500">Take a full-length timed mock to experience the format</p>
            </div>
          </div>
          <div className="text-center">
            <Link href={`/diagnostic?career=${career.slug}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200" data-testid="button-free-preview-cta">
              Start Free Diagnostic <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-3">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Study Features */}
      <section className="py-16" data-testid="section-study-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Study Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <Link key={f.slug} href={f.slug === "qbank" ? `/qbank?career=${career.slug}` : `${careerRoute}/${f.slug}`} className="group" data-testid={`card-feature-${f.slug}`}>
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

      {/* Licensing Pathway */}
      {hubData && (
        <section className="py-16 bg-gray-50" data-testid="section-licensing-pathway">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">How to Become a {career.shortName}</h2>
              <p className="text-gray-600">Follow the licensing pathway to earn your {career.examNames[0]} certification</p>
            </div>
            <div className="space-y-4">
              {hubData.licensingPathway.map((step) => (
                <div key={step.step} className="flex gap-4 items-start" data-testid={`licensing-step-${step.step}`}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Career Information: Salary, Job Outlook, Benefits */}
      {hubData && (
        <section className="py-16 bg-white" data-testid="section-career-info">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{career.shortName} Career Information</h2>
              <p className="text-gray-600">Salary data, job outlook, and career benefits</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Salary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6" data-testid="card-salary">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-teal-500" />
                  Salary Range
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Entry Level</span>
                    <span className="font-semibold text-gray-900">{hubData.salary.entry}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Median</span>
                    <span className="font-bold text-teal-700 text-lg">{hubData.salary.median}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Experienced</span>
                    <span className="font-semibold text-gray-900">{hubData.salary.experienced}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">{hubData.salary.source}</p>
              </div>

              {/* Job Outlook */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6" data-testid="card-job-outlook">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  Job Outlook
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="font-bold text-teal-700 text-lg">{hubData.jobOutlook.growthRate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Period</span>
                    <span className="font-semibold text-gray-900">{hubData.jobOutlook.growthPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Openings/Year</span>
                    <span className="font-semibold text-gray-900">{hubData.jobOutlook.openingsPerYear}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Demand Level</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">{hubData.jobOutlook.demandLevel}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">{hubData.jobOutlook.source}</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="career-benefits">
              {hubData.benefits.map((benefit, i) => (
                <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl" data-testid={`benefit-${i}`}>
                  <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 mt-0.5">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Day in the Life */}
      {hubData && (
        <section className="py-16 bg-gradient-to-b from-teal-50/30 to-white" data-testid="section-day-in-life">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{hubData.dayInTheLife.title}</h2>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-6">
              <p className="text-gray-600 leading-relaxed" data-testid="text-day-narrative">{hubData.dayInTheLife.narrative}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hubData.dayInTheLife.typicalTasks.map((task, i) => (
                <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 bg-white rounded-lg border border-gray-100" data-testid={`task-${i}`}>
                  <Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Resources (cross-platform internal links) */}
      {(() => {
        const crossLinks = getCrossPlatformLinksForCareer(career.slug);
        if (crossLinks.length === 0) return null;
        const lessonLinks = crossLinks.filter(l => l.type === "career-to-lesson");
        const newGradLinks = crossLinks.filter(l => l.type === "career-to-newgrad");
        return (
          <section className="py-16 bg-white" data-testid="section-related-resources">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Related Resources</h2>
                <p className="text-gray-600">Deepen your understanding with clinical lessons and career transition guides from across the NurseNest ecosystem.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lessonLinks.length > 0 && (
                  <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6" data-testid="cross-links-lessons">
                    <div className="flex items-center gap-2 mb-4">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">Clinical Lessons</h3>
                    </div>
                    <div className="space-y-2">
                      {lessonLinks.map((link, i) => (
                        <Link
                          key={i}
                          href={link.target}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all group"
                          data-testid={`link-cross-lesson-${i}`}
                        >
                          <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 block truncate">{link.anchor}</span>
                            <span className="text-xs text-gray-400">{link.reason}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {newGradLinks.length > 0 && (
                  <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6" data-testid="cross-links-newgrad">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-semibold text-gray-900">Career Transition</h3>
                    </div>
                    <div className="space-y-2">
                      {newGradLinks.map((link, i) => (
                        <Link
                          key={i}
                          href={link.target}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white border border-indigo-100 hover:border-indigo-300 hover:shadow-sm transition-all group"
                          data-testid={`link-cross-newgrad-${i}`}
                        >
                          <GraduationCap className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 block truncate">{link.anchor}</span>
                            <span className="text-xs text-gray-400">{link.reason}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

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
      <section className="py-16 bg-gradient-to-b from-teal-50/30 to-white" data-testid="section-domains">
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

      {/* Exam Prep Tips */}
      {hubData && (
        <section className="py-16 bg-white" data-testid="section-exam-tips">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{career.shortName} Exam Preparation Tips</h2>
              <p className="text-gray-600">Expert strategies to maximize your study time and pass on your first attempt</p>
            </div>
            <div className="space-y-4">
              {hubData.examPrepTips.map((tip, i) => (
                <div key={i} className="flex gap-4 items-start bg-gray-50 rounded-xl p-5" data-testid={`exam-tip-${i}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {regionConfig && (
        <section className="py-16 bg-white" data-testid="section-region-info">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{regionLabel} Exam Track</h2>
              <p className="text-gray-600">Your exam prep is configured for the {regionConfig.examBoard} ({regionConfig.examName})</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center px-4 py-4 bg-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-teal-700">{regionConfig.totalQuestions}</div>
                <div className="text-sm text-gray-600">Exam Questions</div>
              </div>
              <div className="text-center px-4 py-4 bg-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-teal-700">{regionConfig.timeLimit} min</div>
                <div className="text-sm text-gray-600">Time Limit</div>
              </div>
              <div className="text-center px-4 py-4 bg-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-teal-700">{regionConfig.passThreshold}%</div>
                <div className="text-sm text-gray-600">Pass Threshold</div>
              </div>
              <div className="text-center px-4 py-4 bg-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-teal-700">{region === "US" ? "mg/dL" : "mmol/L"}</div>
                <div className="text-sm text-gray-600">Lab Units</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-500" />
                {regionLabel} Legal & Regulatory Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {regionConfig.legalModules.slice(0, 8).map(mod => (
                  <div key={mod.id} className="px-3 py-2 bg-white rounded-lg border border-gray-100">
                    <div className="text-sm font-medium text-gray-800">{mod.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{mod.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-500" />
                {regionConfig.examBoard} Blueprint Weights
              </h3>
              <div className="space-y-3">
                {Object.entries(regionConfig.blueprintWeights).map(([domain, weight]) => (
                  <div key={domain}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{domain}</span>
                      <span className="font-medium text-teal-700">{weight}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div className="h-2 rounded-full bg-teal-500" style={{ width: `${weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Smart Study Tools */}
      {career.aiTools.length > 0 && (
        <section className="py-16 bg-white" data-testid="section-smart-tools">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Smart Study Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {career.aiTools.map(tool => (
                <Link key={tool.id} href={`${careerRoute}/tools`} className="group" data-testid={`card-tool-${tool.id}`}>
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

      {/* Instructor Bios */}
      {hubData && hubData.instructors.length > 0 && (
        <section className="py-16 bg-gray-50" data-testid="section-instructors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Built by Experts</h2>
              <p className="text-gray-600">Our content is created and reviewed by credentialed {career.shortName} professionals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hubData.instructors.map((instructor, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6" data-testid={`instructor-${i}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: career.color }}>
                      {instructor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{instructor.name}</h3>
                      <p className="text-xs text-teal-600 font-medium mt-0.5">{instructor.credentials}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{instructor.specialty}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 leading-relaxed">{instructor.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {hubData && hubData.testimonials.length > 0 && (
        <section className="py-16 bg-white" data-testid="section-testimonials">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">What {career.shortName} Students Are Saying</h2>
              <p className="text-gray-600">Real feedback from learners preparing for their {career.examNames[0]} exam</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hubData.testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow" data-testid={`hub-testimonial-${i}`}>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 italic text-sm">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mid-Page CTA */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-teal-700" data-testid="section-mid-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Start practicing now — create your free account</h2>
          <p className="text-teal-100 mb-6">Get instant access to practice questions, a diagnostic assessment, and a sample mock exam.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/diagnostic?career=${career.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-xl font-bold hover:bg-teal-50 transition-colors shadow-lg" data-testid="button-mid-cta-diagnostic">
              Start Free Diagnostic <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-colors border border-teal-400" data-testid="button-mid-cta-register">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Mini-Section */}
      <section className="py-16 bg-gradient-to-b from-white to-teal-50/40" data-testid="section-pricing">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Start free. Upgrade when you're ready to go all-in on exam prep.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  <span>All smart tools & analytics</span>
                </li>
              </ul>
              <Link href="/pricing" className="block w-full text-center px-4 py-2.5 bg-teal-100 text-teal-700 rounded-xl font-medium hover:bg-teal-200 transition-colors" data-testid="button-pricing-monthly">
                Get Monthly Access
              </Link>
            </div>

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
            {faqItems.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-700" data-testid="section-final-cta">
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
            <Link href={`${careerRoute}/mock-exams`} className="hover:text-white transition-colors" data-testid="link-footer-mocks">Mock Exams →</Link>
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
        {open ? (
          <ChevronUp className="w-5 h-5 flex-shrink-0 text-teal-500" />
        ) : (
          <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>
          {answer}
        </div>
      )}
    </div>
  );
}
