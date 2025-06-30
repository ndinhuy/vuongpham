"use client";

import { CartContext, CartContextType } from "@app/context";
import { useContext } from "react";

export const useCart = (): CartContextType => {
  return useContext(CartContext);
};
