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
        <Suspense fallback={<div>Loading.....</div>}>
          <Transition>{children}</Transition>
        </Suspense>
      </div>
    </div>
  );
}
