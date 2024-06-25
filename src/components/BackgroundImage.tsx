import { cn } from "@/lib/utils";
import Image from "next/image";

const BackgroundImage = ({
  src,
  alt,
  children,
  className,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden group ", className)}>
      <Image
        src={src}
        alt={alt}
        fill={true}
        quality={100}
        loading="lazy"
        className="absolute w-full   top-0 left-0 z-[-1] bg-no-repeat object-cover bg-center opacity-40 transition-opacity duration-500 ease-in-out group-hover:opacity-100  "
      />
      {children}
    </div>
  );
};

export default BackgroundImage;
