"use client";

import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Image from "next/image";

const slides = [
  "https://pubcdn.ivymoda.com/files/news/2023/06/21/b26a105dd5321c8217a25d7be8496de8.jpg",
  "https://pubcdn.ivymoda.com/files/news/2023/06/19/8b562d1f47975facd6a3322fcd4b521f.jpg",
  "https://pubcdn.ivymoda.com/files/news/2023/06/17/8ced3372ae399a334a671ad45cae31dd.jpg",
  "https://pubcdn.ivymoda.com/files/news/2023/06/09/ec4226bcf950ded7eec7a08119b21ced.jpg",
  "https://pubcdn.ivymoda.com/files/news/2023/05/29/56aa2a96b2157626e3816c98ef97ae8c.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full mx-auto banner mt-5">
      <div className="relative overflow-hidden rounded-tl-[80px] rounded-br-[80px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-[270px] md:h-[50vh] lg:h-[60vh] relative">
              <Image fill src={slide} alt={`${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white p-2 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white p-2 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
      </button>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3 p-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full ${currentIndex === index ? "bg-white" : "border border-white border-1"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
