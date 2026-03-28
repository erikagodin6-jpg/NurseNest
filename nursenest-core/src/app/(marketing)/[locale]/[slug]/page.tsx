import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPage } from "@/components/seo/programmatic-seo-page";
import { CORE_HOSTED_MARKETING_LOCALES } from "@/lib/i18n/marketing-locale-policy";
import { buildProgrammaticMetadata } from "@/lib/seo/programmatic-metadata";
import { getAllProgrammaticSlugs, getProgrammaticSeoPage } from "@/lib/seo/programmatic-registry";

export function generateStaticParams(): { locale: string; slug: string }[] {
  const slugs = getAllProgrammaticSlugs();
  const out: { locale: string; slug: string }[] = [];
  for (const locale of CORE_HOSTED_MARKETING_LOCALES) {
    for (const slug of slugs) {
      out.push({ locale, slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getProgrammaticSeoPage(slug);
  if (!page) return {};
  return buildProgrammaticMetadata(page, locale);
}

export default async function ProgrammaticSeoLocaleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = getProgrammaticSeoPage(slug);
  if (!page) notFound();
  return <ProgrammaticSeoPage page={page} locale={locale} />;
}
