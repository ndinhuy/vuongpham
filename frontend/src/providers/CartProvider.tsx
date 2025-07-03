"use client";
import { Product } from "@/app/(root-layout)/category/[id]/page";
import { LocalStorageKey } from "@/constants";
import React, { PropsWithChildren, useEffect, useRef } from "react";

interface CartContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    const storedCart = localStorage.getItem(LocalStorageKey.CART);
    if (storedCart) {
      try {
        setProducts(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    localStorage.setItem(LocalStorageKey.CART, JSON.stringify(products));
  }, [products]);

  return <CartContext.Provider value={{ products, setProducts }}>{children}</CartContext.Provider>;
};

export default CartProvider;
