import type { Express } from "express";
import { pool } from "./storage";
import { requireAdmin } from "./admin-auth";
import { z } from "zod";

const VALID_TEMPLATE_CATEGORIES = ["incident", "assurance", "resolution", "goodwill", "support", "billing"] as const;
const VALID_SEVERITIES = ["critical", "high", "medium", "low"] as const;
const VALID_TIERS = ["rpn", "rn", "np", "allied", "imaging", "new_grad_toolkit", "certification_prep", "full_access"] as const;
const VALID_NOTE_CATEGORIES = ["general", "billing", "incident", "rescue", "escalation"] as const;
const VALID_RESCUE_STATUSES = ["pending", "rescued", "acknowledged", "skipped"] as const;

const templateCreateSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.enum(VALID_TEMPLATE_CATEGORIES),
  subject: z.string().max(500).optional(),
  body: z.string().min(1).max(10000),
  placeholders: z.array(z.string().max(100)).optional(),
  isActive: z.boolean().optional(),
});

const rescueActionSchema = z.object({
  userId: z.string().min(1),
  reason: z.string().min(1).max(1000).optional(),
  incidentId: z.string().optional(),
});

const extendSubscriptionSchema = rescueActionSchema.extend({
  days: z.number().int().min(1).max(365),
});

const grantAccessSchema = rescueActionSchema.extend({
  durationHours: z.number().int().min(1).max(720).optional(),
});

const restoreEntitlementSchema = rescueActionSchema.extend({
  tier: z.enum(VALID_TIERS),
});

const noteCreateSchema = z.object({
  content: z.string().min(1).max(5000),
  category: z.enum(VALID_NOTE_CATEGORIES).optional(),
});

const bulkActionSchema = z.object({
  affectedUserIds: z.array(z.string().min(1)).min(1).max(200),
  action: z.enum(["extend_subscription", "grant_temporary_access"]),
  actionParams: z.object({
    days: z.number().int().min(1).max(365).optional(),
    durationHours: z.number().int().min(1).max(720).optional(),
  }).optional(),
  reason: z.string().max(1000).optional(),
  incidentId: z.string().optional(),
});

async function ensureRescueTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS communication_templates (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        subject TEXT,
        body TEXT NOT NULL,
        placeholders JSONB DEFAULT '[]'::jsonb,
        is_active BOOLEAN DEFAULT true,
        created_by VARCHAR,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rescue_action_logs (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        target_user_id VARCHAR NOT NULL,
        target_username TEXT,
        actor_id VARCHAR NOT NULL,
        actor_username TEXT,
        action_type TEXT NOT NULL,
        action_details JSONB DEFAULT '{}'::jsonb,
        reason TEXT,
        incident_id VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS incident_affected_users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        incident_id VARCHAR NOT NULL,
        user_id VARCHAR NOT NULL,
        username TEXT,
        email TEXT,
        tier TEXT,
        subscription_status TEXT,
        severity TEXT DEFAULT 'medium',
        impact_description TEXT,
        rescue_status TEXT DEFAULT 'pending',
        suggested_actions JSONB DEFAULT '[]'::jsonb,
        actions_applied JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS support_notes (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR NOT NULL,
        author_id VARCHAR NOT NULL,
        author_username TEXT,
        content TEXT NOT NULL,
        category TEXT DEFAULT 'general',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_rescue_logs_target ON rescue_action_logs(target_user_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_rescue_logs_incident ON rescue_action_logs(incident_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_affected_users_incident ON incident_affected_users(incident_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_affected_users_user ON incident_affected_users(user_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_support_notes_user ON support_notes(user_id)`);
  } catch (e) {
    console.error("[SubscriberRescue] Table creation error:", e);
  }
}

function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) return obj.map(snakeToCamel);
  if (obj === null || typeof obj !== "object") return obj;
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = value;
  }
  return result;
}

function getAdminRole(admin: any): string {
  return admin.admin_role || admin.adminRole || "super_admin";
}

function hasRescuePermission(admin: any): boolean {
  const role = getAdminRole(admin);
  return ["super_admin", "support_admin"].includes(role);
}

function hasReadPermission(admin: any): boolean {
  const role = getAdminRole(admin);
  return ["super_admin", "support_admin", "ops_viewer", "content_admin"].includes(role);
}

async function logRescueAction(actorId: string, actorUsername: string, targetUserId: string, targetUsername: string | null, actionType: string, actionDetails: any, reason: string | null, incidentId: string | null) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO rescue_action_logs (id, target_user_id, target_username, actor_id, actor_username, action_type, action_details, reason, incident_id, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [targetUserId, targetUsername, actorId, actorUsername, actionType, JSON.stringify(actionDetails), reason, incidentId]
    );
    await client.query(
      `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, action_category, target_type, target_id, after_json, reason, severity, created_at)
       VALUES (gen_random_uuid(), $1, $2, 'subscriber_rescue', $3, $4, 'rescue', 'user', $3, $5, $6, 'info', NOW())`,
      [actorId, actorUsername, targetUserId, `rescue:${actionType}`, JSON.stringify(actionDetails), reason]
    );
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("[SubscriberRescue] Audit log transaction error:", e);
    throw e;
  } finally {
    client.release();
  }
}

async function logAdminAction(actorId: string, actorUsername: string, entityType: string, entityId: string | null, action: string, details: any) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (id, actor_id, actor_username, entity_type, entity_id, action, action_category, after_json, severity, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'rescue_admin', $6, 'info', NOW())`,
      [actorId, actorUsername, entityType, entityId, action, JSON.stringify(details)]
    );
  } catch (e) {
    console.error("[SubscriberRescue] Admin action log error:", e);
  }
}

const DEFAULT_TEMPLATES = [
  {
    name: "Exam Temporarily Unavailable",
    category: "incident",
    subject: "{{exam_name}} is temporarily unavailable",
    body: "Hi {{customer_name}},\n\nWe're aware that {{exam_name}} is temporarily unavailable due to a service issue (Incident #{{incident_id}}). Our team is actively working to restore access.\n\nYour subscription and progress are fully protected. We expect this to be resolved within {{duration}}.\n\nThank you for your patience.",
    placeholders: ["customer_name", "exam_name", "incident_id", "duration"],
  },
  {
    name: "Backup Mode Active",
    category: "incident",
    subject: "Service update: Backup mode activated",
    body: "Hi {{customer_name}},\n\nWe've activated backup mode for {{product_name}} to ensure you can continue studying. Some features may be limited, but your core access is protected.\n\nIncident: #{{incident_id}}\nExpected resolution: {{duration}}\n\nWe'll notify you when full service is restored.",
    placeholders: ["customer_name", "product_name", "incident_id", "duration"],
  },
  {
    name: "Access Protected",
    category: "assurance",
    subject: "Your access is protected",
    body: "Hi {{customer_name}},\n\nWe want to assure you that your access to {{product_name}} is fully protected during the current service event. Your subscription status, study progress, and all data remain safe.\n\nNo action is needed on your part.",
    placeholders: ["customer_name", "product_name"],
  },
  {
    name: "Issue Resolved",
    category: "resolution",
    subject: "Service restored: {{product_name}}",
    body: "Hi {{customer_name}},\n\nGreat news! The issue affecting {{product_name}} has been resolved (Incident #{{incident_id}}). All services are back to normal.\n\nDuration of impact: {{duration}}\n\nWe apologize for any inconvenience. If you experience any remaining issues, please don't hesitate to reach out.",
    placeholders: ["customer_name", "product_name", "incident_id", "duration"],
  },
  {
    name: "Subscription Extended",
    category: "goodwill",
    subject: "Your subscription has been extended",
    body: "Hi {{customer_name}},\n\nAs a gesture of goodwill for the recent service disruption, we've extended your {{product_name}} subscription by {{extension_days}} days.\n\nYour new expiration date is {{new_expiry_date}}.\n\nThank you for being a valued member.",
    placeholders: ["customer_name", "product_name", "extension_days", "new_expiry_date"],
  },
  {
    name: "Backup Link Sent",
    category: "support",
    subject: "Backup resource access for {{product_name}}",
    body: "Hi {{customer_name}},\n\nWhile we work on restoring full access to {{product_name}}, here's a backup resource link you can use:\n\n{{backup_link}}\n\nThis temporary access will remain active until the main service is restored.",
    placeholders: ["customer_name", "product_name", "backup_link"],
  },
  {
    name: "Temporary Billing Sync Issue",
    category: "billing",
    subject: "Billing update: Temporary sync issue",
    body: "Hi {{customer_name}},\n\nWe noticed a temporary billing synchronization issue with your {{product_name}} subscription. Rest assured, your access has NOT been interrupted and your subscription remains active.\n\nWe've resolved the sync issue on our end. No action is needed from you.\n\nIf you see any unexpected charges, please contact us immediately.",
    placeholders: ["customer_name", "product_name"],
  },
  {
    name: "Goodwill Credit Applied",
    category: "goodwill",
    subject: "A credit has been applied to your account",
    body: "Hi {{customer_name}},\n\nWe've applied a goodwill credit to your account as a thank you for your patience during the recent service event affecting {{product_name}}.\n\nCredit details: {{credit_details}}\n\nThank you for being a loyal subscriber.",
    placeholders: ["customer_name", "product_name", "credit_details"],
  },
];

export function registerSubscriberRescueRoutes(app: Express) {
  ensureRescueTables().catch(() => {});

  app.get("/api/admin/rescue/templates", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows } = await pool.query(`SELECT * FROM communication_templates ORDER BY category, name`);
      res.json(snakeToCamel(rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/templates", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const parsed = templateCreateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { name, category, subject, body, placeholders, isActive } = parsed.data;
      const { rows } = await pool.query(
        `INSERT INTO communication_templates (id, name, category, subject, body, placeholders, is_active, created_by, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
        [name, category, subject || null, body, JSON.stringify(placeholders || []), isActive !== false, admin.id]
      );
      await logAdminAction(admin.id, admin.username, "communication_template", rows[0].id, "template_created", { name, category });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/rescue/templates/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const parsed = templateCreateSchema.partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { name, category, subject, body, placeholders, isActive } = parsed.data;
      const { rows } = await pool.query(
        `UPDATE communication_templates SET name = COALESCE($1, name), category = COALESCE($2, category), subject = $3, body = COALESCE($4, body), placeholders = COALESCE($5, placeholders), is_active = COALESCE($6, is_active), updated_at = NOW() WHERE id = $7 RETURNING *`,
        [name, category, subject, body, placeholders ? JSON.stringify(placeholders) : null, isActive, req.params.id]
      );
      if (!rows[0]) return res.status(404).json({ error: "Template not found" });
      await logAdminAction(admin.id, admin.username, "communication_template", req.params.id, "template_updated", { name, category });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/rescue/templates/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      await logAdminAction(admin.id, admin.username, "communication_template", req.params.id, "template_deleted", {});
      await pool.query(`DELETE FROM communication_templates WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/templates/seed", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows: existing } = await pool.query(`SELECT COUNT(*) as cnt FROM communication_templates`);
      if (parseInt(existing[0].cnt) > 0) return res.json({ message: "Templates already seeded", count: parseInt(existing[0].cnt) });
      for (const t of DEFAULT_TEMPLATES) {
        await pool.query(
          `INSERT INTO communication_templates (id, name, category, subject, body, placeholders, is_active, created_by, created_at, updated_at)
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, true, $6, NOW(), NOW())`,
          [t.name, t.category, t.subject, t.body, JSON.stringify(t.placeholders), admin.id]
        );
      }
      await logAdminAction(admin.id, admin.username, "communication_template", null, "templates_seeded", { count: DEFAULT_TEMPLATES.length });
      res.json({ message: "Seeded default templates", count: DEFAULT_TEMPLATES.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/templates/:id/populate", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows } = await pool.query(`SELECT * FROM communication_templates WHERE id = $1`, [req.params.id]);
      if (!rows[0]) return res.status(404).json({ error: "Template not found" });
      const template = rows[0];
      const values = req.body.values || {};
      let populatedSubject = template.subject || "";
      let populatedBody = template.body || "";
      for (const [key, val] of Object.entries(values)) {
        const safeKey = key.replace(/[^a-zA-Z0-9_]/g, "");
        const regex = new RegExp(`\\{\\{${safeKey}\\}\\}`, "g");
        populatedSubject = populatedSubject.replace(regex, String(val));
        populatedBody = populatedBody.replace(regex, String(val));
      }
      res.json({ subject: populatedSubject, body: populatedBody, template: snakeToCamel(template) });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/extend-subscription", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions for rescue actions" });
    try {
      const parsed = extendSubscriptionSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { userId, days, reason, incidentId } = parsed.data;
      const { rows: userRows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
      if (!userRows[0]) return res.status(404).json({ error: "User not found" });
      const user = userRows[0];
      const currentExpiry = user.plan_expires_at ? new Date(user.plan_expires_at) : new Date();
      const newExpiry = new Date(Math.max(currentExpiry.getTime(), Date.now()) + days * 86400000);
      await pool.query(`UPDATE users SET plan_expires_at = $1 WHERE id = $2`, [newExpiry, userId]);
      await logRescueAction(admin.id, admin.username, userId, user.username, "extend_subscription", { days, previousExpiry: user.plan_expires_at, newExpiry: newExpiry.toISOString() }, reason || null, incidentId || null);
      res.json({ success: true, newExpiry: newExpiry.toISOString(), user: snakeToCamel(userRows[0]) });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/grant-temporary-access", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions for rescue actions" });
    try {
      const parsed = grantAccessSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { userId, durationHours, reason, incidentId } = parsed.data;
      const hours = durationHours || 24;
      const { rows: userRows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
      if (!userRows[0]) return res.status(404).json({ error: "User not found" });
      const user = userRows[0];
      const expiry = new Date(Date.now() + hours * 3600000);
      await pool.query(`UPDATE users SET tester_access = true, tester_expiry = $1 WHERE id = $2`, [expiry, userId]);
      await logRescueAction(admin.id, admin.username, userId, user.username, "grant_temporary_access", { durationHours: hours, expiry: expiry.toISOString() }, reason || null, incidentId || null);
      res.json({ success: true, accessExpiry: expiry.toISOString() });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/restore-entitlement", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions for rescue actions" });
    try {
      const parsed = restoreEntitlementSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { userId, tier, reason, incidentId } = parsed.data;
      const { rows: userRows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
      if (!userRows[0]) return res.status(404).json({ error: "User not found" });
      const user = userRows[0];
      const previousTier = user.tier;
      await pool.query(`UPDATE users SET tier = $1, subscription_status = 'active' WHERE id = $2`, [tier, userId]);
      await logRescueAction(admin.id, admin.username, userId, user.username, "restore_entitlement", { previousTier, newTier: tier }, reason || null, incidentId || null);
      res.json({ success: true, previousTier, newTier: tier });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/replay-billing-sync", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions for rescue actions" });
    try {
      const parsed = rescueActionSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { userId, reason, incidentId } = parsed.data;
      const { rows: userRows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
      if (!userRows[0]) return res.status(404).json({ error: "User not found" });
      const user = userRows[0];
      const syncResult: any = { synced: true, timestamp: new Date().toISOString() };
      if (user.stripe_subscription_id) {
        try {
          const { getUncachableStripeClient } = await import("./stripeClient");
          const stripe = await getUncachableStripeClient();
          if (stripe) {
            const sub = await stripe.subscriptions.retrieve(user.stripe_subscription_id);
            const status = sub.status === "active" ? "active" : sub.status === "past_due" ? "past_due" : sub.status === "canceled" ? "canceled" : "inactive";
            await pool.query(`UPDATE users SET subscription_status = $1 WHERE id = $2`, [status, userId]);
            syncResult.stripeStatus = sub.status;
            syncResult.mappedStatus = status;
          }
        } catch (stripeErr: any) {
          syncResult.stripeError = stripeErr.message;
        }
      }
      await logRescueAction(admin.id, admin.username, userId, user.username, "replay_billing_sync", syncResult, reason || null, incidentId || null);
      res.json({ success: true, syncResult });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/reset-stuck-state", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions for rescue actions" });
    try {
      const parsed = rescueActionSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { userId, reason, incidentId } = parsed.data;
      const { rows: userRows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
      if (!userRows[0]) return res.status(404).json({ error: "User not found" });
      const user = userRows[0];
      const resetDetails: any = { resets: [] };
      const { rows: stuckTests } = await pool.query(
        `UPDATE test_results SET completed_at = NOW() WHERE user_id = $1 AND completed_at IS NULL RETURNING id`,
        [userId]
      ).catch(() => ({ rows: [] }));
      if (stuckTests.length > 0) {
        resetDetails.resets.push({ type: "stuck_tests", count: stuckTests.length });
      }
      await logRescueAction(admin.id, admin.username, userId, user.username, "reset_stuck_state", resetDetails, reason || null, incidentId || null);
      res.json({ success: true, resetDetails });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue/actions", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const userId = req.query.userId as string;
      const incidentId = req.query.incidentId as string;
      const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
      let query = `SELECT * FROM rescue_action_logs`;
      const params: any[] = [];
      const conditions: string[] = [];
      if (userId) { conditions.push(`target_user_id = $${params.length + 1}`); params.push(userId); }
      if (incidentId) { conditions.push(`incident_id = $${params.length + 1}`); params.push(incidentId); }
      if (conditions.length) query += ` WHERE ${conditions.join(" AND ")}`;
      query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
      params.push(limit);
      const { rows } = await pool.query(query, params);
      res.json(snakeToCamel(rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue/incidents/:incidentId/affected-users", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows } = await pool.query(
        `SELECT * FROM incident_affected_users WHERE incident_id = $1 ORDER BY severity DESC, created_at DESC`,
        [req.params.incidentId]
      );
      res.json(snakeToCamel(rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/incidents/:incidentId/affected-users", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { userId, severity, impactDescription, suggestedActions } = req.body;
      if (!userId) return res.status(400).json({ error: "userId is required" });
      if (severity && !VALID_SEVERITIES.includes(severity)) return res.status(400).json({ error: "Invalid severity" });
      const { rows: userRows } = await pool.query(`SELECT id, username, email, tier, subscription_status FROM users WHERE id = $1`, [userId]);
      if (!userRows[0]) return res.status(404).json({ error: "User not found" });
      const user = userRows[0];
      const { rows: existing } = await pool.query(`SELECT id FROM incident_affected_users WHERE incident_id = $1 AND user_id = $2`, [req.params.incidentId, userId]);
      if (existing[0]) return res.status(409).json({ error: "User already linked to this incident" });
      const { rows } = await pool.query(
        `INSERT INTO incident_affected_users (id, incident_id, user_id, username, email, tier, subscription_status, severity, impact_description, suggested_actions, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
        [req.params.incidentId, userId, user.username, user.email, user.tier, user.subscription_status, severity || "medium", impactDescription || null, JSON.stringify(suggestedActions || [])]
      );
      await logAdminAction(admin.id, admin.username, "incident_affected_user", rows[0].id, "affected_user_linked", { incidentId: req.params.incidentId, userId });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/incidents/:incidentId/auto-detect", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows: incidentRows } = await pool.query(`SELECT * FROM incidents WHERE id = $1`, [req.params.incidentId]);
      if (!incidentRows[0]) return res.status(404).json({ error: "Incident not found" });
      const incident = incidentRows[0];
      const { rows: activeUsers } = await pool.query(
        `SELECT DISTINCT u.id, u.username, u.email, u.tier, u.subscription_status
         FROM users u
         WHERE u.subscription_status = 'active' AND u.tier != 'free' AND u.tier != 'admin'
         LIMIT 100`
      );
      let added = 0;
      for (const user of activeUsers) {
        const { rows: existing } = await pool.query(`SELECT id FROM incident_affected_users WHERE incident_id = $1 AND user_id = $2`, [req.params.incidentId, user.id]);
        if (!existing[0]) {
          const sev = incident.severity === "critical" ? "high" : incident.severity || "medium";
          const suggested = [];
          if (incident.severity === "critical" || incident.severity === "high") {
            suggested.push("extend_subscription", "send_acknowledgment");
          }
          suggested.push("send_status_update");
          await pool.query(
            `INSERT INTO incident_affected_users (id, incident_id, user_id, username, email, tier, subscription_status, severity, impact_description, suggested_actions, created_at, updated_at)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
            [req.params.incidentId, user.id, user.username, user.email, user.tier, user.subscription_status, sev, `Affected by incident: ${incident.title}`, JSON.stringify(suggested)]
          );
          added++;
        }
      }
      await logAdminAction(admin.id, admin.username, "incident", req.params.incidentId, "auto_detect_affected_users", { usersAdded: added, totalChecked: activeUsers.length });
      res.json({ success: true, usersAdded: added, totalChecked: activeUsers.length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/admin/rescue/affected-users/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rescueStatus, actionsApplied } = req.body;
      if (rescueStatus && !(VALID_RESCUE_STATUSES as readonly string[]).includes(rescueStatus)) {
        return res.status(400).json({ error: "Invalid rescue status" });
      }
      const updates: string[] = [];
      const params: any[] = [];
      if (rescueStatus) { params.push(rescueStatus); updates.push(`rescue_status = $${params.length}`); }
      if (actionsApplied) { params.push(JSON.stringify(actionsApplied)); updates.push(`actions_applied = $${params.length}`); }
      updates.push("updated_at = NOW()");
      params.push(req.params.id);
      const { rows } = await pool.query(
        `UPDATE incident_affected_users SET ${updates.join(", ")} WHERE id = $${params.length} RETURNING *`,
        params
      );
      if (!rows[0]) return res.status(404).json({ error: "Affected user record not found" });
      await logAdminAction(admin.id, admin.username, "incident_affected_user", req.params.id, "affected_user_updated", { rescueStatus });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/bulk-action", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions for bulk rescue actions" });
    try {
      const parsed = bulkActionSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { affectedUserIds, action, actionParams: ap, reason, incidentId } = parsed.data;
      const results: any[] = [];
      for (const auId of affectedUserIds) {
        const { rows: auRows } = await pool.query(`SELECT * FROM incident_affected_users WHERE id = $1`, [auId]);
        if (!auRows[0]) { results.push({ id: auId, error: "Not found" }); continue; }
        const au = auRows[0];
        try {
          if (action === "extend_subscription") {
            const days = ap?.days || 7;
            const { rows: userRows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [au.user_id]);
            if (userRows[0]) {
              const currentExpiry = userRows[0].plan_expires_at ? new Date(userRows[0].plan_expires_at) : new Date();
              const newExpiry = new Date(Math.max(currentExpiry.getTime(), Date.now()) + days * 86400000);
              await pool.query(`UPDATE users SET plan_expires_at = $1 WHERE id = $2`, [newExpiry, au.user_id]);
              await logRescueAction(admin.id, admin.username, au.user_id, au.username, "extend_subscription", { days, bulk: true }, reason || null, incidentId || au.incident_id);
            }
          } else if (action === "grant_temporary_access") {
            const hours = ap?.durationHours || 24;
            const expiry = new Date(Date.now() + hours * 3600000);
            await pool.query(`UPDATE users SET tester_access = true, tester_expiry = $1 WHERE id = $2`, [expiry, au.user_id]);
            await logRescueAction(admin.id, admin.username, au.user_id, au.username, "grant_temporary_access", { durationHours: hours, bulk: true }, reason || null, incidentId || au.incident_id);
          }
          await pool.query(
            `UPDATE incident_affected_users SET rescue_status = 'rescued', actions_applied = actions_applied || $1::jsonb, updated_at = NOW() WHERE id = $2`,
            [JSON.stringify([{ action, params: ap, appliedAt: new Date().toISOString(), appliedBy: admin.username }]), auId]
          );
          results.push({ id: auId, userId: au.user_id, success: true });
        } catch (actionErr: any) {
          results.push({ id: auId, userId: au.user_id, error: actionErr.message });
        }
      }
      res.json({ results, total: affectedUserIds.length, succeeded: results.filter((r: any) => r.success).length });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue/user/:userId/notes", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows } = await pool.query(`SELECT * FROM support_notes WHERE user_id = $1 ORDER BY created_at DESC`, [req.params.userId]);
      res.json(snakeToCamel(rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin/rescue/user/:userId/notes", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const parsed = noteCreateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      const { content, category } = parsed.data;
      const { rows } = await pool.query(
        `INSERT INTO support_notes (id, user_id, author_id, author_username, content, category, created_at)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW()) RETURNING *`,
        [req.params.userId, admin.id, admin.username, content, category || "general"]
      );
      await logAdminAction(admin.id, admin.username, "support_note", rows[0].id, "note_created", { userId: req.params.userId, category });
      res.json(snakeToCamel(rows[0]));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin/rescue/notes/:id", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasRescuePermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      await logAdminAction(admin.id, admin.username, "support_note", req.params.id, "note_deleted", {});
      await pool.query(`DELETE FROM support_notes WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue/user/:userId/profile", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows: userRows } = await pool.query(`SELECT id, username, email, tier, subscription_status, plan_expires_at, stripe_customer_id, stripe_subscription_id, region, tester_access, tester_expiry, is_lifetime FROM users WHERE id = $1`, [req.params.userId]);
      if (!userRows[0]) return res.status(404).json({ error: "User not found" });
      const { rows: rescueActions } = await pool.query(`SELECT * FROM rescue_action_logs WHERE target_user_id = $1 ORDER BY created_at DESC LIMIT 20`, [req.params.userId]);
      const { rows: notes } = await pool.query(`SELECT * FROM support_notes WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20`, [req.params.userId]);
      const { rows: affectedIncidents } = await pool.query(
        `SELECT iau.*, i.title as incident_title, i.severity as incident_severity, i.status as incident_status
         FROM incident_affected_users iau
         LEFT JOIN incidents i ON iau.incident_id = i.id
         WHERE iau.user_id = $1 ORDER BY iau.created_at DESC LIMIT 10`,
        [req.params.userId]
      );
      res.json({
        user: snakeToCamel(userRows[0]),
        rescueActions: snakeToCamel(rescueActions),
        supportNotes: snakeToCamel(notes),
        affectedIncidents: snakeToCamel(affectedIncidents),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue/user-search", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const q = req.query.q as string;
      if (!q || q.length < 2) return res.json([]);
      const { rows } = await pool.query(
        `SELECT id, username, email, tier, subscription_status, plan_expires_at FROM users
         WHERE username ILIKE $1 OR email ILIKE $1 OR id = $2
         ORDER BY username LIMIT 20`,
        [`%${q}%`, q]
      );
      res.json(snakeToCamel(rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue/incidents-list", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows } = await pool.query(
        `SELECT i.*, (SELECT COUNT(*) FROM incident_affected_users WHERE incident_id = i.id) as affected_count
         FROM incidents i ORDER BY i.created_at DESC LIMIT 50`
      );
      res.json(snakeToCamel(rows));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/admin/rescue/stats", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    if (!hasReadPermission(admin)) return res.status(403).json({ error: "Insufficient permissions" });
    try {
      const { rows: totalActions } = await pool.query(`SELECT COUNT(*) as cnt FROM rescue_action_logs`);
      const { rows: recentActions } = await pool.query(`SELECT COUNT(*) as cnt FROM rescue_action_logs WHERE created_at > NOW() - INTERVAL '7 days'`);
      const { rows: pendingAffected } = await pool.query(`SELECT COUNT(*) as cnt FROM incident_affected_users WHERE rescue_status = 'pending'`);
      const { rows: activeIncidents } = await pool.query(`SELECT COUNT(*) as cnt FROM incidents WHERE status IN ('active', 'investigating')`);
      const { rows: templateCount } = await pool.query(`SELECT COUNT(*) as cnt FROM communication_templates`);
      res.json({
        totalRescueActions: parseInt(totalActions[0].cnt),
        recentRescueActions: parseInt(recentActions[0].cnt),
        pendingAffectedUsers: parseInt(pendingAffected[0].cnt),
        activeIncidents: parseInt(activeIncidents[0].cnt),
        templateCount: parseInt(templateCount[0].cnt),
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}
