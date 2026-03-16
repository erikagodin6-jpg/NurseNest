import { Link, useLocation } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CERT_PREP_CONTENT } from "@/data/certification-prep-content";
import {
  ArrowRight, BookOpen, ChevronRight, Check, GraduationCap,
  ClipboardList, Layers, Award, Target, Users, Calendar,
  Brain, BarChart3, Play, RefreshCw, Zap, Shield
} from "lucide-react";

const COLOR_MAP: Record<string, { bg: string; iconColor: string; border: string; gradientFrom: string; gradientTo: string; badgeBg: string; badgeText: string; btnBg: string; btnHover: string }> = {
  red: { bg: "bg-red-50", iconColor: "text-red-600", border: "border-red-100", gradientFrom: "from-red-50", gradientTo: "to-red-100/30", badgeBg: "bg-red-100", badgeText: "text-red-700", btnBg: "bg-red-600", btnHover: "hover:bg-red-700" },
  blue: { bg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100", gradientFrom: "from-blue-50", gradientTo: "to-blue-100/30", badgeBg: "bg-blue-100", badgeText: "text-blue-700", btnBg: "bg-blue-600", btnHover: "hover:bg-blue-700" },
  sky: { bg: "bg-sky-50", iconColor: "text-sky-600", border: "border-sky-100", gradientFrom: "from-sky-50", gradientTo: "to-sky-100/30", badgeBg: "bg-sky-100", badgeText: "text-sky-700", btnBg: "bg-sky-600", btnHover: "hover:bg-sky-700" },
  orange: { bg: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100", gradientFrom: "from-orange-50", gradientTo: "to-orange-100/30", badgeBg: "bg-orange-100", badgeText: "text-orange-700", btnBg: "bg-orange-600", btnHover: "hover:bg-orange-700" },
  pink: { bg: "bg-pink-50", iconColor: "text-pink-600", border: "border-pink-100", gradientFrom: "from-pink-50", gradientTo: "to-pink-100/30", badgeBg: "bg-pink-100", badgeText: "text-pink-700", btnBg: "bg-pink-600", btnHover: "hover:bg-pink-700" },
  violet: { bg: "bg-violet-50", iconColor: "text-violet-600", border: "border-violet-100", gradientFrom: "from-violet-50", gradientTo: "to-violet-100/30", badgeBg: "bg-violet-100", badgeText: "text-violet-700", btnBg: "bg-violet-600", btnHover: "hover:bg-violet-700" },
};

function extractCertSlug(pathname: string): string {
  const match = pathname.match(/\/certifications\/([a-z]+)-prep/);
  return match ? match[1] : "";
}

export default function CertificationPrepPage() {
  const [location] = useLocation();
  const certSlug = extractCertSlug(location);
  const content = CERT_PREP_CONTENT[certSlug];

  if (!content) {
    return (
      <div data-testid="page-cert-prep-not-found">
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-not-found">Certification Prep Not Found</h1>
            <p className="text-gray-600 mb-6">The certification prep page you are looking for is not available.</p>
            <Link href="/newgrad/certifications" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors" data-testid="link-back-to-certs">
              Back to Certifications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const colors = COLOR_MAP[content.color] || COLOR_MAP.blue;

  return (
    <div data-testid={`page-cert-prep-${certSlug}`}>
      <Navigation />
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        keywords={content.seo.keywords}
        canonicalPath={`/certifications/${certSlug}-prep`}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "Certifications", url: "https://www.nursenest.ca/newgrad/certifications" },
          { name: `${content.certName} Prep`, url: `https://www.nursenest.ca/certifications/${certSlug}-prep` },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} via-white/50 ${colors.gradientTo}`} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad/certifications" className="hover:text-blue-600">Certifications</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={`${colors.badgeText} font-medium`}>{content.certName} Prep</span>
          </div>
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${colors.badgeBg} ${colors.badgeText} mb-4`} data-testid="badge-cert-prep">
              <GraduationCap className="w-4 h-4" /> Certification Prep
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              {content.heroTitle}
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-page-subtitle">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/free-practice" className={`inline-flex items-center gap-2 px-6 py-3 ${colors.btnBg} text-white rounded-xl font-semibold ${colors.btnHover} transition-colors shadow-lg`} data-testid="button-start-practice">
                Start Practice Questions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/certifications/${certSlug}-renewal-prep`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200" data-testid="button-renewal-prep">
                <RefreshCw className="w-4 h-4" /> Renewal Prep
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-audience">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br ${colors.gradientFrom} to-white rounded-2xl border ${colors.border} p-8`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Users className={`w-5 h-5 ${colors.iconColor}`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900" data-testid="text-audience-heading">{content.audience.title}</h2>
            </div>
            <p className="text-gray-600 text-lg mb-4" data-testid="text-audience-desc">{content.audience.description}</p>
            <div className="flex flex-wrap gap-2">
              {content.audience.roles.map((role, i) => (
                <span key={i} className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.iconColor}`} data-testid={`badge-role-${i}`}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-overview">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-overview-heading">{content.overview.title}</h2>
          <div className="space-y-4">
            {content.overview.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed" data-testid={`text-overview-p-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-core-concepts">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-concepts-heading">{content.coreConcepts.title}</h2>
            <p className="text-gray-600">Key domains tested on the {content.certName} exam.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.coreConcepts.items.map((item, i) => (
              <div key={i} className={`bg-white rounded-xl border ${colors.border} p-5`} data-testid={`card-concept-${i}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Check className={`w-4 h-4 ${colors.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-study-roadmap">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-roadmap-heading">Study Roadmap</h2>
            <p className="text-gray-600">A structured plan to prepare for your {content.certName} certification.</p>
          </div>
          <div className="space-y-4">
            {content.studyRoadmap.phases.map((phase, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`card-phase-${i}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <Calendar className={`w-5 h-5 ${colors.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-400 uppercase">{phase.week}</span>
                    <h3 className="font-semibold text-gray-900">{phase.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2 ml-13">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className={`w-4 h-4 ${colors.iconColor} mt-0.5 flex-shrink-0`} />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-lessons">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-lessons-heading">Recommended NurseNest Lessons</h2>
            <p className="text-gray-600">Targeted lessons to build your {content.certName} knowledge.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.recommendedLessons.map((lesson, i) => (
              <Link key={i} href={`/lessons/${lesson.slug}`} className="group" data-testid={`card-lesson-${i}`}>
                <div className={`bg-white rounded-xl border ${colors.border} p-5 hover:shadow-md transition-all h-full`}>
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                    <BookOpen className={`w-5 h-5 ${colors.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">{lesson.title}</h3>
                  <p className="text-xs text-gray-500">{lesson.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-flashcards">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-flashcards-heading">{content.certName} Flashcard Decks</h2>
            <p className="text-gray-600">Spaced-repetition flashcards to reinforce key concepts.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.flashcardDecks.map((deck, i) => (
              <Link key={i} href="/flashcards" className="group" data-testid={`card-deck-${i}`}>
                <div className={`bg-white rounded-xl border ${colors.border} p-5 hover:shadow-md transition-all h-full`}>
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                    <Layers className={`w-5 h-5 ${colors.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">{deck.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{deck.description}</p>
                  <span className="text-xs font-medium text-gray-400">{deck.cardCount} cards</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-practice-questions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-practice-heading">Practice Questions</h2>
            <p className="text-gray-600">Test your knowledge with {content.certName}-aligned questions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link href="/free-practice" className="group" data-testid="card-qbank">
              <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`}>
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                  <ClipboardList className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Question Bank</h3>
                <p className="text-sm text-gray-500 mb-3">Practice with MCQs, select-all-that-apply, and clinical scenario questions tagged to {content.certName} domains.</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Start Practicing <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            <div className={`bg-white rounded-xl border ${colors.border} p-6`} data-testid="card-exam-sim">
              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                <Play className={`w-6 h-6 ${colors.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{content.practiceExam.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{content.practiceExam.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{content.practiceExam.questionCount} questions</span>
                <span>{content.practiceExam.timeMinutes} minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-analytics-preview">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-analytics-heading">Performance Analytics</h2>
            <p className="text-gray-600">Track your progress and identify weak areas as you prepare.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`bg-white rounded-xl border ${colors.border} p-5 text-center`} data-testid="card-analytics-accuracy">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3`}>
                <Target className={`w-5 h-5 ${colors.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Accuracy Tracking</h3>
              <p className="text-xs text-gray-500">Monitor your score trends across {content.certName} domains.</p>
            </div>
            <div className={`bg-white rounded-xl border ${colors.border} p-5 text-center`} data-testid="card-analytics-weak">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3`}>
                <Brain className={`w-5 h-5 ${colors.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Weak Area Detection</h3>
              <p className="text-xs text-gray-500">Identify topics that need more review before your exam.</p>
            </div>
            <div className={`bg-white rounded-xl border ${colors.border} p-5 text-center`} data-testid="card-analytics-readiness">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3`}>
                <BarChart3 className={`w-5 h-5 ${colors.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Exam Readiness Score</h3>
              <p className="text-xs text-gray-500">Get an estimated readiness score based on your performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700" data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Ready to Pass {content.certName}?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get full access to {content.certName} practice questions, flashcards, and study tools with a NurseNest subscription.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg" data-testid="button-cta-pricing">
              View Plans <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={`/certifications/${certSlug}-renewal-prep`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-cta-renewal">
              <RefreshCw className="w-4 h-4" /> Renewal Prep
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white" data-testid="section-cross-links">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center" data-testid="text-cross-heading">Related Certification Prep</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {["bls", "acls", "pals", "nrp", "tncc", "enpc"].filter(s => s !== certSlug).map(slug => {
              const rel = CERT_PREP_CONTENT[slug];
              if (!rel) return null;
              return (
                <Link key={slug} href={`/certifications/${slug}-prep`} className="group" data-testid={`link-related-${slug}`}>
                  <div className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors text-center h-full">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm">{rel.certName}</h3>
                    <p className="text-xs text-gray-500 mt-1">Prep Guide</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
