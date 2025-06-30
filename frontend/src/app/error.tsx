"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">500</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Có lỗi đã xảy ra.</p>
          <p className="mb-4 font-light text-gray-500">
            Ivy rất tiếc vì sự bất tiện này! Hiện tại hệ thống của Ivy đang gặp một chút trục trặc nhỏ, nhưng bạn hãy
            yên tâm, đội ngũ của chúng tôi đang nỗ lực khắc phục ngay. Vui lòng quay lại sau giây lát. Happy shopping!!
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
}
