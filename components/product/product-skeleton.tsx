import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <Card className="overflow-hidden h-full py-0">
      <div className="aspect-square relative bg-gray-100 p-6">
        <Skeleton className="h-full w-full absolute inset-0" />
      </div>
      <CardContent className="p-2 w-full">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-20 mb-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-5 w-16" />
      </CardFooter>
    </Card>
  );
}
