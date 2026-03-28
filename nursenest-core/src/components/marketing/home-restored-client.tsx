"use client";

import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  BookOpen,
  CheckCircle2,
  MapPin,
  Trophy,
  HelpCircle,
  Layers,
  Users,
  Brain,
  Target,
  ClipboardList,
  Stethoscope,
  GraduationCap,
  Heart,
  Briefcase,
  Award,
  Sparkles,
} from "lucide-react";
import { getEnabledCareers } from "@shared/careers";
import { useMarketingI18n } from "@/lib/marketing-i18n";
import { mapLegacyMarketingHref } from "@/lib/legacy-marketing-routes";
import { useNursenestRegion } from "@/lib/region/use-nursenest-region";
import { LazySection } from "@/legacy/marketing/lazy-section";
import {
  MARKETING_HERO_CAROUSEL_SLIDES,
  MARKETING_HERO_IMAGE_FALLBACK,
  marketingImageUsesProxy,
  resolveMarketingAbsoluteUrl,
  resolveMarketingSrcSet,
} from "@/lib/marketing-assets";

const HERO_CAROUSEL_ALTS = [
  "NurseNest question interface",
  "NurseNest flashcard deck",
  "NurseNest mock exam report",
  "NurseNest progress analytics dashboard",
  "NurseNest study dashboard screenshot",
  "NurseNest practice exam screenshot",
  "NurseNest review screen",
  "NurseNest analytics view",
  "NurseNest content browser",
  "NurseNest learning path",
  "NurseNest product screenshot",
] as const;

const heroCarouselSlides = MARKETING_HERO_CAROUSEL_SLIDES.map((slide, index) => ({
  ...slide,
  alt: HERO_CAROUSEL_ALTS[index] ?? "NurseNest product screenshot",
}));

const HeroFeatureStrip = dynamic(() => import("@/legacy/marketing/hero-feature-strip"), {
  loading: () => <div className="min-h-[60px]" />,
});
const HeroTrustIndicator = dynamic(() => import("@/legacy/marketing/hero-trust-indicator"), {
  loading: () => <div className="min-h-[50px]" />,
});
const HomeHeroFeatures = dynamic(() => import("@/legacy/marketing/home-hero-features"), {
  loading: () => <div className="min-h-[200px]" />,
});
const HeroPlatformStats = dynamic(() => import("@/legacy/marketing/hero-platform-stats"), {
  loading: () => <div className="min-h-[300px]" />,
});
const HomeChoosePath = dynamic(() => import("@/legacy/marketing/home-choose-path"), {
  loading: () => <div className="min-h-[280px]" />,
});
const HeroFeaturesGrid = dynamic(() => import("@/legacy/marketing/hero-features-grid"), {
  loading: () => <div className="min-h-[400px]" />,
});
const HeroGlobalCoverage = dynamic(() => import("@/legacy/marketing/hero-global-coverage"), {
  loading: () => <div className="min-h-[300px]" />,
});
const HeroNursingTiers = dynamic(() => import("@/legacy/marketing/hero-nursing-tiers"), {
  loading: () => <div className="min-h-[400px]" />,
});
const HeroCertifications = dynamic(() => import("@/legacy/marketing/hero-certifications"), {
  loading: () => <div className="min-h-[300px]" />,
});
const HeroAlliedHealth = dynamic(() => import("@/legacy/marketing/hero-allied-health"), {
  loading: () => <div className="min-h-[400px]" />,
});
const HeroExpansionTracker = dynamic(() => import("@/legacy/marketing/hero-expansion-tracker"), {
  loading: () => <div className="min-h-[300px]" />,
});
const HomeDifferentiation = dynamic(() => import("@/legacy/marketing/home-differentiation"), {
  loading: () => <div className="min-h-[600px]" />,
});
const HomeConversionSections = dynamic(() => import("@/legacy/marketing/home-conversion-sections"), {
  loading: () => <div className="min-h-[400px]" />,
});
const HomeCareerCta = dynamic(() => import("@/legacy/marketing/home-career-cta"), {
  loading: () => <div className="min-h-[200px]" />,
});
const HomeBottomSections = dynamic(() => import("@/legacy/marketing/home-bottom-sections"), {
  loading: () => <div className="min-h-[800px]" />,
});

type HeroLoadPhase = "proxy" | "direct" | "heroFbProxy" | "heroFbDirect" | "local" | "dead";

function nextHeroPhase(p: HeroLoadPhase, useSpacesProxy: boolean): HeroLoadPhase {
  if (useSpacesProxy) {
    switch (p) {
      case "proxy":
        return "direct";
      case "direct":
        return "heroFbProxy";
      case "heroFbProxy":
        return "heroFbDirect";
      case "heroFbDirect":
        return "local";
      case "local":
        return "dead";
      default:
        return "dead";
    }
  }
  switch (p) {
    case "direct":
      return "heroFbDirect";
    case "heroFbDirect":
      return "local";
    case "local":
      return "dead";
    default:
      return "dead";
  }
}

function heroSlideSrc(
  slide: (typeof heroCarouselSlides)[0],
  phase: HeroLoadPhase,
): { src: string; srcSet?: string } | null {
  const fb = MARKETING_HERO_IMAGE_FALLBACK;

  if (phase === "dead") return null;
  if (phase === "proxy") {
    return { src: resolveMarketingAbsoluteUrl(slide.fallback), srcSet: resolveMarketingSrcSet(slide.srcSet) };
  }
  if (phase === "direct") {
    return { src: slide.fallback, srcSet: slide.srcSet };
  }
  if (phase === "heroFbProxy" && fb) {
    return { src: resolveMarketingAbsoluteUrl(fb), srcSet: undefined };
  }
  if (phase === "heroFbDirect" && fb) {
    return { src: fb, srcSet: undefined };
  }
  if (phase === "local") {
    return { src: "/marketing/hero-fallback.svg", srcSet: undefined };
  }
  return null;
}

function HeroCarousel({ onMediaUnavailable }: { onMediaUnavailable?: () => void }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [phaseBySlide, setPhaseBySlide] = useState<Record<number, HeroLoadPhase>>({});
  const [hasSuccessfulLoad, setHasSuccessfulLoad] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const unavailableReported = useRef(false);
  const useSpacesProxy = marketingImageUsesProxy();

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroCarouselSlides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!hasSuccessfulLoad || heroCarouselSlides.length === 0) return;
    if (!isHovered) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, startTimer, hasSuccessfulLoad]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const allDead = heroCarouselSlides.every((_, index) => {
      const p = phaseBySlide[index] ?? (useSpacesProxy ? "proxy" : "direct");
      return p === "dead";
    });
    if (allDead && heroCarouselSlides.length > 0 && !unavailableReported.current) {
      unavailableReported.current = true;
      onMediaUnavailable?.();
    }
  }, [phaseBySlide, onMediaUnavailable, useSpacesProxy]);

  /** Skip slides with no renderable URL (e.g. all phases exhausted) so we never show an empty frame. */
  useEffect(() => {
    if (heroCarouselSlides.length === 0) return;
    const p = phaseBySlide[current] ?? (useSpacesProxy ? "proxy" : "direct");
    if (heroSlideSrc(heroCarouselSlides[current], p) !== null) return;
    for (let step = 1; step < heroCarouselSlides.length; step++) {
      const idx = (current + step) % heroCarouselSlides.length;
      const p2 = phaseBySlide[idx] ?? (useSpacesProxy ? "proxy" : "direct");
      if (heroSlideSrc(heroCarouselSlides[idx], p2) !== null) {
        setCurrent(idx);
        return;
      }
    }
  }, [current, phaseBySlide, useSpacesProxy]);

  const handleImgError = useCallback(
    (index: number) => {
      setPhaseBySlide((prev) => {
        const cur = prev[index] ?? (useSpacesProxy ? "proxy" : "direct");
        const next = nextHeroPhase(cur, useSpacesProxy);
        return { ...prev, [index]: next };
      });
    },
    [useSpacesProxy],
  );

  const handleImgLoad = useCallback(() => {
    setHasSuccessfulLoad(true);
  }, []);

  return (
    <div className="relative w-full min-w-0" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-testid="hero-carousel">
      <div
        className={
          hasSuccessfulLoad
            ? "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] shadow-[var(--shadow-elevated)]"
            : "relative h-0 max-h-0 w-full overflow-hidden border-0 shadow-none"
        }
        style={{ overflowAnchor: "none" }}
        aria-busy={!hasSuccessfulLoad}
      >
        {heroCarouselSlides.map((slide, index) => {
          const p = phaseBySlide[index] ?? (useSpacesProxy ? "proxy" : "direct");
          const resolved = heroSlideSrc(slide, p);
          if (!resolved) {
            return null;
          }
          return (
            <img
              key={`${index}-${p}`}
              srcSet={resolved.srcSet}
              sizes="(max-width: 768px) 100vw, min(600px, 45vw)"
              src={resolved.src}
              alt={slide.alt}
              width={1200}
              height={750}
              decoding={index === 0 ? "sync" : "async"}
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out will-change-[opacity] ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              data-testid={`img-hero-slide-${index}`}
              aria-hidden={index !== current}
              onError={() => handleImgError(index)}
              onLoad={handleImgLoad}
            />
          );
        })}
      </div>
      {hasSuccessfulLoad ? (
        <div className="mt-3 flex justify-center gap-2" data-testid="hero-carousel-dots">
          {heroCarouselSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-6 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`button-carousel-dot-${index}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function formatCount(n: number | undefined): string {
  if (n === undefined || n === 0) return "---";
  if (n < 10) return `${n}`;
  if (n >= 1000) {
    const hundreds = Math.floor(n / 100) * 100;
    return `${hundreds.toLocaleString()}+`;
  }
  const tens = Math.floor(n / 10) * 10;
  return `${tens}+`;
}

/**
 * Restored from `client/src/pages/home.tsx` (structure, classes, i18n keys).
 * Navigation/footer remain in root layout; below-fold sections use legacy copies + dynamic import.
 */
type HomeStatsPayload = {
  totalLessons: number;
  questionCount: number;
  totalFlashcards: number;
  totalDecks: number;
  storeProductCount: number;
};

export default function HomeRestoredClient() {
  const { t } = useMarketingI18n();
  const { region, setRegion } = useNursenestRegion();
  const [lessonCount, setLessonCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [storeProductCount, setStoreProductCount] = useState(0);
  const [flashcardCount, setFlashcardCount] = useState(10_000);
  const [heroMediaVisible, setHeroMediaVisible] = useState(() => MARKETING_HERO_CAROUSEL_SLIDES.length > 0);

  const [email, setEmail] = useState("");
  const [emailFrequency, setEmailFrequency] = useState("weekly");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public/home-stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: HomeStatsPayload | null) => {
        if (cancelled || !d) return;
        setLessonCount(d.totalLessons ?? 0);
        setQuestionCount(d.questionCount ?? 0);
        setStoreProductCount(d.storeProductCount ?? 0);
        if (typeof d.totalFlashcards === "number") setFlashcardCount(d.totalFlashcards);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleEmailSubscribe = useCallback(async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailStatus("error");
      setEmailMessage(t("home.email.invalidEmail"));
      return;
    }
    setEmailStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, frequency: emailFrequency }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || t("home.email.subscriptionFailed"));
      }
      setEmailStatus("success");
      setEmailMessage(t("home.email.success"));
      setEmail("");
    } catch (e: unknown) {
      setEmailStatus("error");
      setEmailMessage(e instanceof Error ? e.message : t("home.email.somethingWrong"));
    }
  }, [email, emailFrequency, t]);

  const enabledCareers = getEnabledCareers();

  return (
    <div className="font-sans md:animate-page-enter flex min-h-screen flex-col overflow-x-hidden bg-warmwhite">
      <main className="flex-grow overflow-x-hidden">
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: "var(--space-hero-top)", paddingBottom: "var(--space-hero-bottom)" }}
          data-testid="hero-section"
        >
          <div className="pointer-events-none absolute left-0 top-0 -z-10 hidden h-full w-full overflow-hidden md:block will-change-transform" aria-hidden="true">
            <div className="absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/8 blur-[80px]" style={{ transform: "translateZ(0)" }} />
            <div className="absolute bottom-[10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-secondary/20 blur-[100px]" style={{ transform: "translateZ(0)" }} />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid items-center gap-8 md:items-start md:gap-10 lg:gap-12 ${heroMediaVisible ? "md:grid-cols-2" : "md:grid-cols-1"}`}
            >
              <div className="hero-motion-enter min-w-0 space-y-6 md:space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 sm:px-4"
                    data-testid="badge-trust-micro"
                  >
                    <Award className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="text-xs font-semibold text-primary sm:text-sm">{t("home.hero.trustMicroBadge")}</span>
                  </div>
                  <div className="nn-accent-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4" data-testid="badge-authority">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="text-xs font-semibold text-primary sm:text-sm">{t("home.hero.authorityBadge")}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h1
                    className="font-bold leading-[1.08] tracking-tight text-gray-900"
                    style={{ fontSize: "var(--text-hero)" }}
                    data-testid="text-hero-heading"
                  >
                    {t("home.hero.mainTitle")}
                  </h1>

                  <p className="max-w-xl text-base leading-relaxed text-gray-700 lg:text-lg" data-testid="text-hero-subheading">
                    {t("home.hero.newSubheadline")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3" data-testid="hero-feature-strip">
                  {(
                    [
                      { icon: Brain, key: "featureActiveRecall", descKey: "featureActiveRecallDesc" },
                      { icon: ClipboardList, key: "featureNGN", descKey: "featureNGNDesc" },
                      { icon: Target, key: "featureBlueprint", descKey: "featureBlueprintDesc" },
                      { icon: Stethoscope, key: "featureClinicalDecision", descKey: "featureClinicalDecisionDesc" },
                    ] as const
                  ).map((feat) => (
                    <div
                      key={feat.key}
                      className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-white p-3 shadow-[var(--shadow-card)]"
                      data-testid={`feature-${feat.key}`}
                    >
                      <div className="nn-accent-icon-wrap mt-0.5 h-8 w-8 shrink-0">
                        <feat.icon className="nn-accent-icon h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-tight text-gray-900 sm:text-sm">{t(`home.hero.${feat.key}`)}</p>
                        <p className="mt-0.5 hidden text-[11px] leading-snug text-gray-600 sm:block">{t(`home.hero.${feat.descKey}`)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[var(--shadow-card)]" data-testid="region-toggle-hero">
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => setRegion("US")}
                      className={`relative flex flex-1 items-center justify-center gap-2.5 px-4 py-3.5 text-sm font-semibold transition-all duration-200 sm:py-4 sm:text-base ${
                        region === "US"
                          ? "border-b-2 border-primary bg-primary/10 text-primary"
                          : "border-b-2 border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                      }`}
                      data-testid="button-region-us"
                    >
                      <span className="text-xl" role="img" aria-label={t("pages.home.usFlag")}>
                        🇺🇸
                      </span>
                      <span>{t("home.region.us")}</span>
                      {region === "US" && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
                    </button>
                    <div className="w-px bg-gray-200" />
                    <button
                      type="button"
                      onClick={() => setRegion("CA")}
                      className={`relative flex flex-1 items-center justify-center gap-2.5 px-4 py-3.5 text-sm font-semibold transition-all duration-200 sm:py-4 sm:text-base ${
                        region === "CA"
                          ? "border-b-2 border-primary bg-primary/10 text-primary"
                          : "border-b-2 border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                      }`}
                      data-testid="button-region-ca"
                    >
                      <span className="text-xl" role="img" aria-label={t("pages.home.canadianFlag")}>
                        🇨🇦
                      </span>
                      <span>{t("home.region.ca")}</span>
                      {region === "CA" && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
                    </button>
                  </div>
                  <div className="border-t border-gray-100 bg-gray-50/80 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-600" />
                      <p className="text-xs leading-relaxed text-gray-600">
                        {region === "US" ? t("home.region.usDesc") : t("home.region.caDesc")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/signup"
                    className="shadow-primary/25 flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-white shadow-[var(--shadow-elevated)] transition-transform hover:-translate-y-0.5 hover:brightness-110 sm:min-h-[56px] sm:w-auto sm:px-9 sm:text-lg"
                    data-testid="button-hero-start-free"
                  >
                    {t("home.hero.ctaPrimary")}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                  <Link
                    href={mapLegacyMarketingHref("/exam-prep")}
                    className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3 text-base font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 sm:min-h-[56px] sm:w-auto sm:px-9 sm:text-lg"
                    data-testid="button-hero-browse"
                  >
                    <BookOpen className="mr-2 h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    {t("home.hero.ctaSecondary")}
                  </Link>
                </div>

                <p className="text-center text-xs text-gray-600 sm:text-left" data-testid="text-urgency-microcopy">
                  {t("home.hero.urgencyMicrocopy")}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600 sm:gap-x-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{t("home.hero.noCreditCard")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 shrink-0 text-primary" />
                    <span>{t("home.hero.guarantee")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{t("home.hero.cancelAnytime")}</span>
                  </div>
                </div>

                <div
                  className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-gray-700 sm:justify-start sm:gap-x-4"
                  data-testid="hero-trust-indicators"
                >
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 shrink-0" />
                    <span data-testid="text-trust-pass-rate">{t("home.hero.trustPassRate")}</span>
                  </div>
                  <span className="hidden text-gray-400 sm:inline" aria-hidden="true">
                    ·
                  </span>
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                    <span data-testid="text-trust-questions">
                      {questionCount > 0
                        ? `${formatCount(questionCount)} ${t("home.hero.trustQuestionsLabel")}`
                        : t("home.hero.trustQuestions")}
                    </span>
                  </div>
                  <span className="hidden text-gray-400 sm:inline" aria-hidden="true">
                    ·
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 shrink-0" />
                    <span data-testid="text-trust-flashcards">
                      {flashcardCount > 0
                        ? `${formatCount(flashcardCount)} ${t("home.hero.trustFlashcardsLabel")}`
                        : t("home.hero.trustFlashcards")}
                    </span>
                  </div>
                  <span className="hidden text-gray-400 sm:inline" aria-hidden="true">
                    ·
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span data-testid="text-trust-students">{t("home.hero.trustStudents")}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white/60 p-4 shadow-[var(--shadow-card)]" data-testid="hero-built-for-bar">
                  <p className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">{t("home.hero.builtForLabel")}</p>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { icon: GraduationCap, key: "builtForNursingStudents" },
                        { icon: Heart, key: "builtForPracticalNurses" },
                        { icon: Stethoscope, key: "builtForRegisteredNurses" },
                        { icon: Briefcase, key: "builtForNursePractitioners" },
                        { icon: Users, key: "builtForAlliedHealth" },
                      ] as const
                    ).map((seg) => (
                      <span
                        key={seg.key}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-700 sm:px-2.5 sm:text-xs"
                        data-testid={`built-for-${seg.key}`}
                      >
                        <seg.icon className="h-3 w-3 shrink-0 text-gray-500" />
                        {t(`home.hero.${seg.key}`)}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-gray-600">{t("home.hero.builtForMicrocopy")}</p>
                </div>
              </div>

              <div
                className={heroMediaVisible ? "relative hidden min-w-0 md:block" : "hidden"}
                style={{ overflowAnchor: "none" }}
              >
                <HeroCarousel onMediaUnavailable={() => setHeroMediaVisible(false)} />
                <div className="absolute -bottom-5 -left-5 z-10 flex items-center gap-3 rounded-2xl border border-gray-100/80 bg-white px-5 py-3.5 shadow-[var(--shadow-card-hover)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t("home.hero.passRate")}</div>
                    <div className="text-xs text-gray-600">{t("home.hero.firstAttempt")}</div>
                  </div>
                </div>
                <div className="absolute -right-3 -top-3 z-10 flex items-center gap-2 rounded-2xl border border-gray-100/80 bg-white px-4 py-2.5 shadow-[var(--shadow-card-hover)]">
                  <div className="flex -space-x-1.5">
                    {["bg-primary/60", "bg-primary/45", "bg-primary/70"].map((bg, i) => (
                      <div
                        key={bg}
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white ${bg}`}
                      >
                        {["P", "J", "A"][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{t("home.hero.studentCount")}</span>
                </div>
                <div
                  className="nn-accent-soft-ring pointer-events-none absolute -bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 shadow-sm"
                  data-testid="badge-students-studying"
                >
                  <div className="flex -space-x-1">
                    {["bg-primary/55", "bg-primary/40", "bg-primary/65"].map((bg) => (
                      <div key={bg} className={`h-4 w-4 rounded-full border-[1.5px] border-white ${bg}`} />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-primary">{t("home.hero.studentsStudying")}</span>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-12" data-testid="section-careers-supported">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-600">
                {t("home.hero.examPrepFor", {
                  region: region === "CA" ? t("home.region.ca") : t("home.region.us"),
                })}
              </p>
              <div className="flex flex-wrap gap-2">
                {enabledCareers.slice(0, 8).map((career) => (
                  <span
                    key={career.id}
                    className="inline-flex items-center rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm"
                  >
                    {career.shortName}
                  </span>
                ))}
                {enabledCareers.length > 8 && (
                  <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                    {t("home.hero.moreCount", { count: String(enabledCareers.length - 8) })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t border-gray-100 bg-gradient-to-b from-gray-50/80 to-white"
          style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
          data-testid="section-hero-benefits"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-center text-lg font-bold text-gray-900 sm:text-xl" data-testid="text-benefits-heading">
              {t("home.hero.benefitsHeading")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {(
                [
                  { key: "benefit1", icon: Stethoscope },
                  { key: "benefit2", icon: Brain },
                  { key: "benefit3", icon: ClipboardList },
                  { key: "benefit4", icon: Target },
                ] as const
              ).map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3.5 shadow-[var(--shadow-card)]"
                  data-testid={`hero-${item.key}`}
                >
                  <div className="nn-accent-icon-wrap mt-0.5 h-8 w-8 shrink-0">
                    <item.icon className="nn-accent-icon h-4 w-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">{t(`home.hero.${item.key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LazySection minHeight="60px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[60px]" />}>
            <HeroFeatureStrip />
          </Suspense>
        </LazySection>
        <LazySection minHeight="50px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[50px]" />}>
            <HeroTrustIndicator />
          </Suspense>
        </LazySection>

        <LazySection minHeight="200px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <HomeHeroFeatures />
          </Suspense>
        </LazySection>

        <LazySection minHeight="300px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <HeroPlatformStats />
          </Suspense>
        </LazySection>

        <LazySection minHeight="280px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[280px]" />}>
            <HomeChoosePath />
          </Suspense>
        </LazySection>

        <LazySection minHeight="400px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <HeroFeaturesGrid />
          </Suspense>
        </LazySection>

        <LazySection minHeight="300px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <HeroGlobalCoverage />
          </Suspense>
        </LazySection>

        <LazySection minHeight="400px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <HeroNursingTiers />
          </Suspense>
        </LazySection>

        <LazySection minHeight="300px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <HeroCertifications />
          </Suspense>
        </LazySection>

        <LazySection minHeight="400px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <HeroAlliedHealth />
          </Suspense>
        </LazySection>

        <LazySection minHeight="300px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <HeroExpansionTracker />
          </Suspense>
        </LazySection>

        <LazySection minHeight="600px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <HomeDifferentiation />
          </Suspense>
        </LazySection>

        <LazySection minHeight="400px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <HomeConversionSections lessonCount={lessonCount} questionCount={questionCount} />
          </Suspense>
        </LazySection>

        <LazySection minHeight="200px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <HomeCareerCta />
          </Suspense>
        </LazySection>

        <LazySection minHeight="420px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <HomeBottomSections
              region={region}
              heroStats={undefined}
              featuredProducts={[]}
              lessonCount={lessonCount}
              questionCount={questionCount}
              storeProductCount={storeProductCount}
              email={email}
              setEmail={setEmail}
              emailFrequency={emailFrequency}
              setEmailFrequency={setEmailFrequency}
              emailStatus={emailStatus}
              emailMessage={emailMessage}
              setEmailStatus={setEmailStatus}
              handleEmailSubscribe={handleEmailSubscribe}
            />
          </Suspense>
        </LazySection>

        <div className="mx-auto max-w-5xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <Link
            href={mapLegacyMarketingHref("/languages")}
            className="inline-flex items-center gap-2 text-sm text-[var(--theme-muted-text)] transition-colors hover:text-primary"
            data-testid="link-home-languages"
          >
            <span aria-hidden="true">🌐</span>
            <span>{t("pages.home.availableIn20LanguagesStudy")}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
