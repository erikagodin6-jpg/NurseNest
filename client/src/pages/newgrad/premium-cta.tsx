import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Sparkles, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export function PremiumUpgradeCTA({ context }: { context?: string }) {
  const { user } = useAuth();
  const hasAccess = user?.tier === "newgrad" || user?.tier === "admin";

  if (hasAccess) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-2xl border border-indigo-100 p-8 my-8" data-testid="premium-upgrade-cta">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Unlock the New Grad Success Toolkit</h3>
          <p className="text-sm text-gray-600 mb-4">
            {context || "Get full access to premium resume templates, the complete interview question bank with detailed answers, salary negotiation strategies, and career planning frameworks."}
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            {["Resume Builder & Templates", "Full Interview Bank", "Salary Guides", "Career Frameworks"].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> {item}
              </span>
            ))}
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm" data-testid="button-premium-upgrade">
            <Lock className="w-3.5 h-3.5" /> Upgrade Now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PremiumContentGate({ children, previewContent }: { children: React.ReactNode; previewContent?: React.ReactNode }) {
  const { user } = useAuth();
  const hasAccess = user?.tier === "newgrad" || user?.tier === "admin";

  if (hasAccess) return <>{children}</>;

  return (
    <div>
      {previewContent && (
        <div className="relative">
          {previewContent}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>
      )}
      <PremiumUpgradeCTA />
    </div>
  );
}

export function useNewGradAccess() {
  const { user } = useAuth();
  return {
    hasAccess: user?.tier === "newgrad" || user?.tier === "admin",
    user,
  };
}
