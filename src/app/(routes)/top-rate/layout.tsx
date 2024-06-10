import Loading from "@/app/loading";
import Filter from "@/components/Filters/Filter";
// import Filter from "@/components/Filters/Filter";
// import Filter from "@/components/Filters/Filter";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "top-rate ",
  description: "top-rate ",
  keywords: "top-rate ",
};
export default function DetailTopRatelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaxWidthWrapper className="pb-24 pt-10  lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
      <div>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
