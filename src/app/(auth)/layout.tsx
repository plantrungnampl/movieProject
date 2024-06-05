import Link from "next/link";
import { Suspense } from "react";
import Loading from "../loading";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<div>loading....</div>}>{children}</Suspense>
    </>
  );
}
