import Loading from "@/app/loading";
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
      <div className="mx-auto  max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          {/* <Collections /> */}
        </div>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          {/* <FilterList list={sorting} title="Sort by" /> */}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
