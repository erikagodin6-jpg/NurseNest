import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type User = {
  id: string;
  username: string;
  tier: string;
  subscriptionStatus: string;
  email?: string;
  region?: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  hasAccess: (requiredTier: string) => boolean;
  previewTier: string | null;
  setPreviewTier: (tier: string | null) => void;
  effectiveTier: string;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Preview tier is meant for admins to test paywalls.
  // But if it gets stuck in localStorage, it makes you "look free".
  const [previewTier, setPreviewTierState] = useState<string | null>(() => {
    return localStorage.getItem("nursenest-preview-tier");
  });

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

      // ✅ If you are admin, never allow a stale preview tier to keep you "free"
      if (data?.tier === "admin") {
        localStorage.removeItem("nursenest-preview-tier");
        setPreviewTierState(null);
      }

      setUser(data);
      localStorage.setItem("nursenest-user", JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem("nursenest-user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as User;

          // Set immediately for UI responsiveness
          setUser(parsed);

          // Refresh from server (source of truth)
          await refreshUserData(parsed.id);
        } catch {
          localStorage.removeItem("nursenest-user");
        }
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const data = (await res.json()) as User;

    // ✅ If you log in as admin, clear preview tier so you stop "looking free"
    if (data?.tier === "admin") {
      localStorage.removeItem("nursenest-preview-tier");
      setPreviewTierState(null);
    }

    setUser(data);
    localStorage.setItem("nursenest-user", JSON.stringify(data));
    localStorage.setItem("nursenest-credentials", JSON.stringify({ username, password }));
  }

  async function register(username: string, password: string, email?: string) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({} as any));
      throw new Error(err.error || "Registration failed");
    }

    const data = (await res.json()) as User;
    setUser(data);
    localStorage.setItem("nursenest-user", JSON.stringify(data));
  }

  function logout() {
    setUser(null);
    setPreviewTier(null);
    localStorage.removeItem("nursenest-user");
    localStorage.removeItem("nursenest-credentials");
  }

  async function refreshUser() {
    if (user) await refreshUserData(user.id);
  }

  const isAdmin = user?.tier === "admin";

  // ✅ Only use previewTier if it exists; otherwise reflect real tier.
  // Admins still have admin status (isAdmin), but previewTier can simulate paywalls.
  const effectiveTier = previewTier ?? (user?.tier || "free");

  function hasAccess(requiredTier: string): boolean {
    if (!user) return false;

    // ✅ Admin has full access unless they intentionally set a previewTier
    if (isAdmin && !previewTier) return true;

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