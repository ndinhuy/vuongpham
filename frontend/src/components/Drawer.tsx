"use client";

import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Headset, Minus, Plus, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Button from "./Button";

interface IProps {
  children?: ReactNode;
  className?: string;
  categories: Category[];
}

const Drawer: FC<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [groupName]: !prevState[groupName],
    }));
  };

  return (
    <div className={props.className}>
      <div className="text-center" onClick={toggleDrawer}>
        {props.children}
      </div>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-50 w-full h-full p-4 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white flex flex-col justify-between custom-scroll`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <div>
          <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase">
            Menu
          </h5>
          <button
            type="button"
            onClick={toggleDrawer}
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium custom-scroll">
              {props.categories.map((category) => (
                <li key={category._id}>
                  <div
                    onClick={() => toggleCategory(category.name)}
                    className={`flex justify-between cursor-pointer items-center p-2 rounded-lg hover:bg-gray-100 transition-all ${
                      category.isSpecial ? "text-red-500" : "text-gray-900"
                    }`}
                  >
                    <span className="font-semibold text-sm">{category.name}</span>
                    {expandedCategories[category.name] ? <Minus size={16} /> : <Plus size={16} />}
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedCategories[category.name] ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <ul className="ml-5 space-y-2">
                      {category.collectionGroups.map((group) =>
                        typeof group === "string" ? (
                          <li key={group} className="text-gray-500">
                            {group}
                          </li>
                        ) : (
                          <li key={group._id}>
                            <div
                              onClick={() => toggleGroup(group.name)}
                              className={`flex text-sm justify-between cursor-pointer items-center p-2 rounded-lg hover:bg-gray-100 transition-all ${
                                group.isSpecial ? "text-red-500" : "text-gray-900"
                              }`}
                            >
                              {group.name}
                              {expandedGroups[group.name] ? <Minus size={16} /> : <Plus size={16} />}
                            </div>

                            <div
                              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                expandedGroups[group.name] ? "max-h-screen" : "max-h-0"
                              }`}
                            >
                              <ul className="ml-5 space-y-3 pt-3">
                                {group.collections.map((collection) => {
                                  if (typeof collection === "string") return <Fragment key={collection} />;

                                  return (
                                    <li key={collection._id} className="text-gray-700 text-sm hover:text-red-900">
                                      <Link href={`/collection/${collection._id}`} className="capitalize">
                                        {collection.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <hr className="my-5" />
          <Button className="w-full">Đăng nhập</Button>

          <div className="flex justify-around gap-x-10 cursor-pointer mt-5">
            <div className="flex flex-col gap-y-3 items-center rounded-lg hover:bg-gray-100 p-5">
              <Headset size={20} />
              <span className="text-nowrap">Trợ giúp</span>
            </div>
            <Link
              href={`/customer/info`}
              className="flex flex-col gap-y-3 items-center rounded-lg hover:bg-gray-100 p-5"
            >
              <User size={20} />
              <span className="text-nowrap">Tài khoản</span>
            </Link>
            <Link href={`/order/cart`} className="flex flex-col gap-y-3 items-center rounded-lg hover:bg-gray-100 p-5">
              <ShoppingCart size={20} />
              <span className="text-nowrap">Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
