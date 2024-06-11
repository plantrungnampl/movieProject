"use client";
import { getDataTopRate } from "@/app/api/getDataTopRate";
import Filter from "@/components/Filters/Filter";
import TopRateMovies from "@/components/TopRateMovie/TopRateMovies";
import { TopRateMovieProps } from "@/model/topRate";
import React, { useEffect } from "react";

export default function TopRate() {
  const [topRate, setTopRate] = React.useState<TopRateMovieProps[]>([]);
  const [movieTopRate, setMovieTopRate] = React.useState<TopRateMovieProps[]>(
    []
  );
  const [filteredMovies, setFilteredMovies] = React.useState<
    TopRateMovieProps[]
  >([]);
  const [error, setError] = React.useState<string>("");
  useEffect(() => {
    async function getTopRate() {
      try {
        const data = await getDataTopRate();
        setTopRate(data?.tvTopRate);
        setMovieTopRate(data?.movieTopRate);
        setFilteredMovies(data?.tvTopRate);
      } catch (err) {
        console.log(err);
      }
    }
    getTopRate();
  }, []);

  if (error) return <div>{error}</div>;
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>

        <div className="flex">
          <div className="shadow-lg p-3 w-1/3 ">
            <Filter
              filteredMovies={filteredMovies}
              setFilteredMovies={setFilteredMovies}
            />
          </div>

          <div className=" w-full flex flex-wrap">
            <TopRateMovies topRate={filteredMovies} />
          </div>
        </div>
      </div>
    </>
  );
}
