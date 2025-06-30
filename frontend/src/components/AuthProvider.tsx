"use client";

import { FC, ReactNode } from "react";

import { AuthContext } from "@app/context";
import { useQueryAuthUser } from "@app/data";

type AuthProviderProps = { children: ReactNode };

const AuthProvider: FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const { data: authUser, isPending, refetch } = useQueryAuthUser();

  return (
    <AuthContext.Provider value={{ user: authUser, ready: !isPending, fetchUser: refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
