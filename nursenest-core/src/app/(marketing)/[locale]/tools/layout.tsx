import { notFound } from "next/navigation";
import { isClinicalToolsSurfaceEnabled } from "@/lib/feature-flags/restored-modules";

export default function LocalizedMarketingToolsLayout({ children }: { children: React.ReactNode }) {
  if (!isClinicalToolsSurfaceEnabled()) notFound();
  return children;
}
