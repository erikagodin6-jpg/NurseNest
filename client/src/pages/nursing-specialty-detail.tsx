import { useState } from "react";
import { useParams, Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildFaqStructuredData } from "@/lib/structured-data";
import { getSpecialtyBySlug, NURSING_SPECIALTIES } from "@/data/nursing-specialties-detail-data";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle,
  XCircle,
  HelpCircle,
  BookOpen,
  FileText,
  Layers,
  Award,
  Stethoscope,
  ClipboardList,
  Check,
} from "lucide-react";

function PracticeQuestion({ q, index }: { q: { question: string; options: string[]; correct: number; rationale: string }; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    setShowRationale(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6" data-testid={`practice-question-${index}`}>
      <p className="font-semibold text-gray-900 mb-4">{index + 1}. {q.question}</p>
      <div className="space-y-2 mb-4">
        {q.options.map((option, i) => {
          let optionStyle = "border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer";
          if (selected !== null) {
            if (i === q.correct) {
              optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
            } else if (i === selected && i !== q.correct) {
              optionStyle = "border-red-400 bg-red-50 text-red-900";
            } else {
              optionStyle = "border-gray-200 opacity-60";
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${optionStyle}`}
              disabled={selected !== null}
              data-testid={`question-${index}-option-${i}`}
            >
              <span className="w-7 h-7 rounded-full border flex items-center justify-center text-sm font-medium shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm">{option}</span>
              {selected !== null && i === q.correct && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
              {selected !== null && i === selected && i !== q.correct && <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>
      {showRationale && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-3" data-testid={`question-${index}-rationale`}>
          <p className="text-sm font-semibold text-blue-900 mb-1">Rationale</p>
          <p className="text-sm text-gray-700 leading-relaxed">{q.rationale}</p>
        </div>
      )}
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden" data-testid={`faq-item-${index}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        data-testid={`button-faq-toggle-${index}`}
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? 'text-blue-500' : 'text-gray-400'}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>
          {answer}
        </div>
      )}
    </div>
  );
}

function SpecialtyNotFound() {
  return (
    <div data-testid="page-specialty-not-found">
      <Navigation />
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-not-found">Specialty Not Found</h1>
          <p className="text-gray-600 mb-6">The nursing specialty you are looking for is not available. Browse our specialties below.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {NURSING_SPECIALTIES.map(spec => (
              <Link key={spec.slug} href={`/nursing-specialties/${spec.slug}`} className="text-blue-600 hover:underline text-sm" data-testid={`link-specialty-${spec.slug}`}>
                {spec.name}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/nursing-specialties" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline" data-testid="link-back-hub">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to All Specialties
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function NursingSpecialtyDetail() {
  const params = useParams<{ slug: string }>();
  const specialty = getSpecialtyBySlug(params.slug || "");

  if (!specialty) {
    return <SpecialtyNotFound />;
  }

  const SpecIcon = specialty.icon;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": specialty.name,
    "description": specialty.roleDescription,
    "provider": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "educationalLevel": "Advanced",
    "courseMode": "online",
    "isAccessibleForFree": false,
    "about": specialty.commonConditions.map(c => ({ "@type": "Thing", "name": c })),
  };

  const faqStructuredData = buildFaqStructuredData(specialty.faq);

  return (
    <div data-testid={`page-specialty-${specialty.slug}`}>
      <Navigation />
      <SEO
        title={specialty.title}
        description={specialty.metaDescription}
        keywords={specialty.keywords}
        canonicalPath={`/nursing-specialties/${specialty.slug}`}
        structuredData={courseSchema}
        additionalStructuredData={[faqStructuredData]}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "Nursing Specialties", url: "https://www.nursenest.ca/nursing-specialties" },
          { name: specialty.name, url: `https://www.nursenest.ca/nursing-specialties/${specialty.slug}` },
        ]}
      />

      <section className={`relative py-16 sm:py-20 overflow-hidden`} data-testid="section-hero">
        <div className={`absolute inset-0 bg-gradient-to-br ${specialty.gradientFrom} via-white/50 to-white`} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/nursing-specialties" className="hover:text-blue-600">Nursing Specialties</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">{specialty.name}</span>
          </nav>
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl ${specialty.bgColor} flex items-center justify-center flex-shrink-0`}>
              <SpecIcon className={`w-7 h-7 ${specialty.iconColor}`} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3" data-testid="text-specialty-title">
                {specialty.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed" data-testid="text-specialty-subtitle">
                {specialty.metaDescription.split('.')[0]}.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {specialty.certifications.map(cert => (
              <span key={cert.name} className={`px-3 py-1 rounded-full text-xs font-semibold ${specialty.bgColor} ${specialty.iconColor}`}>
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        <section data-testid="section-role-overview">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl ${specialty.bgColor} flex items-center justify-center`}>
              <Stethoscope className={`w-5 h-5 ${specialty.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">What {specialty.name.replace(" Nursing", " Nurses").replace(" Care Nursing", " Care Nurses")} Do</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed" data-testid="text-role-description">{specialty.roleDescription}</p>
          </div>
        </section>

        <section data-testid="section-skills">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Skills Required</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {specialty.skills.map((skill, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700" data-testid={`text-skill-${i}`}>
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section data-testid="section-certifications">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
          </div>
          <div className="space-y-3">
            {specialty.certifications.map((cert, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5" data-testid={`card-certification-${i}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${specialty.bgColor} ${specialty.iconColor}`}>{cert.name}</span>
                  <h3 className="font-semibold text-gray-900">{cert.fullName}</h3>
                </div>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-testid="section-conditions">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl ${specialty.bgColor} flex items-center justify-center`}>
              <SpecIcon className={`w-5 h-5 ${specialty.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Common Conditions Treated</h2>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="grid sm:grid-cols-2 gap-2">
              {specialty.commonConditions.map((condition, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700" data-testid={`text-condition-${i}`}>
                  <ChevronRight className={`w-4 h-4 ${specialty.iconColor} shrink-0 mt-0.5`} />
                  {condition}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-testid="section-practice-questions">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Practice Questions</h2>
          </div>
          <p className="text-gray-600 mb-4">Test your {specialty.name.toLowerCase()} knowledge. Select an answer to reveal the rationale.</p>
          <div className="space-y-4">
            {specialty.practiceQuestions.map((q, i) => (
              <PracticeQuestion key={i} q={q} index={i} />
            ))}
          </div>
        </section>

        <section data-testid="section-related-resources">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Related Resources</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Lessons</h3>
              </div>
              <ul className="space-y-2">
                {specialty.relatedLessons.map((lesson, i) => (
                  <li key={i}>
                    <Link href={lesson.href} className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1" data-testid={`link-lesson-${i}`}>
                      <ArrowRight className="w-3 h-3" /> {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-emerald-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Practice Questions</h3>
              </div>
              <ul className="space-y-2">
                {specialty.relatedQuestions.map((q, i) => (
                  <li key={i}>
                    <Link href={q.href} className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1" data-testid={`link-question-${i}`}>
                      <ArrowRight className="w-3 h-3" /> {q.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Flashcards</h3>
              </div>
              <ul className="space-y-2">
                {specialty.relatedFlashcards.map((fc, i) => (
                  <li key={i}>
                    <Link href={fc.href} className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1" data-testid={`link-flashcard-${i}`}>
                      <ArrowRight className="w-3 h-3" /> {fc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section data-testid="section-faq">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {specialty.faq.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </section>

        <section className="py-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-center px-6" data-testid="section-cta">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Ready to Master {specialty.name}?
          </h2>
          <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
            Access comprehensive lessons, practice questions, and flashcards tailored to {specialty.name.toLowerCase()} — all included with your NurseNest subscription.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg" data-testid="button-cta-pricing">
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/lessons" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-cta-lessons">
              Browse Lessons
            </Link>
          </div>
        </section>

        <section data-testid="section-other-specialties">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Explore Other Specialties</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {NURSING_SPECIALTIES.filter(s => s.slug !== specialty.slug).map(s => {
              const OtherIcon = s.icon;
              return (
                <Link key={s.slug} href={`/nursing-specialties/${s.slug}`} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${s.bgColor} ${s.iconColor} text-xs font-medium hover:opacity-80 transition-opacity`} data-testid={`link-other-specialty-${s.slug}`}>
                  <OtherIcon className="w-3.5 h-3.5" />
                  {s.name}
                </Link>
              );
            })}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
