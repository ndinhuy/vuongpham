import { AdminOrderContent, BreadCrumb } from "@app/components";
import { Metadata } from "next";
import React, { FC } from "react";

export const metadata: Metadata = {
  title: "Đơn hàng | IVY fashion",
  description: "Fashion store",
};

interface IOrdersProps {}

const OrdersPage: FC<IOrdersProps> = (props) => {
  return (
    <div className="p-5 bg-white rounded w-full mt-2 shadow">
      <BreadCrumb paths={["Admin", "Đơn hàng"]} />
      <h1 className="uppercase text-xl font-bold">Quản lí đơn hàng</h1>
      <span className="text-gray-400 text-sm">Quản lí danh sách đơn hàng</span>

      <AdminOrderContent />
    </div>
  );
};

export default OrdersPage;
