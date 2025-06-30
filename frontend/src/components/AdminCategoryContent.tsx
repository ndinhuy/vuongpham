"use client";

import { Check, X } from "lucide-react";
import React, { FC } from "react";

import { useDeleteCategory, useQueryCategory } from "@app/data";
import { ConfirmDialog, Modal, Pagination } from ".";
import CategoryForm from "./CategoriesForm";

interface IProps {}

const AdminCategoryContent: FC<IProps> = () => {
  const { data, isLoading, onChangePage, pages, page } = useQueryCategory();
  const { mutate: deleteFn, isPending: isDeleting } = useDeleteCategory();

  const handleDeleteCategory = (category: Category) => {
    deleteFn(category._id);
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Tên danh mục
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Đặc biệt
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5}>
                <span className="p-10 flex items-center justify-center w-full">Đang tải...</span>
              </td>
            </tr>
          ) : (
            (data?.data as Category[]).map((category, index) => (
              <tr key={category._id} className="bg-white border-b   hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {category._id}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {category.name}
                </th>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center">
                    {category.isSpecial ? (
                      <Check size={20} className="text-green-500" />
                    ) : (
                      <X size={20} className="text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-x-3">
                  <Modal
                    title="Cập nhật danh mục"
                    toggle={<span className="font-medium cursor-pointer text-red-600  hover:underline">Sửa</span>}
                  >
                    <CategoryForm category={category} type="update" />
                  </Modal>
                  <ConfirmDialog
                    isAcceptLoading={isDeleting}
                    message={`Bạn có chắc là muốn xóa danh mục ${category._id}`}
                    title="Xác nhận"
                    toggle={<span className="font-medium cursor-pointer text-blue-600  hover:underline">Xóa</span>}
                    onAccept={() => handleDeleteCategory(category)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="w-full flex justify-end mt-10">
        {isLoading ? (
          <span className="text-sm text-gray-500">Đang tải...</span>
        ) : (
          <Pagination currentPage={page} onChangePage={onChangePage} pageCount={pages} />
        )}
      </div>
    </>
  );
};

export default AdminCategoryContent;
