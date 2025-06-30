import { AdminChatProvider, ContactTabBar } from "@app/components";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Liên hệ | IVY fashion",
  description: "Fashion store",
};


type ContactLayoutProps = {
  children: ReactNode;
};

const ContactLayout: FC<ContactLayoutProps> = ({ children }: ContactLayoutProps) => {
  return (
    <div className="p-5 bg-white rounded w-full mt-2 shadow">
      <ContactTabBar />
      <AdminChatProvider>
        <div className="mt-3">{children}</div>
      </AdminChatProvider>
    </div>
  );
};

export default ContactLayout;
