"use client";

import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import LZString from "lz-string";

import { formatErrorMessage } from "@app/utils";
import { CART_PREFIX } from "@app/constants";
import { http } from "@app/configs";

type ErrorResponse = {
  message: string | string[];
  statusCode: number;
};

export const addLocalStorageCartItem = (itemId: string): string[] => {
  const localStorageCart = getLocalStorageCart();

  if (!localStorageCart.includes(itemId)) {
    const newCart = [...localStorageCart, itemId];

    saveCartToLocalStorage(newCart);

    return newCart;
  }

  return localStorageCart;
};

export const saveCartToLocalStorage = (itemIds: string[]) => {
  const compressedCart = LZString.compressToUTF16(JSON.stringify(itemIds));
  localStorage.setItem(CART_PREFIX, compressedCart);
};

export const getLocalStorageCart = (): string[] => {
  if (typeof window === "undefined") return [];

  const compressedCart = localStorage.getItem(CART_PREFIX);
  if (!compressedCart) return [];

  try {
    const decompressedCart = LZString.decompressFromUTF16(compressedCart);
    return JSON.parse(decompressedCart || "[]");
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
};

export const removeLocalStorageCartItem = (itemId: string): string[] => {
  const localStorageCart = getLocalStorageCart();

  const newCart = localStorageCart.filter((id) => id !== itemId);

  saveCartToLocalStorage(newCart);

  return newCart;
};

export const useQueryCart = (): UseQueryResult<Array<CartItem>, AxiosError<ErrorResponse>> => {
  return useQuery<Array<CartItem>, AxiosError<ErrorResponse>>({
    queryKey: ["cart"],
    queryFn: async (): Promise<Array<CartItem>> => {
      const response: AxiosResponse<Array<CartItem>> = await http.post("/cart/items", {});
      return response.data;
    },
    enabled: false,
  });
};

export const useAddCartItem = (): UseMutationResult<Array<string>, AxiosError<ErrorResponse>, AddCartItemPayload> => {
  return useMutation<Array<string>, AxiosError<ErrorResponse>, AddCartItemPayload>({
    mutationKey: ["add-cart-item"],
    mutationFn: async (item: AddCartItemPayload): Promise<Array<string>> => {
      const addCartItem = async () => {
        const response: AxiosResponse<CartItem> = await http.post("/cart/items/add", item);

        return addLocalStorageCartItem(response.data._id);
      };

      return await toast.promise(addCartItem(), {
        loading: "Đang thêm sản phẩm vào giỏ hàng",
        success: "Thêm sản phẩm vào giỏ hàng thành công",
        error: (error) => {
          return error.response?.data.message
            ? formatErrorMessage(error.response.data.message)
            : "Có lỗi xảy ra khi thêm sản phẩm";
        },
      });
    },
  });
};

export const useRemoveCartItem = (): UseMutationResult<Array<string>, AxiosError<ErrorResponse>, string> => {
  return useMutation<Array<string>, AxiosError<ErrorResponse>, string>({
    mutationKey: ["remove-cart-item"],
    mutationFn: async (itemId: string) => {
      await http.delete(`/cart/items/${itemId}`);

      return removeLocalStorageCartItem(itemId);
    },
    onSuccess() {
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
    },
    onError(error) {
      const errorMessage = error.response?.data.message
        ? formatErrorMessage(error.response.data.message)
        : "Có lỗi xảy ra khi xóa sản phẩm";
      toast.error(errorMessage);
    },
  });
};

type UpdateCartItemQuantityPayload = {
  itemId: string;
  quantity: number;
};

export const useUpdateCartItemQuantity = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  UpdateCartItemQuantityPayload
> => {
  return useMutation<void, AxiosError<ErrorResponse>, UpdateCartItemQuantityPayload>({
    mutationKey: ["update-cart-item-quantity"],
    mutationFn: async ({ itemId, quantity }) => {
      await http.put(`/cart/items/${itemId}`, {
        quantity,
      });
    },
    onSuccess() {
      toast.success("Cập nhật số lượng sản phẩm thành công");
    },
    onError(error) {
      const errorMessage = error.response?.data.message
        ? formatErrorMessage(error.response.data.message)
        : "Có lỗi xảy ra khi cập nhật số lượng";
      toast.error(errorMessage);
    },
  });
};

export const fetchCartItemsDetails = async (ids: string[]): Promise<CartItem[]> => {
  if (!ids.length) return [];
  const response = await http.post("/cart/items", { ids });
  return response.data;
};
