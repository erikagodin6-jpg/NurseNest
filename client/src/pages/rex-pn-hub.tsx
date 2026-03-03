import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { LocaleLink } from "@/lib/LocaleLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Clock,
  FileText,
  Target,
  BarChart3,
  Shield,
  Stethoscope,
  CheckCircle,
  Layers,
  Activity,
  Scale,
  GraduationCap,
  AlertCircle,
  Calculator,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";
import { useLocation } from "wouter";

const domains = [
  { name: "Foundations of Practice", weight: 36, color: "bg-blue-500" },
  { name: "Collaborative Practice", weight: 30, color: "bg-emerald-500" },
  { name: "Professional Practice", weight: 16, color: "bg-purple-500" },
  { name: "Ethical Practice", weight: 10, color: "bg-amber-500" },
  { name: "Legal Practice", weight: 8, color: "bg-red-500" },
];

const questionFormats = [
  {
    title: "Multiple Choice (MCQ)",
    description: "Single best answer from four options. The most common format on the REx-PN, testing application of clinical knowledge to patient scenarios.",
    icon: CheckCircle,
  },
  {
    title: "Select All That Apply (SATA)",
    description: "Identify all correct responses from a list. No partial credit is awarded. You must select every correct option and no incorrect options.",
    icon: ClipboardCheck,
  },
  {
    title: "Numeric Fill-In (Dosage Calculations)",
    description: "Calculate medication dosages, IV flow rates, or fluid requirements and enter a numerical answer. An on-screen calculator is provided.",
    icon: Calculator,
  },
  {
    title: "Graphic / Exhibit Items",
    description: "Interpret images, diagrams, ECG strips, or clinical exhibits to answer questions about assessment findings or interventions.",
    icon: BarChart3,
  },
  {
    title: "Bowtie Items",
    description: "Connect conditions to appropriate nursing actions and monitoring parameters. Tests integrated clinical reasoning across the care continuum.",
    icon: Target,
  },
];

const toolkitCards = [
  {
    title: "Question Bank",
    description: "Practice with hundreds of REx-PN-aligned questions organized by domain. Detailed rationales explain why each answer is correct or incorrect.",
    icon: BookOpen,
    href: "/free-practice",
    cta: "Start Practising",
  },
  {
    title: "Mock Exams (CAT)",
    description: "Simulate the real exam experience with computer adaptive testing. Questions adjust in difficulty based on your performance, just like exam day.",
    icon: Target,
    href: "/mock-exams",
    cta: "Take a Mock Exam",
  },
  {
    title: "Study Planner",
    description: "Follow a structured 10-week study plan designed for the REx-PN blueprint. Track your progress across all content domains.",
    icon: Layers,
    href: "/rex-pn/strategies",
    cta: "View Study Plan",
  },
  {
    title: "Readiness Assessment",
    description: "Take a quick 25-question diagnostic to identify your strengths and areas that need more focus before exam day.",
    icon: Activity,
    href: "/mock-exams",
    cta: "Check Readiness",
  },
  {
    title: "Flashcards",
    description: "Review key concepts, medications, lab values, and nursing interventions with spaced repetition flashcard decks.",
    icon: Brain,
    href: "/flashcards",
    cta: "Study Flashcards",
  },
];

const subPages = [
  { title: "Exam Format and Structure", href: "/rex-pn/exam-format", description: "Question types, CAT algorithm, timing, and testing environment" },
  { title: "Test-Taking Strategies", href: "/rex-pn/strategies", description: "Process of elimination, safety-first thinking, pacing tips" },
  { title: "Wellness During Preparation", href: "/rex-pn/wellness", description: "Sleep, nutrition, exercise, and mental health support" },
  { title: "Practice Tests", href: "/rex-pn/practice-tests", description: "Full-length CAT simulations and domain-specific question sets" },
];

export default function RexPnHub() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <SEO
        title="REx-PN Exam Prep | Canadian Practical Nurse Licensing Exam Preparation"
        description="Prepare for the REx-PN (Regulatory Exam - Practical Nurse) with CAT-adaptive mock exams, a comprehensive question bank, clinical lessons, and study tools. Built for Canadian RPN candidates."
        keywords="REx-PN exam prep, REx-PN practice questions, Canadian practical nurse exam, RPN licensing exam, REx-PN CAT exam, RPN question bank, REx-PN mock exam, REx-PN study guide, Canadian nursing exam"
        canonicalPath="/rex-pn"
      />
      <Navigation />

      <main className="flex-grow">
        <section className="relative overflow-hidden py-20 lg:py-28" data-testid="section-rex-pn-hero">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-red-500/10 blur-3xl" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbNav items={[{ name: "Home", url: "https://www.nursenest.ca/" }, { name: "REx-PN Exam Prep", url: "https://www.nursenest.ca/rex-pn" }]} />

            <div className="text-center max-w-3xl mx-auto space-y-6 mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-200 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-medium text-gray-600">Canadian Practical Nurse Licensing Exam</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]" data-testid="text-rex-pn-heading">
                REx-PN Exam Prep
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" data-testid="text-rex-pn-subtitle">
                Prepare for the Regulatory Exam - Practical Nurse with adaptive practice exams, a comprehensive question bank, and clinical study tools designed for Canadian RPN candidates.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-4 px-4 sm:px-0">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-[transform,box-shadow] hover:-translate-y-1 text-white"
                  onClick={() => setLocation("/free-practice")}
                  data-testid="button-rex-pn-start-diagnostic"
                >
                  Start Diagnostic
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-400 text-gray-700 bg-white/50"
                  onClick={() => setLocation("/mock-exams")}
                  data-testid="button-rex-pn-start-cat"
                >
                  <Target className="mr-2 w-5 h-5 text-red-500" />
                  Start CAT Practice
                </Button>
              </div>

              <p className="text-xs text-gray-500 pt-2">No credit card required. Start free today.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100" data-testid="section-exam-overview">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-4">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Exam Overview</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" data-testid="text-overview-heading">
                What Is the REx-PN?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The Regulatory Exam - Practical Nurse is the Canadian licensing examination for practical nurse candidates seeking registration as an RPN.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Questions", value: "90-150", detail: "Computer selects based on performance", icon: FileText },
                { label: "Time Limit", value: "4 Hours", detail: "Maximum testing time allowed", icon: Clock },
                { label: "Format", value: "Computer Adaptive", detail: "Difficulty adjusts to your level", icon: Activity },
                { label: "Result", value: "Pass / Fail", detail: "Criterion-referenced passing standard", icon: Shield },
              ].map((item, i) => (
                <Card key={i} className="border border-gray-100 text-center" data-testid={`card-overview-${i}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900" data-testid={`text-overview-value-${i}`}>{item.value}</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-2">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100" data-testid="section-cat-explanation">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How Computer Adaptive Testing (CAT) Works</h3>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  The REx-PN uses Computer Adaptive Testing, which tailors the difficulty of questions to your ability level in real time. After each question you answer, the computer recalculates your estimated ability and selects the next question accordingly.
                </p>
                <p>
                  If you answer correctly, the next question is generally harder. If you answer incorrectly, the next question is generally easier. The exam continues until the algorithm is 95% confident you are above or below the passing standard, or until you reach the maximum of 150 questions.
                </p>
                <p>
                  This means every candidate receives a unique set of questions. The number of questions you receive does not indicate whether you passed or failed -- it reflects how quickly the algorithm reached a confident decision about your ability level.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100" data-testid="section-blueprint-domains">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 mb-4">
                <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Content Blueprint</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" data-testid="text-domains-heading">
                REx-PN Blueprint Domains
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The exam is organized into five competency domains. Allocate your study time proportionally to each domain's weight.
              </p>
            </div>

            <div className="space-y-5 max-w-3xl mx-auto">
              {domains.map((domain, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm" data-testid={`domain-bar-${i}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900 text-sm" data-testid={`text-domain-name-${i}`}>{domain.name}</span>
                    <span className="font-bold text-gray-900 text-lg" data-testid={`text-domain-weight-${i}`}>{domain.weight}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`${domain.color} h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${domain.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100" data-testid="section-question-formats">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Question Formats</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" data-testid="text-formats-heading">
                Question Types on the REx-PN
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The exam uses multiple question formats to assess clinical reasoning, prioritization, and safe nursing practice.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {questionFormats.map((format, i) => (
                <Card key={i} className="border border-gray-100 hover:shadow-md transition-shadow" data-testid={`card-format-${i}`}>
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                      <format.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2" data-testid={`text-format-title-${i}`}>{format.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{format.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100" data-testid="section-toolkit">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Your Toolkit</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" data-testid="text-toolkit-heading">
                Everything You Need to Pass the REx-PN
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access a complete set of study tools designed to build the clinical reasoning skills tested on the REx-PN.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolkitCards.map((tool, i) => (
                <Card
                  key={i}
                  className="border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => setLocation(tool.href)}
                  data-testid={`card-toolkit-${i}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 shadow-sm">
                      <tool.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2" data-testid={`text-toolkit-title-${i}`}>{tool.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{tool.description}</p>
                    <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      <span>{tool.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100" data-testid="section-sub-pages">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-explore-heading">
                Explore REx-PN Resources
              </h2>
              <p className="text-gray-600">
                Deep-dive into exam format details, proven test-taking strategies, and wellness support.
              </p>
            </div>

            <div className="space-y-4">
              {subPages.map((page, i) => (
                <LocaleLink key={i} href={page.href}>
                  <div
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl p-5 border border-gray-100 transition-colors cursor-pointer group"
                    data-testid={`link-subpage-${i}`}
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{page.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{page.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-4" />
                  </div>
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-t border-gray-100" data-testid="section-disclaimer">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2" data-testid="text-disclaimer-heading">Educational Disclaimer</h3>
                <p className="text-sm text-gray-600 leading-relaxed" data-testid="text-disclaimer-body">
                  This is a training simulator designed to help you prepare for the REx-PN examination. It does not guarantee exam results. NurseNest is not affiliated with, endorsed by, or connected to NCSBN, any provincial or territorial nursing regulatory body, or Pearson VUE. All content is developed independently for educational purposes. Candidates should always consult their regulatory body for official exam information and requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}