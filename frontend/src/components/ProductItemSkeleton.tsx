import React, { FC } from "react";

interface IProps {}

const ProductItemSkeleton: FC<IProps> = (props) => {
  return (
    <div role="status" className="h-[20rem] md:h-[25rem] lg:h-[32rem] product flex flex-col animate-pulse">
      <div className="flex-1 w-full bg-gray-300 rounded"></div>
      <div className="w-full py-4 flex flex-col justify-end">
        <div className="h-5 bg-gray-200 rounded w-48 mb-3" />
        <div className="h-3.5 bg-gray-200 rounded max-w-[480px] mb-2.5" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ProductItemSkeleton;
