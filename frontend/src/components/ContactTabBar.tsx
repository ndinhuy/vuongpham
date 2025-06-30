"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";

import { contactRoutes } from "@app/constants";
import { cn } from "@app/utils";
import Link from "next/link";

type ContactTabBarProps = {};

const ContactTabBar: FC<ContactTabBarProps> = ({}: ContactTabBarProps) => {
  const pathName = usePathname();

  return (
    <div className="border-b border-gray-200 ">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
        {contactRoutes.map(({ route, name, icon }) => (
          <li key={route} className="me-2 hover:bg-gray-50 transition-all">
            <Link
              href={`/admin/${route}`}
              className={cn(
                "inline-flex items-center justify-center p-4 rounded-t-lg group",
                pathName.includes(route) && "active-tab",
              )}
            >
              {icon}
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactTabBar;
