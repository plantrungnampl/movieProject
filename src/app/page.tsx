"use client";
import React, { useEffect, useState } from "react";
// import { fetchData } from "./api/fetchData";
import dynamic from "next/dynamic";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const LastestTrailer = dynamic(
  () => import("@/components/Trailer/LastestTrailer"),
  {
    ssr: false,
  }
);

// Dynamic import for HomeTrendding
const HomeTrendding = dynamic(
  () => import("@/components/HomePage/HomeTrendding"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(`/api/tmdb/todayAndTrending`);
        const dataRes = await res.json();
        setData(dataRes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-col-1 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 ">
        <div>
          <HomeTrendding data={data} />
          <div className="mt-14">
            <LastestTrailer />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
