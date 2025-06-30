"use client";

import { createContext } from "react";

// Enum definitions

export enum ChatRoomState {
  READY = "READY",
  LAUNCHING = "LAUNCHING",
  PENDING = "PENDING",
  UNAVAILABLE = "UNAVAILABLE",
}

// Type definitions

export type CustomerChatContextType = {
  messages: Array<Message>;
  loadingMessages: boolean;
  state: ChatRoomState;
  opponentTyping: boolean;
  fetchNextPage: () => void;
  onSendMessage: (message: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
  onStartRoom: (email: string) => Promise<void>;
};

export type AdminChatContextType = {
  rooms: Array<Room>;
  fetchNextPage: () => void;
  onSendMessage: (roomEmail: string, message: string) => void;
  onTyping: (roomEmail: string) => void;
  onStopTyping: (roomEmail: string) => void;
  typingRooms: Record<string, boolean>;
};

// Context definitions

export const CustomerChatContext = createContext<CustomerChatContextType>({
  messages: [],
  loadingMessages: false,
  state: ChatRoomState.LAUNCHING,
  opponentTyping: false,
  fetchNextPage: () => {},
  onSendMessage: () => {},
  onTyping: () => {},
  onStopTyping: () => {},
  onStartRoom: async () => {},
});

export const AdminChatContext = createContext<AdminChatContextType>({
  rooms: [],
  fetchNextPage: () => {},
  onSendMessage: () => {},
  onTyping: () => {},
  onStopTyping: () => {},
  typingRooms: {},
});
