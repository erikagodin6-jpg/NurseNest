import jwt from "jsonwebtoken";
import { pool } from "./storage";

const JWT_SECRET = () => process.env.ADMIN_JWT_SECRET || "fallback-dev-secret-change-me";
const SERVER_API_KEY = () => process.env.ADMIN_API_KEY || "";
const TOKEN_EXPIRY_SECONDS = 1800;

export interface AdminTokenPayload {
  sub: string;
  username: string;
  role: "admin";
  iat: number;
  exp: number;
}

export function signAdminToken(adminId: string, username: string): { accessToken: string; expiresInSeconds: number } {
  const payload = { sub: adminId, username, role: "admin" as const };
  const accessToken = jwt.sign(payload, JWT_SECRET(), { expiresIn: TOKEN_EXPIRY_SECONDS });
  return { accessToken, expiresInSeconds: TOKEN_EXPIRY_SECONDS };
}

const USER_TOKEN_EXPIRY = 86400 * 30;

export function signUserToken(userId: string, username: string): { userToken: string; expiresInSeconds: number } {
  const payload = { sub: userId, username, role: "user" as const };
  const userToken = jwt.sign(payload, JWT_SECRET(), { expiresIn: USER_TOKEN_EXPIRY });
  return { userToken, expiresInSeconds: USER_TOKEN_EXPIRY };
}

export function verifyUserToken(token: string): { sub: string; username: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET()) as any;
    if (!decoded.sub) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET()) as AdminTokenPayload;
    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function requireAdmin(req: any, res: any): Promise<any> {
  const authHeader = String(req.headers?.["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();

    const decoded = verifyAdminToken(token);
    if (decoded) {
      const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [decoded.sub]);
      if (r.rows[0]) return r.rows[0];
    }

    const serverKey = SERVER_API_KEY();
    if (serverKey && token === serverKey) {
      const adminId = String(req.headers?.["x-admin-id"] || "");
      if (adminId) {
        const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
        if (r.rows[0]) return r.rows[0];
      }
      const r = await pool.query("SELECT * FROM users WHERE tier = 'admin' LIMIT 1");
      if (r.rows[0]) return r.rows[0];
    }
  }

  const username = String(req.headers?.["x-username"] || req.body?.username || req.query?.username || "");
  const password = String(req.headers?.["x-password"] || req.body?.password || req.query?.password || "");
  if (username && password) {
    const r = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2 AND tier = 'admin'", [username, password]);
    if (r.rows[0]) return r.rows[0];
  }

  const adminId = String(req.headers?.["x-admin-id"] || req.body?.adminId || req.query?.adminId || "");
  if (adminId) {
    const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
    if (r.rows[0]) return r.rows[0];
  }

  res.status(401).json({ error: "Unauthorized" });
  return null;
}

export async function resolveAuthUser(req: any): Promise<any | null> {
  const authHeader = String(req.headers?.["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const decoded = verifyAdminToken(token);
    if (decoded) {
      const r = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.sub]);
      if (r.rows[0]) return r.rows[0];
    }
  }

  const username = String(req.headers?.["x-username"] || "");
  const password = String(req.headers?.["x-password"] || "");
  if (username && password) {
    const r = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);
    if (r.rows[0]) return r.rows[0];
  }

  const qUsername = String(req.query?.username || req.body?.username || "");
  const qPassword = String(req.query?.password || req.body?.password || "");
  if (qUsername && qPassword) {
    const r = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [qUsername, qPassword]);
    if (r.rows[0]) return r.rows[0];
  }

  const userToken = String(req.headers?.["x-user-token"] || "");
  if (userToken) {
    const decoded = verifyUserToken(userToken);
    if (decoded) {
      const r = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.sub]);
      if (r.rows[0]) return r.rows[0];
    }
  }

  return null;
}

function isActiveTester(user: any): boolean {
  if (!user.tester_access && !user.testerAccess) return false;
  const expiry = user.tester_expiry || user.testerExpiry;
  if (expiry && new Date(expiry) < new Date()) return false;
  return true;
}

export function requireExactTier(requiredTier: string) {
  return async (req: any, res: any, next: any) => {
    const user = await resolveAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userTier = user.tier || "free";

    if (userTier === "admin") {
      req.authUser = user;
      return next();
    }

    if (isActiveTester(user)) {
      req.authUser = user;
      return next();
    }

    if (userTier !== requiredTier) {
      return res.status(403).json({
        error: "Tier access denied",
        required: requiredTier,
        userTier,
      });
    }

    req.authUser = user;
    next();
  };
}

export function requireAnyPaidTier() {
  return async (req: any, res: any, next: any) => {
    const user = await resolveAuthUser(req);
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userTier = user.tier || "free";
    const paidTiers = new Set(["rpn", "rn", "np", "admin"]);

    if (!paidTiers.has(userTier) && !isActiveTester(user)) {
      return res.status(403).json({
        error: "Premium feature - upgrade required",
        upgradeRequired: true,
      });
    }

    req.authUser = user;
    next();
  };
}

export async function requireInternal(req: any, res: any): Promise<boolean> {
  const authHeader = String(req.headers?.["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const serverKey = SERVER_API_KEY();
    if (serverKey && token === serverKey) return true;
  }
  res.status(401).json({ error: "Unauthorized" });
  return false;
}

export async function requireInternalOrAdmin(req: any, res: any): Promise<any> {
  const authHeader = String(req.headers?.["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();

    const serverKey = SERVER_API_KEY();
    if (serverKey && token === serverKey) {
      const adminId = String(req.headers?.["x-admin-id"] || "");
      if (adminId) {
        const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
        if (r.rows[0]) return r.rows[0];
      }
      const r = await pool.query("SELECT * FROM users WHERE tier = 'admin' LIMIT 1");
      if (r.rows[0]) return r.rows[0];
      return { id: "internal", username: "system", tier: "admin" };
    }

    const decoded = verifyAdminToken(token);
    if (decoded) {
      const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [decoded.sub]);
      if (r.rows[0]) return r.rows[0];
    }
  }

  const adminId = String(req.headers?.["x-admin-id"] || "");
  if (adminId) {
    const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
    if (r.rows[0]) return r.rows[0];
  }

  res.status(401).json({ error: "Unauthorized" });
  return null;
}
