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

export function registerIncidentMonitorRoutes(app: Express): void {
  loadIncidentsFromDb().catch(() => {});

  app.get("/api/admin/incidents", async (req: Request, res: Response) => {
    const admin = await resolveAdmin(req, res);
    if (!admin) return;

    try {
      const severity = req.query.severity as string;
      const category = req.query.category as string;
      const status = req.query.status as string;
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

      const total = incidents.length;
      incidents = incidents.slice(0, limit);

      res.json({ incidents, total });
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
      res.json(stats);
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
            const row = result.rows[0];
            let affectedUserIds: string[] = [];
            try {
              affectedUserIds = typeof row.affected_user_ids === "string" ? JSON.parse(row.affected_user_ids) : (row.affected_user_ids || []);
            } catch { affectedUserIds = []; }
            let metadata: Record<string, any> = {};
            try {
              metadata = typeof row.metadata === "string" ? JSON.parse(row.metadata) : (row.metadata || {});
            } catch { metadata = {}; }

            incident = {
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
        } catch {}
      }

      if (!incident) {
        return res.status(404).json({ error: "Incident not found" });
      }

      res.json({ incident });
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
          return res.json({ success: true, message: "Incident acknowledged (DB only)" });
        } catch {
          return res.status(404).json({ error: "Incident not found" });
        }
      }

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
          return res.json({ success: true, message: "Incident resolved (DB only)" });
        } catch {
          return res.status(404).json({ error: "Incident not found" });
        }
      }

      res.json({ success: true, incident });
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
