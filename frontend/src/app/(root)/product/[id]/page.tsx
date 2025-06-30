import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { FC } from "react";

import { BreadCrumb, ProductDetailExtraInfo, ProductDetailImages } from "@app/components";
import { calcProductSaleCosts } from "@app/utils";
import { getProduct } from "@app/data";

const ProductOptionForm = dynamic(() => import("./form"), { ssr: false });

type ProductDetailPageProps = {
  params: { id: string };
};

async function loadPost(id: string) {
  const product: Product | null = await getProduct(id);

  if (!product) notFound();

  return product;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product: Product = await loadPost(params.id);

  return {
    title: `${product.name} | IVY fashion`,
    description: `Mua ngay sản phẩm ${product.name} với giá ưu đãi!`,
  };
}

const ProductDetailPage: FC<ProductDetailPageProps> = async ({ params }: ProductDetailPageProps) => {
  const product: Product = await loadPost(params.id);

  const productCosts = calcProductSaleCosts(product.currentCost);

  return (
    <div className="container">
      <BreadCrumb paths={["Trang chủ", product.name]} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        <ProductDetailImages images={product.images as string[]} />

        <div className="lg:px-20 lg:py-10 flex flex-col gap-8">
          <h1 className="text-3xl font-semibold uppercase">{product.name}</h1>

          <div>
            <h4 className="uppercase text-gray-500">ID: {product._id}</h4>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={`star:${index}`} size={18} />
              ))}
            </div>
            <h4 className="text-gray-500">(0 đánh giá)</h4>
          </div>

          <ins className="no-underline flex gap-2 items-center">
            <span className="font-semibold text-2xl">{productCosts.saleCost}</span>
            <span className="text-sm line-through text-gray-500">{productCosts.oldCost}</span>
          </ins>

          <hr />
          <ProductOptionForm product={product} />
          <ProductDetailExtraInfo />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center my-10">Sản phẩm tương tự</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full flex-shrink-0">
        {/* {Array(5)
          .fill(null)
          .map((_, index) => {
            return <ProductGalleryItem key={index} />;
          })} */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
