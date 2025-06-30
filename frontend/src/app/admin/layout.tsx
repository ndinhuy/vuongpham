import { AdminFooter, AdminNavBar, AdminProtect } from "@app/components";
import React, { FC, ReactNode } from "react";

export const dynamic = "force-dynamic";

interface IAdminRootLayoutProps {
  children: ReactNode;
}

const AdminRootLayout: FC<IAdminRootLayoutProps> = ({ children }) => {
  return (
    <AdminProtect>
      <div className="flex flex-col min-h-screen w-screen">
        <AdminNavBar />
        <main className="p-4 md:ml-64 mt-20 min-h-screen flex-1">{children}</main>
        <AdminFooter className="md:ml-64" />
      </div>
    </AdminProtect>
  );
};

export default AdminRootLayout;
