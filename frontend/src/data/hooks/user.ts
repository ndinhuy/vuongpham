"use client";

import { keepPreviousData, useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

import { LISTING_ITEM_LIMIT } from "@app/constants";
import { useAuth } from "@app/common";
import { http } from "@app/configs";

export const useUpdateUser = (): UseMutationResult<
  User,
  AxiosError<ErrorResponse, any>,
  UpdateUserRequest,
  unknown
> => {
  const { fetchUser } = useAuth();
  return useMutation<User, AxiosError<ErrorResponse, any>, UpdateUserRequest>({
    mutationFn: async (request: UpdateUserRequest): Promise<User> => {
      const { data }: AxiosResponse<User> = await http.put("/user", request);

      return data;
    },
    async onSuccess() {
      fetchUser();
      toast.success("Cập nhật thông tin tài khoản thành công");
    },
  });
};

export const useQueryAuthUser = (): UseQueryResult<User, AxiosError<ErrorResponse, any>> => {
  return useQuery<User, AxiosError<ErrorResponse, any>, User>({
    queryKey: ["auth-user"],
    queryFn: async (): Promise<User> => {
      const { data }: AxiosResponse<User> = await http.get("/user/auth");

      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
  });
};

export const useQueryAccessHistory = (): UseQueryResult<PaginationResponse<AccessRecord>, AxiosError<unknown, any>> & {
  onChangePage: (page: number) => void;
} => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<AccessRecord>, AxiosError, PaginationResponse<AccessRecord>, string[]>({
    queryKey: ["access-history", `${page}`],
    queryFn: async (): Promise<PaginationResponse<AccessRecord>> => {
      const response: AxiosResponse<PaginationResponse<AccessRecord>> = await http.get(`/user/access`, {
        params: {
          page,
          limit: LISTING_ITEM_LIMIT,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return {
    ...query,
    onChangePage: setPage,
  };
};

export const useQueryAdminUsers = (): UsePaginationQueryResult<User> => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<User>, AxiosError, PaginationResponse<User>, string[]>({
    queryKey: ["admin-list", `${page}`],
    queryFn: async (): Promise<PaginationResponse<User>> => {
      const response: AxiosResponse<PaginationResponse<User>> = await http.get(`/user/admin`, {
        params: {
          page,
          limit: LISTING_ITEM_LIMIT,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    staleTime: 0,
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
