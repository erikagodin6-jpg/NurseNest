import type { Metadata } from "next";
import { CORE_HOSTED_MARKETING_LOCALES, DEFAULT_MARKETING_LOCALE } from "@/lib/i18n/marketing-locale-policy";
import type { SeoPageDefinition } from "@/lib/seo/programmatic-registry";
import { absoluteUrl } from "@/lib/seo/site-origin";

function hreflangAlternates(slug: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(`/${slug}`),
    en: absoluteUrl(`/${slug}`),
  };
  for (const code of CORE_HOSTED_MARKETING_LOCALES) {
    languages[code] = absoluteUrl(`/${code}/${slug}`);
  }
  return languages;
}

export function buildProgrammaticMetadata(page: SeoPageDefinition, locale: string): Metadata {
  const slug = page.slug;
  const canonicalPath = `/${slug}`;
  const isDefaultLocale = locale === DEFAULT_MARKETING_LOCALE;

  return {
    title: page.title,
    description: page.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: hreflangAlternates(slug),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: isDefaultLocale ? absoluteUrl(canonicalPath) : absoluteUrl(`/${locale}/${slug}`),
      type: "article",
    },
  };
}
