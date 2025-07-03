"use client";
import React, { useContext } from "react";
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
import { AuthContext } from "@/providers/AuthProvider";
import { ShoppingCart, Trash } from "lucide-react";
import { CartContext } from "@/providers/CartProvider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";

const Header = () => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

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

        {!auth?.user ? (
          <div className="flex items-center gap-2">
            <Button variant={"outline"}>Đăng ký</Button>
            <Link href={"/auth/sign-in"}>
              <Button>Đăng nhập</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p>{auth.user}</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button size={"icon"} variant={"ghost"} className="relative">
                  {(cart?.products?.length ?? 0) > 0 && (
                    <div className="text-white bg-red-500 size-4 rounded-full absolute top-0 right-0 flex items-center justify-center">
                      <p className="text-[10px]">{cart?.products?.length ?? 0}</p>
                    </div>
                  )}
                  <ShoppingCart />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" hidden={cart?.products.length === 0}>
                <div className="flex flex-col gap-4">
                  {cart?.products.map((product) => (
                    <div key={product.productID} className="flex items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="relative size-10 overflow-hidden rounded-md">
                          <Image src={product.image1} alt="" sizes="auto" fill className="object-cover" />
                        </div>
                        <div className="text-sm">
                          <p>{product.name}</p>
                          <p className="text-muted-foreground">{product.price}</p>
                        </div>
                      </div>

                      <Button
                        variant={"ghost"}
                        onClick={() => {
                          cart?.setProducts((prev) => prev.filter((p) => p.productID !== product.productID));
                        }}
                      >
                        <Trash />
                      </Button>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
