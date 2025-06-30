"use client";

import { ReactNode, FC } from "react";
import { useAuth } from "@app/common";

type SignedOutProps = {
  children: ReactNode;
};

const SignedOut: FC<SignedOutProps> = ({ children }) => {
  const { user } = useAuth();

  return !user && children;
};

export default SignedOut;
