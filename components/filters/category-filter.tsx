"use client";

import {useState} from "react";

import {Check, ChevronsUpDown} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {useProductStore} from "@/stores/product-store";

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({categories}: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const {selectedCategory, setCategory} = useProductStore();

  const formattedCategories = categories.map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }));

  // Add "All" option
  const allCategories = [{value: null, label: "All Categories"}, ...formattedCategories];

  const selectedLabel = selectedCategory
    ? allCategories.find(c => c.value === selectedCategory)?.label
    : "All Categories";

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full md:w-[200px]">
          {selectedLabel}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {allCategories.map(category => (
                <CommandItem
                  key={category.label}
                  value={category.label}
                  onSelect={() => {
                    setCategory(category.value);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      selectedCategory === category.value ||
                        (selectedCategory === null && category.value === null)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
