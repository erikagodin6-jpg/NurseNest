import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Wind, Ambulance, Pill, Microscope, ScanLine, Hand, Activity,
  Users, Brain, ShieldCheck, ArrowRight, BookOpen, FileText,
  GraduationCap, ChevronRight, Award, MapPin, Stethoscope,
  ClipboardList, Layers, Loader2
} from "lucide-react";
import { AlliedSEO } from "@/allied/allied-seo";
import { getAlliedHealthProfession, type AlliedHealthProfession } from "@/allied/data/allied-health-professions";

const ICON_MAP: Record<string, any> = {
  Wind, Ambulance, Pill, Microscope, ScanLine, Hand, Activity, Users, Brain, ShieldCheck,
};

function Breadcrumbs({ profession }: { profession: AlliedHealthProfession }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6" data-testid="breadcrumb-nav">
      <ol className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
        <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
        <li><ChevronRight className="w-3.5 h-3.5" /></li>
        <li><Link href="/allied-health" className="hover:text-teal-600 transition-colors">Allied Health</Link></li>
        <li><ChevronRight className="w-3.5 h-3.5" /></li>
        <li className="text-gray-900 font-medium">{profession.shortName}</li>
      </ol>
    </nav>
  );
}

export default function AlliedHealthProfessionPage() {
  const [, params] = useRoute("/allied-health/:professionSlug");
  const professionSlug = params?.professionSlug || "";
  const profession = getAlliedHealthProfession(professionSlug);

  const { data: articles } = useQuery({
    queryKey: ["/api/allied-health/articles", professionSlug],
    queryFn: () => fetch(`/api/allied-health/articles?professionSlug=${professionSlug}&status=published`).then(r => r.json()),
    enabled: !!professionSlug,
  });

  if (!profession) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profession Not Found</h1>
        <p className="text-gray-600 mb-4">The allied health profession you're looking for doesn't exist.</p>
        <Link href="/allied-health" className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700" data-testid="link-back-hub">
          Back to Allied Health
        </Link>
      </div>
    );
  }

  const IconComponent = ICON_MAP[profession.icon] || BookOpen;
  const publishedArticles = Array.isArray(articles) ? articles : [];

  return (
    <div data-testid={`profession-hub-page-${profession.slug}`}>
      <AlliedSEO
        title={`${profession.name}: Career Guide, Certification & Exam Prep`}
        description={`Complete ${profession.name} career guide with education pathways, certification requirements, salary data (${profession.medianSalary}), and exam prep resources for ${profession.examNames.join(", ")}.`}
        keywords={`${profession.name}, ${profession.shortName} career, ${profession.examNames.join(", ")}, ${profession.shortName} exam prep, ${profession.shortName} salary, ${profession.shortName} certification`}
        canonicalPath={`/allied-health/${profession.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": `NurseNest ${profession.shortName} Exam Prep`,
          "description": profession.overview,
          "url": `https://allied.nursenest.ca/allied-health/${profession.slug}`,
          "sameAs": ["https://www.nursenest.ca"],
          "educationalCredentialAwarded": profession.examNames.join(", "),
        }}
        additionalStructuredData={[{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": `What education do I need to become a ${profession.name.toLowerCase()}?`, "acceptedAnswer": { "@type": "Answer", "text": profession.educationPathways.join(". ") }},
            { "@type": "Question", "name": `What is the median salary for a ${profession.name.toLowerCase()}?`, "acceptedAnswer": { "@type": "Answer", "text": `The median salary for ${profession.name.toLowerCase()} professionals is ${profession.medianSalary}, with a projected growth rate of ${profession.growthRate}.` }},
            { "@type": "Question", "name": `What certification do I need?`, "acceptedAnswer": { "@type": "Answer", "text": profession.certificationOverview }},
          ]
        }]}
      />

      <section className="bg-gradient-to-br from-gray-50 to-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs profession={profession} />
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: profession.colorAccent }}>
                  <IconComponent className="w-7 h-7" style={{ color: profession.color }} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-profession-title">
                    {profession.name}
                  </h1>
                  <p className="text-sm text-gray-500">Career Guide & Exam Prep</p>
                </div>
              </div>
              <p className="text-base text-gray-600 mb-6 max-w-2xl" data-testid="text-profession-overview">{profession.overview}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={profession.studyResourceCTAs.questionBank} className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-colors" data-testid="button-question-bank">
                  <BookOpen className="w-4 h-4" /> Question Bank
                </Link>
                <Link href={profession.studyResourceCTAs.mockExams} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-teal-700 rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors border border-teal-200" data-testid="button-mock-exams">
                  <FileText className="w-4 h-4" /> Mock Exams
                </Link>
                <Link href={profession.studyResourceCTAs.flashcards} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-teal-700 rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors border border-teal-200" data-testid="button-flashcards">
                  <Layers className="w-4 h-4" /> Flashcards
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full lg:w-72 flex-shrink-0" data-testid="profession-stats-card">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">At a Glance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Median Salary</span>
                  <span className="font-semibold text-gray-900">{profession.medianSalary}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Growth Rate</span>
                  <span className="font-semibold text-green-600">{profession.growthRate}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Education</span>
                  <span className="font-semibold text-gray-900 text-right text-xs">{profession.educationRequired}</span>
                </div>
                <hr className="border-gray-100" />
                <div>
                  <span className="text-xs text-gray-500 block mb-1.5">Certification Exams</span>
                  <div className="flex flex-wrap gap-1">
                    {profession.examNames.map(e => (
                      <span key={e} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14" data-testid="profession-details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6" data-testid="section-where-they-work">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-teal-500" />
                <h2 className="text-lg font-semibold text-gray-900">Where They Work</h2>
              </div>
              <ul className="space-y-2">
                {profession.whereTheyWork.map((place, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    {place}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6" data-testid="section-responsibilities">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="w-5 h-5 text-teal-500" />
                <h2 className="text-lg font-semibold text-gray-900">Key Responsibilities</h2>
              </div>
              <ul className="space-y-2">
                {profession.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6" data-testid="section-education">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-teal-500" />
                <h2 className="text-lg font-semibold text-gray-900">Education Pathways</h2>
              </div>
              <ul className="space-y-2">
                {profession.educationPathways.map((path, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    {path}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6" data-testid="section-certification">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-teal-500" />
                <h2 className="text-lg font-semibold text-gray-900">Certification Overview</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{profession.certificationOverview}</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6" data-testid="section-patient-populations">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-teal-500" />
                <h2 className="text-lg font-semibold text-gray-900">Patient Populations</h2>
              </div>
              <ul className="space-y-2">
                {profession.patientPopulations.map((pop, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                    {pop}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-6" style={{ backgroundColor: profession.colorAccent + "40" }} data-testid="section-study-cta">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Start Studying Today</h2>
              <p className="text-sm text-gray-600 mb-4">Access career-specific study tools designed for {profession.examNames.join(", ")} exam preparation.</p>
              <div className="space-y-2">
                <Link href={profession.studyResourceCTAs.questionBank} className="flex items-center justify-between px-4 py-3 bg-white rounded-xl text-sm font-medium text-gray-900 hover:shadow-md transition-all group" data-testid="cta-question-bank">
                  <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-teal-500" /> Question Bank</div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link href={profession.studyResourceCTAs.flashcards} className="flex items-center justify-between px-4 py-3 bg-white rounded-xl text-sm font-medium text-gray-900 hover:shadow-md transition-all group" data-testid="cta-flashcards">
                  <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-teal-500" /> Flashcards</div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link href={profession.studyResourceCTAs.mockExams} className="flex items-center justify-between px-4 py-3 bg-white rounded-xl text-sm font-medium text-gray-900 hover:shadow-md transition-all group" data-testid="cta-mock-exams">
                  <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-teal-500" /> Mock Exams</div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
                <Link href={profession.studyResourceCTAs.clinicalCases} className="flex items-center justify-between px-4 py-3 bg-white rounded-xl text-sm font-medium text-gray-900 hover:shadow-md transition-all group" data-testid="cta-clinical-cases">
                  <div className="flex items-center gap-2"><Brain className="w-4 h-4 text-teal-500" /> Clinical Simulations</div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-gray-50" data-testid="profession-articles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{profession.shortName} Articles & Guides</h2>
          <p className="text-gray-600 mb-8">In-depth articles covering education, certification, career paths, clinical skills, and exam preparation for {profession.name} professionals.</p>

          {publishedArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedArticles.map((article: any) => (
                <Link key={article.id} href={`/allied-health/${profession.slug}/${article.slug}`} className="block group">
                  <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-teal-200 transition-all h-full" data-testid={`card-article-${article.slug}`}>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{article.metaDescription || article.targetKeyword}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{article.wordCount ? `${Math.round(article.wordCount / 200)} min read` : ""}</span>
                      <span className="text-teal-600 text-xs font-medium flex items-center gap-1">Read More <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profession.topicTemplates.slice(0, 6).map(topic => (
                <div key={topic.slug} className="bg-white rounded-xl border border-gray-100 p-5 opacity-80" data-testid={`card-topic-${topic.slug}`}>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">{topic.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{topic.targetKeyword}</p>
                  <span className="text-xs text-gray-400 italic">Coming soon</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
