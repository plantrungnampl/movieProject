"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { Suspense } from "react";
import Loading from "../loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchSearchResults } from "./page";

export default function Searchlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [result, setResult] = React.useState("");
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("q");

  React.useEffect(() => {
    const fetch = async () => {
      if (searchValue) {
        const data = await fetchSearchResults(searchValue);
        setResult(data);
      }
    };
    fetch();
  }, [searchValue]);

  return (
    <>
      <MaxWidthWrapper className="pb-24 pt-10  lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
          <div className="order-first w-full flex-none md:max-w-[125px]">
            <h2 className="bg-teal-600 p-3 ">Search result</h2>
            <ul className="shadow-md p-3 flex flex-col gap-2 rounded ">
              <li className="hover:bg-slate-600 hover:text-white p-2 rounded ">
                <Link
                  className="active:text-black"
                  href={`/search/tv?q=${searchValue}`}
                >
                  TV Shows
                </Link>
              </li>
              <li className="hover:bg-slate-600 hover:text-white p-2 rounded">
                <Link
                  className="active:text-black"
                  href={`/search/movie?q=${searchValue}`}
                >
                  Movies
                </Link>
              </li>
              <li className="hover:bg-slate-600 hover:text-white p-2 rounded">
                <Link
                  className="active:text-black"
                  href={`/search/person?q=${searchValue}`}
                >
                  People
                </Link>
              </li>
              <li className="hover:bg-slate-600 hover:text-white p-2 rounded">
                <Link
                  className="active:text-black"
                  href={`/search/collection?q=${searchValue}`}
                >
                  Collections
                </Link>
              </li>
              <li className="hover:bg-slate-600 hover:text-white p-2 rounded">
                <Link
                  className="active:text-black"
                  href={`/search/company?q=${searchValue}`}
                >
                  Companies
                </Link>
              </li>
              <li className="hover:bg-slate-600 hover:text-white p-2 rounded">
                <Link
                  className="active:text-black"
                  href={`/search/keyword?q=${searchValue}`}
                >
                  Keywords
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <div className="order-none flex-none md:order-last md:w-[125px]">
            {/* <FilterList list={sorting} title="Sort by" /> */}
          </div>
        </div>
      </MaxWidthWrapper>
      {/* </Suspense> */}
      {/* <Footer /> */}
    </>
  );
}
