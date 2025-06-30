"use client";

import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import { LISTING_ITEM_LIMIT } from "@app/constants";
import { http } from "@app/configs";

export const useQueryCategories = (
  enabled: boolean,
): UseQueryResult<PaginationResponse<Category>, AxiosError<ErrorResponse>> => {
  return useQuery<PaginationResponse<Category>, AxiosError<ErrorResponse>, PaginationResponse<Category>, string[]>({
    queryKey: ["get-categories"],
    queryFn: async (): Promise<PaginationResponse<Category>> => {
      const repsonse: AxiosResponse<PaginationResponse<Category>> = await http.get("/category");

      return repsonse.data;
    },
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useQueryAllCategories = (): UseQueryResult<Array<Category>, AxiosError<ErrorResponse>> => {
  return useQuery<Array<Category>, AxiosError<ErrorResponse>, Array<Category>, string[]>({
    queryKey: ["get-all-categories"],
    queryFn: async (): Promise<Array<Category>> => {
      const repsonse: AxiosResponse<Array<Category>> = await http.get("/category/all");

      return repsonse.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useQueryCategory = (): UsePaginationQueryResult<Category> => {
  const [page, setPage] = useState<number>(1);

  const queryResult = useQuery<PaginationResponse<Category>, AxiosError, PaginationResponse<Category>, string[]>({
    queryKey: ["paging-categories", String(page)],
    queryFn: async (): Promise<PaginationResponse<Category>> => {
      const repsonse: AxiosResponse<PaginationResponse<Category>> = await http.get("/category", {
        params: {
          page: page || 1,
          limit: LISTING_ITEM_LIMIT || 10,
        },
      });

      return repsonse.data;
    },
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const pages = queryResult.data?.meta.pages || 0;

  return {
    ...queryResult,
    pages,
    page,
    limit: LISTING_ITEM_LIMIT,
    onChangePage: setPage,
  };
};

export const useUpdateCategory = (): UseMutationResult<
  Category,
  AxiosError<unknown, any>,
  {
    id: string;
    payload: UpdateCategoryPayload;
  },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateCategoryPayload }) => {
      const response: AxiosResponse<Category> = await http.put(`/category/${id}`, payload);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-categories"] });
      await queryClient.fetchQuery({ queryKey: ["paging-categories", "1"] });
      toast.success("Cập nhật danh mục thành công!");
    },
    onError: (error: AxiosError) => {
      console.error("Error updating category", error.message);
      toast.error("Cập nhật danh mục thất bại, vui lòng thử lại");
    },
  });
};

export const useCreateCategory = (): UseMutationResult<Category, AxiosError, CreateCategoryPayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCategoryPayload): Promise<Category> => {
      const response: AxiosResponse<Category> = await http.post("/category", payload);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-categories"] });
      await queryClient.fetchQuery({ queryKey: ["paging-categories", "1"] });
      toast.success("Thêm danh mục thành công!");
    },
    onError: (error: AxiosError) => {
      console.error("Error creating category", error.message);
      toast.error("Thêm thể danh mục thất bại, vui lòng thử lại");
    },
  });
};

export const useDeleteCategory = (): UseMutationResult<boolean, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      await http.delete(`/category/${id}`);

      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-categories"] });
      await queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] == "paging-categories" });
      toast.success("Xóa danh mục thành công!");
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting category", error.message);
      toast.error("Xóa thể danh mục thất bại, vui lòng thử lại");
    },
  });
};
