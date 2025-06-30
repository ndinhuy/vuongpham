"use client";

import { ReactNode, FC } from "react";
import { useAuth } from "@app/common";

type SignedInProps = {
  children: ReactNode;
  role?: Role;
  roles?: Role[];
};

const SignedIn: FC<SignedInProps> = ({ children, role, roles }) => {
  const { ready, user } = useAuth();

  return ready && user && ((role ? user.role === role : true) || roles?.includes(user?.role)) && children;
};

export default SignedIn;
