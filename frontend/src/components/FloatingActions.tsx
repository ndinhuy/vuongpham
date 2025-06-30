import { FC, ReactNode } from "react";

type FloatingActionsProps = {
  children: ReactNode;
};

const FloatingActions: FC<FloatingActionsProps> = ({ children }: FloatingActionsProps) => {
  return <div className="cursor-pointer fixed bottom-5 right-5 flex flex-col gap-3 items-center">{children}</div>;
};

export default FloatingActions;
