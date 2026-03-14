import { useState, useEffect, lazy, Suspense } from "react";
import { getExamConstants, type Region as ConstRegion } from "@shared/constants";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { useAuth } from "@/lib/auth";
import { Footer } from "@/components/footer";
import { TrustSignals } from "@/components/trust-signals";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { LazySection } from "@/components/lazy-section";
import {
  ArrowRight,
  Shield,
  Target,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import type { HeroStats } from "@shared/lesson-stats";
import type { DigitalProduct } from "@shared/schema";

const HeroProofShowcase = lazy(() => import("@/components/hero-proof-showcase").then(m => ({ default: m.HeroProofShowcase })));
const HomeBelowFold = lazy(() => import("@/components/home-below-fold"));
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

  const { data: shopProducts } = useQuery<DigitalProduct[]>({
    queryKey: ["/api/shop/products"],
    staleTime: 10 * 60 * 1000,
  });

  const featuredProducts = (shopProducts || [])
    .filter(p => p.featured && p.isActive)
    .slice(0, 4);

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
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28" data-testid="hero-section">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none hidden md:block">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/30 blur-3xl" />
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-foreground/10 blur-3xl" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none md:hidden">
            <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-primary/8 blur-2xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-8 md:animate-in md:fade-in md:slide-in-from-bottom-8 md:duration-700">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm mb-2 max-w-[90vw]">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0 skeleton-pulse"></span>
                <span className="text-xs sm:text-sm font-medium text-gray-600 truncate">{t("home.new.announcement")}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]" data-testid="text-hero-heading">
                {t("home.hero.title")}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subheading">
                {t("home.hero.subtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 px-4 sm:px-0">
                <Button 
                  size="lg" 
                  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-[transform,box-shadow] hover:-translate-y-1 text-white w-full sm:w-auto" 
                  onClick={() => setLocation("/register")}
                  data-testid="button-hero-start-free"
                >
                  {t("home.hero.cta")}
                  <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 text-gray-700 bg-white/50 w-full sm:w-auto" 
                  onClick={() => setLocation("/free-practice")}
                  data-testid="button-hero-browse"
                >
                  <Target className="mr-2 w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  {t("home.hero.cta2")}
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs text-gray-500">{t("home.hero.reassurance")}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">{t("home.hero.guarantee")}</span>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{t("home.hero.quickSelect")}</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 px-5"
                    onClick={() => setLocation("/nclex-rn-practice-questions")}
                    data-testid="button-quick-nclex-rn"
                  >
                    {t("home.hero.nclexRn")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-red-200 text-red-700 hover:bg-red-50 hover:border-red-400 px-5"
                    onClick={() => setLocation("/rex-pn-practice-questions")}
                    data-testid="button-quick-rex-pn"
                  >
                    {examLabel}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 px-5"
                    onClick={() => setLocation("/nclex-pn-practice-questions")}
                    data-testid="button-quick-lvn-lpn"
                  >
                    {t("home.hero.lvnLpn")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400 px-5"
                    onClick={() => setLocation("/np-exam-practice-questions")}
                    data-testid="button-quick-np"
                  >
                    {t("home.hero.npExams")}
                  </Button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  NP Certification: AANP, ANCC, FNP-BC, AGPCNP-BC, AGACNP-BC, PMHNP-BC, PNP-BC, NNP-BC, ENP-C
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => document.getElementById("included")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors"
                  data-testid="button-see-included"
                >
                  {t("home.hero.seeIncluded")}
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                <div className="text-center" data-testid="stat-hero-lessons">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{lessonCount > 0 ? `${lessonCount}+` : "2400+"}</div>
                  <div className="text-xs text-gray-500 font-medium">Nursing Lessons</div>
                </div>
                <div className="text-center" data-testid="stat-hero-questions">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{questionCount > 0 ? `${questionCount.toLocaleString()}+` : "8000+"}</div>
                  <div className="text-xs text-gray-500 font-medium">Practice Questions</div>
                </div>
                <div className="text-center" data-testid="stat-hero-systems">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">12</div>
                  <div className="text-xs text-gray-500 font-medium">Body Systems</div>
                </div>
                <div className="text-center" data-testid="stat-hero-simulator">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">Adaptive</div>
                  <div className="text-xs text-gray-500 font-medium">Exam Simulator</div>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-sm text-primary font-semibold">{t("home.tagline")}</p>
                <p className="text-xs text-gray-400">{t("home.nocc")}</p>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("home.pill.learntest")}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("home.pill.decks")}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("home.pill.tracks")}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("home.pill.languages")}</span>
                </div>
              </div>

              {region === "CA" && (
                <div className="mt-6 max-w-2xl mx-auto" data-testid="banner-canadian-content">
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
          </div>
        </section>

        <LazySection minHeight="400px" rootMargin="200px">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <HeroProofShowcase />
          </Suspense>
        </LazySection>

        <LazySection minHeight="600px" rootMargin="300px">
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <HomeBelowFold
              region={region}
              heroStats={heroStats}
              featuredProducts={featuredProducts}
              lessonCount={lessonCount}
              questionCount={questionCount}
              storeProductCount={storeProductCount}
              email={email}
              setEmail={setEmail}
              emailFrequency={emailFrequency}
              setEmailFrequency={setEmailFrequency}
              emailStatus={emailStatus}
              emailMessage={emailMessage}
              handleEmailSubscribe={handleEmailSubscribe}
            />
          </Suspense>
        </LazySection>


        <LazySection minHeight="800px" rootMargin="400px">
          <Suspense fallback={<div className="min-h-[800px]" />}>
            <HomeBottomSections
              region={region}
              heroStats={heroStats}
              featuredProducts={featuredProducts}
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

      <TrustSignals showStats={true} className="bg-gray-50/50" />

      <Footer />
      <AdminEditButton />
    </div>
  );
}
