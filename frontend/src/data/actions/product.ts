"use server";

import { serverFetch } from "@app/configs";

export async function getProduct(id: string): Promise<Product | null> {
  const response: Response = await serverFetch(`/product/${id}`);

  if (response.ok) {
    return await response.json();
  }

  return null;
}
