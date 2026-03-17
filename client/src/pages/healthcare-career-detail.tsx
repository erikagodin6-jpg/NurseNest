import { useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { LocaleLink } from "@/lib/LocaleLink";
import { buildFaqStructuredData } from "@/lib/structured-data";
import { CAREER_SLUG_MAP } from "@/data/healthcare-career-data";
import { useI18n } from "@/lib/i18n";
import {
  ChevronRight, BookOpen, GraduationCap, Briefcase,
  DollarSign, TrendingUp, MapPin, CheckCircle2,
  ArrowRight, FileText, Award, Building2, Lightbulb
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HealthcareCareerDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const career = CAREER_SLUG_MAP[slug];
  const { t } = useI18n();

  if (!career) {
    return (
      <div className="min-h-screen bg-background" data-testid="career-not-found">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("careerGuide.notFound")}</h1>
          <p className="text-gray-600 mb-4">{t("careerGuide.notFoundDesc")}</p>
          <LocaleLink href="/healthcare-careers" className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700" data-testid="link-back-careers">
            {t("careerGuide.backToCareers")}
          </LocaleLink>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = career.icon;

  const faqStructuredData = buildFaqStructuredData(career.faqs);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": career.metaTitle,
    "description": career.metaDescription,
    "url": `https://www.nursenest.ca/healthcare-careers/${career.slug}`,
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
    "about": {
      "@type": "Occupation",
      "name": career.fullTitle,
      "estimatedSalary": {
        "@type": "MonetaryAmountDistribution",
        "name": "Annual Salary",
        "currency": "USD",
        "minValue": career.salaryMin,
        "maxValue": career.salaryMax,
        "unitText": "YEAR",
      },
    },
    "datePublished": "2025-01-15",
    "dateModified": "2026-03-15",
  };

  return (
    <div className="min-h-screen bg-background" data-testid={`career-detail-${career.slug}`}>
      <Navigation />
      <SEO
        title={career.metaTitle}
        description={career.metaDescription}
        keywords={career.metaKeywords}
        canonicalPath={`/healthcare-careers/${career.slug}`}
        structuredData={articleStructuredData}
        additionalStructuredData={[faqStructuredData]}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: t("careerGuide.backToCareers").replace("Back to ", "").replace("Retour aux ", "").replace("Volver a ", ""), url: "https://www.nursenest.ca/healthcare-careers" },
          { name: career.name, url: `https://www.nursenest.ca/healthcare-careers/${career.slug}` },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" data-testid="breadcrumb-nav">
          <LocaleLink href="/" className="hover:text-blue-600">Home</LocaleLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <LocaleLink href="/healthcare-careers" className="hover:text-blue-600">{t("careerGuide.backToCareers").replace("Back to ", "").replace("Retour aux ", "").replace("Volver a ", "")}</LocaleLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-purple-700 font-medium">{career.name}</span>
        </nav>

        <section className="mb-10" data-testid="section-career-hero">
          <div className={`bg-gradient-to-br from-${career.bgColor.replace("bg-", "")}/60 via-white to-white rounded-2xl border border-slate-200 p-8 sm:p-10`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl ${career.bgColor} flex items-center justify-center shrink-0`}>
                <Icon className={`w-7 h-7 ${career.color}`} />
              </div>
              <div>
                <Badge variant="outline" className="mb-2 text-xs border-purple-200 text-purple-700" data-testid="badge-career-guide">
                  {t("careerGuide.badge")}
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight" data-testid="text-career-title">
                  {career.name}
                </h1>
              </div>
            </div>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-4xl mb-6" data-testid="text-career-description">
              {career.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white/80 rounded-xl border border-slate-200/60 p-4 text-center" data-testid="stat-salary">
                <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-sm sm:text-base font-bold text-gray-900">{career.salaryRange}</p>
                <p className="text-xs text-slate-500 mt-1">{t("careerGuide.annualSalary")}</p>
              </div>
              <div className="bg-white/80 rounded-xl border border-slate-200/60 p-4 text-center" data-testid="stat-growth">
                <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-sm sm:text-base font-bold text-gray-900">{career.growthOutlook.split("—")[0].trim()}</p>
                <p className="text-xs text-slate-500 mt-1">{t("careerGuide.jobGrowth")}</p>
              </div>
              <div className="bg-white/80 rounded-xl border border-slate-200/60 p-4 text-center col-span-2 sm:col-span-1" data-testid="stat-environments">
                <MapPin className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-sm sm:text-base font-bold text-gray-900">{career.workEnvironments.length}+</p>
                <p className="text-xs text-slate-500 mt-1">{t("careerGuide.workSettings")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10" data-testid="section-role-overview">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" />
            {t("careerGuide.roleOverview")}
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base" data-testid="text-role-overview">
              {career.roleOverview}
            </p>
          </div>
        </section>

        <section className="mb-10" data-testid="section-education">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            {t("careerGuide.educationPathways")}
          </h2>
          <div className="space-y-4">
            {career.educationPathways.map((pathway, idx) => (
              <Card key={idx} className="border-slate-200/60" data-testid={`card-education-${idx}`}>
                <CardContent className="p-5 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{pathway.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pathway.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-10" data-testid="section-licensing">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            {t("careerGuide.licensingRequirements")}
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <ul className="space-y-3">
              {career.licensingRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600" data-testid={`licensing-req-${idx}`}>
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-10" data-testid="section-salary">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            {t("careerGuide.salaryOutlook")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-slate-200/60" data-testid="card-salary-range">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">{t("careerGuide.annualSalary")}</p>
                <p className="text-2xl font-bold text-gray-900">{career.salaryRange}</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200/60" data-testid="card-growth-outlook">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">{t("careerGuide.growthOutlook")}</p>
                <p className="text-sm font-semibold text-gray-900 leading-relaxed">{career.growthOutlook}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10" data-testid="section-work-environments">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            {t("careerGuide.workEnvironments")}
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {career.workEnvironments.map((env, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600" data-testid={`work-env-${idx}`}>
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{env}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10" data-testid="section-responsibilities">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-teal-600" />
            {t("careerGuide.responsibilities")}
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <ul className="space-y-3">
              {career.typicalResponsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600" data-testid={`responsibility-${idx}`}>
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-10" data-testid="section-advancement">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            {t("careerGuide.advancement")}
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {career.advancementOpportunities.map((opp, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600" data-testid={`advancement-${idx}`}>
                  <ArrowRight className="w-4 h-4 text-yellow-600 shrink-0" />
                  <span>{opp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10" data-testid="section-resources">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t("careerGuide.resources")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-slate-200/60 hover:shadow-md transition-shadow" data-testid="card-study-links">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-3">{t("careerGuide.studyResources")}</h3>
                <ul className="space-y-2">
                  {career.studyLinks.map((link, idx) => (
                    <li key={idx}>
                      <LocaleLink href={link.href} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1" data-testid={`study-link-${idx}`}>
                        <ChevronRight className="w-3 h-3" />
                        {link.title}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-200/60 hover:shadow-md transition-shadow" data-testid="card-exam-links">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-3">{t("careerGuide.examPrep")}</h3>
                <ul className="space-y-2">
                  {career.examPrepLinks.map((link, idx) => (
                    <li key={idx}>
                      <LocaleLink href={link.href} className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1" data-testid={`exam-link-${idx}`}>
                        <ChevronRight className="w-3 h-3" />
                        {link.title}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-200/60 hover:shadow-md transition-shadow" data-testid="card-career-tool-links">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-3">{t("careerGuide.careerTools")}</h3>
                <ul className="space-y-2">
                  {career.careerToolLinks.map((link, idx) => (
                    <li key={idx}>
                      <LocaleLink href={link.href} className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1" data-testid={`career-tool-link-${idx}`}>
                        <ChevronRight className="w-3 h-3" />
                        {link.title}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-10" data-testid="section-faq">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t("careerGuide.faq")}</h2>
          <div className="space-y-4">
            {career.faqs.map((faq, idx) => (
              <Card key={idx} className="border-slate-200/60" data-testid={`faq-item-${idx}`}>
                <CardContent className="p-5 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{faq.question}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-10" data-testid="section-cta">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              {t("careerGuide.ctaTitle")}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-6 max-w-2xl mx-auto">
              {t("careerGuide.ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LocaleLink href="/exam-prep" data-testid="cta-exam-prep">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  {t("careerGuide.ctaExamPrep")}
                </span>
              </LocaleLink>
              <LocaleLink href="/healthcare-careers" data-testid="cta-all-careers">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 border border-purple-200 rounded-xl text-sm font-medium hover:bg-purple-50 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                  {t("careerGuide.ctaAllCareers")}
                </span>
              </LocaleLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
