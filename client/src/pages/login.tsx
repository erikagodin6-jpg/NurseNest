import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { ThemedLogo } from "@/components/themed-logo";
import { authTheme } from "@/lib/auth-theme";
import { Mail, Lock, User, Ticket, Gift } from "lucide-react";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);

  const refCodeFromUrl = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || "";
    if (ref) {
      sessionStorage.setItem("nursenest-ref", ref);
      return ref;
    }
    return sessionStorage.getItem("nursenest-ref") || "";
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await login(fd.get("username") as string, fd.get("password") as string);
      toast({ title: t("login.welcomeBack") });
      navigate("/lessons");
    } catch (err: any) {
      toast({ title: t("login.loginFailed"), description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const refCode = (fd.get("referralCode") as string) || refCodeFromUrl || undefined;
      await register(fd.get("username") as string, fd.get("password") as string, fd.get("email") as string, (fd.get("inviteCode") as string) || undefined, refCode);
      toast({ title: t("login.accountCreated") });
      navigate("/lessons");
    } catch (err: any) {
      toast({ title: t("login.registrationFailed"), description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  const inputClassName = "pl-10 rounded-xl border-[1.5px] h-11 focus-visible:ring-2";
  const inputStyle = { borderColor: authTheme.inputBorder, backgroundColor: "#FFFFFF" };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: authTheme.background, color: authTheme.textPrimary }}>
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-none shadow-xl rounded-2xl" style={{ backgroundColor: "#FFFFFF" }}>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <ThemedLogo width={180} />
            </div>
            <CardTitle className="text-2xl font-semibold" style={{ color: authTheme.textPrimary }}>{t("login.welcome")}</CardTitle>
            <p className="text-sm mt-1" style={{ color: authTheme.textSecondary }}>{t("login.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl h-11" style={{ backgroundColor: `${authTheme.primary}15` }}>
                <TabsTrigger
                  value="login"
                  data-testid="tab-login"
                  className="rounded-lg data-[state=active]:shadow-sm font-medium"
                  style={{ "--tw-shadow-color": `${authTheme.primary}30` } as React.CSSProperties}
                >
                  {t("login.signIn")}
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  data-testid="tab-register"
                  className="rounded-lg data-[state=active]:shadow-sm font-medium"
                  style={{ "--tw-shadow-color": `${authTheme.primary}30` } as React.CSSProperties}
                >
                  {t("login.createAccount")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username" style={{ color: authTheme.textPrimary }}>{t("login.username")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4" style={{ color: authTheme.primary }} />
                      <Input id="login-username" name="username" placeholder={t("login.usernamePlaceholder")} className={inputClassName} style={inputStyle} required data-testid="input-login-username" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" style={{ color: authTheme.textPrimary }}>{t("login.password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4" style={{ color: authTheme.primary }} />
                      <Input id="login-password" name="password" type="password" placeholder={t("login.passwordPlaceholder")} className={inputClassName} style={inputStyle} required data-testid="input-login-password" />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl h-11 font-semibold text-white border-none"
                    style={{ backgroundColor: authTheme.primary, boxShadow: `0 4px 14px ${authTheme.primary}40` }}
                    disabled={isLoading}
                    data-testid="button-login"
                  >
                    {isLoading ? t("login.signingIn") : t("login.signIn")}
                  </Button>
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="text-sm underline-offset-2 hover:underline border-none bg-transparent cursor-pointer"
                      style={{ color: authTheme.textSecondary }}
                      data-testid="link-forgot-password"
                    >
                      {t("login.forgotPassword")}
                    </button>
                  </div>
                  <div className="text-center mt-4 pt-4" style={{ borderTop: `1px solid ${authTheme.inputBorder}` }}>
                    <p className="text-sm" style={{ color: authTheme.textSecondary }}>
                      {t("login.noAccount")}{" "}
                      <button
                        type="button"
                        className="font-semibold border-none bg-transparent cursor-pointer hover:underline underline-offset-2"
                        style={{ color: authTheme.primary }}
                        onClick={() => {
                          const trigger = document.querySelector<HTMLButtonElement>('[data-testid="tab-register"]');
                          trigger?.click();
                        }}
                        data-testid="link-signup-footer"
                      >
                        {t("login.signUpNow")}
                      </button>
                    </p>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username" style={{ color: authTheme.textPrimary }}>{t("login.username")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4" style={{ color: authTheme.primary }} />
                      <Input id="reg-username" name="username" placeholder={t("login.chooseUsername")} className={inputClassName} style={inputStyle} required data-testid="input-register-username" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" style={{ color: authTheme.textPrimary }}>{t("login.email")}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4" style={{ color: authTheme.primary }} />
                      <Input id="reg-email" name="email" type="email" placeholder={t("login.emailPlaceholder")} className={inputClassName} style={inputStyle} data-testid="input-register-email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password" style={{ color: authTheme.textPrimary }}>{t("login.password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4" style={{ color: authTheme.primary }} />
                      <Input id="reg-password" name="password" type="password" placeholder={t("login.createPassword")} className={inputClassName} style={inputStyle} required data-testid="input-register-password" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-invite" className="text-xs" style={{ color: authTheme.textSecondary }}>{t("pages.login.inviteCodeOptional")}</Label>
                    <div className="relative">
                      <Ticket className="absolute left-3 top-3 w-4 h-4" style={{ color: authTheme.primary }} />
                      <Input id="reg-invite" name="inviteCode" placeholder={t("pages.login.enterBetaInviteCode")} className={inputClassName} style={inputStyle} data-testid="input-register-invite-code" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-referral" className="text-xs" style={{ color: authTheme.textSecondary }}>{t("pages.login.referralCodeOptional")}</Label>
                    <div className="relative">
                      <Gift className="absolute left-3 top-3 w-4 h-4" style={{ color: authTheme.primary }} />
                      <Input id="reg-referral" name="referralCode" placeholder={t("pages.login.nnrefxxxxxx")} defaultValue={refCodeFromUrl} className={inputClassName} style={inputStyle} data-testid="input-register-referral-code" />
                    </div>
                    {refCodeFromUrl && (
                      <p className="text-xs text-green-600 font-medium">{t("pages.login.referralCodeAppliedYoullGet")}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl h-11 font-semibold text-white border-none"
                    style={{ backgroundColor: authTheme.primary, boxShadow: `0 4px 14px ${authTheme.primary}40` }}
                    disabled={isLoading}
                    data-testid="button-register"
                  >
                    {isLoading ? t("login.creatingAccount") : t("login.createAccount")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
