"use client";

import { useCart } from "@app/common";
import { cn } from "@app/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type CartNavButtonProps = {};

const CartNavButton: FC<CartNavButtonProps> = () => {
  const { items } = useCart();
  const itemCount = items.length || 0;

  return (
    <Link href="/order/cart" className={cn("p-3 flex items-center justify-end xl:justify-center relative")}>
      <ShoppingCart size={20} />

      <span className="w-4 h-4 bg-black text-white rounded-full absolute right-0 top-0 text-xs text-center flex items-center justify-center">
        {itemCount}
      </span>
    </Link>
  );
};

export default CartNavButton;
