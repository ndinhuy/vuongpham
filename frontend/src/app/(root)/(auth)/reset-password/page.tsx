import { Metadata } from "next";
import { FC } from "react";

import ResetPasswordForm from "./form";

type ResetPasswordPageProps = {
  searchParams: { trans: string; uid: string };
};

export const metadata: Metadata = {
  title: "Khôi phục mật khẩu | IVY fashion",
  description: "Fashion store",
};

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ searchParams: { trans, uid } }: ResetPasswordPageProps) => {
  return (
    <section className="flex flex-col items-center text-center">
      <article className="py-7">
        <h1 className="text-2xl font-semibold mb-2">Khôi phục mật khẩu?</h1>
        <p className="text-sm text-gray-500">
          Vui lòng nhập mật khẩu mới mã OTP, hệ thống của chúng tôi sẽ xác thực và cho phép cập nhật mật khẩu mới.
        </p>
      </article>
      <ResetPasswordForm transactionId={trans} userId={uid} />
    </section>
  );
};

export default ResetPasswordPage;
