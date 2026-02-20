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
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
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

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [region, setRegionState] = useState<"US" | "CA">(() => {
    return (localStorage.getItem("nursenest-region") as "US" | "CA") || "CA";
  });
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

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
    toast({
      title: "Subscription Required",
      description: `Access to ${label} ${itemLabel || ""} materials requires an active subscription.`,
      variant: "default",
    });
  };

  const NavDropdown = ({ label, items, isPaid = false }: { label: string, items: { icon: any, label: string, color: string }[], isPaid?: boolean }) => (
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
              <item.icon className={cn("w-4 h-4", theme === 'lavender' || !mounted ? item.color : "text-primary/70")} />
              <span>{item.label}</span>
            </div>
            {isPaid && !["Lessons", "Flashcards", "Reports"].includes(item.label) && <Lock className="w-3 h-3 text-gray-400" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuItem 
          onClick={() => handlePaidContent("Reports", "Reports")}
          className="flex items-center justify-between gap-2 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 focus:bg-primary/5 focus:text-primary rounded-md py-2 px-3"
        >
          <div className="flex items-center gap-2">
            <BarChart className="w-4 h-4 text-primary/60" />
            <span>Reports</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const learningItems = [
    { icon: BookOpen, label: "Lessons", color: "text-lavender-400" },
    { icon: Layers, label: "Flashcards", color: "text-blush-400" },
    { icon: Activity, label: "OSCE", color: "text-powder-400" },
    { icon: Stethoscope, label: "Simulators", color: "text-mint-400" },
    { icon: FileText, label: "Exams", color: "text-lavender-400" },
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
  ];

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-softgray h-8 w-8">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-white p-5">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-foreground rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">NurseNest</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Designations</p>
          {designations.map((d) => (
            <SheetClose key={d} asChild>
              <Button variant="ghost" className="w-full justify-between text-gray-700 hover:text-primary hover:bg-primary/5 h-9" onClick={() => handlePaidContent(d)}>
                {d}
                <Lock className="w-3 h-3 text-gray-400" />
              </Button>
            </SheetClose>
          ))}

          <div className="h-[1px] bg-gray-100 my-2" />

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Learning</p>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/lessons")}>
              <BookOpen className="w-4 h-4" />
              Lessons
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/flashcards")}>
              <Layers className="w-4 h-4" />
              Flashcards
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/reports")}>
              <BarChart className="w-4 h-4" />
              Reports
            </Button>
          </SheetClose>

          <div className="h-[1px] bg-gray-100 my-2" />

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Resources</p>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start text-primary/80 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/anatomy")}>
              <Dna className="w-4 h-4" />
              A&P (Free)
            </Button>
          </SheetClose>
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

          {user ? (
            <>
              <SheetClose asChild>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-primary hover:bg-primary/5 gap-2 h-9" onClick={() => setLocation("/profile")}>
                  <User className="w-4 h-4" />
                  {user.username}
                </Button>
              </SheetClose>
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
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent-foreground rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent tracking-tight">
                  NurseNest
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {designations.map((d) => (
                <NavDropdown key={d} label={d} items={learningItems} isPaid />
              ))}
              <div className="h-4 w-[1px] bg-primary/20 mx-1 lg:mx-2" />
              <Button variant="ghost" className="text-sm font-medium text-primary/80 hover:text-primary hover:bg-primary/5 gap-1.5 px-2 lg:px-3" onClick={() => setLocation("/anatomy")}>
                <Dna className="w-4 h-4" />
                A&P
              </Button>
              <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-primary gap-1.5 px-2 lg:px-3" onClick={() => setLocation("/reports")}>
                <BarChart className="w-4 h-4" />
                Reports
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-primary px-2 lg:px-3 gap-1">
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="hidden lg:inline">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40 p-2">
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
            <div className="flex items-center bg-primary/5 rounded-full p-0.5 sm:p-1 border border-primary/10">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setRegion("US")}
                className={cn("h-6 sm:h-7 px-1.5 sm:px-2 lg:px-3 rounded-full text-[10px] font-bold transition-all", region === "US" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600")}
              >
                US
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setRegion("CA")}
                className={cn("h-6 sm:h-7 px-1.5 sm:px-2 lg:px-3 rounded-full text-[10px] font-bold transition-all", region === "CA" ? "bg-white shadow-sm text-primary" : "text-gray-400 hover:text-gray-600")}
              >
                CA
              </Button>
            </div>

            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-softgray hover:text-primary rounded-full h-8 w-8">
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 p-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-2 mb-2 tracking-wider">Choose Theme</p>
                  <div className="grid grid-cols-1 gap-1">
                    {themes.map((t) => (
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

            {user ? (
              <>
                <Button variant="ghost" className="hidden sm:inline-flex text-softgray hover:text-primary font-medium text-sm px-2" onClick={() => setLocation("/profile")} data-testid="button-profile">
                  {user.username}
                </Button>
                <Button variant="outline" className="rounded-full px-3 text-xs sm:text-sm sm:px-4" onClick={() => { logout(); setLocation("/"); }} data-testid="button-logout-nav">
                  Sign Out
                </Button>
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
    </nav>
  );
}
