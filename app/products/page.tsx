import {Suspense} from "react";

import CategoryFilter from "@/components/filters/category-filter";
import SearchBar from "@/components/filters/search-bar";
import SortSelector from "@/components/filters/sort-selector";
import ProductGrid from "@/components/product/product-grid";
import ProductSkeleton from "@/components/product/product-skeleton";
import {getCategories, getProducts} from "@/lib/apis";

export const metadata = {
  title: "Products | ShopCatalog",
  description: "Browse our collection of products",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="py-4">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] items-start pb-2">
        <SearchBar />
        <CategoryFilter categories={categories} />
        <SortSelector />
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Array.from({length: 8}).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        }>
        <ProductGrid initialProducts={products} />
      </Suspense>
    </div>
  );
}
