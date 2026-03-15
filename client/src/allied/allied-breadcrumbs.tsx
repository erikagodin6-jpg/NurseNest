import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { CAREER_CONFIGS, getCanonicalRoute } from "@shared/careers";
import { useI18n } from "@/lib/i18n";
import { getMainSiteUrl } from "@/lib/locale-utils";

const ALLIED_CAREERS = ["rrt", "paramedic", "pharmacyTech", "mlt", "imaging", "occupationalTherapy", "physicalTherapy", "healthInfoMgmt"] as const;

const FEATURE_LABELS: Record<string, string> = {
  "qbank": "Question Bank",
  "mock-exams": "Mock Exams",
  "flashcards": "Flashcards",
  "study-plan": "Study Plan",
  "sims": "Case Simulations",
  "tools": "AI Tools",
  "lessons": "Lessons",
  "practice-questions": "Practice Questions",
  "exams": "Exams",
  "scenarios": "Scenarios",
  "pcp": "PCP",
  "acp": "ACP",
  "nremt": "NREMT",
  "ecg-library": "ECG Library",
  "drug-classes": "Drug Classes",
  "study-guide": "Study Guide",
  "adaptive-practice": "Adaptive Practice",
  "practice-exam-questions": "Practice Exam Questions",
  "image-drill": "Image Drill",
  "blog": "Blog",
  "questions": "Questions",
};

const PAGE_LABELS: Record<string, string> = {
  "/careers": "Careers",
  "/pricing": "Pricing",
  "/allied-health": "Allied Health Hub",
  "/qbank": "Question Bank",
  "/diagnostic": "Diagnostic",
  "/institutions": "Institutions",
  "/dashboard": "Dashboard",
  "/lessons": "Lessons",
};

function useLocaleCode(): string | undefined {
  const { language } = useI18n();
  return language === "en" ? undefined : language;
}

type Crumb = { label: string; href?: string };

function buildCrumbs(location: string, locale: string | undefined): Crumb[] {
  const crumbs: Crumb[] = [
    { label: "NurseNest", href: getMainSiteUrl("/", locale) },
    { label: "Allied Health", href: "/" },
  ];

  if (location === "/" || location === "") {
    return crumbs;
  }

  const alliedCareers = ALLIED_CAREERS.map(id => CAREER_CONFIGS[id]);

  if (PAGE_LABELS[location]) {
    crumbs.push({ label: PAGE_LABELS[location] });
    return crumbs;
  }

  const segments = location.split("/").filter(Boolean);

  const matchedCareer = alliedCareers.find(c => {
    const canonical = getCanonicalRoute(c.slug);
    return location.startsWith(canonical);
  });

  if (matchedCareer) {
    const canonical = getCanonicalRoute(matchedCareer.slug);
    const remaining = location.slice(canonical.length).split("/").filter(Boolean);

    if (remaining.length === 0) {
      crumbs.push({ label: matchedCareer.shortName });
    } else {
      crumbs.push({ label: matchedCareer.shortName, href: canonical });
      const featureSlug = remaining[0];
      const featureLabel = FEATURE_LABELS[featureSlug] || featureSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      crumbs.push({ label: featureLabel });
    }
    return crumbs;
  }

  if (segments[0] === "careers" && segments.length === 1) {
    crumbs.push({ label: "Careers" });
    return crumbs;
  }

  const pageLabel = segments[segments.length - 1]
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  crumbs.push({ label: pageLabel });

  return crumbs;
}

export function AlliedBreadcrumbs() {
  const [location] = useLocation();
  const locale = useLocaleCode();
  const crumbs = buildCrumbs(location, locale);

  if (crumbs.length <= 2 && location === "/") {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50/80 border-b border-gray-100" data-testid="allied-breadcrumbs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <ol className="flex items-center gap-1 py-2 text-xs sm:text-sm text-gray-500 overflow-x-auto">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className="flex items-center gap-1 whitespace-nowrap">
                {i > 0 && <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />}
                {isLast || !crumb.href ? (
                  <span className={isLast ? "text-teal-700 font-medium" : ""} data-testid={`breadcrumb-${i}`}>
                    {crumb.label}
                  </span>
                ) : crumb.href.startsWith("http") || crumb.href.startsWith("/?") ? (
                  <a href={crumb.href} className="hover:text-teal-600 transition-colors" data-testid={`breadcrumb-${i}`}>
                    {crumb.label}
                  </a>
                ) : (
                  <a href={crumb.href} className="hover:text-teal-600 transition-colors" data-testid={`breadcrumb-${i}`}>
                    {crumb.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
