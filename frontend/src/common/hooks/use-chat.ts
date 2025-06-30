"use client";

import { AdminChatContext, AdminChatContextType, CustomerChatContext, CustomerChatContextType } from "@app/context";
import { useContext } from "react";

export const useCustomerChat = (): CustomerChatContextType => {
  return useContext(CustomerChatContext);
};

export const useAdminChat = (): AdminChatContextType => {
  return useContext(AdminChatContext);
};
