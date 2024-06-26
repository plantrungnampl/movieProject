"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";
import Loading from "../loading";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Searchlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchValue = searchParams.get("q");
  const links = [
    { href: `/search/tv?q=${searchValue}`, label: "TV Shows" },
    { href: `/search/movie?q=${searchValue}`, label: "Movies" },
    { href: `/search/person?q=${searchValue}`, label: "People" },
    { href: `/search/collection?q=${searchValue}`, label: "Collections" },
    { href: `/search/company?q=${searchValue}`, label: "Companies" },
    { href: `/search/keyword?q=${searchValue}`, label: "Keywords" },
  ];
  return (
    <>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
          <div className="w-full flex-none md:max-w-[125px]">
            <h2 className="bg-teal-600 p-3 ">Search result</h2>
            <ul className="shadow-md p-3 flex flex-col gap-2 rounded ">
              {links.map((link) => (
                <Link
                  key={link.href}
                  className={`active:text-black ${
                    pathname === link.href
                      ? "bg-slate-600 text-white"
                      : "hover:bg-slate-600 hover:text-white"
                  } p-2 rounded`}
                  href={link.href}
                >
                  <li>{link.label}</li>
                </Link>
              ))}
            </ul>
          </div>
          <Suspense fallback={<Loading number={7} />}>{children}</Suspense>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
