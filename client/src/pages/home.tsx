import { useState, useEffect, lazy, Suspense } from "react";
import { getExamConstants, type Region as ConstRegion } from "@shared/constants";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { useAuth } from "@/lib/auth";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { LazySection } from "@/components/lazy-section";
import {
  ArrowRight,
  Shield,
  BookOpen,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { getEnabledCareers } from "@shared/careers";

import { useQuery } from "@tanstack/react-query";
import type { HeroStats, PlatformProof } from "@shared/lesson-stats";

const HomeConversionSections = lazy(() => import("@/components/home-conversion-sections"));
const HomeBottomSections = lazy(() => import("@/components/home-bottom-sections"));

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

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [emailFrequency, setEmailFrequency] = useState("weekly");

  const { user } = useAuth();
  const isAdmin = user?.tier === "admin";

  const { data: heroStats } = useQuery<HeroStats>({
    queryKey: ["/api/hero-stats"],
    staleTime: 10 * 60 * 1000,
  });

  const { data: platformProof } = useQuery<PlatformProof>({
    queryKey: ["/api/public/platform-proof"],
    staleTime: 15 * 60 * 1000,
    retry: 2,
  });

  const lessonCount = platformProof?.totalLessons ?? heroStats?.totalLessons ?? 0;
  const questionCount = platformProof?.totalQuestions ?? heroStats?.questionCount ?? 0;
  const flashcardCount = platformProof?.totalFlashcards ?? 10000;
  const deckCount = platformProof?.totalDecks ?? 140;
  const storeProductCount = heroStats?.storeProductCount ?? 0;
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState("");
  const [region, setRegionState] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "US";
  });
  useEffect(() => {
    const handler = () => setRegionState((localStorage.getItem("nursenest-region") as "US" | "CA") || "US");
    window.addEventListener("regionChange", handler);
    return () => window.removeEventListener("regionChange", handler);
  }, []);

  const setRegion = (newRegion: "US" | "CA") => {
    setRegionState(newRegion);
    localStorage.setItem("nursenest-region", newRegion);
    window.dispatchEvent(new Event("regionChange"));
  };

  const regionConst = getExamConstants(region as ConstRegion);
  const examLabel = regionConst.practicalNurse.examName;
  const rpnLabel = regionConst.practicalNurse.designation;
  const altExam = region === "CA" ? "NCLEX-PN" : "REx-PN";
  const enabledCareers = getEnabledCareers();

  async function handleEmailSubscribe() {
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
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || t("home.email.subscriptionFailed"));
      }
      setEmailStatus("success");
      setEmailMessage(t("home.email.success"));
      setEmail("");
    } catch (e: any) {
      setEmailStatus("error");
      setEmailMessage(e.message || t("home.email.somethingWrong"));
    }
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500 animate-page-enter">
      <SEO
        title={`NurseNest - Nursing Exam Prep | NCLEX & ${examLabel} Test Bank, Clinical Simulations & Flashcards`}
        description={`Prepare for nursing licensure examinations with NurseNest. Access ${formatCount(questionCount)} practice questions, ${flashcardCount > 0 ? `${formatCount(flashcardCount)} flashcards across ${formatCount(deckCount)} decks, ` : ""}adaptive CAT exams, clinical case simulations, and ${formatCount(lessonCount)} pathophysiology lessons. Built for ${rpnLabel}, RN, and NP students in Canada and the US. New content added weekly. Start free - no credit card required.`}
        keywords={`nursing exam prep, NCLEX practice questions, ${examLabel} exam preparation, nursing question bank, clinical simulations nursing, pharmacology flashcards nursing, pathophysiology lessons, RPN study guide, RN exam review, NP exam prep, NP certification exam, AANP exam prep, ANCC certification review, FNP-BC exam questions, AGPCNP-BC study guide, AGACNP-BC practice test, PMHNP-BC exam prep, PNP-BC certification review, NNP-BC exam questions, ENP-C exam prep, nurse practitioner board exam, Next Generation NCLEX, NCLEX-RN practice questions, nursing clinical reasoning, med-surg nursing review, nursing licensure exam, clinical judgment nursing, nursing study tools, nursing board exam prep, NCLEX review course, nursing practice test, pre-nursing program`}
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NurseNest",
          "url": "https://www.nursenest.ca/en",
          "description": `Comprehensive nursing exam preparation platform with ${formatCount(questionCount)} practice questions, clinical case simulations, and ${formatCount(lessonCount)} pathophysiology lessons designed to align with the content domains tested on nursing licensure examinations. New content added weekly.`,
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.nursenest.ca/lessons?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
        additionalStructuredData={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": t("home.faq.q1"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a1") } },
              { "@type": "Question", "name": t("home.faq.q2"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a2") } },
              { "@type": "Question", "name": t("home.faq.q3"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a3") } },
              { "@type": "Question", "name": t("home.faq.q4"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a4") } },
              { "@type": "Question", "name": t("home.faq.q5"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a5") } },
              { "@type": "Question", "name": t("home.faq.q6"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a6") } },
              { "@type": "Question", "name": t("home.faq.q7"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a7") } },
              { "@type": "Question", "name": t("home.faq.q8"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a8") } },
              { "@type": "Question", "name": t("home.faq.q9"), "acceptedAnswer": { "@type": "Answer", "text": `${t("home.faq.a9prefix")} ${t("home.faq.a9suffix")}` } },
              { "@type": "Question", "name": t("home.faq.q10"), "acceptedAnswer": { "@type": "Answer", "text": t("home.faq.a10") } },
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "NurseNest",
            "url": "https://www.nursenest.ca/en",
            "description": "Premier nursing and allied health education platform for RPN/LVN, RN/NCLEX, NP, RRT, MLT, paramedic, social work, psychotherapy, addictions counselling, and occupational therapy students.",
            "educationalCredentialAwarded": "Nursing & Allied Health Exam Preparation",
            "sameAs": [
              "https://www.instagram.com/nursenest.ca",
              "https://www.tiktok.com/@nursenest.ca",
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1240",
              "bestRating": "5"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "NurseNest Course Catalog",
              "itemListElement": [
                { "@type": "Course", "name": "NCLEX-RN Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "REx-PN / NCLEX-PN Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "NP Certification Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "RRT Respiratory Therapy Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "MLT Medical Lab Technologist Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "Paramedic NREMT Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "Social Work ASWB Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "Psychotherapy CRPO Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "Addictions Counselling Exam Prep", "courseMode": "online" },
                { "@type": "Course", "name": "Occupational Therapy NBCOT Exam Prep", "courseMode": "online" },
              ],
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "NCLEX-RN Exam Preparation",
            "description": "Comprehensive NCLEX-RN exam preparation with adaptive question banks, clinical simulations, and pharmacology review.",
            "url": "https://www.nursenest.ca/en/nclex-rn",
            "provider": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca/en" },
            "courseMode": "online",
            "isAccessibleForFree": false,
            "offers": { "@type": "Offer", "price": "39.99", "priceCurrency": "CAD", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "NCLEX-PN / REx-PN Exam Preparation",
            "description": "Dedicated NCLEX-PN and REx-PN exam preparation for practical nursing students with practice questions and clinical reasoning exercises.",
            "url": "https://www.nursenest.ca/en/rex-pn",
            "provider": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca/en" },
            "courseMode": "online",
            "isAccessibleForFree": false,
            "offers": { "@type": "Offer", "price": "29.99", "priceCurrency": "CAD", "availability": "https://schema.org/InStock" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "NP Certification Exam Preparation",
            "description": "Advanced nurse practitioner certification exam preparation covering AANP, ANCC, FNP-BC, AGPCNP-BC, AGACNP-BC, PMHNP-BC, PNP-BC, NNP-BC, and ENP-C exams.",
            "url": "https://www.nursenest.ca/en/np-exam-practice-questions",
            "provider": { "@type": "EducationalOrganization", "name": "NurseNest", "url": "https://www.nursenest.ca/en" },
            "courseMode": "online",
            "isAccessibleForFree": false,
            "offers": { "@type": "Offer", "price": "49.99", "priceCurrency": "CAD", "availability": "https://schema.org/InStock" }
          }
        ]}
      />
      <Navigation />
      
      <main className="flex-grow">
        <section className="relative overflow-hidden" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }} data-testid="hero-section">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none hidden md:block">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[80px]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[100px]" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none md:hidden">
            <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-primary/6 blur-[60px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8 md:animate-in md:fade-in md:slide-in-from-bottom-8 md:duration-700">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white border border-primary/15 shadow-[var(--shadow-card)] max-w-[90vw]">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0 skeleton-pulse"></span>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t("home.new.announcement")}</span>
                </div>
                
                <div className="space-y-4">
                  <h1 className="font-bold tracking-tight text-gray-900 leading-[1.08]" style={{ fontSize: 'var(--text-hero)' }} data-testid="text-hero-heading">
                    Exam Prep for Every Health Career
                  </h1>
                  
                  <p className="text-lg lg:text-xl text-gray-500 leading-relaxed max-w-xl" data-testid="text-hero-subheading">
                    {formatCount(questionCount)} practice questions, {flashcardCount > 0 ? `${formatCount(flashcardCount)} flashcards, ` : ""}{formatCount(lessonCount)} clinical lessons, and adaptive mock exams — built for {rpnLabel}, RN, NP, and allied health students in {region === "CA" ? "Canada" : "the United States"}.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-gray-200 bg-white shadow-[var(--shadow-card)] overflow-hidden" data-testid="region-toggle-hero">
                  <div className="flex">
                    <button
                      onClick={() => setRegion("US")}
                      className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3.5 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-200 relative ${
                        region === "US"
                          ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                          : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-b-2 border-transparent"
                      }`}
                      data-testid="button-region-us"
                    >
                      <span className="text-xl" role="img" aria-label="US flag">🇺🇸</span>
                      <span>United States</span>
                      {region === "US" && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                    <div className="w-px bg-gray-200" />
                    <button
                      onClick={() => setRegion("CA")}
                      className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3.5 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-200 relative ${
                        region === "CA"
                          ? "bg-red-50 text-red-700 border-b-2 border-red-600"
                          : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-b-2 border-transparent"
                      }`}
                      data-testid="button-region-ca"
                    >
                      <span className="text-xl" role="img" aria-label="Canadian flag">🇨🇦</span>
                      <span>Canada</span>
                      {region === "CA" && <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />}
                    </button>
                  </div>
                  <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {region === "US" ? (
                          <>Showing <strong className="text-gray-700">NCLEX-PN, NCLEX-RN, AANP/ANCC</strong> exam content with <strong className="text-gray-700">US measurements</strong> (°F, lbs, in) and <strong className="text-gray-700">LPN/LVN</strong> terminology.</>
                        ) : (
                          <>Showing <strong className="text-gray-700">REx-PN, NCLEX-RN, NP Exam</strong> content with <strong className="text-gray-700">Canadian measurements</strong> (°C, kg, cm) and <strong className="text-gray-700">RPN</strong> terminology.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button 
                    size="lg" 
                    className="h-13 sm:h-14 px-7 sm:px-9 text-base sm:text-lg rounded-full bg-primary hover:brightness-110 shadow-[var(--shadow-elevated)] shadow-primary/25 transition-all hover:-translate-y-0.5 text-white w-full sm:w-auto font-semibold" 
                    onClick={() => setLocation("/register")}
                    data-testid="button-hero-start-free"
                  >
                    Start Practicing Free
                    <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-13 sm:h-14 px-7 sm:px-9 text-base sm:text-lg rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 bg-white w-full sm:w-auto font-medium" 
                    onClick={() => setLocation("/lessons")}
                    data-testid="button-hero-browse"
                  >
                    <BookOpen className="mr-2 w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                    Explore Lessons
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{t("home.hero.guarantee")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Cancel anytime</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-full border border-gray-100 shadow-[var(--shadow-card)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-xs font-medium text-gray-600">{t("home.pill.learntest")}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-full border border-gray-100 shadow-[var(--shadow-card)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-xs font-medium text-gray-600">{t("home.pill.decks")}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-full border border-gray-100 shadow-[var(--shadow-card)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-xs font-medium text-gray-600">{t("home.pill.tracks")}</span>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)] border border-gray-100/80 bg-white">
                  <img
                    srcSet="/screenshots/screenshot2_1773379293573-480w.webp 480w, /screenshots/screenshot2_1773379293573-768w.webp 768w, /screenshots/screenshot2_1773379293573-1200w.webp 1200w"
                    sizes="(max-width: 768px) 480px, 600px"
                    src="/screenshots/screenshot2_1773379293573-768w.webp"
                    alt="NurseNest adaptive performance dashboard"
                    width={2730}
                    height={1588}
                    className="w-full h-auto object-cover"
                    loading="eager"
                    fetchPriority="high"
                    data-testid="img-hero-screenshot"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-[var(--shadow-card-hover)] border border-gray-100/80 px-5 py-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">94% Pass Rate</div>
                    <div className="text-xs text-gray-500">First-attempt students</div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-white rounded-2xl shadow-[var(--shadow-card-hover)] border border-gray-100/80 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["bg-blue-400", "bg-emerald-400", "bg-purple-400"].map((bg, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-[9px] font-bold`}>
                        {["P", "J", "A"][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">5,000+ students</span>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-12" data-testid="section-careers-supported">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {region === "CA" ? "Canadian" : "US"} Exam Prep Available For
              </p>
              <div className="flex flex-wrap gap-2">
                {enabledCareers.slice(0, 8).map((career) => (
                  <span
                    key={career.id}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-gray-150 text-xs font-medium text-gray-600 shadow-sm"
                  >
                    {career.shortName}
                  </span>
                ))}
                {enabledCareers.length > 8 && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-xs font-semibold text-primary">
                    +{enabledCareers.length - 8} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <LazySection minHeight="400px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <HomeConversionSections
              lessonCount={lessonCount}
              questionCount={questionCount}
            />
          </Suspense>
        </LazySection>

        <section className="border-t border-gray-100" style={{ paddingTop: 'var(--space-block)', paddingBottom: 'var(--space-block)' }} data-testid="section-career-journey-cta">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-purple-50/30 rounded-3xl border border-blue-100/60 p-8 sm:p-12 shadow-[var(--shadow-card)]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-200/60 shadow-[var(--shadow-card)] mb-5">
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-blue-700">Study → Pass → Transition → Get Hired</span>
              </div>
              <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: 'var(--text-section)' }}>See Your Complete Career Path</h2>
              <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-base lg:text-lg">Follow the step-by-step journey from exam prep to career launch. Every stage connects to the resources you need.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-[var(--shadow-card)]"
                  onClick={() => setLocation("/career-journey")}
                  data-testid="button-career-journey-home"
                >
                  Explore Your Career Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full font-medium"
                  onClick={() => setLocation("/career-journey/nursing")}
                  data-testid="button-career-journey-nursing"
                >
                  RN Career Path
                </Button>
              </div>
            </div>
          </div>
        </section>

        <LazySection minHeight="800px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[800px]" />}>
            <HomeBottomSections
              region={region}
              heroStats={heroStats}
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

      </main>

      {isAdmin && heroStats?.breakdown && (
        <div className="max-w-4xl mx-auto px-4 py-6" data-testid="section-admin-hero-debug">
          <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <summary className="text-sm font-bold text-gray-600 cursor-pointer">Admin: Lesson Count Breakdown</summary>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {(["rpn", "rn", "np", "free"] as const).map(tier => (
                <div key={tier} className="bg-white p-3 rounded border">
                  <p className="font-bold text-gray-900 uppercase">{tier}</p>
                  <p>Static: {heroStats.breakdown![`${tier}Static` as keyof typeof heroStats.breakdown]}</p>
                  <p>DB: {heroStats.breakdown![`${tier}Db` as keyof typeof heroStats.breakdown]}</p>
                  <p className="font-bold mt-1">Total: {heroStats[`${tier}Lessons` as keyof typeof heroStats]}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded border">
                <p className="font-bold text-gray-900">Total Lessons</p>
                <p className="text-lg font-bold">{heroStats.totalLessons}</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-bold text-gray-900">Total Questions</p>
                <p className="text-lg font-bold">{heroStats.questionCount}</p>
                <p className="text-gray-500">incl. {heroStats.storeQuestionCount || 0} store</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-bold text-gray-900">Store Products</p>
                <p className="text-lg font-bold">{heroStats.storeProductCount || 0}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Last updated: {heroStats.lastUpdatedISO}</p>
          </details>
        </div>
      )}

      <Footer />
      <AdminEditButton />
    </div>
  );
}
