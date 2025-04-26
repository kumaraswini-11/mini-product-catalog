"use client";

import {useEffect} from "react";

import type {Product} from "@/lib/types";
import {useProductStore} from "@/stores/product-store";

import ProductCard from "./product-card";
import ProductSkeleton from "./product-skeleton";

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({initialProducts}: ProductGridProps) {
  const {filteredProducts, setProducts, isLoading} = useProductStore();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, setProducts]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({length: 8}).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try changing your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
