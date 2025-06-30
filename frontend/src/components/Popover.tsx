"use client";

import { cn } from "@app/utils";
import { useState, useRef, useEffect, ReactNode, FC } from "react";

interface PopoverProps {
  triggerChild: ReactNode;
  triggerButtonClassName?: string;
  children: ReactNode;
}

const Popover: FC<PopoverProps> = ({ triggerChild, triggerButtonClassName, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef]);

  return (
    <div className="relative" ref={popoverRef}>
      <button type="button" onClick={togglePopover} className={cn("flex items-center", triggerButtonClassName)}>
        {triggerChild}
      </button>

      {isOpen && (
        <div className="absolute z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 right-0 mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
