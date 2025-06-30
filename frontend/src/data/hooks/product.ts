"use client";

import {
  keepPreviousData,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

import { LISTING_ITEM_LIMIT } from "@app/constants";
import { http } from "@app/configs";
import { uploadFiles } from "@app/data";

export const useQueryProductsByCategory = (
  collectionId: string,
): UseQueryResult<PaginationResponse<Product>, AxiosError<unknown, any>> & { onChangePage: (page: number) => void } => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<Product>, AxiosError, PaginationResponse<Product>, string[]>({
    queryKey: ["product-by-category", collectionId, `${page}`],
    queryFn: async (): Promise<PaginationResponse<Product>> => {
      const response: AxiosResponse<PaginationResponse<Product>> = await http.get(
        `/product?collection=${collectionId}`,
        {
          params: {
            page,
            limit: LISTING_ITEM_LIMIT,
          },
        },
      );

      return response.data;
    },
    enabled: !!collectionId,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    ...query,
    onChangePage: setPage,
  };
};

export const useQueryProducts = (): UsePaginationQueryResult<Product> => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<Product>, AxiosError, PaginationResponse<Product>, string[]>({
    queryKey: ["get-all-products", String(page)],
    queryFn: async (): Promise<PaginationResponse<Product>> => {
      const response: AxiosResponse<PaginationResponse<Product>> = await http.get(`/product/all`, {
        params: {
          page,
          limit: LISTING_ITEM_LIMIT,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const pages: number = query.data?.meta.pages || 0;

  return {
    ...query,
    page: page,
    limit: LISTING_ITEM_LIMIT,
    pages,
    onChangePage: setPage,
  };
};

export const useCreateProduct = (): UseMutationResult<
  Product | null,
  Error,
  { payload: CreateProductPayload; images: File[] },
  unknown
> => {
  const queryClient = useQueryClient();
  const queryKey = ["get-all-products"];

  return useMutation({
    mutationFn: async ({ payload, images }: { payload: CreateProductPayload; images: File[] }): Promise<Product> => {
      payload.images = await uploadFiles(images);

      const response: AxiosResponse<Product> = await http.post("/product", payload);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      toast.success("Thêm mới sản phẩm mới thành công!");
    },
    onError: (error: AxiosError) => {
      toast.error("Thêm mới sản phẩm thất bại");
      console.error("Error creating product: ", error.response?.data || error.message);
    },
  });
};

export const useDeleteProduct = (): UseMutationResult<boolean, AxiosError<unknown, any>, string, unknown> => {
  const queryClient = useQueryClient();
  const queryKey = ["get-all-products"];

  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      await http.delete(`/product/${id}`);

      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      toast.success("Xóa sản phẩm thành công!");
    },
    onError: (error: AxiosError) => {
      toast.error("Xóa sản phẩm thất bại");
      console.error("Error deleting product:", error.response?.data || error.message);
    },
  });
};

export const useUpdateProduct = (
  id: string,
): UseMutationResult<boolean, AxiosError<unknown, any>, UpdateProductPayload, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProductPayload): Promise<boolean> => {
      if (payload.newImages && payload.newImages.length > 0) {
        const newImageUrls: string[] = await uploadFiles(
          payload.newImages.filter((imgFile) => typeof imgFile != "string"),
        );

        Object.assign(payload, {
          newImages: newImageUrls,
        });
      }

      await http.put(`/product/${id}`, payload);

      return true;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] == "get-all-products",
      });
      await queryClient.invalidateQueries({ queryKey: ["product-detail", id] });

      toast.success("Cập nhật sản phẩm thành công!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Cập nhật sản phẩm thất bại`);
      console.error("Error updating product:", error.response?.data || error.message);
    },
  });
};

export const useQueryProductDetail = (id: string): UseQueryResult<Product, AxiosError<ErrorResponse>> => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: async (): Promise<Product> => {
      const response: AxiosResponse<Product> = await http.get(`/product/${id}`);

      return response.data;
    },
    enabled: !!id,
  });
};

export const useQueryTopProducts = (): UseQueryResult<TopProductResponse, AxiosError<ErrorResponse>> => {
  return useQuery({
    queryKey: ["top-products"],
    queryFn: async (): Promise<TopProductResponse> => {
      const response: AxiosResponse<TopProductResponse> = await http.get(`/product/top`);

      return response.data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useSearchProducts = (): UseMutationResult<Array<Product>, AxiosError<ErrorResponse>, string> => {
  return useMutation({
    mutationKey: ["search-products"],
    mutationFn: async (query: string): Promise<Array<Product>> => {
      const response: AxiosResponse<Array<Product>> = await http.get(`/product/search/${query}`);

      return response.data;
    },
  });
};
