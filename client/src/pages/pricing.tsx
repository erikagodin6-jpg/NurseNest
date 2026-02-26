import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, HelpCircle, Star, Clock, X, CreditCard, Calculator, Beaker, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PayPalButton from "@/components/PayPalButton";

type Duration = "monthly" | "3-month" | "6-month" | "yearly";

const durationKeys: Record<Duration, string> = {
  monthly: "pricing.durationMonthly",
  "3-month": "pricing.duration3Month",
  "6-month": "pricing.duration6Month",
  yearly: "pricing.durationYearly",
};

const savingsPercent: Record<Duration, number> = {
  monthly: 0,
  "3-month": 17,
  "6-month": 25,
  yearly: 33,
};

const periodLabelKeys: Record<Duration, string> = {
  monthly: "pricing.periodMo",
  "3-month": "pricing.period3Mo",
  "6-month": "pricing.period6Mo",
  yearly: "pricing.periodYr",
};

const tiers = [
  {
    id: "rpn",
    nameCA: "RPN",
    nameUS: "LVN",
    prices: {
      monthly: { CAD: 29.99, USD: 21.99 },
      "3-month": { CAD: 74.99, USD: 54.99 },
      "6-month": { CAD: 134.99, USD: 99.99 },
      yearly: { CAD: 239.99, USD: 179.99 },
    },
    featureKeys: [
      "pricing.rpn.feature1",
      "pricing.rpn.feature2",
      "pricing.rpn.feature3",
      "pricing.rpn.feature4",
      "pricing.rpn.feature5",
      "pricing.rpn.feature6",
    ],
    popular: false,
  },
  {
    id: "rn",
    nameCA: "RN",
    nameUS: "RN",
    prices: {
      monthly: { CAD: 39.99, USD: 29.99 },
      "3-month": { CAD: 99.99, USD: 74.99 },
      "6-month": { CAD: 179.99, USD: 134.99 },
      yearly: { CAD: 319.99, USD: 239.99 },
    },
    featureKeys: [
      "pricing.rn.feature1",
      "pricing.rn.feature2",
      "pricing.rn.feature3",
      "pricing.rn.feature4",
      "pricing.rn.feature5",
      "pricing.rn.feature6",
    ],
    popular: true,
  },
  {
    id: "np",
    nameCA: "NP Advanced",
    nameUS: "NP Advanced",
    prices: {
      monthly: { CAD: 49.99, USD: 36.99 },
      "3-month": { CAD: 124.99, USD: 94.99 },
      "6-month": { CAD: 224.99, USD: 169.99 },
      yearly: { CAD: 399.99, USD: 299.99 },
    },
    featureKeys: [
      "pricing.np.feature1",
      "pricing.np.feature2",
      "pricing.np.feature3",
      "pricing.np.feature4",
      "pricing.np.feature5",
      "pricing.np.feature6",
    ],
    popular: false,
  },
];

const trialPasses = [
  {
    id: "1-day",
    nameKey: "pricing.trial.1day",
    priceCAD: 4.99,
    priceUSD: 3.99,
    features: [
      { textKey: "pricing.trial.1day.feature1", included: true },
      { textKey: "pricing.trial.1day.feature2", included: false },
      { textKey: "pricing.trial.1day.feature3", included: false },
    ],
    limitKey: "pricing.trial.singleUse",
  },
  {
    id: "3-day",
    nameKey: "pricing.trial.3day",
    priceCAD: 9.99,
    priceUSD: 7.99,
    features: [
      { textKey: "pricing.trial.3day.feature1", included: true },
      { textKey: "pricing.trial.3day.feature2", included: true },
      { textKey: "pricing.trial.3day.feature3", included: false },
    ],
    limitKey: "pricing.trial.singleUse",
  },
];

export default function PricingPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "US";
  });
  const [duration, setDuration] = useState<Duration>("monthly");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [paypalAvailable, setPaypalAvailable] = useState(false);
  const [paypalTier, setPaypalTier] = useState<string | null>(null);

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

  async function handleSubscribe(tierId: string) {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoadingTier(tierId);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, tier: tierId, duration, region }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create checkout session");
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
        throw new Error(err.error || "Failed to create checkout session");
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

  const savings = savingsPercent[duration];

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <Navigation />
      <main className="flex-1 px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="text-pricing-title">
              {t("pricing.title")}
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
              {t("pricing.subtitle")}
              {isCAD ? ` ${t("pricing.pricesCAD")}` : ` ${t("pricing.pricesUSD")}`}
            </p>
            {isCAD && (
              <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 border border-red-200/60 text-sm" data-testid="badge-canadian-pricing">
                <span role="img" aria-label="maple leaf">🍁</span>
                <span className="text-gray-700">
                  <span className="font-semibold text-gray-900">{t("pricing.canadianPricingTitle")}</span>  -  {t("pricing.canadianPricingDesc")}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200" data-testid="toggle-duration">
              {(["monthly", "3-month", "6-month", "yearly"] as Duration[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    duration === d
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  data-testid={`button-duration-${d}`}
                >
                  {t(durationKeys[d])}
                  {savingsPercent[d] > 0 && duration === d && (
                    <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      -{savingsPercent[d]}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {savings > 0 && (
            <div className="text-center mb-8">
              <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-1.5 text-sm font-semibold" data-testid="badge-savings">
                {t("pricing.save")} {savings}% {t("pricing.saveBilling")} {t(durationKeys[duration])} {t("pricing.billing")}
              </Badge>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {tiers.map((tier) => {
              const name = isCAD ? tier.nameCA : tier.nameUS;
              const price = isCAD ? tier.prices[duration].CAD : tier.prices[duration].USD;
              const currency = isCAD ? "CAD" : "USD";

              return (
                <Card
                  key={tier.id}
                  className={`relative border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    tier.popular
                      ? "ring-2 ring-primary shadow-primary/10"
                      : ""
                  }`}
                  data-testid={`card-tier-${tier.id}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1 text-xs font-semibold shadow-md" data-testid="badge-most-popular">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        {t("pricing.mostPopular")}
                      </Badge>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-green-500 text-white px-3 py-1 text-xs font-semibold shadow-md" data-testid={`badge-save-${tier.id}`}>
                        {t("pricing.save")} {savings}%
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2 pt-8">
                    <CardTitle className="text-xl font-bold" data-testid={`text-tier-name-${tier.id}`}>
                      {name}
                    </CardTitle>
                    <div className="mt-4 mb-2">
                      <span className="text-4xl font-bold text-primary" data-testid={`text-tier-price-${tier.id}`}>
                        ${price.toFixed(2)}
                      </span>
                      <span className="text-gray-400 text-sm ml-1" data-testid={`text-tier-currency-${tier.id}`}>
                        {currency}{t(periodLabelKeys[duration])}
                      </span>
                    </div>
                    {duration !== "monthly" && (
                      <p className="text-xs text-gray-400 mt-1" data-testid={`text-tier-equiv-${tier.id}`}>
                        ≈ ${(price / (duration === "3-month" ? 3 : duration === "6-month" ? 6 : 12)).toFixed(2)} {currency}{t("pricing.equivPerMo")}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-3 mb-8">
                      {tier.featureKeys.map((featureKey, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600" data-testid={`text-feature-${tier.id}-${idx}`}>
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{t(featureKey)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full rounded-full font-semibold transition-all ${
                        tier.popular
                          ? "bg-primary hover:brightness-110 text-white shadow-md shadow-primary/20 hover:-translate-y-0.5"
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                      }`}
                      onClick={() => handleSubscribe(tier.id)}
                      disabled={loadingTier === tier.id}
                      data-testid={`button-subscribe-${tier.id}`}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {loadingTier === tier.id ? t("pricing.processing") : t("pricing.payWithCard")}
                    </Button>
                    {paypalAvailable && (
                      <div className="mt-2">
                        {paypalTier === tier.id ? (
                          <div className="border rounded-xl p-3 border-[#0070ba]/20 bg-[#0070ba]/5">
                            <p className="text-xs text-gray-500 mb-2 text-center">{t("pricing.completePaypal")}</p>
                            <PayPalButton
                              amount={price.toFixed(2)}
                              currency={isCAD ? "CAD" : "USD"}
                              intent="CAPTURE"
                              onSuccess={async (data) => {
                                setPaypalTier(null);
                                try {
                                  const activateRes = await fetch("/api/paypal/activate-subscription", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      userId: user!.id,
                                      tier: tier.id,
                                      paypalOrderId: data?.id || data?.orderID || "unknown",
                                      username: user!.username,
                                      password: (JSON.parse(localStorage.getItem("nursenest-user") || "{}")).password || "",
                                    }),
                                  });
                                  if (activateRes.ok) {
                                    const stored = localStorage.getItem("nursenest-user");
                                    if (stored) {
                                      const parsed = JSON.parse(stored);
                                      parsed.tier = tier.id;
                                      parsed.subscriptionStatus = "active";
                                      localStorage.setItem("nursenest-user", JSON.stringify(parsed));
                                    }
                                    toast({ title: t("pricing.paymentSuccessTitle"), description: t("pricing.paymentSuccessDesc") });
                                    navigate("/subscription/success?tier=" + tier.id);
                                  } else {
                                    toast({ title: t("pricing.paymentReceivedTitle"), description: t("pricing.paymentReceivedPending") });
                                    navigate("/subscription/success");
                                  }
                                } catch {
                                  toast({ title: t("pricing.paymentReceivedTitle"), description: t("pricing.paymentReceivedShortly") });
                                  navigate("/subscription/success");
                                }
                              }}
                              onError={() => {
                                toast({ title: t("pricing.paymentErrorTitle"), description: t("pricing.paymentErrorDesc"), variant: "destructive" });
                              }}
                            />
                            <Button variant="ghost" size="sm" className="w-full mt-1 text-xs text-gray-400" onClick={() => setPaypalTier(null)} data-testid={`button-paypal-cancel-${tier.id}`}>
                              {t("pricing.cancel")}
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full rounded-full font-semibold border-[#0070ba]/30 text-[#003087] hover:bg-[#0070ba]/5"
                            onClick={() => {
                              if (!user) { navigate("/login"); return; }
                              setPaypalTier(tier.id);
                            }}
                            data-testid={`button-paypal-${tier.id}`}
                          >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.65h6.803c2.252 0 3.856.476 4.765 1.414.418.43.69.92.828 1.474.145.58.147 1.27.003 2.105l-.01.06v.532l.418.236c.356.188.637.404.847.644.314.358.516.802.6 1.326.088.54.06 1.18-.083 1.901-.166.84-.437 1.572-.804 2.17-.34.555-.769 1.01-1.277 1.352-.483.326-1.05.573-1.685.733-.612.155-1.31.234-2.073.234H13.39a.95.95 0 0 0-.938.8l-.038.22-.672 4.26-.03.16a.95.95 0 0 1-.938.8H7.076z"/>
                            </svg>
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

          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-trial-title">
                {t("pricing.trialPasses")}
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto" data-testid="text-trial-subtitle">
                {t("pricing.trialSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {trialPasses.map((pass) => {
                const price = isCAD ? pass.priceCAD : pass.priceUSD;
                const currency = isCAD ? "CAD" : "USD";

                return (
                  <Card
                    key={pass.id}
                    className="relative border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    data-testid={`card-trial-${pass.id}`}
                  >
                    <div className="absolute -top-3 left-4 flex gap-2">
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-3 py-1 text-xs font-semibold" data-testid={`badge-onetime-${pass.id}`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {t("pricing.oneTime")}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-600 border-gray-200 px-3 py-1 text-xs font-semibold" data-testid={`badge-limited-${pass.id}`}>
                        {t("pricing.limitedAccess")}
                      </Badge>
                    </div>
                    <CardHeader className="text-center pb-2 pt-8">
                      <CardTitle className="text-lg font-bold" data-testid={`text-trial-name-${pass.id}`}>
                        {t(pass.nameKey)}
                      </CardTitle>
                      <div className="mt-3 mb-1">
                        <span className="text-3xl font-bold text-primary" data-testid={`text-trial-price-${pass.id}`}>
                          ${price.toFixed(2)}
                        </span>
                        <span className="text-gray-400 text-sm ml-1" data-testid={`text-trial-currency-${pass.id}`}>
                          {currency}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400" data-testid={`text-trial-limit-${pass.id}`}>
                        {t(pass.limitKey)}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <ul className="space-y-2 mb-6">
                        {pass.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 text-sm ${
                              feature.included ? "text-gray-600" : "text-gray-400"
                            }`}
                            data-testid={`text-trial-feature-${pass.id}-${idx}`}
                          >
                            {feature.included ? (
                              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={feature.included ? "" : "line-through"}>{t(feature.textKey)}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full rounded-full font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all"
                        onClick={() => handleTrialPurchase(pass.id)}
                        disabled={loadingTier === pass.id}
                        data-testid={`button-trial-${pass.id}`}
                      >
                        {loadingTier === pass.id ? t("pricing.processing") : t("pricing.getPass")}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-addon-title">
                {t("pricing.addOns")}
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto" data-testid="text-addon-subtitle">
                {t("pricing.addOnsSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  id: "lab-values",
                  nameKey: "pricing.addon.labInterpretation",
                  icon: Beaker,
                  priceCAD: 9.99,
                  priceUSD: 7.99,
                  featureKeys: [
                    "pricing.addon.labFeature1",
                    "pricing.addon.labFeature2",
                    "pricing.addon.labFeature3",
                    "pricing.addon.labFeature4",
                  ],
                },
                {
                  id: "med-math",
                  nameKey: "pricing.addon.medMath",
                  icon: Calculator,
                  priceCAD: 9.99,
                  priceUSD: 7.99,
                  featureKeys: [
                    "pricing.addon.medMathFeature1",
                    "pricing.addon.medMathFeature2",
                    "pricing.addon.medMathFeature3",
                    "pricing.addon.medMathFeature4",
                  ],
                },
                {
                  id: "practice-tools",
                  nameKey: "pricing.addon.allTools",
                  icon: Zap,
                  priceCAD: 14.99,
                  priceUSD: 11.99,
                  featureKeys: [
                    "pricing.addon.allToolsFeature1",
                    "pricing.addon.allToolsFeature2",
                    "pricing.addon.allToolsFeature3",
                    "pricing.addon.allToolsFeature4",
                  ],
                  popular: true,
                },
              ].map((addon) => {
                const price = isCAD ? addon.priceCAD : addon.priceUSD;
                const currency = isCAD ? "CAD" : "USD";
                const Icon = addon.icon;
                const isPopular = "popular" in addon && addon.popular;

                return (
                  <Card
                    key={addon.id}
                    className={`relative border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      isPopular ? "ring-2 ring-primary shadow-primary/10" : ""
                    }`}
                    data-testid={`card-addon-${addon.id}`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-white px-4 py-1 text-xs font-semibold shadow-md">
                          <Star className="w-3 h-3 mr-1 fill-white" />
                          {t("pricing.bestValue")}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-2 pt-8">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-bold" data-testid={`text-addon-name-${addon.id}`}>
                        {t(addon.nameKey)}
                      </CardTitle>
                      <div className="mt-3 mb-1">
                        <span className="text-3xl font-bold text-primary" data-testid={`text-addon-price-${addon.id}`}>
                          ${price.toFixed(2)}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">
                          {currency}{t("pricing.perMo")}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <ul className="space-y-2 mb-6">
                        {addon.featureKeys.map((featureKey, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600" data-testid={`text-addon-feature-${addon.id}-${idx}`}>
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{t(featureKey)}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full rounded-full font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                        onClick={() => handleSubscribe(addon.id)}
                        disabled={loadingTier === addon.id}
                        data-testid={`button-addon-${addon.id}`}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {loadingTier === addon.id ? t("pricing.processing") : t("pricing.subscribe")}
                      </Button>
                      <p className="text-xs text-center text-gray-400 mt-2">
                        {t("pricing.includedFree")}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-primary/10" data-testid="badge-money-back">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">{t("pricing.moneyBack")}</span>
            </div>
            <LocaleLink
              href="/faq"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
              data-testid="link-faq"
            >
              <HelpCircle className="w-4 h-4" />
              {t("pricing.faqLink")}
            </LocaleLink>
          </div>
        </div>
      </main>
      <AdminEditButton />
      <Footer />
    </div>
  );
}
