import { Link } from "wouter";
import { useState } from "react";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HEALTHCARE_CERTIFICATIONS, getCertificationsByCategory } from "@/data/healthcare-certifications-data";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  ArrowRight, Award, ShieldCheck, BookOpen, ChevronRight,
  HelpCircle, TrendingUp, Clock, DollarSign, GraduationCap,
  Stethoscope, Heart, Brain, Baby, Ribbon, Activity,
  RefreshCw, Zap, ClipboardList, Layers, Users, Filter,
  Search
} from "lucide-react";

const COLOR_MAP: Record<string, { bg: string; iconColor: string; border: string }> = {
  red: { bg: "bg-red-50", iconColor: "text-red-600", border: "border-red-100" },
  orange: { bg: "bg-orange-50", iconColor: "text-orange-600", border: "border-orange-100" },
  blue: { bg: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100" },
  purple: { bg: "bg-purple-50", iconColor: "text-purple-600", border: "border-purple-100" },
  sky: { bg: "bg-sky-50", iconColor: "text-sky-600", border: "border-sky-100" },
  teal: { bg: "bg-teal-50", iconColor: "text-teal-600", border: "border-teal-100" },
  pink: { bg: "bg-pink-50", iconColor: "text-pink-600", border: "border-pink-100" },
  violet: { bg: "bg-violet-50", iconColor: "text-violet-600", border: "border-violet-100" },
};

const ICON_MAP: Record<string, typeof Activity> = {
  acls: Heart,
  pals: Baby,
  bls: Activity,
  nrp: Baby,
  tncc: Zap,
  enpc: Baby,
  ccrn: Activity,
  cen: Stethoscope,
  ocn: Ribbon,
  cmsrn: Heart,
};

const FAQ_DATA = [
  { question: "How do I choose which healthcare certification to pursue?", answer: "Choose based on your clinical specialty and career goals. Start with required certifications for your unit (BLS is universal, ACLS for acute care, PALS for pediatrics). Then pursue specialty certifications like CCRN or CEN after gaining clinical experience." },
  { question: "Are healthcare certifications required to practice nursing?", answer: "BLS is required for all nursing positions. ACLS, PALS, NRP, TNCC, and ENPC are required by specific units and facilities. Specialty certifications like CCRN, CEN, OCN, and CMSRN are voluntary but strongly preferred by employers and often required for clinical ladder advancement." },
  { question: "How long does it take to prepare for a certification exam?", answer: "Course-based certifications (BLS: 1 day, ACLS/PALS: 2 days, TNCC/ENPC: 2 days) include instruction time. Knowledge-based exams like CCRN, CEN, OCN, and CMSRN typically require 6-12 weeks of self-study while working full-time." },
  { question: "Do healthcare certifications increase salary?", answer: "Yes. Most hospitals offer certification pay differentials ranging from $1,000 to $10,000 annually. CCRN, CEN, and specialty certifications typically command the highest premiums. Certifications also strengthen your position for leadership roles." },
  { question: "What is the difference between course certifications and exam certifications?", answer: "Course certifications (BLS, ACLS, PALS, NRP, TNCC, ENPC) are earned by completing a structured course with skills testing. Exam certifications (CCRN, CEN, CMSRN, OCN) require passing a comprehensive knowledge exam and typically require significant clinical experience hours." },
  { question: "How often do certifications need to be renewed?", answer: "BLS, ACLS, PALS, and NRP renew every 2 years. TNCC and ENPC renew every 4 years. CCRN renews every 3 years. CEN and OCN renew every 4 years. CMSRN renews every 5 years. Each has different renewal options including re-examination and continuing education." },
  { question: "What certifications should new graduate nurses get first?", answer: "BLS before day one (usually done in nursing school). ACLS within 90 days for acute care. PALS within 6 months for pediatric/ED units. NRP for labor & delivery. TNCC for trauma/ED. Specialty certifications after 1-2 years of experience." },
];

const WHY_CERTIFY = [
  { icon: DollarSign, title: "Higher Earning Potential", desc: "Certified nurses earn $3,000-$10,000 more annually" },
  { icon: TrendingUp, title: "Career Advancement", desc: "Required for leadership and clinical educator roles" },
  { icon: ShieldCheck, title: "Professional Credibility", desc: "Recognized expertise validated by national organizations" },
  { icon: Clock, title: "Magnet Recognition", desc: "Contributes to hospital Magnet designation requirements" },
];

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

export default function HealthcareCertificationsHub() {
  const [filter, setFilter] = useState<"all" | "emergency" | "specialty">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const faqStructuredData = buildFaqStructuredData(FAQ_DATA);

  const emergencyCerts = getCertificationsByCategory("emergency");
  const specialtyCerts = getCertificationsByCategory("specialty");

  const filteredCerts = HEALTHCARE_CERTIFICATIONS.filter(cert => {
    if (filter !== "all" && cert.category !== filter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return cert.name.toLowerCase().includes(q) ||
             cert.fullName.toLowerCase().includes(q) ||
             cert.organization.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div data-testid="page-healthcare-certifications-hub">
      <Navigation />
      <SEO
        title="Healthcare Certifications Database: BLS, ACLS, PALS, CCRN, CEN, OCN & More | NurseNest"
        description="Comprehensive healthcare certification database with detailed guides for BLS, ACLS, PALS, NRP, TNCC, ENPC, CCRN, CEN, OCN, and CMSRN. Eligibility requirements, exam structure, renewal cycles, and study resources."
        keywords="healthcare certifications, nursing certifications, BLS certification, ACLS certification, PALS certification, NRP certification, TNCC certification, ENPC certification, CCRN certification, CEN certification, OCN certification, CMSRN certification, certification database"
        canonicalPath="/healthcare-certifications"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Healthcare Certifications Database",
          "description": "Comprehensive database of healthcare certifications including life support, emergency, and specialty nursing certifications with detailed guides.",
          "provider": { "@type": "Organization", "name": "NurseNest", "url": "https://www.nursenest.ca" },
        }}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "Healthcare Certifications", url: "https://www.nursenest.ca/healthcare-certifications" },
        ]}
        additionalStructuredData={[faqStructuredData]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-700 font-medium">Healthcare Certifications</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-4" data-testid="badge-hub">
              <Award className="w-4 h-4" /> Certification Database
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              Healthcare Certifications Database
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-page-subtitle">
              Your comprehensive resource for healthcare certifications — from life support courses (BLS, ACLS, PALS) to advanced specialty credentials (CCRN, CEN, OCN, CMSRN). Detailed eligibility requirements, exam structures, renewal cycles, and study guidance for each certification.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#certifications" onClick={(e) => { e.preventDefault(); document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200" data-testid="button-browse-certs">
                Browse Certifications <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/nursing-certifications" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors border border-emerald-200" data-testid="button-nursing-certs">
                Nursing Cert Prep Guides
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

      <section className="py-16 bg-gray-50" id="certifications" data-testid="section-certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-certs-heading">All Certifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse our complete database of healthcare certifications. Click any certification for a detailed guide including eligibility, exam structure, renewal cycle, and study resources.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
            <div className="flex gap-2" data-testid="filter-buttons">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-emerald-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                data-testid="button-filter-all"
              >
                All ({HEALTHCARE_CERTIFICATIONS.length})
              </button>
              <button
                onClick={() => setFilter("emergency")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "emergency" ? "bg-emerald-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                data-testid="button-filter-emergency"
              >
                Life Support ({emergencyCerts.length})
              </button>
              <button
                onClick={() => setFilter("specialty")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "specialty" ? "bg-emerald-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                data-testid="button-filter-specialty"
              >
                Specialty ({specialtyCerts.length})
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCerts.map((cert) => {
              const colors = COLOR_MAP[cert.color] || COLOR_MAP.blue;
              const Icon = ICON_MAP[cert.slug] || Activity;
              return (
                <Link key={cert.slug} href={`/healthcare-certifications/${cert.slug}`} className="group" data-testid={`card-cert-${cert.slug}`}>
                  <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-all h-full`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors" data-testid={`text-cert-name-${cert.slug}`}>{cert.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{cert.organization.split('(')[1]?.replace(')', '') || cert.organization.split(' ')[0]}</span>
                        </div>
                        <p className="text-sm text-gray-500">{cert.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {cert.validity}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {cert.cost}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cert.category === "emergency" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                        {cert.category === "emergency" ? "Life Support" : "Specialty"}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                      View Full Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredCerts.length === 0 && (
            <div className="text-center py-12 text-gray-500" data-testid="text-no-results">
              <p>No certifications found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-comparison">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-comparison-heading">Certification Comparison</h2>
            <p className="text-gray-600">Quick overview of all certifications to help you plan your certification journey.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm" data-testid="table-comparison">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-900">Certification</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Organization</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Validity</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Cost</th>
                  <th className="px-4 py-3 font-semibold text-gray-900">Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {HEALTHCARE_CERTIFICATIONS.map((cert, i) => (
                  <tr key={cert.slug} className="hover:bg-gray-50" data-testid={`row-comparison-${cert.slug}`}>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      <div>
                        <span>{cert.name}</span>
                        <p className="text-xs text-gray-400 font-normal">{cert.fullName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cert.category === "emergency" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                        {cert.category === "emergency" ? "Life Support" : "Specialty"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{cert.organization.split('(')[1]?.replace(')', '') || cert.organization}</td>
                    <td className="px-4 py-3 text-gray-600">{cert.validity}</td>
                    <td className="px-4 py-3 text-gray-600">{cert.cost}</td>
                    <td className="px-4 py-3">
                      <Link href={`/healthcare-certifications/${cert.slug}`} className="text-emerald-600 hover:text-emerald-700 font-medium" data-testid={`table-link-${cert.slug}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-study-tools">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid="text-tools-heading">Study Tools for Certification Prep</h2>
            <p className="text-gray-600">Everything you need to prepare for and pass your certification exams.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/free-practice" className="group" data-testid="link-tool-practice">
              <div className="bg-white rounded-xl border border-emerald-100 p-5 hover:shadow-md transition-all h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <ClipboardList className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">Practice Questions</h3>
                <p className="text-xs text-gray-500">Thousands of questions aligned to certification exam blueprints.</p>
              </div>
            </Link>
            <Link href="/flashcards" className="group" data-testid="link-tool-flashcards">
              <div className="bg-white rounded-xl border border-emerald-100 p-5 hover:shadow-md transition-all h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <Layers className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">Flashcards</h3>
                <p className="text-xs text-gray-500">Spaced-repetition decks for algorithms, medications, and key concepts.</p>
              </div>
            </Link>
            <Link href="/lessons" className="group" data-testid="link-tool-lessons">
              <div className="bg-white rounded-xl border border-emerald-100 p-5 hover:shadow-md transition-all h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">Lessons</h3>
                <p className="text-xs text-gray-500">In-depth clinical lessons covering certification content areas.</p>
              </div>
            </Link>
            <Link href="/mock-exams" className="group" data-testid="link-tool-mocks">
              <div className="bg-white rounded-xl border border-emerald-100 p-5 hover:shadow-md transition-all h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">Mock Exams</h3>
                <p className="text-xs text-gray-500">Timed practice exams simulating real certification exam conditions.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-cross-links">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center" data-testid="text-cross-heading">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/nursing-certifications" className="bg-emerald-50 rounded-xl p-6 hover:bg-emerald-100 transition-colors group" data-testid="link-nursing-certs">
              <h3 className="font-semibold text-emerald-900 mb-1 group-hover:text-emerald-700">Nursing Certification Prep</h3>
              <p className="text-sm text-emerald-700/70">Study guides, renewal resources, and practice questions for each certification.</p>
            </Link>
            <Link href="/nursing-specialties" className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors group" data-testid="link-specialties">
              <h3 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">Nursing Specialties</h3>
              <p className="text-sm text-blue-700/70">Explore career guides for critical care, emergency, pediatric, oncology, and more.</p>
            </Link>
            <Link href="/newgrad/certifications" className="bg-violet-50 rounded-xl p-6 hover:bg-violet-100 transition-colors group" data-testid="link-newgrad">
              <h3 className="font-semibold text-violet-900 mb-1 group-hover:text-violet-700">New Grad Certification Guide</h3>
              <p className="text-sm text-violet-700/70">Certification timeline and study strategies for new graduate nurses.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center" data-testid="text-faq-heading">Healthcare Certification FAQs</h2>
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
            Practice questions, flashcards, and study tools aligned to every major healthcare certification exam.
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
