import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { buildFaqStructuredData } from "@/lib/structured-data";
import { LeadCaptureInline } from "@/components/new-grad/lead-capture";
import { InternalLinks } from "@/components/new-grad/internal-links";
import { NEW_GRAD_PROFESSIONS, getProfessionBySlug } from "@shared/new-grad-professions";
import {
  ArrowRight, BookOpen, ChevronRight, GraduationCap, CheckCircle2,
  AlertTriangle, Clock, MessageSquare, Shield, Target, Star, Brain
} from "lucide-react";

const FIRST_YEAR_SECTIONS = [
  {
    id: "overview",
    title: "First Year Overview",
    icon: BookOpen,
    description: "What to expect during your transition from student to practicing clinician.",
  },
  {
    id: "common-mistakes",
    title: "Common Mistakes to Avoid",
    icon: AlertTriangle,
    description: "Pitfalls that trip up new graduates and how to steer clear of them.",
  },
  {
    id: "shift-preparation",
    title: "Shift Preparation",
    icon: Clock,
    description: "How to prepare for each shift so you feel confident and organized.",
  },
  {
    id: "communication",
    title: "Communication Tips",
    icon: MessageSquare,
    description: "Master professional communication with colleagues, patients, and families.",
  },
  {
    id: "clinical-confidence",
    title: "Clinical Confidence Strategies",
    icon: Shield,
    description: "Build your clinical confidence through structured growth and self-reflection.",
  },
];

export default function FirstYearGuidePage() {
  const params = useParams<{ profession: string }>();
  const professionSlug = (params.profession || "").replace("-first-year-guide", "");
  const profession = getProfessionBySlug(professionSlug);

  const { data: guide } = useQuery({
    queryKey: ["/api/new-grad/guides", `${professionSlug}-first-year-guide`],
    queryFn: async () => {
      const res = await fetch(`/api/new-grad/guides/${professionSlug}-first-year-guide`);
      return res.ok ? res.json() : null;
    },
    enabled: !!professionSlug,
  });

  if (!profession) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-guide-not-found">Guide Not Found</h1>
            <Link href="/new-grad" className="text-blue-600 hover:underline">Back to New Grad Hub</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const faqData = [
    { question: `How long does the first year as a ${profession.shortName} typically feel overwhelming?`, answer: `Most new ${profession.shortName} graduates report feeling significantly more confident by months 6-8. The first 3 months are typically the most challenging as you build clinical routines and relationships.` },
    { question: `What's the biggest mistake new ${profession.shortName} graduates make?`, answer: `Not asking for help early enough. New graduates often feel they should know everything, but experienced colleagues expect questions and prefer you ask rather than guess.` },
    { question: `How can I prepare for my shifts as a new ${profession.shortName}?`, answer: `Develop a pre-shift routine: review your patient assignments, check for pending orders, prepare your supplies, and mentally walk through your priorities. Consistency in preparation builds confidence.` },
  ];

  const faqStructuredData = buildFaqStructuredData(faqData);

  return (
    <div className="min-h-screen flex flex-col" data-testid={`first-year-guide-${professionSlug}`}>
      <Navigation />
      <SEO
        title={`${profession.name} First Year Survival Guide | NurseNest`}
        description={`Complete first year survival guide for new ${profession.shortName} graduates. Common mistakes, shift preparation, communication tips, and clinical confidence strategies.`}
        keywords={`new grad ${profession.shortName}, first year ${profession.shortName}, ${profession.shortName} survival guide, new graduate ${profession.name}`}
        canonicalPath={`/new-grad/${professionSlug}-first-year-guide`}
        additionalStructuredData={[faqStructuredData]}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Hub", url: "https://www.nursenest.ca/new-grad" },
          { name: profession.name, url: `https://www.nursenest.ca/new-grad/${professionSlug}` },
          { name: "First Year Guide", url: `https://www.nursenest.ca/new-grad/${professionSlug}-first-year-guide` },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-guide-hero">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${profession.colorAccent} 0%, white 100%)` }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/new-grad" className="hover:text-blue-600">New Grad Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/new-grad/${professionSlug}`} className="hover:text-blue-600">{profession.shortName}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: profession.color }} className="font-medium">First Year Guide</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: profession.color + "20", color: profession.color }}>
            <GraduationCap className="w-4 h-4" />
            First Year Survival Guide
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-guide-title">
            {profession.shortName} First Year <span style={{ color: profession.color }}>Survival Guide</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Everything you need to navigate your first year as a {profession.name} graduate. From day one orientation through confident independent practice.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white" data-testid="section-guide-nav">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What's Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FIRST_YEAR_SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" data-testid={`nav-section-${section.id}`}>
                <section.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: profession.color }} />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{section.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{section.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="py-16" data-testid="section-overview">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BookOpen className="w-7 h-7" style={{ color: profession.color }} />
            First Year Overview
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>Your first year as a {profession.name} graduate is a transformative journey from academic learning to clinical competence. {profession.careerOverview}</p>
            <div className="bg-blue-50 rounded-xl p-6 mt-6 not-prose">
              <h3 className="font-semibold text-gray-900 mb-3">Key Milestones</h3>
              <div className="space-y-2">
                {profession.firstYearExpectations.map((exp, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: profession.color }} />
                    <span className="text-sm text-gray-700">{exp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="common-mistakes" className="py-16 bg-gray-50" data-testid="section-common-mistakes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            {profession.commonChallenges.map((challenge, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5" data-testid={`mistake-${i}`}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                  <div>
                    <p className="text-gray-700">{challenge}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>How to avoid:</strong> {profession.clinicalTips[i] || "Seek mentorship and develop a structured approach to build competence gradually."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="shift-preparation" className="py-16" data-testid="section-shift-prep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Clock className="w-7 h-7" style={{ color: profession.color }} />
            Shift Preparation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Before Your Shift</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />Review your assignment and patient information</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />Prepare essential supplies and equipment</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />Review any pending orders or follow-ups</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />Set priorities for critical tasks</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3">During Your Shift</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: profession.color }} />Complete time-sensitive tasks first</li>
                <li className="flex items-start gap-2"><Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: profession.color }} />Document in real-time whenever possible</li>
                <li className="flex items-start gap-2"><Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: profession.color }} />Communicate changes to your team promptly</li>
                <li className="flex items-start gap-2"><Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: profession.color }} />Take breaks to maintain focus and energy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="communication" className="py-16 bg-gray-50" data-testid="section-communication">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <MessageSquare className="w-7 h-7" style={{ color: profession.color }} />
            Communication Tips
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">With Colleagues</h3>
                <p className="text-sm text-gray-600">Be direct, respectful, and structured. Use frameworks like SBAR for clinical communication. Don't be afraid to clarify or ask questions.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">With Patients & Families</h3>
                <p className="text-sm text-gray-600">Introduce yourself clearly, explain what you're doing, listen actively, and validate concerns. Confidence comes from preparation and genuine care.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">During Handoff</h3>
                <p className="text-sm text-gray-600">Be organized and thorough. Cover what happened, what's pending, and what to watch for. Anticipate questions and have answers ready.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clinical-confidence" className="py-16" data-testid="section-clinical-confidence">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7" style={{ color: profession.color }} />
            Clinical Confidence Strategies
          </h2>
          <div className="space-y-4">
            {profession.clinicalTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-5" data-testid={`confidence-tip-${i}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 text-white" style={{ backgroundColor: profession.color }}>
                  {i + 1}
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadCaptureInline
        profession={professionSlug}
        professionName={profession.name}
        color={profession.color}
        resourceName="First Year Survival Checklist"
        resourceType="first-year-checklist"
      />

      <section className="py-16 bg-white" data-testid="section-guide-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">FAQ</h2>
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <details key={i} className="bg-gray-50 rounded-xl p-4 group" data-testid={`faq-${i}`}>
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks currentPath={`/new-grad/${professionSlug}-first-year-guide`} profession={professionSlug} professionName={profession.name} />
      <Footer />
    </div>
  );
}
