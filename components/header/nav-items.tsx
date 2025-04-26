"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {NavItem} from "@/lib/types";
import {cn} from "@/lib/utils";

export interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({item, onClick}) => {
  const pathname = usePathname();
  const Icon = item.icon;
  const isActive = pathname === item.href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none rounded-md",
              isActive ? "text-primary" : "text-muted-foreground"
            )}>
            <Icon
              className="size-5 md:size-4"
              aria-hidden={true}
            />
            {/* Label hidden on small screens, shown on md+ */}
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        </TooltipTrigger>
        {/* Tooltip only on mobile (sm and below) */}
        <TooltipContent
          side="bottom"
          className="sm:hidden">
          {item.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
