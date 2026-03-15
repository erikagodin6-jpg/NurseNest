import { Link } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  ArrowRight, Award, ShieldCheck, BookOpen, ChevronRight,
  HelpCircle, TrendingUp, Clock, DollarSign, GraduationCap,
  Stethoscope, Heart, Brain, Baby, Scissors, Ribbon, Activity
} from "lucide-react";

const CERTIFICATION_CARDS = [
  { slug: "ccrn", name: "CCRN", fullName: "Critical-Care Registered Nurse", org: "AACN", icon: Activity, color: "red" },
  { slug: "cen", name: "CEN", fullName: "Certified Emergency Nurse", org: "BCEN", icon: Stethoscope, color: "orange" },
  { slug: "cmsrn", name: "CMSRN", fullName: "Certified Med-Surg Nurse", org: "MSNCB", icon: Heart, color: "blue" },
  { slug: "ocn", name: "OCN", fullName: "Oncology Certified Nurse", org: "ONCC", icon: Ribbon, color: "purple" },
  { slug: "cnor", name: "CNOR", fullName: "Certified Perioperative Nurse", org: "CCI", icon: Scissors, color: "indigo" },
  { slug: "cpn", name: "CPN", fullName: "Certified Pediatric Nurse", org: "PNCB", icon: Baby, color: "sky" },
  { slug: "pmh-bc", name: "PMH-BC", fullName: "Psychiatric-Mental Health", org: "ANCC", icon: Brain, color: "teal" },
  { slug: "cna-critical-care", name: "CNA-CC", fullName: "CNA Critical Care (Canada)", org: "CNA", icon: Activity, color: "rose" },
  { slug: "cna-emergency", name: "CNA-ER", fullName: "CNA Emergency (Canada)", org: "CNA", icon: Stethoscope, color: "amber" },
  { slug: "canadian-np-exam", name: "CNPLE", fullName: "Canadian NP Licensing Exam", org: "CCRNR", icon: GraduationCap, color: "emerald" },
];

const COLOR_MAP: Record<string, { bg: string; iconColor: string; border: string }> = {
  red: { bg: "bg-red-50", iconColor: "text-red-600", border: "border-red-100" },
  orange: { bg: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100" },
  blue: { bg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100" },
  purple: { bg: "bg-purple-50", iconColor: "text-purple-600", border: "border-purple-100" },
  indigo: { bg: "bg-indigo-50", iconColor: "text-indigo-600", border: "border-indigo-100" },
  sky: { bg: "bg-sky-50", iconColor: "text-sky-600", border: "border-sky-100" },
  teal: { bg: "bg-teal-50", iconColor: "text-teal-600", border: "border-teal-100" },
  rose: { bg: "bg-rose-50", iconColor: "text-rose-600", border: "border-rose-100" },
  amber: { bg: "bg-amber-50", iconColor: "text-amber-600", border: "border-amber-100" },
  emerald: { bg: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-emerald-100" },
};

const FAQ_DATA = [
  { question: "How do I choose which nursing certification to pursue?", answer: "Choose based on your clinical specialty and career goals. Start with the certification most aligned to your current practice area. For example, if you work in an ICU, pursue CCRN. If you work in emergency, pursue CEN. Consider employer requirements and salary differentials in your decision." },
  { question: "Are nursing certifications required to practice?", answer: "No. Nursing certifications are voluntary credentials that demonstrate specialized expertise. However, many employers prefer or require certification for specialty positions, and Magnet hospitals often mandate certification for clinical ladder advancement." },
  { question: "How long does it take to prepare for a certification exam?", answer: "Most nurses study 6-12 weeks while working full-time. The preparation time depends on your clinical experience in the specialty. Nurses with 3+ years in their specialty typically need less preparation than those with 1-2 years of experience." },
  { question: "Do nursing certifications increase salary?", answer: "Yes. Most hospitals offer certification pay differentials ranging from $1,000 to $10,000 annually. The exact amount varies by institution, but CCRN, CEN, and CNOR certifications typically command the highest premiums." },
  { question: "Are US certifications recognized in Canada?", answer: "US certifications like CCRN and CEN are recognized by many Canadian employers but are not equivalent to CNA specialty certifications. Canadian nurses may hold both US and Canadian credentials. The CNA offers Canada-specific certification exams." },
  { question: "How often do certifications need to be renewed?", answer: "Most nursing certifications are valid for 3-5 years and require renewal through continuing education, practice hours, or re-examination. Check the specific requirements of your certifying body." },
];

const WHY_CERTIFY = [
  { icon: DollarSign, title: "Higher Earning Potential", desc: "Certified nurses earn $3,000-$10,000 more annually" },
  { icon: TrendingUp, title: "Career Advancement", desc: "Required for leadership and clinical educator roles" },
  { icon: ShieldCheck, title: "Professional Credibility", desc: "Recognized expertise validated by national organizations" },
  { icon: Clock, title: "Magnet Recognition", desc: "Contributes to hospital Magnet designation requirements" },
];

export default function NursingCertificationsHub() {
  const faqStructuredData = buildFaqStructuredData(FAQ_DATA);

  return (
    <div data-testid="page-nursing-certifications-hub">
      <Navigation />
      <SEO
        title="Nursing Certifications Guide: CCRN, CEN, CNOR & More | NurseNest"
        description="Complete guide to nursing certifications including CCRN, CEN, CMSRN, OCN, CNOR, CPN, PMH-BC, and Canadian CNA specialty certifications. Eligibility, exam content, and study resources."
        keywords="nursing certifications, CCRN certification, CEN certification, CMSRN, OCN, CNOR, CPN, PMH-BC, CNA certification, nursing specialty certification, certification exam prep"
        canonicalPath="/nursing-certifications"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Nursing Certifications Guide",
          "description": "Complete guide to nursing certifications including CCRN, CEN, CMSRN, OCN, CNOR, CPN, PMH-BC, and Canadian CNA specialty certifications.",
          "provider": { "@type": "Organization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
        }}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "Nursing Certifications", url: "https://www.nursenest.ca/nursing-certifications" },
        ]}
        additionalStructuredData={[faqStructuredData]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-700 font-medium">Nursing Certifications</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-4" data-testid="badge-certifications">
              <Award className="w-4 h-4" /> Certification Guides
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              Nursing Certification Guides
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-page-subtitle">
              Comprehensive guides for every major nursing certification — eligibility requirements, exam content blueprints, study strategies, and career impact. Find the right credential for your specialty.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/nursing-specialties" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200" data-testid="button-explore-specialties">
                Explore Specialties <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/study-pathways" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors border border-emerald-200" data-testid="button-study-pathways">
                Study Pathways
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-why-certify">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-why-heading">Why Get Certified?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CERTIFY.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 text-center" data-testid={`card-why-${i}`}>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-certification-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-grid-heading">10 Certification Guides</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Each guide covers eligibility, exam blueprint, study strategies, and career impact for a specific nursing certification.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATION_CARDS.map((cert) => {
              const colors = COLOR_MAP[cert.color] || COLOR_MAP.blue;
              return (
                <Link key={cert.slug} href={`/certifications/${cert.slug}`} className="group" data-testid={`card-cert-${cert.slug}`}>
                  <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`}>
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                      <cert.icon className={`w-6 h-6 ${colors.iconColor}`} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors" data-testid={`text-cert-name-${cert.slug}`}>
                        {cert.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cert.org}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{cert.fullName}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                      View Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-cross-links">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" data-testid="text-cross-heading">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/nursing-specialties" className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors group" data-testid="link-specialties">
              <h3 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">Nursing Specialties</h3>
              <p className="text-sm text-blue-700/70">Explore career guides for critical care, emergency, pediatric, oncology, and more.</p>
            </Link>
            <Link href="/study-pathways" className="bg-violet-50 rounded-xl p-6 hover:bg-violet-100 transition-colors group" data-testid="link-pathways">
              <h3 className="font-semibold text-violet-900 mb-1 group-hover:text-violet-700">Study Pathways</h3>
              <p className="text-sm text-violet-700/70">Structured study plans to master your specialty and prepare for certification exams.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-faq-heading">Certification FAQs</h2>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-700" data-testid="section-cta">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-cta-heading">
            Start Your Certification Journey
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Practice questions, flashcards, and study tools aligned to every major nursing certification exam.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/free-practice" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg" data-testid="button-cta-qbank">
              Practice Questions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-400 transition-colors border border-emerald-400" data-testid="button-cta-pricing">
              View Pricing
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
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? 'text-emerald-500' : 'text-gray-400'}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" data-testid={`text-faq-answer-${index}`}>{answer}</div>}
    </div>
  );
}
