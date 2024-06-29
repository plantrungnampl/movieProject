import Loading from "@/app/loading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";

export default function FavoriteMovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaxWidthWrapper className="pb-24 pt-10  lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
      <div>
        <Suspense fallback={<Loading number={20} />}>{children}</Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
