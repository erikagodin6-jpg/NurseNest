import { Link } from "wouter";
import { useState, useEffect } from "react";
import { BookOpen, Brain, FileText, GraduationCap, ChevronRight, Activity, CheckCircle2, ArrowRight, HelpCircle, Sparkles, Target, Clock, Calendar, BarChart3, Play, Zap, Heart } from "lucide-react";
import { AlliedSEO } from "@/allied/allied-seo";

const TOPIC_CARDS = [
  { title: "Musculoskeletal Rehabilitation", slug: "musculoskeletal-rehab", desc: "Orthopedic conditions, joint replacements, fracture management, soft tissue injuries, and manual therapy techniques", icon: Activity },
  { title: "Joint Mobilization & Manual Therapy", slug: "joint-mobilization", desc: "Maitland grades, joint mobilization techniques, soft tissue mobilization, and therapeutic stretching", icon: Target },
  { title: "Gait Training & Analysis", slug: "gait-training", desc: "Normal and pathological gait patterns, assistive devices, balance training, and fall prevention strategies", icon: Play },
  { title: "Sports Injury Rehabilitation", slug: "sports-injury-rehab", desc: "ACL reconstruction rehab, rotator cuff protocols, concussion management, and return-to-sport criteria", icon: Zap },
  { title: "Neurological Rehabilitation", slug: "neurological-rehab", desc: "Stroke recovery, spinal cord injury, TBI management, Parkinson's disease, and neurodevelopmental approaches", icon: Brain },
  { title: "Cardiopulmonary Physical Therapy", slug: "cardiopulmonary", desc: "Cardiac rehabilitation, pulmonary conditions, exercise prescription, and vital sign monitoring", icon: Heart },
];

const FAQ_DATA = [
  { q: "What is the NPTE exam?", a: "The NPTE (National Physical Therapy Examination) is the primary licensing exam for physical therapists in the United States. Administered by the FSBPT, it consists of 250 questions (200 scored + 50 pretest) with a 5-hour time limit covering musculoskeletal, neuromuscular, cardiopulmonary, and integumentary systems." },
  { q: "What is the PCE exam?", a: "The PCE (Physiotherapy Competency Examination) is the Canadian licensing exam for physiotherapists, administered by the Canadian Alliance of Physiotherapy Regulators (CAPR). It has both a written component and a clinical component testing clinical reasoning and practical skills." },
  { q: "What topics does NurseNest Allied cover for physical therapy?", a: "Our platform covers all NPTE and PCE exam domains including musculoskeletal, neuromuscular, cardiopulmonary, integumentary systems, biomechanics & kinesiology, therapeutic exercise, patient education, discharge planning, and evidence-based practice." },
  { q: "How is this different from other PT study resources?", a: "NurseNest Allied provides detailed clinical rationales for every question, differential diagnosis training with realistic patient presentations, gait analysis simulations, spaced-repetition flashcards, and timed practice exams that mimic real testing conditions." },
  { q: "Can I study for free?", a: "Yes! Free users get access to lesson previews, a limited number of practice questions, and sample flashcard decks. Upgrade to Allied Pro for unlimited access to all PT content." },
];

export default function PhysicalTherapyHubPage() {
  const [stats, setStats] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/physical-therapy/stats").then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <>
      <AlliedSEO
        title="Physical Therapy Exam Prep - NPTE & PCE Study Resources"
        description="Prepare for the NPTE and PCE physical therapy licensing exams with practice questions, differential diagnosis training, flashcard decks, full-length practice exams, and a comprehensive study guide. Free to start."
        keywords="physical therapy exam prep, NPTE exam, PCE exam, PT practice questions, physical therapy certification, PT study guide, PT flashcards, physiotherapy licensing, FSBPT exam"
        canonicalPath="/physical-therapy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Physical Therapy Certification Prep",
          description: "Comprehensive NPTE and PCE exam preparation with practice questions, flashcards, and study tools.",
          provider: { "@type": "Organization", name: "NurseNest Allied", url: "https://www.nursenest.ca/allied-health" },
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
              { "@type": "ListItem", position: 1, name: "NurseNest Allied", item: "https://www.nursenest.ca/allied-health" },
              { "@type": "ListItem", position: 2, name: "Physical Therapy", item: "https://www.nursenest.ca/allied-health/physical-therapy" },
            ],
          },
        ]}
      />

      <div data-testid="pt-hub-page">
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600" data-testid="link-breadcrumb-home">Allied</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-teal-700 font-medium">Physical Therapy</span>
            </div>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
                <Activity className="w-4 h-4" />
                NPTE · PCE Prep
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4" data-testid="text-hero-title">
                Physical Therapy<br />
                <span className="text-teal-600">Exam Prep Hub</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
                Master every domain of the NPTE and PCE exams with expert-written lessons, practice questions with detailed rationales, spaced-repetition flashcards, and timed practice exams.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/physical-therapy/lessons" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all" data-testid="button-start-learning">
                  <GraduationCap className="w-4 h-4" /> Start Learning Free
                </Link>
                <Link href="/physical-therapy/practice-questions" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-xl text-sm font-semibold border border-teal-200 hover:bg-teal-50 transition-all" data-testid="button-practice-questions">
                  <BookOpen className="w-4 h-4" /> Practice Questions
                </Link>
              </div>
            </div>
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
                {[
                  { label: "Lessons", value: stats.lessonCount || 0 },
                  { label: "Flashcards", value: stats.flashcardCount || 0 },
                  { label: "Questions", value: stats.questionCount || 0 },
                  { label: "Practice Exams", value: stats.examCount || 0 },
                ].map(s => (
                  <div key={s.label} className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border border-teal-100" data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="text-2xl font-bold text-teal-700">{s.value}</div>
                    <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Topics</h2>
          <p className="text-gray-500 mb-8">Explore all the domains covered on the NPTE and PCE certification exams.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPIC_CARDS.map(topic => (
              <Link key={topic.slug} href="/physical-therapy/study-guide" className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-teal-200 transition-all" data-testid={`card-topic-${topic.slug}`}>
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                  <topic.icon className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/physical-therapy/flashcards" className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-teal-200 transition-all" data-testid="card-flashcards">
                <Brain className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Flashcard Decks</h3>
                <p className="text-sm text-gray-500 mb-4">Master key PT concepts with spaced-repetition flashcards organized by system.</p>
                <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Decks <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/physical-therapy/mock-exam" className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-teal-200 transition-all" data-testid="card-exams">
                <FileText className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Practice Exams</h3>
                <p className="text-sm text-gray-500 mb-4">Take timed practice exams that simulate real NPTE testing conditions with score reports.</p>
                <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Exams <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/physical-therapy/study-guide" className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-teal-200 transition-all" data-testid="card-study-guide">
                <GraduationCap className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Study Guide</h3>
                <p className="text-sm text-gray-500 mb-4">Comprehensive study guide covering every physical therapy exam topic in detail.</p>
                <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/physical-therapy/lessons" className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-teal-200 transition-all" data-testid="card-lessons">
                <BookOpen className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lessons</h3>
                <p className="text-sm text-gray-500 mb-4">Expert-written lessons covering musculoskeletal, neurological, and cardiopulmonary PT.</p>
                <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start Lessons <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-gray-500 mb-8 text-center">Common questions about our Physical Therapy exam prep resources.</p>
          <div className="space-y-3" data-testid="faq-section">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-medium text-gray-900 text-sm">{faq.q}</span>
                  <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-transform ${openFaq === i ? "text-teal-600 rotate-180" : "text-gray-400"}`} />
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

        <section className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Start Studying?</h2>
            <p className="text-teal-100 mb-8">Join physical therapy students using NurseNest Allied to pass their NPTE and PCE certification exams.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/physical-therapy/lessons" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 rounded-xl text-sm font-semibold hover:bg-teal-50 transition-all" data-testid="button-cta-start">
                <GraduationCap className="w-4 h-4" /> Start Free
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-xl text-sm font-semibold hover:bg-teal-800 border border-teal-500 transition-all" data-testid="button-cta-pricing">
                <Sparkles className="w-4 h-4" /> View Plans
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
