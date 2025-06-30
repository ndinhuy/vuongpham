declare type CartItem = BaseModel & {
  product: string | Product;
  option: string | ProductOption;
  quantity: number;
};

declare type AddCartItemPayload = {
  productId: string;
  optionId: string;
  quantity: number;
};
