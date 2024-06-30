import Image from "next/image";
import React from "react";

export default function Background({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Image
          src={src}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="min-h-screen"
          loading="lazy"
        />
      </div>

      {children}
    </div>
  );
}
