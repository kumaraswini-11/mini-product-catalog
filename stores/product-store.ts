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

  setProducts: (products: Product[]) => void;
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: SortOption | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedCategory: null,
  searchQuery: "",
  sortOption: null,
  isLoading: false,
  error: null,

  setProducts: products => {
    set({products});
    const state = get();
    const filtered = filterAndSortProducts(
      products,
      state.selectedCategory,
      state.searchQuery,
      state.sortOption
    );
    set({filteredProducts: filtered});
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
    set({filteredProducts: filtered});
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
    set({filteredProducts: filtered});
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
}));

function filterAndSortProducts(
  products: Product[],
  category: string | null,
  query: string,
  sortOption: SortOption | null
): Product[] {
  // Filter by category
  let filtered = category ? products.filter(product => product.category === category) : products;

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
