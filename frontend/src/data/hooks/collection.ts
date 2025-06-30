"use client";

import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";

import { LISTING_ITEM_LIMIT } from "@app/constants";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { http } from "@app/configs";

export const useQueryAllCollections = (): UseQueryResult<Collection[], AxiosError<unknown, any>> => {
  return useQuery<Collection[], AxiosError, Collection[], string[]>({
    queryKey: ["get-all-collections"],
    queryFn: async (): Promise<Collection[]> => {
      const response: AxiosResponse<Collection[]> = await http.get("/collection/all");

      return response.data;
    },
  });
};

export const useQueryCollection = (): UsePaginationQueryResult<Collection> => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<Collection>, Error, PaginationResponse<Collection>, string[]>({
    queryKey: ["get-collections", String(page)],
    queryFn: async (): Promise<PaginationResponse<Collection>> => {
      const response: AxiosResponse<PaginationResponse<Collection>> = await http.get("/collection", {
        params: {
          page,
          LISTING_ITEM_LIMIT,
        },
      });

      return response.data;
    },
  });

  const pages = query.data?.meta.pages || 0;

  return {
    ...query,
    limit: LISTING_ITEM_LIMIT,
    page,
    pages,
    onChangePage: setPage,
  };
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCollectionPayload): Promise<Collection> => {
      const response: AxiosResponse<Collection> = await http.post("/collection", payload);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-collections"] });
      toast.success("Thêm bộ sưu tập thành công");
    },
    onError: (error) => {
      console.error("Error creating collection", error);
      toast.error("Thêm bộ sưu tập thất bại");
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateCollectionPayload }) => {
      const response: AxiosResponse<Collection> = await http.put(`/collection/${id}`, payload);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-collections"] });
      toast.success("Cập nhật bộ sưu tập thành công");
    },
    onError: (error) => {
      console.error("Error updating collection", error);
      toast.error("Cập nhật bộ sưu tập thất bại");
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      return http.delete(`/collection/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-all-collections"] });
      toast.success("Xóa bộ sưu tập thành công");
    },
    onError: (error) => {
      console.error("Error deleting collection", error);
      toast.error("Xóa bộ sưu tập thất bại");
    },
  });
};
