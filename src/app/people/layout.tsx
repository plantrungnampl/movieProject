import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import dynamic from "next/dynamic";
import Transition from "../components/Transition";

function DetailMovieslayout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper className="pb-24 pt-10  lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
      <div>
        <Transition>
          <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
        </Transition>
      </div>
    </MaxWidthWrapper>
  );
}
export default dynamic(() => Promise.resolve(DetailMovieslayout), {
  ssr: false,
});
