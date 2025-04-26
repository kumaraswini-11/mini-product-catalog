"use client";

import Image from "next/image";
import Link from "next/link";

import {Star} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Product} from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group">
      <Card className="overflow-hidden h-full transition-all hover:shadow-md py-0">
        <div className="aspect-square relative bg-gray-100 p-6">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 transition-transform group-hover:scale-105"
            priority={false}
          />
        </div>
        <CardContent className="px-4 gap-2">
          <Badge
            variant="outline"
            className="mb-2">
            {product.category}
          </Badge>
          <h3 className="font-medium text-sm line-clamp-2 h-10 mb-1">{product.title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating.rate}</span>
            <span className="text-xs">({product.rating.count})</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="font-semibold">${product.price.toFixed(2)}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
