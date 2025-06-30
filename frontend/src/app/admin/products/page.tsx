import React, { FC } from "react";
import { Metadata } from "next";

import { BreadCrumb, AdminProductContent } from "@app/components";

export const metadata: Metadata = {
  title: "Sản phẩm | IVY fashion",
  description: "Fashion store",
};

interface IProductsProps {}

const ProductsPage: FC<IProductsProps> = ({}) => {
  return (
    <div className="p-5 bg-white rounded w-full mt-2 shadow">
      <BreadCrumb paths={["Admin", "Sản phẩm"]} />
      <h1 className="uppercase text-xl font-bold">Quản lí sản phẩm</h1>
      <span className="text-gray-400 text-sm">Quản lí danh sách sản phẩm</span>

      <AdminProductContent />
    </div>
  );
};

export default ProductsPage;
