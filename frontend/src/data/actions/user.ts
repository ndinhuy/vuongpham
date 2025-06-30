"use server";

import { serverFetch } from "@app/configs";
import { LISTING_ITEM_LIMIT } from "@app/constants";

export async function auth(): Promise<User | null> {
  const response: Response = await serverFetch("/user/auth");

  if (response.ok) {
    return await response.json();
  }

  return null;
}
