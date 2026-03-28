import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolsToolShell } from "@/components/tools/tools-tool-shell";
import { isToolSlug } from "@/lib/tools/tool-registry";
import { DEFAULT_MARKETING_LOCALE } from "@/lib/i18n/marketing-locale-policy";
import { loadMarketingMessagesSync } from "@/lib/marketing-i18n/load-marketing-messages";

type Props = { params: Promise<{ slug: string }> };

const enMessages = loadMarketingMessagesSync(DEFAULT_MARKETING_LOCALE);

function metaForSlug(slug: string): { title: string; description: string; canonical: string } | null {
  if (slug === "med-math") {
    return {
      title: enMessages["tools.medMath.metaTitle"] ?? "Medication math",
      description: enMessages["tools.medMath.metaDescription"] ?? "",
      canonical: `/tools/${slug}`,
    };
  }
  if (slug === "lab-values") {
    return {
      title: enMessages["tools.labValues.metaTitle"] ?? "Lab values",
      description: enMessages["tools.labValues.metaDescription"] ?? "",
      canonical: `/tools/${slug}`,
    };
  }
  if (slug === "electrolyte-abg") {
    return {
      title: enMessages["tools.electrolyteAbg.metaTitle"] ?? "Electrolyte & ABG",
      description: enMessages["tools.electrolyteAbg.metaDescription"] ?? "",
      canonical: `/tools/${slug}`,
    };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = metaForSlug(slug);
  if (!m) return {};
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  if (!isToolSlug(slug)) notFound();
  return <ToolsToolShell slug={slug} />;
}
