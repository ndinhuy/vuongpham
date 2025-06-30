"use client";

import { adminRoutes } from "@app/constants";
import { cn } from "@app/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface IAdminSideBarProps {
  openSideBar: boolean;
}

const AdminSideBar: FC<IAdminSideBarProps> = ({ openSideBar }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(openSideBar);
  }, [openSideBar]);

  return (
    <>
      <aside
        id="logo-sidebar"
        className={cn(
          isOpen ? "translate-x-0" : "-translate-x-full",
          "sm:hidden md:block fixed top-0 left-0 z-40 w-64 h-screen pt-28 transition-transform bg-white border-r border-gray-200 sm:translate-x-0",
        )}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
          <ul className="space-y-2 font-medium">
            {adminRoutes.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.route}
                  className={cn(
                    "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-all group",
                    pathname === item.route && "bg-gray-100",
                  )}
                >
                  {item.icon}
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;
