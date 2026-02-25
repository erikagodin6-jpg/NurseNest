import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
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
  Microscope
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [region, setRegion] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  useEffect(() => {
    const handler = () => setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
    window.addEventListener("regionChange", handler);
    return () => window.removeEventListener("regionChange", handler);
  }, []);

  const examLabel = region === "CA" ? "REX-PN" : "NCLEX";
  const rpnLabel = region === "CA" ? "RPN" : "LVN";
  const altExam = region === "CA" ? "NCLEX" : "REX-PN";

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500">
      <SEO
        title="NurseNest - Nursing Exam Prep | NCLEX & REX-PN Question Bank, Clinical Simulations & Flashcards"
        description={`Prepare for nursing licensure examinations with NurseNest. Access 10,000+ practice questions designed to mirror the cognitive patterns tested on ${examLabel} and ${altExam}, clinical case simulations, pharmacology flashcards, and pathophysiology lessons. Built for ${rpnLabel}, RN, and NP students in Canada and the US. Start free - no credit card required.`}
        keywords="nursing exam prep, NCLEX practice questions, REX-PN exam preparation, nursing question bank, clinical simulations nursing, pharmacology flashcards nursing, pathophysiology lessons, RPN study guide, RN exam review, NP exam prep, Next Generation NCLEX, NCLEX-RN practice questions, nursing clinical reasoning, med-surg nursing review, nursing licensure exam, clinical judgment nursing, nursing study tools, nursing board exam prep, NCLEX review course, nursing practice test"
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NurseNest",
          "url": "https://www.nursenest.ca",
          "description": "Comprehensive nursing exam preparation platform with 10,000+ practice questions, clinical case simulations, and pathophysiology lessons designed to align with the content domains tested on nursing licensure examinations.",
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
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium text-gray-600">10,000+ Practice Questions & Clinical Simulations</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]" data-testid="text-hero-heading">
                Nursing Exam Prep{" "}
                <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                  That Teaches You to Think Like a Clinician
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subheading">
                A question bank, clinical case simulations, pharmacology flashcards, and pathophysiology lessons designed to mirror the cognitive patterns tested on nursing licensure examinations. Built for {rpnLabel}, RN, and NP students preparing for {examLabel}, {altExam}, clinical placements, and the transition from student to practicing nurse.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 px-4 sm:px-0">
                <Button 
                  size="lg" 
                  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 text-white w-full sm:w-auto" 
                  onClick={() => setLocation("/start-free")}
                  data-testid="button-hero-start-free"
                >
                  Start Your Exam Prep Free
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
                  Explore the Full Lesson Library
                </Button>
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-sm text-primary font-semibold">Created by nurses, for nurses.</p>
                <p className="text-xs text-gray-400">No credit card required. Free lessons and anatomy content included.</p>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Evidence-Informed Content</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Rationale-Based Learning</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{rpnLabel}, RN & NP Tracks</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 rounded-full border border-primary/10 backdrop-blur-sm shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Canada & US Coverage</span>
                </div>
              </div>

              {region === "CA" && (
                <div className="mt-6 max-w-2xl mx-auto" data-testid="banner-canadian-content">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-200/60 shadow-md px-6 py-5">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500 rounded-l-2xl" />
                    <div className="flex items-start gap-4 pl-2">
                      <span className="text-3xl shrink-0 mt-0.5" role="img" aria-label="Canadian flag">🍁</span>
                      <div>
                        <p className="font-bold text-gray-900 text-base">Built for Canadian Nursing Students</p>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          NurseNest is the first nursing exam prep platform to deliver Canadian lab values, Canadian scope-of-practice language, and content aligned with Canadian nursing regulatory standards. All lab reference ranges, clinical scenarios, and scope guidance reflect what Canadian nurses actually encounter in practice and on the REX-PN.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Platform Features Showcase */}
        <section className="py-20 bg-gradient-to-b from-white via-primary/3 to-white relative z-10" data-testid="section-platform-features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Everything You Need in One Platform</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5" data-testid="text-features-heading">
                The Most Complete Nursing Exam Prep Platform
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                From your first anatomy lesson to the day you pass your licensing exam, NurseNest gives you every tool you need to study smarter, build confidence, and think like a clinician.
              </p>
            </div>

            {/* Headline Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-4xl mx-auto">
              {[
                { value: "10,000+", label: "Practice Questions", icon: Target, color: "from-blue-500 to-indigo-600" },
                { value: "400+", label: "Clinical Lessons", icon: BookOpen, color: "from-emerald-500 to-teal-600" },
                { value: "9", label: "Clinical Simulators", icon: Gamepad2, color: "from-purple-500 to-violet-600" },
                { value: "3", label: `Exam Tracks (${rpnLabel}/RN/NP)`, icon: GraduationCap, color: "from-rose-500 to-pink-600" },
              ].map((stat, i) => (
                <div key={i} className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 text-center group" data-testid={`stat-feature-${i}`}>
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
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/mock-exams")}
                data-testid="card-feature-mock-exams"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Timed Mock Exams</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">Full-length simulated exams with configurable length (25-150 questions), question flagging, pause/resume, and a detailed post-exam report with score trends and weak area breakdown.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{examLabel} Format</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Score Trends</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Auto-Save</span>
                </div>
              </div>

              {/* Clinical Simulators */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/first-action-simulator")}
                data-testid="card-feature-simulators"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">9 Interactive Clinical Simulators</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">Practice real-world clinical decisions: first-action prioritization, IV complications, deteriorating patients, electrolyte/ABG interpretation, blood transfusion safety, and hazard detection.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">Branching Scenarios</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">Instant Feedback</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">2 Free</span>
                </div>
              </div>

              {/* Question Bank */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/question-bank")}
                data-testid="card-feature-question-bank"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">10,000+ Practice Questions</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">Filter by tier, body system, or topic. Every question includes detailed rationales explaining why the correct answer is right and why each distractor is wrong.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{rpnLabel}/RN/NP</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Deep Rationales</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Progress Tracking</span>
                </div>
              </div>

              {/* Pharmacology Flashcards */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/flashcards")}
                data-testid="card-feature-flashcards"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Pill className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pharmacology Flashcards</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">Study drug classes by mechanism of action with flip-card review, bookmark flagging, mastery tracking, and custom flashcard creation. Plus a full Medication Mastery drug explorer.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Custom Cards</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Drug Explorer</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Mastery Tracking</span>
                </div>
              </div>

              {/* Med Math & Lab Values */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/med-math")}
                data-testid="card-feature-med-math"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Med Math & Lab Interpretation</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">Randomized clinical calculations with stepwise solutions, plus an abnormal lab interpretation engine with cluster-based scenarios and ABG analysis practice.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Stepwise Solutions</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">ABG Analysis</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Lab Clusters</span>
                </div>
              </div>

              {/* Video Lectures */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setLocation("/lectures")}
                data-testid="card-feature-lectures"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/50 to-transparent rounded-bl-full" />
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Video & Micro-Lectures</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">Full video lectures and bite-sized micro-lectures with slide-based lessons, clinical pearls, voiceover, and knowledge checks built in. Learn on your schedule.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">Video Lectures</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">Clinical Pearls</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">Free Content</span>
                </div>
              </div>
            </div>

            {/* Secondary Features Strip */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setLocation("/dashboard")} data-testid="card-feature-dashboard">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <LayoutDashboard className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Learning Dashboard</h4>
                  <p className="text-xs text-gray-500">Drag-and-drop widgets, study streaks, progress tracking</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setLocation("/reports")} data-testid="card-feature-analytics">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Performance Analytics</h4>
                  <p className="text-xs text-gray-500">Track scores by body system, spot weak areas, see trends</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setLocation("/question-of-the-day")} data-testid="card-feature-qotd">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                  <MessageSquareQuote className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Question of the Day</h4>
                  <p className="text-xs text-gray-500">Daily clinical reasoning question with detailed rationale</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setLocation("/blog")} data-testid="card-feature-blog">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                  <Newspaper className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Scholarly Blog</h4>
                  <p className="text-xs text-gray-500">APA7-cited articles on nursing topics and exam strategy</p>
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
                    <h4 className="text-sm font-bold text-gray-900">Canada & US</h4>
                    <p className="text-xs text-gray-500 mt-0.5">CAD/USD pricing, regional lab values, scope-of-practice language</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Microscope className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Deep Pathophysiology</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Cellular-level explanations, receptor-level drug MOA, not just surface summaries</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Tier-Specific Scope</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{rpnLabel} monitor/report, RN protocol-based, NP order/prescribe</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Hand-Drawn Illustrations</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Original copyrighted medical illustrations created by nursing professionals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button
                size="lg"
                className="h-14 px-10 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 text-white transition-all hover:-translate-y-1"
                onClick={() => setLocation("/start-free")}
                data-testid="button-features-start-free"
              >
                Start Free  -  No Credit Card Required
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
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Free & Interactive</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-free-learning-heading">Start Building Your Clinical Foundation</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                No account needed. Explore interactive anatomy, concept checks, and foundational modules designed to develop the clinical thinking that exam questions actually test.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/pre-nursing")} data-testid="card-free-pre-nursing">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Nursing Foundations</h3>
                  <p className="text-sm text-gray-600 mb-3">Interactive modules on cell biology, physiology principles, medical terminology, pharmacology basics, and pathophysiology logic.</p>
                  <span className="text-xs text-primary font-medium">5 interactive modules</span>
                </CardContent>
              </Card>

              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/anatomy")} data-testid="card-free-anatomy">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <HeartPulse className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Anatomy & Physiology</h3>
                  <p className="text-sm text-gray-600 mb-3">Click-to-label diagrams of cardiovascular, respiratory, neurological, renal, and endocrine systems with immediate feedback.</p>
                  <span className="text-xs text-primary font-medium">Click-to-label exercises</span>
                </CardContent>
              </Card>

              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/clinical-clarity")} data-testid="card-free-clinical-clarity">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Clarity</h3>
                  <p className="text-sm text-gray-600 mb-3">Clear, evidence-based answers to "Why does X happen?" questions that students commonly get wrong on exams.</p>
                  <span className="text-xs text-primary font-medium">Explore topics</span>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-10">
              <Button className="rounded-full px-8 h-12 bg-primary hover:brightness-110 text-white shadow-md" onClick={() => setLocation("/pre-nursing")} data-testid="button-explore-free">
                Explore Free Modules
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* What You Can Study Section */}
        <section className="py-24 bg-white/50 backdrop-blur-sm relative z-10" data-testid="section-study-topics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-study-heading">What You Can Study on NurseNest</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every topic is built around the clinical reasoning patterns tested on nursing licensure examinations. No filler content. No outdated material. Every lesson connects pathophysiology to the decision-making frameworks that examiners use to write questions.
              </p>
            </div>

            <p className="text-center text-sm text-gray-500 mb-12 max-w-2xl mx-auto">
              Structured from foundational concepts to advanced clinical judgment. Whether you are in your first semester or preparing for your licensing exam, the content meets you where you are.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: HeartPulse, title: "Medical-Surgical Nursing", desc: "Master cardiovascular, respiratory, neurological, gastrointestinal, renal, and endocrine pathophysiology through lessons designed to align with exam content domains. Each module connects disease mechanisms to the clinical prioritization and acute deterioration patterns that licensing examinations assess most heavily.", color: "bg-red-50 text-red-600" },
                { icon: Pill, title: "Pharmacology & Medication Safety", desc: "Study drug classes organized by mechanism of action, with emphasis on side effect profiles, contraindications, and high-alert medications. Content is designed to mirror the cognitive patterns tested on nursing licensure examinations, including dosage calculation errors and medication safety scenarios that appear frequently.", color: "bg-blue-50 text-blue-600" },
                { icon: Baby, title: "Maternal, Newborn & Pediatric Nursing", desc: "Comprehensive coverage of pregnancy complications, labor and delivery assessment, postpartum care, neonatal danger signs, and pediatric conditions across developmental stages. Lessons emphasize the critical thinking required to differentiate normal from abnormal findings in obstetric and pediatric clinical scenarios.", color: "bg-pink-50 text-pink-600" },
                { icon: Brain, title: "Mental Health Nursing", desc: "Explore psychiatric conditions, therapeutic communication techniques, crisis intervention protocols, and psychopharmacology through a clinical reasoning lens. Content addresses the cognitive traps that examinations use in psychiatric scenarios, helping you recognize safety-based nursing responses under pressure.", color: "bg-purple-50 text-purple-600" },
                { icon: FlaskConical, title: "Lab Values & Critical Diagnostics", desc: "Go beyond memorizing normal ranges. Learn to interpret abnormal lab clusters, analyze arterial blood gases, recognize electrolyte emergencies, and connect diagnostic findings to immediate nursing actions. Each lesson builds the cluster-based reasoning that exam questions demand.", color: "bg-emerald-50 text-emerald-600" },
                { icon: Activity, title: "Critical Care & Emergency Response", desc: "Develop rapid assessment skills for shock recognition, respiratory failure patterns, neurological deterioration, sepsis identification, and metabolic emergencies like DKA and HHS. Lessons are structured around the clinical judgment process used in acute care settings and tested on licensing examinations.", color: "bg-orange-50 text-orange-600" },
                { icon: Target, title: "Clinical Prioritization & Delegation", desc: "Practice who-do-you-see-first scenarios, delegation decision-making, and the safety-based frameworks that underpin every prioritization question on nursing examinations. Learn to distinguish acute findings from expected findings and apply assignment logic confidently under timed conditions.", color: "bg-indigo-50 text-indigo-600" },
                { icon: Stethoscope, title: "Clinical Case Simulations", desc: "Work through branching patient scenarios for conditions like sepsis, myocardial infarction, diabetic ketoacidosis, and stroke. Each simulation follows a consequence-based decision pathway, allowing you to practice the clinical judgment process in a risk-free environment before exam day.", color: "bg-teal-50 text-teal-600" },
                { icon: GraduationCap, title: "Pathophysiology & Clinical Reasoning", desc: "Understand disease processes at the cellular and molecular level, explained in clinical context. When you know why a condition produces specific signs and symptoms, you can reason through unfamiliar exam questions instead of relying on memorization alone.", color: "bg-amber-50 text-amber-600" },
              ].map((topic, i) => (
                <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden group bg-white cursor-pointer" onClick={() => setLocation("/lessons")} data-testid={`card-topic-${i}`}>
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
                Browse All 150+ Lessons
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
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Beyond the Exam</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" data-testid="text-new-nurses-heading">
                  From Student to Practicing Nurse
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Passing the exam is the first milestone. NurseNest also prepares you for the clinical realities that textbooks skip: floor-specific protocols, shift prioritization, recognizing patient deterioration in real time, and building confidence as a new hire.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "New Graduate Transition", desc: "Practical clinical reasoning for your first weeks on the floor. Shift organization, time management, and knowing when to escalate." },
                    { title: "Floor-Specialty Readiness", desc: "Med-surg, ICU, ER, pediatrics, maternal-newborn, and mental health. Understand the assessment patterns and red flags specific to your unit." },
                    { title: "Medication Safety in Practice", desc: "High-alert drug protocols, IV medication safety, common look-alike/sound-alike errors, and dose verification workflows used in hospitals." },
                    { title: "Clinical Deterioration Recognition", desc: "Early warning signs, NEWS/MEWS scoring concepts, SBAR escalation frameworks, and the assessment sequences that prevent adverse events." },
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
                  { value: "150+", label: "Clinical Lessons", icon: BookOpen },
                  { value: "10,000+", label: "Practice Questions", icon: Target },
                  { value: "25+", label: "Body Systems", icon: HeartPulse },
                  { value: "6", label: "Study Modes", icon: Layers },
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-why-heading">Why Students Choose NurseNest</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Most study tools hand you a question and an answer key. NurseNest teaches you how to reason through clinical problems the way licensing exams expect you to, so unfamiliar questions stop being intimidating.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "Rationale-First Design",
                  desc: "Every question, lesson, and simulation explains the clinical reasoning behind the correct answer. You learn why an option is right and why the others are wrong, building the judgment patterns that examiners assess on licensing examinations."
                },
                {
                  icon: Brain,
                  title: "Clinical Judgment Architecture",
                  desc: "Content is organized around the cognitive patterns tested on nursing licensure examinations: recognizing cues, analyzing hypotheses, prioritizing actions, and evaluating outcomes. This mirrors the clinical judgment framework that modern exams are designed to measure."
                },
                {
                  icon: Layers,
                  title: "Structured Progression",
                  desc: "Start with foundational pathophysiology and build toward complex case analysis. Each lesson connects to related topics so concepts reinforce each other instead of existing in isolation, taking you from beginner to advanced systematically."
                },
                {
                  icon: Stethoscope,
                  title: "Interactive Case Simulations",
                  desc: "Work through branching patient scenarios where your decisions determine outcomes. Practice clinical reasoning in a risk-free environment before your exam or your first shift, with detailed feedback on every decision point."
                },
                {
                  icon: BarChart3,
                  title: "Performance Analytics",
                  desc: "Track your proficiency by body system, identify weak areas with precision, and focus your study time where it matters most. Pre-test and post-test comparison data shows exactly how your clinical reasoning is improving over time."
                },
                {
                  icon: Zap,
                  title: "Exam-Relevant, Zero Filler",
                  desc: "Every lesson covers high-yield concepts that align with the content domains tested on nursing licensure examinations. No obscure topics, no outdated protocols, no wasted study sessions. Study what will actually be assessed."
                },
              ].map((feature, i) => (
                <div key={i} className="bg-gray-50/80 rounded-2xl p-8 hover:shadow-md transition-all duration-300 border border-gray-100" data-testid={`card-feature-${i}`}>
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

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50" data-testid="section-faq-home">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-faq-heading">Common Questions About NurseNest</h2>
              <p className="text-lg text-gray-600">Straightforward answers about how NurseNest works and what to expect.</p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="faq-1" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  Is NurseNest affiliated with NCLEX, NCSBN, or any licensing body?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  No. NurseNest is an independent educational platform. It is not affiliated with, endorsed by, or connected to NCLEX, NCSBN, CNO, or any nursing regulatory body. All content is developed independently by nursing professionals and is designed to align with the content domains and cognitive patterns assessed on nursing licensure examinations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  Are the practice questions similar to what appears on nursing licensure exams?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  NurseNest questions are designed to mirror the clinical reasoning and cognitive patterns tested on nursing licensure examinations. They are not actual exam questions, but they target the same thinking skills, content domains, and clinical judgment frameworks that examiners use to assess readiness for practice. This includes Next Generation-style case studies and clinical judgment scenarios.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  Can I use NurseNest while still in nursing school?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  Absolutely. Many nursing students use NurseNest alongside their coursework to reinforce pathophysiology, pharmacology, and clinical reasoning skills. The structured progression from foundational concepts to advanced case analysis is designed to complement how nursing programs build knowledge across semesters, making it valuable from your first year through graduation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  How is NurseNest different from a traditional question bank?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  Traditional question banks give you a question, four options, and the correct answer. NurseNest provides deep rationales explaining why the correct answer is right and why each distractor is wrong. It connects questions to pathophysiology lessons, includes interactive case simulations with branching outcomes, and tracks your performance across body systems to target your weak areas. The goal is to build clinical reasoning, not just test recall.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  Does NurseNest cover both Canadian and US nursing content?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  Yes. NurseNest supports exam preparation for all major nursing licensure examinations, including NCLEX-RN, NCLEX-PN, REX-PN, and NP certification exams (ANCC, AANP). Whether you're preparing for your RPN/LVN, RN, or Nurse Practitioner licensing exam in Canada or the United States, NurseNest has you covered. The platform adjusts regional content including lab value units, pricing currency, and scope-of-practice language based on your region selection. Core pathophysiology and clinical reasoning content is applicable across both jurisdictions, ensuring comprehensive preparation regardless of where you plan to practice.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  What does the free plan include?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  The free plan includes Pre-Nursing Foundations modules, interactive anatomy and physiology diagrams, Clinical Clarity explanations, access to the lesson library for browsing, and limited practice questions. No credit card is required to start. Premium plans unlock the full question bank, clinical case simulations, flashcard decks, med math tools, and performance analytics.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  Can I cancel my subscription at any time?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  Yes. All subscriptions can be cancelled at any time through your profile page. You retain access to premium features until the end of your current billing period. There are no cancellation fees or long-term commitments.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-8" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  Does NurseNest include Next Generation NCLEX-style questions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  Yes. NurseNest includes question formats designed to mirror the cognitive patterns tested on Next Generation nursing licensure examinations, including case studies with multiple response points, drag-and-drop prioritization, highlight-the-evidence items, and clinical judgment scenarios that require you to recognize cues, analyze information, and evaluate outcomes. These formats are integrated throughout the question bank and clinical simulations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-9" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  How many practice questions are available on NurseNest?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  NurseNest offers over 10,000 practice questions spanning all major nursing content areas including medical-surgical, pharmacology, maternal-newborn, pediatrics, mental health, critical care, and clinical prioritization. New questions are added regularly to ensure comprehensive coverage of the content domains assessed on nursing licensure examinations. Each question includes a detailed rationale explaining the clinical reasoning behind the correct answer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-10" className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  Is the content reviewed by nursing professionals?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  Yes. All NurseNest content is developed and reviewed by nursing professionals with clinical and educational expertise. Lessons, practice questions, and case simulations are created to reflect current evidence-based practice guidelines and are designed to align with the content domains assessed on nursing licensure examinations. Content is regularly updated to maintain clinical accuracy and relevance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-full px-6 border-primary/20 hover:bg-primary/5 text-gray-700" onClick={() => setLocation("/faq")} data-testid="button-view-all-faq">
                View All FAQs
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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-email-heading">Free Clinical Reasoning Questions Delivered Weekly</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Receive weekly practice questions with detailed rationales, pharmacology review cards, and exam strategy breakdowns. Written by nursing educators. Useful from day one. Unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 h-12 px-4 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                  data-testid="input-email"
                />
                <Button className="h-12 px-6 rounded-full bg-primary hover:brightness-110 text-white shadow-sm" data-testid="button-subscribe">
                  Send Me Practice Questions
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">No spam. No sales pitches. Just clinically useful study material.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-primary/5" data-testid="section-final-cta">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" data-testid="text-cta-heading">
              Stop Memorizing. Start Reasoning.
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Nursing licensure examinations test clinical reasoning, not recall. NurseNest teaches you to think through problems the way real clinicians do, whether you are preparing for your exam, starting your first clinical placement, or transitioning to a new unit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 text-white transition-all hover:-translate-y-1" 
                onClick={() => setLocation("/start-free")}
                data-testid="button-cta-start"
              >
                Start Your Exam Prep Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg rounded-full border-2 border-primary/20 hover:bg-primary/5 text-gray-700" 
                onClick={() => setLocation("/pricing")}
                data-testid="button-cta-pricing"
              >
                View Plans & Pricing
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">No credit card required. Free anatomy content and practice questions included.</p>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent-foreground/5 rounded-full blur-3xl -z-10 opacity-40" />
        </section>
      </main>

      <Footer />
      <AdminEditButton />
    </div>
  );
}
