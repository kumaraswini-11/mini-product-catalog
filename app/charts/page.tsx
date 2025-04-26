import {Suspense} from "react";

import CategoryDistributionChart from "@/components/charts/category-distribution-chart";
import PriceRangeChart from "@/components/charts/price-range-chart";
import RatingDistributionChart from "@/components/charts/rating-distribution-chart";
import {Skeleton} from "@/components/ui/skeleton";
import {getCategories, getProducts} from "@/lib/apis";

export const metadata = {
  title: "Product Analytics | ShopCatalog",
  description: "View analytics and charts for our product catalog",
};

export default async function ChartsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="container py-6 md:py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6 sr-only">Product Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<ChartSkeleton />}>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
            <CategoryDistributionChart products={products} />
          </div>
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Price Range Distribution</h2>
            <PriceRangeChart products={products} />
          </div>
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
            <RatingDistributionChart products={products} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="p-6 border rounded-lg">
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}
