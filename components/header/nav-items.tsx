"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {JSX} from "react";

import {Info, Package} from "lucide-react";

import {cn} from "@/lib/utils";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "About",
    href: "/",
    icon: Info,
  },
];

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
}

export interface NavLinkProps {
  item: NavItem;
  mobile?: boolean | undefined;
  onClick?: (() => void) | undefined;
}

export const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps): JSX.Element => {
  const pathname: string = usePathname();
  const Icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }> = props.item.icon;

  const isActive: boolean = pathname === props.item.href;

  return (
    <Link
      href={props.item.href}
      onClick={props.onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isActive ? "text-primary" : "text-muted-foreground",
        props.mobile ? "text-base" : undefined
      )}>
      <Icon
        className="size-4"
        aria-hidden={true}
      />
      <span>{props.item.label}</span>
    </Link>
  );
};
