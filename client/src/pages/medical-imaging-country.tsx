import { useRoute, Link } from "wouter";
import { SEO } from "@/components/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import {
  BookOpen, FileText, Zap, Brain, Star, ArrowRight,
  CheckCircle2, Radio, BarChart3, Lock
} from "lucide-react";

interface CountryConfig {
  name: string;
  flag: string;
  exam: string;
  examFull: string;
  color: string;
  gradient: string;
  accentBg: string;
  description: string;
  sections: { title: string; description: string; icon: typeof BookOpen; href: string; available: boolean }[];
  quickStart: { title: string; description: string }[];
  seoKeywords: string;
}

const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  canada: {
    name: "Canada",
    flag: "\u{1F1E8}\u{1F1E6}",
    exam: "CAMRT",
    examFull: "Canadian Association of Medical Radiation Technologists",
    color: "text-red-600",
    gradient: "from-red-500 to-red-600",
    accentBg: "bg-red-50",
    description: "Prepare for the CAMRT certification exam with Canada-specific radiographic positioning, radiation safety regulations (CNSC guidelines), patient care protocols, and image evaluation criteria aligned with Canadian practice standards.",
    sections: [
      { title: "Lessons & Study Guides", description: "Comprehensive lessons covering all CAMRT exam domains including radiographic procedures, radiation protection, patient care, and equipment operation.", icon: BookOpen, href: "/medical-imaging/canada/lessons", available: false },
      { title: "Flashcards", description: "Spaced-repetition flashcards for anatomy landmarks, positioning criteria, physics formulas, and radiation safety standards.", icon: Zap, href: "/medical-imaging/canada/flashcards", available: false },
      { title: "Practice Exams", description: "Timed practice exams weighted to the CAMRT blueprint with detailed rationales and performance analytics.", icon: FileText, href: "/medical-imaging/canada/practice-exams", available: false },
      { title: "Adaptive Exam", description: "AI-adaptive exam that adjusts difficulty based on your performance to pinpoint exact knowledge gaps.", icon: Brain, href: "/medical-imaging/canada/adaptive-exam", available: false },
      { title: "Case Studies", description: "Real-world radiographic case studies with image interpretation, clinical correlation, and diagnostic reasoning exercises.", icon: Star, href: "/medical-imaging/canada/case-studies", available: false },
      { title: "Progress Tracker", description: "Track your readiness across all exam domains with predicted pass probability and personalized study recommendations.", icon: BarChart3, href: "/medical-imaging/canada/progress", available: false },
    ],
    quickStart: [
      { title: "Take Diagnostic", description: "Identify your strengths and gaps with a free 30-question diagnostic assessment." },
      { title: "Review Weak Areas", description: "Focus on your lowest-scoring domains with targeted lessons and flashcards." },
      { title: "Practice Under Pressure", description: "Take timed practice exams to build test-taking stamina and confidence." },
      { title: "Track Progress", description: "Monitor your improvement and get a predicted pass probability score." },
    ],
    seoKeywords: "CAMRT exam prep, Canadian radiography certification, CAMRT practice questions, radiologic technologist Canada, medical radiation technologist exam, CAMRT study guide",
  },
  usa: {
    name: "USA",
    flag: "\u{1F1FA}\u{1F1F8}",
    exam: "ARRT",
    examFull: "American Registry of Radiologic Technologists",
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-600",
    accentBg: "bg-blue-50",
    description: "Prepare for the ARRT certification exam with USA-specific radiographic positioning, NRC radiation safety regulations, patient care standards, and image evaluation criteria aligned with ASRT practice standards.",
    sections: [
      { title: "Lessons & Study Guides", description: "Comprehensive lessons covering all ARRT exam content specifications including image production, procedures, patient care, and safety.", icon: BookOpen, href: "/medical-imaging/usa/lessons", available: false },
      { title: "Flashcards", description: "Spaced-repetition flashcards for anatomy, positioning, physics concepts, and radiation protection standards.", icon: Zap, href: "/medical-imaging/usa/flashcards", available: false },
      { title: "Practice Exams", description: "Timed practice exams weighted to the ARRT content specifications with detailed rationales and score breakdowns.", icon: FileText, href: "/medical-imaging/usa/practice-exams", available: false },
      { title: "Adaptive Exam", description: "AI-adaptive exam engine that calibrates to your skill level and targets your weakest content areas.", icon: Brain, href: "/medical-imaging/usa/adaptive-exam", available: false },
      { title: "Case Studies", description: "Clinical case studies with real radiographic images for image critique, pathology identification, and clinical decision-making.", icon: Star, href: "/medical-imaging/usa/case-studies", available: false },
      { title: "Progress Tracker", description: "Dashboard tracking your mastery across all ARRT content categories with readiness prediction.", icon: BarChart3, href: "/medical-imaging/usa/progress", available: false },
    ],
    quickStart: [
      { title: "Free Diagnostic", description: "Start with a 30-question assessment to benchmark your current knowledge." },
      { title: "Study Weak Domains", description: "Targeted lessons and drills for your lowest-performing content areas." },
      { title: "Simulate the Exam", description: "Full-length timed exams matching the ARRT format and difficulty." },
      { title: "Monitor Readiness", description: "Get a predicted pass score based on your rolling performance data." },
    ],
    seoKeywords: "ARRT exam prep, radiography certification USA, ARRT practice questions, radiologic technologist exam, X-ray tech certification, ARRT study guide, radiography board exam",
  },
};

export function MedicalImagingCanada() {
  return <MedicalImagingCountryPage country="canada" />;
}

export function MedicalImagingUSA() {
  return <MedicalImagingCountryPage country="usa" />;
}

function MedicalImagingCountryPage({ country }: { country: string }) {
  const config = COUNTRY_CONFIGS[country];
  if (!config) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Country Not Found</h1>
        <p className="text-gray-600">The country pathway you're looking for doesn't exist.</p>
        <Link href="/medical-imaging" className="inline-block mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700" data-testid="link-back-imaging">
          Back to Medical Imaging
        </Link>
      </div>
    );
  }

  return (
    <div data-testid={`medical-imaging-${country}-page`}>
      <SEO
        title={`${config.exam} Radiography Exam Prep - ${config.name} | NurseNest`}
        description={config.description}
        keywords={config.seoKeywords}
        canonicalPath={`/medical-imaging/${country}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": `${config.exam} Radiography Exam Prep`,
          "description": config.description,
          "provider": {
            "@type": "Organization",
            "name": "NurseNest",
            "url": "https://www.nursenest.ca"
          },
          "educationalLevel": "Professional Certification",
          "about": {
            "@type": "Thing",
            "name": `${config.examFull} Certification`
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "courseWorkload": "PT8W"
          }
        }}
        additionalStructuredData={[{
          "@context": "https://schema.org",
          "@type": "PracticeExam",
          "name": `${config.exam} Practice Exam`,
          "description": `Practice exam for the ${config.examFull} certification`,
          "provider": { "@type": "Organization", "name": "NurseNest" },
          "educationalLevel": "Professional Certification"
        }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BreadcrumbNav items={[
          { name: "Home", url: "https://www.nursenest.ca/" },
          { name: "Medical Imaging", url: "https://www.nursenest.ca/medical-imaging" },
          { name: `${config.name} (${config.exam})`, url: `https://www.nursenest.ca/medical-imaging/${country}` },
        ]} />
      </div>

      <section className="relative overflow-hidden py-14 sm:py-20" data-testid={`${country}-hero`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${config.accentBg} via-white/50 to-white`} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-medium mb-6 text-gray-700" data-testid={`badge-${country}`}>
              <span className="text-lg">{config.flag}</span>
              {config.examFull}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid={`text-${country}-title`}>
              <span className={config.color}>{config.exam}</span> Radiography Exam Prep
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" data-testid={`text-${country}-description`}>
              {config.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16" data-testid={`${country}-sections`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Study Resources</h2>
            <p className="text-gray-600">Everything you need to pass the {config.exam} exam</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.sections.map(section => (
              <div
                key={section.title}
                className={`bg-white rounded-2xl border border-gray-100 p-6 transition-all ${section.available ? "hover:shadow-lg hover:border-indigo-200 cursor-pointer" : "opacity-80"}`}
                data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  {!section.available && (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{section.description}</p>
                {section.available ? (
                  <Link href={section.href} className="inline-flex items-center gap-1 text-sm text-indigo-600 font-medium hover:text-indigo-700">
                    Start Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400">Available soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-b from-gray-50 to-white" data-testid={`${country}-quickstart`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Start Path</h2>
            <p className="text-gray-600">Follow these 4 steps to get exam-ready</p>
          </div>
          <div className="space-y-4">
            {config.quickStart.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-5" data-testid={`quickstart-step-${i + 1}`}>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${config.gradient} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white" data-testid={`${country}-progress-placeholder`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`${config.accentBg} rounded-2xl p-8 sm:p-12 border border-gray-100`}>
            <BarChart3 className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-testid={`text-${country}-progress-title`}>
              Progress Tracker
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Sign in to track your progress across all {config.exam} exam domains, view your readiness score, and get personalized study recommendations.
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors" data-testid={`button-${country}-signin`}>
              Sign In to Track Progress <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MedicalImagingCountryPage;
