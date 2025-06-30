"use client";

import { Loader2, Search } from "lucide-react";
import { ChangeEvent, FC, useState } from "react";

import { cn } from "@app/utils";
import { useSearchProducts } from "@app/data";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import Image from "next/image";

type SearchInputProps = {};

const SearchInput: FC<SearchInputProps> = ({}: SearchInputProps) => {
  const { data: products, mutate: search, isPending, reset } = useSearchProducts();

  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);

  const onSearchChange = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;

    if (value) {
      search(value);
    } else {
      reset();
    }
  }, 300);

  return (
    <div className="flex items-center border rounded-md px-3 relative h-full">
      <Search size={20} />

      <input
        onFocus={onFocus}
        onBlur={onBlur}
        className="flex-1 px-3 outline-none h-full"
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        onChange={onSearchChange}
      />

      <ul
        className={cn(
          "absolute w-[150%] h-[300px] bg-white border left-0 top-10 mt-5 rounded-md transition-all fade-in-show overflow-y-auto p-5",
          isFocus ? "block" : "hidden",
        )}
      >
        {isPending && (
          <li className="flex flex-col justify-center items-center">
            <Loader2 size={16} className="animate-spin mb-2" />
            <p className="text-sm text-gray-500">Đang tìm kiếm...</p>
          </li>
        )}
        {products?.map((product) => {
          return (
            <li key={`search:rsl:${product._id}`}>
              <Link className="flex items-center py-1 gap-2" href={`/product/${product._id}`}>
                <div className="w-[50px] h-[70px] rounded overflow-hidden relative">
                  <Image src={product.images?.[0] || ""} alt={""} layout="fill" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm">{product.name}</p>
                  <p className="max-w-full text-ellipsis text-xs text-gray-500">
                    {product.description.slice(0, 50)}...
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchInput;
