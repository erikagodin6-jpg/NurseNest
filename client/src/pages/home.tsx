import { useState, useEffect } from "react";
import { getExamConstants, type Region as ConstRegion } from "@shared/constants";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ArrowRight, 
  Star, 
  Shield, 
  BookOpen,
  Brain,
  Stethoscope,
  Pill,
  HeartPulse,
  Activity,
  FlaskConical,
  Baby,
  Lightbulb,
  Target,
  Layers,
  BarChart3,
  Zap,
  GraduationCap,
  Mail,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  TrendingUp,
  PlayCircle,
  Calculator,
  ClipboardCheck,
  Siren,
  Droplets,
  Thermometer,
  TestTubes,
  LayoutDashboard,
  MessageSquareQuote,
  Newspaper,
  Globe,
  Gamepad2,
  Award,
  Microscope,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CircleCheck
} from "lucide-react";

import { lessonCount, questionCount } from "@/data/lesson-counts";

function formatCount(n: number): string {
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
  const altExam = region === "CA" ? "NCLEX" : "REX-PN";

  async function handleEmailSubscribe() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailStatus("error");
      setEmailMessage("Please enter a valid email address.");
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
        throw new Error(data.message || "Subscription failed. Please try again.");
      }
      setEmailStatus("success");
      setEmailMessage("You're subscribed! Check your inbox for practice questions.");
      setEmail("");
    } catch (e: any) {
      setEmailStatus("error");
      setEmailMessage(e.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500">
      <SEO
        title="NurseNest - Nursing Exam Prep | NCLEX & REX-PN Question Bank, Clinical Simulations & Flashcards"
        description={`Prepare for nursing licensure examinations with NurseNest. Access ${formatCount(questionCount)} practice questions designed to mirror the cognitive patterns tested on ${examLabel} and ${altExam}, clinical case simulations, pharmacology flashcards, and ${formatCount(lessonCount)} pathophysiology lessons. Built for ${rpnLabel}, RN, and NP students in Canada and the US. New content added weekly. Start free - no credit card required.`}
        keywords="nursing exam prep, NCLEX practice questions, REX-PN exam preparation, nursing question bank, clinical simulations nursing, pharmacology flashcards nursing, pathophysiology lessons, RPN study guide, RN exam review, NP exam prep, NP certification exam, AANP exam prep, ANCC certification review, FNP-BC exam questions, AGPCNP-BC study guide, AGACNP-BC practice test, PMHNP-BC exam prep, PNP-BC certification review, NNP-BC exam questions, ENP-C exam prep, nurse practitioner board exam, Next Generation NCLEX, NCLEX-RN practice questions, nursing clinical reasoning, med-surg nursing review, nursing licensure exam, clinical judgment nursing, nursing study tools, nursing board exam prep, NCLEX review course, nursing practice test, pre-nursing program"
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NurseNest",
          "url": "https://www.nursenest.ca",
          "description": "Comprehensive nursing exam preparation platform with 1,200+ practice questions, clinical case simulations, and 200+ pathophysiology lessons designed to align with the content domains tested on nursing licensure examinations. New content added weekly.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.nursenest.ca/lessons?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28" data-testid="hero-section">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/30 blur-3xl" />
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-foreground/10 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm mb-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-600">{t("home.new.announcement")}</span>
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
                  onClick={() => setLocation("/start-free")}
                  data-testid="button-hero-start-free"
                >
                  {t("home.hero.cta")}
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
                  {t("home.hero.cta2")}
                </Button>
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

        {/* What's New Section */}
        <section className="py-12 bg-gradient-to-b from-emerald-50/50 to-white relative z-10 border-t border-emerald-100/50" data-testid="section-whats-new">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-emerald-300" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t("home.new.badge")}</span>
              </div>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-emerald-300" />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group"
                onClick={() => setLocation("/flashcards")}
                data-testid="card-new-decks"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full">{t("home.new.label")}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{t("home.new.decks.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t("home.new.decks.desc")}</p>
              </div>

              <div
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group"
                onClick={() => setLocation("/blog")}
                data-testid="card-new-blog"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full">{t("home.new.label")}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{t("home.new.blog.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t("home.new.blog.desc")}</p>
              </div>

              <div
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group"
                onClick={() => setLocation("/lessons")}
                data-testid="card-new-languages"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full">{t("home.new.label")}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{t("home.new.languages.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t("home.new.languages.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features Showcase */}
        <section className="py-20 bg-gradient-to-b from-white via-primary/3 to-white relative z-10" data-testid="section-platform-features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{t("home.platform.badge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5" data-testid="text-features-heading">
                {t("home.features.title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.features.subtitle")}
              </p>
            </div>

            {/* Headline Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-4xl mx-auto">
              {[
                { value: formatCount(questionCount), label: t("home.stats.questions"), icon: Target, color: "from-blue-500 to-indigo-600" },
                { value: formatCount(lessonCount), label: t("home.stats.lessons"), icon: BookOpen, color: "from-emerald-500 to-teal-600" },
                { value: "9", label: t("home.stats.simulators"), icon: Gamepad2, color: "from-purple-500 to-violet-600" },
                { value: "7", label: t("home.stats.modes"), icon: Layers, color: "from-amber-500 to-orange-600" },
              ].map((stat, i) => (
                <div key={i} className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-5 text-center group" data-testid={`stat-feature-${i}`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`} />
                  <div className="mx-auto w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stat.value}</div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Feature Cards - 2x3 Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {/* Mock Exams */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/mock-exams")}
                data-testid="card-feature-mock-exams"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t("home.exams.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{t("home.exams.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{examLabel} {t("home.feature.examFormat")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{t("home.feature.scoreTrends")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{t("home.feature.autoSave")}</span>
                </div>
              </div>

              {/* Clinical Simulators */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/first-action-simulator")}
                data-testid="card-feature-simulators"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t("home.simulators.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{t("home.simulators.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">{t("home.feature.branching")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">{t("home.feature.instantFeedback")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">{t("home.feature.free2")}</span>
                </div>
              </div>

              {/* Question Bank */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/question-bank")}
                data-testid="card-feature-question-bank"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{formatCount(questionCount)} {t("home.qbank.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{t("home.qbank.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{rpnLabel}/RN/NP {t("home.feature.tierLevels")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{t("home.feature.deepRationales")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{t("home.feature.progressTracking")}</span>
                </div>
              </div>

              {/* Flashcard Decks */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/flashcards")}
                data-testid="card-feature-flashcards"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full" />
                <div className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full z-10">{t("home.new.label")}</div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t("home.flashcards.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{t("home.flashcards.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">{t("home.feature.learnMode")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">{t("home.feature.testMode")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">{t("home.feature.accuracyCheck")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">{t("home.feature.csvImport")}</span>
                </div>
              </div>

              {/* Med Math & Lab Values */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/med-math")}
                data-testid="card-feature-med-math"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t("home.tools.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{t("home.tools.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{t("home.feature.stepwise")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{t("home.feature.abg")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{t("home.feature.labClusters")}</span>
                </div>
              </div>

              {/* Video Lectures */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/lectures")}
                data-testid="card-feature-lectures"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t("home.lessons.title")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{t("home.lessons.desc")}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">{t("home.feature.videoLectures")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">{t("home.feature.clinicalPearls")}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">{t("home.feature.freeContent")}</span>
                </div>
              </div>
            </div>

            {/* Secondary Features Strip */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/dashboard")} data-testid="card-feature-dashboard">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <LayoutDashboard className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t("home.secondary.dashboard")}</h4>
                  <p className="text-xs text-gray-500">{t("home.secondary.dashboardDesc")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/reports")} data-testid="card-feature-analytics">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t("home.secondary.analytics")}</h4>
                  <p className="text-xs text-gray-500">{t("home.secondary.analyticsDesc")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/question-of-the-day")} data-testid="card-feature-qotd">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquareQuote className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t("home.secondary.qotd")}</h4>
                  <p className="text-xs text-gray-500">{t("home.secondary.qotdDesc")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden" onClick={() => setLocation("/blog")} data-testid="card-feature-blog">
                <div className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">{t("home.new.label")}</div>
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                  <Newspaper className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t("home.secondary.blog")}</h4>
                  <p className="text-xs text-gray-500">{t("home.secondary.blogDesc")}</p>
                </div>
              </div>
            </div>

            {/* Differentiators Row */}
            <div className="bg-gradient-to-r from-primary/5 via-white to-primary/5 rounded-2xl border border-primary/10 p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{t("home.diff.region")}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{t("home.diff.regionDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Microscope className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{t("home.diff.patho")}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{t("home.diff.pathoDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{t("home.diff.scope")}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{rpnLabel} {t("home.diff.scopeDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{t("home.diff.languages")}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{t("home.diff.languagesDesc")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button
                size="lg"
                className="h-14 px-10 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 text-white transition-[transform,box-shadow] hover:-translate-y-1"
                onClick={() => setLocation("/start-free")}
                data-testid="button-features-start-free"
              >
                {t("home.startFree")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Free Interactive Learning Section */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5 relative z-10" data-testid="section-free-learning">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{t("home.free.badge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-free-learning-heading">{t("home.free.title")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.free.subtitle")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/pre-nursing")} data-testid="card-free-pre-nursing">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("home.free.preNursing")}</h3>
                  <p className="text-sm text-gray-600 mb-3">{t("home.free.preNursingDesc")}</p>
                  <span className="text-xs text-primary font-medium">{t("home.free.preNursingMeta")}</span>
                </CardContent>
              </Card>

              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/anatomy")} data-testid="card-free-anatomy">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <HeartPulse className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("home.free.anatomy")}</h3>
                  <p className="text-sm text-gray-600 mb-3">{t("home.free.anatomyDesc")}</p>
                  <span className="text-xs text-primary font-medium">{t("home.free.anatomyMeta")}</span>
                </CardContent>
              </Card>

              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/clinical-clarity")} data-testid="card-free-clinical-clarity">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("home.free.clarity")}</h3>
                  <p className="text-sm text-gray-600 mb-3">{t("home.free.clarityDesc")}</p>
                  <span className="text-xs text-primary font-medium">{t("home.free.clarityMeta")}</span>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <Button className="rounded-full px-8 h-12 bg-primary hover:brightness-110 text-white shadow-md" onClick={() => setLocation("/pre-nursing")} data-testid="button-explore-free">
                {t("home.free.explore")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* What You Can Study Section */}
        <section className="py-24 bg-white/50 backdrop-blur-sm relative z-10" data-testid="section-study-topics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-study-heading">{t("home.study.heading")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.study.subtitle")}
              </p>
            </div>

            <p className="text-center text-sm text-gray-500 mb-12 max-w-2xl mx-auto">
              {t("home.study.subtext")}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: HeartPulse, title: t("home.study.medsurg"), desc: t("home.study.medsurgDesc"), color: "bg-red-50 text-red-600" },
                { icon: Pill, title: t("home.study.pharm"), desc: t("home.study.pharmDesc"), color: "bg-blue-50 text-blue-600" },
                { icon: Baby, title: t("home.study.maternal"), desc: t("home.study.maternalDesc"), color: "bg-pink-50 text-pink-600" },
                { icon: Brain, title: t("home.study.mental"), desc: t("home.study.mentalDesc"), color: "bg-purple-50 text-purple-600" },
                { icon: FlaskConical, title: t("home.study.lab"), desc: t("home.study.labDesc"), color: "bg-emerald-50 text-emerald-600" },
                { icon: Activity, title: t("home.study.critical"), desc: t("home.study.criticalDesc"), color: "bg-orange-50 text-orange-600" },
                { icon: Target, title: t("home.study.priority"), desc: t("home.study.priorityDesc"), color: "bg-indigo-50 text-indigo-600" },
                { icon: Stethoscope, title: t("home.study.cases"), desc: t("home.study.casesDesc"), color: "bg-teal-50 text-teal-600" },
                { icon: GraduationCap, title: t("home.study.patho"), desc: t("home.study.pathoDesc"), color: "bg-amber-50 text-amber-600" },
              ].map((topic, i) => (
                <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 overflow-hidden group bg-white cursor-pointer" onClick={() => setLocation("/lessons")} data-testid={`card-topic-${i}`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${topic.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <topic.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{topic.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="rounded-full px-6 border-primary/20 hover:bg-primary/5 text-gray-700" onClick={() => setLocation("/lessons")} data-testid="button-browse-all-topics">
                {t("home.study.browseAll")} ({formatCount(lessonCount)})
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* For New Nurses & Floor Specialties */}
        <section className="py-20 bg-primary/5 border-y border-primary/10" data-testid="section-new-nurses">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary/20 shadow-sm mb-6">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">{t("home.nurses.badge")}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" data-testid="text-new-nurses-heading">
                  {t("home.nurses.heading")}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t("home.nurses.subtitle")}
                </p>
                <div className="space-y-4">
                  {[
                    { title: t("home.nurses.grad"), desc: t("home.nurses.gradDesc") },
                    { title: t("home.nurses.floor"), desc: t("home.nurses.floorDesc") },
                    { title: t("home.nurses.medSafety"), desc: t("home.nurses.medSafetyDesc") },
                    { title: t("home.nurses.deterioration"), desc: t("home.nurses.deteriorationDesc") },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: formatCount(lessonCount), label: t("home.stats.lessons"), icon: BookOpen },
                  { value: formatCount(questionCount), label: t("home.stats.questions"), icon: Target },
                  { value: "15+", label: t("home.nurses.bodySystems"), icon: HeartPulse },
                  { value: "6", label: t("home.nurses.studyModes"), icon: Layers },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-primary/5 text-center" data-testid={`stat-${i}`}>
                    <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why NurseNest Section */}
        <section className="py-24 bg-white" data-testid="section-why-nursenest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-why-heading">{t("home.why.heading")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.why.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Lightbulb, title: t("home.why.rationale"), desc: t("home.why.rationaleDesc") },
                { icon: Brain, title: t("home.why.judgment"), desc: t("home.why.judgmentDesc") },
                { icon: Layers, title: t("home.why.progression"), desc: t("home.why.progressionDesc") },
                { icon: Stethoscope, title: t("home.why.simulation"), desc: t("home.why.simulationDesc") },
                { icon: BarChart3, title: t("home.why.analytics"), desc: t("home.why.analyticsDesc") },
                { icon: Zap, title: t("home.why.noFiller"), desc: t("home.why.noFillerDesc") },
              ].map((feature, i) => (
                <div key={i} className="bg-gray-50/80 rounded-2xl p-8 hover:shadow-md transition-shadow duration-300 border border-gray-100" data-testid={`card-feature-${i}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flashcard Trust Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white" data-testid="section-flashcard-trust">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-semibold px-4 py-2 rounded-full mb-6" data-testid="badge-flashcard-warning">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                {t("home.flashcardTrust.warningBadge")}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-flashcard-trust-heading">
                {t("home.flashcardTrust.heading")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed" data-testid="text-flashcard-trust-subtitle">
                {t("home.flashcardTrust.subtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-red-50/60 rounded-2xl border border-red-100 p-8" data-testid="card-other-platforms">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{t("home.flashcardTrust.otherPlatforms")}</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    t("home.flashcardTrust.issue1"),
                    t("home.flashcardTrust.issue2"),
                    t("home.flashcardTrust.issue3"),
                    t("home.flashcardTrust.issue4"),
                  ].map((issue, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`text-issue-${i}`}>
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-gray-700 leading-relaxed">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-8" data-testid="card-nursenest-flashcards">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{t("home.flashcardTrust.nurseNest")}</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    t("home.flashcardTrust.benefit1"),
                    t("home.flashcardTrust.benefit2"),
                    t("home.flashcardTrust.benefit3"),
                    t("home.flashcardTrust.benefit4"),
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3" data-testid={`text-benefit-${i}`}>
                      <CircleCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-primary/5 rounded-2xl border border-primary/10 shadow-sm p-8 max-w-3xl mx-auto" data-testid="card-flashcard-user-created">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900" data-testid="text-flashcard-user-created-heading">
                  {t("home.flashcardTrust.userCreated.heading")}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5" data-testid="text-flashcard-user-created-desc">
                {t("home.flashcardTrust.userCreated.desc")}
              </p>
              <ul className="space-y-3">
                {[
                  t("home.flashcardTrust.userCreated.benefit1"),
                  t("home.flashcardTrust.userCreated.benefit2"),
                  t("home.flashcardTrust.userCreated.benefit3"),
                  t("home.flashcardTrust.userCreated.benefit4"),
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700" data-testid={`text-flashcard-user-benefit-${i}`}>
                    <CircleCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-3xl mx-auto text-center" data-testid="card-flashcard-trust-cta">
              <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-bold text-gray-900 mb-3" data-testid="text-flashcard-trust-cta">
                {t("home.flashcardTrust.ctaTitle")}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6" data-testid="text-flashcard-trust-cta-desc">
                {t("home.flashcardTrust.ctaDesc")}
              </p>
              <button
                onClick={() => setLocation("/flashcards")}
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                data-testid="button-explore-flashcards"
              >
                {t("home.flashcardTrust.ctaButton")}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50" data-testid="section-faq-home">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-faq-heading">{t("home.faq.heading")}</h2>
              <p className="text-lg text-gray-600">{t("home.faq.subtitle")}</p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="faq-1" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q1")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a1")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q2")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a2")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q3")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a3")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q4")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a4")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q5")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a5")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q6")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a6")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6b" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q6b")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a6b")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q7")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a7")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-8" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q8")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a8")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-9" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q9")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a9prefix")} {formatCount(questionCount).replace('+', '')} {t("home.faq.a9suffix")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-10" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t("home.faq.q10")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {t("home.faq.a10")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-full px-6 border-primary/20 hover:bg-primary/5 text-gray-700" onClick={() => setLocation("/faq")} data-testid="button-view-all-faq">
                {t("home.faq.viewAll")}
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="py-20 bg-white" data-testid="section-email-capture">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-primary/5 to-accent-foreground/5 rounded-2xl shadow-lg border border-primary/10 p-8 sm:p-12">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-email-heading">{t("home.email.title")}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t("home.email.subtitle")}
              </p>
              {emailStatus === "success" ? (
                <div className="flex items-center justify-center gap-2 text-green-600 font-medium py-3" data-testid="text-subscribe-success">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{emailMessage}</span>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (emailStatus === "error") setEmailStatus("idle"); }}
                      onKeyDown={(e) => { if (e.key === "Enter") handleEmailSubscribe(); }}
                      placeholder={t("home.email.placeholder")} 
                      className="h-12 px-4 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                      data-testid="input-email"
                    />
                    <div className="flex items-center gap-2 justify-center">
                      <label className="text-sm text-gray-500">{t("home.email.frequencyLabel")}</label>
                      <select
                        value={emailFrequency}
                        onChange={(e) => setEmailFrequency(e.target.value)}
                        className="h-10 px-3 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                        data-testid="select-frequency"
                      >
                        <option value="daily">{t("home.email.freq.daily")}</option>
                        <option value="every_other_day">{t("home.email.freq.everyOtherDay")}</option>
                        <option value="twice_week">{t("home.email.freq.twiceWeek")}</option>
                        <option value="3x_week">{t("home.email.freq.threeWeek")}</option>
                        <option value="weekly">{t("home.email.freq.weekly")}</option>
                        <option value="biweekly">{t("home.email.freq.biweekly")}</option>
                        <option value="monthly">{t("home.email.freq.monthly")}</option>
                      </select>
                    </div>
                    <Button 
                      className="h-12 px-6 rounded-full bg-primary hover:brightness-110 text-white shadow-sm" 
                      data-testid="button-subscribe"
                      onClick={handleEmailSubscribe}
                      disabled={emailStatus === "loading"}
                    >
                      {emailStatus === "loading" ? "..." : t("home.email.button")}
                    </Button>
                  </div>
                  {emailStatus === "error" && (
                    <p className="text-sm text-red-500 mt-2" data-testid="text-subscribe-error">{emailMessage}</p>
                  )}
                </>
              )}
              <p className="text-xs text-gray-400 mt-4">{t("home.email.disclaimer")}</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-primary/5" data-testid="section-final-cta">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" data-testid="text-cta-heading">
              {t("home.cta.title")}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 text-white transition-[transform,box-shadow] hover:-translate-y-1" 
                onClick={() => setLocation("/start-free")}
                data-testid="button-cta-start"
              >
                {t("home.cta.button")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg rounded-full border-2 border-primary/20 hover:bg-primary/5 text-gray-700" 
                onClick={() => setLocation("/pricing")}
                data-testid="button-cta-pricing"
              >
                {t("home.hero.cta2")}
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">{t("home.cta.disclaimer")}</p>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent-foreground/5 rounded-full blur-3xl -z-10 opacity-40" />
        </section>
      </main>

      <Footer />
      <AdminEditButton />
    </div>
  );
}
