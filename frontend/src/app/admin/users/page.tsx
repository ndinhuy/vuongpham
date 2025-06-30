import React, { FC } from "react";
import { Metadata } from "next";

import { AdminUserContent, BreadCrumb } from "@app/components";

export const metadata: Metadata = {
  title: "Khách hàng | IVY fashion",
  description: "Fashion store",
};

interface IUsersProps {}

const UsersPage: FC<IUsersProps> = () => {
  return (
    <div className="p-5 bg-white rounded w-full mt-2 shadow">
      <BreadCrumb paths={["Admin", "Người dùng"]} />
      <h1 className="uppercase text-xl font-bold">Quản lí quản trị viên</h1>
      <span className="text-gray-400 text-sm">Quản lí danh sách quản trị viên</span>

      <AdminUserContent />
    </div>
  );
};

export default UsersPage;
