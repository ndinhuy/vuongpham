import { Button, ProductGalleryItem } from "@app/components";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC } from "react";

type LoveProductPageProps = {};

const LoveProductPage: FC<LoveProductPageProps> = ({}: LoveProductPageProps) => {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-10">Sản phẩm yêu thích</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full flex-shrink-0">
        {/* {Array(5)
          .fill(null)
          .map((_, index) => {
            return <ProductGalleryItem key={index} />;
          })} */}
      </div>
      <hr className="mt-10" />
      <div className="flex gap-x-4 justify-center mt-10">
        <Button variant="secondary" className="flex items-center gap-4">
          <ArrowLeft size={20} /> Trước
        </Button>
        <Button className="flex items-center gap-4">
          Sau <ArrowRight size={20} />
        </Button>
      </div>
    </>
  );
};

export default LoveProductPage;
