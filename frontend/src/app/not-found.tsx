import Link from "next/link";
import { FC } from "react";

type NotFoundPageProps = {};

const NotFoundPage: FC<NotFoundPageProps> = ({}: NotFoundPageProps) => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Không tìm thấy trang.</p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Xin lỗi, Ivy không thể tìm thấy trang nào với đường dẫn này. Bạn có thể trở lại và khám phá mọi thứ từ trang
            chủ.
          </p>
          <div className="mt-10">
            <Link href="/" className="primary-button px-6 py-3 font-semibold">
              Quay lại Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
