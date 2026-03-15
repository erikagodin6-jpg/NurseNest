import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { APPLYNEST_PROFESSIONS } from "@shared/schema";
import { Heart, Stethoscope, GraduationCap, Wind, Microscope, Radio, Pill, Ambulance, ArrowRight, Briefcase, FileText, MessageSquare, MapPin, CheckCircle, Mail, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, any> = {
  Heart, Stethoscope, GraduationCap, Wind, Microscope, Radio, Pill, Ambulance,
};

export default function ApplyNestLanding() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");

  const { data: profiles } = useQuery({
    queryKey: ["/api/applynest/career-profiles"],
    queryFn: async () => {
      const res = await fetch("/api/applynest/career-profiles");
      return res.json();
    },
  });

  const leadMutation = useMutation({
    mutationFn: async (data: { email: string; profession: string }) => {
      const res = await fetch("/api/applynest/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Something went wrong" }));
        throw new Error(err.error || "Failed to sign up");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "You're signed up!", description: "We'll send you job alerts and career resources." });
      setEmail("");
    },
    onError: () => {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      leadMutation.mutate({ email: email.trim(), profession: selectedProfession });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
      <section className="relative overflow-hidden px-4 py-16 sm:py-24" data-testid="section-applynest-hero">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            ApplyNest by NurseNest
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight" data-testid="text-applynest-title">
            Launch Your Healthcare Career with Confidence
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10" data-testid="text-applynest-subtitle">
            From graduation to your first job offer. Career guides, resume templates, interview prep, and job search resources for nursing and allied health professionals.
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3 mb-12" data-testid="form-lead-capture">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for job alerts"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              data-testid="input-email-signup"
              required
            />
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              data-testid="select-profession"
            >
              <option value="">All Professions</option>
              {APPLYNEST_PROFESSIONS.map((p) => (
                <option key={p.slug} value={p.slug}>{p.label}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={leadMutation.isPending}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              data-testid="button-signup"
            >
              {leadMutation.isPending ? "..." : "Get Alerts"}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-teal-500" /> Free career resources</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-teal-500" /> 8 healthcare professions</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-teal-500" /> Resume templates included</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-white dark:bg-gray-950" data-testid="section-profession-cards">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Choose Your Profession</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore career guides tailored to your healthcare profession with job market data, salary ranges, licensing requirements, and actionable job search resources.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPLYNEST_PROFESSIONS.map((prof) => {
              const Icon = iconMap[prof.icon] || Briefcase;
              const profile = profiles?.find((p: any) => p.profession === prof.slug);
              return (
                <Link key={prof.slug} href={`/applynest/careers/${prof.slug}`}>
                  <div className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-gray-900" data-testid={`card-profession-${prof.slug}`}>
                    <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{prof.label}</h3>
                    {profile?.salaryRangeJson && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {profile.salaryRangeJson.entry} - {profile.salaryRangeJson.senior}
                      </p>
                    )}
                    <span className="text-teal-600 dark:text-teal-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Career Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gray-50 dark:bg-gray-900" data-testid="section-resources">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Career Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/applynest/resume-templates">
              <div className="group p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer" data-testid="card-resume-templates">
                <FileText className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Resume Templates</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Healthcare-specific resume templates for new grads, experienced professionals, and specialty transitions.</p>
                <span className="text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Templates <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/applynest/interview-prep">
              <div className="group p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer" data-testid="card-interview-prep">
                <MessageSquare className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Interview Prep</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Common healthcare interview questions with sample answers, tips, and behavioral question guides.</p>
                <span className="text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start Preparing <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/applynest/job-search-guide">
              <div className="group p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer" data-testid="card-job-search">
                <MapPin className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Job Search Guide</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Where to find healthcare jobs, how to evaluate offers, negotiation tips, and credentialing timelines.</p>
                <span className="text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-white dark:bg-gray-950" data-testid="section-cross-links">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Prepare, Then Apply</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            ApplyNest works hand-in-hand with NurseNest's exam prep and new grad resources to help you succeed from classroom to career.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/new-grad">
              <div className="group flex items-center gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer" data-testid="link-new-grad-hub">
                <Star className="w-8 h-8 text-amber-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">New Grad Survival Hub</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">First-year guides, clinical skills, unit orientation tips, and mentorship resources.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0 ml-auto" />
              </div>
            </Link>
            <Link href="/mock-exams">
              <div className="group flex items-center gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer" data-testid="link-exam-prep">
                <GraduationCap className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Exam Prep & Mock Exams</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Practice exams, question banks, and study resources for NCLEX, NREMT, NBRC, ARRT, and more.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0 ml-auto" />
              </div>
            </Link>
            <Link href="/free-practice">
              <div className="group flex items-center gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer" data-testid="link-test-bank">
                <FileText className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Test Bank</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1,200+ practice questions organized by body system, profession, and difficulty level.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0 ml-auto" />
              </div>
            </Link>
            <Link href="/flashcards">
              <div className="group flex items-center gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer" data-testid="link-flashcards">
                <Briefcase className="w-8 h-8 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Study Flashcards</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interactive flashcards covering pharmacology, pathophysiology, and clinical concepts.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors flex-shrink-0 ml-auto" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-teal-600 dark:bg-teal-800" data-testid="section-cta">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-12 h-12 text-teal-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Get Career Updates Delivered</h2>
          <p className="text-teal-100 mb-8">Join healthcare professionals who receive weekly job alerts, interview tips, and career development resources.</p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3" data-testid="form-bottom-cta">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-teal-400 text-white placeholder-teal-200 focus:ring-2 focus:ring-white focus:border-transparent"
              data-testid="input-email-bottom"
              required
            />
            <button
              type="submit"
              disabled={leadMutation.isPending}
              className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50"
              data-testid="button-signup-bottom"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
