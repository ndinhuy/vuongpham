import { Metadata } from "next";
import { FC } from "react";

import { OrderResultForm } from "@app/components";

type OrderResultPageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Kết quả | IVY fashion",
  description: "Fashion store",
};

const OrderResultPage: FC<OrderResultPageProps> = ({ params }: OrderResultPageProps) => {
  return <OrderResultForm orderId={params.id} />;
};

export default OrderResultPage;
