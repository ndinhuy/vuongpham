"use client";

import { Field, Form, Formik } from "formik";
import React, { FC, useMemo } from "react";
import { Button, CheckoutAuthTrigger, Dropdown, GhnAddressWrapper, Input, InteractionWrapper } from "@app/components";
import { cn } from "@app/utils";
import { useAuth } from "@app/common";
import { useGetOrder, useProcessOrder } from "@app/data";

type CheckoutFormType = {
  name: string;
  email: string;
  phone: string;
  province?: GhnProvince;
  district?: GhnDistrict;
  ward?: GhnWard;
  addressDetail: string;
  paymentMethod: PaymentMethod;
  deliveryMethod: "GHN";
};

type ICheckoutFormProps = {
  id: string;
};

const CheckoutForm: FC<ICheckoutFormProps> = ({ id }) => {
  const { user, ready } = useAuth();
  const { data: order, isPending } = useGetOrder(id);
  const { mutate: processOrder, isPending: isProcessing } = useProcessOrder(id);

  const orderCosts = useMemo(() => {
    return order?.items.reduce<OrderCosts>(
      (prevValue, item) => {
        if (typeof item === "string" || typeof item.cost === "string") return prevValue;
        const { quantity, cost } = item;

        const totalCost: number = prevValue.totalCost + cost.saleCost * quantity;
        const discountCost: number =
          prevValue.discountCost + (cost.saleCost / 100) * cost.discountPercentage * quantity;

        return {
          totalCost,
          discountCost,
          lastCost: totalCost - discountCost,
        };
      },
      {
        totalCost: 0,
        discountCost: 0,
        lastCost: 0,
      },
    );
  }, [order]);

  const initialAddressValues = useMemo(() => {
    if (!user) return;

    const [wardId, districtId, provinceId] = user?.addressCode;

    return {
      wardId,
      districtId,
      provinceId,
    };
  }, [user]);

  const initialCheckoutFormValues: CheckoutFormType = {
    name: user ? `${user.lastName} ${user.firstName}` : "",
    email: user?.email || "",
    phone: user?.phone || "",
    addressDetail: user?.address[0] || "",
    paymentMethod: "VNPAY",
    deliveryMethod: "GHN",
  };

  const onProcessOrder = (values: CheckoutFormType) => {
    console.log(values);

    const { province, district, ward, addressDetail, ...payload } = values;

    const address: string[] = [addressDetail, `${ward?.WardName}`, `${district?.DistrictName}`, `${ward?.WardName}`];
    const addressCode: string[] = [`${ward?.WardCode}`, `${district?.DistrictID}`, `${province?.ProvinceID}`];

    processOrder({
      ...payload,
      address: address.join(", "),
      addressCode,
    });
  };

  return (
    <InteractionWrapper disabled={!ready || isPending || isProcessing}>
      <Formik initialValues={initialCheckoutFormValues} onSubmit={onProcessOrder}>
        {({ setFieldValue, getFieldMeta, errors }) => {
          return (
            <Form>
              <div className="grid grid-cols-12 gap-x-8 mt-10">
                <section className="lg:order-1 col-span-full lg:col-span-8 mb-10">
                  <h1 className="text-3xl font-semibold mb-10">Thông tin đơn hàng</h1>
                  <CheckoutAuthTrigger />

                  <div className="flex flex-col gap-y-3 mt-10">
                    <h3 className="text-xl font-semibold">Địa chỉ</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="lg:col-span-1 col-span-full">
                        <Field
                          className={cn("w-full", getFieldMeta("name").touched && errors.name && "border-red-400")}
                          placeholder="Họ tên"
                          name="name"
                          component={Input}
                        />
                        {getFieldMeta("name").touched && errors.name && (
                          <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                        )}
                      </div>
                      <div className="lg:col-span-1 col-span-full">
                        <Field
                          name="phone"
                          className={cn("w-full", getFieldMeta("phone").touched && errors.phone && "border-red-400")}
                          placeholder="Số điện thoại"
                          component={Input}
                        />
                        {getFieldMeta("phone").touched && errors.phone && (
                          <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
                        )}
                      </div>
                      <div className="col-span-full">
                        <Field
                          className={cn("w-full", getFieldMeta("email").touched && errors.email && "border-red-400")}
                          placeholder="Email"
                          name="email"
                          component={Input}
                        />
                        {getFieldMeta("email").touched && errors.email && (
                          <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                        )}
                      </div>
                      <GhnAddressWrapper
                        onSelectedProvinceChange={(province) => setFieldValue("province", province)}
                        onSelectedDistrictChange={(district) => setFieldValue("district", district)}
                        onSelectedWardChange={(ward) => setFieldValue("ward", ward)}
                        initialSelectedValues={initialAddressValues}
                      >
                        {({
                          provinces,
                          districts,
                          wards,
                          isProvincesLoading,
                          isDistrictsLoading,
                          isWardsLoading,
                          onSelectProvince,
                          onSelectDistrict,
                          onSelectWard,
                          selectedProvince,
                          selectedDistrict,
                          selectedWard,
                        }) => {
                          return (
                            <>
                              <div className="lg:col-span-1 col-span-full">
                                <InteractionWrapper disabled={provinces.length === 0 || isProvincesLoading}>
                                  <Field
                                    component={Dropdown}
                                    id="province"
                                    name="province"
                                    className={getFieldMeta("province").touched && errors.province && "border-red-400"}
                                    placeholder="Chọn Tỉnh/Thành phố"
                                    values={provinces}
                                    itemMapper={(province: GhnProvince) => province.ProvinceName}
                                    defaultSelected={selectedProvince}
                                    onSelect={onSelectProvince}
                                  />
                                  {getFieldMeta("province").touched && errors.province && (
                                    <p className="text-red-400 text-sm mt-2">{errors.province}</p>
                                  )}
                                </InteractionWrapper>
                              </div>
                              <div className="lg:col-span-1 col-span-full">
                                <InteractionWrapper disabled={districts.length === 0 || isDistrictsLoading}>
                                  <Field
                                    component={Dropdown}
                                    id="district"
                                    name="district"
                                    className={getFieldMeta("district").touched && errors.district && "border-red-400"}
                                    placeholder="Chọn Quận/Huyện"
                                    values={districts}
                                    itemMapper={(district: GhnDistrict) => district.DistrictName}
                                    defaultSelected={selectedDistrict}
                                    onSelect={onSelectDistrict}
                                  />
                                  {getFieldMeta("district").touched && errors.district && (
                                    <p className="text-red-400 text-sm mt-2">{errors.district}</p>
                                  )}
                                </InteractionWrapper>
                              </div>
                              <div className="col-span-full">
                                <InteractionWrapper disabled={wards.length === 0 || isWardsLoading}>
                                  <Field
                                    component={Dropdown}
                                    id="ward"
                                    name="ward"
                                    className={getFieldMeta("ward").touched && errors.ward && "border-red-400"}
                                    placeholder="Chọn Phường/Xã"
                                    values={wards}
                                    itemMapper={(ward: GhnWard) => ward.WardName}
                                    defaultSelected={selectedWard}
                                    onSelect={onSelectWard}
                                  />
                                  {getFieldMeta("ward").touched && errors.ward && (
                                    <p className="text-red-400 text-sm mt-2">{errors.ward}</p>
                                  )}
                                </InteractionWrapper>
                              </div>
                            </>
                          );
                        }}
                      </GhnAddressWrapper>
                      <div className="col-span-full">
                        <Field
                          name="addressDetail"
                          component={Input}
                          className={cn(
                            "w-full",
                            getFieldMeta("addressDetail").touched && errors.addressDetail && "border-red-400",
                          )}
                          placeholder="Địa chỉ"
                        />
                        {getFieldMeta("addressDetail").touched && errors.addressDetail && (
                          <p className="text-red-400 text-sm mt-2">{errors.addressDetail}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-3 mt-10">
                    <h3 className="text-xl font-semibold">Phương thức thanh toán</h3>
                    <div>
                      <div
                        className={cn(
                          "border p-6 rounded-tl-3xl rounded-br-3xl",
                          getFieldMeta("paymentMethod").touched && errors.paymentMethod && "border-red-400",
                        )}
                      >
                        <p className="text-gray-600">
                          Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giờ lưu lại.
                        </p>
                        <div className="mt-5 flex flex-col items-start">
                          <div className="flex gap-x-3 items-center">
                            <Field className="w-5 h-5" id="cash" value="CASH" name="paymentMethod" type="radio" />
                            <label className="py-1.5 hover:cursor-pointer" htmlFor="cash">
                              Thanh toán bằng tiền mặt
                            </label>
                          </div>
                          <div className="flex gap-x-3 items-center">
                            <Field className="w-5 h-5" id="vnpay" value="VNPAY" name="paymentMethod" type="radio" />
                            <label className="py-1.5 hover:cursor-pointer" htmlFor="vnpay">
                              Thanh toán chuyển khoản qua vnpay
                            </label>
                          </div>
                        </div>
                      </div>
                      {getFieldMeta("paymentMethod").touched && errors.paymentMethod && (
                        <p className="text-red-400 text-sm mt-2">{errors.paymentMethod}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3 mt-10">
                    <h3 className="text-xl font-semibold">Phương thức giao hàng</h3>
                    <div>
                      <div
                        className={cn(
                          "border p-6 rounded-tl-3xl rounded-br-3xl",
                          getFieldMeta("deliveryMethod").touched && errors.deliveryMethod && "border-red-400",
                        )}
                      >
                        <div className="flex flex-col items-start">
                          <div className="flex gap-x-3 items-center">
                            <Field className="w-5 h-5" id="delivery" value="GHN" name="deliveryMethod" type="radio" />
                            <label className="py-1.5 hover:cursor-pointer" htmlFor="delivery">
                              Chuyển phát nhanh
                            </label>
                          </div>
                        </div>
                      </div>
                      {getFieldMeta("deliveryMethod").touched && errors.deliveryMethod && (
                        <p className="text-red-400 text-sm mt-2">{errors.deliveryMethod}</p>
                      )}
                    </div>
                  </div>
                </section>
                <section className="lg:order-2 col-span-full lg:col-span-4 h-fit bg-gray-50 p-6 rounded-tl-3xl rounded-br-3xl lg:sticky top-32">
                  <h3 className="text-xl font-semibold mb-10">Tóm tắt đơn hàng</h3>
                  <div className="flex flex-col gap-y-5">
                    <div className="flex">
                      <h5 className="font-semibold text-gray-600">Tổng tiền hàng: </h5>
                      <p className="ms-auto text-gray-600">{orderCosts?.totalCost.toLocaleString()}đ</p>
                    </div>
                    <div className="flex">
                      <h5 className="font-semibold text-gray-600">Tạm tính: </h5>
                      <p className="ms-auto text-gray-600">{orderCosts?.lastCost.toLocaleString()}đ</p>
                    </div>
                    <div className="flex">
                      <h5 className="font-semibold text-gray-600">Phí vận chuyển: </h5>
                      <p className="ms-auto text-gray-600">{order?.shippingCost.toLocaleString()}đ</p>
                    </div>
                    <div className="flex">
                      <h5 className="font-semibold text-gray-600">Tiền thanh toán: </h5>
                      <p className="text-lg font-bold ms-auto text-gray-600">
                        {orderCosts?.lastCost.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                  <Button isLoading={isProcessing} type="submit" className="lg:mt-5 mt-3 w-full">
                    Hoàn thành
                  </Button>
                </section>
              </div>
            </Form>
          );
        }}
      </Formik>
    </InteractionWrapper>
  );
};

export default CheckoutForm;
