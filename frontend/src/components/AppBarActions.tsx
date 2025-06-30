"use client";

import { Headset, LogOut, User } from "lucide-react";
import React, { FC } from "react";
import Link from "next/link";

import { SignedIn, SignedOut, InteractionWrapper } from "@app/components";
import { customerRoutes } from "@app/constants";
import CartNavButton from "./CartNavButton";
import { useSignOut } from "@app/data";
import { useAuth } from "@app/common";
import Popover from "./Popover";

type AppBarActionsProps = {};

const AppBarActions: FC<AppBarActionsProps> = ({}: AppBarActionsProps) => {
  const { mutate } = useSignOut();
  const { ready } = useAuth();

  return (
    <>
      <div className="flex items-center">
        <button className="p-3 xl:block hidden">
          <Headset size={20} />
        </button>
        <InteractionWrapper overlayClassname="rounded-lg" loading={!ready}>
          <SignedIn>
            <Popover triggerChild={<User className="xl:block hidden" size={20} />} triggerButtonClassName="p-3">
              <ul className="p-3">
                <li className="font-semibold p-2 text-nowrap">Tài khoản của tôi</li>
                <hr />
                {customerRoutes.map(({ route, name, icon }) => {
                  return (
                    <li key={`act:${route}:${name}`}>
                      <Link
                        className="py-2 text-nowrap flex gap-3 text-sm text-gray-500 hover:text-black transition-all"
                        href={`/customer/${route}`}
                      >
                        {icon} {name}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={mutate}
                    className="py-2 text-nowrap flex gap-3 text-sm text-gray-500 hover:text-black transition-all"
                  >
                    <LogOut size={18} /> Đăng xuất
                  </button>
                </li>
              </ul>
            </Popover>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="p-3 hidden xl:flex items-center justify-center">
              <User size={20} />
            </Link>
          </SignedOut>
        </InteractionWrapper>
        <CartNavButton />
      </div>
    </>
  );
};

export default AppBarActions;
