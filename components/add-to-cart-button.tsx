"use client";

import {Product} from "@/lib/types";
import {useCartStore} from "@/stores/cart-store";

import {Button} from "./ui/button";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({product, quantity}) => {
  const addItem = useCartStore(state => state.addItem);
  const handleAddToCart = () => {
    console.log(product);
    addItem(product, quantity);
  };

  return (
    <Button
      size="lg"
      className="sm:flex-1"
      aria-label="Add to cart"
      onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};
