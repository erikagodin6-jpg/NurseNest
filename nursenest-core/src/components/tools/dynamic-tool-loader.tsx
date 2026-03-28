"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { ImplementedToolSlug } from "@/lib/platform-tools/tool-registry";
import { useToolPageTelemetry } from "@/lib/platform-tools/tool-analytics";
import { ToolInteractiveErrorBoundary } from "@/components/tools/tool-interactive-error-boundary";
import { ToolSkeleton } from "@/components/tools/tool-skeleton";
import { importToolModule } from "@/components/tools/tool-async-imports";

export function DynamicToolLoader({ slug }: { slug: ImplementedToolSlug }) {
  useToolPageTelemetry(slug);

  const Tool = useMemo(
    () =>
      dynamic(
        () => importToolModule(slug),
        {
          loading: () => <ToolSkeleton />,
          ssr: false,
        },
      ),
    [slug],
  );

  return (
    <ToolInteractiveErrorBoundary slug={slug}>
      <Tool />
    </ToolInteractiveErrorBoundary>
  );
}
