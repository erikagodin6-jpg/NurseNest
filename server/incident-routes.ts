import type { Express, Request, Response } from "express";
import { pool } from "./storage";
import {
  logIncident,
  acknowledgeIncident,
  resolveIncident,
  getActiveIncidents,
  getAllIncidents,
  getIncident,
  getIncidentStats,
  loadIncidentsFromDb,
  type IncidentCategory,
  type IncidentSeverity,
  type IncidentStatus,
} from "./incident-monitor";

async function resolveAdmin(req: Request, res: Response): Promise<any | null> {
  try {
    const { requireAdmin } = await import("./admin-auth");
    return await requireAdmin(req as any, res as any);
  } catch {
    res.status(403).json({ error: "Admin access required" });
    return null;
  }
}

async function logAudit(req: any, actor: any, entityType: string, entityId: string | null, action: string, beforeJson?: any, afterJson?: any) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, before_json, after_json, ip_address, user_agent, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
      [actor?.id || null, actor?.username || null, entityType, entityId, action,
       beforeJson ? JSON.stringify(beforeJson) : null, afterJson ? JSON.stringify(afterJson) : null,
       req.ip || req.headers?.["x-forwarded-for"] || null, req.headers?.["user-agent"] || null]
    );
  } catch (e) {
    console.error("Audit log error:", e);
  }
}

const VALID_STATUSES = ["active", "investigating", "identified", "monitoring", "resolved"];
const VALID_SEVERITIES = ["critical", "high", "medium", "low"];

async function addIncidentEvent(incidentId: string, eventType: string, eventData: any, actor?: string) {
  await pool.query(
    `INSERT INTO incident_events (incident_id, event_type, event_data, actor)
     VALUES ($1, $2, $3, $4)`,
    [incidentId, eventType, JSON.stringify(eventData || {}), actor || null]
  );
}

async function auditIncidentAction(admin: any, action: string, incidentId: string, details: any) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, after_json, severity, created_at)
       VALUES (gen_random_uuid(), $1, $2, 'incident', $3, $4, $5, 'info', NOW())`,
      [admin?.id || null, admin?.username || null, incidentId, action, JSON.stringify(details)]
    );
  } catch {}
}

interface CorrelationEntry {
  type: string;
  timestamp: string;
  description: string;
  entityType: string;
  entityId: string | null;
  actor: string | null;
  confidence: number;
  details: any;
}

async function buildCorrelationTimeline(incidentFirstOccurrence: number, incidentLastOccurrence: number, incidentCategory: string): Promise<CorrelationEntry[]> {
  const correlations: CorrelationEntry[] = [];
  const windowStart = new Date(incidentFirstOccurrence - 30 * 60 * 1000);
  const windowEnd = new Date(incidentLastOccurrence + 5 * 60 * 1000);

  try {
    const auditResult = await pool.query(
      `SELECT id, actor_id, actor_username, entity_type, entity_id, action, action_category, after_json, severity, created_at
       FROM audit_logs
       WHERE created_at BETWEEN $1 AND $2
       ORDER BY created_at DESC
       LIMIT 50`,
      [windowStart, windowEnd]
    );

    for (const row of auditResult.rows) {
      const action = row.action || "";
      const entityType = row.entity_type || "";
      let confidence = 0.3;
      let description = `${action} on ${entityType}`;

      if (action.includes("deploy") || action.includes("release") || action.includes("publish")) {
        confidence = 0.9;
        description = `Deployment/publish: ${action} on ${entityType} ${row.entity_id || ""}`;
      } else if (action.includes("feature_flag") || action.includes("toggle")) {
        confidence = 0.8;
        description = `Feature flag change: ${action} on ${row.entity_id || entityType}`;
      } else if (action.includes("kill_switch")) {
        confidence = 0.85;
        description = `Kill switch change: ${action} on ${row.entity_id || ""}`;
      } else if (action.includes("schema") || action.includes("migrate")) {
        confidence = 0.75;
        description = `Schema change: ${action}`;
      } else if (action.includes("billing") || action.includes("stripe") || action.includes("pricing")) {
        confidence = 0.6;
        description = `Billing/Stripe config: ${action} on ${row.entity_id || ""}`;
      } else if (action.includes("emergency") || action.includes("mode")) {
        confidence = 0.7;
        description = `Emergency/mode change: ${action}`;
      } else if (action.includes("admin") || action.includes("override")) {
        confidence = 0.5;
        description = `Admin override: ${action} on ${entityType} ${row.entity_id || ""}`;
      } else if (entityType === "content_item" || entityType === "exam_question") {
        confidence = 0.5;
        description = `Content change: ${action} on ${entityType} ${row.entity_id || ""}`;
      }

      const timeDiffMs = Math.abs(new Date(row.created_at).getTime() - incidentFirstOccurrence);
      if (timeDiffMs < 5 * 60 * 1000) confidence = Math.min(confidence + 0.1, 1.0);
      if (timeDiffMs > 20 * 60 * 1000) confidence = Math.max(confidence - 0.1, 0.1);

      let afterJson: any = null;
      try {
        afterJson = typeof row.after_json === "string" ? JSON.parse(row.after_json) : row.after_json;
      } catch {}

      correlations.push({
        type: "audit_log",
        timestamp: new Date(row.created_at).toISOString(),
        description,
        entityType: entityType,
        entityId: row.entity_id,
        actor: row.actor_username || row.actor_id,
        confidence,
        details: { action, afterJson, severity: row.severity },
      });
    }
  } catch {}

  try {
    const healthResult = await pool.query(
      `SELECT service, status, latency_ms, details, checked_at
       FROM platform_health_checks
       WHERE checked_at BETWEEN $1 AND $2
       AND status != 'healthy'
       ORDER BY checked_at DESC
       LIMIT 20`,
      [windowStart, windowEnd]
    );

    for (const row of healthResult.rows) {
      correlations.push({
        type: "health_check_failure",
        timestamp: new Date(row.checked_at).toISOString(),
        description: `Health check failure: ${row.service} is ${row.status} (${row.latency_ms}ms)`,
        entityType: "health_check",
        entityId: row.service,
        actor: null,
        confidence: row.status === "down" ? 0.9 : 0.6,
        details: { service: row.service, status: row.status, latencyMs: row.latency_ms, details: row.details },
      });
    }
  } catch {}

  try {
    const emergencyResult = await pool.query(
      `SELECT action, reason, actor, auto_triggered, created_at
       FROM platform_emergency_log
       WHERE created_at BETWEEN $1 AND $2
       ORDER BY created_at DESC
       LIMIT 10`,
      [windowStart, windowEnd]
    );

    for (const row of emergencyResult.rows) {
      correlations.push({
        type: "emergency_action",
        timestamp: new Date(row.created_at).toISOString(),
        description: `Emergency ${row.action}: ${row.reason || "no reason"}`,
        entityType: "emergency_mode",
        entityId: null,
        actor: row.actor,
        confidence: 0.85,
        details: { action: row.action, reason: row.reason, autoTriggered: row.auto_triggered },
      });
    }
  } catch {}

  try {
    const contentResult = await pool.query(
      `SELECT id, title, slug, status, updated_at, author_name
       FROM content_items
       WHERE updated_at BETWEEN $1 AND $2
       AND status = 'published'
       ORDER BY updated_at DESC
       LIMIT 20`,
      [windowStart, windowEnd]
    );

    for (const row of contentResult.rows) {
      correlations.push({
        type: "content_publish",
        timestamp: new Date(row.updated_at).toISOString(),
        description: `Content published: "${row.title}" (${row.slug})`,
        entityType: "content_item",
        entityId: row.id,
        actor: row.author_name,
        confidence: 0.5,
        details: { title: row.title, slug: row.slug, status: row.status },
      });
    }
  } catch {}

  correlations.sort((a, b) => b.confidence - a.confidence || new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return correlations;
}

async function correlateChangesFromTimeline(startTime: Date, lookbackMinutes: number, impactedFeatures: string[]) {
  const startMs = startTime.getTime();
  const endMs = startMs + lookbackMinutes * 60 * 1000;
  const timeline = await buildCorrelationTimeline(startMs - lookbackMinutes * 60 * 1000, startMs, "general");
  return timeline.map(entry => ({
    ...entry,
    changeType: entry.type,
    confidenceScore: Math.round(entry.confidence * 100),
    createdAt: entry.timestamp,
  }));
}

export function registerIncidentMonitorRoutes(app: Express): void {
  loadIncidentsFromDb().catch(() => {});

  app.get("/api/admin/incidents", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const severity = req.query.severity as string;
      const category = req.query.category as string;
      const status = req.query.status as string;
      const from = req.query.from as string;
      const to = req.query.to as string;
      const limit = Math.min(parseInt(req.query.limit as string) || 100, 500);

      let incidents = getAllIncidents();

      if (severity) {
        incidents = incidents.filter(i => i.severity === severity);
      }
      if (category) {
        incidents = incidents.filter(i => i.category === category);
      }
      if (status) {
        incidents = incidents.filter(i => i.status === status);
      }
      if (from) {
        const fromTime = new Date(from).getTime();
        incidents = incidents.filter(i => i.firstOccurrence >= fromTime);
      }
      if (to) {
        const toTime = new Date(to).getTime();
        incidents = incidents.filter(i => i.firstOccurrence <= toTime);
      }

      const total = incidents.length;
      incidents = incidents.slice(0, limit);

      const stats = getIncidentStats();
      res.json({ incidents, total, stats });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/incidents/active", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidents = getActiveIncidents();
      res.json({ incidents });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/incidents/stats", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const stats = getIncidentStats();

      const structuredResult = await pool.query(
        `SELECT
           COUNT(*)::int as total,
           COUNT(*) FILTER (WHERE status = 'active')::int as active_count,
           COUNT(*) FILTER (WHERE status = 'investigating')::int as investigating_count,
           COUNT(*) FILTER (WHERE status = 'resolved')::int as resolved_count,
           COUNT(*) FILTER (WHERE severity = 'critical')::int as critical_count,
           COUNT(*) FILTER (WHERE severity = 'high')::int as high_count,
           COUNT(*) FILTER (WHERE severity = 'medium')::int as medium_count,
           COUNT(*) FILTER (WHERE severity = 'low')::int as low_count
         FROM incidents WHERE created_at > NOW() - INTERVAL '30 days'`
      ).catch(() => ({ rows: [{}] }));

      res.json({
        monitorStats: stats,
        structuredStats: structuredResult.rows[0] || {},
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/incidents/create", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const { title, message, severity, category } = req.body || {};
      if (!title || !message) {
        return res.status(400).json({ error: "title and message are required" });
      }

      const actor = admin.username || admin.id || "admin";
      const incidentId = `INC-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const now = Date.now();

      await pool.query(
        `INSERT INTO production_incidents (incident_id, category, severity, error_signature, title, message, first_occurrence, last_occurrence, affected_user_ids, affected_user_count, occurrence_count, status, metadata, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, '[]', 0, 1, 'active', '{}', $9)`,
        [incidentId, category || "general", severity || "warning", `manual:${incidentId}`, title, message, new Date(now), new Date(now), actor]
      );

      await logAudit(req, admin, "incident", incidentId, "create", null, { title, message, severity, category });

      res.json({ success: true, incidentId });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/incidents/:id", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      let incident = getIncident(incidentId);

      if (!incident) {
        try {
          const result = await pool.query(
            `SELECT * FROM production_incidents WHERE incident_id = $1`,
            [incidentId]
          );
          if (result.rows.length > 0) {
            incident = mapDbRow(result.rows[0]);
          }
        } catch {}
      }

      if (!incident) {
        return res.status(404).json({ error: "Incident not found" });
      }

      let dbExtras: any = {};
      try {
        const extraResult = await pool.query(
          `SELECT impacted_routes, impacted_features, impacted_content_ids, admin_notes, fallback_modes, recommended_actions, correlation_data, created_by FROM production_incidents WHERE incident_id = $1`,
          [incidentId]
        );
        if (extraResult.rows.length > 0) {
          const row = extraResult.rows[0];
          const parseJson = (val: any, fallback: any = []) => {
            if (!val) return fallback;
            try { return typeof val === "string" ? JSON.parse(val) : val; } catch { return fallback; }
          };
          dbExtras = {
            impactedRoutes: parseJson(row.impacted_routes),
            impactedFeatures: parseJson(row.impacted_features),
            impactedContentIds: parseJson(row.impacted_content_ids),
            adminNotes: parseJson(row.admin_notes),
            fallbackModes: parseJson(row.fallback_modes),
            recommendedActions: parseJson(row.recommended_actions),
            correlationData: parseJson(row.correlation_data, {}),
            createdBy: row.created_by,
          };
        }
      } catch {}

      const timeline = await buildCorrelationTimeline(
        incident.firstOccurrence,
        incident.lastOccurrence,
        incident.category
      );

      res.json({
        incident,
        correlationTimeline: timeline,
        ...dbExtras,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/incidents/:id/acknowledge", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      const actor = admin.username || admin.id || "admin";
      const incident = acknowledgeIncident(incidentId, actor);

      if (!incident) {
        try {
          const result = await pool.query(
            `UPDATE production_incidents SET status = 'acknowledged', acknowledged_at = NOW(), acknowledged_by = $2 WHERE incident_id = $1`,
            [incidentId, actor]
          );
          if (result.rowCount === 0) {
            return res.status(404).json({ error: "Incident not found" });
          }
          await logAudit(req, admin, "incident", incidentId, "acknowledge");
          await addIncidentEvent(incidentId, "acknowledged", { actor }, actor);
          return res.json({ success: true, message: "Incident acknowledged (DB only)" });
        } catch {
          return res.status(404).json({ error: "Incident not found" });
        }
      }

      await logAudit(req, admin, "incident", incidentId, "acknowledge");
      await addIncidentEvent(incidentId, "acknowledged", { actor }, actor);
      res.json({ success: true, incident });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/incidents/:id/resolve", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      const actor = admin.username || admin.id || "admin";
      const { notes } = req.body || {};
      const incident = resolveIncident(incidentId, actor, notes);

      if (!incident) {
        try {
          const result = await pool.query(
            `UPDATE production_incidents SET status = 'resolved', resolved_at = NOW(), resolved_by = $2, resolution_notes = $3 WHERE incident_id = $1`,
            [incidentId, actor, notes || null]
          );
          if (result.rowCount === 0) {
            return res.status(404).json({ error: "Incident not found" });
          }
          await logAudit(req, admin, "incident", incidentId, "resolve", null, { notes });
          await addIncidentEvent(incidentId, "resolved", { actor, notes }, actor);
          return res.json({ success: true, message: "Incident resolved (DB only)" });
        } catch {
          return res.status(404).json({ error: "Incident not found" });
        }
      }

      await logAudit(req, admin, "incident", incidentId, "resolve", null, { notes });
      await addIncidentEvent(incidentId, "resolved", { actor, notes }, actor);
      res.json({ success: true, incident });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/incidents/:id/reopen", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      const actor = admin.username || admin.id || "admin";
      const { reason } = req.body || {};

      const result = await pool.query(
        `UPDATE production_incidents SET status = 'active', resolved_at = NULL, resolved_by = NULL, resolution_notes = NULL WHERE incident_id = $1 RETURNING *`,
        [incidentId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      await logAudit(req, admin, "incident", incidentId, "reopen", null, { reason });
      await addIncidentEvent(incidentId, "reopened", { actor, reason }, actor);
      res.json({ success: true, incident: mapDbRow(result.rows[0]) });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/incidents/:id/notes", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      const { note } = req.body || {};
      if (!note || typeof note !== "string" || note.trim().length === 0) {
        return res.status(400).json({ error: "note is required" });
      }

      const noteEntry = {
        id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text: note.trim(),
        author: admin.username || admin.id || "admin",
        createdAt: new Date().toISOString(),
      };

      await pool.query(
        `UPDATE production_incidents SET admin_notes = COALESCE(admin_notes, '[]'::jsonb) || $2::jsonb WHERE incident_id = $1`,
        [incidentId, JSON.stringify([noteEntry])]
      );

      await auditIncidentAction(admin, "incident_note_added", incidentId, { note: note.trim() });

      res.json({ success: true, note: noteEntry });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/incidents/:id/update", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      const { impactedRoutes, impactedFeatures, impactedContentIds, recommendedActions, fallbackModes } = req.body || {};

      const updates: string[] = [];
      const params: any[] = [incidentId];
      let idx = 2;

      if (impactedRoutes !== undefined) {
        updates.push(`impacted_routes = $${idx++}`);
        params.push(JSON.stringify(impactedRoutes));
      }
      if (impactedFeatures !== undefined) {
        updates.push(`impacted_features = $${idx++}`);
        params.push(JSON.stringify(impactedFeatures));
      }
      if (impactedContentIds !== undefined) {
        updates.push(`impacted_content_ids = $${idx++}`);
        params.push(JSON.stringify(impactedContentIds));
      }
      if (recommendedActions !== undefined) {
        updates.push(`recommended_actions = $${idx++}`);
        params.push(JSON.stringify(recommendedActions));
      }
      if (fallbackModes !== undefined) {
        updates.push(`fallback_modes = $${idx++}`);
        params.push(JSON.stringify(fallbackModes));
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: "No updates provided" });
      }

      await pool.query(
        `UPDATE production_incidents SET ${updates.join(", ")} WHERE incident_id = $1`,
        params
      );

      await auditIncidentAction(admin, "incident_updated", incidentId, req.body);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/incidents/:id/correlation", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      let incident = getIncident(incidentId);

      if (!incident) {
        try {
          const result = await pool.query(
            `SELECT * FROM production_incidents WHERE incident_id = $1`,
            [incidentId]
          );
          if (result.rows.length > 0) {
            incident = mapDbRow(result.rows[0]);
          }
        } catch {}
      }

      if (!incident) {
        return res.status(404).json({ error: "Incident not found" });
      }

      const timeline = await buildCorrelationTimeline(
        incident.firstOccurrence,
        incident.lastOccurrence,
        incident.category
      );

      res.json({ timeline });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/incidents/history/search", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const severity = req.query.severity as string;
      const category = req.query.category as string;
      const status = req.query.status as string;
      const from = req.query.from as string;
      const to = req.query.to as string;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
      const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);

      let query = `SELECT * FROM production_incidents WHERE 1=1`;
      const params: any[] = [];
      let idx = 1;

      if (severity) {
        query += ` AND severity = $${idx++}`;
        params.push(severity);
      }
      if (category) {
        query += ` AND category = $${idx++}`;
        params.push(category);
      }
      if (status) {
        query += ` AND status = $${idx++}`;
        params.push(status);
      }
      if (from) {
        query += ` AND first_occurrence >= $${idx++}`;
        params.push(new Date(from));
      }
      if (to) {
        query += ` AND first_occurrence <= $${idx++}`;
        params.push(new Date(to));
      }

      query += ` ORDER BY last_occurrence DESC LIMIT $${idx++} OFFSET $${idx++}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      let countQuery = `SELECT COUNT(*)::int AS total FROM production_incidents WHERE 1=1`;
      const countParams: any[] = [];
      let cIdx = 1;
      if (severity) { countQuery += ` AND severity = $${cIdx++}`; countParams.push(severity); }
      if (category) { countQuery += ` AND category = $${cIdx++}`; countParams.push(category); }
      if (status) { countQuery += ` AND status = $${cIdx++}`; countParams.push(status); }
      if (from) { countQuery += ` AND first_occurrence >= $${cIdx++}`; countParams.push(new Date(from)); }
      if (to) { countQuery += ` AND first_occurrence <= $${cIdx++}`; countParams.push(new Date(to)); }

      const countResult = await pool.query(countQuery, countParams);

      res.json({
        incidents: result.rows.map(mapDbRow),
        total: countResult.rows[0]?.total || 0,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/incidents/:id/timeline", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;

      const eventsResult = await pool.query(
        `SELECT * FROM incident_events WHERE incident_id = $1 ORDER BY timestamp ASC`,
        [incidentId]
      );

      const events = eventsResult.rows.map((row: any) => {
        let eventData: Record<string, any> = {};
        try {
          eventData = typeof row.event_data === "string" ? JSON.parse(row.event_data) : (row.event_data || {});
        } catch { eventData = {}; }

        return {
          id: row.id,
          incidentId: row.incident_id,
          eventType: row.event_type,
          eventData,
          actor: row.actor,
          timestamp: new Date(row.timestamp).toISOString(),
        };
      });

      res.json({ incidentId, events });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/incidents/:id/events", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const incidentId = req.params.id;
      const actor = admin.username || admin.id || "admin";
      const { eventType, eventData } = req.body || {};

      if (!eventType) {
        return res.status(400).json({ error: "eventType is required" });
      }

      await addIncidentEvent(incidentId, eventType, eventData || {}, actor);
      await logAudit(req, admin, "incident_event", incidentId, "add_event", null, { eventType, eventData });

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/changes/recent", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
      const result = await pool.query(
        `SELECT id, actor_id, actor_username, entity_type, entity_id, action, action_category, after_json, severity, created_at
         FROM audit_logs ORDER BY created_at DESC LIMIT $1`,
        [limit]
      );
      res.json({ changes: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/changes", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const { changeType, source, entityType, entityId, description, metadata } = req.body || {};
      if (!changeType || !source || !description) {
        return res.status(400).json({ error: "changeType, source, and description are required" });
      }

      await pool.query(
        `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, action_category, after_json, severity, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, 'info', NOW())`,
        [admin.id || null, admin.username || null, entityType || source, entityId || null, description, changeType, metadata ? JSON.stringify(metadata) : null]
      );

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ops/incidents", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const severity = req.query.severity as string;
      const status = req.query.status as string;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
      const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);
      const sort = (req.query.sort as string) || "start_time";
      const order = (req.query.order as string) === "asc" ? "ASC" : "DESC";

      const allowedSorts: Record<string, string> = {
        start_time: "start_time",
        severity: "CASE severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 WHEN 'low' THEN 4 ELSE 5 END",
        status: "status",
        created_at: "created_at",
      };

      const orderBy = allowedSorts[sort] || "start_time";

      let query = `SELECT * FROM incidents WHERE 1=1`;
      const params: any[] = [];
      let idx = 1;

      if (severity) {
        query += ` AND severity = $${idx++}`;
        params.push(severity);
      }
      if (status) {
        query += ` AND status = $${idx++}`;
        params.push(status);
      }

      query += ` ORDER BY ${orderBy} ${order} LIMIT $${idx++} OFFSET $${idx++}`;
      params.push(limit, offset);

      const result = await pool.query(query, params);

      let countQuery = `SELECT COUNT(*)::int as total FROM incidents WHERE 1=1`;
      const countParams: any[] = [];
      let cIdx = 1;
      if (severity) { countQuery += ` AND severity = $${cIdx++}`; countParams.push(severity); }
      if (status) { countQuery += ` AND status = $${cIdx++}`; countParams.push(status); }

      const countResult = await pool.query(countQuery, countParams);

      res.json({
        incidents: result.rows.map(mapStructuredIncident),
        total: countResult.rows[0]?.total || 0,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ops/incidents", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const { title, description, severity, impactedFeatures, impactedContentIds, affectedUsersEstimate, fallbackModes } = req.body || {};

      if (!title) {
        return res.status(400).json({ error: "title is required" });
      }

      const sev = VALID_SEVERITIES.includes(severity) ? severity : "medium";

      const result = await pool.query(
        `INSERT INTO incidents (title, description, severity, impacted_features, impacted_content_ids, affected_users_estimate, fallback_modes, created_by, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'active')
         RETURNING *`,
        [
          title,
          description || null,
          sev,
          JSON.stringify(impactedFeatures || []),
          JSON.stringify(impactedContentIds || []),
          affectedUsersEstimate || 0,
          JSON.stringify(fallbackModes || []),
          admin.username || admin.id,
        ]
      );

      const incident = mapStructuredIncident(result.rows[0]);

      await addIncidentEvent(incident.id, "created", {
        title,
        severity: sev,
        createdBy: admin.username || admin.id,
      }, admin.username || admin.id);

      await logAudit(req, admin, "incident", incident.id, "create", null, incident);

      res.json({ incident });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ops/incidents/:id", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const id = req.params.id;
      const result = await pool.query(`SELECT * FROM incidents WHERE id = $1`, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      const incident = mapStructuredIncident(result.rows[0]);

      const eventsResult = await pool.query(
        `SELECT * FROM incident_events WHERE incident_id = $1 ORDER BY timestamp ASC`,
        [id]
      );

      const events = eventsResult.rows.map((row: any) => {
        let eventData: Record<string, any> = {};
        try {
          eventData = typeof row.event_data === "string" ? JSON.parse(row.event_data) : (row.event_data || {});
        } catch { eventData = {}; }
        return {
          id: row.id,
          eventType: row.event_type,
          eventData,
          actor: row.actor,
          timestamp: new Date(row.timestamp).toISOString(),
        };
      });

      const startTime = new Date(incident.startTime);
      const impactedFeatures = Array.isArray(incident.impactedFeatures)
        ? incident.impactedFeatures
        : [];
      const correlatedChanges = await correlateChangesFromTimeline(startTime, 120, impactedFeatures as string[]);

      res.json({
        incident,
        events,
        correlatedChanges,
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/ops/incidents/:id", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const id = req.params.id;
      const { title, description, severity, status, impactedFeatures, impactedContentIds, affectedUsersEstimate, fallbackModes, rootCauseSummary, endTime } = req.body || {};

      const existing = await pool.query(`SELECT * FROM incidents WHERE id = $1`, [id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      const beforeIncident = mapStructuredIncident(existing.rows[0]);

      const updates: string[] = [];
      const params: any[] = [];
      let idx = 1;

      if (title !== undefined) { updates.push(`title = $${idx++}`); params.push(title); }
      if (description !== undefined) { updates.push(`description = $${idx++}`); params.push(description); }
      if (severity !== undefined) {
        if (!VALID_SEVERITIES.includes(severity)) return res.status(400).json({ error: `Invalid severity. Must be one of: ${VALID_SEVERITIES.join(", ")}` });
        updates.push(`severity = $${idx++}`); params.push(severity);
      }
      if (status !== undefined) {
        if (!VALID_STATUSES.includes(status)) return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` });
        updates.push(`status = $${idx++}`); params.push(status);
      }
      if (impactedFeatures !== undefined) { updates.push(`impacted_features = $${idx++}`); params.push(JSON.stringify(impactedFeatures)); }
      if (impactedContentIds !== undefined) { updates.push(`impacted_content_ids = $${idx++}`); params.push(JSON.stringify(impactedContentIds)); }
      if (affectedUsersEstimate !== undefined) { updates.push(`affected_users_estimate = $${idx++}`); params.push(affectedUsersEstimate); }
      if (fallbackModes !== undefined) { updates.push(`fallback_modes = $${idx++}`); params.push(JSON.stringify(fallbackModes)); }
      if (rootCauseSummary !== undefined) { updates.push(`root_cause_summary = $${idx++}`); params.push(rootCauseSummary); }
      if (endTime !== undefined) {
        updates.push(`end_time = $${idx++}`);
        params.push(endTime ? new Date(endTime) : null);
        if (endTime) {
          const start = new Date(existing.rows[0].start_time).getTime();
          const end = new Date(endTime).getTime();
          updates.push(`duration = $${idx++}`);
          params.push(Math.round((end - start) / 1000));
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      updates.push(`updated_at = NOW()`);
      params.push(id);

      const result = await pool.query(
        `UPDATE incidents SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
        params
      );

      const incident = mapStructuredIncident(result.rows[0]);

      const changedFields: string[] = [];
      if (title !== undefined && title !== beforeIncident.title) changedFields.push("title");
      if (severity !== undefined && severity !== beforeIncident.severity) changedFields.push("severity");
      if (status !== undefined && status !== beforeIncident.status) changedFields.push("status");

      await addIncidentEvent(id, "updated", {
        changedFields,
        updatedBy: admin.username || admin.id,
      }, admin.username || admin.id);

      await logAudit(req, admin, "incident", id, "update", beforeIncident, incident);

      res.json({ incident });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ops/incidents/:id/resolve", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const id = req.params.id;
      const actor = admin.username || admin.id || "admin";
      const { rootCauseSummary, notes } = req.body || {};

      const result = await pool.query(
        `UPDATE incidents SET status = 'resolved', end_time = NOW(), duration = EXTRACT(EPOCH FROM (NOW() - start_time))::int, root_cause_summary = COALESCE($2, root_cause_summary), updated_at = NOW() WHERE id = $1 RETURNING *`,
        [id, rootCauseSummary || null]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      await addIncidentEvent(id, "resolved", { actor, rootCauseSummary, notes }, actor);
      await logAudit(req, admin, "incident", id, "resolve", null, { rootCauseSummary, notes });

      res.json({ incident: mapStructuredIncident(result.rows[0]) });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ops/incidents/:id/reopen", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const id = req.params.id;
      const actor = admin.username || admin.id || "admin";
      const { reason } = req.body || {};

      const result = await pool.query(
        `UPDATE incidents SET status = 'active', end_time = NULL, duration = NULL, updated_at = NOW() WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      await addIncidentEvent(id, "reopened", { actor, reason }, actor);
      await logAudit(req, admin, "incident", id, "reopen", null, { reason });

      res.json({ incident: mapStructuredIncident(result.rows[0]) });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ops/incidents/:id/action", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const id = req.params.id;
      const actor = admin.username || admin.id || "admin";
      const { action, details } = req.body || {};

      if (!action) {
        return res.status(400).json({ error: "action is required" });
      }

      const existing = await pool.query(`SELECT actions_taken FROM incidents WHERE id = $1`, [id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      let actions: any[] = [];
      try {
        actions = typeof existing.rows[0].actions_taken === "string"
          ? JSON.parse(existing.rows[0].actions_taken)
          : (existing.rows[0].actions_taken || []);
      } catch { actions = []; }

      actions.push({
        action,
        details: details || null,
        actor,
        timestamp: new Date().toISOString(),
      });

      await pool.query(
        `UPDATE incidents SET actions_taken = $2, updated_at = NOW() WHERE id = $1`,
        [id, JSON.stringify(actions)]
      );

      await addIncidentEvent(id, "action_taken", { action, details, actor }, actor);
      await logAudit(req, admin, "incident", id, "add_action", null, { action, details });

      res.json({ success: true, actions });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ops/incidents/:id/summary", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const id = req.params.id;
      const result = await pool.query(`SELECT * FROM incidents WHERE id = $1`, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      const incident = mapStructuredIncident(result.rows[0]);
      const startTime = new Date(incident.startTime);
      const correlatedChanges = await correlateChangesFromTimeline(startTime, 120, incident.impactedFeatures as string[]);

      let actions: any[] = [];
      try {
        actions = Array.isArray(incident.actionsTaken) ? incident.actionsTaken : [];
      } catch { actions = []; }

      const summary = [
        `Incident: ${incident.title}`,
        `ID: ${incident.id}`,
        `Severity: ${incident.severity.toUpperCase()}`,
        `Status: ${incident.status}`,
        `Started: ${new Date(incident.startTime).toISOString()}`,
        incident.endTime ? `Ended: ${new Date(incident.endTime).toISOString()}` : "",
        incident.duration ? `Duration: ${Math.round(incident.duration / 60)} minutes` : "",
        `Affected Users: ~${incident.affectedUsersEstimate}`,
        incident.impactedFeatures && (incident.impactedFeatures as any[]).length > 0
          ? `Impacted Features: ${(incident.impactedFeatures as string[]).join(", ")}`
          : "",
        incident.rootCauseSummary ? `Root Cause: ${incident.rootCauseSummary}` : "",
        "",
        correlatedChanges.length > 0 ? "Likely Causes:" : "",
        ...correlatedChanges.slice(0, 5).map((c, i) =>
          `  ${i + 1}. [${c.confidenceScore}%] ${c.description} (${c.changeType}, ${c.createdAt})`
        ),
        "",
        actions.length > 0 ? "Actions Taken:" : "",
        ...actions.map((a: any) => `  - ${a.action}${a.details ? `: ${a.details}` : ""} (${a.actor}, ${a.timestamp})`),
      ].filter(Boolean).join("\n");

      res.json({ summary });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}

function mapDbRow(row: any) {
  let affectedUserIds: string[] = [];
  try {
    affectedUserIds = typeof row.affected_user_ids === "string" ? JSON.parse(row.affected_user_ids) : (row.affected_user_ids || []);
  } catch { affectedUserIds = []; }
  let metadata: Record<string, any> = {};
  try {
    metadata = typeof row.metadata === "string" ? JSON.parse(row.metadata) : (row.metadata || {});
  } catch { metadata = {}; }

  return {
    incidentId: row.incident_id,
    category: row.category,
    severity: row.severity,
    errorSignature: row.error_signature,
    title: row.title,
    message: row.message,
    firstOccurrence: new Date(row.first_occurrence).getTime(),
    lastOccurrence: new Date(row.last_occurrence).getTime(),
    affectedUserIds,
    affectedUserCount: row.affected_user_count || 0,
    occurrenceCount: row.occurrence_count || 1,
    status: row.status,
    resolutionNotes: row.resolution_notes,
    resolvedAt: row.resolved_at ? new Date(row.resolved_at).getTime() : null,
    resolvedBy: row.resolved_by,
    acknowledgedAt: row.acknowledged_at ? new Date(row.acknowledged_at).getTime() : null,
    acknowledgedBy: row.acknowledged_by,
    metadata,
  };
}

function mapStructuredIncident(row: any) {
  let impactedFeatures: any[] = [];
  try {
    impactedFeatures = typeof row.impacted_features === "string" ? JSON.parse(row.impacted_features) : (row.impacted_features || []);
  } catch { impactedFeatures = []; }
  let impactedContentIds: any[] = [];
  try {
    impactedContentIds = typeof row.impacted_content_ids === "string" ? JSON.parse(row.impacted_content_ids) : (row.impacted_content_ids || []);
  } catch { impactedContentIds = []; }
  let fallbackModes: any[] = [];
  try {
    fallbackModes = typeof row.fallback_modes === "string" ? JSON.parse(row.fallback_modes) : (row.fallback_modes || []);
  } catch { fallbackModes = []; }
  let actionsTaken: any[] = [];
  try {
    actionsTaken = typeof row.actions_taken === "string" ? JSON.parse(row.actions_taken) : (row.actions_taken || []);
  } catch { actionsTaken = []; }

  return {
    id: row.id,
    severity: row.severity,
    status: row.status,
    title: row.title,
    description: row.description,
    startTime: row.start_time ? new Date(row.start_time).toISOString() : new Date(row.created_at).toISOString(),
    endTime: row.end_time ? new Date(row.end_time).toISOString() : null,
    duration: row.duration,
    impactedFeatures,
    impactedContentIds,
    affectedUsersEstimate: row.affected_users_estimate || 0,
    fallbackModes,
    rootCauseSummary: row.root_cause_summary,
    actionsTaken,
    createdBy: row.created_by,
    productionIncidentId: row.production_incident_id,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}
