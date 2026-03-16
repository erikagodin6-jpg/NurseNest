import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PremiumUpgradeCTA, useNewGradAccess } from "./premium-cta";
import {
  ChevronRight, ArrowRight, DollarSign, Lock, CheckCircle2,
  TrendingUp, Sparkles
} from "lucide-react";

const FREE_SALARY_TIPS = [
  { title: "Research Before You Negotiate", desc: "Use Glassdoor, Bureau of Labor Statistics, and nursing salary surveys to understand market rates for your area, specialty, and experience level." },
  { title: "Know Your Total Compensation", desc: "Base salary is just one component. Consider shift differentials, overtime rates, sign-on bonuses, tuition reimbursement, retirement matching, and health insurance." },
  { title: "Never Accept the First Offer", desc: "Most hospitals have negotiation room, especially for shift differentials, sign-on bonuses, and benefits. A polite counter-offer is expected and professional." },
  { title: "Time Your Negotiation Right", desc: "The best time to negotiate is after receiving a written offer but before signing. You have the most leverage when they've chosen you but haven't finalized paperwork." },
  { title: "Practice Your Script", desc: "Prepare and rehearse your negotiation talking points. Confidence comes from preparation. Practice with a friend or mentor before the real conversation." },
  { title: "Get Everything in Writing", desc: "Verbal promises about raises, schedule preferences, or unit transfers mean nothing. Get all negotiated terms documented in your offer letter." },
];

const SALARY_RANGES = [
  { specialty: "Med-Surg", range: "$55,000 - $72,000", notes: "Most common starting specialty" },
  { specialty: "ICU", range: "$60,000 - $80,000", notes: "Higher due to acuity premium" },
  { specialty: "Emergency", range: "$58,000 - $78,000", notes: "Includes shift differentials" },
  { specialty: "Labor & Delivery", range: "$58,000 - $76,000", notes: "Specialty premium varies" },
  { specialty: "Pediatrics", range: "$55,000 - $73,000", notes: "Competitive market" },
  { specialty: "Home Health", range: "$52,000 - $68,000", notes: "Flexible scheduling benefit" },
];

export default function SalaryPage() {
  const { hasAccess } = useNewGradAccess();

  return (
    <div data-testid="newgrad-salary-page">
      <Navigation />
      <SEO
        title="New Grad Nurse Salary & Negotiation Guide | NurseNest"
        description="Know your worth as a new graduate nurse. Salary ranges by specialty, negotiation strategies, and total compensation guides to maximize your first nursing salary."
        keywords="new grad nurse salary, nursing salary negotiation, new nurse pay, nursing salary by specialty, nurse compensation, nursing benefits negotiation"
        canonicalPath="/newgrad/salary"
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
          { name: "Salary & Negotiation", url: "https://www.nursenest.ca/newgrad/salary" },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/30 to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad" className="hover:text-blue-600">New Grad Career Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-green-700 font-medium">Salary & Negotiation</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-green-100 text-green-700">
            <DollarSign className="w-4 h-4" /> Salary & Negotiation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            New Grad Nurse Salary & Negotiation Guide
          </h1>
          <p className="text-lg text-gray-600">
            Know your worth and negotiate confidently. Data-driven salary ranges, negotiation strategies, and total compensation guides.
          </p>
        </div>
      </section>

      <section className="py-16" data-testid="section-salary-ranges">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">New Grad Salary Ranges by Specialty</h2>
          <p className="text-gray-600 mb-6">These ranges represent typical starting salaries for new graduate nurses in the United States. Actual salaries vary significantly by region, facility type, and market conditions.</p>
          <div className="space-y-3">
            {SALARY_RANGES.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between" data-testid={`salary-range-${i}`}>
                <div>
                  <h3 className="font-semibold text-gray-900">{s.specialty}</h3>
                  <p className="text-xs text-gray-500">{s.notes}</p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-bold text-green-700">{s.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-free-tips">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Free Negotiation Tips</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FREE_SALARY_TIPS.map((tip, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5" data-testid={`tip-${i}`}>
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-500">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!hasAccess && (
        <section className="py-16" data-testid="section-premium-preview">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-900">Premium Negotiation Strategies</h2>
            </div>
            <div className="space-y-3 mb-6">
              {[
                "Word-for-word negotiation scripts for salary, sign-on bonus, and benefits",
                "Compensation comparison spreadsheet template",
                "Counter-offer letter templates with healthcare-specific language",
                "Regional salary data with cost-of-living adjustments",
                "Benefits evaluation checklist (health insurance, retirement, PTO analysis)",
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 opacity-60" data-testid={`preview-strategy-${i}`}>
                  <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
            <PremiumUpgradeCTA requiredEntitlement="toolkit" context="Unlock negotiation scripts, salary comparison tools, counter-offer templates, and regional salary data to maximize your compensation." />
          </div>
        </section>
      )}

      <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Complete Your Career Toolkit</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/newgrad/resume" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors border border-green-200" data-testid="link-resume">
              Resume Tools
            </Link>
            <Link href="/newgrad/interview" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors border border-green-200" data-testid="link-interview">
              Interview Prep
            </Link>
            <Link href="/newgrad/certifications" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors border border-green-200" data-testid="link-certifications">
              Certifications
            </Link>
            <Link href="/newgrad/clinical-references" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors border border-green-200" data-testid="link-clinical-refs">
              Clinical References
            </Link>
            <Link href="/newgrad" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors" data-testid="link-hub">
              Career Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
