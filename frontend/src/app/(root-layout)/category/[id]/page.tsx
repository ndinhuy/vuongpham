"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { httpService } from "@/services/http.service";
import { Button } from "@/components/ui/button";

export interface Product {
  productID: string;
  name: string;
  image1: string;
  image2: string;
  image3: string;
  price: number;
  description: string;
  nsn: string;
  category: {
    codeValue: string;
    name: string;
    image: string;
    description: string;
  };
  imageFile: string;
  imageSrc: string;
}

const Category = () => {
  const params = useParams<{ id: string }>();
  const categoryId = params.id;
  const router = useRouter();

  const [products, setProducts] = React.useState<Product[]>([]);

  if (!categoryId) {
    return router.push("/not-found");
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await httpService.get<Product[]>(`product/category/${categoryId}`);
      setProducts(data);
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="my-10 container">
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.productID} className="border p-4 rounded-lg flex flex-col gap-2 cursor-pointer">
            <div className="h-40 bg-muted rounded-lg mb-2">
              <img src={product.image1} alt={product.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="space-y-10">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                <Button
                  size={"sm"}
                  onClick={() => {
                    router.push(`/product/${product.productID}`);
                  }}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
