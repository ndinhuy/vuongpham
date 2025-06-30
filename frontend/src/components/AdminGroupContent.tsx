"use client";

import React, { FC } from "react";
import { ConfirmDialog, Modal, Pagination } from ".";
import { Check, X } from "lucide-react";
import CollectionGroupForm from "./CollectionGroupForm";
import { useDeleteGroup, useQueryPaginatedGroups } from "@app/data";

interface IProps {}

const AdminGroupContent: FC<IProps> = (props) => {
  const { data, isLoading, page, onChangePage, pages } = useQueryPaginatedGroups();
  const { mutate: deleteFn, isPending: isDeleting } = useDeleteGroup();

  const handleDeleteGroup = (group: Group) => {
    deleteFn(group._id);
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
              Tên nhóm
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
                <span className="w-full p-10 flex items-center justify-center">Đang tải...</span>
              </td>
            </tr>
          ) : (
            (data?.data as Group[]).map((group) => (
              <tr key={group._id} className="bg-white border-b   hover:bg-gray-50 ">
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
                  {group._id}
                </th>
                <td className="px-6 py-4">{group.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    {group.isSpecial ? (
                      <span>
                        <Check size={20} className="text-green-500" />
                      </span>
                    ) : (
                      <span>
                        <X size={20} className="text-red-500" />
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-x-3">
                  <Modal
                    size="lg"
                    title="Cập nhật nhóm"
                    toggle={<span className="font-medium cursor-pointer text-red-600  hover:underline">Sửa</span>}
                  >
                    <CollectionGroupForm group={group} type="update" />
                  </Modal>
                  <ConfirmDialog
                    message={`Bạn có chắc là muốn xóa nhóm ${group._id}`}
                    title="Xác nhận"
                    isAcceptLoading={isDeleting}
                    toggle={<span className="font-medium cursor-pointer text-blue-600  hover:underline">Xóa</span>}
                    onAccept={() => handleDeleteGroup(group)}
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

export default AdminGroupContent;
