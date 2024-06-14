import Loading from "@/app/loading";
import React, { Suspense } from "react";

export default function DetailMovieslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
