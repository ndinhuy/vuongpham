import { Plus } from "lucide-react";
import React, { FC } from "react";
import { Metadata } from "next";

import { AdminCollectionContent, BreadCrumb, Button, Modal, CollectionForm } from "@app/components";

export const metadata: Metadata = {
  title: "Bộ sưu tập | IVY fashion",
  description: "Fashion store",
};

interface IVariantsProps {}

const VariantsPage: FC<IVariantsProps> = (props) => {
  return (
    <div className="p-5 bg-white rounded w-full mt-2 shadow">
      <BreadCrumb paths={["Admin", "Bộ sưu tập"]} />
      <h1 className="uppercase text-xl font-bold">Quản lí bộ sưu tập</h1>
      <span className="text-gray-400 text-sm">Quản lí danh sách bộ sưu tập</span>

      <div className="relative overflow-x-auto mt-5 custom-scroll">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Tìm kiếm bộ sưu tập..."
            />
          </div>
          <Modal
            title="Thêm bộ sưu tập"
            size="xl"
            toggle={
              <Button className="flex items-center gap-x-3">
                <Plus size={20} /> Thêm bộ sưu tập
              </Button>
            }
          >
            <CollectionForm />
          </Modal>
        </div>

        <AdminCollectionContent />
      </div>
    </div>
  );
};

export default VariantsPage;
