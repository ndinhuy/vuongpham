import { Metadata } from "next";
import { FC } from "react";

import ForgotPasswordForm from "./form";

type ForgotPasswordPageProps = {};

export const metadata: Metadata = {
  title: "Quên mật khẩu | IVY fashion",
  description: "Fashion store",
};

const ForgotPasswordPage: FC<ForgotPasswordPageProps> = ({}: ForgotPasswordPageProps) => {
  return (
    <section className="flex flex-col items-center text-center">
      <article className="py-7">
        <h1 className="text-2xl font-semibold mb-2">Bạn muốn tìm lại mật khẩu?</h1>
        <p className="text-sm text-gray-500">
          Vui lòng nhập lại email đã đăng ký, hệ thống của chúng tôi sẽ gửi cho bạn 1 đường dẫn để thay đổi mật khẩu.
        </p>
      </article>
      <ForgotPasswordForm />
    </section>
  );
};

export default ForgotPasswordPage;
