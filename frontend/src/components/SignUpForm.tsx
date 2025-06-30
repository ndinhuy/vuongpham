"use client";

import { Field, Form, Formik } from "formik";
import Turnstile from "react-turnstile";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

import { Button, Dropdown, GhnAddressWrapper, HttpErrorToast, InteractionWrapper } from "@app/components";
import { CLOUDFLARE_SITE_KEY, GENDER } from "@app/constants";
import { signUpSchema } from "@app/validations";
import { useSignUp } from "@app/data";
import { cn } from "@app/utils";

type SignUpFormProps = {};

declare type SignUpFormData = Omit<Partial<SignUpRequest>, "address"> & {
  isHuman: boolean;
  confirmPassword: string;
  acceptTermAndPolicy: boolean;
  province?: GhnProvince;
  district?: GhnDistrict;
  ward?: GhnWard;
  addressDetail: string;
};

const initialFormValues: SignUpFormData = {
  email: "",
  phone: "",
  birth: "",
  province: undefined,
  ward: undefined,
  district: undefined,
  password: "",
  isHuman: false,
  confirmPassword: "",
  acceptTermAndPolicy: false,
  addressDetail: "",
  gender: undefined,
};

const SignUpForm: FC<SignUpFormProps> = ({}: SignUpFormProps) => {
  const { mutate, error, isPending } = useSignUp();

  const onSignUp = useCallback(
    (values: SignUpFormData) => {
      const { isHuman, confirmPassword, acceptTermAndPolicy, province, district, ward, addressDetail, ...payload } =
        values;

      if (!isHuman) {
        toast.error("Không thể xác minh bạn là con người. Vui lòng thử lại sau");
        return;
      }

      const address: string[] = [addressDetail, `${ward?.WardName}`, `${district?.DistrictName}`, `${ward?.WardName}`];
      const addressCode: string[] = [`${ward?.WardCode}`, `${district?.DistrictID}`, `${province?.ProvinceID}`];

      const signUpPayload: Partial<SignUpRequest> = {
        ...payload,
        address,
        addressCode,
      };

      mutate(signUpPayload);
    },
    [mutate],
  );

  return (
    <Formik
      validationSchema={signUpSchema}
      initialValues={initialFormValues}
      onSubmit={onSignUp}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldValue }) => {
        return (
          <Form>
            <InteractionWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10" disabled={isPending}>
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
                <div className="mb-5">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Field
                        id="terms"
                        type="checkbox"
                        name="acceptTermAndPolicy"
                        className={cn(
                          "w-4 h-4 border rounded focus:ring-3 focus:ring-blue-300",
                          errors.acceptTermAndPolicy && "border-red-400",
                        )}
                      />
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 flex gap-1">
                      Tôi đồng ý với
                      <Link href="#" className="text-blue-600 hover:underline">
                        điểu khoản và quy định
                      </Link>
                      của Ivy
                    </label>
                  </div>
                  {errors.acceptTermAndPolicy && (
                    <p className="text-red-400 text-sm mt-1">{errors.acceptTermAndPolicy}</p>
                  )}
                </div>

                <div className="mb-5">
                  <Turnstile sitekey={CLOUDFLARE_SITE_KEY} onVerify={() => setFieldValue("isHuman", true)} />
                </div>

                <Button className="py-3 w-full" type="submit" isLoading={isPending}>
                  Đăng ký
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

export default SignUpForm;
