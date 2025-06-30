declare type Category = BaseModel & {
  name: string;
  isSpecial: boolean;
  collectionGroups: (Group | string)[];
};

declare type CreateCategoryPayload = {
  name: string;
  isSpecial: boolean;
  collectionGroups: string[];
};

declare type UpdateCategoryPayload = Partial<CreateCategoryPayload>;
