import { UserRoundCog } from "lucide-react";
import { FC, ReactNode } from "react";
import Link from "next/link";

import { AppBar, CustomerChatProvider, FloatingActions, Footer, SignedIn, SupportBox } from "@app/components";

type UserRootLayoutProps = { children: ReactNode };

const UserRootLayout: FC<UserRootLayoutProps> = ({ children }: UserRootLayoutProps) => {
  return (
    <>
      <AppBar />
      <main className="container mx-auto px-5 lg:px-0">{children}</main>
      <Footer />
      <CustomerChatProvider>
        <FloatingActions>
          <SignedIn roles={["ADMIN", "OWNER"]}>
            <Link className="p-3 rounded-full bg-gray-300 transition-all" href="/admin">
              <UserRoundCog />
            </Link>
          </SignedIn>
          <SupportBox />
        </FloatingActions>
      </CustomerChatProvider>
    </>
  );
};

export default UserRootLayout;
