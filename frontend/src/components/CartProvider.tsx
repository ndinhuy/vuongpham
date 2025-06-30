"use client";

import { FC, ReactNode, useEffect, useState } from "react";

import { useAuth } from "@app/common";
import { CartContext } from "@app/context";
import {
  useQueryCart,
  useAddCartItem,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
  fetchCartItemsDetails,
  saveCartToLocalStorage,
  getLocalStorageCart,
} from "@app/data";

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, ready } = useAuth();

  const { refetch: refetchCart } = useQueryCart();
  const { mutateAsync: addCartItem } = useAddCartItem();
  const { mutateAsync: removeCartItem } = useRemoveCartItem();
  const { mutateAsync: updateCartItem } = useUpdateCartItemQuantity();

  useEffect(() => {
    const initializeCart = async () => {
      if (!ready) return;

      const localItemIds = getLocalStorageCart();

      if (user) {
        setIsLoading(true);
        try {
          const serverCart = await refetchCart();
          setItems(serverCart.data || []);
        } catch (error) {
          console.error("Failed to sync cart:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        if (localItemIds.length > 0) {
          setIsLoading(true);
          try {
            const details = await fetchCartItemsDetails(localItemIds);
            setItems(details);
          } catch (error) {
            console.error("Failed to load cart items from localStorage:", error);
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    initializeCart();
  }, [user, ready]);

  const addItem = async (item: AddCartItemPayload) => {
    try {
      setIsLoading(true);
      await addCartItem(item);

      if (user) {
        const updatedCart = await refetchCart();

        setItems(updatedCart.data || []);
      }

      const localItemIds = getLocalStorageCart();
      const details = await fetchCartItemsDetails(localItemIds);
      setItems(details);
    } catch (error) {
      console.error("Failed to add item to cart:" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    if (user) {
      try {
        setIsLoading(true);
        await removeCartItem(itemId);
        const updatedCart = await refetchCart();
        setItems(updatedCart.data || []);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      const updatedItemIds = removeLocalStorageCartItem(itemId);
      setIsLoading(true);
      try {
        const details = await fetchCartItemsDetails(updatedItemIds);
        setItems(details);
      } catch (error) {
        console.error("Failed to update cart for guest user:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (user) {
      try {
        setIsLoading(true);
        await updateCartItem({ itemId, quantity });
        const updatedCart = await refetchCart();
        setItems(updatedCart.data || []);
      } catch (error) {
        console.error("Failed to update item quantity:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn("Guest users cannot update item quantity. Default is 1.");
    }
  };

  const removeLocalStorageCartItem = (itemId: string): string[] => {
    const localStorageCart = getLocalStorageCart();

    const newCart = localStorageCart.filter((id) => id !== itemId);

    saveCartToLocalStorage(newCart);

    return newCart;
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
