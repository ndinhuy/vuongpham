import React, { FC } from "react";
import Image from "next/image";
import { cn } from "@app/utils";

interface IProps {
  src: string;
  alt: string;
  size?: AvatarSize;
}

const Avatar: FC<IProps> = ({ src, alt, size }) => {
  return (
    <div
      className={cn(`relative flex-shrink-0`)}
      style={size ? { width: `${size.width}px`, height: `${size.height}px` } : { width: "48px", height: "48px" }}
    >
      <Image
        fill
        className="object-cover rounded-full"
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Avatar;
