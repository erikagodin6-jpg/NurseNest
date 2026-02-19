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
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavDropdown = ({ label, items }: { label: string, items: { icon: any, label: string, color: string }[] }) => (
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
            className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-lavender-600 hover:bg-lavender-50 focus:bg-lavender-50 focus:text-lavender-600 rounded-md py-2 px-3"
          >
            <item.icon className={cn("w-4 h-4", item.color)} />
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
        <div className="border-t border-lavender-100 my-1 mx-2" />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-lavender-600 hover:bg-lavender-50 focus:bg-lavender-50 focus:text-lavender-600 rounded-md py-2 px-3">
          <BarChart className="w-4 h-4 text-blush-400" />
          <span>Reports</span>
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

          <div className="hidden md:flex items-center gap-2">
            <NavDropdown label="RPN/LVN" items={learningItems} />
            <NavDropdown label="RN" items={learningItems} />
            <NavDropdown label="NP" items={learningItems} />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-softgray hover:text-lavender-500 font-medium">
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