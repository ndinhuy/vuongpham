"use client";

import { ReactNode, useEffect, useRef, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

import { ACCESS_KEY, API_TOKEN_TYPE, SERVER_SOCKET_BASE_URL } from "@app/constants";
import { getCookie, useChatRooms } from "@app/data";
import { AdminChatContext } from "@app/context";
import { openSocket } from "@app/utils";
import { useAuth } from "@app/common";

const AdminChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, fetchNextPage } = useChatRooms();
  const socketRef = useRef<Socket | null>(null);
  const { ready: authReady, user } = useAuth();
  const queryClient = useQueryClient();

  const [typingRooms, setTypingRooms] = useState<Record<string, boolean>>({});

  const rooms = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    const initChat = async () => {
      const accessToken = (await getCookie(ACCESS_KEY)) || "";

      if (authReady && accessToken) {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }

        socketRef.current = openSocket(SERVER_SOCKET_BASE_URL, {
          auth: {
            token: `${API_TOKEN_TYPE} ${accessToken}`,
          },
        });

        socketRef.current.emit("join-admin");

        socketRef.current.on("admin-message", ({ roomEmail, message }: AdminMessageResponse) => {
          queryClient.setQueryData(["chat-rooms"], (oldData: any) => {
            if (!oldData) return oldData;

            const newPages = oldData.pages.map((page: any) => ({
              ...page,
              data: page.data.map((room: Room) =>
                room.email === roomEmail ? { ...room, messages: [...room.messages, message] } : room,
              ),
            }));

            return { ...oldData, pages: newPages };
          });
        });

        socketRef.current.on("new-room", (newRoom) => {
          queryClient.setQueryData(["chat-rooms"], (oldData: any) => {
            if (!oldData) return oldData;

            const isRoomExist = oldData.pages.some((page: any) =>
              page.data.some((room: Room) => room.email === newRoom.email),
            );

            if (isRoomExist) return oldData;

            const updatedPages = oldData.pages.map((page: any, index: number) =>
              index === 0 ? { ...page, data: [newRoom, ...page.data] } : page,
            );

            return { ...oldData, pages: updatedPages };
          });
        });

        socketRef.current.on("typing", (roomEmail: string) => {
          setTypingRooms((prev) => ({ ...prev, [roomEmail]: true }));
        });

        socketRef.current.on("stop-typing", (roomEmail: string) => {
          setTypingRooms((prev) => ({ ...prev, [roomEmail]: false }));
        });

        socketRef.current.on("disconnect", (reason) => {
          console.log("WebSocket disconnected:", reason);
        });
      }
    };

    initChat();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [authReady, queryClient]);

  const onSendMessage = useCallback((roomEmail: string, message: string) => {
    const payload: CreateMessagePayload = {
      email: roomEmail,
      from: "ADMIN",
      message,
    };

    socketRef.current?.emit("send", payload);
    setTypingRooms((prev) => ({ ...prev, [roomEmail]: false })); // Ngừng nhập khi gửi tin
  }, []);

  const onTyping = useCallback(
    (roomEmail: string) => {
      if (user?.email) {
        socketRef.current?.emit("typing", { email: user.email, room: roomEmail });
      }
    },
    [user],
  );

  const onStopTyping = useCallback(
    (roomEmail: string) => {
      if (user?.email) {
        socketRef.current?.emit("stop-typing", { email: user.email, room: roomEmail });
      }
    },
    [user],
  );

  return (
    <AdminChatContext.Provider
      value={{
        rooms,
        typingRooms,
        onSendMessage,
        fetchNextPage,
        onTyping,
        onStopTyping,
      }}
    >
      {children}
    </AdminChatContext.Provider>
  );
};

export default AdminChatProvider;
