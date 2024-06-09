import { cn } from "@/lib/utils";
import React from "react";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "h-full max-w-screen-2xl w-full px-2.5 md:px-20 ",
        className
      )}
    >
      {children}
    </div>
  );
}
//max-w-screen-xl
