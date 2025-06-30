"use client";

import { Button } from "@app/components";
import { useCreateCategory, useUpdateCategory } from "@app/data";
import { cn } from "@app/utils";
import { categorySchema } from "@app/validations";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { FC } from "react";

interface ICategoryFormProps {
  className?: string;
  type?: "create" | "update";
  category?: Category;
}

const CategoryForm: FC<ICategoryFormProps> = ({ className, type = "create", category }) => {
  const { mutate: create, isPending: isCreating } = useCreateCategory();
  const { mutate: update, isPending: isUpdating } = useUpdateCategory();

  const initialValues: Category = category || {
    isSpecial: false,
    _id: "",
    collectionGroups: [],
    name: "",
  };

  const hanldeCreateCategory = (values: Category) => {
    console.log(`Creating category...`);

    const { collectionGroups, _id, ...restCategory } = values;

    const createPayloadData: CreateCategoryPayload = {
      ...restCategory,
      collectionGroups: collectionGroups as string[],
    };

    create(createPayloadData);
  };

  const hanldeUpdateCategory = (values: Category) => {
    console.log(`Updating category... ${values._id}`);

    const { collectionGroups, _id, ...restCategory } = values;

    const updatePayloadData: UpdateCategoryPayload = {
      ...restCategory,
    };

    update({ id: values._id, payload: updatePayloadData });
  };

  const onSubmit = (values: Category, helpers: FormikHelpers<Category>) => {
    switch (type) {
      case "create":
        hanldeCreateCategory(values);
        helpers.resetForm();
        break;
      case "update":
        hanldeUpdateCategory(values);
        break;
    }
  };

  return (
    <Formik validationSchema={categorySchema} onSubmit={onSubmit} initialValues={initialValues}>
      {({ submitCount, errors, getFieldMeta }) => (
        <Form>
          <section className={cn("w-full px-5 pt-5", className)}>
            <div>
              <h1 className="text-xl font-semibold">Thông tin danh mục</h1>
              <span className="text-sm text-gray-400">Thông tin danh mục sản phẩm</span>
            </div>
            <hr className="my-6" />
            <div className="flex flex-col gap-y-4">
              <div>
                <label htmlFor="category-name" className="block mb-2 text-sm font-medium text-gray-900">
                  Tên danh mục:
                </label>
                <Field
                  type="text"
                  id="category-name"
                  name="name"
                  className={cn(
                    "px-3 bg-gray-50 text-sm outline-none min-h-14 border rounded-md w-full",
                    (getFieldMeta("name").touched || submitCount > 0) && errors.name && "border-red-400",
                  )}
                  placeholder="Tên danh mục.."
                />
                {(getFieldMeta("name").touched || submitCount > 0) && errors.name && (
                  <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                )}
              </div>
              <div className="flex items-center mb-4">
                <Field
                  id="is-special"
                  type="checkbox"
                  name="isSpecial"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="is-special"
                  className="ms-2 text-sm font-medium select-none cursor-pointer text-gray-900"
                >
                  Đặc biệt
                </label>
              </div>
            </div>
          </section>
          <div className="mt-5 sticky left-0 bottom-0 py-5 px-3 bg-white flex gap-x-4 w-full justify-end">
            <Button type="button" variant="secondary">
              Hủy
            </Button>
            <Button type="submit" isLoading={type === "create" ? isCreating : isUpdating}>
              {type === "create" ? "Thêm" : "Lưu"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
