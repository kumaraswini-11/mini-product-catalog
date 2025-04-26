"use client";

import {create} from "zustand";

import {Product, SortOption} from "@/lib/types";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  sortOption: SortOption | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;

  setProducts: (products: Product[]) => void;
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;

  getTotalPages: () => number;
  getCurrentPageItems: () => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedCategory: null,
  searchQuery: "",
  sortOption: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,

  setProducts: products => {
    set({products});
    const state = get();
    const filtered = filterAndSortProducts(
      products,
      state.selectedCategory,
      state.searchQuery,
      state.sortOption
    );
    set({filteredProducts: filtered, currentPage: 1}); // Reset to first page when products change
  },

  setCategory: category => {
    set({selectedCategory: category});
    const state = get();
    const filtered = filterAndSortProducts(
      state.products,
      category,
      state.searchQuery,
      state.sortOption
    );
    set({filteredProducts: filtered, currentPage: 1}); // Reset to first page when filter changes
  },

  setSearchQuery: query => {
    set({searchQuery: query});
    const state = get();
    const filtered = filterAndSortProducts(
      state.products,
      state.selectedCategory,
      query,
      state.sortOption
    );
    set({filteredProducts: filtered, currentPage: 1}); // Reset to first page when search changes
  },

  setSortOption: option => {
    set({sortOption: option});
    const state = get();
    const filtered = filterAndSortProducts(
      state.products,
      state.selectedCategory,
      state.searchQuery,
      option
    );
    set({filteredProducts: filtered});
  },

  setLoading: isLoading => set({isLoading}),
  setError: error => set({error}),
  setCurrentPage: page => set({currentPage: page}),
  setItemsPerPage: items => set({itemsPerPage: items}),

  getTotalPages: () => {
    const {filteredProducts, itemsPerPage} = get();
    return Math.ceil(filteredProducts.length / itemsPerPage);
  },

  getCurrentPageItems: () => {
    const {filteredProducts, currentPage, itemsPerPage} = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  },
}));

function filterAndSortProducts(
  products: Product[],
  category: string | null,
  query: string,
  sortOption: SortOption | null
): Product[] {
  let filtered = category ? products.filter(product => product.category === category) : products; // Filter by category

  // Filter by search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(
      product =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Sort products
  if (sortOption) {
    filtered = [...filtered];
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }

  return filtered;
}
