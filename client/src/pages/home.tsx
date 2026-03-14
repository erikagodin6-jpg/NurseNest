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
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import type { HeroStats } from "@shared/lesson-stats";

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

  const lessonCount = heroStats?.totalLessons ?? 0;
  const questionCount = heroStats?.questionCount ?? 0;
  const storeProductCount = heroStats?.storeProductCount ?? 0;
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState("");
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "US";
  });
  useEffect(() => {
    const handler = () => setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "US");
    window.addEventListener("regionChange", handler);
    return () => window.removeEventListener("regionChange", handler);
  }, []);

  const regionConst = getExamConstants(region as ConstRegion);
  const examLabel = regionConst.practicalNurse.examName;
  const rpnLabel = regionConst.practicalNurse.designation;
  const altExam = region === "CA" ? "NCLEX-PN" : "REx-PN";

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
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500">
      <SEO
        title={`NurseNest - Nursing Exam Prep | NCLEX & ${examLabel} Question Bank, Clinical Simulations & Flashcards`}
        description={`Prepare for nursing licensure examinations with NurseNest. Access ${formatCount(questionCount)} practice questions designed to mirror the cognitive patterns tested on ${examLabel} and ${altExam}, clinical case simulations, pharmacology flashcards, and ${formatCount(lessonCount)} pathophysiology lessons. Built for ${rpnLabel}, RN, and NP students in Canada and the US. New content added weekly. Start free - no credit card required.`}
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
        <section className="relative overflow-hidden py-16 lg:py-24" data-testid="hero-section">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none hidden md:block">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/30 blur-3xl" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none md:hidden">
            <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-primary/8 blur-2xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-6 md:animate-in md:fade-in md:slide-in-from-bottom-8 md:duration-700">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm max-w-[90vw]">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0 skeleton-pulse"></span>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t("home.new.announcement")}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]" data-testid="text-hero-heading">
                  Master Your Nursing Exam with Confidence
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed" data-testid="text-hero-subheading">
                  {formatCount(questionCount)} practice questions, {formatCount(lessonCount)} clinical lessons, flashcards, mock exams, and adaptive study plans — built for RPN, RN, NP, and allied health students.
                </p>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Button 
                    size="lg" 
                    className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-[transform,box-shadow] hover:-translate-y-1 text-white w-full sm:w-auto" 
                    onClick={() => setLocation("/register")}
                    data-testid="button-hero-start-free"
                  >
                    Start Practicing Free
                    <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 text-gray-700 bg-white/50 w-full sm:w-auto" 
                    onClick={() => setLocation("/lessons")}
                    data-testid="button-hero-browse"
                  >
                    <BookOpen className="mr-2 w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                    Explore Lessons
                  </Button>
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-xs text-gray-500">{t("home.hero.reassurance")}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{t("home.hero.guarantee")}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 pt-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{t("home.pill.learntest")}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{t("home.pill.decks")}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{t("home.pill.tracks")}</span>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
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
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">94% Pass Rate</div>
                    <div className="text-[10px] text-gray-500">First-attempt students</div>
                  </div>
                </div>
              </div>
            </div>

            {region === "CA" && (
              <div className="mt-10 max-w-2xl mx-auto lg:mx-0" data-testid="banner-canadian-content">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-200/60 shadow-md px-6 py-5">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500 rounded-l-2xl" />
                  <div className="flex items-start gap-4 pl-2">
                    <span className="text-3xl shrink-0 mt-0.5" role="img" aria-label="Canadian flag">🍁</span>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{t("home.canadian.title")}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {t("home.canadian.desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

        <section className="py-12 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-purple-50/30" data-testid="section-career-journey-cta">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm mb-4">
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium text-blue-700">Study → Pass → Transition → Get Hired</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">See Your Complete Career Path</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">Follow the step-by-step journey from exam prep to career launch. Every stage connects to the resources you need.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl"
                onClick={() => setLocation("/career-journey")}
                data-testid="button-career-journey-home"
              >
                Explore Your Career Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 px-5 py-2.5 rounded-xl"
                onClick={() => setLocation("/career-journey/nursing")}
                data-testid="button-career-journey-nursing"
              >
                RN Career Path
              </Button>
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
