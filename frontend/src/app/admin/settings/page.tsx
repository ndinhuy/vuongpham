import React, { FC } from "react";
import { Metadata } from "next";
import Image from "next/image";

import { AdminSettingsContent, BreadCrumb } from "@app/components";

export const metadata: Metadata = {
  title: "Cài đặt | IVY fashion",
  description: "Fashion store",
};

interface IProps {}

const UserSettingsPage: FC<IProps> = () => {
  return (
    <>
      <BreadCrumb paths={["Admin", "Thiết lập tài khoản"]} />
      <h1 className="uppercase text-xl font-bold">Thiết lập tài khoản</h1>
      <span className="text-gray-400 text-sm">Quản lí tài khoản của bạn</span>

      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="lg:col-span-4 col-span-full h-fit rounded shadow bg-white p-5 flex gap-x-4 items-center">
          <div className="relative h-28 w-28 bg-gray-50 rounded-md overflow-hidden">
            <Image alt="user avatar" src="/images/account.png" fill />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold my-0">Phan Hoan Viet</h1>
            <span className="text-sm text-gray-400">Quản trị viên</span>
            <button
              type="button"
              className="text-white bg-blue-700 mt-3 transition-all hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Tải ảnh lên
            </button>
          </div>
        </div>
        <div className="lg:col-span-8 col-span-full rounded shadow bg-white p-5">
          <AdminSettingsContent />
        </div>
      </div>
    </>
  );
};

export default UserSettingsPage;
