import { Link } from "wouter";
import { useState, useEffect } from "react";
import { BookOpen, Brain, FileText, GraduationCap, ChevronRight, Pill, CheckCircle2, ArrowRight, HelpCircle, Sparkles, Target, Clock } from "lucide-react";
import { AlliedSEO } from "@/allied/allied-seo";

const TOPIC_CARDS = [
  { title: "Pharmacology & Drug Classifications", slug: "drug-classes", desc: "Top 200 drugs, brand/generic names, drug classes, mechanisms of action, and therapeutic uses", icon: Pill, href: "/pharmacy-technician/drug-classes" },
  { title: "Dosage Calculations", slug: "dosage-calculations", desc: "Unit conversions, concentration calculations, drip rates, pediatric dosing, and compounding math", icon: Target },
  { title: "Pharmacy Law & Regulations", slug: "pharmacy-law", desc: "DEA schedules, HIPAA, state and federal regulations, record keeping, and controlled substances", icon: FileText },
  { title: "Sterile & Non-Sterile Compounding", slug: "compounding", desc: "USP 795/797/800, beyond-use dating, aseptic technique, hazardous drug handling", icon: Sparkles },
  { title: "Prescription Processing", slug: "prescription-processing", desc: "Interpreting prescriptions, sig codes, DAW codes, insurance billing, prior authorizations", icon: BookOpen },
  { title: "Patient Safety & Quality Assurance", slug: "patient-safety", desc: "Medication errors, look-alike/sound-alike drugs, tall man lettering, adverse effects reporting", icon: CheckCircle2 },
];

const FAQ_DATA = [
  { q: "What is the PTCB exam?", a: "The Pharmacy Technician Certification Board (PTCB) exam is a nationally recognized certification for pharmacy technicians. It covers pharmacology, pharmacy law, sterile and non-sterile compounding, medication safety, and pharmacy operations." },
  { q: "How many questions are on the PTCB exam?", a: "The PTCB exam has 90 multiple-choice questions, 80 of which are scored. You have 2 hours to complete the exam. A passing score is 1400 out of 1600." },
  { q: "What topics does NurseNest Allied cover for pharmacy technicians?", a: "Our platform covers all PTCB and ExCPT exam domains including pharmacology, dosage calculations, pharmacy law, compounding, prescription processing, and patient safety with 200+ practice questions, flashcards, and full-length practice exams." },
  { q: "How is this different from other pharmacy tech study resources?", a: "NurseNest Allied provides detailed rationales for every question, spaced-repetition flashcards, timed practice exams that mimic real testing conditions, and a structured study guide covering every exam topic in depth." },
  { q: "Can I study for free?", a: "Yes! Free users get access to lesson previews, a limited number of practice questions, and sample flashcard decks. Upgrade to Allied Pro for unlimited access to all content." },
];

export default function PharmtechHubPage() {
  const [stats, setStats] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pharmtech/stats").then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <>
      <AlliedSEO
        title="Pharmacy Technician Exam Prep - PTCB & ExCPT Study Resources"
        description="Prepare for the PTCB and ExCPT pharmacy technician certification exams with 200+ practice questions, flashcard decks, full-length practice exams, and a comprehensive study guide. Free to start."
        keywords="pharmacy technician exam prep, PTCB exam, ExCPT exam, pharmacy tech practice questions, pharmacy technician certification, pharmacy tech study guide, pharmacy tech flashcards"
        canonicalPath="/pharmacy-technician"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Pharmacy Technician Certification Prep",
          description: "Comprehensive PTCB and ExCPT exam preparation with practice questions, flashcards, and study tools.",
          provider: { "@type": "Organization", name: "NurseNest Allied", url: "https://allied.nursenest.ca" },
        }}
        additionalStructuredData={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_DATA.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "NurseNest Allied", item: "https://allied.nursenest.ca" },
              { "@type": "ListItem", position: 2, name: "Pharmacy Technician", item: "https://allied.nursenest.ca/pharmacy-technician" },
            ],
          },
        ]}
      />

      <div data-testid="pharmtech-hub-page">
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600">Allied</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-green-700 font-medium">Pharmacy Technician</span>
            </div>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                <Pill className="w-4 h-4" />
                PTCB · ExCPT · PEBC Prep
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4" data-testid="text-hero-title">
                Pharmacy Technician<br />
                <span className="text-green-600">Exam Prep Hub</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
                Master every domain of the PTCB and ExCPT exams with expert-written lessons, practice questions with detailed rationales, spaced-repetition flashcards, and timed practice exams.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/pharmacy-technician/lessons" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 shadow-lg shadow-green-200 transition-all" data-testid="button-start-learning">
                  <GraduationCap className="w-4 h-4" /> Start Learning Free
                </Link>
                <Link href="/pharmacy-technician/practice-questions" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl text-sm font-semibold border border-green-200 hover:bg-green-50 transition-all" data-testid="button-practice-questions">
                  <BookOpen className="w-4 h-4" /> Practice Questions
                </Link>
                <Link href="/pharmacy-technician/practice-exam-questions" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl text-sm font-semibold border border-green-200 hover:bg-green-50 transition-all" data-testid="button-practice-exam-questions">
                  <FileText className="w-4 h-4" /> Practice Exam Questions
                </Link>
              </div>
            </div>
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-12">
                {[
                  { label: "Lessons", value: stats.lessonCount || 0 },
                  { label: "Flashcard Decks", value: stats.deckCount || 0 },
                  { label: "Flashcards", value: stats.flashcardCount || 0 },
                  { label: "Questions", value: stats.questionCount || 0 },
                  { label: "Practice Exams", value: stats.examCount || 0 },
                ].map(s => (
                  <div key={s.label} className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border border-green-100" data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="text-2xl font-bold text-green-700">{s.value}</div>
                    <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Topics</h2>
          <p className="text-gray-500 mb-8">Explore all the domains covered on the PTCB and ExCPT certification exams.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPIC_CARDS.map(topic => (
              <Link key={topic.slug} href={(topic as any).href || "/pharmacy-technician/study-guide"} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-green-200 transition-all" data-testid={`card-topic-${topic.slug}`}>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <topic.icon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/pharmacy-technician/flashcards" className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-green-200 transition-all" data-testid="card-flashcards">
                <Brain className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Flashcard Decks</h3>
                <p className="text-sm text-gray-500 mb-4">Master key pharmacy concepts with spaced-repetition flashcards organized by topic.</p>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Decks <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/pharmacy-technician/exams" className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-green-200 transition-all" data-testid="card-exams">
                <FileText className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Practice Exams</h3>
                <p className="text-sm text-gray-500 mb-4">Take timed practice exams that simulate real PTCB testing conditions with score reports.</p>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Exams <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/pharmacy-technician/study-guide" className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-green-200 transition-all" data-testid="card-study-guide">
                <GraduationCap className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Study Guide</h3>
                <p className="text-sm text-gray-500 mb-4">Comprehensive study guide covering every pharmacy technician exam topic in detail.</p>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-gray-500 mb-8 text-center">Common questions about our Pharmacy Technician exam prep resources.</p>
          <div className="space-y-3" data-testid="faq-section">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-medium text-gray-900 text-sm">{faq.q}</span>
                  <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-transform ${openFaq === i ? "text-green-600 rotate-180" : "text-gray-400"}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Start Studying?</h2>
            <p className="text-green-100 mb-8">Join thousands of pharmacy technician students using NurseNest Allied to pass their certification exams.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/pharmacy-technician/lessons" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl text-sm font-semibold hover:bg-green-50 transition-all" data-testid="button-cta-start">
                <GraduationCap className="w-4 h-4" /> Start Free
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl text-sm font-semibold hover:bg-green-800 border border-green-500 transition-all" data-testid="button-cta-pricing">
                <Sparkles className="w-4 h-4" /> View Plans
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
