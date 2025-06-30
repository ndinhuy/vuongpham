import { redirect } from "next/navigation";
import { auth } from "@app/data";
import { FC } from "react";

import CustomerInfoForm from "./form";

type CustomerInfoPageProps = {};

const CustomerInfoPage: FC<CustomerInfoPageProps> = async ({}: CustomerInfoPageProps) => {
  const authUser: User | null = await auth();

  if (!authUser) redirect("/");

  return (
    <>
      <h1 className="text-3xl font-semibold mb-10">Tài khoản của tôi</h1>
      <CustomerInfoForm user={authUser} />
    </>
  );
};

export default CustomerInfoPage;
