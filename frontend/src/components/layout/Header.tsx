import React from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const Header = () => {
  return (
    <div className="border-b sticky top-0 left-0 z-10 bg-background shadow">
      <div className="container flex justify-between items-center py-4">
        <Link href={"/"}>
          <div className="text-3xl font-semibold">Logo</div>
        </Link>

        <div className="flex items-center justify-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-10">
              <NavigationMenuItem>Trang chủ</NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">Giải đấu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Components</div>
                          <div className="text-muted-foreground">Browse all components in the library.</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Documentation</div>
                          <div className="text-muted-foreground">Learn how to use the library.</div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Blog</div>
                          <div className="text-muted-foreground">Read our latest blog posts.</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>Mua thẻ</NavigationMenuItem>
              <NavigationMenuItem>Nạp thẻ</NavigationMenuItem>
              <NavigationMenuItem>Hướng dẫn</NavigationMenuItem>
              <NavigationMenuItem>Hỗ trợ</NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"outline"}>Đăng ký</Button>
          <Link href={"/auth/sign-in"}>
            <Button>Đăng nhập</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
