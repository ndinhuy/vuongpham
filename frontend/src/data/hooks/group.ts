"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import { LISTING_ITEM_LIMIT } from "@app/constants";
import { http } from "@app/configs";

export const useQueryGroups = () => {
  return useQuery({
    queryKey: ["get-all-groups"],
    queryFn: async (): Promise<Group[]> => {
      const response: AxiosResponse<Group[]> = await http.get("/group");

      return response.data;
    },
  });
};

export const useQueryPaginatedGroups = (): UsePaginationQueryResult<Group> => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<Group>, Error, PaginationResponse<Group>, string[]>({
    queryKey: ["get-paginated-groups", String(page)],
    queryFn: async (): Promise<PaginationResponse<Group>> => {
      const response: AxiosResponse<PaginationResponse<Group>> = await http.get("/group", {
        params: {
          page,
          limit: LISTING_ITEM_LIMIT,
        },
      });

      return response.data;
    },
  });

  const pages = query.data?.meta.pages || 0;

  return {
    ...query,
    pages,
    page,
    onChangePage: setPage,
    limit: LISTING_ITEM_LIMIT,
  };
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CollectionGroupPayload): Promise<Group> => {
      const respsonse: AxiosResponse<Group> = await http.post("/group", payload);

      return respsonse.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-paginated-groups"] });
      toast.success("Thêm nhóm thành công");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Thêm nhóm thất bại, vui lòng thử lại");
    },
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CollectionGroupPayload): Promise<Group> => {
      const respsonse: AxiosResponse<Group> = await http.put("/group", payload);

      return respsonse.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-paginated-groups"] });
      toast.success("Cập nhật nhóm thành công");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Cập nhật nhóm thất bại, vui lòng thử lại");
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      await http.delete(`/group/${id}`);

      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-paginated-groups"] });
      toast.success("Xóa nhóm thành công");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Xóa nhóm thất bại, vui lòng thử lại");
    },
  });
};
