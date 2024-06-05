// pages/404.tsx
"use client";

import { Suspense } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "@/app/loading";

const Custom404Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <Link href="/">
          <a className="mt-6 text-blue-500">Go back home</a>
        </Link>
      </div>
    </Suspense>
  );
};

const NotFound = () => (
  <Suspense fallback={<Loading />}>
    <Custom404Page />
  </Suspense>
);

export default NotFound;
