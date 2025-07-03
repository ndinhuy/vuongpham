import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React, { PropsWithChildren } from "react";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
