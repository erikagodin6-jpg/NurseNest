import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolsToolShell } from "@/components/tools/tools-tool-shell";
import { isToolSlug } from "@/lib/tools/tool-registry";
import marketingEn from "@/content/marketing-en.json";

type Props = { params: Promise<{ slug: string }> };

function metaForSlug(slug: string): { title: string; description: string; canonical: string } | null {
  if (slug === "med-math") {
    return {
      title: marketingEn["tools.medMath.metaTitle"] ?? "Medication math",
      description: marketingEn["tools.medMath.metaDescription"] ?? "",
      canonical: `/tools/${slug}`,
    };
  }
  if (slug === "lab-values") {
    return {
      title: marketingEn["tools.labValues.metaTitle"] ?? "Lab values",
      description: marketingEn["tools.labValues.metaDescription"] ?? "",
      canonical: `/tools/${slug}`,
    };
  }
  if (slug === "electrolyte-abg") {
    return {
      title: marketingEn["tools.electrolyteAbg.metaTitle"] ?? "Electrolyte & ABG",
      description: marketingEn["tools.electrolyteAbg.metaDescription"] ?? "",
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
