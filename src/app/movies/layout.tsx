import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";
import Loading from "../loading";
import Transition from "../components/Transition";

export default function DetailMovieslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[61px] relative w-full">
      <div>
        <Suspense fallback={<Loading number={1} />}>
          <Transition>{children}</Transition>
        </Suspense>
      </div>
    </div>
  );
}
