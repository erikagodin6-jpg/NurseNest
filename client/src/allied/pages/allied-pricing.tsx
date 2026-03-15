import { useState } from "react";
import { CheckCircle2, Star, Zap, ArrowRight, Shield, Clock, CreditCard, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AlliedSEO } from "@/allied/allied-seo";
import { pricingConfig, durationLabels, durationMonths, type DurationKey } from "@shared/pricing-config";

const ALLIED_FEATURES = [
  "Question Bank with detailed rationales",
  "Flashcards with spaced repetition",
  "Clinical Lessons library",
  "Performance Analytics dashboard",
  "Adaptive mock exams",
  "Exam simulations",
];

const DURATION_ORDER: DurationKey[] = ["monthly", "3-month", "6-month", "yearly"];

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function getMonthlyEquivalent(cents: number, duration: DurationKey): string {
  const months = durationMonths[duration];
  if (months === 1) return "";
  const monthly = cents / months;
  return `$${(monthly / 100).toFixed(2)}/mo`;
}

function getSavingsPercent(duration: DurationKey): string | null {
  const monthly = pricingConfig.allied.cad.monthly;
  const totalMonths = durationMonths[duration];
  if (totalMonths === 1) return null;
  const fullPrice = monthly * totalMonths;
  const discountedPrice = pricingConfig.allied.cad[duration];
  const percent = Math.round(((fullPrice - discountedPrice) / fullPrice) * 100);
  return percent > 0 ? `Save ${percent}%` : null;
}

export default function AlliedPricingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (duration: DurationKey) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to subscribe.", variant: "destructive" });
      return;
    }
    setLoading(duration);
    try {
      const res = await apiRequest("POST", "/api/allied/checkout", { planType: duration, userId: user.id });
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
      <AlliedSEO
        title="Allied Health Plans - Exam Prep Pricing"
        description="Choose your Allied Health exam prep plan. Access exam-style questions, flashcards, lessons, and performance tools. Plans start at $14.99 CAD/month."
        keywords="allied health exam prep pricing, healthcare certification cost, RRT exam prep price, paramedic exam prep price, pharmacy tech exam prep price"
        canonicalPath="/pricing"
      />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-teal-100/80 text-teal-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Star className="w-4 h-4" />
          Allied Health Exam Prep
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" data-testid="text-pricing-title">
          Allied Health Plans
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
          Get full access to exam-style questions, flashcards, clinical lessons, and performance tools to prepare for your allied health certification.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {DURATION_ORDER.map((duration) => {
          const price = pricingConfig.allied.cad[duration];
          const label = durationLabels[duration];
          const isPopular = duration === "6-month";
          const monthlyEquiv = getMonthlyEquivalent(price, duration);
          const savings = getSavingsPercent(duration);

          return (
            <div
              key={duration}
              className={`bg-white rounded-2xl border-2 p-6 flex flex-col relative ${
                isPopular
                  ? "border-teal-400 shadow-xl shadow-teal-100/50 scale-[1.02]"
                  : "border-gray-100"
              }`}
              data-testid={`plan-card-${duration}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold rounded-full whitespace-nowrap" data-testid="badge-most-popular">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1" data-testid={`text-plan-name-${duration}`}>{label}</h3>
                {savings && (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold rounded-full px-2.5 py-0.5 mb-2" data-testid={`badge-savings-${duration}`}>
                    {savings}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900" data-testid={`text-price-${duration}`}>{formatPrice(price)}</span>
                  <span className="text-gray-500 text-sm">CAD</span>
                </div>
                {monthlyEquiv && (
                  <div className="mt-1 text-sm text-teal-600 font-medium" data-testid={`text-monthly-equiv-${duration}`}>
                    {monthlyEquiv}
                  </div>
                )}
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {ALLIED_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(duration)}
                disabled={loading === duration}
                className={`w-full px-6 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 ${
                  isPopular
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-200"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                }`}
                data-testid={`button-checkout-${duration}`}
              >
                {loading === duration ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Get Started <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5" data-testid="text-cad-notice">
            <CreditCard className="w-4 h-4" /> Prices shown in CAD
          </span>
          <span className="flex items-center gap-1.5" data-testid="text-instant-access">
            <Sparkles className="w-4 h-4" /> Instant access after payment
          </span>
          <span className="flex items-center gap-1.5" data-testid="text-no-contracts">
            <Clock className="w-4 h-4" /> No contracts, Cancel anytime
          </span>
          <span className="flex items-center gap-1.5" data-testid="text-guarantee">
            <Shield className="w-4 h-4" /> 30-Day Pass Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}
