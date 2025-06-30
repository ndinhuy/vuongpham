"use client";

import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRef, useState, useCallback, memo, useMemo } from "react";

interface CoordinatesModel {
  x: number;
  y: number;
}

function ProductGallery({ images }: { images: string[] }) {
  const [isHover, setIsHover] = useState(false);
  const [mouseCoordinates, setMouseCoordinates] = useState<CoordinatesModel>({
    x: 0,
    y: 0,
  });

  const galleryFrameRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (galleryFrameRef.current) {
      setMouseCoordinates({
        x: event.clientX - galleryFrameRef.current.offsetLeft,
        y: event.clientY - galleryFrameRef.current.offsetTop,
      });
    }
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  const style = useMemo(() => {
    return {
      backgroundImage: `url(${images[0]})`,
      transform: isHover ? "scale(2)" : "scale(1)",
      transformOrigin: galleryFrameRef.current
        ? `${(mouseCoordinates.x / galleryFrameRef.current.clientWidth) * 100}% ${
            (mouseCoordinates.y / galleryFrameRef.current.clientHeight) * 100
          }%`
        : undefined,
    };
  }, [isHover, mouseCoordinates, images]);

  const renderImages = useMemo(
    () =>
      images.map((image, id) => (
        <div key={`${image}:${id}`} className="flex-shrink-0 w-full max-w-[150px] max-h-[200px]">
          <Image width={150} height={200} src={image} alt="Ảnh sản phẩm" className="w-full h-full object-cover" />
        </div>
      )),
    [images],
  );

  return (
    <div className="flex flex-col lg:flex-row mb-8 gap-4 h-[80vh] lg:h-[100vh]">
      <div
        ref={galleryFrameRef}
        className="w-full lg:min-w-[80%] h-full overflow-hidden relative cursor-cell"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-full bg-cover" style={style} />
        <span className="w-12 h-12 flex justify-center items-center text-xs rounded-l-3xl rounded-tr-3xl rounded-br-0 bg-orange-600 font-semibold text-white absolute top-3 right-3">
          {`-${50}%`}
        </span>
      </div>

      <div className="flex flex-row lg:flex-col items-center justify-center w-full min-w-[18%] max-h-[100%]">
        <button className="bg-transparent border-none p-2">
          <FontAwesomeIcon icon={faArrowUp} className="w-5 h-5 text-gray-500 rotate-[-90deg] lg:rotate-0" />
        </button>

        <div className="flex flex-row justify-center lg:flex-col w-full overflow-hidden gap-2">{renderImages}</div>

        <button className="bg-transparent border-none p-2">
          <FontAwesomeIcon icon={faArrowDown} className="w-5 h-5 text-gray-500 rotate-[-90deg] lg:rotate-0" />
        </button>
      </div>
    </div>
  );
}

export default memo(ProductGallery);
