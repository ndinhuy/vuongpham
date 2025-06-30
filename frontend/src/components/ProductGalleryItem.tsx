import { ShoppingBag } from "lucide-react";
import { FC, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { calcProductSaleCosts } from "@app/utils";
import Popover from "./Popover";

type ProductGalleryItemProps = {
  product: Product;
};

const ProductGalleryItem: FC<ProductGalleryItemProps> = ({ product }) => {
  const { _id, currentCost, name } = product;

  const { saleCost, oldCost } = useMemo(() => {
    return currentCost ? calcProductSaleCosts(currentCost) : { saleCost: 0, oldCost: 0 };
  }, [currentCost]);

  return (
    <div className="h-[20rem] md:h-[25rem] lg:h-[32rem] product flex flex-col opacity-show">
      <Link href={`/product/${_id}`} className="show-case-images flex-1 relative cursor-pointer">
        {product.images?.map((url) => {
          return (
            <Image
              key={url}
              className="opacity-show"
              src={url}
              alt={`${name} Image 1`}
              layout="fill"
              objectFit="cover"
            />
          );
        })}
        {product.currentCost.discountPercentage! > 0 && (
          <span className="w-10 h-10 flex justify-center items-center text-xs rounded-l-3xl rounded-tr-3xl rounded-br-0 bg-orange-600 absolute font-semibold text-white top-3 right-3">
            {`${product.currentCost.discountPercentage}%`}
          </span>
        )}
      </Link>

      <div className="py-3">
        <h3 className="font-medium sm:text-sm text-gray-500">{name}</h3>
        <div className="flex justify-between items-center">
          <ins className="no-underline flex gap-2 items-end flex-1">
            <span className="text-sm lg:font-bold">{saleCost}</span>
            <span className="text-xs lg:text-sm line-through text-gray-500">{oldCost}</span>
          </ins>

          <Popover
            triggerChild={<ShoppingBag size={18} />}
            triggerButtonClassName="primary-button rounded-tl-xl rounded-br-xl"
          >
            <ul>
              {["L", "XL", "XXL"].map((size) => (
                <li key={size} className="font-bold uppercase py-2 px-10 hover:bg-gray-50 text-center">
                  {size}
                </li>
              ))}
            </ul>
          </Popover>
        </div>
      </div>

      
    </div>
  );
};

export default ProductGalleryItem;
