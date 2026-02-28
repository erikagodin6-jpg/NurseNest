import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown, Zap, Shield, Sparkles, BookOpen, Brain, FileText, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";

function PricingCard({ plan, price, period, isPopular, features, onSelect, loading }: {
  plan: string; price: string; period: string; isPopular?: boolean;
  features: string[]; onSelect: () => void; loading: boolean;
}) {
  return (
    <Card className={`relative ${isPopular ? "border-2 border-purple-500 shadow-xl scale-105" : "border"}`} data-testid={`card-plan-${plan}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-purple-600 text-white px-4 py-1" data-testid="badge-best-value">Best Value</Badge>
        </div>
      )}
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl">{plan === "yearly" ? "Pro Yearly" : "Pro Monthly"}</CardTitle>
        <div className="mt-2">
          <span className="text-4xl font-bold" data-testid={`text-price-${plan}`}>{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        {plan === "yearly" && (
          <p className="text-sm text-green-600 font-medium mt-1" data-testid="text-savings">Save $20.88/year vs monthly</p>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          size="lg"
          onClick={onSelect}
          disabled={loading}
          data-testid={`button-upgrade-${plan}`}
        >
          {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Crown className="mr-2 h-4 w-4" />}
          {loading ? "Processing..." : "Upgrade Now"}
        </Button>
      </CardContent>
    </Card>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "Total Flashcards", free: "300", pro: "Unlimited" },
    { feature: "AI Flashcard Generation", free: false, pro: true },
    { feature: "Spaced Repetition", free: false, pro: true },
    { feature: "Exam-Mode Testing", free: false, pro: true },
    { feature: "Export to PDF", free: false, pro: true },
    { feature: "Create Custom Decks", free: true, pro: true },
    { feature: "Browse Public Decks", free: true, pro: true },
    { feature: "Study Modes", free: "Basic", pro: "All Modes" },
    { feature: "Priority Support", free: false, pro: true },
  ];

  return (
    <div className="overflow-x-auto" data-testid="comparison-table">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Feature</th>
            <th className="text-center py-3 px-4">Free</th>
            <th className="text-center py-3 px-4 bg-purple-50">Pro</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b">
              <td className="py-3 px-4 font-medium">{row.feature}</td>
              <td className="text-center py-3 px-4">
                {typeof row.free === "boolean" ? (
                  row.free ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                ) : row.free}
              </td>
              <td className="text-center py-3 px-4 bg-purple-50">
                {typeof row.pro === "boolean" ? (
                  row.pro ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                ) : <span className="font-medium text-purple-700">{row.pro}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UpgradePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("session_id");

  const { data: usage } = useQuery({
    queryKey: ["/api/flashcard-usage", user?.id],
    queryFn: () => fetch(`/api/flashcard-usage/${user?.id}`).then(r => r.json()),
    enabled: !!user?.id,
  });

  const verifyMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/flashcard-upgrade/verify", {
        sessionId,
        userId: user?.id,
      });
      return res.json();
    },
    onSuccess: () => {
      window.location.href = "/flashcards";
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (plan: string) => {
      setSelectedPlan(plan);
      const res = await apiRequest("POST", "/api/flashcard-upgrade/checkout", {
        userId: user?.id,
        plan,
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      return data;
    },
  });

  if (searchParams.has("session_id") && !verifyMutation.isSuccess) {
    if (!verifyMutation.isPending && !verifyMutation.isError) {
      verifyMutation.mutate();
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            {verifyMutation.isPending ? (
              <>
                <Loader2 className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold">Verifying your upgrade...</h2>
                <p className="text-muted-foreground mt-2">Please wait while we activate your Pro account.</p>
              </>
            ) : verifyMutation.isError ? (
              <>
                <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold">Verification Failed</h2>
                <p className="text-muted-foreground mt-2">Please contact support if this issue persists.</p>
                <Button className="mt-4" onClick={() => navigate("/upgrade")}>Try Again</Button>
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (usage?.isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center">
            <Crown className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold" data-testid="text-already-pro">You're on the Pro Plan!</h2>
            <p className="text-muted-foreground mt-2">You have unlimited flashcards and all premium features.</p>
            <Link href="/flashcards">
              <Button className="mt-6" data-testid="button-go-flashcards">Go to Flashcards</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const proFeatures = [
    "Unlimited flashcards (no 300 limit)",
    "AI-powered flashcard generation",
    "Spaced repetition study mode",
    "Exam-mode testing with scoring",
    "Export decks to PDF",
    "Priority content indexing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="bg-purple-100 text-purple-700 mb-4" data-testid="badge-upgrade-header">
            <Sparkles className="h-3 w-3 mr-1" /> Upgrade to Pro
          </Badge>
          <h1 className="text-4xl font-bold mb-3" data-testid="text-upgrade-title">
            Unlock Unlimited Flashcards
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't let a card limit slow your studying. Upgrade to Pro and create as many flashcards as you need to ace your exams.
          </p>

          {usage && !usage.isPremium && (
            <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-800" data-testid="text-usage-banner">
                You've used {usage.used} of {usage.limit} free cards ({usage.percentage}%)
              </span>
            </div>
          )}
        </div>

        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="line-through text-gray-400">Quizlet+ $7.99/month</span>
            <span className="ml-2 text-green-600 font-semibold" data-testid="text-cheaper">NurseNest Pro — nearly 40% cheaper</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          <PricingCard
            plan="monthly"
            price="$4.99"
            period="month"
            features={proFeatures}
            onSelect={() => checkoutMutation.mutate("monthly")}
            loading={checkoutMutation.isPending && selectedPlan === "monthly"}
          />
          <PricingCard
            plan="yearly"
            price="$39"
            period="year"
            isPopular
            features={[...proFeatures, "2 months free vs monthly"]}
            onSelect={() => checkoutMutation.mutate("yearly")}
            loading={checkoutMutation.isPending && selectedPlan === "yearly"}
          />
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Free vs Pro Comparison</h2>
          <ComparisonTable />
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center p-6">
            <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Built for Nursing Students</h3>
            <p className="text-sm text-muted-foreground">Thousands of cards created weekly by nursing students preparing for NCLEX and REX-PN.</p>
          </Card>
          <Card className="text-center p-6">
            <Brain className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">AI-Powered Learning</h3>
            <p className="text-sm text-muted-foreground">Generate clinically accurate flashcards instantly with our AI trained on nursing content.</p>
          </Card>
          <Card className="text-center p-6">
            <Shield className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">30-Day Guarantee</h3>
            <p className="text-sm text-muted-foreground">Not satisfied? Get a full refund within 30 days, no questions asked.</p>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Cancel anytime. Subscriptions are managed through Stripe. Your data is always yours.
          </p>
        </div>
      </div>
    </div>
  );
}
