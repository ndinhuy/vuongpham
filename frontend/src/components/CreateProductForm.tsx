"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, Plus, Trash } from "lucide-react";
import React, { FC } from "react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";

import { Button, Dropdown, FileUploader, Input, InteractionWrapper, Modal } from "@app/components";
import { useCreateProduct, useQueryAllCollections } from "@app/data";
import { productSchema } from "@app/validations";
import { SIZE } from "@app/constants";
import { cn } from "@app/utils";
import ReactQuill from "react-quill";

type IProductFormProps = {};

const initialValues: CreateProductPayload = {
  name: "",
  description: "",
  preserveDescription: "",
  material: "",
  collectionId: "",
  options: [],
  images: [],
  cost: {
    ingredientCost: 0,
    productionCost: 0,
    saleCost: 0,
    discountPercentage: 0,
  },
};

const CreateProductForm: FC<IProductFormProps> = ({}) => {
  const { data: collections, isPending: loadingCollections } = useQueryAllCollections();
  const { mutate: create, isPending: isCreating } = useCreateProduct();

  const onCreateProduct = (values: CreateProductPayload, helpers: FormikHelpers<CreateProductPayload>) => {
    const files: (string | File)[] = values.images!;

    let filteredFiles: File[] = [];

    if (files) {
      filteredFiles = files.filter((file) => typeof file === "object");
    }

    create({ payload: values, images: filteredFiles });

    helpers.resetForm();
  };

  const handleFilesSelect = (
    values: CreateProductPayload,
    files: File[],
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (values.images) return setFieldValue(`images`, [...values.images, ...files]);
    setFieldValue("images", [...files]);
  };

  const handleRemoveFile = (
    values: CreateProductPayload,
    fileIndex: number,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const updatedFiles = values.images?.filter((_, i) => i !== fileIndex);

    setFieldValue(`images`, updatedFiles);
  };

  const handleAddOption = (setFieldValue: (field: string, value: any) => void, values: CreateProductPayload) => {
    const newOption = {
      colorHexCode: "",
      colorName: "",
      size: "",
      stock: 0,
    };

    setFieldValue("options", values.options ? [...values.options, newOption] : [newOption]);
  };

  const handleRemoveOption = (
    index: number,
    { options }: CreateProductPayload,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    setFieldValue("options", options ? options.filter((_, i) => i !== index) : []);
  };

  const getFileBlob = (file: File | string) => {
    if (typeof file === "string") return file;

    return URL.createObjectURL(file);
  };

  return (
    <InteractionWrapper disabled={loadingCollections}>
      <Formik validationSchema={productSchema} onSubmit={onCreateProduct} initialValues={initialValues}>
        {({ getFieldMeta, setFieldValue, values, errors, submitCount }) => (
          <Form className="grid grid-cols-12 lg:p-10 gap-10">
            <section className="col-span-full lg:col-span-9 flex flex-col gap-5">
              <h1 className="font-semibold text-xl">Tổng quan sản phẩm</h1>
              <hr />
              <div>
                <label htmlFor="product-name" className="block mb-2 text-sm font-medium text-gray-900">
                  Tên sản phẩm
                </label>
                <Field
                  component={Input}
                  type="text"
                  id="product-name"
                  name="name"
                  className={cn(
                    "w-full ",
                    (getFieldMeta("name").touched || submitCount > 0) && errors.name && "border-red-400",
                  )}
                  placeholder="Tên sản phẩm.."
                />
                {(getFieldMeta("name").touched || submitCount > 0) && errors.name && (
                  <p className="text-red-400 text-sm mt-2">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="product-desc" className="block mb-2 text-sm font-medium text-gray-900">
                  Mô tả sản phẩm
                </label>
                <ReactQuill
                  value={values.description}
                  theme="snow"
                  className={cn(
                    "h-[300px] mb-10 rounded-lg",
                    (getFieldMeta("description").touched || submitCount > 0) && errors.description && "border-red-400",
                  )}
                  onChange={(value) => setFieldValue("description", value)}
                />
                {(getFieldMeta("description").touched || submitCount > 0) && errors.description && (
                  <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                )}
              </div>
              <div>
                <label htmlFor="product-desc-preserve" className="block mb-2 text-sm font-medium text-gray-900">
                  Mô tả bảo quản sản phẩm
                </label>
                <Field
                  component="textarea"
                  id="product-desc-preserve"
                  name="preserveDescription"
                  className={cn(
                    "w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md",
                    (getFieldMeta("preserveDescription").touched || submitCount > 0) &&
                      errors.preserveDescription &&
                      "border-red-400",
                  )}
                  placeholder="Mô tả bảo quản sản phẩm.."
                />
                {(getFieldMeta("preserveDescription").touched || submitCount > 0) && errors.preserveDescription && (
                  <p className="text-red-400 text-sm mt-1">{errors.preserveDescription}</p>
                )}
              </div>
              <div>
                <label htmlFor="product-material" className="block mb-2 text-sm font-medium text-gray-900">
                  Chất liệu
                </label>
                <Field
                  component="textarea"
                  id="product-material"
                  name="material"
                  className={cn(
                    "w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md",
                    (getFieldMeta("material").touched || submitCount > 0) && errors.material && "border-red-400",
                  )}
                  placeholder="Chất liệu.."
                />
                {(getFieldMeta("material").touched || submitCount > 0) && errors.material && (
                  <p className="text-red-400 text-sm mt-1">{errors.material}</p>
                )}
              </div>
              <div>
                <label htmlFor="collection" className="block mb-2 text-sm font-medium text-gray-900">
                  Bộ sưu tập
                </label>
                <Field
                  component={Dropdown}
                  values={collections}
                  itemMapper={(collection: Collection) => collection.name}
                  selectMapper={(collection: Collection) => collection._id}
                  onSelect={(value: string) => setFieldValue("collectionId", value)}
                  id="collection"
                  name="any"
                  className={cn("w-full")}
                  placeholder="Chọn bộ sưu tập.."
                />
              </div>

              <h1 className="font-semibold text-xl">Tùy chọn sản phẩm</h1>
              <hr />
              <div className="gap-3">
                <div>
                  <FileUploader
                    onFilesSelect={(files) => handleFilesSelect(values, files, setFieldValue)}
                    className={cn(
                      (getFieldMeta(`images`).touched || submitCount > 0) && errors.images && "border-red-400",
                    )}
                  />
                  {values.images && values.images.length > 0 && (
                    <div className="mt-5">
                      <p className="text-sm font-medium text-gray-900 mb-2">Hình ảnh đã tải lên:</p>
                      <div
                        className={cn(
                          "flex overflow-x-auto custom-scroll space-x-4 p-2 border border-gray-300 rounded-lg",
                        )}
                      >
                        {values.images?.map((file, fileIndex) => (
                          <div key={`file-${fileIndex}`} className="relative w-24 h-24 flex-shrink-0 group">
                            <Image
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              src={getFileBlob(file)}
                              alt={`Uploaded ${fileIndex}`}
                              className="object-cover rounded-lg"
                            />

                            <div className="bg-overlay rounded-lg flex justify-center items-center absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
                              <Modal
                                toggle={
                                  <button
                                    onClick={() => handleRemoveFile(values, fileIndex, setFieldValue)}
                                    type="button"
                                    className="text-white"
                                  >
                                    <Eye size={30} className="font-bold hover:text-red-500 transition-all" />
                                  </button>
                                }
                                title={""}
                              >
                                <div className="relative h-[70vh] w-full">
                                  <Image
                                    fill
                                    src={getFileBlob(file)}
                                    alt={`Uploaded ${fileIndex}`}
                                    className="object-cover"
                                  />
                                </div>
                              </Modal>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveFile(values, fileIndex, setFieldValue)}
                              className="w-5 h-5 flex justify-center items-center rounded-full absolute -top-2 -right-2 border bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash size={13} className="font-bold hover:text-red-500 transition-all" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {(getFieldMeta(`images`).touched || submitCount > 0) && errors.images && (
                    <p className="text-red-400 text-sm mt-2">{errors.images?.toString()}</p>
                  )}
                </div>
                <div className="mt-5 flex flex-col gap-y-5">
                  {values.options?.map((_, optionIndex) => {
                    return (
                      <div key={`option-${optionIndex}`}>
                        <div className="border border-gray-300 rounded-md p-4">
                          <div className={cn("lg:col-span-1 col-span-full flex flex-col gap-y-3")}>
                            <div className="flex justify-end items-center">
                              <div className={cn("flex justity-end gap-x-4")}>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOption(optionIndex, values, setFieldValue)}
                                  className="text-red-500 font-semibold"
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label htmlFor="hex-code" className="block mb-2 text-sm font-medium text-gray-900">
                                  Mã màu
                                </label>
                                <Field
                                  type="color"
                                  defaultValue="#000"
                                  id="hex-code"
                                  name={`options[${optionIndex}].colorHexCode`}
                                  className={cn(
                                    "w-full p-1 h-10 shadow-sm block min-h-14 bg-white border outline-none border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none ",
                                    (getFieldMeta(`options[${optionIndex}].colorHexCode`).touched || submitCount > 0) &&
                                      errors.options &&
                                      (errors.options[optionIndex] as unknown as ProductOption)?.colorHexCode &&
                                      "border-red-400",
                                  )}
                                  placeholder="Mã màu.."
                                />
                                {(getFieldMeta(`options[${optionIndex}].colorHexCode`).touched || submitCount > 0) &&
                                  errors.options &&
                                  (errors.options[optionIndex] as unknown as ProductOption)?.colorHexCode && (
                                    <p key={`error-${optionIndex}`} className="text-red-400 text-sm mt-2">
                                      {(errors.options[optionIndex] as unknown as ProductOption)?.colorHexCode}
                                    </p>
                                  )}
                              </div>
                              <div>
                                <label htmlFor="color-name" className="block mb-2 text-sm font-medium text-gray-900">
                                  Tên màu
                                </label>
                                <Field
                                  component={Input}
                                  id="color-name"
                                  name={`options[${optionIndex}].colorName`}
                                  className={cn(
                                    "w-full",
                                    (getFieldMeta(`options[${optionIndex}].colorName`).touched || submitCount > 0) &&
                                      errors.options &&
                                      (errors.options[optionIndex] as unknown as ProductOption)?.colorName &&
                                      "border-red-400",
                                  )}
                                  placeholder="Tên màu.."
                                />
                                {(getFieldMeta(`options[${optionIndex}].colorName`).touched || submitCount > 0) &&
                                  errors.options &&
                                  (errors.options[optionIndex] as unknown as ProductOption)?.colorName && (
                                    <p key={`error-${optionIndex}`} className="text-red-400 text-sm mt-2">
                                      {(errors.options[optionIndex] as unknown as ProductOption)?.colorName}
                                    </p>
                                  )}
                              </div>
                              <div>
                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900">
                                  Kích cỡ
                                </label>
                                <Field
                                  component={Dropdown}
                                  values={Object.entries(SIZE).map(([_, value]) => value)}
                                  id="size"
                                  name={`options[${optionIndex}].size`}
                                  className={cn(
                                    "w-full",
                                    (getFieldMeta(`options[${optionIndex}].size`).touched || submitCount > 0) &&
                                      errors.options &&
                                      (errors.options[optionIndex] as unknown as ProductOption)?.size &&
                                      "border-red-400",
                                  )}
                                  placeholder="Chọn kích cỡ.."
                                />
                                {(getFieldMeta(`options[${optionIndex}].size`).touched || submitCount > 0) &&
                                  errors.options &&
                                  (errors.options[optionIndex] as unknown as ProductOption)?.size && (
                                    <p key={`error-${optionIndex}`} className="text-red-400 text-sm mt-2">
                                      {(errors.options[optionIndex] as unknown as ProductOption)?.size}
                                    </p>
                                  )}
                              </div>
                              <div>
                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">
                                  Số lượng
                                </label>
                                <Field
                                  component={Input}
                                  id="stock"
                                  name={`options[${optionIndex}].stock`}
                                  className={cn(
                                    "w-full",
                                    (getFieldMeta(`options[${optionIndex}].stock`).touched || submitCount > 0) &&
                                      errors.options &&
                                      (errors.options[optionIndex] as unknown as ProductOption)?.stock &&
                                      "border-red-400",
                                  )}
                                  placeholder="Số lượng.."
                                />
                                {(getFieldMeta(`options[${optionIndex}].stock`).touched || submitCount > 0) &&
                                  errors.options &&
                                  (errors.options[optionIndex] as unknown as ProductOption)?.stock && (
                                    <p key={`error-${optionIndex}`} className="text-red-400 text-sm mt-2">
                                      {(errors.options[optionIndex] as unknown as ProductOption)?.stock}
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex flex-col items-center gap-x-3">
                    <button
                      type="button"
                      onClick={() => handleAddOption(setFieldValue, values)}
                      className="text-white transition-all bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-x-2"
                    >
                      <Plus size={20} /> Thêm tùy chọn
                    </button>
                    {(getFieldMeta("options").touched || submitCount > 0) && errors.options && (
                      <p className="text-red-400 text-sm mt-2">{typeof errors.options == "string" && errors.options}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="col-span-full lg:col-span-3 flex flex-col gap-5">
              <h1 className="font-semibold text-xl">Thông tin chi phí</h1>
              <hr />

              <div>
                <label htmlFor="ingredientCost" className="block mb-2 text-sm font-medium text-gray-900">
                  Chi phí nguyên liệu
                </label>
                <Field
                  component={Input}
                  id="ingredientCost"
                  name="cost.ingredientCost"
                  className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                  placeholder="Chi phí nguyên liệu.."
                />
              </div>
              <div>
                <label htmlFor="productionCost" className="block mb-2 text-sm font-medium text-gray-900">
                  Chi phí sản xuất
                </label>
                <Field
                  component={Input}
                  id="productionCost"
                  name="cost.productionCost"
                  className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                  placeholder="Chi phí sản xuất.."
                />
              </div>
              <div>
                <label htmlFor="saleCost" className="block mb-2 text-sm font-medium text-gray-900">
                  Giá bán
                </label>
                <Field
                  component={Input}
                  id="saleCost"
                  name="cost.saleCost"
                  className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                  placeholder="Giá bán.."
                />
              </div>
              <div>
                <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-900">
                  Phần trăm giảm giá
                </label>
                <Field
                  component={Input}
                  id="discountPercentage"
                  name="cost.discountPercentage"
                  className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                  placeholder="Phần trăm giảm giá.."
                />
              </div>
              <div className="w-full">
                <Button className="w-full rounded-lg mt-5" type="submit" isLoading={isCreating}>
                  Lưu sản phẩm
                </Button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </InteractionWrapper>
  );
};

export default CreateProductForm;
