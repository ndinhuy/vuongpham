import { FC } from "react";
import SignInForm from "./form";
import { Metadata } from "next";
import Link from "next/link";

type SignInPageProps = {};

export const metadata: Metadata = {
  title: "Đăng nhập | IVY fashion",
  description: "Fashion store",
};

const SignInPage: FC<SignInPageProps> = ({}: SignInPageProps) => {
  return (
    <div className="container relative flex flex-col gap-10 lg:flex-row p-5 lg:p-10">
      <div className="flex-1 flex flex-col gap-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">Bạn đã có tài khoản Ivy</h2>
          <p className="text-gray-500 mt-2">
            Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!
          </p>
        </div>

        <SignInForm />
      </div>

      <div className="hidden lg:block auth-divider w-[300px]"></div>
      <hr className="block lg:hidden" />

      <div className="flex-1">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">Khách hàng mới của IVY moda</h2>
          <p className="text-gray-500 mt-2">
            Nếu bạn chưa có tài khoản trên ivy, hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký. Bằng cách cung
            cấp cho IVY moda thông tin chi tiết của bạn, quá trình mua hàng trên ivymoda.com sẽ là một trải nghiệm thú
            vị và nhanh chóng hơn!
          </p>
        </div>

        <Link href="/sign-up">
          <button className="primary-button py-3 w-full mt-5" type="submit">
            Đăng ký
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
