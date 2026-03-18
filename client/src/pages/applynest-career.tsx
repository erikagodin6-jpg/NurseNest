import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { APPLYNEST_PROFESSIONS } from "@shared/schema";
import { ArrowLeft, DollarSign, Building2, Shield, FileText, MessageSquare, CheckSquare, MapPin, Briefcase, ArrowRight } from "lucide-react";

import { useI18n } from "@/lib/i18n";
export default function ApplyNestCareerPage() {
  const { t } = useI18n();
  const [, params] = useRoute("/applynest/careers/:profession");
  const profession = params?.profession || "";

  const profInfo = APPLYNEST_PROFESSIONS.find((p) => p.slug === profession);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["/api/applynest/career-profiles", profession],
    queryFn: async () => {
      const res = await fetch(`/api/applynest/career-profiles/${profession}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
    enabled: !!profession,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">{t("pages.applynestCareer.loadingCareerProfile")}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.careerProfileNotFound")}</h1>
        <Link href="/applynest" className="text-teal-600 hover:underline">{t("pages.applynestCareer.backToApplynest")}</Link>
      </div>
    );
  }

  const salary = profile.salaryRangeJson || {};

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 px-4 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/applynest" className="inline-flex items-center gap-1 text-teal-200 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to ApplyNest
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3" data-testid="text-career-title">
            {profile.professionLabel} Career Guide
          </h1>
          <p className="text-teal-100 text-lg max-w-3xl" data-testid="text-career-subtitle">
            Job market overview, salary data, licensing requirements, resume tips, interview prep, and your first-job checklist.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <section data-testid="section-job-market">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.jobMarketOverview")}</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" data-testid="text-job-market">
            {profile.jobMarketOverview}
          </p>
        </section>

        <section data-testid="section-salary">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.salaryRanges")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {salary.entry && (
              <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" data-testid="card-salary-entry">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("pages.applynestCareer.entryLevel")}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{salary.entry}</p>
              </div>
            )}
            {salary.mid && (
              <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" data-testid="card-salary-mid">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("pages.applynestCareer.midcareer")}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{salary.mid}</p>
              </div>
            )}
            {salary.senior && (
              <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" data-testid="card-salary-senior">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("pages.applynestCareer.seniorSpecialist")}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{salary.senior}</p>
              </div>
            )}
          </div>
          {salary.note && <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">{salary.note}</p>}
        </section>

        <section data-testid="section-employers">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.topEmployers")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(profile.topEmployers || []).map((employer: string, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800" data-testid={`text-employer-${i}`}>
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{employer}</span>
              </div>
            ))}
          </div>
        </section>

        <section data-testid="section-licensing">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.licensingRequirements")}</h2>
          </div>
          <div className="space-y-4">
            {(profile.licensingRequirements || []).map((lic: any, i: number) => (
              <div key={i} className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" data-testid={`card-licensing-${i}`}>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{lic.region}</h3>
                <ul className="space-y-2">
                  {(lic.requirements || []).map((req: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <CheckSquare className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section data-testid="section-resume-tips">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.resumeTips")}</h2>
          </div>
          <ul className="space-y-3">
            {(profile.resumeTips || []).map((tip: string, i: number) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900" data-testid={`text-resume-tip-${i}`}>
                <CheckSquare className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
          <Link href="/applynest/resume-templates" className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium mt-4 hover:underline" data-testid="link-resume-templates">
            Browse Resume Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <section data-testid="section-interview">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.sampleInterviewQuestions")}</h2>
          </div>
          <div className="space-y-4">
            {(profile.interviewQuestions || []).map((iq: any, i: number) => (
              <div key={i} className="p-5 rounded-xl border border-gray-200 dark:border-gray-700" data-testid={`card-interview-${i}`}>
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Q: {iq.q}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm"><span className="font-medium text-gray-700 dark:text-gray-300">{t("pages.applynestCareer.sampleApproach")}</span> {iq.a}</p>
              </div>
            ))}
          </div>
          <Link href="/applynest/interview-prep" className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium mt-4 hover:underline" data-testid="link-interview-prep">
            Full Interview Prep Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <section data-testid="section-checklist">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("pages.applynestCareer.firstjobChecklist")}</h2>
          </div>
          <div className="p-6 rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20">
            <ol className="space-y-3">
              {(profile.firstJobChecklist || []).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3" data-testid={`text-checklist-${i}`}>
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700" data-testid="section-other-professions">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("pages.applynestCareer.exploreOtherProfessions")}</h2>
          <div className="flex flex-wrap gap-2">
            {APPLYNEST_PROFESSIONS.filter((p) => p.slug !== profession).map((p) => (
              <Link key={p.slug} href={`/applynest/careers/${p.slug}`}>
                <span className="inline-block px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:border-teal-400 hover:text-teal-600 transition-colors cursor-pointer" data-testid={`link-profession-${p.slug}`}>
                  {p.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
