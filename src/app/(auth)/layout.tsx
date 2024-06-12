import { Suspense } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MaxWidthWrapper className="pb-24 pt-10  lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
        <Suspense fallback={<div>loading....</div>}>{children}</Suspense>
      </MaxWidthWrapper>
    </>
  );
}
