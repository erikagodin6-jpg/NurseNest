"use client";

import { useEffect } from "react";
import { initPosthogClient, trackClientEvent } from "@/lib/observability/posthog-client";

export function useToolPageTelemetry(slug: string): void {
  useEffect(() => {
    initPosthogClient();
    trackToolViewed(slug);
  }, [slug]);
}

export function trackToolViewed(slug: string): void {
  trackClientEvent("tool_viewed", { tool_slug: slug });
}

export function trackToolCalculated(slug: string, ok: boolean): void {
  trackClientEvent("tool_calculated", { tool_slug: slug, success: ok });
}

export function trackToolValidationError(slug: string, field: string): void {
  trackClientEvent("tool_validation_error", { tool_slug: slug, field });
}

export function trackToolClientError(slug: string, message: string): void {
  trackClientEvent("tool_client_error", { tool_slug: slug, message: message.slice(0, 120) });
}
