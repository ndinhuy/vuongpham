"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { FC } from "react";

import { useCreateCollection, useQueryGroups, useUpdateCollection } from "@app/data";
import { createCollectionSchema, updateCollectionSchema } from "@app/validations";
import { Button, Dropdown } from "@app/components";
import { cn } from "@app/utils";

interface ICollectionFormProps {
  className?: string;
  type?: "create" | "update";
  collection?: Collection;
}

const CollectionForm: FC<ICollectionFormProps> = ({ className, type = "create", collection }) => {
  const { mutate: create, isPending: isCreating } = useCreateCollection();
  const { mutate: update, isPending: isUpdating } = useUpdateCollection();
  const { data: groupData } = useQueryGroups();

  const initialValues: Partial<Collection> & { groupId?: Group | string } = collection || {};

  const hanldeCreateCollection = (values: Partial<Collection> & { groupId?: Group | string }) => {
    console.log(`Creating collection... ${values._id}`);

    const createPayloadData: CreateCollectionPayload = {
      groupId: values.groupId as string,
      name: values.name!,
    };

    create(createPayloadData);
  };

  const hanldeUpdateCollection = (values: Partial<Collection>) => {
    const updatePayloadData: UpdateCollectionPayload = {
      name: values.name!,
    };

    update({ id: values._id!, payload: updatePayloadData });
  };

  const onSubmit = (
    values: Partial<Collection> & { groupId?: Group | string },
    helper: FormikHelpers<Partial<Collection> & { groupId?: Group | string }>,
  ) => {
    const { groupId } = values;

    if (typeof groupId !== "string") values = { ...values, groupId: groupId?._id };

    switch (type) {
      case "create":
        hanldeCreateCollection(values);
        helper.resetForm();
        break;
      case "update":
        hanldeUpdateCollection(values);
        break;
    }
  };

  return (
    <Formik
      validationSchema={type === "create" ? createCollectionSchema : updateCollectionSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ getFieldMeta, submitCount, errors }) => (
        <Form>
          <section className={cn("w-full px-5 pt-5", className)}>
            <div>
              <h1 className="text-xl font-semibold">Thông tin bộ sưu tập</h1>
              <span className="text-sm text-gray-400">Thông tin bộ sưu tập sản phẩm</span>
            </div>
            <hr className="my-6" />
            <div className="flex flex-col gap-y-4">
              <div>
                <label htmlFor="collection-name" className="block mb-2 text-sm font-medium text-gray-900">
                  Tên bộ sưu tập:
                </label>
                <Field
                  type="text"
                  id="collection-name"
                  name="name"
                  className={cn(
                    "px-3 bg-gray-50 text-sm outline-none min-h-14 border rounded-md w-full",
                    (getFieldMeta("groupId").touched || submitCount > 0) && errors.name && "border-red-400",
                  )}
                  placeholder="Tên bộ sưu tập.."
                />
                {(getFieldMeta("name").touched || submitCount > 0) && errors.name && (
                  <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                )}
              </div>
              {type === "create" && (
                <div>
                  <label htmlFor="group" className="block mb-2 text-sm font-medium text-gray-900">
                    Nhóm:
                  </label>
                  <Field
                    id="group"
                    values={groupData}
                    itemMapper={(group: Group) => group.name}
                    component={Dropdown}
                    name="groupId"
                    placeholder="Chọn nhóm.."
                    className={cn(
                      (getFieldMeta("groupId").touched || submitCount > 0) && errors.groupId && "border-red-400",
                      "bg-gray-50",
                    )}
                  />
                  {(getFieldMeta("groupId").touched || submitCount > 0) && errors.groupId && (
                    <p className="text-red-400 text-sm mt-2">{errors.groupId}</p>
                  )}
                </div>
              )}
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

export default CollectionForm;
