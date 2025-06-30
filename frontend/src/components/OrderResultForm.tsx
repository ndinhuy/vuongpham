"use client";

import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useMemo } from "react";
import Image from "next/image";

import { useGetOrder } from "@app/data";
import { cn, mapOrderStatus } from "@app/utils";
import { Button } from "@app/components";
import Link from "next/link";
import SignedIn from "@app/components/SignedIn";
import { Loader2 } from "lucide-react";

type OrderResultFormProps = {
  orderId?: string;
};

const OrderResultForm: FC<OrderResultFormProps> = ({ orderId }) => {
  const { data: order, isPending } = useGetOrder(orderId);

  const itemCosts = useMemo(() => {
    const itemCosts: number[] = [];

    if (!order) return [];

    order.items.forEach((item) => {
      if (
        typeof item === "string" ||
        typeof item.product === "string" ||
        typeof item.option === "string" ||
        typeof item.cost === "string"
      ) {
        itemCosts.push(0);
        return;
      }

      const { saleCost, discountPercentage } = item.cost;

      const discountCost = ((saleCost || 0) / 100) * (discountPercentage || 1) * item.quantity;
      const finalCost = item.cost.saleCost - discountCost;

      itemCosts.push(finalCost);
    });

    return itemCosts;
  }, [order]);

  const isCash = order?.paymentMethod === "CASH";
  const isPaymentTransactionSuccess = order?.transaction?.status === "SUCCESS";

  return isPending ? (
    <div className="w-full flex flex-col justify-center items-center py-10">
      <Loader2 className="animate-spin mb-2" />
      <p>Đang tải thông tin đơn hàng</p>
    </div>
  ) : (
    order && (
      <section className="py-24 relative transition-all opacity-show">
        <div className="w-full lg-6 mx-auto">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={isPaymentTransactionSuccess ? faCircleCheck : faCircleXmark}
              bounce
              size="5x"
              className={cn("mb-5", isPaymentTransactionSuccess || isCash ? "text-green-500" : "text-red-500")}
            />
            <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
              {isCash
                ? "Tạo đơn hàng thành công"
                : isPaymentTransactionSuccess
                  ? "Thanh toán thành công"
                  : "Thanh toán thất bại"}
            </h2>
            <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
              {isPaymentTransactionSuccess || isCash
                ? "Cảm ơn vì đã tin tưởng mua sắm tại IVY fashion, bạn có thể xem lại chi tiết đơn hàng ở phần dưới đây:"
                : "Đã xảy ra lỗi trong quá trình thanh toán cho đơn hàng bên dưới, bạn có thể thử lại sau:"}
            </p>
          </div>
          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row gap-5 lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                <p className="font-semibold text-black">
                  Mã đơn hàng: <span className="ml-1 text-emerald-600 font-medium">#{order._id}</span>
                </p>
                <p className="font-semibold text-black mt-2">
                  Thời gian tạo:
                  <span className="ml-2 text-gray-400 font-medium">
                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                  </span>
                </p>
              </div>
              <SignedIn>
                <Link href="/customer/order-list">
                  <Button>Xem đơn hàng đã tạo</Button>
                </Link>
              </SignedIn>
            </div>
            <div className="w-full px-3 min-[400px]:px-6">
              <div className="my-5">
                <h2 className="text-lg font-semibold">Thông tin sản phẩm:</h2>
              </div>
              {order.items.map((item, index) => {
                if (
                  typeof item === "string" ||
                  typeof item.product === "string" ||
                  typeof item.option === "string" ||
                  typeof item.cost === "string"
                )
                  return <Fragment key={item.toString()} />;

                return (
                  <div
                    key={item._id}
                    className={cn(
                      "flex flex-col lg:flex-row items-center py-6 border-gray-200 gap-6 w-full",
                      index === order?.items.length - 1 ? "" : "border-b",
                    )}
                  >
                    <div className="img-box max-lg:w-full relative">
                      <Image
                        width={150}
                        height={100}
                        src={item.product.images[0]}
                        alt="Premium Watch image"
                        className="rounded-xl object-cover"
                      />
                    </div>
                    <div className="flex flex-row items-center w-full ">
                      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                        <div>
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3">{item.product.name}</h2>
                          <div className="flex items-center">
                            <p className="font-medium text-black pr-4 mr-4 border-r border-gray-200  text-sm">
                              Kích cỡ: <span className="text-gray-500">{item.option.size}</span>
                            </p>
                            <p className="font-medium text-black text-sm">
                              Số lượng: <span className="text-gray-500">{item.quantity}</span>
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm text-black">Trạng thái</p>
                              <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                {mapOrderStatus(order.status)}
                              </p>
                            </div>
                          </div>

                          <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm text-black">Giá</p>
                              <p className="lg:mt-4 font-bold text-sm text-gray-600">
                                {itemCosts[index]?.toLocaleString("vi-VN")} đ
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full space-y-2 border-t p-5">
              <div>
                <h2 className="text-lg font-semibold">Thông tin đơn hàng:</h2>
              </div>
              <div className="-my-3 mt-5">
                <dl className="flex items-center justify-between gap-4 py-2">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Người đặt hàng:</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">{order.name}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-2">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Email:</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">{order.email}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-2">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Số điện thoại:</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">{order.phone}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-2">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Địa chỉ nhận hàng:</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">{order.address}</dd>
                </dl>
              </div>
            </div>
            <div className="w-full space-y-2 border-t p-5">
              <div className="flow-root">
                <div>
                  <h2 className="text-lg font-semibold">Thông tin thanh toán:</h2>
                </div>
                <div className="-my-3 mt-5">
                  <dl className="flex items-center justify-between gap-4 py-2">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tạm tính:</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {order.totalCost.toLocaleString("vi-VN")}đ
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-2">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Chiết khấu:</dt>
                    <dd className="text-base font-medium text-green-500">
                      {order.discountCost.toLocaleString("vi-VN")}đ
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-2">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Phí vận chuyển:</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {order.shippingCost.toLocaleString("vi-VN")}đ
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-2">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng tiền</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {(order.totalCost + order.shippingCost).toLocaleString("vi-VN")}đ
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="w-full space-y-2 border-t p-5">
              <div className="flow-root">
                <div>
                  <h2 className="text-lg font-semibold">Thông tin thanh toán:</h2>
                </div>
                <div className="-my-3 mt-5">
                  <dl className="flex items-center justify-between gap-4 py-2">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Hình thức thanh toán:</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">{order.paymentMethod}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-2">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Trạng thái thanh toán:</dt>
                    <dd
                      className={cn(
                        "text-base font-medium",
                        isPaymentTransactionSuccess ? "text-green-500" : "text-orange-600",
                      )}
                    >
                      {isPaymentTransactionSuccess ? "Đã thanh toán" : "Chưa thanh toán"}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default OrderResultForm;
