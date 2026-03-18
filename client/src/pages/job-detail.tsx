import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { SEO } from "@/components/seo";
import { useI18n } from "@/lib/i18n";
import {
  MapPin, Building2, DollarSign, Clock, Briefcase, GraduationCap,
  CheckCircle2, ArrowLeft, FileText, MessageSquare, ArrowRight,
  Star, Heart, ExternalLink, Share2
} from "lucide-react";

function formatSalary(min?: number, max?: number, currency?: string, period?: string) {
  if (!min && !max) return null;
  const fmt = (n: number) => {
    if (currency === "CAD") return `CA$${n.toLocaleString()}`;
    return `$${n.toLocaleString()}`;
  };
  const periodLabel = period === "hour" ? "/hr" : "/yr";
  if (min && max) return `${fmt(min)} – ${fmt(max)}${periodLabel}`;
  if (min) return `From ${fmt(min)}${periodLabel}`;
  return `Up to ${fmt(max!)}${periodLabel}`;
}

function formatExperienceLevel(level: string) {
  const map: Record<string, string> = {
    new_grad: "New Graduate",
    entry_level: "Entry Level",
    "1_2_years": "1-2 Years Experience",
  };
  return map[level] || level;
}

function formatEmploymentType(type: string) {
  const map: Record<string, string> = {
    full_time: "Full-Time",
    part_time: "Part-Time",
    contract: "Contract",
    per_diem: "Per Diem",
  };
  return map[type] || type;
}

function buildJobPostingJsonLd(job: any) {
  const data: any = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt ? new Date(job.postedAt).toISOString().split("T")[0] : undefined,
    employmentType: ({ full_time: "FULL_TIME", part_time: "PART_TIME", contract: "CONTRACTOR", per_diem: "PER_DIEM" } as Record<string, string>)[job.employmentType] || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.employer,
      description: job.employerDescription,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location?.split(",")[0]?.trim(),
        addressRegion: job.state || job.location?.split(",")[1]?.trim(),
        addressCountry: job.country || "US",
      },
    },
    qualifications: job.qualifications?.join(". "),
    experienceRequirements: formatExperienceLevel(job.experienceLevel),
    occupationalCategory: job.profession,
  };

  if (job.salaryMin || job.salaryMax) {
    data.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salaryCurrency || "USD",
      value: {
        "@type": "QuantitativeValue",
        ...(job.salaryMin && job.salaryMax
          ? { minValue: job.salaryMin, maxValue: job.salaryMax }
          : job.salaryMin
          ? { value: job.salaryMin }
          : { value: job.salaryMax }),
        unitText: job.salaryPeriod === "hour" ? "HOUR" : "YEAR",
      },
    };
  }

  if (job.expiresAt) {
    data.validThrough = new Date(job.expiresAt).toISOString().split("T")[0];
  }

  return data;
}

export default function JobDetail() {
  const { t } = useI18n();
  const [match, params] = useRoute("/jobs/:slug");
  const slug = params?.slug || "";

  const { data: job, isLoading, error } = useQuery<any>({
    queryKey: ["job", slug],
    queryFn: async () => {
      const res = await fetch(`/api/jobs/by-slug/${slug}`);
      if (!res.ok) throw new Error("Job not found");
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!job || error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2" data-testid="text-job-not-found">
            {t("jobs.notFoundTitle")}
          </h1>
          <p className="text-gray-500 mb-6">{t("jobs.notFoundDesc")}</p>
          <Link href="/jobs" className="text-blue-600 hover:text-blue-700 font-medium" data-testid="link-back-to-jobs">
            {t("jobs.backToJobs")}
          </Link>
        </div>
      </div>
    );
  }

  const salary = formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod);
  const daysAgo = Math.floor((Date.now() - new Date(job.postedAt).getTime()) / (1000 * 60 * 60 * 24));
  const postedLabel = daysAgo === 0 ? "Posted today" : daysAgo === 1 ? "Posted yesterday" : `Posted ${daysAgo} days ago`;
  const jsonLd = buildJobPostingJsonLd(job);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <SEO
        title={`${job.title} at ${job.employer} | NurseNest Jobs`}
        description={`${job.title} - ${job.employer} in ${job.location}. ${job.description?.slice(0, 120)}...`}
        keywords={`${job.profession} jobs, ${job.specialty || ""} jobs, ${job.location} healthcare jobs, new grad ${job.profession.toLowerCase()} jobs`}
        canonicalPath={`/jobs/${job.slug}`}
        structuredData={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 mb-6 group" data-testid="link-back-jobs">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {t("jobs.backToJobs")}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6 sm:p-8 border-b">
            <div className="flex flex-wrap gap-2 mb-3">
              {job.featured && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-full">
                  <Star className="w-3 h-3" /> Featured
                </span>
              )}
              <span className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                {job.profession}
              </span>
              {job.specialty && (
                <span className="text-xs px-2.5 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">
                  {job.specialty}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3" data-testid="text-job-detail-title">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> {job.employer}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {job.location}
              </span>
              {salary && (
                <span className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-100">
                  <DollarSign className="w-4 h-4" /> {salary}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" /> {formatExperienceLevel(job.experienceLevel)}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> {formatEmploymentType(job.employmentType)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {postedLabel}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-3" data-testid="text-section-about">{t("jobs.aboutRole")}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{job.description}</p>
            </section>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3" data-testid="text-section-responsibilities">{t("jobs.responsibilities")}</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3" data-testid="text-section-requirements">{t("jobs.requirements")}</h2>
                <ul className="space-y-2">
                  {job.requirements.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3" data-testid="text-section-qualifications">{t("jobs.qualifications")}</h2>
                <ul className="space-y-2">
                  {job.qualifications.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3" data-testid="text-section-benefits">{t("jobs.benefits")}</h2>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm">
                      <Heart className="w-3.5 h-3.5" /> {benefit}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {job.employerDescription && (
              <section>
                <h2 className="text-lg font-semibold mb-3" data-testid="text-section-employer">{t("jobs.aboutEmployer")}</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{job.employerDescription}</p>
              </section>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 border border-blue-100 dark:border-blue-900">
          <h3 className="text-xl font-bold mb-2" data-testid="text-applying-cta-heading">{t("jobs.applyingCtaTitle")}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t("jobs.applyingCtaDescription")}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/newgrad/resume" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border hover:shadow-md transition-all group" data-testid="link-detail-resume">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{t("jobs.ctaResumeBuild")}</h4>
                <p className="text-xs text-gray-500">{t("jobs.ctaResumeDesc")}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link href="/newgrad/interview" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border hover:shadow-md transition-all group" data-testid="link-detail-interview">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{t("jobs.ctaInterviewPrep")}</h4>
                <p className="text-xs text-gray-500">{t("jobs.ctaInterviewDesc")}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/jobs" className="text-blue-600 hover:text-blue-700 font-medium text-sm" data-testid="link-browse-more">
            {t("jobs.browseMore")}
          </Link>
        </div>
      </div>
    </div>
  );
}
