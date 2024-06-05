"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
function NotFound() {
  const searchParams = useSearchParams();
  return (
    <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
      <div className="">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <Link className="mt-6 text-blue-500" href="/">
          Go back home
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFound />
    </Suspense>
  );
}
export default NotFoundPage;
