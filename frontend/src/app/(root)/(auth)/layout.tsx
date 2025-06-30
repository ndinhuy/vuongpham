import { auth } from "@app/data";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const authUser: User | null = await auth();

  if (authUser) {
    redirect("/");
  }

  return children;
};

export default AuthLayout;
