import {ChartLineIcon, Info, Package} from "lucide-react";

import {NavItem} from "./types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/",
    icon: Info,
  },
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "Charts",
    href: "/charts",
    icon: ChartLineIcon,
  },
];
