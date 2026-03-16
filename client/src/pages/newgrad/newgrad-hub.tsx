import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useNewGradEntitlements } from "./premium-cta";
import { buildFaqStructuredData } from "@/lib/structured-data";
import {
  ArrowRight, BookOpen, FileText, Brain, GraduationCap,
  CheckCircle2, ChevronRight, Briefcase, Heart, Shield, Users,
  AlertTriangle, MessageSquare, Award, Target, Lightbulb,
  Star, TrendingUp, DollarSign, Flame, Sparkles, Lock,
  Stethoscope, ClipboardList, Compass, LayoutGrid
} from "lucide-react";

const CATEGORIES = [
  { icon: Compass, title: "Transition to Practice", desc: "Structured guidance for navigating the shift from student to confident clinical practitioner.", href: "/newgrad/survival-guide", color: "teal", free: true },
  { icon: BookOpen, title: "Comprehensive Guides", desc: "Evidence-based guides covering communication, documentation, shift organization, and career pathways.", href: "/newgrad/guides", color: "blue", free: true },
  { icon: MessageSquare, title: "Interview Preparation", desc: "100+ behavioral and clinical questions with STAR-format answers and nurse manager insights.", href: "/newgrad/interview", color: "purple", free: false },
  { icon: FileText, title: "Resume & Cover Letters", desc: "ATS-optimized templates and builders designed specifically for healthcare professionals.", href: "/newgrad/resume", color: "pink", free: false },
  { icon: Users, title: "Workplace Professionalism", desc: "Navigate preceptor relationships, team dynamics, and workplace culture with confidence.", href: "/newgrad/workplace", color: "emerald", free: true },
  { icon: LayoutGrid, title: "Unit Organization & Prioritization", desc: "Master shift workflow, time management, and task prioritization strategies for every unit.", href: "/newgrad/guides", color: "indigo", free: true },
  { icon: Flame, title: "Burnout Prevention & Confidence", desc: "Protect your mental health and build sustainable clinical confidence with evidence-based resilience strategies.", href: "/newgrad/burnout", color: "orange", free: true },
  { icon: TrendingUp, title: "Career Development", desc: "Strategic career planning, goal setting, specialty exploration, and professional growth frameworks.", href: "/newgrad/career", color: "indigo", free: true },
  { icon: DollarSign, title: "Salary & Negotiation", desc: "Know your worth and negotiate confidently with data-driven salary guides and scripts.", href: "/newgrad/salary", color: "green", free: false },
  { icon: Award, title: "Certifications & Professional Growth", desc: "ACLS, BLS, PALS, TNCC prep guides plus continuing education and leadership development.", href: "/newgrad/certifications", color: "amber", free: false },
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

const PREMIUM_FEATURES = [
  { icon: FileText, title: "Resume Builder & Templates", desc: "Professional nursing-specific resume and cover letter templates that pass ATS systems." },
  { icon: MessageSquare, title: "Full Interview Question Bank", desc: "100+ questions with detailed STAR-format answers, tips, and nurse manager insights." },
  { icon: DollarSign, title: "Salary Negotiation Strategies", desc: "Data-driven negotiation guides with scripts and market salary data." },
  { icon: Award, title: "Certification Prep & Career Planning", desc: "ACLS, BLS, PALS, TNCC study tools plus professional portfolio templates." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "New Grad RN, ICU", content: "The interview question bank was a game-changer. I walked into my interview feeling prepared and confident. Got my dream ICU position!", rating: 5 },
  { name: "James T.", role: "New Grad RN, Med-Surg", content: "The resume templates helped me stand out from hundreds of applicants. I had three offers within two weeks of graduating.", rating: 5 },
  { name: "Priya K.", role: "New Grad NP, Primary Care", content: "The salary negotiation guide helped me negotiate $8,000 more than the initial offer. This toolkit paid for itself immediately.", rating: 5 },
];

const ECOSYSTEM_LINKS = [
  { title: "Clinical References", desc: "Quick-reference guides for bedside clinical decision-making.", href: "/newgrad/clinical-references", icon: Stethoscope },
  { title: "Certification Prep Hub", desc: "ACLS, BLS, PALS, TNCC, NRP, CEN, CCRN study guides.", href: "/newgrad/certifications", icon: Award },
  { title: "Survival Guide", desc: "Your complete first-year survival guide with clinical lessons.", href: "/newgrad/survival-guide", icon: Shield },
  { title: "Professional Development", desc: "CE requirements, specialty certifications, and leadership paths.", href: "/newgrad/professional-development", icon: TrendingUp },
  { title: "Profession-Specific Hubs", desc: "Tailored resources for nursing, paramedic, RT, MLT, and more.", href: "/new-grad/nursing", icon: GraduationCap },
  { title: "Exam Prep Resources", desc: "NCLEX, REx-PN, and allied health exam preparation tools.", href: "/exam-prep", icon: Brain },
];

const FAQ_DATA = [
  { question: "Is the New Grad Career Hub free?", answer: "Yes, a large portion of the hub is completely free including comprehensive guides, workplace navigation tips, burnout prevention strategies, career development frameworks, and transition-to-practice content. Premium resources like resume templates, the full interview question bank, salary negotiation scripts, and certification prep tools are available with a paid plan." },
  { question: "Who is this hub designed for?", answer: "The New Grad Career Hub is designed for nursing students in their final semester and new graduate nurses in their first 1-2 years of practice. Resources cover RN, RPN, LPN, and NP roles. We also have profession-specific hubs for paramedics, respiratory therapists, MLTs, and other allied health professionals." },
  { question: "What's included in the premium Success Toolkit?", answer: "The Success Toolkit includes ATS-optimized resume and cover letter templates, 100+ interview questions with detailed STAR-format answers, salary negotiation scripts with market data, certification prep study tools, and professional portfolio templates." },
  { question: "How is this different from exam prep?", answer: "Our exam prep tools (NCLEX, REx-PN) focus on passing your licensing exam. The New Grad Career Hub focuses on everything that comes after: landing your first job, surviving your first year, building clinical confidence, and advancing your career." },
];

const faqStructuredData = buildFaqStructuredData(FAQ_DATA);

const hubStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "New Grad Career Hub - NurseNest",
  "description": "Complete career development hub for new graduate nurses. Free guides, interview prep, resume tools, salary negotiation, clinical references, and professional development resources.",
  "url": "https://www.nursenest.ca/newgrad",
  "isPartOf": {
    "@type": "WebSite",
    "name": "NurseNest",
    "url": "https://www.nursenest.ca",
  },
};

export default function NewGradHub() {
  const { hasAnyPremium: hasNewGradAccess } = useNewGradEntitlements();

  return (
    <div data-testid="newgrad-hub-page">
      <Navigation />
      <SEO
        title="New Grad Career Hub - Career Development & First-Year Success Toolkit | NurseNest"
        description="Complete career hub for new graduate nurses. Free transition-to-practice guides, interview prep, resume tools, workplace navigation, burnout prevention, salary negotiation, and certification prep. Start your nursing career with confidence."
        keywords="new grad nurse career hub, new graduate nurse resources, nursing career development, nurse interview prep, nursing resume builder, new nurse first year, nursing salary negotiation, transition to practice nursing, new grad nurse confidence"
        canonicalPath="/newgrad"
        structuredData={hubStructuredData}
        additionalStructuredData={[faqStructuredData]}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
        ]}
      />

      <section className="relative py-16 sm:py-24 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-indigo-100/20 rounded-full blur-3xl" />
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight" data-testid="text-hero-title">
              You worked hard to get here.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Now own your first year.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed" data-testid="text-hero-subtitle">
              The transition from student to practicing nurse is one of the hardest things you'll do. We built this hub so you don't have to figure it out alone.
            </p>
            <p className="text-base text-gray-500 mb-8" data-testid="text-hero-detail">
              Free career guides, interview prep, workplace navigation, clinical references, and burnout prevention resources. Plus premium tools for resume building, salary negotiation, and certification prep.
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
            <div data-testid="stat-guides"><div className="text-2xl font-bold text-gray-900">50+</div><div className="text-sm text-gray-500">Free Guides & Lessons</div></div>
            <div data-testid="stat-questions"><div className="text-2xl font-bold text-gray-900">100+</div><div className="text-sm text-gray-500">Interview Questions</div></div>
            <div data-testid="stat-templates"><div className="text-2xl font-bold text-gray-900">15+</div><div className="text-sm text-gray-500">Resume Templates</div></div>
            <div data-testid="stat-certifications"><div className="text-2xl font-bold text-gray-900">8</div><div className="text-sm text-gray-500">Certification Prep Guides</div></div>
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-categories-title">Everything You Need for Your First Year</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Ten comprehensive categories covering every aspect of your transition from student to confident healthcare professional.</p>
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
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-blue-700 transition-colors">{cat.title}</h3>
                    <p className="text-xs text-gray-500 mb-3 flex-1">{cat.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                        Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                      {cat.free ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">Free + Premium</span>
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
              <CheckCircle2 className="w-4 h-4" /> Always Free
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Start Building Confidence Today</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">No sign-up required for these resources. Every category includes substantial free content to help you feel prepared and supported.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Transition to Practice Guide", desc: "Navigate the shift from classroom to clinical practice.", href: "/newgrad/survival-guide" },
              { title: "Shift Organization & Prioritization", desc: "Master time management and workflow efficiency.", href: "/newgrad/guides" },
              { title: "Workplace Communication Strategies", desc: "Build effective professional relationships and SBAR skills.", href: "/newgrad/workplace" },
              { title: "Burnout Prevention & Resilience", desc: "Protect your wellbeing from day one with evidence-based strategies.", href: "/newgrad/burnout" },
              { title: "Career Pathway Planning", desc: "Map out your career goals, milestones, and specialty options.", href: "/newgrad/career" },
              { title: "Clinical Reference Lessons", desc: "Quick-reference clinical guides with flashcards for bedside use.", href: "/newgrad/clinical-references" },
              { title: "Preceptor Relationship Building", desc: "Navigate different teaching styles and build strong mentorships.", href: "/newgrad/workplace" },
              { title: "Professional Growth Foundations", desc: "Develop leadership skills and build your clinical expertise.", href: "/newgrad/professional-development" },
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
            <p className="text-gray-600 max-w-2xl mx-auto">Go beyond the free resources. Get the tools that helped thousands of new grads land better jobs, negotiate higher salaries, and pass certifications on the first attempt.</p>
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

      <section className="py-16" data-testid="section-ecosystem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" data-testid="text-ecosystem-title">Connected Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The Career Hub connects seamlessly with clinical references, certification prep, profession-specific hubs, and exam preparation tools across NurseNest.</p>
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
                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors mb-1">{link.title}</h3>
                        <p className="text-xs text-gray-500">{link.desc}</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">What New Grads Say</h2>
            <p className="text-gray-600">Hear from nurses who used these resources during their transition to practice.</p>
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

      <section className="py-16" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`card-faq-${i}`}>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-50 via-emerald-50/50 to-cyan-50" data-testid="section-career-step">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4" data-testid="text-career-step-title">Preparing for Your Next Career Step</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to take the leap from study to practice? ApplyNest helps healthcare graduates navigate program applications, craft standout personal statements, and discover scholarship opportunities — all in one place.
          </p>
          <a
            href="https://applynest.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200"
            data-testid="button-explore-applynest"
          >
            Explore ApplyNest Application Tools <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Your First Year Doesn't Have to Be Your Hardest</h2>
          <p className="text-blue-100 mb-8">Start with our free guides today, or unlock the full Success Toolkit for premium career tools. Either way, you've got this.</p>
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
