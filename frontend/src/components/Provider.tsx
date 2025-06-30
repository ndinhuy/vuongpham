import { FC, ReactNode } from "react";

import ReactQueryProvider from "./ReactQueryProvider";
import AuthProvider from "./AuthProvider";
import CartProvider from "./CartProvider";

type ProviderProps = {
  children: ReactNode;
};

const Provider: FC<ProviderProps> = ({ children }: ProviderProps) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default Provider;
