"use client";

import { Field, Form, Formik } from "formik";
import { FC, useCallback } from "react";

import { Button, Dropdown, GhnAddressWrapper, HttpErrorToast, InteractionWrapper } from "@app/components";
import { useSignUpAdmin } from "@app/data";
import { GENDER } from "@app/constants";
import { cn } from "@app/utils";

type SignUpAdminFormProps = {};

declare type SignUpAdminFormData = Omit<Partial<SignUpRequest>, "address"> & {
  confirmPassword: string;
  province?: GhnProvince;
  district?: GhnDistrict;
  ward?: GhnWard;
  addressDetail: string;
};

const initialFormValues: SignUpAdminFormData = {
  email: "",
  phone: "",
  birth: "",
  password: "",
  confirmPassword: "",
  addressDetail: "",
};

const SignUpAdminForm: FC<SignUpAdminFormProps> = ({}: SignUpAdminFormProps) => {
  const { mutate: signUpAdmin, error, isPending } = useSignUpAdmin();

  const onSignUpAdmin = useCallback(
    (values: SignUpAdminFormData) => {
      const { confirmPassword, province, district, ward, addressDetail, ...payload } = values;

      const address: string[] = [addressDetail, `${ward?.WardName}`, `${district?.DistrictName}`, `${ward?.WardName}`];
      const addressCode: string[] = [`${ward?.WardCode}`, `${district?.DistrictID}`, `${province?.ProvinceID}`];

      const signUpPayload: Partial<SignUpRequest> = {
        ...payload,
        address,
        addressCode,
      };

      signUpAdmin(signUpPayload);
    },
    [signUpAdmin],
  );

  return (
    <Formik initialValues={initialFormValues} onSubmit={onSignUpAdmin} validateOnChange={false} validateOnBlur={false}>
      {({ errors, setFieldValue }) => {
        return (
          <Form>
            <InteractionWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 p-5" disabled={isPending}>
              <section>
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
                        "shadow-sm border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                        errors.lastName && "border-red-400",
                      )}
                      placeholder="Họ.."
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-2">{errors.lastName}</p>}
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
                        "shadow-sm border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                        errors.firstName && "border-red-400",
                      )}
                      placeholder="Tên.."
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-2">{errors.firstName}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Email:
                    </label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className={cn(
                        "shadow-sm border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                        errors.email && "border-red-400",
                      )}
                      placeholder="name@gmail.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                      Số điện thoại:
                    </label>
                    <Field
                      type="phone"
                      id="phone"
                      name="phone"
                      className={cn(
                        "shadow-sm border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                        errors.phone && "border-red-400",
                      )}
                      placeholder="0xxxxxxxxx"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
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
                      className={cn(
                        "shadow-sm border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                        errors.birth && "border-red-400",
                      )}
                      placeholder="name@flowbite.com"
                    />
                    {errors.birth && <p className="text-red-400 text-sm mt-2">{errors.birth}</p>}
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
                      className={errors.gender && "border-red-400"}
                      values={Object.entries(GENDER).map(([_, value]) => value)}
                    />
                    {errors.gender && <p className="text-red-400 text-sm mt-2">{errors.gender}</p>}
                  </div>
                </div>

                <GhnAddressWrapper
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
                              className={errors.province && "border-red-400"}
                              placeholder="Chọn Tỉnh/Thành phố"
                              values={provinces}
                              itemMapper={(province: GhnProvince) => province.ProvinceName}
                              onSelect={onSelectProvince}
                            />
                            {errors.province && <p className="text-red-400 text-sm mt-2">{errors.province}</p>}
                          </InteractionWrapper>
                          <InteractionWrapper disabled={districts.length === 0 || isDistrictsLoading}>
                            <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900">
                              Quận/Huyện:
                            </label>
                            <Field
                              component={Dropdown}
                              id="district"
                              name="district"
                              className={errors.district && "border-red-400"}
                              placeholder="Chọn Quận/Huyện"
                              values={districts}
                              itemMapper={(district: GhnDistrict) => district.DistrictName}
                              onSelect={onSelectDistrict}
                            />
                            {errors.district && <p className="text-red-400 text-sm mt-2">{errors.district}</p>}
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
                            className={errors.ward && "border-red-400"}
                            placeholder="Chọn Phường/Xã"
                            values={wards}
                            itemMapper={(ward: GhnWard) => ward.WardName}
                            onSelect={onSelectWard}
                            // disabled={isWardsLoading}
                          />
                          {errors.ward && <p className="text-red-400 text-sm mt-2">{errors.ward}</p>}
                        </InteractionWrapper>
                      </>
                    );
                  }}
                </GhnAddressWrapper>

                <div>
                  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                    Địa chỉ
                  </label>
                  <Field
                    type="text"
                    component="textarea"
                    id="address"
                    name="addressDetail"
                    rows={4}
                    className={cn(
                      "block p-4 w-full text-sm text-gray-900 rounded-lg border focus:ring-blue-500 focus:border-blue-500",
                      errors.addressDetail && "border-red-400",
                    )}
                    placeholder="Địa chỉ cụ thể"
                  />
                  {errors.addressDetail && <p className="text-red-400 text-sm mt-2">{errors.addressDetail}</p>}
                </div>
              </section>

              <section>
                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Mật khẩu:
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={cn(
                      "shadow-sm border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                      errors.password && "border-red-400",
                    )}
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
                </div>
                <div className="mb-5">
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                    Xác nhận mật khẩu:
                  </label>
                  <Field
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    className={cn(
                      "shadow-sm border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4",
                      errors.confirmPassword && "border-red-400",
                    )}
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
                </div>

                <Button className="py-3 w-full" type="submit" isLoading={isPending}>
                  Thêm quản trị viên
                </Button>

                <HttpErrorToast error={error} />
              </section>
            </InteractionWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpAdminForm;
