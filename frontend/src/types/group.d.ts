declare type Group = BaseModel &
  TimeStampModel & {
    category: string;
    name: string;
    isSpecial: boolean;
    collections: (Collection | string)[];
  };

declare type CollectionGroupPayload = {
  categoryId: string;
} & Partial<Group>;
