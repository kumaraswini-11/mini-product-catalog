"use client";

import React from "react";

import {cn} from "@/lib/utils";

import {Logo} from "../logo";
import {ThemeToggle} from "../theme-toggle";
import {NAV_ITEMS, NavItem, NavLink} from "./nav-items";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({className}) => {
  return (
    <header
      role="banner"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}>
      <div className="px-4 flex h-14 items-center justify-between">
        <Logo />

        {/* Navigation and Theme toggle */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <nav
              className="flex items-center gap-6"
              aria-label="Main navigation">
              {NAV_ITEMS.map((item: NavItem) => (
                <NavLink
                  key={item.href}
                  item={item}
                  mobile={false}
                  onClick={undefined}
                />
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
