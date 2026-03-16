import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "./lib/i18n";
import { AuthProvider } from "./lib/auth";
import "./index.css";

function RecoveryApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
        <I18nProvider>
          <AuthProvider>
            <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
              <h1 style={{ color: "#7c3aed" }}>RECOVERY TEST 4: AuthProvider</h1>
              <p>If you can see this, AuthProvider works.</p>
              <p>Time: {new Date().toISOString()}</p>
            </div>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<RecoveryApp />);
(window as any).__reactRendered = true;
