import { useState, useEffect } from "react";
import { BookOpen, Brain, FlaskConical, Stethoscope, FileText, ArrowRight, Globe } from "lucide-react";
import { LocaleLink } from "@/lib/LocaleLink";

interface RelatedResource {
  title: string;
  href: string;
  description: string;
  icon?: "lesson" | "flashcard" | "qbank" | "simulator" | "article" | "allied";
}

const ICON_MAP = {
  lesson: BookOpen,
  flashcard: Brain,
  qbank: FlaskConical,
  simulator: Stethoscope,
  article: FileText,
  allied: Globe,
};

interface RelatedResourcesProps {
  resources: RelatedResource[];
  title?: string;
  className?: string;
}

export function RelatedResources({ resources, title = "Related Resources", className = "" }: RelatedResourcesProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <section className={`py-8 ${className}`} data-testid="related-resources-section">
      <h2 className="text-xl font-bold text-gray-900 mb-4" data-testid="text-related-title">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, i) => {
          const IconComp = ICON_MAP[resource.icon || "lesson"];
          return (
            <LocaleLink
              key={i}
              href={resource.href}
              className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
              data-testid={`link-related-resource-${i}`}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                <IconComp className="w-4.5 h-4.5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{resource.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{resource.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
            </LocaleLink>
          );
        })}
      </div>
    </section>
  );
}

interface CrossPlatformLink {
  title: string;
  href: string;
  description: string;
  source: string;
  track?: string;
}

interface CrossPlatformRelatedContentProps {
  slug: string;
  source?: "nursing" | "allied";
  className?: string;
}

export function CrossPlatformRelatedContent({ slug, source = "nursing", className = "" }: CrossPlatformRelatedContentProps) {
  const [links, setLinks] = useState<CrossPlatformLink[]>([]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/cross-platform-related?slug=${encodeURIComponent(slug)}&source=${source}`)
      .then(r => r.ok ? r.json() : { related: [] })
      .then(data => setLinks(data.related || []))
      .catch(() => {});
  }, [slug, source]);

  if (links.length === 0) return null;

  const trackColors: Record<string, string> = {
    "respiratory-therapy": "bg-blue-100 text-blue-700",
    "pharmacy-tech": "bg-green-100 text-green-700",
    "paramedic": "bg-red-100 text-red-700",
    "medical-lab-technologist": "bg-purple-100 text-purple-700",
    "medical-imaging": "bg-amber-100 text-amber-700",
    "ultrasound": "bg-cyan-100 text-cyan-700",
    "physical-therapy-assistant": "bg-teal-100 text-teal-700",
    "occupational-therapy-assistant": "bg-indigo-100 text-indigo-700",
    "nursing": "bg-violet-100 text-violet-700",
  };

  return (
    <section className={`py-6 ${className}`} data-testid="cross-platform-related">
      <h2 className="text-lg font-bold text-gray-900 mb-3" data-testid="text-cross-platform-title">
        {source === "nursing" ? "Related Allied Health Content" : "Related Nursing Content"}
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link, i) => (
          <LocaleLink
            key={i}
            href={link.href}
            className="group flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
            data-testid={`link-cross-platform-${i}`}
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{link.title}</h3>
                {link.track && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap ${trackColors[link.track] || "bg-gray-100 text-gray-600"}`}>
                    {link.track.replace(/-/g, " ")}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{link.description}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary shrink-0 mt-1 transition-colors" />
          </LocaleLink>
        ))}
      </div>
    </section>
  );
}

export const STUDY_CROSS_LINKS: Record<string, RelatedResource[]> = {
  lessons: [
    { title: "Practice Flashcards", href: "/flashcards", description: "Reinforce lesson concepts with pharmacology and clinical flashcards.", icon: "flashcard" },
    { title: "Question Bank", href: "/question-bank", description: "Test your knowledge with practice questions organized by body system.", icon: "qbank" },
    { title: "Clinical Simulations", href: "/case-simulations", description: "Apply your learning in branching clinical case scenarios.", icon: "simulator" },
    { title: "Med Math Practice", href: "/med-math", description: "Practice dosage calculations and medication math problems.", icon: "qbank" },
    { title: "Lab Values Review", href: "/lab-values", description: "Master abnormal lab value interpretation and clinical correlations.", icon: "lesson" },
    { title: "Mock Exams", href: "/mock-exams", description: "Take timed practice tests simulating the real exam experience.", icon: "qbank" },
  ],
  flashcards: [
    { title: "Clinical Lessons", href: "/lessons", description: "Deepen your understanding with pathophysiology and clinical lessons.", icon: "lesson" },
    { title: "Medication Mastery", href: "/medication-mastery", description: "Explore drug mechanisms of action at the receptor level.", icon: "lesson" },
    { title: "Question Bank", href: "/question-bank", description: "Apply flashcard knowledge to practice questions.", icon: "qbank" },
    { title: "Clinical Clarity", href: "/clinical-clarity", description: "Understand the 'why' behind clinical phenomena.", icon: "article" },
  ],
  qbank: [
    { title: "Clinical Lessons", href: "/lessons", description: "Review pathophysiology topics for questions you missed.", icon: "lesson" },
    { title: "Flashcards", href: "/flashcards", description: "Memorize key concepts with spaced repetition flashcards.", icon: "flashcard" },
    { title: "Mock Exams", href: "/mock-exams", description: "Simulate the real exam with timed, adaptive mock tests.", icon: "qbank" },
    { title: "Case Simulations", href: "/case-simulations", description: "Practice clinical decision-making in scenario-based learning.", icon: "simulator" },
  ],
  mockExams: [
    { title: "Question Bank", href: "/question-bank", description: "Practice more questions organized by body system and difficulty.", icon: "qbank" },
    { title: "Clinical Lessons", href: "/lessons", description: "Review topics where you scored lower on the mock exam.", icon: "lesson" },
    { title: "Flashcards", href: "/flashcards", description: "Quick review of pharmacology and clinical concepts.", icon: "flashcard" },
    { title: "Lab Values", href: "/lab-values", description: "Strengthen lab interpretation skills tested on exams.", icon: "lesson" },
  ],
  simulators: [
    { title: "Clinical Lessons", href: "/lessons", description: "Build foundational knowledge for clinical simulations.", icon: "lesson" },
    { title: "Question Bank", href: "/question-bank", description: "Practice NCLEX-style questions after simulations.", icon: "qbank" },
    { title: "Mock Exams", href: "/mock-exams", description: "Test your readiness with full-length practice exams.", icon: "qbank" },
    { title: "Medication Mastery", href: "/medication-mastery", description: "Review drug actions relevant to clinical scenarios.", icon: "lesson" },
  ],
};
