"use client";
import React from "react";
import dynamic from "next/dynamic";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import useSWR from "swr";
import { fetcher } from "@/lib/constants";

const LastestTrailer = dynamic(
  () => import("@/components/Trailer/LastestTrailer"),
  {
    ssr: false,
  }
);

const HomeTrendding = dynamic(
  () => import("@/components/HomePage/HomeTrendding"),
  {
    ssr: false,
  }
);

export default function Home() {
  // const [dataToday, setDataToday] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading, error } = useSWR(
    `/api/tmdb/todayAndTrending`,
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load: {error}</div>;
  if (!data && !error) {
    return <div>Loading...</div>;
  }
  if (!data.length) {
    return <div>Not found data</div>;
  }
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
