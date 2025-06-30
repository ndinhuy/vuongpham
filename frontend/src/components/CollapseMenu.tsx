"use client";

import { FC, ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@app/utils";

type CollapseMenuProps = {
  children: ReactNode;
  className?: string;
};

const CollapseMenu: FC<CollapseMenuProps> = ({ children, className }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className={cn("w-full h-fit", className)}>
      <div className={cn("flex lg:hidden relative justify-end")}>
        <button onClick={toggleOpen} className="text-black bg-gray-50 p-3 rounded-lg">
          <Menu size={20} />
        </button>

        {open && (
          <div className="z-10 absolute top-[3rem] bg-white rounded-lg p-3 max-w-[250px] border">{children}</div>
        )}
      </div>

      <div className="hidden lg:block w-full">{children}</div>
    </div>
  );
};

export default CollapseMenu;
