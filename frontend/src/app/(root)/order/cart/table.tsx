"use client";

import { FC, memo, useMemo, useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash } from "lucide-react";
import { useCart } from "@app/common";
import { Button, QuantityControl } from "@app/components";
import { useCreateOrder } from "@app/data";
import { calcProductSaleCosts } from "@app/utils";
import { toast } from "react-hot-toast";

type CartTableProps = {};

const CartTable: FC<CartTableProps> = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { items, removeItem, updateQuantity, isLoading } = useCart();

  const summary: OrderCosts = useMemo(() => {
    return items.reduce<OrderCosts>(
      (prevValue, { product, quantity, _id }) => {
        if (!product || typeof product === "string") return prevValue;

        if (selectedItems.includes(_id)) {
          const saleCost: number = product.currentCost.saleCost || 0;
          const discountPercentage: number = product.currentCost.discountPercentage || 0;

          const totalCost: number = prevValue.totalCost + saleCost * quantity;
          const discountCost: number = prevValue.discountCost + (saleCost / 100) * discountPercentage * quantity;

          console.log(saleCost, discountPercentage, totalCost, discountCost);

          return {
            totalCost,
            discountCost,
            lastCost: totalCost - discountCost,
          };
        }

        return prevValue;
      },
      {
        totalCost: 0,
        discountCost: 0,
        lastCost: 0,
      },
    );
  }, [items, selectedItems]);

  const { readyItems, soldoutItems } = useMemo(() => {
    const readyItems: Array<CartItem> = [];
    const soldoutItems: Array<CartItem> = [];

    items.forEach((item) => {
      if (typeof item.option === "string") return;
      if (item.option.stock > item.quantity) {
        readyItems.push(item);
      } else {
        soldoutItems.push(item);
      }
    });

    return { readyItems, soldoutItems };
  }, [items]);

  const handleCreateOrder = () => {
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm");
      return;
    }

    createOrder(
      { items: selectedItems },
      {
        onSuccess: () => {
          setSelectedItems([]);
          toast.success("Đặt hàng thành công");
        },
      },
    );
  };

  const handleSelectItem = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedItems((prevState) => {
      if (event.target.checked) {
        return [...prevState, event.target.value];
      }
      return prevState.filter((item) => item !== event.target.value);
    });
  };

  const handleQuantityIncrease = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleQuantityDecrease = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Giỏ hàng trống</h2>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-10">
        Giỏ hàng của bạn <span className="text-red-500">{items.length} sản phẩm</span>
      </h1>

      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
        <div className="overflow-x-auto col-span-full lg:col-span-9">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-b">
              <tr>
                <th className="px-6 py-3 text-nowrap">Lựa chọn</th>
                <th scope="col" className="py-3 text-nowrap">
                  Tên sản phẩm
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Chiết khấu
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3 text-nowrap">
                  Tổng tiền
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {readyItems.map((item) => {
                const { product, option, quantity } = item;
                if (!product || typeof product === "string" || typeof option === "string") return null;

                const productCost = calcProductSaleCosts(product.currentCost);
                const maxQuantity = 99;

                return (
                  <tr key={`${item._id}:${option._id}`} className="bg-white border-b">
                    <td className="px-6 py-4 text-nowrap">
                      <input
                        className="scale-150 cursor-pointer"
                        type="checkbox"
                        onChange={handleSelectItem}
                        checked={selectedItems.includes(item._id)}
                        value={item._id}
                      />
                    </td>
                    <td className="py-4">
                      <Link href={`/product/${product._id}`} className="flex gap-3">
                        <Image
                          className="bg-gray-50 min-w-[100px]"
                          width={150}
                          height={150}
                          src={product.images[0] || ""}
                          alt={product.name}
                        />
                        <div className="min-w-[200px]">
                          <h3 className="text-lg font-medium text-black">{product.name}</h3>
                          <h4 className="mt-5">
                            Màu sắc: {option.colorName} Size: {option.size}
                          </h4>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <span className="text-black font-bold">{product.currentCost.discountPercentage}%</span>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <QuantityControl
                        quantity={quantity}
                        canIncrease={quantity < maxQuantity && !isLoading}
                        onIncrease={() => handleQuantityIncrease(item._id, quantity)}
                        onDecrease={() => handleQuantityDecrease(item._id, quantity)}
                      />
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <span className="text-black font-bold">
                        {productCost.saleCost} x {quantity}đ
                      </span>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <Button
                        type="button"
                        className="border-none p-3"
                        variant="secondary"
                        onClick={() => handleRemoveItem(item._id)}
                        isLoading={isLoading}
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                );
              })}

              {soldoutItems.map((item) => {
                const { product, option, quantity } = item;
                if (!product || typeof product === "string" || typeof option === "string") return null;

                const productCost = calcProductSaleCosts(product.currentCost);

                return (
                  <tr key={`${product._id}:${option._id}`} className="bg-white border-b no-interact opacity-60">
                    <td className="px-6 py-4 text-nowrap">
                      <input className="scale-150 cursor-pointer" type="checkbox" value={product._id} />
                    </td>
                    <td className="py-4">
                      <Link href={`/product/${product._id}`} className="flex gap-3">
                        <Image
                          className="bg-gray-50 min-w-[100px]"
                          width={150}
                          height={150}
                          src={product.images[0] || ""}
                          alt={product.name}
                        />
                        <div className="min-w-[200px]">
                          <h3 className="text-lg font-medium text-black">{product.name}</h3>
                          <h4 className="mt-5">
                            Màu sắc: {option.colorName} Size: {option.size}
                          </h4>
                          <h4 className="mt-5">Sản phẩm hiện đang hết hàng</h4>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <span className="text-black font-bold">{product.currentCost.discountPercentage}%</span>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <QuantityControl quantity={quantity} />
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <span className="text-black font-bold">
                        {productCost.saleCost} x {quantity}đ
                      </span>
                    </td>
                    <td className="px-6 py-4 text-nowrap">
                      <Button type="button" className="border-none p-3" variant="secondary" isLoading={isLoading}>
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <section className="lg:order-2 order-1 h-fit mb-10 border p-6 rounded-tl-3xl rounded-br-3xl lg:sticky top-[100px] col-span-full lg:col-span-3">
          <h3 className="text-xl font-semibold mb-10">Tóm tắt đơn hàng</h3>
          <div className="flex flex-col gap-y-5">
            <div className="flex">
              <h5 className="font-semibold text-gray-600">Tổng tiền hàng: </h5>
              <p className="ms-auto text-gray-600">{summary.totalCost.toLocaleString()}đ</p>
            </div>
            <div className="flex">
              <h5 className="font-semibold text-gray-600">Chiết khấu: </h5>
              <p className="ms-auto text-gray-600">{summary.discountCost.toLocaleString()}đ</p>
            </div>
            <div className="flex">
              <h5 className="font-semibold text-gray-600">Tạm tính: </h5>
              <p className="ms-auto text-gray-600">{summary.lastCost.toLocaleString()}đ</p>
            </div>
            <div className="flex">
              <h5 className="font-semibold text-gray-600">Tiền thanh toán: </h5>
              <p className="text-lg font-bold ms-auto text-gray-600">{summary.lastCost.toLocaleString()}đ</p>
            </div>
          </div>
          <hr className="w-full my-5" />
          <Button onClick={handleCreateOrder} isLoading={isPending} className="lg:mt-5 mt-3 w-full">
            Đặt hàng
          </Button>
        </section>
      </div>
    </>
  );
};

export default memo(CartTable);
