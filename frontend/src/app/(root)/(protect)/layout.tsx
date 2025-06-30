import { auth } from "@app/data";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type ProtectLayoutProps = {
  children: ReactNode;
};

const ProtectLayout = async ({ children }: ProtectLayoutProps) => {
  const authUser: User | null = await auth();

  if (!authUser) {
    redirect("/");
  }

  return children;
};

export default ProtectLayout;
