import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { Provider } from "@app/components";
import { cn } from "@app/utils";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "custom-scroll")}>
        <Provider>
          {children}
          <Toaster position="bottom-center" />
        </Provider>
      </body>
    </html>
  );
}
