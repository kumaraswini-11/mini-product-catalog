"use client";

import {create} from "zustand";
import {persist} from "zustand/middleware";

import {Product} from "@/lib/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set(state => {
          const existingItem = state.items.find(item => item.product.id === product.id);

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? {...item, quantity: item.quantity + quantity}
                  : item
              ),
            };
          } else {
            // Add new item
            return {
              items: [...state.items, {product, quantity}],
            };
          }
        });
      },

      removeItem: productId => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId ? {...item, quantity: Math.max(1, quantity)} : item
          ),
        }));
      },

      clearCart: () => {
        set({items: []});
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
