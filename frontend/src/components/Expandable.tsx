"use client";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo, ReactNode, useState } from "react";

import { cn } from "@app/utils";

type ExpandableProps = {
  children: ReactNode;
  title: string;
};

const Expandable: FC<ExpandableProps> = ({ children, title }: ExpandableProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  return (
    <div onClick={toggleExpand} className="flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="lg:text-xl font-bold">{title}</h3>
        <FontAwesomeIcon className={cn(isExpand ? "rotate-90" : "", "transition-all")} icon={faAngleRight} />
      </div>
      <div className="transition-all expand py-2">{isExpand && children}</div>
    </div>
  );
};

export default memo(Expandable);
