"use client";

import { FC, useState } from "react";
import { ProductGalleryItem, Section } from ".";
import { useQueryTopProducts } from "@app/data";
import { cn } from "@app/utils";

type TopProductGalleryProps = {};

const TopProductGallery: FC<TopProductGalleryProps> = ({}) => {
  const { data: topProducts } = useQueryTopProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section heading="TOP SẢN PHẨM BÁN CHẠY TẠI IVY">
      <section className="w-full py-3 overflow-hidden">
        <div className="nav flex justify-center">
          <ul className="flex gap-5 md:gap-10">
            {topProducts?.map((item, index) => {
              return (
                <li
                  key={`topprd:title:${item.category}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "text-xl uppercase text-gray-500 border-black cursor-pointer text-nowrap",
                    activeIndex === index ? "border-b-2" : "",
                  )}
                >
                  IVY {item.category}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="flex transition-transform duration-500 ease-in-out mt-10"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {topProducts?.map((item) => {
            return (
              <div
                key={`topprd:gallery:${item.category}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full flex-shrink-0"
              >
                {item.topProducts.map((product) => {
                  return <ProductGalleryItem key={`topprd:${product._id}`} product={product} />;
                })}
              </div>
            );
          })}
        </div>

        <div className="w-full flex items-center justify-center mt-10">
          <button className="secondary-button py-3 px-8 rounded-tl-3xl rounded-br-3xl before:rounded-tl-3xl before:rounded-br-3xl">
            Xem tất cả
          </button>
        </div>
      </section>
    </Section>
  );
};

export default TopProductGallery;
