"use client";

import { useContext } from "react";

import { AuthContext, AuthContextType } from "@app/context";

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
