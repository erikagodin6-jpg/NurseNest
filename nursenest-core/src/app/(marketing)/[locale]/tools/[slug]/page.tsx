import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DynamicToolLoader } from "@/components/tools/dynamic-tool-loader";
import {
  IMPLEMENTED_TOOL_SLUGS,
  getToolBySlug,
  type ImplementedToolSlug,
} from "@/lib/platform-tools/tool-registry";
import { isToolSlugEnabled } from "@/lib/platform-tools/tool-flags";
import { loadMarketingMessages } from "@/lib/marketing-i18n/load-marketing-messages";
import { formatMarketingMessage } from "@/lib/marketing-i18n-core";

function isImplementedSlug(s: string): s is ImplementedToolSlug {
  return (IMPLEMENTED_TOOL_SLUGS as readonly string[]).includes(s);
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!isImplementedSlug(slug) || !isToolSlugEnabled(slug)) {
    return { title: "Tool" };
  }
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const messages = await loadMarketingMessages(locale);
  return {
    title: formatMarketingMessage(messages, tool.titleKey),
    description: formatMarketingMessage(messages, tool.descriptionKey),
    alternates: { canonical: `/${locale}/tools/${slug}` },
    robots: tool.seoIndexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function LocalizedToolSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isImplementedSlug(slug) || !isToolSlugEnabled(slug)) notFound();
  return <DynamicToolLoader slug={slug} />;
}
