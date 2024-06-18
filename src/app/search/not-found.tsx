import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import React, { Suspense } from "react";
import Loading from "../loading";

export default function NotFound() {
  return (
    <Suspense fallback={<Loading number={1} />}>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
        <div className="">
          <p className="text-2xl mt-4">Movie Not Found</p>
          <Link className="mt-6 text-blue-500" href="/">
            Go back home
          </Link>
        </div>
      </MaxWidthWrapper>
    </Suspense>
  );
}
