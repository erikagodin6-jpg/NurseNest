import type { Express } from "express";
import { requireAdmin, requireAdminRole, issueConfirmationToken, validateConfirmationToken } from "./admin-auth";
import type { AdminRole } from "./admin-auth";
import { auditAction, queryAuditLogs, getAuditLogActions, getAuditLogEntityTypes, exportAuditLogs } from "./ops-audit-service";
import { pool } from "./storage";

export function registerOpsRoutes(app: Express) {

  app.get("/api/admin/audit-logs", requireAdminRole("super_admin", "ops_viewer"), async (req: any, res) => {
    try {
      const filters = {
        action: req.query.action as string | undefined,
        actorId: req.query.actorId as string | undefined,
        actorUsername: req.query.actorUsername as string | undefined,
        entityType: req.query.entityType as string | undefined,
        entityId: req.query.entityId as string | undefined,
        severity: req.query.severity as string | undefined,
        startDate: req.query.startDate as string | undefined,
        endDate: req.query.endDate as string | undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      };

      const { logs, total } = await queryAuditLogs(filters);
      res.json({ logs, total, limit: filters.limit, offset: filters.offset });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/audit-logs/actions", requireAdminRole("super_admin", "ops_viewer"), async (_req: any, res) => {
    try {
      const actions = await getAuditLogActions();
      res.json({ actions });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/audit-logs/entity-types", requireAdminRole("super_admin", "ops_viewer"), async (_req: any, res) => {
    try {
      const entityTypes = await getAuditLogEntityTypes();
      res.json({ entityTypes });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/audit-logs/export", requireAdminRole("super_admin"), async (req: any, res) => {
    try {
      const filters = {
        action: req.query.action as string | undefined,
        actorId: req.query.actorId as string | undefined,
        entityType: req.query.entityType as string | undefined,
        severity: req.query.severity as string | undefined,
        startDate: req.query.startDate as string | undefined,
        endDate: req.query.endDate as string | undefined,
      };

      const logs = await exportAuditLogs(filters);

      const format = req.query.format || "json";
      if (format === "csv") {
        const headers = ["id", "actor_id", "actor_username", "entity_type", "entity_id", "action", "reason", "severity", "ip_address", "created_at"];
        const csvRows = [headers.join(",")];
        for (const log of logs) {
          const row = headers.map(h => {
            const val = log[h];
            if (val === null || val === undefined) return "";
            const str = String(val);
            return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
          });
          csvRows.push(row.join(","));
        }
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename="audit-logs-${new Date().toISOString().slice(0, 10)}.csv"`);
        return res.send(csvRows.join("\n"));
      }

      res.json({ logs, count: logs.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/audit-logs/:id", requireAdminRole("super_admin", "ops_viewer"), async (req: any, res) => {
    try {
      const result = await pool.query("SELECT * FROM audit_logs WHERE id = $1", [req.params.id]);
      if (!result.rows[0]) {
        return res.status(404).json({ error: "Audit log entry not found" });
      }
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ops-incidents", requireAdminRole("super_admin", "support_admin", "ops_viewer"), async (req: any, res) => {
    try {
      const status = req.query.status as string | undefined;
      const severity = req.query.severity as string | undefined;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
      const offset = parseInt(req.query.offset as string) || 0;

      const conditions: string[] = [];
      const params: any[] = [];
      let idx = 1;

      if (status) { conditions.push(`status = $${idx++}`); params.push(status); }
      if (severity) { conditions.push(`severity = $${idx++}`); params.push(severity); }

      const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

      const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM ops_incidents ${where}`, params);
      const result = await pool.query(
        `SELECT * FROM ops_incidents ${where} ORDER BY created_at DESC LIMIT $${idx++} OFFSET $${idx++}`,
        [...params, limit, offset]
      );

      res.json({ incidents: result.rows, total: countResult.rows[0]?.total || 0 });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/ops-incidents", requireAdminRole("super_admin", "support_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { title, description, severity, category, source, affectedServices, assignedTo, metadata } = req.body;

      if (!title) return res.status(400).json({ error: "Title is required" });

      const result = await pool.query(
        `INSERT INTO ops_incidents (id, title, description, severity, status, category, source, affected_services, assigned_to, metadata, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, 'open', $4, $5, $6, $7, $8, NOW(), NOW())
         RETURNING *`,
        [title, description || null, severity || "warning", category || "general", source || null,
         affectedServices || [], assignedTo || null, metadata ? JSON.stringify(metadata) : "{}"]
      );

      await auditAction(req, admin, "ops_incident_created", "ops_incident", result.rows[0].id, {
        after: { title, severity, category },
        reason: "New operational incident reported",
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/admin/ops-incidents/:id", requireAdminRole("super_admin", "support_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { id } = req.params;

      const existing = await pool.query("SELECT * FROM ops_incidents WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Incident not found" });

      const before = existing.rows[0];
      const updates: string[] = [];
      const params: any[] = [];
      let idx = 1;

      const allowed = ["title", "description", "severity", "status", "category", "assigned_to", "resolution_notes", "metadata"];
      const fieldMap: Record<string, string> = {
        title: "title", description: "description", severity: "severity",
        status: "status", category: "category", assignedTo: "assigned_to",
        resolutionNotes: "resolution_notes", metadata: "metadata",
      };

      for (const [key, col] of Object.entries(fieldMap)) {
        if (req.body[key] !== undefined) {
          updates.push(`${col} = $${idx++}`);
          params.push(key === "metadata" ? JSON.stringify(req.body[key]) : req.body[key]);
        }
      }

      if (req.body.status === "resolved") {
        updates.push(`resolved_at = NOW()`);
        updates.push(`resolved_by = $${idx++}`);
        params.push(admin?.id || null);
      }

      updates.push(`updated_at = NOW()`);

      if (updates.length === 1) return res.status(400).json({ error: "No fields to update" });

      params.push(id);
      const result = await pool.query(
        `UPDATE ops_incidents SET ${updates.join(", ")} WHERE id = $${idx++} RETURNING *`,
        params
      );

      await auditAction(req, admin, "ops_incident_updated", "ops_incident", id, {
        before: { status: before.status, severity: before.severity },
        after: { status: req.body.status, severity: req.body.severity },
        reason: req.body.reason || "Incident updated",
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/comm-templates", requireAdminRole("super_admin", "support_admin", "content_admin"), async (_req: any, res) => {
    try {
      const result = await pool.query("SELECT * FROM comm_templates ORDER BY created_at DESC");
      res.json({ templates: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/comm-templates", requireAdminRole("super_admin", "support_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { name, channel, subject, bodyTemplate, variables, category } = req.body;

      if (!name || !bodyTemplate) return res.status(400).json({ error: "Name and body template are required" });

      const result = await pool.query(
        `INSERT INTO comm_templates (id, name, channel, subject, body_template, variables, category, created_by, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
         RETURNING *`,
        [name, channel || "email", subject || null, bodyTemplate, variables || [], category || "general", admin?.id || null]
      );

      await auditAction(req, admin, "comm_template_created", "comm_template", result.rows[0].id, {
        after: { name, channel },
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.patch("/api/admin/comm-templates/:id", requireAdminRole("super_admin", "support_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { id } = req.params;

      const existing = await pool.query("SELECT * FROM comm_templates WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Template not found" });

      const updates: string[] = [];
      const params: any[] = [];
      let idx = 1;

      const fieldMap: Record<string, string> = {
        name: "name", channel: "channel", subject: "subject",
        bodyTemplate: "body_template", variables: "variables",
        category: "category", isActive: "is_active",
      };

      for (const [key, col] of Object.entries(fieldMap)) {
        if (req.body[key] !== undefined) {
          updates.push(`${col} = $${idx++}`);
          params.push(req.body[key]);
        }
      }

      updates.push(`updated_by = $${idx++}`);
      params.push(admin?.id || null);
      updates.push(`updated_at = NOW()`);

      if (updates.length === 2) return res.status(400).json({ error: "No fields to update" });

      params.push(id);
      const result = await pool.query(
        `UPDATE comm_templates SET ${updates.join(", ")} WHERE id = $${idx++} RETURNING *`,
        params
      );

      await auditAction(req, admin, "comm_template_updated", "comm_template", id, {
        before: { name: existing.rows[0].name },
        after: { name: req.body.name || existing.rows[0].name },
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/comm-templates/:id", requireAdminRole("super_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { id } = req.params;

      const confirmToken = req.headers["x-confirm-token"] as string;
      if (!confirmToken || !validateConfirmationToken(confirmToken, admin?.id, "delete_comm_template").valid) {
        const token = issueConfirmationToken(admin?.id, "delete_comm_template", { templateId: id });
        return res.status(428).json({
          error: "Confirmation required for destructive action",
          confirmToken: token,
          action: "delete_comm_template",
        });
      }

      const existing = await pool.query("SELECT * FROM comm_templates WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Template not found" });

      await pool.query("DELETE FROM comm_templates WHERE id = $1", [id]);

      await auditAction(req, admin, "comm_template_deleted", "comm_template", id, {
        before: { name: existing.rows[0].name },
        reason: "Template permanently deleted",
        severity: "warning",
      });

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/vip-config", requireAdminRole("super_admin", "support_admin"), async (_req: any, res) => {
    try {
      const result = await pool.query(
        `SELECT vc.*, u.username, u.email FROM vip_config vc LEFT JOIN users u ON vc.user_id = u.id WHERE vc.is_active = true ORDER BY vc.created_at DESC`
      );
      res.json({ vipUsers: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/vip-config", requireAdminRole("super_admin", "support_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { userId, priorityLevel, supportTier, notes } = req.body;

      if (!userId) return res.status(400).json({ error: "userId is required" });

      const result = await pool.query(
        `INSERT INTO vip_config (id, user_id, priority_level, support_tier, notes, added_by, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING *`,
        [userId, priorityLevel || "standard", supportTier || "normal", notes || null, admin?.id || null]
      );

      await auditAction(req, admin, "vip_config_added", "vip_config", result.rows[0].id, {
        after: { userId, priorityLevel },
        reason: "VIP user configured",
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/release-checks", requireAdminRole("super_admin", "ops_viewer"), async (req: any, res) => {
    try {
      const version = req.query.version as string | undefined;
      const conditions: string[] = [];
      const params: any[] = [];
      let idx = 1;

      if (version) { conditions.push(`release_version = $${idx++}`); params.push(version); }

      const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const result = await pool.query(
        `SELECT * FROM release_checks ${where} ORDER BY created_at DESC LIMIT 100`,
        params
      );

      res.json({ checks: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/release-checks", requireAdminRole("super_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { releaseVersion, checkName, checkType, status, result: checkResult, details } = req.body;

      if (!releaseVersion || !checkName) return res.status(400).json({ error: "releaseVersion and checkName are required" });

      const result = await pool.query(
        `INSERT INTO release_checks (id, release_version, check_name, check_type, status, result, details, executed_at, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW(), NOW())
         RETURNING *`,
        [releaseVersion, checkName, checkType || "automated", status || "pending",
         checkResult || null, details ? JSON.stringify(details) : "{}"]
      );

      await auditAction(req, admin, "release_check_created", "release_check", result.rows[0].id, {
        after: { releaseVersion, checkName, status },
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/release-checks/:id/override", requireAdminRole("super_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { id } = req.params;
      const { reason } = req.body;

      const confirmToken = req.headers["x-confirm-token"] as string;
      if (!confirmToken || !validateConfirmationToken(confirmToken, admin?.id, "override_release_check").valid) {
        const token = issueConfirmationToken(admin?.id, "override_release_check", { checkId: id });
        return res.status(428).json({
          error: "Confirmation required for release check override",
          confirmToken: token,
          action: "override_release_check",
        });
      }

      if (!reason) return res.status(400).json({ error: "Override reason is required" });

      const existing = await pool.query("SELECT * FROM release_checks WHERE id = $1", [id]);
      if (!existing.rows[0]) return res.status(404).json({ error: "Release check not found" });

      const result = await pool.query(
        `UPDATE release_checks SET status = 'overridden', overridden_by = $1, override_reason = $2 WHERE id = $3 RETURNING *`,
        [admin?.id || null, reason, id]
      );

      await auditAction(req, admin, "release_check_overridden", "release_check", id, {
        before: { status: existing.rows[0].status },
        after: { status: "overridden" },
        reason,
        severity: "warning",
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/content-health-scores", requireAdminRole("super_admin", "content_admin", "ops_viewer"), async (req: any, res) => {
    try {
      const contentType = req.query.contentType as string | undefined;
      const minScore = req.query.minScore ? parseInt(req.query.minScore as string) : undefined;
      const maxScore = req.query.maxScore ? parseInt(req.query.maxScore as string) : undefined;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);

      const conditions: string[] = [];
      const params: any[] = [];
      let idx = 1;

      if (contentType) { conditions.push(`content_type = $${idx++}`); params.push(contentType); }
      if (minScore !== undefined) { conditions.push(`overall_score >= $${idx++}`); params.push(minScore); }
      if (maxScore !== undefined) { conditions.push(`overall_score <= $${idx++}`); params.push(maxScore); }

      const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const result = await pool.query(
        `SELECT * FROM content_health_scores ${where} ORDER BY overall_score ASC, updated_at DESC LIMIT $${idx++}`,
        [...params, limit]
      );

      res.json({ scores: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/ops-weekly-reports", requireAdminRole("super_admin", "ops_viewer"), async (req: any, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 12, 52);
      const result = await pool.query(
        `SELECT * FROM weekly_reports ORDER BY week_start DESC LIMIT $1`,
        [limit]
      );
      res.json({ reports: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue-actions", requireAdminRole("super_admin", "support_admin"), async (req: any, res) => {
    try {
      const status = req.query.status as string | undefined;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);

      const conditions: string[] = [];
      const params: any[] = [];
      let idx = 1;

      if (status) { conditions.push(`status = $${idx++}`); params.push(status); }

      const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const result = await pool.query(
        `SELECT * FROM rescue_actions ${where} ORDER BY created_at DESC LIMIT $${idx++}`,
        [...params, limit]
      );

      res.json({ actions: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue-actions", requireAdminRole("super_admin", "support_admin"), async (req: any, res) => {
    try {
      const admin = req.adminUser;
      const { subscriberId, subscriberEmail, actionType, reason, templateId, extensionDays, discountPercent, expiresAt } = req.body;

      if (!actionType) return res.status(400).json({ error: "actionType is required" });

      const rescueLink = `https://nursenest.ca/rescue/${Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64url")}`;

      const result = await pool.query(
        `INSERT INTO rescue_actions (id, subscriber_id, subscriber_email, action_type, reason, template_id, extension_days, discount_percent, rescue_link, status, performed_by, expires_at, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9, $10, NOW())
         RETURNING *`,
        [subscriberId || null, subscriberEmail || null, actionType, reason || null,
         templateId || null, extensionDays || null, discountPercent || null,
         rescueLink, admin?.id || null, expiresAt ? new Date(expiresAt) : null]
      );

      await auditAction(req, admin, "rescue_action_created", "rescue_action", result.rows[0].id, {
        after: { actionType, subscriberEmail, extensionDays, discountPercent },
        reason: reason || "Rescue action initiated",
      });

      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
