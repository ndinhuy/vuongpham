"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Product as ProductType } from "../../category/[id]/page";
import { httpService } from "@/services/http.service";

import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

const Product = () => {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const router = useRouter();

  if (!productId) {
    return router.push("/not-found");
  }

  const [product, setProduct] = React.useState<ProductType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await httpService.get<ProductType>(`product/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, []);

  return (
    product && (
      <div className="container my-10">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-card p-4 rounded-2xl shadow-xl">
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 rounded-xl overflow-hidden"
            >
              {[product.image1, product.image2, product.image3, product.image1, product.image2, product.image3].map(
                (img, i) => {
                  return (
                    <SwiperSlide key={v4()} className="!opacity-100">
                      <div className="h-96 w-full relative rounded-2xl overflow-hidden">
                        <Image src={img} alt={`Product image ${i + 1}`} sizes="auto" fill objectFit="cover" />
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
            <Swiper
              onSwiper={(swiper) => {
                setThumbsSwiper(swiper);
              }}
              loop={true}
              spaceBetween={16}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-4"
            >
              {[product.image1, product.image2, product.image3, product.image1, product.image2, product.image3].map(
                (img, i) => {
                  return (
                    <SwiperSlide key={v4()}>
                      <div className={clsx("size-40 aspect-square w-full relative rounded-2xl overflow-hidden")}>
                        <Image src={img} alt={`Product image ${i + 1}`} sizes="auto" fill objectFit="cover" />
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </div>

          <div>
            <div className="bg-card p-4 rounded-2xl shadow-xl flex flex-col justify-between h-fit min-h-96">
              <p className="capitalize font-semibold text-xl">{product.name}</p>

              <Button>Mua ngay</Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Product;
