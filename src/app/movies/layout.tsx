import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";
import Loading from "../loading";

export default function DetailMovieslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[61px] w-full">
      <div>
        <Suspense fallback={<Loading number={1} />}>{children}</Suspense>
      </div>
    </div>
  );
}
