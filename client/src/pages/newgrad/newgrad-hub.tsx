import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useNewGradEntitlements } from "./premium-cta";
import { useI18n } from "@/lib/i18n";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  ArrowRight, BookOpen, FileText, Brain, GraduationCap,
  CheckCircle2, ChevronRight, Briefcase, Heart, Shield, Users,
  AlertTriangle, MessageSquare, Award, Target, Lightbulb,
  Star, TrendingUp, DollarSign, Flame, Sparkles, Lock,
  Stethoscope, ClipboardList, Compass, LayoutGrid
} from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  pink: "bg-pink-50 text-pink-600 border-pink-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  green: "bg-green-50 text-green-600 border-green-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100",
};

const ICON_BG_MAP: Record<string, string> = {
  blue: "bg-blue-100",
  indigo: "bg-indigo-100",
  purple: "bg-purple-100",
  pink: "bg-pink-100",
  emerald: "bg-emerald-100",
  orange: "bg-orange-100",
  green: "bg-green-100",
  amber: "bg-amber-100",
  teal: "bg-teal-100",
};

export default function NewGradHub() {
  const { hasAnyPremium: hasNewGradAccess } = useNewGradEntitlements();
  const { t } = useI18n();

  const CATEGORIES = [
    { icon: Compass, titleKey: "newGrad.hub.cat.transitionTitle", descKey: "newGrad.hub.cat.transitionDesc", href: "/newgrad/survival-guide", color: "teal", free: true },
    { icon: BookOpen, titleKey: "newGrad.hub.cat.guidesTitle", descKey: "newGrad.hub.cat.guidesDesc", href: "/newgrad/guides", color: "blue", free: true },
    { icon: MessageSquare, titleKey: "newGrad.hub.cat.interviewTitle", descKey: "newGrad.hub.cat.interviewDesc", href: "/newgrad/interview", color: "purple", free: false },
    { icon: FileText, titleKey: "newGrad.hub.cat.resumeTitle", descKey: "newGrad.hub.cat.resumeDesc", href: "/newgrad/resume", color: "pink", free: false },
    { icon: Users, titleKey: "newGrad.hub.cat.workplaceTitle", descKey: "newGrad.hub.cat.workplaceDesc", href: "/newgrad/workplace", color: "emerald", free: true },
    { icon: ClipboardList, titleKey: "newGrad.hub.cat.scenariosTitle", descKey: "newGrad.hub.cat.scenariosDesc", href: "/newgrad/scenarios", color: "teal", free: false },
    { icon: LayoutGrid, titleKey: "newGrad.hub.cat.unitTitle", descKey: "newGrad.hub.cat.unitDesc", href: "/newgrad/guides", color: "indigo", free: true },
    { icon: Flame, titleKey: "newGrad.hub.cat.burnoutTitle", descKey: "newGrad.hub.cat.burnoutDesc", href: "/newgrad/burnout", color: "orange", free: true },
    { icon: TrendingUp, titleKey: "newGrad.hub.cat.careerTitle", descKey: "newGrad.hub.cat.careerDesc", href: "/newgrad/career", color: "indigo", free: true },
    { icon: DollarSign, titleKey: "newGrad.hub.cat.salaryTitle", descKey: "newGrad.hub.cat.salaryDesc", href: "/newgrad/salary", color: "green", free: false },
    { icon: Award, titleKey: "newGrad.hub.cat.certsTitle", descKey: "newGrad.hub.cat.certsDesc", href: "/newgrad/certifications", color: "amber", free: false },
  ];

  const PREMIUM_FEATURES = [
    { icon: FileText, titleKey: "newGrad.hub.premiumFeat1Title", descKey: "newGrad.hub.premiumFeat1Desc" },
    { icon: MessageSquare, titleKey: "newGrad.hub.premiumFeat2Title", descKey: "newGrad.hub.premiumFeat2Desc" },
    { icon: DollarSign, titleKey: "newGrad.hub.premiumFeat3Title", descKey: "newGrad.hub.premiumFeat3Desc" },
    { icon: Award, titleKey: "newGrad.hub.premiumFeat4Title", descKey: "newGrad.hub.premiumFeat4Desc" },
  ];

  const TESTIMONIALS = [
    { nameKey: "newGrad.hub.testimonial1Name", roleKey: "newGrad.hub.testimonial1Role", contentKey: "newGrad.hub.testimonial1Content", rating: 5 },
    { nameKey: "newGrad.hub.testimonial2Name", roleKey: "newGrad.hub.testimonial2Role", contentKey: "newGrad.hub.testimonial2Content", rating: 5 },
    { nameKey: "newGrad.hub.testimonial3Name", roleKey: "newGrad.hub.testimonial3Role", contentKey: "newGrad.hub.testimonial3Content", rating: 5 },
  ];

  const ECOSYSTEM_LINKS = [
    { titleKey: "newGrad.hub.eco1Title", descKey: "newGrad.hub.eco1Desc", href: "/newgrad/clinical-references", icon: Stethoscope },
    { titleKey: "newGrad.hub.eco2Title", descKey: "newGrad.hub.eco2Desc", href: "/newgrad/certifications", icon: Award },
    { titleKey: "newGrad.hub.eco3Title", descKey: "newGrad.hub.eco3Desc", href: "/newgrad/survival-guide", icon: Shield },
    { titleKey: "newGrad.hub.eco4Title", descKey: "newGrad.hub.eco4Desc", href: "/newgrad/professional-development", icon: TrendingUp },
    { titleKey: "newGrad.hub.eco5Title", descKey: "newGrad.hub.eco5Desc", href: "/new-grad/nursing", icon: GraduationCap },
    { titleKey: "newGrad.hub.eco6Title", descKey: "newGrad.hub.eco6Desc", href: "/exam-prep", icon: Brain },
  ];

  const FAQ_DATA = [
    { questionKey: "newGrad.hub.faq1Q", answerKey: "newGrad.hub.faq1A" },
    { questionKey: "newGrad.hub.faq2Q", answerKey: "newGrad.hub.faq2A" },
    { questionKey: "newGrad.hub.faq3Q", answerKey: "newGrad.hub.faq3A" },
    { questionKey: "newGrad.hub.faq4Q", answerKey: "newGrad.hub.faq4A" },
  ];

  const faqForStructuredData = FAQ_DATA.map(f => ({ question: t(f.questionKey), answer: t(f.answerKey) }));
  const faqStructuredData = buildFaqStructuredData(faqForStructuredData);

  const hubStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "New Grad Career Hub - NurseNest",
    "description": t("newGrad.hub.seoDescription"),
    "url": "https://www.nursenest.ca/newgrad",
    "isPartOf": {
      "@type": "WebSite",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca",
    },
  };

  const FREE_CONTENT = [
    { titleKey: "newGrad.hub.freeItem1Title", descKey: "newGrad.hub.freeItem1Desc", href: "/newgrad/survival-guide" },
    { titleKey: "newGrad.hub.freeItem2Title", descKey: "newGrad.hub.freeItem2Desc", href: "/newgrad/guides" },
    { titleKey: "newGrad.hub.freeItem3Title", descKey: "newGrad.hub.freeItem3Desc", href: "/newgrad/workplace" },
    { titleKey: "newGrad.hub.freeItem4Title", descKey: "newGrad.hub.freeItem4Desc", href: "/newgrad/burnout" },
    { titleKey: "newGrad.hub.freeItem5Title", descKey: "newGrad.hub.freeItem5Desc", href: "/newgrad/career" },
    { titleKey: "newGrad.hub.freeItem6Title", descKey: "newGrad.hub.freeItem6Desc", href: "/newgrad/clinical-references" },
    { titleKey: "newGrad.hub.freeItem7Title", descKey: "newGrad.hub.freeItem7Desc", href: "/newgrad/workplace" },
    { titleKey: "newGrad.hub.freeItem8Title", descKey: "newGrad.hub.freeItem8Desc", href: "/newgrad/professional-development" },
  ];

  return (
    <div data-testid="newgrad-hub-page">
      <Navigation />
      <SEO
        title={t("newGrad.hub.seoTitle")}
        description={t("newGrad.hub.seoDescription")}
        keywords="new grad nurse career hub, new graduate nurse resources, nursing career development, nurse interview prep, nursing resume builder, new nurse first year, nursing salary negotiation, transition to practice nursing, new grad nurse confidence"
        canonicalPath="/newgrad"
        structuredData={hubStructuredData}
        additionalStructuredData={[faqStructuredData]}
        breadcrumbs={[
          { name: t("newGrad.common.home"), url: "https://www.nursenest.ca" },
          { name: t("newGrad.common.newGradCareerHub"), url: "https://www.nursenest.ca/newgrad" },
        ]}
      />

      <section className="relative py-16 sm:py-24 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-indigo-100/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">{t("newGrad.common.home")}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">{t("newGrad.common.newGradCareerHub")}</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700" data-testid="badge-career-hub">
              <GraduationCap className="w-4 h-4" />
              {t("newGrad.hub.badge")}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight" data-testid="text-hero-title">
              {t("newGrad.hub.heroTitle1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t("newGrad.hub.heroTitle2")}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed" data-testid="text-hero-subtitle">
              {t("newGrad.hub.heroSubtitle")}
            </p>
            <p className="text-base text-gray-500 mb-8" data-testid="text-hero-detail">
              {t("newGrad.hub.heroDetail")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/newgrad/guides" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200" data-testid="button-explore-guides">
                {t("newGrad.hub.exploreGuides")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/newgrad/survival-guide" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200" data-testid="button-survival-guide">
                {t("newGrad.common.survivalGuide")} <ArrowRight className="w-4 h-4" />
              </Link>
              {!hasNewGradAccess && (
                <Link href="/newgrad#premium" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-colors border border-indigo-200" data-testid="button-view-toolkit">
                  <Sparkles className="w-4 h-4" /> {t("newGrad.hub.viewToolkit")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100" data-testid="section-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-guides"><div className="text-2xl font-bold text-gray-900">50+</div><div className="text-sm text-gray-500">{t("newGrad.hub.statGuides")}</div></div>
            <div data-testid="stat-questions"><div className="text-2xl font-bold text-gray-900">40+</div><div className="text-sm text-gray-500">{t("newGrad.hub.statQuestions")}</div></div>
            <div data-testid="stat-scenarios"><div className="text-2xl font-bold text-gray-900">28</div><div className="text-sm text-gray-500">Workplace Scenarios</div></div>
            <div data-testid="stat-templates"><div className="text-2xl font-bold text-gray-900">16+</div><div className="text-sm text-gray-500">{t("newGrad.hub.statTemplates")}</div></div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-categories-title">{t("newGrad.hub.categoriesTitle")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("newGrad.hub.categoriesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {CATEGORIES.map((cat, i) => {
              const CatIcon = cat.icon;
              return (
                <Link key={i} href={cat.href} className="group" data-testid={`card-category-${i}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all h-full flex flex-col">
                    <div className={`w-10 h-10 rounded-xl ${ICON_BG_MAP[cat.color]} flex items-center justify-center mb-3`}>
                      <CatIcon className={`w-5 h-5 ${COLOR_MAP[cat.color].split(' ')[1]}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-blue-700 transition-colors">{t(cat.titleKey)}</h3>
                    <p className="text-xs text-gray-500 mb-3 flex-1">{t(cat.descKey)}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                        {t("newGrad.common.explore")} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                      {cat.free ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{t("newGrad.common.free")}</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">{t("newGrad.common.freePlusPremium")}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-free-content">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-green-100 text-green-700">
              <CheckCircle2 className="w-4 h-4" /> {t("newGrad.hub.alwaysFreeBadge")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t("newGrad.hub.freeTitle")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("newGrad.hub.freeDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FREE_CONTENT.map((item, i) => (
              <Link key={i} href={item.href} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group" data-testid={`link-free-content-${i}`}>
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 block">{t(item.titleKey)}</span>
                  <span className="text-xs text-gray-500">{t(item.descKey)}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-blue-50" id="premium" data-testid="section-premium-toolkit">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
              <Sparkles className="w-4 h-4" /> {t("newGrad.hub.premiumBadge")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t("newGrad.hub.premiumTitle")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("newGrad.hub.premiumDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {PREMIUM_FEATURES.map((feat, i) => {
              const FeatIcon = feat.icon;
              return (
                <div key={i} className="bg-white rounded-xl border border-indigo-100 p-6 hover:shadow-md transition-all" data-testid={`card-premium-feature-${i}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                      <FeatIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t(feat.titleKey)}</h3>
                      <p className="text-sm text-gray-500">{t(feat.descKey)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!hasNewGradAccess && (
            <div className="text-center">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200" data-testid="button-upgrade-toolkit">
                <Lock className="w-4 h-4" /> {t("newGrad.hub.unlockToolkit")} <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-gray-500 mt-3">{t("newGrad.hub.moneyBack")}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16" data-testid="section-ecosystem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-ecosystem-title">{t("newGrad.hub.ecosystemTitle")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("newGrad.hub.ecosystemDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ECOSYSTEM_LINKS.map((link, i) => {
              const LinkIcon = link.icon;
              return (
                <Link key={i} href={link.href} className="group" data-testid={`card-ecosystem-${i}`}>
                  <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all h-full">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <LinkIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors mb-1">{t(link.titleKey)}</h3>
                        <p className="text-xs text-gray-500">{t(link.descKey)}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-testimonials">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t("newGrad.hub.testimonialsTitle")}</h2>
            <p className="text-gray-600">{t("newGrad.hub.testimonialsDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`card-testimonial-${i}`}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 italic">"{t(testimonial.contentKey)}"</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t(testimonial.nameKey)}</p>
                  <p className="text-xs text-gray-500">{t(testimonial.roleKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t("newGrad.hub.faqTitle")}</h2>
          </div>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`card-faq-${i}`}>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{t(faq.questionKey)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(faq.answerKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-50 via-emerald-50/50 to-cyan-50" data-testid="section-career-step">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4" data-testid="text-career-step-title">{t("newGrad.hub.careerStepTitle")}</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t("newGrad.hub.careerStepDesc")}
          </p>
          <a
            href="https://applynest.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200"
            data-testid="button-explore-applynest"
          >
            {t("newGrad.hub.exploreApplyNest")} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t("newGrad.hub.bottomCtaTitle")}</h2>
          <p className="text-blue-100 mb-8">{t("newGrad.hub.bottomCtaDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/newgrad/guides" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors" data-testid="button-bottom-guides">
              {t("newGrad.hub.browseFreeGuides")}
            </Link>
            <Link href="/newgrad/clinical-references" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-bottom-clinical-references">
              {t("newGrad.common.clinicalReferences")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
