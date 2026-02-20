import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ChevronDown, Sparkles, ArrowRight, Eye } from "lucide-react";

export type ContentVisibility = "free" | "preview" | "premium";

interface ContentGateProps {
  visibility: ContentVisibility;
  requiredTier?: string;
  previewLines?: number;
  children: ReactNode;
  featureName?: string;
}

export function ContentGate({
  visibility,
  requiredTier = "rpn",
  previewLines = 3,
  children,
  featureName = "this content",
}: ContentGateProps) {
  const { user } = useAuth();

  const tierHierarchy: Record<string, number> = {
    free: 0,
    rpn: 1,
    rn: 2,
    np: 3,
    admin: 99,
  };

  const userTierLevel = user ? tierHierarchy[user.tier || "free"] || 0 : 0;
  const requiredLevel = tierHierarchy[requiredTier] || 1;
  const hasAccess = userTierLevel >= requiredLevel;

  if (visibility === "free" || hasAccess) {
    return <>{children}</>;
  }

  if (visibility === "preview") {
    return (
      <div className="relative">
        <div
          className="overflow-hidden"
          style={{ maxHeight: `${previewLines * 1.75}rem` }}
        >
          {children}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        <div className="relative -mt-4 flex flex-col items-center py-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm text-gray-600 mb-1 font-medium">Continue reading {featureName}</p>
          <p className="text-xs text-gray-400 mb-4">Unlock full access with a subscription</p>
          <Link href="/pricing">
            <Button size="sm" className="rounded-full gap-2 bg-primary text-white hover:brightness-110" data-testid="button-unlock-preview">
              <Sparkles className="w-3.5 h-3.5" />
              View Plans
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Card className="border border-gray-100 bg-gradient-to-br from-gray-50 to-white" data-testid="card-locked-content">
      <CardContent className="p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-primary/60" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Premium Content
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
          Access {featureName} with a subscription plan. 
          Build deeper clinical reasoning with mechanism-level explanations and interactive practice.
        </p>
        <Link href="/pricing">
          <Button className="rounded-full gap-2 bg-primary text-white hover:brightness-110 px-6" data-testid="button-unlock-premium">
            <Sparkles className="w-4 h-4" />
            Unlock Access
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

interface InternalLinkCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export function InternalLinkCard({ href, title, description, icon, badge }: InternalLinkCardProps) {
  return (
    <Link href={href}>
      <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 cursor-pointer group h-full">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors truncate">
                  {title}
                </span>
                {badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                    {badge}
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-gray-400 truncate mt-0.5">{description}</p>
              )}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}

export function CrossLinkBanner({ 
  title, 
  description, 
  href, 
  ctaText = "Explore",
  variant = "default" 
}: { 
  title: string; 
  description: string; 
  href: string; 
  ctaText?: string;
  variant?: "default" | "subtle";
}) {
  if (variant === "subtle") {
    return (
      <Link href={href}>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer group" data-testid={`link-crosslink-${href.replace(/\//g, '-')}`}>
          <Sparkles className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{title}</span>
            <span className="text-xs text-gray-400 ml-2">{description}</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent-foreground/5 rounded-xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <Link href={href}>
          <Button className="rounded-full gap-2 bg-primary text-white hover:brightness-110 flex-shrink-0" data-testid={`button-crosslink-${href.replace(/\//g, '-')}`}>
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
