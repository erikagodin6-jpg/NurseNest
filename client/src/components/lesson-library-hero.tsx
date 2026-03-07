import { Stethoscope, BarChart3, GraduationCap, ArrowRight, BookOpen, Brain, Microscope } from "lucide-react";
import { LocaleLink } from "@/lib/LocaleLink";

interface TierContent {
  headline: string;
  subheadline: string;
  stats: { value: string; label: string }[];
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  badges: string[];
}

const tierContent: Record<string, TierContent> = {
  rpn: {
    headline: "Master the Nursing Concepts Tested on the REx-PN",
    subheadline: "Clear, step-by-step lessons that simplify disease processes, nursing priorities, and safety concepts so you can confidently answer REx-PN exam questions.",
    stats: [
      { value: "240+", label: "RPN Lessons" },
      { value: "12", label: "Body Systems" },
      { value: "1000+", label: "Practice Questions" },
    ],
    primaryCta: { text: "Start Free RPN Lessons", href: "/register" },
    secondaryCta: { text: "View Study Plan", href: "/pricing" },
    badges: ["Step-by-Step Learning", "REx-PN Aligned", "Confidence Building"],
  },
  rn: {
    headline: "Master Nursing Pathophysiology the Way NCLEX Tests It",
    subheadline: "Deep clinical lessons that teach the reasoning behind disease processes so you can solve unfamiliar NCLEX questions.",
    stats: [
      { value: "500+", label: "RN Lessons" },
      { value: "12", label: "Body Systems" },
      { value: "3000+", label: "Practice Questions" },
      { value: "Adaptive", label: "Exam Simulator" },
    ],
    primaryCta: { text: "Start Studying Free", href: "/register" },
    secondaryCta: { text: "Try NCLEX Practice Questions", href: "/nclex-rn-practice-questions" },
    badges: ["Clinical Pathophysiology", "NCLEX Reasoning", "Exam Focused"],
  },
  np: {
    headline: "Master Advanced Pathophysiology for NP Certification",
    subheadline: "In-depth lessons designed to strengthen diagnostic reasoning, clinical decision-making, and certification exam performance.",
    stats: [
      { value: "800+", label: "Advanced Lessons" },
      { value: "Multi-system", label: "Pathophysiology" },
      { value: "Clinical", label: "Reasoning Modules" },
    ],
    primaryCta: { text: "Start Free Trial", href: "/register" },
    secondaryCta: { text: "Explore NP Content", href: "/np-exam-practice-questions" },
    badges: ["Advanced Practice", "Diagnostic Reasoning", "NP Certification"],
  },
};

const badgeColors = ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800", "bg-purple-100 text-purple-800"];

export function LessonLibraryHero({ activeTier }: { activeTier: string }) {
  const effectiveTier = activeTier === "pharmacology" ? "rpn" : activeTier;
  const content = tierContent[effectiveTier] || tierContent.rpn;

  return (
    <section
      data-testid="lesson-library-hero"
      className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {content.badges.map((badge, i) => (
            <span
              key={badge}
              data-testid={`badge-${badge.toLowerCase().replace(/\s+/g, "-")}`}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeColors[i % badgeColors.length]}`}
            >
              {badge}
            </span>
          ))}
        </div>

        <h1
          data-testid="hero-headline"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4"
        >
          {content.headline}
        </h1>

        <p
          data-testid="hero-subheadline"
          className="max-w-2xl mx-auto text-lg text-gray-600 mb-10"
        >
          {content.subheadline}
        </p>

        <div
          data-testid="hero-stats"
          className="flex flex-wrap items-center justify-center gap-8 mb-10"
        >
          {content.stats.map((stat) => (
            <div key={stat.label} data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LocaleLink
            href={content.primaryCta.href}
            data-testid="hero-primary-cta"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-opacity"
          >
            {content.primaryCta.text}
            <ArrowRight className="w-4 h-4" />
          </LocaleLink>
          <LocaleLink
            href={content.secondaryCta.href}
            data-testid="hero-secondary-cta"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 transition-colors"
          >
            {content.secondaryCta.text}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
