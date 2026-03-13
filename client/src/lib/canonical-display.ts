const TIER_PREFIXES = /^(RN|NP|RPN|LVN|NCLEX|NCLEX-RN|NCLEX-PN|REx-PN)\s+/i;
const TIER_SUFFIXES = /\s+\((RN|NP|RPN|LVN|NCLEX|RPN\/LVN|RPN\/RN)\)$/i;
const TIER_SLUG_SUFFIX = /-(rn|np|rpn|lvn|nclex)$/i;

export function canonicalDisplayName(name: string): string {
  if (!name) return name;
  return name
    .replace(TIER_PREFIXES, "")
    .replace(TIER_SUFFIXES, "")
    .trim();
}

export function canonicalSlug(slug: string): string {
  if (!slug) return slug;
  return slug.replace(TIER_SLUG_SUFFIX, "");
}
