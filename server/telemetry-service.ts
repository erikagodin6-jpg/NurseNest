import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import rateLimit from "express-rate-limit";

const ALLOWED_EVENT_TYPES = new Set([
  "retry", "fallback_used", "drop_off", "session_abandon", "silent_failure",
  "suppressed_error", "swallowed_exception", "page_view", "click", "navigate",
  "error", "api_error", "render_error", "load_error", "timeout", "form_submit",
  "checkout_start", "checkout_complete", "checkout_abandon", "feature_use",
]);

const ALLOWED_CATEGORIES = new Set([
  "error", "behavior", "performance", "degradation", "navigation",
  "engagement", "conversion", "payment", "content", "auth",
]);

const ALLOWED_SEVERITIES = new Set(["info", "warning", "error", "critical"]);

function sanitizeString(val: any, maxLength = 200): string | null {
  if (typeof val !== "string") return null;
  return val.slice(0, maxLength).replace(/[<>]/g, "");
}

function sanitizeEventData(data: any): any {
  if (!data || typeof data !== "object") return {};
  const sanitized: any = {};
  const keys = Object.keys(data).slice(0, 20);
  for (const key of keys) {
    const safeKey = key.slice(0, 50).replace(/[<>]/g, "");
    const val = data[key];
    if (typeof val === "string") sanitized[safeKey] = val.slice(0, 500);
    else if (typeof val === "number" || typeof val === "boolean") sanitized[safeKey] = val;
    else if (val === null) sanitized[safeKey] = null;
  }
  return sanitized;
}

async function ensureTelemetryTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS telemetry_events (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id TEXT NOT NULL,
        user_id VARCHAR,
        event_type TEXT NOT NULL,
        event_category TEXT NOT NULL,
        event_data JSONB DEFAULT '{}',
        page TEXT,
        component TEXT,
        severity TEXT DEFAULT 'info',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session_recordings (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id TEXT NOT NULL,
        user_id VARCHAR,
        actions JSONB DEFAULT '[]',
        api_calls JSONB DEFAULT '[]',
        state_transitions JSONB DEFAULT '[]',
        errors JSONB DEFAULT '[]',
        metadata JSONB DEFAULT '{}',
        started_at TIMESTAMP DEFAULT NOW(),
        ended_at TIMESTAMP,
        duration INTEGER DEFAULT 0
      )
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_telemetry_events_session ON telemetry_events(session_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_telemetry_events_user ON telemetry_events(user_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_telemetry_events_type ON telemetry_events(event_type)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_telemetry_events_category ON telemetry_events(event_category)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_telemetry_events_created ON telemetry_events(created_at)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_session_recordings_session ON session_recordings(session_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_session_recordings_user ON session_recordings(user_id)`);
  } catch (e: any) {
    console.error("[Telemetry] Table init error:", e.message);
  }
}

export function registerTelemetryRoutes(app: Express) {
  ensureTelemetryTables().catch(() => {});

  const telemetryRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    message: { error: "Too many telemetry requests" },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.post("/api/telemetry/event", telemetryRateLimiter, async (req, res) => {
    try {
      const sessionId = sanitizeString(req.body.sessionId, 100);
      const userId = sanitizeString(req.body.userId, 100);
      const eventType = sanitizeString(req.body.eventType, 50);
      const eventCategory = sanitizeString(req.body.eventCategory, 50);
      const page = sanitizeString(req.body.page, 300);
      const component = sanitizeString(req.body.component, 100);
      const severity = sanitizeString(req.body.severity, 20);
      const eventData = sanitizeEventData(req.body.eventData);

      if (!sessionId || !eventType || !eventCategory) {
        return res.status(400).json({ error: "sessionId, eventType, and eventCategory are required" });
      }
      if (!ALLOWED_EVENT_TYPES.has(eventType)) {
        return res.status(400).json({ error: "Invalid eventType" });
      }
      if (!ALLOWED_CATEGORIES.has(eventCategory)) {
        return res.status(400).json({ error: "Invalid eventCategory" });
      }
      const safeSeverity = ALLOWED_SEVERITIES.has(severity || "") ? severity : "info";

      await pool.query(
        `INSERT INTO telemetry_events (id, session_id, user_id, event_type, event_category, event_data, page, component, severity, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [sessionId, userId || null, eventType, eventCategory, JSON.stringify(eventData), page || null, component || null, safeSeverity]
      );
      res.status(201).json({ success: true });
    } catch (e: any) {
      console.error("[Telemetry] Event record error:", e.message);
      res.status(500).json({ error: "Failed to record event" });
    }
  });

  app.post("/api/telemetry/event/batch", telemetryRateLimiter, async (req, res) => {
    try {
      const { events } = req.body;
      if (!Array.isArray(events) || events.length === 0) {
        return res.status(400).json({ error: "events array is required" });
      }
      const limited = events.slice(0, 50);
      let recorded = 0;
      for (const evt of limited) {
        const sessionId = sanitizeString(evt.sessionId, 100);
        const eventType = sanitizeString(evt.eventType, 50);
        const eventCategory = sanitizeString(evt.eventCategory, 50);
        if (!sessionId || !eventType || !eventCategory) continue;
        if (!ALLOWED_EVENT_TYPES.has(eventType) || !ALLOWED_CATEGORIES.has(eventCategory)) continue;

        const safeSeverity = ALLOWED_SEVERITIES.has(evt.severity || "") ? evt.severity : "info";
        await pool.query(
          `INSERT INTO telemetry_events (id, session_id, user_id, event_type, event_category, event_data, page, component, severity, created_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
          [sessionId, sanitizeString(evt.userId, 100), eventType, eventCategory, JSON.stringify(sanitizeEventData(evt.eventData)), sanitizeString(evt.page, 300), sanitizeString(evt.component, 100), safeSeverity]
        );
        recorded++;
      }
      res.json({ success: true, recorded });
    } catch (e: any) {
      console.error("[Telemetry] Batch error:", e.message);
      res.status(500).json({ error: "Failed to record batch events" });
    }
  });

  app.post("/api/telemetry/session", telemetryRateLimiter, async (req, res) => {
    try {
      const sessionId = sanitizeString(req.body.sessionId, 100);
      const userId = sanitizeString(req.body.userId, 100);
      const { actions, apiCalls, stateTransitions, errors, metadata, duration, endedAt } = req.body;

      if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
      }

      const safeActions = Array.isArray(actions) ? actions.slice(0, 500) : [];
      const safeApiCalls = Array.isArray(apiCalls) ? apiCalls.slice(0, 200) : [];
      const safeTransitions = Array.isArray(stateTransitions) ? stateTransitions.slice(0, 100) : [];
      const safeErrors = Array.isArray(errors) ? errors.slice(0, 50) : [];
      const safeMeta = sanitizeEventData(metadata);
      const safeDuration = typeof duration === "number" ? Math.min(Math.max(0, duration), 86400) : 0;

      const existing = await pool.query(`SELECT id FROM session_recordings WHERE session_id = $1`, [sessionId]);
      if (existing.rows.length > 0) {
        await pool.query(
          `UPDATE session_recordings SET
            actions = COALESCE($1, actions),
            api_calls = COALESCE($2, api_calls),
            state_transitions = COALESCE($3, state_transitions),
            errors = COALESCE($4, errors),
            metadata = COALESCE($5, metadata),
            duration = COALESCE($6, duration),
            ended_at = COALESCE($7, ended_at)
          WHERE session_id = $8`,
          [
            safeActions.length > 0 ? JSON.stringify(safeActions) : null,
            safeApiCalls.length > 0 ? JSON.stringify(safeApiCalls) : null,
            safeTransitions.length > 0 ? JSON.stringify(safeTransitions) : null,
            safeErrors.length > 0 ? JSON.stringify(safeErrors) : null,
            Object.keys(safeMeta).length > 0 ? JSON.stringify(safeMeta) : null,
            safeDuration || null,
            endedAt ? new Date(endedAt) : null,
            sessionId
          ]
        );
      } else {
        await pool.query(
          `INSERT INTO session_recordings (id, session_id, user_id, actions, api_calls, state_transitions, errors, metadata, started_at, ended_at, duration)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), $8, $9)`,
          [
            sessionId,
            userId || null,
            JSON.stringify(safeActions),
            JSON.stringify(safeApiCalls),
            JSON.stringify(safeTransitions),
            JSON.stringify(safeErrors),
            JSON.stringify(safeMeta),
            endedAt ? new Date(endedAt) : null,
            safeDuration
          ]
        );
      }
      res.json({ success: true });
    } catch (e: any) {
      console.error("[Telemetry] Session record error:", e.message);
      res.status(500).json({ error: "Failed to record session" });
    }
  });

  app.get("/api/admin/telemetry/overview", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const days = Math.max(1, Math.min(90, Math.floor(Number(req.query.days || 7))));
      const cutoff = `NOW() - INTERVAL '${days} days'`;

      const [
        retryFrequency,
        fallbackUsage,
        dropOffPoints,
        repeatedFailures,
        problematicContent,
        sessionAbandonment,
        eventsByCategory,
        eventsByType,
        dailyTrend,
        silentFailures,
        totalEvents,
        uniqueSessions
      ] = await Promise.all([
        pool.query(`
          SELECT event_data->>'feature' as feature, COUNT(*)::int as retry_count,
            COUNT(DISTINCT session_id)::int as unique_sessions
          FROM telemetry_events
          WHERE event_type = 'retry' AND created_at > ${cutoff}
          GROUP BY event_data->>'feature' ORDER BY retry_count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT event_data->>'fallbackType' as fallback_type, COUNT(*)::int as usage_count,
            COUNT(DISTINCT user_id)::int as affected_users
          FROM telemetry_events
          WHERE event_type = 'fallback_used' AND created_at > ${cutoff}
          GROUP BY event_data->>'fallbackType' ORDER BY usage_count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT page, COUNT(*)::int as drop_count
          FROM telemetry_events
          WHERE event_type = 'drop_off' AND created_at > ${cutoff}
          GROUP BY page ORDER BY drop_count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT user_id, event_data->>'errorType' as error_type, COUNT(*)::int as failure_count
          FROM telemetry_events
          WHERE event_category = 'error' AND created_at > ${cutoff} AND user_id IS NOT NULL
          GROUP BY user_id, event_data->>'errorType'
          HAVING COUNT(*) >= 3 ORDER BY failure_count DESC LIMIT 30
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT event_data->>'contentId' as content_id, event_data->>'contentType' as content_type,
            COUNT(*)::int as error_count
          FROM telemetry_events
          WHERE event_category = 'error' AND event_data->>'contentId' IS NOT NULL AND created_at > ${cutoff}
          GROUP BY event_data->>'contentId', event_data->>'contentType'
          ORDER BY error_count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT page, COUNT(*)::int as abandonment_count,
            AVG((event_data->>'duration')::int) as avg_duration_before_abandon
          FROM telemetry_events
          WHERE event_type = 'session_abandon' AND created_at > ${cutoff}
          GROUP BY page ORDER BY abandonment_count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT event_category, COUNT(*)::int as count
          FROM telemetry_events WHERE created_at > ${cutoff}
          GROUP BY event_category ORDER BY count DESC
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT event_type, COUNT(*)::int as count
          FROM telemetry_events WHERE created_at > ${cutoff}
          GROUP BY event_type ORDER BY count DESC LIMIT 30
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT DATE(created_at) as day, COUNT(*)::int as total_events,
            COUNT(DISTINCT session_id)::int as unique_sessions,
            COUNT(CASE WHEN event_category = 'error' THEN 1 END)::int as errors
          FROM telemetry_events WHERE created_at > ${cutoff}
          GROUP BY DATE(created_at) ORDER BY day DESC
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT event_data->>'service' as service, event_data->>'errorCode' as error_code,
            COUNT(*)::int as count
          FROM telemetry_events
          WHERE event_type = 'silent_failure' AND created_at > ${cutoff}
          GROUP BY event_data->>'service', event_data->>'errorCode'
          ORDER BY count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),

        pool.query(`SELECT COUNT(*)::int as total FROM telemetry_events WHERE created_at > ${cutoff}`).catch(() => ({ rows: [{ total: 0 }] })),

        pool.query(`SELECT COUNT(DISTINCT session_id)::int as total FROM telemetry_events WHERE created_at > ${cutoff}`).catch(() => ({ rows: [{ total: 0 }] })),
      ]);

      res.json({
        period: { days },
        summary: {
          totalEvents: totalEvents.rows[0]?.total || 0,
          uniqueSessions: uniqueSessions.rows[0]?.total || 0,
        },
        retryFrequency: retryFrequency.rows,
        fallbackUsage: fallbackUsage.rows,
        dropOffPoints: dropOffPoints.rows,
        repeatedFailures: repeatedFailures.rows,
        problematicContent: problematicContent.rows,
        sessionAbandonment: sessionAbandonment.rows,
        eventsByCategory: eventsByCategory.rows,
        eventsByType: eventsByType.rows,
        dailyTrend: dailyTrend.rows,
        silentFailures: silentFailures.rows,
      });
    } catch (e: any) {
      console.error("[Telemetry] Overview error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/telemetry/analysis", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const days = Math.max(1, Math.min(90, Math.floor(Number(req.query.days || 7))));
      const cutoff = `NOW() - INTERVAL '${days} days'`;

      const [weakAreas, prioritizedFixes, silentFailureDetection] = await Promise.all([
        pool.query(`
          SELECT
            COALESCE(page, 'unknown') as area,
            COUNT(CASE WHEN event_category = 'error' THEN 1 END)::int as error_count,
            COUNT(CASE WHEN event_type = 'retry' THEN 1 END)::int as retry_count,
            COUNT(CASE WHEN event_type = 'fallback_used' THEN 1 END)::int as fallback_count,
            COUNT(CASE WHEN event_type = 'drop_off' THEN 1 END)::int as drop_off_count,
            COUNT(*)::int as total_events,
            ROUND(COUNT(CASE WHEN event_category = 'error' THEN 1 END)::numeric / GREATEST(COUNT(*), 1) * 100, 2) as error_rate
          FROM telemetry_events WHERE created_at > ${cutoff}
          GROUP BY page
          HAVING COUNT(CASE WHEN event_category = 'error' THEN 1 END) > 0
          ORDER BY error_count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT
            event_data->>'feature' as feature,
            event_data->>'errorType' as error_type,
            COUNT(*)::int as occurrence_count,
            COUNT(DISTINCT user_id)::int as affected_users,
            COUNT(DISTINCT session_id)::int as affected_sessions,
            CASE
              WHEN COUNT(DISTINCT user_id) > 10 AND COUNT(*) > 20 THEN 'critical'
              WHEN COUNT(DISTINCT user_id) > 5 AND COUNT(*) > 10 THEN 'high'
              WHEN COUNT(DISTINCT user_id) > 2 THEN 'medium'
              ELSE 'low'
            END as priority
          FROM telemetry_events
          WHERE event_category = 'error' AND created_at > ${cutoff}
          GROUP BY event_data->>'feature', event_data->>'errorType'
          ORDER BY
            CASE
              WHEN COUNT(DISTINCT user_id) > 10 AND COUNT(*) > 20 THEN 1
              WHEN COUNT(DISTINCT user_id) > 5 AND COUNT(*) > 10 THEN 2
              WHEN COUNT(DISTINCT user_id) > 2 THEN 3
              ELSE 4
            END,
            COUNT(*) DESC
          LIMIT 30
        `).catch(() => ({ rows: [] })),

        pool.query(`
          SELECT
            event_data->>'service' as service,
            COUNT(*)::int as silent_failure_count,
            COUNT(DISTINCT user_id)::int as affected_users,
            MAX(created_at) as last_occurrence,
            CASE
              WHEN COUNT(*) > 50 THEN 'critical'
              WHEN COUNT(*) > 20 THEN 'high'
              WHEN COUNT(*) > 5 THEN 'medium'
              ELSE 'low'
            END as severity
          FROM telemetry_events
          WHERE event_type IN ('silent_failure', 'suppressed_error', 'swallowed_exception')
            AND created_at > ${cutoff}
          GROUP BY event_data->>'service'
          ORDER BY silent_failure_count DESC LIMIT 20
        `).catch(() => ({ rows: [] })),
      ]);

      res.json({
        period: { days },
        weakAreas: weakAreas.rows,
        prioritizedFixes: prioritizedFixes.rows,
        silentFailureDetection: silentFailureDetection.rows,
      });
    } catch (e: any) {
      console.error("[Telemetry] Analysis error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/telemetry/sessions", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const limit = Math.min(100, Math.max(1, Number(req.query.limit || 50)));
      const offset = Math.max(0, Number(req.query.offset || 0));
      const userId = req.query.userId as string | undefined;
      const hasErrors = req.query.hasErrors === "true";

      let whereClause = "WHERE 1=1";
      const params: any[] = [];
      let paramIdx = 1;

      if (userId) {
        whereClause += ` AND user_id = $${paramIdx++}`;
        params.push(userId);
      }
      if (hasErrors) {
        whereClause += ` AND jsonb_array_length(errors) > 0`;
      }

      const result = await pool.query(
        `SELECT id, session_id, user_id, metadata, started_at, ended_at, duration,
          jsonb_array_length(actions) as action_count,
          jsonb_array_length(api_calls) as api_call_count,
          jsonb_array_length(errors) as error_count
        FROM session_recordings ${whereClause}
        ORDER BY started_at DESC LIMIT $${paramIdx++} OFFSET $${paramIdx}`,
        [...params, limit, offset]
      );

      const countResult = await pool.query(
        `SELECT COUNT(*)::int as total FROM session_recordings ${whereClause}`,
        params
      );

      res.json({
        sessions: result.rows,
        total: countResult.rows[0]?.total || 0,
        limit,
        offset,
      });
    } catch (e: any) {
      console.error("[Telemetry] Sessions list error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/telemetry/session/:sessionId", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    try {
      const { sessionId } = req.params;
      const result = await pool.query(
        `SELECT * FROM session_recordings WHERE session_id = $1`,
        [sessionId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Session not found" });
      }

      const events = await pool.query(
        `SELECT * FROM telemetry_events WHERE session_id = $1 ORDER BY created_at ASC`,
        [sessionId]
      );

      res.json({
        recording: result.rows[0],
        events: events.rows,
      });
    } catch (e: any) {
      console.error("[Telemetry] Session detail error:", e.message);
      res.status(500).json({ error: e.message });
    }
  });
}
