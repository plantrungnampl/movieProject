"use client";
import { getTopRateTv, getTopRateTvByGenre } from "@/app/api/getTopRatedTv";
import Loading from "@/app/loading";
import Filter from "@/components/Filters/Filter";
import TopRatedTv from "@/components/TopRateMovies/TopRateMovie";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function TopRated() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filterTopRated, setFilterTopRated] = useState<any[]>([]);
  const [selectGenres, setSelectedGenre] = useState<any[]>([]);
  const [isFilterGenres, setIsFilterGenres] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const dataTopRated = await getTopRateTv(1);
      setFilterTopRated(dataTopRated.results);
    };
    fetchData();
  }, []);
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = isFilterGenres
        ? await getTopRateTvByGenre(selectGenres.toString(), currentPage + 1)
        : await getTopRateTv(currentPage + 1);
      setFilterTopRated([...filterTopRated, ...data.results]);
      setCurrentPage(currentPage + 1);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitFilter = async () => {
    try {
      setLoading(true);
      setIsFilterGenres(true);
      setCurrentPage(1);
      const data = await getTopRateTvByGenre(selectGenres.toString(), 1);
      setFilterTopRated(data?.results);
      setTotalPage(data.totalPages);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (error) return <h1>{error}</h1>;
  // if (loading)
  //   return (
  //     <h1>
  //       <Loading />
  //     </h1>
  //   );
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>

        <div className="flex">
          <div className="shadow-lg p-3 w-1/3 ">
            <Filter
              filteredMovies={filterTopRated}
              setFilteredMovies={setFilterTopRated}
              selectedGenre={selectGenres}
              setSelectedGenre={setSelectedGenre}
              // setIsFiltering={setIsFiltering}
              handleSubmitFilter={handleSubmitFilter}
            />
          </div>

          <div className=" w-full flex flex-wrap">
            <TopRatedTv topRates={filterTopRated} />
            <div className="w-full">
              <div className="text-center mt-4  ">
                {/* {currentPage < totalPage && ( */}
                <div className="w-full text-center mt-4">
                  <Button
                    onClick={handleLoadMore}
                    className="w-full p-4 rounded-lg mx-auto text-center"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
