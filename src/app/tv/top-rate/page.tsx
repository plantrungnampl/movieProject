"use client";
import { getDataTopRate } from "@/app/api/getDataTopRate";
import Filter from "@/components/Filters/Filter";
import TopRateMovies from "@/components/TopRateMovie/TopRateMovies";
import { Button } from "@/components/ui/button";
import { TopRateMovieProps } from "@/model/topRate";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
export default function TopRate() {
  const [topRate, setTopRate] = React.useState<TopRateMovieProps[]>([]);

  const [filteredMovies, setFilteredMovies] = React.useState<
    TopRateMovieProps[]
  >([]);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = await getDataTopRate(page);
      setPage(page + 1);
      setFilteredMovies((prev) => [...prev, ...data?.results]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      return;
    }
  };
  // const handleScrollDebounce = useDebouncedCallback(() => {
  //   if (window.scrollY > lastScrollY) {
  //     return;
  //   }
  //   handleLoadMore();
  // }, 300);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScrollDebounce);
  //   return () => window.removeEventListener("scroll", handleScrollDebounce);
  // }, [handleScrollDebounce]);
  useEffect(() => {
    async function getTopRate() {
      try {
        const data = await getDataTopRate(page);
        setTopRate(data?.results);
        // setMovieTopRate(data?.movieTopRate);
        setFilteredMovies(data?.results);
      } catch (err) {
        console.log(err);
      }
    }
    getTopRate();
  }, [page]);

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

          <div className=" w-full flex justify-center items-center flex-wrap">
            <TopRateMovies topRate={filteredMovies} />
            <div className="w-full">
              <div className="text-center mt-4  ">
                <Button
                  onClick={handleLoadMore}
                  className=" w-full p-4 rounded-lg  mx-auto text-center "
                >
                  {loading ? "Loading" : "Load More"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
