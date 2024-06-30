"use client";
import { LoadingSkeleton } from "@/components/SkeletonLoading/SkeletonLoading";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/constants";
import dynamic from "next/dynamic";

import React, { useEffect } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
const TvArringTodays = dynamic(
  () => import("@/components/TvArringToday/TvArringTodays"),
  { ssr: false, loading: () => <LoadingSkeleton /> }
);
const Filter = dynamic(() => import("@/components/Filters/Filter"), {
  ssr: false,
});
export default function ArringToday() {
  const [filteredMovies, setFilteredMovies] = React.useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectGenres, setSelectGenres] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [isFilteringGenre, setIsFilteringGenre] = React.useState(false);
  const [sortOder, setSortOrder] = React.useState("name.asc");
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.results.length) return null; // reached the end
    if (isFilteringGenre) {
      return `/api/tmdb/getTvArringByGenre?page=${
        pageIndex + 1
      }&sortOder=${sortOder}&genreId=${selectGenres.toString()}`;
    } else {
      return `/api/tmdb/getTvArring?page=${pageIndex + 1}`;
    }
  };

  const { data, error, isLoading, mutate, setSize, size } = useSWRInfinite(
    getKey,
    fetcher,
    {
      parallel: true,
    }
  );
  useEffect(() => {
    // const fetchDataArringToday = async () => {
    //   const res = await fetch(`/api/tmdb/getTvArring?page=1`);

    //   const data = await res.json();
    //   setFilteredMovies(data?.results);
    //   setCurrentPage(1);
    //   setTotalPage(data?.totalPages);
    // };
    // fetchDataArringToday();
    if (data) {
      setLoading(false);
      const newData = [].concat(...data.map((el) => el.results));
      setFilteredMovies(newData);
      if (data[0]?.totalPages) {
        setTotalPage(data[0]?.totalPages);
      }
    }
  }, [data]);
  const handleSubmitFilter = async () => {
    try {
      setLoading(true);
      setIsFilteringGenre(true);
      setSize(1);
      mutate(); // Refresh data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < 20);
  const handleSort = async (order: string) => {
    // try {
    //   setLoading(true);
    //   setSortOrder(order);
    //   setCurrentPage(1);
    //   setIsFilteringGenre(true);
    //   // const data = await getTvArringByGenre("", 1, order);
    //   const res = await fetch(
    //     `/api/tmdb/getTvArringByGenre?page=1&sortOder=${sortOder}&genreId=${selectGenres.toString()} `
    //   );
    //   const data = await res.json();
    //   setFilteredMovies(data?.results);
    //   setTotalPage(data.totalPages);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
    try {
      setLoading(true);
      setSortOrder(order);
      setIsFilteringGenre(true);
      setSize(1);
      mutate(); // Refresh data
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div>
          <h2 className="font-bold text-2xl">Arring Today</h2>
          <div className="flex">
            <div className="shadow-lg p-3 w-1/3 h-fit ">
              <Filter
                setSelectedGenre={setSelectGenres}
                // setFilteredMovies={setFilteredMovies}
                handleSubmitFilter={handleSubmitFilter}
                selectedGenre={selectGenres}
                // filteredMovies={filteredMovies}
                handleSort={handleSort}
                setIsFilterGenres={setIsFilteringGenre}
              />
            </div>
            <div className=" w-full flex flex-wrap">
              <TvArringTodays filteredMovies={filteredMovies} />
              <div className="w-full">
                <div className="text-center mt-4  ">
                  {!isReachingEnd && (
                    <Button
                      disabled={isLoadingMore || isReachingEnd}
                      onClick={() => setSize(size + 1)}
                      className="w-full p-4 rounded-lg mx-auto text-center"
                    >
                      {isLoadingMore ? "Loading..." : "Load More"}
                    </Button>
                  )}
                  {isReachingEnd && <p>No more movies</p>}
                  <p>Total Pages: {totalPage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
