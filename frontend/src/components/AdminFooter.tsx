import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { cn } from "@app/utils";

interface IAdminFooterProps {
  className?: string;
}

const AdminFooter: FC<IAdminFooterProps> = ({ className }) => {
  return (
    <footer className={cn("bg-white shadow", className)}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Image
              src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
              className="h-18 me-3"
              width={150}
              height={150}
              alt="IVY moda logo"
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2024
          <Link href="/" className="hover:underline">
            IVY fashion™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default AdminFooter;
