import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type User = {
  id: string;
  username: string;
  tier: string;
  subscriptionStatus: string;
  email?: string;
  region?: string;
  testerAccess?: boolean;
  testerExpiry?: string | null;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email?: string, inviteCode?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  hasAccess: (requiredTier: string) => boolean;
  previewTier: string | null;
  setPreviewTier: (tier: string | null) => void;
  effectiveTier: string;
  isAdmin: boolean;
  isTester: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function getAdminAccessToken(): string | null {
  try {
    const token = localStorage.getItem("nn_admin_access_token");
    const expiresAt = localStorage.getItem("nn_admin_expires_at");
    if (!token) return null;
    if (expiresAt && Date.now() > Number(expiresAt)) {
      localStorage.removeItem("nn_admin_access_token");
      localStorage.removeItem("nn_admin_expires_at");
      return null;
    }
    return token;
  } catch {
    return null;
  }
}

export function clearAdminToken() {
  try {
    localStorage.removeItem("nn_admin_access_token");
    localStorage.removeItem("nn_admin_expires_at");
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewTier, setPreviewTierState] = useState<string | null>(null);

  async function syncPreviewFromServer() {
    try {
      const res = await fetch("/api/admin/preview-mode", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        if (data.active && data.mode) {
          setPreviewTierState(data.mode);
          localStorage.setItem("nursenest-preview-tier", data.mode);
        } else {
          setPreviewTierState(null);
          localStorage.removeItem("nursenest-preview-tier");
        }
      }
    } catch {}
  }

  function setPreviewTier(tier: string | null) {
    setPreviewTierState(tier);
    if (tier) {
      localStorage.setItem("nursenest-preview-tier", tier);
    } else {
      localStorage.removeItem("nursenest-preview-tier");
    }
  }

  async function refreshUserData(userId: string) {
    try {
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data?.tier === "admin") {
        await syncPreviewFromServer();
      }
      setUser(data);
      localStorage.setItem("nursenest-user", JSON.stringify(data));
    } catch {}
  }

  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem("nursenest-user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as User;
          setUser(parsed);
          await refreshUserData(parsed.id);
        } catch {
          localStorage.removeItem("nursenest-user");
        }
      }
      setIsLoading(false);
    })();
  }, []);

  async function login(username: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({} as any));
      throw new Error(err.error || "Login failed");
    }

    const data = (await res.json()) as any;
    if (data?.accessToken) {
      localStorage.setItem("nn_admin_access_token", data.accessToken);
      const expiresAt = Date.now() + (data.expiresInSeconds || 1800) * 1000;
      localStorage.setItem("nn_admin_expires_at", String(expiresAt));
      delete data.accessToken;
      delete data.expiresInSeconds;
    }
    if (data?.userToken) {
      localStorage.setItem("nursenest-user-token", data.userToken);
      delete data.userToken;
      delete data.userTokenExpiry;
    }
    if (data?.tier === "admin") {
      await syncPreviewFromServer();
    }
    localStorage.setItem("nursenest-credentials", JSON.stringify({ username, password }));
    const userData: User = {
      id: data.id,
      username: data.username,
      tier: data.tier,
      subscriptionStatus: data.subscriptionStatus,
      email: data.email,
      region: data.region,
      testerAccess: data.testerAccess,
      testerExpiry: data.testerExpiry,
    };
    setUser(userData);
    localStorage.setItem("nursenest-user", JSON.stringify(userData));
  }

  async function register(username: string, password: string, email?: string, inviteCode?: string, referralCode?: string) {
    const body: any = { username, password, email };
    if (inviteCode) body.inviteCode = inviteCode;
    if (referralCode) body.referralCode = referralCode;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({} as any));
      throw new Error(err.error || "Registration failed");
    }

    const data = (await res.json()) as User;
    localStorage.setItem("nursenest-credentials", JSON.stringify({ username, password }));
    setUser(data);
    localStorage.setItem("nursenest-user", JSON.stringify(data));
  }

  function logout() {
    setUser(null);
    setPreviewTier(null);
    localStorage.removeItem("nursenest-user");
    localStorage.removeItem("nursenest-credentials");
    localStorage.removeItem("nursenest-user-token");
    localStorage.removeItem("nursenest-admin-api-key");
    clearAdminToken();
  }

  async function refreshUser() {
    if (user) await refreshUserData(user.id);
  }

  const isAdmin = user?.tier === "admin";
  const effectiveTier = previewTier ?? (user?.tier || "free");

  const isTester = !!(user?.testerAccess && (!user.testerExpiry || new Date(user.testerExpiry) > new Date()));

  function hasAccess(requiredTier: string): boolean {
    if (!user) return false;
    if (isAdmin && !previewTier) return true;
    if (isTester) return true;
    const hierarchy: Record<string, number> = { free: 0, rpn: 1, rn: 2, np: 3, admin: 4 };
    const userLevel = hierarchy[effectiveTier] ?? 0;
    const requiredLevel = hierarchy[requiredTier] ?? 0;
    return userLevel >= requiredLevel;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        refreshUser,
        isLoading,
        hasAccess,
        previewTier,
        setPreviewTier,
        effectiveTier,
        isAdmin,
        isTester,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
