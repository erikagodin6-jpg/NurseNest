import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  ArrowRight, 
  Star, 
  Shield, 
  Clock, 
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
  Sparkles
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

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500">
      <SEO
        title="NurseNest - NCLEX & REX-PN Exam Prep | Question Bank, Simulations & Flashcards"
        description="Prepare for NCLEX and REX-PN with NurseNest. Comprehensive question bank, clinical simulations, pharmacology flashcards, and pathophysiology lessons for RPN/LVN, RN, and NP nursing students."
        keywords="NCLEX prep, REX-PN exam, nursing question bank, clinical simulations, pharmacology flashcards, pathophysiology lessons, RPN study, RN exam prep, NP training, nursing exam preparation, clinical reasoning, med-surg nursing"
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NurseNest",
          "url": "https://nursenest.replit.app",
          "description": "Comprehensive nursing exam preparation platform with question bank, clinical simulations, and pathophysiology lessons for NCLEX and REX-PN candidates.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nursenest.replit.app/lessons?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32" data-testid="hero-section">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl animate-pulse duration-[10s]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/30 blur-3xl animate-pulse duration-[15s]" />
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-foreground/10 blur-3xl animate-pulse duration-[20s]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium text-gray-600">150+ Clinical Lessons Now Available</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]" data-testid="text-hero-heading">
                {examLabel} & Nursing Exam Prep <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">Built for Clinical Reasoning</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subheading">
                Study smarter for {examLabel} with a comprehensive question bank, clinical case simulations, pharmacology flashcards, and pathophysiology lessons designed around how licensing exams actually test you. Built for {rpnLabel}, RN, and NP students across Canada and the US.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 text-white" 
                  onClick={() => setLocation("/start-free")}
                  data-testid="button-hero-start-free"
                >
                  Start Studying Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-lg rounded-full border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 text-gray-700 bg-white/50" 
                  onClick={() => setLocation("/lessons")}
                  data-testid="button-hero-browse"
                >
                  <BookOpen className="mr-2 w-5 h-5 text-primary" />
                  Browse the Lesson Library
                </Button>
              </div>

              <p className="text-sm text-primary font-medium pt-2">Created for nurses, by nurses.</p>
              <p className="text-xs text-gray-400">No credit card required. Free interactive lessons included.</p>

              <div className="pt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-primary/10 backdrop-blur-sm">
                  <Shield className="w-5 h-5 text-primary/70" />
                  <span>Evidence-Informed</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-primary/10 backdrop-blur-sm">
                  <Brain className="w-5 h-5 text-primary/70" />
                  <span>Interactive & Visual</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-primary/10 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-primary/70 fill-primary/70" />
                  <span>{rpnLabel}, RN & NP Tracks</span>
                </div>
              </div>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-free-learning-heading">Start Learning for Free</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                No account needed. Explore interactive anatomy, concept checks, and foundational modules designed to build your clinical thinking.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/pre-nursing")} data-testid="card-free-pre-nursing">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Nursing Foundations</h3>
                  <p className="text-sm text-gray-600 mb-3">Interactive modules on cell biology, physiology, medical terminology, pharmacology basics, and pathophysiology logic.</p>
                  <span className="text-xs text-primary font-medium">5 interactive modules →</span>
                </CardContent>
              </Card>

              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/anatomy")} data-testid="card-free-anatomy">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <HeartPulse className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Anatomy</h3>
                  <p className="text-sm text-gray-600 mb-3">Click-to-label diagrams of cardiovascular, respiratory, neurological, renal, and endocrine systems.</p>
                  <span className="text-xs text-primary font-medium">Click-to-label exercises →</span>
                </CardContent>
              </Card>

              <Card className="border border-primary/15 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white cursor-pointer group" onClick={() => setLocation("/clinical-clarity")} data-testid="card-free-concept-checks">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinical Clarity</h3>
                  <p className="text-sm text-gray-600 mb-3">Explore "Why does X happen?" topics with clear, evidence-based explanations for common clinical questions.</p>
                  <span className="text-xs text-primary font-medium">Explore topics →</span>
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
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-study-heading">What You Can Study</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every topic is structured around clinical reasoning and exam logic. NurseNest covers the high-yield domains that appear most frequently on {examLabel} and nursing licensure examinations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: HeartPulse, title: "Medical-Surgical Nursing", desc: "Cardiovascular, respiratory, neurological, GI, renal, and endocrine pathophysiology with clinical prioritization frameworks.", color: "bg-red-50 text-red-600" },
                { icon: Pill, title: "Pharmacology & Medication Safety", desc: "Drug classes, mechanisms of action, side effects, contraindications, and high-alert medication protocols tested on licensing exams.", color: "bg-blue-50 text-blue-600" },
                { icon: Baby, title: "Maternal, Newborn & Pediatrics", desc: "Pregnancy complications, labor and delivery, postpartum care, neonatal assessment, pediatric conditions, and immunization safety.", color: "bg-pink-50 text-pink-600" },
                { icon: Brain, title: "Mental Health Nursing", desc: "Psychiatric conditions, therapeutic communication, crisis intervention, psychopharmacology, and safety-based nursing responses.", color: "bg-purple-50 text-purple-600" },
                { icon: FlaskConical, title: "Lab Values & Diagnostics", desc: "Abnormal lab interpretation, ABG analysis, critical value recognition, and cluster-based clinical reasoning across 12 scenarios.", color: "bg-emerald-50 text-emerald-600" },
                { icon: Activity, title: "Critical Care & Deterioration", desc: "Shock recognition, respiratory failure patterns, neurological deterioration, fluid resuscitation logic, and rapid response triggers.", color: "bg-orange-50 text-orange-600" },
                { icon: Target, title: "Clinical Prioritization", desc: "Who-do-you-see-first scenarios, delegation traps, acute vs expected findings, and safety-based decision frameworks.", color: "bg-indigo-50 text-indigo-600" },
                { icon: Stethoscope, title: "Clinical Skill Simulations", desc: "Branching case simulations for sepsis, MI, DKA, and more. Practice clinical judgment with consequence-based decision pathways.", color: "bg-teal-50 text-teal-600" },
                { icon: GraduationCap, title: "Pathophysiology Deep Dives", desc: "Cellular and molecular-level mechanisms explained in plain language. Understand the 'why' behind every condition and intervention.", color: "bg-amber-50 text-amber-600" },
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

        {/* Why NurseNest Section */}
        <section className="py-24 bg-primary/5 border-y border-primary/10" data-testid="section-why-nursenest">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-why-heading">Why Students Choose NurseNest</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Most study tools give you questions and answers. NurseNest teaches you how to think through clinical problems the way licensing exams expect you to.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "Rationale-First Design",
                  desc: "Every question, lesson, and simulation explains the clinical reasoning behind the answer. You learn why an option is correct, not just which one to pick."
                },
                {
                  icon: Brain,
                  title: "Clinical Judgment Focus",
                  desc: "Content is structured around the cognitive patterns tested on modern nursing exams. Prioritization, delegation, and safety logic are embedded throughout."
                },
                {
                  icon: Layers,
                  title: "Structured Progression",
                  desc: "Start with foundational pathophysiology and build toward complex case analysis. Each lesson connects to related topics so concepts reinforce each other."
                },
                {
                  icon: Activity,
                  title: "Interactive Case Simulations",
                  desc: "Work through branching patient scenarios where your decisions determine outcomes. Practice clinical reasoning in a risk-free environment before your exam."
                },
                {
                  icon: BarChart3,
                  title: "Performance Analytics",
                  desc: "Track your proficiency by body system, identify weak areas, and get targeted study recommendations based on your quiz and test performance."
                },
                {
                  icon: Zap,
                  title: "Exam-Relevant Content",
                  desc: "Every lesson is built around high-yield concepts that appear on NCLEX and REX-PN. No filler topics, no outdated material, no wasted study time."
                },
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300" data-testid={`card-feature-${i}`}>
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

        {/* Stats Section */}
        <section className="py-20 bg-white" data-testid="section-stats">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Clinical Lessons", value: "150+", icon: BookOpen },
                { label: "Practice Questions", value: "10,000+", icon: Target },
                { label: "Body Systems", value: "25+", icon: HeartPulse },
                { label: "Study Modes", value: "6", icon: Layers },
              ].map((stat, i) => (
                <div key={i} className="space-y-2" data-testid={`stat-${i}`}>
                  <div className="mx-auto w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5" data-testid="section-email-capture">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-8 sm:p-12">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-email-heading">Free Study Resources in Your Inbox</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Get weekly clinical reasoning questions, pharmacology review cards, and exam strategy tips. Written by nursing educators, not marketers. Unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 h-12 px-4 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-gray-50"
                  data-testid="input-email"
                />
                <Button className="h-12 px-6 rounded-full bg-primary hover:brightness-110 text-white shadow-sm" data-testid="button-subscribe">
                  Send Me Study Tips
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">No spam. No sales pitches. Just clinically useful study material.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden" data-testid="section-final-cta">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" data-testid="text-cta-heading">Stop Memorizing. Start Understanding.</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Nursing exams test clinical reasoning, not recall. NurseNest teaches you to think through problems the way real clinicians do.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 text-white transition-all hover:-translate-y-1" 
                onClick={() => setLocation("/start-free")}
                data-testid="button-cta-start"
              >
                Start Your Free Account
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
            <p className="text-sm text-gray-400 mt-6">Free anatomy content included. No credit card needed to start.</p>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent-foreground/10 rounded-full blur-3xl -z-10 opacity-60" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-foreground rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-semibold text-gray-900">NurseNest</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <a href="/terms" className="hover:text-primary transition-colors">Terms of Use</a>
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
              <a href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</a>
              <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NurseNest. All Rights Reserved.
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
            NurseNest is an independent educational platform. It is not affiliated with, endorsed by, or connected to NCLEX, NCSBN, CNO, or any nursing regulatory body. All content is developed independently for educational purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}
