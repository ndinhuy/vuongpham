import {
  BaggageClaim,
  Bot,
  CheckCheck,
  Contact,
  CreditCard,
  Eye,
  Heart,
  Home,
  LayoutDashboard,
  LockKeyhole,
  Package,
  RefreshCcw,
  Shirt,
  ShoppingBag,
  User,
  UserCog,
} from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ReactElement } from "react";

type Route = {
  route: string;
  name: string;
  icon?: ReactElement;
};

export const customerRoutes: Route[] = [
  {
    route: "info",
    name: "Thông tin cá nhân",
    icon: <User size={18} />,
  },
  {
    route: "login-log",
    name: "Lịch sử đăng nhập",
    icon: <LockKeyhole size={18} />,
  },
  {
    route: "order-list",
    name: "Quản lý đơn hàng",
    icon: <RefreshCcw size={18} />,
  },
  {
    route: "favourite-product",
    name: "Sản phẩm yêu thích",
    icon: <Heart size={18} />,
  },
];

export const adminRoutes: Route[] = [
  {
    route: "/admin",
    name: "Bảng điều khiển",
    icon: <LayoutDashboard />,
  },
  {
    route: "/admin/assistant",
    name: "Trợ lý IVY",
    icon: <Bot />,
  },
  {
    route: "/admin/products",
    name: "Sản phẩm",
    icon: <Shirt />,
  },
  {
    route: "/admin/categories",
    name: "Danh mục",
    icon: <Package />,
  },
  {
    route: "/admin/collections-group",
    name: "Nhóm bộ sưu tập",
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-black transition duration-75 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="currentColor"
      >
        <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
      </svg>
    ),
  },
  {
    route: "/admin/collections",
    name: "Bộ sưu tập",
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-black transition duration-75 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="currentColor"
      >
        <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
      </svg>
    ),
  },

  {
    route: "/admin/orders",
    name: "Đơn hàng",
    icon: <BaggageClaim />,
  },
  {
    route: "/admin/contact/chat",
    name: "Liên hệ",
    icon: <Contact />,
  },
  {
    route: "/admin/users",
    name: "Quản trị viên",
    icon: <UserCog />,
  },
  {
    route: "/",
    name: "Về trang chủ",
    icon: <Home />,
  },
];

export const orderRoutes: Route[] = [
  {
    route: "cart",
    name: "Giỏ hàng",
    icon: <ShoppingCart size={16} />,
  },
  {
    route: "checkout",
    name: "Đặt hàng",
    icon: <ShoppingBag size={16} />,
  },
  {
    route: "payment",
    name: "Thanh toán",
    icon: <CreditCard size={16} />,
  },
  {
    route: "result",
    name: "Hoàn thành",
    icon: <CheckCheck size={16} />,
  },
];

export const contactRoutes: Route[] = [
  {
    route: "contact/chat",
    name: "Liên hệ trực tuyến",
    icon: (
      <svg className="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
        <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2s0 0 0 0s0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.2-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9c0 0 0 0 0 0s0 0 0 0l-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
      </svg>
    ),
  },
  {
    route: "contact/mail",
    name: "Liên hệ qua email",
    icon: (
      <svg className="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-92.1c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32L121 32zm0 64l270 0 48 192-51.2 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L73 288 121 96z" />
      </svg>
    ),
  },
];
