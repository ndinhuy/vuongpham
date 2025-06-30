"use client";

import { Field, Form, Formik } from "formik";
import { FC, memo } from "react";

import FilterGroup from "./FilterGroup";

type ProductFilterProps = { filterOptions: CollectionFilter };

const ProductFilter: FC<ProductFilterProps> = ({ filterOptions: { colors, sizes, materials } }: ProductFilterProps) => {
  return (
    <Formik
      initialValues={{
        size: "L",
      }}
      onSubmit={() => {}}
    >
      {() => {
        return (
          <Form className="flex flex-col gap-3">
            <FilterGroup name={"Kích cỡ"}>
              {sizes.map((size) => (
                <label key={`opt:size:${size}`} className="filter-size-item" htmlFor="size">
                  <Field type="radio" name="size" value={"L"} />
                  <span>{size}</span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup name={"Màu sắc"}>
              {colors.map((color) => (
                <label key={`opt:color:${color}`} className="filter-color-item" htmlFor="size">
                  <Field type="radio" name="size" value={color} />
                  <span style={{ background: color }} />
                </label>
              ))}
            </FilterGroup>

            <FilterGroup name={"Mức giá"}>
              <div className="relative mb-6 w-full">
                <input
                  id="labels-range-input"
                  type="range"
                  min="100"
                  max="1500"
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                />
                <span className="text-sm text-gray-500 absolute start-0 -bottom-6">(100)</span>
                <span className="text-sm text-gray-500 absolute end-0 -bottom-6">(1500)</span>
              </div>
            </FilterGroup>

            <FilterGroup name={"Chất liệu"}>
              {materials.map((material) => (
                <label key={`opt:material:${material}`} className="flex gap-2" htmlFor="material">
                  <Field type="radio" name="material" value={material} />
                  <span>{material}</span>
                </label>
              ))}
            </FilterGroup>

            <div className="flex justify-center gap-5 mt-5">
              <button className="secondary-button px-6 py-3 before:hidden">Bỏ Lọc</button>
              <button className="primary-button px-6 py-3">Lọc</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(ProductFilter);
