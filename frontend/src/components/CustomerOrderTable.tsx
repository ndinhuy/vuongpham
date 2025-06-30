"use client";

import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQueryCustomerOrders, useRequestCancelOrder } from "@app/data";
import { ConfirmDialog, Pagination } from ".";
import { Loader2, Search } from "lucide-react";
import { canBeCanceledStatus, mapOrderStatus } from "@app/utils";
import Link from "next/link";
import { useListing } from "@app/common";

interface IProps {}

const CustomerOrderContent: FC<IProps> = () => {
  const { data, page, pages, onChangePage, isPending } = useQueryCustomerOrders();
  const { mutate: requestCancelOrder } = useRequestCancelOrder();

  const orders: Array<Order> = useMemo(() => data?.data || [], [data]);
  const { displayItems: displayOrders, onSearchChange } = useListing(orders);

  return (
    <div className="relative mt-5 custom-scroll">
      {displayOrders.length > 0 ? (
        <>
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
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                    Thanh toán
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {displayOrders.map((order) => (
                  <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/order/result/${order._id}`}>{order._id}</Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.name}</td>
                    <td className="px-6 py-4">{order.phone}</td>
                    <td className="px-6 py-4 min-w-[250px]">{order.address}</td>
                    <td className="px-6 py-4">{order.totalCost.toLocaleString()} đ</td>
                    <td className="px-6 py-4">{order.paymentMethod}</td>
                    <td className="px-6 py-4 text-nowrap">{mapOrderStatus(order.status)}</td>
                    <td className="px-6 py-4">
                      {canBeCanceledStatus(order.status) && (
                        <ConfirmDialog
                          onAccept={() => requestCancelOrder({ orderId: order._id, page })}
                          title={"Huỷ đơn hàng"}
                          message={"Bạn có chắc chắn muốn huỷ đơn hàng?"}
                          toggle={
                            <span className="font-medium cursor-pointer text-red-600  hover:underline text-nowrap">
                              Huỷ đơn hàng
                            </span>
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-end mt-10">
            <Pagination currentPage={page} onChangePage={onChangePage} pageCount={pages} />
          </div>
        </>
      ) : (
        <div className="w-full mx-auto text-center flex flex-col items-center py-10 text-gray-500">
          {isPending ? <Loader2 className="animate-spin mb-2" size={20} /> : "Chưa có đơn hàng nào"}
          {isPending && "Đang lấy thông tin đơn hàng"}
        </div>
      )}
    </div>
  );
};

export default CustomerOrderContent;
