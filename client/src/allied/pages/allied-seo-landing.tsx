import { Link, useRoute } from "wouter";
import { CAREER_CONFIGS } from "@shared/careers";
import {
  ArrowRight, BookOpen, FileText, Brain, Zap, Target,
  CheckCircle2, HelpCircle, ChevronDown, Star, Award,
  BarChart3, Clock, Shield
} from "lucide-react";
import { useState } from "react";

interface SEOPageConfig {
  slug: string;
  careerSlug: string;
  pageType: "practice-questions" | "mock-exam" | "study-guide";
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  sections: { heading: string; content: string }[];
  faqs: { q: string; a: string }[];
}

const SEO_PAGES: SEOPageConfig[] = [
  {
    slug: "pharmacy-technician-practice-questions",
    careerSlug: "pharmacy-tech",
    pageType: "practice-questions",
    title: "Pharmacy Technician Practice Questions | PTCB & ExCPT Prep",
    metaDescription: "Master pharmacy technician certification with 500+ exam-authentic practice questions. 600+ word rationales, adaptive CAT simulation, and weak-area targeting.",
    h1: "Pharmacy Technician Practice Questions",
    heroSubtitle: "Exam-authentic PTCB and ExCPT practice questions with 600+ word rationales that teach you the reasoning behind every answer — not just the correct choice.",
    sections: [
      {
        heading: "Why Our Pharmacy Tech Questions Are Different",
        content: "Most question banks give you a one-sentence explanation. NurseNest Allied provides 600+ word clinical rationales for every single question — covering pharmacology, dosage calculations, compounding, drug interactions, and sterile products. Each rationale walks you through the clinical reasoning so you understand the 'why' behind every answer. Our questions are mapped to the official PTCB and ExCPT exam blueprints, ensuring you study exactly what's tested."
      },
      {
        heading: "Adaptive CAT-Style Question Engine",
        content: "Real certification exams use Computer Adaptive Testing (CAT). Our practice engine simulates this experience by adjusting question difficulty based on your performance. When you answer correctly, difficulty increases. When you struggle, it provides reinforcement questions. This means every practice session is personalized to your current knowledge level — maximizing learning efficiency and preparing you for the actual exam format."
      },
      {
        heading: "Weak-Area Targeting Across All Domains",
        content: "Our AI tracks your performance across every PTCB domain: Pharmacology, Dosage Calculations, Compounding, Drug Interactions, Regulations & Law, Sterile Products, Inventory Management, Patient Safety, Drug Classifications, and Prescription Processing. It identifies where you're struggling and automatically prioritizes those topics, so you spend study time where it matters most."
      },
      {
        heading: "4,000+ Question Roadmap",
        content: "We currently offer 500+ exam-authentic pharmacy technician questions with new questions added regularly. Our roadmap targets 4,000+ questions covering every domain, drug class, and calculation type tested on the PTCB, ExCPT, and PEBC Qualifying exams. Early adopters get access to the full library as it grows — at today's price."
      }
    ],
    faqs: [
      { q: "How many pharmacy technician practice questions are available?", a: "We currently have 500+ exam-authentic questions mapped to the PTCB and ExCPT blueprints, with new questions added weekly. Our roadmap targets 4,000+ questions across all pharmacy domains." },
      { q: "Are the questions aligned with the PTCB exam?", a: "Yes. Every question is mapped to the official PTCB Content Outline, covering all four knowledge areas: Medications, Federal Requirements, Patient Safety and Quality Assurance, and Order Entry and Processing." },
      { q: "What makes the rationales different from other question banks?", a: "Each rationale is 600+ words and teaches you the clinical reasoning — not just 'A is correct because B is wrong.' You'll understand drug mechanisms, calculation methods, and regulatory logic at a deeper level." },
      { q: "Can I practice dosage calculations specifically?", a: "Absolutely. Our question bank includes dedicated dosage calculation questions covering ratios, proportions, dilutions, compounding math, and day supply calculations — all with step-by-step solutions." },
      { q: "Is there a free trial?", a: "Yes! Take our free 15-question diagnostic assessment to see your readiness score and get 5 free practice questions to experience our rationale quality firsthand." },
      { q: "How does the adaptive engine work?", a: "Our CAT-style engine adjusts question difficulty in real-time based on your answers. It simulates the actual exam experience so you're prepared for both the content and format of your certification test." }
    ]
  },
  {
    slug: "pharmacy-technician-mock-exam",
    careerSlug: "pharmacy-tech",
    pageType: "mock-exam",
    title: "Pharmacy Technician Mock Exam | Full-Length PTCB Practice Test",
    metaDescription: "Take a full-length pharmacy technician mock exam with adaptive CAT simulation. Blueprint-weighted, timed practice with detailed performance analytics.",
    h1: "Pharmacy Technician Mock Exam",
    heroSubtitle: "Full-length, blueprint-weighted mock exams that simulate the real PTCB testing experience — including adaptive difficulty, time pressure, and domain-level scoring.",
    sections: [
      {
        heading: "Realistic PTCB Mock Exam Experience",
        content: "Our pharmacy technician mock exams replicate the real PTCB testing environment. Each exam is timed, blueprint-weighted, and uses adaptive CAT-style logic. You'll experience the same question distribution, time pressure, and format as the actual certification exam — so nothing surprises you on test day."
      },
      {
        heading: "Detailed Performance Analytics",
        content: "After completing a mock exam, you receive a comprehensive performance report. See your score breakdown by domain, identify weak areas, and track improvement over time. Our analytics show you exactly where to focus your remaining study time for maximum impact."
      },
      {
        heading: "Blueprint-Weighted Question Distribution",
        content: "Every mock exam follows the official PTCB exam blueprint weighting. Medications make up the largest portion, followed by Federal Requirements, Patient Safety, and Order Entry/Processing — exactly as they appear on the real exam. This ensures your practice reflects actual testing conditions."
      }
    ],
    faqs: [
      { q: "How long is the mock exam?", a: "Our full-length mock exam mirrors the PTCB format with 90 questions in a timed session. We also offer shorter focused practice exams for targeted domain review." },
      { q: "Can I retake the mock exam?", a: "Pro members get unlimited mock exam attempts with different question sets each time. Free users can take one mock exam to experience the format." },
      { q: "How is the mock exam scored?", a: "You receive a scaled score similar to the actual PTCB scoring method, plus a domain-level breakdown showing your strengths and weaknesses across all tested areas." },
      { q: "Does it simulate CAT?", a: "Yes. Our adaptive engine adjusts question difficulty based on your performance throughout the exam, simulating the Computer Adaptive Testing format used by major certification exams." },
      { q: "What happens after I complete the exam?", a: "You get a detailed results page showing your overall score, domain breakdown, time analysis, and personalized recommendations for what to study next." }
    ]
  },
  {
    slug: "pharmacy-technician-study-guide",
    careerSlug: "pharmacy-tech",
    pageType: "study-guide",
    title: "Pharmacy Technician Study Guide | Complete PTCB Prep",
    metaDescription: "Comprehensive pharmacy technician study guide with AI-powered study plans, flashcards, and case simulations. Everything you need to pass the PTCB.",
    h1: "Pharmacy Technician Study Guide",
    heroSubtitle: "A complete, AI-powered study system covering every PTCB domain — from pharmacology and dosage calculations to compounding and drug interactions.",
    sections: [
      {
        heading: "AI-Generated Personalized Study Plans",
        content: "Our AI analyzes your diagnostic results and ongoing performance to create a day-by-day study plan tailored to your timeline and weak areas. Whether you have 2 weeks or 3 months until your exam, the study planner adapts to ensure you cover every domain with appropriate depth."
      },
      {
        heading: "Comprehensive Domain Coverage",
        content: "Our study materials cover every PTCB domain in depth: Pharmacology fundamentals, drug classification systems, dosage calculations, sterile and non-sterile compounding, drug interactions, federal and state regulations, inventory management, patient safety protocols, and prescription processing workflows. Each topic includes detailed explanations, clinical examples, and practice questions."
      },
      {
        heading: "Spaced Repetition Flashcards",
        content: "Master key pharmacy concepts with our spaced repetition flashcard system. Cards automatically resurface at optimal intervals based on how well you know each concept — ensuring long-term retention of drug names, mechanisms, interactions, and calculations."
      },
      {
        heading: "Interactive Case Simulations",
        content: "Go beyond memorization with unfolding case simulations that mirror real pharmacy scenarios. Practice prescription verification, drug interaction checks, dosage calculations in context, and patient counseling situations — building the clinical judgment tested on certification exams."
      }
    ],
    faqs: [
      { q: "How does the AI study plan work?", a: "After you complete the diagnostic assessment, our AI creates a personalized study schedule. It prioritizes your weakest domains, allocates study time based on your exam date, and adjusts daily as your performance improves." },
      { q: "What study materials are included?", a: "Pro members get access to the full question bank, flashcards, mock exams, case simulations, AI study planner, and all interactive tools. Everything you need in one platform." },
      { q: "How are the flashcards organized?", a: "Flashcards are organized by domain and topic. The spaced repetition algorithm tracks which cards you know well and which need more practice, ensuring efficient review sessions." },
      { q: "Can I study on my phone?", a: "Yes! NurseNest Allied is fully responsive and works on any device. Study on your phone during breaks, on your tablet at home, or on your computer at your desk." },
      { q: "How long should I study before taking the PTCB?", a: "Most students use our platform for 4-8 weeks before their exam. The AI study planner will create an optimized schedule based on your timeline and starting knowledge level." }
    ]
  },
  {
    slug: "rrt-practice-questions",
    careerSlug: "rrt",
    pageType: "practice-questions",
    title: "RRT Practice Questions | NBRC TMC & CSE Exam Prep",
    metaDescription: "Master respiratory therapy certification with 500+ RRT practice questions. 600+ word rationales, adaptive CAT simulation, and domain-level weak-area targeting.",
    h1: "RRT Practice Questions",
    heroSubtitle: "Exam-authentic NBRC TMC and CSE practice questions with 600+ word rationales covering ventilator management, ABG analysis, airway management, and every tested domain.",
    sections: [
      {
        heading: "Why Our RRT Questions Stand Out",
        content: "Generic question banks give you a sentence or two of explanation. NurseNest Allied provides 600+ word clinical rationales for every question — covering the pathophysiology, clinical reasoning, and decision-making process behind each answer. Our questions span all NBRC domains: Patient Assessment, Airway Management, Ventilator Management, ABG Interpretation, Neonatal/Pediatric Respiratory, Pharmacology, Diagnostics, Disease Management, Emergency Procedures, and Equipment."
      },
      {
        heading: "Adaptive CAT-Style Practice Engine",
        content: "The NBRC TMC exam uses a scoring algorithm that evaluates your performance across domains. Our adaptive engine simulates this by adjusting question difficulty in real-time based on your answers. You'll experience the same progressive difficulty and domain coverage as the actual exam — building both confidence and competence."
      },
      {
        heading: "AI-Powered Weak-Area Targeting",
        content: "Our AI continuously tracks your performance across all respiratory therapy domains. Struggling with ventilator waveform interpretation? The system automatically serves more ventilator questions until your scores improve. This targeted approach means you spend study time where it has the greatest impact on your overall readiness."
      },
      {
        heading: "Built-In ABG and Ventilator Tools",
        content: "Beyond standard questions, NurseNest Allied includes specialized interactive tools: the ABG Interpretation Engine for practicing arterial blood gas analysis with instant feedback, and the Ventilator Mode Simulator for interactive ventilator settings and waveform analysis. These tools complement the question bank and build the clinical judgment tested on the CSE."
      }
    ],
    faqs: [
      { q: "How many RRT practice questions are available?", a: "We currently have 500+ exam-authentic questions mapped to the NBRC TMC and CSE blueprints, with new questions added regularly. Our roadmap targets 4,000+ questions across all respiratory therapy domains." },
      { q: "Are the questions aligned with the NBRC exam blueprint?", a: "Yes. Every question is mapped to the official NBRC Therapist Multiple-Choice (TMC) examination content outline and the Clinical Simulation Exam (CSE) competency areas." },
      { q: "Do you cover ventilator management questions?", a: "Extensively. Our bank includes questions on all ventilator modes (AC, SIMV, PSV, APRV, HFOV), waveform interpretation, patient-ventilator synchrony, weaning protocols, and troubleshooting — each with detailed rationales." },
      { q: "What about ABG interpretation?", a: "ABG questions cover acid-base disorders, compensation mechanisms, mixed disorders, and clinical correlation. Plus, our dedicated ABG Interpretation Engine provides unlimited practice with instant AI feedback." },
      { q: "Is there a free trial?", a: "Yes! Take our free 15-question diagnostic to see your readiness score, plus get 5 free practice questions to experience the depth of our rationales." },
      { q: "How does weak-area targeting work?", a: "Our AI tracks your accuracy across every NBRC domain. It identifies your weakest areas and automatically prioritizes those topics in your practice sessions and study plan." }
    ]
  },
  {
    slug: "rrt-mock-exam",
    careerSlug: "rrt",
    pageType: "mock-exam",
    title: "RRT Mock Exam | Full-Length NBRC TMC Practice Test",
    metaDescription: "Take a full-length RRT mock exam with adaptive CAT simulation. Blueprint-weighted, timed practice with detailed domain-level performance analytics.",
    h1: "RRT Mock Exam",
    heroSubtitle: "Full-length, blueprint-weighted mock exams simulating the real NBRC TMC testing experience — with adaptive difficulty, realistic timing, and comprehensive scoring.",
    sections: [
      {
        heading: "Authentic NBRC TMC Exam Simulation",
        content: "Our RRT mock exams replicate the actual NBRC TMC testing environment. Each exam features 160 questions (scoring 100 + 60 pretest), realistic time constraints, and blueprint-weighted domain distribution. The adaptive engine adjusts difficulty based on your performance — just like the real exam."
      },
      {
        heading: "Comprehensive Performance Report",
        content: "After completing your mock exam, receive a detailed performance analysis. Your results are broken down by domain — Patient Assessment, Airway Management, Ventilator Management, and more — so you know exactly where to focus. Track your scores over multiple attempts to see improvement trends."
      },
      {
        heading: "CSE-Style Clinical Simulations",
        content: "Prepare for the Clinical Simulation Exam with our unfolding case scenarios. Manage realistic patient cases from initial assessment through treatment decisions, monitoring interpretation, and outcome evaluation. Each simulation tests the same competencies evaluated on the actual CSE."
      }
    ],
    faqs: [
      { q: "How long is the RRT mock exam?", a: "Our full-length mock mirrors the NBRC TMC format. We also offer shorter focused exams for targeted domain review when you want to drill specific areas." },
      { q: "Can I retake mock exams?", a: "Pro members get unlimited mock exam attempts with randomized question selection, so each attempt provides a fresh testing experience." },
      { q: "Does it prepare me for the CSE too?", a: "Yes. In addition to TMC-style mock exams, we include clinical simulation scenarios that mirror the branching, decision-making format of the NBRC Clinical Simulation Exam." },
      { q: "How is the mock exam scored?", a: "You receive both an overall score and domain-level breakdown. We indicate whether your performance meets the cut-score threshold, giving you a realistic assessment of exam readiness." },
      { q: "What should I do after the mock exam?", a: "Review your domain breakdown and use the AI study planner to create a targeted review plan focusing on your weakest areas before your next attempt or your actual exam." }
    ]
  },
  {
    slug: "rrt-study-guide",
    careerSlug: "rrt",
    pageType: "study-guide",
    title: "RRT Study Guide | Complete Respiratory Therapy Exam Prep",
    metaDescription: "Comprehensive RRT study guide with AI study plans, flashcards, ABG engine, and ventilator simulator. Everything you need to pass the NBRC TMC and CSE.",
    h1: "RRT Study Guide",
    heroSubtitle: "A complete, AI-powered study system for respiratory therapy certification — covering ventilator management, ABG analysis, airway management, and every NBRC domain.",
    sections: [
      {
        heading: "AI-Generated Personalized Study Plans",
        content: "Our AI builds a day-by-day study plan based on your diagnostic results, exam date, and performance trends. It allocates more time to your weak domains and adjusts daily as you improve. Whether you have 2 weeks or 3 months, you'll have a clear path to exam readiness."
      },
      {
        heading: "Complete NBRC Domain Coverage",
        content: "Study materials cover every tested domain: Patient Assessment techniques, Airway Management procedures, Ventilator Management principles, ABG Interpretation mastery, Neonatal and Pediatric Respiratory care, respiratory Pharmacology, Diagnostic procedures, Disease Management protocols, Emergency Procedures, and Equipment operation and troubleshooting."
      },
      {
        heading: "Interactive ABG & Ventilator Tools",
        content: "Our dedicated ABG Interpretation Engine lets you practice unlimited blood gas analysis with instant AI feedback. The Ventilator Mode Simulator provides interactive ventilator settings and waveform analysis — building the clinical judgment that sets top scores apart on the CSE."
      },
      {
        heading: "Spaced Repetition & Flashcards",
        content: "Master critical respiratory therapy concepts with our spaced repetition system. Flashcards cover drug dosages, ventilator settings, ABG values, equipment parameters, and disease pathophysiology — resurfacing at optimal intervals for long-term retention."
      }
    ],
    faqs: [
      { q: "How does the AI study plan work?", a: "Complete the diagnostic assessment, and our AI creates a personalized schedule targeting your weak domains first. It adjusts daily based on your progress and time until your exam." },
      { q: "What study materials are included?", a: "Pro includes the full question bank (500+ questions), flashcards, mock exams, ABG engine, ventilator simulator, case simulations, and AI study planner — everything in one platform." },
      { q: "Can I use the ABG engine for unlimited practice?", a: "Yes. Pro members get unlimited access to the ABG Interpretation Engine, with AI-generated cases covering simple disorders, mixed acid-base problems, and compensation analysis." },
      { q: "How long should I study for the NBRC TMC?", a: "Most students use our platform for 6-10 weeks before the TMC exam. The AI study planner optimizes your schedule based on your starting level and exam date." },
      { q: "Is the study guide mobile-friendly?", a: "Absolutely. Study on any device — phone, tablet, or computer. Your progress syncs across all devices automatically." }
    ]
  }
];

function getPageBySlug(slug: string): SEOPageConfig | undefined {
  return SEO_PAGES.find(p => p.slug === slug);
}

function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3" data-testid="seo-faq-section">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            data-testid={`faq-toggle-${i}`}
          >
            <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed" data-testid={`faq-answer-${i}`}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PageTypeIcon({ type }: { type: SEOPageConfig["pageType"] }) {
  switch (type) {
    case "practice-questions": return <BookOpen className="w-6 h-6" />;
    case "mock-exam": return <FileText className="w-6 h-6" />;
    case "study-guide": return <Brain className="w-6 h-6" />;
  }
}

export default function AlliedSeoLandingPage({ pageSlug }: { pageSlug: string }) {
  const page = getPageBySlug(pageSlug);

  if (!page) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-page-not-found">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <Link href="/careers" className="text-teal-600 font-medium hover:underline" data-testid="link-browse-careers">Browse All Careers</Link>
      </div>
    );
  }

  const career = Object.values(CAREER_CONFIGS).find(c => c.slug === page.careerSlug);

  return (
    <div data-testid={`seo-landing-${page.slug}`}>
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-teal-300 mb-6">
            <PageTypeIcon type={page.pageType} />
            <span>{career?.name || "Allied Health"}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" data-testid="text-seo-h1">
            {page.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed" data-testid="text-seo-subtitle">
            {page.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/diagnostic?career=${page.careerSlug}`}
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors"
              data-testid="button-start-diagnostic"
            >
              Start Free Diagnostic
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors border border-white/20"
              data-testid="link-view-pricing"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: BookOpen, label: "500+ Questions", sub: "Exam-authentic" },
              { icon: Target, label: "Weak-Area AI", sub: "Domain targeting" },
              { icon: BarChart3, label: "Performance", sub: "Detailed analytics" },
              { icon: Clock, label: "CAT Engine", sub: "Adaptive difficulty" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2" data-testid={`stat-${i}`}>
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-900">{stat.label}</span>
                <span className="text-sm text-gray-500">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {page.sections.map((section, i) => (
            <div key={i} data-testid={`content-section-${i}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.heading}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">NurseNest Allied vs Generic Question Banks</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">See why students choose NurseNest Allied for serious exam preparation.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" data-testid="comparison-table">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase">Feature</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-teal-600 uppercase">NurseNest Allied</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase">Generic Banks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Rationale Depth", allied: "600+ words per question", generic: "1–2 sentence explanation" },
                  { feature: "Exam Simulation", allied: "Adaptive CAT-style engine", generic: "Static linear exams" },
                  { feature: "Weak-Area Targeting", allied: "AI identifies & drills weak domains", generic: "Random question order" },
                  { feature: "Question Volume", allied: "4,000+ questions roadmap", generic: "Limited static bank" },
                  { feature: "Blueprint Alignment", allied: "Mapped to official blueprint", generic: "Generic topic coverage" },
                  { feature: "Study Planning", allied: "AI-generated personalized schedule", generic: "Self-directed only" },
                  { feature: "Interactive Tools", allied: "Career-specific AI tools", generic: "Not available" },
                  { feature: "Performance Analytics", allied: "Domain-level trends", generic: "Basic score only" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm">{row.feature}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="flex items-center gap-2 text-teal-700">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        {row.allied}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Studying?</h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">Choose the plan that fits your timeline. Start free, upgrade when you're ready.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-sm text-teal-200 mb-1">Monthly</p>
                <p className="text-3xl font-bold">$29<span className="text-sm font-normal text-teal-200">/mo</span></p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/40 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-0.5 rounded-full">BEST VALUE</span>
                <p className="text-sm text-teal-200 mb-1">Annual</p>
                <p className="text-3xl font-bold">$239<span className="text-sm font-normal text-teal-200">/yr</span></p>
                <p className="text-xs text-teal-200">Save 31%</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/diagnostic?career=${page.careerSlug}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-colors"
                data-testid="button-pricing-diagnostic"
              >
                Start Free Diagnostic
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/40 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                data-testid="link-pricing-page"
              >
                See Full Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <HelpCircle className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={page.faqs} />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href={`/qbank?career=${page.careerSlug}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-qbank"
            >
              <BookOpen className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Question Bank</p>
                <p className="text-xs text-gray-500">Practice with rationales</p>
              </div>
            </Link>
            <Link
              href={`/careers/${page.careerSlug}/mock-exams`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-mock-exams"
            >
              <FileText className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Mock Exams</p>
                <p className="text-xs text-gray-500">Full-length practice tests</p>
              </div>
            </Link>
            <Link
              href={`/diagnostic?career=${page.careerSlug}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-diagnostic"
            >
              <Target className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Free Diagnostic</p>
                <p className="text-xs text-gray-500">15-question assessment</p>
              </div>
            </Link>
            <Link
              href={`/careers/${page.careerSlug}/flashcards`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-flashcards"
            >
              <Brain className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Flashcards</p>
                <p className="text-xs text-gray-500">Spaced repetition</p>
              </div>
            </Link>
            <Link
              href={`/careers/${page.careerSlug}/study-plan`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-study-plan"
            >
              <Award className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Study Planner</p>
                <p className="text-xs text-gray-500">AI-generated schedule</p>
              </div>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
              data-testid="link-internal-pricing"
            >
              <Star className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Pricing</p>
                <p className="text-xs text-gray-500">Plans & features</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { SEO_PAGES, getPageBySlug };
export type { SEOPageConfig };
