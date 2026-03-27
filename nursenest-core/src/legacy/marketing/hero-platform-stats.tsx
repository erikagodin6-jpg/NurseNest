"use client";

import {
  HelpCircle,
  FileText,
  Layers,
  BookOpen,
  Stethoscope,
  Globe,
  Languages,
  ClipboardCheck,
} from "lucide-react";

function formatStat(n: number | undefined): string {
  if (!n || n === 0) return "---";
  if (n >= 10000) {
    const thousands = Math.floor(n / 1000);
    return `${thousands.toLocaleString()},000+`;
  }
  if (n >= 1000) {
    const hundreds = Math.floor(n / 100) * 100;
    return `${hundreds.toLocaleString()}+`;
  }
  const tens = Math.floor(n / 10) * 10;
  return `${tens}+`;
}

/**
 * Restored from `client/src/components/hero-platform-stats.tsx`.
 * React Query removed: stats use the same fallbacks as the legacy app when proof is unavailable (no extra deps).
 */
export default function HeroPlatformStats() {
  const stats = [
    { icon: HelpCircle, label: "Practice Questions", value: formatStat(undefined), color: "text-blue-600", bg: "bg-blue-50" },
    { icon: ClipboardCheck, label: "Mock Exams", value: "50+", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: Layers, label: "Flashcards", value: formatStat(undefined), color: "text-violet-600", bg: "bg-violet-50" },
    { icon: BookOpen, label: "Lessons", value: formatStat(undefined), color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Stethoscope, label: "Clinical Simulations", value: "25+", color: "text-rose-600", bg: "bg-rose-50" },
    { icon: FileText, label: "Supported Exams", value: "30+", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: Globe, label: "Countries", value: "10+", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: Languages, label: "Languages", value: "20", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <section
      className="border-y border-gray-100 bg-gradient-to-b from-gray-50 to-white"
      style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
      data-testid="section-platform-stats"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-bold text-gray-900" style={{ fontSize: "var(--text-section)" }} data-testid="text-platform-stats-heading">
            Your Complete Healthcare Exam Preparation Platform
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-500 lg:text-lg">
            Everything you need to pass your nursing, NP, or allied health exam — built by educators, backed by evidence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]"
              data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div
                className="mb-1 text-2xl font-extrabold text-gray-900 sm:text-3xl"
                data-testid={`stat-value-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {stat.value}
              </div>
              <div className="text-xs font-medium text-gray-500 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
