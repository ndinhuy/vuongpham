"use client";

import React, { FC, useMemo } from "react";
import { Search } from "lucide-react";

import { useQueryAdminOrders } from "@app/data";
import { canBeCanceledStatus, mapOrderStatus } from "@app/utils";
import { useListing } from "@app/common";
import { CancelOrderForm, Modal, Pagination } from ".";

interface IProps {}

const AdminOrderContent: FC<IProps> = () => {
  const { data, page, pages, onChangePage } = useQueryAdminOrders();

  const orders: Array<Order> = useMemo(() => data?.data || [], [data]);
  const { displayItems: displayOrders, onSearchChange } = useListing<Order>(orders);

  return (
    <div className="relative overflow-x-auto mt-5 custom-scroll">
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
            placeholder="Tìm kiếm đơn hàng..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Mã đơn hàng
            </th>
            <th scope="col" className="px-6 py-3">
              Tên khách hàng
            </th>
            <th scope="col" className="px-6 py-3">
              Số điện thoại
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3">
              Tổng tiền
            </th>
            <th scope="col" className="px-6 py-3">
              Hình thức thanh toán
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayOrders.map((order) => {
            return (
              <tr key={order._id} className="bg-white border-b hover:bg-gray-50 ">
                <td className="px-6 py-4">{order._id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {order.name}
                </th>
                <td className="px-6 py-4 text-nowrap">{order.phone}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.totalCost.toLocaleString()}đ</td>
                <td className="px-6 py-4">{order.paymentMethod}</td>
                <td className="px-6 py-4 text-nowrap">{mapOrderStatus(order.status)}</td>
                <td className="px-6 py-4">
                  {canBeCanceledStatus(order.status) && (
                    <Modal
                      toggle={
                        <span className="font-medium cursor-pointer text-red-600  hover:underline text-nowrap">
                          Huỷ đơn hàng
                        </span>
                      }
                      title={"Huỷ đơn hàng?"}
                    >
                      <CancelOrderForm orderId={order._id} page={page} />
                    </Modal>
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
    </div>
  );
};

export default AdminOrderContent;
