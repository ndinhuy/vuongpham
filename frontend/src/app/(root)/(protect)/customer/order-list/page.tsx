import { FC } from "react";

import { CustomerOrderTable } from "@app/components";

type OrderListPageProps = {};

const OrderListPage: FC<OrderListPageProps> = ({}: OrderListPageProps) => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-10">Lịch sử đặt hàng</h1>

        <CustomerOrderTable />
      </div>
    </>
  );
};

export default OrderListPage;
