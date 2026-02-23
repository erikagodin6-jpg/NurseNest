import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
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
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { GlobalSearch } from "@/components/global-search";
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

function UserProfileDropdown({ user, logout, setLocation }: { user: any; logout: () => void; setLocation: (path: string) => void }) {
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
          <BarChart className="w-4 h-4" />
          My Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/profile")} data-testid="menu-user-profile">
          <User className="w-4 h-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/reports")} data-testid="menu-user-reports">
          <BarChart className="w-4 h-4" />
          Reports & Analytics
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/profile#notes")} data-testid="menu-user-notes">
          <StickyNote className="w-4 h-4" />
          My Notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-red-500" onClick={() => { logout(); setLocation("/"); }} data-testid="menu-user-logout">
          <LogOut className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [region, setRegionState] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  const { toast } = useToast();
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [, setLocation] = useLocation();
  const { user, logout, isAdmin, previewTier, setPreviewTier, effectiveTier } = useAuth();

  const setRegion = (newRegion: "US" | "CA") => {
    setRegionState(newRegion);
    localStorage.setItem("nursenest-region", newRegion);
    window.dispatchEvent(new Event("regionChange"));
  };

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
    toast({
      title: "Subscription Required",
      description: `Access to ${label} ${itemLabel || ""} materials requires an active subscription.`,
      variant: "default",
    });
  };

  const NavDropdown = ({ label, items, isPaid = false }: { label: string, items: { icon: any, label: string }[], isPaid?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-sm font-medium text-softgray hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-3 group data-[state=open]:text-primary"
        >
          {label}
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 p-2 bg-white rounded-lg shadow-lg border-primary/20 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
        {items.map((item, idx) => (
          <DropdownMenuItem 
            key={idx} 
            onClick={() => handlePaidContent(label, item.label)}
            className="flex items-center justify-between gap-2 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 focus:bg-primary/5 focus:text-primary rounded-md py-2 px-3"
          >
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-primary/70" />
              <span>{item.label}</span>
            </div>
            {isPaid && !["Lessons", "Flashcards", "Clinical Clarity", "Clinical Skill Lab", "Simulators", "Exams"].includes(item.label) && <Lock className="w-3 h-3 text-gray-400" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const learningItems = [
    { icon: BookOpen, label: "Lessons" },
    { icon: Layers, label: "Flashcards" },
    { icon: Lightbulb, label: "Clinical Clarity" },
    { icon: Activity, label: "Clinical Skill Lab" },
    { icon: Stethoscope, label: "Simulators" },
    { icon: FileText, label: "Exams" },
  ];

  const designations = region === "CA" ? ["RPN", "RN", "NP"] : ["LVN", "RN", "NP"];

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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-softgray h-8 w-8">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-white p-5 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left flex items-center gap-2">
            <ThemedLogo width={180} />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Free Learning</p>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/pre-nursing")}>
              <BookOpen className="w-4 h-4" />
              Pre-Nursing Foundations
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/anatomy")}>
              <Dna className="w-4 h-4" />
              Anatomy & Physiology
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/lessons")}>
              <BookOpen className="w-4 h-4" />
              Lessons
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/clinical-clarity")}>
              <Lightbulb className="w-4 h-4" />
              Clinical Clarity
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/blog")}>
              <BookOpen className="w-4 h-4" />
              Blog
            </Button>
          </SheetClose>

          <div className="h-[1px] bg-gray-100 my-2" />

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Premium Tools</p>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/flashcards")}>
              <Layers className="w-4 h-4" />
              Flashcards
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/med-math")}>
              <span className="flex items-center gap-2"><Calculator className="w-4 h-4" /> Med Math Lab</span>
              <Lock className="w-3 h-3 text-gray-300" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/lab-values")}>
              <span className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> Lab Interpretation</span>
              <Lock className="w-3 h-3 text-gray-300" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/case-simulations")}>
              <span className="flex items-center gap-2"><Stethoscope className="w-4 h-4" /> Case Simulations</span>
              <Lock className="w-3 h-3 text-gray-300" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/medication-mastery")}>
              <span className="flex items-center gap-2"><Pill className="w-4 h-4" /> Medication Mastery</span>
              <Lock className="w-3 h-3 text-gray-300" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/simulators/clinical-skills")}>
              <Stethoscope className="w-4 h-4" /> Clinical Skills Simulator
            </Button>
          </SheetClose>

          <div className="h-[1px] bg-gray-100 my-2" />

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Interactive Labs</p>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/first-action-simulator")}>
              <Activity className="w-4 h-4" /> First Action Prioritization
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/safety-hazard-simulator")}>
              <Heart className="w-4 h-4" /> Safety Hazard Detection
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/iv-complications-simulator")}>
              <Dna className="w-4 h-4" /> IV Complications
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/electrolyte-abg-simulator")}>
              <span className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> Electrolyte & ABG</span>
              <Lock className="w-3 h-3 text-gray-300" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/deteriorating-patient-simulator")}>
              <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Deteriorating Patient</span>
              <Lock className="w-3 h-3 text-gray-300" />
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/blood-transfusion-simulator")}>
              <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Blood Transfusion</span>
              <Lock className="w-3 h-3 text-gray-300" />
            </Button>
          </SheetClose>

          <div className="h-[1px] bg-gray-100 my-2" />

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Resources</p>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/pricing")}>
              <Tag className="w-4 h-4" />
              Pricing
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/faq")}>
              <HelpCircle className="w-4 h-4" />
              FAQ
            </Button>
          </SheetClose>

          <div className="h-[1px] bg-gray-100 my-2" />

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Region & Theme</p>
          <div className="flex items-center gap-2 px-3 mb-2">
            <div className="flex items-center bg-primary/5 rounded-full p-0.5 border border-primary/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRegion("US")}
                className={cn("h-6 px-2 rounded-full text-[10px] font-bold transition-all", region === "US" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600")}
                data-testid="button-region-us-mobile"
              >
                US
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRegion("CA")}
                className={cn("h-6 px-2 rounded-full text-[10px] font-bold transition-all", region === "CA" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600")}
                data-testid="button-region-ca-mobile"
              >
                CA
              </Button>
            </div>
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
                      Admin Dashboard
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/content-editor")} data-testid="button-content-editor-mobile">
                      <FileText className="w-4 h-4" />
                      Content Editor
                    </Button>
                  </SheetClose>
                </>
              )}
              {isAdmin && (
                <>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 mt-2 px-3">Preview Mode</p>
                  <div className="flex flex-wrap gap-1 px-3 mb-1">
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
                          "h-7 px-2 text-[10px] rounded-full",
                          (previewTier === opt.key || (!previewTier && !opt.key)) ? "bg-primary text-white" : "text-gray-500"
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
                  Sign Out
                </Button>
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/login")}>
                  <LogIn className="w-4 h-4" />
                  Log in
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="w-full bg-primary hover:brightness-110 text-white rounded-full h-9 mt-1" onClick={() => setLocation("/login")}>
                  Get Started
                </Button>
              </SheetClose>
            </>
          )}
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
          <div className="flex items-center gap-2 lg:gap-6">
            <MobileNav />
            <Link href="/">
              <div className="flex items-center cursor-pointer group" data-testid="link-home-logo">
                <ThemedLogo width={180} className="group-hover:scale-105 transition-transform duration-300" />
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {designations.map((d) => (
                <NavDropdown key={d} label={d} items={learningItems} isPaid />
              ))}
              <div className="h-4 w-[1px] bg-primary/20 mx-1 lg:mx-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-primary/80 hover:text-primary hover:bg-transparent flex items-center gap-1 px-2 lg:px-3 group data-[state=open]:text-primary">
                    Free
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52 p-2">
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/pre-nursing")}>
                    <BookOpen className="w-4 h-4 text-primary/70" />
                    Pre-Nursing Foundations
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/anatomy")}>
                    <Dna className="w-4 h-4 text-primary/70" />
                    Anatomy & Physiology
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/clinical-clarity")}>
                    <Lightbulb className="w-4 h-4 text-primary/70" />
                    Clinical Clarity
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/lessons")}>
                    <BookOpen className="w-4 h-4 text-primary/70" />
                    Browse Lessons
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/blog")}>
                    <FileText className="w-4 h-4 text-primary/70" />
                    Blog
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-primary gap-1.5 px-2 lg:px-3" onClick={() => setLocation("/blog")}>
                <FileText className="w-4 h-4" />
                Blog
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-primary px-2 lg:px-3 gap-1">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="hidden lg:inline">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52 p-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-1 tracking-wider">Premium Tools</p>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/med-math")}>
                    <Calculator className="w-4 h-4" />
                    Med Math Lab
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/lab-values")}>
                    <FlaskConical className="w-4 h-4" />
                    Lab Interpretation
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/case-simulations")}>
                    <Stethoscope className="w-4 h-4" />
                    Case Simulations
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/medication-mastery")}>
                    <Pill className="w-4 h-4" />
                    Medication Mastery
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/simulators/clinical-skills")}>
                    <Stethoscope className="w-4 h-4" />
                    Clinical Skills Simulator
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-1 tracking-wider">Interactive Labs</p>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/first-action-simulator")}>
                    <Activity className="w-4 h-4" />
                    First Action Prioritization
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/safety-hazard-simulator")}>
                    <Heart className="w-4 h-4" />
                    Safety Hazard Detection
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/iv-complications-simulator")}>
                    <Dna className="w-4 h-4" />
                    IV Complications
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/electrolyte-abg-simulator")}>
                    <FlaskConical className="w-4 h-4" />
                    Electrolyte & ABG
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/deteriorating-patient-simulator")}>
                    <Activity className="w-4 h-4" />
                    Deteriorating Patient
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/blood-transfusion-simulator")}>
                    <Heart className="w-4 h-4" />
                    Blood Transfusion
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/pricing")}>
                    <Tag className="w-4 h-4" />
                    Pricing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-gray-700 hover:text-primary" onClick={() => setLocation("/faq")}>
                    <HelpCircle className="w-4 h-4" />
                    FAQ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <>
                    <Button variant="ghost" className="hidden sm:inline-flex text-softgray hover:text-primary font-medium text-sm px-2" onClick={() => setLocation("/admin")} data-testid="button-admin-nav">
                      <Shield className="w-4 h-4 mr-1" />
                      Admin
                    </Button>
                    <Button variant="ghost" className="hidden sm:inline-flex text-softgray hover:text-primary font-medium text-sm px-2" onClick={() => setLocation("/content-editor")} data-testid="button-content-editor-nav">
                      <FileText className="w-4 h-4 mr-1" />
                      Editor
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={previewTier ? "default" : "ghost"} size="sm" className={cn("hidden sm:inline-flex text-xs px-2 rounded-full", previewTier ? "bg-primary text-white" : "text-softgray hover:text-primary")} data-testid="button-preview-mode">
                          {previewTier ? `Viewing as: ${previewTier.toUpperCase()}` : "Preview"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 p-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-2 tracking-wider">View as user tier</p>
                        {[
                          { key: null, label: "Admin (Full)" },
                          { key: "free", label: "Free User" },
                          { key: "rpn", label: "RPN/LVN" },
                          { key: "rn", label: "RN" },
                          { key: "np", label: "NP" },
                        ].map((opt) => (
                          <DropdownMenuItem
                            key={opt.key || "admin"}
                            onClick={() => setPreviewTier(opt.key)}
                            className={cn("cursor-pointer text-xs", (previewTier === opt.key || (!previewTier && !opt.key)) ? "bg-primary/10 text-primary" : "")}
                          >
                            {opt.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
                <UserProfileDropdown user={user} logout={logout} setLocation={setLocation} />
              </>
            ) : (
              <>
                <Button variant="ghost" className="hidden sm:inline-flex text-softgray hover:text-primary font-medium text-sm px-2" onClick={() => setLocation("/login")} data-testid="button-login-nav">
                  Log in
                </Button>
                <Button className="bg-primary hover:brightness-110 text-white rounded-full px-3 sm:px-4 lg:px-6 text-xs sm:text-sm shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5" onClick={() => setLocation("/login")} data-testid="button-get-started">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-primary/10" style={{ backgroundColor: "var(--theme-primary)", opacity: 0.9 }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-end gap-2 h-9">
            <GlobalSearch />
            <div className="flex items-center bg-white/20 rounded-full p-0.5 border border-white/20">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setRegion("US")}
                className={cn("h-5 px-2 rounded-full text-[10px] font-bold transition-all", region === "US" ? "bg-white shadow-sm text-primary" : "text-white/70 hover:text-white")}
              >
                US
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setRegion("CA")}
                className={cn("h-5 px-2 rounded-full text-[10px] font-bold transition-all", region === "CA" ? "bg-white shadow-sm text-primary" : "text-white/70 hover:text-white")}
              >
                CA
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white rounded-full h-7 w-7">
                  <Palette className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 p-2 max-h-80 overflow-y-auto">
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-2 tracking-wider">Classic</p>
                <div className="grid grid-cols-1 gap-1">
                  {themes.slice(0, 7).map((t) => (
                    <DropdownMenuItem 
                      key={t.name}
                      onClick={() => setTheme(t.name)} 
                      className={cn(
                        "cursor-pointer gap-2 transition-colors",
                        theme === t.name ? "bg-primary/10 text-primary" : ""
                      )}
                    >
                      <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: t.color }} />
                      <span className="text-xs font-medium">{t.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-1.5" />
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-2 tracking-wider">Pastel & Clinical</p>
                <div className="grid grid-cols-1 gap-1">
                  {themes.slice(7, 11).map((t) => (
                    <DropdownMenuItem 
                      key={t.name}
                      onClick={() => setTheme(t.name)} 
                      className={cn(
                        "cursor-pointer gap-2 transition-colors",
                        theme === t.name ? "bg-primary/10 text-primary" : ""
                      )}
                    >
                      <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: t.color }} />
                      <span className="text-xs font-medium">{t.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-1.5" />
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-2 tracking-wider">Neutral</p>
                <div className="grid grid-cols-1 gap-1">
                  {themes.slice(11, 13).map((t) => (
                    <DropdownMenuItem 
                      key={t.name}
                      onClick={() => setTheme(t.name)} 
                      className={cn(
                        "cursor-pointer gap-2 transition-colors",
                        theme === t.name ? "bg-primary/10 text-primary" : ""
                      )}
                    >
                      <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: t.color }} />
                      <span className="text-xs font-medium">{t.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-1.5" />
                <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-2 tracking-wider">Dark</p>
                <div className="grid grid-cols-1 gap-1">
                  {themes.slice(13).map((t) => (
                    <DropdownMenuItem 
                      key={t.name}
                      onClick={() => setTheme(t.name)} 
                      className={cn(
                        "cursor-pointer gap-2 transition-colors",
                        theme === t.name ? "bg-primary/10 text-primary" : ""
                      )}
                    >
                      <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: t.color }} />
                      <span className="text-xs font-medium">{t.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
