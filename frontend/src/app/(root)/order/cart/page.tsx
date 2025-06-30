import { MoveLeft } from "lucide-react";
import { Metadata } from "next";
import { FC } from "react";

import CartTable from "./table";

type CartPageProps = {};

export const metadata: Metadata = {
  title: "Giỏ hàng | IVY fashion",
  description: "Fashion store",
};

const CartPage: FC<CartPageProps> = ({}: CartPageProps) => {
  return (
    <section className="mt-10 lg:px-5 px-0">
      <CartTable />
      <button className="secondary-button mt-10 text-lg px-6 py-3 flex items-center gap-3 before:hidden">
        <MoveLeft />
        Tiếp tục mua sắm
      </button>
    </section>
  );
};

export default CartPage;
