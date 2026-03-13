import { useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { buildFaqStructuredData } from "@/lib/structured-data";
import { PROFESSION_LIST } from "@/pages/new-grad/profession-data";
import {
  ArrowRight, BookOpen, FileText, Brain, Zap, GraduationCap,
  CheckCircle2, ChevronRight, Check, X, HelpCircle,
  Briefcase, ClipboardList, Heart, Shield, Users, Clock,
  AlertTriangle, MessageSquare, Award, Target, Lightbulb,
  Star, TrendingUp, ChevronDown
} from "lucide-react";

const PAIN_POINTS = [
  { icon: Brain, title: "Imposter Syndrome", desc: "Feeling like you don't belong and that everyone else knows more than you do." },
  { icon: AlertTriangle, title: "Interview Anxiety", desc: "Dreading behavioral questions and not knowing how to structure your answers." },
  { icon: FileText, title: "Resume Black Holes", desc: "Submitting dozens of applications and hearing absolutely nothing back." },
  { icon: Heart, title: "First Code Blue Panic", desc: "The terrifying gap between simulation lab and your first real emergency." },
  { icon: Users, title: "Preceptor Navigation", desc: "Learning how to work with different teaching styles and build professional relationships." },
  { icon: Clock, title: "Time Management Overload", desc: "Juggling new-grad orientation, charting, and patient care without drowning." },
];

const MODULES = [
  { icon: MessageSquare, title: "Interview Lab", desc: "100+ behavioral and clinical interview questions with STAR framework answers and nurse manager insights.", link: "/new-grad#interview-lab" },
  { icon: FileText, title: "Resume Builder", desc: "Nursing-specific resume templates that pass ATS systems and highlight clinical rotations effectively.", link: "/new-grad#resume-builder" },
  { icon: ClipboardList, title: "Cover Letter Generator", desc: "Customizable cover letter frameworks for med-surg, ICU, ER, L&D, peds, and specialty units.", link: "/new-grad#cover-letter" },
  { icon: Target, title: "First 90 Days Roadmap", desc: "Week-by-week survival guide from orientation through independent practice with milestone checklists.", link: "/new-grad#first-90-days" },
  { icon: Shield, title: "Clinical Confidence Builder", desc: "Quick-reference clinical decision guides, medication checklists, and shift preparation tools.", link: "/new-grad#clinical-confidence" },
];

const INTERVIEW_CATEGORIES = [
  "Behavioral (STAR format)",
  "Clinical scenario questions",
  "Conflict resolution",
  "Time management / prioritization",
  "Teamwork & delegation",
  "Patient safety & error prevention",
];

const RESUME_MUSTS = [
  "Clinical rotation hours & settings",
  "Skills checklist (IVs, foleys, NG tubes)",
  "Certifications (BLS, ACLS, PALS)",
  "Quantifiable achievements",
  "ATS-optimized formatting",
  "Tailored objective statement",
];

const SAMPLE_QUESTIONS = [
  {
    question: "Tell me about a time you had to advocate for a patient.",
    situation: "During my final clinical rotation on a medical unit, I was assigned a 72-year-old patient with CHF who was experiencing increasing shortness of breath and anxiety. The attending physician had not yet rounded, and the patient's oxygen saturation was trending downward.",
    task: "I needed to ensure the patient received timely intervention while working within my scope as a nursing student and following the chain of command.",
    action: "I performed a focused respiratory assessment, documented my findings, and contacted the charge nurse with a structured SBAR report. I also stayed with the patient, elevated the HOB, and provided reassurance while we waited for the physician callback.",
    result: "The physician ordered a stat chest X-ray and diuretic adjustment within 20 minutes. The patient's SpO2 improved from 89% to 95% within the hour. My preceptor noted my assessment skills and communication in my evaluation.",
  },
  {
    question: "Describe a situation where you made a mistake. How did you handle it?",
    situation: "During my third clinical rotation, I was preparing medications for a patient and nearly administered the wrong dose of metoprolol. I caught the error during my final rights check before administration.",
    task: "I needed to address the near-miss, ensure patient safety, and follow proper reporting protocols.",
    action: "I immediately stopped, rechecked the MAR, consulted with my preceptor, and prepared the correct dose. I then voluntarily filed an incident report documenting the near-miss and participated in a debrief with my clinical instructor.",
    result: "The patient received the correct medication safely. My transparency led to a unit-wide discussion about medication safety checks, and my instructor praised my honesty and commitment to patient safety culture.",
  },
];

const JOB_SEARCH_MISTAKES = [
  { title: "Using a Generic Resume", desc: "Nurse managers scan resumes for 6 seconds. If your clinical hours, certifications, and skills aren't immediately visible, you're filtered out. Tailor every resume to the unit." },
  { title: "Not Preparing for Behavioral Questions", desc: "\"Tell me about a time...\" questions make up 70% of nursing interviews. Without STAR-formatted stories ready, you'll ramble and lose the interviewer." },
  { title: "Applying Only to Dream Units", desc: "New grads who only apply to ICU or ER miss dozens of opportunities. Med-surg and step-down units build the strongest clinical foundation." },
  { title: "Skipping the Thank-You Email", desc: "A personalized thank-you within 24 hours makes you memorable. Reference something specific from the interview to stand out." },
  { title: "Not Networking Before Graduation", desc: "80% of nursing jobs come through connections. Attend career fairs, connect with preceptors on LinkedIn, and join professional organizations early." },
];

const COMPARISON_DATA = [
  { feature: "Interview Prep", nursenest: true, self: false },
  { feature: "Resume Review & Templates", nursenest: true, self: false },
  { feature: "Cover Letter Frameworks", nursenest: true, self: false },
  { feature: "First 90 Days Guide", nursenest: true, self: false },
  { feature: "Clinical Quick References", nursenest: true, self: false },
  { feature: "Mentor Access & Community", nursenest: true, self: false },
  { feature: "STAR Framework Training", nursenest: true, self: false },
  { feature: "ATS Optimization Tips", nursenest: true, self: false },
];

const FAQ_DATA = [
  { question: "Is this for Canadian or American nurses?", answer: "Both! Our interview prep, resume templates, and career transition content is designed for new graduate nurses in both Canada and the United States. We cover region-specific licensing requirements, job search strategies, and employer expectations for both countries." },
  { question: "Do I need this if I already have a job?", answer: "Absolutely. The First 90 Days Roadmap and Clinical Confidence Builder are specifically designed for nurses who have already landed their first position. These tools help you navigate orientation, build confidence during your transition period, and set yourself up for long-term success." },
  { question: "What if I'm an Internationally Educated Nurse (IEN)?", answer: "We include specific resources for IENs including bridging program guidance, credential evaluation tips, interview preparation for common IEN-specific questions, and cultural workplace navigation strategies for both Canadian and American healthcare systems." },
  { question: "How is this different from YouTube or free resources?", answer: "Free resources are scattered and generic. NurseNest provides a structured, sequential program with nursing-specific STAR framework training, ATS-optimized resume templates tested with actual healthcare recruiters, and interview questions sourced from real nurse manager hiring panels." },
  { question: "Can I use this while still in nursing school?", answer: "Yes! We recommend starting 3-6 months before graduation. Begin with resume building and interview prep during your final semester so you're ready to apply the moment you pass your licensing exam." },
  { question: "What types of interview questions are included?", answer: "We cover behavioral questions (STAR format), clinical scenario questions, conflict resolution, time management and prioritization, teamwork and delegation, patient safety, and unit-specific questions for med-surg, ICU, ER, L&D, pediatrics, and more." },
  { question: "Are the resume templates ATS-compatible?", answer: "Yes. Every template has been tested against major Applicant Tracking Systems used by hospital networks including HCA, Kaiser, Providence, and major Canadian health authorities. We show you exactly how to format your resume so it doesn't get filtered out." },
  { question: "How long does the First 90 Days program take?", answer: "The roadmap spans your first 90 days on the job with weekly milestones. Each week includes specific goals, reflection prompts, and clinical checklists. Most new grads spend 15-20 minutes per week reviewing their progress and preparing for the week ahead." },
  { question: "Is there a money-back guarantee?", answer: "Yes. We offer a 14-day money-back guarantee. If you don't find value in the interview prep, resume tools, or career transition resources within the first two weeks, we'll refund your subscription — no questions asked." },
  { question: "What's included in the free tier?", answer: "Free users get access to 5 sample interview questions with STAR framework answers, 1 resume template, the readiness quiz, and selected articles from our career transition blog. Upgrade to unlock 100+ interview questions, all templates, and the complete First 90 Days Roadmap." },
  { question: "Do you offer group discounts for nursing cohorts?", answer: "Yes! We offer group pricing for nursing programs, cohorts, and student organizations. Contact us for custom pricing based on group size. Many nursing schools integrate our career prep tools into their final semester curriculum." },
  { question: "How often is new content added?", answer: "We add new interview questions, resume tips, and career resources weekly. Our content team includes experienced nurse managers and healthcare recruiters who provide real-world insights into current hiring trends and expectations." },
];

const faqStructuredData = buildFaqStructuredData(
  FAQ_DATA.map(f => ({ question: f.question, answer: f.answer }))
);

const courseStructuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "New Grad RN Transition Hub",
  "description": "Master your nursing career transition with interview prep, resume builder, cover letter tools, and first 90 days survival guide. Built for new graduate RNs.",
  "provider": {
    "@type": "Organization",
    "name": "NurseNest",
    "url": "https://www.nursenest.ca",
  },
  "educationalLevel": "New Graduate Nurse",
  "about": "Nursing Career Transition",
  "inLanguage": "en",
  "url": "https://www.nursenest.ca/new-grad",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT10H",
  },
};

export default function NewGradHub() {
  return (
    <div data-testid="new-grad-hub-page">
      <Navigation />
      <SEO
        title="New Grad Hub - Career Launch Platform for Healthcare Professionals | NurseNest"
        description="Career transition resources for new graduate healthcare professionals. Nursing, paramedic, respiratory therapy, MLT, diagnostic imaging, and occupational therapy career guides, exam prep, and first-year survival tools."
        keywords="new grad healthcare, new graduate nurse, new grad paramedic, new grad respiratory therapist, new grad MLT, new grad imaging, new grad occupational therapy, healthcare career transition, first year healthcare professional"
        canonicalPath="/new-grad"
        structuredData={courseStructuredData}
        additionalStructuredData={[faqStructuredData]}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Hub", url: "https://www.nursenest.ca/new-grad" },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">New Grad Hub</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-700" data-testid="badge-career-launch">
              <GraduationCap className="w-4 h-4" />
              Career Launch Platform
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-hero-title">
              Your First Year in Healthcare, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Mastered</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-hero-subtitle">
              Bridge the gap between school and confident clinical practice. Career resources, exam prep, interview tools, and first-year survival guides for nursing and allied health professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/new-grad/readiness-quiz" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200" data-testid="button-readiness-quiz">
                Take Free Readiness Quiz <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/new-grad#professions" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors border border-blue-200" data-testid="button-explore-professions">
                Explore Your Profession
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="professions" data-testid="section-profession-hubs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-professions-title">Choose Your Profession</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Specialized career transition resources for six healthcare professions. Each hub includes first-year guides, exam prep, clinical tips, and career development tools.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROFESSION_LIST.map((prof) => {
              const PIcon = prof.icon;
              return (
                <Link key={prof.slug} href={`/new-grad/${prof.slug}`} className="group" data-testid={`card-profession-${prof.slug}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all h-full">
                    <div className={`w-12 h-12 rounded-xl ${prof.badgeColor} flex items-center justify-center mb-4`}>
                      <PIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{prof.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{prof.heroSubtitle}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prof.certifications.slice(0, 3).map((cert, ci) => (
                        <span key={ci} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{cert}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium">
                      Explore Hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100" data-testid="section-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-interview-questions">
              <div className="text-2xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-500">Interview Questions</div>
            </div>
            <div data-testid="stat-resume-templates">
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-500">Resume Templates</div>
            </div>
            <div data-testid="stat-career-modules">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-500">Career Modules</div>
            </div>
            <div data-testid="stat-confidence-score">
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-500">Confidence Score</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-core-problem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-problem-title">The Transition Gap Nobody Talks About</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Nursing school teaches you clinical skills. Nobody teaches you how to land the job, survive orientation, or stop feeling like a fraud.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAIN_POINTS.map((point, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all" data-testid={`card-pain-point-${i}`}>
                <point.icon className="w-7 h-7 text-blue-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{point.title}</h3>
                <p className="text-sm text-gray-500">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-platform-provides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-platform-title">Everything You Need for Your First Year</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Five comprehensive modules designed by experienced nurse managers and career coaches.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((mod, i) => (
              <Link key={i} href={mod.link} className="group" data-testid={`card-module-${i}`}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all h-full">
                  <mod.icon className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{mod.title}</h3>
                  <p className="text-sm text-gray-500">{mod.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium mt-3">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-blueprint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-blueprint-title">What Nurse Managers Actually Look For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Based on interviews with 50+ hiring managers across acute care, community, and specialty settings.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6" data-testid="card-interview-categories">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Top Interview Categories
              </h3>
              <ul className="space-y-3">
                {INTERVIEW_CATEGORIES.map((cat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6" data-testid="card-resume-musts">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Resume Must-Haves
              </h3>
              <ul className="space-y-3">
                {RESUME_MUSTS.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-blue-50/30 to-white" data-testid="section-sample-content" id="interview-lab">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-sample-title">Try It Now</h2>
            <p className="text-gray-600">Two real behavioral interview questions with complete STAR framework answers.</p>
          </div>
          <div className="space-y-6">
            {SAMPLE_QUESTIONS.map((q, i) => (
              <SampleQuestionCard key={i} question={q} index={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/new-grad#interview-lab" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200" data-testid="button-unlock-more">
              Unlock 100+ More Questions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-mistakes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-mistakes-title">5 Mistakes That Kill Your Job Search</h2>
            <p className="text-gray-600">Avoid these common pitfalls that keep new grads unemployed for months.</p>
          </div>
          <div className="space-y-4">
            {JOB_SEARCH_MISTAKES.map((mistake, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-all" data-testid={`card-mistake-${i}`}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{mistake.title}</h3>
                    <p className="text-sm text-gray-500">{mistake.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-comparison">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-comparison-title">NurseNest vs. Figuring It Out Alone</h2>
            <p className="text-gray-600">See why structured career prep outperforms scattered free resources.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="px-5 py-3 text-sm font-semibold text-gray-500">Feature</div>
              <div className="px-5 py-3 text-sm font-semibold text-blue-700 text-center">NurseNest</div>
              <div className="px-5 py-3 text-sm font-semibold text-gray-400 text-center">Self-Study</div>
            </div>
            {COMPARISON_DATA.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i < COMPARISON_DATA.length - 1 ? 'border-b border-gray-100' : ''}`} data-testid={`comparison-row-${i}`}>
                <div className="px-5 py-4 text-sm font-medium text-gray-700">{row.feature}</div>
                <div className="px-5 py-4 text-center flex items-center justify-center">
                  {row.nursenest ? <Check className="w-5 h-5 text-blue-500" /> : <X className="w-5 h-5 text-gray-300" />}
                </div>
                <div className="px-5 py-4 text-center flex items-center justify-center">
                  {row.self ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-gray-300" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-faq-title">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about the New Grad RN Hub</p>
          </div>
          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700" data-testid="section-conversion">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" data-testid="text-conversion-title">
            Launch Your Nursing Career with Confidence
          </h2>
          <p className="text-blue-100 mb-3 text-lg">
            Everything you need for interview prep, resume building, and your first 90 days on the floor.
          </p>
          <p className="text-blue-200 mb-8 text-sm">
            Starting at $19/month or included with your RN subscription.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg" data-testid="button-cta-pricing">
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/new-grad/readiness-quiz" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-cta-quiz">
              Free Readiness Quiz
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-blue-200 text-sm">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 14-day guarantee</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SampleQuestionCard({ question, index }: { question: typeof SAMPLE_QUESTIONS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm" data-testid={`card-sample-question-${index}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
        data-testid={`button-expand-question-${index}`}
      >
        <div className="flex items-start gap-3 pr-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
            Q{index + 1}
          </div>
          <span className="font-semibold text-gray-900">{question.question}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="px-6 pb-6 space-y-4" data-testid={`text-answer-${index}`}>
          <div className="border-t border-gray-100 pt-4">
            <div className="space-y-3">
              <div>
                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold mb-1">SITUATION</span>
                <p className="text-sm text-gray-600">{question.situation}</p>
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-bold mb-1">TASK</span>
                <p className="text-sm text-gray-600">{question.task}</p>
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold mb-1">ACTION</span>
                <p className="text-sm text-gray-600">{question.action}</p>
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold mb-1">RESULT</span>
                <p className="text-sm text-gray-600">{question.result}</p>
              </div>
            </div>
          </div>
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
