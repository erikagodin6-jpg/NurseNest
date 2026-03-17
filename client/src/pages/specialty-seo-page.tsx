import { useState } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildFaqStructuredData, PARENT_EDUCATIONAL_ORG } from "@/lib/structured-data";
import { getSpecialtyBySeoSlug, SPECIALTY_CONFIGS, type SpecialtyConfig } from "@/data/specialty-hub-data";
import { MedicalReviewBadge, MedicalReviewJsonLd } from "@/components/medical-review-badge";
import { MedicalReferences } from "@/components/medical-references";
import {
  ArrowRight, BookOpen, ChevronRight, Check, ChevronDown,
  ClipboardList, Layers, GraduationCap, FileText, HelpCircle,
  Star, TrendingUp, Stethoscope
} from "lucide-react";

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
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} text-gray-400`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3" data-testid={`text-faq-answer-${index}`}>
          {answer}
        </div>
      )}
    </div>
  );
}

function SeoNotFound() {
  return (
    <div data-testid="page-seo-not-found">
      <Navigation />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
          <p className="text-gray-600 mb-6">The nursing guide you are looking for is not available.</p>
          <Link href="/nursing-specialties" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            View All Specialties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function SeoContent({ specialty }: { specialty: SpecialtyConfig }) {
  const Icon = specialty.icon;
  const faqStructuredData = buildFaqStructuredData(specialty.faq);
  const seoTitle = `${specialty.name} Guide - Complete Study Resource | NurseNest`;
  const seoDescription = `Comprehensive ${specialty.name.toLowerCase()} study guide with pathophysiology lessons, practice questions, flashcards, and ${specialty.certifications.join("/")} certification prep. Free resources available.`;

  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": seoTitle,
    "description": seoDescription,
    "url": `https://www.nursenest.ca/${specialty.seoSlug}`,
    "about": {
      "@type": "MedicalSpecialty",
      "name": specialty.name,
    },
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
      "parentOrganization": {
        "@type": "EducationalOrganization",
        "name": PARENT_EDUCATIONAL_ORG.name,
        "url": PARENT_EDUCATIONAL_ORG.url,
      },
    },
    "specialty": specialty.certifications.join(", "),
    "educationalLevel": "Advanced",
    "inLanguage": "en",
    "isAccessibleForFree": false,
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${specialty.name} Specialty Track`,
    "description": specialty.longDescription,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "educationalLevel": "Advanced",
    "about": specialty.name,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT20H",
    },
  };

  return (
    <div data-testid={`page-seo-${specialty.seoSlug}`}>
      <Navigation />
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={`${specialty.name.toLowerCase()} guide, ${specialty.name.toLowerCase()} study guide, ${specialty.certifications.join(" ").toLowerCase()} prep, ${specialty.slug} nursing, nursing specialty guide, ${specialty.name.toLowerCase()} certification`}
        canonicalPath={`/${specialty.seoSlug}`}
        structuredData={medicalWebPageSchema}
        additionalStructuredData={[faqStructuredData, courseSchema]}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "Nursing Specialties", url: "https://www.nursenest.ca/nursing-specialties" },
          { name: `${specialty.name} Guide`, url: `https://www.nursenest.ca/${specialty.seoSlug}` },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="nav-breadcrumb">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/nursing-specialties" className="hover:text-blue-600">Specialties</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">{specialty.name} Guide</span>
          </div>
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${specialty.bgColor} ${specialty.iconColor} mb-4`} data-testid="badge-guide-type">
              <FileText className="w-4 h-4" />
              Complete Study Guide
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              {specialty.name}: Complete Nursing Study Guide
            </h1>
            <p className="text-lg text-gray-600 mb-4" data-testid="text-page-subtitle">
              {specialty.longDescription}
            </p>
            <p className="text-base text-gray-500 mb-6" data-testid="text-seo-intro">
              Master {specialty.name.toLowerCase()} with comprehensive pathophysiology lessons, certification-aligned practice questions, clinical scenarios, and flashcards. This guide covers everything from core clinical skills to {specialty.certifications.join("/")} exam preparation and career development.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {specialty.certifications.map((cert) => (
                <span key={cert} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700" data-testid={`badge-cert-${cert}`}>
                  <Star className="w-3 h-3" />
                  {cert} Aligned
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preview/${specialty.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200" data-testid="button-go-to-specialty">
                Try Practice Questions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${specialty.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200" data-testid="button-view-pricing">
                Explore {specialty.name} Track
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100" data-testid="section-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-topics">
              <div className="text-2xl font-bold text-gray-900">{specialty.topics.length}+</div>
              <div className="text-sm text-gray-500">Core Topics</div>
            </div>
            <div data-testid="stat-certifications">
              <div className="text-2xl font-bold text-gray-900">{specialty.certifications.length}</div>
              <div className="text-sm text-gray-500">Certifications Covered</div>
            </div>
            <div data-testid="stat-questions">
              <div className="text-2xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-500">Practice Questions</div>
            </div>
            <div data-testid="stat-pass-rate">
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-500">Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-what-you-learn">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-learn-heading">What You Will Learn in This Guide</h2>
            <p className="text-gray-600">Comprehensive clinical content aligned to {specialty.certifications.join(" & ")} certification exam blueprints.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specialty.topics.map((topic, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4" data-testid={`card-learn-topic-${i}`}>
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-included">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-included-heading">What's Included</h2>
            <p className="text-gray-600">Everything you need to master {specialty.name.toLowerCase()} — lessons, questions, and flashcards.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center" data-testid="card-included-lessons">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Specialty Lessons</h3>
              <p className="text-sm text-gray-500">In-depth pathophysiology, pharmacology, and clinical management lessons for {specialty.name.toLowerCase()}.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center" data-testid="card-included-qbank">
              <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Test Bank</h3>
              <p className="text-sm text-gray-500">Practice questions written at the {specialty.certifications[0]} certification exam level with full rationales.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center" data-testid="card-included-flashcards">
              <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flashcard Decks</h3>
              <p className="text-sm text-gray-500">Spaced-repetition flashcards covering key terminology, medications, and clinical concepts.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white" data-testid="section-new-grad-link">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2" data-testid="text-new-grad-cta-heading">{specialty.newGradGuideTitle}</h2>
                <p className="text-gray-600 mb-4" data-testid="text-new-grad-cta-desc">{specialty.newGradGuideDescription}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/new-grad" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm" data-testid="link-new-grad-hub">
                    New Grad Hub <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href={`/${specialty.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200 text-sm" data-testid="link-specialty-page">
                    {specialty.name} Track
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {specialty.relatedSpecialties.length > 0 && (
        <section className="py-16 bg-gray-50" data-testid="section-related-specialties">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-related-heading">Related Nursing Specialties</h2>
              <p className="text-gray-600">Explore other nursing specialties that complement {specialty.name.toLowerCase()}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPECIALTY_CONFIGS.filter(s => specialty.relatedSpecialties.includes(s.slug)).map((related) => {
                const RelIcon = related.icon;
                return (
                  <Link key={related.slug} href={`/${related.seoSlug}`} className="group" data-testid={`card-related-specialty-${related.slug}`}>
                    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all h-full">
                      <div className={`w-10 h-10 rounded-lg ${related.bgColor} flex items-center justify-center mb-3`}>
                        <RelIcon className={`w-5 h-5 ${related.iconColor}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-700 transition-colors">{related.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-2">{related.description.split('.')[0]}.</p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                        View Guide <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Link href="/nursing-specialties" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors" data-testid="link-all-specialties">
                <Stethoscope className="w-4 h-4" /> View All Nursing Specialties <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-faq-heading">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about {specialty.name.toLowerCase()}</p>
          </div>
          <div className="space-y-3">
            {specialty.faq.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-gray-100" data-testid="section-eeat">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <MedicalReviewBadge />
            <MedicalReferences lessonId={specialty.slug} pageType="specialty" />
          </div>
        </div>
      </section>

      <MedicalReviewJsonLd
        title={`${specialty.name} Complete Study Guide`}
        slug={specialty.seoSlug}
        description={seoDescription}
        pageUrl={`https://www.nursenest.ca/${specialty.seoSlug}`}
      />

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700" data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Start Your {specialty.name} Journey
          </h2>
          <p className="text-blue-100 mb-4 text-lg">
            Join thousands of nurses mastering {specialty.name.toLowerCase()} with NurseNest.
          </p>
          <p className="text-blue-200 mb-8 text-sm">
            All specialty tracks included with your subscription. Starting at $19/month.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preview/${specialty.slug}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg" data-testid="button-cta-pricing">
              Try Practice Questions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={`/${specialty.slug}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-cta-explore">
              Explore {specialty.name}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function SpecialtySeoPage() {
  const params = useParams<{ slug: string }>();
  const specialty = getSpecialtyBySeoSlug(params.slug || "");

  if (!specialty) {
    return <SeoNotFound />;
  }

  return <SeoContent specialty={specialty} />;
}

export function SpecialtySeoBySlug({ slug }: { slug: string }) {
  const specialty = getSpecialtyBySeoSlug(slug);

  if (!specialty) {
    return <SeoNotFound />;
  }

  return <SeoContent specialty={specialty} />;
}
