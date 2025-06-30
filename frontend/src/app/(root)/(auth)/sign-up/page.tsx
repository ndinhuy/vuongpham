import { Metadata } from "next";
import { FC } from "react";

import SignUpForm from "./form";

type SignUpPageProps = {};

export const metadata: Metadata = {
  title: "Đăng ký | IVY fashion",
  description: "Fashion store",
};

const SignUpPage: FC<SignUpPageProps> = ({}: SignUpPageProps) => {
  return (
    <div className="container py-10 px-5 lg:px-0">
      <h1 className="text-2xl font-semibold uppercase text-center">Đăng Ký</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
