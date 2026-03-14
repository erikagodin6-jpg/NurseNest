const TIER_PREFIXES = /^(RN|NP|RPN|LVN|NCLEX|NCLEX-RN|NCLEX-PN|REx-PN)\s+/i;
const TIER_SUFFIXES_PAREN = /\s+\((RN|NP|RPN|LVN|NCLEX|RPN\/LVN|RPN\/RN)\)$/i;
const TIER_SUFFIXES_BARE = /\s+(RN|NP|RPN|LVN|NCLEX)$/i;
const TIER_SLUG_SUFFIX = /-(rn|np|rpn|lvn|nclex)$/i;

export function canonicalDisplayName(name: string): string {
  if (!name) return name;
  return name
    .replace(TIER_PREFIXES, "")
    .replace(TIER_SUFFIXES_PAREN, "")
    .replace(TIER_SUFFIXES_BARE, "")
    .trim();
}

export function slugToDisplayName(slug: string): string {
  if (!slug) return slug;
  const stripped = slug.replace(TIER_SLUG_SUFFIX, "");
  return stripped.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function canonicalSlug(slug: string): string {
  if (!slug) return slug;
  return slug.replace(TIER_SLUG_SUFFIX, "");
}
