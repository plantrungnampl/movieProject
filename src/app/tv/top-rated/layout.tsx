import React, { Suspense } from "react";

export default function DetailMovieslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={"loading...."}>{children}</Suspense>
    </div>
  );
}
