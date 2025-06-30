"use client";

import { Field, Form, Formik } from "formik";
import React, { FC, useEffect } from "react";
import { Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";

import { Button, Dropdown, FileUploader, Input, Modal } from "@app/components";
import { useQueryProductDetail, useUpdateProduct } from "@app/data";
import { SIZE } from "@app/constants";
import { cn } from "@app/utils";
import ReactQuill from "react-quill";

interface IUpdateProductFormProps {
  id: string;
}

type InitialUpdateUpdateProductFormType = UpdateProductPayload & Product;

const UpdateProductForm: FC<IUpdateProductFormProps> = ({ id }) => {
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(id);
  const { isLoading, data: product } = useQueryProductDetail(id);

  const fileUrls: string[] = [];

  const initialValues: InitialUpdateUpdateProductFormType = {
    ...product!,
  };

  const onUpdateProduct = (values: InitialUpdateUpdateProductFormType) => {
    const {
      name,
      description,
      preserveDescription,
      material,
      newOptions,
      updateOptions,
      deleteOptions,
      newCost,
      newImages,
      deleteImages,
    } = values;

    update({
      name,
      description,
      preserveDescription,
      material,
      newOptions,
      updateOptions,
      deleteOptions,
      newCost,
      newImages,
      deleteImages,
    });
  };

  const handleFilesSelect = (
    { newImages, images }: InitialUpdateUpdateProductFormType,
    files: File[],
    setFieldValue: (field: string, value: any) => void,
  ) => {
    setFieldValue(`images`, [...(images || []), ...files]);
    setFieldValue(`newImages`, [...(newImages || []), ...files]);
  };

  const handleRemoveFile = (
    { newImages, deleteImages, images }: InitialUpdateUpdateProductFormType,
    fileIndex: number,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const updatedFiles = images?.filter((_, i) => {
      if (typeof images[i] === "string") {
        setFieldValue(
          `deleteImages`,
          deleteImages?.filter((imageUrl) => imageUrl !== images[i]),
        );
      } else {
        setFieldValue(
          `newImages`,
          newImages?.filter((file) => file !== images[i]),
        );
      }

      return i !== fileIndex;
    });

    setFieldValue(`images`, updatedFiles);
  };

  const handleAddOption = (
    setFieldValue: (field: string, value: any) => void,
    values: InitialUpdateUpdateProductFormType,
  ) => {
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
    { options, deleteOptions }: InitialUpdateUpdateProductFormType,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const deletingOption = options[index];

    if (deletingOption && typeof deletingOption !== "string" && !!deletingOption._id) {
      setFieldValue("deleteOptions", [...(deleteOptions || []), deletingOption._id]);
    }

    setFieldValue("options", options ? options.filter((_, i) => i !== index) : []);
  };

  const getFileBlob = (file: File | string) => {
    if (typeof file === "string") return file;

    const url = URL.createObjectURL(file);

    fileUrls.push(url);

    return url;
  };

  useEffect(() => {
    return () => fileUrls.forEach((url) => URL.revokeObjectURL(url));
  });

  return (
    <>
      {isLoading ? (
        <div className="p-10 flex items-center justify-center">Đang tải thông tin sản phẩm...</div>
      ) : product ? (
        <Formik onSubmit={onUpdateProduct} initialValues={initialValues}>
          {({ getFieldMeta, setFieldValue, values, errors, submitCount }) => (
            <Form className="grid grid-cols-12 lg:p-10 gap-10">
              <section className="col-span-full lg:col-span-9 flex flex-col gap-5">
                <h1 className="font-semibold text-xl">Tổng quan sản phẩm</h1>
                <hr />

                <div className="col-span-full">
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
                <div className="col-span-full">
                  <label htmlFor="product-desc" className="block mb-2 text-sm font-medium text-gray-900">
                    Mô tả sản phẩm
                  </label>
                  <ReactQuill
                    value={values.description}
                    theme="snow"
                    className={cn(
                      "h-[300px] mb-10 rounded-lg",
                      (getFieldMeta("description").touched || submitCount > 0) &&
                        errors.description &&
                        "border-red-400",
                    )}
                    onChange={(value) => setFieldValue("description", value)}
                  />
                  {(getFieldMeta("description").touched || submitCount > 0) && errors.description && (
                    <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
                <div className="col-span-full">
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
                <div className="col-span-full">
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

                <h1 className="font-semibold text-xl">Tuỳ chọn sản phẩm</h1>
                <hr />

                <div>
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
                            <div key={`file-${fileIndex}`} className="relative w-24 h-32 flex-shrink-0 group">
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
                  </div>
                  <div className="flex flex-col mt-5 gap-y-5">
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
                                    id="hex-code"
                                    name={`options[${optionIndex}].colorHexCode`}
                                    className={cn(
                                      "w-full p-1 h-10 shadow-sm block min-h-14 bg-white border outline-none border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none ",
                                    )}
                                    placeholder="Mã màu.."
                                  />
                                </div>
                                <div>
                                  <label htmlFor="color-name" className="block mb-2 text-sm font-medium text-gray-900">
                                    Tên màu
                                  </label>
                                  <Field
                                    component={Input}
                                    id="color-name"
                                    name={`options[${optionIndex}].colorName`}
                                    className={cn("w-full bg-gray-50")}
                                    placeholder="Tên màu.."
                                  />
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
                                    className={cn("w-full bg-gray-50")}
                                    placeholder="Chọn kích cỡ.."
                                  />
                                </div>
                                <div>
                                  <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">
                                    Tồn kho
                                  </label>
                                  <Field
                                    component={Input}
                                    id="stock"
                                    name={`options[${optionIndex}].stock`}
                                    className={cn("w-full bg-gray-50")}
                                    placeholder="Số lượng.."
                                  />
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
                    </div>
                  </div>
                </div>
              </section>

              <section className="col-span-full lg:col-span-3 flex flex-col gap-5">
                <h1 className="font-semibold text-xl">Thông tin chi phí</h1>
                <hr />

                <div className="lg:col-span-1 col-span-full">
                  <label htmlFor="ingredientCost" className="block mb-2 text-sm font-medium text-gray-900">
                    Chi phí nguyên liệu
                  </label>
                  <Field
                    component={Input}
                    id="ingredientCost"
                    name="newCost.ingredientCost"
                    className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                    placeholder="Chi phí nguyên liệu.."
                  />
                </div>
                <div className="lg:col-span-1 col-span-full">
                  <label htmlFor="productionCost" className="block mb-2 text-sm font-medium text-gray-900">
                    Chi phí sản xuất
                  </label>
                  <Field
                    component={Input}
                    id="productionCost"
                    name="newCost.productionCost"
                    className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                    placeholder="Chi phí sản xuất.."
                  />
                </div>
                <div className="lg:col-span-1 col-span-full">
                  <label htmlFor="saleCost" className="block mb-2 text-sm font-medium text-gray-900">
                    Giá bán
                  </label>
                  <Field
                    component={Input}
                    id="saleCost"
                    name="newCost.saleCost"
                    className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                    placeholder="Giá bán.."
                  />
                </div>
                <div className="lg:col-span-1 col-span-full">
                  <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-900">
                    Phần trăm giảm giá
                  </label>
                  <Field
                    component={Input}
                    id="discountPercentage"
                    name="newCost.discountPercentage"
                    className={cn("w-full py-4 px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md")}
                    placeholder="Phần trăm giảm giá.."
                  />
                </div>
                <div className="w-full">
                  <Button className="w-full rounded-lg mt-5" type="submit" isLoading={isUpdating}>
                    Lưu sản phẩm
                  </Button>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="p-10 flex items-center justify-center">Không tìm thấy sản phẩm</div>
      )}
    </>
  );
};

export default UpdateProductForm;
