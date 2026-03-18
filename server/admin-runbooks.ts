import type { Request, Response, Express } from "express";

interface RunbookStep {
  id: string;
  title: string;
  description: string;
  type: "diagnosis" | "action" | "verification" | "communication";
  commands?: string[];
  killSwitchRef?: string;
  featureFlagRef?: string;
  apiEndpoint?: string;
  expectedOutcome?: string;
  warningLevel?: "info" | "warning" | "critical";
}

interface Runbook {
  id: string;
  title: string;
  incidentType: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnosisSteps: RunbookStep[];
  actionSteps: RunbookStep[];
  verificationSteps: RunbookStep[];
  killSwitchRefs: string[];
  featureFlagRefs: string[];
  communicationTemplate: {
    subject: string;
    internalMessage: string;
    externalMessage: string;
    statusPageUpdate: string;
  };
  estimatedResolutionMinutes: number;
  lastUsed: number | null;
  usageCount: number;
  tags: string[];
}

interface RunbookExecution {
  id: string;
  runbookId: string;
  startedAt: number;
  completedAt: number | null;
  executedBy: string;
  completedSteps: string[];
  currentStepId: string | null;
  notes: Record<string, string>;
  status: "in_progress" | "completed" | "aborted";
}

const runbookExecutions: RunbookExecution[] = [];

const PREDEFINED_RUNBOOKS: Runbook[] = [
  {
    id: "rb-exam-not-loading",
    title: "Exam Not Loading",
    incidentType: "exam_not_loading",
    severity: "critical",
    category: "exams",
    symptoms: [
      "Users report blank exam screen or infinite loading spinner",
      "Mock exam start button unresponsive",
      "Exam questions not rendering after selection",
      "Error messages about exam data unavailable",
      "High error rate on /api/mock-exams endpoints",
    ],
    likelyCauses: [
      "Database connection pool exhausted",
      "Exam service circuit breaker tripped",
      "Question bank data corrupted or missing",
      "Blueprint configuration invalid",
      "Memory pressure causing timeouts on question selection",
    ],
    diagnosisSteps: [
      {
        id: "ds-1",
        title: "Check circuit breaker status",
        description: "Verify the exam_service circuit breaker state. If open, the service has been auto-isolated due to failures.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/status",
        expectedOutcome: "Circuit breaker state should be 'closed'. If 'open', note the failure count.",
      },
      {
        id: "ds-2",
        title: "Check database connectivity",
        description: "Verify database is responding and connection pool is healthy.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/health-check",
        expectedOutcome: "Database health check should return 'healthy' with latency under 100ms.",
      },
      {
        id: "ds-3",
        title: "Review recent error logs",
        description: "Check platform alerts for exam-related errors in the last 30 minutes.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/alerts",
        expectedOutcome: "Look for patterns: timeout errors, OOM errors, or data validation failures.",
      },
      {
        id: "ds-4",
        title: "Verify question bank availability",
        description: "Test that exam questions can be retrieved from the question bank.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/exam-questions?limit=1",
        expectedOutcome: "Should return at least one question without errors.",
      },
    ],
    actionSteps: [
      {
        id: "as-1",
        title: "Reset exam service circuit breaker",
        description: "If the circuit breaker is tripped, reset it to allow traffic through.",
        type: "action",
        apiEndpoint: "/api/admin/resilience/circuit-breakers/exam_service/reset",
        killSwitchRef: "exam_service",
        warningLevel: "warning",
      },
      {
        id: "as-2",
        title: "Enable exam kill switch if needed",
        description: "If the problem persists, activate the mock_exams kill switch to prevent users from starting broken exams while you fix the root cause.",
        type: "action",
        killSwitchRef: "mock_exams",
        warningLevel: "critical",
      },
      {
        id: "as-3",
        title: "Clear exam cache",
        description: "Invalidate cached exam data to force fresh retrieval from database.",
        type: "action",
        apiEndpoint: "/api/admin/performance/cache/invalidate",
        expectedOutcome: "Cache cleared; next requests will fetch fresh data.",
      },
      {
        id: "as-4",
        title: "Activate Lite Mode fallback",
        description: "If the main exam system cannot be restored quickly, activate NurseNest Lite to serve prebuilt exam content.",
        type: "action",
        apiEndpoint: "/api/admin/lite/activate",
        warningLevel: "critical",
      },
    ],
    verificationSteps: [
      {
        id: "vs-1",
        title: "Test exam loading",
        description: "Attempt to start a mock exam as a test user to verify the fix.",
        type: "verification",
        expectedOutcome: "Exam should load within 5 seconds with questions rendered correctly.",
      },
      {
        id: "vs-2",
        title: "Monitor error rates",
        description: "Watch the error rate on exam endpoints for 10 minutes to ensure stability.",
        type: "verification",
        apiEndpoint: "/api/admin/resilience/performance",
        expectedOutcome: "Error rate should drop to below 1% within 10 minutes.",
      },
    ],
    killSwitchRefs: ["mock_exams", "cat_engine"],
    featureFlagRefs: ["mock_exams", "cat_engine", "question_bank"],
    communicationTemplate: {
      subject: "Exam System Issue - Under Investigation",
      internalMessage: "INCIDENT: Exam loading failures detected. Error rate elevated on exam endpoints. Engineering is investigating. Circuit breaker status: {cbStatus}. Estimated resolution: {eta}.",
      externalMessage: "We're aware that some users are experiencing difficulty loading exams. Our team is actively working to resolve this. Thank you for your patience.",
      statusPageUpdate: "Investigating - We're looking into reports of exam loading issues. Users may experience delays or errors when starting practice exams.",
    },
    estimatedResolutionMinutes: 30,
    lastUsed: null,
    usageCount: 0,
    tags: ["exam", "critical", "user-facing"],
  },
  {
    id: "rb-cat-failure",
    title: "CAT Engine Failure",
    incidentType: "cat_failure",
    severity: "critical",
    category: "cat",
    symptoms: [
      "Computer Adaptive Testing not adjusting difficulty",
      "All users receiving same difficulty questions",
      "CAT ability estimates stuck at 0",
      "Stopping rules not triggering correctly",
      "Blueprint coverage not being tracked",
    ],
    likelyCauses: [
      "CAT algorithm regression or bug in latest deploy",
      "Ability estimation function returning NaN or infinity",
      "Blueprint weights misconfigured or missing categories",
      "Question discrimination indices all zeroed out",
      "Memory corruption in CAT state tracking",
    ],
    diagnosisSteps: [
      {
        id: "ds-1",
        title: "Check CAT feature flag",
        description: "Verify the cat_engine feature flag is enabled and hasn't been auto-disabled.",
        type: "diagnosis",
        featureFlagRef: "cat_engine",
        apiEndpoint: "/api/admin/resilience/status",
        expectedOutcome: "cat_engine flag should be enabled with 0 errors.",
      },
      {
        id: "ds-2",
        title: "Review CAT state in active exams",
        description: "Check a sample of in-progress CAT exam attempts for invalid state.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/cat/diagnostics",
        expectedOutcome: "CAT states should show valid ability estimates and progression.",
      },
      {
        id: "ds-3",
        title: "Check question pool diversity",
        description: "Verify questions across difficulty levels 1-5 exist in the active pool.",
        type: "diagnosis",
        expectedOutcome: "Each difficulty level should have at least 20 questions available.",
      },
    ],
    actionSteps: [
      {
        id: "as-1",
        title: "Reset CAT feature flag errors",
        description: "Clear the error counter on the CAT feature flag to re-enable if auto-disabled.",
        type: "action",
        featureFlagRef: "cat_engine",
        apiEndpoint: "/api/admin/resilience/feature-flags/cat_engine/reset-errors",
      },
      {
        id: "as-2",
        title: "Fallback to non-adaptive mode",
        description: "If CAT cannot be restored, disable the cat_engine flag. Exams will fall back to random question selection without adaptive difficulty.",
        type: "action",
        featureFlagRef: "cat_engine",
        warningLevel: "warning",
      },
      {
        id: "as-3",
        title: "Invalidate corrupt CAT states",
        description: "Clear cached CAT states for affected exam attempts to force re-initialization.",
        type: "action",
        expectedOutcome: "Affected exams restart CAT tracking from clean state.",
      },
    ],
    verificationSteps: [
      {
        id: "vs-1",
        title: "Run CAT diagnostic test",
        description: "Execute a simulated CAT session with known responses to verify difficulty adaptation.",
        type: "verification",
        expectedOutcome: "Difficulty should increase after correct answers and decrease after incorrect ones.",
      },
      {
        id: "vs-2",
        title: "Monitor new exam starts",
        description: "Watch for new exam attempts to verify CAT is functioning for new sessions.",
        type: "verification",
        expectedOutcome: "New exams should show varying difficulty levels in CAT state.",
      },
    ],
    killSwitchRefs: ["cat_engine"],
    featureFlagRefs: ["cat_engine", "mock_exams"],
    communicationTemplate: {
      subject: "CAT Engine Issue - Adaptive Testing Affected",
      internalMessage: "INCIDENT: CAT engine malfunction detected. Adaptive difficulty not functioning correctly. Impact: exam quality degraded but exams still operational in fallback mode. Investigating root cause.",
      externalMessage: "We're investigating an issue with our adaptive testing system. Practice exams remain available, though question selection may be temporarily less personalized.",
      statusPageUpdate: "Investigating - Our adaptive testing engine is experiencing issues. Exams are still functional but may not adapt difficulty as expected.",
    },
    estimatedResolutionMinutes: 45,
    lastUsed: null,
    usageCount: 0,
    tags: ["cat", "adaptive-testing", "critical"],
  },
  {
    id: "rb-subscriber-access",
    title: "Subscriber Access Issues",
    incidentType: "subscriber_access",
    severity: "high",
    category: "billing",
    symptoms: [
      "Paying subscribers see 'free tier' content restrictions",
      "Subscription status shows 'inactive' for active subscribers",
      "Users report losing access after successful payment",
      "Entitlement system returning incorrect tier",
      "Checkout completes but tier not updated",
    ],
    likelyCauses: [
      "Stripe webhook not processing subscription events",
      "Entitlement cache serving stale tier data",
      "Database tier column not updated after payment",
      "Stripe sync failing to update local records",
      "Race condition between webhook and user session",
    ],
    diagnosisSteps: [
      {
        id: "ds-1",
        title: "Check Stripe circuit breaker",
        description: "Verify the Stripe payment circuit breaker is healthy.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/status",
        expectedOutcome: "stripe circuit breaker should be 'closed'.",
      },
      {
        id: "ds-2",
        title: "Verify entitlement resolution",
        description: "Test the entitlement debug endpoint for an affected user.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/entitlement-debug",
        expectedOutcome: "Should show correct tier matching Stripe subscription status.",
      },
      {
        id: "ds-3",
        title: "Check recent Stripe webhooks",
        description: "Review recent webhook events to verify they were received and processed.",
        type: "diagnosis",
        expectedOutcome: "Recent checkout.session.completed events should have corresponding user tier updates.",
      },
      {
        id: "ds-4",
        title: "Check payment feature flag",
        description: "Verify stripe_payments feature flag is enabled.",
        type: "diagnosis",
        featureFlagRef: "stripe_payments",
        expectedOutcome: "stripe_payments should be enabled with no errors.",
      },
    ],
    actionSteps: [
      {
        id: "as-1",
        title: "Manual tier correction",
        description: "For immediately affected users, manually update their tier in the database to match their Stripe subscription.",
        type: "action",
        warningLevel: "warning",
      },
      {
        id: "as-2",
        title: "Reset Stripe circuit breaker",
        description: "If the Stripe breaker is open, reset it to allow webhook processing.",
        type: "action",
        apiEndpoint: "/api/admin/resilience/circuit-breakers/stripe/reset",
        killSwitchRef: "stripe",
      },
      {
        id: "as-3",
        title: "Trigger Stripe backfill sync",
        description: "Run a backfill sync to reconcile local records with Stripe data.",
        type: "action",
        expectedOutcome: "All active Stripe subscriptions should reflect correct tiers locally.",
      },
      {
        id: "as-4",
        title: "Clear entitlement cache",
        description: "Invalidate cached entitlement data to force fresh resolution.",
        type: "action",
        apiEndpoint: "/api/admin/performance/cache/invalidate",
      },
    ],
    verificationSteps: [
      {
        id: "vs-1",
        title: "Verify affected user access",
        description: "Check that the reported users now have correct access to paid content.",
        type: "verification",
        expectedOutcome: "Users should see their correct tier and access paid content.",
      },
      {
        id: "vs-2",
        title: "Test new subscription flow",
        description: "Process a test subscription to verify the end-to-end flow works.",
        type: "verification",
        expectedOutcome: "New subscription should correctly update user tier within 30 seconds.",
      },
    ],
    killSwitchRefs: ["stripe_payments"],
    featureFlagRefs: ["stripe_payments"],
    communicationTemplate: {
      subject: "Subscription Access Issue - Being Resolved",
      internalMessage: "INCIDENT: Subscriber access mismatch detected. {affectedCount} users potentially affected. Root cause: {rootCause}. Manual corrections in progress for immediately affected users.",
      externalMessage: "Some subscribers may be experiencing incorrect access levels. We're actively fixing this and affected users will have their access restored shortly. No payment issues - your subscription is safe.",
      statusPageUpdate: "Identified - A billing sync issue is causing some subscribers to see incorrect access levels. We're applying fixes and expect full resolution within {eta}.",
    },
    estimatedResolutionMinutes: 20,
    lastUsed: null,
    usageCount: 0,
    tags: ["billing", "access", "subscriber", "stripe"],
  },
  {
    id: "rb-billing-sync",
    title: "Billing Sync Issues",
    incidentType: "billing_sync",
    severity: "high",
    category: "billing",
    symptoms: [
      "Stripe dashboard shows different data than local database",
      "Webhook events not being processed",
      "Payment events delayed or missing",
      "Duplicate subscription records",
      "Currency or amount mismatches",
    ],
    likelyCauses: [
      "Stripe webhook endpoint returning errors",
      "Webhook signature verification failing",
      "Database write failures during webhook processing",
      "Stripe API rate limiting",
      "Network connectivity issues to Stripe API",
    ],
    diagnosisSteps: [
      {
        id: "ds-1",
        title: "Check webhook processing health",
        description: "Verify the Stripe webhook endpoint is responding and processing events.",
        type: "diagnosis",
        expectedOutcome: "Webhook endpoint should return 200 for valid events.",
      },
      {
        id: "ds-2",
        title: "Check email service circuit breaker",
        description: "If notification emails are failing, this could indicate broader connectivity issues.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/status",
        expectedOutcome: "email_service breaker should be 'closed'.",
      },
      {
        id: "ds-3",
        title: "Review failed webhook events",
        description: "Check Stripe dashboard for failed webhook delivery attempts.",
        type: "diagnosis",
        expectedOutcome: "Identify any patterns in failed webhook deliveries.",
      },
    ],
    actionSteps: [
      {
        id: "as-1",
        title: "Reset Stripe circuit breaker",
        description: "Reset the Stripe service circuit breaker if it's been tripped.",
        type: "action",
        apiEndpoint: "/api/admin/resilience/circuit-breakers/stripe/reset",
      },
      {
        id: "as-2",
        title: "Trigger manual Stripe sync",
        description: "Run the Stripe backfill sync to reconcile data.",
        type: "action",
        expectedOutcome: "Local records updated to match Stripe data.",
      },
      {
        id: "as-3",
        title: "Replay failed webhooks",
        description: "If specific webhook events failed, replay them from the Stripe dashboard.",
        type: "action",
        warningLevel: "warning",
        expectedOutcome: "Failed events reprocessed successfully.",
      },
    ],
    verificationSteps: [
      {
        id: "vs-1",
        title: "Compare Stripe vs local data",
        description: "Spot-check a sample of subscriptions to verify data consistency.",
        type: "verification",
        expectedOutcome: "Subscription status, tier, and amounts should match between Stripe and local DB.",
      },
      {
        id: "vs-2",
        title: "Process test webhook",
        description: "Send a test webhook event from Stripe to verify processing.",
        type: "verification",
        expectedOutcome: "Test event should be received and processed within 5 seconds.",
      },
    ],
    killSwitchRefs: ["stripe_payments"],
    featureFlagRefs: ["stripe_payments"],
    communicationTemplate: {
      subject: "Billing Sync Issue - Under Investigation",
      internalMessage: "INCIDENT: Billing synchronization between Stripe and local database is out of sync. Impact: potential access issues for new or modified subscriptions. Running backfill sync.",
      externalMessage: "We're experiencing a minor delay in payment processing. All payments are secure. If you've recently subscribed and don't see your access updated, please allow a few minutes for it to sync.",
      statusPageUpdate: "Investigating - We're looking into a billing synchronization delay. Payments are being processed normally but access updates may be delayed.",
    },
    estimatedResolutionMinutes: 25,
    lastUsed: null,
    usageCount: 0,
    tags: ["billing", "stripe", "sync", "webhook"],
  },
  {
    id: "rb-slow-site-outage",
    title: "Slow Site / Outage",
    incidentType: "slow_site_outage",
    severity: "critical",
    category: "performance",
    symptoms: [
      "Page load times exceeding 5 seconds",
      "API responses timing out",
      "Users reporting white screens or loading spinners",
      "Increased bounce rate in analytics",
      "Health check endpoint returning slowly or failing",
    ],
    likelyCauses: [
      "Database connection pool exhausted",
      "Memory leak causing garbage collection pauses",
      "Traffic spike exceeding scale protection limits",
      "CDN or static asset serving issues",
      "Third-party API (Stripe, AI) dragging down response times",
      "DNS or network connectivity issues",
    ],
    diagnosisSteps: [
      {
        id: "ds-1",
        title: "Check overall system health",
        description: "Run a comprehensive health check across all services.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/health-check",
        expectedOutcome: "Identify which services are unhealthy or slow.",
      },
      {
        id: "ds-2",
        title: "Check performance metrics",
        description: "Review route latency stats and scale protection state.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/performance",
        expectedOutcome: "Identify which routes have elevated latency.",
      },
      {
        id: "ds-3",
        title: "Check degradation level",
        description: "Review current degradation level and whether auto-escalation has occurred.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/degradation",
        expectedOutcome: "Note current degradation level and any recent escalations.",
      },
      {
        id: "ds-4",
        title: "Check error budgets",
        description: "Review error budget consumption across services.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/resilience/error-budgets",
        expectedOutcome: "Identify services with exhausted error budgets.",
      },
    ],
    actionSteps: [
      {
        id: "as-1",
        title: "Escalate degradation level",
        description: "Manually increase degradation level to reduce load. Level 1 disables animations, Level 2 simplifies UI, Level 3 uses safe renderer.",
        type: "action",
        apiEndpoint: "/api/admin/resilience/degradation/override",
        warningLevel: "warning",
      },
      {
        id: "as-2",
        title: "Activate emergency mode",
        description: "If site is critically slow, activate emergency mode to disable non-essential features and reduce load.",
        type: "action",
        apiEndpoint: "/api/admin/resilience/emergency/activate",
        warningLevel: "critical",
      },
      {
        id: "as-3",
        title: "Enable Lite Mode",
        description: "If main system cannot recover, switch to NurseNest Lite for core study flows.",
        type: "action",
        apiEndpoint: "/api/admin/lite/activate",
        warningLevel: "critical",
      },
      {
        id: "as-4",
        title: "Disable non-essential features",
        description: "Turn off AI tutor, content generation, advanced analytics, and other non-critical features.",
        type: "action",
        expectedOutcome: "Reduced server load, faster response times for core features.",
      },
    ],
    verificationSteps: [
      {
        id: "vs-1",
        title: "Test page load times",
        description: "Load key pages and verify response times are acceptable.",
        type: "verification",
        expectedOutcome: "Pages should load within 3 seconds.",
      },
      {
        id: "vs-2",
        title: "Monitor error rates",
        description: "Watch error rates for 15 minutes after action taken.",
        type: "verification",
        apiEndpoint: "/api/admin/resilience/performance",
        expectedOutcome: "Error rates should trend downward and stabilize below 1%.",
      },
    ],
    killSwitchRefs: ["ai_tutor", "ai_content_gen", "seo_generation", "advanced_analytics"],
    featureFlagRefs: ["ai_tutor", "ai_content_gen", "seo_generation", "advanced_analytics", "offline_sync"],
    communicationTemplate: {
      subject: "Site Performance Degradation",
      internalMessage: "INCIDENT: Site experiencing significant performance degradation. Current degradation level: {level}. Emergency mode: {emergencyMode}. Primary bottleneck: {bottleneck}. Actions taken: {actions}.",
      externalMessage: "We're currently experiencing slower than normal performance. Our team is working to improve response times. Core study features remain available.",
      statusPageUpdate: "Degraded Performance - Some users may experience slower load times. We're actively working to optimize performance. Core features are operational.",
    },
    estimatedResolutionMinutes: 60,
    lastUsed: null,
    usageCount: 0,
    tags: ["performance", "outage", "critical", "user-facing"],
  },
  {
    id: "rb-broken-content",
    title: "Broken Content",
    incidentType: "broken_content",
    severity: "medium",
    category: "content",
    symptoms: [
      "Lessons displaying blank or corrupted content",
      "Flashcard decks showing empty cards",
      "Images not loading in lesson content",
      "Formatting broken (HTML rendering in text)",
      "Content version mismatch between languages",
    ],
    likelyCauses: [
      "Content published without validation",
      "Content migration corrupted JSON data",
      "Image assets deleted or moved",
      "Translation sync broke content structure",
      "AI-generated content bypassed quality checks",
    ],
    diagnosisSteps: [
      {
        id: "ds-1",
        title: "Run content integrity check",
        description: "Execute the content validation system to identify broken content items.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/site-health",
        expectedOutcome: "Report of content items with structural issues.",
      },
      {
        id: "ds-2",
        title: "Check content quarantine status",
        description: "Review if any content has been auto-quarantined by the integrity system.",
        type: "diagnosis",
        apiEndpoint: "/api/admin/content-quarantine/list",
        expectedOutcome: "List of quarantined content items with reasons.",
      },
      {
        id: "ds-3",
        title: "Review recent content changes",
        description: "Check audit logs for recent content edits or bulk operations.",
        type: "diagnosis",
        expectedOutcome: "Identify if a recent change introduced the breakage.",
      },
    ],
    actionSteps: [
      {
        id: "as-1",
        title: "Quarantine broken content",
        description: "Move broken content items to quarantine to prevent users from seeing corrupted data.",
        type: "action",
        apiEndpoint: "/api/admin/content-quarantine/quarantine",
        warningLevel: "warning",
      },
      {
        id: "as-2",
        title: "Restore from content revision",
        description: "If a previous good version exists, restore the content from its revision history.",
        type: "action",
        expectedOutcome: "Content restored to last known good version.",
      },
      {
        id: "as-3",
        title: "Run auto-repair",
        description: "Execute the content auto-repair system for fixable issues.",
        type: "action",
        apiEndpoint: "/api/admin/site-health/repair-all",
        expectedOutcome: "Auto-fixable issues resolved.",
      },
      {
        id: "as-4",
        title: "Activate content failover",
        description: "If content cannot be repaired, serve pre-built fallback content for affected lessons.",
        type: "action",
        expectedOutcome: "Users see fallback content instead of broken content.",
      },
    ],
    verificationSteps: [
      {
        id: "vs-1",
        title: "Verify repaired content",
        description: "Load affected lessons/flashcards and verify they render correctly.",
        type: "verification",
        expectedOutcome: "Content should display properly with correct formatting.",
      },
      {
        id: "vs-2",
        title: "Run content health scan",
        description: "Re-run the site health scan to confirm all issues are resolved.",
        type: "verification",
        apiEndpoint: "/api/admin/site-health",
        expectedOutcome: "No critical content issues remaining.",
      },
    ],
    killSwitchRefs: ["lesson_rendering"],
    featureFlagRefs: ["lesson_rendering", "flashcards"],
    communicationTemplate: {
      subject: "Content Display Issue - Being Fixed",
      internalMessage: "INCIDENT: Broken content detected affecting {count} items. Categories affected: {categories}. Root cause: {rootCause}. Auto-repair initiated for fixable issues. Manual review needed for {manualCount} items.",
      externalMessage: "We've identified a display issue affecting some study content. Our content team is working to fix this. Most study materials remain available.",
      statusPageUpdate: "Identified - Some study content may not display correctly. We're applying fixes and expect full restoration within {eta}.",
    },
    estimatedResolutionMinutes: 15,
    lastUsed: null,
    usageCount: 0,
    tags: ["content", "lessons", "flashcards", "quality"],
  },
];

const runbooks = new Map<string, Runbook>();
for (const rb of PREDEFINED_RUNBOOKS) {
  runbooks.set(rb.id, rb);
}

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

async function resolveAdmin(req: Request, res: Response): Promise<any | null> {
  try {
    const { resolveAuthUser } = await import("./admin-auth");
    const user = await resolveAuthUser(req as any);
    if (!user || user.tier !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return null;
    }
    return user;
  } catch {
    res.status(403).json({ error: "Authentication failed" });
    return null;
  }
}

export function registerRunbookRoutes(app: Express): void {
  app.get("/api/admin/runbooks", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const { search, category, severity } = req.query;
    let results = Array.from(runbooks.values());

    if (search && typeof search === "string") {
      const term = search.toLowerCase();
      results = results.filter(rb =>
        rb.title.toLowerCase().includes(term) ||
        rb.symptoms.some(s => s.toLowerCase().includes(term)) ||
        rb.tags.some(t => t.toLowerCase().includes(term)) ||
        rb.incidentType.toLowerCase().includes(term)
      );
    }

    if (category && typeof category === "string") {
      results = results.filter(rb => rb.category === category);
    }

    if (severity && typeof severity === "string") {
      results = results.filter(rb => rb.severity === severity);
    }

    res.json({ runbooks: results, total: results.length, timestamp: Date.now() });
  });

  app.get("/api/admin/runbooks/:id", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const runbook = runbooks.get(req.params.id);
    if (!runbook) {
      return res.status(404).json({ error: "Runbook not found" });
    }

    res.json({ runbook, timestamp: Date.now() });
  });

  app.post("/api/admin/runbooks/:id/start-execution", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const runbook = runbooks.get(req.params.id);
    if (!runbook) {
      return res.status(404).json({ error: "Runbook not found" });
    }

    const allSteps = [...runbook.diagnosisSteps, ...runbook.actionSteps, ...runbook.verificationSteps];
    const execution: RunbookExecution = {
      id: genId(),
      runbookId: runbook.id,
      startedAt: Date.now(),
      completedAt: null,
      executedBy: admin.username || admin.id,
      completedSteps: [],
      currentStepId: allSteps[0]?.id || null,
      notes: {},
      status: "in_progress",
    };

    runbookExecutions.unshift(execution);
    if (runbookExecutions.length > 100) runbookExecutions.length = 100;

    runbook.usageCount++;
    runbook.lastUsed = Date.now();

    res.json({ execution, timestamp: Date.now() });
  });

  app.post("/api/admin/runbooks/:id/execute-step", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const { executionId, stepId, note } = req.body;
    if (!executionId || !stepId) {
      return res.status(400).json({ error: "executionId and stepId required" });
    }

    const execution = runbookExecutions.find(e => e.id === executionId);
    if (!execution) {
      return res.status(404).json({ error: "Execution not found" });
    }

    if (!execution.completedSteps.includes(stepId)) {
      execution.completedSteps.push(stepId);
    }
    if (note) {
      execution.notes[stepId] = note;
    }

    const runbook = runbooks.get(execution.runbookId);
    if (runbook) {
      const allSteps = [...runbook.diagnosisSteps, ...runbook.actionSteps, ...runbook.verificationSteps];
      const currentIdx = allSteps.findIndex(s => s.id === stepId);
      if (currentIdx >= 0 && currentIdx < allSteps.length - 1) {
        execution.currentStepId = allSteps[currentIdx + 1].id;
      } else {
        execution.currentStepId = null;
        execution.status = "completed";
        execution.completedAt = Date.now();
      }
    }

    res.json({ execution, timestamp: Date.now() });
  });

  app.post("/api/admin/runbooks/:id/abort-execution", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const { executionId } = req.body;
    const execution = runbookExecutions.find(e => e.id === executionId);
    if (!execution) {
      return res.status(404).json({ error: "Execution not found" });
    }

    execution.status = "aborted";
    execution.completedAt = Date.now();

    res.json({ execution, timestamp: Date.now() });
  });

  app.get("/api/admin/runbooks/executions/recent", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    res.json({ executions: runbookExecutions.slice(0, limit), timestamp: Date.now() });
  });
}
