import { useState } from "react";
import { Link, useLocation } from "wouter";
import { CAREER_CONFIGS, type CareerConfig } from "@shared/careers";
import {
  Menu, X, ChevronDown, User, LogOut, Wind, Ambulance, Pill, Microscope, Radio,
  BookOpen, Brain, FileText, Zap, GraduationCap, BarChart3, Wrench
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const ALLIED_CAREERS = ["rrt", "paramedic", "pharmacyTech", "mlt", "imaging"] as const;

function getCareerIcon(slug: string) {
  switch (slug) {
    case "rrt": return <Wind className="w-4 h-4" />;
    case "paramedic": return <Ambulance className="w-4 h-4" />;
    case "pharmacy-tech": return <Pill className="w-4 h-4" />;
    case "mlt": return <Microscope className="w-4 h-4" />;
    case "imaging": return <Radio className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
}

function getFeatureIcon(feature: string) {
  switch (feature) {
    case "qbank": return <BookOpen className="w-4 h-4" />;
    case "mock-exams": return <FileText className="w-4 h-4" />;
    case "flashcards": return <Brain className="w-4 h-4" />;
    case "study-plan": return <GraduationCap className="w-4 h-4" />;
    case "sims": return <Zap className="w-4 h-4" />;
    case "tools": return <Wrench className="w-4 h-4" />;
    default: return <BarChart3 className="w-4 h-4" />;
  }
}

function getCurrentCareerFromUrl(location: string, alliedCareers: CareerConfig[]): CareerConfig | undefined {
  const segments = location.split("/").filter(Boolean);
  if (segments[0] === "careers" && segments[1]) {
    return alliedCareers.find(c => c.slug === segments[1]);
  }
  const searchParams = new URLSearchParams(window.location.search);
  const careerParam = searchParams.get("career");
  if (careerParam) {
    return alliedCareers.find(c => c.slug === careerParam);
  }
  return undefined;
}

export function AlliedNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAdmin } = useAuth();

  const alliedCareers = ALLIED_CAREERS.map(id => CAREER_CONFIGS[id]);
  const currentCareer = getCurrentCareerFromUrl(location, alliedCareers);

  const features = [
    { slug: "qbank", label: "Question Bank" },
    { slug: "mock-exams", label: "Mock Exams" },
    { slug: "flashcards", label: "Flashcards" },
    { slug: "study-plan", label: "Study Plan" },
    { slug: "sims", label: "Case Sims" },
    { slug: "tools", label: "AI Tools" },
  ];

  function getFeatureHref(careerSlug: string, featureSlug: string) {
    if (featureSlug === "qbank") return `/qbank?career=${careerSlug}`;
    return `/careers/${careerSlug}/${featureSlug}`;
  }

  function isFeatureActive(featureSlug: string) {
    if (!currentCareer) return false;
    if (featureSlug === "qbank") return location === "/qbank";
    return location === `/careers/${currentCareer.slug}/${featureSlug}`;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-teal-100 shadow-sm" data-testid="allied-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group" data-testid="link-allied-home">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-gray-900">NurseNest</span>
                <span className="text-lg font-bold text-teal-600 ml-1">Allied</span>
                <span className="block text-[10px] text-gray-400 -mt-1 tracking-wide">Healthcare Exam Academy</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 ml-6">
              <Link href="/careers" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location === "/careers" ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:text-teal-700 hover:bg-teal-50/50"}`} data-testid="link-careers">
                Careers
              </Link>

              <div className="relative" onMouseEnter={() => setCareerDropdownOpen(true)} onMouseLeave={() => setCareerDropdownOpen(false)}>
                <button className="px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-teal-700 hover:bg-teal-50/50 flex items-center gap-1" data-testid="button-career-dropdown">
                  {currentCareer ? currentCareer.shortName : "Study"} <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {careerDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50" data-testid="dropdown-careers">
                    {alliedCareers.filter(c => c.enabled).map(career => (
                      <Link key={career.slug} href={`/careers/${career.slug}`} className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-teal-50 transition-colors ${currentCareer?.slug === career.slug ? "bg-teal-50 text-teal-700 font-medium" : "text-gray-700"}`} data-testid={`link-career-${career.slug}`}>
                        {getCareerIcon(career.slug)}
                        <div>
                          <div className="font-medium">{career.shortName}</div>
                          <div className="text-xs text-gray-400">{career.examNames[0]}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {currentCareer && features.map(f => (
                <Link key={f.slug} href={getFeatureHref(currentCareer.slug, f.slug)} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${isFeatureActive(f.slug) ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:text-teal-700 hover:bg-teal-50/50"}`} data-testid={`link-${f.slug}`}>
                  {getFeatureIcon(f.slug)}
                  {f.label}
                </Link>
              ))}

              <Link href="/pricing" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location === "/pricing" ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:text-teal-700 hover:bg-teal-50/50"}`} data-testid="link-pricing">
                Pricing
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/account" className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors" data-testid="link-account">
                  <User className="w-4 h-4" />
                  {user.username}
                </Link>
                {isAdmin && (
                  <Link href="/admin/allied" className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors" data-testid="link-admin-allied">
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/pricing" className="hidden sm:block px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm" data-testid="button-get-started">
                Get Started Free
              </Link>
            )}

            <button className="lg:hidden p-2 text-gray-600 hover:text-teal-700" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-teal-100 shadow-lg" data-testid="mobile-nav">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link href="/careers" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 rounded-lg" onClick={() => setMobileOpen(false)} data-testid="mobile-link-careers">All Careers</Link>
            {alliedCareers.filter(c => c.enabled).map(career => (
              <div key={career.slug}>
                <Link href={`/careers/${career.slug}`} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 rounded-lg" onClick={() => setMobileOpen(false)} data-testid={`mobile-link-${career.slug}`}>
                  {getCareerIcon(career.slug)}
                  {career.shortName}
                </Link>
              </div>
            ))}
            <div className="border-t border-gray-100 my-2" />
            <Link href="/pricing" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 rounded-lg" onClick={() => setMobileOpen(false)} data-testid="mobile-link-pricing">Pricing</Link>
            {isAdmin && (
              <Link href="/admin/allied" className="block px-4 py-3 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg" onClick={() => setMobileOpen(false)} data-testid="mobile-link-admin">Admin Panel</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
