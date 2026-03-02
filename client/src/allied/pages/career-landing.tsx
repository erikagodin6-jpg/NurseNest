import { Link, useParams } from "wouter";
import { CAREER_CONFIGS, type CareerConfig } from "@shared/careers";
import {
  ArrowRight, BookOpen, FileText, Brain, Zap, GraduationCap, Wrench,
  BarChart3, Target, Clock, CheckCircle2, ChevronRight
} from "lucide-react";

const ALLIED_CAREER_MAP: Record<string, CareerConfig> = {
  rrt: CAREER_CONFIGS.rrt,
  paramedic: CAREER_CONFIGS.paramedic,
  "pharmacy-tech": CAREER_CONFIGS.pharmacyTech,
  mlt: CAREER_CONFIGS.mlt,
  imaging: CAREER_CONFIGS.imaging,
};

const FEATURES = [
  { slug: "qbank", label: "Question Bank", desc: "Exam-authentic questions with rationales", icon: BookOpen },
  { slug: "mock-exams", label: "Mock Exams", desc: "Blueprint-weighted timed practice exams", icon: FileText },
  { slug: "flashcards", label: "Flashcards", desc: "Spaced repetition for key concepts", icon: Brain },
  { slug: "study-plan", label: "Study Planner", desc: "AI-generated daily study schedule", icon: GraduationCap },
  { slug: "sims", label: "Case Simulators", desc: "Unfolding clinical scenarios", icon: Zap },
  { slug: "tools", label: "AI Tools", desc: "Career-specific interactive tools", icon: Wrench },
];

export default function CareerLandingPage() {
  const params = useParams<{ careerSlug: string }>();
  const career = ALLIED_CAREER_MAP[params.careerSlug || ""];

  if (!career) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Not Found</h1>
        <p className="text-gray-600 mb-6">The career you're looking for doesn't exist.</p>
        <Link href="/careers" className="text-teal-600 font-medium hover:underline">Browse All Careers</Link>
      </div>
    );
  }

  return (
    <div data-testid={`career-landing-${career.slug}`}>
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50/30 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/careers" className="hover:text-teal-600">Careers</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-teal-700 font-medium">{career.shortName}</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: career.colorAccent, color: career.color }}>
              {career.examNames[0]} Prep
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-career-title">
              {career.name} Exam Prep
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-career-description">{career.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${career.slug}/qbank`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200" data-testid="button-start-qbank">
                Start Practice Questions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${career.slug}/mock-exams`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-xl font-semibold hover:bg-teal-50 transition-colors border border-teal-200" data-testid="button-start-mock">
                Take a Mock Exam
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-questions">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
            <div data-testid="stat-domains">
              <div className="text-2xl font-bold text-gray-900">{career.domains.length}</div>
              <div className="text-sm text-gray-500">Exam Domains</div>
            </div>
            <div data-testid="stat-exams">
              <div className="text-2xl font-bold text-gray-900">{career.examNames.length}</div>
              <div className="text-sm text-gray-500">Exam Types</div>
            </div>
            <div data-testid="stat-tools">
              <div className="text-2xl font-bold text-gray-900">{career.aiTools.length}</div>
              <div className="text-sm text-gray-500">AI Tools</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Study Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <Link key={f.slug} href={`/${career.slug}/${f.slug}`} className="group" data-testid={`card-feature-${f.slug}`}>
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-teal-200 transition-all h-full">
                  <f.icon className="w-7 h-7 text-teal-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{f.label}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-teal-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Exam Blueprint Domains</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {career.domains.map((domain, i) => (
              <div key={domain} className="bg-white rounded-lg border border-gray-100 px-4 py-3 flex items-center gap-3" data-testid={`domain-${i}`}>
                <Target className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{domain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {career.aiTools.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">AI-Powered Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {career.aiTools.map(tool => (
                <Link key={tool.id} href={`/${career.slug}/tools`} className="group" data-testid={`card-tool-${tool.id}`}>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 p-5 hover:shadow-md transition-all">
                    <Wrench className="w-6 h-6 text-teal-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
