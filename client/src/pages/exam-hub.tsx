import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { LocaleLink } from "@/lib/LocaleLink";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { SEO_EXAM_PAGES, type SeoExamPageConfig } from "@/data/seo-exam-data";
import {
  BookOpen, FileText, Stethoscope, FlaskConical, Pill,
  ArrowRight, Target, Clock, BarChart, Award,
  ChevronRight, Brain, GraduationCap, Layers
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EndOfContentLeadCapture } from "@/components/lead-capture";

interface HubConfig {
  slug: string;
  examSlug: string;
  title: string;
  seoTitle: string;
  description: string;
  introText: string;
  region: "US" | "CA" | "both";
  tier: "rpn" | "rn" | "np";
  stats: { label: string; value: string }[];
  links: { icon: any; title: string; description: string; href: string; badge?: string }[];
  keywords: string[];
}

const HUB_CONFIGS: HubConfig[] = [
  {
    slug: "nclex-rn",
    examSlug: "nclex-rn-mock-exam",
    title: "NCLEX-RN",
    seoTitle: "NCLEX-RN Study Hub: Practice Exams, Questions, and Study Resources | NurseNest",
    description: "Complete NCLEX-RN preparation hub with mock exams, practice questions, study guides, pharmacology review, and lab value references. Everything you need to pass the NCLEX-RN.",
    introText: "The NCLEX-RN is the national licensure examination for registered nurses in the United States and Canada. NurseNest provides a comprehensive suite of study tools aligned to the current NCLEX-RN test plan, including computer adaptive mock exams, system-based question banks, pharmacology review, and clinical lab value references. Use this hub to navigate all available NCLEX-RN preparation resources.",
    region: "both",
    tier: "rn",
    stats: [
      { label: "Question Format", value: "60-85 Adaptive" },
      { label: "Time Limit", value: "5 Hours" },
      { label: "First-Time Pass Rate", value: "~88%" },
      { label: "Test Plan Categories", value: "8 Domains" },
    ],
    links: [
      { icon: Target, title: "Mock Exam Simulator", description: "Take a full-length CAT-adaptive mock exam that mirrors the real NCLEX-RN testing experience.", href: "/nclex-rn/mock-exam", badge: "Popular" },
      { icon: BookOpen, title: "Practice Questions", description: "Browse thousands of NCLEX-RN practice questions organized by body system and client needs category.", href: "/question-bank?exam=nclex-rn" },
      { icon: Layers, title: "Study Guides and Lessons", description: "Review in-depth clinical lessons covering pathophysiology, pharmacology, and nursing interventions.", href: "/lessons?tier=rn" },
      { icon: Pill, title: "Pharmacology Review", description: "Study high-yield medications including drug classes, mechanisms of action, side effects, and nursing considerations.", href: "/medications" },
      { icon: FlaskConical, title: "Lab Values Reference", description: "Review normal ranges, clinical significance, and nursing interventions for critical lab values.", href: "/lab-values" },
      { icon: Brain, title: "Clinical Judgment Cases", description: "Practice Next Generation NCLEX clinical judgment scenarios including bowtie and case study items.", href: "/clinical-clarity" },
      { icon: Stethoscope, title: "OSCE Practice Simulations", description: "Build clinical skills with interactive patient scenario simulations and assessment practice.", href: "/simulators/osce" },
      { icon: FileText, title: "Flashcard Decks", description: "Review high-yield content with flashcard decks organized by body system and topic.", href: "/flashcards" },
    ],
    keywords: ["NCLEX-RN study hub", "NCLEX-RN resources", "NCLEX-RN preparation", "NCLEX-RN study guide", "NCLEX-RN practice"],
  },
  {
    slug: "nclex-pn",
    examSlug: "nclex-pn-mock-exam",
    title: "NCLEX-PN",
    seoTitle: "NCLEX-PN Study Hub: LPN/LVN Practice Exams and Study Resources | NurseNest",
    description: "Complete NCLEX-PN preparation hub with mock exams, practice questions, study guides, and pharmacology review for LPN and LVN candidates.",
    introText: "The NCLEX-PN is the national licensure examination for practical nurses (LPN/LVN) in the United States. NurseNest provides practical nursing-focused study tools aligned to the NCLEX-PN test plan, including adaptive mock exams, scope-appropriate question banks, medication review, and clinical lab references. Use this hub to access all NCLEX-PN preparation resources in one place.",
    region: "US",
    tier: "rpn",
    stats: [
      { label: "Question Format", value: "60-85 Adaptive" },
      { label: "Time Limit", value: "5 Hours" },
      { label: "First-Time Pass Rate", value: "~86%" },
      { label: "Test Plan Categories", value: "8 Domains" },
    ],
    links: [
      { icon: Target, title: "Mock Exam Simulator", description: "Take a full-length CAT-adaptive mock exam designed for the NCLEX-PN format and scope.", href: "/nclex-pn/mock-exam", badge: "Popular" },
      { icon: BookOpen, title: "Practice Questions", description: "Practice with questions written within the LPN/LVN scope of practice, covering data collection and foundational care.", href: "/question-bank?exam=nclex-pn" },
      { icon: Layers, title: "Study Guides and Lessons", description: "Review clinical lessons focused on practical nursing competencies and client care.", href: "/lessons?tier=rpn" },
      { icon: Pill, title: "Pharmacology Review", description: "Study medications commonly encountered in practical nursing practice with nursing considerations.", href: "/medications" },
      { icon: FlaskConical, title: "Lab Values Reference", description: "Review normal ranges and clinical significance of common laboratory values.", href: "/lab-values" },
      { icon: FileText, title: "Flashcard Decks", description: "Quick-review flashcard decks for pharmacology, lab values, and key nursing concepts.", href: "/flashcards" },
    ],
    keywords: ["NCLEX-PN study hub", "NCLEX-PN resources", "LPN exam prep", "LVN exam prep", "NCLEX-PN practice"],
  },
  {
    slug: "rex-pn",
    examSlug: "rex-pn-mock-exam",
    title: "REx-PN",
    seoTitle: "REx-PN Study Hub: Canadian RPN Exam Prep and Practice Resources | NurseNest",
    description: "Complete REx-PN preparation hub with mock exams, Canadian RPN practice questions, study guides, and pharmacology review aligned to the REx-PN competency framework.",
    introText: "The Regulatory Exam - Practical Nurse (REx-PN) is the Canadian licensure examination for Registered Practical Nurses (RPNs). NurseNest provides Canadian-context study tools aligned to the REx-PN competency framework, including adaptive mock exams, competency-mapped question banks, Health Canada-approved medication review, and metric-unit lab references. Use this hub to navigate all REx-PN preparation resources.",
    region: "CA",
    tier: "rpn",
    stats: [
      { label: "Question Format", value: "60-90 Adaptive" },
      { label: "Time Limit", value: "3 Hours" },
      { label: "Result Format", value: "Pass/Fail" },
      { label: "Competency Domains", value: "5 Domains" },
    ],
    links: [
      { icon: Target, title: "Mock Exam Simulator", description: "Take a full-length CAT-adaptive mock exam aligned to the REx-PN competency framework.", href: "/rex-pn/mock-exam", badge: "Popular" },
      { icon: BookOpen, title: "Practice Questions", description: "Practice with Canadian-context questions mapped to the five REx-PN competency domains.", href: "/question-bank?exam=rex-pn" },
      { icon: Layers, title: "Study Guides and Lessons", description: "Review clinical lessons using Canadian healthcare terminology, metric units, and scope of practice.", href: "/lessons?tier=rpn" },
      { icon: Pill, title: "Pharmacology Review", description: "Study medications approved by Health Canada with Canadian prescribing and nursing considerations.", href: "/medications" },
      { icon: FlaskConical, title: "Lab Values Reference", description: "Review lab values in SI units with Canadian normal ranges and clinical significance.", href: "/lab-values" },
      { icon: Brain, title: "Delegation and Scope Practice", description: "Practice questions on RPN delegation, scope of practice, and collaboration with UCPs and RNs.", href: "/clinical-clarity" },
      { icon: FileText, title: "Flashcard Decks", description: "Rapid-review flashcard decks covering Canadian nursing fundamentals and clinical concepts.", href: "/flashcards" },
    ],
    keywords: ["REx-PN study hub", "REx-PN resources", "Canadian RPN exam", "REx-PN preparation", "REx-PN practice"],
  },
  {
    slug: "canada-np",
    examSlug: "canada-np-mock-exam",
    title: "Canadian NP Exam (CNPLE)",
    seoTitle: "Canadian NP Exam Study Hub: CNPLE Practice Questions and Resources | NurseNest",
    description: "Complete Canadian Nurse Practitioner licensing exam (CNPLE) preparation hub with mock exams, NP-level practice questions, differential diagnosis training, and prescribing review.",
    introText: "The Canadian Nurse Practitioner Licensing Examination (CNPLE) is the national certification exam required for NP licensure in Canada. NurseNest provides advanced practice study tools covering health assessment, differential diagnosis, therapeutics, pharmacological management, and professional practice at the NP scope. Use this hub to access all CNPLE preparation resources.",
    region: "CA",
    tier: "np",
    stats: [
      { label: "Question Format", value: "180 Fixed/Linear" },
      { label: "Time Limit", value: "5 Hours" },
      { label: "Passing Score", value: "500/800 Scale" },
      { label: "Content Domains", value: "5 Domains" },
    ],
    links: [
      { icon: Target, title: "Mock Exam Simulator", description: "Take a 180-question linear-scaled mock exam mirroring the CNPLE format and scoring.", href: "/canada-np/mock-exam", badge: "Popular" },
      { icon: BookOpen, title: "Practice Questions", description: "Practice with NP-level questions covering differential diagnosis, prescribing, and clinical management.", href: "/question-bank?exam=np" },
      { icon: Layers, title: "Study Guides and Lessons", description: "Review advanced clinical lessons on health assessment, diagnosis, and therapeutics at the NP scope.", href: "/lessons?tier=np" },
      { icon: Pill, title: "Pharmacology and Prescribing", description: "Study advanced pharmacology including prescribing guidelines, drug interactions, and Health Canada formulary.", href: "/medications" },
      { icon: FlaskConical, title: "Lab and Diagnostic Interpretation", description: "Review diagnostic test interpretation including imaging, ECG, and advanced laboratory analysis.", href: "/lab-values" },
      { icon: Brain, title: "Differential Diagnosis Cases", description: "Practice clinical reasoning with multi-system differential diagnosis case scenarios.", href: "/clinical-clarity" },
      { icon: Stethoscope, title: "OSCE and Clinical Simulations", description: "Practice advanced clinical assessment skills and patient management simulations.", href: "/simulators/osce" },
      { icon: FileText, title: "Flashcard Decks", description: "High-yield NP flashcard decks covering pharmacology, pathophysiology, and clinical guidelines.", href: "/flashcards" },
    ],
    keywords: ["CNPLE study hub", "Canadian NP exam", "CNPLE preparation", "nurse practitioner exam Canada", "CNPLE practice"],
  },
  {
    slug: "us-np",
    examSlug: "us-np-mock-exam",
    title: "US NP Certification (AANP/ANCC)",
    seoTitle: "NP Certification Study Hub: AANP and ANCC Exam Prep Resources | NurseNest",
    description: "Complete US Nurse Practitioner certification exam preparation hub with AANP and ANCC mock exams, NP-level practice questions, pharmacology review, and clinical resources.",
    introText: "The AANP and ANCC are the two primary certifying bodies for nurse practitioners in the United States. NurseNest provides advanced practice study tools aligned to both AANP and ANCC exam blueprints, covering advanced assessment, differential diagnosis, pharmacological management, and evidence-based practice. Use this hub to access all NP certification preparation resources.",
    region: "US",
    tier: "np",
    stats: [
      { label: "Question Format", value: "150 Fixed/Linear" },
      { label: "Time Limit", value: "4 Hours" },
      { label: "AANP Pass Score", value: "500/800 Scale" },
      { label: "ANCC Pass Score", value: "350/500 Scale" },
    ],
    links: [
      { icon: Target, title: "Mock Exam Simulator", description: "Take a 150-question fixed-length mock exam aligned to AANP and ANCC exam blueprints.", href: "/us-np/mock-exam", badge: "Popular" },
      { icon: BookOpen, title: "Practice Questions", description: "Practice with NP-level questions covering advanced assessment, diagnosis, and management.", href: "/question-bank?exam=np" },
      { icon: Layers, title: "Study Guides and Lessons", description: "Review advanced clinical lessons on primary care, acute care, and specialty NP topics.", href: "/lessons?tier=np" },
      { icon: Pill, title: "Pharmacology and Prescribing", description: "Study advanced pharmacology including FDA-approved medications, prescribing authority, and drug interactions.", href: "/medications" },
      { icon: FlaskConical, title: "Lab and Diagnostic Interpretation", description: "Review diagnostic test ordering and interpretation for NP-level clinical decision-making.", href: "/lab-values" },
      { icon: Brain, title: "Differential Diagnosis Training", description: "Practice distinguishing between competing diagnoses using clinical vignettes and evidence-based reasoning.", href: "/clinical-clarity" },
      { icon: Stethoscope, title: "Clinical Simulations", description: "Practice advanced clinical skills with patient scenario simulations.", href: "/simulators/osce" },
      { icon: FileText, title: "Flashcard Decks", description: "High-yield NP flashcard decks for pharmacology, clinical guidelines, and evidence-based practice.", href: "/flashcards" },
    ],
    keywords: ["AANP exam prep", "ANCC exam prep", "NP certification study hub", "nurse practitioner exam", "NP board prep"],
  },
];

function getHubConfig(slug: string): HubConfig | undefined {
  return HUB_CONFIGS.find((h) => h.slug === slug);
}

function getExamData(examSlug: string): SeoExamPageConfig | undefined {
  return SEO_EXAM_PAGES.find((e) => e.slug === examSlug);
}

export default function ExamHub() {
  const [location] = useLocation();
  const slug = location.replace(/^\/(?:en|fr|es|fil|hi|zh|ar|ko|pt|pa|vi|ht|ur|ja|fa)\//, "/").replace(/^\//, "").replace(/\/$/, "");
  const hub = getHubConfig(slug);
  const examData = hub ? getExamData(hub.examSlug) : undefined;

  if (!hub) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4" data-testid="text-hub-not-found">Exam Hub Not Found</h1>
          <p className="text-slate-600 mb-6">The exam hub you are looking for does not exist.</p>
          <LocaleLink href="/">
            <Button data-testid="button-hub-go-home">Return to Home</Button>
          </LocaleLink>
        </div>
        <Footer />
      </div>
    );
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: hub.seoTitle,
    description: hub.description,
    url: `https://www.nursenest.ca/${hub.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "NurseNest",
      url: "https://www.nursenest.ca",
    },
    about: {
      "@type": "EducationalOccupationalCredential",
      name: hub.title,
      credentialCategory: "Professional License",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title={hub.seoTitle}
        description={hub.description}
        keywords={hub.keywords.join(", ")}
        canonicalPath={`/${hub.slug}`}
        structuredData={webPageSchema}
        
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "https://www.nursenest.ca/" },
            { name: `${hub.title} Study Hub`, url: `https://www.nursenest.ca/${hub.slug}` },
          ]}
        />

        <section className="mt-8 mb-12" data-testid="section-hub-hero">
          <div className="bg-gradient-to-br from-[#BFA6F6]/10 via-white to-[#2E3A59]/5 rounded-2xl border border-[#BFA6F6]/20 p-8 sm:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#BFA6F6]/15 flex items-center justify-center shrink-0">
                <GraduationCap className="w-7 h-7 text-[#BFA6F6]" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2 text-xs border-[#BFA6F6]/30 text-[#2E3A59]" data-testid="badge-hub-region">
                  {hub.region === "CA" ? "Canada" : hub.region === "US" ? "United States" : "US and Canada"}
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E3A59] leading-tight" data-testid="text-hub-h1">
                  {hub.title} Study Hub
                </h1>
              </div>
            </div>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-4xl" data-testid="text-hub-intro">
              {hub.introText}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {hub.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 rounded-xl border border-slate-200/60 p-4 text-center"
                  data-testid={`stat-hub-${idx}`}
                >
                  <p className="text-lg sm:text-xl font-bold text-[#2E3A59]">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12" data-testid="section-hub-resources">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2E3A59] mb-6">Study Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hub.links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <LocaleLink key={idx} href={link.href}>
                  <Card
                    className="h-full hover:shadow-md hover:border-[#BFA6F6]/40 transition-all duration-200 cursor-pointer group"
                    data-testid={`card-hub-resource-${idx}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#BFA6F6]/10 flex items-center justify-center shrink-0 group-hover:bg-[#BFA6F6]/20 transition-colors">
                          <Icon className="w-5 h-5 text-[#BFA6F6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-[#2E3A59] text-sm group-hover:text-[#BFA6F6] transition-colors">
                              {link.title}
                            </h3>
                            {link.badge && (
                              <Badge className="bg-[#BFA6F6] text-white text-[10px] px-1.5 py-0">{link.badge}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{link.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#BFA6F6] transition-colors shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </LocaleLink>
              );
            })}
          </div>
        </section>

        {examData && (
          <section className="mb-12" data-testid="section-hub-exam-details">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2E3A59] mb-6">Exam Format Details</h2>
            <Card className="border-slate-200/60">
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#BFA6F6] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#2E3A59]">Questions</p>
                      <p className="text-sm text-slate-500">{examData.formatDetails.questionCount}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#BFA6F6] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#2E3A59]">Time Limit</p>
                      <p className="text-sm text-slate-500">{examData.formatDetails.timeLimit}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart className="w-5 h-5 text-[#BFA6F6] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#2E3A59]">Format</p>
                      <p className="text-sm text-slate-500 capitalize">{examData.formatDetails.adaptiveOrFixed.replace("-", " ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#BFA6F6] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#2E3A59]">Pass Rate</p>
                      <p className="text-sm text-slate-500">{examData.formatDetails.passRate}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm font-semibold text-[#2E3A59] mb-3">Question Types</p>
                  <div className="flex flex-wrap gap-2">
                    {examData.formatDetails.questionTypes.map((qt, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-slate-200 text-slate-600" data-testid={`badge-question-type-${idx}`}>
                        {qt}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="mb-12" data-testid="section-hub-cta">
          <div className="bg-[#2E3A59] rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Ready to Start Preparing for the {hub.title}?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
              Begin with a free mock exam to assess your baseline knowledge, then use the study resources above to target your weak areas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <LocaleLink href={hub.links[0]?.href || "/mock-exams"}>
                <Button className="bg-[#BFA6F6] hover:bg-[#a88de8] text-white px-6 py-2.5" data-testid="button-hub-start-exam">
                  Start Mock Exam
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </LocaleLink>
              <LocaleLink href="/lessons">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-2.5" data-testid="button-hub-browse-lessons">
                  Browse Study Guides
                </Button>
              </LocaleLink>
            </div>
          </div>
        </section>

        <section data-testid="section-hub-related">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2E3A59] mb-6">Explore Other Exam Hubs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HUB_CONFIGS.filter((h) => h.slug !== hub.slug).map((other) => (
              <LocaleLink key={other.slug} href={`/${other.slug}`}>
                <Card
                  className="h-full hover:shadow-md hover:border-[#BFA6F6]/40 transition-all duration-200 cursor-pointer group"
                  data-testid={`card-hub-related-${other.slug}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-[10px] border-slate-200 text-slate-500">
                        {other.region === "CA" ? "Canada" : other.region === "US" ? "United States" : "US/CA"}
                      </Badge>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#BFA6F6] transition-colors" />
                    </div>
                    <h3 className="font-semibold text-sm text-[#2E3A59] group-hover:text-[#BFA6F6] transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{other.stats[0]?.value} questions</p>
                  </CardContent>
                </Card>
              </LocaleLink>
            ))}
          </div>
        </section>

        <EndOfContentLeadCapture
          leadMagnetType="mock_exam"
          professionContext={hub.tier}
          source={`exam_hub_${hub.examSlug}`}
        />
      </main>

      <Footer />
    </div>
  );
}
