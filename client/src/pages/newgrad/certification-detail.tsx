import { useParams, Link } from "wouter";
import { useState } from "react";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildFaqStructuredData } from "@/lib/structured-data";
import { NEWGRAD_CERTIFICATIONS } from "./certifications-hub";
import {
  ArrowRight, BookOpen, ChevronRight, Check, GraduationCap,
  ClipboardList, Layers, Award, HelpCircle, Clock, Target, Users
} from "lucide-react";

const COLOR_MAP: Record<string, { bg: string; iconColor: string; border: string; gradientFrom: string; gradientTo: string }> = {
  red: { bg: "bg-red-50", iconColor: "text-red-600", border: "border-red-100", gradientFrom: "from-red-50", gradientTo: "to-red-100/30" },
  blue: { bg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100", gradientFrom: "from-blue-50", gradientTo: "to-blue-100/30" },
  sky: { bg: "bg-sky-50", iconColor: "text-sky-600", border: "border-sky-100", gradientFrom: "from-sky-50", gradientTo: "to-sky-100/30" },
  orange: { bg: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100", gradientFrom: "from-orange-50", gradientTo: "to-orange-100/30" },
  pink: { bg: "bg-pink-50", iconColor: "text-pink-600", border: "border-pink-100", gradientFrom: "from-pink-50", gradientTo: "to-pink-100/30" },
  emerald: { bg: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-emerald-100", gradientFrom: "from-emerald-50", gradientTo: "to-emerald-100/30" },
  rose: { bg: "bg-rose-50", iconColor: "text-rose-600", border: "border-rose-100", gradientFrom: "from-rose-50", gradientTo: "to-rose-100/30" },
};

function CertificationNotFound() {
  return (
    <div data-testid="page-certification-not-found">
      <Navigation />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-not-found">Certification Not Found</h1>
          <p className="text-gray-600 mb-6">The certification page you are looking for is not available.</p>
          <Link href="/newgrad/certifications" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors" data-testid="link-back-to-certs">
            Back to Certifications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CertDetailContent({ cert }: { cert: typeof NEWGRAD_CERTIFICATIONS[0] }) {
  const colors = COLOR_MAP[cert.color] || COLOR_MAP.blue;
  const Icon = cert.icon;
  const faqStructuredData = buildFaqStructuredData(cert.faq);

  const otherCerts = NEWGRAD_CERTIFICATIONS.filter(c => c.slug !== cert.slug).slice(0, 3);

  const educationCourseData = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "name": `${cert.name} - ${cert.fullName}`,
    "description": cert.description,
    "credentialCategory": "Hospital Certification",
    "recognizedBy": { "@type": "Organization", "name": cert.org },
    "url": `https://www.nursenest.ca/newgrad/certifications/${cert.slug}`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
  };

  return (
    <div data-testid={`page-newgrad-cert-${cert.slug}`}>
      <Navigation />
      <SEO
        title={`${cert.name} Certification Prep for New Grads | ${cert.fullName} | NurseNest`}
        description={`${cert.name} (${cert.fullName}) certification preparation for new graduate nurses. ${cert.description}`}
        keywords={`${cert.name} certification, ${cert.fullName}, ${cert.name} prep, ${cert.name} practice questions, new grad ${cert.name}, ${cert.name} study guide, ${cert.org}`}
        canonicalPath={`/newgrad/certifications/${cert.slug}`}
        structuredData={educationCourseData}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Hub", url: "https://www.nursenest.ca/new-grad" },
          { name: "Certifications", url: "https://www.nursenest.ca/newgrad/certifications" },
          { name: `${cert.name} Certification`, url: `https://www.nursenest.ca/newgrad/certifications/${cert.slug}` },
        ]}
        additionalStructuredData={[faqStructuredData]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} via-white/50 ${colors.gradientTo}`} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="nav-breadcrumb">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/new-grad" className="hover:text-blue-600">New Grad Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad/certifications" className="hover:text-blue-600">Certifications</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">{cert.name}</span>
          </div>
          <div className="max-w-3xl">
            <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
              <Icon className={`w-7 h-7 ${colors.iconColor}`} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-4" data-testid="badge-cert-type">
              <GraduationCap className="w-4 h-4" />
              New Graduate Certification Guide
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              {cert.name}: {cert.fullName}
            </h1>
            <p className="text-lg text-gray-600 mb-4" data-testid="text-page-subtitle">
              {cert.description}
            </p>
            <div className="flex items-center gap-3 mb-8 text-sm text-gray-500">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.iconColor}`}>
                <Award className="w-3 h-3 mr-1" /> {cert.org}
              </span>
              <span>{cert.questionCount} practice questions</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/free-practice" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200" data-testid="button-practice-questions">
                Practice {cert.name} Questions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/newgrad/certifications" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200" data-testid="button-all-certifications">
                All Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-clinical-context">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br ${colors.gradientFrom} to-white rounded-2xl border ${colors.border} p-8`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Target className={`w-5 h-5 ${colors.iconColor}`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900" data-testid="text-context-heading">When You Need {cert.name}</h2>
            </div>
            <p className="text-gray-600 text-lg" data-testid="text-clinical-context">{cert.clinicalContext}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-topics">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-topics-heading">What {cert.name} Covers</h2>
            <p className="text-gray-600">Core topics tested on the {cert.name} certification exam.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cert.topics.map((topic, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4" data-testid={`card-topic-${i}`}>
                <Check className={`w-5 h-5 ${colors.iconColor} mt-0.5 flex-shrink-0`} />
                <span className="text-sm text-gray-700 font-medium">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-resources">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-resources-heading">Study Resources for {cert.name}</h2>
            <p className="text-gray-600">Everything included to prepare for your {cert.name} certification.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link href="/free-practice" className="group" data-testid="card-resource-qbank">
              <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`}>
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                  <ClipboardList className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Practice Questions</h3>
                <p className="text-sm text-gray-500 mb-3">{cert.questionCount} {cert.name}-aligned questions with detailed rationales.</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Practice Now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            <Link href="/lessons" className="group" data-testid="card-resource-lessons">
              <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`}>
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                  <BookOpen className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Lesson Library</h3>
                <p className="text-sm text-gray-500 mb-3">In-depth clinical lessons covering {cert.name} exam content.</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Browse Lessons <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            <Link href="/flashcards" className="group" data-testid="card-resource-flashcards">
              <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`}>
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                  <Layers className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">Flashcard Decks</h3>
                <p className="text-sm text-gray-500 mb-3">Spaced-repetition flashcards for {cert.name} algorithms and key concepts.</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Study Flashcards <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-faq-heading">{cert.name} FAQs</h2>
            <p className="text-gray-600">Common questions about {cert.name} certification for new graduates</p>
          </div>
          <div className="space-y-3">
            {cert.faq.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {otherCerts.length > 0 && (
        <section className="py-16 bg-white" data-testid="section-related">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-related-heading">Other Certifications</h2>
              <p className="text-gray-600">Explore other certifications new graduate nurses commonly pursue.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherCerts.map((rel) => {
                const relColors = COLOR_MAP[rel.color] || COLOR_MAP.blue;
                const RelIcon = rel.icon;
                return (
                  <Link key={rel.slug} href={`/newgrad/certifications/${rel.slug}`} className="group" data-testid={`card-related-${rel.slug}`}>
                    <div className={`bg-white rounded-xl border ${relColors.border} p-5 hover:shadow-md transition-all h-full`}>
                      <div className={`w-10 h-10 rounded-xl ${relColors.bg} flex items-center justify-center mb-3`}>
                        <RelIcon className={`w-5 h-5 ${relColors.iconColor}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors text-sm">{rel.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{rel.fullName}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700" data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Ready to Prepare for {cert.name}?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Practice questions, flashcards, and study tools aligned to the {cert.name} exam.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/free-practice" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg" data-testid="button-cta-practice">
              Practice {cert.name} Questions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/newgrad/certifications" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-cta-all-certs">
              All Certifications
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden" data-testid={`faq-item-${index}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors" data-testid={`button-faq-toggle-${index}`}>
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? 'text-blue-500' : 'text-gray-400'}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>{answer}</div>}
    </div>
  );
}

export default function NewGradCertificationDetail() {
  const params = useParams<{ slug: string }>();
  const certSlug = params.slug || "";

  const cert = NEWGRAD_CERTIFICATIONS.find(c => c.slug === certSlug);

  if (!cert) {
    return <CertificationNotFound />;
  }

  return <CertDetailContent cert={cert} />;
}
