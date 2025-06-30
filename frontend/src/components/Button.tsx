import React, { ReactNode, FC } from "react";

import { CircularProgress } from "@app/components";
import { cn } from "@app/utils";

type ButtonProps = {
  type?: "submit" | "button";
  children?: ReactNode;
  onClick?: () => void;
  variant?: "secondary" | "primary";
  className?: string;
  isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({ type = "button", children, onClick, variant = "primary", className, isLoading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "min-w-40 py-3 px-8 text-sm rounded-tl-3xl rounded-br-3xl before:rounded-tl-3xl before:rounded-br-3xl transition-all flex items-center justify-center",
        variant === "primary" ? "primary-button" : "secondary-button",
        isLoading ? "opacity-70" : "",
        className,
      )}
    >
      {isLoading ? <CircularProgress /> : children}
    </button>
  );
};

export default Button;
