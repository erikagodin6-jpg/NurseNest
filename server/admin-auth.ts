/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * AUTHENTICATION & ADMIN AUTH MODULE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This module handles JWT signing/verification and user resolution from
 * request headers. It is the authentication layer only.
 *
 * For ENTITLEMENT / PREMIUM ACCESS decisions, use server/entitlements.ts:
 *   - requireEntitlement("feature")  — middleware that checks feature access
 *   - requireAnyPremium()            — middleware that requires any paid tier
 *   - checkEntitlement(user, feature) — boolean check
 *
 * DO NOT add new inline tier checks or paywall logic here. This module
 * should only answer "who is this user?" — not "what can they access?".
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "./storage";

const BCRYPT_ROUNDS = 12;

function getJwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET environment variable is required. Server cannot start without it.");
  }
  return secret;
}

const SERVER_API_KEY = () => process.env.ADMIN_API_KEY || "";
const TOKEN_EXPIRY_SECONDS = 1800;

export interface AdminTokenPayload {
  sub: string;
  username: string;
  role: "admin";
  iat: number;
  exp: number;
}

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, BCRYPT_ROUNDS);
}

export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$")) {
    return bcrypt.compare(plaintext, hash);
  }
  if (plaintext === hash) {
    return true;
  }
  return false;
}

export async function migratePasswordIfNeeded(userId: string, plaintext: string, storedPassword: string): Promise<void> {
  if (!storedPassword.startsWith("$2a$") && !storedPassword.startsWith("$2b$") && !storedPassword.startsWith("$2y$")) {
    const hashed = await hashPassword(plaintext);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, userId]);
    console.log(`[Security] Migrated plaintext password to bcrypt for user ${userId}`);
  }
}

export function signAdminToken(adminId: string, username: string): { accessToken: string; expiresInSeconds: number } {
  const payload = { sub: adminId, username, role: "admin" as const };
  const accessToken = jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_EXPIRY_SECONDS });
  return { accessToken, expiresInSeconds: TOKEN_EXPIRY_SECONDS };
}

const USER_TOKEN_EXPIRY = 86400 * 7;

export function signUserToken(userId: string, username: string): { userToken: string; expiresInSeconds: number } {
  const payload = { sub: userId, username, role: "user" as const };
  const userToken = jwt.sign(payload, getJwtSecret(), { expiresIn: USER_TOKEN_EXPIRY });
  return { userToken, expiresInSeconds: USER_TOKEN_EXPIRY };
}

export function verifyUserToken(token: string): { sub: string; username: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as any;
    if (!decoded.sub) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AdminTokenPayload;
    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}

const failedLoginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const SUSPICIOUS_THRESHOLD = 10;
const SUSPICIOUS_WINDOW_MS = 15 * 60 * 1000;

export function recordFailedLogin(identifier: string): void {
  const now = Date.now();
  const existing = failedLoginAttempts.get(identifier);
  if (existing && (now - existing.lastAttempt) < SUSPICIOUS_WINDOW_MS) {
    existing.count++;
    existing.lastAttempt = now;
    if (existing.count >= SUSPICIOUS_THRESHOLD) {
      console.warn(`[Security] Suspicious login activity detected: ${existing.count} failed attempts for "${identifier}" in ${SUSPICIOUS_WINDOW_MS / 60000} minutes`);
    }
  } else {
    failedLoginAttempts.set(identifier, { count: 1, lastAttempt: now });
  }
}

export function logSecurityAudit(action: string, details: Record<string, any>): void {
  console.log(`[SecurityAudit] ${JSON.stringify({
    timestamp: new Date().toISOString(),
    action,
    ...details,
  })}`);
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
      const r = await pool.query("SELECT * FROM users WHERE tier = 'admin' LIMIT 1");
      if (r.rows[0]) return r.rows[0];
    }
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
    const userDecoded = verifyUserToken(token);
    if (userDecoded) {
      const r = await pool.query("SELECT * FROM users WHERE id = $1", [userDecoded.sub]);
      if (r.rows[0]) return r.rows[0];
    }
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
      logPaywallAudit({
        userId: "anonymous",
        role: "anonymous",
        tier: "none",
        subscriptionStatus: "none",
        resourcePath: req.originalUrl || req.url,
        contentTier: null,
        granted: false,
      });
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userTier = user.tier || "free";
    const paidTiers = new Set(["rpn", "rn", "np", "allied", "imaging", "new_grad_toolkit", "certification_prep", "full_access", "admin"]);

    if (!paidTiers.has(userTier) && !isActiveTester(user)) {
      logPaywallAudit({
        userId: String(user.id),
        role: user.tier || "free",
        tier: userTier,
        subscriptionStatus: user.subscription_status || "none",
        resourcePath: req.originalUrl || req.url,
        contentTier: null,
        granted: false,
      });
      return res.status(403).json({
        error: "Premium feature - upgrade required",
        upgradeRequired: true,
      });
    }

    logPaywallAudit({
      userId: String(user.id),
      role: user.tier || "user",
      tier: userTier,
      subscriptionStatus: user.subscription_status || "active",
      resourcePath: req.originalUrl || req.url,
      contentTier: null,
      granted: true,
    });

    req.authUser = user;
    next();
  };
}

export interface PaywallAuditEntry {
  userId: string;
  role: string;
  tier: string;
  subscriptionStatus: string;
  resourcePath: string;
  contentTier: string | null;
  granted: boolean;
}

export function logPaywallAudit(entry: PaywallAuditEntry): void {
  let safePath = entry.resourcePath;
  try {
    const qIdx = safePath.indexOf("?");
    if (qIdx >= 0) safePath = safePath.substring(0, qIdx);
  } catch {}
  console.log(`[PaywallAudit] ${JSON.stringify({
    timestamp: new Date().toISOString(),
    userId: entry.userId,
    role: entry.role,
    subscriptionTier: entry.tier,
    subscriptionStatus: entry.subscriptionStatus,
    resourcePath: safePath,
    contentTier: entry.contentTier,
    accessGranted: entry.granted,
  })}`);
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

  res.status(401).json({ error: "Unauthorized" });
  return null;
}
