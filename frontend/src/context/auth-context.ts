"use client";

import { createContext } from "react";

export type AuthContextType = {
  user?: User;
  ready: boolean;
  fetchUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  ready: false,
  fetchUser: () => {},
});
