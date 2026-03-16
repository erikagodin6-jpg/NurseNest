import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
        <I18nProvider>
          <AuthProvider>
            <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
              <h1 style={{ color: "#7c3aed" }}>RECOVERY TEST 7: Minimal App.tsx</h1>
              <p>Time: {new Date().toISOString()}</p>
            </div>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
