import { ToolSkeleton } from "@/components/tools/tool-skeleton";

export default function ToolsLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8 h-10 w-48 animate-pulse rounded bg-[var(--theme-muted-text)]/20" />
      <ToolSkeleton />
    </div>
  );
}
