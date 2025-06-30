"use client";

import { keepPreviousData, useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

import { LISTING_ITEM_LIMIT } from "@app/constants";
import { http } from "@app/configs";
import { formatErrorMessage } from "@app/utils";

export const useCreateOrder = (): UseMutationResult<Order, AxiosError<ErrorResponse>, CreateOrderPayload> => {
  const router = useRouter();

  return useMutation<Order, AxiosError<ErrorResponse>, CreateOrderPayload>({
    mutationKey: ["create-order"],
    mutationFn: async (data: CreateOrderPayload) => {
      const response: AxiosResponse<Order> = await http.post("/order", data);

      return response.data;
    },
    onSuccess(order) {
      router.replace(`/order/checkout/${order._id}`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useProcessOrder = (
  id: string,
): UseMutationResult<string, AxiosError<ErrorResponse>, ProcessOrderPayload> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError<ErrorResponse>, ProcessOrderPayload>({
    mutationKey: ["process-order"],
    mutationFn: async (data: ProcessOrderPayload): Promise<string> => {
      const response: AxiosResponse<string> = await http.post(`/order/process/${id}`, data);

      return response.data;
    },
    async onSuccess(redirectUrl) {
      await queryClient.refetchQueries({
        queryKey: ["order", id],
      });

      return router.replace(redirectUrl);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};

export const useGetOrder = (id?: string) => {
  return useQuery<Order, AxiosError<ErrorResponse>, Order, string[]>({
    enabled: !!id,
    queryKey: ["order", id || ""],
    queryFn: async () => {
      const response: AxiosResponse<Order> = await http.get(`/order/detail/${id}`);

      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useQueryCustomerOrders = (): UsePaginationQueryResult<Order> => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<Order>, AxiosError, PaginationResponse<Order>, string[]>({
    queryKey: ["get-customer-orders", String(page)],
    queryFn: async () => {
      const response: AxiosResponse<PaginationResponse<Order>> = await http.get(`/order`, {
        params: {
          page,
          limit: LISTING_ITEM_LIMIT,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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

export const useQueryAdminOrders = (): UsePaginationQueryResult<Order> => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery<PaginationResponse<Order>, AxiosError, PaginationResponse<Order>, string[]>({
    queryKey: ["get-admin-orders", String(page)],
    queryFn: async () => {
      const response: AxiosResponse<PaginationResponse<Order>> = await http.get(`/order/admin`, {
        params: {
          page,
          limit: LISTING_ITEM_LIMIT,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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

export const useRequestCancelOrder = (): UseMutationResult<
  { page: number },
  AxiosError<ErrorResponse>,
  RequestCancelPayload
> => {
  const queryClient = useQueryClient();

  return useMutation<{ page: number }, AxiosError<ErrorResponse>, RequestCancelPayload>({
    mutationKey: ["request-cancel-order"],
    mutationFn: async ({ orderId, page }: RequestCancelPayload) => {
      await http.post(`/order/request-cancel/${orderId}`);

      return { page };
    },
    onSuccess: async ({ page }) => {
      await queryClient.refetchQueries({
        queryKey: ["get-customer-orders", String(page)],
      });
      toast.success("Yêu cầu huỷ đơn hàng thành công");
    },
  });
};

export const useCancelOrder = (): UseMutationResult<
  { page: number },
  AxiosError<ErrorResponse>,
  CancelOrderPayload
> => {
  const queryClient = useQueryClient();

  return useMutation<{ page: number }, AxiosError<ErrorResponse>, CancelOrderPayload>({
    mutationKey: ["cancel-order"],
    mutationFn: async (payload: CancelOrderPayload) => {
      const { orderId, page, ...data } = payload;
      await http.post(`/order/cancel/${orderId}`, data);

      return { page };
    },
    onSuccess: async ({ page }) => {
      await queryClient.fetchQuery({ queryKey: ["get-admin-orders", String(page)] });
      toast.success("Thành công");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message
        ? formatErrorMessage(error.response.data.message)
        : "Có lỗi xảy ra khi huỷ đơn hàng";
      toast.error(errorMessage);
    },
  });
};
