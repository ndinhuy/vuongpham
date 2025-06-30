"use client";

import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import Input from "./Input";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { adminUserInfoSchema } from "@app/validations";

interface IAdminSettingsProps {}

const AdminSettingsContent: FC<IAdminSettingsProps> = (props) => {
  return (
    <Formik
      validationSchema={adminUserInfoSchema}
      initialValues={{
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors }) => {
        return (
          <Form>
            <h1 className="font-semibold text-xl mb-5">Thông tin chi tiết</h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="lg:col-span-1 col-span-full flex flex-col gap-y-1">
                <label htmlFor="name" className="font-semibold text-gray-600">
                  Họ và tên
                </label>
                <Field
                  id="name"
                  component={Input}
                  name="name"
                  placeholder="Nguyen Van A"
                  className={errors.name && "border-red-300"}
                />
                {errors.name && <p className="text-red-300 text-sm mt-2">{errors.name}</p>}
              </div>
              <div className="lg:col-span-1 col-span-full flex flex-col gap-y-1">
                <label htmlFor="email" className="font-semibold text-gray-600">
                  Địa chỉ email
                </label>
                <Field
                  id="email"
                  component={Input}
                  name="email"
                  className={errors.email && "border-red-300"}
                  type="email"
                  placeholder="nguyenvana@gmail.com"
                />
                {errors.email && <p className="text-red-300 text-sm mt-2">{errors.email}</p>}
              </div>
              <div className="lg:col-span-1 col-span-full flex flex-col gap-y-1">
                <label htmlFor="phone" className="font-semibold text-gray-600">
                  Số điện thoại
                </label>
                <Field
                  id="phone"
                  component={Input}
                  name="phone"
                  placeholder="0987654321"
                  className={errors.phone && "border-red-300"}
                />
                {errors.phone && <p className="text-red-300 text-sm mt-2">{errors.phone}</p>}
              </div>
              <div className="lg:col-span-1 col-span-full flex flex-col gap-y-1">
                <label htmlFor="address" className="font-semibold text-gray-600">
                  Địa chỉ
                </label>
                <Field
                  id="address"
                  component={Input}
                  name="address"
                  className={errors.address && "border-red-300"}
                  placeholder="Quận 7, TPHCM"
                />
                {errors.address && <p className="text-red-300 text-sm mt-2">{errors.address}</p>}
              </div>
              <div className="lg:col-span-1 col-span-full flex flex-col gap-y-1">
                <label htmlFor="gender" className="font-semibold text-gray-600">
                  Giới tính
                </label>
                <Field
                  id="gender"
                  component={Dropdown}
                  name="gender"
                  className={errors.gender && "border-red-300"}
                  data={[
                    { value: "male", children: "Nam" },
                    { value: "female", children: "Nữ" },
                    { value: "other", children: "Khác" },
                  ]}
                  placeholder="Chọn giới tính"
                />
                {errors.gender && <p className="text-red-300 text-sm mt-2">{errors.gender}</p>}
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <Button type="submit">Lưu thay đổi</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminSettingsContent;
