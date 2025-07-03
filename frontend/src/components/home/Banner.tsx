"use client";
import React from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

const swiperConfig: SwiperProps = {
  effect: "slide",
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 0,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
    waitForTransition: true,
    stopOnLastSlide: false,
  },
};

const Banner = () => {
  return (
    <div className="container my-6 space-y-6">
      <Swiper {...swiperConfig}>
        <SwiperSlide>
          <div className="h-[450px] bg-green-500 rounded-xl"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[450px] bg-red-500 rounded-xl"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[450px] bg-blue-500 rounded-xl"></div>
        </SwiperSlide>
      </Swiper>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="flex items-center justify-center h-32 rounded-xl flex-col p-4 bg-[#eff6ff]">
          <p className="font-bold">Main Title</p>
          <p className="text-sm text-muted-foreground">Description for the main title</p>
        </div>
        <div className="flex items-center justify-center h-32 rounded-xl flex-col p-4 bg-[#fff7ed]">
          <p className="font-bold">Main Title</p>
          <p className="text-sm text-muted-foreground">Description for the main title</p>
        </div>
        <div className="flex items-center justify-center h-32 rounded-xl flex-col p-4 bg-[#f0fdf4]">
          <p className="font-bold">Main Title</p>
          <p className="text-sm text-muted-foreground">Description for the main title</p>
        </div>
        <div className="flex items-center justify-center h-32 rounded-xl flex-col p-4 bg-[#faf5ff]">
          <p className="font-bold">Main Title</p>
          <p className="text-sm text-muted-foreground">Description for the main title</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
