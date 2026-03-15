import { Link } from "wouter";
import { useEffect } from "react";
import {
  ALLIED_HEALTH_PROFESSIONS,
  ALLIED_HEALTH_PROFESSION_SLUGS,
} from "@/allied/data/allied-health-professions";
import {
  Wind, Ambulance, Pill, Microscope, ScanLine, Monitor, HeartPulse,
  Hand, Activity, Scissors, ArrowRight, BookOpen, GraduationCap,
  TrendingUp, Users, Award, ChevronRight
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Wind, Ambulance, Pill, Microscope, ScanLine, Monitor, HeartPulse,
  Hand, Activity, Scissors,
};

function setMetaTags() {
  document.title = "Allied Health Careers & Study Resources | NurseNest";
  const setMeta = (attr: string, name: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content;
  };
  setMeta("name", "description", "Explore 10 allied health career paths with comprehensive study resources, certification guides, question banks, mock exams, and career information for healthcare professionals.");
  setMeta("property", "og:title", "Allied Health Careers & Study Resources | NurseNest");
  setMeta("property", "og:description", "Explore 10 allied health career paths with comprehensive study resources, certification guides, and exam prep tools.");
  setMeta("property", "og:type", "website");
  setMeta("property", "og:url", "https://www.nursenest.ca/allied-health");
  setMeta("name", "twitter:title", "Allied Health Careers & Study Resources | NurseNest");
  setMeta("name", "twitter:description", "Explore 10 allied health career paths with study resources and certification guides.");
  setMeta("name", "twitter:card", "summary_large_image");

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = "https://www.nursenest.ca/allied-health";

  const existingLd = document.getElementById("allied-health-hub-ld");
  if (existingLd) existingLd.remove();

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Allied Health Careers & Study Resources",
    "description": "Comprehensive resource hub for 10 allied health professions with study tools, certification guides, and career information.",
    "url": "https://www.nursenest.ca/allied-health",
    "publisher": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nursenest.ca" },
        { "@type": "ListItem", "position": 2, "name": "Allied Health", "item": "https://www.nursenest.ca/allied-health" }
      ]
    }
  };
  const script = document.createElement("script");
  script.id = "allied-health-hub-ld";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ldJson);
  document.head.appendChild(script);
}

export default function AlliedHealthHub() {
  useEffect(() => {
    setMetaTags();
    return () => {
      const el = document.getElementById("allied-health-hub-ld");
      if (el) el.remove();
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
    };
  }, []);

  const professions = ALLIED_HEALTH_PROFESSION_SLUGS.map(
    (slug) => ALLIED_HEALTH_PROFESSIONS[slug]
  );

  return (
    <div className="min-h-screen bg-white" data-testid="allied-health-hub-page">
      <nav className="bg-gray-50 border-b border-gray-100 py-3 px-4" data-testid="breadcrumb-nav">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-600 transition-colors" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium" data-testid="breadcrumb-current">Allied Health</span>
        </div>
      </nav>

      <section className="relative overflow-hidden py-16 sm:py-24" data-testid="hub-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-teal-100/80 text-teal-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6" data-testid="badge-hub">
              <GraduationCap className="w-4 h-4" />
              Allied Health Career Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid="text-hub-title">
              Allied Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Careers & Resources</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" data-testid="text-hub-subtitle">
              Explore 10 allied health professions with comprehensive career guides, certification information, study resources, and exam prep tools to launch or advance your healthcare career.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-gray-100" data-testid="hub-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: "10", label: "Career Paths" },
              { icon: BookOpen, value: "6,500+", label: "Practice Questions" },
              { icon: Award, value: "25+", label: "Certifications Covered" },
              { icon: TrendingUp, value: "15%+", label: "Avg Job Growth" },
            ].map((stat) => (
              <div key={stat.label} data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <stat.icon className="w-5 h-5 text-teal-500 mx-auto mb-1.5" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" data-testid="hub-professions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3" data-testid="text-professions-heading">
              Choose Your Career Path
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Each profession includes career guides, certification information, study tools, and exam preparation resources.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professions.map((profession) => {
              const Icon = ICON_MAP[profession.icon] || BookOpen;
              return (
                <Link
                  key={profession.slug}
                  href={`/allied-health/${profession.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-teal-200 transition-all"
                  data-testid={`card-profession-${profession.slug}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: profession.colorAccent }}
                  >
                    <Icon className="w-6 h-6" style={{ color: profession.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors" data-testid={`text-profession-name-${profession.slug}`}>
                    {profession.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {profession.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {profession.examNames.slice(0, 3).map((exam) => (
                      <span
                        key={exam}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{profession.salaryRange}</span>
                    <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-teal-50/50 to-white" data-testid="hub-why-nursenest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Study with NurseNest?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Exam-Aligned Test Banks", desc: "Thousands of questions mapped to official exam blueprints with detailed rationales that teach you the clinical reasoning behind every answer." },
              { icon: Award, title: "Multiple Certification Tracks", desc: "Content tailored for US and Canadian certification exams including ARRT, ARDMS, NBRC, NREMT, PTCB, NBCOT, ASCP, and more." },
              { icon: TrendingUp, title: "Adaptive Learning Engine", desc: "Our CAT-style practice engine adjusts question difficulty based on your performance, targeting your weak areas for maximum study efficiency." },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <feature.icon className="w-8 h-8 text-teal-500 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="hub-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" data-testid="text-cta-title">
              Ready to Start Your Healthcare Career?
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Choose your profession above to access career guides, certification info, and free study tools. Start preparing for your certification exam today.
            </p>
            <Link
              href="/allied-health/respiratory-therapy"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-500 text-white rounded-xl text-base font-semibold hover:bg-teal-400 transition-colors"
              data-testid="button-get-started"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
