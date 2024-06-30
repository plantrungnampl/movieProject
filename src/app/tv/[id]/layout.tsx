import React, { Suspense } from "react";

export default function DetailTvlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[61px] relative w-full">
      <div>
        <Suspense fallback={<div>Loading.....</div>}>{children}</Suspense>
      </div>
    </div>
  );
}
