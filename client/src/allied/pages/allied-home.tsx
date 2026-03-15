import { useState } from "react";
import { Link } from "wouter";
import { CAREER_CONFIGS, getCanonicalRoute } from "@shared/careers";
import {
  Wind, Ambulance, Pill, Microscope, Radio, ArrowRight, BookOpen,
  FileText, Brain, Zap, CheckCircle2, TrendingUp, Users, Star, Mail,
  ShieldCheck, Building2, Hand, Activity
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AlliedSEO } from "@/allied/allied-seo";

const ALLIED_CAREERS = [
  { ...CAREER_CONFIGS.rrt, Icon: Wind },
  { ...CAREER_CONFIGS.paramedic, Icon: Ambulance },
  { ...CAREER_CONFIGS.pharmacyTech, Icon: Pill },
  { ...CAREER_CONFIGS.mlt, Icon: Microscope },
  { ...CAREER_CONFIGS.imaging, Icon: Radio },
  { ...CAREER_CONFIGS.psychotherapist, Icon: Brain },
  { ...CAREER_CONFIGS.socialWorker, Icon: Users },
  { ...CAREER_CONFIGS.addictionsCounsellor, Icon: ShieldCheck },
  { ...CAREER_CONFIGS.occupationalTherapy, Icon: Hand },
  { ...CAREER_CONFIGS.physicalTherapy, Icon: Activity },
];

const STATS = [
  { label: "Practice Questions", value: "6,500+", icon: BookOpen },
  { label: "Career Verticals", value: "10", icon: TrendingUp },
  { label: "AI Study Tools", value: "10+", icon: Brain },
  { label: "Mock Exam Modes", value: "3", icon: FileText },
];

export default function AlliedHomePage() {
  const [email, setEmail] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/allied/leads", {
        email,
        career: selectedCareer || "general",
        consent: true,
      });
      setSubmitted(true);
      toast({ title: "You're in!", description: "Check your inbox for your free diagnostic." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="allied-home-page">
      <AlliedSEO
        title="Allied Health Exam Prep - QBanks, Mock Exams & AI Study Tools"
        description="Prepare for your allied health certification with career-specific test banks, adaptive mock exams, flashcards, AI study tools, and personalized study plans for RRT, Paramedic, Pharmacy Tech, MLT, and Medical Imaging."
        keywords="allied health exam prep, RRT exam, paramedic exam, pharmacy tech exam, MLT exam, medical imaging exam, healthcare certification, NBRC, NREMT, PTCB, CSMLS, CAMRT, question bank, mock exam, study tools"
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NurseNest Allied - Healthcare Exam Academy",
          "url": "https://www.nursenest.ca/allied-health"
        }}
      />
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32" data-testid="allied-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-teal-100/80 text-teal-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6" data-testid="badge-allied">
              <Zap className="w-4 h-4" />
              Healthcare Exam Academy
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" data-testid="text-hero-title">
              Pass Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Healthcare Certification Exam</span> With Confidence
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              6,500+ practice questions, blueprint-weighted mock exams, AI study tools, and readiness tracking for RRT, Paramedic, Pharmacy Tech, MLT, and Diagnostic Imaging certifications. Join thousands of students who passed on their first attempt.
            </p>
            <p className="text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 inline-block mb-3" data-testid="text-hero-loss-aversion">
              Don't risk failing your certification exam — start building confidence today
            </p>
            <p className="text-sm text-gray-500 italic mb-6 max-w-xl mx-auto" data-testid="text-hero-future-self">
              Walk into your certification exam knowing exactly what to expect and how to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/diagnostic?career=general" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal-600 text-white rounded-xl text-base font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-200" data-testid="button-explore-careers">
                Take a Free Diagnostic <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/allied-health/careers" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-teal-700 rounded-xl text-base font-semibold hover:bg-teal-50 transition-all border border-teal-200" data-testid="button-view-pricing">
                Explore Career Paths
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-6" data-testid="allied-hero-trust-badges">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>Blueprint-aligned content</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <div className="max-w-lg mx-auto p-4 rounded-xl bg-white/70 border border-teal-100 backdrop-blur-sm" data-testid="allied-hero-clarity-block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">What you get</p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>Career-specific question banks with detailed rationales</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>Blueprint-weighted mock exams that mirror real test conditions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>AI-powered study plans and readiness tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100" data-testid="allied-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <stat.icon className="w-6 h-6 text-teal-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" data-testid="allied-career-cards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Career Path</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Each career vertical comes with exam-specific test banks, mock exams, and AI-powered study tools.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALLIED_CAREERS.filter(c => c.enabled).map(career => (
              <div key={career.slug} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-teal-200 transition-all h-full group" data-testid={`card-career-${career.slug}`}>
                <Link href={getCanonicalRoute(career.slug)} className="block">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: career.colorAccent }}>
                    <career.Icon className="w-6 h-6" style={{ color: career.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{career.shortName}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{career.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.examNames.slice(0, 2).map(exam => (
                      <span key={exam} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{exam}</span>
                    ))}
                  </div>
                </Link>
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                  <Link href={`/diagnostic?career=${career.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors" data-testid={`button-diagnostic-${career.slug}`}>
                    Free Diagnostic <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link href={`/qbank?career=${career.slug}`} className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors" data-testid={`link-qbank-${career.slug}`}>
                    Test Bank
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-teal-50/50 to-white" data-testid="allied-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything You Need to Pass</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Adaptive Test Bank", desc: "Thousands of exam-authentic questions with detailed rationales, filtered by topic, difficulty, and question type." },
              { icon: FileText, title: "Blueprint-Weighted Mocks", desc: "Timed mock exams weighted to your exam's blueprint. Get a readiness score and topic-level analytics." },
              { icon: Brain, title: "AI Study Planner", desc: "Enter your exam date and available hours. Get a personalized daily study plan that recalibrates weekly." },
              { icon: Zap, title: "Case Simulators", desc: "Unfolding clinical scenarios with decision nodes and detailed debriefs for deep learning." },
              { icon: TrendingUp, title: "Readiness Predictor", desc: "See your estimated pass probability based on rolling accuracy, topic coverage, and difficulty mastery." },
              { icon: CheckCircle2, title: "Weak Area Drills", desc: "Auto-generated targeted drills focusing on your lowest-performing topics." },
            ].map(feature => (
              <div key={feature.title} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <feature.icon className="w-8 h-8 text-teal-500 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="allied-study-tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Study Resources</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Jump directly into the study tools used by thousands of allied health students.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "RRT Test Bank", href: "/allied-health/qbank?career=rrt", icon: BookOpen },
              { label: "Paramedic Mock Exams", href: "/allied-health/paramedic/mock-exams", icon: FileText },
              { label: "Pharm Tech Flashcards", href: "/allied-health/pharmacy-technician/flashcards", icon: Brain },
              { label: "MLT Practice Questions", href: "/allied-health/mlt/canada/practice-questions", icon: BookOpen },
              { label: "OT Study Guide", href: "/allied-health/occupational-therapy/study-guide", icon: FileText },
              { label: "PT Mock Exam", href: "/allied-health/physical-therapy/mock-exam", icon: FileText },
            ].map(tool => (
              <Link key={tool.label} href={tool.href} className="group flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all text-center" data-testid={`link-study-tool-${tool.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <tool.icon className="w-5 h-5 text-teal-500 group-hover:text-teal-600" />
                <span className="text-xs font-medium text-gray-700 group-hover:text-teal-700">{tool.label}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/allied-health" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700" data-testid="link-all-career-guides">
              View all career guides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="allied-institutional-cta">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 rounded-2xl overflow-hidden p-8 sm:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 rounded-full px-3 py-1 text-xs font-medium mb-4" data-testid="badge-institutional">
                  <Building2 className="w-3.5 h-3.5" />
                  For Programs and Institutions
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" data-testid="text-institutional-title">
                  Equip Your Students with Exam-Ready Tools
                </h2>
                <p className="text-gray-300 mb-6 max-w-lg">
                  Institutional licensing gives your program cohort-wide access to test banks, mock exams, readiness tracking, and faculty analytics. Volume pricing available for programs of all sizes.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/allied-health/institutions" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl text-sm font-semibold hover:bg-teal-400 transition-colors" data-testid="button-institutional-learn">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/allied-health/institutions/faq" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/20 transition-colors" data-testid="button-institutional-faq">
                    Institutional FAQ
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 gap-3 text-center">
                {[
                  { val: "50+", label: "Programs" },
                  { val: "2,500+", label: "Students" },
                  { val: "92%", label: "Renewal Rate" },
                  { val: "24h", label: "Onboarding" },
                ].map(item => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-4 min-w-[100px]" data-testid={`stat-inst-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="text-xl font-bold text-white">{item.val}</div>
                    <div className="text-xs text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="allied-email-capture">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 sm:p-12 border border-teal-100">
            <Mail className="w-10 h-10 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get a Free Diagnostic + Weekly Study Plan</h2>
            <p className="text-gray-600 mb-6">Enter your email and career to receive a free diagnostic assessment and personalized weekly study tips.</p>
            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-teal-700 font-medium" data-testid="text-email-success">
                <CheckCircle2 className="w-5 h-5" />
                Thanks! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  data-testid="input-email"
                />
                <select
                  value={selectedCareer}
                  onChange={e => setSelectedCareer(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  data-testid="select-career"
                >
                  <option value="">Select career</option>
                  {ALLIED_CAREERS.map(c => (
                    <option key={c.slug} value={c.slug}>{c.shortName}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
                  data-testid="button-submit-email"
                >
                  {submitting ? "Sending..." : "Get Started"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
