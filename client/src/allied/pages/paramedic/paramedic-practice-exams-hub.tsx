import { Link } from "wouter";
import { AlliedSEO } from "@/allied/allied-seo";
import { HubHero, FinalCTASection } from "./components";
import {
  FileText, CheckCircle2, ArrowRight, Target, TrendingUp,
  Clock, Brain, BarChart3, Shield
} from "lucide-react";

export default function ParamedicPracticeExamsHub() {
  return (
    <div data-testid="paramedic-practice-exams-hub">
      <AlliedSEO
        title="Paramedic Practice Exams — Full-Length Timed Mock Tests | NurseNest"
        description="Take full-length, blueprint-weighted paramedic practice exams with adaptive difficulty. Get detailed domain-level performance analytics and readiness scoring."
        keywords="paramedic practice exam, paramedic mock test, NREMT practice exam, paramedic certification test, full length paramedic exam, paramedic readiness test"
        canonicalPath="/allied-health/paramedic/practice-exams"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Paramedic Practice Exams",
          "description": "Full-length, timed paramedic practice exams that replicate the real certification testing experience with blueprint weighting and adaptive difficulty.",
          "provider": { "@type": "Organization", "name": "NurseNest Allied", "url": "https://www.nursenest.ca/allied-health" }
        }}
      />

      <HubHero
        title="Paramedic Practice Exams"
        subtitle="Full-length, timed practice exams that replicate the real certification testing experience. Blueprint-weighted, adaptive, and analyzed down to the domain level."
        breadcrumbs={[
          { label: "Paramedic", href: "/allied-health/paramedic" },
          { label: "Practice Exams" },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white" data-testid="section-how-it-works">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How Practice Exams Work</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Our mock exams are designed to simulate the real certification testing experience so nothing surprises you on exam day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Timed & Realistic</h3>
              <p className="text-sm text-gray-500">Each exam runs under timed conditions matching your certification format. Experience the same time pressure as the real test.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Blueprint-Weighted</h3>
              <p className="text-sm text-gray-500">Questions are distributed across domains according to the official exam blueprint — trauma, cardiac, medical, operations, and more.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
              <p className="text-sm text-gray-500">After each exam, see your score breakdown by domain, difficulty trends, time analysis, and a personalized readiness prediction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-purple-50/30 to-white" data-testid="section-exam-types">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Available Exam Formats</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6" data-testid="card-exam-full">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-teal-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Full-Length Mock Exam</h3>
                  <span className="text-xs text-gray-400">Free (1 attempt) · Unlimited with Pro</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">Complete exam simulation with all domains represented. Adaptive difficulty that adjusts based on your performance.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Blueprint-weighted domain distribution
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Timed to match real exam conditions
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Detailed results with domain breakdown
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Readiness prediction score
                </li>
              </ul>
              <Link href="/allied-health/paramedic/exam-launcher" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors" data-testid="button-take-mock">
                Take Mock Exam <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6" data-testid="card-exam-domain">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-purple-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Domain-Specific Practice Sets</h3>
                  <span className="text-xs text-gray-400">Pro members only</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">Focused practice sets targeting individual domains. Perfect for drilling weak areas identified by your diagnostic or mock exam results.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Choose from 10 clinical domains
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Adjustable question count and difficulty
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Full rationales after each set
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Performance tracking over time
                </li>
              </ul>
              <Link href="/allied-health/paramedic/exams" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors" data-testid="button-browse-sets">
                Browse Practice Sets <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white" data-testid="section-after-exam">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Happens After Your Practice Exam</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: "Domain Breakdown", desc: "See your score for each clinical domain — identify exactly where to focus." },
              { icon: TrendingUp, title: "Readiness Score", desc: "A predictive score based on accuracy, difficulty mastery, and coverage." },
              { icon: Target, title: "Weak Area Report", desc: "Auto-generated list of your lowest-performing topics with recommended drills." },
              { icon: Brain, title: "Study Plan Update", desc: "Your personalized study plan recalibrates based on your exam results." },
            ].map(item => (
              <div key={item.title} className="text-center">
                <item.icon className="w-8 h-8 text-teal-500 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection
        title="Take Your First Practice Exam"
        subtitle="See where you stand with a free mock exam, then use your results to build a targeted study plan for exam day."
        primaryCTA={{ label: "Start Free Mock Exam", href: "/allied-health/paramedic/exam-launcher" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
