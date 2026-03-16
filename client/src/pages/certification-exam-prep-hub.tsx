import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  CERTIFICATION_EXAM_CONFIGS,
  getCertTotalQuestions,
  getCertTotalMockExams,
  getCertCount,
  PRACTICE_MODES,
} from "@/data/certification-exam-data";
import {
  ArrowRight, Award, ShieldCheck, BookOpen, ChevronRight,
  Target, TrendingUp, Clock, GraduationCap, Lock, Crown,
  Activity, Heart, Baby, Zap, Stethoscope, Ribbon, Scissors,
  ClipboardList, GitBranch, Shuffle, Timer, BarChart3
} from "lucide-react";

const CERT_ICON_MAP: Record<string, typeof Activity> = {
  bls: Activity, acls: Heart, pals: Baby, nrp: Baby,
  tncc: Zap, enpc: Baby, ccrn: Activity, cen: Stethoscope,
  ocn: Ribbon, cnor: Scissors, cpn: Baby,
};

const COLOR_MAP: Record<string, { bg: string; iconColor: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100", badge: "bg-blue-100 text-blue-700" },
  red: { bg: "bg-red-50", iconColor: "text-red-600", border: "border-red-100", badge: "bg-red-100 text-red-700" },
  sky: { bg: "bg-sky-50", iconColor: "text-sky-600", border: "border-sky-100", badge: "bg-sky-100 text-sky-700" },
  pink: { bg: "bg-pink-50", iconColor: "text-pink-600", border: "border-pink-100", badge: "bg-pink-100 text-pink-700" },
  orange: { bg: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100", badge: "bg-orange-100 text-orange-700" },
  violet: { bg: "bg-violet-50", iconColor: "text-violet-600", border: "border-violet-100", badge: "bg-violet-100 text-violet-700" },
  rose: { bg: "bg-rose-50", iconColor: "text-rose-600", border: "border-rose-100", badge: "bg-rose-100 text-rose-700" },
  purple: { bg: "bg-purple-50", iconColor: "text-purple-600", border: "border-purple-100", badge: "bg-purple-100 text-purple-700" },
  indigo: { bg: "bg-indigo-50", iconColor: "text-indigo-600", border: "border-indigo-100", badge: "bg-indigo-100 text-indigo-700" },
};

const PRACTICE_MODE_ICONS: Record<string, typeof BookOpen> = {
  "topic-practice": BookOpen,
  "algorithm-scenarios": GitBranch,
  "mixed-practice": Shuffle,
  "full-mock-exam": Timer,
};

const HUB_FAQ = [
  { question: "How many certification practice questions are available?", answer: `NurseNest offers ${getCertTotalQuestions().toLocaleString()}+ practice questions across ${getCertCount()} nursing certifications. Each certification has 1,500+ questions covering multiple question types: MCQ, SATA, scenario-based, clinical prioritization, and algorithm decision.` },
  { question: "What certifications are covered?", answer: "We cover 11 nursing certifications: BLS, ACLS, PALS, NRP, TNCC, ENPC (life support and emergency), plus CCRN, CEN, OCN, CNOR, and CPN (specialty certifications). Each has dedicated question banks, mock exams, and topic-specific practice." },
  { question: "Are there free sample questions?", answer: "Yes. Each certification offers free sample questions so you can evaluate the quality and difficulty before upgrading. Full question banks and mock exams are available with a premium subscription." },
  { question: "How do the mock exams work?", answer: "Each certification has 3 full-length mock exams (100-150 questions each) with timed mode, randomized question selection, and detailed performance breakdown by topic. Results show your strengths and weaknesses to guide further study." },
  { question: "What practice modes are available?", answer: "Four practice modes: Topic Practice (focus on specific areas), Algorithm Scenarios (algorithm-based decisions), Mixed Practice (randomized questions), and Full Mock Exams (timed certification simulations)." },
  { question: "Can I track my progress across certifications?", answer: "Yes. Your performance is tracked across all practice sessions and mock exams. You can view accuracy by topic, identify weak areas, and monitor your readiness score for each certification." },
];

const AUTHORITY_STATS = [
  { icon: ClipboardList, label: "Practice Questions", value: getCertTotalQuestions().toLocaleString() + "+" },
  { icon: Award, label: "Mock Exams", value: getCertTotalMockExams().toString() },
  { icon: ShieldCheck, label: "Certifications", value: getCertCount().toString() },
  { icon: BarChart3, label: "Practice Modes", value: "4" },
];

export default function CertificationExamPrepHub() {
  const faqStructuredData = buildFaqStructuredData(HUB_FAQ);
  const totalQuestions = getCertTotalQuestions();
  const totalMockExams = getCertTotalMockExams();
  const certCount = getCertCount();
  const certs = Object.values(CERTIFICATION_EXAM_CONFIGS);

  return (
    <div data-testid="page-certification-exam-prep-hub">
      <Navigation />
      <SEO
        title={`Certification Exam Prep: ${totalQuestions.toLocaleString()}+ Practice Questions for ${certCount} Nursing Certifications | NurseNest`}
        description={`Prepare for nursing certifications with ${totalQuestions.toLocaleString()}+ practice questions, ${totalMockExams} mock exams, and 4 practice modes. BLS, ACLS, PALS, NRP, TNCC, ENPC, CCRN, CEN, OCN, CNOR, CPN exam prep.`}
        keywords="certification exam prep, nursing certification practice questions, BLS practice test, ACLS exam prep, PALS practice questions, CCRN mock exam, CEN certification prep, nursing exam bank"
        canonicalPath="/certification-exam-prep"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Nursing Certification Exam Prep Hub",
          "description": `Comprehensive exam preparation for ${certCount} nursing certifications with ${totalQuestions.toLocaleString()}+ practice questions and ${totalMockExams} mock exams.`,
          "provider": { "@type": "Organization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
        }}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "Certification Exam Prep", url: "https://www.nursenest.ca/certification-exam-prep" },
        ]}
        additionalStructuredData={[faqStructuredData]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-700 font-medium">Certification Exam Prep</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-4" data-testid="badge-hub">
              <Award className="w-4 h-4" /> Exam Prep Hub
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              Nursing Certification Exam Prep
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-page-subtitle">
              {totalQuestions.toLocaleString()}+ practice questions, {totalMockExams} mock exams, and 4 practice modes across {certCount} nursing certifications. Master BLS, ACLS, PALS, NRP, TNCC, ENPC, CCRN, CEN, OCN, CNOR, and CPN with exam-aligned question banks.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#certifications" onClick={(e) => { e.preventDefault(); document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200" data-testid="button-explore-certs">
                Explore Certifications <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors border border-emerald-200" data-testid="button-view-plans">
                <Crown className="w-4 h-4" /> View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white" data-testid="section-stats">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AUTHORITY_STATS.map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-xl border border-emerald-100 p-5 text-center" data-testid={`stat-card-${i}`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900" data-testid={`stat-value-${i}`}>{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="certifications" data-testid="section-certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-certs-heading">{certCount} Certification Exam Banks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Each certification features dedicated question banks, topic-specific practice, and full-length mock exams aligned to the official exam blueprint.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((cert) => {
              const colors = COLOR_MAP[cert.color] || COLOR_MAP.blue;
              const Icon = CERT_ICON_MAP[cert.slug] || Award;
              return (
                <Link key={cert.slug} href={`/certification-exam-prep/${cert.slug}`} className="group" data-testid={`card-cert-${cert.slug}`}>
                  <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors" data-testid={`text-cert-name-${cert.slug}`}>{cert.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cert.org}</span>
                        </div>
                        <p className="text-sm text-gray-500">{cert.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><ClipboardList className="w-3.5 h-3.5" /> {cert.totalQuestions.toLocaleString()}+ questions</span>
                      <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {cert.mockExams.length} mock exams</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.topicBanks.slice(0, 3).map((bank) => (
                        <span key={bank.slug} className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.iconColor}`}>{bank.name}</span>
                      ))}
                      {cert.topicBanks.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">+{cert.topicBanks.length - 3} more</span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                      Start Practicing <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-practice-modes">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-modes-heading">4 Practice Modes</h2>
            <p className="text-gray-600">Choose the study approach that matches your preparation strategy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRACTICE_MODES.map((mode) => {
              const Icon = PRACTICE_MODE_ICONS[mode.id] || BookOpen;
              return (
                <div key={mode.id} className="bg-white rounded-xl border border-emerald-100 p-5 text-center hover:shadow-md transition-all" data-testid={`card-mode-${mode.id}`}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{mode.name}</h3>
                  <p className="text-xs text-gray-500">{mode.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-premium-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 sm:p-10 text-center">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" data-testid="text-premium-heading">Unlock All Certification Exam Banks</h2>
            <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
              Get full access to {totalQuestions.toLocaleString()}+ practice questions, {totalMockExams} mock exams, performance analytics, and all 4 practice modes with a NurseNest premium subscription.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <div className="flex items-center gap-2 text-sm text-emerald-100">
                <ShieldCheck className="w-4 h-4" /> Free sample questions
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-100">
                <Target className="w-4 h-4" /> Performance tracking
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-100">
                <TrendingUp className="w-4 h-4" /> Weak area detection
              </div>
            </div>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg" data-testid="button-upgrade-cta">
              View Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-cross-links">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" data-testid="text-cross-heading">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/nursing-certifications" className="bg-emerald-50 rounded-xl p-6 hover:bg-emerald-100 transition-colors group" data-testid="link-cert-guides">
              <h3 className="font-semibold text-emerald-900 mb-1 group-hover:text-emerald-700">Certification Guides</h3>
              <p className="text-sm text-emerald-700">Comprehensive prep guides and renewal resources for each certification.</p>
            </Link>
            <Link href="/free-practice" className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors group" data-testid="link-practice">
              <h3 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">NCLEX Practice Questions</h3>
              <p className="text-sm text-blue-700">Thousands of NCLEX-aligned practice questions with rationales.</p>
            </Link>
            <Link href="/newgrad/certifications" className="bg-indigo-50 rounded-xl p-6 hover:bg-indigo-100 transition-colors group" data-testid="link-newgrad">
              <h3 className="font-semibold text-indigo-900 mb-1 group-hover:text-indigo-700">New Grad Certification Timeline</h3>
              <p className="text-sm text-indigo-700">Which certifications to get first in your nursing career.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-faq-heading">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {HUB_FAQ.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 p-5 group" data-testid={`faq-item-${i}`}>
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
