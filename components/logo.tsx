import Link from "next/link";

import {ShoppingBag} from "lucide-react";

export const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="ShopCatalog Home">
      <ShoppingBag
        className="size-6"
        aria-hidden="true"
      />
      <span className="hidden md:block font-bold text-xl">ShopCatalog</span>
    </Link>
  );
};
