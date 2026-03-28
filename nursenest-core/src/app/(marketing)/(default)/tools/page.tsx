import type { Metadata } from "next";
import { ToolsHubPage } from "@/components/marketing/tools-hub-page";
import { DEFAULT_MARKETING_LOCALE } from "@/lib/i18n/marketing-locale-policy";

export const metadata: Metadata = {
  title: "Clinical calculators & tools",
  description: "Fast med math and reference utilities for nursing study. Educational use only.",
  alternates: { canonical: "/tools" },
  openGraph: { url: "/tools" },
};

export default function ToolsIndexPage() {
  return <ToolsHubPage locale={DEFAULT_MARKETING_LOCALE} />;
}
