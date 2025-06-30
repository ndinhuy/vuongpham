import { Metadata } from "next";
import { FC } from "react";
import CheckoutForm from "./form";

type CheckoutPageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Tạo đơn hàng | IVY fashion",
  description: "Fashion store",
};

const CheckoutPage: FC<CheckoutPageProps> = ({ params }: CheckoutPageProps) => {
  if (!params.id) return <p>Đơn hàng không tồn tại</p>;

  return <CheckoutForm id={params.id} />;
};

export default CheckoutPage;
