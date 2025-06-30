"use client";

import React, { FC, useMemo } from "react";
import { Search } from "lucide-react";

import { Button, ConfirmDialog, InteractionWrapper, Modal, Pagination, SignUpAdminForm } from ".";
import { useActiveAccount, useLockAccount, useQueryAdminUsers } from "@app/data";
import { cn, getAccountStatus, getAdminRoleStyle } from "@app/utils";
import { useListing } from "@app/common";

interface IProps {}

const AdminUserContent: FC<IProps> = () => {
  const { data, page, pages, onChangePage } = useQueryAdminUsers();
  const { mutate: lockAccount, isPending: locking } = useLockAccount();
  const { mutate: activeAccount, isPending: activating } = useActiveAccount();

  const users: Array<User> = useMemo(() => data?.data || [], [data]);
  const { displayItems: displayUsers, onSearchChange } = useListing<User>(users);

  return (
    <InteractionWrapper disabled={locking || activating} className="relative overflow-x-auto mt-5 custom-scroll">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
            placeholder="Tìm kiếm quản trị viên..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Modal
          title="Thêm quản trị viên"
          toggle={<Button className="rounded-lg py-2 w-full lg:w-auto">Thêm quản trị viên</Button>}
          size="xl"
        >
          <SignUpAdminForm />
        </Modal>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Vai trò
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tham gia
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {displayUsers.map((user) => {
            const role = getAdminRoleStyle(user.role || "CUSTOMER");

            return (
              <tr key={user._id} className="bg-white border-b   hover:bg-gray-50 ">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {user._id}
                </td>
                <td className="px-6 py-4">{`${user.lastName} ${user.firstName}`}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={cn("tag", role.tagStyle)}>{role.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="w-full text-center">
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="w-full text-center">{getAccountStatus(user.isLocked)}</span>
                </td>
                <td className="px-6 py-4 flex gap-x-3">
                  {user.isLocked ? (
                    <ConfirmDialog
                      title="Kích hoạt tài khoản"
                      toggle={
                        <span className="font-medium cursor-pointer text-blue-600  hover:underline">
                          Kích hoạt tài khoản
                        </span>
                      }
                      onAccept={() => activeAccount({ uid: user._id, page: page })}
                      message={"Bạn có muốn kích hoạt tài khoản này"}
                    />
                  ) : (
                    <ConfirmDialog
                      title="Khoá tài khoản"
                      toggle={
                        <span className="font-medium cursor-pointer text-red-600  hover:underline">Khoá tài khoản</span>
                      }
                      onAccept={() => lockAccount({ uid: user._id, page: page })}
                      message={"Bạn có muốn khoá tài khoản này"}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full flex justify-end mt-10">
        <Pagination currentPage={page} onChangePage={onChangePage} pageCount={pages} />
      </div>
    </InteractionWrapper>
  );
};

export default AdminUserContent;
