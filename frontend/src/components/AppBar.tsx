import { FC, Fragment } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AppBarActions, Drawer, SearchInput } from "@app/components";
import { getAllServerCategories } from "@app/data";
import { cn } from "@app/utils";

type AppBarProps = {};

const AppBar: FC<AppBarProps> = async ({}: AppBarProps) => {
  const categories: Category[] = await getAllServerCategories();

  if (!categories || categories.length === 0) throw new Error("Invalid category");

  return (
    <header className="w-screen sticky top-0 bg-white flex justify-center items-center z-50">
      <div className="flex flex-row justify-between py-3 container border-b relative">
        <nav className="w-1/3 hidden lg:flex items-center">
          <ul className="hidden lg:flex md:gap-1">
            {categories.map((category, index) => {
              return (
                <li key={`${category.name}:${index}`} className="group">
                  <Link
                    className={cn(
                      "p-2 text-nowrap font-semibold text-sm md:text-md lg:text-lg uppercase",
                      category.isSpecial ? "text-red-500" : "",
                    )}
                    href=""
                  >
                    {category.name}
                  </Link>
                  <ul className="absolute w-full border p-7 bg-white left-0 hidden group-hover:flex gap-20 fade-in-show z-50">
                    {category.collectionGroups.map((group) => {
                      if (typeof group === "string") return;

                      return (
                        <ul key={group._id}>
                          <li className="font-medium text-nowrap uppercase text-sm py-3">{group.name}</li>
                          {group.collections.map((collection) => {
                            if (typeof collection === "string") {
                              return <Fragment key={collection} />;
                            }

                            const { _id, name } = collection;

                            return (
                              <li className="flex flex-col" key={_id}>
                                <Link
                                  className="py-2 text-gray-500 hover:text-black transition-all text-sm capitalize"
                                  href={`/collection/${_id}`}
                                >
                                  {name.toLowerCase()}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <Drawer categories={categories} className="lg:hidden">
          <button className="p-3 mr-3 lg:mr-0 block w-1/3">
            <Menu />
          </button>
        </Drawer>

        <div>
          <Link className="relative flex w-[200px] h-[60px]" href="/">
            <Image fill src="https://pubcdn.ivymoda.com/ivy2/images/logo.png" alt="Trang chủ | IVY moda" />
          </Link>
        </div>

        <div className="flex justify-end lg:w-1/3 pr-3 lg:pr-0">
          <div className="flex flex-1">
            <div className="hidden md:block h-full py-2 flex-1 mr-10">
              <SearchInput />
            </div>

            <AppBarActions />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
