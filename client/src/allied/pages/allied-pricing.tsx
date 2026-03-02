import { Link } from "wouter";
import { CheckCircle2, Star, Zap, ArrowRight, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    description: "Try before you commit",
    features: [
      "25 practice questions per career",
      "1 mini mock exam per career",
      "Limited flashcards",
      "Career landing pages",
      "Blueprint overview",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: "$29",
    period: "/month",
    description: "Full access, cancel anytime",
    features: [
      "Unlimited questions (all careers)",
      "Unlimited mock exams + adaptive mode",
      "Full flashcard decks + spaced repetition",
      "AI study planner",
      "Case simulators",
      "AI-powered career tools",
      "Progress dashboard + readiness predictor",
      "Weak area analyzer + targeted drills",
      "Rapid drill mode",
    ],
    cta: "Start Pro",
    highlight: true,
  },
  {
    id: "pro-annual",
    name: "Pro Annual",
    price: "$199",
    period: "/year",
    description: "Best value - save 43%",
    features: [
      "Everything in Pro Monthly",
      "Save $149 vs monthly billing",
      "Priority access to new careers",
      "Printable cram bundles",
      "Email study reminders",
    ],
    cta: "Start Annual",
    highlight: false,
  },
];

export default function AlliedPricingPage() {
  const { user } = useAuth();

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
          One subscription covers all 5 allied health careers. Study for RRT, Paramedic, Pharmacy Tech, MLT, and Imaging exams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl border-2 p-6 sm:p-8 flex flex-col ${
              plan.highlight
                ? "border-teal-400 shadow-lg shadow-teal-100 relative"
                : "border-gray-100"
            }`}
            data-testid={`plan-card-${plan.id}`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  {feature}
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
                className={`w-full px-6 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  plan.highlight
                    ? "bg-teal-600 text-white hover:bg-teal-700 shadow-md"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                }`}
                data-testid={`button-${plan.id}`}
              >
                <Zap className="w-4 h-4" /> {plan.cta} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6">All Plans Include</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {["5 Career Verticals", "Exam-Authentic Questions", "Blueprint-Weighted Exams", "Detailed Rationales", "Progress Tracking", "Readiness Predictor", "Mobile Friendly", "Cancel Anytime"].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2" data-testid={`feature-${item.toLowerCase().replace(/\s+/g, "-")}`}>
              <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Can I switch between careers?", a: "Yes, one subscription gives you full access to all 5 allied health careers. Study for multiple certifications simultaneously." },
            { q: "Is there a money-back guarantee?", a: "We offer a 7-day satisfaction guarantee. If you're not happy, contact us for a full refund." },
            { q: "Are these real exam questions?", a: "All questions are original, exam-authentic items aligned to published exam blueprints. We do not reproduce copyrighted exam content." },
            { q: "How often is content updated?", a: "New questions, case sims, and flashcards are added regularly. Blueprint weightings are updated as exam specifications change." },
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
