import { Link } from "wouter";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface LocaleLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children?: ReactNode;
}

export function LocaleLink({ href, children, ...props }: LocaleLinkProps) {
  return <Link href={href} {...props}>{children}</Link>;
}
