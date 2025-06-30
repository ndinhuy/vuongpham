"use client";

import { FC, memo, ReactNode, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@app/utils";

type FilterGroupProps = {
  children: ReactNode;
  name: string;
};

const FilterGroup: FC<FilterGroupProps> = ({ children, name }: FilterGroupProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col text-gray-500">
      <button onClick={toggleExpand} className="flex py-2 justify-between items-center cursor-pointer">
        <h5 className="font-light">{name}</h5>
        {isExpand ? <Minus size={16} /> : <Plus size={16} />}
      </button>
      <div
        className={cn(
          "transition-all expand flex flex-wrap gap-3 overflow-hidden py-2",
          isExpand ? "flex overflow-y-auto" : "hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(FilterGroup);
