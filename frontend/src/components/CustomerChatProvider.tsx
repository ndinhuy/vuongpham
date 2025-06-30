"use client";

import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InfiniteData, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { Socket } from "socket.io-client";

import { CHAT_ID_PREFIX, SERVER_SOCKET_BASE_URL } from "@app/constants";
import { CustomerChatContext, ChatRoomState } from "@app/context";
import { loadChatRoom, useChatMessages } from "@app/data";
import { openSocket } from "@app/utils";
import { useAuth } from "@app/common";

type CustomerChatProviderProps = {
  children: ReactNode;
};

const CustomerChatProvider: FC<CustomerChatProviderProps> = ({ children }) => {
  const [state, setState] = useState<ChatRoomState>(ChatRoomState.LAUNCHING);
  const [opponentTyping, setOpponentTyping] = useState(false);
  const queryClient: QueryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  const { user } = useAuth();
  const email: string | null =
    user?.email || (typeof window !== "undefined" ? sessionStorage.getItem(CHAT_ID_PREFIX) : null);

  const { data, isPending, fetchNextPage } = useChatMessages(email || "");

  const messages: Message[] = useMemo(
    () =>
      data?.pages.reduce<Message[]>((prev, { data: messages }: InfiniteResponse<Message>) => {
        return [...prev, ...messages];
      }, []) || [],
    [data],
  );

  const addMessage = useCallback(
    (newMessage: Message) => {
      queryClient.setQueryData(
        ["chat-messages", email],
        (oldData: InfiniteData<InfiniteResponse<Message>> | undefined) => {
          if (oldData) {
            return {
              ...oldData,
              pages: oldData.pages.map((page, index) => {
                if (index != 0) return page;
                return {
                  ...page,
                  data: [...page.data, newMessage],
                };
              }),
            };
          }
          return oldData;
        },
      );
    },
    [queryClient, email],
  );

  const onStartRoom = useCallback(
    async (email: string) => {
      const room: Room = await loadChatRoom(email);

      if (!room) {
        setState(ChatRoomState.PENDING);
        return;
      }

      if (socketRef.current) {
        disconnect();
      }

      socketRef.current = openSocket(SERVER_SOCKET_BASE_URL);

      socketRef.current.emit("join", email);

      socketRef.current.on("message", (message: Message) => {
        addMessage(message);
      });

      socketRef.current.on("typing", (clientEmail: string) => {
        clientEmail !== email && setOpponentTyping(true);
      });

      socketRef.current.on("stop-typing", (clientEmail: string) => {
        clientEmail !== email && setOpponentTyping(false);
      });

      socketRef.current.on("joined", (clientEmail: string) => {
        if (clientEmail === email) {
          setState(ChatRoomState.READY);
        }
      });

      socketRef.current.on("connect_error", () => {
        setState(ChatRoomState.UNAVAILABLE);
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log(`WebSocket disconnected: ${reason}`);
      });
    },
    [socketRef, addMessage],
  );

  const start = useDebouncedCallback((email: string) => onStartRoom(email), 1000);

  useEffect(() => {
    if (!!email) {
      start(email);
    } else {
      setState(ChatRoomState.PENDING);
    }

    return () => {
      disconnect();
    };
  }, [email, start]);

  const disconnect = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  };

  const onSendMessage = useCallback(
    (message: string) => {
      const payload = {
        email,
        message,
      };

      socketRef.current?.emit("send", payload);
    },
    [email, socketRef],
  );

  const onTyping = useCallback(() => {
    socketRef.current?.emit("typing", {
      email: email,
      room: email,
    });
  }, [email, socketRef]);

  const onStopTyping = useCallback(() => {
    socketRef.current?.emit("stop-typing", {
      email: email,
      room: email,
    });
  }, [email, socketRef]);

  return (
    <CustomerChatContext.Provider
      value={{
        messages,
        loadingMessages: isPending,
        state,
        opponentTyping,
        fetchNextPage,
        onSendMessage,
        onTyping,
        onStopTyping,
        onStartRoom,
      }}
    >
      {children}
    </CustomerChatContext.Provider>
  );
};

export default CustomerChatProvider;
