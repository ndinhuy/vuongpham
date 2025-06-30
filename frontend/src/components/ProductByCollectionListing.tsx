"use client";

import { FC } from "react";

import { Pagination, ProductFilter, ProductGalleryItem, ProductItemSkeleton } from ".";
import { useQueryProductsByCategory } from "@app/data";

type ProductByCollectionListingProps = {
  collection: CollectionWithFilter;
};

const ProductByCollectionListing: FC<ProductByCollectionListingProps> = ({ collection }) => {
  const { data, error, isFetching, isFetched, onChangePage } = useQueryProductsByCategory(collection.collection._id);

  return (
    <>
      <section className="w-full h-fit block lg:sticky top-[100px] md:col-span-3 lg:col-span-2">
        <ProductFilter filterOptions={collection.filterOptions} />
      </section>
      <section className="w-full md:col-span-7 lg:col-span-8">
        <h1 className="text-2xl font-medium mb-10">{collection.collection.name}</h1>
        {error && <p>Error loading products: {error.message}</p>}
        {isFetching && !isFetched ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <ProductItemSkeleton key={index} />
              ))}
          </div>
        ) : (
          data && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {data.data?.length <= 0 && <span className="text-gray-500">Không có sản phẩm nào</span>}
              {data.data?.map((product, index) => {
                return <ProductGalleryItem key={index} product={product} />;
              })}
            </div>
          )
        )}
        {data && data.meta.pages > 2 && (
          <div className="col-span-full flex justify-center mt-5">
            <Pagination currentPage={data.meta.page} pageCount={data.meta.pages} onChangePage={onChangePage} />
          </div>
        )}
      </section>
    </>
  );
};

export default ProductByCollectionListing;
