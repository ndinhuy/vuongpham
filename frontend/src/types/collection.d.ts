declare type Collection = BaseModel &
  TimeStampModel & {
    name: string;
  };

declare type CreateCollectionPayload = {
  name: string;
  groupId: string;
};

declare type CollectionFilter = {
  colors: string[];
  sizes: string[];
  materials: string[];
};

declare type CollectionWithFilter = {
  collection: Collection;
  filterOptions: CollectionFilter;
};

declare type UpdateCollectionPayload = {
  name: string;
};
