import { Link, useLocation } from "wouter";
import { CAREER_CONFIGS, type CareerConfig, getCanonicalRoute } from "@shared/careers";
import {
  Wind, Ambulance, Pill, Microscope, Radio, BookOpen, Brain, FileText,
  Zap, GraduationCap, Wrench, Hand, Activity, Database
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { AlliedBreadcrumb } from "@/components/allied-breadcrumb";

const ALLIED_CAREERS = ["rrt", "paramedic", "pharmacyTech", "mlt", "imaging", "occupationalTherapy", "physicalTherapy", "healthInfoMgmt"] as const;

function getCareerIcon(slug: string) {
  switch (slug) {
    case "rrt": return <Wind className="w-4 h-4" />;
    case "paramedic": return <Ambulance className="w-4 h-4" />;
    case "pharmacy-tech": case "pharmacy-technician": return <Pill className="w-4 h-4" />;
    case "mlt": return <Microscope className="w-4 h-4" />;
    case "imaging": return <Radio className="w-4 h-4" />;
    case "occupational-therapy": return <Hand className="w-4 h-4" />;
    case "physical-therapy": return <Activity className="w-4 h-4" />;
    case "health-info-mgmt": return <Database className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
}

function getFeatureIcon(feature: string) {
  switch (feature) {
    case "qbank": return <BookOpen className="w-3.5 h-3.5" />;
    case "mock-exams": return <FileText className="w-3.5 h-3.5" />;
    case "flashcards": return <Brain className="w-3.5 h-3.5" />;
    case "study-plan": return <GraduationCap className="w-3.5 h-3.5" />;
    case "sims": return <Zap className="w-3.5 h-3.5" />;
    case "tools": return <Wrench className="w-3.5 h-3.5" />;
    default: return null;
  }
}

function getCurrentCareerFromUrl(location: string, alliedCareers: CareerConfig[]): CareerConfig | undefined {
  const segments = location.split("/").filter(Boolean);
  if (segments[0] === "allied-health" && segments[1]) {
    const canonicalMatch = alliedCareers.find(c => getCanonicalRoute(c.slug) === `/allied-health/${segments[1]}`);
    if (canonicalMatch) return canonicalMatch;
  }
  if (segments[0]) {
    const canonicalMatch = alliedCareers.find(c => getCanonicalRoute(c.slug) === `/${segments[0]}`);
    if (canonicalMatch) return canonicalMatch;
  }
  return undefined;
}

export function AlliedSubNav() {
  const [location] = useLocation();
  const { t } = useI18n();
  const alliedCareers = ALLIED_CAREERS.map(id => CAREER_CONFIGS[id]);
  const currentCareer = getCurrentCareerFromUrl(location, alliedCareers);

  if (!currentCareer) return null;

  const features = [
    { slug: "qbank", label: t("nav.allied.testBank") },
    { slug: "mock-exams", label: t("nav.allied.mockExams") },
    { slug: "flashcards", label: "Flashcards" },
    { slug: "study-plan", label: t("nav.allied.studyPlan") },
    { slug: "sims", label: t("nav.allied.caseSims") },
    { slug: "tools", label: t("nav.allied.aiTools") },
  ];

  function getFeatureHref(careerSlug: string, featureSlug: string) {
    if (featureSlug === "qbank") return `/qbank?career=${careerSlug}`;
    const canonical = getCanonicalRoute(careerSlug);
    return `${canonical}/${featureSlug}`;
  }

  function isFeatureActive(featureSlug: string) {
    if (!currentCareer) return false;
    if (featureSlug === "qbank") return location === "/qbank";
    const canonical = getCanonicalRoute(currentCareer.slug);
    return location === `${canonical}/${featureSlug}`;
  }

  const breadcrumbItems = [
    { label: currentCareer.shortName, href: getCanonicalRoute(currentCareer.slug) },
  ];

  return (
    <div data-testid="allied-sub-nav">
      <AlliedBreadcrumb items={breadcrumbItems} />
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto h-10 scrollbar-hide">
            <Link
              href={getCanonicalRoute(currentCareer.slug)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                location === getCanonicalRoute(currentCareer.slug)
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:text-teal-700 hover:bg-teal-50/50"
              }`}
              data-testid="subnav-career-home"
            >
              {getCareerIcon(currentCareer.slug)}
              {currentCareer.shortName}
            </Link>
            {features.map(f => (
              <Link
                key={f.slug}
                href={getFeatureHref(currentCareer.slug, f.slug)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isFeatureActive(f.slug)
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-600 hover:text-teal-700 hover:bg-teal-50/50"
                }`}
                data-testid={`subnav-${f.slug}`}
              >
                {getFeatureIcon(f.slug)}
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
