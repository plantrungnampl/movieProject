"use client";
import {
  getTopRateTv,
  getTopRateTvByGenre,
} from "@/app/api/tvShows/getTopRatedTv";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
// import Filter from "@/components/Filters/Filter";
// import TopRatedTv from "@/components/TopRateMovies/TopRateMovie";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Filter = dynamic(() => import("@/components/Filters/Filter"), {
  ssr: false,
});
const TopRatedTv = dynamic(
  () => import("@/components/TopRateMovies/TopRateMovie"),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  }
);
export default function TopRated() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filterTopRated, setFilterTopRated] = useState<any[]>([]);
  const [selectGenres, setSelectedGenre] = useState<any[]>([]);
  const [isFilterGenres, setIsFilterGenres] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = React.useState("vote_count.desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataTopRated = await getTopRateTv(1);
        setFilterTopRated(dataTopRated?.results);
        setTotalPage(dataTopRated?.totalPages);
        setCurrentPage(1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const data = isFilterGenres
        ? await getTopRateTvByGenre(
            selectGenres.join(","),
            currentPage + 1,
            sortOrder
          )
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
      const data = await getTopRateTvByGenre(
        selectGenres.join(","),
        1,
        sortOrder
      );
      setCurrentPage(1);
      setFilterTopRated(data?.results);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <h1>{error}</h1>;

  const handleSort = async (order: string) => {
    try {
      setLoading(true);
      setSortOrder(order);
      setCurrentPage(1);
      setIsFilterGenres(true);
      const data = await getTopRateTvByGenre(selectGenres.join(","), 1, order);

      setFilterTopRated(data?.results);
      setTotalPage(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
              handleSort={handleSort}
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
