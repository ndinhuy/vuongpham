"use client";

import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";

import { orderRoutes } from "@app/constants";
import { cn } from "@app/utils";
import { Check } from "lucide-react";

type OrderProcessProps = {};

const OrderProcess: FC<OrderProcessProps> = ({}: OrderProcessProps) => {
  const pathName = usePathname();

  const activeIndex = useMemo(() => orderRoutes.findIndex((route) => pathName.includes(route.route)), [pathName]);

  return (
    <div className="border-4 rounded-3xl px-5 lg:px-10 py-5">
      <ul className="flex justify-between relative order-process-bar overflow-hidden">
        {orderRoutes.map(({ route, name, icon }, index) => {
          const isActive = activeIndex >= index;

          return (
            <li key={route} className="flex flex-col items-center w-[80px]">
              <span className={cn("indicator", isActive ? "active" : "")}>{icon}</span>
              <span className="text-gray-500 mt-3 text-xs md:text-sm md:text-md">{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderProcess;
