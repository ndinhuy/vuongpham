"use client";

import React, { memo, useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button, CollapseMenu, ConfirmDialog } from "@app/components";
import { useDeleteProduct } from "@app/data";
import { useListing } from "@app/common";

type ProductTableProps = {
  products: Array<Product>;
  isLoading?: boolean;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, isLoading }) => {
  const { mutate: deleteProduct, isSuccess, isPending } = useDeleteProduct();

  const { displayItems: displayProducts, onSearchChange } = useListing(useMemo(() => products, [products]));

  const handleOnDeleteProduct = useCallback(
    (product: Product) => {
      deleteProduct(product._id);
    },
    [deleteProduct],
  );

  return (
    <>
      <CollapseMenu>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-5">
          <div className="w-full lg:w-auto relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <Search size={20} />
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-md w-full"
              placeholder="Tìm kiếm sản phẩm..."
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Link className="w-full lg:w-auto" href="/admin/products/create">
            <Button className="w-full rounded-lg p-2">Thêm sản phẩm</Button>
          </Link>
        </div>
      </CollapseMenu>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Màu sắc
              </th>
              <th scope="col" className="px-6 py-3">
                Giá bán
              </th>
              <th scope="col" className="px-6 py-3">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-5">
                  Đang tải...
                </td>
              </tr>
            ) : (
              displayProducts.map((product: Product, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {product._id}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <div className="relative w-24 h-32">
                      <Image
                        alt={`image-${product._id}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={product.images[0] as string}
                        className="rounded object-cover"
                      />
                    </div>
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {product.name}
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-center flex-wrap">
                      {product.options.splice(0, 6).map((option, index) => (
                        <p
                          key={index}
                          className={`p-3 rounded-full`}
                          style={{ background: (option as ProductOption).colorHexCode }}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.currentCost.saleCost?.toLocaleString()} đ</td>
                  <td className="px-6 py-4">
                    <Link className="col-span-full lg:col-span-1" href={`/admin/products/${product._id}`}>
                      <span className="cursor-pointer me-4 text-nowrap font-medium text-blue-600  hover:underline">
                        Cập nhật
                      </span>
                    </Link>

                    <ConfirmDialog
                      isAcceptLoading={isPending}
                      toggle={<span className="cursor-pointer font-medium text-red-600 hover:underline">Xóa</span>}
                      title="Xác nhận"
                      onAccept={() => handleOnDeleteProduct(product)}
                      message={`Bạn có chắc là muốn xóa sản phẩm ${product.name}`}
                      close={isSuccess}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default memo(ProductTable);
