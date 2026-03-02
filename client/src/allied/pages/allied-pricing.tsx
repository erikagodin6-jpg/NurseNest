import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Star, Zap, ArrowRight, Lock, XCircle, Shield, BookOpen, Brain, Target, TrendingUp, Award } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    badge: null,
    description: "Try before you commit",
    features: [
      "5 practice questions per career",
      "1 mini mock exam (25 questions)",
      "15-question diagnostic assessment",
      "1 demo flashcard deck",
      "Career landing pages + blueprint overview",
    ],
    limitations: [
      "Limited rationale previews",
      "No adaptive exams",
      "No analytics dashboard",
      "No AI study tools",
    ],
    cta: "Start Free",
    highlight: false,
    stripePlan: null,
  },
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: "$29",
    period: "/month",
    badge: null,
    description: "Full access, cancel anytime",
    features: [
      "Unlimited questions (all careers)",
      "Full 600+ word rationales",
      "Unlimited mock exams + adaptive CAT",
      "Full flashcard decks + spaced repetition",
      "AI study planner",
      "Case simulators",
      "AI-powered career tools",
      "Progress dashboard + readiness predictor",
      "Weak area analyzer + targeted drills",
      "Rapid drill mode",
    ],
    limitations: [],
    cta: "Start Pro Monthly",
    highlight: false,
    stripePlan: "monthly",
  },
  {
    id: "pro-annual",
    name: "Pro Annual",
    price: "$239",
    period: "/year",
    badge: "Best Value",
    description: "Save 31% vs monthly",
    features: [
      "Everything in Pro Monthly",
      "Save $109 vs monthly billing",
      "Priority access to new careers",
      "Printable cram bundles",
      "Email study reminders",
      "Early access to new question batches",
    ],
    limitations: [],
    cta: "Start Annual & Save",
    highlight: true,
    stripePlan: "annual",
  },
];

const COMPARISON = [
  { feature: "Questions with 600+ word rationales", allied: true, generic: false },
  { feature: "Adaptive CAT-style simulation", allied: true, generic: false },
  { feature: "Blueprint-weighted mock exams", allied: true, generic: false },
  { feature: "Weak area detection + targeted drills", allied: true, generic: false },
  { feature: "AI study planner", allied: true, generic: false },
  { feature: "Case simulators with debrief", allied: true, generic: false },
  { feature: "Readiness predictor with trend tracking", allied: true, generic: false },
  { feature: "Spaced repetition flashcards", allied: true, generic: false },
  { feature: "Career-specific AI tools", allied: true, generic: false },
  { feature: "4,000+ question roadmap per career", allied: true, generic: false },
  { feature: "Basic practice questions", allied: true, generic: true },
  { feature: "Short answer explanations", allied: true, generic: true },
];

export default function AlliedPricingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planType: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to subscribe.", variant: "destructive" });
      return;
    }
    setLoading(planType);
    try {
      const res = await apiRequest("POST", "/api/allied/checkout", { planType, userId: user.id });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({ title: "Checkout unavailable", description: data.message || "Please try again later.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not start checkout. Please try again.", variant: "destructive" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12" data-testid="allied-pricing-page">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-teal-100/80 text-teal-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Star className="w-4 h-4" />
          Allied Health Exam Prep
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" data-testid="text-pricing-title">
          Invest in Your Career
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          One subscription covers all allied health careers. Study for RRT, Paramedic, Pharmacy Tech, MLT, and Imaging exams with professional-grade tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl border-2 p-6 sm:p-8 flex flex-col ${
              plan.highlight
                ? "border-teal-400 shadow-xl shadow-teal-100/50 relative scale-[1.02]"
                : "border-gray-100"
            }`}
            data-testid={`plan-card-${plan.id}`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                {plan.badge}
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
              </div>
              {plan.id === "pro-annual" && (
                <div className="mt-2 text-sm text-teal-600 font-medium">
                  That's just $19.92/month
                </div>
              )}
            </div>
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
              {plan.limitations.map(limitation => (
                <li key={limitation} className="flex items-start gap-2 text-sm text-gray-400">
                  <XCircle className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                  {limitation}
                </li>
              ))}
            </ul>
            {plan.id === "free" ? (
              <Link
                href="/careers"
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors text-center block"
                data-testid={`button-${plan.id}`}
              >
                {plan.cta}
              </Link>
            ) : (
              <button
                onClick={() => plan.stripePlan && handleCheckout(plan.stripePlan)}
                disabled={loading === plan.stripePlan}
                className={`w-full px-6 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-200"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                }`}
                data-testid={`button-${plan.id}`}
              >
                {loading === plan.stripePlan ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> {plan.cta} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">NurseNest Allied vs Generic Question Banks</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 px-6 py-3">
            <div className="text-sm font-semibold text-gray-700">Feature</div>
            <div className="text-sm font-semibold text-teal-700 text-center">NurseNest Allied</div>
            <div className="text-sm font-semibold text-gray-500 text-center">Generic Banks</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-3 px-6 py-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`} data-testid={`comparison-row-${i}`}>
              <div className="text-sm text-gray-700">{row.feature}</div>
              <div className="flex justify-center">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
              </div>
              <div className="flex justify-center">
                {row.generic ? <CheckCircle2 className="w-5 h-5 text-gray-300" /> : <XCircle className="w-5 h-5 text-gray-300" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Why Professionals Choose NurseNest Allied</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: BookOpen, label: "600+ Word Rationales", desc: "Every question includes step-by-step clinical reasoning" },
            { icon: Target, label: "Adaptive CAT Engine", desc: "Simulates real exam difficulty adjustment" },
            { icon: TrendingUp, label: "Readiness Predictor", desc: "Know exactly when you're exam-ready" },
            { icon: Brain, label: "AI Study Tools", desc: "Career-specific simulators and planners" },
          ].map(item => (
            <div key={item.label} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border border-teal-100 text-center" data-testid={`value-prop-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <item.icon className="w-7 h-7 text-teal-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.label}</h3>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Can I switch between careers?", a: "Yes, one subscription gives you full access to all allied health careers. Study for multiple certifications simultaneously." },
            { q: "What makes your rationales different?", a: "Every question includes a minimum 600-word rationale with step-by-step reasoning, distractor analysis, exam trap explanations, clinical pearls, and safety reinforcement. No other platform provides this depth." },
            { q: "How does the adaptive exam work?", a: "Our CAT-style engine starts at medium difficulty and adjusts based on your performance, similar to real certification exams. It tracks blueprint coverage and avoids repeating recent questions." },
            { q: "Is there a money-back guarantee?", a: "We offer a 7-day satisfaction guarantee. If you're not happy, contact us for a full refund." },
            { q: "Are these real exam questions?", a: "All questions are original, exam-authentic items aligned to published exam blueprints. We do not reproduce copyrighted exam content." },
            { q: "How often is content updated?", a: "New questions, case sims, and flashcards are added weekly. Blueprint weightings are updated as exam specifications change. We're targeting 4,000+ questions per career." },
          ].map(faq => (
            <div key={faq.q} className="bg-white rounded-xl p-4 border border-gray-100" data-testid={`faq-${faq.q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}>
              <h3 className="font-medium text-gray-900 mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
