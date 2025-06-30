"use client";

import { QuantityControl } from "@app/components";
import { FC, useMemo, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Heart } from "lucide-react";

import { purchaseFormSchema } from "@app/validations";
import { useCart } from "@app/common";
import { cn } from "@app/utils";

type ProductOptionFormProps = { product: Product };

type PurchaseFormData = {
  color: string;
  size: string;
  quantity: number;
};

const initialFormValues: PurchaseFormData = {
  color: "",
  size: "",
  quantity: 0,
};

const ProductOptionForm: FC<ProductOptionFormProps> = ({ product }) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
  const { addItem } = useCart();

  const filteredOptions = useMemo(
    () => product.options.filter((option): option is ProductOption => typeof option !== "string"),
    [product.options],
  );

  const { sizes, colors } = useMemo(() => {
    const sizeMap = new Map(filteredOptions.map((option) => [option.size, { name: option.size }]));
    const sizes = Array.from(sizeMap.values());

    const colorMap = new Map(
      filteredOptions.map((option) => [option.colorHexCode, { name: option.colorName, code: option.colorHexCode }]),
    );
    const colors = Array.from(colorMap.values());

    return { sizes, colors };
  }, [filteredOptions]);

  const getAvailableSizes = (color: string) =>
    filteredOptions.filter((opt) => opt.colorHexCode === color).map((opt) => opt.size);

  const onSelectOption = (color: string, size: string) => {
    const option = filteredOptions.find((opt) => opt.size === size && opt.colorHexCode === color) || null;

    setSelectedOption(option);
  };

  const onAddCartItem = (values: PurchaseFormData) => {
    addItem({
      productId: product._id,
      optionId: selectedOption!._id,
      quantity: values.quantity,
    });
  };

  return (
    <Formik initialValues={initialFormValues} validationSchema={purchaseFormSchema} onSubmit={onAddCartItem}>
      {({ getFieldMeta, setFieldValue, values, errors }) => (
        <Form className="flex flex-col gap-8">
          <div className="flex flex-col gap-y-5">
            <span className="font-bold text-xl">Màu sắc: {selectedOption?.colorName}</span>
            <div role="group" className="flex gap-3 max-w-lg flex-wrap">
              {colors.map((color, index) => (
                <label key={`color-${index}`} className={cn("filter-color-item")}>
                  <Field
                    type="radio"
                    name="color"
                    value={color.code}
                    onChange={() => {
                      setFieldValue("color", color.code);
                      setFieldValue("size", "");
                    }}
                  />
                  <span style={{ background: color.code }} />
                </label>
              ))}
            </div>
            {getFieldMeta("color").touched && errors.color && (
              <p className="text-red-400 text-start text-sm">{errors.color}</p>
            )}

            <div role="group" className="flex gap-3 flex-wrap">
              {sizes.map((size, index) => (
                <label key={`size-${index}`} className={cn("filter-size-item")}>
                  <Field
                    type="radio"
                    name="size"
                    value={size.name}
                    onChange={() => {
                      setFieldValue("size", size.name);
                      onSelectOption(values.color, size.name);
                    }}
                    disabled={!getAvailableSizes(values.color).includes(size.name)}
                  />
                  <span>{size.name}</span>
                </label>
              ))}
            </div>

            {getFieldMeta("size").touched && errors.size && (
              <p className="text-red-400 text-start text-sm">{errors.size}</p>
            )}
          </div>

          <div className="flex gap-x-4 items-center">
            <span className="font-semibold text-xl">Số lượng</span>
            <QuantityControl
              onDecrease={() => setFieldValue("quantity", values.quantity - 1)}
              onIncrease={() => setFieldValue("quantity", values.quantity + 1)}
              canIncrease={values.quantity < (selectedOption?.stock || 0)}
              quantity={values.quantity}
            />
            <span>Còn lại {selectedOption?.stock} sản phẩm</span>
          </div>

          {getFieldMeta("quantity").touched && errors.quantity && (
            <p className="text-red-400 text-start text-sm">{errors.quantity}</p>
          )}

          <div className="flex gap-3">
            <button type="submit" className="primary-button px-6 py-3 rounded-tl-3xl rounded-br-3xl">
              <span>Mua hàng ngay</span>
            </button>
            <button
              type="submit"
              className="secondary-button px-6 py-3 rounded-tl-3xl rounded-br-3xl before:rounded-tl-3xl before:rounded-br-3xl"
            >
              <span>Thêm vào giỏ</span>
            </button>
            <button className="ms-5 secondary-button px-6 py-3 rounded-tl-3xl rounded-br-3xl before:rounded-tl-3xl before:rounded-br-3xl">
              <span>
                <Heart size={20} />
              </span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductOptionForm;
