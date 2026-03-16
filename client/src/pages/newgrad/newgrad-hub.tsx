import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useNewGradEntitlements } from "./premium-cta";
import {
  ArrowRight, BookOpen, FileText, Brain, GraduationCap,
  CheckCircle2, ChevronRight, Briefcase, Heart, Shield, Users,
  AlertTriangle, MessageSquare, Award, Target, Lightbulb,
  Star, TrendingUp, DollarSign, Flame, Sparkles, Lock
} from "lucide-react";

const CATEGORIES = [
  { icon: BookOpen, title: "Comprehensive Guides", desc: "Evidence-based guides covering your entire transition from student to confident practitioner.", href: "/newgrad/guides", color: "blue" },
  { icon: TrendingUp, title: "Career Development", desc: "Strategic career planning, goal setting, and professional growth frameworks.", href: "/newgrad/career", color: "indigo" },
  { icon: MessageSquare, title: "Interview Preparation", desc: "100+ behavioral and clinical questions with STAR-format answers and nurse manager insights.", href: "/newgrad/interview", color: "purple" },
  { icon: FileText, title: "Resume & Cover Letters", desc: "ATS-optimized templates and builders designed specifically for healthcare professionals.", href: "/newgrad/resume", color: "pink" },
  { icon: Users, title: "Workplace Navigation", desc: "Navigate preceptor relationships, team dynamics, and workplace culture with confidence.", href: "/newgrad/workplace", color: "emerald" },
  { icon: Flame, title: "Burnout Prevention", desc: "Protect your mental health with evidence-based resilience strategies and self-care tools.", href: "/newgrad/burnout", color: "orange" },
  { icon: DollarSign, title: "Salary & Negotiation", desc: "Know your worth and negotiate confidently with data-driven salary guides.", href: "/newgrad/salary", color: "green" },
  { icon: Award, title: "Professional Development", desc: "Continuing education, certifications, and leadership development pathways.", href: "/newgrad/professional-development", color: "amber" },
];

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  pink: "bg-pink-50 text-pink-600 border-pink-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  green: "bg-green-50 text-green-600 border-green-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
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
};

const PREMIUM_FEATURES = [
  { icon: FileText, title: "Resume Builder & Templates", desc: "Professional nursing-specific resume and cover letter templates that pass ATS systems." },
  { icon: MessageSquare, title: "Full Interview Question Bank", desc: "100+ questions with detailed STAR-format answers, tips, and nurse manager insights." },
  { icon: DollarSign, title: "Salary Negotiation Strategies", desc: "Data-driven negotiation guides with scripts and market salary data." },
  { icon: Award, title: "Portfolio & Career Planning", desc: "Professional portfolio templates and structured career planning frameworks." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "New Grad RN, ICU", content: "The interview question bank was a game-changer. I walked into my interview feeling prepared and confident. Got my dream ICU position!", rating: 5 },
  { name: "James T.", role: "New Grad RN, Med-Surg", content: "The resume templates helped me stand out from hundreds of applicants. I had three offers within two weeks of graduating.", rating: 5 },
  { name: "Priya K.", role: "New Grad NP, Primary Care", content: "The salary negotiation guide helped me negotiate $8,000 more than the initial offer. This toolkit paid for itself immediately.", rating: 5 },
];

export default function NewGradHub() {
  const { hasAnyPremium: hasNewGradAccess } = useNewGradEntitlements();

  return (
    <div data-testid="newgrad-hub-page">
      <Navigation />
      <SEO
        title="New Grad Career Hub - Career Development & Success Toolkit | NurseNest"
        description="Complete career development hub for new graduate nurses. Free guides, interview prep, resume tools, salary negotiation, and professional development resources."
        keywords="new grad nurse career, new graduate nurse resources, nursing career development, nurse interview prep, nursing resume, new nurse salary negotiation"
        canonicalPath="/newgrad"
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-700 font-medium">New Grad Career Hub</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700" data-testid="badge-career-hub">
              <GraduationCap className="w-4 h-4" />
              Career Development Hub
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" data-testid="text-hero-title">
              Launch Your Nursing Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Confidence</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-hero-subtitle">
              Free career guides, interview preparation, workplace navigation, and professional development resources. Plus premium tools for resume building, salary negotiation, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/newgrad/guides" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200" data-testid="button-explore-guides">
                Explore Free Guides <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/newgrad/survival-guide" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200" data-testid="button-survival-guide">
                Survival Guide <ArrowRight className="w-4 h-4" />
              </Link>
              {!hasNewGradAccess && (
                <Link href="/newgrad#premium" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-colors border border-indigo-200" data-testid="button-view-toolkit">
                  <Sparkles className="w-4 h-4" /> View Success Toolkit
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100" data-testid="section-stats">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-testid="stat-guides"><div className="text-2xl font-bold text-gray-900">50+</div><div className="text-sm text-gray-500">Free Guides</div></div>
            <div data-testid="stat-questions"><div className="text-2xl font-bold text-gray-900">100+</div><div className="text-sm text-gray-500">Interview Questions</div></div>
            <div data-testid="stat-templates"><div className="text-2xl font-bold text-gray-900">15+</div><div className="text-sm text-gray-500">Resume Templates</div></div>
            <div data-testid="stat-confidence"><div className="text-2xl font-bold text-gray-900">94%</div><div className="text-sm text-gray-500">User Confidence Score</div></div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-categories-title">Everything You Need for Your First Year</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Eight comprehensive categories covering every aspect of your transition from student to confident healthcare professional.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat, i) => {
              const CatIcon = cat.icon;
              return (
                <Link key={i} href={cat.href} className="group" data-testid={`card-category-${i}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all h-full">
                    <div className={`w-12 h-12 rounded-xl ${ICON_BG_MAP[cat.color]} flex items-center justify-center mb-4`}>
                      <CatIcon className={`w-6 h-6 ${COLOR_MAP[cat.color].split(' ')[1]}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{cat.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{cat.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium">
                      Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
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
              <CheckCircle2 className="w-4 h-4" /> Free Content
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Start with Free Career Guides</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Access our comprehensive library of career development guides at no cost. Every category includes free content to help you get started.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Transition to Practice Guide", desc: "Navigate the shift from classroom to clinical practice.", href: "/newgrad/guides" },
              { title: "Shift Organization Tips", desc: "Master time management and workflow efficiency.", href: "/newgrad/workplace" },
              { title: "Communication Strategies", desc: "Build effective professional relationships.", href: "/newgrad/workplace" },
              { title: "Burnout Prevention Basics", desc: "Protect your wellbeing from day one.", href: "/newgrad/burnout" },
              { title: "Career Pathway Planning", desc: "Map out your career goals and milestones.", href: "/newgrad/career" },
              { title: "Professional Growth Tips", desc: "Develop leadership skills and clinical expertise.", href: "/newgrad/professional-development" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group" data-testid={`link-free-content-${i}`}>
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 block">{item.title}</span>
                  <span className="text-xs text-gray-500">{item.desc}</span>
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
              <Sparkles className="w-4 h-4" /> Premium Toolkit
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">New Grad Success Toolkit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Unlock premium career tools designed to give you a competitive edge in your job search and first year.</p>
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
                      <h3 className="font-semibold text-gray-900 mb-1">{feat.title}</h3>
                      <p className="text-sm text-gray-500">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!hasNewGradAccess && (
            <div className="text-center">
              <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200" data-testid="button-upgrade-toolkit">
                <Lock className="w-4 h-4" /> Unlock Success Toolkit <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-gray-500 mt-3">14-day money-back guarantee</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16" data-testid="section-testimonials">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">What New Grads Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`card-testimonial-${i}`}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 italic">"{t.content}"</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-50 via-emerald-50/50 to-cyan-50" data-testid="section-career-step">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Preparing for Your Next Career Step</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to take the leap from study to practice? ApplyNest helps healthcare graduates navigate program applications, craft standout personal statements, and discover scholarship opportunities — all in one place.
          </p>
          <a
            href="https://applynest.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200"
            data-testid="button-applynest-career-step"
          >
            Explore ApplyNest <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Launch Your Career?</h2>
          <p className="text-blue-100 mb-8">Start with our free guides today, or unlock the full Success Toolkit for premium career tools.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/newgrad/guides" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors" data-testid="button-bottom-guides">
              Browse Free Guides
            </Link>
            <Link href="/newgrad/clinical-references" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors border border-blue-400" data-testid="button-bottom-clinical-references">
              Clinical References <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
