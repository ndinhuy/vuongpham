"use client";

import { Pagination } from "@app/components";
import { useQueryAccessHistory } from "@app/data";
import { FC } from "react";

type LoginLogTableProps = {};

const LoginLogTable: FC<LoginLogTableProps> = ({}: LoginLogTableProps) => {
  const { data, onChangePage } = useQueryAccessHistory();

  return (
    <section>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Thứ tự
            </th>
            <th scope="col" className="px-6 py-3">
              Trình duyệt
            </th>
            <th scope="col" className="px-6 py-3">
              Thiết bị
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ IP
            </th>
            <th scope="col" className="px-6 py-3">
              Thời gian
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((record, index) => {
            return (
              <tr key={record._id} className="bg-white border-b data-row">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{record.browserInfo}</td>
                <td className="px-6 py-4">{record.deviceInfo}</td>
                <td className="px-6 py-4">{record.ipAddress}</td>
                <td className="px-6 py-4">{new Date(record.createdAt).toLocaleString("vi-VN")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {data && data.meta.pages > 2 && (
        <div className="flex-1 flex justify-center mt-5">
          <Pagination currentPage={data.meta.page} pageCount={data.meta.pages} onChangePage={onChangePage} />
        </div>
      )}
    </section>
  );
};

export default LoginLogTable;
