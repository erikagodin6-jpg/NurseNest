import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PremiumUpgradeCTA, PremiumContentGate, useNewGradAccess } from "./premium-cta";
import {
  ChevronRight, ArrowRight, FileText, Lock, CheckCircle2,
  Download, Eye, Sparkles
} from "lucide-react";

const RESUME_TIPS = [
  { title: "Lead with Clinical Rotations", desc: "List your clinical rotations with hours, setting, and patient population. This is your experience section as a new grad." },
  { title: "Quantify Everything", desc: "Instead of 'Managed patient care,' write 'Managed care for 4-6 patients per shift across medical-surgical units.'" },
  { title: "Highlight Certifications First", desc: "BLS, ACLS, PALS — list all certifications prominently. These are non-negotiable requirements that recruiters scan for immediately." },
  { title: "Use ATS-Friendly Formatting", desc: "Avoid graphics, tables, headers/footers, and fancy fonts. Use standard section headings and .docx format for ATS compatibility." },
  { title: "Customize for Each Application", desc: "Mirror the job posting's language. If they say 'patient-centered care,' use that exact phrase in your resume." },
  { title: "Include a Skills Section", desc: "List both hard skills (IV insertion, wound care, medication administration) and soft skills (SBAR communication, teamwork, critical thinking)." },
];

const TEMPLATE_TYPES = [
  { type: "resume", title: "Resume Templates", desc: "ATS-optimized nursing resume templates", count: "8+" },
  { type: "cover-letter", title: "Cover Letter Templates", desc: "Customizable frameworks for every specialty", count: "5+" },
  { type: "portfolio", title: "Portfolio Templates", desc: "Professional nursing portfolio structures", count: "3+" },
];

export default function ResumePage() {
  const { hasAccess } = useNewGradAccess();

  const { data: templates = [] } = useQuery({
    queryKey: ["/api/newgrad/templates", "resume"],
    queryFn: async () => {
      const res = await fetch("/api/newgrad/templates?type=resume");
      return res.ok ? res.json() : [];
    },
  });

  return (
    <div data-testid="newgrad-resume-page">
      <Navigation />
      <SEO
        title="New Grad Nurse Resume Builder & Templates | NurseNest"
        description="Build a standout nursing resume with ATS-optimized templates, cover letter frameworks, and portfolio templates designed for new graduate nurses."
        keywords="new grad nurse resume, nursing resume template, nurse cover letter, ATS resume nursing, new graduate nurse resume tips, nursing portfolio"
        canonicalPath="/newgrad/resume"
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
          { name: "Resume & Cover Letters", url: "https://www.nursenest.ca/newgrad/resume" },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50/30 to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad" className="hover:text-blue-600">New Grad Career Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-pink-700 font-medium">Resume & Cover Letters</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-pink-100 text-pink-700">
            <FileText className="w-4 h-4" /> Resume & Cover Letters
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            Nursing Resume Builder & Templates
          </h1>
          <p className="text-lg text-gray-600">
            Create a standout nursing resume that passes ATS systems and catches the attention of nurse managers. Free tips plus premium templates and builder tools.
          </p>
        </div>
      </section>

      <section className="py-16" data-testid="section-resume-tips">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Free Resume Tips for New Grads</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RESUME_TIPS.map((tip, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-all" data-testid={`tip-${i}`}>
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-500">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50" data-testid="section-templates">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-2xl font-bold text-gray-900">Premium Templates</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {TEMPLATE_TYPES.map((tt, i) => (
              <div key={i} className="bg-white rounded-xl border border-indigo-100 p-5" data-testid={`template-type-${i}`}>
                <FileText className="w-8 h-8 text-indigo-500 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{tt.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{tt.desc}</p>
                <span className="text-xs font-bold text-indigo-600">{tt.count} templates</span>
              </div>
            ))}
          </div>

          {hasAccess && templates.length > 0 ? (
            <div className="space-y-3">
              {templates.map((tmpl: any, i: number) => (
                <div key={tmpl.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between" data-testid={`template-${i}`}>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{tmpl.title}</h3>
                      <p className="text-sm text-gray-500">{tmpl.description}</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors" data-testid={`button-view-template-${i}`}>
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                </div>
              ))}
            </div>
          ) : !hasAccess ? (
            <div>
              <div className="space-y-3 mb-6">
                {["Med-Surg New Grad Resume", "ICU New Grad Resume", "ER New Grad Resume", "Professional Cover Letter", "Thank You Email Template"].map((name, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 opacity-60" data-testid={`preview-template-${i}`}>
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-600">{name}</span>
                  </div>
                ))}
              </div>
              <PremiumUpgradeCTA requiredEntitlement="toolkit" context="Unlock all resume templates, cover letter frameworks, and portfolio templates. Each template is ATS-tested and designed specifically for new graduate nurses." />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Templates are being prepared. Check back soon!</p>
          )}
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-pink-50 to-rose-50" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Complete Your Job Search Toolkit</h2>
          <p className="text-sm text-gray-500 mb-4">
            Need help with program applications or personal statements? <a href="https://applynest.ca" target="_blank" rel="noopener noreferrer" className="text-pink-700 font-semibold hover:underline" data-testid="link-applynest-resume">Visit ApplyNest for application tools and career-entry resources</a>.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/newgrad/interview" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-pink-700 rounded-xl font-semibold hover:bg-pink-50 transition-colors border border-pink-200" data-testid="link-interview">
              Interview Prep
            </Link>
            <Link href="/newgrad/salary" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-pink-700 rounded-xl font-semibold hover:bg-pink-50 transition-colors border border-pink-200" data-testid="link-salary">
              Salary Negotiation
            </Link>
            <Link href="/newgrad/certifications" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-pink-700 rounded-xl font-semibold hover:bg-pink-50 transition-colors border border-pink-200" data-testid="link-certifications">
              Certifications
            </Link>
            <Link href="/newgrad/clinical-references" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-pink-700 rounded-xl font-semibold hover:bg-pink-50 transition-colors border border-pink-200" data-testid="link-clinical-refs">
              Clinical References
            </Link>
            <Link href="/newgrad" className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors" data-testid="link-hub">
              Career Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
