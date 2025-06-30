"use client";

import { Button, ConfirmDialog, Dropdown, GhnAddressWrapper, InteractionWrapper } from "@app/components";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Field, Form, Formik } from "formik";

import { useLockAccount, useUpdateUser } from "@app/data";
import { customerInfoSchema } from "@app/validations";
import { GENDER } from "@app/constants";
import { cn } from "@app/utils";

type CustomerInfoFormProps = {
  user: User;
};

type CustomerInfoFormData = Omit<UpdateUserRequest, "address"> & {
  province?: GhnProvince;
  district?: GhnDistrict;
  ward?: GhnWard;
  addressDetail: string;
};

const CustomerInfoForm: FC<CustomerInfoFormProps> = ({ user }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateUser();
  const { mutate: lockAccount } = useLockAccount();

  const initialFormValues: CustomerInfoFormData = useMemo(() => {
    if (!user)
      return {
        addressDetail: "",
      };

    const [addressDetail] = user.address;

    return {
      ...user,
      addressDetail: addressDetail || "",
    };
  }, [user]);

  const initialAddressValues = useMemo(() => {
    if (!user) return;

    const [wardId, districtId, provinceId] = user?.addressCode;

    return {
      wardId,
      districtId,
      provinceId,
    };
  }, [user]);

  const onUpdateUserInfo = useCallback(
    (values: CustomerInfoFormData) => {
      const { province, district, ward, addressDetail, ...payload } = values;
      const [userAddressDetail, userWard, userDistrict, userProvince] = user.address;
      const [userWardId, userDistrictId, userProvinceId] = user.addressCode;

      const address: string[] = [
        addressDetail || userAddressDetail,
        `${ward?.WardName || userWard}`,
        `${district?.DistrictName || userDistrict}`,
        `${province?.ProvinceName || userProvince}`,
      ];
      const addressCode: string[] = [
        `${ward?.WardCode || userWardId}`,
        `${district?.DistrictID || userDistrictId}`,
        `${province?.ProvinceID || userProvinceId}`,
      ];

      const updatePayload: Partial<UpdateUserRequest> = {
        ...payload,
        address,
        addressCode,
      };

      mutate(updatePayload);
    },
    [mutate, user],
  );

  return (
    <Formik
      validationSchema={customerInfoSchema}
      initialValues={initialFormValues}
      onSubmit={onUpdateUserInfo}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ getFieldMeta, setFieldValue, errors, values }) => {
        return (
          <Form className="opacity-show">
            <InteractionWrapper disabled={isPending || !editable}>
              <section className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900">
                      Họ:
                    </label>
                    <Field
                      type="text"
                      id="last-name"
                      name="lastName"
                      className={cn(
                        "px-3 outline-none min-h-14 border text-sm rounded-md w-full",
                        getFieldMeta("lastName").touched && errors.lastName && "border-red-400",
                      )}
                      placeholder="Họ.."
                    />
                    {getFieldMeta("lastName").touched && errors.lastName && (
                      <p className="text-red-400 text-sm mt-2">{(errors as any).lastName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900">
                      Tên:
                    </label>
                    <Field
                      type="text"
                      id="first-name"
                      name="firstName"
                      className={cn(
                        "px-3 outline-none min-h-14 border text-sm rounded-md w-full",
                        getFieldMeta("firstName").touched && errors.firstName && "border-red-400",
                      )}
                      placeholder="Tên.."
                    />
                    {getFieldMeta("firstName").touched && errors.firstName && (
                      <p className="text-red-400 text-sm mt-2">{(errors as any).firstName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      onChange={undefined}
                      disabled
                      className={cn(
                        "px-3 outline-none min-h-14 border text-sm rounded-md w-full",
                        getFieldMeta("email").touched && errors.email && "border-red-400",
                      )}
                      placeholder="name@gmail.com"
                    />
                    {getFieldMeta("email").touched && errors.email && (
                      <p className="text-red-400 text-sm mt-2">{(errors as any).email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                      Số điện thoại:
                    </label>
                    <Field
                      type="phone"
                      id="phone"
                      name="phone"
                      onChange={undefined}
                      disabled
                      className={cn(
                        "px-3 outline-none min-h-14 border text-sm rounded-md w-full",
                        getFieldMeta("phone").touched && errors.phone && "border-red-400",
                      )}
                      placeholder="0xxxxxxxxx"
                    />
                    {getFieldMeta("phone").touched && errors.phone && (
                      <p className="text-red-400 text-sm mt-2">{(errors as any).phone}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900">
                      Ngày sinh:
                    </label>
                    <Field
                      type="date"
                      id="birth"
                      name="birth"
                      value={values.birth ? new Date(values.birth).toISOString().split("T")[0] : ""}
                      className={cn(
                        "px-3 outline-none min-h-14 border rounded-md text-sm w-full",
                        getFieldMeta("birth").touched && errors.birth && "border-red-400",
                      )}
                    />
                    {getFieldMeta("birth").touched && errors.birth && (
                      <p className="text-red-400 text-sm mt-2">{(errors as any).birth}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                      Giới tính:
                    </label>
                    <Field
                      component={Dropdown}
                      id="gender"
                      name="gender"
                      placeholder="Chọn giới tính"
                      values={Object.entries(GENDER).map(([_, value]) => value)}
                      className={cn(getFieldMeta("gender").touched && errors.gender && "border-red-400")}
                    />
                    {getFieldMeta("gender").touched && errors.gender && (
                      <p className="text-red-400 text-sm mt-2">{(errors as any).gender}</p>
                    )}
                  </div>
                </div>
                <GhnAddressWrapper
                  initialSelectedValues={initialAddressValues}
                  onSelectedProvinceChange={(province) => setFieldValue("province", province)}
                  onSelectedDistrictChange={(district) => setFieldValue("district", district)}
                  onSelectedWardChange={(ward) => setFieldValue("ward", ward)}
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                          <InteractionWrapper disabled={provinces.length === 0 || isProvincesLoading}>
                            <label htmlFor="province" className="block mb-2 text-sm font-medium text-gray-900">
                              Tỉnh/Thành phố:
                            </label>
                            <Field
                              component={Dropdown}
                              id="province"
                              name="province"
                              className={getFieldMeta("province").touched && errors.province && "border-red-400"}
                              placeholder="Chọn Tỉnh/Thành phố"
                              values={provinces}
                              defaultSelected={selectedProvince}
                              itemMapper={(province: GhnProvince) => province.ProvinceName}
                              onSelect={onSelectProvince}
                            />
                            {getFieldMeta("province").touched && errors.province && (
                              <p className="text-red-400 text-sm mt-2">{errors.province}</p>
                            )}
                          </InteractionWrapper>
                          <InteractionWrapper disabled={districts.length === 0 || isDistrictsLoading}>
                            <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900">
                              Quận/Huyện:
                            </label>
                            <Field
                              component={Dropdown}
                              id="district"
                              name="district"
                              className={getFieldMeta("district").touched && errors.district && "border-red-400"}
                              placeholder="Chọn Quận/Huyện"
                              values={districts}
                              defaultSelected={selectedDistrict}
                              itemMapper={(district: GhnDistrict) => district.DistrictName}
                              onSelect={onSelectDistrict}
                            />
                            {getFieldMeta("district").touched && errors.district && (
                              <p className="text-red-400 text-sm mt-2">{errors.district}</p>
                            )}
                          </InteractionWrapper>
                        </div>
                        <InteractionWrapper className="mb-5" disabled={wards.length === 0 || isWardsLoading}>
                          <label htmlFor="ward" className="block mb-2 text-sm font-medium text-gray-900">
                            Phường/Xã:
                          </label>
                          <Field
                            component={Dropdown}
                            id="ward"
                            name="ward"
                            className={getFieldMeta("ward").touched && errors.ward && "border-red-400"}
                            placeholder="Chọn Phường/Xã"
                            values={wards}
                            defaultSelected={selectedWard}
                            itemMapper={(ward: GhnWard) => ward.WardName}
                            onSelect={onSelectWard}
                          />
                          {getFieldMeta("ward").touched && errors.ward && (
                            <p className="text-red-400 text-sm mt-2">{errors.ward}</p>
                          )}
                        </InteractionWrapper>
                      </>
                    );
                  }}
                </GhnAddressWrapper>

                <div>
                  <label htmlFor="address-detail" className="block mb-2 text-sm font-medium text-gray-900">
                    Địa chỉ
                  </label>
                  <Field
                    component="textarea"
                    id="address-detail"
                    name="addressDetail"
                    rows={4}
                    className={cn(
                      "block py-4 px-3 text-sm outline-none min-h-14 border rounded-md w-full",
                      getFieldMeta("addressDetail").touched && errors.addressDetail && "border-red-400",
                    )}
                    placeholder="Địa chỉ cụ thể"
                  />
                  {getFieldMeta("addressDetail").touched && errors.addressDetail && (
                    <p className="text-red-400 text-sm mt-2">{(errors as any).addressDetail}</p>
                  )}
                </div>
              </section>
            </InteractionWrapper>
            <section className="mt-5 flex gap-x-4 w-full justify-end opacity-show">
              <ConfirmDialog
                onAccept={() => lockAccount({ page: -1 })}
                toggle={
                  <Button type="button" variant="secondary" className="text-red-600">
                    Khoá tài khoản
                  </Button>
                }
                title={"Khoá tài khoản"}
                message={"Bạn có chắc chắn muốn khoá tài khoản IVY?"}
              />
              {editable ? (
                <>
                  <Button onClick={() => setEditable(false)} type="button" variant="secondary">
                    Hủy
                  </Button>
                  <Button type="submit">Lưu thay đổi</Button>
                </>
              ) : (
                <Button onClick={() => setEditable(true)} type="button">
                  Chỉnh sửa
                </Button>
              )}
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomerInfoForm;
