export function clinicalSkillsHubHref(query?: { examTarget?: string; audience?: string }): string {
  const params = new URLSearchParams();
  if (query?.examTarget) params.set("examTarget", query.examTarget);
  if (query?.audience) params.set("audience", query.audience);
  const qs = params.toString();
  return qs ? `/app/clinical-skills?${qs}` : "/app/clinical-skills";
}

export function clinicalSkillHref(
  slug: string,
  query?: { examTarget?: string; audience?: string },
): string {
  const params = new URLSearchParams();
  if (query?.examTarget) params.set("examTarget", query.examTarget);
  if (query?.audience) params.set("audience", query.audience);
  const qs = params.toString();
  return qs ? `/app/clinical-skills/${slug}?${qs}` : `/app/clinical-skills/${slug}`;
}
