import Transition from "@/app/components/Transition";
import TransitionNextPage from "@/app/components/TransitionNextPage";
import React, { Suspense } from "react";

export default function DetailTvlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[61px] relative w-full">
      <div>
        <Transition>
          <Suspense fallback={<div>Loading.....</div>}>{children}</Suspense>
        </Transition>
      </div>
    </div>
  );
}
