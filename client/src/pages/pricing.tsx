import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Navigation } from "@/components/navigation";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { TrustBadges as TrustBadgesComponent } from "@/components/competitive-differentiation";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { SEO } from "@/components/seo";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check, Shield, HelpCircle, Clock, X, CreditCard,
  Zap, Award, Trophy, ArrowLeft, Crown, BookOpen,
  GraduationCap, Lock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PayPalButton from "@/components/PayPalButton";
import {
  durationLabels, durationMonths, tierMeta,
  socialProofStats, featureComparisonRows, studyTimelines,
  type TierKey, type DurationKey,
} from "@shared/pricing-config";

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

const tierIcons: Record<TierKey, typeof Shield> = {
  rpn: Shield,
  rn: Award,
  np: Trophy,
  allied: BookOpen,
};

const tierColors: Record<TierKey, { color: string; bgColor: string }> = {
  rpn: { color: "text-blue-600", bgColor: "bg-blue-50 border-blue-200" },
  rn: { color: "text-purple-600", bgColor: "bg-purple-50 border-purple-200" },
  np: { color: "text-amber-600", bgColor: "bg-amber-50 border-amber-200" },
  allied: { color: "text-teal-600", bgColor: "bg-teal-50 border-teal-200" },
};

const tierSEO: Record<TierKey, { title: string; description: string }> = {
  rpn: {
    title: "RPN Exam Prep Pricing | NurseNest",
    description: "Affordable RPN/LVN exam prep plans. 1 Month, 3 Months, 6 Months, and 12 Months options with 40,000+ practice questions, flashcards, and adaptive mock exams.",
  },
  rn: {
    title: "RN NCLEX Exam Prep Pricing | NurseNest",
    description: "RN/NCLEX exam prep pricing plans. Choose from 1 Month, 3 Months, 6 Months, or 12 Months. Full access to practice questions, clinical lessons, and exam simulations.",
  },
  np: {
    title: "NP Exam Prep Pricing | NurseNest",
    description: "Nurse Practitioner exam prep pricing. Advanced clinical reasoning practice with 1 Month, 3 Months, 6 Months, and 12 Months plans.",
  },
  allied: {
    title: "Allied Health Exam Prep Pricing | NurseNest",
    description: "Allied health certification exam prep pricing. Study for RRT, Paramedic, Pharmacy Tech, MLT and more. 1 Month, 3 Months, 6 Months, and 12 Months plans.",
  },
};

const ALL_TIERS: TierKey[] = ["rpn", "rn", "np", "allied"];

function isTrialPlan(plan: PricingPlan): boolean {
  const d = plan.duration.toLowerCase();
  return d.includes("trial") || d.includes("day");
}

export default function PricingPage() {
  const [, navigate] = useLocation();
  const [, tierParam] = useRoute("/pricing/:tier");
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "US";
  });

  const urlTier = tierParam?.tier as TierKey | undefined;
  const validUrlTier = urlTier && ALL_TIERS.includes(urlTier) ? urlTier : null;

  const [selectedTier, setSelectedTier] = useState<string | null>(validUrlTier);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [plansError, setPlansError] = useState(false);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [paypalAvailable, setPaypalAvailable] = useState(false);
  const [paypalPlan, setPaypalPlan] = useState<string | null>(null);

  useEffect(() => {
    if (validUrlTier) {
      setSelectedTier(validUrlTier);
    }
  }, [validUrlTier]);

  useEffect(() => {
    fetch("/api/pricing/plans")
      .then((r) => r.json())
      .then((data) => {
        const allPlans = Array.isArray(data) ? data : [];
        const filtered = allPlans.filter((p: PricingPlan) => !isTrialPlan(p));
        if (filtered.length === 0) {
          console.warn("[Pricing] No plans loaded from API or all plans were filtered out");
        }
        setPlans(filtered);
        setLoadingPlans(false);
      })
      .catch((err) => {
        console.error("[Pricing] Failed to load plans:", err);
        setPlansError(true);
        setLoadingPlans(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/paypal/status")
      .then((r) => r.json())
      .then((d) => setPaypalAvailable(d.configured))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleRegionChange = () => {
      setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "US");
    };
    window.addEventListener("regionChange", handleRegionChange);
    return () => window.removeEventListener("regionChange", handleRegionChange);
  }, []);

  const isCAD = region === "CA";

  function handleTierSelect(tierId: TierKey) {
    setSelectedTier(tierId);
    navigate(`/pricing/${tierId}`);
  }

  function handleBackToTiers() {
    setSelectedTier(null);
    navigate("/pricing");
  }

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

  const tierPlans = plans.filter((p) => p.tier === selectedTier && p.isEnabled);
  const monthlyPlan = tierPlans.find((p) => p.duration === "monthly");

  if (selectedTier && !loadingPlans) {
    if (tierPlans.length === 0 && !plansError) {
      console.warn(`[Pricing] No plans found for tier "${selectedTier}". Available tiers in data:`, [...new Set(plans.map(p => p.tier))]);
    }
    tierPlans.forEach((plan) => {
      if (!plan.id) console.warn(`[Pricing] Plan missing id:`, plan);
      if (!plan.priceCad && !plan.priceUsd) console.warn(`[Pricing] Plan has no price:`, plan);
    });
  }

  function getMonthlyEquiv(plan: PricingPlan) {
    const price = isCAD ? plan.priceCad : plan.priceUsd;
    const months = durationMonths[plan.duration as DurationKey];
    if (!months) return null;
    return (price / months / 100).toFixed(2);
  }

  function getSavingsPercent(plan: PricingPlan) {
    if (!monthlyPlan || plan.duration === "monthly") return 0;
    const months = durationMonths[plan.duration as DurationKey];
    if (!months) return 0;
    const monthlyPrice = isCAD ? monthlyPlan.priceCad : monthlyPlan.priceUsd;
    const totalMonthly = monthlyPrice * months;
    const planPrice = isCAD ? plan.priceCad : plan.priceUsd;
    return Math.round(((totalMonthly - planPrice) / totalMonthly) * 100);
  }

  const seoTitle = selectedTier && tierSEO[selectedTier as TierKey]
    ? tierSEO[selectedTier as TierKey].title
    : "Pricing - NurseNest";
  const seoDescription = selectedTier && tierSEO[selectedTier as TierKey]
    ? tierSEO[selectedTier as TierKey].description
    : "Affordable nursing exam prep plans for RPN, RN, NP, and Allied Health students. 40,000+ practice questions, 13,000+ flashcards, and adaptive mock exams. Start free or upgrade for full access.";
  const seoCanonical = selectedTier ? `/pricing/${selectedTier}` : "/pricing";

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900 animate-page-enter">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={seoCanonical}
      />
      <Navigation />
      <main className="flex-1 px-4" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
        <div className="max-w-6xl mx-auto">
          <BreadcrumbNav />

          {!selectedTier ? (
            <>
              {/* Hero Section */}
              <div className="text-center mb-10">
                <h1 className="font-bold mb-4 tracking-tight" style={{ fontSize: 'var(--text-hero)' }} data-testid="text-pricing-title">
                  {t("pricing.heroTitle")}
                </h1>
                <p className="text-gray-500 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-4" data-testid="text-pricing-subtitle">
                  {t("pricing.heroSubtitle")}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
                  {user ? (
                    <Button
                      className="rounded-full font-semibold bg-primary hover:brightness-110 text-white px-8 h-12 text-base shadow-lg shadow-primary/20"
                      onClick={() => navigate("/dashboard")}
                      data-testid="button-hero-start-free"
                    >
                      {t("pricing.startFree")}
                    </Button>
                  ) : (
                    <Button
                      className="rounded-full font-semibold bg-primary hover:brightness-110 text-white px-8 h-12 text-base shadow-lg shadow-primary/20"
                      onClick={() => navigate("/register")}
                      data-testid="button-hero-start-free"
                    >
                      {t("pricing.startFree")}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="rounded-full font-semibold px-8 h-12 text-base border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      document.getElementById("pricing-tiers")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    data-testid="button-hero-explore-plans"
                  >
                    {t("pricing.explorePlans")}
                  </Button>
                </div>
                <p className="text-sm text-gray-400" data-testid="text-hero-subtext">
                  {t("pricing.heroSubtext")}
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

              {/* Social Proof Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12" data-testid="social-proof-metrics">
                {socialProofStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 rounded-2xl bg-white border border-gray-100/80 shadow-[var(--shadow-card)]"
                    data-testid={`stat-${idx}`}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Credibility Bar */}
              <div className="flex flex-wrap justify-center gap-4 mb-10" data-testid="credibility-bar">
                <div className="inline-flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]" data-testid="badge-guarantee-top">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">{t("pricing.guaranteeBadge")}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">{t("pricing.instantAccess")}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200/60 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">{t("pricing.cancelAnytime")}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-purple-50/80 border border-purple-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">{t("pricing.examCoverage")}</span>
                </div>
              </div>

              {/* Tier Selection Grid */}
              <div id="pricing-tiers" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12" data-testid="tier-selection-grid">
                {ALL_TIERS.map((tierId) => {
                  const meta = tierMeta[tierId];
                  const colors = tierColors[tierId];
                  const Icon = tierIcons[tierId];
                  const tierPlansForCard = plans.filter((p) => p.tier === tierId && p.isEnabled);
                  const lowestPlan = tierPlansForCard.find((p) => p.duration === "monthly");
                  const lowestPrice = lowestPlan ? (isCAD ? lowestPlan.priceCad : lowestPlan.priceUsd) / 100 : 0;
                  const isPopularTier = tierId === "rn";

                  return (
                    <Card
                      key={tierId}
                      className={`relative border cursor-pointer card-hover-lift stagger-item ${colors.bgColor} ${isPopularTier ? "ring-2 ring-primary/80 shadow-[var(--shadow-elevated)] scale-[1.02]" : "shadow-[var(--shadow-pricing)]"}`}
                      onClick={() => handleTierSelect(tierId)}
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
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-white shadow-sm">
                          <Icon className={`w-7 h-7 ${colors.color}`} />
                        </div>
                        <CardTitle className="text-xl font-bold" data-testid={`text-tier-name-${tierId}`}>
                          {isCAD ? meta.nameCA : meta.nameUS}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{meta.tagline}</p>
                      </CardHeader>
                      <CardContent className="text-center pt-2">
                        {lowestPrice > 0 && (
                          <div className="mb-4">
                            <span className="text-sm text-gray-500">{t("pricing.from")} </span>
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
                          {t("pricing.viewPlans")}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Free Pass Card */}
              <div className="mb-16 max-w-2xl mx-auto">
                <Card className="border border-emerald-200/60 shadow-[var(--shadow-card)] bg-gradient-to-br from-emerald-50/80 to-white" data-testid="card-free-pass">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-800 mb-1" data-testid="text-free-pass-title">
                      {t("pricing.freePassTitle")}
                    </h3>
                    <p className="text-sm text-emerald-600 mb-4 max-w-md mx-auto">
                      {t("pricing.freePassDesc")}
                    </p>
                    {user ? (
                      <Button
                        className="rounded-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                        onClick={() => navigate("/dashboard")}
                        data-testid="button-start-free"
                      >
                        {t("pricing.startFree")}
                      </Button>
                    ) : (
                      <Button
                        className="rounded-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                        onClick={() => navigate("/register")}
                        data-testid="button-get-free-pass"
                      >
                        {t("pricing.getFreePass")}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Feature Comparison Table */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="font-bold mb-2" style={{ fontSize: 'var(--text-section)' }} data-testid="text-comparison-title">
                    {t("pricing.whatsIncluded")}
                  </h2>
                  <p className="text-gray-500 text-base max-w-xl mx-auto">
                    {t("pricing.whatsIncludedDesc")}
                  </p>
                </div>
                <div className="max-w-3xl mx-auto overflow-x-auto">
                  <table className="w-full text-sm border-collapse" data-testid="table-feature-comparison">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">{t("pricing.feature")}</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-500">{t("pricing.freePass")}</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">RPN</th>
                        <th className="text-center py-3 px-4 font-bold text-primary bg-primary/5 rounded-t-lg">RN</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">NP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {featureComparisonRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0">
                          <td className="py-3 px-4 text-gray-700 font-medium">{row.feature}</td>
                          <td className="py-3 px-4 text-center">
                            {row.free === "No" ? (
                              <X className="w-4 h-4 text-gray-300 mx-auto" />
                            ) : (
                              <span className="text-xs text-gray-400">{row.free}</span>
                            )}
                          </td>
                          {(["rpn", "rn", "np"] as const).map((tier) => (
                            <td key={tier} className={`py-3 px-4 text-center ${tier === "rn" ? "bg-primary/5" : ""}`}>
                              {row[tier] === "Full access" ? (
                                <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                              ) : (
                                <span className="text-xs text-gray-400">{row[tier]}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Competitor Comparison */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="font-bold mb-2" style={{ fontSize: 'var(--text-section)' }} data-testid="text-competitor-title">
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

              {/* Study Timeline Guidance */}
              <div className="mb-16 max-w-3xl mx-auto">
                <Card className="border border-gray-100/80 shadow-[var(--shadow-card)]">
                  <CardContent className="py-8 px-8">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900" data-testid="text-study-timeline-title">{t("pricing.studyTimelineTitle")}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4" data-testid="study-timelines">
                      {ALL_TIERS.map((tier) => {
                        const Icon = tierIcons[tier];
                        const colors = tierColors[tier];
                        return (
                          <div key={tier} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                            <Icon className={`w-5 h-5 ${colors.color}`} />
                            <div>
                              <div className="text-sm font-semibold">{tierMeta[tier].nameCA}</div>
                              <div className="text-xs text-gray-500">{studyTimelines[tier]}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trust Badges */}
              <TrustBadgesComponent variant="compact" />

              {/* Trust Signals */}
              <div className="flex flex-col items-center gap-8 text-center mt-4 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto w-full" data-testid="trust-signals">
                  <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/40">
                    <Shield className="w-6 h-6 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-800">{t("pricing.guaranteeBadge")}</span>
                    <p className="text-xs text-emerald-600/80">{t("pricing.guaranteeDesc")}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-blue-50/80 border border-blue-200/40">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-bold text-blue-800">{t("pricing.cancelAnytimeTitle")}</span>
                    <p className="text-xs text-blue-600/80">{t("pricing.cancelAnytimeDesc")}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-purple-50/80 border border-purple-200/40">
                    <Lock className="w-6 h-6 text-purple-600" />
                    <span className="text-sm font-bold text-purple-800">{t("pricing.secureCheckout")}</span>
                    <p className="text-xs text-purple-600/80">{t("pricing.secureCheckoutDesc")}</p>
                  </div>
                </div>
                <LocaleLink href="/faq" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium" data-testid="link-faq">
                  <HelpCircle className="w-4 h-4" />
                  {t("pricing.faqLink")}
                </LocaleLink>
              </div>
            </>
          ) : (
            <>
              {/* Plan Detail View */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 mb-4"
                  onClick={handleBackToTiers}
                  data-testid="button-back-to-tiers"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("pricing.backToTiers")}
                </Button>
                <div className="text-center">
                  <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-hero)' }} data-testid="text-tier-plans-title">
                    {isCAD ? tierMeta[selectedTier as TierKey]?.nameCA : tierMeta[selectedTier as TierKey]?.nameUS} {t("pricing.plans")}
                  </h1>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-2" data-testid="text-tier-plans-subtitle">
                    {tierMeta[selectedTier as TierKey]?.tagline}
                  </p>
                  <p className="text-sm text-gray-400">
                    {isCAD ? `${t("pricing.pricesCAD")}` : `${t("pricing.pricesUSD")}`}
                  </p>
                </div>
              </div>

              {/* Tier tabs */}
              <div className="flex justify-center gap-2 mb-8 flex-wrap" data-testid="tier-tabs">
                {ALL_TIERS.map((tierId) => (
                  <Button
                    key={tierId}
                    variant={selectedTier === tierId ? "default" : "outline"}
                    className={`rounded-full px-5 text-sm font-semibold ${selectedTier === tierId ? "bg-primary text-white" : ""}`}
                    onClick={() => handleTierSelect(tierId)}
                    data-testid={`tab-tier-${tierId}`}
                  >
                    {tierMeta[tierId].nameCA}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="inline-flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]" data-testid="badge-guarantee-plans">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">{t("pricing.guaranteeBadge")}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/40 rounded-full px-5 py-2.5 shadow-[var(--shadow-card)]">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">{t("pricing.instantAccess")}</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-400 mb-8" data-testid="text-study-urgency">
                {t("pricing.studyUrgency")}
              </p>

              {loadingPlans ? (
                <div className="text-center py-12 text-gray-500">{t("pricing.loadingPlans")}</div>
              ) : plansError || tierPlans.length === 0 ? (
                <div className="text-center py-12 px-4" data-testid="text-plans-unavailable">
                  <div className="max-w-md mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-8">
                    <Shield className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t("pricing.plansUnavailable")}</h3>
                    <p className="text-sm text-gray-600">
                      {t("pricing.plansUnavailableDesc")}
                    </p>
                    <Button
                      className="mt-4 rounded-full"
                      variant="outline"
                      onClick={() => window.location.reload()}
                      data-testid="button-refresh-plans"
                    >
                      {t("pricing.refreshPage")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16" data-testid="plans-grid">
                  {tierPlans.map((plan) => {
                    const price = isCAD ? plan.priceCad : plan.priceUsd;
                    const displayPrice = (price / 100).toFixed(2);
                    const currency = isCAD ? "CAD" : "USD";
                    const savings = getSavingsPercent(plan);
                    const monthlyEquiv = getMonthlyEquiv(plan);
                    const is6Month = plan.duration === "6-month";

                    return (
                      <Card
                        key={plan.id}
                        className={`relative border-none transition-all duration-300 hover:-translate-y-1 ${
                          is6Month
                            ? "ring-2 ring-primary/80 shadow-[var(--shadow-elevated)] scale-[1.02]"
                            : "shadow-[var(--shadow-pricing)] hover:shadow-[var(--shadow-pricing-hover)]"
                        }`}
                        data-testid={`card-plan-${plan.duration}`}
                      >
                        {is6Month && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                            <Badge className="bg-primary text-white px-5 py-1.5 text-sm font-bold shadow-[var(--shadow-elevated)]" data-testid={`badge-popular-${plan.duration}`}>
                              <Trophy className="w-4 h-4 mr-1.5 fill-white" />
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        {plan.isFoundingPrice && (
                          <div className="absolute -top-3 right-3 z-10">
                            <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 text-xs font-bold shadow-md border-0" data-testid={`badge-founding-${plan.duration}`}>
                              <Crown className="w-3 h-3 mr-1" />
                              {t("pricing.foundingPrice")}
                            </Badge>
                          </div>
                        )}
                        {savings > 0 && (
                          <div className={`absolute -top-3 right-3 ${is6Month ? "z-10" : ""}`}>
                            <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-semibold shadow-md" data-testid={`badge-save-${plan.duration}`}>
                              {t("pricing.save", { percent: String(savings) })}
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="text-center pb-2 pt-8">
                          <CardTitle className="text-lg font-bold" data-testid={`text-plan-name-${plan.duration}`}>
                            {durationLabels[plan.duration as DurationKey] || plan.duration}
                          </CardTitle>
                          <div className="mt-3 mb-1">
                            <span className="text-3xl font-bold text-primary" data-testid={`text-plan-price-${plan.duration}`}>
                              ${displayPrice}
                            </span>
                            <span className="text-gray-400 text-sm ml-1" data-testid={`text-plan-currency-${plan.duration}`}>
                              {currency}
                            </span>
                          </div>
                          {monthlyEquiv && plan.duration !== "monthly" && (
                            <p className="text-xs text-gray-400 mt-1" data-testid={`text-plan-equiv-${plan.duration}`}>
                              ≈ ${monthlyEquiv} {currency}/mo
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="pt-2">
                          {Array.isArray(plan.featureList) && plan.featureList.length > 0 && (
                            <ul className="space-y-2 mb-6">
                              {(plan.featureList as string[]).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600" data-testid={`text-plan-feature-${plan.duration}-${idx}`}>
                                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <Button
                            className={`w-full rounded-full font-semibold transition-all ${
                              is6Month
                                ? "bg-primary hover:brightness-110 text-white shadow-[var(--shadow-elevated)] shadow-primary/25 hover:-translate-y-0.5"
                                : "bg-gray-900 text-white hover:bg-gray-800 shadow-[var(--shadow-card)]"
                            }`}
                            onClick={() => handleSubscribe(plan)}
                            disabled={loadingTier === plan.id}
                            data-testid={`button-subscribe-${plan.duration}`}
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            {loadingTier === plan.id
                              ? t("pricing.processing")
                              : t("pricing.unlockFullAccess")}
                          </Button>

                          <div className="flex items-center justify-center gap-2 mt-2 py-1.5 px-3 bg-gray-50 rounded-full" data-testid={`bnpl-badges-${plan.duration}`}>
                            <span className="text-[10px] text-gray-400 font-medium">{t("pricing.alsoAccepted")}</span>
                            <span className="text-[10px] font-semibold text-[#FFB3C7]">Klarna</span>
                            <span className="text-[10px] text-gray-300">|</span>
                            <span className="text-[10px] font-semibold text-[#B2FCE4]">Afterpay</span>
                            <span className="text-[10px] text-gray-300">|</span>
                            <span className="text-[10px] font-semibold text-[#4A4AFF]">Affirm</span>
                          </div>

                          {paypalAvailable && (
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

              {/* Reassurance under plans */}
              <div className="text-center mb-12">
                <p className="text-sm text-gray-400 mb-1">{t("pricing.noContracts")}</p>
                <p className="text-sm text-gray-400">Secure checkout powered by Stripe.</p>
              </div>

              {/* Trust and FAQ */}
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
