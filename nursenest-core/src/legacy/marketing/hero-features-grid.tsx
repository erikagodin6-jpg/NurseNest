"use client";

import Link from "next/link";
import { PLATFORM_FEATURES } from "@shared/platform-manifest";
import {
  Zap,
  MessageSquareText,
  BookOpen,
  Brain,
  BarChart3,
  GraduationCap,
  Stethoscope,
  Globe,
  Languages,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { mapLegacyMarketingHref } from "@/lib/legacy-marketing-routes";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  adaptiveTesting: Zap,
  explanationEngine: MessageSquareText,
  studyGuides: BookOpen,
  flashcards: Brain,
  readinessPredictor: BarChart3,
  aiTutor: GraduationCap,
  clinicalSimulator: Stethoscope,
  globalQuestionBanks: Globe,
  multiLanguage: Languages,
  mockExams: ClipboardCheck,
};

const FEATURE_COLORS: Record<string, { color: string; bg: string; gradient: string }> = {
  adaptiveTesting: { color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-500 to-indigo-600" },
  explanationEngine: { color: "text-emerald-600", bg: "bg-emerald-50", gradient: "from-emerald-500 to-teal-600" },
  studyGuides: { color: "text-violet-600", bg: "bg-violet-50", gradient: "from-violet-500 to-purple-600" },
  flashcards: { color: "text-amber-600", bg: "bg-amber-50", gradient: "from-amber-500 to-orange-600" },
  readinessPredictor: { color: "text-indigo-600", bg: "bg-indigo-50", gradient: "from-indigo-500 to-blue-600" },
  aiTutor: { color: "text-purple-600", bg: "bg-purple-50", gradient: "from-purple-500 to-violet-600" },
  clinicalSimulator: { color: "text-rose-600", bg: "bg-rose-50", gradient: "from-rose-500 to-red-600" },
  globalQuestionBanks: { color: "text-teal-600", bg: "bg-teal-50", gradient: "from-teal-500 to-cyan-600" },
  multiLanguage: { color: "text-sky-600", bg: "bg-sky-50", gradient: "from-sky-500 to-blue-600" },
  mockExams: { color: "text-orange-600", bg: "bg-orange-50", gradient: "from-orange-500 to-amber-600" },
};

export default function HeroFeaturesGrid() {
  const { t } = useMarketingI18n();
  return (
    <section
      className="bg-white"
      style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
      data-testid="section-features-grid"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-bold text-gray-900" style={{ fontSize: "var(--text-section)" }} data-testid="text-features-grid-heading">
            Every Tool You Need to Pass
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-500 lg:text-lg">
            NurseNest combines adaptive testing, clinical reasoning, and smart study tools into one comprehensive platform.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_FEATURES.map((feature) => {
            const Icon = FEATURE_ICONS[feature.key] || Globe;
            const colors = FEATURE_COLORS[feature.key] || { color: "text-gray-600", bg: "bg-gray-50", gradient: "from-gray-500 to-gray-600" };

            return (
              <Link
                key={feature.key}
                href={mapLegacyMarketingHref(feature.route)}
                className="group no-underline rounded-2xl border border-gray-100 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                data-testid={`card-feature-${feature.key}`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colors.gradient} shadow-sm transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900">{feature.headline}</h3>
                <p className="mb-3 text-sm leading-relaxed text-gray-500">{feature.description}</p>
                <div className="flex items-center text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>{t("components.heroFeaturesGrid.learnMore")}</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
