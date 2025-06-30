import { FC, ReactNode } from "react";

import { OrderProcess } from "@app/components";

type OrderLayoutProps = {
  children: ReactNode;
};

const OrderLayout: FC<OrderLayoutProps> = ({ children }: OrderLayoutProps) => {
  return (
    <>
      <div className="mt-5">
        <OrderProcess />
      </div>
      {children}
    </>
  );
};

export default OrderLayout;
