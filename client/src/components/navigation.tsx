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
  Globe,
  Palette,
  Lock,
  HelpCircle,
  Tag,
  Dna
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [region, setRegion] = useState<"US" | "CA">("CA");
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePaidContent = (label: string) => {
    toast({
      title: "Subscription Required",
      description: `Access to ${label} materials requires an active subscription.`,
      variant: "default",
    });
  };

  const NavDropdown = ({ label, items, isPaid = false }: { label: string, items: { icon: any, label: string, color: string }[], isPaid?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-sm font-medium text-softgray hover:text-lavender-500 hover:bg-transparent flex items-center gap-2 group data-[state=open]:text-lavender-500"
        >
          {label}
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 p-2 bg-white rounded-lg shadow-lg border-lavender-200 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
        {items.map((item, idx) => (
          <DropdownMenuItem 
            key={idx} 
            onClick={() => isPaid ? handlePaidContent(label) : null}
            className="flex items-center justify-between gap-2 cursor-pointer text-gray-700 hover:text-lavender-600 hover:bg-lavender-50 focus:bg-lavender-50 focus:text-lavender-600 rounded-md py-2 px-3"
          >
            <div className="flex items-center gap-2">
              <item.icon className={cn("w-4 h-4", item.color)} />
              <span>{item.label}</span>
            </div>
            {isPaid && <Lock className="w-3 h-3 text-gray-400" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-lavender-100" />
        <DropdownMenuItem 
          onClick={() => isPaid ? handlePaidContent("Reports") : null}
          className="flex items-center justify-between gap-2 cursor-pointer text-gray-700 hover:text-lavender-600 hover:bg-lavender-50 focus:bg-lavender-50 focus:text-lavender-600 rounded-md py-2 px-3"
        >
          <div className="flex items-center gap-2">
            <BarChart className="w-4 h-4 text-blush-400" />
            <span>Reports</span>
          </div>
          {isPaid && <Lock className="w-3 h-3 text-gray-400" />}
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

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/90 backdrop-blur-lg border-lavender-100 shadow-sm" 
          : "bg-white/80 backdrop-blur-lg border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-lavender-300 to-blush-300 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-lavender-500 to-blush-400 bg-clip-text text-transparent tracking-tight">
                  NurseNest
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {designations.map((d) => (
                <NavDropdown key={d} label={d} items={learningItems} isPaid />
              ))}
              <div className="h-4 w-[1px] bg-lavender-100 mx-2" />
              <Button variant="ghost" className="text-sm font-medium text-mint-500 hover:text-mint-600 hover:bg-mint-50 gap-2">
                <Dna className="w-4 h-4" />
                A&P
              </Button>
              <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-lavender-500 gap-2">
                <Tag className="w-4 h-4" />
                Pricing
              </Button>
              <Button variant="ghost" className="text-sm font-medium text-softgray hover:text-lavender-500 gap-2">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-lavender-50 rounded-full p-1 border border-lavender-100 mr-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setRegion("US")}
                className={cn("h-7 px-3 rounded-full text-[10px] font-bold transition-all", region === "US" ? "bg-white shadow-sm text-lavender-600" : "text-gray-400 hover:text-gray-600")}
              >
                US
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setRegion("CA")}
                className={cn("h-7 px-3 rounded-full text-[10px] font-bold transition-all", region === "CA" ? "bg-white shadow-sm text-lavender-600" : "text-gray-400 hover:text-gray-600")}
              >
                CA
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-softgray hover:text-lavender-500 rounded-full">
                  <Palette className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <div className="w-4 h-4 rounded-full bg-lavender-500" /> Lavender
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <div className="w-4 h-4 rounded-full bg-mint-400" /> Mint
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <div className="w-4 h-4 rounded-full bg-blush-400" /> Blush
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="hidden sm:inline-flex text-softgray hover:text-lavender-500 font-medium">
              Log in
            </Button>
            <Button className="bg-lavender-500 hover:bg-lavender-600 text-white rounded-full px-6 shadow-md shadow-lavender-200 transition-all hover:shadow-lg hover:shadow-lavender-300 hover:-translate-y-0.5">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}