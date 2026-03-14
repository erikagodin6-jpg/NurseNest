import { Link } from "wouter";
import {
  ArrowRight, BookOpen, FileText, Brain, Zap, Target, GraduationCap,
  CheckCircle2, HelpCircle, ChevronRight, ChevronDown, Award, BarChart3,
  DollarSign, TrendingUp, Briefcase, Users, ExternalLink
} from "lucide-react";
import { useState } from "react";
import { AlliedSEO } from "@/allied/allied-seo";
import { type ProfessionHubData } from "@/allied/data/profession-hub-data";

const FEATURE_ICONS = [BookOpen, Brain, Zap, FileText, GraduationCap, Target];

interface ProfessionHubPageProps {
  data: ProfessionHubData;
}

export default function ProfessionHubPage({ data }: ProfessionHubPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  const courseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${data.name} Exam Prep`,
    "description": data.seo.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "NurseNest Allied",
      "url": "https://allied.nursenest.ca",
    },
    "courseMode": "online",
    "isAccessibleForFree": false,
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://allied.nursenest.ca" },
      { "@type": "ListItem", "position": 2, "name": "Careers", "item": "https://allied.nursenest.ca/careers" },
      { "@type": "ListItem", "position": 3, "name": `${data.shortName} Exam Prep`, "item": `https://allied.nursenest.ca${data.seo.canonicalPath}` },
    ],
  };

  const orgStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "NurseNest Allied",
    "url": "https://allied.nursenest.ca",
    "description": "Allied health professional exam preparation platform offering courses for respiratory therapy, medical lab technology, social work, psychotherapy, addictions counselling, occupational therapy, and more.",
    "sameAs": [
      "https://www.instagram.com/nursenest.ca",
      "https://www.tiktok.com/@nursenest.ca",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Allied Health Exam Prep Courses",
      "itemListElement": [
        {
          "@type": "Course",
          "name": `${data.name} Certification Prep`,
          "description": data.seo.description,
          "courseMode": "online",
          "provider": { "@type": "EducationalOrganization", "name": "NurseNest Allied" },
        },
        ...data.studyFeatures.map((f) => ({
          "@type": "Course",
          "name": `${data.shortName} – ${f.label}`,
          "description": f.description,
          "courseMode": "online",
          "provider": { "@type": "EducationalOrganization", "name": "NurseNest Allied" },
        })),
      ],
    },
  };

  return (
    <div data-testid={`profession-hub-${data.professionSlug}`}>
      <AlliedSEO
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        canonicalPath={data.seo.canonicalPath}
        structuredData={courseStructuredData}
        additionalStructuredData={[faqStructuredData, breadcrumbStructuredData, orgStructuredData]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50/30" style={{ background: `linear-gradient(135deg, ${data.colorAccent}40, white, ${data.colorAccent}20)` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="hub-breadcrumbs">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/careers" className="hover:text-gray-700">Careers</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-medium" style={{ color: data.color }}>{data.shortName}</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: data.colorAccent, color: data.color }}>
              <GraduationCap className="w-4 h-4" />
              {data.shortName} Exam Academy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-hub-title">
              {data.shortName} Exam Prep
            </h1>
            <p className="text-lg text-gray-600 mb-6" data-testid="text-hub-tagline">{data.tagline}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: data.color }} />
                <span className="text-sm text-gray-700"><strong>600+ word rationales</strong> explaining the why behind every answer</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: data.color }} />
                <span className="text-sm text-gray-700"><strong>Blueprint-aligned</strong> questions mapped to official exam outlines</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: data.color }} />
                <span className="text-sm text-gray-700"><strong>Weak-area targeting</strong> so you study what matters most</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: data.color }} />
                <span className="text-sm text-gray-700"><strong>Adaptive mock exams</strong> simulating real certification conditions</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href={`/diagnostic?career=${data.careerSlug}`} className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-colors shadow-lg" style={{ backgroundColor: data.color }} data-testid="button-start-diagnostic">
                Start Free Diagnostic <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/qbank?career=${data.careerSlug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200" style={{ color: data.color }} data-testid="button-practice-questions">
                Practice Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100" data-testid="section-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-questions">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-500">Practice Questions</div>
            </div>
            <div data-testid="stat-domains">
              <div className="text-2xl font-bold text-gray-900">{data.domains.length}</div>
              <div className="text-sm text-gray-500">Exam Domains</div>
            </div>
            <div data-testid="stat-exams">
              <div className="text-2xl font-bold text-gray-900">{data.examInfo.examNames.length}</div>
              <div className="text-sm text-gray-500">Exam Types</div>
            </div>
            <div data-testid="stat-features">
              <div className="text-2xl font-bold text-gray-900">{data.studyFeatures.length}</div>
              <div className="text-sm text-gray-500">Study Tools</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-exam-info">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">About the {data.shortName} Licensing Exam</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{data.examInfo.examDescription}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: data.color }} />
                Exam Format
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{data.examInfo.examFormat}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: data.color }} />
                Certifying Bodies
              </h3>
              <ul className="space-y-2">
                {data.examInfo.certifyingBodies.map((body, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: data.color }} />
                    {body}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" style={{ color: data.color }} />
              Certification Exam Names
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.examInfo.examNames.map(name => (
                <span key={name} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: data.colorAccent, color: data.color }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-career">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{data.shortName} Career Overview</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-8">
            <p className="text-gray-600 leading-relaxed mb-6">{data.careerDescription}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                <DollarSign className="w-5 h-5 flex-shrink-0" style={{ color: data.color }} />
                <div>
                  <div className="text-xs text-gray-500 font-medium">Salary Range</div>
                  <div className="text-sm font-semibold text-gray-900">{data.salaryRange}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                <TrendingUp className="w-5 h-5 flex-shrink-0" style={{ color: data.color }} />
                <div>
                  <div className="text-xs text-gray-500 font-medium">Job Outlook</div>
                  <div className="text-sm font-semibold text-gray-900">{data.jobOutlook}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-domains">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Exam Blueprint Domains</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.domains.map((domain, i) => (
              <div key={domain} className="bg-white rounded-lg border border-gray-100 px-4 py-3 flex items-center gap-3" data-testid={`domain-${i}`}>
                <Target className="w-4 h-4 flex-shrink-0" style={{ color: data.color }} />
                <span className="text-sm text-gray-700">{domain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-study-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Study Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.studyFeatures.map((feature, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <div key={feature.label} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all" data-testid={`card-feature-${i}`}>
                  <Icon className="w-7 h-7 mb-3" style={{ color: data.color }} />
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.label}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-content-clusters">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Explore {data.shortName} Study Resources</h2>
            <p className="text-gray-600">Organized study materials to help you prepare systematically for your certification exam.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Lessons", href: `${data.contentClusterBase}/lessons`, icon: BookOpen, desc: "In-depth lessons covering all exam domains" },
              { label: "Practice Questions", href: `${data.contentClusterBase}/practice-questions`, icon: Target, desc: "Exam-authentic questions with detailed rationales" },
              { label: "Flashcards", href: `${data.contentClusterBase}/flashcards`, icon: Brain, desc: "Spaced repetition cards for key concepts" },
              { label: "Mock Exam", href: `${data.contentClusterBase}/mock-exam`, icon: FileText, desc: "Full-length blueprint-weighted practice exams" },
              { label: "Study Guide", href: `${data.contentClusterBase}/study-guide`, icon: GraduationCap, desc: "Comprehensive study guide and planning tools" },
            ].map(item => (
              <Link key={item.label} href={item.href} className="group" data-testid={`link-cluster-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-gray-200 transition-all">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: data.colorAccent }}>
                    <item.icon className="w-5 h-5" style={{ color: data.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{item.label}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden" data-testid={`faq-item-${i}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  data-testid={`button-faq-${i}`}
                >
                  <HelpCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: data.color }} />
                  <span className="font-medium text-gray-900 flex-1">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 pl-13 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${i}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-cross-links">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Related Professions</h2>
          <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">Explore exam prep resources for related healthcare professions with overlapping clinical content.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.crossLinks.map(link => (
              <Link key={link.href} href={link.href} className="group" data-testid={`link-cross-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all h-full">
                  <ExternalLink className="w-5 h-5 text-gray-400 mb-2 group-hover:text-gray-600" />
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm group-hover:text-teal-700 transition-colors">{link.label}</h3>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: `linear-gradient(to bottom, ${data.colorAccent}40, white)` }} data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your {data.shortName} Exam Prep?</h2>
          <p className="text-gray-600 mb-8">Take a free diagnostic to see exactly where you stand, then follow your personalized study plan to exam-day confidence.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/diagnostic?career=${data.careerSlug}`} className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-colors shadow-lg" style={{ backgroundColor: data.color }} data-testid="button-cta-diagnostic">
              Start Free Diagnostic <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200 text-gray-700" data-testid="button-cta-pricing">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-gray-100" data-testid="section-related-resources">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href={`/${data.contentClusterBase ? data.contentClusterBase.replace(/^\//, '') : data.careerSlug}`} className="text-sm hover:underline" style={{ color: data.color }} data-testid="link-career-overview">
              {data.shortName} Career Overview →
            </Link>
            <Link href={`${data.contentClusterBase}/practice-questions`} className="text-sm hover:underline" style={{ color: data.color }} data-testid="link-practice-questions">
              {data.shortName} Practice Questions →
            </Link>
            <Link href={`${data.contentClusterBase}/study-guide`} className="text-sm hover:underline" style={{ color: data.color }} data-testid="link-study-guide">
              {data.shortName} Study Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
