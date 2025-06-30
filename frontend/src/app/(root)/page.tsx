import { Banner, TopProductGallery } from "@app/components";

import type { Metadata } from "next";

type HomePageProps = {};

export const metadata: Metadata = {
  title: "Trang chủ | IVY fashion",
  description: "Fashion store",
};

const HomePage = async ({}: HomePageProps) => {
  return (
    <>
      <Banner />

      <TopProductGallery />
    </>
  );
};

export default HomePage;
