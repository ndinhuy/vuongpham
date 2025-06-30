"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

type ReactQueryProviderProps = {
  children: ReactNode;
};

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }: ReactQueryProviderProps) => {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
