import type { ComponentType } from "react";
import type { ImplementedToolSlug } from "@/lib/platform-tools/tool-registry";

/**
 * Central switch for webpack to split one async chunk per tool. Only the opened tool loads.
 * Do not import calculator files from layouts, providers, or learner routes.
 */
export function importToolModule(slug: ImplementedToolSlug): Promise<{ default: ComponentType<unknown> }> {
  switch (slug) {
    case "dose-per-kg":
      return import("@/components/tools/calculators/dose-per-kg-tool");
    case "infusion-ml-hr":
      return import("@/components/tools/calculators/infusion-ml-hr-tool");
    case "iv-drip":
      return import("@/components/tools/calculators/iv-drip-tool");
    case "units":
      return import("@/components/tools/calculators/units-tool");
    case "lab-reference":
      return import("@/components/tools/calculators/lab-reference-tool");
    case "abg":
      return import("@/components/tools/calculators/abg-helper-tool");
  }
}
