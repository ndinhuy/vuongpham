"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { CHAT_ID_PREFIX, LISTING_ITEM_LIMIT } from "@app/constants";
import { http } from "@app/configs";

export const useChatMessages = (roomEmail: string, limit: number = LISTING_ITEM_LIMIT) => {
  return useInfiniteQuery<InfiniteResponse<Message>, AxiosError<ErrorResponse>>({
    queryKey: ["chat-messages", roomEmail],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await http.get(`/contact/messages/${roomEmail}`, {
        params: { page: pageParam, limit },
      });
      return data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useChatRooms = (limit: number = LISTING_ITEM_LIMIT) => {
  return useInfiniteQuery<InfiniteResponse<Room>, AxiosError<ErrorResponse>>({
    queryKey: ["chat-rooms"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await http.get("/contact", {
        params: { page: pageParam, limit },
      });
      return data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const loadChatRoom = async (email: string): Promise<Room> => {
  const { data }: AxiosResponse<Room> = await http.post(`/contact?email=${email}`);

  if (data) {
    sessionStorage.setItem(CHAT_ID_PREFIX, data.email);
  }

  return data;
};
