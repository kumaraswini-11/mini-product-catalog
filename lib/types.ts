export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type SortOption = "price-asc" | "price-desc" | "title-asc" | "title-desc";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
}
