"use client";

import Link from "next/link";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import {
  Globe,
  Languages,
  BookOpen,
  Stethoscope,
  FlaskConical,
  Droplets,
  GraduationCap,
  Brain,
  Target,
  HeartPulse,
  Baby,
  Pill,
  Activity,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

/** Maps legacy SPA routes to NurseNest Core routes (same destinations, stable app). */
const CORE_HREF: Record<string, string> = {
  "/exam-prep": "/pricing",
  "/lessons": "/app/lessons",
  "/nursing-specialties": "/app/lessons",
  "/flashcards": "/app/questions",
  "/mock-exams": "/app/exams",
};

/** Restored from `client/src/components/home-hero-features.tsx` (links adapted for Next + Core). */
export default function HomeHeroFeatures() {
  const { t } = useMarketingI18n();

  const platformCapabilities = [
    { icon: Languages, labelKey: "home.heroFeatures.multilingual", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: BookOpen, labelKey: "home.heroFeatures.examPrep", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: Stethoscope, labelKey: "home.heroFeatures.clinicalScenarios", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Brain, labelKey: "home.heroFeatures.pathophysiology", color: "text-violet-600", bg: "bg-violet-50" },
    { icon: FlaskConical, labelKey: "home.heroFeatures.labValues", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: Droplets, labelKey: "home.heroFeatures.bloodTransfusion", color: "text-rose-600", bg: "bg-rose-50" },
    { icon: GraduationCap, labelKey: "home.heroFeatures.newGrad", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const trustItems = [
    { icon: ShieldCheck, labelKey: "home.heroFeatures.trustEvidence" },
    { icon: Target, labelKey: "home.heroFeatures.trustExamAligned" },
    { icon: Brain, labelKey: "home.heroFeatures.trustClinicalReasoning" },
    { icon: Activity, labelKey: "home.heroFeatures.trustRetention" },
  ];

  const learningAreas = [
    { icon: Target, labelKey: "home.heroFeatures.areaPracticeQuestions", href: "/exam-prep", color: "from-blue-500 to-indigo-600" },
    { icon: Brain, labelKey: "home.heroFeatures.areaClinicalReasoning", href: "/lessons", color: "from-violet-500 to-purple-600" },
    { icon: FlaskConical, labelKey: "home.heroFeatures.areaLabInterpretation", href: "/lessons", color: "from-amber-500 to-orange-600" },
    { icon: HeartPulse, labelKey: "home.heroFeatures.areaCriticalCare", href: "/nursing-specialties", color: "from-rose-500 to-red-600" },
    { icon: Baby, labelKey: "home.heroFeatures.areaPediatric", href: "/lessons", color: "from-pink-500 to-rose-600" },
    { icon: Pill, labelKey: "home.heroFeatures.areaPharmacology", href: "/flashcards", color: "from-emerald-500 to-teal-600" },
    { icon: Activity, labelKey: "home.heroFeatures.areaPrioritization", href: "/mock-exams", color: "from-indigo-500 to-blue-600" },
  ];

  return (
    <>
      <section
        className="border-t border-gray-100 bg-gradient-to-b from-gray-50/80 to-white"
        style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
        data-testid="section-feature-highlight-bar"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {platformCapabilities.map((cap) => (
              <div
                key={cap.labelKey}
                className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-2 shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]"
                data-testid={`feature-pill-${cap.labelKey.split(".").pop()}`}
              >
                <div className={`h-7 w-7 shrink-0 rounded-lg ${cap.bg} flex items-center justify-center`}>
                  <cap.icon className={`h-3.5 w-3.5 ${cap.color}`} />
                </div>
                <span className="whitespace-nowrap text-xs font-medium text-gray-700 sm:text-sm">{t(cap.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-gradient-to-r from-primary/5 via-blue-50/50 to-primary/5" data-testid="section-multilingual-callout">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Globe className="text-primary h-4.5 w-4.5" />
            </div>
            <p className="text-sm font-medium text-gray-700 sm:text-base" data-testid="text-multilingual-callout">
              {t("home.heroFeatures.multilingualCallout")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white" data-testid="section-trust-authority">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {trustItems.map((item) => (
              <div key={item.labelKey} className="flex items-center gap-2 text-sm text-gray-600" data-testid={`trust-item-${item.labelKey.split(".").pop()}`}>
                <item.icon className="text-emerald-500 h-4.5 w-4.5 shrink-0" />
                <span className="font-medium">{t(item.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-b border-gray-100"
        style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
        data-testid="section-learning-areas-grid"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-bold text-gray-900" style={{ fontSize: "var(--text-section)" }} data-testid="text-learning-areas-heading">
              {t("home.heroFeatures.learningAreasHeading")}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-500 lg:text-lg">{t("home.heroFeatures.learningAreasSubtitle")}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {learningAreas.map((area) => (
              <Link
                key={area.labelKey}
                href={CORE_HREF[area.href] ?? area.href}
                className="group no-underline rounded-2xl border border-gray-100/80 bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                data-testid={`card-learning-area-${area.labelKey.split(".").pop()}`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${area.color} shadow-sm transition-transform group-hover:scale-110`}
                >
                  <area.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-gray-900">{t(area.labelKey)}</h3>
                <div className="flex items-center text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>{t("home.heroFeatures.explore")}</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
