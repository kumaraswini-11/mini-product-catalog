"use client";

import {useEffect} from "react";

import type {Product} from "@/lib/types";
import {useProductStore} from "@/stores/product-store";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import ProductCard from "./product-card";
import ProductSkeleton from "./product-skeleton";

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({initialProducts}: ProductGridProps) {
  const {
    filteredProducts,
    setProducts,
    isLoading,
    currentPage,
    setCurrentPage,
    getTotalPages,
    getCurrentPageItems,
  } = useProductStore();

  const currentItems = getCurrentPageItems();
  const totalPages = getTotalPages();

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
    <div className="space-y-6">
      {/* Grid view  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {currentItems.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                onClick={e => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({length: totalPages}).map((_, index) => {
              const pageNum = index + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === pageNum}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                    onClick={e => {
                      e.preventDefault();
                      setCurrentPage(pageNum);
                    }}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                onClick={e => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
