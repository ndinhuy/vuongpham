"use client";

import { FC, ReactNode } from "react";

import { BreadCrumb, CustomerSideBar } from "@app/components";

type CustomerLayoutProps = {
  children: ReactNode;
};

const CustomerLayout: FC<CustomerLayoutProps> = ({ children }: CustomerLayoutProps) => {
  return (
    <>
      <BreadCrumb paths={["Trang chủ", "Khách hàng"]} />

      <div className="flex flex-col px-5 md:px-0 lg:grid grid-cols-12 gap-20">
        <div className="col-span-3">
          <CustomerSideBar />
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </>
  );
};

export default CustomerLayout;
