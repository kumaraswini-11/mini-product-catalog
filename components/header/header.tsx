"use client";

import React from "react";

import {ShoppingCart} from "lucide-react";

import {cn} from "@/lib/utils";
import {useCartStore} from "@/stores/cart-store";

import {Logo} from "../logo";
import {ThemeToggle} from "../theme-toggle";
import {Badge} from "../ui/badge";
import {Button} from "../ui/button";
import {NAV_ITEMS, NavItem, NavLink} from "./nav-items";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({className}) => {
  const cartItemCount = useCartStore(state => state.getItemCount());

  return (
    <header
      role="banner"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}>
      <div className="px-4 flex h-14 items-center justify-between">
        <Logo />

        {/* Navigation, Theme toggle, and Cart */}
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

            {/* Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative">
                <ShoppingCart className="size-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
