"use client";

import {useEffect, useState} from "react";

import {Search} from "lucide-react";

import {Input} from "@/components/ui/input";
import {useDebounce} from "@/hooks/use-debounce";
import {useProductStore} from "@/stores/product-store";

export default function SearchBar() {
  const {searchQuery, setSearchQuery} = useProductStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div
      role="search"
      aria-label="Search products"
      className="relative w-full">
      <label
        htmlFor="product-search"
        className="sr-only">
        Search products
      </label>

      <Search className="absolute left-3 top-3.5 size-4 text-muted-foreground pointer-events-none" />
      <Input
        id="product-search"
        type="search"
        placeholder="Search products..."
        className="pl-9 h-10"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
