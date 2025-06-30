"use client";

import React, { FC } from "react";

import { Pagination, ProductTable } from ".";
import { useQueryProducts } from "@app/data";

interface IProps {}

const AdminProductContent: FC<IProps> = ({}) => {
  const { page, pages, onChangePage, data, isLoading } = useQueryProducts();

  return (
    <div className="mt-5">
      <ProductTable products={data?.data || []} isLoading={isLoading} />

      <div className="w-full flex justify-end mt-10">
        {isLoading ? (
          <span className="text-gray-500 text-sm">Đang tải...</span>
        ) : (
          <Pagination currentPage={page} onChangePage={onChangePage} pageCount={pages} />
        )}
      </div>
    </div>
  );
};

export default AdminProductContent;
