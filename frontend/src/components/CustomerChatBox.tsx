"use client";

import React, { FC, useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@app/utils";

import CustomerChatBody from "./CustomerChatBody";

interface IProps {
  open?: boolean;
  onClose?: () => void;
}

const CustomerChatBox: FC<IProps> = ({ open = true, onClose }) => {
  const [openSupportBox, setOpenSupportBox] = useState(open);

  useEffect(() => {
    if (open) setOpenSupportBox(true);
  }, [open]);

  const handleCloseBox = () => {
    setOpenSupportBox(false);
    onClose && onClose();
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 md:right-5 right-0 flex rounded bg-white shadow border transition-all flex-col md:w-[370px] md:h-[67vh] w-full h-[90vh]",
          openSupportBox ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="w-full border-b px-3 py-1.5 flex items-center">
          <div className="flex-1 flex items-center gap-x-2">
            <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center">
              <svg
                className="text-gray-400 w-7 h-7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128l0 64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9l0-64c0-16.8-12.9-30.5-29.3-31.9zM336 144l0 16c0 53-43 96-96 96l-32 0c-53 0-96-43-96-96l0-16c0-26.5 21.5-48 48-48l128 0c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512l98.3 0 0-64c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 64 98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16l0 48 32 0 0-48c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
              </svg>
            </div>
            <h1 className="font-semibold md:text-base text-sm">Chăm sóc khách hàng</h1>
          </div>
          <X onClick={handleCloseBox} size={20} className="cursor-pointer hover:text-gray-500 transition-all" />
        </div>
        <CustomerChatBody />
      </div>
    </>
  );
};

export default CustomerChatBox;
