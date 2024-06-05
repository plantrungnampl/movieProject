"use client";
import { getDataTopRate } from "@/app/api/getDataTopRate";
import Loading from "@/app/loading";
import TopRateMovies from "@/components/TopRateMovie/TopRateMovies";
import { TopRateMovieProps } from "@/model/topRate";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

function TopRate() {
  const [topRate, setTopRate] = React.useState<TopRateMovieProps[]>([]);
  const [movieTopRate, setMovieTopRate] = React.useState<TopRateMovieProps[]>(
    []
  );
  const [error, setError] = React.useState<string>("");
  useEffect(() => {
    async function getTopRate() {
      try {
        const data = await getDataTopRate();
        setTopRate(data?.tvTopRate);
        setMovieTopRate(data?.movieTopRate);
      } catch (err) {
        console.log(err);
      }
    }
    getTopRate();
  }, []);
  console.log("toprate===", topRate);
  console.log("movieTopRate===", movieTopRate);
  if (error) return <div>{error}</div>;
  return (
    <>
      <h1>Top rated Movie:</h1>
      <div className=" w-full flex flex-wrap gap-4">
        <TopRateMovies topRate={topRate} />
      </div>
    </>
  );
}
function TopRatePage() {
  <>
    <Suspense fallback={<Loading />}>
      <TopRate />
    </Suspense>
  </>;
}
export default TopRatePage;
