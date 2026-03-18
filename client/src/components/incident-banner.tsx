import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHealthStatus, onHealthChange, startHealthPolling } from "@/lib/resilience";

export function IncidentBanner() {
  const [health, setHealth] = useState(getHealthStatus());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    startHealthPolling(30000);
    const unsub = onHealthChange((h) => {
      setHealth(h);
      if (h.status === "healthy") setDismissed(false);
    });
    return unsub;
  }, []);

  const isDown = health.status === "down";
  const isDegraded = health.status === "degraded";
  const showBanner = (isDown || isDegraded || health.emergency) && !dismissed;

  if (!showBanner) return null;

  return (
    <div
      className={`w-full px-4 py-2 flex items-center justify-between gap-3 text-sm ${
        isDown ? "bg-red-50 text-red-800 border-b border-red-200" :
        health.emergency ? "bg-orange-50 text-orange-800 border-b border-orange-200" :
        "bg-amber-50 text-amber-800 border-b border-amber-200"
      }`}
      data-testid="banner-incident"
    >
      <div className="flex items-center gap-2 flex-1">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          {isDown
            ? "Some services are experiencing issues. Your access and progress are protected."
            : health.emergency
            ? "We are operating in maintenance mode. Core features remain available."
            : "We are experiencing minor service delays. Everything should be back to normal shortly."}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2"
          onClick={() => window.location.reload()}
          data-testid="button-incident-refresh"
        >
          <RefreshCw className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2"
          onClick={() => setDismissed(true)}
          data-testid="button-incident-dismiss"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
