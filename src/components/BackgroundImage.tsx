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
        quality={75}
        loading="lazy"
        className="absolute w-full   top-0 left-0 z-[-1] bg-no-repeat object-cover bg-center opacity-40 transition-opacity duration-500 ease-in-out group-hover:opacity-100  "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {children}
    </div>
  );
};

export default BackgroundImage;
