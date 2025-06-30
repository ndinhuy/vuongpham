export const WEB_BASE_API_URL: string = process.env.NEXT_PUBLIC_WEB_BASE_API_URL || "";
export const ANALYTICS_BASE_API_URL: string = process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL || "";
export const SERVER_SOCKET_BASE_URL: string = process.env.NEXT_PUBLIC_SERVER_SOCKET_BASE_URL || "";
export const API_TOKEN_TYPE: string = process.env.NEXT_PUBLIC_API_TOKEN_TYPE || "";
export const GHN_ADDRESS_BASE_URL: string = process.env.NEXT_PUBLIC_GHN_ADDRESS_BASE_URL || "";
export const GHN_TOKEN_API: string = process.env.NEXT_PUBLIC_GHN_TOKEN_API || "";
export const CLOUDFLARE_SITE_KEY: string = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || "";
export const ENCRYPT_SECRET: string = process.env.NEXT_PUBLIC_ENCRYPT_SECRET || "";
export const ENCRYPT_ALGORITHM: string = process.env.NEXT_PUBLIC_ENCRYPT_ALGORITHM || "";
export const ACCESS_KEY: string = process.env.NEXT_PUBLIC_ACCESS_TOKEN_PREFIX || "";
export const REFRESH_KEY: string = process.env.NEXT_PUBLIC_REFRESH_TOKEN_PREFIX || "";
export const CLOUDINARY_UPLOAD_BASE_URL: string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_BASE_URL || "";
export const CLOUDINARY_UPLOAD_PRESET: string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export const API_REQUEST_TIMEOUT: number = 300000;
export const LISTING_ITEM_LIMIT = 12;
export const CART_PREFIX = "cart";
export const CHAT_ID_PREFIX = "cid";

export const ADMIN_ROLE_OPTIONS: Role[] = ["ADMIN"];

export const GENDER: Record<string, Gender> = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};

export const SIZE: Record<string, ProductSize> = {
  SMALL: "S",
  MEDIUM: "M",
  LARGE: "L",
  EXTRA_LARGE: "XL",
  X2_EXTRA_LARGE: "XXL",
  X3_EXTRA_LARGE: "3XL",
  X4_EXTRA_LARGE: "4XL",
};

export const mainChartColors = {
  borderColor: "#F3F4F6",
  labelColor: "#6B7280",
  opacityFrom: 0.45,
  opacityTo: 0,
};

export const visitorsChartColors = {
  fillGradientShade: "light",
  fillGradientShadeIntensity: 1,
};

export const signupsChartColors = {
  backgroundBarColors: ["#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB", "#E5E7EB"],
};
