"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {SortOption} from "@/lib/types";
import {useProductStore} from "@/stores/product-store";

export default function SortSelector() {
  const {sortOption, setSortOption} = useProductStore();

  const handleChange = (value: string) => {
    setSortOption(value as SortOption | null);
  };

  const sortOptions: {label: string; value: SortOption}[] = [
    {label: "Price: Low to High", value: "price-asc"},
    {label: "Price: High to Low", value: "price-desc"},
    {label: "Name: A to Z", value: "title-asc"},
    {label: "Name: Z to A", value: "title-desc"},
  ];

  return (
    <Select
      value={sortOption || ""}
      onValueChange={handleChange}>
      <SelectTrigger
        className="w-full md:w-[180px] h-10!"
        id="sort-selector"
        aria-haspopup="listbox"
        aria-label="Sort by">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent
        role="listbox"
        aria-labelledby="sort-selector">
        <SelectItem
          value="default"
          role="option">
          Default
        </SelectItem>
        {sortOptions.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
            role="option">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
