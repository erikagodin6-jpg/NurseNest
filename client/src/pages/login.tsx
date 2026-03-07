import { useState } from "react";
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
import { GraduationCap, Mail, Lock, User, Ticket } from "lucide-react";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);

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
      await register(fd.get("username") as string, fd.get("password") as string, fd.get("email") as string, (fd.get("inviteCode") as string) || undefined);
      toast({ title: t("login.accountCreated") });
      navigate("/lessons");
    } catch (err: any) {
      toast({ title: t("login.registrationFailed"), description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-none shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t("login.welcome")}</CardTitle>
            <p className="text-gray-500 text-sm mt-1">{t("login.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" data-testid="tab-login">{t("login.signIn")}</TabsTrigger>
                <TabsTrigger value="register" data-testid="tab-register">{t("login.createAccount")}</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">{t("login.username")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="login-username" name="username" placeholder={t("login.usernamePlaceholder")} className="pl-10" required data-testid="input-login-username" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t("login.password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="login-password" name="password" type="password" placeholder={t("login.passwordPlaceholder")} className="pl-10" required data-testid="input-login-password" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login">
                    {isLoading ? t("login.signingIn") : t("login.signIn")}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">{t("login.username")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="reg-username" name="username" placeholder={t("login.chooseUsername")} className="pl-10" required data-testid="input-register-username" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">{t("login.email")}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="reg-email" name="email" type="email" placeholder={t("login.emailPlaceholder")} className="pl-10" data-testid="input-register-email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">{t("login.password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="reg-password" name="password" type="password" placeholder={t("login.createPassword")} className="pl-10" required data-testid="input-register-password" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-invite" className="text-gray-500 text-xs">Invite Code (optional)</Label>
                    <div className="relative">
                      <Ticket className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="reg-invite" name="inviteCode" placeholder="Enter beta invite code" className="pl-10" data-testid="input-register-invite-code" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-register">
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
