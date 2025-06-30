declare type Product = BaseModel &
  TimeStampModel & {
    name: string;
    description: string;
    preserveDescription: string;
    material: string;
    isDeleted: boolean;
    collection: string | Collection;
    options: (string | Partial<ProductOption>)[];
    images: string[];
    currentCost: Partial<Cost>;
    costs: (string | Partial<Cost>)[];
  };

declare type Cost = BaseModel & {
  ingredientCost: number;
  productionCost: number;
  saleCost: number;
  discountPercentage: number;
};

declare type ProductOption = BaseModel & {
  colorHexCode: string;
  colorName: string;
  size: string;
  stock: number;
};

///

declare type CreateCostPayload = {
  ingredientCost: number;
  productionCost: number;
  saleCost: number;
  discountPercentage: number;
};

declare type CreateOptionPayload = {
  colorHexCode: string;
  stock: number;
  colorName: string;
  size: string;
};

declare type CreateProductPayload = {
  name: string;
  description: string;
  preserveDescription: string;
  material: string;
  collectionId: string;
  images: string[];
  options: CreateOptionPayload[];
  cost: CreateCostPayload;
};

declare type UpdateOptionPayload = Patial<CreateOptionPayload> & { _id: string };

declare type UpdateProductPayload = Partial<{
  name: string;
  description: string;
  preserveDescription: string;
  material: string;
  newOptions: Array<CreateOptionPayload>;
  updateOptions: Array<UpdateOptionPayload>;
  deleteOptions: Array<string>;
  newCost: CreateCostPayload;
  newImages: Array<string | File>;
  deleteImages: Array<string>;
}>;

declare type ProductSize = "S" | "M" | "L" | "XL" | "XXL" | "3XL" | "4XL";

declare type TopProductResponse = Array<{
  category: string;
  topProducts: Array<Product>;
}>;
