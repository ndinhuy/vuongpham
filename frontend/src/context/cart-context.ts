"use client";

import { createContext } from "react";

export type CartContextType = {
  items: CartItem[];
  addItem: (item: AddCartItemPayload) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  isLoading: boolean;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  isLoading: false,
});
