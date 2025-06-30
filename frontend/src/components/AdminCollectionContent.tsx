"use client";

import React, { FC } from "react";
import { ConfirmDialog, Modal, Pagination } from ".";
import CollectionForm from "./CollectionForm";
import { useDeleteCollection, useQueryCollection } from "@app/data";

interface IProps {}

const AdminCollectionContent: FC<IProps> = (props) => {
  const { data, page, pages, onChangePage, isLoading } = useQueryCollection();
  const { mutate: deleteFn, isPending: isDeleting } = useDeleteCollection();

  const handleDeleteCollection = (collection: Collection) => {
    deleteFn(collection._id);
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
              Tên bộ sưu tập
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <span className="flex p-10 items-center justify-center">Đang tải...</span>
              </td>
            </tr>
          ) : (
            (data?.data as Collection[]).map((collection, index) => (
              <tr key={collection._id} className="bg-white border-b   hover:bg-gray-50 ">
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
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {collection._id}
                </th>
                <td className="px-6 py-4">{collection.name}</td>
                <td className="px-6 py-4 flex gap-x-3">
                  <Modal
                    size="lg"
                    title="Cập nhật bộ sưu tập"
                    toggle={<span className="font-medium cursor-pointer text-red-600  hover:underline">Sửa</span>}
                  >
                    <CollectionForm collection={collection} type="update" />
                  </Modal>
                  <ConfirmDialog
                    isAcceptLoading={isDeleting}
                    message={`Bạn có chắc là muốn xóa bộ sưu tập ${collection._id}`}
                    title="Xác nhận"
                    toggle={<span className="font-medium cursor-pointer text-blue-600  hover:underline">Xóa</span>}
                    onAccept={() => handleDeleteCollection(collection)}
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

export default AdminCollectionContent;
