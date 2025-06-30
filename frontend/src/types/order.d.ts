declare type PaymentMethod = "VNPAY" | "CASH";
declare type TransactionStatus = "SUCCESS" | "FAIL" | "PENDING" | "REFUNDED";
declare type OrderStatus = "PENDING" | "PREPARING" | "TRANSPORTING" | "COMPLETED" | "CANCELING" | "CANCELED";

declare type Order = BaseModel &
  TimeStampModel & {
    user?: string | User;
    name: string;
    email?: string;
    phone: string;
    address: string;
    items: (string | OrderItem)[];
    status: OrderStatus;
    paymentMethod: string;
    transaction: OrderTransaction;
    totalCost: number;
    discountCost: number;
    shippingCost: number;
  };

declare type OrderCosts = {
  totalCost: number;
  discountCost: number;
  lastCost: number;
};

declare type OrderItem = BaseModel & {
  product: string | Product;
  option: string | Option;
  quantity: number;
  cost: string | Cost;
};

declare type OrderTransaction = BaseModel &
  TimeStampModel & {
    payDate: string;
    amount: number;
    status: TransactionStatus;
  };

declare type CreateOrderItem = {
  productId: string;
  optionId: string;
  quantity: number;
};

declare type CreateOrderPayload = {
  items: string[];
};

declare type ProcessOrderPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  addressCode: Array<string>;
  paymentMethod: PaymentMethod;
};

declare type RequestCancelPayload = { orderId: string; page: number };

declare type CancelOrderPayload = {
  page: number;
  orderId: string;
  accept: boolean;
  reason: string;
};
