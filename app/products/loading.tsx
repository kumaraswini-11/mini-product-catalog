import ProductSkeleton from "@/components/product/product-skeleton";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="py-4">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] items-start pb-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-[200px] hidden md:block" />
        <Skeleton className="h-10 w-[180px] hidden md:block" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({length: 8}).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
