"use client";

import Link from "next/link";
import { FC } from "react";

import { useAuth } from "@app/common";
import { Button } from ".";

type AuthTriggerProps = {};

const AuthTrigger: FC<AuthTriggerProps> = ({}: AuthTriggerProps) => {
  const { user, ready } = useAuth();

  return (
    ready &&
    !user && (
      <div>
        <div className="flex items-center lg:justify-start justify-center gap-x-4">
          <Link href="/sign-in">
            <Button>Đăng nhập</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="secondary">Đăng ký</Button>
          </Link>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Đăng nhập/đăng ký để được tích điểm và nhận thêm nhiều ưu đãi từ IVY moda
        </p>
      </div>
    )
  );
};

export default AuthTrigger;
