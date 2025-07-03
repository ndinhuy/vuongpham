"use client";
import React from "react";

interface AuthContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<string | null>(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
