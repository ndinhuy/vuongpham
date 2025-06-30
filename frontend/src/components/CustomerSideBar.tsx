"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";

import { customerRoutes } from "@app/constants";
import { cn } from "@app/utils";
import { useAuth } from "@app/common";

type CustomerSideBarProps = {};

const CustomerSideBar: FC<CustomerSideBarProps> = ({}: CustomerSideBarProps) => {
  const { user } = useAuth();
  const pathName = usePathname();

  return (
    <section className="border-4 p-10 rounded-tl-[60px] rounded-br-[60px]">
      <h1 className="text-lg font-bold opacity-show">{user && `${user.lastName} ${user.firstName}`}</h1>

      <hr className="mt-5 mb-3" />

      <ul>
        {customerRoutes.map(({ route, name, icon }) => {
          const isActive = pathName.includes(route);

          return (
            <li key={route}>
              <Link
                href={route}
                className={cn("py-4 flex items-center gap-3 text-gray-500 font-semibold", isActive ? "text-black" : "")}
              >
                {icon}
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CustomerSideBar;
