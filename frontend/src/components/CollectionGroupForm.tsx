"use client";

import { createGroupSchema, updateGroupSchema } from "@app/validations";
import { Field, Form, Formik, FormikErrors } from "formik";
import { X } from "lucide-react";
import { FC } from "react";

import { useCreateGroup, useQueryCategories, useQueryAllCollections, useUpdateGroup } from "@app/data";
import { Button, Dropdown } from "@app/components";
import { cn } from "@app/utils";

interface ICollectionGroupFormProps {
  className?: string;
  type?: "create" | "update";
  group?: Group;
}

const CollectionGroupForm: FC<ICollectionGroupFormProps> = ({ className, type = "create", group }) => {
  const { data: categories, isLoading: isCategoriesLoading } = useQueryCategories(type === "create");
  const { data: collections, isLoading: isCollectionsLoading } = useQueryAllCollections();
  const { mutate: create, isPending: isCreating } = useCreateGroup();
  const { mutate: update, isPending: isUpdating } = useUpdateGroup();

  const initialValues: Partial<Group> & { categoryId?: Category | string } = group
    ? {
        ...group,
        categoryId: group.category,
      }
    : {
        isSpecial: false,
      };

  const handleCreateGroup = (values: Partial<Group> & { categoryId?: string }) => {
    console.log(`Creating group... ${values._id}`);

    const createPayload: CollectionGroupPayload = {
      ...values,
      collections: values.collections?.map((collection) => (collection as Collection)._id),
      categoryId: values.categoryId!,
    };

    console.log(createPayload);

    create(createPayload);
  };

  const handleUpdateGroup = (values: Partial<Group> & { categoryId?: string }) => {
    console.log(`Updating group... ${values._id}`);

    const updatePayload: CollectionGroupPayload = {
      ...values,
      collections: values.collections?.map((collection) => (collection as Collection)._id),
      categoryId: values.categoryId!,
    };

    update(updatePayload);
  };

  const onSubmit = (values: Partial<Group> & { categoryId?: Category | string }) => {
    const { categoryId } = values;

    if (typeof categoryId !== "string") values = { ...values, categoryId: categoryId?._id };

    switch (type) {
      case "create":
        handleCreateGroup(values as Partial<Group> & { categoryId?: string });
        break;
      case "update":
        handleUpdateGroup(values as Partial<Group> & { categoryId?: string });
        break;
    }

    console.log(values);
  };

  const handleOnCollectionSelect = (
    collection: Collection,
    group: Partial<Group> & { categoryId?: Category | string },
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<
      Partial<Group> & {
        categoryId?: Category | string;
      }
    >>,
  ) => {
    if (group.collections && (group.collections as Collection[]).find((coll) => coll._id === collection._id)) return;

    setFieldValue("collections", group.collections ? [...group.collections, collection] : [collection]);
  };

  const handleRemoveCollection = (
    group: Partial<Group> & { categoryId?: Category | string },
    index: number,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<
      Partial<Group> & {
        categoryId?: Category | string;
      }
    >>,
  ) => {
    let updatedCollections = group.collections ? [...group.collections] : [];

    updatedCollections.splice(index, 1);

    setFieldValue("collections", updatedCollections);
  };

  return (
    <Formik
      validationSchema={type === "create" ? createGroupSchema : updateGroupSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ getFieldMeta, setFieldValue, submitCount, errors, values }) => (
        <Form>
          <section className={cn("w-full px-5 pt-5", className)}>
            <div>
              <h1 className="text-xl font-semibold">Thông tin nhóm</h1>
              <span className="text-sm text-gray-400">Thông tin nhóm bộ sưu tập sản phẩm</span>
            </div>
            <hr className="my-6" />
            <div className="flex flex-col gap-y-4">
              <div>
                <label htmlFor="group-name" className="block mb-2 text-sm font-medium text-gray-900">
                  Tên nhóm:
                </label>
                <Field
                  type="text"
                  id="group-name"
                  name="name"
                  className={cn(
                    "px-3 bg-gray-50 text-sm outline-none min-h-14 border rounded-md w-full",
                    (getFieldMeta("name").touched || submitCount > 0) && errors.name && "border-red-400",
                  )}
                  placeholder="Tên nhóm.."
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
              <div>
                {type === "create" && (
                  <>
                    <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900">
                      Danh mục:
                    </label>
                    <Field
                      id="categories"
                      values={categories}
                      itemMapper={(category: Category) => category.name}
                      component={Dropdown}
                      isLoading={isCategoriesLoading}
                      name="categoryId"
                      placeholder="Chọn danh mục.."
                      className={cn(
                        (getFieldMeta("categoryId").touched || submitCount > 0) &&
                          errors.categoryId &&
                          "border-red-400",
                        "bg-gray-50 mb-4",
                      )}
                    />
                  </>
                )}
                <label htmlFor="collections" className="block mb-2 text-sm font-medium text-gray-900">
                  Bộ sưu tập:
                </label>
                <Dropdown
                  values={collections}
                  itemMapper={(collection: Collection) => collection.name}
                  isLoading={isCollectionsLoading}
                  onSelect={(collection: Collection) => handleOnCollectionSelect(collection, values, setFieldValue)}
                  placeholder="Chọn bộ sưu tập.."
                  className={cn(
                    (getFieldMeta("collections").touched || submitCount > 0) && errors.collections && "border-red-400",
                    "bg-gray-50",
                  )}
                />
                {(getFieldMeta("collections").touched || submitCount > 0) && errors.collections && (
                  <p className="text-red-400 text-sm mt-2">{errors.collections}</p>
                )}
                {values.collections && (
                  <div className="mt-4">
                    <h1 className="text-sm font-medium text-gray-900">Bộ sưu tập đã chọn:</h1>
                    <div className="flex items-center gap-2 flex-wrap mt-2 px-2 py-3 rounded-md border shadow-sm">
                      {(values.collections as Collection[]).map((collection, index) => (
                        <div
                          key={index}
                          className="rounded-2xl font-semibold px-3 py-1 bg-gray-200 text-sm text-gray-700 flex items-center gap-x-2"
                        >
                          <span>{collection.name}</span>
                          <span
                            onClick={() => handleRemoveCollection(values, index, setFieldValue)}
                            className="cursor-pointer p-1 bg-white hover:opacity-85 opacity-100 transition-all rounded-full flex items-center justify-center"
                          >
                            <X size={16} className="font-bold" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div className="mt-5 sticky left-0 bottom-0 py-5 px-3 bg-white flex gap-x-4 w-full justify-end">
            <Button type="button" variant="secondary">
              Hủy
            </Button>
            <Button isLoading={type === "create" ? isCreating : isUpdating} type="submit">
              {type === "create" ? "Thêm" : "Lưu"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CollectionGroupForm;
