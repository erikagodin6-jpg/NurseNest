import { Users, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const audienceKeys = [
  "hero.trustIndicator.nursingStudents",
  "hero.trustIndicator.newGradNurses",
  "hero.trustIndicator.alliedHealth",
  "hero.trustIndicator.certCandidates",
];

export default function HeroTrustIndicator() {
  const { t } = useI18n();

  return (
    <section
      className="bg-white border-y border-gray-100 py-4 sm:py-5"
      data-testid="section-hero-trust-indicator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold text-gray-800" data-testid="text-built-for-badge">{t("hero.trustIndicator.builtFor")}</span>
          </div>
          <span className="hidden sm:inline text-gray-300">|</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {audienceKeys.map((key) => {
              const label = t(key);
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600"
                  data-testid={`audience-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Users className="w-3 h-3 text-gray-400" />
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
