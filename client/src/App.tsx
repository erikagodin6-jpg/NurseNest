import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";
import { CareerProvider } from "@/lib/career-context";
import { SiteImagesProvider } from "@/components/admin-image-overlay";
import { ParamedicRegionProvider } from "@/allied/contexts/paramedic-region-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme" defaultTheme="clinical-light" enableSystem={false}>
        <I18nProvider>
          <AuthProvider>
            <CareerProvider>
            <ParamedicRegionProvider>
            <SiteImagesProvider>
              <TooltipProvider>
                <Toaster />
                <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
                  <h1 style={{ color: "#7c3aed" }}>RECOVERY TEST 8: All providers via App.tsx</h1>
                  <p>Time: {new Date().toISOString()}</p>
                </div>
              </TooltipProvider>
            </SiteImagesProvider>
            </ParamedicRegionProvider>
            </CareerProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
