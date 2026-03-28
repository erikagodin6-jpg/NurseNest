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
import { DEFAULT_MARKETING_LOCALE } from "@/lib/i18n/marketing-locale-policy";

function isImplementedSlug(s: string): s is ImplementedToolSlug {
  return (IMPLEMENTED_TOOL_SLUGS as readonly string[]).includes(s);
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isImplementedSlug(slug) || !isToolSlugEnabled(slug)) {
    return { title: "Tool" };
  }
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const messages = await loadMarketingMessages(DEFAULT_MARKETING_LOCALE);
  return {
    title: formatMarketingMessage(messages, tool.titleKey),
    description: formatMarketingMessage(messages, tool.descriptionKey),
    alternates: { canonical: `/tools/${slug}` },
    robots: tool.seoIndexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function ToolSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isImplementedSlug(slug) || !isToolSlugEnabled(slug)) notFound();
  return <DynamicToolLoader slug={slug} />;
}
