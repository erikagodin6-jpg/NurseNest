import {
  getNewGradBase, getSiteBase, todayDate, simpleUrl
} from "./helpers";

export async function generateNewGradPages(): Promise<string[]> {
  const base = getNewGradBase();
  const siteBase = getSiteBase();
  const now = todayDate();
  const urls: string[] = [];

  urls.push(simpleUrl(`${base}/`, now, "weekly", "1.0"));

  const hubPages = [
    { path: "/interview-lab", priority: "0.9", freq: "weekly" },
    { path: "/resume-builder", priority: "0.9", freq: "weekly" },
    { path: "/cover-letter", priority: "0.9", freq: "weekly" },
    { path: "/first-90-days", priority: "0.9", freq: "monthly" },
    { path: "/clinical-confidence", priority: "0.9", freq: "weekly" },
    { path: "/pricing", priority: "0.8", freq: "monthly" },
  ];
  for (const page of hubPages) {
    urls.push(simpleUrl(`${base}${page.path}`, now, page.freq, page.priority));
  }

  const seoPages = [
    "new-grad-rn-interview-questions", "new-grad-rn-resume-guide",
    "new-grad-rn-cover-letter-examples", "first-90-days-as-a-new-nurse",
    "new-grad-rn-clinical-confidence", "new-grad-rn-job-search-guide",
    "new-nurse-orientation-survival-guide", "nursing-interview-behavioral-questions",
    "nursing-interview-clinical-scenarios", "new-grad-nurse-salary-guide",
    "nursing-specialties-for-new-grads", "night-shift-survival-guide-new-nurse",
    "preceptor-relationship-guide-new-nurse", "new-grad-rn-time-management",
    "imposter-syndrome-new-nurse", "new-grad-rn-skills-checklist",
    "new-grad-nurse-survival-guide",
  ];
  for (const slug of seoPages) {
    urls.push(simpleUrl(`${base}/${slug}`, now, "monthly", "0.8"));
  }

  urls.push(simpleUrl(`${siteBase}/newgrad`, now, "weekly", "1.0"));
  const careerHubPages = [
    { path: "/newgrad/guides", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/career", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/interview", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/resume", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/workplace", priority: "0.8", freq: "monthly" },
    { path: "/newgrad/burnout", priority: "0.8", freq: "monthly" },
    { path: "/newgrad/salary", priority: "0.9", freq: "monthly" },
    { path: "/newgrad/professional-development", priority: "0.8", freq: "monthly" },
    { path: "/newgrad/certifications", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/certifications/bls", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/certifications/acls", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/certifications/pals", priority: "0.9", freq: "weekly" },
    { path: "/newgrad/certifications/tncc", priority: "0.8", freq: "monthly" },
    { path: "/newgrad/certifications/nrp", priority: "0.8", freq: "monthly" },
    { path: "/newgrad/certifications/cen", priority: "0.8", freq: "monthly" },
    { path: "/newgrad/certifications/ccrn", priority: "0.8", freq: "monthly" },
  ];
  for (const page of careerHubPages) {
    urls.push(simpleUrl(`${siteBase}${page.path}`, now, page.freq, page.priority));
  }

  return urls;
}
