"use server";

import { serverFetch } from "@app/configs";

export async function getAllServerCategories(): Promise<Category[]> {
  const response: Response = await serverFetch("/category/all");

  if (response.ok) {
    return await response.json();
  }

  return [];
}
