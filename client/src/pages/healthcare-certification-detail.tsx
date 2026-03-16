import { Link, useParams } from "wouter";
import { useState } from "react";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getCertificationBySlug } from "@/data/healthcare-certifications-data";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  ArrowRight, Award, BookOpen, ChevronRight, Check, Clock,
  DollarSign, GraduationCap, HelpCircle, RefreshCw, Shield,
  Stethoscope, Target, Users, ClipboardList, Layers, FileText,
  CheckCircle2, AlertTriangle, BarChart3
} from "lucide-react";

const COLOR_MAP: Record<string, { bg: string; iconColor: string; border: string; gradientFrom: string; gradientTo: string; badgeBg: string; badgeText: string; btnBg: string; btnHover: string }> = {
  red: { bg: "bg-red-50", iconColor: "text-red-600", border: "border-red-100", gradientFrom: "from-red-50", gradientTo: "to-red-100/30", badgeBg: "bg-red-100", badgeText: "text-red-700", btnBg: "bg-red-600", btnHover: "hover:bg-red-700" },
  blue: { bg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100", gradientFrom: "from-blue-50", gradientTo: "to-blue-100/30", badgeBg: "bg-blue-100", badgeText: "text-blue-700", btnBg: "bg-blue-600", btnHover: "hover:bg-blue-700" },
  sky: { bg: "bg-sky-50", iconColor: "text-sky-600", border: "border-sky-100", gradientFrom: "from-sky-50", gradientTo: "to-sky-100/30", badgeBg: "bg-sky-100", badgeText: "text-sky-700", btnBg: "bg-sky-600", btnHover: "hover:bg-sky-700" },
  orange: { bg: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100", gradientFrom: "from-orange-50", gradientTo: "to-orange-100/30", badgeBg: "bg-orange-100", badgeText: "text-orange-700", btnBg: "bg-orange-600", btnHover: "hover:bg-orange-700" },
  pink: { bg: "bg-pink-50", iconColor: "text-pink-600", border: "border-pink-100", gradientFrom: "from-pink-50", gradientTo: "to-pink-100/30", badgeBg: "bg-pink-100", badgeText: "text-pink-700", btnBg: "bg-pink-600", btnHover: "hover:bg-pink-700" },
  violet: { bg: "bg-violet-50", iconColor: "text-violet-600", border: "border-violet-100", gradientFrom: "from-violet-50", gradientTo: "to-violet-100/30", badgeBg: "bg-violet-100", badgeText: "text-violet-700", btnBg: "bg-violet-600", btnHover: "hover:bg-violet-700" },
  purple: { bg: "bg-purple-50", iconColor: "text-purple-600", border: "border-purple-100", gradientFrom: "from-purple-50", gradientTo: "to-purple-100/30", badgeBg: "bg-purple-100", badgeText: "text-purple-700", btnBg: "bg-purple-600", btnHover: "hover:bg-purple-700" },
  teal: { bg: "bg-teal-50", iconColor: "text-teal-600", border: "border-teal-100", gradientFrom: "from-teal-50", gradientTo: "to-teal-100/30", badgeBg: "bg-teal-100", badgeText: "text-teal-700", btnBg: "bg-teal-600", btnHover: "hover:bg-teal-700" },
};

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden" data-testid={`faq-item-${index}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors" data-testid={`button-faq-toggle-${index}`}>
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? 'text-emerald-500' : 'text-gray-400'}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>{answer}</div>}
    </div>
  );
}

export default function HealthcareCertificationDetail() {
  const params = useParams<{ slug: string }>();
  const cert = getCertificationBySlug(params.slug || "");

  if (!cert) {
    return (
      <div data-testid="page-cert-not-found">
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-not-found">Certification Not Found</h1>
            <p className="text-gray-600 mb-6">The certification page you are looking for is not available.</p>
            <Link href="/healthcare-certifications" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors" data-testid="link-back-to-hub">
              Back to Certifications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const colors = COLOR_MAP[cert.color] || COLOR_MAP.blue;
  const faqStructuredData = buildFaqStructuredData(cert.faqs);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${cert.name} Certification Guide — ${cert.fullName}`,
    "description": cert.seo.description,
    "author": { "@type": "Organization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
    "publisher": { "@type": "Organization", "name": "NurseNest", "url": "https://www.nursenest.ca", "logo": { "@type": "ImageObject", "url": "https://www.nursenest.ca/opengraph.jpg" } },
    "datePublished": "2025-01-15",
    "dateModified": new Date().toISOString().split("T")[0],
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.nursenest.ca/healthcare-certifications/${cert.slug}` },
  };

  return (
    <div data-testid={`page-healthcare-cert-${cert.slug}`}>
      <Navigation />
      <SEO
        title={cert.seo.title}
        description={cert.seo.description}
        keywords={cert.seo.keywords}
        canonicalPath={`/healthcare-certifications/${cert.slug}`}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "Healthcare Certifications", url: "https://www.nursenest.ca/healthcare-certifications" },
          { name: `${cert.name} Certification`, url: `https://www.nursenest.ca/healthcare-certifications/${cert.slug}` },
        ]}
        structuredData={articleStructuredData}
        additionalStructuredData={[faqStructuredData]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} via-white/50 ${colors.gradientTo}`} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/healthcare-certifications" className="hover:text-emerald-600">Healthcare Certifications</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={`${colors.badgeText} font-medium`}>{cert.name}</span>
          </div>
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${colors.badgeBg} ${colors.badgeText} mb-4`} data-testid="badge-cert">
              <Award className="w-4 h-4" /> {cert.category === "emergency" ? "Life Support Certification" : "Specialty Certification"}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
              {cert.name} Certification Guide
            </h1>
            <p className="text-xl text-gray-500 mb-4" data-testid="text-full-name">{cert.fullName}</p>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-page-subtitle">
              Everything you need to know about {cert.name} certification — eligibility, exam structure, renewal cycle, clinical relevance, and how to prepare with NurseNest study tools.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                <Shield className="w-4 h-4" /> {cert.organization}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                <Clock className="w-4 h-4" /> Valid {cert.validity}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                <DollarSign className="w-4 h-4" /> {cert.cost}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/free-practice" className={`inline-flex items-center gap-2 px-6 py-3 ${colors.btnBg} text-white rounded-xl font-semibold ${colors.btnHover} transition-colors shadow-lg`} data-testid="button-start-practice">
                Practice Questions <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#exam-structure" onClick={(e) => { e.preventDefault(); document.getElementById('exam-structure')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200" data-testid="button-exam-structure">
                Exam Structure
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-who-its-for">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-br ${colors.gradientFrom} to-white rounded-2xl border ${colors.border} p-8`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <Users className={`w-5 h-5 ${colors.iconColor}`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900" data-testid="text-who-heading">Who Is {cert.name} For?</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {cert.whoItsFor.map((role, i) => (
                <span key={i} className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${colors.bg} ${colors.iconColor}`} data-testid={`badge-role-${i}`}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-eligibility">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <CheckCircle2 className={`w-5 h-5 ${colors.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900" data-testid="text-eligibility-heading">Eligibility Requirements</h2>
          </div>
          <div className="space-y-3">
            {cert.eligibility.map((req, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4" data-testid={`text-eligibility-${i}`}>
                <Check className={`w-5 h-5 ${colors.iconColor} mt-0.5 flex-shrink-0`} />
                <p className="text-gray-700">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="exam-structure" data-testid="section-exam-structure">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <FileText className={`w-5 h-5 ${colors.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900" data-testid="text-exam-heading">Exam Structure</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className={`bg-white rounded-xl border ${colors.border} p-5 text-center`} data-testid="card-exam-format">
              <p className="text-xs text-gray-400 uppercase font-medium mb-1">Format</p>
              <p className="text-sm font-semibold text-gray-900">{cert.examStructure.format}</p>
            </div>
            <div className={`bg-white rounded-xl border ${colors.border} p-5 text-center`} data-testid="card-exam-questions">
              <p className="text-xs text-gray-400 uppercase font-medium mb-1">Questions</p>
              <p className="text-sm font-semibold text-gray-900">{cert.examStructure.questions}</p>
            </div>
            <div className={`bg-white rounded-xl border ${colors.border} p-5 text-center`} data-testid="card-exam-duration">
              <p className="text-xs text-gray-400 uppercase font-medium mb-1">Duration</p>
              <p className="text-sm font-semibold text-gray-900">{cert.examStructure.duration}</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4" data-testid="text-domains-heading">Exam Domains</h3>
          <div className="space-y-3">
            {cert.examStructure.domains.map((domain, i) => (
              <div key={i} className={`bg-white rounded-xl border ${colors.border} p-5`} data-testid={`card-domain-${i}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{domain.name}</h4>
                  <span className={`text-sm font-bold ${colors.iconColor}`}>{domain.percentage}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                  <div className={`h-2 rounded-full ${colors.btnBg.replace('bg-', 'bg-')}`} style={{ width: domain.percentage }} />
                </div>
                <p className="text-sm text-gray-500">{domain.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-600">
              <strong>Passing Score:</strong> {cert.passingScore}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-renewal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <RefreshCw className={`w-5 h-5 ${colors.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900" data-testid="text-renewal-heading">Renewal Cycle</h2>
          </div>
          <div className={`bg-white rounded-2xl border ${colors.border} p-8 mb-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Clock className={`w-5 h-5 ${colors.iconColor}`} />
              <p className="font-semibold text-gray-900">Renewal Period: {cert.renewalCycle.period}</p>
            </div>
            {cert.renewalCycle.ceHours && (
              <p className="text-sm text-gray-600 mb-4">CE Requirements: {cert.renewalCycle.ceHours}</p>
            )}
            <div className="space-y-3">
              {cert.renewalCycle.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3" data-testid={`text-renewal-req-${i}`}>
                  <Check className={`w-5 h-5 ${colors.iconColor} mt-0.5 flex-shrink-0`} />
                  <p className="text-gray-700 text-sm">{req}</p>
                </div>
              ))}
            </div>
          </div>
          {cert.category === "emergency" && (
            <Link href={`/certifications/${cert.slug}-renewal-prep`} className={`inline-flex items-center gap-2 text-sm font-medium ${colors.iconColor} hover:underline`} data-testid="link-renewal-prep">
              <RefreshCw className="w-4 h-4" /> View {cert.name} Renewal Prep Guide <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-clinical-relevance">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <Stethoscope className={`w-5 h-5 ${colors.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900" data-testid="text-relevance-heading">Clinical Relevance</h2>
          </div>
          <div className="space-y-3">
            {cert.clinicalRelevance.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4" data-testid={`text-relevance-${i}`}>
                <Target className={`w-5 h-5 ${colors.iconColor} mt-0.5 flex-shrink-0`} />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-study-guidance">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <GraduationCap className={`w-5 h-5 ${colors.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900" data-testid="text-study-heading">Study Preparation Guide</h2>
          </div>
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
            <p className="text-sm text-gray-600">
              <strong>Recommended Study Time:</strong> {cert.studyGuidance.recommendedStudyTime}
            </p>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Study Tips</h3>
          <div className="space-y-3 mb-8">
            {cert.studyGuidance.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4" data-testid={`text-study-tip-${i}`}>
                <div className={`w-6 h-6 rounded-full ${colors.bg} ${colors.iconColor} flex items-center justify-center flex-shrink-0 text-xs font-bold`}>{i + 1}</div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">NurseNest Study Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cert.studyGuidance.resources.map((resource, i) => (
              <Link key={i} href={resource.href} className="group" data-testid={`link-resource-${i}`}>
                <div className={`bg-white rounded-xl border ${colors.border} p-5 hover:shadow-md transition-all h-full`}>
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                    {resource.type === "questions" ? <ClipboardList className={`w-5 h-5 ${colors.iconColor}`} /> :
                     resource.type === "flashcards" ? <Layers className={`w-5 h-5 ${colors.iconColor}`} /> :
                     resource.type === "lesson" ? <BookOpen className={`w-5 h-5 ${colors.iconColor}`} /> :
                     <GraduationCap className={`w-5 h-5 ${colors.iconColor}`} />}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">{resource.title}</h4>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-2">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-faq-heading">{cert.name} Certification FAQs</h2>
          <div className="space-y-3">
            {cert.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-700" data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Ready to Prepare for {cert.name}?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Practice questions, flashcards, and lessons aligned to the {cert.name} exam blueprint. Start your preparation today with NurseNest.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/free-practice" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg" data-testid="button-cta-practice">
              Practice Questions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-400 transition-colors border border-emerald-400" data-testid="button-cta-pricing">
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white" data-testid="section-cross-links">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2" data-testid="text-cross-heading">Explore Other Certifications</h2>
            <Link href="/healthcare-certifications" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors" data-testid="link-back-to-hub">
              ← Back to Healthcare Certifications Hub
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {["bls", "acls", "pals", "nrp", "tncc", "enpc", "ccrn", "cen", "ocn", "cmsrn"]
              .filter(s => s !== cert.slug)
              .slice(0, 5)
              .map(slug => {
                const rel = getCertificationBySlug(slug);
                if (!rel) return null;
                return (
                  <Link key={slug} href={`/healthcare-certifications/${slug}`} className="group" data-testid={`link-related-${slug}`}>
                    <div className="bg-gray-50 rounded-xl p-4 hover:bg-emerald-50 transition-colors text-center h-full">
                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm">{rel.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{rel.fullName}</p>
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
