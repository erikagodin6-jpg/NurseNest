import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect } from "react";
import { getExamConstants, getCurrency, type Region as ConstRegion } from "@shared/constants";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { SEO } from "@/components/seo";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, HelpCircle, Star, Clock, X, CreditCard, Calculator, Beaker, Zap, Award, Trophy, ArrowLeft, Crown, Sparkles, Mail, Loader2 } from "lucide-react";
import { useTrialStatus } from "@/hooks/use-trial-status";
import { useToast } from "@/hooks/use-toast";
import PayPalButton from "@/components/PayPalButton";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

type PricingPlan = {
  id: string;
  tier: string;
  duration: string;
  isLifetime: boolean;
  priceCad: number;
  priceUsd: number;
  isEnabled: boolean;
  isPopular: boolean;
  isFoundingPrice: boolean;
  featureList: string[];
  displayOrder: number;
};

const FREE_TRIAL_LIMITS = { questions: 50, flashcards: 20, catExams: 1 };

const tierDisplayInfo: Record<string, { nameCA: string; nameUS: string; description: string; icon: any; color: string; bgColor: string }> = {
  rpn: { nameCA: "RPN", nameUS: "LVN", description: "Practical nursing exam preparation", icon: Shield, color: "text-blue-600", bgColor: "bg-blue-50 border-blue-200" },
  rn: { nameCA: "RN", nameUS: "RN/NCLEX", description: "Registered nursing exam preparation", icon: Award, color: "text-purple-600", bgColor: "bg-purple-50 border-purple-200" },
  np: { nameCA: "NP", nameUS: "NP", description: "Nurse practitioner board preparation", icon: Trophy, color: "text-amber-600", bgColor: "bg-amber-50 border-amber-200" },
  allied: { nameCA: "Allied Health", nameUS: "Allied Health", description: "Allied health professional certification prep", icon: Sparkles, color: "text-teal-600", bgColor: "bg-teal-50 border-teal-200" },
};

const durationLabels: Record<string, string> = {
  monthly: "1 Month",
  "3-month": "3 Months",
  "6-month": "6 Months",
  yearly: "12 Months",
  lifetime: "Lifetime",
};

const durationMonths: Record<string, number> = {
  monthly: 1,
  "3-month": 3,
  "6-month": 6,
  yearly: 12,
};

let stripePromise: ReturnType<typeof loadStripe> | null = null;
function getStripePromise() {
  if (!stripePromise) {
    stripePromise = fetch("/api/stripe/publishable-key")
      .then((r) => r.json())
      .then((data) => loadStripe(data.publishableKey))
      .catch(() => null);
  }
  return stripePromise;
}

function TrialCardForm({
  selectedTier,
  onSuccess,
  onBack,
}: {
  selectedTier: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [activating, setActivating] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleSubmit() {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setActivating(true);
    setCardError(null);
    try {
      const res = await fetch("/api/trial-sub/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("nursenest-user-token") || ""}`,
        },
        body: JSON.stringify({ selectedTier }),
      });
      if (!res.ok) {
        const err = await res.json();
        toast({ title: "Trial Activation Failed", description: err.error || "Could not start trial", variant: "destructive" });
        return;
      }
      const data = await res.json();
      if (data.setupIntentClientSecret) {
        const { error } = await stripe.confirmCardSetup(data.setupIntentClientSecret, {
          payment_method: { card: cardElement },
        });
        if (error) {
          setCardError(error.message || "Card verification failed");
          return;
        }
        const confirmRes = await fetch("/api/trial-sub/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("nursenest-user-token") || ""}`,
          },
          body: JSON.stringify({ setupIntentId: data.setupIntentClientSecret.split("_secret_")[0] }),
        });
        if (!confirmRes.ok) {
          const confirmErr = await confirmRes.json().catch(() => ({ error: "Confirmation failed" }));
          setCardError(confirmErr.error || "Trial confirmation failed. Please try again.");
          return;
        }
      }
      toast({ title: "Trial Activated!", description: "Your 24-hour free trial has started." });
      onSuccess();
    } catch {
      toast({ title: "Error", description: "Failed to activate trial", variant: "destructive" });
    } finally {
      setActivating(false);
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-5 h-5 text-amber-600" />
          <p className="text-sm font-semibold text-amber-800">Add Payment Method</p>
        </div>
        <p className="text-xs text-amber-700 mb-1">A valid card is required to start your free trial. You won't be charged during the trial period.</p>
        <p className="text-xs text-amber-600">After 24 hours, your subscription begins at the regular price. Cancel anytime before renewal.</p>
      </div>
      <div className="p-3 border rounded-lg bg-white" data-testid="container-stripe-card">
        <CardElement
          options={{
            style: {
              base: { fontSize: "16px", color: "#1f2937", "::placeholder": { color: "#9ca3af" } },
              invalid: { color: "#ef4444" },
            },
          }}
        />
      </div>
      {cardError && (
        <p className="text-sm text-red-600" data-testid="text-card-error">{cardError}</p>
      )}
      <Button
        className="w-full rounded-full font-semibold bg-primary hover:brightness-110 text-white shadow-lg h-12"
        onClick={handleSubmit}
        disabled={activating || !stripe}
        data-testid="button-activate-trial"
      >
        {activating ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Activating...</>) : (<><CreditCard className="w-5 h-5 mr-2" /> Activate 24-Hour Free Trial</>)}
      </Button>
      <Button variant="ghost" size="sm" onClick={onBack} data-testid="button-trial-back-verify">Back</Button>
    </div>
  );
}

export default function PricingPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const trialStatus = useTrialStatus();
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "US";
  });
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [trialUsage, setTrialUsage] = useState<{ remaining?: { questions?: number; flashcards?: number; catExams?: number } } | null>(null);
  const [paypalAvailable, setPaypalAvailable] = useState(false);
  const [paypalPlan, setPaypalPlan] = useState<string | null>(null);
  const [selectedTrialTier, setSelectedTrialTier] = useState<string>("rn");
  const [trialStep, setTrialStep] = useState<"select" | "verify" | "card">("select");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSending, setVerificationSending] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    fetch("/api/pricing/plans")
      .then((r) => r.json())
      .then((data) => { setPlans(Array.isArray(data) ? data : []); setLoadingPlans(false); })
      .catch(() => setLoadingPlans(false));
  }, []);

  useEffect(() => {
    fetch("/api/paypal/status")
      .then((r) => r.json())
      .then((d) => setPaypalAvailable(d.configured))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user && user.tier === "free") {
      fetch(`/api/free-trial/usage?userId=${user.id}`)
        .then((r) => r.json())
        .then(setTrialUsage)
        .catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    const handleRegionChange = () => {
      setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "US");
    };
    window.addEventListener("regionChange", handleRegionChange);
    return () => window.removeEventListener("regionChange", handleRegionChange);
  }, []);

  const isCAD = region === "CA";

  async function handleSubscribe(plan: PricingPlan) {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoadingTier(plan.id);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          tier: plan.tier,
          duration: plan.duration,
          region,
          planId: plan.id,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || t("pricing.checkoutFailed"));
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast({
        title: t("pricing.checkoutError"),
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoadingTier(null);
    }
  }

  async function handleTrialPurchase(passId: string) {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoadingTier(passId);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, tier: passId, duration: "one-time", region }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || t("pricing.checkoutFailed"));
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast({
        title: t("pricing.checkoutError"),
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoadingTier(null);
    }
  }

  const tierPlans = plans.filter((p) => p.tier === selectedTier && p.isEnabled);
  const monthlyPlan = tierPlans.find((p) => p.duration === "monthly");

  function getMonthlyEquiv(plan: PricingPlan) {
    const price = isCAD ? plan.priceCad : plan.priceUsd;
    const months = durationMonths[plan.duration];
    if (!months) return null;
    return (price / months / 100).toFixed(2);
  }

  function getSavingsPercent(plan: PricingPlan) {
    if (!monthlyPlan || plan.duration === "monthly") return 0;
    const months = durationMonths[plan.duration];
    if (!months) return 0;
    const monthlyPrice = isCAD ? monthlyPlan.priceCad : monthlyPlan.priceUsd;
    const totalMonthly = monthlyPrice * months;
    const planPrice = isCAD ? plan.priceCad : plan.priceUsd;
    return Math.round(((totalMonthly - planPrice) / totalMonthly) * 100);
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900 animate-page-enter">
      <SEO title="Pricing - NurseNest" description="Affordable nursing exam prep plans for RPN, RN, NP, and Allied Health students. Start free or upgrade for full access to lessons, flashcards, and simulations." canonicalPath="/pricing" />
      <Navigation />
      <main className="flex-1 px-4" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
        <div className="max-w-6xl mx-auto">
          <BreadcrumbNav />

          {!selectedTier ? (
            <>
              <div className="text-center mb-12">
                <h1 className="font-bold mb-4" style={{ fontSize: 'var(--text-hero)' }} data-testid="text-pricing-title">
                  {t("pricing.title")}
                </h1>
                <p className="text-gray-500 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed" data-testid="text-pricing-subtitle">
                  Choose your exam tier to see available plans.
                  {isCAD ? ` ${t("pricing.pricesCAD")}` : ` ${t("pricing.pricesUSD")}`}
                </p>
                {isCAD && (
                  <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50/80 border border-red-200/40 text-sm shadow-[var(--shadow-card)]" data-testid="badge-canadian-pricing">
                    <span role="img" aria-label="maple leaf">🍁</span>
                    <span className="text-gray-700">
                      <span className="font-semibold text-gray-900">{t("pricing.canadianPricingTitle")}</span> - {t("pricing.canadianPricingDesc")}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="inline-flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]" data-testid="badge-guarantee-top">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">{t("pricing.guaranteeBadge")}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Instant access after payment</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200/60 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Cancel anytime</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16" data-testid="tier-selection-grid">
                {(["rpn", "rn", "np", "allied"] as const).map((tierId, tierIdx) => {
                  const info = tierDisplayInfo[tierId];
                  const tierPlansForCard = plans.filter((p) => p.tier === tierId && p.isEnabled);
                  const lowestPlan = tierPlansForCard.find((p) => p.duration === "monthly");
                  const lowestPrice = lowestPlan ? (isCAD ? lowestPlan.priceCad : lowestPlan.priceUsd) / 100 : 0;
                  const Icon = info.icon;
                  const isPopularTier = tierId === "rn";

                  return (
                    <Card
                      key={tierId}
                      className={`relative border cursor-pointer card-hover-lift stagger-item ${info.bgColor} ${isPopularTier ? "ring-2 ring-primary/80 shadow-[var(--shadow-elevated)] scale-[1.02]" : "shadow-[var(--shadow-pricing)]"}`}
                      onClick={() => setSelectedTier(tierId)}
                      data-testid={`card-tier-select-${tierId}`}
                    >
                      {isPopularTier && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                          <Badge className="bg-primary text-white px-5 py-1.5 text-sm font-bold shadow-[var(--shadow-elevated)]" data-testid="badge-most-popular-tier">
                            <Trophy className="w-4 h-4 mr-1.5 fill-white" />
                            {t("pricing.mostPopular")}
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-2 pt-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-white shadow-sm`}>
                          <Icon className={`w-7 h-7 ${info.color}`} />
                        </div>
                        <CardTitle className="text-xl font-bold" data-testid={`text-tier-name-${tierId}`}>
                          {isCAD ? info.nameCA : info.nameUS}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                      </CardHeader>
                      <CardContent className="text-center pt-2">
                        {lowestPrice > 0 && (
                          <div className="mb-4">
                            <span className="text-sm text-gray-500">From </span>
                            <span className="text-2xl font-bold text-primary" data-testid={`text-tier-from-price-${tierId}`}>
                              ${lowestPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400">/{isCAD ? "CAD" : "USD"}/mo</span>
                          </div>
                        )}
                        <Button
                          className="w-full rounded-full font-semibold bg-primary hover:brightness-110 text-white"
                          data-testid={`button-view-plans-${tierId}`}
                        >
                          View Plans
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {user && user.tier === "free" && (
                <div className="mb-16 max-w-2xl mx-auto">
                  <Card className="border border-emerald-200 shadow-sm bg-emerald-50/50" data-testid="card-free-trial">
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-xl font-bold text-emerald-800" data-testid="text-free-trial-title">
                        Free Trial
                      </CardTitle>
                      <p className="text-sm text-emerald-600">Try NurseNest with limited access - no payment required</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-white rounded-lg border border-emerald-100">
                          <div className="text-2xl font-bold text-emerald-700" data-testid="text-trial-questions-limit">{FREE_TRIAL_LIMITS.questions}</div>
                          <div className="text-xs text-gray-500">Questions</div>
                          {trialUsage && (
                            <div className="text-xs text-emerald-600 mt-1">{trialUsage.remaining?.questions ?? FREE_TRIAL_LIMITS.questions} remaining</div>
                          )}
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-emerald-100">
                          <div className="text-2xl font-bold text-emerald-700" data-testid="text-trial-flashcards-limit">{FREE_TRIAL_LIMITS.flashcards}</div>
                          <div className="text-xs text-gray-500">Flashcards</div>
                          {trialUsage && (
                            <div className="text-xs text-emerald-600 mt-1">{trialUsage.remaining?.flashcards ?? FREE_TRIAL_LIMITS.flashcards} remaining</div>
                          )}
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-emerald-100">
                          <div className="text-2xl font-bold text-emerald-700" data-testid="text-trial-catexams-limit">{FREE_TRIAL_LIMITS.catExams}</div>
                          <div className="text-xs text-gray-500">CAT Exam</div>
                          {trialUsage && (
                            <div className="text-xs text-emerald-600 mt-1">{trialUsage.remaining?.catExams ?? FREE_TRIAL_LIMITS.catExams} remaining</div>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => navigate("/dashboard")}
                        data-testid="button-start-free-trial"
                      >
                        Start Free Trial
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mb-20">
                <div className="text-center mb-10">
                  <h2 className="font-bold mb-3" style={{ fontSize: 'var(--text-section)' }} data-testid="text-trial-title">
                    {t("pricing.trialPasses")}
                  </h2>
                  <p className="text-gray-500 text-base lg:text-lg max-w-xl mx-auto" data-testid="text-trial-subtitle">
                    {t("pricing.trialSubtitle")}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {[
                    { id: "1-day", nameKey: "pricing.trial.1day", priceCad: 4.99, priceUsd: 3.99, features: [{ textKey: "pricing.trial.1day.feature1", included: true }, { textKey: "pricing.trial.1day.feature2", included: false }, { textKey: "pricing.trial.1day.feature3", included: false }], limitKey: "pricing.trial.singleUse" },
                    { id: "3-day", nameKey: "pricing.trial.3day", priceCad: 9.99, priceUsd: 7.99, features: [{ textKey: "pricing.trial.3day.feature1", included: true }, { textKey: "pricing.trial.3day.feature2", included: true }, { textKey: "pricing.trial.3day.feature3", included: false }], limitKey: "pricing.trial.singleUse" },
                  ].map((pass) => {
                    const price = isCAD ? pass.priceCad : pass.priceUsd;
                    const currency = isCAD ? "CAD" : "USD";
                    return (
                      <Card key={pass.id} className="relative border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-testid={`card-trial-${pass.id}`}>
                        <div className="absolute -top-3 left-4 flex gap-2">
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-3 py-1 text-xs font-semibold" data-testid={`badge-onetime-${pass.id}`}>
                            <Clock className="w-3 h-3 mr-1" />
                            {t("pricing.oneTime")}
                          </Badge>
                        </div>
                        <CardHeader className="text-center pb-2 pt-8">
                          <CardTitle className="text-lg font-bold" data-testid={`text-trial-name-${pass.id}`}>{t(pass.nameKey)}</CardTitle>
                          <div className="mt-3 mb-1">
                            <span className="text-3xl font-bold text-primary" data-testid={`text-trial-price-${pass.id}`}>${price.toFixed(2)}</span>
                            <span className="text-gray-400 text-sm ml-1">{currency}</span>
                          </div>
                          <p className="text-xs text-gray-400">{t(pass.limitKey)}</p>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <ul className="space-y-2 mb-6">
                            {pass.features.map((f, idx) => (
                              <li key={idx} className={`flex items-start gap-3 text-sm ${f.included ? "text-gray-600" : "text-gray-400"}`} data-testid={`text-trial-feature-${pass.id}-${idx}`}>
                                {f.included ? <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> : <X className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />}
                                <span className={f.included ? "" : "line-through"}>{t(f.textKey)}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full rounded-full font-semibold bg-amber-500 hover:bg-amber-600 text-white" onClick={() => handleTrialPurchase(pass.id)} disabled={loadingTier === pass.id} data-testid={`button-trial-${pass.id}`}>
                            {loadingTier === pass.id ? t("pricing.processing") : t("pricing.getPass")}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="mb-20">
                <div className="text-center mb-10">
                  <h2 className="font-bold mb-3" style={{ fontSize: 'var(--text-section)' }} data-testid="text-competitor-title">
                    {t("pricing.competitorTitle")}
                  </h2>
                  <p className="text-gray-500 text-base lg:text-lg max-w-xl mx-auto" data-testid="text-competitor-subtitle">
                    {t("pricing.competitorSubtitle")}
                  </p>
                </div>
                <div className="max-w-3xl mx-auto overflow-x-auto">
                  <table className="w-full text-sm border-collapse" data-testid="table-competitor-comparison">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">{t("pricing.competitorFeature")}</th>
                        <th className="text-center py-3 px-4 font-bold text-primary bg-primary/5 rounded-t-lg">{t("pricing.competitorNurseNest")}</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-500">{t("pricing.competitorUWorld")}</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-500">{t("pricing.competitorArcher")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { featureKey: "pricing.competitorPrice", nn: "pricing.competitorNurseNestPrice", uw: "pricing.competitorUWorldPrice", ar: "pricing.competitorArcherPrice", isPrice: true },
                        { featureKey: "pricing.competitorClinicalLessons", nn: true, uw: false, ar: false },
                        { featureKey: "pricing.competitorCaseSims", nn: true, uw: false, ar: false },
                        { featureKey: "pricing.competitorFlashcards", nn: true, uw: false, ar: "pricing.competitorLimited" },
                        { featureKey: "pricing.competitorAnalytics", nn: true, uw: true, ar: true },
                        { featureKey: "pricing.competitorCanadian", nn: true, uw: false, ar: false },
                        { featureKey: "pricing.competitorMultilingual", nn: true, uw: false, ar: false },
                        { featureKey: "pricing.competitorGuarantee", nn: true, uw: false, ar: false },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0">
                          <td className="py-3 px-4 text-gray-700 font-medium">{t(row.featureKey)}</td>
                          <td className="py-3 px-4 text-center bg-primary/5">
                            {"isPrice" in row && row.isPrice ? <span className="font-bold text-primary">{t(row.nn as string)}</span> : row.nn === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-500 text-xs">{t(row.nn as string)}</span>}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {"isPrice" in row && row.isPrice ? <span className="text-gray-600">{t(row.uw as string)}</span> : row.uw === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : row.uw === false ? <X className="w-5 h-5 text-gray-300 mx-auto" /> : <span className="text-gray-500 text-xs">{t(row.uw as string)}</span>}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {"isPrice" in row && row.isPrice ? <span className="text-gray-600">{t(row.ar as string)}</span> : row.ar === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : row.ar === false ? <X className="w-5 h-5 text-gray-300 mx-auto" /> : <span className="text-gray-500 text-xs">{t(row.ar as string)}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 text-center mt-4">
                <div className="flex flex-col items-center gap-3 bg-emerald-50/80 border border-emerald-200/40 rounded-3xl px-10 py-8 shadow-[var(--shadow-card)] max-w-md" data-testid="badge-money-back">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 flex items-center justify-center mb-1">
                    <Shield className="w-7 h-7 text-emerald-600" />
                  </div>
                  <span className="text-lg font-bold text-emerald-800">{t("pricing.guaranteeBadge")}</span>
                  <p className="text-sm text-emerald-600/80 leading-relaxed">{t("pricing.guaranteeDesc")}</p>
                </div>
                <LocaleLink href="/faq" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium" data-testid="link-faq">
                  <HelpCircle className="w-4 h-4" />
                  {t("pricing.faqLink")}
                </LocaleLink>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 mb-4"
                  onClick={() => setSelectedTier(null)}
                  data-testid="button-back-to-tiers"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to all tiers
                </Button>
                <div className="text-center">
                  <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-hero)' }} data-testid="text-tier-plans-title">
                    {isCAD ? tierDisplayInfo[selectedTier]?.nameCA : tierDisplayInfo[selectedTier]?.nameUS} Plans
                  </h1>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto" data-testid="text-tier-plans-subtitle">
                    {tierDisplayInfo[selectedTier]?.description}
                    {isCAD ? ` - ${t("pricing.pricesCAD")}` : ` - ${t("pricing.pricesUSD")}`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="inline-flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]" data-testid="badge-guarantee-plans">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">{t("pricing.guaranteeBadge")}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Instant access after payment</span>
                </div>
              </div>

              {loadingPlans ? (
                <div className="text-center py-12 text-gray-500">Loading plans...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16" data-testid="plans-grid">
                  {tierPlans.map((plan) => {
                    const price = isCAD ? plan.priceCad : plan.priceUsd;
                    const displayPrice = (price / 100).toFixed(2);
                    const currency = isCAD ? "CAD" : "USD";
                    const savings = getSavingsPercent(plan);
                    const monthlyEquiv = getMonthlyEquiv(plan);

                    return (
                      <Card
                        key={plan.id}
                        className={`relative border-none transition-all duration-300 hover:-translate-y-1 ${plan.isPopular ? "ring-2 ring-primary/80 shadow-[var(--shadow-elevated)] scale-[1.02]" : "shadow-[var(--shadow-pricing)] hover:shadow-[var(--shadow-pricing-hover)]"} ${plan.isLifetime ? "bg-gradient-to-b from-amber-50 to-white" : ""}`}
                        data-testid={`card-plan-${plan.duration}`}
                      >
                        {plan.isPopular && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                            <Badge className="bg-primary text-white px-5 py-1.5 text-sm font-bold shadow-[var(--shadow-elevated)]" data-testid={`badge-popular-${plan.duration}`}>
                              <Trophy className="w-4 h-4 mr-1.5 fill-white" />
                              {t("pricing.mostPopular")}
                            </Badge>
                          </div>
                        )}
                        {plan.isFoundingPrice && (
                          <div className="absolute -top-3 right-3 z-10">
                            <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 text-xs font-bold shadow-md border-0" data-testid={`badge-founding-${plan.duration}`}>
                              <Crown className="w-3 h-3 mr-1" />
                              Founding Price
                            </Badge>
                          </div>
                        )}
                        {savings > 0 && !plan.isLifetime && (
                          <div className="absolute -top-3 right-3">
                            <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-semibold shadow-md" data-testid={`badge-save-${plan.duration}`}>
                              Save {savings}%
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="text-center pb-2 pt-8">
                          <CardTitle className="text-lg font-bold" data-testid={`text-plan-name-${plan.duration}`}>
                            {plan.isLifetime && <Crown className="w-5 h-5 inline mr-1 text-amber-500" />}
                            {durationLabels[plan.duration] || plan.duration}
                          </CardTitle>
                          <div className="mt-3 mb-1">
                            <span className="text-3xl font-bold text-primary" data-testid={`text-plan-price-${plan.duration}`}>
                              ${displayPrice}
                            </span>
                            <span className="text-gray-400 text-sm ml-1" data-testid={`text-plan-currency-${plan.duration}`}>
                              {currency}
                              {plan.isLifetime ? "" : `/${durationLabels[plan.duration]?.toLowerCase() || plan.duration}`}
                            </span>
                          </div>
                          {monthlyEquiv && plan.duration !== "monthly" && (
                            <p className="text-xs text-gray-400 mt-1" data-testid={`text-plan-equiv-${plan.duration}`}>
                              ≈ ${monthlyEquiv} {currency}/mo
                            </p>
                          )}
                          {plan.isLifetime && (
                            <p className="text-xs text-amber-600 font-semibold mt-1">One-time payment • Never expires</p>
                          )}
                        </CardHeader>
                        <CardContent className="pt-2">
                          <ul className="space-y-2 mb-6">
                            {(plan.featureList as string[]).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600" data-testid={`text-plan-feature-${plan.duration}-${idx}`}>
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={`w-full rounded-full font-semibold transition-all ${
                              plan.isPopular
                                ? "bg-primary hover:brightness-110 text-white shadow-[var(--shadow-elevated)] shadow-primary/25 hover:-translate-y-0.5"
                                : plan.isLifetime
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-[var(--shadow-card)]"
                                : "bg-gray-900 text-white hover:bg-gray-800 shadow-[var(--shadow-card)]"
                            }`}
                            onClick={() => handleSubscribe(plan)}
                            disabled={loadingTier === plan.id}
                            data-testid={`button-subscribe-${plan.duration}`}
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            {loadingTier === plan.id
                              ? t("pricing.processing")
                              : plan.isLifetime
                              ? "Buy Lifetime Access"
                              : t("pricing.payWithCard")}
                          </Button>

                          {!plan.isLifetime && (
                            <div className="flex items-center justify-center gap-2 mt-2 py-1.5 px-3 bg-gray-50 rounded-full" data-testid={`bnpl-badges-${plan.duration}`}>
                              <span className="text-[10px] text-gray-400 font-medium">Also accepted:</span>
                              <span className="text-[10px] font-semibold text-[#FFB3C7]">Klarna</span>
                              <span className="text-[10px] text-gray-300">|</span>
                              <span className="text-[10px] font-semibold text-[#B2FCE4]">Afterpay</span>
                              <span className="text-[10px] text-gray-300">|</span>
                              <span className="text-[10px] font-semibold text-[#4A4AFF]">Affirm</span>
                            </div>
                          )}

                          {paypalAvailable && !plan.isLifetime && (
                            <div className="mt-2">
                              {paypalPlan === plan.id ? (
                                <div className="border rounded-xl p-3 border-[#0070ba]/20 bg-[#0070ba]/5">
                                  <p className="text-xs text-gray-500 mb-2 text-center">{t("pricing.completePaypal")}</p>
                                  <PayPalButton
                                    amount={displayPrice}
                                    currency={isCAD ? "CAD" : "USD"}
                                    intent="CAPTURE"
                                    onSuccess={async (data) => {
                                      setPaypalPlan(null);
                                      try {
                                        const activateRes = await fetch("/api/paypal/activate-subscription", {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ userId: user!.id, tier: plan.tier, paypalOrderId: data?.id || data?.orderID || "unknown", username: user!.username, password: (JSON.parse(localStorage.getItem("nursenest-user") || "{}")).password || "" }),
                                        });
                                        if (activateRes.ok) {
                                          toast({ title: t("pricing.paymentSuccessTitle"), description: t("pricing.paymentSuccessDesc") });
                                          navigate("/subscription/success?tier=" + plan.tier);
                                        }
                                      } catch {
                                        toast({ title: t("pricing.paymentReceivedTitle"), description: t("pricing.paymentReceivedShortly") });
                                        navigate("/subscription/success");
                                      }
                                    }}
                                    onError={() => { toast({ title: t("pricing.paymentErrorTitle"), description: t("pricing.paymentErrorDesc"), variant: "destructive" }); }}
                                  />
                                  <Button variant="ghost" size="sm" className="w-full mt-1 text-xs text-gray-400" onClick={() => setPaypalPlan(null)} data-testid={`button-paypal-cancel-${plan.duration}`}>{t("pricing.cancel")}</Button>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  className="w-full rounded-full font-semibold border-[#0070ba]/30 text-[#003087] hover:bg-[#0070ba]/5"
                                  onClick={() => { if (!user) { navigate("/login"); return; } setPaypalPlan(plan.id); }}
                                  data-testid={`button-paypal-${plan.duration}`}
                                >
                                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.65h6.803c2.252 0 3.856.476 4.765 1.414.418.43.69.92.828 1.474.145.58.147 1.27.003 2.105l-.01.06v.532l.418.236c.356.188.637.404.847.644.314.358.516.802.6 1.326.088.54.06 1.18-.083 1.901-.166.84-.437 1.572-.804 2.17-.34.555-.769 1.01-1.277 1.352-.483.326-1.05.573-1.685.733-.612.155-1.31.234-2.073.234H13.39a.95.95 0 0 0-.938.8l-.038.22-.672 4.26-.03.16a.95.95 0 0 1-.938.8H7.076z"/></svg>
                                  {t("pricing.payWithPaypal")}
                                </Button>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {!trialStatus.isOnTrial && !trialStatus.hasTrial && (
                <div className="mb-16" data-testid="section-free-trial">
                  <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 to-white overflow-hidden">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-semibold mb-4" data-testid="badge-free-trial">
                          <Clock className="w-4 h-4 mr-1.5" />
                          24-Hour Free Trial
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-free-trial-title">
                          Start Your 24-Hour Free Trial
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto">
                          Get full access to premium content for 24 hours. Experience lessons, flashcards, practice exams, and more before committing.
                        </p>
                      </div>

                      {trialStep === "select" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>Full access to <strong className="text-primary uppercase">{user?.tier && ["rpn", "rn", "np"].includes(user.tier) ? user.tier : selectedTrialTier}</strong> exam preparation content</span>
                          </div>
                          <Button
                            className="w-full max-w-md mx-auto flex rounded-full font-semibold bg-primary hover:brightness-110 text-white shadow-lg shadow-primary/20 h-12"
                            onClick={() => {
                              if (!user) { navigate("/login"); return; }
                              if (user.tier && ["rpn", "rn", "np"].includes(user.tier)) {
                                setSelectedTrialTier(user.tier);
                              }
                              if (!user.email) {
                                toast({ title: "Email Required", description: "Please add an email to your profile before starting a trial.", variant: "destructive" });
                                navigate("/profile");
                                return;
                              }
                              setTrialStep("verify");
                            }}
                            data-testid="button-start-free-trial"
                          >
                            <Clock className="w-5 h-5 mr-2" />
                            Start Free Trial
                          </Button>
                          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Card required</span>
                            <span>Cancel before renewal</span>
                            <span>No charge for 24 hours</span>
                          </div>
                        </div>
                      )}

                      {trialStep === "verify" && (
                        <div className="space-y-4 max-w-md mx-auto">
                          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Mail className="w-5 h-5 text-blue-600" />
                              <p className="text-sm font-semibold text-blue-800">Verify Your Email</p>
                            </div>
                            <p className="text-xs text-blue-600 mb-3">
                              We'll send a verification code to {user?.email || "your email"} to confirm your identity.
                            </p>
                            {!verificationSent ? (
                              <Button
                                className="w-full rounded-full"
                                variant="outline"
                                onClick={async () => {
                                  setVerificationSending(true);
                                  try {
                                    const res = await fetch("/api/auth/send-verification", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("nursenest-user-token") || ""}` },
                                    });
                                    if (res.ok) {
                                      setVerificationSent(true);
                                      toast({ title: "Code Sent", description: "Check your email for the verification code." });
                                    } else {
                                      const err = await res.json();
                                      if (err.error?.includes("already verified")) { setTrialStep("card"); }
                                      else { toast({ title: "Error", description: err.error || "Failed to send code", variant: "destructive" }); }
                                    }
                                  } catch { toast({ title: "Error", description: "Failed to send verification code", variant: "destructive" }); }
                                  finally { setVerificationSending(false); }
                                }}
                                disabled={verificationSending}
                                data-testid="button-send-verification"
                              >
                                {verificationSending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Mail className="w-4 h-4 mr-2" />}
                                Send Verification Code
                              </Button>
                            ) : (
                              <div className="space-y-2">
                                <label htmlFor="trial-verification-code" className="sr-only">Verification Code</label>
                                <input
                                  id="trial-verification-code"
                                  type="text"
                                  placeholder="Enter 6-digit code"
                                  aria-label="6-digit verification code"
                                  value={verificationCode}
                                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                  className="w-full px-4 py-2 border rounded-lg text-center text-lg font-mono tracking-widest"
                                  maxLength={6}
                                  data-testid="input-verification-code"
                                />
                                <Button
                                  className="w-full rounded-full"
                                  onClick={async () => {
                                    try {
                                      const res = await fetch("/api/auth/verify-email", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("nursenest-user-token") || ""}` },
                                        body: JSON.stringify({ code: verificationCode }),
                                      });
                                      if (res.ok) { toast({ title: "Email Verified", description: "Your email has been verified." }); setTrialStep("card"); }
                                      else { const err = await res.json(); toast({ title: "Invalid Code", description: err.error || "Please check the code and try again.", variant: "destructive" }); }
                                    } catch { toast({ title: "Error", description: "Failed to verify code", variant: "destructive" }); }
                                  }}
                                  disabled={verificationCode.length !== 6}
                                  data-testid="button-verify-code"
                                >
                                  <Check className="w-4 h-4 mr-2" />
                                  Verify & Continue
                                </Button>
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setTrialStep("select")} data-testid="button-trial-back-select">Back</Button>
                        </div>
                      )}

                      {trialStep === "card" && (
                        <Elements stripe={getStripePromise()}>
                          <TrialCardForm
                            selectedTier={selectedTrialTier}
                            onSuccess={() => navigate("/dashboard")}
                            onBack={() => setTrialStep("verify")}
                          />
                        </Elements>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mb-16 max-w-3xl mx-auto">
                <Card className="border border-gray-100/80 shadow-[var(--shadow-card)]">
                  <CardContent className="py-8 px-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900" data-testid="text-bnpl-title">Flexible Payment Options</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">Pay your way. In addition to credit and debit cards, we accept multiple buy-now-pay-later options at checkout so you can start studying immediately.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" data-testid="bnpl-options-grid">
                      <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                        <span className="text-xs font-bold text-gray-700 mb-1">Credit / Debit</span>
                        <span className="text-[10px] text-gray-400">Visa, Mastercard, Amex</span>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-xl bg-[#FFB3C7]/8 border border-[#FFB3C7]/15">
                        <span className="text-xs font-bold text-[#E5678F] mb-1">Klarna</span>
                        <span className="text-[10px] text-gray-400">Pay in 4 installments</span>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-xl bg-[#B2FCE4]/8 border border-[#B2FCE4]/20">
                        <span className="text-xs font-bold text-[#00C2A8] mb-1">Afterpay</span>
                        <span className="text-[10px] text-gray-400">Pay in 4 installments</span>
                      </div>
                      <div className="flex flex-col items-center p-4 rounded-xl bg-[#4A4AFF]/5 border border-[#4A4AFF]/10">
                        <span className="text-xs font-bold text-[#4A4AFF] mb-1">Affirm</span>
                        <span className="text-[10px] text-gray-400">Pay over time (US only)</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4 text-center">Buy now, pay later options are available at checkout for eligible purchases. Subject to approval by the payment provider.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col items-center gap-8 text-center mt-4">
                <div className="flex flex-col items-center gap-3 bg-emerald-50/80 border border-emerald-200/40 rounded-3xl px-10 py-8 shadow-[var(--shadow-card)] max-w-md" data-testid="badge-money-back-plans">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 flex items-center justify-center mb-1">
                    <Shield className="w-7 h-7 text-emerald-600" />
                  </div>
                  <span className="text-lg font-bold text-emerald-800">{t("pricing.guaranteeBadge")}</span>
                  <p className="text-sm text-emerald-600/80 leading-relaxed">{t("pricing.guaranteeDesc")}</p>
                </div>
                <LocaleLink href="/faq" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium" data-testid="link-faq-plans">
                  <HelpCircle className="w-4 h-4" />
                  {t("pricing.faqLink")}
                </LocaleLink>
              </div>
            </>
          )}
        </div>
      </main>
      <AdminEditButton />
      <Footer />
    </div>
  );
}
