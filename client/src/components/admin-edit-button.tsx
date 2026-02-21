import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminEditButtonProps {
  editId?: string;
  editSlug?: string;
  pageName?: string;
  className?: string;
  variant?: "floating" | "inline";
}

export function AdminEditButton({
  editId,
  editSlug,
  pageName,
  className = "",
  variant = "floating",
}: AdminEditButtonProps) {
  const { isAdmin } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAdmin) return null;

  const editUrl = editId
    ? `/content-editor?edit=${editId}`
    : editSlug
      ? `/content-editor?slug=${editSlug}`
      : "/content-editor";

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {editId && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full text-xs"
            onClick={() => setLocation(editUrl)}
            data-testid="button-admin-edit-inline"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full text-xs"
          onClick={() => setLocation("/content-editor")}
          data-testid="button-admin-add-inline"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Content
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`} data-testid="admin-edit-fab">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full w-12 h-12 shadow-lg bg-primary text-white hover:brightness-110"
            data-testid="button-admin-fab"
          >
            <Pencil className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {editId && (
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onClick={() => setLocation(editUrl)}
              data-testid="menu-admin-edit-page"
            >
              <Pencil className="w-4 h-4" />
              Edit This Page
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => setLocation("/content-editor")}
            data-testid="menu-admin-new-content"
          >
            <Plus className="w-4 h-4" />
            New Content
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => setLocation("/admin")}
            data-testid="menu-admin-dashboard"
          >
            <ExternalLink className="w-4 h-4" />
            Admin Dashboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
