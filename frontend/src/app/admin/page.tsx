import { NewProductsChart, UserSignUpChart, VisitorsChart, WeeklySalesChart } from "@app/components";
import { Metadata } from "next";
import React, { FC } from "react";

interface IAdminPageProps {}

export const metadata: Metadata = {
  title: "Bảng điều khiển | IVY fashion",
  description: "Fashion store admin page",
};

const AdminPage: FC<IAdminPageProps> = (props) => {
  const weeklySalesData: WeeklySalesData = {
    currWeek: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
    prevWeek: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
  };

  const newProductsData = [170, 180, 164, 145, 194, 170, 155];

  const userSignupsData = [1334, 2435, 1753, 1328, 1155, 1632, 1336];

  const visitorsData = [500, 590, 600, 520, 610, 550, 600];

  return (
    <div className="grid grid-cols-12 gap-4 mt-2">
      <div className="col-span-full rounded-md shadow p-5 bg-white">
        <div className="mb-5">
          <h1 className="font-bold text-2xl">520.000.000 VNĐ</h1>
          <span className="text-gray-500 text-sm">Tổng doanh thu tuần này</span>
        </div>
        <WeeklySalesChart data={weeklySalesData} />
      </div>
      <div className="lg:col-span-4 col-span-full p-5 rounded-md bg-white shadow">
        <h1 className="font-bold text-2xl">12.000</h1>
        <span className="text-gray-500 text-sm">Sản phẩm mới tuần này</span>
        <NewProductsChart data={newProductsData} />
      </div>
      <div className="lg:col-span-4 col-span-full p-5 rounded-md bg-white shadow">
        <h1 className="font-bold text-2xl">10.450</h1>
        <span className="text-gray-500 text-sm">Lượt truy cập website</span>
        <VisitorsChart data={visitorsData} />
      </div>
      <div className="lg:col-span-4 col-span-full p-5 rounded-md bg-white shadow">
        <h1 className="font-bold text-2xl">125</h1>
        <span className="text-gray-500 text-sm">Lượt đăng ký tài khoản</span>
        <UserSignUpChart data={userSignupsData} />
      </div>
    </div>
  );
};

export default AdminPage;
