"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { trackToolClientError } from "@/lib/platform-tools/tool-analytics";

type Props = { slug: string; children: ReactNode };

type State = { error: Error | null };

/**
 * Catches render/handler errors inside a single tool chunk so the rest of the marketing shell stays up.
 * Next.js `error.tsx` still handles route-level failures; this covers client-only tool bugs.
 */
export class ToolInteractiveErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    trackToolClientError(this.props.slug, error.message || "boundary");
    if (process.env.NODE_ENV === "development") {
      console.warn("[tool-boundary]", this.props.slug, info.componentStack);
    }
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      return (
        <div className="rounded-xl border border-red-300/60 bg-red-500/10 p-6 text-center">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">This tool encountered an error.</p>
          <p className="mt-2 text-xs text-[var(--theme-muted-text)]">You can retry without leaving the page.</p>
          <button
            type="button"
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
