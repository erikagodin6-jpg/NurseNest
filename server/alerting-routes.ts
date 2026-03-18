import type { Express } from "express";
import pg from "pg";
import { requireAdmin } from "./admin-auth";
import { getAlertThresholds, setAlertThresholds, runAlertingChecks, fireAlert } from "./alerting-engine";
import { runAllSyntheticTests, runSyntheticTest, getAvailableTests } from "./synthetic-monitoring";

export function registerAlertingRoutes(app: Express, pool: pg.Pool) {
  app.get("/api/admin/reliability/alerts", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 50, 1), 200);
      const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);
      const severity = req.query.severity as string | undefined;
      const alertType = req.query.type as string | undefined;
      const acknowledged = req.query.acknowledged as string | undefined;

      let whereClause = "WHERE 1=1";
      const params: any[] = [];
      let paramIdx = 1;

      if (severity) {
        whereClause += ` AND severity = $${paramIdx++}`;
        params.push(severity);
      }
      if (alertType) {
        whereClause += ` AND alert_type = $${paramIdx++}`;
        params.push(alertType);
      }
      if (acknowledged === "true" || acknowledged === "false") {
        whereClause += ` AND acknowledged = $${paramIdx++}`;
        params.push(acknowledged === "true");
      }

      const countResult = await pool.query(
        `SELECT COUNT(*)::int AS total FROM reliability_alerts ${whereClause}`,
        params
      );
      const result = await pool.query(
        `SELECT * FROM reliability_alerts ${whereClause} ORDER BY created_at DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`,
        [...params, limit, offset]
      );

      res.json({
        items: result.rows,
        total: countResult.rows[0]?.total || 0,
        limit,
        offset,
      });
    } catch (e: any) {
      if (e.message?.includes("does not exist")) {
        return res.json({ items: [], total: 0, limit: 50, offset: 0 });
      }
      console.error("[AlertRoutes] GET alerts error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/reliability/alerts/summary", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const hours = Math.min(Math.max(parseInt(req.query.hours as string) || 24, 1), 168);
      const result = await pool.query(`
        SELECT 
          alert_type,
          severity,
          COUNT(*)::int AS count,
          MAX(created_at) AS latest
        FROM reliability_alerts
        WHERE created_at > NOW() - ($1 || ' hours')::interval
        GROUP BY alert_type, severity
        ORDER BY count DESC
      `, [hours]);
      const unackResult = await pool.query(
        `SELECT COUNT(*)::int AS count FROM reliability_alerts WHERE acknowledged = false`
      );
      res.json({
        summary: result.rows,
        unacknowledgedCount: unackResult.rows[0]?.count || 0,
        hours,
      });
    } catch (e: any) {
      if (e.message?.includes("does not exist")) {
        return res.json({ summary: [], unacknowledgedCount: 0, hours: 24 });
      }
      console.error("[AlertRoutes] GET summary error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/reliability/alerts/:id/acknowledge", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { id } = req.params;
      const result = await pool.query(
        `UPDATE reliability_alerts SET acknowledged = true, acknowledged_by = $1, acknowledged_at = NOW()
         WHERE id = $2 RETURNING *`,
        [admin.username || admin.id || "admin", id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Alert not found" });
      }
      res.json(result.rows[0]);
    } catch (e: any) {
      console.error("[AlertRoutes] acknowledge error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/reliability/alerts/acknowledge-all", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const { alertType, severity } = req.body || {};
      let whereClause = "WHERE acknowledged = false";
      const params: any[] = [admin.username || admin.id || "admin"];
      let paramIdx = 2;

      if (alertType) {
        whereClause += ` AND alert_type = $${paramIdx++}`;
        params.push(alertType);
      }
      if (severity) {
        whereClause += ` AND severity = $${paramIdx++}`;
        params.push(severity);
      }

      const result = await pool.query(
        `UPDATE reliability_alerts SET acknowledged = true, acknowledged_by = $1, acknowledged_at = NOW()
         ${whereClause} RETURNING id`,
        params
      );
      res.json({ acknowledged: result.rows.length });
    } catch (e: any) {
      console.error("[AlertRoutes] acknowledge-all error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/reliability/thresholds", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    res.json(getAlertThresholds());
  });

  app.put("/api/admin/reliability/thresholds", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const updates: Record<string, number> = {};
      const allowedKeys = [
        "failureRatePercent", "fallbackRatePercent", "quarantineCountPerHour",
        "protectedRecoveryCountPerHour", "backupFailureCountPerHour",
        "entitlementMismatchCountPerHour", "cooldownMinutes"
      ];
      for (const key of allowedKeys) {
        if (key in req.body && typeof req.body[key] === "number" && req.body[key] >= 0) {
          updates[key] = req.body[key];
        }
      }
      const result = await setAlertThresholds(updates, pool);
      res.json(result);
    } catch (e: any) {
      console.error("[AlertRoutes] PUT thresholds error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/reliability/check-now", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      await runAlertingChecks(pool);
      res.json({ success: true, message: "Alerting checks completed" });
    } catch (e: any) {
      console.error("[AlertRoutes] check-now error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/reliability/synthetic/tests", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    res.json(getAvailableTests());
  });

  app.post("/api/admin/reliability/synthetic/run", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const port = process.env.PORT || "5000";
      const baseUrl = `http://127.0.0.1:${port}`;
      const { testName } = req.body || {};
      if (testName) {
        const result = await runSyntheticTest(pool, testName, baseUrl);
        return res.json(result);
      }
      const results = await runAllSyntheticTests(pool, baseUrl);
      res.json({
        results,
        summary: {
          total: results.length,
          passed: results.filter(r => r.status === "pass").length,
          failed: results.filter(r => r.status === "fail").length,
        },
      });
    } catch (e: any) {
      console.error("[AlertRoutes] synthetic run error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/reliability/synthetic/results", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 50, 1), 200);
      const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);
      const testName = req.query.testName as string | undefined;

      let whereClause = "";
      const params: any[] = [];
      let paramIdx = 1;

      if (testName) {
        whereClause = `WHERE test_name = $${paramIdx++}`;
        params.push(testName);
      }

      const countResult = await pool.query(
        `SELECT COUNT(*)::int AS total FROM synthetic_test_results ${whereClause}`,
        params
      );
      const result = await pool.query(
        `SELECT * FROM synthetic_test_results ${whereClause} ORDER BY created_at DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`,
        [...params, limit, offset]
      );

      res.json({
        items: result.rows,
        total: countResult.rows[0]?.total || 0,
        limit,
        offset,
      });
    } catch (e: any) {
      if (e.message?.includes("does not exist")) {
        return res.json({ items: [], total: 0, limit: 50, offset: 0 });
      }
      console.error("[AlertRoutes] synthetic results error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/reliability/synthetic/latest", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const result = await pool.query(`
        SELECT DISTINCT ON (test_name) *
        FROM synthetic_test_results
        ORDER BY test_name, created_at DESC
      `);
      const passed = result.rows.filter(r => r.status === "pass").length;
      const failed = result.rows.filter(r => r.status === "fail").length;
      res.json({
        tests: result.rows,
        summary: { total: result.rows.length, passed, failed },
      });
    } catch (e: any) {
      if (e.message?.includes("does not exist")) {
        return res.json({ tests: [], summary: { total: 0, passed: 0, failed: 0 } });
      }
      console.error("[AlertRoutes] synthetic latest error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/reliability/synthetic/history", async (req, res) => {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    try {
      const hours = Math.min(Math.max(parseInt(req.query.hours as string) || 24, 1), 168);
      const result = await pool.query(`
        SELECT 
          test_name,
          COUNT(*)::int AS total_runs,
          COUNT(*) FILTER (WHERE status = 'pass')::int AS passes,
          COUNT(*) FILTER (WHERE status = 'fail')::int AS failures,
          ROUND(AVG(response_time_ms))::int AS avg_response_ms,
          MAX(response_time_ms)::int AS max_response_ms,
          MIN(response_time_ms)::int AS min_response_ms
        FROM synthetic_test_results
        WHERE created_at > NOW() - ($1 || ' hours')::interval
        GROUP BY test_name
        ORDER BY test_name
      `, [hours]);
      res.json({ history: result.rows, hours });
    } catch (e: any) {
      if (e.message?.includes("does not exist")) {
        return res.json({ history: [], hours: 24 });
      }
      console.error("[AlertRoutes] synthetic history error:", e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
