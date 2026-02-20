import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, HelpCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    id: "rpn",
    nameCA: "RPN",
    nameUS: "LVN",
    priceUSD: 21.99,
    priceCAD: 29.99,
    features: [
      "All RPN/LVN pathophysiology lessons",
      "Flashcards by body system",
      "Note-taking with auto-save",
      "Progress tracking & report card",
      "Pre/Post test scoring",
      "REX-PN exam preparation",
    ],
    popular: false,
  },
  {
    id: "rn",
    nameCA: "RN/NCLEX",
    nameUS: "RN/NCLEX",
    priceUSD: 29.99,
    priceCAD: 39.99,
    features: [
      "All RN-level clinical content",
      "NCLEX-style question bank",
      "Advanced pharmacology",
      "Clinical decision-making modules",
      "Timed practice exams",
      "Comprehensive rationales",
    ],
    popular: true,
  },
  {
    id: "np",
    nameCA: "NP Advanced",
    nameUS: "NP Advanced",
    priceUSD: 36.99,
    priceCAD: 49.99,
    features: [
      "Advanced practice content",
      "Molecular-level pathophysiology",
      "Diagnostic reasoning modules",
      "Prescriptive authority content",
      "NP certification prep",
      "Evidence-based practice",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  useEffect(() => {
    const handleRegionChange = () => {
      setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
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
        body: JSON.stringify({ userId: user.id, tier: tierId }),
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
        title: "Checkout Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoadingTier(null);
    }
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <Navigation />
      <main className="flex-1 px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="text-pricing-title">
              Choose Your Learning Path
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
              Unlock comprehensive nursing education content tailored to your certification level.
              {isCAD ? " Prices shown in CAD." : " Prices shown in USD."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {tiers.map((tier) => {
              const name = isCAD ? tier.nameCA : tier.nameUS;
              const price = isCAD ? tier.priceCAD : tier.priceUSD;
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
                        Most Popular
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
                        {currency}/mo
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600" data-testid={`text-feature-${tier.id}-${idx}`}>
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
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
                      {loadingTier === tier.id ? "Processing..." : "Subscribe Now"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-primary/10" data-testid="badge-money-back">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">30-Day Money-Back Guarantee</span>
            </div>
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
              data-testid="link-faq"
            >
              <HelpCircle className="w-4 h-4" />
              Have questions? Check our FAQ
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
