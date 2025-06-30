"use server";

import { serverFetch } from "@app/configs";

export const GetCollectionWithFilter = async (id: string): Promise<CollectionWithFilter | null> => {
  const response: Response = await serverFetch(`/collection/${id}?filter=true`);

  if (response.ok) {
    return await response.json();
  }

  return null;
};

export const GetCollection = async (id: string): Promise<Collection | null> => {
  const response: Response = await serverFetch(`/collection/${id}`);

  if (response.ok) {
    return await response.json();
  }

  return null;
};
