import { useState, useEffect, lazy, Suspense } from "react";
import { getExamConstants, type Region as ConstRegion } from "@shared/constants";
import { useLocation } from "wouter";
import { LocaleLink } from "@/lib/LocaleLink";
import { 
  BookOpen, 
  Layers, 
  Activity, 
  Stethoscope, 
  FileText, 
  BarChart, 
  ChevronDown,
  Heart,
  Palette,
  Lock,
  HelpCircle,
  Tag,
  Dna,
  Menu,
  Play,
  MoreHorizontal,
  LogIn,
  LogOut,
  User,
  Shield,
  Calculator,
  FlaskConical,
  Lightbulb,
  Pill,
  StickyNote,
  Calendar,
  UserCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
const GlobalSearch = lazy(() => import("@/components/global-search").then(m => ({ default: m.GlobalSearch })));
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { ThemedLogo } from "@/components/themed-logo";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import { Globe, Languages, BarChart3, DollarSign, ShoppingBag, FileStack, Wind, Ambulance, Microscope, ScanLine, GraduationCap } from "lucide-react";
import { useCareer } from "@/lib/career-context";
import { getEnabledCareers, type CareerType } from "@shared/careers";

function UserProfileDropdown({ user, logout, setLocation }: { user: any; logout: () => void; setLocation: (path: string) => void }) {
  const { t } = useI18n();
  const { data: subData } = useQuery({
    queryKey: ["/api/subscription", user.id],
    queryFn: async () => {
      const res = await fetch(`/api/subscription/${user.id}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!user.id,
    staleTime: 60000,
  });

  const tierLabel = user.tier === "admin" ? "Admin" : user.tier === "rpn" ? "RPN/LVN" : user.tier === "rn" ? "RN" : user.tier === "np" ? "NP" : "Free";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hidden sm:inline-flex text-softgray hover:text-primary font-medium text-sm px-2 gap-1.5" data-testid="button-user-dropdown">
          <UserCircle className="w-4 h-4" />
          {user.username}
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="px-3 py-2 mb-1">
          <p className="text-sm font-semibold text-gray-900">{user.username}</p>
          <p className="text-xs text-gray-500">{tierLabel} Account</p>
          {subData?.daysRemaining !== null && subData?.daysRemaining !== undefined && user.tier !== "free" && user.tier !== "admin" && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-primary">
              <Calendar className="w-3 h-3" />
              <span>{subData.daysRemaining} days remaining</span>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/dashboard")} data-testid="menu-user-dashboard">
          {t("nav.dashboard")}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/profile")} data-testid="menu-user-profile">
          {t("nav.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/reports")} data-testid="menu-user-reports">
          {t("nav.reports")}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/profile#notes")} data-testid="menu-user-notes">
          {t("nav.notes")}
        </DropdownMenuItem>
        {user.tier === "admin" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin")} data-testid="menu-admin-dashboard">
              {t("nav.admin")}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/content-editor")} data-testid="menu-content-editor">
              {t("nav.contentEditor")}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin?tab=content-engine")} data-testid="menu-blog-manager">
              {t("nav.blogManager")}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin/seo")} data-testid="menu-seo-dashboard">
              SEO Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin/translations")} data-testid="menu-translations">
              Translations
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin/content-intelligence")} data-testid="menu-content-intelligence">
              Content Intelligence
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin/cat")} data-testid="menu-cat-dashboard">
              CAT Analytics
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin/revenue")} data-testid="menu-revenue">
              Revenue Intelligence
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin/product-builder")} data-testid="menu-product-builder">
              Product Builder
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/admin/generator-v2")} data-testid="menu-generator-v2">
              QBank Generator
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-red-500" onClick={() => { logout(); setLocation("/"); }} data-testid="menu-user-logout">
          {t("nav.signout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [region, setRegionState] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "US";
  });
  const { toast } = useToast();
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [, setLocation] = useLocation();
  const { user, logout, isAdmin, previewTier, setPreviewTier, effectiveTier } = useAuth();
  const { language, setLanguage, t } = useI18n();
  const currentLang = LANGUAGES.find(l => l.code === language);
  const { career, careerType, setCareer } = useCareer();
  const enabledCareers = getEnabledCareers();

  const CAREER_ICONS: Record<string, any> = {
    Stethoscope, Wind, Ambulance, Pill, Microscope, ScanLine,
  };

  const handleLanguageChange = (langCode: typeof language) => {
    setLanguage(langCode);
  };

  useEffect(() => {
    fetch("/api/region")
      .then(r => r.json())
      .then(data => {
        const detected: "US" | "CA" = data?.region === "CA" ? "CA" : "US";
        setRegionState(detected);
        localStorage.setItem("nursenest-region", detected);
        window.dispatchEvent(new Event("regionChange"));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePaidContent = (label: string, itemLabel?: string) => {
    if (itemLabel === "Lessons") {
      setLocation("/lessons");
      return;
    }
    if (itemLabel === "Lectures") {
      setLocation("/lectures");
      return;
    }
    if (itemLabel === "Flashcards") {
      setLocation("/flashcards");
      return;
    }
    if (itemLabel === "Reports") {
      setLocation("/reports");
      return;
    }
    if (itemLabel === "Clinical Clarity") {
      setLocation("/clinical-clarity");
      return;
    }
    if (itemLabel === "Clinical Skill Lab") {
      setLocation("/simulators/clinical-skills");
      return;
    }
    if (itemLabel === "Simulators") {
      setLocation("/simulators/osce");
      return;
    }
    if (itemLabel === "Exams") {
      setLocation("/mock-exams");
      return;
    }
    if (itemLabel === "Pricing") {
      setLocation("/pricing");
      return;
    }
    if (itemLabel === "FAQ") {
      setLocation("/faq");
      return;
    }
    if (itemLabel === "For Schools") {
      setLocation("/for-institutions");
      return;
    }
    toast({
      title: t("nav.subscriptionRequired"),
      description: t("nav.subscriptionDesc"),
      variant: "default",
    });
  };

  const NavDropdown = ({ label, items, isPaid = false, subBar = false }: { label: string, items: { icon: any, label: string, key?: string }[], isPaid?: boolean, subBar?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "font-medium hover:bg-transparent flex items-center gap-1 group data-[state=open]:text-primary",
            subBar 
              ? "text-xs text-primary/70 hover:text-primary px-1.5 lg:px-2 h-7" 
              : "text-sm text-softgray hover:text-primary px-2 lg:px-3"
          )}
        >
          {label}
          <ChevronDown className={cn("transition-transform duration-200 group-data-[state=open]:rotate-180", subBar ? "w-3 h-3" : "w-3.5 h-3.5")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 p-2 bg-white rounded-lg shadow-lg border-primary/20 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
        {items.map((item, idx) => (
          <DropdownMenuItem 
            key={idx} 
            onClick={() => handlePaidContent(label, item.key || item.label)}
            className="flex items-center justify-between gap-2 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 focus:bg-primary/5 focus:text-primary rounded-md py-2 px-3"
          >
            <span>{item.label}</span>
            {isPaid && !["Lessons", "Lectures", "Flashcards", "Clinical Clarity", "Clinical Skill Lab", "Simulators", "Exams"].includes(item.key || item.label) && <Lock className="w-3 h-3 text-gray-400" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const learningItems = [
    { icon: BookOpen, label: t("nav.lessons"), key: "Lessons" },
    { icon: Play, label: t("nav.lectures"), key: "Lectures" },
    { icon: Layers, label: t("nav.flashcards"), key: "Flashcards" },
    { icon: Lightbulb, label: t("nav.clinicalClarity"), key: "Clinical Clarity" },
    { icon: Activity, label: t("nav.clinicalSkillLab"), key: "Clinical Skill Lab" },
    { icon: Stethoscope, label: t("nav.simulators"), key: "Simulators" },
    { icon: FileText, label: t("nav.exams"), key: "Exams" },
  ];

  const designations = getExamConstants(region as ConstRegion).designations;

  const themes = [
    { name: "lavender", color: "#9d82dd", label: "Lavender" },
    { name: "mint", color: "#5ed3ae", label: "Mint" },
    { name: "blush", color: "#f4909f", label: "Blush" },
    { name: "slate", color: "#64748b", label: "Slate" },
    { name: "midnight", color: "#1e293b", label: "Midnight" },
    { name: "ocean", color: "#0ea5e9", label: "Ocean" },
    { name: "forest", color: "#10b981", label: "Forest" },
    { name: "clinical-light", color: "#3b82f6", label: "Clinical" },
    { name: "pastel-blush", color: "#ec8899", label: "Pastel Blush" },
    { name: "pastel-lavender", color: "#a78bda", label: "Pastel Lavender" },
    { name: "pastel-mint", color: "#4fd1a5", label: "Pastel Mint" },
    { name: "neutral-sand", color: "#a08060", label: "Sand" },
    { name: "neutral-slate", color: "#708090", label: "Cool Slate" },
    { name: "dark-clinical", color: "#06b6d4", label: "Dark Clinical" },
    { name: "dark-academia", color: "#8b7355", label: "Dark Academia" },
    { name: "rose-gold", color: "#b76e79", label: "Rose Gold" },
    { name: "coral", color: "#ff6b6b", label: "Coral" },
    { name: "indigo", color: "#6366f1", label: "Indigo" },
    { name: "teal", color: "#14b8a6", label: "Teal" },
    { name: "berry", color: "#a855f7", label: "Berry" },
  ];

  const MobileNav = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-softgray h-8 w-8 -ml-1">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-white p-0 overflow-y-auto">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-5 border-b sticky top-0 bg-white z-10">
            <SheetTitle className="text-left flex items-center justify-between">
              <ThemedLogo width={160} />
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          
          <div className="p-5 flex flex-col gap-1 pb-20">
            <div className="mb-6">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 px-3">{t("nav.practiceTiers")}</p>
              <div className="grid grid-cols-1 gap-2 px-1">
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start gap-3 h-14 border-primary/10 hover:border-primary/30 hover:bg-primary/5 shadow-sm",
                    user?.tier === 'rpn' && "bg-primary/5 border-primary/40 ring-1 ring-primary/20"
                  )}
                  onClick={() => { setLocation("/lessons?tier=rpn"); setMobileMenuOpen(false); }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shadow-inner shrink-0">PN</div>
                  <div className="text-left overflow-hidden">
                    <div className="text-sm font-bold truncate">{region === 'CA' ? 'RPN/REX-PN' : 'LPN/LVN'}</div>
                    <div className="text-[10px] text-gray-500 truncate">{t("nav.practicalNursingPrep")}</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start gap-3 h-14 border-primary/10 hover:border-primary/30 hover:bg-primary/5 shadow-sm",
                    user?.tier === 'rn' && "bg-primary/5 border-primary/40 ring-1 ring-primary/20"
                  )}
                  onClick={() => { setLocation("/lessons?tier=rn"); setMobileMenuOpen(false); }}
                >
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm shadow-inner shrink-0">RN</div>
                  <div className="text-left overflow-hidden">
                    <div className="text-sm font-bold truncate">RN/NCLEX-RN</div>
                    <div className="text-[10px] text-gray-500 truncate">{t("nav.registeredNursingPrep")}</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start gap-3 h-14 border-primary/10 hover:border-primary/30 hover:bg-primary/5 shadow-sm",
                    user?.tier === 'np' && "bg-primary/5 border-primary/40 ring-1 ring-primary/20"
                  )}
                  onClick={() => { setLocation("/lessons?tier=np"); setMobileMenuOpen(false); }}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm shadow-inner shrink-0">NP</div>
                  <div className="text-left overflow-hidden">
                    <div className="text-sm font-bold truncate">{t("nav.npAdvanced")}</div>
                    <div className="text-[10px] text-gray-500 truncate">{t("nav.npContent")}</div>
                  </div>
                </Button>
              </div>
              <div className="h-[1px] bg-gray-100 my-6 mx-3" />
            </div>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">{t("nav.freeLearning")}</p>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/pre-nursing")}>
                <BookOpen className="w-4 h-4" />
                {t("nav.preNursingFoundations")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/anatomy")}>
                <Dna className="w-4 h-4" />
                {t("nav.anatomyPhysiology")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/lessons")}>
                <BookOpen className="w-4 h-4" />
                {t("nav.lessons")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/blog")}>
                <BookOpen className="w-4 h-4" />
                {t("nav.blog")}
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-auto py-2" onClick={() => setLocation("/flashcards?view=decks")} data-testid="button-study-decks-mobile">
                <div className="flex items-start gap-2">
                  <Layers className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span>{t("nav.studyDecks")}</span>
                      <span className="text-[8px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full leading-none">{t("common.free")}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block">{t("nav.studyDecksDesc")}</span>
                  </div>
                </div>
              </Button>
            </SheetClose>

            <div className="h-[1px] bg-gray-100 my-2" />

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">{t("nav.interactiveTools")}</p>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/lectures")} data-testid="button-lectures-mobile">
                <Play className="w-4 h-4" />
                {t("nav.lectures")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/clinical-clarity")}>
                <Lightbulb className="w-4 h-4" />
                {t("nav.clinicalClarity")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/flashcards")}>
                <Layers className="w-4 h-4" />
                {t("nav.flashcards")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/med-math")}>
                <span className="flex items-center gap-2"><Calculator className="w-4 h-4" /> {t("nav.medMathLab")}</span>
                <Lock className="w-3 h-3 text-gray-300" />
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/lab-values")}>
                <span className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> {t("nav.labInterpretation")}</span>
                <Lock className="w-3 h-3 text-gray-300" />
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/case-simulations")}>
                <span className="flex items-center gap-2"><Stethoscope className="w-4 h-4" /> {t("nav.caseSimulations")}</span>
                <Lock className="w-3 h-3 text-gray-300" />
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/medication-mastery")}>
                <span className="flex items-center gap-2"><Pill className="w-4 h-4" /> {t("nav.medicationMastery")}</span>
                <Lock className="w-3 h-3 text-gray-300" />
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/simulators/clinical-skills")}>
                <Stethoscope className="w-4 h-4" /> {t("nav.clinicalSkillsSim")}
              </Button>
            </SheetClose>

            <div className="h-[1px] bg-gray-100 my-1" />
            <p className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1 px-3">{t("nav.clinicalSimulators")}</p>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/first-action-simulator")}>
                <Activity className="w-4 h-4" /> {t("nav.firstAction")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/safety-hazard-simulator")}>
                <Heart className="w-4 h-4" /> {t("nav.safetyHazard")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/iv-complications-simulator")}>
                <Dna className="w-4 h-4" /> {t("nav.ivComplications")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/electrolyte-abg-simulator")}>
                <span className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> {t("nav.electrolyteAbg")}</span>
                <Lock className="w-3 h-3 text-gray-300" />
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/deteriorating-patient-simulator")}>
                <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> {t("nav.deterioratingPatient")}</span>
                <Lock className="w-3 h-3 text-gray-300" />
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/blood-transfusion-simulator")}>
                <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> {t("nav.bloodTransfusion")}</span>
                <Lock className="w-3 h-3 text-gray-300" />
              </Button>
            </SheetClose>

            <div className="h-[1px] bg-gray-100 my-2" />

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">{t("nav.resources")}</p>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => { setLocation("/shop"); try { fetch("/api/track/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "nav_store_click", source: "mobile_nav" }) }).catch(() => {}); } catch {} }} data-testid="button-store-mobile">
                <ShoppingBag className="w-4 h-4" />
                {t("nav.store")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/pricing")}>
                <Tag className="w-4 h-4" />
                {t("nav.pricing")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/faq")}>
                <HelpCircle className="w-4 h-4" />
                {t("footer.faq")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/for-institutions")} data-testid="link-mobile-for-schools">
                <GraduationCap className="w-4 h-4" />
                For Schools
              </Button>
            </SheetClose>

            <div className="h-[1px] bg-gray-100 my-2" />

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">{t("nav.language")}</p>
            <div className="flex flex-wrap gap-1.5 px-3 mb-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  data-testid={`button-lang-${lang.code}-mobile`}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium border transition-colors",
                    language === lang.code
                      ? "bg-primary/10 border-primary/30 text-primary font-bold"
                      : "bg-white border-gray-200 text-gray-500 hover:border-primary/20 hover:text-primary"
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {lang.name !== lang.nativeName && <span className="text-[9px] opacity-60">({lang.nativeName})</span>}
                </button>
              ))}
            </div>

            <div className="h-[1px] bg-gray-100 my-2" />

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">{t("nav.regionTheme")}</p>
            <div className="flex items-center gap-2 px-3 mb-2">
              <span className="text-xs font-bold text-primary bg-primary/5 rounded-full px-2 py-0.5 border border-primary/10" data-testid="text-region-indicator-mobile">
                {region === "CA" ? "🇨🇦 Canada" : "🇺🇸 United States"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 px-3 mb-1">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  title={t.label}
                  data-testid={`button-theme-${t.name}-mobile`}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all hover:scale-110",
                    theme === t.name ? "border-primary ring-2 ring-primary/30 scale-110" : "border-gray-200"
                  )}
                  style={{ backgroundColor: t.color }}
                />
              ))}
            </div>

            <div className="h-[1px] bg-gray-100 my-2" />

            {user ? (
              <>
                <SheetClose asChild>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/profile")}>
                    <User className="w-4 h-4" />
                    {user.username}
                  </Button>
                </SheetClose>
                {user.tier === "admin" && (
                  <>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/admin")} data-testid="button-admin-mobile">
                        <Shield className="w-4 h-4" />
                        {t("nav.admin")}
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/content-editor")} data-testid="button-content-editor-mobile">
                        <FileText className="w-4 h-4" />
                        {t("nav.contentEditor")}
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/admin/seo")} data-testid="button-seo-dashboard-mobile">
                        <Globe className="w-4 h-4" />
                        SEO Dashboard
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/admin/translations")} data-testid="button-translations-mobile">
                        <Languages className="w-4 h-4" />
                        Translations
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/admin/content-intelligence")} data-testid="button-content-intel-mobile">
                        <BarChart3 className="w-4 h-4" />
                        Content Intelligence
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/admin/cat")} data-testid="button-cat-mobile">
                        <Activity className="w-4 h-4" />
                        CAT Analytics
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/admin/revenue")} data-testid="button-revenue-mobile">
                        <DollarSign className="w-4 h-4" />
                        Revenue Intelligence
                      </Button>
                    </SheetClose>
                  </>
                )}
                {isAdmin && (
                  <>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 mt-2 px-3">{t("nav.previewMode")}</p>
                    <div className="flex flex-wrap gap-1.5 px-3 mb-1">
                      {[
                        { key: null, label: "Admin" },
                        { key: "free", label: "Free" },
                        { key: "rpn", label: "RPN/LVN" },
                        { key: "rn", label: "RN" },
                        { key: "np", label: "NP" },
                      ].map((opt) => (
                        <Button
                          key={opt.key || "admin"}
                          variant={previewTier === opt.key || (!previewTier && !opt.key) ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreviewTier(opt.key)}
                          className={cn(
                            "h-7 px-2.5 text-[10px] rounded-full flex-1 min-w-[70px] sm:flex-none",
                            (previewTier === opt.key || (!previewTier && !opt.key)) ? "bg-primary text-white" : "text-gray-500 border-gray-200"
                          )}
                          data-testid={`button-preview-${opt.key || "admin"}-mobile`}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
                <SheetClose asChild>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => { logout(); setLocation("/"); }}>
                    <LogOut className="w-4 h-4" />
                    {t("nav.signout")}
                  </Button>
                </SheetClose>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/login")}>
                    <LogIn className="w-4 h-4" />
                    {t("nav.login")}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="w-full bg-primary hover:brightness-110 text-white rounded-full h-9 mt-1" onClick={() => setLocation("/login")}>
                    {t("nav.signup")}
                  </Button>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/90 backdrop-blur-lg border-primary/10 shadow-sm" 
          : "bg-white/80 backdrop-blur-lg border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
            <MobileNav />
            <LocaleLink href="/">
              <div className="flex items-center cursor-pointer group" data-testid="link-home-logo">
                <div className="hidden sm:block">
                  <ThemedLogo width={180} className="group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="sm:hidden -ml-1">
                  <ThemedLogo width={130} className="group-hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </LocaleLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex text-xs font-semibold gap-1.5 px-2.5 h-8 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  data-testid="button-career-selector"
                  style={{ borderColor: career.color + "40", color: career.color }}
                >
                  {(() => { const Icon = CAREER_ICONS[career.icon]; return Icon ? <Icon className="w-3.5 h-3.5" /> : null; })()}
                  {career.shortName}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-1.5 tracking-wider">Select Career Track</p>
                {enabledCareers.map((c) => {
                  const CIcon = CAREER_ICONS[c.icon];
                  return (
                    <DropdownMenuItem
                      key={c.id}
                      onClick={() => {
                        setCareer(c.id);
                        if (c.routePrefix) {
                          setLocation(c.routePrefix);
                        } else {
                          setLocation("/");
                        }
                      }}
                      className={cn(
                        "cursor-pointer gap-2 rounded-md py-2 px-3",
                        careerType === c.id
                          ? "bg-primary/5 text-primary font-semibold"
                          : "text-gray-700 hover:text-primary hover:bg-primary/5"
                      )}
                      data-testid={`menu-career-${c.slug}`}
                    >
                      <div className="flex items-center gap-2.5 flex-1">
                        {CIcon && <CIcon className="w-4 h-4" style={{ color: c.color }} />}
                        <div className="flex flex-col">
                          <span className="text-sm">{c.shortName}</span>
                          <span className="text-[10px] text-gray-400 leading-tight">{c.examNames.slice(0, 2).join(", ")}</span>
                        </div>
                      </div>
                      {careerType === c.id && <span className="text-primary text-xs">✓</span>}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-2.5 group data-[state=open]:text-primary">
                    {t("nav.learning")}
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52 p-2">
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/pre-nursing")}>
                    <BookOpen className="w-4 h-4 text-primary/70" />
                    {t("nav.preNursing")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/anatomy")}>
                    <Dna className="w-4 h-4 text-primary/70" />
                    {t("nav.anatomy")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/lessons")}>
                    <BookOpen className="w-4 h-4 text-primary/70" />
                    {t("nav.lessons")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/lectures")}>
                    <Play className="w-4 h-4 text-primary/70" />
                    {t("nav.lectures")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/blog")}>
                    <FileText className="w-4 h-4 text-primary/70" />
                    {t("nav.blog")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5 relative" onClick={() => setLocation("/flashcards?view=decks")} data-testid="button-study-decks-nav">
                    <Layers className="w-4 h-4 text-primary/70" />
                    {t("nav.flashcards")}
                    <span className="ml-auto flex h-4 px-1.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white leading-none">{t("common.free")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/clinical-clarity")}>
                    <Lightbulb className="w-4 h-4 text-primary/70" />
                    {t("nav.clinicalClarity")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-2.5 group data-[state=open]:text-primary">
                    {t("nav.practice")}
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2">
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/mock-exams")}>
                    <FileText className="w-4 h-4 text-primary/70" />
                    {t("nav.exams")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/simulators/osce")}>
                    <Stethoscope className="w-4 h-4 text-primary/70" />
                    {t("nav.simulators")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/case-simulations")}>
                    <Stethoscope className="w-4 h-4 text-primary/70" />
                    {t("nav.caseSimulations")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/simulators/clinical-skills")}>
                    <Activity className="w-4 h-4 text-primary/70" />
                    {t("nav.clinicalSkillsSim")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-1 tracking-wider">{t("nav.premiumTools")}</p>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/med-math")}>
                    <Calculator className="w-4 h-4" />
                    {t("nav.medMathLab")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/lab-values")}>
                    <FlaskConical className="w-4 h-4" />
                    {t("nav.labInterpretation")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/medication-mastery")}>
                    <Pill className="w-4 h-4" />
                    {t("nav.medicationMastery")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-1 tracking-wider">{t("nav.clinicalSimulators")}</p>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/first-action-simulator")}>
                    <Activity className="w-4 h-4" />
                    {t("nav.firstAction")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/safety-hazard-simulator")}>
                    <Heart className="w-4 h-4" />
                    {t("nav.safetyHazard")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/iv-complications-simulator")}>
                    <Dna className="w-4 h-4" />
                    {t("nav.ivComplications")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/electrolyte-abg-simulator")}>
                    <FlaskConical className="w-4 h-4" />
                    {t("nav.electrolyteAbg")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/deteriorating-patient-simulator")}>
                    <Activity className="w-4 h-4" />
                    {t("nav.deterioratingPatient")}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary hover:bg-primary/5" onClick={() => setLocation("/blood-transfusion-simulator")}>
                    <Heart className="w-4 h-4" />
                    {t("nav.bloodTransfusion")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                className="text-sm font-medium text-softgray hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-2.5"
                onClick={() => { setLocation("/shop"); try { fetch("/api/track/event", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "nav_store_click", source: "desktop_nav" }) }).catch(() => {}); } catch {} }}
                data-testid="button-store-nav"
              >
                <ShoppingBag className="w-4 h-4" />
                {t("nav.store")}
              </Button>

              <Button
                variant="ghost"
                className="text-sm font-medium text-softgray hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-2.5"
                onClick={() => setLocation("/pricing")}
                data-testid="link-nav-pricing"
              >
                <Tag className="w-4 h-4" />
                {t("nav.pricing")}
              </Button>

              <Button
                variant="ghost"
                className="text-sm font-medium text-softgray hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-2.5"
                onClick={() => setLocation("/faq")}
                data-testid="link-nav-faq"
              >
                <HelpCircle className="w-4 h-4" />
                {t("footer.faq")}
              </Button>

              <Button
                variant="ghost"
                className="text-sm font-medium text-softgray hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-2.5"
                onClick={() => setLocation("/for-institutions")}
                data-testid="link-nav-for-schools"
              >
                <GraduationCap className="w-4 h-4" />
                For Schools
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-1 lg:gap-2">
            <div className="sm:hidden">
              <Suspense fallback={<div className="w-8 h-8" />}>
                <GlobalSearch />
              </Suspense>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-1 text-softgray hover:text-primary h-8 px-1.5" data-testid="button-settings-selector">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold">{currentLang?.flag}</span>
                  <Palette className="w-3.5 h-3.5 ml-0.5" />
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center gap-2 px-2 mb-2">
                  <span className="text-xs font-bold text-primary" data-testid="text-region-indicator-desktop">
                    {region === "CA" ? "Canada" : "United States"}
                  </span>
                </div>
                <DropdownMenuSeparator />
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 my-2 tracking-widest">{t("nav.selectTheme")}</p>
                <div className="grid grid-cols-5 gap-2 px-2 py-1 mb-2">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setTheme(t.name)}
                      title={t.label}
                      data-testid={`button-theme-${t.name}`}
                      className={cn(
                        "w-6 h-6 rounded-full border shadow-sm transition-transform hover:scale-125",
                        theme === t.name ? "ring-2 ring-primary ring-offset-1 scale-110" : "border-gray-200"
                      )}
                      style={{ backgroundColor: t.color }}
                    />
                  ))}
                </div>
                <DropdownMenuSeparator />
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 my-2 tracking-widest">{t("nav.language")}</p>
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn("cursor-pointer gap-2", language === lang.code && "text-primary font-bold bg-primary/5")}
                    data-testid={`button-lang-${lang.code}`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                    <span className="text-gray-400 text-xs ml-auto">{lang.nativeName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <UserProfileDropdown user={user} logout={logout} setLocation={setLocation} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hidden sm:flex text-softgray hover:text-primary font-medium px-3 h-8" onClick={() => setLocation("/login")} data-testid="button-login">
                  {t("nav.login")}
                </Button>
                <Button size="sm" className="bg-primary hover:brightness-110 text-white font-bold rounded-full px-4 h-8 shadow-sm shadow-primary/20" onClick={() => setLocation("/login")} data-testid="button-signup">
                  {t("nav.signup")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-primary/10 bg-primary/5">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-9">
            <div className="hidden md:flex items-center gap-0.5">
              {designations.map((d) => (
                <NavDropdown key={d} label={d} items={learningItems} isPaid subBar />
              ))}
            </div>
            <div className="md:hidden" />
            <div className="flex items-center gap-2">
              <NavDropdown label={t("nav.learning")} items={learningItems} isPaid subBar />
              <NavDropdown label={t("nav.resources")} items={[
                { icon: Tag, label: t("nav.pricing"), key: "Pricing" },
                { icon: HelpCircle, label: t("footer.faq"), key: "FAQ" },
                { icon: GraduationCap, label: "For Schools", key: "For Schools" },
              ]} subBar />
              <div className="hidden md:block w-48 lg:w-56">
                <Suspense fallback={<div className="w-full h-7" />}>
                  <GlobalSearch />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
