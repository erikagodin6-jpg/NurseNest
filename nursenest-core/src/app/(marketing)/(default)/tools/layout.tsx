import { notFound } from "next/navigation";
import { isClinicalToolsSurfaceEnabled } from "@/lib/feature-flags/restored-modules";

/** Route group for calculators only — never import interactive tool chunks into root or learner layouts. */
export default function MarketingToolsLayout({ children }: { children: React.ReactNode }) {
  if (!isClinicalToolsSurfaceEnabled()) notFound();
  return children;
}
