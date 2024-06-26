"use client";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";

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
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/tmdb/getTopRatedTvShow?page=1`);
        const dataTopRated = await res.json();
        setFilterTopRated(dataTopRated?.results);
        setTotalPage(dataTopRated?.totalPages);
        setCurrentPage(1);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const res = isFilterGenres
        ? await fetch(
            `/api/tmdb/getTopRatedTvShowByGenre?page=${
              currentPage + 1
            }&genreId=${selectGenres.join(",")}&sortingOrder=${sortOrder}`
          )
        : await fetch(`/api/tmdb/getTopRatedTvShow?page=${currentPage + 1}`);
      const data = await res.json();
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
      const res = await fetch(
        `/api/tmdb/getTopRatedTvShowByGenre?page=${
          currentPage + 1
        }&genreId=${selectGenres.join(",")}&sortingOrder=${sortOrder}`
      );
      const data = await res.json();
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
      const res = await fetch(
        `/api/tmdb/getTopRatedTvShowByGenre?page=1&sortOder=${sortOrder}&genreId=${selectGenres.toString()} `
      );
      const data = await res.json();
      setSortOrder(order);

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
          <div className="shadow-lg p-3 w-1/3 h-fit ">
            <Filter
              filteredMovies={filterTopRated}
              setFilteredMovies={setFilterTopRated}
              selectedGenre={selectGenres}
              setSelectedGenre={setSelectedGenre}
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
