import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

import { BreadCrumb, ProductByCollectionListing } from "@app/components";
import { GetCollection, GetCollectionWithFilter } from "@app/data";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const collection: Collection | null = await GetCollection(params.id);

  if (!collection) notFound();

  return {
    title: `${collection.name} | IVY fashion`,
    description: `Mua ngay sản phẩm ${collection.name} với giá ưu đãi!`,
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }: ProductPageProps) => {
  const collection: CollectionWithFilter | null = await GetCollectionWithFilter(params.id);

  if (!collection) notFound();

  return (
    <>
      <div className="col-span-full">
        <BreadCrumb paths={["Trang chủ", collection.collection.name]} />
      </div>
      <div className="flex flex-col md:grid w-full grid-cols-10 gap-5 md:gap-10">
        <ProductByCollectionListing collection={collection} />
        <section className="col-span-full w-full flex justify-end mt-10">
          <Link href="#" className="secondary-button text-nowrap">
            Lên đầu trang
          </Link>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
