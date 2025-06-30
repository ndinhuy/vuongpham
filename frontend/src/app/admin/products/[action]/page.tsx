import { CreateProductForm, UpdateProductForm } from "@app/components";
import { FC } from "react";

type ProductDetailPageProps = {
  params: {
    action: string;
  };
};

const ProductDetailPage: FC<ProductDetailPageProps> = ({ params }) => {
  const { action } = params;

  return action === "create" ? <CreateProductForm /> : <UpdateProductForm id={action} />;
};

export default ProductDetailPage;
