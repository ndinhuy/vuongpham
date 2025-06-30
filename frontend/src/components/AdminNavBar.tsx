"use client";

import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { AdminSideBar } from ".";
import { cn } from "@app/utils";
import Link from "next/link";

interface IAdminNavBarProps {}

const AdminNavBar: FC<IAdminNavBarProps> = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";

      if (overlayRef.current) {
        overlayRef.current.style.height = `${document.documentElement.scrollHeight}px`;
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSideBarOpen]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSideBar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ms-3 md:me-24">
                <Image
                  src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
                  className="h-18 me-3"
                  width={200}
                  height={200}
                  alt="IVY moda logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"></span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="relative ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="relative w-10 h-10">
                      <Image
                        fill
                        className="object-cover rounded-full"
                        src="https://res.cloudinary.com/dztnygzv6/image/upload/v1718436258/samples/man-portrait.jpg"
                        alt="user photo"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </button>
                </div>
                <div
                  className={`z-50 my-4 text-base list-none transition-all fade-in-show bg-white divide-y divide-gray-100 rounded shadow absolute right-0 ${isDropdownOpen ? "block" : "hidden"}`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900" role="none">
                      Neil Sims
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate" role="none">
                      neil.sims@gmail.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        href="/admin/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Thiết lập tài khoản
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <span
        ref={overlayRef}
        onClick={toggleSideBar}
        className={cn("w-full min-h-screen absolute top-0 left-0 bg-overlay z-40", isSideBarOpen ? "block" : "hidden")}
      />
      <AdminSideBar openSideBar={isSideBarOpen} />
    </>
  );
};

export default AdminNavBar;
