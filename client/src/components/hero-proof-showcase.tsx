import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  BookOpen,
  FileText,
  Target,
  TrendingUp,
  Sparkles,
  Lightbulb,
  Brain,
} from "lucide-react";

interface ScreenshotSources {
  srcSet: string;
  thumbSrcSet: string;
  fallback: string;
  thumbFallback: string;
  width: number;
  height: number;
}

function getScreenshotSources(name: string, origWidth: number, origHeight: number): ScreenshotSources {
  const base = `/screenshots/${name}`;
  return {
    srcSet: `${base}-480w.webp 480w, ${base}-768w.webp 768w, ${base}-1200w.webp 1200w, ${base}-full.webp ${origWidth}w`,
    thumbSrcSet: `${base}-thumb-160w.webp 160w, ${base}-thumb-240w.webp 240w`,
    fallback: `${base}-768w.webp`,
    thumbFallback: `${base}-thumb-160w.webp`,
    width: origWidth,
    height: origHeight,
  };
}

const screenshotData: Record<string, ScreenshotSources> = {
  screenshot2: getScreenshotSources("screenshot2_1773379293573", 2730, 1588),
  screenshot9: getScreenshotSources("screenshot9_1773379293573", 2282, 1186),
  screenshotTest: getScreenshotSources("screenshottest_1773379293573", 2048, 1590),
  screenshot6: getScreenshotSources("screenshot6_1773379293573", 2524, 1448),
  screenshot11: getScreenshotSources("screenshot11_1773379293573", 2510, 1588),
  screenshot3: getScreenshotSources("screenshot3_1773379293573", 2528, 1602),
  screenshot5: getScreenshotSources("screenshot5_1773379293573", 2538, 1610),
  screenshot10: getScreenshotSources("screenshot10_1773379293573", 2264, 1580),
};

const showcaseItems = [
  {
    id: "adaptive-performance",
    imageKey: "screenshot2" as const,
    title: "See exactly where you stand",
    blurb: "Real-time readiness insights help learners identify strengths, weak areas, and their most important next steps before exam day.",
    tags: ["Readiness Score", "Pass Probability", "Growth Tracking"],
  },
  {
    id: "ngn-case-study",
    imageKey: "screenshot9" as const,
    title: "Strengthen clinical judgment",
    blurb: "Interactive case studies help learners connect patient data, prioritization, and nursing decision-making in a realistic workflow.",
    tags: ["Bowtie", "NGN", "Clinical Judgment"],
  },
  {
    id: "exam-style-questions",
    imageKey: "screenshotTest" as const,
    title: "Get comfortable with exam-style practice",
    blurb: "Students can practice realistic nursing questions with clean exam-style layouts, timed sets, and focused rationale review.",
    tags: ["Multiple Choice", "SATA", "Exam Mode"],
  },
  {
    id: "flashcard-mastery",
    imageKey: "screenshot6" as const,
    title: "Improve retention with spaced repetition",
    blurb: "Smart flashcard tracking helps learners review high-yield concepts, strengthen memory, and stay consistent over time.",
    tags: ["Retention", "Review Queue", "Mastery"],
  },
  {
    id: "study-plan",
    imageKey: "screenshot11" as const,
    title: "Follow a plan built around your performance",
    blurb: "Personalized weekly study plans turn weak areas into structured action steps so learners know exactly what to do next.",
    tags: ["Weekly Plan", "Focus Areas", "Readiness Goal"],
  },
  {
    id: "category-performance",
    imageKey: "screenshot3" as const,
    title: "Target weak areas faster",
    blurb: "Domain-level breakdowns help students focus their study time on the content areas that will improve scores the most.",
    tags: ["Pharmacology", "Prioritization", "Fundamentals"],
  },
  {
    id: "session-analysis",
    imageKey: "screenshot5" as const,
    title: "Review every readiness check in detail",
    blurb: "Session analytics show score trends, percentile performance, confidence patterns, and category-level results after each adaptive set.",
    tags: ["Session Review", "Confidence Analysis", "Percentile"],
  },
  {
    id: "progress-comparison",
    imageKey: "screenshot10" as const,
    title: "Watch your improvement over time",
    blurb: "Comparison views make it easy to see growth across sessions, identify recurring problem areas, and stay motivated.",
    tags: ["Score Trends", "Improvement", "Progress"],
  },
];

const trustBullets = [
  "Adaptive readiness tracking",
  "NGN and SATA-style practice",
  "Flashcards, rationales, and study plans",
  "Built for real nursing exam prep",
];

const proofBadges = [
  { icon: BarChart3, label: "Adaptive Analytics" },
  { icon: Target, label: "Personalized Study Plans" },
  { icon: Lightbulb, label: "Detailed Rationales" },
  { icon: FileText, label: "Exam-Style Practice" },
];

const socialProofCards = [
  { icon: BarChart3, text: "Adaptive reports that highlight weak areas" },
  { icon: Target, text: "Study plans that turn insights into action" },
  { icon: Brain, text: "Rationales that teach clinical thinking" },
  { icon: BookOpen, text: "Practice modes designed for modern nursing exams" },
];

export function HeroProofShowcase() {
  const [, setLocation] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 200);
    },
    [isTransitioning, activeIndex],
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % showcaseItems.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + showcaseItems.length) % showcaseItems.length);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (thumbnailStripRef.current) {
      const thumb = thumbnailStripRef.current.children[activeIndex] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeIndex]);

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (activeIndex + 1) % showcaseItems.length;
        goTo(next);
        const strip = thumbnailStripRef.current;
        if (strip) (strip.children[next] as HTMLElement)?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (activeIndex - 1 + showcaseItems.length) % showcaseItems.length;
        goTo(prev);
        const strip = thumbnailStripRef.current;
        if (strip) (strip.children[prev] as HTMLElement)?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
        const strip = thumbnailStripRef.current;
        if (strip) (strip.children[0] as HTMLElement)?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const last = showcaseItems.length - 1;
        goTo(last);
        const strip = thumbnailStripRef.current;
        if (strip) (strip.children[last] as HTMLElement)?.focus();
      }
    },
    [activeIndex, goTo],
  );

  const current = showcaseItems[activeIndex];
  const currentSrc = screenshotData[current.imageKey];

  return (
    <section
      className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
      data-testid="section-hero-proof-showcase"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[-8%] w-[400px] h-[400px] rounded-full bg-purple-100/40 blur-3xl" />
        <div className="absolute bottom-[5%] left-[-5%] w-[350px] h-[350px] rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/60">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Platform Preview
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight tracking-tight"
              data-testid="text-proof-headline"
            >
              Pass with confidence using adaptive nursing practice that feels like the real exam
            </h2>

            <p
              className="text-lg text-gray-600 leading-relaxed"
              data-testid="text-proof-subheadline"
            >
              NurseNest helps nursing students strengthen weak areas, build confidence, and track
              readiness with realistic questions, flashcards, case studies, analytics, and
              personalized study plans.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 text-white w-full sm:w-auto"
                onClick={() => setLocation("/register")}
                data-testid="button-proof-start-practicing"
              >
                Start Practicing
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 text-gray-700 bg-white/60 w-full sm:w-auto"
                onClick={() => {
                  const el = document.getElementById("how-it-works");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-proof-see-how"
              >
                See How It Works
              </Button>
            </div>

            <ul className="space-y-2.5 pt-2">
              {trustBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2">
              {proofBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-purple-100 shadow-sm text-xs font-medium text-gray-600"
                  data-testid={`badge-proof-${badge.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <badge.icon className="w-3.5 h-3.5 text-purple-400" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <div
                className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100"
                role="tabpanel"
                id={`proof-tabpanel-${current.id}`}
                aria-labelledby={`proof-tab-${current.id}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                  <img
                    srcSet={currentSrc.srcSet}
                    sizes="(max-width: 640px) 480px, (max-width: 1024px) 768px, 1200px"
                    src={currentSrc.fallback}
                    alt={current.title}
                    width={currentSrc.width}
                    height={currentSrc.height}
                    className={`w-full h-full object-cover object-top transition-opacity duration-200 ${
                      isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                    loading={activeIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={activeIndex === 0 ? "high" : undefined}
                    data-testid="img-proof-featured"
                  />

                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-purple-100/50 hidden sm:flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-bold text-gray-700">+8% improvement</span>
                  </div>
                </div>

                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Previous screenshot"
                  data-testid="button-proof-prev"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Next screenshot"
                  data-testid="button-proof-next"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="mt-4 px-1">
                <h3
                  className="text-base font-bold text-gray-900"
                  data-testid="text-proof-screenshot-title"
                >
                  {current.title}
                </h3>
                <p
                  className="text-sm text-gray-500 mt-1 leading-relaxed"
                  data-testid="text-proof-screenshot-blurb"
                >
                  {current.blurb}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100"
                      data-testid={`tag-proof-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={thumbnailStripRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent -mx-1 px-1 snap-x snap-mandatory"
              role="tablist"
              aria-label="Screenshot thumbnails"
              onKeyDown={handleTabKeyDown}
            >
              {showcaseItems.map((item, idx) => {
                const thumbSrc = screenshotData[item.imageKey];
                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(idx)}
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-controls={`proof-tabpanel-${item.id}`}
                    id={`proof-tab-${item.id}`}
                    tabIndex={idx === activeIndex ? 0 : -1}
                    aria-label={`View ${item.title}`}
                    className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 snap-start ${
                      idx === activeIndex
                        ? "border-purple-400 ring-2 ring-purple-200 shadow-md scale-105"
                        : "border-gray-200 hover:border-purple-200 opacity-70 hover:opacity-100"
                    }`}
                    data-testid={`thumb-proof-${item.id}`}
                  >
                    <img
                      src={thumbSrc.thumbFallback}
                      srcSet={thumbSrc.thumbSrcSet}
                      sizes="80px"
                      alt={item.title}
                      width={80}
                      height={56}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-10 max-w-2xl mx-auto" data-testid="text-proof-microcopy">
          From readiness analytics to NGN case studies, NurseNest shows students exactly what to
          study next.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {socialProofCards.map((card) => (
            <div
              key={card.text}
              className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              data-testid={`card-social-proof-${card.text.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <card.icon className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
