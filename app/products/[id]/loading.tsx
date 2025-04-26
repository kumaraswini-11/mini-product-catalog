import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4">
      {/* Back Button Skeleton */}
      <Skeleton className="h-5 w-28 mb-6" />

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Image Skeleton */}
        <div className="overflow-hidden py-0">
          <div className="relative w-full pt-[75%] bg-muted rounded-md">
            <Skeleton className="absolute top-0 left-0 h-full w-full" />
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24" /> {/* Badge */}
          <Skeleton className="h-10 w-3/4" /> {/* Title */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" /> {/* Rating star + value */}
            <Skeleton className="h-5 w-24" /> {/* Rating count */}
          </div>
          <Skeleton className="h-8 w-24" /> {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Skeleton className="h-11 sm:flex-1" /> {/* Add to Cart */}
            <Skeleton className="h-11 sm:flex-1" /> {/* Add to Wishlist */}
          </div>
        </div>
      </div>
    </div>
  );
}
